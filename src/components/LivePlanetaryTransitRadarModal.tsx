import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { 
  Compass, 
  Orbit, 
  Sparkles, 
  AlertCircle, 
  ShieldCheck, 
  X, 
  RefreshCw, 
  Zap, 
  ChevronRight, 
  Sun, 
  Moon, 
  Eye
} from 'lucide-react';
import { motion } from 'motion/react';
import { cosmicAudio } from '../utils/audioSynthesizer';

interface LivePlanetaryTransitRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
}

interface PlanetTransit {
  planet: string;
  hindiName: string;
  symbol: string;
  sign: string;
  degree: string;
  nakshatra: string;
  pada: number;
  status: 'Direct' | 'Retrograde (वक्री)' | 'Combust (अस्त)';
  influence: 'Shubh (शुभ)' | 'Pita/Krodha (उग्र)' | 'Mishrit (मिश्रित)';
  remedy: string;
  color: string;
}

const LIVE_TRANSITS: PlanetTransit[] = [
  {
    planet: 'Sun (सूर्य)',
    hindiName: 'सूर्य नारायण',
    symbol: '☉',
    sign: 'Leo (सिंह)',
    degree: '14° 22\' 18"',
    nakshatra: 'Purva Phalguni (पूर्वा फाल्गुनी)',
    pada: 1,
    status: 'Direct',
    influence: 'Shubh (शुभ)',
    remedy: 'प्रातः तांबे के लोटे से सूर्य को जल व गायत्री अर्घ्य दें।',
    color: '#f59e0b'
  },
  {
    planet: 'Moon (चंद्र)',
    hindiName: 'चंद्र देव',
    symbol: '☽',
    sign: 'Cancer (कर्क)',
    degree: '27° 45\' 02"',
    nakshatra: 'Ashlesha (आश्लेषा)',
    pada: 4,
    status: 'Direct',
    influence: 'Shubh (शुभ)',
    remedy: 'चांदी के पात्र से जल पिएं एवं ॐ सों सोमाय नमः का 11 बार जप करें।',
    color: '#e2e8f0'
  },
  {
    planet: 'Mars (मंगल)',
    hindiName: 'मंगल ग्रह',
    symbol: '♂',
    sign: 'Gemini (मिथुन)',
    degree: '08° 11\' 44"',
    nakshatra: 'Ardra (आर्द्रा)',
    pada: 1,
    status: 'Direct',
    influence: 'Pita/Krodha (उग्र)',
    remedy: 'हनुमान चालीसा का पाठ करें एवं मंगलवार को लाल मसूर दान करें।',
    color: '#ef4444'
  },
  {
    planet: 'Mercury (बुध)',
    hindiName: 'बुध ग्रह',
    symbol: '☿',
    sign: 'Leo (सिंह)',
    degree: '21° 04\' 50"',
    nakshatra: 'Purva Phalguni (पूर्वा फाल्गुनी)',
    pada: 3,
    status: 'Direct',
    influence: 'Shubh (शुभ)',
    remedy: 'गौमाता को हरा चारा या पालक खिलाएं, बुध बीज मंत्र का स्मरण करें।',
    color: '#10b981'
  },
  {
    planet: 'Jupiter (गुरु)',
    hindiName: 'देवगुरु बृहस्पति',
    symbol: '♃',
    sign: 'Taurus (वृषभ)',
    degree: '19° 33\' 12"',
    nakshatra: 'Rohini (रोहिणी)',
    pada: 3,
    status: 'Direct',
    influence: 'Shubh (शुभ)',
    remedy: 'गुरुवार को चने की दाल व बेसन का प्रसाद बांटें, मस्तक पर हल्दी का तिलक लगाएं।',
    color: '#eab308'
  },
  {
    planet: 'Venus (शुक्र)',
    hindiName: 'दैत्यगुरु शुक्र',
    symbol: '♀',
    sign: 'Virgo (कन्या)',
    degree: '02° 15\' 33"',
    nakshatra: 'Uttara Phalguni (उत्तरा फाल्गुनी)',
    pada: 2,
    status: 'Combust (अस्त)',
    influence: 'Mishrit (मिश्रित)',
    remedy: 'सफेद मिष्ठान्न या चावल का दान करें, ॐ शुं शुक्राय नमः का जप करें।',
    color: '#ec4899'
  },
  {
    planet: 'Saturn (शनि)',
    hindiName: 'शनैश्चर देव',
    symbol: '♄',
    sign: 'Aquarius (कुंभ - स्वराशि)',
    degree: '16° 54\' 09"',
    nakshatra: 'Shatabhisha (शतभिषा)',
    pada: 3,
    status: 'Retrograde (वक्री)',
    influence: 'Mishrit (मिश्रित)',
    remedy: 'पीपल के वृक्ष के नीचे सरसों के तेल का दीपक जलाएं, कर्म शुद्धि रखें।',
    color: '#6366f1'
  },
  {
    planet: 'Rahu (राहु)',
    hindiName: 'राहु छाया ग्रह',
    symbol: '☊',
    sign: 'Pisces (मीन)',
    degree: '11° 02\' 15"',
    nakshatra: 'Uttara Bhadrapada (उत्तरा भाद्रपद)',
    pada: 3,
    status: 'Retrograde (वक्री)',
    influence: 'Pita/Krodha (उग्र)',
    remedy: 'पक्षियों को 7 प्रकार का अनाज (सप्तधान्य) खिलाएं।',
    color: '#8b5cf6'
  },
  {
    planet: 'Ketu (केतु)',
    hindiName: 'केतु मोक्ष कारक',
    symbol: '☋',
    sign: 'Virgo (कन्या)',
    degree: '11° 02\' 15"',
    nakshatra: 'Hasta (हस्त)',
    pada: 1,
    status: 'Retrograde (वक्री)',
    influence: 'Shubh (शुभ)',
    remedy: 'श्वान (कुत्ते) को मीठी रोटी खिलाएं, गणेश अथर्वशीर्ष का पाठ करें।',
    color: '#64748b'
  }
];

