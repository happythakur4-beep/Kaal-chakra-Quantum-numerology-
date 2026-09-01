import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Sun, 
  Zap, 
  Heart, 
  Shield, 
  TrendingUp, 
  Lightbulb, 
  Smile, 
  Star, 
  HandHeart, 
  ShieldAlert, 
  HeartCrack, 
  Crown, 
  Coins, 
  Frown, 
  MessageSquareOff, 
  UserX, 
  Footprints, 
  Compass, 
  Eye, 
  CheckCircle2,
  Lock,
  Unlock,
  Radio,
  Share2
} from 'lucide-react';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

export interface EnergyTrait {
  id: string;
  name: string;
  hindi: string;
  category: 'negative' | 'positive';
  icon: React.ReactNode;
  pairedTraitId: string; // The positive pair it transmutes into
  description: string;
  frequencyHz: number;
}

export const DUAL_ENERGY_TRAITS: EnergyTrait[] = [
  // --- NEGATIVE ENERGY PILLARS (Image 1 & 6) ---
  {
    id: 'complain',
    name: 'COMPLAIN',
    hindi: 'शिकायत एवं असंतोष',
    category: 'negative',
    icon: <MessageSquareOff className="w-4 h-4" />,
    pairedTraitId: 'creative',
    description: 'Draining vocal friction that traps awareness in lack instead of potential.',
    frequencyHz: 174,
  },
  {
    id: 'sadness',
    name: 'SADNESS',
    hindi: 'विषाद एवं शोक',
    category: 'negative',
    icon: <Frown className="w-4 h-4" />,
    pairedTraitId: 'happy',
    description: 'Heavy low-vibration sinkhole contracting the heart chakra.',
    frequencyHz: 285,
  },
  {
    id: 'lazy',
    name: 'LAZY',
    hindi: 'आलस्य एवं प्रमाद',
    category: 'negative',
    icon: <UserX className="w-4 h-4" />,
    pairedTraitId: 'motivated',
    description: 'Tamasic inertia that paralyzes divine purpose and creative action.',
    frequencyHz: 396,
  },
  {
    id: 'selfish',
    name: 'SELFISH',
    hindi: 'स्वार्थ एवं संकीर्णता',
    category: 'negative',
    icon: <ShieldAlert className="w-4 h-4" />,
    pairedTraitId: 'help',
    description: 'Isolationist illusion that severs connection with the universal soul.',
    frequencyHz: 417,
  },
  {
    id: 'hate',
    name: 'HATE',
    hindi: 'द्वेष एवं घृणा',
    category: 'negative',
    icon: <HeartCrack className="w-4 h-4" />,
    pairedTraitId: 'forgiving',
    description: 'Corrosive psychic acid that poisons the bearer before any other.',
    frequencyHz: 396,
  },
  {
    id: 'regret',
    name: 'REGRET',
    hindi: 'पश्चाताप एवं ग्लानि',
    category: 'negative',
    icon: <Footprints className="w-4 h-4" />,
    pairedTraitId: 'peaceful',
    description: 'Looping temporal anchor clinging to what cannot be undone.',
    frequencyHz: 417,
  },
  {
    id: 'ego',
    name: 'EGO',
    hindi: 'अहंकार एवं दर्प',
    category: 'negative',
    icon: <Crown className="w-4 h-4" />,
    pairedTraitId: 'confidence',
    description: 'Brittle mask of superiority hiding deep metaphysical insecurity.',
    frequencyHz: 528,
  },
  {
    id: 'greed',
    name: 'GREED',
    hindi: 'लोभ एवं तृष्णा',
    category: 'negative',
    icon: <Coins className="w-4 h-4" />,
    pairedTraitId: 'give',
    description: 'Bottomless appetite mistaking hoarding for true abundance.',
    frequencyHz: 639,
  },
  {
    id: 'anger',
    name: 'ANGER',
    hindi: 'क्रोध एवं अमर्ष',
    category: 'negative',
    icon: <Flame className="w-4 h-4" />,
    pairedTraitId: 'peaceful',
    description: 'Unchecked wildfire destroying decades of accumulated spiritual merit.',
    frequencyHz: 396,
  },
  {
    id: 'violent',
    name: 'VIOLENT',
    hindi: 'हिंसा एवं आक्रामकता',
    category: 'negative',
    icon: <Zap className="w-4 h-4" />,
    pairedTraitId: 'bravery',
    description: 'Destructive physical and psychic assault generating severe karmic knots.',
    frequencyHz: 174,
  },
  {
    id: 'lie',
    name: 'LIE',
    hindi: 'असत्य एवं छल',
    category: 'negative',
    icon: <ShieldAlert className="w-4 h-4" />,
    pairedTraitId: 'truth',
    description: 'Distortion of reality that fractures the throat chakra and destiny line.',
    frequencyHz: 417,
  },
  {
    id: 'cheat',
    name: 'CHEAT',
    hindi: 'धोखा एवं विश्वासघात',
    category: 'negative',
    icon: <Lock className="w-4 h-4" />,
    pairedTraitId: 'trust',
    description: 'Theft of sacred faith creating severe reciprocal karmic debts.',
    frequencyHz: 285,
  },
  {
    id: 'hurt',
    name: 'HURT',
    hindi: 'पीड़ा एवं आघात',
    category: 'negative',
    icon: <HeartCrack className="w-4 h-4" />,
    pairedTraitId: 'heal',
    description: 'Inflicting wound upon another soul, which invariably returns as self-pain.',
    frequencyHz: 396,
  },
  {
    id: 'disrespect',
    name: 'DISRESPECT',
    hindi: 'अनादर एवं अवहेलना',
    category: 'negative',
    icon: <UserX className="w-4 h-4" />,
    pairedTraitId: 'respect',
    description: 'Denying the divine spark residing within fellow beings.',
    frequencyHz: 417,
  },

  // --- POSITIVE ENERGY PILLARS (Image 1 & 6) ---
  {
    id: 'creative',
    name: 'CREATIVE',
    hindi: 'सृजनशीलता एवं मौलिकता',
    category: 'positive',
    icon: <Lightbulb className="w-4 h-4" />,
    pairedTraitId: 'complain',
    description: 'Direct channel of cosmic creation channeling solutions into reality.',
    frequencyHz: 528,
  },
  {
    id: 'happy',
    name: 'HAPPY',
    hindi: 'आनंद एवं प्रसन्नता',
    category: 'positive',
    icon: <Smile className="w-4 h-4" />,
    pairedTraitId: 'sadness',
    description: 'Radiant heart resonance aligning the nervous system with bliss.',
    frequencyHz: 528,
  },
  {
    id: 'motivated',
    name: 'MOTIVATED',
    hindi: 'उत्साह एवं कर्मठता',
    category: 'positive',
    icon: <TrendingUp className="w-4 h-4" />,
    pairedTraitId: 'lazy',
    description: 'Pure Rajasic drive surrendered to divine Dharma and purpose.',
    frequencyHz: 639,
  },
  {
    id: 'confidence',
    name: 'CONFIDENCE',
    hindi: 'आत्मविश्वास एवं दृढ़ता',
    category: 'positive',
    icon: <Shield className="w-4 h-4" />,
    pairedTraitId: 'ego',
    description: 'Quiet unshakeable knowing grounded in divine identity.',
    frequencyHz: 741,
  },
  {
    id: 'forgiving',
    name: 'FORGIVING',
    hindi: 'क्षमाशीलता एवं दया',
    category: 'positive',
    icon: <Heart className="w-4 h-4" />,
    pairedTraitId: 'hate',
    description: 'Releasing toxic chains and freeing your own spirit from past burdens.',
    frequencyHz: 639,
  },
  {
    id: 'peaceful',
    name: 'PEACEFUL',
    hindi: 'शांति एवं सौम्यता',
    category: 'positive',
    icon: <Sparkles className="w-4 h-4" />,
    pairedTraitId: 'anger',
    description: 'Tranquil lake consciousness undisturbed by outer storms.',
    frequencyHz: 432,
  },
  {
    id: 'inspired',
    name: 'INSPIRED',
    hindi: 'प्रेरणा एवं दिव्यता',
    category: 'positive',
    icon: <Star className="w-4 h-4" />,
    pairedTraitId: 'regret',
    description: 'In-spirit connection receiving higher dimensional insights.',
    frequencyHz: 852,
  },
  {
    id: 'help',
    name: 'HELP',
    hindi: 'परोपकार एवं सेवा',
    category: 'positive',
    icon: <HandHeart className="w-4 h-4" />,
    pairedTraitId: 'selfish',
    description: 'Selfless karma yoga uplifting others and cleansing past impressions.',
    frequencyHz: 639,
  },
  {
    id: 'bravery',
    name: 'BRAVERY',
    hindi: 'वीरता एवं निर्भयता',
    category: 'positive',
    icon: <Shield className="w-4 h-4" />,
    pairedTraitId: 'violent',
    description: 'Standing for truth without hatred, protecting the vulnerable.',
    frequencyHz: 741,
  },
  {
    id: 'truth',
    name: 'TRUTH',
    hindi: 'सत्य एवं निष्ठा',
    category: 'positive',
    icon: <Eye className="w-4 h-4" />,
    pairedTraitId: 'lie',
    description: 'Satya: The highest Vedic foundation that sustains the cosmos.',
    frequencyHz: 741,
  },
  {
    id: 'trust',
    name: 'TRUST',
    hindi: 'विश्वास एवं श्रद्धा',
    category: 'positive',
    icon: <Unlock className="w-4 h-4" />,
    pairedTraitId: 'cheat',
    description: 'Sacred surrender believing in universal goodness and integrity.',
    frequencyHz: 639,
  },
  {
    id: 'heal',
    name: 'HEAL',
    hindi: 'आरोग्य एवं कल्याण',
    category: 'positive',
    icon: <Sparkles className="w-4 h-4" />,
    pairedTraitId: 'hurt',
    description: 'Radiating restorative bio-frequencies to mend broken hearts.',
    frequencyHz: 528,
  },
  {
    id: 'give',
    name: 'GIVE',
    hindi: 'दान एवं त्याग',
    category: 'positive',
    icon: <HandHeart className="w-4 h-4" />,
    pairedTraitId: 'greed',
    description: 'Opening the floodgates of abundance by releasing attachments.',
    frequencyHz: 639,
  },
  {
    id: 'receive',
    name: 'RECEIVE',
    hindi: 'स्वीकार एवं अनुग्रह',
    category: 'positive',
    icon: <Sun className="w-4 h-4" />,
    pairedTraitId: 'selfish',
    description: 'Graciously welcoming universal blessings with humble gratitude.',
    frequencyHz: 963,
  },
];

