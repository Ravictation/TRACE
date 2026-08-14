import { useGame } from '../game/GameContext';
import { STRINGS } from '../i18n/strings';
import { EVENT_COUNT } from '../data/events';
import { useCountUpLocale } from '../utils/useCountUp';

/** Bar fill color by severity: high stress & low health are bad. */
function barTone(value: number, invert: boolean): string {
  const v = invert ? 100 - value : value;
  if (v >= 75) return 'bg-danger';
  if (v >= 40) return 'bg-warning';
  return 'bg-success';
}

function StatChip({
  icon,
  label,
  value,
  tone,
  children,
}: {
  icon: string;
  label: string;
  value: string;
  tone?: 'danger' | 'warning' | 'success' | 'plain';
  children?: React.ReactNode;
}) {
  const valueClass =
    tone === 'danger' ? 'text-danger' : tone === 'warning' ? 'text-warning' : tone === 'success' ? 'text-success' : 'text-text';
  return (
    <div
      className="flex min-w-0 flex-col border-2 border-border bg-panel px-2 py-1 shadow-[2px_2px_0_0_#1f1b16]"
      title={label}
    >
      <span className="truncate font-mono text-[9px] font-bold uppercase tracking-wider text-muted">
        {icon} {label}
      </span>
      {/* key remounts the span on change → tick-pop animation replays */}
      <span key={value} className={`animate-tick-pop tabular-nums font-mono text-sm font-bold ${valueClass}`}>
        {value}
      </span>
      {children}
    </div>
  );
}

function MiniBar({ percent, className }: { percent: number; className: string }) {
  return (
    <div className="mt-0.5 h-1 w-full overflow-hidden border border-border bg-bg">
      <div
        className={`h-full transition-all duration-500 ${className}`}
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
    </div>
  );
}

export default function StatsBar() {
  const { state, currentEvent } = useGame();
  const T = STRINGS[state.language];
  const { stats, step } = state;
  const locale = state.language === 'id' ? 'id-ID' : 'en-US';

  const money = useCountUpLocale(stats.money, 600, locale);
  const stepLabel =
    step === 'prologue'
      ? T.steps.prologue
      : step === 'atmo'
        ? `${T.steps.atmo} ${currentEvent.number}`
        : step === 'mg1'
          ? T.steps.mg(1)
          : step === 'mg2'
            ? T.steps.mg(2)
            : step === 'mg3'
              ? T.steps.mg(3)
              : step === 'judgement'
                ? T.steps.judgement
                : step === 'action'
                  ? T.steps.action
                  : step === 'time'
                    ? T.steps.time
                    : `${T.steps.atmo} ${currentEvent.number}`;

  const moneyTone = stats.money <= 500000 ? 'danger' : stats.money <= 1500000 ? 'warning' : 'plain';
  const stressTone = stats.stress >= 75 ? 'danger' : stats.stress >= 50 ? 'warning' : 'success';
  const healthTone = stats.health <= 25 ? 'danger' : stats.health <= 50 ? 'warning' : 'success';
  const repTone = stats.reputation <= 20 ? 'danger' : stats.reputation <= 50 ? 'warning' : 'plain';

  return (
    <div className="flex shrink-0 flex-wrap items-stretch justify-between gap-x-3 gap-y-2 border-b-2 border-border bg-panel2 px-3 py-2 md:px-4">
      <div className="flex flex-1 flex-wrap gap-2">
        <StatChip icon="💰" label={T.stats.money} value={`Rp ${money}`} tone={moneyTone} />
        <StatChip icon="🧠" label={T.stats.stress} value={`${stats.stress}%`} tone={stressTone}>
          <MiniBar percent={stats.stress} className={barTone(stats.stress, true)} />
        </StatChip>
        <StatChip icon="❤️" label={T.stats.health} value={`${stats.health}/100`} tone={healthTone}>
          <MiniBar percent={stats.health} className={barTone(stats.health, false)} />
        </StatChip>
        <StatChip icon="🌟" label={T.stats.reputation} value={`${stats.reputation}`} tone={repTone} />
        <StatChip icon="🎯" label={T.stats.accuracy} value={`${stats.accuracy}%`}>
          <MiniBar percent={stats.accuracy} className="bg-accent" />
        </StatChip>
      </div>
      <div className="flex items-center gap-2">
        <span className="border-2 border-border bg-accent px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-border">
          {T.stats.event(currentEvent.number, EVENT_COUNT)}
        </span>
        <span className="hidden border-2 border-border bg-panel px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text sm:inline">
          {stepLabel}
        </span>
      </div>
    </div>
  );
}
