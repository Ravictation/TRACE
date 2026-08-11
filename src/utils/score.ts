import type { CaseData } from '../types/game';

/**
 * Score parts: accuracy base + speed bonus + shares prevented.
 * Faster verdicts score higher (speed bonus shrinks 3 pts per second).
 * Used both to compute the final score and to show the breakdown in debrief.
 */
export function scoreParts(
  c: CaseData,
  correct: boolean,
  elapsedSeconds: number,
  shareCount: number,
): { base: number; speed: number; prevented: number; total: number } {
  const base = correct ? 1000 : 250;
  const speed = Math.max(0, 300 - elapsedSeconds * 3);
  const prevented = Math.max(0, Math.floor((c.viralPost.threshold - shareCount) / 1000));
  return { base, speed, prevented, total: base + speed + prevented };
}
