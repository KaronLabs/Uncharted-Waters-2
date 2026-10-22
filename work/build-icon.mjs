// Generates a multi-resolution Windows .ico file (256x256, 64x64, 48x48, 32x32, 16x16)
// for UW2-Korean-Portable.exe from the extracted Uncharted Waters 2 Galleon ship
// sprite (ship_010.bmp) and portrait_000.bmp on a royal navy + gold pixel-art crest.
import fs from "node:fs";
import path from "node:path";

const root = "E:/03_AllWork/04_REA/uw-2";
const shipBmpPath = path.join(
  root,
  "work/dh2-editor-dissection/assets/ships/ship_010.bmp",
);
const shipBuf = fs.readFileSync(shipBmpPath);

// Parse 24-bpp BMP
const dataOffset = shipBuf.readUInt32LE(10);
const bmpW = shipBuf.readInt32LE(18);
const bmpH = shipBuf.readInt32LE(22);
const stride = Math.floor((bmpW * 24 + 31) / 32) * 4;

function getShipPixel(x, y) {
  // BMP is bottom-up
  const row = bmpH - 1 - y;
  const off = dataOffset + row * stride + x * 3;
  const b = shipBuf[off];
  const g = shipBuf[off + 1];
  const r = shipBuf[off + 2];
  return [r, g, b];
}

// Render an N x N RGBA buffer of the Uncharted Waters 2 crest icon
function renderIconRgba(size) {
  const rgba = Buffer.alloc(size * size * 4);
  const border = Math.max(1, Math.round(size * 0.06));
  const innerBorder = Math.max(2, Math.round(size * 0.09));

  // Background color from corner of ship_010.bmp to key out or blend
  const [bgR, bgG, bgB] = getShipPixel(0, 0);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;

      // Rounded corner clipping for sleek Windows 11 desktop look
      const corner = Math.floor(size * 0.12);
      const dx = x < corner ? corner - x : x >= size - corner ? x - (size - corner - 1) : 0;
      const dy = y < corner ? corner - y : y >= size - corner ? y - (size - corner - 1) : 0;
      if (dx * dx + dy * dy > corner * corner) {
        rgba[idx] = 0;
        rgba[idx + 1] = 0;
        rgba[idx + 2] = 0;
        rgba[idx + 3] = 0;
        continue;
      }

      // Outer golden frame
      const isOuter =
        x < border ||
        x >= size - border ||
        y < border ||
        y >= size - border;
      const isInnerRim =
        !isOuter &&
        (x < innerBorder ||
          x >= size - innerBorder ||
          y < innerBorder ||
          y >= size - innerBorder);

      if (isOuter) {
        rgba[idx] = 238;     // R (Gold)
        rgba[idx + 1] = 190; // G
        rgba[idx + 2] = 54;  // B
        rgba[idx + 3] = 255;
        continue;
      }
      if (isInnerRim) {
        rgba[idx] = 120;     // R (Antique Bronze)
        rgba[idx + 1] = 85;  // G
        rgba[idx + 2] = 24;  // B
        rgba[idx + 3] = 255;
        continue;
      }

      // Royal ocean background gradient + horizon waves
      const ny = (y - innerBorder) / (size - 2 * innerBorder);
      let r = Math.round(16 + ny * 20);
      let g = Math.round(38 + ny * 48);
      let b = Math.round(82 + ny * 70);
      if (ny > 0.76) {
        // Deep sea lower band
        const wave = Math.sin((x / size) * Math.PI * 6) * 8;
        r = 14;
        g = Math.max(20, Math.min(255, Math.round(52 + wave)));
        b = Math.max(40, Math.min(255, Math.round(118 + wave)));
      }

      // Nearest-neighbor sample from ship_010.bmp (136x104) centered in the crest
      const padX = Math.round(size * 0.11);
      const padY = Math.round(size * 0.15);
      const drawW = size - 2 * padX;
      const drawH = size - 2 * padY;
      if (x >= padX && x < padX + drawW && y >= padY && y < padY + drawH) {
        const sx = Math.min(
          bmpW - 1,
          Math.floor(((x - padX) / drawW) * bmpW),
        );
        const sy = Math.min(
          bmpH - 1,
          Math.floor(((y - padY) / drawH) * bmpH),
        );
        const [sr, sg, sb] = getShipPixel(sx, sy);
        const diff =
          Math.abs(sr - bgR) + Math.abs(sg - bgG) + Math.abs(sb - bgB);
        if (diff > 18) {
          r = sr;
          g = sg;
          b = sb;
        }
      }

      rgba[idx] = r;
      rgba[idx + 1] = g;
      rgba[idx + 2] = b;
      rgba[idx + 3] = 255;
    }
  }
  return rgba;
}

