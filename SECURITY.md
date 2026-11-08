# Security Policy

## Scope

imchips is a static, browser-side image processor without a file-upload API or user database. Browser image decoders, large-file memory use, external JavaScript delivery and supply-chain changes still introduce risks.

## Supported versions

Security maintenance targets the latest `main` revision only. There are no long-term support release branches at present.

## Responsible reporting

Do **not** disclose vulnerability details, personal images or sensitive diagnostics via public issues.

1. Check whether [GitHub private vulnerability reporting / Security Advisories](https://github.com/hslcrb/imchips/security/advisories) is enabled.
2. If unavailable, contact **Rheehose** via a nonpublic contact method listed on [the maintainer profile](https://github.com/hslcrb).
3. Provide a concise impact summary, affected browser/version, synthetic reproduction steps and suggested remediation if known.

Maintainer response times are not guaranteed; no bug bounty program exists.

## Development checklist

- Never log or transmit users' image contents by default.
- Treat SVG/images and filenames as untrusted input.
- Check allocation limits and decoder errors, and release object URLs.
- Review upstream changes before updating third-party dependencies.
- The current JSZip 3.10.1 CDN dependency is pinned by version but not protected by SRI, and first-use ZIP download requires network connectivity. This is a tracked limitation, not a tested security guarantee.
- Do not commit production secrets, access tokens or private files.
