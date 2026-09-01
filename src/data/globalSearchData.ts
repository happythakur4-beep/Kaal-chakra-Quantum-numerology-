import { ScreenType } from '../types';
import { ALL_COURSES, INITIAL_CONSULTATIONS } from './mockData';
import { AI_ASTROLOGERS_LIST, ASTROSAGE_HOME_GRID_TILES } from './astroSageDirectory';

export type SearchCategoryType = 'master' | 'engine' | 'tool' | 'course' | 'consultation' | 'astrosage' | 'action';

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
  isMasterShastra?: boolean;
  code?: string;
}

export const GLOBAL_SEARCH_ITEMS: SearchResultItem[] = [
  // ==========================================
  // 🌟 THE 9 MASTER SHASTRA PORTALS 🌟
  // ==========================================
  {
    id: 'master-gita-confession',
    title: 'Gita Sin Confession & Prayashchitta Sanctum',
    hindiTitle: 'श्रीमद्भगवद्गीता महापाप स्वीकारोक्ति एवं प्रायश्चित्त मण्डप',
    subtitle: 'Sacred Altar, 14 Great Sins Penal Decree & Agni Fire Dissolution',
    category: 'master',
    categoryLabel: 'Master Shastra Sanctum',
    iconName: 'Flame',
    iconColor: 'text-amber-400',
    isMasterShastra: true,
    code: 'GITA-00',
    keywords: [
      'gita', 'confession', 'prayashchitta', 'sin', 'sins', 'karma', 'pap', 'papa', 'moksha',
      'bhagavad gita', '14 sins', 'penal decree', 'agni', 'fire dissolution', 'altar',
      'repentance', 'redemption', 'shuddhi', 'karmic debt', '21 day vow', 'shloka', 'krishna',
      'paap mukti', 'confess', 'prayaschita', 'shanti'
    ],
    description: 'Consecrated altar based on BG 9.30 & 18.66 with the 14 Great Sins penal decree, interactive Agni fire dissolution ritual, and 21-day redemptive vow matrix.',
    targetScreen: 'karma',
    actionType: 'navigate',
    badge: 'Master Shastra'
  },
  {
    id: 'master-mind-healing',
    title: 'Mind-Over-Illness: Cellular Epigenetics & Bio-Resonance',
    hindiTitle: 'चित्त रोग मुक्ति • मानसिक स्वास्थ्य एवं कायाकल्प',
    subtitle: 'Control Mind & Eliminate Any Illness via Epigenetics & Bio-Photons',
    category: 'master',
    categoryLabel: 'Master Shastra Sanctum',
    iconName: 'Brain',
    iconColor: 'text-emerald-400',
    isMasterShastra: true,
    code: 'MED-01',
    keywords: [
      'mind healing', 'cellular healing', 'epigenetics', 'illness', 'disease', 'cure', 'heal body',
      'cancer', 'diabetes', 'blood pressure', 'migraine', 'arthritis', 'anxiety', 'autoimmune',
      'thyroid', 'asthma', 'gut', 'ibs', 'vagus nerve', 'biofield', 'solfeggio', '528hz', '432hz',
      'rog mukti', 'dhanvantari', 'subconscious mind', 'bio-photons', 'cellular laser', 'healing'
    ],
    description: 'Empower subconscious biofield commands to regenerate tissues, lower systemic inflammation, stimulate vagal tone, and dissolve disease with 528Hz Solfeggio laser projection.',
    targetScreen: 'mind-healing',
    actionType: 'navigate',
    badge: 'Master Shastra'
  },
  {
    id: 'master-memory-hypnosis',
    title: 'Memory Reconsolidation Hypnosis Chamber',
    hindiTitle: 'स्मृति शोधन एवं हिप्नोसिस • ३D ब्रेन सिमुलेशन',
    subtitle: 'Neuro-Synaptic Decoupling, Trauma Dimmer & Roman Memory Palace',
    category: 'master',
    categoryLabel: 'Master Shastra Sanctum',
    iconName: 'Zap',
    iconColor: 'text-cyan-400',
    isMasterShastra: true,
    code: 'NEURO-02',
    keywords: [
      'memory hypnosis', 'hypnosis', 'memory reconsolidation', 'trauma', 'brain simulator',
      '3d brain', 'submodalities', 'memory palace', 'synaptic decoupling', 'ptsd', 'fear',
      'phobia', 'mental block', 'theta waves', 'binaural beats', 'trance', 'neuroscience',
      'sammohana', 'smriti shodhan'
    ],
    description: 'Extinguish traumatic memory triggers, dial down amygdala submodalities, and construct multi-hall Roman Memory Palaces using interactive 3D brain simulations and guided audio hypnosis.',
    targetScreen: 'memory-hypnosis',
    actionType: 'navigate',
    badge: 'Master Shastra'
  },
  {
    id: 'master-kundli-shodashvarga',
    title: 'Precision Lagna & Janam Kundli D1-D60',
    hindiTitle: 'जन्म लग्न कुंडली, नवमांश (D9) एवं षोडशवर्ग चक्र',
    subtitle: 'Vedic Horoscope, 16 Divisional Charts & 337 Sarvashtakvarga',
    category: 'master',
    categoryLabel: 'Master Shastra Sanctum',
    iconName: 'Compass',
    iconColor: 'text-amber-400',
    isMasterShastra: true,
    code: 'VEDIC-03',
    keywords: [
      'kundli', 'janam kundli', 'birth chart', 'horoscope', 'lagna', 'ascendant', 'navamsha', 'd9',
      'shodashvarga', 'd1', 'd10', 'd60', 'dashamsha', 'sarvashtakvarga', 'vimshottari', 'dasha',
      'planetary longitudes', 'bhavas', 'graha', 'yogas', 'kundali', 'vedic chart'
    ],
    description: 'Mathematical ascendant calculations, 16 divisional charts, 337 Sarvashtakvarga points, and 120-year Vimshottari Mahadasha timeline with astrological strength metrics.',
    targetScreen: 'kundli',
    actionType: 'navigate',
    badge: 'Master Shastra'
  },
  {
    id: 'master-matching-vivah',
    title: 'Ashtakoota 36 Guna Milan & Vivah Sanskar',
    hindiTitle: 'अष्टकूट ३६ गुण मिलान एवं संबंध सामंजस्य',
    subtitle: '36 Guna Compatibility, Nadi, Bhakoot & Mangal Dosha Filter',
    category: 'master',
    categoryLabel: 'Master Shastra Sanctum',
    iconName: 'Heart',
    iconColor: 'text-rose-400',
    isMasterShastra: true,
    code: 'VIVAH-04',
    keywords: [
      'kundli milan', 'matching', 'gun milan', '36 gunas', 'ashtakoota', 'marriage', 'vivah',
      'nadi dosha', 'bhakoot', 'gana', 'mangal dosha', 'manglik', 'compatibility', 'synastry',
      'rajju', 'vedha', 'vivah sanskar', 'horoscope matching'
    ],
    description: '36 Guna Ashtakoota Milan analysis with Nadi, Bhakoot, Gana scores, and mutual Mangal Dosha cancellation exceptions with astrological remedies.',
    targetScreen: 'matching',
    actionType: 'navigate',
    badge: 'Master Shastra'
  },
  {
    id: 'master-prashnavali-oracle',
    title: 'Ramcharitmanas Chaupai 15x15 Oracle & KP Horary',
    hindiTitle: 'श्री रामचरितमानस प्रश्नावली एवं के.पी. होरारी',
    subtitle: 'Sacred 15x15 Letter Matrix & Krishnamurti Paddhati 1-249',
    category: 'master',
    categoryLabel: 'Master Shastra Sanctum',
    iconName: 'Scroll',
    iconColor: 'text-orange-400',
    isMasterShastra: true,
    code: 'ORACLE-05',
    keywords: [
      'prashnavali', 'ramcharitmanas', 'ram shalaka', 'oracle', 'chaupai', 'tulsidas', 'horary',
      'kp 1-249', 'question', 'divination', 'ramayan', 'prashna', 'divine guidance', 'instant answer'
    ],
    description: 'Consult the consecrated 15x15 letter grid to receive instant poetic verdicts from Goswami Tulsidas’s Ramcharitmanas, combined with KP 1-249 Sub-Lord horary analysis.',
    targetScreen: 'prashnavali',
    actionType: 'navigate',
    badge: 'Master Shastra'
  },
  {
    id: 'master-loshu-numerology',
    title: 'Lo Shu 3x3 Magic Grid & 8 Cosmic Raj Yogas',
    hindiTitle: 'अंक ज्योतिष, ३x३ लो शू ग्रिड एवं ८ राजयोग',
    subtitle: 'Mulank, Bhagyank, Golden (4-5-6), Silver (2-5-8) & Name Correction',
    category: 'master',
    categoryLabel: 'Master Shastra Sanctum',
    iconName: 'Calculator',
    iconColor: 'text-emerald-400',
    isMasterShastra: true,
    code: 'NUM-06',
    keywords: [
      'lo shu', 'loshu', 'numerology', 'ank jyotish', '3x3 grid', 'magic square', 'mulank',
      'bhagyank', 'driver', 'conductor', 'raj yoga', 'golden plane', 'silver plane',
      'name numerology', 'chaldean', 'pythagorean', 'missing numbers', 'karmic numbers'
    ],
    description: 'Calculate Mulank (Driver), Bhagyank (Conductor), Name vibration, and 3x3 Lo Shu Magic Grid planes with full remedy activations for missing numbers.',
    targetScreen: 'numerology',
    actionType: 'navigate',
    badge: 'Master Shastra'
  },
  {
    id: 'master-vastu-16zone',
    title: 'MahaVastu 16-Zone Cosmic Energy Grid',
    hindiTitle: '१६ महावास्तु दिशाएं एवं पंचतत्व संतुलन',
    subtitle: '16 Compass Zones, 5 Elements & 32 Main Door Entrance Padas',
    category: 'master',
    categoryLabel: 'Master Shastra Sanctum',
    iconName: 'Grid',
    iconColor: 'text-cyan-400',
    isMasterShastra: true,
    code: 'VASTU-07',
    keywords: [
      'vastu', 'mahavastu', '16 zones', 'compass', 'panchatatva', 'five elements', 'north east',
      'ishanya', 'south east', 'agneya', 'nairutya', 'vayavya', '32 entrances', 'padas',
      'home vastu', 'office vastu', 'color strips', 'metal remedies', 'spatial energy'
    ],
    description: 'Interactive 16-zone Vastu Compass analyzing Ishanya (NE), Agneya (SE), Nairutya (SW), and Vayavya (NW) with non-demolition color, tape, and pyramid cures.',
    targetScreen: 'vastu',
    actionType: 'navigate',
    badge: 'Master Shastra'
  },
  {
    id: 'master-tesla-369-nexus',
    title: 'Nikola Tesla 3-6-9 Vortex Energy Nexus & Cosmic Orrery',
    hindiTitle: 'निकोला टेस्ला ३-६-९ ब्रह्मांडीय ऊर्जा महाद्वार',
    subtitle: 'Toroidal Vortex Keys, Black Hole Warp & Hans Cousto Cosmic Octave',
    category: 'master',
    categoryLabel: 'Master Shastra Sanctum',
    iconName: 'Zap',
    iconColor: 'text-purple-400',
    isMasterShastra: true,
    code: 'TESLA-08',
    keywords: [
      'tesla', '369', 'nikola tesla', 'vortex math', 'black hole', 'warp', 'toroid', 'orrery',
      'planets', 'galaxies', 'cousto', 'cosmic octave', 'solfeggio', 'manifestation', 'frequency',
      'akasha', 'wardenclyffe', 'quantum nexus', 'hubble', 'nasa', 'andromeda', 'gn-z11', 'lensing'
    ],
    description: 'Enter the 369 Tesla Portal through a relativistic black hole warp to explore planetary acoustics, NASA Hubble deep galaxies, Hans Cousto Cosmic Octaves, and 3-6-9 vortex math.',
    targetScreen: 'tesla-369',
    actionType: 'navigate',
    badge: 'Master Shastra'
  },
  {
    id: 'feat-hubble-galaxies-vault',
    title: 'NASA Hubble Focus: Galaxies Through Space and Time',
    hindiTitle: 'नासा हबल महा-आकाशगंगा वेधशाला (Hubble Space Focus)',
    subtitle: 'Galactic Collisions, 13.4 Billion Light-Years, Gravitational Lensing & Relic Galaxies',
    category: 'engine',
    categoryLabel: 'Cosmic Astronomy Vault',
    iconName: 'Orbit',
    iconColor: 'text-cyan-400',
    keywords: [
      'hubble', 'galaxies', 'nasa', 'esa', 'andromeda', 'm31', 'gn-z11', 'smith cloud', 'bedin 1',
      'kiso 5639', 'ngc 1277', 'markarian 231', 'gravitational lensing', 'einstein ring', 'deep field',
      'hudf', 'macs 2129-1', 'spt0615-jd', 'space and time', 'cosmic timeline'
    ],
    description: 'Explore the complete NASA Hubble Focus e-book discoveries: Andromeda PHAT survey, 4B-year galactic collisions, ancient fossils, binary black holes, and 13.4-billion-year-old cosmic frontier galaxies.',
    targetScreen: 'tesla-369',
    actionType: 'navigate',
    badge: 'NASA Hubble Focus'
  },

  // ==========================================
  // 🔮 CORE OCCULT ENGINES & FEATURES 🔮
  // ==========================================
  {
    id: 'feat-sound-healing',
    title: 'Sound Healing Suite & Tibetan Singing Bowls',
    hindiTitle: 'ध्वनि चिकित्सा एवं तिब्बती कटोरा साधना',
    subtitle: 'Chakra Frequencies, Binaural Beats, 432Hz & 528Hz Solfeggio',
    category: 'engine',
    categoryLabel: 'Sacred Acoustic Suite',
    iconName: 'Disc',
    iconColor: 'text-amber-300',
    keywords: [
      'sound healing', 'tibetan bowl', 'singing bowls', 'solfeggio', '432hz', '528hz', 'binaural beats',
      'chakra frequencies', 'sound bath', 'sound therapy', 'nada yoga', 'om chant', 'acoustic healing',
      'frequency generator', 'meditation sound'
    ],
    description: 'Immersive sound healing engine featuring 3D interactive Tibetan singing bowls, Solfeggio resonant harmonics, 7 chakra crystal bowls, and binaural brainwave synchronizers.',
    targetScreen: 'sound-healing',
    actionType: 'navigate',
    badge: '3D Acoustic'
  },
  {
    id: 'feat-energy-balance',
    title: 'Energy & Balance: Sudarshan Matrix & 49 Marma Points',
    hindiTitle: 'ऊर्जा सन्तुलन • सुदर्शन चक्र एवं ४९ मर्म बिंदु',
    subtitle: 'Nadi Calibration, Prana Flow Balancing & Bio-Energetic Harmonization',
    category: 'engine',
    categoryLabel: 'Bio-Energetic Matrix',
    iconName: 'SlidersHorizontal',
    iconColor: 'text-yellow-400',
    keywords: [
      'energy balance', 'sudarshan matrix', 'marma points', '49 marma', 'prana', 'nadi', 'ida',
      'pingala', 'sushumna', 'biofield', 'chakra balance', 'kundalini', 'aura cleansing',
      'vital energy', 'urja santulan'
    ],
    description: 'Balance the subtle energy field using the Sacred Sudarshan Yantra, 49 Marma point calibrations, and bilateral Pranic flow alignments.',
    targetScreen: 'energy-balance',
    actionType: 'navigate',
    badge: '49 Marma Points'
  },
  {
    id: 'feat-panchang',
    title: 'Aaj Ka Panchang & Shubh Muhurat',
    hindiTitle: 'दैनिक पंचांग, शुभ मुहूर्त एवं चौघड़िया',
    subtitle: 'Tithi, Nakshatra, Yoga, Karana & Planetary Horas',
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
    keywords: ['gemstones', 'ratna', 'rudraksha', 'ruby', 'pearl', 'yellow sapphire', 'blue sapphire', 'emerald', 'diamond', 'coral', 'gomed', 'cat eye', 'pukhraj', 'manik', 'panna', 'neelam', 'mukhi rudraksha'],
    description: 'Personalized gemstone recommendations based on Lagna Lord, 5th, and 9th houses with consecration rituals, wearing fingers, and compatible metals.',
    targetScreen: 'gemstones',
    actionType: 'navigate',
    badge: 'Ratna Upay'
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

  // ==========================================
  // 📚 ACADEMY COURSES
  // ==========================================
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

  // ==========================================
  // 🔮 CONSULTATIONS & AI ASTROLOGERS
  // ==========================================
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

  // Live Astrologer Gurus
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

  // ==========================================
  // 🕉️ KAAL CHAKRA 28 VEDIC SHASTRA TOOLS
  // ==========================================
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

  // ==========================================
  // ✨ ACTIONS & REPORTS
  // ==========================================
  {
    id: 'action-unlock-destiny',
    title: 'Unlock Full Destiny Life Dossier',
    hindiTitle: 'विस्तृत भाग्यफल एवं जीवन चक्र रिपोर्ट',
    subtitle: 'Generate customized multi-system Parashari & Numerology Report',
    category: 'action',
    categoryLabel: 'Interactive Service',
    iconName: 'Sparkles',
    iconColor: 'text-amber-400',
    keywords: ['destiny report', 'unlock report', 'life dossier', 'numerology profile', 'generate report', 'birth report', 'pdf report'],
    description: 'Instant synthesis of your Life Path, Soul Urge, Cosmic Archetype, and vocational planetary alignments.',
    targetScreen: undefined,
    actionType: 'report_modal',
    badge: 'Instant PDF/View'
  }
];

export const POPULAR_SEARCH_CHIPS = [
  { label: '🌟 Master Shastras', query: 'Master Shastra' },
  { label: '🔥 Gita Sin Confession', query: 'Gita Confession' },
  { label: '🧠 Mind-Over-Illness Healing', query: 'Mind Healing' },
  { label: '⚡ 369 Tesla Portal', query: 'Tesla' },
  { label: '🌌 Memory Hypnosis', query: 'Memory Hypnosis' },
  { label: '🪐 Janam Kundli D1-D60', query: 'Kundli' },
  { label: '❤️ 36 Guna Kundli Milan', query: 'Kundli Milan' },
  { label: '🔢 Lo Shu 3x3 Grid', query: 'Lo Shu' },
  { label: '🧭 16 Vastu Zones', query: 'Vastu' },
  { label: '📜 Ramcharitmanas Oracle', query: 'Prashnavali' },
  { label: '🔔 Tibetan Sound Bowls', query: 'Sound Healing' },
  { label: '📅 Aaj Ka Panchang', query: 'Panchang' },
  { label: '📕 Lal Kitab Upay', query: 'Lal Kitab' },
  { label: '💎 Ratna & Rudraksha', query: 'Ratna' },
];
