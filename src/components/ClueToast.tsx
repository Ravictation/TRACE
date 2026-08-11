import { useEffect, useRef, useState } from 'react';
import { useGame } from '../game/GameContext';
import { STRINGS } from '../i18n/strings';
import type { Clue } from '../types/game';

const TOAST_DURATION = 2600;

export default function ClueToast() {
  const { state } = useGame();
  const T = STRINGS[state.language];
  const [toast, setToast] = useState<Clue | null>(null);
  const [leaving, setLeaving] = useState(false);
  const countRef = useRef(state.discoveredClues.length);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const count = state.discoveredClues.length;
    if (count <= countRef.current) return;
    countRef.current = count;

    const clue = state.discoveredClues[count - 1];
    setLeaving(false);
    setToast(clue);

    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setLeaving(true);
      window.setTimeout(() => setToast(null), 250);
    }, TOAST_DURATION);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [state.discoveredClues]);

  if (!toast) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-50">
      <div
        key={toast.id}
        className={`flex items-center gap-3 border-2 border-border bg-accent px-4 py-2.5 shadow-[4px_4px_0_0_#1f1b16] ${
          leaving ? 'animate-toast-out' : 'animate-toast-in'
        }`}
      >
        <span className="flex size-7 items-center justify-center border-2 border-border bg-success text-sm text-white">
          ✓
        </span>
        <div className="min-w-0">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-border">
            {T.clueToast.clueFound}
          </div>
          <div className="max-w-[280px] truncate font-mono text-xs font-bold text-border">
            {toast.title}
          </div>
        </div>
      </div>
    </div>
  );
}
