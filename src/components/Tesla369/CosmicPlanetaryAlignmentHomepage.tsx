import React, { useRef, useEffect, useState, useMemo } from 'react';
import { CelestialBodyData } from '../../types';
import { CELESTIAL_BODIES_DATA } from '../../data/teslaPortalData';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { motion, AnimatePresence } from 'motion/react';
import cosmicAlignmentImage from '../../assets/images/cosmic_alignment_exact_1787510852824.jpg';
import { ZodiacConstellationOverlay } from './ZodiacConstellationOverlay';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Eye, 
  Orbit, 
  Maximize2,
  Minimize2,
  Layers,
  Activity,
  Compass,
  Radio,
  Share2,
  Play,
  Pause,
  CheckCircle2,
  Zap,
  Info
} from 'lucide-react';

interface CosmicPlanetaryAlignmentHomepageProps {
  onSelectPlanet: (planet: CelestialBodyData) => void;
  onOpenDossier: (planet: CelestialBodyData) => void;
  onOpenTab?: (tab: string) => void;
}

interface AlignmentNode {
  id: string;
  name: string;
  sanskrit: string;
  solfeggioHz: number;
  solfeggioName: string;
  chakra: string;
  teslaNumber: 3 | 6 | 9;
  topPercent: number; // percentage down the vertical axis (0 - 100%)
  leftPercent: number; // percentage across (approx 45% - 47%)
  radiusPx: number;
  bodyData: CelestialBodyData;
}

