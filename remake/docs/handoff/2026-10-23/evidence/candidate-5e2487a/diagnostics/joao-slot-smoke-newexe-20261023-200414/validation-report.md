# New EXE independent Windows GUI validation — 2026-10-23

## Verdict

- **PASS:** fresh João Korean game, native Windows slot saves, full EXE exit and same-hash relaunch, UI slot 1/2 load with exact states and visible Korean success messages.
- **PASS:** actual Windows window bounds and OS screenshots at 1366×768 and 1280×720, with reachable System and slot Save controls.
- **INCOMPLETE:** physical Korean OS IME composition with Enter/Escape; actual network-disconnected font run; full João story and ending play.

## Candidate and source

- Source commit: `5e2487a82d060d88cf90cad95cd081958bcf115b`.
- EXE: `C:\All-Work\rea\uw-2\remake\docs\handoff\2026-10-23\candidate-5e2487a\UW2-Joao-Korean.exe`.
- Size: 109,894,344 bytes; SHA-256 before and after all runs: `970b310e077162ab2bfce76372a086baed7951eaf251b20bdabb30c6e99eb6d0`.
- Pinned Node: `%USERPROFILE%\AppData\Local\Programs\node-v24.18.0-win-x64\node.exe`.

## Native slot run

- Validator: `validate.cjs`; exit code **0**; evidence: `run\events.jsonl`, screenshots, `run\slots`, and copied native slot files.
- Fresh profile and slots were created under `run`; no prior save was resumed.
- S1 at Lisbon port 1, building null, game time 480; System Save and slot 1 Save with name `첫 저장`. Actual slot 1 file SHA-256: `9d7aa6f6d5c25844659450fca74a8b8f87cb3af35744682fcfc055216d9a4da3`.
- Normal `w` key pulse entered the Lisbon harbor, showing Korean João dialogue. After normal dialogue exit, S2 at Lisbon port 1, building null, game time 540; System Save and slot 2 Save with name `둘째 저장`. Actual slot 2 file SHA-256: `3f3c414c55e2674fb5943f789ed2ac2c69814472325d7948c536c183ebeea292`.
- First EXE root PID 6576 exited code 0. The second launch restored S2. UI Load slot 1 gave exact S1 and visible `슬롯 1 불러오기 완료`; UI Load slot 2 gave exact S2 and visible `슬롯 2 불러오기 완료`. Both native slot files stayed byte-identical to their post-save hashes. Second EXE root PID 61124 exited code 0. Owned process lists became empty and TCP port 9337 was free after both closes.
- Original-resolution screenshots visually inspected: `run\slot-1-save-success.png`, `run\harbor-dialogue.png`, `run\relaunch-slot1-s2-to-s1.png`, `run\relaunch-slot2-s1-to-s2.png`.
- Slot names were inserted via CDP `Input.insertText`. This proves text insertion and persistence, **not** physical Windows IME composition.

## Physical small-window run

- Evidence: `C:\All-Work\rea\uw-2\remake\.worktrees\joao-completion\diagnostics\joao-window-native-newexe-20261023-200818\run`.
- Separate fresh profile and slot folder. Validator exit code **0**. Windows `SetWindowPos` resized owned Electron child PID 16496. `GetWindowRect` returned exactly 1366×768 and 1280×720. At each size, CDP mouse/keyboard input reached System trigger, System Save, slot 1 name, slot 1 Save, and the visible Korean save-success message.
- `Graphics.CopyFromScreen` captured the actual Windows window at both sizes. `1366x768-native.png` and `1280x720-native.png` were opened and visually inspected: native title bar, Korean UI, System panel, slot controls, and save-success text are visible. `*-cdp.png` and `events.jsonl` provide separate renderer evidence.
- EXE root PID 58576 exited code 0; port 9337 became free; no candidate process remained. EXE hash stayed unchanged.
- A prior separate attempt `window-run` in this report's directory failed because Electron's page CDP endpoint does not expose `Browser.getWindowForTarget`; evidence preserved. The next separate attempt `joao-window-native-newexe-20261023-200718\run` failed because Windows PowerShell script execution policy blocked the local diagnostic helper; evidence preserved. The successful attempt used `-ExecutionPolicy Bypass` only for its own local validation helper. Neither failure is evidence of a game defect.

## Scope limit

No quest, time, item, coordinate, or combat state was injected. No product code, test source, assets, or EXE were changed by this validation session. This run does not establish the complete route, Amazon victory, ending, real Korean OS IME composition, or actual disconnected-network font behavior.
