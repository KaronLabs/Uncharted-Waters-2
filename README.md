# ⛵ 대항해시대 2 — QCaine 기반 한글 Windows 미리보기

> **조안편 개발 인계:** 이 브랜치의 작업을 이어가려면 [HANDOFF.md](HANDOFF.md)를 먼저 읽으십시오. 후보 EXE와 원본 실패·검증 증거까지 GitHub/Git LFS에 보존했습니다. 조안 실제 완주는 아직 미검증입니다.

> **"아버지의 뒤를 이어 바다로 나가거라… 근데 DOSBox 설정하다 지치진 말고."**
> 1994년 KOEI 한글 DOS판 원본 보존 + 바이너리 역공학 + Windows 11 네이티브 재창조 프로젝트

| 리스본 마을 화면 | 알리의 첫 출항 화면 |
| --- | --- |
| ![QCaine 기반 한글 미리보기의 실제 리스본 마을 화면](remake/docs/qcaine-town-preview.png) | ![QCaine 기반 한글 미리보기의 실제 해상 화면](remake/docs/qcaine-sea-preview.png) |

---

## 🚀 1. 일단 출항부터! (실행 방법)

현재 개발·기본 실행 대상은 **QCaine13 기반 한글 미리보기(`remake/`)**입니다. 위 이미지는 이 실행본의 실제 마을·해상 화면입니다. 이전 `app/`의 지도·메뉴 프로토타입과 1994년 DOS판은 별도로 보존합니다.

### ⚡ 방법 A: QCaine 기반 한글 미리보기 실행

**[📦 `UW2-QCaine-Preview.exe` 다운로드 — v0.3.0-qcaine-preview.1](https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/v0.3.0-qcaine-preview.1/UW2-QCaine-Preview.exe)**

Windows 11 x64에서 내려받은 EXE를 실행하세요. 설치나 Node.js는 필요하지 않습니다. 코드 서명이 없는 미리보기이므로 Windows에서 게시자 확인 경고가 나타날 수 있습니다.

