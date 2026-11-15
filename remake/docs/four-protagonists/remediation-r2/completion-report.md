# C1~C5 수정 후보 최종 보고

## 수행 요약
- 수행/미수행/이유:
  - **수행 완료**: `review/remediation-r1-recheck-20261110/R1-VERDICT.md` (`R1-RESULT.json`, `GUILTY / REVISE / severity: 41`)에서 지적된 `C1`~`C5` 5개 항목 전수 원인 규명·원작 바이트(`SNR3/5/6.DAT`, `MAIN.EXE`, `worldTilemap.wasm`) 대조 수정, 기존 해결 성과(`R-F4` 원반례, `R-F6`, `R-F7`, 개인 `%APPDATA%` 격리) 보존 검증, 단일 Windows 포터블 후보 `UW2-Korean-Four-Captains.exe`(`109,961,968` bytes, SHA-256 `d79883f4ee649ff67e76f20691697d56041334ec1733f6067b3dd378a47a7b26`) 빌드, 동일 EXE에서의 `sprite-regression` 및 15개 required-case 연속 실행(`run-1794722585479-240aed67`, `15/15 PASS`, `12 D-NATURAL` + `2 D-DIAGNOSTIC` + `1 T`), POSIX `evidence-manifest.json` 봉인 및 새 GitHub 사전 릴리스(`four-protagonists-candidate-20261115-614d7c0-r2`) 인계 준비(게시 후 원격 재수신 증명은 ZIP 외부 `publication-receipt.json` 및 신규 검수 spec에 기록).
  - **미수행 (계약상 보류/분리 항목 및 이유)**: (1) 원 요청 Codex 세션의 최종 독립 재검수 판정(`CODEX_REVIEW_PENDING` — 검수 주체 분리), (2) 형님의 4인 주인공 전편 수동 플레이 인수(`USER_FULL_PLAY_PENDING` — 인수 주체 분리), (3) `main` 병합·`Latest`(`v0.3.1`) 교체·기존 후보 태그/판결문 수정(미션 §6.2 금지 사항), (4) 물리적 OS 150% DPI 배율 및 한국어 IME 수동 체감 검사(미션 §6.2 재개 제외 항목).
- development_status: READY_FOR_CODEX_REVIEW
- codex_review_status: CODEX_REVIEW_PENDING
- user_acceptance_status: USER_FULL_PLAY_PENDING
- review_verdict: PENDING

