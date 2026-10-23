# BGM·불러오기 경계 수정 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Each task follows RED→GREEN, scoped review, then integration. 총괄이 파일 소유권과 게시를 관리한다.

**Goal:** BGM 중첩과 직접 연결된 설정·트랙·재생 오류·낡은 저장 응답을 고쳐 Windows 수정판을 배포한다.
**Architecture:** Sound가 자기 Audio를 정리하고 BGM 설정을 보존한다. 저장 로더는 기존 generation과 최신 요청 번호로 응답을 적용한다. 실제 EXE는 UI 조작과 읽기 전용 미디어 관찰로 검사한다.
**Tech Stack:** React 18, TypeScript, Jest/jsdom, Electron 45, Node.js, GitHub CLI.
**Spec:** ../specs/2026-10-23-bgm-load-boundary-design.md (사용자 승인).

## Global Constraints

- 작업 위치: E:/03_AllWork/04_REA/uw2-joao-worktree, codex/joao-complete. 기준 57d4c62e865e7332d2b0b5a16fc7eb4d1091f33e.
- 기존 게임 규칙·주인공 범위·저장 포맷·앱 ID·슬롯 경로·기존 사용자 슬롯을 보존한다.
- 새 의존성·전역 오디오 엔진·일반 요청 큐를 추가하지 않는다. Git·태그·게시·EXE 실행은 총괄만 수행한다.
- BGM 음소거는 불러오기·새 게임·앱 재실행 뒤에도 기억한다. 기존 SFC 효과음 설정과는 별개다.
- 각 결함은 수정 전 실패를 관찰한다. 실패·취소·제한된 저장소도 검사하며 검증되지 않은 성공을 만들지 않는다.

## Review Focus

- StrictMode 정리 후 음악이 재개되고 최종 unmount 후에는 남지 않는다 (Task 1).
- 같은 곡은 시계가 이어지고 다른 곡은 실제로 교체된다 (Tasks 1, 3).
- autoplay 차단·재생 요청 취소 뒤 다음 입력으로 복구하며 예상 밖 오류는 숨기지 않는다 (Task 1).
- 음소거와 효과음 설정은 load 및 새 게임으로 변하지 않는다 (Tasks 1, 3).
- 오래된 native 응답·알림은 새 게임이나 더 최신 load의 결과를 덮지 않는다 (Task 2).

### Task 1: 오디오 설정·동일곡·재생 요청

**Files:** Modify src/interface/sound/Sound.tsx, src/interface/sound/Sound.test.tsx (모두 remake/ 기준).
**Interfaces:** 기존 Sound Props와 playAudio 사용처를 보존한다. BGM 별도 localStorage 키는 uw2.bgm; 기본 true, false 저장 시 음소거, 저장소 거절은 안전하게 처리한다.

- [x] RED: 음소거 remount·재실행 초기값, 동일곡 src 재할당, 첫 NotAllowedError 후 다음 입력 재시도, pending play 중 cleanup의 실패를 관찰·기록한다.
- [x] GREEN: 최소 수정을 적용한다. play 성공 뒤에만 최초 재생 상태를 확정하고 예상 밖 오류는 호출 경계에서 관찰 가능하게 처리한다.
- [x] Verify: Sound/SFC/System 관련 Jest, typecheck, 변경 파일 lint·prettier. 기존 AbortError/NotSupportedError 의미를 보존한다.
- [x] Review: 독립 리뷰가 Spec/Quality PASS를 확인한다. 총괄만 커밋한다.

### Task 2: 지연된 native load와 수명에 맞는 안내

**Files:** Modify src/interface/desktopSlotStorage.ts, DesktopSlots.tsx, System.tsx와 해당 테스트. 필요 시 새 src/interface/System.loadLifecycle.test.tsx.
**Interfaces:** loadFromDesktopSlot은 취소와 실제 실패를 구분한다. 마지막 native 요청 우선이며 시작 generation이 달라지면 취소한다. UI는 취소에 실패 알림을 띄우지 않고 정상 성공·실패를 구분한다.

- [x] RED: deferred bridge 응답 도중 일반 Load/새 게임, 두 슬롯 응답의 양쪽 완료 순서, 정상 read·손상 read, remount 후 새 항해 알림, 빠른 알림 교체 실패를 재현한다.
- [x] GREEN: generation+요청 번호로 stale 응답을 거절하고, 알림은 살아 있는 부모에 전달하며 해당 알림 타이머를 교체·정리한다.
- [x] Verify: 저장 어댑터·슬롯·Interface 알림·System 관련 검사 및 타입·린트. 게임 상태가 최신 의도와 일치해야 한다.
- [x] Review: 독립 리뷰 Spec/Quality PASS 후 총괄 커밋.

### Task 3: 실제 Windows 회귀·배포

**Files:** scripts/verify-bgm-load.cjs, README.md, remake/README.md, HANDOFF.md, v0.3.1 기록·manifest.
**Interfaces:** 앞 태스크의 최종 제품 커밋을 EXE와 고정한다. 기존 v0.3.0 및 증거는 역사적 기준으로 보존한다.

- [x] Native perimeter: 일반/슬롯 Load 10회 이상, 다른 두 곡 왕복, 같은 곡 건물 이동, 음소거 후 load/새 게임/재실행, 재생 중 언어 변경, 가능한 빠른 연속 Load.
- [x] Verify: npm run verify, node --test tests/desktop/*.test.cjs, dist:portable. 자산 크기 경고와 오류는 구분한다.
- [x] 새 EXE에서 활성 BGM 1개·재생 시각 진행·음소거 유지·관찰 기간 예외 0·종료 코드 0을 확인한다. 별도 프로필·슬롯만 사용한다.
- [ ] 독립 전체 변경 검토와 문서·링크·해시 대조 후 v0.3.1/main/Latest를 게시하고 자산을 다시 받아 SHA256을 확인한다.
- [ ] 소스·배포·실제 검사 범위와 사용자 인수 체크리스트를 최종 보고한다. 추가 결함 없으면 중단한다.
