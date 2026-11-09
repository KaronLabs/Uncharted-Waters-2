import {
  characterId,
  storyArcId,
  storyEventId,
  type StoryCondition,
  type StoryEvent,
  type StoryEventId,
} from '../../../../core/types';
import { pietroOriginalCoreDialogue as dialogue } from './dialogue';

export const PIETRO_ORIGINAL_CORE_ARC_ID = storyArcId('pietro.original-core');

const eventId = (suffix: string) =>
  storyEventId(`pietro.original-core.${suffix}`);

export const PIETRO_OC_GENOA_DEPARTURE_EVENT_ID = eventId(
  'genoa-harbor-departure',
);
export const PIETRO_OC_LISBON_PATRONAGE_EVENT_ID = eventId(
  'lisbon-franco-patronage',
);
export const PIETRO_OC_FRANCO_BETRAYAL_EVENT_ID = eventId(
  'franco-betrayal-reconcile',
);
export const PIETRO_OC_FABRIS_DEBT_EVENT_ID = eventId(
  'genoa-fabris-debt-settlement',
);
export const PIETRO_OC_ALEXANDRIA_MAP_EVENT_ID = eventId(
  'alexandria-gold-medallion-map',
);
export const PIETRO_OC_GOLD_MEDALLION_EXCAVATION_EVENT_ID = eventId(
  'santo-domingo-gold-medallion-excavation',
);
export const PIETRO_OC_GOLD_MEDALLION_REPORT_EVENT_ID = eventId(
  'lisbon-gold-medallion-report',
);
export const PIETRO_OC_VENICE_STAFF_MAP_EVENT_ID = eventId('venice-staff-map');
export const PIETRO_OC_BASRA_STAFF_EVENT_ID = eventId('basra-staff-excavation');
export const PIETRO_OC_MASSAWA_JOAO_EVENT_ID = eventId('massawa-joao-handoff');
export const PIETRO_OC_ALI_ZIPANGU_CLUE_EVENT_ID = eventId('ali-zipangu-clue');
export const PIETRO_OC_NAGASAKI_ERNST_EVENT_ID = eventId(
  'nagasaki-ernst-advice',
);
export const PIETRO_OC_EL_DORADO_EVENT_ID = eventId(
  'cayenne-el-dorado-discovery',
);
export const PIETRO_OC_LONDON_HOWELL_EVENT_ID = eventId(
  'london-howell-mansion-test',
);
export const PIETRO_OC_ENDING_EVENT_ID = eventId('lisbon-franco-triumph');

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

const genoaHarborDeparture: StoryEvent = {
  id: PIETRO_OC_GENOA_DEPARTURE_EVENT_ID,
  arcId: PIETRO_ORIGINAL_CORE_ARC_ID,
  priority: 0.621,
  trigger: exactScene('9', '4'),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.genoaHarborDeparture.camilloNews,
      position: 1,
      speaker: characterId('camillo'),
    },
    {
      type: 'dialogue',
      body: dialogue.genoaHarborDeparture.pietroResolve,
      position: 2,
      speaker: characterId('pietro'),
    },
    {
      type: 'dialogue',
      body: dialogue.genoaHarborDeparture.camilloPledge,
      position: 1,
      speaker: characterId('camillo'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveShip', shipId: '6', name: 'Sanuto' },
        { type: 'addCompanion', characterId: characterId('camillo') },
        { type: 'assignMate', characterId: characterId('pietro'), role: 0 },
        {
          type: 'assignMate',
          characterId: characterId('camillo'),
          role: 'bookKeeper',
        },
        { type: 'receiveGold', amount: 1500 },
        {
          type: 'completeEvent',
          eventId: PIETRO_OC_GENOA_DEPARTURE_EVENT_ID,
        },
      ],
    },
  ],
};

