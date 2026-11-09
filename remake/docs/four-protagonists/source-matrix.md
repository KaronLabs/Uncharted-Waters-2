# Four Protagonists (`otto`, `ernst`, `pietro`, `ali`) Original Core Source Matrix

- **Worktree**: `remake`
- **Original DOS Scenario Files**:
  - `SNR3.DAT` / `SNR3.MES` — 옷토 스피노라 (`otto`, Otto Baynes) — `19` events (`otto.original-core.*`)
  - `SNR4.DAT` / `SNR4.MES` — 에르네스트 로페스 (`ernst`, Ernst Von Bohr) — `10` events (`ernst.original-core.*`)
  - `SNR5.DAT` / `SNR5.MES` — 피에트로 콘티 (`pietro`, Pietro Conti) — `15` events (`pietro.original-core.*`)
  - `SNR6.DAT` / `SNR6.MES` — 알 베자스 (`ali`, Ali Vezas) — `18` events (`ali.original-core.*`)
- **Total `original-core` Events**: `62` events (`173` total story events across `14` arcs)
- **Scenario Edition**: `original-core-v1` (with `legacy-remake` preserved for `v1`–`v8` save compatibility)

---

## 0. Port & Building ID Mapping (DOS 0-Based vs. Remake 1-Based)

### 0.1 Port IDs (`portId = String(dosSelector + 1)`)

| DOS Selector | Remake `portId` | English Name | Korean Name |
| --- | --- | --- | --- |
| `0` | `'1'` | Lisbon | 리스본 |
| `1` | `'2'` | Seville | 세빌리아 |
| `2` | `'3'` | Istanbul | 이스탄불 |
| `8` | `'9'` | Genoa | 제노바 |
| `13` | `'14'` | Venice | 베네치아 |
| `18` | `'19'` | Alexandria | 알렉산드리아 |
| `26` | `'27'` | Ceuta | 세우타 |
| `27` | `'28'` | Bordeaux | 보르도 |
| `28` | `'29'` | Nantes | 낭트 |
| `29` | `'30'` | London | 런던 |
| `33` | `'34'` | Amsterdam | 암스테르담 |
| `48` | `'49'` | Santo Domingo | 산토도밍고 |
| `56` | `'57'` | Cayenne | 카이엔 |
| `72` | `'73'` | Aden | 아덴 |
| `74` | `'75'` | Massawa | 마사와 |
| `76` | `'77'` | Basra | 바스라 |
| `94` | `'95'` | Zeiton | 천주 (자이톤) |
| `97` | `'98'` | Changan | 장안 |
| `98` | `'99'` | Sakai | 사카이 |
| `99` | `'100'` | Nagasaki | 나가사키 |

### 0.2 Building IDs (`buildingId = String(dosQualifier + 1)`)

| DOS Qualifier | Remake `buildingId` | Building Name | Korean Name |
| --- | --- | --- | --- |
| `0` | `'1'` | Market | 교역소 |
| `1` | `'2'` | Pub | 주점 (술집) |
| `2` | `'3'` | Shipyard | 조선소 |
| `3` | `'4'` | Harbor | 항구 |
| `4` | `'5'` | Lodge | 여관 |
| `5` | `'6'` | Palace | 왕궁 |
| `6` | `'7'` | Guild | 조합 |
| `7` | `'8'` | Residence / Special Building | 저택 / 지리학자 / 수집가 |
| `8` | `'9'` | Bank | 은행 |
| `9` | `'10'` | Item Shop | 아이템 상점 |
| `10` | `'11'` | Church | 교회 |
| `11` | `'12'` | Fortune Teller | 점술가 |

---

## 1. 옷토 스피노라 (`otto` — `SNR3.DAT` / `SNR3.MES`, 19 Events)

