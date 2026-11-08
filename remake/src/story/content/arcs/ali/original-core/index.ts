import { characterId, type StoryArc } from '../../../../core/types';
import { ALI_ORIGINAL_CORE_ARC_ID, aliOriginalCoreEvents } from './events';

export { aliOriginalCoreDialogue } from './dialogue';
export * from './events';

export const aliOriginalCoreArc: StoryArc = {
  id: ALI_ORIGINAL_CORE_ARC_ID,
  protagonist: characterId('ali'),
  title: 'Ali: Istanbul Loans, Sister Sasha & Grand Vizier',
  eventIds: aliOriginalCoreEvents.map(({ id }) => id),
};

export const aliOriginalCore = {
  arc: aliOriginalCoreArc,
  events: aliOriginalCoreEvents,
};

export default aliOriginalCore;
