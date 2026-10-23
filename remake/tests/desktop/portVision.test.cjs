'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
  matchPortPosition,
  samplePoints,
  intersectPortEvidence,
} = require('./portVision.cjs');

const viewport = { width: 1280, height: 800 };
const palette = (timeRow, tile, pixelX, pixelY) => [
  tile,
  pixelX + timeRow * 32,
  pixelY + timeRow * 32,
];

function tilemaps(fill = (x, y) => (x * 7 + y * 11 + ((x * y) % 13)) % 256) {
  const bytes = new Uint8Array(96 * 96 * 2);
  for (let y = 0; y < 96; y += 1) {
    for (let x = 0; x < 96; x += 1) {
      bytes[96 * 96 + y * 96 + x] = fill(x, y);
    }
  }
  return bytes;
}

function renderSamples(
  bytes,
  position,
  timeRow = 2,
  tilemapIndex = 1,
  { dense = false, renderPalette = palette } = {},
) {
  const cameraX = Math.min(56, Math.max(0, position.x - 19));
  const cameraY = Math.min(71, Math.max(0, position.y - 11.5));
  return samplePoints(viewport, { dense }).map(({ x, y }) => {
    const sourceX =
      Math.floor(cameraX) * 32 + Math.floor((cameraX % 1) * 32) + x;
    const sourceY =
      Math.floor(cameraY) * 32 + Math.floor((cameraY % 1) * 32) + y;
    const tile =
      bytes[
        tilemapIndex * 96 * 96 +
          Math.floor(sourceY / 32) * 96 +
          Math.floor(sourceX / 32)
      ];
    return {
      x,
      y,
      rgb: renderPalette(timeRow, tile, sourceX % 32, sourceY % 32),
    };
  });
}

// Equal-color classes for the tiles visible at Massawa (port 75) around
// (61,79), measured at x=8, y=0/8 in portTilesets.png, tileset 2, row 3.
const massawaTileColors = {
  1: [1, 2],
  5: [2, 2],
  6: [2, 2],
  7: [2, 2],
  8: [1, 1],
  11: [2, 1],
  12: [2, 2],
  13: [2, 1],
  25: [3, 3],
  37: [4, 4],
  38: [4, 4],
  43: [4, 2],
  44: [4, 4],
  52: [5, 3],
  55: [6, 7],
  65: [7, 7],
  72: [3, 3],
};
const massawaPalette = (timeRow, tile, _pixelX, pixelY) => {
  assert(massawaTileColors[tile], `Missing Massawa tile ${tile}`);
  return [massawaTileColors[tile][pixelY >= 16 ? 1 : 0], timeRow, 0];
};

function massawaMatch(samples) {
  return matchPortPosition({
    tilemaps: fs.readFileSync(
      path.join(__dirname, '../../src/data/assets/portTilemaps.wasm'),
    ),
    tilemapIndex: 74,
    palette: massawaPalette,
    samples,
    viewport,
    candidates: [
      { x: 61, y: 79 },
      { x: 61, y: 80 },
    ],
  });
}

function massawaSamples(dense) {
  const bytes = fs.readFileSync(
    path.join(__dirname, '../../src/data/assets/portTilemaps.wasm'),
  );
  return renderSamples(bytes, { x: 61, y: 79 }, 3, 74, {
    dense,
    renderPalette: massawaPalette,
  });
}

function match(bytes, samples, candidates) {
  return matchPortPosition({
    tilemaps: bytes,
    tilemapIndex: 1,
    palette,
    samples,
    viewport,
    candidates,
  });
}

test('fixed sample grid covers terrain while excluding the player sprite', () => {
  const points = samplePoints(viewport);
  assert.equal(points.length, 64);
  assert(points.every(({ x, y }) => x >= 0 && x < 1280 && y >= 0 && y < 800));
  assert(
    points.every(({ x, y }) => x < 608 || x >= 672 || y < 368 || y >= 432),
  );
  assert(samplePoints(viewport, { dense: true }).length > 500);
});

test('matches centered camera with its half-tile vertical offset and time row', () => {
  const bytes = tilemaps();
  const actual = { x: 48, y: 44 };
  const result = match(bytes, renderSamples(bytes, actual, 3), [
    { x: 49, y: 44 },
    actual,
    { x: 48, y: 45 },
  ]);
  assert.deepEqual(result.position, actual);
  assert.equal(result.timeRow, 3);
  assert.equal(result.reason, null);
  assert.equal(result.scores[0].matches, result.scores[0].total);
});

test('matches camera clamped at both port-map edges', () => {
  const bytes = tilemaps();
  for (const actual of [
    { x: 1, y: 1 },
    { x: 94, y: 94 },
  ]) {
    const result = match(bytes, renderSamples(bytes, actual), [
      actual,
      { x: 48, y: 44 },
    ]);
    assert.deepEqual(result.position, actual);
  }
});

test('finds actual position two tiles away from stale driver model despite occlusion', () => {
  const bytes = tilemaps();
  const actual = { x: 48, y: 44 };
  const samples = renderSamples(bytes, actual);
  for (let i = 0; i < 3; i += 1) samples[i].rgb = [255, 255, 255];
  const result = match(bytes, samples, [
    { x: 49, y: 46 },
    { x: 49, y: 45 },
    { x: 48, y: 45 },
    actual,
  ]);
  assert.deepEqual(result.position, actual);
  assert(result.scores[0].matches < result.scores[0].total);
});

