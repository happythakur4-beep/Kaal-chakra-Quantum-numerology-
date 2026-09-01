import React, { useState } from 'react';
import { UserProfile, ScreenType } from '../../types';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scale,
  Sparkles,
  Flame,
  X,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Award,
  Zap,
  Heart,
  BookOpen,
  Feather,
  RefreshCw,
  ChevronRight,
  Sun,
  Activity,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface KarmaBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUserKarma: (newPunya: number, newPapa: number) => void;
  onNavigate?: (screen: ScreenType) => void;
}

export const KarmaBreakdownModal: React.FC<KarmaBreakdownModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUserKarma,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'quadrants' | 'debts' | 'actions'>('overview');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const punyaScore = user.punyaScore ?? 1450;
  const papaScore = user.papaScore ?? 370;
  const netKarma = punyaScore - papaScore;
  const totalWeight = punyaScore + papaScore || 1;
  const punyaRatio = Math.round((punyaScore / totalWeight) * 100);
  const papaRatio = 100 - punyaRatio;

  const handlePerformBalanceAction = (
    title: string,
    punyaDelta: number,
    papaDelta: number,
    freqHz: number = 528
  ) => {
    try {
      cosmicAudio.playFrequency(freqHz);
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#10b981', '#f59e0b', '#38bdf8']
      });
    } catch {}

    const updatedPunya = Math.max(0, punyaScore + punyaDelta);
    const updatedPapa = Math.max(0, papaScore - papaDelta);
    onUpdateUserKarma(updatedPunya, updatedPapa);

    setActionSuccessMsg(`✨ ${title}: Karma Balance Updated (+${punyaDelta > 0 ? punyaDelta : 0} Punya, -${papaDelta > 0 ? papaDelta : 0} Papa)`);
    setTimeout(() => {
      setActionSuccessMsg(null);
    }, 4000);
  };

  return (
    <AnimatePresence>
      <div 
        id="karma-breakdown-modal-backdrop" 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          id="karma-breakdown-modal-content"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl rounded-3xl border-2 border-amber-500/50 shadow-[0_0_60px_rgba(245,158,11,0.35)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
          style={{
            background: 'radial-gradient(ellipse at top, #1c130b 0%, #0d0805 60%, #050302 100%)'
          }}
        >
          {/* Subtle Ambient Cosmic Aura */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* 1. MODAL HEADER */}
          <div className="relative z-10 px-6 py-5 border-b border-amber-500/25 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center justify-center">
                <div className="w-full h-full rounded-2xl bg-black/80 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-amber-300 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                    कर्म तुला एवं पुण्य-पाप विश्लेषण
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">Live Cosmic Ledger</span>
                </div>
                <h3 className="text-xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-400">
                  Real-Time Karma Balance & Vedic Breakdown
                </h3>
              </div>
            </div>

            <button
              id="close-karma-modal-btn"
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10"
              aria-label="Close Karma Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. SUB-NAVIGATION TABS */}
          <div className="relative z-10 px-6 pt-3 pb-2 border-b border-amber-500/20 bg-black/30 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: '⚖️ Net Balance Overview', desc: 'Summary & Meter' },
              { id: 'quadrants', label: '🌌 4 Karmic Quadrants', desc: 'Sanchita & Prarabdha' },
              { id: 'debts', label: '📜 5 Sacred Rinas (Debts)', desc: 'Planetary Obligations' },
              { id: 'actions', label: '⚡ Instant Balance Actions', desc: 'Japa & Seva Boost' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  cosmicAudio.playFrequency(432);
                  setActiveTab(tab.id as any);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-amber-500/25 border border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                    : 'bg-black/40 hover:bg-black/60 border border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* 3. MODAL BODY */}
          <div className="relative z-10 p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
            
            {/* Feedback Alert if an action was taken */}
            {actionSuccessMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{actionSuccessMsg}</span>
              </motion.div>
            )}

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Grand Score Display Banner */}
                <div className="relative rounded-3xl p-6 border-2 border-amber-500/40 bg-gradient-to-br from-amber-950/40 via-black/60 to-emerald-950/30 overflow-hidden shadow-2xl">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    
                    {/* Left: Net Score Dial */}
                    <div className="flex items-center gap-5">
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-amber-400/80 bg-black/90 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.5)]">
                        <span className="text-[10px] font-mono text-amber-300/80 uppercase">Net Balance</span>
                        <span className={`text-2xl sm:text-3xl font-mono font-extrabold tracking-tight ${netKarma >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                          {netKarma > 0 ? `+${netKarma}` : netKarma}
                        </span>
                        <span className="text-[9px] font-mono text-emerald-400/90 flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" /> Auspicious
                        </span>
                        {/* Orbiting particle ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/40 animate-spin-slow pointer-events-none" />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-cinzel font-bold text-amber-200">Soul Resonance:</span>
                          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            {punyaRatio}% Sattvic Purity
                          </span>
                        </div>
                        <p className="text-xs text-amber-200/70 max-w-sm leading-relaxed">
                          Your karmic scale indicates a strong positive surplus (+{punyaScore} Merit vs -{papaScore} Deficit). Current planetary alignments favor continued spiritual discipline.
                        </p>
                      </div>
                    </div>

                    {/* Right: Quick Action to Gita Confession */}
                    {onNavigate && (
                      <button
                        onClick={() => {
                          onClose();
                          onNavigate('karma');
                        }}
                        className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-cinzel font-bold text-xs shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2 group transition-all shrink-0"
                      >
                        <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
                        <span>Enter Gita Confessional Sanctum</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>

                  {/* Dual Ratio Bar */}
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-300 font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Punya (Merit): +{punyaScore} ({punyaRatio}%)
                      </span>
                      <span className="text-rose-300 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Papa (Deficit): -{papaScore} ({papaRatio}%)
                      </span>
                    </div>

                    <div className="w-full h-3 rounded-full bg-black/80 border border-white/10 p-0.5 flex overflow-hidden">
                      <div 
                        className="h-full rounded-l-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                        style={{ width: `${punyaRatio}%` }}
                      />
                      <div 
                        className="h-full rounded-r-full bg-gradient-to-r from-rose-500 to-red-600 transition-all duration-700 shadow-[0_0_10px_rgba(244,63,94,0.5)]"
                        style={{ width: `${papaRatio}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between text-xs text-emerald-400 font-mono">
                      <span>Total Punya</span>
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-mono font-bold text-emerald-300">+{punyaScore} pts</div>
                    <p className="text-[11px] text-slate-400">Accrued through selfless seva, japa, and righteous dharma.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-rose-500/30 space-y-2">
                    <div className="flex items-center justify-between text-xs text-rose-400 font-mono">
                      <span>Active Papa</span>
                      <Flame className="w-4 h-4 text-rose-400" />
                    </div>
                    <div className="text-2xl font-mono font-bold text-rose-300">-{papaScore} pts</div>
                    <p className="text-[11px] text-slate-400">Can be dissolved through Prayashchitta & sacred Agni surrender.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/30 space-y-2">
                    <div className="flex items-center justify-between text-xs text-amber-400 font-mono">
                      <span>Rina Debt Index</span>
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-2xl font-mono font-bold text-amber-300">{user.karmaDebtPercent ?? 24}% Debt</div>
                    <p className="text-[11px] text-slate-400">Ancestral and cosmic obligations currently in active discharge.</p>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: 4 KARMIC QUADRANTS */}
            {activeTab === 'quadrants' && (
              <div className="space-y-4">
                <div className="text-xs text-amber-200/80 leading-relaxed font-mono">
                  According to Sanatana Dharma, karma operates across 4 distinct dimensional temporal layers:
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Sanchita */}
                  <div className="p-5 rounded-2xl bg-black/50 border border-amber-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase">१. संचित कर्म (Sanchita Karma)</span>
                      <span className="text-[10px] font-mono bg-amber-950 px-2 py-0.5 rounded text-amber-300">Total Accumulated Reservoir</span>
                    </div>
                    <h4 className="text-sm font-cinzel font-bold text-amber-100">The Vast Ocean of All Past Lives</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      The latent warehouse of all deeds across hundreds of incarnations awaiting ripening. Currently, your Sanchita balance is guarded by favorable Jupiter transits.
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs font-mono text-amber-300/80 border-t border-white/5">
                      <span>Reservoir Status:</span>
                      <span className="text-emerald-400 font-bold">Stable & Protected</span>
                    </div>
                  </div>

                  {/* Prarabdha */}
                  <div className="p-5 rounded-2xl bg-black/50 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase">२. प्रारब्ध कर्म (Prarabdha Karma)</span>
                      <span className="text-[10px] font-mono bg-emerald-950 px-2 py-0.5 rounded text-emerald-300">Present Life Manifestation</span>
                    </div>
                    <h4 className="text-sm font-cinzel font-bold text-emerald-100">The Arrow Already Released</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      The portion of Sanchita that has materialized into your current physical body, family lineage, and natal planetary chart (Lagna & D9).
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs font-mono text-emerald-300/80 border-t border-white/5">
                      <span>Trajectory Flow:</span>
                      <span className="text-emerald-400 font-bold">High Intuitive Clarity</span>
                    </div>
                  </div>

                  {/* Kriyamana */}
                  <div className="p-5 rounded-2xl bg-black/50 border border-cyan-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase">३. क्रियमाण कर्म (Kriyamana Karma)</span>
                      <span className="text-[10px] font-mono bg-cyan-950 px-2 py-0.5 rounded text-cyan-300">Free Will / Immediate Action</span>
                    </div>
                    <h4 className="text-sm font-cinzel font-bold text-cyan-100">Actions Created in Real-Time Today</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Your immediate choices, words, and thoughts created right now with your conscious free will (Purushartha).
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs font-mono text-cyan-300/80 border-t border-white/5">
                      <span>Daily Quality:</span>
                      <span className="text-cyan-400 font-bold">+45 pts Positive Rate</span>
                    </div>
                  </div>

                  {/* Agami */}
                  <div className="p-5 rounded-2xl bg-black/50 border border-purple-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-purple-400 uppercase">४. आगामी कर्म (Agami Karma)</span>
                      <span className="text-[10px] font-mono bg-purple-950 px-2 py-0.5 rounded text-purple-300">Future Karmic Trajectory</span>
                    </div>
                    <h4 className="text-sm font-cinzel font-bold text-purple-100">The Seeds of Future Incarnations</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      The subtle mental impressions (Samskaras) and plans that will crystallize into future circumstances and next births.
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs font-mono text-purple-300/80 border-t border-white/5">
                      <span>Spiritual Ascent:</span>
                      <span className="text-purple-400 font-bold">Moksha-Oriented</span>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 3: 5 SACRED RINAS (DEBTS) */}
            {activeTab === 'debts' && (
              <div className="space-y-4">
                <div className="text-xs text-amber-200/80 leading-relaxed font-mono">
                  The 5 Cosmic & Ancestral Debts (Pancha Maha-Rinas) described in Vedic Shastras:
                </div>

                <div className="space-y-3">
                  {[
                    {
                      name: 'Pitru Rina (पितृ ऋण - Ancestral Debt)',
                      desc: 'Debt to ancestors and parents. Discharged via Tarpan, Shraddha, family lineage respect & honoring elders.',
                      status: '78% Cleared',
                      color: 'emerald',
                    },
                    {
                      name: 'Deva Rina (देव ऋण - Celestial Debt)',
                      desc: 'Debt to cosmic deities and natural forces providing sunlight, rain & air. Discharged through Yajna, Agnihotra & Pancha Mahabhuta stewardship.',
                      status: '65% Cleared',
                      color: 'cyan',
                    },
                    {
                      name: 'Rishi Rina (ऋषि ऋण - Sage & Knowledge Debt)',
                      desc: 'Debt to ancient seers, gurus and scriptures. Discharged via daily Svadhyaya (Gita study), learning & sharing wisdom.',
                      status: '85% Cleared',
                      color: 'amber',
                    },
                    {
                      name: 'Manushya Rina (मनुष्य ऋण - Human Social Debt)',
                      desc: 'Debt to society, guests, and community. Discharged through Atithi Seva, charity, and fair wage treatment.',
                      status: '70% Cleared',
                      color: 'purple',
                    },
                    {
                      name: 'Bhuta Rina (भूत ऋण - Ecological & Animal Debt)',
                      desc: 'Debt to Mother Earth, cows, birds, trees and nature. Discharged via feeding cows (Gau Seva), birds and planting sacred Peepal/Tulsi.',
                      status: '60% Cleared',
                      color: 'emerald',
                    },
                  ].map((debt, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <h5 className="text-xs font-cinzel font-bold text-amber-200">{debt.name}</h5>
                        <p className="text-[11px] text-slate-300 max-w-xl">{debt.desc}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40 shrink-0">
                        {debt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: INSTANT ACTIONS */}
            {activeTab === 'actions' && (
              <div className="space-y-4">
                <div className="text-xs text-amber-200/80 leading-relaxed font-mono">
                  Perform immediate balancing actions to replenish positive Punya merit and neutralize accumulated subtle debts:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Action 1 */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/30 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-cinzel font-bold text-emerald-300">Maha-Mrityunjaya Japa</span>
                        <span className="text-xs font-mono text-emerald-400 font-bold">+25 Punya</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Chant the supreme life-protecting Shiva mantra for cellular and karmic rejuvenation.
                      </p>
                    </div>
                    <button
                      onClick={() => handlePerformBalanceAction('Maha-Mrityunjaya Japa', 25, 10, 432)}
                      className="w-full py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/50 text-emerald-200 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Perform Japa (+25)</span>
                    </button>
                  </div>

                  {/* Action 2 */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-amber-500/30 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-cinzel font-bold text-amber-300">Gau Seva & Annadanam</span>
                        <span className="text-xs font-mono text-amber-400 font-bold">+50 Punya</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Feed green grass to cows and provide meals to destitute seekers.
                      </p>
                    </div>
                    <button
                      onClick={() => handlePerformBalanceAction('Gau Seva & Annadanam', 50, 20, 528)}
                      className="w-full py-2 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 border border-amber-400/50 text-amber-200 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Heart className="w-3.5 h-3.5 text-amber-400" />
                      <span>Log Annadanam (+50)</span>
                    </button>
                  </div>

                  {/* Action 3 */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-cyan-500/30 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-cinzel font-bold text-cyan-300">528Hz DNA Biofield Coherence</span>
                        <span className="text-xs font-mono text-cyan-400 font-bold">+35 Punya</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Meditate on sacred Miracle tone to align mental intention with cosmic order.
                      </p>
                    </div>
                    <button
                      onClick={() => handlePerformBalanceAction('528Hz Meditation', 35, 15, 528)}
                      className="w-full py-2 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-400/50 text-cyan-200 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Activity className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Meditate (+35)</span>
                    </button>
                  </div>

                  {/* Action 4 */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-rose-500/30 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-cinzel font-bold text-rose-300">Gita Sin Agni Dissolution</span>
                        <span className="text-xs font-mono text-rose-400 font-bold">-40 Papa Neutralized</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Surrender unburdened guilt to the sacred Agni Kund fire of wisdom.
                      </p>
                    </div>
                    <button
                      onClick={() => handlePerformBalanceAction('Agni Dissolution', 30, 40, 639)}
                      className="w-full py-2 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 border border-rose-400/50 text-rose-200 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Flame className="w-3.5 h-3.5 text-rose-400" />
                      <span>Offer to Agni (-40 Papa)</span>
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* 4. MODAL FOOTER */}
          <div className="relative z-10 px-6 py-4 border-t border-amber-500/25 bg-black/60 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Current User:</span>
              <span className="text-amber-300 font-bold">{user.name}</span>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-cinzel text-xs font-bold transition-all"
            >
              Done / Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
