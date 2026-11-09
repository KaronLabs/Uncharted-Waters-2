import React from 'react';

import { t } from '../localization';
import state from '../state/state';
import type { ScenarioEdition } from '../state/saveMigrations';
import { ALI_ENDING_EVENT_ID } from '../story/content/arcs/ali/merchant';

interface Props {
  scenarioEdition?: ScenarioEdition;
}

export default function AliEnding({ scenarioEdition }: Props = {}) {
  const isLegacy =
    scenarioEdition !== undefined
      ? scenarioEdition === 'legacy-remake'
      : state.storyEvents?.includes(ALI_ENDING_EVENT_ID) ||
        (state.protagonistId === 'ali' &&
          state.scenarioEdition === 'legacy-remake');

  return (
    <div
      className="mb-5 rounded border border-amber-700 bg-amber-50 p-4 text-black break-words"
      data-test="aliEnding"
    >
      <div className="mb-2 text-2xl font-bold">
        {isLegacy ? t('Ali’s fortune') : t('Ali’s family home')}
      </div>
      <div className="text-lg">
        {isLegacy
          ? t(
              'Ali built a legendary trading fleet from a single dhow, reunited with his sister Sasha in Basra, and rose to Grand Commercial Advisor in Istanbul.',
            )
          : t(
              'Ali repaid every debt, reunited with his sister Sapha in Basra, bought the family house, and celebrated with Sapha, Radia, Salim, and Rustem at the Istanbul tavern.',
            )}
      </div>
      <div className="mt-2 text-lg font-bold">
        {t('The main story is complete. You can continue exploring.')}
      </div>
    </div>
  );
}
