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
  ALI_OC_GOLD_PREMISE_SAIL_EVENT_ID,
  ALI_OC_HARBOR_DEPARTURE_EVENT_ID,
  ALI_OC_HARBOR_REPAY_EVENT_ID,
  ALI_OC_ISTANBUL_BANK_RADINO_EVENT_ID,
  ALI_OC_ISTANBUL_HARBOR_SAIL_EVENT_ID,
  ALI_OC_ISTANBUL_PALACE_SULTAN_REWARD_EVENT_ID,
  ALI_OC_ISTANBUL_PUB_JOAO_EVENT_ID,
  ALI_OC_ISTANBUL_PUB_SAPHA_RUMOR_EVENT_ID,
  ALI_OC_ISTANBUL_PUB_TELL_LADIA_EVENT_ID,
  ALI_OC_LISBON_HARBOR_DEPARTURE_EVENT_ID,
  ALI_OC_OCEAN_CATALINA_INTERCEPT_EVENT_ID,
  ALI_OC_OTTOMAN_30_PORTS_HARBOR_EVENT_ID,
  ALI_OC_PALACE_FIRST_AUDIENCE_EVENT_ID,
  ALI_OC_SAKAI_PUB_PIETRO_REPAY_EVENT_ID,
  ALI_OC_VENICE_BANK_SETTLEMENT_EVENT_ID,
  ALI_OC_VENICE_HOWELL_LOAN_REFUSED_EVENT_ID,
  ALI_OC_VENICE_HOWELL_LOAN_REQUEST_EVENT_ID,
  ALI_OC_VENICE_HOWELL_TEST_SETTLEMENT_EVENT_ID,
} from './content/arcs/ali/original-core';

