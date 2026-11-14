// SNR3 section 2/5 fidelity checks for Otto's original-core chain.
// Sources: research/game-details/scenarios/scenario-3-otto-baynes.md
//   :228-252 (Catalina Pub bands compare time of day only),
//   :438-456 (Ezequiel challenge Pub set and Yes/No),
//   :470-497 (coward stage, Command Room second chance),
//   :519-526 (missed appointment: non-Harbor visit >= appointment + 30).
import { compileStoryContent } from './core/registry';
import {
  createStoryContext,
  get30DayMonthDateCode,
  resolveStoryEvent,
} from './core/resolver';
import { createStorySession, getStoryFrame } from './core/runtime';
import { storyContentSource, storyValidationCatalogs } from './content';
import {
  OTTO_OC_BORDEAUX_APPOINTMENT_MISSED_EVENT_ID,
  OTTO_OC_BORDEAUX_FINAL_EVENT_ID,
  OTTO_OC_BORDEAUX_FINAL_RETRY_EVENT_ID,
  OTTO_OC_CATALINA_MARKET_RESCUE_EVENT_ID,
  OTTO_OC_CATALINA_PUB_ALLIANCE_EVENT_ID,
  OTTO_OC_CATALINA_PUB_EARLY_EVENT_ID,
  OTTO_OC_CATALINA_PUB_LATE_EVENT_ID,
  OTTO_OC_CAYENNE_CATALINA_PLEA_EVENT_ID,
  OTTO_OC_EZEQUIEL_DECLINED_COWARD_EVENT_ID,
  OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID,
  OTTO_OC_SEVILLE_COMMAND_REENTRY_EVENT_ID,
  OTTO_OC_SEVILLE_HEIST_EVENT_ID,
} from './content/arcs/otto/original-core';
import { advanceQuestSession } from './advanceSession';
import { getOttoJournal } from './ottoJournal';
import { storyRuntimeActions } from './storyRuntimeActions';
import { getLocale, setLocale, t } from '../localization';
import { startNewGameAs } from '../state/protagonists';
import state from '../state/state';

const content = compileStoryContent(
  storyContentSource,
  'strict',
  storyValidationCatalogs,
);

const EPOCH = Date.UTC(1522, 4, 17);
const minutesAt = (year: number, month: number, day: number, minute = 0) =>
  (Date.UTC(year, month - 1, day) - EPOCH) / 60000 + minute;

const resolveAt = (portId: string, buildingId: string) => {
  state.portId = portId;
  state.buildingId = buildingId;
  return (
    resolveStoryEvent(
      createStoryContext(state, content),
      content,
      (candidates) => candidates[0],
    )?.id ?? null
  );
};

const playAt = (portId: string, buildingId: string, choiceId?: string) => {
  state.portId = portId;
  state.buildingId = buildingId;
  const event = resolveStoryEvent(
    createStoryContext(state, content),
    content,
    (candidates) => candidates[0],
  );
  if (!event) return null;
  let session = createStorySession(event);
  for (
    let guard = 0;
    getStoryFrame(session) !== null && guard < 50;
    guard += 1
  ) {
    const frame = getStoryFrame(session);
    session = advanceQuestSession(
      session,
      storyRuntimeActions,
      frame?.type === 'choice' ? choiceId ?? 'yes' : undefined,
    );
  }
  return event.id;
};

const complete = (id: string, at: number) => {
  state.storyEvents.push(id);
  state.storyEventTimes[id] = at;
};

const prepareAfterPlea = () => {
  startNewGameAs('otto');
  state.timePassed = minutesAt(1523, 1, 1, 600);
  state.storyEvents = [];
  state.storyEventTimes = {};
  state.combatResults['otto.santo-domingo-armada'] = 'victory';
  complete(OTTO_OC_CAYENNE_CATALINA_PLEA_EVENT_ID, state.timePassed);
  state.fame.pirate = 30000;
};

