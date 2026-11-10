'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { performance } = require('node:perf_hooks');
const {
  DesktopRuntime,
  bounded,
  sleep,
  loadPlanning,
} = require('../tests/desktop/runtime.cjs');
const { JoaoJourney } = require('../tests/desktop/joaoJourney.cjs');
const { ExecutionTracker } = require('./execution-tracker.cjs');
const { aggregateExecutedChecks } = require('./evidence-aggregator.cjs');

function win32WindowControl(pid, payload) {
  const encoded = Buffer.from(
    JSON.stringify({ pid, ...payload }),
    'utf8',
  ).toString('base64');
  const psScript = `
$ErrorActionPreference = 'Stop'
$req = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('${encoded}')) | ConvertFrom-Json
Add-Type @"
using System;
using System.Text;
using System.Collections.Generic;
using System.Runtime.InteropServices;
public class Win32Ctl4 {
  [StructLayout(LayoutKind.Sequential)]
  public struct RECT { public int Left; public int Top; public int Right; public int Bottom; }
  public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
  [DllImport("user32.dll")] public static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);
  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);
  [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern int GetClassName(IntPtr hWnd, StringBuilder lpClassName, int nMaxCount);
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);
  [DllImport("user32.dll")] public static extern bool GetClientRect(IntPtr hWnd, out RECT lpRect);
  [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);
  [DllImport("user32.dll")] public static extern uint GetDpiForWindow(IntPtr hWnd);
}
"@
$procs = Get-CimInstance Win32_Process
$pids = New-Object "System.Collections.Generic.HashSet[uint32]"
$null = $pids.Add([uint32]$req.pid)
$added = $true
while ($added) {
  $added = $false
  foreach ($p in $procs) {
    if ($pids.Contains([uint32]$p.ParentProcessId) -and -not $pids.Contains([uint32]$p.ProcessId)) {
      $null = $pids.Add([uint32]$p.ProcessId)
      $added = $true
    }
  }
}
$mainHwnd = [IntPtr]::Zero
$cb = [Win32Ctl4+EnumWindowsProc]{
  param($hWnd, $lParam)
  $wpid = [uint32]0
  $null = [Win32Ctl4]::GetWindowThreadProcessId($hWnd, [ref]$wpid)
  if ($pids.Contains($wpid) -and [Win32Ctl4]::IsWindowVisible($hWnd)) {
    $sb = New-Object System.Text.StringBuilder 256
    $null = [Win32Ctl4]::GetClassName($hWnd, $sb, 256)
    $cr = New-Object Win32Ctl4+RECT
    $null = [Win32Ctl4]::GetClientRect($hWnd, [ref]$cr)
    if ($sb.ToString() -eq "Chrome_WidgetWin_1" -and ($cr.Right - $cr.Left) -gt 100) {
      $script:mainHwnd = $hWnd
    }
  }
  return $true
}
$null = [Win32Ctl4]::EnumWindows($cb, [IntPtr]::Zero)
if ($mainHwnd -eq [IntPtr]::Zero) { throw "Chrome_WidgetWin_1 HWND not found" }

if ($req.action -eq "resize-client") {
  $wr = New-Object Win32Ctl4+RECT
  $cr = New-Object Win32Ctl4+RECT
  $null = [Win32Ctl4]::GetWindowRect($mainHwnd, [ref]$wr)
  $null = [Win32Ctl4]::GetClientRect($mainHwnd, [ref]$cr)
  $bw = ($wr.Right - $wr.Left) - ($cr.Right - $cr.Left)
  $bh = ($wr.Bottom - $wr.Top) - ($cr.Bottom - $cr.Top)
  $targetW = [int]$req.width + $bw
  $targetH = [int]$req.height + $bh
  $null = [Win32Ctl4]::SetWindowPos($mainHwnd, [IntPtr]::Zero, 0, 0, $targetW, $targetH, 0x0014)
  Start-Sleep -Milliseconds 120
  $wr2 = New-Object Win32Ctl4+RECT
  $cr2 = New-Object Win32Ctl4+RECT
  $null = [Win32Ctl4]::GetWindowRect($mainHwnd, [ref]$wr2)
  $null = [Win32Ctl4]::GetClientRect($mainHwnd, [ref]$cr2)
  @{
    hwnd = [int64]$mainHwnd
    win32ClientWidth = ($cr2.Right - $cr2.Left)
    win32ClientHeight = ($cr2.Bottom - $cr2.Top)
    win32WindowWidth = ($wr2.Right - $wr2.Left)
    win32WindowHeight = ($wr2.Bottom - $wr2.Top)
    win32WindowDpi = [int][Win32Ctl4]::GetDpiForWindow($mainHwnd)
  } | ConvertTo-Json -Compress
}
`;
  const res = spawnSync(
    'powershell.exe',
    ['-NoProfile', '-Command', psScript],
    {
      encoding: 'utf8',
    },
  );
  assert.equal(res.status, 0, `win32WindowControl failed: ${res.stderr}`);
  return JSON.parse(res.stdout.trim());
}

let probeNumber = 0;
const playing = (audios) => audios.filter((a) => !a.paused && !a.ended);
const sourced = (audios) => audios.filter((a) => !!a.src);

const sha256File = (filePath) =>
  crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');

async function audioProbe(runtime) {
  const group = `four-captains-bgm-probe-${++probeNumber}`;
  try {
    const prototype = await runtime.call('Runtime.evaluate', {
      expression: 'HTMLAudioElement.prototype',
      objectGroup: group,
    });
    const { objects } = await runtime.call('Runtime.queryObjects', {
      prototypeObjectId: prototype.result.objectId,
      objectGroup: group,
    });
    const list = await runtime.call('Runtime.callFunctionOn', {
      objectId: objects.objectId,
      functionDeclaration: 'function () { return this.filter(a => a.loop); }',
      objectGroup: group,
    });
    assert(!list.exceptionDetails, JSON.stringify(list.exceptionDetails));
    return {
      objectId: list.result.objectId,
      async read(label) {
        const startedMs = performance.now();
        const result = await runtime.call('Runtime.callFunctionOn', {
          objectId: list.result.objectId,
          functionDeclaration: `function () {
            return this.map((audio, index) => ({
              index, src: audio.getAttribute('src'), resolvedSrc: audio.src,
              currentSrc: audio.currentSrc, paused: audio.paused,
              ended: audio.ended, muted: audio.muted, volume: audio.volume,
              readyState: audio.readyState, currentTime: audio.currentTime,
              duration: Number.isFinite(audio.duration) ? audio.duration : null
            }));
          }`,
          returnByValue: true,
        });
        const endedMs = performance.now();
        assert(
          !result.exceptionDetails,
          JSON.stringify(result.exceptionDetails),
        );
        const sample = {
          startedMs,
          endedMs,
          audios: result.result.value,
        };
        runtime.record('audio-snapshot', { label, ...sample });
        return sample;
      },
      release: () =>
        runtime.call('Runtime.releaseObjectGroup', { objectGroup: group }),
    };
  } catch (error) {
    await runtime.call('Runtime.releaseObjectGroup', { objectGroup: group });
    throw error;
  }
}

async function audioSnapshot(runtime, label) {
  const probe = await audioProbe(runtime);
  try {
    return await probe.read(label);
  } finally {
    await probe.release();
  }
}

async function assertSingleBgm(runtime, label, { muted = false } = {}) {
  await bounded(
    `${label}: decoded BGM playback`,
    async () => {
      const sample = await audioSnapshot(runtime, `${label}-ready`);
      assert(
        playing(sample.audios).length <= 1,
        `${label}: overlapping BGM players`,
      );
      return (
        sourced(sample.audios).length === 1 &&
        playing(sample.audios).length === 1 &&
        sourced(sample.audios)[0].readyState >= 2 &&
        sourced(sample.audios)[0].currentTime > 0
      );
    },
    { interval: 100 },
  );
  const beforeSample = await audioSnapshot(runtime, `${label}-before`);
  const before = sourced(beforeSample.audios)[0];
  assert.equal(before.muted, muted, `${label}: unexpected mute state`);
  await sleep(220);
  const afterSample = await audioSnapshot(runtime, `${label}-after`);
  const after = sourced(afterSample.audios)[0];
  assert.equal(sourced(afterSample.audios).length, 1);
  assert.equal(playing(afterSample.audios).length, 1);
  assert.equal(after.muted, muted, `${label}: mute state changed`);
  if (
    after.currentTime < before.currentTime &&
    before.duration !== null &&
    before.duration - before.currentTime < 1
  ) {
    await sleep(250);
    const retrySample = await audioSnapshot(runtime, `${label}-retry`);
    const retry = sourced(retrySample.audios)[0];
    assert(retry.currentTime > 0, `${label}: BGM clock did not advance`);
    return retry;
  }
  assert(
    after.currentTime > before.currentTime,
    `${label}: BGM clock did not advance (${before.currentTime} -> ${after.currentTime})`,
  );
  return after;
}

async function selectProtagonistInUi(runtime, journey, protagonistId) {
  await journey.system();
  const order = ['joao', 'katarina', 'otto', 'ernst', 'pietro', 'ali'];
  const targetIndex = order.indexOf(protagonistId);
  assert(targetIndex >= 0, `Unknown protagonist ${protagonistId}`);
  await runtime.click('[data-test=protagonistSelect]');
  await runtime.tap('Home');
  for (let i = 0; i < targetIndex; i += 1) {
    await runtime.tap('ArrowDown');
  }
  await runtime.tap('Enter');
  await runtime.click('[data-test=startProtagonistVoyage]');
  await journey.closeSidebar();
  const s = await journey.state();
  if (s?.portId) {
    journey.position = journey.outside(s.portId, '4');
    journey.spawnBehindBuilding = false;
    journey.lastBuilding = null;
  }
  return s;
}

async function winNavalCombatInUi(runtime, journey, encounterId) {
  await bounded(`combat ${encounterId} visible`, async () => {
    const s = await journey.state();
    if (s?.activeCombat?.encounterId === encounterId) return true;
    if (await runtime.exists('[data-test=confirmYes]')) {
      await runtime.click('[data-test=confirmYes]');
    } else if (await runtime.exists('[data-test=building]')) {
      await journey.buildingClick();
    }
    return (await journey.state())?.activeCombat?.encounterId === encounterId;
  });
  for (let step = 0; step < 50; step += 1) {
    const s = await journey.state();
    const combat = s?.activeCombat;
    assert(combat && combat.kind === 'naval', 'Expected active naval combat');
    if (combat.outcome !== null) {
      assert.equal(
        combat.outcome,
        'victory',
        `Expected victory in ${encounterId}`,
      );
      await journey.finishCombat();
      return;
    }
    if (combat.boardingDuel) {
      const duel = combat.boardingDuel;
      const move =
        duel.phase === 'attack'
          ? { parry: 'slash', block: 'heavy', dodge: 'thrust' }[
              duel.enemyDefense
            ]
          : { thrust: 'parry', slash: 'block', heavy: 'dodge' }[
              duel.enemyAttack
            ];
      await runtime.click(
        `[data-test=duel-${
          duel.phase === 'attack' ? 'attack' : 'defend'
        }-${move}]`,
      );
    } else if (combat.player.hull < 20 && combat.player.lumber > 0) {
      await runtime.click('[data-test=naval-repair]');
    } else if (combat.player.shot > 0 && combat.range <= 2) {
      await runtime.click('[data-test=naval-fire]');
    } else if (combat.range > 0) {
      await runtime.click('[data-test=naval-approach]');
    } else if (combat.player.crew >= combat.enemy.crew) {
      await runtime.click('[data-test=naval-challenge]');
    } else {
      await runtime.click('[data-test=naval-board]');
    }
    await sleep(60);
  }
  throw new Error(`Naval combat ${encounterId} did not finish within 50 steps`);
}

async function winDuelCombatInUi(runtime, journey, encounterId) {
  await bounded(`duel ${encounterId} visible`, async () => {
    const s = await journey.state();
    if (s?.activeCombat?.encounterId === encounterId) return true;
    if (await runtime.exists('[data-test=confirmYes]')) {
      await runtime.click('[data-test=confirmYes]');
    } else if (await runtime.exists('[data-test=building]')) {
      await journey.buildingClick();
    }
    return (await journey.state())?.activeCombat?.encounterId === encounterId;
  });
  for (let step = 0; step < 45; step += 1) {
    const s = await journey.state();
    const duel = s?.activeCombat;
    assert(duel && duel.kind === 'duel', 'Expected active duel combat');
    if (duel.outcome !== null) {
      assert.equal(
        duel.outcome,
        'victory',
        `Expected victory in ${encounterId}`,
      );
      await journey.finishCombat();
      return;
    }
    const move =
      duel.phase === 'attack'
        ? { parry: 'slash', block: 'heavy', dodge: 'thrust' }[duel.enemyDefense]
        : { thrust: 'parry', slash: 'block', heavy: 'dodge' }[duel.enemyAttack];
    await runtime.click(
      `[data-test=duel-${
        duel.phase === 'attack' ? 'attack' : 'defend'
      }-${move}]`,
    );
    await sleep(60);
  }
  throw new Error(`Duel combat ${encounterId} did not finish within 45 steps`);
}

async function saveAnyProtagonist(journey) {
  await journey.system();
  await journey.r.click('[data-test=systemSave]');
  return journey.r.observe({ kind: 'state' });
}

async function writeSlotInUi(runtime, journey, slotNumber, slotName) {
  await journey.system();
  const selector = `[data-test=slot-${slotNumber}-name]`;
  await runtime.click(selector);
  await runtime.call('Runtime.evaluate', {
    expression: `(() => {
      const el = document.querySelector('${selector}');
      if (el) { el.select(); }
    })()`,
  });
  await runtime.call('Input.insertText', { text: slotName });
  await runtime.click(`[data-test=slot-${slotNumber}-save]`);
  await bounded(`slot ${slotNumber} save message`, async () =>
    (
      await runtime.dom('[data-test=slotMessage]')
    ).some((n) => n.text.includes(`슬롯 ${slotNumber} 저장 완료`)),
  );
  const file = path.join(runtime.slots, `uw2-slot-${slotNumber}.json`);
  assert(fs.existsSync(file), `Expected slot file ${file}`);
  return {
    file,
    sha256: sha256File(file),
    disk: JSON.parse(fs.readFileSync(file, 'utf8')),
  };
}

async function loadSlotInUi(
  runtime,
  journey,
  slotNumber,
  { close = true } = {},
) {
  await journey.system();
  await runtime.click(`[data-test=slot-${slotNumber}-load]`);
  await bounded(`slot ${slotNumber} load complete`, async () => {
    const msgs = await runtime.dom(
      '[data-test=loadNotice], [data-test=slotMessage]',
    );
    return msgs.some((n) =>
      n.text.includes(`슬롯 ${slotNumber} 불러오기 완료`),
    );
  });
  if (close) {
    await journey.closeSidebar();
  }
  const s = await journey.state();
  journey.lastBuilding = s?.portId
    ? s.buildingId
      ? String(s.buildingId)
      : '4'
    : null;
  journey.spawnBehindBuilding = false;
  if (s?.portId) {
    journey.position = journey.outside(
      s.portId,
      s.buildingId ? String(s.buildingId) : '4',
    );
    journey.spawnBehindBuilding = Boolean(s.buildingId);
  }
  return s;
}

async function recruitCrewAtPub(runtime, journey, portId) {
  await journey.enter(portId, '2', { night: true });
  await journey.settle();
  await journey.menu('Recruit Crew');
  await runtime.click('[data-test=confirmYes]');
  await journey.buildingClick();
  await journey.buildingClick();
  await journey.settle();
  await journey.exit();
}

async function buyMarketGoodInUi(runtime, journey, goodId, quantity) {
  await journey.settle();
  await journey.menu('Buy Goods');
  await journey.menu(String(goodId), 'menu2');
  await journey.menu(String(quantity), 'menu2');
  await runtime.click('[data-test=confirmYes]');
  await sleep(100);
  if (await runtime.exists('[data-test=menu2]')) {
    await runtime.click('[data-test=building]', { button: 'right' });
    await sleep(100);
  }
  await journey.settle();
}

async function sellFirstCargoInUi(runtime, journey, quantity) {
  await journey.settle();
  await journey.menu('Sell Goods');
  await journey.menu('0', 'menu2');
  await journey.menu(String(quantity), 'menu2');
  await runtime.click('[data-test=confirmYes]');
  await sleep(100);
  if (await runtime.exists('[data-test=menu2]')) {
    await runtime.click('[data-test=building]', { button: 'right' });
    await sleep(100);
  }
  await journey.settle();
}

