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
// 100 Gold Bar Premise & Decoy Voyage
export const ALI_OC_GOLD_PREMISE_EVENT_ID = eventId('istanbul-gold-bar-premise');
export const ALI_OC_ISTANBUL_PUB_JOAO_EVENT_ID = eventId('istanbul-pub-joao');
export const ALI_OC_ISTANBUL_HARBOR_SAIL_EVENT_ID = eventId('istanbul-harbor-decoy-sail');
export const ALI_OC_OCEAN_CATALINA_INTERCEPT_EVENT_ID = eventId('ocean-catalina-intercept');
export const ALI_OC_ISTANBUL_PUB_SAPHA_RUMOR_EVENT_ID = eventId('istanbul-pub-sapha-rumor');
export const ALI_OC_BASRA_SASHA_REUNION_EVENT_ID = eventId('basra-sasha-reunion');

// Backward-compatibility aliases
export const ALI_OC_LISBON_JOAO_EVENT_ID = ALI_OC_ISTANBUL_PUB_JOAO_EVENT_ID;
export const ALI_OC_CATALINA_AMBUSH_EVENT_ID = ALI_OC_OCEAN_CATALINA_INTERCEPT_EVENT_ID;
export const ALI_OC_FORTUNE_ORACLE_EVENT_ID = eventId('istanbul-fortune-teller-oracle');

// Section 3: 30 Ports & Pietro's Debt Chain
export const ALI_OC_ISTANBUL_BANK_RADINO_EVENT_ID = eventId('istanbul-bank-radino-transfer');
export const ALI_OC_VENICE_HOWELL_LOAN_REQUEST_EVENT_ID = eventId('venice-howell-loan-request');
export const ALI_OC_VENICE_BANK_SETTLEMENT_EVENT_ID = eventId('venice-bank-settlement');
export const ALI_OC_HOWELL_LOAN_REFUSED_EVENT_ID = ALI_OC_VENICE_BANK_SETTLEMENT_EVENT_ID;
export const ALI_OC_VENICE_HOWELL_EVENT_ID = ALI_OC_VENICE_HOWELL_LOAN_REQUEST_EVENT_ID;
export const ALI_OC_VENICE_HARBOR_SEARCH_PLAN_EVENT_ID = eventId('venice-harbor-search-plan');
export const ALI_OC_LISBON_DUCHESS_SPONSOR_EVENT_ID = eventId('lisbon-duchess-sponsor');
export const ALI_OC_LISBON_HARBOR_DEPARTURE_EVENT_ID = eventId('lisbon-harbor-departure');
export const ALI_OC_NAGASAKI_PUB_CLUE_EVENT_ID = eventId('nagasaki-pub-clue');
export const ALI_OC_SAKAI_PUB_PIETRO_REPAY_EVENT_ID = eventId('sakai-pub-pietro-repay');
export const ALI_OC_SAKAI_PUB_PIETRO_REPAY_REFUSED_EVENT_ID = eventId('sakai-pub-pietro-repay-refused');

// Section 4: 50 Ports & Sultan's Audience
export const ALI_OC_ISTANBUL_PALACE_SULTAN_REWARD_EVENT_ID = eventId('istanbul-palace-sultan-reward');

// Section 5: Rustem, Dynamic Price Test & Wedding Ending
export const ALI_OC_BASRA_PUB_RUSTEM_EVENT_ID = eventId('basra-pub-rustem-intro');
export const ALI_OC_ISTANBUL_PUB_FAMILY_INTRO_EVENT_ID = eventId('istanbul-pub-family-intro');
export const ALI_OC_VENICE_HOWELL_PRICE_QUOTE_EVENT_ID = eventId('venice-howell-price-quote');
export const ALI_OC_VENICE_HOWELL_TEST_SETTLEMENT_EVENT_ID = eventId('venice-howell-test-settlement');
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

const istanbulTestedBuildings = ['1', '2', '3', '4', '6', '9'] as const;

