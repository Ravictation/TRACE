import { useState } from 'react';
import { useGame } from '../game/GameContext';
import { STRINGS } from '../i18n/strings';
import type { ChoiceOption, SelectionSlot } from '../types/game';

const LETTERS = ['A', 'B', 'C'];

const MG_SLOTS: { slot: SelectionSlot; index: 0 | 1 | 2 }[] = [
  { slot: 'mg1', index: 0 },
  { slot: 'mg2', index: 1 },
  { slot: 'mg3', index: 2 },
];

/** Left: scenario box. Right: MG tabs (top) + decision dropdowns (bottom) + ENTER. */
export default function EventScreen() {
  const { state, dispatch, currentEvent } = useGame();
  const T = STRINGS[state.language];
  const [activeTab, setActiveTab] = useState(0);
  const e = currentEvent;
  const sel = state.selections;

  const mgDone = MG_SLOTS.filter(({ slot }) => sel[slot] !== null).length;
  const tabsDone = mgDone === 3;
  const decisionPicks = [sel.judgement, sel.action, sel.time].filter((v) => v !== null).length;
  const remaining = 6 - mgDone - decisionPicks;
  const decisionsDone = tabsDone && decisionPicks === 3;

  const tab = e.miniGames[activeTab];
  const tabSel = sel[MG_SLOTS[activeTab].slot];

  const dropdowns: { slot: SelectionSlot; label: string; options: ChoiceOption[]; value: string | null }[] = [
    { slot: 'judgement', label: T.decisions.vonis, options: e.judgement.options, value: sel.judgement },
    { slot: 'action', label: T.decisions.tindakan, options: e.action.options, value: sel.action },
    { slot: 'time', label: T.decisions.waktu, options: e.timeChoice.options, value: sel.time },
  ];

  return (
    <div className="animate-fade-in mx-auto w-full max-w-5xl px-4 py-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        {/* ── Left: scenario box ─────────────────────────────── */}
        <section className="w-full shrink-0 lg:w-[36%]">
          <div className="card-brutal p-5">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="border-2 border-border bg-accent px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-border">
                {T.steps.event(e.number)}
              </span>
              <span className="border-2 border-border bg-panel px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text">
                {e.time}
              </span>
              <span className="border-2 border-border bg-panel px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
                {e.tag}
              </span>
            </div>
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-text">{e.title}</h2>

            <div className="mt-3 space-y-2 font-mono text-xs leading-relaxed text-muted">
              {e.atmosphere.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* The incoming message that triggers the crisis */}
            <div className="mt-4 border-2 border-border bg-panel p-3 shadow-[3px_3px_0_0_#1f1b16]">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-muted">
                  {T.scenario.incoming}
                </span>
                <span className="border border-border bg-panel2 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-accent">
                  {T.scenario.apps[e.scenario.app]}
                </span>
              </div>
              <div className="font-mono text-[11px] font-bold text-text">{e.scenario.sender}</div>
              <p className="mt-1.5 border-l-2 border-accent pl-2 font-mono text-xs leading-relaxed text-text">
                {e.scenario.message}
              </p>
              {e.scenario.note && (
                <p className="mt-2 font-mono text-[10px] italic leading-relaxed text-muted">
                  ⚠ {e.scenario.note}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── Right: MG tabs + decision dropdowns + ENTER ─────── */}
        <section className="min-w-0 flex-1">
          <div className="card-brutal p-5">
            {/* Tab bar */}
            <div className="mb-3 flex flex-wrap items-center gap-1.5">
              {MG_SLOTS.map(({ slot }, i) => {
                const done = sel[slot] !== null;
                const active = activeTab === i;
                return (
                  <button
                    key={slot}
                    onClick={() => setActiveTab(i)}
                    className={`border-2 border-border px-3 py-1.5 font-mono text-[11px] font-bold tracking-wider transition ${
                      active
                        ? 'bg-accent text-border shadow-[2px_2px_0_0_#1f1b16]'
                        : done
                          ? 'bg-panel text-success'
                          : 'bg-panel text-muted hover:bg-accent/30'
                    }`}
                  >
                    {done && <span className="mr-1">{T.tabs.done}</span>}
                    {T.tabs.mg(i + 1)}
                  </button>
                );
              })}
              <span className="ml-auto border-2 border-border bg-panel2 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-text">
                {T.tabs.progress(mgDone, 3)}
              </span>
            </div>

            {/* Active tab content — remounts per tab so it slides in fresh */}
            <div key={activeTab} className="animate-slide-in">
              <h3 className="font-display text-base font-bold uppercase tracking-wide text-text">
                {tab.title}
              </h3>
              <p className="mt-1 font-mono text-xs leading-relaxed text-muted">{tab.flavor}</p>
              <p className="mb-2 mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
                {T.tabs.pick}
              </p>
              <div className="space-y-1.5">
                {tab.options.map((opt, i) => {
                  const chosen = tabSel === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => dispatch({ type: 'SELECT', slot: MG_SLOTS[activeTab].slot, optionId: opt.id })}
                      className={`flex w-full cursor-pointer items-start gap-2.5 border-2 border-border px-3 py-2 text-left transition ${
                        chosen
                          ? 'bg-accent text-border shadow-[2px_2px_0_0_#1f1b16]'
                          : 'bg-panel text-text hover:bg-accent/30'
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center border-2 border-border font-mono text-[10px] font-black ${
                          chosen ? 'bg-bg text-accent' : 'bg-panel2 text-text'
                        }`}
                      >
                        {LETTERS[i]}
                      </span>
                      <span className="font-mono text-xs leading-snug">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Decision dropdowns — locked until all 3 MGs are done */}
            <div className="mt-4 border-t-2 border-border pt-4">
              <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text">
                {T.decisions.title}
              </div>
              {!tabsDone ? (
                <p className="animate-pop-in mb-3 border-2 border-border bg-panel2 p-2.5 font-mono text-[11px] font-bold text-muted">
                  {T.decisions.locked}
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {dropdowns.map((d) => (
                    <label key={d.slot} className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
                        [{d.label}]
                      </span>
                      <select
                        value={d.value ?? ''}
                        onChange={(ev) => dispatch({ type: 'SELECT', slot: d.slot, optionId: ev.target.value })}
                        className="w-full border-2 border-border bg-panel px-2 py-1.5 font-mono text-xs text-text outline-none focus:outline-3 focus:outline-focus"
                      >
                        <option value="" disabled>
                          {T.decisions.placeholder}
                        </option>
                        {d.options.map((o) => (
                          <option key={o.id} value={o.id}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  ))}
                </div>
              )}

              {/* ENTER — the final execution button */}
              <button
                onClick={() => dispatch({ type: 'ENTER_EVENT' })}
                disabled={!decisionsDone}
                className="btn-brutal mt-4 w-full bg-success py-3.5 font-mono text-sm font-bold tracking-wider text-white disabled:cursor-not-allowed disabled:bg-panel disabled:text-muted disabled:shadow-none"
              >
                {T.enter.label}
              </button>
              <p className="mt-2 text-center font-mono text-[10px] text-muted">
                {decisionsDone ? T.enter.hint : T.enter.locked(remaining)}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
