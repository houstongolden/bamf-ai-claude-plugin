import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.resolve(root, "../bamfaiapp/supabase/functions/product-mcp/index.ts");
const skillDir = path.join(root, "skills");
const bannedTools = [
  "bamf.message_client", "bamf.get_agent_capabilities", "bamf.route_agent_workflow",
  "bamf.create_job", "bamf.generate_image", "bamf.generate_carousel",
  "bamf.generate_video", "bamf.narrate_video_project", "bamf.boost_post", "bamf.get_profile",
];

function parseSkill(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error("missing YAML frontmatter");
  const name = match[1].match(/^name: ([a-z0-9-]+)$/m)?.[1];
  const description = match[1].match(/^description: (.+)$/m)?.[1];
  if (!name || !description) throw new Error("missing or invalid name/description");
  return { name, description };
}

function policyViolation(text) {
  return /(?:paste|provide|export|store) (?:your )?(?:BAMF )?(?:API )?key|(?:npm|npx|curl|bash)\s+(?:install|run|exec)|(?:offers?|supports?|provides?|can perform) arbitrary (?:email|DM) sending|(?:offers?|supports?|provides?|can) (?:to )?(?:generat(?:e|ing)|creat(?:e|ing)) (?:a )?(?:standalone )?(?:AI )?(?:image|video|audio)|(?:offers?|supports?|provides?) (?:team|bot) administration/i.test(text);
}

test("all skills have unique, valid frontmatter and stay within size budgets", async () => {
  const names = await readdir(skillDir);
  const skillFiles = [];
  for (const entry of names) {
    const file = path.join(skillDir, entry, "SKILL.md");
    try { skillFiles.push({ file, text: await readFile(file, "utf8") }); } catch {}
  }
  assert.equal(skillFiles.length, 5);
  const parsed = skillFiles.map(({ text }) => parseSkill(text));
  assert.equal(new Set(parsed.map((skill) => skill.name)).size, parsed.length);
  for (const skill of parsed) assert.match(skill.name, /^bamf-[a-z0-9-]+$/);
  const rootSkill = skillFiles.find(({ file }) => file.endsWith("/bamf-ai/SKILL.md"));
  assert.ok(rootSkill);
  assert.ok(Buffer.byteLength(rootSkill.text) < 4_000);
  const total = skillFiles.reduce((sum, item) => sum + Buffer.byteLength(item.text), 0)
    + Buffer.byteLength(await readFile(path.join(skillDir, "references/operation-contract.md")));
  assert.ok(total < 20_000, `skill bundle is ${total} bytes`);
});

test("all relative skill links resolve inside the bundle", async () => {
  const entries = await readdir(skillDir);
  for (const entry of entries) {
    if (entry === "references") continue;
    const file = path.join(skillDir, entry, "SKILL.md");
    let text;
    try { text = await readFile(file, "utf8"); } catch { continue; }
    for (const [, href] of text.matchAll(/\]\((\.\.?\/[^)]+)\)/g)) {
      const target = path.resolve(path.dirname(file), href);
      assert.ok(target.startsWith(`${skillDir}${path.sep}`));
      await readFile(target, "utf8");
    }
  }
});

test("positive tool references match the current Claude projection", async () => {
  const index = await readFile(source, "utf8");
  const allTools = new Set([...index.matchAll(/name:\s*"(bamf\.[a-z0-9_]+)"/g)].map((m) => m[1]));
  const exclusion = index.match(/const CLAUDE_DIRECTORY_EXCLUDED_TOOLS = new Set\(\[([\s\S]*?)\]\);/)?.[1];
  assert.ok(exclusion, "Claude exclusion set not found");
  const excluded = new Set([...exclusion.matchAll(/"(bamf\.[a-z0-9_]+)"/g)].map((m) => m[1]));
  assert.deepEqual([...excluded].sort(), [...bannedTools].sort());
  const names = await readdir(skillDir);
  for (const entry of names) {
    if (entry === "references") continue;
    let text;
    try { text = await readFile(path.join(skillDir, entry, "SKILL.md"), "utf8"); } catch { continue; }
    assert.ok(text.includes("# Claude-only omissions") || !bannedTools.some((tool) => text.includes(`\`${tool}\``)));
    const positive = entry === "references" ? text : text.split("## Claude-only omissions")[0];
    for (const [, tool] of positive.matchAll(/`(bamf\.[a-z0-9_]+)`/g)) {
      assert.ok(allTools.has(tool), `${tool} is not in product-mcp tool catalog`);
      assert.ok(!excluded.has(tool), `${tool} is excluded from Claude projection`);
    }
  }
});

test("sensitive setup and unsupported capability claims fail closed", () => {
  assert.equal(policyViolation("Use bamf.get_agent_identity first."), false);
  assert.equal(policyViolation("Paste your BAMF API key here."), true);
  assert.equal(policyViolation("Use curl install to proceed."), true);
  assert.equal(policyViolation("This workflow offers arbitrary email sending."), true);
  assert.equal(policyViolation("This workflow supports generating a standalone AI image."), true);
  assert.equal(policyViolation("This package provides team administration."), true);
});

test("published skills contain no key, shell, or affirmative unsupported-capability instructions", async () => {
  const files = [];
  for (const entry of await readdir(skillDir)) {
    if (entry === "references") files.push(path.join(skillDir, entry, "operation-contract.md"));
    else files.push(path.join(skillDir, entry, "SKILL.md"));
  }
  for (const file of files) {
    const text = await readFile(file, "utf8");
    assert.equal(policyViolation(text), false, `${path.relative(root, file)} violates Claude policy`);
    assert.doesNotMatch(text, /(?:^|\s)(?:curl|npm|npx)\s+(?:install|run|exec)\b/m);
  }
});

test("connector endpoint and package metadata remain stable except version/description", async () => {
  const plugin = JSON.parse(await readFile(path.join(root, ".claude-plugin/plugin.json"), "utf8"));
  const mcp = JSON.parse(await readFile(path.join(root, ".mcp.json"), "utf8"));
  const { version, ...stableMetadata } = plugin;
  assert.deepEqual(stableMetadata, {
    name: "bamf-ai",
    displayName: "BAMF.ai",
    description: "AI CMO for founder-led growth: connected company and creator context, content, analytics, sites, and approval-aware growth workflows in BAMF.ai.",
    author: { name: "BAMF.ai", email: "support@bamf.ai", url: "https://bamf.ai" },
    homepage: "https://bamf.ai/docs/mcp/overview",
    repository: "https://github.com/houstongolden/bamf-ai-claude-plugin",
    privacyPolicyUrl: "https://bamf.ai/privacy/",
    icon: "./assets/bamf-icon.svg",
    license: "Proprietary",
  });
  assert.equal(plugin.version, "1.2.0");
  assert.deepEqual(mcp, { mcpServers: { "bamf-ai": { type: "http", url: "https://mcp.bamf.ai/claude" } } });
});
