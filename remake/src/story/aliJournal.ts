import type { State } from '../state/state';
import type { JournalEntry } from './firstVoyageJournal';
import {
  ALI_ADEN_CORSAIRS_EVENT_ID,
  ALI_ALEXANDRIA_SPICE_EVENT_ID,
  ALI_BASRA_REUNION_EVENT_ID,
  ALI_ENDING_EVENT_ID,
  ALI_ISTANBUL_WINDFALL_EVENT_ID,
  ALI_LISBON_SEARCH_EVENT_ID,
} from './content/arcs/ali/merchant';
import {
  ALI_OC_ALEXANDRIA_PIETRO_EVENT_ID,
  ALI_OC_BASRA_PUB_RUSTEM_EVENT_ID,
  ALI_OC_BASRA_SASHA_REUNION_EVENT_ID,
  ALI_OC_ENDING_EVENT_ID,
  ALI_OC_GOLD_PREMISE_EVENT_ID,
  ALI_OC_HARBOR_DEPARTURE_EVENT_ID,
  ALI_OC_HARBOR_REPAY_EVENT_ID,
  ALI_OC_ISTANBUL_BANK_RADINO_EVENT_ID,
  ALI_OC_ISTANBUL_HARBOR_SAIL_EVENT_ID,
  ALI_OC_ISTANBUL_PALACE_SULTAN_REWARD_EVENT_ID,
  ALI_OC_ISTANBUL_PUB_JOAO_EVENT_ID,
  ALI_OC_ISTANBUL_PUB_SAPHA_RUMOR_EVENT_ID,
  ALI_OC_LISBON_DUCHESS_SPONSOR_EVENT_ID,
  ALI_OC_OCEAN_CATALINA_INTERCEPT_EVENT_ID,
  ALI_OC_SAKAI_PUB_PIETRO_REPAY_EVENT_ID,
  ALI_OC_VENICE_BANK_SETTLEMENT_EVENT_ID,
  ALI_OC_VENICE_HOWELL_LOAN_REQUEST_EVENT_ID,
  ALI_OC_VENICE_HOWELL_TEST_SETTLEMENT_EVENT_ID,
} from './content/arcs/ali/original-core';

