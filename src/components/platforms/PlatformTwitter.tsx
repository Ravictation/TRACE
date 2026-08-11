import { useGame } from '../../game/GameContext';
import { STRINGS } from '../../i18n/strings';
import { useCountUpLocale } from '../../utils/useCountUp';

export default function PlatformTwitter() {
  const { state, currentCase } = useGame();
  const T = STRINGS[state.language];
  const post = currentCase.viralPost;
  const locale = state.language === 'id' ? 'id-ID' : 'en-US';
  const reposts = useCountUpLocale(state.shareCount, undefined, locale);
  const likes = useCountUpLocale(state.shareCount * 0.25, undefined, locale);

  return (
    <div className="border-2 border-border bg-[#15202b] p-4 shadow-hard">
      {/* Post header */}
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#263440] font-mono text-sm font-bold text-[#8899a6]">
          {post.authorName.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1">
            <span className="font-bold text-white">{post.authorName}</span>
            <span className="font-mono text-sm text-[#8899a6]">@{post.authorHandle.slice(1)}</span>
            <span className="text-[#8899a6]">·</span>
            <span className="text-[#8899a6]">{post.postedAgo}</span>
            <span className="ml-auto cursor-pointer text-[#8899a6]">⋯</span>
          </div>
          <span className="animate-blink mt-0.5 inline-block rounded-full bg-[#1d9bf0]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1d9bf0]">
            {T.platforms.trending}
          </span>
        </div>
      </div>

      {/* Post body */}
      <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-white">
        {post.content.split('bit.ly/').map((part, i) =>
          i === 0 ? (
            part
          ) : (
            <span key={i}>
              <span className="text-[#1d9bf0]">bit.ly/</span>
              {part}
            </span>
          ),
        )}
      </p>

      {/* Image */}
      <div className="mt-3 overflow-hidden rounded-xl border border-[#38444d]">
        <div className="flex aspect-video items-center justify-center bg-[#1c2a38] text-[#8899a6]">
          <span className="font-mono text-xs">[ {post.imageUrl.split('/').pop()} ]</span>
        </div>
      </div>

      {/* Engagement row — reposts = live share counter */}
      <div className="mt-3 flex items-center justify-between font-mono text-[13px] text-[#8899a6]">
        <span className="tabular-nums flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="size-4 fill-current"><path d="M8.7 16.29a4.29 4.29 0 0 0-.85 5.41l.21.3-1.03.2-1.5 1.51v-5.31l-.59.59-1.5-1.5 4.17-4.18 1.5 1.5-.69.69zm10.99-9.99-.01.01-1.18 1.18a4.33 4.33 0 0 0-4.07-1.47c-1.05.32-1.98 1.1-2.6 2.2l.02-.05c-.17.31-.32.63-.44.96l-3.29 7.46c-.08.17-.14.35-.19.53-.22.69-.11 1.44.31 2.04.2.27.45.5.73.68l.02.01c1.07.76 2.45.91 3.65.41.21-.09.41-.19.6-.31.2-.12.39-.26.56-.41l.05-.05c.27-.24.5-.52.7-.82l3.3-7.48c.12-.27.21-.56.27-.86.29-1.17.02-2.43-.76-3.32l-.09-.09zm.23 1.19-.76.76a4.35 4.35 0 0 0-5.15-.84 4.35 4.35 0 0 1 5.91 1.38l.34.46.33-.33a1.2 1.2 0 0 0 .33-1.43z"/></svg>
          <span className="text-white">{reposts}</span>
        </span>
        <span className="tabular-nums flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="size-4 fill-current"><path d="M8.75 21V3h2v18h-2zM18 21V8h2v13h-2z"/></svg>
          <span>{likes}</span>
        </span>
        <span className="tabular-nums flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="size-4 fill-current"><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"/></svg>
          <span>{post.likes.toLocaleString()}</span>
        </span>
        <span className="tabular-nums flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="size-4 fill-current"><path d="M8.75 21V3h2v18h-2zM18 21V8h2v13h-2z"/></svg>
          <span>2.1M</span>
        </span>
      </div>
    </div>
  );
}
