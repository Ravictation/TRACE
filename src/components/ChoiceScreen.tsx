import { useGame } from '../game/GameContext';
import { STRINGS } from '../i18n/strings';
import { effectChips } from '../utils/format';
import type { ChoiceOption, EventData, StepId } from '../types/game';
import type { UiStrings } from '../i18n/strings';

const LETTERS = ['A', 'B', 'C'];

interface StepView {
  heading: string;
  subtitle?: string;
  text: string;
  options: ChoiceOption[];
}

/** Map the current step to its prompt + options (mg1-3 / judgement / action / time). */
function resolveView(step: StepId, e: EventData, T: UiStrings): StepView | null {
  switch (step) {
    case 'mg1':
      return { heading: T.steps.mg(1), subtitle: e.miniGames[0].title, text: e.miniGames[0].flavor, options: e.miniGames[0].options };
    case 'mg2':
      return { heading: T.steps.mg(2), subtitle: e.miniGames[1].title, text: e.miniGames[1].flavor, options: e.miniGames[1].options };
    case 'mg3':
      return { heading: T.steps.mg(3), subtitle: e.miniGames[2].title, text: e.miniGames[2].flavor, options: e.miniGames[2].options };
    case 'judgement':
      return { heading: T.steps.judgement, text: e.judgement.prompt, options: e.judgement.options };
    case 'action':
      return { heading: T.steps.action, text: e.action.prompt, options: e.action.options };
    case 'time':
      return { heading: T.steps.time, text: e.timeChoice.prompt, options: e.timeChoice.options };
    default:
      return null;
  }
}

export default function ChoiceScreen() {
  const { state, dispatch, currentEvent } = useGame();
  const T = STRINGS[state.language];

  const view = resolveView(state.step, currentEvent, T);
  if (!view) return null;

  const chosen = view.options.find((o) => o.id === state.chosenOption) ?? null;

  return (
    <div className="animate-fade-in mx-auto w-full max-w-2xl px-4 py-6">
      <div className="card-brutal p-6">
        {/* Step header */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="border-2 border-border bg-accent px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-border">
            {view.heading}
          </span>
          {view.subtitle && (
            <span className="border-2 border-border bg-panel px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text">
              {view.subtitle}
            </span>
          )}
        </div>

        {/* Prompt / flavor */}
        <p className="mb-1 font-mono text-sm leading-relaxed text-text">{view.text}</p>
        <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
          {T.choice.pick}
        </p>

        {/* Options */}
        <div className="space-y-2">
          {view.options.map((opt, i) => {
            const isChosen = state.chosenOption === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => dispatch({ type: 'CHOOSE', optionId: opt.id })}
                className={`flex w-full cursor-pointer items-start gap-3 border-2 border-border px-3 py-2.5 text-left transition ${
                  isChosen
                    ? 'bg-accent text-border shadow-[3px_3px_0_0_#1f1b16]'
                    : state.chosenOption
                      ? 'bg-panel text-text opacity-45 hover:opacity-80'
                      : 'bg-panel text-text hover:bg-accent/30'
                }`}
              >
                <span
                  className={`mt-0.5 flex size-6 shrink-0 items-center justify-center border-2 border-border font-mono text-xs font-black ${
                    isChosen ? 'bg-bg text-accent' : 'bg-panel2 text-text'
                  }`}
                >
                  {LETTERS[i]}
                </span>
                <span className="font-mono text-sm leading-snug">{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Applied result — appears once an option is chosen */}
        {chosen && (
          <div className="animate-pop-in mt-4 border-2 border-border bg-panel2 p-4">
            <div className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
              {T.choice.applied}
            </div>
            <p className="font-mono text-sm font-bold text-text">{chosen.label}</p>
            <p className="mt-1 font-mono text-xs italic leading-relaxed text-muted">
              “{chosen.outcome}”
            </p>

            {/* Stat deltas — revealed only after choosing */}
            <div className="mt-3 flex flex-wrap gap-2">
              {effectChips(chosen.effect, state.language).map((chip, i) => (
                <span
                  key={i}
                  className={`border-2 px-2 py-0.5 font-mono text-[11px] font-bold ${
                    chip.tone === 'good'
                      ? 'border-success bg-success/10 text-success'
                      : 'border-danger bg-danger/10 text-danger'
                  }`}
                >
                  {chip.icon} {chip.text}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => dispatch({ type: 'CONTINUE' })}
                className="btn-brutal flex-1 bg-accent px-6 py-3 font-mono text-sm font-bold tracking-wider text-border"
              >
                {T.choice.continue}
              </button>
              <span className="font-mono text-[10px] text-muted">{T.choice.change}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
