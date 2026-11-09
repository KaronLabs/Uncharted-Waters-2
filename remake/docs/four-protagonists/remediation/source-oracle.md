# Four Protagonists Original-Core Remediation — DOS Source Oracle (`source-oracle.md`)

본 문서는 `docs/mission/four-protagonists-original-core-remediation-mission.md` (§9, §10.2)에 따라 구현 코드와 분리된 **원작 DOS 오라클**(`research/raw/SNR3.DAT`~`SNR6.DAT`, `SNR3.MES`~`SNR6.MES`, `MAIN.EXE`, `research/game-details/scenarios/scenario-3..6-*.md`)을 기준으로 `R-F1`~`R-F6` 및 네 주인공의 원작 본선·필수 분기 기대값을 정리한 독립 기준표이다. 한글판 원시 바이너리(`research/raw/SNR*.DAT`)의 오프셋과 영문 해독 문서(`scenario-*.md`)의 오프셋 차이를 명시적으로 구분한다.

---

## 1. 옷토 스피노라 (Otto Baynes) — `SNR3.DAT` / `SNR3.MES` (`R-F3`, `R-F5`)

### 1.1 원작 명성 축 및 임계값 (Piracy Fame, 1:1 원작 기준)
- **원시 바이트 대조 (한글 `research/raw/SNR3.DAT`)**:
  - **Section 2 (`0x0A5D`) — 세비야 교역소 카타리나 구출**:
    - 바이트: `0c 02 13 88 82 01 02 00 3e`
    - 해석: `Var[0x02]` (Piracy Fame) `< 0x1388` (`5,000`) 이면 분기 종료(`0x003e`). 즉 **해적 명성 `5,000` 이상** 필수.
  - **Section 3 (`0x1221`) — 런던 주점 황금 운반선(오르테가) 소문 및 Skip 경계**:
    - 바이트: `0c 02 4e 20 82 01 02 02 69`
    - 해석: `Var[0x02]` (Piracy Fame) `>= 0x4E20` (`20,000`) 이면 Section 3(운반선 사냥)을 건너뛰고 Section 4로 분기. Section 3 정상 진입 범위는 **`15,000 <= Piracy Fame < 20,000`** (`scenario-3-otto-baynes.md:309`).
  - **Section 4 (`0x128B`) — 런던 왕궁 국왕 무적함대 소집 명령**:
    - 바이트: `0c 02 75 30 82 01 02 00 37`
    - 해석: `Var[0x02]` (Piracy Fame) `< 0x7530` (`30,000`) 이면 분기 종료. 즉 **해적 명성 `30,000` 이상** 필수.
- **오라클 결론**:
  - 임의의 1:50 축소 환산(`250`, `400`, `500`)을 폐기하고 원작과 동일한 **`5,000` / `15,000..19,999` (20,000 이상 시 운반선 소문만 skip 가능하되 필수 사슬은 보존) / `30,000`** 원작 해적 명성 임계값을 그대로 적용한다.
  - 플레이어가 정상 플레이로 해적 명성 `5,000` → `15,000` → `30,000`에 도달할 수 있도록 길드 `'Job Assignment'`(`otto.spanish-privateer-raid`: 승리 시 `+2,000g`, 해적 명성 `+5,000`) 및 오르테가 황금 운반선 승리(`otto.ortega-gold-ship`: 승리 1회 한정 `+12,000g`, 해적 명성 `+5,000`)를 제공한다.

### 1.2 카타리나 세비야 교역소 구출 → 세비야 주점 약속 시간 창 (`2:00 ~ 3:40`)
- **원작 근거 (`scenario-3-otto-baynes.md:235`, `SNR3.DAT` Section 2)**:
  - 세비야 교역소(`portId: '2', buildingId: '3'`)에서 카타리나를 구출하면 카타리나는 **"두 시간 뒤 주점에서 만나자"**고 약속한다.
  - 원작 시간 판정:
    - 교역소 구출 시각 기준 경과 시간 `< 120분` (`0..119분`, 약속 시간 이전): 아직 카타리나가 도착하지 않음 (`otto.original-core.catalina-pub-early` 안내, 본 동맹 이벤트 미발동).
    - 경과 시간 `120..220분` (`2시간 00분 ~ 3시간 40분`, 정시 창): 카타리나와 주점(`'2', '2'`)에서 조우하여 동맹 체결 (`otto.original-core.catalina-pub-alliance`).
    - 경과 시간 `>= 221분` (`3시간 40분` 초과, 지각): 바텐더가 카타리나가 기다리다 먼저 떠났다고 알림 (`otto.original-core.catalina-pub-late`). 이후 플레이어가 다시 교역소/주점 약속을 잡아 정시 창에 진입할 수 있도록 복구 경로를 제공한다.

