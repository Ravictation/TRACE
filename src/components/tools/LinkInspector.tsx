import { useState } from 'react';
import { useGame } from '../../game/GameContext';
import type { Clue } from '../../types/game';

export default function LinkInspector() {
  const { dispatch, currentCase } = useGame();
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
      title: 'Lookalike domain',
      description: link.mismatchNote,
      category: 'red_flag',
    };
    dispatch({ type: 'LOG_CLUE', clue });
  };

  return (
    <div className="animate-slide-in">
      <div className="mb-3">
        <h3 className="font-mono text-sm font-bold tracking-wider text-text">🔗 LINK INSPECTOR</h3>
        <p className="font-mono text-xs text-muted">Expand short links. Check the real domain.</p>
      </div>

      <div className="mb-3 rounded-md border border-border bg-panel p-3">
        <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">Input</div>
        <div className="flex gap-2">
          <div className="flex-1 truncate rounded border border-border bg-panel2 px-3 py-2 font-mono text-sm text-accent">
            {link.shortLink}
          </div>
          <button
            onClick={expand}
            disabled={expanded}
            className={`rounded-md border px-4 font-mono text-xs font-bold tracking-wider transition ${
              expanded
                ? 'border-success bg-success/10 text-success'
                : 'border-accent bg-accent/10 text-accent hover:bg-accent/20'
            }`}
          >
            {expanded ? 'EXPANDED' : 'EXPAND'}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="animate-fade-in space-y-3">
          <div className="rounded-md border border-border bg-panel p-3">
            <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">Expanded</div>
            <dl className="space-y-1 font-mono text-xs">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Short link:</dt>
                <dd className="text-text">{link.shortLink}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Real domain:</dt>
                <dd className="font-bold text-warning">{link.realDomain}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Registered:</dt>
                <dd className="text-text">{link.registered}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Redirects to:</dt>
                <dd className="text-text">{link.redirectsTo}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-md border border-border bg-panel p-3">
            <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">Compare</div>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-between rounded border border-border bg-panel2 px-3 py-2">
                <span className="text-muted">Claimed:</span>
                <span className="text-success">{link.claimedDomain}</span>
              </div>
              <div className="flex items-center justify-between rounded border border-danger/40 bg-danger/10 px-3 py-2">
                <span className="text-muted">Actual:</span>
                <span className="text-danger">{link.realDomain}</span>
              </div>
              <p className="pt-1 text-muted">{link.mismatchNote}</p>
            </div>
          </div>

          <button
            onClick={confirmMismatch}
            disabled={spotted}
            className={`w-full rounded-md border py-2 font-mono text-xs font-bold tracking-wider transition ${
              spotted
                ? 'border-success bg-success/10 text-success'
                : 'border-warning bg-warning/10 text-warning hover:bg-warning/20'
            }`}
          >
            {spotted ? '✓ CONFIRMED: Lookalike domain detected' : '⚠ CONFIRM: This is a lookalike domain'}
          </button>
        </div>
      )}
    </div>
  );
}
