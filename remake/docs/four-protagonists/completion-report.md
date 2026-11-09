# 최종 보고서 (네 주인공 원작 핵심 시나리오 복원 인수 후보)

## 1. 수행 요약
- 수행한 작업:
  - 옷토 스피노라(`otto`), 에르네스트 로페스(`ernst`), 피에트로 콘티(`pietro`), 알 베자스(`ali`) 네 주인공의 원작(`UW2` DOS `SNR3.DAT`/`SNR3.MES`~`SNR6.DAT`/`SNR6.MES`) 핵심 시나리오(`original-core-v1`, 총 63개 등록 `original-core` 사건 / 전체 14개 아크 210개 사건) 및 필수 진행 메커니즘 전체 구현 및 검증 완료.
  - 판본 분리(`scenarioEdition: 'original-core-v1' | 'legacy-remake'`) 및 저장 버전 `SAVE_VERSION = 9`(`remake/src/state/saveMigrations.ts`, `remake/desktop/slotStore.cjs`) 도입:
    - 신규 옷토·에르네스트·피에트로·알 게임은 `scenarioEdition: 'original-core-v1'` 및 `<hero>.original-core.<event>` 네임스페이스로 시작.
    - 기존 `v1~v8` 저장은 로드 시 `scenarioEdition: 'legacy-remake'`로 명시적 마이그레이션되어 기존 각색판 진행·퀘스트·엔딩 의미를 100% 보존하고, 옷토·에르네스트·피에트로·알의 구형 각색판 저장에 한해 시스템 창 및 일지에 `'이전 각색판 저장 — 원작 핵심 루트는 새 항해 시작으로 플레이할 수 있습니다.'`(`LEGACY_ADAPTATION_SAVE_NOTICE_KO`) 안내 배지를 표시(조안·카타리나는 미표시).
    - `v9` 슬롯/세이브 검증 시 `isValidOriginalCoreCandidate(value, protagonistId, edition, storyEvents)`를 통해 `originalCore` 필드 구조(`familyDebt` 비음수 정수 필수 검증 포함)뿐만 아니라 진행 이벤트(`storyEvents`)와 `cartographerContract`, `collectorContract`, `lockedPorts`, `familyDebt`, `royalRankLevel`, `investorCollected`/`investorRepaid` 간의 교차 불변식까지 엄격히 검증하며, `normalizeOriginalCoreState`는 가문 빚 정산 후(`genoa-fabris-debt-settlement` 또는 `pietroLoan !== 'none'`) 반복 마이그레이션(`migrate(migrate(x))`) 시에도 `familyDebt: 0` 멱등성을 보장함.
    - DOS 원시 `originalProgress` 필드는 신규 `scenarioEdition` 및 `originalCore` 상태와 완전히 분리 보존(재사용 금지 규칙 준수).
  - 주인공별 원작 핵심 시나리오 및 고유 게임플레이 시스템(`remake/src/state/originalCore.ts`, `remake/src/state/actionsOriginalCore.ts`) 구현:
    - **옷토 스피노라(`otto.original-core.*`, 20개 등록 사건)**: 런던(`'30'`, 시작 금화 `1,000g`) 왕궁(`'6'`) 헨리 8세 밀명·사략 허가서(`'33'`)·`+300g`·기사 작위(`promoteRoyalRank: 1`)·길버트 조언(`london-palace-commission`) ➔ 런던 조선소(`'3'`) 기함 `Eagle` 인수(`london-shipyard-flagship`) ➔ 런던 주점(`'2'`) 매튜 로이 결투(`otto.matthew-duel`, `london-pub-brawl` / 패배·무승부 시 `london-pub-brawl-retry`) 및 승패·무승부(`outcomes: ['victory', 'defeat', 'draw']`) 무관 런던 항구(`'4'`) 단일 통합 사건으로 매튜 밀항 합류(`london-harbor-matthew-joins`, `+2,000g`) ➔ 세빌리아 주점(`'2'`, `'2'`) 신형 전함 정찰(`seville-pub-intel`) ➔ 세빌리아 야간 항구(`'2'`, `'4'`, `timeWindow: { min: 1080, max: 360 }`) 에스파냐 갤리온 `Real`(`shipId: '11'`) 나포(`+3,000g`, 해적 명성 `+200`) 및 경비 함대 추격전(`otto.seville-pursuit`, `seville-harbor-heist` / `seville-harbor-heist-retry`) ➔ 세빌리아 교역소(`'2'`, `'1'`)·주점(`'2'`, `'2'`) 카탈리나 구출 및 반무적함대 공투(`catalina-market-rescue`, `catalina-pub-alliance`, `+1,500g`, 해적 명성 `+200`) ➔ 런던 주점(`'30'`, `'2'`) 보물선 정보 흥정(`london-pub-gold-ship-intel`, `400 <= fame.pirate < 1500` 및 `goldAtLeast: 500`, 선택지 `'yes'` `-1,000g` / `'bargain_500'` `-500g` / `'no'` 거절) ➔ 낭트 항구(`'29'`, `'4'`) 무적함대 제1전대 격파(`otto.nantes-armada`, `nantes-armada-clash` / `nantes-armada-clash-retry`) ➔ 산토도밍고 항구(`'49'`, `'4'`) 신대륙 함대 격파(`otto.santo-domingo-armada`, `santo-domingo-armada` / `santo-domingo-armada-retry`) ➔ 카이엔 항구(`'57'`, `'4'`) 카탈리나 탄원(`cayenne-amazon-catalina-plea`, 선택지 `'yes'` / `'no'`, 해적 명성 `+150`) ➔ 보르도 주점(`'28'`, `'2'`) 에제키엘 도전 수락(`pub-ezequiel-challenge`, 선택지 `'yes'` / `'no'`) 및 보르도 항구(`'28'`, `'4'`) 총사령관 에제키엘 최종 결전(`otto.bordeaux-ezequiel`, `bordeaux-ezequiel-showdown` / `bordeaux-ezequiel-showdown-retry`) ➔ 런던 왕궁(`'30'`, `'6'`) 최종 개선 및 헨리 8세 문답 2분기(`'yes'` 평화 공존 및 에제키엘 선처 / `'no'` 영국 해군 패권 천명, `london-palace-triumph`, `promoteRoyalRank: 5`, `+15,000g`, 해적 명성 `+800`) 및 재방문 보존. 영국 밀사 타국 망명 금지(`canProtagonistDefect`).
    - **에르네스트 로페스(`ernst.original-core.*`, 10개 등록 사건)**: 암스테르담(`'34'`, 시작 금화 `800g`, 초기 모험 명성 `80`, 동아시아 `'98'`·`'99'`·`'100'` 잠금) 항구(`'4'`) 한스 합류 및 `Sleipnir` 출항(`amsterdam-harbor-departure`, `+2,500g`, 아이템 `'21'`) ➔ 암스테르담 메르카토르 저택(`'34'`, `'8'`) 세계지도 제작 계약(`cartographerContract: 'mercator'`, `amsterdam-mercator-contract`) 및 타 학자 계약 후 배신 복귀 시 에르네스트 `original-core-v1`에 한해 전 명성 50% 삭감 페널티(`resolveMercatorBetrayalPenalty` / `halveAllFameInPlace`, `mercator-betrayal-reconcile`) ➔ 항해 이동 시 격자 해역 자동 측량(`recordChartedPosition`, `chartedCells`) 및 메르카토르 저택 지도 보고 정산(`reportChartedMap`, 구역당 `+80g` 및 모험 명성 `+35`, `reportedChartedCells`) ➔ 모험 명성 `135` 이상 달성 후 암스테르담 항구(`'34'`, `'4'`) 라우라(DOS 파울라/통역 통합) 합류(`amsterdam-harbor-laura-joins`, `'yes'` 선택 시 모험 명성 `+100`) 및 모험 명성 `180` 이상 시 한스 지팡구 대화(`hans-zipangu-dream`, `'yes'` 선택 시 모험 명성 `+50`) ➔ 모험 명성 `200` 이상 달성 후 천주 항구(`'95'`, `'4'`) 입항 시 장안(`'98'`) 해금(`zeiton-changan-route-unlock`, `unlockPorts: ['98']`, 모험 명성 `+150`) ➔ 장안 항구(`'98'`, `'4'`) 라우라 고향 단서 및 사카이(`'99'`)·나가사키(`'100'`) 해금(`changan-homeland-search`, `unlockPorts: ['99', '100']`, `+3,000g`, 모험 명성 `+250`) 및 장안 저택(`'98'`, `'8'`) 회상(`changan-home-reunion`, 선택지 `'yes'` / `'no'`, 모험 명성 `+100`) ➔ 나가사키 항구(`'100'`, `'4'`) 양친 재회(`nagasaki-parents-reunion`, `+5,000g`, 모험 명성 `+400`) ➔ 모험 명성 `800` 이상 달성 후 암스테르담 메르카토르 저택(`'34'`, `'8'`) 세계지도 완성 보고 및 진로 2분기(`'yes'` 다시 바다로 / `'no'` 암스테르담 정착, `amsterdam-world-atlas-completion`, `+15,000g`, 모험 명성 `+800`). 필수 경로 내 억지 전투 `0`건.
    - **피에트로 콘티(`pietro.original-core.*`, 15개 등록 사건)**: 제노바(`'9'`, 시작 금화 `200g`, 가문 부채 `familyDebt: 5000`, 롬바르디 은행 `state.debt`와 완전 분리) 항구(`'4'`) 카미로 합류 및 `Sanuto` 출항(`genoa-harbor-departure`, `+1,500g`) ➔ 리스본 프랑코 공작부인 저택(`'1'`, `'8'`) 후원 계약(`collectorContract: 'duchess_franco'`, `lisbon-franco-patronage`, `+3,000g`, 모험 명성 `+100`) 및 타 수집가 계약 후 배신 복귀 시 피에트로 `original-core-v1`에 한해 전 명성 50% 삭감 페널티(`resolveCollectorBetrayalPenalty`, `franco-betrayal-reconcile`) ➔ 제노바 은행(`'9'`, `'9'`) 파브리스 가문 부채 정산(`genoa-fabris-debt-settlement`, `+5,000g`, `setPietroLoan: 'lent'` 및 `familyDebt: 0`) ➔ 알렉산드리아 주점(`'19'`, `'2'`) 황금 메달리온 보물지도(`'87'`) 구입(`alexandria-gold-medallion-map`, `fame.adventure >= 100` 및 `goldAtLeast: 1000`, `'yes'` `-2,000g` / `'bargain_1000'` `-1,000g` / `'no'`) ➔ 산토도밍고(`'49'`) 조합(`'7'`)에서 실제 상륙 발굴(`excavateTreasure('p1-gold-medallion')`, 지도 `'87'` 소모) 및 산토도밍고 항구(`'49'`, `'4'`) 사건(`santo-domingo-gold-medallion-excavation`, 모험 명성 `+250`) ➔ 리스본 저택(`'1'`, `'8'`) 황금 메달리온 보고(`lisbon-gold-medallion-report`, `+5,000g`, 모험 명성 `+250`, `setPietroLoan: 'repaid'`) 및 발견물 정산(`reportCollectorDiscoveries`) ➔ 베네치아 주점(`'14'`, `'2'`) 성자의 지팡이 보물지도(`'88'`) 구입(`venice-staff-map`, `goldAtLeast: 1500`, `'yes'` `-3,000g` / `'bargain_1500'` `-1,500g` / `'no'`) ➔ 바스라(`'77'`) 조합(`'7'`)에서 실제 상륙 발굴(`excavateTreasure('p2-poseidons-staff')`, 지도 `'88'` 소모) 및 바스라 교역소(`'77'`, `'1'`) 사건(`basra-staff-excavation`, `'m3-staff-of-the-saint'` 획득, 모험 명성 `+300`) ➔ 마사와 항구(`'75'`, `'4'`) 조안·엔리코 인계(`massawa-joao-handoff`, `+8,000g`, 모험 명성 `+300`) 및 마사와 주점(`'75'`, `'2'`) 알 지팡구 단서(`ali-zipangu-clue`, 모험 명성 `+150`) ➔ 나가사키 항구(`'100'`, `'4'`) 에르네스트 조언(`nagasaki-ernst-advice`, 선택지 `'yes'` / `'no'`, 모험 명성 `+200`) ➔ 아마존강 하구(`mouth-of-the-amazon`) 발견 후 카이엔 항구(`'57'`, `'4'`) 엘도라도 발견 및 파브리스 구출(`cayenne-el-dorado-discovery`, `setHowellHousePrice: 110`, 모험 명성 `+500`) ➔ 런던 은행(`'30'`, `'9'`) 셜록 하웰 저택 시험(`london-howell-mansion-test`, `grantHowellHouseFree`, 모험 명성 `+400`) ➔ 리스본 프랑코 저택(`'1'`, `'8'`) 최종 개선(`lisbon-franco-triumph`, `+20,000g`, 모험 명성 `+800`). 필수 경로 내 억지 전투 `0`건.
    - **알 베자스(`ali.original-core.*`, 18개 등록 사건)**: 이스탄불(`'3'`, 시작 금화 `0g`) 조선소(`'3'`, `istanbul-shipyard-loan`, `+200g`)·조합(`'7'`, `istanbul-guild-loan`, `+300g`)·주점(`'2'`, `istanbul-pub-loan`, `+300g`)·항구(`'4'`, `istanbul-harbor-departure`, `+200g`, 사림 합류 및 `Hugli` `shipId: '2'` 인수) 4대 투자자 후원금 수령(`collectAliInvestorInPlace`, 각 `investorDebts[key] = 2000`, 롬바르디 은행 `state.debt`와 완전 분리) 및 여관(`'5'`) 선물(`istanbul-lodge-gift`, `'yes'` `+500g` / `'no'` 고양이 `'25'`) ➔ 교역소 매매로 자금 확보 후 조선소(`istanbul-shipyard-repay`)·조합(`istanbul-guild-repay`)·주점(`istanbul-pub-repay`)·항구(`istanbul-harbor-repay`) 각 2,000두카트 순차 상환(`repayAliInvestorInPlace`, 선택지 `'yes'` 상환 / `'no'` 유예 분기 포함, 총 교역 명성 `+500`) ➔ 이스탄불 왕궁(`'3'`, `'6'`) 첫 알현(`istanbul-palace-first-audience`, `promoteRoyalRank: 2`, `+3,000g`, 면세 허가증 `'30'`, 교역 명성 `+150`) ➔ 알렉산드리아 주점(`'19'`, `'2'`) 피에트로 단서 및 5,000두카트 대여 선택(`alexandria-pietro-clue`, `'yes'` `-5,000g` 및 `setPietroLoanInPlace('lent')` / `'no'` `0g` 및 `setPietroLoanInPlace('refused')`) ➔ 리스본 주점(`'1'`, `'2'`) 조안·루치아 단서(`lisbon-joao-lucia-clue`, 교역 명성 `+150`) ➔ 마사와 항구(`'75'`, `'4'`) 카탈리나 기습 해전(`ali.catalina-ambush`, `massawa-catalina-ambush` / `massawa-catalina-ambush-retry`) ➔ 바스라 주점(`'77'`, `'2'`) 여동생 사샤 재회(`basra-sasha-reunion`, `setHowellHousePrice: 50`, `+5,000g`, 교역 명성 `+300`) ➔ 이스탄불 점술가(`'3'`, `'12'`) 신탁(`istanbul-fortune-teller-oracle`) 및 베네치아 은행(`'14'`, `'9'`) 하웰 저택 교섭(`venice-howell-pietro-debt`, `completed(basra-sasha-reunion)` 선행 필수; `'yes'` 선택 시 `pietroLoan === 'lent'`이면 무상 양도 `howellHouseAcquired: true`, `howellHousePriceIngots: 0`, `pietroLoan: 'settled'`, 거절 상태면 `howellHousePriceIngots: 50` 유지; `'no'` 선택 시 `howellHousePriceIngots: 50`, `pietroLoan: 'repaid'`, 교역 명성 `+200`) ➔ 오스만 동맹항 30개 이상(`alliedPortsAtLeast: 30`), 하웰 저택 기준 자산 충족(`wealthMeetsHowellPrice`) 및 교역 명성 `800` 이상 달성 후 이스탄불 왕궁(`'3'`, `'6'`) 술탄 대재상 추대 엔딩(`istanbul-sultan-coronation`, `grantHowellHouseFree`, `promoteRoyalRank: 5`, `+25,000g`, 교역 명성 `+1,000`) 및 재방문 보존.
  - 한국어 현지화(`remake/src/localization/koreanOtto.ts`, `koreanErnst.ts`, `koreanPietro.ts`, `koreanAli.ts`, `koreanUi.ts`, `koreanTerms.ts`, `koreanCombat.ts`) 및 `koreanCoverage.test.ts` 전수 검증(`0` 누락, `0` 영어 fallback, 조건부 선택지 대사 한·영 문장 수 1:1 완전 일치).
  - 단일 포터블 Windows 실행 파일(`remake/dist-desktop/UW2-Korean-Four-Captains.exe`) 빌드 및 실기 데스크톱 자동/수동 경계 검증(`verify-port-player-sprites.cjs`, `verify-four-protagonists-desktop.cjs` — `D1~D8` 전 항목 `PASS`, `D1~D3` 상태·좌표·자금·명성·아이템 직접 주입 `0`건, 피에트로 산토도밍고 `'49'` 및 바스라 `'77'` 양대 보물 발굴 모두 실기 검증 완료).
  - 독립 `research` 서브에이전트(`44b301f9-7fcb-470a-b1a7-5bf13b697835`) 감사 및 코드대법원 판결 지적사항(`F-01~F-06`) 전수 수정·재검증 완료.
