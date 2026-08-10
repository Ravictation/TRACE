import { useGame } from '../game/GameContext';
import type { ToolType } from '../types/game';
import ToolTabs from './tools/ToolTabs';
import ReverseImageSearch from './tools/ReverseImageSearch';
import AccountInspector from './tools/AccountInspector';
import NewsWire from './tools/NewsWire';
import LinkInspector from './tools/LinkInspector';
import ImageExaminer from './tools/ImageExaminer';
import SourceInterrogation from './tools/SourceInterrogation';
import FundraiserCheck from './tools/FundraiserCheck';
import OfficialStatements from './tools/OfficialStatements';
import VerdictPanel from './VerdictPanel';

export default function InvestigationPanel() {
  const { state, dispatch, currentCase } = useGame();

  const selectTool = (tool: ToolType) => {
    dispatch({ type: 'OPEN_TOOL', tool });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border p-3">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-mono text-sm font-bold uppercase tracking-[0.08em] text-text">
            Investigation
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
            1 focus point per tool
          </span>
        </div>
        <ToolTabs active={state.activeTool} onSelect={selectTool} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {state.activeTool === null ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <span className="font-mono text-4xl font-bold text-border">[_]</span>
            <p className="max-w-sm font-mono text-sm leading-relaxed text-muted">
              {currentCase.toolIntro}
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
              Clues found:{' '}
              <span className="tabular-nums text-success">{state.discoveredClues.length}</span>
            </p>
          </div>
        ) : (
          <div className="animate-fade-in">
            {state.activeTool === 'reverse-image' && <ReverseImageSearch />}
            {state.activeTool === 'account' && <AccountInspector />}
            {state.activeTool === 'news-wire' && <NewsWire />}
            {state.activeTool === 'link' && <LinkInspector />}
            {state.activeTool === 'image-exam' && <ImageExaminer />}
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
