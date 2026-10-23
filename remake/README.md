# 대항해시대 2 — 조안편 한국어 Windows

이 폴더는 [QCaine13/uncharted-waters-2](https://github.com/QCaine13/uncharted-waters-2)의 `04951e9`를 바탕으로 한 현재 기본 실행 대상입니다. 원본 코드의 [MIT 라이선스](LICENSE)를 포함합니다. [`app/`](../app/)은 보관용 이전 지도·메뉴 프로토타입이고, [`run.bat`](../run.bat)은 원본 DOS판을 실행합니다.

| 리스본 마을 화면 | 알리의 첫 출항 화면 |
| --- | --- |
| ![QCaine 기반 한글 미리보기의 실제 리스본 마을 화면](docs/qcaine-town-preview.png) | ![QCaine 기반 한글 미리보기의 실제 해상 화면](docs/qcaine-sea-preview.png) |

**v0.3.0 정식 배포 / 조안편 사용자 인수 완료.** [실행 파일 다운로드](https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/v0.3.0/UW2-Joao-Korean.exe) → **조안·한국어 새 게임** 순서로 시작하세요. **나머지 다섯 주인공은 미완료**입니다. [인수·배포 기록](docs/joao-release-2026-10-23.md)을 함께 제공합니다.

## 바로 플레이하기

1. [`UW2-Joao-Korean.exe` — v0.3.0 조안편](https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/v0.3.0/UW2-Joao-Korean.exe)를 내려받아 Windows 11 x64에서 직접 실행합니다. 설치나 Node.js는 필요하지 않습니다. 코드 서명이 없어 Windows에서 게시자 확인 경고가 나타날 수 있습니다.
2. 왼쪽 **시스템** 메뉴에서 **조안·한국어 새 게임**을 시작합니다. 항해일지에서 현재 사건과 목적지를 확인하고 리스본의 건물들을 방문하며 진행하세요.
3. 마을에서는 `W/A/S/D`로 **건물 문까지 걸어가면 진입**합니다. 해상에서는 같은 키로 침로를 정하며, 키를 놓아도 계속 항해합니다. **항구 근처에서 `E`로 입항**합니다. 메뉴에서는 `W/S` 또는 `↑/↓`로 항목을 옮기고 `E`·`Enter` 또는 마우스 왼쪽 클릭으로 메뉴·대화를 선택합니다. `Esc` 또는 마우스 오른쪽 클릭으로 취소합니다. **항해일지**에서 현재 사건과 목적지를 확인하세요.
4. **시스템 → 슬롯 저장 (Windows 파일)**에서 화면에 표시되는 1~3번 중 하나를 고르고 한글 이름을 입력한 뒤 **저장**을 누릅니다. 저장 직후 슬롯 이름·주인공·날짜·금화를 확인하세요. 앱을 완전히 종료하고 다시 열어 **불러오기**로 복원할 수 있습니다.

정식 배포 EXE는 **109,894,344바이트**, SHA-256 `970b310e077162ab2bfce76372a086baed7951eaf251b20bdabb30c6e99eb6d0`입니다. [후보·공개 증거 무결성 목록](docs/handoff/2026-10-23/candidate-5e2487a-manifest.json)과 대조하고 사용자가 인수한 동일 EXE를 재빌드 없이 배포합니다.

저장소 루트의 [`uw2-win11.bat`](../uw2-win11.bat)는 `dist-desktop/UW2-Joao-Korean.exe` → 이전 `UW2-QCaine-Preview.exe` → 소스 빌드·실행 순으로 선택합니다. 일반 실행기가 고른 파일은 빌드 시점에 따라 정식 배포 EXE와 다를 수 있습니다. 소스를 수정한 뒤 기존 EXE를 갱신하려면 아래의 `npm run dist:portable`을 실행하세요.

이전 [v0.3.0-qcaine-preview.1 / `UW2-QCaine-Preview.exe`](https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/v0.3.0-qcaine-preview.1/UW2-QCaine-Preview.exe)와 아래 알리 출항 기록은 과거 실행본의 참고 자료로 보존합니다.

원작의 항로와 사건을 찾아볼 때는 [고전 공략집](../work/legacy-guides/대항해시대2-공략.md)을 참고할 수 있습니다. 이 재구현판의 구현·검증 범위는 원작과 다르므로, 막힌 지점은 [새 후보 인수 기록](docs/joao-candidate-handoff-2026-10-23.md)과 함께 확인해 주세요.

## 알리의 첫 출항

이전 미리보기 EXE에서 상태 주입 없이 확인한 짧은 시작 경로입니다. 상세한 조작·관찰 결과는 [실제 플레이 확인 기록](docs/play-check-2026-10-23.md)에 남깁니다.

1. **시스템 → 주인공 → 알 베자스(Ali Vezas)**를 선택해 새 항해를 시작합니다. `W`로 위쪽 항구의 문까지 걸어갑니다.
2. 항구에서 이어지는 대화 세 번을 `Enter`로 진행합니다. **Hugli**와 **금화 2,000**을 받은 것을 확인합니다.
3. 마을의 **선술집 문까지 걸어가서** 들어갑니다. **Recruit Crew**에서 선원 **5명**을 모집합니다. 이 경로에서는 금화가 **1,800**으로 줄어듭니다.
4. 항구로 돌아가 **Supply**에서 **물 20·식량 20**을 싣습니다. 이 경로에서는 금화가 **1,400** 남습니다.
5. 항구의 **출항(Sail)**을 선택하고 대화를 확인해 출항합니다.
6. 해상에서 `S`로 남쪽 침로를 정해 이동합니다. 돌아오려면 `W`로 북쪽 침로를 정하고, 항구 가까이에서 `E`를 눌러 재입항합니다. 키를 놓아도 항해가 계속되므로 이동 중 위치를 확인하세요.

## 저장 파일과 백업

현재 슬롯 화면은 **1~3번**을 제공합니다. 기본 파일 경로는 `%APPDATA%\UW2-QCaine-Preview\slots\uw2-slot-1.json`부터 `uw2-slot-3.json`까지입니다. 실제 경로는 슬롯 패널 맨 아래에도 표시됩니다. 내부 앱 이름은 `UW2-QCaine-Preview`를 유지하므로 새 후보와 이전 Preview가 같은 저장 경로를 공유합니다. 실행 파일만 다른 위치로 옮겨도 저장 파일은 같은 사용자 데이터 폴더에 남습니다. 슬롯을 백업하려면 게임을 종료한 뒤 `slots` 폴더 전체를 복사하세요. 기존 슬롯은 삭제하지 말고 인수 여정은 새 슬롯에 기록하십시오. 기존 `UW2-Korean` 실행본의 사용자 데이터와 경로가 분리돼 있습니다.

개발·검증 환경에서는 `UW2_SLOTS_DIR` 환경 변수로 별도 슬롯 폴더를 지정할 수 있습니다. 일반 플레이에는 필요하지 않습니다.

## 현재 구현 범위

- 조안편은 한국어 UI·대사·일지·용어를 포함해 사용자 인수 완료로 처리했습니다. 나머지 다섯 주인공의 한글화·완주는 미완료입니다.
- 실제 Windows JSON 파일 슬롯 1~3을 저장하고, 재실행 후 불러오는 경로가 있습니다. 저장 교체 중 실패하거나 프로세스가 종료된 경우의 백업 복구 검사가 포함돼 있습니다.
- 원본 `KOUKAI2.DAT`의 슬롯 10개에서 일부 날짜·금화·시나리오 상태를 읽고 재구현판 Save v8의 별도 상태로 보존하는 코드가 있습니다. 원본 DOS 저장을 그대로 이어서 플레이하는 기능은 아직 없습니다.
- 같은 후보 EXE에서 네이티브 슬롯 1·2 저장·완전 종료·재실행·복원을 확인했고, 1366×768·1280×720 창의 일부 컨트롤을 확인했습니다.
- 조안편 완료의 근거는 2026-10-23 사용자 인수 확인과 정식 배포 승인입니다. 자동 전편 여정·실제 OS 한글 IME 조합·오프라인 글꼴·긴 대사 전체에 대한 독립 측정 범위는 [인수·배포 기록](docs/joao-release-2026-10-23.md)에 명시했습니다.

현재 판정은 조안편 사용자 인수 완료입니다. 제품 소스 `5e2487a82d060d88cf90cad95cd081958bcf115b`의 121 스위트/1,062 테스트·데스크톱 59/59와 후속 검증 도구 `6a747a1946904ec5ae21a5ab2ed5b53a408fa434`의 61/61을 구분합니다. [새 후보 인수 기록](docs/joao-candidate-handoff-2026-10-23.md)과 [공개 증거](docs/handoff/2026-10-23/evidence/candidate-5e2487a/)를 확인하십시오.

## 소스에서 빌드하기

Node.js 22 이상과 npm, Git LFS가 필요합니다. 저장소 루트에서:

```powershell
git lfs install
git lfs pull
Set-Location remake
$joaoHadHusky = Test-Path Env:HUSKY
$joaoPreviousHusky = $env:HUSKY
$env:HUSKY = '0'
try {
  npm ci
  if ($LASTEXITCODE -ne 0) { throw 'UW2 의존성 설치 실패' }
} finally {
  if ($joaoHadHusky) {
    $env:HUSKY = $joaoPreviousHusky
  } else {
    Remove-Item Env:HUSKY -ErrorAction SilentlyContinue
  }
}
npm run verify
npm run dist:portable
```

`HUSKY=0`은 하위 폴더의 선택적 Git 훅 설치만 건너뛰며, 설치가 끝나거나 실패해도 이전 환경 변수의 존재 여부와 값을 복원합니다.

실행 파일은 `remake/dist-desktop/UW2-Joao-Korean.exe`에 생성됩니다. v0.3.0은 사용자 인수에 사용한 바이너리를 그대로 배포하며 재빌드하지 않았습니다. 후보 빌드 stdout 별도 파일이 보존되지 않은 한계는 인수 기록에 남겼습니다. `npm run verify:full`의 장시간 Cypress 전체 항해는 현재 미통과이므로, 일반 빌드 확인과 구분해 실행해 주세요.

원본 게임·음악·화상 자산의 권리는 각 권리자에게 있습니다. 이 코드의 출처와 관련 고지는 [상위 README](../README.md#-출처와-저작물-고지) 및 [원본 프로젝트](https://github.com/QCaine13/uncharted-waters-2)를 참고해 주세요.
