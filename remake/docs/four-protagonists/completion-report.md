# 최종 보고서 (네 주인공 원작 핵심 시나리오 복원 인수 후보)

## 1. 수행 요약
- 수행한 작업:
  - 옷토 스피노라(`otto`), 에르네스트 로페스(`ernst`), 피에트로 콘티(`pietro`), 알 베자스(`ali`) 네 주인공의 원작(`UW2` DOS `SNR3.DAT`/`SNR3.MES`~`SNR6.DAT`/`SNR6.MES`) 핵심 시나리오(`original-core-v1`, 총 62개 `original-core` 사건 / 전체 14개 아크 173개 사건) 및 필수 진행 메커니즘 전체 구현 및 검증 완료.
  - 판본 분리(`scenarioEdition: 'original-core-v1' | 'legacy-remake'`) 및 저장 버전 `SAVE_VERSION = 9`(`remake/src/state/saveMigrations.ts`, `remake/desktop/slotStore.cjs`) 도입:
    - 신규 옷토·에르네스트·피에트로·알 게임은 `scenarioEdition: 'original-core-v1'` 및 `<hero>.original-core.<event>` 네임스페이스로 시작.
    - 기존 `v1~v8` 저장은 로드 시 `scenarioEdition: 'legacy-remake'`로 명시적 마이그레이션되어 기존 각색판 진행·퀘스트·엔딩 의미를 100% 보존하고, 옷토·에르네스트·피에트로·알의 구형 각색판 저장에 한해 시스템 창 및 일지에 `'이전 각색판 저장 — 원작 핵심 루트는 새 항해 시작으로 플레이할 수 있습니다.'`(`LEGACY_ADAPTATION_SAVE_NOTICE_KO`) 안내 배지를 표시(조안·카타리나는 미표시).
    - `v9` 슬롯/세이브 검증 시 `isValidOriginalCoreCandidate(value, protagonistId, edition, storyEvents)`를 통해 `originalCore` 필드 구조뿐만 아니라 진행 이벤트(`storyEvents`)와 `cartographerContract`, `collectorContract`, `lockedPorts`, `familyDebt`, `royalRankLevel`, `investorCollected`/`investorRepaid` 간의 교차 불변식까지 엄격히 검증.
    - DOS 원시 `originalProgress` 필드는 신규 `scenarioEdition` 및 `originalCore` 상태와 완전히 분리 보존(재사용 금지 규칙 준수).
  - 주인공별 원작 핵심 시나리오 및 고유 게임플레이 시스템(`remake/src/state/originalCore.ts`, `remake/src/state/actionsOriginalCore.ts`) 구현:
    - **옷토 스피노라(`otto.original-core.*`, 19개 사건)**: 런던 왕궁 헨리 8세 밀명·사략 허가서(`'33'`)·300두카트·길버트 합류(`london-palace-commission`) ➔ 런던 항구 출항 준비(`london-harbor-provisioning`) ➔ 런던 주점 매튜 로이 결투(`otto.matthew-duel`) 승리 및 영입(`london-pub-matthew-brawl`) ➔ 리스본 야간 주점 훌리오 에르네스트 정보(`lisbon-pub-julio-ernst-news`) ➔ 세빌리아 주점 무적함대 소문(`seville-pub-armada-rumor`)·조선소 갤리온 정찰(`seville-shipyard-galleon-intel`)·야간 잠입 경비 추격전(`otto.seville-pursuit`, `seville-night-raid-alarm`)·야간 항구 에스파냐 갤리온 강탈(`seville-harbor-galleon-capture`)·여관 수색(`seville-lodge-inspection`) ➔ 포고령(`proclamation-royal-recall`) ➔ 세우타 주점 매튜 반발(`ceuta-pub-matthew-defiance`) ➔ 런던 왕궁 해임 위기(`london-palace-dismissal-crisis`) ➔ 낭트 제1함대 격파(`otto.nantes-armada`, `nantes-harbor-first-squadron`) ➔ 보르도 주점 에제키엘 도발(`pub-ezequiel-challenge`) ➔ 카이엔 카탈리나 공투(`cayenne-amazon-catalina-plea`) ➔ 산토도밍고 신대륙 함대 격파(`otto.santo-domingo-armada`, `santo-domingo-armada-ambush`) ➔ 세빌리아 주점 결전 제보(`seville-pub-final-fleet-tip`) ➔ 보르도 에제키엘 기함 결전(`otto.bordeaux-ezequiel`, `bordeaux-harbor-ezequiel-showdown`) ➔ 런던 왕궁 최종 개선 및 헨리 8세 문답 2분기(`'1'` 평화 공존 / `'2'` 에스파냐 영토 지배, `london-palace-triumph`) 및 재방문 보존. 영국 밀사 타국 망명 금지(`canProtagonistDefect`).
    - **에르네스트 로페스(`ernst.original-core.*`, 10개 사건)**: 암스테르담 메르카토르 저택 세계지도 제작 계약(`cartographerContract: 'mercator'`, `amsterdam-mercator-contract`) 및 타 학자 계약 후 배신 복귀 시 전 명성 50% 삭감 페널티(`resolveMercatorBetrayalPenalty` / `halveAllFameInPlace`) ➔ 항구 출항(`amsterdam-harbor-departure`) ➔ 항해 이동 시 격자 해역 자동 측량(`recordChartedPosition`, `chartedCells`) 및 메르카토르 저택 지도 보고 정산(`reportChartedMap`, `reportedChartedCells`) ➔ 런던 주점 존 데이비스 조우(`london-pub-john-davis`) ➔ 암스테르담 파울라 동행 합류(`amsterdam-lodge-paula-joins`) ➔ 파울라 통역 합류(`pub-laura-interpreter`) ➔ 천주(`'95'`) 입항 시 장안(`'98'`) 해금(`zeiton-changan-route-unlock`, `unlockPortsInPlace(['98'])`) ➔ 장안 저택 파울라 고향 탐색 및 사카이(`'99'`)·나가사키(`'100'`) 해금(`changan-homeland-search`, `unlockPortsInPlace(['98', '99', '100'])`) ➔ 나가사키 여관 양친 재회(`nagasaki-parents-reunion`) ➔ 카이엔 루이스 로페스 조우(`cayenne-luis-lopez-meeting`) ➔ 암스테르담 메르카토르 세계지도 완성 보고 및 파울라 진로 2분기(`'1'` 다시 바다로 / `'2'` 정착과 교단, `amsterdam-world-atlas-completion`). 필수 경로 내 억지 전투 `0`건.
    - **피에트로 콘티(`pietro.original-core.*`, 15개 사건)**: 제노바 상인 길드 파브리스 가문 빚(`familyDebt: 5000`) 독촉(`genoa-debt-ultimatum`) ➔ 항구 카미유 합류(`genoa-harbor-camille-departure`) ➔ 리스본 프랑코 공작부인 저택 후원 계약(`collectorContract: 'duchess_franco'`, 선불 `3000`두카트, `lisbon-franco-patronage`) 및 타 수집가 계약 후 배신 복귀 시 전 명성 50% 삭감 페널티(`resolveCollectorBetrayalPenalty`) ➔ 제노바 가문 빚 변제(`genoa-fabris-debt-settlement`, `settleFamilyDebtInPlace`) ➔ 리스본 루치아 단서(`lisbon-lodge-lucia-clue`) ➔ 세우타 안토니오 소문(`ceuta-pub-antonio-rumor`) ➔ 알렉산드리아 주점 지도 상인에게 황금 메달리온 보물지도(`'87'`, `2000`두카트) 구입(`alexandria-pub-gold-map`) ➔ 산토도밍고(`'49'`) 조합(`'7'`)에서 실제 상륙 발굴(`excavateTreasure('p1-gold-medallion')`) ➔ 산토도밍고 카탈리나 구조(`santo-domingo-catalina-rescue`) ➔ 아덴 주점 성자의 지팡이 보물지도(`'88'`, `3000`두카트) 구입(`aden-pub-poseidon-map`) ➔ 바스라(`'77'`)에서 실제 상륙 발굴(`excavateTreasure('p2-poseidons-staff')` ➔ `'m3-staff-of-the-saint'` 획득) ➔ 나가사키 에르네스트 조우(`nagasaki-ernst-encounter`) ➔ 사카이 아버지 일지(`sakai-father-journal`) ➔ 세빌리아 도밍고 정보(`seville-pub-domingo-lead`) ➔ 리스본 알베르토 단서(`lisbon-pub-alberto-clue`) ➔ 카이엔 황금향과 아버지의 진실(`cayenne-el-dorado-father-legacy`) ➔ 리스본 프랑코 공작부인 저택 최종 발견물 보고 정산(`reportCollectorDiscoveries`) 및 완주 엔딩(`lisbon-franco-triumph`). 필수 경로 내 억지 전투 `0`건.
    - **알 베자스(`ali.original-core.*`, 18개 사건)**: 이스탄불 조선소(`istanbul-shipyard-loan`)·조합(`istanbul-guild-loan`)·주점(`istanbul-pub-loan`)·항구(`istanbul-harbor-departure`) 4대 투자자 후원금 수령(`collectAliInvestorInPlace`, 각 `investorDebts[key] = 2000`) 및 여관 사파의 선물(`istanbul-lodge-gift`) ➔ 교역소 매매로 자금 확보 후 조선소(`istanbul-shipyard-repay`)·조합(`istanbul-guild-repay`)·주점(`istanbul-pub-repay`)·항구(`istanbul-harbor-repay`) 각 2,000두카트 상환(`repayAliInvestorInPlace`, 선택지 `'1'` 상환 / `'2'` 유예 분기 포함) ➔ 라디아 여관(`lodge-ladia-repay`)·주점 라디노(`pub-radino-repay`)·조선소(`shipyard-shipwright-repay`) 추가 정산 ➔ 이스탄불 왕궁 첫 알현(`istanbul-palace-first-audience`) ➔ 알렉산드리아 피에트로 대여 분기(`alexandria-pietro-clue`, `'1'` 5,000두카트 대여 `setPietroLoanInPlace('lent')` / `'2'` 거절 `setPietroLoanInPlace('refused')`) ➔ 리스본 조안·루치아 단서(`lisbon-joao-lucia-clue`) ➔ 베네치아 하웰 저택 흥정(`venice-howell-pietro-debt`, 피에트로 대여 시 무상 양도 `grantHowellHouseFreeInPlace` / 미대여 시 금괴 시세 책정 `setHowellHousePriceInPlace`) ➔ 마사와 홍해 카탈리나 기습 해전(`ali.catalina-ambush`, `massawa-catalina-ambush`) ➔ 바스라 여동생 사파 재회 및 하웰 저택 기준가(`50` 금괴) 설정(`basra-sasha-reunion`) ➔ 오스만 동맹항 35개 이상(`getOttomanAlliedPortCount`), 4대 투자자 전액 상환(`areAllAliInvestorsRepaid`), 보유 자산 하웰 저택 기준가 충족(`wealthMeetsHowellPrice`) 후 이스탄불 왕궁 술탄 대재상 추대 엔딩(`istanbul-sultan-coronation`) 및 재방문 보존.
  - 한국어 현지화(`remake/src/localization/koreanOtto.ts`, `koreanErnst.ts`, `koreanPietro.ts`, `koreanAli.ts`, `koreanUi.ts`, `koreanTerms.ts`, `koreanCombat.ts`) 및 `koreanCoverage.test.ts` 전수 검증(`0` 누락, `0` 영어 fallback, 조건부 선택지 대사 `istanbulGuildRepay`/`istanbulPubRepay`/`istanbulHarborRepay`/`veniceHowellPietroDebt` 한·영 문장 수 1:1 완전 일치).
  - 단일 포터블 Windows 실행 파일(`remake/dist-desktop/UW2-Korean-Four-Captains.exe`) 빌드 및 실기 데스크톱 자동/수동 경계 검증(`verify-port-player-sprites.cjs`, `verify-four-protagonists-desktop.cjs` — `D1~D8` 전 항목 `PASS`, `D1~D3` 상태·좌표·자금·명성·아이템 직접 주입 `0`건).
  - 독립 `research` 서브에이전트(`44b301f9-7fcb-470a-b1a7-5bf13b697835`) 감사 및 코드대법원 1차 판결 지적사항(`F-01~F-06`) 전수 수정·재검증 완료.