const getAliOriginalCoreJournal = (state: State): JournalEntry[] => {
  const completedEvents = new Set(state.storyEvents ?? []);
  const endingDone = completedEvents.has(ALI_OC_ENDING_EVENT_ID);

  return [
    {
      id: 'ali-oc-istanbul-loans',
      title: 'Collect 1,000 Gold from Four Istanbul Benefactors',
      body: 'Visit the Istanbul Shipyard (200g), Guild (300g), Pub (300g), and Harbor (200g) to gather 1,000 gold and board the Hugli with Salim.',
      completed:
        endingDone || completedEvents.has(ALI_OC_HARBOR_DEPARTURE_EVENT_ID),
    },
    {
      id: 'ali-oc-istanbul-repay',
      title: 'Repay 2,000 Gold Each to All Four Istanbul Investors',
      body: 'Build your trading fortune and return to the Istanbul Shipyard, Guild, Pub, and Harbor to repay 2,000 gold to each of your four benefactors.',
      completed:
        endingDone || completedEvents.has(ALI_OC_HARBOR_REPAY_EVENT_ID),
    },
    {
      id: 'ali-oc-alexandria-pietro',
      title: 'Hear Pietro’s Clue at the Alexandria Pub',
      body: 'Visit the Alexandria Pub to hear Pietro Conti’s clue about your lost sister Sasha.',
      completed:
        endingDone || completedEvents.has(ALI_OC_ALEXANDRIA_PIETRO_EVENT_ID),
    },
    {
      id: 'ali-oc-istanbul-gold-premise',
      title: 'Amass 100 Gold Ingots and Enter a Commercial Center',
      body: 'Accumulate at least 100 Gold Ingots (1,000,000 carried gold) and enter the Istanbul Pub, Harbor, Bank, Shipyard, or Palace to establish your commercial stature.',
      completed:
        endingDone ||
        completedEvents.has(ALI_OC_GOLD_PREMISE_EVENT_ID) ||
        completedEvents.has(ALI_OC_ISTANBUL_PUB_JOAO_EVENT_ID),
    },
    {
      id: 'ali-oc-istanbul-joao',
      title: 'Meet João Franco at the Istanbul Pub',
      body: 'Visit the Istanbul Pub to meet João Franco, share the Massawa clue, and offer to act as his decoy under his family emblem sail in exchange for news of Sapha.',
      completed:
        endingDone || completedEvents.has(ALI_OC_ISTANBUL_PUB_JOAO_EVENT_ID),
    },
    {
      id: 'ali-oc-istanbul-harbor-sail',
      title: 'Fit João’s Decoy Sail at Istanbul Harbor',
      body: 'Meet João Franco at the Istanbul Harbor to fit his family emblem sail to your flagship in preparation for the decoy voyage.',
      completed:
        endingDone ||
        completedEvents.has(ALI_OC_ISTANBUL_HARBOR_SAIL_EVENT_ID),
    },
    {
      id: 'ali-oc-ocean-catalina',
      title: 'Intercept Catalina Erantzo at Sea as João’s Decoy',
      body: 'Sail out into the open sea with João’s emblem sail to intercept and defuse Pirate Catalina Erantzo’s pursuit without violence.',
      completed:
        endingDone ||
        completedEvents.has(ALI_OC_OCEAN_CATALINA_INTERCEPT_EVENT_ID),
    },
    {
      id: 'ali-oc-istanbul-sapha-rumor',
      title: 'Complete Six 5-Day Voyages and Hear Ladia’s Word in Istanbul',
      body: 'Complete 6 voyages of at least 5 days at sea after the decoy encounter, then visit Ladia at the Istanbul Pub to learn where your sister Sapha is waiting.',
      completed:
        endingDone ||
        completedEvents.has(ALI_OC_ISTANBUL_PUB_SAPHA_RUMOR_EVENT_ID),
    },
    {
      id: 'ali-oc-basra-sasha',
      title: 'Reunite with Sister Sasha at the Basra Pub',
      body: 'Enter the Persian Gulf and visit the Basra Pub to reunite with your sister Sasha.',
      completed:
        endingDone || completedEvents.has(ALI_OC_BASRA_SASHA_REUNION_EVENT_ID),
    },
    {
      id: 'ali-oc-istanbul-bank-radino',
      title: 'Expand to 30 Allied Ports and Meet Radino at Istanbul Bank',
      body: 'Ally at least 30 ports under the Ottoman flag and visit Astrologer Radino at the Istanbul Bank to learn of the Venice connection.',
      completed:
        endingDone ||
        completedEvents.has(ALI_OC_ISTANBUL_BANK_RADINO_EVENT_ID),
    },
    {
      id: 'ali-oc-venice-howell-loan',
      title: 'Consult Collector Howell at the Venice Bank',
      body: 'Visit Collector Howell at the Venice Bank regarding Pietro Conti’s outstanding debt.',
      completed:
        endingDone ||
        completedEvents.has(ALI_OC_VENICE_HOWELL_LOAN_REQUEST_EVENT_ID),
    },
    {
      id: 'ali-oc-lisbon-duchess',
      title: 'Seek Duchess Christiana at the Lisbon Franco Residence',
      body: 'Visit Duchess Christiana in Lisbon to secure sponsorship and Pietro’s destination in Zipangu.',
      completed:
        endingDone ||
        completedEvents.has(ALI_OC_LISBON_DUCHESS_SPONSOR_EVENT_ID) ||
        completedEvents.has(ALI_OC_VENICE_BANK_SETTLEMENT_EVENT_ID),
    },
    {
      id: 'ali-oc-sakai-pietro',
      title: 'Collect Pietro’s Debt at the Sakai Pub in Zipangu',
      body: 'Sail to the Far East and locate Pietro Conti at the Sakai Pub to recover Howell’s loan.',
      completed:
        endingDone ||
        completedEvents.has(ALI_OC_SAKAI_PUB_PIETRO_REPAY_EVENT_ID) ||
        completedEvents.has(ALI_OC_VENICE_BANK_SETTLEMENT_EVENT_ID),
    },
    {
      id: 'ali-oc-venice-settlement',
      title: 'Settle Howell’s Account at the Venice Bank',
      body: 'Return to the Venice Bank with at least 40 gold ingots to clear Pietro’s loan obligation.',
      completed:
        endingDone ||
        completedEvents.has(ALI_OC_VENICE_BANK_SETTLEMENT_EVENT_ID),
    },
    {
      id: 'ali-oc-sultan-reward',
      title: 'Expand to 50 Allied Ports and Receive Sultan’s Reward in Istanbul',
      body: 'Expand Ottoman allied ports to at least 50 and visit Sultan Suleiman at the Istanbul Royal Palace to receive royal recognition.',
      completed:
        endingDone ||
        completedEvents.has(ALI_OC_ISTANBUL_PALACE_SULTAN_REWARD_EVENT_ID),
    },
    {
      id: 'ali-oc-basra-rustem',
      title: 'Reach 40,000 Trade Fame and Meet Rustem at the Basra Pub',
      body: 'Achieve at least 40,000 Trade Fame (800 in trade fame ledger) and visit the Basra Pub to meet the orphan Rustem.',
      completed:
        endingDone || completedEvents.has(ALI_OC_BASRA_PUB_RUSTEM_EVENT_ID),
    },
    {
      id: 'ali-oc-howell-house',
      title: 'Pass Collector Howell’s Mansion Test at the Venice Bank',
      body: 'Introduce the family to Ladia in Istanbul, quote the mansion price in Venice, and prove your merchant resolve to Collector Howell.',
      completed:
        endingDone ||
        completedEvents.has(ALI_OC_VENICE_HOWELL_TEST_SETTLEMENT_EVENT_ID),
    },
    {
      id: 'ali-oc-istanbul-vizier',
      title: 'Acquire a Family Home and Celebrate at the Istanbul Pub',
      body: 'Consult Fortune Teller Radino in Istanbul, settle the mansion deal with Collector Howell at the Venice Bank with at least 50 gold ingots, 800 Trade Fame, and 30 Ottoman allied ports, then return to the Istanbul Pub to celebrate your new family home.',
      completed: endingDone,
    },
  ];
};

