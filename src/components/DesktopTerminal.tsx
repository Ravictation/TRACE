import { useGame } from '../game/GameContext';
import { STRINGS } from '../i18n/strings';
import Mascot from './Mascot';
import StatusBar from './StatusBar';
import SocialFeed from './SocialFeed';
import InvestigationPanel from './InvestigationPanel';
import IntroScreen from './IntroScreen';
import DebriefOverlay from './DebriefOverlay';
import ClueToast from './ClueToast';

export default function DesktopTerminal() {
  const { state, dispatch, currentCase } = useGame();
  const T = STRINGS[state.language];

  if (state.phase === 'intro') return <IntroScreen />;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bg">
      {/* Black masthead bar */}
      <header className="flex shrink-0 items-center justify-between border-b-2 border-border bg-border px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-3 bg-accent" />
          <span className="size-3 bg-warning" />
          <span className="size-3 bg-success" />
          <span className="ml-2 font-mono text-[13px] font-bold tracking-wider text-bg">
            {T.terminal.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden truncate font-mono text-xs tracking-wide text-bg/70 sm:block">
            {T.terminal.case} {currentCase.caseNumber}: {currentCase.title}
          </span>
          {state.phase === 'investigating' && (
            <button
              onClick={() => dispatch({ type: 'ABANDON_CASE' })}
              title={T.terminal.exitTitle}
              className="cursor-pointer border-2 border-bg bg-bg px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-border shadow-[2px_2px_0_0_rgba(0,0,0,0.4)] transition hover:bg-warning"
            >
              {T.terminal.exit}
            </button>
          )}
        </div>
      </header>

      <StatusBar />

      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto md:flex-row md:overflow-hidden">
        <section className="w-full shrink-0 border-b-2 border-border bg-bg md:w-[42%] md:overflow-y-auto md:border-b-0 md:border-r-2">
          <SocialFeed />
        </section>
        <section className="min-w-0 bg-panel md:flex-1 md:overflow-y-auto">
          <InvestigationPanel />
        </section>
      </main>

      {state.phase === 'debrief' && <DebriefOverlay />}

      {/* Corner mascot — idle buddy during investigation & debrief (desktop only) */}
      <Mascot size={5} className="fixed bottom-4 right-4 z-[60] hidden md:block" />

      <ClueToast />
    </div>
  );
}
