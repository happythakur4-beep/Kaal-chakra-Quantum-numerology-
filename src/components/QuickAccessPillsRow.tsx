import React, { useRef, useState, useEffect } from 'react';
import { ScreenType, ThemeMode } from '../types';
import {
  Clock,
  Sparkles,
  Flame,
  Compass,
  Heart,
  Bot,
  BookOpen,
  Gem,
  Layers,
  Map,
  Calculator,
  Volume2,
  Zap,
  ChevronLeft,
  ChevronRight,
  Sun,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';
import { cosmicAudio } from '../utils/audioSynthesizer';

export interface QuickAccessItem {
  id: string;
  title: string;
  hindiTitle: string;
  screen: ScreenType;
  icon: React.ReactNode;
  accentColor: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
  tag?: string;
}

interface QuickAccessPillsRowProps {
  theme: ThemeMode;
  onNavigate: (screen: ScreenType) => void;
  className?: string;
}

export const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  {
    id: 'muhurat',
    title: 'Check Muhurat',
    hindiTitle: 'शुभ मुहूर्त',
    screen: 'panchang',
    icon: <Clock className="w-4 h-4 text-purple-400" />,
    accentColor: '#a855f7',
    bgLight: 'bg-purple-50 hover:bg-purple-100/90 text-purple-950',
    bgDark: 'bg-purple-950/35 hover:bg-purple-900/50 text-purple-200',
    borderLight: 'border-purple-300',
    borderDark: 'border-purple-500/40',
    tag: 'Live Choghadiya'
  },
  {
    id: 'rashifal',
    title: 'Read Rashifal',
    hindiTitle: 'दैनिक राशिफल',
    screen: 'rashifal',
    icon: <Sun className="w-4 h-4 text-amber-400" />,
    accentColor: '#f59e0b',
    bgLight: 'bg-amber-50 hover:bg-amber-100/90 text-amber-950',
    bgDark: 'bg-amber-950/35 hover:bg-amber-900/50 text-amber-200',
    borderLight: 'border-amber-300',
    borderDark: 'border-amber-500/40',
    tag: 'Today\'s Rashi'
  },
  {
    id: 'japa',
    title: 'Practice Japa',
    hindiTitle: 'जप माला साधना',
    screen: 'japa-mala',
    icon: <Flame className="w-4 h-4 text-orange-400" />,
    accentColor: '#f97316',
    bgLight: 'bg-orange-50 hover:bg-orange-100/90 text-orange-950',
    bgDark: 'bg-orange-950/35 hover:bg-orange-900/50 text-orange-200',
    borderLight: 'border-orange-300',
    borderDark: 'border-orange-500/40',
    tag: '108 Beads'
  },
  {
    id: 'kundli',
    title: 'Cast Kundli',
    hindiTitle: 'जन्म कुंडली',
    screen: 'kundli',
    icon: <Compass className="w-4 h-4 text-yellow-500" />,
    accentColor: '#eab308',
    bgLight: 'bg-yellow-50 hover:bg-yellow-100/90 text-yellow-950',
    bgDark: 'bg-yellow-950/35 hover:bg-yellow-900/50 text-yellow-200',
    borderLight: 'border-yellow-300',
    borderDark: 'border-yellow-500/40',
    tag: 'D1-D60 Varga'
  },
  {
    id: 'matching',
    title: '36 Guna Milan',
    hindiTitle: 'कुंडली मिलान',
    screen: 'matching',
    icon: <Heart className="w-4 h-4 text-rose-400" />,
    accentColor: '#f43f5e',
    bgLight: 'bg-rose-50 hover:bg-rose-100/90 text-rose-950',
    bgDark: 'bg-rose-950/35 hover:bg-rose-900/50 text-rose-200',
    borderLight: 'border-rose-300',
    borderDark: 'border-rose-500/40',
    tag: 'Ashtakoota'
  },
  {
    id: 'mentor',
    title: 'AI Daivajna Chat',
    hindiTitle: 'ऋषि परामर्श',
    screen: 'mentor',
    icon: <Bot className="w-4 h-4 text-cyan-400" />,
    accentColor: '#06b6d4',
    bgLight: 'bg-cyan-50 hover:bg-cyan-100/90 text-cyan-950',
    bgDark: 'bg-cyan-950/35 hover:bg-cyan-900/50 text-cyan-200',
    borderLight: 'border-cyan-300',
    borderDark: 'border-cyan-500/40',
    tag: '24/7 Rishi'
  },
  {
    id: 'prashnavali',
    title: 'Ask Prashnavali',
    hindiTitle: 'श्री राम शलाका',
    screen: 'prashnavali',
    icon: <BookOpen className="w-4 h-4 text-emerald-400" />,
    accentColor: '#10b981',
    bgLight: 'bg-emerald-50 hover:bg-emerald-100/90 text-emerald-950',
    bgDark: 'bg-emerald-950/35 hover:bg-emerald-900/50 text-emerald-200',
    borderLight: 'border-emerald-300',
    borderDark: 'border-emerald-500/40',
    tag: 'Chaupai Oracle'
  },
  {
    id: 'gemstones',
    title: 'Gemstone Remedies',
    hindiTitle: 'रत्न परामर्श',
    screen: 'gemstones',
    icon: <Gem className="w-4 h-4 text-blue-400" />,
    accentColor: '#3b82f6',
    bgLight: 'bg-blue-50 hover:bg-blue-100/90 text-blue-950',
    bgDark: 'bg-blue-950/35 hover:bg-blue-900/50 text-blue-200',
    borderLight: 'border-blue-300',
    borderDark: 'border-blue-500/40',
    tag: 'Navratna'
  },
  {
    id: 'lalkitab',
    title: 'Lal Kitab Upay',
    hindiTitle: 'लाल किताब उपाय',
    screen: 'lalkitab',
    icon: <Layers className="w-4 h-4 text-red-400" />,
    accentColor: '#ef4444',
    bgLight: 'bg-red-50 hover:bg-red-100/90 text-red-950',
    bgDark: 'bg-red-950/35 hover:bg-red-900/50 text-red-200',
    borderLight: 'border-red-300',
    borderDark: 'border-red-500/40',
    tag: '9 Rin Nivaran'
  },
  {
    id: 'vastu',
    title: 'MahaVastu Grid',
    hindiTitle: '16 दिशा चक्र',
    screen: 'vastu',
    icon: <Map className="w-4 h-4 text-teal-400" />,
    accentColor: '#14b8a6',
    bgLight: 'bg-teal-50 hover:bg-teal-100/90 text-teal-950',
    bgDark: 'bg-teal-950/35 hover:bg-teal-900/50 text-teal-200',
    borderLight: 'border-teal-300',
    borderDark: 'border-teal-500/40',
    tag: 'Pancha Tattva'
  },
  {
    id: 'numerology',
    title: 'Numerology & Lo Shu',
    hindiTitle: 'अंक ज्योतिष',
    screen: 'numerology',
    icon: <Calculator className="w-4 h-4 text-indigo-400" />,
    accentColor: '#6366f1',
    bgLight: 'bg-indigo-50 hover:bg-indigo-100/90 text-indigo-950',
    bgDark: 'bg-indigo-950/35 hover:bg-indigo-900/50 text-indigo-200',
    borderLight: 'border-indigo-300',
    borderDark: 'border-indigo-500/40',
    tag: 'Mulank & Lo Shu'
  },
  {
    id: 'sound-healing',
    title: 'Sound Healing',
    hindiTitle: 'नाद ध्यान',
    screen: 'sound-healing',
    icon: <Volume2 className="w-4 h-4 text-sky-400" />,
    accentColor: '#0284c7',
    bgLight: 'bg-sky-50 hover:bg-sky-100/90 text-sky-950',
    bgDark: 'bg-sky-950/35 hover:bg-sky-900/50 text-sky-200',
    borderLight: 'border-sky-300',
    borderDark: 'border-sky-500/40',
    tag: '432Hz Solfeggio'
  },
  {
    id: 'tesla-369',
    title: 'Tesla 3-6-9 Vortex',
    hindiTitle: 'कॉस्मिक 369 पोर्टल',
    screen: 'tesla-369',
    icon: <Zap className="w-4 h-4 text-fuchsia-400" />,
    accentColor: '#d946ef',
    bgLight: 'bg-fuchsia-50 hover:bg-fuchsia-100/90 text-fuchsia-950',
    bgDark: 'bg-fuchsia-950/35 hover:bg-fuchsia-900/50 text-fuchsia-200',
    borderLight: 'border-fuchsia-300',
    borderDark: 'border-fuchsia-500/40',
    tag: 'Quantum Manifest'
  }
];

