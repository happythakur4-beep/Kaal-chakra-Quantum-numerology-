import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sun, Flame, Wind, RotateCcw, Volume2, ShieldCheck, Heart, Radio } from 'lucide-react';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

interface GoldenLotusScaleVisualizerProps {
  positiveEnergyCount: number;
  negativeEnergyCount: number;
  onResetBalance?: () => void;
  onTransmuteAll?: () => void;
  isDark?: boolean;
}

export const GoldenLotusScaleVisualizer: React.FC<GoldenLotusScaleVisualizerProps> = ({
  positiveEnergyCount,
  negativeEnergyCount,
  onResetBalance,
  onTransmuteAll,
  isDark = true,
}) => {
  const [activeFrequency, setActiveFrequency] = useState<number>(528);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [selectedLotus, setSelectedLotus] = useState<'left' | 'right' | null>(null);

  // Compute scale tilt angle (-15 deg to +15 deg)
  // When positive > negative, positive side drops (tilt right)
  const netDiff = positiveEnergyCount - negativeEnergyCount;
  const tiltAngle = Math.max(-14, Math.min(14, netDiff * 2.2));
  const equilibriumScore = Math.round(
    Math.min(100, Math.max(10, ((positiveEnergyCount + 1) / (positiveEnergyCount + negativeEnergyCount + 2)) * 100))
  );

  const handlePlayFrequency = (hz: number) => {
    setActiveFrequency(hz);
    setIsPlayingAudio(true);
    try {
      cosmicAudio.playFrequency(hz);
    } catch {}
    setTimeout(() => setIsPlayingAudio(false), 2400);
  };

  const handleLotusClick = (side: 'left' | 'right') => {
    setSelectedLotus(side);
    try {
      cosmicAudio.playCosmicChime(side === 'right' ? 528 : 396);
      confetti({
        particleCount: side === 'right' ? 50 : 25,
        spread: 60,
        origin: { y: 0.65 },
        colors: side === 'right' ? ['#ffd700', '#f59e0b', '#ec4899', '#fbbf24'] : ['#64748b', '#94a3b8', '#a855f7']
      });
    } catch {}
  };

  return (
    <div 
      id="golden-lotus-scale-container"
      className="relative w-full rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-amber-500/40 bg-gradient-to-b from-[#140e06]/95 via-[#0b0804]/98 to-[#050302]/98 shadow-[0_0_50px_rgba(245,158,11,0.25)] overflow-hidden"
    >
      {/* Mystical Forest Ambient Lighting Glow & Soft Bokeh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header HUD Banner */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-amber-500/20 text-center md:text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-[11px] font-mono text-amber-300">
            <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>पवित्र तुला • THE CELESTIAL SCALES OF KARMIC EQUILIBRIUM</span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-400 mt-1">
            Harmonic Lotus Balance & Cosmic Alignment
          </h3>
          <p className="text-xs text-slate-300 max-w-xl mt-1">
            Inspired by the ancient golden scales resting upon sacred woodland soil, holding blooming lotuses beneath a radiant solar corona.
          </p>
        </div>

        {/* Coherence Stats Pill */}
        <div className="flex items-center gap-3 bg-black/60 px-4 py-2.5 rounded-2xl border border-amber-500/30">
          <div className="text-right">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Sattvic Coherence</div>
            <div className="text-lg font-cinzel font-bold text-amber-300">
              {equilibriumScore}%
            </div>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-amber-400/80 flex items-center justify-center bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Main Interactive Stage: The Animated Golden Balance Scale & Fluttering Butterflies */}
      <div className="relative z-10 py-8 sm:py-12 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px]">
        
        {/* Floating Radiant Solar Corona / Halo Mandala above the scale */}
        <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center mb-[-80px] sm:mb-[-100px] z-0">
          {/* Rotating Outer Sacred Halo */}
          <motion.div 
            className="absolute inset-0 rounded-full border border-dashed border-amber-400/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          {/* Glowing Solar Core */}
          <motion.div 
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-amber-400/30 via-yellow-300/40 to-orange-500/30 blur-md shadow-[0_0_60px_rgba(251,191,36,0.8)]"
            animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Inner Golden Mandala Star */}
          <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.9)]">
            <Sun className="w-10 h-10 text-amber-950 animate-spin-slow" />
          </div>
        </div>

        {/* Animated Golden Butterflies Fluttering Around */}
        <motion.div 
          className="absolute top-12 left-1/4 sm:left-1/3 pointer-events-none z-20 flex items-center gap-1 text-amber-300 text-xs font-mono drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"
          animate={{
            x: [0, 25, -15, 0],
            y: [0, -20, 10, 0],
            rotate: [0, 15, -10, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xl">🦋</span>
        </motion.div>

        <motion.div 
          className="absolute top-20 right-1/4 sm:right-1/3 pointer-events-none z-20 flex items-center gap-1 text-amber-300 text-xs font-mono drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 15, -25, 0],
            rotate: [0, -12, 10, 0]
          }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <span className="text-lg">🦋</span>
        </motion.div>

        <motion.div 
          className="absolute bottom-20 left-16 sm:left-24 pointer-events-none z-20 flex items-center gap-1 text-amber-200 text-xs font-mono drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"
          animate={{
            x: [0, 15, -10, 0],
            y: [0, -15, 5, 0],
            rotate: [0, 8, -6, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <span className="text-sm">🦋</span>
        </motion.div>

        {/* SVG Scale Structure with Physics-reactive Tilting Arm */}
        <div className="relative w-full max-w-lg h-72 sm:h-80 flex items-center justify-center z-10">
          
          {/* Central Vertical Ornate Stand & Pedestal Base */}
          <div className="absolute bottom-0 w-36 h-12 bg-gradient-to-t from-amber-900 via-amber-700 to-amber-500 rounded-t-3xl border-2 border-amber-400/80 shadow-[0_0_30px_rgba(245,158,11,0.5)] flex items-center justify-center">
            <div className="w-28 h-2 rounded-full bg-amber-950/80 border border-amber-400/40" />
          </div>

          {/* Central Pillar */}
          <div className="absolute bottom-10 w-6 h-56 bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-800 rounded-full border border-amber-300/80 shadow-lg flex flex-col justify-between items-center py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600 border border-amber-200 shadow-md" />
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 border border-amber-300/50" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-800 border border-amber-400/50" />
          </div>

          {/* Scale Apex Fulcrum Pin */}
          <div className="absolute top-6 w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-700 border-2 border-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.9)] z-30 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-amber-950" />
          </div>

          {/* Tilting Crossbar Arm */}
          <motion.div 
            className="absolute top-10 w-80 sm:w-96 h-4 bg-gradient-to-r from-amber-600 via-yellow-300 to-amber-600 rounded-full border border-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.6)] flex items-center justify-between px-2 z-20"
            style={{ transformOrigin: 'center center' }}
            animate={{ rotate: -tiltAngle }}
            transition={{ type: 'spring', stiffness: 90, damping: 14 }}
          >
            {/* Left Hook */}
            <div className="w-5 h-5 rounded-full bg-amber-400 border border-amber-200 shadow-sm" />
            {/* Center Pivot Marker */}
            <div className="w-4 h-4 rounded-full bg-amber-950" />
            {/* Right Hook */}
            <div className="w-5 h-5 rounded-full bg-amber-400 border border-amber-200 shadow-sm" />
          </motion.div>

          {/* Left Pan & Chains (Transmuted / Negative Weight Ledger) */}
          <motion.div
            className="absolute left-4 sm:left-8 top-12 flex flex-col items-center cursor-pointer group z-20"
            animate={{ y: tiltAngle * 3 }}
            transition={{ type: 'spring', stiffness: 90, damping: 14 }}
            onClick={() => handleLotusClick('left')}
          >
            {/* Dual Hanging Chains */}
            <div className="w-20 h-28 flex justify-between px-2 pointer-events-none">
              <div className="w-0.5 h-full bg-gradient-to-b from-amber-300 via-amber-600 to-amber-400 border-dashed border-l border-amber-300" />
              <div className="w-0.5 h-full bg-gradient-to-b from-amber-300 via-amber-600 to-amber-400 border-dashed border-r border-amber-300" />
            </div>

            {/* Brass Scale Pan */}
            <div className="relative w-28 sm:w-32 h-6 bg-gradient-to-b from-amber-700 via-amber-500 to-amber-900 rounded-b-full border border-amber-300/80 shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center">
              
              {/* Blooming Pink/Gold Lotus sitting gently in the Left Pan */}
              <motion.div 
                className="absolute -top-10 sm:-top-12 flex flex-col items-center group-hover:scale-110 transition-transform"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="relative">
                  {/* Glowing Lotus Petals SVG */}
                  <svg className="w-16 h-12 sm:w-20 sm:h-14 filter drop-shadow-[0_0_12px_rgba(236,72,153,0.7)]" viewBox="0 0 100 70">
                    <path d="M50 5 C35 30, 20 40, 10 55 C30 65, 70 65, 90 55 C80 40, 65 30, 50 5 Z" fill="url(#pinkLotusGradLeft)" />
                    <path d="M50 15 C40 35, 30 45, 25 55 C40 62, 60 62, 75 55 C70 45, 60 35, 50 15 Z" fill="#f472b6" opacity="0.9" />
                    <path d="M50 25 C45 38, 40 45, 38 52 C45 56, 55 56, 62 52 C60 45, 55 38, 50 25 Z" fill="#fbbf24" />
                    <defs>
                      <linearGradient id="pinkLotusGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f43f5e" />
                        <stop offset="50%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#fbbf24" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-amber-950 bg-amber-300/90 px-1.5 py-0.5 rounded-full shadow">
                    {negativeEnergyCount} Transmuted
                  </div>
                </div>
              </motion.div>
            </div>
            <span className="text-[10px] font-mono text-slate-300 mt-2 bg-black/60 px-2 py-0.5 rounded-md border border-white/10">
              Chained Friction ({negativeEnergyCount})
            </span>
          </motion.div>

          {/* Right Pan & Chains (Radiant Positive Energy / Sattvic Karma) */}
          <motion.div
            className="absolute right-4 sm:right-8 top-12 flex flex-col items-center cursor-pointer group z-20"
            animate={{ y: -tiltAngle * 3 }}
            transition={{ type: 'spring', stiffness: 90, damping: 14 }}
            onClick={() => handleLotusClick('right')}
          >
            {/* Dual Hanging Chains */}
            <div className="w-20 h-28 flex justify-between px-2 pointer-events-none">
              <div className="w-0.5 h-full bg-gradient-to-b from-amber-300 via-amber-600 to-amber-400 border-dashed border-l border-amber-300" />
              <div className="w-0.5 h-full bg-gradient-to-b from-amber-300 via-amber-600 to-amber-400 border-dashed border-r border-amber-300" />
            </div>

            {/* Brass Scale Pan */}
            <div className="relative w-28 sm:w-32 h-6 bg-gradient-to-b from-amber-700 via-amber-500 to-amber-900 rounded-b-full border border-amber-300/80 shadow-[0_0_25px_rgba(245,158,11,0.7)] flex items-center justify-center">
              
              {/* Blooming Golden/Pink Lotus sitting gently in the Right Pan */}
              <motion.div 
                className="absolute -top-10 sm:-top-12 flex flex-col items-center group-hover:scale-110 transition-transform"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <div className="relative">
                  {/* Glowing Lotus Petals SVG */}
                  <svg className="w-16 h-12 sm:w-20 sm:h-14 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.9)]" viewBox="0 0 100 70">
                    <path d="M50 5 C35 30, 20 40, 10 55 C30 65, 70 65, 90 55 C80 40, 65 30, 50 5 Z" fill="url(#goldLotusGradRight)" />
                    <path d="M50 15 C40 35, 30 45, 25 55 C40 62, 60 62, 75 55 C70 45, 60 35, 50 15 Z" fill="#fbbf24" opacity="0.9" />
                    <path d="M50 25 C45 38, 40 45, 38 52 C45 56, 55 56, 62 52 C60 45, 55 38, 50 25 Z" fill="#fef08a" />
                    <defs>
                      <linearGradient id="goldLotusGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#fef08a" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-amber-950 bg-yellow-300/90 px-1.5 py-0.5 rounded-full shadow">
                    +{positiveEnergyCount} Punya
                  </div>
                </div>
              </motion.div>
            </div>
            <span className="text-[10px] font-mono text-amber-300 font-bold mt-2 bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-500/30 shadow">
              Radiant Lotus (+{positiveEnergyCount})
            </span>
          </motion.div>

        </div>

        {/* Dynamic Status Feedback */}
        <p className="text-xs font-mono text-center text-amber-200/80 mt-6 max-w-md">
          {netDiff > 0 ? (
            <span className="text-emerald-400 font-bold">
              ✨ Positive Resonance Dominates (+{netDiff}): The Golden Lotus tilts gracefully in your favor.
            </span>
          ) : netDiff < 0 ? (
            <span className="text-amber-400 font-bold">
              ⚡ Negative Friction Detected ({netDiff}): Click any Negative trait below to transmute it into golden virtue.
            </span>
          ) : (
            <span className="text-yellow-300 font-bold">
              ⚖️ Perfect Cosmic Equilibrium: Both lotus pans rest in harmonic balance.
            </span>
          )}
        </p>
      </div>

      {/* Harmonic Solfeggio Tuner Quick Bar */}
      <div className="relative z-10 pt-4 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-amber-400" />
            <span>Harmonic Resonators:</span>
          </span>
          {[
            { hz: 396, label: '396Hz Dissolve Fear' },
            { hz: 528, label: '528Hz DNA Harmony' },
            { hz: 639, label: '639Hz Pure Love' },
            { hz: 963, label: '963Hz Divine Crown' }
          ].map(f => (
            <button
              key={f.hz}
              onClick={() => handlePlayFrequency(f.hz)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                activeFrequency === f.hz
                  ? 'bg-amber-500 text-black font-bold shadow-[0_0_12px_rgba(245,158,11,0.6)]'
                  : 'bg-black/40 text-amber-200 hover:bg-black/60 border border-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Transmute All / Reset Action */}
        <div className="flex items-center gap-2">
          {onTransmuteAll && (
            <button
              onClick={onTransmuteAll}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black text-xs font-cinzel font-bold shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Transmute All to Positive</span>
            </button>
          )}
          {onResetBalance && (
            <button
              onClick={onResetBalance}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
              title="Reset Scales"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
