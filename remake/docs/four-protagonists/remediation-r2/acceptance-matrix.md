# Four Protagonists Remediation r2 — Acceptance Matrix (`acceptance-matrix.md`)

본 문서는 `docs/mission/four-protagonists-remediation-r2-mission.md` (§10.3 C5, §11.5, §11.6)에 따라, 단일 후보 EXE(`UW2-Korean-Four-Captains.exe`, `109,961,968` bytes, SHA-256 `d79883f4ee649ff67e76f20691697d56041334ec1733f6067b3dd378a47a7b26`, `sourceCommit = 614d7c02a7c3bb57798ad5db8f9a78a95bf0ce52`, `toolCommit = 88c9704aedc248f6f190ceb15e5afe18861b4176`)에서 **실제 실행하여 단언을 통과한 검사만** 집계한 매트릭스다.

---

## 0. 기존 `r1` 주장의 검증 범위 정정 (`C5` & `C3` 정정 고지)

1. **`r1` 자연 실기(`D-NATURAL`) 범위 과장 정정**:
   - 직전 `remake/docs/four-protagonists/remediation/acceptance-matrix.md`(보존됨, 수정하지 않음)는 옷토의 해적 명성 획득·카타리나 주점 약속·신규 일지 및 알의 미끼 돛·5일 항해 6회·바스라 재회를 `D2`/`D3` `D-NATURAL PASS`로 서술했으나, 실제 `r1` 하네스(`c4f376d`)는 옷토 런던 초반 결투/첫 출항과 알의 초반 교역/1명 상환까지만 자연 실행하고 나머지는 `D7` 진단 fixture(`counter=6` 및 완료 이벤트 주입)로만 실행했다.
   - 이번 `r2`(`run-1794722585479-240aed67`)에서는 Phase A(`12`개 순수 `D-NATURAL`, fixture `0`, `journey.p.*` 단축키 `0`)와 Phase B(`1`개 `T` + `2`개 `D-DIAGNOSTIC`)를 물리적으로 분리하여, 위 누락 구간 전부를 **새 게임부터 실제 UI 조작으로 완주한 `D-NATURAL` 증거**로 검증했다. `D7`/후반 직전 fixture로 검증한 구간(`A-DIAGNOSTIC-DEBT`, `P-DIAGNOSTIC-CORNER`)은 정직하게 `D-DIAGNOSTIC`(`fixtureUsed: true`)으로만 기록한다.
2. **`r1` 옷토 보르도 60일 도과 복구 주장 철회**:
   - `r1` 문서가 보르도 결전 기한(`>= 60`일) 도과 후 세비야 사령실 재진입 복구가 가능하다고 적은 설명은 원작(`SNR3.DAT` Section 5, `scenario-3-otto-baynes.md:519-526`)과 어긋난 잘못된 주장이었으므로 전면 철회한다. 원작과 동일하게 보르도 기한 도과(`>= 60` 원작 30일월 날짜 코드)는 엔딩 없는 종단 실패이며, `ottoJournal.ts`와 `O-NATURAL-JOURNAL`/`O-NATURAL-TIME` 모두 해당 종단 실패 안내와 재진입 불가를 검증한다.

---

## 1. 최종 EXE 필수 15개 Required-Case 실제 실행 집계 (`run-1794722585479-240aed67`)

- **실행 기록 원본**: `evidence/run-20261115-614d7c0-r2/desktop-verification/executed-checks.json` (`canonicalSha256 = bc69ddb4221b5694426e6275a74974132a2b426ba84565719f46dc4445862b2b`)
- **집계 검증 명령**: `node scripts/evidence-aggregator.cjs docs/four-protagonists/remediation-r2/evidence/run-20261115-614d7c0-r2/desktop-verification/executed-checks.json --expected-exe d79883f4ee649ff67e76f20691697d56041334ec1733f6067b3dd378a47a7b26 --expected-source 614d7c02a7c3bb57798ad5db8f9a78a95bf0ce52 --expected-tool 88c9704aedc248f6f190ceb15e5afe18861b4176` → `exit 0`, `15/15 PASS`, `0 FAIL`, `0 NOT_RUN`, `0 BLOCKED`.

