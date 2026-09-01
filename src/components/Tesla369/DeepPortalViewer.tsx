import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CelestialBodyData, UserProfile } from '../../types';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { drawHighFidelityPlanet } from '../../utils/highQualityPlanetRenderer';
import { VedicCompatibilitySection } from './VedicCompatibilitySection';
import { calculateVedicPlanetCompatibility } from '../../utils/vedicCompatibilityEngine';
import {
  ChevronDown,
  ChevronUp,
  X,
  Volume2,
  VolumeX,
  Compass,
  Zap,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Radio,
  Eye,
  Disc,
  Flame,
  Globe,
  Share2,
  BookOpen,
  HeartHandshake,
  User,
} from 'lucide-react';

interface DeepPortalViewerProps {
  body: CelestialBodyData;
  allBodies: CelestialBodyData[];
  user?: UserProfile;
  initialDepth?: PortalDepth;
  onClose: () => void;
  onTravelTo: (targetBody: CelestialBodyData) => void;
}

export type PortalDepth = 1 | 2 | 3 | 4 | 5;

export const DeepPortalViewer: React.FC<DeepPortalViewerProps> = ({
  body,
  allBodies,
  user,
  initialDepth = 1,
  onClose,
  onTravelTo,
}) => {
  const [currentDepth, setCurrentDepth] = useState<PortalDepth>(initialDepth);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Calculate quick compatibility summary for header badge
  const quickCompatibility = useMemo(() => {
    return calculateVedicPlanetCompatibility(body, user);
  }, [body, user]);

  // Play planetary frequency tone
  const toggleAudio = () => {
    if (isPlayingAudio) {
      cosmicAudio.stopFrequencyTone();
      setIsPlayingAudio(false);
    } else {
      cosmicAudio.playPlanetTone(body.vibrationalFrequencyHz);
      setIsPlayingAudio(true);
    }
  };

  useEffect(() => {
    return () => {
      cosmicAudio.stopFrequencyTone();
    };
  }, []);

  const changeDepth = (newDepth: PortalDepth) => {
    if (newDepth === currentDepth) return;
    setIsTransitioning(true);
    cosmicAudio.play369Chime(
      newDepth === 5 ? 528 : body.teslaHarmonicNumber === 3 ? 396 : body.teslaHarmonicNumber === 6 ? 639 : 963
    );
    setTimeout(() => {
      setCurrentDepth(newDepth);
      setIsTransitioning(false);
    }, 300);
  };

  const depthNames = [
    { depth: 1, title: 'Orbital Approach', subtitle: 'Outer Celestial Sphere' },
    { depth: 2, title: 'Surface & Atmosphere', subtitle: 'Atmospheric Abyss & Torus' },
    { depth: 3, title: 'Vedic Graha Temple', subtitle: 'Jyotish Sacred Mandala' },
    { depth: 4, title: 'Tesla 3-6-9 Vortex', subtitle: 'Quantum Singularity Core' },
    { depth: 5, title: 'Vedic Compatibility', subtitle: 'Birth Chart & Transit Sync' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 overflow-y-auto font-sans select-none">
      {/* Dynamic Cosmic Background with Animated Halos */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${body.glowColor} 0%, rgba(5,2,15,0.9) 70%, #000000 100%)`,
        }}
      />

      {/* Top Portal Navigation Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 w-full max-w-6xl mx-auto pb-3 border-b border-amber-500/30">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center font-cinzel font-black text-black shadow-lg"
            style={{ backgroundColor: body.color }}
          >
            {body.teslaHarmonicNumber}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#fdf2d1] tracking-wider">
                {body.name}
              </h2>
              {body.sanskritName && (
                <span className="text-xs sm:text-sm font-serif px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40">
                  {body.sanskritName}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 font-mono">
              Cousto Octave: <span className="text-amber-300 font-bold">{body.vibrationalFrequencyHz} Hz</span> • Solfeggio: {body.solfeggioKey}
            </p>
          </div>
        </div>

        {/* Action Controls & Close */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Vedic Compatibility Header Jump Button */}
          <button
            onClick={() => changeDepth(5)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              currentDepth === 5
                ? 'bg-gradient-to-r from-amber-500/40 to-emerald-500/40 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                : 'bg-black/60 hover:bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:text-emerald-200'
            }`}
            title="Open Live Vedic Compatibility with User Birth Data"
          >
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
            <span>Vedic Sync: <strong>{quickCompatibility.overallCompatibilityScore}%</strong></span>
          </button>

          <button
            onClick={toggleAudio}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-amber-500 text-black border-amber-300 shadow-[0_0_15px_rgba(255,215,0,0.8)]'
                : 'bg-black/60 border-amber-500/40 text-amber-200 hover:bg-amber-500/20'
            }`}
          >
            {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5 animate-bounce" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{isPlayingAudio ? `${body.vibrationalFrequencyHz}Hz Live` : 'Play Tone'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-black/60 hover:bg-rose-500/20 border border-white/20 text-gray-300 hover:text-white transition-all cursor-pointer"
            title="Exit Deep Portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Depth Level Indicator & Elevator */}
      <div className="relative z-20 w-full max-w-6xl mx-auto py-3">
        <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl bg-black/60 border border-amber-500/30 backdrop-blur-md">
          {depthNames.map((item) => (
            <button
              key={item.depth}
              onClick={() => changeDepth(item.depth as PortalDepth)}
              className={`flex-1 min-w-[120px] sm:min-w-[140px] p-2 sm:p-2.5 rounded-xl text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                currentDepth === item.depth
                  ? 'bg-gradient-to-r from-amber-500/30 to-purple-500/30 border border-amber-400 shadow-[0_0_15px_rgba(255,215,0,0.4)]'
                  : 'hover:bg-white/5 border border-transparent text-gray-400'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                  currentDepth === item.depth ? 'bg-amber-400 text-black' : 'bg-white/10 text-gray-400'
                }`}
              >
                {item.depth}
              </div>
              <div className="overflow-hidden">
                <div
                  className={`text-xs font-cinzel font-bold truncate ${
                    currentDepth === item.depth ? 'text-amber-200' : 'text-gray-300'
                  }`}
                >
                  {item.title}
                </div>
                <div className="text-[10px] text-gray-400 truncate">{item.subtitle}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Depth Content Window with AnimatePresence */}
      <div className="relative z-20 flex-1 w-full max-w-6xl mx-auto my-2 min-h-[380px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* LEVEL 1: ORBITAL APPROACH & CELESTIAL SPHERE */}
          {currentDepth === 1 && (
            <motion.div
              key="depth-1"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.08, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* Visual 3D Sphere & Planetary Glow Display */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-black/60 border border-amber-500/30 shadow-2xl relative overflow-hidden">
                <div className="w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center relative">
                  <RotatingPlanetPreview body={body} />
                </div>

                <div className="mt-2 text-center">
                  <span className="text-xs font-mono text-amber-300/80 uppercase tracking-widest block">
                    HARMONIC MATRIX #{body.teslaHarmonicNumber}
                  </span>
                  <p className="text-sm font-serif italic text-gray-300 mt-1">"{body.quantumAffirmation}"</p>
                </div>
              </div>

              {/* Orbital Telemetry & Description */}
              <div className="lg:col-span-7 space-y-4 p-6 rounded-3xl bg-black/60 border border-amber-500/30 shadow-2xl">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono tracking-widest uppercase">
                  <Globe className="w-4 h-4" />
                  <span>Celestial Astrometry & Cosmic Resonance</span>
                </div>

                <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans">{body.description}</p>

                {/* Key Astrometry Facts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {body.keyFacts.map((fact, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                      <span className="text-[10px] text-gray-400 block uppercase font-mono">{fact.label}</span>
                      <span className="text-xs sm:text-sm font-bold text-amber-200 font-cinzel">{fact.value}</span>
                    </div>
                  ))}
                </div>

                {/* Quick Vedic Compatibility Banner in Orbit */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-cyan-950/40 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{user?.name || 'Anya Sharma'}'s Vedic Compatibility:</span>
                      <span className="text-amber-300 font-mono">{quickCompatibility.overallCompatibilityScore}% ({quickCompatibility.grade})</span>
                    </div>
                    <span className="text-[11px] text-gray-400 block">{quickCompatibility.verdictTitle}</span>
                  </div>
                  <button
                    onClick={() => changeDepth(5)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-200 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Sync</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-gray-400 block">Hans Cousto Cosmic Octave</span>
                    <span className="text-amber-300 font-bold">{body.vibrationalFrequencyHz} Hz Tone</span>
                  </div>
                  <button
                    onClick={() => changeDepth(2)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
                  >
                    <span>Dive to Atmosphere</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* LEVEL 2: SURFACE, ATMOSPHERE & TORUS MAGNETOSPHERE */}
          {currentDepth === 2 && (
            <motion.div
              key="depth-2"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.08, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* Torus Magnetic Field & Radiant Waves */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-black/60 border border-cyan-500/30 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
                <div className="w-56 h-56 relative flex items-center justify-center">
                  {/* Dynamic Toroidal Rings */}
                  {[1, 2, 3].map((ring) => (
                    <motion.div
                      key={ring}
                      animate={{ rotate: 360, scale: [1, 1.06, 1] }}
                      transition={{ duration: 6 / ring, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40"
                      style={{ padding: ring * 14 }}
                    />
                  ))}
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-center font-cinzel font-bold text-black text-sm shadow-[0_0_40px_rgba(34,211,238,0.8)]"
                    style={{ backgroundColor: body.color }}
                  >
                    Magnetic
                    <br />
                    Torus
                  </div>
                </div>

                <span className="text-xs font-mono text-cyan-300 mt-2">ELECTROMAGNETIC ETHERIC FLUX</span>
              </div>

              {/* Tesla Radiant Ether Insight */}
              <div className="lg:col-span-7 space-y-4 p-6 rounded-3xl bg-black/60 border border-cyan-500/30 shadow-2xl">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase">
                  <Zap className="w-4 h-4" />
                  <span>Nikola Tesla Etheric & Electromagnetic Insights</span>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30">
                  <p className="text-sm sm:text-base text-cyan-100 italic leading-relaxed font-serif">
                    "{body.teslaInsight}"
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-gray-400 block">Chakra Frequency Channel:</span>
                    <span className="text-amber-300 font-bold">{body.chakraResonance}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-gray-400 block">Solfeggio Key:</span>
                    <span className="text-pink-300 font-bold">{body.solfeggioKey}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => changeDepth(1)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 text-xs font-cinzel flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronUp className="w-4 h-4" />
                    <span>Ascend to Orbit</span>
                  </button>

                  <button
                    onClick={() => changeDepth(3)}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-cinzel font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
                  >
                    <span>Dive to Vedic Temple</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* LEVEL 3: VEDIC SACRED TEMPLE & GRAHA REALM */}
          {currentDepth === 3 && (
            <motion.div
              key="depth-3"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.08, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* Vedic Mandala & Yantra Emblem */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-black/60 border border-amber-500/40 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
                <div className="w-52 h-52 rounded-full border-2 border-amber-400/60 p-3 relative flex items-center justify-center shadow-[0_0_60px_rgba(255,215,0,0.5)]">
                  {/* Rotating Vedic Geometry */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-2 border border-amber-300/40 rounded-full border-dashed"
                  />
                  <div className="text-center">
                    <div className="text-3xl font-serif text-amber-300 font-bold">{body.sanskritName?.split(' ')[0]}</div>
                    <span className="text-[10px] font-mono text-gray-300 uppercase block mt-1">
                      {body.vedicGraha?.split('(')[0]}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-serif text-amber-300/90 mt-3 font-semibold">
                  ज्योतिषीय ग्रह चेतना (Jyotish Consciousness)
                </span>
              </div>

              {/* Vedic Cosmology & Graha Significations */}
              <div className="lg:col-span-7 space-y-4 p-6 rounded-3xl bg-black/60 border border-amber-500/40 shadow-2xl">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono tracking-widest uppercase">
                  <BookOpen className="w-4 h-4" />
                  <span>Vedic Jyotish & Karmic Significations</span>
                </div>

                <p className="text-sm sm:text-base text-amber-100 leading-relaxed font-serif">
                  {body.vedicCosmology}
                </p>

                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 space-y-1">
                  <span className="text-xs font-mono text-amber-300 block font-bold">Graha Lordship & Soul Resonance</span>
                  <p className="text-xs text-gray-300">{body.vedicGraha}</p>
                </div>

                {/* Direct Link to Vedic Compatibility (Depth 5) */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-cyan-500/20 border border-amber-400/40 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-amber-200 font-bold block flex items-center gap-1.5">
                      <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
                      Dynamic Vedic Compatibility ({user?.name || 'Anya Sharma'})
                    </span>
                    <span className="text-gray-300 text-[11px]">Calculate exact Gochara transit & personal birth chart alignment</span>
                  </div>
                  <button
                    onClick={() => changeDepth(5)}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs flex items-center gap-1 shadow-lg transition-all cursor-pointer"
                  >
                    <span>Open Sync (Depth 5)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => changeDepth(2)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 text-xs font-cinzel flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronUp className="w-4 h-4" />
                    <span>Ascend to Atmosphere</span>
                  </button>

                  <button
                    onClick={() => changeDepth(4)}
                    className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-cinzel font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
                  >
                    <span>Dive to 3-6-9 Singularity</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* LEVEL 4: TESLA 3-6-9 VORTEX & QUANTUM SINGULARITY */}
          {currentDepth === 4 && (
            <motion.div
              key="depth-4"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.08, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* Singularity Core Vortex Matrix */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-black/80 border border-purple-500/50 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
                <div className="w-56 h-56 relative flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-2 border-purple-400/80 shadow-[0_0_50px_rgba(168,85,247,0.8)]"
                  />
                  <div className="text-center z-10 space-y-1">
                    <span className="text-5xl font-cinzel font-black text-amber-300 drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]">
                      {body.teslaHarmonicNumber}
                    </span>
                    <span className="text-[11px] font-mono text-purple-300 block uppercase">
                      Vortex Key Singularity
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className="text-xs font-mono text-amber-300">
                    DIGITAL ROOT HARMONIC: {body.teslaHarmonicNumber}
                  </span>
                </div>
              </div>

              {/* Quantum Singularity & Manifestation Portal */}
              <div className="lg:col-span-7 space-y-4 p-6 rounded-3xl bg-black/80 border border-purple-500/50 shadow-2xl">
                <div className="flex items-center gap-2 text-purple-400 text-xs font-mono tracking-widest uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>Sub-Atomic Zero-Point Field Manifestation</span>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  "If you only knew the magnificence of the 3, 6 and 9, then you would have a key to the universe." In this quantum chamber, the frequency of {body.name} ({body.vibrationalFrequencyHz} Hz) aligns perfectly with the #{body.teslaHarmonicNumber} nodal harmonic flux.
                </p>

                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-400/40 space-y-2">
                  <span className="text-xs font-mono text-amber-300 font-bold block uppercase">
                    Akashic Manifestation Affirmation
                  </span>
                  <p className="text-sm font-serif italic text-purple-100">"{body.quantumAffirmation}"</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => changeDepth(3)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 text-xs font-cinzel flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronUp className="w-4 h-4" />
                    <span>Ascend to Vedic Temple</span>
                  </button>

                  <button
                    onClick={() => changeDepth(5)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-black font-cinzel font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
                  >
                    <span>Vedic Compatibility Matrix</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* LEVEL 5: VEDIC COMPATIBILITY & BIRTH CHART SYNCHRONIZATION */}
          {currentDepth === 5 && (
            <motion.div
              key="depth-5"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.06, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <VedicCompatibilitySection
                body={body}
                user={user}
                onJumpToTemple={() => changeDepth(3)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Celestial Jump Selector ("Travel from one space location to another") */}
      <div className="relative z-20 w-full max-w-6xl mx-auto pt-3 border-t border-amber-500/30 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <Compass className="w-4 h-4 text-amber-400" />
          <span>Warp to Another Celestial Domain:</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {allBodies
            .filter((b) => b.id !== body.id)
            .map((target) => (
              <button
                key={target.id}
                onClick={() => onTravelTo(target)}
                className="px-3 py-1 rounded-xl bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400 text-xs font-cinzel text-gray-200 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: target.color }} />
                <span>{target.name.split(' ')[0]}</span>
                <ArrowRight className="w-3 h-3 text-amber-400" />
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

const RotatingPlanetPreview: React.FC<{ body: CelestialBodyData }> = ({ body }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(cx, cy) * 0.52;

      drawHighFidelityPlanet({
        ctx,
        body,
        screenX: cx,
        screenY: cy,
        bodyRadius: radius,
        frame,
        isSelected: true,
        isHovered: false,
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [body]);

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={280}
      className="w-full h-full block filter drop-shadow-[0_0_40px_rgba(255,215,0,0.3)]"
    />
  );
};

