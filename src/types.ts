export type ScreenType = 
  | 'landing' 
  | 'energy-balance'
  | 'mind-healing'
  | 'sound-healing'
  | 'memory-hypnosis'
  | 'portal' 
  | 'tesla-369'
  | 'karma'
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
  karmaScore?: number;
  punyaScore?: number;
  papaScore?: number;
  karmaDebtPercent?: number;
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

export type CelestialType = 'planet' | 'star' | 'moon' | 'galaxy' | 'nebula' | 'black-hole' | 'vortex-node';

export interface CelestialBodyData {
  id: string;
  name: string;
  sanskritName?: string;
  type: CelestialType;
  orbitalPeriod?: string;
  distanceFromSun?: string;
  vibrationalFrequencyHz: number;
  solfeggioKey?: string;
  chakraResonance?: string;
  teslaHarmonicNumber: 3 | 6 | 9 | number;
  vedicGraha?: string;
  color: string;
  glowColor: string;
  texturePattern?: string;
  radius: number; // For visualization sizing
  orbitDistance: number; // For orrery layout
  speed: number;
  description: string;
  teslaInsight: string;
  vedicCosmology: string;
  quantumAffirmation: string;
  keyFacts: { label: string; value: string }[];
}

export interface TeslaVortexNode {
  number: number;
  isDivineTrinity: boolean; // 3, 6, or 9
  frequencyHz: number;
  solfeggioTitle: string;
  vortexMeaning: string;
  vedicParallel: string;
  color: string;
  connections: number[];
}

export type CyberTab = 'planets' | 'maps-radar' | 'sudarshan' | 'galaxy' | 'terminal' | 'vortex' | 'tune-thrive' | 'blackhole' | 'chakras' | 'etheric';

export interface SacredExhibitData {
  id: string;
  title: string;
  sanskritTitle: string;
  subtitle: string;
  type: 'image' | 'video' | 'interactive';
  imageSrc: string;
  videoSrc?: string;
  tag: string;
  chakraResonance: string;
  solfeggioHz: number;
  solfeggioName: string;
  teslaHarmonic: 3 | 6 | 9 | '3-6-9';
  shortDescription: string;
  fullPhilosophy: string;
  scripturalPassage: {
    sanskrit: string;
    transliteration: string;
    english: string;
    source: string;
  };
  scientificTeslaInsight: string;
  sacredSymbolism: { label: string; value: string }[];
  keyPowers: string[];
}

export type KoshaLevel = 'Annamaya (Physical)' | 'Pranamaya (Energy/Breath)' | 'Manomaya (Mental/Emotional)' | 'Vijnanamaya (Wisdom/Intellect)' | 'Anandamaya (Bliss/Source)';

export type IllnessCategory = 
  | 'pain_musculoskeletal'
  | 'cardiovascular_heart'
  | 'metabolism_endocrine'
  | 'autoimmune_immunity'
  | 'neurological_mental'
  | 'digestive_gut'
  | 'respiratory_lungs'
  | 'cellular_tumoral'
  | 'dermatological_skin'
  | 'urinary_renal'
  | 'custom_universal';

export interface MindHealingProtocol {
  id: string;
  illnessName: string;
  sanskritName: string;
  category: IllnessCategory;
  organAffected: string;
  chakraLocus: string;
  chakraColor: string;
  koshaLevel: KoshaLevel;
  solfeggioHz: number;
  solfeggioBenefit: string;
  rootPsychosomaticPattern: string;
  epigeneticAffirmation: string;
  sanskritMantra: {
    deityOrRishi: string;
    sanskrit: string;
    transliteration: string;
    meaning: string;
    japaCount: number;
  };
  visualizationSteps: {
    phase: string;
    title: string;
    instruction: string;
    targetVisual: string;
  }[];
  pranayamaRhythm: {
    technique: string;
    inhaleSec: number;
    holdSec: number;
    exhaleSec: number;
    pauseSec: number;
    description: string;
  };
  vagusNerveProtocol: string;
  mindControlKey: string;
}

export interface MindHealingSessionLog {
  id: string;
  date: string;
  illnessName: string;
  durationMinutes: number;
  painBefore: number;
  painAfter: number;
  mentalCoherenceScore: number;
  notes?: string;
}

// ==========================================
// MEMORY HEALING HYPNOSIS TYPES
// ==========================================

export type HypnosisTechniqueCategory = 
  | 'bad_memory_extinction'
  | 'trauma_reconsolidation'
  | 'submodality_dimmer'
  | 'directed_amnesia'
  | 'cognitive_hypermnesia'
  | 'memory_palace_loci'
  | 'synaptic_ltp_boost'
  | 'exam_eidetic_recall';

export type HypnoticBrainwaveState = 'beta' | 'alpha' | 'theta' | 'delta' | 'gamma';

export interface BrainNode3D {
  id: string;
  name: string;
  sanskritName: string;
  function: string;
  clinicalSignificance: string;
  position: [number, number, number]; // x, y, z
  color: string;
  lightningIntensity: number;
  roleInMemory: 'storage' | 'emotional_tag' | 'executive_control' | 'consolidation' | 'relay';
  targetFrequencyHz?: number;
}

export interface MemoryHypnosisProtocol {
  id: string;
  title: string;
  sanskritTitle: string;
  category: HypnosisTechniqueCategory;
  targetBrainArea: string[];
  targetBrainwave: HypnoticBrainwaveState;
  binauralHz: number;
  isochronicHz: number;
  summary: string;
  neurobiologicalMechanism: string;
  scientificReferences: string[];
  durationMinutes: number;
  inductionType: 'elman_lightning' | 'progressive_soma' | 'fractionation' | 'pattern_interrupt';
  steps: {
    phaseNumber: number;
    phaseTitle: string;
    durationSec: number;
    scriptNarration: string;
    subconsciousAction: string;
    visualAnimationState: 'idle' | 'lightning_focus' | 'synaptic_sever' | 'gray_fade' | 'rewind_reverse' | 'golden_consolidation' | 'plasma_shield';
    lightningArcTargets: string[];
  }[];
  postHypnoticSuggestion: string;
  submodalityInstructions?: {
    colorShift: string;
    distanceShift: string;
    sizeShift: string;
    soundShift: string;
    speedShift: string;
  };
}

export interface MemoryPalaceLociItem {
  id: string;
  roomName: string;
  anchorObject: string;
  conceptTitle: string;
  memoryKey: string;
  vividImageryNote: string;
  lightningActive: boolean;
  recallTested?: boolean;
}

export interface MemorySessionLog {
  id: string;
  date: string;
  targetMemoryTitle: string;
  protocolId: string;
  techniqueCategory: HypnosisTechniqueCategory;
  sudsBefore: number; // 0-10 Subjective Units of Distress
  sudsAfter: number;  // 0-10
  emotionalChargeReductionPct: number;
  recallClarityScore?: number; // 0-100 for sharpening
  tranceDepthReached: 'Light' | 'Medium' | 'Somnambulistic' | 'Esdaile State';
  notes: string;
}


