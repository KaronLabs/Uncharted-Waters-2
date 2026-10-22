// G5 self-test & Supreme Court Probationary Verification Suite:
// 1. Original-save reader + 10-slot parser + strict boundary/calendar checks (imports actual app/src/save.ts)
// 2. 6-hero starting port/gold mapping (imports actual app/src/selectScene.ts)
// 3. 5-building PortScene interaction loop + cargo overflow rejection + 40-navigator & 25-ship control_index audit
// 4. F9 full state & PortScene restoration + legacy default reset + atomic malformed rejection
// 5. Multi-resolution icon.ico header & Galleon (img_ship[10]) provenance verification
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { readFileSync } from "node:fs";
import {
  readOriginalSave,
  readOriginalSaveSlots,
  parseOriginalSaveDate,
  applySaveStateToGame,
  isValidSaveState,
} from "../app/src/save.ts";
import { HERO_STARTS } from "../app/src/selectScene.ts";
import { PortScene } from "../app/src/portScene.ts";
import { MapScene } from "../app/src/mapScene.ts";
import { SaveScene } from "../app/src/saveScene.ts";

const bytes = new Uint8Array(
  readFileSync("E:/03_AllWork/04_REA/uw-2/C HDD/KOUKAI2.DAT"),
);
const info = readOriginalSave(bytes);
const slots = readOriginalSaveSlots(bytes);

const expected = [
  "조안 페레로",
  "카탈리나 에란초",
  "옷토 스피노라",
  "에르네스트 로페스",
  "피에트로 콘티",
  "알 베자스",
];

let pass =
  info.heroes.length === 6 && info.isFullContainer && slots.length === 10;
info.heroes.forEach((h, i) => {
  const ok = h.name === expected[i];
  if (!ok) pass = false;
  console.log(
    `hero[${i}] = "${h.name}" (expected "${expected[i]}") ${ok ? "OK" : "MISMATCH"}`,
  );
});

// Verify Slot 0 (Catalina @ Tunis, 599,999,912G) & Slot 1 (Joao @ Danzig, 599,805,192G)
const s0 = slots[0];
const s1 = slots[1];
const s0Ok =
  s0.heroId === 1 &&
  s0.heroName === "카탈리나 에란초" &&
  s0.portId === 5 &&
  s0.portName === "튀니스" &&
  s0.gold === 599999912 &&
  s0.shipId === 10 &&
  s0.shipName === "리베리온" &&
  s0.maxCargo === 9999 &&
  parseOriginalSaveDate(s0.memo)?.getFullYear() === 1522;
const s1Ok =
  s1.heroId === 0 &&
  s1.heroName === "조안 페레로" &&
  s1.portId === 39 &&
  s1.portName === "단치히" &&
  s1.gold === 599805192 &&
  s1.shipId === 5 &&
  s1.shipName === "카라벨 라티나" &&
  s1.maxCargo === 80;

// Verify standalone 33,340B single-slot dump from slot 0
const singleSlotDump = bytes.subarray(0x97, 0x97 + 0x823c);
const singleSlots = readOriginalSaveSlots(singleSlotDump);
assert.equal(singleSlots.length, 1);
assert.equal(singleSlots[0].heroName, "카탈리나 에란초");

// Strict negative boundary tests (Probationary Mandate §6):
// 333,550B (-1B), 333,552B (+1B), 1,854B zeros, 33,340B zeros, 64B zeros -> all MUST return []
const extraByte = new Uint8Array(bytes.length + 1);
extraByte.set(bytes);
for (const invalid of [
  bytes.subarray(0, bytes.length - 1),
  extraByte,
  new Uint8Array(1854),
  new Uint8Array(33340),
  new Uint8Array(64),
]) {
  assert.equal(readOriginalSaveSlots(invalid).length, 0);
}
for (const invalidDate of [
  "31/Feb/1522",
  "00/Jan/1522",
  "99/May/1522",
  "not-a-date",
]) {
  assert.equal(parseOriginalSaveDate(invalidDate), null);
}
const negOk = true;
if (!s0Ok || !s1Ok || !negOk) pass = false;
console.log(
  `slot[0]: ${s0.memo} | ${s0.heroName} | port=${s0.portId}(${s0.portName}) | ship=${s0.shipName}(#${s0.shipId},cap=${s0.maxCargo}) | gold=${s0.gold} -> ${s0Ok ? "OK" : "FAIL"}`,
);
console.log(
  `slot[1]: ${s1.memo} | ${s1.heroName} | port=${s1.portId}(${s1.portName}) | ship=${s1.shipName}(#${s1.shipId},cap=${s1.maxCargo}) | gold=${s1.gold} -> ${s1Ok ? "OK" : "FAIL"}`,
);
console.log(
  `negative[strict_save_boundaries_&_calendar]: 333550B/333552B/1854B/33340B_zero/31-Feb-1522 -> REJECTED_OK`,
);

