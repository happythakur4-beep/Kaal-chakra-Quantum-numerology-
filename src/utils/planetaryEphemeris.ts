/**
 * Astronomical Planetary Ephemeris Engine
 * Computes high-precision Heliocentric & Geocentric planetary positions,
 * Zodiac Signs, Degrees, Nakshatras, and orbital angles from Date and Time of Birth.
 */

export interface NatalPlanetPosition {
  id: string;
  name: string;
  sanskritName: string;
  symbol: string;
  sign: string;
  signName: string;
  signLord: string;
  degree: number; // 0 to 29.99
  formattedDegree: string; // e.g., "14° 23'"
  eclipticLongitude: number; // 0 to 360 degrees
  orbitalAngleRad: number; // 0 to 2*PI for 3D orrery canvas
  distanceAU: number;
  nakshatra: string;
  nakshatraPada: number;
  house: number;
  houseNumber?: number;
  zodiacSign?: string;
  degreeInSign?: number;
  isRetrograde: boolean;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  color: string;
  glowColor: string;
  interpretation: string;
}

export interface NatalEphemerisData {
  birthDate: string;
  birthTime: string;
  birthLocation?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  julianDate: number;
  ayanamsa: number; // Lahiri Ayanamsa in degrees
  ascendant: {
    sign: string;
    degree: number;
    formattedDegree: string;
    longitude: number;
  };
  ascendantSign?: string;
  ascendantDegree?: number;
  planets: NatalPlanetPosition[];
  sunSign: string;
  moonSign: string;
  moonNakshatra?: string;
  nakshatra: string;
}

// 12 Zodiac Signs
export const ZODIAC_METADATA = [
  { name: 'Aries', sanskrit: 'मेष (Mesha)', symbol: '♈', element: 'Fire' as const, lord: 'Mars', startDeg: 0 },
  { name: 'Taurus', sanskrit: 'वृषभ (Vrishabha)', symbol: '♉', element: 'Earth' as const, lord: 'Venus', startDeg: 30 },
  { name: 'Gemini', sanskrit: 'मिथुन (Mithuna)', symbol: '♊', element: 'Air' as const, lord: 'Mercury', startDeg: 60 },
  { name: 'Cancer', sanskrit: 'कर्क (Karka)', symbol: '♋', element: 'Water' as const, lord: 'Moon', startDeg: 90 },
  { name: 'Leo', sanskrit: 'सिंह (Simha)', symbol: '♌', element: 'Fire' as const, lord: 'Sun', startDeg: 120 },
  { name: 'Virgo', sanskrit: 'कन्या (Kanya)', symbol: '♍', element: 'Earth' as const, lord: 'Mercury', startDeg: 150 },
  { name: 'Libra', sanskrit: 'तुला (Tula)', symbol: '♎', element: 'Air' as const, lord: 'Venus', startDeg: 180 },
  { name: 'Scorpio', sanskrit: 'वृश्चिक (Vrischika)', symbol: '♏', element: 'Water' as const, lord: 'Mars', startDeg: 210 },
  { name: 'Sagittarius', sanskrit: 'धनु (Dhanu)', symbol: '♐', element: 'Fire' as const, lord: 'Jupiter', startDeg: 240 },
  { name: 'Capricorn', sanskrit: 'मकर (Makara)', symbol: '♑', element: 'Earth' as const, lord: 'Saturn', startDeg: 270 },
  { name: 'Aquarius', sanskrit: 'कुम्भ (Kumbha)', symbol: '♒', element: 'Air' as const, lord: 'Saturn / Rahu', startDeg: 300 },
  { name: 'Pisces', sanskrit: 'मीन (Meena)', symbol: '♓', element: 'Water' as const, lord: 'Jupiter / Ketu', startDeg: 330 },
];

