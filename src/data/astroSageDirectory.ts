import { ScreenType } from '../types';

export interface AIAstrologer {
  id: string;
  name: string;
  hindiName: string;
  title: string;
  avatar: string;
  ratePerMin: number;
  rating: number;
  experienceYears: number;
  totalConsultations: string;
  isOnline: boolean;
  specialties: string[];
  languages: string[];
  systemPrompt: string;
  greetingMessage: string;
}

export interface SubFeatureItem {
  id: string;
  title: string;
  hindiTitle?: string;
  description: string;
  targetScreen?: ScreenType;
  actionType?: 'navigate' | 'modal' | 'calculator' | 'report' | 'celebrity' | 'chat';
  badge?: string;
  iconName?: string;
  dataKey?: string;
}

export interface AstroSageCategory {
  id: string;
  title: string;
  hindiTitle?: string;
  isNew?: boolean;
  iconName: string;
  color: string;
  subFeatures: SubFeatureItem[];
}

export interface AstroGridTile {
  id: string;
  title: string;
  hindiTitle: string;
  iconName: string;
  category: string;
  badge?: string;
  bgColor?: string;
  iconColor?: string;
  description: string;
  targetScreen?: ScreenType;
  subFeatures: SubFeatureItem[];
}

export const AI_ASTROLOGERS_LIST: AIAstrologer[] = [
  {
    id: 'swami-ji',
    name: 'Swami Ji',
    hindiName: 'स्वामी जी',
    title: 'Vedic Rishi & Spiritual Guru',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    ratePerMin: 17,
    rating: 4.98,
    experienceYears: 32,
    totalConsultations: '24.5k+',
    isOnline: true,
    specialties: ['Kundli Dosh', 'Mantra Sadhana', 'Spiritual Guidance', 'Vedic Upay'],
    languages: ['Hindi', 'Sanskrit', 'English'],
    systemPrompt: 'You are Swami Ji, an enlightened Vedic Rishi from Varanasi with 32 years of Vedic shastra mastery. Speak with immense warmth, blessing the seeker with "आयुष्मान भव" and quoting authentic Brihat Parashara verses, offering compassionate remedies.',
    greetingMessage: 'हरि ॐ! आयुष्मान भव वत्स। मैं स्वामी जी हूँ। अपनी जन्म कुंडली, जीवन की उलझन या किसी भी समस्या के समाधान हेतु प्रश्न पूछें।'
  },
  {
    id: 'arjun-pandit',
    name: 'Arjun Pandit',
    hindiName: 'पंडित अर्जुन',
    title: 'Parashari & Kundli Expert',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    ratePerMin: 11,
    rating: 4.92,
    experienceYears: 18,
    totalConsultations: '38.2k+',
    isOnline: true,
    specialties: ['Janam Kundli', 'Career Growth', 'Finance & Wealth', 'Grah Dasha'],
    languages: ['Hindi', 'English'],
    systemPrompt: 'You are Arjun Pandit, an expert in Parashari Jyotish, Lagna Analysis, D10 Dashamsha career readings, and D9 Navamsha destiny trends.',
    greetingMessage: 'प्रणाम! मैं पंडित अर्जुन। आपकी जन्म कुंडली के नवग्रह और 12 भावों के आधार पर सटीक विश्लेषण के लिए तैयार हूँ। क्या मार्गदर्शन चाहिए?'
  },
  {
    id: 'mr-krishnamurti',
    name: 'Mr. Krishnamurti',
    hindiName: 'के.पी. कृष्णमूर्ति जी',
    title: 'KP System & Horary 1-249 Master',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    ratePerMin: 16,
    rating: 4.96,
    experienceYears: 27,
    totalConsultations: '19.8k+',
    isOnline: true,
    specialties: ['KP Horary 1-249', 'Sub-Lord Analysis', 'Precise Event Timing', 'Job Selection'],
    languages: ['English', 'Hindi', 'Tamil'],
    systemPrompt: 'You are Acharya Krishnamurti, a master of KP Astrology and Cuspal Sub-Lord theory. Provide pin-point timing of events.',
    greetingMessage: 'Namaste! I am Master Krishnamurti. Give me your query or a Horary number between 1 to 249 for precise sub-lord timing.'
  },
  {
    id: 'love-guru',
    name: 'Love Guru Dev',
    hindiName: 'लव गुरु देव',
    title: 'Relationship & Marriage Astrologer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    ratePerMin: 21,
    rating: 4.99,
    experienceYears: 15,
    totalConsultations: '42.1k+',
    isOnline: true,
    specialties: ['Love Compatibility', 'Kundli Milan (36 Guna)', 'Manglik Dosha', 'Ex-Reconciliation'],
    languages: ['Hindi', 'English', 'Punjabi'],
    systemPrompt: 'You are Love Guru Dev, specializing in 7th house Venus-Mars synastry, Ashtakoota Milan, and resolving marital and relationship discord.',
    greetingMessage: 'नमस्ते! प्रेम और वैवाहिक जीवन में सुख, सामंजस्य और गुण मिलान के लिए आपका स्वागत है। बताएं आपके दिल में क्या सवाल है?'
  },
  {
    id: 'acharya-dev',
    name: 'Acharya Dev',
    hindiName: 'आचार्य देव',
    title: 'Lal Kitab & Vastu Specialist',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    ratePerMin: 14,
    rating: 4.91,
    experienceYears: 22,
    totalConsultations: '15.6k+',
    isOnline: true,
    specialties: ['Lal Kitab Upay', 'Vastu 16 Zones', 'Rin Nivaran', 'Nazar Dosh'],
    languages: ['Hindi', 'Gujarati', 'English'],
    systemPrompt: 'You are Acharya Dev, master of Lal Kitab totkas, 9 Ancestral Rin debt removal, and Vastu directional balancing.',
    greetingMessage: 'शुभम भवतु! लाल किताब के सरल व अचूक उपायों तथा वास्तु दोष निवारण हेतु मैं आचार्य देव आपकी सेवा में उपस्थित हूँ।'
  },
  {
    id: 'dr-radhakrishnan',
    name: 'Dr. Radhakrishnan',
    hindiName: 'डॉ. राधाकृष्णन',
    title: 'Ank Jyotish & Name Numerologist',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    ratePerMin: 15,
    rating: 4.94,
    experienceYears: 20,
    totalConsultations: '28.9k+',
    isOnline: true,
    specialties: ['Lo Shu Grid', 'Name Spelling Correction', 'Lucky Numbers & Colors', 'Business Name'],
    languages: ['English', 'Hindi', 'Malayalam'],
    systemPrompt: 'You are Dr. Radhakrishnan, PhD in Numerology, expert in Chaldean & Pythagorean calculations, Mulank-Bhagyank synergy, and Lo Shu grid.',
    greetingMessage: 'Greetings! Numbers govern destiny and cosmic vibrations. Provide your date of birth and full name for numerological alignment.'
  }
];

