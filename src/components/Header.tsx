import React, { useState, useEffect } from 'react';
import { ScreenType, ThemeMode, UserProfile } from '../types';
import { SRI_YANTRA_LOGO } from '../data/mockData';
import { GlobalSearchBar } from './GlobalSearchBar';
import { AstroGridTile } from '../data/astroSageDirectory';
import { 
  Home, 
  GraduationCap, 
  SlidersHorizontal,
  Info,
  Moon, 
  Sun, 
  Volume2, 
  VolumeX,
  Menu, 
  X,
  Sparkles, 
  Compass, 
  Heart, 
  Orbit, 
  Gem, 
  Bot,
  Calendar,
  BookOpen,
  Layers,
  Star,
  Calculator,
  Grid,
  Scroll,
  Baby,
  Disc,
  Radio
} from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynthesizer';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  user: UserProfile;
  onOpenReportModal: () => void;
  onOpenAstrologerChat?: (astrologerId?: string) => void;
  onOpenFeatureModal?: (gridTile: AstroGridTile) => void;
  onOpenCourse?: (courseId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  theme,
  onToggleTheme,
  user,
  onOpenReportModal,
  onOpenAstrologerChat,
  onOpenFeatureModal,
  onOpenCourse,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(cosmicAudio.getIsSoundscapeRunning());
  const isDark = theme === 'dark';

  useEffect(() => {
    const unsubscribe = cosmicAudio.subscribe((isPlaying) => {
      setIsAudioPlaying(isPlaying);
    });
    return unsubscribe;
  }, []);

  const toggleSoundscape = () => {
    cosmicAudio.toggleSoundscape();
  };

  const navItems = [
    { id: 'landing' as ScreenType, label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'mentor' as ScreenType, label: 'AI Daivajna', icon: <Bot className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'panchang' as ScreenType, label: 'Aaj Ka Panchang', icon: <Calendar className="w-3.5 h-3.5 text-amber-300" /> },
    { id: 'kundli' as ScreenType, label: 'Janam Kundli', icon: <Compass className="w-3.5 h-3.5 text-orange-300" /> },
    { id: 'rashifal' as ScreenType, label: 'Dainik Rashifal', icon: <Star className="w-3.5 h-3.5 text-yellow-300" /> },
    { id: 'matching' as ScreenType, label: 'Kundli Milan', icon: <Heart className="w-3.5 h-3.5 text-rose-400" /> },
    { id: 'numerology' as ScreenType, label: 'Ank Jyotish', icon: <Calculator className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'vastu' as ScreenType, label: 'Vastu Shastra', icon: <Grid className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'prashnavali' as ScreenType, label: 'Prashnavali', icon: <Scroll className="w-3.5 h-3.5 text-yellow-400" /> },
    { id: 'baby-names' as ScreenType, label: 'Naamkaran', icon: <Baby className="w-3.5 h-3.5 text-pink-400" /> },
    { id: 'japa-mala' as ScreenType, label: 'Japa Mala', icon: <Disc className="w-3.5 h-3.5 text-purple-400" /> },
    { id: 'lalkitab' as ScreenType, label: 'Lal Kitab', icon: <BookOpen className="w-3.5 h-3.5 text-red-400" /> },
    { id: 'kp' as ScreenType, label: 'KP Astrology', icon: <Layers className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'transits' as ScreenType, label: 'Grah Gochar', icon: <Orbit className="w-3.5 h-3.5 text-indigo-300" /> },
    { id: 'gemstones' as ScreenType, label: 'Ratna Upay', icon: <Gem className="w-3.5 h-3.5 text-emerald-300" /> },
    { id: 'practice' as ScreenType, label: 'Occult Lab', icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
    { id: 'portal' as ScreenType, label: 'Portal', icon: <Info className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className={`no-print sticky top-0 z-50 w-full transition-colors duration-300 border-b backdrop-blur-md ${
      isDark 
        ? 'bg-[#07070b]/90 border-[#d4af37]/25 shadow-[0_4px_20px_rgba(0,0,0,0.5)]' 
        : 'bg-[#faf7ee]/95 border-[#c5a059]/35 shadow-sm'
    }`}>
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-2 sm:py-3 flex items-center justify-between">
        
        {/* Left: Radiant Sacred Chakra / Sri Yantra Logo Emblem */}
        <button 
          id="header-brand-logo"
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 group text-left transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#d4af37]/20 blur-md group-hover:bg-[#d4af37]/40 transition-all" />
            <img
              src={SRI_YANTRA_LOGO}
              alt="Kaal Chakra Sacred Emblem"
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(212,175,55,0.7)] group-hover:rotate-12 transition-transform duration-500 relative z-10"
            />
          </div>
        </button>

        {/* Center: Search Bar & Navigation Capsule */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-center max-w-5xl mx-2 sm:mx-4">
          <GlobalSearchBar
            theme={theme}
            onNavigate={onNavigate}
            onOpenAstrologerChat={onOpenAstrologerChat}
            onOpenFeatureModal={onOpenFeatureModal}
            onOpenReportModal={onOpenReportModal}
            onOpenCourse={onOpenCourse}
          />

          <nav 
            className="hidden 2xl:flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] overflow-x-auto max-w-3xl"
            style={{
              backgroundColor: isDark ? 'rgba(18, 17, 26, 0.75)' : 'rgba(252, 248, 237, 0.9)',
              borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.45)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-2.5 py-1 text-xs font-serif flex items-center gap-1.5 transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? isDark
                        ? 'text-[#fdf2d1] font-semibold bg-[#d4af37]/15 rounded-full'
                        : 'text-[#3b2b0a] font-semibold bg-[#c5a059]/20 rounded-full'
                      : isDark
                        ? 'text-gray-300/80 hover:text-[#fdf2d1]'
                        : 'text-[#6a501c] hover:text-[#2d2006]'
                  }`}
                >
                  <span className={isActive ? 'text-[#d4af37]' : 'text-gray-400 group-hover:text-[#d4af37]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Action Buttons (Sign In & Get Started) + Utility Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Meditative Ambient Cosmic Soundscape Toggle */}
          <button
            id="header-cosmic-soundscape-btn"
            onClick={toggleSoundscape}
            title={isAudioPlaying ? 'Mute Ambient Cosmic Soundscape' : 'Play Ambient Meditative Cosmic Space Soundscape (108Hz / 432Hz)'}
            className={`px-2.5 py-1.5 rounded-full border text-xs transition-all flex items-center gap-1.5 cursor-pointer select-none group ${
              isAudioPlaying
                ? 'bg-gradient-to-r from-amber-500/25 via-purple-500/20 to-amber-500/25 text-amber-300 border-[#ffd700] shadow-[0_0_16px_rgba(245,158,11,0.5)]'
                : isDark
                  ? 'border-[#d4af37]/30 text-gray-300 hover:text-[#ffd700] hover:bg-white/5 hover:border-[#ffd700]/50'
                  : 'border-[#c5a059]/45 text-[#5a4313] hover:bg-amber-100/60'
            }`}
          >
            {isAudioPlaying ? (
              <div className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#ffd700] animate-pulse" />
                <div className="flex items-center gap-0.5 h-3 px-0.5">
                  <span className="w-0.5 h-2.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-0.5 h-3.5 bg-yellow-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-0.5 h-2 bg-amber-300 rounded-full animate-bounce [animation-delay:-0.45s]" />
                </div>
                <span className="hidden md:inline text-[11px] font-cinzel font-semibold text-amber-300 tracking-wider">
                  Cosmic Soundscape
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <VolumeX className="w-3.5 h-3.5 text-gray-400 group-hover:text-amber-400" />
                <span className="hidden md:inline text-[11px] font-cinzel text-gray-400 group-hover:text-gray-200">
                  Soundscape
                </span>
              </div>
            )}
          </button>

          {/* Theme Toggle (Light / Dark) */}
          <button
            id="header-theme-toggle"
            onClick={onToggleTheme}
            title={isDark ? 'Switch to Celestial Light Theme' : 'Switch to Cosmic Dark Theme'}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isDark 
                ? 'border-[#d4af37]/25 text-[#fdf2d1] hover:bg-white/10 hover:border-[#d4af37]' 
                : 'border-[#c5a059]/40 text-[#5a4313] hover:bg-amber-100/80'
            }`}
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-[#d4af37]" /> : <Moon className="w-3.5 h-3.5 text-[#8a6514]" />}
          </button>

          {/* Get Started Button */}
          <button
            id="header-cta-get-started"
            onClick={onOpenReportModal}
            className="px-3.5 sm:px-4 py-1.5 rounded-lg font-serif font-semibold text-xs text-[#2a1d04] bg-gradient-to-b from-[#fdf2d1] via-[#d4af37] to-[#b38b22] hover:from-[#fff7db] hover:to-[#c59c2e] shadow-[0_0_20px_rgba(212,175,55,0.45)] hover:shadow-[0_0_28px_rgba(212,175,55,0.7)] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5 border border-[#fff2cc]/60"
          >
            <span>Destiny Report</span>
          </button>

          {/* Mobile Drawer Hamburger */}
          <button
            id="header-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`xl:hidden p-2 rounded-lg border ${
              isDark
                ? 'border-[#d4af37]/35 text-[#d4af37] hover:bg-white/5'
                : 'border-[#c5a059]/50 text-[#8a6514] hover:bg-amber-100'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile / Tablet Drawer */}
      {mobileMenuOpen && (
        <div className={`xl:hidden border-b px-4 py-4 space-y-3 animate-in slide-in-from-top duration-300 ${
          isDark ? 'bg-[#0a0a14]/98 border-[#d4af37]/30' : 'bg-[#faf7ee]/98 border-[#c5a059]/40'
        }`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-serif flex items-center gap-2 transition-all ${
                    isActive
                      ? isDark
                        ? 'bg-[#d4af37]/20 text-[#fdf2d1] border border-[#d4af37]/60 font-bold'
                        : 'bg-[#c5a059] text-white font-bold'
                      : isDark
                        ? 'text-gray-300 bg-white/5 hover:bg-white/10'
                        : 'text-[#5a4313] bg-amber-50 hover:bg-amber-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-amber-500/20 text-xs">
            <button
              onClick={() => {
                onNavigate('portal');
                setMobileMenuOpen(false);
              }}
              className="text-gray-300 underline"
            >
              Sign In to Member Portal
            </button>
            <button
              onClick={() => {
                onOpenReportModal();
                setMobileMenuOpen(false);
              }}
              className="text-[#d4af37] font-semibold"
            >
              Unlock Destiny Report
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
