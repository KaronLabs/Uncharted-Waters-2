# Packaged João acceptance

Run from `remake` only after the final package is frozen:

```powershell
node --test tests/desktop/desktopAcceptance.test.cjs
node scripts/verify-joao-desktop.cjs --exe "E:\path\UW2-Joao-Korean.exe" --artifacts "E:\evidence\joao-desktop-unique-run" --port 9337
```

The artifact directory must not exist. The parent directory must exist. No
checkpoint/resume arguments exist. A failed run remains a failed run; start a
new evidence directory for a new fresh-game attempt.

`runtime.cjs` launches the supplied Windows EXE without a source-app argument,
sets a fresh Chromium profile and a fresh Windows slot directory, connects only
to its `app://./index.html` page, and records its SHA-256. Each restart checks
the same executable hash. All game changes use CDP mouse/keyboard input.
The single fixed `Runtime.evaluate` observer reads DOM geometry, visible text,
canvas pixels and `localStorage.getItem('savedState')`; it cannot invoke game
actions, edit saved state, change clocks or construct test fixtures.

`joaoJourney.cjs` implements the concrete opening, Gibraltar report, Ceuta and
Lisbon duels, Basra/Istanbul voyages, Massawa calendar and two sorties, staff
return and crown sale, Nagasaki/Sakai/Cayenne arc, Amazon victory and Lisbon
homecoming. The TypeScript planner is loaded in Node from existing repository
sources, without Cypress. Planner results propose ordinary steering only;
saved observations determine actual movement and arrival.

After the first Calicut arrival, the driver uses the real slot UI, compares the
real `uw2-slot-1.json` file with the UI save, closes the app, waits for process
and debugger exit, relaunches the same EXE, loads the slot through the UI, and
changes the restored character through ordinary back input and UI saving before
loading the native slot. This negative control prevents an automatic localStorage
restore from passing a no-op native-load test. It checks complete state equality
after the native load. It repeats native persistence at homecoming,
then revisits the residence and checks event uniqueness, unchanged fame/gold,
Amazon victory and consumed staff/crown.

Artifacts contain timestamped input/phase/position records in `events.jsonl`,
process logs, exact save observations, native slot copies and PNG screenshots.
`PASS` is emitted only after every required path completes. Exceptions emit
`FAIL`, attempt a final screenshot/state capture, and return process exit 1.

## Validation boundary

The short Node tests validate planner loading, longitude wrap, bounded waits,
negative ending gates and absence of state-injection calls. These are not proof
of desktop completion. Only a full packaged run with terminal `PASS` establishes
the implemented UI route ran successfully. Port pixel timing, dialogue ordering,
and long-voyage docking require that run; do not call this driver live-accepted
based on its unit tests. Korean IME behavior, all-screen overflow and localization
coverage have separate acceptance owners.
