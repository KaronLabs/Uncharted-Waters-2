import joaoLisbon from './dialogue/joaoLisbon';
import joaoFirstVoyage from './dialogue/joaoFirstVoyage';
import joaoConflictAndGrowth from './dialogue/joaoConflictAndGrowth';
import joaoMassawa from './dialogue/joaoMassawa';
import joaoFinale from './dialogue/joaoFinale';
import koreanJoao from './koreanJoao';
import { koreanTerms } from './koreanTerms';
import { lisbonOpeningDialogue } from '../story/content/arcs/joao/lisbon-opening/dialogue';

const source = {
  ...joaoLisbon,
  ...joaoFirstVoyage,
  ...joaoConflictAndGrowth,
  ...joaoMassawa,
  ...joaoFinale,
};
const tokens = (text: string) =>
  (text.match(/\{[^}]+\}|\$(?:firstName|lastName)/g) ?? []).sort();
const translated = { ...koreanTerms, ...koreanJoao };

test('covers every João dialogue, branch, journal entry, and ending', () => {
  expect(Object.keys(source)).toHaveLength(444);
  expect(Object.keys(koreanJoao)).toHaveLength(435);
  expect(Object.keys(koreanJoao).every((key) => key in source)).toBe(true);
  Object.entries(source).forEach(([key]) => {
    expect(translated[key]).not.toBe(key);
    expect(translated[key]).toMatch(/[가-힣]/);
    expect(translated[key]).not.toMatch(/[\u3400-\u9fff\ufffd]/);
    expect(tokens(translated[key])).toEqual(tokens(key));
  });
});

test('the coverage rules reject untranslated text and missing placeholders', () => {
  expect('Welcome home, João.').not.toMatch(/[가-힣]/);
  expect(tokens('$firstName, $lastName {currentDay}')).not.toEqual(
    tokens('$firstName, {currentDay}'),
  );
});

test('keeps DOS Korean names and the ending meaning', () => {
  expect(koreanJoao['João’s homecoming']).toBe('조안의 귀환');
  expect(koreanJoao['João’s main story is complete']).toBe(
    '조안의 이야기를 마쳤습니다',
  );
  expect(
    koreanJoao['The main story is complete. You can continue exploring.'],
  ).toBe('이야기를 모두 마쳤습니다. 계속해서 자유롭게 탐험할 수 있습니다.');
});

test('uses a neutral acknowledgement shared by João and Enrico', () => {
  const replies = Object.values(lisbonOpeningDialogue)
    .flat()
    .filter((step) => step.type === 'dialogue' && step.body === 'Yes sir!');
  expect(
    replies.map((step) => ('speaker' in step ? step.speaker : undefined)),
  ).toEqual(['joao', 'enrico']);
  expect(koreanJoao['Yes sir!']).toBe('예, 알겠습니다!');
});

test('uses the correct noun ending for the inherited silver ornament', () => {
  expect(
    koreanJoao['This is the aquamarine tiara your father gave to me.'],
  ).toBe('네 아버지가 내게 주신 은제 머리장식이란다.');
});
