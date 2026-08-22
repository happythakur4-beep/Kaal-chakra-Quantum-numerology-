import React, { useState } from 'react';
import { ThemeMode, UserProfile } from '../../types';
import { generateLalKitabData, LalKitabData } from '../../utils/astrologyEngine';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { 
  BookOpen, 
  ShieldAlert, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Compass, 
  User, 
  Calendar, 
  MapPin, 
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LalKitabScreenProps {
  theme: ThemeMode;
  user: UserProfile;
}

export const LalKitabScreen: React.FC<LalKitabScreenProps> = ({ theme, user }) => {
  const isDark = theme === 'dark';

  const [userName, setUserName] = useState(user.name || 'Arjuna Sharma');
  const [birthDate, setBirthDate] = useState(user.birthDate || '1996-07-14');
  const [birthTime, setBirthTime] = useState(user.birthTime || '08:30');
  const [birthCity, setBirthCity] = useState(user.birthCity || 'Varanasi, India');

  const [lalKitabData, setLalKitabData] = useState<LalKitabData>(() =>
    generateLalKitabData(userName, birthDate, birthTime, birthCity)
  );

  const [activeTab, setActiveTab] = useState<'debts' | 'teva' | 'varshphal' | 'rules'>('debts');
  const [selectedDebtId, setSelectedDebtId] = useState<string>('rin-1');

  const handleRecalculate = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      cosmicAudio.playFrequency(528);
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
    } catch {}
    const data = generateLalKitabData(userName, birthDate, birthTime, birthCity);
    setLalKitabData(data);
  };

  const selectedDebt = lalKitabData.debts.find(d => d.id === selectedDebtId) || lalKitabData.debts[0];

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 py-6 md:py-10">
      
      {/* Top Hero Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 text-xs font-cinzel tracking-wider text-rose-400"
          style={{
            backgroundColor: isDark ? 'rgba(244, 63, 94, 0.1)' : 'rgba(244, 63, 94, 0.12)',
            borderColor: isDark ? 'rgba(244, 63, 94, 0.3)' : 'rgba(244, 63, 94, 0.4)',
          }}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Red Book Mysteries & Karmic Upayas</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-3xl-gold tracking-wide uppercase mb-2">
          Lal Kitab Teva & Debts (ऋण)
        </h1>
        <p className={`text-xs sm:text-sm font-serif max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}>
          Classical 1939 Red Book occult system: 9 Ancestral Debts (Pitru Rin, Matru Rin, Stri Rin), Pakka Ghar analysis, Soya Ghar activations, and exact non-destructive Upayas.
        </p>
      </div>

      {/* Input Parameters Form */}
      <form onSubmit={handleRecalculate} className="no-print p-4 rounded-xl border mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 shadow-md"
        style={{
          backgroundColor: isDark ? 'rgba(18, 18, 28, 0.85)' : 'rgba(255, 252, 245, 0.95)',
          borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.5)',
        }}
      >
        <div>
          <label className="text-[0.7rem] font-cinzel text-[#d4af37] block mb-1">Seeker Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={`w-full px-3 py-1.5 rounded-lg border text-xs font-serif outline-none ${
              isDark ? 'bg-black/60 border-[#d4af37]/40 text-amber-100' : 'bg-white border-[#c5a059] text-gray-900'
            }`}
          />
        </div>
        <div>
          <label className="text-[0.7rem] font-cinzel text-[#d4af37] block mb-1">Birth Date</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className={`w-full px-3 py-1.5 rounded-lg border text-xs font-mono outline-none ${
              isDark ? 'bg-black/60 border-[#d4af37]/40 text-amber-100' : 'bg-white border-[#c5a059] text-gray-900'
            }`}
          />
        </div>
        <div>
          <label className="text-[0.7rem] font-cinzel text-[#d4af37] block mb-1">Birth Time</label>
          <input
            type="time"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            className={`w-full px-3 py-1.5 rounded-lg border text-xs font-mono outline-none ${
              isDark ? 'bg-black/60 border-[#d4af37]/40 text-amber-100' : 'bg-white border-[#c5a059] text-gray-900'
            }`}
          />
        </div>
        <div>
          <label className="text-[0.7rem] font-cinzel text-[#d4af37] block mb-1">Birth City</label>
          <input
            type="text"
            value={birthCity}
            onChange={(e) => setBirthCity(e.target.value)}
            className={`w-full px-3 py-1.5 rounded-lg border text-xs font-serif outline-none ${
              isDark ? 'bg-black/60 border-[#d4af37]/40 text-amber-100' : 'bg-white border-[#c5a059] text-gray-900'
            }`}
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-maroon-gradient border border-[#d4af37] text-[#fdf2d1] font-cinzel text-xs font-bold hover:shadow-lg transition-all cursor-pointer"
          >
            Compute Lal Kitab
          </button>
        </div>
      </form>

      {/* Tabs */}
      <div className="no-print flex items-center gap-2 mb-6 border-b border-[#d4af37]/30 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('debts')}
          className={`px-4 py-2 rounded-t-lg font-cinzel text-xs font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'debts'
              ? 'bg-[#d4af37]/20 border-b-2 border-rose-500 text-rose-400'
              : 'text-gray-400 hover:text-amber-200'
          }`}
        >
          1. 9 Planetary Debts (ऋण & Upayas)
        </button>
        <button
          onClick={() => setActiveTab('teva')}
          className={`px-4 py-2 rounded-t-lg font-cinzel text-xs font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'teva'
              ? 'bg-[#d4af37]/20 border-b-2 border-[#d4af37] text-[#d4af37]'
              : 'text-gray-400 hover:text-amber-200'
          }`}
        >
          2. Lal Kitab Teva & Pakka Ghar
        </button>
        <button
          onClick={() => setActiveTab('varshphal')}
          className={`px-4 py-2 rounded-t-lg font-cinzel text-xs font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'varshphal'
              ? 'bg-[#d4af37]/20 border-b-2 border-[#d4af37] text-[#d4af37]'
              : 'text-gray-400 hover:text-amber-200'
          }`}
        >
          3. Lal Kitab Varshphal (Annual)
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={`px-4 py-2 rounded-t-lg font-cinzel text-xs font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'rules'
              ? 'bg-[#d4af37]/20 border-b-2 border-[#d4af37] text-[#d4af37]'
              : 'text-gray-400 hover:text-amber-200'
          }`}
        >
          4. 10 Sacred Niyams & Precautions
        </button>
      </div>

      {/* TAB 1: 9 Planetary Debts & Remedies */}
      {activeTab === 'debts' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          {/* Left Column: List of Debts */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-cinzel text-[#d4af37] uppercase tracking-wider mb-2">
              Ancestral & Karmic Debt Diagnoser
            </h3>
            {lalKitabData.debts.map((debt) => (
              <div
                key={debt.id}
                onClick={() => setSelectedDebtId(debt.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedDebtId === debt.id
                    ? 'border-rose-500 bg-rose-950/30 ring-1 ring-rose-500 shadow-md'
                    : isDark ? 'bg-black/40 border-[#d4af37]/20 hover:border-[#d4af37]/50' : 'bg-white border-[#c5a059]/40 hover:border-[#c5a059]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-cinzel font-bold text-[#fdf2d1]">{debt.name}</span>
                  </div>
                  <span className="text-[0.65rem] font-serif text-gray-400 block mt-0.5">
                    Planet: {debt.planet}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[0.6rem] font-mono px-2 py-0.5 rounded font-bold ${
                    debt.isDetected ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {debt.isDetected ? 'Active Debt' : 'Clear'}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Selected Debt Deep Breakdown & Specific Upaya */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl border relative shadow-xl"
              style={{
                background: isDark 
                  ? 'linear-gradient(135deg, rgba(30, 15, 25, 0.95) 0%, rgba(15, 10, 20, 0.95) 100%)' 
                  : 'linear-gradient(135deg, #fffdf8 0%, #fdf2f2 100%)',
                borderColor: selectedDebt.isDetected ? 'rgba(244, 63, 94, 0.5)' : 'rgba(212, 175, 55, 0.4)',
              }}
            >
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-4 mb-4">
                <div>
                  <span className="text-[0.7rem] font-mono text-rose-400 uppercase tracking-widest block font-bold">
                    {selectedDebt.sanskrit} • {selectedDebt.planet}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-[#fdf2d1]">
                    {selectedDebt.name}
                  </h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                  selectedDebt.isDetected ? 'bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.5)]' : 'bg-emerald-600 text-white'
                }`}>
                  {selectedDebt.severity}
                </div>
              </div>

              {/* Cause */}
              <div className="mb-4">
                <span className="text-xs font-cinzel text-amber-400 uppercase tracking-wider block mb-1">
                  Classical Root Cause:
                </span>
                <p className={`text-xs sm:text-sm font-serif leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {selectedDebt.cause}
                </p>
              </div>

              {/* Indications in Life */}
              <div className="mb-6">
                <span className="text-xs font-cinzel text-amber-400 uppercase tracking-wider block mb-2">
                  Observed Manifestations in Life:
                </span>
                <ul className="space-y-2">
                  {selectedDebt.indications.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs font-serif text-gray-300">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Authentic Upaya (Remedy) */}
              <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 relative">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-cinzel font-bold text-[#d4af37] uppercase">
                    Prescribed Lal Kitab Upaya (Remedy)
                  </h4>
                </div>
                <p className="text-xs sm:text-sm font-serif text-amber-100 leading-relaxed font-semibold">
                  {selectedDebt.remedy}
                </p>
                <span className="text-[0.65rem] font-mono text-amber-400/80 block mt-2">
                  * Note: Perform strictly between sunrise and sunset. Follow the 43-day non-interruption rule.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Lal Kitab Teva & Pakka Ghar */}
      {activeTab === 'teva' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-4 rounded-xl border border-[#d4af37]/30 bg-black/40 text-xs font-serif text-gray-300 flex items-center justify-between">
            <div>
              <strong className="text-[#d4af37] font-cinzel">Lal Kitab Natural Kalpurush Chart: </strong>
              First house is permanently Aries (Mars/Sun), 2nd Taurus (Venus/Jupiter), 9th Sagittarius (Jupiter), and 10th Capricorn (Saturn).
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lalKitabData.pakkaHouses.map((house) => (
              <div
                key={`lk-house-${house.house}`}
                className={`p-4 rounded-xl border transition-all ${
                  house.soyaGhar 
                    ? 'border-gray-600/40 bg-gray-900/30 opacity-75' 
                    : 'border-[#d4af37]/40 bg-[#d4af37]/5 hover:scale-[1.02]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-cinzel font-bold text-[#d4af37]">House {house.house}</span>
                  <span className={`text-[0.6rem] font-mono px-2 py-0.5 rounded ${
                    house.soyaGhar ? 'bg-gray-700 text-gray-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {house.status.split('(')[0]}
                  </span>
                </div>
                <div className="text-xs font-serif text-[#fdf2d1] mb-1">
                  Pakka Lord: <strong>{house.pakkaGharLord}</strong>
                </div>
                <div className="text-[0.7rem] font-serif text-gray-400">
                  Kismat Planet: <strong>{house.kismatLord}</strong>
                </div>
                <div className="mt-2 pt-2 border-t border-amber-500/20 text-[0.65rem] font-mono text-amber-300">
                  Occupants: {house.planets.length > 0 ? house.planets.join(', ') : 'Empty (Ruled by Pakka Lord)'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Varshphal Annual Progression */}
      {activeTab === 'varshphal' && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-sm font-cinzel font-bold text-[#d4af37] uppercase tracking-wider mb-2">
            Lal Kitab Annual Varshphal Forecast & Annual Upayas
          </h3>
          <div className="space-y-4">
            {lalKitabData.varshphalRemedies.map((vp, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-[#d4af37]/30 bg-black/40 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded bg-[#d4af37]/20 text-[#d4af37] text-xs font-cinzel font-bold">
                      Year {vp.year} (Age {vp.age})
                    </span>
                    <strong className="text-xs font-cinzel text-white">{vp.focusPlanet}</strong>
                  </div>
                  <span className="text-[0.65rem] font-mono text-amber-300">Lal Kitab Progression</span>
                </div>
                <p className="text-xs font-serif text-gray-200 mb-3 leading-relaxed">
                  {vp.prediction}
                </p>
                <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 flex items-start gap-2">
                  <Flame className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-serif text-amber-100 font-semibold">
                    Annual Upaya: {vp.upaya}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: 10 Sacred Niyams & Precautions */}
      {activeTab === 'rules' && (
        <div className="p-6 rounded-2xl border border-[#d4af37]/40 bg-black/50 space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-[#d4af37]" />
            <h3 className="text-base font-cinzel font-bold text-3xl-gold">
              The Golden Niyams of Lal Kitab Practice
            </h3>
          </div>
          <p className="text-xs font-serif text-gray-300 leading-relaxed mb-4">
            Unlike traditional gemstones that permanently amplify planetary radiation, Lal Kitab Upayas are purely homeopathic and karmic rebalancers designed to placate malefic energy without collateral harm:
          </p>
          <div className="space-y-3">
            {lalKitabData.goldenRules.map((rule, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs font-serif text-amber-100 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