- 수행하지 않은 작업:
  - 형님의 최종 전편 수동 플레이 인수(`U1~U6`) 및 후속 외부 Codex 최종 승인.
  - `main` 브랜치 병합 및 GitHub 정식 `Latest` 릴리스(`v0.3.1`) 승격.
- 수행하지 않은 이유:
  - 미션 지침(§1, §10 Stage 9, §13, §17)에 따라 에이전트는 개발 및 기술 검증 완료 후 `USER_FULL_PLAY_PENDING` 및 `CODEX_REVIEW_PENDING` 상태로 사전 릴리스(Pre-release) 후보를 인계하며, 사용자 인수를 임의로 부여하거나 `main`/`Latest`를 변경하는 것이 금지되어 있음.
- development_status: `READY_FOR_CODEX_REVIEW`
- codex_review_status: `CODEX_REVIEW_PENDING`
- user_acceptance_status: `USER_FULL_PLAY_PENDING`
- sourceCommit / toolCommit / publicationCommit 또는 receipt URL:
  - `sourceCommit`: `4ca50b71d083cfd52aa5b3ec2519040e0e57f3dc` (`4ca50b7`)
  - `toolCommit`: `4ca50b71d083cfd52aa5b3ec2519040e0e57f3dc` (`4ca50b7`)
  - `publicationCommit`: `remake/docs/four-protagonists/publication-receipt.json` 기록 커밋 (GitHub Pre-release Tag: `four-protagonists-candidate-20261109-4ca50b7`, URL: `https://github.com/KaronLabs/Uncharted-Waters-2/releases/tag/four-protagonists-candidate-20261109-4ca50b7`)
