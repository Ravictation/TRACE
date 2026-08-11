import type { CaseData, Lang, ToolType } from '../types/game';
import { FLOOD_CASE_ID, FLOOD_CASE_EN } from './case-flood';
import { VOLCANO_CASE_ID, VOLCANO_CASE_EN } from './case-volcano';
import { DONATION_CASE_ID, DONATION_CASE_EN } from './case-donation';
import { DOCTOR_CASE_ID, DOCTOR_CASE_EN } from './case-doctor';

export const CASES: Record<Lang, CaseData[]> = {
  id: [FLOOD_CASE_ID, VOLCANO_CASE_ID, DONATION_CASE_ID, DOCTOR_CASE_ID],
  en: [FLOOD_CASE_EN, VOLCANO_CASE_EN, DONATION_CASE_EN, DOCTOR_CASE_EN],
};

export const TOOL_META: Record<
  Lang,
  Record<ToolType, { icon: string; label: string; hint: string }>
> = {
  id: {
    'reverse-image': { icon: '🔍', label: 'Reverse Img', hint: 'Temukan asal-usul gambar' },
    account: { icon: '👤', label: 'Akun', hint: 'Siapa yang memposting?' },
    'news-wire': { icon: '📰', label: 'Berita', hint: 'Apa kata media kredibel?' },
    link: { icon: '🔗', label: 'Link', hint: 'Ke mana link ini mengarah?' },
    source: { icon: '💬', label: 'Sumber', hint: 'Interogasi saksi/AI' },
    fundraiser: { icon: '💰', label: 'Galang Dana', hint: 'Cek keaslian galang dana' },
    official: { icon: '🏛', label: 'Resmi', hint: 'Pernyataan lembaga resmi' },
  },
  en: {
    'reverse-image': { icon: '🔍', label: 'Reverse Img', hint: 'Find the image origin' },
    account: { icon: '👤', label: 'Account', hint: 'Who posted this?' },
    'news-wire': { icon: '📰', label: 'News Wire', hint: 'What do credible outlets say?' },
    link: { icon: '🔗', label: 'Link', hint: 'Where does this link lead?' },
    source: { icon: '💬', label: 'Source', hint: 'Interrogate the witness/AI' },
    fundraiser: { icon: '💰', label: 'Fundraiser', hint: 'Check fundraiser authenticity' },
    official: { icon: '🏛', label: 'Official', hint: 'Official agency statements' },
  },
};
