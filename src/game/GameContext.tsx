import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import type { EndingId, EventData, GameState, Lang } from '../types/game';
import { INITIAL_STATS } from '../types/game';
import { EVENT_COUNT, EVENTS } from '../data/events';
import { resolveEnding } from '../utils/score';
import { applyEffect, invertEffect } from '../utils/stats';
import { clearProgress, getLang, loadProgress, saveProgress, setLang } from '../utils/storage';

const STEP_ORDER = ['prologue', 'atmo', 'mg1', 'mg2', 'mg3', 'judgement', 'action', 'time', 'eventEnd'] as const;

/** Steps where CONTINUE requires a chosen option. */
const CHOICE_STEPS = new Set(['mg1', 'mg2', 'mg3', 'judgement', 'action', 'time']);

function freshStoryState(language: Lang): GameState {
  return {
    language,
    phase: 'story',
    eventIndex: 0,
    step: 'prologue',
    stats: { ...INITIAL_STATS },
    flags: [],
    chosenOption: null,
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
    chosenOption: null,
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
      chosenOption: saved.chosenOption,
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
    });
  }
  return menuState(language);
}

type Action =
  | { type: 'SET_LANGUAGE'; language: Lang }
  | { type: 'START_GAME' }
  | { type: 'CONTINUE' }
  | { type: 'CHOOSE'; optionId: string }
  | { type: 'BACK_TO_MENU' }
  | { type: 'RESET' }
  | { type: 'CLEAR_PROGRESS' };

/** Options of the current step — for CHOOSE lookups. */
function stepOptions(state: GameState) {
  if (state.phase !== 'story') return null;
  const event = EVENTS[state.language][state.eventIndex];
  switch (state.step) {
    case 'mg1':
      return event.miniGames[0].options;
    case 'mg2':
      return event.miniGames[1].options;
    case 'mg3':
      return event.miniGames[2].options;
    case 'judgement':
      return event.judgement.options;
    case 'action':
      return event.action.options;
    case 'time':
      return event.timeChoice.options;
    default:
      return null;
  }
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
      if (saved && (saved.phase === 'story' || (saved.phase === 'menu' && (saved.eventIndex > 0 || saved.step !== 'prologue')))) {
        return {
          language: state.language,
          phase: 'story',
          eventIndex: saved.eventIndex,
          step: saved.step,
          stats: saved.stats,
          flags: saved.flags,
          chosenOption: saved.chosenOption,
          endingId: null,
        };
      }
      return freshStoryState(state.language);
    }

    case 'CONTINUE': {
      if (state.phase !== 'story') return state;
      const requiresChoice = CHOICE_STEPS.has(state.step);
      if (requiresChoice && !state.chosenOption) return state;

      if (state.step === 'eventEnd') {
        if (state.eventIndex >= EVENT_COUNT - 1) {
          const endingId = resolveEnding(state.stats, state.flags);
          clearProgress();
          return { ...state, phase: 'ending', endingId, chosenOption: null };
        }
        return {
          ...state,
          eventIndex: state.eventIndex + 1,
          step: 'atmo',
          chosenOption: null,
        };
      }

      const idx = STEP_ORDER.indexOf(state.step);
      const next = STEP_ORDER[idx + 1];
      return { ...state, step: next, chosenOption: null };
    }

    case 'CHOOSE': {
      if (state.phase !== 'story') return state;
      const options = stepOptions(state);
      if (!options) return state;
      const next = options.find((o) => o.id === action.optionId);
      if (!next) return state;

      // Re-chosen? Un-apply the previous pick first so effects never double.
      let stats = state.stats;
      let flags = state.flags;
      if (state.chosenOption) {
        const prev = options.find((o) => o.id === state.chosenOption);
        if (prev) {
          stats = applyEffect(stats, invertEffect(prev.effect));
          const prevFlags = prev.effect.flags ?? [];
          flags = flags.filter((f) => !prevFlags.includes(f));
        }
      }
      stats = applyEffect(stats, next.effect);
      flags = [...new Set([...flags, ...(next.effect.flags ?? [])])];
      return { ...state, stats, flags, chosenOption: next.id };
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
