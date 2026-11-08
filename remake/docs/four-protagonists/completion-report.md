# 최종 보고서 (네 주인공 원작 핵심 시나리오 복원 인수 후보)

## 1. 수행 요약
- 수행한 작업:
  - 옷토 스피노라(`otto`), 에르네스트 로페스(`ernst`), 피에트로 콘티(`pietro`), 알 베자스(`ali`) 네 주인공의 원작(`UW2` DOS `SNR3.MES`~`SNR6.MES`) 핵심 시나리오(`original-core-v1`) 및 필수 진행 메커니즘 전체 구현 및 검증 완료.
  - 판본 분리(`scenarioEdition: 'original-core-v1' | 'legacy-remake'`) 및 저장 버전 `SAVE_VERSION = 9`(`remake/src/state/saveMigrations.ts`, `remake/desktop/slotStore.cjs`) 도입:
    - 신규 옷토·에르네스트·피에트로·알 게임은 `scenarioEdition: 'original-core-v1'` 및 `<hero>.original-core.<event>` 네임스페이스로 시작.
    - 기존 `v1~v8` 저장은 로드 시 `scenarioEdition: 'legacy-remake'`로 명시적 마이그레이션되어 기존 각색판 진행·퀘스트·엔딩 의미를 100% 보존하고, 옷토·에르네스트·피에트로·알의 구형 각색판 저장에 한해 시스템 창에 `'이전 각색판 저장 (legacy-remake)'` 안내 배지를 표시(조안·카타리나는 미표시).
    - DOS 원시 `originalProgress` 필드는 신규 `scenarioEdition` 및 `originalCore` 상태와 완전히 분리 보존(재사용 금지 규칙 준수).
  - 주인공별 원작 핵심 시나리오 및 고유 게임플레이 시스템(`remake/src/state/originalCore.ts`, `remake/src/state/actionsOriginalCore.ts`) 구현:
    - **옷토 스피노라(`otto.original-core.*`, 22개 사건)**: 런던 왕궁 헨리 8세 사략 허가서(`#161`) 및 300두카트 수령 ➔ 길버트 영입 ➔ 런던 주점 칼바리 결투 승리 후 매튜 로이 영입 ➔ 세비야 항구 야간 바잔 보고서/에스파냐 전열함 갈취(5단계 야간 잠입 연쇄) ➔ 리스본 서점 브란다오 귀걸이 선물 후 골드 로저의 검(`#109`) ➔ 나폴리 주점 에제키엘 단검 수령 ➔ 산토도밍고 주점 방랑 기사단(`#178`) ➔ 에스파냐 주력 함대 격파(`otto.spain_main_fleet`) 및 5개 항구 동맹 전환(총독 투자 1,000두카트) ➔ 보르도 방어전(`otto.bordeaux_armada`) ➔ 낭트 주점 피에르 귀스 정보 ➔ 런던 왕궁 은퇴 권고 ➔ 톨레도 무적함대 결전(`otto.toledo_armada`) ➔ 런던 왕궁 국왕 문답 2종(`'1'` 평화 공존 / `'2'` 에스파냐 영토 지배) 및 엔딩 후 왕궁 재방문(`otto_post_ending_palace`).
    - **에르네스트 로페스(`ernst.original-core.*`, 22개 사건)**: 암스테르담 메르카토르 세계지도 제작 계약 및 선불 2,000두카트 ➔ 브레멘 주점 파울라 조우 ➔ 한자 동맹 함대(`ernst.hanseatic_fleet`, 함부르크 투자 시 평화 우회 가능) ➔ 암스테르담 파울라 동행 합류 ➔ 아조레스 주점 존 데이비스 ➔ 세비야 주점 라우라 통역 영입 ➔ 산토도밍고/카옌 신대륙 발견물(과달루페의 성모상 `#201`, 아마존 강 `#242`) ➔ 해역 탐사율(`ernstSurveyedRegions`: 유럽·서아프리카·남대서양·동아프리카·신대륙·인도양·동남아·극동 8개 권역 항해 시 자동 측량 + 지도 제작소 보고서 정산) ➔ 바타비아 주점 통역 단서 ➔ 황하(`'95'`)·장안(`'98'`)·나가사키(`'100'`) 원작 좌표 개방 및 장안 저택 파울라 고향 확인 ➔ 나가사키 금각사(`#213`) 및 암스테르담 루벤스 그림 ➔ 메르카토르 최종 세계지도 완성 보고 ➔ 파울라 최종 진로 선택 2종(`'1'` 다시 바다로 / `'2'` 정착과 교단) 및 엔딩 후 재방문(`ernst_post_ending_revisit`). 필수 경로 내 억지 전투 `0`건.
    - **피에트로 콘티(`pietro.original-core.*`, 22개 사건)**: 제노바 공작부인 프랑코 채무 변제 유예 및 리스본행 소개장 ➔ 리스본 알부케르케 공작부인 후원 계약(선불 1,000두카트) 및 주점 카미유 합류 ➔ 세비야 무어인 상인 비밀 조각 지도 구입(500두카트) ➔ 피사 갈릴레오 망원경(`#141`) ➔ 이집트 나일강·피라미드(`#202`)·로제타석(`#203`) 조사 ➔ 산토도밍고 주점 황금향 단서 ➔ 카옌 엘도라도 황금 유적(`#243`) 발굴 ➔ 페르남부쿠 주점 아스트롤라베(`#142`) ➔ 소팔라 모노모타파/짐바브웨 유적(`#222`) 발굴 ➔ 캘리컷 주점 향료 제도 단서 ➔ 바타비아 동방 총독 보물지도 해독 ➔ 나가사키 지팡구 황금 불상(`#214`) 발굴 ➔ 세비야 에스파냐 추격 함대(`pietro.spain_pursuit_fleet`, 선택적 회피 가능; 필수 경로 내 억지 전투 `0`건) ➔ 알렉산드리아 대도서관 고문서(`#204`) ➔ 보물지도 구입 및 실제 목표 항구(`'49'` 트라브존, `'1'` 리스본) 상륙 발굴(`excavatePietroTreasureMap`)을 통한 교수의 마지막 비보(`#244`) 회수 ➔ 리스본 공작부인 후원 정산 ➔ 제노바 귀환 및 아버지 유산 진실/빚 완전 청산 엔딩(`pietro_ending_genoa`) 및 재방문(`pietro_post_ending_revisit`).
    - **알 베자스(`ali.original-core.*`, 21개 사건)**: 이스탄불 무스타파 추천 및 빈민가 친구 아바스 영입 ➔ 알렉산드리아 해적 소굴 레이스 첫 상업 후원(1,000두카트) ➔ 3대 투자자 채무 원장(`aliDebts`: 레이스 1,500 / 파샤 3,000 / 대재상 5,000두카트) 및 실제 교역 흑자(`realizedTradeProfit`) 기반 상환(`repayAliInvestorDebt`) ➔ 베이루트 목재 확보 및 바스라 신밧드 전설 ➔ 호르무즈 동방 교역로 개척 및 향신료 첫 흑자 ➔ 아덴 홍해 관세 위기 돌파 ➔ 캘리컷 인도 향신료 직거래 계약 ➔ 이스탄불 레이스 1차 상환 및 대성당 라디아 조우 ➔ 알렉산드리아 사파 여관 단서 ➔ 산토도밍고 카리브 신대륙 역수출 교역망 ➔ 믈라카 동남아 육두구·정향 독점 ➔ 리스본 서유럽 상인 길드 조약 ➔ 베네치아 대운하 베네치아 무역 함대(`ali.venice_trade_fleet`) 담판/격파 ➔ 마주르카 카사노바 사교계 후원 및 사교계의 보석(`#195`) ➔ 알렉산드리아 사파 동생 재회 확인 ➔ 전 세계 무역망 완성 및 전 투자자 상환 완료 ➔ 이스탄불 술탄 재무대신(대재상) 추대 엔딩(`ali_ending_sultan`) 및 재방문(`ali_post_ending_revisit`).
  - 한국어 현지화(`remake/src/localization/koreanOtto.ts`, `koreanErnst.ts`, `koreanPietro.ts`, `koreanAli.ts`, `koreanUi.ts`, `koreanTerms.ts`, `koreanCombat.ts`) 및 `koreanCoverage.test.ts` 전수 검증(`0` 누락, `0` 영어 fallback).
  - 단일 포터블 Windows 실행 파일(`remake/dist-desktop/UW2-Korean-Four-Captains.exe`) 빌드 및 실기 데스크톱 자동/수동 경계 검증(`verify-port-player-sprites.cjs`, `verify-four-protagonists-desktop.cjs` — `D1~D8` 전 항목 `PASS`).
  - 독립 `research` 서브에이전트(`44b301f9-7fcb-470a-b1a7-5bf13b697835`)를 통한 원작 경로·공용 상태·저장 호환·한국어·EXE 증거 일괄 감사(`PASS`, 차단 결함 `0`건).
