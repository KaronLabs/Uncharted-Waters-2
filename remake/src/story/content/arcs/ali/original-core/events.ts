import {
  characterId,
  storyArcId,
  storyEventId,
  type StoryCondition,
  type StoryEvent,
  type StoryEventId,
} from '../../../../core/types';
import { aliOriginalCoreDialogue as dialogue } from './dialogue';

export const ALI_ORIGINAL_CORE_ARC_ID = storyArcId('ali.original-core');

const eventId = (suffix: string) => storyEventId(`ali.original-core.${suffix}`);

export const ALI_OC_SHIPYARD_LOAN_EVENT_ID = eventId('istanbul-shipyard-loan');
export const ALI_OC_GUILD_LOAN_EVENT_ID = eventId('istanbul-guild-loan');
export const ALI_OC_PUB_LOAN_EVENT_ID = eventId('istanbul-pub-loan');
export const ALI_OC_HARBOR_DEPARTURE_EVENT_ID = eventId(
  'istanbul-harbor-departure',
);
export const ALI_OC_LODGE_GIFT_EVENT_ID = eventId('istanbul-lodge-gift');
export const ALI_OC_SHIPYARD_REPAY_EVENT_ID = eventId(
  'istanbul-shipyard-repay',
);
export const ALI_OC_GUILD_REPAY_EVENT_ID = eventId('istanbul-guild-repay');
export const ALI_OC_PUB_REPAY_EVENT_ID = eventId('istanbul-pub-repay');
export const ALI_OC_HARBOR_REPAY_EVENT_ID = eventId('istanbul-harbor-repay');
export const ALI_OC_PALACE_FIRST_AUDIENCE_EVENT_ID = eventId(
  'istanbul-palace-first-audience',
);
export const ALI_OC_ALEXANDRIA_PIETRO_EVENT_ID = eventId(
  'alexandria-pietro-clue',
);
export const ALI_OC_LISBON_JOAO_EVENT_ID = eventId('lisbon-joao-lucia-clue');
export const ALI_OC_CATALINA_AMBUSH_EVENT_ID = eventId(
  'massawa-catalina-ambush',
);
export const ALI_OC_CATALINA_AMBUSH_RETRY_EVENT_ID = eventId(
  'massawa-catalina-ambush-retry',
);
export const ALI_OC_BASRA_SASHA_REUNION_EVENT_ID = eventId(
  'basra-sasha-reunion',
);
export const ALI_OC_FORTUNE_ORACLE_EVENT_ID = eventId(
  'istanbul-fortune-teller-oracle',
);
export const ALI_OC_VENICE_HOWELL_EVENT_ID = eventId(
  'venice-howell-pietro-debt',
);
export const ALI_OC_ENDING_EVENT_ID = eventId('istanbul-sultan-coronation');

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

const istanbulShipyardLoan: StoryEvent = {
  id: ALI_OC_SHIPYARD_LOAN_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.921,
  trigger: exactScene('3', '3'),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulShipyardLoan.shipwrightLoan,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulShipyardLoan.aliThanks,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'collectAliInvestor', investor: 'shipyard', amount: 200 },
        { type: 'completeEvent', eventId: ALI_OC_SHIPYARD_LOAN_EVENT_ID },
      ],
    },
  ],
};

const istanbulGuildLoan: StoryEvent = {
  id: ALI_OC_GUILD_LOAN_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.922,
  trigger: exactScene('3', '7', completed(ALI_OC_SHIPYARD_LOAN_EVENT_ID)),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulGuildLoan.saphaLoan,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulGuildLoan.aliPromise,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'collectAliInvestor', investor: 'guild', amount: 300 },
        { type: 'completeEvent', eventId: ALI_OC_GUILD_LOAN_EVENT_ID },
      ],
    },
  ],
};

const istanbulPubLoan: StoryEvent = {
  id: ALI_OC_PUB_LOAN_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.923,
  trigger: exactScene('3', '2', completed(ALI_OC_GUILD_LOAN_EVENT_ID)),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulPubLoan.ladiaLoan,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulPubLoan.aliGratitude,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'collectAliInvestor', investor: 'pub', amount: 300 },
        { type: 'completeEvent', eventId: ALI_OC_PUB_LOAN_EVENT_ID },
      ],
    },
  ],
};

