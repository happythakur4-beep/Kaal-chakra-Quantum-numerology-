import React, { useState } from 'react';
import { ThemeMode } from '../../types';
import { calculateNumerology, NumerologyReport } from '../../utils/astrologyEngine';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import {
  Sparkles,
  Calculator,
  Grid,
  Heart,
  Briefcase,
  Layers,
  Crown,
  Compass,
  CheckCircle2,
  AlertCircle,
  Gem,
  Calendar,
  User,
  ShieldCheck,
  Zap,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface NumerologyScreenProps {
  theme: ThemeMode;
}

export const NumerologyScreen: React.FC<NumerologyScreenProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [name, setName] = useState('Happy Thakur');
  const [dob, setDob] = useState('1996-08-15');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [report, setReport] = useState<NumerologyReport>(() => calculateNumerology('Happy Thakur', '1996-08-15', 'male'));
  const [activeTab, setActiveTab] = useState<'overview' | 'loshu' | 'name' | 'compatibility'>('overview');

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      cosmicAudio.playFrequency(528);
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    } catch {}
    const res = calculateNumerology(name, dob, gender);
    setReport(res);
  };

  const handlePrint = () => {
    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    } catch {}
    window.print();
  };

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 py-6 md:py-10">
      
      {/* Hero Header */}
      <div className="text-center mb-8">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 text-xs font-cinzel tracking-wider text-[#d4af37]"
          style={{
            backgroundColor: isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(197, 160, 89, 0.15)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(197, 160, 89, 0.4)',
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vedic Ank Jyotish & Lo Shu Grid Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-3xl-gold tracking-wide uppercase mb-2">
          Ank Jyotish & Numerology
        </h1>
        <p className={`text-xs sm:text-sm font-serif max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}>
          Decode your Mulank (Driver), Bhagyank (Destiny), Chaldean & Pythagorean Name Number, 3x3 Lo Shu Grid planes, and Raj Yogas.
        </p>
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={handleCalculate}
        className="no-print p-5 rounded-2xl border mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shadow-lg transition-all"
        style={{
          backgroundColor: isDark ? 'rgba(18, 18, 28, 0.9)' : 'rgba(255, 252, 245, 0.95)',
          borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.5)',
        }}
      >
        <div>
          <label className="block text-xs font-cinzel font-semibold mb-1 text-[#d4af37]">Full Name</label>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border text-xs bg-black/30 border-[#d4af37]/40">
            <User className="w-3.5 h-3.5 text-[#d4af37]" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh Kumar"
              className="w-full bg-transparent outline-none font-serif text-amber-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-cinzel font-semibold mb-1 text-[#d4af37]">Date of Birth</label>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border text-xs bg-black/30 border-[#d4af37]/40">
            <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full bg-transparent outline-none font-mono text-amber-100 cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-cinzel font-semibold mb-1 text-[#d4af37]">Gender (For Kua)</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as 'male' | 'female')}
            className="w-full px-3 py-2 rounded-lg border text-xs font-serif bg-black/30 border-[#d4af37]/40 text-amber-100 outline-none cursor-pointer"
          >
            <option value="male">Male (पुरुष)</option>
            <option value="female">Female (स्त्री)</option>
          </select>
        </div>

        <div className="flex items-end gap-2">
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-gold-gradient text-[#1a0f00] font-cinzel font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            title="Print Report"
            className="p-2.5 rounded-lg border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Tabs */}
      <div className="no-print flex items-center gap-2 mb-6 border-b border-[#d4af37]/30 pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Mulank & Bhagyank Overview', icon: Sparkles },
          { id: 'loshu', label: 'Lo Shu Grid & Raj Yogas', icon: Grid },
          { id: 'name', label: 'Chaldean & Pythagorean Name', icon: Calculator },
          { id: 'compatibility', label: 'Numerology Compatibility', icon: Heart },
        ].map(t => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2 rounded-t-lg font-cinzel text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                active
                  ? 'bg-[#d4af37]/20 border-b-2 border-[#d4af37] text-[#d4af37]'
                  : 'text-gray-400 hover:text-amber-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Numbers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Mulank (Driver)', num: report.mulank, desc: 'Core Essence & Inherent Soul', highlight: true },
              { label: 'Bhagyank (Destiny)', num: report.bhagyank, desc: 'Life Path & Karmic Goal', highlight: true },
              { label: 'Chaldean Name', num: report.chaldeanNameNumber, desc: `Compound: ${report.chaldeanCompound}` },
              { label: 'Pythagorean Name', num: report.pythagoreanNameNumber, desc: 'Social Projection' },
              { label: 'Kua Number', num: report.kuaNumber, desc: 'Feng Shui Cosmic Magnet' },
              { label: 'Personal Year 2026', num: report.personalYear2026, desc: 'Yearly Vibrational Cycle' },
            ].map((box, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border text-center transition-all shadow-md relative overflow-hidden"
                style={{
                  backgroundColor: box.highlight
                    ? (isDark ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 248, 220, 0.95)')
                    : (isDark ? 'rgba(18, 18, 28, 0.85)' : 'rgba(255, 255, 255, 0.95)'),
                  borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.45)',
                }}
              >
                <div className="text-[10px] font-cinzel tracking-wider text-[#d4af37] uppercase mb-1">{box.label}</div>
                <div className="text-3xl font-cinzel font-black text-3xl-gold my-1">{box.num}</div>
                <div className="text-[10px] text-gray-400 font-serif">{box.desc}</div>
              </div>
            ))}
          </div>

          {/* Planetary Alignment & Soul Traits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="p-5 rounded-xl border shadow-md"
              style={{
                backgroundColor: isDark ? 'rgba(18, 18, 28, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.45)',
              }}
            >
              <div className="flex items-center gap-2 mb-4 border-b border-[#d4af37]/30 pb-2">
                <Crown className="w-4 h-4 text-[#d4af37]" />
                <h3 className="font-cinzel text-sm font-bold text-amber-200">Planetary & Elemental Matrix</h3>
              </div>
              <div className="space-y-2.5 text-xs font-serif">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Ruling Planet:</span>
                  <span className="font-semibold text-amber-100">{report.rulingPlanet}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Elemental Energy:</span>
                  <span className="font-semibold text-amber-100">{report.element}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Lucky Numbers:</span>
                  <span className="font-semibold text-emerald-400">{report.luckyNumbers.join(', ')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Unfavorable Numbers:</span>
                  <span className="font-semibold text-rose-400">{report.unluckyNumbers.join(', ')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Auspicious Colors:</span>
                  <span className="font-semibold text-amber-100">{report.luckyColors.join(', ')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Favorable Days:</span>
                  <span className="font-semibold text-amber-100">{report.luckyDays.join(', ')}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Prescribed Gemstone:</span>
                  <span className="font-semibold text-[#d4af37] flex items-center gap-1">
                    <Gem className="w-3.5 h-3.5" />
                    {report.luckyGemstone}
                  </span>
                </div>
              </div>
            </div>

            {/* Personality & Career Path */}
            <div
              className="p-5 rounded-xl border shadow-md"
              style={{
                backgroundColor: isDark ? 'rgba(18, 18, 28, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.45)',
              }}
            >
              <div className="flex items-center gap-2 mb-4 border-b border-[#d4af37]/30 pb-2">
                <Briefcase className="w-4 h-4 text-[#d4af37]" />
                <h3 className="font-cinzel text-sm font-bold text-amber-200">Archetype & Career Manifestation</h3>
              </div>
              
              <div className="mb-4">
                <div className="text-xs font-cinzel text-[#d4af37] mb-2 font-semibold">Core Psychological Traits:</div>
                <div className="flex flex-wrap gap-1.5">
                  {report.personalityTraits.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full text-xs font-serif border border-[#d4af37]/30 bg-[#d4af37]/10 text-amber-100"
                    >
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-cinzel text-[#d4af37] mb-2 font-semibold">High Resonance Career Fields:</div>
                <div className="flex flex-wrap gap-1.5">
                  {report.careerSuggestions.map((c, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full text-xs font-serif border border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                    >
                      ★ {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LO SHU GRID */}
      {activeTab === 'loshu' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 3x3 Lo Shu Square Box */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl border shadow-xl bg-black/40 border-[#d4af37]/40">
              <div className="text-center mb-4">
                <h3 className="font-cinzel font-bold text-amber-200 text-base">Vedic 3x3 Lo Shu Chakra</h3>
                <p className="text-[11px] text-gray-400 font-serif">Derived from Day ({report.birthDate}) + Mulank & Bhagyank</p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl border border-[#d4af37]/40 bg-black/60 shadow-inner w-full max-w-[280px]">
                {[
                  [4, 9, 2],
                  [3, 5, 7],
                  [8, 1, 6],
                ].flatMap((row, rIdx) =>
                  row.map((num) => {
                    const count = report.loShuGrid[num] || 0;
                    const isPresent = count > 0;
                    return (
                      <div
                        key={num}
                        className={`h-20 rounded-lg flex flex-col items-center justify-center border transition-all ${
                          isPresent
                            ? 'bg-[#d4af37]/20 border-[#d4af37] text-amber-200 shadow-md scale-[1.02]'
                            : 'bg-black/20 border-white/10 text-gray-600'
                        }`}
                      >
                        <div className="text-lg font-cinzel font-bold">
                          {isPresent ? Array(count).fill(num).join('') : num}
                        </div>
                        <div className="text-[9px] font-mono uppercase tracking-wider text-gray-400">
                          {isPresent ? `${count}x Active` : 'Absent'}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Planes & Raj Yogas */}
            <div className="lg:col-span-7 space-y-4">
              {/* Raj Yogas */}
              <div
                className="p-4 rounded-xl border shadow-md"
                style={{
                  backgroundColor: isDark ? 'rgba(18, 18, 28, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                  borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.45)',
                }}
              >
                <div className="flex items-center gap-2 mb-3 border-b border-[#d4af37]/30 pb-2">
                  <Crown className="w-4 h-4 text-[#d4af37]" />
                  <h3 className="font-cinzel text-xs font-bold text-amber-200 uppercase tracking-wider">
                    Detected Raj Yogas in Lo Shu
                  </h3>
                </div>
                <div className="space-y-2">
                  {report.rajYogas.map((yoga, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-100 text-xs font-serif flex items-start gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{yoga}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6 Planes Matrix */}
              <div
                className="p-4 rounded-xl border shadow-md"
                style={{
                  backgroundColor: isDark ? 'rgba(18, 18, 28, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                  borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.45)',
                }}
              >
                <div className="flex items-center gap-2 mb-3 border-b border-[#d4af37]/30 pb-2">
                  <Layers className="w-4 h-4 text-[#d4af37]" />
                  <h3 className="font-cinzel text-xs font-bold text-amber-200 uppercase tracking-wider">
                    Lo Shu Planes & Vibrational Strengths
                  </h3>
                </div>
                <div className="space-y-3">
                  {report.loShuPlanes.map((plane, idx) => (
                    <div key={idx} className="text-xs font-serif border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-cinzel font-semibold text-amber-200">{plane.sanskritName} ({plane.name})</span>
                        <span className="font-mono text-[#d4af37] font-bold">{plane.strength}%</span>
                      </div>
                      <div className="w-full bg-black/40 rounded-full h-1.5 mb-1.5 overflow-hidden border border-white/10">
                        <div
                          className="bg-gold-gradient h-full rounded-full transition-all duration-500"
                          style={{ width: `${plane.strength}%` }}
                        />
                      </div>
                      <p className="text-gray-400 text-[11px] leading-relaxed">{plane.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NAME NUMEROLOGY */}
      {activeTab === 'name' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Chaldean System */}
            <div
              className="p-5 rounded-xl border shadow-md"
              style={{
                backgroundColor: isDark ? 'rgba(18, 18, 28, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.45)',
              }}
            >
              <div className="flex items-center justify-between mb-4 border-b border-[#d4af37]/30 pb-2">
                <h3 className="font-cinzel text-sm font-bold text-amber-200">Chaldean Numerology System</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40">
                  Ancient Vedic Root
                </span>
              </div>
              <div className="text-center py-4 bg-black/30 rounded-xl border border-white/10 mb-4">
                <div className="text-[11px] font-cinzel text-gray-400 uppercase">Single Digit Essence</div>
                <div className="text-4xl font-cinzel font-black text-3xl-gold my-1">{report.chaldeanNameNumber}</div>
                <div className="text-xs font-mono text-[#d4af37]">Compound Number: {report.chaldeanCompound}</div>
              </div>
              <p className="text-xs font-serif text-gray-300 leading-relaxed">
                Chaldean assigns letters values 1 to 8 based on ancient sacred sound frequencies (excluding 9 as sacred).
                A Chaldean value in harmony with your Mulank ({report.mulank}) attracts smooth social and commercial opportunities.
              </p>
            </div>

            {/* Pythagorean System */}
            <div
              className="p-5 rounded-xl border shadow-md"
              style={{
                backgroundColor: isDark ? 'rgba(18, 18, 28, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.45)',
              }}
            >
              <div className="flex items-center justify-between mb-4 border-b border-[#d4af37]/30 pb-2">
                <h3 className="font-cinzel text-sm font-bold text-amber-200">Pythagorean System</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  Western Standard
                </span>
              </div>
              <div className="text-center py-4 bg-black/30 rounded-xl border border-white/10 mb-4">
                <div className="text-[11px] font-cinzel text-gray-400 uppercase">Pythagorean Expression</div>
                <div className="text-4xl font-cinzel font-black text-3xl-gold my-1">{report.pythagoreanNameNumber}</div>
                <div className="text-xs font-mono text-cyan-300">1 to 9 Sequential Cycle</div>
              </div>
              <p className="text-xs font-serif text-gray-300 leading-relaxed">
                The Pythagorean system sequences the alphabet sequentially across numbers 1 through 9. It reflects your outward personality, social presence, and public interaction mode.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COMPATIBILITY */}
      {activeTab === 'compatibility' && (
        <div
          className="p-5 rounded-xl border shadow-md"
          style={{
            backgroundColor: isDark ? 'rgba(18, 18, 28, 0.85)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.45)',
          }}
        >
          <div className="flex items-center gap-2 mb-4 border-b border-[#d4af37]/30 pb-2">
            <Heart className="w-4 h-4 text-rose-400" />
            <h3 className="font-cinzel text-sm font-bold text-amber-200">
              Relationship & Partnership Harmony for Number {report.mulank}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
              <div className="flex items-center gap-1.5 text-emerald-300 font-cinzel text-xs font-bold mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Best Partners (मित्र अंक)</span>
              </div>
              <div className="text-2xl font-cinzel font-bold text-emerald-200 mb-2">
                {report.loveCompatibility.best.join(', ')}
              </div>
              <p className="text-[11px] font-serif text-emerald-100/80 leading-relaxed">
                Natural soul resonance, effortless communication, mutual growth, and lasting marital peace.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10">
              <div className="flex items-center gap-1.5 text-amber-300 font-cinzel text-xs font-bold mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Moderate Harmony (सम अंक)</span>
              </div>
              <div className="text-2xl font-cinzel font-bold text-amber-200 mb-2">
                {report.loveCompatibility.moderate.join(', ')}
              </div>
              <p className="text-[11px] font-serif text-amber-100/80 leading-relaxed">
                Good with mutual respect and adjustment; favorable for professional contracts and alliances.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10">
              <div className="flex items-center gap-1.5 text-rose-300 font-cinzel text-xs font-bold mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>Challenging / Opposing (शत्रु अंक)</span>
              </div>
              <div className="text-2xl font-cinzel font-bold text-rose-200 mb-2">
                {report.loveCompatibility.challenging.join(', ')}
              </div>
              <p className="text-[11px] font-serif text-rose-100/80 leading-relaxed">
                Frequent ideological differences and ego clashes; requires Vedic planetary remedies.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
