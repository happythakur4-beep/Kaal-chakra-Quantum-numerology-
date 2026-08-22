export type ScreenType = 
  | 'landing' 
  | 'portal' 
  | 'report' 
  | 'kundli'
  | 'panchang'
  | 'matching'
  | 'lalkitab'
  | 'kp'
  | 'rashifal'
  | 'transits'
  | 'gemstones'
  | 'numerology'
  | 'vastu'
  | 'prashnavali'
  | 'baby-names'
  | 'japa-mala'
  | 'mentor'
  | 'student' 
  | 'practice' 
  | 'academy' 
  | 'consultations';

export type ThemeMode = 'dark' | 'light';

export interface UserProfile {
  name: string;
  email: string;
  birthDate?: string;
  birthTime?: string;
  birthCity?: string;
  learningResonance: number; // e.g. 78%
  avatarUrl: string;
  contributionPaid?: number;
  activeAura: AuraType;
  unlockedModules: string[];
}

export type AuraType = 'Calm Amber' | 'Radiant Rose' | 'Celestial Gold' | 'Aetheric Violet' | 'Emerald Clarity';

export interface ReportItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  tag?: string;
}

export interface Consultation {
  id: string;
  practitionerName: string;
  title: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'requested';
  avatarUrl: string;
  specialty: string;
  fee: number;
}

export interface CourseModule {
  id: string;
  title: string;
  category: string;
  duration: string;
  lessonsCount: number;
  progressPercent: number;
  isLocked: boolean;
  iconName: string;
  description: string;
  instructor: string;
  rating: number;
  learningResonanceGain: number;
  keyTopics: string[];
}

export interface CareerResonanceMetrics {
  leadership: number;
  creativity: number;
  stability: number;
  intuition: number;
  alignment: number;
}

export interface VocationCard {
  id: string;
  title: string;
  icon: string;
  description: string;
  suitabilityScore: number;
}

export interface TimelineMilestone {
  quarter: string;
  title: string;
  description: string;
  highlightIcon?: string;
}

export interface DestinyProfileData {
  userName: string;
  birthDate: string;
  lifePathNumber: number;
  destinyNumber: number;
  soulUrgeNumber: number;
  cosmicElement: string;
  archetype: string;
  metrics: CareerResonanceMetrics;
  vocations: VocationCard[];
  timeline: TimelineMilestone[];
  karmaGuidance: string;
  auraFrequencyHz: number;
}

export interface TarotCard {
  id: string;
  name: string;
  arcana: 'Major' | 'Minor';
  suit?: string;
  element: string;
  keywords: string[];
  quantumMeaning: string;
  affirmation: string;
  imageUrl: string;
}
