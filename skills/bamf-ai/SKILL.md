---
name: bamf-ai
description: Use the connected BAMF.ai workspace to research, create, review, schedule, publish, and analyze creator content with approval-aware actions.
---

# BAMF.ai

Use the BAMF connector as the source of truth for the signed-in user's creator spaces, context, drafts, analytics, and integrations.

Start read-first: list available creator spaces, select the relevant workspace, then retrieve only the context needed for the request. Treat missing or unavailable data as unknown; never invent provider status, audience data, delivery, scheduling, or publication receipts.

Drafting and analysis are safe to perform after the relevant workspace is selected. Before an externally consequential action such as scheduling, publishing, sending, deleting, or changing an integration, present the exact target and proposed action and obtain the user's current approval. A prior approval does not authorize a different workspace, post, recipient, schedule, or external action.

Use the narrowest scope and tool for the task. Do not request, expose, store, or ask the user to paste BAMF API keys: the remote connector completes OAuth, refreshes access, and supports revoke/reconnect through BAMF.

The connector is a real operating surface, not a read-only dashboard. After the user selects a creator space, use BAMF tools for ideas, research, drafting, editing, knowledge, media-library management, analytics, profile packages, organic schedules, outreach, and organic immediate publishing when the account role permits it. Draft generation creates reviewable output; creating, editing, scheduling, deleting, sending, or publishing must each use the narrow named MCP tool only after exact approval. Engagement Boost is unavailable through the public Claude connector. Never claim a provider effect without the returned BAMF receipt.

The public Claude connector does not expose standalone AI image, video, or audio generation. If a workflow needs new generated media, explain that limitation plainly and continue with any available planning, asset selection, attachment, scheduling, or publishing work the user requested. Do not route around the public connector or ask the user to paste credentials.
