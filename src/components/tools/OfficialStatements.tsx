import { useState } from 'react';
import { useGame } from '../../game/GameContext';
import type { Clue } from '../../types/game';

export default function OfficialStatements() {
  const { dispatch, currentCase } = useGame();
  const off = currentCase.tools.official;
  const [confirmed, setConfirmed] = useState(false);

  if (!off) return null;

  const confirm = () => {
    if (confirmed) return;
    setConfirmed(true);
    const clue: Clue = {
      id: 'clue-official',
      tool: 'official',
      title: 'Lembaga resmi menyatakan sebaliknya',
      description: off.summaryNote,
      category: 'red_flag',
    };
    dispatch({ type: 'LOG_CLUE', clue });
  };

  return (
    <div className="animate-slide-in">
      <div className="mb-3">
        <h3 className="font-mono text-sm font-bold tracking-wider text-text">🏛 OFFICIAL SOURCES</h3>
        <p className="font-mono text-xs text-muted">{off.description}</p>
      </div>

      <div className="space-y-1.5">
        {off.statements.map((s) => (
          <div
            key={`${s.agency}-${s.date}`}
            className="rounded-md border border-border bg-panel p-2.5"
          >
            <div className="flex items-center gap-2">
              <span
                className={`size-2 shrink-0 rounded-full ${
                  s.status === 'clear'
                    ? 'bg-success'
                    : s.status === 'alert'
                      ? 'bg-warning'
                      : 'bg-muted'
                }`}
              />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-text">
                {s.agency}
              </span>
              <span className="ml-auto font-mono text-[10px] text-muted">{s.date}</span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted">{s.title}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-md border border-border bg-panel2 p-3">
        <p className="mb-2 font-mono text-xs leading-relaxed text-muted">{off.summaryNote}</p>
        <button
          onClick={confirm}
          disabled={confirmed}
          className={`w-full rounded-md border py-2 font-mono text-xs font-bold tracking-wider transition ${
            confirmed
              ? 'border-success bg-success/10 text-success'
              : 'border-warning bg-warning/10 text-warning hover:bg-warning/20'
          }`}
        >
          {confirmed ? off.confirmSuccessLabel : off.confirmLabel}
        </button>
      </div>
    </div>
  );
}
