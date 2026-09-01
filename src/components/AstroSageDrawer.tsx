import React, { useState, useMemo } from 'react';
import { ScreenType, ThemeMode } from '../types';
import { ASTROSAGE_NAV_MENU, AstroSageCategory, SubFeatureItem, AI_ASTROLOGERS_LIST } from '../data/astroSageDirectory';
import { 
  X, 
  ChevronRight, 
  ChevronDown, 
  User, 
  Sparkles, 
  Home, 
  Star, 
  Compass, 
  Calculator, 
  Layers, 
  FileText, 
  Gem, 
  Calendar, 
  BookOpen, 
  Heart, 
  SlidersHorizontal, 
  Sun, 
  MoreHorizontal,
  Bot,
  ExternalLink,
  ShieldCheck,
  Scale,
  Brain,
  Zap,
  Search,
  Grid,
  Scroll,
  Radio
} from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynthesizer';
import { MindWellness3DIcon } from './MindWellness/MindWellness3DIcon';
import { TibetanBowl3DIcon } from './SoundHealing/TibetanBowl3DIcon';
import { Tesla3DLogoIcon } from './Tesla369/Tesla3DLogoIcon';

interface AstroSageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onNavigate: (screen: ScreenType) => void;
  onOpenSubFeatureModal: (category: AstroSageCategory | null, subFeature?: SubFeatureItem) => void;
  onOpenAstrologerChat: (astrologerId?: string) => void;
}

