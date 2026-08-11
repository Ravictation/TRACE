import { useState } from 'react';
import { useGame } from '../game/GameContext';
import { CASES } from '../data/cases';
import { STRINGS } from '../i18n/strings';
import type { Lang } from '../types/game';
import { getTutorialDone, setTutorialDone } from '../utils/storage';
import LeaderboardModal from './LeaderboardModal';
import Mascot from './Mascot';
import TutorialModal from './TutorialModal';

export default function IntroScreen() {
  const { state, dispatch, currentCase } = useGame();
  const T = STRINGS[state.language];
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  // Auto-open the tutorial on first visit; afterwards only via the button.
  const [showTutorial, setShowTutorial] = useState(() => !getTutorialDone());

  const solvedCount = state.completedResults.filter(Boolean).length;
  const hasProgress = solvedCount > 0 || state.phase === 'investigating';
  const total = CASES[state.language].length;

  const switchLang = (lang: Lang) => {
    if (lang !== state.language) dispatch({ type: 'SET_LANGUAGE', language: lang });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center overflow-y-auto bg-bg px-6 py-10">
      <div className="animate-fade-in w-full max-w-md text-center">
        <h1 className="font-display text-6xl font-bold tracking-[0.06em] text-text [text-shadow:4px_4px_0_var(--color-accent)] md:text-7xl">
          {'TRACE'.split('').map((ch, i) => (
            <span
              key={i}
              className="animate-stamp-in inline-block"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {ch}
            </span>
          ))}
        </h1>
        <div
          className="animate-fade-in mt-4 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: '450ms' }}
        >
          <p className="font-mono text-sm font-bold tracking-wide text-text">{T.intro.tagline}</p>
          <Mascot size={6} />
        </div>

        <div className="animate-fade-in my-8 h-2 w-full border-2 border-border bg-accent shadow-[4px_4px_0_0_#1f1b16]" style={{ animationDelay: '550ms' }} />

        {/* Language toggle — only available on the intro screen */}
        <div
          className="animate-fade-in mb-5 flex items-center justify-center gap-2"
          style={{ animationDelay: '600ms' }}
          aria-label={T.intro.langLabel}
        >
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
            {T.intro.langLabel}
          </span>
          <div className="flex border-2 border-border bg-panel shadow-[2px_2px_0_0_#1f1b16]">
            {(['id', 'en'] as Lang[]).map((lang) => (
              <button
                key={lang}
                onClick={() => switchLang(lang)}
                className={`px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider transition ${
                  state.language === lang
                    ? 'bg-accent text-border'
                    : 'text-muted hover:bg-accent/30 hover:text-border'
                }`}
              >
                {lang === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}
              </button>
            ))}
          </div>
        </div>

        {hasProgress && (
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="border-2 border-border bg-accent px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-border">
              {T.intro.progress(solvedCount, total)}
            </span>
          </div>
        )}

        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="border-2 border-border bg-accent px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-border">
            {T.intro.caseOf(currentCase.caseNumber, total)}
          </span>
          <span className="size-1.5 border border-border bg-text" />
          <span className="border-2 border-border bg-panel px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text">
            {currentCase.title}
          </span>
        </div>

        <div className="card-brutal space-y-4 p-5 text-left font-mono text-sm leading-relaxed text-text">
          {currentCase.intro.map((line, i) => (
            <p key={i} className={i === 0 ? 'font-bold text-text' : 'text-muted'}>
              {line}
            </p>
          ))}
        </div>

        <button
          onClick={() =>
            dispatch(
              hasProgress
                ? { type: 'START_CASE', caseIndex: state.caseIndex }
                : { type: 'START_CASE', caseIndex: 0 },
            )
          }
          className="btn-brutal mt-8 w-full bg-accent px-6 py-4 font-mono text-sm font-bold tracking-wider text-border"
        >
          {hasProgress ? T.intro.continue(state.caseIndex + 1) : T.intro.start}
        </button>

        <button
          onClick={() => setShowTutorial(true)}
          className="btn-brutal mt-3 w-full bg-panel py-2.5 font-mono text-xs font-bold text-text transition hover:bg-accent/30"
        >
          {T.tutorial.introButton}
        </button>

        <div className="mt-3 flex gap-3">
          <button
            onClick={() => setShowLeaderboard(true)}
            className="btn-brutal flex-1 bg-panel py-3 font-mono text-xs font-bold text-text"
          >
            {T.intro.leaderboard}
          </button>
          {hasProgress && (
            <button
              onClick={() => dispatch({ type: 'CLEAR_PROGRESS' })}
              className="btn-brutal flex-1 bg-panel py-3 font-mono text-xs font-bold text-muted"
            >
              {T.intro.reset}
            </button>
          )}
        </div>
      </div>

      {showLeaderboard && <LeaderboardModal onClose={() => setShowLeaderboard(false)} />}
      {showTutorial && (
        <TutorialModal
          onClose={() => {
            setShowTutorial(false);
            setTutorialDone();
          }}
        />
      )}
    </div>
  );
}
