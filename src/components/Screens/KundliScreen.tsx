import React, { useState } from 'react';
import { ThemeMode, UserProfile } from '../../types';
import { generateCalculatedKundli, KundliData, PlanetInfo, ZODIAC_SIGNS, computeAshtakvargaMatrix, AshtakvargaHouseData } from '../../utils/astrologyEngine';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import confetti from 'canvas-confetti';
import { 
  Compass, 
  Sun, 
  Moon, 
  Calendar, 
  Clock, 
  MapPin, 
  RefreshCw, 
  Info, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Star,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Grid,
  Award,
  Crown
} from 'lucide-react';

interface KundliScreenProps {
  theme: ThemeMode;
  user: UserProfile;
}

export const KundliScreen: React.FC<KundliScreenProps> = ({ theme, user }) => {
  const isDark = theme === 'dark';

  const [name, setName] = useState(user.name || 'Anya Sharma');
  const [birthDate, setBirthDate] = useState(user.birthDate || '1996-07-14');
  const [birthTime, setBirthTime] = useState(user.birthTime || '06:45');
  const [birthCity, setBirthCity] = useState(user.birthCity || 'Varanasi, India');
  const [chartStyle, setChartStyle] = useState<'north' | 'south'>('north');
  const [activeSubTab, setActiveSubTab] = useState<'d1' | 'd9' | 'd10' | 'ashtakvarga' | 'dosha'>('d1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const [kundli, setKundli] = useState<KundliData>(() =>
    generateCalculatedKundli(name, birthDate, birthTime, birthCity)
  );

  const ashtakvargaData: AshtakvargaHouseData[] = computeAshtakvargaMatrix(kundli);

  // Dosha calculations
  const isManglik = kundli.planets.some(p => p.name === 'Mars' && [1, 4, 7, 8, 12].includes(p.house));
  const hasKalsarp = kundli.planets.some(p => p.name === 'Rahu' && [1, 2, 5, 8].includes(p.house));
  const hasPitraDosha = kundli.planets.some(p => (p.name === 'Sun' && p.house === 9) || (p.name === 'Rahu' && p.house === 9));

  const handleRecalculate = (e?: React.FormEvent, customDate?: string, customTime?: string, customName?: string, customCity?: string) => {
    if (e) e.preventDefault();
    setIsGenerating(true);

    const dName = customName ?? name;
    const dDate = customDate ?? birthDate;
    const dTime = customTime ?? birthTime;
    const dCity = customCity ?? birthCity;

    try {
      cosmicAudio.playFrequency(432);
    } catch {
      // Audio fallback
    }

    setTimeout(() => {
      const newKundli = generateCalculatedKundli(dName, dDate, dTime, dCity);
      setKundli(newKundli);
      setIsGenerating(false);
      setShowSuccessBanner(true);

      confetti({
        particleCount: 28,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#ffd700', '#f5eedb', '#9333ea'],
      });

      setTimeout(() => setShowSuccessBanner(false), 4000);
    }, 450);
  };

  const applyPreset = (presetName: string, presetDate: string, presetTime: string, presetCity: string) => {
    setName(presetName);
    setBirthDate(presetDate);
    setBirthTime(presetTime);
    setBirthCity(presetCity);
    handleRecalculate(undefined, presetDate, presetTime, presetName, presetCity);
  };

  // Determine Lagna Rashi index (0=Aries, 1=Taurus, 2=Gemini, etc.)
  const ascName = kundli.ascendant?.split(' ')[0]?.toLowerCase() || '';
  const ascIndex = ZODIAC_SIGNS.findIndex(s => s.toLowerCase().startsWith(ascName));
  const lagnaRashiNum = ascIndex >= 0 ? ascIndex + 1 : 3;

  // North Indian House coordinate mapping for 400x400 SVG
  const NORTH_HOUSES_CONFIG: Record<
    number,
    {
      name: string;
      labelPos: { x: number; y: number };
      rashiPos: { x: number; y: number };
      planetsPos: { x: number; y: number };
    }
  > = {
    1: { name: 'H1 (Lagna)', labelPos: { x: 200, y: 68 }, rashiPos: { x: 200, y: 88 }, planetsPos: { x: 200, y: 114 } },
    2: { name: 'H2', labelPos: { x: 95, y: 44 }, rashiPos: { x: 95, y: 62 }, planetsPos: { x: 95, y: 82 } },
    3: { name: 'H3', labelPos: { x: 48, y: 92 }, rashiPos: { x: 48, y: 108 }, planetsPos: { x: 48, y: 130 } },
    4: { name: 'H4', labelPos: { x: 100, y: 178 }, rashiPos: { x: 100, y: 198 }, planetsPos: { x: 100, y: 224 } },
    5: { name: 'H5', labelPos: { x: 48, y: 292 }, rashiPos: { x: 48, y: 308 }, planetsPos: { x: 48, y: 330 } },
    6: { name: 'H6', labelPos: { x: 95, y: 375 }, rashiPos: { x: 95, y: 358 }, planetsPos: { x: 95, y: 334 } },
    7: { name: 'H7', labelPos: { x: 200, y: 345 }, rashiPos: { x: 200, y: 325 }, planetsPos: { x: 200, y: 295 } },
    8: { name: 'H8', labelPos: { x: 305, y: 375 }, rashiPos: { x: 305, y: 358 }, planetsPos: { x: 305, y: 334 } },
    9: { name: 'H9', labelPos: { x: 352, y: 292 }, rashiPos: { x: 352, y: 308 }, planetsPos: { x: 352, y: 330 } },
    10: { name: 'H10', labelPos: { x: 300, y: 178 }, rashiPos: { x: 300, y: 198 }, planetsPos: { x: 300, y: 224 } },
    11: { name: 'H11', labelPos: { x: 352, y: 92 }, rashiPos: { x: 352, y: 108 }, planetsPos: { x: 352, y: 130 } },
    12: { name: 'H12', labelPos: { x: 305, y: 44 }, rashiPos: { x: 305, y: 62 }, planetsPos: { x: 305, y: 82 } },
  };

  // Fixed South Indian Clockwise Layout Grid
  const SOUTH_RASHI_GRID = [
    { sign: 'Pisces', sanskrit: 'Meena' },
    { sign: 'Aries', sanskrit: 'Mesha' },
    { sign: 'Taurus', sanskrit: 'Vrishabha' },
    { sign: 'Gemini', sanskrit: 'Mithuna' },
    { sign: 'Aquarius', sanskrit: 'Kumbha' },
    { sign: 'Center', sanskrit: '' },
    { sign: 'Center', sanskrit: '' },
    { sign: 'Cancer', sanskrit: 'Karka' },
    { sign: 'Capricorn', sanskrit: 'Makara' },
    { sign: 'Center', sanskrit: '' },
    { sign: 'Center', sanskrit: '' },
    { sign: 'Leo', sanskrit: 'Simha' },
    { sign: 'Sagittarius', sanskrit: 'Dhanu' },
    { sign: 'Scorpio', sanskrit: 'Vrischika' },
    { sign: 'Libra', sanskrit: 'Tula' },
    { sign: 'Virgo', sanskrit: 'Kanya' },
  ];

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pt-6 sm:pb-16">
      
      {/* Light Theme Photo Background for Kundli */}
      {!isDark && (
        <div 
          className="fixed inset-0 z-[-1] opacity-[0.08] mix-blend-multiply bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2000&auto=format&fit=crop')` }} // Golden astrological/astronomy clock vibes
        />
      )}

      {/* Header Title */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 text-[0.7rem] sm:text-xs font-cinzel tracking-widest uppercase"
          style={{
            backgroundColor: isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(245, 238, 218, 0.8)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(197, 160, 89, 0.5)',
            color: '#d4af37',
          }}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Vedic Ephemeris & Kundli Chakra Generator</span>
        </div>

        <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel font-bold tracking-wide uppercase leading-tight sm:leading-snug break-words ${
          isDark ? 'text-gold-gradient text-3d-gold' : 'text-[#3b2b0a] text-3d-celestial'
        }`}>
          Janam Kundli & Planetary Placements
        </h1>

        <p className={`text-xs sm:text-sm font-serif max-w-2xl mx-auto mt-2 leading-relaxed ${
          isDark ? 'text-gray-300' : 'text-[#5a4313]'
        }`}>
          Vedic Janampatri with Lagna & Navamsha calculation, 9 Graha coordinates, Vimshottari Dasha, and Sade Sati tracker.
        </p>
      </div>

      {/* Input Parameters Bar */}
      <form
        onSubmit={handleRecalculate}
        className={`p-4 sm:p-5 rounded-2xl border mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 sm:gap-3.5 items-end transition-all ${
          isDark ? 'glassmorphism-dark border-[#d4af37]/40 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/50 shadow-md'
        }`}
      >
        <div>
          <label className="text-[0.68rem] font-cinzel font-semibold text-[#d4af37] block mb-1">
            Full Name
          </label>
          <input
            id="kundli-name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border text-xs ${
              isDark ? 'bg-black/50 border-[#d4af37]/30 text-white' : 'bg-white border-[#c5a059]/50 text-gray-900'
            }`}
          />
        </div>

        <div>
          <label className="text-[0.68rem] font-cinzel font-semibold text-[#d4af37] block mb-1">
            Date of Birth
          </label>
          <div className="relative">
            <input
              id="kundli-dob-input"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border text-xs ${
                isDark ? 'bg-black/50 border-[#d4af37]/30 text-white' : 'bg-white border-[#c5a059]/50 text-gray-900'
              }`}
            />
          </div>
        </div>

        <div>
          <label className="text-[0.68rem] font-cinzel font-semibold text-[#d4af37] block mb-1">
            Birth Time
          </label>
          <div className="relative">
            <input
              id="kundli-time-input"
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border text-xs ${
                isDark ? 'bg-black/50 border-[#d4af37]/30 text-white' : 'bg-white border-[#c5a059]/50 text-gray-900'
              }`}
            />
          </div>
        </div>

        <div>
          <label className="text-[0.68rem] font-cinzel font-semibold text-[#d4af37] block mb-1">
            Birth Place / City
          </label>
          <input
            id="kundli-city-input"
            type="text"
            value={birthCity}
            onChange={(e) => setBirthCity(e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border text-xs ${
              isDark ? 'bg-black/50 border-[#d4af37]/30 text-white' : 'bg-white border-[#c5a059]/50 text-gray-900'
            }`}
          />
        </div>

        <div>
          <button
            id="kundli-calc-btn"
            type="submit"
            disabled={isGenerating}
            className={`w-full py-2.5 px-4 rounded-lg font-cinzel font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
              isGenerating ? 'opacity-80 cursor-wait' : ''
            } ${
              isDark
                ? 'bg-gold-gradient-btn text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]'
                : 'bg-[#c5a059] text-white hover:bg-[#a8823b]'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Calculating Ephemeris...' : 'Generate Chart'}</span>
          </button>
        </div>
      </form>

      {/* Quick Sample Horoscope Presets */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <span className="text-[0.68rem] font-cinzel text-[#d4af37] font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Sample Horoscopes:
        </span>
        <button
          type="button"
          onClick={() => applyPreset('Anya Sharma', '1996-07-14', '06:45', 'Varanasi, India')}
          className={`px-2.5 py-1 rounded-full text-[0.65rem] font-serif border transition-all cursor-pointer ${
            isDark 
              ? 'bg-black/40 border-[#d4af37]/30 text-gray-300 hover:border-[#d4af37] hover:text-[#d4af37]' 
              : 'bg-white border-[#c5a059]/40 text-[#5a4313] hover:border-[#c5a059]'
          }`}
        >
          Anya Sharma (Mithuna Lagna)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('Rohan Malhotra', '1989-11-23', '14:30', 'New Delhi, India')}
          className={`px-2.5 py-1 rounded-full text-[0.65rem] font-serif border transition-all cursor-pointer ${
            isDark 
              ? 'bg-black/40 border-[#d4af37]/30 text-gray-300 hover:border-[#d4af37] hover:text-[#d4af37]' 
              : 'bg-white border-[#c5a059]/40 text-[#5a4313] hover:border-[#c5a059]'
          }`}
        >
          Rohan Malhotra (Dhanu Lagna)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('Devika Nair', '1994-04-18', '09:15', 'Kochi, Kerala')}
          className={`px-2.5 py-1 rounded-full text-[0.65rem] font-serif border transition-all cursor-pointer ${
            isDark 
              ? 'bg-black/40 border-[#d4af37]/30 text-gray-300 hover:border-[#d4af37] hover:text-[#d4af37]' 
              : 'bg-white border-[#c5a059]/40 text-[#5a4313] hover:border-[#c5a059]'
          }`}
        >
          Devika Nair (Mesha Lagna)
        </button>
      </div>

      {/* Success Notification Banner */}
      {showSuccessBanner && (
        <div className={`mb-6 p-3 rounded-xl border flex items-center justify-between gap-3 text-xs font-serif animate-fade-in ${
          isDark 
            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
            : 'bg-emerald-50 border-emerald-300 text-emerald-800'
        }`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Lagna Chakra & Ephemeris Generated!</strong> Planetary positions, Nakshatras, Navamsha coordinates, and Vimshottari Mahadasha have been computed for <strong>{name || 'Querent'}</strong>.
            </span>
          </div>
          <span className="text-[0.65rem] font-mono opacity-80 shrink-0">
            {kundli.ascendant} Lagna • {kundli.currentDasha}
          </span>
        </div>
      )}

      {/* Main Content Grid: Chart Rendering & Core Sign Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Left: Interactive Kundli Visualizer (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className={`p-4 sm:p-6 rounded-2xl border flex-1 transition-all ${
            isDark ? 'glassmorphism-dark border-[#d4af37]/45 text-gray-200 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/60 text-[#3b2b0a] shadow-lg'
          }`}>
            
            {/* Chart Toolbar */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className={`text-sm sm:text-base font-cinzel font-bold ${isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'}`}>
                    Lagna Chakra (D-1 Chart)
                  </h2>
                  <span className="text-[0.65rem] font-serif text-[#d4af37]">
                    Ascendant: {kundli.ascendant} ({kundli.ascendantDegree})
                  </span>
                </div>
              </div>

              {/* Chart Format Switcher */}
              <div className={`flex items-center gap-1 p-1 rounded-xl border ${
                isDark 
                  ? 'bg-black/40 border-[#d4af37]/30' 
                  : 'bg-amber-100/70 border-[#c5a059]/50 shadow-sm'
              }`}>
                <button
                  onClick={() => setChartStyle('north')}
                  className={`px-3 py-1 rounded-lg text-[0.68rem] font-cinzel font-bold transition-all cursor-pointer ${
                    chartStyle === 'north'
                      ? isDark
                        ? 'bg-[#d4af37] text-black shadow-sm'
                        : 'bg-gradient-to-r from-[#92400e] to-[#b45309] text-white shadow-sm'
                      : isDark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-[#78350f] hover:text-black'
                  }`}
                >
                  North Indian
                </button>
                <button
                  onClick={() => setChartStyle('south')}
                  className={`px-3 py-1 rounded-lg text-[0.68rem] font-cinzel font-bold transition-all cursor-pointer ${
                    chartStyle === 'south'
                      ? isDark
                        ? 'bg-[#d4af37] text-black shadow-sm'
                        : 'bg-gradient-to-r from-[#92400e] to-[#b45309] text-white shadow-sm'
                      : isDark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-[#78350f] hover:text-black'
                  }`}
                >
                  South Indian
                </button>
              </div>
            </div>

            {/* North Indian Diamond SVG Chart */}
            {chartStyle === 'north' ? (
              <div className={`relative w-full aspect-square max-w-[420px] mx-auto my-3 rounded-2xl border-2 p-2.5 transition-all shadow-xl ${
                isDark 
                  ? 'bg-[#0d0904] border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.2)]' 
                  : 'bg-[#fffef9] border-[#b45309] shadow-[0_4px_25px_rgba(180,130,40,0.15)]'
              }`}>
                <svg viewBox="0 0 400 400" className="w-full h-full select-none">
                  {/* Outer Frame */}
                  <rect x="5" y="5" width="390" height="390" fill="none" stroke={isDark ? "#d4af37" : "#b45309"} strokeWidth="2" />
                  
                  {/* Diagonal Lines */}
                  <line x1="5" y1="5" x2="395" y2="395" stroke={isDark ? "#d4af37" : "#b45309"} strokeWidth="1.5" strokeOpacity={isDark ? "0.85" : "0.75"} />
                  <line x1="395" y1="5" x2="5" y2="395" stroke={isDark ? "#d4af37" : "#b45309"} strokeWidth="1.5" strokeOpacity={isDark ? "0.85" : "0.75"} />
                  
                  {/* Diamond in center */}
                  <polygon points="200,5 395,200 200,395 5,200" fill="none" stroke={isDark ? "#d4af37" : "#b45309"} strokeWidth="1.5" strokeOpacity={isDark ? "0.85" : "0.75"} />

                  {/* Render All 12 Houses Dynamically with Authentic Rashi Numbers & Calculated Planets */}
                  {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const).map((h) => {
                    const cfg = NORTH_HOUSES_CONFIG[h];
                    const houseRashiNum = ((lagnaRashiNum - 1 + h - 1) % 12) + 1;
                    const planetsInHouse = kundli.planets.filter(p => p.house === h);

                    return (
                      <g key={h}>
                        {/* House Identifier */}
                        <text
                          x={cfg.labelPos.x}
                          y={cfg.labelPos.y}
                          textAnchor="middle"
                          fill={isDark ? "#d4af37" : "#78350f"}
                          fontSize={h === 1 ? '11' : '10'}
                          fontFamily="Cinzel"
                          fontWeight={h === 1 || h === 4 || h === 7 || h === 10 ? 'bold' : 'normal'}
                          opacity={isDark ? "0.9" : "1"}
                        >
                          {cfg.name}
                        </text>

                        {/* Vedic Rashi (Sign) Number Badge */}
                        <text
                          x={cfg.rashiPos.x}
                          y={cfg.rashiPos.y}
                          textAnchor="middle"
                          fill={isDark ? "#c5a059" : "#92400e"}
                          fontSize="9"
                          fontFamily="Cinzel"
                          fontWeight="bold"
                          opacity={isDark ? "0.75" : "0.9"}
                        >
                          [{houseRashiNum}]
                        </text>

                        {/* Placed Planets in this House */}
                        {planetsInHouse.length > 0 && (
                          <g>
                            {planetsInHouse.map((p, pIdx) => {
                              const yOffset = (pIdx - (planetsInHouse.length - 1) / 2) * 14;
                              const planetColor = isDark 
                                ? (p.color || '#ffffff') 
                                : (p.name === 'Sun' ? '#b45309' : p.name === 'Moon' ? '#1e3a8a' : p.name === 'Mars' ? '#991b1b' : p.name === 'Mercury' ? '#065f46' : p.name === 'Jupiter' ? '#78350f' : p.name === 'Venus' ? '#86198f' : p.name === 'Saturn' ? '#1e293b' : '#334155');
                              return (
                                <text
                                  key={p.name}
                                  x={cfg.planetsPos.x}
                                  y={cfg.planetsPos.y + yOffset}
                                  textAnchor="middle"
                                  fill={planetColor}
                                  fontSize="10"
                                  fontFamily="Cinzel"
                                  fontWeight="bold"
                                >
                                  {p.symbol} {p.name.substring(0, 4)}{p.isRetrograde ? 'ᴿ' : ''}
                                </text>
                              );
                            })}
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            ) : (
              /* South Indian Chart Box Format */
              <div className={`grid grid-cols-4 grid-rows-4 gap-1.5 w-full aspect-square max-w-[420px] mx-auto my-3 rounded-2xl border-2 p-2.5 transition-all shadow-xl ${
                isDark 
                  ? 'bg-[#0d0904] border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.2)]' 
                  : 'bg-[#fffef9] border-[#b45309] shadow-[0_4px_25px_rgba(180,130,40,0.15)]'
              }`}>
                {SOUTH_RASHI_GRID.map((box, idx) => {
                  if (box.sign === 'Center') {
                    if (idx === 5) {
                      return (
                        <div key={idx} className={`col-span-2 row-span-2 border flex flex-col items-center justify-center p-2 rounded-xl text-center ${
                          isDark ? 'bg-black/60 border-[#d4af37]/40' : 'bg-amber-100/70 border-[#c5a059]/60'
                        }`}>
                          <span className={`text-xs font-cinzel font-bold ${isDark ? 'text-[#d4af37]' : 'text-[#78350f]'}`}>RASI KUNDLI</span>
                          <span className={`text-[0.65rem] font-serif mt-0.5 ${isDark ? 'text-gray-300' : 'text-[#451a03]'}`}>{kundli.ascendant} Lagna</span>
                          <span className={`text-[0.6rem] font-mono mt-0.5 font-semibold ${isDark ? 'text-amber-400/90' : 'text-[#92400e]'}`}>{kundli.currentDasha}</span>
                        </div>
                      );
                    }
                    return null;
                  }

                  const isLagnaSign = kundli.ascendant?.toLowerCase().includes(box.sign.toLowerCase());
                  const planetsInRashi = kundli.planets.filter(p => 
                    p.sign.toLowerCase().includes(box.sign.toLowerCase())
                  );

                  return (
                    <div key={idx} className={`border p-1.5 flex flex-col justify-between rounded-lg text-[0.68rem] transition-all ${
                      isLagnaSign 
                        ? (isDark ? 'border-[#d4af37] bg-[#d4af37]/15' : 'border-[#b45309] bg-amber-200/70 ring-1 ring-[#b45309]') 
                        : (isDark ? 'border-[#d4af37]/35 bg-black/40' : 'border-[#c5a059]/40 bg-white shadow-xs')
                    }`}>
                      <div className="flex items-center justify-between gap-0.5">
                        <span className={`font-cinzel text-[0.62rem] font-bold ${isDark ? 'text-[#d4af37]' : 'text-[#78350f]'}`}>{box.sign}</span>
                        {isLagnaSign && (
                          <span className={`text-[0.55rem] font-mono font-bold px-1 rounded ${
                            isDark ? 'text-amber-300 bg-[#d4af37]/30' : 'text-white bg-[#92400e]'
                          }`}>
                            ASC
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-0.5 mt-0.5 overflow-hidden">
                        {planetsInRashi.map(p => {
                          const planetColor = isDark 
                            ? (p.color || '#ffffff') 
                            : (p.name === 'Sun' ? '#b45309' : p.name === 'Moon' ? '#1e3a8a' : p.name === 'Mars' ? '#991b1b' : p.name === 'Mercury' ? '#065f46' : p.name === 'Jupiter' ? '#78350f' : p.name === 'Venus' ? '#86198f' : p.name === 'Saturn' ? '#1e293b' : '#334155');
                          return (
                            <span key={p.name} className="text-[0.6rem] font-serif font-bold truncate" style={{ color: planetColor }}>
                              {p.symbol} {p.name.substring(0, 4)}{p.isRetrograde ? 'ᴿ' : ''}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-xs text-[#d4af37] font-serif px-2">
              <span>* Sidereal (Lahiri Ayanamsha)</span>
              <span>Lagna: {kundli.ascendant}</span>
            </div>

          </div>
        </div>

        {/* Right: Core Signs, Dasha Cycle & Sade Sati (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Sign Summary Badges */}
          <div className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'glassmorphism-dark border-[#d4af37]/40 text-gray-200' : 'glassmorphism-light border-[#c5a059]/50 text-[#3b2b0a]'
          }`}>
            <h3 className="text-xs font-cinzel font-bold uppercase tracking-wider text-[#d4af37] mb-3.5 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5" />
              <span>Core Celestial Coordinates</span>
            </h3>

            <div className="space-y-3">
              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                isDark ? 'bg-black/30 border-[#d4af37]/20' : 'bg-white/70 border-[#c5a059]/30'
              }`}>
                <div>
                  <span className="text-[0.65rem] font-cinzel text-gray-400 block">Lagna (Ascendant)</span>
                  <span className="text-xs font-serif font-bold text-[#d4af37]">{kundli.ascendant}</span>
                </div>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37]">
                  {kundli.ascendantDegree}
                </span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                isDark ? 'bg-black/30 border-[#d4af37]/20' : 'bg-white/70 border-[#c5a059]/30'
              }`}>
                <div>
                  <span className="text-[0.65rem] font-cinzel text-gray-400 block">Moon Sign (Chandra Rashi)</span>
                  <span className="text-xs font-serif font-bold text-white">{kundli.moonSign}</span>
                </div>
                <span className="text-[0.68rem] font-serif text-blue-300">
                  {kundli.nakshatra} (Pada {kundli.nakshatraPada})
                </span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                isDark ? 'bg-black/30 border-[#d4af37]/20' : 'bg-white/70 border-[#c5a059]/30'
              }`}>
                <div>
                  <span className="text-[0.65rem] font-cinzel text-gray-400 block">Sun Sign (Surya Rashi)</span>
                  <span className="text-xs font-serif font-bold text-amber-300">{kundli.sunSign}</span>
                </div>
                <span className="text-[0.68rem] font-mono text-amber-400">Vitality Force</span>
              </div>
            </div>
          </div>

          {/* Dasha & Sade Sati Card */}
          <div className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'glassmorphism-dark border-[#d4af37]/40 text-gray-200' : 'glassmorphism-light border-[#c5a059]/50 text-[#3b2b0a]'
          }`}>
            <h3 className="text-xs font-cinzel font-bold uppercase tracking-wider text-[#d4af37] mb-3.5 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>Vimshottari Dasha & Shani Sade Sati</span>
            </h3>

            {/* Current Dasha Period */}
            <div className={`p-3.5 rounded-xl border mb-3 ${
              isDark ? 'bg-black/40 border-[#d4af37]/30' : 'bg-white/80 border-[#c5a059]/30'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[0.68rem] font-cinzel text-[#d4af37] font-semibold">Active Mahadasha</span>
                <span className="text-xs font-bold text-emerald-400">{kundli.currentDasha}</span>
              </div>
              <p className="text-[0.72rem] font-serif text-gray-300">
                {kundli.antardasha}
              </p>
            </div>

            {/* Sade Sati Indicator */}
            <div className={`p-3.5 rounded-xl border ${
              kundli.sadeSatiStatus.inSadeSati
                ? isDark
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  : 'bg-amber-100 border-amber-300 text-amber-900'
                : isDark
                  ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[0.68rem] font-cinzel font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Saturn Sade Sati Status</span>
                </span>
                <span className="text-[0.68rem] font-mono font-bold uppercase">
                  {kundli.sadeSatiStatus.phase}
                </span>
              </div>
              <p className="text-[0.7rem] font-serif leading-relaxed">
                {kundli.sadeSatiStatus.description}
              </p>
            </div>
          </div>

          {/* Lo Shu 3x3 Magic Grid */}
          <div className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'glassmorphism-dark border-[#d4af37]/40 text-gray-200' : 'glassmorphism-light border-[#c5a059]/50 text-[#3b2b0a]'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-cinzel font-bold uppercase tracking-wider text-[#d4af37]">
                Lo Shu Magic Square Grid
              </h3>
              <span className="text-[0.65rem] font-serif text-gray-400">DOB Numerological Energy</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 max-w-[200px] mx-auto my-2 text-center font-cinzel font-bold">
              {[4, 9, 2, 3, 5, 7, 8, 1, 6].map((num) => {
                const count = kundli.loShuGrid[num] || 0;
                return (
                  <div
                    key={num}
                    className={`aspect-square flex flex-col items-center justify-center rounded border transition-all ${
                      count > 0
                        ? isDark
                          ? 'bg-[#d4af37]/20 border-[#d4af37] text-amber-300 shadow-sm'
                          : 'bg-amber-100 border-[#c5a059] text-amber-900'
                        : isDark
                          ? 'bg-black/30 border-gray-800 text-gray-600'
                          : 'bg-gray-100 border-gray-200 text-gray-400'
                    }`}
                  >
                    <span className="text-sm">{num}</span>
                    {count > 1 && (
                      <span className="text-[0.55rem] font-mono text-[#d4af37]">×{count}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Full 9 Planetary Ephemeris Coordinates Table */}
      <div className={`p-6 rounded-2xl border transition-all ${
        isDark ? 'glassmorphism-dark border-[#d4af37]/40 text-gray-200 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/50 text-[#3b2b0a] shadow-md'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-sm sm:text-base font-cinzel font-bold ${isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'}`}>
                Navagraha Ephemeris & Astronomical Degrees
              </h3>
              <span className="text-[0.65rem] font-serif text-[#d4af37]">
                Calculated sidereal planetary degrees with Nakshatra Padas and Digbala status
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-serif border-collapse">
            <thead>
              <tr className={`border-b font-cinzel text-[0.7rem] uppercase tracking-wider ${
                isDark ? 'border-[#d4af37]/30 text-[#d4af37]' : 'border-[#c5a059]/40 text-[#8a6514]'
              }`}>
                <th className="py-2.5 px-3">Graha (Planet)</th>
                <th className="py-2.5 px-3">Rashi (Sign)</th>
                <th className="py-2.5 px-3">Degrees</th>
                <th className="py-2.5 px-3">House (Bhava)</th>
                <th className="py-2.5 px-3">Nakshatra & Pada</th>
                <th className="py-2.5 px-3">Dignity / Status</th>
                <th className="py-2.5 px-3">Cosmic Domain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40">
              {kundli.planets.map((p) => (
                <tr
                  key={p.name}
                  className={`hover:bg-white/5 transition-colors ${
                    isDark ? 'text-gray-300' : 'text-[#3b2b0a]'
                  }`}
                >
                  <td className="py-3 px-3 font-cinzel font-bold flex items-center gap-2">
                    <span className="text-base" style={{ color: p.color }}>{p.symbol}</span>
                    <span>{p.sanskritName}</span>
                    {p.isRetrograde && (
                      <span className="px-1.5 py-0.2 text-[0.6rem] bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded font-mono">
                        R
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-semibold">{p.sign}</td>
                  <td className="py-3 px-3 font-mono text-[#d4af37]">{p.degree}</td>
                  <td className="py-3 px-3 font-mono font-bold">House {p.house}</td>
                  <td className="py-3 px-3">{p.nakshatra} (Pada {p.pada})</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[0.65rem] font-cinzel font-semibold ${
                      p.status === 'Exalted'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : p.status === 'Own Sign'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : p.status === 'Friendly'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-gray-700/30 text-gray-300 border border-gray-600'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[0.7rem] text-gray-400 italic max-w-xs">{p.significance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Astrological Dosha & Yoga Diagnosis Card */}
      <div className={`mt-8 p-6 rounded-2xl border transition-all ${
        isDark ? 'glassmorphism-dark border-[#d4af37]/40 text-gray-200 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/50 text-[#3b2b0a] shadow-md'
      }`}>
        <div className="flex items-center gap-2 mb-4 border-b border-[#d4af37]/30 pb-3">
          <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
          <h3 className={`text-sm sm:text-base font-cinzel font-bold ${isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'}`}>
            Major Kundli Doshas & Planetary Affliction Analysis
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Manglik Dosha */}
          <div className={`p-4 rounded-xl border ${
            isManglik ? 'bg-rose-500/10 border-rose-500/30' : 'bg-emerald-500/10 border-emerald-500/30'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-cinzel text-xs font-bold text-amber-200">Manglik Dosha</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                isManglik ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {isManglik ? 'Active / Present' : 'Dosha Mukt (Absent)'}
              </span>
            </div>
            <p className="text-[11px] font-serif text-gray-300 leading-relaxed">
              {isManglik
                ? 'Mars influences the 1st, 4th, 7th, 8th, or 12th house. Match kundlis with Manglik partner or perform Kumbh Vivah.'
                : 'Mars occupies a harmonious bhava. Marriage and marital bliss are unhindered by Mangal dosha.'}
            </p>
          </div>

          {/* Kalsarp Dosha */}
          <div className={`p-4 rounded-xl border ${
            hasKalsarp ? 'bg-amber-500/10 border-amber-500/30' : 'bg-emerald-500/10 border-emerald-500/30'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-cinzel text-xs font-bold text-amber-200">Kalsarp Yoga / Dosha</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                hasKalsarp ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {hasKalsarp ? 'Partial (Anshik)' : 'Dosha Mukt (Absent)'}
              </span>
            </div>
            <p className="text-[11px] font-serif text-gray-300 leading-relaxed">
              {hasKalsarp
                ? 'Planets sit within the Rahu-Ketu nodal axis. Regular Mahamrityunjaya japa and Nagbali puja neutralize hurdles.'
                : 'Planets move free of the Rahu-Ketu axis, granting steady progress and uninterrupted career trajectory.'}
            </p>
          </div>

          {/* Pitra Dosha */}
          <div className={`p-4 rounded-xl border ${
            hasPitraDosha ? 'bg-purple-500/10 border-purple-500/30' : 'bg-emerald-500/10 border-emerald-500/30'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-cinzel text-xs font-bold text-amber-200">Pitra Dosha</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                hasPitraDosha ? 'bg-purple-500/20 text-purple-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {hasPitraDosha ? 'Mild Influence' : 'Dosha Mukt (Absent)'}
              </span>
            </div>
            <p className="text-[11px] font-serif text-gray-300 leading-relaxed">
              {hasPitraDosha
                ? 'Sun/Rahu conjunction or 9th house aspect. Offer water to Sun (Arghya) and feed cows on Amavasya.'
                : '9th house and Pitru Karaka Surya are well positioned with ancestral grace.'}
            </p>
          </div>
        </div>
      </div>

      {/* Sarvashtakvarga Bindu Matrix Table */}
      <div className={`mt-8 p-6 rounded-2xl border transition-all ${
        isDark ? 'glassmorphism-dark border-[#d4af37]/40 text-gray-200 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/50 text-[#3b2b0a] shadow-md'
      }`}>
        <div className="flex items-center justify-between mb-4 border-b border-[#d4af37]/30 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <Grid className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-sm sm:text-base font-cinzel font-bold ${isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'}`}>
                Sarvashtakvarga (SAV) Bindu Strength Matrix
              </h3>
              <span className="text-[0.65rem] font-serif text-[#d4af37]">
                Parashara Ashtakvarga points per house (28+ Bindus indicates high fortune and transiting gains)
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs font-mono border-collapse">
            <thead>
              <tr className={`border-b font-cinzel text-[0.7rem] uppercase tracking-wider ${
                isDark ? 'border-[#d4af37]/30 text-[#d4af37]' : 'border-[#c5a059]/40 text-[#8a6514]'
              }`}>
                <th className="py-2.5 px-3 text-left">House (Bhava)</th>
                <th className="py-2.5 px-2">Sun</th>
                <th className="py-2.5 px-2">Moon</th>
                <th className="py-2.5 px-2">Mars</th>
                <th className="py-2.5 px-2">Merc</th>
                <th className="py-2.5 px-2">Jup</th>
                <th className="py-2.5 px-2">Ven</th>
                <th className="py-2.5 px-2">Sat</th>
                <th className="py-2.5 px-3 font-bold text-amber-200">Total SAV</th>
                <th className="py-2.5 px-3 text-right">Potency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40">
              {ashtakvargaData.map((row) => (
                <tr
                  key={row.house}
                  className={`hover:bg-white/5 transition-colors ${
                    isDark ? 'text-gray-300' : 'text-[#3b2b0a]'
                  }`}
                >
                  <td className="py-2.5 px-3 text-left font-cinzel font-semibold text-[#d4af37]">
                    House {row.house} ({row.sign})
                  </td>
                  <td className="py-2.5 px-2">{row.sunBindus}</td>
                  <td className="py-2.5 px-2">{row.moonBindus}</td>
                  <td className="py-2.5 px-2">{row.marsBindus}</td>
                  <td className="py-2.5 px-2">{row.mercuryBindus}</td>
                  <td className="py-2.5 px-2">{row.jupiterBindus}</td>
                  <td className="py-2.5 px-2">{row.venusBindus}</td>
                  <td className="py-2.5 px-2">{row.saturnBindus}</td>
                  <td className="py-2.5 px-3 font-bold text-sm text-amber-300 bg-[#d4af37]/10">
                    {row.totalSarvashtak}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-cinzel font-semibold ${
                      row.totalSarvashtak >= 32
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : row.totalSarvashtak >= 28
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {row.strength}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
