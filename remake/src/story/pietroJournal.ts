import type { State } from '../state/state';
import type { JournalEntry } from './firstVoyageJournal';
import {
  PIETRO_ALEXANDRIA_RELIC_EVENT_ID,
  PIETRO_BASRA_STAFF_EVENT_ID,
  PIETRO_CAYENNE_FLEET_EVENT_ID,
  PIETRO_ENDING_EVENT_ID,
  PIETRO_GENOA_DEPARTURE_EVENT_ID,
  PIETRO_LISBON_PATRONAGE_EVENT_ID,
  PIETRO_MASSAWA_HANDOFF_EVENT_ID,
} from './content/arcs/pietro/adventure';
import {
  PIETRO_OC_ALEXANDRIA_MAP_EVENT_ID,
  PIETRO_OC_BASRA_STAFF_EVENT_ID,
  PIETRO_OC_EL_DORADO_EVENT_ID,
  PIETRO_OC_ENDING_EVENT_ID,
  PIETRO_OC_FABRIS_DEBT_EVENT_ID,
  PIETRO_OC_GENOA_DEPARTURE_EVENT_ID,
  PIETRO_OC_GOLD_MEDALLION_EXCAVATION_EVENT_ID,
  PIETRO_OC_GOLD_MEDALLION_REPORT_EVENT_ID,
  PIETRO_OC_LISBON_PATRONAGE_EVENT_ID,
  PIETRO_OC_LONDON_HOWELL_EVENT_ID,
  PIETRO_OC_MASSAWA_JOAO_EVENT_ID,
  PIETRO_OC_VENICE_STAFF_MAP_EVENT_ID,
} from './content/arcs/pietro/original-core';

const getPietroOriginalCoreJournal = (state: State): JournalEntry[] => {
  const completedEvents = new Set(state.storyEvents ?? []);
  const endingDone = completedEvents.has(PIETRO_OC_ENDING_EVENT_ID);

  return [
    {
      id: 'pietro-oc-genoa-departure',
      title: 'Embark with Camillo from Genoa Harbor',
      body: 'Meet Camillo Stefano at the Genoa Harbor to board the Sanuto and sail for Lisbon.',
      completed:
        endingDone || completedEvents.has(PIETRO_OC_GENOA_DEPARTURE_EVENT_ID),
    },
    {
      id: 'pietro-oc-lisbon-patronage',
      title: 'Sign Duchess Christiana’s Patronage Contract in Lisbon',
      body: 'Visit the Franco residence in Lisbon to sign Duchess Christiana’s exclusive collector patronage contract.',
      completed:
        endingDone || completedEvents.has(PIETRO_OC_LISBON_PATRONAGE_EVENT_ID),
    },
    {
      id: 'pietro-oc-fabris-debt',
      title: 'Settle Your Father’s Debt with Collector Fabris in Genoa',
      body: 'Visit Collector Fabris at the Genoa residence to suspend the Conti family debt and receive expedition funds.',
      completed:
        endingDone || completedEvents.has(PIETRO_OC_FABRIS_DEBT_EVENT_ID),
    },
    {
      id: 'pietro-oc-alexandria-map',
      title: 'Acquire the Map to the Gold Medallion in Alexandria',
      body: 'Reach at least 250 Adventure Fame and visit the Alexandria Pub to acquire the Map to the Gold Medallion.',
      completed:
        endingDone || completedEvents.has(PIETRO_OC_ALEXANDRIA_MAP_EVENT_ID),
    },
    {
      id: 'pietro-oc-gold-medallion-excavation',
      title: 'Excavate the Gold Medallion at Santo Domingo',
      body: 'Sail across the Atlantic to the Santo Domingo Harbor with the map and excavate the Gold Medallion.',
      completed:
        endingDone ||
        completedEvents.has(PIETRO_OC_GOLD_MEDALLION_EXCAVATION_EVENT_ID),
    },
    {
      id: 'pietro-oc-gold-medallion-report',
      title: 'Report the Gold Medallion to the House of Franco',
      body: 'Return to the Franco residence in Lisbon to report the Gold Medallion and learn of João’s quest in Massawa.',
      completed:
        endingDone ||
        completedEvents.has(PIETRO_OC_GOLD_MEDALLION_REPORT_EVENT_ID),
    },
    {
      id: 'pietro-oc-venice-staff-map',
      title: 'Obtain the Map to the Staff of the Saint in Venice',
      body: 'Visit the Venice Pub to receive the Map to the Staff of the Saint pointing to Basra.',
      completed:
        endingDone || completedEvents.has(PIETRO_OC_VENICE_STAFF_MAP_EVENT_ID),
    },
    {
      id: 'pietro-oc-basra-staff',
      title: 'Excavate the Staff of the Saint at Basra Market',
      body: 'Sail to the Basra Market with the map to excavate the Staff of the Saint.',
      completed:
        endingDone || completedEvents.has(PIETRO_OC_BASRA_STAFF_EVENT_ID),
    },
    {
      id: 'pietro-oc-massawa-joao',
      title: 'Deliver the Staff of the Saint to João in Massawa',
      body: 'Meet João Franco and Brother Enrico at the Massawa Harbor to hand over the Staff of the Saint and learn the way to El Dorado.',
      completed:
        endingDone || completedEvents.has(PIETRO_OC_MASSAWA_JOAO_EVENT_ID),
    },
    {
      id: 'pietro-oc-el-dorado',
      title: 'Unveil El Dorado at Cayenne Harbor',
      body: 'Sight the Mouth of the Amazon (El Dorado) and enter the Cayenne Harbor.',
      completed:
        endingDone || completedEvents.has(PIETRO_OC_EL_DORADO_EVENT_ID),
    },
    {
      id: 'pietro-oc-london-howell',
      title: 'Pass Collector Howell’s Mansion Test in London',
      body: 'Visit Collector Sherlock Howell at the London residence to be awarded his legendary estate.',
      completed:
        endingDone || completedEvents.has(PIETRO_OC_LONDON_HOWELL_EVENT_ID),
    },
    {
      id: 'pietro-oc-lisbon-triumph',
      title: 'Celebrate Your Eternal Legend in Lisbon',
      body: 'Return to the Franco residence in Lisbon to report the discovery of El Dorado and complete your adventure.',
      completed: endingDone,
    },
  ];
};

