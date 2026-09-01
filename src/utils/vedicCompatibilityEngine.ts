import { CelestialBodyData, UserProfile } from '../types';
import {
  calculateBirthPlanetaryPositions,
  calculateJulianDay,
  calculateLahiriAyanamsa,
  calculateHeliocentricPosition,
  getZodiacFromLongitude,
  formatDegreeMinutes,
  NatalPlanetPosition,
  ZODIAC_METADATA,
} from './planetaryEphemeris';

export type FriendshipStatus = 'Great Friend' | 'Friend' | 'Neutral' | 'Enemy' | 'Great Enemy';

export interface VedicAspectInfo {
  aspectType: string;
  targetTarget: string;
  targetDegree: string;
  orb: number; // in degrees
  nature: 'Auspicious' | 'Challenging' | 'Empowering' | 'Transformative';
  interpretation: string;
}

export interface VedicCompatibilityResult {
  planetId: string;
  planetName: string;
  planetSanskrit: string;
  vedicGrahaTitle: string;
  currentTransitDate: string;
  
  // Current Transit Telemetry
  currentTransit: {
    sign: string;
    signSanskrit: string;
    symbol: string;
    degree: number;
    formattedDegree: string;
    eclipticLongitude: number;
    nakshatra: string;
    nakshatraLord: string;
    pada: number;
    element: 'Fire' | 'Earth' | 'Air' | 'Water';
    isRetrograde: boolean;
    speedStatus: 'Fast' | 'Normal' | 'Slow / Stationary';
  };

  // User Natal Baseline from App Component
  userNatal: {
    userName: string;
    birthDate: string;
    birthTime: string;
    birthCity: string;
    lagnaSign: string;
    lagnaSanskrit: string;
    lagnaLord: string;
    moonSign: string;
    moonSanskrit: string;
    moonNakshatra: string;
    moonLord: string;
    sunSign: string;
    natalPlanetPosition?: NatalPlanetPosition;
  };

  // House Dynamics (Gochara)
  gochara: {
    houseFromMoon: number;
    houseFromLagna: number;
    moonHouseAuspicious: boolean;
    moonHouseTitle: string;
    moonHouseEffect: string;
    lagnaHouseTitle: string;
    lagnaHouseEffect: string;
    specialTransitPhase?: string; // e.g. "Sade Sati (Setting)", "Kantaka Shani", "Guru Kripa Yog"
  };

  // Maitri / Friendship Matrix
  friendship: {
    withMoonLord: FriendshipStatus;
    withLagnaLord: FriendshipStatus;
    compositeMaitri: FriendshipStatus;
    summary: string;
  };

  // Active Vedic Aspects (Drishti) on User's Chart
  aspects: VedicAspectInfo[];

  // Elemental Resonance
  elementHarmony: {
    planetElement: string;
    moonElement: string;
    lagnaElement: string;
    elementalCompatibility: 'Supreme Flow' | 'Constructive Harmony' | 'Dynamic Friction' | 'Alchemical Growth';
    description: string;
  };

  // Overall Score (0-100)
  overallCompatibilityScore: number;
  grade: 'PARAM SHUBHA (A+)' | 'SHUBHA (A)' | 'MADHYAM (B)' | 'MISHRIT (C)' | 'KATHIN (D)';
  verdictTitle: string;
  verdictDetailed: string;

  // Vedic Remedies & Upayas
  remedy: {
    bijaMantraSanskrit: string;
    bijaMantraEnglish: string;
    deity: string;
    ratnaGemstone: string;
    metal: string;
    auspiciousDay: string;
    auspiciousColor: string;
    direction: string;
    donationOrOffering: string;
    recommendedFrequencyHz: number;
    affirmation: string;
  };
}

// Natural Planetary Friendship Rules (Naisargika Maitri)
const NATURAL_FRIENDSHIPS: Record<string, { friends: string[]; neutral: string[]; enemies: string[] }> = {
  sun: {
    friends: ['moon', 'mars', 'jupiter'],
    neutral: ['mercury'],
    enemies: ['venus', 'saturn', 'rahu', 'ketu', 'uranus'],
  },
  moon: {
    friends: ['sun', 'mercury'],
    neutral: ['mars', 'jupiter', 'venus', 'saturn', 'earth'],
    enemies: ['rahu', 'ketu'],
  },
  mars: {
    friends: ['sun', 'moon', 'jupiter'],
    neutral: ['venus', 'saturn', 'earth'],
    enemies: ['mercury', 'rahu'],
  },
  mercury: {
    friends: ['sun', 'venus', 'rahu'],
    neutral: ['mars', 'jupiter', 'saturn'],
    enemies: ['moon'],
  },
  jupiter: {
    friends: ['sun', 'moon', 'mars'],
    neutral: ['saturn', 'rahu', 'ketu'],
    enemies: ['mercury', 'venus'],
  },
  venus: {
    friends: ['mercury', 'saturn', 'rahu', 'ketu'],
    neutral: ['mars', 'jupiter'],
    enemies: ['sun', 'moon'],
  },
  saturn: {
    friends: ['mercury', 'venus', 'rahu'],
    neutral: ['jupiter'],
    enemies: ['sun', 'moon', 'mars', 'ketu'],
  },
  rahu: {
    friends: ['venus', 'saturn', 'mercury'],
    neutral: ['jupiter'],
    enemies: ['sun', 'moon', 'mars'],
  },
  ketu: {
    friends: ['mars', 'venus', 'saturn'],
    neutral: ['jupiter', 'mercury'],
    enemies: ['sun', 'moon'],
  },
  earth: {
    friends: ['moon', 'sun', 'venus'],
    neutral: ['jupiter', 'mercury', 'mars'],
    enemies: ['saturn'],
  },
  uranus: {
    friends: ['mercury', 'saturn', 'jupiter'],
    neutral: ['venus', 'sun'],
    enemies: ['mars'],
  },
  neptune: {
    friends: ['jupiter', 'moon', 'venus'],
    neutral: ['sun', 'mercury'],
    enemies: ['saturn'],
  },
  pluto: {
    friends: ['mars', 'saturn'],
    neutral: ['jupiter'],
    enemies: ['sun', 'moon'],
  },
};

