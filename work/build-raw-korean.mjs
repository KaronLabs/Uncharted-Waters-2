// Build a Korean "raw" tree in research/ layout from C HDD game files.
// Uncompressed files are copied as-is; .LZW archives are decoded with the
// research LS11 codec into <NAME>/<NAME>.NNN entries.
import { copyFile, mkdir } from "node:fs/promises";
import { readFile, writeFile } from "node:fs/promises";
import { decodeArchive } from "../research/scripts/ls11/index.ts";

const GAME = "C HDD";
const OUT = "work/raw-korean";

const PLAIN = [
  "CHIP_NO.DAT", "COLONY.DAT", "D2.MML", "END.EXE", "ENDGRP.DAT", "END_PUT.DAT",
  "EVENT0.DAT", "EVENT1.DAT", "EVENT2.DAT", "EVENT3.DAT", "EVENT4.DAT",
  "EVENT5.DAT", "EVENT6.DAT", "FMDRV.COM", "GRAPH.DAT", "GRAPH2.DAT",
  "GRPDRV.EXE", "HDAT.PUT", "ITEM.MES", "KOEI.COM", "KOUKAI2.DAT",
  "MAIN.EXE", "MENU.DAT", "MESSAGE.DAT", "MONSTER.DAT", "NAME.TBL",
  "OPEN.EXE", "SNR0.DAT", "SNR0.MES", "SNR1.DAT", "SNR1.MES", "SNR2.DAT",
  "SNR2.MES", "SNR3.DAT", "SNR3.MES", "SNR4.DAT", "SNR4.MES", "SNR5.DAT",
  "SNR5.MES", "SNR6.DAT", "SNR6.MES", "TRANSIT.DAT", "WINDCUR.DAT", "ZA_DAT.DAT",
];
const ARCHIVES = [
  "KAO", "DATA1", "IAP1", "IAP2", "IAP3", "IAP4", "IAP5", "IAP6",
  "PORTCHIP", "PORTMAP", "WORLDMAP", "OPGRAPH", "CHAR", "IAE1",
];

await mkdir(OUT, { recursive: true });
for (const file of PLAIN)
  await copyFile(`${GAME}/${file}`, `${OUT}/${file}`);

// Some extractors (sailors) read the .LZW archives themselves; keep originals too.
for (const name of ARCHIVES)
  await copyFile(`${GAME}/${name}.LZW`, `${OUT}/${name}.LZW`);

for (const name of ARCHIVES) {
  const decoded = decodeArchive(
    new Uint8Array(await readFile(`${GAME}/${name}.LZW`)),
  );
  await mkdir(`${OUT}/${name}`, { recursive: true });
  for (const [i, bytes] of decoded.entries())
    await writeFile(`${OUT}/${name}/${name}.${String(i).padStart(3, "0")}`, bytes);
  console.log(`${name}.LZW -> ${decoded.length} entries`);
}
console.log(`raw-korean ready: ${PLAIN.length} files + ${ARCHIVES.length} archives`);
