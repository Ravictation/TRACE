import { useState } from 'react';
import { STRINGS } from '../i18n/strings';
import type { Lang } from '../types/game';
import { reverseImageSearch, type ReverseImageSearchOutcome } from '../utils/reverseImage';

type Status =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'done'; outcome: ReverseImageSearchOutcome }
  | { kind: 'empty' }
  | { kind: 'error'; detail: string };

/**
 * Live reverse-image search for a mini-game tab: uploads the hoax image to
 * the similarity-search API and shows real matches. Any failure degrades to
 * a friendly note — the game never blocks on the network.
 */
export default function ReverseImagePanel({
  image,
  lang,
}: {
  image: { src: string; caption: string };
  lang: Lang;
}) {
  const T = STRINGS[lang];
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const search = async () => {
    setStatus({ kind: 'loading' });
    try {
      const outcome = await reverseImageSearch(image.src);
      setStatus(
        outcome.results.length > 0 ? { kind: 'done', outcome } : { kind: 'empty' },
      );
    } catch (err) {
      setStatus({ kind: 'error', detail: err instanceof Error ? err.message : String(err) });
    }
  };

  return (
    <div className="mt-3 border-2 border-border bg-panel2 p-3">
      {/* The image under investigation — shown prominently */}
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
        {image.caption}
      </p>
      <div className="mt-1.5 flex justify-center border-2 border-border bg-bg p-2 shadow-[2px_2px_0_0_#1f1b16]">
        <img
          src={image.src}
          alt={image.caption}
          className="max-h-44 w-auto max-w-full object-contain"
        />
      </div>
      <button
        onClick={search}
        disabled={status.kind === 'loading'}
        className="btn-brutal mt-2 w-full bg-accent px-3 py-2 font-mono text-[11px] font-bold tracking-wider text-border disabled:cursor-wait disabled:bg-panel disabled:text-muted"
      >
        {status.kind === 'loading' ? '⏳ …' : T.reverseImage.searchBtn}
      </button>

      {/* Search status / results */}
      {status.kind === 'loading' && (
        <p className="animate-pulse mt-2 font-mono text-[10px] leading-relaxed text-warning">
          {T.reverseImage.searching}
        </p>
      )}

      {status.kind === 'done' && (
        <div className="animate-pop-in mt-3">
          <p className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-success">
            {T.reverseImage.resultsLabel(status.outcome.results.length, status.outcome.source)}
          </p>
          <ul className="max-h-64 space-y-1.5 overflow-y-auto pr-1">
            {status.outcome.results.slice(0, 8).map((r, i) => (
              <li key={i} className="flex items-center gap-2 border-2 border-border bg-panel p-1.5">
                {r.thumbnail ? (
                  <img
                    src={r.thumbnail}
                    alt=""
                    loading="lazy"
                    className="size-10 shrink-0 border border-border bg-bg object-cover"
                  />
                ) : (
                  <span className="flex size-10 shrink-0 items-center justify-center border border-border bg-panel2 font-mono text-xs text-muted">
                    🖼
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-[10px] font-bold text-text">{r.title}</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-mono text-[9px] text-muted">{r.source}</span>
                    {r.url && (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 font-mono text-[9px] font-bold text-accent underline hover:text-warning"
                      >
                        {T.reverseImage.openSource} ↗
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {status.kind === 'empty' && (
        <p className="animate-pop-in mt-2 border-2 border-border bg-panel p-2 font-mono text-[10px] leading-relaxed text-warning">
          {T.reverseImage.empty}
        </p>
      )}

      {status.kind === 'error' && (
        <div className="animate-pop-in mt-2 border-2 border-border bg-panel p-2">
          <p className="font-mono text-[10px] leading-relaxed text-muted">{T.reverseImage.error}</p>
          <p className="mt-1 break-words font-mono text-[9px] leading-relaxed text-muted/70">
            {status.detail}
          </p>
        </div>
      )}
    </div>
  );
}
