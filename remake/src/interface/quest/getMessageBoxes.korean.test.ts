import getMessageBoxes from './getMessageBoxes';
import { setLocale } from '../../localization';
import state from '../../state/state';

describe('localized player names', () => {
  const originalProtagonist = state.protagonistId;

  afterEach(() => {
    state.protagonistId = originalProtagonist;
    setLocale('en');
  });

  test.each([
    ['ko-KR', '조안 페레로'],
    ['zh-CN', '约翰 法雷尔'],
    ['en', 'João Franco'],
  ] as const)('inserts the João name in %s', (locale, name) => {
    state.protagonistId = 'joao';
    setLocale(locale);
    expect(
      getMessageBoxes([{ body: '$firstName $lastName', position: 0 }], 0)[0]
        ?.body,
    ).toBe(name);
  });

  test('replaces every occurrence without changing the source text', () => {
    state.protagonistId = 'joao';
    setLocale('ko-KR');
    const message = Object.freeze({
      body: '$firstName, $firstName! $lastName, $lastName!',
      position: 0 as const,
    });
    expect(getMessageBoxes([message], 0)[0]?.body).toBe(
      '조안, 조안! 페레로, 페레로!',
    );
    expect(message.body).toBe('$firstName, $firstName! $lastName, $lastName!');
  });
});