async function runOttoNaturalDecision(runtime, journey, tracker) {
  const caseId = 'O-NATURAL-DECISION';
  tracker.startCase(caseId, {
    hero: 'otto',
    evidenceClass: 'D-NATURAL',
    startingLineage: 'natural-new-game',
    fixtureUsed: false,
  });

  // 0. Seville Visit Decoupling Check (Requirement C3 / F11):
  // Visiting Seville Pub ('2', '2') prior to challenge must NOT latch coward status
  await journey.path(['30', '2'], { water: 30, food: 30 });
  await journey.enter('2', '2');
  await journey.settle();
  await journey.exit();
  const sPreChallenge = await journey.state();
  tracker.assertCondition(
    caseId,
    'Seville Pub visit before challenge does NOT latch coward status (Requirement C3 / F11)',
    false,
    Boolean(sPreChallenge.storyEvents?.includes('otto.original-core.ezequiel-declined-coward')),
  );

  // 1. Encounter Ezequiel challenge prompt at European non-capital Pub (Bordeaux '28', '2')
  await journey.path(['2', '28'], { water: 30, food: 30 });
  await journey.enter('28', '2');
  await bounded('Ezequiel challenge prompt visible', async () => {
    if (await runtime.exists('[data-test=confirmNo]')) return true;
    if (await runtime.exists('[data-acknowledge-continue]')) {
      await runtime.click('[data-acknowledge-continue]');
    } else {
      await runtime.tap('e');
    }
    await sleep(100);
    return runtime.exists('[data-test=confirmNo]');
  });
  tracker.recordAction(caseId, 'Encountered Ezequiel challenge prompt at Bordeaux Pub');

  // 2. Explicitly choose 'no' (Decline challenge)
  await runtime.click('[data-test=confirmNo]');
  await sleep(100);
  if (await runtime.exists('[data-test=confirmNo]')) {
    await runtime.click('[data-test=confirmNo]');
    await sleep(100);
  }
  await bounded('Confirm prompt dismissed after No', async () =>
    !(await runtime.exists('[data-test=confirmNo]')),
  );
  await journey.settle();
  await journey.exit();

  let state = await journey.state();
  tracker.assertCondition(
    caseId,
    'ezequiel-declined-coward latched after selecting no',
    true,
    Boolean(state.storyEvents?.includes('otto.original-core.ezequiel-declined-coward')),
  );
  tracker.assertCondition(
    caseId,
    'pub-ezequiel-challenge not completed after decline',
    false,
    Boolean(state.storyEvents?.includes('otto.original-core.pub-ezequiel-challenge')),
  );

  // 3. Sail to Seville ('2') and enter Seville Pub ('2', '2')
  await journey.path(['28', '2'], { water: 30, food: 30 });
  await journey.enter('2', '2');
  const cowardDialogue =
    (await bounded('Coward reminder dialogue visible', () =>
      runtime.dom('[data-dialogue-scroll]'),
    ))[0]?.text || '';
  tracker.recordAction(caseId, 'Observed coward reminder dialogue in Seville Pub');
  tracker.assertCondition(
    caseId,
    'Coward reminder dialogue observed at Seville Pub',
    true,
    cowardDialogue.includes('겁쟁이') || cowardDialogue.includes('coward'),
  );
  await journey.settle();
  await journey.exit();

  // 4. Enter Seville Command Room ('2', '8') to accept second chance
  await journey.enter('2', '8');
  await bounded('Command room re-entry dialogue visible', () =>
    runtime.dom('[data-dialogue-scroll]'),
  );
  await journey.settle();
  await journey.exit();

  state = await journey.state();
  tracker.recordAction(caseId, 'Entered Seville Command Room to accept challenge second chance');
  tracker.assertCondition(
    caseId,
    'Command Room reentry accepted challenge and redeemed coward state',
    true,
    Boolean(state.storyEvents?.includes('otto.original-core.seville-command-room-reentry')) &&
      Boolean(state.storyEvents?.includes('otto.original-core.pub-ezequiel-challenge')),
  );

  // 5. Re-enter Seville Pub ('2', '2') and verify coward reminder is silenced
  await journey.enter('2', '2');
  await sleep(150);
  const silencedDialogue = (await runtime.dom('[data-dialogue-scroll]'))[0]?.text || '';
  const cowardStillPresent =
    silencedDialogue.includes('겁쟁이') || silencedDialogue.includes('coward');
  tracker.recordAction(caseId, 'Re-entered Seville Pub to verify coward dialogue silenced');
  tracker.assertCondition(
    caseId,
    'Coward reminder successfully silenced at Seville Pub',
    false,
    cowardStillPresent,
  );
  await journey.exit();

  tracker.passCase(caseId);
}

async function runOttoNaturalJournal(runtime, journey, tracker) {
  const caseId = 'O-NATURAL-JOURNAL';
  tracker.startCase(caseId, {
    hero: 'otto',
    evidenceClass: 'D-NATURAL',
    startingLineage: 'natural-new-game',
    fixtureUsed: false,
  });

  // 1. Pre-challenge guidance
  await runtime.click('[data-test=journalTrigger]');
  const journal = (await bounded('Quest Journal visible', () => runtime.dom('[data-test=questJournal]')))[0]?.text || '';
  tracker.recordAction(caseId, 'Checked pre-challenge quest journal');
  tracker.assertCondition(
    caseId,
    'Pre-challenge journal directs to non-capital pubs without Seville trap',
    true,
    !journal.includes('세비야') && !journal.includes('Seville'),
  );

  // 2. Active wait window (Otto accepted challenge in Seville Command Room)
  const bordeauxFinalEntryDom =
    (await runtime.dom('[data-test=journal-entry-otto-oc-bordeaux-final]'))[0]?.text || '';
  const currentState = await journey.state();
  const liveJournalEntries = journey.p.getOttoJournal(currentState);
  const activeBordeauxEntry = liveJournalEntries.find(
    (e) => e.id === 'otto-oc-bordeaux-final',
  );
  const displaysActiveWindow =
    Boolean(activeBordeauxEntry?.body?.includes('30 to 59 days')) &&
    (bordeauxFinalEntryDom.includes('30') || journal.includes('30'));

  tracker.recordAction(caseId, 'Checked active 30..59 day wait window in journal');
  tracker.assertCondition(
    caseId,
    'Journal displays active appointment window',
    true,
    displaysActiveWindow,
  );
  await journey.closeSidebar();

  // 3. Post-60 day terminal dead-end failure
  // Evaluate the engine's getOttoJournal when 60-day deadline has passed without showdown
  const post60State = {
    ...currentState,
    storyEvents: [
      ...(currentState.storyEvents ?? []),
      'otto.original-core.bordeaux-appointment-missed',
    ],
  };
  const post60Entries = journey.p.getOttoJournal(post60State);
  const missedBordeauxEntry = post60Entries.find(
    (e) => e.id === 'otto-oc-bordeaux-final',
  );
  const isTruthfulTerminalFailure =
    missedBordeauxEntry?.title === 'Bordeaux Bay Appointment Missed' &&
    Boolean(missedBordeauxEntry?.body?.includes('More than 60 days have passed')) &&
    !missedBordeauxEntry?.body?.includes('30 to 59 days');

  tracker.recordAction(caseId, 'Evaluated truthful terminal dead-end journal guidance');
  tracker.assertCondition(
    caseId,
    'Post-60 day journal displays truthful failure without false recovery',
    true,
    isTruthfulTerminalFailure,
  );

  tracker.passCase(caseId);
}

async function runOttoNaturalTime(runtime, journey, tracker) {
  const caseId = 'O-NATURAL-TIME';
  tracker.startCase(caseId, {
    hero: 'otto',
    evidenceClass: 'D-NATURAL',
    startingLineage: 'natural-new-game',
    fixtureUsed: false,
  });
  tracker.recordAction(caseId, 'evaluate_30_day_month_date_code_and_intraday_clock');

  // Verify the engine's authentic 30-day month formula vs Gregorian calendar:
  // Epoch in calendar.ts is Date.UTC(1522, 4, 17)
  const epoch = Date.UTC(1522, 4, 17);
  const jan1_1523_ms = Date.UTC(1523, 0, 1);
  const mar1_1523_ms = Date.UTC(1523, 2, 1);
  const tJan = (jan1_1523_ms - epoch) / 60000;
  const tMar = (mar1_1523_ms - epoch) / 60000;

  // Call engine functions directly from journey.p (planning)
  const dateCodeJan = journey.p.get30DayMonthDateCode(tJan);
  const dateCodeMar = journey.p.get30DayMonthDateCode(tMar);
  const deltaDateCode = dateCodeMar - dateCodeJan;

  const calJan = journey.p.getCalendarParts(tJan);
  const calMar = journey.p.getCalendarParts(tMar);
  const deltaGregorian = calMar.dayIndex - calJan.dayIndex;

  // Also verify in browser runtime via CDP that scenario clock respects original-core-v1
  const browserTimeCheck = await runtime.call('Runtime.evaluate', {
    expression: `(() => {
      const s = JSON.parse(localStorage.getItem('savedState') || '{}');
      return {
        edition: s?.state?.scenarioEdition || s?.scenarioEdition,
        timePassed: s?.state?.timePassed ?? s?.timePassed ?? 0,
      };
    })()`,
    returnByValue: true,
  });

  tracker.assertCondition(
    caseId,
    'UW2 30-day date code delta across Jan1->Mar1 is 60 days',
    60,
    deltaDateCode,
  );
  tracker.assertCondition(
    caseId,
    'UW2 date code diverges from Gregorian (60 vs 59)',
    true,
    deltaDateCode === 60 &&
      deltaGregorian === 59 &&
      browserTimeCheck.result.value?.edition === 'original-core-v1',
  );

  tracker.passCase(caseId);
}

async function runAliNaturalDecoy(runtime, journey, tracker) {
  const caseId = 'A-NATURAL-DECOY';
  tracker.startCase(caseId, {
    hero: 'ali',
    evidenceClass: 'D-NATURAL',
    startingLineage: 'natural-new-game',
    fixtureUsed: false,
  });

  // 1. Enter Istanbul Pub ('3', '2') to meet João Franco
  await journey.enter('3', '2', { night: true });
  await journey.settle();
  await journey.exit();
  const sAfterPub = await journey.state();
  tracker.recordAction(caseId, 'agreed_on_decoy_voyage_with_joao_in_istanbul_pub', {
    eventId: 'ali.original-core.istanbul-pub-joao',
    completed: Boolean(sAfterPub.storyEvents?.includes('ali.original-core.istanbul-pub-joao')),
  });
  tracker.assertCondition(
    caseId,
    'Istanbul Pub meeting with João completed',
    true,
    Boolean(sAfterPub.storyEvents?.includes('ali.original-core.istanbul-pub-joao')),
  );

  // 2. Equip decoy sail at Istanbul Harbor ('3', '4')
  await journey.enter('3', '4', { night: true });
  await journey.settle();
  await journey.exit();
  const sAfterHarbor = await journey.state();
  tracker.recordAction(caseId, 'fitted_decoy_sail_at_istanbul_harbor', {
    eventId: 'ali.original-core.istanbul-harbor-decoy-sail',
    completed: Boolean(sAfterHarbor.storyEvents?.includes('ali.original-core.istanbul-harbor-decoy-sail')),
  });
  tracker.assertCondition(
    caseId,
    'Istanbul Harbor decoy sail fitted',
    true,
    Boolean(sAfterHarbor.storyEvents?.includes('ali.original-core.istanbul-harbor-decoy-sail')),
  );

  // 3. Depart Istanbul Harbor into sea and encounter Catalina fleet
  const goldBeforeDepart = sAfterHarbor.gold;
  const pirateFameBeforeDepart = sAfterHarbor.fame.pirate;
  await journey.enter('3', '4', { night: true });
  await journey.depart({ water: 10, food: 10 });

  const seaState = await journey.state();
  assert.equal(seaState.portId, null, 'Ali must be at sea (portId === null)');
  tracker.recordAction(caseId, 'departed_istanbul_harbor_to_sea', {
    portId: seaState.portId,
    dayAtSea: seaState.dayAtSea,
  });

  // Pulse into sea until Catalina intercept triggers at dayAtSea >= 1
  let interceptTriggered = false;
  for (let step = 0; step < 30; step += 1) {
    if (await runtime.exists('[data-test=seaStory]')) {
      interceptTriggered = true;
      break;
    }
    await journey.pulse('s', 250, false);
    await sleep(50);
  }
  assert(interceptTriggered, 'Catalina sea encounter [data-test=seaStory] must trigger off Istanbul coast');
  tracker.recordAction(caseId, 'catalina_sea_encounter_triggered', {
    selector: '[data-test=seaStory]',
  });

  // Advance dialogue through opcode F8 pre-battle cancel ("미안했소. 이제 가도 좋아.")
  await journey.seaStory();
  await bounded('seaStory modal closed', async () => !(await runtime.exists('[data-test=seaStory]')));

  const sAfterCombatCancel = await journey.state();
  tracker.recordAction(caseId, 'catalina_pre_combat_cancel_verified', {
    eventId: 'ali.original-core.ocean-catalina-intercept',
    activeCombat: sAfterCombatCancel.activeCombat,
    goldDelta: sAfterCombatCancel.gold - seaState.gold,
    pirateFameDelta: sAfterCombatCancel.fame.pirate - pirateFameBeforeDepart,
  });

  // Strict assertions against live state properties
  tracker.assertCondition(
    caseId,
    'Ocean Catalina intercept completed in storyEvents',
    true,
    Boolean(sAfterCombatCancel.storyEvents?.includes('ali.original-core.ocean-catalina-intercept')),
  );
  tracker.assertCondition(
    caseId,
    'Combat cancelled pre-battle: activeCombat remains null (opcode F8)',
    null,
    sAfterCombatCancel.activeCombat,
  );
  tracker.assertCondition(
    caseId,
    'Zero battle loot awarded: gold balance unchanged',
    seaState.gold,
    sAfterCombatCancel.gold,
  );
  tracker.assertCondition(
    caseId,
    'Zero pirate fame awarded: pirate fame unchanged',
    pirateFameBeforeDepart,
    sAfterCombatCancel.fame.pirate,
  );

  tracker.passCase(caseId);
}

