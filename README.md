# BAMF.ai for Claude — the AI CMO for founder-led growth

BAMF.ai brings approval-aware founder and company growth workflows into Claude. The six focused skills route between identity and workspace selection, creator content, analytics, growth planning, outreach preparation, and managed sites. The connector can ground plans in available creator/company context, prepare content and outreach, and build or publish authorized managed-site versions. Real capability depends on account role, OAuth scopes, and workspace access.

## Connect

Add **BAMF.ai** from Claude's plugin directory. In Claude's **Connectors** tab, choose **Connect**, sign in to BAMF.ai, and approve the requested permissions. After connecting, use the identity returned by BAMF, discover the available creator or managed-site workspaces with the connector, then explicitly select the intended destination. OAuth consent does not itself select a workspace; identity defaults are hints, not authorization.

## Capability boundaries

This Claude projection supports BAMF creator analytics and content workflows, evidence-labeled founder growth plans, scoped outreach discovery and campaign preparation, and authorized managed-site creation/revision/artifact/publish operations. Outreach preparation, approval, queueing, and admission do not themselves send; only a matching provider receipt proves a separate executor delivered. Saved HTML does not publish. A site opt-in form or resource handoff does not deliver a newsletter or manage a community. The connector is not a universal CRM, arbitrary Gmail/LinkedIn/X/Instagram sender, team/bot administrator, or general deck-generation service.

Standalone AI image/video/audio generation and Engagement Boost are not exposed in this Claude package. No API key, local shell, hook, or alternate-credential setup is required. Consequential changes require approval for the exact workspace, object/version, content, and effect; BAMF receipts are the evidence for completed provider effects.

## Skills

- `bamf-ai`: identity-first router and shared capability boundaries.
- `bamf-content`: creator/founder context, interviews, research, ideas, drafts, edits, media selection, and organic scheduling/publishing.
- `bamf-analytics`: platform-aware analytics, funnel mix, reports, and source coverage.
- `bamf-growth-plan`: founder/company goals, evidence, offers, and bounded experiments.
- `bamf-outreach`: scoped discovery and preparation-only outreach workflows.
- `bamf-sites`: managed client sites, HTML artifacts, preview, and explicit publish.

Each skill references `skills/references/operation-contract.md` for shared identity, approval, receipt, provenance, and policy rules. This repository is the canonical distribution source for the Claude-specific projection only. It does not replace or claim ownership of BAMFStack's canonical skills in the BAMF application repository; any app-side copy is a historical snapshot and must not independently publish the Claude package.

## Try it

- “Check my BAMF identity, show my creator spaces, then compare the 90-day funnel mix for the space I select.”
- “Build a founder-led growth plan from my connected context; separate confirmed facts from assumptions and give me three measurable experiments.”
- “Prepare an outreach campaign for the exact list and account I choose. Show the copy and cadence; do not send it.”
- “Preview a lead-magnet landing page in the managed client workspace I select; tell me what saving and publishing each do.”

- Documentation: https://bamf.ai/docs/mcp/overview
- Support: https://bamf.ai/support
- Privacy: https://bamf.ai/privacy/