// Convert RGBA buffer to ICO DIB payload (BITMAPINFOHEADER + bottom-up BGRA + 1-bpp AND mask)
function encodeIcoDib(size, rgba) {
  const xorSize = size * size * 4;
  const andStride = Math.floor((size + 31) / 32) * 4;
  const andSize = andStride * size;
  const buf = Buffer.alloc(40 + xorSize + andSize);

  // BITMAPINFOHEADER (40 bytes)
  buf.writeUInt32LE(40, 0); // biSize
  buf.writeInt32LE(size, 4); // biWidth
  buf.writeInt32LE(size * 2, 8); // biHeight (XOR + AND)
  buf.writeUInt16LE(1, 12); // biPlanes
  buf.writeUInt16LE(32, 14); // biBitCount
  buf.writeUInt32LE(0, 16); // biCompression (BI_RGB)
  buf.writeUInt32LE(xorSize + andSize, 20); // biSizeImage

  // Bottom-up BGRA pixels
  for (let y = 0; y < size; y++) {
    const srcRow = size - 1 - y;
    for (let x = 0; x < size; x++) {
      const sOff = (srcRow * size + x) * 4;
      const dOff = 40 + (y * size + x) * 4;
      const r = rgba[sOff];
      const g = rgba[sOff + 1];
      const b = rgba[sOff + 2];
      const a = rgba[sOff + 3];
      buf[dOff] = b;
      buf[dOff + 1] = g;
      buf[dOff + 2] = r;
      buf[dOff + 3] = a;

      if (a === 0) {
        const andByteIdx = 40 + xorSize + y * andStride + (x >> 3);
        buf[andByteIdx] |= 0x80 >> (x & 7);
      }
    }
  }
  return buf;
}

const sizes = [256, 64, 48, 32, 16];
const payloads = sizes.map((sz) => encodeIcoDib(sz, renderIconRgba(sz)));

const headerSize = 6 + sizes.length * 16;
const totalSize =
  headerSize + payloads.reduce((acc, p) => acc + p.length, 0);
const ico = Buffer.alloc(totalSize);

// ICONDIR header
ico.writeUInt16LE(0, 0); // Reserved
ico.writeUInt16LE(1, 2); // Type = 1 (ICO)
ico.writeUInt16LE(sizes.length, 4); // Count

let dataOffsetCursor = headerSize;
sizes.forEach((sz, i) => {
  const entryOff = 6 + i * 16;
  const payload = payloads[i];
  ico[entryOff] = sz === 256 ? 0 : sz; // Width (0 means 256)
  ico[entryOff + 1] = sz === 256 ? 0 : sz; // Height
  ico[entryOff + 2] = 0; // ColorCount
  ico[entryOff + 3] = 0; // Reserved
  ico.writeUInt16LE(1, entryOff + 4); // Planes
  ico.writeUInt16LE(32, entryOff + 6); // BitCount
  ico.writeUInt32LE(payload.length, entryOff + 8); // BytesInRes
  ico.writeUInt32LE(dataOffsetCursor, entryOff + 12); // ImageOffset
  payload.copy(ico, dataOffsetCursor);
  dataOffsetCursor += payload.length;
});

const outIco = path.join(root, "app/public/icon.ico");
fs.writeFileSync(outIco, ico);
console.log(
  `[ICON PASS] Wrote ${outIco} (${ico.length} bytes, resolutions: ${sizes.join(", ")})`,
);
