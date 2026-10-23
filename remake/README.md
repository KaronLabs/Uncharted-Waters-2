# 대항해시대 2 — QCaine 기반 한글 미리보기

이 폴더는 [QCaine13/uncharted-waters-2](https://github.com/QCaine13/uncharted-waters-2)의 `04951e9`를 바탕으로 한 별도 재구현판입니다. 원본 코드의 [MIT 라이선스](LICENSE)를 포함합니다. 이 저장소의 기존 [`app/`](../app/) Windows판과 [`run.bat`](../run.bat) DOS판은 별개입니다.

## 바로 플레이하기

1. [Windows 11 x64 미리보기 실행 파일](https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/v0.3.0-qcaine-preview.1/UW2-QCaine-Preview.exe)을 내려받아 실행합니다. 이 미리보기 EXE는 코드 서명이 없어 Windows에서 게시자 확인 경고가 나타날 수 있습니다.
2. 왼쪽 **시스템** 메뉴에서 주인공을 고르고 새 항해를 시작합니다. 조안의 리스본 출발 경로가 현재 가장 많이 검사됐습니다.
3. `W/A/S/D`로 이동하고 `E`·`Enter` 또는 마우스 왼쪽 클릭으로 선택합니다. `Esc` 또는 마우스 오른쪽 클릭으로 취소합니다. **로그** 패널에서 현재 사건과 목적지를 확인하세요.
4. **시스템 → 슬롯 저장 (Windows 파일)**에서 1~3번 중 하나를 고르고 한글 이름을 입력한 뒤 **저장**을 누릅니다. 저장 직후 슬롯 이름·주인공·날짜·금화를 확인하세요. 앱을 완전히 종료하고 다시 열어 **불러오기**로 복원할 수 있습니다.

원작의 항로와 사건을 찾아볼 때는 [고전 공략집](../work/legacy-guides/대항해시대2-공략.md)을 참고할 수 있습니다. 이 재구현판의 구현·검증 범위는 원작과 다르므로, 막힌 지점은 [현재 검증 현황](docs/checkpoint-2026-10-23.md)과 함께 확인해 주세요.

## 저장 파일과 백업

기본 파일 경로는 `%APPDATA%\UW2-QCaine-Preview\slots\uw2-slot-1.json`부터 `uw2-slot-3.json`까지입니다. 실제 경로는 슬롯 패널 맨 아래에도 표시됩니다. 실행 파일만 다른 위치로 옮겨도 저장 파일은 같은 사용자 데이터 폴더에 남습니다. 슬롯을 백업하려면 게임을 종료한 뒤 `slots` 폴더 전체를 복사하세요. 기존 `UW2-Korean` 실행본의 사용자 데이터와 경로가 분리돼 있습니다.

개발·검증 환경에서는 `UW2_SLOTS_DIR` 환경 변수로 별도 슬롯 폴더를 지정할 수 있습니다. 일반 플레이에는 필요하지 않습니다.

## 현재 구현 범위

- 한국어를 기본으로 선택할 수 있고 시스템 메뉴·슬롯 UI·일부 공통 용어가 한국어로 표시됩니다. 전체 대사·용어 번역은 진행 중입니다.
- 실제 Windows JSON 파일 슬롯 1~3을 저장하고, 재실행 후 불러오는 경로가 있습니다. 저장 교체 중 실패하거나 프로세스가 종료된 경우의 백업 복구 검사가 포함돼 있습니다.
- 원본 `KOUKAI2.DAT`의 슬롯 10개에서 일부 날짜·금화·시나리오 상태를 읽고 재구현판 Save v8의 별도 상태로 보존하는 코드가 있습니다. 원본 DOS 저장을 그대로 이어서 플레이하는 기능은 아직 없습니다.
- 여섯 주인공 선택·스토리 코드가 있지만, 여섯 명을 UI에서 정상 조작해 엔딩까지 도달했다는 검증은 없습니다. 조안의 장시간 전체 항해 검사도 칼리컷 입항에서 실패했습니다.

현재 판을 완성판으로 취급하지 마세요. 구체적인 통과·실패 근거는 [검증 현황](docs/checkpoint-2026-10-23.md)에 남겼습니다.

## 소스에서 빌드하기

Node.js 22 이상과 npm, Git LFS가 필요합니다. 저장소 루트에서:

```powershell
git lfs install
git lfs pull
cd remake
npm ci
npm run verify
npm run dist:portable
```

실행 파일은 `remake/dist-desktop/UW2-QCaine-Preview.exe`에 생성됩니다. `npm run verify:full`의 장시간 Cypress 전체 항해는 현재 미통과이므로, 일반 빌드 확인과 구분해 실행해 주세요.

원본 게임·음악·화상 자산의 권리는 각 권리자에게 있습니다. 이 코드의 출처와 관련 고지는 [상위 README](../README.md#-출처와-저작물-고지) 및 [원본 프로젝트](https://github.com/QCaine13/uncharted-waters-2)를 참고해 주세요.