### 1.3 무적함대 소집 사슬 및 에세키엘 보르도 한 달 약속·거절·재진입
- **원작 근거 (`scenario-3-otto-baynes.md:380-540`, `SNR3.DAT` Section 4~7)**:
  1. 해적 명성 `30,000` 달성 후 **런던 왕궁(`'30', '6'`)** 진입 → 헨리 8세의 무적함대 요격 명령 (`otto.original-core.london-palace-armada-order`).
  2. **런던 길드/조합(`'30', '7'`)** 진입 → 길드 마스터의 무적함대 집결지 브리핑 (`otto.original-core.london-guild-armada-briefing`).
  3. **낭트 항구(`'29', '4'`)** 출항/결전 → 무적함대 제1전대 격파 (`otto.nantes-armada`, 승리 시 해적 명성 `+1,000`).
  4. **산토도밍고 항구(`'49', '4'`)** 출항/결전 → 신대륙 무적함대 분견대 격파 (`otto.santo-domingo-armada`, 승리 시 해적 명성 `+1,000`).
  5. **카이엔 항구(`'57', '4'`)** 진입 → 카타리나 함대 합류 및 아마존/스페인 본대 정보 공유 (`otto.original-core.cayenne-amazon-catalina-plea`).
  6. **유럽 주점(`portId: 4..41`, 단 세바스토폴 `'9'`, 런던 `'30'`, 암스테르담 `'34'` 제외, 해적 명성 `>= 30,000`)** 진입 → 에세키엘(돈 후안)의 결투장 전달 (`otto.original-core.pub-ezequiel-challenge`, 선택지 `'yes'` / `'no'`):
     - **`'no'` (거절) 선택 시**: 부관 매튜가 실망하며 떠나고 `otto.original-core.ezequiel-declined-coward` 기록. 이 상태에서 **세비야 사령부(`'2', '8'`)**에 재진입하면 에세키엘을 기습 추격하는 재진입 경로(`otto.original-core.seville-command-room-reentry`)가 열려 보르도 결전 약속을 다시 잡을 수 있다.
     - **`'yes'` (수락) 선택 시**: **한 달 뒤(`30..59일` 창)** 보르도(`'28'`) 앞바다에서 결전하기로 약속(`ottoEzequielChallengeDay` 기록).
       - `0..29일` (약속된 한 달 이전): 보르도 주점(`'28', '2'`)에서 아직 한 달 약속 기한이 되지 않았음을 안내.
       - `30..59일` (약속 기한 창): 보르도 주점(`'28', '2'`)에서 무적함대 본대 출현 확인 (`otto.original-core.bordeaux-pub-armada-accept`) → 보르도 항구(`'28', '4'`) 최종 결전 (`otto.bordeaux-armada-finale`).
       - `>= 60일` (기한 도과): 약속 기한을 놓쳐 무적함대가 철수함 (`otto.original-core.bordeaux-appointment-missed`) → 세비야 사령부(`'2', '8'`) 재진입(`seville-command-room-reentry`)으로 약속을 재설정하여 복구 가능.
  7. 보르도 무적함대 본대 격파 후 **런던 왕궁(`'30', '6'`)** 귀환 → 최종 엔딩 (`otto.original-core.london-palace-victory-return`).

### 1.4 옷토 일지 (`getOttoJournal`) 오라클 (`R-F5`)
- 각 사건 완료 직후의 일지 첫 미완료 항목(`currentObjective`)은 반드시 **실제 다음 행동의 선행 조건**을 가리켜야 한다:
  - 세비야 갈레온 추격전 직후 → 해적 명성 5,000 달성 및 **세비야 교역소 카타리나 구출** 안내 (낭트로 바로 보내지 않음).
  - 세비야 교역소 구출 직후 → **2시간~3시간 40분 뒤 세비야 주점 동맹** 안내 (지각 시 재약속 안내).
  - 세비야 주점 동맹 직후 → 해적 명성 15,000 달성 및 **런던 주점 황금 운반선 소문** 안내.
  - 황금 운반선 격파 직후 → 해적 명성 30,000 달성 및 **런던 왕궁 무적함대 명령 → 런던 길드 브리핑 → 낭트 → 산토도밍고 → 카이엔 → 유럽 주점 에세키엘 결투장 → (거절/기한 도과 시 세비야 사령부 재진입) → 한 달 뒤 보르도 주점 → 보르도 최종 해전 → 런던 왕궁 귀환** 순으로 누락 없이 안내.

