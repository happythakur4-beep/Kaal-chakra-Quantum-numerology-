import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import {
  MapPin,
  Compass,
  Search,
  Zap,
  Navigation,
  ExternalLink,
  Sparkles,
  Radio,
  Globe2,
  RefreshCw,
  Copy,
  Check,
  Building,
  Telescope,
  Shield,
  Layers,
  Flame,
  Activity,
  Award
} from 'lucide-react';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { locationManager, PRESET_LOCATIONS, UserLocation } from '../../utils/locationManager';

interface MapPlaceItem {
  title: string;
  uri: string;
  address?: string;
  reviewSnippets?: string[];
}

interface TeslaEarthVortexMapsRadarProps {
  userLocation?: { lat: number; lng: number } | null;
}

const PRESET_CATEGORIES = [
  {
    id: 'energy-vortex',
    label: '🌀 3-6-9 Earth Vortices',
    query: 'Top geomagnetic sacred energy vortices on Earth with high Schumann resonance and crystal grid alignments',
    icon: Sparkles,
  },
  {
    id: 'observatories',
    label: '🔭 Ancient & Modern Observatories',
    query: 'Sacred ancient astronomical observatories, solar alignments, and planetariums worldwide with Google Maps locations',
    icon: Telescope,
  },
  {
    id: 'tesla-heritage',
    label: '⚡ Tesla Heritage & High-Voltage Sites',
    query: 'Historical Nikola Tesla laboratories, Wardenclyffe Tower, Colorado Springs site, and Tesla energy landmarks',
    icon: Zap,
  },
  {
    id: 'navagraha-temples',
    label: '🕉️ Planetary & Navagraha Ley-Line Sites',
    query: 'Navagraha temples, sacred Jyotirlingas, and cosmic pilgrimage energy power spots aligned with planetary orbits',
    icon: Compass,
  },
];

const CURATED_VORTEX_NODES = [
  {
    name: 'Sedona Vortex Matrix (Bell Rock & Cathedral Rock)',
    region: 'Arizona, USA',
    coordinates: '34.8697° N, 111.7610° W',
    frequency: '528 Hz (DNA Repair & Heart Chakra)',
    mapsQuery: 'Sedona+Vortex+Bell+Rock+Arizona',
    desc: 'Electromagnetic red sandstone iron-quartz formations producing upward-spiraling vortex fields.',
    type: 'Geomagnetic Node',
  },
  {
    name: 'Great Pyramid of Giza (Planetary Ley-Line Prime)',
    region: 'Giza, Egypt',
    coordinates: '29.9792° N, 31.1342° E',
    frequency: '432 Hz (Universal Cosmic Tuning)',
    mapsQuery: 'Great+Pyramid+of+Giza+Egypt',
    desc: 'Mathematical center of Earth’s landmass, aligned within 3/60ths of a degree to true astronomical north.',
    type: 'Sacred Geometry Core',
  },
  {
    name: 'Ujjain Mahakaleshwar & Dongla Observatory',
    region: 'Madhya Pradesh, India',
    coordinates: '23.1765° N, 75.7885° E',
    frequency: '639 Hz (Harmonic Planetary Alignment)',
    mapsQuery: 'Dongla+Observatory+Ujjain+Madhya+Pradesh',
    desc: 'Ancient Greenwich of Vedic Astronomy where the zero celestial meridian crosses the Tropic of Cancer.',
    type: 'Zero Meridian Node',
  },
  {
    name: 'Tesla Science Center at Wardenclyffe',
    region: 'Shoreham, New York, USA',
    coordinates: '40.9472° N, 72.8992° W',
    frequency: '963 Hz (Tesla Scalar Wave Frequency)',
    mapsQuery: 'Tesla+Science+Center+Wardenclyffe+Shoreham+NY',
    desc: 'Nikola Tesla’s iconic laboratory where the 187-foot magnifying transmitter was built for wireless power.',
    type: 'Tesla Scalar Node',
  },
  {
    name: 'Jantar Mantar UNESCO Astronomical Observatory',
    region: 'Jaipur, Rajasthan, India',
    coordinates: '26.9248° N, 75.8246° E',
    frequency: '396 Hz (Root Equinox Calibration)',
    mapsQuery: 'Jantar+Mantar+Jaipur+Rajasthan',
    desc: 'Nineteen architectural astronomical instruments designed by Maharaja Sawai Jai Singh II for cosmic calculation.',
    type: 'Vedic Observatory',
  },
  {
    name: 'Mount Kailash & Mansarovar (Axis Mundi)',
    region: 'Ngari Prefecture, Tibet',
    coordinates: '31.0697° N, 81.3122° E',
    frequency: '741 Hz (Crown Awakening & Intuition)',
    mapsQuery: 'Mount+Kailash+Tibet',
    desc: 'Revered across four ancient traditions as the primordial diamond needle and axis mundi of the planet.',
    type: 'Cosmic Axis',
  },
];

