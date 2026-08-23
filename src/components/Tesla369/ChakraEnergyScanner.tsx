import React, { useState } from 'react';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { Play, Pause, Activity, Sparkles, CheckCircle, ShieldAlert, Radio } from 'lucide-react';
import { motion } from 'motion/react';

interface ChakraNode {
  name: string;
  sanskrit: string;
  frequency: number;
  color: string;
  glow: string;
  theme: string;
  blockageSign: string;
  clearingTone: string;
  affirmation: string;
  endocrineGland: string;
}

const CHAKRAS_LIST: ChakraNode[] = [
  {
    name: 'Crown Chakra',
    sanskrit: 'सहस्रार (Sahasrara)',
    frequency: 963,
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.8)',
    theme: 'Pure Cosmic Consciousness & God Source',
    blockageSign: 'Spiritual cynicism, brain fog, isolation from life purpose',
    clearingTone: '963Hz Pure Light Solfeggio',
    affirmation: 'I am one with the supreme source. Divine wisdom flows effortlessly.',
    endocrineGland: 'Pineal Gland (DMT / Melatonin)',
  },
  {
    name: 'Third Eye Chakra',
    sanskrit: 'आज्ञा (Ajna)',
    frequency: 852,
    color: '#6366f1',
    glow: 'rgba(99, 102, 241, 0.8)',
    theme: 'Intuition, Decalcified Vision & Lucid Clarity',
    blockageSign: 'Overthinking loops, inability to visualize, calcified intuition',
    clearingTone: '852Hz Third Eye Awakening Tone',
    affirmation: 'My inner eye is clear, perceptive, and aligned with supreme truth.',
    endocrineGland: 'Pituitary Gland (Master Controller)',
  },
  {
    name: 'Throat Chakra',
    sanskrit: 'विशुद्ध (Vishuddha)',
    frequency: 741,
    color: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.8)',
    theme: 'Authentic Expression, Truth & Cellular Detox',
    blockageSign: 'Fear of speaking up, suppressed emotions, thyroid stagnation',
    clearingTone: '741Hz Cellular Detox & Truth Sol',
    affirmation: 'I speak my truth with courage, precision, and kindness.',
    endocrineGland: 'Thyroid & Parathyroid',
  },
  {
    name: 'Heart Chakra',
    sanskrit: 'अनाहत (Anahata)',
    frequency: 639,
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.8)',
    theme: 'Unconditional Love, Forgiveness & Heart Coherence',
    blockageSign: 'Grief, defensive emotional walls, relationship resentment',
    clearingTone: '639Hz Heart Harmonic & Relationship FA',
    affirmation: 'My heart is open, forgiven, and radiant with unconditional love.',
    endocrineGland: 'Thymus (Immunity)',
  },
  {
    name: 'Solar Plexus Chakra',
    sanskrit: 'मणिपुर (Manipura)',
    frequency: 528,
    color: '#eab308',
    glow: 'rgba(234, 179, 8, 0.8)',
    theme: 'Willpower, Transformation, DNA Repair & Vital Fire',
    blockageSign: 'Impostor syndrome, gut anxiety, lack of self-belief',
    clearingTone: '528Hz Miracle & DNA Transformation MI',
    affirmation: 'I am powerful, capable, and radiant with sovereign confidence.',
    endocrineGland: 'Pancreas & Adrenals',
  },
  {
    name: 'Sacral Chakra',
    sanskrit: 'स्वाधिष्ठान (Svadhisthana)',
    frequency: 417,
    color: '#f97316',
    glow: 'rgba(249, 115, 22, 0.8)',
    theme: 'Creative Flow, Passion, Adaptability & Sensuality',
    blockageSign: 'Creative dry spells, emotional guilt, fear of change',
    clearingTone: '417Hz Undoing Situations & Flow RE',
    affirmation: 'I flow gracefully like water around every obstacle.',
    endocrineGland: 'Gonads / Reproductive',
  },
  {
    name: 'Root Chakra',
    sanskrit: 'मूलाधार (Muladhara)',
    frequency: 396,
    color: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.8)',
    theme: 'Grounding, Financial Safety & Fear Release',
    blockageSign: 'Financial panic, scarcity mindset, survival anxiety',
    clearingTone: '396Hz Liberation from Guilt & Fear UT',
    affirmation: 'I am safe, grounded, and supported by the infinite universe.',
    endocrineGland: 'Adrenal Medulla & Base Plexus',
  },
];