// Verify 6-hero starting ports against ports.json
const ports = JSON.parse(
  readFileSync(
    "E:/03_AllWork/04_REA/uw-2/app/public/db/ports/ports.json",
    "utf8",
  ),
);
Object.entries(HERO_STARTS).forEach(([k, cfg]) => {
  const i = Number(k);
  const p = ports[cfg.portId];
  const ok = Boolean(p && p.name === cfg.portName && cfg.gold > 0);
  if (!ok) pass = false;
  console.log(
    `start[${i}] = portId ${cfg.portId} ("${p?.name}" vs "${cfg.portName}"), gold=${cfg.gold} ${ok ? "OK" : "MISMATCH"}`,
  );
});

// Verify port-buildings.json: 40 historical sailors (0 mojibake, id < 120) & 25 ships mapped by control_index
const buildingsDb = JSON.parse(
  readFileSync(
    "E:/03_AllWork/04_REA/uw-2/app/public/db/port-buildings.json",
    "utf8",
  ),
);
const manifest = JSON.parse(
  readFileSync(
    "E:/03_AllWork/04_REA/uw-2/work/dh2-editor-dissection/assets-manifest.json",
    "utf8",
  ),
);
assert.equal(buildingsDb.sailors.length, 40);
for (const s of buildingsDb.sailors) {
  assert.ok(s.id >= 6 && s.id < 120, `Sailor id out of Person[0..119] bounds: ${s.id}`);
  assert.ok(
    /^[가-힣]+(?:\s+[가-힣]+)*$/.test(s.name),
    `Invalid or mojibake sailor name: ${s.name}`,
  );
  assert.ok(s.portId >= 0 && s.portId < 130);
  assert.ok(s.cmd >= 1 && s.cmd <= 100 && s.sail >= 1 && s.sail <= 100);
}
assert.equal(buildingsDb.ships.length, 25);
for (let i = 0; i < 25; i++) {
  const sh = buildingsDb.ships[i];
  const expectedAsset = manifest.assets.find(
    (a) => a.control_name === "img_ship" && a.control_index === i,
  );
  assert.ok(expectedAsset, `Missing manifest asset for img_ship[${i}]`);
  assert.equal(sh.id, i);
  assert.equal(sh.controlIndex, i);
  assert.equal(sh.ocxSourceFile, expectedAsset.filename);
  const diskBmp = readFileSync(
    `E:/03_AllWork/04_REA/uw-2/app/public/db/ships/ship_${String(i).padStart(3, "0")}.bmp`,
  );
  const diskSha = crypto.createHash("sha256").update(diskBmp).digest("hex");
  assert.equal(
    diskSha,
    expectedAsset.sha256,
    `Ship #${i} (${sh.name}) BMP hash mismatch vs img_ship[${i}]`,
  );
}
console.log(
  `db_integrity: sailors=${buildingsDb.sailors.length} (all id in 6..119, 0 mojibake), ships=25 (all 25 SHA-256 matched to img_ship[control_index]) -> OK`,
);

// Verify 5-building PortScene actions + cargo overflow rejection on buyShip()
const markets = JSON.parse(
  readFileSync(
    "E:/03_AllWork/04_REA/uw-2/app/public/db/goods/port-markets.json",
    "utf8",
  ),
);
const goodsRaw = JSON.parse(
  readFileSync(
    "E:/03_AllWork/04_REA/uw-2/app/public/db/goods/goods.json",
    "utf8",
  ),
);
const goodsMap = new Map(goodsRaw.map((g) => [g.id, g]));
const state = {
  hero: 0,
  gold: 50000,
  cargo: new Map([[0, { name: "정향", qty: 120, unitCost: 100 }]]),
  date: new Date(1522, 4, 28),
  portId: 0,
  shipId: 5,
  shipName: "카라벨 라티나",
  maxCargo: 120,
  crew: [],
  items: [],
  rank: 0,
  fame: { trade: 0, pirate: 0, adventure: 0 },
};

