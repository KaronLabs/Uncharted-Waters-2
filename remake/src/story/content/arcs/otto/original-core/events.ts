import {
  characterId,
  storyArcId,
  storyEventId,
  type StoryCondition,
  type StoryEvent,
  type StoryEventId,
} from '../../../../core/types';
import { ottoOriginalCoreDialogue as dialogue } from './dialogue';

export const OTTO_ORIGINAL_CORE_ARC_ID = storyArcId('otto.original-core');

const eventId = (suffix: string) =>
  storyEventId(`otto.original-core.${suffix}`);

export const OTTO_OC_PALACE_COMMISSION_EVENT_ID = eventId(
  'london-palace-commission',
);
export const OTTO_OC_SHIPYARD_FLAGSHIP_EVENT_ID = eventId(
  'london-shipyard-flagship',
);
export const OTTO_OC_PUB_BRAWL_EVENT_ID = eventId('london-pub-brawl');
export const OTTO_OC_PUB_BRAWL_RETRY_EVENT_ID = eventId(
  'london-pub-brawl-retry',
);
export const OTTO_OC_MATTHEW_RECRUITED_EVENT_ID = eventId(
  'london-harbor-matthew-joins',
);
export const OTTO_OC_SEVILLE_INTEL_EVENT_ID = eventId('seville-pub-intel');
export const OTTO_OC_SEVILLE_HEIST_EVENT_ID = eventId('seville-harbor-heist');
export const OTTO_OC_SEVILLE_HEIST_RETRY_EVENT_ID = eventId(
  'seville-harbor-heist-retry',
);
export const OTTO_OC_CATALINA_MARKET_RESCUE_EVENT_ID = eventId(
  'catalina-market-rescue',
);
export const OTTO_OC_CATALINA_PUB_EARLY_EVENT_ID =
  eventId('catalina-pub-early');
export const OTTO_OC_CATALINA_PUB_ALLIANCE_EVENT_ID = eventId(
  'catalina-pub-alliance',
);
export const OTTO_OC_CATALINA_PUB_LATE_EVENT_ID = eventId('catalina-pub-late');
export const OTTO_OC_LONDON_GOLD_SHIP_INTEL_EVENT_ID = eventId(
  'london-pub-gold-ship-intel',
);
export const OTTO_OC_VERACRUZ_GOLD_SHIP_EVENT_ID = eventId(
  'veracruz-ortega-gold-ship',
);
export const OTTO_OC_VERACRUZ_GOLD_SHIP_RETRY_EVENT_ID = eventId(
  'veracruz-ortega-gold-ship-retry',
);
export const OTTO_OC_PALACE_ARMADA_ORDER_EVENT_ID = eventId(
  'london-palace-armada-order',
);
export const OTTO_OC_GUILD_ARMADA_BRIEFING_EVENT_ID = eventId(
  'london-guild-armada-briefing',
);
export const OTTO_OC_NANTES_ARMADA_EVENT_ID = eventId('nantes-armada-clash');
export const OTTO_OC_NANTES_ARMADA_RETRY_EVENT_ID = eventId(
  'nantes-armada-clash-retry',
);
export const OTTO_OC_SANTO_DOMINGO_ARMADA_EVENT_ID = eventId(
  'santo-domingo-armada',
);
export const OTTO_OC_SANTO_DOMINGO_ARMADA_RETRY_EVENT_ID = eventId(
  'santo-domingo-armada-retry',
);
export const OTTO_OC_CAYENNE_CATALINA_PLEA_EVENT_ID = eventId(
  'cayenne-amazon-catalina-plea',
);
export const OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID = eventId(
  'pub-ezequiel-challenge',
);
export const OTTO_OC_EZEQUIEL_DECLINED_COWARD_EVENT_ID = eventId(
  'ezequiel-declined-coward',
);
export const OTTO_OC_SEVILLE_COMMAND_REENTRY_EVENT_ID = eventId(
  'seville-command-room-reentry',
);
export const OTTO_OC_BORDEAUX_FINAL_EVENT_ID = eventId(
  'bordeaux-ezequiel-showdown',
);
export const OTTO_OC_BORDEAUX_APPOINTMENT_MISSED_EVENT_ID = eventId(
  'bordeaux-appointment-missed',
);
export const OTTO_OC_BORDEAUX_FINAL_RETRY_EVENT_ID = eventId(
  'bordeaux-ezequiel-showdown-retry',
);
export const OTTO_OC_ENDING_EVENT_ID = eventId('london-palace-triumph');

const completed = (id: StoryEventId): StoryCondition => ({
  type: 'eventCompleted',
  eventId: id,
});

const notCompleted = (id: StoryEventId): StoryCondition => ({
  type: 'not',
  condition: completed(id),
});

const exactScene = (
  portId: string,
  buildingId: string | null,
  ...conditions: StoryCondition[]
): StoryCondition => ({
  type: 'all',
  conditions: [
    { type: 'scenarioEdition', edition: 'original-core-v1' },
    { type: 'stage', stage: 'building' },
    { type: 'atPort', portId },
    ...(buildingId === null
      ? []
      : [{ type: 'atBuilding' as const, buildingId }]),
    ...conditions,
  ],
});