## 변경 파일
| 파일 | 변경 내용 | C항목/이유 | commit |
| --- | --- | --- | --- |
| `remake/desktop/slotStore.cjs` | `isValidOriginalCorePayload`에 `aliDayFiveVoyages`(음이 아닌 정수), `aliCurrentVoyageCounted`(`boolean`), `isAshore`(`boolean`), `ashorePosition`(유한 좌표/`null`) 검증 추가하여 렌더러와 계약 일치 및 유효 `.bak` 삭제 방지 | `C4` | `7c0a76a` |
| `remake/desktop/slotStore.test.cjs` | 신규 필드 타입·음수·소수 오류 시 유효 `.bak` 보존·복구 및 기존 `R-F4` 비파괴 거절 단위 테스트(`9/9`) 확장 | `C4` | `7c0a76a` |
| `remake/src/state/originalCore.ts` | `OriginalCoreState`에 `isAshore`, `ashorePosition` 추가 및 `isValidOriginalCoreCandidate` / `normalizeOriginalCoreState` 검증·정규화 규칙 동기화 | `C1`, `C4` | `7c0a76a`, `a36fe5e` |
| `remake/src/state/saveMigrations.ts` | `v9` 마이그레이션 시 신규 상륙/카운터 필드 검증 및 구 지원 `v9` 누락 필드 기본값(`0`/`false`/`null`) 정규화 유지 | `C1`, `C4` | `7c0a76a` |
| `remake/src/state/saveLoad.ts` | 로드·초기화 경계에서 상륙 상태 UI 동기화 및 낡은 상륙 상태 누수 차단 | `C1`, `C4` | `7c0a76a` |
| `remake/src/data/discoveryData.ts` | `p1-gold-medallion`(`7.0°N, 65.0°W`, `{x:508.0, y:589.688}`) 및 `p2-poseidons-staff`(`28.5°N, 51.8°E`, `{x:1208.8, y:432.394}`) 비항구 해안 좌표 확정 및 `radius = 5` 고정 | `C1` | `7c0a76a`, `eb40c20` |
| `remake/src/state/actionsOriginalCore.ts` | `canGoAshore()`(`worldTilemap` 8인접 육지 충돌 + 항구 입구 `<=2.5` 배제), `goAshore()`, `leaveAshore()`, `canExcavateTreasure()`/`excavateTreasure()`의 상륙 상태·정박 위치·반경 `5` 강제 및 `Math.max(radius,45)`·fallback OR 제거 | `C1`, `C2` | `7c0a76a`, `a36fe5e`, `eb40c20` |
| `remake/src/interface/world/Provisions.tsx` | 로컬 `ashoreOpen` 우회 제거, `isAshore === true`일 때만 `[data-test="sea-search-treasure"]` 렌더링, `Go Ashore` / `Sail` 상태 구독 동기화 | `C1` | `7c0a76a`, `eb40c20` |
| `remake/src/game/world/worldPlayer.ts` | 상륙 중 함대 자동 전진 차단 및 이동 시 상륙 상태 정합성 유지 | `C1` | `eb40c20` |
| `remake/src/game/world/worldCharacters.ts` | 해상 NPC 조우 및 이동 틱 경계 정합성 보강 | `C1`, `C2` | `7c0a76a`, `eb40c20` |
| `remake/src/state/actionsProvisions.ts` | 해상 보급 상태 갱신 시 상륙 패널 안전 연동 | `C1` | `7c0a76a` |
| `remake/src/state/actionsWorld.ts` | 출항/이동/입항 시 `isAshore` 초기화, 알 미끼 항해 중 카타리나 해상 조우 전투 전 취소(`0xA101`, `activeCombat=null`), 항해당 1회 `aliDayFiveVoyages` 집계 | `C1`, `C2` | `7c0a76a`, `a36fe5e`, `02d3a7e` |
| `remake/src/state/actionsCombat.ts` | 알 미끼 취소 경로에서 전투 승리/전리품 정산이 절대 발생하지 않도록 보호 및 무관 함장 정상 전투 유지 | `C2` | `7c0a76a`, `02d3a7e` |
| `remake/src/combat/encounters.ts` | 카타리나 해상 요격 편성 식별자 및 원작 조우 조건 정합화 | `C2` | `02d3a7e` |
| `remake/src/story/content/arcs/ali/original-core/events.ts` | `SNR6.DAT` 전 사슬 복원: 50금괴 첫 알현, 소지 금화 100금괴(`gold >= 1,000,000g`) 지정 건물 전제+출항 1일 게이트, 이스탄불 소문→주점 조안→항구 미끼 돛→해상 카타리나 취소, 6항해→사파 소문→바스라 재회→라디아 보고, 30항구→라디노 베네치아 전근→하웰 피에트로 추심 의뢰(`Yes`/`No`)→리스본 후원→나가사키→사카이 피에트로 추심(`lent`/`refused`)→베네치아 정산→술탄 보상→40k 명성→루스템→가족 소개→하웰 호가·무상 저택(`0g`)→주점 결혼 엔딩 | `C2` | `7c0a76a`, `a36fe5e`, `079e521`, `02d3a7e`, `614d7c0` |
| `remake/src/story/content/arcs/ali/original-core/dialogue.ts` | 복원된 알 원작 미끼 항해·후반 채무 추심·하웰 저택 시험·주점 결혼 대사 반영 | `C2` | `7c0a76a`, `a36fe5e`, `02d3a7e` |
| `remake/src/story/aliJournal.ts` | 복원된 알 원작 단계별 현재 목표 안내 동기화 | `C2` | `7c0a76a`, `a36fe5e`, `02d3a7e` |
| `remake/src/localization/dialogue/ali.ts`, `remake/src/localization/koreanAli.ts` | 알 원작 복원 대사 및 일지 한국어 번역 추가 | `C2` | `02d3a7e` |
| `remake/src/story/content/arcs/pietro/original-core/dialogue.ts`, `remake/src/story/pietroJournal.ts`, `remake/src/localization/dialogue/pietro.ts`, `remake/src/localization/koreanPietro.ts` | 피에트로 비항구 해안 좌표(`7°N 65°W`, 페르시아만 동안 `28.5°N 51.8°E`) 단서·일지·한국어 번역 정렬 | `C1` | `eb40c20` |
| `remake/src/story/content/arcs/otto/original-core/events.ts` | 세비야 자동 거절 제거(유럽 비수도 주점 명시적 `No` 선택에서만 `ezequiel-declined-coward` 생성), 카타리나 20분 시계 틱 밴드(`early`/`meeting`/`late` 무보상 진행), 보르도 `30..59` / `>=60` 원작 날짜 코드 조건 연결 | `C3` | `7c0a76a`, `079e521`, `829b3b6` |
| `remake/src/story/core/types.ts`, `remake/src/story/core/resolver.ts` | `clockTickBand`(하루 20분 틱 `(anchorTick+5)%72`) 및 `get30DayMonthDateCode`(원작 30일월 날짜 코드, 공용 그레고리력 불변) 구현 | `C3` | `types.ts`: `829b3b6` / `resolver.ts`: `7c0a76a`, `829b3b6` |
| `remake/src/story/ottoJournal.ts`, `remake/src/localization/ui.ts`, `remake/src/localization/koreanUi.ts` | 도전 전 유럽 비수도 주점 안내(세비야 오추천 제거), 거절 후 세비야 사령실 안내, `>=60`일 도달 즉시 `보르도만 결전 기한 도과` 종단 실패 및 런던 보고 불가 안내 반영 | `C3` | `ottoJournal.ts`: `7c0a76a`, `829b3b6` / `ui.ts`·`koreanUi.ts`: `7c0a76a`, `a36fe5e`, `829b3b6` |
| `remake/src/interface/world/Provisions.test.tsx`, `remake/src/state/actionsOriginalCore.landing.test.ts`, `remake/src/state/pietroLandingExcavation.test.ts` | `C1` 상륙 전 `Search` 미노출·발굴 거부, 대양/항구입구/오답해안 거부, `θ-1/θ/θ+1` 반경 경계, 이동·입항 해제 단위 테스트 | `C1` | `7c0a76a`, `a36fe5e`, `eb40c20` |
| `remake/src/story/aliOriginalCoreFidelity.test.ts`, `remake/src/story/ottoOriginalCoreFidelity.test.ts`, `remake/src/story/fourProtagonistsOriginalCore.test.tsx`, `remake/src/story/contentManifest.test.ts` | `C1`~`C3` 원작 조건·경계·실패 분기 및 4인 `N8` 전편 통합 회귀 테스트(`133` suites / `1,153` tests) | `C1`, `C2`, `C3` | `7c0a76a`, `a36fe5e`, `829b3b6`, `02d3a7e`, `9b763fc`, `614d7c0` |
| `remake/scripts/c4-slot-parity-matrix.cjs` | desktop `slotStore.cjs`와 renderer `migrate` 간 39개 합성 슬롯 계약 일치 검증 스크립트 | `C4` | `a748f39` |
| `remake/scripts/execution-tracker.cjs`, `remake/scripts/evidence-aggregator.cjs`, `remake/scripts/test-evidence-rejection.cjs` | `ExecutionTracker` 15개 required-case 기본 `NOT_RUN`·계보 오염 차단(`LINEAGE_FRAUD_DETECTED`), `evidence-aggregator.cjs` 진단 대체·누락·해시 불일치 거절 및 39개 부정 거절 테스트 | `C5` | `execution-tracker.cjs`·`evidence-aggregator.cjs`: `7c0a76a`, `a36fe5e`, `614d7c0` / `test-evidence-rejection.cjs`: `7c0a76a`, `a36fe5e` |
| `remake/scripts/verify-remediation-candidate.cjs` | 동적 `profile` 제외 기록 및 `executed-checks.json` 후보 식별자·`overallVerdict === 'PASS'` 교차 검증 추가 | `C5`, `R-F7` | `90bafce` |
| `remake/tests/desktop/runtime.cjs`, `remake/tests/desktop/joaoJourney.cjs`, `remake/scripts/verify-four-protagonists-desktop.cjs`, `remake/scripts/four-protagonists/{ottoNatural,pietroNatural,aliNatural,dev-otto,dev-pietro,dev-ali}.cjs` | 격리 프로필 유지(`realUserSlotsAccessed: false`), Phase A(`12 D-NATURAL`) / Phase B(`1 T` + `2 D-DIAGNOSTIC`) 통합 실기 러너, 피에트로 해안 보급·접안 안정화(`f1bb034`), 옷토 보르도 여관 직입 기한 도과 대사 채취(`88c9704`) | `C1`~`C5` | `7c0a76a`..`614d7c0`, `f1bb034`, `88c9704` |
| `remake/docs/four-protagonists/remediation-r2/**` (`review/spec_20261115_four_protagonists_remediation_r2.md`는 로컬 미추적 검수 경로) | `r2` 원작 오라클·결함 상태·인수 매트릭스·최종 보고서·실기 증거(`run-20261115-614d7c0-r2`, `profile/` 제외)·매니페스트(`tagCommit`), ZIP 외부 영수증(`receiptCommit`) 및 로컬 검수 spec | 문서/인계 | `tagCommit` / `receiptCommit` |

