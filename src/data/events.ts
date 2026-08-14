import type { EventData, Lang } from '../types/game';
import { EVENT_1_ID, EVENT_1_EN } from './event-1';
import { EVENT_2_ID, EVENT_2_EN } from './event-2';
import { EVENT_3_ID, EVENT_3_EN } from './event-3';
import { EVENT_4_ID, EVENT_4_EN } from './event-4';
import { EVENT_5_ID, EVENT_5_EN } from './event-5';

/** The 5 MVP events (MVP.md §4), in order, per language. */
export const EVENTS: Record<Lang, EventData[]> = {
  id: [EVENT_1_ID, EVENT_2_ID, EVENT_3_ID, EVENT_4_ID, EVENT_5_ID],
  en: [EVENT_1_EN, EVENT_2_EN, EVENT_3_EN, EVENT_4_EN, EVENT_5_EN],
};

export const EVENT_COUNT = 5;
