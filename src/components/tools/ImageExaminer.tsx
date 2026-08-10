import { useState } from 'react';
import { useGame } from '../../game/GameContext';
import type { Clue } from '../../types/game';

export default function ImageExaminer() {
  const { dispatch, currentCase } = useGame();
  const exam = currentCase.tools.imageExam;
  const [hovered, setHovered] = useState<string | null>(null);
  const [found, setFound] = useState<string[]>([]);

  if (!exam) return null;

  const examine = (id: string) => {
    if (found.includes(id)) return;
    setFound((f) => [...f, id]);
    const clueDef = exam.clues.find((c) => c.id === id);
    if (clueDef) {
      const clue: Clue = {
        id: `clue-image-${id}`,
        tool: 'image-exam',
        title: clueDef.label,
        description: clueDef.detail,
        category: 'red_flag',
      };
      dispatch({ type: 'LOG_CLUE', clue });
    }
  };

  return (
    <div className="animate-slide-in">
      <div className="mb-3">
        <h3 className="font-mono text-sm font-bold tracking-wider text-text">🔬 IMAGE EXAMINER</h3>
        <p className="font-mono text-xs text-muted">{exam.zoomHint}</p>
      </div>

      <div className="relative mb-3 overflow-hidden rounded-md border border-border bg-panel2">
        {/* Simulated photo with clue hotspots */}
        <div className="relative flex aspect-video items-center justify-center">
          {/* Faux photo layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2d3748] via-[#1a2332] to-[#374151]" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[#111827]" />
          <div className="absolute left-[15%] top-[35%] h-14 w-24 rounded-sm bg-[#0f172a] opacity-70" />
          <div className="absolute right-[20%] top-[20%] h-8 w-20 rounded-sm bg-[#1e293b] opacity-70" />
          <span className="relative font-mono text-xs text-muted">[ flood photo — click the circled spots ]</span>

          {/* Hotspots */}
          {exam.clues.map((c) => (
            <button
              key={c.id}
              onClick={() => examine(c.id)}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              className={`absolute size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition ${
                found.includes(c.id)
                  ? 'border-success bg-success/40'
                  : hovered === c.id
                    ? 'border-warning bg-warning/40'
                    : 'border-accent bg-accent/30'
              }`}
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              aria-label={c.label}
            />
          ))}

          {/* Hover tooltip */}
          {hovered && !found.includes(hovered) && (
            <div className="pointer-events-none absolute left-1/2 top-2 z-10 -translate-x-1/2 rounded border border-warning bg-bg/95 px-3 py-1.5 font-mono text-[11px] text-warning shadow-card">
              🔍 {exam.clues.find((c) => c.id === hovered)?.label} — click to examine
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        {exam.clues.map((c) => (
          <div
            key={c.id}
            className={`rounded-md border px-3 py-2 text-xs transition ${
              found.includes(c.id)
                ? 'border-success bg-success/10 text-text'
                : 'border-border bg-panel text-muted'
            }`}
          >
            {found.includes(c.id) ? '✓ ' : ''}
            {c.label}: {c.detail}
          </div>
        ))}
      </div>
    </div>
  );
}