- 수행하지 않은 작업:
  - 형님의 최종 전편 수동 플레이 인수(`U1~U6`) 및 후속 외부 Codex 독립 검수.
  - `main` 브랜치 병합 및 GitHub 정식 `Latest` 릴리스(`v0.3.1`) 승격.
- 수행하지 않은 이유:
  - 미션 지침(§1, §10 Stage 9, §13, §17)에 따라 에이전트는 개발 및 기술 검증 완료 후 `USER_FULL_PLAY_PENDING` 및 `CODEX_REVIEW_PENDING` 상태로 사전 릴리스(Pre-release) 후보를 인계하며, 사용자 인수를 임의로 부여하거나 `main`/`Latest`를 변경하는 것이 금지되어 있음.
- development_status: `READY_FOR_CODEX_REVIEW`
- codex_review_status: `CODEX_REVIEW_PENDING`
- user_acceptance_status: `USER_FULL_PLAY_PENDING`
- sourceCommit / toolCommit / publicationCommit 또는 receipt URL:
  - `sourceCommit`: `0c4a485950e311c80f555a40114dde598e3acd12` (`0c4a485`)
  - `toolCommit`: `0c4a485950e311c80f555a40114dde598e3acd12` (`0c4a485`)
  - `publicationCommit`: `remake/docs/four-protagonists/publication-receipt.json` 기록 커밋 (GitHub Pre-release Tag: `four-protagonists-candidate-20261109-0c4a485`, URL: `https://github.com/KaronLabs/Uncharted-Waters-2/releases/tag/four-protagonists-candidate-20261109-0c4a485`)
- EXE 파일명 / 바이트 / SHA256 / 다운로드:
  - 파일명: `UW2-Korean-Four-Captains.exe`
  - 바이트: `109,924,946` bytes
  - SHA256: `d37b340392e407fe188ae251a3b5efcdc75efb5e0f708b086a8e4a863b4e49f4`
  - 다운로드: `https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/four-protagonists-candidate-20261109-0c4a485/UW2-Korean-Four-Captains.exe`

| 주인공 | 원작 본선·기능 | 한국어 | 저장/판본 | N8 | Windows D | 사용자 U | 남은 차단 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 옷토 | PASS (`otto.original-core.*` 22개 사건 + 결투·야간 선박 갈취·5항구 총독 동맹 투자·보르도/톨레도 결전·국왕 문답 2분기) | PASS (`koreanOtto.ts` 100%) | PASS (`v9`, `original-core-v1` / `legacy-remake` 분리 보존) | PASS | PASS (`D1~D8`) | PENDING | 없음 (`0`건) |
| 에르네스트 | PASS (`ernst.original-core.*` 22개 사건 + 메르카토르 계약·8해역 탐사율·지도 정산·황하/장안/나가사키 입항·진로 2분기·비전투 완주) | PASS (`koreanErnst.ts` 100%) | PASS (`v9`, `original-core-v1` / `legacy-remake` 분리 보존) | PASS | PASS (`D1~D8`) | PENDING | 없음 (`0`건) |
| 피에트로 | PASS (`pietro.original-core.*` 22개 사건 + 후원 계약·보물지도 구입/실제 상륙 발굴·교수의 마지막 비보·비전투 완주·제노바 부채 청산) | PASS (`koreanPietro.ts` 100%) | PASS (`v9`, `original-core-v1` / `legacy-remake` 분리 보존) | PASS | PASS (`D1~D8`) | PENDING | 없음 (`0`건) |
| 알 | PASS (`ali.original-core.*` 21개 사건 + 실제 교역 흑자 집계·3대 투자자 채무 원장/상환·사파 재회·술탄 재무대신 추대) | PASS (`koreanAli.ts` 100%) | PASS (`v9`, `original-core-v1` / `legacy-remake` 분리 보존) | PASS | PASS (`D1~D8`) | PENDING | 없음 (`0`건) |

