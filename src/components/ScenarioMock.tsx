import { STRINGS } from '../i18n/strings';
import type { Lang } from '../types/game';
import type {
  FbScenarioDetail,
  Scenario,
  ScenarioChatMessage,
  TikTokScenarioDetail,
  WaScenarioDetail,
  WagScenarioDetail,
} from '../types/game';

/** Author name colors for group chats — cycles through a WA-ish palette. */
const GROUP_COLORS = ['#e53935', '#8e24aa', '#1e88e5', '#00897b', '#f4511e', '#c2185b'];

/* ── Chat bubble (WA / WAG) ──────────────────────────────── */

function ChatBubble({
  msg,
  author,
  authorColor,
  forwardedLabel,
}: {
  msg: ScenarioChatMessage;
  author?: string;
  authorColor?: string;
  forwardedLabel: string;
}) {
  const me = msg.from === 'me';
  return (
    <div className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[88%] rounded-lg px-2.5 py-1.5 shadow-sm ${
          me ? 'bg-[#dcf8c6]' : 'bg-white'
        } ${msg.forwarded ? 'border-l-4 border-[#f5b942]' : ''}`}
      >
        {author && (
          <div className="text-[10px] font-bold" style={{ color: authorColor }}>
            {author}
          </div>
        )}
        {msg.forwarded && (
          <div className="text-[9px] font-bold uppercase tracking-wide text-[#8a8378]">
            ⏩ {forwardedLabel}
          </div>
        )}
        <p className="text-[11px] leading-snug text-[#1c1917]">{msg.text}</p>
        <div className="mt-0.5 text-right text-[8px] leading-none text-[#8a8378]">
          {msg.time} {me && '✓✓'}
        </div>
      </div>
    </div>
  );
}

/* ── WhatsApp personal chat ──────────────────────────────── */

function WaMock({ d, forwardedLabel }: { d: WaScenarioDetail; forwardedLabel: string }) {
  return (
    <div className="overflow-hidden rounded-lg border-2 border-border shadow-[3px_3px_0_0_#1f1b16]">
      {/* WA header */}
      <div className="flex items-center gap-2 bg-[#075e54] px-3 py-2">
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
          style={{ background: d.avatarColor }}
        >
          {d.avatarInitial}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-bold text-white">{d.contactName}</p>
          <p className="text-[9px] text-white/70">{d.online ? 'online' : 'offline'}</p>
        </div>
        <span className="hidden font-mono text-[9px] text-white/60 sm:block">{d.phone}</span>
      </div>
      {/* chat area */}
      <div className="space-y-1.5 bg-[#e5ddd5] p-2.5">
        {d.messages.map((m, i) => (
          <ChatBubble key={i} msg={m} forwardedLabel={forwardedLabel} />
        ))}
      </div>
    </div>
  );
}

/* ── TikTok video card ───────────────────────────────────── */

function TikTokMock({ d }: { d: TikTokScenarioDetail }) {
  return (
    <div className="overflow-hidden rounded-lg border-2 border-border bg-black shadow-[3px_3px_0_0_#1f1b16]">
      <div className="relative">
        <img src={d.cover} alt="" className="aspect-[3/4] w-full object-cover" />
        {/* action rail */}
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3.5 text-white">
          {[
            { icon: '❤️', label: d.likes },
            { icon: '💬', label: d.comments },
            { icon: '↗️', label: d.shares },
          ].map((a, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-xl drop-shadow">{a.icon}</span>
              <span className="text-[9px] font-bold drop-shadow">{a.label}</span>
            </div>
          ))}
          <span className="text-xl drop-shadow">🎵</span>
        </div>
        {/* caption */}
        <div className="absolute bottom-0 left-0 right-0 space-y-1 bg-gradient-to-t from-black/90 to-transparent p-2.5 pt-8">
          <p className="text-[11px] font-bold text-white">{d.handle}</p>
          <p className="text-[10px] font-semibold leading-snug text-white">{d.caption}</p>
          <p className="text-[9px] text-white/90">{d.hashtags.join(' ')}</p>
          <p className="flex items-center gap-1 text-[9px] text-white/80">♪ {d.sound}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Facebook post ───────────────────────────────────────── */

function FbMock({ d, T }: { d: FbScenarioDetail; T: (typeof STRINGS)['id'] }) {
  return (
    <div className="overflow-hidden rounded-lg border-2 border-border bg-white shadow-[3px_3px_0_0_#1f1b16]">
      <div className="flex items-center gap-2 p-2.5">
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
          style={{ background: d.avatarColor }}
        >
          {d.avatarInitial}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[12px] font-bold text-[#050505]">{d.pageName}</p>
          <p className="text-[9px] text-[#65676b]">{d.postedAgo}</p>
        </div>
      </div>
      <p className="px-3 pb-2 text-[11px] leading-snug text-[#050505]">{d.text}</p>
      <img src={d.photo} alt="" className="w-full border-y border-[#e4e6eb]" />
      <div className="flex items-center justify-between px-3 py-1.5 text-[9px] text-[#65676b]">
        <span>👍 ❤️ 😲 {d.likes}</span>
        <span>
          {T.scenario.fb.comments(d.comments)} · {T.scenario.fb.shares(d.shares)}
        </span>
      </div>
      <div className="flex border-t border-[#e4e6eb] text-[10px] font-bold text-[#65676b]">
        <div className="flex-1 py-1.5 text-center">👍 {T.scenario.fb.like}</div>
        <div className="flex-1 py-1.5 text-center">💬 {T.scenario.fb.comment}</div>
        <div className="flex-1 py-1.5 text-center">↗️ {T.scenario.fb.share}</div>
      </div>
    </div>
  );
}

/* ── WhatsApp group (WAG) ────────────────────────────────── */

function WagMock({ d, forwardedLabel }: { d: WagScenarioDetail; forwardedLabel: string }) {
  return (
    <div className="overflow-hidden rounded-lg border-2 border-border shadow-[3px_3px_0_0_#1f1b16]">
      <div className="flex items-center gap-2 bg-[#075e54] px-3 py-2">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/90 text-base">
          👥
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-bold text-white">{d.groupName}</p>
          <p className="text-[9px] text-white/70">{d.memberCount}</p>
        </div>
      </div>
      <div className="space-y-1.5 bg-[#e5ddd5] p-2.5">
        {d.messages.map((m, i) => (
          <ChatBubble
            key={i}
            msg={m}
            author={m.author}
            authorColor={GROUP_COLORS[i % GROUP_COLORS.length]}
            forwardedLabel={forwardedLabel}
          />
        ))}
        {d.typing && <p className="pl-1 text-[9px] italic text-[#8a8378]">{d.typing}</p>}
      </div>
    </div>
  );
}

/* ── Dispatcher ──────────────────────────────────────────── */

export default function ScenarioMock({ scenario, lang }: { scenario: Scenario; lang: Lang }) {
  const T = STRINGS[lang];
  const d = scenario.detail;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-muted">
          {T.scenario.incoming}
        </span>
        <span className="border border-border bg-panel2 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-accent">
          {T.scenario.apps[scenario.app]}
        </span>
      </div>

      {d.kind === 'wa' && <WaMock d={d} forwardedLabel={T.scenario.forwarded} />}
      {d.kind === 'tiktok' && <TikTokMock d={d} />}
      {d.kind === 'fb' && <FbMock d={d} T={T} />}
      {d.kind === 'wag' && <WagMock d={d} forwardedLabel={T.scenario.forwarded} />}

      {scenario.note && (
        <p className="mt-2 font-mono text-[10px] italic leading-relaxed text-muted">
          ⚠ {scenario.note}
        </p>
      )}
    </div>
  );
}
