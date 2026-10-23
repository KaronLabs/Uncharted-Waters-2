# ⛵ 대항해시대 2 — 조안편

그때는 엄마가 “밥 먹어!”라고 부르셨고,<br>
이제는 허리가 “좀 일어나!”라고 부릅니다.<br>
그래도 출항은 해야지요.

**“한 항구만 더 보고 끈다.”**

이 주막은 그 말을 믿지 않습니다. 선장님 본인도 믿지 마세요.

**v0.3.0 · 조안편 사용자 인수 완료**

### [배 타러 가기 — Windows 실행 파일 다운로드](https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/v0.3.0/UW2-Joao-Korean.exe)

내려받고 실행한 뒤 **조안·한국어 새 게임**을 고르세요. 설치는 필요 없습니다.<br>
**나머지 다섯 주인공은 미완료**입니다. 오늘은 조안 선장부터 모십니다. 여섯 명을 한꺼번에 모셨다가 주막 기둥 뽑히면 곤란합니다.

[실행·조작 안내](remake/README.md) · [인수·배포 기록](remake/docs/joao-release-2026-10-23.md) · [소스 인계](HANDOFF.md)

1994년 KOEI 한글 DOS판을 보존하고, 바이너리를 발굴하며, Windows 11에서 다시 항해할 수 있게 만드는 프로젝트입니다. “옛날 게임 한 판 해야지”로 시작했는데, 어쩌다 보니 ActiveX의 묘까지 파고 있었습니다. 자세한 삽질기는 아래에 있습니다. 일단 선장님 배부터 띄워 드리겠습니다.

## 일단 배부터 띄웁시다

1. [v0.3.0의 `UW2-Joao-Korean.exe`](https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/v0.3.0/UW2-Joao-Korean.exe)를 내려받아 **Windows 11 x64**에서 실행하세요. 설치나 Node.js는 필요 없습니다. 오늘 출항하는 데 개발자 자격증까지 요구하진 않습니다.
2. 왼쪽 **시스템** 메뉴에서 **조안·한국어 새 게임**을 시작하세요.
3. **항해일지**에서 현재 사건과 목적지를 확인하고 리스본의 건물들을 방문해 보세요. 조안이 뭘 하던 중이었는지 기억이 안 나면 일지를 보시면 됩니다. 방금 안경을 어디 뒀는지는 지원하지 않습니다.

길이 가물가물하면 [고전 공략집](work/legacy-guides/대항해시대2-공략.md)을 펼치세요. 옛날에는 공략집을 친구에게 빌렸고, 이제는 친구도 “그 항구가 어디였더라” 합니다. 둘이 기억을 합쳐도 항로가 안 나오니 활자를 믿읍시다. 원작의 사건·항로를 참고하는 자료이며, 재구현판의 구현·검증 범위는 아래 안내를 함께 확인해 주세요.

코드 서명이 없어 Windows에서 **게시자 확인 경고**가 나타날 수 있습니다. 내려받는 곳과 파일 정보는 아래 ‘기관실’에 적었습니다.

### 항구 풍경 먼저 보고 가실 분

아래는 **이전 QCaine 미리보기에서 촬영한 화면**입니다. 현재 조안편 정식 배포본을 새로 촬영한 이미지는 아닙니다. 졸업사진 꺼내 놓고 “저 요즘 이렇습니다” 하면 안 되니까요.

| 이전 미리보기: 리스본 마을 | 이전 미리보기: 알리의 첫 출항 |
| --- | --- |
| ![QCaine 기반 한글 미리보기의 실제 리스본 마을 화면](remake/docs/qcaine-town-preview.png) | ![QCaine 기반 한글 미리보기의 실제 해상 화면](remake/docs/qcaine-sea-preview.png) |

## 선장님, 키보드는 이렇게 잡으시면 됩니다

