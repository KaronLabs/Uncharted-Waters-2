# Four Protagonists Remediation r2 — DOS Source Oracle (`source-oracle.md`)

본 문서는 `docs/mission/four-protagonists-remediation-r2-mission.md` (§4, §10.1, §10.2) 및 최신 독립 재검수 판결 `review/remediation-r1-recheck-20261110/R1-VERDICT.md` (`R1-RESULT.json`, `GUILTY / REVISE / severity: 41`)에 따라, 한글 DOS 원시 바이너리(`research/raw/SNR3.DAT`~`SNR6.DAT`, `SNR3.MES`~`SNR6.MES`, `MAIN.EXE`, `research/dialog-system/scripts/snr.ts`)와 영문 시나리오 분석 문서(`research/game-details/scenarios/scenario-3..6-*.md`, `at-sea.md`)를 대조하여 도출한 **`C1`~`C4` 원작 오라클 조건표**다. 원시 바이트 사실(`확인됨`)과 리메이크 월드 투영·상태 매핑(`해석`)을 명시적으로 분리한다.

---

## 0. 원시 바이너리 통제 식별자 (Signature & Section Control)

| 파일 경로 | 바이트 크기 | SHA-256 | 시그니처 | 섹션 수 | 대조 스크립트 |
| --- | ---: | --- | --- | ---: | --- |
| `research/raw/SNR3.DAT` | `8,249` | `7e87471104a7f620499dd62993a55c63fcfd9003d909a12103b089d54a76d166` | `SNDT` | `6` (`0x2c..0x187d`) | `research/dialog-system/scripts/snr.ts` |
| `research/raw/SNR4.DAT` | `3,934` | `ed7d73ae2fe9d7fe16886e7ffadd2e8a68a9eb56c1c182e60a0b8f5cb1805ee0` | `SNDT` | `5` (`0x28..0x747`) | `research/dialog-system/scripts/snr.ts` |
| `research/raw/SNR5.DAT` | `5,394` | `4ebd0b87e7b97748240c7a9dc7cbc6712b24343caffcc03041c76e7313fde5ae` | `SNDT` | `4` (`0x24..0xef8`) | `research/dialog-system/scripts/snr.ts` |
| `research/raw/SNR6.DAT` | `11,670` | `ffe745f6014b2a1c63a3b03df5775312c348d56e1cd3dfee23b9b66dd0c623db` | `SNDT` | `6` (`0x2c..0x250b`) | `research/dialog-system/scripts/snr.ts` |
| `remake/src/data/assets/worldTilemap.wasm` | `2,332,800` | `5cba4d932859f4ee76c26181abe1de89487b716c253127dfa9372f125dd8131d` | N/A (`2160 x 1080`) | N/A | `remake/src/map.ts`, `actionsOriginalCore.ts` |

---

## 1. `C1` (R-F2 잔여) — 피에트로 실제 해안 상륙(Go Ashore) 전제 및 보물 지도 좌표·반경 오라클

### 1.1 원작 바이트 및 해상 메커니즘 사실 (`확인됨`)
- **원작 지도 경로 (`SNR5.DAT` Section 1, `scenario-5-pietro-conti.md:235`, `:329`)**:
  - `SNR5.DAT` Section 1 route `0xA301`은 보물 지도 사용/확인 경로이며, 피에트로의 두 시나리오 유물(**황금 메달 / Gold Medallion**, **성자의 지팡이·포세이돈의 지팡이 / Staff of the Saint**)은 항구 길드 메뉴나 항구 입구에서 획득하는 아이템이 아니라 **비항구(non-port) 해안에서 상륙(Go Ashore) 후 수색(Search)** 으로 발굴하는 발견물이다.
- **원작 해안 상륙 판정 (`at-sea.md:1261-1269`)**:
  - 함대 `2x2` 수상 블록 자체가 항행 가능한 바다 타일 위에 있어야 하며(육지 충돌 0), 대각선 4귀퉁이를 제외한 **상하좌우 8개 인접 변 타일 중 최소 1개 이상이 육지 충돌 타일**일 때만 해안 상륙(`Go Ashore`)이 허용된다. 대양 한가운데(인접 육지 0)나 항구 내부(`portId !== null`)에서는 상륙할 수 없다.
  - 상륙 중 출항(`Sail` / `leaveAshore`), 함대 이동(`moveFleet`), 항구 입항(`dock`), 주인공 전환 시 상륙 상태는 즉시 해제된다.

### 1.2 리메이크 월드 투영 및 반경 매핑 (`해석` — 근거 명시)
- **등거리 원통 투영 (`remake/src/data/discoveryData.ts:54-64`)**:
  - `x = (6.0 * lon + 898.0 + 2160) % 2160`, `y = -7.316 * lat + 640.9`.
