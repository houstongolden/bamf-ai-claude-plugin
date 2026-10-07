---
name: bamf-outreach
description: Discover and prepare evidence-backed founder or client outreach lists, campaigns, exact-thread replies, and resource handoffs without claiming provider sends.
---

# BAMF outreach preparation

Apply the shared [operation contract](../references/operation-contract.md). Confirm the authorized BAMF workspace and the specific connected provider account/capability supplied by the authorized workflow. Do not invent session, principal, gateway, account, receipt, or capability IDs, or bypass a missing authorization context; stop and explain what is unavailable.

Discovery with `bamf.start_outreach_discovery` is provider-read-only. Review candidates and exclusions before `bamf.save_outreach_discovery` saves a durable list snapshot. Use `bamf.prepare_outreach_campaign` only to prepare copy and cadence for the exact list revision, connector account, and channel. Show that complete plan for approval. `bamf.approve_outreach_campaign` binds approval to its fingerprint; approval alone does not queue. `bamf.queue_outreach_campaign` and `bamf.admit_outreach_campaign_execution` only change workflow state/admission; neither sends.

`bamf.prepare_exact_thread_reply` returns prepared or stopped for a receipt-bound exact thread and does not send. `bamf.prepare_outreach_growth_delivery` prepares a resource/newsletter/booking handoff; it does not send or deliver. Check `bamf.get_outreach_campaign_status` for current bindings and any matching provider receipt from a separate executor. Only report actual sending if that receipt exists and matches the target, content, and account.

Do not present this as arbitrary Gmail/LinkedIn/X/Instagram DM sending, a general CRM, or newsletter delivery. Never fabricate outreach performance, lead verification, consent, or deliverability.
