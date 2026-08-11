import { useEffect, useState } from 'react';
import { useGame } from '../game/GameContext';
import { CASES } from '../data/cases';
import { STRINGS } from '../i18n/strings';
import type { LeaderboardEntry } from '../types/game';
import { getFullLeaderboard } from '../utils/storage';

interface Props {
  onClose: () => void;
}

export default function LeaderboardModal({ onClose }: Props) {
  const { state } = useGame();
  const T = STRINGS[state.language];
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getFullLeaderboard().then((list) => {
      if (!active) return;
      setEntries(list);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex overflow-y-auto bg-bg/90 p-4">
      <div className="animate-fade-in card-brutal m-auto w-full max-w-lg p-6">
        <div className="mb-4 flex items-center justify-between border-b-2 border-border pb-3">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-text">
            {T.leaderboard.heading}
          </h2>
          <button
            onClick={onClose}
            className="border-2 border-border bg-panel px-2 py-1 font-mono text-xs font-bold text-text shadow-[2px_2px_0_0_#1f1b16] transition hover:bg-accent"
          >
            {T.leaderboard.close}
          </button>
        </div>

        {loading ? (
          <p className="py-8 text-center font-mono text-sm text-muted">{T.leaderboard.loading}</p>
        ) : entries.length === 0 ? (
          <p className="py-8 text-center font-mono text-sm text-muted">
            {T.leaderboard.empty}
          </p>
        ) : (
          <div className="space-y-1.5">
            {entries.map((e, i) => (
              <div
                key={`${e.name}-${e.score}-${e.date}`}
                className={`flex items-center gap-3 border-2 border-border px-3 py-2 ${
                  i === 0
                    ? 'bg-accent text-border shadow-[2px_2px_0_0_#1f1b16]'
                    : 'bg-panel text-text'
                }`}
              >
                <span className="w-8 font-display text-lg font-bold">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate font-mono text-sm font-bold">
                  {e.name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider opacity-70">
                  {T.leaderboard.casesSolved(e.casesSolved, CASES[state.language].length)}
                </span>
                <span className="tabular-nums font-mono text-sm font-bold">
                  {e.score.toLocaleString(state.language === 'id' ? 'id-ID' : 'en-US')}
                </span>
              </div>
            ))}
          </div>
        )}

        <p className="mt-4 font-mono text-[10px] text-muted">
          {T.leaderboard.footer}
        </p>
      </div>
    </div>
  );
}