| Stage | Section / Offset | Port (`portId`) & Building (`buildingId`) | Conditions & State Checks | Key Speakers & Messages | Effects, Choices & Transitions | Remake Event IDs |
| --- | --- | --- | --- | --- | --- | --- |
| `O0` | Sec 0 (`0x3e..0x246`) | London (`'30'`) Palace (`'6'`), Shipyard (`'3'`), Pub (`'2'`), Harbor (`'4'`) | Start in London (`'30'`) with `0` ships & `1,000` gold. Palace -> Shipyard -> Pub -> Harbor. Cannot Defect (`canProtagonistDefect === false`). | `henry-viii` (`헨리 8세`), `gilbert` (`길버트`), `matthew` (`마슈 로이`), `otto` (`msg#0..74`) | Palace grants `300` gold, Letter of Marque (E) (`'33'`), and Knight rank (`royalRankLevel: 1`); Shipyard grants Caravel Latina `Eagle` (`shipId: '3'`); Pub triggers duel `otto.matthew-duel` (with repeatable `london-pub-brawl-retry`); Harbor recruits stowaway Matthew Roy (`'37'`) regardless of duel victory or defeat (`msg#37..65`). | `otto.original-core.london-palace-commission`, `otto.original-core.london-shipyard-flagship`, `otto.original-core.london-pub-brawl`, `otto.original-core.london-pub-brawl-retry`, `otto.original-core.london-harbor-matthew-joins` |
| `O1` | Sec 1 (`0x246..0x608`) | Seville (`'2'`) Pub (`'2'`), Harbor (`'4'`), Market (`'1'`) | After `O0`; enter Seville Pub (`'2'`) then Harbor (`'4'`); optional Catalina rescue chain at Seville Market (`'1'`) & Pub (`'2'`). | `matthew`, `otto`, `katarina` (`카탈리나`), `franco` (`프랑코`), Spanish Commander (`msg#82..255`) | Pub gathers intel on Spain's new warship; Harbor commandeers Spanish Galleon `Real` (`shipId: '11'`) and triggers pursuit battle `otto.seville-pursuit` (`+1,500` gold, `+200` piracy fame); Seville Market (`'1'`) & Pub (`'2'`) optional Catalina rescue & anti-Armada alliance (`choice`: `'yes'` / `'no'`, `+100` piracy fame). | `otto.original-core.seville-pub-intel`, `otto.original-core.seville-harbor-heist`, `otto.original-core.seville-harbor-heist-retry`, `otto.original-core.catalina-market-rescue`, `otto.original-core.catalina-pub-alliance` |
| `O2` | Sec 2–3 (`0x608..0xdeb`) | London (`'30'`) Pub (`'2'`), Nantes (`'29'`) Harbor (`'4'`) | After `O1` (`otto.seville-pursuit` victory). | `matthew`, `otto` (`msg#274..374`) | Optional London Pub (`'30'`, `'2'`) gold ship intel purchase (`choice`: `'yes'` `-1,000g` / `'bargain_500'` `-500g` / `'no'`, `+80` piracy fame); Nantes Harbor (`'29'`, `'4'`) intercepts and defeats the Spanish Armada First Squadron (`otto.nantes-armada`, `+2,000` gold, `+250` piracy fame). | `otto.original-core.london-pub-gold-ship-intel`, `otto.original-core.nantes-armada-clash`, `otto.original-core.nantes-armada-clash-retry` |
| `O3` | Sec 3 (`0x9e3..0xdeb`) | Cayenne (`'57'`) Harbor (`'4'`), Santo Domingo (`'49'`) Harbor (`'4'`) | After `O2` (`otto.nantes-armada` victory). | `matthew`, `otto`, `katarina`, `ezequiel` (`에제키엘`) (`msg#350..405`) | Optional Cayenne Harbor (`'57'`, `'4'`) Catalina plea (`choice`: `'yes'` / `'no'`, `+150` piracy fame); Santo Domingo Harbor (`'49'`, `'4'`) crushes the Spanish New World Armada (`otto.santo-domingo-armada`, `+3,000` gold, `+300` piracy fame). | `otto.original-core.cayenne-amazon-catalina-plea`, `otto.original-core.santo-domingo-armada`, `otto.original-core.santo-domingo-armada-retry` |
| `O4` | Sec 4 (`0xdeb..0x10ee`) | Bordeaux (`'28'`) Pub (`'2'`) & Harbor (`'4'`), London (`'30'`) Palace (`'6'`) | After `O3` (`otto.santo-domingo-armada` victory); Bordeaux battle -> London Palace ending. | `ezequiel`, `matthew`, `otto`, `henry-viii`, `gilbert` (`msg#410..480`) | Bordeaux Pub (`'28'`, `'2'`) Ezequiel chivalric challenge (`choice`: `'yes'` / `'no'`); Bordeaux Harbor (`'28'`, `'4'`) final showdown with Commander Ezequiel (`otto.bordeaux-ezequiel`, `+4,000` gold, `+400` piracy fame); London Palace (`'30'`, `'6'`) victory audience & royal clemency for Ezequiel (`+15,000` gold, `+600` piracy fame, `royalRankLevel: 3`, ending `f402`). | `otto.original-core.pub-ezequiel-challenge`, `otto.original-core.bordeaux-ezequiel-showdown`, `otto.original-core.bordeaux-ezequiel-showdown-retry`, `otto.original-core.london-palace-triumph` |

