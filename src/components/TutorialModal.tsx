import { useState } from 'react';
import { useGame } from '../game/GameContext';
import { STRINGS } from '../i18n/strings';

/**
 * Interactive tutorial — 6 steps, each with a clickable mini-demo so the
 * player learns by doing (spread counter, focus points, reverse image,
 * missing coverage, verdict, fail conditions).
 */
type TutorialStrings = (typeof STRINGS)['id']['tutorial'];

interface Props {
  onClose: () => void;
}

export default function TutorialModal({ onClose }: Props) {
  const { state } = useGame();
  const T = STRINGS[state.language].tutorial;
  const [step, setStep] = useState(0);
  const total = 6;
  const isLast = step === total - 1;

  return (
    <div className="fixed inset-0 z-50 flex overflow-y-auto bg-bg/90 p-4">
      <div className="animate-fade-in card-brutal m-auto flex w-full max-w-lg flex-col p-6">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-text">
            {T.title}
          </h2>
          <button
            onClick={onClose}
            aria-label={T.closeAria}
            className="border-2 border-border bg-panel px-2 py-1 font-mono text-xs font-bold text-text shadow-[2px_2px_0_0_#1f1b16] transition hover:bg-accent"
          >
            ✕
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-1 flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 border border-border ${
                i <= step ? 'bg-accent' : 'bg-panel'
              }`}
            />
          ))}
        </div>
        <div className="mb-4 text-right font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
          {T.stepOf(step + 1, total)}
        </div>

        {/* Step content — demos remount per step so their state resets */}
        <div className="min-h-[320px]">
          {step === 0 && <StepMission T={T} />}
          {step === 1 && <StepStatusBar T={T} />}
          {step === 2 && <StepReverse T={T} />}
          {step === 3 && <StepNews T={T} />}
          {step === 4 && <StepVerdict T={T} />}
          {step === 5 && <StepScore T={T} />}
        </div>

        {/* Nav */}
        <div className="mt-4 flex items-center justify-between border-t-2 border-border pt-3">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="border-2 border-border bg-panel px-3 py-1.5 font-mono text-xs font-bold text-text transition hover:bg-accent/40 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {T.back}
          </button>
          <button
            onClick={isLast ? onClose : () => setStep((s) => Math.min(total - 1, s + 1))}
            className={`border-2 border-border px-4 py-1.5 font-mono text-xs font-bold tracking-wider transition ${
              isLast ? 'bg-success text-white shadow-[2px_2px_0_0_#1f1b16]' : 'bg-accent text-border shadow-[2px_2px_0_0_#1f1b16] hover:bg-accent/90'
            }`}
          >
            {isLast ? T.start : T.next}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Step scaffold ───────────────────────────────────────── */

function StepShell({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-slide-in">
      <h3 className="font-display text-base font-bold uppercase tracking-wide text-text">
        {title}
      </h3>
      <p className="mb-4 mt-1 font-mono text-xs leading-relaxed text-muted">{body}</p>
      {children}
    </div>
  );
}

/* ── Step 1: mission + spread counter ────────────────────── */

function StepMission({ T }: { T: TutorialStrings }) {
  const [count, setCount] = useState(12000);
  const over = count >= 80000;
  return (
    <StepShell title={T.s1.title} body={T.s1.body}>
      <div className="border-2 border-border bg-[#15202b] p-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="flex size-7 items-center justify-center rounded-full bg-[#263440] font-mono text-[10px] font-bold text-[#8899a6]">
            B
          </span>
          <span className="font-bold text-white">info_banjir_jkt</span>
          <span className="ml-auto text-[10px] text-[#8899a6]">2 jam lalu</span>
        </div>
        <p className="mt-2 text-[13px] leading-snug text-white">
          BANJIR BESAR MELANDA JAKARTA SELATAN HARI INI!! Pemerintah TUTUP-TUTUPI.
        </p>
        <div className="mt-2 flex aspect-video items-center justify-center border border-[#38444d] bg-[#1c2a38] font-mono text-[10px] text-[#8899a6]">
          [ foto ]
        </div>
        <div
          className={`mt-2 font-mono text-xs font-bold ${
            over ? 'animate-pulse-danger text-danger' : 'text-[#8899a6]'
          }`}
        >
          🔄 {count.toLocaleString()} share
        </div>
      </div>
      <button
        onClick={() => setCount((c) => c + 1500)}
        disabled={over}
        className="mt-3 w-full border-2 border-border bg-accent py-2 font-mono text-xs font-bold tracking-wider text-border transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-panel disabled:text-muted"
      >
        {T.s1.spreadBtn}
      </button>
      <p className="mt-2 font-mono text-[10px] leading-relaxed text-muted">
        {over ? '⚠ ' + T.s6.fail : T.s1.hint}
      </p>
    </StepShell>
  );
}

/* ── Step 2: status bar + focus points ───────────────────── */

function StepStatusBar({ T }: { T: TutorialStrings }) {
  const TOOLS = [
    { id: 'rev', label: T.s2.tools[0] },
    { id: 'acc', label: T.s2.tools[1] },
    { id: 'news', label: T.s2.tools[2] },
  ];
  const [focus, setFocus] = useState(5);
  const [opened, setOpened] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [lastFree, setLastFree] = useState(false);

  const click = (id: string) => {
    if (opened.includes(id)) {
      setActive(id);
      setLastFree(true);
      return;
    }
    if (focus <= 0) return;
    setOpened((o) => [...o, id]);
    setFocus((f) => f - 1);
    setActive(id);
    setLastFree(false);
  };

  return (
    <StepShell title={T.s2.title} body={T.s2.body}>
      <div className="flex flex-wrap items-center gap-2 border-2 border-border bg-panel2 px-3 py-2">
        <span className="font-mono text-[10px] font-bold text-muted">{T.s2.focusLabel}</span>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`size-2.5 border border-border ${i < focus ? 'bg-accent' : 'bg-panel'}`} />
          ))}
        </div>
        <span className="font-mono text-xs font-bold text-text">{focus}/5</span>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            onClick={() => click(t.id)}
            className={`border-2 border-border px-2.5 py-1.5 font-mono text-[11px] font-bold transition ${
              active === t.id
                ? 'bg-accent text-border shadow-[2px_2px_0_0_#1f1b16]'
                : 'bg-panel text-muted hover:bg-accent/40'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="mt-2 min-h-8 font-mono text-[10px] leading-relaxed text-warning">
        {lastFree && T.s2.freeReopen}
      </p>
    </StepShell>
  );
}

/* ── Step 3: reverse image match ──────────────────────────── */

function StepReverse({ T }: { T: TutorialStrings }) {
  const [status, setStatus] = useState<'idle' | 'wrong' | 'won'>('idle');
  const [shake, setShake] = useState<number | null>(null);

  const click = (i: number) => {
    if (status === 'won') return;
    if (i === 2) {
      setStatus('won');
    } else {
      setStatus('wrong');
      setShake(i);
      window.setTimeout(() => setShake(null), 450);
    }
  };

  return (
    <StepShell title={T.s3.title} body={T.s3.body}>
      <div className="grid grid-cols-2 gap-2">
        {T.s3.results.map((label, i) => (
          <button
            key={i}
            onClick={() => click(i)}
            className={`flex flex-col overflow-hidden border-2 border-border text-left transition ${
              status === 'won' && i === 2
                ? 'animate-pop-in border-success bg-success text-white'
                : status === 'wrong' && shake === i
                  ? 'animate-shake border-danger bg-danger'
                  : 'bg-panel hover:border-accent'
            }`}
          >
            <div className="flex aspect-[4/3] items-center justify-center bg-panel2 font-mono text-[10px] text-muted">
              [ {i + 1} ]
            </div>
            <div className="p-1.5 font-mono text-[10px] text-text">{label}</div>
          </button>
        ))}
      </div>
      <p
        className={`mt-2 min-h-8 font-mono text-xs font-bold ${
          status === 'won' ? 'text-success' : status === 'wrong' ? 'text-warning' : 'text-muted'
        }`}
      >
        {status === 'won' ? T.s3.win : status === 'wrong' ? T.s3.wrong : ''}
      </p>
    </StepShell>
  );
}

/* ── Step 4: missing coverage ─────────────────────────────── */

function StepNews({ T }: { T: TutorialStrings }) {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <StepShell title={T.s4.title} body={T.s4.body}>
      <div className="space-y-1.5">
        {T.s4.headlines.map((h, i) => (
          <div key={i} className="border-2 border-border bg-panel p-2 text-[11px] text-text">
            {h}
          </div>
        ))}
      </div>
      <button
        onClick={() => setConfirmed(true)}
        disabled={confirmed}
        className={`mt-3 w-full border-2 py-2 font-mono text-xs font-bold tracking-wider transition ${
          confirmed
            ? 'animate-pop-in border-success bg-success text-white'
            : 'border-warning bg-warning text-white hover:bg-warning/90'
        }`}
      >
        {confirmed ? T.s4.confirmed : T.s4.confirmBtn}
      </button>
    </StepShell>
  );
}