const lisbonFrancoPatronage: StoryEvent = {
  id: PIETRO_OC_LISBON_PATRONAGE_EVENT_ID,
  arcId: PIETRO_ORIGINAL_CORE_ARC_ID,
  priority: 0.622,
  trigger: exactScene('1', '8', completed(PIETRO_OC_GENOA_DEPARTURE_EVENT_ID)),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.lisbonFrancoPatronage.christianaOffer,
      position: 1,
      speaker: characterId('duchess-christiana'),
    },
    {
      type: 'dialogue',
      body: dialogue.lisbonFrancoPatronage.marcoInstruction,
      position: 1,
      speaker: characterId('butler-marco'),
    },
    {
      type: 'dialogue',
      body: dialogue.lisbonFrancoPatronage.pietroAccept,
      position: 2,
      speaker: characterId('pietro'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'setCollectorContract', collector: 'duchess_franco' },
        { type: 'receiveGold', amount: 3000 },
        { type: 'receiveFame', fame: 'adventure', amount: 100 },
        {
          type: 'completeEvent',
          eventId: PIETRO_OC_LISBON_PATRONAGE_EVENT_ID,
        },
      ],
    },
  ],
};

const francoBetrayalReconcile: StoryEvent = {
  id: PIETRO_OC_FRANCO_BETRAYAL_EVENT_ID,
  arcId: PIETRO_ORIGINAL_CORE_ARC_ID,
  priority: 0.623,
  trigger: exactScene(
    '1',
    '8',
    completed(PIETRO_OC_LISBON_PATRONAGE_EVENT_ID),
    notCompleted(PIETRO_OC_ENDING_EVENT_ID),
    { type: 'collectorContractIs', collector: 'other' },
  ),
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.francoBetrayalReconcile.marcoReprimand,
      position: 1,
      speaker: characterId('butler-marco'),
    },
    {
      type: 'dialogue',
      body: dialogue.francoBetrayalReconcile.pietroApology,
      position: 2,
      speaker: characterId('pietro'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'halveAllFame' },
        { type: 'setCollectorContract', collector: 'duchess_franco' },
      ],
    },
  ],
};

const genoaFabrisDebtSettlement: StoryEvent = {
  id: PIETRO_OC_FABRIS_DEBT_EVENT_ID,
  arcId: PIETRO_ORIGINAL_CORE_ARC_ID,
  priority: 0.624,
  trigger: exactScene('9', '9', completed(PIETRO_OC_LISBON_PATRONAGE_EVENT_ID)),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.genoaFabrisDebtSettlement.fabrisProposal,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.genoaFabrisDebtSettlement.pietroReply,
      position: 2,
      speaker: characterId('pietro'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveGold', amount: 5000 },
        { type: 'setPietroLoan', state: 'lent' },
        { type: 'completeEvent', eventId: PIETRO_OC_FABRIS_DEBT_EVENT_ID },
      ],
    },
  ],
};

const alexandriaGoldMedallionMap: StoryEvent = {
  id: PIETRO_OC_ALEXANDRIA_MAP_EVENT_ID,
  arcId: PIETRO_ORIGINAL_CORE_ARC_ID,
  priority: 0.625,
  trigger: exactScene(
    '19',
    '2',
    completed(PIETRO_OC_FABRIS_DEBT_EVENT_ID),
    notCompleted(PIETRO_OC_ALEXANDRIA_MAP_EVENT_ID),
    {
      type: 'fameAtLeast',
      fame: 'adventure',
      value: 100,
    },
    {
      type: 'goldAtLeast',
      value: 1000,
    },
  ),
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.alexandriaGoldMedallionMap.travelerOffer,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.alexandriaGoldMedallionMap.camilloInspect,
      position: 1,
      speaker: characterId('camillo'),
    },
    {
      type: 'choice',
      prompt: dialogue.alexandriaGoldMedallionMap.prompt,
      position: 0,
      options: [
        {
          id: 'yes',
          label: dialogue.alexandriaGoldMedallionMap.buyLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.alexandriaGoldMedallionMap.pietroDecision,
              position: 2,
              speaker: characterId('pietro'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'spendGold', amount: 2000 },
                { type: 'receiveItem', itemId: '87' },
                {
                  type: 'completeEvent',
                  eventId: PIETRO_OC_ALEXANDRIA_MAP_EVENT_ID,
                },
              ],
            },
          ],
        },
        {
          id: 'bargain_1000',
          label: dialogue.alexandriaGoldMedallionMap.bargainLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.alexandriaGoldMedallionMap.pietroBargain,
              position: 2,
              speaker: characterId('pietro'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'spendGold', amount: 1000 },
                { type: 'receiveItem', itemId: '87' },
                {
                  type: 'completeEvent',
                  eventId: PIETRO_OC_ALEXANDRIA_MAP_EVENT_ID,
                },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.alexandriaGoldMedallionMap.declineLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.alexandriaGoldMedallionMap.pietroDecline,
              position: 2,
              speaker: characterId('pietro'),
            },
          ],
        },
      ],
    },
  ],
};