export const LivePlanetaryTransitRadarModal: React.FC<LivePlanetaryTransitRadarModalProps> = ({
  isOpen,
  onClose,
  theme
}) => {
  const isDark = theme === 'dark';
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetTransit>(LIVE_TRANSITS[0]);
  const [isLiveSyncing, setIsLiveSyncing] = useState(false);

  const handleRefresh = () => {
    setIsLiveSyncing(true);
    try {
      cosmicAudio.playTeslaFrequency(528, 0.4);
    } catch {}
    setTimeout(() => {
      setIsLiveSyncing(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-2xl animate-in fade-in select-none">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border-2 p-6 sm:p-8 shadow-2xl space-y-6 ${
          isDark 
            ? 'bg-gradient-to-b from-[#130d24] via-[#090614] to-black border-cyan-400/50 text-white shadow-[0_0_60px_rgba(6,182,212,0.2)]' 
            : 'bg-gradient-to-b from-[#ffffff] via-[#f7fafc] to-[#edf2f7] border-[#94a3b8] text-[#1e293b]'
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
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center gap-1.5">
              <Orbit className={`w-3.5 h-3.5 text-cyan-400 ${isLiveSyncing ? 'animate-spin' : ''}`} />
              <span>LIVE GRAHA GOCHAR RADAR (PLANETARY TRANSIT)</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>ग्रह स्थिति सिंक्रनाइज़्ड</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl font-cinzel font-bold text-[#fef08a]">
            प्रत्यक्ष ग्रह गोचर वेधशाला व नक्षत्र अंश राडार
          </h2>
          <p className="text-xs sm:text-sm font-serif text-gray-300">
            सौरमंडल के 9 ग्रहों की वर्तमान राशि, स्पष्ट भोगांश, नक्षत्र चरण और तात्कालिक प्रभाव का संपूर्ण विश्लेषण।
          </p>
        </div>

        {/* ========================================================================= */}
        {/* TOP RADAR SUMMARY & REFRESH BAR                                           */}
        {/* ========================================================================= */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-400/30">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-cinzel font-bold text-white block">
                सायन/निरयण दृक-पंचांग गणना
              </span>
              <span className="text-[11px] font-mono text-gray-400">
                चित्रापक्षीय अयनांश: 24° 12' 48"
              </span>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLiveSyncing ? 'animate-spin' : ''}`} />
            <span>लाइव गोचर रिफ्रेश</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* PLANETARY TRANSIT GRID & SELECTION                                        */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {LIVE_TRANSITS.map(t => {
            const isSelected = selectedPlanet.planet === t.planet;
            return (
              <button
                key={t.planet}
                onClick={() => {
                  setSelectedPlanet(t);
                  try {
                    cosmicAudio.playTone(432, 0.06);
                  } catch {}
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  isSelected 
                    ? 'bg-cyan-500/20 border-cyan-400 ring-1 ring-cyan-400/60 shadow-lg' 
                    : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-base shadow"
                      style={{ backgroundColor: `${t.color}33`, color: t.color }}
                    >
                      {t.symbol}
                    </span>
                    <div>
                      <span className="text-xs font-cinzel font-bold block text-white">
                        {t.planet}
                      </span>
                      <span className="text-[10px] font-serif text-gray-400">{t.hindiName}</span>
                    </div>
                  </div>
                  
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                    t.status.includes('Retrograde') 
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-400/40' 
                      : t.status.includes('Combust')
                      ? 'bg-red-500/20 text-red-300 border border-red-400/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                  }`}>
                    {t.status}
                  </span>
                </div>

                <div className="space-y-1 text-[11px] font-mono">
                  <div className="flex justify-between text-gray-300">
                    <span>वर्तमान राशि:</span>
                    <span className="font-bold text-amber-300">{t.sign}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>स्पष्ट भोगांश:</span>
                    <span className="font-bold text-cyan-300">{t.degree}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-[10px]">
                    <span>नक्षत्र / चरण:</span>
                    <span>{t.nakshatra} (पाद {t.pada})</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* SELECTED PLANET DEEP ANALYSIS & VEDIC REMEDY CARD                         */}
        {/* ========================================================================= */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-900/30 to-cyan-900/20 border border-amber-400/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <span 
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl shadow"
                style={{ backgroundColor: `${selectedPlanet.color}33`, color: selectedPlanet.color }}
              >
                {selectedPlanet.symbol}
              </span>
              <div>
                <h3 className="text-base font-cinzel font-bold text-[#fef08a]">
                  {selectedPlanet.planet} - गोचर फल व उपाय (Detailed Remedy)
                </h3>
                <span className="text-xs font-serif text-gray-300">
                  वर्तमान स्थिति: {selectedPlanet.sign} • {selectedPlanet.degree} • {selectedPlanet.status}
                </span>
              </div>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
              selectedPlanet.influence.includes('Shubh')
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                : 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
            }`}>
              प्रभाव: {selectedPlanet.influence}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-cinzel font-bold text-emerald-300 block">
                  वैदिक शांति व संवर्धन उपाय (Vedic Alignment):
                </span>
                <p className="text-xs font-serif text-gray-200 mt-0.5 leading-relaxed">
                  {selectedPlanet.remedy}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-cinzel font-bold text-xs shadow-lg transition-all cursor-pointer"
          >
            वेधशाला बंद करें (Close)
          </button>
        </div>
      </motion.div>
    </div>
  );
};
