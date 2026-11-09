import type { State } from '../state/state';
import type { JournalEntry } from './firstVoyageJournal';
import {
  ERNST_AMSTERDAM_COMMISSION_EVENT_ID,
  ERNST_CAPE_SURVEY_EVENT_ID,
  ERNST_ENDING_EVENT_ID,
  ERNST_LISBON_INTERPRETER_EVENT_ID,
  ERNST_MALACCA_STRAITS_EVENT_ID,
  ERNST_NAGASAKI_HOMELAND_EVENT_ID,
} from './content/arcs/ernst/worldmap';
import {
  ERNST_OC_CHANGAN_HOME_REUNION_EVENT_ID,
  ERNST_OC_ENDING_EVENT_ID,
  ERNST_OC_HARBOR_DEPARTURE_EVENT_ID,
  ERNST_OC_LAURA_JOINS_EVENT_ID,
  ERNST_OC_MERCATOR_CONTRACT_EVENT_ID,
  ERNST_OC_NAGASAKI_REUNION_EVENT_ID,
  ERNST_OC_ZEITON_UNLOCK_EVENT_ID,
} from './content/arcs/ernst/original-core';

const getErnstOriginalCoreJournal = (state: State): JournalEntry[] => {
  const completedEvents = new Set(state.storyEvents ?? []);
  const endingDone = completedEvents.has(ERNST_OC_ENDING_EVENT_ID);

  return [
    {
      id: 'ernst-oc-harbor-departure',
      title: 'Meet Hans at the Amsterdam Harbor',
      body: 'Visit the Amsterdam Harbor to meet Hans, receive your expedition ship Sleipnir, and hear Master Mercator’s summons.',
      completed:
        endingDone || completedEvents.has(ERNST_OC_HARBOR_DEPARTURE_EVENT_ID),
    },
    {
      id: 'ernst-oc-mercator-contract',
      title: 'Sign Master Mercator’s Exclusive Contract',
      body: 'Visit Master Mercator at the Amsterdam residence to sign his exclusive World Atlas cartography contract.',
      completed:
        endingDone || completedEvents.has(ERNST_OC_MERCATOR_CONTRACT_EVENT_ID),
    },
    {
      id: 'ernst-oc-laura-joins',
      title: 'Welcome Interpreter Laura at Amsterdam Harbor',
      body: 'Return to the Amsterdam Harbor to welcome the polyglot interpreter Laura aboard your expedition.',
      completed:
        endingDone || completedEvents.has(ERNST_OC_LAURA_JOINS_EVENT_ID),
    },
    {
      id: 'ernst-oc-zeiton-unlock',
      title: 'Open the Route to Zipangu from Zeiton',
      body: 'Chart the seas to build at least 800 Adventure Fame, hear Hans’s dream of Zipangu, and visit the Zeiton Harbor in China to unlock the route to Sakai and Nagasaki.',
      completed:
        endingDone || completedEvents.has(ERNST_OC_ZEITON_UNLOCK_EVENT_ID),
    },
    {
      id: 'ernst-oc-nagasaki-reunion',
      title: 'Reach Zipangu in Nagasaki and Recall the Yellow Sea',
      body: 'Sail northeast to the Nagasaki Harbor in Zipangu to recall Laura’s childhood memory of the Yellow Sea and unlock the route to Changan.',
      completed:
        endingDone || completedEvents.has(ERNST_OC_NAGASAKI_REUNION_EVENT_ID),
    },
    {
      id: 'ernst-oc-changan-search',
      title: 'Follow the Huang He Clue to Laura’s Home in Changan',
      body: 'Sail up the Huang He to the Changan Harbor and visit the Changan residence so Laura can reunite with her family.',
      completed:
        endingDone ||
        completedEvents.has(ERNST_OC_CHANGAN_HOME_REUNION_EVENT_ID),
    },
    {
      id: 'ernst-oc-amsterdam-atlas',
      title: 'Complete the World Atlas with Master Mercator',
      body: 'Report your sea charts in Amsterdam to reach at least 800 Adventure Fame and present the completed World Atlas at Mercator’s residence.',
      completed: endingDone,
    },
  ];
};

