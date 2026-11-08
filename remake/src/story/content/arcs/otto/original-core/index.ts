import { characterId, type StoryArc } from '../../../../core/types';
import { OTTO_ORIGINAL_CORE_ARC_ID, ottoOriginalCoreEvents } from './events';

export { ottoOriginalCoreDialogue } from './dialogue';
export * from './events';

export const ottoOriginalCoreArc: StoryArc = {
  id: OTTO_ORIGINAL_CORE_ARC_ID,
  protagonist: characterId('otto'),
  title: 'Otto: Secret Commission & The Invincible Armada',
  eventIds: ottoOriginalCoreEvents.map(({ id }) => id),
};

export const ottoOriginalCore = {
  arc: ottoOriginalCoreArc,
  events: ottoOriginalCoreEvents,
};

export default ottoOriginalCore;
