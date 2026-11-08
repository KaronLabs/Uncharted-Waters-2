import type { State } from '../state/state';
import type { JournalEntry } from './firstVoyageJournal';
import {
  OTTO_CEUTA_SKIRMISH_EVENT_ID,
  OTTO_ENDING_EVENT_ID,
  OTTO_LONDON_COMMISSION_EVENT_ID,
  OTTO_NANTES_SHOWDOWN_EVENT_ID,
  OTTO_SANTO_DOMINGO_RAID_EVENT_ID,
  OTTO_SEVILLE_INFILTRATION_EVENT_ID,
} from './content/arcs/otto/armada';
import {
  OTTO_OC_BORDEAUX_FINAL_EVENT_ID,
  OTTO_OC_ENDING_EVENT_ID,
  OTTO_OC_MATTHEW_RECRUITED_EVENT_ID,
  OTTO_OC_NANTES_ARMADA_EVENT_ID,
  OTTO_OC_PALACE_COMMISSION_EVENT_ID,
  OTTO_OC_PUB_BRAWL_EVENT_ID,
  OTTO_OC_SANTO_DOMINGO_ARMADA_EVENT_ID,
  OTTO_OC_SEVILLE_HEIST_EVENT_ID,
  OTTO_OC_SEVILLE_INTEL_EVENT_ID,
  OTTO_OC_SHIPYARD_FLAGSHIP_EVENT_ID,
} from './content/arcs/otto/original-core';

const getOttoOriginalCoreJournal = (state: State): JournalEntry[] => {
  const completedEvents = new Set(state.storyEvents ?? []);
  const endingDone = completedEvents.has(OTTO_OC_ENDING_EVENT_ID);
  const matthewDuelWon =
    endingDone ||
    completedEvents.has(OTTO_OC_MATTHEW_RECRUITED_EVENT_ID) ||
    Boolean(state.combatResults['otto.matthew-duel']);
  const sevilleWon =
    endingDone || state.combatResults['otto.seville-pursuit'] === 'victory';
  const nantesWon =
    endingDone || state.combatResults['otto.nantes-armada'] === 'victory';
  const santoDomingoWon =
    endingDone ||
    state.combatResults['otto.santo-domingo-armada'] === 'victory';
  const bordeauxWon =
    endingDone || state.combatResults['otto.bordeaux-ezequiel'] === 'victory';

  return [
    {
      id: 'otto-oc-palace-commission',
      title: 'Receive King Henry VIII’s Secret Commission',
      body: 'Visit the London Royal Palace to receive King Henry VIII’s secret order, 300 gold pieces, and the English Letter of Marque.',
      completed:
        endingDone || completedEvents.has(OTTO_OC_PALACE_COMMISSION_EVENT_ID),
    },
    {
      id: 'otto-oc-shipyard-flagship',
      title: 'Claim Your Flagship at the London Shipyard',
      body: 'Head to the London Shipyard with Gilbert to take command of the Crown’s Caravel Latina flagship.',
      completed:
        endingDone || completedEvents.has(OTTO_OC_SHIPYARD_FLAGSHIP_EVENT_ID),
    },
    {
      id: 'otto-oc-pub-brawl',
      title: 'Subdue Matthew Roy at the London Pub',
      body: completedEvents.has(OTTO_OC_PUB_BRAWL_EVENT_ID)
        ? 'Defeat Matthew Roy in a duel at the London Pub.'
        : 'Visit the London Pub to recruit sailors and confront Matthew Roy.',
      completed: matthewDuelWon,
    },
    {
      id: 'otto-oc-matthew-recruited',
      title: 'Recruit Matthew Roy at the London Harbor',
      body: 'Board your flagship at the London Harbor, catch Matthew Roy stowing away, and appoint him First Mate.',
      completed:
        endingDone || completedEvents.has(OTTO_OC_MATTHEW_RECRUITED_EVENT_ID),
    },
    {
      id: 'otto-oc-seville-intel',
      title: 'Gather Intel at the Seville Pub',
      body: 'Sail to Seville and visit the Seville Pub to learn where Spain’s new warship is moored.',
      completed:
        endingDone || completedEvents.has(OTTO_OC_SEVILLE_INTEL_EVENT_ID),
    },
    {
      id: 'otto-oc-seville-heist',
      title: 'Capture the Spanish Galleon at Seville Harbor',
      body: completedEvents.has(OTTO_OC_SEVILLE_HEIST_EVENT_ID)
        ? 'Break through the Seville Guard Squadron pursuit outside Seville Harbor.'
        : 'Enter the Seville Harbor to seize Spain’s new Galleon and break through the guard squadron.',
      completed: sevilleWon,
    },
    {
      id: 'otto-oc-nantes-armada',
      title: 'Engage the Armada Vanguard at Nantes Harbor',
      body: completedEvents.has(OTTO_OC_NANTES_ARMADA_EVENT_ID)
        ? 'Defeat the Spanish Armada First Squadron off Nantes Harbor.'
        : 'Sail to the Nantes Harbor to intercept the Spanish Invincible Armada’s vanguard.',
      completed: nantesWon,
    },
    {
      id: 'otto-oc-santo-domingo-armada',
      title: 'Crush the New World Armada at Santo Domingo',
      body: completedEvents.has(OTTO_OC_SANTO_DOMINGO_ARMADA_EVENT_ID)
        ? 'Defeat the Spanish New World Armada at Santo Domingo Harbor.'
        : 'Cross the Atlantic to the Santo Domingo Harbor and strike the Spanish New World Armada.',
      completed: santoDomingoWon,
    },
    {
      id: 'otto-oc-bordeaux-final',
      title: 'Defeat Commander Ezequiel at Bordeaux Harbor',
      body: completedEvents.has(OTTO_OC_BORDEAUX_FINAL_EVENT_ID)
        ? 'Defeat Commander Ezequiel’s Invincible Armada flagship squadron at Bordeaux Harbor.'
        : 'Return to Europe and confront Commander Ezequiel at the Bordeaux Harbor for the final battle.',
      completed: bordeauxWon,
    },
    {
      id: 'otto-oc-london-triumph',
      title: 'Present Commander Ezequiel at London Royal Palace',
      body: 'Return to the London Royal Palace to report victory over the Invincible Armada and plead for Commander Ezequiel’s life.',
      completed: endingDone,
    },
  ];
};

