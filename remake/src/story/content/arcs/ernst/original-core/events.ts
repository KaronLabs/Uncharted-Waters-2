import {
  characterId,
  storyArcId,
  storyEventId,
  type StoryCondition,
  type StoryEvent,
  type StoryEventId,
} from '../../../../core/types';
import { ernstOriginalCoreDialogue as dialogue } from './dialogue';

export const ERNST_ORIGINAL_CORE_ARC_ID = storyArcId('ernst.original-core');

const eventId = (suffix: string) =>
  storyEventId(`ernst.original-core.${suffix}`);

export const ERNST_OC_HARBOR_DEPARTURE_EVENT_ID = eventId(
  'amsterdam-harbor-departure',
);
export const ERNST_OC_MERCATOR_CONTRACT_EVENT_ID = eventId(
  'amsterdam-mercator-contract',
);
export const ERNST_OC_LAURA_JOINS_EVENT_ID = eventId(
  'amsterdam-harbor-laura-joins',
);
export const ERNST_OC_MERCATOR_BETRAYAL_EVENT_ID = eventId(
  'mercator-betrayal-reconcile',
);
export const ERNST_OC_ZEITON_UNLOCK_EVENT_ID = eventId(
  'zeiton-changan-route-unlock',
);
export const ERNST_OC_CHANGAN_SEARCH_EVENT_ID = eventId(
  'changan-homeland-search',
);
export const ERNST_OC_NAGASAKI_REUNION_EVENT_ID = eventId(
  'nagasaki-parents-reunion',
);
export const ERNST_OC_ENDING_EVENT_ID = eventId(
  'amsterdam-world-atlas-completion',
);

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

const amsterdamHarborDeparture: StoryEvent = {
  id: ERNST_OC_HARBOR_DEPARTURE_EVENT_ID,
  arcId: ERNST_ORIGINAL_CORE_ARC_ID,
  priority: 0.821,
  trigger: exactScene('34', '4'),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.amsterdamHarborDeparture.hansGreeting,
      position: 1,
      speaker: characterId('hans'),
    },
    {
      type: 'dialogue',
      body: dialogue.amsterdamHarborDeparture.ernstReply,
      position: 2,
      speaker: characterId('ernst'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveShip', shipId: '13', name: 'Sleipnir' },
        { type: 'addCompanion', characterId: characterId('hans') },
        { type: 'assignMate', characterId: characterId('ernst'), role: 0 },
        {
          type: 'assignMate',
          characterId: characterId('hans'),
          role: 'chiefNavigator',
        },
        { type: 'receiveGold', amount: 2500 },
        { type: 'receiveItem', itemId: '21' },
        { type: 'lockPorts', portIds: ['98', '99', '100'] },
        {
          type: 'completeEvent',
          eventId: ERNST_OC_HARBOR_DEPARTURE_EVENT_ID,
        },
      ],
    },
  ],
};

const amsterdamMercatorContract: StoryEvent = {
  id: ERNST_OC_MERCATOR_CONTRACT_EVENT_ID,
  arcId: ERNST_ORIGINAL_CORE_ARC_ID,
  priority: 0.822,
  trigger: exactScene('34', '8', completed(ERNST_OC_HARBOR_DEPARTURE_EVENT_ID)),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.amsterdamMercatorContract.mercatorRequest,
      position: 1,
      speaker: characterId('mercator'),
    },
    {
      type: 'dialogue',
      body: dialogue.amsterdamMercatorContract.ernstPromise,
      position: 2,
      speaker: characterId('ernst'),
    },
    {
      type: 'dialogue',
      body: dialogue.amsterdamMercatorContract.mercatorBlessing,
      position: 1,
      speaker: characterId('mercator'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'setCartographerContract', cartographer: 'mercator' },
        {
          type: 'completeEvent',
          eventId: ERNST_OC_MERCATOR_CONTRACT_EVENT_ID,
        },
      ],
    },
  ],
};

const amsterdamHarborLauraJoins: StoryEvent = {
  id: ERNST_OC_LAURA_JOINS_EVENT_ID,
  arcId: ERNST_ORIGINAL_CORE_ARC_ID,
  priority: 0.823,
  trigger: exactScene(
    '34',
    '4',
    completed(ERNST_OC_MERCATOR_CONTRACT_EVENT_ID),
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.amsterdamHarborLauraJoins.lauraPlea,
      position: 1,
      speaker: characterId('laura'),
    },
    {
      type: 'dialogue',
      body: dialogue.amsterdamHarborLauraJoins.hansSupport,
      position: 1,
      speaker: characterId('hans'),
    },
    {
      type: 'dialogue',
      body: dialogue.amsterdamHarborLauraJoins.ernstWelcome,
      position: 2,
      speaker: characterId('ernst'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'addCompanion', characterId: characterId('laura') },
        {
          type: 'assignMate',
          characterId: characterId('laura'),
          role: 'bookKeeper',
        },
        { type: 'receiveFame', fame: 'adventure', amount: 100 },
        {
          type: 'completeEvent',
          eventId: ERNST_OC_LAURA_JOINS_EVENT_ID,
        },
      ],
    },
  ],
};