export const AstroSageDrawer: React.FC<AstroSageDrawerProps> = ({
  isOpen,
  onClose,
  theme,
  onNavigate,
  onOpenSubFeatureModal,
  onOpenAstrologerChat
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('astrology');
  const [searchQuery, setSearchQuery] = useState('');
  const isDark = theme === 'dark';

  // Master categories including Mind Healing, Sound Healing, Tesla, and Karma
  const allDrawerCategories: AstroSageCategory[] = useMemo(() => {
    const customSanctuaries: AstroSageCategory[] = [
      {
        id: 'mind-wellness',
        title: 'Mind Wellness & Cellular Healing',
        hindiTitle: 'चित्त रोग मुक्ति एवं कायाकल्प',
        isNew: true,
        iconName: 'Brain',
        color: '#10b981',
        subFeatures: [
          { id: 'mw-chamber', title: 'Epigenetic Healing Chamber', description: '528Hz cellular DNA repair and subconscious disease release', targetScreen: 'mind-healing' },
          { id: 'mw-hypnosis', title: 'Memory Healing & Hypnosis', description: 'Amygdala decoupling, submodality dimmer & 3D memory palace', targetScreen: 'memory-hypnosis' },
          { id: 'mw-vagus', title: 'Vagus Nerve Resonance Pacer', description: 'Parasympathetic tone alignment and heart-brain coherence', targetScreen: 'mind-healing' }
        ]
      },
      {
        id: 'sound-healing-suite',
        title: 'Sound Healing & Solfeggio',
        hindiTitle: 'नाद ब्रह्म एवं 9 सोल्फैगियो स्वर',
        isNew: true,
        iconName: 'Radio',
        color: '#f59e0b',
        subFeatures: [
          { id: 'sh-tibetan', title: 'Tibetan Singing Bowls Chamber', description: 'Authentic metal alloy bowl harmonic overtones & resonance', targetScreen: 'sound-healing' },
          { id: 'sh-solfeggio', title: '9 Solfeggio Sacred Frequencies', description: '174Hz to 963Hz biofield clearing and chakra activation', targetScreen: 'sound-healing' },
          { id: 'sh-drone', title: 'Continuous Cosmic Tanpura & Om Drone', description: '432Hz deep meditative backdrop synthesizer', targetScreen: 'sound-healing' }
        ]
      },
      {
        id: 'tesla-portal',
        title: '3-6-9 Tesla Cyber Portal',
        hindiTitle: 'टेस्ला ब्रह्मांडीय 3-6-9 पोर्टल',
        isNew: true,
        iconName: 'Zap',
        color: '#06b6d4',
        subFeatures: [
          { id: 'ts-warp', title: 'Black Hole Singularity Warp', description: 'Cybernetic matrix and speed of light physics simulation', targetScreen: 'tesla-369' },
          { id: 'ts-vortex', title: '3-6-9 Vortex Mathematics', description: 'Nikola Tesla cosmic energy key and dynamic node lattice', targetScreen: 'tesla-369' }
        ]
      },
      {
        id: 'energy-lotus',
        title: 'Lotus Energy & 7 Chakras',
        hindiTitle: 'कमल ऊर्जा संतुलन एवं कर्म दर्पण',
        isNew: true,
        iconName: 'Scale',
        color: '#a855f7',
        subFeatures: [
          { id: 'el-chakras', title: '7 Chakra Harmonizer', description: 'Muladhara to Sahasrara bio-energy alignment', targetScreen: 'energy-balance' },
          { id: 'el-sanctums', title: '4 Sacred Healing Sanctums', description: 'Prana, Tejas, Ojas, and Soma sanctums', targetScreen: 'energy-balance' },
          { id: 'el-karma', title: 'Karmic Balance Sheet & Ledger', description: 'Punya vs Papa merit tracking and atonement rituals', targetScreen: 'karma' }
        ]
      }
    ];

    return [...customSanctuaries, ...ASTROSAGE_NAV_MENU];
  }, []);

  if (!isOpen) return null;

  const getCategoryIcon = (iconName: string, color: string) => {
    const props = { className: "w-4 h-4 flex-shrink-0", style: { color } };
    switch (iconName) {
      case 'Brain': return <Brain {...props} />;
      case 'Radio': return <Radio {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Home': return <Home {...props} />;
      case 'Scale': return <Scale {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Star': return <Star {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'Calculator': return <Calculator {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'Gem': return <Gem {...props} />;
      case 'Calendar': return <Calendar {...props} />;
      case 'BookOpen': return <BookOpen {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'SlidersHorizontal': return <SlidersHorizontal {...props} />;
      case 'Sun': return <Sun {...props} />;
      case 'MoreHorizontal': return <MoreHorizontal {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  const handleToggleCategory = (catId: string) => {
    try { cosmicAudio.playFrequency(432); } catch {}
    setExpandedCategory(prev => prev === catId ? null : catId);
  };

  const handleSubFeatureClick = (sub: SubFeatureItem) => {
    try { cosmicAudio.playFrequency(528); } catch {}
    if (sub.targetScreen) {
      onNavigate(sub.targetScreen);
      onClose();
    } else {
      onOpenSubFeatureModal(null, sub);
    }
  };

  // Quick portals items for fast 1-tap launch
  const quickPortals = [
    { label: 'Kundli', screen: 'kundli' as ScreenType, icon: <Compass className="w-4 h-4 text-amber-300" />, color: 'from-amber-950/60 to-yellow-950/60' },
    { label: '36 Guna', screen: 'matching' as ScreenType, icon: <Heart className="w-4 h-4 text-rose-300" />, color: 'from-rose-950/60 to-pink-950/60' },
    { label: 'Panchang', screen: 'panchang' as ScreenType, icon: <Calendar className="w-4 h-4 text-amber-400" />, color: 'from-amber-950/60 to-orange-950/60' },
    { label: 'Rashifal', screen: 'rashifal' as ScreenType, icon: <Star className="w-4 h-4 text-yellow-300" />, color: 'from-yellow-950/60 to-amber-950/60' },
    { label: 'Mind Healing', screen: 'mind-healing' as ScreenType, icon: <MindWellness3DIcon size={18} showGlow={false} />, color: 'from-emerald-950/60 to-teal-950/60' },
    { label: 'Sound Suite', screen: 'sound-healing' as ScreenType, icon: <TibetanBowl3DIcon size={18} interactive={false} showGlow={false} />, color: 'from-amber-950/60 to-orange-950/60' },
    { label: 'Tesla 3-6-9', screen: 'tesla-369' as ScreenType, icon: <Tesla3DLogoIcon size={18} interactive={false} showGlow={false} />, color: 'from-cyan-950/60 to-blue-950/60' },
    { label: 'Prashnavali', screen: 'prashnavali' as ScreenType, icon: <Scroll className="w-4 h-4 text-yellow-300" />, color: 'from-amber-950/60 to-yellow-950/60' },
  ];

  // Filter categories and sub-features based on search query
  const filteredCategories = allDrawerCategories.filter(cat => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchesCat = cat.title.toLowerCase().includes(q) || (cat.hindiTitle && cat.hindiTitle.toLowerCase().includes(q));
    const matchesSub = cat.subFeatures.some(s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    return matchesCat || matchesSub;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" 
      />

      {/* Side Options Drawer Panel */}
      <div 
        className={`fixed inset-y-0 left-0 max-w-sm sm:max-w-md w-full shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          isDark ? 'bg-[#0b0a12] text-gray-100 border-r border-[#d4af37]/35 shadow-[0_0_50px_rgba(0,0,0,0.8)]' : 'bg-[#faf6ee] text-[#2c1d06] border-r border-[#c5a059]/40'
        }`}
      >
        {/* Top Header Bar with Grand Vedic Styling */}
        <div className="bg-gradient-to-r from-[#d97706] via-[#b45309] to-[#78350f] p-4 flex items-center justify-between shadow-lg border-b border-amber-400/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-amber-200 border border-amber-300/40 shadow-inner">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="text-base font-cinzel font-bold text-white tracking-wide flex items-center gap-2">
                <span>सर्व विद्या एवं साधन सूची</span>
              </div>
              <div className="text-[11px] font-serif text-amber-100 opacity-90">
                All Features, Shastras & Options
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onOpenAstrologerChat();
                onClose();
              }}
              className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-200 to-yellow-400 text-gray-950 text-xs font-cinzel font-bold flex items-center gap-1.5 shadow-md hover:brightness-110 transition-all cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-gray-950" />
              <span>AI Guru</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
              title="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Search Filter */}
        <div className="p-3 border-b border-[#d4af37]/20 bg-black/20">
          <div className="relative">
            <Search className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all 28+ Shastras, tools & remedies..."
              className={`w-full pl-9 pr-8 py-2 rounded-xl text-xs font-serif outline-none border transition-all ${
                isDark 
                  ? 'bg-black/60 border-amber-500/30 text-white placeholder-gray-400 focus:border-amber-400' 
                  : 'bg-white border-amber-300 text-gray-900 placeholder-gray-500 focus:border-amber-500'
              }`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Top 8 Quick Portals Grid (Only when not searching) */}
        {!searchQuery && (
          <div className={`p-3 border-b ${isDark ? 'border-[#d4af37]/15 bg-black/10' : 'border-[#c5a059]/25 bg-amber-100/30'}`}>
            <div className={`text-[10px] font-cinzel font-bold mb-2 uppercase tracking-wider flex items-center gap-1.5 ${
              isDark ? 'text-amber-300/80' : 'text-[#78350f]'
            }`}>
              <span>शीघ्र पहुंच • Fast Portals</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {quickPortals.map((portal) => (
                <button
                  key={portal.screen}
                  onClick={() => {
                    onNavigate(portal.screen);
                    onClose();
                  }}
                  className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center gap-1 transition-all cursor-pointer group ${
                    isDark 
                      ? `border-white/10 bg-gradient-to-b ${portal.color} hover:border-amber-400/50`
                      : 'border-amber-300/80 bg-white/90 shadow-sm hover:border-amber-500 hover:bg-amber-50'
                  }`}
                >
                  <div className={`p-1 rounded-lg group-hover:scale-110 transition-transform ${
                    isDark ? 'bg-black/40' : 'bg-amber-100/60'
                  }`}>
                    {portal.icon}
                  </div>
                  <span className={`text-[10px] font-cinzel font-semibold truncate w-full ${
                    isDark ? 'text-gray-200' : 'text-[#451a03]'
                  }`}>
                    {portal.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scrollable Accordion Category List */}
        <div className={`flex-1 overflow-y-auto divide-y ${isDark ? 'divide-[#d4af37]/15' : 'divide-[#c5a059]/20'}`}>
          {filteredCategories.map((category) => {
            const isExpanded = searchQuery ? true : expandedCategory === category.id;

            return (
              <div key={category.id} className="transition-colors">
                {/* Category Header Row */}
                <button
                  onClick={() => handleToggleCategory(category.id)}
                  className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors cursor-pointer group ${
                    isExpanded 
                      ? (isDark ? 'bg-[#181628] text-[#ffd700]' : 'bg-amber-100/80 text-[#5c2405] font-semibold')
                      : (isDark ? 'hover:bg-white/5' : 'hover:bg-amber-50/80')
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg border group-hover:scale-105 transition-transform ${
                      isDark ? 'bg-black/40 border-white/10' : 'bg-white border-amber-300 shadow-sm'
                    }`}>
                      {getCategoryIcon(category.iconName, category.color)}
                    </div>
                    <div className="truncate">
                      <div className={`text-xs font-cinzel font-bold tracking-wide flex items-center gap-1.5 ${
                        isDark ? 'text-white' : 'text-[#2a1704]'
                      }`}>
                        <span className="truncate">{category.title}</span>
                        {category.isNew && (
                          <span className="px-1.5 py-0.2 bg-gradient-to-r from-red-600 to-rose-500 text-white text-[9px] font-bold uppercase rounded tracking-widest shadow-sm">
                            NEW
                          </span>
                        )}
                      </div>
                      {category.hindiTitle && (
                        <div className={`text-[10px] font-serif ${isDark ? 'opacity-75 text-amber-200/80' : 'text-[#78350f] font-medium'}`}>
                          {category.hindiTitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={isDark ? 'text-gray-400 group-hover:text-amber-400' : 'text-amber-700'}>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-[#d4af37]" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Sub-Features Collapsible Drawer Section */}
                {isExpanded && (
                  <div className={`py-1.5 pl-5 pr-3 space-y-1 animate-fade-in ${
                    isDark ? 'bg-black/45' : 'bg-[#fffaf0]/90 border-l-2 border-amber-400/60'
                  }`}>
                    {category.subFeatures.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSubFeatureClick(sub)}
                        className={`w-full p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer group flex items-start justify-between gap-2 border border-transparent ${
                          isDark 
                            ? 'hover:bg-[#d4af37]/15 hover:border-amber-500/30 hover:text-[#ffd700] text-gray-300' 
                            : 'hover:bg-amber-100/90 hover:border-amber-300 text-[#3b2712] hover:text-[#1e1003]'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className={`font-cinzel font-semibold flex items-center gap-1.5 ${
                            isDark ? 'text-amber-200' : 'text-[#78350f]'
                          }`}>
                            <span className="text-[#d4af37] text-[11px]">✦</span>
                            <span className="truncate">{sub.title}</span>
                            {sub.badge && (
                              <span className={`px-1.5 py-0.2 rounded text-[8px] font-bold border ${
                                isDark 
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
                                  : 'bg-amber-200/80 text-[#5c2405] border-amber-400/60'
                              }`}>
                                {sub.badge}
                              </span>
                            )}
                          </div>
                          <p className={`text-[11px] font-serif line-clamp-2 mt-0.5 pl-3 ${
                            isDark ? 'text-gray-400' : 'text-[#5a4225]'
                          }`}>
                            {sub.description}
                          </p>
                        </div>
                        <ExternalLink className={`w-3.5 h-3.5 opacity-60 group-hover:opacity-100 mt-1 flex-shrink-0 ${
                          isDark ? 'text-amber-400' : 'text-amber-700'
                        }`} />
                      </button>
                    ))}

                    <div className="pt-1.5 pb-1">
                      <button
                        onClick={() => {
                          onOpenSubFeatureModal(category);
                          onClose();
                        }}
                        className={`w-full py-2 text-center text-[11px] font-cinzel font-bold rounded-xl transition-colors cursor-pointer border ${
                          isDark 
                            ? 'text-[#d4af37] border-[#d4af37]/35 hover:bg-[#d4af37]/15' 
                            : 'text-[#78350f] border-amber-400/80 bg-white/80 hover:bg-amber-100 shadow-sm'
                        }`}
                      >
                        Explore All {category.title} Details →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Drawer Footer with AI Astrologers Quick Bar */}
        <div className={`p-3.5 border-t flex items-center justify-between ${
          isDark ? 'border-[#d4af37]/25 bg-black/40' : 'border-amber-300 bg-amber-100/50'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className={`text-[11px] font-serif ${isDark ? 'text-gray-300' : 'text-[#78350f] font-semibold'}`}>
              6 Vedic AI Gurus Online
            </span>
          </div>
          <button
            onClick={() => {
              onOpenAstrologerChat();
              onClose();
            }}
            className={`text-[11px] font-cinzel font-bold hover:underline flex items-center gap-1 cursor-pointer ${
              isDark ? 'text-amber-300' : 'text-amber-800'
            }`}
          >
            <span>Start Chat</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

