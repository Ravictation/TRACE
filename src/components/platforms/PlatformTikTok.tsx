import { useGame } from '../../game/GameContext';
import { STRINGS } from '../../i18n/strings';
import { useCountUpLocale } from '../../utils/useCountUp';

export default function PlatformTikTok() {
  const { state, currentCase } = useGame();
  const T = STRINGS[state.language];
  const post = currentCase.viralPost;
  const locale = state.language === 'id' ? 'id-ID' : 'en-US';
  const reposts = useCountUpLocale(state.shareCount, undefined, locale);
  const likes = useCountUpLocale(state.shareCount * 4, undefined, locale);

  return (
    <div className="overflow-hidden border-2 border-border bg-[#121212] shadow-hard">
      {/* Top bar */}
      <div className="flex items-center gap-2 border-b border-[#262626] px-4 py-2.5">
        <span className="font-mono text-[11px] font-bold text-white">TikTok</span>
        <span className="ml-auto flex items-center gap-2">
          <span className="animate-blink rounded-full bg-[#fe2c55] px-2 py-0.5 text-[10px] font-bold text-white">{T.platforms.live}</span>
          <span className="font-mono text-xs text-white">{post.authorHandle}</span>
        </span>
      </div>

      <div className="flex">
        {/* Video area */}
        <div className="relative flex aspect-[9/14] flex-1 items-center justify-center bg-[#1a1a1a]">
          <span className="font-mono text-xs text-[#8a8a8a]">{T.platforms.videoPlaceholder}</span>

          {/* Bottom overlay info */}
          <div className="absolute inset-x-0 bottom-0 space-y-1.5 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs font-bold text-white">{post.authorName}</span>
              <span className="rounded border border-white/30 px-1.5 py-0.5 text-[9px] font-bold text-white">
                {T.platforms.follow}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white">
              {post.content.split('\n')[0]}
            </p>
            <p className="text-xs text-white/80">{T.platforms.tiktokHashtags}</p>
            <p className="flex items-center gap-1 text-[11px] text-white/70">
              <span className="inline-block size-3 rotate-12 rounded-full border-2 border-white/70" />
              {T.platforms.originalAudio(post.authorHandle)}
            </p>
          </div>
        </div>

        {/* Right action rail */}
        <div className="flex w-16 shrink-0 flex-col items-center justify-end gap-5 pb-4 pt-2">
          <div className="flex flex-col items-center gap-1">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#2a2a2a] text-[#fe2c55]">
              ❤
            </span>
            <span className="tabular-nums text-[11px] font-semibold text-white">{likes}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#2a2a2a] text-white">
              💬
            </span>
            <span className="tabular-nums text-[11px] font-semibold text-white">
              {(state.shareCount / 7).toFixed(0).toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#2a2a2a] text-white">
              ↗
            </span>
            <span className="tabular-nums text-[11px] font-semibold text-white">{reposts}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#2a2a2a] text-white">
              ⭐
            </span>
            <span className="text-[11px] font-semibold text-white">{T.platforms.shareTikTok}</span>
          </div>
          <div className="mt-1 size-11 rounded-full bg-gradient-to-tr from-[#fe2c55] via-[#fea028] to-[#25f4ee] p-[2px]">
            <div className="flex size-full items-center justify-center rounded-full bg-[#121212] font-mono text-[10px] font-bold text-white">
              @{post.authorHandle.slice(1, 5)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
