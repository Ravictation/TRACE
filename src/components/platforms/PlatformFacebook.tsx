import { useGame } from '../../game/GameContext';
import { useCountUpLocale } from '../../utils/useCountUp';

export default function PlatformFacebook() {
  const { state, currentCase } = useGame();
  const post = currentCase.viralPost;
  const shares = useCountUpLocale(state.shareCount);
  const likes = useCountUpLocale(state.shareCount * 0.8);

  return (
    <div className="rounded-xl border border-border bg-[#242526] p-4">
      {/* Post header */}
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#3a3b3c] font-mono text-sm font-bold text-white">
          N
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[15px]">
            <span className="font-semibold text-white">{post.authorName}</span>
            <svg viewBox="0 0 16 16" className="size-3.5 fill-[#1877f2]">
              <path d="M10.5 8.5l-2.7 2.8-.2.2a1.6 1.6 0 0 1-2.2 0L3.9 10l1-1 2.7 2.7a.3.3 0 0 0 .4 0L11.5 7l-1-1.5z" />
            </svg>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#b0b3b8]">
            <span>Sponsored</span>
            <span>·</span>
            <span>{post.postedAgo}</span>
            <span className="ml-1 flex items-center gap-1">🌐</span>
          </div>
        </div>
        <button className="cursor-pointer text-[#b0b3b8]">⋯</button>
      </div>

      {/* Content */}
      <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-white">
        {post.content.split('bit.ly/').map((part, i) =>
          i === 0 ? (
            part
          ) : (
            <span key={i}>
              <span className="text-[#1877f2]">bit.ly/</span>
              {part}
            </span>
          ),
        )}
      </p>

      {/* Image */}
      <div className="mt-3 overflow-hidden border-y border-[#3e4042] bg-[#18191a]">
        <div className="flex aspect-video items-center justify-center text-[#b0b3b8]">
          <span className="font-mono text-xs">[ flood photo ]</span>
        </div>
      </div>

      {/* Reactions + counts */}
      <div className="flex items-center justify-between py-2 text-[13px] text-[#b0b3b8]">
        <div className="flex items-center">
          <span className="flex -space-x-1">
            <span className="flex size-5 items-center justify-center rounded-full bg-[#1877f2] text-[10px]">👍</span>
            <span className="flex size-5 items-center justify-center rounded-full bg-[#f3535d] text-[10px]">❤️</span>
            <span className="flex size-5 items-center justify-center rounded-full bg-[#f7b928] text-[10px]">😂</span>
          </span>
          <span className="tabular-nums ml-1.5">{likes}</span>
        </div>
        <span className="flex gap-3">
          <span className="tabular-nums">{Math.round(state.shareCount * 0.35).toLocaleString()} comments</span>
          <span className="tabular-nums font-semibold text-white">{shares} shares</span>
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between border-t border-[#3e4042] pt-1.5 text-[13px] font-semibold text-[#b0b3b8]">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-md py-2 transition hover:bg-[#3a3b3c]">
          <span>👍</span> Like
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-md py-2 transition hover:bg-[#3a3b3c]">
          <span>💬</span> Comment
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-white transition hover:bg-[#3a3b3c]">
          <span>↗️</span> Share
        </button>
      </div>
    </div>
  );
}
