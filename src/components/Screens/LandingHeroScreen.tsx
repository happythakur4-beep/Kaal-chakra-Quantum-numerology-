import React, { useState, useRef } from 'react';
import { ScreenType, ThemeMode, AuraType } from '../../types';
import { 
  AI_ASTROLOGERS_LIST, 
  ASTROSAGE_HOME_GRID_TILES, 
  AstroGridTile, 
  SubFeatureItem,
} from '../../data/astroSageDirectory';
import { SRI_YANTRA_LOGO } from '../../data/mockData';
import { SacredGeometryParticles } from '../SacredGeometryParticles';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Compass, 
  Heart, 
  BookOpen, 
  Star, 
  Orbit, 
  Gem, 
  Bot, 
  Calculator, 
  Scroll, 
  Baby, 
  Disc,
  Laptop,
  Briefcase,
  BookMarked,
  PhoneCall,
  GraduationCap,
  HeartHandshake,
  Clock,
  CalendarCheck,
  Languages,
  Crown,
  ShieldAlert,
  Sun,
  Tv,
  Book,
  Zap,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Menu,
  MessageCircle,
  Globe,
  CheckCircle2,
  ChevronDown,
  Layers,
  Flame,
  Activity,
  Scale
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { Tesla3DLogoIcon } from '../Tesla369/Tesla3DLogoIcon';
import { FuturisticTeslaPortalButton } from '../Tesla369/FuturisticTeslaPortalButton';

interface LandingHeroScreenProps {
  theme: ThemeMode;
  activeAura?: AuraType;
  onNavigate: (screen: ScreenType) => void;
  onUnlockReport: (name: string, email: string) => void;
  onOpenDrawer: () => void;
  onOpenAstrologerChat: (astrologerId?: string) => void;
  onOpenFeatureModal: (gridTile: AstroGridTile) => void;
}