---

## 2. 에르네스트 로페스 (`ernst` — `SNR4.DAT` / `SNR4.MES`, 10 Events)

| Stage | Section / Offset | Port (`portId`) & Building (`buildingId`) | Conditions & State Checks | Key Speakers & Messages | Effects, Choices & Transitions | Remake Event IDs |
| --- | --- | --- | --- | --- | --- | --- |
| `E0` | Sec 0 (`0x18..0x18e`) | Amsterdam (`'34'`) Harbor (`'4'`), Residence (`'8'`) | Start in Amsterdam (`'34'`). Far East ports Changan (`'98'`), Sakai (`'99'`), Nagasaki (`'100'`) locked in `state.originalCore.lockedPorts`. Laura requires `fame.adventure >= 135` via sea charting (`recordChartedPosition`) & Mercator map reporting (`reportChartedMap`). | `hans` (`한스`), `mercator` (`메르카토르`), `laura` (`라우라`), `ernst` (`msg#0..135`) | Harbor (`'34'`, `'4'`) Hans joins & delivers Pinnace `Sleipnir` (`shipId: '13'`, `+1,500` gold); Residence (`'34'`, `'8'`) Mercator signs `cartographerContract: 'mercator'` (`+2,000` gold, `+80` adventure fame); after charting sea sectors & reporting at Residence (`fame.adventure >= 135`), Harbor (`'34'`, `'4'`) polyglot interpreter Laura (`'39'`) asks to join (`choice`: `'yes'` / `'no'`, `+60` adventure fame), followed by Hans's Zipangu dream conversation (`choice`: `'yes'` / `'no'`); betraying Mercator halves all 3 fame values (`halveAllFame`). | `ernst.original-core.amsterdam-harbor-departure`, `ernst.original-core.amsterdam-mercator-contract`, `ernst.original-core.amsterdam-harbor-laura-joins`, `ernst.original-core.hans-zipangu-dream`, `ernst.original-core.mercator-betrayal-reconcile` |
| `E1` | Sec 1–2 (`0x18e..0xa4e`) | Sea charting (`worldTimeTick`), Amsterdam (`'34'`) Residence (`'8'`), Zeiton (`'95'`) Harbor (`'4'`) | `fame.adventure >= 200` via sea charting & `reportChartedMap`; `amsterdam-harbor-laura-joins` completed. | `laura`, `hans`, `ernst` (`msg#156..215`) | Sailing records sea sectors (`CHART_GRID_SIZE = 10`) and reporting at Mercator Residence (`'34'`, `'8'`) awards `+150g` & `+35` Adventure Fame per sector; at Zeiton Harbor (`'95'`, `'4'`), unlocks Changan (`'98'`, `unlockPort: '98'`, `+150` adventure fame). | `ernst.original-core.zeiton-changan-route-unlock` |
| `E2` | Sec 2 (`0x608..0xa4e`) | Changan (`'98'`) Harbor (`'4'`) & Residence (`'8'`), Nagasaki (`'100'`) Harbor (`'4'`) | After `E1`; dock at unlocked Changan (`'98'`) then unlocked Nagasaki (`'100'`). | `laura`, `hans`, `ernst` (`msg#169..233`) | At Changan Harbor (`'98'`, `'4'`), lacquer craftsman identifies Laura's hairpin as Japanese and unlocks Sakai (`'99'`) & Nagasaki (`'100'`); optional Changan Residence (`'98'`, `'8'`) orphan memory dialogue (`choice`: `'yes'` / `'no'`, `+80` adventure fame); at Nagasaki Harbor (`'100'`, `'4'`), Laura reunites with her parents (`+3,000` gold, `+250` adventure fame). | `ernst.original-core.changan-homeland-search`, `ernst.original-core.changan-home-reunion`, `ernst.original-core.nagasaki-parents-reunion` |
| `E3` | Sec 2 (`0xa4e`) | Amsterdam (`'34'`) Residence (`'8'`) | After `E2`, `fame.adventure >= 800`, `cartographerContract === 'mercator'`. | `mercator`, `laura`, `hans`, `ernst` | Present completed World Atlas to Master Mercator (`choice`: `'yes'` return to sea with Laura / `'no'` settle in Amsterdam with Laura, `+15,000` gold, `+600` adventure fame, ending `f403`). Zero ungrounded mandatory combats. | `ernst.original-core.amsterdam-world-atlas-completion` |