const istanbulHarborDeparture: StoryEvent = {
  id: ALI_OC_HARBOR_DEPARTURE_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.924,
  trigger: exactScene('3', '4', completed(ALI_OC_PUB_LOAN_EVENT_ID)),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulHarborDeparture.harborMasterLoan,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulHarborDeparture.salimGreeting,
      position: 1,
      speaker: characterId('salim'),
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulHarborDeparture.aliVow,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'collectAliInvestor', investor: 'harbor', amount: 200 },
        { type: 'receiveShip', shipId: '2', name: 'Hugli' },
        { type: 'addCompanion', characterId: characterId('salim') },
        { type: 'assignMate', characterId: characterId('ali'), role: 0 },
        {
          type: 'assignMate',
          characterId: characterId('salim'),
          role: 'bookKeeper',
        },
        {
          type: 'completeEvent',
          eventId: ALI_OC_HARBOR_DEPARTURE_EVENT_ID,
        },
      ],
    },
  ],
};

const istanbulLodgeGift: StoryEvent = {
  id: ALI_OC_LODGE_GIFT_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.9245,
  trigger: exactScene(
    '3',
    '5',
    completed(ALI_OC_SHIPYARD_LOAN_EVENT_ID),
    notCompleted(ALI_OC_SHIPYARD_REPAY_EVENT_ID),
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulLodgeGift.innkeeperOffer,
      position: 0,
    },
    {
      type: 'choice',
      prompt: dialogue.istanbulLodgeGift.prompt,
      position: 0,
      options: [
        {
          id: 'yes',
          label: dialogue.istanbulLodgeGift.acceptGoldLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.istanbulLodgeGift.acceptGoldReply,
              position: 2,
              speaker: characterId('ali'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'receiveGold', amount: 500 },
                { type: 'completeEvent', eventId: ALI_OC_LODGE_GIFT_EVENT_ID },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.istanbulLodgeGift.refuseCatLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.istanbulLodgeGift.refuseCatReply,
              position: 2,
              speaker: characterId('ali'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'receiveItem', itemId: '25' },
                { type: 'completeEvent', eventId: ALI_OC_LODGE_GIFT_EVENT_ID },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const istanbulShipyardRepay: StoryEvent = {
  id: ALI_OC_SHIPYARD_REPAY_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.925,
  trigger: exactScene(
    '3',
    '3',
    completed(ALI_OC_HARBOR_DEPARTURE_EVENT_ID),
    notCompleted(ALI_OC_SHIPYARD_REPAY_EVENT_ID),
    { type: 'allAliInvestorsCollected' },
    { type: 'goldAtLeast', value: 2000 },
  ),
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulShipyardRepay.shipwrightAmazed,
      position: 0,
    },
    {
      type: 'choice',
      prompt: dialogue.istanbulShipyardRepay.prompt,
      position: 0,
      options: [
        {
          id: 'yes',
          label: dialogue.istanbulShipyardRepay.repayLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.istanbulShipyardRepay.aliReply,
              position: 2,
              speaker: characterId('ali'),
            },
            {
              type: 'effect',
              effects: [
                {
                  type: 'repayAliInvestor',
                  investor: 'shipyard',
                  amount: 2000,
                },
                { type: 'receiveFame', fame: 'trade', amount: 100 },
                {
                  type: 'completeEvent',
                  eventId: ALI_OC_SHIPYARD_REPAY_EVENT_ID,
                },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.istanbulShipyardRepay.deferLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.istanbulShipyardRepay.deferReply,
              position: 2,
              speaker: characterId('ali'),
            },
          ],
        },
      ],
    },
  ],
};

const istanbulGuildRepay: StoryEvent = {
  id: ALI_OC_GUILD_REPAY_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.926,
  trigger: exactScene(
    '3',
    '7',
    completed(ALI_OC_SHIPYARD_REPAY_EVENT_ID),
    notCompleted(ALI_OC_GUILD_REPAY_EVENT_ID),
    {
      type: 'goldAtLeast',
      value: 2000,
    },
  ),
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulGuildRepay.saphaPraise,
      position: 0,
    },
    {
      type: 'choice',
      prompt: dialogue.istanbulGuildRepay.prompt,
      position: 0,
      options: [
        {
          id: 'yes',
          label: dialogue.istanbulGuildRepay.repayLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.istanbulGuildRepay.aliReply,
              position: 2,
              speaker: characterId('ali'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'repayAliInvestor', investor: 'guild', amount: 2000 },
                { type: 'receiveFame', fame: 'trade', amount: 100 },
                {
                  type: 'completeEvent',
                  eventId: ALI_OC_GUILD_REPAY_EVENT_ID,
                },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.istanbulGuildRepay.deferLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.istanbulGuildRepay.deferReply,
              position: 2,
              speaker: characterId('ali'),
            },
          ],
        },
      ],
    },
  ],
};

