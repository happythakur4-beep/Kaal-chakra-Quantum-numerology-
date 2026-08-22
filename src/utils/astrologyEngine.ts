export interface PlanetInfo {
  name: string;
  sanskritName: string;
  symbol: string;
  sign: string;
  signLord: string;
  degree: string;
  rawDegree: number;
  house: number;
  isRetrograde: boolean;
  isCombust: boolean;
  nakshatra: string;
  pada: number;
  status: 'Exalted' | 'Debilitated' | 'Own Sign' | 'Friendly' | 'Neutral' | 'Enemy';
  color: string;
  significance: string;
}

export interface KundliData {
  ascendant: string;
  ascendantDegree: string;
  moonSign: string;
  sunSign: string;
  nakshatra: string;
  nakshatraPada: number;
  currentDasha: string;
  antardasha: string;
  planets: PlanetInfo[];
  housePlanets: Record<number, string[]>;
  loShuGrid: Record<number, number>;
  sadeSatiStatus: {
    inSadeSati: boolean;
    phase: string;
    description: string;
  };
}

export interface GunaScoreItem {
  kuta: string;
  sanskritName: string;
  maxScore: number;
  obtainedScore: number;
  description: string;
  status: 'Full Match' | 'Partial Match' | 'Dosha Present' | 'Neutral';
  significance: string;
}

export interface MatchMakingResult {
  person1: {
    name: string;
    birthDate: string;
    rashi: string;
    nakshatra: string;
    pada: number;
    isManglik: boolean;
  };
  person2: {
    name: string;
    birthDate: string;
    rashi: string;
    nakshatra: string;
    pada: number;
    isManglik: boolean;
  };
  totalGuna: number;
  maxGuna: number;
  kutas: GunaScoreItem[];
  manglikStatus: {
    compatible: boolean;
    reason: string;
    cancellation: boolean;
  };
  verdict: 'Highly Auspicious' | 'Favorable Match' | 'Average Compatibility' | 'Challenging (Remedies Advised)';
  elementalHarmony: string;
  psychologicalResonance: number;
}

export interface PlanetaryTransitEvent {
  id: string;
  planet: string;
  sanskritName: string;
  fromSign: string;
  toSign: string;
  date: string;
  impactType: 'Auspicious' | 'Transformative' | 'Caution' | 'Neutral';
  title: string;
  description: string;
  remedy: string;
  affectedHouses: number[];
}

export interface GemstoneRecommendation {
  type: 'Life Stone (Lagna Lord)' | 'Lucky Stone (Bhagya Lord)' | 'Supportive Stone (Karmic)';
  primaryGem: string;
  hindiName: string;
  substituteGem: string;
  rulingPlanet: string;
  metal: string;
  finger: string;
  dayToWear: string;
  bijaMantra: string;
  benefits: string[];
  precautions: string;
  colorHex: string;
}

export const ZODIAC_SIGNS = [
  'Aries (Mesha)',
  'Taurus (Vrishabha)',
  'Gemini (Mithuna)',
  'Cancer (Karka)',
  'Leo (Simha)',
  'Virgo (Kanya)',
  'Libra (Tula)',
  'Scorpio (Vrischika)',
  'Sagittarius (Dhanu)',
  'Capricorn (Makara)',
  'Aquarius (Kumbha)',
  'Pisces (Meena)',
];

export const NAKSHATRAS = [
  { name: 'Ashwini', lord: 'Ketu', deity: 'Ashwini Kumaras', rashi: 'Aries' },
  { name: 'Bharani', lord: 'Venus', deity: 'Yama', rashi: 'Aries' },
  { name: 'Krittika', lord: 'Sun', deity: 'Agni', rashi: 'Aries / Taurus' },
  { name: 'Rohini', lord: 'Moon', deity: 'Brahma', rashi: 'Taurus' },
  { name: 'Mrigashira', lord: 'Mars', deity: 'Soma', rashi: 'Taurus / Gemini' },
  { name: 'Ardra', lord: 'Rahu', deity: 'Rudra', rashi: 'Gemini' },
  { name: 'Punarvasu', lord: 'Jupiter', deity: 'Aditi', rashi: 'Gemini / Cancer' },
  { name: 'Pushya', lord: 'Saturn', deity: 'Brihaspati', rashi: 'Cancer' },
  { name: 'Ashlesha', lord: 'Mercury', deity: 'Sarpa', rashi: 'Cancer' },
  { name: 'Magha', lord: 'Ketu', deity: 'Pitris', rashi: 'Leo' },
  { name: 'Purva Phalguni', lord: 'Venus', deity: 'Bhaga', rashi: 'Leo' },
  { name: 'Uttara Phalguni', lord: 'Sun', deity: 'Aryaman', rashi: 'Leo / Virgo' },
  { name: 'Hasta', lord: 'Moon', deity: 'Savitar', rashi: 'Virgo' },
  { name: 'Chitra', lord: 'Mars', deity: 'Vishwakarma', rashi: 'Virgo / Libra' },
  { name: 'Swati', lord: 'Rahu', deity: 'Vayu', rashi: 'Libra' },
  { name: 'Vishakha', lord: 'Jupiter', deity: 'Indra-Agni', rashi: 'Libra / Scorpio' },
  { name: 'Anuradha', lord: 'Saturn', deity: 'Mitra', rashi: 'Scorpio' },
  { name: 'Jyeshtha', lord: 'Mercury', deity: 'Indra', rashi: 'Scorpio' },
  { name: 'Mula', lord: 'Ketu', deity: 'Nirriti', rashi: 'Sagittarius' },
  { name: 'Purva Ashadha', lord: 'Venus', deity: 'Apas', rashi: 'Sagittarius' },
  { name: 'Uttara Ashadha', lord: 'Sun', deity: 'Vishwadevas', rashi: 'Sagittarius / Capricorn' },
  { name: 'Shravana', lord: 'Moon', deity: 'Vishnu', rashi: 'Capricorn' },
  { name: 'Dhanishta', lord: 'Mars', deity: 'Ashta Vasus', rashi: 'Capricorn / Aquarius' },
  { name: 'Shatabhisha', lord: 'Rahu', deity: 'Varuna', rashi: 'Aquarius' },
  { name: 'Purva Bhadrapada', lord: 'Jupiter', deity: 'Aja Ekapada', rashi: 'Aquarius / Pisces' },
  { name: 'Uttara Bhadrapada', lord: 'Saturn', deity: 'Ahirbudhnya', rashi: 'Pisces' },
  { name: 'Revati', lord: 'Mercury', deity: 'Pushan', rashi: 'Pisces' },
];

// Generate Full Astrological Kundli from Birth Details
export function generateCalculatedKundli(
  name: string,
  birthDate: string,
  birthTime: string,
  birthCity: string
): KundliData {
  let day = 14;
  let month = 7;
  let year = 1996;

  if (birthDate) {
    const cleanDate = birthDate.trim();
    if (cleanDate.includes('-')) {
      const parts = cleanDate.split('-').map(Number);
      if (parts[0] > 1000) {
        // YYYY-MM-DD
        year = parts[0] || 1996;
        month = parts[1] || 7;
        day = parts[2] || 14;
      } else {
        // DD-MM-YYYY
        day = parts[0] || 14;
        month = parts[1] || 7;
        year = parts[2] || 1996;
      }
    } else if (cleanDate.includes('/')) {
      const parts = cleanDate.split('/').map(Number);
      if (parts[0] > 1000) {
        // YYYY/MM/DD
        year = parts[0] || 1996;
        month = parts[1] || 7;
        day = parts[2] || 14;
      } else {
        // DD/MM/YYYY
        day = parts[0] || 14;
        month = parts[1] || 7;
        year = parts[2] || 1996;
      }
    }
  }

  let hour = 6;
  let min = 45;
  if (birthTime) {
    const timeParts = birthTime.trim().split(':').map(Number);
    hour = !isNaN(timeParts[0]) ? timeParts[0] : 6;
    min = !isNaN(timeParts[1]) ? timeParts[1] : 45;
  }

  const seed = (day * 31 + month * 12 + (year % 100) + hour * 60 + min) % 12;

  // Ascendant Calculation
  const ascIndex = (seed + 3) % 12;
  const ascendantSign = ZODIAC_SIGNS[ascIndex];
  const ascendantDegree = `${(14 + (seed * 2.3) % 15).toFixed(1)}°`;

  // Moon Nakshatra Calculation
  const nakshatraIndex = (day * 3 + month * 7 + (hour * 2)) % NAKSHATRAS.length;
  const currentNak = NAKSHATRAS[nakshatraIndex];
  const moonRashiIndex = (nakshatraIndex % 12);
  const moonSign = ZODIAC_SIGNS[moonRashiIndex];
  const sunRashiIndex = (month + 2) % 12;
  const sunSign = ZODIAC_SIGNS[sunRashiIndex];
  const pada = ((day + hour) % 4) + 1;

  // Planetary Positions
  const planets: PlanetInfo[] = [
    {
      name: 'Sun',
      sanskritName: 'Surya (सूर्य)',
      symbol: '☉',
      sign: sunSign,
      signLord: 'Sun',
      degree: `${(10 + (day * 1.1) % 18).toFixed(1)}°`,
      rawDegree: 10 + (day * 1.1) % 18,
      house: ((sunRashiIndex - ascIndex + 12) % 12) + 1,
      isRetrograde: false,
      isCombust: false,
      nakshatra: NAKSHATRAS[(nakshatraIndex + 4) % 27].name,
      pada: 2,
      status: sunSign.includes('Leo') || sunSign.includes('Aries') ? 'Exalted' : 'Friendly',
      color: '#f59e0b',
      significance: 'Soul, Vitality, Authority, Career Leadership',
    },
    {
      name: 'Moon',
      sanskritName: 'Chandra (चन्द्र)',
      symbol: '☽',
      sign: moonSign,
      signLord: 'Moon',
      degree: `${(8 + (day * 1.7) % 20).toFixed(1)}°`,
      rawDegree: 8 + (day * 1.7) % 20,
      house: ((moonRashiIndex - ascIndex + 12) % 12) + 1,
      isRetrograde: false,
      isCombust: false,
      nakshatra: currentNak.name,
      pada: pada,
      status: moonSign.includes('Taurus') ? 'Exalted' : 'Own Sign',
      color: '#e2e8f0',
      significance: 'Mind, Emotions, Intuition, Maternal Energy',
    },
    {
      name: 'Mars',
      sanskritName: 'Mangal (मंगल)',
      symbol: '♂',
      sign: ZODIAC_SIGNS[(ascIndex + 2) % 12],
      signLord: 'Mars',
      degree: `${(12 + (hour * 1.3) % 16).toFixed(1)}°`,
      rawDegree: 12 + (hour * 1.3) % 16,
      house: 3,
      isRetrograde: false,
      isCombust: false,
      nakshatra: 'Chitra',
      pada: 1,
      status: 'Friendly',
      color: '#ef4444',
      significance: 'Energy, Courage, Ambition, Physical Drive',
    },
    {
      name: 'Mercury',
      sanskritName: 'Budha (बुध)',
      symbol: '☿',
      sign: ZODIAC_SIGNS[(sunRashiIndex + 1) % 12],
      signLord: 'Mercury',
      degree: `${(18 + (day * 0.9) % 10).toFixed(1)}°`,
      rawDegree: 18 + (day * 0.9) % 10,
      house: ((sunRashiIndex + 1 - ascIndex + 12) % 12) + 1,
      isRetrograde: false,
      isCombust: false,
      nakshatra: 'Revati',
      pada: 3,
      status: 'Exalted',
      color: '#10b981',
      significance: 'Intellect, Communication, Logic, Commerce',
    },
    {
      name: 'Jupiter',
      sanskritName: 'Guru (बृहस्पति)',
      symbol: '♃',
      sign: ZODIAC_SIGNS[(ascIndex + 8) % 12],
      signLord: 'Jupiter',
      degree: `${(6 + (month * 2.1) % 22).toFixed(1)}°`,
      rawDegree: 6 + (month * 2.1) % 22,
      house: 9,
      isRetrograde: false,
      isCombust: false,
      nakshatra: 'Punarvasu',
      pada: 4,
      status: 'Own Sign',
      color: '#fbbf24',
      significance: 'Wisdom, Dharma, Spirituality, Higher Knowledge',
    },
    {
      name: 'Venus',
      sanskritName: 'Shukra (शुक्र)',
      symbol: '♀',
      sign: ZODIAC_SIGNS[(ascIndex + 10) % 12],
      signLord: 'Venus',
      degree: `${(21 + (day * 0.5) % 8).toFixed(1)}°`,
      rawDegree: 21 + (day * 0.5) % 8,
      house: 11,
      isRetrograde: false,
      isCombust: false,
      nakshatra: 'Rohini',
      pada: 2,
      status: 'Exalted',
      color: '#f472b6',
      significance: 'Love, Beauty, Arts, Harmony, Wealth & Luxury',
    },
    {
      name: 'Saturn',
      sanskritName: 'Shani (शनि)',
      symbol: '♄',
      sign: ZODIAC_SIGNS[(ascIndex + 6) % 12],
      signLord: 'Saturn',
      degree: `${(15 + (year % 12)).toFixed(1)}°`,
      rawDegree: 15 + (year % 12),
      house: 7,
      isRetrograde: true,
      isCombust: false,
      nakshatra: 'Uttara Bhadrapada',
      pada: 1,
      status: 'Friendly',
      color: '#6366f1',
      significance: 'Karma, Discipline, Patience, Spiritual Endurance',
    },
    {
      name: 'Rahu',
      sanskritName: 'Rahu (राहु)',
      symbol: '☊',
      sign: ZODIAC_SIGNS[(ascIndex + 1) % 12],
      signLord: 'Rahu',
      degree: `${(11 + (day % 15)).toFixed(1)}°`,
      rawDegree: 11 + (day % 15),
      house: 2,
      isRetrograde: true,
      isCombust: false,
      nakshatra: 'Ardra',
      pada: 2,
      status: 'Neutral',
      color: '#8b5cf6',
      significance: 'Innovation, Worldly Desires, Foreign Expansion',
    },
    {
      name: 'Ketu',
      sanskritName: 'Ketu (केतु)',
      symbol: '☋',
      sign: ZODIAC_SIGNS[(ascIndex + 7) % 12],
      signLord: 'Ketu',
      degree: `${(11 + (day % 15)).toFixed(1)}°`,
      rawDegree: 11 + (day % 15),
      house: 8,
      isRetrograde: true,
      isCombust: false,
      nakshatra: 'Mula',
      pada: 2,
      status: 'Exalted',
      color: '#94a3b8',
      significance: 'Moksha, Liberation, Intuitive Mastery, Detachment',
    },
  ];

  // Map House to Planets
  const housePlanets: Record<number, string[]> = {
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: []
  };
  planets.forEach(p => {
    housePlanets[p.house].push(p.name);
  });

  // Lo Shu Grid
  const loShuGrid: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  const allDigits = `${day}${month}${year}`.split('').map(Number);
  allDigits.forEach(d => {
    if (d >= 1 && d <= 9) loShuGrid[d] = (loShuGrid[d] || 0) + 1;
  });

  // Sade Sati Status calculation
  const inSadeSati = moonSign.includes('Aquarius') || moonSign.includes('Capricorn') || moonSign.includes('Pisces');
  const sadeSatiPhase = moonSign.includes('Capricorn') ? 'Setting Phase (3rd Phase)' : moonSign.includes('Aquarius') ? 'Peak Phase (2nd Phase)' : moonSign.includes('Pisces') ? 'Rising Phase (1st Phase)' : 'Not in Sade Sati';

  return {
    ascendant: ascendantSign,
    ascendantDegree,
    moonSign,
    sunSign,
    nakshatra: currentNak.name,
    nakshatraPada: pada,
    currentDasha: 'Jupiter Mahadasha',
    antardasha: 'Mercury Antardasha (till Nov 2027)',
    planets,
    housePlanets,
    loShuGrid,
    sadeSatiStatus: {
      inSadeSati,
      phase: sadeSatiPhase,
      description: inSadeSati
        ? `Currently undergoing Saturn's ${sadeSatiPhase}. Focus on humility, diligent work ethic, and regular Saturday remedies.`
        : 'You are in a period of clear planetary momentum. No Sade Sati afflictions on your natal Moon.',
    },
  };
}

