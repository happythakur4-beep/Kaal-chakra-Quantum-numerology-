import React, { useState, useEffect } from 'react';
import { ThemeMode, UserProfile, ScreenType } from '../../types';
import { MindWellness3DIcon } from './MindWellness3DIcon';
import { TibetanBowl3DIcon } from '../SoundHealing/TibetanBowl3DIcon';
import { CymaticsBrainVisualizer } from '../SoundHealing/CymaticsBrainVisualizer';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { audioManager } from '../../utils/audioStateManager';
import {
  X,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Activity,
  Heart,
  Moon,
  Sun,
  Zap,
  Brain,
  Sparkles,
  Dna,
  Shield,
  Layers,
  ChevronRight,
  TrendingUp,
  Droplets,
  Flame,
  Radio,
  Sliders,
  CheckCircle2,
  Clock,
  Compass,
  Smile,
  Target,
  ArrowUpRight,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  Play,
  Pause
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

interface MindWellnessPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  userProfile?: UserProfile;
  onNavigateToFullChamber?: (screen: ScreenType) => void;
}

export const MindWellnessPortalModal: React.FC<MindWellnessPortalModalProps> = ({
  isOpen,
  onClose,
  theme,
  userProfile,
  onNavigateToFullChamber
}) => {
  const isDark = theme === 'dark';
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activePortalView, setActivePortalView] = useState<'smart_dashboard' | 'sound_healing' | 'science_of_rest' | 'cellular_laser' | 'vagus_engine' | 'ai_disease_healer'>('smart_dashboard');

  // Audio States
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeFreq, setActiveFreq] = useState<number>(528);

  // Live Biometrics State (Simulated Dynamic Telemetry)
  const [liveBpm, setLiveBpm] = useState<number>(72);
  const [recoveryScore, setRecoveryScore] = useState<number>(92);
  const [sleepScore, setSleepScore] = useState<number>(94);
  const [stressLevel, setStressLevel] = useState<number>(12);
  const [longevityScore, setLongevityScore] = useState<number>(95);
  const [hydrationScore, setHydrationScore] = useState<number>(88);
  const [trendRange, setTrendRange] = useState<'weeks' | 'months' | 'years'>('months');

  // Interactive Avatar Organ Scanner Selection
  const [scannedOrgan, setScannedOrgan] = useState<'brain' | 'heart' | 'gut' | 'dna' | 'spine'>('brain');

  // Audio Synchronization
  useEffect(() => {
    const unsub = cosmicAudio.subscribeHealing((isRunning, freq) => {
      setIsAudioPlaying(isRunning);
      setActiveFreq(freq);
    });
    return () => {
      unsub();
    };
  }, []);

  // Ambient telemetry oscillation
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setLiveBpm(70 + Math.floor(Math.random() * 5));
    }, 2500);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSoundscape = (hz: number = 528) => {
    if (isAudioPlaying && activeFreq === hz) {
      audioManager.stopAll();
    } else {
      audioManager.playSolfeggio(hz);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        
        {/* Holographic Deep-Space Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-all"
        />

        {/* Ambient Portal Warp Rays */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-emerald-500/15 blur-[120px] animate-pulse" />
          <div className="absolute -bottom-40 -right-40 w-[550px] h-[550px] rounded-full bg-cyan-500/15 blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Distinct Portal Window HUD Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className={`relative w-full z-10 flex flex-col rounded-3xl border shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 ${
            isFullscreen ? 'h-full max-w-full' : 'max-h-[92vh] max-w-7xl h-[92vh]'
          } ${
            isDark
              ? 'bg-gradient-to-b from-[#090b14] via-[#0d101d] to-[#060810] border-emerald-500/40 text-gray-100 shadow-[0_0_40px_rgba(16,185,129,0.25)]'
              : 'bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] border-emerald-600/50 text-slate-900 shadow-2xl'
          }`}
        >
          
          {/* ========================================================================= */}
          {/* PORTAL TOP HUD BAR & WINDOW CONTROLS */}
          {/* ========================================================================= */}
          <div
            className={`px-4 sm:px-6 py-3.5 border-b flex items-center justify-between flex-wrap gap-3 ${
              isDark ? 'bg-[#06070d]/80 border-emerald-500/30' : 'bg-white/80 border-emerald-400/40'
            }`}
          >
            {/* Left: 3D Holographic Icon & Title */}
            <div className="flex items-center gap-3">
              <MindWellness3DIcon
                size={42}
                showGlow={true}
                showBadge={true}
                badgeText="528Hz"
                onClick={() => {
                  cosmicAudio.playTone(528, 0.1);
                  confetti({ particleCount: 30, spread: 60 });
                }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                    AlterMe Quantum Portal
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-mono opacity-60">Connected: Bio-Wearable Sync</span>
                </div>
                <h2 className="text-base sm:text-lg font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-amber-200">
                  Mind Wellness • Smart Health & Recovery Matrix
                </h2>
              </div>
            </div>

            {/* Center: Solfeggio & Audio Master Trigger */}
            <div className="flex items-center gap-2">
              <button
                id="portal-solfeggio-toggle"
                onClick={() => toggleSoundscape(528)}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                  isAudioPlaying
                    ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : isDark
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                    : 'bg-emerald-100 border-emerald-400 text-emerald-900 hover:bg-emerald-200'
                }`}
              >
                {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{isAudioPlaying ? `Solfeggio (${activeFreq}Hz) Active` : 'Play 528Hz Miracle Wave'}</span>
              </button>
            </div>

            {/* Right: Window Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  cosmicAudio.playTone(432, 0.05);
                  setActivePortalView('sound_healing');
                }}
                title="Open Sound Healing Therapy Suite (Buddhist Singing Bowls & Mantras)"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 cursor-pointer ${
                  activePortalView === 'sound_healing'
                    ? 'bg-amber-500 text-black border border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                    : 'bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300'
                }`}
              >
                <TibetanBowl3DIcon size={16} interactive={false} showGlow={false} ringing={activePortalView === 'sound_healing'} />
                <span className="hidden sm:inline">Sound Healing</span>
              </button>

              {onNavigateToFullChamber && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToFullChamber('mind-healing');
                  }}
                  title="Expand to Full Dedicated App View"
                  className={`p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                    isDark ? 'border-white/10 hover:bg-white/10 text-gray-300' : 'border-slate-300 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                title={isFullscreen ? 'Restore Window' : 'Maximize Window'}
                className={`p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                  isDark ? 'border-white/10 hover:bg-white/10 text-gray-300' : 'border-slate-300 hover:bg-slate-200 text-slate-800'
                }`}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                title="Close Portal"
                className="p-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PORTAL NAVIGATION TABS (SMART DASHBOARD, SOUND HEALING, REST SCIENCE, LASER, VAGUS, AI) */}
          {/* ========================================================================= */}
          <div
            className={`px-4 sm:px-6 py-2 border-b flex items-center gap-2 overflow-x-auto ${
              isDark ? 'bg-[#080a12] border-emerald-500/20' : 'bg-slate-100 border-slate-300'
            }`}
          >
            {[
              { id: 'smart_dashboard', label: 'Smart Health Dashboard', icon: <Activity className="w-3.5 h-3.5 text-cyan-400" /> },
              { id: 'sound_healing', label: 'Sound Healing & Cymatics (नाद योग)', icon: <TibetanBowl3DIcon size={14} interactive={false} showGlow={false} ringing={activePortalView === 'sound_healing'} /> },
              { id: 'science_of_rest', label: 'The Science of Rest (Sleep Biohack)', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
              { id: 'cellular_laser', label: 'Cellular Laser Chamber', icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> },
              { id: 'vagus_engine', label: 'Vagus Nerve Reset', icon: <Heart className="w-3.5 h-3.5 text-emerald-400" /> },
              { id: 'ai_disease_healer', label: 'Universal Any-Illness AI', icon: <Brain className="w-3.5 h-3.5 text-rose-400" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  cosmicAudio.playTone(432, 0.05);
                  setActivePortalView(tab.id as any);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  activePortalView === tab.id
                    ? isDark
                      ? 'bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'bg-emerald-600 text-white shadow-md'
                    : isDark
                    ? 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ========================================================================= */}
          {/* SCROLLABLE MAIN PORTAL CONTENT AREA */}
          {/* ========================================================================= */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
            
            {/* --------------------------------------------------------------------- */}
            {/* VIEW 1: SMART HEALTH DASHBOARD (Directly inspired by Image 1) */}
            {/* --------------------------------------------------------------------- */}
            {activePortalView === 'smart_dashboard' && (
              <div className="space-y-6">
                
                {/* Hero Header Pill Banner */}
                <div className="text-center space-y-1 max-w-2xl mx-auto">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>ALTERME • QUANTUM BIO-FEEDBACK</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-cinzel font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-200">
                    SMART HEALTH DASHBOARD
                  </h1>
                  <p className="text-xs sm:text-sm opacity-80 font-serif">
                    Personalized insights for a lifetime of wellbeing & epigenetic mastery.
                  </p>
                </div>

                {/* 3-Column Core HUD Layout (Left Telemetry, Central Hologram Avatar, Right Telemetry) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* LEFT COLUMN (4 cols): Sleep Score, Recovery Score, Hydration */}
                  <div className="lg:col-span-4 space-y-4">
                    
                    {/* 1. Sleep Score Card */}
                    <div
                      className={`p-4 rounded-2xl border transition-all ${
                        isDark ? 'bg-[#0d111d] border-cyan-500/30 shadow-lg' : 'bg-white border-cyan-300 shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-cyan-400 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Moon className="w-3.5 h-3.5" /> SLEEP SCORE
                        </span>
                        <span className="text-[11px] opacity-75">7h 48m Duration</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-cinzel font-extrabold text-cyan-300">{sleepScore}%</div>
                          <div className="text-[11px] font-semibold text-emerald-400">Excellent Quality</div>
                        </div>
                        {/* Circular Progress Ring Mini */}
                        <div className="w-14 h-14 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 flex items-center justify-center font-mono text-xs font-bold text-cyan-300 animate-spin" style={{ animationDuration: '8s' }}>
                          <Moon className="w-4 h-4 text-cyan-400" />
                        </div>
                      </div>
                      {/* Mini sleep wave */}
                      <div className="mt-3 flex items-center gap-1 h-4">
                        {[40, 60, 80, 50, 90, 70, 85, 95, 60, 45, 75, 90].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-cyan-400/40 rounded-full transition-all"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 2. Recovery Score Card */}
                    <div
                      className={`p-4 rounded-2xl border transition-all ${
                        isDark ? 'bg-[#0d111d] border-amber-500/30 shadow-lg' : 'bg-white border-amber-300 shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5" /> RECOVERY SCORE
                        </span>
                        <span className="text-[11px] opacity-75">HRV: 68 ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-cinzel font-extrabold text-amber-300">{recoveryScore}%</div>
                          <div className="text-[11px] font-semibold text-emerald-400">Body is ready to perform</div>
                        </div>
                        <div className="w-14 h-14 rounded-full border-4 border-amber-500/20 border-t-amber-400 flex items-center justify-center font-mono text-xs font-bold text-amber-300">
                          <Activity className="w-5 h-5 text-amber-400" />
                        </div>
                      </div>
                    </div>

                    {/* 3. Hydration & Cellular Fluid Levels */}
                    <div
                      className={`p-4 rounded-2xl border transition-all ${
                        isDark ? 'bg-[#0d111d] border-blue-500/30 shadow-lg' : 'bg-white border-blue-300 shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-blue-400 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Droplets className="w-3.5 h-3.5" /> HYDRATION LEVELS
                        </span>
                        <span className="text-[11px] opacity-75">2.1 L / 2.5 L</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-cinzel font-extrabold text-blue-300">{hydrationScore}%</div>
                          <div className="text-[11px] font-semibold text-emerald-400">Optimal Cellular Water</div>
                        </div>
                        <div className="w-14 h-14 rounded-full border-4 border-blue-500/20 border-t-blue-400 flex items-center justify-center font-mono text-xs font-bold text-blue-300">
                          <Droplets className="w-5 h-5 text-blue-400" />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* CENTER COLUMN (4 cols): 3D Holographic Human Avatar & Smart Ring Device */}
                  <div className="lg:col-span-4 flex flex-col items-center space-y-4">
                    
                    {/* Holographic Silhouette Box */}
                    <div
                      className={`w-full p-5 rounded-3xl border relative flex flex-col items-center justify-center overflow-hidden min-h-[380px] ${
                        isDark
                          ? 'bg-gradient-to-b from-[#0e1424] via-[#090d18] to-[#04060c] border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.2)]'
                          : 'bg-gradient-to-b from-slate-900 via-slate-800 to-black border-cyan-600 text-white shadow-xl'
                      }`}
                    >
                      {/* Ambient Grid Rays */}
                      <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

                      {/* Interactive Organ Selector Pills */}
                      <div className="flex items-center gap-1 z-10 mb-3 flex-wrap justify-center">
                        {(['brain', 'heart', 'gut', 'dna', 'spine'] as const).map((org) => (
                          <button
                            key={org}
                            onClick={() => {
                              setScannedOrgan(org);
                              cosmicAudio.playTone(org === 'brain' ? 852 : org === 'heart' ? 528 : org === 'gut' ? 432 : 639, 0.08);
                            }}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                              scannedOrgan === org
                                ? 'bg-cyan-400 text-black shadow-[0_0_12px_#22d3ee]'
                                : 'bg-black/50 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20'
                            }`}
                          >
                            {org}
                          </button>
                        ))}
                      </div>

                      {/* Holographic Human Graphic SVG */}
                      <div className="relative w-48 h-64 flex items-center justify-center">
                        
                        {/* Rotating DNA Double Helix Backdrop */}
                        <motion.div
                          className="absolute w-36 h-56 pointer-events-none opacity-40"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                        >
                          <Dna className="w-full h-full text-cyan-400" />
                        </motion.div>

                        {/* Silhouette */}
                        <svg viewBox="0 0 100 180" className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
                          <defs>
                            <linearGradient id="holoBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#67e8f9" />
                              <stop offset="40%" stopColor="#06b6d4" />
                              <stop offset="80%" stopColor="#0284c7" />
                              <stop offset="100%" stopColor="#0369a1" />
                            </linearGradient>
                          </defs>

                          {/* Head */}
                          <circle cx="50" cy="20" r="12" fill="none" stroke="url(#holoBodyGrad)" strokeWidth="1.5" />
                          {scannedOrgan === 'brain' && (
                            <circle cx="50" cy="20" r="6" fill="#a855f7" className="animate-ping" />
                          )}

                          {/* Neck & Spine */}
                          <line x1="50" y1="32" x2="50" y2="95" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />

                          {/* Chest & Ribcage */}
                          <ellipse cx="50" cy="55" rx="22" ry="18" fill="none" stroke="url(#holoBodyGrad)" strokeWidth="1.5" />
                          {scannedOrgan === 'heart' && (
                            <circle cx="48" cy="52" r="6" fill="#ef4444" className="animate-ping" />
                          )}

                          {/* Abdomen & Gut */}
                          <ellipse cx="50" cy="85" rx="18" ry="14" fill="none" stroke="url(#holoBodyGrad)" strokeWidth="1.5" />
                          {scannedOrgan === 'gut' && (
                            <circle cx="50" cy="85" r="7" fill="#fbbf24" className="animate-ping" />
                          )}

                          {/* Arms */}
                          <path d="M 28,45 L 14,80 L 8,115" fill="none" stroke="url(#holoBodyGrad)" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M 72,45 L 86,80 L 92,115" fill="none" stroke="url(#holoBodyGrad)" strokeWidth="1.5" strokeLinecap="round" />

                          {/* Legs */}
                          <path d="M 40,98 L 34,140 L 30,175" fill="none" stroke="url(#holoBodyGrad)" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M 60,98 L 66,140 L 70,175" fill="none" stroke="url(#holoBodyGrad)" strokeWidth="1.5" strokeLinecap="round" />

                          {/* Active Biofield Scanner Rings */}
                          <circle cx="50" cy="55" r="38" fill="none" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="4 4" className="animate-spin" style={{ transformOrigin: '50px 55px', animationDuration: '10s' }} />
                        </svg>

                        {/* Scanner Target Ray */}
                        <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-bounce" />
                      </div>

                      {/* Organ Scan Feedback Bar */}
                      <div className="mt-2 text-center z-10">
                        <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                          Target: {scannedOrgan.toUpperCase()} Bio-Matrix
                        </div>
                        <div className="text-[10px] font-mono text-emerald-400">
                          Resonance: 528 Hz • Cellular Stress: Low (8%)
                        </div>
                      </div>
                    </div>

                    {/* 3D Smart Ring Bio-Wearable Sync Capsule (From Image 1) */}
                    <div
                      className={`w-full p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                        isDark ? 'bg-[#0b0e1a] border-emerald-500/30' : 'bg-white border-emerald-300 shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-black/60 border-2 border-emerald-400/80 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                          <Radio className="w-6 h-6 text-emerald-400 animate-pulse" />
                        </div>
                        <div>
                          <div className="text-xs font-mono font-bold text-emerald-400">ALTERME SMART RING</div>
                          <div className="text-[11px] opacity-75 font-mono">Live Bluetooth Bio-Telemetry</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        SYNCED 100%
                      </span>
                    </div>

                  </div>

                  {/* RIGHT COLUMN (4 cols): Heart Rate, Stress, Nutrition & Longevity */}
                  <div className="lg:col-span-4 space-y-4">
                    
                    {/* 1. Resting Heart Rate & Live ECG Wave */}
                    <div
                      className={`p-4 rounded-2xl border transition-all ${
                        isDark ? 'bg-[#0d111d] border-red-500/30 shadow-lg' : 'bg-white border-red-300 shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-red-400 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5" /> HEART RATE
                        </span>
                        <span className="text-[11px] opacity-75">Resting {liveBpm - 10} BPM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-cinzel font-extrabold text-red-400 flex items-baseline gap-1">
                            <span>{liveBpm}</span>
                            <span className="text-sm font-mono opacity-80">BPM</span>
                          </div>
                          <div className="text-[11px] font-semibold text-emerald-400">Harmonic Vagal Tone</div>
                        </div>
                        {/* Pulsating ECG Heart Icon */}
                        <div className="w-14 h-14 rounded-full border-4 border-red-500/20 border-t-red-400 flex items-center justify-center">
                          <Heart className="w-6 h-6 text-red-400 animate-ping" />
                        </div>
                      </div>

                      {/* Live ECG Line Simulation */}
                      <div className="mt-3 h-6 w-full flex items-center overflow-hidden opacity-80">
                        <svg viewBox="0 0 200 30" className="w-full h-full stroke-red-400 fill-none" strokeWidth="2">
                          <path d="M 0,15 L 40,15 L 50,5 L 60,25 L 70,5 L 80,15 L 120,15 L 130,2 L 140,28 L 150,8 L 160,15 L 200,15" />
                        </svg>
                      </div>
                    </div>

                    {/* 2. Stress Tracking */}
                    <div
                      className={`p-4 rounded-2xl border transition-all ${
                        isDark ? 'bg-[#0d111d] border-emerald-500/30 shadow-lg' : 'bg-white border-emerald-300 shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-400 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Smile className="w-3.5 h-3.5" /> STRESS TRACKING
                        </span>
                        <span className="text-[11px] opacity-75">Sympathetic: 8%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-cinzel font-extrabold text-emerald-300">{stressLevel}%</div>
                          <div className="text-[11px] font-semibold text-emerald-400">Well balanced & calm</div>
                        </div>
                        <div className="w-14 h-14 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 flex items-center justify-center font-mono text-xs font-bold text-emerald-300">
                          {stressLevel}%
                        </div>
                      </div>
                    </div>

                    {/* 3. Longevity & Cellular Age */}
                    <div
                      className={`p-4 rounded-2xl border transition-all ${
                        isDark ? 'bg-[#0d111d] border-purple-500/30 shadow-lg' : 'bg-white border-purple-300 shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-400 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> LONGEVITY SCORE
                        </span>
                        <span className="text-[11px] opacity-75">Bio-Age: -7 Yrs</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-cinzel font-extrabold text-purple-300">{longevityScore}</div>
                          <div className="text-[11px] font-semibold text-emerald-400">Building a healthier tomorrow</div>
                        </div>
                        <div className="w-14 h-14 rounded-full border-4 border-purple-500/20 border-t-purple-400 flex items-center justify-center font-mono text-xs font-bold text-purple-300">
                          <Dna className="w-5 h-5 text-purple-400" />
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

                {/* ----------------------------------------------------------------- */}
                {/* WELLNESS TRENDS CHART & AI RECOMMENDATIONS (From Image 1 Bottom) */}
                {/* ----------------------------------------------------------------- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Wellness Trends (7 cols) */}
                  <div
                    className={`lg:col-span-7 p-5 rounded-3xl border ${
                      isDark ? 'bg-[#0d111d] border-cyan-500/30' : 'bg-white border-cyan-300 shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                        <h3 className="font-cinzel font-bold text-sm">WELLNESS TRENDS</h3>
                      </div>
                      <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/10 text-xs font-mono">
                        {(['weeks', 'months', 'years'] as const).map((r) => (
                          <button
                            key={r}
                            onClick={() => setTrendRange(r)}
                            className={`px-2.5 py-0.5 rounded-lg uppercase transition-all ${
                              trendRange === r ? 'bg-cyan-500 text-black font-bold' : 'opacity-60 hover:opacity-100'
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chart SVG */}
                    <div className="relative h-40 w-full flex items-end">
                      <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible">
                        {/* Grid lines */}
                        <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                        <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                        <line x1="0" y1="90" x2="400" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

                        {/* Recovery Trend Curve (Cyan) */}
                        <path
                          d="M 0,90 Q 70,80 130,50 T 260,30 T 400,15"
                          fill="none"
                          stroke="#22d3ee"
                          strokeWidth="3"
                        />
                        {/* Longevity Trend Curve (Gold) */}
                        <path
                          d="M 0,105 Q 80,95 160,70 T 290,45 T 400,25"
                          fill="none"
                          stroke="#fbbf24"
                          strokeWidth="2.5"
                        />
                      </svg>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono opacity-70 mt-2">
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" /> Recovery Index
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Longevity & Epigenetics
                      </span>
                      <span className="text-emerald-400 font-bold">Consistent Progress for a Better You</span>
                    </div>
                  </div>

                  {/* AI-Powered Recommendations (5 cols) */}
                  <div
                    className={`lg:col-span-5 p-5 rounded-3xl border space-y-3 ${
                      isDark ? 'bg-[#0d111d] border-emerald-500/30' : 'bg-white border-emerald-300 shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="w-4 h-4 text-emerald-400" />
                      <h3 className="font-cinzel font-bold text-sm">AI-POWERED RECOMMENDATIONS</h3>
                    </div>

                    {[
                      { title: 'IMPROVE RECOVERY', desc: 'Solfeggio 528Hz laser reduces inflammatory cytokines.', icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> },
                      { title: 'OPTIMIZE SLEEP TIMING', desc: 'AI calculates ideal sleep window at 10:45 PM.', icon: <Moon className="w-3.5 h-3.5 text-cyan-400" /> },
                      { title: 'MAINTAIN HYDRATION', desc: 'Drink 400ml water with Himalayan pink salt.', icon: <Droplets className="w-3.5 h-3.5 text-blue-400" /> },
                      { title: 'SUPPORT DAILY MOVEMENT', desc: 'Active Cal: 568 kcal • 8,756 steps achieved.', icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> },
                    ].map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-black/20 border border-white/5 flex items-start gap-2.5">
                        <div className="p-1.5 rounded-lg bg-white/5 flex-shrink-0 mt-0.5">{item.icon}</div>
                        <div>
                          <div className="text-[11px] font-mono font-bold text-emerald-300">{item.title}</div>
                          <div className="text-[10px] opacity-75 font-serif">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* VIEW: SOUND HEALING THERAPY & CYMATICS EEG (BUDDHIST MANTRAS & BOWLS) */}
            {/* --------------------------------------------------------------------- */}
            {activePortalView === 'sound_healing' && (
              <div className="space-y-8">
                {/* Hero Header */}
                <div className="text-center space-y-1 max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/30">
                    <TibetanBowl3DIcon size={14} interactive={false} showGlow={false} ringing={true} />
                    <span>BUDDHIST NADA YOGA • CYMATICS & BRAIN EEG ENTROPY</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-cinzel font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300">
                    SACRED SOUND HEALING & CYMATICS
                  </h1>
                  <p className="text-xs sm:text-sm opacity-80 font-serif max-w-2xl mx-auto">
                    Experience real-time water wave cymatics (Faraday geometry) and 3D synaptic EEG brainwave entrainment harmonized with authentic Tibetan singing bowls and Buddhist Medicine healing mantras.
                  </p>
                </div>

                {/* Live Cymatics & Brain EEG Dual Interactive Visualizer */}
                <CymaticsBrainVisualizer
                  theme={theme}
                  initialFrequency={528}
                  showControls={true}
                />

                {/* Quick Action Bowl & Mantra Deck */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tibetan Singing Bowls Quick Launch */}
                  <div
                    className={`p-5 rounded-3xl border space-y-4 ${
                      isDark ? 'bg-[#0d111d] border-amber-500/30' : 'bg-white border-amber-300 shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TibetanBowl3DIcon size={20} interactive={false} showGlow={false} ringing={true} />
                        <h3 className="font-cinzel font-bold text-base text-amber-300">Tibetan Singing Bowls</h3>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        7 Metallo-Therapy Bowls
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        { name: 'Root (Muladhara)', note: 'C • 256 Hz', hz: 256, color: '#ef4444' },
                        { name: 'Sacral (Svadhisthana)', note: 'D • 288 Hz', hz: 288, color: '#f97316' },
                        { name: 'Solar Plexus (Manipura)', note: 'E • 320 Hz', hz: 320, color: '#eab308' },
                        { name: 'Heart (Anahata)', note: 'F • 341.3 Hz', hz: 341.3, color: '#10b981' },
                        { name: 'Throat (Vishuddha)', note: 'G • 384 Hz', hz: 384, color: '#06b6d4' },
                        { name: 'Third Eye (Ajna)', note: 'A • 426.7 Hz', hz: 426.7, color: '#6366f1' },
                      ].map((bowl, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            cosmicAudio.playFrequencyTone(bowl.hz, 0.2, 'sine');
                            confetti({ particleCount: 15, spread: 45, origin: { y: 0.8 } });
                          }}
                          className="p-3 rounded-2xl bg-black/40 border border-amber-500/20 hover:border-amber-400 hover:bg-amber-500/10 transition-all text-left group cursor-pointer"
                        >
                          <div className="text-[11px] font-bold truncate group-hover:text-amber-300" style={{ color: bowl.color }}>
                            {bowl.name}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">{bowl.note}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Medicine Buddha & Sacred Mantra Quick Launch */}
                  <div
                    className={`p-5 rounded-3xl border space-y-4 ${
                      isDark ? 'bg-[#0d111d] border-cyan-500/30' : 'bg-white border-cyan-300 shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-cyan-400" />
                        <h3 className="font-cinzel font-bold text-base text-cyan-300">Buddhist Medicine Mantras</h3>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        Sanskrit & Tibetan Nada
                      </span>
                    </div>

                    <div className="space-y-2">
                      {[
                        {
                          name: 'Medicine Buddha Mantra (Sangye Menla)',
                          mantra: 'Tayata Om Bekanze Bekanze Maha Bekanze Radza Samudgate Soha',
                          benefit: 'Eradicates the 3 poisons (attachment, aversion, delusion) & cellular illness',
                          hz: 528
                        },
                        {
                          name: 'Compassion Mantra (Chenrezig)',
                          mantra: 'Om Mani Padme Hum',
                          benefit: 'Transforms negative emotions into clear rainbow light & vagus nerve calm',
                          hz: 432
                        },
                        {
                          name: 'Green Tara Quick Liberation',
                          mantra: 'Om Tare Tuttare Ture Soha',
                          benefit: 'Instant relief from fear, panic, and energetic blockages',
                          hz: 639
                        }
                      ].map((m, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-2xl bg-black/40 border border-cyan-500/20 hover:border-cyan-400/50 transition-all flex items-center justify-between gap-3"
                        >
                          <div className="space-y-0.5 flex-1 min-w-0">
                            <div className="text-xs font-cinzel font-bold text-cyan-200 truncate">{m.name}</div>
                            <div className="text-[11px] font-serif italic text-amber-300/90 truncate">&ldquo;{m.mantra}&rdquo;</div>
                            <div className="text-[10px] text-slate-400 truncate">{m.benefit}</div>
                          </div>
                          <button
                            onClick={() => {
                              cosmicAudio.playFrequencyTone(m.hz, 0.25, 'sine');
                              confetti({ particleCount: 20, spread: 60 });
                            }}
                            className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Play {m.hz}Hz</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Navigation link to full Mind Healing Screen / Sound Healing suite */}
                {onNavigateToFullChamber && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 border border-amber-500/30 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <TibetanBowl3DIcon size={20} interactive={false} showGlow={false} ringing={true} />
                      <span className="text-xs sm:text-sm font-cinzel font-bold text-amber-200">
                        Want the full Tibetan 7-Bowl interactive striking studio & Buddhist scriptures?
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToFullChamber('mind-healing');
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500 text-black font-cinzel font-bold text-xs hover:bg-amber-400 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                    >
                      <span>Open Full Mind Wellness Suite</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* --------------------------------------------------------------------- */}
            {activePortalView === 'science_of_rest' && (
              <div className="space-y-6">
                
                {/* Hero Banner */}
                <div className="text-center space-y-1 max-w-2xl mx-auto">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/30">
                    <Moon className="w-3.5 h-3.5" />
                    <span>BIOHACK YOUR SLEEP • MASTER YOUR BIOLOGY</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-cinzel font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-cyan-300 to-emerald-200">
                    THE SCIENCE OF REST
                  </h1>
                  <p className="text-xs sm:text-sm opacity-80 font-serif">
                    Sleep isn’t a luxury — it’s a biological imperative for cellular rejuvenation & cognitive genius.
                  </p>
                </div>

                {/* 3 Columns: Sleep Architecture Stages, Circadian Protocol, Advanced Biohacks */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Card 1: Sleep Stages Matter */}
                  <div
                    className={`p-5 rounded-3xl border space-y-4 ${
                      isDark ? 'bg-[#0d111d] border-indigo-500/30' : 'bg-white border-indigo-300 shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-indigo-400" />
                      <h3 className="font-cinzel font-bold text-sm">SLEEP STAGES ARCHITECTURE</h3>
                    </div>

                    <div className="space-y-3">
                      {[
                        { stage: 'STAGE 1 • LIGHT SLEEP', range: '5-10%', desc: 'Transition phase. Body relaxes, brain alpha waves slow.' },
                        { stage: 'STAGE 2 • TRUE SLEEP', range: '45-55%', desc: 'Body temp drops, heart rate slows, memory consolidation.' },
                        { stage: 'STAGE 3 • DEEP SLEEP', range: '15-25%', desc: 'Growth hormone released. Tissue repair & immune boost.' },
                        { stage: 'REM • DREAM STAGE', range: '20-25%', desc: 'Emotional regulation, creativity & glymphatic brain detox.' },
                      ].map((st, i) => (
                        <div key={i} className="p-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-1">
                          <div className="flex justify-between text-xs font-mono font-bold text-indigo-300">
                            <span>{st.stage}</span>
                            <span className="text-cyan-400">{st.range}</span>
                          </div>
                          <p className="text-[11px] opacity-75 font-serif">{st.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-serif space-y-1">
                      <span className="font-bold text-emerald-300">Glymphatic Detox System:</span>
                      <p className="text-[11px] opacity-80">During Deep & REM sleep, cerebrospinal fluid flushes amyloid plaque & metabolic toxins from neurons.</p>
                    </div>
                  </div>

                  {/* Card 2: The Perfect Night Protocol */}
                  <div
                    className={`p-5 rounded-3xl border space-y-4 ${
                      isDark ? 'bg-[#0d111d] border-cyan-500/30' : 'bg-white border-cyan-300 shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <h3 className="font-cinzel font-bold text-sm">THE PERFECT NIGHT PROTOCOL</h3>
                    </div>

                    <div className="space-y-3">
                      {[
                        { time: '2-3 HOURS BEFORE', action: 'Finish heavy eating. Avoid alcohol & high-carb meals.' },
                        { time: '1-2 HOURS BEFORE', action: 'Dim artificial lights. Wear blue-blockers & stop screens.' },
                        { time: '30-60 MINS BEFORE', action: 'Relax, read, 4-7-8 breathwork, warm magnesium shower.' },
                        { time: 'SLEEP TIME', action: 'Pitch black, cool room (16-19°C / 65°F), earthing sheet.' },
                      ].map((p, idx) => (
                        <div key={idx} className="p-3 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 space-y-1">
                          <div className="text-xs font-mono font-bold text-cyan-300">{p.time}</div>
                          <p className="text-[11px] opacity-75 font-serif">{p.action}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs font-serif space-y-1">
                      <span className="font-bold text-rose-300">Sleep Killers to Avoid:</span>
                      <p className="text-[11px] opacity-80">Blue light at night, caffeine past 1 PM, evening rumination, heated bedroom.</p>
                    </div>
                  </div>

                  {/* Card 3: Advanced Biohacks & Supplements */}
                  <div
                    className={`p-5 rounded-3xl border space-y-4 ${
                      isDark ? 'bg-[#0d111d] border-emerald-500/30' : 'bg-white border-emerald-300 shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <h3 className="font-cinzel font-bold text-sm">ADVANCED REST BIOHACKS</h3>
                    </div>

                    <div className="space-y-2">
                      {[
                        { hack: 'Red Light Therapy (660nm)', effect: 'Enhances mitochondrial ATP & melatonin.' },
                        { hack: 'Cold Exposure / Cold Plunge', effect: 'Lowers core body temp for deeper slow-wave sleep.' },
                        { hack: 'Vagus Nerve 4-7-8 Breathwork', effect: 'Shifts nervous system from Fight/Flight to Rest/Digest.' },
                        { hack: 'Earthing & Grounding', effect: 'Neutralizes free radicals & lowers cortisol.' },
                      ].map((b, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                          <div className="text-xs font-mono font-bold text-emerald-300">{b.hack}</div>
                          <div className="text-[10px] opacity-75 font-serif">{b.effect}</div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs font-serif space-y-1.5">
                      <span className="font-bold text-amber-300">Synergistic Supplements:</span>
                      <div className="text-[11px] opacity-80 space-y-0.5 font-mono">
                        <div>• Magnesium Glycinate (400mg)</div>
                        <div>• L-Theanine (200mg)</div>
                        <div>• Apigenin (50mg chamomile extract)</div>
                        <div>• Glycine (3g before bed)</div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Quote Axiom */}
                <div
                  className={`p-4 rounded-2xl border text-center font-serif italic ${
                    isDark ? 'bg-black/40 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50 border-indigo-300 text-indigo-900'
                  }`}
                >
                  &ldquo;Rest is not a reward. It is a biological requirement. Protect your sleep — protect your supreme potential.&rdquo;
                </div>

              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* VIEW 3: CELLULAR LASER & SOLFEGGIO CHAMBER */}
            {/* --------------------------------------------------------------------- */}
            {activePortalView === 'cellular_laser' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl border bg-amber-500/10 border-amber-500/30 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="font-cinzel font-bold text-amber-300 text-base">Bio-Photonic Cellular Laser Chamber</h3>
                    <p className="text-xs opacity-80 font-serif">Focus coherent light photons onto any organ to eliminate cellular distortion.</p>
                  </div>
                  {onNavigateToFullChamber && (
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToFullChamber('mind-healing');
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500 text-black font-cinzel font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
                    >
                      <span>Open Fullscreen Mind Healing Suite</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Quick Solfeggio Matrix Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { hz: 174, label: 'Pain Relief' },
                    { hz: 285, label: 'Tissue Repair' },
                    { hz: 396, label: 'Release Fear' },
                    { hz: 432, label: 'Homeostasis' },
                    { hz: 528, label: 'DNA Repair' },
                  ].map((s) => (
                    <button
                      key={s.hz}
                      onClick={() => toggleSoundscape(s.hz)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isAudioPlaying && activeFreq === s.hz
                          ? 'bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                          : 'bg-black/30 border-white/10 hover:border-amber-400/50'
                      }`}
                    >
                      <div className="text-sm font-mono font-bold">{s.hz} Hz</div>
                      <div className="text-[11px] opacity-75">{s.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* VIEW 4: VAGUS NERVE ENGINE */}
            {/* --------------------------------------------------------------------- */}
            {activePortalView === 'vagus_engine' && (
              <div className="space-y-6 text-center max-w-xl mx-auto">
                <div className="space-y-2">
                  <h3 className="text-xl font-cinzel font-bold text-emerald-300">Vagus Nerve Cholinergic Anti-Inflammatory Reflex</h3>
                  <p className="text-xs opacity-80 font-serif">
                    Activate the 10th cranial nerve to downregulate TNF-alpha and interleukins within 4 minutes.
                  </p>
                </div>

                {/* Pulsing Breathing Orb */}
                <div className="py-8 flex flex-col items-center justify-center">
                  <div className="w-40 h-40 rounded-full border-4 border-emerald-400/80 bg-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.5)] flex flex-col items-center justify-center animate-pulse">
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-300 font-bold">4-7-8 Rhythm</span>
                    <span className="text-3xl font-cinzel font-extrabold text-amber-300">Inhale 4s</span>
                  </div>
                </div>

                {onNavigateToFullChamber && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToFullChamber('mind-healing');
                    }}
                    className="px-6 py-2.5 rounded-2xl bg-emerald-500 text-black font-cinzel font-bold text-xs inline-flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Launch Full Interactive Breathing Pacer</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* VIEW 5: UNIVERSAL ANY-ILLNESS AI HEALER */}
            {/* --------------------------------------------------------------------- */}
            {activePortalView === 'ai_disease_healer' && (
              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-cinzel font-bold text-rose-300">Universal Disease Epigenetic Healer (AI)</h3>
                  <p className="text-xs opacity-80 font-serif">Enter any disease or chronic ailment to generate custom subconscious mind-commands.</p>
                </div>

                <div className="p-6 rounded-3xl border bg-black/40 border-rose-500/30 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-rose-300 uppercase">Target Illness / Symptom</label>
                    <input
                      type="text"
                      placeholder="e.g. Hypertension, Migraine, Autoimmune inflammation, Sciatica..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/20 text-sm focus:border-rose-400 outline-none"
                    />
                  </div>

                  {onNavigateToFullChamber && (
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToFullChamber('mind-healing');
                      }}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 text-black font-cinzel font-bold text-sm cursor-pointer shadow-lg"
                    >
                      Generate Epigenetic Protocol in Full Suite
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* ========================================================================= */}
          {/* PORTAL BOTTOM TELEMETRY FOOTER */}
          {/* ========================================================================= */}
          <div
            className={`px-4 sm:px-6 py-2.5 border-t flex items-center justify-between text-[11px] font-mono opacity-80 ${
              isDark ? 'bg-[#06070d] border-emerald-500/20 text-emerald-400' : 'bg-slate-200 border-slate-300 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Biofield Quantum Status: Coherent (99.4%)</span>
            </div>
            <div>
              <span>ALTERME HEALTH PROTOCOL • 528 Hz DNA HARMONIC</span>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