const santoDomingoGoldMedallionExcavation: StoryEvent = {
  id: PIETRO_OC_GOLD_MEDALLION_EXCAVATION_EVENT_ID,
  arcId: PIETRO_ORIGINAL_CORE_ARC_ID,
  priority: 0.626,
  trigger: exactScene('49', '4', completed(PIETRO_OC_ALEXANDRIA_MAP_EVENT_ID), {
    type: 'hasDiscovery',
    discoveryId: 'p1-gold-medallion',
  }),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.santoDomingoGoldMedallionExcavation.camilloSpot,
      position: 1,
      speaker: characterId('camillo'),
    },
    {
      type: 'dialogue',
      body: dialogue.santoDomingoGoldMedallionExcavation.pietroUnearth,
      position: 2,
      speaker: characterId('pietro'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveFame', fame: 'adventure', amount: 250 },
        {
          type: 'completeEvent',
          eventId: PIETRO_OC_GOLD_MEDALLION_EXCAVATION_EVENT_ID,
        },
      ],
    },
  ],
};

const lisbonGoldMedallionReport: StoryEvent = {
  id: PIETRO_OC_GOLD_MEDALLION_REPORT_EVENT_ID,
  arcId: PIETRO_ORIGINAL_CORE_ARC_ID,
  priority: 0.627,
  trigger: exactScene(
    '1',
    '8',
    completed(PIETRO_OC_GOLD_MEDALLION_EXCAVATION_EVENT_ID),
    { type: 'hasDiscovery', discoveryId: 'p1-gold-medallion' },
    { type: 'collectorContractIs', collector: 'duchess_franco' },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.lisbonGoldMedallionReport.christianaDelight,
      position: 1,
      speaker: characterId('duchess-christiana'),
    },
    {
      type: 'dialogue',
      body: dialogue.lisbonGoldMedallionReport.dukeFrancoClue,
      position: 1,
      speaker: characterId('duke-franco'),
    },
    {
      type: 'dialogue',
      body: dialogue.lisbonGoldMedallionReport.pietroPromise,
      position: 2,
      speaker: characterId('pietro'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveGold', amount: 5000 },
        { type: 'receiveFame', fame: 'adventure', amount: 250 },
        { type: 'setPietroLoan', state: 'repaid' },
        {
          type: 'completeEvent',
          eventId: PIETRO_OC_GOLD_MEDALLION_REPORT_EVENT_ID,
        },
      ],
    },
  ],
};

const veniceStaffMap: StoryEvent = {
  id: PIETRO_OC_VENICE_STAFF_MAP_EVENT_ID,
  arcId: PIETRO_ORIGINAL_CORE_ARC_ID,
  priority: 0.628,
  trigger: exactScene(
    '14',
    '2',
    completed(PIETRO_OC_GOLD_MEDALLION_REPORT_EVENT_ID),
    notCompleted(PIETRO_OC_VENICE_STAFF_MAP_EVENT_ID),
    {
      type: 'goldAtLeast',
      value: 1500,
    },
  ),
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.veniceStaffMap.antiquarianGift,
      position: 0,
    },
    {
      type: 'choice',
      prompt: dialogue.veniceStaffMap.prompt,
      position: 0,
      options: [
        {
          id: 'yes',
          label: dialogue.veniceStaffMap.buyLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.veniceStaffMap.pietroThanks,
              position: 2,
              speaker: characterId('pietro'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'spendGold', amount: 3000 },
                { type: 'receiveItem', itemId: '88' },
                {
                  type: 'completeEvent',
                  eventId: PIETRO_OC_VENICE_STAFF_MAP_EVENT_ID,
                },
              ],
            },
          ],
        },
        {
          id: 'bargain_1500',
          label: dialogue.veniceStaffMap.bargainLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.veniceStaffMap.pietroBargain,
              position: 2,
              speaker: characterId('pietro'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'spendGold', amount: 1500 },
                { type: 'receiveItem', itemId: '88' },
                {
                  type: 'completeEvent',
                  eventId: PIETRO_OC_VENICE_STAFF_MAP_EVENT_ID,
                },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.veniceStaffMap.declineLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.veniceStaffMap.pietroDecline,
              position: 2,
              speaker: characterId('pietro'),
            },
          ],
        },
      ],
    },
  ],
};

