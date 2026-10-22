// G5 original-save reader & 6-hero start mapping self-test — imports the REAL
// app modules (app/src/save.ts, app/src/selectScene.ts).
import { readOriginalSave } from "../app/src/save.ts";
import { HERO_STARTS } from "../app/src/selectScene.ts";
import { readFileSync } from "node:fs";

const bytes = readFileSync(new URL("../C HDD/KOUKAI2.DAT", import.meta.url));
const ports = JSON.parse(
  readFileSync(new URL("../app/public/db/ports/ports.json", import.meta.url), "utf8"),
);
const info = readOriginalSave(new Uint8Array(bytes));
const names = info.heroes.map((h) => `${h.index + 1}:${h.name}`);
console.log("readOriginalSave(KOUKAI2.DAT) →", names.join(" | "));
console.log(
  `container=${info.isFullContainer} slotStride=0x${info.slotStride.toString(16)} gold=${info.gold}`,
);
const expected = [
  "조안 페레로",
  "카탈리나 에란초",
  "옷토 스피노라",
  "에르네스트 로페스",
  "피에트로 콘티",
  "알 베자스",
];
const startsOk = [0, 1, 2, 3, 4, 5].every((h) => {
  const cfg = HERO_STARTS[h];
  const p = ports[cfg.portId];
  return p && p.name === cfg.portName && cfg.gold > 0;
});
console.log(
  "HERO_STARTS →",
  [0, 1, 2, 3, 4, 5]
    .map((h) => `${expected[h]}@${HERO_STARTS[h].portName}(${HERO_STARTS[h].gold}G)`)
    .join(" | "),
);
const ok =
  info.heroes.length === 6 &&
  info.heroes.every((h, i) => h.name === expected[i]) &&
  typeof info.gold === "number" &&
  info.gold > 0 &&
  startsOk;
if (ok) console.log("G5 original-save reader & 6-hero start mapping SELF-TEST PASS");
else {
  console.error("FAIL:", JSON.stringify({ info, startsOk }));
  process.exit(1);
}
