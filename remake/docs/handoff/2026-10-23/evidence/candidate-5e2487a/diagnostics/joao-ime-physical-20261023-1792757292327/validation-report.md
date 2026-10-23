# Actual Windows Korean IME validation — independent attempt

- Verdict: **INCOMPLETE**. No genuine OS IME compositionstart/update/end was observed; therefore Enter/Escape during composition was not exercised.
- Candidate EXE SHA-256 before/after: 970b310e077162ab2bfce76372a086baed7951eaf251b20bdabb30c6e99eb6d0. Root PID 58888, exit code 0, signal null; no owned descendants; port 9337 free.
- Fresh profile: C:\All-Work\rea\uw-2\remake\.worktrees\joao-completion\diagnostics\joao-ime-physical-20261023-1792757292327\profile
- Fresh slots: C:\All-Work\rea\uw-2\remake\.worktrees\joao-completion\diagnostics\joao-ime-physical-20261023-1792757292327\slots (no slot save performed).
- Native screen: native-window-ime-attempt.jpg; raw DOM input log: physical-ime-events.json; launcher log: events.jsonl.
- Windows ko input method installed; Microsoft Korean IME guidance: https://learn.microsoft.com/en-us/globalization/input/korean-ime.
- Input: @oai/sky Windows key actions and OSK UI; CDP Runtime.evaluate only installed passive input/composition/keyboard event observers. No CDP Input.insertText or imeSetComposition used.
- 43 input-related captured events; 13 trusted keydowns; 0 composition events. The R key generated trusted beforeinput/input data "r" with isComposing=false, not Hangul.
- Attempts: Alt_R, Alt_L+Shift_L, Control_L+Shift_L, OSK 한/영 and R. Sky rejected Hangul key as unsupported. OSK click produced no game input event. No unsupported inference was made.
- OSK cleanup limitation: this session launched osk.exe PID 64804 at 21:11:34 local. Sky titlebar close and Alt+F4 did not close it; Stop-Process PID 64804 returned access denied. OSK remains; game EXE is cleanly closed. Do not touch unrelated processes.
- No product code/assets/EXE, existing profile, existing slot, or network settings were changed.