| 미션 §11.5 논리 ID | `executed-checks.json` Case ID | 대상 | 증거 등급 | `fixtureUsed` | 시작 계보 (`startingLineage`) | 행동 / 단언 수 | 소요 시간 (ms) | 이번 실행 관측 요약 (`이번 실행`) | 재사용 과거 근거 | 상태 |
| --- | --- | --- | --- | --- | --- | --- | ---: | --- | --- | --- |
| `C1-D-medallion` (상륙/거절) | `P-NATURAL-LANDING` | `pietro` | `D-NATURAL` | `false` | `natural-new-game` | `4` / `6` | `458,009` | 대양 `(699.97, 500.01)` 상륙 비활성/`Search` 숨김 → 오답 해안 `(493.52, 586)` 수색 실패·지도 `'87'` 보존·출항 해제 → 황금 메달 해안 `(507.99, 586)` 상륙 전 `Search` 숨김 → `Go Ashore` 클릭 후 `isAshore=true` 정박 확인 | 없음 (전수 이번 실행) | **PASS** |
| `C1-D-medallion` & `C1-D-staff` (발굴) | `P-NATURAL-SEARCH` | `pietro` | `D-NATURAL` | `false` | `natural-new-game` | `3` / `4` | `727,558` | 황금 메달 해안 `(507.99, 586)` `Search`로 `'87'` 소비·`p1-gold-medallion` 획득·모험명성 `+200`·중복 수색 거절 → 페르시아만 비항구 해안 `(1207, 434.66)` `Search`로 `'88'` 소비·`p2-poseidons-staff`+`m3-staff-of-the-saint` 획득·중복 거절 | 없음 (전수 이번 실행) | **PASS** |
| `C1` 경계 (`θ-1/θ/θ+1`, 항구입구) | `P-DIAGNOSTIC-CORNER` | `pietro` | `D-DIAGNOSTIC` | `true` | `diagnostic-fixture` | `4` / `4` | `3,616` | 산토도밍고 `(454,542)`·바스라 `(1190,428)` 항구 입구(`<=2.5`) 차단, `θ+1`(`>5`) 거절, `θ`(`<=5`) 성공, 지도 누락 거절 및 `θ-1` 1회 발굴·중복 거절 | 없음 (전수 이번 실행) | **PASS** |
| `C2-D-decoy` | `A-NATURAL-DECOY` | `ali` | `D-NATURAL` | `false` | `natural-new-game` | `10` / `14` | `2,708,289` | 초기 차입·4인 상환 → 첫 왕궁 알현(`+500,000g`, 면세증 `'30'`) → `1,000,000g` 미달 시 전제/조안 차단 확인 → 13회 실교역으로 `1,012,212g` 달성 → 미검사 건물(`12`,`5`,`8`) 불발 → 길드(`7`) 전제 발동 → 출항 전 조안 차단 → 해상 1일차 후 이스탄불 소문·주점 조안·항구 미끼 돛 → 해상 카타리나 전투 전 취소(`activeCombat=null`, 전리품/명성/피해 `0`) | 없음 (전수 이번 실행) | **PASS** |
| `C2-D-voyages-news` | `A-NATURAL-VOYAGES` | `ali` | `D-NATURAL` | `false` | `natural-new-game` | `10` / `12` | `1,576,202` | 같은 자연 계보에서 조우 항해 6일 연장 시 단일 집계(`1`) → 5일 미만 항해 무시(`1`) → 2~5회 누적(`5`) 시 이스탄불 주점 사파 소문 차단(`false`) → 6회 달성(`6`) 후 사파 소문 개방 → 알렉산드리아 피에트로 `5,000g` 대여 → 바스라 주점 사파 재회(`+1,000` 교역명성) → 이스탄불 라디아 보고 | 없음 (전수 이번 실행) | **PASS** |
| `C2-D-debt` | `A-DIAGNOSTIC-DEBT` | `ali` | `D-DIAGNOSTIC` | `true` | `diagnostic-fixture` (`DIAG_알베자스C2섹션3`) | `7` / `22` | `3,380,019` | 비이스탄불 항구 30항구 트리거 전 라디노 차단 → 알렉산드리아(`19:4`) 30항구 완료 → 라디노 베네치아 전근 동행(`0g`) → 하웰 채무 추심 의뢰 `No` 분기(수색 차단·50항구 없이 술탄 보상 가능 확인) 및 `Yes` 본선 → 리스본 공작부인 후원(`+100,000g`) → 나가사키 단서 → 사카이 피에트로 추심(미대여 `+400,000g`/`+500` 및 대여 `+2,100,000g`/`+1,000`) → 베네치아 정산(`-400,000g`, `+1,000`/`+500` 명성) → 술탄 보상(`+1,000,000g`) → 40k 명성 미달(`39,650`) 차단 및 달성 후 항구/주점 → 바스라 루스템 → 이스탄불 가족 상봉 → 하웰 호가(`820` 및 `10,000` 상한)·무상 저택 양도(`0g` 차감) → 이스탄불 주점 결혼 엔딩 및 재방문 무중복 | 없음 (전수 이번 실행) | **PASS** |
| `C3-D-choice-journal` (선택/거절) | `O-NATURAL-DECISION` | `otto` | `D-NATURAL` | `false` | `natural-new-game` | `6` / `7` | `457,878` | 거절 전 세비야 주점/사령실 단순 방문 시 `coward=false, reentry=false` → 보르도 비주점 불발 → 보르도 주점(`28:2`) 명시적 `No` 선택으로만 `coward` 생성 → 타 유럽 주점 재제안 없음 → 세비야 주점 조롱 대사 → 세비야 사령실(`2:8`) 재수락 및 타임스탬프 갱신 → 조롱 종료 | 없음 (전수 이번 실행) | **PASS** |
| `C3-D-choice-journal` (일지) | `O-NATURAL-JOURNAL` | `otto` | `D-NATURAL` | `false` | `natural-new-game` | `5` / `5` | `699,561` | 도전 전 유럽 비수도 주점 안내(세비야 오추천 없음) → 거절 직후 세비야 사령실 안내 → `<30`일 대기(`경과 6/30일`) → `30..59`일 개방(`경과 30일`) → `>=60`일 도달 즉시(건물 진입 전) `보르도만 결전 기한 도과` 및 런던 보고 전승 없음 표시 | 없음 (전수 이번 실행) | **PASS** |
| `C3-D-appointment` | `O-NATURAL-TIME` | `otto` | `D-NATURAL` | `false` | `natural-new-game` | `7` / `8` | `1,467,305` | 세비야 교역소 구출 시각 틱(`24`, `v15=29`) 기록 → 조기 주점 방문(`tick 27 <= 29`) 대기 대사·미완료 → 정시 주점 방문(`tick 31 in [30..35]`) 동맹 완료(`+500` 해적명성, `+1,500g`) → 보르도 `<30`일(`6`일 및 `29`일 직전) 결전 불발 → `30..59`일(`30`일) 결전 발동·승리 → `>=60`일 건물 방문 시 `bordeaux-appointment-missed` 1회 완료 및 재방문 일반 대사 → 보르도/세비야/런던 복구·엔딩 불가 확인 | 없음 (전수 이번 실행) | **PASS** |
| 에르네스트 원작 본선 (`D2`/`D3`) | `E-NATURAL-WORLD` | `ernst` | `D-NATURAL` | `false` | `natural-new-game` | `3` / `3` | `1,607,925` | 북해 측량 및 메르카토르 보고(모험명성 `>=100`) → 천주(`95`) 입항 시 장안(`98`) 잠금 유지 → 나가사키(`100`) 부모 상봉 후 장안 해금 → 장안(`98`) 저택 귀향 엔딩 완주 | 없음 (전수 이번 실행) | **PASS** |
| `C4` 저장 검증 일치 | `C4-SLOT-STORE-PARITY` | `system` | `T` | `true` | `synthetic-test` + 격리 슬롯 EXE UI | `2` / `6` | `942` | `c4-slot-parity-matrix.cjs` `39/39` 일치 + 실제 EXE UI에서 손상 `target`+유효 `.bak`(슬롯 2) 백업 메타 표시·카운터 `4` 복구 로드·`.bak` 바이트 보존, 손상 단독 슬롯 3 로드 비활성화·바이트 보존 확인 | 없음 (전수 이번 실행) | **PASS** |
| `SAVE-D-roundtrip/otto` | `SAVE-D-roundtrip/otto` | `otto` | `D-NATURAL` | `false` | `natural-new-game` → UI 저장 → 앱 종료 → 재실행 로드 | `2` / `9` | `13,237` | 보르도(`<30`일) 슬롯 1(`ee730dff...`) 저장·완전 종료·동일 EXE 재실행 로드 후 `originalCore`/`storyEvents` deep-equal 및 여관 투숙 시간 진행 확인 | 없음 (전수 이번 실행) | **PASS** |
| `SAVE-D-roundtrip/ernst` | `SAVE-D-roundtrip/ernst` | `ernst` | `D-NATURAL` | `false` | `natural-new-game` → UI 저장 → 앱 종료 → 재실행 로드 | `2` / `10` | `120,269` | 천주(`95`) 슬롯 2(`83e589f7...`) 저장·완전 종료·재실행 로드 후 중간 잠금 `lockedPorts: ["98"]` 보존 및 나가사키(`100`) 연속 항해 상봉 확인 | 없음 (전수 이번 실행) | **PASS** |
| `SAVE-D-roundtrip/pietro` | `SAVE-D-roundtrip/pietro` | `pietro` | `D-NATURAL` | `false` | `natural-new-game` → 해상 상륙 UI 저장 → 앱 종료 → 재실행 로드 | `2` / `12` | `525` | 페르시아만 비항구 해안 상륙 중 슬롯 3(`bb60ec0b...`) 저장·완전 종료·재실행 로드 후 `portId===null`, `isAshore===true`, `ashorePosition` 일치 보존 및 즉시 `Search`로 지팡이 발굴 확인 | 없음 (전수 이번 실행) | **PASS** |
| `SAVE-D-roundtrip/ali` | `SAVE-D-roundtrip/ali` | `ali` | `D-NATURAL` | `false` | `natural-new-game` → UI 저장 → 앱 종료 → 재실행 로드 | `2` / `11` | `1,097` | 라디아 보고 직후 슬롯 1(`a99a0d43...`) 저장·완전 종료·재실행 로드 후 `aliDayFiveVoyages === 6`, 바스라 재회 상태 보존 및 이스탄불 항구(`3:4`) 진입 시 카운터 무변동 확인 | 없음 (전수 이번 실행) | **PASS** |

