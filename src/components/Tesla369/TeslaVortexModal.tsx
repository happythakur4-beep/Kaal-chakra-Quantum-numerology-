import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TeslaVortexNode } from '../../types';
import { TESLA_VORTEX_NODES } from '../../data/teslaPortalData';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { X, Zap, Volume2, Sparkles, RefreshCw, Calculator, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TeslaVortexModalProps {
  node: TeslaVortexNode | null;
  onClose: () => void;
  onSelectNode: (node: TeslaVortexNode) => void;
}

export const TeslaVortexModal: React.FC<TeslaVortexModalProps> = ({
  node,
  onClose,
  onSelectNode,
}) => {
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState<{ sum: number; root: number; is369: boolean } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!node) return null;

  const handlePlayTone = () => {
    setIsPlaying(true);
    cosmicAudio.playTeslaFrequency(node.frequencyHz, 3.5);
    try {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 },
        colors: ['#ffd700', '#22d3ee', '#ec4899']
      });
    } catch {}
    setTimeout(() => setIsPlaying(false), 3500);
  };

  const handleComputeDigitalRoot = (val: string) => {
    setCalcInput(val);
    const num = parseInt(val.replace(/\D/g, ''), 10);
    if (isNaN(num) || num <= 0) {
      setCalcResult(null);
      return;
    }
    // Calculate digital root
    let temp = num;
    while (temp > 9) {
      temp = temp.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    setCalcResult({
      sum: num,
      root: temp,
      is369: temp === 3 || temp === 6 || temp === 9,
    });
  };

  const otherConnectedNodes = TESLA_VORTEX_NODES.filter((n) => node.connections.includes(n.number));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-2xl rounded-3xl border border-[#ffd700]/50 overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.3)] bg-gradient-to-b from-[#130f26] via-[#090814] to-[#04040a] flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-black/50">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center font-mono font-black text-xl text-black border-2 border-white/60 shadow-lg"
                style={{ backgroundColor: node.color }}
              >
                {node.number}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
                  {node.isDivineTrinity ? '⚡ DIVINE TRINITY FLUX NODE' : '🪐 MATERIAL DOUBLING CIRCUIT'}
                </span>
                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-[#fdf2d1]">
                  Vortex Frequency Node #{node.number}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Tone & Frequency Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-black/60 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase block">
                  SOLFEGGIO RESONANCE TONE
                </span>
                <div className="text-2xl font-mono font-bold text-amber-200">
                  {node.frequencyHz} Hz
                </div>
                <span className="text-xs font-serif text-gray-300">
                  {node.solfeggioTitle}
                </span>
              </div>

              <button
                onClick={handlePlayTone}
                className={`px-4 py-2.5 rounded-xl border font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isPlaying
                    ? 'bg-amber-400 text-gray-950 border-amber-300 shadow-[0_0_20px_rgba(255,215,0,0.8)] scale-105'
                    : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border-amber-400/50'
                }`}
              >
                <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
                <span>{isPlaying ? 'Resonating...' : 'Play Frequency'}</span>
              </button>
            </div>

            {/* Vortex Mathematics Meaning */}
            <div className="space-y-2">
              <span className="text-xs font-cinzel font-bold text-amber-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Vortex Mathematics & Tesla Energy Dynamics</span>
              </span>
              <p className="text-xs sm:text-sm font-serif text-gray-200 leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/10">
                {node.vortexMeaning}
              </p>
            </div>

            {/* Vedic Sanskrit Parallels */}
            <div className="space-y-2">
              <span className="text-xs font-cinzel font-bold text-orange-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>Vedic Cosmology & Sacred Parallels</span>
              </span>
              <p className="text-xs sm:text-sm font-serif text-gray-200 leading-relaxed bg-orange-950/20 p-4 rounded-2xl border border-orange-500/30">
                {node.vedicParallel}
              </p>
            </div>

            {/* Interactive Digital Root & Vortex Calculator */}
            <div className="p-4 rounded-2xl bg-black/60 border border-[#ffd700]/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-[#fdf2d1]">
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Interactive 3-6-9 Vortex Digital Root Engine</span>
              </div>
              <p className="text-[11px] font-serif text-gray-400">
                Input any number, birth year, or measurement to reduce it into its fundamental vortex seed (1 through 9):
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. 1996, 369, 432, 108..."
                  value={calcInput}
                  onChange={(e) => handleComputeDigitalRoot(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-gray-900/80 border border-gray-700 text-amber-200 text-xs font-mono focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={() => handleComputeDigitalRoot('369')}
                  className="px-3 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono cursor-pointer hover:bg-amber-500/30"
                >
                  Try 369
                </button>
              </div>

              {calcResult && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-gradient-to-r from-purple-950/40 to-amber-950/40 border border-amber-400/40 flex items-center justify-between text-xs font-mono"
                >
                  <span className="text-gray-300">
                    Input: <strong className="text-white">{calcResult.sum}</strong> → Digital Root:
                  </span>
                  <span className="text-base font-bold text-amber-300 flex items-center gap-1.5">
                    <span>Node #{calcResult.root}</span>
                    {calcResult.is369 && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-bold">
                        ⚡ 3-6-9 Flux!
                      </span>
                    )}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Connected Flux Nodes */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                🔄 Connected Flux Lines (Click to Shift):
              </span>
              <div className="grid grid-cols-2 gap-2">
                {otherConnectedNodes.map((conn) => (
                  <button
                    key={conn.number}
                    onClick={() => onSelectNode(conn)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 flex items-center justify-between transition-all cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs text-black"
                        style={{ backgroundColor: conn.color }}
                      >
                        {conn.number}
                      </div>
                      <span className="text-xs font-mono text-gray-300 group-hover:text-amber-300">
                        Node #{conn.number} ({conn.frequencyHz} Hz)
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
