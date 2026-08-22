import React, { useState } from 'react';
import { ThemeMode, UserProfile } from '../../types';
import { CURRENT_PLANETARY_TRANSITS, PlanetaryTransitEvent, ZODIAC_SIGNS } from '../../utils/astrologyEngine';
import { 
  Orbit, 
  Bell, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck,
  Compass,
  AlertTriangle,
  RotateCcw,
  Zap,
  Info
} from 'lucide-react';

interface TransitTrackerScreenProps {
  theme: ThemeMode;
  user: UserProfile;
}

interface LiveGocharPlanet {
  name: string;
  sanskrit: string;
  symbol: string;
  rashi: string;
  degree: string;
  nakshatra: string;
  motion: 'Margi (Direct)' | 'Vakri (Retrograde)';
  status: 'Shubh Gochar' | 'Mishrit Gochar' | 'Savdhani Gochar';
  speed: string;
  color: string;
}

export const TransitTrackerScreen: React.FC<TransitTrackerScreenProps> = ({ theme, user }) => {
  const isDark = theme === 'dark';

  const [savedAlerts, setSavedAlerts] = useState<string[]>(['tr-1', 'tr-2']);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Auspicious' | 'Transformative' | 'Caution'>('All');
  const [selectedRashi, setSelectedRashi] = useState<string>('Gemini (Mithuna)');

  const toggleAlert = (id: string) => {
    if (savedAlerts.includes(id)) {
      setSavedAlerts(savedAlerts.filter((a) => a !== id));
    } else {
      setSavedAlerts([...savedAlerts, id]);
    }
  };

  const filteredTransits = activeFilter === 'All'
    ? CURRENT_PLANETARY_TRANSITS
    : CURRENT_PLANETARY_TRANSITS.filter((t) => t.impactType === activeFilter);

  // Live Gochar Planetary Positions (Ephemeris)
  const liveGocharData: LiveGocharPlanet[] = [
    {
      name: 'Sun (Surya)',
      sanskrit: 'सूर्य देव',
      symbol: '☉',
      rashi: 'Leo (Simha)',
      degree: '14°22\'',
      nakshatra: 'Purva Phalguni (Pada 1)',
      motion: 'Margi (Direct)',
      status: 'Shubh Gochar',
      speed: '0°59\' / day',
      color: '#f59e0b',
    },
    {
      name: 'Moon (Chandra)',
      sanskrit: 'चन्द्र देव',
      symbol: '☽',
      rashi: 'Cancer (Karka)',
      degree: '28°10\'',
      nakshatra: 'Ashlesha (Pada 4)',
      motion: 'Margi (Direct)',
      status: 'Shubh Gochar',
      speed: '13°12\' / day',
      color: '#e2e8f0',
    },
    {
      name: 'Mars (Mangal)',
      sanskrit: 'मंगल देव',
      symbol: '♂',
      rashi: 'Taurus (Vrishabha)',
      degree: '08°45\'',
      nakshatra: 'Krittika (Pada 4)',
      motion: 'Margi (Direct)',
      status: 'Mishrit Gochar',
      speed: '0°38\' / day',
      color: '#ef4444',
    },
    {
      name: 'Mercury (Budh)',
      sanskrit: 'बुध देव',
      symbol: '☿',
      rashi: 'Leo (Simha)',
      degree: '19°34\'',
      nakshatra: 'Purva Phalguni (Pada 2)',
      motion: 'Margi (Direct)',
      status: 'Shubh Gochar',
      speed: '1°14\' / day',
      color: '#10b981',
    },
    {
      name: 'Jupiter (Guru)',
      sanskrit: 'बृहस्पति देव',
      symbol: '♃',
      rashi: 'Taurus (Vrishabha)',
      degree: '22°18\'',
      nakshatra: 'Rohini (Pada 4)',
      motion: 'Margi (Direct)',
      status: 'Shubh Gochar',
      speed: '0°08\' / day',
      color: '#fbbf24',
    },
    {
      name: 'Venus (Shukra)',
      sanskrit: 'शुक्र देव',
      symbol: '♀',
      rashi: 'Virgo (Kanya)',
      degree: '11°50\'',
      nakshatra: 'Hasta (Pada 1)',
      motion: 'Margi (Direct)',
      status: 'Savdhani Gochar',
      speed: '1°10\' / day',
      color: '#ec4899',
    },
    {
      name: 'Saturn (Shani)',
      sanskrit: 'शनि देव',
      symbol: '♄',
      rashi: 'Aquarius (Kumbha)',
      degree: '21°06\'',
      nakshatra: 'Purva Bhadrapada (Pada 1)',
      motion: 'Vakri (Retrograde)',
      status: 'Mishrit Gochar',
      speed: '-0°03\' / day',
      color: '#6366f1',
    },
    {
      name: 'Rahu',
      sanskrit: 'राहु देव',
      symbol: '☊',
      rashi: 'Pisces (Meena)',
      degree: '12°14\'',
      nakshatra: 'Uttara Bhadrapada (Pada 3)',
      motion: 'Vakri (Retrograde)',
      status: 'Savdhani Gochar',
      speed: '-0°03\' / day',
      color: '#8b5cf6',
    },
    {
      name: 'Ketu',
      sanskrit: 'केतु देव',
      symbol: '☋',
      rashi: 'Virgo (Kanya)',
      degree: '12°14\'',
      nakshatra: 'Hasta (Pada 1)',
      motion: 'Vakri (Retrograde)',
      status: 'Mishrit Gochar',
      speed: '-0°03\' / day',
      color: '#94a3b8',
    },
  ];

  // Calendar dates for auspicious Grah Gochar & Tithis
  const calendarEvents = [
    { date: 'Aug 24, 2026', title: 'Shravana Putrada Ekadashi', type: 'Vrat & Gochar Puja', auspicious: true, desc: 'Favorable for Guru Gochar Aradhana.' },
    { date: 'Aug 28, 2026', title: 'Raksha Bandhan & Purnima Snan', type: 'Full Moon Gochar Parva', auspicious: true, desc: 'Chandra Gochar in Dhanishta Nakshatra.' },
    { date: 'Sep 04, 2026', title: 'Janmashtami (Krishna Janma)', type: 'Rohini Nakshatra Gochar', auspicious: true, desc: 'Supreme spiritual energy window.' },
    { date: 'Sep 12, 2026', title: 'Bhadrapada Amavasya (Pitri Tarpan)', type: 'Surya-Chandra Yuti Gochar', auspicious: false, desc: 'Ideal for Rahu-Ketu Shanti & ancestral rituals.' },
    { date: 'Sep 16, 2026', title: 'Kanya Sankranti (Surya Gochar)', type: 'Surya Rashi Parivartan', auspicious: true, desc: 'Sun enters Virgo sign (Kanya Rashi).' },
    { date: 'Sep 22, 2026', title: 'Sharad Navratri Ghatasthapana', type: 'Devi Shakti Mahaparva', auspicious: true, desc: 'Nine sacred nights of Navagraha alignment.' },
  ];

  // Gochar Phal Calculation for Selected Rashi
  const getRashiGocharSummary = (rashi: string) => {
    if (rashi.includes('Gemini') || rashi.includes('Mithuna')) {
      return {
        guruGochar: '12th House (Vyaya) — Higher learning, foreign journeys, spiritual expense.',
        shaniGochar: '9th House (Bhagya / Shani Dhaiya) — Fortunes reward disciplined hard work and dharma.',
        rahuKetuGochar: '10th & 4th House Axis — Career expansion and home-life restructuring.',
        overallScore: '82% High Resonance',
        shanti: 'Recite Vishnu Sahasranama on Thursdays & donate sesame seeds on Saturdays.',
      };
    }
    if (rashi.includes('Aries') || rashi.includes('Mesha')) {
      return {
        guruGochar: '2nd House (Dhana Bhava) — Tremendous financial accumulation and family harmony.',
        shaniGochar: '11th House (Labha Bhava) — Supreme gains, long-term goals manifest.',
        rahuKetuGochar: '12th & 6th House Axis — Victory over competition, foreign gains.',
        overallScore: '94% Auspicious Alignment',
        shanti: 'Offer yellow flowers to Lord Shiva and feed birds in the morning.',
      };
    }
    if (rashi.includes('Aquarius') || rashi.includes('Kumbha')) {
      return {
        guruGochar: '4th House (Sukha Bhava) — Property gains, domestic happiness, vehicle purchase.',
        shaniGochar: '1st House (Janma Shani / Peak Sade Sati) — Intense self-transformation, leadership responsibility.',
        rahuKetuGochar: '2nd & 8th House Axis — Financial caution, sudden intuitive awakenings.',
        overallScore: '76% Transformative Period',
        shanti: 'Light a mustard oil diya under Peepal tree on Saturdays & recite Hanuman Chalisa.',
      };
    }
    return {
      guruGochar: 'Favorable Kendra / Trikona Gochar — Growth in wisdom, spiritual insights, and luck.',
      shaniGochar: 'Stabilizing Saturn Gochar — Structural discipline creates permanent foundations.',
      rahuKetuGochar: 'Karmic Axis Alignment — Awakening untapped latent occult talents.',
      overallScore: '85% Harmonious Gochar',
      shanti: 'Daily Gayatri Mantra recitation and water offering (Arghya) to Surya Dev.',
    };
  };

  const rashiSummary = getRashiGocharSummary(selectedRashi);

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Title Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 text-xs font-cinzel tracking-widest uppercase"
          style={{
            backgroundColor: isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(245, 238, 218, 0.8)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(197, 160, 89, 0.5)',
            color: '#d4af37',
          }}
        >
          <Orbit className="w-3.5 h-3.5 text-[#ffd700]" />
          <span>✦ Dainik Grah Gochar & Ephemeris ✦</span>
        </div>

        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold tracking-wide uppercase ${
          isDark ? 'text-gold-gradient text-3d-gold' : 'text-[#3b2b0a] text-3d-celestial'
        }`}>
          Grah Gochar Chakra & Gochar Phal
        </h1>

        <p className={`text-sm font-serif max-w-2xl mx-auto mt-2 leading-relaxed ${
          isDark ? 'text-gray-300' : 'text-[#5a4313]'
        }`}>
          Track real-time Vedic planetary transits (Grah Gochar), Vakri Grah (retrograde) movements, Shani Sade Sati impacts, and prescribed Gochar Shanti Upayas.
        </p>
      </div>

      {/* Feature 1: Live Dainik Grah Gochar Sthiti (Real-Time Ephemeris Table) */}
      <div className={`p-6 rounded-2xl border mb-8 transition-all ${
        isDark ? 'glassmorphism-dark border-[#d4af37]/40 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/50 shadow-md'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-[#d4af37]/20 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#ffd700]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className={`text-base font-cinzel font-bold ${isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'}`}>
                Dainik Grah Gochar Sthiti (Live Planetary Transit Positions)
              </h2>
              <span className="text-[0.68rem] font-serif text-[#d4af37]">
                Live Sidereal Lahiri Ephemeris • Updated Daily
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37] self-start sm:self-auto">
            <span className="px-2.5 py-1 rounded bg-black/40 border border-[#d4af37]/30">
              9 Grahas Active in Gochar
            </span>
          </div>
        </div>

        {/* Live Graha Gochar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {liveGocharData.map((graha, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all hover:-translate-y-0.5 ${
                isDark 
                  ? 'bg-black/40 border-[#d4af37]/20 hover:border-[#d4af37]/50' 
                  : 'bg-white/80 border-[#c5a059]/30 hover:border-[#c5a059]'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold" style={{ color: graha.color }}>
                    {graha.symbol}
                  </span>
                  <div>
                    <h3 className="text-xs font-cinzel font-bold text-[#fdf2d1]">{graha.name}</h3>
                    <span className="text-[0.62rem] font-serif text-gray-400 block">{graha.sanskrit}</span>
                  </div>
                </div>
                <span className={`text-[0.62rem] font-semibold px-2 py-0.5 rounded ${
                  graha.motion.includes('Vakri')
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {graha.motion}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[0.7rem] font-serif pt-2 border-t border-white/5">
                <div>
                  <span className="text-gray-400 text-[0.62rem] block">Gochar Rashi:</span>
                  <span className="font-semibold text-amber-300 truncate block">{graha.rashi}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[0.62rem] block">Degree (Bhaga):</span>
                  <span className="font-mono text-gray-200">{graha.degree}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-400 text-[0.62rem] block">Gochar Nakshatra:</span>
                  <span className="text-gray-300 text-[0.68rem]">{graha.nakshatra}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature 2: Personalized Janma Rashi Gochar Phal (Transit Impact on Your Moon Sign) */}
      <div className={`p-6 rounded-2xl border mb-8 transition-all ${
        isDark ? 'glassmorphism-dark border-[#d4af37]/40 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/50 shadow-md'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#ffd700]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className={`text-base font-cinzel font-bold ${isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'}`}>
                Janma Rashi Grah Gochar Phal (Personalized Transit Analysis)
              </h2>
              <span className="text-[0.68rem] font-serif text-[#d4af37]">
                Calculated from your Janma Rashi (Moon Sign)
              </span>
            </div>
          </div>

          {/* Rashi Selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="rashi-select" className="text-xs font-cinzel text-[#d4af37] whitespace-nowrap">
              Select Rashi:
            </label>
            <select
              id="rashi-select"
              value={selectedRashi}
              onChange={(e) => setSelectedRashi(e.target.value)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-serif ${
                isDark ? 'bg-black/60 border-[#d4af37]/40 text-white' : 'bg-white border-[#c5a059]/50 text-gray-900'
              }`}
            >
              {ZODIAC_SIGNS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rashi Gochar Report Card */}
        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-black/50 border-[#d4af37]/30' : 'bg-white/90 border-[#c5a059]/40'
        }`}>
          <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#d4af37]/20">
            <span className="text-xs font-cinzel font-bold text-[#ffd700]">
              Gochar Phal for {selectedRashi}
            </span>
            <span className="text-[0.65rem] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {rashiSummary.overallScore}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-xs font-serif">
            <div className={`p-3 rounded-lg border ${
              isDark ? 'bg-black/30 border-[#d4af37]/20' : 'bg-amber-50/60 border-amber-200'
            }`}>
              <strong className="text-amber-400 block mb-1 font-cinzel text-[0.72rem]">✦ Guru Gochar (Jupiter Transit):</strong>
              <p className="text-gray-300 leading-relaxed text-[0.72rem]">{rashiSummary.guruGochar}</p>
            </div>
            <div className={`p-3 rounded-lg border ${
              isDark ? 'bg-black/30 border-[#d4af37]/20' : 'bg-amber-50/60 border-amber-200'
            }`}>
              <strong className="text-indigo-400 block mb-1 font-cinzel text-[0.72rem]">✦ Shani Gochar (Saturn Transit):</strong>
              <p className="text-gray-300 leading-relaxed text-[0.72rem]">{rashiSummary.shaniGochar}</p>
            </div>
            <div className={`p-3 rounded-lg border ${
              isDark ? 'bg-black/30 border-[#d4af37]/20' : 'bg-amber-50/60 border-amber-200'
            }`}>
              <strong className="text-purple-400 block mb-1 font-cinzel text-[0.72rem]">✦ Rahu-Ketu Gochar Axis:</strong>
              <p className="text-gray-300 leading-relaxed text-[0.72rem]">{rashiSummary.rahuKetuGochar}</p>
            </div>
          </div>

          <div className={`p-2.5 rounded-lg border text-xs font-serif flex items-center gap-2 ${
            isDark ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' : 'bg-emerald-50 border-emerald-300 text-emerald-900'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Prescribed Gochar Shanti / Upay:</strong> {rashiSummary.shanti}
            </span>
          </div>
        </div>
      </div>

      {/* Feature 3: Major Grah Gochar Rashi Parivartan & Ingress Events */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          {[
            { key: 'All', label: 'Sabhi Gochar (All)' },
            { key: 'Auspicious', label: 'Shubh Gochar' },
            { key: 'Transformative', label: 'Parivartankari Gochar' },
            { key: 'Caution', label: 'Savdhani Gochar' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-cinzel font-semibold transition-all cursor-pointer ${
                activeFilter === filter.key
                  ? isDark
                    ? 'bg-[#d4af37] text-black shadow-gold-soft'
                    : 'bg-[#c5a059] text-white shadow-sm'
                  : isDark
                    ? 'bg-black/40 text-gray-300 border border-[#d4af37]/20 hover:border-[#d4af37]/40'
                    : 'bg-white text-[#5a4313] border border-[#c5a059]/30 hover:bg-amber-50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37]">
          <Bell className="w-4 h-4" />
          <span>{savedAlerts.length} Active Grah Gochar Bookmarks</span>
        </div>
      </div>

      {/* Grah Gochar Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {filteredTransits.map((transit) => {
          const isSaved = savedAlerts.includes(transit.id);
          return (
            <div
              key={transit.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isDark ? 'glassmorphism-dark border-[#d4af37]/40 text-gray-200 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/50 text-[#3b2b0a] shadow-md'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-cinzel font-bold text-[#d4af37]">
                        {transit.planet}
                      </span>
                      <span className="text-[0.65rem] font-serif text-gray-400">
                        {transit.sanskritName}
                      </span>
                    </div>
                    <h3 className="text-sm font-cinzel font-bold mt-0.5">{transit.title}</h3>
                  </div>

                  <button
                    onClick={() => toggleAlert(transit.id)}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      isSaved
                        ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37]'
                        : isDark
                        ? 'bg-black/30 border-gray-700 text-gray-400 hover:text-white'
                        : 'bg-white border-amber-200 text-gray-400 hover:text-gray-700'
                    }`}
                    title={isSaved ? 'Remove Grah Gochar Alert' : 'Set Grah Gochar Notification'}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                {/* Ingress details */}
                <div className="flex items-center gap-2 text-xs font-mono mb-3">
                  <span className="px-2 py-0.5 rounded bg-black/40 border border-[#d4af37]/20 text-gray-300">
                    Grah Gochar Marg: {transit.fromSign} → {transit.toSign}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[0.65rem] font-cinzel font-semibold ${
                    transit.impactType === 'Auspicious'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : transit.impactType === 'Transformative'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {transit.impactType === 'Auspicious' ? 'Shubh Gochar' : transit.impactType === 'Transformative' ? 'Parivartankari' : 'Savdhani'}
                  </span>
                </div>

                <p className="text-xs font-serif text-gray-300 leading-relaxed mb-3">
                  {transit.description}
                </p>
              </div>

              {/* Remedial Action Callout */}
              <div className={`p-3 rounded-xl border text-[0.72rem] font-serif ${
                isDark ? 'bg-black/40 border-[#d4af37]/25 text-amber-200/90' : 'bg-amber-50 border-amber-200 text-[#5a4313]'
              }`}>
                <strong>Prescribed Gochar Shanti / Upay:</strong> {transit.remedy}
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature 4: Grah Gochar & Shubh Muhurat Kaal Chakra Calendar */}
      <div className={`p-6 rounded-2xl border transition-all ${
        isDark ? 'glassmorphism-dark border-[#d4af37]/40 text-gray-200 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/50 text-[#3b2b0a] shadow-md'
      }`}>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-[#d4af37]" />
          <h3 className="text-sm font-cinzel font-bold text-[#d4af37] uppercase tracking-wider">
            Grah Gochar Kaal Chakra & Shubh Muhurat Calendar
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {calendarEvents.map((evt, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                isDark ? 'bg-black/40 border-[#d4af37]/20' : 'bg-white/80 border-[#c5a059]/30'
              }`}
            >
              <div>
                <span className="text-[0.65rem] font-mono text-[#d4af37] block font-semibold">
                  {evt.date}
                </span>
                <h4 className="text-xs font-cinzel font-bold mt-0.5">{evt.title}</h4>
                <p className="text-[0.68rem] font-serif text-gray-400 mt-1">{evt.desc}</p>
              </div>
              <span className={`text-[0.65rem] font-serif mt-2 px-2 py-0.5 rounded w-fit ${
                evt.auspicious
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              }`}>
                {evt.type}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