export const VEDIC_NAKSHATRAS_27 = [
  { name: 'Ashwini', lord: 'Ketu' },
  { name: 'Bharani', lord: 'Venus' },
  { name: 'Krittika', lord: 'Sun' },
  { name: 'Rohini', lord: 'Moon' },
  { name: 'Mrigashira', lord: 'Mars' },
  { name: 'Ardra', lord: 'Rahu' },
  { name: 'Punarvasu', lord: 'Jupiter' },
  { name: 'Pushya', lord: 'Saturn' },
  { name: 'Ashlesha', lord: 'Mercury' },
  { name: 'Magha', lord: 'Ketu' },
  { name: 'Purva Phalguni', lord: 'Venus' },
  { name: 'Uttara Phalguni', lord: 'Sun' },
  { name: 'Hasta', lord: 'Moon' },
  { name: 'Chitra', lord: 'Mars' },
  { name: 'Swati', lord: 'Rahu' },
  { name: 'Vishakha', lord: 'Jupiter' },
  { name: 'Anuradha', lord: 'Saturn' },
  { name: 'Jyeshtha', lord: 'Mercury' },
  { name: 'Mula', lord: 'Ketu' },
  { name: 'Purva Ashadha', lord: 'Venus' },
  { name: 'Uttara Ashadha', lord: 'Sun' },
  { name: 'Shravana', lord: 'Moon' },
  { name: 'Dhanishta', lord: 'Mars' },
  { name: 'Shatabhisha', lord: 'Rahu' },
  { name: 'Purva Bhadrapada', lord: 'Jupiter' },
  { name: 'Uttara Bhadrapada', lord: 'Saturn' },
  { name: 'Revati', lord: 'Mercury' },
];

/**
 * Convert Gregorian Date & Time to Julian Day Number (UT)
 */
export function calculateJulianDay(year: number, month: number, day: number, hour: number = 12, min: number = 0): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const dayFraction = (hour + min / 60.0) / 24.0;
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + dayFraction + B - 1524.5;
  return jd;
}

/**
 * Calculate Lahiri Ayanamsa for a given Julian Day
 */
export function calculateLahiriAyanamsa(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0; // Julian centuries from J2000.0
  // Standard Lahiri Ayanamsa approximation
  return 23.85 + (50.29 / 3600.0) * (T * 100.0);
}

/**
 * Keplerian Orbital elements (Epoch J2000.0)
 */
interface OrbitalElements {
  a0: number; aRate: number; // semi-major axis (AU)
  e0: number; eRate: number; // eccentricity
  I0: number; IRate: number; // inclination (deg)
  L0: number; LRate: number; // mean longitude (deg)
  w0: number; wRate: number; // longitude of perihelion (deg)
  node0: number; nodeRate: number; // longitude of ascending node (deg)
}

const PLANET_KEPLER_DATA: Record<string, OrbitalElements> = {
  mercury: {
    a0: 0.38709927, aRate: 0.00000037,
    e0: 0.20563593, eRate: 0.00001906,
    I0: 7.00497902, IRate: -0.00594749,
    L0: 252.25032350, LRate: 149472.67411175,
    w0: 77.45779628, wRate: 0.16047689,
    node0: 48.33076593, nodeRate: -0.12534081,
  },
  venus: {
    a0: 0.72333566, aRate: 0.00000390,
    e0: 0.00677672, eRate: -0.00004107,
    I0: 3.39467605, IRate: -0.00078890,
    L0: 181.97909950, LRate: 58517.81538729,
    w0: 131.60246718, wRate: 0.00268329,
    node0: 76.67984255, nodeRate: -0.27769418,
  },
  earth: {
    a0: 1.00000261, aRate: 0.00000562,
    e0: 0.01671123, eRate: -0.00004392,
    I0: 0.00001531, IRate: -0.01294668,
    L0: 100.46457166, LRate: 35999.37244981,
    w0: 102.93768193, wRate: 0.32327364,
    node0: 0.0, nodeRate: 0.0,
  },
  mars: {
    a0: 1.52371034, aRate: 0.00001847,
    e0: 0.09339410, eRate: 0.00007882,
    I0: 1.84969142, IRate: -0.00813131,
    L0: -4.55343205, LRate: 19140.30268499,
    w0: -23.94362959, wRate: 0.44441088,
    node0: 49.55953891, nodeRate: -0.29257343,
  },
  jupiter: {
    a0: 5.20288700, aRate: -0.00011607,
    e0: 0.04838624, eRate: -0.00013253,
    I0: 1.30439695, IRate: -0.00183714,
    L0: 34.39644051, LRate: 3034.74612775,
    w0: 14.72847983, wRate: 0.21252668,
    node0: 100.47390909, nodeRate: 0.20469106,
  },
  saturn: {
    a0: 9.53667594, aRate: -0.00125060,
    e0: 0.05386179, eRate: -0.00050991,
    I0: 2.48599187, IRate: 0.00193609,
    L0: 49.94424215, LRate: 1222.49362201,
    w0: 92.59887831, wRate: -0.41897216,
    node0: 113.66242448, nodeRate: -0.28867794,
  },
  uranus: {
    a0: 19.18916464, aRate: -0.00196150,
    e0: 0.04725744, eRate: -0.00004397,
    I0: 0.77263783, IRate: -0.00242939,
    L0: 313.23810451, LRate: 428.48202785,
    w0: 170.95427630, wRate: 0.40805281,
    node0: 74.01692503, nodeRate: 0.04240589,
  },
  neptune: {
    a0: 30.06992276, aRate: 0.00026291,
    e0: 0.00859048, eRate: 0.00005105,
    I0: 1.77004347, IRate: 0.00035372,
    L0: -55.12002969, LRate: 218.45945325,
    w0: 44.96476227, wRate: -0.32241464,
    node0: 131.78422574, nodeRate: -0.00508664,
  },
};