export const ASTROSAGE_NAV_MENU: AstroSageCategory[] = [
  {
    id: 'karma',
    title: 'Karma',
    hindiTitle: 'कर्म फल दर्पण',
    isNew: true,
    iconName: 'Scale',
    color: '#d4af37',
    subFeatures: [
      { id: 'karma-ledger', title: 'Complete Karmic Ledger', description: 'Interactive balance sheet of Punya deeds vs Papa misdeeds', targetScreen: 'karma' },
      { id: 'karma-punya', title: 'Good Deeds (Punya) Tracker', description: 'Log Annadana, Vidya Dana, Go-Seva, and truthfulness merit', targetScreen: 'karma' },
      { id: 'karma-papa', title: 'Sins & Mistakes Confession', description: 'Evaluate karmic toll of speech, thought, and physical errors', targetScreen: 'karma' },
      { id: 'karma-debts', title: '5 Cosmic Debts (Pancha Rina)', description: 'Ancestral, cosmic, and societal debt clearance status', targetScreen: 'karma' },
      { id: 'karma-remedies', title: 'Prayashchitta (Atonement) Vidhi', description: 'Vedic purificatory sound frequencies, mantras, and fasting vows', targetScreen: 'karma' }
    ]
  },
  {
    id: 'home',
    title: 'Home',
    hindiTitle: 'होम पेज',
    iconName: 'Home',
    color: '#d4af37',
    subFeatures: [
      { id: 'home-main', title: 'Main Dashboard & Sanctum', description: 'Central Kaal Chakra command center with daily cosmic summary', targetScreen: 'landing' },
      { id: 'home-kundli', title: 'Instant Janam Kundli', description: 'Cast birth chart with Lagna, Navamsha & planetary degrees', targetScreen: 'kundli' },
      { id: 'home-matching', title: 'Kundli Milan (36 Gunas)', description: 'Comprehensive marital compatibility and Ashtakoota analysis', targetScreen: 'matching' },
      { id: 'home-panchang', title: 'Aaj Ka Panchang', description: 'Live Tithi, Nakshatra, Yoga, Karana, and Choghadiya', targetScreen: 'panchang' },
      { id: 'home-rashifal', title: 'Dainik Rashifal (Daily Horoscope)', description: 'Today\'s predictions for all 12 zodiac signs', targetScreen: 'rashifal' },
      { id: 'home-astrologer', title: 'Live AI Astrologers Consultation', description: 'Instant Vedic conversation with personalized guidance', targetScreen: 'mentor' }
    ]
  },
  {
    id: '2026',
    title: '2026',
    hindiTitle: 'वार्षिक राशिफल 2026',
    isNew: true,
    iconName: 'Sparkles',
    color: '#ff4d4d',
    subFeatures: [
      { id: '2026-rashifal', title: '2026 Yearly Horoscope (All 12 Signs)', description: 'Complete annual predictions for Career, Finance, Love, and Health', targetScreen: 'rashifal', badge: 'Popular' },
      { id: '2026-gochar', title: '2026 Planetary Transits (Grah Gochar)', description: 'Major shifts of Saturn in Pisces, Jupiter in Gemini, Rahu-Ketu', targetScreen: 'transits' },
      { id: '2026-muhurat', title: '2026 Shubh Vivah & Griha Muhurat Calendar', description: 'Auspicious dates for weddings, house warming, and vehicle purchases', targetScreen: 'panchang' },
      { id: '2026-festivals', title: '2026 Hindu Calendar & Fasting Festivals', description: 'Ekadashi, Purnima, Navratri, Diwali, Holi, and Shivratri schedule', targetScreen: 'panchang' },
      { id: '2026-grahan', title: '2026 Solar & Lunar Eclipses (Surya & Chandra Grahan)', description: 'Grahan dates, timings, Sutak Kaal, and astrological precautions', targetScreen: 'panchang' },
      { id: '2026-numerology', title: '2026 Numerology & Universal Year (Number 10/1)', description: 'How the cosmic number 1 energy shapes your Personal Year number', targetScreen: 'numerology' }
    ]
  },
  {
    id: 'horoscope',
    title: 'Horoscope',
    hindiTitle: 'राशिफल',
    iconName: 'Star',
    color: '#e6a100',
    subFeatures: [
      { id: 'horo-daily', title: 'Daily Horoscope (दैनिक राशिफल)', description: 'Day-to-day astrological predictions and lucky hours', targetScreen: 'rashifal' },
      { id: 'horo-weekly', title: 'Weekly Horoscope (साप्ताहिक राशिफल)', description: '7-day planetary forecast with transit highlights', targetScreen: 'rashifal' },
      { id: 'horo-monthly', title: 'Monthly Horoscope (मासिक राशिफल)', description: 'Month-ahead career, wealth, and health roadmap', targetScreen: 'rashifal' },
      { id: 'horo-yearly', title: 'Yearly Horoscope 2026 (वार्षिक राशिफल)', description: 'In-depth 365-day forecast for all 12 moon signs', targetScreen: 'rashifal' },
      { id: 'horo-love', title: 'Love & Romance Horoscope', description: 'Venus and Mars transit impacts on passion and relationship harmony', targetScreen: 'rashifal' },
      { id: 'horo-career', title: 'Career & Finance Horoscope', description: 'Job changes, promotions, investments, and business growth cycles', targetScreen: 'rashifal' },
      { id: 'horo-tarot', title: 'Vedic Tarot Oracle Reading', description: 'Single card & 3-card Past-Present-Future arcana spreads', targetScreen: 'rashifal' }
    ]
  },
  {
    id: 'astrology',
    title: 'Astrology',
    hindiTitle: 'वैदिक ज्योतिष',
    iconName: 'Compass',
    color: '#e67300',
    subFeatures: [
      { id: 'astro-kundli', title: 'Janam Kundli (Birth Chart)', description: 'Full D1 Lagna, D9 Navamsha, and D10 Dashamsha chart engine', targetScreen: 'kundli' },
      { id: 'astro-varshphal', title: 'Varshphal (Annual Solar Return Chart)', description: 'Tajika system annual progression and Muntha calculation', targetScreen: 'kundli' },
      { id: 'astro-sadesati', title: 'Shani Sade Sati Life Report', description: 'Rising, Peak, and Setting Dhaiya analysis with Shani Shanti Upays', targetScreen: 'kundli' },
      { id: 'astro-mangal', title: 'Mangal Dosha (Kuja Dosha) Analyzer', description: 'Evaluate Mars placement in 1st, 4th, 7th, 8th, 12th houses with cancellations', targetScreen: 'kundli' },
      { id: 'astro-kaalsarp', title: 'Kaalsarp Dosha Analysis & 12 Types', description: 'Anant, Kulik, Vasuki, Shankhpal, Padma, Takshak and other yoga cures', targetScreen: 'kundli' },
      { id: 'astro-brihat', title: 'Brihat Kundli (50+ Page Comprehensive Dossier)', description: 'Detailed planetary strength (Shadbala), Yogas, and Dasha sequence', targetScreen: 'kundli' },
      { id: 'astro-ashtakvarga', title: 'Sarvashtakvarga (SAV) Matrix & Bindus', description: '337 total bindus distribution across 12 bhavas for transit strength', targetScreen: 'kundli' },
      { id: 'astro-gochar', title: 'Grah Gochar (Live Planetary Transits)', description: 'Planetary transits against natal moon and houses', targetScreen: 'transits' },
      { id: 'astro-ascendant', title: 'Ascendant (Lagna) Calculator', description: 'Calculate exact rising sign, degree, and rising nakshatra', targetScreen: 'kundli' }
    ]
  },
  {
    id: 'numerology',
    title: 'Numerology',
    hindiTitle: 'अंक ज्योतिष',
    iconName: 'Calculator',
    color: '#00a86b',
    subFeatures: [
      { id: 'num-calc', title: 'Ank Jyotish Complete Calculator', description: 'Calculate Mulank (Driver) and Bhagyank (Conductor)', targetScreen: 'numerology' },
      { id: 'num-loshu', title: 'Lo Shu 3x3 Magic Grid', description: 'Identify active planes (Mental, Emotional, Practical, Will, Thought, Action)', targetScreen: 'numerology' },
      { id: 'num-rajyoga', title: '8 Sacred Raj Yogas in Numerology', description: 'Golden (4-5-6), Silver (2-5-8), and Action planes', targetScreen: 'numerology' },
      { id: 'num-name', title: 'Chaldean & Pythagorean Name Numerology', description: 'Harmonize name vibrations with lucky master numbers', targetScreen: 'numerology' },
      { id: 'num-missing', title: 'Missing Numbers & Remedial Crystals/Colors', description: 'Fill grid voids with personalized geometric and elemental remedies', targetScreen: 'numerology' }
    ]
  },
  {
    id: 'occult',
    title: 'Occult',
    hindiTitle: 'गूढ़ विद्या एवं तंत्र',
    iconName: 'Layers',
    color: '#9333ea',
    subFeatures: [
      { id: 'occult-prashnavali', title: 'Ramcharitmanas Prashnavali', description: '15x15 sacred Goswami Tulsidas Chaupai oracle for direct divine answers', targetScreen: 'prashnavali' },
      { id: 'occult-vastu', title: 'Vastu Shastra 16-Zone Compass Analyzer', description: 'Evaluate Brahmasthan, Ishanya, Agneya, Nairutya, and Vayavya energy', targetScreen: 'vastu' },
      { id: 'occult-japamala', title: 'Mantra Japa Mala Counter (108 Beads)', description: 'Interactive spiritual bead counter with 432Hz & 528Hz Solfeggio sound', targetScreen: 'japa-mala' },
      { id: 'occult-tarot', title: 'Vedic Arcana Tarot Deck', description: 'Draw single guidance or past-present-future 3-card spreads', targetScreen: 'rashifal' },
      { id: 'occult-baby', title: 'Vedic Naamkaran (Baby Name Suggestion)', description: 'Search auspicious names by Janam Nakshatra Pada & Chaldean number', targetScreen: 'baby-names' }
    ]
  },
  {
    id: 'free-reports',
    title: 'Free Reports',
    hindiTitle: 'निःशुल्क ज्योतिष रिपोर्ट',
    iconName: 'FileText',
    color: '#2563eb',
    subFeatures: [
      { id: 'rep-life', title: 'Comprehensive Life Report (जीवन कुंडली)', description: 'Detailed overview of your destiny, personality traits, and karma', targetScreen: 'report' },
      { id: 'rep-career', title: 'Career & Wealth Potential Report', description: '10th house D10 Dashamsha analysis for optimal job & business sectors', targetScreen: 'kundli' },
      { id: 'rep-marriage', title: 'Marriage & Relationship Life Dossier', description: 'Timing of marriage, partner characteristics, and 7th house analysis', targetScreen: 'matching' },
      { id: 'rep-sadesati', title: 'Shani Sade Sati Detailed Timeline', description: 'Exact dates and impacts of all 3 Sade Sati cycles in your life', targetScreen: 'kundli' },
      { id: 'rep-gemstone', title: 'Prescribed Gemstones & Rudraksha Guide', description: 'Identify Lucky, Life, and Benefic Ratnas with wearing rules', targetScreen: 'gemstones' },
      { id: 'rep-dosh', title: 'Pitra & Kaalsarp Dosh Assessment', description: 'Determine ancestral karmic afflictions and Vedic remedial homas', targetScreen: 'kundli' }
    ]
  },
  {
    id: 'healing',
    title: 'Healing',
    hindiTitle: 'उपाय एवं साधना',
    iconName: 'Gem',
    color: '#059669',
    subFeatures: [
      { id: 'heal-gem', title: 'Ratna (Gemstones) Remedial Sanctum', description: 'Ruby, Pearl, Yellow Sapphire, Blue Sapphire, Emerald, Diamond prescriptions', targetScreen: 'gemstones' },
      { id: 'heal-rudraksha', title: 'Rudraksha Sanctum (1 to 21 Mukhi)', description: 'Spiritual powerhouse beads with governing deity, planet, and Beej Mantras', targetScreen: 'gemstones' },
      { id: 'heal-yantra', title: 'Sacred Yantras (Shree, Kuber, Mahamrityunjaya)', description: 'Sacred geometry conductors for prosperity, health, and protection', targetScreen: 'gemstones' },
      { id: 'heal-mantras', title: 'Navagraha Vedic Beej Mantras', description: 'Chanting counts, rosary types, and auspicious Muhurats for japa', targetScreen: 'japa-mala' },
      { id: 'heal-vrats', title: 'Vrat & Fasting Guide', description: 'Vidhi and significance for Pradosh, Ekadashi, Sankashti, and Somwar vrats', targetScreen: 'panchang' }
    ]
  },
  {
    id: 'panchang',
    title: 'Panchang',
    hindiTitle: 'पंचांग एवं मुहूर्त',
    iconName: 'Calendar',
    color: '#f59e0b',
    subFeatures: [
      { id: 'pan-today', title: 'Aaj Ka Panchang (Core 5 Limbs)', description: 'Tithi, Vaar, Nakshatra, Yoga, and Karana with sunrise & sunset timings', targetScreen: 'panchang' },
      { id: 'pan-choghadiya', title: 'Day & Night Shubh Choghadiyas', description: 'Amrit, Shubh, Labh, Char, Udveg, Kaal, Rog timings with color tags', targetScreen: 'panchang' },
      { id: 'pan-horas', title: '24-Hour Planetary Horas', description: 'Hour-by-hour planetary rulers for choosing optimal action timings', targetScreen: 'panchang' },
      { id: 'pan-vivah', title: 'Shubh Vivah Muhurat 2026-2027', description: 'Filtered wedding dates with Shuddha Lagna and Nakshatra purity', targetScreen: 'panchang' },
      { id: 'pan-griha', title: 'Griha Pravesh & Vahan Muhurats', description: 'Auspicious times for entering new homes, buying cars, and property registry', targetScreen: 'panchang' },
      { id: 'pan-rahu', title: 'Today\'s Rahu Kaal & Inauspicious Periods', description: 'Rahu Kaal, Yamaganda, and Gulika Kaal caution windows', targetScreen: 'panchang' }
    ]
  },
  {
    id: 'lal-kitab',
    title: 'Lal Kitab',
    hindiTitle: 'लाल किताब',
    iconName: 'BookOpen',
    color: '#dc2626',
    subFeatures: [
      { id: 'lk-teva', title: 'Lal Kitab Kundli (Teva Engine)', description: 'Fixed house planetary placements with blind, sleeping & sacrificial planets', targetScreen: 'lalkitab' },
      { id: 'lk-rin', title: '9 Ancestral Debts (Pitra, Matri, Stri, Swa Rin)', description: 'Identify ancestral karmic burdens and easy practical remedies (Totkas)', targetScreen: 'lalkitab' },
      { id: 'lk-upay', title: 'Custom Lal Kitab Upayas', description: 'Practical, cost-free day-to-day remedies to neutralize malefic planets', targetScreen: 'lalkitab' },
      { id: 'lk-varshphal', title: 'Lal Kitab Varshphal Table', description: 'Annual planetary shifts and house rotation rules', targetScreen: 'lalkitab' }
    ]
  },
  {
    id: 'kp',
    title: 'KP',
    hindiTitle: 'के.पी. ज्योतिष',
    iconName: 'Layers',
    color: '#0284c7',
    subFeatures: [
      { id: 'kp-system', title: 'KP Krishnamurti Paddhati Core Engine', description: 'Placidus house divisions, Sub-Lords, and Star-Lords calculations', targetScreen: 'kp' },
      { id: 'kp-cusps', title: '12 House Cusps & Planetary Significators', description: 'Level 1-4 significations for Career, Marriage, and Foreign Travel', targetScreen: 'kp' },
      { id: 'kp-horary', title: 'KP Horary (Prashna Kundli 1-249)', description: 'Instant event verification and yes/no determination via sub-lord of 1-249 seed', targetScreen: 'kp' },
      { id: 'kp-ruling', title: 'Ruling Planets (RP) Diagnostic Tool', description: 'Identify Ascendant Lord, Moon Sign Lord, and Day Lord for live queries', targetScreen: 'kp' }
    ]
  },
  {
    id: 'compatibility',
    title: 'Compatibility',
    hindiTitle: 'कुंडली मिलान एवं अनुकूलता',
    iconName: 'Heart',
    color: '#ec4899',
    subFeatures: [
      { id: 'comp-milan', title: 'Kundli Milan (Ashtakoota 36 Gunas)', description: 'Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi scoring', targetScreen: 'matching' },
      { id: 'comp-manglik', title: 'Manglik Dosha Matching & Cancellations', description: 'Mutual cancellation rules and exception remedies for peaceful marriage', targetScreen: 'matching' },
      { id: 'comp-love', title: 'Zodiac Love Compatibility Matrix', description: 'Elemental synastry between Fire, Earth, Air, and Water signs', targetScreen: 'matching' },
      { id: 'comp-name', title: 'Name Compatibility (Chaldean Match)', description: 'Vibrational harmony between two partner names', targetScreen: 'matching' }
    ]
  },
  {
    id: 'calculators',
    title: 'Calculators',
    hindiTitle: 'ज्योतिषीय कैलकुलेटर',
    iconName: 'SlidersHorizontal',
    color: '#8b5cf6',
    subFeatures: [
      { id: 'calc-lagna', title: 'Ascendant (Lagna) Calculator', description: 'Determine your exact 1st house rising sign and rising degree', targetScreen: 'kundli' },
      { id: 'calc-moon', title: 'Moon Sign (Chandra Rashi) Calculator', description: 'Find your true Vedic Moon sign and Janam Nakshatra', targetScreen: 'kundli' },
      { id: 'calc-sun', title: 'Sun Sign (Surya Rashi) Calculator', description: 'Tropical vs Sidereal Sun position in the zodiac', targetScreen: 'kundli' },
      { id: 'calc-nakshatra', title: 'Nakshatra & Pada Finder', description: '27 Lunar Mansions and 4 Pada characteristics with deity analysis', targetScreen: 'kundli' },
      { id: 'calc-sadesati', title: 'Sade Sati Phase Checker', description: 'Check if you are currently running Shani Sade Sati or Dhaiya', targetScreen: 'kundli' },
      { id: 'calc-mangal', title: 'Mangal Dosha Quick Checker', description: 'Instant calculation of Mars affliction in your natal horoscope', targetScreen: 'kundli' },
      { id: 'calc-kalsarp', title: 'Kaalsarp Yoga Checker', description: 'Check if all 7 planets are hemmed between Rahu and Ketu', targetScreen: 'kundli' },
      { id: 'calc-choghadiya', title: 'Live Choghadiya Timetable', description: 'Today\'s 8 daytime and 8 nighttime Choghadiya periods for your city', targetScreen: 'panchang' }
    ]
  },
  {
    id: 'festivals',
    title: 'Festivals',
    hindiTitle: 'व्रत एवं त्यौहार 2026',
    iconName: 'Sun',
    color: '#ea580c',
    subFeatures: [
      { id: 'fest-calendar', title: 'Complete Hindu Calendar 2026', description: 'All major Sanatan Dharma festivals, Jayantis, and auspicious days', targetScreen: 'panchang' },
      { id: 'fest-ekadashi', title: '24 Ekadashi Vrats 2026 Schedule', description: 'Nirjala, Papmochani, Devshayani, Prabodhini Ekadashi dates and Parana time', targetScreen: 'panchang' },
      { id: 'fest-purnima', title: 'Purnima & Amavasya Dates 2026', description: 'Full moon and New moon dates with Satyanarayan puja timings', targetScreen: 'panchang' },
      { id: 'fest-navratri', title: 'Chaitra & Sharad Navratri 2026', description: '9 forms of Maa Durga, Ghatasthapana Muhurat, and Kanya Pujan dates', targetScreen: 'panchang' },
      { id: 'fest-grahan', title: 'Surya & Chandra Grahan 2026', description: 'Solar and Lunar eclipse dates, visible areas, and Sutak guidelines', targetScreen: 'panchang' }
    ]
  },
  {
    id: 'misc',
    title: 'Misc',
    hindiTitle: 'विविध सेवाएं',
    iconName: 'MoreHorizontal',
    color: '#64748b',
    subFeatures: [
      { id: 'misc-celebrity', title: 'Celebrity Horoscopes Database', description: 'Analyze Janam Kundlis of World Leaders, Film Stars, and Sports Icons', targetScreen: 'kundli' },
      { id: 'misc-tv', title: 'Kaal Chakra Occult Video Discourses', description: 'In-depth Vedic lectures, Rahu remedies, and Shastra commentaries', targetScreen: 'practice' },
      { id: 'misc-learn', title: 'Learn Vedic Astrology Course', description: 'Free step-by-step masterclass covering 12 Bhavas, 9 Grahas, and 12 Rashis', targetScreen: 'academy' },
      { id: 'misc-baby', title: 'Vedic Baby Name Suggestions (Naamkaran)', description: 'Nakshatra starting syllables (Naam Akshar) with modern baby name database', targetScreen: 'baby-names' },
      { id: 'misc-ask', title: 'Ask an AI Astrologer Guru', description: 'Interactive real-time consultation with Vedic AI Daivajna', targetScreen: 'mentor' }
    ]
  }
];

