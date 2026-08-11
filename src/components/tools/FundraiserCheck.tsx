import { useState } from 'react';
import { useGame } from '../../game/GameContext';
import { STRINGS } from '../../i18n/strings';
import type { Clue } from '../../types/game';

export default function FundraiserCheck() {
  const { state, dispatch, currentCase } = useGame();
  const T = STRINGS[state.language];
  const fr = currentCase.tools.fundraiser;
  const [checked, setChecked] = useState<Set<string>>(new Set());

  if (!fr) return null;

  const toggle = (id: string) => {
    const next = new Set(checked);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
      const flag = fr.redFlags.find((f) => f.id === id);
      if (flag) {
        const clue: Clue = {
          id: `clue-${id}`,
          tool: 'fundraiser',
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
        <h3 className="font-mono text-sm font-bold tracking-wider text-text">{T.fundraiser.heading}</h3>
        <p className="font-mono text-xs text-muted">{T.fundraiser.sub}</p>
      </div>

      {/* Donation page mockup */}
      <div className="overflow-hidden rounded-none border-2 border-border bg-panel">
        {/* Page header */}
        <div className="flex items-center justify-between border-b border-border bg-panel2 px-4 py-2.5">
          <span className="font-mono text-xs font-bold text-text">{T.fundraiser.pageHeader}</span>
          <span className="font-mono text-[10px] text-muted">donasi.id</span>
        </div>

        <div className="p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h4 className="text-base font-bold leading-snug text-text">{fr.campaignTitle}</h4>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                <span className="font-semibold text-text">{fr.organizer}</span>
                <span>·</span>
                <span>{fr.organizerHandle}</span>
              </div>
            </div>
            {fr.isVerified ? (
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 font-mono text-[10px] font-bold text-success">
                {T.fundraiser.verified}
              </span>
            ) : (
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-danger/15 px-2.5 py-1 font-mono text-[10px] font-bold text-danger">
                {T.fundraiser.unverified}
              </span>
            )}
          </div>

          {/* Photo */}
          <div className="mb-3 flex aspect-video items-center justify-center rounded border-2 border-border bg-panel2 text-muted">
            <span className="font-mono text-xs">{T.fundraiser.photoPlaceholder}</span>
          </div>

          {/* Progress */}
          <div className="mb-1.5 flex items-end justify-between">
            <div>
              <div className="text-lg font-bold text-text">{fr.raisedAmount}</div>
              <div className="font-mono text-[11px] text-muted">{T.fundraiser.fromTarget(fr.targetAmount)}</div>
            </div>
            <div className="text-right font-mono text-[11px] text-muted">
              <div>{fr.backersCount}</div>
              <div className="text-success">{fr.daysLeft}</div>
            </div>
          </div>
          <div className="mb-4 h-2 overflow-hidden rounded-full bg-panel2">
            <div className="h-full w-[43%] rounded-full bg-accent" />
          </div>

          {/* Fund details */}
          <div className="mb-3 space-y-1.5 rounded border-2 border-border bg-panel2 p-3 font-mono text-xs">
            <div className="flex justify-between gap-3">
              <span className="text-muted">{T.fundraiser.fundsGoTo}</span>
              <span
                className={`text-right font-bold ${
                  fr.bankAccountName.includes('pribadi') || fr.bankAccountName.includes('personal')
                    ? 'text-danger'
                    : 'text-text'
                }`}
              >
                {fr.bankAccountName}
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-muted">{T.fundraiser.agency}</span>
              <span
                className={`text-right ${
                  fr.charityName.includes('tidak') || fr.charityName.includes('not')
                    ? 'text-danger'
                    : 'text-text'
                }`}
              >
                {fr.charityName}
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-muted">{T.fundraiser.registeredAt}</span>
              <span
                className={`text-right ${
                  fr.registeredSince.includes('belum') || fr.registeredSince.includes('not')
                    ? 'text-danger'
                    : 'text-text'
                }`}
              >
                {fr.registeredSince}
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-muted">{T.fundraiser.created}</span>
              <span className="text-right text-warning">{fr.createdDaysAgo}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Red flag marking */}
      <div className="mt-3">
        <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
          {T.fundraiser.noticePrompt}
        </div>
        <div className="space-y-1.5">
          {fr.redFlags.map((f) => (
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
