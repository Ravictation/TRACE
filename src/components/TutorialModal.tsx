import { useState } from 'react';
import { useGame } from '../game/GameContext';
import { ENDINGS } from '../data/endings';
import { STRINGS } from '../i18n/strings';
import type { UiStrings } from '../i18n/strings';

/**
 * Tutorial — 4 static steps explaining Anton's Dilemma:
 * the role, the 5 stats, the per-event flow, and the 5 endings.
 */
interface Props {
  onClose: () => void;
}

export default function TutorialModal({ onClose }: Props) {
  const { state } = useGame();
  const T = STRINGS[state.language].tutorial;
  const [step, setStep] = useState(0);
  const total = 4;
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
              className={`h-1.5 flex-1 border border-border ${i <= step ? 'bg-accent' : 'bg-panel'}`}
            />
          ))}
        </div>
        <div className="mb-4 text-right font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
          {T.stepOf(step + 1, total)}
        </div>

        {/* Step content */}
        <div key={step} className="min-h-[240px]">
          {step === 0 && <Step title={T.s1.title} body={T.s1.body} demo={<StepAnton />} />}
          {step === 1 && <Step title={T.s2.title} body={T.s2.body} demo={<StepStats />} />}
          {step === 2 && <Step title={T.s3.title} body={T.s3.body} demo={<StepFlow T={STRINGS[state.language]} />} />}
          {step === 3 && <Step title={T.s4.title} body={T.s4.body} demo={<StepEndings endings={ENDINGS[state.language]} />} />}
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
              isLast
                ? 'bg-success text-white shadow-[2px_2px_0_0_#1f1b16]'
                : 'bg-accent text-border shadow-[2px_2px_0_0_#1f1b16] hover:bg-accent/90'
            }`}
          >
            {isLast ? T.start : T.next}
          </button>
        </div>
      </div>
    </div>
  );
}

function Step({ title, body, demo }: { title: string; body: string; demo: React.ReactNode }) {
  return (
    <div className="animate-slide-in">
      <h3 className="font-display text-base font-bold uppercase tracking-wide text-text">{title}</h3>
      <p className="mb-4 mt-1 font-mono text-xs leading-relaxed text-muted">{body}</p>
      {demo}
    </div>
  );
}

/* ── Step 1: Anton ───────────────────────────────────────── */

function StepAnton() {
  return (
    <div className="border-2 border-border bg-panel p-3">
      <div className="flex items-center gap-2 font-mono text-xs text-text">
        <span className="flex size-8 items-center justify-center border-2 border-border bg-accent font-display text-sm font-bold text-border">
          A
        </span>
        <span className="font-bold">Anton Wibowo, 45</span>
        <span className="ml-auto text-[10px] text-muted">PHK 2 bulan lalu</span>
      </div>
      <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted">
        🏠 Jakarta Timur · 👩 Sri (istri) · 🎓 Kilas (kuliah di Magelang) · 📚 Bimo (SMP)
      </p>
    </div>
  );
}

/* ── Step 2: the 5 stats ─────────────────────────────────── */

const STATS_DEMO = [
  { icon: '💰', label: 'Uang', value: 'Rp 5.000.000' },
  { icon: '🧠', label: 'Stres', value: '50%' },
  { icon: '❤️', label: 'Kesehatan', value: '100' },
  { icon: '🌟', label: 'Reputasi', value: '100' },
  { icon: '🎯', label: 'Akurasi', value: '0%' },
];

function StepStats() {
  return (
    <div className="grid grid-cols-5 gap-2">
      {STATS_DEMO.map((s) => (
        <div key={s.label} className="border-2 border-border bg-panel p-2 text-center shadow-[2px_2px_0_0_#1f1b16]">
          <div className="text-sm">{s.icon}</div>
          <div className="mt-1 font-mono text-[10px] font-bold text-text">{s.value}</div>
          <div className="font-mono text-[8px] uppercase tracking-wider text-muted">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Step 3: the tab & dropdown flow ─────────────────────── */

function StepFlow({ T }: { T: UiStrings }) {
  const flow = [T.tabs.mg(1), T.tabs.mg(2), T.tabs.mg(3), T.decisions.vonis, T.decisions.tindakan, T.decisions.waktu, T.enter.label];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {flow.map((label, i) => (
        <span key={i} className="flex items-center gap-2">
          <span
            className={`border-2 border-border px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${
              i < 3 ? 'bg-accent text-border' : i === flow.length - 1 ? 'bg-danger text-white' : 'bg-panel text-text'
            }`}
          >
            {label}
          </span>
          {i < flow.length - 1 && <span className="font-mono text-text">→</span>}
        </span>
      ))}
    </div>
  );
}

/* ── Step 4: the 5 endings ───────────────────────────────── */

function StepEndings({ endings }: { endings: (typeof ENDINGS)['id'] }) {
  return (
    <div className="space-y-1.5">
      {endings.map((e) => (
        <div
          key={e.id}
          className={`border-2 border-border px-3 py-1.5 font-mono text-[11px] ${
            e.id === 'hero' ? 'bg-success text-white' : 'bg-panel text-text'
          }`}
        >
          {e.emoji} {e.title}
        </div>
      ))}
    </div>
  );
}
