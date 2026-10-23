import { gameScale, fitGameViewport } from './gameViewport';

test.each([
  [1760, 1000],
  [1366, 768],
  [1280, 720],
])(
  'game fits %i x %i without changing its aspect ratio or upscaling',
  (width, height) => {
    const scale = gameScale(width, height);
    expect(scale).toBeGreaterThan(0);
    expect(scale).toBeLessThanOrEqual(1);
    expect(1640 * scale).toBeLessThanOrEqual(width);
    expect(800 * scale + 32).toBeLessThanOrEqual(height);
    expect((1280 * scale) / (800 * scale)).toBe(1.6);
  },
);

test('resize writes the same scale used by the displayed game frame', () => {
  fitGameViewport();
  expect(document.documentElement.style.getPropertyValue('--game-scale')).toBe(
    String(gameScale(window.innerWidth, window.innerHeight)),
  );
});
