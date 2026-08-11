import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react';
import type { CaseData, CaseResult, ChatMessage, Clue, GameState, Lang, ToolType } from '../types/game';
import { CASES } from '../data/cases';
import { CASE_TTL_MS, clearProgress, getLang, loadProgress, saveProgress, setLang } from '../utils/storage';
import { scoreParts } from '../utils/score';

function initialState(): GameState {
  const language = getLang();
  const saved = loadProgress();

  // Expired mid-case progress — drop the in-progress slice, keep completed
  // results and jump to the first unsolved case instead of resurrecting it.
  if (saved && saved.phase === 'investigating' && Date.now() - saved.savedAt > CASE_TTL_MS) {
    const completedResults = saved.completedResults;
    const nextIndex = completedResults.findIndex((r) => r === null);
    const caseIndex = nextIndex === -1 ? 0 : nextIndex;
    return {
      caseIndex,
      language,
      phase: 'intro',
      elapsedSeconds: 0,
      shareCount: CASES[language][caseIndex].viralPost.shareCount,
      focusPoints: 5,
      maxFocusPoints: 5,
      discoveredClues: [],
      activeTool: null,
      openedTools: [],
      interrogationMessages: [],
      isSourceTyping: false,
      submitted: false,
      verdictSelected: null,
      actionSelected: null,
      confidence: 70,
      completedResults,
    };
  }

  if (saved) {
    return {
      caseIndex: saved.caseIndex,
      language,
      phase: saved.phase,
      elapsedSeconds: saved.elapsedSeconds,
      shareCount: saved.shareCount,
      focusPoints: saved.focusPoints,
      maxFocusPoints: 5,
      discoveredClues: saved.discoveredClues,
      activeTool: saved.activeTool,
      // old saves predate openedTools → treat as nothing opened yet
      openedTools: saved.openedTools ?? [],
      interrogationMessages: saved.interrogationMessages,
      isSourceTyping: false,
      submitted: saved.submitted,
      verdictSelected: saved.verdictSelected,
      actionSelected: saved.actionSelected,
      confidence: saved.confidence,
      completedResults: saved.completedResults,
    };
  }
  return {
    caseIndex: 0,
    language,
    phase: 'intro',
    elapsedSeconds: 0,
    shareCount: CASES[language][0].viralPost.shareCount,
    focusPoints: 5,
    maxFocusPoints: 5,
    discoveredClues: [],
    activeTool: null,
    openedTools: [],
    interrogationMessages: [],
    isSourceTyping: false,
    submitted: false,
    verdictSelected: null,
    actionSelected: null,
    confidence: 70,
    completedResults: Array(CASES[language].length).fill(null),
  };
}

type Action =
  | { type: 'SET_LANGUAGE'; language: Lang }
  | { type: 'START_CASE'; caseIndex: number }
  | { type: 'NEXT_CASE' }
  | { type: 'ABANDON_CASE' }
  | { type: 'RESET' }
  | { type: 'CLEAR_PROGRESS' }
  | { type: 'TICK'; seconds: number }
  | { type: 'OPEN_TOOL'; tool: ToolType }
  | { type: 'CLOSE_TOOL' }
  | { type: 'LOG_CLUE'; clue: Clue }
  | { type: 'PLAYER_MESSAGE'; text: string }
  | { type: 'SOURCE_RESPONSE'; message: ChatMessage }
  | { type: 'SOURCE_TYPING'; typing: boolean }
  | { type: 'SELECT_VERDICT'; verdictId: string }
  | { type: 'SELECT_ACTION'; action: string }
  | { type: 'SUBMIT_VERDICT' };

function freshCaseState(
  language: Lang,
  caseIndex: number,
  completedResults: (CaseResult | null)[],
): GameState {
  const c = CASES[language][caseIndex];
  return {
    caseIndex,
    language,
    phase: 'investigating',
    elapsedSeconds: 0,
    shareCount: c.viralPost.shareCount,
    focusPoints: 5,
    maxFocusPoints: 5,
    discoveredClues: [],
    activeTool: null,
    openedTools: [],
    interrogationMessages: [
      {
        id: 'source-intro-1',
        role: 'source',
        text: c.tools.source?.introLines[0] ?? '',
        deflection: true,
      },
    ],
    isSourceTyping: false,
    submitted: false,
    verdictSelected: null,
    actionSelected: null,
    confidence: 70,
    completedResults,
  };
}

function computeScore(
  c: CaseData,
  correct: boolean,
  elapsedSeconds: number,
  shareCount: number,
): number {
  return scoreParts(c, correct, elapsedSeconds, shareCount).total;
}

/** Back to the menu — never re-hydrate from storage (that would resurrect the
 *  exact state being left). Keeps finished results, jumps to the first
 *  unsolved case so the progress chip stays meaningful. */