const londonPalaceCommission: StoryEvent = {
  id: OTTO_OC_PALACE_COMMISSION_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.721,
  trigger: exactScene('30', '6'),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.londonPalaceCommission.kingSummons,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.londonPalaceCommission.kingSecretOrder,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.londonPalaceCommission.ottoPledge,
      position: 2,
      speaker: characterId('otto'),
    },
    {
      type: 'dialogue',
      body: dialogue.londonPalaceCommission.gilbertAdvice,
      position: 0,
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveGold', amount: 300 },
        { type: 'receiveItem', itemId: '33' },
        { type: 'promoteRoyalRank', rank: 1 },
        {
          type: 'completeEvent',
          eventId: OTTO_OC_PALACE_COMMISSION_EVENT_ID,
        },
      ],
    },
  ],
};

const londonShipyardFlagship: StoryEvent = {
  id: OTTO_OC_SHIPYARD_FLAGSHIP_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.722,
  trigger: exactScene('30', '3', completed(OTTO_OC_PALACE_COMMISSION_EVENT_ID)),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.londonShipyardFlagship.shipwrightHandover,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.londonShipyardFlagship.ottoDecision,
      position: 2,
      speaker: characterId('otto'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveShip', shipId: '3', name: 'Eagle' },
        {
          type: 'completeEvent',
          eventId: OTTO_OC_SHIPYARD_FLAGSHIP_EVENT_ID,
        },
      ],
    },
  ],
};

const londonPubBrawl: StoryEvent = {
  id: OTTO_OC_PUB_BRAWL_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.723,
  trigger: exactScene('30', '2', completed(OTTO_OC_SHIPYARD_FLAGSHIP_EVENT_ID)),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.londonPubBrawl.matthewTaunt,
      position: 1,
      speaker: characterId('matthew'),
    },
    {
      type: 'dialogue',
      body: dialogue.londonPubBrawl.ottoChallenge,
      position: 2,
      speaker: characterId('otto'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'completeEvent', eventId: OTTO_OC_PUB_BRAWL_EVENT_ID },
        { type: 'startCombat', encounterId: 'otto.matthew-duel' },
      ],
    },
  ],
};

const londonPubBrawlRetry: StoryEvent = {
  id: OTTO_OC_PUB_BRAWL_RETRY_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.724,
  trigger: exactScene(
    '30',
    '2',
    completed(OTTO_OC_PUB_BRAWL_EVENT_ID),
    notCompleted(OTTO_OC_MATTHEW_RECRUITED_EVENT_ID),
    {
      type: 'combatResolved',
      encounterId: 'otto.matthew-duel',
      outcomes: ['defeat', 'draw'],
    },
  ),
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.londonPubBrawlRetry.recovery,
      position: 1,
      speaker: characterId('matthew'),
    },
    {
      type: 'choice',
      prompt: dialogue.londonPubBrawlRetry.prompt,
      position: 1,
      speaker: characterId('matthew'),
      options: [
        {
          id: 'yes',
          label: 'Yes',
          steps: [
            {
              type: 'dialogue',
              body: dialogue.londonPubBrawlRetry.accept,
              position: 2,
              speaker: characterId('otto'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'startCombat', encounterId: 'otto.matthew-duel' },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: 'No',
          steps: [
            {
              type: 'dialogue',
              body: dialogue.londonPubBrawlRetry.defer,
              position: 1,
              speaker: characterId('matthew'),
            },
          ],
        },
      ],
    },
  ],
};

const londonHarborMatthewJoins: StoryEvent = {
  id: OTTO_OC_MATTHEW_RECRUITED_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.725,
  trigger: exactScene('30', '4', completed(OTTO_OC_PUB_BRAWL_EVENT_ID), {
    type: 'combatResolved',
    encounterId: 'otto.matthew-duel',
    outcomes: ['victory', 'defeat', 'draw'],
  }),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.londonHarborMatthewJoins.ottoCatch,
      position: 2,
      speaker: characterId('otto'),
    },
    {
      type: 'dialogue',
      body: dialogue.londonHarborMatthewJoins.matthewConfess,
      position: 1,
      speaker: characterId('matthew'),
    },
    {
      type: 'dialogue',
      body: dialogue.londonHarborMatthewJoins.ottoRecruit,
      position: 2,
      speaker: characterId('otto'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'addCompanion', characterId: characterId('matthew') },
        { type: 'assignMate', characterId: characterId('otto'), role: 0 },
        {
          type: 'assignMate',
          characterId: characterId('matthew'),
          role: 'firstMate',
        },
        { type: 'receiveGold', amount: 2000 },
        {
          type: 'completeEvent',
          eventId: OTTO_OC_MATTHEW_RECRUITED_EVENT_ID,
        },
      ],
    },
  ],
};

