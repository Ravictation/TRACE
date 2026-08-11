import { useState } from 'react';
import { useGame } from '../../game/GameContext';
import { STRINGS } from '../../i18n/strings';
import type { Clue } from '../../types/game';

export default function AccountInspector() {
  const { state, dispatch, currentCase } = useGame();
  const T = STRINGS[state.language];
  const acc = currentCase.tools.account;
  const [checked, setChecked] = useState<Set<string>>(new Set());

  if (!acc) return null;

  const toggle = (id: string) => {
    const next = new Set(checked);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
      const flag = acc.redFlags.find((f) => f.id === id);
      if (flag) {
        const clue: Clue = {
          id: `clue-${id}`,
          tool: 'account',
          title: flag.label,
          description: flag.detail,
          category: 'red_flag',
        };
        dispatch({ type: 'LOG_CLUE', clue });
      }
    }
    setChecked(next);
  };

  return (
    <div className="animate-slide-in">
      <div className="mb-3">
        <h3 className="font-mono text-sm font-bold tracking-wider text-text">{T.accountInspector.heading}</h3>
        <p className="font-mono text-xs text-muted">{T.accountInspector.profileLookup(acc.handle)}</p>
      </div>

      <div className="rounded-none border-2 border-border bg-panel p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-panel2 font-mono text-lg text-muted">
            {acc.avatarInitials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 font-semibold text-text">
              {acc.name}
              {acc.isVerified ? (
                <svg viewBox="0 0 24 24" className="size-4 fill-accent" aria-label={T.accountInspector.verifiedAria}>
                  <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z" />
                </svg>
              ) : (
                <span className="rounded-sm bg-warning/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-warning">
                  {T.accountInspector.unverified}
                </span>
              )}
            </div>
            <div className="font-mono text-xs text-muted">{acc.handle}</div>
            <div className="text-xs text-muted">{acc.bio}</div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded border-2 border-border bg-panel2 p-2">
            <div className="tabular-nums font-mono text-lg font-bold text-text">{acc.postsCount}</div>
            <div className="font-mono text-[10px] text-muted">{T.accountInspector.posts}</div>
          </div>
          <div className="rounded border-2 border-border bg-panel2 p-2">
            <div className="tabular-nums font-mono text-lg font-bold text-text">
              {acc.followersCount.toLocaleString()}
            </div>
            <div className="font-mono text-[10px] text-muted">{T.accountInspector.followers}</div>
          </div>
          <div className="rounded border-2 border-border bg-panel2 p-2">
            <div className="tabular-nums font-mono text-lg font-bold text-text">{acc.followingCount}</div>
            <div className="font-mono text-[10px] text-muted">{T.accountInspector.following}</div>
          </div>
        </div>

        <div className="mb-3 border-t border-border pt-3">
          <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
            {T.accountInspector.accountAge}
          </div>
          <div className="font-mono text-sm text-text">
            {acc.joined} <span className="text-warning">({acc.joinedDetail})</span>
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
            {T.accountInspector.recentPosts}
          </div>
          {acc.recentPosts.map((p) => (
            <div key={p.text} className="mb-1.5 rounded border-2 border-border bg-panel2 p-2 text-xs text-text">
              {p.text}
              <div className="tabular-nums mt-1 font-mono text-[10px] text-muted">
                🔄 {p.shares} · ❤️ {p.likes}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Red flag confirmation — player marks what they noticed */}
      <div className="mt-3">
        <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
          {T.accountInspector.noticePrompt}
        </div>
        <div className="space-y-1.5">
          {acc.redFlags.map((f) => (
            <button
              key={f.id}
              onClick={() => toggle(f.id)}
              className={`flex w-full items-center justify-between rounded-none border px-3 py-2 text-left text-xs transition ${
                checked.has(f.id)
                  ? 'animate-pop-in border-2 border-success bg-success text-white'
                  : 'border-border bg-panel text-muted hover:border-accent'
              }`}
            >
              <span>{f.label}</span>
              <span>{checked.has(f.id) ? '✓' : '+'}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
