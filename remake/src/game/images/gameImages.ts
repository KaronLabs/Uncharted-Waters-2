import portTilesets from './portTilesets.png';
import portCharacters from './portCharacters.png';
import portPlayerKatarina from './portPlayerKatarina.png';
import portPlayerOtto from './portPlayerOtto.png';
import portPlayerErnst from './portPlayerErnst.png';
import portPlayerPietro from './portPlayerPietro.png';
import portPlayerAli from './portPlayerAli.png';
import worldTileset from './worldTileset.png';
import worldShips from './worldShips.png';

const gameImages = {
  portTilesets,
  portCharacters,
  portPlayerKatarina,
  portPlayerOtto,
  portPlayerErnst,
  portPlayerPietro,
  portPlayerAli,
  worldTileset,
  worldShips,
};

export type GameImages = keyof typeof gameImages;

export default gameImages;
