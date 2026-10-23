# SDD ledger — plan: remake/docs/joao-completion-plan.md

Baseline: b556a737961e9dfb96166705d276852f398b3227
Workspace: E:/03_AllWork/04_REA/uw2-joao-worktree
Branch: codex/joao-complete
Authority: user-approved plan, João only, original Korean terminology.

## Preflight
| Pair/task | Contract | Ruling |
| --- | --- | --- |
| Joao / Terms | Duplicate name keys | Terms owns canonical names; Joao excludes standalone names. |
| UI / Terms | koreanUi contains old names | Terms supplies map; coordinator removes duplicates during merge. |
| All locale work / Integration | catalogs.ts | Coordinator alone merges exports and validates duplicates. |
| Navigation / Desktop run | shared helpers | Navigation owns voyage helpers until handoff; desktop runner consumes stabilized API. |
| All / Tests | node_modules | Existing identical-lock dependencies junction; no install or dependency edits by agents. |
| All / Goal | acceptance | Unit and injected-state passes are not normal-play completion. |

Ruling: native create_worktree targets chat's parent REA project and cannot select this nested repository; use explicit git worktree for uw-2.
Ruling: use dedicated tracked plan and this ignored ledger; avoid external Bash workspace scripts on Windows.
Ruling: no new approval for commits/merge/publish already expressly authorized by user plan; publish gated on full acceptance.

## Progress
- [x] Baseline status clean; branch and isolated worktree created.
- [ ] Baseline checks
- [ ] Navigation diagnosis and fix
- [ ] Joao Korean dialogue
- [ ] Shared Korean UI
- [ ] Korean terminology
- [ ] Integration and independent reviews
- [ ] Final EXE normal-play completion and save lineage
- [ ] Release and clean-up

## Integration checkpoint
- Baseline109suites/963tests PASS (25.509s), assets40 PASS.
- Added global Korean coverage RED1352missing -> GREEN0; integration suite117/1026 PASS.
- Joao435text+9propernames, sharedUI391/combat139, terms457 integrated; catalogs conflict Food resolved.
- Ruling update: Food is generic category, not an exact original DOS name; use 식량 consistently with actual provisions/dialogue (supersedes 식료품).
- Independent reviews found and fixed sharedYes sir speakercontext + particle typo; navigation RAF/DOM cleanup; desktopdriver scrolling/load-negativecontrol/ownedprocessPIDreuse/timeouts/finalPASS sequencing.
- UI longdialogue clickshield/grammar/title corrections underway. No final EXE acceptance yet.
- Candidate build session72053 in progress; owns dist-desktop. No other builders.

## Final integration gate
- Shared dialogue overlay, successive-body scroll reset, title locale and particles independently cleared.
- npm run verify exit0:119suites1035tests,slots4,tsc,lint,webpack; warnings asset sizes only.
- Desktop driver Node9tests exit0. Locale Cypress targeted run55911 underway.
- Portable rebuild38614 underway; final output UW2-Joao-Korean.exe. Old preview candidate NOT acceptance.
- All implementation source frozen pending final review; no live EXE acceptance yet.

- Portable38614 exit0; SHA256 ed44eb4f2731352a049a35a817378d22a6ecbbd05dd134819e9873c3f822f5ef.
- Direct locale Cypress27660 exit0:6passing. start-server wrapper failed cleanup wmic missing; tests themselves passed.
- First packagedfreshrun18324 exit1 at motherfarewell (time1560 outside22:00-midnight gate). Failed artifacts joao-full-20261023-1317 preserved; desktop owner diagnosing driverroute, no productchange.
