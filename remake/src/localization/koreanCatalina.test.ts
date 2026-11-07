import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import { encounterCatalog } from '../combat/encounters';
import CatalinaEnding from '../interface/CatalinaEnding';
import { PROTAGONIST_PROFILES } from '../state/protagonists';
import type { State } from '../state/state';
import { getCatalinaJournal } from '../story/catalinaJournal';
import {
  katarinaVengeanceArc,
  katarinaVengeanceDialogue,
  katarinaVengeanceEvents,
  KATARINA_AMAZON_RECKONING_EVENT_ID,
  KATARINA_CAYENNE_RESCUE_EVENT_ID,
  KATARINA_CEUTA_CLASH_EVENT_ID,
  KATARINA_ENDING_EVENT_ID,
  KATARINA_MASSAWA_TRUTH_EVENT_ID,
  KATARINA_SEVILLE_MUTINY_EVENT_ID,
  KATARINA_SPANISH_PURSUIT_EVENT_ID,
} from '../story/content/arcs/katarina/vengeance';
import type { StoryEvent, StoryStep } from '../story/core/types';
import { koreanCatalog } from './catalogs';
import catalinaDialogue from './dialogue/catalina';
import { setLocale, t } from './index';
import koreanCatalina from './koreanCatalina';
import koreanCombat from './koreanCombat';
import koreanJoao from './koreanJoao';
import { koreanTerms } from './koreanTerms';
import koreanUi from './koreanUi';

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

const hangul = /[\uac00-\ud7a3]/;
const tokens = (text: string): string[] =>
  (text.match(/\$firstName|\$lastName|\{[a-zA-Z0-9_]+\}/g) ?? []).sort();

const collectStepStrings = (steps: readonly StoryStep[], out: Set<string>) => {
  steps.forEach((step) => {
    if (step.type === 'dialogue') {
      out.add(step.body);
    } else if (step.type === 'choice') {
      out.add(step.prompt);
      step.options.forEach((option) => {
        out.add(option.label);
        collectStepStrings(option.steps, out);
      });
    }
  });
};

const collectEventStrings = (events: readonly StoryEvent[]): string[] => {
  const out = new Set<string>();
  events.forEach((event) => collectStepStrings(event.steps, out));
  return [...out];
};

export interface LocalizationAuditResult {
  missingKeys: string[];
  untranslatedKeys: string[];
  tokenMismatches: string[];
  conflictingKeys: string[];
}

export const auditCatalinaLocalization = (
  requiredKeys: readonly string[],
  catalog: Readonly<Record<string, string>>,
  moduleList: ReadonlyArray<Readonly<Record<string, string>>>,
): LocalizationAuditResult => {
  const missingKeys: string[] = [];
  const untranslatedKeys: string[] = [];
  const tokenMismatches: string[] = [];
  const conflictingKeys: string[] = [];

  requiredKeys.forEach((key) => {
    const value = catalog[key];
    if (value === undefined) {
      missingKeys.push(key);
      return;
    }
    if (value === key || !hangul.test(value)) {
      untranslatedKeys.push(key);
    }
    const expectedTokens = tokens(key);
    const actualTokens = tokens(value);
    if (JSON.stringify(expectedTokens) !== JSON.stringify(actualTokens)) {
      tokenMismatches.push(key);
    }
  });

  const seen = new Map<string, string>();
  moduleList.forEach((mod) => {
    Object.entries(mod).forEach(([key, value]) => {
      const prev = seen.get(key);
      if (prev !== undefined && prev !== value) {
        conflictingKeys.push(key);
      } else {
        seen.set(key, value);
      }
    });
  });

  return {
    missingKeys,
    untranslatedKeys,
    tokenMismatches,
    conflictingKeys,
  };
};