export const ASTROSAGE_HOME_GRID_TILES: AstroGridTile[] = [
  {
    id: 'karma-matrix-ledger',
    title: 'Karma & Dharmic Ledger',
    hindiTitle: 'कर्म फल दर्पण व पाप-पुण्य लेखा',
    iconName: 'Scale',
    category: 'Karma',
    badge: 'New Feature',
    bgColor: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
    description: 'Track good deeds (Punya), transgressions (Papa), Sanchita-Prarabdha balance, 5 cosmic debts (Pancha Rina), and Prayashchitta remedies.',
    targetScreen: 'karma',
    subFeatures: [
      { id: 'karm-punya', title: 'Good Deeds (Punya) Tracker', description: 'Log and calculate merit from Annadana, Vidya Dana, Go-Seva, and truthfulness', targetScreen: 'karma' },
      { id: 'karm-papa', title: 'Sins & Mistakes Confession Ledger', description: 'Evaluate karmic toll of speech cruelty, deception, envy, and duty neglect', targetScreen: 'karma' },
      { id: 'karm-debts', title: '5 Sacred Cosmic Debts (Pancha Rina)', description: 'Ancestral (Pitru), nature (Deva), and teacher (Rishi) clearance balance', targetScreen: 'karma' },
      { id: 'karm-remedy', title: 'Prayashchitta (Atonement) Audio & Upayas', description: 'Sacred frequencies, Gayatri/Mrityunjaya chanting, and restorative charity', targetScreen: 'karma' }
    ]
  },
  {
    id: 'dhruv-software',
    title: 'Dhruv Astro Software',
    hindiTitle: 'ध्रुव एस्ट्रो सॉफ्टवेयर',
    iconName: 'Laptop',
    category: 'Software',
    badge: 'Pro',
    bgColor: 'bg-blue-500/15',
    iconColor: 'text-blue-400',
    description: 'Cloud professional Vedic astrology calculation suite with divisional charts D1-D60.',
    targetScreen: 'kundli',
    subFeatures: [
      { id: 'dhruv-d1-d60', title: 'Shodashvarga Charts (D1 to D60)', description: 'Explore all 16 divisional charts including Navamsha, Dashamsha, and Shashtiamsha', targetScreen: 'kundli' },
      { id: 'dhruv-shadbala', title: 'Shadbala & Bhava Bala Matrix', description: 'Positional, directional, temporal, and motional strength calculations', targetScreen: 'kundli' },
      { id: 'dhruv-ashtakvarga', title: 'Complete Sarvashtakvarga Grid', description: '337 points distribution for precise transit timing', targetScreen: 'kundli' },
      { id: 'dhruv-dasha', title: 'Vimshottari & Char Dasha Sequence', description: '120-year planetary dasha periods calculated down to Sookshma level', targetScreen: 'kundli' }
    ]
  },
  {
    id: 'career-counselling',
    title: 'Career Counselling',
    hindiTitle: 'करियर मार्गदर्शन',
    iconName: 'Briefcase',
    category: 'Career',
    badge: 'Trending',
    bgColor: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    description: '10th house D10 Dashamsha chart evaluation for ideal profession, government job yogas, and business success.',
    targetScreen: 'kundli',
    subFeatures: [
      { id: 'car-d10', title: 'D10 Dashamsha Career Chart', description: 'Unveil professional strengths, leadership potential, and industry fit', targetScreen: 'kundli' },
      { id: 'car-sarkari', title: 'Sarkari Naukri (Govt Job) Yogas', description: 'Sun, Mars, and Jupiter planetary combinations for competitive exams', targetScreen: 'kundli' },
      { id: 'car-business', title: 'Business vs Job Analysis (7th & 10th Houses)', description: 'Mercury, 2nd house wealth, and 11th house gains indicator', targetScreen: 'kundli' },
      { id: 'car-timing', title: 'Promotion & Job Change Timing', description: 'Favorable planetary dashas and transits for career advancements', targetScreen: 'kundli' }
    ]
  },
  {
    id: 'brihat-kundli',
    title: 'Brihat Kundli',
    hindiTitle: 'बृहत् कुंडली',
    iconName: 'BookMarked',
    category: 'Kundli',
    badge: '50+ Pgs',
    bgColor: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
    description: 'Comprehensive 50+ page sacred horoscope dossier covering all 12 bhavas, dashas, and lifetime predictions.',
    targetScreen: 'kundli',
    subFeatures: [
      { id: 'bri-full', title: 'Full Lifetime Predictions Dossier', description: 'Childhood, youth, mid-career, and retirement planetary roadmaps', targetScreen: 'kundli' },
      { id: 'bri-yogas', title: '300+ Vedic Yogas Detection', description: 'Gajakesari, Pancha Mahapurusha, Budhaditya, Neechbhanga Raj Yoga', targetScreen: 'kundli' },
      { id: 'bri-dosh', title: 'Dosha Assessment (Manglik, Kalsarp, Pitra)', description: 'Severity score and authentic remedial procedures', targetScreen: 'kundli' },
      { id: 'bri-print', title: 'Export & Print Sacred PDF Report', description: 'High-resolution ceremonial horoscope ready for downloading', targetScreen: 'kundli' }
    ]
  },
  {
    id: 'talk-to-astrologers',
    title: 'Talk To Astrologers',
    hindiTitle: 'ज्योतिषी से बात करें',
    iconName: 'PhoneCall',
    category: 'Consultation',
    badge: 'Live',
    bgColor: 'bg-rose-500/15',
    iconColor: 'text-rose-400',
    description: 'Instant live conversation with enlightened Vedic Gurus, KP specialists, and Lal Kitab masters.',
    targetScreen: 'mentor',
    subFeatures: [
      { id: 'talk-swami', title: 'Consult Swami Ji (Vedic Rishi)', description: 'Spiritual clarity, deep Kundli dosha removal, and mantra initiation', targetScreen: 'mentor' },
      { id: 'talk-arjun', title: 'Consult Pandit Arjun (Parashari Expert)', description: 'Job, wealth, marriage timing, and dasha analysis', targetScreen: 'mentor' },
      { id: 'talk-kp', title: 'Consult Mr. Krishnamurti (KP Horary)', description: 'Instant yes/no questions and 1-249 Horary timing', targetScreen: 'mentor' },
      { id: 'talk-love', title: 'Consult Love Guru Dev (Synastry Master)', description: 'Relationship guidance, 36 Guna matching, and heartbreak healing', targetScreen: 'mentor' }
    ]
  },
  {
    id: 'exam-results',
    title: 'Exam Results / Education',
    hindiTitle: 'शिक्षा एवं परीक्षा योग',
    iconName: 'GraduationCap',
    category: 'Education',
    bgColor: 'bg-orange-500/15',
    iconColor: 'text-orange-400',
    description: '5th house intelligence, 4th house formal schooling, and Mercury-Jupiter vidya yogas for student success.',
    targetScreen: 'kundli',
    subFeatures: [
      { id: 'edu-5th', title: '5th House Vidya & Buddhi Analysis', description: 'Memory retention, intellectual capacity, and higher learning', targetScreen: 'kundli' },
      { id: 'edu-saraswati', title: 'Saraswati Yoga & Upayas for Concentration', description: 'Maa Saraswati Beej Mantra and Emerald / Vidhara root remedies', targetScreen: 'gemstones' },
      { id: 'edu-field', title: 'Auspicious Higher Education Stream Selection', description: 'Engineering, Medicine, Law, Arts, or Commerce indications', targetScreen: 'kundli' },
      { id: 'edu-foreign', title: 'Foreign Study (Videsh Yatra) Yogas', description: '9th and 12th house connections for overseas education', targetScreen: 'kundli' }
    ]
  },
  {
    id: 'kaalchakra-marriage',
    title: 'Kaal Chakra Vivah Sanskar',
    hindiTitle: 'विवाह एवं संबंध',
    iconName: 'HeartHandshake',
    category: 'Marriage',
    badge: 'Match',
    bgColor: 'bg-pink-500/15',
    iconColor: 'text-pink-400',
    description: 'Complete marriage matchmaking, 7th house partner profile, and Vivah Muhurat selection.',
    targetScreen: 'matching',
    subFeatures: [
      { id: 'mar-36guna', title: '36 Guna Ashtakoota Milan', description: 'Detailed scoring of Nadi (8 pts), Bhakoot (7 pts), and Gana (6 pts)', targetScreen: 'matching' },
      { id: 'mar-partner', title: 'Spouse Appearance & Characteristics', description: '7th house lord, Navamsha Lagna, and Venus/Jupiter placement', targetScreen: 'matching' },
      { id: 'mar-timing', title: 'Marriage Timing Calculator (Vivah Yog)', description: 'Transits of Jupiter over 7th house and Dasha activations', targetScreen: 'matching' },
      { id: 'mar-muhurat', title: 'Upcoming Shubh Vivah Muhurats 2026-2027', description: 'Sacred wedding dates according to Hindu Panchang', targetScreen: 'panchang' }
    ]
  },
  {
    id: 'lal-kitab-horoscope',
    title: 'Lal Kitab Horoscope',
    hindiTitle: 'लाल किताब कुंडली',
    iconName: 'BookOpen',
    category: 'Lal Kitab',
    bgColor: 'bg-red-500/15',
    iconColor: 'text-red-400',
    description: 'Unique Persian-Vedic astrological system with sleeping planets, sacrifice trees, and practical totkas.',
    targetScreen: 'lalkitab',
    subFeatures: [
      { id: 'lkh-teva', title: 'Lal Kitab Teva & Fixed House Chart', description: '12 houses with fixed sign rulers and planetary aspects', targetScreen: 'lalkitab' },
      { id: 'lkh-debts', title: '9 Ancestral Debts (Rin Nivaran)', description: 'Pitra Rin, Matri Rin, Stri Rin, Swa Rin remedies', targetScreen: 'lalkitab' },
      { id: 'lkh-totkas', title: 'Practical Day-to-Day Upayas', description: 'Remedies using copper, brass, jaggery, silver, and feeding animals', targetScreen: 'lalkitab' },
      { id: 'lkh-soye', title: 'Sleeping vs Awakened Planets (Soye Grah)', description: 'How to awaken benefic planets and calm malefic ones', targetScreen: 'lalkitab' }
    ]
  },
  {
    id: 'sade-sati-life-report',
    title: 'Sade Sati Life Report',
    hindiTitle: 'शनि साढ़े साती रिपोर्ट',
    iconName: 'Clock',
    category: 'Saturn',
    badge: 'Critical',
    bgColor: 'bg-purple-500/15',
    iconColor: 'text-purple-400',
    description: '7.5-year Saturn transit over natal Moon. Detailed analysis of 1st, 2nd, and 3rd Dhaiyas with protective remedies.',
    targetScreen: 'kundli',
    subFeatures: [
      { id: 'ss-current', title: 'Current Sade Sati / Dhaiya Status', description: 'Check if Saturn is transiting 12th, 1st, or 2nd from natal Moon', targetScreen: 'kundli' },
      { id: 'ss-phases', title: '3 Phases (Rising, Peak, Setting) Breakdown', description: 'Mental, financial, and physical impacts of each phase', targetScreen: 'kundli' },
      { id: 'ss-remedies', title: 'Shani Shanti Upays & Hanuman Chalisa', description: 'Mustard oil donation, blue sapphire guidelines, and Shani Stotra', targetScreen: 'gemstones' },
      { id: 'ss-timeline', title: 'Lifetime Sade Sati Calendar (Birth to 80 Yrs)', description: 'Historical and future periods of Sade Sati and Kantak Shani', targetScreen: 'kundli' }
    ]
  },
  {
    id: 'varshphal-year-analysis',
    title: 'Year Analysis (Varshphal)',
    hindiTitle: 'वर्षफल (वार्षिक कुंडली)',
    iconName: 'CalendarCheck',
    category: 'Varshphal',
    bgColor: 'bg-yellow-500/15',
    iconColor: 'text-yellow-400',
    description: 'Solar return Tajika annual chart with Muntha position, Varshesh lord, and 16 Tajika Yogas.',
    targetScreen: 'kundli',
    subFeatures: [
      { id: 'var-muntha', title: 'Muntha Placement & Significance', description: 'Evaluating the annual moving ascendant point for good fortune', targetScreen: 'kundli' },
      { id: 'var-lord', title: 'Varshesh (Ruler of the Year)', description: 'Planetary strength of the ruling planet for the next 12 months', targetScreen: 'kundli' },
      { id: 'var-sahams', title: 'Tajika Sahams (Sensitive Points)', description: 'Punya Saham (Fortune), Vidya Saham (Education), and Yash Saham (Fame)', targetScreen: 'kundli' },
      { id: 'var-quarters', title: 'Quarterly Year Breakdown', description: 'Detailed prediction for Q1, Q2, Q3, and Q4 of the solar year', targetScreen: 'kundli' }
    ]
  },
  {
    id: 'baby-name-suggestion',
    title: 'Baby Name Suggestion',
    hindiTitle: 'नामकरण एवं नामाक्षर',
    iconName: 'Baby',
    category: 'Naamkaran',
    bgColor: 'bg-pink-500/15',
    iconColor: 'text-pink-400',
    description: 'Select auspicious Vedic baby names based on Janam Nakshatra Pada syllables and Chaldean numerology.',
    targetScreen: 'baby-names',
    subFeatures: [
      { id: 'bn-nakshatra', title: 'Auspicious First Syllable (Naam Akshar)', description: 'Calculate sound vibration of the Moon\'s exact Nakshatra Pada at birth', targetScreen: 'baby-names' },
      { id: 'bn-chaldean', title: 'Chaldean Name Numerology Harmony', description: 'Ensure the name totals to a lucky number compatible with birth Mulank', targetScreen: 'baby-names' },
      { id: 'bn-database', title: 'Browse 5000+ Modern & Traditional Vedic Names', description: 'Filter by Gender, Religion, Meaning, and Sanskrit root origin', targetScreen: 'baby-names' },
      { id: 'bn-muhurat', title: 'Naamkaran Samskara Auspicious Muhurat', description: 'Best day and time for performing the ceremonial baby naming', targetScreen: 'panchang' }
    ]
  },
  {
    id: 'gochar-phal-transit',
    title: 'Gochar Phal (Transit)',
    hindiTitle: 'गोचर फल (ग्रह भ्रमण)',
    iconName: 'Orbit',
    category: 'Transits',
    bgColor: 'bg-indigo-500/15',
    iconColor: 'text-indigo-400',
    description: 'Live real-time planetary transits across 12 houses and their immediate impacts on health, money, and mind.',
    targetScreen: 'transits',
    subFeatures: [
      { id: 'goc-live', title: 'Live Planetary Sky Map & Degrees', description: 'Current positions of Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu', targetScreen: 'transits' },
      { id: 'goc-retro', title: 'Retrograde Planets Tracker (Vakri Grah)', description: 'Impact of retrograde motions on decision making and delays', targetScreen: 'transits' },
      { id: 'goc-rashi', title: 'Transit Impact on Your Natal Moon Sign', description: 'Benefic and malefic houses for each transiting planet', targetScreen: 'transits' },
      { id: 'goc-major', title: 'Major Slow Planet Shifts (Jupiter & Saturn)', description: 'Deep dive into 1-year and 2.5-year planetary transitions', targetScreen: 'transits' }
    ]
  },
  {
    id: 'life-report',
    title: 'Life Report',
    hindiTitle: 'सम्पूर्ण जीवन रिपोर्ट',
    iconName: 'FileText',
    category: 'Report',
    badge: 'Free',
    bgColor: 'bg-teal-500/15',
    iconColor: 'text-teal-400',
    description: 'Holistic assessment of physical constitution, financial prosperity, spiritual evolution, and destiny markers.',
    targetScreen: 'report',
    subFeatures: [
      { id: 'lr-destiny', title: 'Core Soul Archetype & Life Purpose', description: 'Life Path number, Atmakaraka planet, and Lagna constitution', targetScreen: 'report' },
      { id: 'lr-timeline', title: 'Milestone Life Timeline', description: 'Major astrological inflection points across your lifetime', targetScreen: 'report' },
      { id: 'lr-chakra', title: 'Aura & Bio-Resonance Analysis', description: 'Dominant chakra vibration and harmonic frequency', targetScreen: 'report' }
    ]
  },
  {
    id: 'online-astrology',
    title: 'Online Astrology',
    hindiTitle: 'ऑनलाइन ज्योतिष',
    iconName: 'Globe',
    category: 'Tools',
    bgColor: 'bg-cyan-500/15',
    iconColor: 'text-cyan-400',
    description: 'Instant birth chart casting and real-time astro calculation engine based on NASA ephemeris.',
    targetScreen: 'kundli',
    subFeatures: [
      { id: 'oa-cast', title: 'Cast Natal Chart Instantly', description: 'Enter Date, Time, and City for high-precision ephemeris calculations', targetScreen: 'kundli' },
      { id: 'oa-western', title: 'Tropical vs Sidereal Comparison', description: 'Understand the Ayanamsha (Lahiri, KP, Raman) differences', targetScreen: 'kundli' }
    ]
  },
  {
    id: 'hindi-kundli',
    title: 'Hindi Kundli',
    hindiTitle: 'हिंदी कुंडली',
    iconName: 'Languages',
    category: 'Hindi',
    bgColor: 'bg-orange-500/15',
    iconColor: 'text-orange-400',
    description: 'सम्पूर्ण जन्म कुंडली, ग्रह स्थिति, महादशा, अंतर्दशा एवं सटीक फलकथन शुद्ध हिंदी भाषा में।',
    targetScreen: 'kundli',
    subFeatures: [
      { id: 'hk-lagna', title: 'लग्न एवं नवमांश चक्र हिंदी में', description: '12 भावों और 9 ग्रहों का विस्तृत हिंदी विश्लेषण', targetScreen: 'kundli' },
      { id: 'hk-dasha', title: 'विंशोत्तरी महादशा एवं अंतर्दशा', description: 'वर्तमान व आगामी दशाओं का प्रभाव व उपाय', targetScreen: 'kundli' },
      { id: 'hk-upay', title: 'शास्त्रीय एवं व्यावहारिक उपाय', description: 'रत्न, मंत्र, दान एवं पूजा-पाठ से ग्रह शांति', targetScreen: 'gemstones' }
    ]
  },
  {
    id: 'numerology-calculator',
    title: 'Numerology Calculator',
    hindiTitle: 'अंक ज्योतिष कैलकुलेटर',
    iconName: 'Calculator',
    category: 'Numerology',
    bgColor: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    description: 'Calculate Mulank (Birth Date sum), Bhagyank (Full DOB sum), Lo Shu grid, and name vibrations.',
    targetScreen: 'numerology',
    subFeatures: [
      { id: 'nc-driver', title: 'Mulank (Driver) & Bhagyank (Conductor)', description: 'Core numbers dictating your innate personality and destiny flow', targetScreen: 'numerology' },
      { id: 'nc-loshu', title: 'Lo Shu 3x3 Magic Grid', description: 'Analyze your elemental strengths in Wood, Fire, Earth, Metal, Water', targetScreen: 'numerology' },
      { id: 'nc-rajyogas', title: '8 Sacred Raj Yogas in Lo Shu', description: 'Golden (4-5-6), Silver (2-5-8), Thought, Will, and Action planes', targetScreen: 'numerology' },
      { id: 'nc-missing', title: 'Missing Number Remedies', description: 'Simple remedies to balance missing numbers in your grid', targetScreen: 'numerology' }
    ]
  },
  {
    id: 'celebrity-horoscope',
    title: 'Celebrity Horoscope',
    hindiTitle: 'प्रसिद्ध हस्तियों की कुंडली',
    iconName: 'Crown',
    category: 'Celebrity',
    bgColor: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
    description: 'Explore verified birth charts of legendary leaders, scientists, actors, and sports champions.',
    targetScreen: 'kundli',
    subFeatures: [
      { id: 'cel-modi', title: 'Narendra Modi (Vrischika Lagna & Raj Yogas)', description: 'Gajakesari and Ruchaka Yoga in the chart of the Indian Prime Minister', targetScreen: 'kundli' },
      { id: 'cel-kalam', title: 'Dr. A.P.J. Abdul Kalam (Dhanu Lagna)', description: 'Jupiter-Sun-Mercury combination for science and spirituality', targetScreen: 'kundli' },
      { id: 'cel-sachin', title: 'Sachin Tendulkar (Simha Lagna)', description: 'Exalted Sun and Mars combinations creating sports mastery', targetScreen: 'kundli' },
      { id: 'cel-srk', title: 'Shah Rukh Khan (Simha Lagna Venus Impact)', description: 'Venus in 3rd house with Mars aspect generating global charisma', targetScreen: 'kundli' }
    ]
  },
  {
    id: 'learn-astrology',
    title: 'Learn Astrology',
    hindiTitle: 'ज्योतिष सीखें',
    iconName: 'GraduationCap',
    category: 'Academy',
    bgColor: 'bg-blue-500/15',
    iconColor: 'text-blue-400',
    description: 'Comprehensive curriculum covering 12 Rashis, 9 Grahas, 27 Nakshatras, and reading techniques.',
    targetScreen: 'academy',
    subFeatures: [
      { id: 'la-basics', title: 'Vedic Astrology 101 Foundations', description: 'Understanding the 12 houses and planetary lordships', targetScreen: 'academy' },
      { id: 'la-navamsha', title: 'Navamsha (D9) Mastery', description: 'How to assess the strength of planets in the D9 chart', targetScreen: 'academy' },
      { id: 'la-dashas', title: 'Predictive Timing with Vimshottari Dasha', description: 'Techniques for pinpointing major career and marriage events', targetScreen: 'academy' },
      { id: 'la-certification', title: 'Academy Quizzes & Certification', description: 'Test your astrological intuition and receive honors', targetScreen: 'academy' }
    ]
  },
  {
    id: 'love-horoscope',
    title: 'Love Horoscope',
    hindiTitle: 'प्रेम राशिफल',
    iconName: 'Heart',
    category: 'Love',
    bgColor: 'bg-rose-500/15',
    iconColor: 'text-rose-400',
    description: 'Romantic forecast for couples and singles. Venus transits, 5th house passion, and 7th house harmony.',
    targetScreen: 'rashifal',
    subFeatures: [
      { id: 'lh-daily', title: 'Daily Love & Flirt Forecast', description: 'Romantic luck score and favorable times for romantic conversations', targetScreen: 'rashifal' },
      { id: 'lh-synastry', title: 'Venus-Mars Chemistry Analysis', description: 'How your planetary love languages complement each other', targetScreen: 'matching' },
      { id: 'lh-remedies', title: 'Love Harmony Upayas (Shukra Shanti)', description: 'Attracting true soul resonance with Rose Quartz & Shukra Mantras', targetScreen: 'gemstones' }
    ]
  },
  {
    id: 'gemstones-report',
    title: 'Gemstones Report',
    hindiTitle: 'रत्न परामर्श रिपोर्ट',
    iconName: 'Gem',
    category: 'Gemstones',
    bgColor: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    description: 'Identify your Bhagya Ratna (Lucky Gemstone), Lagna Ratna (Life Gemstone), and subtle wearing rules.',
    targetScreen: 'gemstones',
    subFeatures: [
      { id: 'gr-life', title: 'Lagna Ratna (Life Stone)', description: 'Strengthens vitality, physical health, and personal charisma', targetScreen: 'gemstones' },
      { id: 'gr-lucky', title: 'Bhagya Ratna (Fortune Stone - 9th Lord)', description: 'Unlocks good luck, spiritual grace, and smooth endeavors', targetScreen: 'gemstones' },
      { id: 'gr-vidhi', title: 'Purification & Energizing (Prana Pratishtha) Vidhi', description: 'Auspicious day, metal (Gold, Silver, Panchdhatu), and finger guide', targetScreen: 'gemstones' },
      { id: 'gr-rudraksha', title: 'Mukhi Rudraksha Pairings', description: 'Combine sacred beads with gemstones for amplified protection', targetScreen: 'gemstones' }
    ]
  },
  {
    id: 'mangal-dosha',
    title: 'Mangal Dosha',
    hindiTitle: 'मांगलिक दोष निवारण',
    iconName: 'ShieldAlert',
    category: 'Doshas',
    badge: 'Check',
    bgColor: 'bg-red-500/15',
    iconColor: 'text-red-400',
    description: 'Evaluate Mars placement in 1st, 4th, 7th, 8th, or 12th houses from Lagna, Moon, and Venus.',
    targetScreen: 'kundli',
    subFeatures: [
      { id: 'md-calc', title: 'Mangal Dosha Severity Calculator', description: 'Determine Low, Medium, or Anshik Manglik status', targetScreen: 'kundli' },
      { id: 'md-cancel', title: 'Mangal Dosha Cancellation Rules', description: 'Check if Mars is in own sign, exalted, or aspected by Jupiter', targetScreen: 'matching' },
      { id: 'md-upay', title: 'Kumbh Vivah & Hanuman Puja Remedies', description: 'Time-tested Vedic rituals to neutralize Mars aggression', targetScreen: 'gemstones' }
    ]
  },
  {
    id: 'ascendant-calculator',
    title: 'Ascendant Calculator',
    hindiTitle: 'लग्न कैलकुलेटर',
    iconName: 'Sun',
    category: 'Calculators',
    bgColor: 'bg-yellow-500/15',
    iconColor: 'text-yellow-400',
    description: 'Calculate your exact rising sign on the eastern horizon at the precise minute of your birth.',
    targetScreen: 'kundli',
    subFeatures: [
      { id: 'asc-exact', title: 'Exact Lagna Degree & Nakshatra', description: 'Uncover the rising sign, sub-lord, and rising navamsha', targetScreen: 'kundli' },
      { id: 'asc-lord', title: 'Lagna Lord Placement & Strength', description: 'How the physical ruler of your chart influences health and drive', targetScreen: 'kundli' }
    ]
  },
  {
    id: 'todays-rahukaal',
    title: 'Today\'s Rahukaal',
    hindiTitle: 'आज का राहुकाल',
    iconName: 'Clock',
    category: 'Panchang',
    badge: 'Live',
    bgColor: 'bg-gray-500/15',
    iconColor: 'text-gray-300',
    description: 'Live daily inauspicious 90-minute window ruled by Rahu. Never start new ventures during this time.',
    targetScreen: 'panchang',
    subFeatures: [
      { id: 'rk-live', title: 'Live Rahu Kaal Timer & Countdown', description: 'Exact start and end times for your current geographic coordinates', targetScreen: 'panchang' },
      { id: 'rk-yamaganda', title: 'Yamaganda & Gulika Kaal Periods', description: 'Additional inauspicious Muhurat windows to avoid', targetScreen: 'panchang' },
      { id: 'rk-abhijit', title: 'Abhijit Muhurat (Auspicious Counterpart)', description: 'The most auspicious 48-minute midday window that destroys all doshas', targetScreen: 'panchang' }
    ]
  },
  {
    id: 'kaalchakra-tv',
    title: 'Kaal Chakra Shastra Discourses',
    hindiTitle: 'काल चक्र प्रवचन एवं व्याख्यान',
    iconName: 'Tv',
    category: 'Media',
    bgColor: 'bg-rose-500/15',
    iconColor: 'text-rose-400',
    description: 'Sacred discourses, planetary transit explainers, Shani remedies, and Vedic shastra videos.',
    targetScreen: 'practice',
    subFeatures: [
      { id: 'tv-discourses', title: 'Vedic Shastra Discourses', description: 'Deep dive into Parashara, Jaimini, and Bhrigu Samhita concepts', targetScreen: 'practice' },
      { id: 'tv-remedies', title: 'Live Remedial Ritual Demonstrations', description: 'How to energize Yantras and chant Beej Mantras properly', targetScreen: 'practice' }
    ]
  },
  {
    id: 'occult-directory',
    title: 'Occult Directory',
    hindiTitle: 'गूढ़ ज्ञान भंडार',
    iconName: 'Book',
    category: 'Occult',
    bgColor: 'bg-purple-500/15',
    iconColor: 'text-purple-400',
    description: 'Comprehensive compendium of Tantra, Mantra, Yantra, Vastu, Palmistry, and Dream interpretation.',
    targetScreen: 'portal',
    subFeatures: [
      { id: 'od-prashnavali', title: 'Sacred Ramcharitmanas Prashnavali', description: 'Divine 15x15 oracle for instant guidance', targetScreen: 'prashnavali' },
      { id: 'od-vastu', title: '16 Directions Vastu Shastra', description: 'Architectural energy balancing for homes and offices', targetScreen: 'vastu' },
      { id: 'od-mala', title: '108 Bead Mantra Japa Counter', description: 'Focus and meditation counter with ambient audio frequencies', targetScreen: 'japa-mala' }
    ]
  },
  {
    id: 'chinese-astrology',
    title: 'Chinese Astrology',
    hindiTitle: 'चीनी ज्योतिष (12 राशियां)',
    iconName: 'Sparkles',
    category: 'Chinese',
    bgColor: 'bg-red-500/15',
    iconColor: 'text-red-400',
    description: '12 Chinese Animal Signs (Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig) and 5 Elements.',
    targetScreen: 'rashifal',
    subFeatures: [
      { id: 'ca-sign', title: 'Find Your Chinese Zodiac Animal', description: 'Calculate based on your lunar birth year and Yin/Yang polarity', targetScreen: 'rashifal' },
      { id: 'ca-elements', title: '5 Elements (Wood, Fire, Earth, Metal, Water)', description: 'Understand your element\'s influence on character and destiny', targetScreen: 'rashifal' },
      { id: 'ca-compatibility', title: 'Chinese Animal Compatibility Matrix', description: 'Discover your harmonious Trines and secret animal friends', targetScreen: 'matching' }
    ]
  },
  {
    id: 'kaalsarp-dosha',
    title: 'Kaalsarp Dosha',
    hindiTitle: 'कालसर्प दोष एवं 12 प्रकार',
    iconName: 'Zap',
    category: 'Doshas',
    badge: 'Remedy',
    bgColor: 'bg-indigo-500/15',
    iconColor: 'text-indigo-400',
    description: 'Formed when all planets are placed between Rahu and Ketu. Identify which of the 12 Kaalsarp yogas is present.',
    targetScreen: 'kundli',
    subFeatures: [
      { id: 'ks-12types', title: '12 Types of Kaalsarp Dosha Checker', description: 'Anant, Kulik, Vasuki, Shankhpal, Padma, Mahapadma, Takshak, Karkotak, Shankhachood, Ghatak, Vishdhar, Sheshnag', targetScreen: 'kundli' },
      { id: 'ks-symptoms', title: 'Key Symptoms & Life Delays', description: 'Obstacles in career, marriage delays, or repetitive serpent dreams', targetScreen: 'kundli' },
      { id: 'ks-upay', title: 'Mahamrityunjaya & Nag Panchami Upays', description: 'Silver snake offering, Rudrabhishekam, and Rahu-Ketu Shanti', targetScreen: 'gemstones' }
    ]
  },
  {
    id: 'astrology-calculators',
    title: 'Astrology Calculators',
    hindiTitle: 'सम्पूर्ण ज्योतिष कैलकुलेटर',
    iconName: 'Calculator',
    category: 'Calculators',
    bgColor: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    description: 'Instant calculators for Moon Sign, Nakshatra, Dasha, Atmakaraka, Choghadiya, and Planetary positions.',
    targetScreen: 'kundli',
    subFeatures: [
      { id: 'ac-moon', title: 'Moon Sign & Nakshatra Calculator', description: 'Find your true Janma Rashi and birth star', targetScreen: 'kundli' },
      { id: 'ac-atmakaraka', title: 'Jaimini Karakas (Atmakaraka, Amatyakaraka)', description: 'Calculate the highest degree planet representing your soul', targetScreen: 'kundli' },
      { id: 'ac-choghadiya', title: 'Day/Night Choghadiya Calculator', description: 'Real-time calculation of auspicious travel & work hours', targetScreen: 'panchang' },
      { id: 'ac-panchang', title: 'Daily Panchang Calculator', description: 'Tithi, Nakshatra, Yoga, Karana generator', targetScreen: 'panchang' }
    ]
  },
  {
    id: 'compatibility-tools',
    title: 'Compatibility Tools',
    hindiTitle: 'मैचमेकिंग एवं अनुकूलता',
    iconName: 'Heart',
    category: 'Compatibility',
    bgColor: 'bg-pink-500/15',
    iconColor: 'text-pink-400',
    description: 'Complete relationship synastry toolkit: 36 Gunas, Love Meter, Zodiac Synastry, and Chaldean Name Matching.',
    targetScreen: 'matching',
    subFeatures: [
      { id: 'ct-36guna', title: 'Ashtakoota 36 Guna Milan', description: 'Check score out of 36 with Nadi dosha and Bhakoot dosha status', targetScreen: 'matching' },
      { id: 'ct-lovemeter', title: 'Zodiac Love Compatibility Meter', description: 'Assess emotional, mental, and physical harmony percentages', targetScreen: 'matching' },
      { id: 'ct-name', title: 'Name Vibrational Compatibility', description: 'Calculate relationship harmony using Chaldean name values', targetScreen: 'matching' }
    ]
  }
];