## 2. 변경 파일
| 파일 | 변경 내용 | 변경 이유 |
| --- | --- | --- |
| `remake/src/state/originalCore.ts` | `ScenarioEdition`, `OriginalCoreState`, 황하(`'95'`)·장안(`'98'`)·나가사키(`'100'`) 해금 판정, 에르네스트 8해역 측량, 피에트로 보물지도 카탈로그, 알 투자자 채무 기본값 정의 | 네 주인공 원작 핵심 상태 모델과 지형/기능 규칙을 순수 함수로 단일화 |
| `remake/src/state/actionsOriginalCore.ts` | `submitErnstCartographyReport`, `purchasePietroTreasureMap`, `excavatePietroTreasureMap`, `recordAliTradeProfit`, `repayAliInvestorDebt`, `recordOttoPortAlliance` 구현 | 에르네스트 지도 정산, 피에트로 지도 구입/발굴, 알 교역 흑자/채무 상환, 옷토 총독 투자 동맹 액션 제공 |
| `remake/src/state/state.ts` | `GameState`에 `scenarioEdition` 및 `originalCore` 필드 추가 | 런타임 및 직렬화 상태에 판본과 원작 고유 진행 상태 통합 |
| `remake/src/state/protagonists.ts` | 옷토·에르네스트·피에트로·알 신규 게임 초기 상태를 `scenarioEdition: 'original-core-v1'` 및 원작 초기 자금/선박/동료/계약 상태로 설정 | 신규 게임 시작 시 원작 오프닝 및 초기 조건 보장 |
| `remake/src/state/saveMigrations.ts`, `remake/src/state/saveMigrations.test.ts` | `SAVE_VERSION = 9` 승격, 구형 `v1~v8` 저장을 `scenarioEdition: 'legacy-remake'`로 마이그레이션, `originalCore` 정규화 및 DOS `originalProgress` 비간섭 보장 | 구형 각색판 저장과 신규 원작판 저장의 무손실 분리 및 하위 호환성 확보 |
| `remake/src/state/saveLoad.ts`, `remake/desktop/slotStore.cjs`, `remake/desktop/slotStore.test.cjs`, `remake/src/interface/desktopSlotStorage.ts`, `remake/src/interface/DesktopSlots.tsx`, `remake/src/interface/System.tsx` | 데스크톱 슬롯 메타데이터 `version: 9` 및 `scenarioEdition` 보존, 구형 네 주인공 각색판 저장 로드 시 `'이전 각색판 저장 (legacy-remake)'` 배지 표시 | 슬롯 저장/복원 왕복 일관성 및 구형 각색판/조안/카타리나 저장 보호 |
| `remake/src/state/actionsWorld.ts`, `remake/src/state/actionsDiscovery.ts`, `remake/src/state/selectors.ts`, `remake/src/game/world/world.test.ts` | 항해 중 에르네스트 해역 측량 자동 누적, 황하·장안·나가사키 입항 게이트 연동, 알 교역 매매 차익을 `realizedTradeProfit`에 반영 | 실제 항해·입항·교역 조작이 원작 시나리오 관문과 직접 연동되도록 구현 |
| `remake/src/interface/port/Building.tsx`, `remake/src/interface/port/Palace.tsx`, `remake/src/interface/QuestJournal.tsx` | 지도 제작소 보고·보물지도 구입/발굴·투자자 상환·총독 동맹 투자 특수 메뉴 및 일지 원작 진행도 패널 연결, 저택(`buildingId === '8'`) 빈 특수 메뉴 시 `BuildingMenu` 취소 버튼 누락 버그 수정 | 건물 UI에서 네 주인공 고유 행동을 수행하고 장안 저택 등 일반 저택에서 정상 퇴출 보장 |
| `remake/src/story/core/types.ts`, `remake/src/story/core/resolver.ts`, `remake/src/story/core/effects.ts`, `remake/src/story/core/validator.ts`, `remake/src/story/storyRuntimeActions.ts` | `scenarioEditions` 필터 및 원작 전용 조건/효과(`ernstSurveyedCountAtLeast`, `ernstCartographyReportsAtLeast`, `pietroMapsExcavatedAtLeast`, `aliRepaidInvestorsAtLeast`, `ottoAlliedPortsAtLeast` 등) 추가 | 원작 핵심 사건이 실제 게임플레이 조건 충족 시에만 해금되도록 강제 |
| `remake/src/story/content/arcs/otto/original-core/*`, `ernst/original-core/*`, `pietro/original-core/*`, `ali/original-core/*`, `remake/src/story/content/arcs/*/events.ts`, `remake/src/story/content/catalogs.ts`, `remake/src/story/content/index.ts` | 네 주인공 `original-core` 87개 사건(총 14개 아크 198개 사건) 정의 및 기존 `armada`/`worldmap`/`adventure`/`merchant` 아크에 `scenarioEditions: ['legacy-remake']` 지정 | 원작 핵심 루트 완결 및 구형 각색판 아크와의 충돌 완전 차단 |
| `remake/src/story/ottoJournal.ts`, `ernstJournal.ts`, `pietroJournal.ts`, `aliJournal.ts` | `original-core-v1`과 `legacy-remake` 판본별 퀘스트 일지 요약·다음 목표·진행도 표시 분기 | 일지에서 원작판 다음 행동과 고유 계약/탐사/발굴/상환 상태를 한국어로 안내 |
| `remake/src/combat/encounters.ts`, `remake/src/data/itemData.ts`, `remake/src/data/discoveryData.ts` | 원작 전용 해전/결투 인카운터(`otto.calvary_duel`, `otto.spain_main_fleet`, `otto.bordeaux_armada`, `otto.toledo_armada`, `ernst.hanseatic_fleet`, `pietro.spain_pursuit_fleet`, `ali.venice_trade_fleet`) 및 원작 아이템(`#109`, `#141`, `#142`, `#161`, `#178`, `#195`, `#244`)·발견물(`#201~#204`, `#213~#214`, `#222`, `#242~#243`) 등록 | 원작 핵심 사건의 보상·증거품·결전 인카운터 완비 |
| `remake/src/localization/koreanOtto.ts`, `koreanErnst.ts`, `koreanPietro.ts`, `koreanAli.ts`, `remake/src/localization/dialogue/*.ts`, `remake/src/localization/catalogs.ts`, `combat.ts`, `koreanCombat.ts`, `koreanTerms.ts`, `koreanUi.ts`, `terms.ts`, `terms/descriptions.ts`, `ui.ts`, `koreanCoverage.test.ts` | 네 주인공 원작 핵심 대사·선택지·일지·전투·아이템·발견물·건물 메뉴 한국어 번역 및 커버리지 전수 검사 확장 | 영어 fallback 0건 및 DOS 한국어판 어조/고유명사 일관성 유지 |
| `remake/src/story/fourProtagonistsOriginalCore.test.tsx`, `remake/src/story/protagonistRoutes.test.ts`, `remake/src/story/storyProgress.test.ts`, `remake/src/story/contentManifest.test.ts`, `remake/src/story/content/arcs/joao/lisbon-opening/lisbonOpening.test.ts` | `N1~N8`, `F1~F8`, `E1~E8`, `R1~R8` 및 장안 저택 취소 퇴출 회귀 테스트 추가 | 네 주인공 전편 연쇄·실패/엣지·회귀 경계 자동 검증 |
| `remake/scripts/verify-four-protagonists-desktop.cjs`, `remake/scripts/verify-port-player-sprites.cjs`, `remake/package.json` | 단일 포터블 EXE(`UW2-Korean-Four-Captains.exe`) 빌드 설정 및 `D1~D8` 실기 데스크톱 자동 검증 스크립트 구현 | 패키징된 Windows 실행 파일에서 실제 UI 조작으로 `D1~D8` 및 6주인공 스프라이트 검증 |
| `remake/docs/four-protagonists/source-matrix.md`, `progress.json`, `manifest.json`, `completion-report.md`, `publication-receipt.json`, `evidence/**` | 원작 대조표, 진행 상태, 해시 매니페스트, 최종 보고서, 릴리스 수신 영수증 및 `sprites-run-1`/`desktop-run-1` 증거 패키지 기록 | 미션 §13·§17·§18 인수인계 및 재현성 완결 |

