---
name: bamf-sites
description: Build, revise, preview, persist, and explicitly publish version-bound HTML for an authorized BAMF managed client site.
---

# BAMF managed sites

Apply the shared [operation contract](../references/operation-contract.md). Site workspaces are separate from creator spaces: start with `bamf.list_site_workspaces`, select the exact authorized managed client, then inspect with `bamf.list_sites` and `bamf.get_site` as needed. If none is available, do not substitute a creator ID or native/unbound workspace.

Use `bamf.manage_site` for supported site session/context/template/preview changes. It does not publish. Show the rendered preview, target site, and exact version; revise until approved. `bamf.save_site_artifact` can persist complete HTML to the exact project as an immutable version; it does not publish. Preserve real provenance and a user-supplied session URL only when provided. For native Design, hand off the real version or copyable HTML for manual import; do not claim automatic synchronization.

Publishing or access changes are distinct: `bamf.publish_site` may request/resolve approval or execute a version-bound operation. Describe the exact site, version, access effect, and approval state, obtain fresh user approval for the exact consequential change, and then report only the returned receipt. Do not imply a saved artifact was deployed.

A page may contain an opt-in form, lead magnet, newsletter sign-up, booking link, or community CTA as user-approved site content. The MCP does not thereby deliver a newsletter, manage a community, create CRM stages, or send captured leads. Do not claim those capabilities.
