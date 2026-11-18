---
name: bamf-content
description: Run source-grounded BAMF creator content workflows, including creator reference research, cross-channel strategy, interviews, ideas, drafts, edits, media selection, and publishing.
---

# BAMF creator and founder content

Follow the shared [operation contract](../references/operation-contract.md). Resolve identity, then the exact named creator space before reading or writing. Use `bamf.get_creator_context` selectively for voice, profile, interviews, knowledge, platforms, brand kits, or existing media. Treat company/founder facts as unknown until supplied or sourced. Preserve first-person POV; ask a few focused questions when an authentic story or opinion is missing.

## Source and plan

Use `bamf.search_knowledge` and `bamf.list_interviews` to find existing source material. `bamf.create_interview_link` creates a secure opt-in link and share copy only; it does not start an interview in chat or send the link. If the user provides a transcript, `bamf.create_interview_transcript` can save it; ask before durable storage and distinguish transcript from verified fact. Use `bamf.run_research` for current facts, benchmarks, or trends and preserve returned sources and uncertainty. `bamf.generate_ideas` returns candidate ideas; review evidence/source labels and voice fit before `bamf.create_idea` saves one.

## Creator reference research and strategy

For creator research, video analysis, or cross-channel strategy, identify each creator and source by publisher links, handles, titles and dates. Never identify people from faces or infer social accounts from names. Use `bamf.search_knowledge` for available creator-space sources and `bamf.run_research` for public evidence; retrieve jobs via `bamf.get_job`. Distinguish user-supplied sources from provider results. Disclose inaccessible transcripts, images, accounts or analytics; never claim to have watched or measured unavailable material.

For each creator, cite source URLs, platform, observation date and available metrics with context. Separate observed hooks, formats, visuals and calls to action from proposed adaptations. Never claim top-percentile ranking without a defined pool and denominator, or infer performance or demographics from appearance. Propose an original recording prompt, opening, outline, thumbnail, distribution plan and measurable test in the requesting creator's authentic voice. Cite timestamps only if supplied by the source; do not copy another creator's identity or content.

Use a structured host artifact only when available; save with `bamf.save_agent_artifact` only when requested and supported. Preserve provenance, uncertainty and coverage gaps. Research does not publish, contact anyone, or approve later actions.

## Draft and edit

`bamf.generate_post` produces an asynchronous, reviewable candidate; check its job result with `bamf.get_job`. It does not save, schedule, or publish. Show the exact copy, platform, CTA, and supporting claim sources. `bamf.create_post_draft` creates a draft only after the user approves that exact content. For existing drafts, `bamf.generate_post_edit` proposes an edit but does not patch; show before/after and use `bamf.edit_post` only after approval of exact changes to the exact post. Never invent post IDs or silently overwrite revisions.

For BAMF-connected visuals, use `bamf.list_media` and `bamf.list_media_folders` to find existing approved assets. If asked to register a supplied external asset, `bamf.add_media` only registers its URL; confirm that exact asset first. The public BAMF Claude OAuth projection does not expose standalone AI image/video/audio generation, and excluded BAMF generation tools are not fallback paths.

If the current Claude host actually provides its native Design or artifact surface, it may be used for a user-requested design workflow: diagrams, charts, carousel layouts, slides, or infographics grounded in the user's own brand/assets and sourced data. Anthropic's [Software Directory Policy §4(B), dated April 15, 2026](https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy) permits design-focused visual aids as part of a design workflow; it does not mean BAMF exposes an additional generation tool or permit standalone image/video/audio generation as the primary service. Treat each output as a versioned artifact and hand it off through manual export/import only—never claim automatic sync or a BAMF Design integration. Save only after exact approval through a supported tool that accepts that artifact: `bamf.save_agent_artifact` stores creator-space report/context, `bamf.save_site_artifact` accepts HTML site content, and `bamf.add_media` registers a supplied asset URL. Do not claim those tools accept arbitrary native Design files. Never work around excluded BAMF tools with credentials or another connector. Do not attach or reuse an asset without user confirmation for the exact post.

## Schedule and publish

Before scheduling, show the approved post, platform, exact future timestamp/timezone, and any first comment/media. `bamf.schedule_post` schedules only the selected post; the Claude projection removes its boost parameter. Use `bamf.list_scheduled_posts` to inspect existing work; `bamf.pause_scheduled_post`, `bamf.resume_scheduled_post`, and `bamf.unschedule_post` affect that exact scheduled post and require current approval. Immediate publication is a separate consequential action through `bamf.publish_post_now`; do not substitute it for scheduling. After any provider-facing action, report only the returned matching receipt/status. A tool error, pending state, or saved draft is not publication proof.