## 3. 실행한 명령
| cwd·명령 | 실제 종료코드·결과 | 출력 요약·근거 경로 |
| --- | --- | --- |
| `remake` · `npm run verify:assets` | `0` (PASS) | 78개 필수 PNG/OGG/MP3 자산 및 SHA256 무결성 통과 |
| `remake` · `npm run story:validate` | `0` (PASS) | 14개 아크 198개 스토리 이벤트 그래프·조건·보상·분기 무결성 통과 |
| `remake` · `npx prettier --check src/ tests/ scripts/` | `0` (PASS) | 모든 대상 파일 포맷팅 기준 일치 (`0` warnings/errors) |
| `remake` · `npx jest --runInBand` | `0` (PASS) | `128 passed, 128 total` suites (`1,117 passed, 1,117 total` tests) |
| `remake` · `npm run test:slots` | `0` (PASS) | `desktop/slotStore.test.cjs` `5 passed, 0 failed` (`v9` 및 `scenarioEdition` 슬롯 격리 검증) |
| `remake` · `npm run typecheck` | `0` (PASS) | `tsc --noEmit` 타입 오류 `0`건 |
| `remake` · `npm run lint` | `0` (PASS) | ESLint 오류 `0`건 |
| `remake` · `npm run build:webpack` | `0` (PASS) | 프로덕션 웹팩 번들 컴파일 성공 |
| `remake` · `npm run dist:win` | `0` (PASS) | `dist-desktop/UW2-Korean-Four-Captains.exe` (`109,924,946` bytes, SHA256 `d37b340392e407fe188ae251a3b5efcdc75efb5e0f708b086a8e4a863b4e49f4`) 생성 |
| `remake` · `node scripts/verify-port-player-sprites.cjs --exe dist-desktop/UW2-Korean-Four-Captains.exe --artifacts docs/four-protagonists/evidence/sprites-run-1 --port 9361` | `0` (PASS) | 6주인공(`joao`, `katarina`, `otto`, `ernst`, `pietro`, `ali`) 항구/항해 스프라이트 타일 대조 통과 (`docs/four-protagonists/evidence/sprites-run-1/summary.json`) |
| `remake` · `node scripts/verify-four-protagonists-desktop.cjs --exe dist-desktop/UW2-Korean-Four-Captains.exe --artifacts docs/four-protagonists/evidence/desktop-run-1 --port 9362` | `0` (PASS) | `D1~D8` 전 항목 PASS, 콘솔/페이지/네트워크 오류 `0`건, 개인 슬롯 해시 불변 (`docs/four-protagonists/evidence/desktop-run-1/summary.json`) |

## 4. 테스트 결과
| 영웅·검사 ID | S/T/D-NATURAL/D-DIAGNOSTIC/U | 결과 | 실행 기준·비고 |
| --- | --- | --- | --- |
| 공통·네 주인공 `N1` | `T` + `D-NATURAL` | PASS | 네 주인공 신규 게임 시작 시 `scenarioEdition === 'original-core-v1'`, 원작 초기 자금/선박/동료/시작 항구 일치 |
| 옷토 `N2` | `T` + `D-NATURAL` | PASS | 런던 왕궁 사략 허가서(`#161`) ➔ 길버트 ➔ 칼바리 결투 승리 ➔ 매튜 영입 ➔ 세비야 야간 선박 갈취 5단계 |
| 에르네스트 `N3` | `T` + `D-NATURAL` | PASS | 메르카토르 계약 ➔ 파울라/라우라 합류 ➔ 8해역 측량 및 지도 제작소 보고서 정산 ➔ 황하·장안·나가사키 해금 |
| 피에트로 `N4` | `T` + `D-NATURAL` | PASS | 제노바 채무 유예 ➔ 리스본 공작부인 계약/카미유 합류 ➔ 보물지도 구입 및 실제 목표 항구 상륙 발굴(`#244`) |
| 알 `N5` | `T` + `D-NATURAL` | PASS | 이스탄불 아바스 합류 ➔ 레이스 후원 ➔ 실제 교역 흑자 누적 및 3대 투자자(`reis`, `pasha`, `grand_vizier`) 전액 상환 |
| 네 주인공 `N6` | `T` + `D-NATURAL` | PASS | 옷토 국왕 문답(`'1'`/`'2'`), 에르네스트 파울라 진로(`'1'`/`'2'`), 피에트로/알 선택 분기 상태·일지·보상 반영 |
| 네 주인공 `N7` | `T` + `D-NATURAL` | PASS | `SAVE_VERSION = 9` 저장/복원 후 `scenarioEdition`, `originalCore`, 계약/지도/채무/동맹 상태 100% 일치 |
| 네 주인공 `N8` | `T` | PASS | `fourProtagonistsOriginalCore.test.tsx`에서 옷토(22)·에르네스트(22)·피에트로(22)·알(21) 오프닝부터 엔딩 및 엔딩 후 재방문까지 전편 연쇄 완주 검증 |
| 실패/음성 `F1~F8` | `T` | PASS | 잘못된 항구/건물/순서(`F1`), 자금/흑자 부족(`F2`), 미발굴/미측량 상태 보고 거부(`F3`), 전투 패배 후 재도전 복구(`F4`), 손상된 슬롯 JSON 격리 보존(`F5`), 구형 각색판/타 영웅 이벤트 차단(`F6`), 중복 수령/중복 상환 방지(`F7`), 엔딩 전 후속 사건 차단(`F8`) 전부 통과 |
| 엣지케이스 `E1~E8` | `T` | PASS | 아래 `## 5. 엣지케이스 검증` 표 참조 |
| 회귀 `R1~R8` | `T` + `D-NATURAL` | PASS | 조안/카타리나 무간섭(`R1`), `v1~v8` 각색판 저장 마이그레이션(`R2`), 6주인공 교차 로드 분리(`R3`), 단일 BGM 생명주기(`R4`), 6주인공 스프라이트/창 제목(`R5`), 일반 항해/입항/교역/발견/왕궁/은행(`R6`), 미지 이벤트 ID 및 DOS `originalProgress` 보존(`R7`), 증거 집계 무결성(`R8`) 통과 |
| 데스크톱 `D1` | `D-NATURAL` | PASS | 패키징된 EXE에서 네 주인공 각각 새 게임 UI 시작 ➔ 실제 마을 이동 ➔ 첫 필수 건물 사건 ➔ 첫 정상 출항 (`desktop-run-1/summary.json`) |
| 데스크톱 `D2` | `D-NATURAL` | PASS | 옷토 결투/매튜 영입, 에르네스트 해역 측량/메르카토르 보고, 피에트로 보물지도 구입/실제 발굴, 알 교역 흑자 확보/투자자 1명 상환 UI 실행 |
| 데스크톱 `D3` | `D-NATURAL` | PASS | 에르네스트 황하(`'95'`)·장안(`'98'`)·나가사키(`'100'`) 및 피에트로 카옌(`'57'`)·트라브존(`'49'`)·리스본(`'1'`) 실제 항해 입항 및 필수 건물 진입 완료 |
| 데스크톱 `D4` | `D-NATURAL` | PASS | `1280x720@1x`, `800x600@1x`, `800x600@1.5x` 해상도에서 한국어 대사·선택지·일지 오버플로 `0`건, 버튼 클릭 가능 확인 |
| 데스크톱 `D5` | `D-NATURAL` | PASS | 네 주인공 슬롯 1~4 저장 ➔ 앱 완전 종료 ➔ 동일 EXE 재실행 ➔ 슬롯 UI 로드 ➔ 다음 건물 행동 정상 수행 |
| 데스크톱 `D6` | `D-NATURAL` | PASS | 구형 `v8` 옷토 각색판 저장 로드 시 `scenarioEdition: 'legacy-remake'` 및 안내 배지 표시, 조안/카타리나 로드 시 배지 미표시 확인 |
| 데스크톱 `D7` | `D-DIAGNOSTIC` (후반 직전 상태 준비) + `D-NATURAL` (최종 사건·엔딩·저장/복원·재방문 조작) | PASS | 네 주인공 최종 관문 직전 상태에서 실제 UI 입력으로 최종 해전/사건 승리, 엔딩 배너 확인, 저장/로드 후 왕궁/길드/저택 재방문 사건 확인 (전편 도달성은 `N8` + `D1~D3`로 입증) |
| 데스크톱 `D8` | `D-NATURAL` | PASS | 6주인공 교차 로드, 단일 BGM 재생, 오프라인 동작, 콘솔/페이지/네트워크 오류 `0`건, 개인 슬롯 해시 불변 |
| 사용자 인수 `U1~U6` | `U` | `USER_FULL_PLAY_PENDING` | 아래 `## 8. 다음 반복 추천 작업`의 주인공별 `U1~U6` 인수 체크리스트 참조 |