const goldBarPremiseTestedBuilding: StoryCondition = {
  type: 'any',
  conditions: [
    ...istanbulTestedBuildings.map((buildingId) =>
      exactScene('3', buildingId),
    ),
    {
      type: 'all',
      conditions: [
        { type: 'scenarioEdition', edition: 'original-core-v1' },
        { type: 'stage', stage: 'building' },
        { type: 'not', condition: { type: 'atPort', portId: '3' } },
      ],
    },
  ],
};

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

// ============================================================================
// C2: 100 Gold Bar Premise & Decoy Voyage
// ============================================================================

const istanbulGoldBarPremise: StoryEvent = {
  id: ALI_OC_GOLD_PREMISE_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.9295,
  trigger: {
    type: 'all',
    conditions: [
      completed(ALI_OC_PALACE_FIRST_AUDIENCE_EVENT_ID),
      { type: 'goldAtLeast', value: 1000000 },
      goldBarPremiseTestedBuilding,
    ],
  },
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulGoldPremise.merchantPraise,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulGoldPremise.aliConfidence,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveFame', fame: 'trade', amount: 50 },
        { type: 'completeEvent', eventId: ALI_OC_GOLD_PREMISE_EVENT_ID },
      ],
    },
  ],
};

const istanbulPubJoaoDecoy: StoryEvent = {
  id: ALI_OC_ISTANBUL_PUB_JOAO_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.93,
  trigger: exactScene(
    '3',
    '2',
    {
      type: 'any',
      conditions: [
        completed(ALI_OC_SHIPYARD_REPAY_EVENT_ID),
        {
          type: 'all',
          conditions: [
            completed(ALI_OC_PALACE_FIRST_AUDIENCE_EVENT_ID),
            {
              type: 'any',
              conditions: [
                completed(ALI_OC_GOLD_PREMISE_EVENT_ID),
                { type: 'goldAtLeast', value: 1000000 },
              ],
            },
          ],
        },
      ],
    },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulPubJoaoDecoy.ladiaIntro,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulPubJoaoDecoy.joaoMeet,
      position: 1,
      speaker: characterId('joao'),
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulPubJoaoDecoy.aliInquiry,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulPubJoaoDecoy.joaoPresterJohn,
      position: 1,
      speaker: characterId('joao'),
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulPubJoaoDecoy.aliMassawaClue,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulPubJoaoDecoy.aliDecoyOffer,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulPubJoaoDecoy.joaoAcceptPlan,
      position: 1,
      speaker: characterId('joao'),
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulPubJoaoDecoy.aliSaphaRequest,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulPubJoaoDecoy.joaoPromiseHarbor,
      position: 1,
      speaker: characterId('joao'),
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulPubJoaoDecoy.ladiaWarning,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulPubJoaoDecoy.aliHarborDeparture,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveFame', fame: 'trade', amount: 150 },
        { type: 'completeEvent', eventId: ALI_OC_ISTANBUL_PUB_JOAO_EVENT_ID },
      ],
    },
  ],
};

const istanbulHarborDecoySail: StoryEvent = {
  id: ALI_OC_ISTANBUL_HARBOR_SAIL_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.9305,
  trigger: exactScene(
    '3',
    '4',
    completed(ALI_OC_ISTANBUL_PUB_JOAO_EVENT_ID),
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulHarborDecoySail.joaoFitting,
      position: 1,
      speaker: characterId('joao'),
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulHarborDecoySail.joaoCaution,
      position: 1,
      speaker: characterId('joao'),
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulHarborDecoySail.aliFarewell,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulHarborDecoySail.salimReady,
      position: 1,
      speaker: characterId('salim'),
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: ALI_OC_ISTANBUL_HARBOR_SAIL_EVENT_ID,
        },
      ],
    },
  ],
};

