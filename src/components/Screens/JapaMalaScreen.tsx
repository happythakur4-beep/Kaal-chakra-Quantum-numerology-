import React, { useState, useEffect, useRef } from 'react';
import { ThemeMode } from '../../types';
import { SACRED_MANTRAS_DB, JapaMantraInfo } from '../../utils/astrologyEngine';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import {
  Sparkles,
  Flame,
  Volume2,
  VolumeX,
  RotateCcw,
  Play,
  Pause,
  Crown,
  CheckCircle2,
  Layers,
  Heart,
  ShieldCheck,
  Disc,
  Award,
  Music,
  Sun
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface JapaMalaScreenProps {
  theme: ThemeMode;
}

export const JapaMalaScreen: React.FC<JapaMalaScreenProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [selectedMantra, setSelectedMantra] = useState<JapaMantraInfo>(SACRED_MANTRAS_DB[0]);
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [completedRounds, setCompletedRounds] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isAutoChanting, setIsAutoChanting] = useState<boolean>(false);
  const [isPlayingAudioChant, setIsPlayingAudioChant] = useState<boolean>(false);
  const audioChantRef = useRef<HTMLAudioElement | null>(null);

  // Stop chant on unmount or mantra change
  useEffect(() => {
    return () => {
      cosmicAudio.stopVocalChanting();
    };
  }, []);

  const handleToggleAudioChant = () => {
    if (isPlayingAudioChant) {
      cosmicAudio.stopVocalChanting();
      setIsPlayingAudioChant(false);
    } else {
      setIsPlayingAudioChant(true);
      window.dispatchEvent(new CustomEvent('play-sacred-mantra', { detail: { mantraId: selectedMantra.id } }));
    }
  };

  // Sound trigger on bead tap
  const handleBeadTap = () => {
    const nextCount = currentCount + 1;
    if (soundEnabled && !isPlayingAudioChant) {
      try {
        cosmicAudio.playFrequency(selectedMantra.frequencyHz || 432);
      } catch {}
    }

    if (nextCount >= 108) {
      setCurrentCount(0);
      setCompletedRounds(prev => prev + 1);
      try {
        confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
      } catch {}
    } else {
      setCurrentCount(nextCount);
    }
  };

  const handleReset = () => {
    setCurrentCount(0);
    setCompletedRounds(0);
    setIsAutoChanting(false);
  };

  // Auto-chanting loop
  useEffect(() => {
    let timer: any;
    if (isAutoChanting) {
      timer = setInterval(() => {
        handleBeadTap();
      }, 1400);
    }
    return () => clearInterval(timer);
  }, [isAutoChanting, currentCount, soundEnabled, selectedMantra]);

  // Keyboard shortcut: Spacebar chants
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
        handleBeadTap();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCount, soundEnabled, selectedMantra]);

  const progressPercentage = Math.round((currentCount / 108) * 100);

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 py-6 md:py-10">
      
      {/* Light Theme Photo Background for JapaMala */}
      {!isDark && (
        <div 
          className="fixed inset-0 z-[-1] opacity-20 mix-blend-multiply bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=2000&auto=format&fit=crop')` }} // Zen meditation / Lotus
        />
      )}

      {/* Top Hero */}
      <div className="text-center mb-8">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 text-xs font-cinzel tracking-wider text-[#d4af37]"
          style={{
            backgroundColor: isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(197, 160, 89, 0.15)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(197, 160, 89, 0.4)',
          }}
        >
          <Disc className="w-3.5 h-3.5" />
          <span>Vedic 108 Bead Japa Sadhana & Planetary Mantras</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-3xl-gold tracking-wide uppercase mb-2">
          Mantra Japa Mala & Chanting Counter
        </h1>
        <p className={`text-xs sm:text-sm font-serif max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}>
          Immerse in sacred sound vibrations (Nada Brahma). Track 108 beads, pacify planetary afflictions, and cultivate divine peace.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Mantra Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-cinzel font-bold text-[#d4af37] uppercase tracking-wider mb-2">
            Select Sacred Mantra:
          </div>
          <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
            {SACRED_MANTRAS_DB.map(m => {
              const isSelected = selectedMantra.id === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMantra(m);
                    setCurrentCount(0);
                  }}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#d4af37]/20 border-[#d4af37] text-amber-100 shadow-md scale-[1.01]'
                      : 'bg-black/30 border-white/10 text-gray-400 hover:border-[#d4af37]/40 hover:text-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-cinzel text-xs font-bold truncate text-amber-200">{m.name}</span>
                    <span className="text-[10px] font-mono text-[#d4af37]">{m.frequencyHz} Hz</span>
                  </div>
                  <div className="text-[11px] font-serif text-gray-300 truncate">{m.deity}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center & Right: Interactive Japa Counter & Details */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Mantra Box */}
          <div
            className="p-6 rounded-2xl border shadow-xl text-center relative overflow-hidden"
            style={{
              backgroundColor: isDark ? 'rgba(18, 18, 28, 0.9)' : 'rgba(255, 252, 245, 0.95)',
              borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.5)',
            }}
          >
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#d4af37]/30 pb-3 mb-4">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40">
                {selectedMantra.category}
              </span>
              <div className="flex items-center gap-3 text-xs font-serif text-amber-200">
                <span>Mala: <strong className="text-white">{selectedMantra.malaType}</strong></span>
                <span>Best Time: <strong className="text-white">{selectedMantra.bestTime}</strong></span>
              </div>
            </div>

            {/* Sacred Sanskrit Text */}
            <div className="py-4 px-2 my-2 bg-black/40 rounded-xl border border-[#d4af37]/30">
              <div className="text-lg sm:text-xl font-serif font-bold text-3xl-gold leading-relaxed mb-2">
                {selectedMantra.sanskrit}
              </div>
              <div className="text-xs font-serif italic text-amber-100/80">
                {selectedMantra.transliteration}
              </div>
            </div>

            {/* Circular Counter Bead Display */}
            <div className="my-6 flex flex-col items-center justify-center">
              <button
                onClick={handleBeadTap}
                className="w-44 h-44 rounded-full border-4 border-[#d4af37] bg-black/60 shadow-2xl flex flex-col items-center justify-center transition-all transform active:scale-95 hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] cursor-pointer group relative"
              >
                {/* Visual Bead Ring */}
                <div className="text-[10px] font-cinzel tracking-widest text-gray-400 uppercase mb-1">
                  TAP OR PRESS SPACE
                </div>
                <div className="text-5xl font-cinzel font-black text-3xl-gold my-0.5">
                  {currentCount}
                </div>
                <div className="text-xs font-mono text-[#d4af37]">
                  of 108 Beads
                </div>

                {/* Circular ring indicator */}
                <div 
                  className="absolute inset-0 rounded-full border-4 border-amber-400 opacity-20 group-hover:opacity-40 animate-pulse pointer-events-none"
                />
              </button>

              {/* Progress Bar */}
              <div className="w-full max-w-md mt-4">
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                  <span>Progress: {progressPercentage}%</span>
                  <span className="text-[#d4af37] font-bold">Mala Rounds: {completedRounds}</span>
                </div>
                <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden border border-white/10">
                  <div
                    className="bg-gold-gradient h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-center flex-wrap gap-3 pt-2">
              <button
                onClick={handleToggleAudioChant}
                className={`px-4 py-2 rounded-lg font-cinzel text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                  isPlayingAudioChant
                    ? 'bg-amber-500 text-black shadow-amber-500/40 animate-pulse'
                    : 'bg-amber-950/80 text-amber-300 border border-amber-500/50 hover:bg-amber-900/90'
                }`}
                title="Play authentic mantra vocal chanting audio"
              >
                {isPlayingAudioChant ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlayingAudioChant ? 'Pause Audio Chant' : 'Play Real Chant Audio (ध्वनि)'}</span>
              </button>

              <button
                onClick={() => setIsAutoChanting(!isAutoChanting)}
                className={`px-4 py-2 rounded-lg font-cinzel text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isAutoChanting
                    ? 'bg-rose-600 text-white'
                    : 'bg-gold-gradient text-gray-900 shadow-md hover:shadow-lg'
                }`}
              >
                {isAutoChanting ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isAutoChanting ? 'Pause Auto Bead' : 'Auto Bead Mode'}</span>
              </button>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-lg border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10 transition-all cursor-pointer"
                title="Toggle Chanting Resonance"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-lg border border-white/20 text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                title="Reset Mala Count"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Benefits & Fruit of Chanting */}
            <div className="mt-6 p-3.5 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/25 text-left text-xs font-serif">
              <div className="flex items-center gap-1.5 font-cinzel font-bold text-[#d4af37] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fruit & Metaphysical Healing of {selectedMantra.name}:</span>
              </div>
              <p className="text-amber-100/90 leading-relaxed">{selectedMantra.benefits}</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
