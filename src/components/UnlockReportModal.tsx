import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { Sparkles, Calendar, User, Mail, MapPin, Clock, X, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

interface UnlockReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string, birthDate: string, birthTime: string, birthCity: string) => void;
  theme: ThemeMode;
  initialName?: string;
  initialEmail?: string;
}

export const UnlockReportModal: React.FC<UnlockReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  theme,
  initialName = '',
  initialEmail = '',
}) => {
  const [name, setName] = useState(initialName || 'Anya Sharma');
  const [email, setEmail] = useState(initialEmail || 'anya.sharma@celestialdawn.org');
  const [birthDate, setBirthDate] = useState('1996-07-14');
  const [birthTime, setBirthTime] = useState('06:45');
  const [birthCity, setBirthCity] = useState('Varanasi, India');
  const [isCalculating, setIsCalculating] = useState(false);

  if (!isOpen) return null;

  const isDark = theme === 'dark';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#fdf2d1', '#8a001a', '#ffdda1'],
      });
    } catch {}

    setTimeout(() => {
      setIsCalculating(false);
      onSubmit(name, email, birthDate, birthTime, birthCity);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl border transition-all ${
          isDark 
            ? 'bg-[#10101a] border-[#d4af37]/40 shadow-[0_0_35px_rgba(212,175,55,0.25)] text-gray-200' 
            : 'bg-[#fdfbf6] border-[#c5a059]/60 shadow-[0_10px_40px_rgba(180,140,50,0.2)] text-[#3b2b0a]'
        }`}
      >
        {/* Close Button */}
        <button
          id="unlock-modal-close-btn"
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-amber-100 text-amber-800'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 mb-3 text-[#d4af37]">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <h2 className="text-2xl font-cinzel font-bold text-gold-gradient tracking-wide">
            Calculate Quantum Cosmic Destiny
          </h2>
          <p className={`text-xs mt-1 font-serif ${isDark ? 'text-gray-400' : 'text-amber-900/80'}`}>
            Enter natal coordinates to synchronize your Pythagorean, Vedic & Bio-Resonance profile.
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm font-serif">
          
          {/* Full Name */}
          <div>
            <label className={`block text-xs font-cinzel mb-1 ${isDark ? 'text-[#fdf2d1]' : 'text-[#5a4313]'}`}>
              Full Name (as on birth record)
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-[#d4af37]/70" />
              <input
                id="modal-input-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Anya Sharma"
                className={`w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm transition-all ${
                  isDark
                    ? 'bg-black/50 border-[#d4af37]/30 text-gray-200 placeholder-gray-500 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]'
                    : 'bg-white border-[#c5a059]/50 text-[#3b2b0a] placeholder-amber-900/40 focus:border-[#8a6514] focus:ring-1 focus:ring-[#8a6514]'
                }`}
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className={`block text-xs font-cinzel mb-1 ${isDark ? 'text-[#fdf2d1]' : 'text-[#5a4313]'}`}>
              Email Address (for verified certificate delivery)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-[#d4af37]/70" />
              <input
                id="modal-input-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. anya.sharma@celestialdawn.org"
                className={`w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm transition-all ${
                  isDark
                    ? 'bg-black/50 border-[#d4af37]/30 text-gray-200 placeholder-gray-500 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]'
                    : 'bg-white border-[#c5a059]/50 text-[#3b2b0a] placeholder-amber-900/40 focus:border-[#8a6514] focus:ring-1 focus:ring-[#8a6514]'
                }`}
              />
            </div>
          </div>

          {/* Date & Time of Birth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-cinzel mb-1 ${isDark ? 'text-[#fdf2d1]' : 'text-[#5a4313]'}`}>
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-3 text-[#d4af37]/70" />
                <input
                  id="modal-input-birthdate"
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm transition-all ${
                    isDark
                      ? 'bg-black/50 border-[#d4af37]/30 text-gray-200 focus:border-[#d4af37]'
                      : 'bg-white border-[#c5a059]/50 text-[#3b2b0a] focus:border-[#8a6514]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-cinzel mb-1 ${isDark ? 'text-[#fdf2d1]' : 'text-[#5a4313]'}`}>
                Exact Time of Birth
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 absolute left-3 top-3 text-[#d4af37]/70" />
                <input
                  id="modal-input-birthtime"
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm transition-all ${
                    isDark
                      ? 'bg-black/50 border-[#d4af37]/30 text-gray-200 focus:border-[#d4af37]'
                      : 'bg-white border-[#c5a059]/50 text-[#3b2b0a] focus:border-[#8a6514]'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Birth City */}
          <div>
            <label className={`block text-xs font-cinzel mb-1 ${isDark ? 'text-[#fdf2d1]' : 'text-[#5a4313]'}`}>
              Place of Birth (City, Country)
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-3 text-[#d4af37]/70" />
              <input
                id="modal-input-birthcity"
                type="text"
                value={birthCity}
                onChange={(e) => setBirthCity(e.target.value)}
                placeholder="e.g. Varanasi, India"
                className={`w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm transition-all ${
                  isDark
                    ? 'bg-black/50 border-[#d4af37]/30 text-gray-200 placeholder-gray-500 focus:border-[#d4af37]'
                    : 'bg-white border-[#c5a059]/50 text-[#3b2b0a] placeholder-amber-900/40 focus:border-[#8a6514]'
                }`}
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            id="modal-submit-unlock-btn"
            type="submit"
            disabled={isCalculating}
            className="w-full btn-soft-glow bg-maroon-gradient border border-[#d4af37] text-[#fdf2d1] font-cinzel font-bold text-base py-3 rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
          >
            {isCalculating ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin text-[#d4af37]" />
                <span>Synchronizing Quantum Matrix...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                <span>Generate Professional Destiny Profile →</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
