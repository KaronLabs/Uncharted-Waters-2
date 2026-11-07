# 최종 보고서

## 1. 수행 요약
- **개발 상태:** `READY_FOR_CODEX_REVIEW` (제품 상태 표시: `조안 사용자 인수 완료 / 카타리나 인수 후보·사용자 전편 검증 대기 / 나머지 네 주인공 미완료`)
- **사용자 인수 상태:** `USER_FULL_PLAY_PENDING` (형님의 새 게임부터 엔딩까지 수동 전편 플레이 인수 대기)
- **수행한 작업:**
  - **G1 (카타리나 P0~P8 전체 경로 구현 — `PASS`):** 세비야 시작(`P0`) → 레벨리온호 탈취 및 에밀리오 1등항해사 합류(`P1`, `seville-mutiny`) → 출항 후 해상 1일 경과 시 스페인 추격전 자동 발동·패배/퇴각 시 세비야 항구 재도전(`P2`, `spanish-pursuit` / `spanish-pursuit-retry`) → 세우타 주점 조안 함대 대치·패배/퇴각 시 세우타 항구 재도전(`P3`, `ceuta-clash` / `ceuta-clash-retry`) → 마사와 주점 진상 확인(`P4`, `massawa-truth`) → 카옌 여관 구출 일기토·패배 시 카옌 항구 재도전(`P5`, `cayenne-rescue` / `cayenne-rescue-retry`) → 아마존강 하구(`mouth-of-the-amazon`) 발견 및 카옌 항구 마르티네스 기함 결전·재도전(`P6`, `amazon-reckoning` / `amazon-reckoning-retry`) → 세비야 왕궁 귀환 엔딩 및 `CatalinaEnding` 화면(`P7`, `seville-homecoming`) → 엔딩 이후 저장·복원·재방문 시 중복 발동 차단 및 자유 항해 유지(`P8`) 전 구간 연결 및 공용 런타임 결함 5건 수정 완료.
  - **G2 (전용·공용 노출 한국어 완성 — `PASS`):** `remake/src/localization/koreanCatalina.ts` 신설(카타리나 아크 제목 1건 + `katarinaVengeanceDialogue` 대사·선택지 32건 = 총 33건 전용 번역 추가), `catalogs.ts` 통합, `Harbor.tsx` 1등항해사 동적 화자(`getFirstMateId()`) 패치로 카타리나 항구 대사에서 `에밀리오 산체스` 표시, `koreanCoverage.test.ts` 및 `koreanCatalina.test.ts`(`N7`, `F8`)로 누락 키 `0`, 충돌 `0`, 토큰 불일치 `0`, 사용자 선박명 보존 검증 완료.
  - **G3 (저장 계보와 주인공 분리 — `PASS`):** `saveLoad.ts`의 `localStorage.setItem` 예외 격리(`F5`), 조안/카타리나 슬롯 20회 교차 로드(`E7`/`D5`), 손상·구버전·빈 슬롯 방어(`F4`), 늦은 비동기 로드 응답 차단(`F6`/`E8`) 검증 완료.
  - **G4 (조안·공용 BGM 회귀 방지 — `PASS`):** `desktop/main.cjs`의 `app://` 프로토콜 핸들러 `decodeURIComponent` 패치로 유니코드 파일명(`theme-of-joão.ogg`) 해상 BGM 디코딩 결함 해결, `verify-bgm-load.cjs`(23회 연속 로드·2회 프로세스 기동) 및 `verify-catalina-desktop.cjs`(`D5`/`D8`)에서 활성 `<audio>` 객체 단일 유지(`<= 1`), 음소거 보존, 동일곡 `currentTime` 연속성 검증 완료.
  - **G5 (실제 Windows 후보 실행 — `PASS`):** 고정 후보 EXE(`dist-desktop/UW2-Catalina-Korean.exe`, `109,879,594` bytes, SHA256 `d5ff3ef177a252c060974702baa6ece6bd679a16f74da5994b725402552f58bd`)를 빌드하고 격리 프로필·슬롯에서 `D1~D8` 전 항목 실제 실행 검증 완료.
  - **G6 (테스트·증거의 재현성 — `PASS`):** `npm run verify`(Jest 126 suites / 1,103 tests PASS, `test:slots` 4/4 PASS, asset/story/typecheck/lint/webpack PASS), `npx tsc --noEmit -p tests/tsconfig.json` PASS, `desktopAcceptance.test.cjs`(30/30 PASS), `verify-bgm-load.cjs` PASS, `verify-catalina-desktop.cjs` PASS 및 `manifest.json` 고정.
  - **G7 (일괄 검수 인계와 원격 수신 — `PASS`):** `codex/catalina-complete` 브랜치 푸시, 사전 릴리스 `catalina-candidate-20261108-ca0b136` 게시, 격리 수신 폴더에서 Git/LFS 및 릴리스 자산 재수신 대조 완료.
  - **G8 (범위·완료 표현·운영 보존 — `PASS`):** 원작(`SNR2.DAT`) 대비 현행 리메이크 각색·축약 내역을 본 보고서 §9.1에 명시하고, `main` 브랜치·`Latest` 릴리스·기존 v0.3.1 자산·사용자 `%APPDATA%` 슬롯 원본 불변을 보존함.
- **수행하지 않은 작업:**
  1. **제외 범위 (§6.2):** 옷토·에르네스트·피에트로·알 베자스 4인의 전용 스토리 완주 구현, DOS 원본 `SNR2.DAT` 바이트코드 인터프리터/모든 명성 임계값·무작위 항구 탐색(브레 페로 20개 항구 난수 탐색 등)의 1:1 재작성, `main` 병합 및 GitHub `Latest` 릴리스 교체.
  2. **사용자 전편 인수 미실행 (`U1~U8` — `NOT_RUN`):** 새 카타리나 게임부터 엔딩까지 상태 주입이나 진단 슬롯 없이 사람이 직접 전 세계 항로를 수동 항해하여 완주하는 `U1~U8` 전편 수동 인수는 계약(§0, §3.4, §11)에 따라 형님의 수동 인수 단계(`USER_FULL_PLAY_PENDING`)로 분리함.
- **수행하지 않은 이유:**
  - §3.4 및 §6.2 계약에 따라 현행 리메이크의 카타리나 P0~P8 전체 경로를 완결하고 원작과의 차이를 투명하게 문서화하는 것이 이번 미션의 범위이며, 타 주인공 확장이나 무단 정식 배포(`main`/`Latest` 변경)는 명시적 금지사항(§7, §14)임.
  - 또한 `T`(`catalinaIntegration.test.tsx`의 `N8` 단일 계보 연쇄 통합 검사)와 `D`/`D-DIAGNOSTIC`(`verify-catalina-desktop.cjs`의 실제 EXE `P0->P3` 연속 항해 및 `P4~P8` 진단 슬롯 검증)을 합쳐 `U`(정상 전편 수동 완주)로 포장하는 것은 §11 및 §14 위반이므로 엄격히 분리하여 기록함.
- **기준 main / 제품 commit / 검증 도구 commit / 게시 commit을 확인할 publication-receipt.json URL:**
  - 기준 `main` SHA: `370d535a5af5fb170fcbbb3447fb8c218d5e19a3`
  - 제품 `sourceCommit` SHA: `ca0b1360e75384844a796be0edf87872d75b53b6` (`ca0b136`)
  - 검증 도구 `toolCommit` SHA: `d9658e65ee2d8d481d7b2a14afe4676e31d29250` (`d9658e6`)
  - 게시 `publicationCommit` (`P`) 및 원격 재수신 검증 영수증 URL: https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/catalina-candidate-20261108-ca0b136/publication-receipt.json
- **최종 EXE 이름 / 크기 / SHA256 / 후보 다운로드:**
  - 파일명: `UW2-Catalina-Korean.exe` (로컬 경로: `remake/dist-desktop/UW2-Catalina-Korean.exe`)
  - 크기: `109,879,594` bytes
  - SHA256: `d5ff3ef177a252c060974702baa6ece6bd679a16f74da5994b725402552f58bd`
  - 후보 다운로드 URL: https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/catalina-candidate-20261108-ca0b136/UW2-Catalina-Korean.exe
- **내부 검토자 / 자체 또는 독립 여부 / 대상 commit / 미해결 Critical·Important 개수:**
  - 내부 검토자: 읽기 전용 분리 서브에이전트 `Independent Catalina Candidate Auditor` (`conversationId: 1cb66dd8-a180-43d8-92df-174c94f82f6a`) + 아콘(실행 에이전트) 교차 감사
  - 독립 여부: 동일 세션 내 읽기 전용 `research` 서브에이전트 분리 감사 완료 (외부 Codex 세션 검수 전이므로 보수적으로 `INTERNAL_REVIEW_SUBAGENT_READONLY` 및 최종 `CODEX_REVIEW_PENDING` 병기)
  - 대상 commit: `ca0b1360e75384844a796be0edf87872d75b53b6` (제품) / `d9658e65ee2d8d481d7b2a14afe4676e31d29250` (검증 도구)
  - 미해결 Critical 개수: `0`건 / 미해결 Important 개수: `0`건 / 미해결 Minor 개수: `0`건
- **독립 내부 도구 부재 시 표시 / 최종 Codex 검수 상태:**
  - 내부 읽기 전용 서브에이전트 감사는 완료했으나 최종 외부 독립 통합 검수는 Codex 담당이므로 `CODEX_REVIEW_PENDING`으로 명시함.
- **전체 정상 플레이 U 실행 여부 / 실행 주체 / 저장 계보 / 증거:**
  - `U1~U8` 정상 전편 수동 플레이 실행 여부: `NOT_RUN` (`USER_FULL_PLAY_PENDING`, 실행 주체: 형님)
  - 개발 검증에서 수행한 실제 EXE 연속 플레이(`D1~D4`: 새 게임 `P0` → 세비야 `P1` → 해상 항해 및 스페인 추격전 `P2` → 세우타 입항 및 조안 함대 해전 `P3` → 슬롯 2 저장 `uw2-slot-2.json`)와 중후반 진단 슬롯 실행(`D3`/`D6` `D-DIAGNOSTIC`: 마사와 `P4` → 카옌 `P5`/`P6` → 세비야 귀환 엔딩 `P7` → 엔딩 이후 저장·복원·재방문 `P8`, `uw2-slot-3.json`) 및 단위/통합 단일 계보 연쇄 검증(`T` `N8`: `P0→P8` 무주입 연속 상태 전이)은 모두 `PASS`이나, 이를 `U`로 승격하지 않고 분리 기록함.

---

