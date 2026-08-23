import { ScreenType } from '../types';
import { ALL_COURSES, INITIAL_CONSULTATIONS } from './mockData';
import { AI_ASTROLOGERS_LIST, ASTROSAGE_HOME_GRID_TILES } from './astroSageDirectory';

export type SearchCategoryType = 'engine' | 'course' | 'consultation' | 'astrosage' | 'action';

export interface SearchResultItem {
  id: string;
  title: string;
  hindiTitle?: string;
  subtitle?: string;
  category: SearchCategoryType;
  categoryLabel: string;
  iconName: string;
  iconColor?: string;
  keywords: string[];
  description: string;
  targetScreen?: ScreenType;
  actionType: 'navigate' | 'course' | 'astrologer' | 'feature_modal' | 'report_modal';
  payload?: any;
  badge?: string;
}

export const GLOBAL_SEARCH_ITEMS: SearchResultItem[] = [
  // 1. Core Occult Engines & Primary Features
  {
    id: 'feat-kundli',
    title: 'Janam Kundli (Birth Chart)',
    hindiTitle: 'जन्म कुंडली एवं लग्न चक्र',
    subtitle: 'Vedic Horoscope & Planetary Longitudes',
    category: 'engine',
    categoryLabel: 'Sacred Vedic Engine',
    iconName: 'Compass',
    iconColor: 'text-orange-400',
    keywords: ['kundli', 'birth chart', 'horoscope', 'lagna', 'ascendant', 'navamsha', 'd9', 'shodashvarga', 'dasha', 'vimshottari', 'graha', 'bhavas', 'sarvashtakvarga', 'kundali'],
    description: 'Calculate precision Vedic Lagna, Navamsha (D9), Shodashvarga divisional charts, Vimshottari Mahadasha timeline, and Sarvashtakvarga points.',
    targetScreen: 'kundli',
    actionType: 'navigate',
    badge: 'Core Engine'
  },
  {
    id: 'feat-matching',
    title: 'Kundli Milan (Horoscope Matching)',
    hindiTitle: 'कुंडली मिलान एवं अष्टकूट गुण',
    subtitle: '36 Guna Ashtakoota & Mangal Dosha Compatibility',
    category: 'engine',
    categoryLabel: 'Sacred Vedic Engine',
    iconName: 'Heart',
    iconColor: 'text-rose-400',
    keywords: ['matching', 'milan', 'guna', 'gun milan', 'ashtakoota', 'marriage', 'vivah', 'nadi', 'bhakoot', 'gana', 'mangal dosha', 'compatibility', 'synastry'],
    description: '36 Guna Ashtakoota Milan analysis with Nadi, Bhakoot, Gana scores, and mutual Mangal Dosha cancellation exceptions.',
    targetScreen: 'matching',
    actionType: 'navigate',
    badge: '36 Gunas'
  },
  {
    id: 'feat-panchang',
    title: 'Aaj Ka Panchang & Shubh Muhurat',
    hindiTitle: 'दैनिक पंचांग, शुभ मुहूर्त एवं चौघड़िया',
    subtitle: 'Tithi, Nakshatra, Yoga, Karana & Choghadiya',
    category: 'engine',
    categoryLabel: 'Sacred Vedic Engine',
    iconName: 'Calendar',
    iconColor: 'text-amber-400',
    keywords: ['panchang', 'panchanga', 'tithi', 'nakshatra', 'yoga', 'karana', 'muhurat', 'rahukaal', 'choghadiya', 'abhijit', 'hindu calendar', 'shubh'],
    description: 'Live five-limb Vedic Almanac displaying Tithi, Nakshatra, Yoga, Karana, planetary Horas, Abhijit Muhurat, Rahukaal, and Choghadiya.',
    targetScreen: 'panchang',
    actionType: 'navigate',
    badge: 'Live Daily'
  },
  {
    id: 'feat-rashifal',
    title: 'Dainik Rashifal & 2026 Yearly Horoscope',
    hindiTitle: 'दैनिक राशिफल एवं 2026 वार्षिक भविष्यफल',
    subtitle: '12 Zodiac Signs & Major Planetary Shifts',
    category: 'engine',
    categoryLabel: 'Sacred Vedic Engine',
    iconName: 'Star',
    iconColor: 'text-yellow-400',
    keywords: ['rashifal', 'horoscope', 'rashi', 'daily', '2026', 'yearly', 'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces', 'mesh', 'vrishabh', 'mithun', 'kark', 'singh', 'kanya', 'tula', 'vrishchik', 'dhanu', 'makar', 'kumbh', 'meen', 'tarot'],
    description: 'Daily, weekly, and comprehensive 2026 annual planetary forecasts for all 12 moon signs with Saturn in Pisces and Jupiter in Gemini insights.',
    targetScreen: 'rashifal',
    actionType: 'navigate',
    badge: '2026 Forecast'
  },
  {
    id: 'feat-numerology',
    title: 'Ank Jyotish & Lo Shu 3x3 Magic Grid',
    hindiTitle: 'अंक ज्योतिष एवं लो शू ग्रिड',
    subtitle: 'Mulank, Bhagyank, Name Numerology & 8 Raj Yogas',
    category: 'engine',
    categoryLabel: 'Sacred Vedic Engine',
    iconName: 'Calculator',
    iconColor: 'text-emerald-400',
    keywords: ['numerology', 'ank jyotish', 'lo shu', 'loshu', 'mulank', 'bhagyank', 'life path', 'raj yoga', 'magic square', 'name numerology', 'driver', 'conductor', 'numbers'],
    description: 'Calculate Mulank (Driver), Bhagyank (Conductor), Name vibration, and 3x3 Lo Shu Magic Grid planes (Golden 4-5-6, Silver 2-5-8, Thought, Will, Action).',
    targetScreen: 'numerology',
    actionType: 'navigate',
    badge: 'Lo Shu 3x3'
  },
  {
    id: 'feat-vastu',
    title: 'Vastu Shastra Compass & Spatial Energy',
    hindiTitle: 'वास्तु शास्त्र दिशा चक्र एवं पंचतत्व',
    subtitle: '16 Compass Zones & Five Element Balancing',
    category: 'engine',
    categoryLabel: 'Sacred Vedic Engine',
    iconName: 'Grid',
    iconColor: 'text-cyan-400',
    keywords: ['vastu', 'vastu shastra', 'compass', 'direction', 'north east', 'ishanya', 'south east', 'agneya', 'spatial energy', 'panchatatva', 'home vastu', 'office vastu', 'remedies'],
    description: 'Interactive 16-zone Vastu Compass analyzing Ishanya (NE), Agneya (SE), Nairutya (SW), and Vayavya (NW) with non-demolition color and metal remedies.',
    targetScreen: 'vastu',
    actionType: 'navigate',
    badge: '16 Zones'
  },
  {
    id: 'feat-prashnavali',
    title: 'Ramcharitmanas Chaupai Prashnavali',
    hindiTitle: 'श्री रामशलाका प्रश्नावली',
    subtitle: '15x15 Sacred Letter Matrix & Goswami Tulsidas Oracle',
    category: 'engine',
    categoryLabel: 'Sacred Vedic Engine',
    iconName: 'Scroll',
    iconColor: 'text-yellow-400',
    keywords: ['prashnavali', 'ramcharitmanas', 'ram shalaka', 'oracle', 'chaupai', 'tulsidas', 'question', 'horary', 'divination', 'ramayan'],
    description: 'Consult the consecrated 15x15 letter grid to receive instant poetic guidance and auspicious verdicts from Goswami Tulsidas’s Ramcharitmanas.',
    targetScreen: 'prashnavali',
    actionType: 'navigate',
    badge: 'Divine Oracle'
  },
  {
    id: 'feat-baby-names',
    title: 'Naamkaran Sanskar & Baby Names',
    hindiTitle: 'नामकरण संस्कार एवं नक्षत्र नामाक्षर',
    subtitle: 'Nakshatra Starting Letters & Vedic Numerology',
    category: 'engine',
    categoryLabel: 'Sacred Vedic Engine',
    iconName: 'Baby',
    iconColor: 'text-pink-400',
    keywords: ['baby names', 'naamkaran', 'naming', 'nakshatra names', 'starting letters', 'syllables', 'padas', 'vedic names', 'boy names', 'girl names', 'numerology name'],
    description: 'Generate sacred Vedic baby names filtered by birth Moon Nakshatra quarter (Pada) syllables, Rashi, and auspicious numerological compound values.',
    targetScreen: 'baby-names',
    actionType: 'navigate',
    badge: 'Nakshatra Syllables'
  },
  {
    id: 'feat-japa-mala',
    title: 'Quantum Japa Mala & Mantra Counter',
    hindiTitle: 'जाप माला एवं मंत्र साधना',
    subtitle: '108 Sacred Beads & Solfeggio Harmonic Chanting',
    category: 'engine',
    categoryLabel: 'Sacred Vedic Engine',
    iconName: 'Disc',
    iconColor: 'text-purple-400',
    keywords: ['japa', 'mala', 'mantra', 'chanting', '108', 'beads', 'om namah shivaya', 'gayatri mantra', 'maha mrityunjaya', 'hare krishna', 'meditation', 'counter'],
    description: 'Interactive 108-bead Japa Mala counter with authentic Solfeggio sound resonances (432Hz, 528Hz), Meru bead turnaround, and mantra vibration logs.',
    targetScreen: 'japa-mala',
    actionType: 'navigate',
    badge: '108 Beads'
  },
  {
    id: 'feat-lalkitab',
    title: 'Lal Kitab Kundli & Wonder Upay',
    hindiTitle: 'लाल किताब कुंडली एवं अचूक उपाय',
    subtitle: 'Karmic Debt (Rin) & Blind/Sleeping Planet Activations',
    category: 'engine',
    categoryLabel: 'Sacred Vedic Engine',
    iconName: 'BookOpen',
    iconColor: 'text-red-400',
    keywords: ['lal kitab', 'lalkitab', 'red book', 'upay', 'totke', 'remedies', 'rin', 'pitra rin', 'dharmi teva', 'blind planet', 'karmic debt'],
    description: 'Lal Kitab horoscope synthesis diagnosing Pitra Rin, Matru Rin, artificial planets, dormant houses, and safe, non-violent household remedies.',
    targetScreen: 'lalkitab',
    actionType: 'navigate',
    badge: 'Wonder Remedies'
  },
  {
    id: 'feat-kp',
    title: 'KP Astrology & 1-249 Horary System',
    hindiTitle: 'के.पी. कृष्णमूर्ति पद्धति एवं प्रश्न ज्योतिष',
    subtitle: 'Placidus Cusps, Sub-Lord Theory & Precise Timing',
    category: 'engine',
    categoryLabel: 'Sacred Vedic Engine',
    iconName: 'Layers',
    iconColor: 'text-blue-400',
    keywords: ['kp', 'krishnamurti paddhati', 'sub lord', 'cuspal interlinks', '1-249', 'horary', 'prashna', 'placidus', 'significators', 'star lord'],
    description: 'Krishnamurti Paddhati (KP) engine with 1-249 Horary number selection, Sub-Lord linkages, 12 Placidus cusp analysis, and pinpoint event timing.',
    targetScreen: 'kp',
    actionType: 'navigate',
    badge: 'Sub-Lord Engine'
  },
  {
    id: 'feat-transits',
    title: 'Grah Gochar & Planetary Transits',
    hindiTitle: 'ग्रह गोचर एवं राशि परिवर्तन',
    subtitle: 'Real-time Ephemeris & Retrograde Planetary Watch',
    category: 'engine',
    categoryLabel: 'Sacred Vedic Engine',
    iconName: 'Orbit',
    iconColor: 'text-indigo-400',
    keywords: ['transits', 'gochar', 'grah gochar', 'planetary movement', 'retrograde', 'ephemeris', 'saturn transit', 'jupiter transit', 'rahu ketu transit'],
    description: 'Track live planetary transits across 12 zodiac signs, degree-wise orbital aspects, retrograde motions (Vakri), and Gochar Vedha effects.',
    targetScreen: 'transits',
    actionType: 'navigate',
    badge: 'Live Ephemeris'
  },
  {
    id: 'feat-gemstones',
    title: 'Ratna & Rudraksha Remedies',
    hindiTitle: 'रत्न एवं रुद्राक्ष परामर्श',
    subtitle: 'Life Stone, Lucky Stone, Finger/Metal & Energization',
    category: 'engine',
    categoryLabel: 'Sacred Vedic Engine',
    iconName: 'Gem',
    iconColor: 'text-emerald-300',
    keywords: ['gemstones', 'ratna', 'rudraksha', 'ruby', 'pearl', 'yellow sapphire', 'blue sapphire', 'emerald', 'diamond', 'coral', 'gomed', 'cat eye', 'pukhraj', 'manik', 'panna', 'neelam'],
    description: 'Personalized gemstone recommendations based on Lagna Lord, 5th, and 9th houses with consecration rituals, wearing fingers, and compatible metals.',
    targetScreen: 'gemstones',
    actionType: 'navigate',
    badge: 'Ratna Upay'
  },
  {
    id: 'feat-tesla-369',
    title: '369 Tesla Portal (Cosmic Vortex & Celestial Orrery)',
    hindiTitle: '३६९ टेस्ला पोर्टल एवं ब्रह्मांडीय ग्रह चक्र',
    subtitle: 'Planets, Galaxies, Black Hole Warp & 3-6-9 Vortex Math',
    category: 'engine',
    categoryLabel: 'Quantum Celestial Portal',
    iconName: 'Zap',
    iconColor: 'text-[#ffd700]',
    keywords: ['tesla', '369', 'portal', 'tesla portal', 'black hole', 'warp', 'planets', 'galaxies', 'universe', 'solfeggio', 'vortex', 'celestial', 'frequency', 'akasha', 'wardenclyffe', 'cousto'],
    description: 'Enter the 369 Tesla Portal through a relativistic black hole warp to explore planetary acoustics, deep galaxies, Hans Cousto Cosmic Octave, and 3-6-9 vortex math.',
    targetScreen: 'tesla-369',
    actionType: 'navigate',
    badge: '3D 369 Portal'
  },
  {
    id: 'feat-mentor',
    title: 'AI Daivajna (Cosmic Astrological Mentor)',
    hindiTitle: 'एआई दैवज्ञ (ज्योतिष मार्गदर्शक)',
    subtitle: 'Conversational Vedic Knowledge & Shastra AI',
    category: 'engine',
    categoryLabel: 'Sacred Vedic Engine',
    iconName: 'Bot',
    iconColor: 'text-amber-300',
    keywords: ['ai daivajna', 'ai astrologer', 'mentor', 'chat', 'ask question', 'shastra ai', 'jyotish bot', 'cosmic mentor'],
    description: 'Engage with our conversational Vedic intelligence trained on Parashara, Jaimini, Bhrigu, and classical astrological scriptures.',
    targetScreen: 'mentor',
    actionType: 'navigate',
    badge: 'AI Shastra'
  },
  {
    id: 'feat-practice',
    title: 'Quantum Occult Lab & Practice Matrix',
    hindiTitle: 'क्वांटम ऑकल्ट लैब एवं सिमुलेटर',
    subtitle: 'Yantra Resonance, Sound Frequencies & Aura Tools',
    category: 'engine',
    categoryLabel: 'Sacred Vedic Engine',
    iconName: 'SlidersHorizontal',
    iconColor: 'text-amber-400',
    keywords: ['practice', 'lab', 'quantum occult', 'yantra', 'resonance', 'frequency', 'aura calibration', 'exercises', 'simulator'],
    description: 'Interactive practitioner lab for experimenting with geometric Sri Yantras, Solfeggio sound synthesizers, and energetic biofield resonance.',
    targetScreen: 'practice',
    actionType: 'navigate',
    badge: 'Lab Matrix'
  },
  {
    id: 'feat-portal',
    title: 'Institute Seeker Portal & Bio-Resonance',
    hindiTitle: 'संस्थान साधक पोर्टल एवं ऑरा संतुलन',
    subtitle: 'Destiny Dossier, Aura Frequency & Member Dashboard',
    category: 'engine',
    categoryLabel: 'Sacred Vedic Engine',
    iconName: 'Home',
    iconColor: 'text-amber-400',
    keywords: ['portal', 'member portal', 'aura', 'frequency', 'destiny dossier', 'affirmations', 'institute portal', 'profile'],
    description: 'Your central seeker sanctum with aura frequency tuning (432Hz - 963Hz), daily personalized cosmic affirmations, and destiny reports.',
    targetScreen: 'portal',
    actionType: 'navigate',
    badge: 'Member Sanctum'
  },

  // 2. Academy Courses (from ALL_COURSES)
  ...ALL_COURSES.map((course) => ({
    id: `course-${course.id}`,
    title: course.title,
    subtitle: `${course.category} • by ${course.instructor}`,
    category: 'course' as SearchCategoryType,
    categoryLabel: 'Academy Course Module',
    iconName: 'GraduationCap',
    iconColor: 'text-amber-400',
    keywords: [
      course.title.toLowerCase(),
      course.category.toLowerCase(),
      course.instructor.toLowerCase(),
      'course',
      'academy',
      'learn',
      'lessons',
      'certification',
      ...course.keyTopics.map(t => t.toLowerCase())
    ],
    description: `${course.description} Duration: ${course.duration}, Lessons: ${course.lessonsCount}, Rating: ★ ${course.rating}.`,
    targetScreen: 'academy' as ScreenType,
    actionType: 'course' as const,
    payload: course.id,
    badge: `${course.lessonsCount} Lessons`
  })),

  // 3. Consultations & AI Astrologers
  ...INITIAL_CONSULTATIONS.map((con) => ({
    id: `consultation-${con.id}`,
    title: con.title,
    subtitle: `With ${con.practitionerName} (${con.specialty})`,
    category: 'consultation' as SearchCategoryType,
    categoryLabel: 'Private Consultation Service',
    iconName: 'Sparkles',
    iconColor: 'text-yellow-400',
    keywords: [
      con.title.toLowerCase(),
      con.practitionerName.toLowerCase(),
      con.specialty.toLowerCase(),
      'consultation',
      'appointment',
      'booking',
      'reading',
      'session',
      'practitioner'
    ],
    description: `1-on-1 Deep Dive Session with ${con.practitionerName}. Fee: ₹${con.fee}. Status: Available for online scheduling.`,
    targetScreen: 'consultations' as ScreenType,
    actionType: 'navigate' as const,
    badge: `₹${con.fee}`
  })),

  // AI Live Astrologers
  ...AI_ASTROLOGERS_LIST.map((astro) => ({
    id: `astrologer-${astro.id}`,
    title: `${astro.name} (${astro.hindiName})`,
    subtitle: `${astro.title} • ${astro.experienceYears} Yrs Exp`,
    category: 'consultation' as SearchCategoryType,
    categoryLabel: 'Live AI Astrologer Guru',
    iconName: 'Bot',
    iconColor: 'text-emerald-400',
    keywords: [
      astro.name.toLowerCase(),
      astro.hindiName.toLowerCase(),
      astro.title.toLowerCase(),
      'astrologer',
      'guru',
      'chat',
      'live consultation',
      ...astro.specialties.map(s => s.toLowerCase()),
      ...astro.languages.map(l => l.toLowerCase())
    ],
    description: `${astro.title} with ${astro.experienceYears}+ years experience. Rate: ₹${astro.ratePerMin}/min. Specialties: ${astro.specialties.join(', ')}.`,
    targetScreen: undefined,
    actionType: 'astrologer' as const,
    payload: astro.id,
    badge: `₹${astro.ratePerMin}/min`
  })),

  // 4. Kaal Chakra 28 Vedic Shastra Features & Sub-Tools
  ...ASTROSAGE_HOME_GRID_TILES.map((tile) => ({
    id: `shastra-${tile.id}`,
    title: tile.title,
    hindiTitle: tile.hindiTitle,
    subtitle: `${tile.category} • ${tile.subFeatures.length} Vedic Tools`,
    category: 'astrosage' as SearchCategoryType,
    categoryLabel: 'Kaal Chakra Shastra Tool',
    iconName: tile.iconName || 'Sparkles',
    iconColor: tile.iconColor || 'text-amber-400',
    keywords: [
      tile.title.toLowerCase(),
      tile.hindiTitle.toLowerCase(),
      tile.category.toLowerCase(),
      'kaal chakra',
      'shastra',
      'vedic tool',
      'calculator',
      ...tile.subFeatures.map(sf => sf.title.toLowerCase()),
      ...tile.subFeatures.map(sf => (sf.hindiTitle || '').toLowerCase())
    ],
    description: tile.description,
    targetScreen: tile.targetScreen,
    actionType: 'feature_modal' as const,
    payload: tile,
    badge: tile.badge || `${tile.subFeatures.length} Tools`
  })),

  // 5. Special Action: Unlock Destiny Report
  {
    id: 'action-unlock-destiny',
    title: 'Unlock Full Destiny Life Dossier',
    hindiTitle: 'विस्तृत भाग्यफल एवं जीवन चक्र रिपोर्ट',
    subtitle: 'Generate customized multi-system Parashari & Numerology Report',
    category: 'action',
    categoryLabel: 'Interactive Service',
    iconName: 'Sparkles',
    iconColor: 'text-amber-400',
    keywords: ['destiny report', 'unlock report', 'life dossier', 'numerology profile', 'generate report', 'birth report'],
    description: 'Instant synthesis of your Life Path, Soul Urge, Cosmic Archetype, and vocational planetary alignments.',
    targetScreen: undefined,
    actionType: 'report_modal',
    badge: 'Instant PDF/View'
  }
];

export const POPULAR_SEARCH_CHIPS = [
  { label: '⚡ 369 Tesla Portal', query: 'Tesla' },
  { label: 'Kundli Milan', query: 'Kundli Milan' },
  { label: 'Lo Shu Grid', query: 'Lo Shu' },
  { label: 'Dainik Rashifal', query: 'Rashifal' },
  { label: 'Aaj Ka Panchang', query: 'Panchang' },
  { label: 'Lal Kitab', query: 'Lal Kitab' },
  { label: 'Ramcharitmanas Oracle', query: 'Prashnavali' },
  { label: 'Astro-Numerology 101', query: 'Astro-Numerology' },
  { label: 'Swami Ji', query: 'Swami Ji' },
  { label: 'Ratna Upay', query: 'Ratna' },
  { label: '16 Vastu Zones', query: 'Vastu' },
  { label: 'KP Astrology', query: 'KP' },
  { label: 'Japa Mala', query: 'Japa Mala' },
];
