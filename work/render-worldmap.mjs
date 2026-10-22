// Render world-map0.bin (720x1080 palette indices) to app/public/world-map0.png
import { readFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const sharp = require(process.cwd() +
  "/research/node_modules/sharp/dist/index.cjs");

await mkdir("app/public", { recursive: true });
const pal = JSON.parse(
  await readFile("work/db-korean/draw-world-map/sea-palettes.json", "utf8"),
).day;
const bin = await readFile("work/db-korean/draw-world-map/world-map0.bin");
// Palette channels are 6-bit VGA DAC values (0-15 raw → 8-bit); replicate
// research/scripts/draw-world-map/tilesets.ts channel().
const ch = (v) => {
  const dac = v << 2;
  return (dac << 2) | (dac >> 4);
};
const rgb = pal.map(([r, g, b]) => [ch(r), ch(g), ch(b)]);
const W = 720, H = 1080;
const rgba = Buffer.alloc(W * H * 4);
for (let i = 0; i < W * H; i++) {
  const c = rgb[bin[i]];
  rgba[i * 4] = c[0];
  rgba[i * 4 + 1] = c[1];
  rgba[i * 4 + 2] = c[2];
  rgba[i * 4 + 3] = 255;
}
await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
  .png()
  .toFile("app/public/world-map0.png");
console.log("written app/public/world-map0.png");