- EXE 파일명 / 바이트 / SHA256 / 다운로드:
  - 파일명: `UW2-Korean-Four-Captains.exe`
  - 바이트: `109,935,821` bytes
  - SHA256: `5329f901686ffe0448e7087e3c6064fa3b43e10d66505cd48139ab956a1d72e7`
  - 다운로드: `https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/four-protagonists-candidate-20261109-4ca50b7/UW2-Korean-Four-Captains.exe`
  - 제품 EXE 변경 여부: **변경 없음** (`sourceCommit: 4ca50b71d083cfd52aa5b3ec2519040e0e57f3dc`에서 빌드·검증된 동일 EXE 바이너리를 그대로 유지하며, 후속 수정은 `source-matrix.md`·`completion-report.md` 문서 및 매니페스트/증거 ZIP 동기화에 한정됨).

| 주인공 | 원작 본선·기능 | 한국어 | 저장/판본 | N8 | Windows D | 사용자 U | 남은 차단 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 옷토 | PASS (`otto.original-core.*` 20개 사건 + 매튜 결투/승패 무관 합류·세빌리아 야간 갤리온 강탈·낭트/산토도밍고/보르도 해전·국왕 문답 2분기·망명 금지) | PASS (`koreanOtto.ts` 100%) | PASS (`v9`, `original-core-v1` / `legacy-remake` 분리 보존) | PASS | PASS (`D1~D8`) | PENDING | 없음 (`0`건) |
| 에르네스트 | PASS (`ernst.original-core.*` 10개 사건 + 메르카토르 계약/배신 페널티·해역 측량/보고 정산·천주/장안/사카이/나가사키 해금·진로 2분기·비전투 완주) | PASS (`koreanErnst.ts` 100%) | PASS (`v9`, `original-core-v1` / `legacy-remake` 분리 보존) | PASS | PASS (`D1~D8`) | PENDING | 없음 (`0`건) |
| 피에트로 | PASS (`pietro.original-core.*` 15개 사건 + 프랑코 후원 계약/배신 페널티·빚 변제·알렉산드리아/베네치아 보물지도 `'87'`/`'88'` 구입 및 산토도밍고/바스라 실제 발굴·비전투 완주) | PASS (`koreanPietro.ts` 100%) | PASS (`v9`, `original-core-v1` / `legacy-remake` 분리 보존) | PASS | PASS (`D1~D8`) | PENDING | 없음 (`0`건) |
| 알 | PASS (`ali.original-core.*` 18개 사건 + 4대 투자자 대출/상환 원장·피에트로 대여/하웰 저택 분기·카탈리나 기습전·사샤 재회·오스만 동맹 30항 및 대재상 추대) | PASS (`koreanAli.ts` 100%) | PASS (`v9`, `original-core-v1` / `legacy-remake` 분리 보존) | PASS | PASS (`D1~D8`) | PENDING | 없음 (`0`건) |

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
| `remake/src/story/core/types.ts`, `remake/src/story/core/resolver.ts`, `remake/src/story/core/effects.ts`, `remake/src/story/core/validator.ts`, `remake/src/story/advanceSession.ts`, `remake/src/story/storyRuntimeActions.ts` | `scenarioEditions` 필터, 원작 전용 조건/효과 및 `spendGold` 자금 부족 시 효과 그룹 전체 원자적 무변이 롤백(`insufficient-gold`) 추가 | 원작 핵심 사건이 실제 게임플레이 조건 충족 시에만 해금되고 자금 부족 선택지에서 부분 적용이 발생하지 않도록 강제 |
| `remake/src/story/content/arcs/otto/original-core/*`, `ernst/original-core/*`, `pietro/original-core/*`, `ali/original-core/*`, `remake/src/story/content/arcs/*/events.ts`, `remake/src/story/content/catalogs.ts`, `remake/src/story/content/index.ts` | 네 주인공 `original-core` 63개 사건(옷토 20·에르네스트 10·피에트로 15·알 18, 전체 14개 아크 210개 사건) 정의 및 기존 `armada`/`worldmap`/`adventure`/`merchant` 아크에 `scenarioEditions: ['legacy-remake']` 지정 | 원작 핵심 루트 완결 및 구형 각색판 아크와의 충돌 완전 차단 |
| `remake/src/story/ottoJournal.ts`, `ernstJournal.ts`, `pietroJournal.ts`, `aliJournal.ts` | `original-core-v1`과 `legacy-remake` 판본별 퀘스트 일지 요약·다음 목표·진행도 표시 분기 | 일지에서 원작판 다음 행동과 고유 계약/탐사/발굴/상환 상태를 한국어로 안내 |
| `remake/src/combat/encounters.ts`, `remake/src/data/itemData.ts`, `remake/src/data/discoveryData.ts` | 원작 전용 해전/결투 인카운터(`otto.matthew-duel`, `otto.seville-pursuit`, `otto.nantes-armada`, `otto.santo-domingo-armada`, `otto.bordeaux-ezequiel`, `ali.catalina-ambush`) 및 보물지도(`'87'`, `'88'`)·발굴 랜드마크(`p1-gold-medallion`, `p2-poseidons-staff`) 등록 | 원작 핵심 사건의 보상·발굴지·결전 인카운터 완비 |
| `remake/src/localization/koreanOtto.ts`, `koreanErnst.ts`, `koreanPietro.ts`, `koreanAli.ts`, `remake/src/localization/dialogue/*.ts`, `remake/src/localization/catalogs.ts`, `combat.ts`, `koreanCombat.ts`, `koreanTerms.ts`, `koreanUi.ts`, `terms.ts`, `terms/descriptions.ts`, `ui.ts`, `koreanCoverage.test.ts` | 네 주인공 원작 핵심 대사·선택지·일지·전투·아이템·발견물·건물 메뉴 한국어 번역 및 커버리지 전수 검사 확장 | 영어 fallback `0`건 및 조건부 대사 분기 줄 수 1:1 일치 보장 |
| `remake/src/story/fourProtagonistsOriginalCore.test.tsx`, `remake/src/story/protagonistRoutes.test.ts`, `remake/src/story/storyProgress.test.ts`, `remake/src/story/contentManifest.test.ts`, `remake/src/story/content/arcs/joao/lisbon-opening/lisbonOpening.test.ts` | `N1~N8`, `F1~F8`, `E1~E8`, `R1~R8` 및 배신 페널티·장안 저택 퇴출 회귀 테스트 추가 | 네 주인공 전편 연쇄(63개 사건)·실패/엣지·회귀 경계 자동 검증 |
| `remake/scripts/verify-four-protagonists-desktop.cjs`, `remake/scripts/verify-port-player-sprites.cjs`, `remake/package.json` | 단일 포터블 EXE(`UW2-Korean-Four-Captains.exe`) 빌드 설정 및 `D1~D8` 실기 데스크톱 자동 검증 스크립트(`D1~D3` 순수 `D-NATURAL` 항해/교역/발굴/측량 조작) 구현 | 패키징된 Windows 실행 파일에서 실제 UI 조작으로 `D1~D8` 및 6주인공 스프라이트 검증 |
| `remake/docs/four-protagonists/source-matrix.md`, `progress.json`, `manifest.json`, `completion-report.md`, `publication-receipt.json`, `evidence/**` | 원작 대조표(63개 등록 이벤트 전수 매핑 및 원작/리메이크 수치 대조), 진행 상태, 해시 매니페스트, 최종 보고서, 릴리스 수신 영수증 및 `sprites-run-1`/`desktop-run-1` 증거 패키지 기록 | 미션 §13·§17·§18 인수인계 및 재현성 완결 |

