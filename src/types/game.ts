export type Lang = 'id' | 'en';

/** One step in the per-event flow (see MD_MVP_new_1 §4-5). */
export type StepId = 'prologue' | 'event' | 'eventEnd';

export type FlowPhase = 'menu' | 'story' | 'ending';

/** Core stats (spec §2). */
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

/** Stat deltas of a single choice (spec lists these per option). */
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

/** One mandatory mini-game tab per event (spec: "Tab MG 1..3"). */
export interface MiniGame {
  id: string;
  title: string;
  /** Narrative setup — what Anton is doing in this tab. */
  flavor: string;
  options: ChoiceOption[];
}

/** Vonis / Tindakan / Waktu dropdowns share the same shape. */
export interface EventStep {
  prompt: string;
  options: ChoiceOption[];
}

/** The incoming message that triggers the crisis (spec §4: Scenario Box). */
export interface Scenario {
  app: 'wa' | 'tiktok' | 'fb' | 'wag';
  sender: string;
  message: string;
  /** Extra context line, e.g. "Kilas belum membalas — centang satu". */
  note?: string;
}

export interface EventData {
  id: string;
  number: number;
  /** In-world clock, e.g. '02:30 WIB'. */
  time: string;
  title: string;
  tag: string;
  /** Narrative paragraphs shown in the scenario box. */
  atmosphere: string[];
  scenario: Scenario;
  miniGames: [MiniGame, MiniGame, MiniGame];
  judgement: EventStep;
  action: EventStep;
  timeChoice: EventStep;
  /** The "Event n Selesai" quote from the spec. */
  lesson: string;
}

/** All six slots the player fills before pressing ENTER. */
export interface EventSelections {
  mg1: string | null;
  mg2: string | null;
  mg3: string | null;
  judgement: string | null;
  action: string | null;
  time: string | null;
}

export type SelectionSlot = keyof EventSelections;

export const EMPTY_SELECTIONS: EventSelections = {
  mg1: null,
  mg2: null,
  mg3: null,
  judgement: null,
  action: null,
  time: null,
};

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
  /** Picks made in the current event's 6 slots — applied at ENTER. */
  selections: EventSelections;
  endingId: EndingId | null;
}
