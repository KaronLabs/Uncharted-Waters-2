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
  ALI_OC_BASRA_SASHA_REUNION_EVENT_ID,
  ALI_OC_CATALINA_AMBUSH_EVENT_ID,
  ALI_OC_ENDING_EVENT_ID,
  ALI_OC_HARBOR_DEPARTURE_EVENT_ID,
  ALI_OC_HARBOR_REPAY_EVENT_ID,
  ALI_OC_LISBON_JOAO_EVENT_ID,
} from './content/arcs/ali/original-core';

const getAliOriginalCoreJournal = (state: State): JournalEntry[] => {
  const completedEvents = new Set(state.storyEvents ?? []);
  const endingDone = completedEvents.has(ALI_OC_ENDING_EVENT_ID);
  const catalinaWon =
    endingDone || state.combatResults['ali.catalina-ambush'] === 'victory';

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
      id: 'ali-oc-lisbon-joao',
      title: 'Consult João and Lucia at the Lisbon Pub',
      body: 'Sail to the Lisbon Pub to learn from Lucia and João Franco that Sasha sailed toward the Red Sea and Basra.',
      completed: endingDone || completedEvents.has(ALI_OC_LISBON_JOAO_EVENT_ID),
    },
    {
      id: 'ali-oc-massawa-catalina',
      title: 'Break Through Katarina’s Pirate Ambush at Massawa',
      body: completedEvents.has(ALI_OC_CATALINA_AMBUSH_EVENT_ID)
        ? 'Defeat Katarina Erantzo’s pirate ambush outside Massawa Harbor.'
        : 'Sail to the Massawa Harbor in the Red Sea and defend your merchant convoy against Katarina’s pirate ambush.',
      completed: catalinaWon,
    },
    {
      id: 'ali-oc-basra-sasha',
      title: 'Reunite with Sister Sasha at the Basra Pub',
      body: 'Enter the Persian Gulf and visit the Basra Pub to reunite with your sister Sasha.',
      completed:
        endingDone || completedEvents.has(ALI_OC_BASRA_SASHA_REUNION_EVENT_ID),
    },
    {
      id: 'ali-oc-istanbul-vizier',
      title: 'Rise as Grand Commercial Vizier in Istanbul',
      body: 'Amass at least 50 gold ingots of wealth and 50 Ottoman allied ports, then visit Sultan Suleiman at the Istanbul Royal Palace.',
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
