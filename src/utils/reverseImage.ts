/**
 * Live reverse-image search via the similarity-search API
 * (https://api-search-similarity-image.onrender.com).
 *
 * Flow: upload the image (multipart) → get a server file_path → search by
 * that path. Responses are parsed defensively since the provider payloads
 * (brave / serpapi / brightdata) differ in shape.
 *
 * The game stays playable offline: callers treat ANY failure as a soft
 * fallback (see ReverseImagePanel).
 */

const API_BASE = 'https://api-search-similarity-image.onrender.com';

/** Provider used for similar-image search. The server defaults to Brave,
 *  but reverse image runs on SerpAPI (Google Lens) — pass it explicitly. */
const SEARCH_PROVIDER = 'serpapi';

export interface ReverseImageResult {
  title: string;
  source: string;
  url: string;
}

export interface ReverseImageSearchOutcome {
  source: string;
  totalResults: number;
  results: ReverseImageResult[];
}

/** Draw an image onto a canvas and export it as a PNG blob (the API accepts png). */
async function imageSrcToPngBlob(src: string): Promise<Blob> {
  const res = await fetch(src);
  if (!res.ok) throw new Error(`image fetch failed: ${res.status}`);
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('image decode failed'));
      el.src = objectUrl;
    });
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || 320;
    canvas.height = img.naturalHeight || 320;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('canvas unavailable');
    ctx.drawImage(img, 0, 0);
    const png = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!png) throw new Error('png export failed');
    return png;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

interface UploadResponse {
  status_code: number;
  message?: string;
  data?: { filename?: string; file_path?: string };
}

interface SearchResponse {
  status_code: number;
  message?: string;
  error?: unknown;
  data?: {
    source?: string;
    total_results?: number;
    source_url?: string;
    results?: unknown;
  };
}

/** Normalise provider payloads of wildly different shapes into one list. */
function normalizeResults(raw: unknown): ReverseImageResult[] {
  let items: unknown[] = [];
  if (Array.isArray(raw)) {
    items = raw;
  } else if (raw && typeof raw === 'object') {
    const obj = raw as Record<string, unknown>;
    // common provider key names (serpapi Google Lens uses visual_matches)
    for (const key of ['image_results', 'images', 'items', 'results', 'related_images', 'inline_images', 'visual_matches']) {
      const v = obj[key];
      if (Array.isArray(v)) {
        items = v;
        break;
      }
    }
    if (items.length === 0) items = [obj];
  }
  return items
    .map((item): ReverseImageResult | null => {
      if (!item || typeof item !== 'object') return null;
      const o = item as Record<string, unknown>;
      const str = (v: unknown): string | undefined => (typeof v === 'string' ? v : undefined);
      const title = str(o.title) ?? str(o.name) ?? str(o.caption) ?? '';
      const source =
        str(o.source) ?? str(o.host_page_domain) ?? str(o.domain) ?? str(o.displayed_link) ?? '';
      const url =
        str(o.link) ?? str(o.url) ?? str(o.source_url) ?? str(o.image_url) ?? str(o.thumbnail) ?? '';
      if (!title && !source && !url) return null;
      return { title: title || '(tanpa judul)', source: source || '(sumber tidak diketahui)', url };
    })
    .filter((r): r is ReverseImageResult => r !== null);
}

async function uploadImage(png: Blob, signal: AbortSignal): Promise<string> {
  const form = new FormData();
  form.append('file', png, 'hoax-image.png');
  const res = await fetch(`${API_BASE}/search-image/upload`, { method: 'POST', body: form, signal });
  if (!res.ok) throw new Error(`upload failed: HTTP ${res.status}`);
  const json = (await res.json()) as UploadResponse;
  const filePath = json.data?.file_path;
  if (!filePath) throw new Error('upload response missing file_path');
  return filePath;
}

async function searchByPath(imagePath: string, signal: AbortSignal): Promise<ReverseImageSearchOutcome> {
  const url = new URL(`${API_BASE}/search-image/search`);
  url.searchParams.set('image_path', imagePath);
  url.searchParams.set('provider', SEARCH_PROVIDER);
  const res = await fetch(url.toString(), { method: 'POST', signal });
  const json = (await res.json().catch(() => null)) as SearchResponse | null;
  if (!res.ok) {
    const detail = json?.message ?? (typeof json?.error === 'string' ? json.error : undefined) ?? `HTTP ${res.status}`;
    throw new Error(detail);
  }
  if (!json || json.status_code !== 200 || !json.data) {
    throw new Error(typeof json?.error === 'string' ? json.error : (json?.message ?? 'search error'));
  }
  return {
    source: json.data.source ?? 'mesin pencari',
    totalResults: json.data.total_results ?? 0,
    results: normalizeResults(json.data.results),
  };
}

/**
 * Run the full pipeline (image → png → upload → search) with a generous
 * timeout — the free-tier host can take a while to wake up.
 */
export async function reverseImageSearch(src: string): Promise<ReverseImageSearchOutcome> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 75_000);
  try {
    const png = await imageSrcToPngBlob(src);
    const filePath = await uploadImage(png, controller.signal);
    return await searchByPath(filePath, controller.signal);
  } finally {
    window.clearTimeout(timer);
  }
}
