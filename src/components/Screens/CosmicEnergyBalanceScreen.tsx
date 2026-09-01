import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowLeft, 
  Sun, 
  Flame, 
  Heart, 
  ShieldCheck, 
  RotateCcw, 
  Share2, 
  Compass,
  Radio,
  BookOpen,
  Volume2
} from 'lucide-react';
import { ScreenType, ThemeMode, UserProfile } from '../../types';
import { GoldenLotusScaleVisualizer } from '../EnergyBalance/GoldenLotusScaleVisualizer';
import { DualEnergySplitHero } from '../EnergyBalance/DualEnergySplitHero';
import { WisdomSanctumsDeck } from '../EnergyBalance/WisdomSanctumsDeck';
import { FrostedCatalystCockpit } from '../EnergyBalance/FrostedCatalystCockpit';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

interface CosmicEnergyBalanceScreenProps {
  theme: ThemeMode;
  user: UserProfile;
  onNavigate: (screen: ScreenType) => void;
  onUpdateUserKarma?: (newPunya: number, newPapa: number) => void;
}

export const CosmicEnergyBalanceScreen: React.FC<CosmicEnergyBalanceScreenProps> = ({
  theme,
  user,
  onNavigate,
  onUpdateUserKarma,
}) => {
  const [transmutedTraits, setTransmutedTraits] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<'all' | 'scales' | 'split' | 'sanctums' | 'cockpit'>('all');

  const positiveEnergyCount = (user.punyaScore || 1080) + transmutedTraits.length * 108;
  const negativeEnergyCount = Math.max(0, (user.papaScore || 420) - transmutedTraits.length * 70);

  const handleTransmute = (negativeId: string, positiveId: string) => {
    if (!transmutedTraits.includes(negativeId)) {
      const newTransmuted = [...transmutedTraits, negativeId];
      setTransmutedTraits(newTransmuted);

      const newPunya = (user.punyaScore || 1080) + 108;
      const newPapa = Math.max(0, (user.papaScore || 420) - 70);

      if (onUpdateUserKarma) {
        onUpdateUserKarma(newPunya, newPapa);
      }
    }
  };

  const handleTransmuteAll = () => {
    const allNegIds = ['complain', 'sadness', 'lazy', 'selfish', 'hate', 'regret', 'ego', 'greed', 'anger', 'violent', 'lie', 'cheat', 'hurt', 'disrespect'];
    setTransmutedTraits(allNegIds);

    const bonusPunya = (user.punyaScore || 1080) + allNegIds.length * 108;
    const clearedPapa = 0;

    try {
      cosmicAudio.playCosmicChime(963);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#f59e0b', '#ec4899', '#10b981', '#ffffff']
      });
    } catch {}

    if (onUpdateUserKarma) {
      onUpdateUserKarma(bonusPunya, clearedPapa);
    }
  };

  const handleResetBalance = () => {
    setTransmutedTraits([]);
    if (onUpdateUserKarma) {
      onUpdateUserKarma(1080, 420);
    }
  };

  return (
    <div 
      id="cosmic-energy-balance-screen"
      className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 pb-28 space-y-8"
    >
      {/* Top Header Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-3xl bg-black/70 border border-amber-500/30 backdrop-blur-xl shadow-lg">
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('landing')}
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-2 text-xs font-mono transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Return to Sanctum</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase bg-amber-950/90 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                ऊर्जा सन्तुलन एवं कर्म निर्णय
              </span>
              <span className="text-[11px] font-mono text-emerald-400">Harmonic Equinox</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-cinzel font-bold text-white mt-0.5">
              Choose Your Energy & Karmic Equilibrium
            </h1>
          </div>
        </div>

        {/* Filter / Jump Section Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: 'Full Sanctuary' },
            { id: 'scales', label: 'Lotus Scales' },
            { id: 'split', label: 'Energy Split' },
            { id: 'sanctums', label: '4 Houses' },
            { id: 'cockpit', label: 'Prompt Cockpit' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSection(tab.id as any);
                try {
                  cosmicAudio.playFrequency(528);
                } catch {}
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                activeSection === tab.id
                  ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                  : 'bg-black/50 border border-white/10 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* 1. THE GOLDEN LOTUS SCALES OF COSMIC EQUILIBRIUM (Image 2) */}
      {(activeSection === 'all' || activeSection === 'scales') && (
        <section id="section-lotus-scales" className="w-full">
          <GoldenLotusScaleVisualizer
            positiveEnergyCount={positiveEnergyCount}
            negativeEnergyCount={negativeEnergyCount}
            onResetBalance={handleResetBalance}
            onTransmuteAll={handleTransmuteAll}
            isDark={theme === 'dark'}
          />
        </section>
      )}

      {/* 2. CHOOSE YOUR ENERGY DUAL-SPLIT DECK (Image 1 & Image 6) */}
      {(activeSection === 'all' || activeSection === 'split') && (
        <section id="section-dual-split" className="w-full">
          <DualEnergySplitHero
            onTransmute={handleTransmute}
            transmutedTraits={transmutedTraits}
          />
        </section>
      )}

      {/* 3. 4 SACRED HOUSE SANCTUMS (Images 4 & 5: Emerald Serpent & Sapphire Eagle) */}
      {(activeSection === 'all' || activeSection === 'sanctums') && (
        <section id="section-wisdom-sanctums" className="w-full">
          <WisdomSanctumsDeck />
        </section>
      )}

      {/* 4. FROSTED GLASS CATALYST COCKPIT & PROMPT GENERATOR (Image 3 & Image 6) */}
      {(activeSection === 'all' || activeSection === 'cockpit') && (
        <section id="section-catalyst-cockpit" className="w-full">
          <FrostedCatalystCockpit />
        </section>
      )}

    </div>
  );
};
