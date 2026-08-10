import { useGame } from '../game/GameContext';
import { useCountUpLocale } from '../utils/useCountUp';

export default function StatusBar() {
  const { state, currentCase } = useGame();

  const minutes = Math.floor(state.elapsedSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (state.elapsedSeconds % 60).toString().padStart(2, '0');
  const shareRatio = state.shareCount / currentCase.viralPost.threshold;
  const shareCount = useCountUpLocale(state.shareCount);

  const counterClass =
    shareRatio >= 0.9
      ? 'animate-pulse-danger font-mono font-bold'
      : shareRatio >= 0.7
        ? 'animate-pulse-warning font-mono font-bold'
        : 'font-mono font-bold text-text';

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-border bg-panel2 px-3 py-2 text-sm md:px-4">
      <div className="flex items-center gap-4">
        <span className="tabular-nums flex items-center gap-1.5 font-mono text-text">
          <span aria-hidden>⏱</span> {minutes}:{seconds}
        </span>
        <span className={`tabular-nums flex items-center gap-1.5 ${counterClass}`}>
          <span aria-hidden>📊</span>
          {shareCount} shares
          <span className="text-xs font-normal text-muted">(+{currentCase.viralPost.shareRate}/min)</span>
        </span>
      </div>
      <div className="flex items-center gap-2" title="Focus points — each tool use costs 1">
        <span className="font-mono text-xs text-muted">CASE {currentCase.caseNumber}</span>
        <span className="hidden font-mono text-[10px] text-muted sm:inline">·</span>
        <span className="font-mono text-xs text-muted">FOCUS</span>
        <div className="flex gap-1">
          {Array.from({ length: state.maxFocusPoints }).map((_, i) => (
            <span
              key={i}
              className={`size-2.5 rounded-full ${
                i < state.focusPoints ? 'bg-accent' : 'bg-border'
              }`}
            />
          ))}
        </div>
        <span className="font-mono text-xs text-muted">
          {state.focusPoints}/{state.maxFocusPoints}
        </span>
      </div>
    </div>
  );
}
