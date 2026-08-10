import { useEffect, useRef, useState } from 'react';

/**
 * Animates a changing number toward its target with easeOutCubic.
 * Used for live share/repost/like counters so digits roll smoothly
 * instead of jumping every second.
 */
export function useCountUp(value: number, duration = 700): number {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    if (from === to) return;
    fromRef.current = to;

    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic — starts fast, settles gently
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return display;
}

/** Formatted helper: keeps the raw number for toLocaleString usage. */
export function useCountUpLocale(value: number, duration?: number): string {
  const display = useCountUp(value, duration);
  return display.toLocaleString();
}