## C1~C5 해결표
| ID | 원인/원작 기대값 | 이전 반례 | 수정 | 실제 검증 | 증거 | 잔여 |
| --- | --- | --- | --- | --- | --- | --- |
| **C1** | React 표시용 `ashoreOpen` 우회 및 `Math.max(radius,45)`·항구/고정 OR 허용 / 원작은 비항구 해안 인접 수역에서 실제 `Go Ashore` 후 목표 반경 내 `Search`만 허용 | 첫 SSR 렌더 `Search=true`, 상륙 액션 없이 지도 `'87'` 소비·금메달 획득, 거리 `6`/`40`/`45` 허용 (`story-r1-probe.cjs`) | `OriginalCoreState.isAshore`/`ashorePosition` 도입, `worldTilemap` 8인접 육지 충돌 및 항구 입구 `<=2.5` 배제, 비항구 해안 좌표(`7.0°N,65.0°W` / `28.5°N,51.8°E`) 및 `radius=5` 확정 | 대양·오답해안·항구입구·상륙전 거절, 황금 메달·지팡이 실항해 상륙·수색·중복거절, 상륙 상태 저장·재실행 수색, `θ-1/θ/θ+1` 경계 통과 | `P-NATURAL-LANDING`, `P-NATURAL-SEARCH`, `SAVE-D-roundtrip/pietro`, `P-DIAGNOSTIC-CORNER`, `r1-counterexamples-recheck.json` | 없음 |
| **C2** | 리스본 조안·마사와 건물 대사 각색 경로 및 후반 추심 생략 / 원작 `SNR6.DAT`은 소지 금화 100금괴 이스탄불 전제→주점 조안→항구 미끼 돛→해상 카타리나 전투 전 취소(`0xA101`)→5일 항해 6회→사파 소문→바스라 재회→30항구·라디노 전근·하웰 추심 의뢰·리스본 후원·사카이 추심·베네치아 정산·술탄 보상·무상 저택·주점 결혼 엔딩 | 이스탄불 미끼 돛·해상 조우 취소 부재, 후반 라디노/리스본/사카이 추심·정산 부재 (`story-r1-probe.cjs`) | `SNR6.DAT` 전 구간 이벤트·일지·번역 복원 및 `actionsWorld.ts` 전투 전 취소(`activeCombat=null`, 전리품 0) + 항해당 1회 `aliDayFiveVoyages` 연결 | 실교역 `1,012,212g` 달성 후 이스탄불 전제·조안·미끼 돛·실제 해상 카타리나 취소(`A-NATURAL-DECOY`), 5회 차단·6회 소문·피에트로 대여·바스라 재회·라디아 보고(`A-NATURAL-VOYAGES`), 후반 추심·정산·결혼 엔딩(`A-DIAGNOSTIC-DEBT`) 통과 | `A-NATURAL-DECOY`, `A-NATURAL-VOYAGES`, `SAVE-D-roundtrip/ali`, `A-DIAGNOSTIC-DEBT`, `aliOriginalCoreFidelity.test.ts` | 없음 |
| **C3** | 세비야 진입 시 무선택 거절, 기한 도과 후 `"30~59일"` 안내 잔류, 총 경과 분/그레고리력 일수 사용 / 원작 `SNR3.DAT`은 비수도 주점 명시적 `No`에서만 거절, 카타리나는 하루 20분 시계 틱 비교(지각 시 무보상 진행), 보르도는 30일월 날짜 코드 및 `>=60`일 종단 실패 | 세비야 `cowardWithoutChoice=true`, 기한 도과 후 `"30 to 59 days"`, 다음 날 같은 시각(`1560`분) 지각 오판, `1523-03-01` `59`일 오판 (`otto-ernst-recheck.cjs`) | 세비야 자동 거절 제거, 일지 유럽 비수도 주점 안내 및 `>=60`일 즉시 `보르도만 결전 기한 도과` 전환, `clockTickBand` 및 `get30DayMonthDateCode` 적용, `r1` 거짓 복구 주장 철회 | 거절 전 세비야 무반응·명시적 `No` 거절·사령실 재수락(`O-NATURAL-DECISION`), 5단계 일지(`O-NATURAL-JOURNAL`), 카타리나 조기/정시 및 보르도 `<30`/`30..59`/`>=60` 종단 실패(`O-NATURAL-TIME`) 통과 | `O-NATURAL-DECISION`, `O-NATURAL-JOURNAL`, `O-NATURAL-TIME`, `r1-counterexamples-recheck.json` | 없음 |
| **C4** | `desktop/slotStore.cjs`에 신규 필드 타입/범위 검증 누락 / desktop과 renderer 검증이 일치하여 로드 불가 `target` 때문에 유효 `.bak`를 삭제하지 않아야 함 | `aliDayFiveVoyages="6"` / `aliCurrentVoyageCounted="yes"` + 정상 `.bak`에서 잘못된 `target` 반환 및 `.bak` 삭제 (`save-r1-probe.cjs`) | `slotStore.cjs`와 `originalCore.ts`에 `aliDayFiveVoyages`·`aliCurrentVoyageCounted`·`isAshore`·`ashorePosition` 동일 검증 적용, 구 `v9` 누락 호환 유지 | 39개 합성 매트릭스 100% 일치 및 실제 EXE UI 슬롯 2 백업 복구 로드(`.bak` 바이트 보존)·슬롯 3 손상 비활성화(바이트 보존) 통과 | `C4-SLOT-STORE-PARITY`, `c4-slot-parity-matrix.json`, `slotStore.test.cjs` | 없음 |
| **C5** | 실행하지 않은 구간을 `D-NATURAL PASS`로 기재 / 실행 전 required 목록(`NOT_RUN`) 고정 후 실제 동작·단언 통과 시에만 `PASS` 기록 및 `D-NATURAL`·`D-DIAGNOSTIC` 분리 | 옷토 약속/일지 및 알 미끼/6항해/재회가 자연 구간에 없는데 `D-NATURAL PASS`로 보고 (`R1-VERDICT.md`) | `ExecutionTracker` 기본 `NOT_RUN`, Phase A(`12 D-NATURAL`) / Phase B(`1 T` + `2 D-DIAGNOSTIC`) 분리, `evidence-aggregator.cjs` 계보 검증 및 `r1` 과장 범위 정정 | 동일 EXE 연속 실행 `15/15 PASS`, 부정 집계 거절 시험 `39/39 PASS` | `executed-checks.json`, `summary.json`, `test-evidence-rejection.cjs` | 없음 |