const oceanCatalinaIntercept: StoryEvent = {
  id: ALI_OC_OCEAN_CATALINA_INTERCEPT_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.931,
  trigger: {
    type: 'all',
    conditions: [
      { type: 'scenarioEdition', edition: 'original-core-v1' },
      { type: 'stage', stage: 'world' },
      completed(ALI_OC_ISTANBUL_HARBOR_SAIL_EVENT_ID),
      { type: 'daysAtSea', min: 1 },
    ],
  },
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.oceanCatalinaIntercept.katarinaChallenge,
      position: 1,
      speaker: characterId('katarina'),
    },
    {
      type: 'dialogue',
      body: dialogue.oceanCatalinaIntercept.aliDefiance,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'dialogue',
      body: dialogue.oceanCatalinaIntercept.katarinaCancel,
      position: 1,
      speaker: characterId('katarina'),
    },
    {
      type: 'dialogue',
      body: dialogue.oceanCatalinaIntercept.salimRelief,
      position: 1,
      speaker: characterId('salim'),
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: ALI_OC_OCEAN_CATALINA_INTERCEPT_EVENT_ID,
        },
      ],
    },
  ],
};

const istanbulPubSaphaRumor: StoryEvent = {
  id: ALI_OC_ISTANBUL_PUB_SAPHA_RUMOR_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.932,
  trigger: exactScene(
    '3',
    '2',
    completed(ALI_OC_OCEAN_CATALINA_INTERCEPT_EVENT_ID),
    {
      type: 'aliDayFiveVoyagesAtLeast',
      count: 6,
    },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulPubSaphaRumor.ladiaRumor,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulPubSaphaRumor.aliDepart,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: ALI_OC_ISTANBUL_PUB_SAPHA_RUMOR_EVENT_ID,
        },
      ],
    },
  ],
};

const basraSashaReunion: StoryEvent = {
  id: ALI_OC_BASRA_SASHA_REUNION_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.933,
  trigger: exactScene(
    '77',
    '2',
    completed(ALI_OC_ISTANBUL_PUB_SAPHA_RUMOR_EVENT_ID),
  ),
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
        { type: 'receiveFame', fame: 'trade', amount: 300 },
        {
          type: 'completeEvent',
          eventId: ALI_OC_BASRA_SASHA_REUNION_EVENT_ID,
        },
      ],
    },
  ],
};

// ============================================================================
// C2 Section 3: 30 Ports & Pietro's Debt Chain
// ============================================================================

const istanbulBankRadinoTransfer: StoryEvent = {
  id: ALI_OC_ISTANBUL_BANK_RADINO_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.934,
  trigger: exactScene(
    '3',
    '9',
    completed(ALI_OC_BASRA_SASHA_REUNION_EVENT_ID),
    { type: 'alliedPortsAtLeast', countryIndex: 2, count: 30 },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulBankRadinoTransfer.radinoTransfer,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulBankRadinoTransfer.aliAgreed,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: ALI_OC_ISTANBUL_BANK_RADINO_EVENT_ID,
        },
      ],
    },
  ],
};

