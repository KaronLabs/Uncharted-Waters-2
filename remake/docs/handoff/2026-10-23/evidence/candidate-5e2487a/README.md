# Candidate 5e2487a public evidence

Selected derivatives of existing diagnostic files. Preparation ran no game, new IME attempt, journey or process action.

## Identity and scope

- Product source association: 5e2487a82d060d88cf90cad95cd081958bcf115b.
- Candidate EXE: 109,894,344 bytes; SHA-256 970b310e077162ab2bfce76372a086baed7951eaf251b20bdabb30c6e99eb6d0.
- This source association and EXE identity are recorded in the existing candidate report/events; preparation did not rebuild the EXE.
- Complete Joao journey/ending: **INCOMPLETE**.
- Physical Windows Korean IME composition, including Enter/Escape during composition: **INCOMPLETE**.
- Execution checkout HEAD is unverified unless explicitly recorded. Directory names alone are not proof.

## Evidence map

| Directory | Recorded evidence | Limit |
| --- | --- | --- |
| diagnostics/joao-candidate-source-5e2487a | Raw verification: 121 suites, 1062 tests; desktop: 59 tests | Source/tool checks associated with 5e2487a, not complete gameplay. Separate manifest preflight records 1 passed and 4 skipped tests. Execution checkout HEAD not retained in these logs. |
| diagnostics/joao-slot-smoke-newexe-20261023-200414 | Validators, events, isolated native slots 1/2, Korean selection/dialogue/save/load screenshots, original report | Fresh game, exit/relaunch and UI load at candidate hash. Korean slot names used CDP Input.insertText, not physical IME. Earlier window-run CDP failure retained as tool-attempt history. Harness HEAD unverified. |
| diagnostics/joao-window-native-newexe-20261023-200818 | Validator/helper scripts, events, isolated slot, native 1366x768 and 1280x720 screenshots | Native window/save-control evidence at candidate hash. Harness HEAD unverified. |
| diagnostics/joao-ime-physical-20261023-1792757292327 | Launcher and physical input events, OSK/game screenshot, original report | **INCOMPLETE**: 0 genuine composition events; Enter/Escape during composition not exercised. Harness HEAD unverified. |
| diagnostics/joao-court-retrial-6a747a1-20261023 | All seven court files: baseline red, 61-test desktop log, replay, format/diff logs, preload and review HEAD | Recorded review HEAD 6a747a1946904ec5ae21a5ab2ed5b53a408fa434. Replay uses existing diagnostics, not new gameplay; referenced external replay inputs are outside this selected bundle. |
| evidence/joao-full-20261023-1746-wind | 35,577-record raw events, milestone JSON/images, failure JSON/image | **Previous EXE failure**: hash ed44eb4f2731352a049a35a817378d22a6ecbbd05dd134819e9873c3f822f5ef. Not new candidate completion evidence. Product/harness checkout HEAD unverified. |

The original reports record their authors' observations. References to omitted profiles or external attempts do not mean those directories were published. The IME report's OSK cleanup note is historical; preparation did not recheck or alter processes.

## Provenance and privacy

provenance.json records source path relative to the repository, published path, original/derived SHA-256 and bytes, transformation kind and replacement count.

54 retained files are byte-identical. One report has one private home-path occurrence replaced with %USERPROFILE%. Only matching ASCII bytes changed using lossless Latin1 byte mapping; every other byte and line ending is preserved.

All five discovered profile directories were excluded without traversal. Cookies, caches, DevToolsActivePort, authentication material and existing user saves are excluded. Reparse points are not followed. Retained slot JSONs are isolated validator-created diagnostic slots. Ordinary project paths remain.

Twelve selected images were opened and inspected: game content, native game windows and Windows on-screen keyboard. No visible personal home path or authentication data was observed. Five redundant renderer/state images were omitted. The high-confidence credential/token pattern scan found no matches in retained text; this bounded review does not establish absence of every possible secret format.

prepare-public-evidence.ps1 records the copy/redaction operation. It is retained for audit and refuses to run on an already populated output directory. Original validator scripts may depend on their original workspace; standalone reproduction from this extracted bundle is not claimed.
