import React from 'react';

import { t } from '../localization';
import state from '../state/state';
import type { ScenarioEdition } from '../state/saveMigrations';
import { ERNST_ENDING_EVENT_ID } from '../story/content/arcs/ernst/worldmap';

interface Props {
  scenarioEdition?: ScenarioEdition;
}

export default function ErnstEnding({ scenarioEdition }: Props = {}) {
  const isLegacy =
    scenarioEdition !== undefined
      ? scenarioEdition === 'legacy-remake'
      : state.storyEvents?.includes(ERNST_ENDING_EVENT_ID) ||
        (state.protagonistId === 'ernst' &&
          state.scenarioEdition === 'legacy-remake');

  return (
    <div
      className="mb-5 rounded border border-amber-700 bg-amber-50 p-4 text-black break-words"
      data-test="ernstEnding"
    >
      <div className="mb-2 text-2xl font-bold">
        {isLegacy
          ? t('Ernst’s world atlas')
          : t('Ernst and Laura’s homecoming')}
      </div>
      <div className="text-lg">
        {isLegacy
          ? t(
              'Ernst, Laura, and Hans united the bearings of every ocean into Master Mercator’s complete world atlas in Amsterdam.',
            )
          : t(
              'Ernst, Laura, and Hans followed the Yellow Sea clue up the Huang He to Changan, where Laura reunited with her parents at their family home.',
            )}
      </div>
      <div className="mt-2 text-lg font-bold">
        {t('The main story is complete. You can continue exploring.')}
      </div>
    </div>
  );
}