export const getAliJournal = (state: State): JournalEntry[] => {
  if (state.scenarioEdition !== 'legacy-remake') {
    return getAliOriginalCoreJournal(state);
  }
  const completedEvents = new Set(state.storyEvents ?? []);
  const endingDone = completedEvents.has(ALI_ENDING_EVENT_ID);
  const adenWon =
    endingDone || state.combatResults['ali.red-sea-raiders'] === 'victory';

  return [
    {
      id: 'ali-istanbul-windfall',
      title: 'Accept Salim’s Seed Capital in Istanbul',
      body: 'Meet Salim at the Istanbul harbor to receive the dhow Hugli and two thousand gold in trading capital.',
      completed:
        endingDone || completedEvents.has(ALI_ISTANBUL_WINDFALL_EVENT_ID),
    },
    {
      id: 'ali-alexandria-spice',
      title: 'Close the Spice Bargain in Alexandria',
      body: 'Sail south to the Alexandria market to trade eastern spices and ask after your sister Sasha.',
      completed:
        endingDone || completedEvents.has(ALI_ALEXANDRIA_SPICE_EVENT_ID),
    },
    {
      id: 'ali-lisbon-search',
      title: 'Follow Sasha’s Trail to Lisbon Pub',
      body: 'Visit the Lisbon pub to hear Lucia and João Franco’s account of Sasha’s eastern voyage.',
      completed: endingDone || completedEvents.has(ALI_LISBON_SEARCH_EVENT_ID),
    },
    {
      id: 'ali-aden-corsairs',
      title: 'Defend the Spice Convoy at Aden',
      body: completedEvents.has(ALI_ADEN_CORSAIRS_EVENT_ID)
        ? 'Defeat the Red Sea raiders outside Aden, or sortie again from the Aden harbor.'
        : 'Sail around Africa to the Aden harbor and protect the eastern merchant convoy from Red Sea raiders.',
      completed: adenWon,
    },
    {
      id: 'ali-basra-reunion',
      title: 'Reunite with Sasha in Basra',
      body: 'Enter the Persian Gulf and visit the Basra pub to reunite with your sister Sasha.',
      completed: endingDone || completedEvents.has(ALI_BASRA_REUNION_EVENT_ID),
    },
    {
      id: 'ali-istanbul-grand-vizier',
      title: 'Answer the Sultan’s Summons in Istanbul',
      body: 'Return to the Istanbul Royal Palace to be honored as the greatest merchant prince of the realm.',
      completed: endingDone,
    },
  ];
};

export default getAliJournal;