- 수행하지 않은 작업:
  - 형님의 최종 전편 수동 플레이 인수(`U1~U6`) 및 후속 외부 Codex 최종 승인.
  - `main` 브랜치 병합 및 GitHub 정식 `Latest` 릴리스(`v0.3.1`) 승격.
- 수행하지 않은 이유:
  - 미션 지침(§1, §10 Stage 9, §13, §17)에 따라 에이전트는 개발 및 기술 검증 완료 후 `USER_FULL_PLAY_PENDING` 및 `CODEX_REVIEW_PENDING` 상태로 사전 릴리스(Pre-release) 후보를 인계하며, 사용자 인수를 임의로 부여하거나 `main`/`Latest`를 변경하는 것이 금지되어 있음.
- development_status: `READY_FOR_CODEX_REVIEW`
- codex_review_status: `CODEX_REVIEW_PENDING`
- user_acceptance_status: `USER_FULL_PLAY_PENDING`
- sourceCommit / toolCommit / publicationCommit 또는 receipt URL:
  - `sourceCommit`: `a594c83be6777105da5d612555d8890ce6ac6210` (`a594c83`)
  - `toolCommit`: `a594c83be6777105da5d612555d8890ce6ac6210` (`a594c83`)
  - `publicationCommit`: `remake/docs/four-protagonists/publication-receipt.json` 기록 커밋 (GitHub Pre-release Tag: `four-protagonists-candidate-20261109-a594c83`, URL: `https://github.com/KaronLabs/Uncharted-Waters-2/releases/tag/four-protagonists-candidate-20261109-a594c83`)
- EXE 파일명 / 바이트 / SHA256 / 다운로드:
  - 파일명: `UW2-Korean-Four-Captains.exe`
  - 바이트: `109,936,083` bytes
  - SHA256: `f4b3b9c77989b3aec854951aae265e3f5e65a4a2a5758af6f3f230c947669e8c`
  - 다운로드: `https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/four-protagonists-candidate-20261109-a594c83/UW2-Korean-Four-Captains.exe`

| 주인공 | 원작 본선·기능 | 한국어 | 저장/판본 | N8 | Windows D | 사용자 U | 남은 차단 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 옷토 | PASS (`otto.original-core.*` 19개 사건 + 매튜 결투·세빌리아 야간 갤리온 강탈·낭트/산토도밍고/보르도 해전·국왕 문답 2분기·망명 금지) | PASS (`koreanOtto.ts` 100%) | PASS (`v9`, `original-core-v1` / `legacy-remake` 분리 보존) | PASS | PASS (`D1~D8`) | PENDING | 없음 (`0`건) |
| 에르네스트 | PASS (`ernst.original-core.*` 10개 사건 + 메르카토르 계약/배신 페널티·해역 측량/보고 정산·천주/장안/사카이/나가사키 해금·진로 2분기·비전투 완주) | PASS (`koreanErnst.ts` 100%) | PASS (`v9`, `original-core-v1` / `legacy-remake` 분리 보존) | PASS | PASS (`D1~D8`) | PENDING | 없음 (`0`건) |
| 피에트로 | PASS (`pietro.original-core.*` 15개 사건 + 프랑코 후원 계약/배신 페널티·빚 변제·보물지도 `'87'`/`'88'` 구입 및 산토도밍고/바스라 실제 발굴·비전투 완주) | PASS (`koreanPietro.ts` 100%) | PASS (`v9`, `original-core-v1` / `legacy-remake` 분리 보존) | PASS | PASS (`D1~D8`) | PENDING | 없음 (`0`건) |
| 알 | PASS (`ali.original-core.*` 18개 사건 + 4대 투자자 대출/상환 원장·피에트로 대여/하웰 저택 분기·카탈리나 기습전·사파 재회·오스만 동맹 35항 및 대재상 추대) | PASS (`koreanAli.ts` 100%) | PASS (`v9`, `original-core-v1` / `legacy-remake` 분리 보존) | PASS | PASS (`D1~D8`) | PENDING | 없음 (`0`건) |