## 2. 변경 파일
| 파일 | 변경 내용 | 변경 이유 |
| --- | --- | --- |
| `remake/desktop/main.cjs` | `protocol.handle('app', ...)` 내부에서 `decodeURIComponent(new URL(request.url).pathname.replace(/^\//, ''))` 적용 후 `pathToFileURL` 변환 | 패키징된 Windows EXE에서 퍼센트 인코딩된 유니코드 자산(`theme-of-joão-*.ogg`의 `%C3%A3`)이 이중 인코딩(`%25C3%25A3`)되어 해상 BGM 로드가 실패하던 결함 수정 (`G4`, `G5`, `D2`, `R3`) |
| `remake/package.json` | `build.portable.artifactName`을 `"UW2-Catalina-Korean.exe"`로 설정 (`appId` 및 `productName`은 기존 호환성 보존) | 기존 조안 배포본(`UW2-Joao-Korean.exe`)을 덮어쓰지 않고 카타리나 후보 실행 파일을 명확히 분리 (`G5`, `G7`, `G8`) |
| `remake/src/interface/port/harbor/Harbor.tsx` | 항구 안내 화자 ID 하드코딩(`'32'` 로코)을 `getFirstMateId()` 호출로 교체 | 카타리나 플레이 시 항구 안내 화자가 1등항해사 `에밀리오 산체스`(`'36'`)로 정상 출력되도록 수정 (`G1`, `G2`, `N1`, `D1`) |
| `remake/src/localization/koreanCatalina.ts` | 카타리나 아크 제목 1건 및 `katarinaVengeanceDialogue` 전용 대사·선택지 32건(총 33개 키)의 한국어 번역 사전 신설 | 카타리나 P1~P7 전 사건·재도전·선택지·보상·엔딩 한국어 완성 (`G2`, `N7`) |
| `remake/src/localization/catalogs.ts` | `koreanCatalina`를 import하여 `koreanCatalog` 병합 목록(`mergeCatalogSections`)에 등록 | 카타리나 전용 한국어 사전을 중앙 번역 카탈로그에 연결하고 중복 키 충돌 검증 (`G2`, `N7`) |
| `remake/src/localization/koreanCoverage.test.ts` | `dialogueCatalogs` 검사 대상에 `catalina` 추가 | 카타리나 대사 전체의 한국어 누락·토큰 불일치 자동 검증 (`G2`, `N7`) |
| `remake/src/localization/koreanCatalina.test.ts` | 카타리나 대사·일지 12단계·전투명·엔딩·선박명 보존 검사(`N7`) 및 누락/토큰 변형/중복 키 주입 시 검증기 실패를 확인하는 Negative Control(`F8`) 추가 | 한국어 번역 무결성 및 검증기 실효성 입증 (`G2`, `N7`, `F8`) |
| `remake/src/state/actionsWorld.ts` | `worldTimeTick`에서 해상 날짜 경과 시(`daysCrossed > 0 && state.portId === null`) `startSeaStory()` 호출 추가, `dock()` 시 `clearSeaStory()` 호출 추가 | 세비야 출항 후 해상 항해 중 `P2`(`spanish-pursuit`, `dayAtSea >= 1`) 해상 스토리가 자동 발동하지 않던 진행 차단 결함 해결 (`G1`, `N2`, `N8`, `D2`) |
| `remake/src/state/actionsProvisions.ts` | `arriveAdrift()` 표류 강제 입항 시 `clearSeaStory()` 호출 추가 | 해상 스토리 도중 표류 입항 시 이전 해상 세션이 남지 않도록 정리 (`G1`, `E8`) |
| `remake/src/story/seaStory.ts` | `storyRuntimeActions` 참조를 지연 `Proxy`(`lazyRuntimeActions`)로 감싸고 `Input.suspend?.()` 안전 호출 적용 | `actionsWorld.ts` ↔ `seaStory.ts` ↔ `storyRuntimeActions.ts` 간 순환 참조(TDZ) 방지 (`G1`, `R8`) |
| `remake/src/state/actionsPort.ts` | ① `assignStoryMateRole`에서 리스본 초기 동료(`'32'`, `'33'`)가 아닌 동료의 `role === null`일 때 `'firstMate'` 배정 허용 (`Number.isNaN(null) === false` 버그 수정)<br>② `getAvailableSailorId`에서 미배정 항해사가 없을 때 `typeof role !== 'number'`인 동료(1등항해사 에밀리오)를 함장으로 배정 가능하도록 보완<br>③ `exitBuildingWithoutSave`에서 `state.port?.characters().spawnNpcs()` 옵셔널 체이닝 적용 | ① `P1` 완료 시 에밀리오(`'36'`)가 `'firstMate'`로 정상 임명되게 수정<br>② 카타리나가 조선소에서 2번 함선을 추가 구매할 때 `'항해사가 더 필요하다'`며 막히던 결함 수정 (`G1`, `N4`, `D7`) |
| `remake/src/story/storyRuntimeActions.ts` | `preflightStatefulGroup`의 `assignMate` 사전 검증 조건을 `actionsPort.ts`와 동일하게 정렬 | `P1`(`seville-mutiny`) 실행 시 에밀리오 `'firstMate'` 임명 효과가 사전 검증을 통과하도록 보장 (`G1`, `N2`) |
| `remake/src/state/saveLoad.ts` | `save()` 내부 `window.localStorage.setItem` 호출을 `try { ... } catch { ... }`로 감쌈 | 저장소 쓰기 실패/쿼터 초과 시에도 인메모리 게임 상태가 손상되거나 크래시하지 않도록 방어 (`G3`, `F5`) |
| `remake/src/story/catalinaIntegration.test.tsx` | 카타리나 `N1~N8`(단일 계보 P0→P8 연쇄 통합 포함), `F1~F7`, `E1~E3`, `E7~E8`, `R1~R2`, `R6~R7` 통합 테스트 스위트 신설 | P0~P8 긍정/부정/재도전/경계/회귀 및 단일 상태 계보 전이 검증 (`G1`, `G3`, `G4`, `G6`) |
| `remake/scripts/verify-catalina-desktop.cjs` | 최종 패키징 EXE(`UW2-Catalina-Korean.exe`)를 대상으로 `D1~D8`, `E4~E7`, `F4`를 실제 실행·관측·캡처하는 데스크톱 자동 검증 스크립트 신설 | 실제 Windows 후보 바이너리에서 한국어 UI, IME, 해상도/배율, 오프라인 자산, 항해, 전투, 프로세스 재기동 슬롯 복원, 20회 교차 로드, 엔딩, 조안 회귀 검증 (`G5`, `G6`, `D1~D8`) |

---

## 3. 실행한 명령
| 명령 | 결과 | 출력 요약 |
| --- | --- | --- |
| `cwd: E:\03_AllWork\04_REA\uw2-joao-worktree\remake`<br>`npm run verify` | **PASS** (종료 코드 `0`)<br>`2026-11-07T21:14:21Z` ~ `2026-11-07T21:16:08Z` | `verify:assets` (59 assets verified), `story:validate` (1 passed), `prettier:check` (pass), `jest --runInBand` (**126 passed**, **1,103 passed**), `test:slots` (**4 passed**), `typecheck` (0 errors), `lint` (0 errors), `build:webpack` (compiled successfully). 로그: `task-1675.log` |
| `cwd: E:\03_AllWork\04_REA\uw2-joao-worktree\remake`<br>`npx tsc --noEmit -p tests/tsconfig.json` | **PASS** (종료 코드 `0`)<br>`2026-11-07T21:16:08Z` ~ `2026-11-07T21:16:12Z` | 데스크톱 및 경로 테스트 TypeScript 타입 오류 `0`건. 로그: `task-1675.log` |
| `cwd: E:\03_AllWork\04_REA\uw2-joao-worktree\remake`<br>`node --test tests/desktop/desktopAcceptance.test.cjs` | **PASS** (종료 코드 `0`)<br>`2026-11-07T21:16:12Z` ~ `2026-11-07T21:16:16Z` | 데스크톱 수락 단위/통합 테스트 **30/30 PASS** (`fail 0`). 로그: `task-1675.log` |
| `cwd: E:\03_AllWork\04_REA\uw2-joao-worktree\remake`<br>`npm run dist:portable` | **PASS** (종료 코드 `0`)<br>`2026-11-07T21:16:16Z` ~ `2026-11-07T21:18:10Z` | `dist-desktop/UW2-Catalina-Korean.exe` 생성 완료 (`109,879,594` bytes, SHA256 `d5ff3ef177a252c060974702baa6ece6bd679a16f74da5994b725402552f58bd`). 로그: `task-1675.log` |
| `cwd: E:\03_AllWork\04_REA\uw2-joao-worktree\remake`<br>`node scripts/verify-bgm-load.cjs --exe dist-desktop/UW2-Catalina-Korean.exe --artifacts docs/catalina/evidence/run-20261108-catalina-d1-d8/bgm-load --port 9347` | **PASS** (종료 코드 `0`)<br>`2026-11-07T21:19:15Z` ~ `2026-11-07T21:20:42Z` | 후보 EXE에서 2회 프로세스 기동, 23회 슬롯 로드·건물 이동·음소거·동일곡 연속성 검증 통과 (`consoleErrors: 0`, `pageErrors: 0`, `failedRequests: 0`). 증거: `remake/docs/catalina/evidence/run-20261108-catalina-d1-d8/bgm-load/events.jsonl` |
| `cwd: E:\03_AllWork\04_REA\uw2-joao-worktree\remake`<br>`node scripts/verify-catalina-desktop.cjs --exe dist-desktop/UW2-Catalina-Korean.exe --artifacts docs/catalina/evidence/run-20261108-catalina-d1-d8/desktop-d1-d8 --port 9349` (초기 실행 이력 포함) | **초기 실패 기록 보존 후 최종 PASS (종료 코드 `0`)**<br>- 초기 실행 1 (`task-1663`): 패키징 EXE에서 `theme-of-joão.ogg` 퍼센트 인코딩 이중 변환으로 `d2-sea-bgm` 실패 ➔ `desktop/main.cjs`에 `decodeURIComponent` 적용 및 EXE 재빌드(`d5ff3ef...`)로 해결<br>- 초기 실행 2 (`task-1768`): `D1~D8` 전 구간 통과 후 마지막 줄(1011행)에서 BGM 전환 시 이전 `<audio>` 스트림 해제로 인한 정상 `net::ERR_ABORTED`(28건)가 `failedRequests`에 집계됨 ➔ `canceled`/`net::ERR_ABORTED` 제외 처리<br>- 초기 실행 3 (`task-1796`): 세비야 주점 문 앞 2칸(`17,59`)에서 95ms 키 펄스가 2타일 이동하여 주점(`17,57`)에 1스텝 조기 진입 ➔ `journey.tile` 래퍼에서 조기 진입 시 `enter()` 건물 검증으로 인계<br>- **최종 실행 (`task-1826`, `2026-11-07T22:30:04Z` ~ `22:35:14Z`): 종료 코드 `0` (`PASS`)** | `D1~D8`, `E4~E7`, `F4` 전 항목 PASS, 3회 프로세스 기동/종료, `consoleErrors: 0`, `pageErrors: 0`, `failedRequests: 0`, `externalRequests: 0`, `userSlotsUntouched: true`. 증거: `remake/docs/catalina/evidence/run-20261108-catalina-d1-d8/desktop-d1-d8/summary.json`, `events.jsonl` |
| `cwd: E:\03_AllWork\04_REA\uw2-joao-worktree\remake`<br>`npx prettier --check src/ tests/ scripts/` | **PASS** (종료 코드 `0`)<br>`2026-11-07T22:36:14Z` ~ `22:36:24Z` | `All matched files use Prettier code style!` 로그: `task-1834.log` |

---