// Auspicious transit houses from Moon according to Brihat Parashara Hora Shastra
const AUSPICIOUS_MOON_HOUSES: Record<string, number[]> = {
  sun: [3, 6, 10, 11],
  moon: [1, 3, 6, 7, 10, 11],
  mars: [3, 6, 11],
  mercury: [2, 4, 6, 8, 10, 11],
  jupiter: [2, 5, 7, 9, 11],
  venus: [1, 2, 3, 4, 5, 8, 9, 11, 12],
  saturn: [3, 6, 11],
  rahu: [3, 6, 10, 11],
  ketu: [3, 6, 11],
  earth: [1, 4, 7, 10],
  uranus: [1, 3, 5, 9, 11],
  neptune: [4, 5, 9, 12],
  pluto: [3, 8, 10],
};

// Bhava (House) Significations for Lagna and Moon
const HOUSE_MEANINGS: Record<number, { title: string; desc: string }> = {
  1: { title: 'Tanu Bhava (1st House - Vital Self & Mindset)', desc: 'Directly energizes your physical aura, personal identity, vitality, and primary life direction.' },
  2: { title: 'Dhana Bhava (2nd House - Wealth & Speech)', desc: 'Activates family treasuries, financial liquidity, eloquence of speech, and material sustenance.' },
  3: { title: 'Sahaja Bhava (3rd House - Courage & Initiative)', desc: 'Magnifies willpower, bold artistic ventures, brotherly ties, short travels, and technological innovation.' },
  4: { title: 'Sukha Bhava (4th House - Domestic Bliss & Heart)', desc: 'Influences inner emotional sanctuary, maternal blessings, real estate, vehicles, and peace of mind.' },
  5: { title: 'Suta Bhava (5th House - Purva Punya & Intellect)', desc: 'Awakens past-life spiritual merit, creative brilliance, speculative luck, intuition, and scholarly acumen.' },
  6: { title: 'Ripu Bhava (6th House - Victory over Adversity)', desc: 'Empowers mastery over obstacles, debts, competitive rivals, disease healing, and daily work discipline.' },
  7: { title: 'Jaya Bhava (7th House - Partnerships & Alliances)', desc: 'Illuminates contractual ventures, romantic marriage harmony, business partners, and social stature.' },
  8: { title: 'Ayur Bhava (8th House - Occult & Metamorphosis)', desc: 'Triggers profound psychic regeneration, esoteric breakthroughs, sudden transformations, and longevity.' },
  9: { title: 'Bhagya Bhava (9th House - Divine Grace & Dharma)', desc: 'Channels cosmic fortune, guru mentorship, pilgrimages, philosophical expansions, and dharma alignment.' },
  10: { title: 'Karma Bhava (10th House - Career Zenith & Authority)', desc: 'Commands supreme career achievements, public renown, leadership authority, and societal contributions.' },
  11: { title: 'Labha Bhava (11th House - Abundance & Networks)', desc: 'Manifests massive gains, fulfillment of deepest desires, high-level benefactor alliances, and wealth.' },
  12: { title: 'Vyaya Bhava (12th House - Moksha & Spiritual Solitude)', desc: 'Opens portals for spiritual liberation (Moksha), deep meditative trance, foreign connections, and release of karmic ties.' },
};