- **두 보물의 비항구 해안 좌표 확정**:
  1. **`p1-gold-medallion` (지도 아이템 `'87'`, 보상 모험 명성 `+200`)**:
     - 원작 발견물 카탈로그 좌표 `7.0°N, 65.0°W` (`lat: 7.0, lon: -65.0`, 남미 북부 카리브 해안·오리노코 서측 해안, 원작 마을 타일 `(506, 590)` 인접).
     - 투영 좌표: `position = { x: 508.0, y: 589.688 }`. 모든 정규/보급 항구로부터 최소 `>= 26.6` 타일 이격(산토도밍고 `'49'` 후속 소문 이벤트는 항구 단서로만 유지).
     - 실제 해안 정박 수역 `(508, 586)`과의 거리: `3.688 <= 5.0` (`canGoAshore === true`).
  2. **`p2-poseidons-staff` (지도 아이템 `'88'`, 보상 `'m3-staff-of-the-saint'` + 모험 명성 `+300`)**:
     - 페르시아만 동안 비항구 해안 `28.5°N, 51.8°E` (`lat: 28.5, lon: 51.8`, 부셰르 해안). 바스라(`'77'`), 시라즈, 카타르, 호르무즈 등 모든 항구로부터 최소 `>= 19.8` 타일 이격.
     - 투영 좌표: `position = { x: 1208.8, y: 432.394 }`.
     - 실제 해안 정박 수역 `(1207, 434.662)` / `(1208, 432)`과의 거리: `<= 5.0` (`canGoAshore === true`).
- **반경 및 항구 입구 배제 규칙**:
  - `DEFAULT_DISCOVERY_RADIUS = 5` (`MAX_PER_TICK_DISPLACEMENT = 1`에 대한 리메이크 표준 발견 반경 `discoveryData.ts:89-94`)를 그대로 사용하며, `r1`에 존재하던 근거 없는 `Math.max(radius, 45)` 확대 및 항구 인접 `20` / 고정 fallback `20` `OR` 분기를 전면 삭제한다.
  - 항구 입구(`PORT_MOUTH_EXCLUSION_RADIUS = 2.5` 타일 이내)에서는 `canGoAshore()`가 `false`를 반환하여 항구 앞바다 상륙·수색 우회를 차단한다.
  - `Provisions.tsx`의 `[data-test="sea-search-treasure"]` 버튼은 React 로컬 토글이 아니라 `state.originalCore.isAshore === true` 및 `ashorePosition` 정박 일치 시에만 렌더링되며, production `canExcavateTreasure` / `excavateTreasure` 역시 동일한 상태를 강제 검사한다.

---

## 2. `C2` (R-F1 잔여) — 알 베자스 원작 미끼 항해·교전 취소·6항해·후반 채무 및 결혼 결말 오라클

### 2.1 원시 바이트 사실 (`확인됨` — 한글 `SNR6.DAT` / `SNR6.MES`)
1. **초기 4인 투자자 상환 후 첫 왕궁 알현 (`SNR6.DAT` Section 1)**:
   - 이스탄불 4개 건물(조선소 `'3'`, 길드 `'7'`, 주점 `'2'`, 항구 `'4'`) 차입금 상환 후 왕궁(`'3', '6'`) 첫 알현 시 술탄이 **금괴 50개(`500,000` 금화)**와 면세증(`item '30'`)을 하사한다 (`scenario-6-ali-vezas.md:145-162`).