const portScene = new PortScene(
  ports[0],
  markets[0],
  goodsMap,
  state,
  () => {},
  buildingsDb,
  0,
);

// Negative test: downsizing to 발사 (capacity 50) while holding 120 cargo must be rejected!
portScene.setTab(1);
portScene.onKey("b");
assert.equal(state.shipId, 5, "Downsizing below current cargo load must be rejected");
assert.equal(state.maxCargo, 120);
assert.equal(state.gold, 50000);

// Clear cargo and buy ship #0 (발사)
state.cargo.clear();
portScene.onKey("b");
const shipOk = state.shipId === 0 && state.shipName === "발사" && state.maxCargo === 50;
// Tab 2: Lodge — hire first sailor in Lisbon (미구엘 레아르) and verify all Lisbon lodge sailors are valid
portScene.setTab(2);
for (const ls of portScene.lodgeSailors()) {
  assert.ok(ls.id >= 6 && ls.id < 120);
  assert.ok(/^[가-힣]+(?:\s+[가-힣]+)*$/.test(ls.name));
}
portScene.onKey("b");
const lodgeOk =
  state.crew.length === 1 && state.crew[0].name === "미구엘 레아르";
// Tab 3: Palace — donate 1000G -> trade+120, adventure+120 -> total 240 >= 200 -> rank=1 (기사)
portScene.setTab(3);
portScene.onKey("b");
const palaceOk = state.rank === 1 && state.fame.trade === 120;
// Tab 4: Guild — buy item & run commission
portScene.setTab(4);
portScene.onKey("b");
portScene.onKey("q");
const guildOk = state.items.length === 1 && state.fame.adventure >= 220;

if (!shipOk || !lodgeOk || !palaceOk || !guildOk) pass = false;
console.log(
  `5-Buildings E2E: shipyard=${shipOk} (${state.shipName}, cargo_overflow_rejected=true), lodge=${lodgeOk} (${state.crew[0]?.name}), palace=${palaceOk} (rank=${state.rank}), guild=${guildOk} (${state.items[0]})`,
);