## 3. 실행한 명령
| cwd·명령 | 실제 종료코드·결과 | 출력 요약·근거 경로 |
| --- | --- | --- |
| `remake` · `npm run verify:assets` | `0` (PASS) | 124개 필수 PNG/OGG/MP3 자산 및 SHA256 무결성 통과 |
| `remake` · `npm run story:validate` | `0` (PASS) | 14개 아크 210개 스토리 이벤트(`original-core` 63개 포함) 그래프·조건·보상·분기 무결성 통과 |
| `remake` · `npx prettier --check src/ tests/ scripts/` | `0` (PASS) | 모든 대상 파일 포맷팅 기준 일치 (`0` warnings/errors) |
| `remake` · `npx jest --runInBand` | `0` (PASS) | `128 passed, 128 total` suites (`1,117 passed, 1,117 total` tests) |
| `remake` · `npm run test:slots` | `0` (PASS) | `desktop/slotStore.test.cjs` `5 passed, 0 failed` (`v9` 및 `scenarioEdition`·`originalCore` 슬롯 격리 검증) |
| `remake` · `npm run typecheck` | `0` (PASS) | `tsc --noEmit` 타입 오류 `0`건 |
| `remake` · `npx tsc --noEmit -p tests/tsconfig.json` | `0` (PASS) | `tests/` 프로젝트 타입 오류 `0`건 |
| `remake` · `npm run lint` | `0` (PASS) | ESLint 오류 `0`건 |
| `remake` · `npm run build:webpack` | `0` (PASS) | 프로덕션 웹팩 번들 컴파일 성공 |
| `remake` · `npm run dist:portable` | `0` (PASS) | `dist-desktop/UW2-Korean-Four-Captains.exe` (`109,935,821` bytes, SHA256 `5329f901686ffe0448e7087e3c6064fa3b43e10d66505cd48139ab956a1d72e7`) 생성 |
| `remake` · `node scripts/verify-port-player-sprites.cjs --exe dist-desktop/UW2-Korean-Four-Captains.exe --artifacts docs/four-protagonists/evidence/sprites-run-1 --port 9361` | `0` (PASS) | 6주인공(`joao`, `katarina`, `otto`, `ernst`, `pietro`, `ali`) 항구/항해 스프라이트 타일 대조 통과 (`docs/four-protagonists/evidence/sprites-run-1/summary.json`) |
| `remake` · `node scripts/verify-four-protagonists-desktop.cjs --exe dist-desktop/UW2-Korean-Four-Captains.exe --artifacts docs/four-protagonists/evidence/desktop-run-1 --port 9362` | `0` (PASS) | `D1~D8` 전 항목 PASS, 콘솔/페이지/네트워크 오류 `0`건, 개인 슬롯 해시 불변 (`docs/four-protagonists/evidence/desktop-run-1/summary.json`) |

## 4. 테스트 결과
| 영웅·검사 ID | S/T/D-NATURAL/D-DIAGNOSTIC/U | 결과 | 실행 기준·비고 |
| --- | --- | --- | --- |
| 공통·네 주인공 `N1` | `T` + `D-NATURAL` | PASS | 네 주인공 신규 게임 시작 시 `scenarioEdition === 'original-core-v1'`, 원작 초기 자금/선박/동료/시작 항구 일치 |
| 옷토 `N2` | `T` + `D-NATURAL` | PASS | 런던 왕궁 사략 허가서(`'33'`) ➔ 런던 조선소 기함 `Eagle` 인수 ➔ 런던 주점 매튜 결투(`otto.matthew-duel`) 및 런던 항구 매튜 밀항 합류(`london-harbor-matthew-joins`) ➔ 세빌리아 야간 갤리온 `Real` 강탈(`seville-harbor-heist`) 연쇄 |
| 에르네스트 `N3` | `T` + `D-NATURAL` | PASS | 암스테르담 항구 한스/`Sleipnir` 출항 ➔ 메르카토르 계약(`cartographerContract: 'mercator'`) ➔ 실제 해역 항해 측량(`chartedCells`) 및 지도 보고 정산(`reportChartedMap`, 구역당 `+80g`/모험 명성 `+35`) ➔ 라우라 통역 합류(`amsterdam-harbor-laura-joins`) 및 한스 지팡구 대화(`hans-zipangu-dream`) ➔ 천주(`'95'`)·장안(`'98'`)·나가사키(`'100'`) 해금 |
| 피에트로 `N4` | `T` + `D-NATURAL` | PASS | 제노바 가문 부채(`familyDebt: 5000`)/카미로 합류 ➔ 리스본 프랑코 공작부인 후원 계약(`collectorContract: 'duchess_franco'`) ➔ 제노바 가문 빚 정산 ➔ 알렉산드리아(`'19'`)/베네치아(`'14'`) 주점 보물지도(`'87'`, `'88'`) 구입 및 산토도밍고(`'49'`)/바스라(`'77'`) 실제 상륙 발굴(`excavateTreasure`) |
| 알 `N5` | `T` + `D-NATURAL` | PASS | 이스탄불 4대 투자자(`shipyard`, `guild`, `pub`, `harbor`) 후원금 수령 ➔ 실제 교역소 매매 차익으로 자금 확보 후 투자자 상환(`repayAliInvestorInPlace`) |
| 네 주인공 `N6` | `T` + `D-NATURAL` | PASS | 옷토 국왕 문답(`'yes'`/`'no'`), 에르네스트 계약/배신 복귀 및 진로(`'yes'`/`'no'`), 피에트로 계약/배신 복귀 및 지도 협상(`'yes'`/`'bargain_1000'`/`'bargain_1500'`), 알 투자자 상환/유예 및 피에트로 대여(`'yes'`/`'no'`)·베네치아 하웰 저택 분기 상태·일지·보상 반영 |
| 네 주인공 `N7` | `T` + `D-NATURAL` | PASS | `SAVE_VERSION = 9` 저장/복원 후 `scenarioEdition`, `originalCore`, 계약/지도/채무/왕실 작위 상태 100% 일치 |
| 네 주인공 `N8` | `T` | PASS | `fourProtagonistsOriginalCore.test.tsx`에서 옷토(20)·에르네스트(10)·피에트로(15)·알(18) 총 63개 `original-core` 사건 오프닝부터 엔딩 및 재방문까지 전편 연쇄 완주 검증 |
| 실패/음성 `F1~F8` | `T` | PASS | 잘못된 항구/건물/순서(`F1`), 자금 부족(`F2`), 미발굴/미측량 상태 보고 거부(`F3`), 전투 패배 후 재도전 복구(`F4`), 손상된 슬롯 JSON 및 불일치 `originalCore` 격리 거부(`F5`), 구형 각색판/타 영웅 이벤트 차단(`F6`), 중복 수령/중복 상환 방지(`F7`), 엔딩 전 후속 사건 차단(`F8`) 전부 통과 |
| 엣지케이스 `E1~E8` | `T` | PASS | 아래 `## 5. 엣지케이스 검증` 표 참조 |
| 회귀 `R1~R8` | `T` + `D-NATURAL` | PASS | 조안/카타리나 무간섭(`R1`), `v1~v8` 각색판 저장 마이그레이션(`R2`), 6주인공 교차 로드 분리(`R3`), 단일 BGM 생명주기(`R4`), 6주인공 스프라이트/창 제목(`R5`), 일반 항해/입항/교역/발견/왕궁/은행(`R6`), 미지 이벤트 ID 및 DOS `originalProgress` 보존(`R7`), 증거 집계 무결성(`R8`) 통과 |
| 데스크톱 `D1` | `D-NATURAL` | PASS | 패키징된 EXE에서 네 주인공 각각 새 게임 UI 시작 ➔ 실제 마을 이동 ➔ 첫 필수 건물 사건 ➔ 첫 정상 출항 (`desktop-run-1/summary.json`) |
| 데스크톱 `D2` | `D-NATURAL` | PASS | 상태/좌표/자금/명성 주입 없이 옷토 결투/매튜 영입, 에르네스트 북해 실항해 측량/메르카토르 보고, 피에트로 리스본➔제노바➔알렉산드리아 지도(`'87'`) 구입➔산토도밍고(`'49'`) 실제 발굴➔리스본 보고➔베네치아 지도(`'88'`) 구입➔바스라(`'77'`) 성자의 지팡이 실제 발굴, 알 이스탄불↔아테네 교역 매매 후 조선소 투자자 상환 UI 실행 |
| 데스크톱 `D3` | `D-NATURAL` | PASS | 상태/좌표 주입 없이 에르네스트 천주(`'95'`)·장안(`'98'`)·나가사키(`'100'`) 및 피에트로 산토도밍고(`'49'`)·리스본(`'1'`)·베네치아(`'14'`)·바스라(`'77'`) 실제 항해 입항 및 필수 건물 진입/발굴 완료 |
| 데스크톱 `D4` | `D-NATURAL` | PASS | `1280x720@1x`, `800x600@1x`, `800x600@1.5x` 해상도에서 한국어 대사·선택지·일지 오버플로 `0`건, 버튼 클릭 가능 확인 |
| 데스크톱 `D5` | `D-NATURAL` | PASS | 네 주인공 슬롯 저장 ➔ 앱 완전 종료 ➔ 동일 EXE 재실행 ➔ 슬롯 UI 로드 ➔ 다음 건물 행동 정상 수행 |
| 데스크톱 `D6` | `D-NATURAL` | PASS | 구형 `v8` 옷토 각색판 저장 로드 시 `scenarioEdition: 'legacy-remake'` 및 안내 배지 표시, 조안/카타리나 로드 시 배지 미표시 확인 |
| 데스크톱 `D7` | `D-DIAGNOSTIC` (후반 직전 상태 준비) + `D-NATURAL` (최종 사건·엔딩·저장/복원·재방문 조작) | PASS | 네 주인공 최종 관문 직전 상태에서 실제 UI 입력으로 최종 해전/사건 승리, 엔딩 배너 확인, 저장/로드 후 왕궁/저택 재방문 확인 (전편 도달성은 `N8` + `D1~D3`로 입증) |
| 데스크톱 `D8` | `D-NATURAL` | PASS | 6주인공 교차 로드, 단일 BGM 재생, 오프라인 동작, 콘솔/페이지/네트워크 오류 `0`건, 개인 슬롯 해시 불변 |
| 사용자 인수 `U1~U6` | `U` | `USER_FULL_PLAY_PENDING` | 아래 `## 8. 다음 반복 추천 작업`의 주인공별 `U1~U6` 인수 체크리스트 참조 |

