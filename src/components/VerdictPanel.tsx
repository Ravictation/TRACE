import { useGame } from '../game/GameContext';
import { STRINGS } from '../i18n/strings';

export default function VerdictPanel() {
  const { state, dispatch, currentCase } = useGame();
  const T = STRINGS[state.language];

  const submit = () => {
    if (!state.verdictSelected || !state.actionSelected) return;
    dispatch({ type: 'SUBMIT_VERDICT' });
  };

  return (
    <div className="border-t-2 border-border bg-panel2 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-base font-bold uppercase tracking-wide text-text">
          {T.verdict.heading}
        </h3>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-muted">
          {T.verdict.prompt}
        </span>
      </div>

      {/* Conclusion options */}
      <div className="mb-3 space-y-2">
        {currentCase.verdict.options.map((opt) => {
          const isSelected = state.verdictSelected === opt.id;
          return (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-center gap-2.5 border-2 border-border px-3 py-2 text-sm transition ${
                isSelected
                  ? 'bg-accent text-border shadow-[2px_2px_0_0_#1f1b16]'
                  : 'bg-panel text-text hover:bg-accent/30'
              }`}
            >
              <input
                type="radio"
                name="verdict"
                className="accent-border"
                checked={isSelected}
                onChange={() => dispatch({ type: 'SELECT_VERDICT', verdictId: opt.id })}
              />
              {opt.label}
            </label>
          );
        })}
      </div>

      {/* Action */}
      <div className="mb-4">
        <div className="mb-1 font-mono text-xs font-bold uppercase tracking-[0.08em] text-muted">
          {T.verdict.recommendedAction}
        </div>
        <select
          value={state.actionSelected ?? ''}
          onChange={(e) => dispatch({ type: 'SELECT_ACTION', action: e.target.value })}
          className="w-full border-2 border-border bg-panel px-3 py-2 text-sm text-text outline-none focus:outline-3 focus:outline-focus"
        >
          <option value="" disabled>
            {T.verdict.selectAction}
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
        className="btn-brutal w-full bg-accent py-3 font-mono text-sm font-bold tracking-wider text-border disabled:cursor-not-allowed disabled:bg-panel disabled:text-muted disabled:shadow-none"
      >
        {T.verdict.submit}
      </button>
    </div>
  );
}
