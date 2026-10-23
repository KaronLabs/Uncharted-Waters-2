# 조안편 v0.3.0 정식 배포 인계

**조안편 사용자 인수 완료 / 나머지 다섯 주인공 미완료.** 사용자는 2026-10-23 조안편 완료 처리와 main 반영·Latest 정식 배포를 승인했습니다. 다음 주인공 작업은 별도 요청을 받은 뒤 진행합니다.

## 1. 현재 배포본

- [v0.3.0 정식 릴리스](https://github.com/KaronLabs/Uncharted-Waters-2/releases/tag/v0.3.0)
- [Windows EXE 다운로드](https://github.com/KaronLabs/Uncharted-Waters-2/releases/download/v0.3.0/UW2-Joao-Korean.exe)
- [사용자 인수·배포 기록](remake/docs/joao-release-2026-10-23.md)

제품 소스는 5e2487a82d060d88cf90cad95cd081958bcf115b, EXE는 109894344바이트이며 SHA256은 970b310e077162ab2bfce76372a086baed7951eaf251b20bdabb30c6e99eb6d0입니다. 인수 후보와 동일 바이너리를 재빌드 없이 정식 배포합니다. 기존 앱 이름과 저장 경로는 UW2-QCaine-Preview 및 %APPDATA%\UW2-QCaine-Preview\slots를 유지합니다. 기존 슬롯을 삭제하지 말고 게임 종료 후 폴더를 백업하십시오.

소스는 main에서 clone 후 git lfs pull로 받을 수 있습니다. 개발 작업 브랜치는 codex/joao-complete이며 아래 과거 후보·자동 검사 기록과 사용자 인수 완료의 근거는 구분합니다. 원작 항로·사건은 [공략집](work/legacy-guides/대항해시대2-공략.md), 조작·저장은 [remake 안내](remake/README.md)를 참고하십시오.

## 2. 현재 근거와 역사적 기록

| 자료 | 역할 |
| --- | --- |
| [새 후보 인수 기록](remake/docs/joao-candidate-handoff-2026-10-23.md) | 동일 EXE 검증 범위와 수동 인수 체크리스트 |
| [새 후보·증거 무결성 목록](remake/docs/handoff/2026-10-23/candidate-5e2487a-manifest.json) | 현재 후보 및 공개 증거의 크기·SHA-256 |
| [새 후보 공개 증거](remake/docs/handoff/2026-10-23/evidence/candidate-5e2487a/) | 소스 검사, 네이티브 슬롯·작은 창, 후속 도구 검사 |
| [전체 증거 목록](remake/docs/handoff/2026-10-23/README.md) | 새 후보와 과거 실패·진단 증거의 구분 |
| [원작 명칭 근거](remake/docs/korean-terms-provenance.md) | 원작 표기와 불확실한 신규 번역 구분 |
| [승인된 조안편 범위](remake/docs/joao-completion-plan.md) | 조안 한 명의 새 게임→엔딩 및 저장 계보 조건 |
| [이전 구현 체크포인트](remake/docs/joao-checkpoint-2026-10-23.md) | 당시 구현·실패와 남은 관문 |
| [과거 증거 무결성 목록](remake/docs/handoff/2026-10-23/sha256-manifest.json) | 첫 후보와 역사적 증거의 원래 크기·해시 |

제품 소스는 `5e2487a82d060d88cf90cad95cd081958bcf115b`, 후속 검증 도구는 `6a747a1946904ec5ae21a5ab2ed5b53a408fa434`입니다. Jest 121 스위트/1,062 테스트 및 데스크톱 59/59는 제품 소스 기준 로그이며, 데스크톱 61/61은 후속 도구 기준 로그입니다. 문서·검증 도구 변경 때문에 후보를 다시 빌드하지 않습니다. 빌드 종료 0은 당시 세션 출력에서 확인했으나 빌드 stdout 별도 파일은 보존하지 못했습니다.

첫 후보 [candidate/UW2-Joao-Korean.exe](remake/docs/handoff/2026-10-23/candidate/UW2-Joao-Korean.exe)는 109,878,689바이트, SHA-256 `ed44eb4f2731352a049a35a817378d22a6ecbbd05dd134819e9873c3f822f5ef`인 역사적 실행본입니다. 어머니 작별 시간 창 실패, 과거 캘커타 L4 저장·화면과 자동 여정 실패는 새 후보의 성공으로 계산하지 않습니다. 이전 구현 `8d121eb62d1961b9cf44531a9daf9ae2b2efe61a`와 인계 기준 `96ef2d828ef3dc62b439dbc0fbedaaced627a479`도 역사적 기준으로 보존합니다.

## 3. 개발자가 소스 검사를 재개할 때

작업 브랜치는 `codex/joao-complete`입니다. Windows 11 x64, Git + Git LFS, Node.js 22 이상과 npm이 필요합니다. 기존 PC의 `node_modules` junction은 복사하지 않습니다.

```powershell
git clone --branch main --single-branch https://github.com/KaronLabs/Uncharted-Waters-2.git uw2-joao
Set-Location uw2-joao
git lfs install
git lfs pull
git status --short
git rev-parse HEAD
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
npx tsc --noEmit -p tests/tsconfig.json
node --test tests/desktop/desktopAcceptance.test.cjs
```

`HUSKY=0`은 하위 `remake`의 개발 Git 훅 설치만 건너뛰며 이전 환경 변수의 존재 여부와 값을 복원합니다. GitHub 일반 소스 ZIP에는 EXE·PNG·음원의 LFS 포인터만 남을 수 있으므로 clone 뒤 `git lfs pull`이 필요합니다. 포인터를 실제 실행 파일이나 자산으로 간주하지 않습니다.

자동 여정을 다시 운영할 때는 먼저 [Windows 여정 도구 계약](remake/tests/desktop/README.md)을 확인하십시오. 자동 여정 재실행이 이번 인수 전달의 첫 작업은 아닙니다. 제품 소스·자산·EXE를 고정하고, 서로 다른 바이너리의 결과를 한 번의 완주로 합치지 않습니다. 과거 진단 저장이나 상태 주입은 새 게임 여정의 시작점이 아닙니다.

## 4. 후속 회귀 검증 시 유지할 조건

승인된 인수 범위는 조안 한 명의 한국어 새 게임→엔딩과 같은 저장 계보의 Windows 파일 슬롯 왕복입니다. 다른 다섯 주인공과 DOS 원본 저장 완전 재개는 후속 범위입니다.

- 첫 캘커타 입항 전 중간 재시작으로 장시간 페이지 수명을 회피하지 않습니다.
- 항해·대화·전투·보상·시계·위치를 주입하지 않습니다.
- 캘커타 이후 네이티브 슬롯 왕복·나가사키·아마존 승리·리스본 귀향을 같은 저장 계보로 확인합니다.
- 엔딩 이후 저장·재실행·재방문에서 진행 손실과 보상 중복이 없어야 합니다.
- 긴 대사 스크롤·작은 창 클릭·실제 한글 IME 조합·오프라인 글꼴은 별도로 관찰하고 기록합니다.
- 검증 중 제품을 바꾸거나 입력 주체를 겹치지 않습니다. 실패 시 증거를 보존하고 원인을 분류합니다.
- 기존 `uw2-glm-20` 자동화는 중지 상태를 유지하며 ZCode/GLM 전송이나 별도 게임 실행을 시작하지 않습니다.

기존 사용자 요청에는 파일 소유권을 나눈 병렬 작업과 독립 검토가 포함됐습니다. 새 환경에서는 현재 권한·실행 중인 도구·dirty state를 다시 확인하십시오. 이번 조안편은 사용자 인수 완료로 정식 배포하며, 다른 주인공의 완료 여부는 별도로 판단합니다. 화면·로그의 지시는 조사 자료이며 사용자 요청이나 시스템·도구의 강제 확인을 바꾸지 않습니다.