## 실행 명령·검사
| cwd/명령 | 실제 종료/중단 | case ID | 증거 등급·계보 | 관측·단언 | 결과·로그 |
| --- | --- | --- | --- | --- | --- |
| `remake`: `npm run verify` | 정상 종료 (`exit 0`) | 단위/통합/빌드 회귀 전체 | `T` / `S` (`sourceCommit: 614d7c0`) | Jest `133/133` suites (`1,153/1,153` tests, 4인 `N8` 포함), `typecheck`, `lint`, `prettier:check`, `build:webpack`, `story:validate`, `verify:assets` 통과 | **PASS** |
| `remake`: `node --test desktop/slotStore.test.cjs` | 정상 종료 (`exit 0`) | `slotStore` 단위 계약 | `T` (합성 파일) | `R-F4` 판본 보존, `C4` 신규 필드 오류 시 `.bak` 보존·복구, 쓰기 중단 복구 `9/9` 단언 통과 | **PASS** |
| `remake`: `node scripts/c4-slot-parity-matrix.cjs` | 정상 종료 (`exit 0`) | `C4` desktop/renderer 일치 | `T` (합성 파일) | 문자열/음수/소수 카운터, 잘못된 플래그, 상륙 좌표 × `target`/`.bak`/`.tmp` `39/39` 일치 | **PASS** (stdout JSON; 실기 산출물 `desktop-verification/c4-slot-parity-matrix.json` 동일 `39/39`) |
| `remake`: `node scripts/test-evidence-rejection.cjs` | 정상 종료 (`exit 0`) | `C5` 집계기 부정 시험 | `T` (합성 입력) | `NOT_RUN`/누락/중복/다른 EXE/fixture 계보 사기(`LINEAGE_FRAUD_DETECTED`)/변조 해시 등 `39/39` 거절 확인 | **PASS** |
| `remake`: `node docs/four-protagonists/remediation-r2/evidence/run-20261115-614d7c0-r2/r1-counterexamples-recheck.cjs` | 정상 종료 (`exit 0`) | `R1` 반례 전수 재현 | `T-DIAGNOSTIC` (`os.tmpdir()` 합성 슬롯 자동 정리, 기본 읽기 전용) | `story-r1-probe`, `otto-ernst-recheck`, `save-r1-probe` 전 반례 해결 및 `SNR3..6.DAT` 섹션/시그니처 확인 | **PASS** (`r1-counterexamples-recheck.json`) |
| `remake`: `npx electron-builder --win portable --x64 -c.directories.output=dist-desktop-remediation-20261115-r2` | 정상 종료 (`exit 0`) | 단일 후보 EXE 패키징 | 빌드 (`sourceCommit: 614d7c0`) | `UW2-Korean-Four-Captains.exe` (`109,961,968` bytes, SHA-256 `d79883f4...`) 생성 | **PASS** |
| `remake`: `node scripts/verify-port-player-sprites.cjs --exe dist-desktop-remediation-20261115-r2/UW2-Korean-Four-Captains.exe --artifacts docs/four-protagonists/remediation-r2/evidence/run-20261115-614d7c0-r2/sprite-regression` | 정상 종료 (`exit 0`) | 6인 스프라이트 회귀 | `D-NATURAL` (새 게임 + 슬롯 왕복, 격리 프로필) | 6인 초기·걷기·로드 `ratio: 1`, 카타리나 4방향 2프레임 통과, `realUserSlotsAccessed: false` | **PASS** (`sprite-regression/summary.json`) |
| `remake`: `node scripts/verify-four-protagonists-desktop.cjs --exe dist-desktop-remediation-20261115-r2/UW2-Korean-Four-Captains.exe --artifacts docs/four-protagonists/remediation-r2/evidence/run-20261115-614d7c0-r2/desktop-verification --source-commit 614d7c02a7c3bb57798ad5db8f9a78a95bf0ce52` | 정상 종료 (`exit 0`) | 15개 required-case + `D1`~`D8` | Phase A: `12 D-NATURAL` (`fixtureUsed: false`) / Phase B: `1 T` + `2 D-DIAGNOSTIC` (`fixtureUsed: true`) | 총 5회 앱 기동, `15/15` required-case(`133`개 실기 단언) 및 `D1`~`D8` 통과, 콘솔/페이지/네트워크 오류 `0`, 외부 요청 `0`, `realUserSlotsAccessed: false` | **PASS** (`desktop-verification/executed-checks.json`, `summary.json`, `events.jsonl`) |
| `remake`: `node scripts/evidence-aggregator.cjs docs/four-protagonists/remediation-r2/evidence/run-20261115-614d7c0-r2/desktop-verification/executed-checks.json --expected-exe d79883f4ee649ff67e76f20691697d56041334ec1733f6067b3dd378a47a7b26 --expected-source 614d7c02a7c3bb57798ad5db8f9a78a95bf0ce52 --expected-tool 88c9704aedc248f6f190ceb15e5afe18861b4176` | 정상 종료 (`exit 0`) | 독립 사후 집계 검증 | `T` | `ok: true`, `errors: []`, `passedCount: 15`, `canonicalSha256` 무결성 확인 | **PASS** |

