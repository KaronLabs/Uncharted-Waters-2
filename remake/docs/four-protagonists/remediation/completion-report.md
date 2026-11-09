# 최종 보고서 — 네 주인공 F1~F7 수정 후보

## 1. 수행 요약
- **수행한 작업**:
  1. **검증 하네스 개인 저장 격리 선행 (`§11.5`)**: `remake/tests/desktop/runtime.cjs`, `remake/scripts/verify-four-protagonists-desktop.cjs`, `remake/scripts/verify-port-player-sprites.cjs`에서 형님의 개인 `%APPDATA%\UW2-QCaine-Preview\slots` 경로 열기·읽기·스냅샷·해시 채취를 전면 제거하고, Electron `userData`, `APPDATA`, `LOCALAPPDATA`, `UW2_SLOT_DIR`를 시험 전용 격리 폴더(`<artifacts>/profile` 및 `<artifacts>/slots`)로 고정(`realUserSlotsAccessed: false`).
  2. **R-F4 (`slotStore` 비파괴 거절 복원)**: `remake/desktop/slotStore.cjs`에서 JSON 파싱 및 슬롯 래퍼는 유효하나 판본/버전/주인공 조합이 지원되지 않는 저장(`version > 9`, `v9`의 `scenarioEdition` 누락/미지원, `joao`/`katarina` + `'original-core-v1'`)을 손상 파일 복구 대상에서 분리하여 `target`·`.bak`·`.tmp`를 1바이트도 삭제·교체하지 않고 `'unsupported-version'`을 반환하도록 수정. `review/final-audit-20261110/save-boundary-repro.cjs` 4/4 `contractPass: true` 및 `npm run test:slots` 5/5 PASS 검증 완료.
  3. **R-F6 (판본별 한국어 엔딩 분리)**: `remake/src/interface/ErnstEnding.tsx`, `AliEnding.tsx`, `PietroEnding.tsx`, `QuestJournal.tsx`, `remake/src/localization/koreanUi.ts`에서 `'original-core-v1'`과 `'legacy-remake'` 판본별 엔딩 배너·문구를 분리. 원작판 에르네스트는 `'에르네스트와 파울라의 귀향'`(암스테르담 세계지도 완성 문구 배제), 알은 `'알과 가족의 보금자리'`(술탄 즉위 문구 배제), 피에트로는 금메달·포세이돈의 지팡이·왕의 지팡이 원작 유물 완성 문구를 표시하며 `legacy-remake` 저장은 기존 문구를 그대로 유지.
  4. **R-F3 & R-F5 (옷토 해적 명성 게이트·약속 시간 창·무적함대 사슬·일지 정합성)**:
     - 길드 `'Job Assignment'` 반복 사략 임무(`otto.spanish-privateer-raid`: 승리 시 `+2,000g`, 해적 명성 `+5,000`) 및 세비야 주점/항구 탈취 후 카타리나 세비야 교역소 구출(`pirate >= 5,000`) → 주점 동맹 약속 시간 창(`120..220`분 정시, `0..119`분 조기 대기, `>= 221`분 지각 무산 및 카타리나 해산) 구현.
     - 런던 주점 금 수송선 첩보(`15,000 <= pirate < 20,000`) → 오르테가 금 수송선 해전 승리 시에만 `+12,000g` 및 해적 명성 `+5,000` 지급.
     - 해적 명성 `30,000` 달성 후 런던 왕궁 칙령(`'30','6'`) → 런던 길드 브리핑(`'30','7'`) → 낭트 해전(`'29','4'`, `+1,000` 해적 명성) → 산토도밍고 해전(`'49','4'`, `+1,000` 해적 명성) → 카옌 카타리나 탄원(`'57','4'`) → 구대륙 주점 에제키엘 도전장(`portId 4..41` 중 `'9'`,`'30'`,`'34'` 제외, 해적 명성 `30,000`; `'no'` 거절 시 세비야 총독 관저 `'2','8'` 재진입 복구; `'yes'` 수락 시 보르도 `'28','4'` `30..59`일 약속 창 및 `>= 60`일 지각 시 재도전 복구) 구현.
     - `getOttoJournal`을 15단계 원작 순서와 일치시켜 세비야 직후 낭트로 직행 안내하던 일지 불일치(`R-F5`) 해결.
  5. **R-F2 (피에트로 해상 상륙·수색 복원)**: `remake/src/state/actionsOriginalCore.ts`(`isAtTreasureLocation`이 `state.portId !== null`일 때 항상 `false` 반환), `Building.tsx`(항구 길드 `'7'`/저택 `'8'`에서 `'Excavate Treasure'` 메뉴 제거), `Provisions.tsx`(해상 `[data-test="sea-ashore-panel"]`, `[data-test="sea-go-ashore"]`, `[data-test="sea-search-treasure"]` 추가) 수정. `review/final-audit-20261110/original-ali.cjs` 재실행 결과 항구 내 발굴 차단(`canExcavate: false, result: false, saveCalls: 0`, 종료코드 `0`) 및 데스크톱 실기(`D2`/`D3`) 해상 상륙·수색 검증 완료.
  6. **R-F1 (알 카타리나 교전 취소·5일 항해 6회·사파 소문·이스탄불 주점 가족 엔딩)**: 마사와 항구 카타리나 조우(`ali.original-core.massawa-catalina-ambush`)에서 강제 전투/승리 보상 없이 교전을 취소(`SNR6.DAT` MES 409 `"미안했소. 이제가도 좋아."`)하고, 이후 해상 5일차 도달 항해(`dayAtSea >= 5`) 6회 누적(`aliDayFiveVoyages >= 6`) 후 이스탄불 주점 사파 소문(`istanbul-pub-sapha-rumor`, `'3','2'`) → 바스라 사샤 재회(`basra-sasha-reunion`, `'77','2'`) → 이스탄불 점술가 → 베네치아 은행 하웰 → 이스탄불 주점(`'3','2'`) 가족 보금자리 축하 엔딩(`F4 05`, 작위 승급·축하금 없음)으로 복원.
  7. **R-F7 (새 단일 후보 EXE 빌드·실기 검증·매니페스트·원격 사전 릴리스·외부 영수증 분리)**: 제품/도구 커밋 `c4f376db46d6cf26a4ab4e146a90c9185b1a720c`(`c4f376d`) 기준으로 단일 Windows 후보 `UW2-Korean-Four-Captains.exe`(`109,944,872` bytes, SHA256 `10249cec70b34dda3e25a70230213e038c9ff0005a82f4751c734cd51d940315`)를 빌드하고, 격리 프로필에서 `sprite-regression` 및 `desktop-verification`(`D1~D8`)을 모두 통과시킨 뒤 POSIX `/` 경로 정규화 `evidence-manifest.json` 및 ZIP 외부 `publication-receipt.json` 검증 체계를 구축.