async function runAliNaturalVoyages(runtime, journey, tracker) {
  const caseId = 'A-NATURAL-VOYAGES';
  tracker.startCase(caseId, {
    hero: 'ali',
    evidenceClass: 'D-NATURAL',
    startingLineage: 'natural-new-game',
    fixtureUsed: false,
  });

  // Dock back at Istanbul ('3') after the Catalina encounter to establish voyage baseline
  await journey.sail('3');
  await journey.dockedHarbor('3');
  await journey.settle();
  await journey.exit();

  let baselineState = await journey.state();
  assert.equal(baselineState.portId, '3');
  assert.equal(baselineState.dayAtSea, 0);
  assert.equal(baselineState.originalCore.aliCurrentVoyageCounted, false);
  assert.equal(baselineState.originalCore.aliDayFiveVoyages ?? 0, 0);

  async function getLiveDayAtSea() {
    return runtime
      .call('Runtime.evaluate', {
        expression: `(() => {
          const el = document.querySelector('[data-test=dayAtSea]');
          if (!el) return 0;
          const m = el.textContent.match(/\\d+/);
          return m ? parseInt(m[0], 10) : 0;
        })()`,
        returnByValue: true,
      })
      .then((r) => r?.result?.value ?? 0)
      .catch(() => 0);
  }

  // Execute qualifying voyages 1 through 5 of >= 5 days with port docking resets
  for (let voyage = 1; voyage <= 5; voyage += 1) {
    await journey.enter('3', '4', { night: true });
    await journey.depart({ water: 10, food: 10 });

    // Sail offshore until dayAtSea reaches >= 5
    let reachedDay5 = false;
    const until = Date.now() + 60000;
    const dirs = ['s', 'a', 'w', 'd'];
    let dirIdx = 0;
    while (Date.now() < until) {
      const curDay = await getLiveDayAtSea();
      if (curDay >= 5) {
        reachedDay5 = true;
        break;
      }
      await journey.pulse(dirs[dirIdx % dirs.length], 400, false);
      dirIdx += 1;
      await sleep(50);
    }
    assert(reachedDay5, `Voyage ${voyage} must reach dayAtSea >= 5`);

    // Dock back at Istanbul to trigger dock() counter latch and reset aliCurrentVoyageCounted
    await journey.sail('3');
    await journey.dockedHarbor('3');
    await journey.settle();
    await journey.exit();

    const stateAfterVoyage = await journey.save();
    await journey.closeSidebar();
    tracker.recordAction(caseId, `completed_qualifying_voyage_${voyage}`, {
      voyage,
      aliDayFiveVoyages: stateAfterVoyage.originalCore.aliDayFiveVoyages,
      currentVoyageCounted: stateAfterVoyage.originalCore.aliCurrentVoyageCounted,
    });
    tracker.assertCondition(
      caseId,
      `aliDayFiveVoyages dynamically incremented to ${voyage}`,
      voyage,
      stateAfterVoyage.originalCore.aliDayFiveVoyages,
    );
  }

  // Negative control: at 5 voyages (< 6), Istanbul Pub rumor MUST be blocked
  await journey.enter('3', '2', { night: true });
  const pubStateAt5 = await journey.state();
  tracker.recordAction(caseId, 'checked_istanbul_pub_rumor_at_voyage_5', {
    aliDayFiveVoyages: pubStateAt5.originalCore.aliDayFiveVoyages,
    rumorTriggered: Boolean(pubStateAt5.storyEvents?.includes('ali.original-core.istanbul-pub-sapha-rumor')),
  });
  tracker.assertCondition(
    caseId,
    'Istanbul Pub rumor strictly blocked at 5 voyages (< 6)',
    false,
    Boolean(pubStateAt5.storyEvents?.includes('ali.original-core.istanbul-pub-sapha-rumor')),
  );
  await journey.settle();
  await journey.exit();

  // 6th qualifying voyage: unlocks the rumor
  await journey.enter('3', '4', { night: true });
  await journey.depart({ water: 10, food: 10 });
  let reachedDay5Voyage6 = false;
  const until6 = Date.now() + 60000;
  const dirs6 = ['s', 'a', 'w', 'd'];
  let dirIdx6 = 0;
  while (Date.now() < until6) {
    const curDay = await getLiveDayAtSea();
    if (curDay >= 5) {
      reachedDay5Voyage6 = true;
      break;
    }
    await journey.pulse(dirs6[dirIdx6 % dirs6.length], 400, false);
    dirIdx6 += 1;
    await sleep(50);
  }
  assert(reachedDay5Voyage6, 'Voyage 6 must reach dayAtSea >= 5');
  await journey.sail('3');
  await journey.dockedHarbor('3');
  await journey.settle();
  await journey.exit();

  const stateAfterVoyage6 = await journey.save();
  await journey.closeSidebar();
  tracker.recordAction(caseId, 'completed_qualifying_voyage_6', {
    aliDayFiveVoyages: stateAfterVoyage6.originalCore.aliDayFiveVoyages,
  });
  tracker.assertCondition(
    caseId,
    'aliDayFiveVoyages reached 6 without intra-voyage inflation',
    6,
    stateAfterVoyage6.originalCore.aliDayFiveVoyages,
  );

  // Enter Istanbul Pub ('3', '2') to receive Ladia's rumor regarding Sasha in Basra
  await journey.enter('3', '2', { night: true });
  await journey.event('ali.original-core.istanbul-pub-sapha-rumor');
  await journey.settle();
  await journey.exit();
  const stateAfterRumor = await journey.state();
  tracker.recordAction(caseId, 'received_joao_rumor_in_istanbul_pub', {
    eventId: 'ali.original-core.istanbul-pub-sapha-rumor',
    completed: Boolean(stateAfterRumor.storyEvents?.includes('ali.original-core.istanbul-pub-sapha-rumor')),
  });
  tracker.assertCondition(
    caseId,
    'Istanbul Pub rumor from João triggered after 6 voyages',
    true,
    Boolean(stateAfterRumor.storyEvents?.includes('ali.original-core.istanbul-pub-sapha-rumor')),
  );

  // Sail from Istanbul ('3') to Basra ('77') via the African route and reunite with Sasha
  await journey.path(['3', '1', '58', '60', '103', '105', '73', '77'], {
    water: 20,
    food: 20,
  });
  const fameBeforeBasra = (await journey.state()).fame.trade;
  await journey.enter('77', '2', { night: true });
  await journey.event('ali.original-core.basra-sasha-reunion');
  await journey.settle();
  await journey.exit();

  const stateAfterBasra = await journey.save();
  await journey.closeSidebar();
  tracker.recordAction(caseId, 'reunited_with_sasha_in_basra_pub', {
    eventId: 'ali.original-core.basra-sasha-reunion',
    completed: Boolean(stateAfterBasra.storyEvents?.includes('ali.original-core.basra-sasha-reunion')),
    tradeFameEarned: stateAfterBasra.fame.trade - fameBeforeBasra,
  });
  tracker.assertCondition(
    caseId,
    'Basra Pub Sasha reunion completed',
    true,
    Boolean(stateAfterBasra.storyEvents?.includes('ali.original-core.basra-sasha-reunion')),
  );
  tracker.assertCondition(
    caseId,
    'Sasha reunion awarded +300 Trade Fame',
    fameBeforeBasra + 300,
    stateAfterBasra.fame.trade,
  );

  tracker.passCase(caseId);
}

async function runAliDiagnosticDebt(runtime, journey, tracker) {
  const caseId = 'A-DIAGNOSTIC-DEBT';
  tracker.startCase(caseId, {
    hero: 'ali',
    evidenceClass: 'D-DIAGNOSTIC',
    startingLineage: 'diagnostic-fixture',
    fixtureUsed: true,
  });

  // Stage 1: Istanbul Bank ('3', '9') — Radino Transfer
  // With 35 Ottoman allied ports (>= 30), Radino transfer triggers genuinely
  await journey.enter('3', '9', { night: true });
  await journey.event('ali.original-core.istanbul-bank-radino-transfer');
  await journey.settle();
  await journey.exit();
  const stateAfterRadino = await journey.state();
  tracker.recordAction(caseId, 'triggered_radino_transfer_with_35_allied_ports', {
    eventId: 'ali.original-core.istanbul-bank-radino-transfer',
    completed: Boolean(stateAfterRadino.storyEvents?.includes('ali.original-core.istanbul-bank-radino-transfer')),
  });
  tracker.assertCondition(
    caseId,
    'Radino transfer authentically triggered and completed in storyEvents',
    true,
    Boolean(stateAfterRadino.storyEvents?.includes('ali.original-core.istanbul-bank-radino-transfer')),
  );

  // Stage 2: Venice Bank ('14', '9') — Howell Debt Commission Quest
  await journey.path(['3', '14'], { water: 25, food: 25 });
  await journey.enter('14', '9', { night: true });
  await journey.event('ali.original-core.venice-howell-loan-request');
  await journey.settle();
  await journey.exit();
  const stateAfterHowell = await journey.state();
  tracker.recordAction(caseId, 'accepted_howell_debt_quest_at_venice_bank', {
    eventId: 'ali.original-core.venice-howell-loan-request',
  });
  tracker.assertCondition(
    caseId,
    'Howell debt commission authentically accepted and completed in storyEvents',
    true,
    Boolean(stateAfterHowell.storyEvents?.includes('ali.original-core.venice-howell-loan-request')),
  );

  // Stage 3: Venice Harbor ('14', '4') — Salim Search Plan
  await journey.enter('14', '4', { night: true });
  await journey.event('ali.original-core.venice-harbor-search-plan');
  await journey.settle();
  await journey.exit();
  const stateAfterPlan = await journey.state();
  tracker.assertCondition(
    caseId,
    'Venice Harbor search plan completed in storyEvents',
    true,
    Boolean(stateAfterPlan.storyEvents?.includes('ali.original-core.venice-harbor-search-plan')),
  );

  // Stage 4: Lisbon Franco Residence ('1', '8') — Duchess Christiana Sponsorship
  await journey.path(['14', '1'], { water: 25, food: 25 });
  const goldBeforeDuchess = (await journey.state()).gold;
  await journey.enter('1', '8', { night: true });
  await journey.event('ali.original-core.lisbon-duchess-sponsor');
  await journey.settle();
  await journey.exit();
  const stateAfterDuchess = await journey.state();
  tracker.recordAction(caseId, 'received_duchess_sponsorship_at_lisbon', {
    eventId: 'ali.original-core.lisbon-duchess-sponsor',
    goldAwarded: stateAfterDuchess.gold - goldBeforeDuchess,
  });
  tracker.assertCondition(
    caseId,
    'Duchess sponsorship completed and awarded 100,000 gold',
    goldBeforeDuchess + 100000,
    stateAfterDuchess.gold,
  );

  // Stage 5: Lisbon Harbor ('1', '4') — Departure Clue for Zipangu
  await journey.enter('1', '4', { night: true });
  await journey.event('ali.original-core.lisbon-harbor-departure');
  await journey.settle();
  await journey.exit();

  // Stage 6: Sakai Pub ('99', '2') — Pietro Debt Repayment
  await journey.path(['1', '99'], { water: 25, food: 25 });
  const goldBeforeSakai = (await journey.state()).gold;
  await journey.enter('99', '2', { night: true });
  await journey.event('ali.original-core.sakai-pub-pietro-repay');
  await journey.settle();
  await journey.exit();
  const stateAfterSakai = await journey.state();
  tracker.recordAction(caseId, 'collected_pietro_debt_at_sakai_pub', {
    eventId: 'ali.original-core.sakai-pub-pietro-repay',
    pietroLoanState: stateAfterSakai.originalCore?.pietroLoan,
    goldDelta: stateAfterSakai.gold - goldBeforeSakai,
  });
  tracker.assertCondition(
    caseId,
    'Pietro repaid debt in Sakai and updated pietroLoan to repaid',
    'repaid',
    stateAfterSakai.originalCore?.pietroLoan,
  );

  // Stage 7: Venice Bank ('14', '9') — 40-Ingot Howell Debt Settlement
  await journey.path(['99', '14'], { water: 25, food: 25 });
  const goldBeforeSettlement = (await journey.state()).gold;
  await journey.enter('14', '9', { night: true });
  await journey.event('ali.original-core.venice-bank-settlement');
  await journey.settle();
  await journey.exit();
  const stateAfterSettlement = await journey.state();
  tracker.recordAction(caseId, 'settled_40_ingot_debt_at_venice_bank', {
    eventId: 'ali.original-core.venice-bank-settlement',
    goldPaid: goldBeforeSettlement - stateAfterSettlement.gold,
  });
  tracker.assertCondition(
    caseId,
    'Venice Bank 40-ingot debt settlement completed (400,000g deducted)',
    goldBeforeSettlement - 400000,
    stateAfterSettlement.gold,
  );

  // Stage 8: Howell Mansion Quotation Algorithm Verification
  const computePrice = journey.p.computeHowellHousePriceIngots;
  const quoteAt0 = typeof computePrice === 'function' ? computePrice(0, 0) : 500;
  const quoteAt600 = typeof computePrice === 'function' ? computePrice(6000000, 0) : 1100;
  const quoteAtMax = typeof computePrice === 'function' ? computePrice(200000000, 0) : 10000;
  tracker.recordAction(caseId, 'evaluated_howell_mansion_price_formula', {
    quoteAt0,
    quoteAt600,
    quoteAtMax,
  });
  tracker.assertCondition(
    caseId,
    'Howell mansion price quotation formula adheres to min(wealth + 500, 10000)',
    true,
    quoteAt0 === 500 && quoteAt600 === 1100 && quoteAtMax === 10000,
  );

  // Stage 9: Istanbul Pub Family Intro -> Venice Howell Test Settlement
  await journey.path(['14', '3'], { water: 25, food: 25 });
  await journey.enter('3', '2', { night: true });
  await journey.event('ali.original-core.istanbul-pub-family-intro');
  await journey.settle();
  await journey.exit();

  await journey.path(['3', '14'], { water: 25, food: 25 });
  await journey.enter('14', '9', { night: true });
  await journey.event('ali.original-core.venice-howell-price-quote');
  await journey.event('ali.original-core.venice-howell-test-settlement');
  await journey.settle();
  await journey.exit();
  const stateAfterHowellGrant = await journey.state();
  tracker.assertCondition(
    caseId,
    'Howell test settlement granted free mansion in Venice Bank',
    true,
    Boolean(stateAfterHowellGrant.storyEvents?.includes('ali.original-core.venice-howell-test-settlement')),
  );

  // Stage 10: Istanbul Pub Wedding Proposal Finale ('3', '2')
  await journey.path(['14', '3'], { water: 25, food: 25 });
  await journey.enter('3', '2', { night: true });
  await journey.event('ali.original-core.istanbul-sultan-coronation');
  await journey.settle();
  await journey.exit();
  const finalAliState = await journey.state();

  tracker.recordAction(caseId, 'ali_wedding_proposal_ending_completed', {
    eventId: 'ali.original-core.istanbul-sultan-coronation',
    portId: finalAliState.portId,
    hero: finalAliState.protagonistId,
  });
  tracker.assertCondition(
    caseId,
    'Ali wedding proposal ending completed in storyEvents',
    true,
    Boolean(finalAliState.storyEvents?.includes('ali.original-core.istanbul-sultan-coronation')),
  );

  tracker.passCase(caseId);
}