const sevillePubIntel: StoryEvent = {
  id: OTTO_OC_SEVILLE_INTEL_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.726,
  trigger: exactScene('2', '2', completed(OTTO_OC_MATTHEW_RECRUITED_EVENT_ID)),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.sevillePubIntel.matthewReport,
      position: 1,
      speaker: characterId('matthew'),
    },
    {
      type: 'dialogue',
      body: dialogue.sevillePubIntel.ottoPlan,
      position: 2,
      speaker: characterId('otto'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'completeEvent', eventId: OTTO_OC_SEVILLE_INTEL_EVENT_ID },
      ],
    },
  ],
};

const sevilleHarborHeist: StoryEvent = {
  id: OTTO_OC_SEVILLE_HEIST_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.727,
  trigger: exactScene('2', '4', completed(OTTO_OC_SEVILLE_INTEL_EVENT_ID), {
    type: 'timeWindow',
    min: 1080,
    max: 360,
  }),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.sevilleHarborHeist.matthewSignal,
      position: 1,
      speaker: characterId('matthew'),
    },
    {
      type: 'dialogue',
      body: dialogue.sevilleHarborHeist.ottoOrder,
      position: 2,
      speaker: characterId('otto'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveShip', shipId: '11', name: 'Real' },
        { type: 'receiveGold', amount: 3000 },
        { type: 'receiveFame', fame: 'pirate', amount: 200 },
        { type: 'completeEvent', eventId: OTTO_OC_SEVILLE_HEIST_EVENT_ID },
        { type: 'startCombat', encounterId: 'otto.seville-pursuit' },
      ],
    },
  ],
};

const sevilleHarborHeistRetry: StoryEvent = {
  id: OTTO_OC_SEVILLE_HEIST_RETRY_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.728,
  trigger: exactScene(
    '2',
    '4',
    completed(OTTO_OC_SEVILLE_HEIST_EVENT_ID),
    notCompleted(OTTO_OC_NANTES_ARMADA_EVENT_ID),
    {
      type: 'combatResolved',
      encounterId: 'otto.seville-pursuit',
      outcomes: ['defeat', 'retreat', 'draw'],
    },
  ),
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.sevilleHarborHeistRetry.recovery,
      position: 1,
      speaker: characterId('matthew'),
    },
    {
      type: 'choice',
      prompt: dialogue.sevilleHarborHeistRetry.prompt,
      position: 1,
      speaker: characterId('matthew'),
      options: [
        {
          id: 'yes',
          label: 'Yes',
          steps: [
            {
              type: 'dialogue',
              body: dialogue.sevilleHarborHeistRetry.accept,
              position: 2,
              speaker: characterId('otto'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'startCombat', encounterId: 'otto.seville-pursuit' },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: 'No',
          steps: [
            {
              type: 'dialogue',
              body: dialogue.sevilleHarborHeistRetry.defer,
              position: 1,
              speaker: characterId('matthew'),
            },
          ],
        },
      ],
    },
  ],
};

const catalinaMarketRescue: StoryEvent = {
  id: OTTO_OC_CATALINA_MARKET_RESCUE_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.7282,
  trigger: exactScene(
    '2',
    '1',
    completed(OTTO_OC_SEVILLE_HEIST_EVENT_ID),
    {
      type: 'combatResolved',
      encounterId: 'otto.seville-pursuit',
      outcomes: ['victory'],
    },
    { type: 'fameAtLeast', fame: 'pirate', value: 5000 },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.catalinaMarketRescue.matthewSpot,
      position: 1,
      speaker: characterId('matthew'),
    },
    {
      type: 'dialogue',
      body: dialogue.catalinaMarketRescue.emilioGasp,
      position: 1,
      speaker: characterId('emilio'),
    },
    {
      type: 'dialogue',
      body: dialogue.catalinaMarketRescue.katarinaArrival,
      position: 1,
      speaker: characterId('katarina'),
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: OTTO_OC_CATALINA_MARKET_RESCUE_EVENT_ID,
        },
      ],
    },
  ],
};

const catalinaPubEarly: StoryEvent = {
  id: OTTO_OC_CATALINA_PUB_EARLY_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.7283,
  trigger: exactScene(
    '2',
    '2',
    completed(OTTO_OC_CATALINA_MARKET_RESCUE_EVENT_ID),
    notCompleted(OTTO_OC_CATALINA_PUB_ALLIANCE_EVENT_ID),
    {
      type: 'minutesAfterEvent',
      eventId: OTTO_OC_CATALINA_MARKET_RESCUE_EVENT_ID,
      minMinutes: 0,
      maxMinutes: 119,
    },
  ),
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.catalinaPubEarly.ottoWait,
      position: 2,
      speaker: characterId('otto'),
    },
  ],
};

