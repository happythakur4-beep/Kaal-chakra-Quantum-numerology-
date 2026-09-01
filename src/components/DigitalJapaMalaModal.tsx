import React, { useState, useEffect } from 'react';
import { ThemeMode } from '../types';
import { 
  Sparkles, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Flame, 
  Award, 
  Heart, 
  CheckCircle2, 
  X, 
  Compass, 
  Zap, 
  Play, 
  Pause,
  Repeat
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { cosmicAudio } from '../utils/audioSynthesizer';

interface DigitalJapaMalaModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
}

interface MantraPreset {
  id: string;
  name: string;
  sanskrit: string;
  meaning: string;
  deity: string;
  frequency: number;
}

const MANTRAS: MantraPreset[] = [
  {
    id: 'gayatri',
    name: 'गायत्री महामंत्र (Gayatri Maha-Mantra)',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
    meaning: 'हम उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा को अंतःकरण में धारण करें, जो हमारी बुद्धि को सन्मार्ग पर प्रेरित करे।',
    deity: 'सविता (सूर्य देव)',
    frequency: 528
  },
  {
    id: 'mahamrityunjaya',
    name: 'महामृत्युंजय मंत्र (Maha Mrityunjaya)',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥',
    meaning: 'हम त्रिनेत्रधारी भगवान शिव की आराधना करते हैं, जो सुगंधित हैं और जीवन का पोषण करते हैं। जैसे ककड़ी पकने पर बेल से मुक्त होती है, वैसे ही हम मृत्यु और भवबंधन से मुक्त हों।',
    deity: 'भगवान सदाशिव',
    frequency: 432
  },
  {
    id: 'om_namah_shivaya',
    name: 'पंचाक्षरी शिव मंत्र (Om Namah Shivaya)',
    sanskrit: 'ॐ नमः शिवाय॥',
    meaning: 'परम चेतना, कल्याणकारी एवं सर्वव्यापी शिव को मेरा नमन।',
    deity: 'महादेव',
    frequency: 639
  },
  {
    id: 'tesla_369',
    name: '3-6-9 कॉस्मिक मैनिफेस्टेशन नाद (Tesla Key)',
    sanskrit: 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे • ३६९ ऊर्जा बीज॥',
    meaning: 'ब्रह्मांड की गुप्त कुंजी: 369 गणितीय कम्पन से संकल्प सिद्धि और चेतना का विस्तार।',
    deity: 'कॉस्मिक यूनिवर्स',
    frequency: 963
  }
];

