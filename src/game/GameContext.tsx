import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react';
import type { ChatMessage, Clue, GameState, ToolType } from '../types/game';
import { CASES } from '../data/cases';

function initialState(): GameState {
  return {
    caseIndex: 0,
    phase: 'intro',
    elapsedSeconds: 0,
    shareCount: CASES[0].viralPost.shareCount,
    focusPoints: 5,
    maxFocusPoints: 5,
    discoveredClues: [],
    activeTool: null,
    interrogationMessages: [],
    isSourceTyping: false,
    submitted: false,
    verdictSelected: null,
    actionSelected: null,
    confidence: 70,
  };
}

type Action =
  | { type: 'START_CASE'; caseIndex: number }
  | { type: 'NEXT_CASE' }
  | { type: 'RESET' }
  | { type: 'TICK'; seconds: number }
  | { type: 'OPEN_TOOL'; tool: ToolType }
  | { type: 'CLOSE_TOOL' }
  | { type: 'LOG_CLUE'; clue: Clue }
  | { type: 'PLAYER_MESSAGE'; text: string }
  | { type: 'SOURCE_RESPONSE'; message: ChatMessage }
  | { type: 'SOURCE_TYPING'; typing: boolean }
  | { type: 'SELECT_VERDICT'; verdictId: string }
  | { type: 'SELECT_ACTION'; action: string }
  | { type: 'SET_CONFIDENCE'; value: number }
  | { type: 'SUBMIT_VERDICT' };

function freshCaseState(caseIndex: number): GameState {
  const c = CASES[caseIndex];
  return {
    caseIndex,
    phase: 'investigating',
    elapsedSeconds: 0,
    shareCount: c.viralPost.shareCount,
    focusPoints: 5,
    maxFocusPoints: 5,
    discoveredClues: [],
    activeTool: null,
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
  };
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'START_CASE':
      return freshCaseState(action.caseIndex);

    case 'NEXT_CASE': {
      if (state.caseIndex >= CASES.length - 1) return initialState();
      return freshCaseState(state.caseIndex + 1);
    }

    case 'RESET':
      return initialState();

    case 'TICK': {
      const c = CASES[state.caseIndex];
      const newSeconds = state.elapsedSeconds + action.seconds;
      const newShares = state.shareCount + Math.round(action.seconds * c.viralPost.shareRate);
      return { ...state, elapsedSeconds: newSeconds, shareCount: newShares };
    }

    case 'OPEN_TOOL': {
      if (state.focusPoints <= 0) return state;
      return {
        ...state,
        activeTool: action.tool,
        focusPoints: state.activeTool === action.tool ? state.focusPoints : state.focusPoints - 1,
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

    case 'SET_CONFIDENCE':
      return { ...state, confidence: action.value };

    case 'SUBMIT_VERDICT':
      return { ...state, submitted: true, phase: 'debrief' };

    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<Action>;
  currentCase: (typeof CASES)[number];
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const timerRef = useRef<number | null>(null);

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

  const currentCase = CASES[state.caseIndex];
  const value = useMemo(() => ({ state, dispatch, currentCase }), [state, currentCase]);
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
