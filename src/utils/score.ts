import type { EndingId, Stats } from '../types/game';

/**
 * Ending resolution — the priority chain from MVP.md §5, evaluated in order:
 * Pariah → Hospitalized → Panic Spreader → Hero → Survivor (fallback).
 *
 * DEVIATION from MVP.md: the spec's `money <= 0` trigger is unreachable with
 * the spec's own event numbers (the most reckless path still leaves
 * Rp 130.000 — max total losses ≈ Rp 4.87jt of the 5jt start). Threshold
 * adjusted to ≤ Rp 200.000 so the Pariah & Bankrupt ending can actually fire;
 * all event numbers in MVP §4 remain untouched.
 */
const BANKRUPT_THRESHOLD = 200_000;

export function resolveEnding(stats: Stats, flags: string[]): EndingId {
  if (stats.money <= BANKRUPT_THRESHOLD && stats.scamCount >= 2 && stats.hoaksShareCount >= 2) {
    return 'pariah';
  }
  if (stats.health <= 20 || flags.includes('believedHealthHoax')) {
    return 'hospitalized';
  }
  if (stats.hoaksShareCount >= 3 && stats.reputation <= 20) {
    return 'panic-spreader';
  }
  if (
    stats.hoaksShareCount === 0 &&
    stats.scamCount === 0 &&
    stats.accuracy >= 75 &&
    stats.stress <= 35
  ) {
    return 'hero';
  }
  return 'survivor';
}

const ENDING_BONUS: Record<EndingId, number> = {
  hero: 500,
  survivor: 250,
  pariah: 0,
  hospitalized: 0,
  'panic-spreader': 0,
};

/**
 * Final score from Anton's condition + the ending achieved.
 * accuracy ×10, reputation ×5, savings ÷10k, fact-checks ×25, ending bonus.
 */
export function endingScoreParts(
  stats: Stats,
  endingId: EndingId,
): { accuracy: number; reputation: number; savings: number; factCheck: number; bonus: number; total: number } {
  const accuracy = stats.accuracy * 10;
  const reputation = stats.reputation * 5;
  const savings = Math.max(0, Math.floor(stats.money / 10000));
  const factCheck = stats.factCheckCount * 25;
  const bonus = ENDING_BONUS[endingId];
  return { accuracy, reputation, savings, factCheck, bonus, total: accuracy + reputation + savings + factCheck + bonus };
}

export function endingScore(stats: Stats, endingId: EndingId): number {
  return endingScoreParts(stats, endingId).total;
}