---

## 3. 피에트로 콘티 (`pietro` — `SNR5.DAT` / `SNR5.MES`, 15 Events)

| Stage | Section / Offset | Port (`portId`) & Building (`buildingId`) | Conditions & State Checks | Key Speakers & Messages | Effects, Choices & Transitions | Remake Event IDs |
| --- | --- | --- | --- | --- | --- | --- |
| `P0` | Sec 0 (`0x24..0x44b`) | Genoa (`'9'`) Harbor (`'4'`), Lisbon (`'1'`) Residence (`'8'`), Genoa (`'9'`) Bank (`'9'`) | Start in Genoa (`'9'`) with `5,000` family debt (`familyDebt: 5000`). | `camillo` (`카미로`), `pietro`, `duchess-christiana` (`크리스티나 공작부인`), `butler-marco` (`마르코`) (`msg#0..74`) | Genoa Harbor (`'9'`, `'4'`) Camillo joins & provides Caravel `Sanuto` (`shipId: '6'`, `+1,500` gold); Lisbon Residence (`'1'`, `'8'`) Duchess Christiana signs `collectorContract: 'duchess_franco'` (`+3,000` gold, `+100` adventure fame; betrayal halves all fame); Genoa Bank (`'9'`, `'9'`) Collector Fabris suspends family debt (`debt: 0`, `+5,000` gold, `pietroLoan: 'lent'`). | `pietro.original-core.genoa-harbor-departure`, `pietro.original-core.lisbon-franco-patronage`, `pietro.original-core.franco-betrayal-reconcile`, `pietro.original-core.genoa-fabris-debt-settlement` |
| `P1` | Sec 1 (`0x44b..0x7b4`) | Alexandria (`'19'`) Pub (`'2'`), Santo Domingo (`'49'`) Guild (`'7'`) & Harbor (`'4'`), Lisbon (`'1'`) Residence (`'8'`) | `fame.adventure >= 100` for Alexandria map; `hasItem: '87'`; `fame.adventure >= 250` via discoveries & `reportCollectorDiscoveries`. | `camillo`, `pietro`, `duchess-christiana`, `duke-franco` (`msg#95..162`) | Alexandria Pub (`'19'`, `'2'`) offers Map to the Gold Medallion (`choice`: `'yes'` `-2,000g` / `'bargain_1000'` `-1,000g` / `'no'` defer; `goldAtLeast: 1000`, `spendGold`, `addItem: '87'`); Santo Domingo Guild (`'49'`, `'7'`) `'Excavate Treasure'` UI action (`excavateTreasure`) or Harbor (`'49'`, `'4'`) event excavates Gold Medallion (`discoveryId: 'p1-gold-medallion'`, `+250` adventure fame); Lisbon Residence (`'1'`, `'8'`) reports Gold Medallion (`+5,000` gold, `+250` adventure fame, `pietroLoan: 'repaid'`) and learns of João's quest in Massawa. | `pietro.original-core.alexandria-gold-medallion-map`, `pietro.original-core.santo-domingo-gold-medallion-excavation`, `pietro.original-core.lisbon-gold-medallion-report` |
| `P2` | Sec 2 (`0x7b4..0xef8`) | Venice (`'14'`) Pub (`'2'`), Basra (`'77'`) Market (`'1'`), Massawa (`'75'`) Harbor (`'4'`) & Pub (`'2'`) | After `P1`; `goldAtLeast: 3000` for Venice map; `hasItem: '88'`; `hasDiscovery: 'p2-poseidons-staff'`. | `camillo`, `pietro`, `joao` (`조안`), `enrico` (`엔리코`), `ali` (`알`) (`msg#166..212`) | Venice Pub (`'14'`, `'2'`) offers Map to the Staff of the Saint (`choice`: `'yes'` `-3,000g` / `'no'` defer; `spendGold: 3000`, `addItem: '88'`); Basra Market (`'77'`, `'1'`) excavates Staff of the Saint (`discoveryId: 'p2-poseidons-staff'`, `itemId: 'm3-staff-of-the-saint'`, `+300` adventure fame — no ungrounded combat); Massawa Harbor (`'75'`, `'4'`) hands Staff to João & Enrico (`+8,000` gold, `+300` adventure fame) and learns of El Dorado at the Mouth of the Amazon; optional Massawa Pub (`'75'`, `'2'`) Ali Zipangu clue (`+80` adventure fame). | `pietro.original-core.venice-staff-map`, `pietro.original-core.basra-staff-excavation`, `pietro.original-core.massawa-joao-handoff`, `pietro.original-core.ali-zipangu-clue` |
| `P3` | Sec 3 (`0xef8..0x1512`) | Nagasaki (`'100'`) Harbor (`'4'`), Cayenne (`'57'`) Harbor (`'4'`), London (`'30'`) Bank (`'9'`), Lisbon (`'1'`) Residence (`'8'`) | `hasDiscovery: 'mouth-of-the-amazon'`; `collectorContract === 'duchess_franco'`. | `camillo`, `pietro`, `ernst` (`에르네스트`), `duchess-christiana`, `duke-franco` (`msg#240..328`) | Optional Nagasaki Harbor (`'100'`, `'4'`) Ernst & Laura Golden Temple advice (`choice`: `'yes'` / `'no'`, `+120` adventure fame); Cayenne Harbor (`'57'`, `'4'`) unveils El Dorado and rescues Elder Fabris (`setHowellHousePrice: 110`, `+500` adventure fame — no ungrounded combat); London Bank (`'30'`, `'9'`) Collector Sherlock Howell awards his London estate free of charge (`grantHowellHouseFree`, `+400` adventure fame); Lisbon Residence (`'1'`, `'8'`) final triumph (`+20,000` gold, `+800` adventure fame, ending `f404`). | `pietro.original-core.nagasaki-ernst-advice`, `pietro.original-core.cayenne-el-dorado-discovery`, `pietro.original-core.london-howell-mansion-test`, `pietro.original-core.lisbon-franco-triumph` |

