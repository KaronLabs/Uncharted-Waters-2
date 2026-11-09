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
export const ERNST_OC_PAULA_MAP_FAME_EVENT_ID = eventId(
  'harbor-paula-map-fame',
);
export const ERNST_OC_PAULA_ATLAS_RUMORS_EVENT_ID = eventId(
  'harbor-paula-atlas-rumors',
);
export const ERNST_OC_ROYAL_ACADEMY_FINALE_EVENT_ID = eventId(
  'harbor-paula-royal-academy',
);
export const ERNST_OC_HANS_ZIPANGU_DREAM_EVENT_ID =
  eventId('hans-zipangu-dream');
export const ERNST_OC_MERCATOR_BETRAYAL_EVENT_ID = eventId(
  'mercator-betrayal-reconcile',
);
export const ERNST_OC_ZEITON_UNLOCK_EVENT_ID = eventId(
  'zeiton-changan-route-unlock',
);
export const ERNST_OC_CHANGAN_SEARCH_EVENT_ID = eventId(
  'changan-homeland-search',
);
export const ERNST_OC_CHANGAN_HOME_REUNION_EVENT_ID = eventId(
  'changan-home-reunion',
);
export const ERNST_OC_NAGASAKI_REUNION_EVENT_ID = eventId(
  'nagasaki-parents-reunion',
);
export const ERNST_OC_ENDING_EVENT_ID = ERNST_OC_CHANGAN_HOME_REUNION_EVENT_ID;

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

const portRangeScene = (
  minPort: number,
  maxPort: number,
  buildingId: string | null,
  ...conditions: StoryCondition[]
): StoryCondition => ({
  type: 'all',
  conditions: [
    { type: 'scenarioEdition', edition: 'original-core-v1' },
    { type: 'stage', stage: 'building' },
    { type: 'portNumberRange', min: minPort, max: maxPort },
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
    notCompleted(ERNST_OC_LAURA_JOINS_EVENT_ID),
    { type: 'fameAtLeast', fame: 'adventure', value: 20 },
  ),
  repeat: 'repeatable',
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
      type: 'choice',
      prompt: dialogue.amsterdamHarborLauraJoins.prompt,
      position: 1,
      speaker: characterId('laura'),
      options: [
        {
          id: 'yes',
          label: dialogue.amsterdamHarborLauraJoins.acceptLabel,
          steps: [
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
                {
                  type: 'completeEvent',
                  eventId: ERNST_OC_LAURA_JOINS_EVENT_ID,
                },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.amsterdamHarborLauraJoins.deferLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.amsterdamHarborLauraJoins.ernstDefer,
              position: 2,
              speaker: characterId('ernst'),
            },
          ],
        },
      ],
    },
  ],
};

const harborPaulaMapFame: StoryEvent = {
  id: ERNST_OC_PAULA_MAP_FAME_EVENT_ID,
  arcId: ERNST_ORIGINAL_CORE_ARC_ID,
  priority: 0.8232,
  trigger: portRangeScene(
    44,
    100,
    '4',
    completed(ERNST_OC_LAURA_JOINS_EVENT_ID),
    {
      type: 'fameAtLeast',
      fame: 'adventure',
      value: 100,
    },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.harborPaulaMapFame.lauraPraise,
      position: 1,
      speaker: characterId('laura'),
    },
    {
      type: 'dialogue',
      body: dialogue.harborPaulaMapFame.ernstReassurance,
      position: 2,
      speaker: characterId('ernst'),
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: ERNST_OC_PAULA_MAP_FAME_EVENT_ID,
        },
      ],
    },
  ],
};

const harborPaulaAtlasRumors: StoryEvent = {
  id: ERNST_OC_PAULA_ATLAS_RUMORS_EVENT_ID,
  arcId: ERNST_ORIGINAL_CORE_ARC_ID,
  priority: 0.8234,
  trigger: portRangeScene(
    44,
    100,
    '4',
    completed(ERNST_OC_PAULA_MAP_FAME_EVENT_ID),
    {
      type: 'fameAtLeast',
      fame: 'adventure',
      value: 400,
    },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.harborPaulaAtlasRumors.lauraAtlasNews,
      position: 1,
      speaker: characterId('laura'),
    },
    {
      type: 'dialogue',
      body: dialogue.harborPaulaAtlasRumors.hansTease,
      position: 1,
      speaker: characterId('hans'),
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: ERNST_OC_PAULA_ATLAS_RUMORS_EVENT_ID,
        },
      ],
    },
  ],
};

const harborPaulaRoyalAcademy: StoryEvent = {
  id: ERNST_OC_ROYAL_ACADEMY_FINALE_EVENT_ID,
  arcId: ERNST_ORIGINAL_CORE_ARC_ID,
  priority: 0.82345,
  trigger: portRangeScene(
    44,
    100,
    '4',
    completed(ERNST_OC_PAULA_ATLAS_RUMORS_EVENT_ID),
    {
      type: 'fameAtLeast',
      fame: 'adventure',
      value: 800,
    },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.harborPaulaRoyalAcademy.lauraAcademyNews,
      position: 1,
      speaker: characterId('laura'),
    },
    {
      type: 'dialogue',
      body: dialogue.harborPaulaRoyalAcademy.hansOathTease,
      position: 1,
      speaker: characterId('hans'),
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: ERNST_OC_ROYAL_ACADEMY_FINALE_EVENT_ID,
        },
      ],
    },
  ],
};