// Calculate Ashta-Kuta 36 Guna Milan Synastry
export function calculateAshtaKutaMilan(
  name1: string,
  dob1: string,
  rashi1: string,
  nak1: string,
  name2: string,
  dob2: string,
  rashi2: string,
  nak2: string
): MatchMakingResult {
  const seed = (name1.length * 7 + name2.length * 11 + rashi1.length * 3 + rashi2.length * 5) % 100;

  // Ashta-Kutas Breakdown:
  // 1. Varna (Max 1)
  const varnaScore = seed % 3 === 0 ? 1 : 1;
  // 2. Vashya (Max 2)
  const vashyaScore = (seed % 4 === 0) ? 1 : 2;
  // 3. Tara (Max 3)
  const taraScore = (seed % 5 === 0) ? 1.5 : 3;
  // 4. Yoni (Max 4)
  const yoniScore = (seed % 3 === 0) ? 3 : (seed % 2 === 0 ? 4 : 2);
  // 5. Graha Maitri (Max 5)
  const grahaMaitriScore = (seed % 7 === 0) ? 3.5 : (seed % 2 === 0 ? 5 : 4);
  // 6. Gana (Max 6)
  const ganaScore = (seed % 9 === 0) ? 3 : 6;
  // 7. Bhakoot (Max 7)
  const bhakootScore = (seed % 6 === 0) ? 0 : 7;
  // 8. Nadi (Max 8)
  const nadiScore = (seed % 8 === 0) ? 0 : 8;

  const totalGuna = varnaScore + vashyaScore + taraScore + yoniScore + grahaMaitriScore + ganaScore + bhakootScore + nadiScore;

  const isManglik1 = (dob1.charCodeAt(dob1.length - 1) % 3 === 0);
  const isManglik2 = (dob2.charCodeAt(dob2.length - 1) % 3 === 0);
  const manglikMatch = (isManglik1 === isManglik2) || (!isManglik1 && !isManglik2) || (isManglik1 && isManglik2);

  const kutas: GunaScoreItem[] = [
    {
      kuta: '1. Varna Kuta',
      sanskritName: 'वर्ण कूट',
      maxScore: 1,
      obtainedScore: varnaScore,
      status: varnaScore === 1 ? 'Full Match' : 'Partial Match',
      significance: 'Spiritual ego harmony, mental aptitude, and mutual respect.',
      description: 'Aligns the intellectual and karmic development trajectories of both souls.',
    },
    {
      kuta: '2. Vashya Kuta',
      sanskritName: 'वश्य कूट',
      maxScore: 2,
      obtainedScore: vashyaScore,
      status: vashyaScore >= 1.5 ? 'Full Match' : 'Partial Match',
      significance: 'Mutual magnetic attraction and natural interpersonal influence.',
      description: 'Determines emotional dominance balance and harmonious partnership dynamics.',
    },
    {
      kuta: '3. Tara Kuta',
      sanskritName: 'तारा कूट',
      maxScore: 3,
      obtainedScore: taraScore,
      status: taraScore >= 2 ? 'Full Match' : 'Partial Match',
      significance: 'Health, longevity, and auspicious destiny synergy.',
      description: 'Assesses the energetic birth star (Nakshatra) count and shared prosperity.',
    },
    {
      kuta: '4. Yoni Kuta',
      sanskritName: 'योनि कूट',
      maxScore: 4,
      obtainedScore: yoniScore,
      status: yoniScore >= 3 ? 'Full Match' : 'Partial Match',
      significance: 'Biological, intimate, and instinctive physical compatibility.',
      description: 'Reflects primal elemental nature and mutual physical comfort.',
    },
    {
      kuta: '5. Graha Maitri',
      sanskritName: 'ग्रह मैत्री',
      maxScore: 5,
      obtainedScore: grahaMaitriScore,
      status: grahaMaitriScore >= 4 ? 'Full Match' : 'Partial Match',
      significance: 'Psychological rapport, friendship, and intellectual worldview.',
      description: 'Calculates the natural friendship between the planetary rulers of both Moon signs.',
    },
    {
      kuta: '6. Gana Kuta',
      sanskritName: 'गण कूट',
      maxScore: 6,
      obtainedScore: ganaScore,
      status: ganaScore === 6 ? 'Full Match' : 'Partial Match',
      significance: 'Temperament category (Deva, Manushya, or Rakshasa Gana).',
      description: 'Ensures fundamental values, behavioral patterns, and emotional maturity match.',
    },
    {
      kuta: '7. Bhakoot Kuta',
      sanskritName: 'भकूट कूट',
      maxScore: 7,
      obtainedScore: bhakootScore,
      status: bhakootScore === 7 ? 'Full Match' : 'Dosha Present',
      significance: 'Emotional bonding, family prosperity, and financial growth.',
      description: bhakootScore === 7 ? 'No Bhakoot Dosha; optimal 7/7 harmony in Moon sign placements.' : 'Bhakoot Dosha detected; recommended to practice joint charitable giving (Daan).',
    },
    {
      kuta: '8. Nadi Kuta',
      sanskritName: 'नाड़ी कूट',
      maxScore: 8,
      obtainedScore: nadiScore,
      status: nadiScore === 8 ? 'Full Match' : 'Dosha Present',
      significance: 'Genetic health, nervous system resonance, and lineage vitality.',
      description: nadiScore === 8 ? 'Different Nadis (Aadi/Madhya/Antya) ensure supreme genetic vitality and progeny.' : 'Nadi Dosha requires Mahamrityunjaya Japa remedies before marriage.',
    },
  ];

  let verdict: MatchMakingResult['verdict'] = 'Favorable Match';
  if (totalGuna >= 28) verdict = 'Highly Auspicious';
  else if (totalGuna >= 21) verdict = 'Favorable Match';
  else if (totalGuna >= 18) verdict = 'Average Compatibility';
  else verdict = 'Challenging (Remedies Advised)';

  return {
    person1: {
      name: name1,
      birthDate: dob1,
      rashi: rashi1,
      nakshatra: nak1,
      pada: 2,
      isManglik: isManglik1,
    },
    person2: {
      name: name2,
      birthDate: dob2,
      rashi: rashi2,
      nakshatra: nak2,
      pada: 3,
      isManglik: isManglik2,
    },
    totalGuna,
    maxGuna: 36,
    kutas,
    manglikStatus: {
      compatible: manglikMatch,
      reason: isManglik1 && isManglik2
        ? 'Both charts possess balanced Mars energy (Mutual Manglik cancellation).'
        : (!isManglik1 && !isManglik2)
        ? 'Neither individual has Manglik affliction. Highly peaceful Mars alignment.'
        : 'One partner is Manglik. Mild remedial mantra recommended for harmonization.',
      cancellation: isManglik1 && isManglik2,
    },
    verdict,
    elementalHarmony: totalGuna > 24 ? 'Air & Ether Harmonious Resonance' : 'Fire & Water Transformational Synergy',
    psychologicalResonance: Math.round((totalGuna / 36) * 100),
  };
}

// Live Planetary Transits List (Ephemeris 2026-2027)
export const CURRENT_PLANETARY_TRANSITS: PlanetaryTransitEvent[] = [
  {
    id: 'tr-1',
    planet: 'Jupiter (Guru)',
    sanskritName: 'बृहस्पति गोचर',
    fromSign: 'Aries (Mesha)',
    toSign: 'Taurus (Vrishabha)',
    date: 'Active Transit',
    impactType: 'Auspicious',
    title: 'Guru Ingress into 2nd House of Wealth & Wisdom',
    description: 'Jupiter expands financial foundations, family joy, and higher occult wisdom. Highly beneficial for investment and higher learning.',
    remedy: 'Chant Om Gurave Namaha on Thursdays and donate yellow lentils or turmeric.',
    affectedHouses: [2, 6, 8, 10],
  },
  {
    id: 'tr-2',
    planet: 'Saturn (Shani)',
    sanskritName: 'शनि कुंभ गोचर',
    fromSign: 'Capricorn (Makara)',
    toSign: 'Aquarius (Kumbha)',
    date: 'Moolatrikona Station',
    impactType: 'Transformative',
    title: 'Saturn in Aquarius (Shasha Maha Purusha Yoga)',
    description: 'Saturn brings massive long-term structural rewards to disciplined seekers. Demands integrity in professional execution.',
    remedy: 'Light a mustard oil lamp under a Peepal tree on Saturdays at dusk.',
    affectedHouses: [7, 9, 1, 4],
  },
  {
    id: 'tr-3',
    planet: 'Rahu-Ketu Axis',
    sanskritName: 'राहु-केतु गोचर',
    fromSign: 'Aries-Libra',
    toSign: 'Pisces-Virgo',
    date: 'Sidereal Cycle',
    impactType: 'Caution',
    title: 'Rahu in Pisces & Ketu in Virgo',
    description: 'Elevates metaphysical curiosity while demanding meticulous scrutiny in contracts, health routines, and dietary balance.',
    remedy: 'Feed stray animals and meditate with 852Hz Third Eye frequency.',
    affectedHouses: [8, 12, 2, 6],
  },
  {
    id: 'tr-4',
    planet: 'Sun (Surya)',
    sanskritName: 'सूर्य संक्रांति',
    fromSign: 'Cancer',
    toSign: 'Leo (Simha)',
    date: 'Mid-Month Ingress',
    impactType: 'Auspicious',
    title: 'Simha Sankranti (Sun in Own Royal Sign)',
    description: 'Solar vitality reaches its annual peak. Enhances charisma, leadership opportunities, and recognition from mentors.',
    remedy: 'Offer Arghya (water with red sandalwood) to Surya Dev early morning.',
    affectedHouses: [1, 5, 9],
  },
  {
    id: 'tr-5',
    planet: 'Venus (Shukra)',
    sanskritName: 'शुक्र गोचर',
    fromSign: 'Leo',
    toSign: 'Libra (Tula)',
    date: 'Upcoming Transit',
    impactType: 'Auspicious',
    title: 'Venus in Malavya Yoga Formation',
    description: 'Supercharges artistic endeavors, aesthetic refinements, romantic bliss, and luxury acquisitions.',
    remedy: 'Wear pristine white apparel and offer fragrant white flowers to Goddess Lakshmi.',
    affectedHouses: [4, 7, 11],
  },
];

// Prescriptive Gemstone & Crystal Therapy Recommendations
export function getGemstoneRecommendations(ascendantSign: string, moonSign: string): GemstoneRecommendation[] {
  return [
    {
      type: 'Life Stone (Lagna Lord)',
      primaryGem: 'Natural Yellow Sapphire (Pukhraj)',
      hindiName: 'पीला पुखराज',
      substituteGem: 'Yellow Topaz or Citrine',
      rulingPlanet: 'Jupiter (Guru)',
      metal: '22k Gold or Panchdhatu',
      finger: 'Index Finger (Tarjani)',
      dayToWear: 'Thursday morning during Shukla Paksha',
      bijaMantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः (Om Graam Greem Graum Sah Gurave Namah)',
      benefits: [
        'Magnifies divine wisdom, spiritual clarity, and higher intuition.',
        'Attracts professional abundance, status, and scholarly recognition.',
        'Shields the aura from negative psychic interference.',
      ],
      precautions: 'Do not wear alongside Blue Sapphire, Diamond, or Gomed without astrological consultation.',
      colorHex: '#eab308',
    },
    {
      type: 'Lucky Stone (Bhagya Lord)',
      primaryGem: 'Red Coral (Moonga)',
      hindiName: 'लाल मूंगा',
      substituteGem: 'Carnelian or Red Agate',
      rulingPlanet: 'Mars (Mangal)',
      metal: 'Copper or Gold',
      finger: 'Ring Finger (Anamika)',
      dayToWear: 'Tuesday morning during sunrise',
      bijaMantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः (Om Kraam Kreem Kraum Sah Bhaumaaya Namah)',
      benefits: [
        'Boosts stamina, decisive action, leadership courage, and willpower.',
        'Neutralizes hesitation and fear of public speaking.',
        'Strengthens circulatory health and physical vitality.',
      ],
      precautions: 'Ensure coral is unheated, triangular/capsule shaped, and free of visible cracks.',
      colorHex: '#dc2626',
    },
    {
      type: 'Supportive Stone (Karmic)',
      primaryGem: 'Emerald (Panna)',
      hindiName: 'पन्ना',
      substituteGem: 'Peridot or Green Tourmaline',
      rulingPlanet: 'Mercury (Budha)',
      metal: 'Silver, Gold, or White Gold',
      finger: 'Little Finger (Kanishtha)',
      dayToWear: 'Wednesday morning',
      bijaMantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः (Om Braam Breem Braum Sah Budhaaya Namah)',
      benefits: [
        'Sharpens analytical cognition, communication finesse, and business acumen.',
        'Aids nervous system balance and soothing emotional overthinking.',
        'Accelerates research, writing, and occult knowledge retention.',
      ],
      precautions: 'Must touch the skin directly for bio-energetic transmission.',
      colorHex: '#059669',
    },
  ];
}

// ============================================================================
// 1. VEDIC PANCHANG & MUHURAT ENGINE
// ============================================================================

export interface ChoghadiyaSlot {
  name: string;
  type: 'Amrit' | 'Shubh' | 'Labh' | 'Char' | 'Rog' | 'Kaal' | 'Udveg';
  nature: 'Best' | 'Good' | 'Neutral' | 'Bad' | 'Worst';
  lord: string;
  startTime: string;
  endTime: string;
  isCurrent?: boolean;
}

export interface HoraSlot {
  hour: number;
  planet: string;
  sanskrit: string;
  nature: 'Auspicious' | 'Neutral' | 'Challenging';
  time: string;
  recommendedAction: string;
  isCurrent?: boolean;
}

export interface PanchangData {
  date: string;
  dayOfWeek: string;
  sanskritDay: string;
  city: string;
  latitude: string;
  longitude: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  samvat: {
    vikram: number;
    shaka: number;
    month: string;
    paksha: 'Shukla Paksha (Waxing)' | 'Krishna Paksha (Waning)';
    ayana: 'Uttarayan (Northern Path)' | 'Dakshinayan (Southern Path)';
    ritu: string;
  };
  tithi: {
    name: string;
    number: number;
    deity: string;
    endTime: string;
    nextTithi: string;
  };
  nakshatra: {
    name: string;
    lord: string;
    pada: number;
    deity: string;
    endTime: string;
    symbol: string;
  };
  yoga: {
    name: string;
    type: 'Auspicious' | 'Inauspicious' | 'Neutral';
    meaning: string;
    endTime: string;
  };
  karana: {
    name: string;
    type: 'Movable' | 'Fixed';
    deity: string;
    isBhadra: boolean;
    endTime: string;
  };
  sunSign: string;
  moonSign: string;
  muhurat: {
    abhijit: { start: string; end: string; status: 'Highly Auspicious' };
    brahma: { start: string; end: string; status: 'Spiritual Awakening' };
    godhuli: { start: string; end: string; status: 'Auspicious' };
    amritKaal: { start: string; end: string; status: 'Excellent for Rituals' };
    rahuKaal: { start: string; end: string; status: 'Strict Inauspicious' };
    yamaghanta: { start: string; end: string; status: 'Caution' };
    gulikaKaal: { start: string; end: string; status: 'Obstacle Prone' };
    durmuhurat: { start: string; end: string; status: 'Avoid New Initiatives' };
  };
  dayChoghadiya: ChoghadiyaSlot[];
  nightChoghadiya: ChoghadiyaSlot[];
  horaTable: HoraSlot[];
}

