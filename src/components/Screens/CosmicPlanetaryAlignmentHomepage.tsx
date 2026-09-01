import React, { useRef, useState, useEffect } from 'react';
import { ScreenType, ThemeMode, AuraType, UserProfile } from '../../types';
import { AI_ASTROLOGERS_LIST, AstroGridTile } from '../../data/astroSageDirectory';
import { SRI_YANTRA_LOGO } from '../../data/mockData';
import { SacredGeometryParticles } from '../SacredGeometryParticles';
import { AuraPaletteWidget } from '../AuraPaletteWidget';
import { AURA_PALETTES } from '../../data/auraPalettes';
import { KarmaBalanceVisualizer } from '../KarmaVisualizer/KarmaBalanceVisualizer';
import { SanctumProgressCircularIndicator } from '../SanctumProgressCircularIndicator';
import { SanctumMasteryLedgerModal } from '../SanctumMasteryLedgerModal';
import { CommunityLoungeModal } from '../CommunityLoungeModal';
import { KundliPdfExportModal } from '../KundliPdfExportModal';
import { DailyMuhuratAlertModal } from '../DailyMuhuratAlertModal';
import { CosmicComparisonModal } from '../CosmicComparisonModal';
import { DigitalJapaMalaModal } from '../DigitalJapaMalaModal';
import { LivePlanetaryTransitRadarModal } from '../LivePlanetaryTransitRadarModal';
import { CosmicVoiceGuruModal } from '../CosmicVoiceGuruModal';
import { sanctumTracker, SanctumEngagement } from '../../utils/sanctumEngagementTracker';
import { astrologerOfflineCache, CachedAstrologerProfile, OfflineConsultationQuery } from '../../utils/astrologerOfflineCache';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Heart,
  Bot,
  Menu,
  Sun,
  LayoutGrid,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Calendar,
  Layers,
  Scale,
  Map,
  Calculator,
  MessageCircle,
  MessageSquare,
  Flame,
  Radio,
  Activity,
  Clock,
  Hourglass,
  Users,
  Quote,
  Bell,
  BellRing,
  CheckCircle2,
  X,
  Download,
  FileText,
  Telescope,
  Mic,
  Orbit,
  Star,
  Filter,
  ArrowUpDown,
  Wifi,
  WifiOff,
  Database,
  RefreshCw,
  Send,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { Tesla3DLogoIcon } from '../Tesla369/Tesla3DLogoIcon';
import { QuickAccessPillsRow } from '../QuickAccessPillsRow';

export interface CosmicPlanetaryAlignmentHomepageProps {
  theme: ThemeMode;
  user: UserProfile;
  activeAura?: AuraType;
  onNavigate: (screen: ScreenType) => void;
  onUnlockReport: (name: string, email: string) => void;
  onOpenDrawer: () => void;
  onOpenAstrologerChat: (astrologerId?: string) => void;
  onOpenFeatureModal: (gridTile: AstroGridTile) => void;
  onOpenShareModal?: () => void;
  onOpenMindWellnessPortal?: () => void;
  onUpdateUserKarma?: (newPunya: number, newPapa: number) => void;
  onSelectAura?: (aura: AuraType) => void;
}

