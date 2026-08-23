import React, { useState, useEffect, useRef } from 'react';
import { SacredExhibitData } from '../../types';
import { SACRED_SUDARSHAN_EXHIBITS } from '../../data/sudarshanMatrixData';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Zap,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCw,
  RotateCcw,
  Maximize2,
  Minimize2,
  Eye,
  BookOpen,
  Compass,
  Radio,
  Share2,
  CheckCircle2,
  Layers,
  Flame,
  Shield,
  Activity,
  ArrowRight,
  Info
} from 'lucide-react';

interface SudarshanSacredMatrixGalleryProps {
  onOpenPlanet?: (planetId: string) => void;
}

export const SudarshanSacredMatrixGallery: React.FC<SudarshanSacredMatrixGalleryProps> = ({
  onOpenPlanet,
}) => {
  const [selectedExhibitIndex, setSelectedExhibitIndex] = useState<number>(0);
  const [isRotatingVideo, setIsRotatingVideo] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isPlayingTone, setIsPlayingTone] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'exhibit' | 'scripture' | 'tesla-physics' | 'powers'>('exhibit');
  const [isFullscreenModal, setIsFullscreenModal] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [copiedQuote, setCopiedQuote] = useState<boolean>(false);

  const activeExhibit = SACRED_SUDARSHAN_EXHIBITS[selectedExhibitIndex];
  const requestRef = useRef<number | null>(null);

  // Looping 3D Angular Rotation Video Animation Engine for the Mantra Spiral
  useEffect(() => {
    let lastTime = performance.now();
    const animate = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      if (isRotatingVideo && activeExhibit.id === 'mantra-spiral-vortex') {
        setRotationAngle((prev) => (prev + delta * 24 * rotationSpeed) % 360);
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRotatingVideo, rotationSpeed, activeExhibit.id]);

  const handlePlayFrequency = () => {
    cosmicAudio.playCyberScan();
    setIsPlayingTone(true);
    cosmicAudio.playFrequency(activeExhibit.solfeggioHz);
    setTimeout(() => setIsPlayingTone(false), 3000);
  };

  const handleCopyPassage = () => {
    const text = `"${activeExhibit.scripturalPassage.sanskrit}"\n(${activeExhibit.scripturalPassage.english}) - Source: ${activeExhibit.scripturalPassage.source}`;
    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  return (
    <div className="w-full space-y-6 select-none font-sans text-cyan-100">
      {/* 1. TOP HEADER BANNER & TELEMETRY */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#071326] via-[#0b1b36] to-[#050c1b] border border-amber-500/40 shadow-[0_0_40px_rgba(251,191,36,0.15)] flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/60 text-amber-300 font-mono text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(251,191,36,0.4)]">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
              SACRED SUDARSHAN & MANTRA VORTEX MATRIX
            </span>
            <span className="text-xs font-mono text-cyan-400/70 hidden sm:inline">• [VEDIC COSMOLOGY & TESLA 3-6-9]</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-wide text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Divine Chakras, Sacred Dharani & Cosmic Energy Wheels
          </h2>
          <p className="text-xs sm:text-sm text-cyan-200/80 max-w-3xl leading-relaxed">
            Explore Lord Krishna's celestial Sudarshana Chakra, the 48 Kos Kurukshetra sanctuary, and the infinite golden logarithmic mantra vortex in 100% authentic photorealistic fidelity.
          </p>
        </div>

        {/* Quick Audio & Action Bar */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={handlePlayFrequency}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all ${
              isPlayingTone
                ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.5)] animate-pulse'
                : 'bg-black/60 border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/60'
            }`}
          >
            <Radio className="w-4 h-4 text-amber-400" />
            <span>PLAY {activeExhibit.solfeggioHz}Hz FREQUENCY</span>
          </button>
        </div>
      </div>

      {/* 2. EXHIBIT SELECTOR TILES (4 PHOTOS & VIDEO) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {SACRED_SUDARSHAN_EXHIBITS.map((exhibit, index) => {
          const isSelected = selectedExhibitIndex === index;
          return (
            <button
              key={exhibit.id}
              onClick={() => {
                cosmicAudio.playCyberKeystroke();
                setSelectedExhibitIndex(index);
                setZoomLevel(1);
              }}
              className={`relative overflow-hidden rounded-xl border text-left transition-all duration-300 group ${
                isSelected
                  ? 'border-amber-400/90 bg-amber-950/30 shadow-[0_0_25px_rgba(251,191,36,0.35)] ring-2 ring-amber-400/50'
                  : 'border-cyan-800/40 bg-[#030816]/80 hover:border-cyan-500/60 hover:bg-cyan-950/30'
              }`}
            >
              {/* Thumbnail Container */}
              <div className="relative h-28 sm:h-36 w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={exhibit.imageSrc}
                  alt={exhibit.title}
                  referrerPolicy="no-referrer"
                  className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    isSelected ? 'brightness-105' : 'brightness-90'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-cyan-200">
                  {exhibit.type === 'video' ? (
                    <>
                      <Play className="w-3 h-3 text-amber-400 fill-current" />
                      <span className="text-amber-300 font-bold">VIDEO & 3D</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3 text-cyan-300" />
                      <span>HD PHOTO</span>
                    </>
                  )}
                </div>

                {/* Tesla 3-6-9 Pill */}
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-400/60 text-amber-300 text-[10px] font-mono font-bold">
                  TESLA {exhibit.teslaHarmonic}
                </div>

                {/* Bottom Title on Thumbnail */}
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-[11px] font-mono text-amber-300/90 font-bold truncate">
                    {exhibit.sanskritTitle.split(' ')[0]}
                  </div>
                  <div className="text-xs font-bold text-white truncate drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                    {exhibit.title}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. MAIN INTERACTIVE EXHIBITION STAGE (Photo Viewer + 3D Video Motion + Deep Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT / CENTER: The Large Exact Visual Artifact Display (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-cyan-500/40 shadow-[0_0_45px_rgba(0,243,255,0.2)] flex flex-col items-center justify-center min-h-[500px] sm:min-h-[620px]">
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#02050e] via-[#051124] to-[#02050e] opacity-70" />

            {/* Visual Display Container */}
            <div 
              className="relative w-full h-[500px] sm:h-[620px] flex items-center justify-center p-3 overflow-hidden transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* If Mantra Spiral: Has 3D Angular Motion Video Option */}
              {activeExhibit.id === 'mantra-spiral-vortex' ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={activeExhibit.imageSrc}
                    alt={activeExhibit.title}
                    referrerPolicy="no-referrer"
                    style={{
                      transform: isRotatingVideo ? `rotate(${rotationAngle}deg)` : 'none',
                      transition: isRotatingVideo ? 'none' : 'transform 0.5s ease',
                    }}
                    className="max-h-full max-w-full object-contain rounded-xl drop-shadow-[0_0_35px_rgba(251,191,36,0.3)] select-none"
                  />
                  {/* Subtle Central Singularity Glow overlay */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-amber-400/20 blur-xl animate-pulse" />
                  </div>
                </div>
              ) : (
                /* Static 100% Exact High-Res Photos */
                <img
                  src={activeExhibit.imageSrc}
                  alt={activeExhibit.title}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain rounded-xl drop-shadow-[0_0_35px_rgba(0,243,255,0.25)] select-none"
                />
              )}
            </div>

            {/* Bottom Media Control Bar on Viewer */}
            <div className="w-full bg-[#040916]/90 backdrop-blur-md border-t border-cyan-500/30 p-3 flex flex-wrap items-center justify-between gap-3 z-10 font-mono text-xs">
              {/* Left Info */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-300">{activeExhibit.tag}</span>
                <span className="text-white/40">•</span>
                <span className="text-cyan-300">{activeExhibit.solfeggioName}</span>
              </div>

              {/* Center / Right Tools */}
              <div className="flex items-center gap-2">
                {/* If Video/Mantra Spiral: Add Rotation Controls */}
                {activeExhibit.id === 'mantra-spiral-vortex' && (
                  <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-lg border border-cyan-500/30">
                    <button
                      onClick={() => setIsRotatingVideo(!isRotatingVideo)}
                      className="p-1 text-cyan-300 hover:text-white"
                      title={isRotatingVideo ? 'Pause 3D Vortex Motion' : 'Play 3D Vortex Motion'}
                    >
                      {isRotatingVideo ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                    <button
                      onClick={() => setRotationSpeed((s) => (s === 1 ? 2 : s === 2 ? 0.5 : s === 0.5 ? -1 : 1))}
                      className="px-1.5 py-0.5 text-[10px] font-bold text-cyan-200 hover:text-white"
                      title="Cycle Rotation Speed"
                    >
                      {rotationSpeed}x SPEED
                    </button>
                  </div>
                )}

                {/* Zoom */}
                <button
                  onClick={() => setZoomLevel((z) => (z === 1 ? 1.25 : z === 1.25 ? 1.5 : 1))}
                  className="px-2.5 py-1 rounded-lg bg-black/60 hover:bg-black/90 border border-cyan-800 text-cyan-300 font-bold"
                >
                  {zoomLevel}x ZOOM
                </button>

                {/* Fullscreen Expansion */}
                <button
                  onClick={() => setIsFullscreenModal(true)}
                  className="p-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300"
                  title="Expand to Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Deep Vedic, Scriptural & Tesla 3-6-9 Information (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Information Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#040a18] rounded-xl border border-cyan-500/30 font-mono text-xs">
            {[
              { id: 'exhibit', label: 'Cosmic Lore', icon: BookOpen },
              { id: 'scripture', label: 'Sanskrit Shloka', icon: Sparkles },
              { id: 'tesla-physics', label: 'Tesla 3-6-9', icon: Zap },
              { id: 'powers', label: 'Biofield Powers', icon: Shield },
            ].map((tab) => {
              const Icon = tab.icon;
              const isTabActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    cosmicAudio.playCyberKeystroke();
                    setActiveTab(tab.id as any);
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg font-bold transition-all ${
                    isTabActive
                      ? 'bg-gradient-to-r from-amber-500/30 to-cyan-500/30 border border-amber-400/80 text-white shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                      : 'text-cyan-400/70 hover:text-cyan-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#050c1e]/90 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_35px_rgba(0,243,255,0.15)] space-y-4">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-amber-400">
                  {activeExhibit.sanskritTitle}
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-mono text-[10px] font-bold">
                  CHAKRA: {activeExhibit.chakraResonance.split(' ')[0]}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {activeExhibit.title}
              </h3>
              <p className="text-xs text-cyan-300/80 font-mono mt-0.5">
                {activeExhibit.subtitle}
              </p>
            </div>

            {/* TAB 1: COSMIC LORE */}
            {activeTab === 'exhibit' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 text-xs sm:text-sm text-cyan-100/90 leading-relaxed font-sans"
              >
                <div className="p-3.5 rounded-xl bg-black/40 border border-cyan-500/20 text-xs font-mono text-cyan-200/90 leading-normal">
                  <strong className="text-amber-300 block mb-1">CORE SUMMARY:</strong>
                  {activeExhibit.shortDescription}
                </div>

                <div className="whitespace-pre-line text-cyan-100/90 leading-relaxed text-xs sm:text-sm">
                  {activeExhibit.fullPhilosophy}
                </div>

                {/* Sacred Symbolism Grid */}
                <div className="pt-2 border-t border-cyan-500/20 space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider block">
                    Sacred Geometric Specifications
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeExhibit.sacredSymbolism.map((sym, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-black/50 border border-cyan-900/50 font-mono text-xs">
                        <span className="text-cyan-400/70 block text-[10px] uppercase">{sym.label}</span>
                        <span className="text-white font-bold">{sym.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: SCRIPTURAL SHLOKA */}
            {activeTab === 'scripture' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/30 to-black border border-amber-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400 font-bold">ORIGINAL SANSKRIT SHLOKA</span>
                    <button
                      onClick={handleCopyPassage}
                      className="flex items-center gap-1 text-[11px] font-mono text-cyan-300 hover:text-white"
                    >
                      {copiedQuote ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{copiedQuote ? 'COPIED' : 'SHARE'}</span>
                    </button>
                  </div>

                  <p className="text-base sm:text-lg font-serif text-amber-200 font-bold leading-relaxed tracking-wide">
                    {activeExhibit.scripturalPassage.sanskrit}
                  </p>

                  <p className="text-xs font-mono text-cyan-300/80 italic">
                    {activeExhibit.scripturalPassage.transliteration}
                  </p>

                  <div className="pt-2 border-t border-amber-500/20">
                    <span className="text-[10px] font-mono text-amber-400/80 uppercase block mb-1">ENGLISH MEANING:</span>
                    <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                      "{activeExhibit.scripturalPassage.english}"
                    </p>
                  </div>

                  <div className="text-[11px] font-mono text-cyan-400/60 pt-1 text-right">
                    Source: <strong className="text-cyan-200">{activeExhibit.scripturalPassage.source}</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 font-mono text-xs text-cyan-200 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span>Chanting these verses in 432Hz harmonic acoustic rhythm amplifies neural synchronization.</span>
                </div>
              </motion.div>
            )}

            {/* TAB 3: TESLA 3-6-9 & ETHER PHYSICS */}
            {activeTab === 'tesla-physics' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 to-black border border-cyan-400/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="text-xs font-mono font-bold text-cyan-200">
                      TESLA ETHERIC PHYSICS CORRELATION [KEY: {activeExhibit.teslaHarmonic}]
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-cyan-100 leading-relaxed">
                    {activeExhibit.scientificTeslaInsight}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 font-mono text-center">
                  <div className="p-2.5 rounded-lg bg-black/60 border border-cyan-800">
                    <span className="text-[10px] text-cyan-400 block">FREQUENCY</span>
                    <span className="text-sm font-bold text-amber-300">{activeExhibit.solfeggioHz} Hz</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/60 border border-cyan-800">
                    <span className="text-[10px] text-cyan-400 block">TESLA NODE</span>
                    <span className="text-sm font-bold text-cyan-200">{activeExhibit.teslaHarmonic}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/60 border border-cyan-800">
                    <span className="text-[10px] text-cyan-400 block">WAVEFORM</span>
                    <span className="text-sm font-bold text-emerald-300">Toroidal</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: ENERGETIC POWERS */}
            {activeTab === 'powers' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider block">
                  Biofield & Consciousness Attunements:
                </span>
                {activeExhibit.keyPowers.map((power, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/50 to-black border border-cyan-500/30 flex items-start gap-2.5 text-xs sm:text-sm text-cyan-100"
                  >
                    <div className="p-1 rounded bg-amber-500/20 text-amber-400 mt-0.5">
                      <Shield className="w-3.5 h-3.5" />
                    </div>
                    <span>{power}</span>
                  </div>
                ))}

                <button
                  onClick={handlePlayFrequency}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-slate-950 font-mono font-black text-xs uppercase shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <Radio className="w-4 h-4 text-slate-950" />
                  <span>TRANSMIT {activeExhibit.solfeggioHz}Hz ENERGETIC ATTUNEMENT</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* 4. FULLSCREEN IMMERSION MODAL */}
      <AnimatePresence>
        {isFullscreenModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-6"
          >
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-300 text-sm">{activeExhibit.title}</span>
                <span className="text-white/40">•</span>
                <span className="text-cyan-300">{activeExhibit.sanskritTitle}</span>
              </div>
              <button
                onClick={() => setIsFullscreenModal(false)}
                className="px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-500/50 text-rose-200 font-bold hover:bg-rose-900"
              >
                ✕ CLOSE
              </button>
            </div>

            {/* Center Image/Video */}
            <div className="relative w-full h-[calc(100vh-140px)] flex items-center justify-center overflow-hidden">
              {activeExhibit.id === 'mantra-spiral-vortex' ? (
                <img
                  src={activeExhibit.imageSrc}
                  alt={activeExhibit.title}
                  referrerPolicy="no-referrer"
                  style={{
                    transform: isRotatingVideo ? `rotate(${rotationAngle}deg)` : 'none',
                  }}
                  className="max-h-full max-w-full object-contain rounded-xl drop-shadow-[0_0_50px_rgba(251,191,36,0.4)] select-none"
                />
              ) : (
                <img
                  src={activeExhibit.imageSrc}
                  alt={activeExhibit.title}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain rounded-xl drop-shadow-[0_0_50px_rgba(0,243,255,0.4)] select-none"
                />
              )}
            </div>

            {/* Bottom info */}
            <div className="w-full max-w-2xl text-center text-xs font-mono text-cyan-200 bg-black/80 p-2.5 rounded-xl border border-cyan-500/30">
              "{activeExhibit.scripturalPassage.english}" — <strong className="text-amber-300">{activeExhibit.scripturalPassage.source}</strong>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