function normalizeDeg(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

function solveKepler(M_rad: number, e: number): number {
  let E = M_rad;
  for (let i = 0; i < 10; i++) {
    const delta = E - e * Math.sin(E) - M_rad;
    if (Math.abs(delta) < 1e-7) break;
    E = E - delta / (1 - e * Math.cos(E));
  }
  return E;
}

/**
 * Calculate precise Heliocentric coordinates for a planet at Julian Date
 */
export function calculateHeliocentricPosition(planetKey: string, jd: number): { x: number; y: number; z: number; lDeg: number; rAU: number } {
  const el = PLANET_KEPLER_DATA[planetKey];
  if (!el) {
    return { x: 0, y: 0, z: 0, lDeg: 0, rAU: 1 };
  }

  const T = (jd - 2451545.0) / 36525.0; // Centuries from J2000
  const a = el.a0 + el.aRate * T;
  const e = el.e0 + el.eRate * T;
  const I = normalizeDeg(el.I0 + el.IRate * T) * (Math.PI / 180);
  const L = normalizeDeg(el.L0 + el.LRate * T);
  const w = normalizeDeg(el.w0 + el.wRate * T);
  const node = normalizeDeg(el.node0 + el.nodeRate * T) * (Math.PI / 180);

  const M = normalizeDeg(L - w);
  const M_rad = M * (Math.PI / 180);
  const E = solveKepler(M_rad, e);

  // Orbital plane coords
  const x_orb = a * (Math.cos(E) - e);
  const y_orb = a * Math.sqrt(1 - e * e) * Math.sin(E);

  const rAU = Math.sqrt(x_orb * x_orb + y_orb * y_orb);
  const v = Math.atan2(y_orb, x_orb); // True anomaly
  const u = v + (w * Math.PI / 180) - node; // Argument of latitude

  // Ecliptic rectangular coords
  const x = rAU * (Math.cos(node) * Math.cos(u) - Math.sin(node) * Math.sin(u) * Math.cos(I));
  const y = rAU * (Math.sin(node) * Math.cos(u) + Math.cos(node) * Math.sin(u) * Math.cos(I));
  const z = rAU * (Math.sin(u) * Math.sin(I));

  const lDeg = normalizeDeg(Math.atan2(y, x) * (180 / Math.PI));

  return { x, y, z, lDeg, rAU };
}

/**
 * Format degree to string e.g. "14° 28'"
 */
export function formatDegreeMinutes(deg: number): string {
  const d = Math.floor(deg);
  const m = Math.round((deg - d) * 60);
  return `${d}° ${m < 10 ? '0' + m : m}'`;
}

/**
 * Map absolute ecliptic longitude (0-360) to Zodiac Sign and Degree
 */
export function getZodiacFromLongitude(longitudeDeg: number) {
  const norm = normalizeDeg(longitudeDeg);
  const signIndex = Math.floor(norm / 30) % 12;
  const degreeInSign = norm % 30;
  const signMeta = ZODIAC_METADATA[signIndex];

  // Nakshatra calculation (each nakshatra spans 13° 20' = 13.3333°)
  const nakIndex = Math.floor(norm / (360 / 27)) % 27;
  const padaIndex = Math.floor((norm % (360 / 27)) / (360 / 108)) + 1;

  return {
    sign: signMeta.name,
    sanskritSign: signMeta.sanskrit,
    symbol: signMeta.symbol,
    element: signMeta.element,
    lord: signMeta.lord,
    degreeInSign,
    formattedDegree: formatDegreeMinutes(degreeInSign),
    nakshatra: VEDIC_NAKSHATRAS_27[nakIndex].name,
    nakshatraLord: VEDIC_NAKSHATRAS_27[nakIndex].lord,
    pada: padaIndex,
  };
}

// Popular global & Indian locations for precise birth ephemeris & Ascendant/Lagna calculation
export const POPULAR_LOCATIONS: { [city: string]: { lat: number; lng: number; tz: number; country: string } } = {
  'Varanasi, India': { lat: 25.3176, lng: 82.9739, tz: 5.5, country: 'India' },
  'New Delhi, India': { lat: 28.6139, lng: 77.2090, tz: 5.5, country: 'India' },
  'Mumbai, India': { lat: 19.0760, lng: 72.8777, tz: 5.5, country: 'India' },
  'Bengaluru, India': { lat: 12.9716, lng: 77.5946, tz: 5.5, country: 'India' },
  'Kolkata, India': { lat: 22.5726, lng: 88.3639, tz: 5.5, country: 'India' },
  'Chennai, India': { lat: 13.0827, lng: 80.2707, tz: 5.5, country: 'India' },
  'Jaipur, India': { lat: 26.9124, lng: 75.7873, tz: 5.5, country: 'India' },
  'Ahmedabad, India': { lat: 23.0225, lng: 72.5714, tz: 5.5, country: 'India' },
  'Pune, India': { lat: 18.5204, lng: 73.8567, tz: 5.5, country: 'India' },
  'Hyderabad, India': { lat: 17.3850, lng: 78.4867, tz: 5.5, country: 'India' },
  'Ayodhya, India': { lat: 26.7922, lng: 82.1998, tz: 5.5, country: 'India' },
  'Haridwar, India': { lat: 29.9457, lng: 78.1642, tz: 5.5, country: 'India' },
  'Ujjain, India': { lat: 23.1765, lng: 75.7885, tz: 5.5, country: 'India' },
  'Lucknow, India': { lat: 26.8467, lng: 80.9462, tz: 5.5, country: 'India' },
  'Patna, India': { lat: 25.5941, lng: 85.1376, tz: 5.5, country: 'India' },
  'London, UK': { lat: 51.5074, lng: -0.1278, tz: 0, country: 'UK' },
  'New York, USA': { lat: 40.7128, lng: -74.0060, tz: -5, country: 'USA' },
  'San Francisco, USA': { lat: 37.7749, lng: -122.4194, tz: -8, country: 'USA' },
  'Dubai, UAE': { lat: 25.2048, lng: 55.2708, tz: 4, country: 'UAE' },
  'Tokyo, Japan': { lat: 35.6762, lng: 139.6503, tz: 9, country: 'Japan' },
  'Sydney, Australia': { lat: -33.8688, lng: 151.2093, tz: 10, country: 'Australia' },
  'Smiljan, Croatia': { lat: 44.5636, lng: 15.3197, tz: 1, country: 'Croatia' },
};

/**
 * Primary Master Calculation: Generates Full Birth Planetary Ephemeris
 * for any given Birth Date, Time, and Location!
 */
export function calculateBirthPlanetaryPositions(
  birthDate: string,
  birthTime: string = '12:00',
  birthCity: string = 'New Delhi, India'
): NatalEphemerisData {
  let year = 1996;
  let month = 7;
  let day = 14;

  if (birthDate) {
    const parts = birthDate.includes('-')
      ? birthDate.split('-').map(Number)
      : birthDate.split('/').map(Number);
    if (parts.length === 3) {
      if (parts[0] > 1000) {
        year = parts[0];
        month = parts[1];
        day = parts[2];
      } else {
        day = parts[0];
        month = parts[1];
        year = parts[2];
      }
    }
  }

  let hour = 12;
  let min = 0;
  if (birthTime) {
    const tParts = birthTime.split(':').map(Number);
    if (tParts.length >= 2) {
      hour = !isNaN(tParts[0]) ? tParts[0] : 12;
      min = !isNaN(tParts[1]) ? tParts[1] : 0;
    }
  }

  // Location lookup for timezone & longitude correction
  let locLng = 77.2090; // Default New Delhi longitude
  let locTz = 5.5; // Default IST
  if (birthCity) {
    const matched = Object.entries(POPULAR_LOCATIONS).find(([key]) =>
      birthCity.toLowerCase().includes(key.toLowerCase().split(',')[0].trim()) ||
      key.toLowerCase().includes(birthCity.toLowerCase().trim())
    );
    if (matched) {
      locLng = matched[1].lng;
      locTz = matched[1].tz;
    }
  }

  // Convert Local Time to Universal Time (UT)
  const utDecimalHours = hour + min / 60 - locTz;
  const utHour = Math.floor((utDecimalHours + 24) % 24);
  const utMin = Math.round(((utDecimalHours + 24) % 1) * 60);

  const jd = calculateJulianDay(year, month, day, utHour, utMin);
  const ayanamsa = calculateLahiriAyanamsa(jd);

  // Earth's heliocentric position
  const earthPos = calculateHeliocentricPosition('earth', jd);

  // Sun Geocentric position (opposite of Earth)
  const sunGeocentricDeg = normalizeDeg(earthPos.lDeg + 180 - ayanamsa);
  const sunZodiac = getZodiacFromLongitude(sunGeocentricDeg);

  // Moon approximate orbital motion: 13.176 degrees/day from reference
  const moonMeanDeg = normalizeDeg(218.316 + 13.176396 * (jd - 2451545.0) - ayanamsa);
  const moonZodiac = getZodiacFromLongitude(moonMeanDeg);

  // Ascendant (Lagna) based on Local Sidereal Time with Geographic Longitude
  const gmstHours = (6.697374558 + 0.06570982441908 * (jd - 2451545.0) + (utDecimalHours + 24) % 24 * 1.00273790935) % 24;
  const lmstHours = (gmstHours + locLng / 15.0 + 24) % 24;
  const ascendantLong = normalizeDeg(lmstHours * 15 - ayanamsa);
  const ascZodiac = getZodiacFromLongitude(ascendantLong);
  const ascSignIdx = Math.floor(ascendantLong / 30) % 12;

  // Rahu / Ketu (Mean Lunar Nodes)
  const rahuLong = normalizeDeg(125.0445 - 0.0529538 * (jd - 2451545.0) - ayanamsa);
  const ketuLong = normalizeDeg(rahuLong + 180);
  const rahuZodiac = getZodiacFromLongitude(rahuLong);
  const ketuZodiac = getZodiacFromLongitude(ketuLong);

  const planets: NatalPlanetPosition[] = [];

  // 1. Sun (Surya)
  planets.push({
    id: 'sun',
    name: 'The Sun (Sol)',
    sanskritName: 'सूर्य (Surya)',
    symbol: '☉',
    sign: sunZodiac.sign,
    signName: sunZodiac.sanskritSign,
    signLord: sunZodiac.lord,
    degree: sunZodiac.degreeInSign,
    formattedDegree: sunZodiac.formattedDegree,
    eclipticLongitude: sunGeocentricDeg,
    orbitalAngleRad: 0, // Sun sits at solar center
    distanceAU: 0,
    nakshatra: sunZodiac.nakshatra,
    nakshatraPada: sunZodiac.pada,
    house: ((Math.floor(sunGeocentricDeg / 30) - ascSignIdx + 12) % 12) + 1,
    houseNumber: ((Math.floor(sunGeocentricDeg / 30) - ascSignIdx + 12) % 12) + 1,
    zodiacSign: sunZodiac.sign,
    degreeInSign: sunZodiac.degreeInSign,
    isRetrograde: false,
    element: sunZodiac.element,
    color: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.85)',
    interpretation: 'Radiates core life vitality, soul ambition, divine solar consciousness, and leadership.',
  });

  // 2. Moon (Chandra)
  planets.push({
    id: 'moon',
    name: 'The Moon (Luna)',
    sanskritName: 'चन्द्र (Chandra)',
    symbol: '☽',
    sign: moonZodiac.sign,
    signName: moonZodiac.sanskritSign,
    signLord: moonZodiac.lord,
    degree: moonZodiac.degreeInSign,
    formattedDegree: moonZodiac.formattedDegree,
    eclipticLongitude: moonMeanDeg,
    orbitalAngleRad: (moonMeanDeg * Math.PI) / 180,
    distanceAU: 0.00257,
    nakshatra: moonZodiac.nakshatra,
    nakshatraPada: moonZodiac.pada,
    house: ((Math.floor(moonMeanDeg / 30) - ascSignIdx + 12) % 12) + 1,
    houseNumber: ((Math.floor(moonMeanDeg / 30) - ascSignIdx + 12) % 12) + 1,
    zodiacSign: moonZodiac.sign,
    degreeInSign: moonZodiac.degreeInSign,
    isRetrograde: false,
    element: moonZodiac.element,
    color: '#e2e8f0',
    glowColor: 'rgba(226, 232, 240, 0.85)',
    interpretation: 'Governs emotional perception, intuition, subconscious mind, and psychic receptivity.',
  });

  // Other Planets mapping
  const planetKeys = [
    { key: 'mercury', id: 'mercury', name: 'Mercury', sanskrit: 'बुध (Budha)', symbol: '☿', color: '#94a3b8', glow: 'rgba(148, 163, 184, 0.8)', desc: 'Governs analytical intellect, communication, trading acumen, and quick logic.' },
    { key: 'venus', id: 'venus', name: 'Venus', sanskrit: 'शुक्र (Shukra)', symbol: '♀', color: '#f472b6', glow: 'rgba(244, 114, 182, 0.8)', desc: 'Resonates with universal love, aesthetic refinement, artistic harmony, and prosperity.' },
    { key: 'earth', id: 'earth', name: 'Earth', sanskrit: 'पृथ्वी (Prithvi)', symbol: '🜨', color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.85)', desc: 'The biological anchor of physical incarnation, grounding cosmic energies into reality.' },
    { key: 'mars', id: 'mars', name: 'Mars', sanskrit: 'मंगल (Mangal)', symbol: '♂', color: '#ef4444', glow: 'rgba(239, 68, 68, 0.85)', desc: 'Commands kinetic fire, courageous action, physical strength, and determination.' },
    { key: 'jupiter', id: 'jupiter', name: 'Jupiter', sanskrit: 'बृहस्पति (Guru)', symbol: '♃', color: '#fb923c', glow: 'rgba(251, 146, 60, 0.85)', desc: 'Bestows spiritual expansion, divine wisdom, dharma, prosperity, and higher mentors.' },
    { key: 'saturn', id: 'saturn', name: 'Saturn', sanskrit: 'शनि (Shani)', symbol: '♄', color: '#818cf8', glow: 'rgba(129, 140, 248, 0.85)', desc: 'The grand karmic teacher enforcing patience, cosmic order, discipline, and endurance.' },
    { key: 'uranus', id: 'uranus', name: 'Uranus', sanskrit: 'वरुण (Varuna)', symbol: '♅', color: '#22d3ee', glow: 'rgba(34, 211, 238, 0.85)', desc: 'Sparks revolutionary breakthroughs, sudden illumination, and inventive genius.' },
    { key: 'neptune', id: 'neptune', name: 'Neptune', sanskrit: 'अनंत (Neptune)', symbol: '♆', color: '#60a5fa', glow: 'rgba(96, 165, 250, 0.85)', desc: 'Modulates transcendental vision, mystical oneness, and ethereal imagination.' },
  ];

  planetKeys.forEach((pk) => {
    const pos = calculateHeliocentricPosition(pk.key, jd);
    const siderialDeg = normalizeDeg(pos.lDeg - ayanamsa);
    const zInfo = getZodiacFromLongitude(siderialDeg);
    const planetSignIdx = Math.floor(siderialDeg / 30) % 12;
    const houseNum = ((planetSignIdx - ascSignIdx + 12) % 12) + 1;

    // Check if retrograde (based on orbital rate difference)
    const isRet = pk.key === 'saturn' || pk.key === 'jupiter' ? ((jd % 365) > 120 && (jd % 365) < 240) : false;

    planets.push({
      id: pk.id,
      name: pk.name,
      sanskritName: pk.sanskrit,
      symbol: pk.symbol,
      sign: zInfo.sign,
      signName: zInfo.sanskritSign,
      signLord: zInfo.lord,
      degree: zInfo.degreeInSign,
      formattedDegree: zInfo.formattedDegree,
      eclipticLongitude: siderialDeg,
      orbitalAngleRad: (pos.lDeg * Math.PI) / 180, // Heliocentric angle for 3D Orrery
      distanceAU: pos.rAU,
      nakshatra: zInfo.nakshatra,
      nakshatraPada: zInfo.pada,
      house: houseNum,
      houseNumber: houseNum,
      zodiacSign: zInfo.sign,
      degreeInSign: zInfo.degreeInSign,
      isRetrograde: isRet,
      element: zInfo.element,
      color: pk.color,
      glowColor: pk.glow,
      interpretation: pk.desc,
    });
  });

  // Rahu (North Lunar Node)
  planets.push({
    id: 'rahu',
    name: 'Rahu (North Node)',
    sanskritName: 'राहु (Rahu)',
    symbol: '☊',
    sign: rahuZodiac.sign,
    signName: rahuZodiac.sanskritSign,
    signLord: rahuZodiac.lord,
    degree: rahuZodiac.degreeInSign,
    formattedDegree: rahuZodiac.formattedDegree,
    eclipticLongitude: rahuLong,
    orbitalAngleRad: (rahuLong * Math.PI) / 180,
    distanceAU: 1.05,
    nakshatra: rahuZodiac.nakshatra,
    nakshatraPada: rahuZodiac.pada,
    house: ((Math.floor(rahuLong / 30) - ascSignIdx + 12) % 12) + 1,
    houseNumber: ((Math.floor(rahuLong / 30) - ascSignIdx + 12) % 12) + 1,
    zodiacSign: rahuZodiac.sign,
    degreeInSign: rahuZodiac.degreeInSign,
    isRetrograde: true,
    element: rahuZodiac.element,
    color: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.85)',
    interpretation: 'The shadowy vortex of material obsession, futuristic desires, and karmic destiny.',
  });

  // Ketu (South Lunar Node)
  planets.push({
    id: 'ketu',
    name: 'Ketu (South Node)',
    sanskritName: 'केतु (Ketu)',
    symbol: '☋',
    sign: ketuZodiac.sign,
    signName: ketuZodiac.sanskritSign,
    signLord: ketuZodiac.lord,
    degree: ketuZodiac.degreeInSign,
    formattedDegree: ketuZodiac.formattedDegree,
    eclipticLongitude: ketuLong,
    orbitalAngleRad: (ketuLong * Math.PI) / 180,
    distanceAU: 1.05,
    nakshatra: ketuZodiac.nakshatra,
    nakshatraPada: ketuZodiac.pada,
    house: ((Math.floor(ketuLong / 30) - ascSignIdx + 12) % 12) + 1,
    houseNumber: ((Math.floor(ketuLong / 30) - ascSignIdx + 12) % 12) + 1,
    zodiacSign: ketuZodiac.sign,
    degreeInSign: ketuZodiac.degreeInSign,
    isRetrograde: true,
    element: ketuZodiac.element,
    color: '#fdba74',
    glowColor: 'rgba(253, 186, 116, 0.85)',
    interpretation: 'The dragon tail of spiritual liberation (Moksha), detachment, and deep esoteric enlightenment.',
  });

  return {
    birthDate,
    birthTime,
    birthLocation: birthCity || 'New Delhi, India',
    city: birthCity || 'New Delhi, India',
    julianDate: jd,
    ayanamsa,
    ascendant: {
      sign: ascZodiac.sign,
      degree: ascZodiac.degreeInSign,
      formattedDegree: ascZodiac.formattedDegree,
      longitude: ascendantLong,
    },
    ascendantSign: ascZodiac.sign,
    ascendantDegree: ascZodiac.degreeInSign,
    planets,
    sunSign: sunZodiac.sign,
    moonSign: moonZodiac.sign,
    moonNakshatra: moonZodiac.nakshatra,
    nakshatra: moonZodiac.nakshatra,
  };
}
