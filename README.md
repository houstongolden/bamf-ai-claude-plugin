# BAMF.ai for Claude — the AI CMO for founder-led growth

BAMF.ai brings an approval-aware AI CMO workflow for founder-led growth into Claude. Through the hosted OAuth connector and one workflow skill, Claude can use the connected BAMF workspace's company and creator context for content planning and creation, analytics, managed sites, and outreach preparation. Available actions depend on the connected workspace, account role, and granted access.

## Install and connect

Add **BAMF.ai** from Claude's plugin directory. Open the plugin's **Connectors** tab, choose **Connect**, then sign in to BAMF.ai and approve the creator workspaces you want Claude to access. This is the only connection step. The plugin and connector then work in Claude chat, Claude Desktop, Cowork, and Claude Code sessions using the same Claude account.

The public Claude connector does not provide standalone AI image, video, or audio generation, and Engagement Boost is unavailable. Media-library selection and attachment are distinct from generating new media. Outreach features support scoped discovery and campaign preparation; this plugin does not claim arbitrary email or direct-message sending, team-member administration, or general newsletter delivery. Creator and site actions depend on your workspace role and the connector's granted scopes. Scheduling and publishing use the available organic-content workflows and require the exact action to be approved; Claude must report an external effect only when BAMF returns a receipt.

## Try it

- "List my BAMF creator spaces and summarize the latest LinkedIn analytics for the one I choose."
- "Research this topic, propose three evidence-backed LinkedIn ideas in my voice, and save the one I approve as a draft."
- "Show me the exact copy, media, platforms, and timing for this draft; after I approve that exact plan, schedule it and return the BAMF receipt."

Claude should read before it writes, select the intended creator space explicitly, ask for current approval before consequential external actions, and report provider effects only when BAMF returns a receipt. OAuth tokens refresh automatically and can be revoked or reconnected from BAMF connector settings.

- Documentation: https://bamf.ai/docs/mcp/overview
- Support: https://bamf.ai/support
- Privacy: https://bamf.ai/privacy/
