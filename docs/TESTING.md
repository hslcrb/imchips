# Testing and verification

## Current evidence

The initial deployment was confirmed as successful on Cloudflare and the project JavaScript passed basic syntax checks. The initial implementation did **not** establish an end-to-end browser test pass. Treat manual tests below as a checklist, not as already completed results.

## Optional automated static checks

Requires Node.js 20+; no npm install or third-party packages:

```sh
node scripts/check.mjs
node --check app.js
node --check sw.js
```

This verifies basic JS syntax, files, source references, license text, PWA manifest, notices, and lack of GitHub Actions. It does not validate pixel output or remote deployment.

## Manual browser acceptance matrix

| Area | Test | Expected |
| --- | --- | --- |
| File import | Choose JPEG/PNG/WebP | Correct image metadata and preview |
| Drag/drop | Mix supported and invalid inputs | Supported items load; invalid ones fail safely |
| Resize | Export locked/unlocked px | Correct requested dimensions and aspect behavior |
| Percent | Export at 50%, 100%, 150% | Corresponding width and height |
| Formats | JPEG, PNG, WebP | Actual MIME and extension match, open normally |
| AVIF | Try both supported and unsupported browsers | Valid output or explicit failure |
| Transparency | Convert transparent PNG → JPEG | White background, no unexpected alpha |
| Transform | 90° rotation + x/y flip | Correct output orientation |
| Grayscale | Enable option and export | Grayscale result |
| Single export | Save file | Correct file name and non-empty image |
| Multi export | Two or more images | ZIP contains all images with unique names |
| PWA | Install on HTTPS/localhost | Install/standalone behavior where supported |
| Offline | Load app once, disconnect | Cached app and single-image processing work |
| Offline ZIP | Try without previously loading CDN JS | Known limitation; do not mark success without proof |
| Mobile | Narrow viewport | No clipped action controls or horizontal overflow |
| Accessibility | Keyboard + screen reader | Usable focus order, names, status announcements |
| Large files | Very large input or invalid dimensions | Clear error, no false success |
| Privacy | Network panel during conversion | No project-generated upload of image bytes |

Record browser version, device, sample dimensions, resulting dimensions/file size and failures. Use **synthetic test images** instead of private photos. PRs should only mark tests completed if run.