test('sparse probes distinguish the observed Lisbon two-tile drift on the shipped map', () => {
  const bytes = fs.readFileSync(
    path.join(__dirname, '../../src/data/assets/portTilemaps.wasm'),
  );
  const actual = { x: 48, y: 44 };
  const result = matchPortPosition({
    tilemaps: bytes,
    tilemapIndex: 0,
    palette,
    samples: renderSamples(bytes, actual, 2, 0),
    viewport,
    candidates: [actual, { x: 49, y: 44 }, { x: 49, y: 45 }, { x: 49, y: 46 }],
  });
  assert.deepEqual(result.position, actual);
  assert(result.confidence >= 0.05);
});

test('fails closed on repeating terrain with equal candidate scores', () => {
  const bytes = tilemaps(() => 9);
  const result = match(bytes, renderSamples(bytes, { x: 48, y: 44 }), [
    { x: 48, y: 44 },
    { x: 49, y: 44 },
  ]);
  assert.equal(result.position, null);
  assert.equal(result.reason, 'ambiguous');
  assert.equal(result.scores[0].matches, result.scores[1].matches);
});

test('unique perfect dense Massawa view resolves the observed 996 to 949 near tie', () => {
  const result = massawaMatch(massawaSamples(true));
  assert.deepEqual(
    result.scores.map(({ matches }) => matches),
    [996, 949],
  );
  assert.deepEqual(result.position, { x: 61, y: 79 });
});

test('near-perfect dense Massawa view still fails closed below the five-percent margin', () => {
  const samples = massawaSamples(true);
  const other = renderSamples(
    fs.readFileSync(
      path.join(__dirname, '../../src/data/assets/portTilemaps.wasm'),
    ),
    { x: 61, y: 80 },
    3,
    74,
    { dense: true, renderPalette: massawaPalette },
  );
  const different = samples.findIndex(
    (sample, index) => sample.rgb[0] !== other[index].rgb[0],
  );
  assert(different >= 0);
  samples[different].rgb = [255, 255, 255];
  const result = massawaMatch(samples);
  assert.deepEqual(
    result.scores.map(({ matches }) => matches),
    [995, 949],
  );
  assert.equal(result.position, null);
  assert.equal(result.reason, 'ambiguous');
});

test('perfect sparse Massawa view still requires denser evidence', () => {
  const result = massawaMatch(massawaSamples(false));
  assert.deepEqual(
    result.scores.map(({ matches }) => matches),
    [64, 62],
  );
  assert.equal(result.position, null);
  assert.equal(result.reason, 'ambiguous');
});

test('equal-perfect dense views remain ambiguous', () => {
  const bytes = tilemaps(() => 9);
  const result = match(
    bytes,
    renderSamples(bytes, { x: 48, y: 44 }, 2, 1, { dense: true }),
    [
      { x: 48, y: 44 },
      { x: 49, y: 44 },
    ],
  );
  assert.deepEqual(
    result.scores.map(({ matches }) => matches),
    [996, 996],
  );
  assert.equal(result.position, null);
  assert.equal(result.reason, 'ambiguous');
});

const terrainScore = (x, y, matches = 994) => ({
  position: { x, y },
  matches,
  total: 996,
  ratio: matches / 996,
});
const spriteScore = (x, y, matches = 430) => ({
  position: { x, y },
  matches,
  total: 430,
  ratio: matches / 430,
});

test('Massawa bottom clamp resolves the unique terrain and sprite top-score intersection', () => {
  const terrain = {
    reason: 'ambiguous',
    scores: [
      terrainScore(56, 87),
      terrainScore(56, 88),
      terrainScore(56, 89),
      terrainScore(55, 88, 947),
    ],
  };
  const sprite = {
    reason: 'ambiguous',
    scores: [spriteScore(55, 88), spriteScore(56, 88), spriteScore(56, 87, 29)],
  };
  assert.deepEqual(intersectPortEvidence?.(terrain, sprite) ?? null, {
    x: 56,
    y: 88,
  });
});

test('two or zero top-score intersections remain unresolved', () => {
  const terrain = {
    reason: 'ambiguous',
    scores: [terrainScore(56, 87), terrainScore(56, 88)],
  };
  for (const sprite of [
    {
      reason: 'ambiguous',
      scores: [spriteScore(56, 87), spriteScore(56, 88)],
    },
    { reason: 'ambiguous', scores: [spriteScore(55, 88)] },
  ]) {
    assert.equal(intersectPortEvidence?.(terrain, sprite) ?? null, null);
  }
});

test('intersection rejects weak or single-sensor evidence', () => {
  for (const [terrain, sprite] of [
    [
      { reason: 'ambiguous', scores: [terrainScore(56, 88, 985)] },
      { reason: 'ambiguous', scores: [spriteScore(56, 88)] },
    ],
    [
      { reason: 'ambiguous', scores: [terrainScore(56, 88)] },
      { reason: 'ambiguous', scores: [spriteScore(56, 88, 400)] },
    ],
    [
      { reason: null, scores: [terrainScore(56, 88)] },
      { reason: 'ambiguous', scores: [spriteScore(56, 88)] },
    ],
  ]) {
    assert.equal(intersectPortEvidence?.(terrain, sprite) ?? null, null);
  }
});

test('fails closed when no candidate explains the rendered pixels', () => {
  const bytes = tilemaps();
  const samples = renderSamples(bytes, { x: 48, y: 44 });
  for (const sample of samples) sample.rgb = [255, 255, 255];
  const result = match(bytes, samples, [
    { x: 48, y: 44 },
    { x: 49, y: 44 },
  ]);
  assert.equal(result.position, null);
  assert.equal(result.reason, 'insufficient-match');
  assert(result.scores.every(({ ratio }) => ratio < 0.9));
});
