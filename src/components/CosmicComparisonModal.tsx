import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { 
  Sparkles, 
  Orbit, 
  Compass, 
  Layers, 
  Calendar, 
  Clock, 
  X, 
  Globe2, 
  Telescope, 
  CheckCircle2, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cosmicAudio } from '../utils/audioSynthesizer';

interface CosmicComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
}

export const CosmicComparisonModal: React.FC<CosmicComparisonModalProps> = ({
  isOpen,
  onClose,
  theme
}) => {
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'time' | 'hubble' | 'chakras'>('time');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-2xl animate-in fade-in select-none">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 p-6 sm:p-8 shadow-2xl space-y-6 ${
          isDark 
            ? 'bg-gradient-to-b from-[#100d24] via-[#080614] to-black border-cyan-400/50 text-white shadow-[0_0_60px_rgba(6,182,212,0.25)]' 
            : 'bg-gradient-to-b from-[#ffffff] via-[#fbf9f4] to-[#f4eee4] border-[#caa269] text-[#2b2118]'
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
        <div className="space-y-2 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center gap-1.5">
              <Telescope className="w-3.5 h-3.5" />
              <span>SURYA SIDDHANTA & MODERN ASTROPHYSICS SYNTHESIS</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-purple-500/20 text-purple-300 border border-purple-400/30">
              NASA Hubble & Vedic Time Scaling
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl font-cinzel font-bold text-[#fef08a]">
            वैदिक काल-गणना (Cosmology) एवं आधुनिक खगोल भौतिकी तुलना
          </h2>
          <p className="text-xs sm:text-sm font-serif text-gray-300 leading-relaxed">
            सूर्य सिद्धांत, श्रीमद्भागवतम के काल चक्र और नासा हबल/जेम्स वेब (JWST) के आधुनिक ब्रह्मांडीय आंकड़ों का तुलनात्मक विश्लेषण।
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          {[
            { id: 'time', label: '⏳ वैदिक काल-चक्र vs बिग बैंग (Cosmic Time)' },
            { id: 'hubble', label: '🔭 हबल डीप स्पेस vs 14 भुवन' },
            { id: 'chakras', label: '🌀 369 टेस्ला फ्रीक्वेंसी व ग्रह नाद' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id as any);
                try {
                  cosmicAudio.playTone(432, 0.05);
                } catch {}
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === t.id
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* CONTENT TABS */}
        {activeTab === 'time' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vedic Side */}
              <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-3">
                <h3 className="text-base font-cinzel font-bold text-amber-300 flex items-center gap-2">
                  <span>🕉️ वैदिक काल-गणना (Surya Siddhanta)</span>
                </h3>
                <ul className="space-y-2.5 text-xs font-serif leading-relaxed text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-mono font-bold">• 1 चतुर्युग (Maha Yuga):</span>
                    <span>43,20,000 सौर वर्ष (सत्य, त्रेता, द्वापर, कलि युग)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-mono font-bold">• 1 मन्वंतर:</span>
                    <span>71 चतुर्युग = 30,67,20,000 वर्ष (वर्तमान में वैवस्वत मन्वंतर)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-mono font-bold">• 1 कल्प (ब्रह्मा जी का 1 दिन):</span>
                    <span>4.32 अरब (Billion) सौर वर्ष (1000 महायुग)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-mono font-bold">• महाप्रलय व पुनर्जन्म:</span>
                    <span>ब्रह्मांड का चक्रीय संकुचन व विस्तार (Oscillating Universe)</span>
                  </li>
                </ul>
              </div>

              {/* Modern Science Side */}
              <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 space-y-3">
                <h3 className="text-base font-cinzel font-bold text-cyan-300 flex items-center gap-2">
                  <span>🔭 आधुनिक खगोल भौतिकी (NASA / Astrophysics)</span>
                </h3>
                <ul className="space-y-2.5 text-xs font-serif leading-relaxed text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono font-bold">• ब्रह्मांड की आयु (Big Bang):</span>
                    <span>13.8 अरब वर्ष (13.787 ± 0.020 Billion Years)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono font-bold">• पृथ्वी व सौरमंडल की आयु:</span>
                    <span>4.54 अरब वर्ष (जो वैदिक कल्प 4.32B वर्ष के सबसे निकट है)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono font-bold">• चक्रीय ब्रह्मांड मॉडल:</span>
                    <span>Roger Penrose का Conformal Cyclic Cosmology (CCC)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono font-bold">• हबल स्थिरांक (Expansion):</span>
                    <span>ब्रह्मांड का तीव्र गति से निरंतर विस्तार (Dark Energy)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Synthesis Insight Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-cyan-500/15 border border-white/15 text-xs font-serif text-gray-200 leading-relaxed">
              <strong className="text-amber-300 block mb-1">💡 विस्मयकारी समरूपता (Astonishing Convergence):</strong>
              कार्ल सागन (Carl Sagan) ने अपनी प्रसिद्ध पुस्तक 'Cosmos' में लिखा था कि हिन्दू धर्म विश्व का एकमात्र ऐसा प्राचीन दर्शन है जिसके ब्रह्मांडीय समय के पैमाने आधुनिक खगोल भौतिकी के अरबों वर्षों के स्केल से पूर्णतः मेल खाते हैं।
            </div>
          </div>
        )}

        {activeTab === 'hubble' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                title: '🌌 GN-z11 Galaxy',
                distance: '13.4 Billion Light Years',
                desc: 'हबल द्वारा खोजी गई सबसे दूरस्थ आकाशगंगाओं में से एक, जो बिग बैंग के 400 मिलियन वर्ष बाद का प्रकाश दर्शाती है।',
                tag: 'Deep Space'
              },
              {
                title: '🌀 Pillars of Creation (M16)',
                distance: '6,500 Light Years',
                desc: 'ईगल नेबुला में तारों की नर्सरी जहां गैस और धूल से नए सूर्य और ग्रहीय प्रणालियां जन्म ले रही हैं।',
                tag: 'Nebula Genesis'
              },
              {
                title: '🪐 14 लोक (The 14 Realms)',
                distance: 'भूः, भुवः, स्वः, महः, जनः, तपः, सत्यम',
                desc: 'वैदिक ब्रह्मांड विज्ञान में चेतना के 14 आयाम (Higher & Lower Dimensional Planes of Consciousness)।',
                tag: 'Vedic Dimensionality'
              },
            ].map((card, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">{card.tag}</span>
                <h4 className="text-sm font-cinzel font-bold text-amber-300">{card.title}</h4>
                <div className="text-[11px] font-mono text-white/80">{card.distance}</div>
                <p className="text-xs font-serif text-gray-300 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'chakras' && (
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h4 className="text-sm font-cinzel font-bold text-[#fef08a]">
              3-6-9 टेस्ला गणित और वैदिक सोलफेजियो (Solfeggio) आवृत्तियां
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-black/40 border border-amber-400/30">
                <span className="text-amber-400 font-bold block">⚡ 432 Hz (Universal Tuning)</span>
                <span className="text-gray-300 text-[11px]">प्राकृतिक पृथ्वी कम्पन (OM नाद) व चक्र शुद्धि</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-cyan-400/30">
                <span className="text-cyan-400 font-bold block">⚡ 528 Hz (DNA & Miracles)</span>
                <span className="text-gray-300 text-[11px]">369 ऊर्जा कुंजी: 5+2+8 = 15 -&gt; 1+5 = 6 (Tesla Key)</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-purple-400/30">
                <span className="text-purple-400 font-bold block">⚡ 963 Hz (Crown & Sahasrara)</span>
                <span className="text-gray-300 text-[11px]">9+6+3 = 18 -&gt; 1+8 = 9 (Pure Cosmic Consciousness)</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
          <span>ज्ञानं परमं बलम् • Science & Vedic Harmony</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-cinzel font-bold text-xs hover:bg-cyan-400 transition-all cursor-pointer shadow"
          >
            बंद करें (Close)
          </button>
        </div>
      </motion.div>
    </div>
  );
};