## 2. 변경 파일
| 파일 | 변경 내용 | 변경 이유 |
| --- | --- | --- |
| `remake/src/state/originalCore.ts` | `ScenarioEdition`, `OriginalCoreState`, 장안(`'98'`)·사카이(`'99'`)·나가사키(`'100'`) 잠금/해금, 격자 해역 측량(`getChartCellKey`), 오스만 동맹항 집계(`getAlliedPortsByCountry`), 하웰 저택 금괴 시세(`computeHowellHousePriceIngots`), `isValidOriginalCoreCandidate` 교차 불변식 정의 | 네 주인공 원작 핵심 상태 모델과 지형/기능/세이브 무결성 규칙을 순수 함수로 단일화 |
| `remake/src/state/actionsOriginalCore.ts` | `signCartographerContract`, `reportChartedMap`, `resolveMercatorBetrayalPenalty`, `signCollectorContract`, `resolveCollectorBetrayalPenalty`, `reportCollectorDiscoveries`, `purchaseTreasureMap`, `canExcavateTreasure`, `excavateTreasure`, `canProtagonistDefect`, `collectAliInvestorInPlace`, `repayAliInvestorInPlace`, `setPietroLoanInPlace`, `setHowellHousePriceInPlace`, `grantHowellHouseFreeInPlace` 구현 | 에르네스트 지도 정산/배신 페널티, 피에트로 발견물 정산/지도 구입/발굴, 알 투자자 대출/상환/하웰 저택, 옷토 망명 제한 액션 제공 |
| `remake/src/state/state.ts` | `GameState`에 `scenarioEdition` 및 `originalCore` 필드 추가 | 런타임 및 직렬화 상태에 판본과 원작 고유 진행 상태 통합 |
| `remake/src/state/protagonists.ts` | 옷토·에르네스트·피에트로·알 신규 게임 초기 상태를 `scenarioEdition: 'original-core-v1'` 및 원작 초기 자금/선박/동료/계약 상태로 설정 | 신규 게임 시작 시 원작 오프닝 및 초기 조건 보장 |
| `remake/src/state/saveMigrations.ts`, `remake/src/state/saveMigrations.test.ts` | `SAVE_VERSION = 9` 승격, 구형 `v1~v8` 저장을 `scenarioEdition: 'legacy-remake'`로 마이그레이션, `isValidOriginalCoreCandidate(..., candidate.storyEvents)` 검증 및 DOS `originalProgress` 비간섭 보장 | 구형 각색판 저장과 신규 원작판 저장의 무손실 분리 및 손상된 `v9` 페이로드 거부 |
| `remake/src/state/saveLoad.ts`, `remake/desktop/slotStore.cjs`, `remake/desktop/slotStore.test.cjs`, `remake/src/interface/desktopSlotStorage.ts`, `remake/src/interface/DesktopSlots.tsx`, `remake/src/interface/System.tsx` | 데스크톱 슬롯 `SAVE_VERSION = 9` 및 `hasValidOriginalCore` 교차 불변식 동기화, 구형 네 주인공 각색판 저장 로드 시 `LEGACY_ADAPTATION_SAVE_NOTICE_KO` 배지 표시 | 슬롯 저장/복원 왕복 일관성 및 구형 각색판/조안/카타리나 저장 보호 |
| `remake/src/state/actionsWorld.ts`, `remake/src/state/actionsDiscovery.ts`, `remake/src/state/selectors.ts`, `remake/src/game/world/world.test.ts` | 항해 중 에르네스트 해역 측량 자동 누적(`recordChartedPosition`), 잠금 항구(`isPortLocked`) 입항 차단 및 천주/장안 해금 연동 | 실제 항해·입항 조작이 원작 시나리오 관문과 직접 연동되도록 구현 |
| `remake/src/interface/port/Building.tsx`, `remake/src/interface/port/Palace.tsx`, `remake/src/interface/QuestJournal.tsx` | 메르카토르/프랑코 계약·배신 복귀 정산·지도 보고·발견물 보고·보물 상륙 발굴(`Excavate Treasure`)·망명 제한 메뉴 및 일지 원작 진행도 패널 연결 | 건물 UI에서 네 주인공 고유 행동을 실제 클릭으로 수행 |
| `remake/src/story/core/types.ts`, `remake/src/story/core/resolver.ts`, `remake/src/story/core/effects.ts`, `remake/src/story/core/validator.ts`, `remake/src/story/storyRuntimeActions.ts` | `scenarioEditions` 필터 및 원작 전용 조건/효과(`chartedCellsAtLeast`, `reportedChartedCellsAtLeast`, `reportedDiscoveriesAtLeast`, `allAliInvestorsRepaid`, `ottomanAlliedPortsAtLeast`, `wealthMeetsHowellPrice`, `royalRankAtLeast` 등) 추가 | 원작 핵심 사건이 실제 게임플레이 조건 충족 시에만 해금되도록 강제 |
| `remake/src/story/content/arcs/otto/original-core/*`, `ernst/original-core/*`, `pietro/original-core/*`, `ali/original-core/*`, `remake/src/story/content/arcs/*/events.ts`, `remake/src/story/content/catalogs.ts`, `remake/src/story/content/index.ts` | 네 주인공 `original-core` 62개 사건(옷토 19·에르네스트 10·피에트로 15·알 18, 전체 14개 아크 173개 사건) 정의 및 기존 `armada`/`worldmap`/`adventure`/`merchant` 아크에 `scenarioEditions: ['legacy-remake']` 지정 | 원작 핵심 루트 완결 및 구형 각색판 아크와의 충돌 완전 차단 |
| `remake/src/story/ottoJournal.ts`, `ernstJournal.ts`, `pietroJournal.ts`, `aliJournal.ts` | `original-core-v1`과 `legacy-remake` 판본별 퀘스트 일지 요약·다음 목표·진행도 표시 분기 | 일지에서 원작판 다음 행동과 고유 계약/탐사/발굴/상환 상태를 한국어로 안내 |
| `remake/src/combat/encounters.ts`, `remake/src/data/itemData.ts`, `remake/src/data/discoveryData.ts` | 원작 전용 해전/결투 인카운터(`otto.matthew-duel`, `otto.seville-pursuit`, `otto.nantes-armada`, `otto.santo-domingo-armada`, `otto.bordeaux-ezequiel`, `ali.catalina-ambush`) 및 보물지도(`'87'`, `'88'`)·발굴 랜드마크(`p1-gold-medallion`, `p2-poseidons-staff`) 등록 | 원작 핵심 사건의 보상·발굴지·결전 인카운터 완비 |
| `remake/src/localization/koreanOtto.ts`, `koreanErnst.ts`, `koreanPietro.ts`, `koreanAli.ts`, `remake/src/localization/dialogue/*.ts`, `remake/src/localization/catalogs.ts`, `combat.ts`, `koreanCombat.ts`, `koreanTerms.ts`, `koreanUi.ts`, `terms.ts`, `terms/descriptions.ts`, `ui.ts`, `koreanCoverage.test.ts` | 네 주인공 원작 핵심 대사·선택지·일지·전투·아이템·발견물·건물 메뉴 한국어 번역 및 커버리지 전수 검사 확장 | 영어 fallback `0`건 및 조건부 대사 분기 줄 수 1:1 일치 보장 |
| `remake/src/story/fourProtagonistsOriginalCore.test.tsx`, `remake/src/story/protagonistRoutes.test.ts`, `remake/src/story/storyProgress.test.ts`, `remake/src/story/contentManifest.test.ts`, `remake/src/story/content/arcs/joao/lisbon-opening/lisbonOpening.test.ts` | `N1~N8`, `F1~F8`, `E1~E8`, `R1~R8` 및 배신 페널티·장안 저택 퇴출 회귀 테스트 추가 | 네 주인공 전편 연쇄(62개 사건)·실패/엣지·회귀 경계 자동 검증 |
| `remake/scripts/verify-four-protagonists-desktop.cjs`, `remake/scripts/verify-port-player-sprites.cjs`, `remake/package.json` | 단일 포터블 EXE(`UW2-Korean-Four-Captains.exe`) 빌드 설정 및 `D1~D8` 실기 데스크톱 자동 검증 스크립트(`D1~D3` 순수 `D-NATURAL` 항해/교역/발굴/측량 조작) 구현 | 패키징된 Windows 실행 파일에서 실제 UI 조작으로 `D1~D8` 및 6주인공 스프라이트 검증 |
| `remake/docs/four-protagonists/source-matrix.md`, `progress.json`, `manifest.json`, `completion-report.md`, `publication-receipt.json`, `evidence/**` | 원작 대조표(62개 이벤트 전수 매핑), 진행 상태, 해시 매니페스트, 최종 보고서, 릴리스 수신 영수증 및 `sprites-run-1`/`desktop-run-1` 증거 패키지 기록 | 미션 §13·§17·§18 인수인계 및 재현성 완결 |