const veniceHowellLoanRequest: StoryEvent = {
  id: ALI_OC_VENICE_HOWELL_LOAN_REQUEST_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.935,
  trigger: exactScene(
    '14',
    '9',
    completed(ALI_OC_ISTANBUL_BANK_RADINO_EVENT_ID),
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.veniceHowellLoanRequest.radinoIntro,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.veniceHowellLoanRequest.howellDebtRequest,
      position: 0,
    },
    {
      type: 'choice',
      prompt: dialogue.veniceHowellLoanRequest.prompt,
      position: 0,
      options: [
        {
          id: 'yes',
          label: dialogue.veniceHowellLoanRequest.acceptLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.veniceHowellLoanRequest.acceptReply,
              position: 2,
              speaker: characterId('ali'),
            },
            {
              type: 'effect',
              effects: [
                {
                  type: 'completeEvent',
                  eventId: ALI_OC_VENICE_HOWELL_LOAN_REQUEST_EVENT_ID,
                },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.veniceHowellLoanRequest.refuseLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.veniceHowellLoanRequest.refuseReply,
              position: 2,
              speaker: characterId('ali'),
            },
            {
              type: 'effect',
              effects: [
                {
                  type: 'completeEvent',
                  eventId: ALI_OC_VENICE_HOWELL_LOAN_REQUEST_EVENT_ID,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const veniceHarborSearchPlan: StoryEvent = {
  id: ALI_OC_VENICE_HARBOR_SEARCH_PLAN_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.9355,
  trigger: exactScene(
    '14',
    '4',
    completed(ALI_OC_VENICE_HOWELL_LOAN_REQUEST_EVENT_ID),
    notCompleted(ALI_OC_VENICE_BANK_SETTLEMENT_EVENT_ID),
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.veniceHarborSearchPlan.salimPlan,
      position: 1,
      speaker: characterId('salim'),
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: ALI_OC_VENICE_HARBOR_SEARCH_PLAN_EVENT_ID,
        },
      ],
    },
  ],
};

const lisbonDuchessSponsor: StoryEvent = {
  id: ALI_OC_LISBON_DUCHESS_SPONSOR_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.936,
  trigger: exactScene(
    '1',
    '8',
    completed(ALI_OC_VENICE_HARBOR_SEARCH_PLAN_EVENT_ID),
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.lisbonDuchessSponsor.marcoAdmit,
      position: 1,
      speaker: characterId('butler-marco'),
    },
    {
      type: 'dialogue',
      body: dialogue.lisbonDuchessSponsor.duchessReward,
      position: 1,
      speaker: characterId('duchess-christiana'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveGold', amount: 100_000 },
        { type: 'receiveFame', fame: 'trade', amount: 150 },
        {
          type: 'completeEvent',
          eventId: ALI_OC_LISBON_DUCHESS_SPONSOR_EVENT_ID,
        },
      ],
    },
  ],
};

const lisbonHarborDeparture: StoryEvent = {
  id: ALI_OC_LISBON_HARBOR_DEPARTURE_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.9365,
  trigger: exactScene(
    '1',
    '4',
    completed(ALI_OC_LISBON_DUCHESS_SPONSOR_EVENT_ID),
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.lisbonHarborDeparture.salimDistance,
      position: 1,
      speaker: characterId('salim'),
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: ALI_OC_LISBON_HARBOR_DEPARTURE_EVENT_ID,
        },
      ],
    },
  ],
};

const nagasakiPubClue: StoryEvent = {
  id: ALI_OC_NAGASAKI_PUB_CLUE_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.937,
  trigger: exactScene(
    '100',
    '2',
    completed(ALI_OC_LISBON_HARBOR_DEPARTURE_EVENT_ID),
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.nagasakiPubClue.patronClue,
      position: 0,
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: ALI_OC_NAGASAKI_PUB_CLUE_EVENT_ID,
        },
      ],
    },
  ],
};

const sakaiPubPietroRepayLent: StoryEvent = {
  id: ALI_OC_SAKAI_PUB_PIETRO_REPAY_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.938,
  trigger: exactScene(
    '99',
    '2',
    completed(ALI_OC_LISBON_HARBOR_DEPARTURE_EVENT_ID),
    { type: 'pietroLoanIs', state: 'lent' },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.sakaiPubPietroRepay.pietroLentGreeting,
      position: 1,
      speaker: characterId('pietro'),
    },
    {
      type: 'dialogue',
      body: dialogue.sakaiPubPietroRepay.aliReceipt,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveGold', amount: 2_100_000 },
        { type: 'receiveFame', fame: 'trade', amount: 200 },
        { type: 'setPietroLoan', state: 'repaid' },
        {
          type: 'completeEvent',
          eventId: ALI_OC_SAKAI_PUB_PIETRO_REPAY_EVENT_ID,
        },
      ],
    },
  ],
};