/* ── Step 5: verdict demo ─────────────────────────────────── */

function StepVerdict({ T }: { T: TutorialStrings }) {
  const [v, setV] = useState<number | null>(null);
  const [a, setA] = useState<number | null>(null);
  const [result, setResult] = useState<'idle' | 'won' | 'lose'>('idle');

  const submit = () => {
    if (v === null || a === null) return;
    setResult(v === 1 && a === 1 ? 'won' : 'lose');
  };

  return (
    <StepShell title={T.s5.title} body={T.s5.body}>
      <div className="space-y-1.5">
        {T.s5.verdicts.map((label, i) => (
          <label
            key={i}
            className={`flex cursor-pointer items-center gap-2 border-2 border-border px-2.5 py-1.5 text-xs transition ${
              v === i ? 'bg-accent text-border' : 'bg-panel text-text hover:bg-accent/30'
            }`}
          >
            <input type="radio" checked={v === i} onChange={() => setV(i)} className="accent-border" />
            {label}
          </label>
        ))}
      </div>
      <div className="mt-2 space-y-1.5">
        {T.s5.actions.map((label, i) => (
          <label
            key={i}
            className={`flex cursor-pointer items-center gap-2 border-2 border-border px-2.5 py-1.5 text-xs transition ${
              a === i ? 'bg-accent text-border' : 'bg-panel text-text hover:bg-accent/30'
            }`}
          >
            <input type="radio" checked={a === i} onChange={() => setA(i)} className="accent-border" />
            {label}
          </label>
        ))}
      </div>
      <button
        onClick={submit}
        disabled={v === null || a === null}
        className="mt-3 w-full border-2 border-border bg-accent py-2 font-mono text-xs font-bold tracking-wider text-border transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-panel disabled:text-muted"
      >
        {T.s5.submit}
      </button>
      <p
        className={`mt-2 min-h-8 font-mono text-xs font-bold ${
          result === 'won' ? 'text-success' : result === 'lose' ? 'text-warning' : 'text-muted'
        }`}
      >
        {result === 'won' ? T.s5.win : result === 'lose' ? T.s5.lose : ''}
      </p>
    </StepShell>
  );
}

