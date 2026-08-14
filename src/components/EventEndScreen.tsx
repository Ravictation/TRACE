import { useGame } from '../game/GameContext';
import { EVENTS } from '../data/events';
import { STRINGS } from '../i18n/strings';

/** Breather between events — shows the lesson, then continues to the next. */
export default function EventEndScreen() {
  const { state, dispatch, currentEvent } = useGame();
  const T = STRINGS[state.language];
  const isLast = state.eventIndex >= EVENTS[state.language].length - 1;
  const nextEvent = isLast ? null : EVENTS[state.language][state.eventIndex + 1];

  return (
    <div className="animate-fade-in mx-auto w-full max-w-2xl px-4 py-6">
      <div className="card-brutal p-6">
        <div className="mb-4 text-center">
          <div className="animate-stamp-in mx-auto flex size-14 items-center justify-center border-2 border-border bg-panel text-3xl shadow-[3px_3px_0_0_#1f1b16]">
            🌇
          </div>
          <h2 className="mt-3 font-display text-xl font-bold uppercase tracking-wide text-text">
            {T.eventEnd.done(currentEvent.number)}
          </h2>
          <p className="mt-1 font-mono text-sm text-muted">{currentEvent.title}</p>
        </div>

        <div className="border-2 border-border bg-accent/30 p-4">
          <div className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text">
            💡 {T.eventEnd.lesson}
          </div>
          <p className="font-mono text-sm leading-relaxed text-text">{currentEvent.lesson}</p>
        </div>

        <button
          onClick={() => dispatch({ type: 'CONTINUE' })}
          className="btn-brutal mt-6 w-full bg-accent px-6 py-3.5 font-mono text-sm font-bold tracking-wider text-border"
        >
          {isLast ? T.eventEnd.fate : nextEvent ? T.eventEnd.next(nextEvent.title.toUpperCase()) : T.eventEnd.fate}
        </button>
      </div>
    </div>
  );
}
