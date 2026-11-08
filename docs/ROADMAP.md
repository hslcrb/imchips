# Roadmap and limitations

This is a planning guide; **unreleased items are not promised features**.

## Shipped in initial version

Image import and preview, pixel/percent resize, aspect-ratio option, JPEG/PNG/WebP and conditional AVIF export, image quality control, rotation, flips, grayscale, ZIP export, responsive UI, and installable PWA shell.

## Known gaps

- No crop UI, target-KB iterative compression, animated image preservation, color-profile/EXIF editor, or transformed live preview.
- The metadata checkbox has no independent code path; Canvas encoding usually strips metadata.
- Batch px aspect-lock uses the chosen source image to determine the scale factor.
- JSZip loads on demand from a third-party CDN: offline first-use ZIP unsupported.
- Very large images may hit device memory or browser Canvas constraints.
- AVIF encoding support varies, and output quality depends on browser encoders.

## Recommended milestones

| Priority | Work item | Reason |
| --- | --- | --- |
| P0 | Execute real-browser acceptance tests | Verify the feature set before declaring it production-ready |
| P0 | Fix or remove misleading metadata checkbox and clarify batch semantics | Honest and predictable UX |
| P1 | Bundle ZIP library locally with complete license notices or provide validated SRI | Offline capability and supply-chain hardening |
| P1 | Crop controls and actual output preview | Core user workflow |
| P2 | Target output size in KB with quality search and clear failure cases | Size-constrained uploads |
| P2 | Per-file conversion presets and batch progress cancellation | Workflow usability |
| P2 | Multi-browser, performance and accessibility tests | Reliability and inclusion |

By default, do not add accounts, file uploads, telemetry, paid API backends or GitHub Actions without explicit approval.