## required-case 집계
- required/실제PASS/FAIL/NOT_RUN/BLOCKED 목록과 차이:
  - **required (`15`개)**: `P-NATURAL-LANDING`, `P-NATURAL-SEARCH`, `P-DIAGNOSTIC-CORNER`, `A-NATURAL-DECOY`, `A-NATURAL-VOYAGES`, `A-DIAGNOSTIC-DEBT`, `O-NATURAL-DECISION`, `O-NATURAL-JOURNAL`, `O-NATURAL-TIME`, `E-NATURAL-WORLD`, `C4-SLOT-STORE-PARITY`, `SAVE-D-roundtrip/otto`, `SAVE-D-roundtrip/ernst`, `SAVE-D-roundtrip/pietro`, `SAVE-D-roundtrip/ali`.
  - **실제 결과 (`run-1794722585479-240aed67`)**: `PASS = 15`, `FAIL = 0`, `NOT_RUN = 0`, `BLOCKED = 0`, 차이 `0`건.
  - 이전 부분/실패 실행(`desktop-verification-partial-pietro46-20261115`, `desktop-verification-otto-step6-20261115`)은 삭제·은폐하지 않고 `remake/docs/four-protagonists/remediation-r2-superseded-drafts/`(로컬 워크트리 전용 비추적 보존 경로, Git 태그 및 공개 증거 ZIP에서는 제외)에 별도 보존했으며, 최종 판정에는 단일 완주 실행 `run-1794722585479-240aed67`만 사용한다(다른 실행 결과 합산 0건).
- fixture·직접 상태 수정·시간 제어·과거 근거 재사용의 범위:
  - **Phase A (`12`개 `D-NATURAL` case)**: 모두 `natural-new-game` 및 같은 자연 계보의 실제 UI 저장 슬롯에서 출발했으며, 슬롯 파일 주입(`0`건)과 `journey.p.*` 메모리 단축 조작(`0`건)을 일절 사용하지 않고 실제 UI 클릭·키보드 조타·실교역·실항해·여관 투숙 시간 진행으로 완주했다.
  - **Phase B (`1`개 `T` + `2`개 `D-DIAGNOSTIC` 및 `D6`/`D7`/`D8` 일부)**: Phase A 자연 구간이 모두 종료된 뒤에만 실행되었다. `C4-SLOT-STORE-PARITY`(`T`)는 합성 슬롯 파일로 검증했고, `D7` 공개 `DIAG_` 슬롯 목록(`desktop-verification/summary.json`) 및 `A-DIAGNOSTIC-DEBT`·`P-DIAGNOSTIC-CORNER`의 `DIAG_` 경계/후반 진단 슬롯들은 미션 §11.5 허용 범위에 따라 후반/경계 직전 상태를 fixture로 준비한 뒤 마지막 사건·전투·정산·엔딩을 실제 UI에서 관측하고 `D-DIAGNOSTIC`(`fixtureUsed: true`)으로 기록하여 자연 계보를 대체하지 않았다.
  - **과거 근거 재사용**: `sourceCommit = 614d7c02a7c3bb57798ad5db8f9a78a95bf0ce52`에서 통과한 `npm run verify`(`1,153` Jest tests) 결과는 `614d7c0..88c9704` 구간에 제품 코드(`remake/src/**`, `remake/desktop/**`) 변경이 `0`줄임을 `git diff`로 확인한 범위에서만 동일 제품 SHA 근거로 연결했으며, 이전 후보(`r1`)의 실기 PASS 행이나 스크린샷은 단 1건도 재사용하지 않았다.
- 이전 보고에서 과장됐던 자연실기 범위를 이번에 어떻게 정정/검증했는가:
  - `r1`에서 미실행 상태로 `D-NATURAL`이라 잘못 적었던 (1) 옷토 길드 사략 명성 획득·카타리나 주점 시계 틱 약속·에세키엘 도전 거절/사령실 재수락·보르도 `<30`/`30..59`/`>=60` 기한 도과 종단 실패·5단계 일지(`O-NATURAL-DECISION`, `O-NATURAL-JOURNAL`, `O-NATURAL-TIME`)와 (2) 알 4인 상환·50금괴 알현·100금괴 실교역(`1,012,212g`)·이스탄불 전제/조안/미끼 돛·해상 카타리나 전투 전 취소·5일 항해 6회 누적·사파 소문·피에트로 대여·바스라 재회·라디아 보고(`A-NATURAL-DECOY`, `A-NATURAL-VOYAGES`)를 이번 단일 EXE에서 새 게임부터 실제 자연 플레이로 완주하여 검증했다.

