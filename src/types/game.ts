export type Lang = 'id' | 'en';

/** One step in the per-event flow (see MVP.md §4). */
export type StepId =
  | 'prologue'
  | 'atmo'
  | 'mg1'
  | 'mg2'
  | 'mg3'
  | 'judgement'
  | 'action'
  | 'time'
  | 'eventEnd';

export type FlowPhase = 'menu' | 'story' | 'ending';

/** Core stats from MVP.md §2. */
export interface Stats {
  /** Rp saldo Anton. */
  money: number;
  /** 0–100 % */
  stress: number;
  /** 0–100 HP */
  health: number;
  /** Poin reputasi sosial (floor 0, cap 200). */
  reputation: number;
  /** 0–100 % akurasi investigasi. */
  accuracy: number;
  scamCount: number;
  hoaksShareCount: number;
  factCheckCount: number;
}

export const INITIAL_STATS: Stats = {
  money: 5_000_000,
  stress: 50,
  health: 100,
  reputation: 100,
  accuracy: 0,
  scamCount: 0,
  hoaksShareCount: 0,
  factCheckCount: 0,
};

export const MIN_STRESS = 0;
export const MAX_STRESS = 100;
export const MIN_HEALTH = 0;
export const MAX_HEALTH = 100;
export const MIN_REPUTATION = 0;
export const MAX_REPUTATION = 200;
export const MIN_ACCURACY = 0;
export const MAX_ACCURACY = 100;

/** Stat deltas of a single choice (MVP.md lists these per option). */
export interface StatEffect {
  money?: number;
  stress?: number;
  health?: number;
  reputation?: number;
  accuracy?: number;
  /** Scam_Count — tertipu (e.g. transfer ke penipu). */
  scam?: number;
  /** Hoaks_Share_Count — menyebarkan hoaks. */
  hoaksShare?: number;
  /** Fact_Check_Count — melakukan cek fakta. */
  factCheck?: number;
  /** Hidden narrative flags, e.g. 'believedHealthHoax', 'trueEndingKey'. */
  flags?: string[];
}

export interface ChoiceOption {
  id: string;
  /** The action as the player sees it before choosing (effects hidden). */
  label: string;
  effect: StatEffect;
  /** Short narrative beat shown after choosing. */
  outcome: string;
}

/** One mandatory mini-game per event (MVP.md: "Pilih 1 dari 3 opsi"). */
export interface MiniGame {
  id: string;
  title: string;
  /** Narrative setup — what Anton is doing. */
  flavor: string;
  options: ChoiceOption[];
}

/** Judgement / Action / Time steps share the same shape. */
export interface EventStep {
  prompt: string;
  options: ChoiceOption[];
}

export interface EventData {
  id: string;
  number: number;
  /** In-world clock, e.g. '02:30 WIB'. */
  time: string;
  title: string;
  tag: string;
  /** Narrative paragraphs shown before the mini-games. */
  atmosphere: string[];
  miniGames: [MiniGame, MiniGame, MiniGame];
  judgement: EventStep;
  action: EventStep;
  timeChoice: EventStep;
  /** One-line media-literacy lesson shown at the event's end. */
  lesson: string;
}

export type EndingId = 'pariah' | 'hospitalized' | 'panic-spreader' | 'hero' | 'survivor';

export interface EndingData {
  id: EndingId;
  emoji: string;
  title: string;
  /** Short description of the trigger condition. */
  condition: string;
  narrative: string[];
}

export interface CharacterData {
  name: string;
  tagline: string;
  facts: { icon: string; label: string; detail: string }[];
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  /** Number of events survived (always 5 in Anton's Dilemma). */
  casesSolved: number;
  date: string;
}

export interface GameState {
  language: Lang;
  phase: FlowPhase;
  eventIndex: number;
  step: StepId;
  stats: Stats;
  flags: string[];
  /** Option chosen in the current step — applied to stats, awaiting CONTINUE. */
  chosenOption: string | null;
  endingId: EndingId | null;
}