const catalinaPubAlliance: StoryEvent = {
  id: OTTO_OC_CATALINA_PUB_ALLIANCE_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.7285,
  trigger: exactScene(
    '2',
    '2',
    completed(OTTO_OC_CATALINA_MARKET_RESCUE_EVENT_ID),
    {
      type: 'minutesAfterEvent',
      eventId: OTTO_OC_CATALINA_MARKET_RESCUE_EVENT_ID,
      minMinutes: 120,
      maxMinutes: 220,
    },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.catalinaPubAlliance.katarinaToast,
      position: 1,
      speaker: characterId('katarina'),
    },
    {
      type: 'dialogue',
      body: dialogue.catalinaPubAlliance.ottoToast,
      position: 2,
      speaker: characterId('otto'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveGold', amount: 1500 },
        { type: 'receiveFame', fame: 'pirate', amount: 500 },
        {
          type: 'completeEvent',
          eventId: OTTO_OC_CATALINA_PUB_ALLIANCE_EVENT_ID,
        },
      ],
    },
  ],
};

const catalinaPubLate: StoryEvent = {
  id: OTTO_OC_CATALINA_PUB_LATE_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.7286,
  trigger: exactScene(
    '2',
    '2',
    completed(OTTO_OC_CATALINA_MARKET_RESCUE_EVENT_ID),
    notCompleted(OTTO_OC_CATALINA_PUB_ALLIANCE_EVENT_ID),
    {
      type: 'minutesAfterEvent',
      eventId: OTTO_OC_CATALINA_MARKET_RESCUE_EVENT_ID,
      minMinutes: 221,
    },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.catalinaPubLate.barkeepNote,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.catalinaPubLate.ottoRegret,
      position: 2,
      speaker: characterId('otto'),
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: OTTO_OC_CATALINA_PUB_LATE_EVENT_ID,
        },
        {
          type: 'completeEvent',
          eventId: OTTO_OC_CATALINA_PUB_ALLIANCE_EVENT_ID,
        },
      ],
    },
  ],
};

const londonPubGoldShipIntel: StoryEvent = {
  id: OTTO_OC_LONDON_GOLD_SHIP_INTEL_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.7288,
  trigger: exactScene(
    '30',
    '2',
    completed(OTTO_OC_CATALINA_PUB_ALLIANCE_EVENT_ID),
    notCompleted(OTTO_OC_LONDON_GOLD_SHIP_INTEL_EVENT_ID),
    notCompleted(OTTO_OC_PALACE_ARMADA_ORDER_EVENT_ID),
    notCompleted(OTTO_OC_NANTES_ARMADA_EVENT_ID),
    { type: 'fameAtLeast', fame: 'pirate', value: 15000 },
    {
      type: 'not',
      condition: { type: 'fameAtLeast', fame: 'pirate', value: 20000 },
    },
    { type: 'goldAtLeast', value: 1000 },
  ),
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.londonPubGoldShipIntel.pietroOffer,
      position: 1,
      speaker: characterId('pietro'),
    },
    {
      type: 'choice',
      prompt: dialogue.londonPubGoldShipIntel.prompt,
      position: 1,
      speaker: characterId('pietro'),
      options: [
        {
          id: 'yes',
          label: dialogue.londonPubGoldShipIntel.payLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.londonPubGoldShipIntel.payReply,
              position: 2,
              speaker: characterId('otto'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'spendGold', amount: 1000 },
                { type: 'receiveFame', fame: 'pirate', amount: 200 },
                {
                  type: 'completeEvent',
                  eventId: OTTO_OC_LONDON_GOLD_SHIP_INTEL_EVENT_ID,
                },
              ],
            },
          ],
        },
        {
          id: 'bargain_500',
          label: dialogue.londonPubGoldShipIntel.bargainLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.londonPubGoldShipIntel.bargainReply,
              position: 2,
              speaker: characterId('otto'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'spendGold', amount: 500 },
                { type: 'receiveFame', fame: 'pirate', amount: 100 },
                {
                  type: 'completeEvent',
                  eventId: OTTO_OC_LONDON_GOLD_SHIP_INTEL_EVENT_ID,
                },
              ],
            },
          ],
        },
        {
          id: 'dont_pay',
          label: dialogue.londonPubGoldShipIntel.dontPayLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.londonPubGoldShipIntel.dontPayReply,
              position: 1,
              speaker: characterId('pietro'),
            },
            {
              type: 'effect',
              effects: [
                {
                  type: 'completeEvent',
                  eventId: OTTO_OC_LONDON_GOLD_SHIP_INTEL_EVENT_ID,
                },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.londonPubGoldShipIntel.refuseLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.londonPubGoldShipIntel.refuseReply,
              position: 1,
              speaker: characterId('pietro'),
            },
          ],
        },
      ],
    },
  ],
};