---

## 2. 원래 미션 게이트 (`D1` ~ `D8`, `sprite-regression`, 단위/회귀) 이번 실행 대조표

| 게이트 / 스위트 | 증거 등급 | 이번 후보(`614d7c0` / `d79883f4...`) 실행 결과 (`이번 실행`) | 재사용 과거 근거 및 불변 조건 | 상태 |
| --- | --- | --- | --- | --- |
| **`D1`** (4인 새 게임 시작·항구 이동·첫 건물·출항) | `D-NATURAL` | `otto`, `ernst`, `pietro`, `ali` 전원 통과 (`d1-*-start.png`, `d1-otto-palace-dialogue.png`) | 없음 (이번 실행) | **PASS** |
| **`D2`** (4인 고유 원작 메커니즘) | `D-NATURAL` | 옷토 결투·사략·약속, 에르네스트 측량·메르카토르 보고, 피에트로 비항구 해안 상륙·수색, 알 실교역·4인 상환·미끼 돛·조우 취소·6항해 전수 통과 | 없음 (이번 실행) | **PASS** |
| **`D3`** (변경·핵심 항구 및 현장 정상 접근) | `D-NATURAL` | 에르네스트 `95`·`100`·`98` 자연 항해 해금·입항, 피에트로 `49`·`1`·`14`·`74`·`77` 및 두 비항구 해안 현장 자연 항해·상륙 통과 | 없음 (이번 실행) | **PASS** |
| **`D4`** (해상도·한국어 UI 무잘림) | `D-NATURAL` | `1280x720@1`, `800x600@1`, `800x600@1.5` Win32 클라이언트 크기·일지 19항목·대사·선택지 무오버플로 통과 (`d4-800x600-ali-journal.png`) | 물리적 OS 150% DPI / 한영 IME 수동 체감은 미션 §6.2에 따라 보류 유지 | **PASS** |
| **`D5`** (앱 완전 종료 후 재실행 슬롯 복원) | `D-NATURAL` | 4인 주인공 전원 UI 저장 → 프로세스 종료 → 동일 EXE 재기동 → UI 로드 및 후속 행동 통과 | 없음 (이번 실행) | **PASS** |
| **`D6`** (구버전 `v8` 각색판 안내 및 조안/카타리나 미표시) | `D-DIAGNOSTIC` (`v8` fixture) + `D-NATURAL` (조안/카타리나) | `v8` 옷토 `legacy-remake` 마이그레이션 및 안내 배너 표시, 조안/카타리나 미표시 확인 (`d6-legacy-v8-otto-*.png`) | 없음 (이번 실행) | **PASS** |
| **`D7`** (후반 관문·오르테가 보상·4인 원작 엔딩 배너·재방문) | `D-DIAGNOSTIC` (`DIAG_` 슬롯) + 실기 관측 | 오르테가 전투 중 `1,000g` / 퇴각 `1,000g` / 승리 1회 `13,000g`(`20,500` 명성) / 재방문 `13,000g` 확인 및 4인 원작 한국어 엔딩 배너(`d7-*-ending-banner.png`) 확인 | 없음 (이번 실행) | **PASS** |
| **`D8`** (6인 교차 로드·오류 0·오프라인·격리) | `D-DIAGNOSTIC` + `D-NATURAL` | 6인(`otto`, `ernst`, `pietro`, `ali`, `katarina`, `joao`) 교차 로드, `consoleErrors: 0`, `pageErrors: 0`, `failedRequests: 0`, `externalRequests: 0`, `realUserSlotsAccessed: false` | 없음 (이번 실행) | **PASS** |
| **`sprite-regression`** (6인 걷기 스프라이트·카타리나 4방향 2프레임) | `D-NATURAL` | 동일 EXE `d79883f4...`에서 6인 초기·걷기·슬롯 로드 픽셀 일치율 `ratio: 1`, 카타리나 4방향 2프레임 `PASS`, `realUserSlotsAccessed: false` (`sprite-regression/summary.json`) | 없음 (이번 실행) | **PASS** |
| **`npm run verify` + 저장/집계 부정 단위 검사** | `T` / `S` | `sourceCommit = 614d7c0`에서 Jest `133/133` suites (`1,153/1,153` tests, 4인 `N8` 포함), `typecheck`, `lint`, `prettier:check`, `build:webpack`, `story:validate`, `verify:assets`, `slotStore.test.cjs` (`9/9`), `c4-slot-parity-matrix.cjs` (`39/39`), `test-evidence-rejection.cjs` (`39/39`), `r1-counterexamples-recheck.json` 전수 PASS (`614d7c0..88c9704` 구간은 데스크톱 하네스 스크립트 3개만 변경되어 제품 소스 불변) | `614d7c0` 제품 소스 불변(`git diff 614d7c0..88c9704 -- remake/src remake/desktop` 빈 출력) | **PASS** |
