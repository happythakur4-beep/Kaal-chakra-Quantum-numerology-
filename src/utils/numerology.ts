import { DestinyProfileData, CareerResonanceMetrics, VocationCard, TimelineMilestone } from '../types';

// Pythagorean letter values
const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

export function reduceToCoreNumber(num: number, allowMasterNumbers: boolean = true): number {
  if (allowMasterNumbers && (num === 11 || num === 22 || num === 33)) {
    return num;
  }
  while (num > 9) {
    if (allowMasterNumbers && (num === 11 || num === 22 || num === 33)) {
      return num;
    }
    const sum = num
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    num = sum;
  }
  return num;
}

export function calculateLifePath(birthDateStr: string): number {
  if (!birthDateStr) return 7;
  const parts = birthDateStr.split('-').map(p => parseInt(p, 10));
  if (parts.length < 3 || isNaN(parts[0])) return 7;

  const [year, month, day] = parts;
  const rDay = reduceToCoreNumber(day, false);
  const rMonth = reduceToCoreNumber(month, false);
  const rYear = reduceToCoreNumber(year, false);

  return reduceToCoreNumber(rDay + rMonth + rYear, true);
}

export function calculateDestinyNumber(name: string): number {
  if (!name.trim()) return 11;
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
  let sum = 0;
  for (const char of cleanName) {
    sum += PYTHAGOREAN_MAP[char] || 0;
  }
  return reduceToCoreNumber(sum, true);
}

export function calculateSoulUrgeNumber(name: string): number {
  if (!name.trim()) return 3;
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
  let sum = 0;
  for (const char of cleanName) {
    if (VOWELS.has(char)) {
      sum += PYTHAGOREAN_MAP[char] || 0;
    }
  }
  return reduceToCoreNumber(sum, true);
}

export function generateLoShuGrid(birthDateStr: string): Record<number, number> {
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  if (!birthDateStr) return counts;
  const digits = birthDateStr.replace(/\D/g, '').split('').map(Number);
  digits.forEach(d => {
    if (d >= 1 && d <= 9) {
      counts[d] = (counts[d] || 0) + 1;
    }
  });
  return counts;
}

export function generateCustomDestinyProfile(
  name: string,
  birthDate: string = '1996-07-14'
): DestinyProfileData {
  const safeName = name.trim() || 'Anya Sharma';
  const safeDate = birthDate || '1996-07-14';

  const lifePath = calculateLifePath(safeDate);
  const destiny = calculateDestinyNumber(safeName);
  const soulUrge = calculateSoulUrgeNumber(safeName);

  // Compute triangle radar resonance metrics
  const leadership = Math.min(20, Math.max(12, 14 + (destiny % 7)));
  const creativity = Math.min(20, Math.max(12, 13 + (soulUrge % 8)));
  const stability = Math.min(20, Math.max(10, 11 + (lifePath % 9)));
  const intuition = Math.min(20, Math.max(14, 15 + ((destiny + soulUrge) % 6)));
  const alignment = Math.min(20, Math.max(14, 16 + ((lifePath + destiny) % 5)));

  const metrics: CareerResonanceMetrics = {
    leadership,
    creativity,
    stability,
    intuition,
    alignment,
  };

  const vocations: VocationCard[] = [
    {
      id: 'voc-1',
      title: 'Quantum Healer & Wellness Guide',
      icon: 'Caduceus',
      description: 'Aligns individuals with their energetic blueprint for holistic wellbeing.',
      suitabilityScore: 94 + (lifePath % 5),
    },
    {
      id: 'voc-2',
      title: 'Astrological Consultant',
      icon: 'Zodiac',
      description: 'Interprets celestial movements to guide life decisions and path.',
      suitabilityScore: 90 + (destiny % 7),
    },
    {
      id: 'voc-3',
      title: 'Metaphysical Architect',
      icon: 'Compass',
      description: 'Designs spaces and structures aligned with sacred geometry and universal energy.',
      suitabilityScore: 86 + (soulUrge % 9),
    },
    {
      id: 'voc-4',
      title: 'Spiritual Leadership Coach',
      icon: 'Lion',
      description: 'Mentors leaders to lead with intuition, wisdom, and higher purpose.',
      suitabilityScore: 92 + ((leadership + intuition) % 7),
    },
  ];

  const currentYear = new Date().getFullYear();
  const timeline: TimelineMilestone[] = [
    {
      quarter: `Q3 ${currentYear}:`,
      title: 'Activation & Alignment',
      description: 'Favorable for new beginnings, internal calibration, and foundational work.',
      highlightIcon: 'Sparkles',
    },
    {
      quarter: `Q1 ${currentYear + 1}:`,
      title: 'Expansion & Recognition',
      description: 'Period for accelerated growth, public visibility, and harmonic alliances.',
      highlightIcon: 'Sun',
    },
    {
      quarter: `Q4 ${currentYear + 1}:`,
      title: 'Mastery & Influence',
      description: 'Peak performance, leadership manifestation, and establishment of authority.',
      highlightIcon: 'Moon',
    },
    {
      quarter: `Q2 ${currentYear + 2}:`,
      title: 'Legacy & Transmutation',
      description: 'Long-term impact, teaching transmission, and cosmic energetic shift.',
      highlightIcon: 'Star',
    },
  ];

  const karmaGuidance = `Your professional journey is intrinsically linked to your spiritual evolution. As Life Path ${lifePath} and Destiny ${destiny}, embrace challenges as opportunities for karmic refinement. Practice mindfulness and compassionate leadership, for your true power lies in uplifting others. Trust the cosmic flow, and allow your intuition to be your ultimate guide. Your destiny is illuminated by the service you render with a pure heart.`;

  return {
    userName: safeName,
    birthDate: safeDate,
    lifePathNumber: lifePath,
    destinyNumber: destiny,
    soulUrgeNumber: soulUrge,
    cosmicElement: lifePath % 2 === 0 ? 'Earth & Cosmic Fire' : 'Ether & Water',
    archetype: destiny === 11 ? 'The Master Intuitive' : destiny === 7 ? 'The Sacred Mystic' : 'The Cosmic Visionary',
    metrics,
    vocations,
    timeline,
    karmaGuidance,
    auraFrequencyHz: 528,
  };
}