## 5. 엣지케이스 검증
| 케이스 | 결과 | 기대/관측·근거 |
| --- | --- | --- |
| `E1` 자금 경계값에서 보물지도 구입·가문 빚 변제·투자자 상환 | PASS | 정확히 필요 금액 이상일 때 정상 차감되며, 부족 시 상태 변경 없이(`insufficient-gold` 원자적 중단) 거절 또는 유예 분기 처리됨 (`fourProtagonistsOriginalCore.test.tsx`) |
| `E2` 에르네스트·피에트로 타 후원자 계약(`'other'`) 후 메르카토르/프랑코 공작부인 복귀 시 배신 페널티 | PASS | `resolveMercatorBetrayalPenalty` 및 `resolveCollectorBetrayalPenalty` 실행 시 모험·해적·교역 명성이 모두 `Math.floor(fame / 2)`로 반감된 뒤 본 계약으로 전환됨 (`fourProtagonistsOriginalCore.test.tsx`) |
| `E3` 야간 전용 사건(옷토 세빌리아 야간 항구 갤리온 `Real` 강탈 `seville-harbor-heist`, `timeWindow: { min: 1080, max: 360 }`) 주간 차단 및 야간 진입 | PASS | 주간(`360 < timeOfDay < 1080`)에는 `seville-harbor-heist`가 발동하지 않고 일반 항구 메뉴가 열리며, 야간 시간대(`18:00~06:00`) 진입 시 정확히 강탈 사건이 발동함 (`fourProtagonistsOriginalCore.test.tsx`) |
| `E4` 에르네스트·피에트로 비전투 완주 경로 및 옷토/알 해전 패배 후 복구 | PASS | 에르네스트·피에트로는 필수 전투 없이 엔딩까지 완주 가능하며, 옷토·알 해전/결투 패배 시에도 세이브 손상 없이 재도전 가능 (`fourProtagonistsOriginalCore.test.tsx`) |
| `E5` 알 피에트로 5,000두카트 대여(`'lent'`) vs 거절(`'refused'`)에 따른 베네치아 하웰 저택 인수 조건 분기 | PASS | 대여 시 사샤 재회 후 베네치아 은행(`venice-howell-pietro-debt`)에서 하웰 저택을 무상 취득(`howellHouseAcquired: true`, `howellHousePriceIngots: 0`)하고, 거절 시 금괴 50개(`howellHousePriceIngots: 50`) 기준가가 유지됨 (`fourProtagonistsOriginalCore.test.tsx`) |
| `E6` 구형 `v8` 저장과 신규 `v9` 저장 교차 로드, 손상된 `originalCore` 불변식 검증 및 `originalProgress` 보존 | PASS | `v8` 저장 로드 시 `scenarioEdition: 'legacy-remake'`로 변환되고, `familyDebt` 누락/음수/소수 또는 `storyEvents`와 모순되는 손상된 `v9` `originalCore`는 `isValidOriginalCoreCandidate`에서 차단되며, DOS `originalProgress` 필드는 변조 없이 보존됨 (`saveMigrations.test.ts`, `slotStore.test.cjs`, `D6`) |
| `E7` `800x600` 최소 창 및 `1.5x` 배율에서 긴 한국어 대사·다중 선택지·일지 표시 | PASS | `800x600@1x` 및 `800x600@1.5x`에서 선택지 버튼이나 일지 탭이 화면 밖으로 잘리지 않고 정상 클릭 가능 (`desktop-run-1/summary.json` `D4`) |
| `E8` 엔딩 달성 직후 저장 ➔ 리로드 ➔ 재방문 시 중복 엔딩/중복 보상 방지 | PASS | 네 주인공 모두 엔딩 달성 후 왕궁/저택 재방문 시 중복 보상이나 무한 엔딩 루프가 발생하지 않고 완료 상태가 유지됨 (`fourProtagonistsOriginalCore.test.tsx`, `D7`) |

## 6. 남은 위험
- 확인됨:
  - 기술적 차단 결함 `0`건. `npm run verify`, `npx tsc --noEmit -p tests/tsconfig.json`, `npm run test:slots`, `verify-port-player-sprites.cjs`, `verify-four-protagonists-desktop.cjs`(`D1~D8`), 코드대법원 1~3차 지적사항(`F-01~F-06`) 수정 검증 모두 통과.
- 불확실:
  - 원작 DOS(`SNR3.MES`~`SNR6.MES`)의 비진행성 중간 잡담·배경 대사 일부는 핵심 본선 63개 등록 `original-core` 이벤트 내에 통합 복원됨(`source-matrix.md` §5에 통합 및 수치 환산 근거 전수 명시).
- 추정 및 검증 방법:
  - 장시간 수동 플레이 시 개인별 체감 난이도(교역 자금 확보 동선, 해역 측량 속도 등)는 형님의 `U1~U6` 실기 플레이에서 추가 확인 가능.
- 원작과의 의도적 차이 및 제외 근거 (`source-matrix.md` §5 참조):
  - 기존 리메이크의 각색판 아크(`otto.armada`, `ernst.worldmap`, `pietro.adventure`, `ali.merchant`)는 삭제하지 않고 `scenarioEditions: ['legacy-remake']`로 격리 보존함(구형 `v1~v8` 세이브 파일 호환성 유지 목적).
  - 에르네스트·피에트로 본선에서 원작에 없던 억지 필수 해전 게이트를 제거하고 비전투 완주 구조로 복원함(§7 규칙 6 준수).
  - **옷토(`otto`)**: 시작 금화는 초기 보급 편의를 위해 `startGold: 1000`(`protagonists.ts:62`)으로 설정하고 런던 왕궁 밀명(`london-palace-commission`)에서 원작과 동일하게 `+300g` 및 사략 허가서(`'33'`)를 추가 지급함. 매튜의 결투 승패 무관 합류는 단일 이벤트 `otto.original-core.london-harbor-matthew-joins`(`outcomes: ['victory', 'defeat', 'draw']`)로 통합 처리하며, 원작의 훌리오 제보·세빌리아 여관 수색·세우타 주점 잡담·귀환 포고령 대사는 `seville-pub-intel`, `london-pub-gold-ship-intel`, `nantes-armada-clash`, `pub-ezequiel-challenge` 대사 내에 통합함.
  - **에르네스트(`ernst`)**: 메르카토르 지도 보고(`reportChartedMap()`)는 신규 측량 해역 1칸당 `+80g` 및 모험 명성 `+35`를 지급하며, 원작의 파울라·통역 합류 및 지팡구/고향 탐색 대사는 `laura`(`라우라`) 캐릭터의 `amsterdam-harbor-laura-joins`(명성 `135`), `hans-zipangu-dream`(명성 `180`), `zeiton-changan-route-unlock`(명성 `200`), `changan-homeland-search`, `changan-home-reunion`, `nagasaki-parents-reunion`, `amsterdam-world-atlas-completion`(명성 `800`) 10개 본선 사건으로 통합 복원함.
  - **알(`ali`)**: 이스탄불 왕궁 첫 알현(`istanbul-palace-first-audience`) 보상은 알렉산드리아 피에트로 `5,000g` 대여 선택(`alexandria-pietro-clue`)이 실제 교역 자금 축적을 요구하도록 원작 50,000g에서 `+3,000g`(및 면세 허가증 `'30'`, 작위 승급)로 조정했으며, 바스라 사샤 재회(`basra-sasha-reunion`)는 `+5,000g` 및 `setHowellHousePrice: 50`을 부여함. 베네치아 하웰 저택 교섭(`venice-howell-pietro-debt`)은 `basra-sasha-reunion` 완료를 선행 조건으로 요구함.
- 사용자 전편 인수 대기:
  - `user_acceptance_status: USER_FULL_PLAY_PENDING` (형님의 `U1~U6` 수동 플레이 인수 대기).
  - `codex_review_status: CODEX_REVIEW_PENDING` (후속 독립 Codex 검수 대기).
- 환경 차단/미실행과 영향:
  - 차단 사항 없음 (`0`건).

## 7. 점수표
| 항목 | 배점 | 자체 평가 | 근거 |
| --- | ---: | ---: | --- |
| 요구사항 충족도 | 20 | 20 | 옷토·에르네스트·피에트로·알 네 주인공 각각의 원작 핵심 관문(`G1~G5`, `G7`), 고유 게임플레이 메커니즘, 한국어 번역, 단일 EXE 인계 완결 (`source-matrix.md`) |
| 구현 정확성 | 20 | 20 | 네 주인공 `N8` 전편 연쇄(63개 `original-core` 사건), 분기 선택지/배신 페널티/하웰 저택/망명 금지, 실패 복구, 비전투 완주, 엔딩 및 재방문 의미 100% 일치 |
| 테스트 충실도 | 15 | 15 | 정상 연쇄(`N1~N8`, 5점), 실패/엣지 음성 대조(`F1~F8`, `E1~E8`, 5점), 최종 패키징 EXE 실기 검증(`D1~D8`, `D1~D3` 무주입 `D-NATURAL`, 5점) 모두 실제 실행 통과 |
| 회귀 위험 관리 | 10 | 10 | `v9` 판본 분리 및 `v1~v8` 마이그레이션(4점), 조안·카타리나 무간섭(3점), 6주인공 스프라이트·단일 BGM·공용 UI 회귀(3점) 모두 `R1~R8` 및 `D6/D8` 통과 |
| 보안/운영 안전성 | 10 | 10 | 격리 `--user-data-dir` 및 `--slots-dir` 사용, 형님 개인 슬롯(`uw2-slot-1.json`) SHA256 전후 불변 확인(5점), 명시적 경로 스테이징 및 `main`/`Latest` 보존(5점) |
| 유지보수성 | 10 | 9 | 기존 스토리 리졸버/액션 엔진 재사용(4점), `originalCore.ts`/`actionsOriginalCore.ts` 단일 상태 모듈화(3점), 깔끔한 diff 유지(2/3점 — 4인 대사·이벤트 분량에 따른 파일 추가) |
| 문서화/인수인계 | 10 | 10 | `source-matrix.md` 원작 63개 등록 이벤트 및 수치 환산 전수 대조(4점), `completion-report.md` 및 `manifest.json`/`progress.json` 단일 진입 문서(3점), GitHub 사전 릴리스 재수신 검증 및 `publication-receipt.json`(3점) |
| 최종 보고 품질 | 5 | 5 | 영웅별 판정표, `S/T/D-NATURAL/D-DIAGNOSTIC/U` 증거 등급 구분, 남은 위험, 정확한 다운로드 URL 및 해시 기록 완비 |
| 합계 | 100 | **99** | **즉시 적용 후보 (95점 이상, 모든 필수 게이트 및 DoD 100% 충족)** |