export const DigitalJapaMalaModal: React.FC<DigitalJapaMalaModalProps> = ({
  isOpen,
  onClose,
  theme
}) => {
  const isDark = theme === 'dark';
  const [selectedMantra, setSelectedMantra] = useState<MantraPreset>(MANTRAS[0]);
  const [beadCount, setBeadCount] = useState<number>(0);
  const [completedMalas, setCompletedMalas] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isAutoChanting, setIsAutoChanting] = useState(false);
  const [malaBeadStyle, setMalaBeadStyle] = useState<'rudraksha' | 'sphatik' | 'tulsi'>('rudraksha');

  const totalBeads = 108;

  // Advance Bead
  const handleCountBead = () => {
    if (soundEnabled) {
      try {
        cosmicAudio.playTone(selectedMantra.frequency, 0.08);
      } catch {}
    }

    if (beadCount + 1 >= totalBeads) {
      setBeadCount(0);
      setCompletedMalas(prev => prev + 1);
      try {
        cosmicAudio.playTeslaFrequency(selectedMantra.frequency, 1.5);
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffd700', '#f59e0b', '#10b981', '#a855f7']
        });
      } catch {}
    } else {
      setBeadCount(prev => prev + 1);
    }
  };

  // Reset current Mala
  const handleReset = () => {
    setBeadCount(0);
    setIsAutoChanting(false);
    try {
      cosmicAudio.playTone(432, 0.05);
    } catch {}
  };

  // Auto chanting loop
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isAutoChanting) {
      timer = setInterval(() => {
        handleCountBead();
      }, 1200);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoChanting, beadCount, selectedMantra]);

  if (!isOpen) return null;

  const progressPercentage = Math.round((beadCount / totalBeads) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-2xl animate-in fade-in select-none">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className={`relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl border-2 p-6 sm:p-8 shadow-2xl space-y-6 ${
          isDark 
            ? 'bg-gradient-to-b from-[#160f29] via-[#0a0715] to-black border-amber-400/60 text-white shadow-[0_0_60px_rgba(245,158,11,0.25)]' 
            : 'bg-gradient-to-b from-[#ffffff] via-[#fbf8f2] to-[#f4ebe0] border-[#caa269] text-[#2b2118]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>108 SACRED JAPA MALA & SOUND RESONANCE</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
              <Award className="w-3 h-3 text-emerald-400" />
              <span>{completedMalas} माला पूर्ण ({completedMalas * 108} मंत्र जप)</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl font-cinzel font-bold text-[#fef08a]">
            डिजिटल १०८ जप माला एवं नाद ध्यान चक्र
          </h2>
          <p className="text-xs sm:text-sm font-serif text-gray-300">
            मन की एकाग्रता, प्राण शुद्धि और कर्म लेजर में पुण्य वृद्धि हेतु नित्य मंत्र साधना।
          </p>
        </div>

        {/* Mantra Selector Carousel */}
        <div className="space-y-2">
          <label className="text-xs font-cinzel font-bold text-amber-400 uppercase tracking-wider block">
            मंत्र का चयन करें (Choose Sacred Mantra):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {MANTRAS.map(m => (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedMantra(m);
                  try {
                    cosmicAudio.playTone(m.frequency, 0.1);
                  } catch {}
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedMantra.id === m.id
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md ring-1 ring-amber-400/50'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-cinzel font-bold">{m.name}</span>
                  <span className="text-[10px] font-mono text-cyan-400">{m.frequency} Hz</span>
                </div>
                <span className="text-[10.5px] font-serif opacity-75 block truncate mt-1">
                  {m.sanskrit}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Mantra Display Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-cyan-500/15 border border-amber-400/40 text-center space-y-2">
          <span className="text-[11px] font-mono text-amber-400 uppercase font-bold tracking-wider">
            इष्ट देव: {selectedMantra.deity} • नाद: {selectedMantra.frequency} Hz
          </span>
          <p className="text-sm sm:text-base font-serif font-bold text-[#fef08a] leading-relaxed">
            {selectedMantra.sanskrit}
          </p>
          <p className="text-xs font-serif italic text-gray-300 max-w-xl mx-auto opacity-90">
            &ldquo;{selectedMantra.meaning}&rdquo;
          </p>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE DIGITAL MALA BEAD COUNTER CANVAS                             */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center justify-center space-y-4 py-2">
          {/* Circular Bead Controller */}
          <div className="relative">
            {/* Outer Glow Ring */}
            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-dashed border-amber-400/40 flex items-center justify-center animate-spin-slow">
              {/* Virtual Beads arranged on perimeter */}
              {Array.from({ length: 12 }).map((_, idx) => {
                const angle = (idx / 12) * 2 * Math.PI;
                const radius = 105;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <div
                    key={idx}
                    className="absolute w-4 h-4 rounded-full shadow-md transition-all"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                      background: malaBeadStyle === 'rudraksha' 
                        ? 'radial-gradient(circle, #854d0e 0%, #451a03 100%)' 
                        : malaBeadStyle === 'sphatik'
                        ? 'radial-gradient(circle, #e0f2fe 0%, #38bdf8 100%)'
                        : 'radial-gradient(circle, #15803d 0%, #064e3b 100%)'
                    }}
                  />
                );
              })}
            </div>

            {/* Inner Tap Button */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={handleCountBead}
              className="absolute inset-4 sm:inset-6 rounded-full bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-black flex flex-col items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.5)] cursor-pointer transition-all active:ring-8 active:ring-amber-300/40"
            >
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-amber-950">
                टैप करें / JAPA COUNT
              </span>
              <span className="text-4xl sm:text-5xl font-mono font-black my-1 text-black">
                {beadCount}
              </span>
              <span className="text-[11px] font-mono font-bold text-black/80">
                / {totalBeads} मनके ({progressPercentage}%)
              </span>
            </motion.button>
          </div>

          {/* Bead Style Selector */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs font-mono text-gray-400">माला स्वरूप:</span>
            {[
              { id: 'rudraksha', label: '📿 रुद्राक्ष (Rudraksha)' },
              { id: 'sphatik', label: '💎 स्फटिक (Crystal)' },
              { id: 'tulsi', label: '🌿 तुलसी (Tulsi)' },
            ].map(b => (
              <button
                key={b.id}
                onClick={() => setMalaBeadStyle(b.id as any)}
                className={`px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  malaBeadStyle === b.id 
                    ? 'bg-amber-500 text-black font-bold shadow' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mala Controls Bar */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Auto Chanting Toggle */}
            <button
              onClick={() => setIsAutoChanting(prev => !prev)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isAutoChanting 
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {isAutoChanting ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isAutoChanting ? 'ऑटो जप चालू...' : 'ऑटो जप (Auto)'}</span>
            </button>

            {/* Sound Mute */}
            <button
              onClick={() => setSoundEnabled(prev => !prev)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
              title={soundEnabled ? 'Mute Chime' : 'Unmute Chime'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-gray-300 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>रीसेट (Reset)</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-amber-500 text-black font-cinzel font-bold text-xs hover:bg-amber-400 transition-all cursor-pointer shadow"
            >
              साधना पूर्ण (Done)
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
