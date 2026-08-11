import { useState } from 'react';
import { useGame } from '../../game/GameContext';
import { STRINGS } from '../../i18n/strings';
import type { Clue } from '../../types/game';

export default function LinkInspector() {
  const { state, dispatch, currentCase } = useGame();
  const T = STRINGS[state.language];
  const link = currentCase.tools.link;
  const [expanded, setExpanded] = useState(false);
  const [spotted, setSpotted] = useState(false);

  if (!link) return null;

  const expand = () => {
    if (expanded) return;
    setExpanded(true);
  };

  const confirmMismatch = () => {
    if (spotted) return;
    setSpotted(true);
    const clue: Clue = {
      id: 'clue-link',
      tool: 'link',
      title: T.linkInspector.clueTitle,
      description: link.mismatchNote,
      category: 'red_flag',
    };
    dispatch({ type: 'LOG_CLUE', clue });
  };

  return (
    <div className="animate-slide-in">
      <div className="mb-3">
        <h3 className="font-mono text-sm font-bold tracking-wider text-text">{T.linkInspector.heading}</h3>
        <p className="font-mono text-xs text-muted">{T.linkInspector.sub}</p>
      </div>

      <div className="mb-3 rounded-none border-2 border-border bg-panel p-3">
        <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">{T.linkInspector.input}</div>
        <div className="flex gap-2">
          <div className="flex-1 truncate border-2 border-border bg-panel2 px-3 py-2 font-mono text-sm font-bold text-text">
            {link.shortLink}
          </div>
          <button
            onClick={expand}
            disabled={expanded}
            className={`rounded-none border px-4 font-mono text-xs font-bold tracking-wider transition ${
              expanded
                ? 'animate-pop-in border-2 border-success bg-success text-white'
                : 'border-2 border-border bg-accent text-border hover:bg-accent/90'
            }`}
          >
            {expanded ? T.linkInspector.expanded : T.linkInspector.expand}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="animate-fade-in space-y-3">
          <div className="rounded-none border-2 border-border bg-panel p-3">
            <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">{T.linkInspector.expandedLabel}</div>
            <dl className="space-y-1 font-mono text-xs">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{T.linkInspector.shortLink}</dt>
                <dd className="text-text">{link.shortLink}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{T.linkInspector.realDomain}</dt>
                <dd className="font-bold text-warning">{link.realDomain}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{T.linkInspector.registered}</dt>
                <dd className="text-text">{link.registered}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{T.linkInspector.redirectsTo}</dt>
                <dd className="text-text">{link.redirectsTo}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-none border-2 border-border bg-panel p-3">
            <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">{T.linkInspector.compare}</div>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-between rounded border-2 border-border bg-panel2 px-3 py-2">
                <span className="text-muted">{T.linkInspector.claimed}</span>
                <span className="text-success">{link.claimedDomain}</span>
              </div>
              <div className="flex items-center justify-between rounded border border-danger/40 bg-danger/10 px-3 py-2">
                <span className="text-muted">{T.linkInspector.actual}</span>
                <span className="text-danger">{link.realDomain}</span>
              </div>
              <p className="pt-1 text-muted">{link.mismatchNote}</p>
            </div>
          </div>

          <button
            onClick={confirmMismatch}
            disabled={spotted}
            className={`w-full rounded-none border py-2 font-mono text-xs font-bold tracking-wider transition ${
              spotted
                ? 'animate-pop-in border-2 border-success bg-success text-white'
                : 'border-2 border-warning bg-warning text-white hover:bg-warning/90'
            }`}
          >
            {spotted ? T.linkInspector.confirmYes : T.linkInspector.confirmNo}
          </button>
        </div>
      )}
    </div>
  );
}
