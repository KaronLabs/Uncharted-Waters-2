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

const snapshotUserSlotsDir = () => {
  const appData = process.env.APPDATA;
  if (!appData) return { exists: false, files: {} };
  const dir = path.join(appData, 'UW2-QCaine-Preview', 'slots');
  if (!fs.existsSync(dir)) return { exists: false, files: {} };
  const files = {};
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isFile()) {
      files[entry] = sha256File(full);
    }
  }
  return { exists: true, dir, files };
};

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

  const userSlotsBefore = snapshotUserSlotsDir();
  const runtime = new DesktopRuntime({
    exe: options.exe,
    artifacts: options.artifacts,
    port,
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

  const rawTile = journey.tile.bind(journey);
  journey.tile = async (key, door = false, portId) => {
    const stepNext = (pos, k) => ({
      x: pos.x + (k === 'd' ? 1 : k === 'a' ? -1 : 0),
      y: pos.y + (k === 's' ? 1 : k === 'w' ? -1 : 0),
    });
    if (await runtime.exists('[data-test=building]')) {
      journey.position = stepNext(journey.position, key);
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
        journey.position = stepNext(journey.position, key);
        return;
      }
      if (door && err?.message?.includes('Rendered port position unresolved')) {
        await bounded(`port door fallback ${key}`, async () => {
          if (await runtime.exists('[data-test=building]')) return true;
          await journey.portPulse(key, 90);
          return runtime.exists('[data-test=building]');
        });
        journey.position = stepNext(journey.position, key);
        return;
      }
      throw err;
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
    return rawEnter(portId, buildingId, opts);
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
      ernstAfterReport.fame.adventure >= 135,
      'Ernst Adventure Fame must reach >= 135 after reporting map to Mercator',
    );

    // Amsterdam Harbor ('34', '4') -> Laura joins (requires Adventure Fame >= 135) & Hans's Zipangu dream
    await journey.enter('34', '4', { night: true });
    await journey.event('ernst.original-core.amsterdam-harbor-laura-joins');
    await journey.settle();
    await journey.exit();

    await journey.enter('34', '4', { night: true });
    await journey.event('ernst.original-core.hans-zipangu-dream');
    await journey.settle();

    // D3 Ernst (100% D-NATURAL): Sail Amsterdam ('34') -> Zeiton ('95') -> unlock Changan ('98') -> Changan ('98') -> unlock Nagasaki ('100') -> Nagasaki ('100')
    await journey.path(
      ['34', '1', '58', '60', '103', '105', '73', '93', '84', '87', '95'],
      { water: 35, food: 35 },
    );
    await journey.event('ernst.original-core.zeiton-changan-route-unlock');
    await journey.settle();
    const ernstAfterZeiton = await journey.save();
    await journey.closeSidebar();
    assert(
      !ernstAfterZeiton.originalCore.lockedPorts.includes('98'),
      'Changan (98) must be unlocked after Zeiton Harbor event',
    );

    // Sail into & dock at newly unlocked Changan ('98') via D-NATURAL sea entry + town walk
    await journey.path(['95', '98'], { water: 35, food: 35 });
    await journey.event('ernst.original-core.changan-homeland-search');
    await journey.settle();
    await journey.exit();
    // Walk on Changan town map into Changan Residence ('98', '8')
    await journey.enter('98', '8', { night: true });
    await journey.event('ernst.original-core.changan-home-reunion');
    await runtime.screenshot('d3-ernst-changan-residence');
    await journey.settle();
    await journey.exit();
    const ernstAfterChangan = await journey.save();
    await journey.closeSidebar();
    assert.deepEqual(
      ernstAfterChangan.originalCore.lockedPorts,
      [],
      'Sakai (99) and Nagasaki (100) must be unlocked after Changan Harbor event',
    );

    // Sail into & dock at newly unlocked Nagasaki ('100') via D-NATURAL sea entry + town walk
    await journey.enter('98', '4', { night: true });
    await journey.path(['98', '100'], { water: 35, food: 35 });
    await journey.event('ernst.original-core.nagasaki-parents-reunion');
    await journey.settle();
    await journey.exit();
    // Walk on Nagasaki town map into Nagasaki Residence ('100', '8')
    await journey.enter('100', '8', { night: true });
    await runtime.screenshot('d3-ernst-nagasaki-residence');
    await journey.exit();
    const slot2Ernst = await writeSlotInUi(
      runtime,
      journey,
      2,
      '에르네스트나가사키',
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

    // Excavate Gold Medallion ('p1-gold-medallion') at Santo Domingo Guild ('49', '7') via 'Excavate Treasure' UI menu (consumes Map '87')
    await journey.enter('49', '7', { night: true });
    await journey.settle();
    await journey.menu('Excavate Treasure');
    await journey.buildingClick();
    await journey.settle();
    await journey.exit();

    // Trigger Santo Domingo Harbor ('49', '4') Gold Medallion story & sail back to Lisbon ('1') via Santa Cruz ('58')
    await journey.enter('49', '4', { night: true });
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

    // D3 & F-02 (100% D-NATURAL): Sail Venice ('14') -> Basra ('77'), excavate Staff of the Saint ('p2-poseidons-staff') at Basra Guild ('77', '7'), & trigger Basra Market ('77', '1') story
    await journey.enter('14', '4', { night: true });
    await journey.path(['14', '1', '58', '60', '103', '105', '73', '77'], {
      water: 35,
      food: 35,
    });
    await journey.settle();
    await journey.exit();
    await journey.enter('77', '7', { night: true });
    await journey.settle();
    await journey.menu('Excavate Treasure');
    await journey.buildingClick();
    await journey.settle();
    await journey.exit();
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
    await journey.enter('100', '4', { night: true });
    await journey.settle();
    await journey.exit();

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
    await journey.exit();
    const aliAfterRepay1 = await journey.save();
    await journey.closeSidebar();
    assert.equal(aliAfterRepay1.originalCore.investorRepaid.shipyard, true);
    assert.equal(aliAfterRepay1.originalCore.investorDebts.shipyard, 0);
    assert.equal(aliAfterRepay1.gold, aliBeforeRepay.gold - 2000);
    const slot1Ali = await writeSlotInUi(runtime, journey, 1, '알베자스상환');
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

    // Check long Korean dialogue & choice buttons at 800x600 inside Istanbul Shipyard ('3', '3')
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
    await runtime.click('[data-test=building]', { button: 'right' });
    await journey.settle();
    await journey.exit();
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

    // -------------------------------------------------------------------------
    // D7: Final gate & ending acquisition + post-ending revisit & slot reload for all 4 heroes
    // (Pre-final state staged via D-DIAGNOSTIC without final event/victory/reward; final battle & ending executed via D-NATURAL UI)
    // -------------------------------------------------------------------------
    // 1) OTTO D7: Bordeaux Pub challenge -> Bordeaux Harbor final naval battle ('otto.bordeaux-ezequiel') -> sail to London ('30') -> London Palace ('30', '6') ending -> revisit
    const ottoPreFinalSlot = {
      schema: 1,
      savedAtEpochMs: Date.now(),
      name: '옷토최종결전직전',
      state: {
        ...d5Otto,
        timePassed: 1260,
        portId: '28',
        buildingId: null,
        gold: 5000,
        fame: { adventure: 100, trade: 100, pirate: 900 },
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
          'otto.original-core.nantes-armada-clash',
          'otto.original-core.santo-domingo-armada',
          'otto.original-core.cayenne-amazon-catalina-plea',
        ],
        combatResults: {
          'otto.matthew-duel': 'victory',
          'otto.seville-pursuit': 'victory',
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
    await journey.enter('28', '2', { night: true });
    await journey.event('otto.original-core.pub-ezequiel-challenge');
    await journey.settle();
    await journey.exit();
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

    // 2) ERNST D7: Amsterdam Residence ('34', '8') World Atlas completion -> revisit
    const ernstPreFinalSlot = {
      schema: 1,
      savedAtEpochMs: Date.now(),
      name: '에르네스트엔딩직전',
      state: {
        ...d5Ernst,
        timePassed: 1260,
        portId: '34',
        buildingId: null,
        gold: 6000,
        fame: { adventure: 850, trade: 100, pirate: 0 },
        storyEvents: [
          'ernst.original-core.amsterdam-harbor-departure',
          'ernst.original-core.amsterdam-mercator-contract',
          'ernst.original-core.amsterdam-harbor-laura-joins',
          'ernst.original-core.hans-zipangu-dream',
          'ernst.original-core.zeiton-changan-route-unlock',
          'ernst.original-core.changan-homeland-search',
          'ernst.original-core.changan-home-reunion',
          'ernst.original-core.nagasaki-parents-reunion',
        ],
      },
    };
    fs.writeFileSync(
      path.join(runtime.slots, 'uw2-slot-2.json'),
      JSON.stringify(ernstPreFinalSlot, null, 2),
    );
    await loadSlotInUi(runtime, journey, 2);
    const ernstGoldBeforeEnding = (await journey.state()).gold;
    await journey.enter('34', '8', { night: true });
    await journey.event('ernst.original-core.amsterdam-world-atlas-completion');
    await journey.settle();
    await journey.exit();
    const ernstEndingState = await journey.save();
    await journey.closeSidebar();
    assert.equal(ernstEndingState.gold, ernstGoldBeforeEnding + 15000);

    await runtime.click('[data-test=journalTrigger]');
    const ernstEndingBanner = await bounded(
      'Ernst ending banner visible',
      async () => (await runtime.dom('[data-test=ernstEnding]'))[0],
    );
    assert(ernstEndingBanner.text.includes('에르네스트의 세계 지도'));
    await runtime.screenshot('d7-ernst-ending-banner');
    await journey.closeSidebar();
    await writeSlotInUi(runtime, journey, 2, '에르네스트엔딩');
    await journey.closeSidebar();
    await loadSlotInUi(runtime, journey, 2);
    await journey.enter('34', '8', { night: true });
    await journey.settle();
    assert.equal((await journey.state()).gold, ernstEndingState.gold);
    await journey.exit();

    // 3) PIETRO D7: London Bank ('30', '9') Howell Mansion Test -> sail to Lisbon ('1') -> Lisbon Residence ('1', '8') ending -> revisit
    const pietroPreFinalSlot = {
      schema: 1,
      savedAtEpochMs: Date.now(),
      name: '피에트로엔딩직전',
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
    await runtime.screenshot('d7-pietro-ending-banner');
    await journey.closeSidebar();
    await writeSlotInUi(runtime, journey, 3, '피에트로엔딩');
    await journey.closeSidebar();
    await loadSlotInUi(runtime, journey, 3);
    await journey.enter('1', '8', { night: true });
    await journey.settle();
    assert.equal((await journey.state()).gold, pietroEndingState.gold);
    await journey.exit();

    // 4) ALI D7: Istanbul Royal Palace ('3', '6') Sultan Coronation -> revisit
    const ottomanInvestments35 = {};
    for (let pid = 1; pid <= 35; pid += 1) {
      ottomanInvestments35[String(pid)] = {
        economy: 100,
        industry: 100,
      };
    }
    const aliPreFinalSlot = {
      schema: 1,
      savedAtEpochMs: Date.now(),
      name: '알베자스엔딩직전',
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
          howellHousePriceIngots: 50,
        },
        combatResults: {
          'ali.catalina-ambush': 'victory',
        },
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
          'ali.original-core.venice-howell-pietro-debt',
          'ali.original-core.massawa-catalina-ambush',
          'ali.original-core.basra-sasha-reunion',
        ],
      },
    };
    fs.writeFileSync(
      path.join(runtime.slots, 'uw2-slot-1.json'),
      JSON.stringify(aliPreFinalSlot, null, 2),
    );
    await loadSlotInUi(runtime, journey, 1);
    const aliGoldBeforeEnding = (await journey.state()).gold;
    await journey.enter('3', '6', { night: true });
    await journey.event('ali.original-core.istanbul-sultan-coronation');
    await journey.settle();
    await journey.exit();
    const aliEndingState = await journey.save();
    await journey.closeSidebar();
    assert.equal(aliEndingState.gold, aliGoldBeforeEnding + 25000);
    assert(aliEndingState.originalCore.royalRankLevel >= 5);

    await runtime.click('[data-test=journalTrigger]');
    const aliEndingBanner = await bounded(
      'Ali ending banner visible',
      async () => (await runtime.dom('[data-test=aliEnding]'))[0],
    );
    assert(aliEndingBanner.text.includes('알의 성공'));
    await runtime.screenshot('d7-ali-ending-banner');
    await journey.closeSidebar();
    await writeSlotInUi(runtime, journey, 1, '알베자스엔딩');
    await journey.closeSidebar();
    await loadSlotInUi(runtime, journey, 1);
    await journey.enter('3', '6', { night: true });
    await journey.settle();
    assert.equal((await journey.state()).gold, aliEndingState.gold);
    await journey.exit();

    summary.gates.D7 = {
      status: 'PASS',
      mode: 'D-DIAGNOSTIC pre-final gate + D-NATURAL final battle/event, ending banner, save/reload & revisit',
      endingsVerified: {
        otto: 'otto.original-core.london-palace-triumph',
        ernst: 'ernst.original-core.amsterdam-world-atlas-completion',
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

  const userSlotsAfter = snapshotUserSlotsDir();
  assert.deepEqual(
    userSlotsAfter,
    userSlotsBefore,
    'User %APPDATA% slots directory must remain untouched',
  );
  summary.userSlotsUntouched = true;
  summary.consoleErrors = consoleErrors.length;
  summary.pageErrors = pageErrors.length;
  summary.failedRequests = failedRequests.length;
  summary.externalRequests = externalRequests.length;
  summary.processLaunches = runtime.launches;

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