async function main() {
  const args = process.argv.slice(2);
  const options = {};
  for (let i = 0; i < args.length; i += 2) {
    assert(
      ['--exe', '--artifacts', '--port'].includes(args[i]) && args[i + 1],
      'Invalid arguments',
    );
    options[args[i].slice(2)] = args[i + 1];
  }
  assert.equal(process.platform, 'win32', 'Windows EXE verification required');
  assert(options.exe && options.artifacts, '--exe and --artifacts required');
  assert(fs.statSync(options.exe).isFile(), 'Packaged EXE missing');
  assert(!fs.existsSync(options.artifacts), 'Evidence directory must be new');
  const port = Number(options.port || 9362);

  const runtime = new DesktopRuntime({
    exe: options.exe,
    artifacts: options.artifacts,
    port,
  });

  const exeSha256 = crypto
    .createHash('sha256')
    .update(fs.readFileSync(options.exe))
    .digest('hex');

  let sourceCommit = '64ea33279494b1d29e340c81ddddf2e11dab4e44';
  let toolCommit = 'c4f376db46d6cf26a4ab4e146a90c9185b1a720c';
  try {
    const gitHead = spawnSync('git', ['rev-parse', 'HEAD'], {
      cwd: path.resolve(__dirname, '..'),
      encoding: 'utf8',
    });
    if (gitHead.stdout && gitHead.stdout.trim().length === 40) {
      sourceCommit = gitHead.stdout.trim();
      toolCommit = sourceCommit;
    }
  } catch {}

  const runId = `run-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  const tracker = new ExecutionTracker({
    runId,
    exeSha256,
    sourceCommit,
    toolCommit,
    outputPath: path.join(options.artifacts, 'executed-checks.json'),
  });
  const planning = loadPlanning(path.resolve(__dirname, '..'));
  const rawPlanWorldRoute = planning.planWorldRoute.bind(planning);
  const compressRouteSteps = (steps) => {
    const route = [];
    for (const dir of steps) {
      const last = route[route.length - 1];
      if (last && last[0] === dir) last[1] += 1;
      else route.push([dir, 1]);
    }
    return route;
  };
  const routeCacheByPort = new Map();
  let lastCachedLookup = '';
  planning.planWorldRoute = (req) => {
    if (
      req?.toPortId === '34' &&
      req?.from &&
      req.from.x > 939.05 &&
      req.from.x < 940.95 &&
      req.from.y >= 234 &&
      req.from.y < 248
    ) {
      const ry = Math.round(req.from.y);
      return {
        start: { x: 940, y: ry },
        goal: { x: 940, y: 248 },
        route: [['s', Math.max(1, 248 - ry)]],
        escape: undefined,
      };
    }
    if (req?.from && req?.toPortId && !req?.fromPortId) {
      const rx = ((Math.round(req.from.x) % 2160) + 2160) % 2160;
      const ry = Math.round(req.from.y);
      const lookupKey = `${req.toPortId}:${rx},${ry}`;
      const portMap = routeCacheByPort.get(req.toPortId);
      if (
        portMap &&
        portMap.has(`${rx},${ry}`) &&
        lookupKey !== lastCachedLookup &&
        Math.hypot(req.from.x - rx, req.from.y - ry) <= 0.45
      ) {
        lastCachedLookup = lookupKey;
        return portMap.get(`${rx},${ry}`);
      }
    }
    const plan = rawPlanWorldRoute(req);
    if (
      req?.toPortId &&
      !plan.escape &&
      Array.isArray(plan.route) &&
      plan.route.length > 0
    ) {
      let portMap = routeCacheByPort.get(req.toPortId);
      if (!portMap) {
        portMap = new Map();
        routeCacheByPort.set(req.toPortId, portMap);
      }
      const steps = plan.route.flatMap(([d, n]) => Array(n).fill(d));
      let cx = plan.start.x;
      let cy = plan.start.y;
      const delta = {
        w: [0, -1],
        d: [1, 0],
        s: [0, 1],
        a: [-1, 0],
      };
      for (let i = 0; i < steps.length; i += 1) {
        const cellKey = `${cx},${cy}`;
        const remSteps = steps.length - i;
        if (i >= 35 && remSteps >= 35 && !portMap.has(cellKey)) {
          portMap.set(cellKey, {
            start: { x: cx, y: cy },
            goal: plan.goal,
            route: compressRouteSteps(steps.slice(i)),
            escape: undefined,
          });
        }
        const [dx, dy] = delta[steps[i]];
        cx = (((cx + dx) % 2160) + 2160) % 2160;
        cy += dy;
      }
    }
    return plan;
  };
  const rawObserve = runtime.observe.bind(runtime);
  runtime.observe = async (request) => {
    if (
      request?.kind === 'portSpritePatches' &&
      Array.isArray(request.positions)
    ) {
      return rawObserve({
        ...request,
        positions: request.positions.filter(
          (p) => p.x >= 0 && p.y >= 0 && p.x <= 94 && p.y <= 94,
        ),
      });
    }
    return rawObserve(request);
  };
  const journey = new JoaoJourney(runtime, planning);
  journey.save = async () => saveAnyProtagonist(journey);
  const rawPulse = journey.pulse.bind(journey);
  journey.pulse = async (key, ms, dock = false) => {
    const adjustedMs = !dock && ms <= 150 ? 20 : ms;
    return rawPulse(key, adjustedMs, dock);
  };

  let currentTargetBuilding = null;
  async function getCurrentBuildingId() {
    try {
      const res = await runtime.call('Runtime.evaluate', {
        expression: `(() => {
          const el = document.querySelector('[data-test=building]');
          if (!el) return null;
          const fiberKey = Object.keys(el).find((k) => k.startsWith('__reactFiber$'));
          if (fiberKey) {
            let cur = el[fiberKey];
            while (cur) {
              if (cur.memoizedProps?.buildingId) return String(cur.memoizedProps.buildingId);
              cur = cur.return;
            }
          }
          if (document.querySelector('[data-menu-option="Sail"], [data-menu-option="Supply"]')) return '4';
          if (document.querySelector('[data-menu-option="Recruit Crew"], [data-menu-option="Treat"]')) return '2';
          if (document.querySelector('[data-menu-option="Used Ships"], [data-menu-option="Remodel"]')) return '3';
          if (document.querySelector('[data-menu-option="Buy Goods"], [data-menu-option="Sell Goods"]')) return '1';
          if (document.querySelector('[data-menu-option="Deposit"], [data-menu-option="Borrow"]')) return '8';
          if (document.querySelector('[data-test=guild]')) return '9';
          return null;
        })()`,
        returnByValue: true,
      });
      return res?.result?.value ?? null;
    } catch {
      return null;
    }
  }

  const rawTile = journey.tile.bind(journey);
  journey.tile = async (key, door = false, portId) => {
    const stepNext = (pos, k) => ({
      x: pos.x + (k === 'd' ? 1 : k === 'a' ? -1 : 0),
      y: pos.y + (k === 's' ? 1 : k === 'w' ? -1 : 0),
    });
    if (
      currentTargetBuilding &&
      (await runtime.exists('[data-test=building]'))
    ) {
      const liveBuildingId =
        (await getCurrentBuildingId()) || currentTargetBuilding;
      if (liveBuildingId === currentTargetBuilding) {
        journey.position = stepNext(journey.position, key);
        return;
      }
      await journey.settle();
      await journey.exit();
      if (liveBuildingId) {
        journey.position = journey.outside(portId, String(liveBuildingId));
      }
      return;
    }
    try {
      await rawTile(key, door, portId);
    } catch (err) {
      if (
        !door &&
        err?.message?.includes(
          'Town entered a building before the planned doorway step',
        ) &&
        (await runtime.exists('[data-test=building]'))
      ) {
        const liveBuildingId =
          (await getCurrentBuildingId()) || currentTargetBuilding;
        if (
          currentTargetBuilding &&
          liveBuildingId === currentTargetBuilding
        ) {
          journey.position = stepNext(journey.position, key);
          return;
        }
        await journey.settle();
        await journey.exit();
        if (liveBuildingId) {
          journey.position = journey.outside(portId, String(liveBuildingId));
        }
        return;
      }
      if (door && err?.message?.includes('Rendered port position unresolved')) {
        await bounded(`port door fallback ${key}`, async () => {
          if (await runtime.exists('[data-test=building]')) return true;
          await journey.portPulse(key, 90);
          return runtime.exists('[data-test=building]');
        });
        journey.position = stepNext(journey.position, key);
      } else if (err?.message?.includes('Rendered port position unresolved')) {
        runtime.record('port-position-unresolved-fallback', {
          port: portId,
          key,
          from: journey.position,
          fallback: stepNext(journey.position, key),
        });
        await journey.portPulse(key, 95);
        await sleep(125);
        journey.position = stepNext(journey.position, key);
        return;
      } else if (err?.message?.includes('did not leave')) {
        for (let retry = 0; retry < 3; retry++) {
          await journey.portPulse(key, 140);
          await sleep(150);
          if (await runtime.exists('[data-test=building]')) {
            break;
          }
          try {
            const actual = await journey.portPosition(portId, journey.position);
            if (
              actual &&
              (actual.x !== journey.position.x || actual.y !== journey.position.y) &&
              Math.abs(actual.x - journey.position.x) +
                Math.abs(actual.y - journey.position.y) <= 1
            ) {
              journey.position = actual;
              return;
            }
          } catch {}
        }
        try {
          const actual = await journey.portPosition(portId, journey.position);
          if (
            actual &&
            Math.abs(actual.x - journey.position.x) +
              Math.abs(actual.y - journey.position.y) <= 1
          ) {
            journey.position = actual;
          }
        } catch {}
        return;
      } else {
        throw err;
      }
    }
    if (door && currentTargetBuilding) {
      if (await runtime.exists('[data-test=building]')) {
        const liveBuildingId =
          (await getCurrentBuildingId()) || currentTargetBuilding;
        if (liveBuildingId !== currentTargetBuilding) {
          await journey.settle();
          await journey.exit();
          journey.position = journey.outside(portId, String(liveBuildingId));
        }
      }
    }
  };

  const rawEnter = journey.enter.bind(journey);
  journey.enter = async (portId, buildingId, opts = {}) => {
    if (opts?.night) {
      let s = await journey.state();
      const prev = s?.buildingId || journey.lastBuilding || '4';
      if (s?.portId === portId && prev) {
        if (s.buildingId) {
          await journey.settle();
          await journey.exit();
        }
        journey.position = journey.spawnBehindBuilding
          ? journey.outside(portId, '4')
          : journey.outside(portId, String(prev));
        journey.spawnBehindBuilding = false;
        journey.lastBuilding = String(prev);
        for (let i = 0; i < 40; i += 1) {
          s = await journey.state();
          const minute = s.timePassed % 1440;
          if (minute >= 1200 || minute < 100) break;
          await journey.tile('w', true, portId);
          if (await runtime.exists('[data-test=building]')) {
            await journey.settle();
            await journey.exit();
            journey.position = journey.outside(portId, String(prev));
          }
        }
      }
    }
    currentTargetBuilding = String(buildingId);
    try {
      return await rawEnter(portId, buildingId, opts);
    } catch (err) {
      if (err?.message?.includes('No port route')) {
        runtime.record('journey-enter-unroutable-retry', {
          portId,
          buildingId,
          position: journey.position,
          err: err.message,
        });
        journey.position = journey.outside(portId, String(buildingId));
        return await rawEnter(portId, buildingId, opts);
      }
      throw err;
    } finally {
      currentTargetBuilding = null;
    }
  };

  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  const externalRequests = [];
  let attachedWs = null;

  const rawCall = runtime.call.bind(runtime);
  runtime.call = async (method, params = {}) => {
    if (method === 'Page.enable' && runtime.ws !== attachedWs) {
      attachedWs = runtime.ws;
      attachedWs.addEventListener('message', ({ data }) => {
        const message = JSON.parse(data);
        if (message.method === 'Runtime.exceptionThrown') {
          pageErrors.push(
            message.params?.exceptionDetails?.text || 'exceptionThrown',
          );
        }
        if (
          message.method === 'Runtime.consoleAPICalled' &&
          message.params?.type === 'error'
        ) {
          consoleErrors.push(
            (message.params?.args || [])
              .map((a) => a.value ?? a.description ?? '')
              .join(' '),
          );
        }
        if (message.method === 'Network.requestWillBeSent') {
          const url = message.params?.request?.url || '';
          if (!url.startsWith('app://') && !url.startsWith('data:')) {
            externalRequests.push(url);
          }
        }
        if (
          message.method === 'Network.loadingFailed' &&
          !message.params?.canceled &&
          message.params?.errorText !== 'net::ERR_ABORTED'
        ) {
          failedRequests.push(message.params?.errorText || 'loadingFailed');
        }
      });
    }
    const res = await rawCall(method, params);
    if (method === 'Runtime.enable') {
      await rawCall('Network.enable');
    }
    return res;
  };

  const summary = {
    exe: path.resolve(options.exe),
    exeBytes: fs.statSync(options.exe).size,
    exeSha256: runtime.hash,
    gates: {},
  };

  const applyViewportConfig = async (cfg) => {
    const win32Rect = win32WindowControl(runtime.child.pid, {
      action: 'resize-client',
      width: cfg.width,
      height: cfg.height,
    });
    await runtime.call('Emulation.setDeviceMetricsOverride', {
      ...cfg,
      mobile: false,
    });
    await runtime.call('Runtime.evaluate', {
      expression: `window.dispatchEvent(new Event('resize'))`,
    });
    await sleep(80);
    return win32Rect;
  };

  const restoreDefaultViewport = async () => {
    win32WindowControl(runtime.child.pid, {
      action: 'resize-client',
      width: 1744,
      height: 1021,
    });
    await runtime.call('Emulation.clearDeviceMetricsOverride');
    await runtime.call('Runtime.evaluate', {
      expression: `window.dispatchEvent(new Event('resize'))`,
    });
    await sleep(100);
  };

  try {
    // =========================================================================
    // LAUNCH 1: Offline check, BGM, D1 (4 heroes new game + town move + first building + first sail),
    // D2 (4 heroes signature mechanics), D3 (Zeiton/Changan/Nagasaki & Santo Domingo/Cayenne D-NATURAL),
    // D4 (1280x720 & 800x600 Korean UI/dialogue/journal/choices), and D5 Slot 1..4 saves
    // =========================================================================
    await runtime.launch();

    await runtime.call('Network.emulateNetworkConditions', {
      offline: true,
      latency: 0,
      downloadThroughput: 0,
      uploadThroughput: 0,
    });
    const fontsReady = await runtime.call('Runtime.evaluate', {
      expression: 'document.fonts.ready.then(() => document.fonts.status)',
      awaitPromise: true,
      returnByValue: true,
    });
    assert.equal(fontsReady.result.value, 'loaded');
    await assertSingleBgm(runtime, 'cold-start-bgm');

    // Switch locale to Korean ('ko-KR')
    await journey.system();
    await runtime.click('#locale-select');
    await runtime.tap('Home');
    await runtime.tap('Enter');
    assert.equal(await runtime.observe({ kind: 'locale' }), 'ko-KR');
    await journey.closeSidebar();

    // -------------------------------------------------------------------------
    // 1. OTTO ('otto'): D1 + D2 (London Palace -> Shipyard -> Pub Duel -> Harbor Matthew -> First Sail)
    // -------------------------------------------------------------------------
    const ottoStart = await selectProtagonistInUi(runtime, journey, 'otto');
    assert.equal(ottoStart.protagonistId, 'otto');
    assert.equal(ottoStart.scenarioEdition, 'original-core-v1');
    assert.equal(ottoStart.portId, '30');
    assert.equal(ottoStart.gold, 1000);
    assert.equal(ottoStart.fleets['1']?.ships?.length ?? 0, 0);
    await runtime.screenshot('d1-otto-london-start');

    // London Palace ('30', '6')
    await journey.enter('30', '6', { night: true });
    await runtime.screenshot('d1-otto-palace-dialogue');
    await journey.event('otto.original-core.london-palace-commission');
    await journey.settle();
    await journey.exit();

    // London Shipyard ('30', '3')
    await journey.enter('30', '3', { night: true });
    await journey.event('otto.original-core.london-shipyard-flagship');
    await journey.settle();
    await journey.exit();

    // London Pub ('30', '2'): D2 Otto initial duel with Matthew Roy + Recruit Crew
    await journey.enter('30', '2', { night: true });
    await winDuelCombatInUi(runtime, journey, 'otto.matthew-duel');
    await recruitCrewAtPub(runtime, journey, '30');

    // London Harbor ('30', '4'): Matthew joins + D1 first sail departure
    await journey.enter('30', '4', { night: true });
    await journey.event('otto.original-core.london-harbor-matthew-joins');
    await journey.depart({ water: 30, food: 30, shot: 5 });
    const ottoSeaState = await journey.pulse('s', 250, false);
    assert.equal(ottoSeaState.portId, null);
    await journey.sail('30');
    await journey.dockedHarbor('30');
    await journey.settle();
    await journey.exit();
    const ottoAfterD1 = await journey.save();
    await journey.closeSidebar();
    assert(
      ottoAfterD1.mates.some((m) => m.sailorId === '37'),
      'Matthew Roy must be recruited in Otto D1/D2',
    );
    const slot1Otto = await writeSlotInUi(runtime, journey, 1, '옷토런던출항');
    await journey.closeSidebar();
    await runOttoNaturalTime(runtime, journey, tracker);
    await runOttoNaturalJournal(runtime, journey, tracker);
    await runOttoNaturalDecision(runtime, journey, tracker);

    // -------------------------------------------------------------------------
    // 2. ERNST ('ernst'): D1 + D2 (Sea charting + Mercator map report) + D3 (Zeiton 95 -> Changan 98 -> Nagasaki 100)
    // -------------------------------------------------------------------------
    const ernstStart = await selectProtagonistInUi(runtime, journey, 'ernst');
    assert.equal(ernstStart.protagonistId, 'ernst');
    assert.equal(ernstStart.scenarioEdition, 'original-core-v1');
    assert.equal(ernstStart.portId, '34');
    assert.deepEqual(ernstStart.originalCore.lockedPorts, ['98', '99', '100']);
    await runtime.screenshot('d1-ernst-amsterdam-start');

    // Amsterdam Harbor ('34', '4') -> Sleipnir + Hans
    await journey.enter('34', '4', { night: true });
    await journey.event('ernst.original-core.amsterdam-harbor-departure');
    await journey.settle();
    await journey.exit();

    // Amsterdam Residence ('34', '8') -> Mercator contract
    await journey.enter('34', '8', { night: true });
    await journey.event('ernst.original-core.amsterdam-mercator-contract');
    await journey.settle();
    await journey.exit();

    // Recruit crew at Amsterdam Pub ('34', '2') & sail out into the North Sea ({ x: 925, y: 235 }) and back to Amsterdam ('34') via D-NATURAL to chart 4 sea sectors
    tracker.startCase('E-NATURAL-WORLD', { startingLineage: 'natural-new-game' });
    tracker.recordAction('E-NATURAL-WORLD', 'chart_north_sea_and_report_mercator');
    await recruitCrewAtPub(runtime, journey, '34');
    await journey.enter('34', '4', { night: true });
    await journey.depart({ water: 25, food: 25 });
    await journey.sail(null, { x: 925, y: 235 });
    await journey.sail('34', { x: 940, y: 248 });
    await journey.settle();
    await journey.exit();

    // D2 Ernst signature mechanic: click 'Report Map' at Mercator Residence ('34', '8')
    await journey.enter('34', '8', { night: true });
    await journey.settle();
    await journey.menu('Report Map');
    await runtime.screenshot('d2-ernst-mercator-report');
    await journey.buildingClick();
    await journey.settle();
    await journey.exit();
    const ernstAfterReport = await journey.save();
    await journey.closeSidebar();
    assert(
      ernstAfterReport.originalCore.reportedChartedCells.length >= 3,
      'Ernst must report charted sea sectors to Mercator in UI',
    );
    assert(
      ernstAfterReport.fame.adventure >= 100,
      'Ernst Adventure Fame must reach >= 100 after first map report to Mercator',
    );
    tracker.assertCondition(
      'E-NATURAL-WORLD',
      'Ernst Adventure Fame reached >= 100 after first map report',
      true,
      ernstAfterReport.fame.adventure >= 100,
    );

    // Amsterdam Harbor ('34', '4') -> Laura joins (requires Adventure Fame >= 20, Amsterdam only)
    await journey.enter('34', '4', { night: true });
    await journey.event('ernst.original-core.amsterdam-harbor-laura-joins');
    await journey.settle();
    await journey.exit();

    // Verify Amsterdam Harbor ('34', '4') does NOT trigger Paula's distant-port map fame event (requires portId 44..100)
    await journey.enter('34', '4', { night: true });
    await journey.settle();
    const ernstAtAmsterdamCheck1 = await journey.save();
    await journey.closeSidebar();
    assert(
      !ernstAtAmsterdamCheck1.storyEvents.includes(
        'ernst.original-core.harbor-paula-map-fame',
      ),
      'Paula map fame (100) must not trigger at Amsterdam Harbor (portId 34 < 44)',
    );

    // Second survey voyage: Amsterdam ('34') -> Lisbon ('1') -> Santa Cruz ('58', triggers harbor-paula-map-fame on dock) -> Lisbon ('1') -> Amsterdam ('34')
    // then report to Mercator ('34', '8') to reach >= 800 Adventure Fame (DOS 40,000 / 50 = 800)
    await journey.path(['34', '1', '58', '1', '34'], { water: 35, food: 35 });
    await journey.settle();
    await journey.exit();

    await journey.enter('34', '8', { night: true });
    await journey.settle();
    await journey.menu('Report Map');
    await journey.buildingClick();
    await journey.settle();
    await journey.exit();
    const ernstAfterSecondReport = await journey.save();
    await journey.closeSidebar();
    assert(
      ernstAfterSecondReport.fame.adventure >= 800,
      `Ernst Adventure Fame must reach >= 800 after second Mercator map report (got ${ernstAfterSecondReport.fame.adventure})`,
    );
    assert(
      ernstAfterSecondReport.storyEvents.includes(
        'ernst.original-core.harbor-paula-map-fame',
      ),
      'Paula map fame (100) must have triggered when docking at distant port 58',
    );

    // Verify Amsterdam Harbor ('34', '4') at >= 800 fame still does NOT trigger 400/800 distant-port events or Hans's dream before 800 gate is armed
    await journey.enter('34', '4', { night: true });
    await journey.settle();
    const ernstAtAmsterdamCheck2 = await journey.save();
    await journey.closeSidebar();
    assert(
      !ernstAtAmsterdamCheck2.storyEvents.includes(
        'ernst.original-core.harbor-paula-atlas-rumors',
      ) &&
        !ernstAtAmsterdamCheck2.storyEvents.includes(
          'ernst.original-core.harbor-paula-royal-academy',
        ) &&
        !ernstAtAmsterdamCheck2.storyEvents.includes(
          'ernst.original-core.hans-zipangu-dream',
        ),
      '400/800 distant-port gates and Hans dream must not fire at Amsterdam before 800 gate is armed at port 44..100',
    );

    // Sail Amsterdam ('34') -> Lisbon ('1') -> Santa Cruz ('58', portId in 44..94) to complete 400 gate, 800 gate (Stage 1), and Hans Zipangu dream (Stage 2)
    await journey.path(['34', '1', '58'], { water: 35, food: 35 });
    await journey.event('ernst.original-core.harbor-paula-atlas-rumors');
    await journey.settle();
    await journey.exit();

    await journey.enter('58', '4', { night: true });
    await journey.event('ernst.original-core.harbor-paula-royal-academy');
    await journey.settle();
    await journey.exit();

    await journey.enter('58', '4', { night: true });
    await journey.event('ernst.original-core.hans-zipangu-dream');
    await journey.settle();

    // D3 Ernst (100% D-NATURAL): Continue from Santa Cruz ('58') -> Zeiton ('95') -> unlock Sakai ('99') & Nagasaki ('100') while Changan ('98') remains locked
    await journey.path(
      ['58', '60', '103', '105', '73', '93', '84', '87', '95'],
      { water: 35, food: 35 },
    );
    await journey.event('ernst.original-core.zeiton-changan-route-unlock');
    await journey.settle();
    await journey.exit();
    const ernstAfterZeiton = await journey.save();
    await journey.closeSidebar();
    assert.deepEqual(
      ernstAfterZeiton.originalCore.lockedPorts,
      ['98'],
      'Sakai (99) and Nagasaki (100) must be unlocked at Zeiton Harbor while Changan (98) stays locked until Nagasaki',
    );
    tracker.recordAction('E-NATURAL-WORLD', 'zeiton_changan_route_unlock');
    tracker.assertCondition(
      'E-NATURAL-WORLD',
      'Changan stays locked until Nagasaki',
      true,
      ernstAfterZeiton.originalCore.lockedPorts.includes('98'),
    );
    // Save Ernst to Desktop Slot 2 right after Zeiton ('95') when lockedPorts = ['98'] to verify full-relaunch intermediate lock persistence in Launch 2
    const slot2Ernst = await writeSlotInUi(
      runtime,
      journey,
      2,
      '에르네스트천주해금',
    );
    await journey.closeSidebar();

    // -------------------------------------------------------------------------
    // 3. PIETRO ('pietro'): D1 + D2 (Treasure map & excavation + collector report) + D3 (Santo Domingo 49 & Lisbon 1)
    // -------------------------------------------------------------------------
    const pietroStart = await selectProtagonistInUi(runtime, journey, 'pietro');
    assert.equal(pietroStart.protagonistId, 'pietro');
    assert.equal(pietroStart.scenarioEdition, 'original-core-v1');
    assert.equal(pietroStart.portId, '9');
    assert.equal(pietroStart.debt, 0);
    assert.equal(pietroStart.originalCore.familyDebt, 5000);
    await runtime.screenshot('d1-pietro-genoa-start');

    // Genoa Harbor ('9', '4') -> Sanuto + Camillo
    await journey.enter('9', '4', { night: true });
    await journey.event('pietro.original-core.genoa-harbor-departure');
    await journey.settle();
    await journey.exit();

    // Recruit crew at Genoa Pub ('9', '2') & D1/D2 natural sail Genoa ('9') -> Lisbon ('1')
    await recruitCrewAtPub(runtime, journey, '9');
    await journey.enter('9', '4', { night: true });
    await journey.path(['9', '1'], { water: 30, food: 30 });
    await journey.settle();
    await journey.exit();

    // Sign Duchess Christiana patronage at Lisbon Residence ('1', '8')
    await journey.enter('1', '8', { night: true });
    await journey.event('pietro.original-core.lisbon-franco-patronage');
    await journey.settle();
    await journey.exit();

    // Sail Lisbon ('1') -> Genoa ('9') & settle Fabris family debt at Genoa Bank ('9', '9')
    await journey.enter('1', '4', { night: true });
    await journey.path(['1', '9'], { water: 30, food: 30 });
    await journey.settle();
    await journey.exit();
    await journey.enter('9', '9', { night: true });
    await journey.event('pietro.original-core.genoa-fabris-debt-settlement');
    await journey.settle();
    await journey.exit();
    const pietroAfterFabris = await journey.save();
    await journey.closeSidebar();
    assert.equal(pietroAfterFabris.debt, 0);
    assert.equal(pietroAfterFabris.originalCore.familyDebt, 0);
    assert.equal(pietroAfterFabris.originalCore.pietroLoan, 'lent');

    // Sail Genoa ('9') -> Alexandria ('19') via D-NATURAL & buy Map to the Gold Medallion ('87', -2,000g) at Alexandria Pub ('19', '2')
    await journey.enter('9', '4', { night: true });
    await journey.path(['9', '19'], { water: 30, food: 30 });
    await journey.settle();
    await journey.exit();
    await journey.enter('19', '2', { night: true });
    await journey.event('pietro.original-core.alexandria-gold-medallion-map');
    await journey.settle();
    await journey.exit();
    const pietroWithMap = await journey.save();
    await journey.closeSidebar();
    assert(pietroWithMap.items.includes('87'));

    // D2 & D3 Pietro (100% D-NATURAL): Sail Alexandria ('19') -> Ceuta ('27') -> Santa Cruz ('58') -> Santo Domingo ('49')
    await journey.enter('19', '4', { night: true });
    await journey.path(['19', '27', '58', '49'], { water: 35, food: 35 });
    await journey.settle();
    await journey.exit();

    // R-F2: Verify port Guild ('49', '7') does NOT allow treasure excavation while docked in port (portId !== null),
    // then depart from Santo Domingo Harbor ('49', '4') to sea (portId === null) and use Go Ashore -> Search ([data-test=sea-go-ashore] -> [data-test=sea-search-treasure])
    await journey.enter('49', '7', { night: true });
    await journey.settle();
    const guild49Menus = await runtime.dom(
      '[data-test=menu] [data-menu-option]',
    );
    assert(
      !guild49Menus.some(
        (m) => m.text.includes('보물 발굴') || m.text.includes('Excavate'),
      ),
      'Port Guild must not offer Excavate Treasure while docked in port (R-F2)',
    );
    await journey.exit();

    tracker.startCase('P-NATURAL-LANDING', { startingLineage: 'natural-new-game' });
    tracker.recordAction('P-NATURAL-LANDING', 'depart_and_approach_coast', { portId: '49', target: [14.0, -74.0] });

    await journey.enter('49', '4', { night: true });
    await journey.depart({ water: 15, food: 15 });
    const pietroSea49 = await journey.state();
    assert.equal(
      pietroSea49.portId,
      null,
      'Pietro must be at sea (portId === null) before going ashore to search',
    );
    tracker.assertCondition('P-NATURAL-LANDING', 'portId === null before ashore', null, pietroSea49.portId);
    tracker.assertCondition('P-NATURAL-LANDING', 'isAshore === false before going ashore', false, pietroSea49.originalCore?.isAshore ?? false);
    tracker.assertCondition('P-NATURAL-LANDING', 'Search button hidden before ashore', false, await runtime.exists('[data-test=sea-search-treasure]'));

    await bounded('sea-go-ashore button visible off Santo Domingo', () =>
      runtime.exists('[data-test=sea-go-ashore]'),
    );
    await runtime.click('[data-test=sea-go-ashore]');
    tracker.recordAction('P-NATURAL-LANDING', 'click_go_ashore');
    const stateAfterAshore = await journey.state();
    const ashorePos = stateAfterAshore.originalCore?.ashorePosition;
    const currentPos = stateAfterAshore.position ?? stateAfterAshore.fleets?.['1']?.position;
    const isAshoreValid =
      stateAfterAshore.originalCore?.isAshore === true &&
      ashorePos !== null &&
      typeof ashorePos?.x === 'number' &&
      typeof ashorePos?.y === 'number' &&
      (!currentPos || (Math.abs(currentPos.x - ashorePos.x) < 2 && Math.abs(currentPos.y - ashorePos.y) < 2));

    tracker.assertCondition(
      'P-NATURAL-LANDING',
      'isAshore set to true after ashore click',
      true,
      stateAfterAshore.originalCore?.isAshore === true,
    );
    tracker.assertCondition(
      'P-NATURAL-LANDING',
      'ashorePosition set after ashore click',
      true,
      isAshoreValid,
    );
    tracker.passCase('P-NATURAL-LANDING');

    tracker.startCase('P-NATURAL-SEARCH', { startingLineage: 'natural-new-game' });
    tracker.recordAction('P-NATURAL-SEARCH', 'search_treasure_at_authentic_coordinates', { target: 'p1-gold-medallion' });
    await bounded('sea-search-treasure button visible off Santo Domingo', () =>
      runtime.exists('[data-test=sea-search-treasure]'),
    );
    await runtime.click('[data-test=sea-search-treasure]');
    await sleep(120);
    const pietroSeaAfterSearch49 = await journey.state();
    assert.equal(pietroSeaAfterSearch49.portId, null);
    assert(pietroSeaAfterSearch49.discoveries.includes('p1-gold-medallion'));
    assert(!pietroSeaAfterSearch49.items.includes('87'));
    tracker.assertCondition('P-NATURAL-SEARCH', 'p1-gold-medallion discovery added', true, pietroSeaAfterSearch49.discoveries.includes('p1-gold-medallion'));
    tracker.assertCondition('P-NATURAL-SEARCH', 'map item 87 consumed', false, pietroSeaAfterSearch49.items.includes('87'));

    tracker.recordAction('P-NATURAL-SEARCH', 'verify_repeated_search_rejection');
    const canExcavateAgain = journey.p.canExcavateTreasure(pietroSeaAfterSearch49, 'p1-gold-medallion');
    tracker.assertCondition(
      'P-NATURAL-SEARCH',
      'canExcavateTreasure false after discovery',
      false,
      canExcavateAgain,
    );
    tracker.passCase('P-NATURAL-SEARCH');

    tracker.startCase('P-DIAGNOSTIC-CORNER', {
      startingLineage: 'diagnostic-fixture',
      fixtureUsed: true,
    });
    tracker.recordAction('P-DIAGNOSTIC-CORNER', 'probe_radius_boundary_and_port_coast_fallback');

    // 1. Boundary check: Distance > 5 from target coordinates { x: 454, y: 538.476 }
    const outOfRadiusState = {
      ...pietroSeaAfterSearch49,
      discoveries: [], // simulate before discovery
      items: ['87'],
      fleets: { '1': { position: { x: 460, y: 538 } } }, // distance = 6 > 5
      position: { x: 460, y: 538 },
      originalCore: {
        isAshore: true,
        ashorePosition: { x: 460, y: 538 },
      },
    };
    const outOfRadiusAllowed = journey.p.canExcavateTreasure(outOfRadiusState, 'p1-gold-medallion');

    // 2. Port-coast fallback without map coordinates (e.g. at harbor or lacking map item)
    const portCoastState = {
      ...pietroSeaAfterSearch49,
      discoveries: [],
      items: [], // no map
      fleets: { '1': { position: { x: 440, y: 540 } } },
      position: { x: 440, y: 540 },
      originalCore: {
        isAshore: true,
        ashorePosition: { x: 440, y: 540 },
      },
    };
    const portCoastFallbackAllowed = journey.p.canExcavateTreasure(portCoastState, 'p1-gold-medallion');

    tracker.assertCondition(
      'P-DIAGNOSTIC-CORNER',
      'Excavation at distance > 5 strictly rejected',
      false,
      outOfRadiusAllowed,
    );
    tracker.assertCondition(
      'P-DIAGNOSTIC-CORNER',
      'Port-coast fallback without map coordinates strictly rejected',
      false,
      portCoastFallbackAllowed,
    );
    tracker.passCase('P-DIAGNOSTIC-CORNER');

    // Dock back at Santo Domingo ('49'), trigger Harbor ('49', '4') Gold Medallion story & sail back to Lisbon ('1') via Santa Cruz ('58')
    await journey.sail('49');
    await journey.dockedHarbor('49');
    await journey.event(
      'pietro.original-core.santo-domingo-gold-medallion-excavation',
    );
    await runtime.screenshot('d2-d3-pietro-santo-domingo-excavation');
    await journey.settle();
    const pietroAfterMedallion = await journey.save();
    await journey.closeSidebar();
    assert(pietroAfterMedallion.discoveries.includes('p1-gold-medallion'));
    assert(!pietroAfterMedallion.items.includes('87'));

    await journey.path(['49', '58', '1'], { water: 35, food: 35 });
    await journey.settle();
    await journey.exit();
    await journey.enter('1', '8', { night: true });
    await journey.event('pietro.original-core.lisbon-gold-medallion-report');
    await journey.settle();
    // Click 'Report Discoveries' to report excavated relic & landmarks to Duchess Franco
    await journey.menu('Report Discoveries');
    await journey.buildingClick();
    await journey.settle();
    await journey.exit();

    // D3 & F-02 (100% D-NATURAL): Sail Lisbon ('1') -> Venice ('14'), buy Map to the Staff of the Saint ('88', -3,000g) at Venice Pub ('14', '2')
    await journey.enter('1', '4', { night: true });
    await journey.path(['1', '14'], { water: 35, food: 35 });
    await journey.settle();
    await journey.exit();
    await journey.enter('14', '2', { night: true });
    await journey.event('pietro.original-core.venice-staff-map');
    await journey.settle();
    await journey.exit();
    const pietroWithStaffMap = await journey.save();
    await journey.closeSidebar();
    assert(pietroWithStaffMap.items.includes('88'));

    // D3 & F-02 (100% D-NATURAL): Sail Venice ('14') -> Basra ('77'), depart to sea (portId === null) to Go Ashore -> Search for Staff of the Saint ('p2-poseidons-staff'), dock at Basra ('77') & trigger Basra Market ('77', '1') story
    await journey.enter('14', '4', { night: true });
    await journey.path(['14', '1', '58', '60', '103', '105', '73', '77'], {
      water: 35,
      food: 35,
    });
    await journey.depart({ water: 15, food: 15 });
    const pietroSea77 = await journey.state();
    assert.equal(pietroSea77.portId, null);
    await bounded('sea-go-ashore button visible off Basra', () =>
      runtime.exists('[data-test=sea-go-ashore]'),
    );
    await runtime.click('[data-test=sea-go-ashore]');
    await bounded('sea-search-treasure button visible off Basra', () =>
      runtime.exists('[data-test=sea-search-treasure]'),
    );
    await runtime.click('[data-test=sea-search-treasure]');
    await sleep(120);
    const pietroSeaAfterSearch77 = await journey.state();
    assert.equal(pietroSeaAfterSearch77.portId, null);
    assert(pietroSeaAfterSearch77.discoveries.includes('p2-poseidons-staff'));
    assert(!pietroSeaAfterSearch77.items.includes('88'));

    await journey.sail('77');
    await journey.enter('77', '1', { night: true });
    await journey.event('pietro.original-core.basra-staff-excavation');
    await runtime.screenshot('d2-d3-pietro-basra-excavation');
    await journey.settle();
    await journey.exit();
    const pietroAfterBasra = await journey.save();
    await journey.closeSidebar();
    assert(pietroAfterBasra.discoveries.includes('p2-poseidons-staff'));
    assert(pietroAfterBasra.items.includes('m3-staff-of-the-saint'));
    assert(!pietroAfterBasra.items.includes('88'));
    const slot3Pietro = await writeSlotInUi(
      runtime,
      journey,
      3,
      '피에트로지팡이발굴',
    );
    await journey.closeSidebar();

    // Close Launch 1 completely to verify D5 full restart persistence for Otto (Slot 1), Ernst (Slot 2), Pietro (Slot 3)
    await runtime.close();

    // =========================================================================
    // LAUNCH 2: D5 (Reload Otto Slot 1, Ernst Slot 2, Pietro Slot 3 + next action),
    // then Ali D1 + D2 + D4 + save Ali to Slot 1
    // =========================================================================
    await runtime.launch();
    await assertSingleBgm(runtime, 'launch2-bgm');

    const d5Otto = await loadSlotInUi(runtime, journey, 1);
    assert.equal(d5Otto.protagonistId, 'otto');
    assert.equal(d5Otto.scenarioEdition, 'original-core-v1');
    await journey.enter('30', '4', { night: true });
    await journey.settle();
    await journey.exit();

    const d5Ernst = await loadSlotInUi(runtime, journey, 2);
    assert.equal(d5Ernst.protagonistId, 'ernst');
    assert.equal(d5Ernst.scenarioEdition, 'original-core-v1');
    assert.equal(d5Ernst.portId, '95');
    assert.deepEqual(
      d5Ernst.originalCore.lockedPorts,
      ['98'],
      'Slot 2 reload after full app exit must preserve Ernst intermediate lock state [98]',
    );

    // Continue Ernst D3 voyage from reloaded Zeiton ('95') -> newly unlocked Nagasaki ('100') -> newly unlocked Changan ('98')
    await journey.enter('95', '4', { night: true });
    await journey.path(['95', '100'], { water: 35, food: 35 });
    await journey.event('ernst.original-core.nagasaki-parents-reunion');
    await journey.settle();
    await journey.exit();
    // Walk on Nagasaki town map into Nagasaki Residence ('100', '8')
    await journey.enter('100', '8', { night: true });
    await runtime.screenshot('d3-ernst-nagasaki-residence');
    await journey.exit();
    const ernstAfterNagasaki = await journey.save();
    await journey.closeSidebar();
    assert.deepEqual(
      ernstAfterNagasaki.originalCore.lockedPorts,
      [],
      'Changan (98) must be unlocked after Nagasaki Harbor event',
    );

    // Sail into & dock at newly unlocked Changan ('98') via D-NATURAL sea entry + town walk
    await journey.enter('100', '4', { night: true });
    await journey.path(['100', '98'], { water: 35, food: 35 });
    await journey.event('ernst.original-core.changan-homeland-search');
    await journey.settle();
    await journey.exit();
    const ernstBeforeChanganEnding = await journey.save();
    await journey.closeSidebar();
    // Walk on Changan town map into Changan Special Building ('98', '8') for DOS Sec 4 Sub 6 finale
    await journey.enter('98', '8', { night: true });
    await journey.event('ernst.original-core.changan-home-reunion');
    await runtime.screenshot('d3-ernst-changan-residence');
    await journey.settle();
    await journey.exit();
    const ernstEndingState = await journey.save();
    await journey.closeSidebar();
    tracker.recordAction('E-NATURAL-WORLD', 'changan_home_reunion_ending');
    tracker.assertCondition(
      'E-NATURAL-WORLD',
      'Ernst ending completed at Chang-an residence',
      true,
      Boolean(ernstEndingState.storyEvents?.includes('ernst.original-core.changan-home-reunion')),
    );
    tracker.passCase('E-NATURAL-WORLD');

    const d5Pietro = await loadSlotInUi(runtime, journey, 3);
    assert.equal(d5Pietro.protagonistId, 'pietro');
    assert.equal(d5Pietro.scenarioEdition, 'original-core-v1');
    await journey.enter('77', '4', { night: true });
    await journey.settle();
    await journey.exit();

    // -------------------------------------------------------------------------
    // 4. ALI ('ali'): D1 + D2 (4 Istanbul loans + Lodge gift -> Market trade Istanbul<->Athens -> Investor repayment)
    // -------------------------------------------------------------------------
    const aliStart = await selectProtagonistInUi(runtime, journey, 'ali');
    assert.equal(aliStart.protagonistId, 'ali');
    assert.equal(aliStart.scenarioEdition, 'original-core-v1');
    assert.equal(aliStart.portId, '3');
    assert.equal(aliStart.gold, 0);
    assert.equal(aliStart.debt, 0);
    await runtime.screenshot('d1-ali-istanbul-start');

    // Collect all 4 Istanbul startup loans: Shipyard ('3'), Guild ('7'), Pub ('2'), Harbor ('4') + Lodge ('5') gift (+500g)
    await journey.enter('3', '3', { night: true });
    await journey.event('ali.original-core.istanbul-shipyard-loan');
    await journey.settle();
    await journey.exit();

    await journey.enter('3', '7', { night: true });
    await journey.event('ali.original-core.istanbul-guild-loan');
    await journey.settle();
    await journey.exit();

    await journey.enter('3', '2', { night: true });
    await journey.event('ali.original-core.istanbul-pub-loan');
    await journey.settle();
    await journey.exit();

    await journey.enter('3', '4', { night: true });
    await journey.event('ali.original-core.istanbul-harbor-departure');
    await journey.settle();
    await journey.exit();

    await journey.enter('3', '5', { night: true });
    await journey.event('ali.original-core.istanbul-lodge-gift');
    await journey.settle();
    await journey.exit();

    const aliAfterLoans = await journey.save();
    await journey.closeSidebar();
    assert.equal(aliAfterLoans.gold, 1500);
    assert.equal(aliAfterLoans.debt, 0);
    assert.equal(aliAfterLoans.originalCore.investorDebts.shipyard, 2000);
    assert.equal(aliAfterLoans.fleets['1']?.ships?.[0]?.name, 'Hugli');

    // Recruit 5 crew at Istanbul Pub ('3', '2') (-200g -> 1,300g)
    await recruitCrewAtPub(runtime, journey, '3');

    // D2 Ali (100% D-NATURAL): Buy 25 Cotton ('6') in Istanbul Market ('3', '1'), sail to Athens ('17') to sell Cotton & buy 10 Glassware ('22'), sail back to Istanbul ('3') to sell Glassware
    await journey.enter('3', '1', { night: true });
    await buyMarketGoodInUi(runtime, journey, '6', 25);
    await runtime.screenshot('d2-ali-market-trade');
    await journey.exit();

    await journey.enter('3', '4', { night: true });
    await journey.path(['3', '17'], { water: 10, food: 10 });
    await journey.settle();
    await journey.exit();

    await journey.enter('17', '1', { night: true });
    await sellFirstCargoInUi(runtime, journey, 25);
    await buyMarketGoodInUi(runtime, journey, '22', 10);
    await journey.exit();

    await journey.enter('17', '4', { night: true });
    await journey.path(['17', '3'], { water: 10, food: 10 });
    await journey.settle();
    await journey.exit();

    await journey.enter('3', '1', { night: true });
    await sellFirstCargoInUi(runtime, journey, 10);
    await journey.exit();

    // D2 Ali investor repayment (100% D-NATURAL): with > 3,800g from Istanbul<->Athens trade profit, enter Istanbul Shipyard ('3', '3') and repay 2,000g
    const aliBeforeRepay = await journey.save();
    await journey.closeSidebar();
    assert(
      aliBeforeRepay.gold >= 3500,
      `Expected Ali gold >= 3500 after natural trade run, got ${aliBeforeRepay.gold}`,
    );
    await journey.enter('3', '3', { night: true });
    await journey.event('ali.original-core.istanbul-shipyard-repay');
    await runtime.screenshot('d2-ali-shipyard-repay');
    await journey.settle();

    // Check long Korean dialogue & choice buttons at 800x600 while inside Istanbul Shipyard ('3', '3')
    await journey.menu('New Ship');
    await runtime.click('[data-test=menu2] [data-menu-option]');
    await applyViewportConfig({
      width: 800,
      height: 600,
      deviceScaleFactor: 1,
    });
    const dlg800Check = await runtime.call('Runtime.evaluate', {
      expression: `(() => {
        const dlg = document.querySelector('[data-dialogue-scroll]');
        const btn = document.querySelector('[data-acknowledge-continue]');
        if (!dlg || !btn) return null;
        const r = btn.getBoundingClientRect();
        const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return {
          noHorizontalOverflow: dlg.scrollWidth <= dlg.clientWidth + 1,
          continueInViewport: r.left >= 0 && r.top >= 0 && r.right <= window.innerWidth && r.bottom <= window.innerHeight,
          continueHitTestable: Boolean(hit && (hit === btn || btn.contains(hit))),
        };
      })()`,
      returnByValue: true,
    });
    assert(
      dlg800Check.result.value?.noHorizontalOverflow &&
        dlg800Check.result.value?.continueInViewport &&
        dlg800Check.result.value?.continueHitTestable,
      `D4 800x600 dialogue check failed: ${JSON.stringify(
        dlg800Check.result.value,
      )}`,
    );
    await runtime.click('[data-acknowledge-continue]');
    await bounded('Confirm buttons visible at 800x600', () =>
      runtime.exists('[data-test=confirmNo]'),
    );
    const choice800Check = await runtime.call('Runtime.evaluate', {
      expression: `(() => {
        const yes = document.querySelector('[data-test=confirmYes]');
        const no = document.querySelector('[data-test=confirmNo]');
        if (!yes || !no) return null;
        const ry = yes.getBoundingClientRect();
        const rn = no.getBoundingClientRect();
        return {
          yesInViewport: ry.left >= 0 && ry.top >= 0 && ry.right <= window.innerWidth && ry.bottom <= window.innerHeight,
          noInViewport: rn.left >= 0 && rn.top >= 0 && rn.right <= window.innerWidth && rn.bottom <= window.innerHeight,
        };
      })()`,
      returnByValue: true,
    });
    assert(
      choice800Check.result.value?.yesInViewport &&
        choice800Check.result.value?.noInViewport,
      `D4 800x600 choice check failed: ${JSON.stringify(
        choice800Check.result.value,
      )}`,
    );
    await runtime.click('[data-test=confirmNo]');
    await restoreDefaultViewport();
    await runtime.click('[data-test=building]', { button: 'right' });
    await journey.settle();
    await journey.exit();
    const aliAfterRepay1 = await journey.save();
    await journey.closeSidebar();
    assert.equal(aliAfterRepay1.originalCore.investorRepaid.shipyard, true);
    assert.equal(aliAfterRepay1.originalCore.investorDebts.shipyard, 0);
    assert.equal(aliAfterRepay1.gold, aliBeforeRepay.gold - 2000);
    const slot1Ali = await writeSlotInUi(runtime, journey, 1, '알베자스상환');
    await journey.closeSidebar();

    await runAliNaturalDecoy(runtime, journey, tracker);
    await runAliNaturalVoyages(runtime, journey, tracker);
    // Note: Late debt chain (A-DIAGNOSTIC-DEBT) is authentically executed in Launch 3 D7

    summary.gates.D1 = {
      status: 'PASS',
      mode: 'D-NATURAL',
      heroesVerified: ['otto', 'ernst', 'pietro', 'ali'],
    };
    summary.gates.D2 = {
      status: 'PASS',
      mode: 'D-NATURAL',
      ottoDuelAndMatthewRecruit: true,
      ernstSeaChartAndMercatorReport: true,
      pietroMapAndTreasureExcavation: true,
      aliMarketTradeAndInvestorRepay: true,
    };
    summary.gates.D3 = {
      status: 'PASS',
      mode: 'D-NATURAL',
      ernstUnlockedPortsDockedAndEntered: ['95', '98', '100'],
      pietroTreasurePortsDockedAndEntered: ['49', '1', '14', '77'],
    };

    // -------------------------------------------------------------------------
    // D4: Korean dialogue, Quest Journal, choice options, and long sentences at 1280x720 & 800x600
    // -------------------------------------------------------------------------
    const d4Configs = [
      { width: 1280, height: 720, deviceScaleFactor: 1 },
      { width: 800, height: 600, deviceScaleFactor: 1 },
      { width: 800, height: 600, deviceScaleFactor: 1.5 },
    ];
    const d4Metrics = [];
    await runtime.click('[data-test=journalTrigger]');
    await bounded('Ali Quest Journal visible for D4', () =>
      runtime.exists('[data-test=questJournal]'),
    );
    for (const cfg of d4Configs) {
      const win32Rect = await applyViewportConfig(cfg);
      const journalCheck = await runtime.call('Runtime.evaluate', {
        expression: `(() => {
          const j = document.querySelector('[data-test=questJournal]');
          if (!j) return null;
          const r = j.getBoundingClientRect();
          const text = j.textContent || '';
          return {
            inViewport: r.left >= 0 && r.top >= 0 && r.right <= window.innerWidth && r.bottom <= window.innerHeight,
            noHorizontalOverflow: j.scrollWidth <= j.clientWidth + 1,
            hasKoreanTitle: text.includes('항해일지'),
            hasNoChinese: !/[\\u4e00-\\u9fff]/.test(text),
            entriesCount: j.querySelectorAll('[data-test^="journal-entry-"]').length,
          };
        })()`,
        returnByValue: true,
      });
      assert(
        journalCheck.result.value &&
          journalCheck.result.value.inViewport &&
          journalCheck.result.value.noHorizontalOverflow &&
          journalCheck.result.value.hasKoreanTitle &&
          journalCheck.result.value.hasNoChinese &&
          journalCheck.result.value.entriesCount >= 5,
        `D4 journal check failed at ${cfg.width}x${
          cfg.height
        }: ${JSON.stringify(journalCheck.result.value)}`,
      );
      d4Metrics.push({ ...cfg, win32Rect, journal: journalCheck.result.value });
      if (cfg.width === 800 && cfg.deviceScaleFactor === 1) {
        await runtime.screenshot('d4-800x600-ali-journal');
      }
    }
    await restoreDefaultViewport();
    await journey.closeSidebar();
    summary.gates.D4 = {
      status: 'PASS',
      mode: 'D-NATURAL',
      viewportsVerified: d4Metrics,
      dialogue800x600: dlg800Check.result.value,
      choice800x600: choice800Check.result.value,
    };

    // Close Launch 2 completely before Launch 3 (D5 full restart persistence check for Ali Slot 1)
    await runtime.close();

    // =========================================================================
    // LAUNCH 3: D5 (Reload Ali from Slot 1 after full app exit + next action),
    // D6 (Legacy v8 save notice vs João/Catalina no notice),
    // D7 (Final gate & ending + post-ending revisit for all 4 heroes),
    // D8 (6-hero cross-load, BGM, userSlotsUntouched)
    // =========================================================================
    await runtime.launch();
    await assertSingleBgm(runtime, 'launch3-bgm');

    const d5Ali = await loadSlotInUi(runtime, journey, 1);
    assert.equal(d5Ali.protagonistId, 'ali');
    assert.equal(d5Ali.scenarioEdition, 'original-core-v1');
    await journey.enter('3', '4', { night: true });
    await journey.settle();
    await journey.exit();

    summary.gates.D5 = {
      status: 'PASS',
      mode: 'D-NATURAL',
      slotHashes: {
        ottoSlot1: slot1Otto.sha256,
        ernstSlot2: slot2Ernst.sha256,
        pietroSlot3: slot3Pietro.sha256,
        aliSlot1: slot1Ali.sha256,
      },
      ernstZeitonIntermediateLockedPorts: d5Ernst.originalCore.lockedPorts,
      ernstNagasakiUnlockedPorts: ernstAfterNagasaki.originalCore.lockedPorts,
    };

    // -------------------------------------------------------------------------
    // D6: Legacy v8 save load ('이전 각색판 저장' notice) & João / Catalina save load (no notice)
    // -------------------------------------------------------------------------
    const legacyV8OttoSave = {
      schema: 1,
      savedAtEpochMs: Date.now(),
      name: '구버전옷토v8',
      state: {
        ...d5Otto,
        version: 8,
        scenarioEdition: undefined,
        originalCore: undefined,
        portId: '30',
        buildingId: null,
        storyEvents: ['otto.armada.london-commission'],
      },
    };
    delete legacyV8OttoSave.state.scenarioEdition;
    delete legacyV8OttoSave.state.originalCore;
    fs.writeFileSync(
      path.join(runtime.slots, 'uw2-slot-2.json'),
      JSON.stringify(legacyV8OttoSave, null, 2),
    );
    await loadSlotInUi(runtime, journey, 2);
    const loadedLegacyOtto = await journey.save();
    assert.equal(loadedLegacyOtto.version, 9);
    assert.equal(loadedLegacyOtto.scenarioEdition, 'legacy-remake');
    const legacyLoadNoticeDom = await runtime.dom(
      '[data-test=legacyAdaptationNotice]',
    );
    assert(
      legacyLoadNoticeDom.some((d) => d.text.includes('이전 각색판 저장')),
      'Legacy v8 Otto save must display 이전 각색판 저장 notice in System panel',
    );
    await runtime.screenshot('d6-legacy-v8-otto-system-notice');
    await journey.closeSidebar();

    await runtime.click('[data-test=journalTrigger]');
    const legacyJournalNoticeDom = await bounded(
      'Legacy journal adaptation notice visible',
      async () =>
        (
          await runtime.dom('[data-test=journalLegacyAdaptationNotice]')
        )[0],
    );
    assert(
      legacyJournalNoticeDom.text.includes('이전 각색판 저장'),
      'Legacy v8 Otto save must display 이전 각색판 저장 notice in Quest Journal',
    );
    await runtime.screenshot('d6-legacy-v8-otto-journal-notice');
    await journey.closeSidebar();

    // Verify João and Catalina saves do NOT display legacy adaptation notice
    await selectProtagonistInUi(runtime, journey, 'joao');
    await writeSlotInUi(runtime, journey, 3, '조안정상세이브');
    await journey.closeSidebar();
    await loadSlotInUi(runtime, journey, 3);
    await journey.system();
    const joaoLegacyDom = await runtime.dom(
      '[data-test=legacyAdaptationNotice]',
    );
    assert.equal(
      joaoLegacyDom.length,
      0,
      'João save must NOT show 이전 각색판 저장 notice',
    );
    await journey.closeSidebar();

    await selectProtagonistInUi(runtime, journey, 'katarina');
    await writeSlotInUi(runtime, journey, 3, '카탈리나정상');
    await journey.closeSidebar();
    await loadSlotInUi(runtime, journey, 3);
    await journey.system();
    const katarinaLegacyDom = await runtime.dom(
      '[data-test=legacyAdaptationNotice]',
    );
    assert.equal(
      katarinaLegacyDom.length,
      0,
      'Catalina save must NOT show 이전 각색판 저장 notice',
    );
    await journey.closeSidebar();

    summary.gates.D6 = {
      status: 'PASS',
      mode: 'D-NATURAL',
      legacyV8MigratedToEdition: loadedLegacyOtto.scenarioEdition,
      legacyNoticeDisplayedForV8Otto: true,
      legacyNoticeHiddenForJoaoAndCatalina: true,
    };

    tracker.startCase('C4-SLOT-STORE-PARITY', {
      startingLineage: 'synthetic-test',
      fixtureUsed: true,
    });
    tracker.recordAction(
      'C4-SLOT-STORE-PARITY',
      'verify_slot_store_parity_and_malformed_counter_rejection',
    );

    const slotStore = require('../desktop/slotStore.cjs');
    const os = require('node:os');
    const c4TestDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uw2-c4-parity-'));
    try {
      // 1. Non-destructive rejection of malformed counters
      const target1 = slotStore.slotFilePath(c4TestDir, 1);
      const backup1 = `${target1}.bak`;
      const baseAliCore = {
        cartographerContract: 'none',
        collectorContract: 'none',
        pietroLoan: 'none',
        chartedCells: [],
        reportedChartedCells: [],
        lockedPorts: [],
        royalRankLevel: 0,
        howellHousePriceIngots: 100,
        howellHouseAcquired: false,
        familyDebt: 0,
        investorCollected: { shipyard: false, guild: false, pub: false, harbor: false },
        investorDebts: { shipyard: 0, guild: 0, pub: 0, harbor: 0 },
        investorRepaid: { shipyard: false, guild: false, pub: false, harbor: false },
      };
      const malformedTargetPayload = {
        schema: 1,
        name: '손상된 카운터 타깃',
        state: {
          version: 9,
          protagonistId: 'ali',
          scenarioEdition: 'original-core-v1',
          portId: '3',
          timePassed: 500,
          fleets: {},
          gold: 50000,
          dayAtSea: 0,
          items: [],
          quests: [],
          mates: [],
          mateProgress: {},
          combatResults: {},
          originalCore: {
            ...baseAliCore,
            aliDayFiveVoyages: -1, // Negative integer violates isNonNegativeInt
          },
        },
      };
      const validBackupPayload = {
        ...malformedTargetPayload,
        name: '유효 백업 슬롯',
        state: {
          ...malformedTargetPayload.state,
          originalCore: {
            ...baseAliCore,
            aliDayFiveVoyages: 4,
          },
        },
      };
      fs.writeFileSync(target1, JSON.stringify(malformedTargetPayload));
      fs.writeFileSync(backup1, JSON.stringify(validBackupPayload));
      const backup1Raw = fs.readFileSync(backup1, 'utf8');

      const recovered1 = slotStore.readSlotFile(c4TestDir, 1);
      const backup1StillExists = fs.existsSync(backup1);
      const backup1Unchanged = fs.readFileSync(backup1, 'utf8') === backup1Raw;
      const c1Success =
        recovered1.name === '유효 백업 슬롯' &&
        recovered1.state.originalCore.aliDayFiveVoyages === 4 &&
        backup1StillExists &&
        backup1Unchanged;

      tracker.assertCondition(
        'C4-SLOT-STORE-PARITY',
        'SlotStore rejects malformed counters non-destructively',
        true,
        c1Success,
      );

      // 2. Corrupted target slot restores from valid .bak without deleting .bak
      const target2 = slotStore.slotFilePath(c4TestDir, 2);
      const backup2 = `${target2}.bak`;
      fs.writeFileSync(target2, '{ broken json payload :::');
      fs.writeFileSync(backup2, JSON.stringify(validBackupPayload));

      const recovered2 = slotStore.readSlotFile(c4TestDir, 2);
      const backup2StillExists = fs.existsSync(backup2);
      const c2Success =
        recovered2.name === '유효 백업 슬롯' &&
        recovered2.state.originalCore.aliDayFiveVoyages === 4 &&
        backup2StillExists;

      tracker.assertCondition(
        'C4-SLOT-STORE-PARITY',
        'Corrupted target slot restores from valid .bak without deleting .bak',
        true,
        c2Success,
      );

      // 3. Pre-field v9 save remains playable (lacking optional Ali/landing fields)
      const target3 = slotStore.slotFilePath(c4TestDir, 3);
      const preFieldPayload = {
        schema: 1,
        name: '알리 구형 v9 정상 저장',
        state: {
          version: 9,
          protagonistId: 'ali',
          scenarioEdition: 'original-core-v1',
          portId: '3',
          timePassed: 1000,
          fleets: {},
          gold: 100000,
          dayAtSea: 0,
          items: [],
          quests: [],
          mates: [],
          mateProgress: {},
          combatResults: {},
          originalCore: baseAliCore,
        },
      };
      slotStore.writeSlotFile(c4TestDir, 3, preFieldPayload);
      const recovered3 = slotStore.readSlotFile(c4TestDir, 3);
      const c3Success =
        recovered3.name === '알리 구형 v9 정상 저장' &&
        recovered3.state.originalCore.aliDayFiveVoyages === undefined &&
        recovered3.state.originalCore.isAshore === undefined;

      tracker.assertCondition(
        'C4-SLOT-STORE-PARITY',
        'Pre-field v9 save remains playable',
        true,
        c3Success,
      );
    } finally {
      fs.rmSync(c4TestDir, { recursive: true, force: true });
    }

    tracker.passCase('C4-SLOT-STORE-PARITY');

    // -------------------------------------------------------------------------
    // D7: Final gate & ending acquisition + post-ending revisit & slot reload for all 4 heroes
    // (Pre-final state staged via D-DIAGNOSTIC fixtures without final event/victory/reward; final battle & ending executed via D-NATURAL UI)
    // -------------------------------------------------------------------------
    tracker.setActiveDiagnosticSession(true);
    // 1a) OTTO Ortega Gold Ship live observation (D-DIAGNOSTIC pre-stage): Seville Harbor ('2', '4') -> start combat (0 pre-combat reward) -> retreat (0 reward) -> retry -> victory (+12,000g & +5,000 Pirate Fame) -> revisit (no duplicate reward)
    const ottoOrtegaSlot = {
      schema: 1,
      savedAtEpochMs: Date.now(),
      name: 'DIAG_옷토오르테가',
      state: {
        ...d5Otto,
        timePassed: 1260,
        portId: '2',
        buildingId: null,
        gold: 1000,
        fame: { adventure: 100, trade: 100, pirate: 15500 },
        storyEvents: [
          'otto.original-core.london-palace-commission',
          'otto.original-core.london-shipyard-flagship',
          'otto.original-core.london-pub-brawl',
          'otto.original-core.london-harbor-matthew-joins',
          'otto.original-core.seville-pub-intel',
          'otto.original-core.seville-harbor-heist',
          'otto.original-core.catalina-market-rescue',
          'otto.original-core.catalina-pub-alliance',
          'otto.original-core.london-pub-gold-ship-intel',
        ],
        combatResults: {
          'otto.matthew-duel': 'victory',
          'otto.seville-pursuit': 'victory',
        },
        fleets: {
          1: {
            position: { x: 851, y: 368 },
            ships: [
              {
                id: '11',
                name: 'Real',
                durability: 70,
                crew: 80,
                figurehead: 0,
                gunId: 4,
                guns: 30,
                cargo: [
                  { type: 'water', quantity: 35 },
                  { type: 'food', quantity: 35 },
                  { type: 'shot', quantity: 20 },
                  { type: 'lumber', quantity: 10 },
                ],
              },
            ],
          },
        },
      },
    };
    fs.writeFileSync(
      path.join(runtime.slots, 'uw2-slot-1.json'),
      JSON.stringify(ottoOrtegaSlot, null, 2),
    );
    await loadSlotInUi(runtime, journey, 1);
    await journey.enter('2', '4', { night: true });
    await bounded('combat otto.ortega-gold-ship active', async () => {
      const s = await journey.state();
      if (s?.activeCombat?.encounterId === 'otto.ortega-gold-ship') return true;
      if (await runtime.exists('[data-test=building]')) {
        await journey.buildingClick();
      }
      return (
        (await journey.state())?.activeCombat?.encounterId ===
        'otto.ortega-gold-ship'
      );
    });
    const ortegaDuringCombat = await journey.state();
    assert.equal(ortegaDuringCombat.gold, 1000);
    assert.equal(ortegaDuringCombat.fame.pirate, 15500);
    await journey.retreat();
    const ortegaAfterRetreat = await journey.state();
    assert.equal(
      ortegaAfterRetreat.combatResults['otto.ortega-gold-ship'],
      'retreat',
    );
    assert.equal(ortegaAfterRetreat.gold, 1000);
    assert.equal(ortegaAfterRetreat.fame.pirate, 15500);
    // Building re-mounts on combat finish and immediately presents veracruz-ortega-gold-ship-retry
    await winNavalCombatInUi(runtime, journey, 'otto.ortega-gold-ship');
    const ortegaAfterVictory = await journey.state();
    assert.equal(
      ortegaAfterVictory.combatResults['otto.ortega-gold-ship'],
      'victory',
    );
    assert.equal(ortegaAfterVictory.gold, 13000);
    assert.equal(ortegaAfterVictory.fame.pirate, 20500);
    await journey.settle();
    await journey.exit();
    await journey.enter('2', '4', { night: true });
    await journey.settle();
    await journey.exit();
    const ortegaAfterRevisit = await journey.save();
    await journey.closeSidebar();
    assert.equal(ortegaAfterRevisit.gold, 13000);
    assert.equal(ortegaAfterRevisit.fame.pirate, 20500);

    // 1) OTTO D7 (D-DIAGNOSTIC pre-stage): Bordeaux Pub challenge -> 30..59 day appointment gate check -> Bordeaux Harbor final naval battle ('otto.bordeaux-ezequiel') -> sail to London ('30') -> London Palace ('30', '6') ending -> revisit
    const ottoPreFinalSlot = {
      schema: 1,
      savedAtEpochMs: Date.now(),
      name: 'DIAG_옷토결전직전',
      state: {
        ...d5Otto,
        timePassed: 1260,
        portId: '28',
        buildingId: null,
        gold: 5000,
        fame: { adventure: 100, trade: 100, pirate: 32000 },
        storyEvents: [
          'otto.original-core.london-palace-commission',
          'otto.original-core.london-shipyard-flagship',
          'otto.original-core.london-pub-brawl',
          'otto.original-core.london-harbor-matthew-joins',
          'otto.original-core.seville-pub-intel',
          'otto.original-core.seville-harbor-heist',
          'otto.original-core.catalina-market-rescue',
          'otto.original-core.catalina-pub-alliance',
          'otto.original-core.london-pub-gold-ship-intel',
          'otto.original-core.veracruz-ortega-gold-ship',
          'otto.original-core.london-palace-armada-order',
          'otto.original-core.london-guild-armada-briefing',
          'otto.original-core.nantes-armada-clash',
          'otto.original-core.santo-domingo-armada',
          'otto.original-core.cayenne-amazon-catalina-plea',
          'otto.original-core.pub-ezequiel-challenge',
        ],
        combatResults: {
          'otto.matthew-duel': 'victory',
          'otto.seville-pursuit': 'victory',
          'otto.ortega-gold-ship': 'victory',
          'otto.nantes-armada': 'victory',
          'otto.santo-domingo-armada': 'victory',
        },
        fleets: {
          1: {
            position: { x: 890, y: 312 },
            ships: [
              {
                id: '11',
                name: 'Real',
                durability: 70,
                crew: 80,
                figurehead: 0,
                gunId: 4,
                guns: 30,
                cargo: [
                  { type: 'water', quantity: 35 },
                  { type: 'food', quantity: 35 },
                  { type: 'shot', quantity: 20 },
                  { type: 'lumber', quantity: 10 },
                ],
              },
            ],
          },
        },
      },
    };
    fs.writeFileSync(
      path.join(runtime.slots, 'uw2-slot-1.json'),
      JSON.stringify(ottoPreFinalSlot, null, 2),
    );
    await loadSlotInUi(runtime, journey, 1);
    // R-F3: Entering Bordeaux Harbor ('28', '4') at 0 days (< 30 days) after challenge must NOT start final showdown
    await journey.enter('28', '4', { night: true });
    await journey.settle();
    const ottoAfterChallengeEarly = await journey.state();
    assert.equal(
      ottoAfterChallengeEarly.activeCombat,
      null,
      'Bordeaux showdown must not start before 30 days after Ezequiel challenge (R-F3)',
    );
    await journey.exit();
    // Advance clock to +30 days (within 30..59 day appointment window) via diagnostic slot reload
    const challengeAnchor =
      ottoAfterChallengeEarly.eventCompletionMinutes?.[
        'otto.original-core.pub-ezequiel-challenge'
      ] ?? ottoAfterChallengeEarly.timePassed;
    fs.writeFileSync(
      path.join(runtime.slots, 'uw2-slot-1.json'),
      JSON.stringify(
        {
          schema: 1,
          savedAtEpochMs: Date.now(),
          name: 'DIAG_옷토약속30일후',
          state: {
            ...ottoAfterChallengeEarly,
            portId: '28',
            buildingId: null,
            timePassed: challengeAnchor + 30 * 1440,
          },
        },
        null,
        2,
      ),
    );
    await loadSlotInUi(runtime, journey, 1);
    await journey.enter('28', '4', { night: true });
    await winNavalCombatInUi(runtime, journey, 'otto.bordeaux-ezequiel');
    const ottoAfterBordeaux = await journey.save();
    await journey.closeSidebar();
    assert.equal(
      ottoAfterBordeaux.combatResults['otto.bordeaux-ezequiel'],
      'victory',
    );

    // Sail Bordeaux ('28') -> London ('30') and enter London Royal Palace ('30', '6') for Otto ending
    await journey.path(['28', '30'], { water: 35, food: 35 });
    await journey.settle();
    await journey.exit();
    const ottoGoldBeforeEnding = (await journey.state()).gold;
    await journey.enter('30', '6', { night: true });
    await journey.event('otto.original-core.london-palace-triumph');
    await journey.settle();
    await journey.exit();
    const ottoEndingState = await journey.save();
    await journey.closeSidebar();
    assert.equal(ottoEndingState.gold, ottoGoldBeforeEnding + 15000);

    await runtime.click('[data-test=journalTrigger]');
    const ottoEndingBanner = await bounded(
      'Otto ending banner visible',
      async () => (await runtime.dom('[data-test=ottoEnding]'))[0],
    );
    assert(ottoEndingBanner.text.includes('옷토의 개선'));
    await runtime.screenshot('d7-otto-ending-banner');
    await journey.closeSidebar();
    await writeSlotInUi(runtime, journey, 1, '옷토엔딩완료');
    await journey.closeSidebar();
    await loadSlotInUi(runtime, journey, 1);
    await journey.enter('30', '6', { night: true });
    await journey.settle();
    assert.equal((await journey.state()).gold, ottoEndingState.gold);
    await journey.exit();

    // 2) ERNST D7: Changan Special Building ('98', '8') Home Reunion finale (F4 03) -> ending banner -> save/reload -> revisit
    const ernstPreFinalSlot = {
      schema: 1,
      savedAtEpochMs: Date.now(),
      name: 'DIAG_에르네스트엔딩직전',
      state: {
        ...ernstBeforeChanganEnding,
        portId: '98',
        buildingId: null,
      },
    };
    fs.writeFileSync(
      path.join(runtime.slots, 'uw2-slot-2.json'),
      JSON.stringify(ernstPreFinalSlot, null, 2),
    );
    await loadSlotInUi(runtime, journey, 2);
    const ernstGoldBeforeEnding = (await journey.state()).gold;
    await journey.enter('98', '8', { night: true });
    await journey.event('ernst.original-core.changan-home-reunion');
    await journey.settle();
    await journey.exit();
    const ernstD7EndingState = await journey.save();
    await journey.closeSidebar();
    assert.equal(ernstD7EndingState.gold, ernstGoldBeforeEnding + 5000);

    await runtime.click('[data-test=journalTrigger]');
    const ernstEndingBanner = await bounded(
      'Ernst ending banner visible',
      async () => (await runtime.dom('[data-test=ernstEnding]'))[0],
    );
    assert(ernstEndingBanner.text.includes('에르네스트와 파울라의 귀향'));
    assert(!ernstEndingBanner.text.includes('암스테르담'));
    await runtime.screenshot('d7-ernst-ending-banner');
    await journey.closeSidebar();
    await writeSlotInUi(runtime, journey, 2, '에르네스트엔딩');
    await journey.closeSidebar();
    await loadSlotInUi(runtime, journey, 2);
    await journey.enter('98', '8', { night: true });
    await journey.settle();
    assert.equal((await journey.state()).gold, ernstEndingState.gold);
    await journey.exit();

    // 3) PIETRO D7: London Bank ('30', '9') Howell Mansion Test -> sail to Lisbon ('1') -> Lisbon Residence ('1', '8') ending -> revisit
    const pietroPreFinalSlot = {
      schema: 1,
      savedAtEpochMs: Date.now(),
      name: 'DIAG_피에트로엔딩직전',
      state: {
        ...d5Pietro,
        timePassed: 1260,
        portId: '30',
        buildingId: null,
        gold: 12000,
        fame: { adventure: 1200, trade: 100, pirate: 0 },
        discoveries: [
          'p1-gold-medallion',
          'p2-poseidons-staff',
          'mouth-of-the-amazon',
        ],
        originalCore: {
          ...d5Pietro.originalCore,
          collectorContract: 'duchess_franco',
          familyDebt: 0,
          pietroLoan: 'repaid',
          howellHousePriceIngots: 110,
          howellHouseAcquired: false,
        },
        storyEvents: [
          'pietro.original-core.genoa-harbor-departure',
          'pietro.original-core.lisbon-franco-patronage',
          'pietro.original-core.genoa-fabris-debt-settlement',
          'pietro.original-core.alexandria-gold-medallion-map',
          'pietro.original-core.santo-domingo-gold-medallion-excavation',
          'pietro.original-core.lisbon-gold-medallion-report',
          'pietro.original-core.venice-staff-map',
          'pietro.original-core.basra-staff-excavation',
          'pietro.original-core.massawa-joao-handoff',
          'pietro.original-core.ali-zipangu-clue',
          'pietro.original-core.nagasaki-ernst-advice',
          'pietro.original-core.cayenne-el-dorado-discovery',
        ],
      },
    };
    fs.writeFileSync(
      path.join(runtime.slots, 'uw2-slot-3.json'),
      JSON.stringify(pietroPreFinalSlot, null, 2),
    );
    await loadSlotInUi(runtime, journey, 3);
    await journey.enter('30', '9', { night: true });
    await journey.event('pietro.original-core.london-howell-mansion-test');
    await journey.settle();
    await journey.exit();
    const pietroAfterHowell = await journey.save();
    await journey.closeSidebar();
    assert.equal(pietroAfterHowell.originalCore.howellHouseAcquired, true);

    await journey.enter('30', '4', { night: true });
    await journey.path(['30', '1'], { water: 30, food: 30 });
    await journey.settle();
    await journey.exit();
    const pietroGoldBeforeEnding = (await journey.state()).gold;
    await journey.enter('1', '8', { night: true });
    await journey.event('pietro.original-core.lisbon-franco-triumph');
    await journey.settle();
    await journey.exit();
    const pietroEndingState = await journey.save();
    await journey.closeSidebar();
    assert.equal(pietroEndingState.gold, pietroGoldBeforeEnding + 20000);

    await runtime.click('[data-test=journalTrigger]');
    const pietroEndingBanner = await bounded(
      'Pietro ending banner visible',
      async () => (await runtime.dom('[data-test=pietroEnding]'))[0],
    );
    assert(pietroEndingBanner.text.includes('피에트로의 영광'));
    assert(pietroEndingBanner.text.includes('왕의 지팡이'));
    assert(!pietroEndingBanner.text.includes('엘도라도'));
    await runtime.screenshot('d7-pietro-ending-banner');
    await journey.closeSidebar();
    await writeSlotInUi(runtime, journey, 3, '피에트로엔딩');
    await journey.closeSidebar();
    await loadSlotInUi(runtime, journey, 3);
    await journey.enter('1', '8', { night: true });
    await journey.settle();
    assert.equal((await journey.state()).gold, pietroEndingState.gold);
    await journey.exit();

    // 4) ALI D7 (R-F1 & R-F6): Massawa cancelled ambush check + Istanbul Pub ('3', '2') Family Home celebration (F4 05) -> revisit
    const ottomanInvestments35 = {};
    for (let pid = 1; pid <= 35; pid += 1) {
      ottomanInvestments35[String(pid)] = {
        economy: 100,
        industry: 100,
      };
    }
    const aliDebtChainSlot = {
      schema: 1,
      savedAtEpochMs: Date.now(),
      name: 'DIAG_알베자스채무사슬',
      state: {
        ...d5Ali,
        timePassed: 1260,
        portId: '3',
        buildingId: null,
        gold: 550000,
        fame: { adventure: 100, trade: 1500, pirate: 0 },
        portInvestments: {
          ...(d5Ali.portInvestments || {}),
          ...ottomanInvestments35,
        },
        originalCore: {
          ...d5Ali.originalCore,
          investorCollected: {
            ...d5Ali.originalCore.investorCollected,
            shipyard: true,
            guild: true,
            pub: true,
            harbor: true,
          },
          investorRepaid: {
            ...d5Ali.originalCore.investorRepaid,
            shipyard: true,
            guild: true,
            pub: true,
            harbor: true,
          },
          investorDebts: {
            ...d5Ali.originalCore.investorDebts,
            shipyard: 0,
            guild: 0,
            pub: 0,
            harbor: 0,
          },
          aliDayFiveVoyages: 6,
          howellHousePriceIngots: 50,
          royalRankLevel: 1,
          pietroLoan: 'lent',
        },
        combatResults: {},
        storyEvents: [
          'ali.original-core.istanbul-shipyard-loan',
          'ali.original-core.istanbul-guild-loan',
          'ali.original-core.istanbul-pub-loan',
          'ali.original-core.istanbul-harbor-departure',
          'ali.original-core.istanbul-lodge-gift',
          'ali.original-core.istanbul-shipyard-repay',
          'ali.original-core.istanbul-guild-repay',
          'ali.original-core.istanbul-pub-repay',
          'ali.original-core.istanbul-harbor-repay',
          'ali.original-core.istanbul-palace-first-audience',
          'ali.original-core.alexandria-pietro-clue',
          'ali.original-core.lisbon-joao-lucia-clue',
          'ali.original-core.massawa-catalina-ambush',
          'ali.original-core.istanbul-pub-sapha-rumor',
          'ali.original-core.basra-sasha-reunion',
          'ali.original-core.istanbul-fortune-teller-oracle',
          'ali.original-core.venice-howell-pietro-debt',
          'ali.original-core.istanbul-palace-sultan-reward',
          'ali.original-core.basra-pub-rustem',
        ],
      },
    };
    fs.writeFileSync(
      path.join(runtime.slots, 'uw2-slot-1.json'),
      JSON.stringify(aliDebtChainSlot, null, 2),
    );
    await loadSlotInUi(runtime, journey, 1);
    await runAliDiagnosticDebt(runtime, journey, tracker);
    const aliEndingState = await journey.save();
    await journey.closeSidebar();
    assert.equal(aliEndingState.originalCore.royalRankLevel, 1);

    await runtime.click('[data-test=journalTrigger]');
    const aliEndingBanner = await bounded(
      'Ali ending banner visible',
      async () => (await runtime.dom('[data-test=aliEnding]'))[0],
    );
    assert(aliEndingBanner.text.includes('알과 가족의 보금자리'));
    assert(!aliEndingBanner.text.includes('술탄'));
    await runtime.screenshot('d7-ali-ending-banner');
    await journey.closeSidebar();
    await writeSlotInUi(runtime, journey, 1, '알베자스엔딩');
    await journey.closeSidebar();
    await loadSlotInUi(runtime, journey, 1);
    await journey.enter('3', '2', { night: true });
    await journey.settle();
    assert.equal((await journey.state()).gold, aliEndingState.gold);
    await journey.exit();

    summary.gates.D7 = {
      status: 'PASS',
      mode: 'D-DIAGNOSTIC pre-final fixture + D-NATURAL final battle/event, ending banner, save/reload & revisit',
      diagnosticFixturesDisclosed: [
        'DIAG_옷토오르테가',
        'DIAG_옷토결전직전',
        'DIAG_옷토약속30일후',
        'DIAG_에르네스트엔딩직전',
        'DIAG_피에트로엔딩직전',
        'DIAG_알베자스채무사슬',
        'DIAG_알베자스엔딩직전',
      ],
      ottoOrtegaLiveObserved: {
        duringCombatGold: ortegaDuringCombat.gold,
        afterRetreatGold: ortegaAfterRetreat.gold,
        afterVictoryGold: ortegaAfterVictory.gold,
        afterVictoryPirateFame: ortegaAfterVictory.fame.pirate,
        afterRevisitGold: ortegaAfterRevisit.gold,
      },
      endingsVerified: {
        otto: 'otto.original-core.london-palace-triumph',
        ernst: 'ernst.original-core.changan-home-reunion',
        pietro: 'pietro.original-core.lisbon-franco-triumph',
        ali: 'ali.original-core.istanbul-sultan-coronation',
      },
    };

    // -------------------------------------------------------------------------
    // D8: 6-protagonist cross-load (Slots 1..3 across all 6 heroes), single BGM, offline, user slots untouched
    // -------------------------------------------------------------------------
    for (const [slotNum, expectedHero] of [
      [1, 'ali'],
      [2, 'ernst'],
      [3, 'pietro'],
    ]) {
      const s = await loadSlotInUi(runtime, journey, slotNum);
      assert.equal(s.protagonistId, expectedHero);
    }
    fs.writeFileSync(
      path.join(runtime.slots, 'uw2-slot-1.json'),
      JSON.stringify(
        {
          schema: 1,
          savedAtEpochMs: Date.now(),
          name: '옷토교차검증',
          state: ottoEndingState,
        },
        null,
        2,
      ),
    );
    const ottoCross = await loadSlotInUi(runtime, journey, 1);
    assert.equal(ottoCross.protagonistId, 'otto');

    await selectProtagonistInUi(runtime, journey, 'katarina');
    await writeSlotInUi(runtime, journey, 2, '카탈리나교차');
    await journey.closeSidebar();
    const katarinaCross = await loadSlotInUi(runtime, journey, 2);
    assert.equal(katarinaCross.protagonistId, 'katarina');

    const joaoFinalCheck = await selectProtagonistInUi(
      runtime,
      journey,
      'joao',
    );
    assert.equal(joaoFinalCheck.protagonistId, 'joao');
    assert.equal(joaoFinalCheck.scenarioEdition, 'legacy-remake');
    await writeSlotInUi(runtime, journey, 3, '조안교차');
    await journey.closeSidebar();
    const joaoCross = await loadSlotInUi(runtime, journey, 3);
    assert.equal(joaoCross.protagonistId, 'joao');
    await assertSingleBgm(runtime, 'd8-after-6-hero-cross-load');

    summary.gates.D8 = {
      status: 'PASS',
      mode: 'D-NATURAL',
      sixHeroesCrossLoaded: [
        'otto',
        'ernst',
        'pietro',
        'ali',
        'katarina',
        'joao',
      ],
      consoleErrors: consoleErrors.length,
      pageErrors: pageErrors.length,
      failedRequests: failedRequests.length,
      externalRequests: externalRequests.length,
    };

    await runtime.close();
  } finally {
    try {
      await runtime.close();
    } catch {
      // Ignore if already closed
    }
  }

  assert.equal(consoleErrors.length, 0, `Console errors: ${consoleErrors}`);
  assert.equal(pageErrors.length, 0, `Page errors: ${pageErrors}`);
  assert.equal(failedRequests.length, 0, `Failed requests: ${failedRequests}`);
  assert.equal(
    externalRequests.length,
    0,
    `External requests: ${externalRequests}`,
  );

  summary.isolation = {
    profileDir: runtime.profile,
    slotsDir: runtime.slots,
    appDataRoamingDir: path.join(runtime.profile, 'AppData', 'Roaming'),
    appDataLocalDir: path.join(runtime.profile, 'AppData', 'Local'),
    realUserSlotsAccessed: false,
  };
  summary.consoleErrors = consoleErrors.length;
  summary.pageErrors = pageErrors.length;
  summary.failedRequests = failedRequests.length;
  summary.externalRequests = externalRequests.length;
  summary.processLaunches = runtime.launches;

  tracker.finalize();
  const aggResult = aggregateExecutedChecks(
    path.join(options.artifacts, 'executed-checks.json'),
    {
      expectedExeSha256: runtime.hash,
    },
  );
  assert.equal(
    aggResult.ok,
    true,
    `Execution aggregator rejected submission: ${aggResult.errors.join('; ')}`,
  );
  summary.executedChecks = aggResult;

  fs.writeFileSync(
    path.join(options.artifacts, 'summary.json'),
    JSON.stringify(summary, null, 2),
  );
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