## 3. 실행한 명령
| cwd·명령 | 실제 종료코드·결과 | 출력 요약·근거 경로 |
| --- | --- | --- |
| `remake` · `npm run verify:assets` | `0` (PASS) | 78개 필수 PNG/OGG/MP3 자산 및 SHA256 무결성 통과 |
| `remake` · `npm run story:validate` | `0` (PASS) | 14개 아크 173개 스토리 이벤트(`original-core` 62개 포함) 그래프·조건·보상·분기 무결성 통과 |
| `remake` · `npx prettier --check src/ tests/ scripts/` | `0` (PASS) | 모든 대상 파일 포맷팅 기준 일치 (`0` warnings/errors) |
| `remake` · `npx jest --runInBand` | `0` (PASS) | `128 passed, 128 total` suites (`1,117 passed, 1,117 total` tests) |
| `remake` · `npm run test:slots` | `0` (PASS) | `desktop/slotStore.test.cjs` `5 passed, 0 failed` (`v9` 및 `scenarioEdition`·`originalCore` 슬롯 격리 검증) |
| `remake` · `npm run typecheck` | `0` (PASS) | `tsc --noEmit` 타입 오류 `0`건 |
| `remake` · `npx tsc --noEmit -p tests/tsconfig.json` | `0` (PASS) | `tests/` 프로젝트 타입 오류 `0`건 |
| `remake` · `npm run lint` | `0` (PASS) | ESLint 오류 `0`건 |
| `remake` · `npm run build:webpack` | `0` (PASS) | 프로덕션 웹팩 번들 컴파일 성공 |
| `remake` · `npm run dist:portable` | `0` (PASS) | `dist-desktop/UW2-Korean-Four-Captains.exe` (`109,936,083` bytes, SHA256 `f4b3b9c77989b3aec854951aae265e3f5e65a4a2a5758af6f3f230c947669e8c`) 생성 |
| `remake` · `node scripts/verify-port-player-sprites.cjs --exe dist-desktop/UW2-Korean-Four-Captains.exe --artifacts docs/four-protagonists/evidence/sprites-run-1 --port 9361` | `0` (PASS) | 6주인공(`joao`, `katarina`, `otto`, `ernst`, `pietro`, `ali`) 항구/항해 스프라이트 타일 대조 통과 (`docs/four-protagonists/evidence/sprites-run-1/summary.json`) |
| `remake` · `node scripts/verify-four-protagonists-desktop.cjs --exe dist-desktop/UW2-Korean-Four-Captains.exe --artifacts docs/four-protagonists/evidence/desktop-run-1 --port 9362` | `0` (PASS) | `D1~D8` 전 항목 PASS, 콘솔/페이지/네트워크 오류 `0`건, 개인 슬롯 해시 불변 (`docs/four-protagonists/evidence/desktop-run-1/summary.json`) |

## 4. 테스트 결과
| 영웅·검사 ID | S/T/D-NATURAL/D-DIAGNOSTIC/U | 결과 | 실행 기준·비고 |
| --- | --- | --- | --- |
| 공통·네 주인공 `N1` | `T` + `D-NATURAL` | PASS | 네 주인공 신규 게임 시작 시 `scenarioEdition === 'original-core-v1'`, 원작 초기 자금/선박/동료/시작 항구 일치 |
| 옷토 `N2` | `T` + `D-NATURAL` | PASS | 런던 왕궁 사략 허가서(`'33'`) ➔ 길버트 합류 ➔ 출항 준비 ➔ 매튜 결투(`otto.matthew-duel`) 승리 및 영입 ➔ 세빌리아 야간 갤리온 강탈 연쇄 |
| 에르네스트 `N3` | `T` + `D-NATURAL` | PASS | 메르카토르 계약(`cartographerContract: 'mercator'`) ➔ 실제 해역 항해 측량(`chartedCells`) 및 지도 보고 정산(`reportChartedMap`) ➔ 파울라/통역 합류 ➔ 천주(`'95'`)·장안(`'98'`)·나가사키(`'100'`) 해금 |
| 피에트로 `N4` | `T` + `D-NATURAL` | PASS | 제노바 채무 독촉/카미유 합류 ➔ 리스본 프랑코 공작부인 후원 계약(`collectorContract: 'duchess_franco'`) ➔ 제노바 빚 변제 ➔ 알렉산드리아/아덴 보물지도(`'87'`, `'88'`) 구입 및 산토도밍고(`'49'`)/바스라(`'77'`) 실제 상륙 발굴(`excavateTreasure`) |
| 알 `N5` | `T` + `D-NATURAL` | PASS | 이스탄불 4대 투자자(`shipyard`, `guild`, `pub`, `harbor`) 후원금 수령 ➔ 실제 교역소 매매 차익으로 자금 확보 후 투자자 상환(`repayAliInvestorInPlace`) |
| 네 주인공 `N6` | `T` + `D-NATURAL` | PASS | 옷토 국왕 문답(`'1'`/`'2'`), 에르네스트 계약/배신 복귀 및 파울라 진로(`'1'`/`'2'`), 피에트로 계약/배신 복귀, 알 투자자 상환/유예 및 피에트로 대여(`'1'`/`'2'`) 분기 상태·일지·보상 반영 |
| 네 주인공 `N7` | `T` + `D-NATURAL` | PASS | `SAVE_VERSION = 9` 저장/복원 후 `scenarioEdition`, `originalCore`, 계약/지도/채무/왕실 작위 상태 100% 일치 |
| 네 주인공 `N8` | `T` | PASS | `fourProtagonistsOriginalCore.test.tsx`에서 옷토(19)·에르네스트(10)·피에트로(15)·알(18) 총 62개 `original-core` 사건 오프닝부터 엔딩 및 재방문까지 전편 연쇄 완주 검증 |
| 실패/음성 `F1~F8` | `T` | PASS | 잘못된 항구/건물/순서(`F1`), 자금 부족(`F2`), 미발굴/미측량 상태 보고 거부(`F3`), 전투 패배 후 재도전 복구(`F4`), 손상된 슬롯 JSON 및 불일치 `originalCore` 격리 거부(`F5`), 구형 각색판/타 영웅 이벤트 차단(`F6`), 중복 수령/중복 상환 방지(`F7`), 엔딩 전 후속 사건 차단(`F8`) 전부 통과 |
| 엣지케이스 `E1~E8` | `T` | PASS | 아래 `## 5. 엣지케이스 검증` 표 참조 |
| 회귀 `R1~R8` | `T` + `D-NATURAL` | PASS | 조안/카타리나 무간섭(`R1`), `v1~v8` 각색판 저장 마이그레이션(`R2`), 6주인공 교차 로드 분리(`R3`), 단일 BGM 생명주기(`R4`), 6주인공 스프라이트/창 제목(`R5`), 일반 항해/입항/교역/발견/왕궁/은행(`R6`), 미지 이벤트 ID 및 DOS `originalProgress` 보존(`R7`), 증거 집계 무결성(`R8`) 통과 |
| 데스크톱 `D1` | `D-NATURAL` | PASS | 패키징된 EXE에서 네 주인공 각각 새 게임 UI 시작 ➔ 실제 마을 이동 ➔ 첫 필수 건물 사건 ➔ 첫 정상 출항 (`desktop-run-1/summary.json`) |
| 데스크톱 `D2` | `D-NATURAL` | PASS | 상태/좌표/자금/명성 주입 없이 옷토 결투/매튜 영입, 에르네스트 북해 실항해 측량/메르카토르 보고, 피에트로 리스본➔제노바➔알렉산드리아 지도 구입➔산토도밍고 실제 발굴➔리스본 보고, 알 이스탄불↔아테네 교역 매매 후 조선소 투자자 상환 UI 실행 |
| 데스크톱 `D3` | `D-NATURAL` | PASS | 상태/좌표 주입 없이 에르네스트 천주(`'95'`)·장안(`'98'`)·나가사키(`'100'`) 및 피에트로 산토도밍고(`'49'`)·리스본(`'1'`) 실제 항해 입항 및 필수 건물 진입 완료 |
| 데스크톱 `D4` | `D-NATURAL` | PASS | `1280x720@1x`, `800x600@1x`, `800x600@1.5x` 해상도에서 한국어 대사·선택지·일지 오버플로 `0`건, 버튼 클릭 가능 확인 |
| 데스크톱 `D5` | `D-NATURAL` | PASS | 네 주인공 슬롯 저장 ➔ 앱 완전 종료 ➔ 동일 EXE 재실행 ➔ 슬롯 UI 로드 ➔ 다음 건물 행동 정상 수행 |
| 데스크톱 `D6` | `D-NATURAL` | PASS | 구형 `v8` 옷토 각색판 저장 로드 시 `scenarioEdition: 'legacy-remake'` 및 안내 배지 표시, 조안/카타리나 로드 시 배지 미표시 확인 |
| 데스크톱 `D7` | `D-DIAGNOSTIC` (후반 직전 상태 준비) + `D-NATURAL` (최종 사건·엔딩·저장/복원·재방문 조작) | PASS | 네 주인공 최종 관문 직전 상태에서 실제 UI 입력으로 최종 해전/사건 승리, 엔딩 배너 확인, 저장/로드 후 왕궁/저택 재방문 확인 (전편 도달성은 `N8` + `D1~D3`로 입증) |
| 데스크톱 `D8` | `D-NATURAL` | PASS | 6주인공 교차 로드, 단일 BGM 재생, 오프라인 동작, 콘솔/페이지/네트워크 오류 `0`건, 개인 슬롯 해시 불변 |
| 사용자 인수 `U1~U6` | `U` | `USER_FULL_PLAY_PENDING` | 아래 `## 8. 다음 반복 추천 작업`의 주인공별 `U1~U6` 인수 체크리스트 참조 |