const hansZipanguDream: StoryEvent = {
  id: ERNST_OC_HANS_ZIPANGU_DREAM_EVENT_ID,
  arcId: ERNST_ORIGINAL_CORE_ARC_ID,
  priority: 0.8235,
  trigger: portRangeScene(
    1,
    94,
    '4',
    completed(ERNST_OC_ROYAL_ACADEMY_FINALE_EVENT_ID),
    notCompleted(ERNST_OC_HANS_ZIPANGU_DREAM_EVENT_ID),
    { type: 'fameAtLeast', fame: 'adventure', value: 800 },
  ),
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.hansZipanguDream.hansDream,
      position: 1,
      speaker: characterId('hans'),
    },
    {
      type: 'choice',
      prompt: dialogue.hansZipanguDream.prompt,
      position: 1,
      speaker: characterId('hans'),
      options: [
        {
          id: 'yes',
          label: dialogue.hansZipanguDream.eastLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.hansZipanguDream.ernstEast,
              position: 2,
              speaker: characterId('ernst'),
            },
            {
              type: 'effect',
              effects: [
                {
                  type: 'completeEvent',
                  eventId: ERNST_OC_HANS_ZIPANGU_DREAM_EVENT_ID,
                },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.hansZipanguDream.prepareLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.hansZipanguDream.ernstPrepare,
              position: 2,
              speaker: characterId('ernst'),
            },
          ],
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
  trigger: exactScene(
    '95',
    '4',
    completed(ERNST_OC_HANS_ZIPANGU_DREAM_EVENT_ID),
    {
      type: 'fameAtLeast',
      fame: 'adventure',
      value: 800,
    },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.zeitonChanganRouteUnlock.lauraMemory,
      position: 1,
      speaker: characterId('hans'),
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
        { type: 'unlockPorts', portIds: ['99', '100'] },
        { type: 'receiveFame', fame: 'adventure', amount: 150 },
        {
          type: 'completeEvent',
          eventId: ERNST_OC_ZEITON_UNLOCK_EVENT_ID,
        },
      ],
    },
  ],
};

const nagasakiParentsReunion: StoryEvent = {
  id: ERNST_OC_NAGASAKI_REUNION_EVENT_ID,
  arcId: ERNST_ORIGINAL_CORE_ARC_ID,
  priority: 0.826,
  trigger: exactScene('100', '4', completed(ERNST_OC_ZEITON_UNLOCK_EVENT_ID), {
    type: 'portUnlocked',
    portId: '100',
  }),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.nagasakiParentsReunion.parentsCry,
      position: 1,
      speaker: characterId('hans'),
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
        { type: 'unlockPorts', portIds: ['98'] },
        { type: 'receiveFame', fame: 'adventure', amount: 250 },
        {
          type: 'completeEvent',
          eventId: ERNST_OC_NAGASAKI_REUNION_EVENT_ID,
        },
      ],
    },
  ],
};

const changanHomelandSearch: StoryEvent = {
  id: ERNST_OC_CHANGAN_SEARCH_EVENT_ID,
  arcId: ERNST_ORIGINAL_CORE_ARC_ID,
  priority: 0.8265,
  trigger: exactScene(
    '98',
    '4',
    completed(ERNST_OC_NAGASAKI_REUNION_EVENT_ID),
    {
      type: 'portUnlocked',
      portId: '98',
    },
  ),
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

const changanHomeReunion: StoryEvent = {
  id: ERNST_OC_CHANGAN_HOME_REUNION_EVENT_ID,
  arcId: ERNST_ORIGINAL_CORE_ARC_ID,
  priority: 0.827,
  trigger: exactScene('98', '8', completed(ERNST_OC_CHANGAN_SEARCH_EVENT_ID), {
    type: 'portUnlocked',
    portId: '98',
  }),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.changanHomeReunion.lauraRecord,
      position: 1,
      speaker: characterId('laura'),
    },
    {
      type: 'choice',
      prompt: dialogue.changanHomeReunion.prompt,
      position: 1,
      speaker: characterId('laura'),
      options: [
        {
          id: 'yes',
          label: dialogue.changanHomeReunion.vowLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.changanHomeReunion.ernstVowReply,
              position: 2,
              speaker: characterId('ernst'),
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.changanHomeReunion.comfortLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.changanHomeReunion.ernstComfortReply,
              position: 2,
              speaker: characterId('ernst'),
            },
          ],
        },
      ],
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveGold', amount: 5000 },
        { type: 'receiveFame', fame: 'adventure', amount: 400 },
        {
          type: 'completeEvent',
          eventId: ERNST_OC_CHANGAN_HOME_REUNION_EVENT_ID,
        },
      ],
    },
  ],
};

export const ernstOriginalCoreEvents: StoryEvent[] = [
  amsterdamHarborDeparture,
  amsterdamMercatorContract,
  amsterdamHarborLauraJoins,
  harborPaulaMapFame,
  harborPaulaAtlasRumors,
  harborPaulaRoyalAcademy,
  hansZipanguDream,
  mercatorBetrayalReconcile,
  zeitonChanganRouteUnlock,
  nagasakiParentsReunion,
  changanHomelandSearch,
  changanHomeReunion,
];

export default ernstOriginalCoreEvents;