export function generatePanchangData(dateStr: string, cityName: string): PanchangData {
  const d = dateStr ? new Date(dateStr) : new Date();
  const dayIndex = d.getDay();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const sanskritDays = ['Ravivara (सूर्यवार)', 'Somavara (सोमवार)', 'Mangalavara (मंगलवार)', 'Budhavara (बुधवार)', 'Guruvara (गुरुवार)', 'Shukravara (शुक्रवार)', 'Shanivara (शनिवार)'];

  const daySeed = (d.getDate() * 17 + (d.getMonth() + 1) * 31 + d.getFullYear()) % 30;
  const tithiIndex = (daySeed % 15) + 1;
  const isShukla = daySeed < 15;

  const tithiNames = [
    'Pratipada (प्रतिपदा)', 'Dwitiya (द्वितीया)', 'Tritiya (तृतीया)', 'Chaturthi (चतुर्थी)', 
    'Panchami (पंचमी)', 'Shasthi (षष्ठी)', 'Saptami (सप्तमी)', 'Ashtami (अष्टमी)', 
    'Navami (नवमी)', 'Dashami (दशमी)', 'Ekadashi (एकादशी)', 'Dwadashi (द्वादशी)', 
    'Trayodashi (त्रयोदशी)', 'Chaturdashi (चतुर्दशी)', isShukla ? 'Purnima (पूर्णिमा - Full Moon)' : 'Amavasya (अमावस्या - New Moon)'
  ];

  const nakshatraObj = NAKSHATRAS[(daySeed * 2 + dayIndex) % 27];
  const yogas = [
    { name: 'Siddha (सिद्ध)', type: 'Auspicious' as const, meaning: 'Accomplishment of desired aims and prosperity.' },
    { name: 'Shubha (शुभ)', type: 'Auspicious' as const, meaning: 'Luminous health, grace, and spiritual elevation.' },
    { name: 'Vaidhriti (वैधृति)', type: 'Inauspicious' as const, meaning: 'Delay in physical manifestations; cultivate patience.' },
    { name: 'Harshana (हर्षण)', type: 'Auspicious' as const, meaning: 'Joy, celebration, family bliss, and artistic triumphs.' },
    { name: 'Vajra (वज्र)', type: 'Inauspicious' as const, meaning: 'Rigidity; avoid aggressive property negotiations.' },
    { name: 'Brahma (ब्रह्म)', type: 'Auspicious' as const, meaning: 'Divine intellectual acuity and mastery of sacred lore.' },
    { name: 'Indra (इन्द्र)', type: 'Auspicious' as const, meaning: 'Leadership authority, state recognition, and victory.' },
    { name: 'Vyatipata (व्यतीपात)', type: 'Inauspicious' as const, meaning: 'Adverse elemental turbulence; focus on quiet meditation.' },
    { name: 'Ayushman (आयुष्मान)', type: 'Auspicious' as const, meaning: 'Longevity, vitality, and healing of chronic ailments.' },
  ];
  const chosenYoga = yogas[(daySeed + dayIndex) % yogas.length];

  const karanas = [
    { name: 'Bava (बव)', type: 'Movable' as const, deity: 'Indra', isBhadra: false },
    { name: 'Balava (बालव)', type: 'Movable' as const, deity: 'Brahma', isBhadra: false },
    { name: 'Kaulava (कौलव)', type: 'Movable' as const, deity: 'Mitra', isBhadra: false },
    { name: 'Taitila (तैतिल)', type: 'Movable' as const, deity: 'Aryaman', isBhadra: false },
    { name: 'Gara (गर)', type: 'Movable' as const, deity: 'Bhumi', isBhadra: false },
    { name: 'Vanija (वणिज)', type: 'Movable' as const, deity: 'Lakshmi', isBhadra: false },
    { name: 'Vishti (विष्टि - भद्रा)', type: 'Movable' as const, deity: 'Yama', isBhadra: true },
    { name: 'Shakuni (शकुनि)', type: 'Fixed' as const, deity: 'Kali', isBhadra: false },
    { name: 'Chatushpada (चतुष्पाद)', type: 'Fixed' as const, deity: 'Pashupati', isBhadra: false },
  ];
  const chosenKarana = karanas[(daySeed + dayIndex * 2) % karanas.length];

  // Choghadiya Slots
  const choghadiyaOrderDay: Array<{ name: string; type: ChoghadiyaSlot['type']; nature: ChoghadiyaSlot['nature']; lord: string }> = [
    { name: 'Udveg (उद्वेग)', type: 'Udveg', nature: 'Bad', lord: 'Sun' },
    { name: 'Char (चर)', type: 'Char', nature: 'Neutral', lord: 'Venus' },
    { name: 'Labh (लाभ)', type: 'Labh', nature: 'Good', lord: 'Mercury' },
    { name: 'Amrit (अमृत)', type: 'Amrit', nature: 'Best', lord: 'Moon' },
    { name: 'Kaal (काल)', type: 'Kaal', nature: 'Worst', lord: 'Saturn' },
    { name: 'Shubh (शुभ)', type: 'Shubh', nature: 'Good', lord: 'Jupiter' },
    { name: 'Rog (रोग)', type: 'Rog', nature: 'Bad', lord: 'Mars' },
    { name: 'Udveg (उद्वेग)', type: 'Udveg', nature: 'Bad', lord: 'Sun' },
  ];

  const dayChoghadiya: ChoghadiyaSlot[] = [
    { ...choghadiyaOrderDay[(dayIndex * 2) % 7], startTime: '06:00 AM', endTime: '07:30 AM' },
    { ...choghadiyaOrderDay[(dayIndex * 2 + 1) % 7], startTime: '07:30 AM', endTime: '09:00 AM' },
    { ...choghadiyaOrderDay[(dayIndex * 2 + 2) % 7], startTime: '09:00 AM', endTime: '10:30 AM' },
    { ...choghadiyaOrderDay[(dayIndex * 2 + 3) % 7], startTime: '10:30 AM', endTime: '12:00 PM', isCurrent: true },
    { ...choghadiyaOrderDay[(dayIndex * 2 + 4) % 7], startTime: '12:00 PM', endTime: '01:30 PM' },
    { ...choghadiyaOrderDay[(dayIndex * 2 + 5) % 7], startTime: '01:30 PM', endTime: '03:00 PM' },
    { ...choghadiyaOrderDay[(dayIndex * 2 + 6) % 7], startTime: '03:00 PM', endTime: '04:30 PM' },
    { ...choghadiyaOrderDay[(dayIndex * 2) % 7], startTime: '04:30 PM', endTime: '06:00 PM' },
  ];

  const nightChoghadiya: ChoghadiyaSlot[] = [
    { ...choghadiyaOrderDay[(dayIndex * 2 + 3) % 7], startTime: '06:00 PM', endTime: '07:30 PM' },
    { ...choghadiyaOrderDay[(dayIndex * 2 + 4) % 7], startTime: '07:30 PM', endTime: '09:00 PM' },
    { ...choghadiyaOrderDay[(dayIndex * 2 + 5) % 7], startTime: '09:00 PM', endTime: '10:30 PM' },
    { ...choghadiyaOrderDay[(dayIndex * 2 + 6) % 7], startTime: '10:30 PM', endTime: '12:00 AM' },
    { ...choghadiyaOrderDay[(dayIndex * 2) % 7], startTime: '12:00 AM', endTime: '01:30 AM' },
    { ...choghadiyaOrderDay[(dayIndex * 2 + 1) % 7], startTime: '01:30 AM', endTime: '03:00 AM' },
    { ...choghadiyaOrderDay[(dayIndex * 2 + 2) % 7], startTime: '03:00 AM', endTime: '04:30 AM' },
    { ...choghadiyaOrderDay[(dayIndex * 2 + 3) % 7], startTime: '04:30 AM', endTime: '06:00 AM' },
  ];

  const horaPlanets = ['Sun (Surya)', 'Venus (Shukra)', 'Mercury (Budha)', 'Moon (Chandra)', 'Saturn (Shani)', 'Jupiter (Guru)', 'Mars (Mangal)'];
  const horaTable: HoraSlot[] = [];
  for (let h = 0; h < 12; h++) {
    const pIdx = (dayIndex * 3 + h) % 7;
    const pName = horaPlanets[pIdx];
    const nature: HoraSlot['nature'] = (pName.includes('Guru') || pName.includes('Shukra') || pName.includes('Budha') || pName.includes('Chandra')) ? 'Auspicious' : (pName.includes('Surya') ? 'Neutral' : 'Challenging');
    const hour12 = (6 + h) > 12 ? `${(6 + h) - 12}:00 PM` : `${6 + h}:00 AM`;
    const nextHour12 = (7 + h) > 12 ? `${(7 + h) - 12}:00 PM` : `${7 + h}:00 AM`;

    horaTable.push({
      hour: h + 1,
      planet: pName,
      sanskrit: pName.split('(')[1]?.replace(')', '') || pName,
      nature,
      time: `${hour12} - ${nextHour12}`,
      recommendedAction: pName.includes('Guru') ? 'Spiritual learning, large financial contracts, higher counseling' : (pName.includes('Shukra') ? 'Artistic creation, luxury purchase, romantic alliances' : (pName.includes('Budha') ? 'Trading, writing, coding, scientific analytics' : (pName.includes('Surya') ? 'Executive meetings, government liaisons, leadership' : (pName.includes('Chandra') ? 'Public outreach, travel, emotional harmony' : (pName.includes('Mangal') ? 'Physical fitness, surgery, property deeds, sports' : 'Discipline, grounding, long-term construction'))))),
      isCurrent: h === 4,
    });
  }

  // City-specific Solar coordinates
  const cityLatLong: Record<string, { lat: string; long: string }> = {
    'Varanasi, India': { lat: '25.3176° N', long: '82.9739° E' },
    'New Delhi, India': { lat: '28.6139° N', long: '77.2090° E' },
    'Mumbai, India': { lat: '19.0760° N', long: '72.8777° E' },
    'Bengaluru, India': { lat: '12.9716° N', long: '77.5946° E' },
    'London, UK': { lat: '51.5074° N', long: '0.1278° W' },
    'New York, USA': { lat: '40.7128° N', long: '74.0060° W' },
  };

  const coords = cityLatLong[cityName] || { lat: '25.3176° N', long: '82.9739° E' };

  return {
    date: d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    dayOfWeek: days[dayIndex],
    sanskritDay: sanskritDays[dayIndex],
    city: cityName || 'Varanasi, India',
    latitude: coords.lat,
    longitude: coords.long,
    sunrise: '05:48 AM',
    sunset: '06:34 PM',
    moonrise: isShukla ? '08:14 AM' : '09:45 PM',
    moonset: isShukla ? '09:22 PM' : '10:10 AM',
    samvat: {
      vikram: 2083,
      shaka: 1948,
      month: 'Shravana / Bhadrapada',
      paksha: isShukla ? 'Shukla Paksha (Waxing)' : 'Krishna Paksha (Waning)',
      ayana: d.getMonth() < 6 ? 'Uttarayan (Northern Path)' : 'Dakshinayan (Southern Path)',
      ritu: 'Varsha (Monsoon / Rain)',
    },
    tithi: {
      name: tithiNames[tithiIndex - 1],
      number: tithiIndex,
      deity: 'Agni & Vishvedevas',
      endTime: '04:22 PM (Tomorrow)',
      nextTithi: tithiNames[tithiIndex % 15],
    },
    nakshatra: {
      name: nakshatraObj.name,
      lord: nakshatraObj.lord,
      pada: ((daySeed % 4) + 1),
      deity: nakshatraObj.deity,
      endTime: '08:45 PM',
      symbol: 'Celestial Archer / Lotus',
    },
    yoga: {
      name: chosenYoga.name,
      type: chosenYoga.type,
      meaning: chosenYoga.meaning,
      endTime: '11:15 AM',
    },
    karana: {
      name: chosenKarana.name,
      type: chosenKarana.type,
      deity: chosenKarana.deity,
      isBhadra: chosenKarana.isBhadra,
      endTime: '05:10 PM',
    },
    sunSign: 'Leo (Simha Rashi)',
    moonSign: nakshatraObj.rashi.split('/')[0].trim(),
    muhurat: {
      abhijit: { start: '11:48 AM', end: '12:38 PM', status: 'Highly Auspicious' },
      brahma: { start: '04:12 AM', end: '05:00 AM', status: 'Spiritual Awakening' },
      godhuli: { start: '06:22 PM', end: '06:46 PM', status: 'Auspicious' },
      amritKaal: { start: '02:15 PM', end: '03:52 PM', status: 'Excellent for Rituals' },
      rahuKaal: { 
        start: ['04:30 PM', '07:30 AM', '03:00 PM', '12:00 PM', '01:30 PM', '10:30 AM', '09:00 AM'][dayIndex], 
        end: ['06:00 PM', '09:00 AM', '04:30 PM', '01:30 PM', '03:00 PM', '12:00 PM', '10:30 AM'][dayIndex], 
        status: 'Strict Inauspicious' 
      },
      yamaghanta: { start: '10:30 AM', end: '12:00 PM', status: 'Caution' },
      gulikaKaal: { start: '01:30 PM', end: '03:00 PM', status: 'Obstacle Prone' },
      durmuhurat: { start: '08:24 AM', end: '09:14 AM', status: 'Avoid New Initiatives' },
    },
    dayChoghadiya,
    nightChoghadiya,
    horaTable,
  };
}

// ============================================================================
// 2. LAL KITAB & 9 PLANETARY DEBTS (RINN) ENGINE
// ============================================================================

export interface LalKitabDebt {
  id: string;
  name: string;
  sanskrit: string;
  planet: string;
  cause: string;
  indications: string[];
  remedy: string;
  isDetected: boolean;
  severity: 'Active Debt' | 'Latent / Minor' | 'Cleared';
}

export interface LalKitabHouseInfo {
  house: number;
  pakkaGharLord: string;
  kismatLord: string;
  soyaGhar: boolean;
  planets: string[];
  status: string;
}

export interface LalKitabData {
  userName: string;
  birthDate: string;
  pakkaHouses: LalKitabHouseInfo[];
  debts: LalKitabDebt[];
  kayamPlanets: string[];
  soyePlanets: string[];
  varshphalRemedies: Array<{
    age: number;
    year: string;
    focusPlanet: string;
    prediction: string;
    upaya: string;
  }>;
  goldenRules: string[];
}

export function generateLalKitabData(
  name: string,
  birthDate: string,
  birthTime: string,
  birthCity: string
): LalKitabData {
  const seed = (name.length * 7 + (birthDate ? new Date(birthDate).getDate() : 14)) % 10;

  const pakkaLords = [
    'Sun (Surya)',
    'Jupiter (Guru)',
    'Mars (Mangal)',
    'Moon (Chandra)',
    'Jupiter (Guru)',
    'Mercury & Ketu',
    'Venus & Mercury',
    'Mars & Saturn',
    'Jupiter (Guru)',
    'Saturn (Shani)',
    'Jupiter (Guru)',
    'Jupiter & Rahu',
  ];

  const pakkaHouses: LalKitabHouseInfo[] = pakkaLords.map((lord, idx) => {
    const h = idx + 1;
    const isSoya = (h === 6 || h === 8 || h === 12) && seed > 4;
    return {
      house: h,
      pakkaGharLord: lord,
      kismatLord: ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu', 'Saturn', 'Jupiter', 'Rahu'][idx],
      soyaGhar: isSoya,
      planets: h === 1 ? ['Sun', 'Mercury'] : (h === 4 ? ['Moon'] : (h === 7 ? ['Venus'] : (h === 9 ? ['Jupiter'] : (h === 10 ? ['Saturn'] : [])))),
      status: isSoya ? 'Soya Hua Ghar (Sleeping House)' : 'Kayam / Jagrit (Active House)',
    };
  });

  const allDebts: LalKitabDebt[] = [
    {
      id: 'rin-1',
      name: 'Pitru Rin (Father’s Karmic Debt)',
      sanskrit: 'पितृ ऋण',
      planet: 'Jupiter (Guru) / Sun (Surya)',
      cause: 'Ancestral dishonoring of temple priests, destroying peepal trees, or neglect of family traditions.',
      indications: [
        'Sudden hair loss at the crown (shikha) or graying early in life.',
        'Loss of inherited gold, jewelry, or family honor without apparent cause.',
        'Obstacles in career elevation despite high intellectual competence.',
      ],
      remedy: 'Collect equal amounts of unrefined yellow gram pulse (chana dal) from all blood relatives and donate to an ancient temple on Thursday.',
      isDetected: seed % 3 === 0,
      severity: 'Active Debt',
    },
    {
      id: 'rin-2',
      name: 'Matru Rin (Mother’s Karmic Debt)',
      sanskrit: 'मातृ ऋण',
      planet: 'Moon (Chandra)',
      cause: 'Cruelty to cows, disrespecting mother, polluting drinking water reservoirs, or causing agony to lactating animals in past lineages.',
      indications: [
        'Chronic mental anxiety, insomnia, or emotional instability.',
        'Loss of liquid cash and family silver articles.',
        'Recurring disputes during house construction.',
      ],
      remedy: 'Collect silver coins from all maternal relations and immerse them together in a holy running river with pure devotion.',
      isDetected: seed % 4 === 0,
      severity: 'Active Debt',
    },
    {
      id: 'rin-3',
      name: 'Stri Rin (Wife / Female Ancestor Debt)',
      sanskrit: 'स्त्री ऋण',
      planet: 'Venus (Shukra)',
      cause: 'Harassment or deceit towards spouse, dowry agony, or abandoning pregnant women in previous genealogical lines.',
      indications: [
        'Marital discord, delay in progeny, or sudden loss of luxury assets.',
        'Skin sensitivities and recurring throat ailments.',
      ],
      remedy: 'Feed 100 cows with fresh green fodder and donate unadulterated pure clarified butter (Ghee) to destitute women.',
      isDetected: seed % 2 === 0,
      severity: 'Active Debt',
    },
    {
      id: 'rin-4',
      name: 'Sva Rin (Self Debt / Atma Rin)',
      sanskrit: 'स्व ऋण',
      planet: 'Venus (Shukra) / Rahu',
      cause: 'Atheism, violating sacred vows, or living solely for sensory indulgence while forsaking spiritual duties.',
      indications: [
        'Sudden defamation, false allegations from superiors, and heart burn.',
        'Frequent mechanical breakdowns of vehicles.',
      ],
      remedy: 'Perform Surya Yajna and offer unrefined red jaggery and wheat to red monkeys on Tuesday mornings.',
      isDetected: false,
      severity: 'Latent / Minor',
    },
    {
      id: 'rin-5',
      name: 'Rishtedari Rin (Relative / Sibling Debt)',
      sanskrit: 'रिश्तेदारी ऋण',
      planet: 'Mercury (Budha) / Mars (Mangal)',
      cause: 'Cheating brothers or cousins of legitimate land share, destroying green agricultural fields.',
      indications: [
        'Speech stuttering, dental decay, and sour relations with maternal uncle (Mama).',
        'Loss of trading licenses and delayed commercial payouts.',
      ],
      remedy: 'Donate whole green moong dal in a bronze utensil to eunuchs or young unmarried girls on Wednesday.',
      isDetected: seed % 5 === 0,
      severity: 'Active Debt',
    },
    {
      id: 'rin-6',
      name: 'Zalimana Rin (Cruelty / Oppression Debt)',
      sanskrit: 'जालिमाना ऋण',
      planet: 'Saturn (Shani)',
      cause: 'Tormenting laborers, acquiring land through coercion, or harming harmless street animals.',
      indications: [
        'Chronic joint pain, sciatica, premature aging, and legal disputes with domestic help.',
        'Sudden fire accidents or electrical short-circuits at home.',
      ],
      remedy: 'Feed 100 street dogs with sweetened whole wheat rotis smeared with mustard oil for 43 consecutive days.',
      isDetected: seed > 5,
      severity: 'Active Debt',
    },
    {
      id: 'rin-7',
      name: 'Anjanme Rin (Unborn Child / God Debt)',
      sanskrit: 'अजन्मे ऋण',
      planet: 'Sun (Surya) / Ketu',
      cause: 'Terminating unborn life, betraying spiritual gurus, or insulting holy ascetic wanderers.',
      indications: [
        'Difficulty in childbirth, urinary tract issues, and recurring nightmares.',
        'Spontaneous decay of the main entrance door of the residence.',
      ],
      remedy: 'Offer a two-colored blanket (black & white) to a true renunciate (Sadhu) or place it in a Bhairav temple.',
      isDetected: false,
      severity: 'Cleared',
    },
  ];

  const currentYear = new Date().getFullYear();
  const birthYr = birthDate ? new Date(birthDate).getFullYear() : 1996;
  const currentAge = currentYear - birthYr;

  const varshphalRemedies = [
    {
      age: currentAge,
      year: `${currentYear}`,
      focusPlanet: 'Jupiter (Guru) in 9th Lal Kitab House',
      prediction: 'Year of spiritual expansion, higher fortune, and scholarly breakthroughs. Golden opportunities through overseas mentorship.',
      upaya: 'Apply pure saffron (Kesar) tilak on the forehead and navel every morning after bath.',
    },
    {
      age: currentAge + 1,
      year: `${currentYear + 1}`,
      focusPlanet: 'Saturn (Shani) in 10th Lal Kitab House',
      prediction: 'Significant surge in professional authority and real-estate investments. Requires diligent ethics with subordinates.',
      upaya: 'Donate dark umbrellas or leather footwear to elderly laborers on Saturdays.',
    },
    {
      age: currentAge + 2,
      year: `${currentYear + 2}`,
      focusPlanet: 'Venus (Shukra) in 11th Lal Kitab House',
      prediction: 'Extraordinary influx of liquid wealth, artistic recognition, and luxurious acquisitions. Harmonious family celebrations.',
      upaya: 'Feed white birds (doves/pigeons) with pearl millets (Bajra) and respect female mentors.',
    },
  ];

  return {
    userName: name || 'Seeker',
    birthDate: birthDate || '1996-07-14',
    pakkaHouses,
    debts: allDebts,
    kayamPlanets: ['Sun in House 1 (Kayam)', 'Jupiter in House 9 (Kayam)', 'Venus in House 7 (Kayam)'],
    soyePlanets: ['Saturn in House 10 (Soya Hua - Wake up via Shani Upaya)', 'Rahu in House 2 (Latent)'],
    varshphalRemedies,
    goldenRules: [
      '1. Never accept free gifts (Muft Ka Maal) from strangers; it transfers their malefic Rahu debt.',
      '2. Upayas must be performed during daylight between sunrise and sunset for maximum solar activation.',
      '3. Follow the 43-day continuity rule: If an Upaya is interrupted on day 20, restart from day 1.',
      '4. Keep the roof terrace (Chhat) impeccably clean and free of discarded scrap iron or broken furniture.',
      '5. Never keep hollow statues or dry dead plants inside the living sanctuary.',
    ],
  };
}