const getAliOriginalCoreJournal = (state: State): JournalEntry[] => {
  const completedEvents = new Set(state.storyEvents ?? []);
  const endingDone = completedEvents.has(ALI_OC_ENDING_EVENT_ID);
  const howellRefused = completedEvents.has(
    ALI_OC_VENICE_HOWELL_LOAN_REFUSED_EVENT_ID,
  );

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
      id: 'ali-oc-palace-first-audience',
      title: 'Receive Royal Commission at the Istanbul Palace',
      body: 'After repaying all four Istanbul benefactors, visit Sultan Suleiman at the Istanbul Royal Palace to receive 50 Gold Ingots (500,000 gold) and an Ottoman Tax Permit.',
      completed:
        endingDone ||
        completedEvents.has(ALI_OC_PALACE_FIRST_AUDIENCE_EVENT_ID),
    },
    {
      id: 'ali-oc-alexandria-pietro',
      kind: 'advice',
      title: 'Hear Pietro’s Clue at the Alexandria Pub',
      body: 'Visit the Alexandria Pub to hear Pietro Conti’s clue about your lost sister Sasha.',
      completed:
        endingDone ||
        howellRefused ||
        completedEvents.has(ALI_OC_ALEXANDRIA_PIETRO_EVENT_ID) ||
        completedEvents.has(ALI_OC_SAKAI_PUB_PIETRO_REPAY_EVENT_ID),
    },
    {
      id: 'ali-oc-istanbul-gold-premise',
      title: 'Amass 100 Gold Ingots, Enter a Commercial Center, and Set Sail',
      body: 'Carry at least 100 Gold Ingots (1,000,000 carried gold, excluding bank savings), enter a tested commercial or official building in Istanbul or any other port, and sail at least 1 day at sea.',
      completed:
        endingDone ||
        (completedEvents.has(ALI_OC_GOLD_PREMISE_EVENT_ID) &&
          completedEvents.has(ALI_OC_GOLD_PREMISE_SAIL_EVENT_ID)) ||
        completedEvents.has(ALI_OC_ISTANBUL_PUB_JOAO_EVENT_ID),
    },
    {
      id: 'ali-oc-istanbul-joao',
      title: 'Meet João Franco at the Istanbul Pub',
      body: 'After returning from sea, hear the rumor in Istanbul and visit the Istanbul Pub to meet João Franco and offer to act as his decoy.',
      completed:
        endingDone || completedEvents.has(ALI_OC_ISTANBUL_PUB_JOAO_EVENT_ID),
    },
    {
      id: 'ali-oc-istanbul-harbor-sail',
      title: 'Fit João’s Decoy Sail at Istanbul Harbor',
      body: 'Meet João Franco at the Istanbul Harbor to fit his family emblem sail to your flagship in preparation for the decoy voyage.',
      completed:
        endingDone || completedEvents.has(ALI_OC_ISTANBUL_HARBOR_SAIL_EVENT_ID),
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
      body: 'Complete 6 voyages reaching at least 5 days at sea after the decoy encounter, then visit Ladia at the Istanbul Pub to learn where Sapha is waiting.',
      completed:
        endingDone ||
        completedEvents.has(ALI_OC_ISTANBUL_PUB_SAPHA_RUMOR_EVENT_ID),
    },
    {
      id: 'ali-oc-basra-sasha',
      title: 'Reunite with Sapha in Basra and Report to Ladia in Istanbul',
      body: 'Sail into the Persian Gulf to reunite with Sapha at the Basra Pub (+1,000 Trade Fame), then return to the Istanbul Pub to share the news with Ladia.',
      completed:
        endingDone ||
        (completedEvents.has(ALI_OC_BASRA_SASHA_REUNION_EVENT_ID) &&
          completedEvents.has(ALI_OC_ISTANBUL_PUB_TELL_LADIA_EVENT_ID)),
    },
    {
      id: 'ali-oc-istanbul-bank-radino',
      title:
        'Expand to 30 Ottoman Ports, Visit a Foreign Harbor, and Meet Radino',
      body: 'Ally at least 30 ports under the Ottoman flag, visit a Harbor outside Istanbul to hear of Banker Radino’s transfer, and meet Radino at the Istanbul Bank.',
      completed:
        endingDone ||
        (completedEvents.has(ALI_OC_OTTOMAN_30_PORTS_HARBOR_EVENT_ID) &&
          completedEvents.has(ALI_OC_ISTANBUL_BANK_RADINO_EVENT_ID)),
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
      body: 'If you accepted Howell’s commission, plan at Venice Harbor, visit Duchess Christiana in Lisbon for 10 Gold Ingots and Zipangu coordinates, and depart via Lisbon Harbor.',
      completed:
        endingDone ||
        howellRefused ||
        completedEvents.has(ALI_OC_LISBON_HARBOR_DEPARTURE_EVENT_ID) ||
        completedEvents.has(ALI_OC_VENICE_BANK_SETTLEMENT_EVENT_ID),
    },
    {
      id: 'ali-oc-sakai-pietro',
      title: 'Collect Pietro’s Debt at the Sakai Pub in Zipangu',
      body: 'Sail to the Far East and locate Pietro Conti at the Sakai Pub to recover Howell’s loan.',
      completed:
        endingDone ||
        howellRefused ||
        completedEvents.has(ALI_OC_SAKAI_PUB_PIETRO_REPAY_EVENT_ID) ||
        completedEvents.has(ALI_OC_VENICE_BANK_SETTLEMENT_EVENT_ID),
    },
    {
      id: 'ali-oc-venice-settlement',
      title: 'Settle Howell’s Account at the Venice Bank',
      body: 'Return to the Venice Bank carrying at least 40 Gold Ingots (400,000 carried gold) to clear Pietro’s loan obligation.',
      completed:
        endingDone ||
        howellRefused ||
        completedEvents.has(ALI_OC_VENICE_BANK_SETTLEMENT_EVENT_ID),
    },
    {
      id: 'ali-oc-sultan-reward',
      title: 'Receive Sultan Suleiman’s Reward at the Istanbul Palace',
      body: 'Return to Sultan Suleiman at the Istanbul Royal Palace to receive 100 Gold Ingots (1,000,000 gold) and 1,000 Trade Fame (50 ports are not required).',
      completed:
        endingDone ||
        completedEvents.has(ALI_OC_ISTANBUL_PALACE_SULTAN_REWARD_EVENT_ID),
    },
    {
      id: 'ali-oc-basra-rustem',
      title: 'Reach 40,000 Trade Fame, Witness War Hardships, and Meet Rustem',
      body: 'Achieve at least 40,000 Trade Fame, visit a Harbor outside Istanbul, then a Pub in an Ottoman-controlled port outside Istanbul and Basra, and meet Sapha and Rustem at the Basra Pub.',
      completed:
        endingDone || completedEvents.has(ALI_OC_BASRA_PUB_RUSTEM_EVENT_ID),
    },
    {
      id: 'ali-oc-howell-house',
      title: 'Introduce Family in Istanbul and Pass Howell’s Mansion Test',
      body: 'Introduce Sapha and Rustem at the Istanbul Pub, receive Collector Howell’s mansion quote at the Venice Bank (current ingots + 500, capped at 10,000), and return with the quoted wealth to claim the deed free of charge.',
      completed:
        endingDone ||
        completedEvents.has(ALI_OC_VENICE_HOWELL_TEST_SETTLEMENT_EVENT_ID),
    },
    {
      id: 'ali-oc-istanbul-vizier',
      title: 'Celebrate Your Family Home and Proposal at the Istanbul Pub',
      body: 'Return to Ladia at the Istanbul Pub after securing the Bosphorus mansion deed to propose marriage and celebrate your family’s new home.',
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
