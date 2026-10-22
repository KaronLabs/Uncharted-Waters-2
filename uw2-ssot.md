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

## 5. 미션 계획 (Win11 재창조)

**목표:** 형님의 한글판 대항해시대 2를 Win11에서 재창조. 전략 = 0부터 재발명 금지, JohanLi 리서치·리메이크 기반 + 한글판 고유 데이터가 우리 기여.

**Phase 0 — 검증+자산 (진행중)**
- [x] uw-2 정찰·식별 (한글판/16bit DOS/유산 인벤토리)
- [x] G1: LS11 한글판 디코드 PASS
- [x] G2: 초상화 BMP 렌더 256장 PASS (팔레트 8색 [000000,00A060,D04000,F0A060,0040D0,00A0F0,D060A0,F0E0D0]; 64×80=1920B, 48×48=864B 자동 판별)
- [ ] 엔트리 수 차이(270 vs 256) 조사

**Phase 1 — 한글 데이터 추출 (다음)**
- [ ] SNR0~6.MES 한글 대사 → JSON (dialog-system 파서 한글판 적용; MES 헤더 = 오프셋 테이블 확인됨)
- [ ] KOUKAI2.DAT 세계DB 파싱 (HORIEDIT.H + research/ports 문서 교차)
- [ ] IAP1~6.LZW 주인공 초상 풀기

**Phase 2 — Win11 산출물 형태 결정**
- [ ] 후보 A: JohanLi TS 리메이크에 한글 데이터 탑재/기여, 후보 B: 자체 Win11 네이티브 뷰어부터 — Phase 1 결과 보고 후 형님 결정

**Phase 3 — 심화 (선택)**
- [ ] REA로 MAIN.EXE 16비트 분석 (Ghidra dos-mz), open-questions 미해결 공식 공격
- [ ] HORIEDIT 세이브 주소표 원본 대조 검증 (세이브 파일 확보 후)

## 6. 교훈/링크

- LS11 포맷 문서: https://sites.google.com/site/drrkdriller/uncharted-waters-2/lsw
- `KAO.LZW`는 마지막 엔트리 뒤에 미압축 파트 뱅크(0x49F01, 생성 초상용 — research/ls11/README)
- HORIEDIT.DOC는 완성형 아님(깨짐) — C/H 소스의 주석은 EUC-KR 정상
