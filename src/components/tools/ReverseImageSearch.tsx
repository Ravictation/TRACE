import { useState } from 'react';
import { useGame } from '../../game/GameContext';
import type { Clue } from '../../types/game';

export default function ReverseImageSearch() {
  const { dispatch, currentCase } = useGame();
  const tool = currentCase.tools.reverseImage;
  const [selected, setSelected] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);

  if (!tool) return null;
  const { results, query } = tool;

  const onSelect = (index: number) => {
    if (solved) return;
    setSelected(index);
    const result = results[index];

    if (result.isMatch) {
      setSolved(true);
      const clue: Clue = {
        id: 'clue-reverse-image',
        tool: 'reverse-image',
        title: `Match ditemukan: ${result.source}`,
        description: result.caption,
        category: 'red_flag',
      };
      dispatch({ type: 'LOG_CLUE', clue });
    }
  };

  return (
    <div className="animate-slide-in">
      <div className="mb-3">
        <h3 className="font-mono text-sm font-bold tracking-wider text-text">
          🔍 REVERSE IMAGE SEARCH
        </h3>
        <p className="font-mono text-xs text-muted">
          Results for: <span className="text-accent">{query}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {results.map((r, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            disabled={solved && !r.isMatch}
            className={`group flex flex-col overflow-hidden rounded-md border text-left transition ${
              solved && r.isMatch
                ? 'border-success bg-success/10'
                : selected === i
                  ? 'border-danger bg-danger/10'
                  : 'border-border bg-panel hover:border-accent'
            }`}
          >
            <div className="flex aspect-[4/3] items-center justify-center bg-panel2 font-mono text-[10px] text-muted">
              [ image {i + 1} ]
            </div>
            <div className="p-2">
              <div className="truncate font-mono text-[11px] text-text">{r.source}</div>
              <div className="font-mono text-[10px] text-muted">{r.year}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-3 min-h-6 font-mono text-xs">
        {solved ? (
          <p className="animate-fade-in text-success">
            ✅ MATCH FOUND — {results.find((r) => r.isMatch)?.caption}
          </p>
        ) : selected !== null && !solved ? (
          <p className="animate-fade-in text-warning">Not quite. Keep scanning.</p>
        ) : (
          <p className="text-muted">Click the image that reveals the truth.</p>
        )}
      </div>
    </div>
  );
}
