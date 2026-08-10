/**
 * Client-side semantic matching for source interrogation.
 * Uses @xenova/transformers (all-MiniLM-L6-v2) when available,
 * falls back to keyword scoring so the game NEVER depends on the model loading.
 */
import { pipeline, type FeatureExtractionPipeline } from '@xenova/transformers';

let embedder: FeatureExtractionPipeline | null = null;
let embedderPromise: Promise<FeatureExtractionPipeline | null> | null = null;

/** Load the embedding model once, cache forever. */
export function getEmbedder(): Promise<FeatureExtractionPipeline | null> {
  if (embedder) return Promise.resolve(embedder);
  if (embedderPromise) return embedderPromise;

  embedderPromise = (async () => {
    try {
      embedder = await pipeline(
        'feature-extraction',
        'Xenova/all-MiniLM-L6-v2',
        { quantized: true },
      );
      return embedder;
    } catch (err) {
      console.warn('Embedding model failed to load — using keyword fallback:', err);
      return null;
    }
  })();

  return embedderPromise;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

/** Lightweight keyword scorer — used until the model finishes loading. */
export function keywordScore(input: string, target: string): number {
  const a = input.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const b = target.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  if (a.length === 0 || b.length === 0) return 0;

  let hits = 0;
  for (const word of b) {
    // match words of length >= 3, with stemming (photo/photos share prefix "photo")
    if (word.length >= 3 && a.some((w) => w.startsWith(word.slice(0, Math.min(word.length, 5))))) {
      hits++;
    }
  }
  return hits / b.length;
}

/**
 * Rank candidate questions against user input.
 * Returns best score in [0, 1]. Uses embeddings if available, else keywords.
 */
export async function scoreCandidates(
  input: string,
  candidates: { question: string }[],
): Promise<{ index: number; score: number }[]> {
  const model = await getEmbedder();

  if (model) {
    try {
      const inputVec = await model(input, { pooling: 'mean' });
      const inputArr = Array.from(inputVec.data as Float32Array);

      const scored = await Promise.all(
        candidates.map(async (c, index) => {
          const cVec = await model(c.question, { pooling: 'mean' });
          const cArr = Array.from(cVec.data as Float32Array);
          return { index, score: cosineSimilarity(inputArr, cArr) };
        }),
      );
      return scored.sort((a, b) => b.score - a.score);
    } catch {
      // fall through to keyword scoring
    }
  }

  return candidates
    .map((c, index) => ({ index, score: keywordScore(input, c.question) }))
    .sort((a, b) => b.score - a.score);
}