export const getPietroJournal = (state: State): JournalEntry[] => {
  if (state.scenarioEdition !== 'legacy-remake') {
    return getPietroOriginalCoreJournal(state);
  }
  const completedEvents = new Set(state.storyEvents ?? []);
  const endingDone = completedEvents.has(PIETRO_ENDING_EVENT_ID);
  const gibraltarDiscovered =
    endingDone || state.discoveries.includes('strait-of-gibraltar');
  const basraWon =
    endingDone || state.combatResults['pietro.basra-raider'] === 'victory';
  const amazonDiscovered =
    endingDone || state.discoveries.includes('mouth-of-the-amazon');
  const eldoradoWon =
    endingDone || state.combatResults['pietro.eldorado-fleet'] === 'victory';

  return [
    {
      id: 'pietro-genoa-departure',
      title: 'Embark from Genoa',
      body: 'Meet Camillo at the Genoa harbor to board the Sanuto and answer Duchess Christiana’s summons.',
      completed:
        endingDone || completedEvents.has(PIETRO_GENOA_DEPARTURE_EVENT_ID),
    },
    {
      id: 'pietro-lisbon-patronage',
      title: 'Secure Patronage at the Franco Residence',
      body: 'Visit Duchess Christiana and Butler Marco at the Franco residence in Lisbon.',
      completed:
        endingDone || completedEvents.has(PIETRO_LISBON_PATRONAGE_EVENT_ID),
    },
    {
      id: 'pietro-gibraltar-discovery',
      title: 'Sight the Strait of Gibraltar',
      body: 'Chart the Strait of Gibraltar near 36° N, 5.6° W on your voyage between Lisbon and the Mediterranean.',
      completed: gibraltarDiscovered,
    },
    {
      id: 'pietro-alexandria-relic',
      title: 'Investigate the Alexandria Tavern',
      body: 'Gather clues about your father’s logbook and the Staff of the Saint at the Alexandria pub.',
      completed:
        endingDone || completedEvents.has(PIETRO_ALEXANDRIA_RELIC_EVENT_ID),
    },
    {
      id: 'pietro-basra-staff',
      title: 'Win the Staff of the Saint in Basra',
      body: completedEvents.has(PIETRO_BASRA_STAFF_EVENT_ID)
        ? 'Defeat the treasure hunter boss in a duel at the Basra market.'
        : 'Sail around Africa to the Persian Gulf and visit the Basra market.',
      completed: basraWon,
    },
    {
      id: 'pietro-massawa-handoff',
      title: 'Rendezvous with João in Massawa',
      body: 'Deliver the Staff of the Saint to João Franco at the Massawa harbor and receive the Western Ocean charts.',
      completed:
        endingDone || completedEvents.has(PIETRO_MASSAWA_HANDOFF_EVENT_ID),
    },
    {
      id: 'pietro-amazon-discovery',
      title: 'Sight the Mouth of the Amazon',
      body: 'Cross the Atlantic to South America and chart the Mouth of the Amazon near 0.5° S, 50.0° W.',
      completed: amazonDiscovered,
    },
    {
      id: 'pietro-cayenne-fleet',
      title: 'Break the El Dorado Blockade',
      body: completedEvents.has(PIETRO_CAYENNE_FLEET_EVENT_ID)
        ? 'Defeat the El Dorado guardian fleet from the Cayenne harbor.'
        : 'Visit the Cayenne harbor after sighting the Mouth of the Amazon.',
      completed: eldoradoWon,
    },
    {
      id: 'pietro-lisbon-triumph',
      title: 'Report Your Triumph in Lisbon',
      body: 'Return to the Franco residence in Lisbon to celebrate the discovery of El Dorado and clear your family’s name.',
      completed: endingDone,
    },
  ];
};

export default getPietroJournal;