2. **100금괴 전제 및 이스탄불 미끼 돛 → 해상 카타리나 전투 전 취소 (`SNR6.DAT` Section 2)**:
   - **자금/장소 전제 (`scenario-6-ali-vezas.md:188-198`, `:404`, `:541`)**: 소지 금화 기준 금괴 `>= 100`개(`gold >= 1,000,000` 금화; 원작 `EA` 오프코드가 소지 금화 `0x60A`를 검사하며 금괴 1개 = `10,000` 금화) 상태에서 이스탄불(`portId: '3'`)의 검사 대상 건물(`'1'` 교역소, `'2'` 주점, `'3'` 조선소, `'4'` 항구, `'6'` 왕궁, `'7'` 길드, `'9'` 은행, `'10'` 도구점; 여관 `'5'`·저택 `'8'`·사원 `'11'`·점술가 `'12'` 제외) 진입 시 `istanbul-gold-bar-premise`가 설정된다.
   - 그 뒤 최소 1회 출항하여 해상 1일차(`dayAtSea >= 1`)를 넘긴 후 이스탄불 귀환 → 교역소 소문(`istanbul-rumor-joao`) → **이스탄불 주점(`'3', '2'`) 조안 페레로 조우**(`istanbul-pub-joao`) → **이스탄불 항구(`'3', '4'`) 포르투갈 미끼 돛 장착**(`istanbul-harbor-decoy-sail`).
   - **전투 전 취소 (`SNR6.DAT` Section 2 route `0xA101` → `0x1396`, 종료 바이트 `0x1430: f8 f0 f2`, `SNR6.MES` #409)**: 해상에서 카타리나 에란초 함대와 조우할 때 전투 진입 전 인터셉트(`0xA101`)가 발동하여 카타리나가 알의 상선임을 확인하고 **전투 시작 없이 즉시 퇴각**한다 (`activeCombat === null`, 전리품·해적/교역 명성·선체/선원 피해 변화 `0`). 다른 일반 해적/함장과의 교전은 정상 작동한다.
3. **해상 5일차(`dayAtSea >= 5`) 도달 항해 6회 누적 → 사파 소문 → 바스라 재회 (`SNR6.DAT` Section 2~3)**:
   - `SNR6.DAT` route `0xA005`, 바이트 `0x158c: 4c 0a 01 8e 0a 06 01 64 2c 00 01`: 카타리나 조우 취소 이후 각 출항에서 해상 5일차(`dayAtSea >= 5`)에 도달할 때 항해당 정확히 1회(`aliCurrentVoyageCounted` 가드; 조우가 일어난 해당 항해가 5일차 이상 계속 항해하면 그 항해 역시 1회로 집계하되 6일·7일 연장 항해 시 중복 증가 없음) `aliDayFiveVoyages`를 `+1` 증가시킨다.
   - `aliDayFiveVoyages < 6`(`5`회 이하)에서는 이스탄불 주점 소문이 열리지 않으며, `>= 6`회 달성 후 **이스탄불 주점(`'3', '2'`) 사파 소문**(`istanbul-pub-sapha-rumor`) → **바스라 주점(`'77', '2'`) 사파(사샤) 재회**(`basra-sasha-reunion`, 교역 명성 `+1,000`) → **이스탄불 주점 라디아 보고**(`istanbul-pub-tell-ladia`)로 이어진다.
4. **후반 30 동맹항 → 라디노 전근 동행 → 하웰 채무 추심 의뢰 분기 → 리스본 후원 → 사카이 피에트로 추심 → 베네치아 정산 → 술탄 보상 → 가족 결혼 결말 (`SNR6.DAT` Section 3~5)**:
   - 오스만 동맹항 `>= 30`개 상태에서 이스탄불 외 오스만 항구(`ottoman-30-ports-harbor`) 진입 → **이스탄불 은행(`'3', '9'`) 라디노의 베네치아 전근 소식 및 동행**(`istanbul-bank-radino-transfer`, 금화 보상 `0`원) → **베네치아 은행(`'14', '9'`) 하웰의 피에트로 콘티 채무 추심 의뢰**(`venice-howell-loan-request`, 금화 지급 `0`원, `Yes`/`No` 선택):
     - **`Yes` (수락, 본선)**: 베네치아 항구(`'14', '4'`) 수색 계획(`venice-harbor-search-plan`) → **리스본 공작 저택(`'1', '8'`) 프랑코 공작부인 후원**(`+100,000g`, `lisbon-duchess-sponsor`) → 리스본 항구(`'1', '4'`) 동방 출항(`lisbon-harbor-departure`) → **나가사키 주점(`'100', '2'`) 단서**(`nagasaki-pub-clue`) → **사카이 주점(`'99', '2'`) 피에트로 추심**:
       - 알렉산드리아에서 `5,000g`를 빌려준 경우(`pietroLoan === 'lent'`): `sakai-pub-pietro-repay` (`+2,100,000g` = 금괴 210개, 교역 명성 `+1,000`).
       - 거절/미대여 분기(`pietroLoan !== 'lent'`): `sakai-pub-pietro-repay-refused` (`+400,000g` = 금괴 40개, 교역 명성 `+500`).
       - **베네치아 은행(`'14', '9'`) 하웰 정산**(`venice-bank-settlement`, `-400,000g` 차감 및 교역 명성 `pietroLoan === 'lent'` 분기 `+1,000` / 미대여 분기 `+500`).
     - **`No` (거절 분기)**: `venice-howell-loan-refused` 설정, 베네치아 항구 수색 계획 미발동, 바로 Section 4 술탄 알현 가능.
   - **Section 4 이스탄불 왕궁(`'3', '6'`) 술탄 보상**: `istanbul-palace-sultan-reward` (50항구 강제 게이트 없이 금괴 100개 = `+1,000,000g`, 교역 명성 `+1,000`; 50항구 알림 `ottoman-50-ports-harbor`는 선택적 알림으로 분리).
   - **Section 5 교역 명성 `>= 40,000` 및 가족·결혼 엔딩**:
     - 비이스탄불 항구(`ottoman-40k-fame-harbor`) → 오스만 지배 항구 주점(`ottoman-40k-fame-pub`) → **바스라 주점(`'77', '2'`) 루스템 소개**(`basra-pub-rustem-intro`) → **이스탄불 주점(`'3', '2'`) 가족 상봉**(`istanbul-pub-family-intro`) → **베네치아 은행(`'14', '9'`) 하웰 저택 호가 제시**(`venice-howell-price-quote`, `min(wealthIngots + 500, 10000)` 금괴) → 목표 자산 달성 후 **하웰 무상 저택 양도 시험**(`venice-howell-test-settlement`, `No` 선택 시 반복 가능, `Yes` 선택 시 **금화 차감 `0`원**으로 저택 증여) → **이스탄불 주점(`'3', '2'`) 사파 청혼·결혼 축하 엔딩**(`SNR6.DAT` Section 5 route `0x0201`, opcode `0xF4 05`; 기존 저장 호환을 위해 이벤트 ID 문자열은 `ali.original-core.istanbul-sultan-coronation`을 유지하되 대사·일지·엔딩 화면은 모두 원작 주점 가족 결혼식이며 술탄 즉위 문구 없음).

---

## 3. `C3` (R-F3 / R-F5 잔여) — 옷토 선택 분기·일지·원작 시각(20분 틱) 및 30일월 날짜 코드 오라클

### 3.1 세비야 방문 시 선택 없는 강제 거절 금지 (`확인됨`)
- **원작 근거 (`SNR3.DAT` Section 5, `scenario-3-otto-baynes.md:470-518`)**:
  - 카이엔 카타리나 탄원 완료 및 해적 명성 `>= 30,000` 달성 후, 에세키엘의 한 달 뒤 보르도 결전 도전장(`pub-ezequiel-challenge`)은 **유럽 비수도 주점**(보르도 `'28'`, 낭트 `'29'` 등; 수도 리스본 `'1'`·세비야 `'2'`·이스탄불 `'3'`·런던 `'30'`·암스테르담 `'34'` 및 세바스토폴 `'9'` 제외)에서만 발동하며 플레이어에게 `Yes`/`No` 선택지를 제시한다.
  - `ezequiel-declined-coward` 상태는 오직 플레이어가 이 선택지에서 **명시적으로 `No`를 선택했을 때만** 생성된다.
  - 거절 전 세비야 주점(`'2', '2'`)이나 세비야 사령실(`'2', '8'`)을 단순 방문하더라도 어떠한 거절(`coward`)이나 재진입(`reentry`) 상태도 생성되지 않는다.
  - 명시적 `No` 선택 후에만 세비야 주점 조롱 대사가 출력되고, 세비야 사령실(`'2', '8'`) 방문 시 `seville-command-room-reentry` 및 `pub-ezequiel-challenge`가 완료되며 보르도 약속 기준 시각이 사령실 수락 시점으로 기록된다.

### 3.2 카타리나 세비야 주점 약속: 날짜 무관 하루 중 시각(20분 시계 틱) 비교 (`확인됨`)
- **원작 근거 (`SNR3.DAT` Section 2, `scenario-3-otto-baynes.md:237-252`, `R1-VERDICT.md:66-67`)**:
  - 원작 UW2의 하루 시각은 **20분 단위 시계 틱 `0..71`**(`Math.floor((minutesOfDay) / 20)`)로 표현되며, 카타리나 주점 약속은 총 경과 분(날짜 포함)이 아니라 **하루 중 시각 틱**을 비교한다:
    - 교역소 구출 완료 시점의 시각 틱 `anchorTick = Math.floor((anchor % 1440) / 20)`에 대해 `v15 = (anchorTick + 5) % 72`.
    - **조기 방문 (`early`)**: `tick <= v15` → 대기 안내(`catalina-pub-early`), 동맹 미완료.
    - **정시 방문 (`meeting`)**: `v15 + 1 <= tick <= v15 + 6` (구출 시각 기준 2시간 00분 ~ 3시간 59분 구간; **다음 날 같은 시각 `anchor + 1440 + 120`분 역시 동일 `tick`이므로 정시 성립**) → 동맹 체결(`catalina-pub-alliance`, 해적 명성 `+500`, 금화 `+1,500`).
    - **지각 방문 (`late`)**: `tick >= v15 + 7` → 지각 대사(`catalina-pub-late`) 후 **보상(`0` 금화, `0` 명성) 없이 `catalina-pub-alliance` 단계만 완료 처리하여 다음 시나리오 단계로 진행**한다(원작과 동일하며 임의 재약속 복구를 만들지 않음).

### 3.3 보르도 결전 약속: 원작 30일월 날짜 코드 vs 공용 그레고리력 분리 (`확인됨`)
- **원작 근거 (`scenario-3-otto-baynes.md:505-526`, `R1-VERDICT.md:64-66`)**:
  - 원작 시나리오 날짜 코드는 모든 달을 30일로 계산하는 **`dateCode = ((year - 1501) * 12 + (month - 1)) * 30 + (day - 1)`** 식을 사용한다 (`remake/src/story/core/resolver.ts:20-23`).
  - 공용 달력(`getCalendarParts`) 자체를 변경하면 조안/카타리나 기존 일정에 회귀가 발생하므로, 공용 그레고리력은 그대로 유지하되 `scenarioEdition === 'original-core-v1'`의 `calendarDaysAfterEvent` 판정과 `ottoJournal.ts`에서만 `get30DayMonthDateCode(now) - get30DayMonthDateCode(anchor)`를 사용한다.
  - 예: `1523-01-01` 도전 수락 후 `1523-03-01` 도달 시 그레고리력 일수는 `59`일이지만 원작 30일월 날짜 코드 차이는 `60`일이므로 정확히 **기한 도과(`>= 60`)**로 판정된다.
  - **보르도 기한 도과(`>= 60`)의 종단 실패 의미**:
    - `elapsed >= 60`이 되면 건물 진입 전이라도 `ottoJournal.ts`가 즉시 **`보르도만 결전 기한 도과` (`Bordeaux Bay Appointment Missed`)** 및 런던 왕궁 보고 불가 안내로 전환하며, 불가능한 `"30~59일"` 결전 목표를 더 이상 추천하지 않는다.
    - 건물 진입 시 마슈의 기한 도과 보고(`bordeaux-appointment-missed`)가 1회 출력된 뒤 보르도 항구 결전·세비야 사령실 재진입·런던 왕궁 개선 보고가 모두 열리지 않는 **원작 그대로의 엔딩 없는 종단 실패**로 남는다(`r1` 보고서의 잘못된 기한 도과 복구 주장은 전면 철회·정정함).

---

## 4. `C4` — 저장 파일 계층(`desktop/slotStore.cjs`)과 렌더러(`src/state/originalCore.ts`) 검증 일치 오라클

- **계약 근거 (`four-protagonists-remediation-r2-mission.md` §10.3 C4, `R1-VERDICT.md:70-80`)**:
  - `remake/desktop/slotStore.cjs`의 `isValidOriginalCorePayload`와 `remake/src/state/originalCore.ts`의 `isValidOriginalCoreCandidate`(및 `saveMigrations.ts`의 `migrate`)는 신규 필드 전체에 대해 **동일한 타입·범위·누락 허용 규칙**을 적용해야 한다:
    - `aliDayFiveVoyages`: `undefined`(구 `v9` 호환 → `0` 정규화) 또는 음수 아닌 안전 정수(`Number.isInteger(v) && v >= 0`). 문자열(`"6"`), 음수(`-1`), 소수(`1.5`), `NaN` 모두 거부.
    - `aliCurrentVoyageCounted`: `undefined`(구 `v9` 호환 → `false` 정규화) 또는 `boolean`. 문자열(`"yes"`), 숫자(`1`) 모두 거부.
    - `isAshore`: `undefined`(구 `v9` 호환 → `false` 정규화) 또는 `boolean`.
    - `ashorePosition`: `undefined` / `null` 또는 유한 좌표 `{ x: number, y: number }`.
  - **백업 보존 불변식**:
    - `target` 슬롯이 위 필드 검증에 실패하고 유효한 `.bak`가 존재할 때, `slotStore.cjs`는 결코 유효한 `.bak`를 삭제하면서 로드 불가한 `target`을 반환해서는 안 되며, 유효한 `.bak`를 복구·반환하고 `.bak` 데이터를 보존해야 한다.
    - `version > 9` 또는 미지원 판본/영웅 조합(`R-F4`)은 기존과 동일하게 `target`/`.bak`/`.tmp` 바이트를 1바이트도 수정·삭제하지 않고 `'unsupported-version'`으로 거절한다.