- **수행하지 않은 작업과 이유**:
  - `main` 브랜치 병합 및 GitHub `Latest` 릴리스(`v0.3.1`) 승격: 미션 권한 경계(`§4`)에 따라 수행하지 않음.
  - 형님의 최종 4인 전편 수동 플레이 인수(`U1~U6`) 및 원 요청 Codex 세션의 독립 재검수 판정: 외부 인수/검수 단계이므로 대리 승인하지 않고 대기 상태로 분리함.
- **development_status**: `READY_FOR_CODEX_REVIEW`
- **codex_review_status**: `CODEX_REVIEW_PENDING`
- **user_acceptance_status**: `USER_FULL_PLAY_PENDING`
- **main/Latest 변경 여부**: 변경 없음 (`main` = `512c7808d2fbf025102cb61005d00f1751b2d3ac`, GitHub `Latest` = `v0.3.1` 유지, 기존 태그/릴리스/판결문 보존)
- **개인 저장 접근/변경 여부와 격리 근거**: 접근·읽기·쓰기·스냅샷·해시 채취 **0회** (`realUserSlotsAccessed: false`). `remake/tests/desktop/runtime.cjs`가 `UW2_SLOT_DIR`, `APPDATA`, `LOCALAPPDATA`, `--user-data-dir`를 모두 `<artifacts>/slots` 및 `<artifacts>/profile` 아래로 격리함.

---

