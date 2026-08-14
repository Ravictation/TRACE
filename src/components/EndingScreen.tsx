import { useState } from 'react';
import { useGame } from '../game/GameContext';
import { ENDINGS } from '../data/endings';
import { STRINGS } from '../i18n/strings';
import { endingScoreParts } from '../utils/score';
import { addLeaderboardEntry, formatDate, getFullLeaderboard, getPlayerName, setPlayerName } from '../utils/storage';
import { formatMoney } from '../utils/format';
import BrandIcon from './BrandIcon';

/** Share targets — wa.me / intent URLs work without any SDK. */
const SHARE_BTN =
  'flex size-9 items-center justify-center border-2 border-border bg-panel font-mono text-xs font-bold text-text shadow-[2px_2px_0_0_#1f1b16] transition hover:bg-accent hover:text-border';

export default function EndingScreen() {
  const { state, dispatch } = useGame();
  const T = STRINGS[state.language];
  const locale = state.language === 'id' ? 'id-ID' : 'en-US';

  const ending =
    ENDINGS[state.language].find((en) => en.id === state.endingId) ?? ENDINGS[state.language][ENDINGS[state.language].length - 1];
  const parts = endingScoreParts(state.stats, ending.id);

  const [name, setName] = useState(getPlayerName());
  const [savedRank, setSavedRank] = useState<number | null>(null);
  const savedName = name.trim() !== '';

  const finalStats = [
    { icon: '💰', label: T.stats.money, value: formatMoney(state.stats.money, state.language) },
    { icon: '🧠', label: T.stats.stress, value: `${state.stats.stress}%` },
    { icon: '❤️', label: T.stats.health, value: `${state.stats.health}/100` },
    { icon: '🌟', label: T.stats.reputation, value: `${state.stats.reputation}` },
    { icon: '🎯', label: T.stats.accuracy, value: `${state.stats.accuracy}%` },
  ];

  const saveScore = async () => {
    if (!savedName || savedRank !== null) return;
    const date = formatDate(new Date());
    setPlayerName(name.trim());
    addLeaderboardEntry({ name: name.trim(), score: parts.total, casesSolved: 5, date });
    const full = await getFullLeaderboard();
    const rank = full.findIndex((e) => e.name === name.trim() && e.score === parts.total && e.date === date);
    setSavedRank(rank === -1 ? full.length : rank + 1);
  };

  // Share — copywriting generated from the actual ending.
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.origin;
  const shareText = T.ending.share.shareText(ending.title, parts.total, shareUrl);
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
        await navigator.share({ title: 'Hoax Defender', text: shareText });
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
    <div className="fixed inset-0 z-50 flex overflow-y-auto bg-bg/95 p-4">
      <div className="animate-fade-in card-brutal m-auto w-full max-w-lg p-6">
        <div className="mb-4 text-center">
          <div className="animate-stamp-in mx-auto flex size-14 items-center justify-center border-2 border-border bg-panel text-3xl shadow-[3px_3px_0_0_#1f1b16]" style={{ animationDelay: '100ms' }}>
            {ending.emoji}
          </div>
          <h2 className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            {T.ending.heading}
          </h2>
          <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-text">{ending.title}</h1>
        </div>

        {/* Narrative */}
        <div className="mb-4 space-y-3 border-2 border-border bg-panel2 p-4">
          {ending.narrative.map((p, i) => (
            <p key={i} className="font-mono text-xs leading-relaxed text-text">
              {p}
            </p>
          ))}
        </div>

        {/* Condition */}
        <div className="mb-4 border-2 border-border bg-accent/30 p-3">
          <div className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text">
            {T.ending.conditionLabel}
          </div>
          <p className="font-mono text-xs text-text">{ending.condition}</p>
        </div>

        {/* Final stats + track record */}
        <div className="mb-4 grid grid-cols-5 gap-2">
          {finalStats.map((s) => (
            <div key={s.label} className="border-2 border-border bg-panel p-2 text-center shadow-[2px_2px_0_0_#1f1b16]">
              <div className="text-sm">{s.icon}</div>
              <div className="tabular-nums mt-1 font-mono text-[11px] font-bold leading-tight text-text">{s.value}</div>
              <div className="font-mono text-[8px] uppercase tracking-wider text-muted">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-4 border-2 border-border bg-panel2 p-3">
          <div className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
            {T.ending.flagsRecap}
          </div>
          <div className="flex flex-wrap gap-2 font-mono text-[11px] font-bold">
            <span className="border-2 border-danger bg-danger/10 px-2 py-0.5 text-danger">
              🚨 {T.ending.scamCount(state.stats.scamCount)}
            </span>
            <span className="border-2 border-danger bg-danger/10 px-2 py-0.5 text-danger">
              📣 {T.ending.hoaksCount(state.stats.hoaksShareCount)}
            </span>
            <span className="border-2 border-success bg-success/10 px-2 py-0.5 text-success">
              ✅ {T.ending.factCheckCount(state.stats.factCheckCount)}
            </span>
          </div>
          {state.flags.includes('trueEndingKey') && (
            <p className="animate-pop-in mt-2 font-mono text-[11px] font-bold text-success">{T.ending.heroKey}</p>
          )}
        </div>

        {/* Score + leaderboard save */}
        <div className="mb-4 border-2 border-border bg-panel p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-muted">
              {T.ending.score}
            </span>
            <span className="tabular-nums font-display text-2xl font-bold text-text">
              {parts.total.toLocaleString(locale)}
            </span>
          </div>

          <div className="mt-2 space-y-0.5 border-t border-border pt-2 font-mono text-[10px] text-muted">
            <div className="flex justify-between">
              <span>{T.ending.scoreBreakdown.accuracy}</span>
              <span className="tabular-nums text-text">+{parts.accuracy}</span>
            </div>
            <div className="flex justify-between">
              <span>{T.ending.scoreBreakdown.reputation}</span>
              <span className="tabular-nums text-text">+{parts.reputation}</span>
            </div>
            <div className="flex justify-between">
              <span>{T.ending.scoreBreakdown.savings}</span>
              <span className="tabular-nums text-text">+{parts.savings}</span>
            </div>
            <div className="flex justify-between">
              <span>{T.ending.scoreBreakdown.factCheck}</span>
              <span className="tabular-nums text-text">+{parts.factCheck}</span>
            </div>
            <div className="flex justify-between">
              <span>{T.ending.scoreBreakdown.bonus}</span>
              <span className="tabular-nums text-text">+{parts.bonus}</span>
            </div>
          </div>

          {savedRank !== null ? (
            <p className="animate-pop-in mt-2 border-2 border-success bg-success px-2 py-1.5 font-mono text-xs font-bold text-white">
              {T.ending.saved(savedRank)}
            </p>
          ) : (
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={name}
                maxLength={16}
                onChange={(e) => setName(e.target.value)}
                placeholder={T.ending.namePlaceholder}
                className="min-w-0 flex-1 border-2 border-border bg-panel2 px-2 py-1.5 font-mono text-xs text-text outline-none placeholder:text-muted focus:outline-3 focus:outline-focus"
              />
              <button
                onClick={saveScore}
                disabled={!savedName}
                className="border-2 border-border bg-accent px-3 font-mono text-xs font-bold text-border transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-panel disabled:text-muted"
              >
                {T.ending.save}
              </button>
            </div>
          )}
        </div>

        {/* Share row */}
        <div className="mb-4 border-2 border-border bg-panel2 p-3">
          <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-muted">
            {T.ending.share.label}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a href={wa} target="_blank" rel="noopener noreferrer" title={T.ending.share.whatsapp} className={`${SHARE_BTN} text-[#25D366]`}>
              <BrandIcon name="whatsapp" />
            </a>
            <a href={xUrl} target="_blank" rel="noopener noreferrer" title={T.ending.share.x} className={`${SHARE_BTN} text-text`}>
              <BrandIcon name="x" />
            </a>
            <a href={fb} target="_blank" rel="noopener noreferrer" title={T.ending.share.facebook} className={`${SHARE_BTN} text-[#1877F2]`}>
              <BrandIcon name="facebook" />
            </a>
            <a href={tg} target="_blank" rel="noopener noreferrer" title={T.ending.share.telegram} className={`${SHARE_BTN} text-[#229ED9]`}>
              <BrandIcon name="telegram" />
            </a>
            <button onClick={shareInstagram} title={T.ending.share.instagram} className={`${SHARE_BTN} text-[#E4405F]`}>
              <BrandIcon name="instagram" />
            </button>
            <button
              onClick={copyShare}
              className={`flex-1 border-2 border-border px-3 py-2 font-mono text-xs font-bold tracking-wider transition ${
                copied
                  ? 'animate-pop-in border-success bg-success text-white'
                  : 'bg-panel text-text hover:bg-accent hover:text-border'
              }`}
            >
              {copied ? T.ending.share.copied : `🔗 ${T.ending.share.copy}`}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => dispatch({ type: 'RESET' })}
            className="btn-brutal w-full bg-accent py-3 font-mono text-sm font-bold tracking-wider text-border"
          >
            {T.ending.playAgain}
          </button>
          <button
            onClick={() => dispatch({ type: 'RESET' })}
            className="btn-brutal w-full bg-panel py-2 font-mono text-xs text-muted"
          >
            {T.ending.backToMenu}
          </button>
        </div>
      </div>
    </div>
  );
}
