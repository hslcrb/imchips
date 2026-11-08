# Architecture

## Static application

imchips serves only static assets via Cloudflare Pages. There is no image-upload endpoint, image database, authentication backend, or server-side image transformation.

```text
User-selected File(s)
   |
   v
Object URL + createImageBitmap (fallback: Image)
   |
   v
Canvas 2D -> resize / rotate / flip / grayscale
   |
   v
canvas.toBlob(mime, quality) -> local download
   |
   +---- 2+ items: JSZip (on-demand CDN fetch) -> ZIP download
```

## Source map

- `index.html`: dropzone, selection, editor, options, preview and status.
- `style.css`: responsive layout and visual design.
- `app.js`: import, state, image encoding, transformation and downloads.
- `sw.js`: service-worker precache and same-origin network-first fallback.
- `manifest.webmanifest`: installable PWA metadata.
- `icon.svg`: vector brand mark.
- `_headers`: Cloudflare Pages headers.

## Processing semantics

- **Percent mode:** each image scales its own original width/height by requested percentage.
- **px mode, unlocked:** every image is rendered at the specified width and height, which can stretch.
- **px mode, locked:** the width-to-original-width ratio of the **currently selected image** applies to every image in the queue. This is a scale preset, not fixed absolute dimensions for all images.
- Dimensions are clamped to 1–16,384 px; final canvas is guarded above 100 million pixels. Platform memory/Canvas limits may be lower.
- JPEG is exported with an opaque white background; PNG/WebP may preserve alpha.
- `canvas.toBlob` MIME checking surfaces an error for unsupported export formats (notably AVIF on some browsers).
- Grayscale draws through Canvas compositing, while rotation/flip operate through context transforms.
- The preview pane shows the **source image**, not a rendered output preview.
- Canvas encoding generally discards source metadata; the current metadata checkbox does not select a different code path.
- Animated input is flattened to a still image at export.

## Offline and network boundaries

The service worker caches the home page, main assets, manifest and icon after installation. Network-first serving falls back to cache for same-origin GETs. The JSZip CDN URL is **outside** the same-origin offline cache and is fetched only when multiple files are exported; there is no guarantee of offline ZIP operation.

Image data remains in local browser memory by design. Loading the site itself or the third-party script creates normal network requests, but the implemented conversion pipeline does not POST image content. Avoid absolute 'no networking whatsoever' claims.

## Threat model / limitations

Untrusted input includes image data, SVG and filenames. Risks include browser decoder vulnerabilities, maliciously huge pixel allocations, dependency/CDN compromise and resource exhaustion. Test in real browsers before claims about compatibility or security. Do not introduce file uploads or telemetry without an explicit architecture/privacy review.
