---
name: bamf-ai
description: Route founder-led growth work through the signed-in BAMF.ai company, creator, and managed-client workspaces; choose a focused skill for analytics, outreach preparation, sites, or a growth plan.
---

# BAMF.ai growth workspace

Use BAMF as an approval-aware AI CMO workspace for a founder's business and authorized client work—not as an unrestricted CRM, sender, or team-admin console. Start with `bamf.get_agent_identity`; email, display name, default creator, and recommended creator may be null or hints only. Then inspect `bamf.list_creator_spaces`, choose the exact named creator/client workspace, and ask if the target is missing or ambiguous. Never treat an ID, role, email match, or recommendation as authorization. For hosted sites, separately discover the managed client destination with `bamf.list_site_workspaces`.

Route creator/founder research, interviews, ideas, drafts, edits and organic publishing to [bamf-content](../bamf-content/SKILL.md); detailed performance to [bamf-analytics](../bamf-analytics/SKILL.md); prospect/campaign preparation to [bamf-outreach](../bamf-outreach/SKILL.md); managed pages/artifacts to [bamf-sites](../bamf-sites/SKILL.md); and broader marketing experiments to [bamf-growth-plan](../bamf-growth-plan/SKILL.md). Each inherits [the connector contract](../references/operation-contract.md); load only the relevant skill. Available outcomes are bounded by connected account, role and OAuth scopes.

Show the exact workspace, object/version, content, channel, time, and intended effect before a consequential change; obtain fresh approval for that exact action. Keep preparation, approval, queue/admission, provider effect, and receipt distinct. A draft or saved artifact is not published or delivered. Report external completion only from a matching provider receipt. This public Claude projection does not expose standalone generated image/video/audio, Engagement Boost, arbitrary sends, team/bot administration, or general newsletter/community delivery. Never request keys, use local CLI instructions, or imply tools that are not listed by the connector.
