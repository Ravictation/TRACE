import { useState } from 'react';
import { useGame } from '../game/GameContext';
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

const FILLER_POSTS = [
  {
    handle: '@weather_update',
    content: 'Sunny weekend ahead ☀️ High of 31°C tomorrow. Perfect for the park.',
    likes: '1.2K',
    shares: '340',
    ago: '30m',
  },
  {
    handle: '@local_sports',
    content: 'Big match tonight! City derby kicks off at 19:30. Live coverage on our page.',
    likes: '3.4K',
    shares: '890',
    ago: '1h',
  },
];

export default function SocialFeed() {
  const { state, currentCase } = useGame();
  const [platform, setPlatform] = useState<PlatformId>(currentCase.platforms[0]);
  const post = currentCase.viralPost;
  const ratio = state.shareCount / post.threshold;

  return (
    <div className="animate-fade-in flex flex-col gap-3 p-4">
      {/* Feed header */}
      <div className="flex items-center justify-between border-b border-border pb-2">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-full bg-danger font-mono text-[11px] font-black text-white">
            !
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-text">
            Source of viral content
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted">
          {currentCase.platforms.length > 1 ? 'where did it spread?' : 'single platform'}
        </span>
      </div>

      {/* Platform tabs — only platforms this case lives on */}
      {currentCase.platforms.length > 1 && (
        <div className="flex gap-1.5">
          {currentCase.platforms.map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[11px] font-semibold transition ${
                platform === p
                  ? 'border-accent bg-accent/15 text-accent'
                  : 'border-border bg-panel text-muted hover:border-accent/50 hover:text-text'
              }`}
            >
              <span aria-hidden>{PLATFORM_META[p].icon}</span>
              <span className="hidden sm:inline">{PLATFORM_META[p].label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Active platform */}
      <div className="min-h-0">
        {platform === 'twitter' && <PlatformTwitter />}
        {platform === 'instagram' && <PlatformInstagram />}
        {platform === 'facebook' && <PlatformFacebook />}
        {platform === 'whatsapp' && <PlatformWhatsApp />}
        {platform === 'tiktok' && <PlatformTikTok />}
      </div>

      {/* Critical warning */}
      {ratio >= 0.9 && (
        <div className="animate-fade-in rounded border border-danger/40 bg-danger/10 px-2 py-1.5 font-mono text-[11px] text-danger">
          ⚠ CRITICAL: Post has nearly reached saturation point.
        </div>
      )}

      {/* Divider */}
      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-border" />
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
          other posts
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Filler posts */}
      {FILLER_POSTS.map((f) => (
        <article
          key={f.handle}
          className="rounded-lg border border-border/60 bg-panel/60 p-3 opacity-70"
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