export const TeslaEarthVortexMapsRadar: React.FC<TeslaEarthVortexMapsRadarProps> = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('energy-vortex');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisText, setAnalysisText] = useState<string>('');
  const [places, setPlaces] = useState<MapPlaceItem[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation>(() => locationManager.getLocation());
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'locating' | 'success' | 'denied'>('idle');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [copiedUri, setCopiedUri] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'radar' | 'directory' | 'about'>('radar');

  // Subscribe to location changes & set initial location
  useEffect(() => {
    const unsub = locationManager.subscribe((loc) => {
      setUserLocation(loc);
      if (locationManager.hasSavedLocation()) {
        setGpsStatus('success');
      }
    });
    return unsub;
  }, []);

  // Initial fetch with default category
  useEffect(() => {
    fetchVortexData('Top geomagnetic sacred energy vortices on Earth with high Schumann resonance and Google Maps locations');
  }, []);

  // Request browser geolocation once and save permanently
  const handleDetectGPS = async () => {
    cosmicAudio.playCyberKeystroke();
    setGpsStatus('locating');
    try {
      const loc = await locationManager.requestGPSOnce(true);
      setUserLocation(loc);
      setGpsStatus('success');
      cosmicAudio.playCyberWarp();
      
      // Auto query near user
      const nearbyPrompt = `Find sacred energy centers, historical planetary observatories, planetariums, and high-resonance spiritual power spots near latitude ${loc.lat.toFixed(4)}, longitude ${loc.lng.toFixed(4)}. Provide real Google Maps locations and coordinates.`;
      setQuery(`Sacred energy spots & observatories near my coordinates (${loc.lat.toFixed(2)}, ${loc.lng.toFixed(2)})`);
      fetchVortexData(nearbyPrompt, loc.lat, loc.lng);
    } catch (err) {
      console.warn('Geolocation denied or failed:', err);
      setGpsStatus('denied');
    }
  };

  const handleSelectPresetLocation = (preset: typeof PRESET_LOCATIONS[0]) => {
    cosmicAudio.playCyberKeystroke();
    const newLoc: UserLocation = {
      lat: preset.lat,
      lng: preset.lng,
      cityName: preset.name,
      source: 'preset',
    };
    locationManager.setLocation(newLoc);
    setUserLocation(newLoc);
    setGpsStatus('success');
    setShowLocationPicker(false);

    const nearbyPrompt = `Find sacred energy centers, historical planetary observatories, planetariums, and high-resonance spiritual power spots near ${preset.name} (lat: ${preset.lat}, lng: ${preset.lng}). Provide real Google Maps locations and coordinates.`;
    setQuery(`Sacred energy spots near ${preset.name}`);
    fetchVortexData(nearbyPrompt, preset.lat, preset.lng);
  };

  const fetchVortexData = async (promptQuery: string, lat?: number, lng?: number) => {
    setIsLoading(true);
    cosmicAudio.playCyberKeystroke();
    try {
      const response = await fetch('/api/ai/tesla-maps-vortices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptQuery,
          latitude: lat ?? userLocation.lat,
          longitude: lng ?? userLocation.lng,
          vortexType: selectedCategory,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAnalysisText(data.analysisMarkdown || '');
        setPlaces(data.mapPlaces || []);
      }
    } catch (err) {
      console.error('Error fetching Maps grounded vortex data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchVortexData(query);
  };

  const handleCategorySelect = (cat: typeof PRESET_CATEGORIES[0]) => {
    setSelectedCategory(cat.id);
    setQuery(cat.query);
    fetchVortexData(cat.query);
  };

  const handleCopyLink = (uri: string) => {
    navigator.clipboard.writeText(uri);
    setCopiedUri(uri);
    cosmicAudio.playCyberKeystroke();
    setTimeout(() => setCopiedUri(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER WITH REAL-TIME RADAR TELEMETRY */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#061126] via-[#040817] to-[#02050e] border border-cyan-500/40 p-5 sm:p-6 shadow-[0_0_35px_rgba(0,243,255,0.18)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-300 flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                <Globe2 className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '12s' }} />
                <span>GOOGLE MAPS GROUNDED RADAR</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[10px] font-mono text-emerald-300">
                gemini-3.5-flash with googleMaps
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-amber-200 to-cyan-400 font-sans tracking-wide">
              3-6-9 Sacred Earth Vortices & Astro-Observatory Radar
            </h2>
            <p className="text-xs sm:text-sm text-cyan-200/70 mt-1 max-w-2xl font-mono">
              Scan global geomagnetic power nodes, ancient Vedic observatories, Tesla high-voltage resonance labs, and sacred planetary temples with live Google Maps place grounding and navigation coordinates.
            </p>
          </div>

          {/* GPS Detector & Persistent Location Badge */}
          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleDetectGPS}
                disabled={gpsStatus === 'locating'}
                title="GPS डिटेक्शन (एक बार अलाउ करें, हमेशा सहेजा रहेगा)"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono font-bold uppercase transition-all duration-300 cursor-pointer shadow-sm ${
                  userLocation.source === 'gps'
                    ? 'bg-emerald-950/60 border-emerald-400/60 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                    : 'bg-cyan-950/60 hover:bg-cyan-900/60 border-cyan-400/40 text-cyan-300 hover:shadow-[0_0_20px_rgba(0,243,255,0.3)]'
                }`}
              >
                <Navigation className={`w-3.5 h-3.5 ${gpsStatus === 'locating' ? 'animate-spin' : ''}`} />
                <span>
                  {gpsStatus === 'locating'
                    ? 'GPS लॉक प्राप्त हो रहा है...'
                    : userLocation.source === 'gps'
                    ? `GPS सहेजा गया: ${userLocation.lat.toFixed(2)}°, ${userLocation.lng.toFixed(2)}°`
                    : 'GPS से स्थान सेट करें'}
                </span>
              </button>

              <button
                onClick={() => setShowLocationPicker(true)}
                className="px-2.5 py-2 rounded-xl bg-black/60 hover:bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold transition-all cursor-pointer"
                title="स्थान बदलें या सूची से चुनें"
              >
                <MapPin className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-[10px] font-mono text-cyan-300/80 flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>सक्रिय स्थान: <strong className="text-amber-300">{userLocation.cityName || `${userLocation.lat.toFixed(2)}°, ${userLocation.lng.toFixed(2)}°`}</strong> (स्थायी सुरक्षित)</span>
            </div>
          </div>
        </div>

        {/* LOCATION SELECTOR MODAL */}
        {showLocationPicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-lg rounded-2xl bg-[#081226] border border-cyan-500/50 p-5 sm:p-6 shadow-[0_0_40px_rgba(0,243,255,0.3)] space-y-4">
              <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <h3 className="font-mono text-sm sm:text-base font-bold text-cyan-100 uppercase">
                    भौगोलिक स्थान चुनें (एक बार सेट करें)
                  </h3>
                </div>
                <button
                  onClick={() => setShowLocationPicker(false)}
                  className="p-1 rounded-lg text-cyan-400 hover:text-white hover:bg-cyan-900/40 font-mono text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-cyan-200/80 font-mono">
                एक बार स्थान चुनने पर यह आपके डिवाइस पर हमेशा के लिए सुरक्षित हो जाएगा। आपसे बार-बार परमिशन नहीं मांगी जाएगी।
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                {PRESET_LOCATIONS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPresetLocation(preset)}
                    className={`p-2.5 rounded-xl border text-left font-mono transition-all flex flex-col justify-between cursor-pointer ${
                      userLocation.cityName === preset.name
                        ? 'bg-cyan-500/25 border-cyan-400 text-cyan-100 shadow-[0_0_15px_rgba(0,243,255,0.25)]'
                        : 'bg-black/50 hover:bg-cyan-950/40 border-cyan-900/50 text-cyan-300/80 hover:text-cyan-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300">{preset.name}</span>
                      <span className="text-[10px] text-cyan-400/60">{preset.lat.toFixed(1)}°, {preset.lng.toFixed(1)}°</span>
                    </div>
                    <span className="text-[10px] text-cyan-400/70 line-clamp-1 mt-0.5">{preset.desc}</span>
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-cyan-500/30 flex items-center justify-between">
                <button
                  onClick={handleDetectGPS}
                  className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-400/60 text-emerald-300 hover:bg-emerald-900/80 font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>GPS से वर्तमान स्थान प्राप्त करें</span>
                </button>
                <button
                  onClick={() => setShowLocationPicker(false)}
                  className="px-3 py-1.5 rounded-xl bg-black/60 border border-cyan-900/50 text-cyan-300 font-mono text-xs hover:bg-cyan-900/40 cursor-pointer"
                >
                  बंद करें
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RADAR SUB-TABS */}
        <div className="relative z-10 flex items-center gap-2 mt-5 pt-3 border-t border-cyan-500/20 text-xs font-mono overflow-x-auto no-scrollbar">
          <button
            onClick={() => {
              cosmicAudio.playCyberKeystroke();
              setActiveTab('radar');
            }}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              activeTab === 'radar'
                ? 'bg-cyan-500/25 border-cyan-400 text-cyan-100 font-bold shadow-[0_0_15px_rgba(0,243,255,0.25)]'
                : 'bg-black/40 border-cyan-900/40 text-cyan-400/70 hover:text-cyan-200'
            }`}
          >
            📡 Live Grounded Radar & Search
          </button>
          <button
            onClick={() => {
              cosmicAudio.playCyberKeystroke();
              setActiveTab('directory');
            }}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              activeTab === 'directory'
                ? 'bg-cyan-500/25 border-cyan-400 text-cyan-100 font-bold shadow-[0_0_15px_rgba(0,243,255,0.25)]'
                : 'bg-black/40 border-cyan-900/40 text-cyan-400/70 hover:text-cyan-200'
            }`}
          >
            🌍 Planetary Vortex Atlas ({CURATED_VORTEX_NODES.length} Curated Nodes)
          </button>
          <button
            onClick={() => {
              cosmicAudio.playCyberKeystroke();
              setActiveTab('about');
            }}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              activeTab === 'about'
                ? 'bg-cyan-500/25 border-cyan-400 text-cyan-100 font-bold shadow-[0_0_15px_rgba(0,243,255,0.25)]'
                : 'bg-black/40 border-cyan-900/40 text-cyan-400/70 hover:text-cyan-200'
            }`}
          >
            ⚡ Tesla 3-6-9 Earth Capacitor Physics
          </button>
        </div>
      </div>

      {/* 1. LIVE RADAR & SEARCH TAB */}
      {activeTab === 'radar' && (
        <div className="space-y-6">
          {/* SEARCH & PRESET CATEGORIES */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#050a18]/90 border border-cyan-500/30 shadow-md space-y-4">
            {/* PRESET FILTER CHIPS */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-cyan-400/70 uppercase mr-1">Preset Scanners:</span>
              {PRESET_CATEGORIES.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                        : 'bg-black/40 hover:bg-cyan-950/40 border-cyan-900/50 text-cyan-300/80 hover:text-cyan-100'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* CUSTOM SEARCH FORM */}
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/60" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask or search any sacred vortex, observatory, temple, or city (e.g., 'Pyramids aligned with stars', 'Temples in Varanasi', 'Observatories near California')..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-cyan-500/40 text-cyan-100 placeholder:text-cyan-500/40 text-xs sm:text-sm font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border border-cyan-400/50 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)] flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="hidden sm:inline">SCANNING...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300 fill-current" />
                    <span>SCAN EARTH GRID</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* LOADING VORTEX ANIMATION */}
          {isLoading && (
            <div className="p-12 rounded-2xl bg-black/50 border border-cyan-500/30 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-cyan-950 border border-cyan-400 shadow-[0_0_30px_rgba(0,243,255,0.4)]">
                <Radio className="w-8 h-8 text-cyan-400 animate-pulse" />
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping" />
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-cyan-200 uppercase tracking-widest">
                  Interrogating Google Maps Grounding & Planetary Ley-Line Satellite Grid...
                </p>
                <p className="font-mono text-xs text-cyan-500/70 mt-1">
                  Querying gemini-3.5-flash with Google Maps tool for real coordinates & verified places
                </p>
              </div>
            </div>
          )}

          {/* GROUNDED GOOGLE MAPS PLACES CARDS (ALWAYS SHOWN WHEN PLACES ARE RETURNED) */}
          {!isLoading && places.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <h3 className="font-mono text-xs sm:text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>Grounding Sources & Verified Google Maps Nodes ({places.length} Locations)</span>
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-400/60 hidden sm:inline">
                  Click any card to launch real navigation & directions
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {places.map((place, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-[#071329] to-[#040917] border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300">
                          NODE #{idx + 1}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-[10px] font-mono font-bold text-amber-300 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>3-6-9 VORTEX</span>
                        </span>
                      </div>

                      <h4 className="font-sans font-bold text-sm sm:text-base text-cyan-100 group-hover:text-white transition-colors leading-snug">
                        {place.title}
                      </h4>

                      {place.address && (
                        <p className="text-[11px] font-mono text-cyan-400/80 mt-1 flex items-start gap-1">
                          <MapPin className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{place.address}</span>
                        </p>
                      )}

                      {place.reviewSnippets && place.reviewSnippets.length > 0 && (
                        <div className="mt-2.5 p-2 rounded-lg bg-black/40 border border-cyan-900/40 text-[11px] font-mono text-cyan-300/80 italic line-clamp-3">
                          "{place.reviewSnippets[0]}"
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-cyan-500/20">
                      <a
                        href={place.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => cosmicAudio.playCyberKeystroke()}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 hover:border-cyan-400 text-cyan-200 text-xs font-mono font-bold transition-all shadow-[0_0_10px_rgba(0,243,255,0.15)]"
                      >
                        <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                        <span>OPEN IN GOOGLE MAPS</span>
                        <ExternalLink className="w-3 h-3 text-cyan-400/80 ml-0.5" />
                      </a>

                      <button
                        onClick={() => handleCopyLink(place.uri)}
                        className="p-1.5 rounded-lg bg-black/50 hover:bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 hover:text-cyan-200 transition-colors"
                        title="Copy Maps Link"
                      >
                        {copiedUri === place.uri ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* DETAILED AI ANALYSIS & LEY-LINE INTEL */}
          {!isLoading && analysisText && (
            <div className="p-5 sm:p-6 rounded-2xl bg-[#040817]/95 border border-cyan-500/30 shadow-[0_0_25px_rgba(0,243,255,0.1)] space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-cyan-500/20">
                <Zap className="w-4 h-4 text-amber-400 fill-current" />
                <h3 className="font-mono text-xs sm:text-sm font-bold text-cyan-300 uppercase tracking-wider">
                  Planetary Ley-Line & Sacred Vortex Intelligence Dossier
                </h3>
              </div>

              <div className="prose prose-invert prose-cyan max-w-none text-xs sm:text-sm font-mono leading-relaxed text-cyan-100/90 space-y-3">
                <ReactMarkdown>{analysisText}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. CURATED PLANETARY VORTEX ATLAS TAB */}
      {activeTab === 'directory' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-black/40 border border-cyan-500/20 flex items-center justify-between gap-3 text-xs font-mono">
            <span className="text-cyan-300">
              The 6 Prime 3-6-9 Dodecahedral Grid Anchor Points of Earth
            </span>
            <span className="text-cyan-500/80 text-[11px]">
              Direct one-click Google Maps exploration
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CURATED_VORTEX_NODES.map((node, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-gradient-to-br from-[#061126] to-[#02050f] border border-cyan-500/30 hover:border-cyan-400/80 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,243,255,0.25)] flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-300">
                      {node.type}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-[10px] font-mono font-bold text-amber-300 flex items-center gap-1">
                      <Radio className="w-2.5 h-2.5 text-amber-400 animate-pulse" />
                      <span>{node.frequency}</span>
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-base text-cyan-100 group-hover:text-white transition-colors">
                    {node.name}
                  </h3>

                  <div className="flex items-center gap-1 text-xs font-mono text-cyan-400/80">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{node.region} • {node.coordinates}</span>
                  </div>

                  <p className="text-xs font-mono text-cyan-200/70 leading-relaxed pt-1">
                    {node.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-cyan-500/20 flex gap-2">
                  <a
                    href={`https://maps.google.com/?q=${node.mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => cosmicAudio.playCyberKeystroke()}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 hover:border-cyan-400 text-cyan-200 text-xs font-mono font-bold transition-all shadow-[0_0_12px_rgba(0,243,255,0.15)]"
                  >
                    <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                    <span>NAVIGATE IN MAPS</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400/80 ml-0.5" />
                  </a>

                  <button
                    onClick={() => {
                      setQuery(`Deep dive into the 3-6-9 resonance, history, and sacred alignments of ${node.name} in ${node.region}`);
                      setActiveTab('radar');
                      fetchVortexData(`Deep dive into the 3-6-9 resonance, history, and sacred alignments of ${node.name} in ${node.region}`);
                    }}
                    className="px-3 py-2 rounded-xl bg-black/60 hover:bg-cyan-950 border border-cyan-700/40 text-amber-300 text-xs font-mono font-bold transition-colors"
                    title="Deep AI Scan"
                  >
                    AI SCAN
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. TESLA 3-6-9 EARTH PHYSICS TAB */}
      {activeTab === 'about' && (
        <div className="p-6 rounded-2xl bg-[#040816] border border-cyan-500/30 space-y-4 font-mono text-xs sm:text-sm text-cyan-200/90 leading-relaxed">
          <div className="flex items-center gap-2 pb-2 border-b border-cyan-500/20">
            <Zap className="w-5 h-5 text-amber-400 fill-current" />
            <h3 className="font-bold text-base text-cyan-100 uppercase tracking-wide">
              The Physics of Earth as a 3-6-9 Spherical Capacitor
            </h3>
          </div>

          <p>
            Nikola Tesla observed that the Earth and its upper ionosphere constitute a gigantic electrical capacitor. By exciting the terrestrial globe at its natural resonant harmonic (the <strong>Schumann Resonance 7.83 Hz</strong> and its Solfeggio multiples <strong>396 Hz, 432 Hz, 528 Hz, 963 Hz</strong>), energy could be transmitted without wires across planetary distances.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5">
              <span className="font-bold text-amber-300 font-mono text-sm">3 — The Electric Trinity</span>
              <p className="text-xs text-cyan-200/80">
                The three fundamental polarities of terrestrial current: Atmospheric Ionosphere (+), Telluric Earth Core (-), and the Dielectric Stratum.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5">
              <span className="font-bold text-amber-300 font-mono text-sm">6 — Hexagonal Ley Grid</span>
              <p className="text-xs text-cyan-200/80">
                The geometric dodecahedral grid nodes where geomagnetic field lines intersect, creating natural high-frequency bio-rejuvenation zones.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5">
              <span className="font-bold text-amber-300 font-mono text-sm">9 — The Singularity / Void</span>
              <p className="text-xs text-cyan-200/80">
                The zero-point etheric pulse that governs all planetary vortex motion, connecting local planetary coordinates to the Galactic Center.
              </p>
            </div>
          </div>

          <p>
            Ancient civilizations encoded these exact mathematical coordinates into stone monuments like the <strong>Great Pyramid of Giza</strong>, <strong>Jantar Mantar</strong>, and <strong>Ujjain Dongla Zero Meridian</strong>. When meditating or aligning personal chakras at these vortex points, biological cellular coherence is magnified tenfold.
          </p>
        </div>
      )}
    </div>
  );
};