// Sacred Remedies Database per Graha
const VEDIC_REMEDIES: Record<string, VedicCompatibilityResult['remedy']> = {
  sun: {
    bijaMantraSanskrit: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः',
    bijaMantraEnglish: 'Om Hraam Hreem Hroum Sah Suryaya Namah',
    deity: 'Surya Narayana / Lord Rama / Shiva',
    ratnaGemstone: 'Ruby (माणिक्य) or Red Garnet set in Gold/Copper',
    metal: 'Pure Copper or 22k Gold',
    auspiciousDay: 'Sunday (रविवासर)',
    auspiciousColor: 'Crimson, Gold, & Saffron',
    direction: 'East (पूर्व - Purva)',
    donationOrOffering: 'Offer water with red sandalwood paste & jaggery to the rising Sun (Surya Arghya)',
    recommendedFrequencyHz: 126.22,
    affirmation: 'I stand in sovereign radiant light; my soul commands divine purpose with unwavering clarity.',
  },
  moon: {
    bijaMantraSanskrit: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः',
    bijaMantraEnglish: 'Om Shraam Shreem Shroum Sah Chandramase Namah',
    deity: 'Chandra Deva / Lord Shiva / Goddess Gauri',
    ratnaGemstone: 'Natural Pearl (मोती) or Moonstone set in Silver',
    metal: 'Sterling Silver',
    auspiciousDay: 'Monday (सोमवासर)',
    auspiciousColor: 'Pristine White, Silver, & Pearlescent Milk',
    direction: 'North-West (वायव्य - Vayavya)',
    donationOrOffering: 'Offer milk and white flowers to Shiva Lingam on Monday evenings',
    recommendedFrequencyHz: 210.42,
    affirmation: 'My mind is an unruffled ocean of tranquil wisdom, receptive to highest cosmic intuition.',
  },
  mars: {
    bijaMantraSanskrit: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः',
    bijaMantraEnglish: 'Om Kraam Kreem Kroum Sah Bhaumaya Namah',
    deity: 'Mangala Deva / Lord Kartikeya / Lord Hanuman',
    ratnaGemstone: 'Red Coral (मूँगा / Praval) set in Copper/Gold',
    metal: 'Pure Copper or Brass',
    auspiciousDay: 'Tuesday (भौमवासर)',
    auspiciousColor: 'Scarlet Red, Vermilion, & Coral Orange',
    direction: 'South (दक्षिण - Dakshina)',
    donationOrOffering: 'Recite Hanuman Chalisa 7 times & donate red lentils (Masoor Dal) to charity',
    recommendedFrequencyHz: 144.72,
    affirmation: 'Divine courage flows through my veins; I triumph fearlessly over every obstacle.',
  },
  mercury: {
    bijaMantraSanskrit: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः',
    bijaMantraEnglish: 'Om Braam Breem Broum Sah Budhaya Namah',
    deity: 'Budha Deva / Lord Vishnu / Goddess Saraswati',
    ratnaGemstone: 'Natural Emerald (पन्ना / Panna) or Peridot set in Gold/Silver',
    metal: 'Bronze / Brass or White Gold',
    auspiciousDay: 'Wednesday (बुधवासर)',
    auspiciousColor: 'Emerald Green, Mint, & Forest Jade',
    direction: 'North (उत्तर - Uttara)',
    donationOrOffering: 'Feed green grass or fresh spinach to cows; donate educational books to needy students',
    recommendedFrequencyHz: 141.27,
    affirmation: 'My intellect is sharp, articulate, and synchronized with divine universal intelligence.',
  },
  jupiter: {
    bijaMantraSanskrit: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः',
    bijaMantraEnglish: 'Om Graam Greem Groum Sah Gurave Namah',
    deity: 'Brihaspati / Lord Dakshinamurthy / Lord Brahma',
    ratnaGemstone: 'Yellow Sapphire (पुखराज / Pukhraj) or Yellow Topaz in Gold',
    metal: 'Pure 24k Gold or Brass',
    auspiciousDay: 'Thursday (गुरुवासर)',
    auspiciousColor: 'Radiant Golden Yellow, Amber, & Turmeric Saffron',
    direction: 'North-East (ईशान - Ishana)',
    donationOrOffering: 'Apply yellow chandan tilak, honor spiritual teachers, and offer yellow sweets or bananas',
    recommendedFrequencyHz: 183.58,
    affirmation: 'Universal abundance, boundless grace, and divine wisdom expand continuously in my life.',
  },
  venus: {
    bijaMantraSanskrit: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः',
    bijaMantraEnglish: 'Om Draam Dreem Droum Sah Shukraya Namah',
    deity: 'Shukra Deva / Goddess Mahalakshmi',
    ratnaGemstone: 'Flawless Diamond (हीरा / Heera) or White Zircon set in Platinum/Silver',
    metal: 'Platinum or Silver',
    auspiciousDay: 'Friday (शुक्रवासर)',
    auspiciousColor: 'Iridescent White, Silk Cream, & Pastel Rose',
    direction: 'South-East (आग्नेय - Agneya)',
    donationOrOffering: 'Light a fragrant ghee lamp before Goddess Lakshmi and donate white rice or sugar',
    recommendedFrequencyHz: 221.23,
    affirmation: 'I attract unconditional love, aesthetic elegance, prosperity, and magnetic harmony effortlessly.',
  },
  saturn: {
    bijaMantraSanskrit: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः',
    bijaMantraEnglish: 'Om Praam Preem Proum Sah Shanaishcharaya Namah',
    deity: 'Shani Deva / Lord Shiva / Lord Yama',
    ratnaGemstone: 'Blue Sapphire (नीलम / Neelam) or Amethyst set in Iron/Silver',
    metal: 'Wrought Iron, Steel, or Silver',
    auspiciousDay: 'Saturday (शनिवासर)',
    auspiciousColor: 'Midnight Blue, Jet Black, & Dark Charcoal',
    direction: 'West (पश्चिम - Pashchima)',
    donationOrOffering: 'Light mustard oil lamp under Peepal tree and donate black sesame seeds (Til) to the elderly',
    recommendedFrequencyHz: 147.85,
    affirmation: 'I embrace sacred patience, discipline, and karmic integrity; my foundation is unbreakable.',
  },
  rahu: {
    bijaMantraSanskrit: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः',
    bijaMantraEnglish: 'Om Bhraam Bhreem Bhroum Sah Rahave Namah',
    deity: 'Rahu Deva / Goddess Durga / Lord Bhairava',
    ratnaGemstone: 'Hessonite Garnet (गोमेद / Gomed) set in Ashtadhatu (8-metal alloy)',
    metal: 'Ashtadhatu or Lead alloy',
    auspiciousDay: 'Saturday / Wednesday night',
    auspiciousColor: 'Smoky Grey, Electric Cyan, & Obsidian',
    direction: 'South-West (नैऋत्य - Nairutya)',
    donationOrOffering: 'Chant Durga Saptashati & feed stray birds or dogs with whole wheat bread',
    recommendedFrequencyHz: 186.0,
    affirmation: 'I master worldly illusion (Maya) and channel visionary genius into tangible reality.',
  },
  ketu: {
    bijaMantraSanskrit: 'ॐ स्रां स्रीं स्रौं सः केतवे नमः',
    bijaMantraEnglish: 'Om Sraam Sreem Sroum Sah Ketave Namah',
    deity: 'Ketu Deva / Lord Ganesha / Lord Matsya Avatar',
    ratnaGemstone: "Cat's Eye (लहसुनिया / Vaidurya) set in Silver or Ashtadhatu",
    metal: 'Ashtadhatu or Silver',
    auspiciousDay: 'Tuesday night',
    auspiciousColor: 'Smoke Brown, Ochre, & Multicolor Ash',
    direction: 'North-West (Upper Zenith - Urddhva)',
    donationOrOffering: 'Offer 21 Durva grass blades to Lord Ganesha and practice silent breath meditation',
    recommendedFrequencyHz: 281.0,
    affirmation: 'I release all attachments with grace; pure spiritual illumination guides my soul.',
  },
  earth: {
    bijaMantraSanskrit: 'ॐ भूम्यै नमः • ॐ वसुन्धरायै नमः',
    bijaMantraEnglish: 'Om Bhumyai Namah • Om Vasundharayai Namah',
    deity: 'Bhumi Devi / Goddess Prithvi / Lord Vishnu',
    ratnaGemstone: 'Green Jade, Moss Agate, or Emerald',
    metal: 'Bronze and Clay',
    auspiciousDay: 'Wednesday / Sunday',
    auspiciousColor: 'Terracotta, Earth Brown, & Lush Green',
    direction: 'Center (ब्रह्मस्थान - Brahmasthan)',
    donationOrOffering: 'Plant a sacred tree (Tulsi, Banyan, Neem) and perform barefoot earthing on morning soil',
    recommendedFrequencyHz: 136.1,
    affirmation: 'I am rooted deeply in the nourishing womb of Mother Earth; physical wellness is my birthright.',
  },
  uranus: {
    bijaMantraSanskrit: 'ॐ वरुणाय नमः • ॐ विद्युद्रूपिणे नमः',
    bijaMantraEnglish: 'Om Varunaya Namah • Om Vidyut-Rupine Namah',
    deity: 'Varuna Deva / Rudra (Cosmic Lightning)',
    ratnaGemstone: 'Aquamarine or Tanzanite',
    metal: 'Titanium or White Gold',
    auspiciousDay: 'Wednesday',
    auspiciousColor: 'Electric Cyan, Neon Sky Blue',
    direction: 'Sky Zenith (आकाश - Akasha)',
    donationOrOffering: 'Support scientific innovation and donate electronic tools to students',
    recommendedFrequencyHz: 207.36,
    affirmation: 'Quantum breakthroughs and inventive genius awaken within my neural synapses.',
  },
  neptune: {
    bijaMantraSanskrit: 'ॐ अनन्ताय नमः • ॐ शेषशायिने नमः',
    bijaMantraEnglish: 'Om Anantaya Namah • Om Sheshashayine Namah',
    deity: 'Lord Sheshanaag / Lord Maha Vishnu',
    ratnaGemstone: 'Lapis Lazuli or Blue Topaz',
    metal: 'Pure Silver',
    auspiciousDay: 'Monday / Thursday',
    auspiciousColor: 'Deep Ocean Blue & Indigo',
    direction: 'Cosmic Waters',
    donationOrOffering: 'Engage in deep sound bath meditation with singing bowls',
    recommendedFrequencyHz: 211.44,
    affirmation: 'I dissolve effortlessly into the boundless ocean of divine cosmic consciousness.',
  },
  pluto: {
    bijaMantraSanskrit: 'ॐ यमाय धर्मराजाय नमः • ॐ महाकालाय नमः',
    bijaMantraEnglish: 'Om Yamaya Dharmarajaya Namah • Om Mahakalaya Namah',
    deity: 'Lord Mahakala / Lord Yama Dharma Raja',
    ratnaGemstone: 'Black Onyx or Obsidian',
    metal: 'Platinum / Iron',
    auspiciousDay: 'Saturday midnight',
    auspiciousColor: 'Deep Crimson & Jet Black',
    direction: 'Underworld Foundation (पाताल - Patala)',
    donationOrOffering: 'Purge old emotional clutter and practice shadow work journaling',
    recommendedFrequencyHz: 140.25,
    affirmation: 'I willingly shed outgrown identities and resurrect as an unstoppable sovereign soul.',
  },
};