## 원격 후보
- branch/HEAD/comparison base/sourceCommit/toolCommit/tagCommit:
  - `branch`: `codex/four-protagonists-original-core`
  - `comparison_base` (이번 `r2` 수정 기준 HEAD): `64ea33279494b1d29e340c81ddddf2e11dab4e44` (원격 `origin/main` 보존 기준: `512c7808d2fbf025102cb61005d00f1751b2d3ac`, 로컬 `main` 포인터 `b556a737961e9dfb96166705d276852f398b3227` 무변경, 직전 `r1` 제품 commit: `c4f376db46d6cf26a4ab4e146a90c9185b1a720c`)
  - `sourceCommit` (제품 코드 기준, EXE 내부 반영): `614d7c02a7c3bb57798ad5db8f9a78a95bf0ce52` (`source7 = 614d7c0`)
  - `toolCommit` (`run-1794722585479-240aed67` 실행 검증 도구 기준; `614d7c0..88c9704`는 하네스 스크립트 3개만 수정, 제품 코드 diff 0): `88c9704aedc248f6f190ceb15e5afe18861b4176` (`88c9704`)
  - `releaseTag`: `four-protagonists-candidate-20261115-614d7c0-r2` (`tagCommit`은 본 보고서·실기 증거·`evidence-manifest.json`을 고정하는 태그 커밋이며, 해시 순환 방지를 위해 정확한 `tagCommit` SHA·증거 ZIP 크기/SHA-256·원격 재수신 검증 결과 및 최종 영수증 커밋 `HEAD`는 ZIP 외부의 `remake/docs/four-protagonists/remediation-r2/publication-receipt.json` 및 로컬 `review/spec_20261115_four_protagonists_remediation_r2.md`에 기록)
- EXE/ZIP/외부receipt URL, 크기/SHA256:
  - 사전 릴리스 URL: `https://github.com/KaronLabs/Uncharted-Waters-2/releases/tag/four-protagonists-candidate-20261115-614d7c0-r2` (`isPrerelease: true`, `isDraft: false`, `isLatest: false`)
  - 후보 EXE: `https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/four-protagonists-candidate-20261115-614d7c0-r2/UW2-Korean-Four-Captains.exe` — 크기 `109,961,968` bytes, SHA-256 `d79883f4ee649ff67e76f20691697d56041334ec1733f6067b3dd378a47a7b26`
  - 증거 ZIP: `https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/four-protagonists-candidate-20261115-614d7c0-r2/UW2-Four-Protagonists-remediation-evidence-20261115-614d7c0-r2.zip` (`evidence-manifest.json` 및 실기 증거 포함, `publication-receipt.json` 및 `profile/` 미포함; ZIP 자체 바이트/SHA-256은 순환 해시 방지를 위해 외부 `publication-receipt.json` 및 `.sha256.txt`에 기록)
  - 해시 목록: `https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/four-protagonists-candidate-20261115-614d7c0-r2/UW2-Four-Protagonists-remediation-20261115-614d7c0-r2.sha256.txt`
  - 외부 영수증: `https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/four-protagonists-candidate-20261115-614d7c0-r2/publication-receipt.json` (저장소 경로: `remake/docs/four-protagonists/remediation-r2/publication-receipt.json`)
- 원격 재수신 결과와 내부 후보 식별자:
  - 빈 임시 디렉터리로 원격 EXE·ZIP·해시 목록·외부 `publication-receipt.json` 및 원격 태그(Git LFS 실파일 포함)를 재다운로드하여 바이트 크기·SHA-256·비-LFS 포인터 여부와 ZIP 내부 `evidence-manifest.json` / `executed-checks.json`의 `sourceCommit`(`614d7c02a7c3bb57798ad5db8f9a78a95bf0ce52`), `toolCommit`(`88c9704aedc248f6f190ceb15e5afe18861b4176`), `exeSha256`(`d79883f4ee649ff67e76f20691697d56041334ec1733f6067b3dd378a47a7b26`), `containsPublicationReceipt: false` 일치를 `validateCandidateEvidence`로 검증하여 `publication-receipt.json`에 기록한다.
- main/Latest 및 개인 저장 보호 근거:
  - 원격 `origin/main` SHA `512c7808d2fbf025102cb61005d00f1751b2d3ac` (및 로컬 `main` 포인터 `b556a737961e9dfb96166705d276852f398b3227`) 무변경, GitHub `Latest` 릴리스 `v0.3.1` 무변경, 직전 `four-protagonists-candidate-20261110-c4f376d-r1` 태그/자산 및 `review/remediation-r1-recheck-20261110/*` 원본 판결 무변경 보존.
  - 모든 검증 프로세스는 아티팩트 하위 격리 `profile`/`slots`만 사용했으며(`realUserSlotsAccessed: false`), 호스트 `%APPDATA%\UW2-QCaine-Preview` 개인 저장·백업·기본 프로필은 읽기/쓰기/해시/스캔하지 않았다(코드 경로 및 실행 설정 기준 확인이며 OS 전체 파일 I/O 보증으로 확대 주장하지 않음).

