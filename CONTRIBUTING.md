# Contributing to imchips

Thank you for contributing. imchips is maintained by **Rheehose** and prioritizes privacy, reliable image conversion, accessible design, and simple static deployment.

## Before you start

1. Read [Code of Conduct](CODE_OF_CONDUCT.md), [Architecture](docs/ARCHITECTURE.md), [Testing](docs/TESTING.md) and [Roadmap](docs/ROADMAP.md).
2. Search [issues](https://github.com/hslcrb/imchips/issues) for duplicates. Discuss major features, dependencies, backend additions and user-data handling before implementation.
3. For vulnerabilities, use [SECURITY.md](SECURITY.md), **not** a public issue.

## Workflow

1. Start from the latest `main` in a feature branch (suggestions: `feat/crop`, `fix/encoder`, `docs/readme`).
2. Submit small, focused patches. Keep the core dependency-light and browser-local.
3. Run `node scripts/check.mjs` (Node 20+) and relevant manual cases in [Testing](docs/TESTING.md). No automatic GitHub Actions checks are configured.
4. Update the changelog and docs for user-visible changes.
5. Open a PR with the provided template, reproduction steps and actual test evidence. Include screenshots when changing UI.

## Engineering expectations

- Preserve browser-local processing. Do not upload user image data or introduce tracking without explicit approval and documented consent.
- Keep UI responsive, accessible to keyboard users, and free of emoji.
- Handle invalid files, failed decoders, unsupported output formats, and memory limits safely.
- Prefer built-in browser APIs. If you add a dependency, record the exact version, upstream URL, copyright, and license in `THIRD_PARTY_NOTICES.md`.
- Don't add `.github/workflows/`: Cloudflare owns production deployment on `main`.
- Never commit tokens, personal media, secrets, test photos containing private information or generated large files.
- Avoid claiming tests passed unless they actually ran. Use synthetic sample images for reproduction.

## License / DCO

imchips's original code is Apache-2.0; contributors retain copyright in their work. By sending a PR, you confirm that you have the right to contribute it under Apache-2.0 and that required existing third-party notices remain intact. No separate CLA or mandatory signed-off-by check is currently enforced.

Apache 2.0 contains copyright notice, modification, and patent-related terms. Review [LICENSE](LICENSE) before contributing. Maintainer **Rheehose** reviews and decides merges; merging to `main` deploys to production.
