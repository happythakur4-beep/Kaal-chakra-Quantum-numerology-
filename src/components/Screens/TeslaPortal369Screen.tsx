import React, { useState } from 'react';
import { ThemeMode, CelestialBodyData, TeslaVortexNode, UserProfile } from '../../types';
import { CELESTIAL_BODIES_DATA, TESLA_VORTEX_NODES } from '../../data/teslaPortalData';
import { AnimatedCosmicUniversePortal } from '../Tesla369/AnimatedCosmicUniversePortal';
import { SpaceTravelWarpEngine } from '../Tesla369/SpaceTravelWarpEngine';
import { DeepPortalViewer } from '../Tesla369/DeepPortalViewer';
import { BlackHolePortalCore } from '../Tesla369/BlackHolePortalCore';
import { TeslaVortexModal } from '../Tesla369/TeslaVortexModal';
import { TuneAndThrivePortal } from '../Tesla369/TuneAndThrivePortal';
import { HubbleGalaxiesPortal } from '../Tesla369/HubbleGalaxiesPortal';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import {
  Sparkles,
  Zap,
  Orbit,
  Compass,
  Radio,
  Volume2,
  FastForward,
  Search,
  ChevronRight,
  RefreshCw,
  Eye,
  Activity,
  Telescope,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface TeslaPortal369ScreenProps {
  theme: ThemeMode;
  user?: UserProfile;
  onTriggerBlackHoleWarp?: () => void;
}

type PortalViewTab = 'animated-universe' | 'hubble-galaxies' | 'tune-thrive' | 'blackhole' | 'vortex' | 'frequencies' | 'etheric' | 'calculator';

export const TeslaPortal369Screen: React.FC<TeslaPortal369ScreenProps> = ({
  theme,
  user,
  onTriggerBlackHoleWarp,
}) => {
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<PortalViewTab>('animated-universe');
  const [selectedBody, setSelectedBody] = useState<CelestialBodyData | null>(null);
  const [warpOrigin, setWarpOrigin] = useState<CelestialBodyData | null>(null);
  const [warpDestination, setWarpDestination] = useState<CelestialBodyData | null>(null);
  const [isWarpTraveling, setIsWarpTraveling] = useState(false);
  const [selectedVortexNode, setSelectedVortexNode] = useState<TeslaVortexNode | null>(null);
  const [activeFrequencyPlaying, setActiveFrequencyPlaying] = useState<number | null>(null);

  // Play Solfeggio or Planetary tone
  const handlePlayFreq = (freq: number) => {
    setActiveFrequencyPlaying(freq);
    cosmicAudio.playTeslaFrequency(freq, 3);
    try {
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#22d3ee', '#ec4899', '#a855f7'],
      });
    } catch {}
    setTimeout(() => setActiveFrequencyPlaying(null), 3000);
  };

  // Trigger space travel warp between bodies
  const handleInitiateSpaceTravel = (destBody: CelestialBodyData) => {
    setWarpOrigin(selectedBody);
    setWarpDestination(destBody);
    setSelectedBody(null);
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

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2 pb-24 space-y-6 select-none">
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
      {selectedBody && !isWarpTraveling && (
        <DeepPortalViewer
          body={selectedBody}
          allBodies={CELESTIAL_BODIES_DATA}
          user={user}
          onClose={() => setSelectedBody(null)}
          onTravelTo={(target) => handleInitiateSpaceTravel(target)}
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

      {/* Mode Navigation Tabs */}
      <div className="flex items-center justify-center sm:justify-start gap-2 border-b border-amber-500/20 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'animated-universe', label: '🌌 Full-Screen Animated Universe', icon: <Orbit className="w-4 h-4" /> },
          { id: 'hubble-galaxies', label: '🔭 Hubble Galaxies Focus (NASA PDF)', icon: <Telescope className="w-4 h-4 text-cyan-400" /> },
          { id: 'tune-thrive', label: '✨ Tune & Thrive Frequency Archive', icon: <Sparkles className="w-4 h-4 text-[#ffd700]" /> },
          { id: 'blackhole', label: '🕳️ Black Hole Singularity Portal', icon: <Compass className="w-4 h-4" /> },
          { id: 'vortex', label: '⚡ 3-6-9 Tesla Vortex Matrix', icon: <Zap className="w-4 h-4" /> },
          { id: 'frequencies', label: '🎼 Cosmic Octave & Sound Harmonics', icon: <Radio className="w-4 h-4" /> },
          { id: 'etheric', label: '🔮 Free Energy & Wardenclyffe Ether', icon: <Compass className="w-4 h-4" /> },
          { id: 'calculator', label: '✨ 3-6-9 Manifestation & Code', icon: <Sparkles className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as PortalViewTab)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-cinzel font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-amber-500/25 via-purple-500/20 to-cyan-500/25 text-[#ffd700] border border-[#ffd700]/70 shadow-[0_0_20px_rgba(255,215,0,0.3)]'
                : 'text-gray-400 hover:text-gray-200 bg-black/40 border border-white/10'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 1. PRIMARY ANIMATED UNIVERSE: ALL INFORMATION EMBEDDED DIRECTLY IN THE LIVING ANIMATION */}
      {activeTab === 'animated-universe' && (
        <div className="space-y-4">
          <AnimatedCosmicUniversePortal
            theme={theme}
            onEnterBlackHoleWarp={() => setActiveTab('blackhole')}
          />
        </div>
      )}

      {/* 2. HUBBLE FOCUS: GALAXIES THROUGH SPACE AND TIME (NASA PDF VAULT) */}
      {activeTab === 'hubble-galaxies' && (
        <div className="space-y-6">
          <HubbleGalaxiesPortal
            theme={theme}
            onNavigateToBlackHole={() => setActiveTab('blackhole')}
          />
        </div>
      )}

      {/* 2. TUNE & THRIVE FREQUENCY ARCHIVE (SCREENSHOT KNOWLEDGE VAULT) */}
      {activeTab === 'tune-thrive' && (
        <div className="space-y-6">
          <TuneAndThrivePortal />
        </div>
      )}

      {/* 2. TAB VIEW: 🕳️ BLACK HOLE SINGULARITY PORTAL */}
      {activeTab === 'blackhole' && (
        <div className="space-y-6">
          <BlackHolePortalCore
            onEnterSolarOrrery={() => setActiveTab('animated-universe')}
            onSelectCelestialBody={(body) => handleInitiateSpaceTravel(body)}
            celestialBodies={CELESTIAL_BODIES_DATA}
            onOpenDoublingMatrix={() => setActiveTab('vortex')}
          />
        </div>
      )}

      {/* 3. TAB VIEW: ⚡ 3-6-9 TESLA VORTEX MATRIX */}
      {activeTab === 'vortex' && (
        <div className="space-y-6">
          <div className="relative rounded-3xl p-6 sm:p-8 border border-[#ffd700]/40 bg-gradient-to-b from-[#15102a] via-[#090814] to-black shadow-2xl space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="px-3.5 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-mono uppercase tracking-widest">
                VORTEX MATHEMATICS & THE DIVINE CODE
              </span>
              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#fdf2d1]">
                The Sacred 1-2-4-8-7-5 Doubling Circuit & 3-6-9 Flux
              </h3>
              <p className="text-xs sm:text-sm font-serif text-gray-300 leading-relaxed">
                Click any of the 9 sacred vortex nodes below to inspect its frequency harmonic, mathematical digital root proof, and Vedic parallels.
              </p>
            </div>

            {/* 9 Vortex Nodes Interactive Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TESLA_VORTEX_NODES.map((node) => (
                <motion.div
                  key={node.number}
                  whileHover={{ scale: 1.03, y: -3 }}
                  onClick={() => setSelectedVortexNode(node)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    node.isDivineTrinity
                      ? 'bg-gradient-to-br from-amber-950/60 via-purple-950/50 to-black/80 border-[#ffd700]/70 shadow-[0_0_20px_rgba(255,215,0,0.25)]'
                      : 'bg-black/60 border-white/15 hover:border-amber-400/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-mono font-black text-lg text-black border border-white/50 shadow"
                      style={{ backgroundColor: node.color }}
                    >
                      {node.number}
                    </div>

                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        node.isDivineTrinity
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                          : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      {node.isDivineTrinity ? 'Divine Trinity' : 'Physical Circuit'}
                    </span>
                  </div>

                  <div className="py-3">
                    <h4 className="text-sm font-cinzel font-bold text-[#fdf2d1]">{node.solfeggioTitle}</h4>
                    <span className="text-xs font-mono text-cyan-300 font-bold mt-0.5 block">
                      {node.frequencyHz} Hz Frequency
                    </span>
                    <p className="text-xs font-serif text-gray-300 line-clamp-2 mt-2 leading-relaxed">
                      {node.vortexMeaning}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-amber-300">
                    <span>Inspect Sacred Node</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB VIEW: 🎼 COSMIC OCTAVE & SOUND HARMONICS */}
      {activeTab === 'frequencies' && (
        <div className="space-y-6">
          <div className="rounded-3xl p-6 sm:p-8 border border-cyan-500/30 bg-black/70 shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <Radio className="w-6 h-6 text-cyan-400" />
              <div>
                <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-[#fdf2d1]">
                  Hans Cousto Cosmic Octave & Solfeggio Scale
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  Planetary revolutions octave-transposed into audible acoustic soundwaves.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CELESTIAL_BODIES_DATA.map((body) => (
                <div
                  key={body.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-mono text-amber-300 uppercase block">{body.name}</span>
                    <span className="text-base font-cinzel font-bold text-white">
                      {body.vibrationalFrequencyHz} Hz
                    </span>
                    <span className="text-[11px] text-gray-400 block">{body.solfeggioKey}</span>
                  </div>
                  <button
                    onClick={() => handlePlayFreq(body.vibrationalFrequencyHz)}
                    className="p-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/40 border border-amber-400/50 text-amber-300 transition-all cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB VIEW: 🔮 FREE ENERGY & WARDENCLYFFE ETHER */}
      {activeTab === 'etheric' && (
        <div className="space-y-6">
          <div className="rounded-3xl p-6 sm:p-8 border border-purple-500/30 bg-black/70 shadow-2xl space-y-4">
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-[#fdf2d1]">
              Nikola Tesla's Radiant Ether & Wireless Power Physics
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Nikola Tesla's Wardenclyffe Tower in Shoreham, New York, was designed to transmit electrical energy through the Earth's natural resonant cavity without wires, utilizing the 8 Hz Schumann resonance and the Earth's conductive core.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-400/30">
                <h4 className="text-sm font-cinzel font-bold text-amber-300">Etheric Capacitor</h4>
                <p className="text-xs text-gray-300 mt-1">Zero-point radiant energy tap through high-voltage spark coils.</p>
              </div>
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-400/30">
                <h4 className="text-sm font-cinzel font-bold text-cyan-300">Schumann Coupling</h4>
                <p className="text-xs text-gray-300 mt-1">Earth cavity oscillation at fundamental 7.83 Hz electromagnetic pulse.</p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-400/30">
                <h4 className="text-sm font-cinzel font-bold text-amber-300">Toroidal Resonance</h4>
                <p className="text-xs text-gray-300 mt-1">Self-sustaining magnetic field topology obeying 3-6-9 vortex vector lines.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB VIEW: ✨ 3-6-9 MANIFESTATION & CODE */}
      {activeTab === 'calculator' && (
        <div className="space-y-6">
          <div className="rounded-3xl p-6 sm:p-8 border border-amber-500/40 bg-black/70 shadow-2xl space-y-4">
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-[#fdf2d1]">
              3-6-9 Cosmic Digital Root Calculator
            </h3>
            <p className="text-sm text-gray-300">
              Calculate any intention, number, or planetary period to discover its reduction to the divine trinity 3, 6, or 9.
            </p>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/40 text-center space-y-2">
              <span className="text-xs font-mono text-amber-300">The 369 Manifestation Rule:</span>
              <p className="text-xs font-serif italic text-amber-100">
                Write your intention 3 times in the morning, 6 times in the afternoon, and 9 times before sleep.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