## 남은 위험·점수
- 확인됨/불확실/미검증, 영향과 해결 주체:
  - **확인됨**: `C1`~`C5` 전 항목 수정·단위/통합/단일 EXE 실기(`15/15 PASS`)·개인 경로 격리·`main`/`Latest` 보존 확인 완료(내부 개발 잔여 결함 `0`건).
  - **미검증 (외부 절차 대기)**:
    1. 원 요청 Codex 세션의 최종 독립 재검수 (`codex_review_status: CODEX_REVIEW_PENDING`, 해결 주체: 원 요청 Codex 검수자).
    2. 형님의 4인 전편 수동 플레이 인수 (`user_acceptance_status: USER_FULL_PLAY_PENDING`, 해결 주체: 형님).
    3. 물리적 Windows 150% DPI 모니터 배율 및 한국어 OS IME 조합 수동 체감 (미션 §6.2 보류 범위; 논리 `800x600@1.5` 뷰포트 무잘림은 `D4`에서 확인됨, 해결 주체: 사용자 수동 인수 시 선택 확인).
  - **불확실**: 향후 사전에 알려지지 않은 외부 수동 변조 저장 파일이 존재할 가능성(지원 `v5`/`v8`/`v9` 정상 마이그레이션 및 미지원/손상 파일의 비파괴 보존·백업 복구는 합성 매트릭스 `39/39`로 확인됨).
- 점수표와 각 근거 (미션 §15 기준 진단 보조 점수; 자체 점수로 최종 승인을 대신하지 않음):

| 항목 | 배점 | 자체 진단 점수 | 판정 근거 |
| --- | ---: | ---: | --- |
| 요구 충족 | 20 | **20** | `C1`~`C5` 전 항목 해결 및 기존 `R-F4`/`R-F6`/`R-F7`/4인 `N8` 목표 충족 |
| 구현 정확성 | 20 | **20** | `SNR3/5/6.DAT`·`worldTilemap` 원작 조건, production 상태 전이, `r1` 모든 반례 해결 확인 |
| 테스트 충실도 | 15 | **15** | Jest `1,153` tests + `slotStore` `9/9` + `C4` `39/39` + `C5` 부정 `39/39` + 단일 EXE `15/15` required-case 완주 |
| 회귀 관리 | 10 | **10** | 구 `v8`/`v9` 저장 호환, 6인 교차 로드(`D8`), 오르테가 단발 보상(`D7`), 6인 스프라이트(`ratio: 1`) 통과 |
| 운영 안전성 | 10 | **10** | 개인 경로 미접근(`realUserSlotsAccessed: false`), Chromium `profile/` 공개 제외, `main`/`Latest`/과거 증거 보존 |
| 유지보수성 | 10 | **10** | 제품(`614d7c0`)·도구(`88c9704`) 책임 분리, desktop/renderer 저장 검증 계약 일치 |
| 문서/인계 | 10 | **10** | `executed-checks.json`·`evidence-manifest.json`·외부 `publication-receipt.json`·신규 spec 및 재현 명령 완비 |
| 보고 정확성 | 5 | **5** | `D-NATURAL` vs `D-DIAGNOSTIC` 엄격 분리, `r1` 과장·오류 주장 명시 정정, 완료/대기/한계 구분 |
| **합계** | **100** | **100** | 내부 제출 기준(95점 이상) 충족 — 최종 판정은 Codex 독립 재검수(`PENDING`)에 위임 |

## Codex 재검수 요청
- 새spec 경로, 정확한review target과직전판결:
  - 새 spec 경로: `E:/03_AllWork/04_REA/uw2-joao-worktree/review/spec_20261115_four_protagonists_remediation_r2.md` (`review_verdict: PENDING`)
  - 직전 판결 보존 경로: `E:/03_AllWork/04_REA/uw2-joao-worktree/review/remediation-r1-recheck-20261110/R1-VERDICT.md`, `R1-RESULT.json` (`GUILTY / REVISE / severity: 41`, 무변경 보존)
  - 정확한 review target: 브랜치 `codex/four-protagonists-original-core` (`comparison_base = 64ea33279494b1d29e340c81ddddf2e11dab4e44`, `sourceCommit = 614d7c02a7c3bb57798ad5db8f9a78a95bf0ce52`, `toolCommit = 88c9704aedc248f6f190ceb15e5afe18861b4176`, 사전 릴리스 태그 `four-protagonists-candidate-20261115-614d7c0-r2`)
- 재현 명령·예상 결과·새 증거 위치:
  - 새 증거 위치: `E:/03_AllWork/04_REA/uw2-joao-worktree/remake/docs/four-protagonists/remediation-r2/` (`source-oracle.md`, `findings-status.md`, `acceptance-matrix.md`, `completion-report.md`, `evidence-manifest.json`, 외부 `publication-receipt.json`, `evidence/run-20261115-614d7c0-r2/**`)
  - 재현 명령 및 예상 결과 (모두 `exit 0`):
    ```powershell
    Set-Location E:\03_AllWork\04_REA\uw2-joao-worktree\remake
    npm run verify
    node --test desktop/slotStore.test.cjs
    node scripts/c4-slot-parity-matrix.cjs
    node scripts/test-evidence-rejection.cjs
    node docs/four-protagonists/remediation-r2/evidence/run-20261115-614d7c0-r2/r1-counterexamples-recheck.cjs
    node scripts/evidence-aggregator.cjs docs/four-protagonists/remediation-r2/evidence/run-20261115-614d7c0-r2/desktop-verification/executed-checks.json --expected-exe d79883f4ee649ff67e76f20691697d56041334ec1733f6067b3dd378a47a7b26 --expected-source 614d7c02a7c3bb57798ad5db8f9a78a95bf0ce52 --expected-tool 88c9704aedc248f6f190ceb15e5afe18861b4176
    ```
