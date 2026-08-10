import { useGame } from '../game/GameContext';
import { CASES } from '../data/cases';

export default function DebriefOverlay() {
  const { state, dispatch, currentCase } = useGame();
  const d = currentCase.debrief;
  const isCorrect =
    state.verdictSelected === currentCase.verdict.correctVerdictId &&
    state.actionSelected === currentCase.verdict.correctAction;
  const hasNext = state.caseIndex < CASES.length - 1;

  const minutes = Math.floor(state.elapsedSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (state.elapsedSeconds % 60).toString().padStart(2, '0');
  const sharesStopped = Math.max(0, currentCase.viralPost.threshold - state.shareCount);

  const stats = [
    { label: d.stats.timeLabel, value: `${minutes}:${seconds}` },
    { label: d.stats.accuracyLabel, value: isCorrect ? '✅ Correct' : '⚠ Partly wrong' },
    { label: d.stats.toolsLabel, value: `${state.discoveredClues.length}` },
    { label: d.stats.sharesStoppedLabel, value: sharesStopped.toLocaleString() },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-bg/90 p-4 backdrop-blur-sm">
      <div className="animate-fade-in w-full max-w-lg rounded-xl border border-border bg-panel p-6 shadow-card">
        <div className="mb-4 text-center">
          <div className="text-4xl">{isCorrect ? '✅' : '⚠️'}</div>
          <h2 className="mt-2 font-mono text-lg font-black tracking-wider text-text">
            CASE {currentCase.caseNumber} RESOLVED
          </h2>
          <p className="mt-1 font-mono text-sm text-muted">{d.headline}</p>
        </div>

        <div className="mb-4 rounded-lg border border-accent/30 bg-accent/5 p-4">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-accent">
            You just used
          </div>
          <ul className="space-y-1.5 font-mono text-xs leading-relaxed text-text">
            <li className="flex gap-2">
              <span className="font-black text-accent">S</span> {d.sift.s}
            </li>
            <li className="flex gap-2">
              <span className="font-black text-accent">I</span> {d.sift.i}
            </li>
            <li className="flex gap-2">
              <span className="font-black text-accent">F</span> {d.sift.f}
            </li>
            <li className="flex gap-2">
              <span className="font-black text-accent">T</span> {d.sift.t}
            </li>
          </ul>
        </div>

        <div className="mb-4 rounded-lg border border-border bg-panel2 p-4">
          <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-warning">
            Real-world takeaway
          </div>
          <p className="font-mono text-xs leading-relaxed text-text">{d.realWorldTakeaway}</p>
        </div>

        <div className="mb-6 grid grid-cols-4 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-md border border-border bg-panel2 p-2 text-center">
              <div className="tabular-nums font-mono text-sm font-bold text-text">{s.value}</div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-muted">{s.label}</div>
            </div>
          ))}
        </div>

        {hasNext ? (
          <div className="space-y-2">
            <button
              onClick={() => dispatch({ type: 'NEXT_CASE' })}
              className="w-full rounded-lg border border-accent bg-accent/10 py-3 font-mono text-sm font-bold tracking-wider text-accent transition hover:bg-accent/20"
            >
              NEXT CASE: {CASES[state.caseIndex + 1].title.toUpperCase()} →
            </button>
            <button
              onClick={() => dispatch({ type: 'RESET' })}
              className="w-full rounded-lg border border-border py-2 font-mono text-xs text-muted transition hover:text-text"
            >
              Back to start
            </button>
          </div>
        ) : (
          <button
            onClick={() => dispatch({ type: 'RESET' })}
            className="w-full rounded-lg border border-accent bg-accent/10 py-3 font-mono text-sm font-bold tracking-wider text-accent transition hover:bg-accent/20"
          >
            PLAY AGAIN
          </button>
        )}
      </div>
    </div>
  );
}
