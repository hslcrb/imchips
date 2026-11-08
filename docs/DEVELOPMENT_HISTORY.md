# imchips — 전체 개발 과정

**기록 범위:** 2026-11-09 (한국 시간) 초기 설계·구현·배포·문서화 단계.  
**기록 근거:** [GitHub 실제 커밋 기록](https://github.com/hslcrb/imchips/commits/main), 저장된 소스, 실제 조회한 Cloudflare Pages/DNS 설정. 확인하지 않은 사항은 확인했다고 기술하지 않는다.  
**프로젝트 소유/운영:** Rheehose · `hslcrb/imchips`

## 1. 최초 요구와 구현 목표

사용자는 하나의 웹사이트에서 이미지 파일 크기를 정확한 픽셀 또는 퍼센트로 조절하고, 원본 비율을 유지하면서 축소/확대하고, 다양한 이미지 형식으로 변환하고, 그 밖의 실용적인 편집 기능을 제공하는 **반응형·심플·모던한 도구**를 요청했다.

강제 조건:
- UI는 **이모지 없는** 현대적인 디자인.
- 외부 백엔드 없이 **순수 정적 사이트**.
- 코드 전부 `hslcrb/imchips`에 저장하고 `main` 기준 자동 배포.
- Cloudflare로 배포하고 `imchips.rhee.life`에서도 제공.
- **GitHub Actions 사용하지 않음**.
- PWA 지원.
- 후속 요청: 공식 **Apache License 2.0** 적용, 저작권자 **Rheehose**, 개발 전 과정 문서화와 오픈소스 관리 체계.

## 2. 초기 환경 점검

- GitHub 저장소의 기본 브랜치는 `main`, 최초에는 프로젝트 명을 담은 `README.md`만 있었다.
- `rhee.life` DNS 존은 Cloudflare에서 active 상태였다. 당시 `imchips.rhee.life` 레코드는 존재하지 않았다.
- 기존 Cloudflare 계정에 Git-integrated Pages 프로젝트들이 있었기에, 동일한 Pages Git 통합 방식으로 분리된 `imchips` 프로젝트를 만들기로 결정했다.
- Cloudflare Workers와 달리, 이번 구현은 정적 자원만 필요하므로 별도 Worker 함수나 서버 API를 만들지 않았다.

## 3. 아키텍처 결정

| 문제 | 선택 | 근거 |
| --- | --- | --- |
| 페이지 구현 | Vanilla HTML/CSS/JS | 설치·빌드 의존성이 없는 배포 |
| 파일 입력 | File API, 드래그 앤 드롭 | 브라우저 로컬 파일 선택 |
| 디코드 | `createImageBitmap` + `Image` 폴백 | 브라우저가 지원하는 이미지 로드 |
| 리사이즈·변형 | Canvas 2D | px/%, 회전·반전·흑백을 한 흐름에서 처리 |
| 출력 | `canvas.toBlob` / Object URL | 브라우저에서 직접 인코딩하고 다운로드 |
| 일괄 ZIP | JSZip 3.10.1 (CDN 지연 로드) | 다중 이미지 묶음 다운로드 |
| 설치·오프라인 | manifest + service worker | 기본 정적 자원 캐시 |
| 배포 | Cloudflare Pages Git integration | `main` push 감지, 별도 Actions 없음 |

이미지는 서버로 업로드되지 않도록 설계했다. 파일 디코딩/인코딩과 Blob 생성은 브라우저 측에서 수행되며 ZIP 기능 이용 시 JSZip만 CDN에서 가져온다.

## 4. 인터페이스 제작

- 넓은 여백, 밝은 배경과 보라빛 파란 포인트 컬러, 카드형 업로드 영역.
- 파일 선택 버튼, 파일 드롭 영역, 파일 대기열, 선택 이미지 정보/미리보기.
- 픽셀·퍼센트 모드, 비율 잠금, 출력 포맷 및 품질 슬라이더.
- 90도 회전, 좌우·상하 반전, 흑백 전환, 일괄 출력.
- 브라우저 창이 좁을 때 세로로 재배치되는 반응형 레이아웃.
- 키보드 업로드 영역과 `aria-live` 상태 메시지 등을 포함해 접근성을 고려한 초안을 마련했다.
- UI 이모지 없이 아이콘/SVG와 텍스트 중심으로 구성했다.

## 5. 실제 GitHub 커밋 기록

기록된 UTC 시각을 한국 시간으로 환산하였다.

| 2026-11-09 KST | 커밋 | 확인 가능한 사건 |
| --- | --- | --- |
| 00:01:15 | [`4c7b5b3`](https://github.com/hslcrb/imchips/commit/4c7b5b3ea402138a6654b31c47a5bd3688203e83) | 초기 README 생성 |
| 00:10:25 | [`6ff45c3`](https://github.com/hslcrb/imchips/commit/6ff45c33419bb3a6ba5445aeb00c39bd2c7a60c2) | UI, CSS, 이미지 처리 JS, PWA, manifest, SVG, 헤더, README 등 첫 제품 코드 |
| 00:10:46 | [`29aac60`](https://github.com/hslcrb/imchips/commit/29aac60114a2b6b7798284d211fbec0bed412141) | ZIP 의존성 로딩에 설정된 잘못된 SRI 속성을 제거. 올바른 SRI를 대체 적용하지는 않음 |
| 00:11:38 | [`1994d35`](https://github.com/hslcrb/imchips/commit/1994d3546399307ecd5315cc751ce11f7d32ca96) | 배포 도메인/연동 설정을 README에 보완 |
| 이후 | [최신 커밋 목록](https://github.com/hslcrb/imchips/commits/main) | Apache-2.0 저작권 정리, 개발 문서, 운영/기여 정책, 정적 검사 기반 정비 |

## 6. Cloudflare 실제 구축 순서

1. Cloudflare 계정과 활성 `rhee.life` DNS 존 점검.
2. Pages 프로젝트 **`imchips`** 신규 생성.
3. Git source를 `github`, owner `hslcrb`, repository `imchips`, production branch `main`으로 연결.
4. Cloudflare production auto-deploy를 켰고 preview branch deploy는 `none`으로 설정했다. `build_command`는 빈 값이며 `destination_dir`는 `.`이다.
5. Cloudflare Pages 사용자 지정 도메인으로 `imchips.rhee.life` 추가.
6. DNS에 **CNAME `imchips.rhee.life → imchips.pages.dev`**를 생성하고 proxy를 켰다.
7. 도메인은 처음에 initializing/pending, 나중에 **Cloudflare에서 domain status = active, verification = active, validation = active** 확인.
8. 최초 production deployment [`fe1ef8cd.imchips.pages.dev`](https://fe1ef8cd.imchips.pages.dev)의 상태 `deploy / success`, 배포 방식 `github:push`, branch `main`, commit `1994d354...` 확인. 종료 시각은 2026-11-09 00:11:50 KST.

이 프로젝트에는 GitHub Actions 워크플로를 만들지 않았다. 새 커밋이 올라오면 Cloudflare 자체 Git 통합이 감지하는 배포 구조다.

## 7. 초기 검증 범위와 미검증 항목

**실제로 확인한 내용**
- 주요 소스 파일이 `main`에 커밋된 사실.
- `app.js`와 `sw.js`의 기본 JavaScript 구문 검사 통과.
- Cloudflare `main` production 배포 success.
- Cloudflare 사용자 지정 도메인 및 DNS 연결, 나중에 active 상태 확인.

**완료되었다고 단정할 수 없는 내용**
- 실제 브라우저에서 JPEG/PNG/WebP/AVIF 출력 파일을 열어 비교한 엔드투엔드 테스트.
- ZIP 파일 내용 검사, 극단적 파일 크기 테스트, 모바일·접근성 감사.
- 실제 PWA 설치, 다양한 브라우저에서 AVIF 인코딩과 오프라인 ZIP 사용 확인.

세부 수동 검증표는 [TESTING.md](TESTING.md)에 있으며, 체크하지 않은 테스트를 완료한 것으로 발표하지 않는다.

## 8. 발견된 제약과 기술 부채

- 애니메이션 이미지의 움직임은 결과물에 유지되지 않는다.
- **정확한 목표 용량(KB)**, 크롭, 라이브 변환 미리보기는 미구현.
- 메타데이터 제거 UI 체크박스는 실제 별도 처리 경로를 바꾸지 않는다. Canvas 재인코딩 과정에서 메타데이터가 기본적으로 바뀐다.
- 비율 잠금+px 모드의 다중 파일은 현재 선택한 파일에서 계산한 스케일을 다른 파일에도 적용한다. 모두 동일한 절대 출력 픽셀을 보장하는 것은 아니다.
- ZIP은 외부 CDN에서 최초 로드하므로 완전한 오프라인 일괄 작업을 보장하지 않는다.
- 초기 의존성 SRI 속성 오류는 제거했지만, 유효 SRI 적용 또는 로컬 벤더링은 향후 개선 과제다.
- 초대형 이미지의 메모리/Canvas 제한과 브라우저 인코더 차이가 있다.

## 9. 오픈소스 체계 확립 (2026-11-09)

사용자 지정 저작권자 **Rheehose** 및 공식 라이선스 **Apache-2.0**을 적용했다. 이 과정에서:
- 공식 `LICENSE` 전문, `NOTICE`, 원본 파일 SPDX 헤더.
- JSZip의 이중 라이선스 중 MIT 조건 선택과 제3자 고지.
- README 재구성, `CHANGELOG`, 기여·행동·보안·프로젝트 운영 규칙.
- 기술 구조/배포/QA/향후 로드맵 문서.
- GitHub Issue/PR 템플릿, 선택형 Node 정적 검사 도구.
- 기존 'GitHub Actions 없음' 정책 재확인.

**공개 여부 유의:** 라이선스 적용과 GitHub Public 변경은 별개의 행위다. 초기 확인 시 리포지토리는 Private이었고, 공개로 바꾸려면 소유자가 별도로 Settings에서 조정해야 한다.

## 10. 후속 작업 규칙

변경마다 근거와 실제 검증 범위를 기록한다. 새로운 외부 서비스를 도입한다면 사전 개인정보/라이선스 검토를 수행한다. 릴리스 직전에는 [테스트 가이드](TESTING.md), [운영 가이드](DEPLOYMENT.md), [변경 이력](../CHANGELOG.md)을 함께 점검한다.