const istanbulPubRepay: StoryEvent = {
  id: ALI_OC_PUB_REPAY_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.927,
  trigger: exactScene(
    '3',
    '2',
    completed(ALI_OC_GUILD_REPAY_EVENT_ID),
    notCompleted(ALI_OC_PUB_REPAY_EVENT_ID),
    {
      type: 'goldAtLeast',
      value: 2000,
    },
  ),
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulPubRepay.ladiaJoy,
      position: 0,
    },
    {
      type: 'choice',
      prompt: dialogue.istanbulPubRepay.prompt,
      position: 0,
      options: [
        {
          id: 'yes',
          label: dialogue.istanbulPubRepay.repayLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.istanbulPubRepay.aliReply,
              position: 2,
              speaker: characterId('ali'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'repayAliInvestor', investor: 'pub', amount: 2000 },
                { type: 'receiveFame', fame: 'trade', amount: 100 },
                { type: 'completeEvent', eventId: ALI_OC_PUB_REPAY_EVENT_ID },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.istanbulPubRepay.deferLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.istanbulPubRepay.deferReply,
              position: 2,
              speaker: characterId('ali'),
            },
          ],
        },
      ],
    },
  ],
};

const istanbulHarborRepay: StoryEvent = {
  id: ALI_OC_HARBOR_REPAY_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.928,
  trigger: exactScene(
    '3',
    '4',
    completed(ALI_OC_PUB_REPAY_EVENT_ID),
    notCompleted(ALI_OC_HARBOR_REPAY_EVENT_ID),
    {
      type: 'goldAtLeast',
      value: 2000,
    },
  ),
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulHarborRepay.harborMasterCheer,
      position: 0,
    },
    {
      type: 'choice',
      prompt: dialogue.istanbulHarborRepay.prompt,
      position: 0,
      options: [
        {
          id: 'yes',
          label: dialogue.istanbulHarborRepay.repayLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.istanbulHarborRepay.salimReport,
              position: 1,
              speaker: characterId('salim'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'repayAliInvestor', investor: 'harbor', amount: 2000 },
                { type: 'receiveFame', fame: 'trade', amount: 200 },
                {
                  type: 'completeEvent',
                  eventId: ALI_OC_HARBOR_REPAY_EVENT_ID,
                },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.istanbulHarborRepay.deferLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.istanbulHarborRepay.deferReply,
              position: 2,
              speaker: characterId('ali'),
            },
          ],
        },
      ],
    },
  ],
};

const istanbulPalaceFirstAudience: StoryEvent = {
  id: ALI_OC_PALACE_FIRST_AUDIENCE_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.9285,
  trigger: exactScene(
    '3',
    '6',
    completed(ALI_OC_HARBOR_REPAY_EVENT_ID),
    notCompleted(ALI_OC_BASRA_SASHA_REUNION_EVENT_ID),
    { type: 'allAliInvestorsRepaid' },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulPalaceFirstAudience.sultanWelcome,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulPalaceFirstAudience.aliBow,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'promoteRoyalRank', rank: 2 },
        { type: 'receiveGold', amount: 3000 },
        { type: 'receiveItem', itemId: '30' },
        { type: 'receiveFame', fame: 'trade', amount: 150 },
        {
          type: 'completeEvent',
          eventId: ALI_OC_PALACE_FIRST_AUDIENCE_EVENT_ID,
        },
      ],
    },
  ],
};

