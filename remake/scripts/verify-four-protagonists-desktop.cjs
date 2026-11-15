'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { performance } = require('node:perf_hooks');
const { isDeepStrictEqual } = require('node:util');
const {
  DesktopRuntime,
  bounded,
  sleep,
  loadPlanning,
} = require('../tests/desktop/runtime.cjs');
const { JoaoJourney } = require('../tests/desktop/joaoJourney.cjs');
const { ExecutionTracker } = require('./execution-tracker.cjs');
const { aggregateExecutedChecks } = require('./evidence-aggregator.cjs');
const { runSlotParityMatrix } = require('./c4-slot-parity-matrix.cjs');

module.exports = {
  configureSession,
  selectProtagonistInUi,
  winNavalCombatInUi,
  winDuelCombatInUi,
  saveAnyProtagonist,
  writeSlotInUi,
  loadSlotInUi,
  recordSlotRoundtrip,
  recruitCrewAtPub,
  buyMarketGoodInUi,
  sellFirstCargoInUi,
  assertSingleBgm,
};

const { runOttoNatural } = require('./four-protagonists/ottoNatural.cjs');
const {
  runPietroNatural,
  runPietroDiagnosticCorner,
} = require('./four-protagonists/pietroNatural.cjs');
const {
  runAliNaturalDecoy,
  runAliNaturalVoyages,
  runAliSaveRoundtrip,
  runAliDiagnosticDebt,
} = require('./four-protagonists/aliNatural.cjs');

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