## 5. 엣지케이스 검증
| 케이스 | 결과 | 기대/관측·근거 |
| --- | --- | --- |
| `E1` 자금 경계값에서 보물지도 구입·가문 빚 변제·투자자 상환 | PASS | 정확히 필요 금액 이상일 때 정상 차감되며, 부족 시 상태 변경 없이 거절 또는 유예 분기 처리됨 (`fourProtagonistsOriginalCore.test.tsx`) |
| `E2` 에르네스트·피에트로 타 후원자 계약(`'other'`) 후 메르카토르/프랑코 공작부인 복귀 시 배신 페널티 | PASS | `resolveMercatorBetrayalPenalty` 및 `resolveCollectorBetrayalPenalty` 실행 시 모험·해적·교역 명성이 모두 `Math.floor(fame / 2)`로 반감된 뒤 본 계약으로 전환됨 (`fourProtagonistsOriginalCore.test.tsx`) |
| `E3` 야간 전용 사건(옷토 리스본 야간 주점·세빌리아 야간 잠입/갤리온 강탈, 알 이스탄불 왕궁 알현 등) 주간 차단 및 야간 진입 | PASS | 주간에는 야간 전용 사건이 발동하지 않고 일반 건물 메뉴가 열리며, 야간 시간대 진입 시 정확히 단계별 사건이 발동함 (`fourProtagonistsOriginalCore.test.tsx`, `D7`) |
| `E4` 에르네스트·피에트로 비전투 완주 경로 및 옷토/알 해전 패배 후 복구 | PASS | 에르네스트·피에트로는 필수 전투 없이 엔딩까지 완주 가능하며, 옷토·알 해전/결투 패배 시에도 세이브 손상 없이 재도전 가능 (`fourProtagonistsOriginalCore.test.tsx`) |
| `E5` 알 피에트로 5,000두카트 대여(`'lent'`) vs 거절(`'refused'`)에 따른 베네치아 하웰 저택 인수 조건 분기 | PASS | 대여 시 베네치아 하웰 저택을 무상 취득(`howellHouseAcquired: true`)하고, 거절 시 보유 금괴+할증(`computeHowellHousePriceIngots`) 기준가가 부과됨 (`fourProtagonistsOriginalCore.test.tsx`) |
| `E6` 구형 `v8` 저장과 신규 `v9` 저장 교차 로드, 손상된 `originalCore` 불변식 검증 및 `originalProgress` 보존 | PASS | `v8` 저장 로드 시 `scenarioEdition: 'legacy-remake'`로 변환되고, `storyEvents`와 모순되는 손상된 `v9` `originalCore`는 `isValidOriginalCoreCandidate`에서 차단되며, DOS `originalProgress` 필드는 변조 없이 보존됨 (`saveMigrations.test.ts`, `slotStore.test.cjs`, `D6`) |
| `E7` `800x600` 최소 창 및 `1.5x` 배율에서 긴 한국어 대사·다중 선택지·일지 표시 | PASS | `800x600@1x` 및 `800x600@1.5x`에서 선택지 버튼이나 일지 탭이 화면 밖으로 잘리지 않고 정상 클릭 가능 (`desktop-run-1/summary.json` `D4`) |
| `E8` 엔딩 달성 직후 저장 ➔ 리로드 ➔ 재방문 시 중복 엔딩/중복 보상 방지 | PASS | 네 주인공 모두 엔딩 달성 후 왕궁/저택 재방문 시 중복 보상이나 무한 엔딩 루프가 발생하지 않고 완료 상태가 유지됨 (`fourProtagonistsOriginalCore.test.tsx`, `D7`) |

## 6. 남은 위험
- 확인됨:
  - 기술적 차단 결함 `0`건. `npm run verify`, `npx tsc --noEmit -p tests/tsconfig.json`, `npm run test:slots`, `verify-port-player-sprites.cjs`, `verify-four-protagonists-desktop.cjs`(`D1~D8`), 코드대법원 1차 지적사항(`F-01~F-06`) 수정 검증 모두 통과.
- 불확실:
  - 원작 DOS(`SNR3.MES`~`SNR6.MES`)의 비필수 배경 잡담 대사 일부는 핵심 본선 62개 `original-core` 이벤트 내에 통합 복원됨(`source-matrix.md`에 근거 명시).
- 추정 및 검증 방법:
  - 장시간 수동 플레이 시 개인별 체감 난이도(교역 자금 확보 동선, 해역 측량 속도 등)는 형님의 `U1~U6` 실기 플레이에서 추가 확인 가능.
- 원작과의 의도적 차이 및 제외 근거:
  - 기존 리메이크의 각색판 아크(`otto.armada`, `ernst.worldmap`, `pietro.adventure`, `ali.merchant`)는 삭제하지 않고 `scenarioEditions: ['legacy-remake']`로 격리 보존함(구형 `v1~v8` 세이브 파일 호환성 유지 목적).
  - 에르네스트·피에트로 본선에서 원작에 없던 억지 필수 해전 게이트를 제거하고 비전투 완주 구조로 복원함(§7 규칙 6 준수).
- 사용자 전편 인수 대기:
  - `user_acceptance_status: USER_FULL_PLAY_PENDING` (형님의 `U1~U6` 수동 플레이 인수 대기).
  - `codex_review_status: CODEX_REVIEW_PENDING` (후속 독립 Codex 검수 대기).
