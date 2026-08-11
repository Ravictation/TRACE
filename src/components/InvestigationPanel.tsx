import { useGame } from '../game/GameContext';
import { STRINGS } from '../i18n/strings';
import type { ToolType } from '../types/game';
import ToolTabs from './tools/ToolTabs';
import ReverseImageSearch from './tools/ReverseImageSearch';
import AccountInspector from './tools/AccountInspector';
import NewsWire from './tools/NewsWire';
import LinkInspector from './tools/LinkInspector';
import SourceInterrogation from './tools/SourceInterrogation';
import FundraiserCheck from './tools/FundraiserCheck';
import OfficialStatements from './tools/OfficialStatements';
import VerdictPanel from './VerdictPanel';

export default function InvestigationPanel() {
  const { state, dispatch, currentCase } = useGame();
  const T = STRINGS[state.language];

  const selectTool = (tool: ToolType) => {
    dispatch({ type: 'OPEN_TOOL', tool });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b-2 border-border p-3">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-text">
            {T.investigation.heading}
          </h2>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-muted">
            {T.investigation.focusHint}
          </span>
        </div>
        <ToolTabs active={state.activeTool} onSelect={selectTool} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {state.activeTool === null ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <span className="inline-block border-2 border-border bg-panel px-3 py-1 font-mono text-3xl font-bold text-muted shadow-[3px_3px_0_0_#1f1b16]">
              [_]
            </span>
            <p className="max-w-sm font-mono text-sm leading-relaxed text-muted">
              {currentCase.toolIntro}
            </p>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-muted">
              {T.investigation.cluesFound}{' '}
              <span
                key={state.discoveredClues.length}
                className="tabular-nums animate-tick-pop inline-block text-success"
              >
                {state.discoveredClues.length}
              </span>
            </p>
          </div>
        ) : (
          <div className="animate-fade-in">
            {state.activeTool === 'reverse-image' && <ReverseImageSearch />}
            {state.activeTool === 'account' && <AccountInspector />}
            {state.activeTool === 'news-wire' && <NewsWire />}
            {state.activeTool === 'link' && <LinkInspector />}
            {state.activeTool === 'source' && <SourceInterrogation />}
            {state.activeTool === 'fundraiser' && <FundraiserCheck />}
            {state.activeTool === 'official' && <OfficialStatements />}
          </div>
        )}
      </div>

      <VerdictPanel />
    </div>
  );
}