## 4. 테스트 결과
| 테스트 | 결과 | 비고 |
| --- | --- | --- |
| **N1** 카타리나 새 게임 시작 (`startNewGameAs('katarina')` 및 UI 주인공 선택) | **PASS** | 등급: `T` + `D`<br>소스 SHA: `ca0b136` / EXE: `d5ff3ef...`<br>주입 여부: 무주입 (`startNewGameAs('katarina')` 및 실제 시스템 메뉴 주인공 선택 UI)<br>근거: `catalinaIntegration.test.tsx` (`N1`), `desktop-d1-d8/summary.json` (`gates.D1`), `d1-p0-seville-start.png` |
| **N2-P1** 세비야 탈출 준비 (`katarina.vengeance.seville-mutiny`, 세비야 항구 `2:4`) | **PASS** | 등급: `T` + `D`<br>전제조건 만족 후 실제 runtime steps/effects 실행 확인 (레벨리온호 지급, 에밀리오 `firstMate` 합류, 금화 +2,000, 레이피어 `'4'` 지급, 완료 기록).<br>근거: `catalinaIntegration.test.tsx` (`N2/N4`), `d1-p1-seville-mutiny-dialogue.png`, `d1-p1-journal.png` |
| **N2-P2** 스페인 추격전 (`katarina.vengeance.spanish-pursuit` 해상 발동 및 `spanish-pursuit-retry` 세비야 항구 `2:4`) | **PASS** | 등급: `T` + `D`<br>`worldTimeTick` 해상 1일 경과 시 자동 발동, `katarina.seville-patrol` 해전 연결 및 승리 후 완료 기록.<br>근거: `catalinaIntegration.test.tsx` (`N2/N3/F3`), `d2-p2-sea-story.png`, `d3-p2-naval-combat.png` |
| **N2-P3** 세우타 조안 함대 대치 (`katarina.vengeance.ceuta-clash` 세우타 주점 `27:2` 및 `ceuta-clash-retry` `27:4`) | **PASS** | 등급: `T` + `D`<br>P2 승리 전제조건 확인, 세우타 주점 진입 시 발동, `katarina.joao-fleet` 해전 승리 시 완료 기록.<br>근거: `catalinaIntegration.test.tsx` (`N2/N3/F3`), `desktop-d1-d8/events.jsonl` |
| **N2-P4** 마사와 진상 확인 (`katarina.vengeance.massawa-truth`, 마사와 주점 `75:2`) | **PASS** | 등급: `T` + `D-DIAGNOSTIC`<br>P3 완료 후 마사와 주점 진입 시 발동, 해적 명성 +200·금화 +3,000 지급 및 완료 기록.<br>근거: `catalinaIntegration.test.tsx` (`N2/N4`), `desktop-d1-d8/events.jsonl` |
| **N2-P5** 카옌 구출·결투 (`katarina.vengeance.cayenne-rescue` 카옌 여관 `57:5` 및 `cayenne-rescue-retry` `57:4`) | **PASS** | 등급: `T` + `D-DIAGNOSTIC`<br>P4 완료 후 카옌 여관 진입 시 발동, `katarina.cayenne-duel` 일기토 승리 시 완료 기록.<br>근거: `catalinaIntegration.test.tsx` (`N2/N3/F3`), `d3-p5-cayenne-duel.png` |
| **N2-P6** 아마존 발견·결전 (`mouth-of-the-amazon` 발견 + `katarina.vengeance.amazon-reckoning` 카옌 항구 `57:4` + `amazon-reckoning-retry`) | **PASS** | 등급: `T` + `D-DIAGNOSTIC`<br>`mouth-of-the-amazon` 발견 및 P5 완료 후 카옌 항구 진입 시 발동, `katarina.amazon-martinez` 해전 승리 시 완료 기록.<br>근거: `catalinaIntegration.test.tsx` (`N2/N3/F3`), `d3-p6-amazon-martinez-combat.png` |
| **N2-P7** 세비야 귀환 엔딩 (`katarina.vengeance.seville-homecoming`, 세비야 왕궁 `2:6` + `CatalinaEnding.tsx`) | **PASS** | 등급: `T` + `D-DIAGNOSTIC`<br>P6 승리 후 세비야 왕궁 진입 시 발동, 해적 명성 +500·모험 명성 +300·금화 +10,000 지급, `endingSeen: true`, `CatalinaEnding` 오버레이 표시.<br>근거: `catalinaIntegration.test.tsx` (`N2/N4/N6`), `d6-p7-catalina-ending.png` |
| **N3** 대상 해전 3종(`seville-patrol`, `joao-fleet`, `amazon-martinez`) 및 일기토 1종(`cayenne-duel`) production combat action 실행 | **PASS** | 등급: `T` + `D` (`P2`/`P3` 연속 실행) + `D-DIAGNOSTIC` (`P5`/`P6` 진단 슬롯)<br>실제 포격·접근·일기토 공격/방어 UI 조작 및 전투 종료 후 항구/해상 복귀 확인.<br>근거: `catalinaIntegration.test.tsx` (`N3`), `desktop-d1-d8/summary.json` (`gates.D3`) |
| **N4** 단계별 보상·동료·함선 단일 지급 | **PASS** | 등급: `T` + `D`<br>`Rebellion`(카라벨라 라돈다), `에밀리오 산체스`(`36`, `firstMate`), 레이피어(`4`), 금화(`+2,000` / `+3,000` / `+10,000`), 명성(`+200` / `+500` / `+300`) 정확히 1회 지급 확인.<br>근거: `catalinaIntegration.test.tsx` (`N4`, `E3`) |
| **N5** 시험 슬롯 저장 → 프로세스 완전 종료 → 동일 EXE 재실행 → 슬롯 로드 → 다음 행동 진행 | **PASS** | 등급: `T` + `D`<br>Launch 1에서 슬롯 2(`uw2-slot-2.json`, SHA256 `77a3af63...`) 저장 후 프로세스 종료, Launch 2에서 조안 새 게임으로 상태를 바꾼 뒤 슬롯 2를 UI로 로드하여 세우타(`portId: '27'`) 카타리나 상태 복원 및 항구 입장·행동 확인.<br>근거: `desktop-d1-d8/summary.json` (`gates.D4`) |
| **N6** P7 완료 후 P8 저장·복원·재방문 | **PASS** | 등급: `T` + `D-DIAGNOSTIC`<br>세비야 귀환 엔딩 완료 후 슬롯 3(`uw2-slot-3.json`, SHA256 `396f1ab2...`) 저장 → 프로세스 완전 종료 → Launch 3 재실행 → 슬롯 3 로드 → 세비야 왕궁(`2:6`) 재방문 시 엔딩 중복 발동 없음·보상 중복 없음·일지 전체 완료 유지 확인.<br>근거: `catalinaIntegration.test.tsx` (`N6`), `d6-p8-palace-revisit-after-reload.png` |
| **N7** 카타리나 경로 전체 원문 키·동적 패턴·사용자 선박명 한국어 대조 | **PASS** | 등급: `S` + `T` + `D`<br>33개 전용 대사·선택지, 12단계 항해일지(`catalinaJournal.ts`), 전투명 4종, `CatalinaEnding.tsx`, 토큰(`$name` 등) 일치 및 사용자 지정 선박명 보존 확인.<br>근거: `koreanCatalina.test.ts`, `koreanCoverage.test.ts`, `d1~d8` 스크린샷 |
| **N8** 단일 초기 상태(`P0`)에서 `P0→P8`까지 무주입 연속 production action 실행 및 중간 저장/복원 연쇄 검증 | **PASS** | 등급: `T` (연쇄 통합; `U`로 표시하지 않음)<br>`P0` 1회 초기화 후 사건 사이에 완료 이벤트·보상·동료 주입 없이 실제 `enterBuilding`, `advanceQuestSession`, `setSail`, `worldTimeTick`, `advanceSeaStory`, `actCombat`, `discoverCollector`, `serializeCurrentGameState`/`restoreSaveJson`만으로 `P8`까지 도달 및 앞 단계 제거 시 뒤 단계 차단 확인.<br>근거: `catalinaIntegration.test.tsx` (`N8`, 439~679행) |
| **F1** 각 사건 전제조건 하나씩 제거·잘못된 항구/건물/주인공 적용 | **PASS** | 등급: `T`<br>주인공 `joao`일 때 카타리나 사건 미발동, 잘못된 항구/건물/선행 이벤트 미완료/미발견(`mouth-of-the-amazon` 미발견 시 `amazon-reckoning` 차단) 전 조건별 행 검증.<br>근거: `catalinaIntegration.test.tsx` (`F1`) |
| **F2** 각 재도전 선택지에서 거절·보류(`'no'`) 선택 실행 | **PASS** | 등급: `T` + `D`<br>`spanish-pursuit-retry`, `ceuta-clash-retry`, `cayenne-rescue-retry`, `amazon-reckoning-retry`에서 `'지금은 준비를 더 한다'`(`'no'`) 선택 시 완료 플래그 미설정 및 재진입 시 다시 전투 선택 가능 확인.<br>근거: `catalinaIntegration.test.tsx` (`F2`), `verify-catalina-desktop.cjs` (`P2` retry `'no'` 후 재진입) |
| **F3** 필수 전투 4종(해전 3종·일기토 1종) 패배·퇴각 및 재도전 복구 | **PASS** | 등급: `T` + `D`<br>패배/퇴각 시 승리 이벤트가 발동하지 않고 `*_failed = 1` 플래그와 재도전 목표가 설정되며, 항구 재도전 승리 시 정상 복구됨을 확인.<br>근거: `catalinaIntegration.test.tsx` (`F3`, `N8`), `verify-catalina-desktop.cjs` (`P2` 퇴각 → 세비야 항구 재도전 승리) |
| **F4** 빈 파일, 잘린 JSON, 지원하지 않는 형식/버전의 시험 슬롯 로드 | **PASS** | 등급: `T` + `D`<br>빈 문자열, `{corrupt`, `version: 999` 슬롯 로드 시 한국어 오류 메시지 표시 및 현재 플레이 상태·다른 슬롯 무손상 확인.<br>근거: `catalinaIntegration.test.tsx` (`F4`), `d7-f4-corrupt-slot-handled.png` |
| **F5** 저장 경로 쓰기 거절·예외 발생 재현 | **PASS** | 등급: `T`<br>`localStorage.setItem` 예외 및 슬롯 파일 쓰기 실패 시 거짓 성공 없이 기존 상태·기존 파일 보존 확인.<br>근거: `catalinaIntegration.test.tsx` (`F5`), `desktopAcceptance.test.cjs` |
| **F6** 지연된 이전 load 응답 도착 시 최신 상태 보호 | **PASS** | 등급: `T`<br>이전 슬롯 로드 Promise 완료 전에 새 게임/다른 로드가 실행되면 generation guard가 오래된 응답을 폐기함.<br>근거: `catalinaIntegration.test.tsx` (`F6`), `DesktopSlots.test.tsx` |
| **F7** 미충족 최종 승리·미발견 상태에서 세비야 왕궁(`2:6`) 방문 | **PASS** | 등급: `T`<br>`amazon-reckoning` 미완료 상태에서 세비야 왕궁 진입 시 `seville-homecoming` 엔딩·보상이 절대 발동하지 않음.<br>근거: `catalinaIntegration.test.tsx` (`F7`, `N8`) |
| **F8** 번역 키 누락·토큰 변형·중복 키 충돌 Negative Control | **PASS** | 등급: `T`<br>시험 복사본에서 키 1개 삭제, `$name` 토큰 변형, 중복 키 주입 시 검증기가 실제로 실패하고 해당 키를 식별함을 확인(제품 사전 불변).<br>근거: `koreanCatalina.test.ts` (`F8`) |
| **E1** 시간·명성·포탄/선원 경계값 (`dayAtSea` `0`/`1`/`2`, 포탄 `0`·최소 선원 `25` 해전 승리) | **PASS** | 등급: `T`<br>`TICKS_PER_DAY - 1`(`dayAtSea = 0`)에서 `spanish-pursuit` 미발동, 정확히 `TICKS_PER_DAY`(`dayAtSea = 1`)에서 발동 확인. 포탄 `0`·최소 선원에서도 접근(`approach`)→일기토(`challenge`)로 승리 가능 확인.<br>근거: `catalinaIntegration.test.tsx` (`E1`) |
| **E2** 사건 직전·선택 직후·전투 실패 직후·엔딩 직후 저장/복원 | **PASS** | 등급: `T` + `D-DIAGNOSTIC`<br>각 경계 시점 직렬화/복원 후 이어갈 위치·플래그·보상 단일 적용 횟수 완벽 보존.<br>근거: `catalinaIntegration.test.tsx` (`E2`), `verify-catalina-desktop.cjs` (`D4`, `D6`) |
| **E3** 대화 확인·입항·보상 확인 연속 입력 및 동일 장소 재방문 | **PASS** | 등급: `T` + `D`<br>`advanceQuestSession` 연타 및 세비야 항구·세비야 왕궁 재방문 시 보상·함선·동료·엔딩 중복 지급 `0`건.<br>근거: `catalinaIntegration.test.tsx` (`E3`), `verify-catalina-desktop.cjs` (`D6`/`P8`) |
| **E4** 실제 한국어 IME 조합 중 `Enter`/`Escape` 및 긴 한글 선박명 입력 | **PASS** | 등급: `D`<br>실제 후보 EXE의 세비야 조선소 선박 명명 입력창에서 Chromium CDP `Input.imeSetComposition`(`'산'`) 활성 조합 중 `keyCode: 229` `Enter` 입력 시 조기 제출되지 않고, `Input.insertText`(`'산타마리아-카탈리나특무기함'`) 확정 후 값 보존 및 `Escape` 취소 정상 동작 확인.<br>근거: `desktop-d1-d8/summary.json` (`gates.D7`), `d7-e4-ime-shipyard.png` |
| **E5** `800×600` 및 `1280×720` 창, `100%` 및 `150%` 배율에서 긴 대사·일지·오류 확인 | **PASS** | 등급: `D`<br>`800x600@1x`, `800x600@1.5x`, `1280x720@1.5x`에서 항해일지·대사창·시스템 메뉴 가림 없음(`scrollWidth <= clientWidth + 1`) 및 클릭 접근 확인.<br>근거: `desktop-d1-d8/summary.json` (`gates.D7.viewportMetrics`), `d7-e5-800x600-scale150.png` |
| **E6** 오프라인 네트워크 차단 상태 실행 (`Network.emulateNetworkConditions({ offline: true })`) | **PASS** | 등급: `D`<br>외부 네트워크 요청 `0`건(`externalRequests: 0`), 로컬 번들 한글 폰트(`document.fonts.status === 'loaded'`), BGM, 이미지, 슬롯 저장 모두 원격 서비스 없이 정상 동작.<br>근거: `desktop-d1-d8/summary.json` (`externalRequests: 0`) |
| **E7** 조안 슬롯 1 ↔ 카타리나 슬롯 2 교차 로드 5회 왕복(총 20회 연속 로드) | **PASS** | 등급: `T` + `D`<br>단위 통합(`catalinaIntegration.test.tsx`) 및 실제 후보 EXE(`verify-catalina-desktop.cjs` `D5`)에서 20회 연속 교차 로드 동안 주인공·함대·동료·완료 사건·슬롯 파일 SHA256 완벽 분리 확인.<br>근거: `catalinaIntegration.test.tsx` (`E7`), `desktop-d1-d8/summary.json` (`gates.D5`) |
| **E8** 전투/이벤트 경계에 늦은 비동기 응답·해상 스토리 중 입항 도착 | **PASS** | 등급: `T`<br>카타리나 전환 후 도착한 지연된 조안 로드 응답 폐기, 해상 스토리 활성 중 `dock()`/`arriveAdrift()` 호출 시 `clearSeaStory()`로 입력 잠금 해제 확인.<br>근거: `catalinaIntegration.test.tsx` (`E8`) |
| **R1** 조안 새 게임·초기 사건·주요 사건/엔딩 조건 회귀 | **PASS** | 등급: `T` + `D`<br>조안 새 게임 시작 시 리스본(`portId: '1'`) 시작, 로코(`'32'`)·엔리코(`'33'`) 동료 구성, 리스본 출발 사건 발동, 카타리나 사건 혼입 `0`건 확인.<br>근거: `catalinaIntegration.test.tsx` (`R1`), `desktop-d1-d8/summary.json` (`gates.D8`), `d8-joao-regression.png` |
| **R2** v0.3.1 조안 슬롯 호환 및 사용자 원본 슬롯 보존 | **PASS** | 등급: `T` + `D`<br>v0.3.1 조안 저장 페이로드 복원 정상, `%APPDATA%\UW2-QCaine-Preview\slots` 실행 전후 스냅샷 100% 일치(`userSlotsUntouched: true`).<br>근거: `catalinaIntegration.test.tsx` (`R2`), `desktop-d1-d8/summary.json` |
| **R3** 반복 load·새 게임·앱 재실행의 BGM 단일 객체 유지 | **PASS** | 등급: `T` + `D`<br>`verify-bgm-load.cjs`(23회 로드) 및 `verify-catalina-desktop.cjs`(20회 교차 로드 + 3회 앱 기동) 전 구간에서 재생 중 `<audio>` 객체 최대 `1`개, 중첩 `0`건 확인.<br>근거: `Sound.test.tsx`, `bgm-load/events.jsonl`, `desktop-d1-d8/summary.json` |
| **R4** BGM 음소거·동일곡 연속성·실패 후 재시도 | **PASS** | 등급: `T` + `D`<br>음소거 상태에서 슬롯 로드·새 게임·앱 재실행 후에도 `muted === true` 유지, 동일 항구 테마 구간 건물 왕복 시 `currentTime` 초기화 없이 연속 진행 확인.<br>근거: `Sound.test.tsx`, `bgm-load/events.jsonl`, `desktop-d1-d8/events.jsonl` |
| **R5** native load와 알림 수명 | **PASS** | 등급: `T`<br>`DesktopSlots.test.tsx` 및 `catalinaIntegration.test.tsx` (`F6`/`E8`) 통과, 오래된 응답·타이머가 최신 상태를 덮지 않음. |
| **R6** 공용 교역·보급·선원·장비·전투·조선소 | **PASS** | 등급: `T` + `D`<br>세비야 주점 선원 모집, 항구 보급(`water: 35, food: 35, shot: 5`), 조선소 함선 추가 구입(`getAvailableSailorId` 수정 포함) 정상 동작.<br>근거: `catalinaIntegration.test.tsx` (`R6`), `verify-catalina-desktop.cjs` (`D2`, `D7`) |
| **R7** 다른 주인공(`otto`, `ernst`, `pietro`, `ali`) 데이터 등록·저장 스키마 보존 | **PASS** | 등급: `T`<br>6인 주인공 프로필 ID·초기 상태·저장 직렬화/복원 스키마 회귀 `0`건 (타 4인의 전편 완주는 주장하지 않음).<br>근거: `catalinaIntegration.test.tsx` (`R7`), `protagonistRoutes.test.ts` |
| **R8** 전체 소스·자산·빌드 통합 검증 | **PASS** | 등급: `T` + `D`<br>§10.4의 4대 필수 명령(`npm run verify`, `npx tsc --noEmit -p tests/tsconfig.json`, `node --test tests/desktop/desktopAcceptance.test.cjs`, `npm run dist:portable`) 모두 실제 종료 코드 `0`. |
| **D1~D8** 최종 후보 EXE(`UW2-Catalina-Korean.exe`) 실제 데스크톱 검증 | **PASS** | 등급: `D` (`D1`, `D2`, `D4`, `D5`, `D7`, `D8` 및 `D3`의 `P2`/`P3`) + `D-DIAGNOSTIC` (`D3`의 `P5`/`P6` 및 `D6`의 `P7`/`P8`)<br>동일 EXE(`d5ff3ef177a252c060974702baa6ece6bd679a16f74da5994b725402552f58bd`)에서 3회 프로세스 기동으로 전 항목 통과.<br>근거: `remake/docs/catalina/evidence/run-20261108-catalina-d1-d8/desktop-d1-d8/summary.json` |
| **U1~U8** 형님의 새 카타리나 게임→엔딩 수동 전편 플레이 인수 | **NOT_RUN** | 등급: `U` (`USER_FULL_PLAY_PENDING`)<br>실행 주체: 형님. 개발 검증(`T`/`D`/`D-DIAGNOSTIC`)을 `U`로 대체 선언하지 않고 §9.4의 인수 체크리스트와 함께 인계함. |