---

## 2. 피에트로 콘티 (Pietro Conti) — `SNR5.DAT` / `SNR5.MES` (`R-F2`)

### 2.1 황금 메달(Gold Medallion) 및 포세이돈/제왕의 지팡이(Staff of Kings) 상륙 탐색
- **원작 근거 (`research/game-details/scenarios/scenario-5-pietro-conti.md:235`, `:329`, 한글 `SNR5.DAT`)**:
  - 피에트로의 두 핵심 보물(산토도밍고 인근 **황금 메달**, 벵가지 인근 **포세이돈의 지팡이 → 제왕의 지팡이**)은 항구 내 길드 메뉴 클릭으로 발굴하는 것이 아니라, **보물 지도를 소지한 채 바다로 출항하여 지도 좌표 해안에 접근한 뒤 상륙(Go Ashore) → 탐색(Search)** 명령을 실행해 발굴한다.
- **오라클 조건 및 반례 차단**:
  - **사전 조건**:
    1. 황금 메달(`p1-gold-medallion`): 리스본 프랑코 집사(`'1', '8'`)로부터 신대륙 보물 단서를 듣고 **해당 보물 지도(Item ID `87`)**를 소지해야 함.
    2. 지팡이(`p2-poseidon-staff` / `p3-staff-of-kings`): 지중해 단서 사건 완료 후 **해당 보물 지도(Item ID `88`)**를 소지해야 함.
  - **위치 및 상태 조건 (`isAtTreasureLocation` / `canExcavateTreasure`)**:
    - `state.portId !== null` (항구 내부 체류 중): **무조건 `false`**. 산토도밍고(`'49'`)나 벵가지(`'15'`) 항구 안에서 길드/저택 버튼을 눌러 발굴하는 경로는 원천 제거한다.
    - 함대 위치 `(x, y)`가 `(0, 0)` 등 오답 좌표일 때: **무조건 `false`**.
    - 반드시 해상(`state.portId === null`)에서 목표 해안 타일 반경(`<= 3` 타일: 황금 메달 `(255, 223)`, 지팡이 `(544, 189)`)에 도달한 뒤, 해상 명령 패널(`Provisions.tsx`)에서 **상륙(`sea-go-ashore`)** 후 **보물 탐색(`sea-search-treasure`)**을 실행할 때만 발굴이 성립한다.
  - **결과**:
    - 성공 시 해당 지도(`87` 또는 `88`) 1개 소비, 보물 아이템(`p1-gold-medallion` 또는 `p2-poseidon-staff` + `p3-staff-of-kings`) 획득, 발견물 기록, 모험 명성 `+200` 부여.
    - 이미 발굴을 완료한 경우 중복 발굴 불가(아이템 증식·부분 차감 0).

---

## 3. 알 베자스 (Ali Vezas) — `SNR6.DAT` / `SNR6.MES` (`R-F1`)

### 3.1 리스본 공작의 미끼 돛 제안을 통한 카타리나 교전 취소
- **원시 바이트 대조 (한글 `research/raw/SNR6.DAT` Section 2)**:
  - 오프셋 `0x1396`: 카타리나 함대 조우 이벤트(`0xA101` 전투 전 인터셉트 경로) 시작.
  - 메시지 `SNR6.MES` #409: 카타리나가 포르투갈 문장(조안 공작가의 미끼 돛)이 실제로는 알 베자스의 상선임을 확인하고 **“미안했소. 이제가도 좋아.”**라고 말하며 물러난다.
  - 오프셋 `0x1430 F8`, `0x1431 F0`, `0x1432 F2`: **전투 진입 없이 조우를 즉시 종료(전투 취소)**.
- **오라클 결론**:
  - 리스본 저택(`'1', '8'`)에서 페드로 공작의 미끼 돛 제안(`ali.original-core.lisbon-duke-decoy-request`)을 수락한 뒤 마사와(`'64', '4'`)에서 카타리나와 조우(`ali.original-core.massawa-catalina-ambush`)할 때, **어떠한 `startCombat`이나 전투 승리(`combatVictory`), 나포 보상/전리품도 생성하지 않고 즉시 교전이 취소**되어야 한다.

