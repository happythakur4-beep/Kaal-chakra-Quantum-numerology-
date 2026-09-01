import React, { useState, useEffect } from 'react';
import { ThemeMode } from '../types';
import { 
  Bell, 
  BellRing, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Sun, 
  Moon, 
  AlertTriangle, 
  Award, 
  Flame, 
  Heart, 
  ShieldCheck, 
  ChevronRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { cosmicAudio } from '../utils/audioSynthesizer';

interface DailyMuhuratAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
}

interface SadhanaHabit {
  id: string;
  title: string;
  hindiTitle: string;
  points: number;
  completed: boolean;
  icon: string;
  category: 'mantra' | 'seva' | 'dhyan';
}

const INITIAL_HABITS: SadhanaHabit[] = [
  {
    id: 'h1',
    title: 'Morning Gayatri / Mahamrityunjaya Japa (108 times)',
    hindiTitle: 'प्रातः गायत्री अथवा महामृत्युंजय जप (1 माला)',
    points: 25,
    completed: true,
    icon: '🕉️',
    category: 'mantra'
  },
  {
    id: 'h2',
    title: 'Offer Arghya to Lord Surya at Sunrise',
    hindiTitle: 'प्रातः सूर्य देव को तांबे के लोटे से अर्घ्य',
    points: 20,
    completed: true,
    icon: '☀️',
    category: 'seva'
  },
  {
    id: 'h3',
    title: 'Feed birds / stray cows (Punya Karma)',
    hindiTitle: 'पक्षियों को दाना अथवा गौ सेवा (पुण्य कर्म)',
    points: 30,
    completed: false,
    icon: '🕊️',
    category: 'seva'
  },
  {
    id: 'h4',
    title: '15 Mins 432Hz Cosmic Meditation / Silence',
    hindiTitle: '15 मिनट 432Hz कॉस्मिक मौन ध्यान साधना',
    points: 25,
    completed: false,
    icon: '✨',
    category: 'dhyan'
  },
];