export const QuickAccessPillsRow: React.FC<QuickAccessPillsRowProps> = ({
  theme,
  onNavigate,
  className = ''
}) => {
  const isDark = theme === 'dark';
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 10);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      cosmicAudio.playCosmicChime(direction === 'left' ? 480 : 528);
    }
  };

  const handlePillClick = (item: QuickAccessItem) => {
    try {
      if (item.id === 'gayatri') {
        window.dispatchEvent(new CustomEvent('play-sacred-mantra', { detail: { mantraId: 'gayatri' } }));
      } else {
        cosmicAudio.playCosmicChime(528);
      }
    } catch {}
    onNavigate(item.screen);
  };

  return (
    <div className={`w-full max-w-5xl mx-auto my-5 sm:my-6 ${className}`}>
      {/* Header with Quick Access label & Nav buttons */}
      <div className="flex items-center justify-between px-2 sm:px-4 mb-2.5">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg border flex items-center justify-center ${
            isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-800'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-cinzel font-bold tracking-wider uppercase ${
            isDark ? 'text-amber-200' : 'text-[#78350f]'
          }`}>
            Quick Access • त्वरित सेवाएँ
          </span>
          <span className={`text-[11px] font-serif hidden sm:inline ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            (Tap any card to open instantly)
          </span>
        </div>

        {/* Scroll Arrows */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            className={`p-1.5 rounded-full border transition-all cursor-pointer ${
              canScrollLeft
                ? isDark
                  ? 'bg-black/60 border-amber-500/40 text-amber-200 hover:bg-amber-500/20'
                  : 'bg-white border-amber-300 text-amber-900 hover:bg-amber-50 shadow-sm'
                : 'opacity-30 cursor-not-allowed border-transparent text-gray-500'
            }`}
            title="Scroll Left"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            className={`p-1.5 rounded-full border transition-all cursor-pointer ${
              canScrollRight
                ? isDark
                  ? 'bg-black/60 border-amber-500/40 text-amber-200 hover:bg-amber-500/20'
                  : 'bg-white border-amber-300 text-amber-900 hover:bg-amber-50 shadow-sm'
                : 'opacity-30 cursor-not-allowed border-transparent text-gray-500'
            }`}
            title="Scroll Right"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Pills Row */}
      <div className="relative group">
        {/* Left Fade Gradient Mask */}
        {canScrollLeft && (
          <div className={`absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none transition-opacity ${
            isDark 
              ? 'bg-gradient-to-r from-[#07070b] to-transparent' 
              : 'bg-gradient-to-r from-[#faf7ee] to-transparent'
          }`} />
        )}

        {/* Right Fade Gradient Mask */}
        {canScrollRight && (
          <div className={`absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none transition-opacity ${
            isDark 
              ? 'bg-gradient-to-l from-[#07070b] to-transparent' 
              : 'bg-gradient-to-l from-[#faf7ee] to-transparent'
          }`} />
        )}

        <div
          ref={scrollContainerRef}
          onScroll={checkScrollability}
          className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto py-2 px-2 sm:px-3 scroll-smooth no-scrollbar select-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {QUICK_ACCESS_ITEMS.map((item) => {
            return (
              <motion.button
                key={item.id}
                onClick={() => handlePillClick(item)}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`flex-shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border transition-all duration-200 cursor-pointer shadow-sm ${
                  isDark
                    ? `${item.bgDark} ${item.borderDark} hover:border-amber-400/80`
                    : `${item.bgLight} ${item.borderLight} hover:border-amber-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)]`
                }`}
                style={{
                  minWidth: 'fit-content'
                }}
              >
                {/* Icon with Subtle Background Glow */}
                <div 
                  className="p-1.5 rounded-xl border flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: isDark ? `${item.accentColor}18` : `${item.accentColor}15`,
                    borderColor: isDark ? `${item.accentColor}40` : `${item.accentColor}50`
                  }}
                >
                  {item.icon}
                </div>

                {/* Title and Subtitle / Hindi Label */}
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-cinzel font-bold text-xs sm:text-sm whitespace-nowrap tracking-wide">
                      {item.title}
                    </span>
                    {item.tag && (
                      <span 
                        className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full border whitespace-nowrap ${
                          isDark 
                            ? 'bg-black/50 text-gray-300 border-white/10' 
                            : 'bg-white/90 text-gray-800 border-black/10'
                        }`}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] sm:text-[11px] font-serif whitespace-nowrap ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {item.hindiTitle}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