- 환경 차단/미실행과 영향:
  - 차단 사항 없음 (`0`건).

## 7. 점수표
| 항목 | 배점 | 자체 평가 | 근거 |
| --- | ---: | ---: | --- |
| 요구사항 충족도 | 20 | 20 | 옷토·에르네스트·피에트로·알 네 주인공 각각의 원작 핵심 관문(`G1~G5`, `G7`), 고유 게임플레이 메커니즘, 한국어 번역, 단일 EXE 인계 완결 (`source-matrix.md`) |
| 구현 정확성 | 20 | 20 | 네 주인공 `N8` 전편 연쇄(62개 `original-core` 사건), 분기 선택지/배신 페널티/하웰 저택/망명 금지, 실패 복구, 비전투 완주, 엔딩 및 재방문 의미 100% 일치 |
| 테스트 충실도 | 15 | 15 | 정상 연쇄(`N1~N8`, 5점), 실패/엣지 음성 대조(`F1~F8`, `E1~E8`, 5점), 최종 패키징 EXE 실기 검증(`D1~D8`, `D1~D3` 무주입 `D-NATURAL`, 5점) 모두 실제 실행 통과 |
| 회귀 위험 관리 | 10 | 10 | `v9` 판본 분리 및 `v1~v8` 마이그레이션(4점), 조안·카타리나 무간섭(3점), 6주인공 스프라이트·단일 BGM·공용 UI 회귀(3점) 모두 `R1~R8` 및 `D6/D8` 통과 |
| 보안/운영 안전성 | 10 | 10 | 격리 `--user-data-dir` 및 `--slots-dir` 사용, 형님 개인 슬롯(`uw2-slot-1.json`) SHA256 전후 불변 확인(5점), 명시적 경로 스테이징 및 `main`/`Latest` 보존(5점) |
| 유지보수성 | 10 | 9 | 기존 스토리 리졸버/액션 엔진 재사용(4점), `originalCore.ts`/`actionsOriginalCore.ts` 단일 상태 모듈화(3점), 깔끔한 diff 유지(2/3점 — 4인 대사·이벤트 분량에 따른 파일 추가) |
| 문서화/인수인계 | 10 | 10 | `source-matrix.md` 원작 62개 이벤트 전수 대조(4점), `completion-report.md` 및 `manifest.json`/`progress.json` 단일 진입 문서(3점), GitHub 사전 릴리스 재수신 검증 및 `publication-receipt.json`(3점) |
| 최종 보고 품질 | 5 | 5 | 영웅별 판정표, `S/T/D-NATURAL/D-DIAGNOSTIC/U` 증거 등급 구분, 남은 위험, 정확한 다운로드 URL 및 해시 기록 완비 |
| 합계 | 100 | **99** | **즉시 적용 후보 (95점 이상, 모든 필수 게이트 및 DoD 100% 충족)** |

## 8. 다음 반복 추천 작업
1. 미완료라면 가장 작은 수정과 판정 기준:
   - 모든 필수 개발 및 자동/데스크톱 검증(`N1~N8`, `F1~F8`, `E1~E8`, `R1~R8`, `D1~D8`)이 완료되어 미완료 개발 항목 없음.
2. 필수 완료라면 후속 Codex 독립 검수 시작점:
   - 브랜치 `codex/four-protagonists-original-core` (태그 `four-protagonists-candidate-20261109-a594c83`, `sourceCommit` `a594c83be6777105da5d612555d8890ce6ac6210`) 체크아웃.
   - `remake/docs/four-protagonists/source-matrix.md`, `manifest.json`, `completion-report.md`, `publication-receipt.json` 확인.
   - `npm run verify && npx tsc --noEmit -p tests/tsconfig.json && npm run test:slots` 실행 후 `docs/four-protagonists/evidence/desktop-run-1/summary.json` 및 `sprites-run-1/summary.json` 대조.
3. 형님 전편 인수 `U1~U6` 및 기대 결과:

### 형님 전편 수동 인수 체크리스트 (`U1~U6`)

#### A. 옷토 스피노라 (`otto`)
| 단계 | 실제 장소·필요 행동 | 기대 결과 | 불일치 신고 항목 | 완료 표시 |
| --- | --- | --- | --- | --- |
| `U1` | 새 게임에서 옷토 선택 ➔ 런던 왕궁 진입(헨리 8세 사략 허가서 `'33'`·300두카트·길버트 합류) ➔ 항구 출항 준비 ➔ 런던 주점 진입(매튜 결투 승리·영입) ➔ 첫 출항 | 판본 `original-core-v1`, 초기 함대/동료/사략 허가서 정상, 런던 출항 정상 | 왕궁/항구/주점 사건 미발동, 결투 후 매튜 미합류, 영어 문구 노출 | [ ] |
| `U2` | 리스본 야간 주점(훌리오 소식) ➔ 세빌리아 주점/조선소 정찰 ➔ 야간 잠입 경비전 승리 및 야간 항구 에스파냐 갤리온 강탈 ➔ 세빌리아 여관 수색 | 야간 선박 강탈 성공, 갤리온 함대 편입, 일지 목표 갱신 | 주간에 강탈 발동, 야간 진입 시 진행 막힘 | [ ] |
| `U3` | 귀환 포고령 확인 ➔ 세우타 주점(매튜 반발) ➔ 런던 왕궁(해임 위기) ➔ 낭트 항구 제1함대 격파 ➔ 보르도 주점(에제키엘 도발) | 낭트 해전 승리 및 보르도 에제키엘 대면 정상 진행 | 해전 미발동, 패배 후 재도전 불가 | [ ] |
| `U4` | 데스크톱 슬롯 저장 ➔ 게임 종료 ➔ EXE 재실행 ➔ 슬롯 불러오기 후 카이엔·산토도밍고 항해 | `originalCore` 및 스토리 진행도 보존, 카이엔 카탈리나 공투 및 산토도밍고 해전 정상 발동 | 로드 후 작위/이벤트 유실, 판본 변경 | [ ] |
| `U5` | 세빌리아 주점(최종 결전 제보) ➔ 보르도 항구 에제키엘 무적함대 기함 결전 승리 ➔ 런던 왕궁 야간 귀환 및 국왕 문답(`'1'` 또는 `'2'`) 선택 | 무적함대 격파 및 선택한 국왕 문답에 따른 옷토 원작 엔딩 배너 표시 | 결전 미발동, 문답 선택지 잘림, 엔딩 미표시 | [ ] |
| `U6` | 엔딩 후 슬롯 저장·복원 ➔ 런던 왕궁 재방문 | 완료 상태 및 보상 보존, 중복 엔딩 무한 루프 없음 | 로드 후 엔딩 무한 반복 또는 골드 중복 지급 | [ ] |