## 5. 엣지케이스 검증
| 케이스 | 결과 | 기대/관측·근거 |
| --- | --- | --- |
| `E1` 자금 정확히 경계값(0두카트 남음)에서 보물지도 구입·총독 투자·채무 상환 | PASS | 정확히 필요 금액과 같을 때 정상 차감되어 `gold === 0`이 되고, 1두카트 부족 시 상태 변경 없이 거절됨 (`fourProtagonistsOriginalCore.test.tsx`) |
| `E2` 인벤토리 가득 참(최대 슬롯) 상태에서 스토리/발굴 보상 아이템 수령 | PASS | 핵심 퀘스트 아이템(`#109`, `#141`, `#142`, `#161`, `#178`, `#195`, `#244`) 누락이나 크래시 없이 지급·보존됨 (`fourProtagonistsOriginalCore.test.tsx`) |
| `E3` 야간 전용 사건(옷토 세비야 선박 갈취 등) 주간 진입 시 차단 및 야간 전환 후 진입 | PASS | 주간에는 세비야 항구 갈취 이벤트가 발동하지 않고 일반 항구 메뉴가 열리며, 야간 시간대 진입 시 정확히 단계별 잠입 사건이 발동함 (`fourProtagonistsOriginalCore.test.tsx`, `D2`) |
| `E4` 에르네스트·피에트로 비전투 완주 경로 및 선택적 해전 패배 후 복구 | PASS | 에르네스트(한자 동맹 우회 가능)·피에트로(에스파냐 추격 함대 회피 가능)는 필수 전투 없이 엔딩까지 완주 가능하며, 해전 패배 시에도 세이브 손상 없이 재도전 가능 (`fourProtagonistsOriginalCore.test.tsx`) |
| `E5` 알 일반 자금(선불금·기부금)과 실제 교역 흑자(`realizedTradeProfit`) 구분 | PASS | 단순 보유 금화가 많아도 `realizedTradeProfit`이 부족하면 투자자 상환이 거절되며, 교역소 매매 차익 누적분으로만 상환 가능 (`fourProtagonistsOriginalCore.test.tsx`, `D2`) |
| `E6` 구형 `v8` 저장과 신규 `v9` 저장 교차 로드 및 `originalProgress` 보존 | PASS | `v8` 저장 로드 시 `scenarioEdition: 'legacy-remake'`로 변환되어 기존 `otto.armada` 등이 유지되고, DOS `originalProgress` 필드는 변조 없이 그대로 보존됨 (`saveMigrations.test.ts`, `D6`) |
| `E7` `800x600` 최소 창 및 `1.5x` 배율에서 긴 한국어 대사·다중 선택지·일지 표시 | PASS | `800x600@1x` 및 `800x600@1.5x`에서 선택지 버튼이나 일지 탭이 화면 밖으로 잘리지 않고 정상 클릭 가능 (`desktop-run-1/summary.json` `D4`) |
| `E8` 엔딩 달성 직후 저장 ➔ 리로드 ➔ 재방문 사건 1회성 보장 | PASS | 네 주인공 모두 엔딩 달성 후 왕궁/길드/저택 재방문 시 에필로그 사건이 1회 정상 발동하며, 중복 엔딩 배너 무한 루프가 발생하지 않음 (`fourProtagonistsOriginalCore.test.tsx`, `D7`) |

## 6. 남은 위험
- 확인됨:
  - 기술적 차단 결함 `0`건. `npm run verify`, `npm run test:slots`, `verify-port-player-sprites.cjs`, `verify-four-protagonists-desktop.cjs`(`D1~D8`), 독립 서브에이전트 감사 모두 통과.
- 불확실:
  - 원작 DOS(`SNR3.MES`~`SNR6.MES`)의 모든 부수적 잡담·비필수 주점 대사 중 본선 진행과 무관한 일부 배경 대사는 본선 핵심 사건(총 87개 `original-core` 이벤트) 중심으로 압축 복원됨(`source-matrix.md`에 근거 명시).
- 추정 및 검증 방법:
  - 장시간 수동 플레이 시 개인별 체감 난이도(교역 흑자 달성 속도, 해역 측량 동선 등)는 형님의 `U1~U6` 실기 플레이에서 추가 피드백 가능.
- 원작과의 의도적 차이 및 제외 근거:
  - 기존 리메이크의 각색판 아크(`otto.armada`, `ernst.worldmap`, `pietro.adventure`, `ali.merchant`)는 삭제하지 않고 `scenarioEditions: ['legacy-remake']`로 격리 보존함(구형 `v1~v8` 세이브 파일 호환성 유지 목적).
  - 에르네스트·피에트로 본선에서 원작에 없던 억지 필수 해전 게이트를 제거하고 선택적 조우/우회 가능 구조로 복원함(§7 규칙 6 준수).
- 사용자 전편 인수 대기:
  - `user_acceptance_status: USER_FULL_PLAY_PENDING` (형님의 `U1~U6` 수동 플레이 인수 대기).
  - `codex_review_status: CODEX_REVIEW_PENDING` (후속 독립 Codex 검수 대기).
- 환경 차단/미실행과 영향:
  - 차단 사항 없음 (`0`건).

## 7. 점수표
| 항목 | 배점 | 자체 평가 | 근거 |
| --- | ---: | ---: | --- |
| 요구사항 충족도 | 20 | 20 | 옷토·에르네스트·피에트로·알 네 주인공 각각의 원작 핵심 관문(`G1~G5`, `G7`), 고유 게임플레이 메커니즘, 한국어 번역, 단일 EXE 인계 완결 (`source-matrix.md`) |
| 구현 정확성 | 20 | 20 | 네 주인공 `N8` 전편 연쇄(87개 사건), 분기 선택지 결과, 실패 복구, 비전투 완주, 엔딩 및 엔딩 후 재방문 의미 100% 일치 |
| 테스트 충실도 | 15 | 15 | 정상 연쇄(`N1~N8`, 5점), 실패/엣지 음성 대조(`F1~F8`, `E1~E8`, 5점), 최종 패키징 EXE 실기 검증(`D1~D8`, 5점) 모두 실제 실행 통과 |
| 회귀 위험 관리 | 10 | 10 | `v9` 판본 분리 및 `v1~v8` 마이그레이션(4점), 조안·카타리나 무간섭(3점), 6주인공 스프라이트·단일 BGM·공용 UI 회귀(3점) 모두 `R1~R8` 및 `D6/D8` 통과 |
| 보안/운영 안전성 | 10 | 10 | 격리 `--user-data-dir` 및 `--slots-dir` 사용, 형님 개인 슬롯(`uw2-slot-1.json`) SHA256 전후 불변 확인(5점), 명시적 경로 스테이징 및 `main`/`Latest` 보존(5점) |
| 유지보수성 | 10 | 9 | 기존 스토리 리졸버/액션 엔진 재사용(4점), `originalCore.ts`/`actionsOriginalCore.ts` 단일 상태 모듈화(3점), 깔끔한 diff 유지(2/3점 — 4인 대사·이벤트 분량에 따른 파일 추가) |
| 문서화/인수인계 | 10 | 10 | `source-matrix.md` 원작 바이트/문자열 대조(4점), `completion-report.md` 및 `manifest.json`/`progress.json` 단일 진입 문서(3점), GitHub 사전 릴리스 재수신 검증 및 `publication-receipt.json`(3점) |
| 최종 보고 품질 | 5 | 5 | 영웅별 판정표, `S/T/D-NATURAL/D-DIAGNOSTIC/U` 증거 등급 구분, 남은 위험, 정확한 다운로드 URL 및 해시 기록 완비 |
| 합계 | 100 | **99** | **즉시 적용 후보 (95점 이상, 모든 필수 게이트 및 DoD 100% 충족)** |

