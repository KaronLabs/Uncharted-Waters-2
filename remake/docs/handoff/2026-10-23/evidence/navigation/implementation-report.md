# Navigation implementation evidence — 2026-10-23

Baseline: b556a737961e9dfb96166705d276852f398b3227, branch codex/joao-complete.

## Confirmed

The shipped world character update commits the previously queued destination, tests E docking, reads heading, computes speed, and queues the next destination. Movement uses speed/40. The world loop admits a movement update only after at least 67ms.

The unchanged 12-RAF docking helper was isolated for direct testing without changing its behavior. Actual createWorldCharacters, createMap using shipped tilemap bytes, Input, and dock-range logic reproduced failure to advance the requested east axis at 144/240Hz after a pending north destination. The same frame count permits excessive open-water travel at low refresh rates. See red.log; pulse-trace.log captures the two-stage coastal slide.

The correction uses 201ms (3x67ms) after the requested heading is visible, with ordinary repeated E input. The 10s wall watchdog remains unchanged. This matches approximately the previous 12 frames at 60Hz and removes display-refresh dependence. Saved position is still observed before every next plan. A pure native Promise runDockingPulse export permits direct regression testing. No production movement, dock range, or story state was changed.

planDockingEntry accepts optional movementByDirection. getSavedHeadingMovement computes exact per-heading speed/40 from the observed save's flagship, captain, and wind. The Cypress docking caller supplies this mapping. Legacy callers retain their half-tile heuristic until explicitly supplying the observed mapping.

System, Save, and Sail helper selections now use stable UI data attributes supplied by the UI workstream.

## Validation

- RED: docking tests failed at 144/240Hz with the unchanged 12-frame algorithm.
- RED: planner returned two half-tile steps where a supplied quarter-tile speed requires four.
- GREEN final-focused.log: 5 suites, 46 tests passed; child exit 0; 2.203s Jest time.
- Includes L4 endpoint x1342,y553.49 entering Calicut within 20 observed replans at speeds 10/20/40; no relocation after the initial unit fixture.
- Includes boundary positives/negatives, current wind/speed computation, direction change with old destination, 10/60/144/240Hz, interruption cleanup, missing-heading failure cleanup, zero propulsion, missing captain, invalid negative/nonfinite planning increments.
- final-typecheck.log: tsc --noEmit exit 0.
- Prettier checks on six owned files and git diff --check passed.

## Remaining boundary

These are isolated source-level integration tests, not a replay of the 176-minute L4 process. The original raw log's final corrections were outside Calicut range and do not prove that the engine rejects an in-range dock. Only the coordinator's new packaged EXE journey from fresh game through Calicut without restart can establish long-running live acceptance. No external app, server, executable, dependency install, commit, push, or merge was performed in this workstream.

## P2 independent-review follow-up

The review identified uncaught DOM exceptions in runDockingPulse. Removed heading images or missing System controls could throw out of a RAF callback, leave the Promise pending and retain its watchdog; the initial synchronous variant rejected without disposing the lifecycle.

Three negative tests first reproduced these exact paths in red-cleanup.log. A local safely(callback) guard now routes initial operations, steering callbacks, pause operations, and pause observers through the existing fail -> settle/reject path. No engine or lifecycle-global behavior changed. On failure the owned RAF/watchdog are disposed and WASD released; ordinary E's Input-level 250ms release buffer retains its established semantics.

Final follow-up: final-cleanup-focused.log contains 5 suites / 49 tests PASS, exit0 (1.923s). final-cleanup-typecheck.log passes exit0. Owned diffcheck and Prettier pass. Files frozen again after these results.
