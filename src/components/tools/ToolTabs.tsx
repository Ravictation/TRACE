import { useGame } from '../../game/GameContext';
import { TOOL_META } from '../../data/cases';
import type { ToolType } from '../../types/game';

interface Props {
  active: ToolType | null;
  onSelect: (tool: ToolType) => void;
}

export default function ToolTabs({ active, onSelect }: Props) {
  const { currentCase } = useGame();

  return (
    <div className="flex flex-wrap gap-1.5">
      {currentCase.availableTools.map((t) => {
        const meta = TOOL_META[t];
        return (
          <button
            key={t}
            onClick={() => onSelect(t)}
            title={meta.hint}
            className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[11px] font-semibold transition ${
              active === t
                ? 'border-accent bg-accent/15 text-accent'
                : 'border-border bg-panel text-muted hover:border-accent/50 hover:text-text'
            }`}
          >
            <span aria-hidden>{meta.icon}</span>
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}
