import { useState } from 'react';
import { useGame } from '../../game/GameContext';
import type { Clue } from '../../types/game';

export default function NewsWire() {
  const { dispatch, currentCase } = useGame();
  const wire = currentCase.tools.newsWire;
  const [confirmed, setConfirmed] = useState(false);

  if (!wire) return null;

  const confirmAbsence = () => {
    if (confirmed) return;
    setConfirmed(true);
    const clue: Clue = {
      id: 'clue-news-wire',
      tool: 'news-wire',
      title: 'Media kredibel tidak melaporkan',
      description: wire.regionalNote,
      category: 'red_flag',
    };
    dispatch({ type: 'LOG_CLUE', clue });
  };

  return (
    <div className="animate-slide-in">
      <div className="mb-3">
        <h3 className="font-mono text-sm font-bold tracking-wider text-text">📰 NEWS WIRE</h3>
        <p className="font-mono text-xs text-muted">{wire.description}</p>
      </div>

      <div className="space-y-1.5">
        {wire.outlets.map((o) => (
          <div key={o.name} className="flex items-start gap-2 rounded-md border border-border bg-panel p-2.5">
            <div className="min-w-0 flex-1">
              <div className="text-sm text-text">{o.headline}</div>
              <div className="mt-0.5 flex items-center gap-2 font-mono text-[10px] text-muted">
                <span className="font-bold text-accent">{o.name}</span>
                <span>·</span>
                <span>{o.timeAgo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-md border border-border bg-panel2 p-3">
        <div className="mb-2 font-mono text-xs leading-relaxed text-muted">{wire.regionalNote}</div>
        <button
          onClick={confirmAbsence}
          disabled={confirmed}
          className={`w-full rounded-md border py-2 font-mono text-xs font-bold tracking-wider transition ${
            confirmed
              ? 'border-success bg-success/10 text-success'
              : 'border-warning bg-warning/10 text-warning hover:bg-warning/20'
          }`}
        >
          {confirmed ? wire.confirmSuccessLabel : wire.confirmLabel}
        </button>
      </div>
    </div>
  );
}