/**
 * Calculates dynamic Vedic Planetary Compatibility between any Celestial Body (Planet)
 * and the User's birth data stored in the App component.
 */
export function calculateVedicPlanetCompatibility(
  body: CelestialBodyData,
  user: UserProfile | undefined,
  targetDate: Date = new Date()
): VedicCompatibilityResult {
  // 1. Resolve User Birth Data
  const userName = user?.name || 'Anya Sharma';
  const birthDate = user?.birthDate || '1996-07-14';
  const birthTime = user?.birthTime || '06:45';
  const birthCity = user?.birthCity || 'Varanasi, India';

  // 2. Compute Full Natal Chart for User
  const natalData = calculateBirthPlanetaryPositions(birthDate, birthTime, birthCity);

  const natalLagnaSign = natalData.ascendant.sign;
  const natalLagnaSanskrit = ZODIAC_METADATA.find((z) => z.name === natalLagnaSign)?.sanskrit || natalLagnaSign;
  const natalLagnaLord = ZODIAC_METADATA.find((z) => z.name === natalLagnaSign)?.lord || 'Sun';
  const natalLagnaSignIdx = ZODIAC_METADATA.findIndex((z) => z.name === natalLagnaSign);

  const natalMoonSign = natalData.moonSign;
  const natalMoonSanskrit = ZODIAC_METADATA.find((z) => z.name === natalMoonSign)?.sanskrit || natalMoonSign;
  const natalMoonLord = ZODIAC_METADATA.find((z) => z.name === natalMoonSign)?.lord || 'Moon';
  const natalMoonSignIdx = ZODIAC_METADATA.findIndex((z) => z.name === natalMoonSign);

  const natalPlanetPos = natalData.planets.find((p) => p.id === body.id);

  // 3. Compute Current Transit of Target Planet at targetDate
  const y = targetDate.getFullYear();
  const m = targetDate.getMonth() + 1;
  const d = targetDate.getDate();
  const h = targetDate.getHours();
  const min = targetDate.getMinutes();

  const currentJD = calculateJulianDay(y, m, d, h, min);
  const currentAyanamsa = calculateLahiriAyanamsa(currentJD);

  let currentLongDeg = 0;
  let isRetro = false;

  // Transit calculation mapping
  const planetKey = body.id;
  if (planetKey === 'sun') {
    const earthPos = calculateHeliocentricPosition('earth', currentJD);
    currentLongDeg = (earthPos.lDeg + 180 - currentAyanamsa + 360) % 360;
  } else if (planetKey === 'moon') {
    currentLongDeg = (218.316 + 13.176396 * (currentJD - 2451545.0) - currentAyanamsa + 36000) % 360;
  } else if (planetKey === 'rahu') {
    currentLongDeg = (125.0445 - 0.0529538 * (currentJD - 2451545.0) - currentAyanamsa + 36000) % 360;
    isRetro = true;
  } else if (planetKey === 'ketu') {
    currentLongDeg = (125.0445 - 0.0529538 * (currentJD - 2451545.0) - currentAyanamsa + 180 + 36000) % 360;
    isRetro = true;
  } else {
    // For other celestial bodies (mercury, venus, mars, jupiter, saturn, uranus, neptune, earth, pluto)
    const validKey = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'].includes(planetKey)
      ? planetKey
      : 'earth';
    const helioPos = calculateHeliocentricPosition(validKey, currentJD);
    currentLongDeg = (helioPos.lDeg - currentAyanamsa + 360) % 360;

    // Estimate retrograde motion
    if (['jupiter', 'saturn'].includes(planetKey)) {
      const dayOfYear = Math.floor((currentJD - 2451545.0) % 365.25);
      isRetro = dayOfYear > 110 && dayOfYear < 230;
    } else if (planetKey === 'mercury') {
      const cyc = Math.floor((currentJD - 2451545.0) % 116);
      isRetro = cyc > 90;
    } else if (planetKey === 'mars') {
      const cyc = Math.floor((currentJD - 2451545.0) % 780);
      isRetro = cyc > 700;
    }
  }

  const currentZodiac = getZodiacFromLongitude(currentLongDeg);
  const currentPlanetSignIdx = ZODIAC_METADATA.findIndex((z) => z.name === currentZodiac.sign);

  // 4. Calculate Gochara Houses
  const houseFromMoon = ((currentPlanetSignIdx - (natalMoonSignIdx >= 0 ? natalMoonSignIdx : 0) + 12) % 12) + 1;
  const houseFromLagna = ((currentPlanetSignIdx - (natalLagnaSignIdx >= 0 ? natalLagnaSignIdx : 0) + 12) % 12) + 1;

  const auspiciousHouses = AUSPICIOUS_MOON_HOUSES[body.id] || [1, 3, 5, 9, 11];
  const isMoonHouseAuspicious = auspiciousHouses.includes(houseFromMoon);

  // Special Transit Phases (e.g., Sade Sati, Kantaka Shani, Guru Kripa)
  let specialTransitPhase: string | undefined = undefined;
  if (body.id === 'saturn') {
    if (houseFromMoon === 12) specialTransitPhase = '🪐 Sade Sati: Rising / Rising Phase (द्वादश शनि)';
    else if (houseFromMoon === 1) specialTransitPhase = '🪐 Sade Sati: Peak / Janma Shani (जन्म शनि)';
    else if (houseFromMoon === 2) specialTransitPhase = '🪐 Sade Sati: Setting Phase (द्वितीय शनि)';
    else if (houseFromMoon === 4 || houseFromMoon === 8) specialTransitPhase = '⚡ Kantaka / Ashtama Shani (अष्टम/कंटक शनि)';
    else if (houseFromMoon === 3 || houseFromMoon === 6 || houseFromMoon === 11) specialTransitPhase = '🏆 Shani Digvijay: Victory over Adversity (त्रिक-विजय शनि)';
  } else if (body.id === 'jupiter') {
    if ([1, 5, 9].includes(houseFromMoon)) specialTransitPhase = '✨ Guru Trikona Kripa Yog: Supreme Divine Grace & Intellect';
    else if (houseFromMoon === 11) specialTransitPhase = '💰 Guru Labha Kripa: Massive Expansion & Wealth Gains';
    else if (houseFromMoon === 7) specialTransitPhase = '💍 Guru Kalatra Kripa: Partnership & Sacred Union Blessing';
  } else if (body.id === 'sun' && [10, 11].includes(houseFromMoon)) {
    specialTransitPhase = '👑 Surya Digbala / Karma Rajya: Sovereign Authority & Leadership Surge';
  } else if (body.id === 'mars' && [3, 6, 11].includes(houseFromMoon)) {
    specialTransitPhase = '🔥 Mangala Shaurya: Fearless Energy & Conquest of Obstacles';
  }

  // 5. Maitri (Planetary Friendship Calculation)
  const normLord = (lordStr: string) => {
    const l = lordStr.toLowerCase();
    if (l.includes('sun')) return 'sun';
    if (l.includes('moon')) return 'moon';
    if (l.includes('mars')) return 'mars';
    if (l.includes('mercury')) return 'mercury';
    if (l.includes('jupiter')) return 'jupiter';
    if (l.includes('venus')) return 'venus';
    if (l.includes('saturn')) return 'saturn';
    if (l.includes('rahu')) return 'rahu';
    if (l.includes('ketu')) return 'ketu';
    return 'sun';
  };

  const getFriendshipWith = (targetLord: string): FriendshipStatus => {
    const pId = body.id;
    const lKey = normLord(targetLord);
    if (pId === lKey) return 'Great Friend';
    const rel = NATURAL_FRIENDSHIPS[pId];
    if (!rel) return 'Neutral';
    if (rel.friends.includes(lKey)) return 'Friend';
    if (rel.enemies.includes(lKey)) return 'Enemy';
    return 'Neutral';
  };

  const friendWithMoonLord = getFriendshipWith(natalMoonLord);
  const friendWithLagnaLord = getFriendshipWith(natalLagnaLord);

  let compositeMaitri: FriendshipStatus = 'Neutral';
  if (friendWithMoonLord === 'Great Friend' || friendWithLagnaLord === 'Great Friend') compositeMaitri = 'Great Friend';
  else if (friendWithMoonLord === 'Friend' && friendWithLagnaLord === 'Friend') compositeMaitri = 'Great Friend';
  else if (friendWithMoonLord === 'Friend' || friendWithLagnaLord === 'Friend') compositeMaitri = 'Friend';
  else if (friendWithMoonLord === 'Enemy' && friendWithLagnaLord === 'Enemy') compositeMaitri = 'Great Enemy';
  else if (friendWithMoonLord === 'Enemy' || friendWithLagnaLord === 'Enemy') compositeMaitri = 'Enemy';
  else compositeMaitri = 'Neutral';

  // 6. Vedic Drishti / Aspect Connections
  const aspects: VedicAspectInfo[] = [];

  // Check 7th house aspect (Standard for all planets)
  const oppositeSignIdx = (currentPlanetSignIdx + 6) % 12;
  const oppositeSign = ZODIAC_METADATA[oppositeSignIdx].name;
  if (oppositeSign === natalMoonSign) {
    aspects.push({
      aspectType: '7th Full Samasaptaka Aspect (समसप्तक दृष्टि)',
      targetTarget: 'Natal Moon (Janma Rashi)',
      targetDegree: formatDegreeMinutes(currentZodiac.degreeInSign),
      orb: 2.4,
      nature: body.id === 'jupiter' || body.id === 'venus' ? 'Auspicious' : 'Challenging',
      interpretation: `The current transit directly glances across the cosmic diameter to energize your Natal Moon in ${natalMoonSign}, heightening emotional perception.`,
    });
  }
  if (oppositeSign === natalLagnaSign) {
    aspects.push({
      aspectType: '7th Full Mutual Aspect (लग्न दृष्टि)',
      targetTarget: 'Natal Lagna (Ascendant)',
      targetDegree: formatDegreeMinutes(currentZodiac.degreeInSign),
      orb: 1.8,
      nature: 'Empowering',
      interpretation: `Casts direct 7th house illumination upon your Ascendant (${natalLagnaSign}), influencing vital energy and outward life trajectory.`,
    });
  }

  // Special Aspects: Mars (4th, 8th), Jupiter (5th, 9th), Saturn (3rd, 10th), Rahu/Ketu (5th, 9th)
  if (body.id === 'mars') {
    const asp4 = (currentPlanetSignIdx + 3) % 12;
    const asp8 = (currentPlanetSignIdx + 7) % 12;
    if (ZODIAC_METADATA[asp4].name === natalMoonSign || ZODIAC_METADATA[asp4].name === natalLagnaSign) {
      aspects.push({
        aspectType: '4th Special Kinetic Aspect (चतुर्थ दृष्टि)',
        targetTarget: ZODIAC_METADATA[asp4].name === natalMoonSign ? 'Natal Moon' : 'Natal Lagna',
        targetDegree: 'Full Strength (100% Rupa)',
        orb: 3.1,
        nature: 'Transformative',
        interpretation: 'Directs vigorous Martian drive and bold kinetic ambition toward your core foundation.',
      });
    }
    if (ZODIAC_METADATA[asp8].name === natalMoonSign || ZODIAC_METADATA[asp8].name === natalLagnaSign) {
      aspects.push({
        aspectType: '8th Special Occult Aspect (अष्टम दृष्टि)',
        targetTarget: ZODIAC_METADATA[asp8].name === natalMoonSign ? 'Natal Moon' : 'Natal Lagna',
        targetDegree: 'Deep Penetrating',
        orb: 2.0,
        nature: 'Transformative',
        interpretation: 'Pierces through deep subconscious blocks to unlock hidden resilience and willpower.',
      });
    }
  } else if (body.id === 'jupiter') {
    const asp5 = (currentPlanetSignIdx + 4) % 12;
    const asp9 = (currentPlanetSignIdx + 8) % 12;
    if (ZODIAC_METADATA[asp5].name === natalMoonSign || ZODIAC_METADATA[asp5].name === natalLagnaSign) {
      aspects.push({
        aspectType: '5th Sacred Trikona Aspect (पंचम अमृत दृष्टि)',
        targetTarget: ZODIAC_METADATA[asp5].name === natalMoonSign ? 'Natal Moon' : 'Natal Lagna',
        targetDegree: '100% Amrita Drishti',
        orb: 1.5,
        nature: 'Auspicious',
        interpretation: 'Blesses your intellect, creative spark, and Purva Punya with supreme Jupiterian clarity.',
      });
    }
    if (ZODIAC_METADATA[asp9].name === natalMoonSign || ZODIAC_METADATA[asp9].name === natalLagnaSign) {
      aspects.push({
        aspectType: '9th Supreme Dharma Aspect (नवम भाग्य दृष्टि)',
        targetTarget: ZODIAC_METADATA[asp9].name === natalMoonSign ? 'Natal Moon' : 'Natal Lagna',
        targetDegree: '100% Dharma Drishti',
        orb: 2.2,
        nature: 'Auspicious',
        interpretation: 'Awakens higher fortune, spiritual protection, and auspicious mentor guidance.',
      });
    }
  } else if (body.id === 'saturn') {
    const asp3 = (currentPlanetSignIdx + 2) % 12;
    const asp10 = (currentPlanetSignIdx + 9) % 12;
    if (ZODIAC_METADATA[asp3].name === natalMoonSign || ZODIAC_METADATA[asp3].name === natalLagnaSign) {
      aspects.push({
        aspectType: '3rd Parakrama Drishti (तृतीय दृष्टि)',
        targetTarget: ZODIAC_METADATA[asp3].name === natalMoonSign ? 'Natal Moon' : 'Natal Lagna',
        targetDegree: 'Karmic Focus',
        orb: 2.7,
        nature: 'Empowering',
        interpretation: 'Demands disciplined effort, patience, and rigorous focus in daily communications and initiatives.',
      });
    }
    if (ZODIAC_METADATA[asp10].name === natalMoonSign || ZODIAC_METADATA[asp10].name === natalLagnaSign) {
      aspects.push({
        aspectType: '10th Karma Drishti (दशम दृष्टि)',
        targetTarget: ZODIAC_METADATA[asp10].name === natalMoonSign ? 'Natal Moon' : 'Natal Lagna',
        targetDegree: 'Highest Authority Demand',
        orb: 1.9,
        nature: 'Challenging',
        interpretation: 'Enforces accountability, long-term mastery, and structural re-engineering of career aspirations.',
      });
    }
  }

  // If no direct aspect was triggered, add general transit angle aspect
  if (aspects.length === 0) {
    const angle = Math.abs(currentPlanetSignIdx - natalMoonSignIdx) * 30;
    aspects.push({
      aspectType: `${angle}° Angle Planetary Wave`,
      targetTarget: `Natal Moon in ${natalMoonSign}`,
      targetDegree: `${formatDegreeMinutes(currentZodiac.degreeInSign)} vs ${natalMoonSign}`,
      orb: 3.5,
      nature: isMoonHouseAuspicious ? 'Auspicious' : 'Empowering',
      interpretation: `Operates through the ${houseFromMoon}th Bhava resonance field relative to your birth Moon.`,
    });
  }

  // 7. Elemental Harmony
  const planetElem = currentZodiac.element;
  const moonElem = ZODIAC_METADATA.find((z) => z.name === natalMoonSign)?.element || 'Water';
  const lagnaElem = ZODIAC_METADATA.find((z) => z.name === natalLagnaSign)?.element || 'Fire';

  let elemComp: VedicCompatibilityResult['elementHarmony']['elementalCompatibility'] = 'Constructive Harmony';
  let elemDesc = 'Elements harmonize smoothly, supporting stable intellectual and biological vitality.';

  if (planetElem === moonElem || planetElem === lagnaElem) {
    elemComp = 'Supreme Flow';
    elemDesc = `Shared ${planetElem} element accelerates vibrational synchronization, amplifying intuitive alignment.`;
  } else if ((planetElem === 'Fire' && moonElem === 'Air') || (planetElem === 'Air' && moonElem === 'Fire')) {
    elemComp = 'Supreme Flow';
    elemDesc = 'Fire and Air kindle inventive enthusiasm, swift breakthroughs, and expressive creativity.';
  } else if ((planetElem === 'Earth' && moonElem === 'Water') || (planetElem === 'Water' && moonElem === 'Earth')) {
    elemComp = 'Supreme Flow';
    elemDesc = 'Earth and Water create fertile soil for grounded manifest abundance and emotional tranquility.';
  } else if ((planetElem === 'Fire' && moonElem === 'Water') || (planetElem === 'Water' && moonElem === 'Fire')) {
    elemComp = 'Alchemical Growth';
    elemDesc = 'Fire and Water create transformative alchemical steam—awakening passionate willpower through emotional discipline.';
  } else if ((planetElem === 'Air' && moonElem === 'Earth') || (planetElem === 'Earth' && moonElem === 'Air')) {
    elemComp = 'Dynamic Friction';
    elemDesc = 'Air and Earth require conscious grounding practices to materialize high-speed mental ideation into physical form.';
  }

  // 8. Calculate Composite Compatibility Score (0 - 100)
  let score = 50;

  // Transit house from Moon (Weight: 35)
  if (isMoonHouseAuspicious) score += 25;
  else score -= 10;

  // Transit house from Lagna (Weight: 20)
  if ([1, 4, 5, 7, 9, 10, 11].includes(houseFromLagna)) score += 15;
  else if ([3, 6].includes(houseFromLagna)) score += 10;
  else score -= 5;

  // Friendship with Moon & Lagna Lord (Weight: 25)
  if (compositeMaitri === 'Great Friend') score += 20;
  else if (compositeMaitri === 'Friend') score += 12;
  else if (compositeMaitri === 'Neutral') score += 5;
  else if (compositeMaitri === 'Enemy') score -= 10;
  else if (compositeMaitri === 'Great Enemy') score -= 18;

  // Elemental Resonance (Weight: 10)
  if (elemComp === 'Supreme Flow') score += 10;
  else if (elemComp === 'Constructive Harmony') score += 6;
  else if (elemComp === 'Alchemical Growth') score += 4;
  else if (elemComp === 'Dynamic Friction') score += 1;

  // Resonance with user's learning resonance and active aura (Weight: 10)
  const aura = user?.activeAura || 'Calm Amber';
  if (body.teslaHarmonicNumber === 9 && aura.includes('Gold')) score += 8;
  else if (body.teslaHarmonicNumber === 6 && aura.includes('Emerald')) score += 8;
  else if (body.teslaHarmonicNumber === 3 && aura.includes('Amber')) score += 8;
  else score += 5;

  // Clamp score
  score = Math.max(18, Math.min(99, score));

  // Determine Grade & Verdict
  let grade: VedicCompatibilityResult['grade'] = 'MADHYAM (B)';
  let verdictTitle = 'Auspicious & Harmonious Transit (शुभ संरेखण)';
  let verdictDetailed = `The energetic wave of ${body.name} interacts favorably with ${userName}'s natal chart, fostering steady progress and mental clarity.`;

  if (score >= 88) {
    grade = 'PARAM SHUBHA (A+)';
    verdictTitle = 'Param Shubha Celestial Alignment (परम शुभ योग)';
    verdictDetailed = `${body.name}'s current celestial position creates a rare harmonic resonance with ${userName}'s Janma Rashi (${natalMoonSign}) and Lagna (${natalLagnaSign}), unlocking amplified breakthroughs, supreme grace, and spiritual elevation.`;
  } else if (score >= 75) {
    grade = 'SHUBHA (A)';
    verdictTitle = 'High Karmic Blessing & Growth (शुभ गोचर)';
    verdictDetailed = `Strong positive cosmic current radiating from ${body.name}. Auspicious for launching creative enterprises, cementing alliances, and channeling higher intuitive discernment.`;
  } else if (score >= 60) {
    grade = 'MADHYAM (B)';
    verdictTitle = 'Constructive Equilibrium (मध्यम अनुकूलता)';
    verdictDetailed = `Balanced transit dynamic. While progress is steady, aligning with the prescribed Vedic sound frequency and gemstone remedies will optimize output.`;
  } else if (score >= 45) {
    grade = 'MISHRIT (C)';
    verdictTitle = 'Mishrit Yog: Dynamic Karmic Calibration (मिश्रित योग)';
    verdictDetailed = `Mixed energetic currents. Demands conscious grounding, mindful speech, and focused mantra chanting to transmute friction into spiritual maturity.`;
  } else {
    grade = 'KATHIN (D)';
    verdictTitle = 'Karmic Crucible & Purification (तपस्या संरेखण)';
    verdictDetailed = `Intense testing transit. Treat this cycle as a profound spiritual furnace for purifying old samskaras, practicing patience, and anchoring in the sacred remedies.`;
  }

  // 9. Fetch Remedies
  const remedy = VEDIC_REMEDIES[body.id] || VEDIC_REMEDIES.sun;

  // 10. Construct Final Result
  const moonHouseInfo = HOUSE_MEANINGS[houseFromMoon] || { title: `${houseFromMoon}th House`, desc: 'Active energetic sector.' };
  const lagnaHouseInfo = HOUSE_MEANINGS[houseFromLagna] || { title: `${houseFromLagna}th House`, desc: 'Active energetic sector.' };

  return {
    planetId: body.id,
    planetName: body.name,
    planetSanskrit: body.sanskritName || body.name,
    vedicGrahaTitle: body.vedicGraha || `${body.name} Graha`,
    currentTransitDate: targetDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    currentTransit: {
      sign: currentZodiac.sign,
      signSanskrit: currentZodiac.sanskritSign,
      symbol: currentZodiac.symbol,
      degree: currentZodiac.degreeInSign,
      formattedDegree: currentZodiac.formattedDegree,
      eclipticLongitude: currentLongDeg,
      nakshatra: currentZodiac.nakshatra,
      nakshatraLord: currentZodiac.nakshatraLord,
      pada: currentZodiac.pada,
      element: currentZodiac.element,
      isRetrograde: isRetro,
      speedStatus: isRetro ? 'Slow / Stationary' : 'Normal',
    },
    userNatal: {
      userName,
      birthDate,
      birthTime,
      birthCity,
      lagnaSign: natalLagnaSign,
      lagnaSanskrit: natalLagnaSanskrit,
      lagnaLord: natalLagnaLord,
      moonSign: natalMoonSign,
      moonSanskrit: natalMoonSanskrit,
      moonNakshatra: natalData.nakshatra || 'Rohini',
      moonLord: natalMoonLord,
      sunSign: natalData.sunSign,
      natalPlanetPosition: natalPlanetPos,
    },
    gochara: {
      houseFromMoon,
      houseFromLagna,
      moonHouseAuspicious: isMoonHouseAuspicious,
      moonHouseTitle: `${houseFromMoon}th Bhava from Natal Moon (${natalMoonSign})`,
      moonHouseEffect: moonHouseInfo.desc,
      lagnaHouseTitle: `${houseFromLagna}th Bhava from Ascendant (${natalLagnaSign})`,
      lagnaHouseEffect: lagnaHouseInfo.desc,
      specialTransitPhase,
    },
    friendship: {
      withMoonLord: friendWithMoonLord,
      withLagnaLord: friendWithLagnaLord,
      compositeMaitri,
      summary: `${body.name} holds ${compositeMaitri} rapport with your chart rulers (${natalLagnaLord} & ${natalMoonLord}).`,
    },
    aspects,
    elementHarmony: {
      planetElement: planetElem,
      moonElement: moonElem,
      lagnaElement: lagnaElem,
      elementalCompatibility: elemComp,
      description: elemDesc,
    },
    overallCompatibilityScore: score,
    grade,
    verdictTitle,
    verdictDetailed,
    remedy,
  };
}