const basraStaffExcavation: StoryEvent = {
  id: PIETRO_OC_BASRA_STAFF_EVENT_ID,
  arcId: PIETRO_ORIGINAL_CORE_ARC_ID,
  priority: 0.629,
  trigger: exactScene(
    '77',
    '1',
    completed(PIETRO_OC_VENICE_STAFF_MAP_EVENT_ID),
    { type: 'hasDiscovery', discoveryId: 'p2-poseidons-staff' },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.basraStaffExcavation.camilloWarning,
      position: 1,
      speaker: characterId('camillo'),
    },
    {
      type: 'dialogue',
      body: dialogue.basraStaffExcavation.pietroChallenge,
      position: 2,
      speaker: characterId('pietro'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveItem', itemId: 'm3-staff-of-the-saint' },
        { type: 'receiveFame', fame: 'adventure', amount: 300 },
        { type: 'completeEvent', eventId: PIETRO_OC_BASRA_STAFF_EVENT_ID },
      ],
    },
  ],
};

const massawaJoaoHandoff: StoryEvent = {
  id: PIETRO_OC_MASSAWA_JOAO_EVENT_ID,
  arcId: PIETRO_ORIGINAL_CORE_ARC_ID,
  priority: 0.631,
  trigger: exactScene('75', '4', completed(PIETRO_OC_BASRA_STAFF_EVENT_ID), {
    type: 'hasDiscovery',
    discoveryId: 'p2-poseidons-staff',
  }),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.massawaJoaoHandoff.pietroGreeting,
      position: 2,
      speaker: characterId('pietro'),
    },
    {
      type: 'dialogue',
      body: dialogue.massawaJoaoHandoff.joaoGratitude,
      position: 1,
      speaker: characterId('joao'),
    },
    {
      type: 'dialogue',
      body: dialogue.massawaJoaoHandoff.enricoBlessing,
      position: 1,
      speaker: characterId('enrico'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'consumeItem', itemId: 'm3-staff-of-the-saint' },
        { type: 'receiveGold', amount: 8000 },
        { type: 'receiveFame', fame: 'adventure', amount: 300 },
        { type: 'completeEvent', eventId: PIETRO_OC_MASSAWA_JOAO_EVENT_ID },
      ],
    },
  ],
};

const aliZipanguClue: StoryEvent = {
  id: PIETRO_OC_ALI_ZIPANGU_CLUE_EVENT_ID,
  arcId: PIETRO_ORIGINAL_CORE_ARC_ID,
  priority: 0.6314,
  trigger: exactScene('75', '2', completed(PIETRO_OC_MASSAWA_JOAO_EVENT_ID)),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.aliZipanguClue.aliGreeting,
      position: 1,
      speaker: characterId('ali'),
    },
    {
      type: 'dialogue',
      body: dialogue.aliZipanguClue.pietroCourse,
      position: 2,
      speaker: characterId('pietro'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveFame', fame: 'adventure', amount: 150 },
        {
          type: 'completeEvent',
          eventId: PIETRO_OC_ALI_ZIPANGU_CLUE_EVENT_ID,
        },
      ],
    },
  ],
};

const nagasakiErnstAdvice: StoryEvent = {
  id: PIETRO_OC_NAGASAKI_ERNST_EVENT_ID,
  arcId: PIETRO_ORIGINAL_CORE_ARC_ID,
  priority: 0.6318,
  trigger: exactScene(
    '100',
    '4',
    completed(PIETRO_OC_ALI_ZIPANGU_CLUE_EVENT_ID),
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.nagasakiErnstAdvice.ernstGreeting,
      position: 1,
      speaker: characterId('ernst'),
    },
    {
      type: 'choice',
      prompt: dialogue.nagasakiErnstAdvice.prompt,
      position: 1,
      speaker: characterId('ernst'),
      options: [
        {
          id: 'yes',
          label: dialogue.nagasakiErnstAdvice.westLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.nagasakiErnstAdvice.pietroWest,
              position: 2,
              speaker: characterId('pietro'),
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.nagasakiErnstAdvice.chartLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.nagasakiErnstAdvice.pietroChart,
              position: 2,
              speaker: characterId('pietro'),
            },
          ],
        },
      ],
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveFame', fame: 'adventure', amount: 200 },
        {
          type: 'completeEvent',
          eventId: PIETRO_OC_NAGASAKI_ERNST_EVENT_ID,
        },
      ],
    },
  ],
};

