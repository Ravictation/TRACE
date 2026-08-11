export type Lang = 'id' | 'en';

export type PlatformId = 'twitter' | 'instagram' | 'facebook' | 'whatsapp' | 'tiktok';

export type ToolType =
  | 'reverse-image'
  | 'account'
  | 'news-wire'
  | 'link'
  | 'source'
  | 'fundraiser'
  | 'official';

export type Phase = 'intro' | 'investigating' | 'debrief';

export interface VerdictOption {
  id: string;
  label: string;
}

export interface Debrief {
  headline: string;
  /** Shown when the case ends in failure (timeout or saturation). */
  failHeadline: string;
  /** What actually happened because the player failed. */
  failConsequence: string;
  /** Light educational extra shown on the debrief screen. */
  funFact: string;
  sift: { s: string; i: string; f: string; t: string };
  realWorldTakeaway: string;
  stats: {
    timeLabel: string;
    accuracyLabel: string;
    toolsLabel: string;
    sharesStoppedLabel: string;
  };
}

export interface ViralPost {
  platform: string;
  authorName: string;
  authorHandle: string;
  content: string;
  imageUrl: string;
  shareCount: number;
  shareRate: number; // shares per second
  threshold: number;
  timeLimitSeconds: number;
  likes: number;
  postedAgo: string;
}

export interface ReverseImageData {
  query: string;
  results: {
    source: string;
    year: string;
    isMatch: boolean;
    caption: string;
  }[];
}

export interface AccountData {
  avatarInitials: string;
  name: string;
  handle: string;
  bio: string;
  joined: string;
  joinedDetail: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isVerified: boolean;
  verifiedDetail?: string;
  recentPosts: { text: string; shares: string; likes: string }[];
  redFlags: { id: string; label: string; detail: string }[];
  greenFlags?: { id: string; label: string; detail: string }[];
}

export interface NewsWireData {
  description: string;
  outlets: { name: string; timeAgo: string; headline: string }[];
  regionalNote: string;
  confirmLabel: string;
  confirmSuccessLabel: string;
}

export interface LinkData {
  shortLink: string;
  realDomain: string;
  registered: string;
  redirectsTo: string;
  claimedDomain: string;
  mismatchNote: string;
}

export interface SourceData {
  witnessName: string;
  introLines: string[];
  validatedQA: { question: string; response: string; deflection: boolean }[];
  fallbackResponse: string;
}

export interface FundraiserData {
  campaignTitle: string;
  organizer: string;
  organizerHandle: string;
  raisedAmount: string;
  targetAmount: string;
  daysLeft: string;
  backersCount: string;
  isVerified: boolean;
  bankAccountName: string;
  charityName: string;
  registeredSince: string;
  createdDaysAgo: string;
  redFlags: { id: string; label: string; detail: string }[];
}

export interface OfficialData {
  description: string;
  statements: { agency: string; date: string; title: string; status: 'info' | 'clear' | 'alert' }[];
  summaryNote: string;
  confirmLabel: string;
  confirmSuccessLabel: string;
}

export interface CaseTools {
  reverseImage?: ReverseImageData;
  account?: AccountData;
  newsWire?: NewsWireData;
  link?: LinkData;
  source?: SourceData;
  fundraiser?: FundraiserData;
  official?: OfficialData;
}

export interface CaseData {
  id: string;
  title: string;
  caseNumber: number;
  intro: string[];
  platforms: PlatformId[];
  viralPost: ViralPost;
  toolIntro: string;
  availableTools: ToolType[];
  tools: CaseTools;
  verdict: {
    options: VerdictOption[];
    correctVerdictId: string;
    correctAction: string;
    actionOptions: string[];
  };
  debrief: Debrief;
}

export interface Clue {
  id: string;
  tool: ToolType;
  title: string;
  description: string;
  category: 'red_flag' | 'green_flag' | 'neutral';
}

export interface ChatMessage {
  id: string;
  role: 'player' | 'source';
  text: string;
  deflection?: boolean;
}

export type EndReason = 'verdict' | 'timeout' | 'saturation';

export interface CaseResult {
  caseId: string;
  correct: boolean;
  verdictId: string;
  actionId: string;
  confidence: number;
  timeSeconds: number;
  cluesFound: number;
  sharesAtSubmit: number;
  score: number;
  completedAt: string;
  /** How the case ended: player verdict, time ran out, or the post saturated. */
  endReason: EndReason;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  casesSolved: number;
  date: string;
}

export interface GameState {
  caseIndex: number;
  language: Lang;
  phase: Phase;
  elapsedSeconds: number;
  shareCount: number;
  focusPoints: number;
  maxFocusPoints: number;
  discoveredClues: Clue[];
  activeTool: ToolType | null;
  /** Tools already paid for — reopening one is free. */
  openedTools: ToolType[];
  interrogationMessages: ChatMessage[];
  isSourceTyping: boolean;
  submitted: boolean;
  verdictSelected: string | null;
  actionSelected: string | null;
  confidence: number;
  completedResults: (CaseResult | null)[];
}