export const LandingHeroScreen: React.FC<LandingHeroScreenProps> = ({
  theme,
  activeAura = 'Calm Amber',
  onNavigate,
  onUnlockReport,
  onOpenDrawer,
  onOpenAstrologerChat,
  onOpenFeatureModal
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeShastraFilter, setActiveShastraFilter] = useState<'all' | 'kundli' | 'remedies' | 'panchang' | 'numerology' | 'occult'>('all');
  const [expandedEngineId, setExpandedEngineId] = useState<string | null>('kundli');
  const isDark = theme === 'dark';
  const astrologersScrollRef = useRef<HTMLDivElement>(null);

  // Aura-specific dynamic colors & particle glow harmonization
  const auraColorsMap: Record<AuraType, { primary: string; secondary: string; glow: string; border: string }> = {
    'Calm Amber': { primary: '#f59e0b', secondary: '#ffd700', glow: 'rgba(245, 158, 11, 0.35)', border: 'rgba(245, 158, 11, 0.3)' },
    'Radiant Rose': { primary: '#f43f5e', secondary: '#fb7185', glow: 'rgba(244, 63, 94, 0.35)', border: 'rgba(244, 63, 94, 0.3)' },
    'Celestial Gold': { primary: '#ffd700', secondary: '#fde047', glow: 'rgba(255, 215, 0, 0.35)', border: 'rgba(255, 215, 0, 0.3)' },
    'Aetheric Violet': { primary: '#a855f7', secondary: '#c084fc', glow: 'rgba(168, 85, 247, 0.35)', border: 'rgba(168, 85, 247, 0.3)' },
    'Emerald Clarity': { primary: '#10b981', secondary: '#34d399', glow: 'rgba(16, 185, 129, 0.35)', border: 'rgba(16, 185, 129, 0.3)' },
  };

  const currentAuraConfig = auraColorsMap[activeAura] || auraColorsMap['Calm Amber'];

  // Dynamic Carousels Data for 2026 Cosmic Alignments
  const carouselSlides = [
    {
      id: 'slide-2026',
      badge: '2026 Planetary Transit',
      title: 'Grand Planetary Alignments of 2026',
      subtitle: 'Saturn in Pisces, Jupiter in Gemini & Rahu in Aquarius. Discover how these cosmic shifts illuminate your destiny.',
      buttonText: 'Read 2026 Horoscope',
      target: 'rashifal' as ScreenType,
      gradient: 'from-amber-950/80 via-orange-950/70 to-black/90',
      borderColor: 'border-amber-500/40',
      icon: <Star className="w-8 h-8 text-amber-300" />
    },
    {
      id: 'slide-kundli',
      badge: 'Vedic Janam Kundli',
      title: 'Precision Lagna & Navamsha (D9) Engine',
      subtitle: 'Compute Shodashvarga (D1-D60), Sarvashtakvarga 337 points, and Vimshottari Mahadasha timeline with mathematical rigor.',
      buttonText: 'Generate Janam Kundli',
      target: 'kundli' as ScreenType,
      gradient: 'from-purple-950/80 via-indigo-950/70 to-black/90',
      borderColor: 'border-purple-500/40',
      icon: <Compass className="w-8 h-8 text-purple-300" />
    },
    {
      id: 'slide-matching',
      badge: 'Vivah Compatibility',
      title: 'Ashtakoota 36 Guna Milan & Mangal Dosha',
      subtitle: 'Evaluate Nadi, Bhakoot, Gana scores, mutual dosha cancellation exceptions, and marital longevity.',
      buttonText: 'Match Horoscopes',
      target: 'matching' as ScreenType,
      gradient: 'from-rose-950/80 via-pink-950/70 to-black/90',
      borderColor: 'border-rose-500/40',
      icon: <Heart className="w-8 h-8 text-rose-300" />
    },
    {
      id: 'slide-prashnavali',
      badge: 'Sacred Oracle',
      title: 'Ramcharitmanas Chaupai Prashnavali',
      subtitle: '15x15 sacred alphabet matrix revealing divine guidance and instant clarity from Goswami Tulsidas.',
      buttonText: 'Consult Prashnavali',
      target: 'prashnavali' as ScreenType,
      gradient: 'from-amber-950/80 via-yellow-950/70 to-black/90',
      borderColor: 'border-yellow-500/40',
      icon: <Scroll className="w-8 h-8 text-yellow-300" />
    },
    {
      id: 'slide-loshu',
      badge: 'Ank Jyotish',
      title: 'Lo Shu 3x3 Magic Grid & 8 Raj Yogas',
      subtitle: 'Golden plane (4-5-6), Silver plane (2-5-8), Mulank and Bhagyank calculation for prosperity and character.',
      buttonText: 'Calculate Lo Shu Grid',
      target: 'numerology' as ScreenType,
      gradient: 'from-emerald-950/80 via-teal-950/70 to-black/90',
      borderColor: 'border-emerald-500/40',
      icon: <Calculator className="w-8 h-8 text-emerald-300" />
    }
  ];

  // 8 Sequenced Vedic Master Portals with Detailed Sub-Feature Lists
  const sequencedOccultEngines = [
    {
      id: 'kundli',
      sequenceNumber: '01',
      title: 'Lagna & Janam Kundli',
      hindiTitle: 'जन्म लग्न कुंडली एवं षोडशवर्ग',
      description: 'Lagna Chart, Navamsha D9, 16 Divisional Charts & Vimshottari Mahadasha',
      icon: <Compass className="w-6 h-6 text-amber-400" />,
      tag: 'D1-D60 Shodashvarga',
      screen: 'kundli' as ScreenType,
      color: 'from-amber-500/20 to-orange-500/10',
      subFeatures: [
        { name: 'Detailed Janam Kundli', desc: 'Ascendant, Planetary Degrees & Bhavas', screen: 'kundli' as ScreenType },
        { name: 'Navamsha (D9) Chart', desc: 'Spouse & Inner Spiritual Dharma', screen: 'kundli' as ScreenType },
        { name: 'Dashamsha (D10) Career', desc: 'Profession, Power & Enterprise', screen: 'kundli' as ScreenType },
        { name: 'Vimshottari Dasha (120 Yrs)', desc: 'Mahadasha, Antardasha & Pratyantardasha', screen: 'kundli' as ScreenType },
        { name: 'Sarvashtakvarga (337 Pts)', desc: 'Planetary Strength & Transit Benefic Points', screen: 'kundli' as ScreenType },
      ]
    },
    {
      id: 'matching',
      sequenceNumber: '02',
      title: 'Kundli Milan & Vivah Sanskar',
      hindiTitle: 'अष्टकूट ३६ गुण मिलान एवं संबंध',
      description: 'Ashtakoota 36 Guna Milan, Manglik Dosha, Nadi & Bhakoot compatibility',
      icon: <Heart className="w-6 h-6 text-rose-400" />,
      tag: '36 Gunas & Doshas',
      screen: 'matching' as ScreenType,
      color: 'from-rose-500/20 to-pink-500/10',
      subFeatures: [
        { name: '36 Gunas Ashtakoota Score', desc: 'Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi', screen: 'matching' as ScreenType },
        { name: 'Mangal Dosha & Exceptions', desc: 'Kuja Dosha evaluation for 1, 4, 7, 8, 12 Bhavas', screen: 'matching' as ScreenType },
        { name: 'Rajju & Vedha Dosha Check', desc: 'South Indian & North Indian longevity filters', screen: 'matching' as ScreenType },
        { name: 'Marital Harmony Remedies', desc: 'Kumbh Vivah, gemstones and mantra upays', screen: 'matching' as ScreenType },
      ]
    },
    {
      id: 'panchang',
      sequenceNumber: '03',
      title: 'Aaj Ka Panchang & Shubh Muhurat',
      hindiTitle: 'दैनिक पंचांग, चौघड़िया एवं शुभ मुहूर्त',
      description: 'Live Tithi, Nakshatra, Yoga, Karana, Choghadiya & Rahu Kaal Timer',
      icon: <Calendar className="w-6 h-6 text-yellow-400" />,
      tag: 'Real-Time Precision',
      screen: 'panchang' as ScreenType,
      color: 'from-yellow-500/20 to-amber-500/10',
      subFeatures: [
        { name: 'Panchang 5 Limbs', desc: 'Tithi, Vaar, Nakshatra, Yoga & Karana timings', screen: 'panchang' as ScreenType },
        { name: 'Choghadiya Muhurat (Day/Night)', desc: 'Amrit, Shubh, Labh, Char, Rog, Kaal, Udveg', screen: 'panchang' as ScreenType },
        { name: 'Rahu Kaal & Yamaganda', desc: 'Inauspicious time windows to avoid', screen: 'panchang' as ScreenType },
        { name: 'Vivah & Griha Pravesh Dates', desc: 'Auspicious muhurats for 2026-2027', screen: 'panchang' as ScreenType },
      ]
    },
    {
      id: 'rashifal',
      sequenceNumber: '04',
      title: 'Dainik & 2026 Varshik Rashifal',
      hindiTitle: 'दैनिक, साप्ताहिक एवं २०२६ वार्षिक राशिफल',
      description: 'Daily, Weekly, Monthly & 2026 Annual predictions for all 12 signs',
      icon: <Star className="w-6 h-6 text-amber-300" />,
      tag: '2026 Annual Matrix',
      screen: 'rashifal' as ScreenType,
      color: 'from-amber-500/20 to-yellow-500/10',
      subFeatures: [
        { name: '12 Moon Signs Daily Forecast', desc: 'Love, Career, Wealth & Health outlook', screen: 'rashifal' as ScreenType },
        { name: '2026 Grand Annual Horoscope', desc: 'Saturn in Pisces & Jupiter in Gemini impact', screen: 'rashifal' as ScreenType },
        { name: 'Sade Sati & Dhaiya Tracker', desc: 'Shani Sade Sati phase and remedial totke', screen: 'rashifal' as ScreenType },
        { name: 'Live Planetary Gochar', desc: 'Real-time transit degrees across 12 houses', screen: 'transits' as ScreenType },
      ]
    },
    {
      id: 'numerology',
      sequenceNumber: '05',
      title: 'Ank Jyotish & Lo Shu Grid',
      hindiTitle: 'अंक ज्योतिष एवं ३x३ लो शू मैजिक ग्रिड',
      description: 'Mulank, Bhagyank, Kua number, 3x3 Magic Grid & 8 Raj Yogas',
      icon: <Calculator className="w-6 h-6 text-emerald-400" />,
      tag: 'Lo Shu 3x3 Yogas',
      screen: 'numerology' as ScreenType,
      color: 'from-emerald-500/20 to-teal-500/10',
      subFeatures: [
        { name: 'Mulank & Bhagyank Synthesis', desc: 'Driver and Conductor life path numbers', screen: 'numerology' as ScreenType },
        { name: 'Lo Shu 3x3 Energy Grid', desc: 'Golden Plane (4-5-6) & Silver Plane (2-5-8)', screen: 'numerology' as ScreenType },
        { name: '8 Raj Yogas Evaluation', desc: 'Mental, Emotional, Practical and Will planes', screen: 'numerology' as ScreenType },
        { name: 'Name Numerology Correction', desc: 'Chaldean & Pythagorean vibrational balance', screen: 'numerology' as ScreenType },
      ]
    },
    {
      id: 'vastu',
      sequenceNumber: '06',
      title: 'Vastu Shastra 16-Zone Energy',
      hindiTitle: '१६ महावास्तु दिशाएं एवं ऊर्जा संतुलन',
      description: 'MahaVastu energy compass, 5 elemental balances & remedial energy remedies',
      icon: <Compass className="w-6 h-6 text-cyan-400" />,
      tag: '16 Compass Zones',
      screen: 'vastu' as ScreenType,
      color: 'from-cyan-500/20 to-blue-500/10',
      subFeatures: [
        { name: '16-Zone MahaVastu Compass', desc: 'North-East (Ishan) to South-West (Nairutya)', screen: 'vastu' as ScreenType },
        { name: 'Pancha Mahabhuta (5 Elements)', desc: 'Fire, Water, Air, Earth & Space balance', screen: 'vastu' as ScreenType },
        { name: 'Non-Destructive Vastu Upay', desc: 'Color tapes, brass strips, pyramid energizers', screen: 'vastu' as ScreenType },
        { name: 'Main Entrance (32 Padas)', desc: 'Auspicious door placement guidelines', screen: 'vastu' as ScreenType },
      ]
    },
    {
      id: 'prashnavali',
      sequenceNumber: '07',
      title: 'Ramcharitmanas Oracle & KP Horary',
      hindiTitle: 'श्री रामचरितमानस प्रश्नावली एवं के.पी.',
      description: '15x15 sacred Chaupai letter matrix & Krishnamurti Paddhati 1-249',
      icon: <Scroll className="w-6 h-6 text-orange-400" />,
      tag: '15x15 Sacred Matrix',
      screen: 'prashnavali' as ScreenType,
      color: 'from-orange-500/20 to-amber-500/10',
      subFeatures: [
        { name: 'Ramcharitmanas 15x15 Grid', desc: 'Divine Chaupai revelation by Goswami Tulsidas', screen: 'prashnavali' as ScreenType },
        { name: 'KP 1-249 Horary Horoscopy', desc: 'Sub-lord and ruling planets instant question answer', screen: 'kp-horary' as ScreenType },
        { name: 'Prashna Kundli Engine', desc: 'Chart cast at the exact moment of contemplation', screen: 'kp-horary' as ScreenType },
        { name: 'Yes / No Cosmic Verification', desc: 'Direct planetary aspect confirmation', screen: 'prashnavali' as ScreenType },
      ]
    },
    {
      id: 'remedies',
      sequenceNumber: '08',
      title: 'Lal Kitab, Ratna & Sacred Upay',
      hindiTitle: 'लाल किताब, रत्न चक्र एवं रुद्राक्ष',
      description: '9 Planetary Debts (Rina), Varshphal blind chart, 1-21 Mukhi Rudraksha',
      icon: <Gem className="w-6 h-6 text-indigo-400" />,
      tag: '9 Rinas & Mukhi',
      screen: 'gemstones' as ScreenType,
      color: 'from-indigo-500/20 to-purple-500/10',
      subFeatures: [
        { name: 'Lal Kitab 9 Planetary Debts', desc: 'Ancestral Rina, Father Debt, Mother Debt remedies', screen: 'lal-kitab' as ScreenType },
        { name: 'Ratna Jyotish Gemstone Finder', desc: 'Life stone, Lucky stone & Fortune stone (Bhagya Ratna)', screen: 'gemstones' as ScreenType },
        { name: '1 to 21 Mukhi Rudraksha Guide', desc: 'Lord Shiva authentic bead energization procedure', screen: 'gemstones' as ScreenType },
        { name: 'Quantum Japa Mala (108 Beads)', desc: 'Mantra counter with 432Hz & 528Hz Solfeggio sound', screen: 'japa-mala' as ScreenType },
      ]
    }
  ];

  const handleScrollAstrologers = (direction: 'left' | 'right') => {
    if (astrologersScrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      astrologersScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const getTileIcon = (iconName: string, iconColor?: string) => {
    const props = { className: `w-5 h-5 sm:w-6 sm:h-6 ${iconColor || 'text-[#d4af37]'}` };
    switch (iconName) {
      case 'Laptop': return <Laptop {...props} />;
      case 'Scale': return <Scale {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'BookMarked': return <BookMarked {...props} />;
      case 'PhoneCall': return <PhoneCall {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'HeartHandshake': return <HeartHandshake {...props} />;
      case 'BookOpen': return <BookOpen {...props} />;
      case 'Clock': return <Clock {...props} />;
      case 'CalendarCheck': return <CalendarCheck {...props} />;
      case 'Baby': return <Baby {...props} />;
      case 'Orbit': return <Orbit {...props} />;
      case 'FileText': return <BookOpen {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'Languages': return <Languages {...props} />;
      case 'Calculator': return <Calculator {...props} />;
      case 'Crown': return <Crown {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'Gem': return <Gem {...props} />;
      case 'ShieldAlert': return <ShieldAlert {...props} />;
      case 'Sun': return <Sun {...props} />;
      case 'Tv': return <Tv {...props} />;
      case 'Book': return <Book {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'SlidersHorizontal': return <SlidersHorizontal {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    try {
      cosmicAudio.playFrequency(528);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#d4af37', '#ff6b6b']
      });
    } catch {}

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlockReport(name, email);
    }, 500);
  };

  const filteredShastraTiles = ASTROSAGE_HOME_GRID_TILES.filter((tile) => {
    if (activeShastraFilter === 'all') return true;
    if (activeShastraFilter === 'kundli') return ['Kundli', 'Horary', 'KP', 'Software', 'Career', 'Education'].includes(tile.category);
    if (activeShastraFilter === 'remedies') return ['Remedies', 'Lal Kitab', 'Gemstones', 'Rudraksha'].includes(tile.category);
    if (activeShastraFilter === 'panchang') return ['Panchang', 'Muhurat', 'Festivals', 'Eclipse'].includes(tile.category);
    if (activeShastraFilter === 'numerology') return ['Numerology', 'Lo Shu', 'Vastu', 'Marriage'].includes(tile.category);
    if (activeShastraFilter === 'occult') return ['Occult', 'Media', 'Chinese', 'Tarot', 'Consultation'].includes(tile.category);
    return true;
  });

  const selectedEngine = sequencedOccultEngines.find(e => e.id === expandedEngineId) || sequencedOccultEngines[0];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 pb-24 space-y-9">

      {/* 1. Grand Sacred Hero Layout with Floating Particles around Sri Yantra & Side-Balanced Text */}
      <div 
        className={`relative rounded-3xl p-4 sm:p-8 md:p-10 border bg-transparent overflow-hidden container-hover-tactile hover:scale-[1.01] ${
          isDark 
            ? 'border-amber-500/45 hover:border-amber-400/90 shadow-[0_0_28px_-2px_rgba(245,158,11,0.30),inset_0_0_22px_-4px_rgba(251,191,36,0.18)] hover:shadow-[0_0_40px_-2px_rgba(245,158,11,0.50),inset_0_0_30px_-2px_rgba(251,191,36,0.28)]' 
            : 'border-amber-600/45 hover:border-amber-500/90 shadow-[0_0_22px_-2px_rgba(217,119,6,0.22),inset_0_0_16px_-4px_rgba(245,158,11,0.14)] hover:shadow-[0_0_32px_-2px_rgba(217,119,6,0.38),inset_0_0_24px_-2px_rgba(245,158,11,0.22)]'
        }`}
      >
        {/* Subtle Ambient Cosmic Nebula Glow attuned to Active Aura */}
        <div 
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25 transition-all duration-1000" 
          style={{ backgroundColor: currentAuraConfig.primary }}
        />
        <div 
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25 transition-all duration-1000" 
          style={{ backgroundColor: currentAuraConfig.secondary }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Wing: Sacred Sri Yantra with Multi-Colored Radiance, 369 Quantum Numerology Hearts & Moving Stars */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* The Sacred Particle & Geometry Canvas Container with Multi-Colored Depth */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
              
              {/* Particle System Canvas (Orbiting Stars, 369 Quantum Hearts & Prismatic Aura attuned to activeAura) */}
              <SacredGeometryParticles theme={theme} size={320} activeAura={activeAura} />

              {/* Rhythmic Quantum Resonance Aura Wave 1 (Prismatic Multi-Color Gradient) */}
              <motion.div 
                className="absolute w-48 h-48 sm:w-52 sm:h-52 rounded-full border border-pink-500/40 pointer-events-none"
                animate={{
                  scale: [1, 1.16, 1],
                  opacity: [0.3, 0.75, 0.3],
                  rotate: [0, 90, 180, 270, 360]
                }}
                transition={{
                  duration: 6.4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  boxShadow: isDark 
                    ? '0 0 35px rgba(244, 63, 94, 0.35), inset 0 0 25px rgba(168, 85, 247, 0.25)' 
                    : '0 0 25px rgba(225, 29, 72, 0.2)'
                }}
              />

              {/* Rhythmic Quantum Resonance Aura Wave 2 (Harmonic Emerald/Cyan Counter-Pulse) */}
              <motion.div 
                className="absolute w-40 h-40 sm:w-44 sm:h-44 rounded-full border border-emerald-400/40 pointer-events-none border-dashed"
                animate={{
                  scale: [1.08, 0.94, 1.08],
                  opacity: [0.35, 0.8, 0.35],
                  rotate: [360, 270, 180, 90, 0]
                }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  boxShadow: isDark ? '0 0 25px rgba(56, 189, 248, 0.3)' : '0 0 15px rgba(16, 185, 129, 0.2)'
                }}
              />

              {/* Central Multi-Colored Glowing Sacred Sri Yantra & 369 Quantum Hearts Nucleus */}
              <motion.div 
                className="relative z-20 p-2.5 rounded-full border-2 border-[#ffd700] shadow-[0_0_45px_rgba(244,63,94,0.45)] bg-gradient-to-br from-rose-950/80 via-purple-950/70 to-amber-950/80 backdrop-blur-md group cursor-pointer"
                animate={{
                  scale: [1, 1.045, 0.985, 1],
                  boxShadow: [
                    '0 0 30px rgba(244,63,94,0.4), 0 0 50px rgba(255,215,0,0.3)',
                    '0 0 55px rgba(168,85,247,0.6), 0 0 70px rgba(56,189,248,0.4)',
                    '0 0 30px rgba(244,63,94,0.4), 0 0 50px rgba(255,215,0,0.3)'
                  ]
                }}
                transition={{
                  duration: 4.32, // 4.32s harmonic cycle corresponding to 432Hz frequency
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.08 }}
                onClick={() => {
                  try {
                    cosmicAudio.playFrequency(528);
                    confetti({
                      particleCount: 55,
                      spread: 65,
                      origin: { y: 0.5 },
                      colors: ['#ffd700', '#f43f5e', '#a855f7', '#38bdf8', '#10b981']
                    });
                  } catch {}
                }}
                title="Tap for 528Hz Quantum Heart Harmonic Resonance"
              >
                <img 
                  src={SRI_YANTRA_LOGO} 
                  alt="Kaal Chakra Sacred Sri Yantra" 
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover animate-spin-slow shadow-inner filter drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]"
                />
                
                {/* Multi-Colored Quantum Numerology Harmonic Ring */}
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-pink-400/60 pointer-events-none"
                  animate={{
                    opacity: [0.4, 0.95, 0.4],
                    scale: [0.97, 1.04, 0.97],
                    borderColor: ['#f43f5e', '#ffd700', '#10b981', '#a855f7', '#f43f5e']
                  }}
                  transition={{
                    duration: 3.6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Floating Micro 3-6-9 Quantum Numerology Hearts Badge */}
                <motion.div 
                  className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-900 via-purple-900 to-amber-900 border border-[#ffd700] text-[9px] font-mono font-bold text-amber-200 shadow-lg flex items-center gap-1"
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-400 animate-pulse" />
                  <span>3•6•9</span>
                </motion.div>

                {/* Second Floating Micro Quantum Heart Accent */}
                <motion.div 
                  className="absolute -bottom-1 -left-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-950 to-teal-900 border border-emerald-400 text-[8px] font-mono font-bold text-emerald-300 shadow"
                  animate={{
                    y: [0, 3, 0],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span>♥ 432Hz</span>
                </motion.div>
              </motion.div>

              {/* Orbital Badge: Quantum Numerology & Navagraha Engine */}
              <div className="absolute -bottom-2 z-20 px-3.5 py-0.5 rounded-full bg-black/85 border border-[#ffd700]/70 text-[10px] font-cinzel font-bold text-amber-200 shadow-xl flex items-center gap-1.5 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                <span className="bg-gradient-to-r from-rose-300 via-amber-200 to-cyan-300 bg-clip-text text-transparent font-bold">
                  369 Quantum Numerology Hearts
                </span>
                <Sparkles className="w-2.5 h-2.5 text-amber-300 animate-pulse" />
              </div>
            </div>

            {/* Quick Cosmic Alignment & Numerology Harmonics Indicator */}
            <div className="mt-4 flex items-center gap-3 text-[11px] font-serif text-gray-300 text-center">
              <span className="text-rose-300 font-cinzel flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400 inline" /> 3-6-9 Harmonics
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-amber-300 font-cinzel">Surya: Simha</span>
              <span className="text-gray-500">•</span>
              <span className="text-cyan-300 font-cinzel">Lo Shu: 4-5-6 Raja Yoga</span>
            </div>
          </div>

          {/* Right Wing (Slightly to the side): Clear Typography, Sanskrit Wisdom, and Clean Action Portal */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 text-[#fdf2d1] text-xs font-cinzel tracking-widest uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>Vedic Astrological Sciences & Cosmic Wisdom</span>
              <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            </div>

            {/* Grand Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-[#fdf2d1] tracking-tight leading-tight drop-shadow-md">
                KAAL CHAKRA
              </h1>
              <p className="text-xs sm:text-sm font-serif italic text-amber-200/90 mt-1">
                "यथा पिण्डे तथा ब्रह्माण्डे" — As within, so without. The eternal wheel of destiny.
              </p>
            </div>

            {/* Clear Description */}
            <p className="text-xs sm:text-sm font-serif text-gray-300/90 leading-relaxed max-w-xl">
              Authentic Parashari Jyotish, 36 Guna Kundli Milan, 3x3 Lo Shu Numerology, 16-Zone MahaVastu, Ramcharitmanas Prashnavali, and Lal Kitab remedies computed with mathematical and spiritual precision.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 pt-2">
              <FuturisticTeslaPortalButton
                variant="large"
                label="369 TESLA PORTAL"
                subLabel="SPEED OF LIGHT • BLACK HOLE"
                onClick={() => onNavigate('tesla-369')}
              />

              <button
                onClick={() => onNavigate('karma')}
                className="px-4 sm:px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 text-slate-950 font-cinzel font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_4px_18px_rgba(245,158,11,0.4)] hover:brightness-110 transition-all cursor-pointer group"
              >
                <Scale className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
                <span>Karma Ledger (कर्म दर्पण)</span>
              </button>

              <button
                onClick={() => onNavigate('kundli')}
                className="px-4 sm:px-5 py-3 rounded-xl bg-gold-gradient text-gray-950 font-cinzel font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_4px_18px_rgba(212,175,55,0.35)] hover:brightness-110 transition-all cursor-pointer group"
              >
                <Compass className="w-4 h-4 text-gray-950 group-hover:rotate-45 transition-transform" />
                <span>Cast Janam Kundli</span>
              </button>

              <button
                onClick={() => onNavigate('matching')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-cinzel font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-black/40 border-[#d4af37]/40 text-[#fdf2d1] hover:bg-[#d4af37]/15 hover:border-[#ffd700]' 
                    : 'bg-white border-[#c5a059]/60 text-[#3b2b0a] hover:bg-amber-50'
                }`}
              >
                <Heart className="w-4 h-4 text-rose-400" />
                <span>36 Guna Milan</span>
              </button>

              <button
                onClick={() => onOpenAstrologerChat()}
                className={`px-4 sm:px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-cinzel font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-black/40 border-[#d4af37]/40 text-[#fdf2d1] hover:bg-[#d4af37]/15 hover:border-[#ffd700]' 
                    : 'bg-white border-[#c5a059]/60 text-[#3b2b0a] hover:bg-amber-50'
                }`}
              >
                <Bot className="w-4 h-4 text-[#ffd700]" />
                <span>Consult AI Daivajna</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </button>

              <button
                onClick={onOpenDrawer}
                className={`px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-cinzel font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-black/30 border-white/15 text-gray-300 hover:text-white hover:border-[#d4af37]/40' 
                    : 'bg-amber-50/70 border-amber-300/60 text-[#6a501c] hover:bg-amber-100'
                }`}
                title="Browse all 28 Shastra Tools"
              >
                <Menu className="w-4 h-4 text-amber-400" />
                <span>All 28 Shastras</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* 2. Live Cosmic Barometer (Real-Time Panchang Status Strip) */}
      <div 
        className="rounded-2xl p-3 sm:p-3.5 border transition-all duration-300 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs"
        style={{
          backgroundColor: isDark ? 'rgba(18, 17, 26, 0.75)' : 'rgba(254, 250, 240, 0.95)',
          borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.45)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Sun className="w-4 h-4" />
          </div>
          <div>
            <div className="font-cinzel font-bold text-[#fdf2d1] text-[11px] sm:text-xs flex items-center gap-2">
              <span>Daily Cosmic Pulse • आज का पंचांग</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Live</span>
            </div>
            <div className="text-[10px] font-serif text-gray-400">
              Shukla Saptami • Pushya Nakshatra • Moon in Cancer (कर्क)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-[11px] font-serif">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span>Shubh Choghadiya: <strong>Amrit (अमृत)</strong></span>
          </div>

          <div className="flex items-center gap-1.5 text-rose-300">
            <span>Rahu Kaal: <strong>01:30 PM - 03:00 PM</strong></span>
          </div>

          <button
            onClick={() => onNavigate('panchang')}
            className="px-2.5 py-1 rounded-lg bg-[#d4af37]/15 hover:bg-[#d4af37]/25 text-[#ffd700] font-cinzel font-semibold text-[10px] border border-[#d4af37]/30 transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Full Panchang</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 3. Sequenced 8 Sacred Occult Portals with Integrated Interactive Sub-Tools Explorer */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d4af37]/20 pb-2">
          <div>
            <h2 className="text-base sm:text-lg font-cinzel font-bold text-[#fdf2d1] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ffd700]" />
              Sacred Occult Portals & Sequenced Calculators
            </h2>
            <p className="text-[11px] font-serif text-gray-400">
              Select any system to reveal its sequenced sub-tools, deep calculations, and instant chart generators.
            </p>
          </div>
          <span className="text-[11px] font-mono text-amber-400/80 self-start sm:self-auto">
            {sequencedOccultEngines.length} Sequential Vedic Systems
          </span>
        </div>

        {/* 8 Sequenced Master Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {sequencedOccultEngines.map((engine) => {
            const isSelected = expandedEngineId === engine.id;
            return (
              <button
                key={engine.id}
                onClick={() => {
                  try { cosmicAudio.playFrequency(432); } catch {}
                  setExpandedEngineId(engine.id);
                }}
                className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-between transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? isDark 
                      ? 'bg-[#d4af37]/20 border-[#ffd700] text-white shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-[1.03]' 
                      : 'bg-amber-100 border-[#8a6514] text-[#3b2b0a] shadow-md scale-[1.03]'
                    : isDark
                      ? 'bg-[#10101d] border-[#d4af37]/20 text-gray-300 hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10'
                      : 'bg-white border-amber-200 text-gray-700 hover:bg-amber-50'
                }`}
              >
                <span className="text-[9px] font-mono font-bold text-[#ffd700] opacity-80">
                  {engine.sequenceNumber}
                </span>

                <div className="my-1.5 p-1.5 rounded-lg bg-black/30 border border-white/10">
                  {engine.icon}
                </div>

                <div className="text-[11px] font-cinzel font-bold leading-tight line-clamp-1">
                  {engine.title.split('&')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Expanded Sequenced Sub-Features Panel for Selected Engine */}
        <AnimatePresence mode="wait">
          {selectedEngine && (
            <motion.div
              key={selectedEngine.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`p-4 sm:p-6 rounded-2xl border shadow-xl relative overflow-hidden ${
                isDark ? 'bg-[#0f0e1a]/95 border-[#d4af37]/40' : 'bg-amber-50/90 border-amber-300'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gold-gradient text-gray-950 shadow-md">
                    {selectedEngine.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        SYSTEM {selectedEngine.sequenceNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-cinzel font-bold bg-[#d4af37]/15 text-[#ffd700] border border-[#d4af37]/30">
                        {selectedEngine.tag}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-xl font-cinzel font-bold text-[#fdf2d1]">
                      {selectedEngine.title}
                    </h3>
                    <span className="text-xs font-serif text-amber-300/80">
                      {selectedEngine.hindiTitle}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate(selectedEngine.screen)}
                  className="px-4 py-2 rounded-xl bg-gold-gradient text-gray-950 font-cinzel font-bold text-xs flex items-center gap-2 shadow-md hover:brightness-110 self-start md:self-auto cursor-pointer"
                >
                  <span>Launch Full Engine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Sequenced Sub-Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {selectedEngine.subFeatures.map((sub, idx) => (
                  <button
                    key={idx}
                    onClick={() => onNavigate(sub.screen)}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 group cursor-pointer ${
                      isDark 
                        ? 'bg-black/40 border-white/10 hover:border-[#ffd700] hover:bg-[#d4af37]/10' 
                        : 'bg-white border-amber-200 hover:border-[#8a6514] hover:bg-amber-100/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] font-mono text-amber-400/80">
                          {selectedEngine.sequenceNumber}.{idx + 1}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-amber-400 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                      <h4 className="text-xs font-cinzel font-bold text-[#fdf2d1] group-hover:text-[#ffd700] leading-snug">
                        {sub.name}
                      </h4>
                      <p className="text-[11px] font-serif text-gray-400 mt-1 line-clamp-2">
                        {sub.desc}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-1.5 border-t border-white/5 text-[9px] font-cinzel font-bold text-amber-400 group-hover:underline">
                      Calculate Now →
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Sanctum of Enlightened AI Gurus & Astrologers */}
      <div className={`p-4 sm:p-5 rounded-2xl border shadow-lg relative ${
        isDark ? 'bg-black/50 border-[#d4af37]/30' : 'bg-amber-50/80 border-amber-200'
      }`}>
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#ffd700]" />
              <h2 className="text-sm sm:text-base font-cinzel font-bold text-[#fdf2d1]">
                Sanctum of AI Daivajna Gurus & Astrologers
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live Consultations
              </span>
            </div>
            <p className="text-[11px] font-serif text-gray-400 mt-0.5">
              Consult authenticated masters of Parashara, KP Horary, Lal Kitab, Numerology, and Synastry.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleScrollAstrologers('left')}
              className="p-1.5 rounded-full bg-black/30 hover:bg-[#d4af37]/30 text-amber-300 transition-colors cursor-pointer border border-[#d4af37]/30"
              title="Previous Astrologer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScrollAstrologers('right')}
              className="p-1.5 rounded-full bg-black/30 hover:bg-[#d4af37]/30 text-amber-300 transition-colors cursor-pointer border border-[#d4af37]/30"
              title="Next Astrologer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Astrologers Horizontal Cards */}
        <div 
          ref={astrologersScrollRef}
          className="flex items-center gap-3.5 overflow-x-auto pb-2 no-scrollbar scroll-smooth"
        >
          {AI_ASTROLOGERS_LIST.map((astrologer) => (
            <div
              key={astrologer.id}
              onClick={() => onOpenAstrologerChat(astrologer.id)}
              className={`flex-shrink-0 w-40 sm:w-48 p-3.5 rounded-xl border flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 cursor-pointer group shadow-sm ${
                isDark 
                  ? 'bg-[#151524] border-[#d4af37]/25 hover:border-[#ffd700] hover:bg-[#d4af37]/10' 
                  : 'bg-white border-amber-200 hover:border-[#8a6514] hover:bg-amber-50'
              }`}
            >
              <div className="relative mb-2">
                <img 
                  src={astrologer.avatar} 
                  alt={astrologer.name} 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#d4af37] shadow group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-0 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-black rounded-full" />
              </div>

              <h4 className="text-xs font-cinzel font-bold text-[#fdf2d1] group-hover:text-[#ffd700] truncate w-full">
                {astrologer.name}
              </h4>
              <span className="text-[10px] font-serif text-amber-300/80 block truncate w-full">
                {astrologer.hindiName}
              </span>

              <div className="text-[10px] font-serif text-gray-400 truncate w-full mt-0.5">
                {astrologer.title}
              </div>

              <div className="mt-1.5 text-xs font-mono font-bold text-amber-400">
                ₹{astrologer.ratePerMin}/min
              </div>

              <button
                className="mt-2 w-full py-1 rounded-lg bg-gold-gradient text-gray-950 text-[10px] font-cinzel font-bold flex items-center justify-center gap-1 group-hover:brightness-110 shadow transition-all cursor-pointer"
              >
                <MessageCircle className="w-3 h-3 text-gray-950" />
                <span>Consult Live</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Interactive 2026 Cosmic Showcase Carousel */}
      <div className="relative rounded-2xl overflow-hidden border shadow-xl">
        <div className={`p-6 bg-gradient-to-r ${carouselSlides[currentSlide].gradient} border ${carouselSlides[currentSlide].borderColor} transition-all duration-500 flex flex-col sm:flex-row items-center justify-between gap-6`}>
          <div className="space-y-2 text-center sm:text-left max-w-xl">
            <span className="px-3 py-1 rounded-full text-xs font-cinzel font-bold bg-white/15 text-amber-200 border border-white/20 inline-block shadow">
              ✦ {carouselSlides[currentSlide].badge}
            </span>
            <h3 className="text-lg sm:text-2xl font-cinzel font-bold text-[#fdf2d1] leading-snug">
              {carouselSlides[currentSlide].title}
            </h3>
            <p className="text-xs sm:text-sm font-serif text-gray-300">
              {carouselSlides[currentSlide].subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <button
              onClick={() => onNavigate(carouselSlides[currentSlide].target)}
              className="px-5 py-2.5 rounded-xl bg-gold-gradient text-gray-950 font-cinzel font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              <span>{carouselSlides[currentSlide].buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Slide Indicators & Controls */}
        <div className="absolute bottom-2 right-4 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
          <button
            onClick={prevSlide}
            className="text-amber-300 hover:text-white p-0.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {carouselSlides.map((_, idx) => (
            <span 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                idx === currentSlide ? 'bg-[#ffd700] w-4' : 'bg-white/40'
              }`}
            />
          ))}
          <button
            onClick={nextSlide}
            className="text-amber-300 hover:text-white p-0.5 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 6. Comprehensive Kaal Chakra Vedic Shastra Directory (28 Specialized Systems) */}
      <div className="space-y-4 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d4af37]/20 pb-2">
          <div>
            <h2 className="text-sm sm:text-base font-cinzel font-bold text-[#fdf2d1] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ffd700]" />
              Kaal Chakra Vedic Shastra Directory (28 Specialized Systems)
            </h2>
            <p className="text-[11px] font-serif text-gray-400">
              Deep calculation engines: Dhruv Software, Career D10, Brihat Kundli, Sade Sati, Varshphal, and more.
            </p>
          </div>

          <button
            onClick={onOpenDrawer}
            className="text-xs font-cinzel font-bold text-[#d4af37] hover:underline cursor-pointer flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Open Repository Drawer</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'All Shastras (28)' },
            { id: 'kundli', label: 'Kundli & Horary' },
            { id: 'remedies', label: 'Remedies & Upay' },
            { id: 'panchang', label: 'Panchang & Muhurat' },
            { id: 'numerology', label: 'Numerology & Vastu' },
            { id: 'occult', label: 'Occult & Esoteric' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setActiveShastraFilter(pill.id as any)}
              className={`px-3 py-1 rounded-full text-xs font-cinzel transition-all whitespace-nowrap cursor-pointer ${
                activeShastraFilter === pill.id
                  ? 'bg-gold-gradient text-gray-950 font-bold shadow-sm'
                  : isDark
                    ? 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                    : 'bg-amber-100/70 text-[#6a501c] hover:bg-amber-200 border border-amber-300/40'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* 4-Column Grid for Shastra Directory */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3.5">
          {filteredShastraTiles.map((tile) => (
            <div
              key={tile.id}
              onClick={() => onOpenFeatureModal(tile)}
              className={`p-3 sm:p-4 rounded-2xl border text-center flex flex-col items-center justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer group shadow-sm ${
                isDark 
                  ? 'bg-[#10101d] border-[#d4af37]/25 hover:border-[#ffd700] hover:bg-[#d4af37]/10' 
                  : 'bg-white border-amber-200/90 hover:border-[#8a6514] hover:bg-amber-50'
              }`}
            >
              <div className="w-full flex justify-end mb-1">
                {tile.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {tile.badge}
                  </span>
                )}
              </div>

              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${tile.bgColor || 'bg-amber-500/20'} border border-white/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-inner`}>
                {getTileIcon(tile.iconName, tile.iconColor)}
              </div>

              <div className="w-full">
                <h4 className="text-xs font-cinzel font-bold text-[#fdf2d1] group-hover:text-[#ffd700] leading-tight line-clamp-2">
                  {tile.title}
                </h4>
                <span className="text-[10px] font-serif text-gray-400 block mt-0.5 truncate">
                  {tile.hindiTitle}
                </span>
              </div>

              <div className="mt-2.5 w-full pt-1.5 border-t border-white/5 text-[9px] font-cinzel font-bold text-amber-400 group-hover:text-[#ffd700] flex items-center justify-center gap-1">
                <span>{tile.subFeatures.length} Sub-Tools</span>
                <ChevronRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Lead Capture Instant Destiny Synthesis Card */}
      <div className={`p-5 sm:p-6 rounded-2xl border shadow-lg ${
        isDark ? 'bg-black/60 border-[#d4af37]/35' : 'bg-white/90 border-[#c5a059]/40'
      }`}>
        <div className="text-center max-w-xl mx-auto mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-cinzel font-bold mb-1.5">
            <CheckCircle2 className="w-3 h-3 text-[#ffd700]" />
            <span>Instant Celestial Dossier</span>
          </div>
          <h3 className="text-base sm:text-xl font-cinzel font-bold text-[#fdf2d1]">
            Comprehensive Life & Destiny Synthesis
          </h3>
          <p className="text-xs font-serif text-gray-400 mt-1">
            Enter your name & email for immediate cross-synthesis across Parashari, Lal Kitab, and Lo Shu Grid systems.
          </p>
        </div>

        <form onSubmit={handleSubmitLead} className="flex flex-col sm:flex-row items-center gap-2.5 max-w-lg mx-auto">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Full Name"
            className={`w-full sm:w-1/2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-serif outline-none ${
              isDark ? 'bg-black/50 border-[#d4af37]/30 text-white placeholder-gray-500' : 'bg-amber-50 border-amber-300 text-gray-900'
            }`}
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email Address"
            className={`w-full sm:w-1/2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-serif outline-none ${
              isDark ? 'bg-black/50 border-[#d4af37]/30 text-white placeholder-gray-500' : 'bg-amber-50 border-amber-300 text-gray-900'
            }`}
          />
          <button
            type="submit"
            disabled={isSubmitted}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gold-gradient text-gray-950 font-cinzel font-bold text-xs sm:text-sm whitespace-nowrap shadow-md hover:brightness-110 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>{isSubmitted ? 'Unlocked!' : 'Unlock Dossier'}</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
};