---

## 5. 엣지케이스 검증
| 케이스 | 결과 | 비고 |
| --- | --- | --- |
| **E1-a:** 해상 항해 시간 경계 (`TICKS_PER_DAY - 1` vs `TICKS_PER_DAY` vs `TICKS_PER_DAY * 2`) | **PASS** — `dayAtSea = 0`(`TICKS_PER_DAY - 1`)에서는 `spanish-pursuit` 미발동(`getActiveSeaStory() === null`), `dayAtSea = 1`(`TICKS_PER_DAY`) 도달 즉시 발동, 완료 후 `dayAtSea = 2`에서 재발동 없음 | 환경: Jest (`catalinaIntegration.test.tsx` `E1`) |
| **E1-b:** 포탄 `0`개 및 최소 선원(`25`명) 상태에서 해전 진입 | **PASS** — 포격 없이 접근(`approach`) 후 기함 일기토(`challenge`)로 마르티네스 기함(`katarina.amazon-martinez`) 제압 및 `amazon-reckoning` 완료 확인 | 환경: Jest (`catalinaIntegration.test.tsx` `E1`) |
| **E2:** 사건 직전·선택 직후·전투 패배 직후·엔딩 직후 저장 및 복원 | **PASS** — 각 시점의 `storyFlags`, `storyEvents`, `gold`, `fame`, `fleets`, `mates`가 복원 후에도 100% 일치하며 보상 중복 적용 없음 | 환경: Jest (`catalinaIntegration.test.tsx` `E2`) 및 후보 EXE (`D4`, `D6`) |
| **E3:** 대화 확인 연타 및 `seville-mutiny` / `seville-homecoming` 완료 후 동일 건물 재방문 | **PASS** — `Rebellion` 1척, 에밀리오 1명, 금화·명성 보상 1회만 지급되고 재방문 시 일반 항구/왕궁 UI로 진입함 | 환경: Jest (`catalinaIntegration.test.tsx` `E3`) 및 후보 EXE (`D6` `d6-p8-palace-revisit-after-reload.png`) |
| **E4:** 한국어 IME 조합(`'산'`) 중 `Enter`(`keyCode: 229`) 입력 및 긴 한글 선박명(`'산타마리아-카탈리나특무기함'`) 확정 | **PASS** — 조합 중 `Enter`가 폼을 조기 제출하지 않으며, 조합 확정 후 15자 한글 선박명이 `<input data-test="inputNameInput">`에 정확히 반영되고 `Escape`로 정상 취소됨 | 환경: 후보 EXE (`desktop-d1-d8/summary.json` `gates.D7`, `d7-e4-ime-shipyard.png`) |
| **E5:** `800×600`(`100%`, `150%` 배율) 및 `1280×720`(`150%` 배율) 뷰포트에서 항해일지·대사창 레이아웃 | **PASS** — 모든 해상도·배율에서 가로 잘림 없음(`scrollWidth <= clientWidth + 1`) 및 닫기/탭 버튼 클릭 정상 동작 | 환경: 후보 EXE (`desktop-d1-d8/summary.json` `gates.D7.viewportMetrics`, `d7-e5-800x600-scale150.png`) |
| **E6:** 오프라인 모드(`Network.emulateNetworkConditions({ offline: true })`) 및 `app://` 유니코드 자산 로드 | **PASS** — 외부 네트워크 요청 `0`건, 로컬 한글 폰트 `loaded`, `theme-of-joão.ogg` 해상 BGM 정상 디코딩 및 재생 | 환경: 후보 EXE (`desktop-d1-d8/summary.json`, `bgm-load/events.jsonl`) |
| **E7:** 조안 슬롯 1 ↔ 카타리나 슬롯 2 5회 왕복(20회 연속 로드) | **PASS** — 20회 로드 전 과정에서 주인공 ID·포트·함대·동료·완료 사건 혼입 `0`건, 슬롯 파일 해시 불변 | 환경: Jest (`catalinaIntegration.test.tsx` `E7`) 및 후보 EXE (`desktop-d1-d8/summary.json` `gates.D5`) |
| **E8:** 해상 스토리 활성 상태에서 강제 입항(`dock` / `arriveAdrift`) 및 지연된 이전 슬롯 로드 응답 도착 | **PASS** — 입항 즉시 `clearSeaStory()`가 호출되어 해상 스토리 오버레이와 입력 잠금이 해제되며, 오래된 비동기 로드 응답은 최신 카타리나 상태를 덮어쓰지 못함 | 환경: Jest (`catalinaIntegration.test.tsx` `E8`) |

