# Agent and maintainer instructions

This file guides automated and human contributors to `hslcrb/imchips`.

- Maintainer identity: **Rheehose**. Project copyright: **Copyright 2026 Rheehose**.
- License: **Apache License, Version 2.0**. Preserve `LICENSE`, `NOTICE`, source SPDX headers and third-party notices.
- Runtime: **pure static** HTML/CSS/Vanilla JavaScript, browser-local image processing, Service Worker PWA.
- Deployment: Cloudflare Pages Git integration, `main` production branch, output `.`, domain `imchips.rhee.life`.
- **Never create GitHub Actions workflows** for this project.
- Do not introduce a file-upload API, accounts or telemetry without explicit maintainer direction and privacy review.
- Keep UI simple, modern, responsive, keyboard-usable, and free of emoji.
- Prefer first-party Web APIs and minimal pinned dependencies; attribute third-party code.
- Update `CHANGELOG.md` and relevant `docs/*` for major functional or infrastructure changes.
- Test changes using `node scripts/check.mjs` and the manual matrix in `docs/TESTING.md`. Report what was actually tested; do not invent test results.
- Avoid committing secrets, tokens, personal photos, or private deployment details.
- Use focused branches/PRs for substantial changes. A `main` commit may deploy immediately.
- Consult [CONTRIBUTING.md](CONTRIBUTING.md), [GOVERNANCE.md](GOVERNANCE.md), and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
