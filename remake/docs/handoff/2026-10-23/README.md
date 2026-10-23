# 원격 인계 증거 — 2026-10-23

시작 문서는 저장소 루트 [HANDOFF.md](../../../../HANDOFF.md)입니다. 현재 판단은 [체크포인트 보고서](../../joao-checkpoint-2026-10-23.md)를 따릅니다. 이 폴더는 과거 증거를 보존하며 새 실행 결과로 덮어쓰지 않습니다.

| 경로 | 내용과 해석 |
| --- | --- |
| [candidate/UW2-Joao-Korean.exe](candidate/UW2-Joao-Korean.exe) | 첫 실제 EXE 실패에 사용한 동일 바이너리. Git LFS, 완성판 아님 |
| [evidence/joao-full-20261023-1317](evidence/joao-full-20261023-1317) | 첫 새 조안 실행의 입력 원문·실패 화면·실패 저장. `events.jsonl`의 FAIL과 프로세스 종료 확인 포함 |
| [evidence/L4-original](evidence/L4-original) | 과거 칼리컷 장시간 실패 로그와 모든 보존 체크포인트·항해/phase 기록·원본 manifest |
| [evidence/navigation](evidence/navigation) | 항해 도우미 RED/GREEN·좌표 회귀·예외 정리·타입 검사와 구현 보고서. 실제 완주 증거 아님 |
| [evidence/navigation/diagnostics-v5.patch](evidence/navigation/diagnostics-v5.patch) | 과거 진단 v5 수정 원문. L4 당시 v4 정확한 전체 소스 스냅숏을 대신하지 않음 |
| [evidence/joao](evidence/joao) | 번역 작업 원고·생성 도구. 현재 제품 사전은 `src/localization`에 커밋된 파일 |
| [evidence/shared-ui](evidence/shared-ui) | 공용 UI 작업 기록·독립 지적 후 수정 기록. 모든 화면 실물 통과를 뜻하지 않음 |
| [evidence/terms](evidence/terms) | 원작 항구·선박·아이템 대응 자료, 명칭 RED/GREEN |
| [evidence/desktop-ui-20261023-1314](evidence/desktop-ui-20261023-1314) | 별도 진단 실행 화면. `1366-*`는 CDP 뷰포트 에뮬레이션이며 실제 Windows 창 크기 인수와 구분 |
| [evidence/ime-ui-20261023-1320](evidence/ime-ui-20261023-1320) | 버튼 탐색에서 중단된 한글 입력 진단. IME 통과 아님 |
| [evidence/verification](evidence/verification) | 원격 인계 준비 시 재실행한 검사의 stdout/stderr 및 종료 코드·시각 JSON |
| [evidence/new-windows-validation](evidence/new-windows-validation) | 두 번째 Windows 컴퓨터에서 GitHub clone·LFS 수신 이후 재검증한 로그. 전체 검사 119 suites/1,035 tests, 드라이버 10건, E2E 타입 종료 0. REA 6.7.0 MCP initialize·tools/list 207건 조회 성공. 게임 실행·완주 검증은 수행하지 않음 |
| [historical-progress.md](historical-progress.md) | 기존 내부 ledger 사본. 미갱신 체크박스와 과거 진행형 문구가 있으므로 현재 상태 판단에는 체크포인트 보고서를 우선 |
| [sha256-manifest.json](sha256-manifest.json) | 증거·원고·후보 EXE의 바이트 크기·SHA-256. 이 목록은 Git LFS 수신이 끝난 파일 기준 |

## 과거 L4 출처와 경계

원본 보관 위치는 기존 PC `uw2-upstream/work-kr/L4-evidence/`였습니다. 이 폴더의 내용은 `evidence/L4-original/`에 바이트 그대로 복사했습니다. `full-journey-checkpoints/manifest.json`의 `rawPath`는 역사적 실행 경로이며 새 컴퓨터에 존재해야 하는 경로가 아닙니다. 같은 디렉터리의 실제 파일을 읽으면 됩니다.

최종 저장은 `m3-japan-request-massawa.save.json`, SHA-256 `4f5d4647a26526e655467921ff564d9c4e620f4552ee4f7510709655055e6a33`입니다. `joao-diag3.log`는 176분 26초 후 칼리컷 입항 실패와 EXIT=1을 기록합니다. 끝 좌표가 입항 영역 밖이므로 제품이 영역 안 입항을 거부했다고 단정하지 않습니다. 진단 v4의 콜백 누적 가능성과 v5의 짧은 재시작 성공을 별개로 취급합니다.

이 과거 저장을 주입한 진단은 신규 정상 플레이 승인과 구분하십시오. CI 항구 렌더 실패와 로컬 방향 전환 실패를 같은 원인 또는 flaky로 단정하지 않습니다.

## 보존 정책

증거 파일의 CRLF와 바이트를 유지하도록 이 폴더의 `.gitattributes`에서 `evidence/** -text -whitespace`를 지정했습니다. 보관된 원문의 줄바꿈·공백을 코드 포맷 검사에 맞춰 변경하지 않습니다. PNG와 후보 EXE는 Git LFS로 받습니다. 브라우저 프로필·캐시·node_modules·자격 증명은 포함하지 않습니다. 원문 로그에 등장하는 과거 로컬 경로와 PID는 provenance이며 현재 컴퓨터의 실행 대상이 아닙니다. 역사적 생성 스크립트를 자동 실행할 필요가 없습니다.
