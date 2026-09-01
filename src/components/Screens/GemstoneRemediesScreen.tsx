import React, { useState } from 'react';
import { ThemeMode, UserProfile } from '../../types';
import { getGemstoneRecommendations, GemstoneRecommendation } from '../../utils/astrologyEngine';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { 
  Sparkles, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Flame, 
  Info, 
  Layers, 
  Check, 
  Gem,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GemstoneRemediesScreenProps {
  theme: ThemeMode;
  user: UserProfile;
}

export const GemstoneRemediesScreen: React.FC<GemstoneRemediesScreenProps> = ({ theme, user }) => {
  const isDark = theme === 'dark';

  const [selectedLagna, setSelectedLagna] = useState('Leo (Simha)');
  const [selectedMoonRashi, setSelectedMoonRashi] = useState('Taurus (Vrishabha)');
  const [selectedGemIndex, setSelectedGemIndex] = useState(0);
  const [isPlayingMantra, setIsPlayingMantra] = useState(false);

  const ALL_RASHIS = [
    'Aries (Mesha)', 'Taurus (Vrishabha)', 'Gemini (Mithuna)', 'Cancer (Karka)',
    'Leo (Simha)', 'Virgo (Kanya)', 'Libra (Tula)', 'Scorpio (Vrischika)',
    'Sagittarius (Dhanu)', 'Capricorn (Makara)', 'Aquarius (Kumbha)', 'Pisces (Meena)'
  ];

  const recommendations = getGemstoneRecommendations(selectedLagna, selectedMoonRashi);
  const activeGem = recommendations[selectedGemIndex] || recommendations[0];

  const handlePlayMantra = () => {
    if (isPlayingMantra) {
      cosmicAudio.stop();
      setIsPlayingMantra(false);
    } else {
      // Play high 528Hz harmonic tone for gemstone bio-resonance
      cosmicAudio.playFrequency(528);
      setIsPlayingMantra(true);
      confetti({
        particleCount: 35,
        spread: 45,
        origin: { y: 0.7 },
        colors: ['#d4af37', '#eab308', '#ffffff'],
      });
    }
  };

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 text-xs font-cinzel tracking-widest uppercase"
          style={{
            backgroundColor: isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(245, 238, 218, 0.8)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(197, 160, 89, 0.5)',
            color: '#d4af37',
          }}
        >
          <Gem className="w-3.5 h-3.5" />
          <span>Vedic Ratna Shastra & Bio-Energetic Gemology</span>
        </div>

        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold tracking-wide uppercase ${
          isDark ? 'text-gold-gradient text-3d-gold' : 'text-[#3b2b0a] text-3d-celestial'
        }`}>
          Prescriptive Gemstone & Crystal Therapy
        </h1>

        <p className={`text-sm font-serif max-w-2xl mx-auto mt-2 ${
          isDark ? 'text-gray-300' : 'text-[#5a4313]'
        }`}>
          Vedic remedial gemstones, auspicious metals, activating Bija mantras, and finger alignments tailored to your Kundli.
        </p>
      </div>

      {/* Dynamic Kundli Sign Customizer */}
      <div className={`p-4 sm:p-6 rounded-2xl border mb-8 flex flex-col md:flex-row items-center justify-between gap-4 transition-all ${
        isDark ? 'glassmorphism-dark border-[#d4af37]/40 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/50 shadow-md'
      }`}>
        <div className="w-full md:w-1/2">
          <label className="block text-xs font-cinzel font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">
            1. Select Your Ascendant / Lagna Rashi (लग्न राशि):
          </label>
          <select
            value={selectedLagna}
            onChange={(e) => {
              setSelectedLagna(e.target.value);
              setSelectedGemIndex(0);
            }}
            className={`w-full p-2.5 rounded-xl border text-xs font-cinzel font-bold transition-all ${
              isDark 
                ? 'bg-black/80 border-[#d4af37]/40 text-amber-200 focus:border-[#ffd700]' 
                : 'bg-white border-[#c5a059]/60 text-[#3b2b0a] focus:border-[#c5a059]'
            }`}
          >
            {ALL_RASHIS.map((r) => (
              <option key={r} value={r} className="bg-slate-900 text-amber-200">{r}</option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/2">
          <label className="block text-xs font-cinzel font-bold text-[#d4af37] mb-1.5 uppercase tracking-wider">
            2. Select Your Janma Moon Rashi (चन्द्र राशि):
          </label>
          <select
            value={selectedMoonRashi}
            onChange={(e) => {
              setSelectedMoonRashi(e.target.value);
              setSelectedGemIndex(0);
            }}
            className={`w-full p-2.5 rounded-xl border text-xs font-cinzel font-bold transition-all ${
              isDark 
                ? 'bg-black/80 border-[#d4af37]/40 text-amber-200 focus:border-[#ffd700]' 
                : 'bg-white border-[#c5a059]/60 text-[#3b2b0a] focus:border-[#c5a059]'
            }`}
          >
            {ALL_RASHIS.map((r) => (
              <option key={r} value={r} className="bg-slate-900 text-amber-200">{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Gemstone Type Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {recommendations.map((gem, idx) => (
          <button
            key={gem.type}
            onClick={() => {
              setSelectedGemIndex(idx);
              if (isPlayingMantra) {
                cosmicAudio.stop();
                setIsPlayingMantra(false);
              }
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-cinzel font-bold transition-all cursor-pointer flex items-center gap-2 ${
              selectedGemIndex === idx
                ? isDark
                  ? 'bg-gold-gradient-btn text-black shadow-gold-intense'
                  : 'bg-[#c5a059] text-white shadow-md'
                : isDark
                  ? 'bg-black/40 text-gray-300 border border-[#d4af37]/30 hover:border-[#d4af37]'
                  : 'bg-white text-[#5a4313] border border-[#c5a059]/40 hover:bg-amber-50'
            }`}
          >
            <span
              className="w-3 h-3 rounded-full border border-black/30 shadow-sm"
              style={{ backgroundColor: gem.colorHex }}
            />
            <span>{gem.type}</span>
          </button>
        ))}
      </div>

      {/* Main Active Gemstone Showcase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Left: Gemstone Visual & Planetary Lord (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className={`p-6 rounded-2xl border flex-1 flex flex-col items-center justify-between text-center transition-all ${
            isDark ? 'glassmorphism-dark border-[#d4af37]/45 text-gray-200 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/60 text-[#3b2b0a] shadow-lg'
          }`}>
            <span className="text-[0.65rem] font-cinzel text-[#d4af37] uppercase tracking-widest block mb-2">
              {activeGem.type}
            </span>

            {/* Glowing Gem Graphic Container */}
            <div className="relative my-6 flex items-center justify-center">
              <div
                className="w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center shadow-2xl relative"
                style={{
                  borderColor: activeGem.colorHex,
                  boxShadow: `0 0 35px ${activeGem.colorHex}66, inset 0 0 20px ${activeGem.colorHex}33`,
                  backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.9)',
                }}
              >
                <Gem className="w-16 h-16 animate-pulse" style={{ color: activeGem.colorHex }} />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-cinzel font-bold text-gold-gradient">
                {activeGem.primaryGem}
              </h2>
              <span className="text-sm font-serif text-[#d4af37] font-semibold block mt-0.5">
                {activeGem.hindiName}
              </span>
              <span className="text-xs font-serif text-gray-400 mt-1 block">
                Substitute (Upratna): {activeGem.substituteGem}
              </span>
            </div>

            <div className="w-full pt-4 mt-4 border-t border-[#d4af37]/20 flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400">Ruling Planet:</span>
              <span className="text-[#d4af37] font-bold">{activeGem.rulingPlanet}</span>
            </div>
          </div>
        </div>

        {/* Right: Prescriptive Wearing Rules & Benefits (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Rules & Rituals */}
          <div className={`p-6 rounded-2xl border transition-all ${
            isDark ? 'glassmorphism-dark border-[#d4af37]/40 text-gray-200' : 'glassmorphism-light border-[#c5a059]/50 text-[#3b2b0a]'
          }`}>
            <h3 className="text-xs font-cinzel font-bold uppercase tracking-wider text-[#d4af37] mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Vedic Wearing Protocol & Energization</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              <div className={`p-3 rounded-xl border text-center ${
                isDark ? 'bg-black/40 border-[#d4af37]/20' : 'bg-white/80 border-[#c5a059]/30'
              }`}>
                <span className="text-[0.62rem] font-cinzel text-gray-400 block">Recommended Metal</span>
                <span className="text-xs font-serif font-bold text-[#d4af37]">{activeGem.metal}</span>
              </div>

              <div className={`p-3 rounded-xl border text-center ${
                isDark ? 'bg-black/40 border-[#d4af37]/20' : 'bg-white/80 border-[#c5a059]/30'
              }`}>
                <span className="text-[0.62rem] font-cinzel text-gray-400 block">Auspicious Finger</span>
                <span className="text-xs font-serif font-bold text-white">{activeGem.finger}</span>
              </div>

              <div className={`p-3 rounded-xl border text-center col-span-2 sm:col-span-1 ${
                isDark ? 'bg-black/40 border-[#d4af37]/20' : 'bg-white/80 border-[#c5a059]/30'
              }`}>
                <span className="text-[0.62rem] font-cinzel text-gray-400 block">Auspicious Day</span>
                <span className="text-xs font-serif font-bold text-amber-300">{activeGem.dayToWear}</span>
              </div>
            </div>

            {/* Bija Mantra Banner & Audio Resonance */}
            <div className={`p-4 rounded-xl border flex flex-col justify-between gap-3 ${
              isDark ? 'bg-black/50 border-[#d4af37]/30' : 'bg-amber-50/90 border-[#c5a059]/40'
            }`}>
              <div>
                <span className="text-[0.65rem] font-cinzel text-[#d4af37] font-semibold uppercase block mb-1">
                  Energizing Bija Mantra (108 Recitations)
                </span>
                <p className="text-xs font-serif font-bold text-amber-200/90 italic">
                  {activeGem.bijaMantra}
                </p>
              </div>

              <button
                id="gem-mantra-sound-btn"
                onClick={handlePlayMantra}
                className={`py-2 px-3 rounded-lg border text-xs font-cinzel font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isPlayingMantra
                    ? 'bg-amber-500 text-black border-amber-400 shadow-md'
                    : isDark
                    ? 'bg-[#d4af37]/15 border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/25'
                    : 'bg-white border-[#c5a059] text-[#8a6514] hover:bg-amber-100'
                }`}
              >
                {isPlayingMantra ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isPlayingMantra ? 'Stop Resonator' : 'Chant Gem Resonance (528Hz)'}</span>
              </button>
            </div>
          </div>

          {/* Benefits & Precautions */}
          <div className={`p-6 rounded-2xl border transition-all ${
            isDark ? 'glassmorphism-dark border-[#d4af37]/40 text-gray-200' : 'glassmorphism-light border-[#c5a059]/50 text-[#3b2b0a]'
          }`}>
            <h3 className="text-xs font-cinzel font-bold uppercase tracking-wider text-[#d4af37] mb-3">
              Cosmic & Physiological Benefits
            </h3>

            <ul className="space-y-2 mb-4">
              {activeGem.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs font-serif text-gray-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className={`p-3 rounded-xl border text-[0.7rem] font-serif ${
              isDark ? 'bg-rose-950/20 border-rose-500/30 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              <strong>Contraindication Warning:</strong> {activeGem.precautions}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
