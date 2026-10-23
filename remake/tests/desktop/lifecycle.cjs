'use strict';
const net = require('node:net');
const { execFile } = require('node:child_process');

function exec(file, args) {
  return new Promise((resolve, reject) =>
    execFile(
      file,
      args,
      { windowsHide: true, timeout: 10000, maxBuffer: 2 * 1024 * 1024 },
      (error, stdout) => (error ? reject(error) : resolve(stdout)),
    ),
  );
}
function assertPortFree(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    const timeout = setTimeout(() => {
      server.close();
      reject(new Error('Debug port ownership check timed out'));
    }, 2000);
    server.once('error', (error) => {
      clearTimeout(timeout);
      reject(new Error(`Debug port unavailable: ${error.code}`));
    });
    server.listen(port, '127.0.0.1', () =>
      server.close(() => {
        clearTimeout(timeout);
        resolve();
      }),
    );
  });
}
async function fetchJson(url, timeout = 1500) {
  const response = await fetch(url, { signal: AbortSignal.timeout(timeout) });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response.json();
}
function openSocket(url, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    const timer = setTimeout(() => {
      ws.close();
      reject(new Error('WebSocket handshake timed out'));
    }, timeout);
    ws.addEventListener(
      'open',
      () => {
        clearTimeout(timer);
        resolve(ws);
      },
      { once: true },
    );
    ws.addEventListener(
      'error',
      () => {
        clearTimeout(timer);
        reject(new Error('WebSocket handshake failed'));
      },
      { once: true },
    );
  });
}
async function processes() {
  const json = await exec('powershell.exe', [
    '-NoProfile',
    '-NonInteractive',
    '-Command',
    "@(Get-CimInstance Win32_Process | ForEach-Object { [pscustomobject]@{ pid=[int]$_.ProcessId; parent=[int]$_.ParentProcessId; created=$_.CreationDate.ToUniversalTime().ToString('o') } }) | ConvertTo-Json -Compress",
  ]);
  return JSON.parse(json);
}
function descendants(all, rootPid, startedAt, known = new Map()) {
  const owned = new Map(known);
  const root =
    known.size === 0 &&
    all.find(
      (p) => p.pid === rootPid && Date.parse(p.created) >= startedAt - 1500,
    );
  if (root) owned.set(root.pid, root.created);
  const parents = new Set(
    all.filter((p) => owned.get(p.pid) === p.created).map((p) => p.pid),
  );
  for (let i = 0; i < all.length; i++) {
    const additions = all.filter(
      (p) =>
        !owned.has(p.pid) &&
        parents.has(p.parent) &&
        Date.parse(p.created) >= startedAt - 1500,
    );
    if (!additions.length) break;
    additions.forEach((p) => {
      owned.set(p.pid, p.created);
      parents.add(p.pid);
    });
  }
  return {
    known: owned,
    live: all.filter((p) => owned.get(p.pid) === p.created),
  };
}
async function closeWindow(pid) {
  await exec('powershell.exe', [
    '-NoProfile',
    '-NonInteractive',
    '-Command',
    `$p = Get-Process -Id ${Number(
      pid,
    )} -ErrorAction SilentlyContinue; if ($null -ne $p) { $null = $p.CloseMainWindow() }`,
  ]);
}
async function terminateOwned(pid) {
  await exec('taskkill.exe', ['/PID', String(pid), '/F']);
}
module.exports = {
  assertPortFree,
  fetchJson,
  openSocket,
  processes,
  descendants,
  closeWindow,
  terminateOwned,
};
