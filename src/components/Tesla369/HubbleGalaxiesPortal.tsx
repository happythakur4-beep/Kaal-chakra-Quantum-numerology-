import React, { useState, useMemo, useRef } from 'react';
import { ThemeMode } from '../../types';
import { 
  HUBBLE_DISCOVERIES, 
  HUBBLE_TIMELINE_EVENTS, 
  HubbleDiscoveryItem, 
  TimelineEvent 
} from '../../data/hubbleGalaxiesData';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import {
  Telescope,
  Sparkles,
  Compass,
  Layers,
  Clock,
  Search,
  BookOpen,
  Volume2,
  Share2,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Info,
  Maximize2,
  Eye,
  Orbit,
  Flame,
  Radio,
  Zap,
  Globe,
  Sliders,
  CheckCircle2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface HubbleGalaxiesPortalProps {
  theme: ThemeMode;
  onNavigateToBlackHole?: () => void;
}

type HubbleTab = 'discoveries' | 'timeline' | 'lensing-sim' | 'blackhole-engine' | 'scale';

export const HubbleGalaxiesPortal: React.FC<HubbleGalaxiesPortalProps> = ({
  theme,
  onNavigateToBlackHole
}) => {
  const isDark = theme === 'dark';

  // Navigation & Filtering State
  const [activeTab, setActiveTab] = useState<HubbleTab>('discoveries');
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDiscovery, setSelectedDiscovery] = useState<HubbleDiscoveryItem | null>(null);
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Interactive Lensing Simulator State
  const [lensMass, setLensMass] = useState<number>(65);
  const [backgroundOffset, setBackgroundOffset] = useState<number>(15);

  // Interactive Cosmic Distance Scale Slider State
  const [selectedDistanceIndex, setSelectedDistanceIndex] = useState<number>(0);

  // Filter Discoveries
  const filteredDiscoveries = useMemo(() => {
    return HUBBLE_DISCOVERIES.filter(item => {
      // Chapter filter
      if (selectedChapter !== 'all' && item.chapter !== selectedChapter) return false;
      // Theme filter
      if (selectedTheme !== 'all' && item.visualTheme !== selectedTheme) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          item.titleEn.toLowerCase().includes(q) ||
          item.titleHi.toLowerCase().includes(q) ||
          item.subtitleEn.toLowerCase().includes(q) ||
          item.subtitleHi.toLowerCase().includes(q) ||
          item.summaryHi.toLowerCase().includes(q) ||
          item.summaryEn.toLowerCase().includes(q) ||
          item.scientificTags.some(tag => tag.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [selectedChapter, selectedTheme, searchQuery]);

  // Play Celestial Frequency associated with galaxy
  const handlePlayCosmicTone = (id: string, freq: number = 432) => {
    setPlayingAudioId(id);
    try {
      cosmicAudio.playTeslaFrequency(freq, 2.5);
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#fbbf24', '#c084fc', '#f43f5e']
      });
    } catch {}
    setTimeout(() => setPlayingAudioId(null), 2500);
  };

  return (
    <div 
      id="hubble-galaxies-portal-root"
      className="space-y-6 select-none"
    >
      {/* 1. HERO BANNER: HUBBLE FOCUS GALAXIES VAULT */}
      <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border-2 transition-all duration-300 shadow-2xl ${
        isDark 
          ? 'bg-gradient-to-br from-[#0c0a1a] via-[#120f28] to-[#080712] border-cyan-500/40 text-cyan-50 shadow-[0_0_50px_rgba(6,182,212,0.25)]' 
          : 'bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#fef9c3] border-cyan-400/80 text-[#0c4a6e] shadow-xl'
      }`}>
        {/* Background Decorative Cosmic Glows */}
        <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full border text-xs font-mono font-bold flex items-center gap-1.5 bg-cyan-500/20 text-cyan-300 border-cyan-400/40 shadow-sm">
                <Telescope className="w-3.5 h-3.5" />
                <span>NASA & ESA HUBBLE FOCUS • SPECIAL EDITION</span>
              </span>
              <span className="px-3 py-1 rounded-full border text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border-amber-400/40">
                🚀 GALAXIES THROUGH SPACE & TIME
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-[11px] font-mono">
                13.4 Billion Light-Years
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-cinzel font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-yellow-200 to-purple-300">
              हबल ब्रह्मांडीय महा-आकाशगंगा वेधशाला (Hubble Space Focus)
            </h2>

            <p className="text-xs sm:text-sm font-serif leading-relaxed opacity-90 max-w-2xl">
              नासा (NASA) एवं यूरोपीय अंतरिक्ष एजेंसी (ESA) के हबल स्पेस टेलीस्कोप द्वारा अंतरिक्ष और समय की सीमाओं को चीरकर खोजी गई दिव्य आकाशगंगाओं, महा-टकरावों, 13 अरब वर्ष पुराने जीवाश्मों और आइंस्टीन के गुरुत्वाकर्षण लेंस का संपूर्ण, सहज एवं विजुअल अन्वेषण।
            </p>
          </div>

          {/* Quick Audio & Language Switcher */}
          <div className="flex flex-row md:flex-col items-end gap-2.5 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-2xl border border-white/10">
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  language === 'hi'
                    ? 'bg-cyan-500 text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🇮🇳 हिन्दी
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-cyan-500 text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🇬🇧 English
              </button>
            </div>

            <button
              onClick={() => handlePlayCosmicTone('hero-432', 432)}
              className={`px-4 py-2 rounded-2xl border text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95 ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/30' 
                  : 'bg-white border-cyan-500 text-cyan-900 shadow-md'
              }`}
            >
              <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>432Hz कॉस्मिक नाद सुनें</span>
            </button>
          </div>
        </div>

        {/* 4 Hubble Key Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-cyan-400 uppercase block">प्राथमिक दर्पण (Primary Mirror)</span>
            <span className="text-sm sm:text-base font-bold text-white">94.5 इंच (2.4m)</span>
            <span className="text-[10px] text-gray-400 block">&lt; 10 लाखवें हिस्से का विचलन</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-amber-400 uppercase block">दृश्यता सीमा (Sensitivity)</span>
            <span className="text-sm sm:text-base font-bold text-white">31st Magnitude</span>
            <span className="text-[10px] text-gray-400 block">मानव आंख से 10 अरब गुना तेज</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-purple-400 uppercase block">समय सीमा (Lookback Limit)</span>
            <span className="text-sm sm:text-base font-bold text-white">13.4 अरब प्रकाश वर्ष</span>
            <span className="text-[10px] text-gray-400 block">GN-z11 (Redshift z=11.1)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-emerald-400 uppercase block">तरंगदैर्घ्य (Spectrum Range)</span>
            <span className="text-sm sm:text-base font-bold text-white">UV + Visible + NIR</span>
            <span className="text-[10px] text-gray-400 block">पराबैंगनी से निकट-अवरक्त</span>
          </div>
        </div>
      </div>

      {/* 2. SUB-PORTAL TABS */}
      <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'discoveries', label: '🌌 आकाशगंगा खोजें (Discoveries)', icon: <Orbit className="w-4 h-4" /> },
          { id: 'scale', label: '📏 कॉस्मिक दूरी व टाइम मशीन स्केल', icon: <Clock className="w-4 h-4 text-amber-400" /> },
          { id: 'lensing-sim', label: '🔍 ग्रेविटेशनल लेंसिंग सिम्युलेटर', icon: <Compass className="w-4 h-4 text-cyan-400" /> },
          { id: 'blackhole-engine', label: '⛈️ ब्लैक होल तूफानी वर्षा चक्र', icon: <Flame className="w-4 h-4 text-rose-400" /> },
          { id: 'timeline', label: '⏳ 400 वर्षों की खगोल टाइमलाइन (1610-2014)', icon: <Layers className="w-4 h-4 text-purple-400" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as HubbleTab)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-cinzel font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-500/25 via-purple-500/20 to-amber-500/25 text-cyan-300 border border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                : 'text-gray-400 hover:text-gray-200 bg-black/40 border border-white/10'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: ALL DISCOVERIES & CHAPTERS (CORE VAULT) */}
      {/* ========================================================================= */}
      {activeTab === 'discoveries' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-2xl bg-black/40 border border-white/10">
            {/* Chapter Selection Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { id: 'all', label: 'सभी अध्याय (All)' },
                { id: 1, label: 'अध्याय 1: हमारा पड़ोस (Local Neighborhood)' },
                { id: 2, label: 'अध्याय 2: रहस्यमयी आकाशगंगाएं (Intriguing)' },
                { id: 3, label: 'अध्याय 3: सुदूर सीमाएं (Farthest Universe)' },
                { id: 0, label: 'अवलोकन व विरासत (Summary)' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedChapter(c.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedChapter === c.id
                      ? 'bg-cyan-500 text-black shadow-md'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="आकाशगंगा, तारा या खोज खोजें..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDiscoveries.map((item) => (
              <motion.div
                key={item.id}
                layout
                whileHover={{ scale: 1.02, y: -3 }}
                onClick={() => setSelectedDiscovery(item)}
                className={`p-5 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden shadow-xl ${
                  isDark
                    ? 'bg-gradient-to-b from-[#121024] via-[#0a0918] to-black border-cyan-500/30 hover:border-cyan-400 shadow-[0_4px_25px_rgba(0,0,0,0.5)]'
                    : 'bg-gradient-to-b from-[#ffffff] to-[#f0f9ff] border-cyan-300 hover:border-cyan-500 text-gray-900 shadow-md'
                }`}
              >
                {/* Visual Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 uppercase">
                    {item.chapter === 1 ? 'Ch 1 • Galactic Neighborhood' : item.chapter === 2 ? 'Ch 2 • Intriguing Galaxies' : item.chapter === 3 ? 'Ch 3 • Farthest Galaxies' : 'Cosmic Legacy'}
                  </span>

                  <span className="text-[10px] font-mono text-amber-400 font-bold">
                    📍 {item.distanceLightYears}
                  </span>
                </div>

                {/* Main Titles */}
                <div className="space-y-1.5 my-2">
                  <h3 className="text-base sm:text-lg font-cinzel font-bold text-[#fef08a] group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {language === 'hi' ? item.titleHi : item.titleEn}
                  </h3>
                  <p className="text-xs font-mono text-cyan-200/80 line-clamp-1">
                    {language === 'hi' ? item.subtitleHi : item.subtitleEn}
                  </p>
                  <p className="text-xs font-serif text-gray-300 leading-relaxed line-clamp-3 pt-1">
                    {language === 'hi' ? item.summaryHi : item.summaryEn}
                  </p>
                </div>

                {/* Key Takeaway Pill */}
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 my-3 text-[11px] font-serif italic text-amber-200">
                  ⚡ &ldquo;{item.keyTakeaway}&rdquo;
                </div>

                {/* Bottom Footer Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayCosmicTone(item.id, 528);
                    }}
                    className="flex items-center gap-1.5 text-cyan-300 hover:text-cyan-100 p-1 rounded hover:bg-white/10"
                    title="Play Celestial Resonance Sound"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>नाद (Sound)</span>
                  </button>

                  <span className="flex items-center gap-1 text-amber-300 group-hover:translate-x-1 transition-transform font-bold">
                    <span>पूरा समझें (Details)</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: COSMIC DISTANCE & LOOKBACK TIME MACHINE SCALE */}
      {/* ========================================================================= */}
      {activeTab === 'scale' && (
        <div className="space-y-6 p-6 sm:p-8 rounded-3xl border-2 border-amber-500/40 bg-gradient-to-b from-[#141026] to-black shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3.5 py-1 rounded-full border border-amber-400/50 bg-amber-500/10 text-amber-300 text-xs font-mono uppercase tracking-widest">
              TELESCOPES ARE TIME MACHINES • प्रकाश की गति व समय यात्रा
            </span>
            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#fef08a]">
              अंतरिक्ष और समय में ब्रह्मांडीय दूरी का पैमाना
            </h3>
            <p className="text-xs sm:text-sm font-serif text-gray-300 leading-relaxed">
              क्योंकि प्रकाश को अंतरिक्ष में यात्रा करने में समय लगता है, हबल जब सुदूर आकाशगंगाओं को देखता है, तो वह उनके वर्तमान को नहीं, बल्कि अरबों वर्ष पूर्व के अतीत को देखता है।
            </p>
          </div>

          {/* Interactive Distance Stepper */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 pt-4">
            {[
              { name: 'Milky Way Core', dist: '27,000 ly', time: '27,000 Yrs Ago', id: 'milkyway-core-blackhole' },
              { name: 'Andromeda (M31)', dist: '2.5 Million ly', time: '2.5M Yrs Ago', id: 'andromeda-phat' },
              { name: 'Bedin I (Fossil)', dist: '30 Million ly', time: '13B Yrs Old', id: 'bedin-1' },
              { name: 'Kiso 5639 (Tadpole)', dist: '82 Million ly', time: '82M Yrs Ago', id: 'kiso-5639-tadpole' },
              { name: 'NGC 1277 (Relic)', dist: '240 Million ly', time: '10B Yrs Frozen', id: 'ngc-1277-red-and-dead' },
              { name: 'Mrk 231 (Quasar)', dist: '581 Million ly', time: '581M Yrs Ago', id: 'markarian-231-double-blackhole' },
              { name: 'Abell 1758 Cluster', dist: '3.2 Billion ly', time: '3.2B Yrs Ago', id: 'gravitational-lensing-einstein-rings' },
              { name: 'Abell 2744 (Frontier)', dist: '3.5 Billion ly', time: '3.5B Yrs Ago', id: 'gravitational-lensing-einstein-rings' },
              { name: 'Infrared Monsters', dist: '10 Billion ly', time: 'Cosmic Noon', id: 'brightest-infrared-galaxies' },
              { name: 'MACS 2129-1 (Dead)', dist: '10.5 Billion ly', time: '10.5B Yrs Ago', id: 'macs-2129-1-dead-disk' },
              { name: 'SPT0615-JD (Arc)', dist: '13.3 Billion ly', time: '500M Yrs After BB', id: 'spt0615-jd-stretched-arc' },
              { name: 'GN-z11 (Record)', dist: '13.4 Billion ly', time: '400M Yrs After BB (z=11.1)', id: 'gn-z11-farthest-record' },
            ].map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedDistanceIndex(idx);
                  const found = HUBBLE_DISCOVERIES.find(d => d.id === step.id);
                  if (found) setSelectedDiscovery(found);
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedDistanceIndex === idx
                    ? 'bg-gradient-to-br from-amber-500/30 to-purple-500/30 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                    : 'bg-black/50 border-white/10 hover:border-white/30'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold block">{step.dist}</span>
                  <span className="text-xs font-cinzel font-bold text-white block mt-0.5">{step.name}</span>
                </div>
                <span className="text-[9.5px] font-mono text-amber-300 mt-2 block opacity-85">
                  ⏳ {step.time}
                </span>
              </button>
            ))}
          </div>

          {/* Visual Cosmological Horizon Diagram */}
          <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
            <h4 className="text-sm font-cinzel font-bold text-cyan-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>रेडशिफ्ट (Redshift z) और ब्रह्मांड का प्रसार</span>
            </h4>
            <p className="text-xs font-serif text-gray-300 leading-relaxed">
              जैसे-जैसे ब्रह्मांड का विस्तार होता है, सुदूर आकाशगंगाओं से आने वाली प्रकाश किरणें खिंचकर लंबी और लाल (Redshifted) हो जाती हैं। GN-z11 का रेडशिफ्ट <strong>z = 11.1</strong> है, जिसका अर्थ है कि इसका प्रकाश अत्यधिक खिंच चुका है और हबल ने इसे अवरक्त (Near-Infrared) कैमरों द्वारा ही पकड़ा।
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: INTERACTIVE GRAVITATIONAL LENSING SIMULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'lensing-sim' && (
        <div className="space-y-6 p-6 sm:p-8 rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-b from-[#0e1628] via-[#080d1a] to-black shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3.5 py-1 rounded-full border border-cyan-400/50 bg-cyan-500/10 text-cyan-300 text-xs font-mono uppercase tracking-widest">
              EINSTEIN’S SPACE-TIME WARP • सामान्य सापेक्षता का प्रत्यक्ष चमत्कार
            </span>
            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-cyan-200">
              गुरुत्वाकर्षण लेंसिंग एवं आइंस्टीन के छल्ले (Einstein Rings)
            </h3>
            <p className="text-xs sm:text-sm font-serif text-gray-300 leading-relaxed">
              विशाल आकाशगंगा समूहों (जैसे Abell 370 और Abell 2744) का महाकाय गुरुत्वाकर्षण पीछे की सुदूर आकाशगंगाओं के प्रकाश को 20 से 50 गुना बड़ा कर देता है। नीचे दिए गए स्लाइडर्स से स्पेस-टाइम वक्रता बदल कर देखें:
            </p>
          </div>

          {/* Interactive Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-cyan-300 font-bold">आकाशगंगा समूह का द्रव्यमान (Cluster Mass)</span>
                <span className="text-amber-400">{lensMass * 10} Trillion Suns</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={lensMass}
                onChange={(e) => setLensMass(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-black/60 border border-purple-500/30 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-purple-300 font-bold">पृष्ठभूमि आकाशगंगा का संरेखण (Alignment)</span>
                <span className="text-amber-400">{backgroundOffset === 0 ? 'Exact Center (Full Ring)' : `${backgroundOffset}° Offset`}</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={backgroundOffset}
                onChange={(e) => setBackgroundOffset(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Visual SVG Gravitational Lensing Canvas */}
          <div className="relative w-full h-80 sm:h-96 rounded-3xl bg-black border-2 border-cyan-400/40 overflow-hidden flex items-center justify-center shadow-inner">
            {/* Background Starfield */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Central Foreground Massive Galaxy Cluster (The Lens) */}
            <div 
              className="absolute z-20 rounded-full bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 blur-sm shadow-[0_0_50px_rgba(245,158,11,0.8)] transition-all duration-300"
              style={{
                width: `${lensMass * 0.8}px`,
                height: `${lensMass * 0.8}px`,
              }}
            />
            <div className="absolute z-20 text-[10px] font-mono font-bold text-amber-200 pointer-events-none mt-20">
              Foreground Galaxy Cluster (Lens)
            </div>

            {/* Lensed Background Light: Complete Ring or Arcs based on alignment */}
            {backgroundOffset < 8 ? (
              // Perfect Einstein Ring
              <div
                className="absolute z-10 rounded-full border-4 border-cyan-400/90 shadow-[0_0_40px_rgba(6,182,212,0.9)] animate-pulse transition-all duration-300"
                style={{
                  width: `${lensMass * 2.2}px`,
                  height: `${lensMass * 2.2}px`,
                }}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-cyan-300 whitespace-nowrap">
                  🌟 Perfect Einstein Ring (SDSS J0146-0929)
                </span>
              </div>
            ) : (
              // Lensed Arcs & Streaks (Abell 370 / SPT0615-JD style)
              <>
                <div
                  className="absolute z-10 rounded-full border-t-4 border-r-4 border-cyan-400/90 shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all duration-300"
                  style={{
                    width: `${lensMass * 2.4}px`,
                    height: `${lensMass * 1.6}px`,
                    transform: `rotate(${backgroundOffset * 3}deg) translate(${backgroundOffset}px, -${backgroundOffset}px)`,
                  }}
                />
                <div
                  className="absolute z-10 rounded-full border-b-4 border-l-4 border-rose-400/80 shadow-[0_0_30px_rgba(244,63,94,0.8)] transition-all duration-300"
                  style={{
                    width: `${lensMass * 2.0}px`,
                    height: `${lensMass * 1.4}px`,
                    transform: `rotate(-${backgroundOffset * 2}deg) translate(-${backgroundOffset}px, ${backgroundOffset}px)`,
                  }}
                />
              </>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-400/30 text-xs font-serif text-cyan-100 flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong>हबल फ्रंटियर फील्ड्स (Frontier Fields):</strong> इस सिद्धांत के बिना हबल SPT0615-JD (13.3 अरब वर्ष दूर) और MACS J0416.1 की अति-धुंधली आकाशगंगाओं को कभी नहीं देख पाता। अंतरिक्ष स्वयं एक शक्तिशाली दूरबीन का कार्य करता है।
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: THUNDERSTORM BLACK HOLE FEEDBACK ENGINE */}
      {/* ========================================================================= */}
      {activeTab === 'blackhole-engine' && (
        <div className="space-y-6 p-6 sm:p-8 rounded-3xl border-2 border-purple-500/40 bg-gradient-to-b from-[#180e29] via-[#0d0718] to-black shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3.5 py-1 rounded-full border border-purple-400/50 bg-purple-500/10 text-purple-300 text-xs font-mono uppercase tracking-widest">
              BLACK HOLE AS A COSMIC THERMOSTAT • तूफानी वर्षा मॉडल
            </span>
            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#fef08a]">
              विशाल अंडाकार आकाशगंगाओं में तारों के जन्म का स्वचालित नियमन
            </h3>
            <p className="text-xs sm:text-sm font-serif text-gray-300 leading-relaxed">
              हबल ने पराबैंगनी किरणों (UV) में खोजा कि ब्लैक होल केवल पदार्थ को निगलते नहीं हैं, बल्कि उनके जेट्स बादलों को गर्म रखकर एक मौसम चक्र (Thunderstorm Cycle) चलाते हैं:
            </p>
          </div>

          {/* Step by Step 4-Stage Interactive Diagram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '1. शीतलन एवं संघनन (Cooling)',
                title: 'गैस ठंडी होकर बारिश की तरह गिरती है',
                desc: 'प्रभामंडल की गर्म गैस ठंडी होकर ठंडे बादलों में बदलती है और बारिश की बूंदों की तरह आकाशगंगा के केंद्र की ओर गिरती है।',
                icon: '🌧️',
                color: 'from-blue-900/60 to-cyan-900/60'
              },
              {
                step: '2. नए तारों का जन्म (Star Birth)',
                title: 'नीले तारों के समूह प्रज्वलित होते हैं',
                desc: 'गिरती हुई ठंडी गैस से चमकीले नीले तारों की मालाएं (Knots of blue stars) बनती हैं, जैसा Abell 1664 व Abell 2597 में देखा गया।',
                icon: '✨',
                color: 'from-cyan-900/60 to-emerald-900/60'
              },
              {
                step: '3. ब्लैक होल का भोजन (Fueling)',
                title: 'सुपरमैसिव ब्लैक होल सक्रिय होता है',
                desc: 'कुछ गैस सीधे केंद्र में स्थित ब्लैक होल की अभिवृद्धि डिस्क (Accretion Disk) में समाहित होकर भीषण ऊर्जा उत्पन्न करती है।',
                icon: '🕳️',
                color: 'from-purple-900/60 to-rose-900/60'
              },
              {
                step: '4. जेट्स द्वारा तापन (Heating)',
                title: 'जेट्स गैस को गर्म कर बारिश रोकते हैं',
                desc: 'ब्लैक होल से निकलने वाले हाई-एनर्जी प्लाज्मा जेट्स प्रभामंडल को गर्म कर देते हैं, जिससे गैस का ठंडा होना और तारा निर्माण कुछ समय के लिए थम जाता है।',
                icon: '⚡',
                color: 'from-amber-900/60 to-orange-900/60'
              }
            ].map((stage, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border border-white/15 bg-gradient-to-b ${stage.color} flex flex-col justify-between space-y-3 shadow-lg`}
              >
                <div>
                  <div className="text-2xl mb-1">{stage.icon}</div>
                  <span className="text-[10px] font-mono font-bold text-amber-300 uppercase block">{stage.step}</span>
                  <h4 className="text-sm font-cinzel font-bold text-white mt-1">{stage.title}</h4>
                  <p className="text-xs font-serif text-gray-200 mt-2 leading-relaxed">{stage.desc}</p>
                </div>
                <div className="text-[10px] font-mono text-cyan-300 pt-2 border-t border-white/10">
                  चक्र निरंतर दोहराया जाता है ♾️
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: ASTRONOMICAL TIMELINE (1610 - 2014) */}
      {/* ========================================================================= */}
      {activeTab === 'timeline' && (
        <div className="space-y-6 p-6 sm:p-8 rounded-3xl border-2 border-purple-500/40 bg-gradient-to-b from-[#130d24] to-black shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3.5 py-1 rounded-full border border-purple-400/50 bg-purple-500/10 text-purple-300 text-xs font-mono uppercase tracking-widest">
              OUR UNDERSTANDING OF GALAXIES: A TIMELINE
            </span>
            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#fef08a]">
              गैलीलियो (1610) से हबल अल्ट्रा डीप फील्ड (2014) तक का इतिहास
            </h3>
            <p className="text-xs sm:text-sm font-serif text-gray-300 leading-relaxed">
              शताब्दियों की वैज्ञानिक साधना जिसने मानव जाति को सिखाया कि हमारी आकाशगंगा ब्रह्मांड की एकमात्र रचना नहीं, बल्कि खरबों आकाशगंगाओं के महासागर का एक सूक्ष्म कण है:
            </p>
          </div>

          <div className="space-y-4 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-amber-500 before:to-purple-500">
            {HUBBLE_TIMELINE_EVENTS.map((event, idx) => (
              <div
                key={event.year}
                className={`relative flex flex-col sm:flex-row items-start ${
                  idx % 2 === 0 ? 'sm:flex-row-reverse' : ''
                } gap-4 sm:gap-8 pl-10 sm:pl-0`}
              >
                {/* Center Node Indicator */}
                <div className="absolute left-2.5 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 border-2 border-black shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10 mt-2" />

                {/* Content Box */}
                <div className="w-full sm:w-1/2 p-5 rounded-2xl bg-black/70 border border-white/15 hover:border-cyan-400/60 transition-all shadow-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-mono font-black text-amber-400">{event.year}</span>
                    <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded-full bg-cyan-500/20">
                      {event.scientistOrMission}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-cinzel font-bold text-white">
                    {language === 'hi' ? event.titleHi : event.titleEn}
                  </h4>

                  <p className="text-xs font-serif text-gray-300 leading-relaxed">
                    {language === 'hi' ? event.descriptionHi : event.descriptionEn}
                  </p>

                  <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-amber-200/80">
                    🔑 {event.significance}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DETAILED MODAL VIEWER FOR ANY DISCOVERY */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedDiscovery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-cyan-400/70 bg-gradient-to-b from-[#110e26] via-[#090714] to-black p-6 sm:p-8 text-white shadow-[0_0_60px_rgba(6,182,212,0.4)] space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDiscovery(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 pr-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                    {selectedDiscovery.chapter === 1 ? 'अध्याय 1: हमारा पड़ोस' : selectedDiscovery.chapter === 2 ? 'अध्याय 2: रहस्यमयी आकाशगंगाएं' : selectedDiscovery.chapter === 3 ? 'अध्याय 3: सुदूरतम सीमाएं' : 'हबल विरासत'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40">
                    📍 {selectedDiscovery.distanceLightYears}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-purple-500/20 text-purple-300">
                    ⏳ {selectedDiscovery.lookbackTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-3xl font-cinzel font-bold text-[#fef08a]">
                  {language === 'hi' ? selectedDiscovery.titleHi : selectedDiscovery.titleEn}
                </h2>
                <p className="text-xs sm:text-sm font-mono text-cyan-300">
                  {language === 'hi' ? selectedDiscovery.subtitleHi : selectedDiscovery.subtitleEn}
                </p>
              </div>

              {/* 4 Key Statistics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedDiscovery.keyStats.map((stat, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-mono text-gray-400 uppercase block">{stat.label}</span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-amber-300 block mt-1">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Detailed Explanation */}
              <div className="space-y-4 p-5 rounded-2xl bg-black/50 border border-white/10">
                <h4 className="text-sm font-cinzel font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>गहन वैज्ञानिक विश्लेषण एवं विवरण (Deep Explanation)</span>
                </h4>
                <p className="text-xs sm:text-sm font-serif text-gray-200 leading-relaxed">
                  {language === 'hi' ? selectedDiscovery.deepExplanationHi : selectedDiscovery.deepExplanationEn}
                </p>
              </div>

              {/* Quote If Available */}
              {selectedDiscovery.quote && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-200 space-y-1">
                  <p className="text-xs sm:text-sm font-serif italic">
                    &ldquo;{selectedDiscovery.quote.text}&rdquo;
                  </p>
                  <div className="text-[11px] font-mono text-amber-400 font-bold text-right">
                    — {selectedDiscovery.quote.author}, {selectedDiscovery.quote.affiliation}
                  </div>
                </div>
              )}

              {/* Tags & Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {selectedDiscovery.scientificTags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePlayCosmicTone(selectedDiscovery.id, 528)}
                    className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/50 text-cyan-200 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>कॉस्मिक नाद प्ले करें</span>
                  </button>
                  <button
                    onClick={() => setSelectedDiscovery(null)}
                    className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold cursor-pointer"
                  >
                    बंद करें (Close)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