export const getErnstJournal = (state: State): JournalEntry[] => {
  if (state.scenarioEdition !== 'legacy-remake') {
    return getErnstOriginalCoreJournal(state);
  }
  const completedEvents = new Set(state.storyEvents ?? []);
  const endingDone = completedEvents.has(ERNST_ENDING_EVENT_ID);
  const capeDiscovered =
    endingDone || state.discoveries.includes('cape-of-good-hope');
  const malaccaDiscovered =
    endingDone || state.discoveries.includes('strait-of-malacca');
  const malaccaWon =
    endingDone || state.combatResults['ernst.eastern-corsairs'] === 'victory';
  const amazonDiscovered =
    endingDone || state.discoveries.includes('mouth-of-the-amazon');

  return [
    {
      id: 'ernst-amsterdam-commission',
      title: 'Accept Mercator’s Cartography Commission',
      body: 'Visit Master Mercator at the Amsterdam residence to receive your survey funds, astrolabe, and the Golden Hind.',
      completed:
        endingDone || completedEvents.has(ERNST_AMSTERDAM_COMMISSION_EVENT_ID),
    },
    {
      id: 'ernst-lisbon-interpreter',
      title: 'Recruit an Interpreter in Lisbon',
      body: 'Stop at the Lisbon harbor to welcome the polyglot interpreter Laura aboard the Golden Hind.',
      completed:
        endingDone || completedEvents.has(ERNST_LISBON_INTERPRETER_EVENT_ID),
    },
    {
      id: 'ernst-cape-discovery',
      title: 'Chart the Cape of Good Hope',
      body: 'Sail south around Africa and sight the Cape of Good Hope near 34.4° S, 18.5° E.',
      completed: capeDiscovered,
    },
    {
      id: 'ernst-cape-survey',
      title: 'Compile Southern Sheets at Massawa Guild',
      body: 'Deliver your southern ocean bearings to the cartographers at the Massawa guild on the Red Sea.',
      completed: endingDone || completedEvents.has(ERNST_CAPE_SURVEY_EVENT_ID),
    },
    {
      id: 'ernst-malacca-discovery',
      title: 'Sight the Strait of Malacca',
      body: 'Cross the Indian Ocean and chart the Strait of Malacca near 2.5° N, 101.5° E.',
      completed: malaccaDiscovered,
    },
    {
      id: 'ernst-malacca-straits',
      title: 'Clear the Corsair Blockade at Malacca',
      body: completedEvents.has(ERNST_MALACCA_STRAITS_EVENT_ID)
        ? 'Defeat the Eastern Sea corsairs outside Malacca, or sortie again from the Malacca harbor.'
        : 'Put into the Malacca harbor and break through the Eastern Sea corsair blockade.',
      completed: malaccaWon,
    },
    {
      id: 'ernst-nagasaki-homeland',
      title: 'Uncover Laura’s Homeland in Nagasaki',
      body: 'Sail northeast to Japan and visit the Nagasaki residence with Laura and Hans.',
      completed:
        endingDone || completedEvents.has(ERNST_NAGASAKI_HOMELAND_EVENT_ID),
    },
    {
      id: 'ernst-amazon-discovery',
      title: 'Survey the Mouth of the Amazon',
      body: 'Chart the Mouth of the Amazon near 0.5° S, 50.0° W in the New World to complete your global sightings.',
      completed: amazonDiscovered,
    },
    {
      id: 'ernst-amsterdam-atlas',
      title: 'Present the World Atlas in Amsterdam',
      body: 'Return to Master Mercator at the Amsterdam residence to complete the world atlas.',
      completed: endingDone,
    },
  ];
};

export default getErnstJournal;
