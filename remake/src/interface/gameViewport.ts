const GAME_WIDTH = 1640;
const GAME_HEIGHT = 800;
const VERTICAL_PADDING = 32;

// CSS zoom changes the displayed size only; canvas and game coordinates stay fixed.
export const gameScale = (width: number, height: number): number =>
  Math.min(1, width / GAME_WIDTH, (height - VERTICAL_PADDING) / GAME_HEIGHT);

export const fitGameViewport = (): void => {
  document.documentElement.style.setProperty(
    '--game-scale',
    String(gameScale(window.innerWidth, window.innerHeight)),
  );
};
