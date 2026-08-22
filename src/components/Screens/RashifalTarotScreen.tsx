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
        <div className="p-1 rounded-xl border border-[#d4af37]/40 bg-black/60 inline-flex gap-1 shadow-md">
          <button
            onClick={() => setMainMode('rashifal')}
            className={`px-6 py-2 rounded-lg font-cinzel text-xs font-bold transition-all cursor-pointer ${
              mainMode === 'rashifal'
                ? 'bg-maroon-gradient border border-[#d4af37] text-[#fdf2d1] shadow-md'
                : 'text-gray-400 hover:text-amber-200'
            }`}
          >
            🌟 12 Rashi Daily Horoscope
          </button>
          <button
            onClick={() => setMainMode('tarot')}
            className={`px-6 py-2 rounded-lg font-cinzel text-xs font-bold transition-all cursor-pointer ${
              mainMode === 'tarot'
                ? 'bg-maroon-gradient border border-[#d4af37] text-[#fdf2d1] shadow-md'
                : 'text-gray-400 hover:text-amber-200'
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
                    ? 'bg-gold-gradient text-gray-900 shadow-md'
                    : 'border border-[#d4af37]/30 text-amber-200 hover:bg-[#d4af37]/10'
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
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedRashiIndex === idx
                    ? 'border-[#d4af37] bg-[#d4af37]/20 ring-2 ring-[#d4af37] scale-105 shadow-md'
                    : isDark ? 'border-gray-800 bg-black/40 hover:border-[#d4af37]/40' : 'border-[#c5a059]/30 bg-white hover:border-[#c5a059]'
                }`}
              >
                <div className="text-[0.65rem] font-mono text-[#d4af37] block font-bold">{idx + 1}</div>
                <div className="text-xs font-cinzel font-bold text-white truncate">{r.signName}</div>
                <span className="text-[0.55rem] font-serif text-gray-400 block truncate">{r.sanskrit.split('(')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Rashi Detail Card */}
          <div className="p-6 rounded-2xl border relative shadow-xl"
            style={{
              background: isDark 
                ? 'linear-gradient(135deg, rgba(28, 20, 38, 0.95) 0%, rgba(12, 10, 18, 0.95) 100%)' 
                : 'linear-gradient(135deg, #fffdf8 0%, #fdf8ed 100%)',
              borderColor: isDark ? 'rgba(212, 175, 55, 0.45)' : 'rgba(197, 160, 89, 0.6)',
            }}
          >
            {/* Header of Rashi */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d4af37]/25 pb-4 mb-6">
              <div>
                <span className="text-xs font-mono text-[#d4af37] uppercase tracking-widest block font-bold">
                  Element: {currentRashi.element} • Lord: {currentRashi.rulingPlanet}
                </span>
                <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-3xl-gold mt-1">
                  {currentRashi.signName} — {currentRashi.sanskrit}
                </h2>
              </div>

              {/* Cosmic Rating */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10">
                <span className="text-xs font-cinzel text-amber-300 font-bold">Aura Rating:</span>
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(currentRashi.rating) ? 'fill-amber-400' : 'text-gray-600'}`} />
                  ))}
                </div>
                <span className="text-xs font-mono text-white font-bold ml-1">{currentRashi.rating}/5.0</span>
              </div>
            </div>

            {/* 4 Predictions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Career */}
              <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  <h4 className="text-xs font-cinzel font-bold text-blue-300 uppercase">Career & Professional Zenith</h4>
                </div>
                <p className="text-xs font-serif text-gray-200 leading-relaxed">
                  {currentRashi.careerOverview}
                </p>
              </div>

              {/* Love */}
              <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-rose-400" />
                  <h4 className="text-xs font-cinzel font-bold text-rose-300 uppercase">Love, Synastry & Family</h4>
                </div>
                <p className="text-xs font-serif text-gray-200 leading-relaxed">
                  {currentRashi.loveOverview}
                </p>
              </div>

              {/* Finance */}
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-cinzel font-bold text-emerald-300 uppercase">Wealth & Liquid Assets</h4>
                </div>
                <p className="text-xs font-serif text-gray-200 leading-relaxed">
                  {currentRashi.financeOverview}
                </p>
              </div>

              {/* Health */}
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-cinzel font-bold text-amber-300 uppercase">Vitality & Auric Shield</h4>
                </div>
                <p className="text-xs font-serif text-gray-200 leading-relaxed">
                  {currentRashi.healthOverview}
                </p>
              </div>
            </div>

            {/* Lucky Parameters & Mantra Strip */}
            <div className="p-4 rounded-xl border border-[#d4af37]/30 bg-black/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-4">
              <div>
                <span className="text-[0.65rem] font-cinzel uppercase text-gray-400 block">Lucky Number</span>
                <strong className="text-base font-mono text-amber-400">{currentRashi.luckyNumber}</strong>
              </div>
              <div>
                <span className="text-[0.65rem] font-cinzel uppercase text-gray-400 block">Lucky Color</span>
                <strong className="text-xs font-cinzel text-white">{currentRashi.luckyColor}</strong>
              </div>
              <div>
                <span className="text-[0.65rem] font-cinzel uppercase text-gray-400 block">Shubh Window</span>
                <strong className="text-xs font-mono text-cyan-300">{currentRashi.luckyTime}</strong>
              </div>
              <div>
                <span className="text-[0.65rem] font-cinzel uppercase text-gray-400 block">Auspicious Direction</span>
                <strong className="text-xs font-cinzel text-emerald-300">{currentRashi.auspiciousDirection}</strong>
              </div>
            </div>

            {/* Mantra Section */}
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <span className="text-[0.65rem] font-cinzel uppercase text-amber-300 block font-bold">Daily Ruling Bija Mantra</span>
                  <div className="text-xs font-serif text-white font-bold">{currentRashi.mantra}</div>
                </div>
              </div>
              <button
                onClick={playMantraTone}
                className="px-3 py-1.5 rounded-lg border border-[#d4af37] bg-maroon-gradient text-[#fdf2d1] font-cinzel text-xs flex items-center gap-1.5 hover:shadow-md transition-all cursor-pointer"
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
          <div className="no-print p-4 rounded-xl border border-[#d4af37]/30 bg-black/60 flex flex-wrap items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <span className="text-xs font-cinzel text-[#d4af37] font-bold">Spread Type:</span>
              <button
                onClick={() => {
                  setTarotSpreadMode('single');
                  handleDrawTarot('single');
                }}
                className={`px-3 py-1.5 rounded-lg font-cinzel text-xs font-bold transition-all cursor-pointer ${
                  tarotSpreadMode === 'single'
                    ? 'bg-[#d4af37] text-black shadow-md'
                    : 'border border-[#d4af37]/40 text-gray-300 hover:bg-[#d4af37]/10'
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
                    ? 'bg-[#d4af37] text-black shadow-md'
                    : 'border border-[#d4af37]/40 text-gray-300 hover:bg-[#d4af37]/10'
                }`}
              >
                3-Card Vedic Triad (Karma-Dharma-Moksha)
              </button>
            </div>

            <button
              onClick={() => handleDrawTarot(tarotSpreadMode)}
              disabled={isShuffling}
              className="px-4 py-2 rounded-lg bg-maroon-gradient border border-[#d4af37] text-[#fdf2d1] font-cinzel text-xs font-bold flex items-center gap-2 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
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
                    : 'linear-gradient(135deg, #fffdf8 0%, #fdf5ea 100%)',
                  borderColor: isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(197, 160, 89, 0.6)',
                }}
              >
                {/* Position Title Badge */}
                <div className="mb-3 text-center">
                  <span className="px-3 py-1 rounded-full text-[0.65rem] font-cinzel font-bold bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] uppercase tracking-widest inline-block">
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
                    <span key={kIdx} className="px-2 py-0.5 rounded text-[0.6rem] font-mono bg-amber-500/15 text-amber-200 border border-amber-500/20">
                      {kw}
                    </span>
                  ))}
                </div>

                {/* Meaning */}
                <p className="text-xs font-serif text-gray-200 mb-3 leading-relaxed">
                  {item.card.quantumMeaning}
                </p>

                {/* Affirmation */}
                <div className="p-3 rounded-lg border border-cyan-500/30 bg-cyan-950/20 text-xs font-serif text-cyan-200 italic">
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
