import { koreanCatalog } from './catalogs';
import { setLocale, t } from './index';
import { ui } from './ui';
import { terms } from './terms';
import combat from './combat';
import lisbon from './dialogue/joaoLisbon';
import firstVoyage from './dialogue/joaoFirstVoyage';
import conflict from './dialogue/joaoConflictAndGrowth';
import massawa from './dialogue/joaoMassawa';
import finale from './dialogue/joaoFinale';

const sources = Array.from(
  new Set(
    [ui, terms, combat, lisbon, firstVoyage, conflict, massawa, finale].flatMap(
      (catalog) => Object.keys(catalog),
    ),
  ),
);

const tokens = (text: string) =>
  (text.match(/\{[^}]+\}|\$(?:firstName|lastName)/g) ?? []).sort();

describe('João release Korean coverage', () => {
  beforeEach(() => setLocale('ko-KR'));

  test('every João and shared source key has an explicit Korean translation', () => {
    const missing = sources.filter(
      (source) =>
        !Object.prototype.hasOwnProperty.call(koreanCatalog, source) ||
        !koreanCatalog[source].trim(),
    );
    expect({ count: missing.length, examples: missing.slice(0, 25) }).toEqual({
      count: 0,
      examples: [],
    });
  });

  test('all translated strings preserve the exact interpolation tokens', () => {
    const mismatches = sources.filter(
      (source) =>
        JSON.stringify(tokens(koreanCatalog[source] ?? '')) !==
        JSON.stringify(tokens(source)),
    );
    expect(mismatches).toEqual([]);
  });

  test('uses the original Korean protagonist name and interpolates values', () => {
    expect(t('João Franco')).toBe('조안 페레로');
    expect(t('Day {day}', { day: 7 })).toContain('7');
    expect(t('Day {day}', { day: 7 })).not.toContain('{day}');
  });
});
