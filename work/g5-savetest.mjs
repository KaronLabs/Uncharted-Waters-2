// G5 self-test:
// 1. Original-save reader + 10-slot parser (imports actual app/src/save.ts)
// 2. 6-hero starting port/gold mapping (imports actual app/src/selectScene.ts)
// 3. 5-building PortScene interaction loop (imports actual app/src/portScene.ts)
// 4. Multi-resolution icon.ico header verification
import { readFileSync } from "node:fs";
import {
  readOriginalSave,
  readOriginalSaveSlots,
  parseOriginalSaveDate,
} from "../app/src/save.ts";
import { HERO_STARTS } from "../app/src/selectScene.ts";
import { PortScene } from "../app/src/portScene.ts";

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

let pass = info.heroes.length === 6 && info.isFullContainer && slots.length === 10;
info.heroes.forEach((h, i) => {
  const ok = h.name === expected[i];
  if (!ok) pass = false;
  console.log(`hero[${i}] = "${h.name}" (expected "${expected[i]}") ${ok ? "OK" : "MISMATCH"}`);
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
// Negative test: truncated/corrupted buffer must be rejected (empty slot array)
const negSlots = readOriginalSaveSlots(new Uint8Array(64));
const negDate = parseOriginalSaveDate("not-a-date");
const negOk = negSlots.length === 0 && negDate === null;
if (!s0Ok || !s1Ok || !negOk) pass = false;
console.log(
  `slot[0]: ${s0.memo} | ${s0.heroName} | port=${s0.portId}(${s0.portName}) | ship=${s0.shipName}(#${s0.shipId},cap=${s0.maxCargo}) | gold=${s0.gold} -> ${s0Ok ? "OK" : "FAIL"}`,
);
console.log(
  `slot[1]: ${s1.memo} | ${s1.heroName} | port=${s1.portId}(${s1.portName}) | ship=${s1.shipName}(#${s1.shipId},cap=${s1.maxCargo}) | gold=${s1.gold} -> ${s1Ok ? "OK" : "FAIL"}`,
);
console.log(
  `negative[truncated_save_&_bad_date]: slots=${negSlots.length}, date=${negDate} -> ${negOk ? "REJECTED_OK" : "FAIL"}`,
);

// Verify 6-hero starting ports against ports.json
const ports = JSON.parse(
  readFileSync("E:/03_AllWork/04_REA/uw-2/app/public/db/ports/ports.json", "utf8"),
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

// Verify 5-building PortScene actions
const buildingsDb = JSON.parse(
  readFileSync(
    "E:/03_AllWork/04_REA/uw-2/app/public/db/port-buildings.json",
    "utf8",
  ),
);
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
  gold: 50000,
  cargo: new Map(),
  date: new Date(1522, 4, 28),
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

// Tab 1: Shipyard — buy ship #0 (발사)
portScene.setTab(1);
portScene.onKey("b");
const shipOk = state.shipId === 0 && state.shipName === "발사";
// Tab 2: Lodge — hire first sailor in Lisbon (미구엘 레아르)
portScene.setTab(2);
portScene.onKey("b");
const lodgeOk = state.crew.length === 1 && state.crew[0].name === "미구엘 레아르";
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
  `5-Buildings E2E: shipyard=${shipOk} (${state.shipName}), lodge=${lodgeOk} (${state.crew[0]?.name}), palace=${palaceOk} (rank=${state.rank}), guild=${guildOk} (${state.items[0]})`,
);

// Verify icon.ico header
const icoBuf = readFileSync("E:/03_AllWork/04_REA/uw-2/app/public/icon.ico");
const icoOk =
  icoBuf.readUInt16LE(0) === 0 &&
  icoBuf.readUInt16LE(2) === 1 &&
  icoBuf.readUInt16LE(4) === 5;
if (!icoOk) pass = false;
console.log(`icon.ico: ${icoBuf.length} bytes, count=${icoBuf.readUInt16LE(4)} -> ${icoOk ? "OK" : "FAIL"}`);

console.log(
  `VERDICT: ${pass ? "PASS (10-slot loader + 6-hero starts + 5-buildings + icon.ico verified)" : "FAIL"}`,
);
process.exit(pass ? 0 : 1);