export const CosmicPlanetaryAlignmentHomepage: React.FC<CosmicPlanetaryAlignmentHomepageProps> = ({
  onSelectPlanet,
  onOpenDossier,
  onOpenTab,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>('earth');
  const [hoveredPlanetId, setHoveredPlanetId] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeFrequencyHz, setActiveFrequencyHz] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOverlays, setShowOverlays] = useState(true);
  const [showConstellations, setShowConstellations] = useState(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [quickInspectBody, setQuickInspectBody] = useState<CelestialBodyData | null>(null);

  // Sync cosmic audio state
  useEffect(() => {
    const unsub = cosmicAudio.subscribe((playing) => {
      setIsPlayingAudio(playing);
    });
    return () => unsub();
  }, []);

  const handleToggleAudio = () => {
    cosmicAudio.playCyberKeystroke();
    if (isPlayingAudio) {
      cosmicAudio.stopSoundscape();
    } else {
      cosmicAudio.startSoundscape();
    }
  };

  const handlePlayPlanetTone = (body: CelestialBodyData) => {
    cosmicAudio.playCyberScan();
    setActiveFrequencyHz(body.vibrationalFrequencyHz);
    cosmicAudio.playFrequency(body.vibrationalFrequencyHz);
  };

  // Find Planet Data mapped directly to the vertical alignment positions
  const alignmentNodes: AlignmentNode[] = useMemo(() => {
    const getBody = (id: string) => 
      CELESTIAL_BODIES_DATA.find(b => b.id.toLowerCase() === id.toLowerCase()) || CELESTIAL_BODIES_DATA[0];

    return [
      {
        id: 'mercury',
        name: 'Mercury',
        sanskrit: 'बुध (Budha)',
        solfeggioHz: 141.27,
        solfeggioName: '417Hz Mental Clarity',
        chakra: 'Vishuddha (Throat)',
        teslaNumber: 3,
        topPercent: 8.5,
        leftPercent: 46.5,
        radiusPx: 16,
        bodyData: getBody('mercury'),
      },
      {
        id: 'venus',
        name: 'Venus',
        sanskrit: 'शुक्र (Shukra)',
        solfeggioHz: 221.23,
        solfeggioName: '639Hz Harmonic Love',
        chakra: 'Anahata (Heart)',
        teslaNumber: 6,
        topPercent: 16.5,
        leftPercent: 46.5,
        radiusPx: 20,
        bodyData: getBody('venus'),
      },
      {
        id: 'earth',
        name: 'Earth',
        sanskrit: 'पृथ्वी / भूदेवी (Prithvi)',
        solfeggioHz: 194.18,
        solfeggioName: '528Hz DNA & Solfeggio Matrix',
        chakra: 'Muladhara & Gaia Core',
        teslaNumber: 9,
        topPercent: 25.0,
        leftPercent: 46.5,
        radiusPx: 22,
        bodyData: getBody('earth'),
      },
      {
        id: 'mars',
        name: 'Mars',
        sanskrit: 'मंगल (Mangala)',
        solfeggioHz: 144.72,
        solfeggioName: '396Hz Vital Willpower',
        chakra: 'Manipura (Solar Plexus)',
        teslaNumber: 9,
        topPercent: 33.5,
        leftPercent: 46.5,
        radiusPx: 18,
        bodyData: getBody('mars'),
      },
      {
        id: 'jupiter',
        name: 'Jupiter',
        sanskrit: 'बृहस्पति / गुरु (Brihaspati)',
        solfeggioHz: 183.58,
        solfeggioName: '852Hz Spiritual Wisdom',
        chakra: 'Ajna (Third Eye)',
        teslaNumber: 3,
        topPercent: 47.5,
        leftPercent: 46.5,
        radiusPx: 38,
        bodyData: getBody('jupiter'),
      },
      {
        id: 'saturn',
        name: 'Saturn',
        sanskrit: 'शनि (Shani)',
        solfeggioHz: 147.85,
        solfeggioName: '741Hz Divine Order & Karma',
        chakra: 'Sahasrara (Crown Master)',
        teslaNumber: 6,
        topPercent: 61.5,
        leftPercent: 46.5,
        radiusPx: 42,
        bodyData: getBody('saturn'),
      },
      {
        id: 'uranus',
        name: 'Uranus',
        sanskrit: 'वरुण (Varuna)',
        solfeggioHz: 207.36,
        solfeggioName: '963Hz Transcendent Flash',
        chakra: 'Crown & Cosmic Antennas',
        teslaNumber: 9,
        topPercent: 74.0,
        leftPercent: 46.5,
        radiusPx: 25,
        bodyData: getBody('uranus'),
      },
      {
        id: 'neptune',
        name: 'Neptune',
        sanskrit: 'समुद्र / नेपच्यून (Soma Ocean)',
        solfeggioHz: 211.44,
        solfeggioName: '528Hz Mystical Intuition',
        chakra: 'Ajna Intuitive Void',
        teslaNumber: 3,
        topPercent: 84.5,
        leftPercent: 46.5,
        radiusPx: 25,
        bodyData: getBody('neptune'),
      },
      {
        id: 'pluto',
        name: 'Pluto',
        sanskrit: 'यम / प्लूटो (Yamaraja)',
        solfeggioHz: 140.25,
        solfeggioName: '963Hz Cosmic Transmutation',
        chakra: 'Muladhara Gateway',
        teslaNumber: 9,
        topPercent: 93.5,
        leftPercent: 46.5,
        radiusPx: 14,
        bodyData: getBody('pluto'),
      }
    ];
  }, []);

  const activeBody = useMemo(() => {
    return alignmentNodes.find(n => n.id === selectedPlanetId)?.bodyData || alignmentNodes[2].bodyData;
  }, [alignmentNodes, selectedPlanetId]);

  const getZodiacSigns = (planetId: string) => {
    switch (planetId.toLowerCase()) {
      case 'mercury': return '♊ Gemini (मिथुन) & ♍ Virgo (कन्या)';
      case 'venus': return '♉ Taurus (वृषभ) & ♎ Libra (तुला)';
      case 'earth': return '♋ Cancer (कर्क) & ♌ Leo (सिंह) [Solar-Gaia Axis]';
      case 'mars': return '♈ Aries (मेष) & ♏ Scorpio (वृश्चिक)';
      case 'jupiter': return '♐ Sagittarius (धनु) & ♓ Pisces (मीन)';
      case 'saturn': return '♑ Capricorn (मकर) & ♒ Aquarius (कुम्भ)';
      case 'uranus': return '♒ Aquarius (वरुण कुम्भ)';
      case 'neptune': return '♓ Pisces (समुद्र मीन)';
      case 'pluto': return '♏ Scorpio & ⛎ Ophiuchus (यमराज)';
      default: return '🌌 Cosmic Alignment Matrix';
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-[#02050e] rounded-2xl border border-cyan-500/30 shadow-[0_0_50px_rgba(0,243,255,0.15)] select-none font-sans transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none h-screen' : 'min-h-[920px] h-[calc(100vh-140px)] max-h-[1200px]'
      }`}
    >
      {/* 1. PHOTOREALISTIC EXACT IMAGE RENDERING */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#02050e]">
        {/* Background glow matching the nebula tones */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#02050e] via-[#041122] to-[#02050e] opacity-80" />
        
        {/* The Exact Image Container */}
        <div 
          className="relative h-full w-full max-w-[720px] mx-auto flex items-center justify-center transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* 1. FAINT INTERCONNECTED ZODIAC CONSTELLATIONS LAYER (Behind Planets) */}
          {showConstellations && (
            <ZodiacConstellationOverlay
              selectedPlanetId={selectedPlanetId}
              hoveredPlanetId={hoveredPlanetId}
              opacity={0.55}
              showLabels={true}
            />
          )}

          <img
            src={cosmicAlignmentImage}
            alt="Exact Photorealistic Cosmic Planetary Alignment"
            referrerPolicy="no-referrer"
            className="h-full w-auto max-w-full object-contain drop-shadow-[0_0_35px_rgba(0,243,255,0.25)] pointer-events-none select-none relative z-0"
          />

          {/* 2. INTERACTIVE HOTSPOT LAYER (Overlaid directly on the exact image) */}
          {showOverlays && (
            <div className="absolute inset-0 pointer-events-auto z-20">
              {alignmentNodes.map((node) => {
                const isSelected = selectedPlanetId === node.id;
                const isHovered = hoveredPlanetId === node.id;

                return (
                  <div
                    key={node.id}
                    style={{
                      top: `${node.topPercent}%`,
                      left: `${node.leftPercent}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="absolute group cursor-pointer"
                    onMouseEnter={() => {
                      setHoveredPlanetId(node.id);
                      cosmicAudio.playCyberKeystroke();
                    }}
                    onMouseLeave={() => setHoveredPlanetId(null)}
                    onClick={() => {
                      setSelectedPlanetId(node.id);
                      setQuickInspectBody(node.bodyData);
                      onSelectPlanet(node.bodyData);
                      handlePlayPlanetTone(node.bodyData);
                    }}
                  >
                    {/* Interactive Glowing Target Node */}
                    <div 
                      className={`relative rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected 
                          ? 'ring-4 ring-amber-400/90 shadow-[0_0_25px_rgba(251,191,36,0.9)] scale-110' 
                          : isHovered 
                            ? 'ring-2 ring-cyan-400/80 shadow-[0_0_20px_rgba(0,243,255,0.7)] scale-105' 
                            : 'ring-1 ring-white/20 hover:ring-cyan-400/60'
                      }`}
                      style={{
                        width: `${node.radiusPx * 2.4}px`,
                        height: `${node.radiusPx * 2.4}px`,
                      }}
                    >
                      {/* Pulse Wave on Selected */}
                      {isSelected && (
                        <span className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping" />
                      )}

                      {/* Harmonic Tesla Number Badge (3, 6, 9) */}
                      <span className={`text-[10px] font-mono font-black transition-opacity ${
                        isSelected || isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      } ${node.teslaNumber === 9 ? 'text-amber-300' : node.teslaNumber === 6 ? 'text-cyan-300' : 'text-emerald-300'}`}>
                        {node.teslaNumber}
                      </span>
                    </div>

                    {/* Interactive Floating Hover / Selection Capsule */}
                    <AnimatePresence>
                      {(isHovered || isSelected) && (
                        <motion.div
                          initial={{ opacity: 0, x: 20, scale: 0.9 }}
                          animate={{ opacity: 1, x: 36, scale: 1 }}
                          exit={{ opacity: 0, x: 20, scale: 0.9 }}
                          className="absolute left-full top-1/2 -translate-y-1/2 z-30 pointer-events-auto whitespace-nowrap bg-black/90 backdrop-blur-xl border border-cyan-500/50 p-2.5 rounded-xl shadow-[0_0_25px_rgba(0,243,255,0.35)] flex items-center gap-3 font-mono"
                        >
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold text-white tracking-wider">{node.name}</span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 border border-amber-400/50 text-amber-300 font-bold">
                                {node.teslaNumber}-HARMONIC
                              </span>
                            </div>
                            <div className="text-[11px] text-cyan-300 flex items-center gap-1">
                              <span>{node.sanskrit}</span>
                              <span className="text-white/40">•</span>
                              <span className="text-amber-400 font-bold">{node.solfeggioHz} Hz</span>
                            </div>
                            <div className="text-[10px] text-emerald-300/90 flex items-center gap-1 mt-0.5">
                              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                              <span>Zodiac: {getZodiacSigns(node.id)}</span>
                            </div>
                          </div>

                          {/* Quick Dossier Open Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectPlanet(node.bodyData);
                              onOpenDossier(node.bodyData);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-[11px] font-bold uppercase shadow-[0_0_10px_rgba(0,243,255,0.4)] flex items-center gap-1 transition-all"
                          >
                            <Eye className="w-3 h-3" />
                            <span>DOSSIER</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 3. TOP AMBIENT STATUS & CONTROLS BAR */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        {/* Left Badge: Alignment Status */}
        <div className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-xl border border-cyan-500/40 font-mono text-xs text-cyan-200 shadow-[0_0_20px_rgba(0,243,255,0.25)]">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <div>
            <span className="font-bold tracking-wider text-white">PHOTOREALISTIC 3-6-9 ALIGNMENT</span>
            <span className="text-[10px] text-cyan-400 block sm:inline sm:ml-2">100% FAITHFUL REPRODUCTION</span>
          </div>
        </div>

        {/* Right Tools: Toggle Hotspots, Constellations, Zoom, Audio, Fullscreen */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Toggle Interactive Overlay Markers */}
          <button
            onClick={() => {
              cosmicAudio.playCyberKeystroke();
              setShowOverlays(!showOverlays);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs font-bold backdrop-blur-xl border transition-all ${
              showOverlays 
                ? 'bg-cyan-500/25 border-cyan-400/70 text-cyan-100 shadow-[0_0_15px_rgba(0,243,255,0.3)]' 
                : 'bg-black/70 border-white/20 text-white/70 hover:text-white'
            }`}
            title="Toggle Resonance Hotspot Markers"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{showOverlays ? 'HOTSPOTS: ON' : 'HOTSPOTS: OFF'}</span>
          </button>

          {/* Toggle Zodiac Constellation Lines */}
          <button
            onClick={() => {
              cosmicAudio.playCyberKeystroke();
              setShowConstellations(!showConstellations);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs font-bold backdrop-blur-xl border transition-all ${
              showConstellations 
                ? 'bg-amber-500/25 border-amber-400/70 text-amber-100 shadow-[0_0_15px_rgba(251,191,36,0.3)]' 
                : 'bg-black/70 border-white/20 text-white/70 hover:text-white'
            }`}
            title="Toggle Zodiac Constellation Star Lines"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">{showConstellations ? 'CONSTELLATIONS: ON' : 'CONSTELLATIONS: OFF'}</span>
          </button>

          {/* Zoom Toggle */}
          <button
            onClick={() => {
              cosmicAudio.playCyberKeystroke();
              setZoomLevel(prev => (prev === 1 ? 1.25 : prev === 1.25 ? 1.5 : 1));
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/70 hover:bg-black/90 border border-cyan-800/60 text-cyan-300 font-mono text-xs font-bold backdrop-blur-xl transition-all"
            title="Cycle Zoom Level"
          >
            <span>{zoomLevel}x ZOOM</span>
          </button>

          {/* Harmonic Audio Drone */}
          <button
            onClick={handleToggleAudio}
            className={`p-2 rounded-xl border backdrop-blur-xl font-mono text-xs transition-all ${
              isPlayingAudio
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                : 'bg-black/70 border-cyan-800/40 text-cyan-400 hover:text-cyan-200'
            }`}
            title="Toggle 432Hz/528Hz Harmonic Drone"
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Fullscreen Expansion */}
          <button
            onClick={() => {
              cosmicAudio.playCyberKeystroke();
              setIsFullscreen(!isFullscreen);
            }}
            className="p-2 rounded-xl bg-black/70 hover:bg-black/90 border border-cyan-800/60 text-cyan-300 font-mono text-xs backdrop-blur-xl transition-all"
            title="Toggle Fullscreen Immersion"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 4. ACTIVE PLANET MINI-DOCK (Bottom Left Quick Summary) */}
      <div className="absolute bottom-4 left-4 pointer-events-auto z-20 hidden sm:block max-w-sm">
        <motion.div 
          key={activeBody.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-cyan-500/40 shadow-[0_0_30px_rgba(0,243,255,0.25)] font-mono"
        >
          <div className="flex items-center justify-between gap-2 border-b border-cyan-500/20 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full shadow-[0_0_8px]"
                style={{ backgroundColor: activeBody.color, boxShadow: `0 0 10px ${activeBody.color}` }}
              />
              <span className="font-bold text-sm text-white">{activeBody.name}</span>
            </div>
            <span className="text-xs text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/15 border border-amber-400/40">
              TESLA [{activeBody.teslaHarmonicNumber}]
            </span>
          </div>

          <p className="text-xs text-cyan-200/90 leading-relaxed mb-2.5 line-clamp-2">
            {activeBody.description}
          </p>

          <div className="mb-3 px-2.5 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-[11px] text-amber-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <div className="truncate">
              <span className="text-cyan-400 font-bold">RULING SIGNS: </span>
              <span>{getZodiacSigns(activeBody.id)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePlayPlanetTone(activeBody)}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all"
            >
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              <span>PLAY {activeBody.vibrationalFrequencyHz}Hz</span>
            </button>
            <button
              onClick={() => {
                onSelectPlanet(activeBody);
                onOpenDossier(activeBody);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 text-xs font-black uppercase transition-all shadow-[0_0_12px_rgba(251,191,36,0.3)]"
            >
              <Eye className="w-3.5 h-3.5 text-slate-950" />
              <span>DEEP DOSSIER</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* 5. BOTTOM INSTRUCTION PILL */}
      <div className="absolute bottom-4 right-4 pointer-events-auto z-20 flex items-center gap-2">
        {onOpenTab && (
          <button
            onClick={() => {
              cosmicAudio.playCyberKeystroke();
              onOpenTab('sudarshan');
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-mono text-xs font-black uppercase shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>SUDARSHANA & MANTRA MATRIX</span>
          </button>
        )}
        <button
          onClick={() => {
            onSelectPlanet(activeBody);
            onOpenDossier(activeBody);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-bold uppercase shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all"
        >
          <Eye className="w-4 h-4 text-cyan-200" />
          <span>OPEN FULL 3-6-9 DOSSIER</span>
        </button>
      </div>

    </div>
  );
};