describe('Korean Catalina story localization (N7 / F8)', () => {
  afterEach(() => {
    setLocale('ko-KR');
  });

  test('translates every Catalina story event dialogue, choice prompt, option label, and arc title', () => {
    setLocale('ko-KR');
    const strings = [
      ...collectEventStrings(katarinaVengeanceEvents),
      katarinaVengeanceArc.title,
      ...Object.keys(catalinaDialogue),
      ...Object.values(katarinaVengeanceDialogue).flatMap((group) =>
        Object.values(group),
      ),
    ];
    const uniqueStrings = [...new Set(strings)];
    expect(uniqueStrings.length).toBeGreaterThanOrEqual(35);

    const audit = auditCatalinaLocalization(uniqueStrings, koreanCatalog, [
      koreanTerms,
      koreanUi,
      koreanCombat,
      koreanJoao,
      koreanCatalina,
    ]);
    expect(audit).toEqual({
      missingKeys: [],
      untranslatedKeys: [],
      tokenMismatches: [],
      conflictingKeys: [],
    });

    uniqueStrings.forEach((source) => {
      const translated = t(source);
      expect(translated).not.toBe(source);
      expect(translated).toMatch(hangul);
    });
  });

  test('translates every Catalina journal entry across all progression and retry states', () => {
    setLocale('ko-KR');
    const states = [
      { storyEvents: [] },
      { storyEvents: [KATARINA_SEVILLE_MUTINY_EVENT_ID] },
      {
        storyEvents: [
          KATARINA_SEVILLE_MUTINY_EVENT_ID,
          KATARINA_SPANISH_PURSUIT_EVENT_ID,
        ],
        combatResults: { 'katarina.seville-patrol': 'defeat' as const },
      },
      {
        storyEvents: [
          KATARINA_SEVILLE_MUTINY_EVENT_ID,
          KATARINA_SPANISH_PURSUIT_EVENT_ID,
        ],
        combatResults: { 'katarina.seville-patrol': 'victory' as const },
      },
      {
        storyEvents: [
          KATARINA_SEVILLE_MUTINY_EVENT_ID,
          KATARINA_SPANISH_PURSUIT_EVENT_ID,
          KATARINA_CEUTA_CLASH_EVENT_ID,
        ],
        combatResults: {
          'katarina.seville-patrol': 'victory' as const,
          'katarina.joao-fleet': 'retreat' as const,
        },
      },
      {
        storyEvents: [
          KATARINA_SEVILLE_MUTINY_EVENT_ID,
          KATARINA_SPANISH_PURSUIT_EVENT_ID,
          KATARINA_CEUTA_CLASH_EVENT_ID,
        ],
        combatResults: {
          'katarina.seville-patrol': 'victory' as const,
          'katarina.joao-fleet': 'victory' as const,
        },
      },
      {
        storyEvents: [
          KATARINA_SEVILLE_MUTINY_EVENT_ID,
          KATARINA_SPANISH_PURSUIT_EVENT_ID,
          KATARINA_CEUTA_CLASH_EVENT_ID,
          KATARINA_MASSAWA_TRUTH_EVENT_ID,
        ],
        combatResults: {
          'katarina.seville-patrol': 'victory' as const,
          'katarina.joao-fleet': 'victory' as const,
        },
      },
      {
        storyEvents: [
          KATARINA_SEVILLE_MUTINY_EVENT_ID,
          KATARINA_SPANISH_PURSUIT_EVENT_ID,
          KATARINA_CEUTA_CLASH_EVENT_ID,
          KATARINA_MASSAWA_TRUTH_EVENT_ID,
          KATARINA_CAYENNE_RESCUE_EVENT_ID,
        ],
        combatResults: {
          'katarina.seville-patrol': 'victory' as const,
          'katarina.joao-fleet': 'victory' as const,
          'katarina.cayenne-duel': 'draw' as const,
        },
      },
      {
        storyEvents: [
          KATARINA_SEVILLE_MUTINY_EVENT_ID,
          KATARINA_SPANISH_PURSUIT_EVENT_ID,
          KATARINA_CEUTA_CLASH_EVENT_ID,
          KATARINA_MASSAWA_TRUTH_EVENT_ID,
          KATARINA_CAYENNE_RESCUE_EVENT_ID,
        ],
        combatResults: {
          'katarina.seville-patrol': 'victory' as const,
          'katarina.joao-fleet': 'victory' as const,
          'katarina.cayenne-duel': 'victory' as const,
        },
        discoveries: [],
      },
      {
        storyEvents: [
          KATARINA_SEVILLE_MUTINY_EVENT_ID,
          KATARINA_SPANISH_PURSUIT_EVENT_ID,
          KATARINA_CEUTA_CLASH_EVENT_ID,
          KATARINA_MASSAWA_TRUTH_EVENT_ID,
          KATARINA_CAYENNE_RESCUE_EVENT_ID,
        ],
        combatResults: {
          'katarina.seville-patrol': 'victory' as const,
          'katarina.joao-fleet': 'victory' as const,
          'katarina.cayenne-duel': 'victory' as const,
        },
        discoveries: ['mouth-of-the-amazon'],
      },
      {
        storyEvents: [
          KATARINA_SEVILLE_MUTINY_EVENT_ID,
          KATARINA_SPANISH_PURSUIT_EVENT_ID,
          KATARINA_CEUTA_CLASH_EVENT_ID,
          KATARINA_MASSAWA_TRUTH_EVENT_ID,
          KATARINA_CAYENNE_RESCUE_EVENT_ID,
          KATARINA_AMAZON_RECKONING_EVENT_ID,
        ],
        combatResults: {
          'katarina.seville-patrol': 'victory' as const,
          'katarina.joao-fleet': 'victory' as const,
          'katarina.cayenne-duel': 'victory' as const,
          'katarina.amazon-martinez': 'defeat' as const,
        },
        discoveries: ['mouth-of-the-amazon'],
      },
      {
        storyEvents: [
          KATARINA_SEVILLE_MUTINY_EVENT_ID,
          KATARINA_SPANISH_PURSUIT_EVENT_ID,
          KATARINA_CEUTA_CLASH_EVENT_ID,
          KATARINA_MASSAWA_TRUTH_EVENT_ID,
          KATARINA_CAYENNE_RESCUE_EVENT_ID,
          KATARINA_AMAZON_RECKONING_EVENT_ID,
        ],
        combatResults: {
          'katarina.seville-patrol': 'victory' as const,
          'katarina.joao-fleet': 'victory' as const,
          'katarina.cayenne-duel': 'victory' as const,
          'katarina.amazon-martinez': 'victory' as const,
        },
        discoveries: ['mouth-of-the-amazon'],
      },
    ];

    states.forEach((journalState) => {
      const entries = getCatalinaJournal({
        storyEvents: journalState.storyEvents,
        combatResults: journalState.combatResults ?? {},
        discoveries: journalState.discoveries ?? [],
      } as unknown as State);
      expect(entries).toHaveLength(8);
      entries.forEach((entry) => {
        expect(koreanCatalog[entry.title]).toMatch(hangul);
        expect(koreanCatalog[entry.body]).toMatch(hangul);
      });
    });

    const completedEntries = getCatalinaJournal({
      storyEvents: [KATARINA_ENDING_EVENT_ID],
      combatResults: {},
      discoveries: [],
    } as unknown as State);
    expect(completedEntries.every((entry) => entry.completed)).toBe(true);
  });

  test('translates Catalina protagonist metadata, encounters, and ending component in Korean while preserving player ship names', () => {
    setLocale('ko-KR');
    const katarinaDef = PROTAGONIST_PROFILES.katarina;
    expect(t(katarinaDef.name)).toBe('카탈리나 에란초');
    expect(t(katarinaDef.title)).toBe('에스파냐의 붉은 머리 해적');
    expect(t(katarinaDef.nationality)).toBe('에스파니아');

    const katarinaEncounters = [
      encounterCatalog['katarina.seville-patrol'],
      encounterCatalog['katarina.joao-fleet'],
      encounterCatalog['katarina.cayenne-duel'],
      encounterCatalog['katarina.amazon-martinez'],
    ];
    katarinaEncounters.forEach((encounter) => {
      expect(t(encounter.nameKey)).toMatch(hangul);
      if (encounter.captainNameKey) {
        expect(t(encounter.captainNameKey)).toMatch(hangul);
      }
    });

    // Player-entered or story-instance custom ship names are preserved verbatim
    expect(t('Rebellion')).toBe('Rebellion');
    expect(t('붉은해적호')).toBe('붉은해적호');

    const container = document.createElement('div');
    const root = createRoot(container);
    act(() => {
      root.render(React.createElement(CatalinaEnding));
    });
    const text = container.textContent ?? '';
    expect(text).toContain('카탈리나의 복수');
    expect(text).toContain('미카엘과 에르난의 원수를 갚고');
    expect(text).not.toContain('Katarina’s reckoning');
    act(() => {
      root.unmount();
    });
  });

  test('does not duplicate keys between koreanCatalina and shared/Joao Korean modules', () => {
    const sharedKeys = new Set([
      ...Object.keys(koreanTerms),
      ...Object.keys(koreanUi),
      ...Object.keys(koreanCombat),
      ...Object.keys(koreanJoao),
    ]);
    const duplicates = Object.keys(koreanCatalina).filter((key) =>
      sharedKeys.has(key),
    );
    expect(duplicates).toEqual([]);
  });

  test('negative control (F8): localization validator catches missing keys, token mismatches, and conflicting keys', () => {
    const sampleKey = 'Hello $firstName, welcome to {port} with $lastName.';
    const missingAudit = auditCatalinaLocalization([sampleKey], {}, [
      { a: '가' },
    ]);
    expect(missingAudit.missingKeys).toEqual([sampleKey]);

    const tokenMismatchAudit = auditCatalinaLocalization(
      [sampleKey],
      { [sampleKey]: '안녕 $firstName, {wrongToken}에 오신 것을 환영합니다.' },
      [],
    );
    expect(tokenMismatchAudit.tokenMismatches).toEqual([sampleKey]);

    const conflictAudit = auditCatalinaLocalization([], {}, [
      { sharedKey: '번역 A' },
      { sharedKey: '번역 B' },
    ]);
    expect(conflictAudit.conflictingKeys).toEqual(['sharedKey']);
  });
});
