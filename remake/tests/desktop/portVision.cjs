'use strict';

const TILE_SIZE = 32;
const PORT_SIZE = 96;

/**
 * Stable terrain probes in the canvas's native pixel coordinates. The default
 * is an 8x8 grid; `{dense:true}` can resolve an ambiguous sparse result. The
 * central 64x64 player sprite is excluded in either mode.
 */
function samplePoints({ width, height }, { dense = false } = {}) {
  const points = [];
  const columns = width / TILE_SIZE;
  const rows = height / TILE_SIZE;
  const xCount = dense ? columns : 8;
  const yCount = dense ? rows : 8;
  for (let yi = 0; yi < yCount; yi += 1) {
    const y = TILE_SIZE * Math.round(((yi + 0.5) * rows) / yCount - 0.5) + 16;
    for (let xi = 0; xi < xCount; xi += 1) {
      const x =
        TILE_SIZE * Math.round(((xi + 0.5) * columns) / xCount - 0.5) + 16;
      if (
        x >= width / 2 - 32 &&
        x < width / 2 + 32 &&
        y >= height / 2 - 32 &&
        y < height / 2 + 32
      )
        continue;
      points.push({ x, y });
    }
  }
  return points;
}

/**
 * Match only rendered terrain, without reading game objects or saved state.
 *
 * `tilemaps` contains consecutive 96x96 port maps; `tilemapIndex` selects one.
 * `palette(timeRow, tileIndex, pixelX, pixelY)` returns the [r,g,b] triplet
 * from the selected port tileset's 32x32 tile. `timeRow` is 0..3 within that
 * tileset. `samples` are `{x,y,rgb:[r,g,b]}` from the native #camera canvas,
 * preferably at every point returned by `samplePoints(viewport)`.
 *
 * The player is 2x2 tiles. The projection reproduces getCameraPosition and
 * drawCamera for a settled integer player position and a nonwrapping port map.
 * A nonunique or weak match returns position:null and ranked diagnostic scores.
 */
function matchPortPosition({
  tilemaps,
  tilemapIndex,
  palette,
  samples,
  viewport,
  candidates,
}) {
  const widthTiles = viewport.width / TILE_SIZE;
  const heightTiles = viewport.height / TILE_SIZE;
  if (
    !Number.isInteger(widthTiles) ||
    !Number.isInteger(heightTiles) ||
    !Array.isArray(samples) ||
    samples.length < 48 ||
    tilemaps.length < (tilemapIndex + 1) * PORT_SIZE * PORT_SIZE
  ) {
    return { position: null, reason: 'insufficient-samples', scores: [] };
  }

  const scores = [];
  const seen = new Set();
  for (const position of candidates) {
    if (
      !Number.isInteger(position.x) ||
      !Number.isInteger(position.y) ||
      position.x < 0 ||
      position.y < 0 ||
      position.x >= PORT_SIZE ||
      position.y >= PORT_SIZE
    )
      continue;
    const key = `${position.x},${position.y}`;
    if (seen.has(key)) continue;
    seen.add(key);

    // getCameraPosition centers a 2x2 player and clamps the port map.
    const cameraX = Math.min(
      PORT_SIZE - widthTiles,
      Math.max(0, position.x + 1 - widthTiles / 2),
    );
    const cameraY = Math.min(
      PORT_SIZE - heightTiles,
      Math.max(0, position.y + 1 - heightTiles / 2),
    );
    const sourceX =
      Math.floor(cameraX) * TILE_SIZE + Math.floor((cameraX % 1) * TILE_SIZE);
    const sourceY =
      Math.floor(cameraY) * TILE_SIZE + Math.floor((cameraY % 1) * TILE_SIZE);

    let best = { position, timeRow: 0, matches: -1, total: samples.length };
    for (let timeRow = 0; timeRow < 4; timeRow += 1) {
      let matches = 0;
      for (const sample of samples) {
        const pixelX = sourceX + sample.x;
        const pixelY = sourceY + sample.y;
        const tileX = Math.floor(pixelX / TILE_SIZE);
        const tileY = Math.floor(pixelY / TILE_SIZE);
        if (tileX < 0 || tileY < 0 || tileX >= PORT_SIZE || tileY >= PORT_SIZE)
          continue;
        const tile =
          tilemaps[
            tilemapIndex * PORT_SIZE * PORT_SIZE + tileY * PORT_SIZE + tileX
          ];
        const expected = palette(
          timeRow,
          tile,
          pixelX % TILE_SIZE,
          pixelY % TILE_SIZE,
        );
        if (
          expected[0] === sample.rgb[0] &&
          expected[1] === sample.rgb[1] &&
          expected[2] === sample.rgb[2]
        )
          matches += 1;
      }
      if (matches > best.matches)
        best = { position, timeRow, matches, total: samples.length };
    }
    scores.push({ ...best, ratio: best.matches / best.total });
  }
  scores.sort(
    (a, b) =>
      b.matches - a.matches ||
      a.position.y - b.position.y ||
      a.position.x - b.position.x,
  );
  const top = scores[0];
  if (!top || top.ratio < 0.9) {
    return { position: null, reason: 'insufficient-match', scores };
  }
  const uniquePerfectDenseMatch =
    samples.length >= 500 &&
    top.matches === top.total &&
    (!scores[1] || scores[1].matches < top.matches);
  if (
    scores[1] &&
    (top.matches - scores[1].matches) / top.total < 0.05 &&
    !uniquePerfectDenseMatch
  ) {
    return { position: null, reason: 'ambiguous', scores };
  }
  return {
    position: top.position,
    timeRow: top.timeRow,
    confidence: scores[1]
      ? (top.matches - scores[1].matches) / top.total
      : top.ratio,
    reason: null,
    scores,
  };
}

function intersectPortEvidence(terrain, sprite) {
  if (terrain?.reason !== 'ambiguous' || sprite?.reason !== 'ambiguous')
    return null;
  const terrainScores = terrain.scores || [];
  const spriteScores = sprite.scores || [];
  if (!terrainScores.length || !spriteScores.length) return null;
  const terrainBest = Math.max(...terrainScores.map((score) => score.ratio));
  const spriteBest = Math.max(...spriteScores.map((score) => score.ratio));
  if (terrainBest < 0.99 || spriteBest < 0.95) return null;
  const terrainLeaders = terrainScores.filter(
    (score) => score.ratio === terrainBest,
  );
  const spritePositions = new Set(
    spriteScores
      .filter((score) => score.ratio === spriteBest)
      .map(({ position }) => `${position.x},${position.y}`),
  );
  if (terrainLeaders.length === 1 && spritePositions.size !== 1) return null;
  const common = terrainLeaders.filter(({ position }) =>
    spritePositions.has(`${position.x},${position.y}`),
  );
  return common.length === 1 ? common[0].position : null;
}

module.exports = { samplePoints, matchPortPosition, intersectPortEvidence };
