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
  Sliders
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TeslaCyberPortalNexusProps {
  onExit: () => void;
  user?: UserProfile;
}

type CyberTab = 'planets' | 'galaxy' | 'terminal' | 'vortex' | 'tune-thrive' | 'blackhole' | 'chakras' | 'etheric';

export const TeslaCyberPortalNexus: React.FC<TeslaCyberPortalNexusProps> = ({
  onExit,
  user,
}) => {
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<CyberTab>('planets');
  const [planetViewMode, setPlanetViewMode] = useState<'alignment' | 'orbit'>('alignment');
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

  // Subscribe to audio state
  useEffect(() => {
    const unsub = cosmicAudio.subscribe((isPlaying) => {
      setIsSoundscapePlaying(isPlaying);
    });
    return () => unsub();
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
            { id: 'sudarshan', label: '☸️ Sudarshana & Sacred Chakra Matrix', desc: 'Krishna Chakra & Mantra Vortex' },
            { id: 'galaxy', label: '🌌 Deep Galaxy Warp', desc: 'Nebulae & Relativistic Stars' },
            { id: 'terminal', label: '💻 Cyber Command Console', desc: 'Hacker Shell' },
            { id: 'tune-thrive', label: '✨ Tune & Thrive Vault', desc: 'Frequency Archives' },
            { id: 'vortex', label: '⚡ 3-6-9 Vortex Matrix', desc: 'Tesla Doubling Circuit' },
            { id: 'blackhole', label: '🕳️ Singularity Core', desc: 'Gargantua Event Horizon' },
            { id: 'chakras', label: '🧬 7-Chakra Biofield', desc: 'Neural Overclock' },
            { id: 'etheric', label: '🔮 Wardenclyffe Ether', desc: 'Free Radiant Energy' },
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
        {/* 1. PLANETARY OBSERVATORY (HIGH-DEFINITION MOVIE-REALISTIC 3D PLANETS) */}
        {activeTab === 'planets' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 px-2 text-xs font-mono text-cyan-400/80">
              {/* Mode Switcher */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-black/60 p-1 rounded-xl border border-cyan-500/30">
                  <button
                    onClick={() => {
                      cosmicAudio.playCyberKeystroke();
                      setPlanetViewMode('alignment');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      planetViewMode === 'alignment'
                        ? 'bg-gradient-to-r from-amber-500/30 to-cyan-500/30 border border-amber-400/70 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                        : 'text-cyan-400/70 hover:text-cyan-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>COSMIC ALIGNMENT (ORIGINAL)</span>
                  </button>
                  <button
                    onClick={() => {
                      cosmicAudio.playCyberKeystroke();
                      setPlanetViewMode('orbit');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      planetViewMode === 'orbit'
                        ? 'bg-cyan-500/30 border border-cyan-400/70 text-cyan-100 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                        : 'text-cyan-400/70 hover:text-cyan-200'
                    }`}
                  >
                    <Orbit className="w-3.5 h-3.5 text-cyan-300" />
                    <span>3D ORBIT FOCUS</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('sudarshan')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/50 rounded-xl text-amber-200 uppercase font-bold transition-all shadow-[0_0_12px_rgba(251,191,36,0.3)]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>SUDARSHAN CHAKRA HUB</span>
                </button>
                <button
                  onClick={() => setIsDetailModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 rounded-xl text-cyan-200 uppercase font-bold transition-all shadow-[0_0_12px_rgba(0,243,255,0.2)]"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>DOSSIER: {selectedBody.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>

            {planetViewMode === 'alignment' ? (
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

        {/* 6. BLACK HOLE SINGULARITY PORTAL */}
        {activeTab === 'blackhole' && (
          <div className="space-y-6">
            <BlackHolePortalCore />
          </div>
        )}

        {/* 7. 7-CHAKRA BIOFIELD OVERCLOCK */}
        {activeTab === 'chakras' && (
          <div className="space-y-6">
            <ChakraEnergyScanner />
          </div>
        )}

        {/* 8. WARDENCLYFFE ETHER GENERATOR */}
        {activeTab === 'etheric' && (
          <div className="bg-[#050b18]/90 border border-cyan-500/30 rounded-2xl p-6 font-mono space-y-6">
            <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-4">
              <Compass className="w-6 h-6 text-cyan-400 animate-pulse" />
              <div>
                <h2 className="text-lg font-bold text-cyan-100">WARDENCLYFFE WIRELESS RADIANT ETHER TRANSMITTER</h2>
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
                  className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-bold rounded-lg text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)]"
                >
                  TRANSMIT RADIANT SCALAR WAVE (7.83 HZ)
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
    </>
  );
};