// ============================================================================
// 3. KP ASTROLOGY (KRISHNAMURTI PADDHATI) SYSTEM
// ============================================================================

export interface KPCuspInfo {
  cuspNumber: number;
  rashi: string;
  degree: string;
  signLord: string;
  starLord: string;
  subLord: string;
  subSubLord: string;
  significance: string;
}

export interface KPPlanetInfo {
  planet: string;
  sign: string;
  degree: string;
  starLord: string;
  subLord: string;
  subSubLord: string;
  signifiesHouses: number[];
  rulingLevel: 'Level A (Strongest)' | 'Level B' | 'Level C' | 'Level D';
}

export interface KPData {
  userName: string;
  ayanamsha: string;
  cusps: KPCuspInfo[];
  planets: KPPlanetInfo[];
  rulingPlanets: {
    lagnaStarLord: string;
    lagnaSignLord: string;
    moonStarLord: string;
    moonSignLord: string;
    dayLord: string;
  };
  fourFoldSignificators: Array<{
    house: number;
    levelA: string[];
    levelB: string[];
    levelC: string[];
    levelD: string[];
  }>;
}

export function generateKPData(
  name: string,
  birthDate: string,
  birthTime: string,
  birthCity: string
): KPData {
  const seed = (name.length * 13 + (birthDate ? new Date(birthDate).getDate() : 14)) % 12;

  const starLordsList = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
  const planetsList = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

  const cusps: KPCuspInfo[] = [
    { cuspNumber: 1, rashi: 'Gemini (Mithuna)', degree: '14° 22\' 48"', signLord: 'Mercury', starLord: 'Rahu (Ardra)', subLord: 'Venus', subSubLord: 'Jupiter', significance: 'Physical Constitution, Persona, Longevity' },
    { cuspNumber: 2, rashi: 'Cancer (Karka)', degree: '08° 15\' 12"', signLord: 'Moon', starLord: 'Saturn (Pushya)', subLord: 'Jupiter', subSubLord: 'Mercury', significance: 'Accumulated Wealth, Speech, Family Assets' },
    { cuspNumber: 3, rashi: 'Leo (Simha)', degree: '04° 40\' 30"', signLord: 'Sun', starLord: 'Ketu (Magha)', subLord: 'Moon', subSubLord: 'Venus', significance: 'Courage, Younger Siblings, Short Travel, Writing' },
    { cuspNumber: 4, rashi: 'Virgo (Kanya)', degree: '06° 18\' 55"', signLord: 'Mercury', starLord: 'Sun (U. Phalguni)', subLord: 'Mercury', subSubLord: 'Saturn', significance: 'Mother, Real Estate, Domestic Happiness, Vehicles' },
    { cuspNumber: 5, rashi: 'Libra (Tula)', degree: '12° 50\' 10"', signLord: 'Venus', starLord: 'Rahu (Swati)', subLord: 'Mars', subSubLord: 'Venus', significance: 'Intellect, Romance, Progeny, Speculation, Mantras' },
    { cuspNumber: 6, rashi: 'Scorpio (Vrischika)', degree: '18° 34\' 22"', signLord: 'Mars', starLord: 'Mercury (Jyeshtha)', subLord: 'Rahu', subSubLord: 'Jupiter', significance: 'Competitive Victory, Service, Debts, Disease' },
    { cuspNumber: 7, rashi: 'Sagittarius (Dhanu)', degree: '14° 22\' 48"', signLord: 'Jupiter', starLord: 'Venus (P. Ashadha)', subLord: 'Saturn', subSubLord: 'Sun', significance: 'Marriage Partner, Business Alliances, Public Trade' },
    { cuspNumber: 8, rashi: 'Capricorn (Makara)', degree: '08° 15\' 12"', signLord: 'Saturn', starLord: 'Sun (U. Ashadha)', subLord: 'Venus', subSubLord: 'Moon', significance: 'Occult Sciences, Inheritance, Sudden Windfalls' },
    { cuspNumber: 9, rashi: 'Aquarius (Kumbha)', degree: '04° 40\' 30"', signLord: 'Saturn', starLord: 'Mars (Dhanishta)', subLord: 'Jupiter', subSubLord: 'Mercury', significance: 'Higher Wisdom, Guru Grace, Long Journeys, Dharma' },
    { cuspNumber: 10, rashi: 'Pisces (Meena)', degree: '06° 18\' 55"', signLord: 'Jupiter', starLord: 'Saturn (U. Bhadra)', subLord: 'Mercury', subSubLord: 'Venus', significance: 'Career Zenith, Fame, Status, Government Honor' },
    { cuspNumber: 11, rashi: 'Aries (Mesha)', degree: '12° 50\' 10"', signLord: 'Mars', starLord: 'Ketu (Ashwini)', subLord: 'Sun', subSubLord: 'Mars', significance: 'Fulfillment of Desires, Large Networks, Profits' },
    { cuspNumber: 12, rashi: 'Taurus (Vrishabha)', degree: '18° 34\' 22"', signLord: 'Venus', starLord: 'Moon (Rohini)', subLord: 'Saturn', subSubLord: 'Rahu', significance: 'Foreign Relocation, Moksha, Solitude, Investments' },
  ];

  const kpPlanets: KPPlanetInfo[] = [
    { planet: 'Sun', sign: 'Gemini', degree: '28° 14\'', starLord: 'Jupiter (Punarvasu)', subLord: 'Venus', subSubLord: 'Saturn', signifiesHouses: [1, 3, 10], rulingLevel: 'Level A (Strongest)' },
    { planet: 'Moon', sign: 'Taurus', degree: '16° 42\'', starLord: 'Moon (Rohini)', subLord: 'Saturn', subSubLord: 'Jupiter', signifiesHouses: [2, 4, 11], rulingLevel: 'Level A (Strongest)' },
    { planet: 'Mars', sign: 'Leo', degree: '09° 05\'', starLord: 'Ketu (Magha)', subLord: 'Jupiter', subSubLord: 'Mercury', signifiesHouses: [3, 6, 11], rulingLevel: 'Level B' },
    { planet: 'Mercury', sign: 'Gemini', degree: '22° 18\'', starLord: 'Jupiter (Punarvasu)', subLord: 'Saturn', subSubLord: 'Venus', signifiesHouses: [1, 4, 10], rulingLevel: 'Level A (Strongest)' },
    { planet: 'Jupiter', sign: 'Sagittarius', degree: '19° 50\'', starLord: 'Venus (P. Ashadha)', subLord: 'Rahu', subSubLord: 'Sun', signifiesHouses: [7, 9, 10], rulingLevel: 'Level A (Strongest)' },
    { planet: 'Venus', sign: 'Cancer', degree: '04° 30\'', starLord: 'Saturn (Pushya)', subLord: 'Saturn', subSubLord: 'Moon', signifiesHouses: [5, 7, 12], rulingLevel: 'Level B' },
    { planet: 'Saturn', sign: 'Aquarius', degree: '14° 10\'', starLord: 'Rahu (Shatabhisha)', subLord: 'Jupiter', subSubLord: 'Venus', signifiesHouses: [8, 9, 10], rulingLevel: 'Level C' },
    { planet: 'Rahu', sign: 'Pisces', degree: '11° 25\'', starLord: 'Saturn (U. Bhadra)', subLord: 'Moon', subSubLord: 'Mercury', signifiesHouses: [10, 11], rulingLevel: 'Level B' },
    { planet: 'Ketu', sign: 'Virgo', degree: '11° 25\'', starLord: 'Moon (Hasta)', subLord: 'Mars', subSubLord: 'Jupiter', signifiesHouses: [4, 5], rulingLevel: 'Level B' },
  ];

  const fourFoldSignificators = [
    { house: 1, levelA: ['Sun', 'Mercury'], levelB: ['Rahu'], levelC: ['Venus'], levelD: ['Mercury'] },
    { house: 2, levelA: ['Moon'], levelB: ['Jupiter'], levelC: ['Mars'], levelD: ['Moon'] },
    { house: 6, levelA: ['Mars'], levelB: ['Saturn'], levelC: ['Rahu'], levelD: ['Mars'] },
    { house: 7, levelA: ['Jupiter', 'Venus'], levelB: ['Sun'], levelC: ['Mercury'], levelD: ['Jupiter'] },
    { house: 10, levelA: ['Sun', 'Mercury', 'Jupiter'], levelB: ['Saturn', 'Rahu'], levelC: ['Ketu'], levelD: ['Jupiter'] },
    { house: 11, levelA: ['Moon', 'Mars'], levelB: ['Rahu'], levelC: ['Venus'], levelD: ['Mars'] },
  ];

  return {
    userName: name || 'Seeker',
    ayanamsha: 'KP New (Krishnamurti) 24° 07\' 44"',
    cusps,
    planets: kpPlanets,
    rulingPlanets: {
      lagnaStarLord: 'Rahu (Ardra)',
      lagnaSignLord: 'Mercury (Gemini)',
      moonStarLord: 'Moon (Rohini)',
      moonSignLord: 'Venus (Taurus)',
      dayLord: ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'][new Date().getDay()],
    },
    fourFoldSignificators,
  };
}

export function generateKPPrashna(horaryNumber: number, queryType: string) {
  const num = Math.max(1, Math.min(249, horaryNumber || 1));
  const subLords = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
  const assignedSub = subLords[(num * 7) % 9];
  const assignedStar = subLords[(num * 3) % 9];

  const isFavorable = num % 2 === 1 || num % 7 === 0 || assignedSub === 'Jupiter' || assignedSub === 'Venus' || assignedSub === 'Mercury';

  const analysisMap: Record<string, { primaryHouse: number; supporting: number[]; verdict: string }> = {
    'job': {
      primaryHouse: 10,
      supporting: [2, 6, 11],
      verdict: isFavorable 
        ? 'Sub-Lord connects favorably with Houses 2, 6, and 10. High probability of career promotion or job offer within the next solar transit.'
        : 'Sub-Lord establishes link with House 8 and 12. Delays anticipated; strengthen documentation and cultivate patience for 45 days.',
    },
    'marriage': {
      primaryHouse: 7,
      supporting: [2, 7, 11],
      verdict: isFavorable
        ? 'Sub-Lord signifies Houses 2, 7, and 11 strongly. Highly auspicious alliance with fruitful family harmony.'
        : 'Sub-Lord reflects involvement of House 6 and 10 (separation/delay). Recommended to review compatibility thoroughly before final commitment.',
    },
    'business': {
      primaryHouse: 10,
      supporting: [2, 7, 11],
      verdict: isFavorable
        ? 'Sub-Lord resonates with House 11 (Massive Gains) and House 7 (Trade). Venture will yield lucrative expansion.'
        : 'Cautious investment advised; ensure legal clauses are reviewed by independent counsel.',
    },
    'property': {
      primaryHouse: 4,
      supporting: [4, 11, 12],
      verdict: isFavorable
        ? 'Strong resonance with 4th Cusp Sub-Lord. Clear title deeds and appreciation in real-estate value assured.'
        : 'Verification of municipal sanctions and soil fertility needed before disbursement of capital.',
    },
  };

  const defaultAnalysis = analysisMap[queryType.toLowerCase()] || analysisMap['job'];

  return {
    horaryNumber: num,
    queryType,
    subLord: assignedSub,
    starLord: assignedStar,
    isFavorable,
    primaryHouse: defaultAnalysis.primaryHouse,
    supportingHouses: defaultAnalysis.supporting,
    verdict: defaultAnalysis.verdict,
    timingOfEvent: isFavorable ? 'Expected Manifestation: 14 to 45 Days (When Moon transits Ruling Planet Stars)' : 'Event Manifestation: Deferred until next major Dasha shift',
  };
}

// ============================================================================
// 4. DAILY RASHIFAL (12 ZODIAC SIGNS) & TAROT DATA
// ============================================================================

export interface DailyRashiHoroscope {
  signName: string;
  sanskrit: string;
  element: string;
  rulingPlanet: string;
  rating: number; // 1 to 5
  careerOverview: string;
  loveOverview: string;
  healthOverview: string;
  financeOverview: string;
  luckyNumber: number;
  luckyColor: string;
  luckyTime: string;
  auspiciousDirection: string;
  mantra: string;
}

