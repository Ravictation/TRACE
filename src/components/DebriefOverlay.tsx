import { useState } from 'react';
import { useGame } from '../game/GameContext';
import { CASES } from '../data/cases';
import { scoreParts } from '../utils/score';
import { STRINGS } from '../i18n/strings';
import { addLeaderboardEntry, formatDate, getFullLeaderboard, getPlayerName, setPlayerName } from '../utils/storage';
import BrandIcon from './BrandIcon';

/** Share targets — wa.me / intent URLs work without any SDK. */
const SHARE_BTN = 'flex size-9 items-center justify-center border-2 border-border bg-panel font-mono text-xs font-bold text-text shadow-[2px_2px_0_0_#1f1b16] transition hover:bg-accent hover:text-border';

export default function DebriefOverlay() {
  const { state, dispatch, currentCase } = useGame();
  const T = STRINGS[state.language];
  const d = currentCase.debrief;
  const result = state.completedResults[state.caseIndex];
  // Old saves have no endReason → treat as a normal verdict end.
  const failed = result?.endReason != null && result.endReason !== 'verdict';
  const isCorrect =
    !failed &&
    state.verdictSelected === currentCase.verdict.correctVerdictId &&
    state.actionSelected === currentCase.verdict.correctAction;
  const hasNext = state.caseIndex < CASES[state.language].length - 1;
  const locale = state.language === 'id' ? 'id-ID' : 'en-US';

  const [name, setName] = useState(getPlayerName());
  const [savedRank, setSavedRank] = useState<number | null>(null);
  const savedName = name.trim() !== '';

  const minutes = Math.floor(state.elapsedSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (state.elapsedSeconds % 60).toString().padStart(2, '0');
  const sharesStopped = Math.max(0, currentCase.viralPost.threshold - state.shareCount);

  const stats = [
    { label: d.stats.timeLabel, value: `${minutes}:${seconds}` },
    {
      label: d.stats.accuracyLabel,
      value: failed ? T.debrief.failed : isCorrect ? T.debrief.correct : T.debrief.wrong,
    },
    { label: d.stats.toolsLabel, value: `${state.discoveredClues.length}` },
    {
      label: d.stats.sharesStoppedLabel,
      value: failed ? '—' : sharesStopped.toLocaleString(locale),
    },
  ];

  // Score breakdown (only meaningful for verdict endings — failures score 0).
  const parts = result ? scoreParts(currentCase, isCorrect, result.timeSeconds, result.sharesAtSubmit) : null;

  const saveScore = async () => {
    if (!savedName || savedRank !== null || !result) return;
    const date = formatDate(new Date());
    setPlayerName(name.trim());
    addLeaderboardEntry({
      name: name.trim(),
      score: result.score,
      casesSolved: state.completedResults.filter(Boolean).length,
      date,
    });
    // Rank against the FULL leaderboard (seed + local) — the local list alone
    // under-counts, making "you're #1" wrong when seed entries rank higher.
    const full = await getFullLeaderboard();
    const rank = full.findIndex(
      (e) => e.name === name.trim() && e.score === result.score && e.date === date,
    );
    setSavedRank(rank === -1 ? full.length : rank + 1);
  };

  // Share — copywriting generated from the actual result.
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.origin;
  const shareText = result
    ? T.debrief.share.shareText(result.score, result.correct, currentCase.title, shareUrl)
    : '';
  const shareQuoted = encodeURIComponent(shareText);
  const wa = `https://wa.me/?text=${shareQuoted}`;
  const xUrl = `https://twitter.com/intent/tweet?text=${shareQuoted}`;
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${shareQuoted}`;
  const tg = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${shareQuoted}`;

  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
    } catch {
      // clipboard blocked — fall back to a textarea trick
      const ta = document.createElement('textarea');
      ta.value = shareText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const shareInstagram = async () => {
    // Instagram has no web share intent — use the native share sheet when
    // available, otherwise fall back to copying the text.
    if (navigator.share) {
      try {
        await navigator.share({ title: 'TRACE', text: shareText });
        return;
      } catch {
        // user cancelled — nothing to do
      }
    }
    copyShare();
  };

  return (
    // m-auto keeps the card centered when it fits, but lets the overlay
    // scroll from the top when the card is taller than the viewport.
    <div className="fixed inset-0 z-50 flex overflow-y-auto bg-bg/90 p-4">
      <div className="animate-fade-in card-brutal m-auto w-full max-w-lg p-6">
        <div className="mb-4 text-center">
          <div
            className={`animate-stamp-in mx-auto flex size-14 items-center justify-center border-2 border-border bg-panel text-3xl shadow-[3px_3px_0_0_#1f1b16] ${
              failed || !isCorrect ? 'animate-wobble' : ''
            }`}
            style={{ animationDelay: '150ms' }}
          >
            {failed ? '⏰' : isCorrect ? '✅' : '⚠️'}
          </div>
          <h2 className="mt-4 font-display text-xl font-bold uppercase tracking-wide text-text">
            {failed ? T.debrief.failHeading(currentCase.caseNumber) : T.debrief.resolved(currentCase.caseNumber)}
          </h2>
          <p className="mt-1 font-mono text-sm text-muted">
            {failed ? d.failHeadline : d.headline}
          </p>
        </div>

        {/* Failed → what actually happened; verdict → the SIFT breakdown */}
        {failed ? (
          <div className="mb-4 border-2 border-border bg-danger/10 p-4">
            <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-danger">
              {T.debrief.consequenceLabel}
            </div>
            <p className="font-mono text-xs leading-relaxed text-text">{d.failConsequence}</p>
          </div>
        ) : (
          <div className="mb-4 border-2 border-border bg-accent/30 p-4">
            <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-text">
              {T.debrief.youJustUsed}
            </div>
            <ul className="space-y-1.5 font-mono text-xs leading-relaxed text-text">
              <li className="flex gap-2">
                <span className="inline-block border-2 border-border bg-accent px-1 font-black">S</span> {d.sift.s}
              </li>
              <li className="flex gap-2">
                <span className="inline-block border-2 border-border bg-accent px-1 font-black">I</span> {d.sift.i}
              </li>
              <li className="flex gap-2">
                <span className="inline-block border-2 border-border bg-accent px-1 font-black">F</span> {d.sift.f}
              </li>
              <li className="flex gap-2">
                <span className="inline-block border-2 border-border bg-accent px-1 font-black">T</span> {d.sift.t}
              </li>
            </ul>
          </div>
        )}

        <div className="mb-4 border-2 border-border bg-panel2 p-4">
          <div className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-warning">
            {T.debrief.takeaway}
          </div>
          <p className="font-mono text-xs leading-relaxed text-text">{d.realWorldTakeaway}</p>
        </div>

        <div className="mb-4 border-2 border-border bg-panel p-3">
          <div className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-accent">
            ⭐ {T.debrief.funFactLabel}
          </div>
          <p className="font-mono text-xs leading-relaxed text-text">{d.funFact}</p>
        </div>

        <div className="mb-4 grid grid-cols-4 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="border-2 border-border bg-panel p-2 text-center shadow-[2px_2px_0_0_#1f1b16]">
              <div className="tabular-nums font-mono text-sm font-bold text-text">{s.value}</div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-muted">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Score + leaderboard save */}
        <div className="mb-4 border-2 border-border bg-panel p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-muted">
              {T.debrief.caseScore}
            </span>
            <span className="tabular-nums font-display text-2xl font-bold text-text">
              {result ? result.score.toLocaleString(locale) : '—'}
            </span>
          </div>

          {/* Breakdown — only shown for verdict endings */}
          {parts && !failed && (
            <div className="mt-2 space-y-0.5 border-t border-border pt-2 font-mono text-[10px] text-muted">
              <div className="flex justify-between">
                <span>{T.debrief.scoreBreakdown.base}</span>
                <span className="tabular-nums text-text">+{parts.base}</span>
              </div>
              <div className="flex justify-between">
                <span>{T.debrief.scoreBreakdown.speed}</span>
                <span className="tabular-nums text-text">+{parts.speed}</span>
              </div>
              <div className="flex justify-between">
                <span>{T.debrief.scoreBreakdown.prevented}</span>
                <span className="tabular-nums text-text">+{parts.prevented}</span>
              </div>
            </div>
          )}

          {savedRank !== null ? (
            <p className="animate-pop-in mt-2 border-2 border-success bg-success px-2 py-1.5 font-mono text-xs font-bold text-white">
              {T.debrief.saved(savedRank)}
            </p>
          ) : (
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={name}
                maxLength={16}
                onChange={(e) => setName(e.target.value)}
                placeholder={T.debrief.namePlaceholder}
                className="min-w-0 flex-1 border-2 border-border bg-panel2 px-2 py-1.5 font-mono text-xs text-text outline-none placeholder:text-muted focus:outline-3 focus:outline-focus"
              />
              <button
                onClick={saveScore}
                disabled={!savedName}
                className="border-2 border-border bg-accent px-3 font-mono text-xs font-bold text-border transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-panel disabled:text-muted"
              >
                {T.debrief.save}
              </button>
            </div>
          )}
        </div>

        {/* Share row */}
        {result && (
          <div className="mb-4 border-2 border-border bg-panel2 p-3">
            <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-muted">
              {T.debrief.share.label}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a href={wa} target="_blank" rel="noopener noreferrer" title={T.debrief.share.whatsapp} className={`${SHARE_BTN} text-[#25D366]`}>
                <BrandIcon name="whatsapp" />
              </a>
              <a href={xUrl} target="_blank" rel="noopener noreferrer" title={T.debrief.share.x} className={`${SHARE_BTN} text-text`}>
                <BrandIcon name="x" />
              </a>
              <a href={fb} target="_blank" rel="noopener noreferrer" title={T.debrief.share.facebook} className={`${SHARE_BTN} text-[#1877F2]`}>
                <BrandIcon name="facebook" />
              </a>
              <a href={tg} target="_blank" rel="noopener noreferrer" title={T.debrief.share.telegram} className={`${SHARE_BTN} text-[#229ED9]`}>
                <BrandIcon name="telegram" />
              </a>
              <button onClick={shareInstagram} title={T.debrief.share.instagram} className={`${SHARE_BTN} text-[#E4405F]`}>
                <BrandIcon name="instagram" />
              </button>
              <button
                onClick={copyShare}
                className={`flex-1 border-2 border-border px-3 py-2 font-mono text-xs font-bold tracking-wider transition ${
                  copied ? 'animate-pop-in border-success bg-success text-white' : 'bg-panel text-text hover:bg-accent hover:text-border'
                }`}
              >
                {copied ? T.debrief.share.copied : `🔗 ${T.debrief.share.copy}`}
              </button>
            </div>
          </div>
        )}

        {hasNext ? (
          <div className="space-y-2">
            <button
              onClick={() => dispatch({ type: 'NEXT_CASE' })}
              className="btn-brutal w-full bg-accent py-3 font-mono text-sm font-bold tracking-wider text-border"
            >
              {T.debrief.nextCase(CASES[state.language][state.caseIndex + 1].title.toUpperCase())}
            </button>
            <button
              onClick={() => dispatch({ type: 'RESET' })}
              className="btn-brutal w-full bg-panel py-2 font-mono text-xs text-muted"
            >
              {T.debrief.backToStart}
            </button>
          </div>
        ) : (
          <button
            onClick={() => dispatch({ type: 'RESET' })}
            className="btn-brutal w-full bg-accent py-3 font-mono text-sm font-bold tracking-wider text-border"
          >
            {T.debrief.playAgain}
          </button>
        )}
      </div>
    </div>
  );
}
