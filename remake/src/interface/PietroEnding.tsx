import React from 'react';

import { t } from '../localization';
import state from '../state/state';
import type { ScenarioEdition } from '../state/saveMigrations';
import { PIETRO_ENDING_EVENT_ID } from '../story/content/arcs/pietro/adventure';

interface Props {
  scenarioEdition?: ScenarioEdition;
}

export default function PietroEnding({ scenarioEdition }: Props = {}) {
  const isLegacy =
    scenarioEdition !== undefined
      ? scenarioEdition === 'legacy-remake'
      : state.storyEvents?.includes(PIETRO_ENDING_EVENT_ID) ||
        (state.protagonistId === 'pietro' &&
          state.scenarioEdition === 'legacy-remake');

  return (
    <div
      className="mb-5 rounded border border-amber-700 bg-amber-50 p-4 text-black break-words"
      data-test="pietroEnding"
    >
      <div className="mb-2 text-2xl font-bold">{t('Pietro’s triumph')}</div>
      <div className="text-lg">
        {isLegacy
          ? t(
              'Pietro cleared the Conti family debts, aided João at Massawa, and unlocked the golden horizon of El Dorado.',
            )
          : t(
              'Pietro cleared the Conti family debts, unearthed the Gold Medallion and Poseidon’s Staff, and reported the Staff of Kings to Duchess Franco in Lisbon.',
            )}
      </div>
      <div className="mt-2 text-lg font-bold">
        {t('The main story is complete. You can continue exploring.')}
      </div>
    </div>
  );
}
