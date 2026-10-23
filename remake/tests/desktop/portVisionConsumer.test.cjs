'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const {
  samplePoints,
  matchPortPosition,
  intersectPortEvidence,
} = require('./portVision.cjs');
const { matchPortSprite } = require('./portSpriteVision.cjs');
const { DesktopRuntime } = require('./runtime.cjs');
const { JoaoJourney } = require('./joaoJourney.cjs');

async function syntheticFrame({ actual, markerX }) {
  // Synthetic frame exercises the real read-only observer and both matchers.
  // It does not claim that an actual gameplay frame placed the player wrongly.
  const viewport = { width: 1280, height: 800 };
  const wrong = { x: actual.x + 1, y: actual.y };
  const candidates = [];
  for (let y = actual.y - 2; y <= actual.y + 2; y++)
    for (let x = actual.x - 2; x <= actual.x + 2; x++)
      if (Math.abs(x - actual.x) + Math.abs(y - actual.y) <= 2)
        candidates.push({ x, y });

  const tilemaps = Buffer.alloc(96 * 96);
  tilemaps[55 * 96 + markerX] = 1;
  const palette = (_time, tile) => [tile, 0, 0];
  const camera = (position) => ({
    x: Math.min(56, Math.max(0, position.x - 19)),
    y: Math.min(71, Math.max(0, position.y - 11.5)),
  });
  const terrainAt = (position, x, y) => {
    const offset = camera(position);
    const tile =
      tilemaps[
        Math.floor((offset.y * 32 + y) / 32) * 96 +
          Math.floor((offset.x * 32 + x) / 32)
      ];
    return palette(0, tile);
  };
  const image = new Uint8ClampedArray(viewport.width * viewport.height * 4);
  const put = (x, y, rgb) =>
    image.set([...rgb, 255], (y * viewport.width + x) * 4);
  for (let y = 0; y < viewport.height; y++)
    for (let x = 0; x < viewport.width; x++) put(x, y, terrainAt(actual, x, y));
  for (let y = 368; y < 432; y++)
    for (let x = 608; x < 672; x++) put(x, y, [80, 80, 80]);

  const points = samplePoints(viewport, { dense: true });
  for (const { x, y } of points) {
    const wanted = terrainAt(wrong, x, y);
    if (wanted[0] !== terrainAt(actual, x, y)[0]) put(x, y, wanted);
  }
  put(points[0].x, points[0].y, [2, 0, 0]);

  const cameraCanvas = { ...viewport };
  const document = {
    querySelectorAll: () => [],
    querySelector: (selector) => (selector === '#camera' ? cameraCanvas : null),
    createElement: (tag) => {
      assert.equal(tag, 'canvas');
      return {
        width: 0,
        height: 0,
        getContext: () => ({
          drawImage(source) {
            assert.equal(source, cameraCanvas);
          },
          getImageData(x, y, width, height) {
            const data = new Uint8ClampedArray(width * height * 4);
            for (let row = 0; row < height; row++) {
              const start = ((y + row) * viewport.width + x) * 4;
              data.set(
                image.subarray(start, start + width * 4),
                row * width * 4,
              );
            }
            return { data };
          },
        }),
      };
    },
  };
  const runtime = Object.create(DesktopRuntime.prototype);
  runtime.call = async (_method, { expression }) => ({
    result: { value: await vm.runInNewContext(expression, { document }) },
  });
  runtime.record = () => {};

  const frames = Array.from({ length: 8 }, (_, frame) =>
    Uint8Array.from({ length: 32 * 32 * 4 }, (_, i) =>
      i % 4 === 3 ? 255 : 80 + frame,
    ),
  );
  const terrain = matchPortPosition({
    tilemaps,
    tilemapIndex: 0,
    palette,
    samples: await runtime.observe({ kind: 'portPixels', points }),
    viewport,
    candidates,
  });
  const sprite = matchPortSprite({
    frames,
    patches: await runtime.observe({
      kind: 'portSpritePatches',
      positions: candidates,
    }),
  });
  const journey = Object.create(JoaoJourney.prototype);
  journey.r = runtime;
  journey.p = {
    SUPPLY_PORT_TILESET: 0,
    regularPorts: [{}],
    portTilemaps: tilemaps,
  };
  journey.ports = [{ id: '1', tileset: 0 }];
  journey.portPalettes = new Map([
    [
      0,
      Array.from({ length: 4 }, () =>
        Array.from({ length: 2 }, (_, tile) => [
          [tile, 0, 0],
          [tile, 0, 0],
        ]),
      ),
    ],
  ]);
  journey.portSpriteFrames = frames;
  return { actual, wrong, candidates, terrain, sprite, journey };
}

test('non-discriminating sprite pixels cannot choose a terrain near tie', async () => {
  const { actual, wrong, candidates, terrain, sprite, journey } =
    await syntheticFrame({ actual: { x: 48, y: 44 }, markerX: 65 });
  assert.equal(candidates.length, 13);
  assert.equal(terrain.reason, 'ambiguous');
  assert.deepEqual(terrain.scores[0].position, wrong);
  assert.equal(terrain.scores[0].matches, 995);
  assert.equal(
    terrain.scores.find(
      ({ position }) => position.x === actual.x && position.y === actual.y,
    ).matches,
    993,
  );
  assert.equal(sprite.reason, 'ambiguous');
  assert.equal(sprite.scores.length, 13);
  assert(
    sprite.scores.every(
      ({ matches, total }) => matches === 1024 && total === 1024,
    ),
  );
  await assert.rejects(
    journey.portPosition('1', actual),
    /Rendered port position unresolved at 1 near 48,44: ambiguous/,
  );
  assert.equal(intersectPortEvidence(terrain, sprite), null);
});

test('excluding one unrelated sprite candidate cannot decide a unique terrain leader', async () => {
  const { actual, wrong, candidates, terrain, sprite, journey } =
    await syntheticFrame({ actual: { x: 20, y: 44 }, markerX: 37 });
  assert.equal(candidates.length, 13);
  assert.equal(terrain.reason, 'ambiguous');
  assert.deepEqual(terrain.scores[0].position, wrong);
  assert.equal(terrain.scores[0].matches, 995);
  assert.equal(
    terrain.scores.find(
      ({ position }) => position.x === actual.x && position.y === actual.y,
    ).matches,
    993,
  );
  assert.equal(sprite.reason, 'ambiguous');
  assert.equal(sprite.scores.length, 13);
  const spriteTop = sprite.scores.filter(
    ({ ratio }) => ratio === sprite.scores[0].ratio,
  );
  assert.equal(spriteTop.length, 12);
  assert(
    spriteTop.some(
      ({ position }) => position.x === actual.x && position.y === actual.y,
    ),
  );
  assert(
    spriteTop.some(
      ({ position }) => position.x === wrong.x && position.y === wrong.y,
    ),
  );
  await assert.rejects(
    journey.portPosition('1', actual),
    /Rendered port position unresolved at 1 near 20,44: ambiguous/,
  );
  assert.equal(intersectPortEvidence(terrain, sprite), null);
});