| 조작 | 동작 |
| --- | --- |
| 마을에서 `W` / `A` / `S` / `D` | 이동. 건물은 문까지 걸어가면 진입 |
| 해상에서 `W` / `A` / `S` / `D` | 침로 지정. 키를 놓아도 지정한 방향으로 계속 항해 |
| 항구 근처에서 `E` | 입항 |
| `W` / `S` 또는 `↑` / `↓` | 메뉴 항목 이동 |
| `E` / `Enter` / 마우스 왼쪽 클릭 | 메뉴·대화 선택·확인 |
| `Esc` / 마우스 오른쪽 클릭 | 취소·닫기 |
| **시스템 → 슬롯 저장 (Windows 파일)** | 화면에 표시되는 1~3번 파일 슬롯 저장·불러오기 |

해상에서는 키를 놓아도 배가 계속 갑니다. 선장님 손가락이 퇴근했다고 선원들까지 퇴근한 건 아닙니다. 항구 가까이에서 `E`로 입항하세요. 지나친 항구를 보며 “분명 여기였는데” 하시는 건 현실의 고속도로만으로 충분합니다.

[알리의 첫 출항 기록](remake/README.md#알리의-첫-출항)도 짧은 조작 참고로 남겨 두었습니다. 이전 미리보기의 기록이며, 지금 시작하실 주인공은 조안입니다.

## 저장은 자주. 우리에게는 재도전할 시간이 부족합니다

옛날엔 세 시간을 날려도 “다시 하면 되지” 했습니다. 지금 세 시간을 날리면 먼저 시계를 보고, 내일 일정을 보고, 조용히 천장을 봅니다.

**자기 전 저장하십시오. 조안은 내일도 거기 있지만, 선장님은 내일 출근하실 수 있습니다.**

**시스템 → 슬롯 저장 (Windows 파일)**에서 화면에 표시되는 **1~3번** 중 하나를 골라 한글 슬롯 이름을 적고 저장하세요. 앱을 완전히 종료한 뒤 다시 실행해 같은 화면의 **불러오기**로 이어갈 수 있습니다.

- 기본 저장 폴더: `%APPDATA%\UW2-QCaine-Preview\slots`
- 실제 경로: 슬롯 화면 맨 아래에도 표시됩니다.
- 백업: **게임을 종료한 뒤 `slots` 폴더 전체를 다른 곳에 복사**하세요. 기존 슬롯은 남겨 두세요.

폴더 이름에 `Preview`가 남아 있는 건 내부 앱 이름을 유지했기 때문입니다. 간판을 새로 달아도 창고 주소는 함부로 바꾸지 않습니다. 이전 `UW2-QCaine-Preview.exe`와 같은 저장 경로를 쓰며, v0.2.0의 사용자 데이터 폴더와는 별개입니다. EXE만 다른 폴더로 옮겨도 저장 파일은 원래 사용자 데이터 폴더에 남습니다.

## 다른 다섯 선장님은요?

주막에 자리 다섯 개는 더 있습니다. 그런데 메뉴판에 이름이 있다고 요리까지 다 나온 건 아닙니다. 조안 정식 한 상 먼저 내드립니다. 나머지 다섯 상은 아직 주방에 있습니다.

**현재 완료 범위는 조안편 사용자 인수 완료입니다.** 사용자의 플레이 확인과 정식 배포 승인에 따라 조안편만 완료로 표시합니다. 다른 다섯 주인공의 한글화·완주는 미완료입니다. 원본 DOS 저장을 그대로 이어서 플레이하는 기능도 아직 제공하지 않습니다.

완료 근거와 별도 측정 범위는 [인수·배포 기록](remake/docs/joao-release-2026-10-23.md)에 적었습니다. [이전 인수 후보 보고서](remake/docs/joao-candidate-handoff-2026-10-23.md)와 실패·진단 로그도 당시 결과로 보존합니다. 과거 로그의 숫자를 현재 완주 증거로 더하지 않습니다.

## 이걸 살리겠다고 바이트 무덤을 팠습니다

세상에는 훌륭한 영문판 리버스 엔지니어링 연구([JohanLi/uncharted-waters-2-research](https://github.com/JohanLi/uncharted-waters-2-research))가 있습니다. 그것을 보고 개발자는 아주 위험한 생각을 합니다.

> “영문판 추출기에 한글판 파일만 넣으면 3분 만에 끝나겠지?”

**어림도 없었습니다.**

### 이름 몇 글자 늘었을 뿐인데 테이블이 이사를 갔습니다

영문판 항해사 이름은 9바이트인데, 한글판은 완성형(EUC-KR) 이름을 담으려고 **13바이트×2**로 늘려 놓았습니다. 레코드 크기는 `42B → 50B`가 됐고, 뒤쪽 테이블 오프셋도 줄줄이 밀렸습니다. `DATA1.015`는 `+1,396B` 차이입니다.

이름 몇 글자 더 적었을 뿐인데 주소록 전체가 이사를 갔습니다. 새 주소는 아무도 안 알려 줍니다. 집집마다 문을 두드려야 합니다. 바이트 세계의 전입신고는 원래 이렇게 불친절합니다.

### 1994년 개발자님께서 남기신 부탁

`ITEM.MES`를 124바이트 단위로 뜯다가 99번 더미 슬롯에서 완성형 한글 이스터에그를 발견했습니다.

> “당신, 이제 데이터는 dump 하지 말아 줘요！”

죄송합니다… 32년 뒤에 다 덤프했습니다.

부탁은 잘 읽었습니다. 손이 이미 움직이고 있었습니다.

### 선배님이 남긴 C 코드가 후배를 구합니다

1995년 한국산 C 세이브 에디터(`C HDD/HORIEDIT.C`, `HORIEDIT.H`)에는 Borland C++ 구조체가 남아 있었습니다. 이 덕분에 한글판 함대 테이블(`0x2219`)과 세이브 슬롯 스트라이드(`0x823C = 33,340B`)를 1:1 교차검증할 수 있었습니다.

선배님은 세이브 에디터를 만드셨는데, 30년 뒤 후배는 그 구조체를 붙잡고 구명조끼처럼 떠 있었습니다. 주석을 잘 달아 두시면 먼 훗날 모르는 사람이 살 수도 있습니다.

2007년 Win32 VB6 에디터(`C HDD/edit/DH2-Editor.exe` & `dh2_Image_Data.ocx`)에서는 P-Code 바이너리와 ActiveX 컨트롤을 분석해 **24비트 BMP 256장(초상화 120·아이템 111·함선 25)**과 한글 코드표를 추출했습니다.

옛날 게임을 하러 왔다가 ActiveX와 재회했습니다. 반가운 동창만 있는 동창회는 세상에 없습니다.

발굴품은 [해부 보고서](work/dh2-editor-dissection/dissection-report.md)와 [256 BMP & 코드표 브라우저 도감(`gallery.html`)](work/dh2-editor-dissection/gallery.html)에 모았습니다. 원본 근거를 보존하고 작은 재현으로 확인한 바이트·검증 기록은 [uw2-ssot.md](uw2-ssot.md)에 남겼습니다.

## 기관실 구경: 개발자와 고고학자만 내려오세요

숫자와 해시는 아래에 모았습니다. “그래서 이 배 용접은 누가 했는데?”가 궁금하신 분만 펼쳐 보세요. 여기부터는 술안주에 16진수가 섞여 나옵니다.

<details>
<summary><strong>배포본 신분증: 버전·크기·해시·소스</strong></summary>

현재 배포본은 **QCaine13 기반 조안편 한국어 Windows 정식 배포본(`remake/`)**입니다. v0.3.0 EXE는 사용자 인수에 사용한 동일 바이너리이며, 재빌드하지 않고 배포했습니다.

| 항목 | 값 |
| --- | --- |
| 실행 파일 | `UW2-Joao-Korean.exe` |
| 버전 | v0.3.0 |
| 파일 크기 | **109,894,344바이트** |
| SHA-256 | `970b310e077162ab2bfce76372a086baed7951eaf251b20bdabb30c6e99eb6d0` |
| 제품 소스 | `5e2487a82d060d88cf90cad95cd081958bcf115b` |

[후보·증거 무결성 목록](remake/docs/handoff/2026-10-23/candidate-5e2487a-manifest.json)과 대조할 수 있습니다.

</details>

<details>
<summary><strong>소스로 출항하기: 실행기와 빌드</strong></summary>

저장소 루트의 `uw2-win11.bat`는 `remake/dist-desktop/UW2-Joao-Korean.exe`, 이전 `UW2-QCaine-Preview.exe` 순으로 찾고, 둘 다 없으면 소스를 빌드합니다. 실행기가 고른 파일은 빌드 시점에 따라 정식 배포 EXE와 다를 수 있습니다.

```powershell
# 저장소 루트에서 실행하거나 탐색기에서 더블클릭
.\uw2-win11.bat
```

소스 변경을 기존 EXE에 반영하려면 [remake 실행·빌드 안내](remake/README.md#소스에서-빌드하기)에 따라 다시 빌드하세요.

</details>

<details>
<summary><strong>1994년 순정 DOS판과 이전 프로토타입</strong></summary>

### DOS판: 암호표 찾다가 저녁 먹던 그 시절

저장소에 동봉된 원본 DOS판은 설치 없이 실행할 수 있습니다. 루트에서 아래 배치 파일을 실행하면 내장된 `DOSBox-0.74`가 `C HDD`를 `C:` 드라이브로 마운트하고 게임을 켭니다.

```powershell
# 반드시 저장소 루트 폴더에서 실행하세요!
.\run.bat
```

`금·목·수·화·토·일·월·천·지·인` 암호표를 물어봐도 서랍은 뒤지지 마세요. 아래아한글 3.0 원본에서 복원한 [대항해시대 2 암호 코드표](work/legacy-guides/대항해시대2-코드표.md)와 [고전 공략집](work/legacy-guides/대항해시대2-공략.md)을 펼치시면 됩니다. 종이 공략집 잃어버려서 친구네 전화하던 절차는 생략합니다.

### 이전 실행본: 보관함에 들어간 배들

- [v0.3.0-qcaine-preview.1 / `UW2-QCaine-Preview.exe`](https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/v0.3.0-qcaine-preview.1/UW2-QCaine-Preview.exe)는 이전 QCaine 공개 미리보기입니다.
- `app/`과 [이전 `UW2-Korean-Portable.exe`](https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/v0.2.0/UW2-Korean-Portable.exe)는 **지도·메뉴 중심의 초기 프로토타입(v0.2.0)**입니다. 현재 `remake/`와 별개이며 과거 구현·검증 기록으로 보존합니다. 명시적으로 실행하려면 `app\uw2-launch.bat`를 사용하세요.

</details>

<details>
<summary><strong>옛 검사 장부: 데이터 추출·app 프로토타입 G1~G6</strong></summary>

G1~G6은 **QCaine 도입 전 데이터 추출과 구형 `app/` 프로토타입의 검증 기록**입니다. G4~G6의 화면·조작·패키징은 `app/`에 해당하며, 현재 `remake/`의 전체 플레이 완료나 한글 완성도를 증명하지 않습니다. 현재 조안편의 인수 상태와 측정 범위는 [정식 배포 기록](remake/docs/joao-release-2026-10-23.md)을 확인하세요.

| 구분 | 당시 상태 | 당시 검증 내역 |
| --- | :---: | --- |
| **G1 · LS11 압축 해독** | ✅ **PASS** | `.LZW`라는 확장자에 속지 마세요(실제론 KOEI 독자 `LS11` + LZSS 감마 코딩). 14개 아카이브 전량 해제 완료 |
| **G2 · 초상화 & 에디터 자산** | ✅ **PASS** | DOS `KAO.LZW` 8색 초상화 256장 BMP 렌더 + 2007년 `dh2_Image_Data.ocx` 24비트 컬러 BMP 256장 추출 |
| **G3 · 한글 데이터 15도메인** | ✅ **PASS** | 항구 130 · 교역품 46 · 시장 100 · 항해사 120 · 함선 25 · 아이템 94 · 여급 30 · 시나리오 6종 JSON 추출 (`mojibake` 0건, 한글판 전용 오프셋 20건 역산) |
| **G4 · Win11 4씬 렌더** | ✅ **PASS** | 타이틀 → 주인공 6인 선택 → 세계지도 항해 → 항구 진입 화면 렌더링 |
| **G5 · 교역 루프 & 세이브** | ✅ **PASS** | 100개 항구 483개 매입 품목 가격 계산(`NaN` 0건), 매수(`B`)·매도(`S`), `F5`/`F9` 세이브·로드, 원본 `KOUKAI2.DAT` 드래그&드롭 판독 |
| **G6 · Electron 패키징** | ✅ **PASS** | `app/uw2-launch.bat` 더블클릭으로 독립 데스크톱 창 실행 |

</details>

<details>
<summary><strong>창고 지도: 폴더 구조</strong></summary>

| 경로 | 안에 든 보물 |
| --- | --- |
| [`remake/`](remake/) | **현재 전달 대상: QCaine13 기반 조안편 한국어 Windows 정식 배포본** (React + TypeScript + Electron, 마을·항해 화면, Windows 파일 슬롯) |
| [`app/`](app/) | **보관용 이전 지도·메뉴 프로토타입** (Vite + TS + Canvas, v0.2.0, 별도 `uw2-launch.bat`) |
| [`C HDD/`](C%20HDD/) | 1994년 한글 DOS판 원본 게임 파일 + 1995년 `HORIEDIT` C 소스 + 2007년 `DH2-Editor` + 한글 3.0 공략/코드표 원본 |
| [`DOSBox-0.74/`](DOSBox-0.74/) | 루트 [`run.bat`](run.bat)이 호출하는 포터블 DOSBox 0.74 실행 환경 |
| [`work/`](work/) | 한글판 추출 데이터([`db-korean/`](work/db-korean/)), 초상화 BMP 256장([`portraits-korean/`](work/portraits-korean/)), 복원된 [고전 공략·암호표](work/legacy-guides/), [VB6 에디터 해부 결과](work/dh2-editor-dissection/), 게이트 증거 스크린샷(`g4~g6`) |
| [`research/`](research/) | [Johan Li의 선행 연구](https://github.com/JohanLi/uncharted-waters-2-research) 기반 한글판 오프셋·EUC-KR 패치 스크립트 |
| [`uw2-ssot.md`](uw2-ssot.md) | **단일 진실 공급원(SSOT)** — 한글판 대 영문판 바이트 오프셋 비교표(§4b)와 G1~G6 전체 검증 로그 |
| [`archives/`](archives/) | `research/.git` 및 `research/node_modules` 보존용 압축 아카이브([`MANIFEST.json`](archives/MANIFEST.json)) |

</details>

<details>
<summary><strong>정비 일지 올리기: 작업 브랜치에 문서 반영</strong></summary>

아래는 `KaronLabs/Uncharted-Waters-2`의 작업 브랜치 `codex/joao-complete`에 문서를 반영하는 예시입니다. 먼저 현재 브랜치를 확인하세요. 이 예시는 `main` 병합이나 정식 릴리스 승인을 뜻하지 않습니다.

```powershell
cd E:\03_AllWork\04_REA\uw-2
git branch --show-current
git status -s
git add README.md
git commit -m "docs: update Joao candidate handoff"
git push origin codex/joao-complete
```

</details>

## ⚖️ 출처와 저작물 고지

- **대항해시대 2 (Uncharted Waters: New Horizons)** 원작과 게임 데이터의 저작권은 **KOEI TECMO GAMES** 및 해당 권리자에게 있습니다.
- [`research/`](research/)의 분석 프레임워크와 LS11 코덱은 [Johan Li의 프로젝트](https://github.com/JohanLi/uncharted-waters-2-research)([`research/LICENSE`](research/LICENSE), MIT)에서 출발하여 한글판 전용 오프셋과 EUC-KR 디코더를 패치했습니다.
- [`remake/`](remake/)는 [QCaine13/uncharted-waters-2](https://github.com/QCaine13/uncharted-waters-2)의 `04951e9`를 기반으로 하며 [원본 MIT 라이선스](remake/LICENSE)를 함께 보존합니다.
- [`DOSBox-0.74/`](DOSBox-0.74/)는 원본 DOS 실행을 위해 동봉된 오픈소스 에뮬레이터입니다.