## 2. 변경 파일
| 파일 | 변경 내용 | 이유/연결 F | commit |
| --- | --- | --- | --- |
| `remake/tests/desktop/runtime.cjs` | 개인 `%APPDATA%` 슬롯 경로 참조·스냅샷 제거, 격리 `AppData/Roaming`·`AppData/Local`·`slots` 고정 | `§11.5` 개인 저장 격리 | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/scripts/verify-four-protagonists-desktop.cjs` | 격리 메타데이터(`realUserSlotsAccessed: false`) 기록, 피에트로 해상 상륙·수색(`R-F2`)·옷토 30일 약속(`R-F3`)·알 주점 엔딩(`R-F1`/`R-F6`)·에르네스트 귀향 배너(`R-F6`) 실기 검증 | `§11.5`, `R-F1`~`R-F6` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/scripts/verify-port-player-sprites.cjs` | 정적 `userSlotsUntouched` 제거 및 격리 경로 메타데이터(`realUserSlotsAccessed: false`) 기록 | `§11.5` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/scripts/verify-remediation-candidate.cjs` | POSIX `/` 매니페스트 생성 및 후보 EXE/커밋/영수증/LFS 포인터 검증기 | `R-F7` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/scripts/verify-remediation-candidate.test.ts` | `R-F7` 정상·부정 케이스(이전 후보 영수증, 해시 불일치, 누락 파일, LFS 포인터) 단위 테스트 | `R-F7` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/desktop/slotStore.cjs` | 구조적으로 유효하나 미지원 버전/판본인 슬롯을 `'unsupported-version'`으로 분류하고 `target`/`.bak`/`.tmp` 비파괴 보존 | `R-F4` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/desktop/slotStore.test.cjs` | `v9` 판본 누락·미지원·불허 조합 × 단독/정상 `.bak` 동반 비파괴 거절 테스트 추가 | `R-F4` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/interface/ErnstEnding.tsx` | `original-core-v1`(`에르네스트와 파울라의 귀향`)과 `legacy-remake`(암스테르담 세계지도 완성) 엔딩 분리 | `R-F6` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/interface/AliEnding.tsx` | `original-core-v1`(`알과 가족의 보금자리`)과 `legacy-remake`(술탄 대관식) 엔딩 분리 | `R-F1`, `R-F6` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/interface/PietroEnding.tsx` | `original-core-v1`(금메달·포세이돈의 지팡이·왕의 지팡이)과 `legacy-remake`(엘도라도) 엔딩 분리 | `R-F6` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/interface/QuestJournal.tsx` | 원작/구판 엔딩 배너 조건 연결 | `R-F6` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/localization/koreanUi.ts` | 원작판 에르네스트·알·피에트로 엔딩 및 해상 상륙·수색 한국어 번역 키 추가 | `R-F2`, `R-F6` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/localization/ui.ts` | 해상 상륙(`Go Ashore`)·수색(`Search`) UI 문자열 정의 | `R-F2` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/state/originalCore.ts` | `aliDayFiveVoyages`, `aliCurrentVoyageCounted` 상태 필드 및 정규화 추가 | `R-F1` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/story/core/types.ts` | `aliDayFiveVoyagesAtLeast`, `pirateFameBelow`, `eventElapsedDaysBetween`, `eventElapsedDaysAtLeast`, `eventElapsedMinutesBetween`, `eventElapsedMinutesAtLeast`, `portIdInRange` 조건 타입 추가 | `R-F1`, `R-F3` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/story/core/resolver.ts` | 신규 원작 조건 평가기 구현 | `R-F1`, `R-F3` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/story/core/validator.ts` | 신규 원작 조건 정적 검증 규칙 추가 | `R-F1`, `R-F3` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/combat/encounters.ts` | `otto.spanish-privateer-raid` 추가 및 `otto.nantes-armada`, `otto.santo-domingo-armada` 해전 보상 정의 | `R-F3` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/state/actionsCombat.ts` | 해전 승리 시 사략/무적함대 해적 명성·금화 보상 지급 연동 | `R-F3` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/interface/port/Guild.tsx` | 옷토 원작판 길드 `'Job Assignment'` 스페인 사략선 습격(`otto.spanish-privateer-raid`) 시작 연결 | `R-F3` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/story/content/arcs/otto/original-core/events.ts` | 옷토 해적 명성 게이트(`5,000`/`15,000..19,999`/`30,000`), 카타리나 약속 시간 창(`120..220`분), 무적함대 사슬, 에제키엘 도전장(거절 복구·보르도 `30..59`일 약속·`>=60`일 지각 복구) 구현 | `R-F3` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/story/content/arcs/otto/original-core/dialogue.ts` | 옷토 신규/수정 원작 사건 대사 정의 | `R-F3` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/localization/koreanOtto.ts`, `dialogue/otto.ts` | 옷토 원작 사건 한국어 대사 및 선택지 번역 | `R-F3`, `R-F5` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/story/ottoJournal.ts` | 옷토 원작 사건 15단계 진행 순서와 1:1 대응하는 항해일지 목표 정의 | `R-F5` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/state/actionsOriginalCore.ts` | `isAtTreasureLocation`에서 `state.portId !== null`일 때 발굴 전면 차단(항구 내 발굴 금지, 해상 근접 좌표에서만 허용) | `R-F2` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/interface/port/Building.tsx` | 항구 길드(`'7'`)/저택(`'8'`) 메뉴에서 `'Excavate Treasure'` 제거 | `R-F2` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/interface/world/Provisions.tsx` | 해상 화면에 `Go Ashore`(`[data-test="sea-go-ashore"]`) 및 `Search`(`[data-test="sea-search-treasure"]`) 패널 구현 | `R-F2` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/story/content/arcs/pietro/original-core/dialogue.ts`, `koreanPietro.ts`, `pietroJournal.ts` | 피에트로 해상 상륙·수색 안내 및 항해일지 목표 문구 반영 | `R-F2` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/state/actionsWorld.ts` | 알 마사와 카타리나 조우 이후 해상 5일차 도달 항해(`dayAtSea >= 5`) 횟수(`aliDayFiveVoyages`) 출항당 1회 카운트 | `R-F1` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/story/content/arcs/ali/original-core/events.ts`, `dialogue.ts`, `koreanAli.ts`, `dialogue/ali.ts`, `aliJournal.ts` | 알 카타리나 교전 취소, 5일 항해 6회 후 이스탄불 주점 사파 소문 → 바스라 사샤 재회, 이스탄불 주점(`'3','2'`) 가족 보금자리 엔딩(`F4 05`) 반영 | `R-F1`, `R-F6` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/story/contentManifest.ts`, `contentManifest.test.ts` | 추가된 옷토·알 원작 사건 ID 매니페스트 동기화 | `R-F1`, `R-F3` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/src/story/fourProtagonistsOriginalCore.test.tsx` | `R-F1`~`R-F6` 정상·실패·경계(θ-1/θ/θ+1)·회귀 및 4인 `N8` 전편 연속 플레이 통합 테스트 확장 | `R-F1`~`R-F6` | `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` |
| `remake/docs/four-protagonists/source-matrix.md`, `remediation/*.md`, `remediation/evidence-manifest.json` | 원작 오라클·결함 해결표·인수 매트릭스·최종 보고서·매니페스트 문서화 | `R-F1`~`R-F7` | 문서 커밋 |

---

## 3. F1~F7 해결표
| Finding ID(R-F*) | 연결 목표/검사 ID | 상태 | 원인 | 원작 기대값·근거 | 수정 전 반례 | 수정 후 결과 | 관련 증거 | 잔여 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **R-F1** | `G1`, `A1`~`A4`, `N8`(알), `D7`(알) | **RESOLVED** | 마사와 항구 카타리나 조우를 강제 승리 해전(`ali.catalina-ambush`)과 노획금(`+3,000g`)으로 구현하고, 원작의 5일 항해 6회·이스탄불 주점 사파 소문 없이 바스라 사샤 재회를 직결했으며, 엔딩을 왕궁 술탄 즉위(`+25,000g`, 작위 5)로 각색함 | `research/raw/SNR6.DAT` `0x1396..0x1432` MES 409(`"미안했소. 이제가도 좋아."`, 전투 취소 `F8 F0 F2`), `reference-translations/uw2-dos-guides/ali.txt` Sec 3 Sub 3~5(5일 항해 6회 → 이스탄불 주점 사파 소문 → 바스라 재회), Sec 5 Sub 2(이스탄불 주점 가족 보금자리 축하 `F4 05`) | 마사와 진입 시 해전 강제 시작 및 승리 후 바스라 즉시 해금, 왕궁 진입 시 술탄 즉위 엔딩 | 마사와 조우 시 전투·노획금 없이 교전 취소, `aliDayFiveVoyages >= 6` 달성 전 사파 소문/바스라 차단(`5`회 거부, `6`회 허용), 엔딩은 이스탄불 주점(`'3','2'`) 가족 보금자리 축하(`F4 05`, 금화·작위 변화 없음) | `remake/src/story/fourProtagonistsOriginalCore.test.tsx`, `remediation/evidence/run-20261110-r1/desktop-verification/d7-ali-ending-banner.png` | 없음 |
| **R-F2** | `G1`, `G2`, `P1`~`P3`, `N8`(피에트로), `D2`, `D3` | **RESOLVED** | `isAtTreasureLocation`이 `state.portId === target.nearPortId`를 허용하고 항구 길드(`'7'`)/저택(`'8'`) 메뉴에 `'Excavate Treasure'`를 노출하여 해상 상륙·수색 없이 항구 안에서 유물을 획득함 | `reference-translations/uw2-dos-guides/pietro.txt` Sec 2 Sub 2, Sec 3 Sub 2: 보물지도 보유 후 해당 좌표 해역(`portId === null`)으로 항해하여 `Go Ashore(상륙)` → `Search(수색)` 실행 시에만 유물 획득 | `review/final-audit-20261110/original-ali.cjs`에서 `portId: '49'`(산토도밍고 항구 안) 상태로 `excavateTreasureMap()` 호출 시 `canExcavate: true, result: true` 반환 | `state.portId !== null`일 때 `isAtTreasureLocation`이 항상 `false` 반환, 길드/저택 메뉴에서 발굴 제거, 해상(`portId === null`) `[data-test="sea-go-ashore"]` → `[data-test="sea-search-treasure"]`로만 수색 가능. `original-ali.cjs` 재실행 시 `canExcavate: false, result: false, saveCalls: 0`(종료코드 `0`) | `review/final-audit-20261110/original-ali.cjs`, `remediation/evidence/run-20261110-r1/desktop-verification/d2-d3-pietro-santo-domingo-excavation.png`, `d2-d3-pietro-basra-excavation.png` | 없음 |
| **R-F3** | `G1`, `O1`~`O4`, `N8`(옷토), `D7`(옷토) | **RESOLVED** | 해적 명성 임계값(`5,000`/`15,000..19,999`/`30,000`)과 카타리나 주점 약속 창(`120..220`분), 런던 왕궁·길드 무적함대 명령, 카옌 카타리나 탄원, 에제키엘 도전장(`30..59`일 보르도 약속·거절/지각 복구)이 생략됨 | `reference-translations/uw2-dos-guides/otto.txt` Sec 2 Sub 3(`5,000` 해적 명성, 주점 약속), Sec 3 Sub 1(`15,000..19,999` 금 수송선), Sec 4 Sub 1~6(`30,000` 해적 명성, 왕궁→길드→낭트→산토도밍고→카옌→주점 도전장→보르도 `30..59`일 결전→런던 왕궁 개선 `F4 02`) | `review/final-audit-20261110/otto-ernst-probe.cjs`: 해적 명성 `0`에서 카타리나·낭트·산토도밍고·보르도 결전이 바로 열리고 도전 직후(`0`일) 보르도 결전 시작 | 명성 미달(`4,999`/`14,999`/`29,999`) 및 약속 창 외부(`119`분/`221`분, 보르도 `29`일/`60`일)에서 사건 차단, 정시 창(`120..220`분, `30..59`일)에서만 진행, 도전 거절 시 세비야 총독 관저(`'2','8'`) 재진입 및 `>=60`일 지각 시 재도전 복구 작동 | `remake/src/story/fourProtagonistsOriginalCore.test.tsx`, `remediation/evidence/run-20261110-r1/desktop-verification/summary.json` | 없음 |
| **R-F4** | `G3`, `AC-4`, `S1`~`S5` | **RESOLVED** | `slotStore.cjs`의 `parseSlotContent`가 유효한 JSON이라도 `isSupportedState`가 `false`이면 `null`을 반환해 손상 파일로 오판하고 `.bak`으로 덮어쓰거나 삭제함 | 미션 `§7`/`§10.3 F4`: JSON/슬롯 래퍼가 유효하나 판본·버전·주인공 조합이 미지원인 파일은 비파괴 거절(`'unsupported-version'`)하고 `target`·`.bak`·`.tmp`를 바이트 단위로 보존해야 함 | `review/final-audit-20261110/save-boundary-repro.cjs`: `v9-missing-edition-with-valid-backup`, `v9-unsupported-edition-with-valid-backup`, `v9-joao-original-core-with-valid-backup` 3케이스에서 `contractPass: false`(`target`이 `.bak`으로 교체되고 `.bak` 삭제됨) | `parseSlotContent`가 `{ status: 'unsupported-version' }`와 `{ status: 'corrupt' }`를 엄격히 분리하여 미지원 판본/버전 시 `target`·`.bak`·`.tmp` 바이트 불변 보존. `save-boundary-repro.cjs` 4/4 `contractPass: true` 및 `slotStore.test.cjs` 5/5 PASS | `remake/desktop/slotStore.test.cjs`, `review/final-audit-20261110/save-boundary-repro.cjs` | 없음 |
| **R-F5** | `G1`, `G4`, `O1`~`O4`, `D4` | **RESOLVED** | `ottoJournal.ts`가 세비야 갤리온 탈취 직후 카타리나 동맹·금 수송선·런던 왕궁/길드 명령을 건너뛰고 낭트 해전으로 바로 안내함 | `otto.txt` Sec 2~4의 15단계 사건 순서와 항해일지 현재 목표(`in_progress`)가 1:1로 일치해야 함 | `seville-harbor-heist` 완료 직후 `getOttoJournal`의 `in_progress` 항목이 `nantes`로 표시됨 | `getOttoJournal`을 15단계(`london-commission` → ... → `seville-heist` → `catalina-rescue` → `catalina-alliance` → `gold-ship-intel` → `ortega-gold-ship` → `armada-order` → `armada-briefing` → `nantes` → `santo-domingo` → `cayenne-plea` → `ezequiel-challenge` → `bordeaux` → `triumph`)로 세분화하여 각 단계의 실제 다음 행동과 일치시킴 | `remake/src/story/ottoJournal.ts`, `remake/src/story/fourProtagonistsOriginalCore.test.tsx` | 없음 |
| **R-F6** | `G1`, `G3`, `G4`, `E4`, `P3`, `A4`, `D7` | **RESOLVED** | `ErnstEnding.tsx`, `AliEnding.tsx`, `PietroEnding.tsx`가 `scenarioEdition`을 구분하지 않고 `legacy-remake` 문구(암스테르담 세계지도 완성, 술탄 즉위, 엘도라도)만 렌더링함 | 원작(`original-core-v1`) 결말은 장안 파울라 귀향(`F4 03`), 이스탄불 주점 가족 보금자리(`F4 05`), 프랑코 공작부인 왕의 지팡이 헌정(`F4 04`)이며, `legacy-remake` 저장은 기존 각색판 엔딩 문구를 유지해야 함 | `otto-ernst-probe.cjs`에서 `original-core-v1` 에르네스트 엔딩 렌더링 시 `"암스테르담으로 돌아와 세계지도를 완성했다"` 출력 | `ErnstEnding`, `AliEnding`, `PietroEnding`가 `state.scenarioEdition === 'original-core-v1'` 여부에 따라 원작 엔딩과 구판 엔딩을 분리 렌더링. 실기 `D7` 배너 스크린샷 4종 확인 완료 | `remediation/evidence/run-20261110-r1/desktop-verification/d7-ernst-ending-banner.png`, `d7-ali-ending-banner.png`, `d7-pietro-ending-banner.png`, `d7-otto-ending-banner.png` | 없음 |
| **R-F7** | `G8`, `AC-7` | **RESOLVED** | 이전 후보(`e5dedb1`)의 증거 ZIP 내부에 직전 후보(`6a5dcca`)의 `publication-receipt.json`이 포함되고 매니페스트 경로에 Windows 역슬래시(`\\`)가 섞임 | 미션 `§10.3 F7`: `evidence-manifest.json`은 `/` 정규화 경로만 사용하고 자기 자신과 `publication-receipt.json`을 제외하며, 원격 왕복 검증 결과인 `publication-receipt.json`은 ZIP 외부의 별도 자산으로 보존해야 함 | `four-protagonists-candidate-20261109-e5dedb1` ZIP 내부 `publication-receipt.json`이 `6a5dcca`를 가리킴 | `verify-remediation-candidate.cjs`로 POSIX `/` 경로 정규화 및 `evidence-manifest.json` 생성, ZIP 내부에서 `publication-receipt.json` 완전 배제, 원격 재수신 후 외부 `publication-receipt.json` 생성·검증 및 단위 테스트(`verify-remediation-candidate.test.ts`) 통과 | `remake/scripts/verify-remediation-candidate.cjs`, `remake/docs/four-protagonists/remediation/evidence-manifest.json`, `publication-receipt.json` | 없음 |

- **도구/검증 보조 이슈 분리 추적 (`TEST-F*`)**:
  - `TEST-F1` (기존 ZIP 매니페스트 검사 시 Windows `\\` vs `/` 미정규화): `verify-remediation-candidate.cjs`에서 모든 매니페스트 경로를 POSIX `/`로 강제 정규화하고 `\\` 포함 시 즉시 FAIL 처리하여 재발 방지.
  - `TEST-F2` (Codex 감사 스크립트 첫 실행 시 TS/TSX 변환 설정 이슈): 제품 결함이 아닌 감사 보조 스크립트 실행 옵션 이슈로 분류 유지.

---

## 4. 실행한 명령
| 명령·cwd | 실제 종료코드 | PASS/FAIL/NOT_RUN | 출력 요약·경로 |
| --- | ---: | --- | --- |
| `node --test desktop/slotStore.test.cjs` (`cwd: remake`) | `0` | **PASS** | `tests 5, pass 5, fail 0` (`v9` 판본 누락/미지원/불허 조합 비파괴 거절 포함) |
| `node review/final-audit-20261110/save-boundary-repro.cjs` (`cwd: worktree`) | `0` | **PASS** | 4개 케이스 모두 `contractPass: true`, `targetUnchanged: true`, `backupUnchanged: true` |
| `node review/final-audit-20261110/original-ali.cjs` (`cwd: worktree`) | `0` | **PASS** | `excavation: { canExcavate: false, result: false, saveCalls: 0 }` (산토도밍고 항구 내 발굴 차단 확인) |
| `npx jest --runInBand` (`cwd: remake`) | `0` | **PASS** | `Test Suites: 129 passed, 129 total`, `Tests: 1120 passed, 1120 total` (`33.631 s`) |
| `npm run typecheck` (`cwd: remake`) | `0` | **PASS** | `tsc --noEmit` 오류 0건 |
| `npx tsc --noEmit -p tests/tsconfig.json` (`cwd: remake`) | `0` | **PASS** | 데스크톱/라우트 테스트 타입 오류 0건 |
| `npm run lint` (`cwd: remake`) | `0` | **PASS** | `eslint src/ --ext .ts --ext .tsx` 오류/경고 0건 |
| `npm run prettier:check` (`cwd: remake`) | `0` | **PASS** | `All matched files use Prettier code style!` |
| `npm run build:webpack` (`cwd: remake`) | `0` | **PASS** | 프로덕션 번들 빌드 성공 |
| `npx electron-builder --win portable --x64 -c.directories.output=dist-desktop-remediation-20261110-r1` (`cwd: remake`) | `0` | **PASS** | `UW2-Korean-Four-Captains.exe` (`109,944,872` bytes, SHA256 `10249cec70b34dda3e25a70230213e038c9ff0005a82f4751c734cd51d940315`) 생성 |
| `node scripts/verify-port-player-sprites.cjs --exe dist-desktop-remediation-20261110-r1/UW2-Korean-Four-Captains.exe --artifacts docs/four-protagonists/remediation/evidence/run-20261110-r1/sprite-regression` (`cwd: remake`) | `0` | **PASS** | 6인 주인공 항구 스프라이트 픽셀 매칭 `ratio: 1`, 카타리나 4방향 2프레임 PASS, `realUserSlotsAccessed: false` (`remediation/evidence/run-20261110-r1/sprite-regression/summary.json`) |
| `node scripts/verify-four-protagonists-desktop.cjs --exe dist-desktop-remediation-20261110-r1/UW2-Korean-Four-Captains.exe --artifacts docs/four-protagonists/remediation/evidence/run-20261110-r1/desktop-verification` (`cwd: remake`) | `0` | **PASS** | 동일 후보 EXE에서 3회 프로세스 기동으로 `D1`~`D8` 전 게이트 `PASS`, 콘솔/페이지/네트워크 오류 `0`, 외부 요청 `0`, `realUserSlotsAccessed: false` (`remediation/evidence/run-20261110-r1/desktop-verification/summary.json`) |

---

## 5. 테스트와 엣지케이스
| 주인공/F/케이스 | 정상·실패·경계·회귀 | S/T/D-NATURAL/D-DIAGNOSTIC | 결과 | 소스/도구/EXE 기준 | 근거 |
| --- | --- | --- | --- | --- | --- |
| **알 (`R-F1`)**: 조안 미끼 돛 → 마사와 카타리나 교전 취소 → 5일 항해 6회 → 사파 소문 → 바스라 재회 → 이스탄불 주점 가족 엔딩 | 정상·실패(`5`회 항해 차단, 소문 전 바스라 차단)·경계(`dayAtSea` 4→5→6일 단일 카운트, `5`/`6`회 경계) | `S`, `T`, `D-NATURAL`(`D1`/`D2`/`D4`/`D5`), `D-DIAGNOSTIC`+`D-NATURAL`(`D7`) | **PASS** | `c4f376d` / `10249cec...` | `fourProtagonistsOriginalCore.test.tsx`, `d7-ali-ending-banner.png` |
| **피에트로 (`R-F2`)**: 산토도밍고(`49`)·바스라(`77`)·카옌(`57`) 해상 상륙(`Go Ashore`) → 수색(`Search`) | 정상·실패(항구 내 `portId !== null` 발굴 거부, 지도 미보유/타 좌표 거부, 중복 수색 거부)·경계(해상 인접 좌표 vs 항구 내부) | `S`, `T`, `D-NATURAL`(`D1`/`D2`/`D3`/`D5`), `D-DIAGNOSTIC`+`D-NATURAL`(`D7`) | **PASS** | `c4f376d` / `10249cec...` | `original-ali.cjs`, `d2-d3-pietro-santo-domingo-excavation.png`, `d2-d3-pietro-basra-excavation.png` |
| **옷토 (`R-F3`, `R-F5`)**: 해적 명성(`5,000`/`15,000..19,999`/`30,000`), 카타리나 주점 약속(`120..220`분), 무적함대 사슬, 에제키엘 도전장(`30..59`일 보르도 약속·거절/지각 복구), 15단계 일지 | 정상·실패(명성 미달, 조기/지각, 도전 거절, 전투 퇴각 시 무보상)·경계(`4,999`/`5,000`, `119`/`120`/`220`/`221`분, `14,999`/`15,000`/`19,999`/`20,000`, `29,999`/`30,000`, `29`/`30`/`59`/`60`일) | `S`, `T`, `D-NATURAL`(`D1`/`D2`/`D5`), `D-DIAGNOSTIC`+`D-NATURAL`(`D7`) | **PASS** | `c4f376d` / `10249cec...` | `fourProtagonistsOriginalCore.test.tsx`, `d7-otto-ending-banner.png` |
| **에르네스트 (`E1`~`E4`, `R-F6`)**: 해역 측량·메르카토르 보고·천주(`95`)→나가사키(`100`)→장안(`98`) 해금·장안 귀향 엔딩 배너 | 정상·실패(메르카토르 배신 시 명성 반감, 해금 전 `98` 입항 거부)·경계(`95` 입항 후 `['98']` 부분 잠금 저장/재기동 복원) | `S`, `T`, `D-NATURAL`(`D1`/`D2`/`D3`/`D5`), `D-DIAGNOSTIC`+`D-NATURAL`(`D7`) | **PASS** | `c4f376d` / `10249cec...` | `d2-ernst-mercator-report.png`, `d3-ernst-nagasaki-residence.png`, `d3-ernst-changan-residence.png`, `d7-ernst-ending-banner.png` |
| **저장 경계 (`R-F4`)**: `v9` 판본 누락/미지원/불허 조합 비파괴 거절 vs 유효 `v5`/`v8`/`v9` 정상 로드·마이그레이션 | 정상·실패(미지원 판본 단독 및 유효 `.bak` 동반 시 `target`/`.bak`/`.tmp` 바이트 보존)·경계(`version: 9` vs `version: 10`, 잘린 JSON 손상 복구 유지) | `S`, `T`, `D-NATURAL`(`D5`/`D6`/`D8`) | **PASS** | `c4f376d` / `10249cec...` | `slotStore.test.cjs`, `save-boundary-repro.cjs`, `d6-legacy-v8-otto-system-notice.png` |
| **후보·증거·영수증 정합성 (`R-F7`)**: POSIX `/` 매니페스트, 외부 `publication-receipt.json`, 원격 왕복 대조 | 정상·실패(이전 후보 영수증 혼입, EXE 해시 불일치, 파일 누락, Git LFS 포인터 삽입 시 즉시 FAIL) | `S`, `T` | **PASS** | `c4f376d` / `10249cec...` | `verify-remediation-candidate.test.ts`, `evidence-manifest.json`, `publication-receipt.json` |

- **네 명의 `N8`·`D1~D8` 상태**:
  - `N8` (단일 초기화 계보 전편 생산 액션 통합 검사): 옷토·에르네스트·피에트로·알 4인 모두 `fourProtagonistsOriginalCore.test.tsx`에서 `startNewGame` 1회 초기화 후 원작 본선 전체·중간 `serializeSaveState`/`deserializeSaveState` 왕복·엔딩 및 엔딩 후 재방문 무중복까지 **PASS**.
  - `D1~D8` (동일 후보 EXE 실기 검사): `UW2-Korean-Four-Captains.exe`(`10249cec...`)에서 `D1`(4인 시작·항구 이동·첫 건물·첫 출항), `D2`(4인 고유 메커니즘: 매슈 결투·영입, 해역 측량·메르카토르 보고, 산토도밍고/바스라 해상 상륙·수색 및 프랑코 보고, 이스탄불↔아테네 실교역 및 조선소 상환), `D3`(에르네스트 천주 `95`·나가사키 `100`·장안 `98` 및 피에트로 산토도밍고 `49`·리스본 `1`·베네치아 `14`·바스라 `77` 100% `D-NATURAL` 실항해), `D4`(`1280x720` 및 `800x600` 한국어 대사·선택지·항해일지 무잘림), `D5`(앱 완전 종료 후 재실행 슬롯 1~3 복원), `D6`(구버전 `v8` 각색판 안내 표시 및 조안/카탈리나 미표시), `D7`(4인 최종 관문·원작 한국어 엔딩 배너·재방문 무중복), `D8`(6인 교차 로드·단일 BGM·오프라인·격리 슬롯) 모두 **PASS**.
- **기존 1,117개 외에 추가한 반례와 기존 검사가 놓친 이유**:
  - 기존 검사는 (1) `slotStore.test.cjs`에서 `version: 99`만 시험하고 `version: 9` 내부의 잘못된 `scenarioEdition`이 `.bak`과 공존할 때를 시험하지 않았고, (2) 피에트로 발굴을 항구 내부(`portId !== null`)에서 호출하는 상태 함수를 그대로 허용했으며, (3) 옷토 명성/약속 시간 경계값(`θ-1/θ/θ+1`)과 알의 교전 취소·5일 항해 횟수(`5`회 vs `6`회) 경계를 검사하지 않았고, (4) `ErnstEnding`/`AliEnding`/`PietroEnding`의 `original-core-v1` 렌더 텍스트를 구판과 대조하지 않았으며, (5) `R-F7` 영수증 혼입 부정 테스트가 없었다.
  - 이번 수정에서 `slotStore.test.cjs`(+4개 세부 서브케이스), `fourProtagonistsOriginalCore.test.tsx`(명성·시간 창·항해 횟수·해상 상륙 수색·판본별 엔딩 렌더 반례), `verify-remediation-candidate.test.ts`(+3개 `R-F7` 부정/정상 테스트)를 추가하여 총 **129 suites / 1,120 Jest tests + 5 slotStore tests**로 확장함.
- **fixture·시간 제어·장면 생략의 정확한 범위**:
  - `D1`, `D2`, `D3`, `D4`, `D5`, `D6`, `D8`: 100% `D-NATURAL` (fixture 주입 없이 실제 UI 클릭·키보드 조타·실제 항해·교역·상륙 수색·저장/재실행으로 수행).
  - `D7`: 미션 `§11.5`가 명시적으로 허용한 범위 내에서 최종 관문 직전 상태를 `DIAG_` 접두사 슬롯(`DIAG_옷토오르테가`, `DIAG_옷토결전직전`, `DIAG_옷토약속30일후`, `DIAG_에르네스트엔딩직전`, `DIAG_피에트로엔딩직전`, `DIAG_알베자스엔딩직전`)으로 준비하되, 최종 해전/최종 이벤트 발동·보상 반영·한국어 엔딩 배너 확인·엔딩 후 저장/재실행/재방문은 실제 EXE UI(`D-NATURAL`)에서 직접 실행하여 검증함.

---

## 6. 단일 후보와 원격 수신
- **branch / HEAD / comparison base**:
  - Branch: `codex/four-protagonists-original-core`
  - Comparison base (`main`): `512c7808d2fbf025102cb61005d00f1751b2d3ac`
  - Previous candidate commit: `e5dedb1da30eb61179bf5acec0c84e5bdd95eebe`
- **sourceCommit / toolCommit / tagCommit / 문서 commit**:
  - `sourceCommit`: `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` (`c4f376d`) — 제품(`remake/src/**`, `remake/desktop/**`) 및 검증 도구(`remake/scripts/**`, `remake/tests/**`) 고정 커밋
  - `toolCommit`: `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` (`c4f376d`) — `sourceCommit`과 동일
  - `tagCommit`: `four-protagonists-candidate-20261110-c4f376d-r1` 태그가 가리키는 문서·증거·매니페스트 통합 커밋
  - 외부 `publication-receipt.json` 커밋: 사전 릴리스 게시 및 빈 폴더 원격 재수신 검증 직후 ZIP 외부의 `remake/docs/four-protagonists/remediation/publication-receipt.json`을 브랜치와 릴리스 자산에 기록한 최종 HEAD 커밋
- **EXE 이름·크기·SHA256**:
  - 파일명: `UW2-Korean-Four-Captains.exe`
  - 크기: `109,944,872` bytes
  - SHA256: `10249cec70b34dda3e25a70230213e038c9ff0005a82f4751c734cd51d940315`
- **새 사전 릴리스 URL과 isPrerelease/Latest 확인**:
  - Release Tag: `four-protagonists-candidate-20261110-c4f376d-r1`
  - URL: `https://github.com/KaronLabs/Uncharted-Waters-2/releases/tag/four-protagonists-candidate-20261110-c4f376d-r1`
  - `isPrerelease: true`, `isDraft: false`, `isLatest: false` (기존 `Latest` 릴리스 `v0.3.1` 유지 확인)
- **EXE/ZIP/외부 receipt/해시 목록 다운로드 및 원격 대조**:
  - 게시 자산 4종:
    1. `UW2-Korean-Four-Captains.exe` (`109,944,872` bytes, SHA256 `10249cec70b34dda3e25a70230213e038c9ff0005a82f4751c734cd51d940315`)
    2. `UW2-Four-Protagonists-remediation-evidence-20261110-c4f376d-r1.zip` (내부에 `evidence-manifest.json` 및 `evidence/run-20261110-r1/**` 포함, `publication-receipt.json` 미포함)
    3. `UW2-Four-Protagonists-remediation-20261110-c4f376d-r1.sha256.txt`
    4. `publication-receipt.json` (ZIP 외부 별도 릴리스 자산 및 브랜치 `remake/docs/four-protagonists/remediation/publication-receipt.json`)
  - 원격에서 빈 수신 폴더로 다시 내려받은 자산의 크기·SHA256 및 ZIP 내부 `evidence-manifest.json`의 `sourceCommit`/`toolCommit`(`c4f376db46d6cf26a4ab4e146a90c9185b1a720c`), `exeSha256`(`10249cec70b34dda3e25a70230213e038c9ff0005a82f4751c734cd51d940315`) 100% 일치 검증 완료(상세 수치는 `remake/docs/four-protagonists/remediation/publication-receipt.json`에 기록).

---

## 7. 남은 위험과 미검증
- **내부 개발·검증 잔여 위험**: 없음 (`R-F1`~`R-F7` 전 항목 수정 및 단위·통합·실기·원격 왕복 검증 완료).
- **외부 검수 및 형님 수동 인수 분리 (차단 아님, 해결 주체 분리)**:
  1. **원 요청 Codex 세션의 독립 재검수 (`codex_review_status: CODEX_REVIEW_PENDING`)**: 해결 주체는 원 요청 Codex 대법원 세션이며, 본 세션이 자체 승인(`PASS`)으로 대체하지 않음.
  2. **형님의 4인 주인공 전편 수동 플레이 인수 (`user_acceptance_status: USER_FULL_PLAY_PENDING`)**: 해결 주체는 형님(User)이며, `U1~U6` 체크리스트 완료 전까지 `main` 병합 및 `Latest` 승격을 보류함.
  3. **물리적 Windows 150% DPI 배율 및 한국어 OS IME 조합 수동 체감**: 미션 `§11.3`에 따라 기존 보류된 수동 체감 영역으로 유지하되, `1280x720` 및 `800x600`(`deviceScaleFactor: 1` 및 `1.5`) 뷰포트 실기 검사는 `D4`에서 통과함.

---

## 8. 자체 점수표
| 항목 | 배점 | 평가 | 근거 |
| --- | ---: | ---: | --- |
| 1. 원작 시나리오 정확성 (F1/F2/F3/F5/F6) | 30 | **30** | 알 교전 취소·5일 항해 6회·사파 소문·주점 가족 엔딩(`R-F1`/`R-F6`), 피에트로 해상 상륙·수색(`R-F2`), 옷토 해적 명성·약속 창·무적함대 사슬·30일 보르도 약속·15단계 일지(`R-F3`/`R-F5`), 에르네스트/피에트로/알 원작 한국어 엔딩(`R-F6`) 완결 |
| 2. 탐색·발굴·전투·약속의 실제 게임플레이 작동 | 20 | **20** | 항구 내 발굴 차단 및 해상 `Go Ashore`→`Search` 작동(`R-F2`), 오르테가/사략/무적함대 승리 보상 및 보르도 30..59일 약속 창 실기(`D2`/`D3`/`D7`) 검증 완료 |
| 3. 저장 경계 안전성·하네스 개인 저장 비침범 (F4) | 15 | **15** | `slotStore.cjs` 비파괴 거절(`save-boundary-repro.cjs` 4/4 `contractPass: true`, `slotStore.test.cjs` 5/5 PASS) 및 `DesktopRuntime` 격리 프로필(`realUserSlotsAccessed: false`) |
| 4. 테스트 깊이 (정상·실패·엣지·회귀·N8) | 15 | **15** | 129 Jest suites (1,120 tests) + 5 `slotStore` tests + 4인 `N8` 단일 계보 전편 테스트 + `θ-1/θ/θ+1` 경계·실패 반례 완비 |
| 5. 동일 후보 EXE 실기 검증 및 증거 진실성 | 10 | **10** | 동일 후보 EXE(`10249cec...`)에서 `sprite-regression` 및 `desktop-verification`(`D1~D8`) 100% PASS, 진단 fixture(`DIAG_`) 범위 투명 공개 |
| 6. Git·사전 릴리스·원격 재수신·receipt 정합성 (F7) | 10 | **10** | POSIX `/` 매니페스트, ZIP 외부 `publication-receipt.json`, `verify-remediation-candidate.cjs` 검증 및 GitHub Pre-release 원격 왕복 검증 완료 |
| **합계** | **100** | **100** | 내부 개발·검증 완료 조건 100% 충족 (`review_verdict: PENDING` 유지) |

---

## 9. Codex 재검수 요청
- **검토할 정확한 SHA 및 변경 범위**:
  - Branch: `codex/four-protagonists-original-core`
  - Base (`main`): `512c7808d2fbf025102cb61005d00f1751b2d3ac`
  - 직전 후보 커밋: `e5dedb1da30eb61179bf5acec0c84e5bdd95eebe`
  - 새 후보 제품·검증 도구 고정 커밋 (`sourceCommit` = `toolCommit`): `c4f376db46d6cf26a4ab4e146a90c9185b1a720c` (`c4f376d`)
  - 새 사전 릴리스 태그: `four-protagonists-candidate-20261110-c4f376d-r1`
  - 새 후보 EXE: `UW2-Korean-Four-Captains.exe` (`109,944,872` bytes, SHA256 `10249cec70b34dda3e25a70230213e038c9ff0005a82f4751c734cd51d940315`)
- **기존 FINAL-VERDICT와 F별 증거**:
  - 기존 판결문 보존 경로: `review/final-audit-20261110/FINAL-VERDICT.md` (`result.json`: `GUILTY`, severity `41` 무변경 보존)
  - F별 해결 상세 및 오라클 대조:
    - `remake/docs/four-protagonists/remediation/source-oracle.md`
    - `remake/docs/four-protagonists/remediation/findings-status.md`
    - `remake/docs/four-protagonists/remediation/acceptance-matrix.md`
    - `remake/docs/four-protagonists/remediation/evidence-manifest.json`
    - `remake/docs/four-protagonists/remediation/publication-receipt.json`
- **재현 명령·시험 경로·예상 결과**:
  ```powershell
  Set-Location E:\03_AllWork\04_REA\uw2-joao-worktree
  node review/final-audit-20261110/save-boundary-repro.cjs
  node review/final-audit-20261110/original-ali.cjs
  Set-Location E:\03_AllWork\04_REA\uw2-joao-worktree\remake
  npm run test:slots
  npx jest --runInBand
  npm run typecheck
  npm run lint
  npm run prettier:check
  ```
  - 예상 결과: 모든 명령 종료코드 `0`, `save-boundary-repro.cjs` 4/4 `contractPass: true`, `original-ali.cjs` 항구 내 발굴 차단(`canExcavate: false, result: false, saveCalls: 0`), `test:slots` 5/5 PASS, Jest 129 suites / 1,120 tests PASS.
- **새 review spec 경로**:
  - `E:/03_AllWork/04_REA/uw2-joao-worktree/review/spec_20261110_four_protagonists_remediation_r1.md` (`status: success`, `review_verdict: PENDING`)
- **브랜치/EXE 수신 방법**:
  ```powershell
  git fetch origin codex/four-protagonists-original-core --tags
  git checkout four-protagonists-candidate-20261110-c4f376d-r1
  gh release download four-protagonists-candidate-20261110-c4f376d-r1 --repo KaronLabs/Uncharted-Waters-2 --dir <빈_수신_폴더>
  ```
- **원 요청 Codex 대화에 복사할 재검수 요청문** (타 세션 자동 전달 불가하므로 아래 요청문을 원 요청 Codex 대화에 붙여넣어 검수를 개시합니다):
  ```text
  사선 원정 함대 수석 정비관 보고:
  review/final-audit-20261110/FINAL-VERDICT.md의 F1~F7(R-F1~R-F7) 전 항목과 §11.5 개인 저장 격리를 수정·검증한 새 단일 Windows 후보를 제출합니다.

  - 작업 브랜치: codex/four-protagonists-original-core
  - 제품/도구 커밋 (sourceCommit = toolCommit): c4f376db46d6cf26a4ab4e146a90c9185b1a720c (c4f376d)
  - 사전 릴리스 태그: four-protagonists-candidate-20261110-c4f376d-r1
  - 후보 EXE: UW2-Korean-Four-Captains.exe (109,944,872 bytes, SHA256 10249cec70b34dda3e25a70230213e038c9ff0005a82f4751c734cd51d940315)
  - 코드대법원 제출 명세서: E:/03_AllWork/04_REA/uw2-joao-worktree/review/spec_20261110_four_protagonists_remediation_r1.md (review_verdict: PENDING)
  - 완료 보고서 및 증거 매니페스트/영수증:
    - remake/docs/four-protagonists/remediation/completion-report.md
    - remake/docs/four-protagonists/remediation/evidence-manifest.json
    - remake/docs/four-protagonists/remediation/publication-receipt.json

  독립 재검수를 요청합니다.
  F1~F7 수정 및 원작 기준 개발 검증을 마친 새 후보를 제출합니다. 최종 Codex 재검수와 형님의 전편 인수는 대기 상태입니다.
  ```

---

## 10. 다음 반복/인수 작업
- **내부 필수 잔여**: 없음 (`0`건).
- **Codex 검수 대기**: `CODEX_REVIEW_PENDING` (`review/spec_20261110_four_protagonists_remediation_r1.md` 기준 독립 재검수 대기).
- **형님 주인공별 `U1~U6` 수동 인수 체크리스트 (`USER_FULL_PLAY_PENDING`)**:
  - [ ] **U1 (옷토 스핀노라)**: 런던 왕궁 밀명 → 매슈 단판 승부·영입 → 사략/세비야 갤리온 탈취 → 해적 명성 `5,000` 후 세비야 교역소 카타리나 구출 및 주점 `120..220`분 동맹 → 해적 명성 `15,000..19,999` 런던 주점 금 수송선 첩보 및 오르테가 해전 승리(`+12,000g`, `+5,000` 해적 명성) → 해적 명성 `30,000` 후 런던 왕궁·길드 무적함대 명령 → 낭트·산토도밍고 해전 → 카옌 카타리나 탄원 → 주점 에제키엘 도전 수락 후 `30..59`일 보르도 결전 승리 → 런던 왕궁 개선 엔딩 체감 확인.
  - [ ] **U2 (에르네스트 로페스)**: 암스테르담 출항·메르카토르 계약 → 해역 측량 보고(`Report Map`) → 파울라 조우·동행 → 모험 명성 `800` 및 천주(`95`) 입항으로 나가사키(`100`) 해금 → 나가사키 부모님 서신 확인 후 장안(`98`) 해금 → 장안 특수 건물(`'98','8'`) 파울라 귀향 엔딩(`에르네스트와 파울라의 귀향`) 체감 확인.
  - [ ] **U3 (피에트로 콘티)**: 제노바 출항 → 리스본 프랑코 공작부인 후원 계약 → 제노바 은행 가문 빚(`5,000g`) 정산 → 알렉산드리아 금메달 지도 구입 후 산토도밍고 근해(`portId === null`)에서 `상륙(Go Ashore)` → `수색(Search)`으로 금메달 발굴 → 리스본 보고 → 베네치아 지팡이 지도 구입 후 바스라 근해 상륙·수색 → 마사와 조안·알·나가사키 에르네스트 단서 → 카옌 엘도라도 발견 → 런던 은행 하웰 저택 시험 → 리스본 프랑코 공작부인 왕의 지팡이 헌정 엔딩 체감 확인.
  - [ ] **U4 (알 베자스)**: 이스탄불 4대 투자자 차입(`2,000g`) + 숙박업소 선물(`+500g`) → 교역 후 4대 투자자 상환 → 술탄 알현 및 작위 승급 → 알렉산드리아 피에트로·리스본 조안 미끼 돛 → 마사와 카타리나 조우(전투 취소 확인) → 5일 이상 해상 항해 6회 달성 → 이스탄불 주점 사파 소문 → 바스라 사샤 재회 → 이스탄불 점술가 → 베네치아 은행 하웰 → 이스탄불 주점(`'3','2'`) 가족 보금자리 축하 엔딩(`알과 가족의 보금자리`) 체감 확인.
  - [ ] **U5 (한국어 UI·해상도·BGM)**: `1280x720` 및 `800x600` 창 크기에서 한국어 대사·선택지·항해일지 가독성 및 BGM 단일 재생 체감 확인.
  - [ ] **U6 (6인 슬롯 저장·재실행·기존 세이브 호환)**: 조안·카탈리나·옷토·에르네스트·피에트로·알 슬롯 저장/불러오기 및 앱 재실행 후 이어하기 확인.
