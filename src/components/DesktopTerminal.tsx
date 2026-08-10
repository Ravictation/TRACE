import { useGame } from '../game/GameContext';
import StatusBar from './StatusBar';
import SocialFeed from './SocialFeed';
import InvestigationPanel from './InvestigationPanel';
import IntroScreen from './IntroScreen';
import DebriefOverlay from './DebriefOverlay';

export default function DesktopTerminal() {
  const { state, currentCase } = useGame();

  if (state.phase === 'intro') return <IntroScreen />;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bg">
      <header className="flex shrink-0 items-center justify-between border-b border-border bg-panel px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-danger" />
          <span className="size-3 rounded-full bg-warning" />
          <span className="size-3 rounded-full bg-success" />
          <span className="ml-2.5 font-mono text-[13px] font-bold tracking-wider text-text">
            TRACE TERMINAL
          </span>
        </div>
        <span className="hidden truncate font-mono text-xs tracking-wide text-muted sm:block">
          CASE {currentCase.caseNumber}: {currentCase.title}
        </span>
      </header>

      <StatusBar />

      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto md:flex-row md:overflow-hidden">
        <section className="w-full shrink-0 border-b border-border bg-bg md:w-[42%] md:overflow-y-auto md:border-b-0 md:border-r">
          <SocialFeed />
        </section>
        <section className="min-w-0 bg-panel md:flex-1 md:overflow-y-auto">
          <InvestigationPanel />
        </section>
      </main>

      {state.phase === 'debrief' && <DebriefOverlay />}
    </div>
  );
}
