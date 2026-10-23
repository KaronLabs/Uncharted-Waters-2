'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { matchPortSprite } = require('./portSpriteVision.cjs');

const SIZE = 32;
const BACKGROUND = [37, 43, 47];

function frames() {
  return Array.from({ length: 8 }, (_, frame) => {
    const rgba = new Uint8Array(SIZE * SIZE * 4);
    for (let y = 8; y < 24; y++) {
      for (let x = 8; x < 24; x++) {
        const index = (y * SIZE + x) * 4;
        rgba[index] = 100 + frame * 13 + (x % 7);
        rgba[index + 1] = 55 + y;
        rgba[index + 2] = 200 - x;
        rgba[index + 3] = 255;
      }
    }
    return rgba;
  });
}

function patch(position, actual, source, obscured = 0) {
  const rgb = new Uint8Array(SIZE * SIZE * 3);
  const originX = position.x * SIZE;
  const originY = position.y * SIZE;
  const actualX = actual.x * SIZE;
  const actualY = actual.y * SIZE;
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const canvasX = originX + x * 2 + 1;
      const canvasY = originY + y * 2 + 1;
      const sourceX = Math.floor((canvasX - actualX) / 2);
      const sourceY = Math.floor((canvasY - actualY) / 2);
      const target = (y * SIZE + x) * 3;
      const sourceIndex = (sourceY * SIZE + sourceX) * 4;
      const inSprite =
        sourceX >= 0 &&
        sourceX < SIZE &&
        sourceY >= 0 &&
        sourceY < SIZE &&
        source[sourceIndex + 3] !== 0;
      const covered = inSprite && (x - 8) * 16 + y - 8 < obscured;
      for (let channel = 0; channel < 3; channel++)
        rgb[target + channel] =
          inSprite && !covered
            ? source[sourceIndex + channel]
            : BACKGROUND[channel];
    }
  }
  return { position, rgb };
}

test('sprite resolves port positions sharing one clamped terrain view', () => {
  const source = frames();
  const actual = { x: 17, y: 63 };
  const result = matchPortSprite({
    frames: source,
    patches: [
      patch({ x: 18, y: 63 }, actual, source[3]),
      patch(actual, actual, source[3]),
    ],
  });
  assert.deepEqual(result.position, actual);
  assert.equal(result.frame, 3);
  assert.equal(result.scores[0].matches, 256);
  assert.equal(result.reason, null);
});

test('small opaque overlap remains identifiable without accepting a wrong frame', () => {
  const source = frames();
  const actual = { x: 17, y: 63 };
  const result = matchPortSprite({
    frames: source,
    patches: [
      patch({ x: 18, y: 63 }, actual, source[5]),
      patch(actual, actual, source[5], 20),
    ],
  });
  assert.deepEqual(result.position, actual);
  assert.equal(result.frame, 5);
  assert(result.scores[0].matches < result.scores[0].total);
});

test('large occlusion fails closed', () => {
  const source = frames();
  const actual = { x: 17, y: 63 };
  const result = matchPortSprite({
    frames: source,
    patches: [patch(actual, actual, source[0], 80)],
  });
  assert.equal(result.position, null);
  assert.equal(result.reason, 'insufficient-match');
});

test('indistinguishable candidate patches fail closed', () => {
  const source = frames();
  const actual = { x: 17, y: 63 };
  const first = patch(actual, actual, source[0]);
  const result = matchPortSprite({
    frames: source,
    patches: [first, { position: { x: 18, y: 63 }, rgb: first.rgb }],
  });
  assert.equal(result.position, null);
  assert.equal(result.reason, 'ambiguous');
});

test('empty or truncated image data fails closed', () => {
  const source = frames();
  for (const input of [
    { frames: source, patches: [] },
    {
      frames: source.slice(0, 7),
      patches: [patch({ x: 1, y: 1 }, { x: 1, y: 1 }, source[0])],
    },
    { frames: source, patches: [{ position: { x: 1, y: 1 }, rgb: [0, 0] }] },
  ]) {
    const result = matchPortSprite(input);
    assert.equal(result.position, null);
    assert.equal(result.reason, 'insufficient-samples');
  }
});