/* ── Step 6: score + fail conditions ──────────────────────── */

function StepScore({ T }: { T: TutorialStrings }) {
  const [fill, setFill] = useState(0.35);
  const failed = fill >= 1;

  return (
    <StepShell title={T.s6.title} body={T.s6.body}>
      <div className="border-2 border-border bg-panel2 p-3">
        <div className="mb-1 flex items-center justify-between font-mono text-[10px] text-muted">
          <span>📊 Share counter</span>
          <span className="tabular-nums text-text">{Math.round(fill * 100)}%</span>
        </div>
        <div className="h-2.5 overflow-hidden border border-border bg-panel">
          <div
            className={`h-full transition-all duration-500 ${
              fill >= 0.9 ? 'bg-danger' : fill >= 0.7 ? 'bg-warning' : 'bg-accent'
            }`}
            style={{ width: `${Math.min(100, fill * 100)}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[9px] text-muted">
          <span>0</span>
          <span className={fill >= 0.7 ? 'font-bold text-warning' : ''}>70% ⚠</span>
          <span className={fill >= 0.9 ? 'font-bold text-danger' : ''}>90% 🔴</span>
          <span>100% = GAGAL</span>
        </div>
      </div>

      {failed ? (
        <div className="animate-pop-in mt-3 border-2 border-danger bg-danger/10 p-3">
          <p className="font-mono text-xs font-bold text-danger">{T.s6.fail}</p>
          <p className="mt-1 font-mono text-[10px] text-text">{T.s6.scoreLine}</p>
        </div>
      ) : (
        <button
          onClick={() => setFill((f) => f + 0.22)}
          className="mt-3 w-full border-2 border-border bg-danger py-2 font-mono text-xs font-bold tracking-wider text-white transition hover:bg-danger/90"
        >
          {T.s6.spreadBtn}
        </button>
      )}
    </StepShell>
  );
}
