# UW2 (대항해시대 2 한글판) — Win11 재창조 미션 SSOT

> 이 문서가 단일 진실 공급원(SSOT)이다. 새 세션/다른 AI가 이 미션을 이어갈 때
> **이 문서만 읽으면 재조사 없이 작업 가능해야 한다.** 근거 없는 추가는 금지;
> 아래 사실들은 전부 디스크/실행으로 확인됐다. (작성: 삐빅스/ZCode, 2026-10-22)

## 1. 정체와 환경

| 항목 | 값 |
|---|---|
| 게임 | 대항해시대 2 (KOEI 1994) — **한글판 확정** (SNR0.MES가 EUC-KR 완성형: "…매입하는 일이 있는데." / ITEM.MES "칼날이 ₂₀세…") |
| 위치 | 이 저장소의 루트 (독립 Git `main`; 공개 스냅샷에는 게임 자료 포함) |
| 게임 본체 | `C HDD\MAIN.EXE` 288,823B = 순수 16비트 DOS EXE (MZ, e_cblp=0x37·e_cp=0x235 계산 일치; NE/PE 아님) |
| 실행 | `run.bat` → DOSBox-0.74 (폴더 내장). 형님이 직접 실행 |
| 보안 | 형님 완료: Codex security scan (daybreak) 통과 언급됨 |

## 2. 디렉토리 지도

| 경로 | 내용 |
|---|---|
| `C HDD/` | 게임 본체+데이터. MAIN/OPEN/END.EXE, `KOUKAI2.DAT`(세계DB 333KB, 헤더에 "28/May/1522" 등 날짜), `SNR0~6.DAT/MES`(주인공별 시나리오+한글 대사), `EVENT0~6.DAT`, `KAO.LZW`(얼굴 466KB), `IAP1~6.LZW`(주인공 초상), `WORLDMAP/PORTMAP/OPGRAPH.LZW`, `GRAPH.DAT` |
| `C HDD/` 리버스 유산 | **HORIEDIT.C/H/DOC/EXE** — 90년대 한국산 세이브 에디터 완전 소스 (Borland C++ + hanlib). HORIEDIT.H에 구조체(Person/Port/Ship1~5/Abil/Init)와 세이브 주소(abil_addr[6]={0x64D,…}, ship1_addr[6]={0x2244,…}, c_addr=0x6A8), 함선 25종·대포 7종 코드표. **edit/DH2-Editor.exe** = PE(2007-06-12, Win32 에디터)+OCX. **코드표/공략.hwp** = 한글 3.0 (HWP V3.00 헤더 확인). `unKOEI.exe/rmKOEI.bin` = KOEI 해제 도구 |
| `research/` | **클론: github.com/JohanLi/uncharted-waters-2-research** (depth 1). 작업 컴퓨터의 `research/raw/`는 `work/raw-korean/` 접합점; 공개본에는 한글판 원시 파일로 복사. 영문판 원시 파일은 `work/raw-english/`. LS11 디코더(`scripts/ls11/index.ts`, 의존성 0, 포맷: LS10/LS11 매직 + 0x110부터 12B 엔트리 테이블 + LZSS gamma 코드 — `.LZW`는 LZW가 아님) |
| `work/` | 우리 산출물. `decode-ls11.mjs`(아카이브→entry bin), `kao-korean/`(256 bin), `kao-english/`(270 bin), `portraits-korean/`(BMP) |
| 원칙 | 형님 결정(2026-10-22)에 따라 전체 자료 공개. 내부 `research/.git`과 `research/node_modules`는 ZIP으로 보존하고 로컬 폴더는 그대로 유지 |

## 3. 외부 선행 연구 (ARCHON 2026-10-22 정찰 + 클론 확인)

- **JohanLi/uncharted-waters-2-research** — MAIN.EXE RE 문서, LS11 코덱(인코더까지), 시나리오 바이트코드 파서(dialog-system/snr.ts), 게임 공식 문서(game-details/: 해전·일기토·교역·NPC 항해 AI), open-questions에 미해결 공식 존재
- **JohanLi/uncharted-waters-2** — TS+Canvas 웹 리메이크 진행중(★138) — **영문판 기준**
- **wan2land/unchartedcustomers2** — 한국인 js-dos 웹 래핑(★417) — 에뮬레이터지 재구현 아님 (정정: wan2land/unchartedwaters2)
- Gilmok/UWNHRando(SNES 랜덤마이저), BB9z/Uncharted-Waters(자료집)
- **우리 초점 = 한글판 데이터 + REA 직접 분석. 다른 프로젝트의 전체 범위를 단정하지 않음**

