import React, { useState, useEffect } from 'react';
import { UserProfile, ScreenType } from '../../types';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { motion } from 'motion/react';
import { 
  Scale, 
  Sparkles, 
  Flame, 
  TrendingUp, 
  ChevronRight, 
  SlidersHorizontal,
  Zap,
  ShieldCheck,
  Award
} from 'lucide-react';
import { KarmaBreakdownModal } from './KarmaBreakdownModal';

interface KarmaBalanceVisualizerProps {
  user: UserProfile;
  onUpdateUserKarma?: (newPunya: number, newPapa: number) => void;
  onNavigate?: (screen: ScreenType) => void;
  isDark?: boolean;
}

export const KarmaBalanceVisualizer: React.FC<KarmaBalanceVisualizerProps> = ({
  user,
  onUpdateUserKarma,
  onNavigate,
  isDark = true
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayScore, setDisplayScore] = useState<number>(() => {
    const punya = user.punyaScore ?? 1450;
    const papa = user.papaScore ?? 370;
    return punya - papa;
  });

  const [microFlux, setMicroFlux] = useState<number>(0);

  const punyaScore = user.punyaScore ?? 1450;
  const papaScore = user.papaScore ?? 370;
  const targetNetScore = punyaScore - papaScore;

  // Smooth numerical ticker animation towards target score
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayScore(prev => {
        if (prev === targetNetScore) return prev;
        const diff = targetNetScore - prev;
        const step = diff > 0 ? Math.ceil(diff / 5) : Math.floor(diff / 5);
        return prev + step;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [targetNetScore]);

  // Subtle real-time cosmic micro-flux pulse (representing active astral breathing)
  useEffect(() => {
    const fluxInterval = setInterval(() => {
      const randomFlux = (Math.random() * 0.4 - 0.2);
      setMicroFlux(Number(randomFlux.toFixed(2)));
    }, 3000);
    return () => clearInterval(fluxInterval);
  }, []);

  const totalWeight = punyaScore + papaScore || 1;
  const punyaRatio = Math.round((punyaScore / totalWeight) * 100);
  const papaRatio = 100 - punyaRatio;

  // Personalized Spiritual Insight Logic
  let insightTitle = "";
  let insightText = "";
  let InsightIcon = Scale;
  let iconColor = "";

  if (punyaRatio >= 75) {
    insightTitle = "Radiant Aura";
    insightText = "Your spiritual merit is exceptionally high. Continue your path of selfless service and consider guiding others on their dharma.";
    InsightIcon = Sparkles;
    iconColor = "text-emerald-400";
  } else if (punyaRatio >= 55) {
    insightTitle = "Harmonious Path";
    insightText = "Your karma is in positive alignment. Stay mindful of daily actions and maintain your current spiritual practices to elevate further.";
    InsightIcon = ShieldCheck;
    iconColor = "text-amber-400";
  } else if (punyaRatio >= 40) {
    insightTitle = "Delicate Balance";
    insightText = "Your cosmic scales are in delicate equilibrium. A focused period of meditation and conscious acts of kindness will tilt the balance favorably.";
    InsightIcon = Scale;
    iconColor = "text-blue-400";
  } else {
    insightTitle = "Period of Reflection";
    insightText = "The astral energies suggest a time for introspection. Engage in purifying rituals, chanting, and acts of compassion to clear karmic blockages.";
    InsightIcon = Flame;
    iconColor = "text-rose-400";
  }

  const handleOpenBreakdown = () => {
    cosmicAudio.playCosmicChime(528);
    setIsModalOpen(true);
  };

  const handleUserKarmaUpdate = (newPunya: number, newPapa: number) => {
    if (onUpdateUserKarma) {
      onUpdateUserKarma(newPunya, newPapa);
    }
  };

  return (
    <>
      <div 
        id="real-time-karma-balance-visualizer"
        className={`relative w-full rounded-2xl md:rounded-3xl p-3.5 sm:p-4 md:p-5 border transition-all duration-300 overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-r from-[#180f08]/95 via-[#0e0a06]/95 to-[#130b05]/95 border-amber-500/50 shadow-[0_0_35px_rgba(245,158,11,0.25),inset_0_0_20px_rgba(245,158,11,0.1)] hover:border-amber-400' 
            : 'bg-gradient-to-r from-amber-50 via-orange-50/70 to-amber-100/60 border-amber-500/60 shadow-[0_0_25px_rgba(217,119,6,0.18)]'
        }`}
      >
        {/* Subtle Ambient Nebula Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* 1. LEFT WING: KARMIC BALANCE BADGE & GLOWING TICKER */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3.5 w-full lg:w-auto">
            
            {/* Ornate Scale Icon / Ticker Crest */}
            <div 
              onClick={handleOpenBreakdown}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-800 p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.5)] cursor-pointer group shrink-0"
              title="Click to view detailed Karmic breakdown"
            >
              <div className="w-full h-full rounded-2xl bg-black/85 flex items-center justify-center group-hover:bg-black/70 transition-colors">
                <Scale className="w-6 h-6 text-amber-300 group-hover:scale-110 transition-transform animate-pulse" />
              </div>
            </div>

            {/* Main Glowing Number Ticker & Identity */}
            <div className="space-y-0.5 min-w-[170px]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-500/30">
                  REAL-TIME KARMIC BALANCE
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> LIVE
                </span>
              </div>

              {/* Glowing Numerical Score Ticker */}
              <div className="flex items-baseline gap-2">
                <motion.span 
                  className={`text-2xl sm:text-3xl md:text-4xl font-mono font-extrabold tracking-tight drop-shadow-[0_0_15px_rgba(245,158,11,0.6)] ${
                    displayScore >= 0 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-emerald-300' 
                      : 'text-rose-400'
                  }`}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {displayScore >= 0 ? `+${displayScore.toLocaleString()}` : displayScore.toLocaleString()}
                </motion.span>
                
                <span className="text-[11px] font-mono text-amber-300/80">
                  Net Punya ({punyaRatio}% Pure)
                </span>
              </div>
            </div>

            {/* Micro Flux / Velocity Indicator Pill */}
            <div className="hidden sm:flex flex-col justify-center px-3 py-1.5 rounded-xl bg-black/40 border border-amber-500/20 text-[11px] font-mono space-y-0.5">
              <span className="text-slate-400 text-[10px] uppercase">Prarabdha Flux</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" /> +12.4 / hr
              </span>
            </div>

          </div>

          {/* 2. CENTER: DUAL PUNYA VS PAPA RATIO BAR & SCRIPTURAL MINI BADGES */}
          <div className="w-full lg:flex-1 max-w-xl space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>पुण्य (Punya): +{punyaScore}</span>
              </span>
              
              <span className="text-amber-200/70 text-[10px] hidden md:inline">
                Sanchita Ocean: 92% Auspicious
              </span>

              <span className="text-rose-400 font-bold flex items-center gap-1">
                <Flame className="w-3 h-3 text-rose-400" />
                <span>पाप (Papa): -{papaScore}</span>
              </span>
            </div>

            {/* Shimmering Dynamic Ratio Meter */}
            <div className="relative w-full h-2.5 rounded-full bg-black/70 border border-amber-500/30 p-0.5 flex overflow-hidden shadow-inner">
              <div 
                className="h-full rounded-l-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-700 shadow-[0_0_12px_rgba(16,185,129,0.7)]"
                style={{ width: `${punyaRatio}%` }}
              />
              <div 
                className="h-full rounded-r-full bg-gradient-to-r from-orange-500 to-rose-600 transition-all duration-700 shadow-[0_0_12px_rgba(244,63,94,0.7)]"
                style={{ width: `${papaRatio}%` }}
              />
              {/* Center dividing needle */}
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/60 shadow-[0_0_4px_#fff]" />
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="text-emerald-300/90 font-semibold">{punyaRatio}% Sattva Purity</span>
              <span className="text-amber-400/90">⚖️ Karmic Equilibrium</span>
              <span className="text-rose-300/90 font-semibold">{papaRatio}% Deficit</span>
            </div>
          </div>

          {/* 3. RIGHT WING: 'BALANCE' ACTION BUTTON & SANCTUM SHORTCUT */}
          <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end">
            
            {/* THE REQUESTED 'BALANCE' BUTTON THAT OPENS BREAKDOWN MODAL */}
            <button
              id="open-karma-balance-modal-btn"
              onClick={handleOpenBreakdown}
              className="relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-black font-cinzel font-bold text-xs shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center gap-2 transition-all transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer shrink-0"
              aria-label="Open Karma Balance Breakdown"
            >
              <Scale className="w-4 h-4 text-black" />
              <span>Balance</span>
              {/* Pulsing ring */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-300"></span>
              </span>
            </button>

            {/* Direct Link to Energy Balance & Gita Confession Sanctum */}
            {onNavigate && (
              <button
                id="navigate-to-energy-balance-btn"
                onClick={() => {
                  cosmicAudio.playCosmicChime(528);
                  onNavigate('energy-balance');
                }}
                className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-950/90 to-yellow-950/90 hover:from-amber-900 hover:to-yellow-900 border border-amber-400/60 text-amber-200 text-xs font-mono font-medium flex items-center gap-1.5 transition-all shrink-0 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                title="Choose Your Energy & Lotus Balance"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Energy Balance</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            )}

            {onNavigate && (
              <button
                id="navigate-to-karma-screen-btn"
                onClick={() => {
                  cosmicAudio.playCosmicChime(432);
                  onNavigate('karma');
                }}
                className="px-3.5 py-2.5 rounded-xl bg-black/50 hover:bg-black/80 border border-amber-500/30 hover:border-amber-400/60 text-amber-200 text-xs font-mono font-medium flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
                title="Open full Karmic Ledger & Gita Sanctum"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="hidden sm:inline">Gita Sanctum</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            )}

          </div>

        </div>
      </div>

      {/* INSIGHT CARD SECTION */}
      <div className={`mt-3 sm:mt-4 relative w-full rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border transition-all duration-300 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-r from-black/80 to-[#120a05]/90 border-amber-500/20 shadow-inner' 
          : 'bg-white/80 border-amber-500/30 shadow-sm'
      }`}>
        <div className="flex items-start gap-3.5">
          <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl shrink-0 mt-0.5 ${isDark ? 'bg-black/60 border border-white/5 shadow-inner' : 'bg-amber-50 border border-amber-100'}`}>
            <InsightIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor}`} />
          </div>
          <div className="space-y-1 sm:space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className={`text-sm sm:text-base font-cinzel font-bold tracking-wide ${isDark ? 'text-amber-300' : 'text-[#8c5922]'}`}>
                Spiritual Insight
              </h4>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                isDark ? 'bg-amber-950/40 text-amber-400 border-amber-500/30' : 'bg-amber-100 text-amber-800 border-amber-200'
              }`}>
                {insightTitle}
              </span>
            </div>
            <p className={`text-xs sm:text-sm font-serif leading-relaxed ${isDark ? 'text-amber-100/70' : 'text-[#593b1b]'}`}>
              {insightText}
            </p>
          </div>
        </div>
      </div>

      {/* KARMA BREAKDOWN MODAL */}
      <KarmaBreakdownModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        onUpdateUserKarma={handleUserKarmaUpdate}
        onNavigate={onNavigate}
      />
    </>
  );
};
