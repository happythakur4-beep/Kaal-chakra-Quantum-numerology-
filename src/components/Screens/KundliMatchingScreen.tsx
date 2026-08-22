import React, { useState } from 'react';
import { ThemeMode, UserProfile } from '../../types';
import { calculateAshtaKutaMilan, MatchMakingResult, ZODIAC_SIGNS, NAKSHATRAS } from '../../utils/astrologyEngine';
import { 
  Heart, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Award, 
  BookOpen,
  Bot
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface KundliMatchingScreenProps {
  theme: ThemeMode;
  user: UserProfile;
}

export const KundliMatchingScreen: React.FC<KundliMatchingScreenProps> = ({ theme, user }) => {
  const isDark = theme === 'dark';

  // Person 1 (Partner / Groom)
  const [name1, setName1] = useState(user.name || 'Aarav Sharma');
  const [dob1, setDob1] = useState(user.birthDate || '1995-04-12');
  const [rashi1, setRashi1] = useState('Leo (Simha)');
  const [nak1, setNak1] = useState('Magha');

  // Person 2 (Partner / Bride)
  const [name2, setName2] = useState('Priya Patel');
  const [dob2, setDob2] = useState('1997-09-24');
  const [rashi2, setRashi2] = useState('Aries (Mesha)');
  const [nak2, setNak2] = useState('Ashwini');

  const [matchResult, setMatchResult] = useState<MatchMakingResult>(() =>
    calculateAshtaKutaMilan(name1, dob1, rashi1, nak1, name2, dob2, rashi2, nak2)
  );

  const [aiReport, setAiReport] = useState<{
    verdict?: string;
    summary?: string;
    analysis?: string;
    recommendations?: string[];
  } | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateAshtaKutaMilan(name1, dob1, rashi1, nak1, name2, dob2, rashi2, nak2);
    setMatchResult(res);

    if (res.totalGuna >= 24) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f59e0b', '#ec4899', '#ffffff'],
      });
    }
  };

  const handleFetchAiSynastry = async () => {
    setIsLoadingAI(true);
    try {
      const res = await fetch('/api/ai/kundli-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          person1: matchResult.person1,
          person2: matchResult.person2,
          gunaScore: matchResult.totalGuna,
          doshas: matchResult.manglikStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAiReport({
          verdict: data.compatibilityVerdict,
          summary: data.scoreSummary,
          analysis: data.analysis,
          recommendations: data.recommendations,
        });
      }
    } catch (err) {
      console.error('Error fetching AI synastry report:', err);
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 text-xs font-cinzel tracking-widest uppercase"
          style={{
            backgroundColor: isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(245, 238, 218, 0.8)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(197, 160, 89, 0.5)',
            color: '#d4af37',
          }}
        >
          <Heart className="w-3.5 h-3.5 text-rose-500" />
          <span>Vedic Ashta-Kuta 36 Guna Milan & Synastry</span>
        </div>

        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold tracking-wide uppercase ${
          isDark ? 'text-gold-gradient text-3d-gold' : 'text-[#3b2b0a] text-3d-celestial'
        }`}>
          Kundli Matching & Relationship Compatibility
        </h1>

        <p className={`text-sm font-serif max-w-2xl mx-auto mt-2 ${
          isDark ? 'text-gray-300' : 'text-[#5a4313]'
        }`}>
          Comprehensive 36 Guna assessment, Manglik Dosha cancellation check, and AI-powered Vivaha synastry report.
        </p>
      </div>

      {/* Input Form for Two Partners */}
      <form
        onSubmit={handleMatch}
        className={`p-6 rounded-2xl border mb-8 transition-all ${
          isDark ? 'glassmorphism-dark border-[#d4af37]/40 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/50 shadow-md'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          
          {/* Partner 1 Box */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-black/40 border-[#d4af37]/25' : 'bg-white/80 border-[#c5a059]/30'
          }`}>
            <h3 className="text-xs font-cinzel font-bold text-[#d4af37] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Users className="w-3.5 h-3.5" />
              <span>Partner 1 Details (Groom / First Soul)</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-[0.65rem] font-cinzel text-gray-400 block mb-0.5">Name</label>
                <input
                  id="partner1-name"
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  className={`w-full px-3 py-1.5 rounded-lg border text-xs ${
                    isDark ? 'bg-black/50 border-gray-700 text-white' : 'bg-white border-amber-200 text-gray-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[0.65rem] font-cinzel text-gray-400 block mb-0.5">Date of Birth</label>
                  <input
                    id="partner1-dob"
                    type="date"
                    value={dob1}
                    onChange={(e) => setDob1(e.target.value)}
                    className={`w-full px-2 py-1.5 rounded-lg border text-xs ${
                      isDark ? 'bg-black/50 border-gray-700 text-white' : 'bg-white border-amber-200 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[0.65rem] font-cinzel text-gray-400 block mb-0.5">Moon Rashi</label>
                  <select
                    id="partner1-rashi"
                    value={rashi1}
                    onChange={(e) => setRashi1(e.target.value)}
                    className={`w-full px-2 py-1.5 rounded-lg border text-xs ${
                      isDark ? 'bg-black/50 border-gray-700 text-white' : 'bg-white border-amber-200 text-gray-900'
                    }`}
                  >
                    {ZODIAC_SIGNS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[0.65rem] font-cinzel text-gray-400 block mb-0.5">Birth Nakshatra</label>
                <select
                  id="partner1-nak"
                  value={nak1}
                  onChange={(e) => setNak1(e.target.value)}
                  className={`w-full px-2 py-1.5 rounded-lg border text-xs ${
                    isDark ? 'bg-black/50 border-gray-700 text-white' : 'bg-white border-amber-200 text-gray-900'
                  }`}
                >
                  {NAKSHATRAS.map((n) => (
                    <option key={n.name} value={n.name}>{n.name} ({n.lord})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Partner 2 Box */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-black/40 border-[#d4af37]/25' : 'bg-white/80 border-[#c5a059]/30'
          }`}>
            <h3 className="text-xs font-cinzel font-bold text-[#d4af37] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Users className="w-3.5 h-3.5" />
              <span>Partner 2 Details (Bride / Second Soul)</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-[0.65rem] font-cinzel text-gray-400 block mb-0.5">Name</label>
                <input
                  id="partner2-name"
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  className={`w-full px-3 py-1.5 rounded-lg border text-xs ${
                    isDark ? 'bg-black/50 border-gray-700 text-white' : 'bg-white border-amber-200 text-gray-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[0.65rem] font-cinzel text-gray-400 block mb-0.5">Date of Birth</label>
                  <input
                    id="partner2-dob"
                    type="date"
                    value={dob2}
                    onChange={(e) => setDob2(e.target.value)}
                    className={`w-full px-2 py-1.5 rounded-lg border text-xs ${
                      isDark ? 'bg-black/50 border-gray-700 text-white' : 'bg-white border-amber-200 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[0.65rem] font-cinzel text-gray-400 block mb-0.5">Moon Rashi</label>
                  <select
                    id="partner2-rashi"
                    value={rashi2}
                    onChange={(e) => setRashi2(e.target.value)}
                    className={`w-full px-2 py-1.5 rounded-lg border text-xs ${
                      isDark ? 'bg-black/50 border-gray-700 text-white' : 'bg-white border-amber-200 text-gray-900'
                    }`}
                  >
                    {ZODIAC_SIGNS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[0.65rem] font-cinzel text-gray-400 block mb-0.5">Birth Nakshatra</label>
                <select
                  id="partner2-nak"
                  value={nak2}
                  onChange={(e) => setNak2(e.target.value)}
                  className={`w-full px-2 py-1.5 rounded-lg border text-xs ${
                    isDark ? 'bg-black/50 border-gray-700 text-white' : 'bg-white border-amber-200 text-gray-900'
                  }`}
                >
                  {NAKSHATRAS.map((n) => (
                    <option key={n.name} value={n.name}>{n.name} ({n.lord})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

        </div>

        <button
          id="match-calc-btn"
          type="submit"
          className={`w-full py-3 px-6 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
            isDark
              ? 'bg-gold-gradient-btn text-black hover:shadow-[0_0_25px_rgba(212,175,55,0.7)]'
              : 'bg-[#c5a059] text-white hover:bg-[#a8823b]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Calculate 36 Guna Milan & Synastry</span>
        </button>
      </form>

      {/* Match Result Score Banner */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        
        {/* Total Score Meter (5 Cols) */}
        <div className={`md:col-span-5 p-6 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${
          isDark ? 'glassmorphism-dark border-[#d4af37]/45 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/60 shadow-lg'
        }`}>
          <span className="text-xs font-cinzel uppercase tracking-widest text-[#d4af37] mb-1 font-semibold">
            Ashta-Kuta Total Milan Score
          </span>

          <div className="relative my-4 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-[#d4af37]/40 flex flex-col items-center justify-center bg-black/40 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              <span className="text-4xl font-cinzel font-bold text-gold-gradient">
                {matchResult.totalGuna}
              </span>
              <span className="text-xs font-mono text-gray-400">/ 36 Gunas</span>
            </div>
          </div>

          <div className={`px-4 py-1.5 rounded-full text-xs font-cinzel font-bold mb-3 ${
            matchResult.totalGuna >= 28
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : matchResult.totalGuna >= 18
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
          }`}>
            {matchResult.verdict}
          </div>

          <p className="text-xs font-serif text-gray-300">
            {matchResult.totalGuna >= 18
              ? 'Meets standard Vedic threshold (18+ Gunas) for a harmonious matrimonial union.'
              : 'Below standard Guna threshold. Remedial pujas and detailed chart review suggested.'}
          </p>
        </div>

        {/* Manglik & Resonance Status (7 Cols) */}
        <div className="md:col-span-7 flex flex-col gap-4">
          
          {/* Manglik Dosha Status */}
          <div className={`p-5 rounded-2xl border ${
            isDark ? 'glassmorphism-dark border-[#d4af37]/35 text-gray-200' : 'glassmorphism-light border-[#c5a059]/40 text-[#3b2b0a]'
          }`}>
            <h3 className="text-xs font-cinzel font-bold text-[#d4af37] uppercase tracking-wider mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Manglik (Kuja) Dosha Assessment</span>
            </h3>
            <p className="text-xs font-serif leading-relaxed mb-2">
              {matchResult.manglikStatus.reason}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-gray-400">Mutual Compatibility:</span>
              <span className={matchResult.manglikStatus.compatible ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                {matchResult.manglikStatus.compatible ? '✓ Harmonic Mars Energy' : '⚠ Remedial Action Advised'}
              </span>
            </div>
          </div>

          {/* AI Synastry Report Generation Button / Banner */}
          <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
            isDark ? 'bg-black/50 border-[#d4af37]/30' : 'bg-white/80 border-[#c5a059]/30'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-cinzel font-bold text-[#d4af37] uppercase flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  <span>AI Acharya Deep Synastry Analysis</span>
                </h3>
                <span className="text-[0.65rem] font-mono text-purple-400">Gemini 3.7 Flash</span>
              </div>
              <p className="text-xs font-serif text-gray-300 mb-3">
                Generate in-depth astrological commentary analyzing karmic longevity, emotional bonding, and shared dharma.
              </p>
            </div>

            <button
              id="ai-synastry-btn"
              onClick={handleFetchAiSynastry}
              disabled={isLoadingAI}
              className={`py-2 px-4 rounded-xl font-cinzel font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isDark
                  ? 'bg-purple-900/40 border border-purple-500/40 text-purple-200 hover:bg-purple-900/60'
                  : 'bg-amber-100 border border-amber-300 text-amber-900 hover:bg-amber-200'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isLoadingAI ? 'animate-spin' : ''}`} />
              <span>{isLoadingAI ? 'Analyzing Celestial Synastry...' : 'Generate In-Depth AI Report'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* AI Synastry Output Modal / Box */}
      {aiReport && (
        <div className={`p-6 rounded-2xl border mb-8 animate-fadeIn ${
          isDark ? 'glassmorphism-dark border-purple-500/40 text-gray-200 shadow-lg' : 'glassmorphism-light border-purple-300 text-gray-900 shadow-md'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-cinzel font-bold text-gold-gradient">
              Cosmic Synastry Interpretation by Acharya Vidyadhar
            </h3>
          </div>
          <p className="text-xs font-serif leading-relaxed mb-4">{aiReport.analysis}</p>

          {aiReport.recommendations && aiReport.recommendations.length > 0 && (
            <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs font-serif">
              <strong className="font-cinzel text-purple-300 block mb-1">Recommended Harmonizing Practices:</strong>
              <ul className="list-disc list-inside space-y-1 text-purple-200/90">
                {aiReport.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 8 Kutas Detailed Breakdown Table */}
      <div className={`p-6 rounded-2xl border transition-all ${
        isDark ? 'glassmorphism-dark border-[#d4af37]/40 text-gray-200 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/50 text-[#3b2b0a] shadow-md'
      }`}>
        <h3 className="text-sm font-cinzel font-bold text-[#d4af37] uppercase tracking-wider mb-4">
          Detailed Ashta-Kuta 8-Fold Vedic Breakdown
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-serif border-collapse">
            <thead>
              <tr className={`border-b font-cinzel text-[0.7rem] uppercase tracking-wider ${
                isDark ? 'border-[#d4af37]/30 text-[#d4af37]' : 'border-[#c5a059]/40 text-[#8a6514]'
              }`}>
                <th className="py-2.5 px-3">Kuta (Vedic Domain)</th>
                <th className="py-2.5 px-3 text-center">Max Score</th>
                <th className="py-2.5 px-3 text-center">Obtained</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Significance</th>
                <th className="py-2.5 px-3">Compatibility Analysis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40">
              {matchResult.kutas.map((k) => (
                <tr key={k.kuta} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-cinzel font-bold">
                    <span>{k.kuta}</span>
                    <span className="text-[0.65rem] text-[#d4af37] block font-serif">{k.sanskritName}</span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold">{k.maxScore}</td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-amber-300">
                    {k.obtainedScore}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[0.65rem] font-cinzel font-semibold ${
                      k.status === 'Full Match'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : k.status === 'Partial Match'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {k.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-300">{k.significance}</td>
                  <td className="py-3 px-3 text-gray-400 italic text-[0.7rem]">{k.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