const veracruzOrtegaGoldShip: StoryEvent = {
  id: OTTO_OC_VERACRUZ_GOLD_SHIP_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.7289,
  trigger: {
    type: 'all',
    conditions: [
      { type: 'scenarioEdition', edition: 'original-core-v1' },
      { type: 'stage', stage: 'building' },
      {
        type: 'any',
        conditions: [
          { type: 'atPort', portId: '50' },
          { type: 'atPort', portId: '2' },
        ],
      },
      { type: 'atBuilding', buildingId: '4' },
      completed(OTTO_OC_LONDON_GOLD_SHIP_INTEL_EVENT_ID),
      notCompleted(OTTO_OC_BORDEAUX_FINAL_EVENT_ID),
    ],
  },
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.veracruzOrtegaGoldShip.matthewSpot,
      position: 1,
      speaker: characterId('matthew'),
    },
    {
      type: 'dialogue',
      body: dialogue.veracruzOrtegaGoldShip.ottoIntercept,
      position: 2,
      speaker: characterId('otto'),
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: OTTO_OC_VERACRUZ_GOLD_SHIP_EVENT_ID,
        },
        { type: 'startCombat', encounterId: 'otto.ortega-gold-ship' },
      ],
    },
  ],
};

const veracruzOrtegaGoldShipRetry: StoryEvent = {
  id: OTTO_OC_VERACRUZ_GOLD_SHIP_RETRY_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.72895,
  trigger: {
    type: 'all',
    conditions: [
      { type: 'scenarioEdition', edition: 'original-core-v1' },
      { type: 'stage', stage: 'building' },
      {
        type: 'any',
        conditions: [
          { type: 'atPort', portId: '50' },
          { type: 'atPort', portId: '2' },
        ],
      },
      { type: 'atBuilding', buildingId: '4' },
      completed(OTTO_OC_VERACRUZ_GOLD_SHIP_EVENT_ID),
      notCompleted(OTTO_OC_BORDEAUX_FINAL_EVENT_ID),
      {
        type: 'combatResolved',
        encounterId: 'otto.ortega-gold-ship',
        outcomes: ['defeat', 'retreat', 'draw'],
      },
    ],
  },
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.veracruzOrtegaGoldShipRetry.recovery,
      position: 1,
      speaker: characterId('matthew'),
    },
    {
      type: 'choice',
      prompt: dialogue.veracruzOrtegaGoldShipRetry.prompt,
      position: 1,
      speaker: characterId('matthew'),
      options: [
        {
          id: 'yes',
          label: 'Yes',
          steps: [
            {
              type: 'dialogue',
              body: dialogue.veracruzOrtegaGoldShipRetry.accept,
              position: 2,
              speaker: characterId('otto'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'startCombat', encounterId: 'otto.ortega-gold-ship' },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: 'No',
          steps: [
            {
              type: 'dialogue',
              body: dialogue.veracruzOrtegaGoldShipRetry.defer,
              position: 1,
              speaker: characterId('matthew'),
            },
          ],
        },
      ],
    },
  ],
};

const londonPalaceArmadaOrder: StoryEvent = {
  id: OTTO_OC_PALACE_ARMADA_ORDER_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.72897,
  trigger: exactScene(
    '30',
    '6',
    completed(OTTO_OC_CATALINA_PUB_ALLIANCE_EVENT_ID),
    { type: 'fameAtLeast', fame: 'pirate', value: 30000 },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.londonPalaceArmadaOrder.kingOrder,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.londonPalaceArmadaOrder.ottoVow,
      position: 2,
      speaker: characterId('otto'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'promoteRoyalRank', rank: 3 },
        {
          type: 'completeEvent',
          eventId: OTTO_OC_PALACE_ARMADA_ORDER_EVENT_ID,
        },
      ],
    },
  ],
};

const londonGuildArmadaBriefing: StoryEvent = {
  id: OTTO_OC_GUILD_ARMADA_BRIEFING_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.72898,
  trigger: exactScene(
    '30',
    '7',
    completed(OTTO_OC_PALACE_ARMADA_ORDER_EVENT_ID),
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.londonGuildArmadaBriefing.guildIntel,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.londonGuildArmadaBriefing.matthewReady,
      position: 1,
      speaker: characterId('matthew'),
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: OTTO_OC_GUILD_ARMADA_BRIEFING_EVENT_ID,
        },
      ],
    },
  ],
};

const nantesArmadaClash: StoryEvent = {
  id: OTTO_OC_NANTES_ARMADA_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.729,
  trigger: exactScene(
    '29',
    '4',
    completed(OTTO_OC_GUILD_ARMADA_BRIEFING_EVENT_ID),
    {
      type: 'combatResolved',
      encounterId: 'otto.seville-pursuit',
      outcomes: ['victory'],
    },
    { type: 'fameAtLeast', fame: 'pirate', value: 30000 },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.nantesArmadaClash.matthewScout,
      position: 1,
      speaker: characterId('matthew'),
    },
    {
      type: 'dialogue',
      body: dialogue.nantesArmadaClash.ottoAttack,
      position: 2,
      speaker: characterId('otto'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'completeEvent', eventId: OTTO_OC_NANTES_ARMADA_EVENT_ID },
        { type: 'startCombat', encounterId: 'otto.nantes-armada' },
      ],
    },
  ],
};

