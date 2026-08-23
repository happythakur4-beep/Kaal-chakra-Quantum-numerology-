import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CelestialBodyData } from '../../types';
import { CELESTIAL_BODIES_DATA } from '../../data/teslaPortalData';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { 
  X, 
  Volume2, 
  Sparkles, 
  Orbit, 
  Compass, 
  Zap, 
  Radio, 
  ChevronRight,
  Share2,
  CheckCircle2,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CelestialDetailModalProps {
  body: CelestialBodyData | null;
  onClose: () => void;
  onSelectBody: (body: CelestialBodyData) => void;
}

export const CelestialDetailModal: React.FC<CelestialDetailModalProps> = ({
  body,
  onClose,
  onSelectBody,
}) => {
  const [isPlayingFreq, setIsPlayingFreq] = useState(false);
  const [activeTab, setActiveTab] = useState<'tesla' | 'vedic' | 'astrophysics' | 'frequency'>('tesla');
  const [copied, setCopied] = useState(false);

  if (!body) return null;

  const handlePlayFrequency = () => {
    setIsPlayingFreq(true);
    cosmicAudio.playTeslaFrequency(body.vibrationalFrequencyHz, 4);
    try {
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#22d3ee', '#ec4899', '#a855f7']
      });
    } catch {}
    setTimeout(() => setIsPlayingFreq(false), 4000);
  };

  const handleCopyAffirmation = () => {
    navigator.clipboard.writeText(`"${body.quantumAffirmation}" — 369 Tesla Portal: ${body.name}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Other related celestial bodies in the same harmonic
  const relatedBodies = CELESTIAL_BODIES_DATA.filter(
    (b) => b.id !== body.id && (b.teslaHarmonicNumber === body.teslaHarmonicNumber || b.type === body.type)
  ).slice(0, 3);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop with cosmic blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Container with Holographic Border */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-3xl rounded-3xl border border-[#ffd700]/40 overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.25)] flex flex-col max-h-[90vh]"
          style={{
            background: 'linear-gradient(145deg, rgba(14, 11, 26, 0.96) 0%, rgba(7, 8, 16, 0.98) 100%)',
          }}
        >
          {/* Top Cosmic Header & Action Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-black/40">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full animate-ping"
                style={{ backgroundColor: body.color }}
              />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                  {body.type.toUpperCase()} • TESLA HARMONIC #{body.teslaHarmonicNumber}
                </span>
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#fdf2d1] flex items-center gap-2">
                  <span>{body.name}</span>
                  {body.sanskritName && (
                    <span className="text-xs sm:text-sm font-serif text-amber-300/80 font-normal">
                      {body.sanskritName}
                    </span>
                  )}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Visual Hero Card with Rotating 3D Celestial Orb & Audio Player */}
            <div className="relative rounded-2xl p-5 border border-[#ffd700]/30 overflow-hidden bg-gradient-to-r from-black/80 via-purple-950/30 to-black/80 flex flex-col sm:flex-row items-center gap-6">
              
              {/* Dynamic Celestial Orb Simulation with Glow */}
              <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 rounded-full blur-2xl opacity-75"
                  style={{ backgroundColor: body.glowColor }}
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* The Celestial Body Sphere */}
                <motion.div
                  className="relative z-10 w-24 h-24 rounded-full border border-white/40 shadow-2xl flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: body.color,
                    boxShadow: `0 0 35px ${body.glowColor}, inset -8px -8px 20px rgba(0,0,0,0.8), inset 8px 8px 15px rgba(255,255,255,0.4)`
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                >
                  {/* Subtle surface texture bands */}
                  <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(circle_at_30%_30%,white,transparent_70%)]" />
                </motion.div>

                {/* Orbit ring indicator */}
                <div className="absolute inset-0 border border-dashed border-amber-400/40 rounded-full animate-spin-slow pointer-events-none" />
              </div>

              {/* Quick Key Metrics & Frequency Soundwave Trigger */}
              <div className="flex-1 text-center sm:text-left space-y-2.5">
                <p className="text-xs sm:text-sm font-serif text-gray-300 leading-relaxed">
                  {body.description}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  {/* Playable Frequency Button */}
                  <button
                    onClick={handlePlayFrequency}
                    className={`px-4 py-2 rounded-xl border font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      isPlayingFreq
                        ? 'bg-amber-400 text-gray-950 border-amber-300 shadow-[0_0_20px_rgba(255,215,0,0.8)] scale-105'
                        : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border-[#ffd700]/50'
                    }`}
                  >
                    <Volume2 className={`w-4 h-4 ${isPlayingFreq ? 'animate-bounce' : ''}`} />
                    <span>
                      {isPlayingFreq ? 'Playing Tone...' : `Play ${body.vibrationalFrequencyHz} Hz Tone`}
                    </span>
                  </button>

                  {/* Solfeggio / Chakra Pill */}
                  {body.solfeggioKey && (
                    <div className="px-3 py-1.5 rounded-xl bg-purple-900/40 border border-purple-400/40 text-purple-200 text-[11px] font-mono flex items-center gap-1.5">
                      <Radio className="w-3 h-3 text-purple-300" />
                      <span>{body.solfeggioKey}</span>
                    </div>
                  )}

                  {body.chakraResonance && (
                    <div className="px-3 py-1.5 rounded-xl bg-cyan-900/40 border border-cyan-400/40 text-cyan-200 text-[11px] font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-cyan-300" />
                      <span>{body.chakraResonance}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive Tabs: Tesla Insights, Vedic Cosmology, Astrophysics, Frequency Harmonics */}
            <div className="flex items-center gap-2 border-b border-gray-800 pb-2 overflow-x-auto">
              {[
                { id: 'tesla', label: '⚡ Tesla Vortex Law', icon: <Zap className="w-3.5 h-3.5" /> },
                { id: 'vedic', label: '🕉️ Vedic Graha Cosmology', icon: <Compass className="w-3.5 h-3.5" /> },
                { id: 'astrophysics', label: '🌌 Astrophysical Metrics', icon: <Orbit className="w-3.5 h-3.5" /> },
                { id: 'frequency', label: '🎼 Cosmic Octave 3-6-9', icon: <Radio className="w-3.5 h-3.5" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/60 shadow-[0_0_12px_rgba(255,215,0,0.3)]'
                      : 'text-gray-400 hover:text-gray-200 bg-white/5'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Details */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-4">
              {activeTab === 'tesla' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-amber-300 font-cinzel font-bold text-sm">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Nikola Tesla's Radiant Energy Insight</span>
                  </div>
                  <p className="text-xs sm:text-sm font-serif text-gray-200 leading-relaxed italic bg-amber-950/20 p-3.5 rounded-xl border border-amber-500/30">
                    "{body.teslaInsight}"
                  </p>
                  <div className="text-[11px] font-mono text-gray-400">
                    Tesla Harmonic Classification: <span className="text-amber-300 font-bold">Node #{body.teslaHarmonicNumber}</span> (Governing {body.teslaHarmonicNumber === 9 ? 'Apex Singularity & Zero-Point Field' : body.teslaHarmonicNumber === 6 ? 'Magnetic Equilibrium & Harmony' : 'Creative Physical Gateway'}).
                  </div>
                </div>
              )}

              {activeTab === 'vedic' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-orange-300 font-cinzel font-bold text-sm">
                    <Compass className="w-4 h-4 text-orange-400" />
                    <span>Vedic Jyotish & Sacred Cosmology</span>
                  </div>
                  <p className="text-xs sm:text-sm font-serif text-gray-200 leading-relaxed bg-orange-950/20 p-3.5 rounded-xl border border-orange-500/30">
                    {body.vedicCosmology}
                  </p>
                  {body.vedicGraha && (
                    <div className="text-[11px] font-mono text-gray-400">
                      Primary Graha / Archetype: <span className="text-orange-300 font-bold">{body.vedicGraha}</span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'astrophysics' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {body.keyFacts.map((fact, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <span className="text-[10px] font-mono text-gray-400 block uppercase">
                        {fact.label}
                      </span>
                      <span className="text-xs sm:text-sm font-mono font-bold text-amber-200 mt-1 block">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                  {body.orbitalPeriod && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <span className="text-[10px] font-mono text-gray-400 block uppercase">
                        Orbital Period
                      </span>
                      <span className="text-xs font-mono font-bold text-cyan-200 mt-1 block">
                        {body.orbitalPeriod}
                      </span>
                    </div>
                  )}
                  {body.distanceFromSun && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <span className="text-[10px] font-mono text-gray-400 block uppercase">
                        Distance / Position
                      </span>
                      <span className="text-xs font-mono font-bold text-pink-200 mt-1 block">
                        {body.distanceFromSun}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'frequency' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-cyan-300 font-cinzel font-bold text-sm">
                    <Radio className="w-4 h-4 text-cyan-400" />
                    <span>Cousto Cosmic Octave & Sound Harmonics</span>
                  </div>
                  <p className="text-xs font-serif text-gray-300 leading-relaxed">
                    Hans Cousto's Cosmic Octave calculates the fundamental vibrational pitch of celestial orbital periods octaved into human audible frequencies.
                  </p>
                  <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-cyan-200 font-bold block">
                        Calculated Harmonic Pitch: {body.vibrationalFrequencyHz} Hz
                      </span>
                      <span className="text-[11px] font-mono text-gray-400">
                        {body.solfeggioKey || 'Harmonic Planetary Octave'}
                      </span>
                    </div>
                    <button
                      onClick={handlePlayFrequency}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-mono text-xs font-bold transition-colors cursor-pointer"
                    >
                      Listen (3s)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quantum Affirmation Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-amber-950/40 border border-[#ffd700]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-mono uppercase text-amber-400 block">
                  ✨ QUANTUM AFFIRMATION
                </span>
                <p className="text-xs sm:text-sm font-serif italic text-[#fdf2d1] mt-0.5">
                  "{body.quantumAffirmation}"
                </p>
              </div>

              <button
                onClick={handleCopyAffirmation}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Key'}</span>
              </button>
            </div>

            {/* Clickable Related Harmonic Bodies */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono text-gray-400 block uppercase tracking-wider">
                🔗 Harmonic Resonance Allies (Click to Jump):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {relatedBodies.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectBody(rel)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 flex items-center justify-between text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: rel.color }}
                      />
                      <div>
                        <span className="text-xs font-cinzel font-bold text-gray-200 group-hover:text-amber-300 block">
                          {rel.name}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">
                          {rel.vibrationalFrequencyHz} Hz • #{rel.teslaHarmonicNumber}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