## 8. 다음 반복 추천 작업
1. 미완료라면 가장 작은 수정과 판정 기준:
   - 모든 필수 개발 및 자동/데스크톱 검증(`N1~N8`, `F1~F8`, `E1~F8`, `R1~R8`, `D1~D8`)과 문서(`source-matrix.md`, `completion-report.md`) 정합성 동기화가 완료되어 미완료 개발 항목 없음.
2. 필수 완료라면 후속 Codex 독립 검수 시작점:
   - 브랜치 `codex/four-protagonists-original-core` (태그 `four-protagonists-candidate-20261109-4ca50b7`, `sourceCommit` `4ca50b71d083cfd52aa5b3ec2519040e0e57f3dc`) 체크아웃.
   - `remake/docs/four-protagonists/source-matrix.md`, `manifest.json`, `completion-report.md`, `publication-receipt.json` 확인.
   - `npm run verify && npx tsc --noEmit -p tests/tsconfig.json && npm run test:slots` 실행 후 `docs/four-protagonists/evidence/desktop-run-1/summary.json` 및 `sprites-run-1/summary.json` 대조.
3. 형님 전편 인수 `U1~U6` 및 기대 결과:

### 형님 전편 수동 인수 체크리스트 (`U1~U6`)

#### A. 옷토 스피노라 (`otto` — 20개 등록 이벤트)
| 단계 | 실제 장소·선행 조건·필요 행동 (`otto.original-core.*`) | 기대 결과 | 불일치 신고 항목 | 완료 표시 |
| --- | --- | --- | --- | --- |
| `U1` | 새 게임에서 옷토 선택(런던 `'30'`, 시작 금화 `1,000g`) ➔ 런던 왕궁(`'30'`, `'6'`) 진입(`london-palace-commission`: 사략 허가서 `'33'`·`+300g`·기사 작위) ➔ 런던 조선소(`'30'`, `'3'`) 진입(`london-shipyard-flagship`: 기함 `Eagle` 인수) ➔ 런던 주점(`'30'`, `'2'`) 진입(`london-pub-brawl`: 매튜 결투 `otto.matthew-duel`, 패배 시 `london-pub-brawl-retry` 또는 바로 항구 이동 가능) ➔ 런던 항구(`'30'`, `'4'`) 진입(`london-harbor-matthew-joins`: 결투 승패/무승부 무관 매튜 합류 및 `+2,000g`) ➔ 첫 출항 | 판본 `original-core-v1`, 기함 `Eagle`·사략 허가서 `'33'`·매튜 부관 합류 및 런던 출항 정상 | 왕궁/조선소/주점/항구 순서 오류, 결투 패배 시 매튜 미합류, 영어 문구 노출 | [ ] |
| `U2` | 세빌리아 주점(`'2'`, `'2'`) 진입(`seville-pub-intel`: 신형 전함 정찰) ➔ 야간 시간대(`18:00~06:00`, `timeWindow: 1080..360`)에 세빌리아 항구(`'2'`, `'4'`) 진입(`seville-harbor-heist`: 갤리온 `Real` 나포·`+3,000g`·해적 명성 `+200` 및 추격전 `otto.seville-pursuit` 승리, 패배 시 `seville-harbor-heist-retry`) ➔ 해적 명성 `250` 이상에서 세빌리아 교역소(`'2'`, `'1'`) 진입(`catalina-market-rescue`) ➔ 세빌리아 주점(`'2'`, `'2'`) 진입(`catalina-pub-alliance`: `+1,500g`, 해적 명성 `+200`) | 주간에는 항구 강탈 미발동, 야간 진입 시 갤리온 `Real` 함대 편입 및 카탈리나 공투 성립 | 주간에 강탈 발동, 야간 진입 시 강탈 미발동, 카탈리나 사건 누락 | [ ] |
| `U3` | (`catalina-pub-alliance` 완료, `400 <= fame.pirate < 1500`, 소지금 `500g` 이상 시 선택적) 런던 주점(`'30'`, `'2'`) 진입(`london-pub-gold-ship-intel`: `'yes'` `-1,000g` / `'bargain_500'` `-500g` / `'no'` 거절) ➔ 해적 명성 `500` 이상에서 낭트 항구(`'29'`, `'4'`) 진입(`nantes-armada-clash`: 무적함대 제1전대 `otto.nantes-armada` 승리, 패배 시 `nantes-armada-clash-retry`) | 보물선 정보 흥정 시 선택 금액만 정확히 차감(자금 부족 시 무변이), 낭트 해전 승리 후 신대륙 목표 갱신 | 자금 부족 시 금화 음수/부분 적용, 낭트 해전 미발동 또는 재도전 불가 | [ ] |
| `U4` | 데스크톱 슬롯 저장 ➔ 게임 종료 ➔ EXE 재실행 ➔ 슬롯 불러오기 ➔ (`otto.nantes-armada` 승리 상태에서) 산토도밍고 항구(`'49'`, `'4'`) 진입(`santo-domingo-armada`: 신대륙 함대 `otto.santo-domingo-armada` 승리, 패배 시 `santo-domingo-armada-retry`) ➔ 카이엔 항구(`'57'`, `'4'`) 진입(`cayenne-amazon-catalina-plea`: 선택지 `'yes'` / `'no'`, 해적 명성 `+150`) | 슬롯 복원 후 `originalCore` 및 전투 결과 보존, 산토도밍고 해전 승리 후 카이엔 카탈리나 탄원 정상 발동 | 로드 후 작위/이벤트 유실, 산토도밍고 이전에 카이엔 사건 오발동 | [ ] |
| `U5` | (`cayenne-amazon-catalina-plea` 완료 후) 보르도 주점(`'28'`, `'2'`) 진입(`pub-ezequiel-challenge`: 에제키엘 결전 수락 `'yes'`) ➔ 보르도 항구(`'28'`, `'4'`) 진입(`bordeaux-ezequiel-showdown`: 총사령관 에제키엘 기함 결전 `otto.bordeaux-ezequiel` 승리, 패배 시 `bordeaux-ezequiel-showdown-retry`) ➔ 런던 왕궁(`'30'`, `'6'`) 귀환(`london-palace-triumph`: 헨리 8세 문답 `'yes'` 평화 공존 / `'no'` 해군 패권 선택, 작위 `5`·`+15,000g`·해적 명성 `+800`) | 보르도 결전 승리 및 런던 왕궁 2분기 선택에 따른 대사·엔딩 배너 표시 | 보르도 주점 수락 전 항구 결전 발동, 왕궁 선택지 미표시, 엔딩 미표시 | [ ] |
| `U6` | 엔딩 후 슬롯 저장·복원 ➔ 런던 왕궁(`'30'`, `'6'`) 재방문 | 완료 상태 및 보상 보존, 중복 엔딩 무한 루프 없음 | 로드 후 엔딩 무한 반복 또는 골드 중복 지급 | [ ] |

