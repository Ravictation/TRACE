import { useState } from 'react';
import { useGame } from '../game/GameContext';
import { STRINGS } from '../i18n/strings';
import type { PlatformId } from '../types/game';
import PlatformTwitter from './platforms/PlatformTwitter';
import PlatformInstagram from './platforms/PlatformInstagram';
import PlatformFacebook from './platforms/PlatformFacebook';
import PlatformWhatsApp from './platforms/PlatformWhatsApp';
import PlatformTikTok from './platforms/PlatformTikTok';

const PLATFORM_META: Record<PlatformId, { label: string; icon: string }> = {
  twitter: { label: 'X', icon: '𝕏' },
  instagram: { label: 'Instagram', icon: '📸' },
  facebook: { label: 'Facebook', icon: '📘' },
  whatsapp: { label: 'WhatsApp', icon: '💬' },
  tiktok: { label: 'TikTok', icon: '🎵' },
};

export default function SocialFeed() {
  const { state, currentCase } = useGame();
  const T = STRINGS[state.language];
  const [platform, setPlatform] = useState<PlatformId>(currentCase.platforms[0]);
  const post = currentCase.viralPost;
  const ratio = state.shareCount / post.threshold;

  return (
    <div className="animate-fade-in flex flex-col gap-3 p-4">
      {/* Feed header */}
      <div className="flex items-center justify-between border-b-2 border-border pb-2">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center border-2 border-border bg-danger font-mono text-[11px] font-black text-white shadow-[2px_2px_0_0_#1f1b16]">
            !
          </span>
          <span className="font-display text-sm font-bold uppercase tracking-wide text-text">
            {T.socialFeed.sourceOfViral}
          </span>
        </div>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-muted">
          {currentCase.platforms.length > 1 ? T.socialFeed.whereDidItSpread : T.socialFeed.singlePlatform}
        </span>
      </div>

      {/* Platform tabs — only platforms this case lives on */}
      {currentCase.platforms.length > 1 && (
        <div className="flex gap-1.5">
          {currentCase.platforms.map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`flex items-center gap-1.5 border-2 border-border px-2.5 py-1.5 font-mono text-[11px] font-bold transition ${
                platform === p
                  ? 'bg-accent text-border shadow-[2px_2px_0_0_#1f1b16]'
                  : 'bg-panel text-muted shadow-[2px_2px_0_0_#1f1b16] hover:bg-accent/40 hover:text-border'
              }`}
            >
              <span aria-hidden>{PLATFORM_META[p].icon}</span>
              <span className="hidden sm:inline">{PLATFORM_META[p].label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Active platform — remounts on tab switch so the sticker pops in */}
      <div key={platform} className="animate-fade-in min-h-0">
        {platform === 'twitter' && <PlatformTwitter />}
        {platform === 'instagram' && <PlatformInstagram />}
        {platform === 'facebook' && <PlatformFacebook />}
        {platform === 'whatsapp' && <PlatformWhatsApp />}
        {platform === 'tiktok' && <PlatformTikTok />}
      </div>

      {/* Critical warning */}
      {ratio >= 0.9 && (
        <div className="animate-pop-in border-2 border-border bg-danger px-2 py-1.5 font-mono text-[11px] font-bold text-white shadow-[2px_2px_0_0_#1f1b16]">
          {T.socialFeed.critical}
        </div>
      )}

      {/* Divider */}
      <div className="flex items-center gap-3 py-1">
        <div className="h-1 flex-1 border-2 border-border bg-accent" />
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-muted">
          {T.socialFeed.otherPosts}
        </span>
        <div className="h-1 flex-1 border-2 border-border bg-accent" />
      </div>

      {/* Filler posts */}
      {T.socialFeed.filler.map((f) => (
        <article
          key={f.handle}
          className="border-2 border-border bg-panel p-3 opacity-70"
        >
          <div className="mb-1.5 flex items-center gap-2">
            <div className="size-6 rounded-full bg-panel2" />
            <span className="font-mono text-xs text-muted">{f.handle}</span>
            <span className="ml-auto text-[10px] text-muted">{f.ago}</span>
          </div>
          <p className="text-sm text-muted">{f.content}</p>
          <div className="mt-2 flex gap-4 font-mono text-[10px] text-muted">
            <span>❤️ {f.likes}</span>
            <span>🔄 {f.shares}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
