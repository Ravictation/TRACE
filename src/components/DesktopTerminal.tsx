import { useGame } from '../game/GameContext';
import { STRINGS } from '../i18n/strings';
import Mascot from './Mascot';
import StatsBar from './StatsBar';
import StoryScreen from './StoryScreen';
import ChoiceScreen from './ChoiceScreen';
import EventEndScreen from './EventEndScreen';
import EndingScreen from './EndingScreen';
import IntroScreen from './IntroScreen';

export default function DesktopTerminal() {
  const { state, dispatch, currentEvent } = useGame();
  const T = STRINGS[state.language];

  if (state.phase === 'menu') return <IntroScreen />;
  if (state.phase === 'ending') return <EndingScreen />;

  const main =
    state.step === 'prologue' || state.step === 'atmo' ? (
      <StoryScreen />
    ) : state.step === 'eventEnd' ? (
      <EventEndScreen />
    ) : (
      <ChoiceScreen />
    );

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
          <span className="hidden font-mono text-xs tracking-wide text-bg/60 sm:inline">
            · {T.intro.subtitle}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden truncate font-mono text-xs tracking-wide text-bg/70 sm:block">
            {T.terminal.case} {currentEvent.number}: {currentEvent.title}
          </span>
          <button
            onClick={() => dispatch({ type: 'BACK_TO_MENU' })}
            title={T.terminal.exitTitle}
            className="cursor-pointer border-2 border-bg bg-bg px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-border shadow-[2px_2px_0_0_rgba(0,0,0,0.4)] transition hover:bg-warning"
          >
            {T.terminal.exit}
          </button>
        </div>
      </header>

      <StatsBar />

      <main className="min-h-0 flex-1 overflow-y-auto bg-panel2/40">{main}</main>

      {/* Corner mascot — idle buddy during the story (desktop only) */}
      <Mascot size={5} className="fixed bottom-4 right-4 z-[60] hidden md:block" />
    </div>
  );
}