const sakaiPubPietroRepayRefused: StoryEvent = {
  id: ALI_OC_SAKAI_PUB_PIETRO_REPAY_REFUSED_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.9381,
  trigger: exactScene(
    '99',
    '2',
    completed(ALI_OC_LISBON_HARBOR_DEPARTURE_EVENT_ID),
    notCompleted(ALI_OC_SAKAI_PUB_PIETRO_REPAY_EVENT_ID),
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.sakaiPubPietroRepay.pietroRefusedGreeting,
      position: 1,
      speaker: characterId('pietro'),
    },
    {
      type: 'dialogue',
      body: dialogue.sakaiPubPietroRepay.aliReceipt,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveGold', amount: 400_000 },
        { type: 'receiveFame', fame: 'trade', amount: 100 },
        { type: 'setPietroLoan', state: 'repaid' },
        {
          type: 'completeEvent',
          eventId: ALI_OC_SAKAI_PUB_PIETRO_REPAY_REFUSED_EVENT_ID,
        },
        {
          type: 'completeEvent',
          eventId: ALI_OC_SAKAI_PUB_PIETRO_REPAY_EVENT_ID,
        },
      ],
    },
  ],
};

const veniceBankSettlement: StoryEvent = {
  id: ALI_OC_VENICE_BANK_SETTLEMENT_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.939,
  trigger: exactScene(
    '14',
    '9',
    completed(ALI_OC_SAKAI_PUB_PIETRO_REPAY_EVENT_ID),
    { type: 'wealthIngotsAtLeast', value: 40 },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.veniceBankSettlement.bankerSettlement,
      position: 0,
    },
    {
      type: 'effect',
      effects: [
        { type: 'spendGold', amount: 400_000 },
        { type: 'receiveFame', fame: 'trade', amount: 200 },
        {
          type: 'completeEvent',
          eventId: ALI_OC_VENICE_BANK_SETTLEMENT_EVENT_ID,
        },
      ],
    },
  ],
};

// ============================================================================
// C2 Section 4: 50 Ports & Sultan's Audience
// ============================================================================

const istanbulPalaceSultanAudience: StoryEvent = {
  id: ALI_OC_ISTANBUL_PALACE_SULTAN_REWARD_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.940,
  trigger: exactScene(
    '3',
    '6',
    completed(ALI_OC_VENICE_BANK_SETTLEMENT_EVENT_ID),
    { type: 'alliedPortsAtLeast', countryIndex: 2, count: 50 },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulPalaceSultanAudience.sultanPraise,
      position: 0,
    },
    {
      type: 'effect',
      effects: [
        { type: 'receiveGold', amount: 1_000_000 },
        { type: 'receiveFame', fame: 'trade', amount: 300 },
        {
          type: 'completeEvent',
          eventId: ALI_OC_ISTANBUL_PALACE_SULTAN_REWARD_EVENT_ID,
        },
      ],
    },
  ],
};

// ============================================================================
// C2 Section 5: Rustem, Dynamic Price Test & Wedding Ending
// ============================================================================

const basraPubRustemIntro: StoryEvent = {
  id: ALI_OC_BASRA_PUB_RUSTEM_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.941,
  trigger: exactScene(
    '77',
    '2',
    completed(ALI_OC_ISTANBUL_PALACE_SULTAN_REWARD_EVENT_ID),
    { type: 'fameAtLeast', fame: 'trade', value: 800 },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.basraPubRustemIntro.saphaBrother,
      position: 1,
      speaker: characterId('sasha'),
    },
    {
      type: 'dialogue',
      body: dialogue.basraPubRustemIntro.salimOrphanageProposal,
      position: 1,
      speaker: characterId('salim'),
    },
    {
      type: 'dialogue',
      body: dialogue.basraPubRustemIntro.aliResolve,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: ALI_OC_BASRA_PUB_RUSTEM_EVENT_ID,
        },
      ],
    },
  ],
};

const istanbulPubFamilyIntro: StoryEvent = {
  id: ALI_OC_ISTANBUL_PUB_FAMILY_INTRO_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.942,
  trigger: exactScene(
    '3',
    '2',
    completed(ALI_OC_BASRA_PUB_RUSTEM_EVENT_ID),
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulPubFamilyIntro.ladiaWelcome,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulPubFamilyIntro.ladiaHowellLead,
      position: 0,
    },
    {
      type: 'effect',
      effects: [
        {
          type: 'completeEvent',
          eventId: ALI_OC_ISTANBUL_PUB_FAMILY_INTRO_EVENT_ID,
        },
      ],
    },
  ],
};