---

## 4. 알 베자스 (`ali` — `SNR6.DAT` / `SNR6.MES`, 18 Events)

| Stage | Section / Offset | Port (`portId`) & Building (`buildingId`) | Conditions & State Checks | Key Speakers & Messages | Effects, Choices & Transitions | Remake Event IDs |
| --- | --- | --- | --- | --- | --- | --- |
| `A0` | Sec 0 (`0x2c..0x65e`) | Istanbul (`'3'`) Shipyard (`'3'`), Guild (`'7'`), Pub (`'2'`), Harbor (`'4'`), Lodge (`'5'`) | Start in Istanbul (`'3'`) with `0` gold, `1,000` debt, `0` ships. | `salim` (`사림`), `ali`, 4 Istanbul benefactors (`msg#12..142`) | Collects startup loans (`+200g`, `+300g`, `+300g`, `+200g` = `1,000` gold total; `debt` becomes `9,000`, `investorDebts`: `2,000g * 4`) across Shipyard (`'3'`), Guild (`'7'`), Pub (`'2'`), and Harbor (`'4'`), where Salim (`'40'`) joins with Dhow `Hugli` (`shipId: '1'`); Istanbul Lodge (`'5'`) innkeeper offers startup gift (`choice`: `'yes'` `+500g` / `'no'` Cat item `'25'`). | `ali.original-core.istanbul-shipyard-loan`, `ali.original-core.istanbul-guild-loan`, `ali.original-core.istanbul-pub-loan`, `ali.original-core.istanbul-harbor-departure`, `ali.original-core.istanbul-lodge-gift` |
| `A1` | Sec 1 (`0x65e..0xf5a`) | Istanbul (`'3'`) Shipyard (`'3'`), Guild (`'7'`), Pub (`'2'`), Harbor (`'4'`) | `goldAtLeast: 2000` per investor (`8,000` gold total) earned via market trading (`buyGood`/`sellGood`); `allAliInvestorsRepaid`. | `salim`, `ali`, 4 Istanbul benefactors (`msg#162..264`) | Repays `2,000` gold to each of the 4 Istanbul investors (`shipyard`, `guild`, `pub`, `harbor`) via `choice` (`'yes'` repay `-2,000g` / `'no'` defer) or building `'Repay Investor (2,000g)'` action (`repayAliInvestorInPlace`), clearing `investorDebts` to `0` and granting `+480` trade fame total. | `ali.original-core.istanbul-shipyard-repay`, `ali.original-core.istanbul-guild-repay`, `ali.original-core.istanbul-pub-repay`, `ali.original-core.istanbul-harbor-repay` |
| `A2` | Sec 2 (`0xf5a..0x1904`) | Istanbul (`'3'`) Palace (`'6'`), Venice (`'14'`) Bank (`'9'`), Alexandria (`'19'`) Pub (`'2'`), Lisbon (`'1'`) Pub (`'2'`), Massawa (`'75'`) Harbor (`'4'`) | `allAliInvestorsRepaid`. | `pietro` (`피에트로`), `lucia` (`루치아`), `joao` (`조안`), `katarina` (`카탈리나`), `salim`, `ali`, Sultan Suleiman (`msg#337..421`) | Optional Istanbul Palace (`'3'`, `'6'`) first Sultan audience (`+50,000` gold, `+150` trade fame); optional Venice Bank (`'14'`, `'9'`) Sherlock Howell conversation on Pietro's family debt (`choice`: `'yes'` / `'no'`, `+200` trade fame); Alexandria Pub (`'19'`, `'2'`) Pietro shares clue on Sasha; Lisbon Pub (`'1'`, `'2'`) Lucia & João point Ali toward Massawa & Basra; Massawa Harbor (`'75'`, `'4'`) defends merchant convoy against Catalina's ambush (`ali.catalina-ambush`, `+5,000` gold, `+250` trade fame). | `ali.original-core.istanbul-palace-first-audience`, `ali.original-core.venice-howell-pietro-debt`, `ali.original-core.alexandria-pietro-clue`, `ali.original-core.lisbon-joao-lucia-clue`, `ali.original-core.massawa-catalina-ambush`, `ali.original-core.massawa-catalina-ambush-retry` |
| `A3` | Sec 2–4 (`0x1904..0x250b`) | Basra (`'77'`) Pub (`'2'`), Istanbul (`'3'`) Fortune Teller (`'12'`) | After `A2` (`ali.catalina-ambush` victory). | `sasha` (`사샤`), `salim`, `ali` (`msg#481..515`) | Basra Pub (`'77'`, `'2'`) reunites with sister Sasha (`+6,000` gold, `+300` trade fame, `setHowellHousePrice: 50`); optional Istanbul Fortune Teller (`'3'`, `'12'`) oracle guidance. | `ali.original-core.basra-sasha-reunion`, `ali.original-core.istanbul-fortune-teller-oracle` |
| `A4` | Sec 5 (`0x250b..0x2d96`) | Istanbul (`'3'`) Palace (`'6'`) | After `A3`, `wealthIngotsAtLeast: 50`, `wealthMeetsHowellPrice`, `alliedPortsAtLeast: { countryIndex: 2, count: 30 }`, `fameAtLeast: { fame: 'trade', value: 800 }`. | `salim`, `sasha`, `ali`, Sultan Suleiman (`msg#729..913`) | Sultan Suleiman honors Ali as Grand Commercial Vizier (`grantHowellHouseFree`, `+25,000` gold, `+1,000` trade fame, `royalRankLevel: 5`, ending `f405`). | `ali.original-core.istanbul-sultan-coronation` |
