import React, { useState } from 'react';
import { ThemeMode } from '../../types';
import { generateDailyRashifal, DailyRashiHoroscope } from '../../utils/astrologyEngine';
import { TAROT_DECK } from '../../data/mockData';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { 
  Sparkles, 
  Star, 
  Heart, 
  Briefcase, 
  Coins, 
  Activity, 
  Flame, 
  Layers, 
  Volume2, 
  RotateCcw, 
  CheckCircle2,
  Compass,
  Eye,
  Shuffle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RashifalTarotScreenProps {
  theme: ThemeMode;
}

export const RashifalTarotScreen: React.FC<RashifalTarotScreenProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const rashifals = generateDailyRashifal();
  const [selectedRashiIndex, setSelectedRashiIndex] = useState<number>(0);
  const [mainMode, setMainMode] = useState<'rashifal' | 'tarot'>('rashifal');
  const [timeHorizon, setTimeHorizon] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');

  // Tarot State
  const [tarotSpreadMode, setTarotSpreadMode] = useState<'single' | 'triad'>('single');
  const [drawnCards, setDrawnCards] = useState<Array<{ card: typeof TAROT_DECK[0]; position: string }>>([
    { card: TAROT_DECK[4], position: 'Daily Guidance' },
  ]);
  const [isShuffling, setIsShuffling] = useState(false);

  const currentRashi = rashifals[selectedRashiIndex];

  const handleDrawTarot = (mode: 'single' | 'triad') => {
    setIsShuffling(true);
    try {
      cosmicAudio.playFrequency(741);
    } catch {}

    setTimeout(() => {
      setIsShuffling(false);
      const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
      if (mode === 'single') {
        setDrawnCards([{ card: shuffled[0], position: 'Daily Sovereign Oracle' }]);
      } else {
        setDrawnCards([
          { card: shuffled[0], position: '1. Past Karma (Sanchita)' },
          { card: shuffled[1 % shuffled.length], position: '2. Present Dharma (Prarabdha)' },
          { card: shuffled[2 % shuffled.length], position: '3. Future Moksha (Agami)' },
        ]);
      }
      try {
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
      } catch {}
    }, 600);
  };

  const playMantraTone = () => {
    try {
      cosmicAudio.playFrequency(528);
    } catch {}
  };

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 py-6 md:py-10">
      
      {/* Top Hero Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 text-xs font-cinzel tracking-wider text-amber-400"
          style={{
            backgroundColor: isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(197, 160, 89, 0.15)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(197, 160, 89, 0.4)',
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Daily Celestial Guidance & Occult Tarot</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-3xl-gold tracking-wide uppercase mb-2">
          Daily Rashifal & Vedic Tarot
        </h1>
        <p className={`text-xs sm:text-sm font-serif max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}>
          Personalized daily astrological horoscope for all 12 Rashis paired with quantum 78-card Tarot draws synthesizing Parashari astrology with Hermetic archetypes.
        </p>
      </div>

      {/* Main Switcher: Rashifal vs Tarot */}
      <div className="no-print flex justify-center mb-8">
        <div className={`p-1.5 rounded-2xl border inline-flex gap-1.5 shadow-md ${
          isDark 
            ? 'border-[#d4af37]/40 bg-black/60' 
            : 'border-[#c5a059]/60 bg-amber-100/50 shadow-[0_4px_20px_rgba(180,130,40,0.12)]'
        }`}>
          <button
            onClick={() => setMainMode('rashifal')}
            className={`px-6 py-2.5 rounded-xl font-cinzel text-xs font-bold transition-all cursor-pointer ${
              mainMode === 'rashifal'
                ? isDark
                  ? 'bg-maroon-gradient border border-[#d4af37] text-[#fdf2d1] shadow-md'
                  : 'bg-gradient-to-r from-[#92400e] to-[#b45309] border border-amber-500 text-white shadow-md'
                : isDark
                  ? 'text-gray-400 hover:text-amber-200'
                  : 'text-[#6b4718] hover:text-[#2a1704] hover:bg-amber-200/40'
            }`}
          >
            🌟 12 Rashi Daily Horoscope
          </button>
          <button
            onClick={() => setMainMode('tarot')}
            className={`px-6 py-2.5 rounded-xl font-cinzel text-xs font-bold transition-all cursor-pointer ${
              mainMode === 'tarot'
                ? isDark
                  ? 'bg-maroon-gradient border border-[#d4af37] text-[#fdf2d1] shadow-md'
                  : 'bg-gradient-to-r from-[#92400e] to-[#b45309] border border-amber-500 text-white shadow-md'
                : isDark
                  ? 'text-gray-400 hover:text-amber-200'
                  : 'text-[#6b4718] hover:text-[#2a1704] hover:bg-amber-200/40'
            }`}
          >
            🎴 Vedic Tarot Oracle Draw
          </button>
        </div>
      </div>

      {/* MODE 1: 12 Rashi Daily Horoscope */}
      {mainMode === 'rashifal' && (
        <div className="space-y-6 animate-fade-in">
          {/* Time Horizon Selector: Daily, Weekly, Monthly, Yearly */}
          <div className="no-print flex items-center justify-center gap-2 flex-wrap">
            {[
              { id: 'daily', label: 'दैनिक राशिफल (Daily)' },
              { id: 'weekly', label: 'साप्ताहिक राशिफल (Weekly)' },
              { id: 'monthly', label: 'मासिक राशिफल (Monthly)' },
              { id: 'yearly', label: 'वार्षिक राशिफल (Yearly 2026-2027)' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setTimeHorizon(tab.id as any);
                  try { cosmicAudio.playFrequency(528); } catch {}
                }}
                className={`px-4 py-1.5 rounded-full font-cinzel text-xs font-bold transition-all cursor-pointer ${
                  timeHorizon === tab.id
                    ? isDark
                      ? 'bg-gold-gradient text-gray-900 shadow-md font-extrabold'
                      : 'bg-gradient-to-r from-[#b45309] to-[#d97706] text-white shadow-md font-extrabold'
                    : isDark
                      ? 'border border-[#d4af37]/30 text-amber-200 hover:bg-[#d4af37]/10'
                      : 'border border-[#c5a059]/60 bg-white text-[#5c3a10] hover:bg-amber-100 shadow-sm'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 12 Rashi Quick Selector Bar */}
          <div className="no-print grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
            {rashifals.map((r, idx) => (
              <button
                key={r.signName}
                onClick={() => {
                  setSelectedRashiIndex(idx);
                  try {
                    cosmicAudio.playFrequency(432 + idx * 20);
                  } catch {}
                }}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedRashiIndex === idx
                    ? isDark
                      ? 'border-[#d4af37] bg-[#d4af37]/20 ring-2 ring-[#d4af37] scale-105 shadow-md'
                      : 'border-[#b45309] bg-amber-200/90 ring-2 ring-[#b45309] scale-105 shadow-md'
                    : isDark 
                      ? 'border-gray-800 bg-black/40 hover:border-[#d4af37]/40' 
                      : 'border-[#c5a059]/40 bg-white shadow-sm hover:border-[#b45309] hover:bg-amber-50'
                }`}
              >
                <div className={`text-[0.65rem] font-mono block font-bold ${isDark ? 'text-[#d4af37]' : 'text-[#92400e]'}`}>{idx + 1}</div>
                <div className={`text-xs font-cinzel font-bold truncate ${isDark ? 'text-white' : 'text-[#2a1704]'}`}>{r.signName}</div>
                <span className={`text-[0.55rem] font-serif block truncate ${isDark ? 'text-gray-400' : 'text-[#78350f]'}`}>{r.sanskrit.split('(')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Rashi Detail Card */}
          <div className="p-6 rounded-2xl border relative shadow-xl"
            style={{
              background: isDark 
                ? 'linear-gradient(135deg, rgba(28, 20, 38, 0.95) 0%, rgba(12, 10, 18, 0.95) 100%)' 
                : 'linear-gradient(135deg, #ffffff 0%, #fdf8ee 100%)',
              borderColor: isDark ? 'rgba(212, 175, 55, 0.45)' : 'rgba(197, 160, 89, 0.7)',
            }}
          >
            {/* Header of Rashi */}
            <div className={`flex flex-wrap items-center justify-between gap-4 border-b pb-4 mb-6 ${
              isDark ? 'border-[#d4af37]/25' : 'border-[#c5a059]/40'
            }`}>
              <div>
                <span className={`text-xs font-mono uppercase tracking-widest block font-bold ${
                  isDark ? 'text-[#d4af37]' : 'text-[#92400e]'
                }`}>
                  Element: {currentRashi.element} • Lord: {currentRashi.rulingPlanet}
                </span>
                <h2 className={`text-2xl sm:text-3xl font-cinzel font-bold mt-1 ${
                  isDark ? 'text-3xl-gold' : 'text-[#291804]'
                }`}>
                  {currentRashi.signName} — {currentRashi.sanskrit}
                </h2>
              </div>

              {/* Cosmic Rating */}
              <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border ${
                isDark 
                  ? 'border-amber-500/30 bg-amber-500/10' 
                  : 'border-amber-400/70 bg-amber-100/80 shadow-sm'
              }`}>
                <span className={`text-xs font-cinzel font-bold ${isDark ? 'text-amber-300' : 'text-[#78350f]'}`}>Aura Rating:</span>
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(currentRashi.rating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className={`text-xs font-mono font-bold ml-1 ${isDark ? 'text-white' : 'text-[#2a1704]'}`}>{currentRashi.rating}/5.0</span>
              </div>
            </div>

            {/* 4 Predictions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Career */}
              <div className={`p-4 rounded-xl border ${
                isDark 
                  ? 'border-blue-500/30 bg-blue-950/20' 
                  : 'border-blue-300 bg-blue-50/70 shadow-sm'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-700'}`} />
                  <h4 className={`text-xs font-cinzel font-bold uppercase ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>Career & Professional Zenith</h4>
                </div>
                <p className={`text-xs font-serif leading-relaxed ${isDark ? 'text-gray-200' : 'text-[#1e293b] font-medium'}`}>
                  {currentRashi.careerOverview}
                </p>
              </div>

              {/* Love */}
              <div className={`p-4 rounded-xl border ${
                isDark 
                  ? 'border-rose-500/30 bg-rose-950/20' 
                  : 'border-rose-300 bg-rose-50/70 shadow-sm'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Heart className={`w-4 h-4 ${isDark ? 'text-rose-400' : 'text-rose-700'}`} />
                  <h4 className={`text-xs font-cinzel font-bold uppercase ${isDark ? 'text-rose-300' : 'text-rose-900'}`}>Love, Synastry & Family</h4>
                </div>
                <p className={`text-xs font-serif leading-relaxed ${isDark ? 'text-gray-200' : 'text-[#1e293b] font-medium'}`}>
                  {currentRashi.loveOverview}
                </p>
              </div>

              {/* Finance */}
              <div className={`p-4 rounded-xl border ${
                isDark 
                  ? 'border-emerald-500/30 bg-emerald-950/20' 
                  : 'border-emerald-300 bg-emerald-50/70 shadow-sm'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Coins className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
                  <h4 className={`text-xs font-cinzel font-bold uppercase ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>Wealth & Liquid Assets</h4>
                </div>
                <p className={`text-xs font-serif leading-relaxed ${isDark ? 'text-gray-200' : 'text-[#1e293b] font-medium'}`}>
                  {currentRashi.financeOverview}
                </p>
              </div>

              {/* Health */}
              <div className={`p-4 rounded-xl border ${
                isDark 
                  ? 'border-amber-500/30 bg-amber-950/20' 
                  : 'border-amber-300 bg-amber-50/70 shadow-sm'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Activity className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-700'}`} />
                  <h4 className={`text-xs font-cinzel font-bold uppercase ${isDark ? 'text-amber-300' : 'text-amber-950'}`}>Vitality & Auric Shield</h4>
                </div>
                <p className={`text-xs font-serif leading-relaxed ${isDark ? 'text-gray-200' : 'text-[#1e293b] font-medium'}`}>
                  {currentRashi.healthOverview}
                </p>
              </div>
            </div>

            {/* Lucky Parameters & Mantra Strip */}
            <div className={`p-4 rounded-xl border grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-4 ${
              isDark 
                ? 'border-[#d4af37]/30 bg-black/40' 
                : 'border-[#c5a059]/40 bg-amber-50/80 shadow-sm'
            }`}>
              <div>
                <span className={`text-[0.65rem] font-cinzel uppercase block ${isDark ? 'text-gray-400' : 'text-[#78350f] font-semibold'}`}>Lucky Number</span>
                <strong className={`text-base font-mono font-bold ${isDark ? 'text-amber-400' : 'text-[#92400e]'}`}>{currentRashi.luckyNumber}</strong>
              </div>
              <div>
                <span className={`text-[0.65rem] font-cinzel uppercase block ${isDark ? 'text-gray-400' : 'text-[#78350f] font-semibold'}`}>Lucky Color</span>
                <strong className={`text-xs font-cinzel font-bold ${isDark ? 'text-white' : 'text-[#2a1704]'}`}>{currentRashi.luckyColor}</strong>
              </div>
              <div>
                <span className={`text-[0.65rem] font-cinzel uppercase block ${isDark ? 'text-gray-400' : 'text-[#78350f] font-semibold'}`}>Shubh Window</span>
                <strong className={`text-xs font-mono font-bold ${isDark ? 'text-cyan-300' : 'text-cyan-800'}`}>{currentRashi.luckyTime}</strong>
              </div>
              <div>
                <span className={`text-[0.65rem] font-cinzel uppercase block ${isDark ? 'text-gray-400' : 'text-[#78350f] font-semibold'}`}>Auspicious Direction</span>
                <strong className={`text-xs font-cinzel font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>{currentRashi.auspiciousDirection}</strong>
              </div>
            </div>

            {/* Mantra Section */}
            <div className={`p-3.5 rounded-xl border flex flex-wrap items-center justify-between gap-3 ${
              isDark 
                ? 'border-amber-500/30 bg-amber-500/10' 
                : 'border-amber-300 bg-amber-100/70 shadow-sm'
            }`}>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <div>
                  <span className={`text-[0.65rem] font-cinzel uppercase block font-bold ${isDark ? 'text-amber-300' : 'text-[#78350f]'}`}>Daily Ruling Bija Mantra</span>
                  <div className={`text-xs font-serif font-bold ${isDark ? 'text-white' : 'text-[#2a1704]'}`}>{currentRashi.mantra}</div>
                </div>
              </div>
              <button
                onClick={playMantraTone}
                className={`px-3 py-1.5 rounded-lg border font-cinzel text-xs flex items-center gap-1.5 hover:shadow-md transition-all cursor-pointer ${
                  isDark
                    ? 'border-[#d4af37] bg-maroon-gradient text-[#fdf2d1]'
                    : 'border-amber-500 bg-gradient-to-r from-[#92400e] to-[#b45309] text-white'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Resonate Mantra (528Hz)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: Vedic Tarot Oracle Draw */}
      {mainMode === 'tarot' && (
        <div className="space-y-6 animate-fade-in">
          {/* Controls */}
          <div className={`no-print p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 shadow-md ${
            isDark 
              ? 'border-[#d4af37]/30 bg-black/60' 
              : 'border-[#c5a059]/40 bg-amber-50/80 shadow-[0_4px_20px_rgba(180,130,40,0.1)]'
          }`}>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-cinzel font-bold ${isDark ? 'text-[#d4af37]' : 'text-[#78350f]'}`}>Spread Type:</span>
              <button
                onClick={() => {
                  setTarotSpreadMode('single');
                  handleDrawTarot('single');
                }}
                className={`px-3 py-1.5 rounded-lg font-cinzel text-xs font-bold transition-all cursor-pointer ${
                  tarotSpreadMode === 'single'
                    ? isDark
                      ? 'bg-[#d4af37] text-black shadow-md'
                      : 'bg-gradient-to-r from-[#92400e] to-[#b45309] text-white shadow-md'
                    : isDark
                      ? 'border border-[#d4af37]/40 text-gray-300 hover:bg-[#d4af37]/10'
                      : 'border border-[#c5a059]/40 bg-white text-[#5c3a10] hover:bg-amber-100'
                }`}
              >
                1-Card Daily Guidance
              </button>
              <button
                onClick={() => {
                  setTarotSpreadMode('triad');
                  handleDrawTarot('triad');
                }}
                className={`px-3 py-1.5 rounded-lg font-cinzel text-xs font-bold transition-all cursor-pointer ${
                  tarotSpreadMode === 'triad'
                    ? isDark
                      ? 'bg-[#d4af37] text-black shadow-md'
                      : 'bg-gradient-to-r from-[#92400e] to-[#b45309] text-white shadow-md'
                    : isDark
                      ? 'border border-[#d4af37]/40 text-gray-300 hover:bg-[#d4af37]/10'
                      : 'border border-[#c5a059]/40 bg-white text-[#5c3a10] hover:bg-amber-100'
                }`}
              >
                3-Card Vedic Triad (Karma-Dharma-Moksha)
              </button>
            </div>

            <button
              onClick={() => handleDrawTarot(tarotSpreadMode)}
              disabled={isShuffling}
              className={`px-4 py-2 rounded-lg border font-cinzel text-xs font-bold flex items-center gap-2 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 ${
                isDark
                  ? 'bg-maroon-gradient border-[#d4af37] text-[#fdf2d1]'
                  : 'bg-gradient-to-r from-[#92400e] to-[#b45309] border-amber-500 text-white'
              }`}
            >
              <Shuffle className={`w-3.5 h-3.5 ${isShuffling ? 'animate-spin' : ''}`} />
              <span>{isShuffling ? 'Resonating Oracle...' : 'Shuffle & Re-Draw'}</span>
            </button>
          </div>

          {/* Cards Display Grid */}
          <div className={`grid gap-6 ${tarotSpreadMode === 'single' ? 'grid-cols-1 max-w-xl mx-auto' : 'grid-cols-1 md:grid-cols-3'}`}>
            {drawnCards.map((item, idx) => (
              <div 
                key={`${item.card.id}-${idx}`}
                className="p-5 rounded-2xl border relative overflow-hidden transition-all hover:scale-[1.02] shadow-xl"
                style={{
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(22, 16, 32, 0.95) 0%, rgba(10, 8, 15, 0.95) 100%)' 
                    : 'linear-gradient(135deg, #ffffff 0%, #fef9ee 100%)',
                  borderColor: isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(197, 160, 89, 0.65)',
                }}
              >
                {/* Position Title Badge */}
                <div className="mb-3 text-center">
                  <span className={`px-3 py-1 rounded-full text-[0.65rem] font-cinzel font-bold border uppercase tracking-widest inline-block ${
                    isDark 
                      ? 'bg-[#d4af37]/20 border-[#d4af37]/40 text-[#d4af37]' 
                      : 'bg-amber-100 border-amber-400 text-[#78350f]'
                  }`}>
                    {item.position}
                  </span>
                </div>

                {/* Card Artwork */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 border border-[#d4af37]/30 shadow-inner">
                  <img
                    src={item.card.imageUrl}
                    alt={item.card.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <div>
                      <span className="text-[0.65rem] font-mono text-cyan-300 block">{item.card.element}</span>
                      <h3 className="text-base font-cinzel font-bold text-white">{item.card.name}</h3>
                    </div>
                  </div>
                </div>

                {/* Keywords Chips */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.card.keywords.map((kw, kIdx) => (
                    <span key={kIdx} className={`px-2 py-0.5 rounded text-[0.6rem] font-mono border ${
                      isDark 
                        ? 'bg-amber-500/15 text-amber-200 border-amber-500/20' 
                        : 'bg-amber-100 text-[#78350f] border-amber-300 font-semibold'
                    }`}>
                      {kw}
                    </span>
                  ))}
                </div>

                {/* Meaning */}
                <p className={`text-xs font-serif mb-3 leading-relaxed ${
                  isDark ? 'text-gray-200' : 'text-[#33220e] font-medium'
                }`}>
                  {item.card.quantumMeaning}
                </p>

                {/* Affirmation */}
                <div className={`p-3 rounded-lg border text-xs font-serif italic ${
                  isDark 
                    ? 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' 
                    : 'border-cyan-300 bg-cyan-50/70 text-cyan-900'
                }`}>
                  "{item.card.affirmation}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
