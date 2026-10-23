import joaoFirstVoyage from './dialogue/joaoFirstVoyage';
import joaoConflictAndGrowth from './dialogue/joaoConflictAndGrowth';
import joaoMassawa from './dialogue/joaoMassawa';
import joaoFinale from './dialogue/joaoFinale';
import catalina from './dialogue/catalina';
import otto from './dialogue/otto';
import ernst from './dialogue/ernst';
import pietro from './dialogue/pietro';
import ali from './dialogue/ali';
import combatCatalog from './combat';
import joaoLisbon from './dialogue/joaoLisbon';
import { terms } from './terms';
import { ui } from './ui';
import koreanUi from './koreanUi';

export const mergeCatalogs = (
  ...catalogs: Record<string, string>[]
): Record<string, string> => {
  const merged: Record<string, string> = Object.create(null);
  catalogs.forEach((catalog) => {
    Object.entries(catalog).forEach(([source, translated]) => {
      if (source in merged && merged[source] !== translated) {
        throw new Error(`Conflicting translation for "${source}"`);
      }
      merged[source] = translated;
    });
  });
  return merged;
};

export const dialogueCatalog = mergeCatalogs(
  joaoLisbon,
  joaoFirstVoyage,
  joaoConflictAndGrowth,
  joaoMassawa,
  joaoFinale,
  catalina,
  otto,
  ernst,
  pietro,
  ali,
);
export const chineseCatalog = mergeCatalogs(
  ui,
  terms,
  dialogueCatalog,
  combatCatalog,
);

// Korean catalog: UI strings first; dialogue translation arrives in the
// full ko-KR localization phase. Untranslated strings fall through to the
// English source via t().
const mergedKorean = mergeCatalogs(koreanUi);
const koreanCatalog = mergedKorean;
export { koreanCatalog };

export default chineseCatalog;
