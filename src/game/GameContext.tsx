import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import type { EndingId, EventData, GameState, Lang, SelectionSlot } from '../types/game';
import { EMPTY_SELECTIONS, INITIAL_STATS } from '../types/game';
import { EVENT_COUNT, EVENTS } from '../data/events';
import { resolveEnding } from '../utils/score';
import { applyEffect } from '../utils/stats';
import { clearProgress, getLang, loadProgress, saveProgress, setLang } from '../utils/storage';

/** The 6 slots of an event, in the order their effects are applied at ENTER. */
const EVENT_SLOTS: { slot: SelectionSlot; kind: 'mg' | 'judgement' | 'action' | 'time' }[] = [
  { slot: 'mg1', kind: 'mg' },
  { slot: 'mg2', kind: 'mg' },
  { slot: 'mg3', kind: 'mg' },
  { slot: 'judgement', kind: 'judgement' },
  { slot: 'action', kind: 'action' },
  { slot: 'time', kind: 'time' },
];

function freshStoryState(language: Lang): GameState {
  return {
    language,
    phase: 'story',
    eventIndex: 0,
    step: 'prologue',
    stats: { ...INITIAL_STATS },
    flags: [],
    selections: { ...EMPTY_SELECTIONS },
    endingId: null,
  };
}

function menuState(language: Lang, resume?: GameState | null): GameState {
  return {
    language,
    phase: 'menu',
    eventIndex: resume?.eventIndex ?? 0,
    step: resume?.step ?? 'prologue',
    stats: resume ? { ...resume.stats } : { ...INITIAL_STATS },
    flags: resume ? [...resume.flags] : [],
    selections: resume ? { ...resume.selections } : { ...EMPTY_SELECTIONS },
    endingId: null,
  };
}

/** Restore a saved run, or start fresh at the menu. */
function initialState(): GameState {
  const language = getLang();
  const saved = loadProgress();
  if (saved && saved.phase === 'story') {
    return {
      language,
      phase: 'story',
      eventIndex: saved.eventIndex,
      step: saved.step,
      stats: saved.stats,
      flags: saved.flags,
      selections: saved.selections,
      endingId: null,
    };
  }
  if (saved && saved.phase === 'menu') {
    return menuState(language, {
      ...freshStoryState(language),
      eventIndex: saved.eventIndex,
      step: saved.step,
      stats: saved.stats,
      flags: saved.flags,
      selections: saved.selections,
    });
  }
  return menuState(language);
}

type Action =
  | { type: 'SET_LANGUAGE'; language: Lang }
  | { type: 'START_GAME' }
  | { type: 'CONTINUE' }
  | { type: 'SELECT'; slot: SelectionSlot; optionId: string }
  | { type: 'ENTER_EVENT' }
  | { type: 'BACK_TO_MENU' }
  | { type: 'RESET' }
  | { type: 'CLEAR_PROGRESS' };

/** All 6 selections made? */
function selectionsComplete(state: GameState): boolean {
  return EVENT_SLOTS.every(({ slot }) => state.selections[slot] !== null);
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SET_LANGUAGE': {
      setLang(action.language);
      return { ...state, language: action.language };
    }

    case 'START_GAME': {
      // Resume a saved run when one exists, otherwise start from the prologue.
      const saved = loadProgress();
      if (
        saved &&
        (saved.phase === 'story' ||
          (saved.phase === 'menu' && (saved.eventIndex > 0 || saved.step !== 'prologue')))
      ) {
        return {
          language: state.language,
          phase: 'story',
          eventIndex: saved.eventIndex,
          step: saved.step,
          stats: saved.stats,
          flags: saved.flags,
          selections: saved.selections,
          endingId: null,
        };
      }
      return freshStoryState(state.language);
    }

    case 'CONTINUE': {
      if (state.phase !== 'story') return state;
      if (state.step === 'prologue') {
        return { ...state, step: 'event', eventIndex: 0 };
      }
      if (state.step === 'eventEnd') {
        if (state.eventIndex >= EVENT_COUNT - 1) {
          const endingId = resolveEnding(state.stats, state.flags);
          clearProgress();
          return { ...state, phase: 'ending', endingId };
        }
        return {
          ...state,
          eventIndex: state.eventIndex + 1,
          step: 'event',
          selections: { ...EMPTY_SELECTIONS },
        };
      }
      return state;
    }

    case 'SELECT': {
      if (state.phase !== 'story' || state.step !== 'event') return state;
      const event = EVENTS[state.language][state.eventIndex];
      const options =
        action.slot === 'judgement'
          ? event.judgement.options
          : action.slot === 'action'
            ? event.action.options
            : action.slot === 'time'
              ? event.timeChoice.options
              : event.miniGames[Number(action.slot.slice(2)) - 1].options;
      if (!options.some((o) => o.id === action.optionId)) return state;
      return { ...state, selections: { ...state.selections, [action.slot]: action.optionId } };
    }

    case 'ENTER_EVENT': {
      if (state.phase !== 'story' || state.step !== 'event') return state;
      if (!selectionsComplete(state)) return state;
      const event = EVENTS[state.language][state.eventIndex];
      // Apply all six picks in order — the spec's ENTER button processes
      // choices and changes statistics in one go.
      let stats = state.stats;
      let flags = state.flags;
      for (const { slot } of EVENT_SLOTS) {
        const options =
          slot === 'judgement'
            ? event.judgement.options
            : slot === 'action'
              ? event.action.options
              : slot === 'time'
                ? event.timeChoice.options
                : event.miniGames[Number(slot.slice(2)) - 1].options;
        const opt = options.find((o) => o.id === state.selections[slot]);
        if (!opt) return state; // defensive — should not happen after the guard
        stats = applyEffect(stats, opt.effect);
        flags = [...new Set([...flags, ...(opt.effect.flags ?? [])])];
      }
      return { ...state, stats, flags, step: 'eventEnd' };
    }

    case 'BACK_TO_MENU':
      // Progress stays saved — the menu offers a continue button.
      return menuState(state.language, state);

    case 'RESET':
      clearProgress();
      return menuState(state.language);

    case 'CLEAR_PROGRESS': {
      clearProgress();
      return menuState(state.language);
    }

    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<Action>;
  currentEvent: EventData;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  // Persist on every state change — reload resumes exactly where the player was.
  useEffect(() => {
    saveProgress(state);
  }, [state]);

  const currentEvent = EVENTS[state.language][Math.min(state.eventIndex, EVENT_COUNT - 1)];
  const value = useMemo(() => ({ state, dispatch, currentEvent }), [state, currentEvent]);
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

export type { EndingId };
