import { useGame } from '../../game/GameContext';
import { STRINGS } from '../../i18n/strings';
import { useCountUpLocale } from '../../utils/useCountUp';

export default function PlatformWhatsApp() {
  const { state, currentCase } = useGame();
  const T = STRINGS[state.language];
  const locale = state.language === 'id' ? 'id-ID' : 'en-US';
  const post = currentCase.viralPost;
  const forwards = useCountUpLocale(state.shareCount, undefined, locale);
  const groupMessages = T.platforms.groupMessages;

  return (
    <div className="border-2 border-border bg-[#0b141a] p-4 shadow-hard">
      {/* Chat header */}
      <div className="mb-3 flex items-center gap-3 border-b border-[#1f2c34] pb-3">
        <div className="relative">
          <div className="flex size-10 items-center justify-center rounded-full bg-[#2a3942] font-mono text-sm font-bold text-[#aebac1]">
            N
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1 font-semibold text-[#e9edef]">
            {T.platforms.groupName}
            <svg viewBox="0 0 20 20" className="size-4 fill-[#53bdeb]">
              <path d="M7 16.5l-1.1 1.1a.8.8 0 0 1-1.1 0 .8.8 0 0 1 0-1.1l2.4-2.4.6-.6H6.6l-2.8 2.8a.8.8 0 0 1-1.1 0 .8.8 0 0 1 0-1.1L5.5 12H3.5a.8.8 0 1 1 0-1.7h1.9l2.6-2.6a.8.8 0 0 1 1.1 1.1l-.7.7h6.9l-.7-.7a.8.8 0 1 1 1.1-1.1l2.6 2.6h1.9a.8.8 0 1 1 0 1.7h-2l2.8 2.8a.8.8 0 0 1 0 1.1.8.8 0 0 1-1.1 0l-2.8-2.8h-1.7l.6.6 2.4 2.4a.8.8 0 0 1 0 1.1.8.8 0 0 1-1.1 0L14 16.5z" />
            </svg>
          </div>
          <div className="text-xs text-[#8696a0]">{T.platforms.membersOnline}</div>
        </div>
        <button className="text-[#8696a0]">⋯</button>
      </div>

      {/* Messages */}
      <div className="space-y-2">
        {/* Group messages */}
        {groupMessages.map((m, i) => (
          <div key={i} className="flex justify-start">
            <div className="max-w-[85%] rounded-lg rounded-tl-none bg-[#202c33] px-3 py-1.5">
              <div className="text-xs font-semibold text-[#53bdeb]">{m.sender}</div>
              <p className="text-sm text-[#e9edef]">{m.text}</p>
              <div className="mt-0.5 text-right text-[10px] text-[#8696a0]">{m.time}</div>
            </div>
          </div>
        ))}

        {/* The viral forward — live share count as "forwarded many times" */}
        <div className="flex justify-start">
          <div className="max-w-[88%] rounded-lg rounded-tl-none bg-[#202c33] px-3 py-2">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] text-[#8696a0]">
              <span className="rounded bg-[#182229] px-1.5 py-0.5 text-[#f7f8f8]">{T.platforms.forwardedMany}</span>
            </div>
            <div className="mb-1.5 text-sm text-[#53bdeb]">
              <span className="font-semibold">{post.authorName}</span>
              <span className="ml-1 text-[#8696a0]">({post.authorHandle})</span>
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed text-[#e9edef]">
              {post.content}
            </p>
            <div className="mt-2 overflow-hidden rounded-lg border border-[#2a3942]">
              <div className="flex aspect-video items-center justify-center bg-[#182229] text-[#8696a0]">
                <span className="font-mono text-xs">{T.platforms.photoPlaceholder}</span>
              </div>
            </div>
            <div className="mt-1.5 flex justify-end gap-1 text-[10px] text-[#8696a0]">
              <span>13:44</span>
              <svg viewBox="0 0 16 11" className="size-[14px] fill-[#53bdeb]">
                <path d="M11.07 0L5.5 5.57 3.93 4 2.5 5.43 5.5 8.5l7-7z" />
                <path d="M10.3 6.5l1.2 1.2 2.2-2.2L14 7l-2.5 2.5L8 6.7l1.1-1.1z" opacity="0.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Live spread indicator */}
        <div className="flex justify-center">
          <span className="tabular-nums rounded-full bg-[#202c33] px-3 py-1 font-mono text-[10px] text-[#8696a0]">
            {T.platforms.forwardedAcross(forwards)}
          </span>
        </div>
      </div>

      {/* Input bar */}
      <div className="mt-3 flex items-center gap-2 border-t border-[#1f2c34] pt-3">
        <button className="text-[#8696a0]">▢</button>
        <div className="flex-1 rounded-full bg-[#2a3942] px-4 py-2 text-sm text-[#8696a0]">
          {T.platforms.message}
        </div>
        <div className="flex size-9 items-center justify-center rounded-full bg-[#00a884] text-white">
          <svg viewBox="0 0 24 24" className="size-5 fill-current"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </div>
      </div>
    </div>
  );
}
