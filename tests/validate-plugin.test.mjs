import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillDir = path.join(root, "skills");
const fixture = JSON.parse(await readFile(path.join(root, "tests/fixtures/claude-tool-catalog.json"), "utf8"));
const expectedSkillNames = ["bamf-ai", "bamf-analytics", "bamf-content", "bamf-growth-plan", "bamf-outreach", "bamf-sites"];

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

function safeRelativeTarget(fromFile, href, baseDir) {
  if (!href.startsWith("./") && !href.startsWith("../")) throw new Error("link must be relative");
  const target = path.resolve(path.dirname(fromFile), href);
  if (!target.startsWith(`${baseDir}${path.sep}`)) throw new Error("link escapes skill bundle");
  return target;
}

test("all skills have unique, valid frontmatter and stay within size budgets", async () => {
  const names = await readdir(skillDir);
  const skillFiles = [];
  for (const entry of names) {
    if (entry === "references") continue;
    assert.ok((await stat(path.join(skillDir, entry))).isDirectory(), `${entry} must be a skill directory`);
    const file = path.join(skillDir, entry, "SKILL.md");
    skillFiles.push({ file, text: await readFile(file, "utf8") });
  }
  const parsed = skillFiles.map(({ text }) => parseSkill(text));
  assert.deepEqual(parsed.map((skill) => skill.name).sort(), [...expectedSkillNames].sort());
  assert.equal(new Set(parsed.map((skill) => skill.name)).size, parsed.length);
  for (let i = 0; i < parsed.length; i++) {
    assert.match(parsed[i].name, /^bamf-[a-z0-9-]+$/);
    assert.equal(path.basename(path.dirname(skillFiles[i].file)), parsed[i].name, "skill directory must match frontmatter name");
  }
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
      await readFile(safeRelativeTarget(file, href, skillDir), "utf8");
    }
  }
});

test("positive tool references match the current Claude projection", async () => {
  const allTools = new Set(fixture.supported);
  const excluded = new Set(fixture.excluded);
  assert.equal(new Set(fixture.supported).size, fixture.supported.length);
  assert.equal(new Set(fixture.excluded).size, fixture.excluded.length);
  assert.equal([...excluded].some((tool) => allTools.has(tool)), false);
  const names = await readdir(skillDir);
  for (const entry of names) {
    const file = entry === "references"
      ? path.join(skillDir, "references/operation-contract.md")
      : path.join(skillDir, entry, "SKILL.md");
    let text;
    try { text = await readFile(file, "utf8"); } catch { continue; }
    const positive = text.split("## Claude-only omissions")[0];
    for (const [, tool] of positive.matchAll(/`(bamf\.[a-z0-9_]+)`/g)) {
      assert.ok(allTools.has(tool), `${tool} is not in the pinned Claude tool catalog (${fixture.sourceRevision})`);
      assert.ok(!excluded.has(tool), `${tool} is excluded from Claude projection`);
    }
  }

  const currentSource = process.env.BAMF_PRODUCT_MCP_SOURCE;
  if (currentSource) {
    const index = await readFile(path.resolve(currentSource), "utf8");
    const sourceTools = new Set([...index.matchAll(/name:\s*"(bamf\.[a-z0-9_]+)"/g)].map((m) => m[1]));
    const exclusion = index.match(/const CLAUDE_DIRECTORY_EXCLUDED_TOOLS = new Set\(\[([\s\S]*?)\]\);/)?.[1];
    assert.ok(exclusion, "Claude exclusion set not found in optional current source");
    const sourceExcluded = new Set([...exclusion.matchAll(/"(bamf\.[a-z0-9_]+)"/g)].map((m) => m[1]));
    assert.deepEqual([...sourceExcluded].sort(), [...excluded].sort());
    for (const tool of allTools) assert.ok(sourceTools.has(tool), `${tool} missing from optional current MCP source`);
  }
});

test("link checker rejects traversal and absolute link cases", () => {
  const file = path.join(skillDir, "bamf-ai/SKILL.md");
  assert.throws(() => safeRelativeTarget(file, "../../outside.md", skillDir), /escapes/);
  assert.throws(() => safeRelativeTarget(file, "/etc/passwd", skillDir), /relative/);
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