const nantesArmadaClashRetry: StoryEvent = {
  id: OTTO_OC_NANTES_ARMADA_RETRY_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.73,
  trigger: exactScene(
    '29',
    '4',
    completed(OTTO_OC_NANTES_ARMADA_EVENT_ID),
    notCompleted(OTTO_OC_SANTO_DOMINGO_ARMADA_EVENT_ID),
    {
      type: 'combatResolved',
      encounterId: 'otto.nantes-armada',
      outcomes: ['defeat', 'retreat', 'draw'],
    },
  ),
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.nantesArmadaClashRetry.recovery,
      position: 1,
      speaker: characterId('matthew'),
    },
    {
      type: 'choice',
      prompt: dialogue.nantesArmadaClashRetry.prompt,
      position: 1,
      speaker: characterId('matthew'),
      options: [
        {
          id: 'yes',
          label: 'Yes',
          steps: [
            {
              type: 'dialogue',
              body: dialogue.nantesArmadaClashRetry.accept,
              position: 2,
              speaker: characterId('otto'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'startCombat', encounterId: 'otto.nantes-armada' },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: 'No',
          steps: [
            {
              type: 'dialogue',
              body: dialogue.nantesArmadaClashRetry.defer,
              position: 1,
              speaker: characterId('matthew'),
            },
          ],
        },
      ],
    },
  ],
};

const santoDomingoArmada: StoryEvent = {
  id: OTTO_OC_SANTO_DOMINGO_ARMADA_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.731,
  trigger: exactScene('49', '4', completed(OTTO_OC_NANTES_ARMADA_EVENT_ID), {
    type: 'combatResolved',
    encounterId: 'otto.nantes-armada',
    outcomes: ['victory'],
  }),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.santoDomingoArmada.matthewDiscovery,
      position: 1,
      speaker: characterId('matthew'),
    },
    {
      type: 'dialogue',
      body: dialogue.santoDomingoArmada.ottoCommand,
      position: 2,
      speaker: characterId('otto'),
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: OTTO_OC_SANTO_DOMINGO_ARMADA_EVENT_ID,
        },
        { type: 'startCombat', encounterId: 'otto.santo-domingo-armada' },
      ],
    },
  ],
};

const santoDomingoArmadaRetry: StoryEvent = {
  id: OTTO_OC_SANTO_DOMINGO_ARMADA_RETRY_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.732,
  trigger: exactScene(
    '49',
    '4',
    completed(OTTO_OC_SANTO_DOMINGO_ARMADA_EVENT_ID),
    notCompleted(OTTO_OC_BORDEAUX_FINAL_EVENT_ID),
    {
      type: 'combatResolved',
      encounterId: 'otto.santo-domingo-armada',
      outcomes: ['defeat', 'retreat', 'draw'],
    },
  ),
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.santoDomingoArmadaRetry.recovery,
      position: 1,
      speaker: characterId('matthew'),
    },
    {
      type: 'choice',
      prompt: dialogue.santoDomingoArmadaRetry.prompt,
      position: 1,
      speaker: characterId('matthew'),
      options: [
        {
          id: 'yes',
          label: 'Yes',
          steps: [
            {
              type: 'dialogue',
              body: dialogue.santoDomingoArmadaRetry.accept,
              position: 2,
              speaker: characterId('otto'),
            },
            {
              type: 'effect',
              effects: [
                {
                  type: 'startCombat',
                  encounterId: 'otto.santo-domingo-armada',
                },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: 'No',
          steps: [
            {
              type: 'dialogue',
              body: dialogue.santoDomingoArmadaRetry.defer,
              position: 1,
              speaker: characterId('matthew'),
            },
          ],
        },
      ],
    },
  ],
};

const cayenneAmazonCatalinaPlea: StoryEvent = {
  id: OTTO_OC_CAYENNE_CATALINA_PLEA_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.7324,
  trigger: exactScene(
    '57',
    '4',
    completed(OTTO_OC_SANTO_DOMINGO_ARMADA_EVENT_ID),
    {
      type: 'combatResolved',
      encounterId: 'otto.santo-domingo-armada',
      outcomes: ['victory'],
    },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.cayenneAmazonCatalinaPlea.katarinaPlea,
      position: 1,
      speaker: characterId('katarina'),
    },
    {
      type: 'choice',
      prompt: dialogue.cayenneAmazonCatalinaPlea.prompt,
      position: 1,
      speaker: characterId('katarina'),
      options: [
        {
          id: 'yes',
          label: dialogue.cayenneAmazonCatalinaPlea.spareLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.cayenneAmazonCatalinaPlea.spareReply,
              position: 2,
              speaker: characterId('otto'),
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.cayenneAmazonCatalinaPlea.pressLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.cayenneAmazonCatalinaPlea.pressReply,
              position: 2,
              speaker: characterId('otto'),
            },
          ],
        },
      ],
    },
    {
      type: 'dialogue',
      body: dialogue.cayenneAmazonCatalinaPlea.ezequielOath,
      position: 1,
      speaker: characterId('ezequiel'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveFame', fame: 'pirate', amount: 150 },
        {
          type: 'completeEvent',
          eventId: OTTO_OC_CAYENNE_CATALINA_PLEA_EVENT_ID,
        },
      ],
    },
  ],
};