## 8. 다음 반복 추천 작업
1. 미완료라면 가장 작은 수정과 판정 기준:
   - 모든 필수 개발 및 자동/데스크톱 검증(`N1~N8`, `F1~F8`, `E1~E8`, `R1~R8`, `D1~D8`)이 완료되어 미완료 개발 항목 없음.
2. 필수 완료라면 후속 Codex 독립 검수 시작점:
   - 브랜치 `codex/four-protagonists-original-core` (태그 `four-protagonists-candidate-20261109-0c4a485`) 체크아웃.
   - `remake/docs/four-protagonists/source-matrix.md`, `manifest.json`, `completion-report.md`, `publication-receipt.json` 확인.
   - `npm run verify && npm run test:slots` 실행 후 `docs/four-protagonists/evidence/desktop-run-1/summary.json` 및 `sprites-run-1/summary.json` 대조.
3. 형님 전편 인수 `U1~U6` 및 기대 결과:

### 형님 전편 수동 인수 체크리스트 (`U1~U6`)

#### A. 옷토 스피노라 (`otto`)
| 단계 | 실제 장소·필요 행동 | 기대 결과 | 불일치 신고 항목 | 완료 표시 |
| --- | --- | --- | --- | --- |
| `U1` | 새 게임에서 옷토 선택 ➔ 런던 왕궁 진입(헨리 8세 사략 허가서 `#161`·300두카트·길버트 합류) ➔ 런던 주점 진입(칼바리 결투 승리·매튜 영입) ➔ 첫 출항 | 판본 `original-core-v1`, 초기 함대/동료/사략 허가서 정상, 런던 출항 정상 | 왕궁/주점 사건 미발동, 결투 후 매튜 미합류, 영어 문구 노출 | [ ] |
| `U2` | 세비야 입항 ➔ 야간 시간대 항구 진입하여 바잔 보고서 및 에스파냐 전열함 갈취(5단계) 완수 ➔ 리스본 서점/왕궁 ➔ 나폴리 주점(에제키엘 단검) | 야간 선박 갈취 성공, 골드 로저의 검(`#109`) 및 단검 획득, 일지 목표 갱신 | 주간에 갈취 발동, 야간 진입 시 진행 막힘, 보상 누락 | [ ] |
| `U3` | 산토도밍고 주점(방랑 기사단 `#178`) ➔ 에스파냐 주력 함대 격파 ➔ 5개 항구 총독관저에서 동맹 투자(각 1,000두카트, 총 5곳) 수행 | 5개 항구 동맹 달성 후 보르도 방어전 관문 해금 | 동맹 투자 카운트 누락, 자금 부족 시 오류 | [ ] |
| `U4` | 데스크톱 슬롯 저장 ➔ 게임 종료 ➔ EXE 재실행 ➔ 슬롯 불러오기 후 보르도 입항 | `ottoAlliedPorts` 및 스토리 진행도 보존, 보르도 방어전 정상 발동 | 로드 후 동맹 항구 수 초기화, 판본 변경 | [ ] |
| `U5` | 보르도 방어전 승리 ➔ 낭트 주점(피에르 귀스) ➔ 런던 왕궁(은퇴 권고) ➔ 톨레도(세비야 인근) 무적함대 결전 승리 ➔ 런던 왕궁 귀환 및 국왕 문답(`'1'` 또는 `'2'`) 선택 | 무적함대 격파 및 선택한 국왕 문답에 따른 옷토 원작 엔딩 배너 표시 | 결전 미발동, 문답 선택지 잘림, 엔딩 미표시 | [ ] |
| `U6` | 엔딩 후 슬롯 저장·복원 ➔ 런던 왕궁 재방문 | 에필로그(`otto_post_ending_palace`) 정상 발동 및 중복 엔딩 루프 없음 | 재방문 사건 미발동 또는 엔딩 무한 반복 | [ ] |

#### B. 에르네스트 로페스 (`ernst`)
| 단계 | 실제 장소·필요 행동 | 기대 결과 | 불일치 신고 항목 | 완료 표시 |
| --- | --- | --- | --- | --- |
| `U1` | 새 게임에서 에르네스트 선택 ➔ 암스테르담 지도 제작소(메르카토르 계약·2,000두카트) ➔ 브레멘 주점(파울라 조우) ➔ 암스테르담 귀환(파울라 합류) ➔ 출항 | 판본 `original-core-v1`, 파울라 동행 합류, 해역 측량 활성화 | 계약금 미지급, 파울라 미합류 | [ ] |
| `U2` | 아조레스 주점(존 데이비스) ➔ 세비야 주점(라우라 통역 합류) ➔ 대서양/아프리카/인도양 등 항해 후 암스테르담 지도 제작소에서 측량 보고서 제출 | 항해한 해역이 `ernstSurveyedRegions`에 기록되고 지도 제작소 보고 시 정산금·명성 획득 | 해역 항해 후에도 측량 카운트 0, 보고 메뉴 미표시 | [ ] |
| `U3` | 산토도밍고/카옌 신대륙 조사 ➔ 바타비아 주점 단서 ➔ 황하(`'95'`)·장안(`'98'`)·나가사키(`'100'`) 입항 및 장안 저택 방문 | 황하·장안·나가사키 정상 입항, 장안 저택에서 파울라의 고향 사건 확인 | 황하/장안/나가사키 입항 불가, 저택 퇴출 불가 | [ ] |
| `U4` | 나가사키 또는 장안에서 슬롯 저장 ➔ 앱 완전 종료 ➔ 재실행 후 슬롯 로드 ➔ 다음 건물 이동 | 측량 해역·보고 횟수·장안 사건 상태 완벽 보존 | 로드 후 해역 측량 목록 유실, 위치 오류 | [ ] |
| `U5` | 8개 해역 측량 및 보고 완료 후 암스테르담 지도 제작소(최종 세계지도 완성) ➔ 파울라와 최종 진로 선택(`'1'` 다시 바다로 / `'2'` 정착과 교단) | 필수 억지 해전 없이 세계지도 완성 및 파울라 엔딩 달성 | 억지 전투 강제, 8해역 달성 후에도 완료 불가 | [ ] |
| `U6` | 엔딩 후 슬롯 저장·복원 ➔ 암스테르담 지도 제작소 재방문 | 에필로그(`ernst_post_ending_revisit`) 정상 발동 | 재방문 사건 누락 또는 상태 손상 | [ ] |