const cayenneElDoradoDiscovery: StoryEvent = {
  id: PIETRO_OC_EL_DORADO_EVENT_ID,
  arcId: PIETRO_ORIGINAL_CORE_ARC_ID,
  priority: 0.632,
  trigger: exactScene('57', '4', completed(PIETRO_OC_NAGASAKI_ERNST_EVENT_ID), {
    type: 'hasDiscovery',
    discoveryId: 'mouth-of-the-amazon',
  }),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.cayenneElDoradoDiscovery.camilloAwe,
      position: 1,
      speaker: characterId('camillo'),
    },
    {
      type: 'dialogue',
      body: dialogue.cayenneElDoradoDiscovery.pietroOrder,
      position: 2,
      speaker: characterId('pietro'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'setHowellHousePrice', priceIngots: 110 },
        { type: 'receiveFame', fame: 'adventure', amount: 500 },
        { type: 'completeEvent', eventId: PIETRO_OC_EL_DORADO_EVENT_ID },
      ],
    },
  ],
};

const londonHowellMansionTest: StoryEvent = {
  id: PIETRO_OC_LONDON_HOWELL_EVENT_ID,
  arcId: PIETRO_ORIGINAL_CORE_ARC_ID,
  priority: 0.634,
  trigger: exactScene('30', '9', completed(PIETRO_OC_EL_DORADO_EVENT_ID)),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.londonHowellMansionTest.howellGreeting,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.londonHowellMansionTest.howellGift,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.londonHowellMansionTest.pietroGratitude,
      position: 2,
      speaker: characterId('pietro'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'grantHowellHouseFree' },
        { type: 'receiveFame', fame: 'adventure', amount: 400 },
        { type: 'completeEvent', eventId: PIETRO_OC_LONDON_HOWELL_EVENT_ID },
      ],
    },
  ],
};

const lisbonFrancoTriumph: StoryEvent = {
  id: PIETRO_OC_ENDING_EVENT_ID,
  arcId: PIETRO_ORIGINAL_CORE_ARC_ID,
  priority: 0.635,
  trigger: exactScene('1', '8', completed(PIETRO_OC_LONDON_HOWELL_EVENT_ID), {
    type: 'collectorContractIs',
    collector: 'duchess_franco',
  }),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.lisbonFrancoTriumph.christianaPraise,
      position: 1,
      speaker: characterId('duchess-christiana'),
    },
    {
      type: 'dialogue',
      body: dialogue.lisbonFrancoTriumph.dukeFrancoCommendation,
      position: 1,
      speaker: characterId('duke-franco'),
    },
    {
      type: 'dialogue',
      body: dialogue.lisbonFrancoTriumph.camilloToast,
      position: 1,
      speaker: characterId('camillo'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveGold', amount: 20000 },
        { type: 'receiveFame', fame: 'adventure', amount: 800 },
        { type: 'completeEvent', eventId: PIETRO_OC_ENDING_EVENT_ID },
      ],
    },
  ],
};

export const pietroOriginalCoreEvents: StoryEvent[] = [
  genoaHarborDeparture,
  lisbonFrancoPatronage,
  francoBetrayalReconcile,
  genoaFabrisDebtSettlement,
  alexandriaGoldMedallionMap,
  santoDomingoGoldMedallionExcavation,
  lisbonGoldMedallionReport,
  veniceStaffMap,
  basraStaffExcavation,
  massawaJoaoHandoff,
  aliZipanguClue,
  nagasakiErnstAdvice,
  cayenneElDoradoDiscovery,
  londonHowellMansionTest,
  lisbonFrancoTriumph,
];

export default pietroOriginalCoreEvents;