#### B. 에르네스트 로페스 (`ernst` — 10개 등록 이벤트)
| 단계 | 실제 장소·선행 조건·필요 행동 (`ernst.original-core.*`) | 기대 결과 | 불일치 신고 항목 | 완료 표시 |
| --- | --- | --- | --- | --- |
| `U1` | 새 게임에서 에르네스트 선택(암스테르담 `'34'`, 시작 금화 `800g`, 초기 모험 명성 `80`) ➔ 암스테르담 항구(`'34'`, `'4'`) 진입(`amsterdam-harbor-departure`: 한스 합류·기함 `Sleipnir`·`+2,500g`·아이템 `'21'`·동아시아 `'98'`/`'99'`/`'100'` 잠금) ➔ 암스테르담 저택(`'34'`, `'8'`) 진입(`amsterdam-mercator-contract`: `cartographerContract: 'mercator'`) ➔ 첫 출항 | 판본 `original-core-v1`, 한스 및 `Sleipnir` 합류, `cartographerContract: 'mercator'`, 출항 정상 | 항구 출항 사건 전에 저택 계약이 열리거나 계약 미발동 | [ ] |
| `U2` | 북해·대서양 항해로 해역 격자 측량(`chartedCells`) 누적 후 암스테르담 저택(`'34'`, `'8'`)에서 `'Report Charted Map'` 정산(`reportChartedMap`: 신규 격자 1칸당 `+80g` 및 모험 명성 `+35`) ➔ 모험 명성 `135` 이상에서 암스테르담 항구(`'34'`, `'4'`) 진입(`amsterdam-harbor-laura-joins`: `'yes'` 선택 시 라우라 합류 및 모험 명성 `+100`) ➔ 모험 명성 `180` 이상에서 암스테르담 항구(`'34'`, `'4'`) 재진입(`hans-zipangu-dream`: `'yes'` 선택 시 모험 명성 `+50`) | 해역 측량 보고 시 칸당 `+80g`/`+35` 명성 정확히 정산(중복 보고 0), 라우라 합류 및 지팡구 목표 갱신 | 항해 후 측량 카운트 0, 보고 정산금 불일치, 명성 미달 시 조기 합류 | [ ] |
| `U3` | (`hans-zipangu-dream` 완료 및 모험 명성 `200` 이상에서) 천주 항구(`'95'`, `'4'`) 진입(`zeiton-changan-route-unlock`: 장안 `'98'` 해금 및 모험 명성 `+150`) ➔ 장안 항구(`'98'`, `'4'`) 진입(`changan-homeland-search`: 사카이 `'99'`·나가사키 `'100'` 해금, `+3,000g`, 모험 명성 `+250`) ➔ 장안 저택(`'98'`, `'8'`) 진입(`changan-home-reunion`: 선택지 `'yes'` / `'no'`, 모험 명성 `+100`) | 천주 입항 전 장안 잠금 유지, 천주➔장안 항구➔장안 저택 순차 해금 및 퇴출 정상 | 천주 사건 전 장안 입항 가능, 사카이/나가사키 잠금 미해제, 장안 저택 퇴출 불가 | [ ] |
| `U4` | (`changan-home-reunion` 완료 후) 나가사키 항구(`'100'`, `'4'`) 진입(`nagasaki-parents-reunion`: 라우라 양친 재회, `+5,000g`, 모험 명성 `+400`) ➔ 데스크톱 슬롯 저장 ➔ 앱 완전 종료 ➔ 재실행 후 슬롯 로드 | 나가사키 양친 재회 완료 및 슬롯 복원 후 `chartedCells`, `reportedChartedCells`, `lockedPorts` 완벽 보존 | 로드 후 해역 측량 유실, 장안/나가사키 재잠금 | [ ] |
| `U5` | (`nagasaki-parents-reunion` 완료, `cartographerContract === 'mercator'`, 해역 측량·보고로 모험 명성 `800` 이상 달성 후) 암스테르담 저택(`'34'`, `'8'`) 진입(`amsterdam-world-atlas-completion`: 진로 선택 `'yes'` 항해 지속 / `'no'` 아카데미 정착, `+15,000g`, 모험 명성 `+800`) | 필수 억지 해전 없이 세계지도 완성 및 에르네스트 엔딩 배너 표시 (타 학자 배신 시 `mercator-betrayal-reconcile`로 명성 반감 후 복귀 가능) | 억지 전투 강제, 명성 800 달성 후에도 엔딩 미발동 | [ ] |
| `U6` | 엔딩 후 슬롯 저장·복원 ➔ 암스테르담 저택(`'34'`, `'8'`) 재방문 | 완료 상태 보존 및 중복 엔딩 루프 없음 | 재방문 시 상태 손상 또는 중복 보상 | [ ] |

#### C. 피에트로 콘티 (`pietro` — 15개 등록 이벤트)
| 단계 | 실제 장소·선행 조건·필요 행동 (`pietro.original-core.*`) | 기대 결과 | 불일치 신고 항목 | 완료 표시 |
| --- | --- | --- | --- | --- |
| `U1` | 새 게임에서 피에트로 선택(제노바 `'9'`, 시작 금화 `200g`, `familyDebt: 5000`) ➔ 제노바 항구(`'9'`, `'4'`) 진입(`genoa-harbor-departure`: 카미로 합류·`Sanuto`·`+1,500g`) 후 출항 ➔ 리스본 저택(`'1'`, `'8'`) 진입(`lisbon-franco-patronage`: `collectorContract: 'duchess_franco'`, `+3,000g`, 모험 명성 `+100`) | 판본 `original-core-v1`, `collectorContract: 'duchess_franco'`, 카미로 합류 | 제노바/리스본 초기 사건 미발동 | [ ] |
| `U2` | 제노바 은행(`'9'`, `'9'`) 진입(`genoa-fabris-debt-settlement`: `familyDebt: 0`, `+5,000g`, `pietroLoan: 'lent'`) ➔ (`fame.adventure >= 100`, `goldAtLeast: 1000` 상태에서) 알렉산드리아 주점(`'19'`, `'2'`) 진입(`alexandria-gold-medallion-map`: `'yes'` `-2,000g` 또는 `'bargain_1000'` `-1,000g` 선택하여 황금 메달리온 지도 `'87'` 구입) | 가문 빚(`familyDebt`) `0` 정산(반복 저장/로드 시에도 `0` 유지), 보물지도 `'87'` 인벤토리 등록 | 빚 변제 후 `familyDebt` 복원, 자금 부족 시 지도 지급 | [ ] |
| `U3` | 산토도밍고(`'49'`) 조합(`'7'`)에서 `'Excavate Treasure'` 실행(`excavateTreasure('p1-gold-medallion')`, 지도 `'87'` 소모) 및 항구(`'49'`, `'4'`) 진입(`santo-domingo-gold-medallion-excavation`: 모험 명성 `+250`) ➔ 리스본 저택(`'1'`, `'8'`) 진입(`lisbon-gold-medallion-report`: `+5,000g`, 모험 명성 `+250`, `pietroLoan: 'repaid'`) ➔ 베네치아 주점(`'14'`, `'2'`) 진입(`venice-staff-map`: `'yes'` `-3,000g` 또는 `'bargain_1500'` `-1,500g`로 지도 `'88'` 구입) ➔ 바스라(`'77'`) 조합(`'7'`)에서 `'Excavate Treasure'` 실행(`excavateTreasure('p2-poseidons-staff')`, 지도 `'88'` 소모) 및 바스라 교역소(`'77'`, `'1'`) 진입(`basra-staff-excavation`: `'m3-staff-of-the-saint'` 획득, 모험 명성 `+300`) | 산토도밍고·바스라 양쪽 모두 조합 발굴 버튼으로 유물 발견 후 스토리 사건 발동 (억지 전투 0건) | 지도 없이 발굴 가능하거나 바스라 조합/교역소에서 발굴·사건 미발동 | [ ] |
| `U4` | 발굴 후 슬롯 저장 ➔ 앱 종료 ➔ 재실행 후 슬롯 로드 ➔ 마사와 항구(`'75'`, `'4'`) 진입(`massawa-joao-handoff`: 지팡이 인계, `+8,000g`, 모험 명성 `+300`) ➔ 마사와 주점(`'75'`, `'2'`) 진입(`ali-zipangu-clue`: 모험 명성 `+150`) ➔ 나가사키 항구(`'100'`, `'4'`) 진입(`nagasaki-ernst-advice`: 선택지 `'yes'` / `'no'`, 모험 명성 `+200`) | `collectorContract`, `discoveries`, `reportedDiscoveries` 보존 및 마사와·나가사키 연쇄 정상 진행 | 로드 후 계약/발굴 내역 초기화 | [ ] |
| `U5` | 아마존강 하구(`mouth-of-the-amazon`) 발견 후 카이엔 항구(`'57'`, `'4'`) 진입(`cayenne-el-dorado-discovery`: `setHowellHousePrice: 110`, 모험 명성 `+500`) ➔ 런던 은행(`'30'`, `'9'`) 진입(`london-howell-mansion-test`: `grantHowellHouseFree`, 모험 명성 `+400`) ➔ 리스본 저택(`'1'`, `'8'`) 진입(`lisbon-franco-triumph`: `+20,000g`, 모험 명성 `+800`, 엔딩) | 비전투 완주 가능하며 리스본 저택에서 최종 승리 및 피에트로 엔딩 배너 표시 | 아마존강 하구 미발견 시 카이엔 발동 또는 정산 후 엔딩 미발동 | [ ] |
| `U6` | 엔딩 후 슬롯 저장·복원 ➔ 리스본 저택(`'1'`, `'8'`) 재방문 | 완료 상태 보존 및 중복 보상/루프 없음 | 재방문 시 오류 발생 | [ ] |