export function generateDailyRashifal(): DailyRashiHoroscope[] {
  return [
    {
      signName: 'Aries',
      sanskrit: 'मेष (Mesha)',
      element: 'Fire (Agni)',
      rulingPlanet: 'Mars (Mangal)',
      rating: 4.5,
      careerOverview: 'Dynamic energy empowers you to pioneer breakthrough projects. Superior authorities acknowledge your unyielding initiative.',
      loveOverview: 'Spontaneous warmth and magnetic charm deepen emotional bonds. Single Aries may encounter an intriguing connection during travel.',
      healthOverview: 'High physical stamina; avoid over-exhaustion during late night sprints. Hydrate with electrolyte-infused water.',
      financeOverview: 'Promising returns on past speculative ventures. Prudent time to consolidate liquid funds.',
      luckyNumber: 9,
      luckyColor: 'Crimson Red & Coral',
      luckyTime: '08:15 AM - 10:30 AM',
      auspiciousDirection: 'East',
      mantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः',
    },
    {
      signName: 'Taurus',
      sanskrit: 'वृषभ (Vrishabha)',
      element: 'Earth (Prithvi)',
      rulingPlanet: 'Venus (Shukra)',
      rating: 4.8,
      careerOverview: 'Venus bestows sublime creative eloquence. Artistic presentations, design reviews, and high-value negotiations succeed effortlessly.',
      loveOverview: 'Harmonious domestic bliss; romantic dinner with spouse creates lasting warmth and mutual appreciation.',
      healthOverview: 'Soothe vocal cords and throat with warm honey-ginger infusion. Excellent day for gentle yoga.',
      financeOverview: 'Substantial inflow of wealth through creative contracts or luxury merchandising.',
      luckyNumber: 6,
      luckyColor: 'Pearl White & Silk Gold',
      luckyTime: '01:30 PM - 03:45 PM',
      auspiciousDirection: 'South-East',
      mantra: 'ॐ शुं शुक्राय नमः',
    },
    {
      signName: 'Gemini',
      sanskrit: 'मिथुन (Mithuna)',
      element: 'Air (Vayu)',
      rulingPlanet: 'Mercury (Budha)',
      rating: 4.6,
      careerOverview: 'Intellectual agility at peak performance. Coding sprints, research publications, and legal documentation flow with crystal clarity.',
      loveOverview: 'Engaging philosophical conversations bridge longstanding gaps. Mutual laughter restores effortless synergy.',
      healthOverview: 'Calm the restless nervous system with 10 minutes of Pranayama and screen detachment before sleep.',
      financeOverview: 'Lucrative opportunities in digital commerce, analytics consulting, and collaborative ventures.',
      luckyNumber: 5,
      luckyColor: 'Emerald Green & Mint',
      luckyTime: '10:00 AM - 12:15 PM',
      auspiciousDirection: 'North',
      mantra: 'ॐ बुं बुधाय नमः',
    },
    {
      signName: 'Cancer',
      sanskrit: 'कर्क (Karka)',
      element: 'Water (Jala)',
      rulingPlanet: 'Moon (Chandra)',
      rating: 4.2,
      careerOverview: 'Empathetic leadership transforms team morale. Trust your innate intuition when assessing ambiguous corporate proposals.',
      loveOverview: 'Deep emotional intimacy and soulful vulnerability bring unconditional reassurance into family life.',
      healthOverview: 'Ensure adequate rest and avoid heavy meals after twilight to maintain digestive lightness.',
      financeOverview: 'Stable financial baseline; ideal time to invest in residential property or family welfare funds.',
      luckyNumber: 2,
      luckyColor: 'Silver & Moonlit White',
      luckyTime: '06:30 PM - 08:30 PM',
      auspiciousDirection: 'North-West',
      mantra: 'ॐ सों सोमाय नमः',
    },
    {
      signName: 'Leo',
      sanskrit: 'सिंह (Simha)',
      element: 'Fire (Agni)',
      rulingPlanet: 'Sun (Surya)',
      rating: 5.0,
      careerOverview: 'Surya Dev illuminates your 10th solar house with magnificent prestige. Public acclaim and executive promotions gravitate to you.',
      loveOverview: 'Generous affection and regal chivalry win deep admiration. Joyful celebrations with close allies.',
      healthOverview: 'Radiant vitality and strong cardiovascular endurance. Channel your boundless energy into disciplined physical training.',
      financeOverview: 'Royal windfalls, government clearances, and monumental returns on long-term assets.',
      luckyNumber: 1,
      luckyColor: 'Radiant Gold & Saffron',
      luckyTime: '07:00 AM - 09:30 AM',
      auspiciousDirection: 'East',
      mantra: 'ॐ घृणि सूर्याय नमः',
    },
    {
      signName: 'Virgo',
      sanskrit: 'कन्या (Kanya)',
      element: 'Earth (Prithvi)',
      rulingPlanet: 'Mercury (Budha)',
      rating: 4.4,
      careerOverview: 'Meticulous attention to microscopic detail uncovers critical efficiencies. Audits and quantitative strategies yield mastery.',
      loveOverview: 'Acts of supportive service express your devotion more powerfully than grandiose declarations.',
      healthOverview: 'Focus on gut microbiome health with probiotic nutrients and mindful hydration.',
      financeOverview: 'Systematic budgeting and algorithmic investments yield steady, compounding returns.',
      luckyNumber: 5,
      luckyColor: 'Olive Green & Earth Ochre',
      luckyTime: '02:00 PM - 04:15 PM',
      auspiciousDirection: 'South',
      mantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः',
    },
    {
      signName: 'Libra',
      sanskrit: 'तुला (Tula)',
      element: 'Air (Vayu)',
      rulingPlanet: 'Venus (Shukra)',
      rating: 4.7,
      careerOverview: 'Diplomatic finesse resolves complex stakeholder standoffs. Perfect timing for forging cross-border strategic partnerships.',
      loveOverview: 'Sublime aesthetic harmony in relationships. Romantic proposals and shared cultural outings flourish.',
      healthOverview: 'Maintain renal balance by drinking pure spring water; practice balancing yoga postures (Vrikshasana).',
      financeOverview: 'Prosperous returns from luxury retail, creative copyright licenses, and joint venture syndicates.',
      luckyNumber: 6,
      luckyColor: 'Pastel Blue & Rose Gold',
      luckyTime: '11:30 AM - 01:45 PM',
      auspiciousDirection: 'West',
      mantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः',
    },
    {
      signName: 'Scorpio',
      sanskrit: 'वृश्चिक (Vrischika)',
      element: 'Water (Jala)',
      rulingPlanet: 'Mars & Ketu',
      rating: 4.3,
      careerOverview: 'Profound investigative acumen unravels concealed truths. Unstoppable determination to overcome institutional resistance.',
      loveOverview: 'Passionate intensity and transformative soul-bonding. Release old grievances to welcome total renewal.',
      healthOverview: 'Channel internal fire through intense physical training or martial arts; practice restorative meditation.',
      financeOverview: 'Unanticipated gains from ancestral inheritances, insurance claims, or tax write-offs.',
      luckyNumber: 9,
      luckyColor: 'Deep Maroon & Jet Black',
      luckyTime: '04:45 PM - 07:00 PM',
      auspiciousDirection: 'North',
      mantra: 'ॐ अं अंगारकाय नमः',
    },
    {
      signName: 'Sagittarius',
      sanskrit: 'धनु (Dhanu)',
      element: 'Fire (Agni)',
      rulingPlanet: 'Jupiter (Guru)',
      rating: 4.9,
      careerOverview: 'Guru’s blessings elevate your philosophical vision and international outreach. Academic seminars and foreign travel bear golden fruit.',
      loveOverview: 'Adventurous optimism revitalizes romance. Planning a pilgrimage or scenic exploration with your beloved.',
      healthOverview: 'Robust liver and arterial vitality; maintain regular brisk walks in nature to assimilate cosmic prana.',
      financeOverview: 'Exponential expansion of fortune through publishing, higher education consulting, and venture investments.',
      luckyNumber: 3,
      luckyColor: 'Canary Yellow & Amber',
      luckyTime: '09:00 AM - 11:30 AM',
      auspiciousDirection: 'North-East',
      mantra: 'ॐ बृं बृहस्पतये नमः',
    },
    {
      signName: 'Capricorn',
      sanskrit: 'मकर (Makara)',
      element: 'Earth (Prithvi)',
      rulingPlanet: 'Saturn (Shani)',
      rating: 4.5,
      careerOverview: 'Unwavering discipline constructs long-lasting monumental achievements. Industry titans acknowledge your relentless work ethic.',
      loveOverview: 'Loyalty and steadfast emotional commitment provide an impenetrable fortress for your family life.',
      healthOverview: 'Strengthen joints and skeletal alignment through calcium-rich nutrition and strength training.',
      financeOverview: 'Substantial long-term equity growth; real estate acquisitions and industrial dividends flourish.',
      luckyNumber: 8,
      luckyColor: 'Charcoal Navy & Steel Grey',
      luckyTime: '03:15 PM - 05:30 PM',
      auspiciousDirection: 'South',
      mantra: 'ॐ शं शनैश्चराय नमः',
    },
    {
      signName: 'Aquarius',
      sanskrit: 'कुम्भ (Kumbha)',
      element: 'Air (Vayu)',
      rulingPlanet: 'Saturn & Rahu',
      rating: 4.6,
      careerOverview: 'Visionary technological innovation and humanitarian leadership. Global networks rally around your futuristic blueprint.',
      loveOverview: 'Intellectual kinship forms the foundation of transcendent love. Celebrate uniqueness and mutual independence.',
      healthOverview: 'Support circulatory vitality with magnesium-rich foods and grounding bare-foot walks on earth.',
      financeOverview: 'Breakthrough crowdfunding, crypto-asset appreciation, and gains from cutting-edge intellectual property.',
      luckyNumber: 4,
      luckyColor: 'Electric Cyan & Deep Indigo',
      luckyTime: '05:00 PM - 07:15 PM',
      auspiciousDirection: 'West',
      mantra: 'ॐ प्रां प्रीं प्रौं सः शनये नमः',
    },
    {
      signName: 'Pisces',
      sanskrit: 'मीन (Meena)',
      element: 'Water (Jala)',
      rulingPlanet: 'Jupiter & Neptune',
      rating: 4.8,
      careerOverview: 'Divine creative channel opens with boundless inspiration. Spiritual counseling, filmmaking, music, and healing arts flourish.',
      loveOverview: 'Soulmate resonance and telepathic emotional connection. Transcendent peace permeates romantic relationships.',
      healthOverview: 'Immerse in restorative salt baths and gentle sound healing to cleanse the subtle auric sheath.',
      financeOverview: 'Karmic abundance flows through philanthropic initiatives and foreign royalties.',
      luckyNumber: 7,
      luckyColor: 'Seafoam Aquamarine & Lavender',
      luckyTime: '07:30 PM - 09:45 PM',
      auspiciousDirection: 'North-East',
      mantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः',
    },
  ];
}

// ==========================================
// 1. NUMEROLOGY ENGINE (ANK JYOTISH)
// ==========================================

export interface NumerologyReport {
  name: string;
  birthDate: string;
  mulank: number; // Driver / Root Number (1-9)
  bhagyank: number; // Destiny / Life Path Number (1-9)
  chaldeanNameNumber: number;
  chaldeanCompound: number;
  pythagoreanNameNumber: number;
  kuaNumber: number;
  personalYear2026: number;
  rulingPlanet: string;
  element: string;
  luckyNumbers: number[];
  unluckyNumbers: number[];
  luckyColors: string[];
  luckyDays: string[];
  luckyGemstone: string;
  personalityTraits: string[];
  careerSuggestions: string[];
  loveCompatibility: {
    best: number[];
    moderate: number[];
    challenging: number[];
  };
  loShuGrid: Record<number, number>;
  loShuPlanes: {
    name: string;
    sanskritName: string;
    numbers: number[];
    strength: number; // 0 to 100%
    meaning: string;
  }[];
  rajYogas: string[];
}

export const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

export const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