export const getOttoJournal = (state: State): JournalEntry[] => {
  if (state.scenarioEdition !== 'legacy-remake') {
    return getOttoOriginalCoreJournal(state);
  }
  const completedEvents = new Set(state.storyEvents ?? []);
  const endingDone = completedEvents.has(OTTO_ENDING_EVENT_ID);
  const ceutaWon =
    endingDone || state.combatResults['otto.spanish-vanguard'] === 'victory';
  const caribbeanWon =
    endingDone || state.combatResults['otto.caribbean-convoy'] === 'victory';
  const armadaWon =
    endingDone || state.combatResults['otto.invincible-armada'] === 'victory';

  return [
    {
      id: 'otto-london-commission',
      title: 'Receive the Royal Commission in London',
      body: 'Visit the London Royal Palace with Matthew Roy to receive King Henry VIII’s Letter of Marque and the flagship HMS Eagle.',
      completed:
        endingDone || completedEvents.has(OTTO_LONDON_COMMISSION_EVENT_ID),
    },
    {
      id: 'otto-seville-infiltration',
      title: 'Seize the Galleon in Seville',
      body: 'Slip into the Seville shipyard and capture a brand-new Spanish Galleon right off the slipway.',
      completed:
        endingDone || completedEvents.has(OTTO_SEVILLE_INFILTRATION_EVENT_ID),
    },
    {
      id: 'otto-ceuta-skirmish',
      title: 'Break the Gibraltar Squadron at Ceuta',
      body: completedEvents.has(OTTO_CEUTA_SKIRMISH_EVENT_ID)
        ? 'Defeat Commander Ezequiel’s Spanish Gibraltar vanguard, or sortie again from the Ceuta harbor.'
        : 'Sail to the Ceuta harbor and test your captured galleon against the Spanish Gibraltar squadron.',
      completed: ceutaWon,
    },
    {
      id: 'otto-santo-domingo-raid',
      title: 'Intercept the Treasure Convoy at Santo Domingo',
      body: completedEvents.has(OTTO_SANTO_DOMINGO_RAID_EVENT_ID)
        ? 'Defeat the Spanish Caribbean treasure convoy, or sortie again from the Santo Domingo harbor.'
        : 'Cross the Atlantic to the Santo Domingo harbor in the Caribbean and raid Spain’s silver convoy.',
      completed: caribbeanWon,
    },
    {
      id: 'otto-nantes-showdown',
      title: 'Shatter the Invincible Armada at Nantes',
      body: completedEvents.has(OTTO_NANTES_SHOWDOWN_EVENT_ID)
        ? 'Defeat Commander Ezequiel’s Invincible Armada in the Bay of Biscay, or sortie again from the Nantes harbor.'
        : 'Return to Europe and confront the full might of the Spanish Invincible Armada at the Nantes harbor.',
      completed: armadaWon,
    },
    {
      id: 'otto-london-triumph',
      title: 'Return in Triumph to London Palace',
      body: 'Report the defeat of the Invincible Armada at the London Royal Palace.',
      completed: endingDone,
    },
  ];
};

export default getOttoJournal;