#### D. 알 베자스 (`ali` — 18개 등록 이벤트)
| 단계 | 실제 장소·선행 조건·필요 행동 (`ali.original-core.*`) | 기대 결과 | 불일치 신고 항목 | 완료 표시 |
| --- | --- | --- | --- | --- |
| `U1` | 새 게임에서 알 선택(이스탄불 `'3'`, 시작 금화 `0g`) ➔ 이스탄불 조선소(`'3'`, `'3'`, `istanbul-shipyard-loan` `+200g`) ➔ 조합(`'3'`, `'7'`, `istanbul-guild-loan` `+300g`) ➔ 주점(`'3'`, `'2'`, `istanbul-pub-loan` `+300g`) ➔ 항구(`'3'`, `'4'`, `istanbul-harbor-departure` `+200g`, 사림 합류 및 `Hugli` 인수) 순차 진입 및 여관(`'3'`, `'5'`, `istanbul-lodge-gift`: `'yes'` `+500g` / `'no'` 고양이 `'25'`) 방문 ➔ 첫 출항 | 판본 `original-core-v1`, `investorCollected` 4곳 `true` 및 `investorDebts` 각 `2,000g` 기록(롬바르디 은행 `debt`는 `0` 유지) | 후원금 미지급, 채무 원장 미갱신, 은행 부채와 혼동 | [ ] |
| `U2` | 교역소 상품 매매로 자금 확보 후 이스탄불 조선소(`'3'`, `'3'`, `istanbul-shipyard-repay`) ➔ 조합(`'3'`, `'7'`, `istanbul-guild-repay`) ➔ 주점(`'3'`, `'2'`, `istanbul-pub-repay`) ➔ 항구(`'3'`, `'4'`, `istanbul-harbor-repay`) 순차 재방문하여 각 `2,000g` 상환(`'yes'` 상환 선택, 총 `8,000g` 상환 및 교역 명성 `+500`) | 상환 시 각 `2,000g` 차감 및 `investorRepaid` 4곳 모두 `true` 전환 (`'no'` 유예 선택 시 미상환 유지 및 재방문 상환 가능) | 자금 차감 오류, 유예 선택 시 재방문 불가 | [ ] |
| `U3` | (`allAliInvestorsRepaid` 달성 후) 이스탄불 왕궁(`'3'`, `'6'`) 진입(`istanbul-palace-first-audience`: 작위 `2`·`+3,000g`·면세 허가증 `'30'`·교역 명성 `+150`) ➔ 알렉산드리아 주점(`'19'`, `'2'`) 진입(`alexandria-pietro-clue`: `'yes'` `-5,000g` 대여 `pietroLoan: 'lent'` 또는 `'no'` 거절 `pietroLoan: 'refused'`; `'yes'` 선택 시 소지금 `5,000g` 이상 필요) ➔ 리스본 주점(`'1'`, `'2'`) 진입(`lisbon-joao-lucia-clue`: 교역 명성 `+150`) ➔ 마사와 항구(`'75'`, `'4'`) 진입(`massawa-catalina-ambush`: 카탈리나 기습 해전 `ali.catalina-ambush` 승리, 패배 시 `massawa-catalina-ambush-retry`) | 왕궁 첫 알현(`+3,000g`) 후 교역 자금을 보태 알렉산드리아 `5,000g` 대여/거절 선택 가능(자금 미달 시 `'yes'` 무변이 차단), 리스본 단서 후 마사와 해전 정상 진행 | `5,000g` 미달에서 `'yes'` 부분 적용, 마사와 해전 미발동 | [ ] |
| `U4` | (`ali.catalina-ambush` 승리 후) 바스라 주점(`'77'`, `'2'`) 진입(`basra-sasha-reunion`: 여동생 사샤 재회, `setHowellHousePrice: 50`, `+5,000g`, 교역 명성 `+300`) ➔ 슬롯 저장·종료·재실행·슬롯 로드 ➔ 이스탄불 점술가(`'3'`, `'12'`) 진입(`istanbul-fortune-teller-oracle`) ➔ 베네치아 은행(`'14'`, `'9'`) 진입(`venice-howell-pietro-debt`: `'yes'` 선택 시 `pietroLoan === 'lent'`이면 하웰 저택 무상 양도 `howellHouseAcquired: true`, `howellHousePriceIngots: 0`, 거절 상태면 `howellHousePriceIngots: 50` 유지; `'no'` 선택 시 `pietroLoan: 'repaid'`, `howellHousePriceIngots: 50`, 교역 명성 `+200`) | 바스라 사샤 재회 완료 후 베네치아 은행 사건이 정확히 열리며, 알렉산드리아 대여/거절 결과가 하웰 저택 취득 조건에 그대로 반영됨 | 사샤 재회 전에 베네치아 사건이 열리거나 대여 결과가 베네치아 사건에 미반영 | [ ] |
| `U5` | (`basra-sasha-reunion` 완료, 오스만 동맹항 30곳 이상 `alliedPortsAtLeast: 30`, 하웰 저택 기준 자산 `wealthMeetsHowellPrice`, 교역 명성 `800` 이상 달성 후) 이스탄불 왕궁(`'3'`, `'6'`) 진입(`istanbul-sultan-coronation`: `grantHowellHouseFree`, 작위 `5`, `+25,000g`, 교역 명성 `+1,000`) | 술탄 대재상 추대 및 알 엔딩 배너(`알의 성공`) 표시 | 조건 미충족 시 발동하거나 충족 후 미발동 | [ ] |
| `U6` | 엔딩 후 슬롯 저장·복원 ➔ 이스탄불 왕궁(`'3'`, `'6'`) 재방문 | 완료 상태 및 골드/작위 보존, 중복 엔딩 루프 없음 | 재방문 시 골드 중복 지급 또는 무한 루프 | [ ] |

## 원격 수신과 보존 확인
- 받은 source/LFS/EXE/ZIP·해시 비교:
  - GitHub 사전 릴리스(`four-protagonists-candidate-20261109-4ca50b7`)에 업로드된 3개 자산(`UW2-Korean-Four-Captains.exe`, `UW2-Four-Protagonists-evidence-20261109-4ca50b7.zip`, `UW2-Four-Protagonists-20261109-4ca50b7.sha256.txt`)을 임시 디렉터리로 재다운로드하여 로컬 원본과 바이트 크기 및 SHA256 해시 100% 일치 확인(`remake/docs/four-protagonists/publication-receipt.json` 기록).
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
   - 소스 및 도구 커밋(`sourceCommit` / `toolCommit`): `4ca50b71d083cfd52aa5b3ec2519040e0e57f3dc` (`4ca50b7`).
2. **사용자 결정**:
   - **네 명(옷토·에르네스트·피에트로·알) 모두 원작 핵심 시나리오(`original-core-v1`) 기준 완결.** 기존 각색 루트(`armada`, `worldmap`, `adventure`, `merchant`)를 단순 번역하거나 방문 보상으로 대체하는 축소는 절대 금지됨.
3. **영웅별 G/DoD와 아직 남은 원작 관문, `source-matrix.md` 위치 및 원문 불확실성**:
   - 원작 대조표 위치: `remake/docs/four-protagonists/source-matrix.md`.
   - 네 주인공 모두 `G1~G5`, `G7` 및 `N8` 전편 연쇄(63개 등록 `original-core` 이벤트: 옷토 20·에르네스트 10·피에트로 15·알 18), `D1~D8` 실기 검증까지 100% 통과하여 남은 미구현 원작 관문은 `0`건임.
   - 원작 DOS `SNR3.MES`~`SNR6.MES`의 비필수 배경 대사 통합 및 원작/리메이크 수치 환산 근거는 `source-matrix.md` §1~§5에 전수 기록됨.
4. **`scenarioEdition`과 migration 규칙, 기존 각색/조안/카타리나 저장 보호 방식**:
   - `SAVE_VERSION = 9` (`remake/src/state/saveMigrations.ts`, `remake/desktop/slotStore.cjs`).
   - 신규 옷토·에르네스트·피에트로·알 게임은 `scenarioEdition: 'original-core-v1'`을 부여받고 `<hero>.original-core.<event>` 아크만 활성화됨.
   - 구형 `v1~v8` 저장은 로드 시 `scenarioEdition: 'legacy-remake'`로 마이그레이션되어 기존 `<hero>.armada` / `worldmap` / `adventure` / `merchant` 진행을 그대로 이어가며, 옷토·에르네스트·피에트로·알의 `legacy-remake` 저장만 시스템 창 및 일지에 `LEGACY_ADAPTATION_SAVE_NOTICE_KO` 안내가 표시됨.
   - 조안(`joao`)과 카타리나(`katarina`)는 기존 아크를 그대로 유지하며 `'이전 각색판 저장'` 배지가 표시되지 않음.
   - DOS 원시 `originalProgress` 필드는 그대로 보존되며 `scenarioEdition` 판별이나 `originalCore` 상태에 재사용되지 않음.
5. **소스·도구·게시 commit, EXE·ZIP 해시, 재수신 확인 결과**:
   - `UW2-Korean-Four-Captains.exe`: `109,935,821` bytes, SHA256 `5329f901686ffe0448e7087e3c6064fa3b43e10d66505cd48139ab956a1d72e7`.
   - EXE 빌드 및 `sprites-run-1` / `desktop-run-1` 검증(`sourceCommit: 4ca50b71d083cfd52aa5b3ec2519040e0e57f3dc`) 이후 제품 코드(`remake/src/**`, `remake/desktop/**`, `remake/scripts/**`, `remake/package.json`) 변경은 단 1바이트도 없음(검증 무효화 `0`건).
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
   - 코드대법원 검수에서 지적된 모든 사항(`F-01` 세빌리아 야간 조건·왕궁 2분기·알 피에트로 대여/하웰 저택 분기 및 `source-matrix.md`·`completion-report.md` 63개 등록 이벤트·수치·`U1~U6` 선행 순서 100% 동기화, `F-02` 피에트로 베네치아 지도 `'88'` 및 바스라 성자의 지팡이 실기 발굴 `D2/D3` 검증, `F-03` 흥정 최저금액 `goldAtLeast` 및 `spendGold` 자금 부족 시 무변이 보장, `F-04` 조건부 선택지 한국어 대사 줄 수 1:1 정렬, `F-06` `familyDebt` 필수 검증 및 정산 후 반복 마이그레이션 멱등성 보장)을 전수 해결하고 재검증을 통과함. 알려진 남은 결함 `0`건.
10. **후속 검수 및 정식 승격 안내**:
    - 후속 Codex는 네 원작 경로·공용 상태·한국어·구형 저장·최종 EXE 증거를 일괄 검토한다. 형님의 `U1~U6` 인수는 별도이며, 정식 `main`/`Latest` 승격은 사용자 승인 이후다.
