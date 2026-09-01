import React, { useRef, useEffect, useState, useMemo } from 'react';
import { CelestialBodyData } from '../../types';
import { CELESTIAL_BODIES_DATA } from '../../data/teslaPortalData';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { drawHighFidelityPlanet } from '../../utils/highQualityPlanetRenderer';
import { motion, AnimatePresence } from 'motion/react';
import cosmicAlignmentImage from '../../assets/images/cosmic_alignment_exact_1787510852824.jpg';
import { ZodiacConstellationOverlay } from './ZodiacConstellationOverlay';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Eye, 
  Orbit, 
  Layers, 
  Radio, 
  Play, 
  Pause, 
  RotateCw,
  Zap, 
  Sliders,
  Compass,
  Maximize2,
  Minimize2,
  Contrast
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
  driftDuration?: number;
  driftDelay?: number;
  driftDistancePx?: number;
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
  const [pulseClickEvent, setPulseClickEvent] = useState<{ id: string; key: number } | null>(null);
  
  // Live Moving Planets & Planetary Revolution State
  const [isLiveOrbitMoving, setIsLiveOrbitMoving] = useState<boolean>(true);
  const [motionSpeed, setMotionSpeed] = useState<number>(1);
  const [motionPattern, setMotionPattern] = useState<'flow' | 'vortex' | 'harmonic'>('flow');
  const [showOrbitalTrails, setShowOrbitalTrails] = useState<boolean>(true);
  const [planetOffsets, setPlanetOffsets] = useState<{ [id: string]: { x: number; y: number } }>({});

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    try {
      return localStorage.getItem('alignment_high_contrast') === 'true';
    } catch {
      return false;
    }
  });

  const toggleHighContrast = () => {
    cosmicAudio.playCyberKeystroke();
    setHighContrast((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('alignment_high_contrast', String(next));
      } catch {}
      return next;
    });
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
        driftDuration: 5.8,
        driftDelay: 0.2,
        driftDistancePx: 3,
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
        driftDuration: 7.2,
        driftDelay: 1.5,
        driftDistancePx: 3.5,
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
        driftDuration: 8.6,
        driftDelay: 2.2,
        driftDistancePx: 4,
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
        driftDuration: 6.5,
        driftDelay: 0.8,
        driftDistancePx: 3.5,
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
        driftDuration: 11.4,
        driftDelay: 3.1,
        driftDistancePx: 5,
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
        driftDuration: 12.8,
        driftDelay: 1.8,
        driftDistancePx: 5,
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
        driftDuration: 9.6,
        driftDelay: 2.6,
        driftDistancePx: 4,
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
        driftDuration: 10.5,
        driftDelay: 0.6,
        driftDistancePx: 4.5,
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
        driftDuration: 13.5,
        driftDelay: 4.0,
        driftDistancePx: 3,
      }
    ];
  }, []);

  const activeBody = useMemo(() => {
    return alignmentNodes.find(n => n.id === selectedPlanetId)?.bodyData || alignmentNodes[2].bodyData;
  }, [alignmentNodes, selectedPlanetId]);

  // Live Planetary Motion Engine
  useEffect(() => {
    let animId: number;
    let startTime = performance.now();

    const updateMotion = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000; // in seconds

      if (isLiveOrbitMoving) {
        const newOffsets: { [id: string]: { x: number; y: number } } = {};
        
        alignmentNodes.forEach((node, idx) => {
          const t = elapsed * motionSpeed;
          const phase = idx * 0.85 + (node.teslaNumber * 0.4);

          let ox = 0;
          let oy = 0;

          if (motionPattern === 'flow') {
            // Sweeping Elliptical Celestial Flow
            const speedFactor = 0.65 + (9 - idx) * 0.12;
            const xAmp = 22 + (idx % 4) * 6;
            const yAmp = 8 + (idx % 3) * 3;
            ox = Math.sin(t * speedFactor + phase) * xAmp;
            oy = Math.cos(t * speedFactor * 0.7 + phase) * yAmp;
          } else if (motionPattern === 'vortex') {
            // 3-6-9 Tesla Vortex & Lemniscate Revolution
            const harmonicMultiplier = node.teslaNumber === 9 ? 1.6 : node.teslaNumber === 6 ? 1.2 : 0.8;
            const xAmp = node.teslaNumber === 9 ? 28 : node.teslaNumber === 6 ? 20 : 14;
            const yAmp = node.teslaNumber === 9 ? 12 : 8;
            ox = Math.sin(t * harmonicMultiplier + phase) * xAmp;
            oy = Math.sin(2 * (t * harmonicMultiplier + phase)) * yAmp;
          } else {
            // Harmonic Resonance Breathing
            const breatheFactor = 0.7;
            ox = Math.sin(t * breatheFactor + phase) * 12;
            oy = Math.cos(t * breatheFactor * 1.2 + phase) * 6;
          }

          newOffsets[node.id] = { x: ox, y: oy };
        });

        setPlanetOffsets(newOffsets);
      } else {
        // Smoothly return to center
        setPlanetOffsets({});
      }

      animId = requestAnimationFrame(updateMotion);
    };

    animId = requestAnimationFrame(updateMotion);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isLiveOrbitMoving, motionSpeed, motionPattern, alignmentNodes]);

  // Sync cosmic audio state
  useEffect(() => {
    const unsub = cosmicAudio.subscribe((playing) => {
      setIsPlayingAudio(playing);
    });
    return () => {
      unsub();
    };
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
              opacity={highContrast ? 0.85 : 0.55}
              showLabels={true}
              highContrast={highContrast}
            />
          )}

          {/* 1.5 DYNAMIC ORBITAL TRAILS CANVAS LAYER */}
          {showOrbitalTrails && isLiveOrbitMoving && (
            <LiveOrbitalTrailCanvas
              alignmentNodes={alignmentNodes}
              planetOffsets={planetOffsets}
              motionPattern={motionPattern}
              isLiveOrbitMoving={isLiveOrbitMoving}
            />
          )}

          <img
            src={cosmicAlignmentImage}
            alt="Exact Photorealistic Cosmic Planetary Alignment"
            referrerPolicy="no-referrer"
            className="h-full w-auto max-w-full object-contain drop-shadow-[0_0_35px_rgba(0,243,255,0.25)] pointer-events-none select-none relative z-0"
          />

          {/* 2. INTERACTIVE HOTSPOT LAYER (Overlaid directly on the exact image with Live Orbital Motion) */}
          {showOverlays && (
            <div className="absolute inset-0 pointer-events-auto z-20">
              {alignmentNodes.map((node, index) => {
                const isSelected = selectedPlanetId === node.id;
                const isHovered = hoveredPlanetId === node.id;
                const offset = isLiveOrbitMoving ? (planetOffsets[node.id] || { x: 0, y: 0 }) : { x: 0, y: 0 };

                return (
                  <div
                    key={node.id}
                    style={{
                      position: 'absolute',
                      top: `${node.topPercent}%`,
                      left: `${node.leftPercent}%`,
                      transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
                      transition: isLiveOrbitMoving ? 'none' : 'transform 0.5s ease-out',
                    }}
                    className="group cursor-pointer z-20"
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
                      setPulseClickEvent({ id: node.id, key: Date.now() });
                    }}
                  >
                    {/* Subtle Living Celestial Orbital Drift & Pulsating Axial Rotation Wrapper */}
                    <div
                      className="relative animate-orbital-drift"
                      style={{
                        ['--drift-duration' as string]: `${node.driftDuration || 8}s`,
                        ['--drift-delay' as string]: `${node.driftDelay || 0}s`,
                        ['--drift-distance' as string]: `${node.driftDistancePx || 4}px`,
                        ['--drift-rotation' as string]: `${(index % 2 === 0 ? 1 : -1) * (2.5 + (index % 4) * 1.2)}deg`,
                        ['--pulse-scale-max' as string]: `${1.06 + (index % 3) * 0.02}`,
                        ['--pulse-scale-mid' as string]: `${1.03 + (index % 3) * 0.01}`,
                        ['--pulse-duration' as string]: `${(node.driftDuration || 8) * 0.75}s`,
                        ['--pulse-delay' as string]: `${(node.driftDelay || 0) * 0.5}s`,
                      } as React.CSSProperties}
                    >
                      {/* Radiating Quantum Ripple Pulse Effects on Click */}
                      <AnimatePresence>
                        {pulseClickEvent?.id === node.id && (
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-30">
                            {/* Primary Luminous Shockwave */}
                            <motion.span
                              key={`quantum-ring-1-${pulseClickEvent.key}`}
                              initial={{ opacity: 1, scale: 0.9, borderWidth: '4px' }}
                              animate={{ opacity: 0, scale: 3.8, borderWidth: '1.5px' }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute rounded-full border-cyan-300 shadow-[0_0_30px_rgba(0,243,255,1)]"
                              style={{
                                width: `${node.radiusPx * 2.8}px`,
                                height: `${node.radiusPx * 2.8}px`,
                              }}
                            />
                            {/* Secondary Golden Harmonic Shockwave */}
                            <motion.span
                              key={`quantum-ring-2-${pulseClickEvent.key}`}
                              initial={{ opacity: 1, scale: 0.7, borderWidth: '3px' }}
                              animate={{ opacity: 0, scale: 5.2, borderWidth: '1px' }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute rounded-full border-amber-300 shadow-[0_0_35px_rgba(251,191,36,1)]"
                              style={{
                                width: `${node.radiusPx * 2.8}px`,
                                height: `${node.radiusPx * 2.8}px`,
                              }}
                            />
                            {/* Quantum Energy Core Flash */}
                            <motion.span
                              key={`quantum-flash-${pulseClickEvent.key}`}
                              initial={{ opacity: 0.9, scale: 0.5 }}
                              animate={{ opacity: 0, scale: 2.5 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.6, ease: 'easeOut' }}
                              className="absolute rounded-full bg-gradient-to-r from-cyan-300 to-amber-300 blur-md"
                              style={{
                                width: `${node.radiusPx * 2.8}px`,
                                height: `${node.radiusPx * 2.8}px`,
                              }}
                            />
                          </div>
                        )}
                      </AnimatePresence>

                      {/* Interactive Glowing Target Node with Rotating Mini Planet Sphere */}
                      <motion.div 
                        animate={
                          pulseClickEvent?.id === node.id
                            ? {
                                scale: [1, 1.25, isSelected ? (highContrast ? 1.15 : 1.1) : 1],
                                boxShadow: [
                                  isSelected
                                    ? (highContrast ? '0 0 30px rgba(251,191,36,1)' : '0 0 25px rgba(251,191,36,0.9)')
                                    : '0 0 0px rgba(0,243,255,0)',
                                  '0 0 50px rgba(0,243,255,1), 0 0 80px rgba(251,191,36,0.95)',
                                  isSelected
                                    ? (highContrast ? '0 0 30px rgba(251,191,36,1)' : '0 0 25px rgba(251,191,36,0.9)')
                                    : '0 0 0px rgba(0,243,255,0)',
                                ]
                              }
                            : {}
                        }
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                        className={`relative rounded-full flex items-center justify-center transition-all duration-300 ${
                          isSelected 
                            ? (highContrast ? 'ring-4 ring-amber-300 shadow-[0_0_30px_rgba(251,191,36,1)] scale-115' : 'ring-4 ring-amber-400/90 shadow-[0_0_25px_rgba(251,191,36,0.9)] scale-110') 
                            : isHovered 
                              ? (highContrast ? 'ring-3 ring-cyan-300 shadow-[0_0_25px_rgba(0,243,255,0.95)] scale-110' : 'ring-2 ring-cyan-400/80 shadow-[0_0_20px_rgba(0,243,255,0.7)] scale-105') 
                              : (highContrast ? 'ring-2 ring-white/80 hover:ring-cyan-300' : 'ring-1 ring-white/20 hover:ring-cyan-400/60')
                        }`}
                        style={{
                          width: `${node.radiusPx * 2.5}px`,
                          height: `${node.radiusPx * 2.5}px`,
                        }}
                      >
                        {/* Live 3D Rotating Photorealistic Planetary Surface Canvas */}
                        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full pointer-events-none">
                          <MiniRotatingPlanetCanvas
                            body={node.bodyData}
                            radius={node.radiusPx}
                            isSelected={isSelected}
                            isHovered={isHovered}
                          />
                        </div>

                        {/* Pulse Wave on Selected */}
                        {isSelected && (
                          <span className={`absolute inset-0 rounded-full pointer-events-none ${highContrast ? 'bg-amber-300/40 animate-ping' : 'bg-amber-400/20 animate-ping'}`} />
                        )}

                        {/* Harmonic Tesla Number Badge (3, 6, 9) */}
                        <span className={`absolute bottom-0 right-0 z-10 text-[9px] font-mono font-black transition-opacity pointer-events-none ${
                          isSelected || isHovered ? 'opacity-100' : (highContrast ? 'opacity-90' : 'opacity-0 group-hover:opacity-100')
                        } ${
                          highContrast
                            ? (node.teslaNumber === 9 ? 'text-amber-200 bg-black/95 px-1 rounded-full border border-amber-300' : node.teslaNumber === 6 ? 'text-cyan-200 bg-black/95 px-1 rounded-full border border-cyan-300' : 'text-emerald-200 bg-black/95 px-1 rounded-full border border-emerald-300')
                            : (node.teslaNumber === 9 ? 'text-amber-300 bg-black/80 px-1 rounded-full' : node.teslaNumber === 6 ? 'text-cyan-300 bg-black/80 px-1 rounded-full' : 'text-emerald-300 bg-black/80 px-1 rounded-full')
                        }`}>
                          {node.teslaNumber}
                        </span>
                      </motion.div>

                      {/* Persistent High-Contrast Label Tag (when high contrast is active and not hovering) */}
                      {highContrast && !isHovered && !isSelected && (
                        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap bg-black border-2 border-cyan-400/90 px-2.5 py-1 rounded-lg shadow-[0_0_20px_rgba(0,243,255,0.45)] flex items-center gap-2 font-mono z-10">
                          <span className="text-xs font-black text-white tracking-wider">{node.name.toUpperCase()}</span>
                          <span className="text-[11px] font-extrabold text-amber-300">{node.solfeggioHz}Hz</span>
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-200 border border-cyan-300">
                            {node.teslaNumber}H
                          </span>
                        </div>
                      )}

                      {/* Interactive Floating Hover / Selection Capsule */}
                      <AnimatePresence>
                        {(isHovered || isSelected) && (
                          <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 36, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            className={`absolute left-full top-1/2 -translate-y-1/2 z-30 pointer-events-auto whitespace-nowrap p-3 rounded-xl flex items-center gap-3 font-mono ${
                              highContrast
                                ? 'bg-black border-2 border-cyan-300 shadow-[0_0_35px_rgba(0,243,255,0.6)]'
                                : 'bg-black/90 backdrop-blur-xl border border-cyan-500/50 shadow-[0_0_25px_rgba(0,243,255,0.35)]'
                            }`}
                          >
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                <span className={`tracking-wider ${highContrast ? 'text-base font-black text-white' : 'text-sm font-bold text-white'}`}>
                                  {node.name}
                                </span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                                  highContrast 
                                    ? 'bg-amber-400 text-black border border-amber-300' 
                                    : 'bg-amber-500/20 border border-amber-400/50 text-amber-300'
                                }`}>
                                  {node.teslaNumber}-HARMONIC
                                </span>
                              </div>
                              <div className={`flex items-center gap-1.5 mt-0.5 ${highContrast ? 'text-xs font-bold text-cyan-200' : 'text-[11px] text-cyan-300'}`}>
                                <span className={highContrast ? 'text-white font-bold' : ''}>{node.sanskrit}</span>
                                <span className="text-white/60">•</span>
                                <span className={highContrast ? 'text-amber-300 font-black' : 'text-amber-400 font-bold'}>{node.solfeggioHz} Hz</span>
                              </div>
                              <div className={`flex items-center gap-1 mt-1 ${
                                highContrast 
                                  ? 'text-[11px] text-emerald-200 font-bold bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-400' 
                                  : 'text-[10px] text-emerald-300/90'
                              }`}>
                                <Sparkles className={`w-3 h-3 ${highContrast ? 'text-amber-300' : 'text-amber-400'}`} />
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
                              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-black uppercase flex items-center gap-1 transition-all cursor-pointer ${
                                highContrast
                                  ? 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_15px_rgba(0,243,255,0.7)]'
                                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-[0_0_10px_rgba(0,243,255,0.4)]'
                              }`}
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>DOSSIER</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 3. TOP AMBIENT STATUS & CONTROLS BAR */}
      <div className="absolute top-4 left-4 right-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 pointer-events-none z-20">
        {/* Left Badge: Alignment Status & Live Motion Center */}
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
          <div className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl font-mono text-xs shadow-[0_0_20px_rgba(0,243,255,0.25)] transition-all ${
            highContrast
              ? 'bg-black border-2 border-cyan-300 text-white font-black shadow-[0_0_30px_rgba(0,243,255,0.5)]'
              : 'bg-black/80 backdrop-blur-xl border border-cyan-500/40 text-cyan-200'
          }`}>
            <div className={`w-2.5 h-2.5 rounded-full ${highContrast ? 'bg-emerald-300 ring-2 ring-emerald-200 shadow-[0_0_12px_#34d399]' : 'bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]'}`} />
            <div>
              <span className="font-bold tracking-wider text-white">3-6-9 PLANETARY HARMONICS</span>
              <span className={`text-[10px] block sm:inline sm:ml-2 font-bold ${highContrast ? 'text-cyan-200' : 'text-cyan-400'}`}>
                {isLiveOrbitMoving ? '⚡ LIVE MOTION ACTIVE' : '⏸️ ALIGNMENT LOCKED'}
              </span>
            </div>
          </div>

          {/* Dedicated Live Planetary Motion Control Center */}
          <div className="flex items-center gap-1 bg-black/80 backdrop-blur-xl p-1 rounded-xl border border-cyan-500/40 shadow-[0_0_15px_rgba(0,243,255,0.2)]">
            {/* Play / Pause Toggle */}
            <button
              onClick={() => {
                cosmicAudio.playCyberKeystroke();
                setIsLiveOrbitMoving(!isLiveOrbitMoving);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-black transition-all cursor-pointer ${
                isLiveOrbitMoving
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                  : 'bg-amber-500/30 text-amber-200 border border-amber-400/60'
              }`}
              title="Toggle Planetary Movement / Lock Alignment"
            >
              {isLiveOrbitMoving ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="text-[11px]">{isLiveOrbitMoving ? 'MOVING' : 'PAUSED'}</span>
            </button>

            {/* Orbit Speed Selector */}
            <div className="flex items-center gap-0.5 bg-black/60 px-1 py-0.5 rounded-lg border border-cyan-500/20">
              {[0.5, 1, 2, 4].map((spd) => (
                <button
                  key={spd}
                  onClick={() => {
                    cosmicAudio.playCyberKeystroke();
                    setMotionSpeed(spd);
                    if (!isLiveOrbitMoving) setIsLiveOrbitMoving(true);
                  }}
                  className={`px-1.5 py-0.5 text-[10px] font-mono font-bold rounded transition-all cursor-pointer ${
                    motionSpeed === spd && isLiveOrbitMoving
                      ? 'bg-cyan-400 text-black shadow-[0_0_8px_rgba(0,243,255,0.8)]'
                      : 'text-cyan-400/60 hover:text-cyan-200'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Orbit Pattern Mode */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  cosmicAudio.playCyberKeystroke();
                  const modes: ('flow' | 'vortex' | 'harmonic')[] = ['flow', 'vortex', 'harmonic'];
                  const nextIdx = (modes.indexOf(motionPattern) + 1) % modes.length;
                  setMotionPattern(modes[nextIdx]);
                }}
                className="flex items-center gap-1 px-2 py-1 bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/40 rounded-lg text-cyan-200 text-[10px] font-mono font-bold cursor-pointer"
                title="Change Planetary Movement Pattern"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span className="uppercase">
                  {motionPattern === 'flow' ? 'CELESTIAL FLOW' : motionPattern === 'vortex' ? '3-6-9 VORTEX' : 'HARMONIC DRIFT'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Tools: Toggle Hotspots, Constellations, High Contrast, Zoom, Audio, Fullscreen */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Toggle High Contrast / Super-Readability */}
          <button
            onClick={toggleHighContrast}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs font-bold backdrop-blur-xl border transition-all cursor-pointer ${
              highContrast
                ? 'bg-amber-400 text-black border-amber-300 font-black shadow-[0_0_20px_rgba(251,191,36,0.7)] ring-2 ring-amber-300'
                : 'bg-black/70 border-white/20 text-white/80 hover:text-white hover:border-amber-400/60'
            }`}
            title="Toggle High-Contrast Text Overlays (Higher font weight & maximum brightness)"
          >
            <Contrast className={`w-3.5 h-3.5 ${highContrast ? 'text-black' : 'text-amber-400'}`} />
            <span className="hidden md:inline">{highContrast ? 'HIGH CONTRAST: ON' : 'HIGH CONTRAST'}</span>
          </button>

          {/* Toggle Interactive Overlay Markers */}
          <button
            onClick={() => {
              cosmicAudio.playCyberKeystroke();
              setShowOverlays(!showOverlays);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs font-bold backdrop-blur-xl border transition-all cursor-pointer ${
              showOverlays 
                ? (highContrast ? 'bg-cyan-400 text-black border-cyan-300 font-black shadow-[0_0_20px_rgba(0,243,255,0.7)]' : 'bg-cyan-500/25 border-cyan-400/70 text-cyan-100 shadow-[0_0_15px_rgba(0,243,255,0.3)]')
                : 'bg-black/70 border-white/20 text-white/70 hover:text-white'
            }`}
            title="Toggle Resonance Hotspot Markers"
          >
            <Layers className={`w-3.5 h-3.5 ${highContrast && showOverlays ? 'text-black' : ''}`} />
            <span className="hidden md:inline">{showOverlays ? 'HOTSPOTS: ON' : 'HOTSPOTS: OFF'}</span>
          </button>

          {/* Toggle Zodiac Constellation Lines */}
          <button
            onClick={() => {
              cosmicAudio.playCyberKeystroke();
              setShowConstellations(!showConstellations);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs font-bold backdrop-blur-xl border transition-all cursor-pointer ${
              showConstellations 
                ? (highContrast ? 'bg-amber-400 text-black border-amber-300 font-black shadow-[0_0_20px_rgba(251,191,36,0.7)]' : 'bg-amber-500/25 border-amber-400/70 text-amber-100 shadow-[0_0_15px_rgba(251,191,36,0.3)]')
                : 'bg-black/70 border-white/20 text-white/70 hover:text-white'
            }`}
            title="Toggle Zodiac Constellation Star Lines"
          >
            <Sparkles className={`w-3.5 h-3.5 ${highContrast && showConstellations ? 'text-black' : 'text-amber-400'}`} />
            <span className="hidden md:inline">{showConstellations ? 'CONSTELLATIONS: ON' : 'CONSTELLATIONS: OFF'}</span>
          </button>

          {/* Zoom Toggle */}
          <button
            onClick={() => {
              cosmicAudio.playCyberKeystroke();
              setZoomLevel(prev => (prev === 1 ? 1.25 : prev === 1.25 ? 1.5 : 1));
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs font-bold backdrop-blur-xl transition-all cursor-pointer ${
              highContrast
                ? 'bg-black text-cyan-200 border-2 border-cyan-300 font-black'
                : 'bg-black/70 hover:bg-black/90 border border-cyan-800/60 text-cyan-300'
            }`}
            title="Cycle Zoom Level"
          >
            <span>{zoomLevel}x ZOOM</span>
          </button>

          {/* Harmonic Audio Drone */}
          <button
            onClick={handleToggleAudio}
            className={`p-2 rounded-xl border backdrop-blur-xl font-mono text-xs transition-all cursor-pointer ${
              isPlayingAudio
                ? (highContrast ? 'bg-amber-400 text-black border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.7)]' : 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.4)]')
                : (highContrast ? 'bg-black text-cyan-200 border-cyan-400 hover:text-white' : 'bg-black/70 border-cyan-800/40 text-cyan-400 hover:text-cyan-200')
            }`}
            title="Toggle 432Hz/528Hz Harmonic Drone"
          >
            {isPlayingAudio ? <Volume2 className={`w-4 h-4 ${highContrast ? 'text-black' : ''}`} /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Fullscreen Expansion */}
          <button
            onClick={() => {
              cosmicAudio.playCyberKeystroke();
              setIsFullscreen(!isFullscreen);
            }}
            className={`p-2 rounded-xl font-mono text-xs backdrop-blur-xl transition-all cursor-pointer ${
              highContrast
                ? 'bg-black text-cyan-200 border-2 border-cyan-300 font-black'
                : 'bg-black/70 hover:bg-black/90 border border-cyan-800/60 text-cyan-300'
            }`}
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
          className={`p-3.5 rounded-2xl font-mono transition-all ${
            highContrast
              ? 'bg-black border-2 border-cyan-300 shadow-[0_0_35px_rgba(0,243,255,0.45)]'
              : 'bg-black/85 backdrop-blur-xl border border-cyan-500/40 shadow-[0_0_30px_rgba(0,243,255,0.25)]'
          }`}
        >
          <div className="flex items-center justify-between gap-2 border-b border-cyan-500/30 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <div 
                className="w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: activeBody.color, boxShadow: `0 0 12px ${activeBody.color}` }}
              />
              <span className={`text-white ${highContrast ? 'font-black text-base' : 'font-bold text-sm'}`}>{activeBody.name}</span>
            </div>
            <span className={`text-xs font-black px-2 py-0.5 rounded ${
              highContrast
                ? 'bg-amber-400 text-black border border-amber-300'
                : 'text-amber-400 bg-amber-500/15 border border-amber-400/40'
            }`}>
              TESLA [{activeBody.teslaHarmonicNumber}]
            </span>
          </div>

          <p className={`text-xs leading-relaxed mb-2.5 line-clamp-2 ${
            highContrast ? 'text-white font-bold' : 'text-cyan-200/90 font-normal'
          }`}>
            {activeBody.description}
          </p>

          <div className={`mb-3 px-2.5 py-1.5 rounded-lg text-[11px] flex items-center gap-1.5 ${
            highContrast
              ? 'bg-black border-2 border-cyan-400 text-amber-300 font-extrabold'
              : 'bg-cyan-950/40 border border-cyan-500/20 text-amber-200'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 shrink-0 ${highContrast ? 'text-amber-300' : 'text-amber-400'}`} />
            <div className="truncate">
              <span className={`font-bold ${highContrast ? 'text-cyan-200' : 'text-cyan-400'}`}>RULING SIGNS: </span>
              <span>{getZodiacSigns(activeBody.id)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePlayPlanetTone(activeBody)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                highContrast
                  ? 'bg-cyan-950 text-cyan-100 border-2 border-cyan-300 hover:bg-cyan-900 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                  : 'bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${highContrast ? 'text-amber-300' : 'text-amber-400'}`} />
              <span>PLAY {activeBody.vibrationalFrequencyHz}Hz</span>
            </button>
            <button
              onClick={() => {
                onSelectPlanet(activeBody);
                onOpenDossier(activeBody);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
                highContrast
                  ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-[0_0_20px_rgba(251,191,36,0.6)]'
                  : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
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
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-mono text-xs font-black uppercase shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all cursor-pointer"
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
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-bold uppercase shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all cursor-pointer"
        >
          <Eye className="w-4 h-4 text-cyan-200" />
          <span>OPEN FULL 3-6-9 DOSSIER</span>
        </button>
      </div>

    </div>
  );
};

/**
 * High-definition rotating mini planet canvas component for each hotspot node
 */
const MiniRotatingPlanetCanvas: React.FC<{
  body: CelestialBodyData;
  radius: number;
  isSelected?: boolean;
  isHovered?: boolean;
}> = ({ body, radius, isSelected, isHovered }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      drawHighFidelityPlanet({
        ctx,
        body,
        screenX: w / 2,
        screenY: h / 2,
        bodyRadius: Math.max(radius * 0.9, 6),
        frame,
        isSelected,
        isHovered,
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [body, radius, isSelected, isHovered]);

  const size = Math.max(radius * 2.5, 36);

  return (
    <canvas
      ref={canvasRef}
      width={Math.round(size * 2)}
      height={Math.round(size * 2)}
      style={{ width: `${size}px`, height: `${size}px` }}
      className="pointer-events-none rounded-full"
    />
  );
};

/**
 * Dynamic canvas that paints orbital trails and shimmering particle stardust behind moving planets
 */
const LiveOrbitalTrailCanvas: React.FC<{
  alignmentNodes: AlignmentNode[];
  planetOffsets: { [id: string]: { x: number; y: number } };
  motionPattern: 'flow' | 'vortex' | 'harmonic';
  isLiveOrbitMoving: boolean;
}> = ({ alignmentNodes, planetOffsets, isLiveOrbitMoving, motionPattern }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trailsRef = useRef<{ [id: string]: { x: number; y: number; alpha: number }[] }>({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const parent = canvas.parentElement;
      const w = (canvas.width = parent?.clientWidth || 720);
      const h = (canvas.height = parent?.clientHeight || 900);

      ctx.clearRect(0, 0, w, h);

      if (!isLiveOrbitMoving) return;

      alignmentNodes.forEach((node) => {
        const offset = planetOffsets[node.id] || { x: 0, y: 0 };
        const baseX = (node.leftPercent / 100) * w;
        const baseY = (node.topPercent / 100) * h;
        const currentX = baseX + offset.x;
        const currentY = baseY + offset.y;

        if (!trailsRef.current[node.id]) {
          trailsRef.current[node.id] = [];
        }

        const trail = trailsRef.current[node.id];
        trail.unshift({ x: currentX, y: currentY, alpha: 1 });
        if (trail.length > 24) trail.pop();

        // Draw glowing motion trail curve
        if (trail.length > 2) {
          ctx.beginPath();
          ctx.moveTo(trail[0].x, trail[0].y);
          for (let i = 1; i < trail.length; i++) {
            ctx.lineTo(trail[i].x, trail[i].y);
          }
          ctx.strokeStyle = node.bodyData.glowColor || 'rgba(0, 243, 255, 0.35)';
          ctx.lineWidth = 1.6;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Particle stardust dots along the path
          for (let i = 0; i < trail.length; i += 2) {
            const p = trail[i];
            const a = (1 - i / trail.length) * 0.5;
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(0.6, 2 - i * 0.07), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
            ctx.fill();
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [alignmentNodes, planetOffsets, isLiveOrbitMoving, motionPattern]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};

