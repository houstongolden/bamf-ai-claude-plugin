# BAMF.ai for Claude

BAMF.ai gives Claude an approval-aware operating layer for creator work. It combines the hosted OAuth resource `https://mcp.bamf.ai/claude` with a workflow skill, so users can work across creator context, research, ideas, drafts, edits, knowledge, media libraries, analytics, profile packages, organic scheduling and publishing, and outreach without copying an API key or JSON configuration.

## Install and connect

Add **BAMF.ai** from Claude's plugin directory. Open the plugin's **Connectors** tab, choose **Connect**, then sign in to BAMF.ai and approve the creator workspaces you want Claude to access. This is the only connection step. The plugin and connector then work in Claude chat, Claude Desktop, Cowork, and Claude Code sessions using the same Claude account.

The public Claude connector intentionally excludes standalone AI image, video, and audio generation and Engagement Boost to comply with Anthropic's Software Directory Policy. BAMF's other real read and write actions remain available, with scheduling and publishing enforced as organic-only. The unrestricted BAMF MCP continues to serve BAMFStack and custom agent clients separately.

## Try it

- "List my BAMF creator spaces and summarize the latest LinkedIn analytics for the one I choose."
- "Research this topic, propose three evidence-backed LinkedIn ideas in my voice, and save the one I approve as a draft."
- "Show me the exact copy, media, platforms, and timing for this draft; after I approve that exact plan, schedule it and return the BAMF receipt."

Claude should read before it writes, ask for current approval before consequential external actions, and report provider effects only when BAMF returns a receipt. OAuth tokens refresh automatically and can be revoked or reconnected from BAMF connector settings.

- Documentation: https://bamf.ai/docs/mcp/overview
- Support: https://bamf.ai/support
- Privacy: https://bamf.ai/privacy/
