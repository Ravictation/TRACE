import { STRINGS } from '../i18n/strings';
import type { Lang, StatEffect } from '../types/game';

const LOCALES: Record<Lang, string> = { id: 'id-ID', en: 'en-US' };

export function formatMoney(n: number, lang: Lang): string {
  return `Rp ${n.toLocaleString(LOCALES[lang])}`;
}

export interface EffectChip {
  icon: string;
  text: string;
  tone: 'good' | 'bad';
}

function signed(n: number): string {
  return n > 0 ? `+${n}` : `${n}`;
}

/** Deltas that IMPROVE the player's situation are good, others bad. */
function toneFor(delta: number, goodWhenPositive: boolean): 'good' | 'bad' {
  const good = delta > 0 ? goodWhenPositive : !goodWhenPositive;
  return good ? 'good' : 'bad';
}

/**
 * Turn a StatEffect into displayable delta chips (hidden from the player
 * until AFTER choosing — the choice list itself shows no numbers).
 */
export function effectChips(effect: StatEffect, lang: Lang): EffectChip[] {
  const T = STRINGS[lang];
  const chips: EffectChip[] = [];

  if (effect.money !== undefined && effect.money !== 0) {
    chips.push({ icon: '💰', text: formatMoney(effect.money, lang), tone: effect.money > 0 ? 'good' : 'bad' });
  }
  if (effect.stress !== undefined && effect.stress !== 0) {
    chips.push({ icon: '🧠', text: `${signed(effect.stress)}% ${T.stats.stress.toLowerCase()}`, tone: toneFor(effect.stress, false) });
  }
  if (effect.health !== undefined && effect.health !== 0) {
    chips.push({ icon: '❤️', text: `${signed(effect.health)} ${T.stats.health}`, tone: toneFor(effect.health, true) });
  }
  if (effect.reputation !== undefined && effect.reputation !== 0) {
    chips.push({ icon: '🌟', text: `${signed(effect.reputation)} ${T.stats.reputation}`, tone: toneFor(effect.reputation, true) });
  }
  if (effect.accuracy !== undefined && effect.accuracy !== 0) {
    chips.push({ icon: '🎯', text: `${signed(effect.accuracy)}% ${T.stats.accuracy}`, tone: toneFor(effect.accuracy, true) });
  }
  if (effect.scam !== undefined && effect.scam !== 0) {
    chips.push({ icon: '🚨', text: `${T.effects.scam} ${signed(effect.scam)}`, tone: 'bad' });
  }
  if (effect.hoaksShare !== undefined && effect.hoaksShare !== 0) {
    chips.push({ icon: '📣', text: `${T.effects.hoaksShare} ${signed(effect.hoaksShare)}`, tone: 'bad' });
  }
  if (effect.factCheck !== undefined && effect.factCheck !== 0) {
    chips.push({ icon: '✅', text: `${T.effects.factCheck} ${signed(effect.factCheck)}`, tone: 'good' });
  }
  return chips;
}
