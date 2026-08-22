import React, { useState } from 'react';
import { ThemeMode, TarotCard } from '../../types';
import { TAROT_DECK, SRI_YANTRA_LOGO } from '../../data/mockData';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { 
  Sparkles, 
  RotateCcw, 
  Layers, 
  Volume2, 
  VolumeX, 
  Flame, 
  Check, 
  Grid3X3, 
  Compass, 
  Radio 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuantumPracticeScreenProps {
  theme: ThemeMode;
}

export const QuantumPracticeScreen: React.FC<QuantumPracticeScreenProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  // Tarot state
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(TAROT_DECK[0]);
  const [isFlipping, setIsFlipping] = useState(false);

  // Sound generator state
  const [activeFrequency, setActiveFrequency] = useState<number>(528);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  // Name vibration calculator state
  const [practiceName, setPracticeName] = useState('Anya Sharma');

  const handleDrawTarot = () => {
    setIsFlipping(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#ffd700', '#fdf2d1'],
      });
    } catch {}

    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * TAROT_DECK.length);
      setSelectedCard(TAROT_DECK[randomIdx]);
      setIsFlipping(false);
    }, 450);
  };

  const handleFrequencyChange = (freq: number) => {
    setActiveFrequency(freq);
    if (isPlayingSound) {
      cosmicAudio.playFrequency(freq);
    }
  };

  const handleToggleSound = () => {
    if (isPlayingSound) {
      cosmicAudio.stop();
      setIsPlayingSound(false);
    } else {
      cosmicAudio.playFrequency(activeFrequency);
      setIsPlayingSound(true);
    }
  };

  // Pythagorean Calculation breakdown for practice name
  const PYTHAGOREAN_VALUES: Record<string, number> = {
    a: 1, j: 1, s: 1,
    b: 2, k: 2, t: 2,
    c: 3, l: 3, u: 3,
    d: 4, m: 4, v: 4,
    e: 5, n: 5, w: 5,
    f: 6, o: 6, x: 6,
    g: 7, p: 7, y: 7,
    h: 8, q: 8, z: 8,
    i: 9, r: 9,
  };

  const cleanLetters = practiceName.toLowerCase().replace(/[^a-z]/g, '').split('');
  const letterValues = cleanLetters.map(l => ({ char: l.toUpperCase(), val: PYTHAGOREAN_VALUES[l] || 0 }));
  const rawSum = letterValues.reduce((acc, cur) => acc + cur.val, 0);
  
  // Reduce
  let reduced = rawSum;
  while (reduced > 9 && reduced !== 11 && reduced !== 22 && reduced !== 33) {
    reduced = reduced.toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  }

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 text-xs font-cinzel tracking-widest uppercase"
          style={{
            backgroundColor: isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(245, 238, 218, 0.8)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(197, 160, 89, 0.5)',
            color: '#d4af37',
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Occult Laboratory</span>
        </div>

        <h1 className={`text-3xl sm:text-4xl font-cinzel font-bold tracking-wide uppercase ${
          isDark ? 'text-gold-gradient' : 'text-[#3b2b0a]'
        }`}>
          Quantum Practice Sanctum
        </h1>

        <p className={`text-sm font-serif max-w-2xl mx-auto mt-2 ${
          isDark ? 'text-gray-300' : 'text-[#5a4313]'
        }`}>
          Calibrate your bio-resonance frequency, analyze sacred vibrational letter codes, and draw daily Arcana keys.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (5 Cols): Daily Tarot Arcana Oracle */}
        <div className="lg:col-span-5 flex flex-col">
          <div className={`p-6 rounded-2xl border flex-1 flex flex-col justify-between transition-all ${
            isDark ? 'glassmorphism-dark text-gray-200' : 'glassmorphism-light text-[#3b2b0a]'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-cinzel font-bold flex items-center gap-2 ${
                  isDark ? 'text-[#fdf2d1]' : 'text-[#422e06]'
                }`}>
                  <Layers className="w-5 h-5 text-[#d4af37]" />
                  Quantum Arcana Transmission
                </h3>
                <span className="text-xs font-mono text-[#d4af37] px-2 py-0.5 rounded bg-[#d4af37]/15">
                  {selectedCard?.element}
                </span>
              </div>

              {/* Tarot Card Display */}
              <div className="relative my-4 flex flex-col items-center">
                <div 
                  className={`w-48 h-72 rounded-xl border-2 border-[#d4af37] overflow-hidden shadow-2xl relative transition-transform duration-500 group ${
                    isFlipping ? 'rotate-y-180 scale-95 opacity-50' : 'rotate-y-0 scale-100 opacity-100'
                  }`}
                  style={{
                    boxShadow: isDark ? '0 0 25px rgba(212, 175, 55, 0.35)' : '0 10px 25px rgba(180, 140, 50, 0.2)',
                  }}
                >
                  <img
                    src={selectedCard?.imageUrl}
                    alt={selectedCard?.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                    <span className="text-xs font-cinzel text-amber-300 font-bold">
                      {selectedCard?.name}
                    </span>
                    <span className="text-[0.65rem] text-gray-300 font-serif">
                      {selectedCard?.arcana} Arcana
                    </span>
                  </div>
                </div>

                {/* Keywords Chips */}
                <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                  {selectedCard?.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className={`text-[0.65rem] font-serif px-2 py-0.5 rounded-full border ${
                        isDark ? 'bg-black/50 border-[#d4af37]/30 text-amber-200' : 'bg-amber-100/70 border-amber-300 text-amber-900'
                      }`}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meaning & Affirmation */}
              <div className={`p-3.5 rounded-xl border mt-4 text-xs font-serif leading-relaxed ${
                isDark ? 'bg-black/40 border-[#d4af37]/20 text-gray-300' : 'bg-white/80 border-[#c5a059]/30 text-[#4d3809]'
              }`}>
                <p className="mb-2 italic">"{selectedCard?.quantumMeaning}"</p>
                <div className="text-[0.68rem] text-[#d4af37] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Affirmation: {selectedCard?.affirmation}</span>
                </div>
              </div>
            </div>

            <button
              id="practice-draw-tarot-btn"
              onClick={handleDrawTarot}
              disabled={isFlipping}
              className="w-full mt-5 py-3 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider bg-maroon-gradient border border-[#d4af37] text-[#fdf2d1] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className={`w-4 h-4 text-[#d4af37] ${isFlipping ? 'animate-spin' : ''}`} />
              <span>Draw Quantum Key</span>
            </button>
          </div>
        </div>

        {/* Right Column (7 Cols): Name Vibration Analyzer & Solfeggio Generator */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Box 1: Pythagorean Name Vibrational Analyzer */}
          <div className={`p-6 rounded-2xl border transition-all ${
            isDark ? 'glassmorphism-dark text-gray-200' : 'glassmorphism-light text-[#3b2b0a]'
          }`}>
            <h3 className={`text-lg font-cinzel font-bold mb-2 flex items-center gap-2 ${
              isDark ? 'text-[#fdf2d1]' : 'text-[#422e06]'
            }`}>
              <Compass className="w-5 h-5 text-[#d4af37]" />
              Name Vibrational Spectrum Analyzer
            </h3>
            <p className={`text-xs font-serif mb-4 ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}>
              Type any name or sacred mantra to decompose its Pythagorean letter frequencies and master summation.
            </p>

            <div className="mb-4">
              <label htmlFor="practice-name-input" className="sr-only">Practice Name</label>
              <input
                id="practice-name-input"
                type="text"
                value={practiceName}
                onChange={(e) => setPracticeName(e.target.value)}
                placeholder="Enter word or name..."
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                  isDark
                    ? 'bg-black/50 border-[#d4af37]/40 text-gray-100 focus:border-[#d4af37]'
                    : 'bg-white border-[#c5a059]/50 text-[#3b2b0a] focus:border-[#8a6514]'
                }`}
              />
            </div>

            {/* Letter Grid Breakdown */}
            <div className="flex flex-wrap gap-2 mb-4">
              {letterValues.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg border text-center min-w-[2.5rem] ${
                    isDark ? 'bg-black/40 border-[#d4af37]/30' : 'bg-white/80 border-[#c5a059]/40'
                  }`}
                >
                  <span className={`text-xs font-bold block ${isDark ? 'text-gray-200' : 'text-[#3b2b0a]'}`}>
                    {item.char}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#d4af37]">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Summary Resonance Metric */}
            <div className={`p-4 rounded-xl border flex items-center justify-between ${
              isDark ? 'bg-amber-500/10 border-[#d4af37]/40' : 'bg-amber-100/70 border-[#c5a059]'
            }`}>
              <div>
                <span className="text-xs font-cinzel font-bold block text-[#d4af37]">
                  Pythagorean Compound Energy: {rawSum}
                </span>
                <span className={`text-xs font-serif ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}>
                  Cosmic Vibration Master Frequency: <strong>Number {reduced}</strong>
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#d4af37] text-black font-cinzel font-bold flex items-center justify-center text-base shadow-md">
                {reduced}
              </div>
            </div>
          </div>

          {/* Box 2: Live Solfeggio Frequency Calibration Chamber */}
          <div className={`p-6 rounded-2xl border transition-all ${
            isDark ? 'glassmorphism-dark text-gray-200' : 'glassmorphism-light text-[#3b2b0a]'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-lg font-cinzel font-bold flex items-center gap-2 ${
                isDark ? 'text-[#fdf2d1]' : 'text-[#422e06]'
              }`}>
                <Radio className="w-5 h-5 text-[#d4af37]" />
                Solfeggio Aura Tone Chamber
              </h3>
              
              <button
                id="practice-audio-toggle-btn"
                onClick={handleToggleSound}
                className={`px-3 py-1.5 rounded-lg border text-xs font-cinzel font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isPlayingSound
                    ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.6)] animate-pulse'
                    : isDark
                      ? 'border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10'
                      : 'border-[#c5a059] text-[#8a6514] hover:bg-amber-100'
                }`}
              >
                {isPlayingSound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{isPlayingSound ? 'Oscillator Active' : 'Start Wave'}</span>
              </button>
            </div>

            <p className={`text-xs font-serif mb-4 ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}>
              Select pure geometric tone to stimulate energetic chakras and theta brainwave coherence.
            </p>

            {/* Frequency Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { freq: 432, label: '432 Hz', desc: 'Cosmic Order' },
                { freq: 528, label: '528 Hz', desc: 'Transformation' },
                { freq: 639, label: '639 Hz', desc: 'Heart Harmony' },
                { freq: 852, label: '852 Hz', desc: 'Third Eye' },
                { freq: 963, label: '963 Hz', desc: 'Crown Pineal' },
              ].map((f) => {
                const isActive = activeFrequency === f.freq;
                return (
                  <button
                    key={f.freq}
                    id={`practice-freq-${f.freq}`}
                    onClick={() => handleFrequencyChange(f.freq)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      isActive
                        ? isDark
                          ? 'bg-[#d4af37]/25 border-[#d4af37] text-white shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                          : 'bg-[#c5a059] border-[#a8823b] text-white shadow-md'
                        : isDark
                          ? 'bg-black/40 border-[#d4af37]/20 text-gray-300 hover:border-[#d4af37]/50'
                          : 'bg-white/70 border-[#c5a059]/30 text-[#422e06] hover:bg-amber-50'
                    }`}
                  >
                    <span className="text-xs font-mono font-bold block">{f.label}</span>
                    <span className="text-[0.6rem] font-serif opacity-80 block">{f.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