export const DailyMuhuratAlertModal: React.FC<DailyMuhuratAlertModalProps> = ({
  isOpen,
  onClose,
  theme
}) => {
  const isDark = theme === 'dark';
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [habits, setHabits] = useState<SadhanaHabit[]>(INITIAL_HABITS);
  const [currentStreak, setCurrentStreak] = useState(14);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const nextState = !h.completed;
        if (nextState) {
          try {
            cosmicAudio.playTone(528, 0.15);
            confetti({
              particleCount: 30,
              spread: 50,
              origin: { y: 0.7 },
              colors: ['#ffd700', '#10b981', '#38bdf8']
            });
          } catch {}
          setToastMessage(`✨ संकल्प पूर्ण! +${h.points} पुण्य बिंदु कर्म लेजर में जुड़े।`);
          setTimeout(() => setToastMessage(null), 3000);
        }
        return { ...h, completed: nextState };
      }
      return h;
    }));
  };

  const handleToggleAlerts = () => {
    const next = !alertsEnabled;
    setAlertsEnabled(next);
    try {
      cosmicAudio.playTone(next ? 639 : 432, 0.1);
    } catch {}
    setToastMessage(next ? '🔔 दैनिक शुभ चौघड़िया व राहुकाल अलर्ट सक्रिय!' : '🔕 दैनिक अलर्ट मूक किए गए।');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const completedCount = habits.filter(h => h.completed).length;
  const totalPoints = habits.filter(h => h.completed).reduce((sum, h) => sum + h.points, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xl animate-in fade-in select-none">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 p-6 sm:p-8 shadow-2xl space-y-6 ${
          isDark 
            ? 'bg-gradient-to-b from-[#130f24] via-[#090714] to-black border-amber-400/60 text-white shadow-[0_0_50px_rgba(245,158,11,0.25)]' 
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
              <Clock className="w-3.5 h-3.5" />
              <span>TODAY'S VEDIC ALERTS & SADHANA LOOP</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400" />
              <span>{currentStreak} Day Sadhana Streak</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#fef08a]">
            दैनिक शुभ मुहूर्त, राहुकाल एवं नित्य साधना संकल्प
          </h2>
          <p className="text-xs sm:text-sm font-serif text-gray-300 leading-relaxed">
            ग्रहों की शुभता के अनुसार दिनचर्या का समायोजन और नित्य पुण्य कर्म का सुगम ट्रैकिंग सिस्टम।
          </p>
        </div>

        {/* TODAY'S LIVE MUHURAT STRIP */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Abhijit Muhurat */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase flex items-center gap-1">
              <Sun className="w-3 h-3 text-emerald-400" />
              <span>अभिजित मुहूर्त (सर्वश्रेष्ठ)</span>
            </span>
            <div className="text-sm font-mono font-bold text-white">11:58 AM - 12:48 PM</div>
            <span className="text-[10px] font-serif text-gray-300 block">सभी नवीन कार्यों हेतु शुभ</span>
          </div>

          {/* Rahukaal */}
          <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-1">
            <span className="text-[10px] font-mono text-rose-400 font-bold uppercase flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-rose-400" />
              <span>राहुकाल (त्याज्य समय)</span>
            </span>
            <div className="text-sm font-mono font-bold text-white">04:30 PM - 06:00 PM</div>
            <span className="text-[10px] font-serif text-gray-300 block">शुभ कार्य आरंभ न करें</span>
          </div>

          {/* Amrit Kaal */}
          <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-1">
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>अमृत काल / चौघड़िया</span>
            </span>
            <div className="text-sm font-mono font-bold text-white">07:22 AM - 08:54 AM</div>
            <span className="text-[10px] font-serif text-gray-300 block">मंत्र सिद्धि व पूजा मुहूर्त</span>
          </div>
        </div>

        {/* NOTIFICATION TOGGLE */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${alertsEnabled ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-white/5 border-white/10 text-gray-400'}`}>
              {alertsEnabled ? <BellRing className="w-5 h-5 animate-bounce" /> : <Bell className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-cinzel font-bold text-white">
                दैनिक शुभ समय व राहुकाल अलर्ट (Daily Push Alerts)
              </h4>
              <p className="text-[11px] font-serif text-gray-400">
                प्रतिदिन सुबह 06:00 बजे आज के शुभ चौघड़िया व राहुकाल का रिमाइंडर प्राप्त करें।
              </p>
            </div>
          </div>

          <button
            onClick={handleToggleAlerts}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              alertsEnabled ? 'bg-amber-500 text-black shadow-md' : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {alertsEnabled ? 'सक्रिय (Active)' : 'सक्रिय करें (Enable)'}
          </button>
        </div>

        {/* DAILY SADHANA SANKALPA CHECKLIST */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-cinzel font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>आज का नित्य साधना संकल्प (Daily Karma Sadhana)</span>
            </h4>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              {completedCount}/{habits.length} पूर्ण • {totalPoints} Punya Points
            </span>
          </div>

          <div className="space-y-2.5">
            {habits.map(h => (
              <button
                key={h.id}
                onClick={() => toggleHabit(h.id)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  h.completed 
                    ? 'bg-emerald-500/15 border-emerald-400/80 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                    : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/25'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{h.icon}</span>
                  <div>
                    <span className={`text-xs font-serif font-bold block ${h.completed ? 'line-through opacity-80' : ''}`}>
                      {h.hindiTitle}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 block">{h.title}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-300">+{h.points} pt</span>
                  <CheckCircle2 className={`w-5 h-5 ${h.completed ? 'text-emerald-400' : 'text-gray-600'}`} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Toast */}
        {toastMessage && (
          <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-400 text-emerald-200 text-xs font-mono text-center animate-in fade-in">
            {toastMessage}
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
          <span>साधना से कर्म शुद्ध होता है 🙏</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 text-black font-cinzel font-bold text-xs hover:bg-amber-400 transition-all cursor-pointer shadow"
          >
            पूर्ण (Done)
          </button>
        </div>
      </motion.div>
    </div>
  );
};