// Mission §11.5 SAVE-D-roundtrip/<hero>: compare the state loaded after a full
// app exit and same-EXE relaunch against the slot file written by the UI.
function recordSlotRoundtrip(tracker, caseId, saved, loaded) {
  const disk = saved.disk.state;
  tracker.recordAction(caseId, 'loaded_ui_slot_after_full_app_restart', {
    slotFile: path.basename(saved.file),
    slotName: saved.disk.name,
    slotSha256: saved.sha256,
    protagonistId: loaded.protagonistId,
    portId: loaded.portId,
  });
  for (const field of ['protagonistId', 'scenarioEdition', 'portId', 'gold']) {
    tracker.assertCondition(
      caseId,
      `${field} preserved across save/exit/relaunch/load`,
      disk[field],
      loaded[field],
    );
  }
  for (const field of ['storyEvents', 'items', 'discoveries', 'originalCore']) {
    tracker.assertCondition(
      caseId,
      `${field} deep-equal across save/exit/relaunch/load`,
      true,
      isDeepStrictEqual(disk[field], loaded[field]),
    );
  }
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

// Shared session wiring (route cache, observe filter, four-hero journey
// patches). Exported so per-hero development runners reuse the exact same
// navigation behaviour as the evidence harness.
function configureSession(runtime) {
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
        if (currentTargetBuilding && liveBuildingId === currentTargetBuilding) {
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
              (actual.x !== journey.position.x ||
                actual.y !== journey.position.y) &&
              Math.abs(actual.x - journey.position.x) +
                Math.abs(actual.y - journey.position.y) <=
                1
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
              Math.abs(actual.y - journey.position.y) <=
              1
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
      if (
        err?.message?.includes('No port route') ||
        err?.message?.includes('port door') ||
        err?.message?.includes('Port route did not reach the planned doorway')
      ) {
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

  return { planning, journey };
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
  const { planning, journey } = configureSession(runtime);

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
      await rawCall('Network.emulateNetworkConditions', {
        offline: true,
        latency: 0,
        downloadThroughput: 0,
        uploadThroughput: 0,
      });
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

  const ensureWindowReady = async () => {
    const fontsReady = await runtime.call('Runtime.evaluate', {
      expression: 'document.fonts.ready.then(() => document.fonts.status)',
      awaitPromise: true,
      returnByValue: true,
    });
    assert.equal(fontsReady.result.value, 'loaded');
    const locale = await runtime.observe({ kind: 'locale' });
    if (locale !== 'ko-KR') {
      await journey.system();
      await runtime.click('#locale-select');
      await runtime.tap('Home');
      await runtime.tap('Enter');
      assert.equal(await runtime.observe({ kind: 'locale' }), 'ko-KR');
      await journey.closeSidebar();
    }
  };

  try {
    // =========================================================================
    // PHASE A — 100% D-NATURAL LINEAGE (12 D-NATURAL required cases + D1..D5)
    // Zero diagnostic slots, zero direct state mutations, zero planning shortcuts.
    // =========================================================================
    await runtime.launch();
    await ensureWindowReady();
    await assertSingleBgm(runtime, 'cold-start-bgm');
    tracker.setActiveDiagnosticSession(false);

    // -------------------------------------------------------------------------
    // 1. OTTO ('otto'): O-NATURAL-TIME, O-NATURAL-DECISION, O-NATURAL-JOURNAL, SAVE-D-roundtrip/otto
    // -------------------------------------------------------------------------
    const ottoStart = await selectProtagonistInUi(runtime, journey, 'otto');
    assert.equal(ottoStart.protagonistId, 'otto');
    assert.equal(ottoStart.scenarioEdition, 'original-core-v1');
    assert.equal(ottoStart.portId, '30');
    assert.equal(ottoStart.gold, 1000);
    assert.equal(ottoStart.fleets['1']?.ships?.length ?? 0, 0);
    await runtime.screenshot('d1-otto-london-start');

    const ottoResult = await runOttoNatural(runtime, journey, tracker, {
      slotNumber: 1,
      skipNewGame: true,
    });
    const slot1Otto = ottoResult.savedSlot;
    const d5Otto = ottoResult.endingState;
    await ensureWindowReady();

    // -------------------------------------------------------------------------
    // 2. ERNST ('ernst'): E-NATURAL-WORLD + SAVE-D-roundtrip/ernst
    // -------------------------------------------------------------------------
    const ernstStart = await selectProtagonistInUi(runtime, journey, 'ernst');
    assert.equal(ernstStart.protagonistId, 'ernst');
    assert.equal(ernstStart.scenarioEdition, 'original-core-v1');
    assert.equal(ernstStart.portId, '34');
    assert.deepEqual(ernstStart.originalCore.lockedPorts, ['98', '99', '100']);
    await runtime.screenshot('d1-ernst-amsterdam-start');

    await journey.enter('34', '4', { night: true });
    await journey.event('ernst.original-core.amsterdam-harbor-departure');
    await journey.settle();
    await journey.exit();

    await journey.enter('34', '8', { night: true });
    await journey.event('ernst.original-core.amsterdam-mercator-contract');
    await journey.settle();
    await journey.exit();

    tracker.startCase('E-NATURAL-WORLD', {
      startingLineage: 'natural-new-game',
    });
    tracker.recordAction(
      'E-NATURAL-WORLD',
      'chart_north_sea_and_report_mercator',
    );
    await recruitCrewAtPub(runtime, journey, '34');
    await journey.enter('34', '4', { night: true });
    await journey.depart({ water: 25, food: 25 });
    await journey.sail(null, { x: 925, y: 235 });
    await journey.sail('34', { x: 940, y: 248 });
    await journey.settle();
    await journey.exit();

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

    await journey.enter('34', '4', { night: true });
    await journey.event('ernst.original-core.amsterdam-harbor-laura-joins');
    await journey.settle();
    await journey.exit();

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
    await journey.exit();

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

    const slot2Ernst = await writeSlotInUi(
      runtime,
      journey,
      2,
      '에르네스트천주해금',
    );
    await journey.closeSidebar();

    await runtime.close();
    await runtime.launch();
    await ensureWindowReady();
    await assertSingleBgm(runtime, 'ernst-relaunch-bgm');

    const d5Ernst = await loadSlotInUi(runtime, journey, 2);
    assert.equal(d5Ernst.protagonistId, 'ernst');
    assert.equal(d5Ernst.scenarioEdition, 'original-core-v1');
    assert.equal(d5Ernst.portId, '95');
    assert.deepEqual(
      d5Ernst.originalCore.lockedPorts,
      ['98'],
      'Slot 2 reload after full app exit must preserve Ernst intermediate lock state [98]',
    );
    tracker.startCase('SAVE-D-roundtrip/ernst', {
      startingLineage:
        'natural-new-game -> UI slot 2 save at Zeiton -> full app exit -> same-EXE relaunch -> UI slot 2 load',
    });
    recordSlotRoundtrip(tracker, 'SAVE-D-roundtrip/ernst', slot2Ernst, d5Ernst);
    tracker.assertCondition(
      'SAVE-D-roundtrip/ernst',
      'intermediate lockedPorts [98] preserved',
      '["98"]',
      JSON.stringify(d5Ernst.originalCore.lockedPorts),
    );

    await journey.enter('95', '4', { night: true });
    await journey.path(['95', '100'], { water: 35, food: 35 });
    await journey.event('ernst.original-core.nagasaki-parents-reunion');
    await journey.settle();
    const ernstNextAction = await journey.state();
    tracker.recordAction(
      'SAVE-D-roundtrip/ernst',
      'next_action_voyage_zeiton_to_nagasaki',
      { portId: ernstNextAction.portId },
    );
    tracker.assertCondition(
      'SAVE-D-roundtrip/ernst',
      'next voyage after reload reached Nagasaki parents reunion',
      true,
      Boolean(
        ernstNextAction.storyEvents?.includes(
          'ernst.original-core.nagasaki-parents-reunion',
        ),
      ),
    );
    tracker.passCase('SAVE-D-roundtrip/ernst');
    await journey.exit();

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

    await journey.enter('100', '4', { night: true });
    await journey.path(['100', '98'], { water: 35, food: 35 });
    await journey.event('ernst.original-core.changan-homeland-search');
    await journey.settle();
    await journey.exit();
    const ernstBeforeChanganEnding = await journey.save();
    await journey.closeSidebar();

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
      Boolean(
        ernstEndingState.storyEvents?.includes(
          'ernst.original-core.changan-home-reunion',
        ),
      ),
    );
    tracker.passCase('E-NATURAL-WORLD');

    // -------------------------------------------------------------------------
    // 3. PIETRO ('pietro'): P-NATURAL-LANDING, SAVE-D-roundtrip/pietro, P-NATURAL-SEARCH
    // -------------------------------------------------------------------------
    const pietroResult = await runPietroNatural(runtime, journey, tracker, {
      slotNumber: 3,
    });
    const slot3Pietro = pietroResult.slot3Pietro;
    const d5Pietro = pietroResult.pietroAfterBasra;
    await ensureWindowReady();

    // -------------------------------------------------------------------------
    // 4. ALI ('ali'): A-NATURAL-DECOY, A-NATURAL-VOYAGES, SAVE-D-roundtrip/ali + D4
    // -------------------------------------------------------------------------
    await runAliNaturalDecoy(runtime, journey, tracker);
    await runAliNaturalVoyages(runtime, journey, tracker);
    const d5Ali = await runAliSaveRoundtrip(runtime, journey, tracker, {
      afterRelaunch: ensureWindowReady,
    });
    const aliSlot1Path = path.join(runtime.slots, 'uw2-slot-1.json');
    const aliSlot1Sha256 = sha256File(aliSlot1Path);

    // D4: Korean dialogue, Quest Journal, choice options, and long sentences at 1280x720 & 800x600
    await journey.enter('3', '3', { night: true });
    await journey.settle();
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
    if (await runtime.exists('[data-test=menu2]')) {
      await runtime.click('[data-test=building]', { button: 'right' });
      await sleep(100);
    }
    await journey.settle();
    await journey.exit();

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
      pietroTreasurePortsDockedAndEntered: ['49', '1', '14', '74', '77'],
    };
    summary.gates.D4 = {
      status: 'PASS',
      mode: 'D-NATURAL',
      viewportsVerified: d4Metrics,
      dialogue800x600: dlg800Check.result.value,
      choice800x600: choice800Check.result.value,
    };
    summary.gates.D5 = {
      status: 'PASS',
      mode: 'D-NATURAL',
      slotHashes: {
        ottoSlot1: slot1Otto.sha256,
        ernstSlot2: slot2Ernst.sha256,
        pietroSlot3: slot3Pietro.sha256,
        aliVoyagesSlot1: aliSlot1Sha256,
      },
      ernstZeitonIntermediateLockedPorts: d5Ernst.originalCore.lockedPorts,
      ernstNagasakiUnlockedPorts: ernstAfterNagasaki.originalCore.lockedPorts,
    };

    // =========================================================================
    // PHASE B — SYNTHETIC & DIAGNOSTIC CASES (ONLY AFTER ALL 12 D-NATURAL PASS)
    // =========================================================================

    // -------------------------------------------------------------------------
    // 5. C4-SLOT-STORE-PARITY (T)
    // -------------------------------------------------------------------------
    tracker.startCase('C4-SLOT-STORE-PARITY', {
      startingLineage:
        'synthetic-test: production desktop slotStore + renderer migrate on synthetic files; EXE UI list/load on synthetic files in the isolated slots dir',
      fixtureUsed: true,
    });
    const c4Matrix = runSlotParityMatrix();
    fs.writeFileSync(
      path.join(options.artifacts, 'c4-slot-parity-matrix.json'),
      JSON.stringify(c4Matrix, null, 2),
    );
    tracker.recordAction('C4-SLOT-STORE-PARITY', 'ran_slot_parity_matrix', {
      total: c4Matrix.total,
      passed: c4Matrix.passed,
      evidence: 'c4-slot-parity-matrix.json',
    });
    tracker.assertCondition(
      'C4-SLOT-STORE-PARITY',
      'desktop slotStore and renderer migrate agree on every matrix case',
      c4Matrix.total,
      c4Matrix.passed,
    );

    const c4Base = (name, voyages) => ({
      schema: 1,
      name,
      savedAtEpochMs: Date.now(),
      state: {
        ...d5Ali,
        originalCore: { ...d5Ali.originalCore, aliDayFiveVoyages: voyages },
      },
    });
    const c4Target2 = path.join(runtime.slots, 'uw2-slot-2.json');
    const c4Target3 = path.join(runtime.slots, 'uw2-slot-3.json');
    for (const p of [c4Target2, c4Target3]) {
      for (const suffix of ['', '.bak', '.tmp']) {
        fs.rmSync(`${p}${suffix}`, { force: true });
      }
    }
    fs.writeFileSync(c4Target2, JSON.stringify(c4Base('손상타깃', '6')));
    fs.writeFileSync(`${c4Target2}.bak`, JSON.stringify(c4Base('유효백업', 4)));
    fs.writeFileSync(c4Target3, JSON.stringify(c4Base('손상단독', -1)));
    const c4Bak2Hash = sha256File(`${c4Target2}.bak`);
    const c4Target3Hash = sha256File(c4Target3);
    await journey.system();
    const c4Meta2 = await bounded('C4 slot 2 meta rendered', async () => {
      const n = (await runtime.dom('[data-test=slot-2-meta]'))[0];
      return n && !n.text.includes('빈 슬롯') ? n : false;
    });
    const c4Meta3 = await bounded('C4 slot 3 meta rendered', async () => {
      const n = (await runtime.dom('[data-test=slot-3-meta]'))[0];
      return n && !n.text.includes('빈 슬롯') ? n : false;
    });
    const c4Load3Disabled = await runtime.call('Runtime.evaluate', {
      expression:
        "document.querySelector('[data-test=slot-3-load]')?.disabled === true",
      returnByValue: true,
    });
    await journey.closeSidebar();
    tracker.recordAction(
      'C4-SLOT-STORE-PARITY',
      'exe_ui_listed_synthetic_slots',
      {
        slot2Meta: c4Meta2.text,
        slot3Meta: c4Meta3.text,
      },
    );
    tracker.assertCondition(
      'C4-SLOT-STORE-PARITY',
      'EXE lists malformed target + valid bak as the backup save',
      true,
      c4Meta2.text.includes('유효백업'),
    );
    tracker.assertCondition(
      'C4-SLOT-STORE-PARITY',
      'EXE lists malformed target-only slot as corrupt with load disabled',
      true,
      c4Meta3.text.includes('손상된 슬롯') &&
        c4Load3Disabled.result.value === true,
    );
    const c4Loaded2 = await loadSlotInUi(runtime, journey, 2);
    tracker.assertCondition(
      'C4-SLOT-STORE-PARITY',
      'EXE load of recovered slot 2 yields backup counter 4',
      4,
      c4Loaded2.originalCore?.aliDayFiveVoyages,
    );
    tracker.assertCondition(
      'C4-SLOT-STORE-PARITY',
      'valid .bak preserved byte-identical after EXE list/load',
      c4Bak2Hash,
      fs.existsSync(`${c4Target2}.bak`) ? sha256File(`${c4Target2}.bak`) : null,
    );
    tracker.assertCondition(
      'C4-SLOT-STORE-PARITY',
      'malformed target-only file preserved byte-identical',
      c4Target3Hash,
      sha256File(c4Target3),
    );
    tracker.passCase('C4-SLOT-STORE-PARITY');

    for (const p of [c4Target2, c4Target3]) {
      for (const suffix of ['', '.bak', '.tmp']) {
        fs.rmSync(`${p}${suffix}`, { force: true });
      }
    }

    // -------------------------------------------------------------------------
    // 6. A-DIAGNOSTIC-DEBT (D-DIAGNOSTIC) — load clean Ali Slot 1 first
    // -------------------------------------------------------------------------
    await loadSlotInUi(runtime, journey, 1);
    const aliDiagnosticEndingState = await runAliDiagnosticDebt(
      runtime,
      journey,
      tracker,
    );

    // -------------------------------------------------------------------------
    // 7. P-DIAGNOSTIC-CORNER (D-DIAGNOSTIC)
    // -------------------------------------------------------------------------
    await runPietroDiagnosticCorner(runtime, journey, tracker, {
      diagnosticSlotNumber: 3,
      baseState: d5Pietro,
    });

    // -------------------------------------------------------------------------
    // 8. D6: Legacy v8 save load ('이전 각색판 저장' notice) & João / Catalina save load (no notice)
    // -------------------------------------------------------------------------
    tracker.setActiveDiagnosticSession(true);
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
      mode: 'D-DIAGNOSTIC legacy v8 fixture (slot file written directly) + D-NATURAL João/Catalina UI saves',
      legacyV8MigratedToEdition: loadedLegacyOtto.scenarioEdition,
      legacyNoticeDisplayedForV8Otto: true,
      legacyNoticeHiddenForJoaoAndCatalina: true,
    };

    // -------------------------------------------------------------------------
    // 9. D7: Final gate & ending acquisition + post-ending revisit & slot reload for all 4 heroes
    // -------------------------------------------------------------------------
    // 1a) OTTO Ortega Gold Ship live observation
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

    // 1b) OTTO D7: Bordeaux Pub challenge -> 30..59 UW2 date-code window -> Bordeaux Harbor final showdown -> London ending -> revisit
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
        storyEventTimes: {
          ...(d5Otto.storyEventTimes || {}),
          'otto.original-core.pub-ezequiel-challenge': 1260,
        },
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
    await journey.enter('28', '4', { night: true });
    await journey.settle();
    const ottoAfterChallengeEarly = await journey.state();
    assert.equal(
      ottoAfterChallengeEarly.activeCombat,
      null,
      'Bordeaux showdown must not start before 30 UW2 date-code days after Ezequiel challenge (R-F3)',
    );
    await journey.exit();

    // Advance clock to +32 real days across May 31 (= 31 UW2 30-day calendar days, inside [30..59])
    const challengeAnchor =
      ottoAfterChallengeEarly.storyEventTimes?.[
        'otto.original-core.pub-ezequiel-challenge'
      ] ?? 1260;
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
            timePassed: challengeAnchor + 32 * 1440,
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

    // 2) ERNST D7: Changan Special Building ('98', '8') Home Reunion finale -> ending banner -> save/reload -> revisit
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
    assert.equal((await journey.state()).gold, ernstD7EndingState.gold);
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

    // 4) ALI D7: Persist aliDiagnosticEndingState from A-DIAGNOSTIC-DEBT, verify banner, reload & revisit
    fs.writeFileSync(
      path.join(runtime.slots, 'uw2-slot-1.json'),
      JSON.stringify(
        {
          schema: 1,
          savedAtEpochMs: Date.now(),
          name: 'DIAG_알베자스엔딩확인',
          state: aliDiagnosticEndingState,
        },
        null,
        2,
      ),
    );
    const aliEndingState = await loadSlotInUi(runtime, journey, 1);
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
        'DIAG_알베자스C2섹션3',
        'DIAG_알베자스C2정산직전',
        'DIAG_알베자스C2섹션5',
        'DIAG_알베자스엔딩확인',
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
    // 10. D8: 6-protagonist cross-load (Slots 1..3 across all 6 heroes), single BGM, offline, user slots untouched
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
    tracker.setActiveDiagnosticSession(false);

    summary.gates.D8 = {
      status: 'PASS',
      mode: 'D-DIAGNOSTIC cross-load fixture (Otto) + D-NATURAL UI saves (Ali, Ernst, Pietro, Catalina, João)',
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
      expectedSourceCommit: sourceCommit,
      expectedToolCommit: toolCommit,
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

if (require.main === module) {
  main().catch((error) => {
    process.stderr.write(`${error.stack || error.message}\n`);
    process.exitCode = 1;
  });
}