## 4. 검증 게이트 로그 (append-only)

| # | 게이트 | 결과 | 근거 |
|---|---|---|---|
| G1 | JohanLi LS11 디코더가 한글판 KAO.LZW를 푸는가 | **PASS 2026-10-22** | magic=LS11, 256/256 엔트리 디코드 성공. 영문판(270엔트리)과 공통 엔트리[0..9] 압축크기 전부 동일(1709/1611/1811/…) → 같은 포맷·같은 이미지, 엔트리 수만 상이(270 vs 256, 차이 14개 = 추후 조사) |
| G2 | 한글판 KAO 초상화 렌더 (BMP 산출+형체 검증) | **PASS 2026-10-22** | `work/portraits-korean/` BMP 256장. 구조: entry 0~127 = 1920B(64×80 초상), 128~255 = 864B(48×48 파트, 2개 빈 엔트리 포함). ASCII 렌더+색 히스토그램으로 entry-000/001 사람 얼굴 형체·피부/음색 분포 확인. 드라이버 `work/render-kao-bmp.mjs` (sharp 무의존, BMP 직접 인코딩). |
| G2 | DH2-Editor.exe & dh2_Image_Data.ocx 완전 분해 (256 BMP 자산, 9 모듈/108 프로시저, 한국어 코드표, 세이브 오프셋 복원) | **PASS 2026-10-22** | REA 증거 ID `ev_a9bc7f3c79750866a6fd8683924c0a43b46144c5a3ff29506469cff06bd2f26a`(EXE) 및 `ev_5426a0435c8ca3fe2074f7037895bd02e346631be4d672e2e861a19cc1122f42`(OCX). 256개 24-bpp BMP 자산 100% 추출(아이템 111, 초상화 120, 함선 25), VB6 ObjectTable 9개 모듈/108개 프로시저 완전 추출, 한글 코드표 6종(아이템 100, 대포 8, 선수상 11, 작위 10, 국가 7, 교역품 46), 1995년 HORIEDIT.H C 구조체 대조 48개 세이브 오프셋(슬롯 스트라이드 33340=0x823C) 100% 일치 판정. 26개 E2E 테스트 전체 통과. |
| G3 | 한글판 전체 데이터 추출 (extract-all 왈주) | **PASS 2026-10-22** | 21개 JSON 중 FFFD 1파일(messages.json[0]=오프셋테이블 덩어리 — eng도 동일 구조, 실소비 무해). ports 130·goods 46·시장 100·항해사 120·함선 25·아이템 94·이름붙은인물 21·여급 30·스토리 6 전부 한글 정상. 산출물 `work/db-korean/`(51MB) |
| G4 | 웹 실행기 4씬 렌더 (타이틀/선택/월드맵/항구) | **1심 GUILTY 지적 → 재심 PASS 2026-10-22** | 1심 결함: g4-select와 g4-map SHA 동일(B9CD29AB…), g4-port는 월드맵(항구 씬 미렌더 — Enter 횟수 부족). 수정: map 2회·port 3+1회 Enter, 시작 카메라 +40 제거. 재심 해시 3종 분리: select B9CD29ABEC973AC9 / map 7A65DB5901E397EC / port D1CA9E42804466B6, g4-port 배경 #202838 확인 |
| G5 | 교역 1루프 스모크 + 세이브/로드 + 원본 세이브 판독 | **1심 GUILTY 지적 → 재심 PASS 2026-10-22** | 1심 결함: buy 계약 불일치(base↔basePrice)로 100/100 시장 NaN, 스모크가 항구 미진입 delta+0 PASS 오emark. 수정: buy 계약 수정·스모크가 씬 진입+유한 가격+정확 감소액+복원 순서 검증(PASS 녹색 2,075px), save.ts 슬롯 베이스 0x97+slot×0x823C 복원(0x97+10×0x823C=333,551=파일 크기 — **KOUKAI2.DAT가 곧 실세이브 컨테이너**), 셀프테스트가 실앱 함수 import로 교체 6/6. NaN 전수 0/483 |
| G6 | Electron 포장 실행 | **PASS 2026-10-22** | `app/electron-main.cjs` + `app/uw2-launch.bat`. 실창 캡처 `work/g6-electron.png`: 타이틀 골드 픽셀 4,351 확인 |

