import type { EventData, EventSelections, StatEffect, Stats } from '../types/game';
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

const EFFECT_KEYS = ['money', 'stress', 'health', 'reputation', 'accuracy', 'scam', 'hoaksShare', 'factCheck'] as const;

/**
 * Net delta across an event's six picks (before clamping) — shown on the
 * "Event n Selesai" screen as the impact summary.
 */
export function aggregateEffect(event: EventData, selections: EventSelections): StatEffect {
  const net: StatEffect = {};
  const slots: { options: { id: string; effect: StatEffect }[] }[] = [
    event.miniGames[0],
    event.miniGames[1],
    event.miniGames[2],
    event.judgement,
    event.action,
    event.timeChoice,
  ];
  const pickedIds = [selections.mg1, selections.mg2, selections.mg3, selections.judgement, selections.action, selections.time];
  for (let i = 0; i < slots.length; i++) {
    const opt = slots[i].options.find((o) => o.id === pickedIds[i]);
    if (!opt) continue;
    for (const key of EFFECT_KEYS) {
      const v = opt.effect[key];
      if (v !== undefined && v !== 0) net[key] = (net[key] ?? 0) + v;
    }
  }
  return net;
}
