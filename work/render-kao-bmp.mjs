// Render KAO.LZW entries (64x80, planar 8px-block x 3 planes, 8-color palette)
// to 24bpp BMP files. Palette and layout from research/portraits-items-discoveries.
// Usage: node render-kao-bmp.mjs <entryDir> <outputDir>
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";

const PALETTE = [
  [0x00, 0x00, 0x00], [0x00, 0xa0, 0x60], [0xd0, 0x40, 0x00], [0xf0, 0xa0, 0x60],
  [0x00, 0x40, 0xd0], [0x00, 0xa0, 0xf0], [0xd0, 0x60, 0xa0], [0xf0, 0xe0, 0xd0],
];
const BLOCK = 8, PLANES = 3;
// entry sizes seen in Korean KAO.LZW: 1920 = 64x80 portraits, 864 = 48x48 parts
function dims(bytes) {
  const pixels = (bytes.length * 8) / PLANES;
  if (pixels === 64 * 80) return [64, 80];
  if (pixels === 48 * 48) return [48, 48];
  return null;
}

const bit = (bytes, i) => (bytes[i >> 3] >> (7 - (i & 7))) & 1;

function decodePlanar(bytes) {
  const size = dims(bytes);
  if (!size) throw new Error(`bad entry size ${bytes.length}`);
  const [width, height] = size;
  const blockBits = BLOCK * PLANES;
  const blocks = Math.floor((bytes.length * 8) / blockBits);
  const pixels = new Array(width * height);
  for (let b = 0; b < blocks; b++)
    for (let p = 0; p < BLOCK; p++) {
      let v = 0;
      for (let plane = 0; plane < PLANES; plane++)
        v = (v << 1) | bit(bytes, b * blockBits + p + plane * BLOCK);
      pixels[b * BLOCK + p] = PALETTE[v];
    }
  return pixels;
}

function bmp(pixels, width, height) {
  const rowSize = Math.ceil((width * 3) / 4) * 4;
  const imageSize = rowSize * height;
  const out = Buffer.alloc(54 + imageSize);
  out.write("BM", 0);
  out.writeUInt32LE(54 + imageSize, 2);
  out.writeUInt32LE(54, 10);
  out.writeUInt32LE(40, 14);
  out.writeInt32LE(width, 18);
  out.writeInt32LE(height, 22);
  out.writeUInt16LE(1, 26);
  out.writeUInt16LE(24, 28);
  out.writeUInt32LE(imageSize, 34);
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const [r, g, b] = pixels[(height - 1 - y) * width + x];
      const o = 54 + y * rowSize + x * 3;
      out[o] = b; out[o + 1] = g; out[o + 2] = r;
    }
  return out;
}

const [entryDir, outDir] = process.argv.slice(2);
if (!entryDir || !outDir) {
  console.error("usage: node render-kao-bmp.mjs <entryDir> <outputDir>");
  process.exit(1);
}
await mkdir(outDir, { recursive: true });
const files = (await readdir(entryDir)).filter((f) => f.endsWith(".bin")).sort();
let rendered = 0, skipped = 0;
for (const f of files) {
  const bytes = new Uint8Array(await readFile(`${entryDir}/${f}`));
  const size = dims(bytes);
  if (!size) { skipped++; continue; } // empty/unknown entries
  await writeFile(
    `${outDir}/${f.replace(".bin", ".bmp")}`,
    bmp(decodePlanar(bytes), size[0], size[1]),
  );
  rendered++;
}
console.log(`rendered ${rendered} portraits (${skipped} skipped) -> ${outDir}`);