const alexandriaPietroClue: StoryEvent = {
  id: ALI_OC_ALEXANDRIA_PIETRO_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.929,
  trigger: exactScene(
    '19',
    '2',
    completed(ALI_OC_HARBOR_REPAY_EVENT_ID),
    { type: 'allAliInvestorsRepaid' },
    { type: 'goldAtLeast', value: 5000 },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.alexandriaPietroClue.pietroClue,
      position: 1,
      speaker: characterId('pietro'),
    },
    {
      type: 'choice',
      prompt: dialogue.alexandriaPietroClue.prompt,
      position: 1,
      speaker: characterId('pietro'),
      options: [
        {
          id: 'yes',
          label: dialogue.alexandriaPietroClue.lendLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.alexandriaPietroClue.aliCourse,
              position: 2,
              speaker: characterId('ali'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'spendGold', amount: 5000 },
                { type: 'receiveFame', fame: 'trade', amount: 100 },
                { type: 'setPietroLoan', state: 'lent' },
                {
                  type: 'completeEvent',
                  eventId: ALI_OC_ALEXANDRIA_PIETRO_EVENT_ID,
                },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.alexandriaPietroClue.refuseLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.alexandriaPietroClue.refuseReply,
              position: 2,
              speaker: characterId('ali'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'setPietroLoan', state: 'refused' },
                {
                  type: 'completeEvent',
                  eventId: ALI_OC_ALEXANDRIA_PIETRO_EVENT_ID,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const lisbonJoaoLuciaClue: StoryEvent = {
  id: ALI_OC_LISBON_JOAO_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.93,
  trigger: exactScene('1', '2', completed(ALI_OC_ALEXANDRIA_PIETRO_EVENT_ID)),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.lisbonJoaoLuciaClue.luciaMemory,
      position: 1,
      speaker: characterId('lucia'),
    },
    {
      type: 'dialogue',
      body: dialogue.lisbonJoaoLuciaClue.joaoAdvice,
      position: 1,
      speaker: characterId('joao'),
    },
    {
      type: 'dialogue',
      body: dialogue.lisbonJoaoLuciaClue.aliResolve,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveFame', fame: 'trade', amount: 150 },
        { type: 'completeEvent', eventId: ALI_OC_LISBON_JOAO_EVENT_ID },
      ],
    },
  ],
};

const massawaCatalinaAmbush: StoryEvent = {
  id: ALI_OC_CATALINA_AMBUSH_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.931,
  trigger: exactScene('75', '4', completed(ALI_OC_LISBON_JOAO_EVENT_ID)),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.massawaCatalinaAmbush.katarinaChallenge,
      position: 1,
      speaker: characterId('katarina'),
    },
    {
      type: 'dialogue',
      body: dialogue.massawaCatalinaAmbush.aliDefiance,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'completeEvent', eventId: ALI_OC_CATALINA_AMBUSH_EVENT_ID },
        { type: 'startCombat', encounterId: 'ali.catalina-ambush' },
      ],
    },
  ],
};

const massawaCatalinaAmbushRetry: StoryEvent = {
  id: ALI_OC_CATALINA_AMBUSH_RETRY_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.932,
  trigger: exactScene(
    '75',
    '4',
    completed(ALI_OC_CATALINA_AMBUSH_EVENT_ID),
    notCompleted(ALI_OC_BASRA_SASHA_REUNION_EVENT_ID),
    {
      type: 'combatResolved',
      encounterId: 'ali.catalina-ambush',
      outcomes: ['defeat', 'retreat', 'draw'],
    },
  ),
  repeat: 'repeatable',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.massawaCatalinaAmbushRetry.recovery,
      position: 1,
      speaker: characterId('salim'),
    },
    {
      type: 'choice',
      prompt: dialogue.massawaCatalinaAmbushRetry.prompt,
      position: 1,
      speaker: characterId('salim'),
      options: [
        {
          id: 'yes',
          label: 'Yes',
          steps: [
            {
              type: 'dialogue',
              body: dialogue.massawaCatalinaAmbushRetry.accept,
              position: 2,
              speaker: characterId('ali'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'startCombat', encounterId: 'ali.catalina-ambush' },
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
              body: dialogue.massawaCatalinaAmbushRetry.defer,
              position: 1,
              speaker: characterId('salim'),
            },
          ],
        },
      ],
    },
  ],
};

