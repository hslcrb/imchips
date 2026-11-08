# Governance

**Founder / lead maintainer:** Rheehose ([hslcrb](https://github.com/hslcrb))  
**Original copyright owner:** Rheehose  
**Project license:** Apache License, Version 2.0

imchips follows a **maintainer-led** model. Rheehose makes final decisions on architecture, product direction, review, merging, releases, domain settings, and community moderation. Significant decisions should be discussed in an Issue/PR or documented in [Development history](docs/DEVELOPMENT_HISTORY.md).

## Principles

1. Local-first privacy: user image files stay in the browser.
2. Robust image handling and honest support/compatibility claims.
3. Simple, accessible, responsive interface without emoji.
4. Minimal dependencies and static infrastructure.
5. Respect for author attribution, licenses, security and open collaboration.

## Roles and change process

- **Maintainer:** roadmap, code review, approval/merge, release and operations.
- **Contributors:** issues, proposals, PRs, tests, translations and docs; no automatic production access.
- **Users:** feedback and use under applicable licenses.

Propose new features in Issues; use a PR for concrete changes. The maintainer may request tests, docs, or changes before merging. All nontrivial releases should record changes in [CHANGELOG.md](CHANGELOG.md). Semantic Versioning will be used for future tagged releases.

**Operations:** `main` automatically deploys with Cloudflare Pages Git integration. GitHub Actions is not used.

**Public access:** A Private repository containing Apache-2.0 is still Private. Repository visibility must be separately changed by the repository owner after reviewing its history for sensitive material. No automatic public-visibility change is implied by these docs.

Governance changes are proposed by issue/PR and approved by Rheehose.
