import React, { useState, useEffect } from 'react';
import { ThemeMode, CelestialBodyData } from '../../types';
import {
  calculateBirthPlanetaryPositions,
  NatalEphemerisData,
  NatalPlanetPosition,
  ZODIAC_METADATA,
  POPULAR_LOCATIONS,
} from '../../utils/planetaryEphemeris';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Orbit,
  Compass,
  Zap,
  Globe,
  Eye,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  Sun,
  Moon,
  Info,
  X,
  Volume2,
  Navigation,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface BirthPlanetaryEphemerisModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onApplyBirthPositions?: (ephemeris: NatalEphemerisData) => void;
  onApplyEphemeris?: (ephemeris: NatalEphemerisData) => void;
  onFocusPlanet?: (planetId: string) => void;
  theme?: ThemeMode;
  initialDate?: string;
  initialTime?: string;
  initialCity?: string;
  initialData?: NatalEphemerisData;
}

export const BirthPlanetaryEphemerisModal: React.FC<BirthPlanetaryEphemerisModalProps> = ({
  isOpen = true,
  onClose,
  onApplyBirthPositions,
  onApplyEphemeris,
  onFocusPlanet,
  theme = 'dark',
  initialDate = '1996-07-14',
  initialTime = '06:45',
  initialCity = 'Varanasi, India',
  initialData,
}) => {
  const [birthDate, setBirthDate] = useState<string>(initialData?.birthDate || initialDate);
  const [birthTime, setBirthTime] = useState<string>(initialData?.birthTime || initialTime);
  const [birthCity, setBirthCity] = useState<string>(initialData?.birthLocation || initialData?.city || initialCity);
  const [selectedPlanet, setSelectedPlanet] = useState<NatalPlanetPosition | null>(null);
  const [ephemerisData, setEphemerisData] = useState<NatalEphemerisData>(() =>
    initialData || calculateBirthPlanetaryPositions(initialDate, initialTime, initialCity)
  );
  const [activeFilter, setActiveFilter] = useState<'all' | 'inner' | 'outer' | 'nodes'>('all');
  const [isLocating, setIsLocating] = useState(false);

  // Recalculate whenever date, time or city changes
  useEffect(() => {
    const data = calculateBirthPlanetaryPositions(birthDate, birthTime, birthCity);
    setEphemerisData(data);
    if (!selectedPlanet && data.planets.length > 0) {
      setSelectedPlanet(data.planets[0]);
    }
  }, [birthDate, birthTime, birthCity]);

  if (!isOpen) return null;

  const handleApplyToUniverse = () => {
    cosmicAudio.playCyberWarp();
    if (onApplyBirthPositions) {
      onApplyBirthPositions(ephemerisData);
    }
    if (onApplyEphemeris) {
      onApplyEphemeris(ephemerisData);
    }
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.55 },
        colors: ['#ffd700', '#38bdf8', '#c084fc', '#f472b6', '#34d399'],
      });
    } catch {}
    onClose();
  };

  const handleSetCurrentLiveSky = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    setBirthDate(`${yyyy}-${mm}-${dd}`);
    setBirthTime(`${hh}:${min}`);
    setBirthCity('New Delhi, India');
    cosmicAudio.playCyberKeystroke();
  };

  const handleSetNikolaTeslaBirth = () => {
    setBirthDate('1856-07-10');
    setBirthTime('00:00');
    setBirthCity('Smiljan, Croatia');
    cosmicAudio.playCyberKeystroke();
  };

  const handleSetLordKrishnaBirth = () => {
    setBirthDate('1996-08-25'); // Symbolic Janmashtami Ashtami
    setBirthTime('00:00');
    setBirthCity('Varanasi, India');
    cosmicAudio.playCyberKeystroke();
  };

  const handleSetVivekanandaBirth = () => {
    setBirthDate('1863-01-12');
    setBirthTime('06:33');
    setBirthCity('Kolkata, India');
    cosmicAudio.playCyberKeystroke();
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        () => {
          setBirthCity('Current Geolocation (Live)');
          setIsLocating(false);
        },
        () => {
          setBirthCity('New Delhi, India');
          setIsLocating(false);
        }
      );
    }
  };

  const filteredPlanets = ephemerisData.planets.filter((p) => {
    if (activeFilter === 'inner') return ['sun', 'moon', 'mercury', 'venus', 'earth', 'mars'].includes(p.id);
    if (activeFilter === 'outer') return ['jupiter', 'saturn', 'uranus', 'neptune'].includes(p.id);
    if (activeFilter === 'nodes') return ['rahu', 'ketu'].includes(p.id);
    return true;
  });

  const popularCities = [
    'Varanasi, India',
    'New Delhi, India',
    'Mumbai, India',
    'Bengaluru, India',
    'Kolkata, India',
    'Jaipur, India',
    'Ayodhya, India',
    'Haridwar, India',
    'Ujjain, India',
    'London, UK',
    'New York, USA',
    'Dubai, UAE',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-2xl overflow-y-auto font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        className="relative w-full max-w-5xl bg-[#090514]/95 border border-amber-500/40 rounded-3xl shadow-[0_0_60px_rgba(251,191,36,0.3)] p-4 sm:p-6 my-auto max-h-[92vh] overflow-y-auto no-scrollbar"
      >
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-amber-500/20 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/30 to-cyan-600/30 border border-amber-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.3)]">
              <Orbit className="w-6 h-6 text-[#ffd700] animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/20 text-[#ffd700] border border-amber-500/30 font-mono">
                  369 NATAL EPHEMERIS ALIGNMENT
                </span>
                <span className="text-xs text-cyan-400 flex items-center gap-1 font-mono">
                  <Sparkles className="w-3 h-3" /> जन्म समय ग्रह स्थिति
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-cyan-300">
                Align 369 Planets to Your Exact Birth Moment
              </h2>
              <p className="text-xs text-gray-300 mt-0.5">
                अपनी जन्म तिथि, समय और स्थान दर्ज करें — सभी ग्रह स्वतः उसी अलाइनमेंट में आ जाएंगे जिस समय आपका जन्म हुआ था।
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Controls Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 bg-purple-950/20 border border-purple-500/25 rounded-2xl p-3.5">
          {/* Date of Birth Input */}
          <div>
            <label className="text-xs font-semibold text-amber-300/90 flex items-center gap-1.5 mb-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Date of Birth (जन्म तिथि)</span>
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-black/70 border border-amber-500/30 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          {/* Time of Birth Input */}
          <div>
            <label className="text-xs font-semibold text-amber-300/90 flex items-center gap-1.5 mb-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Time of Birth (जन्म समय HH:MM)</span>
            </label>
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-full bg-black/70 border border-amber-500/30 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          {/* Birth Location */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-amber-300/90 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Birth Place / City (जन्म स्थान)</span>
              </label>
              <button
                type="button"
                onClick={handleDetectLocation}
                className="text-[10px] text-cyan-300 hover:text-cyan-200 flex items-center gap-1 cursor-pointer"
              >
                <Navigation className="w-2.5 h-2.5" />
                {isLocating ? 'Locating...' : 'GPS Detect'}
              </button>
            </div>
            <input
              type="text"
              value={birthCity}
              onChange={(e) => setBirthCity(e.target.value)}
              placeholder="e.g. Varanasi, New Delhi, Mumbai"
              className="w-full bg-black/70 border border-amber-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400 transition"
            />
          </div>
        </div>

        {/* Popular City Quick-Select Pills */}
        <div className="mb-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <span className="text-[11px] text-gray-400 whitespace-nowrap flex items-center gap-1">
            <Globe className="w-3 h-3 text-cyan-400" /> Quick City:
          </span>
          {popularCities.map((city) => (
            <button
              key={city}
              onClick={() => setBirthCity(city)}
              className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition cursor-pointer ${
                birthCity === city
                  ? 'bg-amber-500/30 text-amber-200 border border-amber-400/60 font-bold'
                  : 'bg-black/40 text-gray-300 hover:text-white border border-white/10 hover:border-amber-500/30'
              }`}
            >
              {city.split(',')[0]}
            </button>
          ))}
        </div>

        {/* Quick Epoch Presets & Apply Button */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-5 p-2.5 bg-black/40 border border-white/10 rounded-2xl">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-gray-400 font-mono">Cosmic Presets:</span>
            <button
              onClick={handleSetCurrentLiveSky}
              className="px-2.5 py-1 rounded-lg text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Live Sky Today
            </button>
            <button
              onClick={handleSetNikolaTeslaBirth}
              className="px-2.5 py-1 rounded-lg text-xs bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 transition cursor-pointer flex items-center gap-1"
            >
              <Zap className="w-3 h-3" /> Nikola Tesla (1856)
            </button>
            <button
              onClick={handleSetVivekanandaBirth}
              className="px-2.5 py-1 rounded-lg text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" /> Swami Vivekananda (1863)
            </button>
          </div>

          {/* Master Apply to 3D View Button */}
          <button
            onClick={handleApplyToUniverse}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400 text-black hover:brightness-110 shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider font-mono"
          >
            <Orbit className="w-4 h-4 animate-spin-slow" />
            <span>✨ AUTO-ALIGN 369 PLANETS TO BIRTH MOMENT</span>
          </button>
        </div>

        {/* Natal Ephemeris Summary Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5 p-3 bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-cyan-500/15 border border-amber-500/30 rounded-2xl shadow-inner">
          <div className="text-center p-2 rounded-xl bg-black/50 border border-amber-500/20">
            <div className="text-[10px] uppercase text-gray-400 font-semibold">Ascendant (लग्न)</div>
            <div className="text-sm font-bold text-amber-300 flex items-center justify-center gap-1">
              <span>{ephemerisData.ascendant.sign}</span>
              <span className="text-xs text-gray-400">{ephemerisData.ascendant.formattedDegree}</span>
            </div>
          </div>
          <div className="text-center p-2 rounded-xl bg-black/50 border border-amber-500/20">
            <div className="text-[10px] uppercase text-gray-400 font-semibold">Sun Sign (सूर्य राशि)</div>
            <div className="text-sm font-bold text-[#ffd700] flex items-center justify-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>{ephemerisData.sunSign}</span>
            </div>
          </div>
          <div className="text-center p-2 rounded-xl bg-black/50 border border-cyan-500/20">
            <div className="text-[10px] uppercase text-gray-400 font-semibold">Moon Sign (चन्द्र राशि)</div>
            <div className="text-sm font-bold text-cyan-300 flex items-center justify-center gap-1">
              <Moon className="w-3.5 h-3.5 text-cyan-300" />
              <span>{ephemerisData.moonSign}</span>
            </div>
          </div>
          <div className="text-center p-2 rounded-xl bg-black/50 border border-purple-500/20">
            <div className="text-[10px] uppercase text-gray-400 font-semibold">Birth Nakshatra (नक्षत्र)</div>
            <div className="text-sm font-bold text-purple-300 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{ephemerisData.nakshatra}</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-3">
          {[
            { id: 'all', label: 'All 10 Grahas (सभी ग्रह)' },
            { id: 'inner', label: 'Inner Planets (Sun, Moon, Mars...)' },
            { id: 'outer', label: 'Outer Giants (Jupiter, Saturn...)' },
            { id: 'nodes', label: 'Lunar Nodes (Rahu / Ketu)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-amber-500/20 text-[#ffd700] border border-amber-500/50'
                  : 'text-gray-400 hover:text-white bg-black/30 border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Detailed Planetary Positions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-5">
          {filteredPlanets.map((planet) => {
            const isSelected = selectedPlanet?.id === planet.id;
            return (
              <div
                key={planet.id}
                onClick={() => setSelectedPlanet(planet)}
                className={`p-3 rounded-2xl transition-all cursor-pointer border relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-900/40 via-amber-950/30 to-black border-[#ffd700] shadow-[0_0_20px_rgba(251,191,36,0.3)]'
                    : 'bg-black/40 hover:bg-black/60 border-white/10 hover:border-amber-500/40'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shadow-md"
                      style={{
                        backgroundColor: `${planet.color}25`,
                        color: planet.color,
                        border: `1px solid ${planet.color}80`,
                      }}
                    >
                      {planet.symbol}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{planet.name}</span>
                        {planet.isRetrograde && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] bg-red-500/20 text-red-400 border border-red-500/30 font-mono">
                            वक्र (R)
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#ffd700]">{planet.sanskritName}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-cyan-300">
                      {planet.formattedDegree}
                    </div>
                    <div className="text-[10px] text-gray-400">House #{planet.house} (भाव)</div>
                  </div>
                </div>

                {/* Sign & Nakshatra Specs */}
                <div className="grid grid-cols-2 gap-1.5 p-2 rounded-xl bg-black/50 border border-white/5 text-[11px] mb-2">
                  <div>
                    <span className="text-gray-400 text-[10px]">Rashi (राशि):</span>
                    <div className="font-semibold text-amber-200">{planet.sign} ({planet.signName.split(' ')[0]})</div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px]">Nakshatra (नक्षत्र):</span>
                    <div className="font-semibold text-purple-200">
                      {planet.nakshatra} (चरण {planet.nakshatraPada})
                    </div>
                  </div>
                </div>

                {/* Actions & Deep Focus */}
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-gray-400 text-[10px] font-mono">
                    Longitude: {planet.eclipticLongitude.toFixed(1)}°
                  </span>
                  {onFocusPlanet && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onFocusPlanet(planet.id);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 flex items-center gap-1 transition cursor-pointer"
                    >
                      <Eye className="w-3 h-3" /> Zoom 3D
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Planet Deep Interpretation */}
        {selectedPlanet && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-cyan-500/10 border border-amber-500/30">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#ffd700]" />
              <span className="text-xs font-bold text-[#ffd700] uppercase tracking-wider font-mono">
                Natal Resonance: {selectedPlanet.name} in {selectedPlanet.sign}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              {selectedPlanet.interpretation} At your birth moment ({birthDate} at {birthTime} in {birthCity}), {selectedPlanet.name} resided at{' '}
              <span className="text-amber-300 font-semibold">{selectedPlanet.formattedDegree} of {selectedPlanet.sign}</span>, in the nakshatra of{' '}
              <span className="text-purple-300 font-semibold">{selectedPlanet.nakshatra} (Pada {selectedPlanet.nakshatraPada})</span>, illuminating your{' '}
              <span className="text-cyan-300 font-semibold">House #{selectedPlanet.house}</span>.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

