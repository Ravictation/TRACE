import { useGame } from '../game/GameContext';

export default function VerdictPanel() {
  const { state, dispatch, currentCase } = useGame();

  const submit = () => {
    if (!state.verdictSelected || !state.actionSelected) return;
    dispatch({ type: 'SUBMIT_VERDICT' });
  };

  return (
    <div className="border-t border-border bg-panel2 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-mono text-sm font-bold tracking-wider text-text">VERDICT</h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
          What's your conclusion?
        </span>
      </div>

      {/* Conclusion options */}
      <div className="mb-3 space-y-1.5">
        {currentCase.verdict.options.map((opt) => (
          <label
            key={opt.id}
            className={`flex cursor-pointer items-center gap-2.5 rounded-md border px-3 py-2 text-sm transition ${
              state.verdictSelected === opt.id
                ? 'border-accent bg-accent/10 text-text'
                : 'border-border bg-panel text-muted hover:border-accent/50'
            }`}
          >
            <input
              type="radio"
              name="verdict"
              className="accent-accent"
              checked={state.verdictSelected === opt.id}
              onChange={() => dispatch({ type: 'SELECT_VERDICT', verdictId: opt.id })}
            />
            {opt.label}
          </label>
        ))}
      </div>

      {/* Confidence slider */}
      <div className="mb-3">
        <div className="mb-1 flex items-center justify-between font-mono text-xs">
          <span className="uppercase tracking-[0.08em] text-muted">Confidence</span>
          <span className="tabular-nums font-bold text-text">{state.confidence}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={state.confidence}
          onChange={(e) => dispatch({ type: 'SET_CONFIDENCE', value: Number(e.target.value) })}
          className="w-full accent-accent"
        />
      </div>

      {/* Action */}
      <div className="mb-4">
        <div className="mb-1 font-mono text-xs uppercase tracking-[0.08em] text-muted">
          Recommended action
        </div>
        <select
          value={state.actionSelected ?? ''}
          onChange={(e) => dispatch({ type: 'SELECT_ACTION', action: e.target.value })}
          className="w-full rounded-md border border-border bg-panel px-3 py-2 text-sm text-text outline-none focus:border-accent"
        >
          <option value="" disabled>
            Select action...
          </option>
          {currentCase.verdict.actionOptions.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={submit}
        disabled={!state.verdictSelected || !state.actionSelected}
        className="w-full rounded-lg border border-accent bg-accent/15 py-3 font-mono text-sm font-bold tracking-wider text-accent transition hover:bg-accent/25 disabled:cursor-not-allowed disabled:border-border disabled:bg-panel disabled:text-muted"
      >
        SUBMIT VERDICT
      </button>
    </div>
  );
}
