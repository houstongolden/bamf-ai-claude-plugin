---
name: bamf-analytics
description: Analyze founder, creator, and authorized client performance using BAMF analytics and funnel tools; preserve freshness, platform, and source coverage.
---

# BAMF analytics

Apply the shared [operation contract](../references/operation-contract.md). Resolve identity and the exact named creator/client space first; do not infer company or client access from identity hints.

Use `bamf.get_analytics_summary` for one creator's LinkedIn totals or pass `platform: "x"` for X metrics. Use `bamf.get_funnel_mix` for a tagged-post funnel breakdown and `bamf.find_funnel_examples` for stage-specific examples. Use `bamf.get_creator_analytics_report` for its native multi-creator report when the user requests a portfolio view. Follow returned pagination and date range. Clearly label platform, period, freshness, missing/untagged sources, and inaccessible sections; do not generalize a creator metric to the whole company.

Use native chart/table/report artifacts only when the host offers them. Keep source attribution beside each chart and describe coverage. Save through `bamf.save_agent_artifact` only when asked; preserve provenance and include a session link only if the user supplied the URL. Treat correlations as observations and strategy recommendations as hypotheses, not verified causal outcomes. Never claim CRM updates or email delivery from an analytics read.
