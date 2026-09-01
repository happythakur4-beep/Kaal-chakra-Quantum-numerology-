import React, { useState, useEffect } from 'react';
import { UserProfile, CelestialBodyData, TeslaVortexNode } from '../../types';
import { CELESTIAL_BODIES_DATA, TESLA_VORTEX_NODES } from '../../data/teslaPortalData';
import { CyberPlanetaryCanvas } from './CyberPlanetaryCanvas';
import { CyberGalaxyNavigator } from './CyberGalaxyNavigator';
import { CyberCommandTerminal } from './CyberCommandTerminal';
import { DeepPortalViewer } from './DeepPortalViewer';
import { BlackHolePortalCore } from './BlackHolePortalCore';
import { TeslaVortexModal } from './TeslaVortexModal';
import { TuneAndThrivePortal } from './TuneAndThrivePortal';
import { ChakraEnergyScanner } from './ChakraEnergyScanner';
import { SpaceTravelWarpEngine } from './SpaceTravelWarpEngine';
import { TeslaIntroAnimation } from './TeslaIntroAnimation';
import { VortexMathOverlayD3 } from './VortexMathOverlayD3';
import { CosmicPlanetaryAlignmentHomepage } from './CosmicPlanetaryAlignmentHomepage';
import { SudarshanSacredMatrixGallery } from './SudarshanSacredMatrixGallery';
import { PlanetOrrery3D } from './PlanetOrrery3D';
import { DeepSpaceVortexOrrery3D } from './DeepSpaceVortexOrrery3D';
import { TeslaEtherEnergyField3D } from './TeslaEtherEnergyField3D';
import { DeepSpaceSingularityCore } from './DeepSpaceSingularityCore';
import { TeslaEarthVortexMapsRadar } from './TeslaEarthVortexMapsRadar';
import { BirthPlanetaryEphemerisModal } from './BirthPlanetaryEphemerisModal';
import { NatalEphemerisData } from '../../utils/planetaryEphemeris';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import {
  Sparkles,
  Zap,
  Orbit,
  Compass,
  Radio,
  Terminal,
  Cpu,
  Volume2,
  VolumeX,
  Layers,
  Activity,
  LogOut,
  Crosshair,
  Shield,
  Search,
  Eye,
  Sliders,
  MapPin,
  Globe2,
  Calendar,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TeslaCyberPortalNexusProps {
  onExit: () => void;
  user?: UserProfile;
}

type CyberTab = 'planets' | 'maps-radar' | 'sudarshan' | 'galaxy' | 'terminal' | 'tune-thrive' | 'vortex' | 'blackhole' | 'chakras' | 'etheric';

export const TeslaCyberPortalNexus: React.FC<TeslaCyberPortalNexusProps> = ({
  onExit,
  user,
}) => {
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<CyberTab>('planets');
  const [planetViewMode, setPlanetViewMode] = useState<'deep-vortex' | 'alignment' | 'orrery' | 'orbit'>('deep-vortex');
  const [selectedBody, setSelectedBody] = useState<CelestialBodyData>(CELESTIAL_BODIES_DATA[3]); // Earth by default
  const [warpOrigin, setWarpOrigin] = useState<CelestialBodyData | null>(null);
  const [warpDestination, setWarpDestination] = useState<CelestialBodyData | null>(null);
  const [isWarpTraveling, setIsWarpTraveling] = useState(false);
  const [selectedVortexNode, setSelectedVortexNode] = useState<TeslaVortexNode | null>(null);
  const [isSoundscapePlaying, setIsSoundscapePlaying] = useState(false);
  const [hasScanlines, setHasScanlines] = useState(true);
  const [isHologramMode, setIsHologramMode] = useState(false);
  const [isVortexOverlayOpen, setIsVortexOverlayOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Natal Ephemeris Birth Alignment State (DOB & Location)
  const [isEphemerisModalOpen, setIsEphemerisModalOpen] = useState(false);
  const [birthEphemeris, setBirthEphemeris] = useState<NatalEphemerisData | null>(null);
  const [isBirthLockedMode, setIsBirthLockedMode] = useState(false);

  // Subscribe to audio state
  useEffect(() => {
    const unsub = cosmicAudio.subscribe((isPlaying) => {
      setIsSoundscapePlaying(isPlaying);
    });
    return () => {
      unsub();
    };
  }, []);

  const handleToggleSoundscape = () => {
    cosmicAudio.playCyberKeystroke();
    if (isSoundscapePlaying) {
      cosmicAudio.stopSoundscape();
    } else {
      cosmicAudio.startSoundscape();
    }
  };

  // Initiate Hyperspace Warp
  const handleInitiateWarp = (destination: CelestialBodyData) => {
    setWarpOrigin(selectedBody);
    setWarpDestination(destination);
    setIsWarpTraveling(true);
  };

  const handleWarpArrival = () => {
    setIsWarpTraveling(false);
    if (warpDestination) {
      setSelectedBody(warpDestination);
      setWarpDestination(null);
      setWarpOrigin(null);
    }
  };

  // Select planet from terminal or list
  const handleSelectPlanetByName = (nameOrId: string) => {
    const found = CELESTIAL_BODIES_DATA.find(
      (b) => b.id.toLowerCase() === nameOrId.toLowerCase() || b.name.toLowerCase().includes(nameOrId.toLowerCase())
    );
    if (found) {
      setSelectedBody(found);
    }
  };

  // Filtered celestial bodies for search
  const filteredBodies = CELESTIAL_BODIES_DATA.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.vedicGraha.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.solfeggioKey.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {isIntroPlaying && <TeslaIntroAnimation onComplete={() => setIsIntroPlaying(false)} />}
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#02040a] text-cyan-100 font-sans selection:bg-cyan-500/40 selection:text-white select-none">
        {/* Optional CRT Scanlines Effect */}
      {hasScanlines && (
        <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40" />
      )}

      {/* Active Space Travel Hyperspace Engine Overlay */}
      {isWarpTraveling && warpDestination && (
        <SpaceTravelWarpEngine
          origin={warpOrigin}
          destination={warpDestination}
          onArrival={handleWarpArrival}
          onSkip={handleWarpArrival}
        />
      )}

      {/* Multi-Level Deep Dive Planetary Portal Modal */}
      {isDetailModalOpen && selectedBody && !isWarpTraveling && (
        <DeepPortalViewer
          body={selectedBody}
          allBodies={CELESTIAL_BODIES_DATA}
          user={user}
          onClose={() => setIsDetailModalOpen(false)}
          onTravelTo={(target) => {
            setIsDetailModalOpen(false);
            handleInitiateWarp(target);
          }}
        />
      )}

      {/* Vortex Node Modal */}
      {selectedVortexNode && (
        <TeslaVortexModal
          node={selectedVortexNode}
          onClose={() => setSelectedVortexNode(null)}
          onSelectNode={(node) => setSelectedVortexNode(node)}
        />
      )}

      {/* D3 Interactive Vortex Math HUD Layer */}
      <VortexMathOverlayD3
        isOpen={isVortexOverlayOpen}
        onToggle={() => setIsVortexOverlayOpen(false)}
        initialDisplayMode="ambient-hud"
      />

      {/* TOP CYBER HUD BAR */}
      <header className="sticky top-0 z-40 bg-[#050914]/95 backdrop-blur-xl border-b border-cyan-500/30 px-3 sm:px-6 py-2.5 shadow-[0_4px_30px_rgba(0,243,255,0.15)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Classification Telemetry */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,243,255,0.4)]">
              <Zap className="w-5 h-5 text-cyan-400 fill-current animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm sm:text-base font-extrabold tracking-wider text-cyan-100">
                  TESLA 3-6-9
                </span>
                <span className="px-1.5 py-0.2 bg-cyan-500/20 border border-cyan-400/40 rounded text-[10px] font-mono font-bold text-cyan-300">
                  QUANTUM NEXUS
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-500/80">
                <span>[SYSTEM: STANDALONE OPERATIONAL]</span>
                <span className="hidden md:inline-block">• [Q-COHERENCE: 99.8%]</span>
              </div>
            </div>
          </div>

          {/* Quick HUD Action Tools */}
          <div className="flex items-center gap-2 font-mono text-xs">
            {/* Birth Ephemeris (DOB & Location) */}
            <button
              onClick={() => {
                cosmicAudio.playCyberKeystroke();
                setIsEphemerisModalOpen(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold uppercase transition-all cursor-pointer ${
                isBirthLockedMode
                  ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.35)] animate-pulse'
                  : 'bg-cyan-950/60 border-cyan-800/50 text-cyan-400 hover:bg-cyan-900/60 hover:text-cyan-200'
              }`}
              title="Align planets to exact Birth Date, Time & Location (जन्म समय ग्रह अलाइनमेंट)"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">{isBirthLockedMode ? '✨ BIRTH ALIGNED' : '📅 BIRTH ALIGN'}</span>
            </button>

            {/* Toggle D3 Vortex Engine */}
            <button
              onClick={() => {
                cosmicAudio.playCyberKeystroke();
                setIsVortexOverlayOpen(!isVortexOverlayOpen);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold uppercase transition-all ${
                isVortexOverlayOpen
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)] animate-pulse'
                  : 'bg-cyan-950/60 border-cyan-800/50 text-cyan-400 hover:bg-cyan-900/60 hover:text-cyan-200'
              }`}
              title="Toggle D3.js Vortex Math Overlay"
            >
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">VORTEX HUD</span>
            </button>

            {/* Audio Soundscape Toggle */}
            <button
              onClick={handleToggleSoundscape}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold uppercase transition-all ${
                isSoundscapePlaying
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)] animate-pulse'
                  : 'bg-cyan-950/60 border-cyan-800/50 text-cyan-400 hover:bg-cyan-900/60 hover:text-cyan-200'
              }`}
              title="Toggle 432Hz/108Hz Ambient Space Drone"
            >
              {isSoundscapePlaying ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSoundscapePlaying ? 'AUDIO: ACTIVE' : 'AUDIO: MUTE'}</span>
            </button>

            {/* Scanlines Toggle */}
            <button
              onClick={() => {
                cosmicAudio.playCyberKeystroke();
                setHasScanlines(!hasScanlines);
              }}
              className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs transition-all ${
                hasScanlines
                  ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
                  : 'bg-black/40 border-cyan-900/40 text-cyan-500/60'
              }`}
            >
              <span>SCANLINES</span>
            </button>

            {/* Disconnect & Return to Main Vedic App */}
            <button
              onClick={() => {
                cosmicAudio.playCyberWarp();
                onExit();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/50 hover:bg-rose-900/70 border border-rose-500/40 hover:border-rose-400 text-rose-300 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(244,63,94,0.2)]"
              title="Disconnect Neural Link & Return to Call Checker App"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>DISCONNECT</span>
            </button>
          </div>
        </div>

        {/* CYBER NAVIGATION HUD TABS */}
        <div className="max-w-7xl mx-auto mt-2.5 pt-2 border-t border-cyan-500/20 flex items-center gap-1.5 overflow-x-auto no-scrollbar font-mono text-xs">
          {[
            { id: 'planets', label: '🪐 Planetary Observatory', desc: 'Movie-Grade 3D Planets' },
            { id: 'maps-radar', label: '🌍 3-6-9 Earth Vortices (Maps Radar)', desc: 'Google Maps Grounded Sacred Grid' },
            { id: 'sudarshan', label: '☸️ Sudarshana & Sacred Chakra Matrix', desc: 'Krishna Chakra & Mantra Vortex' },
            { id: 'galaxy', label: '🌌 Deep Galaxy Warp', desc: 'Nebulae & Relativistic Stars' },
            { id: 'terminal', label: '💻 Cyber Command Console', desc: 'Hacker Shell' },
            { id: 'tune-thrive', label: '✨ Tune & Thrive Vault', desc: 'Frequency Archives' },
            { id: 'vortex', label: '⚡ 3-6-9 Vortex Matrix', desc: 'Tesla Doubling Circuit' },
            { id: 'blackhole', label: '🕳️ Singularity & Time-Distortion Core', desc: 'Gravitational Lensing & Quantum Flux' },
            { id: 'chakras', label: '🧬 7-Chakra Biofield', desc: 'Neural Overclock' },
            { id: 'etheric', label: '⚡ 3-6-9 Ether Energy Field 3D', desc: 'Pulsating Scalar Transmission' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  cosmicAudio.playCyberKeystroke();
                  setActiveTab(tab.id as CyberTab);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all duration-300 border ${
                  isActive
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-100 shadow-[0_0_20px_rgba(0,243,255,0.35)]'
                    : 'bg-[#030712]/70 hover:bg-cyan-950/40 border-cyan-900/40 text-cyan-400/80 hover:text-cyan-200'
                }`}
              >
                <span className="font-bold">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* MAIN CYBERNETIC CONTENT AREA */}
      <main className="max-w-7xl mx-auto p-3 sm:p-6 space-y-6 pb-20">
        {/* Natal Ephemeris Birth Alignment HUD Banner */}
        {isBirthLockedMode && birthEphemeris && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/70 via-purple-950/60 to-cyan-950/70 border-2 border-amber-400/80 shadow-[0_0_35px_rgba(251,191,36,0.3)] backdrop-blur-md flex flex-wrap items-center justify-between gap-4 font-mono text-xs animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/60 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                <Calendar className="w-5 h-5 text-amber-300 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black tracking-wider text-amber-300">
                    🪐 NATAL BIRTH ALIGNMENT ACTIVE (जन्म समय ग्रह अलाइनमेंट)
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold text-[10px] border border-amber-400/40">
                    LOCK ACTIVE
                  </span>
                </div>
                <div className="text-xs text-cyan-200/90 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>📅 Born: <strong className="text-white">{birthEphemeris.birthDate}</strong> at <strong className="text-white">{birthEphemeris.birthTime}</strong></span>
                  <span>📍 <strong className="text-amber-200">{birthEphemeris.birthLocation || birthEphemeris.city || 'Custom Location'}</strong></span>
                  <span>☸️ Lagna/Ascendant: <strong className="text-amber-300">{birthEphemeris.ascendantSign || birthEphemeris.ascendant.sign} {birthEphemeris.ascendantDegree !== undefined ? `(${birthEphemeris.ascendantDegree.toFixed(1)}°)` : ''}</strong></span>
                  <span>🌙 Moon: <strong className="text-cyan-300">{birthEphemeris.moonSign}</strong> ({birthEphemeris.moonNakshatra || birthEphemeris.nakshatra})</span>
                  <span>☀️ Sun: <strong className="text-amber-400">{birthEphemeris.sunSign}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  cosmicAudio.playCyberKeystroke();
                  setIsEphemerisModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400 text-amber-200 font-bold text-xs transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] cursor-pointer"
              >
                Change Date / City
              </button>
              <button
                onClick={() => {
                  cosmicAudio.playCyberKeystroke();
                  setIsBirthLockedMode(false);
                }}
                className="px-3.5 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/60 text-cyan-200 font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Resume Live Orbits</span>
              </button>
            </div>
          </div>
        )}

        {/* 1. PLANETARY OBSERVATORY (HIGH-DEFINITION MOVIE-REALISTIC 3D PLANETS) */}
        {activeTab === 'planets' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 px-2 text-xs font-mono text-cyan-400/80">
              {/* Mode Switcher */}
              <div className="flex items-center gap-2">
                <div className="flex flex-wrap items-center bg-black/60 p-1 rounded-xl border border-cyan-500/30">
                  <button
                    onClick={() => {
                      cosmicAudio.playCyberKeystroke();
                      setPlanetViewMode('deep-vortex');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      planetViewMode === 'deep-vortex'
                        ? 'bg-gradient-to-r from-purple-600/40 via-cyan-500/40 to-amber-500/40 border border-cyan-400 text-cyan-100 shadow-[0_0_20px_rgba(0,243,255,0.4)]'
                        : 'text-cyan-400/70 hover:text-cyan-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                    <span>🌌 3D DEEP SPACE VORTEX</span>
                  </button>

                  <button
                    onClick={() => {
                      cosmicAudio.playCyberKeystroke();
                      setPlanetViewMode('alignment');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      planetViewMode === 'alignment'
                        ? 'bg-gradient-to-r from-amber-500/30 to-cyan-500/30 border border-amber-400/70 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                        : 'text-cyan-400/70 hover:text-cyan-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>✨ ALIGNMENT (LIVE MOTION)</span>
                  </button>

                  <button
                    onClick={() => {
                      cosmicAudio.playCyberKeystroke();
                      setPlanetViewMode('orrery');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      planetViewMode === 'orrery'
                        ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400/70 text-cyan-100 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                        : 'text-cyan-400/70 hover:text-cyan-200'
                    }`}
                  >
                    <Orbit className="w-3.5 h-3.5 text-cyan-300" />
                    <span>🌌 3D SOLAR ORRERY</span>
                  </button>

                  <button
                    onClick={() => {
                      cosmicAudio.playCyberKeystroke();
                      setPlanetViewMode('orbit');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      planetViewMode === 'orbit'
                        ? 'bg-cyan-500/30 border border-cyan-400/70 text-cyan-100 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                        : 'text-cyan-400/70 hover:text-cyan-200'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-300" />
                    <span>🪐 3D PLANET DOSSIER</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('sudarshan')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/50 rounded-xl text-amber-200 uppercase font-bold transition-all shadow-[0_0_12px_rgba(251,191,36,0.3)] cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>SUDARSHAN CHAKRA HUB</span>
                </button>
                <button
                  onClick={() => setIsDetailModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 rounded-xl text-cyan-200 uppercase font-bold transition-all shadow-[0_0_12px_rgba(0,243,255,0.2)] cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>DOSSIER: {selectedBody.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>

            {planetViewMode === 'deep-vortex' ? (
              <DeepSpaceVortexOrrery3D
                celestialBodies={CELESTIAL_BODIES_DATA}
                selectedBody={selectedBody}
                onSelectBody={(body) => {
                  setSelectedBody(body);
                }}
                onEnterBlackHolePortal={() => setActiveTab('blackhole')}
                birthEphemeris={birthEphemeris}
                isBirthLocked={isBirthLockedMode}
                onOpenBirthModal={() => setIsEphemerisModalOpen(true)}
                onResetBirthAlignment={() => setIsBirthLockedMode(false)}
                onApplyBirthEphemeris={(ephemeris) => {
                  setBirthEphemeris(ephemeris);
                  setIsBirthLockedMode(true);
                }}
              />
            ) : planetViewMode === 'alignment' ? (
              <CosmicPlanetaryAlignmentHomepage
                onSelectPlanet={(body) => {
                  setSelectedBody(body);
                }}
                onOpenDossier={(body) => {
                  setSelectedBody(body);
                  setIsDetailModalOpen(true);
                }}
                onOpenTab={(tabId) => setActiveTab(tabId as CyberTab)}
              />
            ) : planetViewMode === 'orrery' ? (
              <PlanetOrrery3D
                celestialBodies={CELESTIAL_BODIES_DATA}
                selectedBody={selectedBody}
                onSelectBody={(body) => {
                  setSelectedBody(body);
                }}
                onEnterBlackHolePortal={() => setActiveTab('blackhole')}
                birthEphemeris={birthEphemeris}
                isBirthLocked={isBirthLockedMode}
                onOpenBirthModal={() => setIsEphemerisModalOpen(true)}
                onResetBirthAlignment={() => setIsBirthLockedMode(false)}
                onApplyBirthEphemeris={(ephemeris) => {
                  setBirthEphemeris(ephemeris);
                  setIsBirthLockedMode(true);
                }}
              />
            ) : (
              <CyberPlanetaryCanvas
                selectedBody={selectedBody}
                allBodies={CELESTIAL_BODIES_DATA}
                onSelectBody={(body) => setSelectedBody(body)}
                isHologramMode={isHologramMode}
                onInitiateWarp={(body) => handleInitiateWarp(body)}
              />
            )}
          </div>
        )}

        {/* 1.5. 3-6-9 SACRED EARTH VORTICES & GOOGLE MAPS GROUNDED RADAR */}
        {activeTab === 'maps-radar' && (
          <div className="space-y-6">
            <TeslaEarthVortexMapsRadar />
          </div>
        )}

        {/* 2. SUDARSHANA & SACRED CHAKRA MATRIX EXHIBITION (USER HIGH-RES ARTIFACTS & VIDEO) */}
        {activeTab === 'sudarshan' && (
          <div className="space-y-6">
            <SudarshanSacredMatrixGallery
              onOpenPlanet={handleSelectPlanetByName}
            />
          </div>
        )}


        {/* 2. DEEP GALAXY & NEBULA WARP */}
        {activeTab === 'galaxy' && (
          <div className="space-y-4">
            <CyberGalaxyNavigator />
          </div>
        )}

        {/* 3. CYBER COMMAND TERMINAL / HACKER SHELL */}
        {activeTab === 'terminal' && (
          <div className="space-y-4">
            <CyberCommandTerminal
              onSelectPlanet={handleSelectPlanetByName}
              onSelectTab={(tabId) => setActiveTab(tabId as CyberTab)}
              allBodies={CELESTIAL_BODIES_DATA}
              onToggleVortexMath={() => setIsVortexOverlayOpen(!isVortexOverlayOpen)}
            />
          </div>
        )}

        {/* 4. TUNE & THRIVE FREQUENCY VAULT (SCREENSHOT KNOWLEDGE VAULT) */}
        {activeTab === 'tune-thrive' && (
          <div className="space-y-6">
            <TuneAndThrivePortal />
          </div>
        )}

        {/* 5. 3-6-9 TESLA VORTEX MATRIX */}
        {activeTab === 'vortex' && (
          <div className="space-y-6">
            <div className="bg-[#050b18]/90 border border-cyan-500/30 rounded-2xl p-6 font-mono">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-cyan-100 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    3-6-9 TESLA VORTEX MATRIX & DOUBLING CIRCUIT
                  </h2>
                  <p className="text-xs text-cyan-400/80 mt-1">
                    Decryption of the non-physical flux vector: 1 - 2 - 4 - 8 - 7 - 5 (3D Material Domain) controlled by 3, 6, 9 (Etheric Source).
                  </p>
                </div>
              </div>

              {/* Interactive Vortex Nodes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {TESLA_VORTEX_NODES.map((node) => (
                  <div
                    key={node.number}
                    onClick={() => {
                      cosmicAudio.playCyberScan();
                      setSelectedVortexNode(node);
                    }}
                    className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                      node.number === 9
                        ? 'bg-amber-950/20 border-amber-400 hover:border-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.2)]'
                        : node.number === 3 || node.number === 6
                        ? 'bg-cyan-950/30 border-cyan-400 hover:border-cyan-300 shadow-[0_0_20px_rgba(0,243,255,0.2)]'
                        : 'bg-black/40 border-cyan-900/40 hover:border-cyan-500/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl font-black font-mono text-cyan-100">
                        #{node.number}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold border border-cyan-500/30 text-cyan-300">
                        {node.frequencyHz} Hz
                      </span>
                    </div>
                    <div className="text-sm font-bold text-cyan-200 mb-1">{node.solfeggioTitle}</div>
                    <p className="text-xs text-cyan-400/80 line-clamp-3">{node.vortexMeaning}</p>
                    <div className="mt-3 pt-3 border-t border-cyan-900/50 flex items-center justify-between text-[11px] text-amber-300">
                      <span>DECRYPT NODE</span>
                      <span>&rarr;</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. BLACK HOLE SINGULARITY & TIME-DISTORTION PORTAL */}
        {activeTab === 'blackhole' && (
          <div className="space-y-6">
            <DeepSpaceSingularityCore />
          </div>
        )}

        {/* 7. 7-CHAKRA BIOFIELD OVERCLOCK */}
        {activeTab === 'chakras' && (
          <div className="space-y-6">
            <ChakraEnergyScanner />
          </div>
        )}

        {/* 8. 3-6-9 ETHER ENERGY FIELD (3D WIRELESS POWER TRANSMISSION) */}
        {activeTab === 'etheric' && (
          <div className="space-y-6">
            <TeslaEtherEnergyField3D />

            {/* Classical Wardenclyffe Blueprint Dossier */}
            <div className="bg-[#050b18]/90 border border-cyan-500/30 rounded-2xl p-6 font-mono space-y-6">
              <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-4">
                <Compass className="w-6 h-6 text-cyan-400 animate-pulse" />
                <div>
                  <h2 className="text-lg font-bold text-cyan-100">WARDENCLYFFE WIRELESS RADIANT ETHER ARCHITECTURE</h2>
                  <p className="text-xs text-cyan-400/80">
                    Earth resonant cavity standing wave generator (1899 Colorado Springs & 1901 Long Island blueprints).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
                <div className="bg-black/50 p-4 rounded-xl border border-cyan-900/50 space-y-3">
                  <div className="text-amber-400 font-bold uppercase">[RADIANT ENERGY EQUATIONS]</div>
                  <p className="text-cyan-300/90">
                    Tesla demonstrated that the Earth itself behaves as a giant spherical capacitor. By imparting electrical impulses at Earth fundamental resonant frequency (11.78 Hz to 7.83 Hz), standing electromagnetic waves wrap around the planet without inverse-square dissipation.
                  </p>
                  <div className="p-3 bg-cyan-950/40 rounded border border-cyan-500/30 text-cyan-200">
                    <div className="font-bold text-cyan-400 mb-1">Etheric Constant:</div>
                    <code>V_propagation = c * sqrt(epsilon_0 * mu_0) = 299,792 km/s</code>
                  </div>
                </div>

                <div className="bg-black/50 p-4 rounded-xl border border-cyan-900/50 space-y-3">
                  <div className="text-cyan-400 font-bold uppercase">[LONGITUDINAL SCALAR OSCILLATIONS]</div>
                  <p className="text-cyan-300/90">
                    Unlike transverse Hertzian radio waves which dissipate energy rapidly into space, longitudinal scalar waves compress the ether itself, enabling zero-loss wireless energy transmission and instantaneous quantum resonance.
                  </p>
                  <button
                    onClick={() => {
                      cosmicAudio.playSchumannResonance(6);
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-bold rounded-lg text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)] cursor-pointer"
                  >
                    TRANSMIT RADIANT SCALAR WAVE (7.83 HZ)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Natal Planetary Ephemeris Modal (DOB & Location) */}
      {isEphemerisModalOpen && (
        <BirthPlanetaryEphemerisModal
          onClose={() => setIsEphemerisModalOpen(false)}
          onApplyEphemeris={(data) => {
            setBirthEphemeris(data);
            setIsBirthLockedMode(true);
            setIsEphemerisModalOpen(false);
          }}
          initialData={birthEphemeris || undefined}
        />
      )}
    </div>
    </>
  );
};
