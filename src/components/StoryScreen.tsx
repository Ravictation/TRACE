import { useGame } from '../game/GameContext';
import { PROLOGUE } from '../data/story';
import { STRINGS } from '../i18n/strings';

/** Narrative screen — shows the prologue or an event's atmosphere. */
export default function StoryScreen() {
  const { state, dispatch, currentEvent } = useGame();
  const T = STRINGS[state.language];
  const isPrologue = state.step === 'prologue';
  const paragraphs = isPrologue ? PROLOGUE[state.language] : currentEvent.atmosphere;

  return (
    <div className="animate-fade-in mx-auto w-full max-w-2xl px-4 py-6">
      <div className="card-brutal p-6">
        {/* Header chip */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="border-2 border-border bg-accent px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-border">
            {isPrologue ? T.steps.prologue : `${T.steps.atmo} ${currentEvent.number} — ${currentEvent.time}`}
          </span>
          {!isPrologue && (
            <>
              <span className="border-2 border-border bg-panel px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text">
                {currentEvent.tag}
              </span>
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-text">
                {currentEvent.title}
              </h2>
            </>
          )}
        </div>

        {/* Narrative */}
        <div className="space-y-4 font-mono text-sm leading-relaxed text-text">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className={`animate-fade-in ${i === 0 ? 'font-bold' : ''}`}
              style={{ animationDelay: `${i * 180}ms` }}
            >
              {p}
            </p>
          ))}
        </div>

        <button
          onClick={() => dispatch({ type: 'CONTINUE' })}
          className="btn-brutal mt-6 w-full bg-accent px-6 py-3.5 font-mono text-sm font-bold tracking-wider text-border"
        >
          {T.story.continue}
        </button>
      </div>
    </div>
  );
}