---

## 6. 남은 위험
1. **[확인됨] 형님의 전편 수동 플레이 인수(`U1~U8`) 대기 (`USER_FULL_PLAY_PENDING`):**
   - **영향:** 개발 필수 검증(`N1~N8`, `F1~F8`, `E1~E8`, `R1~R8`, `D1~D8`)은 모두 통과했으나, 사람이 직접 새 카타리나 게임(`P0`)부터 유럽→동아프리카(마사와)→남미(카옌·아마존강 하구)→세비야 귀환(`P7`/`P8`)까지 상태 주입 없이 전 구간을 수동 항해하며 체감 밸런스·동선을 확인하는 최종 사용자 인수는 아직 수행되지 않았다.
   - **재현/검증 방법:** 본 보고서 §9.4의 `U1~U8` 체크리스트에 따라 `UW2-Catalina-Korean.exe`를 실행하여 수동 플레이로 확인한다.
   - **후보 gate 영향:** §0, §3.4, §11, §13 계약에 따라 개발 완료 상태(`READY_FOR_CODEX_REVIEW`)의 차단 사유가 아니며 별도 상태 필드(`USER_FULL_PLAY_PENDING`)로 분리 관리한다.
   - **담당:** 형님 (최종 수동 인수) 및 Codex (독립 통합 검수).
2. **[확인됨] 원작(`SNR2.DAT`) 대비 현행 리메이크의 축약·각색 구조 (§9.1 참조):**
   - **영향:** 원작 DOS판의 해적 명성 임계값(`1` / `1,500` / `2,000` / `8,000` / `15,000` / `30,000`)과 브레 페로 20개 항구 무작위 탐색·루시아 납치·안드레아스 동료 합류·오스만 함대 포위전 등은 현행 리메이크에서 결정론적 7관문(`P1~P7`) 아크로 축약·각색되어 있다. 원작 공략집의 세부 동선(예: 리스본 주점 루시아 미팅, 알렉산드리아 옷토 조우)을 그대로 기대하면 현행 리메이크 동선(세비야→세우타→마사와→카옌→아마존강 하구→세비야)과 차이가 있다.
   - **재현/검증 방법:** 게임 내 `항해일지`(`catalinaJournal.ts`)가 현행 리메이크의 정확한 다음 목표 항구·건물·조건을 한국어로 안내하며, 본 보고서 §9.1 원작 대비 차이표에 모든 차이를 명시했다.
   - **후보 gate 영향:** §3.4 기본값("현행 리메이크 전체 경로의 완성을 기본값으로 삼는다. 원작은 명칭·맥락·누락 판별 근거로 사용하고 차이를 공개한다")에 부합하므로 후보 gate 통과.
   - **담당:** 아콘 (문서화 및 일지 안내 검증 완료).
3. **[확인됨] 나머지 네 주인공(옷토·에르네스트·피에트로·알 베자스) 전용 스토리 미완성:**
   - **영향:** 새 게임 주인공 선택 메뉴에서 나머지 4인을 선택할 수 있으나, 그들의 전용 전편 스토리는 이번 미션의 제외 범위(§6.2)이므로 초기 상태·스키마만 보존되어 있다.
   - **재현/검증 방법:** `R7` 테스트(`catalinaIntegration.test.tsx`, `protagonistRoutes.test.ts`)로 데이터·스키마 무결성 확인.
   - **후보 gate 영향:** §6.2 및 §13("제품 표시는 `조안 사용자 인수 완료 / 카타리나 인수 후보·사용자 전편 검증 대기 / 나머지 네 주인공 미완료`다") 준수.
   - **담당:** 후속 별도 주인공 미션.

---

## 7. 점수표
| 항목 | 배점 | 자체 평가 | 근거 |
| --- | ---: | ---: | --- |
| 요구사항 충족도 | 20 | **20** | P0~P8 전 관문 구현·연결(4점) / 카타리나 전용·공용 한국어 100% 완성(4점) / 슬롯·주인공 완전 분리(4점) / 실행 가능한 Windows 후보 EXE 생성(4점) / 조안 보존 및 제외 범위 준수(4점). `G1~G8` 대응표 및 산출물로 입증. |
| 구현 정확성 | 20 | **20** | 조건·효과 순서 및 `N8` 단일 계보 P0→P8 연쇄 연결(5점) / 4대 전투 패배·퇴각·거절 후 재도전 복구(5점) / 함선·동료·보상·엔딩 단일 적용(5점) / 저장 예외 격리 및 BGM·로드 비동기 경계 방어(5점). |
| 테스트 충실도 | 15 | **15** | 정상 `N1~N8`(3점) / 실패 `F1~F7` 및 번역 검증기 Negative Control `F8`(3점) / 엣지 `E1~E8`(3점) / 회귀 `R1~R8`(3점) / 최종 후보 EXE `D1~D8`(3점) 전 항목 실제 실행 및 종료 코드 `0` 원시 로그 확보. |
| 회귀 위험 관리 | 10 | **10** | 조안 시작·사건 보존 `R1`/`D8`(2점) / v0.3.1 슬롯 호환 및 사용자 원본 슬롯 불변 `R2`(2점) / BGM 단일 객체·음소거·동일곡 연속성 `R3`/`R4`(2점) / 공용 교역·보급·조선소·전투 정상 동작 `R6`(2점) / 타 주인공 스키마 보존 `R7`(2점). |
| 보안/운영 안전성 | 10 | **10** | `--user-data-dir` 및 `UW2_SLOTS_DIR` 완전 격리로 `%APPDATA%` 원본 불변(2점) / 임시 Chromium `profile/` 제거 및 비밀값·인증정보 배제(2점) / 생성한 자식 PID만 정밀 종료(2점) / 명시적 경로 stage 및 `main`·`Latest`·v0.3.1 보존(2점) / lockfile·원작 출처 유지 및 클린 원격 readback 검증(2점). |
| 유지보수성 | 10 | **10** | 기존 story engine·localization 분리 패턴 재사용(2점) / 공유 파일 최소 외과수술식 수정(2점) / 기존 이벤트·주인공·저장 ID 불변(2점) / 우회·TODO·플레이스홀더 `0`건(2점) / 읽기 전용 서브에이전트 독립 감사(`1cb66dd8-a180-43d8-92df-174c94f82f6a`) 통과 및 재현성 완비(2점). |
| 문서화/인수인계 | 10 | **10** | `SNR2.DAT` 원작 대비 차이표 완비(2점) / `G1~G8`·`P0~P8`·`N/F/E/R/D/U` 대응표 완비(2점) / `manifest.json` 파일·크기·SHA256 일치(2점) / 형님 `U1~U8` 수동 인수 체크리스트 제공(2점) / `progress.json` 및 §18 인수인계 메모 완비(2점). |
| 최종 보고 품질 | 5 | **5** | 수행 결과·제외 범위 구분(1점) / 정확한 변경 파일 15개 표기(1점) / 초기 실패 3건과 원인·수정을 숨김없이 기록(1점) / 남은 위험 및 `U` 미실행 상태 명시(1점) / commit·다운로드·SHA256·영수증 URL 명시(1점). |
| **합계** | **100** | **100** | **§13 완료 조건(DoD) 전 항목 충족, §14 자동 실패 위반 0건, 개발 후보 품질 점수 100/100 (`READY_FOR_CODEX_REVIEW`)** |

---

## 8. 다음 반복 추천 작업
1. **구현 잔여 작업 0건 (`READY_FOR_CODEX_REVIEW`):** 계약 범위 내 모든 구현·한국어 번역·자동화 검증·실제 후보 EXE(`D1~D8`) 검증·원격 게시·재수신 대조가 완료되었으므로 추가 기능이나 다음 주인공(옷토 등)으로 범위를 넓히지 않고 즉시 멈춘다.
2. **Codex 독립 통합 검수 (`CODEX_REVIEW_PENDING`):** 후속 검수자인 Codex는 §9의 고정 commit·릴리스 자산·`manifest.json`·`publication-receipt.json`을 사용하여 추가 구현 없이 즉시 독립 통합 검수를 수행한다.
3. **형님의 전편 수동 플레이 인수 (`USER_FULL_PLAY_PENDING`):** 형님께서 §9.4의 `U1~U8` 체크리스트에 따라 `UW2-Catalina-Korean.exe`를 수동 플레이하시고 결함이 발견되면 해당 재현 절차를 바탕으로 후속 수정 루프를 재개한다.

---

## 9. 한 번에 검수할 인계 묶음

### 9.1 원작(`SNR2.DAT`) 대비 현행 리메이크 차이표 (`research/game-details/scenarios/scenario-2-catalina-erantzo.md` 대조)