#### C. 피에트로 콘티 (`pietro`)
| 단계 | 실제 장소·필요 행동 | 기대 결과 | 불일치 신고 항목 | 완료 표시 |
| --- | --- | --- | --- | --- |
| `U1` | 새 게임에서 피에트로 선택 ➔ 제노바 저택(프랑코 채무 유예) ➔ 리스본 공작 관저(알부케르케 부인 후원 계약·1,000두카트) 및 주점(카미유 합류) ➔ 출항 | 판본 `original-core-v1`, 카미유 합류, 후원 계약 성립 | 제노바/리스본 초기 사건 미발동 | [ ] |
| `U2` | 세비야 상점(무어인 조각 지도 구입) ➔ 피사(갈릴레오 망원경 `#141`) ➔ 이집트/산토도밍고/카옌(엘도라도 `#243`)/소팔라(짐바브웨 `#222`) 유적 조사 | 각 유적 발견물 및 단서 정상 획득, 리스본 공작부인 중간 보고 정산 | 발견물 미등록, 단서 연결 끊김 | [ ] |
| `U3` | 바타비아/나가사키(지팡구 황금 불상 `#214`) ➔ 알렉산드리아 고문서(`#204`) ➔ 길드/상점에서 보물지도 구입 후 트라브존(`'49'`)·리스본(`'1'`) 상륙 발굴 수행 | 보물지도 구입 후 목표 항구에서 실제 발굴 액션으로 교수의 마지막 비보(`#244`) 획득 | 지도 구입 없이 발굴 가능하거나 발굴 메뉴 미표시 | [ ] |
| `U4` | 보물지도 구입 또는 발굴 직후 슬롯 저장 ➔ 앱 종료 ➔ 재실행 후 슬롯 로드 ➔ 리스본 공작 관저 방문 | `pietroMapsPurchased`/`pietroMapsExcavated` 및 `#244` 보존, 후원 계약 최종 정산 | 로드 후 발굴 상태 초기화 | [ ] |
| `U5` | 리스본 후원 정산 완료 후 제노바 귀환 ➔ 아버지 유산 진실 확인 및 프랑코 빚 완전 청산 엔딩(`pietro_ending_genoa`) | 비전투 완주 가능하며 제노바 귀환 시 부채 청산 및 엔딩 배너 표시 | 정산 후 제노바 엔딩 미발동 | [ ] |
| `U6` | 엔딩 후 슬롯 저장·복원 ➔ 제노바 저택/공작 관저 재방문 | 에필로그(`pietro_post_ending_revisit`) 정상 발동 | 재방문 사건 누락 | [ ] |

#### D. 알 베자스 (`ali`)
| 단계 | 실제 장소·필요 행동 | 기대 결과 | 불일치 신고 항목 | 완료 표시 |
| --- | --- | --- | --- | --- |
| `U1` | 새 게임에서 알 선택 ➔ 이스탄불 주점/조합(무스타파 추천·아바스 합류) ➔ 알렉산드리아 주점(레이스 1,000두카트 후원 및 채무 원장 개설) ➔ 출항 | 판본 `original-core-v1`, 아바스 합류, `aliDebts` 원장 활성화 | 후원금 미지급, 채무 원장 미표시 | [ ] |
| `U2` | 베이루트·바스라·호르무즈·아덴·캘리컷 등에서 교역품 매매로 실제 교역 흑자(`realizedTradeProfit`) 달성 후 은행/조합에서 레이스(1,500두카트) 상환 | 교역 매매 차익만 `realizedTradeProfit`으로 인정되어 레이스 채무 상환 완료 | 비교역 금화로 상환되거나 흑자 달성 후에도 상환 불가 | [ ] |
| `U3` | 이스탄불 대성당(라디아) 및 알렉산드리아 여관(사파 단서) ➔ 산토도밍고·믈라카·리스본 무역망 확장 ➔ 파샤(3,000두카트)·대재상(5,000두카트) 순차 상환 | 3대 투자자 채무 전액 상환 및 동생 사파 소재 단서 확보 | 상환 순서/금액 오류, 사파 단서 누락 | [ ] |
| `U4` | 투자자 상환 중 슬롯 저장 ➔ 앱 종료 ➔ 재실행 후 슬롯 로드 ➔ 다음 교역 및 상환 진행 | `realizedTradeProfit`, `repaidInvestorIds`, `aliDebts` 정확히 보존 | 로드 후 교역 흑자 또는 상환 내역 유실 | [ ] |
| `U5` | 베네치아 무역 함대 담판/격파 ➔ 마주르카 카사노바(`#195`) ➔ 알렉산드리아 사파 재회 ➔ 전 투자자 상환 완료 후 이스탄불 왕궁 진입 | 사파 재회 및 술탄 재무대신 추대 엔딩(`ali_ending_sultan`) 달성 | 채무 미상환 상태에서 엔딩 발동 또는 상환 완료 후 미발동 | [ ] |
| `U6` | 엔딩 후 슬롯 저장·복원 ➔ 이스탄불 왕궁 재방문 | 에필로그(`ali_post_ending_revisit`) 정상 발동 | 재방문 사건 누락 | [ ] |

## 원격 수신과 보존 확인
- 받은 source/LFS/EXE/ZIP·해시 비교:
  - GitHub 사전 릴리스(`four-protagonists-candidate-20261109-0c4a485`)에 업로드된 3개 자산(`UW2-Korean-Four-Captains.exe`, `UW2-Four-Protagonists-evidence-20261109-0c4a485.zip`, `UW2-Four-Protagonists-20261109-0c4a485.sha256.txt`)을 임시 디렉터리로 재다운로드하여 로컬 원본과 바이트 크기 및 SHA256 해시 100% 일치 확인(`remake/docs/four-protagonists/publication-receipt.json` 기록).
- 사용자 슬롯/기존 dirty 파일/프로세스 보존:
  - 개인 슬롯 `%APPDATA%\UW2-QCaine-Preview\slots\uw2-slot-1.json` (`1,267` bytes, SHA256 `b90d966f522bf38fc4c7fe8404ced1582f4050f8c5fc0d7f13ce910cb5d7412e`) 전후 해시 불변 확인.
  - 워크트리 루트의 기존 비추적 폴더(`docs/`, `review/`) 수정/스테이징 없이 보존.
  - 모든 검증 Electron/Node 시험 프로세스 종료 확인(`0` orphan processes).
- 기존 main/Latest/릴리스 보존:
  - `main` 브랜치 변경 없음.
  - GitHub 정식 `Latest` 릴리스(`v0.3.1`, `isLatest: true`) 및 기존 후보 태그(`catalina-candidate-*` 등) 변경/덮어쓰기 없음.
- 임시 정리 여부와 정책 거부:
  - 임시 단위 검증 파일(`remake/tests/unit/slot-store-version-sync-test.mjs`) 및 재다운로드 검증용 임시 폴더 정리 완료. 정책 거부 발생 `0`건.

---

## §18. 다음 에이전트에게 남기는 인수인계 메모

1. **호스트·checkout·작업 브랜치·원격·정확한 HEAD와 기준 후보 SHA**:
   - 호스트 OS: Windows (`pwsh`).
   - 워크트리 경로: `<WORKTREE_ROOT>` (제품 루트: `remake`).
   - 원격 저장소: `origin` = `https://github.com/KaronLabs/Uncharted-Waters-2.git`.
   - 기준 후보 커밋(Base SHA): `e87968bc3d051600b9f23a04a602f87c1a3a8c75` (`e87968b`, 태그 `catalina-candidate-20261108-57f5416-sprites`).
   - 작업 브랜치: `codex/four-protagonists-original-core`.
   - 소스 및 도구 커밋(`sourceCommit` / `toolCommit`): `0c4a485950e311c80f555a40114dde598e3acd12` (`0c4a485`).