// Verify F9 Full State Restoration + Active PortScene Sync + Legacy Default Reset + Atomic Malformed Rejection
{
  const g = {
    stack: [],
    get current() {
      return this.stack[this.stack.length - 1];
    },
    push(s) {
      this.stack.push(s);
    },
    pop() {
      this.stack.pop();
    },
    replace(s) {
      this.stack.pop();
      this.stack.push(s);
    },
  };
  const f9State = {
    hero: 0,
    gold: 10000,
    date: new Date(1522, 4, 28),
    portId: 0,
    shipId: 5,
    shipName: "카라벨 라티나",
    maxCargo: 120,
    crew: [],
    items: [],
    rank: 0,
    fame: { trade: 0, pirate: 0, adventure: 0 },
    cargo: new Map(),
  };
  const makePort = (pIdx) => {
    const p = ports[pIdx];
    const m = markets.find((x) => x.name === p.name) ?? markets[0];
    return new PortScene(p, m, goodsMap, f9State, () => g.pop(), buildingsDb, pIdx);
  };
  let map = new MapScene(ports, () => {}, f9State);
  map.setFleetPosition(ports[0].position.x / 2, ports[0].position.y / 2);
  g.push(map);
  g.push(makePort(0)); // Enter Lisbon

  // Save at Lisbon (portId=0)
  const savedAtLisbon = {
    version: 1,
    hero: f9State.hero,
    gold: f9State.gold,
    date: f9State.date.toISOString(),
    portId: f9State.portId,
    shipId: f9State.shipId,
    shipName: f9State.shipName,
    maxCargo: f9State.maxCargo,
    crew: [...f9State.crew],
    items: [...f9State.items],
    rank: f9State.rank,
    fame: { ...f9State.fame },
    cargo: [],
  };

  // Travel to London (portId=29) and mutate state
  f9State.portId = 29;
  f9State.gold = 25000;
  f9State.shipId = 10;
  f9State.shipName = "갤리온";
  f9State.maxCargo = 9999;
  f9State.rank = 9;
  f9State.crew = [{ id: 7, name: "미구엘 레아르", cmd: 69, sail: 81, know: 56, sword: 61 }];
  map.setFleetPosition(ports[29].position.x / 2, ports[29].position.y / 2);
  g.replace(makePort(29));
  assert.equal(g.current.port.name, "런던");

  // Perform F9 load + scene sync + dismiss SaveScene toast
  assert.equal(applySaveStateToGame(f9State, savedAtLisbon, 0), true);
  const wasInPort = g.current?.name === "port";
  if (wasInPort) g.pop();
  map = new MapScene(ports, () => {}, f9State);
  map.setFleetPosition(
    ports[f9State.portId].position.x / 2,
    ports[f9State.portId].position.y / 2,
  );
  g.replace(map);
  if (wasInPort) g.push(makePort(f9State.portId));
  g.push(new SaveScene(["불러오기 완료"], () => g.pop()));
  g.current.onKey("Enter"); // close SaveScene notification

  assert.equal(f9State.portId, 0);
  assert.equal(g.current.name, "port");
  assert.equal(g.current.port.name, "리스본");
  assert.equal(g.current.market.name, "리스본");
  assert.equal(map.nearby?.name, "리스본");
  assert.deepEqual([map.fleetX, map.fleetY], [420, 179]);
  assert.equal(f9State.gold, 10000);
  assert.equal(f9State.shipId, 5);
  assert.equal(f9State.maxCargo, 120);
  assert.equal(f9State.rank, 0);
  assert.equal(f9State.crew.length, 0);

  // Legacy SaveState omitting optional fields must reset shipId/maxCargo/rank/crew/items/portId to clean defaults
  f9State.portId = 29;
  f9State.shipId = 10;
  f9State.maxCargo = 9999;
  f9State.rank = 9;
  f9State.crew = [{ id: 7, name: "미구엘 레아르", cmd: 69, sail: 81, know: 56, sword: 61 }];
  f9State.items = ["단도"];
  const legacySave = {
    version: 1,
    hero: 0,
    gold: 7777,
    date: "1522-05-28T00:00:00.000Z",
    cargo: [],
  };
  assert.equal(applySaveStateToGame(f9State, legacySave, HERO_STARTS[0].portId), true);
  assert.equal(f9State.portId, 0);
  assert.equal(f9State.shipId, 5);
  assert.equal(f9State.shipName, "카라벨 라티나");
  assert.equal(f9State.maxCargo, 120);
  assert.equal(f9State.rank, 0);
  assert.equal(f9State.crew.length, 0);
  assert.equal(f9State.items.length, 0);

  // Malformed SaveState (crew: {}) must be rejected atomically without mutating gold
  f9State.gold = 99999;
  const malformedSave = {
    version: 1,
    hero: 0,
    gold: 42,
    date: "1522-05-28T00:00:00.000Z",
    cargo: [],
    crew: {},
  };
  assert.equal(isValidSaveState(malformedSave), false);
  assert.equal(applySaveStateToGame(f9State, malformedSave, 0), false);
  assert.equal(f9State.gold, 99999, "Malformed SaveState must not partially mutate state.gold");
  console.log(
    "F9_integration: Lisbon_save->London_port->F9_restore(port=리스본,market=리스본,fleet=[420,179]) + legacy_defaults + atomic_malformed_rejection -> OK",
  );
}

// Verify icon.ico header
const icoBuf = readFileSync("E:/03_AllWork/04_REA/uw-2/app/public/icon.ico");
const icoOk =
  icoBuf.readUInt16LE(0) === 0 &&
  icoBuf.readUInt16LE(2) === 1 &&
  icoBuf.readUInt16LE(4) === 5;
if (!icoOk) pass = false;
console.log(
  `icon.ico: ${icoBuf.length} bytes, count=${icoBuf.readUInt16LE(4)} -> ${icoOk ? "OK" : "FAIL"}`,
);

console.log(
  `VERDICT: ${pass ? "PASS (10-slot loader + strict boundaries + 6-hero starts + 5-buildings + F9 sync + icon.ico verified)" : "FAIL"}`,
);
process.exit(pass ? 0 : 1);