| 원작 구간 (`SNR2.DAT`) | 원작 내용 요약 | 현행 리메이크 대응 (`vengeance/events.ts`) | 분류 (`현행 구현` / `현행 각색·축약` / `현행 경로 결함(수정됨)` / `원작 근거 불확실`) | 비고 및 검증 근거 |
| --- | --- | --- | --- | --- |
| **Section 0: 세비야 반란과 출항** | 세비야 해군본부(에제키엘 사령관 산토도밍고 전멸 보고·복수 불허, 재방문 시 미카엘의 세이버 지급) → 주점 소문(프랑코 공작 문장) → 주점 결심(안드레아스 도발) → 항구에서 에밀리오 합류 및 갈레온 `Rebel` 탈취·해적 전향 → 항해 1일차 에스파냐 우호도 최저(-100) 설정 | **P0 (`startNewGameAs('katarina')`) + P1 (`seville-mutiny`, 세비야 항구 `2:4`):** 세비야 항구 진입 시 에밀리오와 대화 후 카라벨라 라돈다(`shipId: '9'`, 기본 선박명 `Rebellion`) 탈취, 에밀리오 산체스(`'36'`) 1등항해사(`firstMate`) 합류, 군자금 +2,000 금화 및 레이피어(`itemId: '4'`) 지급 | **현행 구현 + 현행 각색·축약 + 현행 경로 결함(수정됨)**<br>- 각색: 해군본부·주점·항구 다중 왕복을 세비야 항구(`2:4`) 단일 다단계 이벤트로 압축, 함종을 카라벨라 라돈다(`Rebellion`)로 지급.<br>- 수정된 결함: 에밀리오(`'36'`)의 `role: null`이 `'firstMate'`로 승격되지 않던 버그(`actionsPort.ts`/`storyRuntimeActions.ts`) 및 항구 화자 로코 고정 버그(`Harbor.tsx`) 수정 완료. | `catalinaIntegration.test.tsx` (`N1`, `N2`, `N4`), `d1-p1-seville-mutiny-dialogue.png` |
| **Section 1: 에스파냐 추격전과 안드레아스 (해적 명성 1)** | 해적 명성 1 이상으로 세비야 외 일반 건물 진입 시 추격 함대(15~19) 배치 → 1차 교전 → 에제키엘 항복 권고 거부 → 2차 교전 후 안드레아스 파에야(`sailor 73`)가 화공으로 구출하며 동료 합류 | **P2 (`spanish-pursuit`, 해상 `dayAtSea >= 1`) + `spanish-pursuit-retry` (세비야 항구 `2:4`):** 세비야에서 `Rebellion`을 이끌고 출항하여 해상에서 1일 경과 시 아기레 사령관의 봉쇄 기함 `San Felipe`(`katarina.seville-patrol`)와 교전. 패배/퇴각 시 세비야 항구(`2:4`)에서 재도전 가능. 안드레아스 개별 동료 합류는 생략. | **현행 각색·축약 + 현행 경로 결함(수정됨)**<br>- 각색: 명성 1 조건 및 2연전을 해상 1일 경과 시 1회 해전(`katarina.seville-patrol`)으로 단순화.<br>- 수정된 결함: `worldTimeTick`에서 `startSeaStory()`를 호출하지 않아 해상에서 P2가 영구 미발동하던 치명적 결함(`actionsWorld.ts`) 수정 완료. | `catalinaIntegration.test.tsx` (`N2`, `F3`, `E1`), `d2-p2-sea-story.png`, `d3-p2-naval-combat.png` |
| **Sections 2~5: 유럽 탐색, 브레 페로 추격, 루시아 납치, 세우타·알렉산드리아 (명성 1,500 / 2,000 / 8,000)** | 명성 1,500/2,000 주점 탐문 → 유럽 항구 조선소/항구에서 조안과 첫 조우(에제키엘 난입으로 중단) → 명성 8,000 브레 페로가 지정한 20개 지중해 항구 중 1곳 무작위 수색 → 페로의 2차 제안으로 리스본 주점의 루시아를 세우타 여관에 인도 → 알렉산드리아에서 옷토 베인즈의 경고(마르티네스 후작의 함정) → 흑해 입구에서 페로 함대(60) 격파 | **P3 (`ceuta-clash`, 세우타 주점 `27:2`) + `ceuta-clash-retry` (세우타 항구 `27:4`):** 스페인 추격전 돌파 후 세우타 주점(`27:2`)에서 조안 프랑코·로코 알렘켈과 대면하고 조안 함대(`katarina.joao-fleet`, `Galera Real`)와 해전 수행. 패배/퇴각 시 세우타 항구(`27:4`)에서 재도전. 승리 시 오해의 실마리를 잡고 동아프리카(마사와)로 단서가 이어짐. | **현행 각색·축약**<br>- 원작의 20개 항구 난수 수색·루시아 인도·페로 해전을 세우타(`portId: '27'`) 주점 대면 및 조안 함대와의 직접 해전(`ceuta-clash`)으로 압축. | `catalinaIntegration.test.tsx` (`N2`, `N3`, `F3`), `desktop-d1-d8/summary.json` (`D3`, `D4`) |
| **Section 6: 마사와와 오스만 함대 포위전 (명성 15,000)** | 명성 15,000 달성 후 해전 승리 시 포로 항해사로부터 조안이 마사와(`port 74/75`)에서 오스만 함대와 싸운다는 정보 입수 → 마사와 항구에서 조안 조우 → 오스만 함대(25~29) 격파 지원 → 마사와 특별 건물에서 조안·피에트로 콘티가 1522년 당시 프랑코 가문에 사설 함대가 없었음을 입증하여 오해 해소 | **P4 (`massawa-truth`, 마사와 주점 `75:2`):** 세우타 해전 승리 후 동아프리카 마사와 주점(`75:2`) 방문 시 조안·로코가 산후안 습격의 진짜 배후가 에스파냐 고위층(마르티네스 후작)임을 증명하는 문서를 제시하여 오해를 풀고 공조를 맺음(해적 명성 +200, 금화 +3,000). | **현행 각색·축약**<br>- 명성 15,000 게이트와 오스만 함대 조력전을 생략하고 마사와 주점(`75:2`) 진상 확인 회담으로 집중 구현. | `catalinaIntegration.test.tsx` (`N2`, `N4`), `desktop-d1-d8/events.jsonl` |
| **Section 7 전반: 알리·라울의 진상 폭로와 남미 루시아 구출 결투 (명성 30,000)** | 명성 30,000 달성 후 리스본 프랑코 저택에서 피에트로·라울 프랑코가 마르티네스 후작과 네오 아틀란티스 음모를 폭로 → 남미 항구(42~56, 카라카스~카옌) 탐색 후 주점에서 루돌프 해적(`Pirate Rudolph`)과 일기토를 벌여 조안·루시아 탈출 지원 → 남미 항구에서 조안·에제키엘 함대와 연합 결성 | **P5 (`cayenne-rescue`, 카옌 여관 `57:5`) + `cayenne-rescue-retry` (카옌 항구 `57:4`):** 마사와 진상 확인 후 남미 카옌 여관(`57:5`)에서 마르티네스의 하수인 모랄레스 선장(`Captain Morales`, `katarina.cayenne-duel`)과 일기토를 벌여 포로를 구출하고 아마존 하구 결전 좌표를 확보함. 패배 시 카옌 항구(`57:4`)에서 재도전. | **현행 각색·축약**<br>- 남미 15개 항구 10% 확률 탐색을 카옌(`portId: '57'`) 여관 고정 이벤트 및 일기토(`katarina.cayenne-duel`)로 결정론화. | `catalinaIntegration.test.tsx` (`N2`, `N3`, `F3`), `d3-p5-cayenne-duel.png` |
| **Section 7 후반: 네오 아틀란티스 마르티네스 결전 및 엔딩 (`F4 01`)** | 카옌 서쪽/마르가리타 남쪽 해역 `(1922, 656)`에서 마르티네스의 해적 대함대(61~69)와 최종 결전 승리 후 요새 붕괴 및 엔딩(`F4 01`) 재생 (동맹인 조안·에제키엘 공격 시 배드엔딩 소멸 분기 존재) | **P6 (`mouth-of-the-amazon` 발견 + `amazon-reckoning` 카옌 항구 `57:4` + `amazon-reckoning-retry`) → P7 (`seville-homecoming` 세비야 왕궁 `2:6` + `CatalinaEnding.tsx`) → P8 (엔딩 이후):** 아마존강 하구(`mouth-of-the-amazon`)를 발견한 뒤 카옌 항구(`57:4`)에서 마르티네스의 기함 `Santa Aguila`(`katarina.amazon-martinez`)를 격파(`P6`). 이후 세비야 왕궁(`2:6`)으로 귀환하여 에란초 가문의 명예를 회복하고 보상(금화 +10,000, 해적 명성 +500, 모험 명성 +300) 및 `CatalinaEnding` 화면을 확인(`P7`). 엔딩 이후에도 저장·복원·자유 항해 지속(`P8`). | **현행 구현 + 현행 각색·축약**<br>- 원작의 해상 즉시 엔딩(`F4 01`)을 아마존강 하구 발견 게이트 + 마르티네스 기함 결전(`P6`) + 세비야 왕궁 금의환향 엔딩(`P7`) 및 엔딩 이후 자유 항해(`P8`)로 완결성 있게 구성. | `catalinaIntegration.test.tsx` (`N2`, `N6`, `N8`), `d3-p6-amazon-martinez-combat.png`, `d6-p7-catalina-ending.png`, `d6-p8-palace-revisit-after-reload.png` |

---

### 9.2 관문별(P0~P8) 및 목표별(G1~G8) 요구사항·테스트 대응표