const veniceHowellPriceQuote: StoryEvent = {
  id: ALI_OC_VENICE_HOWELL_PRICE_QUOTE_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.943,
  trigger: exactScene(
    '14',
    '9',
    completed(ALI_OC_ISTANBUL_PUB_FAMILY_INTRO_EVENT_ID),
    notCompleted(ALI_OC_VENICE_HOWELL_PRICE_QUOTE_EVENT_ID),
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.veniceHowellPriceQuote.howellPriceQuote,
      position: 0,
    },
    {
      type: 'effect',
      effects: [
        { type: 'setHowellHousePrice' },
        {
          type: 'completeEvent',
          eventId: ALI_OC_VENICE_HOWELL_PRICE_QUOTE_EVENT_ID,
        },
      ],
    },
  ],
};

const veniceHowellTestSettlement: StoryEvent = {
  id: ALI_OC_VENICE_HOWELL_TEST_SETTLEMENT_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.944,
  trigger: exactScene(
    '14',
    '9',
    completed(ALI_OC_VENICE_HOWELL_PRICE_QUOTE_EVENT_ID),
    { type: 'wealthMeetsHowellPrice' },
  ),
  repeat: 'once',
  steps: [
    {
      type: 'choice',
      prompt: dialogue.veniceHowellTestSettlement.prompt,
      position: 0,
      options: [
        {
          id: 'yes',
          label: dialogue.veniceHowellTestSettlement.confirmLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.veniceHowellTestSettlement.confirmReply,
              position: 2,
              speaker: characterId('ali'),
            },
            {
              type: 'dialogue',
              body: dialogue.veniceHowellTestSettlement.howellFreeGrant,
              position: 0,
            },
            {
              type: 'effect',
              effects: [
                { type: 'grantHowellHouseFree' },
                { type: 'receiveFame', fame: 'trade', amount: 300 },
                {
                  type: 'completeEvent',
                  eventId: ALI_OC_VENICE_HOWELL_TEST_SETTLEMENT_EVENT_ID,
                },
              ],
            },
          ],
        },
        {
          id: 'no',
          label: dialogue.veniceHowellTestSettlement.deferLabel,
          steps: [
            {
              type: 'dialogue',
              body: dialogue.veniceHowellTestSettlement.deferReply,
              position: 2,
              speaker: characterId('ali'),
            },
          ],
        },
      ],
    },
  ],
};

const istanbulPubWeddingEnding: StoryEvent = {
  id: ALI_OC_ENDING_EVENT_ID,
  arcId: ALI_ORIGINAL_CORE_ARC_ID,
  priority: 0.945,
  trigger: exactScene(
    '3',
    '2',
    completed(ALI_OC_VENICE_HOWELL_TEST_SETTLEMENT_EVENT_ID),
  ),
  repeat: 'once',
  steps: [
    {
      type: 'dialogue',
      body: dialogue.istanbulPubWeddingEnding.aliProposal,
      position: 2,
      speaker: characterId('ali'),
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulPubWeddingEnding.ladiaAccept,
      position: 0,
    },
    {
      type: 'dialogue',
      body: dialogue.istanbulPubWeddingEnding.salimToast,
      position: 0,
    },
    {
      type: 'effect',
      effects: [
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
  istanbulGoldBarPremise,
  istanbulPubJoaoDecoy,
  istanbulHarborDecoySail,
  oceanCatalinaIntercept,
  istanbulPubSaphaRumor,
  basraSashaReunion,
  istanbulBankRadinoTransfer,
  veniceHowellLoanRequest,
  veniceHarborSearchPlan,
  lisbonDuchessSponsor,
  lisbonHarborDeparture,
  nagasakiPubClue,
  sakaiPubPietroRepayLent,
  sakaiPubPietroRepayRefused,
  veniceBankSettlement,
  istanbulPalaceSultanAudience,
  basraPubRustemIntro,
  istanbulPubFamilyIntro,
  veniceHowellPriceQuote,
  veniceHowellTestSettlement,
  istanbulPubWeddingEnding,
];

export default aliOriginalCoreEvents;
