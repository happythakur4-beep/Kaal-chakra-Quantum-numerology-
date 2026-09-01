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

  // Gochar Phal Calculation for Selected Rashi (All 12 Vedic Moon Signs)
  const getRashiGocharSummary = (rashi: string) => {
    const r = rashi.toLowerCase();
    if (r.includes('aries') || r.includes('mesha')) {
      return {
        guruGochar: '2nd House (Dhana Bhava) — Tremendous financial accumulation, family harmony, and verbal influence.',
        shaniGochar: '11th House (Labha Bhava) — Supreme gains from past investments; long-term aspirations manifest.',
        rahuKetuGochar: '12th & 6th House Axis — Foreign journeys, victory over competitive rivals and court disputes.',
        overallScore: '94% Auspicious Alignment',
        shanti: 'Offer yellow flowers to Lord Shiva on Mondays and chant Hanuman Chalisa daily.',
      };
    }
    if (r.includes('taurus') || r.includes('vrishabha')) {
      return {
        guruGochar: '1st House (Janma Lagna) — Spiritual clarity, divine wisdom, physical health revitalization.',
        shaniGochar: '10th House (Karma Bhava) — High professional responsibility, structural promotion through discipline.',
        rahuKetuGochar: '11th & 5th House Axis — Speculative gains, creative breakthroughs, and progeny expansion.',
        overallScore: '89% High Alignment',
        shanti: 'Recite Sri Suktam on Fridays and offer white fragrant sweets to young girls.',
      };
    }
    if (r.includes('gemini') || r.includes('mithuna')) {
      return {
        guruGochar: '12th House (Vyaya Bhava) — Foreign opportunities, expenditure on spiritual and charitable causes.',
        shaniGochar: '9th House (Bhagya Bhava) — Fortunes reward systematic hard work, higher research, and pilgrimage.',
        rahuKetuGochar: '10th & 4th House Axis — Professional leadership shifts and real-estate upgrades.',
        overallScore: '84% Harmonious Resonance',
        shanti: 'Recite Vishnu Sahasranama on Thursdays & donate green lentils on Wednesdays.',
      };
    }
    if (r.includes('cancer') || r.includes('karka')) {
      return {
        guruGochar: '11th House (Labha Bhava) — Massive income generation, helpful mentors, and fulfilled ambitions.',
        shaniGochar: '8th House (Ashtama Shani Dhaiya) — Inner occult awakening, joint asset scrutiny, stress relief via dhyana.',
        rahuKetuGochar: '9th & 3rd House Axis — Long-distance journeys, courage surge, and digital communication wins.',
        overallScore: '81% Growth with Caution',
        shanti: 'Perform Rudrabhishek on Mondays and offer water to rising Surya Dev.',
      };
    }
    if (r.includes('leo') || r.includes('simha')) {
      return {
        guruGochar: '10th House (Karma Bhava) — Rapid career ascension, public accolades, and advisory leadership.',
        shaniGochar: '7th House (Kendra Gochar) — Serious relationship commitments, long-term business partnerships.',
        rahuKetuGochar: '8th & 2nd House Axis — Prudent budget management, intuitive insights into hidden knowledge.',
        overallScore: '88% Royal Power Period',
        shanti: 'Offer Arghya to Sun with red sandalwood daily and chant Aditya Hridaya Stotram on Sundays.',
      };
    }
    if (r.includes('virgo') || r.includes('kanya')) {
      return {
        guruGochar: '9th House (Bhagya Bhava) — Supreme spiritual fortune, higher academic triumphs, and father blessings.',
        shaniGochar: '6th House (Shatru Hanta) — Complete destruction of debts and adversaries; robust stamina.',
        rahuKetuGochar: '7th & 1st House Axis — Transformation of personal outlook and commercial alliances.',
        overallScore: '92% Fortunate Golden Transit',
        shanti: 'Feed green fodder or spinach to cows on Wednesdays and chant Budha Bija Mantra.',
      };
    }
    if (r.includes('libra') || r.includes('tula')) {
      return {
        guruGochar: '8th House (Guhya Bhava) — Occult revelations, inheritance gains, and research breakthroughs.',
        shaniGochar: '5th House (Trikona Gochar) — Intellectual discipline, successful education, and creative monetization.',
        rahuKetuGochar: '6th & 12th House Axis — Conquering legal hurdles and spiritual sanctuary experiences.',
        overallScore: '83% Transformative Awakening',
        shanti: 'Donate white clothing to underprivileged on Fridays and light a ghee lamp for Goddess Lakshmi.',
      };
    }
    if (r.includes('scorpio') || r.includes('vrishchika')) {
      return {
        guruGochar: '7th House (Kalyana Bhava) — Supreme marital bliss, business mergers, and flourishing public popularity.',
        shaniGochar: '4th House (Kantaka Shani Dhaiya) — Domestic relocation, renovations, and mental peace cultivation.',
        rahuKetuGochar: '5th & 11th House Axis — Speculative gains, unique creative projects, and network expansion.',
        overallScore: '86% Auspicious Partnership Transit',
        shanti: 'Chant Sundarkand on Tuesdays and distribute jaggery/gram to laborers.',
      };
    }
    if (r.includes('sagittarius') || r.includes('dhanu')) {
      return {
        guruGochar: '6th House (Upachaya Bhava) — Triumph over debts, health restoration, and competitive mastery.',
        shaniGochar: '3rd House (Parakrama Bhava) — Immense willpower, sibling support, and profitable short travels.',
        rahuKetuGochar: '4th & 10th House Axis — Career elevation, institutional respect, and balanced home life.',
        overallScore: '90% High Vitality & Victory',
        shanti: 'Chant Om Namo Bhagavate Vasudevaya on Thursdays and donate yellow bananas to priests.',
      };
    }
    if (r.includes('capricorn') || r.includes('makara')) {
      return {
        guruGochar: '5th House (Poorva Punya) — Intellect flourishes, investment profits, auspicious child ceremonies.',
        shaniGochar: '2nd House (Dhana Bhava - Sade Sati Final Phase) — Solidifying accumulated wealth, emotional maturity.',
        rahuKetuGochar: '3rd & 9th House Axis — Dynamic courage, digital marketing success, and philosophical quests.',
        overallScore: '87% Wealth & Wisdom Manifestation',
        shanti: 'Light a mustard oil diya under Peepal tree on Saturday dusk and chant Shani Stotra.',
      };
    }
    if (r.includes('aquarius') || r.includes('kumbha')) {
      return {
        guruGochar: '4th House (Sukha Bhava) — Real estate acquisition, family luxury, and emotional contentment.',
        shaniGochar: '1st House (Janma Shani / Peak Sade Sati) — High leadership responsibility, profound maturity.',
        rahuKetuGochar: '2nd & 8th House Axis — Astute financial control, deep spiritual grounding.',
        overallScore: '79% Deep Structural Maturity',
        shanti: 'Recite Hanuman Chalisa daily and donate warm black blankets or sesame on Saturdays.',
      };
    }
    // Pisces / Meena
    return {
      guruGochar: '3rd House (Bhratri Bhava) — Bold initiatives, creative writing, arts, and strong enterprise.',
      shaniGochar: '12th House (Rising Sade Sati Phase 1) — Overseas travel, meditative retreats, structured expense.',
      rahuKetuGochar: '1st & 7th House Axis — Re-inventing personal identity and relationship dynamics.',
      overallScore: '80% Spiritual Metamorphosis',
      shanti: 'Chant Maha Mrityunjaya Mantra 108 times on Mondays and offer yellow sweets on Thursdays.',
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
                    <h3 className={`text-xs font-cinzel font-bold ${isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'}`}>{graha.name}</h3>
                    <span className={`text-[0.62rem] font-serif block ${isDark ? 'text-gray-400' : 'text-[#78350f]'}`}>{graha.sanskrit}</span>
                  </div>
                </div>
                <span className={`text-[0.62rem] font-semibold px-2 py-0.5 rounded ${
                  graha.motion.includes('Vakri')
                    ? isDark ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-amber-100 text-amber-800 border-amber-300'
                    : isDark ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}>
                  {graha.motion}
                </span>
              </div>

              <div className={`grid grid-cols-2 gap-2 text-[0.7rem] font-serif pt-2 border-t ${isDark ? 'border-white/5' : 'border-amber-200'}`}>
                <div>
                  <span className={`text-[0.62rem] block ${isDark ? 'text-gray-400' : 'text-[#5a4313]'}`}>Gochar Rashi:</span>
                  <span className={`font-semibold truncate block ${isDark ? 'text-amber-300' : 'text-[#92400e]'}`}>{graha.rashi}</span>
                </div>
                <div>
                  <span className={`text-[0.62rem] block ${isDark ? 'text-gray-400' : 'text-[#5a4313]'}`}>Degree (Bhaga):</span>
                  <span className={`font-mono ${isDark ? 'text-gray-200' : 'text-[#2a1704]'}`}>{graha.degree}</span>
                </div>
                <div className="col-span-2">
                  <span className={`text-[0.62rem] block ${isDark ? 'text-gray-400' : 'text-[#5a4313]'}`}>Gochar Nakshatra:</span>
                  <span className={`text-[0.68rem] ${isDark ? 'text-gray-300' : 'text-[#4a3518]'}`}>{graha.nakshatra}</span>
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

