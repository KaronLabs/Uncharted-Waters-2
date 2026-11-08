import { characterId, type StoryArc } from '../../../../core/types';
import {
  PIETRO_ORIGINAL_CORE_ARC_ID,
  pietroOriginalCoreEvents,
} from './events';

export { pietroOriginalCoreDialogue } from './dialogue';
export * from './events';

export const pietroOriginalCoreArc: StoryArc = {
  id: PIETRO_ORIGINAL_CORE_ARC_ID,
  protagonist: characterId('pietro'),
  title: 'Pietro: Franco Patronage & El Dorado',
  eventIds: pietroOriginalCoreEvents.map(({ id }) => id),
};

export const pietroOriginalCore = {
  arc: pietroOriginalCoreArc,
  events: pietroOriginalCoreEvents,
};

export default pietroOriginalCore;