## 4b. 한글판 역산 확정 오프셋 (구현 근거 — 영문판 값과 병기, 2026-10-22 확정)

| 대상 | 한글판 | 영문판 | 검증 방법 |
|---|---|---|---|
| goods DS_BASE (MAIN.EXE) | 0x3A7EA | 0x3BB70 | 카테고리 limit 시퀀스 [6,10,17,21,26,31,33,36,40,46] @0x3B170 |
| goods 이름 46종 | DS+0x208 (0x3A9F2) | DS+0x42 | "정향" 실측, 영문 순서 1:1 |
| goods MARKET_TABLE (DATA1.015) | 0x6BC0 | 0x67DC | 13 시장 상품·가격 행 13/13 영문 동일 |
| goods PORT_TABLE (DATA1.015) | 0x5D4A | 22886 | 유일 시그니처 후보, 경제치 100/100 동일 |
| ports 이름/좌표 | 0x5322 | 20286 | 12항구 이름+좌표 12/12 |
| ships 카탈로그 25종 | 0x4F86, stride 25 (이름 18B) | 19388, stride 24 (16B) | rec0 꼬리 52050f001e00 영문 동일 |
| ships 스탯 | 0x51F8 | 19988 | rec0~2 영문 바이트 동일 |
| ships 설명 (MESSAGE.DAT) | 0x206F | 9683 | 5개 연속 1:1 |
| ITEM.MES 설명 슬롯 | 124B, 유효 0~98 (99=제작자 메시지 "당신, 이제 데이터는 dump 하지 말아 줘요！") | 172B | desc0~3 연속 1:1 |
| 아이템 64종 (MAIN.EXE) | 0x42AF4, stride 26 (이름 21B) | 277192, stride 22 (17B) | 단도→비취 보석상자 64개 1:1 |
| 아이템 카테고리 14종 | 0x3AAEE | 245902 | 무기·목재… 실측 |
| sailors 레코드 | stride 0x32 (이름 13B×2), 후미 +4 shift | stride 0x2A (9B) | rec0 상태 24B 영문 동일, 주인공 6/6 |
| FLEET_TABLE | 0x2219 | 0x1E77 | HORIEDIT ship1_addr[0]=0x2244=0x2219+0x2B ✓, 함대별 배수 11/70 일치 |
| SHIP_INSTANCE_TABLE | 0x4D2F, stride 0x19, id@+0x12 | 0x4893, 0x18, +0x11 | '플랜더스 갤리' 실측 |
| NAMED_TABLE (21) | slot-rel 0x1D82, stride 21, kao@17 flags@19 port@20 | 0x19C2, stride 24 | 21/21 |
| WAITRESS_TABLE (30) | slot-rel 0x1F26, stride 17, port@12 flags@15 | 0x1BA2, stride 16 | 30/30, port@12=0(리스본) ✓ |
| NAME.TBL | 13+13=26B | 9+9=18B | 2496=96×26 |
| KAO.LZW partsStart | 0x476A2 | 0x49F01 | 트레일 7뱅크 동일 |
| dialogs VM (main-exe-vm.json) | **미구현** — 영문 오프셋 다수, 별도 RE 필요 | — | 스킵; scenarios.json은 정상 |

기타 판본 차이: MESSAGE2.DAT 없음, fleet10에 배 1척(한글판), discoveries 추출기 스킵(DATA1.015 오프셋 미역산).

**1심 판결 기록 (2026-UW2-KR-001)**: GUILTY/REVISE 🍕60 — 공소 ①교역 가격 NaN(buy 계약 불일치) ②G4 증거 결함(select=map 동일 SHA, 항구 씬 누락) ③세이브 판독기 슬롯 베이스 누락. **중요 정정: KOUKAI2.DAT가 곧 실세이브 컨테이너**(0x97 헤더+10슬롯×0x823C=파일 크기 정확 일치, HORIEDIT.C가 이 파일을 save로 개봉) — "별도 실세이브"라는 1차 보고는 오류. 갱생 명령 1~4 이행 완료, 재심 spec: `review/spec_20261022_uw2_korean_revival_retrial.md`