const journalEntry = (id: string) =>
  getOttoJournal(state).find((entry) => entry.id === id);

const currentJournalEntry = () =>
  getOttoJournal(state).find(
    (entry) => !entry.completed && entry.kind !== 'advice',
  );

describe('Otto original-core SNR3 fidelity (scenario-3 sections 2 and 5)', () => {
  afterEach(() => {
    startNewGameAs('joao');
  });

  test('Ezequiel challenge fires only in Pubs of original ports 3..41 except Genoa, London, Amsterdam', () => {
    // Remake port id = original port id + 1 (regularPorts index + 1).
    const allowed = new Set<number>();
    for (let original = 3; original <= 41; original += 1) {
      if (![8, 29, 33].includes(original)) allowed.add(original + 1);
    }
    for (let portId = 1; portId <= 60; portId += 1) {
      prepareAfterPlea();
      const fired =
        resolveAt(String(portId), '2') ===
        OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID;
      expect([portId, fired]).toEqual([portId, allowed.has(portId)]);
    }
    // Bergen (original 41, remake 42) is a European non-capital port.
    prepareAfterPlea();
    expect(resolveAt('42', '2')).toBe(OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID);
    // Only the Pub hosts the stranger.
    prepareAfterPlea();
    expect(resolveAt('28', '1')).toBeNull();
  });

  test('challenge requires the Cayenne plea and 30,000 Piracy Fame', () => {
    prepareAfterPlea();
    state.fame.pirate = 29999;
    expect(resolveAt('28', '2')).toBeNull();
    prepareAfterPlea();
    state.storyEvents = [];
    expect(resolveAt('28', '2')).toBeNull();
  });

  test('a plain Seville visit never creates the coward state; explicit No does, then taunt and Command Room second chance', () => {
    const prevLocale = getLocale();
    setLocale('ko-KR');
    try {
      prepareAfterPlea();
      expect(currentJournalEntry()?.id).toBe('otto-oc-ezequiel-challenge');
      expect(
        t(currentJournalEntry()!.body, currentJournalEntry()?.values),
      ).toContain('유럽 비수도 술집');
      expect(
        t(currentJournalEntry()!.body, currentJournalEntry()?.values),
      ).not.toContain('세빌리아');
      expect(playAt('2', '2')).toBeNull();
      expect(playAt('2', '8')).toBeNull();
      expect(state.storyEvents).not.toContain(
        OTTO_OC_EZEQUIEL_DECLINED_COWARD_EVENT_ID,
      );

      expect(playAt('28', '2', 'no')).toBe(
        OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID,
      );
      expect(state.storyEvents).toContain(
        OTTO_OC_EZEQUIEL_DECLINED_COWARD_EVENT_ID,
      );
      expect(state.storyEvents).not.toContain(
        OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID,
      );
      // No re-challenge in other Pubs after declining.
      expect(resolveAt('29', '2')).toBeNull();
      expect(currentJournalEntry()?.id).toBe('otto-oc-ezequiel-challenge');
      expect(currentJournalEntry()?.body).toContain('Seville Command Room');
      expect(
        t(currentJournalEntry()!.body, currentJournalEntry()?.values),
      ).toContain('세빌리아 사령실');

      expect(playAt('2', '2')).toBe(OTTO_OC_EZEQUIEL_DECLINED_COWARD_EVENT_ID);
      state.timePassed = minutesAt(1523, 2, 10, 600);
      expect(playAt('2', '8')).toBe(OTTO_OC_SEVILLE_COMMAND_REENTRY_EVENT_ID);
      expect(state.storyEvents).toContain(
        OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID,
      );
      // Appointment is anchored at the Command Room acceptance.
      expect(
        state.storyEventTimes[OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID],
      ).toBe(minutesAt(1523, 2, 10, 600));
      expect(resolveAt('2', '2')).toBeNull();
    } finally {
      setLocale(prevLocale);
    }
  });

  test('Catalina Pub bands compare time of day only (no date), in 20-minute ticks', () => {
    const setupMarket = (marketMinute: number) => {
      startNewGameAs('otto');
      state.storyEvents = [];
      state.storyEventTimes = {};
      state.combatResults['otto.seville-pursuit'] = 'victory';
      complete(OTTO_OC_SEVILLE_HEIST_EVENT_ID, 0);
      const anchor = minutesAt(1523, 3, 1, marketMinute);
      complete(OTTO_OC_CATALINA_MARKET_RESCUE_EVENT_ID, anchor);
      return anchor;
    };
    // Market at 10:00.
    let anchor = setupMarket(600);
    state.timePassed = anchor + 100;
    expect(resolveAt('2', '2')).toBe(OTTO_OC_CATALINA_PUB_EARLY_EVENT_ID);
    state.timePassed = anchor + 120;
    expect(resolveAt('2', '2')).toBe(OTTO_OC_CATALINA_PUB_ALLIANCE_EVENT_ID);
    state.timePassed = anchor + 220;
    expect(resolveAt('2', '2')).toBe(OTTO_OC_CATALINA_PUB_ALLIANCE_EVENT_ID);
    state.timePassed = anchor + 240;
    expect(resolveAt('2', '2')).toBe(OTTO_OC_CATALINA_PUB_LATE_EVENT_ID);
    // A later day at the same clock time is still the meeting band.
    state.timePassed = anchor + 1440 + 150;
    expect(resolveAt('2', '2')).toBe(OTTO_OC_CATALINA_PUB_ALLIANCE_EVENT_ID);
    // Next morning 08:00 is before the band again ("still not here").
    state.timePassed = anchor + 1440 - 120;
    expect(resolveAt('2', '2')).toBe(OTTO_OC_CATALINA_PUB_EARLY_EVENT_ID);

    // Market at 19:40: window 21:40..23:20, 23:40 late, after midnight early.
    anchor = setupMarket(1180);
    state.timePassed = anchor + 120;
    expect(resolveAt('2', '2')).toBe(OTTO_OC_CATALINA_PUB_ALLIANCE_EVENT_ID);
    state.timePassed = anchor + 240;
    expect(resolveAt('2', '2')).toBe(OTTO_OC_CATALINA_PUB_LATE_EVENT_ID);
    state.timePassed = anchor + 280;
    expect(resolveAt('2', '2')).toBe(OTTO_OC_CATALINA_PUB_EARLY_EVENT_ID);

    // Late: no reward, the chain proceeds.
    anchor = setupMarket(600);
    state.timePassed = anchor + 240;
    const { gold } = state;
    const fame = state.fame.pirate;
    expect(playAt('2', '2')).toBe(OTTO_OC_CATALINA_PUB_LATE_EVENT_ID);
    expect(state.gold).toBe(gold);
    expect(state.fame.pirate).toBe(fame);
    expect(state.storyEvents).toContain(OTTO_OC_CATALINA_PUB_ALLIANCE_EVENT_ID);
    expect(resolveAt('2', '2')).toBeNull();
  });

  test('Bordeaux appointment uses the 30-day-month date code: <30 nothing, 30..59 showdown, >=60 terminal failure', () => {
    const prevLocale = getLocale();
    setLocale('ko-KR');
    try {
      const accept = () => {
        prepareAfterPlea();
        expect(playAt('28', '2', 'yes')).toBe(
          OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID,
        );
      };
      accept();
      const anchor =
        state.storyEventTimes[OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID];
      // 1523-01-01 -> 1523-01-30 is date-code day 29.
      state.timePassed = minutesAt(1523, 1, 30, 600);
      expect(
        get30DayMonthDateCode(state.timePassed) - get30DayMonthDateCode(anchor),
      ).toBe(29);
      expect(resolveAt('28', '4')).toBeNull();
      expect(currentJournalEntry()?.id).toBe('otto-oc-bordeaux-final');
      expect(currentJournalEntry()?.body).toContain('not open yet');
      expect(currentJournalEntry()?.values).toMatchObject({
        elapsed: 29,
        daysLeft: 1,
      });
      expect(
        t(currentJournalEntry()!.body, currentJournalEntry()?.values),
      ).toContain(
        '보르도만 결전 기한이 아직 열리지 않았습니다(경과 29/30일, 보르도 항구 결전 가능 기간인 30~59일까지 1일 남음).',
      );

      state.timePassed = minutesAt(1523, 2, 1, 600);
      expect(currentJournalEntry()?.body).toContain('window is open');
      expect(
        t(currentJournalEntry()!.body, currentJournalEntry()?.values),
      ).toContain('보르도만 결전 기한이 열렸습니다(경과 30일');
      expect(resolveAt('28', '4')).toBe(OTTO_OC_BORDEAUX_FINAL_EVENT_ID);

      // Gregorian 59 days, original date code 60: missed.
      state.timePassed = minutesAt(1523, 3, 1, 600);
      expect(resolveAt('28', '4')).toBe(
        OTTO_OC_BORDEAUX_APPOINTMENT_MISSED_EVENT_ID,
      );
      // Before any building reports it, the journal already tells the truth.
      expect(journalEntry('otto-oc-bordeaux-final')?.title).toBe(
        'Bordeaux Bay Appointment Missed',
      );
      expect(t(journalEntry('otto-oc-bordeaux-final')!.title)).toBe(
        '보르도만 결전 기한 도과',
      );
      expect(journalEntry('otto-oc-bordeaux-final')?.body).not.toContain(
        '30 to 59',
      );
      expect(
        t(
          journalEntry('otto-oc-bordeaux-final')!.body,
          journalEntry('otto-oc-bordeaux-final')?.values,
        ),
      ).not.toContain('30~59');
      expect(journalEntry('otto-oc-london-triumph')?.body).toContain(
        'no final victory',
      );
      expect(t(journalEntry('otto-oc-london-triumph')!.body)).toContain(
        '보고할 전승이 없습니다',
      );

      // Original: any non-Harbor building visit reports the missed limit.
      expect(resolveAt('29', '1')).toBe(
        OTTO_OC_BORDEAUX_APPOINTMENT_MISSED_EVENT_ID,
      );
      expect(resolveAt('29', '4')).toBeNull();
      expect(playAt('29', '1')).toBe(
        OTTO_OC_BORDEAUX_APPOINTMENT_MISSED_EVENT_ID,
      );
      // No recovery afterwards.
      expect(resolveAt('28', '4')).toBeNull();
      expect(resolveAt('2', '8')).toBeNull();
      expect(resolveAt('30', '6')).toBeNull();
      state.timePassed = minutesAt(1523, 3, 1, 600) + 30 * 1440;
      expect(resolveAt('28', '4')).toBeNull();
    } finally {
      setLocale(prevLocale);
    }
  });

  test('a lost or abandoned Ezequiel battle cannot be retried after the limit', () => {
    prepareAfterPlea();
    expect(playAt('28', '2', 'yes')).toBe(
      OTTO_OC_PUB_EZEQUIEL_CHALLENGE_EVENT_ID,
    );
    state.timePassed = minutesAt(1523, 2, 5, 600);
    complete(OTTO_OC_BORDEAUX_FINAL_EVENT_ID, state.timePassed);
    state.combatResults['otto.bordeaux-ezequiel'] = 'retreat';
    expect(resolveAt('28', '4')).toBe(OTTO_OC_BORDEAUX_FINAL_RETRY_EVENT_ID);
    state.timePassed = minutesAt(1523, 3, 2, 600);
    expect(resolveAt('28', '4')).toBe(
      OTTO_OC_BORDEAUX_APPOINTMENT_MISSED_EVENT_ID,
    );
    expect(journalEntry('otto-oc-bordeaux-final')?.title).toBe(
      'Bordeaux Bay Appointment Missed',
    );
  });
});
