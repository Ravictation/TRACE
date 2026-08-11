import { useGame } from '../../game/GameContext';
import { TOOL_META } from '../../data/cases';
import type { ToolType } from '../../types/game';

interface Props {
  active: ToolType | null;
  onSelect: (tool: ToolType) => void;
}

export default function ToolTabs({ active, onSelect }: Props) {
  const { state, currentCase } = useGame();

  return (
    <div className="flex flex-wrap gap-2">
      {currentCase.availableTools.map((t) => {
        const meta = TOOL_META[state.language][t];
        const isActive = active === t;
        return (
          <button
            key={t}
            onClick={() => onSelect(t)}
            title={meta.hint}
            className={`flex items-center gap-1.5 border-2 border-border px-2.5 py-1.5 font-mono text-[11px] font-bold transition ${
              isActive
                ? 'animate-pop-in bg-accent text-border shadow-[2px_2px_0_0_#1f1b16]'
                : 'bg-panel text-muted shadow-[2px_2px_0_0_#1f1b16] hover:bg-accent/40 hover:text-border'
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
