import Assets from './assets';
import Input from './input';
import renderInterface from './interface/Interface';
import createWorld from './game/world/world';
import createPort from './game/port/port';

import state from './state/state';
import { updateGeneral } from './state/actionsPort';
import { setDockedFleetPositions } from './state/actionsWorld';
import { localizeDocument, subscribeLocale } from './localization';
import { runWorldFrame } from './game/world/runWorldFrame';
import './combat/combatEvents';
import { fitGameViewport } from './interface/gameViewport';

localizeDocument();
subscribeLocale(localizeDocument);
fitGameViewport();
window.addEventListener('resize', fitGameViewport);

const start = async () => {
  await Assets.load();
  Input.setup();

  await renderInterface();

  updateGeneral();

  setDockedFleetPositions();

  const loop = () => {
    if (!document.getElementById('camera')) {
      requestAnimationFrame(loop);
      return;
    }

    if (state.portId !== null) {
      if (!state.port) {
        state.port = createPort(state.portId);
      }

      if (state.buildingId === null) {
        if (!Input.isSuspended()) state.port.update();
        state.port.draw();
      }
    }

    if (state.portId === null) {
      if (!state.world) {
        state.world = createWorld();
      }

      runWorldFrame(state.world);
    }

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
};

start();
