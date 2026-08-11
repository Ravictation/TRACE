import { useState } from 'react';
import { useGame } from '../../game/GameContext';
import { STRINGS } from '../../i18n/strings';
import type { Clue } from '../../types/game';

export default function ReverseImageSearch() {
  const { state, dispatch, currentCase } = useGame();
  const T = STRINGS[state.language];
  const tool = currentCase.tools.reverseImage;
  const [selected, setSelected] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const [shakeIdx, setShakeIdx] = useState<number | null>(null);

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
        title: T.reverseImage.matchFound(result.source),
        description: result.caption,
        category: 'red_flag',
      };
      dispatch({ type: 'LOG_CLUE', clue });
    } else {
      // Wrong guess — shake the card so the player feels the miss
      setShakeIdx(index);
      window.setTimeout(() => setShakeIdx(null), 450);
    }
  };

  return (
    <div className="animate-slide-in">
      <div className="mb-3">
        <h3 className="font-mono text-sm font-bold tracking-wider text-text">
          {T.reverseImage.heading}
        </h3>
        <p className="font-mono text-xs text-muted">
          {T.reverseImage.resultsFor} <span className="font-bold text-text">{query}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {results.map((r, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            disabled={solved && !r.isMatch}
            className={`group flex flex-col overflow-hidden rounded-none border text-left transition ${
              solved && r.isMatch
                ? 'animate-pop-in border-2 border-success bg-success'
                : selected === i
                  ? 'border-2 border-danger bg-danger'
                  : 'border-2 border-border bg-panel hover:border-accent'
            } ${shakeIdx === i ? 'animate-shake border-2 border-danger' : ''}`}
          >
            <div className="flex aspect-[4/3] items-center justify-center bg-panel2 font-mono text-[10px] text-muted">
              {T.reverseImage.imagePlaceholder(i + 1)}
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
            {T.reverseImage.matchFoundMsg(results.find((r) => r.isMatch)?.caption ?? '')}
          </p>
        ) : selected !== null && !solved ? (
          <p className="animate-fade-in text-warning">{T.reverseImage.keepScanning}</p>
        ) : (
          <p className="text-muted">{T.reverseImage.clickTruth}</p>
        )}
      </div>
    </div>
  );
}