### 3.2 다섯째 날(`dayAtSea >= 5`) 도달 항해 6회 카운터 및 주점 소문 → 바스라 재회
- **원시 바이트 대조 (한글 `research/raw/SNR6.DAT` Section 3)**:
  - 오프셋 `0x158C`: `4C 0A 01` (`Var[0x0A]` += 1, 다섯째 날 도달 항해 시 카운터 1 증가).
  - 오프셋 `0x158F`: `8E 0A 06 01 64` (`Var[0x0A] == 6` 검사).
  - 오프셋 `0x1594`: `2C 00 01` (6회 달성 시 사파/사샤 소식 단계 활성화).
- **오라클 결론**:
  - `massawa-catalina-ambush` 완료 이후 출항하여 해상 체류일(`dayAtSea`)이 **5일 이상(`dayAtSea >= 5`)에 도달한 항해마다 해당 항해당 정확히 1회씩** `state.originalCore.aliDayFiveVoyages`가 증가한다 (5일 미만 조기 입항 시 미증가, 한 번의 장기 항해에서 5일·6일·10일이 지나도 해당 항해에서는 1회만 증가).
  - `aliDayFiveVoyages >= 6` 달성 후 **이스탄불 주점(`'3', '2'`)**에서 사파(사샤)에 관한 소문(`ali.original-core.istanbul-pub-sapha-rumor`)을 들은 뒤에야 **바스라 주점(`'77', '2'`)**의 사샤 재회(`ali.original-core.basra-sasha-reunion`)가 열린다.

### 3.3 알 베자스 최종 엔딩 — 이스탄불 주점 가족 보금자리 결말 (`0x2D2A F4 05`)
- **원시 바이트 대조 (한글 `research/raw/SNR6.DAT` 마지막 섹션)**:
  - 베네치아 은행/곤돌라에서 피에트로의 빚을 대신 갚아준(`ali.original-core.venice-howell-pietro-debt`) 뒤, 알의 최종 결말은 왕궁 작위 수여가 아니라 **이스탄불 주점(`'3', '2'`)**에서 사샤·가신들과 함께 가족의 보금자리를 축복하는 결말(`0x2D2A F4 05`, 엔딩 시퀀스 #5 호출)이다.
  - 임의의 왕궁 대관식(`promoteRoyalRank: 5`)이나 `+25,000g` 지급을 제거하고, 이스탄불 주점(`'3', '2'`)에서 원작 가족 결말을 발동시킨다.

---

## 4. 에르네스트 로페스 (Ernst Von Bohr) — `SNR4.DAT` / `SNR4.MES` (`R-F6`)

### 4.1 판본별(`original-core-v1` vs `legacy-remake`) 엔딩 문구 및 의미 분리
- **원작 근거 (`research/game-details/scenarios/scenario-4-ernst-von-bohr.md`, 한글 `SNR4.DAT` / `SNR4.MES`)**:
  - `original-core-v1` 판본에서 에르네스트의 최종 엔딩(`ernst.original-core.changan-ending-reunion`, 장안 저택 `'91', '8'`)은 파울라의 고향 장안에서 파울라의 가족과 상봉하고 파울라와 함께 귀향길에 오르는 결말이다. 암스테르담에 복귀해 메르카토르의 전 세계 지도를 완성했다는 문구는 구 각색판(`legacy-remake`)의 결말이다.
- **오라클 결론**:
  - `QuestJournal.tsx` 및 `ErnstEnding.tsx`에서 `state.scenarioEdition === 'original-core-v1'`일 때는 **장안 가족 상봉 및 파울라와의 귀향**(`'에르네스트와 파울라의 귀향'`, `'장안 저택에서 파울라의 부모님과 감격스러운 상봉을 마쳤습니다...'`)을 표시하고, 암스테르담 귀환이나 메르카토르 세계지도 완성 주장을 일절 포함하지 않는다.
  - 반면 `state.scenarioEdition === 'legacy-remake'`일 때는 기존의 암스테르담 메르카토르 세계지도 완성 문구를 그대로 보존한다.
  - 동일하게 알 베자스(`AliEnding.tsx`)와 피에트로 콘티(`PietroEnding.tsx`)도 `original-core-v1`과 `legacy-remake` 엔딩 배너 문구를 판본별로 정확히 분리한다.