| 관문 / 목표 ID | 코드 심볼 및 파일 | 전제조건 | 사용자 입력 / 트리거 | 성공 후 상태 | 실패·거절·재도전 복구 | 저장 전후 보존 및 증거 |
| --- | --- | --- | --- | --- | --- | --- |
| **P0** 새 게임 | `startNewGameAs('katarina')` (`protagonists.ts`, `System.tsx`) | 없음 | 시스템 메뉴 → 주인공 `카탈리나 에란초` 선택 → `새 항해 시작` 클릭 | `protagonistId: 'katarina'`, 세비야(`portId: '2'`), 금화 `500`, 초기 선박 `0`척, 초기 항해사 카탈리나(`'2'`) | 해당 없음 | `N1`, `D1`, `d1-p0-seville-start.png` |
| **P1** 세비야 탈출 준비 | `katarina.vengeance.seville-mutiny` (`vengeance/events.ts`, `Harbor.tsx`) | `protagonistId === 'katarina'`, 세비야 항구(`2:4`), 미완료 | 세비야 항구(`2:4`) 입장 및 대사 진행 | 기함 `Rebellion`(`shipId: '9'`) 지급, 에밀리오(`'36'`, `role: 'firstMate'`) 합류, 금화 `+2,000`(`2,500`), 레이피어(`'4'`) 지급, `seville-mutiny` 완료 | 완료 후 세비야 항구 재방문 시 중복 지급 없음(`E3`) | `N2-P1`, `N4`, `D1`, `d1-p1-seville-mutiny-dialogue.png`, `d1-p1-journal.png` |
| **P2** 스페인 추격전 | `spanish-pursuit` / `spanish-pursuit-retry` (`vengeance/events.ts`, `actionsWorld.ts`) | `P1` 완료, `Rebellion` 보유, 해상 `dayAtSea >= 1` (`2:4` 재도전은 `spanish_pursuit_failed === 1`) | 세비야 출항 후 해상 항해 1일 경과 → `katarina.seville-patrol` 해전 | 승리 시 `spanish-pursuit` 완료, `spanish_pursuit_failed: 0`, 다음 목표 세우타 주점 안내 | 패배/퇴각 시 `spanish_pursuit_failed: 1` 설정, 세비야 항구(`2:4`)에서 재출격(`'yes'`) 또는 보류(`'no'`) 선택 가능 | `N2-P2`, `N3`, `F2`, `F3`, `E1`, `D2`, `D3`, `d2-p2-sea-story.png`, `d3-p2-naval-combat.png` |
| **P3** 세우타 조안 함대 대치 | `ceuta-clash` / `ceuta-clash-retry` (`vengeance/events.ts`) | `P2` 완료, 세우타 주점(`27:2`) (`27:4` 재도전은 `ceuta_clash_failed === 1`) | 세우타 주점(`27:2`) 입장 및 대사 진행 → `katarina.joao-fleet` 해전 | 승리 시 `ceuta-clash` 완료, `ceuta_clash_failed: 0`, 다음 목표 마사와 주점 안내 | 패배/퇴각 시 `ceuta_clash_failed: 1` 설정, 세우타 항구(`27:4`)에서 재도전/보류 가능 | `N2-P3`, `N3`, `F2`, `F3`, `D3`, `D4`, `uw2-slot-2.json` |
| **P4** 마사와 진상 확인 | `massawa-truth` (`vengeance/events.ts`) | `P3` 완료, 마사와 주점(`75:2`) | 마사와 주점(`75:2`) 입장 및 대사 진행 | `massawa-truth` 완료, 해적 명성 `+200`, 금화 `+3,000`, 다음 목표 카옌 여관 안내 | 선행 `P3` 미완료 시 마사와 주점 방문해도 발동 안 함(`F1`, `N8`) | `N2-P4`, `N4`, `D3`(`D-DIAGNOSTIC`) |
| **P5** 카옌 구출·결투 | `cayenne-rescue` / `cayenne-rescue-retry` (`vengeance/events.ts`) | `P4` 완료, 카옌 여관(`57:5`) (`57:4` 재도전은 `cayenne_rescue_failed === 1`) | 카옌 여관(`57:5`) 입장 및 대사 진행 → `katarina.cayenne-duel` 일기토 | 승리 시 `cayenne-rescue` 완료, `cayenne_rescue_failed: 0`, 다음 목표 아마존강 하구 발견 안내 | 일기토 패배 시 `cayenne_rescue_failed: 1` 설정, 카옌 항구(`57:4`)에서 재도전/보류 가능 | `N2-P5`, `N3`, `F2`, `F3`, `D3`(`D-DIAGNOSTIC`), `d3-p5-cayenne-duel.png` |
| **P6** 아마존 발견·결전 | `mouth-of-the-amazon` + `amazon-reckoning` / `amazon-reckoning-retry` (`vengeance/events.ts`) | `P5` 완료, `discoveries`에 `'mouth-of-the-amazon'` 포함, 카옌 항구(`57:4`) | 아마존강 하구 발견 후 카옌 항구(`57:4`) 입장 → `katarina.amazon-martinez` 해전 | 승리 시 `amazon-reckoning` 완료, `amazon_reckoning_failed: 0`, 다음 목표 세비야 왕궁 안내 | 미발견 시 발동 차단(`F1`), 패배/퇴각 시 `amazon_reckoning_failed: 1` 설정 및 카옌 항구(`57:4`) 재도전/보류 가능 | `N2-P6`, `N3`, `F1`, `F2`, `F3`, `D3`(`D-DIAGNOSTIC`), `d3-p6-amazon-martinez-combat.png` |
| **P7** 세비야 귀환 엔딩 | `seville-homecoming` (`vengeance/events.ts`, `CatalinaEnding.tsx`) | `P6` 완료, 세비야 왕궁(`2:6`) | 세비야 왕궁(`2:6`) 입장 및 대사 진행 | `seville-homecoming` 완료, 금화 `+10,000`, 해적 명성 `+500`, 모험 명성 `+300`, `endingSeen: true`, `CatalinaEnding` 표시 | `P6` 미완료 시 세비야 왕궁 방문해도 미발동(`F7`), 엔딩 화면에서 `항해 계속하기` 클릭 시 항구 복귀 | `N2-P7`, `N6`, `F7`, `D6`(`D-DIAGNOSTIC`), `d6-p7-catalina-ending.png` |
| **P8** 엔딩 이후 | `CatalinaEnding.tsx`, `catalinaJournal.ts`, `saveLoad.ts` | `P7` 완료 (`seville-homecoming` 포함) | 엔딩 닫기 → 슬롯 저장 → 종료 → 재실행 → 슬롯 로드 → 세비야 왕궁(`2:6`) 재방문 및 항해 계속 | 엔딩 완료 상태·보상·함대·동료 영구 보존, 세비야 왕궁 재방문 시 엔딩 재발동 없음, 자유 항해 계속 가능 | 해당 없음 | `N6`, `N8`, `E2`, `E3`, `D6`(`D-DIAGNOSTIC`), `uw2-slot-3.json`, `d6-p8-palace-revisit-after-reload.png` |
| **G1~G8** 전체 목표 | 위 §2 변경 파일 전체 및 §3 검증 명령 | §5 통과 기준 전체 | §10.4 및 §11 전체 검사 실행 | `G1~G8` 전 항목 **PASS** | 초기 실패 3건 원인 규명 및 해결 완료 | `manifest.json`, `summary.json`, `events.jsonl`, `publication-receipt.json` |

---

### 9.3 소스·릴리스·증거·명령 요약 (Codex 일괄 검수용)

- **소스 브랜치 URL / 고정 commit / 재현 checkout 명령:**
  - 저장소 및 브랜치: https://github.com/KaronLabs/Uncharted-Waters-2/tree/codex/catalina-complete
  - 기준 `main` commit: `370d535a5af5fb170fcbbb3447fb8c218d5e19a3`
  - 제품 `sourceCommit`: `ca0b1360e75384844a796be0edf87872d75b53b6`
  - 검증 도구 `toolCommit`: `d9658e65ee2d8d481d7b2a14afe4676e31d29250`
  - 게시 `publicationCommit` (`P`): https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/catalina-candidate-20261108-ca0b136/publication-receipt.json 내 `publicationCommit` 필드에 기록
  - 재현 checkout 및 검증 명령:
    ```powershell
    git clone https://github.com/KaronLabs/Uncharted-Waters-2.git uw2-review
    Set-Location uw2-review
    git checkout codex/catalina-complete
    git lfs pull
    Set-Location remake
    npm ci
    npm run verify
    npx tsc --noEmit -p tests/tsconfig.json
    node --test tests/desktop/desktopAcceptance.test.cjs
    ```
- **후보 사전 릴리스 / EXE / 증거 ZIP / SHA256 목록:**
  - 사전 릴리스 태그 (`prerelease: true`, `Latest` 아님): `catalina-candidate-20261108-ca0b136`
  - 사전 릴리스 URL: https://github.com/KaronLabs/Uncharted-Waters-2/releases/tag/catalina-candidate-20261108-ca0b136
  - 후보 EXE: https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/catalina-candidate-20261108-ca0b136/UW2-Catalina-Korean.exe (`109,879,594` bytes, SHA256 `d5ff3ef177a252c060974702baa6ece6bd679a16f74da5994b725402552f58bd`)
  - 공개 증거 ZIP: https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/catalina-candidate-20261108-ca0b136/catalina-evidence-run-20261108-catalina-d1-d8.zip
  - SHA256 목록: https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/catalina-candidate-20261108-ca0b136/catalina-candidate-sha256.txt
  - 후속 게시 영수증: https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/catalina-candidate-20261108-ca0b136/publication-receipt.json
- **manifest 파일 수·총 바이트 / 수신 검증 결과:**
  - `remake/docs/catalina/manifest.json`에 고정 payload 총 **29개 파일**(후보 EXE 1개 + `completion-report.md` 1개 + `run-20261108-catalina-d1-d8` 증거 파일 27개)의 상대 경로·바이트 크기·SHA256이 기록되어 있으며, 원격 재수신 결과는 `publication-receipt.json`에 기록됨.
- **새 게임 진입 / 시험 프로필·슬롯 경로 / 시작·종료 명령:**
  - 격리 시험 실행 명령 (사용자 `%APPDATA%` 슬롯과 완전 분리):
    ```powershell
    $env:UW2_SLOTS_DIR = "E:\03_AllWork\04_REA\uw2-joao-worktree\remake\docs\catalina\evidence\manual-test-slots"
    Start-Process -FilePath "E:\03_AllWork\04_REA\uw2-joao-worktree\remake\dist-desktop\UW2-Catalina-Korean.exe" -ArgumentList "--user-data-dir=E:\03_AllWork\04_REA\uw2-joao-worktree\remake\docs\catalina\evidence\manual-test-profile"
    ```
  - 새 게임 진입 절차: 우측 상단 `시스템`(기어 아이콘) 클릭 → 언어 `한국어` 확인 → `새 게임 주인공` 드롭다운에서 `카탈리나 에란초` 선택 → `새 항해 시작` 클릭.
- **보존한 사용자 변경 / 원본 데이터 불변 확인:**
  - 워크트리 내 사용자 미추적 문서 `docs/mission/catalina-autonomous-completion.md` 보존 완료.
  - 호스트 사용자 슬롯 경로 `C:\Users\Administrator\AppData\Roaming\UW2-QCaine-Preview\slots` 내 기존 슬롯(`uw2-slot-1.json` 외) 바이트·타임스탬프·해시 불변 확인(`userSlotsUntouched: true`).
  - 원격 `main` 브랜치(`370d535a5af5fb170fcbbb3447fb8c218d5e19a3`), `Latest` 릴리스(`v0.3.1-joao-ko-bgm-fix`), 기존 `UW2-Joao-Korean.exe` 자산(`89495eb4ac8cf40200bed9e2fc0f2dc2bd3b2a4e50c868710f59563e26c5e1ed`) 불변 확인.

---

### 9.4 형님 전편 수동 인수 체크리스트 (`U1~U8`)

- **대상 실행 파일:** `UW2-Catalina-Korean.exe` (`109,879,594` bytes, SHA256 `d5ff3ef177a252c060974702baa6ece6bd679a16f74da5994b725402552f58bd`)
- **주의사항:** 현행 리메이크의 실제 관문 동선에 맞추어 작성되었습니다. 언제든 우측 상단 `항해일지`(책 아이콘)를 클릭하면 현재 관문과 다음 목표 항구·건물이 한국어로 표시됩니다.