const pubEzequielChallenge: StoryEvent = {
  id: OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.7328,
  trigger: {
    type: 'all',
    conditions: [
      { type: 'scenarioEdition', edition: 'original-core-v1' },
      { type: 'stage', stage: 'building' },
      { type: 'portNumberRange', min: 4, max: 41 },
      { type: 'not', condition: { type: 'atPort', portId: '9' } },
      { type: 'not', condition: { type: 'atPort', portId: '30' } },
      { type: 'not', condition: { type: 'atPort', portId: '34' } },
      { type: 'atBuilding', buildingId: '2' },
      completed(OTTO_OC_CAYENNE_CATALINA_PLEA_EVENT_ID),
      notCompleted(OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID),
      notCompleted(OTTO_OC_EZEQUIEL_DECLINED_COWARD_EVENT_ID),
      { type: 'fameAtLeast', fame: 'pirate', value: 30000 },
    ],
  },
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.pubEzequielChallenge.ezequielChallenge,
      position: 1,
      speaker: characterId('ezequiel'),
    },
    {
      type: 'choice',
      prompt: dialogue.pubEzequielChallenge.prompt,
      position: 1,
      speaker: characterId('ezequiel'),
      options: [
        {
          id: 'yes',
          label: dialogue.pubEzequielChallenge.acceptLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.pubEzequielChallenge.acceptReply,
              position: 2,
              speaker: characterId('otto'),
            },
            {
              type: 'effect',
              effects: [
                {
                  type: 'completeEvent',
                  eventId: OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID,
                },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.pubEzequielChallenge.declineLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.pubEzequielChallenge.declineReply,
              position: 1,
              speaker: characterId('ezequiel'),
            },
            {
              type: 'effect',
              effects: [
                {
                  type: 'completeEvent',
                  eventId: OTTO_OC_EZEQUIEL_DECLINED_COWARD_EVENT_ID,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const ezequielDeclinedCoward: StoryEvent = {
  id: OTTO_OC_EZEQUIEL_DECLINED_COWARD_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.73285,
  trigger: exactScene(
    '2',
    '2',
    completed(OTTO_OC_CAYENNE_CATALINA_PLEA_EVENT_ID),
    notCompleted(OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID),
    { type: 'fameAtLeast', fame: 'pirate', value: 30000 },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.pubEzequielChallenge.declineReply,
      position: 1,
      speaker: characterId('ezequiel'),
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: OTTO_OC_EZEQUIEL_DECLINED_COWARD_EVENT_ID,
        },
      ],
    },
  ],
};

const sevilleCommandRoomReentry: StoryEvent = {
  id: OTTO_OC_SEVILLE_COMMAND_REENTRY_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.7329,
  trigger: exactScene(
    '2',
    '8',
    completed(OTTO_OC_EZEQUIEL_DECLINED_COWARD_EVENT_ID),
    notCompleted(OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID),
    { type: 'fameAtLeast', fame: 'pirate', value: 30000 },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.sevilleCommandRoomReentry.ottoDemand,
      position: 2,
      speaker: characterId('otto'),
    },
    {
      type: 'dialogue',
      body: dialogue.sevilleCommandRoomReentry.ezequielGrant,
      position: 1,
      speaker: characterId('ezequiel'),
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: OTTO_OC_SEVILLE_COMMAND_REENTRY_EVENT_ID,
        },
        {
          type: 'completeEvent',
          eventId: OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID,
        },
      ],
    },
  ],
};

const bordeauxEzequielShowdown: StoryEvent = {
  id: OTTO_OC_BORDEAUX_FINAL_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.733,
  trigger: exactScene(
    '28',
    '4',
    completed(OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID),
    notCompleted(OTTO_OC_BORDEAUX_APPOINTMENT_MISSED_EVENT_ID),
    {
      type: 'calendarDaysAfterEvent',
      eventId: OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID,
      minDays: 30,
      maxDays: 59,
    },
    {
      type: 'combatResolved',
      encounterId: 'otto.santo-domingo-armada',
      outcomes: ['victory'],
    },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.bordeauxEzequielShowdown.ezequielGreeting,
      position: 1,
      speaker: characterId('ezequiel'),
    },
    {
      type: 'dialogue',
      body: dialogue.bordeauxEzequielShowdown.ottoSalute,
      position: 2,
      speaker: characterId('otto'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'completeEvent', eventId: OTTO_OC_BORDEAUX_FINAL_EVENT_ID },
        { type: 'startCombat', encounterId: 'otto.bordeaux-ezequiel' },
      ],
    },
  ],
};

