import type { StatEffect, Stats } from '../types/game';
import {
  MAX_ACCURACY,
  MAX_HEALTH,
  MAX_REPUTATION,
  MAX_STRESS,
  MIN_ACCURACY,
  MIN_HEALTH,
  MIN_REPUTATION,
  MIN_STRESS,
} from '../types/game';

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

/** Apply a StatEffect to stats, clamping every bounded stat (MVP.md §2). */
export function applyEffect(stats: Stats, e: StatEffect): Stats {
  return {
    money: Math.max(0, stats.money + (e.money ?? 0)),
    stress: clamp(stats.stress + (e.stress ?? 0), MIN_STRESS, MAX_STRESS),
    health: clamp(stats.health + (e.health ?? 0), MIN_HEALTH, MAX_HEALTH),
    reputation: clamp(stats.reputation + (e.reputation ?? 0), MIN_REPUTATION, MAX_REPUTATION),
    accuracy: clamp(stats.accuracy + (e.accuracy ?? 0), MIN_ACCURACY, MAX_ACCURACY),
    scamCount: Math.max(0, stats.scamCount + (e.scam ?? 0)),
    hoaksShareCount: Math.max(0, stats.hoaksShareCount + (e.hoaksShare ?? 0)),
    factCheckCount: Math.max(0, stats.factCheckCount + (e.factCheck ?? 0)),
  };
}

/** Negate every numeric delta — used to un-apply a re-chosen option. */
export function invertEffect(e: StatEffect): StatEffect {
  const inverted: StatEffect = {};
  for (const key of ['money', 'stress', 'health', 'reputation', 'accuracy', 'scam', 'hoaksShare', 'factCheck'] as const) {
    const v = e[key];
    if (v !== undefined) inverted[key] = -v;
  }
  return inverted;
}
