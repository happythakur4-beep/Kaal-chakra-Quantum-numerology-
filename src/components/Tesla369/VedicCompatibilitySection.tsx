import React, { useState, useMemo } from 'react';
import { CelestialBodyData, UserProfile } from '../../types';
import {
  calculateVedicPlanetCompatibility,
  VedicCompatibilityResult,
} from '../../utils/vedicCompatibilityEngine';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Zap,
  Shield,
  Compass,
  Volume2,
  VolumeX,
  Calendar,
  Clock,
  MapPin,
  Flame,
  Droplets,
  Wind,
  Layers,
  HeartHandshake,
  Eye,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  FastForward,
  Award,
  BookOpen,
  Share2,
  Copy,
  Check,
  User,
  Sliders,
} from 'lucide-react';

interface VedicCompatibilitySectionProps {
  body: CelestialBodyData;
  user?: UserProfile;
  onJumpToTemple?: () => void;
}

export const VedicCompatibilitySection: React.FC<VedicCompatibilitySectionProps> = ({
  body,
  user,
  onJumpToTemple,
}) => {
  // Current or Simulated Transit Date
  const [transitDate, setTransitDate] = useState<Date>(new Date());
  const [isPlayingMantraAudio, setIsPlayingMantraAudio] = useState(false);
  const [japaCount, setJapaCount] = useState(0);
  const [hasCopied, setHasCopied] = useState(false);
  const [isEditingBirthData, setIsEditingBirthData] = useState(false);

  // Editable user birth state
  const [customBirthDate, setCustomBirthDate] = useState(user?.birthDate || '1996-07-14');
  const [customBirthTime, setCustomBirthTime] = useState(user?.birthTime || '06:45');
  const [customBirthCity, setCustomBirthCity] = useState(user?.birthCity || 'Varanasi, India');
  const [customUserName, setCustomUserName] = useState(user?.name || 'Anya Sharma');

  // Custom User Profile wrapper
  const effectiveUser: UserProfile = useMemo(() => {
    return {
      name: customUserName,
      email: user?.email || 'user@vedicnexus.org',
      birthDate: customBirthDate,
      birthTime: customBirthTime,
      birthCity: customBirthCity,
      learningResonance: user?.learningResonance || 78,
      avatarUrl: user?.avatarUrl || '',
      activeAura: user?.activeAura || 'Calm Amber',
      unlockedModules: user?.unlockedModules || [],
    };
  }, [user, customUserName, customBirthDate, customBirthTime, customBirthCity]);

  // Dynamically calculate compatibility
  const compatibility: VedicCompatibilityResult = useMemo(() => {
    return calculateVedicPlanetCompatibility(body, effectiveUser, transitDate);
  }, [body, effectiveUser, transitDate]);

  // Audio tone toggle
  const toggleMantraAudio = () => {
    if (isPlayingMantraAudio) {
      cosmicAudio.stopFrequencyTone();
      setIsPlayingMantraAudio(false);
    } else {
      cosmicAudio.playPlanetTone(compatibility.remedy.recommendedFrequencyHz);
      setIsPlayingMantraAudio(true);
    }
  };

  const handleJapaChant = () => {
    cosmicAudio.play369Chime(compatibility.remedy.recommendedFrequencyHz);
    setJapaCount((prev) => {
      const next = prev + 1;
      if (next === 108) {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#fbbf24', '#f59e0b', '#10b981', '#06b6d4'],
        });
      }
      return next;
    });
  };

  const handleQuickDate = (offsetDays: number | 'today' | 'birth') => {
    cosmicAudio.playCyberKeystroke();
    if (offsetDays === 'today') {
      setTransitDate(new Date());
    } else if (offsetDays === 'birth') {
      const bParts = customBirthDate.split('-').map(Number);
      if (bParts.length === 3) {
        setTransitDate(new Date(bParts[0], bParts[1] - 1, bParts[2]));
      }
    } else {
      const newD = new Date();
      newD.setDate(newD.getDate() + offsetDays);
      setTransitDate(newD);
    }
  };

  const handleCopyVerdict = () => {
    const text = `🌟 VEDIC COMPATIBILITY DOSSIER: ${body.name} & ${effectiveUser.name}\n` +
      `• Compatibility Score: ${compatibility.overallCompatibilityScore}% (${compatibility.grade})\n` +
      `• Verdict: ${compatibility.verdictTitle}\n` +
      `• Transit Position: ${compatibility.currentTransit.sign} (${compatibility.currentTransit.formattedDegree}) - ${compatibility.currentTransit.nakshatra} Nakshatra\n` +
      `• House from Moon: ${compatibility.gochara.moonHouseTitle} (${compatibility.gochara.moonHouseAuspicious ? 'Auspicious' : 'Remedial'})\n` +
      `• House from Lagna: ${compatibility.gochara.lagnaHouseTitle}\n` +
      `• Planetary Friendship: ${compatibility.friendship.compositeMaitri}\n` +
      `• Prescribed Mantra: ${compatibility.remedy.bijaMantraSanskrit}\n` +
      `• Recommended Gemstone: ${compatibility.remedy.ratnaGemstone}\n` +
      `• Vedic Nexus Astrological Engine`;
    navigator.clipboard?.writeText(text);
    setHasCopied(true);
    cosmicAudio.playCyberScan();
    setTimeout(() => setHasCopied(false), 2500);
  };

  // Color mapping based on score
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'from-emerald-400 via-teal-300 to-amber-300 text-emerald-300 border-emerald-400/60 shadow-[0_0_30px_rgba(16,185,129,0.4)]';
    if (score >= 70) return 'from-cyan-400 via-blue-400 to-amber-300 text-cyan-300 border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.4)]';
    if (score >= 55) return 'from-amber-400 to-orange-400 text-amber-300 border-amber-400/60 shadow-[0_0_30px_rgba(251,191,36,0.4)]';
    return 'from-rose-400 to-purple-400 text-rose-300 border-rose-400/60 shadow-[0_0_30px_rgba(244,63,94,0.4)]';
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-10">
      {/* 1. MASTER HERO: COMPATIBILITY GAUGE & SYNCHRONICITY VERDICT */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#060c1c]/90 via-[#0a1226]/80 to-[#030610]/95 border border-cyan-500/40 shadow-2xl relative overflow-hidden backdrop-blur-md"
      >
        {/* Background Sacred Geometric Glow */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-25"
          style={{ backgroundColor: body.color }}
        />

        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-cinzel font-black text-black text-xl shadow-lg shrink-0"
              style={{ backgroundColor: body.color }}
            >
              {body.teslaHarmonicNumber}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-white tracking-wide">
                  {body.name}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 font-serif">
                  {body.sanskritName || body.name}
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 font-mono">
                  ⚡ Vedic Kundli Synchronizer
                </span>
              </div>
              <p className="text-xs text-cyan-300/80 font-mono mt-0.5">
                Dynamic Celestial Gochara & Natal Birth Matrix for <span className="text-amber-300 font-bold">{effectiveUser.name}</span>
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditingBirthData(!isEditingBirthData)}
              className="px-3 py-1.5 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/70 border border-cyan-500/40 text-cyan-200 text-xs font-mono flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isEditingBirthData ? 'Close Editor' : 'Edit Birth Data'}</span>
            </button>

            <button
              onClick={handleCopyVerdict}
              className="px-3 py-1.5 rounded-xl bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/40 text-amber-200 text-xs font-mono flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              title="Copy Astrological Verdict"
            >
              {hasCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
              <span>{hasCopied ? 'Copied!' : 'Export Verdict'}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Birth Data Editor */}
        <AnimatePresence>
          {isEditingBirthData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-4 pt-4 border-t border-cyan-900/50"
            >
              <div className="p-4 rounded-2xl bg-black/70 border border-cyan-500/30 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div>
                  <label className="text-gray-400 block mb-1">User Name</label>
                  <input
                    type="text"
                    value={customUserName}
                    onChange={(e) => setCustomUserName(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-gray-900 border border-cyan-700/60 text-cyan-100 font-sans"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Birth Date (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    value={customBirthDate}
                    onChange={(e) => setCustomBirthDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-gray-900 border border-cyan-700/60 text-cyan-100 font-sans"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Birth Time (HH:MM)</label>
                  <input
                    type="time"
                    value={customBirthTime}
                    onChange={(e) => setCustomBirthTime(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-gray-900 border border-cyan-700/60 text-cyan-100 font-sans"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Birth City / Country</label>
                  <input
                    type="text"
                    value={customBirthCity}
                    onChange={(e) => setCustomBirthCity(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-gray-900 border border-cyan-700/60 text-cyan-100 font-sans"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Master Score & Dynamic Compatibility Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-6 items-center">
          {/* Radial Metric Dial */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-5 rounded-2xl bg-black/60 border border-cyan-500/30 text-center relative overflow-hidden">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Outer Circular Progress Ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke={compatibility.overallCompatibilityScore >= 70 ? '#10b981' : compatibility.overallCompatibilityScore >= 50 ? '#f59e0b' : '#f43f5e'}
                  strokeWidth="8"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * compatibility.overallCompatibilityScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black font-cinzel text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                  {compatibility.overallCompatibilityScore}%
                </span>
                <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
                  Vedic Resonance
                </span>
              </div>
            </div>

            <div className="mt-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${getScoreColor(compatibility.overallCompatibilityScore)}`}>
                {compatibility.grade}
              </span>
              <div className="text-xs text-gray-400 font-serif mt-2">
                Panchadha Maitri: <span className="text-amber-300 font-bold">{compatibility.friendship.compositeMaitri}</span>
              </div>
            </div>
          </div>

          {/* Astrological Verdict Narrative */}
          <div className="lg:col-span-8 space-y-3.5 p-5 rounded-2xl bg-black/60 border border-cyan-500/30">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>Jyotish Synchronicity Verdict</span>
            </div>

            <h3 className="text-base sm:text-lg font-cinzel font-bold text-cyan-100">
              {compatibility.verdictTitle}
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-serif">
              {compatibility.verdictDetailed}
            </p>

            {compatibility.gochara.specialTransitPhase && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/40 text-amber-200 text-xs font-mono flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                <span className="font-bold">{compatibility.gochara.specialTransitPhase}</span>
              </div>
            )}

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-center">
                <span className="text-gray-400 block text-[9px] uppercase">From Natal Moon</span>
                <span className="font-bold text-cyan-200">{compatibility.gochara.houseFromMoon}th Bhava</span>
              </div>
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-center">
                <span className="text-gray-400 block text-[9px] uppercase">From Ascendant</span>
                <span className="font-bold text-amber-200">{compatibility.gochara.houseFromLagna}th Bhava</span>
              </div>
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-center">
                <span className="text-gray-400 block text-[9px] uppercase">Transit Sign</span>
                <span className="font-bold text-pink-200">{compatibility.currentTransit.sign}</span>
              </div>
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-center">
                <span className="text-gray-400 block text-[9px] uppercase">Element Flow</span>
                <span className="font-bold text-emerald-300">{compatibility.elementHarmony.elementalCompatibility}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. TIME-TRAVEL TRANSIT SIMULATOR */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-cyan-900/60 font-mono text-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-cyan-300">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="font-bold uppercase tracking-wider">Transit Time-Travel Simulator:</span>
            <span className="text-amber-200 font-bold px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
              {compatibility.currentTransitDate}
            </span>
          </div>

          {/* Quick Jump Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => handleQuickDate('today')}
              className="px-2.5 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-bold transition-all"
            >
              Today (Live)
            </button>
            <button
              onClick={() => handleQuickDate(30)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition-all"
            >
              +1 Month
            </button>
            <button
              onClick={() => handleQuickDate(180)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition-all"
            >
              +6 Months
            </button>
            <button
              onClick={() => handleQuickDate(365)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition-all"
            >
              +1 Year
            </button>
            <button
              onClick={() => handleQuickDate('birth')}
              className="px-2.5 py-1 rounded-lg bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 transition-all"
              title="Calculate Natal Conjunction at Birth Day"
            >
              Natal Date
            </button>
          </div>
        </div>
      </div>

      {/* 3. THREE-COLUMN DEEP COMPARISON: CURRENT TRANSIT vs COSMIC LINK vs USER NATAL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* COLUMN 1: LIVE TRANSIT TELEMETRY */}
        <div className="p-5 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span className="font-cinzel font-bold text-cyan-100 text-sm">Active Transit Position</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
              {compatibility.currentTransit.isRetrograde ? 'Vakri (Retrograde)' : 'Margi (Direct)'}
            </span>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            <div className="flex justify-between p-2 rounded-lg bg-white/5">
              <span className="text-gray-400">Current Sign:</span>
              <span className="text-cyan-200 font-bold">{compatibility.currentTransit.sign} ({compatibility.currentTransit.signSanskrit})</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-white/5">
              <span className="text-gray-400">Degree & Minutes:</span>
              <span className="text-amber-300 font-bold">{compatibility.currentTransit.formattedDegree}</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-white/5">
              <span className="text-gray-400">Nakshatra:</span>
              <span className="text-pink-300 font-bold">{compatibility.currentTransit.nakshatra} (Pada {compatibility.currentTransit.pada})</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-white/5">
              <span className="text-gray-400">Nakshatra Lord:</span>
              <span className="text-cyan-300 font-bold">{compatibility.currentTransit.nakshatraLord}</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-white/5">
              <span className="text-gray-400">Cosmic Element:</span>
              <span className="text-emerald-300 font-bold">{compatibility.currentTransit.element}</span>
            </div>
          </div>
        </div>

        {/* COLUMN 2: GOCHARA & FRIENDSHIP DYNAMICS */}
        <div className="p-5 rounded-2xl bg-black/60 border border-amber-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-amber-400" />
              <span className="font-cinzel font-bold text-amber-100 text-sm">Gochara & Friendship</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30">
              {compatibility.friendship.compositeMaitri}
            </span>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 space-y-1">
              <div className="flex justify-between font-bold text-amber-300">
                <span>From Natal Moon (Janma Rashi):</span>
                <span>{compatibility.gochara.houseFromMoon}th House</span>
              </div>
              <p className="text-[11px] text-gray-300 font-sans leading-tight">
                {compatibility.gochara.moonHouseEffect}
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/20 space-y-1">
              <div className="flex justify-between font-bold text-cyan-300">
                <span>From Ascendant (Lagna):</span>
                <span>{compatibility.gochara.houseFromLagna}th House</span>
              </div>
              <p className="text-[11px] text-gray-300 font-sans leading-tight">
                {compatibility.gochara.lagnaHouseEffect}
              </p>
            </div>

            <div className="flex justify-between p-2 rounded-lg bg-white/5">
              <span className="text-gray-400">With Moon Lord ({compatibility.userNatal.moonLord}):</span>
              <span className="text-amber-200 font-bold">{compatibility.friendship.withMoonLord}</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-white/5">
              <span className="text-gray-400">With Lagna Lord ({compatibility.userNatal.lagnaLord}):</span>
              <span className="text-cyan-200 font-bold">{compatibility.friendship.withLagnaLord}</span>
            </div>
          </div>
        </div>

        {/* COLUMN 3: USER NATAL BIRTH BASELINE */}
        <div className="p-5 rounded-2xl bg-black/60 border border-purple-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-purple-400" />
              <span className="font-cinzel font-bold text-purple-100 text-sm">User Natal Kundli</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">
              {effectiveUser.name.split(' ')[0]}'s Chart
            </span>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            <div className="flex justify-between p-2 rounded-lg bg-white/5">
              <span className="text-gray-400">Ascendant (Lagna):</span>
              <span className="text-purple-200 font-bold">{compatibility.userNatal.lagnaSign} ({compatibility.userNatal.lagnaLord})</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-white/5">
              <span className="text-gray-400">Moon Sign (Rashi):</span>
              <span className="text-cyan-200 font-bold">{compatibility.userNatal.moonSign} ({compatibility.userNatal.moonLord})</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-white/5">
              <span className="text-gray-400">Birth Nakshatra:</span>
              <span className="text-amber-200 font-bold">{compatibility.userNatal.moonNakshatra}</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-white/5">
              <span className="text-gray-400">Sun Sign (Surya):</span>
              <span className="text-orange-300 font-bold">{compatibility.userNatal.sunSign}</span>
            </div>
            {compatibility.userNatal.natalPlanetPosition && (
              <div className="flex justify-between p-2 rounded-lg bg-purple-950/40 border border-purple-500/30">
                <span className="text-gray-400">Natal {body.name.split(' ')[0]}:</span>
                <span className="text-pink-300 font-bold">
                  {compatibility.userNatal.natalPlanetPosition.sign} ({compatibility.userNatal.natalPlanetPosition.formattedDegree})
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. ACTIVE VEDIC DRISHTI (ASPECTS) & ELEMENTAL ALCHEMY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Vedic Aspects */}
        <div className="p-5 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Active Vedic Drishti (Planetary Aspects on Natal Points)</span>
          </div>

          <div className="space-y-2.5">
            {compatibility.aspects.map((asp, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between font-mono">
                  <span className="font-bold text-cyan-200">{asp.aspectType}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    asp.nature === 'Auspicious'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : asp.nature === 'Transformative'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {asp.nature}
                  </span>
                </div>
                <div className="text-[11px] text-gray-400 font-mono">Target: {asp.targetTarget}</div>
                <p className="text-gray-300 font-serif text-xs leading-relaxed">{asp.interpretation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Elemental Harmony */}
        <div className="p-5 rounded-2xl bg-black/60 border border-amber-500/30 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono tracking-widest uppercase">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Tattva Samanvaya (Elemental Matrix & Synergy)</span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/30 space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-gray-300">Elemental Compatibility:</span>
                <span className="text-amber-300 font-bold font-cinzel">{compatibility.elementHarmony.elementalCompatibility}</span>
              </div>
              <p className="text-xs text-gray-200 font-serif leading-relaxed">
                {compatibility.elementHarmony.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-center">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-gray-400 block text-[10px]">Planet Element</span>
                <span className="text-cyan-300 font-bold">{compatibility.elementHarmony.planetElement}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-gray-400 block text-[10px]">Moon Element</span>
                <span className="text-blue-300 font-bold">{compatibility.elementHarmony.moonElement}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-gray-400 block text-[10px]">Lagna Element</span>
                <span className="text-pink-300 font-bold">{compatibility.elementHarmony.lagnaElement}</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onJumpToTemple}
              className="w-full py-2 rounded-xl bg-white/10 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400 text-amber-200 text-xs font-cinzel font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Explore Graha Mythos in Sacred Temple (Depth 3)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. SACRED VEDIC UPAYAS & SOUND RESONANCE SUITE */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0c081e]/90 via-[#070b18]/90 to-[#02050e]/95 border border-amber-500/40 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-widest">
              <Award className="w-4 h-4" />
              <span>Prescribed Astrological Upayas & Remedial Resonance</span>
            </div>
            <h3 className="text-lg font-cinzel font-bold text-amber-100 mt-0.5">
              Harmonize & Overclock {body.name}'s Frequency Field
            </h3>
          </div>

          {/* Sound Synthesizer Player */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMantraAudio}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
                isPlayingMantraAudio
                  ? 'bg-amber-500 text-black border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.8)] animate-pulse'
                  : 'bg-black/60 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
              }`}
            >
              {isPlayingMantraAudio ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
              <span>{isPlayingMantraAudio ? `${compatibility.remedy.recommendedFrequencyHz} Hz Resonating` : 'Play Tone'}</span>
            </button>
          </div>
        </div>

        {/* Bija Mantra Recitation Card */}
        <div className="p-5 rounded-2xl bg-black/60 border border-amber-400/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">
              Sacred Vedic Bija Mantra (वैदिक बीज मंत्र)
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-400">Japa Count: <strong className="text-amber-300">{japaCount}</strong> / 108</span>
              <button
                onClick={handleJapaChant}
                className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs font-mono flex items-center gap-1 shadow-md transition-all cursor-pointer"
              >
                <span>Chant (जप)</span>
                <span>+1</span>
              </button>
            </div>
          </div>

          <div className="text-center py-2 space-y-1">
            <div className="text-2xl sm:text-3xl font-serif text-amber-200 font-bold tracking-wide drop-shadow-md">
              {compatibility.remedy.bijaMantraSanskrit}
            </div>
            <div className="text-xs sm:text-sm font-mono text-amber-400/90 italic">
              "{compatibility.remedy.bijaMantraEnglish}"
            </div>
          </div>
        </div>

        {/* Prescribed Remedies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-gray-400 block text-[10px] uppercase">Prescribed Ratna (Gemstone)</span>
            <span className="text-amber-300 font-bold block">{compatibility.remedy.ratnaGemstone}</span>
            <span className="text-gray-400 text-[10px]">Metal: {compatibility.remedy.metal}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-gray-400 block text-[10px] uppercase">Auspicious Day & Deity</span>
            <span className="text-cyan-300 font-bold block">{compatibility.remedy.auspiciousDay}</span>
            <span className="text-gray-400 text-[10px]">Deity: {compatibility.remedy.deity}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-gray-400 block text-[10px] uppercase">Color & Direction</span>
            <span className="text-pink-300 font-bold block">{compatibility.remedy.auspiciousColor}</span>
            <span className="text-gray-400 text-[10px]">Direction: {compatibility.remedy.direction}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-gray-400 block text-[10px] uppercase">Frequency Octave</span>
            <span className="text-emerald-300 font-bold block">{compatibility.remedy.recommendedFrequencyHz} Hz</span>
            <span className="text-gray-400 text-[10px]">Tesla Harmonic #{body.teslaHarmonicNumber}</span>
          </div>
        </div>

        {/* Sacred Offering & Affirmation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <span className="font-mono text-amber-300 font-bold block uppercase text-[11px]">
              Karmic Offering (दान / सेवा संकल्प)
            </span>
            <p className="text-gray-300 font-serif leading-relaxed">
              {compatibility.remedy.donationOrOffering}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <span className="font-mono text-cyan-300 font-bold block uppercase text-[11px]">
              Quantum Alignment Affirmation
            </span>
            <p className="text-gray-300 font-serif italic leading-relaxed">
              "{compatibility.remedy.affirmation}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