| ID | 형님이 수행할 행동 | 현행 리메이크 실제 동선 및 조작 | 기대하는 정상 결과 |
| --- | --- | --- | --- |
| **U1** | 새 카타리나·한국어 게임 시작, 마을 이동·출입 | 1. 우측 상단 `시스템` → 언어 `한국어` 선택<br>2. `새 게임 주인공`에서 `카탈리나 에란초` 선택 후 `새 항해 시작` 클릭<br>3. 세비야(`portId: 2`) 마을에서 이동 및 `항구`(`2:4`) 입장 | 조안과 독립된 세비야 시작(초기 금화 500), `항구` 입장 즉시 **P1(`레벨리온호 탈취`)** 한국어 대사가 진행되며 기함 `Rebellion`·1등항해사 `에밀리오 산체스`·군자금 +2,000 금화·`레이피어`가 지급되고 항해일지가 갱신됨 |
| **U2** | 탈출 준비 → 출항 → 스페인 추격전 | 1. 세비야 `주점`(`2:2`)에서 선원 모집, `항구`(`2:4`)에서 물·식량·포탄 보급 후 `출항`<br>2. 해상에서 1일 이상 항해 이동 | 해상 1일 경과 즉시 **P2(`에스파냐 봉쇄선 돌파`)** 해상 대사 후 아기레 사령관(`San Felipe`)과 해전 돌입. 승리 시 다음 목표(`세우타 주점`)로 갱신되며, 혹시 패배/퇴각하더라도 세비야 `항구`(`2:4`)에 재입장하면 재도전/보류 선택지가 정상 작동함 |
| **U3** | 세우타 사건과 조안 함대 대치 | 1. 지브롤터 해협 남쪽 **세우타**(`portId: 27`)로 항해하여 입항<br>2. 세우타 `주점`(`27:2`) 입장 | 조안 프랑코·로코 알렘켈과의 한국어 대사 후 **P3(`세우타의 충돌`)** 조안 함대(`Galera Real`) 해전 발생. 승리 시 동아프리카 **마사와** 단서가 열리며, 패배/퇴각 시 세우타 `항구`(`27:4`)에서 재도전 가능 |
| **U4** | 실제 항해로 마사와에 도착해 진상 사건 진행 | 1. 아프리카를 돌아 홍해 입구 동아프리카 **마사와**(`portId: 75`)로 항해하여 입항<br>2. 마사와 `주점`(`75:2`) 입장 | **P4(`마사와의 진실`)** 한국어 회담이 진행되어 산후안 습격의 진범이 마르티네스 후작임이 밝혀지고, 해적 명성 +200·금화 +3,000 획득 및 다음 목표(`카옌 여관`)로 항해일지가 갱신됨 |
| **U5** | 카옌 구출·일기토와 아마존 발견/결전 | 1. 남미 북동부 **카옌**(`portId: 57`)으로 항해하여 `여관`(`57:5`, 04:00~20:00 외 시간 또는 일반 입장) 방문 ➔ **P5(`카옌의 구출전`)** 모랄레스 선장과 일기토 승리<br>2. 카옌 남동쪽 해안의 **아마존강 하구**(`mouth-of-the-amazon`) 해역에 접근하거나 보급항 탐색으로 발견 완료<br>3. 다시 카옌 `항구`(`57:4`) 입장 ➔ **P6(`아마존 하구의 결전`)** 마르티네스 기함(`Santa Aguila`) 해전 승리 | 카옌 여관 일기토 및 카옌 항구 마르티네스 기함 해전이 모두 정상 진행(패배 시 카옌 `항구`에서 재도전 가능)되며, 마르티네스 격파 후 다음 목표가 `세비야 왕궁 귀환`으로 갱신됨 |
| **U6** | 중후반에 Windows 슬롯 저장·완전 종료·재실행·복원 | 1. 우측 상단 `시스템` → `Windows 파일 슬롯`(`슬롯 1~3`)에 이름 입력 후 `슬롯 저장`<br>2. 창을 완전히 닫아 프로세스 종료 후 `UW2-Catalina-Korean.exe` 재실행<br>3. `시스템` → 저장한 슬롯의 `불러오기` 클릭 | 동일한 카타리나 저장 계보·함대(`Rebellion`)·동료(`에밀리오 산체스`)·금화·명성·항해일지 진행도가 손실 없이 복원되고 이어서 플레이 가능 |
| **U7** | 최종 승리 → 세비야 귀환 엔딩 | 1. 에스파냐 **세비야**(`portId: 2`)로 귀환하여 입항<br>2. 세비야 `왕궁`(`2:6`) 입장 | **P7(`세비야로 금의환향`)** 한국어 대사 후 금화 +10,000·해적 명성 +500·모험 명성 +300이 지급되고, 한국어 엔딩 화면(`카탈리나 에란초 — 복수의 해적기, 명예로 귀환하다`)이 미완성 요소 없이 표시됨 |
| **U8** | 엔딩 후 저장·복원·재방문·계속 항해 | 1. 엔딩 화면에서 `항해 계속하기` 클릭 후 슬롯 저장 → 앱 재실행 → 슬롯 불러오기<br>2. 세비야 `왕궁`(`2:6`) 재방문 및 출항하여 항해 계속 | 엔딩 완료 상태와 항해일지(`모든 목표 완료`)가 유지되며, 세비야 왕궁 재방문 시 엔딩·보상이 중복 발동하지 않고 BGM 중첩 없이 자유 항해가 계속됨 |

---

## 10. 다음 에이전트에게 남기는 인수인계 메모 (§18)

- **목표와 종료 상태:**
  - 미션 문서 경로: `E:\03_AllWork\04_REA\uw2-joao-worktree\docs\mission\catalina-autonomous-completion.md`
  - 현재 개발 상태: `READY_FOR_CODEX_REVIEW`
  - 사용자 인수 상태: `USER_FULL_PLAY_PENDING`
  - 최종 Codex 독립 검수 상태: `CODEX_REVIEW_PENDING`
  - `G1~G8` 통과 여부: `G1: PASS`, `G2: PASS`, `G3: PASS`, `G4: PASS`, `G5: PASS`, `G6: PASS`, `G7: PASS`, `G8: PASS` (전 항목 PASS).
- **호스트와 작업 위치:**
  - 호스트 OS: Windows (`win32`, Node `v24.14.1`)
  - 활성 worktree 절대 경로: `E:\03_AllWork\04_REA\uw2-joao-worktree` (제품 루트: `E:\03_AllWork\04_REA\uw2-joao-worktree\remake`)
  - 작업 브랜치: `codex/catalina-complete`
  - 기준 `main` SHA: `370d535a5af5fb170fcbbb3447fb8c218d5e19a3`
  - 제품 `sourceCommit` SHA: `ca0b1360e75384844a796be0edf87872d75b53b6`
  - 검증 도구 `toolCommit` SHA: `d9658e65ee2d8d481d7b2a14afe4676e31d29250`
  - 보존된 dirty/untracked 파일: `docs/mission/catalina-autonomous-completion.md` (형님의 미션 계약서 원본, 커밋에서 제외하고 워크트리에 보존).
- **실행 중 작업:**
  - 현재 실행 중인 백그라운드 프로세스·데스크톱 시험 앱 `0`개 (`verify-bgm-load.cjs` 및 `verify-catalina-desktop.cjs`가 생성한 모든 Electron 자식 PID는 `terminateOwned` 및 `close-confirmed`로 완전 종료 확인 완료).
- **완료한 일과 증거:**
  - `G1~G8`, `P0~P8`, `N1~N8`, `F1~F8`, `E1~E8`, `R1~R8`, `D1~D8` 전 항목 완료.
  - 상세 증거 경로: `remake/docs/catalina/evidence/run-20261108-catalina-d1-d8/` (`bgm-load/events.jsonl`, `desktop-d1-d8/summary.json`, `desktop-d1-d8/events.jsonl`, 스크린샷 13장, 격리 시험 슬롯 5개) 및 `remake/docs/catalina/manifest.json`.
  - 직접 설정한 fixture/필드 구분:
    - `catalinaIntegration.test.tsx`의 `N8`은 `P0`(`startNewGameAs('katarina')`) 1회 초기화 후 중간 이벤트·보상 주입 없이 실제 production action/effect로만 `P8`까지 전이함(단, 해상 이동은 `worldTimeTick` 및 포트 이동 후 실제 건물/전투/발견 액션을 호출하므로 `T` 등급이며 `U`가 아님).
    - `verify-catalina-desktop.cjs`의 `D1~D4`(`P0->P3`)는 실제 후보 EXE에서 타이틀 새 게임부터 세우타 해전 승리·슬롯 2 저장까지 연속 실행(`D` 등급)했고, `P4~P8`(`D3` 후반 및 `D6`)은 슬롯 2를 기반으로 생성한 슬롯 3 진단 저장(`D-DIAGNOSTIC` 등급)으로 실제 후보 EXE의 마사와·카옌·아마존·세비야 왕궁 엔딩·재방문 UI를 검증함.
- **남은 일:**
  - **구현 잔여 0건.**
  - 남은 절차는 ① Codex의 고정 후보 독립 통합 검수(`CODEX_REVIEW_PENDING`)와 ② 형님의 `U1~U8` 수동 전편 플레이 인수(`USER_FULL_PLAY_PENDING`)뿐이다.
- **데이터 경계:**
  - 사용자 실제 슬롯(`C:\Users\Administrator\AppData\Roaming\UW2-QCaine-Preview\slots`)은 읽기 전용 스냅샷 비교 외에 일절 건드리지 않았으며(`userSlotsUntouched: true`), 모든 시험 슬롯은 `remake/docs/catalina/evidence/run-20261108-catalina-d1-d8/*/slots` 아래에 격리 생성됨.
  - 임시 Chromium `--user-data-dir` 폴더(`profile/`)와 원격 재수신 검증용 임시 폴더는 정리 완료했으며, 활성 worktree·원본 증거·기존 v0.3.1/v0.3.0 릴리스는 보존함.
- **후보 대응:**
  - 제품 `sourceCommit`: `ca0b1360e75384844a796be0edf87872d75b53b6`
  - 검증 도구 `toolCommit`: `d9658e65ee2d8d481d7b2a14afe4676e31d29250`
  - 후보 EXE: `remake/dist-desktop/UW2-Catalina-Korean.exe` (`109,879,594` bytes, SHA256 `d5ff3ef177a252c060974702baa6ece6bd679a16f74da5994b725402552f58bd`)
  - 고정 payload 목록: `remake/docs/catalina/manifest.json`
  - 게시 commit `P` 및 원격 재수신 검증 영수증: https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/catalina-candidate-20261108-ca0b136/publication-receipt.json
- **다음 에이전트의 첫 행동:**
  - Codex 검수 시: `publication-receipt.json`과 `manifest.json`의 해시 대조부터 확인한 뒤 `G1~G8` 및 `D1~D8` 증거를 검수한다.
  - 만약 형님의 `U1~U8` 수동 플레이 또는 Codex 검수에서 재현 가능한 신규 결함이 보고된 경우에만 새 반복을 시작하며, 그렇지 않으면 코드를 추가 수정하지 않는다.
- **최종 인수 경계:**
  - Codex는 고정 후보의 독립 통합 검수, 형님은 `U1~U8` 전편 수동 인수 담당이며, 현재 후보는 구현 잔여 0건인 `READY_FOR_CODEX_REVIEW` 상태다.
