import type { CaseData } from '../types/game';
import { FLOOD_CASE } from './case-flood';
import { VOLCANO_CASE } from './case-volcano';
import { DONATION_CASE } from './case-donation';
import { DOCTOR_CASE } from './case-doctor';

export const CASES: CaseData[] = [FLOOD_CASE, VOLCANO_CASE, DONATION_CASE, DOCTOR_CASE];

export const TOOL_META: Record<
  string,
  { icon: string; label: string; hint: string }
> = {
  'reverse-image': { icon: '🔍', label: 'Reverse Img', hint: 'Temukan asal-usul gambar' },
  account: { icon: '👤', label: 'Account', hint: 'Siapa yang memposting?' },
  'news-wire': { icon: '📰', label: 'News Wire', hint: 'Apa kata media kredibel?' },
  link: { icon: '🔗', label: 'Link', hint: 'Ke mana link ini mengarah?' },
  'image-exam': { icon: '🔬', label: 'Image', hint: 'Periksa detail visual' },
  source: { icon: '💬', label: 'Source', hint: 'Interogasi saksi/AI' },
  fundraiser: { icon: '💰', label: 'Fundraiser', hint: 'Cek keaslian galang dana' },
  official: { icon: '🏛', label: 'Official', hint: 'Pernyataan lembaga resmi' },
};