**재심 최종 판결 (2026-UW2-KR-001-R1)**: **NOT GUILTY / APPROVE 🍕0 👍89/100** — 독립 검증자가 dist 번호 번들+KOUKAI2.DAT 실물로 1심 재검증 지침 4종 직접 집행(tsc 0오류·NaN 0/483·실앱 세이브 판독 6/6·독립 Electron E2E 산타크루즈 입항 매수 240G→매도 복원) 전부 통과. 비차단 권고 3건(follow_up): ①mapScene 최근접 항구를 유클리드 거리로(현: 배열 순회 마지막 덮어쓰기라 시작 시 산타크루즈 선택) ②portScene 하단 도움말(y=388)·메시지(y=380) 8px 겹침 → 356 분리 ③save.ts 상단 주석 잔여 "3 save slots/SANGOKU2" 문구


## 5. 미션 계획 (Win11 재창조)

**목표:** 형님의 한글판 대항해시대 2를 Win11에서 재창조. 전략 = 0부터 재발명 금지, JohanLi 리서치·리메이크 기반 + 한글판 고유 데이터가 우리 기여.

**Phase 0 — 검증+자산 (완료)**
- [x] uw-2 정찰·식별 (한글판/16bit DOS/유산 인벤토리)
- [x] G1~G3 PASS (위 표)
- [x] 엔트리 수 차이 해명: KAO -14 아이템 그림, OPGRAPH = 한글 오프닝, 나머지 동일

**Phase 1 — 한글 데이터 추출 (완료 2026-10-22)**
- [x] extract-all 한글판 왈주 → `work/db-korean/` (ports/ships/sailors/goods/characters/stories/dialog/art…)
- [x] IAP1~6.LZW 주인공 초상 — research/raw 방식으로 해제·추출 완료
- [x] SNR0~6 시나리오 디스어셈블리(dialog) — VM 오프셋 분석(main-exe-vm)만 제외

**Phase 2 — Win11 실행기 (완료 2026-10-22, 형님 결정: 자체 웹엔진+Electron / 감상형+플레이 1루프 / 원본 세이브 읽기)**
- [x] M2: 웹 실행기 코어 — `app/` (Vite+TS+Canvas 640×400). 타이틀→주인공 선택(6인 한글+초상)→월드맵(720×1080, 항구 라벨, 이동)→항구(교역소 매입목록) 4씬. **G4 PASS**: `work/g4-{title,select,map,port}.png` + `g4-montage.png`
- [x] M3: 교역 1루프 — 매수(B)/매도(S)/출항(Esc), 원가·수익 계산, research 가격 공식 `((rate+50)*base)/100`. **G5 PASS**: `?scene=port&smoke=1` 자동 매수→매도 스모크, 상태 변화 111,510바이트 diff + 화면 녹색 증거 텍스트 1,459px. 세이브 F5/로드 F9(localStorage JSON). **원본 세이브 리더**: 드래그&드롭 → EUC-KR 주인공명 판독(셀프테스트 PASS — KOUKAI2.DAT에서 조안~알 6/6)
- [x] M4: Electron 포장 — `app/electron-main.cjs`(CommonJS 필수, ESM은 로더 크래시), `app/uw2-launch.bat` 더블클릭 실행. **G6 PASS**: 실창 캡처 `work/g6-electron.png` (타이틀 골드 픽셀 4,351 확인)

**실행법**: `uw-2\app\uw2-launch.bat` 더블클릭 (또는 `cd app && npx vite` 개발모드 http://localhost:5180)

**잔여 (별도 세션 권장 — 검증/확장)**
- [ ] 원본 세이브 실물(게임 내 저장 파일) 대조 판독 — KOUKAI2.DAT 컨테이너 셀프테스트는 통과, 실세이브는 미검증
- [ ] dialogs VM(main-exe-vm.json) 한글판 MAIN.EXE 역산
- [ ] discoveries 추출기 한글판 오프셋
- [ ] 이벤트/해전/일기토 플레이 확장, 사운드(D2.MML), ALL_FONT.16P 비트맵 폰트

**Phase 3 — 심화 (선택)**
- [ ] REA로 MAIN.EXE 16비트 분석 (Ghidra dos-mz), dialogs VM 오프셋 한글판 역산
- [ ] discoveries 추출기 한글판 오프셋 역산
- [ ] HORIEDIT 세이브 주소표 원본 세이브 대조 (별도 검증 세션 권장)

## 6. 교훈/링크

- LS11 포맷 문서: https://sites.google.com/site/drrkdriller/uncharted-waters-2/lsw
- `KAO.LZW`는 마지막 엔트리 뒤에 미압축 파트 뱅크(0x49F01, 생성 초상용 — research/ls11/README)
- HORIEDIT.DOC는 완성형 아님(깨짐) — C/H 소스의 주석은 EUC-KR 정상
