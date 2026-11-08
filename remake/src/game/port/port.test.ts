import Assets from '../../assets';
import type { ProtagonistId } from '../../state/saveMigrations';
import state from '../../state/state';
import { drawCharacter } from '../world/sharedUtils';
import createPort from './port';

jest.mock('../../assets', () => ({
  __esModule: true,
  default: { images: jest.fn((id: string) => ({ id })) },
}));
jest.mock('../../map', () => ({ __esModule: true, default: () => ({}) }));
jest.mock('../../building', () => ({ __esModule: true, default: () => ({}) }));
jest.mock('../../percentNextMove', () => ({
  __esModule: true,
  default: { get: () => 0, update: jest.fn() },
}));
jest.mock('../../state/selectors', () => ({
  getTimeOfDay: () => 0,
  isDay: () => false,
}));
jest.mock('./portUtils', () => ({
  getPortData: () => ({ isSupplyPort: false }),
}));
jest.mock('./portCharacters', () => ({
  __esModule: true,
  default: () => ({
    player: () => ({ kind: 'player' }),
    npcs: () => [{ kind: 'npc' }],
  }),
}));
jest.mock('../world/sharedUtils', () => ({
  drawCamera: jest.fn(),
  drawCharacter: jest.fn(),
  getCameraPosition: () => ({ x: 0, y: 0 }),
}));

const originalProtagonist = state.protagonistId;

beforeEach(() => {
  document.body.innerHTML =
    '<canvas id="camera" width="640" height="480"></canvas>';
  global.HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({});
  jest.clearAllMocks();
});

afterAll(() => {
  state.protagonistId = originalProtagonist;
});

const playerSheets: Array<[ProtagonistId, string]> = [
  ['joao', 'portCharacters'],
  ['katarina', 'portPlayerKatarina'],
  ['otto', 'portPlayerOtto'],
  ['ernst', 'portPlayerErnst'],
  ['pietro', 'portPlayerPietro'],
  ['ali', 'portPlayerAli'],
];

test.each(playerSheets)(
  '%s uses its own port sprite while NPCs keep theirs',
  (id, sheet) => {
    state.protagonistId = id;
    createPort('1').draw();

    const { calls } = (drawCharacter as jest.Mock).mock;
    expect(calls).toHaveLength(2);
    expect(calls[0][1]).toEqual({ id: sheet });
    expect(calls[1][1]).toEqual({ id: 'portCharacters' });
    expect(Assets.images).toHaveBeenCalledTimes(2);
  },
);
