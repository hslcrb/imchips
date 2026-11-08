# Deployment and operations

## Configuration

| Setting | Value |
| --- | --- |
| Host | Cloudflare **Pages** |
| Pages project | `imchips` |
| Source | GitHub `hslcrb/imchips` |
| Production branch | `main` |
| Production auto-deploy | Enabled through **Cloudflare Git integration** |
| Preview branches | `none` (initial configuration) |
| Build command | empty (no build step) |
| Output directory | `.` (repository root) |
| Default URL | https://imchips.pages.dev |
| Custom URL | https://imchips.rhee.life |
| DNS | proxied CNAME `imchips.rhee.life` → `imchips.pages.dev` |
| GitHub Actions | **Not used**; do not add workflows |

## Release flow

1. Review changes in a feature branch/PR using [Testing](TESTING.md).
2. Merge to `main`; the Cloudflare GitHub integration detects the push.
3. Review the Pages deployment status and logs.
4. Check `imchips.pages.dev` and `imchips.rhee.life` in a browser; verify static assets, PWA, and relevant image transformations.
5. Document changes in `CHANGELOG.md`. For incidents, record a postmortem in the development history.

Initial Cloudflare deployment **fe1ef8cd-e93d-421d-b70e-7b4dff46e3b4** ended as **success** on 2026-11-09 at **00:11:50 KST**, triggered by `github:push` to `main` on commit `1994d35`. This is deployment evidence, **not** proof of every image feature.

## Custom domain

The CNAME was created in the active Cloudflare `rhee.life` zone and associated with the Pages project. Initial certificate verification was pending; a subsequent Cloudflare API check reported **domain active**, **verification active**, and **validation active**.

## Troubleshooting

- No deploy after push: inspect Pages Git repository integration and GitHub app permissions; production deployments must remain enabled.
- 404 assets: confirm the output directory is `.` and asset files exist in repository root.
- Domain not working: check Pages custom domain, proxied CNAME, DNS propagation and TLS validation.
- PWA stale: inspect service-worker lifecycle and cache names; compare in a fresh browser profile.
- Batch ZIP offline failure: JSZip is loaded from a CDN and not part of the offline shell.
- Incompatible format: check whether browser Canvas supports that export MIME; don't silently relabel output.
- Rollback: review previous successful Pages deployment or revert the source commit and let `main` redeploy. Record action and impact.

No API keys, database credentials, deployment secrets, or GitHub Actions are required for this static application.
