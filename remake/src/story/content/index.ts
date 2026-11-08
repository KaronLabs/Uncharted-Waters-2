import type { StoryContentSource } from '../core/types';
import { joaoLisbonOpening } from './arcs/joao/lisbon-opening';
import { joaoFirstVoyage } from './arcs/joao/first-voyage';
import { joaoConflictAndGrowth } from './arcs/joao/conflict-and-growth';
import { joaoMassawa } from './arcs/joao/massawa';
import { joaoFinale } from './arcs/joao/finale';
import { katarinaVengeance } from './arcs/katarina/vengeance';
import { ottoArmada } from './arcs/otto/armada';
import { ottoOriginalCore } from './arcs/otto/original-core';
import { ernstWorldmap } from './arcs/ernst/worldmap';
import { ernstOriginalCore } from './arcs/ernst/original-core';
import { pietroAdventure } from './arcs/pietro/adventure';
import { pietroOriginalCore } from './arcs/pietro/original-core';
import { aliMerchant } from './arcs/ali/merchant';
import { aliOriginalCore } from './arcs/ali/original-core';
import { storyCharacters } from './characters';
import { storyRelationships } from './relationships';

export { joaoLisbonOpening } from './arcs/joao/lisbon-opening';
export { joaoFirstVoyage } from './arcs/joao/first-voyage';
export { joaoConflictAndGrowth } from './arcs/joao/conflict-and-growth';
export { joaoMassawa } from './arcs/joao/massawa';
export { joaoFinale } from './arcs/joao/finale';
export { katarinaVengeance } from './arcs/katarina/vengeance';
export { ottoArmada } from './arcs/otto/armada';
export { ottoOriginalCore } from './arcs/otto/original-core';
export { ernstWorldmap } from './arcs/ernst/worldmap';
export { ernstOriginalCore } from './arcs/ernst/original-core';
export { pietroAdventure } from './arcs/pietro/adventure';
export { pietroOriginalCore } from './arcs/pietro/original-core';
export { aliMerchant } from './arcs/ali/merchant';
export { aliOriginalCore } from './arcs/ali/original-core';
export { storyCharacters } from './characters';
export { storyRelationships } from './relationships';
export { storyValidationCatalogs } from './catalogs';

export const storyContentSource: StoryContentSource = {
  characters: storyCharacters,
  relationships: storyRelationships,
  arcs: [
    joaoLisbonOpening.arc,
    joaoFirstVoyage.arc,
    joaoConflictAndGrowth.arc,
    joaoMassawa.arc,
    joaoFinale.arc,
    katarinaVengeance.arc,
    ottoArmada.arc,
    ottoOriginalCore.arc,
    ernstWorldmap.arc,
    ernstOriginalCore.arc,
    pietroAdventure.arc,
    pietroOriginalCore.arc,
    aliMerchant.arc,
    aliOriginalCore.arc,
  ],
  events: [
    ...joaoLisbonOpening.events,
    ...joaoFirstVoyage.events,
    ...joaoConflictAndGrowth.events,
    ...joaoMassawa.events,
    ...joaoFinale.events,
    ...katarinaVengeance.events,
    ...ottoArmada.events,
    ...ottoOriginalCore.events,
    ...ernstWorldmap.events,
    ...ernstOriginalCore.events,
    ...pietroAdventure.events,
    ...pietroOriginalCore.events,
    ...aliMerchant.events,
    ...aliOriginalCore.events,
  ],
};

export default storyContentSource;
