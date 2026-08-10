import { useGame } from '../game/GameContext';
import { CASES } from '../data/cases';

export default function IntroScreen() {
  const { dispatch, currentCase } = useGame();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-bg px-6">
      <div className="animate-fade-in w-full max-w-md text-center">
        <h1 className="font-mono text-5xl font-bold tracking-[0.2em] text-text md:text-6xl">
          T<span className="text-accent">R</span>ACE
        </h1>
        <p className="mt-3 font-mono text-sm tracking-wide text-muted">
          Every claim leaves a trace.
        </p>

        <div className="my-8 border-t border-border" />

        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
            Case {currentCase.caseNumber} of {CASES.length}
          </span>
          <span className="size-1 rounded-full bg-border" />
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            {currentCase.title}
          </span>
        </div>

        <div className="space-y-4 text-left font-mono text-sm leading-relaxed text-text">
          {currentCase.intro.map((line, i) => (
            <p key={i} className={i === 0 ? 'font-bold text-accent' : ''}>
              {line}
            </p>
          ))}
        </div>

        <button
          onClick={() => dispatch({ type: 'START_CASE', caseIndex: 0 })}
          className="mt-10 w-full rounded-lg border border-accent bg-accent/10 px-6 py-3.5 font-mono text-sm font-bold tracking-wider text-accent transition hover:bg-accent/20"
        >
          START INVESTIGATION
        </button>
      </div>
    </div>
  );
}
