import { useEffect, useRef, useState } from 'react';
import { useGame } from '../game/GameContext';
import { STRINGS } from '../i18n/strings';

/**
 * 8-bit pixel-art mascot — a detective with a magnifying glass.
 * Rendered as a grid of colored cells (no image assets), animated with:
 *  - idle bob (CSS) + walk frame cycle + periodic blink (JS timers)
 *  - click → wave: body tilt + glass raises, then settles
 */

/* Palette — '.' is transparent */
const PALETTE: Record<string, string> = {
  H: 'var(--color-border)', // hat / coat
  h: 'var(--color-accent)', // hatband
  S: 'oklch(88% 0.07 65)', // face
  X: 'var(--color-border)', // eyes
  B: 'var(--color-border)', // coat
  T: 'var(--color-muted)', // trousers
  O: 'var(--color-border)', // shoes
  G: 'var(--color-border)', // glass ring
  L: 'oklch(85% 0.09 230)', // lens
  W: 'oklch(100% 0 0)', // lens shine
};

/* 14×14 body */
const FRAME_IDLE = [
  '...HHHHHHHH...',
  '..HHHHHHHHHH..',
  '...HHHHHHHH...',
  '....hhhhhh....',
  '....SSSSSS....',
  '....SX..XS....',
  '....SSSSSS....',
  '.....SSSS.....',
  '....BBBBBB....',
  '....BB..BB..B.',
  '....BB..BB..B.',
  '.....BBBB.....',
  '.....TTTT.....',
  '...OO....OO...',
];

/* Walk cycle — feet shift 1px each side */
const FRAME_WALK = [
  '...HHHHHHHH...',
  '..HHHHHHHHHH..',
  '...HHHHHHHH...',
  '....hhhhhh....',
  '....SSSSSS....',
  '....SX..XS....',
  '....SSSSSS....',
  '.....SSSS.....',
  '....BBBBBB....',
  '....BB..BB..B.',
  '....BB..BB..B.',
  '.....BBBB.....',
  '.....TTTT.....',
  '....OO...OO...',
];

/* Blink — eyes closed */
const FRAME_BLINK = [
  '...HHHHHHHH...',
  '..HHHHHHHHHH..',
  '...HHHHHHHH...',
  '....hhhhhh....',
  '....SSSSSS....',
  '....SSSSSS....',
  '....SSSSSS....',
  '.....SSSS.....',
  '....BBBBBB....',
  '....BB..BB..B.',
  '....BB..BB..B.',
  '.....BBBB.....',
  '.....TTTT.....',
  '...OO....OO...',
];

/* Magnifying glass overlay — 6 rows × 4 cols, handle at bottom-left */
const GLASS_FRAME = ['.GG.', 'GLWG', 'GLLG', '.GG.', '...G', '..G.'];

const W = 14;
const H = 14;

interface MascotProps {
  /** pixel size per cell in px */
  size?: number;
  className?: string;
}

export default function Mascot({ size = 6, className = '' }: MascotProps) {
  const { state } = useGame();
  const T = STRINGS[state.language];
  const [frameIdx, setFrameIdx] = useState(0);
  const [blinking, setBlinking] = useState(false);
  const [waving, setWaving] = useState(false);
  const blinkTimeoutRef = useRef<number | null>(null);
  const waveTimeoutRef = useRef<number | null>(null);

  // Walk cycle + periodic blink
  useEffect(() => {
    const walk = window.setInterval(() => setFrameIdx((f) => (f + 1) % 2), 320);
    const blink = window.setInterval(() => {
      setBlinking(true);
      if (blinkTimeoutRef.current) window.clearTimeout(blinkTimeoutRef.current);
      blinkTimeoutRef.current = window.setTimeout(() => setBlinking(false), 220);
    }, 3600);
    return () => {
      window.clearInterval(walk);
      window.clearInterval(blink);
      if (blinkTimeoutRef.current) window.clearTimeout(blinkTimeoutRef.current);
    };
  }, []);

  const wave = () => {
    setWaving(true);
    if (waveTimeoutRef.current) window.clearTimeout(waveTimeoutRef.current);
    waveTimeoutRef.current = window.setTimeout(() => setWaving(false), 1400);
  };

  const body = blinking ? FRAME_BLINK : frameIdx === 0 ? FRAME_IDLE : FRAME_WALK;
  // Glass sits at face height, right of the head, held by the extended arm
  const glassTop = 5 * size;
  const glassLeft = 10 * size;

  return (
    <button
      type="button"
      onClick={wave}
      title={T.mascot.tooltip}
      aria-label={T.mascot.tooltip}
      className={`relative select-none bg-transparent p-0 outline-none focus:outline-2 focus:outline-focus ${className}`}
      style={{ width: 18 * size, height: H * size }}
    >
      {/* Body — grid of pixels */}
      <div
        className={waving ? 'animate-mascot-wave' : 'animate-mascot-bob'}
        style={{ transformOrigin: 'bottom center' }}
      >
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${W}, ${size}px)`, gridTemplateRows: `repeat(${H}, ${size}px)` }}
        >
          {body.flatMap((row, y) =>
            row.split('').map((px, x) => (
              <div
                key={`${y}-${x}`}
                style={{ width: size, height: size, background: PALETTE[px] ?? 'transparent' }}
              />
            )),
          )}
        </div>
      </div>

      {/* Magnifying glass overlay — floats gently, raises when waving */}
      <div
        aria-hidden
        className={`absolute ${waving ? 'animate-mascot-glass-wave' : 'animate-mascot-glass-float'}`}
        style={{ top: glassTop, left: glassLeft }}
      >
        <div className="grid" style={{ gridTemplateColumns: `repeat(4, ${size}px)` }}>
          {GLASS_FRAME.flatMap((row, y) =>
            row.split('').map((px, x) => (
              <div
                key={`g-${y}-${x}`}
                style={{ width: size, height: size, background: PALETTE[px] ?? 'transparent' }}
              />
            )),
          )}
        </div>
      </div>
    </button>
  );
}
