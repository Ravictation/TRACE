import { useGame } from '../../game/GameContext';
import { useCountUpLocale } from '../../utils/useCountUp';

export default function PlatformInstagram() {
  const { state, currentCase } = useGame();
  const post = currentCase.viralPost;
  const reposts = useCountUpLocale(state.shareCount);
  const comments = useCountUpLocale(Math.round(state.shareCount * 0.4));

  return (
    <div className="rounded-xl border border-border bg-black p-4">
      {/* Post header */}
      <div className="flex items-center gap-3">
        {/* Gradient ring avatar */}
        <div className="rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] p-[2px]">
          <div className="flex size-9 items-center justify-center rounded-full bg-[#111] font-mono text-xs font-bold text-white">
            N
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-semibold text-white">
          {post.authorHandle.slice(1)}
          <svg viewBox="0 0 24 24" className="size-3.5 fill-[#3897f0]">
            <path d="M12 2l2.4 2.4 3.3-.5 1.2 3.1 3.1 1.2-.5 3.3L24 12l-2.5 2.5.5 3.3-3.1 1.2-1.2 3.1-3.3-.5L12 24l-2.4-2.5-3.3.5-1.2-3.1L2 17.8l.5-3.3L0 12l2.5-2.5L2 6.2l3.1-1.2 1.2-3.1 3.3.5L12 2z" />
          </svg>
          <span className="ml-auto cursor-pointer text-white">⋯</span>
        </div>
      </div>

      {/* Image */}
      <div className="my-3 overflow-hidden rounded border border-[#262626]">
        <div className="flex aspect-video items-center justify-center bg-[#1a1a1a] text-[#8e8e8e]">
          <span className="font-mono text-xs">[ flood photo ]</span>
        </div>
      </div>

      {/* Action row */}
      <div className="flex items-center gap-4 text-white">
        <svg viewBox="0 0 24 24" className="size-6 fill-none stroke-current stroke-[1.8]">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <svg viewBox="0 0 24 24" className="size-6 fill-none stroke-current stroke-[1.8]">
          <path d="M8.7 16.29a4.29 4.29 0 0 0-.85 5.41l.21.3-1.03.2-1.5 1.51v-5.31l-.59.59-1.5-1.5 4.17-4.18 1.5 1.5-.69.69zm10.99-9.99-.01.01-1.18 1.18a4.33 4.33 0 0 0-4.07-1.47c-1.05.32-1.98 1.1-2.6 2.2l.02-.05c-.17.31-.32.63-.44.96l-3.29 7.46c-.08.17-.14.35-.19.53-.22.69-.11 1.44.31 2.04.2.27.45.5.73.68l.02.01c1.07.76 2.45.91 3.65.41.21-.09.41-.19.6-.31.2-.12.39-.26.56-.41l.05-.05c.27-.24.5-.52.7-.82l3.3-7.48c.12-.27.21-.56.27-.86.29-1.17.02-2.43-.76-3.32l-.09-.09zm.23 1.19-.76.76a4.35 4.35 0 0 0-5.15-.84 4.35 4.35 0 0 1 5.91 1.38l.34.46.33-.33a1.2 1.2 0 0 0 .33-1.43z" />
        </svg>
        <svg viewBox="0 0 24 24" className="size-6 fill-none stroke-current stroke-[1.8]">
          <path d="M4 6h10v3l6-4v14l-6-4v3H4z" />
        </svg>
        <svg viewBox="0 0 24 24" className="ml-auto size-6 fill-none stroke-current stroke-[1.8]">
          <path d="M22 17v1.5A3.5 3.5 0 0 1 18.5 22H5.5A3.5 3.5 0 0 1 2 18.5V5.5A3.5 3.5 0 0 1 5.5 2h13A3.5 3.5 0 0 1 22 5.5V17zm-9.5-8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0 1.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
      </div>

      <p className="tabular-nums mt-3 text-sm font-semibold text-white">
        {reposts} reposts
      </p>

      {/* Caption */}
      <p className="mt-1 text-sm text-white">
        <span className="font-semibold">{post.authorHandle.slice(1)}</span>{' '}
        {post.content}
        <span className="ml-1 text-[#3897f0]">#BreakingNews #Floods #Help</span>
      </p>

      <div className="tabular-nums mt-1 text-[13px] text-[#8e8e8e]">View all {comments} comments</div>
      <div className="mt-2 text-[10px] uppercase tracking-wider text-[#8e8e8e]">2 hours ago</div>
    </div>
  );
}