#### B. 에르네스트 로페스 (`ernst`)
| 단계 | 실제 장소·필요 행동 | 기대 결과 | 불일치 신고 항목 | 완료 표시 |
| --- | --- | --- | --- | --- |
| `U1` | 새 게임에서 에르네스트 선택 ➔ 암스테르담 메르카토르 저택(`'34'`, `'8'`)에서 세계지도 계약 체결 ➔ 암스테르담 항구(`'4'`) 진입 후 첫 출항 | 판본 `original-core-v1`, `cartographerContract: 'mercator'`, 출항 정상 | 저택 계약 미발동, 항구 출항 안내 누락 | [ ] |
| `U2` | 북해·대서양 항해로 해역 격자 측량(`chartedCells`) 누적 후 암스테르담 메르카토르 저택에서 지도 보고 정산 ➔ 런던 주점(존 데이비스) ➔ 암스테르담 여관(파울라 합류) ➔ 주점(통역 합류) | 해역 측량 보고 시 정산금·모험 명성 획득, 파울라 합류 및 통역 확보 | 항해 후에도 측량 카운트 0, 지도 보고 메뉴 미표시 | [ ] |
| `U3` | 천주(`'95'`) 입항하여 장안 항로 해금 ➔ 장안(`'98'`) 입항 및 저택 방문하여 파울라 고향 탐색 및 사카이(`'99'`)·나가사키(`'100'`) 해금 | 천주·장안·나가사키 순차 해금 및 입항, 장안 저택 정상 방문/퇴출 | 장안/나가사키 잠금 해제 안 됨, 저택 퇴출 불가 | [ ] |
| `U4` | 장안 또는 나가사키 여관(양친 재회) 후 슬롯 저장 ➔ 앱 완전 종료 ➔ 재실행 후 슬롯 로드 ➔ 카이엔 항해 | 측량 해역(`chartedCells`/`reportedChartedCells`)·잠금 해제 항구(`lockedPorts`) 완벽 보존 | 로드 후 해역 측량 유실, 장안/나가사키 재잠금 | [ ] |
| `U5` | 카이엔(루이스 로페스 조우) 및 전 세계 해역 측량·보고 달성 후 암스테르담 메르카토르 저택에서 세계지도 완성 및 진로 선택(`'1'` 또는 `'2'`) | 필수 억지 해전 없이 세계지도 완성 및 에르네스트 엔딩 배너 표시 | 억지 전투 강제, 조건 달성 후에도 엔딩 미발동 | [ ] |
| `U6` | 엔딩 후 슬롯 저장·복원 ➔ 암스테르담 메르카토르 저택 재방문 | 완료 상태 보존 및 중복 엔딩 루프 없음 | 재방문 시 상태 손상 | [ ] |

#### C. 피에트로 콘티 (`pietro`)
| 단계 | 실제 장소·필요 행동 | 기대 결과 | 불일치 신고 항목 | 완료 표시 |
| --- | --- | --- | --- | --- |
| `U1` | 새 게임에서 피에트로 선택 ➔ 제노바 조합(`'9'`, `'7'`) 채무 독촉 확인 ➔ 제노바 항구(`'4'`) 카미유 합류 후 출항 ➔ 리스본 프랑코 공작부인 저택(`'1'`, `'8'`) 후원 계약(`3,000`두카트) | 판본 `original-core-v1`, `collectorContract: 'duchess_franco'`, 카미유 합류 | 제노바/리스본 초기 사건 미발동 | [ ] |
| `U2` | 제노바 조합 복귀하여 가문 빚 변제(`familyDebt === 0`) ➔ 리스본 여관(루치아 단서) ➔ 세우타 주점(안토니오 소문) ➔ 알렉산드리아 주점(`'19'`, `'2'`)에서 황금 메달리온 지도(`'87'`) 구입 | 가문 빚 청산 완료, 보물지도 `'87'` 인벤토리 등록 | 빚 변제 후에도 `familyDebt` 잔존, 지도 미지급 | [ ] |
| `U3` | 산토도밍고(`'49'`) 조합(`'7'`)에서 보물 발굴(`p1-gold-medallion`) 및 카탈리나 구조 ➔ 아덴 주점(`'73'`, `'2'`)에서 지도(`'88'`) 구입 후 바스라(`'77'`)에서 성자의 지팡이(`p2-poseidons-staff`) 발굴 | 목표 항구에서 실제 발굴 버튼으로 유물 발견 및 리스본 공작부인 보고 정산 가능 | 지도 없이 발굴 가능하거나 목표 항구에서 발굴 버튼 미표시 | [ ] |
| `U4` | 발굴 후 슬롯 저장 ➔ 앱 종료 ➔ 재실행 후 슬롯 로드 ➔ 나가사키(에르네스트 조우) 및 사카이(아버지 일지) 진행 | `collectorContract`, `discoveries`, `reportedDiscoveries` 보존 | 로드 후 계약/발굴 내역 초기화 | [ ] |
| `U5` | 세빌리아 주점(도밍고) ➔ 리스본 주점(알베르토) ➔ 카이엔(엘도라도·아버지 유산 진실) ➔ 리스본 프랑코 공작부인 저택 최종 보고 및 엔딩 | 비전투 완주 가능하며 리스본 저택에서 최종 승리 및 피에트로 엔딩 배너 표시 | 정산 후 엔딩 미발동 | [ ] |
| `U6` | 엔딩 후 슬롯 저장·복원 ➔ 리스본 저택 재방문 | 완료 상태 보존 및 중복 보상/루프 없음 | 재방문 시 오류 발생 | [ ] |

#### D. 알 베자스 (`ali`)
| 단계 | 실제 장소·필요 행동 | 기대 결과 | 불일치 신고 항목 | 완료 표시 |
| --- | --- | --- | --- | --- |
| `U1` | 새 게임에서 알 선택 ➔ 이스탄불 조선소·조합·주점·항구에서 4대 투자자 후원금 수령 및 여관 사파 선물 수령 ➔ 첫 출항 | 판본 `original-core-v1`, `investorCollected` 4곳 활성화 및 `investorDebts` 각 2,000두카트 기록 | 후원금 미지급, 채무 원장 미갱신 | [ ] |
| `U2` | 교역소 상품 매매로 자금 확보 후 이스탄불 조선소·조합·주점·항구 재방문하여 투자자 채무(각 2,000두카트) 상환(`'1'` 상환 선택) | 상환 시 2,000두카트 차감 및 `investorRepaid` `true` 전환 (`'2'` 유예 선택 시 미상환 유지 및 재방문 상환 가능) | 자금 차감 오류, 유예 선택 시 재방문 불가 | [ ] |
| `U3` | 이스탄불 야간 왕궁 첫 알현 ➔ 알렉산드리아 주점 피에트로 조우(`'1'` 5,000두카트 대여 또는 `'2'` 거절) ➔ 리스본 여관(조안·루치아) ➔ 베네치아 은행(하웰 저택 흥정) | 피에트로 대여 여부에 따라 베네치아 하웰 저택 무상 양도 또는 금괴 기준가 책정 | 분기 선택 결과가 베네치아 사건에 반영되지 않음 | [ ] |
| `U4` | 슬롯 저장 ➔ 앱 종료 ➔ 재실행 후 슬롯 로드 ➔ 마사와 항구(카탈리나 기습 해전 `ali.catalina-ambush`) 및 바스라 주점(여동생 사파 재회) 진행 | `investorRepaid`, `pietroLoan`, `howellHousePriceIngots` 보존, 마사와 해전 및 바스라 사파 재회 정상 진행 | 로드 후 투자자 상환/대여 상태 유실 | [ ] |
| `U5` | 오스만 동맹항 35곳 이상 확보, 4대 투자자 전액 상환, 하웰 저택 기준 자산 충족 후 이스탄불 야간 왕궁 진입(`istanbul-sultan-coronation`) | 술탄 대재상 추대 및 알 엔딩 배너(`알의 성공`) 표시 | 조건 미충족 시 발동하거나 충족 후 미발동 | [ ] |
| `U6` | 엔딩 후 슬롯 저장·복원 ➔ 이스탄불 야간 왕궁 재방문 | 완료 상태 및 골드/작위 보존, 중복 엔딩 루프 없음 | 재방문 시 골드 중복 지급 또는 무한 루프 | [ ] |

## 원격 수신과 보존 확인
- 받은 source/LFS/EXE/ZIP·해시 비교:
  - GitHub 사전 릴리스(`four-protagonists-candidate-20261109-a594c83`)에 업로드된 3개 자산(`UW2-Korean-Four-Captains.exe`, `UW2-Four-Protagonists-evidence-20261109-a594c83.zip`, `UW2-Four-Protagonists-20261109-a594c83.sha256.txt`)을 임시 디렉터리로 재다운로드하여 로컬 원본과 바이트 크기 및 SHA256 해시 100% 일치 확인(`remake/docs/four-protagonists/publication-receipt.json` 기록).
- 사용자 슬롯/기존 dirty 파일/프로세스 보존:
  - 개인 슬롯 `%APPDATA%\UW2-QCaine-Preview\slots\uw2-slot-1.json` (`1,267` bytes, SHA256 `b90d966f522bf38fc4c7fe8404ced1582f4050f8c5fc0d7f13ce910cb5d7412e`) 전후 해시 불변 확인.
  - 워크트리 루트의 기존 비추적 폴더(`docs/`, `review/`) 수정/스테이징 없이 보존.
  - 모든 검증 Electron/Node 시험 프로세스 종료 확인(`0` orphan processes).