export const CosmicPlanetaryAlignmentHomepage: React.FC<CosmicPlanetaryAlignmentHomepageProps> = ({
  theme,
  user,
  activeAura = 'Calm Amber',
  onNavigate,
  onOpenDrawer,
  onOpenAstrologerChat,
  onOpenFeatureModal,
  onUpdateUserKarma,
  onSelectAura,
}) => {
  const isDark = theme === 'dark';
  const currentAuraConfig = AURA_PALETTES[activeAura] || AURA_PALETTES['Calm Amber'];
  const astrologersScrollRef = useRef<HTMLDivElement | null>(null);
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false);
  const [selectedEngagement, setSelectedEngagement] = useState<SanctumEngagement | null>(null);

  // Modals state for New Features
  const [isLoungeModalOpen, setIsLoungeModalOpen] = useState(false);
  const [isPdfExportModalOpen, setIsPdfExportModalOpen] = useState(false);
  const [isMuhuratModalOpen, setIsMuhuratModalOpen] = useState(false);
  const [isCosmologyModalOpen, setIsCosmologyModalOpen] = useState(false);
  const [isJapaMalaModalOpen, setIsJapaMalaModalOpen] = useState(false);
  const [isTransitRadarModalOpen, setIsTransitRadarModalOpen] = useState(false);
  const [isVoiceGuruModalOpen, setIsVoiceGuruModalOpen] = useState(false);
  const [loungeWaitingAstrologer, setLoungeWaitingAstrologer] = useState<{
    id: string;
    name: string;
    avatar: string;
    slot: number;
  } | null>(null);

  // Astrologer Rating Filter & Sort State
  const [ratingFilter, setRatingFilter] = useState<'all' | '4.95' | '4.9'>('all');
  const [astrologerSortBy, setAstrologerSortBy] = useState<'recommended' | 'rating_desc' | 'exp_desc' | 'available_first'>('recommended');

  // Dynamic Live Queue Volume & Wait Time State for Astrologers (Synchronized with Offline Cache)
  const [astrologerQueueData, setAstrologerQueueData] = useState<{ 
    [id: string]: { queueCount: number; waitTimeMin: number; isOccupied: boolean; lastUpdated?: number } 
  }>(() => astrologerOfflineCache.getCachedQueueData());

  // Offline Caching & Resilience State
  const [isOffline, setIsOffline] = useState<boolean>(() => astrologerOfflineCache.getIsOffline());
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<number>(() => astrologerOfflineCache.getLastSyncTimestamp());
  const [cachedAstrologers, setCachedAstrologers] = useState<CachedAstrologerProfile[]>(() => astrologerOfflineCache.getCachedAstrologers());
  const [offlineQueries, setOfflineQueries] = useState<OfflineConsultationQuery[]>(() => astrologerOfflineCache.getQueuedOfflineQueries());
  
  // Offline Inquiry & Profile Dossier Modal State
  const [isOfflineInquiryModalOpen, setIsOfflineInquiryModalOpen] = useState(false);
  const [selectedOfflineAstrologer, setSelectedOfflineAstrologer] = useState<CachedAstrologerProfile | null>(null);
  const [offlineInquiryText, setOfflineInquiryText] = useState('');
  const [isForceSyncing, setIsForceSyncing] = useState(false);

  // Subscribe to network & service worker offline cache changes
  useEffect(() => {
    const unsubscribe = astrologerOfflineCache.subscribe((offline, timestamp) => {
      setIsOffline(offline);
      setLastSyncedTime(timestamp);
      setCachedAstrologers(astrologerOfflineCache.getCachedAstrologers());
      setOfflineQueries(astrologerOfflineCache.getQueuedOfflineQueries());
    });
    return () => unsubscribe();
  }, []);

  const handleToggleSimulatedOffline = () => {
    const newSimState = !isSimulatedOffline;
    setIsSimulatedOffline(newSimState);
    astrologerOfflineCache.setSimulatedOffline(newSimState);
    if (newSimState) {
      setSystemToast({
        id: `offline-active-${Date.now()}`,
        title: '⚡ Offline Mode Active',
        message: 'Astrologer directory is now running from cache. Profiles & queue slots remain completely visible and accessible.',
      });
    } else {
      setSystemToast({
        id: `offline-restored-${Date.now()}`,
        title: '🟢 Online Sync Restored',
        message: 'Synchronized with live Vedic satellite stream and updated astrologer queue counters.',
      });
      try {
        cosmicAudio.playTeslaFrequency(528, 0.5);
      } catch {}
    }
    setTimeout(() => setSystemToast(null), 4500);
  };

  const handleForceCacheSync = () => {
    setIsForceSyncing(true);
    astrologerOfflineCache.updateQueueSnapshot(astrologerQueueData as any);
    setTimeout(() => {
      setIsForceSyncing(false);
      setLastSyncedTime(Date.now());
      setSystemToast({
        id: `sync-complete-${Date.now()}`,
        title: '🔄 Cache Synchronized',
        message: 'Astrologer profiles, ratings, and live queue snapshots have been cached to device storage & Service Worker.',
      });
      setTimeout(() => setSystemToast(null), 3500);
    }, 600);
  };

  const handleOpenOfflineInquiry = (astrologer: CachedAstrologerProfile) => {
    setSelectedOfflineAstrologer(astrologer);
    setOfflineInquiryText('');
    setIsOfflineInquiryModalOpen(true);
  };

  const handleQueueOfflineQuestion = () => {
    if (!selectedOfflineAstrologer || !offlineInquiryText.trim()) return;
    const queued = astrologerOfflineCache.queueOfflineQuery(
      selectedOfflineAstrologer.id,
      selectedOfflineAstrologer.name,
      offlineInquiryText.trim()
    );
    setOfflineQueries(astrologerOfflineCache.getQueuedOfflineQueries());
    setIsOfflineInquiryModalOpen(false);
    setOfflineInquiryText('');

    try {
      cosmicAudio.playTeslaFrequency(639, 1);
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.5 },
        colors: ['#38bdf8', '#fbbf24', '#10b981']
      });
    } catch {}

    setSystemToast({
      id: `queued-question-${Date.now()}`,
      title: '📥 Offline Question Queued',
      message: `Your query for ${selectedOfflineAstrologer.name} is safely stored locally and will transmit the moment connection returns.`,
    });
    setTimeout(() => setSystemToast(null), 5000);
  };

  // Notified astrologers tracking & Simulated System Alerts
  const [notifiedAstrologerIds, setNotifiedAstrologerIds] = useState<Record<string, boolean>>({});
  const [systemToast, setSystemToast] = useState<{ id: string; title: string; message: string } | null>(null);
  const [activeSystemAlert, setActiveSystemAlert] = useState<{
    astrologerId: string;
    astrologerName: string;
    hindiName?: string;
    avatar: string;
    specialty?: string;
  } | null>(null);

  const handleNotifyMe = (
    astrologerId: string, 
    astrologerName: string, 
    avatar: string, 
    hindiName?: string, 
    specialty?: string
  ) => {
    if (notifiedAstrologerIds[astrologerId]) {
      setSystemToast({
        id: `toast-${Date.now()}`,
        title: '🔔 Alert Already Active',
        message: `You are already registered to receive an instant alert when ${astrologerName} becomes free.`,
      });
      setTimeout(() => setSystemToast(null), 4000);
      return;
    }

    setNotifiedAstrologerIds((prev) => ({ ...prev, [astrologerId]: true }));
    try {
      cosmicAudio.playTeslaFrequency(528, 0.8);
    } catch {}

    setSystemToast({
      id: `toast-${Date.now()}`,
      title: '🔔 Notification Scheduled',
      message: `Alert set! You will receive a simulated system alert the moment ${astrologerName} becomes available.`,
    });
    setTimeout(() => setSystemToast(null), 4000);

    // Simulate astrologer becoming available in ~5.5 seconds
    setTimeout(() => {
      // Mark astrologer as available in state
      setAstrologerQueueData((prev) => ({
        ...prev,
        [astrologerId]: { queueCount: 0, waitTimeMin: 0, isOccupied: false }
      }));

      setNotifiedAstrologerIds((prev) => {
        const next = { ...prev };
        delete next[astrologerId];
        return next;
      });

      // Play celestial alert chime
      try {
        cosmicAudio.playTeslaFrequency(639, 2);
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.4 },
          colors: ['#10b981', '#fbbf24', '#38bdf8']
        });
      } catch {}

      // Trigger simulated system alert modal
      setActiveSystemAlert({
        astrologerId,
        astrologerName,
        hindiName,
        avatar,
        specialty
      });
    }, 5500);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setAstrologerQueueData((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((id) => {
          if (next[id].isOccupied) {
            // Realistic subtle fluctuation of queue count between 1 and 5
            const delta = Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0;
            const newQueue = Math.max(1, Math.min(5, next[id].queueCount + delta));
            next[id] = {
              ...next[id],
              queueCount: newQueue,
              waitTimeMin: Math.max(2, Math.min(12, Math.round(newQueue * 2.3 + (Math.random() * 1.5 - 0.7)))),
              lastUpdated: Date.now(),
            };
          }
        });
        // Keep offline cache synchronized
        astrologerOfflineCache.updateQueueSnapshot(next as any);
        return next;
      });
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  // 9 Core Master Shastra Sanctuary Portals
  const coreSanctumCards: Array<{
    id: string;
    title: string;
    hindiTitle: string;
    description: string;
    targetScreen: ScreenType;
    icon: React.ReactNode;
    badge: string;
    color: string;
    highlights: string[];
  }> = [
    {
      id: 'kundli',
      title: 'Janam Kundli & 16 Varga',
      hindiTitle: 'जन्म कुंडली एवं षोडशवर्ग',
      description: 'Cast precise Vedic birth chart with Lagna, Navamsha (D9), 120-year Vimshottari Dasha, and Gochar transits.',
      targetScreen: 'kundli',
      icon: <Compass className="w-5 h-5" />,
      badge: 'Parashari',
      color: '#d4af37',
      highlights: ['D1-D60 Divisional Charts', '120-Yr Dasha Timeline', 'Ashtakavarga Matrix', 'Panchang Yogas']
    },
    {
      id: 'matching',
      title: '36 Guna Milan & Vivah',
      hindiTitle: 'कुंडली मिलान एवं विवाह संस्कार',
      description: 'Vedic marital compatibility with Ashtakoota 36 Guna scoring, Manglik dosha evaluation, and Bhakoot/Nadi analysis.',
      targetScreen: 'matching',
      icon: <Heart className="w-5 h-5" />,
      badge: 'Ashtakoota',
      color: '#f43f5e',
      highlights: ['36 Guna Scoring', 'Nadi & Bhakoot Dosh', 'Manglik Deep Analysis', 'Vivah Muhurat Dates']
    },
    {
      id: 'mentor',
      title: 'AI Daivajna Live Guidance',
      hindiTitle: 'प्रत्यक्ष दैवज्ञ ज्योतिषी परामर्श',
      description: '24/7 intelligent Vedic consultation with enlightened Rishi personas for career, love, finance, and spiritual queries.',
      targetScreen: 'mentor',
      icon: <Bot className="w-5 h-5" />,
      badge: 'Live 24/7',
      color: '#06b6d4',
      highlights: ['Swami Ji & Pandit Arjun', 'Real-time Dasha answers', 'Audio synthesis voice', 'Brihat Parashara rules']
    },
    {
      id: 'panchang',
      title: 'Live Vedic Panchang',
      hindiTitle: 'दैनिक पंचांग एवं शुभ मुहूर्त',
      description: 'Real-time calculation of Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, Abhijit Muhurat, and Choghadiya cycles.',
      targetScreen: 'panchang',
      icon: <Calendar className="w-5 h-5" />,
      badge: 'Daily Kal',
      color: '#8b5cf6',
      highlights: ['Aaj Ka Choghadiya', 'Rahu Kaal & Gulika', 'Amrit Siddhi Muhurat', 'Hindu Festivals 2026']
    },
    {
      id: 'lalkitab',
      title: 'Lal Kitab & 9 Rin Nivaran',
      hindiTitle: 'लाल किताब एवं 9 ऋण निवारण',
      description: 'Time-tested remedies, blind horoscope rectifications, and ancestral debt clearances without complex rituals.',
      targetScreen: 'lalkitab',
      icon: <BookOpen className="w-5 h-5" />,
      badge: 'Upaya Vidhi',
      color: '#ef4444',
      highlights: ['9 Ancestral Debts (Rin)', 'Sleeping Planet Activation', 'Practical Daily Totkas', 'House-wise Remedy Engine']
    },
    {
      id: 'kp',
      title: 'KP Astrology & Horary',
      hindiTitle: 'के.पी. कृष्णमूर्ति एवं प्रश्न कुंडली',
      description: 'Pinpoint event prediction using Placidus house division, Sub-Lords, Stellar ruling planets, and 1-249 Horary table.',
      targetScreen: 'kp',
      icon: <Radio className="w-5 h-5" />,
      badge: 'KP 1-249',
      color: '#10b981',
      highlights: ['Sub-Lord Significators', '1-249 Horary Prashna', 'Cuspal Interlinks', 'Ruling Planets Clock']
    },
    {
      id: 'vastu',
      title: 'MahaVastu 16 Zones Grid',
      hindiTitle: 'महावास्तु 16 दिशा चक्र',
      description: 'Elemental balance and directional energy optimization for home and workplace harmony according to Vedic architecture.',
      targetScreen: 'vastu',
      icon: <Map className="w-5 h-5" />,
      badge: '16 Zones',
      color: '#14b8a6',
      highlights: ['Pancha Tattva Balance', 'Compass Zone Mapper', 'Devta Energy Fields', 'Non-demolition Remedies']
    },
    {
      id: 'numerology',
      title: 'Ank Jyotish & Lo Shu Grid',
      hindiTitle: 'अंक ज्योतिष एवं लो-शू ग्रिड',
      description: 'Chaldean and Pythagorean numerology matrix revealing Mulank, Bhagyank, name vibrations, and 3x3 Lo Shu planes.',
      targetScreen: 'numerology',
      icon: <Calculator className="w-5 h-5" />,
      badge: 'Lo Shu',
      color: '#3b82f6',
      highlights: ['Chaldean Name Analysis', 'Mulank & Bhagyank Matrix', 'Lo Shu Golden Planes', 'Favorable Numbers & Days']
    },
    {
      id: 'tesla-369',
      title: 'Tesla 3-6-9 Vortex Nexus',
      hindiTitle: 'टेस्ला 3-6-9 कॉस्मिक पोर्टल',
      description: 'Sacred mathematical manifestor fusing Vedic geometry, Solfeggio frequencies (396Hz-963Hz), and vortex energy.',
      targetScreen: 'tesla-369',
      icon: <Tesla3DLogoIcon size={20} />,
      badge: 'Vortex 369',
      color: '#a855f7',
      highlights: ['369 Sacred Geometry', 'Solfeggio Frequencies', 'Quantum Particle Flux', 'Consciousness Manifestor']
    }
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">

      {/* Light Theme Photo Background for Home Features */}
      {!isDark && (
        <div 
          className="fixed inset-0 z-[-1] opacity-[0.06] mix-blend-multiply bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2000&auto=format&fit=crop')` }} // Mandala/Geometric patterns
        />
      )}

      {/* Floating Side Options Access Button */}
      <div className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40">
        <motion.button
          onClick={onOpenDrawer}
          whileHover={{ scale: 1.06, x: 4 }}
          whileTap={{ scale: 0.94 }}
          className={`flex items-center gap-2 px-3.5 py-3 rounded-2xl border backdrop-blur-md cursor-pointer group select-none transition-all duration-300 ${
            isDark 
              ? 'bg-black/85 border-amber-400/70 shadow-[0_0_25px_rgba(245,158,11,0.4)] text-amber-200 hover:bg-black' 
              : 'bg-[#fdfaf5]/90 border-[#d9b482]/70 shadow-[0_4px_20px_rgba(180,120,40,0.12)] text-[#4a3518] hover:bg-[#f6eee2]'
          }`}
          title="Open Side Features & Options (सर्व विद्या एवं साधन सूची)"
        >
          <Menu className={`w-5 h-5 group-hover:rotate-90 transition-transform duration-300 ${isDark ? 'text-amber-400' : 'text-[#8c5922]'}`} />
          <span className="hidden md:inline font-cinzel font-bold text-xs tracking-wider">
            शास्त्र सूची • Options
          </span>
        </motion.button>
      </div>

      {/* Floating Aura Palette Widget in the Corner */}
      {onSelectAura && (
        <AuraPaletteWidget 
          theme={theme}
          activeAura={activeAura}
          onSelectAura={onSelectAura}
        />
      )}

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: Sacred Sri Yantra & Cosmic Alignment                      */}
      {/* ========================================================================= */}
      <div className="relative flex flex-col items-center justify-center text-center pt-4 sm:pt-6">
        
        {/* Background Ambient Aura Glow */}
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25 transition-all duration-1000" 
          style={{ backgroundColor: currentAuraConfig.primary }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 transition-all duration-1000" 
          style={{ backgroundColor: currentAuraConfig.secondary }}
        />

        {/* Grand Sacred Sri Yantra Centerpiece */}
        <div className="relative w-60 h-60 sm:w-72 sm:h-72 flex items-center justify-center mb-5 sm:mb-6">
          {/* Orbiting Sacred Geometry Particle Field */}
          <SacredGeometryParticles theme={theme} size={290} activeAura={activeAura} />

          {/* Quantum Wave Ring */}
          <motion.div 
            className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full pointer-events-none"
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.35, 0.75, 0.35],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              border: `1.5px solid ${currentAuraConfig.border}`,
              boxShadow: `0 0 35px ${currentAuraConfig.glow}`
            }}
          />

          {/* Central Glowing Sacred Sri Yantra */}
          <motion.div 
            className="relative z-20 p-3 sm:p-4 rounded-full border-2 backdrop-blur-md cursor-pointer group"
            animate={{
              scale: [1, 1.03, 0.98, 1],
              boxShadow: [
                `0 0 30px ${currentAuraConfig.glow}, 0 0 50px ${currentAuraConfig.glowIntense}`,
                `0 0 50px ${currentAuraConfig.glowIntense}, 0 0 70px ${currentAuraConfig.glow}`,
                `0 0 30px ${currentAuraConfig.glow}, 0 0 50px ${currentAuraConfig.glowIntense}`
              ]
            }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.08 }}
            onClick={() => {
              try {
                cosmicAudio.playFrequency(currentAuraConfig.frequencyHz);
                confetti({
                  particleCount: 50,
                  spread: 60,
                  origin: { y: 0.5 },
                  colors: [currentAuraConfig.primary, currentAuraConfig.secondary, '#ffd700', currentAuraConfig.tertiary]
                });
              } catch {}
            }}
            style={{
              borderColor: currentAuraConfig.secondary,
              background: isDark 
                ? `linear-gradient(135deg, ${currentAuraConfig.glow} 0%, rgba(0,0,0,0.85) 100%)`
                : `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(253,243,219,0.9) 100%)`
            }}
            title={`Tap for ${currentAuraConfig.frequencyHz}Hz ${currentAuraConfig.name} Harmonic Resonance`}
          >
            <img 
              src={SRI_YANTRA_LOGO} 
              alt="Kaal Chakra Sacred Sri Yantra" 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover animate-spin-slow shadow-inner filter drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]"
            />
          </motion.div>

          {/* Frequency Resonance Badge */}
          <div 
            className={`absolute -bottom-2 z-20 px-3.5 py-1 rounded-full border text-[11px] font-cinzel font-bold shadow-xl flex items-center gap-1.5 backdrop-blur-sm transition-colors duration-500 ${
              isDark ? 'bg-black/85 text-amber-200' : 'bg-[#fffaf0] text-[#78350f] border-amber-500/60 shadow-md'
            }`}
            style={{
              borderColor: currentAuraConfig.border,
              color: isDark ? currentAuraConfig.secondary : '#78350f'
            }}
          >
            <span 
              className="w-1.5 h-1.5 rounded-full animate-ping" 
              style={{ backgroundColor: currentAuraConfig.primary }}
            />
            <span className="font-bold">
              {currentAuraConfig.frequencyHz}Hz • {currentAuraConfig.name}
            </span>
            <Sparkles className="w-3 h-3" style={{ color: currentAuraConfig.primary }} />
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-2 max-w-2xl mb-6">
          <h1 className={`text-3xl sm:text-5xl md:text-6xl font-cinzel font-extrabold tracking-tight leading-tight ${
            isDark 
              ? 'text-[#fdf2d1] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]' 
              : 'text-[#2a1704] drop-shadow-sm'
          }`}>
            KAAL CHAKRA
          </h1>
          <p className={`text-sm sm:text-base font-serif italic ${
            isDark ? 'text-amber-200/90' : 'text-[#78350f] font-semibold'
          }`}>
            &ldquo;यथा पिण्डे तथा ब्रह्माण्डे&rdquo; — As within, so without.
          </p>
          <p className={`text-xs sm:text-sm font-serif leading-relaxed max-w-lg mx-auto ${
            isDark ? 'text-gray-300/80' : 'text-[#4a3518] font-medium'
          }`}>
            The eternal wheel of Vedic time, sacred mathematics, and cosmic consciousness.
          </p>
        </div>

        {/* Quick Access Pills Row (Horizontal Scrollable) */}
        <QuickAccessPillsRow theme={theme} onNavigate={onNavigate} />

        {/* Master Action Gateway Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl">
          <button
            onClick={onOpenDrawer}
            className="px-6 py-3 rounded-2xl bg-gold-gradient text-gray-950 font-cinzel font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-[0_4px_24px_rgba(212,175,55,0.45)] hover:brightness-110 hover:scale-105 transition-all cursor-pointer group"
          >
            <LayoutGrid className="w-5 h-5 text-gray-950 group-hover:rotate-12 transition-transform" />
            <span>सभी सुविधाएं एवं शास्त्र (All Options)</span>
            <ChevronRight className="w-4 h-4 text-gray-950 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('kundli')}
            className={`px-4 sm:px-5 py-3 rounded-2xl border text-xs sm:text-sm font-cinzel font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              isDark 
                ? 'bg-black/50 border-amber-500/40 text-amber-200 hover:bg-amber-500/15 hover:border-amber-400' 
                : 'bg-[#fdfaf5] border-[#d9b482]/70 text-[#4a3518] shadow-sm hover:bg-[#f6eee2] hover:border-[#caa269]'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-600" />
            <span>Janam Kundli</span>
          </button>

          <button
            onClick={() => onNavigate('matching')}
            className={`px-4 sm:px-5 py-3 rounded-2xl border text-xs sm:text-sm font-cinzel font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              isDark 
                ? 'bg-black/50 border-rose-500/40 text-rose-200 hover:bg-rose-500/15 hover:border-rose-400' 
                : 'bg-[#fdfaf5] border-[#e2b8b8]/70 text-[#5a2e2e] shadow-sm hover:bg-[#faeeea] hover:border-[#d49999]'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>36 Guna Milan</span>
          </button>

          <button
            onClick={() => onOpenAstrologerChat()}
            className={`px-4 sm:px-5 py-3 rounded-2xl border text-xs sm:text-sm font-cinzel font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              isDark 
                ? 'bg-black/50 border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/15 hover:border-cyan-400' 
                : 'bg-[#fdfaf5] border-[#a4c9c9]/70 text-[#1f4a4a] shadow-sm hover:bg-[#eef6f6] hover:border-[#7cb4b4]'
            }`}
          >
            <Bot className="w-4 h-4 text-cyan-700" />
            <span>AI Daivajna</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        </div>

        {/* Live Panchang Tithi Strip */}
        <div className={`mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full border text-[11px] font-serif backdrop-blur-sm shadow-sm ${
          isDark 
            ? 'bg-black/40 border-amber-500/20 text-gray-300' 
            : 'bg-[#fdfaf5]/90 border-[#d9b482]/50 text-[#4a3518]'
        }`}>
          <Sun className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
          <span className={`font-cinzel font-semibold ${isDark ? 'text-amber-200' : 'text-[#78350f]'}`}>आज का पंचांग:</span>
          <span className="font-medium">Shukla Saptami • Pushya Nakshatra</span>
          <span className={isDark ? 'text-gray-500' : 'text-amber-400'}>•</span>
          <span className={isDark ? 'text-emerald-400' : 'text-emerald-700 font-semibold'}>Amrit Choghadiya</span>
          <button 
            onClick={() => onNavigate('panchang')}
            className={`hover:underline font-cinzel font-bold flex items-center gap-0.5 ml-1 ${
              isDark ? 'text-amber-300' : 'text-[#8c5922]'
            }`}
          >
            <span>View</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. KARMA BALANCE ENGINE                                                   */}
      {/* ========================================================================= */}
      <section className="w-full">
        <KarmaBalanceVisualizer
          user={user}
          onUpdateUserKarma={onUpdateUserKarma}
          onNavigate={onNavigate}
          isDark={isDark}
        />
      </section>

      {/* ========================================================================= */}
      {/* 3. 9 MASTER SHASTRA SANCTUARIES (PORTALS)                                  */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b pb-3" style={{ borderColor: isDark ? 'rgba(212,175,55,0.2)' : 'rgba(217,180,130,0.35)' }}>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${
                isDark 
                  ? 'text-amber-400 bg-amber-950/60 border-amber-500/40' 
                  : 'text-[#684318] bg-[#f6eee2] border-[#d9b482]/60 font-semibold'
              }`}>
                नव-विधा महाशास्त्र
              </span>
              <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-[#68553f]'}`}>
                9 Sacred Vedic Sciences
              </span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-cinzel font-bold mt-1 ${isDark ? 'text-white' : 'text-[#2b2118]'}`}>
              Vedic Sanctum Gateways
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <p className={`text-xs font-serif max-w-sm hidden md:block ${isDark ? 'text-gray-400' : 'text-[#68553f]'}`}>
              Explore authentic Brihat Parashara calculations, KP Horary astrology, and ancient vibrational sound synthesis.
            </p>

            <button
              onClick={() => setIsLedgerModalOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer select-none shrink-0 ${
                isDark
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400'
                  : 'bg-[#f6eee2] border-[#d9b482]/60 text-[#593b1b] hover:bg-[#ede5d8] shadow-sm'
              }`}
              title="Open Occult Science Sanctum Mastery Ledger"
            >
              <Activity className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Mastery Ledger</span>
            </button>
          </div>
        </div>

        {/* 9 Feature Cards Grid - 1 column on mobile, 2 columns on medium tablets, 3 columns on large desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {coreSanctumCards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                sanctumTracker.recordVisit(card.targetScreen);
                onNavigate(card.targetScreen);
              }}
              className={`p-5 sm:p-6 rounded-3xl border cursor-pointer group transition-all flex flex-col justify-between space-y-4 relative overflow-hidden ${
                isDark
                  ? 'bg-black/60 border-amber-500/25 hover:border-amber-400/80 hover:bg-black/80 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                  : 'bg-[#fdfaf5] border-[#e8dccb] hover:border-[#cca269] hover:shadow-md shadow-sm'
              }`}
            >
              {/* Card Header with Icon, Badge, Progress Meter & Title */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl border ${
                    isDark ? 'bg-white/5 border-white/10 text-amber-300' : 'bg-[#f6eee2] border-[#e8dccb] text-[#784414]'
                  }`}>
                    {card.icon}
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                      isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-[#f6eee2] border-[#d9b482]/60 text-[#684318] font-semibold'
                    }`}>
                      {card.badge}
                    </span>

                    {/* Small Progress Circular Indicator for User Interaction Tracking */}
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        const eng = sanctumTracker.getEngagement(card.id);
                        setSelectedEngagement(eng);
                        setIsLedgerModalOpen(true);
                      }}
                      className="cursor-pointer"
                      title="View Sanctum Engagement Level"
                    >
                      <SanctumProgressCircularIndicator
                        portalId={card.id}
                        size={34}
                        strokeWidth={3}
                        theme={theme}
                        accentColor={card.color}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={`text-lg font-cinzel font-bold transition-colors ${
                    isDark ? 'text-white group-hover:text-amber-300' : 'text-[#2b2118] group-hover:text-[#8c5922]'
                  }`}>
                    {card.title}
                  </h3>
                  <h4 className={`text-xs font-serif ${isDark ? 'text-amber-400/80' : 'text-[#784414]'}`}>
                    {card.hindiTitle}
                  </h4>
                </div>

                <p className={`text-xs font-serif leading-relaxed line-clamp-2 ${
                  isDark ? 'text-gray-400' : 'text-[#594939]'
                }`}>
                  {card.description}
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {card.highlights.map((h, i) => (
                    <span 
                      key={i}
                      className={`text-[9.5px] font-mono px-2 py-0.5 rounded-md border truncate ${
                        isDark 
                          ? 'text-amber-200/90 bg-black/60 border-white/10' 
                          : 'text-[#684318] bg-[#f6eee2] border-[#e8dccb] font-medium'
                      }`}
                    >
                      • {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Enter Button Action */}
              <div className={`pt-3 border-t flex items-center justify-between relative z-10 ${
                isDark ? 'border-white/10' : 'border-[#e8dccb]'
              }`}>
                <span className={`text-[11px] font-mono font-bold ${
                  isDark ? 'text-amber-300 group-hover:text-amber-200' : 'text-[#684318] group-hover:text-[#382408]'
                }`}>
                  Enter Sanctum
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                  isDark ? 'bg-white/10 group-hover:bg-amber-500 group-hover:text-black' : 'bg-[#f6eee2] text-[#684318] group-hover:bg-[#d9b482] group-hover:text-[#2b2118]'
                }`}>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. VEDIC AI GURU SANCTUARY (LIVE ASTROLOGER COUNSEL)                     */}
      {/* ========================================================================= */}
      <section 
        id="section-live-astrologers"
        className={`rounded-3xl p-6 sm:p-8 border backdrop-blur-xl space-y-5 transition-all ${
          isDark 
            ? 'border-amber-500/30 bg-black/50 shadow-[0_0_30px_rgba(0,0,0,0.6)]' 
            : 'border-[#e8dccb] bg-[#fdfaf5]/90 shadow-sm'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${
                isDark 
                  ? 'text-emerald-400 bg-emerald-950 border-emerald-500/40' 
                  : 'text-emerald-900 bg-emerald-50 border-emerald-300 font-semibold'
              }`}>
                प्रत्यक्ष ज्योतिषी परामर्श
              </span>
              
              {/* Dynamic Offline / Online Cache State Pill */}
              {isOffline || isSimulatedOffline ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/60 text-[10px] font-mono font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)] animate-pulse">
                  <WifiOff className="w-3 h-3 text-amber-400" />
                  <span>Offline Mode • Cached Profiles Active</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold shadow-sm">
                  <Wifi className="w-3 h-3 text-emerald-400" />
                  <span>Live Satellite Synced</span>
                </span>
              )}
            </div>
            <h3 className={`text-xl sm:text-2xl font-cinzel font-bold mt-1 ${isDark ? 'text-white' : 'text-[#2b2118]'}`}>
              Sanctum Astrologers & Vedic Masters
            </h3>
          </div>

          {/* Right Action Controls: Offline Simulator Toggle, Cache Sync & Navigation */}
          <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
            {/* Brief Offline Simulation / Real Switch */}
            <button
              type="button"
              onClick={handleToggleSimulatedOffline}
              className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95 ${
                isSimulatedOffline || isOffline
                  ? 'bg-amber-500/25 text-amber-200 border-amber-400/70 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                  : isDark
                    ? 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                    : 'bg-white hover:bg-[#f6eee2] text-[#4a3518] border-[#d9b482]'
              }`}
              title="Toggle brief offline mode to test cached profile & queue visibility"
            >
              {isSimulatedOffline || isOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>Offline Mode ON</span>
                </>
              ) : (
                <>
                  <Database className="w-3.5 h-3.5 text-amber-500" />
                  <span>Test Offline Mode</span>
                </>
              )}
            </button>

            {/* Force Cache Sync Button */}
            <button
              type="button"
              onClick={handleForceCacheSync}
              disabled={isForceSyncing}
              className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                isDark ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' : 'bg-[#f6eee2] hover:bg-[#ede5d8] border-[#d9b482]/60 text-[#4a3518]'
              }`}
              title="Force sync & cache astrologer profiles & queue state to Service Worker & Storage"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isForceSyncing ? 'animate-spin text-amber-400' : 'text-amber-500'}`} />
            </button>

            {/* Scroll Navigation */}
            <button
              onClick={() => {
                if (astrologersScrollRef.current) {
                  astrologersScrollRef.current.scrollBy({ left: -260, behavior: 'smooth' });
                }
              }}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isDark ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' : 'bg-[#f6eee2] hover:bg-[#ede5d8] border-[#d9b482]/60 text-[#4a3518]'
              }`}
              title="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (astrologersScrollRef.current) {
                  astrologersScrollRef.current.scrollBy({ left: 260, behavior: 'smooth' });
                }
              }}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isDark ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' : 'bg-[#f6eee2] hover:bg-[#ede5d8] border-[#d9b482]/60 text-[#4a3518]'
              }`}
              title="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Informative Offline Resilience Banner */}
        {(isOffline || isSimulatedOffline) && (
          <div className={`p-3 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs animate-in fade-in transition-all ${
            isDark 
              ? 'bg-amber-950/40 border-amber-500/40 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.15)]' 
              : 'bg-[#faf0e1] border-[#e2caa8] text-[#593b1b]'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-400 shrink-0">
                <Database className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <p className="font-bold text-[11px] sm:text-xs">
                  ⚡ Offline Caching Strategy Active • 100% Data Resilience
                </p>
                <p className="text-[10px] opacity-85 mt-0.5">
                  Astrologer profiles, fee rates, ratings, reviews, and latest queue status snapshots are cached and remain accessible.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0 text-[10px] font-mono">
              <span className="opacity-75">
                Snapshot: {new Date(lastSyncedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              {offlineQueries.length > 0 && (
                <span className="px-2 py-0.5 rounded-md bg-amber-500/30 text-amber-200 border border-amber-400/60 font-bold">
                  {offlineQueries.length} query queued
                </span>
              )}
            </div>
          </div>
        )}

        {/* Filter & Sort Controls */}
        <div className={`p-3 rounded-2xl border flex flex-wrap items-center justify-between gap-3 text-xs ${
          isDark ? 'bg-black/35 border-white/10' : 'bg-[#f8f2e8] border-[#e2d5c2]'
        }`}>
          {/* Rating Filter Toggle Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 font-mono text-[11px] opacity-75 mr-1">
              <Filter className="w-3.5 h-3.5 text-amber-500" />
              <span>Filter Rating:</span>
            </div>
            <div className="flex items-center gap-1.5 p-0.5 rounded-xl border bg-black/20 dark:bg-black/40 border-white/10">
              <button
                type="button"
                id="filter-rating-all"
                onClick={() => setRatingFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all cursor-pointer ${
                  ratingFilter === 'all'
                    ? isDark
                      ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-500/50 shadow-sm'
                      : 'bg-white text-[#5c3a14] font-bold border border-[#d9b482] shadow-sm'
                    : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-[#68553f] hover:text-black'
                }`}
              >
                All Gurus ({cachedAstrologers.length})
              </button>
              <button
                type="button"
                id="filter-rating-49"
                onClick={() => setRatingFilter('4.9')}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all flex items-center gap-1 cursor-pointer ${
                  ratingFilter === '4.9'
                    ? isDark
                      ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-500/50 shadow-sm'
                      : 'bg-white text-[#5c3a14] font-bold border border-[#d9b482] shadow-sm'
                    : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-[#68553f] hover:text-black'
                }`}
              >
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>4.9+ Stars</span>
              </button>
              <button
                type="button"
                id="filter-rating-495"
                onClick={() => setRatingFilter('4.95')}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all flex items-center gap-1 cursor-pointer ${
                  ratingFilter === '4.95'
                    ? isDark
                      ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-500/50 shadow-sm'
                      : 'bg-white text-[#5c3a14] font-bold border border-[#d9b482] shadow-sm'
                    : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-[#68553f] hover:text-black'
                }`}
              >
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>4.95+ Top Tier</span>
              </button>
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 font-mono text-[11px] opacity-75">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-500" />
              <span>Sort:</span>
            </div>
            <select
              id="sort-astrologers-select"
              value={astrologerSortBy}
              onChange={(e) => setAstrologerSortBy(e.target.value as any)}
              className={`px-3 py-1 rounded-xl text-[11px] font-mono border transition-colors cursor-pointer outline-none ${
                isDark 
                  ? 'bg-black/60 border-white/15 text-amber-300 focus:border-amber-400' 
                  : 'bg-white border-[#d9b482] text-[#4a3518] focus:border-[#8c5922]'
              }`}
            >
              <option value="recommended">Featured Order</option>
              <option value="rating_desc">Highest Rating (Star ⭐)</option>
              <option value="exp_desc">Experience (Years)</option>
              <option value="available_first">Available First (Direct Access)</option>
            </select>
          </div>
        </div>

        {/* Scrollable Astrologers Strip with Cached Offline Fallback */}
        <div 
          ref={astrologersScrollRef}
          className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2 pt-1"
        >
          {cachedAstrologers
            .filter((astrologer) => {
              if (ratingFilter === '4.95') return astrologer.rating >= 4.95;
              if (ratingFilter === '4.9') return astrologer.rating >= 4.90;
              return true;
            })
            .sort((a, b) => {
              if (astrologerSortBy === 'rating_desc') {
                return b.rating - a.rating;
              }
              if (astrologerSortBy === 'exp_desc') {
                return b.experienceYears - a.experienceYears;
              }
              if (astrologerSortBy === 'available_first') {
                const aOccupied = astrologerQueueData[a.id]?.isOccupied ?? a.isOccupied;
                const bOccupied = astrologerQueueData[b.id]?.isOccupied ?? b.isOccupied;
                if (aOccupied === bOccupied) return 0;
                return aOccupied ? 1 : -1;
              }
              return 0;
            })
            .map((astrologer) => {
            const dynamicInfo = astrologerQueueData[astrologer.id];
            const isOccupied = dynamicInfo ? dynamicInfo.isOccupied : Boolean(astrologer.isOccupied || astrologer.consultationStatus === 'in_consultation');
            const queueCount = dynamicInfo ? dynamicInfo.queueCount : (astrologer.activeQueueCount ?? (isOccupied ? 2 : 0));
            const waitTime = dynamicInfo ? dynamicInfo.waitTimeMin : (astrologer.estimatedWaitTimeMin ?? (isOccupied ? Math.max(3, queueCount * 2) : 0));
            const maxQueueSlots = 5;

            return (
              <div
                key={astrologer.id}
                onClick={() => {
                  if (isOffline || isSimulatedOffline) {
                    handleOpenOfflineInquiry(astrologer);
                  } else {
                    onOpenAstrologerChat(astrologer.id);
                  }
                }}
                className={`min-w-[270px] max-w-[270px] p-4 rounded-2xl border cursor-pointer group transition-all space-y-3 shrink-0 relative overflow-hidden flex flex-col justify-between ${
                  isOccupied
                    ? isDark
                      ? 'bg-black/65 border-amber-500/35 hover:border-amber-400/80 hover:bg-black/85 shadow-[0_0_15px_rgba(245,158,11,0.08)]'
                      : 'bg-[#faf3e8] border-[#e2caa8] hover:border-[#caa269] hover:bg-[#fffcf7] shadow-sm'
                    : isDark 
                      ? 'bg-black/60 border-amber-500/25 hover:border-amber-400/70 hover:bg-black/80' 
                      : 'bg-[#fdfaf5] border-[#e8dccb] hover:border-[#caa269] hover:bg-[#fffcf7] shadow-sm'
                }`}
              >
                {/* Top Bar with Specialty & Dynamic Queue Volume Badge */}
                <div className="flex items-center justify-between gap-1.5 pb-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className={`text-[10px] font-mono truncate ${
                      isDark ? 'text-amber-400/90' : 'text-[#684318] font-semibold'
                    }`}>
                      {astrologer.specialties?.[0] || 'Vedic Jyotish'}
                    </span>
                    {(isOffline || isSimulatedOffline) && (
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[8px] font-mono font-bold border border-amber-400/40">
                        Cached
                      </span>
                    )}
                  </div>

                  {isOccupied ? (
                    <span 
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold shrink-0 border transition-all animate-occupied-pill ${
                        isDark 
                          ? 'bg-amber-500/25 text-amber-200 border-amber-400/70 shadow-[0_0_12px_rgba(245,158,11,0.45)] ring-1 ring-amber-400/30' 
                          : 'bg-[#f6e4cc] text-[#593b1b] border-[#d9b482] font-bold shadow-[0_2px_10px_rgba(180,120,40,0.22)]'
                      }`}
                      title={`Queue Volume: ${queueCount} seeker${queueCount > 1 ? 's' : ''} in line • Est. Wait: ~${waitTime}m`}
                    >
                      <Users className="w-2.5 h-2.5 text-amber-500 animate-pulse" />
                      <span>Q: {queueCount} waiting</span>
                      {/* Mini Bar Segments */}
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 3 }).map((_, idx) => (
                          <span
                            key={idx}
                            className={`w-0.5 h-2 rounded-[1px] ${
                              idx < queueCount
                                ? 'bg-amber-500 animate-pulse'
                                : isDark ? 'bg-white/20' : 'bg-black/15'
                            }`}
                          />
                        ))}
                      </div>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-[9px] font-mono font-bold text-emerald-800 dark:text-emerald-400 shrink-0 shadow-sm">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
                      </span>
                      LIVE • Open
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={astrologer.avatar}
                      alt={astrologer.name}
                      onError={(e) => {
                        // Graceful fallback for offline avatar rendering
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                      className={`w-12 h-12 rounded-full object-cover border-2 transition-transform group-hover:scale-105 ${
                        isOccupied 
                          ? isDark 
                            ? 'border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)] ring-2 ring-amber-400/40' 
                            : 'border-[#caa269] shadow-[0_2px_8px_rgba(180,120,40,0.3)] ring-2 ring-[#d9b482]/50'
                          : 'border-emerald-500/60'
                      }`}
                    />
                    {isOccupied ? (
                      <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5 items-center justify-center" title="Occupied in consultation">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500 border-2 border-black shadow-[0_0_6px_rgba(245,158,11,0.9)]" />
                      </span>
                    ) : (
                      <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5 items-center justify-center" title="Available now">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-black" />
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className={`text-xs font-cinzel font-bold transition-colors truncate ${
                      isDark ? 'text-white group-hover:text-amber-300' : 'text-[#2b2118] group-hover:text-[#8c5922]'
                    }`}>
                      {astrologer.name}
                    </h5>
                    <span className={`text-[10px] font-mono block truncate ${
                      isDark ? 'text-slate-400' : 'text-[#68553f]'
                    }`}>
                      {astrologer.hindiName}
                    </span>
                    <span className={`text-[9.5px] font-mono block truncate ${
                      isDark ? 'text-amber-400/80' : 'text-[#8c5922]'
                    }`}>
                      {astrologer.experienceYears}+ Yrs Exp • ₹{astrologer.ratePerMin || 25}/min
                    </span>
                  </div>
                </div>

                {/* Dynamic 'Queue Volume' Visual Segmented Bar-Chart Indicator with Soft Pulse & Glow */}
                <div 
                  className={`px-3 py-2.5 rounded-xl border space-y-2 transition-all ${
                    isOccupied
                      ? isDark 
                        ? 'bg-amber-950/35 text-amber-200 animate-occupied-glow-dark' 
                        : 'bg-[#f8f0e5] text-[#593b1b] animate-occupied-glow-light'
                      : isDark
                        ? 'bg-emerald-950/20 border-emerald-500/25 text-emerald-300'
                        : 'bg-emerald-50/70 border-emerald-300/50 text-emerald-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        {isOccupied ? (
                          <>
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.9)]" />
                          </>
                        ) : (
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        )}
                      </span>
                      <Users className={`w-3 h-3 ${isOccupied ? 'text-amber-500 animate-pulse' : 'text-emerald-600'}`} />
                      <span className="font-bold tracking-wider text-[9px] uppercase">
                        Queue Volume
                      </span>
                    </div>
                    <span className={`font-bold text-[9.5px] ${
                      isOccupied 
                        ? isDark ? 'text-amber-300 font-extrabold' : 'text-[#78350f] font-extrabold'
                        : isDark ? 'text-emerald-400' : 'text-emerald-800'
                    }`}>
                      {isOccupied ? `${queueCount} in line` : '0 in line • Direct'}
                    </span>
                  </div>

                  {/* Visual Bar-Chart Segments Representing Each Person in Queue */}
                  <div 
                    className="flex items-center gap-1 w-full pt-0.5" 
                    role="progressbar" 
                    aria-valuenow={queueCount} 
                    aria-valuemin={0} 
                    aria-valuemax={maxQueueSlots}
                    title={`Queue Volume: ${queueCount} of ${maxQueueSlots} slots occupied`}
                  >
                    {Array.from({ length: maxQueueSlots }).map((_, segIdx) => {
                      const isFilled = isOccupied && segIdx < queueCount;
                      const isCurrentActive = isOccupied && segIdx === queueCount - 1;

                      return (
                        <div
                          key={segIdx}
                          className={`h-2.5 flex-1 rounded-sm transition-all relative overflow-hidden ${
                            isFilled
                              ? isDark
                                ? isCurrentActive
                                   ? 'bg-gradient-to-r from-amber-400 to-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.9)] border border-amber-200 animate-pulse'
                                  : 'bg-gradient-to-r from-amber-600 to-amber-500 border border-amber-400/60 shadow-[0_0_6px_rgba(245,158,11,0.4)]'
                                : isCurrentActive
                                  ? 'bg-gradient-to-r from-[#d99b38] to-[#b48028] shadow-[0_2px_8px_rgba(180,120,40,0.5)] border border-[#966316] animate-pulse'
                                  : 'bg-gradient-to-r from-[#e5b96c] to-[#cca258] border border-[#caa269] shadow-sm'
                              : isDark
                                ? isOccupied 
                                  ? 'bg-white/10 border border-white/10'
                                  : 'bg-emerald-500/30 border border-emerald-500/40'
                                : isOccupied
                                  ? 'bg-black/5 border border-[#d9b482]/40'
                                  : 'bg-emerald-500/25 border border-emerald-400/50'
                          }`}
                          title={
                            isFilled 
                              ? `Person #${segIdx + 1} in queue` 
                              : !isOccupied 
                                ? 'Immediate connection slot' 
                                : `Available queue slot #${segIdx + 1}`
                          }
                        />
                      );
                    })}
                  </div>

                  {/* Sub-label Details: Occupied replaced with 'Notify Me' button */}
                  <div className="flex items-center justify-between text-[9px] font-mono opacity-90 pt-0.5">
                    <span className={isOccupied ? 'font-medium' : ''}>
                      {isOccupied ? `Your Slot: #${queueCount + 1}` : 'Direct access'}
                    </span>
                    {isOccupied ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNotifyMe(
                            astrologer.id,
                            astrologer.name,
                            astrologer.avatar,
                            astrologer.hindiName,
                            astrologer.specialties?.[0]
                          );
                        }}
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[9px] font-mono font-bold transition-all cursor-pointer shadow-sm active:scale-95 z-10 ${
                          notifiedAstrologerIds[astrologer.id]
                            ? isDark
                              ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/60 shadow-[0_0_10px_rgba(16,185,129,0.35)] ring-1 ring-emerald-400/30'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold shadow-sm'
                            : isDark
                              ? 'bg-gradient-to-r from-amber-500/30 via-yellow-500/20 to-amber-600/30 hover:from-amber-500/50 hover:to-amber-600/50 text-amber-200 border border-amber-400/70 shadow-[0_0_10px_rgba(245,158,11,0.25)] hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                              : 'bg-[#faebd7] hover:bg-[#f6deb5] text-[#78350f] border border-[#caa269] font-extrabold shadow-sm'
                        }`}
                        title={
                          notifiedAstrologerIds[astrologer.id]
                            ? `Alert active for ${astrologer.name} (Simulating availability in ~5s)`
                            : `Notify me when ${astrologer.name} is free`
                        }
                      >
                        {notifiedAstrologerIds[astrologer.id] ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 animate-pulse" />
                            <span>Alert Set</span>
                          </>
                        ) : (
                          <>
                            <Bell className="w-3 h-3 text-amber-400 animate-bounce" />
                            <span>Notify Me</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <span className="font-semibold flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <span>Instant reply</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Social Proof: Top Review Quote Block */}
                {astrologer.topReview && (
                  <div className={`p-2 rounded-xl text-[10px] leading-relaxed border transition-colors ${
                    isDark 
                      ? 'bg-white/[0.03] border-white/10 text-slate-300' 
                      : 'bg-[#f5ebe0]/80 border-[#e5d5c0] text-[#4a3e33]'
                  }`}>
                    <div className="flex items-start gap-1.5">
                      <Quote className={`w-3 h-3 shrink-0 mt-0.5 ${
                        isDark ? 'text-amber-400/80' : 'text-[#8c5922]'
                      }`} />
                      <div className="min-w-0 flex-1">
                        <p className="italic line-clamp-2 text-[10px] leading-tight">
                          "{astrologer.topReview.quote}"
                        </p>
                        <div className={`mt-1 flex items-center justify-between text-[8.5px] font-mono ${
                          isDark ? 'text-slate-400' : 'text-[#7a6449]'
                        }`}>
                          <span className="truncate font-medium">— {astrologer.topReview.author}</span>
                          {astrologer.topReview.timeAgo && (
                            <span className="shrink-0 opacity-80">{astrologer.topReview.timeAgo}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className={`flex items-center justify-between text-[10px] font-mono pt-2 border-t ${
                  isDark ? 'text-slate-400 border-white/10' : 'text-[#68553f] border-[#e8dccb]'
                }`}>
                  <span className="text-amber-600 font-bold">⭐ {astrologer.rating}</span>
                  {isOccupied ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLoungeWaitingAstrologer({
                          id: astrologer.id,
                          name: astrologer.name,
                          avatar: astrologer.avatar,
                          slot: queueCount + 1
                        });
                        setIsLoungeModalOpen(true);
                      }}
                      className={`font-bold flex items-center gap-1 hover:underline cursor-pointer ${
                        isDark ? 'text-amber-300' : 'text-[#8c5922]'
                      }`}
                    >
                      <Users className="w-3 h-3 text-amber-500" />
                      <span>Wait in Lounge (#{queueCount + 1})</span>
                    </button>
                  ) : (
                    <span className="text-emerald-800 dark:text-emerald-400 font-bold flex items-center gap-1 group-hover:underline">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Chat Now
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* NEW FEATURE CARD: NAKSHATRA COMMUNITY LOUNGE & SATSANG BANNER           */}
        {/* ========================================================================= */}
        <div 
          id="lounge-entry-card"
          className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
            isDark 
              ? 'bg-gradient-to-r from-amber-500/15 via-purple-900/30 to-cyan-900/20 border-amber-500/40 shadow-lg' 
              : 'bg-gradient-to-r from-[#faebd7] via-[#f5e6d3] to-[#e8dccb] border-[#caa269]'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center shrink-0 shadow-md">
              <Users className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm sm:text-base font-cinzel font-bold text-[#fef08a]">
                  नक्षत्र सत्संग लाउंज (Cosmic Community Lounge)
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>142 साधक लाइव</span>
                </span>
              </div>
              <p className="text-xs font-serif opacity-85 mt-0.5">
                ज्योतिषी की प्रतीक्षा करते समय साथी साधकों के साथ लाइव वैदिक चर्चा, 432Hz नाद एवं लाइव पोल में भाग लें।
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setLoungeWaitingAstrologer(null);
              setIsLoungeModalOpen(true);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-cinzel font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>सत्संग लाउंज में जुड़ें</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* QUICK ACCESS ACTION STRIP: 6 CORE SPIRITUAL & ASTRO TOOLS                 */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {/* 1. Kundli PDF Download */}
          <button
            onClick={() => setIsPdfExportModalOpen(true)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer group flex items-center justify-between ${
              isDark 
                ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-amber-400/50' 
                : 'bg-white hover:bg-[#faf5ee] border-[#e8dccb] hover:border-[#caa269]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-400 group-hover:scale-110 transition-transform">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-cinzel font-bold block text-[#fef08a]">
                  PDF कुंडली डाउनलोड
                </span>
                <span className="text-[10px] font-serif opacity-75">24+ पेज वार्षिक जन्मपत्रिका</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* 2. Daily Muhurat & Sadhana Streak */}
          <button
            onClick={() => setIsMuhuratModalOpen(true)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer group flex items-center justify-between ${
              isDark 
                ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-emerald-400/50' 
                : 'bg-white hover:bg-[#faf5ee] border-[#e8dccb] hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 group-hover:scale-110 transition-transform">
                <BellRing className="w-4 h-4 animate-bounce" />
              </div>
              <div>
                <span className="text-xs font-cinzel font-bold block text-emerald-300">
                  दैनिक मुहूर्त व साधना
                </span>
                <span className="text-[10px] font-serif opacity-75">राहुकाल, चौघड़िया व संकल्प</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* 3. NASA Hubble vs Surya Siddhanta */}
          <button
            onClick={() => setIsCosmologyModalOpen(true)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer group flex items-center justify-between ${
              isDark 
                ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-cyan-400/50' 
                : 'bg-white hover:bg-[#faf5ee] border-[#e8dccb] hover:border-cyan-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 group-hover:scale-110 transition-transform">
                <Telescope className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-cinzel font-bold block text-cyan-300">
                  वैदिक काल vs हबल
                </span>
                <span className="text-[10px] font-serif opacity-75">सूर्य सिद्धांत व 369 विज्ञान</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* 4. Digital 108 Japa Mala */}
          <button
            onClick={() => setIsJapaMalaModalOpen(true)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer group flex items-center justify-between ${
              isDark 
                ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-yellow-400/50' 
                : 'bg-white hover:bg-[#faf5ee] border-[#e8dccb] hover:border-yellow-400'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-yellow-500/15 border border-yellow-400/30 text-yellow-400 group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-cinzel font-bold block text-yellow-300">
                  डिजिटल १०८ जप माला
                </span>
                <span className="text-[10px] font-serif opacity-75">रुद्राक्ष/स्फटिक मंत्र ध्यान नाद</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* 5. Live Planetary Transit Radar */}
          <button
            onClick={() => setIsTransitRadarModalOpen(true)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer group flex items-center justify-between ${
              isDark 
                ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-purple-400/50' 
                : 'bg-white hover:bg-[#faf5ee] border-[#e8dccb] hover:border-purple-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/15 border border-purple-400/30 text-purple-400 group-hover:scale-110 transition-transform">
                <Orbit className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-cinzel font-bold block text-purple-300">
                  प्रत्यक्ष ग्रह गोचर राडार
                </span>
                <span className="text-[10px] font-serif opacity-75">लाइव राशि, नक्षत्र व वक्री ग्रह</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* 6. Voice Astro Guru */}
          <button
            onClick={() => setIsVoiceGuruModalOpen(true)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer group flex items-center justify-between ${
              isDark 
                ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-rose-400/50' 
                : 'bg-white hover:bg-[#faf5ee] border-[#e8dccb] hover:border-rose-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-400/30 text-rose-400 group-hover:scale-110 transition-transform">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-cinzel font-bold block text-rose-300">
                  बोल कर पूछें (Voice Guru)
                </span>
                <span className="text-[10px] font-serif opacity-75">एआई वैदिक वाणी समाधान</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SIMULATED SYSTEM TOAST ALERT (NOTIFICATION REGISTERED BANNER)           */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {systemToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-5 right-5 z-50 p-4 rounded-2xl border shadow-2xl max-w-sm flex items-start gap-3 backdrop-blur-xl ${
              isDark 
                ? 'bg-[#120f28]/95 border-amber-400/60 text-white shadow-[0_0_30px_rgba(245,158,11,0.3)]' 
                : 'bg-[#fffaf0]/95 border-[#caa269] text-[#4a3518] shadow-xl'
            }`}
          >
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="text-xs font-cinzel font-bold text-amber-400">{systemToast.title}</h4>
              <p className="text-[11px] font-serif leading-relaxed opacity-90">{systemToast.message}</p>
            </div>
            <button
              onClick={() => setSystemToast(null)}
              className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* SIMULATED SYSTEM ALERT MODAL: ASTROLOGER IS NOW AVAILABLE!              */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeSystemAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative w-full max-w-md p-6 rounded-3xl border-2 shadow-2xl space-y-5 ${
                isDark 
                  ? 'bg-gradient-to-b from-[#18112e] via-[#0e0a1f] to-black border-emerald-400/80 text-white shadow-[0_0_50px_rgba(16,185,129,0.35)]' 
                  : 'bg-gradient-to-b from-[#ffffff] via-[#fdfbf7] to-[#f4eee4] border-emerald-600/80 text-[#2b2118] shadow-2xl'
              }`}
            >
              {/* Top Banner Accent */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-400/40">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>प्रत्यक्ष सिस्टम अलर्ट • Astrologer Available</span>
                </span>
                <button
                  onClick={() => setActiveSystemAlert(null)}
                  className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Astrologer Profile Box */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="relative">
                  <img
                    src={activeSystemAlert.avatar}
                    alt={activeSystemAlert.astrologerName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <h3 className="text-base font-cinzel font-bold text-[#fef08a] truncate">
                    {activeSystemAlert.astrologerName}
                  </h3>
                  {activeSystemAlert.hindiName && (
                    <span className="text-xs font-mono block text-emerald-300">
                      {activeSystemAlert.hindiName}
                    </span>
                  )}
                  <span className="text-[10px] font-mono block text-gray-400 truncate">
                    {activeSystemAlert.specialty || 'Vedic Jyotish Master'}
                  </span>
                </div>
              </div>

              {/* Alert Content */}
              <div className="space-y-2 text-center sm:text-left">
                <p className="text-xs sm:text-sm font-serif leading-relaxed">
                  <strong>{activeSystemAlert.astrologerName}</strong> का पिछला परामर्श सत्र संपन्न हो चुका है और वे अब आपके साथ तुरंत 1-on-1 परामर्श हेतु पूरी तरह उपलब्ध हैं।
                </p>
                <p className="text-[11px] font-mono text-emerald-400/90">
                  ⚡ आपकी कतार की प्रतीक्षा समाप्त हुई। तत्काल संवाद प्रारंभ करें।
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveSystemAlert(null)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    isDark ? 'bg-white/10 hover:bg-white/20 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  Dismiss
                </button>
                <button
                  onClick={() => {
                    const id = activeSystemAlert.astrologerId;
                    setActiveSystemAlert(null);
                    onOpenAstrologerChat(id);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-cinzel font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start Consultation Now</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sanctum Mastery & Engagement Ledger Modal */}
      <SanctumMasteryLedgerModal
        isOpen={isLedgerModalOpen}
        onClose={() => {
          setIsLedgerModalOpen(false);
          setSelectedEngagement(null);
        }}
        selectedEngagement={selectedEngagement}
        theme={theme}
        onNavigateToPortal={(portalId) => {
          setIsLedgerModalOpen(false);
          sanctumTracker.recordVisit(portalId);
          onNavigate(portalId as ScreenType);
        }}
      />

      {/* Nakshatra Community Lounge Modal */}
      <CommunityLoungeModal
        isOpen={isLoungeModalOpen}
        onClose={() => setIsLoungeModalOpen(false)}
        theme={theme}
        waitingForAstrologer={loungeWaitingAstrologer}
        onDirectConsultation={(astrologerId) => {
          setIsLoungeModalOpen(false);
          onOpenAstrologerChat(astrologerId);
        }}
      />

      {/* Comprehensive Kundli PDF Export & Print Modal */}
      <KundliPdfExportModal
        isOpen={isPdfExportModalOpen}
        onClose={() => setIsPdfExportModalOpen(false)}
        theme={theme}
        user={user}
      />

      {/* Daily Muhurat, Rahukaal & Sadhana Streak Modal */}
      <DailyMuhuratAlertModal
        isOpen={isMuhuratModalOpen}
        onClose={() => setIsMuhuratModalOpen(false)}
        theme={theme}
      />

      {/* Vedic Cosmology (Surya Siddhanta) vs NASA Astrophysics Modal */}
      <CosmicComparisonModal
        isOpen={isCosmologyModalOpen}
        onClose={() => setIsCosmologyModalOpen(false)}
        theme={theme}
      />

      {/* Digital 108 Sacred Japa Mala Modal */}
      <DigitalJapaMalaModal
        isOpen={isJapaMalaModalOpen}
        onClose={() => setIsJapaMalaModalOpen(false)}
        theme={theme}
      />

      {/* Live Planetary Transit (Gochar) Radar Modal */}
      <LivePlanetaryTransitRadarModal
        isOpen={isTransitRadarModalOpen}
        onClose={() => setIsTransitRadarModalOpen(false)}
        theme={theme}
      />

      {/* AI Cosmic Voice Guru Modal */}
      <CosmicVoiceGuruModal
        isOpen={isVoiceGuruModalOpen}
        onClose={() => setIsVoiceGuruModalOpen(false)}
        theme={theme}
      />

      {/* Offline Cached Astrologer Profile & Query Composer Modal */}
      <AnimatePresence>
        {isOfflineInquiryModalOpen && selectedOfflineAstrologer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`w-full max-w-lg rounded-3xl border p-6 space-y-5 shadow-2xl relative overflow-hidden ${
                isDark 
                  ? 'bg-[#121622] border-amber-500/40 text-white' 
                  : 'bg-[#fdfaf5] border-[#d9b482] text-[#2b2118]'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={selectedOfflineAstrologer.avatar}
                      alt={selectedOfflineAstrologer.name}
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400/80 shadow-md"
                    />
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded bg-amber-500 text-black font-mono font-bold text-[8px]">
                      Cached
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-cinzel font-bold">
                        {selectedOfflineAstrologer.name}
                      </h4>
                    </div>
                    <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-[#68553f]'}`}>
                      {selectedOfflineAstrologer.hindiName} • {selectedOfflineAstrologer.experienceYears}+ Yrs Experience
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {selectedOfflineAstrologer.rating}
                      </span>
                      <span className="text-[10px] font-mono opacity-70">
                        • ₹{selectedOfflineAstrologer.ratePerMin || 25}/min
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOfflineInquiryModalOpen(false)}
                  className={`p-2 rounded-xl border transition-colors ${
                    isDark ? 'border-white/10 hover:bg-white/10 text-white' : 'border-[#d9b482] hover:bg-[#ede5d8] text-[#4a3518]'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Offline Resilience Notice */}
              <div className={`p-3 rounded-2xl border text-xs space-y-1 ${
                isDark ? 'bg-amber-950/30 border-amber-500/30 text-amber-200' : 'bg-[#faebd7] border-[#e2caa8] text-[#6b451b]'
              }`}>
                <div className="flex items-center gap-2 font-bold text-[11px]">
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  <span>Offline Profile & Queue Snapshot</span>
                </div>
                <p className="text-[10.5px] opacity-85 leading-relaxed">
                  You are viewing cached profile information. You can draft and queue your astrological question right now — it will be automatically transmitted when connection restores.
                </p>
              </div>

              {/* Astrologer Bio & Specialties */}
              <div className="space-y-2">
                <h5 className="text-xs font-mono uppercase tracking-wider opacity-75">
                  Specialties & Shastras
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedOfflineAstrologer.specialties?.map((spec, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border ${
                        isDark ? 'bg-white/5 border-white/10 text-amber-300' : 'bg-white border-[#d9b482] text-[#5c3a14]'
                      }`}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                {selectedOfflineAstrologer.title && (
                  <p className={`text-xs leading-relaxed pt-1.5 font-medium ${isDark ? 'text-slate-300' : 'text-[#4a3e33]'}`}>
                    {selectedOfflineAstrologer.title}
                  </p>
                )}
                {selectedOfflineAstrologer.greetingMessage && (
                  <p className={`text-xs italic leading-relaxed pt-1 opacity-90 ${isDark ? 'text-amber-200/90' : 'text-[#7a5522]'}`}>
                    "{selectedOfflineAstrologer.greetingMessage}"
                  </p>
                )}
              </div>

              {/* Queue Status Snapshot */}
              {astrologerQueueData[selectedOfflineAstrologer.id] && (
                <div className={`p-3 rounded-2xl border flex items-center justify-between text-xs font-mono ${
                  isDark ? 'bg-black/30 border-white/10' : 'bg-white border-[#e2d5c2]'
                }`}>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-500" />
                    <span>Last Known Queue:</span>
                  </div>
                  <span className="font-bold text-amber-400">
                    {astrologerQueueData[selectedOfflineAstrologer.id].isOccupied
                      ? `${astrologerQueueData[selectedOfflineAstrologer.id].queueCount} seekers waiting (~${astrologerQueueData[selectedOfflineAstrologer.id].waitTimeMin}m)`
                      : '0 in queue • Direct access ready'}
                  </span>
                </div>
              )}

              {/* Offline Question Drafter / Queue Form */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-mono uppercase tracking-wider opacity-80">
                  Draft Astrological Question (Auto-Queued Offline):
                </label>
                <textarea
                  rows={3}
                  value={offlineInquiryText}
                  onChange={(e) => setOfflineInquiryText(e.target.value)}
                  placeholder={`Ask ${selectedOfflineAstrologer.name} about your career, marriage, health, or Kundli planetary transits...`}
                  className={`w-full p-3 rounded-2xl text-xs font-mono border outline-none resize-none transition-colors ${
                    isDark 
                      ? 'bg-black/50 border-white/15 text-white focus:border-amber-400 placeholder:text-slate-500' 
                      : 'bg-white border-[#d9b482] text-[#2b2118] focus:border-[#8c5922] placeholder:text-slate-400'
                  }`}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOfflineInquiryModalOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-colors ${
                    isDark ? 'bg-white/5 hover:bg-white/10 text-slate-300' : 'bg-slate-200 hover:bg-slate-300 text-[#2b2118]'
                  }`}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleQueueOfflineQuestion}
                  disabled={!offlineInquiryText.trim()}
                  className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer ${
                    offlineInquiryText.trim()
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Queue Question Offline</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