저장소에서 실행하려면 루트의 `uw2-win11.bat`를 사용합니다. `remake/dist-desktop`에 포터블 EXE가 있으면 이를 우선 실행하고, 없으면 소스를 빌드합니다. 소스 변경을 기존 EXE에 반영하려면 [remake 실행·빌드 안내](remake/README.md#소스에서-빌드하기)에 따라 다시 빌드하세요.

```powershell
# 저장소 루트에서 실행하거나 탐색기에서 더블클릭
.\uw2-win11.bat
```

왼쪽 **시스템**에서 주인공을 고른 뒤 새 항해를 시작하세요. 처음 출항하려면 [알리의 배 수령·선원 모집·보급 절차](remake/README.md#알리의-첫-출항)를 참고하세요.

| 조작 | 동작 |
| --- | --- |
| 마을에서 `W` / `A` / `S` / `D` | 이동. 건물은 문까지 걸어가면 진입 |
| 해상에서 `W` / `A` / `S` / `D` | 침로 지정. 키를 놓아도 지정한 방향으로 계속 항해 |
| 항구 근처에서 `E` | 입항 |
| `W` / `S` 또는 `↑` / `↓` | 메뉴 항목 이동 |
| `E` / `Enter` / 마우스 왼쪽 클릭 | 메뉴·대화 선택·확인 |
| `Esc` / 마우스 오른쪽 클릭 | 취소·닫기 |
| **시스템 → 슬롯 저장 (Windows 파일)** | 화면에 표시되는 1~3번 파일 슬롯 저장·불러오기 |

한글 슬롯 이름을 적어 저장한 뒤 앱을 종료·재실행해 같은 화면에서 불러올 수 있습니다. 기본 저장 폴더는 `%APPDATA%\UW2-QCaine-Preview\slots`이며, 실제 경로는 슬롯 화면 하단에 표시됩니다. 기존 v0.2.0과는 별도 사용자 데이터 폴더입니다.

**현재 판정: 미리보기.** 한글 UI는 일부만 적용됐고, Windows 파일 저장·복원 경로가 구현돼 있습니다. 전체 용어·대사 번역, DOS 저장본의 완전한 게임 재개, 여섯 주인공의 정상 플레이 엔딩은 검증되지 않았습니다. 긴 조안 항해 테스트는 칼리컷 입항에서 실패했습니다. [실제 플레이 확인 기록](remake/docs/play-check-2026-10-23.md), [플레이·빌드 안내](remake/README.md), [현재 검증 현황](remake/docs/checkpoint-2026-10-23.md)을 함께 확인해 주세요.

---

### 💾 방법 B: 1994년 순정 DOS판으로 출항 (그 시절 감성 100%)

아무것도 설치할 필요 없습니다. 저장소 루트에서 배치 파일 하나만 치면 내장된 `DOSBox-0.74`가 `C HDD` 폴더를 `C:` 드라이브로 마운트하고 즉시 게임을 켭니다.

```powershell
# 반드시 저장소 루트 폴더에서 실행하세요!
.\run.bat
```

> [!TIP]
> **잠깐! 출항하려는데 갑자기 `금·목·수·화·토·일·월·천·지·인` 암호표를 물어본다면?**
> 당황해서 서랍 뒤지지 마세요. 30년 전 아래아한글 3.0 파일에서 완벽 복원해 둔 **[📜 대항해시대 2 암호 코드표](work/legacy-guides/대항해시대2-코드표.md)** 와 **[📖 고전 공략집](work/legacy-guides/대항해시대2-공략.md)** 이 준비되어 있습니다.

### 🗃️ 보관용: 이전 지도·메뉴 프로토타입 (`app/`, v0.2.0)

`app/`과 **[이전 `UW2-Korean-Portable.exe`](https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/v0.2.0/UW2-Korean-Portable.exe)**는 지도·메뉴 중심의 초기 프로토타입입니다. QCaine 마을 화면을 사용하는 현재 개발판과는 별개이며, 과거 구현·검증 기록을 위해 보존합니다. 이전 프로토타입을 명시적으로 실행하려면 `app\uw2-launch.bat`를 사용하세요.

---

## 🧐 2. 대체 여기서 무슨 짓을 한 건가요? (배경 지식)

세상에는 훌륭한 영문판 리버스 엔지니어링 연구([JohanLi/uncharted-waters-2-research](https://github.com/JohanLi/uncharted-waters-2-research))가 있습니다. 그래서 처음엔 *"영문판 추출기에 한글판 파일만 넣으면 3분 만에 끝나겠지?"* 라고 생각했습니다.

**어림도 없었습니다.**

1. **한글 이름 확장 나비효과**: 영문판 항해사 이름은 9바이트인데, 한글판은 완성형(EUC-KR) 이름을 쓰려고 **13바이트×2**로 늘려 놓았습니다. 덕분에 레코드 크기가 `42B → 50B`로 불어났고, 뒤쪽 테이블 오프셋이 도미노처럼 밀렸습니다(`DATA1.015`는 무려 `+1,396B` 차이).
2. **바이트 덤프 방지용 제작자의 외침**: `ITEM.MES`를 124바이트 단위로 뜯어보니, 99번 더미 슬롯에 1994년 개발자가 숨겨 둔 완성형 한글 이스터에그가 튀어나왔습니다:
   > *"당신, 이제 데이터는 dump 하지 말아 줘요！"* (죄송합니다… 32년 뒤에 다 덤프했습니다.)
3. **타임캡슐 속 유물 총동원**:
   - **1995년 한국산 C 세이브 에디터(`C HDD/HORIEDIT.C`, `HORIEDIT.H`)**: 90년대 선배 해커가 Borland C++로 짜 둔 구조체 덕분에 한글판 함대 테이블(`0x2219`)과 세이브 슬롯 스트라이드(`0x823C = 33,340B`)를 1:1 교차검증할 수 있었습니다.
   - **2007년 Win32 VB6 에디터(`C HDD/edit/DH2-Editor.exe` & `dh2_Image_Data.ocx`)**: P-Code 바이너리와 ActiveX 컨트롤까지 해부하여 24비트 고화질 BMP 에셋 256장(초상화 120·아이템 111·함선 25)과 한글 코드표를 통째로 적출했습니다([해부 보고서](work/dh2-editor-dissection/dissection-report.md) · **[🖼️ 256 BMP & 코드표 브라우저 도감(`gallery.html`)](work/dh2-editor-dissection/gallery.html)**).

모르는 바이트는 소설로 때우지 않고, **원본 근거 보존 → 작은 재현 → 검증 게이트 → 기록([uw2-ssot.md](uw2-ssot.md))** 원칙으로 전수 검산했습니다.

---

## 📊 3. 이전 데이터 추출·`app/` 프로토타입 검증 기록

아래 G1~G6은 **QCaine 도입 전 데이터 추출과 구형 `app/` 프로토타입의 검증 기록**입니다. 특히 G4~G6의 화면·조작·패키징은 `app/`에 해당하며, 현재 `remake/`의 전체 플레이 완료나 한글 완성도를 증명하지 않습니다. 현재 미리보기의 통과·실패 범위는 [별도 검증 현황](remake/docs/checkpoint-2026-10-23.md)을 확인하세요.

| 구분 | 당시 상태 | 당시 검증 내역 |
| --- | :---: | --- |
| **G1 · LS11 압축 해독** | ✅ **PASS** | `.LZW`라는 확장자에 속지 마세요(실제론 KOEI 독자 `LS11` + LZSS 감마 코딩). 14개 아카이브 전량 해제 완료 |
| **G2 · 초상화 & 에디터 자산** | ✅ **PASS** | DOS `KAO.LZW` 8색 초상화 256장 BMP 렌더 + 2007년 `dh2_Image_Data.ocx` 24비트 컬러 BMP 256장 추출 |
| **G3 · 한글 데이터 15도메인** | ✅ **PASS** | 항구 130 · 교역품 46 · 시장 100 · 항해사 120 · 함선 25 · 아이템 94 · 여급 30 · 시나리오 6종 JSON 추출 (`mojibake` 0건, 한글판 전용 오프셋 20건 역산) |
| **G4 · Win11 4씬 렌더** | ✅ **PASS** | 타이틀 → 주인공 6인 선택 → 세계지도 항해 → 항구 진입 화면 렌더링 |
| **G5 · 교역 루프 & 세이브** | ✅ **PASS** | 100개 항구 483개 매입 품목 가격 계산(`NaN` 0건), 매수(`B`)·매도(`S`), `F5`/`F9` 세이브·로드, 원본 `KOUKAI2.DAT` 드래그&드롭 판독 |
| **G6 · Electron 패키징** | ✅ **PASS** | `app/uw2-launch.bat` 더블클릭으로 독립 데스크톱 창 실행 |

---

## 🗺️ 4. 창고 지도 (폴더 구조)

| 경로 | 안에 든 보물 |
| --- | --- |
| [`remake/`](remake/) | **현재 기본 실행 대상: QCaine13 기반 한글 미리보기** (React + TypeScript + Electron, 마을·항해 화면, Windows 파일 슬롯) |
| [`app/`](app/) | **보관용 이전 지도·메뉴 프로토타입** (Vite + TS + Canvas, v0.2.0, 별도 `uw2-launch.bat`) |
| [`C HDD/`](C%20HDD/) | 1994년 한글 DOS판 원본 게임 파일 + 1995년 `HORIEDIT` C 소스 + 2007년 `DH2-Editor` + 한글 3.0 공략/코드표 원본 |
| [`DOSBox-0.74/`](DOSBox-0.74/) | 루트 [`run.bat`](run.bat)이 호출하는 포터블 DOSBox 0.74 실행 환경 |
| [`work/`](work/) | 한글판 추출 데이터([`db-korean/`](work/db-korean/)), 초상화 BMP 256장([`portraits-korean/`](work/portraits-korean/)), 복원된 [고전 공략·암호표](work/legacy-guides/), [VB6 에디터 해부 결과](work/dh2-editor-dissection/), 게이트 증거 스크린샷(`g4~g6`) |
| [`research/`](research/) | [Johan Li의 선행 연구](https://github.com/JohanLi/uncharted-waters-2-research) 기반 한글판 오프셋·EUC-KR 패치 스크립트 |
| [`uw2-ssot.md`](uw2-ssot.md) | **단일 진실 공급원(SSOT)** — 한글판 대 영문판 바이트 오프셋 비교표(§4b)와 G1~G6 전체 검증 로그 |
| [`archives/`](archives/) | `research/.git` 및 `research/node_modules` 보존용 압축 아카이브([`MANIFEST.json`](archives/MANIFEST.json)) |

---

## 🛠️ 5. 원격 저장소(`KaronLabs/Uncharted-Waters-2`) 반영 명령어

로컬에서 `README.md`나 코드를 수정한 뒤 원격 저장소에 올리는 표준 절차입니다(현재 로컬 `uw-2` 저장소에 원격 `origin` 및 Git 프로필 `pplar39 <pplar9577@gmail.com>` 설정 완료):

```powershell
cd E:\03_AllWork\04_REA\uw-2
git status -s
git add README.md
git commit -m "docs: rewrite README with quick-start on top and witty archaeological notes"
git push origin main
```

---

## ⚖️ 출처와 저작물 고지

- **대항해시대 2 (Uncharted Waters: New Horizons)** 원작과 게임 데이터의 저작권은 **KOEI TECMO GAMES** 및 해당 권리자에게 있습니다.
- [`research/`](research/)의 분석 프레임워크와 LS11 코덱은 [Johan Li의 프로젝트](https://github.com/JohanLi/uncharted-waters-2-research)([`research/LICENSE`](research/LICENSE), MIT)에서 출발하여 한글판 전용 오프셋과 EUC-KR 디코더를 패치했습니다.
- [`remake/`](remake/)는 [QCaine13/uncharted-waters-2](https://github.com/QCaine13/uncharted-waters-2)의 `04951e9`를 기반으로 하며 [원본 MIT 라이선스](remake/LICENSE)를 함께 보존합니다.
- [`DOSBox-0.74/`](DOSBox-0.74/)는 원본 DOS 실행을 위해 동봉된 오픈소스 에뮬레이터입니다.