interface DualEnergySplitHeroProps {
  onTransmute: (negativeId: string, positiveId: string) => void;
  transmutedTraits: string[];
}

export const DualEnergySplitHero: React.FC<DualEnergySplitHeroProps> = ({
  onTransmute,
  transmutedTraits,
}) => {
  const [selectedTrait, setSelectedTrait] = useState<EnergyTrait | null>(null);
  const [activeTransmutationPair, setActiveTransmutationPair] = useState<{ neg: EnergyTrait; pos: EnergyTrait } | null>(null);

  const negativeTraits = DUAL_ENERGY_TRAITS.filter(t => t.category === 'negative');
  const positiveTraits = DUAL_ENERGY_TRAITS.filter(t => t.category === 'positive');

  const handleSelectNegativeTrait = (trait: EnergyTrait) => {
    setSelectedTrait(trait);
    const pairedPos = positiveTraits.find(p => p.id === trait.pairedTraitId) || positiveTraits[0];
    setActiveTransmutationPair({ neg: trait, pos: pairedPos });

    try {
      cosmicAudio.playFrequency(trait.frequencyHz);
    } catch {}
  };

  const handleSelectPositiveTrait = (trait: EnergyTrait) => {
    setSelectedTrait(trait);
    const pairedNeg = negativeTraits.find(n => n.pairedTraitId === trait.id) || negativeTraits[0];
    setActiveTransmutationPair({ neg: pairedNeg, pos: trait });

    try {
      cosmicAudio.playFrequency(trait.frequencyHz);
      confetti({
        particleCount: 35,
        spread: 50,
        colors: ['#ffd700', '#f59e0b', '#10b981']
      });
    } catch {}
  };

  const handleExecuteTransmutation = () => {
    if (!activeTransmutationPair) return;
    const { neg, pos } = activeTransmutationPair;

    try {
      cosmicAudio.playCosmicChime(pos.frequencyHz);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#f59e0b', '#ec4899', '#10b981', '#ffffff']
      });
    } catch {}

    onTransmute(neg.id, pos.id);
  };

  return (
    <div 
      id="dual-energy-split-hero"
      className="relative rounded-3xl border-2 border-amber-500/40 bg-black/90 shadow-[0_0_50px_rgba(245,158,11,0.2)] overflow-hidden"
    >
      {/* Ornate Corner Flourishes (Directly Inspired by Image 1 & Image 6) */}
      <div className="absolute top-2 left-2 text-amber-500/40 text-lg font-serif select-none pointer-events-none">⚜</div>
      <div className="absolute top-2 right-2 text-amber-500/40 text-lg font-serif select-none pointer-events-none">⚜</div>
      <div className="absolute bottom-2 left-2 text-amber-500/40 text-lg font-serif select-none pointer-events-none">⚜</div>
      <div className="absolute bottom-2 right-2 text-amber-500/40 text-lg font-serif select-none pointer-events-none">⚜</div>

      {/* Top Banner: "CHOOSE YOUR ENERGY" & "KARMA RETURNS" */}
      <div className="relative z-10 py-6 px-4 text-center border-b border-amber-500/30 bg-gradient-to-r from-black via-[#1c1206] to-black">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-xs font-mono text-amber-300 shadow">
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span>#CATALYST IN LIFE • BE THE REASON SOMEONE BELIEVES IN GOOD PEOPLE</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500 mt-2 tracking-wider">
          CHOOSE YOUR ENERGY
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mt-2 font-mono leading-relaxed">
          "What you give to life, life gives back. So choose wisely. Your Today • Your Choices • Your Tomorrow."
        </p>
      </div>

      {/* Main Split Screen Deck: Negative Energy Left vs. Positive Energy Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: NEGATIVE ENERGY (DARK / STORM / CHAINS / FRICTION)          */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-[#100808] via-[#0a0505] to-black border-b lg:border-b-0 lg:border-r border-amber-500/30 relative overflow-hidden">
          
          {/* Subtle Storm / Lightning Backdrop Glow */}
          <div className="absolute top-0 left-0 w-60 h-60 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            
            {/* Header */}
            <div className="text-center pb-3 border-b border-red-950/60">
              <div className="text-[10px] font-mono tracking-widest text-red-400 uppercase">
                तमोगुण एवं कर्म बन्धन
              </div>
              <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-rose-300 to-amber-400 mt-0.5">
                NEGATIVE ENERGY
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Chained friction to transmute into golden virtue
              </p>
            </div>

            {/* List of 10 Negative Energy Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {negativeTraits.map((trait) => {
                const isTransmuted = transmutedTraits.includes(trait.id);
                const isSelected = selectedTrait?.id === trait.id;

                return (
                  <motion.div
                    key={trait.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectNegativeTrait(trait)}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isTransmuted
                        ? 'bg-emerald-950/30 border-emerald-500/40 opacity-70 line-through'
                        : isSelected
                        ? 'bg-red-950/80 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                        : 'bg-black/60 border-white/10 hover:border-red-500/40 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                        isTransmuted
                          ? 'bg-emerald-900/60 border-emerald-400 text-emerald-300'
                          : isSelected
                          ? 'bg-red-600 border-red-300 text-white'
                          : 'bg-black border-red-500/30 text-red-400'
                      }`}>
                        {trait.icon}
                      </div>
                      <div>
                        <div className="text-xs font-cinzel font-bold text-white flex items-center gap-1.5">
                          <span>{trait.name}</span>
                          {isTransmuted && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                        </div>
                        <div className="text-[9px] font-mono text-slate-400">{trait.hindi}</div>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/60 border border-white/5 text-amber-400/80 shrink-0">
                      {trait.frequencyHz}Hz
                    </span>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTER COLUMN: THE SACRED ALCHEMICAL TRANSMUTATION MEDALLION              */}
        {/* ========================================================================= */}
        <div className="lg:col-span-2 p-4 sm:p-6 flex flex-col items-center justify-center bg-black/95 border-b lg:border-b-0 lg:border-r border-amber-500/30 text-center space-y-4 relative">
          
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-700 shadow-[0_0_35px_rgba(245,158,11,0.6)] flex items-center justify-center cursor-pointer group">
            <div className="w-full h-full rounded-full bg-black/90 flex flex-col items-center justify-center p-2 border border-amber-300">
              <Sun className="w-6 h-6 text-amber-400 animate-spin-slow" />
              <span className="text-[9px] font-cinzel font-bold text-amber-300 mt-1 text-center leading-tight">
                TRANSMUTE
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-mono text-amber-400 uppercase">Karmic Catalyst</div>
            <div className="text-xs font-cinzel font-bold text-white">
              {transmutedTraits.length} / {negativeTraits.length} Transmuted
            </div>
          </div>

          {activeTransmutationPair ? (
            <div className="p-3 rounded-2xl bg-amber-950/60 border border-amber-500/40 w-full space-y-2 text-left">
              <div className="text-[10px] font-mono text-amber-300 font-bold flex items-center justify-between">
                <span>Active Shift:</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </div>
              <div className="text-xs font-cinzel text-white flex items-center gap-1">
                <span className="text-red-400">{activeTransmutationPair.neg.name}</span>
                <ArrowRight className="w-3 h-3 text-amber-400" />
                <span className="text-emerald-400">{activeTransmutationPair.pos.name}</span>
              </div>
              <button
                onClick={handleExecuteTransmutation}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-cinzel font-bold text-[11px] shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-black" />
                <span>Shift Energy Now</span>
              </button>
            </div>
          ) : (
            <p className="text-[10px] font-mono text-slate-400 max-w-[140px]">
              Tap any attribute on the left or right to align frequencies.
            </p>
          )}

          {/* Central Lotus Epigraph */}
          <div className="pt-2 text-2xl">🪷</div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: POSITIVE ENERGY (GOLD / SUNLIGHT / DOVES / ASCENSION)       */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-[#181105] via-[#0c0903] to-black relative overflow-hidden">
          
          {/* Subtle Sunbeam / Golden Aura Backdrop Glow */}
          <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            
            {/* Header */}
            <div className="text-center pb-3 border-b border-amber-500/20">
              <div className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                सत्त्वगुण एवं आत्म साक्षात्कार
              </div>
              <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-emerald-300 mt-0.5">
                POSITIVE ENERGY
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Golden soul path of Dharma, creativity & bravery
              </p>
            </div>

            {/* List of Positive Energy Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {positiveTraits.map((trait) => {
                const isSelected = selectedTrait?.id === trait.id;

                return (
                  <motion.div
                    key={trait.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectPositiveTrait(trait)}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-amber-950/90 border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.6)]'
                        : 'bg-black/60 border-amber-500/25 hover:border-amber-400 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                        isSelected
                          ? 'bg-amber-400 border-amber-200 text-amber-950 shadow-[0_0_12px_rgba(251,191,36,0.8)]'
                          : 'bg-black border-amber-500/40 text-amber-400'
                      }`}>
                        {trait.icon}
                      </div>
                      <div>
                        <div className="text-xs font-cinzel font-bold text-white">
                          {trait.name}
                        </div>
                        <div className="text-[9px] font-mono text-amber-300/80">{trait.hindi}</div>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/60 border border-amber-500/20 text-emerald-400 font-bold shrink-0">
                      {trait.frequencyHz}Hz
                    </span>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>

      </div>

      {/* Footer Banner Quote (Direct from Image 6) */}
      <div className="relative z-10 py-3.5 px-4 bg-black/95 border-t border-amber-500/30 text-center flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-amber-200">
        <span className="flex items-center gap-2">
          <span>🕊️</span>
          <span>"Kindness is never wasted. It always finds its way back."</span>
        </span>
        <span className="text-slate-400 text-[11px]">
          Tap traits to harmonize your frequency field
        </span>
      </div>

    </div>
  );
};
