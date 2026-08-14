/**
 * Playthrough simulator — verifies the 5 MVP endings are reachable and the
 * stats/flow behave per MVP.md §5. Uses the real game data & logic.
 *
 * Run:  npx esbuild scripts/simulate.ts --bundle --format=esm --outfile=scripts/simulate.mjs --platform=node && node scripts/simulate.mjs
 */
import { EVENTS } from '../src/data/events';
import { INITIAL_STATS } from '../src/types/game';
import type { Stats } from '../src/types/game';
import { applyEffect } from '../src/utils/stats';
import { endingScore, resolveEnding } from '../src/utils/score';

type Letter = 'a' | 'b' | 'c';

interface Result {
  stats: Stats;
  flags: string[];
  ending: string;
  score: number;
}

/** 5 events × 6 choice steps (mg1, mg2, mg3, judgement, action, time) = 30 picks. */
function play(letters: Letter[]): Result {
  let stats: Stats = { ...INITIAL_STATS };
  let flags: string[] = [];
  let k = 0;
  for (const event of EVENTS.id) {
    const steps = [
      event.miniGames[0].options,
      event.miniGames[1].options,
      event.miniGames[2].options,
      event.judgement.options,
      event.action.options,
      event.timeChoice.options,
    ];
    for (const options of steps) {
      const opt = options.find((o) => o.id === letters[k]);
      if (!opt) throw new Error(`Missing option ${letters[k]} at pick #${k}`);
      k += 1;
      stats = applyEffect(stats, opt.effect);
      flags = [...flags, ...(opt.effect.flags ?? [])];
    }
  }
  const ending = resolveEnding(stats, flags);
  return { stats, flags, ending, score: endingScore(stats, ending) };
}

const EVENTS_PER = EVENTS.id.length;
const PICKS = EVENTS_PER * 6;

function repeat(letter: Letter): Letter[] {
  return Array.from({ length: PICKS }, () => letter);
}

/** Build a path: per-event letter map, default 'b'. */
function path(map: Partial<Record<number, Letter[]>>): Letter[] {
  const letters: Letter[] = [];
  for (let ev = 1; ev <= EVENTS_PER; ev++) {
    const perEvent = map[ev] ?? ['b', 'b', 'b', 'b', 'b', 'b'];
    if (perEvent.length !== 6) throw new Error(`Event ${ev} needs 6 picks`);
    letters.push(...perEvent);
  }
  return letters;
}

function report(label: string, r: Result, expect: string) {
  const ok = r.ending === expect ? 'PASS' : 'FAIL';
  console.log(
    `[${ok}] ${label}\n` +
      `      ending=${r.ending} (expected ${expect}) | money=${r.stats.money.toLocaleString('id-ID')} | stress=${r.stats.stress} | health=${r.stats.health} | rep=${r.stats.reputation} | acc=${r.stats.accuracy}\n` +
      `      scam=${r.stats.scamCount} hoaks=${r.stats.hoaksShareCount} factCheck=${r.stats.factCheckCount} flags=${r.flags.join(',') || '-'} score=${r.score}`,
  );
  return ok;
}

let failures = 0;

// 1) Perfect play — the fact-checking option of every step (letter varies per
//    MVP: E4 & E5 mini-games put the correct option at [A]) → Hero.
const perfect = play(
  path({
    1: ['b', 'b', 'b', 'b', 'b', 'b'],
    2: ['b', 'a', 'b', 'b', 'c', 'b'], // MG2 good=A; action C = klarifikasi WAG (+rep)
    3: ['b', 'b', 'b', 'b', 'b', 'b'],
    4: ['a', 'a', 'a', 'b', 'b', 'b'], // E4 MGs good=A
    5: ['a', 'a', 'a', 'b', 'b', 'b'], // E5 MGs good=A
  }),
);
failures += report('Perfect play', perfect, 'hero') ? 0 : 1;

// 2) Worst play — believe everything, act on it → Hospitalized (flag) or worse.
failures += report('Worst play (all A)', play(repeat('a')), 'hospitalized') ? 0 : 1;

// 3) Panic spreader — share hoaxes in E2 & E5 while dodging rep-gaining and
//    health-flag options → hoaks=3 & rep=0, but family healthy & no scam.
const panic = play(
  path({
    1: ['b', 'b', 'b', 'b', 'c', 'c'], // hindari rep +10/+5 dari action/time B
    2: ['b', 'a', 'b', 'b', 'a', 'c'], // action A: borong beras (hoaks+1)
    3: ['b', 'b', 'b', 'b', 'b', 'c'], // time C: tanpa rep +10
    4: ['a', 'a', 'a', 'b', 'b', 'b'], // sehat, tidak percaya hoaks sirup
    5: ['a', 'a', 'a', 'b', 'a', 'a'], // action A + time A (hoaks+2)
  }),
);
failures += report('Panic spreader path', panic, 'panic-spreader') ? 0 : 1;

// 4) Health-believer path — trust the syrup hoax → Hospitalized.
const health = play(
  path({
    4: ['b', 'b', 'b', 'a', 'b', 'b'], // E4: vonis "obat beracun" → believedHealthHoax
  }),
);
failures += report('Believes health hoax', health, 'hospitalized') ? 0 : 1;

// 5) A mixed, mediocre run → Survivor (fallback).
const survivor = play(
  path({
    1: ['b', 'a', 'b', 'c', 'b', 'b'],
    2: ['a', 'b', 'c', 'c', 'b', 'c'],
    3: ['c', 'b', 'b', 'b', 'c', 'b'],
    4: ['b', 'b', 'a', 'b', 'b', 'c'],
    5: ['c', 'b', 'c', 'c', 'c', 'c'],
  }),
);
failures += report('Mediocre mixed path', survivor, 'survivor') ? 0 : 1;

// 6) Pariah & bankrupt path — the most reckless playthrough: every
//    money-draining option plus hoax shares in E2 & E5. Money floor is
//    Rp 130.000 — the ending fires on the adjusted trigger (≤ Rp 200.000,
//    deviation from MVP's unreachable `money <= 0`, see utils/score.ts).
const pariah = play(
  path({
    1: ['c', 'b', 'b', 'b', 'a', 'a'], // -20k telpon, -300k transfer, -50k buru-buru
    2: ['b', 'b', 'b', 'b', 'a', 'a'], // -1.5jt borong (hoaks+1), -100k buru-buru
    3: ['b', 'b', 'b', 'b', 'a', 'a'], // -2jt transfer (scam+1), -200k panik (scam+1)
    4: ['b', 'c', 'b', 'b', 'c', 'b'], // -200k IGD, -500k herbal
    5: ['b', 'b', 'b', 'b', 'a', 'a'], // broadcast mentah + broadcast panik (hoaks+2)
  }),
);
failures += report('Pariah & bankrupt path', pariah, 'pariah') ? 0 : 1;

console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