export const ChakraEnergyScanner: React.FC = () => {
  const [activeChakra, setActiveChakra] = useState<ChakraNode>(CHAKRAS_LIST[3]); // Default Heart
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handlePlayTone = (chakra: ChakraNode) => {
    setActiveChakra(chakra);
    setIsPlaying(true);
    cosmicAudio.playTeslaFrequency(chakra.frequency, 6);
    setTimeout(() => setIsPlaying(false), 6000);
  };

  const handleRunFullScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    cosmicAudio.playChord([396, 417, 528, 639, 741, 852, 963], 6);

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 4500);
  };

  return (
    <div className="rounded-3xl p-6 sm:p-8 border border-[#ffd700]/30 bg-gradient-to-b from-[#130d2a] via-[#090812] to-black shadow-2xl space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest block">
            BIOMAGNETIC RESONANCE TRANSDUCER
          </span>
          <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-[#fdf2d1]">
            7 Energy Centers Alignment & Diagnostic Scanner
          </h3>
        </div>

        <button
          onClick={handleRunFullScan}
          disabled={isScanning}
          className="px-5 py-2.5 rounded-xl font-cinzel font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 via-purple-500 to-cyan-500 text-black hover:opacity-90 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,215,0,0.3)] flex items-center gap-2"
        >
          <Activity className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Scanning Bio-Field...' : 'Run Full 7-Chakra Harmonization'}</span>
        </button>
      </div>

      {/* Main Interactive Chakra Alignment Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: 7 Aligned Node Badges */}
        <div className="lg:col-span-5 space-y-2">
          {CHAKRAS_LIST.map((c) => {
            const isSelected = activeChakra.name === c.name;
            return (
              <motion.div
                key={c.name}
                whileHover={{ x: 4 }}
                onClick={() => handlePlayTone(c)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-white/10 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                    : 'bg-black/40 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold text-black border border-white/60 shadow"
                    style={{ backgroundColor: c.color }}
                  >
                    {c.frequency}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-cinzel font-bold text-[#fdf2d1]">
                      {c.name}
                    </h4>
                    <span className="text-[10px] font-mono text-gray-400">
                      {c.sanskrit} • {c.frequency} Hz
                    </span>
                  </div>
                </div>

                <button className="p-1.5 rounded-lg bg-white/10 text-amber-300 hover:text-white">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Deep Inspector for the Selected Chakra */}
        <div className="lg:col-span-7 p-6 rounded-2xl border border-white/15 bg-white/5 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span
                className="text-xs font-mono font-bold uppercase tracking-wider block"
                style={{ color: activeChakra.color }}
              >
                {activeChakra.sanskrit} • {activeChakra.frequency} Hz
              </span>
              <h4 className="text-xl font-cinzel font-bold text-[#fdf2d1]">
                {activeChakra.name}
              </h4>
            </div>

            <button
              onClick={() => handlePlayTone(activeChakra)}
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-2 cursor-pointer transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'Playing Tone' : `Play ${activeChakra.frequency}Hz`}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-white/10 bg-black/40 space-y-1">
              <span className="text-[10px] font-mono text-gray-400 uppercase block">
                Harmonic Function
              </span>
              <p className="text-xs font-serif text-gray-200">{activeChakra.theme}</p>
            </div>
            <div className="p-3.5 rounded-xl border border-white/10 bg-black/40 space-y-1">
              <span className="text-[10px] font-mono text-gray-400 uppercase block">
                Associated Endocrine Node
              </span>
              <p className="text-xs font-serif text-gray-200">{activeChakra.endocrineGland}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-950/20 space-y-1">
            <span className="text-[10px] font-mono text-red-300 uppercase flex items-center gap-1.5 font-bold">
              <ShieldAlert className="w-3.5 h-3.5" />
              Symptoms of Stagnation or Blockage
            </span>
            <p className="text-xs font-serif text-red-100/90 leading-relaxed">
              {activeChakra.blockageSign}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#ffd700]/30 bg-amber-950/20 space-y-1">
            <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest block font-bold">
              Somatic Affirmation & Reset Mantra
            </span>
            <p className="text-sm font-serif italic text-amber-100 font-medium">
              "{activeChakra.affirmation}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
