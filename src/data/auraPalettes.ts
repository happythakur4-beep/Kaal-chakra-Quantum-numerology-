import { AuraType } from '../types';

export interface AuraPaletteConfig {
  id: AuraType;
  name: string;
  hindiName: string;
  archetype: string;
  primary: string;
  secondary: string;
  tertiary: string;
  glow: string;
  glowIntense: string;
  border: string;
  bgGradient: string;
  element: string;
  rulingPlanet: string;
  chakra: string;
  frequencyHz: number;
  description: string;
  mantra: string;
  keywords: string[];
}

export const AURA_PALETTES: Record<AuraType, AuraPaletteConfig> = {
  'Calm Amber': {
    id: 'Calm Amber',
    name: 'Calm Amber',
    hindiName: 'शांत पीतांबर',
    archetype: 'Solar Vitality & Serenity',
    primary: '#f59e0b',
    secondary: '#ffd700',
    tertiary: '#b45309',
    glow: 'rgba(245, 158, 11, 0.4)',
    glowIntense: 'rgba(255, 215, 0, 0.65)',
    border: 'rgba(245, 158, 11, 0.45)',
    bgGradient: 'from-amber-950/60 via-yellow-950/30 to-black/80',
    element: 'Tejas (Divine Fire & Light)',
    rulingPlanet: 'Surya (Sun) & Guru (Jupiter)',
    chakra: 'Manipura (Solar Plexus)',
    frequencyHz: 432,
    description: 'Grounds vital energy, dispels midday lethargy, and radiates calm, majestic confidence.',
    mantra: 'ॐ घृणिः सूर्याय नमः',
    keywords: ['Vitality', 'Serenity', 'Executive Focus', 'Sun & Jupiter']
  },
  'Celestial Gold': {
    id: 'Celestial Gold',
    name: 'Celestial Gold',
    hindiName: 'दिव्य सुवर्ण',
    archetype: 'Divine Illumination & Wisdom',
    primary: '#eab308',
    secondary: '#fef08a',
    tertiary: '#ca8a04',
    glow: 'rgba(234, 179, 8, 0.4)',
    glowIntense: 'rgba(254, 240, 138, 0.7)',
    border: 'rgba(234, 179, 8, 0.5)',
    bgGradient: 'from-yellow-950/60 via-amber-950/30 to-black/80',
    element: 'Akasha (Etheric Light)',
    rulingPlanet: 'Brihaspati (Jupiter)',
    chakra: 'Ajna (Third Eye) & Sahasrara',
    frequencyHz: 741,
    description: 'Awakens higher intuition, spiritual discernment, and sovereign intellectual clarity.',
    mantra: 'ॐ बृं बृहस्पतये नमः',
    keywords: ['Wisdom', 'Higher Intuition', 'Prosperity', 'Guru Grace']
  },
  'Radiant Rose': {
    id: 'Radiant Rose',
    name: 'Radiant Rose',
    hindiName: 'दिव्य पद्माभा',
    archetype: 'Unconditional Love & Magnetic Grace',
    primary: '#f43f5e',
    secondary: '#fda4af',
    tertiary: '#be123c',
    glow: 'rgba(244, 63, 94, 0.4)',
    glowIntense: 'rgba(251, 113, 133, 0.65)',
    border: 'rgba(244, 63, 94, 0.45)',
    bgGradient: 'from-rose-950/60 via-pink-950/30 to-black/80',
    element: 'Jala (Sacred Heart Waters)',
    rulingPlanet: 'Shukra (Venus) & Chandra (Moon)',
    chakra: 'Anahata (Heart Chakra)',
    frequencyHz: 528,
    description: 'Dissolves grief, magnetically attracts harmonious relationships, and nurtures cellular healing.',
    mantra: 'ॐ हृत्पद्मे श्रीं महालक्ष्म्यै नमः',
    keywords: ['Love', 'Attraction', 'Cellular Repair', 'Heart Opening']
  },
  'Aetheric Violet': {
    id: 'Aetheric Violet',
    name: 'Aetheric Violet',
    hindiName: 'ब्रह्मांडीय नील-लोहित',
    archetype: 'Cosmic Consciousness & Transcendence',
    primary: '#a855f7',
    secondary: '#c084fc',
    tertiary: '#7e22ce',
    glow: 'rgba(168, 85, 247, 0.4)',
    glowIntense: 'rgba(192, 132, 252, 0.65)',
    border: 'rgba(168, 85, 247, 0.45)',
    bgGradient: 'from-purple-950/60 via-indigo-950/30 to-black/80',
    element: 'Shiva Akasha (Infinite Space)',
    rulingPlanet: 'Ketu & Mahadeva',
    chakra: 'Sahasrara (Crown of 1000 Petals)',
    frequencyHz: 963,
    description: 'Transmutes dense karmic impressions, activates the pineal gland, and bridges mortal to divine.',
    mantra: 'ॐ नमः शिवाय',
    keywords: ['Transcendence', 'Pineal Activation', 'Moksha', 'Cosmic Link']
  },
  'Emerald Clarity': {
    id: 'Emerald Clarity',
    name: 'Emerald Clarity',
    hindiName: 'मरकत शुद्धि',
    archetype: 'Cellular Regeneration & Speech Eloquence',
    primary: '#10b981',
    secondary: '#6ee7b7',
    tertiary: '#047857',
    glow: 'rgba(16, 185, 129, 0.4)',
    glowIntense: 'rgba(110, 231, 183, 0.65)',
    border: 'rgba(16, 185, 129, 0.45)',
    bgGradient: 'from-emerald-950/60 via-teal-950/30 to-black/80',
    element: 'Prithvi & Vayu (Earth & Breath)',
    rulingPlanet: 'Budha (Mercury) & Dhanvantari',
    chakra: 'Anahata & Vishuddha Axis',
    frequencyHz: 639,
    description: 'Restores nervous system coherence, accelerates somatic recovery, and refines analytical speech.',
    mantra: 'ॐ बुं बुधाय नमः',
    keywords: ['Holistic Health', 'Mercury Logic', 'Nervous Coherence', 'Renewal']
  }
};

export const AURA_ORDER: AuraType[] = [
  'Calm Amber',
  'Celestial Gold',
  'Radiant Rose',
  'Aetheric Violet',
  'Emerald Clarity'
];

/**
 * Apply aura colors as CSS variables to the document root
 */
export function applyAuraCssVariables(aura: AuraType, isDark: boolean = true) {
  const config = AURA_PALETTES[aura] || AURA_PALETTES['Calm Amber'];
  const root = document.documentElement;

  root.style.setProperty('--aura-primary', config.primary);
  root.style.setProperty('--aura-secondary', config.secondary);
  root.style.setProperty('--aura-tertiary', config.tertiary);
  root.style.setProperty('--aura-glow', config.glow);
  root.style.setProperty('--aura-glow-intense', config.glowIntense);
  root.style.setProperty('--aura-border', config.border);
  root.style.setProperty('--aura-freq', `${config.frequencyHz}Hz`);
  root.setAttribute('data-active-aura', aura.toLowerCase().replace(/\s+/g, '-'));
}
