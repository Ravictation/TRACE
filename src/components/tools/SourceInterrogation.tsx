import { useRef, useState } from 'react';
import { useGame } from '../../game/GameContext';
import { scoreCandidates } from '../../utils/embedding';

const MATCH_THRESHOLD = 0.55;

export default function SourceInterrogation() {
  const { state, dispatch, currentCase } = useGame();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const messages = state.interrogationMessages;
  const src = currentCase.tools.source;

  if (!src) return null;

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    });
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || state.isSourceTyping) return;
    setInput('');

    dispatch({ type: 'PLAYER_MESSAGE', text });
    dispatch({ type: 'SOURCE_TYPING', typing: true });
    scrollToBottom();

    const candidates = src.validatedQA;
    const ranked = await scoreCandidates(text, candidates);
    const best = ranked[0];
    const response =
      best && best.score >= MATCH_THRESHOLD
        ? candidates[best.index]
        : { response: src.fallbackResponse, deflection: true };

    setTimeout(() => {
      dispatch({
        type: 'SOURCE_RESPONSE',
        message: {
          id: `source-${Date.now()}`,
          role: 'source',
          text: response.response,
          deflection: response.deflection,
        },
      });
      scrollToBottom();
    }, 600 + Math.random() * 500);
  };

  return (
    <div className="animate-slide-in flex h-full flex-col">
      <div className="mb-3">
        <h3 className="font-mono text-sm font-bold tracking-wider text-text">💬 INTERROGATE SOURCE</h3>
        <p className="font-mono text-xs text-muted">
          Witness: <span className="text-accent">{src.witnessName}</span> — ask
          specific questions. Liars struggle with details.
        </p>
      </div>

      <div
        ref={scrollRef}
        className="mb-3 max-h-[45vh] min-h-[200px] flex-1 space-y-2 overflow-y-auto rounded-md border border-border bg-panel p-3"
      >
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'player' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                m.role === 'player'
                  ? 'bg-accent/20 text-text'
                  : m.deflection
                    ? 'border border-warning/40 bg-warning/10 text-warning'
                    : 'bg-panel2 text-text'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {state.isSourceTyping && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-lg bg-panel2 px-3 py-2.5">
              <span className="typing-dot size-1.5 rounded-full bg-muted" />
              <span className="typing-dot size-1.5 rounded-full bg-muted" style={{ animationDelay: '0.2s' }} />
              <span className="typing-dot size-1.5 rounded-full bg-muted" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={send} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question to the source..."
          className="flex-1 rounded-md border border-border bg-panel2 px-3 py-2 text-sm text-text outline-none placeholder:text-muted focus:border-accent"
        />
        <button
          type="submit"
          disabled={!input.trim() || state.isSourceTyping}
          className="rounded-md border border-accent bg-accent/10 px-4 font-mono text-xs font-bold tracking-wider text-accent transition hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          SEND
        </button>
      </form>
    </div>
  );
}
