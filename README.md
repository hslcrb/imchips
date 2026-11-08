# imchips

A modern, responsive, static image workspace. All processing happens locally in the user's browser; uploaded images are not sent to any server.

## Features

- Resize by explicit pixel dimensions or from 1% to 200%; optional aspect ratio locking.
- JPEG, PNG, WebP, and browser-dependent AVIF export.
- Quality control (for lossy formats); rotation, flips, grayscale, fresh Canvas re-encoding to remove common metadata.
- Multi-file import, previews and batch ZIP export.
- Installable offline PWA with a service worker. The initial page load requires a network connection. ZIP batch export uses a CDN-hosted JSZip and therefore requires connectivity unless previously loaded.
- Mobile-friendly layout and keyboard-accessible file picker.

## Architecture

Plain HTML, CSS, vanilla JS and Service Worker. No framework, build step, server-side functions or image upload API. Runs as static hosting on Cloudflare Pages.

## Deploy

Cloudflare Pages Git integration: repository `hslcrb/imchips`, production branch `main`, build command **empty**, output directory **.** (repository root). No GitHub Actions. Custom domain: `imchips.rhee.life`.

## Notes

- GIF/animated AVIF/WebP decode only the first frame when exported.
- AVIF encoder availability depends on the browser; an explicit error is shown if unavailable.
- Very large images may hit device memory limits. Processing is sequential in batches.
- Metadata control is effectively always on because Canvas output does not preserve the source metadata; the checkbox communicates the output policy.
- For best offline ZIP support, vendor JSZip locally and cache it; currently loaded on-demand from jsDelivr.

## Privacy

All file decoding, drawing and encoding are local. The site makes ordinary requests for its own static assets and fetches JSZip from the CDN only when multi-file ZIP is requested. No analytics or tracking is included.

## Development

Serve the repository root with a static HTTP server, for example `python -m http.server 8000`, then open `http://localhost:8000`. Service workers do not work on `file://`.

MIT License.