function menuState(state: GameState): GameState {
  const nextIndex = state.completedResults.findIndex((r) => r === null);
  const caseIndex = nextIndex === -1 ? 0 : nextIndex;
  return {
    caseIndex,
    language: state.language,
    phase: 'intro',
    elapsedSeconds: 0,
    shareCount: CASES[state.language][caseIndex].viralPost.shareCount,
    focusPoints: 5,
    maxFocusPoints: 5,
    discoveredClues: [],
    activeTool: null,
    openedTools: [],
    interrogationMessages: [],
    isSourceTyping: false,
    submitted: false,
    verdictSelected: null,
    actionSelected: null,
    confidence: 70,
    completedResults: state.completedResults,
  };
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SET_LANGUAGE': {
      setLang(action.language);
      return { ...state, language: action.language };
    }

    case 'START_CASE':
      return freshCaseState(state.language, action.caseIndex, state.completedResults);

    case 'NEXT_CASE': {
      if (state.caseIndex >= CASES[state.language].length - 1) return menuState(state);
      return freshCaseState(state.language, state.caseIndex + 1, state.completedResults);
    }

    case 'ABANDON_CASE': {
      // Leave the current case unfinished — back to the menu, results kept.
      return menuState(state);
    }

    case 'RESET':
      return menuState(state);

    case 'CLEAR_PROGRESS': {
      clearProgress();
      return initialState();
    }

    case 'TICK': {
      if (state.phase !== 'investigating') return state;
      const c = CASES[state.language][state.caseIndex];
      const newSeconds = state.elapsedSeconds + action.seconds;
      const newShares = state.shareCount + Math.round(action.seconds * c.viralPost.shareRate);

      // End-game limits: time ran out, or the post saturated before a verdict.
      const timedOut = newSeconds >= c.viralPost.timeLimitSeconds;
      const saturated = newShares >= c.viralPost.threshold;
      if (timedOut || saturated) {
        const endReason = timedOut ? 'timeout' : 'saturation';
        const result: CaseResult = {
          caseId: c.id,
          correct: false,
          verdictId: endReason,
          actionId: 'none',
          confidence: state.confidence,
          timeSeconds: newSeconds,
          cluesFound: state.discoveredClues.length,
          sharesAtSubmit: newShares,
          score: 0,
          completedAt: new Date().toISOString(),
          endReason,
        };
        const completedResults = [...state.completedResults];
        completedResults[state.caseIndex] = result;
        return {
          ...state,
          elapsedSeconds: newSeconds,
          shareCount: newShares,
          submitted: true,
          phase: 'debrief',
          completedResults,
        };
      }

      return { ...state, elapsedSeconds: newSeconds, shareCount: newShares };
    }

    case 'OPEN_TOOL': {
      // Reopening an already-unlocked tool is free — only NEW tools cost a point.
      const alreadyOpened = state.openedTools.includes(action.tool);
      if (!alreadyOpened && state.focusPoints <= 0) return state;
      return {
        ...state,
        activeTool: action.tool,
        openedTools: alreadyOpened ? state.openedTools : [...state.openedTools, action.tool],
        focusPoints: alreadyOpened ? state.focusPoints : state.focusPoints - 1,
      };
    }

    case 'CLOSE_TOOL':
      return { ...state, activeTool: null };

    case 'LOG_CLUE':
      if (state.discoveredClues.some((c) => c.id === action.clue.id)) return state;
      return { ...state, discoveredClues: [...state.discoveredClues, action.clue] };

    case 'PLAYER_MESSAGE': {
      const msg: ChatMessage = {
        id: `player-${Date.now()}`,
        role: 'player',
        text: action.text,
      };
      return { ...state, interrogationMessages: [...state.interrogationMessages, msg] };
    }

    case 'SOURCE_RESPONSE':
      return {
        ...state,
        interrogationMessages: [...state.interrogationMessages, action.message],
        isSourceTyping: false,
      };

    case 'SOURCE_TYPING':
      return { ...state, isSourceTyping: action.typing };

    case 'SELECT_VERDICT':
      return { ...state, verdictSelected: action.verdictId };

    case 'SELECT_ACTION':
      return { ...state, actionSelected: action.action };

    case 'SUBMIT_VERDICT': {
      if (!state.verdictSelected || !state.actionSelected) return state;
      const c = CASES[state.language][state.caseIndex];
      const correct =
        state.verdictSelected === c.verdict.correctVerdictId &&
        state.actionSelected === c.verdict.correctAction;
      const result: CaseResult = {
        caseId: c.id,
        correct,
        verdictId: state.verdictSelected,
        actionId: state.actionSelected,
        confidence: state.confidence,
        timeSeconds: state.elapsedSeconds,
        cluesFound: state.discoveredClues.length,
        sharesAtSubmit: state.shareCount,
        score: computeScore(c, correct, state.elapsedSeconds, state.shareCount),
        completedAt: new Date().toISOString(),
        endReason: 'verdict',
      };
      const completedResults = [...state.completedResults];
      completedResults[state.caseIndex] = result;
      return {
        ...state,
        submitted: true,
        phase: 'debrief',
        completedResults,
      };
    }

    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<Action>;
  currentCase: CaseData;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const timerRef = useRef<number | null>(null);

  // Persist progress on every state change — resume mid-case after reload.
  useEffect(() => {
    saveProgress(state);
  }, [state]);

  useEffect(() => {
    if (state.phase !== 'investigating') {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = window.setInterval(() => {
      dispatch({ type: 'TICK', seconds: 1 });
    }, 1000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [state.phase]);

  const currentCase = CASES[state.language][state.caseIndex];
  const value = useMemo(() => ({ state, dispatch, currentCase }), [state, currentCase]);
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
