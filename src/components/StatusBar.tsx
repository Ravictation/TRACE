import { useEffect, useRef, useState } from 'react';
import { useGame } from '../game/GameContext';
import { STRINGS } from '../i18n/strings';
import { useCountUpLocale } from '../utils/useCountUp';

export default function StatusBar() {
  const { state, currentCase } = useGame();
  const T = STRINGS[state.language];

  const minutes = Math.floor(state.elapsedSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (state.elapsedSeconds % 60).toString().padStart(2, '0');
  const shareRatio = state.shareCount / currentCase.viralPost.threshold;
  const shareCount = useCountUpLocale(state.shareCount);

  const counterChip =
    shareRatio >= 0.9
      ? 'animate-pulse-danger bg-danger text-white'
      : shareRatio >= 0.7
        ? 'animate-pulse-warning bg-warning text-white'
        : 'bg-accent text-border';

  // Pop the chip once when the urgency tier changes
  const tierRef = useRef(0);
  const [tierPop, setTierPop] = useState(0);
  useEffect(() => {
    const tier = shareRatio >= 0.9 ? 2 : shareRatio >= 0.7 ? 1 : 0;
    if (tier !== tierRef.current) {
      tierRef.current = tier;
      setTierPop((n) => n + 1);
    }
  }, [shareRatio]);

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b-2 border-border bg-panel2 px-3 py-2 text-sm md:px-4">
      <div className="flex items-center gap-3">
        <span className="tabular-nums flex items-center gap-1.5 border-2 border-border bg-panel px-2 py-0.5 font-mono text-text shadow-[2px_2px_0_0_#1f1b16]">
          <span aria-hidden>⏱</span> {minutes}:{seconds}
        </span>
        <span
          key={tierPop}
          className={`tabular-nums flex items-center gap-1.5 border-2 border-border px-2 py-0.5 font-mono font-bold shadow-[2px_2px_0_0_#1f1b16] ${counterChip} ${
            tierPop > 0 ? 'animate-tick-pop' : ''
          }`}
        >
          <span aria-hidden>📊</span>
          {shareCount} {T.statusBar.shares}
          <span className="text-xs font-normal text-border/70">(+{currentCase.viralPost.shareRate}{T.statusBar.perMin})</span>
        </span>
      </div>
      <div className="flex items-center gap-2" title={T.statusBar.focusTooltip}>
        <span className="font-mono text-xs font-bold text-text">{T.statusBar.case} {currentCase.caseNumber}</span>
        <span className="hidden font-mono text-[10px] text-muted sm:inline">·</span>
        <span className="font-mono text-xs font-bold text-text">{T.statusBar.focus}</span>
        <div className="flex gap-1">
          {Array.from({ length: state.maxFocusPoints }).map((_, i) => (
            <span
              key={i}
              className={`size-2.5 border-2 border-border ${
                i < state.focusPoints ? 'bg-accent' : 'bg-panel'
              }`}
            />
          ))}
        </div>
        <span className="tabular-nums font-mono text-xs text-muted">
          {state.focusPoints}/{state.maxFocusPoints}
        </span>
      </div>
    </div>
  );
}