- 이 Codex 대화에 그대로 전달할 요청문:
  ```text
  사선 원정 함대 수석 정비관(아콘)이 r1 판결(review/remediation-r1-recheck-20261110/R1-VERDICT.md, R1-RESULT.json)의 C1~C5 전 항목을 수정하고 단일 Windows 후보 EXE 실기 검증 및 원격 사전 릴리스 게시·재수신 대조를 마쳐 독립 재검수를 요청합니다.

  - 신규 검수 Spec: E:/03_AllWork/04_REA/uw2-joao-worktree/review/spec_20261115_four_protagonists_remediation_r2.md
  - 직전 판결(보존): E:/03_AllWork/04_REA/uw2-joao-worktree/review/remediation-r1-recheck-20261110/R1-VERDICT.md (comparison_base: 64ea33279494b1d29e340c81ddddf2e11dab4e44)
  - 브랜치: codex/four-protagonists-original-core
  - sourceCommit: 614d7c02a7c3bb57798ad5db8f9a78a95bf0ce52
  - toolCommit: 88c9704aedc248f6f190ceb15e5afe18861b4176 (614d7c0..88c9704 구간 제품 코드 diff 0, 데스크톱 하네스 스크립트 3개만 변경)
  - 사전 릴리스 태그: four-protagonists-candidate-20261115-614d7c0-r2 (isPrerelease: true, isLatest: false; main 및 Latest v0.3.1 무변경)
  - 단일 후보 EXE: UW2-Korean-Four-Captains.exe (109,961,968 bytes, SHA256 d79883f4ee649ff67e76f20691697d56041334ec1733f6067b3dd378a47a7b26)
  - 증거 및 보고서: E:/03_AllWork/04_REA/uw2-joao-worktree/remake/docs/four-protagonists/remediation-r2/ (completion-report.md, acceptance-matrix.md, findings-status.md, source-oracle.md, evidence-manifest.json, 외부 publication-receipt.json, evidence/run-20261115-614d7c0-r2/)
  - 현재 상태:
    development_status: READY_FOR_CODEX_REVIEW
    codex_review_status: CODEX_REVIEW_PENDING
    user_acceptance_status: USER_FULL_PLAY_PENDING
    review_verdict: PENDING

  형님의 개인 %APPDATA% 저장·프로필 및 main/Latest는 건드리지 말고, C1~C5 전 항목 해결 여부와 15/15 실제 실행 증거, 원격 자산/영수증 정합성을 독립 재검수해 주십시오.
  ```

## 사용자 인수
- 주인공별 U1~U6 기대 행동/결과, 아직 사용자 인수 전임을 표시:
  - **현재 상태**: `user_acceptance_status: USER_FULL_PLAY_PENDING` — **아직 형님의 실제 수동 전편 플레이 인수 전이며, 개발 자동/실기 검증으로 형님의 인수를 대체하지 않습니다.** Codex 독립 재검수 통과 후 아래 `U1`~`U6`를 확인하신 뒤 승인 여부를 결정해 주십시오.
  - **`U1` 옷토 스피노라**: 런던 왕궁 밀명·조선소 기함·매슈 결투/영입 → 세비야 갈레온 탈취 → 길드 사략으로 해적 명성 `5,000` 달성 후 세비야 교역소 구출 및 주점 시계 틱 정시 동맹(지각 시 무보상 다음 단계 진행) → `15,000..19,999` 런던 주점 금 수송선(오르테가) 단발 보상 → `30,000` 런던 왕궁/길드 → 낭트·산토도밍고·카이엔 → 유럽 비수도 주점 에세키엘 도전장(명시적 `No` 거절 시에만 세비야 사령실 재진입 가능; 수락 후 원작 30일월 기준 `30..59`일 보르도 결전 승리 → 런던 왕궁 엔딩, `>=60`일 도과 시 일지/대사로 종단 실패 안내).
  - **`U2` 에르네스트 폰 보르**: 암스테르담 출항·해역 측량 및 메르카토르 보고 → 파울라 영입·기원 조사 → 천주(`95`) 입항(나가사키 해금, 장안 잠금 유지) → 나가사키(`100`) 부모 상봉(장안 해금) → 장안(`98`) 저택 파울라 귀향 엔딩(`'에르네스트와 파울라의 귀향'`).
  - **`U3` 피에트로 콘티**: 제노바 차입 상환·리스본 프랑코 공작부인 후원 계약 → 보물 지도(`'87'`, `'88'`) 입수 후 실제 비항구 해안(`7°N 65°W` 카리브 남미 해안, `28.5°N 51.8°E` 페르시아만 동안)까지 항해하여 `Go Ashore` 상륙 후에만 활성화되는 `Search`로 황금 메달·성자의 지팡이 발굴 → 산토도밍고/바스라 후속 단서 및 지팡이 교환 → 리스본 프랑코 저택 엔딩.
  - **`U4` 알 베자스**: 이스탄불 초기 차입·4인 상환·첫 왕궁 알현(`+500,000g`+면세증) → 소지 금화 `1,000,000g`(100금괴) 달성 및 이스탄불 지정 건물 전제·출항 후 교역소 소문→이스탄불 주점 조안→항구 미끼 돛 장착 → 해상 카타리나 조우 시 전투 없이 교전 취소 → 5일차 도달 항해 6회 누적 후 이스탄불 주점 사파 소문→바스라 사파 재회→라디아 보고 → 오스만 30동맹항·라디노 베네치아 전근 동행·하웰 피에트로 추심 의뢰·리스본 공작부인 후원·나가사키 단서·사카이 피에트로 추심·베네치아 정산·술탄 보상 → 교역 명성 `40,000`·루스템·가족 상봉·하웰 무상 저택 시험(`0g`) → 이스탄불 주점 사파 청혼·결혼 엔딩.
  - **`U5` 기존 주인공 및 구 저장 호환**: 조안·카타리나 새 게임/기존 진행 정상 플레이, 기존 유효 `v8`/`v9` 개인 저장 슬롯 계속 플레이 및 구 각색판 안내 표시 정상 작동 확인.
  - **`U6` 시청각·해상도·조작감 체감**: 한국어 대사·일지 가독성, BGM 전환·음소거 유지, 6인 항구 걷기 스프라이트, 실제 모니터 DPI 및 한영 IME 입력 체감 확인.
