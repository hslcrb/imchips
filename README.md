# imchips

**Images, simplified.** A responsive, browser-local image workspace and installable PWA.  
**Created and maintained by Rheehose.**

[Live site](https://imchips.rhee.life) · [Cloudflare Pages](https://imchips.pages.dev) · [Issues](https://github.com/hslcrb/imchips/issues) · [Changelog](CHANGELOG.md)

**License:** Apache-2.0 · **Copyright:** © 2026 Rheehose  
**Stack:** HTML / CSS / Vanilla JavaScript / Service Worker · **Hosting:** Cloudflare Pages

## About / 소개

imchips는 이미지 크기 조절, 형식 변환, 회전, 반전, 흑백 변환, 다중 파일 내보내기를 제공하는 순수 정적 이미지 작업실입니다. 서버 업로드 API, 계정, 데이터베이스 없이 이미지 처리는 브라우저 안에서 실행됩니다.

This application processes image data on your device. Multi-file ZIP export loads the third-party JSZip 3.10.1 script from a CDN on first use; that network request does **not** transmit the image files.

## Features

| 기능 | 구현 상태 |
| --- | --- |
| 크기 조절 | 직접 px 지정 또는 원본 대비 1–200%, 비율 잠금 |
| 형식 변환 | JPEG / PNG / WebP / AVIF(브라우저 지원 시) |
| 인코딩 | 손실 형식 품질 조절, Canvas 재인코딩 |
| 변형 | 90도 회전, 가로·세로 반전, 흑백 |
| 일괄 작업 | 다중 파일 대기열, ZIP 다운로드 |
| UI | 반응형, 키보드 파일 선택, 이모지 없는 인터페이스 |
| PWA | Manifest, Service Worker, 앱 셸 오프라인 캐싱 |

**Important limitations:** Animated images are exported as a still frame. Exact target file-size optimization (KB), cropping, transformed live preview, and complete offline ZIP support are not implemented. Encoding support and maximum image size vary by browser/device. See [Roadmap](docs/ROADMAP.md).

## Run locally

A static web server is sufficient; **no build step, npm install or API key is required**.

```sh
git clone https://github.com/hslcrb/imchips.git
cd imchips
python -m http.server 8000
```

Open `http://localhost:8000`. Service workers need HTTPS or localhost, not `file://`. Optional static checks require Node.js 20+:

```sh
node scripts/check.mjs
```

## Repository guide

```text
index.html                UI and accessible input controls
style.css                 Responsive design
app.js                    Browser-only image conversion
sw.js                     PWA offline cache
manifest.webmanifest      PWA metadata
icon.svg                  Site icon
_headers                  Cloudflare Pages headers
LICENSE, NOTICE           Apache-2.0 and attribution
licenses/                 Third-party license copies
docs/                     History, architecture, deployment, QA, roadmap
.github/                  Issue & PR templates — no GitHub Actions
scripts/check.mjs         Optional static checks (no dependencies)
```

## Project documents

- [Development history / 개발 전과정](docs/DEVELOPMENT_HISTORY.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Cloudflare deployment and operations](docs/DEPLOYMENT.md)
- [Test plan and verification status](docs/TESTING.md)
- [Roadmap / known limitations](docs/ROADMAP.md)
- [Contributing](CONTRIBUTING.md) · [Governance](GOVERNANCE.md) · [Code of Conduct](CODE_OF_CONDUCT.md) · [Security](SECURITY.md)
- [Change log](CHANGELOG.md) · [Third-party notices](THIRD_PARTY_NOTICES.md)

## Contributing and license

Issues and Pull Requests are welcome once repository access/visibility permits. Please read [CONTRIBUTING.md](CONTRIBUTING.md). Production uses **Cloudflare Pages Git integration on `main`**, not GitHub Actions.

Original imchips code and documentation: **Copyright © 2026 Rheehose**, licensed under **[Apache License 2.0](LICENSE)**. Third-party components have their own licenses and copyright holders: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Note: a license file does not change a repository's Public/Private visibility; this is managed separately in GitHub Settings.
