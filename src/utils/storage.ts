import type { EndingId, EventSelections, GameState, Lang, LeaderboardEntry, Stats } from '../types/game';

const PROGRESS_KEY = 'trace-progress';
const LEADERBOARD_KEY = 'trace-leaderboard';
const NAME_KEY = 'trace-player-name';
const LANG_KEY = 'trace-lang';
const TUTORIAL_KEY = 'trace-tutorial-done';

/**
 * Save format version. v1 = old TRACE journalist-game saves; v2 = sequential
 * choice flow — both incompatible with the tab/dropdown flow and discarded.
 */
const SAVE_VERSION = 3;

/* ── Language preference ─────────────────────────────────── */

export function getLang(): Lang {
  const raw = localStorage.getItem(LANG_KEY);
  return raw === 'en' ? 'en' : 'id';
}

export function setLang(lang: Lang): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    // ignore
  }
}

/* ── Tutorial ────────────────────────────────────────────── */

export function getTutorialDone(): boolean {
  return localStorage.getItem(TUTORIAL_KEY) === '1';
}

export function setTutorialDone(): void {
  try {
    localStorage.setItem(TUTORIAL_KEY, '1');
  } catch {
    // ignore
  }
}

/* ── Story progress ──────────────────────────────────────── */

/** Serialisable slice of GameState — everything needed to resume mid-story. */
export interface SavedProgress {
  version: number;
  /** Where the player was when saving: mid-story, or back at the menu. */
  phase: 'menu' | 'story';
  eventIndex: number;
  step: GameState['step'];
  stats: Stats;
  flags: string[];
  selections: EventSelections;
  endingId: EndingId | null;
  savedAt: number;
}

export function saveProgress(state: GameState): void {
  const data: SavedProgress = {
    version: SAVE_VERSION,
    phase: state.phase === 'story' ? 'story' : 'menu',
    eventIndex: state.eventIndex,
    step: state.step,
    stats: state.stats,
    flags: state.flags,
    selections: state.selections,
    endingId: state.endingId,
    savedAt: Date.now(),
  };
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
  } catch {
    // storage full / unavailable — game keeps running, persistence is best-effort
  }
}

export function loadProgress(): SavedProgress | null {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedProgress;
    // Old-format (v1) saves or a finished run (endingId set) → start fresh.
    if (parsed.version !== SAVE_VERSION || parsed.endingId) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch {
    // ignore
  }
}

/* ── Leaderboard ─────────────────────────────────────────── */

export function getPlayerName(): string {
  return localStorage.getItem(NAME_KEY) ?? '';
}

export function setPlayerName(name: string): void {
  localStorage.setItem(NAME_KEY, name);
}

/** Load local leaderboard entries (merged from this device's saves). */
export function loadLocalLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LeaderboardEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Add an entry to the local leaderboard and return the merged list
 * (static JSON seed + local entries, sorted by score desc).
 */
export function addLeaderboardEntry(entry: LeaderboardEntry): LeaderboardEntry[] {
  const local = loadLocalLeaderboard();
  const next = [...local, entry].sort((a, b) => b.score - a.score).slice(0, 50);
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}

/** Fetch the static seed leaderboard shipped with the project (public/leaderboard.json). */
export async function fetchSeedLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const res = await fetch('leaderboard.json', { cache: 'no-store' });
    if (!res.ok) return [];
    const data = (await res.json()) as { entries?: LeaderboardEntry[] };
    return data.entries ?? [];
  } catch {
    return [];
  }
}

/** Full leaderboard = seed (static JSON) + local saves, sorted desc. */
export async function getFullLeaderboard(): Promise<LeaderboardEntry[]> {
  const [seed, local] = await Promise.all([fetchSeedLeaderboard(), loadLocalLeaderboard()]);
  const seen = new Set(local.map((e) => `${e.name}-${e.score}-${e.date}`));
  const merged = [...local, ...seed.filter((s) => !seen.has(`${s.name}-${s.score}-${s.date}`))];
  return merged.sort((a, b) => b.score - a.score).slice(0, 20);
}

export function formatDate(d: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