const basraSashaReunion: StoryEvent = {
  id: ALI_OC_BASRA_SASHA_REUNION_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.933,
  trigger: exactScene('77', '2', completed(ALI_OC_CATALINA_AMBUSH_EVENT_ID), {
    type: 'combatResolved',
    encounterId: 'ali.catalina-ambush',
    outcomes: ['victory'],
  }),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.basraSashaReunion.sashaCry,
      position: 1,
      speaker: characterId('sasha'),
    },
    {
      type: 'dialogue',
      body: dialogue.basraSashaReunion.aliEmbrace,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'dialogue',
      body: dialogue.basraSashaReunion.salimSummons,
      position: 1,
      speaker: characterId('salim'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'setHowellHousePrice', priceIngots: 50 },
        { type: 'receiveGold', amount: 5000 },
        { type: 'receiveFame', fame: 'trade', amount: 300 },
        {
          type: 'completeEvent',
          eventId: ALI_OC_BASRA_SASHA_REUNION_EVENT_ID,
        },
      ],
    },
  ],
};

const istanbulFortuneTellerOracle: StoryEvent = {
  id: ALI_OC_FORTUNE_ORACLE_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.934,
  trigger: exactScene(
    '3',
    '12',
    completed(ALI_OC_BASRA_SASHA_REUNION_EVENT_ID),
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulFortuneTellerOracle.radinoOracle,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulFortuneTellerOracle.aliAmbition,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'completeEvent', eventId: ALI_OC_FORTUNE_ORACLE_EVENT_ID },
      ],
    },
  ],
};

const veniceHowellPietroDebt: StoryEvent = {
  id: ALI_OC_VENICE_HOWELL_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.9345,
  trigger: exactScene(
    '14',
    '9',
    completed(ALI_OC_BASRA_SASHA_REUNION_EVENT_ID),
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.veniceHowellPietroDebt.howellProposal,
      position: 0,
    },
    {
      type: 'choice',
      prompt: dialogue.veniceHowellPietroDebt.prompt,
      position: 0,
      options: [
        {
          id: 'yes',
          label: dialogue.veniceHowellPietroDebt.acceptLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.veniceHowellPietroDebt.acceptReply,
              position: 2,
              speaker: characterId('ali'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'grantHowellHouseFree' },
                { type: 'receiveFame', fame: 'trade', amount: 200 },
                {
                  type: 'completeEvent',
                  eventId: ALI_OC_VENICE_HOWELL_EVENT_ID,
                },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.veniceHowellPietroDebt.refuseLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.veniceHowellPietroDebt.refuseReply,
              position: 2,
              speaker: characterId('ali'),
            },
            {
              type: 'effect',
              effects: [
                { type: 'setPietroLoan', state: 'repaid' },
                { type: 'setHowellHousePrice', priceIngots: 50 },
                { type: 'receiveFame', fame: 'trade', amount: 200 },
                {
                  type: 'completeEvent',
                  eventId: ALI_OC_VENICE_HOWELL_EVENT_ID,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const istanbulSultanCoronation: StoryEvent = {
  id: ALI_OC_ENDING_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.935,
  trigger: exactScene(
    '3',
    '6',
    completed(ALI_OC_BASRA_SASHA_REUNION_EVENT_ID),
    { type: 'wealthMeetsHowellPrice' },
    { type: 'fameAtLeast', fame: 'trade', value: 800 },
    { type: 'alliedPortsAtLeast', countryIndex: 2, count: 30 },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulSultanCoronation.sultanDecree,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulSultanCoronation.sashaPride,
      position: 1,
      speaker: characterId('sasha'),
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulSultanCoronation.salimToast,
      position: 1,
      speaker: characterId('salim'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'grantHowellHouseFree' },
        { type: 'promoteRoyalRank', rank: 5 },
        { type: 'receiveGold', amount: 25000 },
        { type: 'receiveFame', fame: 'trade', amount: 1000 },
        { type: 'completeEvent', eventId: ALI_OC_ENDING_EVENT_ID },
      ],
    },
  ],
};

export const aliOriginalCoreEvents: StoryEvent[] = [
  istanbulShipyardLoan,
  istanbulGuildLoan,
  istanbulPubLoan,
  istanbulHarborDeparture,
  istanbulLodgeGift,
  istanbulShipyardRepay,
  istanbulGuildRepay,
  istanbulPubRepay,
  istanbulHarborRepay,
  istanbulPalaceFirstAudience,
  alexandriaPietroClue,
  lisbonJoaoLuciaClue,
  massawaCatalinaAmbush,
  massawaCatalinaAmbushRetry,
  basraSashaReunion,
  istanbulFortuneTellerOracle,
  veniceHowellPietroDebt,
  istanbulSultanCoronation,
];

export default aliOriginalCoreEvents;