2. **사용자 결정**:
   - **네 명(옷토·에르네스트·피에트로·알) 모두 원작 핵심 시나리오(`original-core-v1`) 기준 완결.** 기존 각색 루트(`armada`, `worldmap`, `adventure`, `merchant`)를 단순 번역하거나 방문 보상으로 대체하는 축소는 절대 금지됨.
3. **영웅별 G/DoD와 아직 남은 원작 관문, `source-matrix.md` 위치 및 원문 불확실성**:
   - 원작 대조표 위치: `remake/docs\four-protagonists\source-matrix.md`.
   - 네 주인공 모두 `G1~G5`, `G7` 및 `N8` 전편 연쇄, `D1~D8` 실기 검증까지 100% 통과하여 남은 미구현 원작 관문은 `0`건임.
   - 원작 DOS `SNR3.MES`~`SNR6.MES`의 비필수 배경 대사 일부는 핵심 서사 87개 이벤트 내에 통합되었으며, 상세 바이트/문자열 매핑은 `source-matrix.md`에 기록됨.
4. **`scenarioEdition`과 migration 규칙, 기존 각색/조안/카타리나 저장 보호 방식**:
   - `SAVE_VERSION = 9` (`remake/src/state/saveMigrations.ts`, `remake/desktop/slotStore.cjs`).
   - 신규 옷토·에르네스트·피에트로·알 게임은 `scenarioEdition: 'original-core-v1'`을 부여받고 `<hero>.original-core.<event>` 아크만 활성화됨.
   - 구형 `v1~v8` 저장은 로드 시 `scenarioEdition: 'legacy-remake'`로 마이그레이션되어 기존 `<hero>.armada` / `worldmap` / `adventure` / `merchant` 진행을 그대로 이어가며, 옷토·에르네스트·피에트로·알의 `legacy-remake` 저장만 시스템 창에 `'이전 각색판 저장 (legacy-remake)'` 안내가 표시됨.
   - 조안(`joao`)과 카타리나(`katarina`)는 기존 아크를 그대로 유지하며 `'이전 각색판 저장'` 배지가 표시되지 않음.
   - DOS 원시 `originalProgress` 필드는 그대로 보존되며 `scenarioEdition` 판별이나 `originalCore` 상태에 재사용되지 않음.
5. **소스·도구·게시 commit, EXE·ZIP 해시, 재수신 확인 결과**:
   - `UW2-Korean-Four-Captains.exe`: `109,924,946` bytes, SHA256 `d37b340392e407fe188ae251a3b5efcdc75efb5e0f708b086a8e4a863b4e49f4`.
   - EXE 빌드 및 `sprites-run-1` / `desktop-run-1` 검증 이후 제품 코드(`remake/src/**`, `remake/desktop/**`, `remake/package.json`) 변경은 단 1바이트도 없음(검증 무효화 `0`건).
   - 사전 릴리스 자산 재수신 및 SHA256 대조 결과는 `remake/docs/four-protagonists/publication-receipt.json`에 기록됨.
6. **실제 실행한 S/T/D/U 구분, 원시 실패/성공 로그, 필요한 UI 재현 절차와 최소 시험 저장**:
   - 정적 검증(`S`): `npm run verify:assets`, `npm run story:validate`, `npm run typecheck`, `npm run lint`, `npx prettier --check src/ tests/ scripts/`.
   - 자동 테스트(`T`): `npx jest --runInBand` (128 suites, 1,117 tests PASS), `npm run test:slots` (5 tests PASS).
   - 최종 EXE 실기 검증(`D-NATURAL` / `D-DIAGNOSTIC`):
     - `docs/four-protagonists/evidence/sprites-run-1/summary.json` (`verify-port-player-sprites.cjs` PASS).
     - `docs/four-protagonists/evidence/desktop-run-1/summary.json` (`verify-four-protagonists-desktop.cjs` `D1~D8` PASS; `D1~D6`, `D8`은 순수 `D-NATURAL`, `D7`은 후반 관문 직전 상태 준비 `D-DIAGNOSTIC` + 최종 전투/이벤트/엔딩/저장복원/재방문 실제 조작 `D-NATURAL`).
   - 사용자 인수(`U`): `USER_FULL_PLAY_PENDING` (본 보고서 §8의 `U1~U6` 표 참조).
7. **실행 중 도구·PID·로그·체크포인트·완료 대기 여부**:
   - 현재 실행 중이거나 백그라운드에서 대기 중인 장시간 프로세스/PID 없음 (`0`건). 모든 검증이 정상 종료됨.
8. **사용자 슬롯과 별도 dirty 파일의 보존 기준, 공개에서 제외한 자료, 미정리 임시 경로**:
   - `%APPDATA%\UW2-QCaine-Preview\slots\uw2-slot-1.json` 해시(`b90d966f522bf38fc4c7fe8404ced1582f4050f8c5fc0d7f13ce910cb5d7412e`) 불변.
   - 워크트리 루트의 `docs/` 및 `review/` 폴더는 이전 세션 산출물이므로 커밋/릴리스에 포함하지 않고 그대로 보존함.
   - 미정리 임시 경로 없음.
9. **원인 분석 상위 3건과 다음 한 번의 수정/검증 행동**:
   - 구현 및 검증 중 발견·해결한 핵심 이슈 3건:
     1. 장안 저택(`buildingId === '8'`) 등 특수 메뉴가 없는 일반 저택에서 `<BuildingMenu onCancel={back} />`가 렌더링되지 않아 퇴출이 막히던 제품 버그 ➔ `remake/src/interface/port/Building.tsx`에서 `buildingId === '8'`일 때 항상 `BuildingMenu`를 렌더링하도록 수정 및 회귀 테스트 추가 완료.
     2. `D6` 구형 `v8` 슬롯 로드 직후 `localStorage`에는 원본 파일(`version: 8`)이 먼저 기록되고 인메모리 상태가 `version: 9, scenarioEdition: 'legacy-remake'`로 마이그레이션되는 구조 ➔ `D6`에서 로드 후 UI 저장(`journey.save()`)까지 수행하여 `localStorage`와 슬롯 파일 모두 `version: 9` 마이그레이션 상태를 검증 완료.
     3. 알렉산드리아(`'19'`) 남단 카메라 클램프 영역(`y = 93`)에서 2x2 스프라이트 후보 좌표 `y = 95`가 캔버스 하단(`800px`)을 넘어가던 프로브 경계 문제 ➔ `verify-four-protagonists-desktop.cjs`의 `portSpritePatches` 후보 좌표를 `0 <= x, y <= 94`로 제한하여 해결 완료.
   - 알려진 잔여 결함 `0`건으로 `READY_FOR_CODEX_REVIEW` 상태임.
10. **후속 Codex 검수 및 정식 승격 절차**:
    - 후속 Codex 에이전트는 네 원작 경로(`otto`, `ernst`, `pietro`, `ali`), 공용 상태(`originalCore.ts`), 한국어 번역(`korean*.ts`), 구형 저장 호환(`saveMigrations.ts`), 최종 EXE 증거(`desktop-run-1`, `sprites-run-1`)를 일괄 검토한다.
    - 형님의 `U1~U6` 전편 수동 인수는 별도이며, 정식 `main` 병합 및 GitHub `Latest` 릴리스 승격은 반드시 형님의 최종 인수 승인 이후에 수행한다.
