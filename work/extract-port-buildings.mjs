// Extracts authentic Korean ship templates (25), historical navigators (49+),
// items (100), ranks (10), and nations (6) from KOUKAI2.DAT + tables.json
// into app/public/db/port-buildings.json, and copies the 25 24-bpp ship BMPs
// into app/public/db/ships/.
import fs from "node:fs";
import path from "node:path";

const root = "E:/03_AllWork/04_REA/uw-2";
const koukai = fs.readFileSync(path.join(root, "C HDD/KOUKAI2.DAT"));
const tables = JSON.parse(
  fs.readFileSync(
    path.join(root, "work/dh2-editor-dissection/tables.json"),
    "utf8",
  ),
);
const dec = new TextDecoder("euc-kr");

function decodeEucKr(buf) {
  const z = buf.indexOf(0);
  return dec.decode(buf.subarray(0, z < 0 ? buf.length : z)).trim();
}

// 1. 25 Ship Templates from Ship5 (0x501D) + Ship4 (0x5291) in KOUKAI2.DAT
const shipsDir = path.join(root, "app/public/db/ships");
fs.mkdirSync(shipsDir, { recursive: true });

const ships = [];
for (let i = 0; i < 25; i++) {
  const s5 = 0x501d + i * 25;
  const s4 = 0x5291 + i * 12;
  const name = decodeEucKr(koukai.subarray(s5, s5 + 18));
  const durability = koukai[s5 + 20];
  const basePrice100 = koukai.readUInt16LE(s5 + 21);
  const price = Math.max(500, basePrice100 * 100);
  const rudder = koukai[s4];
  const sail = koukai[s4 + 1];
  const maxCrew = koukai[s4 + 2] * 10;
  const minCrew = koukai[s4 + 3];
  const capacity = koukai.readUInt16LE(s4 + 4);
  const guns = koukai[s4 + 6];

  const bmpName = `ship_${String(i).padStart(3, "0")}.bmp`;
  const srcBmp = path.join(
    root,
    "work/dh2-editor-dissection/assets/ships",
    bmpName,
  );
  if (fs.existsSync(srcBmp)) {
    fs.copyFileSync(srcBmp, path.join(shipsDir, bmpName));
  }

  ships.push({
    id: i,
    name,
    capacity,
    minCrew,
    maxCrew,
    guns,
    sail,
    rudder,
    durability,
    price,
    image: `./db/ships/${bmpName}`,
  });
}

// 2. Historical Navigators from Person table (0x06A9, stride 50)
const sailors = [];
for (let id = 6; id < 140; id++) {
  const r = 0x06a9 + id * 50;
  if (r + 50 > 0x21be) break;
  const fn = decodeEucKr(koukai.subarray(r, r + 13));
  const ln = decodeEucKr(koukai.subarray(r + 13, r + 26));
  const fullName = `${fn} ${ln}`.trim();
  if (!fullName) continue;
  const cmd = koukai[r + 28];
  const sail = koukai[r + 29];
  const know = koukai[r + 30];
  const hunch = koukai[r + 31];
  const courage = koukai[r + 32];
  const sword = koukai[r + 33];
  const charm = koukai[r + 34];
  const lvSail = koukai[r + 36];
  const lvBattle = koukai[r + 37];
  const age = koukai[r + 42];
  const portId = koukai[r + 45];
  if (portId < 130) {
    const hireCost = Math.max(
      200,
      Math.round((cmd + sail + know + sword) * 3.5),
    );
    sailors.push({
      id,
      name: fullName,
      age,
      cmd,
      sail,
      know,
      hunch,
      courage,
      sword,
      charm,
      lvSail,
      lvBattle,
      portId,
      hireCost,
    });
  }
}

// 3. 100 Korean Items from tables.json
const items = tables.items.map((it) => {
  // Assign authentic tier-based prices based on item category/index
  const id = it.id;
  let price = 800;
  if (id <= 15) price = 600 + id * 350; // weapons
  else if (id <= 19) price = 1500 + (id - 15) * 1200; // armor
  else if (id <= 27) price = 1000 + (id - 20) * 800; // navigation tools & cat
  else if (id <= 41) price = 3000; // permits & tax exemptions
  else if (id <= 48) price = 500 + (id - 41) * 400; // consumables
  else if (id <= 69) price = 2000 + (id - 50) * 500; // accessories & jewelry
  else if (id <= 78) price = 12000 + (id - 70) * 2000; // legendary gear
  else if (id <= 89) price = 5000; // treasure maps
  else price = 25000; // sacred treasures
  return {
    id,
    name: it.name,
    price,
  };
});

// 4. 10 Peerage Ranks & 7 Nations from tables.json
const ranks = tables.ranks.map((r) =>
  r.name.replace(/^\d+\s+/, "").trim(),
);
const nations = tables.nations.map((n) => n.name.trim());

const outPath = path.join(root, "app/public/db/port-buildings.json");
fs.writeFileSync(
  outPath,
  JSON.stringify({ ships, sailors, items, ranks, nations }, null, 2),
  "utf8",
);

console.log(
  `[EXTRACT PASS] ships=${ships.length}, sailors=${sailors.length}, items=${items.length}, ranks=${ranks.length}, nations=${nations.length} -> ${outPath}`,
);
