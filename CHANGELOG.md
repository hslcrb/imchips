# Changelog

Notable imchips changes are recorded here. Semantic Versioning is intended for future releases. Entries below do not imply that a GitHub release or version tag was published.

## Unreleased — Open-source project foundation (2026-11-09)

### Added
- Standard Apache-2.0 license, © 2026 Rheehose notice, and SPDX source headers.
- Third-party JSZip license notice and documentation.
- Development history, architecture, deployment, testing and roadmap guides.
- Contributing, governance, security, conduct, issue/PR templates and static check script.
- Agent guidelines and repository formatting conventions.

## 0.1.0 — Initial implementation (2026-11-09; not tagged)

### Added
- Responsive single-page image workspace.
- px and 1–200% scaling with optional aspect lock.
- Canvas re-encoding to JPEG, PNG, WebP, or browser-supported AVIF.
- Quality controls, rotation, flip, grayscale, multi-file queue, ZIP export.
- PWA manifest and service worker cache.
- Cloudflare Pages production project, `main` Git integration, `imchips.rhee.life` custom domain.

### Fixed
- Removed incorrect third-party script integrity attribute in [29aac60](https://github.com/hslcrb/imchips/commit/29aac60114a2b6b7798284d211fbec0bed412141). Properly protected local or SRI-loaded ZIP dependency remains future work.

### Verification level
- Initial GitHub-initiated Cloudflare deploy succeeded and basic JavaScript syntax was checked. Browser-level conversion and full PWA tests were not confirmed.
