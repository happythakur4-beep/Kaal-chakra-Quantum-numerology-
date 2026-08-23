import React, { useState, useEffect } from 'react';
import { TuneAndThriveCard } from '../../data/tuneAndThriveData';
import { SacredGeometryLiveCanvas } from './SacredGeometryLiveCanvas';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import {
  X,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  Activity,
  Heart,
  Brain,
  Layers,
  Copy,
  Check,
  Play,
  Pause,
  Wind,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface TuneAndThriveCardModalProps {
  card: TuneAndThriveCard | null;
  onClose: () => void;
}

export const TuneAndThriveCardModal: React.FC<TuneAndThriveCardModalProps> = ({
  card,
  onClose,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedAffirmation, setCopiedAffirmation] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale (4s)' | 'Hold (4s)' | 'Exhale (8s)'>('Inhale (4s)');
  const [breathTimer, setBreathTimer] = useState(4);
  const [isBreathPacerActive, setIsBreathPacerActive] = useState(false);

  useEffect(() => {
    if (!isBreathPacerActive) return;
    const interval = setInterval(() => {
      setBreathTimer((prev) => {
        if (prev <= 1) {
          setBreathPhase((curr) => {
            if (curr === 'Inhale (4s)') return 'Hold (4s)';
            if (curr === 'Hold (4s)') return 'Exhale (8s)';
            return 'Inhale (4s)';
          });
          return breathPhase === 'Hold (4s)' ? 8 : 4;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isBreathPacerActive, breathPhase]);

  if (!card) return null;

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      cosmicAudio.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      if (card.audioMode === 'schumann') {
        cosmicAudio.playSchumannResonance(10);
      } else if (card.audioMode === 'chord' && card.frequenciesChord) {
        cosmicAudio.playChord(card.frequenciesChord, 10);
      } else if (card.id === 'deep-sleep-chord') {
        cosmicAudio.playDeepSleepChord(10);
      } else if (card.id === 'wealth-finds-me-888') {
        cosmicAudio.playLimitlessAbundanceChord(10);
      } else {
        cosmicAudio.playTeslaFrequency(card.frequencyHz, 8);
      }

      try {
        confetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.6 },
          colors: [card.visualTheme.primaryColor, '#ffd700', '#38bdf8', '#c084fc'],
        });
      } catch {}

      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 10000);
    }
  };

  const handleCopyAffirmation = () => {
    navigator.clipboard.writeText(card.affirmation);
    setCopiedAffirmation(true);
    setTimeout(() => setCopiedAffirmation(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-[#ffd700]/40 bg-gradient-to-b from-[#130f24] via-[#090812] to-black shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {card.categoryLabel}
              </span>
              {card.highlightNumber && (
                <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-cyan-400/15 text-cyan-300 border border-cyan-400/30">
                  {card.highlightNumber}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Top Hero Layout: Sacred Canvas + Title & Tone */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Column: Live Sacred Geometry Canvas (3D Render) */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl border border-white/10 bg-black/60 shadow-inner">
                <SacredGeometryLiveCanvas
                  type={
                    card.visualTheme.orbType === 'sacred-flower'
                      ? 'flower-of-life'
                      : card.visualTheme.orbType === 'venus-rose'
                      ? 'venus-rose'
                      : card.visualTheme.orbType === 'spiral'
                      ? 'fibonacci-spiral'
                      : card.visualTheme.orbType === 'pineal'
                      ? 'pineal-dmt'
                      : card.visualTheme.orbType === 'chakras'
                      ? 'chakras'
                      : card.visualTheme.orbType === 'gold-sphere'
                      ? 'gold-sphere'
                      : 'torus-field'
                  }
                  primaryColor={card.visualTheme.primaryColor}
                  glowColor={card.visualTheme.glowColor}
                  frequencyHz={card.frequencyHz}
                  size={240}
                />

                {/* Audio Trigger Button */}
                <button
                  onClick={handleToggleAudio}
                  className={`mt-4 w-full py-3 px-4 rounded-xl font-cinzel font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg ${
                    isPlayingAudio
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                      : 'bg-gradient-to-r from-amber-500 via-purple-500 to-cyan-500 text-black hover:opacity-90 shadow-[0_0_20px_rgba(255,215,0,0.35)]'
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Synthesizing {card.frequencyHz} Hz Active (Stop)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Play {card.frequencyHz} Hz Harmonic Tone</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Titles, Quote & Metrics */}
              <div className="md:col-span-7 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                    {card.subtitle}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#fdf2d1] leading-tight">
                    {card.title}
                  </h2>
                </div>

                <div className="p-4 rounded-2xl border border-[#ffd700]/30 bg-amber-950/20 text-amber-100 italic font-serif text-sm leading-relaxed shadow-sm">
                  "{card.quote}"
                </div>

                {/* Metrics Badges */}
                {card.metrics && (
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {card.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-center"
                      >
                        <span className="text-[10px] font-mono text-gray-400 uppercase block">
                          {m.label}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#ffd700] block mt-0.5">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Description & Mechanism */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-2">
              <h4 className="text-xs font-mono text-amber-300 uppercase tracking-widest flex items-center gap-2 font-bold">
                <Layers className="w-4 h-4 text-amber-400" />
                Vibrational Transmission & Mechanism
              </h4>
              <p className="text-sm font-serif text-gray-200 leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Dual Column: Modern Science vs Ancient Vedic Cosmology */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 space-y-2">
                <h4 className="text-xs font-mono text-cyan-300 uppercase tracking-widest flex items-center gap-2 font-bold">
                  <Brain className="w-4 h-4 text-cyan-400" />
                  Modern Biophysics & Neurobiology
                </h4>
                <p className="text-xs sm:text-sm font-serif text-cyan-100/90 leading-relaxed">
                  {card.scienceInsight}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-950/20 space-y-2">
                <h4 className="text-xs font-mono text-purple-300 uppercase tracking-widest flex items-center gap-2 font-bold">
                  <Zap className="w-4 h-4 text-purple-400" />
                  Ancient Vedic & Yogic Cosmology
                </h4>
                <p className="text-xs sm:text-sm font-serif text-purple-100/90 leading-relaxed">
                  {card.vedicAncientWisdom}
                </p>
              </div>
            </div>

            {/* Somatic Vagus Nerve Breathing Pacer */}
            <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono text-emerald-300 uppercase tracking-widest flex items-center gap-2 font-bold">
                  <Wind className="w-4 h-4 text-emerald-400" />
                  Somatic Vagal Nerve Reset Protocol (4-4-8 Breath)
                </h4>
                <button
                  onClick={() => setIsBreathPacerActive(!isBreathPacerActive)}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 cursor-pointer"
                >
                  {isBreathPacerActive ? 'Stop Pacer' : 'Start 4-4-8 Pacer'}
                </button>
              </div>

              {isBreathPacerActive && (
                <div className="flex items-center justify-center gap-4 py-3 bg-black/40 rounded-xl border border-emerald-500/20">
                  <div className="text-center">
                    <span className="text-xs font-mono text-gray-400 block">Current Phase</span>
                    <span className="text-base font-cinzel font-bold text-emerald-300 block">
                      {breathPhase}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-emerald-400 flex items-center justify-center text-lg font-mono font-black text-emerald-200">
                    {breathTimer}s
                  </div>
                </div>
              )}
            </div>

            {/* Quantum Affirmation Copy Box */}
            <div className="p-5 rounded-2xl border border-[#ffd700]/40 bg-gradient-to-r from-amber-950/30 via-purple-950/30 to-black flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest block font-bold">
                  Quantum Resonant Affirmation
                </span>
                <p className="text-sm sm:text-base font-serif font-bold text-[#fdf2d1] italic">
                  "{card.affirmation}"
                </p>
              </div>

              <button
                onClick={handleCopyAffirmation}
                className="px-4 py-2.5 rounded-xl bg-[#ffd700] hover:bg-amber-400 text-black text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-all shrink-0 shadow"
              >
                {copiedAffirmation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Affirmation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
