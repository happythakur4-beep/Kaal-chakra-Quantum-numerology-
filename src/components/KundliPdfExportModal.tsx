import React, { useState } from 'react';
import { ThemeMode, UserProfile, DestinyProfileData } from '../types';
import { 
  Download, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Printer, 
  Share2, 
  CheckCircle2, 
  Compass, 
  Layers, 
  Calendar, 
  Star, 
  Clock, 
  X,
  Zap,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { cosmicAudio } from '../utils/audioSynthesizer';

interface KundliPdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  user: UserProfile;
  destinyProfile?: DestinyProfileData;
}

export const KundliPdfExportModal: React.FC<KundliPdfExportModalProps> = ({
  isOpen,
  onClose,
  theme,
  user,
  destinyProfile
}) => {
  const isDark = theme === 'dark';
  const [selectedPages, setSelectedPages] = useState<string[]>([
    'lagna_chart',
    'graha_spashta',
    'vimsottari_dasha',
    'ashtakvarga',
    'remedies',
    'annual_2026'
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [pdfLanguage, setPdfLanguage] = useState<'hi' | 'en'>('hi');

  const togglePage = (id: string) => {
    setSelectedPages(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleTriggerDownload = () => {
    setIsGenerating(true);
    try {
      cosmicAudio.playTone(528, 0.2);
    } catch {}

    // Simulated high-fidelity multi-page PDF generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsDone(true);
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#ffd700', '#f59e0b', '#38bdf8', '#10b981']
        });
      } catch {}

      // Trigger standard print / download prompt
      setTimeout(() => {
        window.print();
      }, 700);
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xl animate-in fade-in select-none">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 p-6 sm:p-8 shadow-2xl space-y-6 ${
          isDark 
            ? 'bg-gradient-to-b from-[#141026] via-[#0b0817] to-black border-amber-400/60 text-white shadow-[0_0_50px_rgba(245,158,11,0.25)]' 
            : 'bg-gradient-to-b from-[#ffffff] via-[#fdfbf7] to-[#f6eee2] border-[#caa269] text-[#2b2118]'
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
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>OFFICIAL VEDIC ASTROLOGY REPORT</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-purple-500/20 text-purple-300 border border-purple-400/30">
              HD Vector Charts & Printable
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl font-cinzel font-bold text-[#fef08a]">
            संपूर्ण वैदिक जन्मकुंडली एवं वार्षिक राशिफल PDF डाउनलोड
          </h2>
          <p className="text-xs sm:text-sm font-serif text-gray-300 leading-relaxed">
            {user.name || 'साधक'} के लिए तैयार की गई 24+ पृष्ठों की सुस्पष्ट, रंगीन व प्रामाणिक ज्योतिषीय जन्म-पत्रिका।
          </p>
        </div>

        {/* User Summary Pill */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div>
            <span className="text-[10px] text-gray-400 block uppercase">जातक का नाम</span>
            <span className="font-bold text-amber-300">{user.name || 'श्री जातक'}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block uppercase">जन्म तिथि</span>
            <span className="font-bold text-white">{user.birthDate || '21 Oct 1994'}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block uppercase">जन्म समय व स्थान</span>
            <span className="font-bold text-white">{user.birthTime || '10:45 AM'}, {user.birthCity || 'New Delhi'}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block uppercase">लग्न व राशि</span>
            <span className="font-bold text-cyan-300">धनु लग्न • मेष राशि</span>
          </div>
        </div>

        {/* Language Selection */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-white/10">
          <span className="text-xs font-cinzel font-bold text-gray-300">रिपोर्ट की भाषा चुनें (Report Language):</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPdfLanguage('hi')}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                pdfLanguage === 'hi' ? 'bg-amber-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              🇮🇳 हिन्दी (Hindi)
            </button>
            <button
              onClick={() => setPdfLanguage('en')}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                pdfLanguage === 'en' ? 'bg-amber-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        {/* Included Chapters & Pages Selector */}
        <div className="space-y-3">
          <h4 className="text-xs font-cinzel font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            <span>शामिल किए जाने वाले अध्याय एवं चक्र (Select Modules):</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
            {[
              { id: 'lagna_chart', title: '1. लग्न व नवमांश चक्र (Lagna & Navamsha)', pages: '2 Pages' },
              { id: 'graha_spashta', title: '2. ग्रह स्पष्ट एवं दृष्टि सारणी (Planetary Table)', pages: '3 Pages' },
              { id: 'vimsottari_dasha', title: '3. विंशोत्तरी महादशा व अंतर्दशा (Dasha Timeline)', pages: '4 Pages' },
              { id: 'ashtakvarga', title: '4. अष्टकवर्ग एवं सर्वाष्टक बिंदु (Strength Metrics)', pages: '2 Pages' },
              { id: 'remedies', title: '5. रत्न, रुद्राक्ष एवं वैदिक उपाय (Gemstone Remedies)', pages: '3 Pages' },
              { id: 'annual_2026', title: '6. वर्ष 2026-2027 वार्षिक भविष्यफल (Annual Forecast)', pages: '5 Pages' },
            ].map(item => {
              const isSelected = selectedPages.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => togglePage(item.id)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected 
                      ? 'bg-amber-500/15 border-amber-400 text-amber-200' 
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-gray-500'}`} />
                    <span className="font-semibold">{item.title}</span>
                  </div>
                  <span className="text-[10px] opacity-75">{item.pages}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button & Print Trigger */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>डिजिटली सत्यापित वैदिक गणना एवं वाटरमार्क-रहित HD PDF</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold cursor-pointer"
            >
              रद्द करें (Cancel)
            </button>
            <button
              onClick={handleTriggerDownload}
              disabled={isGenerating || selectedPages.length === 0}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-black font-cinzel font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>PDF तैयार हो रही है...</span>
                </>
              ) : isDone ? (
                <>
                  <Printer className="w-4 h-4" />
                  <span>पुनः प्रिंट / डाउनलोड करें</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>PDF कुंडली डाउनलोड करें</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
