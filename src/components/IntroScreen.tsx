import { useState } from 'react';
import { useGame } from '../game/GameContext';
import { EVENT_COUNT } from '../data/events';
import { CHARACTER } from '../data/story';
import { STRINGS } from '../i18n/strings';
import type { Lang } from '../types/game';
import { getTutorialDone, setTutorialDone } from '../utils/storage';
import LeaderboardModal from './LeaderboardModal';
import Mascot from './Mascot';
import TutorialModal from './TutorialModal';

export default function IntroScreen() {
  const { state, dispatch } = useGame();
  const T = STRINGS[state.language];
  const character = CHARACTER[state.language];
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  // Auto-open the tutorial on first visit; afterwards only via the button.
  const [showTutorial, setShowTutorial] = useState(() => !getTutorialDone());

  const hasProgress = state.eventIndex > 0 || state.step !== 'prologue';

  const switchLang = (lang: Lang) => {
    if (lang !== state.language) dispatch({ type: 'SET_LANGUAGE', language: lang });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center overflow-y-auto bg-bg px-6 py-10">
      <div className="animate-fade-in w-full max-w-md text-center">
        <h1 className="font-display text-4xl font-bold tracking-[0.04em] text-text [text-shadow:4px_4px_0_var(--color-accent)] md:text-5xl">
          {'HOAX DEFENDER'.split('').map((ch, i) => (
            <span
              key={i}
              className="animate-stamp-in inline-block"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </h1>
        <div
          className="animate-fade-in mt-3 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: '450ms' }}
        >
          <p className="font-mono text-sm font-bold tracking-wide text-text">
            {T.intro.subtitle}
          </p>
          <Mascot size={6} />
        </div>
        <p className="animate-fade-in mt-2 font-mono text-xs text-muted" style={{ animationDelay: '550ms' }}>
          {T.intro.tagline}
        </p>

        <div className="animate-fade-in my-6 h-2 w-full border-2 border-border bg-accent shadow-[4px_4px_0_0_#1f1b16]" style={{ animationDelay: '650ms' }} />

        {/* Language toggle — only available on the intro screen */}
        <div
          className="animate-fade-in mb-4 flex items-center justify-center gap-2"
          style={{ animationDelay: '700ms' }}
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

        {/* Anton's character card */}
        <div className="card-brutal mb-4 space-y-3 p-5 text-left">
          <div className="border-b-2 border-border pb-2">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
              {T.intro.meetLabel}
            </div>
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-text">
              {character.name}
            </h2>
            <p className="font-mono text-xs text-muted">{character.tagline}</p>
          </div>
          <ul className="space-y-1.5">
            {character.facts.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0">{f.icon}</span>
                <p className="font-mono text-[11px] leading-snug text-text">
                  <span className="font-bold">{f.label}:</span> {f.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {hasProgress && (
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="border-2 border-border bg-accent px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-border">
              {T.intro.eventOf(state.eventIndex + 1, EVENT_COUNT)}
            </span>
          </div>
        )}

        <button
          onClick={() => dispatch({ type: 'START_GAME' })}
          className="btn-brutal mt-2 w-full bg-accent px-6 py-4 font-mono text-sm font-bold tracking-wider text-border"
        >
          {hasProgress ? T.intro.continue(state.eventIndex + 1) : T.intro.start}
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