- 기존 main/Latest/릴리스 보존:
  - `main` 브랜치 변경 없음.
  - GitHub 정식 `Latest` 릴리스(`v0.3.1`, `isLatest: true`) 및 기존 후보 태그(`catalina-candidate-*`, `four-protagonists-candidate-20261109-0c4a485`) 변경/덮어쓰기 없음.
- 임시 정리 여부와 정책 거부:
  - 재다운로드 검증용 임시 폴더 정리 완료. 정책 거부 발생 `0`건.

---

## §18. 다음 에이전트에게 남기는 인수인계 메모

1. **호스트·checkout·작업 브랜치·원격·정확한 HEAD와 기준 후보 SHA**:
   - 호스트 OS: Windows (`pwsh`).
   - 워크트리 경로: `<WORKTREE_ROOT>` (제품 루트: `remake`).
   - 원격 저장소: `origin` = `https://github.com/KaronLabs/Uncharted-Waters-2.git`.
   - 기준 후보 커밋(Base SHA): `e87968bc3d051600b9f23a04a602f87c1a3a8c75` (`e87968b`, 태그 `catalina-candidate-20261108-57f5416-sprites`).
   - 작업 브랜치: `codex/four-protagonists-original-core`.
   - 소스 및 도구 커밋(`sourceCommit` / `toolCommit`): `a594c83be6777105da5d612555d8890ce6ac6210` (`a594c83`).
2. **사용자 결정**:
   - **네 명(옷토·에르네스트·피에트로·알) 모두 원작 핵심 시나리오(`original-core-v1`) 기준 완결.** 기존 각색 루트(`armada`, `worldmap`, `adventure`, `merchant`)를 단순 번역하거나 방문 보상으로 대체하는 축소는 절대 금지됨.
3. **영웅별 G/DoD와 아직 남은 원작 관문, `source-matrix.md` 위치 및 원문 불확실성**:
   - 원작 대조표 위치: `remake/docs/four-protagonists/source-matrix.md`.
   - 네 주인공 모두 `G1~G5`, `G7` 및 `N8` 전편 연쇄(62개 `original-core` 이벤트), `D1~D8` 실기 검증까지 100% 통과하여 남은 미구현 원작 관문은 `0`건임.
   - 원작 DOS `SNR3.MES`~`SNR6.MES`의 비필수 배경 대사 일부는 핵심 서사 62개 이벤트 내에 통합되었으며, 상세 이벤트 ID·항구/건물·선택지·금화/명성 매핑은 `source-matrix.md`에 전수 기록됨.
4. **`scenarioEdition`과 migration 규칙, 기존 각색/조안/카타리나 저장 보호 방식**:
   - `SAVE_VERSION = 9` (`remake/src/state/saveMigrations.ts`, `remake/desktop/slotStore.cjs`).
   - 신규 옷토·에르네스트·피에트로·알 게임은 `scenarioEdition: 'original-core-v1'`을 부여받고 `<hero>.original-core.<event>` 아크만 활성화됨.
   - 구형 `v1~v8` 저장은 로드 시 `scenarioEdition: 'legacy-remake'`로 마이그레이션되어 기존 `<hero>.armada` / `worldmap` / `adventure` / `merchant` 진행을 그대로 이어가며, 옷토·에르네스트·피에트로·알의 `legacy-remake` 저장만 시스템 창 및 일지에 `LEGACY_ADAPTATION_SAVE_NOTICE_KO` 안내가 표시됨.
   - 조안(`joao`)과 카타리나(`katarina`)는 기존 아크를 그대로 유지하며 `'이전 각색판 저장'` 배지가 표시되지 않음.
   - DOS 원시 `originalProgress` 필드는 그대로 보존되며 `scenarioEdition` 판별이나 `originalCore` 상태에 재사용되지 않음.
5. **소스·도구·게시 commit, EXE·ZIP 해시, 재수신 확인 결과**:
   - `UW2-Korean-Four-Captains.exe`: `109,936,083` bytes, SHA256 `f4b3b9c77989b3aec854951aae265e3f5e65a4a2a5758af6f3f230c947669e8c`.
   - EXE 빌드 및 `sprites-run-1` / `desktop-run-1` 검증 이후 제품 코드(`remake/src/**`, `remake/desktop/**`, `remake/scripts/**`, `remake/package.json`) 변경은 단 1바이트도 없음(검증 무효화 `0`건).
   - 사전 릴리스 자산 재수신 및 SHA256 대조 결과는 `remake/docs/four-protagonists/publication-receipt.json`에 기록됨.
6. **실제 실행한 S/T/D/U 구분, 원시 실패/성공 로그, 필요한 UI 재현 절차와 최소 시험 저장**:
   - 정적 검증(`S`): `npm run verify:assets`, `npm run story:validate`, `npm run typecheck`, `npx tsc --noEmit -p tests/tsconfig.json`, `npm run lint`, `npx prettier --check src/ tests/ scripts/`.
   - 자동 테스트(`T`): `npx jest --runInBand` (128 suites, 1,117 tests PASS), `npm run test:slots` (5 tests PASS).
   - 최종 EXE 실기 검증(`D-NATURAL` / `D-DIAGNOSTIC`):
     - `docs/four-protagonists/evidence/sprites-run-1/summary.json` (`verify-port-player-sprites.cjs` PASS).
     - `docs/four-protagonists/evidence/desktop-run-1/summary.json` (`verify-four-protagonists-desktop.cjs` `D1~D8` PASS; `D1~D6`, `D8`은 상태/좌표 주입 없는 순수 `D-NATURAL`, `D7`은 후반 관문 직전 상태 준비 `D-DIAGNOSTIC` + 최종 전투/이벤트/엔딩/저장복원/재방문 실제 조작 `D-NATURAL`).
   - 사용자 인수(`U`): `USER_FULL_PLAY_PENDING` (본 보고서 §8의 `U1~U6` 표 참조).
7. **실행 중 도구·PID·로그·체크포인트·완료 대기 여부**:
   - 현재 실행 중이거나 백그라운드에서 대기 중인 장시간 프로세스/PID 없음 (`0`건). 모든 검증이 정상 종료됨.
8. **사용자 슬롯과 별도 dirty 파일의 보존 기준, 공개에서 제외한 자료, 미정리 임시 경로**:
   - `%APPDATA%\UW2-QCaine-Preview\slots\uw2-slot-1.json` 해시(`b90d966f522bf38fc4c7fe8404ced1582f4050f8c5fc0d7f13ce910cb5d7412e`) 불변.
   - 워크트리 루트의 `docs/` 및 `review/` 폴더는 커밋/릴리스에 포함하지 않고 그대로 보존함.
   - 미정리 임시 경로 없음.
9. **원인 분석 상위 3건과 다음 한 번의 수정/검증 행동**:
   - 1차 코드대법원 검수에서 지적된 6건(`F-01` `D2/D3` 상태 주입 제거 및 순수 UI 항해/교역/발굴/측량 전환, `F-02` 메르카토르/프랑코 배신 복귀 시 전 명성 50% 반감 페널티 구현, `F-03/F-05` `source-matrix.md`·`completion-report.md`·명세서 62개 이벤트 및 심볼 100% 동기화, `F-04` 조건부 선택지 한국어 대사 줄 수 1:1 정렬, `F-06` `isValidOriginalCoreCandidate`의 `storyEvents` 교차 불변식 검증)을 모두 해결하고 재검증을 통과함. 알려진 남은 결함 `0`건.
10. **후속 검수 및 정식 승격 안내**:
    - 후속 Codex는 네 원작 경로·공용 상태·한국어·구형 저장·최종 EXE 증거를 일괄 검토한다. 형님의 `U1~U6` 인수는 별도이며, 정식 `main`/`Latest` 승격은 사용자 승인 이후다.