const bordeauxAppointmentMissed: StoryEvent = {
  id: OTTO_OC_BORDEAUX_APPOINTMENT_MISSED_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.7335,
  trigger: exactScene(
    '28',
    '4',
    completed(OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID),
    notCompleted(OTTO_OC_BORDEAUX_FINAL_EVENT_ID),
    {
      type: 'calendarDaysAfterEvent',
      eventId: OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID,
      minDays: 60,
    },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.bordeauxAppointmentMissed.matthewReport,
      position: 1,
      speaker: characterId('matthew'),
    },
    {
      type: 'dialogue',
      body: dialogue.bordeauxAppointmentMissed.ottoLament,
      position: 2,
      speaker: characterId('otto'),
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: OTTO_OC_BORDEAUX_APPOINTMENT_MISSED_EVENT_ID,
        },
      ],
    },
  ],
};

const bordeauxEzequielShowdownRetry: StoryEvent = {
  id: OTTO_OC_BORDEAUX_FINAL_RETRY_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.734,
  trigger: exactScene(
    '28',
    '4',
    completed(OTTO_OC_BORDEAUX_FINAL_EVENT_ID),
    notCompleted(OTTO_OC_ENDING_EVENT_ID),
    {
      type: 'combatResolved',
      encounterId: 'otto.bordeaux-ezequiel',
      outcomes: ['defeat', 'retreat', 'draw'],
    },
  ),
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.bordeauxEzequielShowdownRetry.recovery,
      position: 1,
      speaker: characterId('matthew'),
    },
    {
      type: 'choice',
      prompt: dialogue.bordeauxEzequielShowdownRetry.prompt,
      position: 1,
      speaker: characterId('matthew'),
      options: [
        {
          id: 'yes',
          label: 'Yes',
          steps: [
            {
              type: 'dialogue',
              body: dialogue.bordeauxEzequielShowdownRetry.accept,
              position: 2,
              speaker: characterId('otto'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'startCombat', encounterId: 'otto.bordeaux-ezequiel' },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: 'No',
          steps: [
            {
              type: 'dialogue',
              body: dialogue.bordeauxEzequielShowdownRetry.defer,
              position: 1,
              speaker: characterId('matthew'),
            },
          ],
        },
      ],
    },
  ],
};

const londonPalaceTriumph: StoryEvent = {
  id: OTTO_OC_ENDING_EVENT_ID,
  arcId: OTTO_ORIGINAL_CORE_ARC_ID,
  priority: 0.735,
  trigger: exactScene('30', '6', completed(OTTO_OC_BORDEAUX_FINAL_EVENT_ID), {
    type: 'combatResolved',
    encounterId: 'otto.bordeaux-ezequiel',
    outcomes: ['victory'],
  }),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.londonPalaceTriumph.kingPraise,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.londonPalaceTriumph.ezequielHonor,
      position: 1,
      speaker: characterId('ezequiel'),
    },
    {
      type: 'choice',
      prompt: dialogue.londonPalaceTriumph.prompt,
      position: 0,
      options: [
        {
          id: 'yes',
          label: dialogue.londonPalaceTriumph.peaceLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.londonPalaceTriumph.ottoPlea,
              position: 2,
              speaker: characterId('otto'),
            },
            {
              type: 'dialogue',
              body: dialogue.londonPalaceTriumph.kingDecree,
              position: 0,
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.londonPalaceTriumph.dominionLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.londonPalaceTriumph.dominionReply,
              position: 2,
              speaker: characterId('otto'),
            },
            {
              type: 'dialogue',
              body: dialogue.londonPalaceTriumph.kingDominionDecree,
              position: 0,
            },
          ],
        },
      ],
    },
    {
      type: 'effect',
      effects: [
        { type: 'promoteRoyalRank', rank: 5 },
        { type: 'receiveGold', amount: 15000 },
        { type: 'receiveFame', fame: 'pirate', amount: 800 },
        { type: 'completeEvent', eventId: OTTO_OC_ENDING_EVENT_ID },
      ],
    },
  ],
};

export const ottoOriginalCoreEvents: StoryEvent[] = [
  londonPalaceCommission,
  londonShipyardFlagship,
  londonPubBrawl,
  londonPubBrawlRetry,
  londonHarborMatthewJoins,
  sevillePubIntel,
  sevilleHarborHeist,
  sevilleHarborHeistRetry,
  catalinaMarketRescue,
  catalinaPubEarly,
  catalinaPubAlliance,
  catalinaPubLate,
  londonPubGoldShipIntel,
  veracruzOrtegaGoldShip,
  veracruzOrtegaGoldShipRetry,
  londonPalaceArmadaOrder,
  londonGuildArmadaBriefing,
  nantesArmadaClash,
  nantesArmadaClashRetry,
  santoDomingoArmada,
  santoDomingoArmadaRetry,
  cayenneAmazonCatalinaPlea,
  pubEzequielChallenge,
  ezequielDeclinedCoward,
  sevilleCommandRoomReentry,
  bordeauxEzequielShowdown,
  bordeauxAppointmentMissed,
  bordeauxEzequielShowdownRetry,
  londonPalaceTriumph,
];

export default ottoOriginalCoreEvents;
