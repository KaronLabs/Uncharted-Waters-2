'use strict';

const SIDE = 32;
const PIXELS = SIDE * SIDE;

/** Match the eight player frames against 2x-downsampled canvas patches. */
function matchPortSprite({ frames, patches }) {
  if (
    !Array.isArray(frames) ||
    frames.length !== 8 ||
    frames.some((frame) => frame?.length !== PIXELS * 4) ||
    !Array.isArray(patches) ||
    patches.length === 0 ||
    patches.some(
      (patch) =>
        !Number.isInteger(patch?.position?.x) ||
        !Number.isInteger(patch?.position?.y) ||
        patch.rgb?.length !== PIXELS * 3,
    )
  )
    return { position: null, reason: 'insufficient-samples', scores: [] };

  const scores = [];
  const seen = new Set();
  for (const { position, rgb } of patches) {
    const key = `${position.x},${position.y}`;
    if (seen.has(key)) continue;
    seen.add(key);
    let best = null;
    for (let frame = 0; frame < frames.length; frame++) {
      const source = frames[frame];
      let matches = 0;
      let total = 0;
      for (let pixel = 0; pixel < PIXELS; pixel++) {
        const sourceIndex = pixel * 4;
        if (source[sourceIndex + 3] === 0) continue;
        total++;
        const sampleIndex = pixel * 3;
        if (
          source[sourceIndex] === rgb[sampleIndex] &&
          source[sourceIndex + 1] === rgb[sampleIndex + 1] &&
          source[sourceIndex + 2] === rgb[sampleIndex + 2]
        )
          matches++;
      }
      if (total < 64) continue;
      const ratio = matches / total;
      if (!best || ratio > best.ratio)
        best = { position, frame, matches, total, ratio };
    }
    if (best) scores.push(best);
  }

  scores.sort(
    (a, b) =>
      b.ratio - a.ratio ||
      a.position.y - b.position.y ||
      a.position.x - b.position.x,
  );
  const top = scores[0];
  if (!top) return { position: null, reason: 'insufficient-samples', scores };
  if (top.ratio < 0.85)
    return { position: null, reason: 'insufficient-match', scores };
  if (scores[1] && top.ratio - scores[1].ratio < 0.05)
    return { position: null, reason: 'ambiguous', scores };
  return {
    position: top.position,
    frame: top.frame,
    confidence: scores[1] ? top.ratio - scores[1].ratio : top.ratio,
    reason: null,
    scores,
  };
}

module.exports = { matchPortSprite };