const mercatorBetrayalReconcile: StoryEvent = {
  id: ERNST_OC_MERCATOR_BETRAYAL_EVENT_ID,
  arcId: ERNST_ORIGINAL_CORE_ARC_ID,
  priority: 0.824,
  trigger: exactScene(
    '34',
    '8',
    completed(ERNST_OC_MERCATOR_CONTRACT_EVENT_ID),
    notCompleted(ERNST_OC_ENDING_EVENT_ID),
    { type: 'cartographerContractIs', cartographer: 'other' },
  ),
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.mercatorBetrayalReconcile.mercatorReprimand,
      position: 1,
      speaker: characterId('mercator'),
    },
    {
      type: 'dialogue',
      body: dialogue.mercatorBetrayalReconcile.ernstApology,
      position: 2,
      speaker: characterId('ernst'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'halveAllFame' },
        { type: 'setCartographerContract', cartographer: 'mercator' },
      ],
    },
  ],
};

const zeitonChanganRouteUnlock: StoryEvent = {
  id: ERNST_OC_ZEITON_UNLOCK_EVENT_ID,
  arcId: ERNST_ORIGINAL_CORE_ARC_ID,
  priority: 0.825,
  trigger: exactScene('95', '4', completed(ERNST_OC_LAURA_JOINS_EVENT_ID), {
    type: 'fameAtLeast',
    fame: 'adventure',
    value: 200,
  }),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.zeitonChanganRouteUnlock.lauraMemory,
      position: 1,
      speaker: characterId('laura'),
    },
    {
      type: 'dialogue',
      body: dialogue.zeitonChanganRouteUnlock.ernstCourse,
      position: 2,
      speaker: characterId('ernst'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'unlockPorts', portIds: ['98'] },
        { type: 'receiveFame', fame: 'adventure', amount: 150 },
        {
          type: 'completeEvent',
          eventId: ERNST_OC_ZEITON_UNLOCK_EVENT_ID,
        },
      ],
    },
  ],
};

const changanHomelandSearch: StoryEvent = {
  id: ERNST_OC_CHANGAN_SEARCH_EVENT_ID,
  arcId: ERNST_ORIGINAL_CORE_ARC_ID,
  priority: 0.826,
  trigger: exactScene('98', '4', completed(ERNST_OC_ZEITON_UNLOCK_EVENT_ID), {
    type: 'portUnlocked',
    portId: '98',
  }),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.changanHomelandSearch.lauraQuestion,
      position: 1,
      speaker: characterId('laura'),
    },
    {
      type: 'dialogue',
      body: dialogue.changanHomelandSearch.elderAnswer,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.changanHomelandSearch.ernstEncouragement,
      position: 2,
      speaker: characterId('ernst'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'unlockPorts', portIds: ['99', '100'] },
        { type: 'receiveGold', amount: 3000 },
        { type: 'receiveFame', fame: 'adventure', amount: 250 },
        {
          type: 'completeEvent',
          eventId: ERNST_OC_CHANGAN_SEARCH_EVENT_ID,
        },
      ],
    },
  ],
};

const nagasakiParentsReunion: StoryEvent = {
  id: ERNST_OC_NAGASAKI_REUNION_EVENT_ID,
  arcId: ERNST_ORIGINAL_CORE_ARC_ID,
  priority: 0.827,
  trigger: exactScene('100', '4', completed(ERNST_OC_CHANGAN_SEARCH_EVENT_ID), {
    type: 'portUnlocked',
    portId: '100',
  }),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.nagasakiParentsReunion.parentsCry,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.nagasakiParentsReunion.lauraTears,
      position: 1,
      speaker: characterId('laura'),
    },
    {
      type: 'dialogue',
      body: dialogue.nagasakiParentsReunion.ernstVow,
      position: 2,
      speaker: characterId('ernst'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveGold', amount: 5000 },
        { type: 'receiveFame', fame: 'adventure', amount: 400 },
        {
          type: 'completeEvent',
          eventId: ERNST_OC_NAGASAKI_REUNION_EVENT_ID,
        },
      ],
    },
  ],
};

const amsterdamWorldAtlasCompletion: StoryEvent = {
  id: ERNST_OC_ENDING_EVENT_ID,
  arcId: ERNST_ORIGINAL_CORE_ARC_ID,
  priority: 0.828,
  trigger: exactScene(
    '34',
    '8',
    completed(ERNST_OC_NAGASAKI_REUNION_EVENT_ID),
    { type: 'cartographerContractIs', cartographer: 'mercator' },
    { type: 'fameAtLeast', fame: 'adventure', value: 800 },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.amsterdamWorldAtlasCompletion.mercatorTriumph,
      position: 1,
      speaker: characterId('mercator'),
    },
    {
      type: 'dialogue',
      body: dialogue.amsterdamWorldAtlasCompletion.lauraJoy,
      position: 1,
      speaker: characterId('laura'),
    },
    {
      type: 'dialogue',
      body: dialogue.amsterdamWorldAtlasCompletion.ernstFinale,
      position: 2,
      speaker: characterId('ernst'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveGold', amount: 15000 },
        { type: 'receiveFame', fame: 'adventure', amount: 800 },
        { type: 'completeEvent', eventId: ERNST_OC_ENDING_EVENT_ID },
      ],
    },
  ],
};

export const ernstOriginalCoreEvents: StoryEvent[] = [
  amsterdamHarborDeparture,
  amsterdamMercatorContract,
  amsterdamHarborLauraJoins,
  mercatorBetrayalReconcile,
  zeitonChanganRouteUnlock,
  changanHomelandSearch,
  nagasakiParentsReunion,
  amsterdamWorldAtlasCompletion,
];

export default ernstOriginalCoreEvents;
