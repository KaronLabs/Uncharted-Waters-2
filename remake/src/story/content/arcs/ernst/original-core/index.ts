import { characterId, type StoryArc } from '../../../../core/types';
import { ERNST_ORIGINAL_CORE_ARC_ID, ernstOriginalCoreEvents } from './events';

export { ernstOriginalCoreDialogue } from './dialogue';
export * from './events';

export const ernstOriginalCoreArc: StoryArc = {
  id: ERNST_ORIGINAL_CORE_ARC_ID,
  protagonist: characterId('ernst'),
  title: 'Ernst: Mercator Contract & The World Atlas',
  eventIds: ernstOriginalCoreEvents.map(({ id }) => id),
};

export const ernstOriginalCore = {
  arc: ernstOriginalCoreArc,
  events: ernstOriginalCoreEvents,
};

export default ernstOriginalCore;
