import React, { useState } from 'react';
import { ThemeMode, UserProfile } from '../../types';
import { generateKPData, generateKPPrashna, KPData } from '../../utils/astrologyEngine';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { 
  Compass, 
  Orbit, 
  Sparkles, 
  Layers, 
  Search, 
  CheckCircle2, 
  HelpCircle, 
  Flame, 
  Clock, 
  Award, 
  Grid,
  Zap,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface KPAstrologyScreenProps {
  theme: ThemeMode;
  user: UserProfile;
}

export const KPAstrologyScreen: React.FC<KPAstrologyScreenProps> = ({ theme, user }) => {
  const isDark = theme === 'dark';

  const [userName, setUserName] = useState(user.name || 'Arjuna Sharma');
  const [birthDate, setBirthDate] = useState(user.birthDate || '1996-07-14');
  const [birthTime, setBirthTime] = useState(user.birthTime || '08:30');
  const [birthCity, setBirthCity] = useState(user.birthCity || 'Varanasi, India');

  const [kpData, setKpData] = useState<KPData>(() =>
    generateKPData(userName, birthDate, birthTime, birthCity)
  );

  const [activeTab, setActiveTab] = useState<'cusps' | 'planets' | 'significators' | 'prashna'>('cusps');

  // Horary state
  const [horaryNum, setHoraryNum] = useState<number>(147);
  const [horaryQuery, setHoraryQuery] = useState<'job' | 'marriage' | 'business' | 'property'>('job');
  const [prashnaResult, setPrashnaResult] = useState(() => generateKPPrashna(147, 'job'));

  const handleRecalculate = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      cosmicAudio.playFrequency(528);
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
    } catch {}
    const data = generateKPData(userName, birthDate, birthTime, birthCity);
    setKpData(data);
  };

  const handleRunPrashna = () => {
    try {
      cosmicAudio.playFrequency(639);
    } catch {}
    const result = generateKPPrashna(horaryNum, horaryQuery);
    setPrashnaResult(result);
  };

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 py-6 md:py-10">
      
      {/* Top Hero Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 text-xs font-cinzel tracking-wider text-cyan-400"
          style={{
            backgroundColor: isDark ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.12)',
            borderColor: isDark ? 'rgba(6, 182, 212, 0.3)' : 'rgba(6, 182, 212, 0.4)',
          }}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Krishnamurti Paddhati (KP System)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-3xl-gold tracking-wide uppercase mb-2">
          KP Astrology & Sub-Lord Table
        </h1>
        <p className={`text-xs sm:text-sm font-serif max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}>
          Precision stellar astrology developed by Prof. K.S. Krishnamurti: Placidus Cusp Chalit, 249 Sub-Lord subdivisions, 4-Fold Significators, and Horary (Prashna) Kundli.
        </p>
      </div>

      {/* Input Form */}
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
            Compute KP Matrix
          </button>
        </div>
      </form>

      {/* KP Ruling Planets Banner */}
      <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[0.65rem] font-cinzel uppercase tracking-widest text-cyan-400 font-bold block">
            Ayanamsha: {kpData.ayanamsha}
          </span>
          <h3 className="text-sm sm:text-base font-cinzel font-bold text-white">
            Current KP Ruling Planets (RPs)
          </h3>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-black/50 border border-cyan-500/30 text-cyan-200">
            Lagna Star: <strong>{kpData.rulingPlanets.lagnaStarLord}</strong>
          </span>
          <span className="px-2.5 py-1 rounded bg-black/50 border border-cyan-500/30 text-cyan-200">
            Lagna Sign: <strong>{kpData.rulingPlanets.lagnaSignLord}</strong>
          </span>
          <span className="px-2.5 py-1 rounded bg-black/50 border border-cyan-500/30 text-cyan-200">
            Moon Star: <strong>{kpData.rulingPlanets.moonStarLord}</strong>
          </span>
          <span className="px-2.5 py-1 rounded bg-black/50 border border-cyan-500/30 text-cyan-200">
            Day Lord: <strong>{kpData.rulingPlanets.dayLord}</strong>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="no-print flex items-center gap-2 mb-6 border-b border-[#d4af37]/30 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('cusps')}
          className={`px-4 py-2 rounded-t-lg font-cinzel text-xs font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'cusps'
              ? 'bg-[#d4af37]/20 border-b-2 border-cyan-400 text-cyan-300'
              : 'text-gray-400 hover:text-amber-200'
          }`}
        >
          1. 12 Cusp Chalit (Placidus)
        </button>
        <button
          onClick={() => setActiveTab('planets')}
          className={`px-4 py-2 rounded-t-lg font-cinzel text-xs font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'planets'
              ? 'bg-[#d4af37]/20 border-b-2 border-cyan-400 text-cyan-300'
              : 'text-gray-400 hover:text-amber-200'
          }`}
        >
          2. Planetary Sub-Lords
        </button>
        <button
          onClick={() => setActiveTab('significators')}
          className={`px-4 py-2 rounded-t-lg font-cinzel text-xs font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'significators'
              ? 'bg-[#d4af37]/20 border-b-2 border-cyan-400 text-cyan-300'
              : 'text-gray-400 hover:text-amber-200'
          }`}
        >
          3. 4-Fold Significators
        </button>
        <button
          onClick={() => setActiveTab('prashna')}
          className={`px-4 py-2 rounded-t-lg font-cinzel text-xs font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'prashna'
              ? 'bg-[#d4af37]/20 border-b-2 border-cyan-400 text-cyan-300'
              : 'text-gray-400 hover:text-amber-200'
          }`}
        >
          4. KP Prashna (1-249 Horary)
        </button>
      </div>

      {/* TAB 1: 12 Cusp Chalit Table */}
      {activeTab === 'cusps' && (
        <div className="overflow-x-auto rounded-xl border border-[#d4af37]/30 animate-fade-in shadow-lg">
          <table className="w-full text-left text-xs font-serif">
            <thead className="bg-[#d4af37]/15 font-cinzel text-[#d4af37]">
              <tr>
                <th className="p-3">Cusp</th>
                <th className="p-3">Rashi (Sign)</th>
                <th className="p-3">Degree</th>
                <th className="p-3">Sign Lord</th>
                <th className="p-3">Star Lord (Nakshatra)</th>
                <th className="p-3 text-cyan-300">Sub-Lord (Up-Nakshatra)</th>
                <th className="p-3">Sub-Sub Lord</th>
                <th className="p-3">Significance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-500/10">
              {kpData.cusps.map((c) => (
                <tr key={`cusp-${c.cuspNumber}`} className={isDark ? 'hover:bg-amber-500/5' : 'hover:bg-amber-50'}>
                  <td className="p-3 font-mono font-bold text-amber-400">{c.cuspNumber}</td>
                  <td className="p-3 font-cinzel font-bold text-[#fdf2d1]">{c.rashi}</td>
                  <td className="p-3 font-mono text-gray-300">{c.degree}</td>
                  <td className="p-3 text-gray-200">{c.signLord}</td>
                  <td className="p-3 text-purple-300">{c.starLord}</td>
                  <td className="p-3 font-bold text-cyan-300 bg-cyan-950/20">{c.subLord}</td>
                  <td className="p-3 text-gray-400">{c.subSubLord}</td>
                  <td className="p-3 text-xs text-gray-300">{c.significance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: Planetary Sub-Lords Table */}
      {activeTab === 'planets' && (
        <div className="overflow-x-auto rounded-xl border border-[#d4af37]/30 animate-fade-in shadow-lg">
          <table className="w-full text-left text-xs font-serif">
            <thead className="bg-[#d4af37]/15 font-cinzel text-[#d4af37]">
              <tr>
                <th className="p-3">Planet</th>
                <th className="p-3">Sign</th>
                <th className="p-3">Degree</th>
                <th className="p-3">Star Lord</th>
                <th className="p-3 text-cyan-300">Sub-Lord</th>
                <th className="p-3">Sub-Sub Lord</th>
                <th className="p-3">Signified Houses</th>
                <th className="p-3">Ruling Strength</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-500/10">
              {kpData.planets.map((p) => (
                <tr key={`kp-planet-${p.planet}`} className={isDark ? 'hover:bg-amber-500/5' : 'hover:bg-amber-50'}>
                  <td className="p-3 font-cinzel font-bold text-[#fdf2d1]">{p.planet}</td>
                  <td className="p-3 text-gray-300">{p.sign}</td>
                  <td className="p-3 font-mono text-gray-400">{p.degree}</td>
                  <td className="p-3 text-purple-300">{p.starLord}</td>
                  <td className="p-3 font-bold text-cyan-300 bg-cyan-950/20">{p.subLord}</td>
                  <td className="p-3 text-gray-400">{p.subSubLord}</td>
                  <td className="p-3 font-mono text-amber-300">
                    [{p.signifiesHouses.join(', ')}]
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[0.65rem] font-mono">
                      {p.rulingLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: 4-Fold Significators */}
      {activeTab === 'significators' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 rounded-xl border border-[#d4af37]/30 bg-black/40 text-xs font-serif text-gray-300">
            <strong className="text-[#d4af37] font-cinzel">KP 4-Fold Significators Hierarchy: </strong>
            Level A (Planet in Star of Occupant - Strongest) &gt; Level B (Planet Occupant) &gt; Level C (Planet in Star of Lord) &gt; Level D (House Lord).
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kpData.fourFoldSignificators.map((item) => (
              <div key={`sig-house-${item.house}`} className="p-4 rounded-xl border border-[#d4af37]/30 bg-black/40">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-cinzel font-bold text-[#d4af37]">House {item.house} Significators</h4>
                  <span className="text-[0.65rem] font-mono text-gray-400">KP Level A-D</span>
                </div>
                <div className="space-y-1 text-xs font-serif">
                  <div className="flex justify-between">
                    <span className="text-emerald-400 font-semibold">Level A (Strongest):</span>
                    <span className="font-mono text-white">{item.levelA.join(', ') || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-400 font-semibold">Level B (Occupant):</span>
                    <span className="font-mono text-white">{item.levelB.join(', ') || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-400 font-semibold">Level C (Star of Lord):</span>
                    <span className="font-mono text-white">{item.levelC.join(', ') || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-400 font-semibold">Level D (House Lord):</span>
                    <span className="font-mono text-white">{item.levelD.join(', ') || 'None'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: KP Prashna (1-249 Horary Engine) */}
      {activeTab === 'prashna' && (
        <div className="p-6 rounded-2xl border border-cyan-500/40 bg-black/60 shadow-xl space-y-6 animate-fade-in">
          <div className="flex items-center gap-2 border-b border-cyan-500/30 pb-3">
            <Target className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-cinzel font-bold text-white">
              KP Horary (Prashna Kundli) Number 1 to 249
            </h3>
          </div>
          <p className="text-xs font-serif text-gray-300">
            Select a random integer between 1 and 249 from your intuitive mind to freeze the celestial sub-lord arc for your pressing question:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-cinzel text-cyan-300 block mb-1">Select KP Horary Number (1-249)</label>
              <input
                type="number"
                min="1"
                max="249"
                value={horaryNum}
                onChange={(e) => setHoraryNum(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-cyan-500/40 bg-black/80 text-white font-mono text-sm outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-xs font-cinzel text-cyan-300 block mb-1">Query Domain</label>
              <select
                value={horaryQuery}
                onChange={(e) => setHoraryQuery(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-cyan-500/40 bg-black/80 text-white font-serif text-xs outline-none focus:border-cyan-400"
              >
                <option value="job">Career / Job Promotion / Transfer</option>
                <option value="marriage">Marriage / Relationship Alliance</option>
                <option value="business">Business Expansion / Lucrative Contract</option>
                <option value="property">Property Acquisition / Real Estate</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleRunPrashna}
                className="w-full py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black font-cinzel text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Analyze Sub-Lord Verdict
              </button>
            </div>
          </div>

          {/* Prashna Result Card */}
          <div className="p-5 rounded-xl border border-cyan-500/50 bg-cyan-950/30 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 pb-2">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                  KP Horary #{prashnaResult.horaryNumber} • Sub-Lord: {prashnaResult.subLord} • Star-Lord: {prashnaResult.starLord}
                </span>
                <h4 className="text-base font-cinzel font-bold text-white mt-0.5">
                  Sub-Lord Verdict for {horaryQuery.toUpperCase()}
                </h4>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                prashnaResult.isFavorable ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
              }`}>
                {prashnaResult.isFavorable ? 'Favorable / Affirmative' : 'Obstacles / Deferment'}
              </div>
            </div>

            <p className="text-xs sm:text-sm font-serif text-gray-200 leading-relaxed font-semibold">
              {prashnaResult.verdict}
            </p>

            <div className="pt-2 border-t border-cyan-500/20 flex flex-wrap items-center justify-between text-xs font-mono text-cyan-300">
              <span>Primary House: House {prashnaResult.primaryHouse} (Supporting: [{prashnaResult.supportingHouses.join(', ')}])</span>
              <span className="text-amber-300">{prashnaResult.timingOfEvent}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