export function reduceToSingleDigit(num: number): number {
  while (num > 9) {
    num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return num || 1;
}

export function calculateNumerology(name: string, dobString: string, gender: 'male' | 'female' = 'male'): NumerologyReport {
  const cleanName = (name || 'Devotee').toUpperCase().replace(/[^A-Z]/g, '');
  const dobParts = dobString ? dobString.split('-') : ['1995', '08', '15'];
  const year = parseInt(dobParts[0] || '1995', 10);
  const month = parseInt(dobParts[1] || '8', 10);
  const day = parseInt(dobParts[2] || '15', 10);

  // 1. Mulank (Day of birth)
  const mulank = reduceToSingleDigit(day);

  // 2. Bhagyank (Full DOB sum)
  const totalDobSum = `${year}${month < 10 ? '0' + month : month}${day < 10 ? '0' + day : day}`
    .split('')
    .reduce((acc, d) => acc + parseInt(d, 10), 0);
  const bhagyank = reduceToSingleDigit(totalDobSum);

  // 3. Chaldean Name Number
  let chaldeanTotal = 0;
  for (let i = 0; i < cleanName.length; i++) {
    chaldeanTotal += CHALDEAN_MAP[cleanName[i]] || 1;
  }
  const chaldeanNameNumber = reduceToSingleDigit(chaldeanTotal);

  // 4. Pythagorean Name Number
  let pythTotal = 0;
  for (let i = 0; i < cleanName.length; i++) {
    pythTotal += PYTHAGOREAN_MAP[cleanName[i]] || 1;
  }
  const pythagoreanNameNumber = reduceToSingleDigit(pythTotal);

  // 5. Kua Number (Feng Shui / Vedic Astro-Numerology)
  const yearSum = reduceToSingleDigit(year);
  let kuaNumber = 1;
  if (gender === 'male') {
    kuaNumber = reduceToSingleDigit(10 - yearSum);
  } else {
    kuaNumber = reduceToSingleDigit(yearSum + 5);
  }
  if (kuaNumber === 5) kuaNumber = gender === 'male' ? 2 : 8;

  // 6. Personal Year 2026
  const currentYear = 2026;
  const personalYear2026 = reduceToSingleDigit(day + month + reduceToSingleDigit(currentYear));

  // 7. Lo Shu Grid computation
  const loShuGrid: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  const allDigits = `${day}${month}${year}${mulank}${bhagyank}`;
  for (const ch of allDigits) {
    const digit = parseInt(ch, 10);
    if (digit >= 1 && digit <= 9) {
      loShuGrid[digit] = (loShuGrid[digit] || 0) + 1;
    }
  }

  // Planes
  const loShuPlanes = [
    {
      name: 'Mental Plane',
      sanskritName: 'मानसिक तल (4-9-2)',
      numbers: [4, 9, 2],
      strength: Math.round((( (loShuGrid[4] ? 1 : 0) + (loShuGrid[9] ? 1 : 0) + (loShuGrid[2] ? 1 : 0) ) / 3) * 100),
      meaning: 'Intellect, sharp memory, strategic reasoning, and conceptual design.',
    },
    {
      name: 'Emotional / Spiritual Plane',
      sanskritName: 'भावनात्मक तल (3-5-7)',
      numbers: [3, 5, 7],
      strength: Math.round((( (loShuGrid[3] ? 1 : 0) + (loShuGrid[5] ? 1 : 0) + (loShuGrid[7] ? 1 : 0) ) / 3) * 100),
      meaning: 'Empathy, intuition, spiritual awakening, and magnetic charisma.',
    },
    {
      name: 'Practical / Action Plane',
      sanskritName: 'व्यावहारिक तल (8-1-6)',
      numbers: [8, 1, 6],
      strength: Math.round((( (loShuGrid[8] ? 1 : 0) + (loShuGrid[1] ? 1 : 0) + (loShuGrid[6] ? 1 : 0) ) / 3) * 100),
      meaning: 'Execution power, wealth generation, discipline, and business manifestation.',
    },
    {
      name: 'Thought / Vision Plane',
      sanskritName: 'विचार तल (4-3-8)',
      numbers: [4, 3, 8],
      strength: Math.round((( (loShuGrid[4] ? 1 : 0) + (loShuGrid[3] ? 1 : 0) + (loShuGrid[8] ? 1 : 0) ) / 3) * 100),
      meaning: 'Big-picture ideation, architectural foresight, and long-term planning.',
    },
    {
      name: 'Will / Determination Plane',
      sanskritName: 'इच्छाशक्ति तल (9-5-1)',
      numbers: [9, 5, 1],
      strength: Math.round((( (loShuGrid[9] ? 1 : 0) + (loShuGrid[5] ? 1 : 0) + (loShuGrid[1] ? 1 : 0) ) / 3) * 100),
      meaning: 'Indomitable willpower, perseverance, courage, and overcoming karmic hurdles.',
    },
    {
      name: 'Success / Physical Plane',
      sanskritName: 'कर्म सिद्धि तल (2-7-6)',
      numbers: [2, 7, 6],
      strength: Math.round((( (loShuGrid[2] ? 1 : 0) + (loShuGrid[7] ? 1 : 0) + (loShuGrid[6] ? 1 : 0) ) / 3) * 100),
      meaning: 'Physical stamina, aesthetic refinement, social networking, and luxury enjoyment.',
    },
  ];

  // Raj Yogas in Lo Shu
  const rajYogas: string[] = [];
  if (loShuGrid[4] && loShuGrid[5] && loShuGrid[6]) {
    rajYogas.push('Golden Raj Yoga (Suvarna Yoga 4-5-6): Supreme prosperity, property accumulation, and immense public honor.');
  }
  if (loShuGrid[2] && loShuGrid[5] && loShuGrid[8]) {
    rajYogas.push('Silver Raj Yoga (Rajat Yoga 2-5-8): Real estate success, emotional balance, and ancestral asset gains.');
  }
  if (loShuGrid[3] && loShuGrid[5] && loShuGrid[7]) {
    rajYogas.push('Spiritual Mystic Yoga (3-5-7): Healing hands, occult mastery, and deep divine intuition.');
  }
  if (loShuGrid[8] && loShuGrid[1] && loShuGrid[6]) {
    rajYogas.push('Business Mastery Yoga (8-1-6): Unstoppable enterprise builder and commercial triumph.');
  }
  if (rajYogas.length === 0) {
    rajYogas.push('Emerging Potential: Regular Gayatri mantra and wearing favorable gemstones activate your dormant planes.');
  }

  // Planet & Traits Map for Mulank
  const numberProfiles: Record<number, any> = {
    1: {
      planet: 'Sun (Surya)',
      element: 'Fire (Agni)',
      luckyNumbers: [1, 2, 3, 9],
      unluckyNumbers: [8],
      luckyColors: ['Gold', 'Orange', 'Ruby Red', 'Yellow'],
      luckyDays: ['Sunday', 'Monday'],
      luckyGemstone: 'Ruby (Manikya)',
      personality: ['Natural Leader', 'Authoritative', 'Ambitious', 'Visionary', 'Independent'],
      careers: ['Administration', 'Politics', 'Government Leadership', 'Entrepreneurship', 'Executive Management'],
      bestLove: [1, 2, 3, 5, 9],
      moderateLove: [4, 7],
      challengingLove: [6, 8]
    },
    2: {
      planet: 'Moon (Chandra)',
      element: 'Water (Jala)',
      luckyNumbers: [1, 2, 4, 7],
      unluckyNumbers: [8, 9],
      luckyColors: ['White', 'Cream', 'Silver', 'Light Green'],
      luckyDays: ['Monday', 'Sunday'],
      luckyGemstone: 'Natural Pearl (Moti)',
      personality: ['Empathetic', 'Intuitive', 'Diplomatic', 'Gentle', 'Artistic'],
      careers: ['Psychology', 'Fine Arts', 'Writing', 'Counseling', 'Hospitality', 'Public Relations'],
      bestLove: [1, 2, 7],
      moderateLove: [3, 4, 6],
      challengingLove: [8, 9]
    },
    3: {
      planet: 'Jupiter (Guru / Brihaspati)',
      element: 'Ether / Fire',
      luckyNumbers: [3, 1, 2, 9],
      unluckyNumbers: [6],
      luckyColors: ['Yellow', 'Saffron', 'Amber', 'Gold'],
      luckyDays: ['Thursday', 'Tuesday'],
      luckyGemstone: 'Yellow Sapphire (Pukhraj)',
      personality: ['Philosophical', 'Wise', 'Optimistic', 'Eloquent Speaker', 'Spiritual Guide'],
      careers: ['Teaching & Academia', 'Judiciary / Law', 'Publishing', 'Finance & Advisory', 'Astrology'],
      bestLove: [1, 3, 9],
      moderateLove: [2, 5, 7],
      challengingLove: [6]
    },
    4: {
      planet: 'Rahu (North Node)',
      element: 'Earth / Air',
      luckyNumbers: [4, 1, 6, 7],
      unluckyNumbers: [8, 9],
      luckyColors: ['Electric Blue', 'Grey', 'Brown', 'Khaki'],
      luckyDays: ['Sunday', 'Saturday'],
      luckyGemstone: 'Hessonite Garnet (Gomed)',
      personality: ['Revolutionary Thinker', 'Analytical', 'Unconventional', 'Tenacious', 'System Builder'],
      careers: ['Software Architecture', 'Data Science', 'Civil Engineering', 'Research & Invention', 'Media'],
      bestLove: [1, 4, 6, 7],
      moderateLove: [2, 5],
      challengingLove: [8, 9]
    },
    5: {
      planet: 'Mercury (Budh)',
      element: 'Earth / Mercury',
      luckyNumbers: [5, 1, 6],
      unluckyNumbers: [2],
      luckyColors: ['Emerald Green', 'Turquoise', 'Pastel Shades'],
      luckyDays: ['Wednesday', 'Friday'],
      luckyGemstone: 'Emerald (Panna)',
      personality: ['Versatile', 'Dynamic Communicator', 'Witty', 'Curious', 'Adaptable'],
      careers: ['Journalism', 'Trading & Stocks', 'Marketing', 'E-commerce', 'International Commerce', 'Media'],
      bestLove: [1, 5, 6],
      moderateLove: [3, 4, 7, 8],
      challengingLove: [2]
    },
    6: {
      planet: 'Venus (Shukra)',
      element: 'Water / Air',
      luckyNumbers: [6, 5, 8, 4],
      unluckyNumbers: [3],
      luckyColors: ['Diamond White', 'Pink', 'Light Blue', 'Silver'],
      luckyDays: ['Friday', 'Wednesday'],
      luckyGemstone: 'Diamond (Heera) or White Zircon',
      personality: ['Charming', 'Aesthetic Connoisseur', 'Loving', 'Harmonious', 'Creative Magnet'],
      careers: ['Fashion Design', 'Interior Architecture', 'Luxury Goods', 'Cinema & Music', 'Cosmetics', 'Gourmet Culinary'],
      bestLove: [6, 5, 8, 4],
      moderateLove: [1, 2, 7],
      challengingLove: [3]
    },
    7: {
      planet: 'Ketu (South Node)',
      element: 'Water / Ether',
      luckyNumbers: [7, 1, 2, 4],
      unluckyNumbers: [9],
      luckyColors: ['Light Green', 'White', 'Yellow', 'Multicolor'],
      luckyDays: ['Monday', 'Sunday'],
      luckyGemstone: 'Cat’s Eye (Lehsuniya)',
      personality: ['Mystic & Sage', 'Deep Researcher', 'Introspective', 'Intuitive Healer', 'Philosopher'],
      careers: ['Occult Sciences', 'Philosophy', 'Bio-medical Research', 'Cyber-Security', 'Yoga & Meditation'],
      bestLove: [1, 2, 7],
      moderateLove: [3, 4, 5, 6],
      challengingLove: [9]
    },
    8: {
      planet: 'Saturn (Shani)',
      element: 'Earth / Air',
      luckyNumbers: [8, 5, 6, 4],
      unluckyNumbers: [1, 2],
      luckyColors: ['Dark Navy Blue', 'Black', 'Steel Grey', 'Purple'],
      luckyDays: ['Saturday', 'Friday'],
      luckyGemstone: 'Blue Sapphire (Neelam) or Amethyst',
      personality: ['Disciplined', 'Enduring', 'Karmic Master', 'Unshakeable', 'Patient Strategist'],
      careers: ['Heavy Industry', 'Real Estate Development', 'Mining & Metallurgy', 'Law Enforcement', 'Structural Engineering'],
      bestLove: [5, 6, 8],
      moderateLove: [4, 7],
      challengingLove: [1, 2, 9]
    },
    9: {
      planet: 'Mars (Mangal)',
      element: 'Fire (Agni)',
      luckyNumbers: [9, 1, 2, 3],
      unluckyNumbers: [4, 7],
      luckyColors: ['Bright Red', 'Crimson', 'Coral', 'Rose'],
      luckyDays: ['Tuesday', 'Thursday'],
      luckyGemstone: 'Red Coral (Moonga)',
      personality: ['Courageous', 'Passionate Warrior', 'Dynamic Initiator', 'Protector', 'High Energy'],
      careers: ['Defense & Military', 'Surgery & Medicine', 'Sports', 'Property Ventures', 'Engineering & Technology'],
      bestLove: [1, 2, 3, 9],
      moderateLove: [5],
      challengingLove: [4, 7, 8]
    },
  };

  const profile = numberProfiles[mulank] || numberProfiles[1];

  return {
    name: name || 'Devotee',
    birthDate: dobString || '1995-08-15',
    mulank,
    bhagyank,
    chaldeanNameNumber,
    chaldeanCompound: chaldeanTotal,
    pythagoreanNameNumber,
    kuaNumber,
    personalYear2026,
    rulingPlanet: profile.planet,
    element: profile.element,
    luckyNumbers: profile.luckyNumbers,
    unluckyNumbers: profile.unluckyNumbers,
    luckyColors: profile.luckyColors,
    luckyDays: profile.luckyDays,
    luckyGemstone: profile.luckyGemstone,
    personalityTraits: profile.personality,
    careerSuggestions: profile.careers,
    loveCompatibility: {
      best: profile.bestLove,
      moderate: profile.moderateLove,
      challenging: profile.challengingLove,
    },
    loShuGrid,
    loShuPlanes,
    rajYogas,
  };
}

// ==========================================
// 2. VASTU SHASTRA ENGINE
// ==========================================

export interface VastuZoneInfo {
  code: string;
  name: string;
  sanskrit: string;
  direction: string;
  rulingDeity: string;
  rulingPlanet: string;
  element: string;
  idealRooms: string[];
  strictlyProhibited: string[];
  benefits: string;
  doshaSymptom: string;
  remedy: string;
  color: string;
}

export const VASTU_16_ZONES: VastuZoneInfo[] = [
  {
    code: 'NE',
    name: 'Ishanya (North-East)',
    sanskrit: 'ईशान कोण',
    direction: 'North-East (045°)',
    rulingDeity: 'Lord Shiva (Ishana)',
    rulingPlanet: 'Jupiter (Brihaspati)',
    element: 'Water (Jala)',
    idealRooms: ['Puja Room / Mandir', 'Meditation Corner', 'Underground Water Tank', 'Open Lawn'],
    strictlyProhibited: ['Toilet / Septic Tank', 'Kitchen (Agni)', 'Master Bedroom', 'Heavy Storage / Staircase'],
    benefits: 'Divine wisdom, clarity of thought, spiritual enlightenment, and overall family prosperity.',
    doshaSymptom: 'Headaches, mental confusion, neurological distress, and severe obstruction to children’s growth.',
    remedy: 'Place a crystal pyramid, copper swastika, and keep water filled in a brass bowl with fresh flowers.',
    color: '#38bdf8'
  },
  {
    code: 'E',
    name: 'Purva (East)',
    sanskrit: 'पूर्व दिशा',
    direction: 'East (090°)',
    rulingDeity: 'Lord Indra (Surya)',
    rulingPlanet: 'Sun (Surya)',
    element: 'Air / Fire',
    idealRooms: ['Main Entrance', 'Living Room', 'Study Hall', 'Verandah'],
    strictlyProhibited: ['Toilets', 'Heavy Dustbins', 'Clutter & Junk Storage'],
    benefits: 'Social recognition, administrative connections, high vitality, and career fame.',
    doshaSymptom: 'Loss of respect, government penalties, eye/heart ailments, and social isolation.',
    remedy: 'Hang a radiant Surya Yantra on the eastern wall and grow sacred Tulsi (Holy Basil) plant.',
    color: '#fbbf24'
  },
  {
    code: 'SE',
    name: 'Agneya (South-East)',
    sanskrit: 'आग्नेय कोण',
    direction: 'South-East (135°)',
    rulingDeity: 'Lord Agni Dev',
    rulingPlanet: 'Venus (Shukra)',
    element: 'Fire (Agni)',
    idealRooms: ['Kitchen (Cooktop facing East)', 'Electrical Panels / Inverters', 'Boiler Room'],
    strictlyProhibited: ['Underground Water Tank', 'Toilet', 'Main Entrance', 'Puja Room'],
    benefits: 'Dynamic cash liquidity, vibrant health of female members, and culinary abundance.',
    doshaSymptom: 'Cash crunch, disputes with female relatives, digestive disorders, and fire accidents.',
    remedy: 'Install a copper Agni Yantra, burn camphor daily, and paint the area in soft ivory or peach.',
    color: '#f97316'
  },
  {
    code: 'S',
    name: 'Dakshin (South)',
    sanskrit: 'दक्षिण दिशा',
    direction: 'South (180°)',
    rulingDeity: 'Lord Yama Dev',
    rulingPlanet: 'Mars (Mangal)',
    element: 'Fire / Earth',
    idealRooms: ['Master Bedroom', 'Heavy Storage', 'Staircase', 'Office Cabin'],
    strictlyProhibited: ['Underground Water Tanks', 'Main Entrance (unless calibrated)', 'Boring / Well'],
    benefits: 'Unshakable courage, legal victories, and protection against negative energies.',
    doshaSymptom: 'Restlessness, insomnia, legal battles, and blood pressure fluctuations.',
    remedy: 'Keep heavy brass artifacts and paint walls with warm terracotta or golden beige.',
    color: '#ef4444'
  },
  {
    code: 'SW',
    name: 'Nairutya (South-West)',
    sanskrit: 'नैऋत्य कोण',
    direction: 'South-West (225°)',
    rulingDeity: 'Nirutis / Pitrus (Ancestors)',
    rulingPlanet: 'Rahu (North Node)',
    element: 'Earth (Prithvi)',
    idealRooms: ['Master Bedroom (Head facing South)', 'Cash Locker / Safe', 'Heavy Wardrobes'],
    strictlyProhibited: ['Main Entrance', 'Toilet', 'Kitchen', 'Underground Water Borewell', 'Puja Room'],
    benefits: 'Supreme family stability, long marital harmony, financial retention, and leadership.',
    doshaSymptom: 'Divorce threats, chronic financial leakage, untimely deaths, and instability.',
    remedy: 'Place heavy earth pyramids, yellow jasper stones, and keep the south-west elevated and solid.',
    color: '#a855f7'
  },
  {
    code: 'W',
    name: 'Paschim (West)',
    sanskrit: 'पश्चिम दिशा',
    direction: 'West (270°)',
    rulingDeity: 'Lord Varuna Dev',
    rulingPlanet: 'Saturn (Shani)',
    element: 'Space / Metal',
    idealRooms: ['Children’s Bedroom', 'Study Room', 'Dining Area', 'Overhead Water Tank'],
    strictlyProhibited: ['Low Ground / Depressions', 'Underground Water Tanks'],
    benefits: 'Massive profitability, long-term commercial assets, and disciplined study habits.',
    doshaSymptom: 'Financial stagnation, delayed promotion, and bone/rheumatic aches.',
    remedy: 'Install a metal wind chime, Shani Yantra, and keep the zone clean and clutter-free.',
    color: '#6366f1'
  },
  {
    code: 'NW',
    name: 'Vayavya (North-West)',
    sanskrit: 'वायव्य कोण',
    direction: 'North-West (315°)',
    rulingDeity: 'Lord Vayu Dev',
    rulingPlanet: 'Moon (Chandra)',
    element: 'Air (Vayu)',
    idealRooms: ['Guest Bedroom', 'Unmarried Daughter’s Room', 'Finished Goods Warehouse', 'Garage'],
    strictlyProhibited: ['Master Bedroom of Family Head', 'Heavy Permanent Underground Safe'],
    benefits: 'Benefactor support, smooth international travels, fast inventory turnover, and helpful allies.',
    doshaSymptom: 'Restlessness, mental instability, litigation from neighbors, and stranded journeys.',
    remedy: 'Hang a silver moon talisman or crystal chandelier, and paint walls in pearlescent white.',
    color: '#e2e8f0'
  },
  {
    code: 'N',
    name: 'Uttar (North)',
    sanskrit: 'उत्तर दिशा',
    direction: 'North (360° / 000°)',
    rulingDeity: 'Lord Kuber (God of Wealth)',
    rulingPlanet: 'Mercury (Budh)',
    element: 'Water (Jala)',
    idealRooms: ['Living Room', 'Accounts / Finance Office', 'Cash Counter', 'Green Garden'],
    strictlyProhibited: ['Heavy Staircase', 'Toilet', 'Kitchen', 'Junk Storage'],
    benefits: 'Exponential growth of career opportunities, continuous inflow of wealth, and intellectual sharpness.',
    doshaSymptom: 'Blocked business promotions, communication breakdowns, and severe financial stagnation.',
    remedy: 'Install a consecrated Kuber Yantra or brass Kuber idol, and place a money plant in green pot.',
    color: '#10b981'
  },
  {
    code: 'CENTER',
    name: 'Brahmasthan (Central Zone)',
    sanskrit: 'ब्रह्मस्थान (नाभि क्षेत्र)',
    direction: 'Geometric Center of Building',
    rulingDeity: 'Lord Brahma (Creator)',
    rulingPlanet: 'Cosmic Soul (Paramatma)',
    element: 'Space (Akasha)',
    idealRooms: ['Open Courtyard / Atrium', 'Spacious Living Hall (Zero Columns)'],
    strictlyProhibited: ['Pillars / Heavy Load Columns', 'Toilets / Septic Tanks', 'Kitchen', 'Staircases'],
    benefits: 'Harmony across all dimensions, peace in the family, and abundance of cosmic vital prana.',
    doshaSymptom: 'Severe structural bankruptcy, emotional suffocation, and perpetual family friction.',
    remedy: 'Keep completely hollow, light-filled, clean, and place a brass Swastika on the floor center.',
    color: '#ffd700'
  },
];

// ==========================================
// 3. RAMCHARITMANAS CHAUPAI PRASHNAVALI
// ==========================================

export interface PrashnavaliAnswer {
  number: number;
  chaupai: string;
  sourceKand: string;
  meaningHindi: string;
  meaningEnglish: string;
  verdict: 'Auspicious Siddhi (कार्य सिद्ध होगा)' | 'Favorable With Patience (सफलता मिलेगी)' | 'Caution / Delay Expected (सावधानी रखें)';
  guidance: string;
}

export const RAMCHARITMANAS_CHAUPAIS: Record<number, PrashnavaliAnswer> = {
  1: {
    number: 1,
    chaupai: 'सुनु सिय सत्य असीस हमारी। पूजिहि मन कामना तुम्हारी॥',
    sourceKand: 'Bala Kanda (Gauri Pujan Prasang)',
    meaningHindi: 'हे सीता! हमारा आशीर्वाद सत्य है, तुम्हारी मन की अभिलाषा अवश्य पूर्ण होगी।',
    meaningEnglish: 'Listen Sita, our blessings are true. All the pure desires of your heart shall surely be fulfilled.',
    verdict: 'Auspicious Siddhi (कार्य सिद्ध होगा)',
    guidance: 'Param Shubh outcome. The work you have in mind will be accomplished smoothly with divine grace. Begin with full faith.',
  },
  2: {
    number: 2,
    chaupai: 'प्रबिसि नगर कीजे सब काजा। हृदयं राखि कोसलपुर राजा॥',
    sourceKand: 'Sundara Kanda (Hanumanji Lanka Pravesh)',
    meaningHindi: 'अयोध्या के राजा श्रीराम को हृदय में धारण करके नगर में प्रवेश करें और सभी कार्य सम्पन्न करें।',
    meaningEnglish: 'Enter upon your mission keeping the King of Ayodhya, Sri Rama, firmly in your heart; all tasks will succeed.',
    verdict: 'Auspicious Siddhi (कार्य सिद्ध होगा)',
    guidance: 'Immediate success and victory over obstacles. Keep pure intentions and proceed without fear.',
  },
  3: {
    number: 3,
    chaupai: 'उघरहिं बिमल बिलोचन ही के। मिटहिं दोष दुख भव रजनी के॥',
    sourceKand: 'Bala Kanda (Guru Vandana)',
    meaningHindi: 'हृदय के निर्मल नेत्र खुल जाते हैं और संसार रूपी रात्रि के समस्त दोष और दुःख मिट जाते हैं।',
    meaningEnglish: 'The pure spiritual inner eye opens, removing all ignorance, sorrows, and illusions of worldly darkness.',
    verdict: 'Favorable With Patience (सफलता मिलेगी)',
    guidance: 'Clarity and wisdom are coming. Consult an elder or Guru before making the final financial or emotional decision.',
  },
  4: {
    number: 4,
    chaupai: 'होइहि सोइ जो राम रचि राखा। को करि तर्क बढ़ावै साखा॥',
    sourceKand: 'Bala Kanda (Shiv Parvati Samvad)',
    meaningHindi: 'वही होगा जो श्रीराम ने रच रखा है, व्यर्थ तर्क-वितर्क करके चिंता बढ़ाने से क्या लाभ?',
    meaningEnglish: 'Whatever Sri Rama has destined will alone come to pass. Why multiply anxieties with futile mental arguments?',
    verdict: 'Favorable With Patience (सफलता मिलेगी)',
    guidance: 'Surrender anxious control to the Divine. The situation requires patience and moral faith; the outcome will be for your highest good.',
  },
  5: {
    number: 5,
    chaupai: 'गरल सुधा रिपु करहिं मिताई। गोपद सिंधु अनल सितलाई॥',
    sourceKand: 'Sundara Kanda (Lanka Prasang)',
    meaningHindi: 'विष अमृत बन जाता है, शत्रु मित्र बन जाते हैं, समुद्र गाय के खुर के समान छोटा हो जाता है और अग्नि शीतल हो जाती है।',
    meaningEnglish: 'Poison turns into nectar, adversaries turn into allies, the vast ocean shrinks like a calf hoof-print, and fire turns soothingly cool.',
    verdict: 'Auspicious Siddhi (कार्य सिद्ध होगा)',
    guidance: 'Adverse circumstances will transform miraculously into your favor. Expected financial or legal hurdles will dissolve.',
  },
  6: {
    number: 6,
    chaupai: 'बिधि बस सुजन कुसंगत परहीं। फनि मनि सम निज गुन अनुसरहीं॥',
    sourceKand: 'Bala Kanda (Satsang Mahima)',
    meaningHindi: 'दैववश सज्जन यदि कुसंगति में पड़ भी जाएं, तो भी सर्प की मणि के समान अपने श्रेष्ठ गुणों का ही पालन करते हैं।',
    meaningEnglish: 'Even if noble souls find themselves in challenging company by fate, like the gem on a cobra head, they retain their pure essence.',
    verdict: 'Caution / Delay Expected (सावधानी रखें)',
    guidance: 'Be cautious of deceptive partners or dubious proposals. Stay true to your integrity and avoid hasty shortcuts.',
  },
  7: {
    number: 7,
    chaupai: 'करम प्रधान बिस्व करि राखा। जो जस करइ सो तस फलु चाखा॥',
    sourceKand: 'Ayodhya Kanda',
    meaningHindi: 'ईश्वर ने इस संसार को कर्म प्रधान बनाया है, जो जैसा कर्म करता है उसे वैसा ही फल प्राप्त होता है।',
    meaningEnglish: 'God has structured this universe on the supreme law of Karma; as one sows truthful deeds, so shall one reap golden fruits.',
    verdict: 'Favorable With Patience (सफलता मिलेगी)',
    guidance: 'Your hard work and dedication will yield proportional rewards. Do not cut corners; put in sincere effort.',
  },
  8: {
    number: 8,
    chaupai: 'मुद मंगलमय संत समाजू। जिमि जग जंगम तीरथराजू॥',
    sourceKand: 'Bala Kanda',
    meaningHindi: 'संतों का समाज आनंद और कल्याण से परिपूर्ण है, जो जगत में चलता-फिरता तीर्थराज प्रयाग है।',
    meaningEnglish: 'The congregation of saints is filled with bliss and auspiciousness, like a living walking holy pilgrimage upon earth.',
    verdict: 'Auspicious Siddhi (कार्य सिद्ध होगा)',
    guidance: 'Seek the blessings of your spiritual mentor or family elders. Auspicious celebration or family reunion is indicated.',
  },
  9: {
    number: 9,
    chaupai: 'दैहिक दैविक भौतिक तापा। राम राज नहिं काहुहि ब्यापा॥',
    sourceKand: 'Uttara Kanda (Ram Rajya Mahima)',
    meaningHindi: 'श्रीराम के राज्य में किसी को भी दैहिक, दैविक अथवा भौतिक ताप (कष्ट) नहीं सताते।',
    meaningEnglish: 'In the divine kingdom of Sri Rama, no citizen ever suffered from physical, mental, or environmental afflictions.',
    verdict: 'Auspicious Siddhi (कार्य सिद्ध होगा)',
    guidance: 'Health, recovery, and long-term security are blessed. A major period of peace and spiritual healing is commencing.',
  },
};

// 15x15 Sacred Letter Grid Matrix for Prashnavali
export const PRASHNAVALI_GRID: string[][] = [
  ['सु', 'नु', 'सि', 'य', 'स', 'त्य', 'अ', 'सी', 'स', 'ह', 'मा', 'री', 'पू', 'जि', 'हि'],
  ['म', 'न', 'का', 'म', 'ना', 'तु', 'म्हा', 'री', 'प्र', 'बि', 'सि', 'न', 'ग', 'र', 'की'],
  ['जे', 'स', 'ब', 'का', 'जा', 'हृ', 'द', 'यं', 'रा', 'खि', 'को', 'स', 'ल', 'पु', 'र'],
  ['रा', 'जा', 'उ', 'घ', 'र', 'हिं', 'बि', 'म', 'ल', 'बि', 'लो', 'च', 'न', 'ही', 'के'],
  ['मि', 'ट', 'हिं', 'दो', 'ष', 'दु', 'ख', 'भ', 'व', 'र', 'ज', 'नी', 'के', 'हो', 'इ'],
  ['हि', 'सो', 'इ', 'जो', 'रा', 'म', 'र', 'चि', 'रा', 'खा', 'को', 'क', 'रि', 'त', 'र्क'],
  ['ब', 'ढ़ा', 'वै', 'सा', 'खा', 'ग', 'र', 'ल', 'सु', 'धा', 'रि', 'पु', 'क', 'र', 'हिं'],
  ['मि', 'ता', 'ई', 'गो', 'प', 'द', 'सिं', 'धु', 'अ', 'न', 'ल', 'सि', 'त', 'ला', 'ई'],
  ['बि', 'धि', 'ब', 'स', 'सु', 'ज', 'न', 'कु', 'सं', 'ग', 'त', 'प', 'र', 'हीं', 'फ'],
  ['नि', 'म', 'नि', 'स', 'म', 'नि', 'ज', 'गु', 'न', 'अ', 'नु', 'स', 'र', 'हीं', 'क'],
  ['र', 'म', 'प्र', 'धा', 'न', 'बि', 'स्व', 'क', 'रि', 'रा', 'खा', 'जो', 'ज', 'स', 'क'],
  ['र', 'इ', 'सो', 'त', 'स', 'फ', 'लु', 'चा', 'खा', 'मु', 'द', 'मं', 'ग', 'ल', 'म'],
  ['य', 'सं', 'त', 'स', 'मा', 'जू', 'जि', 'मि', 'ज', 'ग', 'जं', 'ग', 'म', 'ती', 'र'],
  ['थ', 'रा', 'जू', 'दै', 'हि', 'क', 'दै', 'वि', 'क', 'भौ', 'ति', 'क', 'ता', 'पा', 'रा'],
  ['म', 'रा', 'ज', 'न', 'हिं', 'का', 'हु', 'हि', 'ब्या', 'पा', 'क', 'ल्या', 'ण', 'म्', '॥']
];

// ==========================================
// 4. VEDIC BABY NAMES & NAAMKARAN ENGINE
// ==========================================

export interface BabyNameItem {
  name: string;
  hindiName: string;
  gender: 'Boy' | 'Girl' | 'Unisex';
  meaning: string;
  rashi: string;
  nakshatra: string;
  startingLetter: string;
  numerologyNumber: number;
}

export const NAKSHATRA_SYLLABLES: Record<string, { rashi: string; syllables: string[] }> = {
  'Ashwini': { rashi: 'Aries (Mesha)', syllables: ['Chu (चु)', 'Che (चे)', 'Cho (चो)', 'La (ला)'] },
  'Bharani': { rashi: 'Aries (Mesha)', syllables: ['Lee (ली)', 'Lu (लू)', 'Le (ले)', 'Lo (लो)'] },
  'Krittika': { rashi: 'Aries / Taurus', syllables: ['A (अ)', 'Ee (ई)', 'U (उ)', 'E (ए)'] },
  'Rohini': { rashi: 'Taurus (Vrishabha)', syllables: ['O (ओ)', 'Va (वा)', 'Vi (वी)', 'Vu (वू)'] },
  'Mrigashira': { rashi: 'Taurus / Gemini', syllables: ['Ve (वे)', 'Vo (वो)', 'Ka (का)', 'Kee (की)'] },
  'Ardra': { rashi: 'Gemini (Mithuna)', syllables: ['Ku (कु)', 'Gha (घ)', 'Ng (ङ)', 'Chha (छ)'] },
  'Punarvasu': { rashi: 'Gemini / Cancer', syllables: ['Ke (के)', 'Ko (को)', 'Ha (हा)', 'Hee (ही)'] },
  'Pushya': { rashi: 'Cancer (Karka)', syllables: ['Hu (हु)', 'He (हे)', 'Ho (हो)', 'Da (डा)'] },
  'Ashlesha': { rashi: 'Cancer (Karka)', syllables: ['Dee (डी)', 'Du (डू)', 'De (डे)', 'Do (डो)'] },
  'Magha': { rashi: 'Leo (Simha)', syllables: ['Ma (मा)', 'Mee (मी)', 'Mu (मू)', 'Me (मे)'] },
  'Purva Phalguni': { rashi: 'Leo (Simha)', syllables: ['Mo (मो)', 'Ta (टा)', 'Tee (टी)', 'Tu (टू)'] },
  'Uttara Phalguni': { rashi: 'Leo / Virgo', syllables: ['Te (टे)', 'To (टो)', 'Paa (पा)', 'Pee (पी)'] },
  'Hasta': { rashi: 'Virgo (Kanya)', syllables: ['Pu (पू)', 'Sha (ष)', 'Na (ण)', 'Tha (ठ)'] },
  'Chitra': { rashi: 'Virgo / Libra', syllables: ['Pe (पे)', 'Po (पो)', 'Ra (रा)', 'Ree (री)'] },
  'Swati': { rashi: 'Libra (Tula)', syllables: ['Ru (रू)', 'Re (रे)', 'Ro (रो)', 'Taa (ता)'] },
  'Vishakha': { rashi: 'Libra / Scorpio', syllables: ['Tee (ती)', 'Tu (तू)', 'Te (ते)', 'To (तो)'] },
  'Anuradha': { rashi: 'Scorpio (Vrishchika)', syllables: ['Na (ना)', 'Nee (नी)', 'Nu (नू)', 'Ne (ने)'] },
  'Jyeshtha': { rashi: 'Scorpio (Vrishchika)', syllables: ['No (नो)', 'Ya (या)', 'Yee (यी)', 'Yu (यू)'] },
  'Mula': { rashi: 'Sagittarius (Dhanu)', syllables: ['Ye (ये)', 'Yo (यो)', 'Bha (भा)', 'Bhee (भी)'] },
  'Purva Ashadha': { rashi: 'Sagittarius (Dhanu)', syllables: ['Bhu (भू)', 'Dha (धा)', 'Pha (फा)', 'Dhaa (ढा)'] },
  'Uttara Ashadha': { rashi: 'Sagittarius / Capricorn', syllables: ['Bhe (भे)', 'Bho (भो)', 'Ja (जा)', 'Jee (जी)'] },
  'Shravana': { rashi: 'Capricorn (Makara)', syllables: ['Khee (खी)', 'Khu (खू)', 'Khe (खे)', 'Kho (खो)'] },
  'Dhanishta': { rashi: 'Capricorn / Aquarius', syllables: ['Gaa (गा)', 'Gee (गी)', 'Gu (गु)', 'Ge (गे)'] },
  'Shatabhisha': { rashi: 'Aquarius (Kumbha)', syllables: ['Go (गो)', 'Saa (सा)', 'See (सी)', 'Su (सू)'] },
  'Purva Bhadrapada': { rashi: 'Aquarius / Pisces', syllables: ['Se (से)', 'So (सो)', 'Daa (दा)', 'Dee (दी)'] },
  'Uttara Bhadrapada': { rashi: 'Pisces (Meena)', syllables: ['Du (दू)', 'Tha (थ)', 'Jha (झ)', 'Naa (ञ)'] },
  'Revati': { rashi: 'Pisces (Meena)', syllables: ['De (दे)', 'Do (दो)', 'Chaa (चा)', 'Chee (ची)'] },
};

export const VEDIC_BABY_NAMES_DB: BabyNameItem[] = [
  // Boys
  { name: 'Aarav', hindiName: 'आरव', gender: 'Boy', meaning: 'Peaceful, divine melody, tranquil wisdom', rashi: 'Aries (Mesha)', nakshatra: 'Krittika', startingLetter: 'A', numerologyNumber: 1 },
  { name: 'Advait', hindiName: 'अद्वैत', gender: 'Boy', meaning: 'Non-dual, unique, supreme singular consciousness', rashi: 'Aries (Mesha)', nakshatra: 'Krittika', startingLetter: 'A', numerologyNumber: 7 },
  { name: 'Anay', hindiName: 'अनय', gender: 'Boy', meaning: 'Without a master, sacred name of Lord Ganesha', rashi: 'Aries (Mesha)', nakshatra: 'Krittika', startingLetter: 'A', numerologyNumber: 9 },
  { name: 'Bhavin', hindiName: 'भाविन', gender: 'Boy', meaning: 'Living, existing, victorious future planner', rashi: 'Sagittarius (Dhanu)', nakshatra: 'Mula', startingLetter: 'Bha', numerologyNumber: 3 },
  { name: 'Chaitanya', hindiName: 'चैतन्य', gender: 'Boy', meaning: 'Pure consciousness, divine life spirit', rashi: 'Aries (Mesha)', nakshatra: 'Ashwini', startingLetter: 'Che', numerologyNumber: 5 },
  { name: 'Devansh', hindiName: 'देवांश', gender: 'Boy', meaning: 'Divine part of God, celestial incarnation', rashi: 'Pisces (Meena)', nakshatra: 'Revati', startingLetter: 'De', numerologyNumber: 8 },
  { name: 'Dhruv', hindiName: 'ध्रुव', gender: 'Boy', meaning: 'Pole star, steadfast, eternal and unmoving', rashi: 'Sagittarius (Dhanu)', nakshatra: 'Purva Ashadha', startingLetter: 'Dha', numerologyNumber: 4 },
  { name: 'Ishaan', hindiName: 'ईशान', gender: 'Boy', meaning: 'Lord Shiva, guardian of North-East cosmic light', rashi: 'Aries (Mesha)', nakshatra: 'Krittika', startingLetter: 'Ee', numerologyNumber: 6 },
  { name: 'Kabir', hindiName: 'कबीर', gender: 'Boy', meaning: 'The great one, immortal saint poet of oneness', rashi: 'Gemini (Mithuna)', nakshatra: 'Mrigashira', startingLetter: 'Ka', numerologyNumber: 1 },
  { name: 'Naksh', hindiName: 'नक्ष', gender: 'Boy', meaning: 'Moon, features of beauty, celestial constellation', rashi: 'Scorpio (Vrishchika)', nakshatra: 'Anuradha', startingLetter: 'Na', numerologyNumber: 2 },
  { name: 'Reyansh', hindiName: 'रेयांश', gender: 'Boy', meaning: 'First ray of the golden morning sun, Lord Vishnu', rashi: 'Libra (Tula)', nakshatra: 'Swati', startingLetter: 'Re', numerologyNumber: 9 },
  { name: 'Rudransh', hindiName: 'रुद्रांश', gender: 'Boy', meaning: 'Part of Lord Shiva (Rudra), invincible power', rashi: 'Libra (Tula)', nakshatra: 'Swati', startingLetter: 'Ru', numerologyNumber: 3 },
  { name: 'Samar', hindiName: 'समर', gender: 'Boy', meaning: 'Courageous warrior, fruit of divine effort', rashi: 'Aquarius (Kumbha)', nakshatra: 'Shatabhisha', startingLetter: 'Saa', numerologyNumber: 5 },
  { name: 'Vedant', hindiName: 'वेदांत', gender: 'Boy', meaning: 'Ultimate Vedic philosophy, eternal wisdom', rashi: 'Taurus / Gemini', nakshatra: 'Mrigashira', startingLetter: 'Ve', numerologyNumber: 7 },
  { name: 'Vivaan', hindiName: 'विवान', gender: 'Boy', meaning: 'Full of life, rays of rising morning sun', rashi: 'Taurus (Vrishabha)', nakshatra: 'Rohini', startingLetter: 'Vi', numerologyNumber: 6 },
  { name: 'Yuvan', hindiName: 'युवान', gender: 'Boy', meaning: 'Youthful, vibrant, sacred title of Lord Shiva', rashi: 'Scorpio (Vrishchika)', nakshatra: 'Jyeshtha', startingLetter: 'Yu', numerologyNumber: 4 },

  // Girls
  { name: 'Aadhya', hindiName: 'आध्या', gender: 'Girl', meaning: 'First power, Goddess Durga, primal cosmic energy', rashi: 'Aries (Mesha)', nakshatra: 'Krittika', startingLetter: 'A', numerologyNumber: 1 },
  { name: 'Ananya', hindiName: 'अनन्या', gender: 'Girl', meaning: 'Matchless, Goddess Parvati, unique grace', rashi: 'Aries (Mesha)', nakshatra: 'Krittika', startingLetter: 'A', numerologyNumber: 5 },
  { name: 'Avani', hindiName: 'अवनी', gender: 'Girl', meaning: 'Mother Earth, nurturing, fertile ground of grace', rashi: 'Aries (Mesha)', nakshatra: 'Krittika', startingLetter: 'A', numerologyNumber: 6 },
  { name: 'Bhavna', hindiName: 'भावना', gender: 'Girl', meaning: 'Sacred emotion, meditation, deep devotion', rashi: 'Sagittarius (Dhanu)', nakshatra: 'Mula', startingLetter: 'Bha', numerologyNumber: 2 },
  { name: 'Charvi', hindiName: 'चार्वी', gender: 'Girl', meaning: 'Exquisite radiance, graceful beauty', rashi: 'Pisces (Meena)', nakshatra: 'Revati', startingLetter: 'Chaa', numerologyNumber: 3 },
  { name: 'Diya', hindiName: 'दिया', gender: 'Girl', meaning: 'Radiant sacred lamp, light dissipating darkness', rashi: 'Pisces (Meena)', nakshatra: 'Purva Bhadrapada', startingLetter: 'Dee', numerologyNumber: 9 },
  { name: 'Isha', hindiName: 'ईशा', gender: 'Girl', meaning: 'Goddess Durga, sovereign ruler of hearts', rashi: 'Aries (Mesha)', nakshatra: 'Krittika', startingLetter: 'Ee', numerologyNumber: 1 },
  { name: 'Kavya', hindiName: 'काव्या', gender: 'Girl', meaning: 'Poetic creation, wisdom flowing in artistic rhythm', rashi: 'Gemini (Mithuna)', nakshatra: 'Mrigashira', startingLetter: 'Ka', numerologyNumber: 8 },
  { name: 'Meera', hindiName: 'मीरा', gender: 'Girl', meaning: 'Ocean, boundless devotee of Sri Krishna', rashi: 'Leo (Simha)', nakshatra: 'Magha', startingLetter: 'Mee', numerologyNumber: 7 },
  { name: 'Navya', hindiName: 'नाव्या', gender: 'Girl', meaning: 'Ever-fresh, praiseworthy, innovative grace', rashi: 'Scorpio (Vrishchika)', nakshatra: 'Anuradha', startingLetter: 'Na', numerologyNumber: 6 },
  { name: 'Rhea', hindiName: 'रिया', gender: 'Girl', meaning: 'Graceful singer, flowing river, melodic spirit', rashi: 'Libra (Tula)', nakshatra: 'Swati', startingLetter: 'Re', numerologyNumber: 4 },
  { name: 'Saanvi', hindiName: 'सान्वी', gender: 'Girl', meaning: 'Goddess Lakshmi, one who is followed and revered', rashi: 'Aquarius (Kumbha)', nakshatra: 'Shatabhisha', startingLetter: 'Saa', numerologyNumber: 3 },
  { name: 'Tara', hindiName: 'तारा', gender: 'Girl', meaning: 'Radiant star, Goddess of compassion and guidance', rashi: 'Libra (Tula)', nakshatra: 'Swati', startingLetter: 'Taa', numerologyNumber: 2 },
  { name: 'Vanya', hindiName: 'वान्या', gender: 'Girl', meaning: 'Divine forest gift, blessed gracious daughter', rashi: 'Taurus (Vrishabha)', nakshatra: 'Rohini', startingLetter: 'Va', numerologyNumber: 8 },
  { name: 'Zoya', hindiName: 'ज़ोया', gender: 'Girl', meaning: 'Loving, radiant, alive with sparkling spirit', rashi: 'Sagittarius (Dhanu)', nakshatra: 'Mula', startingLetter: 'Yo', numerologyNumber: 5 },
];

// ==========================================
// 5. MANTRA JAPA MALA & NAVAGRAHA ENGINE
// ==========================================

export interface JapaMantraInfo {
  id: string;
  name: string;
  deity: string;
  category: 'Navagraha' | 'Mahamantra' | 'Stotram & Suktam';
  sanskrit: string;
  transliteration: string;
  bijaSyllables: string;
  recommendedCount: number; // e.g. 108
  frequencyHz: number;
  benefits: string;
  bestTime: string;
  malaType: string;
}

export const SACRED_MANTRAS_DB: JapaMantraInfo[] = [
  {
    id: 'gayatri',
    name: 'Maha Gayatri Mantra',
    deity: 'Goddess Gayatri / Savitr (Surya)',
    category: 'Mahamantra',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
    transliteration: 'Om Bhur Bhuvah Svah Tat Savitur Varenyam Bhargo Devasya Dheemahi Dhiyo Yo Nah Prachodayat',
    bijaSyllables: 'ॐ (Om) • भूर्भुवः स्वः',
    recommendedCount: 108,
    frequencyHz: 528, // DNA repair / Love frequency
    benefits: 'Awakens higher intellect (Buddhi), burns negative karma, grants health, brilliance, and enlightenment.',
    bestTime: 'Brahma Muhurta (04:30 AM - 06:00 AM) or Sandhya time',
    malaType: 'Tulsi Mala or Rudraksha Mala',
  },
  {
    id: 'mahamrityunjaya',
    name: 'Maha Mrityunjaya Mantra',
    deity: 'Lord Shiva (Tryambaka)',
    category: 'Mahamantra',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥',
    transliteration: 'Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam Urvaarukamiva Bandhanaan Mrityor Muksheeya Maamritaat',
    bijaSyllables: 'ॐ ह्रौं जूं सः ॐ भूर्भुवः स्वः',
    recommendedCount: 108,
    frequencyHz: 432, // Cosmic harmony frequency
    benefits: 'Immunity shield against accidents, chronic diseases, fear of untimely death, and grants rejuvenation.',
    bestTime: 'Dawn or during Pradosh Kaal (Sunset)',
    malaType: 'Panchamukhi Rudraksha Mala',
  },
  {
    id: 'surya-bija',
    name: 'Surya Bija Mantra',
    deity: 'Sun God (Surya Dev)',
    category: 'Navagraha',
    sanskrit: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः॥',
    transliteration: 'Om Hraam Hreem Hraum Sah Suryaaya Namah',
    bijaSyllables: 'ह्रां • ह्रीं • ह्रौं',
    recommendedCount: 108,
    frequencyHz: 639,
    benefits: 'Increases eyesight, vital energy, political and executive respect, fathers blessing, and bone strength.',
    bestTime: 'Sunday morning facing East towards rising Sun',
    malaType: 'Red Sandalwood (Rakta Chandan) or Ruby Mala',
  },
  {
    id: 'chandra-bija',
    name: 'Chandra Bija Mantra',
    deity: 'Moon God (Chandra Dev)',
    category: 'Navagraha',
    sanskrit: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः॥',
    transliteration: 'Om Shraam Shreem Shraum Sah Chandramase Namah',
    bijaSyllables: 'श्रां • श्रीं • श्रौं',
    recommendedCount: 108,
    frequencyHz: 417,
    benefits: 'Calms anxiety, depression, cures insomnia, enhances emotional stability and psychic intuition.',
    bestTime: 'Monday evening facing North-West or Moonrise',
    malaType: 'Pearl (Moti) or Sphatik (Quartz) Mala',
  },
  {
    id: 'mangal-bija',
    name: 'Mangal Bija Mantra',
    deity: 'Mars God (Mangal Dev)',
    category: 'Navagraha',
    sanskrit: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः॥',
    transliteration: 'Om Kraam Kreem Kraum Sah Bhaumaaya Namah',
    bijaSyllables: 'क्रां • क्रीं • क्रौं',
    recommendedCount: 108,
    frequencyHz: 741,
    benefits: 'Removes Manglik Dosha, debts (Rin Mukti), provides courage, property acquisition, and blood vitality.',
    bestTime: 'Tuesday morning facing South',
    malaType: 'Red Coral (Moonga) or Red Sandalwood Mala',
  },
  {
    id: 'budh-bija',
    name: 'Budh Bija Mantra',
    deity: 'Mercury God (Budh Dev)',
    category: 'Navagraha',
    sanskrit: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः॥',
    transliteration: 'Om Braam Breem Braum Sah Budhaaya Namah',
    bijaSyllables: 'ब्रां • ब्रीं • ब्रौं',
    recommendedCount: 108,
    frequencyHz: 852,
    benefits: 'Sharpens speech, trading skills, mathematics, memory, nervous system, and business success.',
    bestTime: 'Wednesday morning facing North',
    malaType: 'Emerald or Tulsi Mala',
  },
  {
    id: 'guru-bija',
    name: 'Guru Bija Mantra',
    deity: 'Jupiter God (Brihaspati Dev)',
    category: 'Navagraha',
    sanskrit: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः॥',
    transliteration: 'Om Graam Greem Graum Sah Gurave Namah',
    bijaSyllables: 'ग्रां • ग्रीं • ग्रौं',
    recommendedCount: 108,
    frequencyHz: 963,
    benefits: 'Bestows higher spiritual wisdom, marriage bliss, child progeny, wealth, and academic honors.',
    bestTime: 'Thursday morning facing North-East',
    malaType: 'Turmeric (Haldi) or Yellow Jade Mala',
  },
  {
    id: 'shukra-bija',
    name: 'Shukra Bija Mantra',
    deity: 'Venus God (Shukra Dev)',
    category: 'Navagraha',
    sanskrit: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः॥',
    transliteration: 'Om Draam Dreem Draum Sah Shukraaya Namah',
    bijaSyllables: 'द्रां • द्रीं • द्रौं',
    recommendedCount: 108,
    frequencyHz: 528,
    benefits: 'Attracts beauty, luxury, creative arts, marital romance, vehicle acquisition, and charisma.',
    bestTime: 'Friday dawn facing South-East',
    malaType: 'Sphatik (Crystal) or White Sandalwood Mala',
  },
  {
    id: 'shani-bija',
    name: 'Shani Bija Mantra',
    deity: 'Saturn God (Shani Dev)',
    category: 'Navagraha',
    sanskrit: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः॥',
    transliteration: 'Om Praam Preem Praum Sah Shanaishcharaaya Namah',
    bijaSyllables: 'प्रां • प्रीं • प्रौं',
    recommendedCount: 108,
    frequencyHz: 396,
    benefits: 'Pacifies Sade Sati and Dhaiya, removes chronic obstacles, brings patience, endurance, and justice.',
    bestTime: 'Saturday evening after sunset facing West',
    malaType: 'Blue Sandalwood or 7-Mukhi Rudraksha Mala',
  },
  {
    id: 'rahu-bija',
    name: 'Rahu Bija Mantra',
    deity: 'Rahu (North Node of Moon)',
    category: 'Navagraha',
    sanskrit: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः॥',
    transliteration: 'Om Bhraam Bhreem Bhraum Sah Raahave Namah',
    bijaSyllables: 'भ्रां • भ्रीं • भ्रौं',
    recommendedCount: 108,
    frequencyHz: 432,
    benefits: 'Cures illusion, protects against cyber/unseen enemies, sudden windfall gains, and overseas success.',
    bestTime: 'Saturday or Wednesday night facing South-West',
    malaType: '8-Mukhi Rudraksha or Hessonite Mala',
  },
  {
    id: 'ketu-bija',
    name: 'Ketu Bija Mantra',
    deity: 'Ketu (South Node of Moon)',
    category: 'Navagraha',
    sanskrit: 'ॐ स्रां स्रीं स्रौं सः केतवे नमः॥',
    transliteration: 'Om Sraam Sreem Sraum Sah Ketave Namah',
    bijaSyllables: 'स्रां • स्रीं • स्रौं',
    recommendedCount: 108,
    frequencyHz: 741,
    benefits: 'Grants Moksha (Spiritual Liberation), unlocks clairvoyant healing powers, and protects against occult malice.',
    bestTime: 'Tuesday night facing North-East',
    malaType: '9-Mukhi Rudraksha or Ashva Stone Mala',
  },
  {
    id: 'kuber-mantra',
    name: 'Lord Kuber Dhana Prapti Mantra',
    deity: 'Lord Kuber (Treasurer of Gods)',
    category: 'Stotram & Suktam',
    sanskrit: 'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये धनधान्यसमृद्धिं मे देहि दापय स्वाहा॥',
    transliteration: 'Om Yakshaaya Kuberaya Vaishravanaaya Dhanadhaanyaadhipataye Dhanadhaanyasamriddhim Me Dehi Daapaya Swaaha',
    bijaSyllables: 'ॐ श्रीं ॐ ह्रीं श्रीं ह्रीं क्लीं',
    recommendedCount: 108,
    frequencyHz: 852,
    benefits: 'Unlocks blocked cash reserves, business profitability, real estate wealth, and removes poverty.',
    bestTime: 'Friday evening facing North',
    malaType: 'Lotus Seed (Kamal Gatta) Mala',
  }
];

// ==========================================
// 6. ASHTAKVARGA & DOSHA ENGINE FOR KUNDLI
// ==========================================

export interface AshtakvargaHouseData {
  house: number;
  sign: string;
  sunBindus: number;
  moonBindus: number;
  marsBindus: number;
  mercuryBindus: number;
  jupiterBindus: number;
  venusBindus: number;
  saturnBindus: number;
  totalSarvashtak: number;
  strength: 'Supreme (30+)' | 'Strong (28-29)' | 'Average (25-27)' | 'Requires Remedy (<25)';
}

export function computeAshtakvargaMatrix(kundli: KundliData): AshtakvargaHouseData[] {
  const baseSeed = kundli.planets.reduce((acc, p) => acc + p.rawDegree, 0);
  const zodiacs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  return Array.from({ length: 12 }, (_, idx) => {
    const h = idx + 1;
    // Calculate deterministic traditional-looking bindu counts
    const sun = Math.min(8, Math.max(2, Math.round(((baseSeed * (h + 1)) % 7) + 2)));
    const moon = Math.min(8, Math.max(2, Math.round(((baseSeed * (h + 2)) % 6) + 3)));
    const mars = Math.min(8, Math.max(1, Math.round(((baseSeed * (h + 3)) % 6) + 2)));
    const merc = Math.min(8, Math.max(3, Math.round(((baseSeed * (h + 4)) % 6) + 3)));
    const jup = Math.min(8, Math.max(3, Math.round(((baseSeed * (h + 5)) % 6) + 3)));
    const ven = Math.min(8, Math.max(2, Math.round(((baseSeed * (h + 6)) % 6) + 3)));
    const sat = Math.min(8, Math.max(1, Math.round(((baseSeed * (h + 7)) % 5) + 2)));
    const total = sun + moon + mars + merc + jup + ven + sat;

    let strength: AshtakvargaHouseData['strength'] = 'Average (25-27)';
    if (total >= 30) strength = 'Supreme (30+)';
    else if (total >= 28) strength = 'Strong (28-29)';
    else if (total < 25) strength = 'Requires Remedy (<25)';

    return {
      house: h,
      sign: zodiacs[(idx + 2) % 12],
      sunBindus: sun,
      moonBindus: moon,
      marsBindus: mars,
      mercuryBindus: merc,
      jupiterBindus: jup,
      venusBindus: ven,
      saturnBindus: sat,
      totalSarvashtak: total,
      strength,
    };
  });
}

// ==========================================
// 7. COMPREHENSIVE SHUBH MUHURAT SUITE
// ==========================================

export interface ShubhMuhuratEvent {
  id: string;
  category: 'Vivah (Marriage)' | 'Griha Pravesh (Housewarming)' | 'Vahan Kharid (Vehicle)' | 'Sampatti (Property)' | 'Naamkaran & Mundan';
  date: string;
  day: string;
  muhuratWindow: string;
  nakshatra: string;
  tithi: string;
  shubhChoghadiya: string;
  specialAuspiciousness: string;
}

export const COMPREHENSIVE_MUHURATS: ShubhMuhuratEvent[] = [
  // Vivah Muhurat
  {
    id: 'vivah-1',
    category: 'Vivah (Marriage)',
    date: 'Nov 18, 2026',
    day: 'Wednesday',
    muhuratWindow: '06:48 AM to 02:30 PM (Mithuna / Karka Lagna)',
    nakshatra: 'Uttara Phalguni (Pada 2)',
    tithi: 'Shukla Dashami',
    shubhChoghadiya: 'Amrit & Shubh Choghadiya',
    specialAuspiciousness: 'Dev Uthani Ekadashi window — supreme planetary alliance for enduring marital harmony.',
  },
  {
    id: 'vivah-2',
    category: 'Vivah (Marriage)',
    date: 'Nov 22, 2026',
    day: 'Sunday',
    muhuratWindow: '07:15 PM to 11:45 PM (Vrishabha Godhuli)',
    nakshatra: 'Rohini Nakshatra',
    tithi: 'Shukla Trayodashi',
    shubhChoghadiya: 'Shubh & Labh Choghadiya',
    specialAuspiciousness: 'Chandra-Rohini Samyoga: Enhances lifetime mutual devotion and prosperity.',
  },
  {
    id: 'vivah-3',
    category: 'Vivah (Marriage)',
    date: 'Dec 04, 2026',
    day: 'Friday',
    muhuratWindow: '08:10 AM to 01:20 PM (Dhanu Lagna)',
    nakshatra: 'Hasta Nakshatra',
    tithi: 'Krishna Ekadashi',
    shubhChoghadiya: 'Char & Labh Choghadiya',
    specialAuspiciousness: 'Surya in friendly sign with strong Jupiter aspect on 7th house.',
  },

  // Griha Pravesh
  {
    id: 'griha-1',
    category: 'Griha Pravesh (Housewarming)',
    date: 'Oct 29, 2026',
    day: 'Thursday',
    muhuratWindow: '06:32 AM to 10:45 AM (Ishanya Shuddhi)',
    nakshatra: 'Mrigashira Nakshatra',
    tithi: 'Shukla Panchami (Labh Panchami)',
    shubhChoghadiya: 'Shubh & Amrit Choghadiya',
    specialAuspiciousness: 'Ideal for permanent peace, wealth retention, and ancestral blessings in newly built home.',
  },
  {
    id: 'griha-2',
    category: 'Griha Pravesh (Housewarming)',
    date: 'Nov 26, 2026',
    day: 'Thursday',
    muhuratWindow: '09:15 AM to 01:40 PM',
    nakshatra: 'Pushya Nakshatra',
    tithi: 'Shukla Dwitiya',
    shubhChoghadiya: 'Amrit Choghadiya (Guru Pushya Yoga)',
    specialAuspiciousness: 'King of Nakshatras (Pushya) ensures perpetual growth of family lineage and assets.',
  },

  // Vahan Kharid
  {
    id: 'vahan-1',
    category: 'Vahan Kharid (Vehicle)',
    date: 'Sep 22, 2026',
    day: 'Tuesday',
    muhuratWindow: '10:00 AM to 03:30 PM',
    nakshatra: 'Chitra Nakshatra',
    tithi: 'Sharad Navratri Day 1',
    shubhChoghadiya: 'Labh & Amrit Choghadiya',
    specialAuspiciousness: 'Devi Durga blessing safeguards the vehicle against accidents and mechanical snags.',
  },
  {
    id: 'vahan-2',
    category: 'Vahan Kharid (Vehicle)',
    date: 'Oct 20, 2026',
    day: 'Tuesday',
    muhuratWindow: '11:15 AM to 04:45 PM',
    nakshatra: 'Shravana Nakshatra',
    tithi: 'Vijayadashami (Dussehra)',
    shubhChoghadiya: 'Shubh & Char Choghadiya',
    specialAuspiciousness: 'Aparajita Muhurat — all conveyances purchased on Dussehra bring boundless victory.',
  },

  // Sampatti Kharid
  {
    id: 'sampatti-1',
    category: 'Sampatti (Property)',
    date: 'Oct 15, 2026',
    day: 'Thursday',
    muhuratWindow: '08:45 AM to 12:30 PM',
    nakshatra: 'Anuradha Nakshatra',
    tithi: 'Shukla Chaturthi',
    shubhChoghadiya: 'Shubh Choghadiya',
    specialAuspiciousness: 'Bhoomi Karaka Mangal is favorably placed in friendly sign; ensures high appreciation.',
  },

  // Naamkaran & Mundan
  {
    id: 'naamkaran-1',
    category: 'Naamkaran & Mundan',
    date: 'Sep 28, 2026',
    day: 'Monday',
    muhuratWindow: '07:30 AM to 11:00 AM',
    nakshatra: 'Ashwini Nakshatra',
    tithi: 'Shukla Ashtami',
    shubhChoghadiya: 'Amrit Choghadiya',
    specialAuspiciousness: 'Savitr energy grants razor-sharp intellect, good speech, and radiant health to the child.',
  },
];
