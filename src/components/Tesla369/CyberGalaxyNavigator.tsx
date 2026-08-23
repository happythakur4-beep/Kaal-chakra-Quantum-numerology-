import React, { useRef, useEffect, useState } from 'react';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { 
  Compass, 
  Sparkles, 
  Radio, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Activity, 
  Zap, 
  Crosshair,
  Layers,
  Eye,
  Maximize2
} from 'lucide-react';

interface GalaxyObject {
  id: string;
  name: string;
  classification: string;
  distanceLightYears: string;
  constellation: string;
  coreSingularity: string;
  spectralType: string;
  description: string;
  teslaCosmicField: string;
  color: string;
  frequencyHz: number;
}

const GALACTIC_OBJECTS: GalaxyObject[] = [
  {
    id: 'milkyway-core',
    name: 'Milky Way Core (Sagittarius A*)',
    classification: 'Supermassive Black Hole Singularity',
    distanceLightYears: '26,673 Light-Years',
    constellation: 'Sagittarius',
    coreSingularity: '4.15 Million Solar Masses (M☉)',
    spectralType: 'Relativistic X-Ray & Synchrotron Plasma',
    description: 'The gravitational and conscious heart of our galaxy, anchoring 400 billion stars in harmonic orbital equilibrium.',
    teslaCosmicField: 'Tesla designated galactic cores as the central cosmic ether pumps pulsating primary electromagnetic torsion waves.',
    color: '#ffd700',
    frequencyHz: 432,
  },
  {
    id: 'andromeda',
    name: 'Andromeda Galaxy (Messier 31)',
    classification: 'Giant Barred Spiral Galaxy',
    distanceLightYears: '2.537 Million Light-Years',
    constellation: 'Andromeda',
    coreSingularity: 'Dual Nucleus Supermassive Binary',
    spectralType: 'Type SA(s)b Spiral Spectrum',
    description: 'Our monumental sister galaxy containing 1 trillion suns, moving toward mutual gravitational unification at 110 km/s.',
    teslaCosmicField: 'Intergalactic standing waves create mutual entrainment between colliding spirals, generating higher-order Fibonacci harmonics.',
    color: '#38bdf8',
    frequencyHz: 528,
  },
  {
    id: 'pillars-of-creation',
    name: 'Pillars of Creation (Eagle Nebula M16)',
    classification: 'Interstellar Gas & Dust Stellar Nursery',
    distanceLightYears: '6,500 Light-Years',
    constellation: 'Serpens',
    coreSingularity: 'Active Proto-Star Hydrodynamic Jets',
    spectralType: 'Ionized Hydrogen (H-Alpha) & Oxygen-III',
    description: 'Towering spires of cosmic gas and dark interstellar dust sculpting thousands of newborn star systems.',
    teslaCosmicField: 'Proof of radiant cosmic condensation—where pure etheric plasma compresses into physical atomic structures.',
    color: '#f43f5e',
    frequencyHz: 639,
  },
  {
    id: 'carina-nebula',
    name: 'Cosmic Cliffs of Carina (NGC 3372)',
    classification: 'Giant Hyperluminous Diffuse Nebula',
    distanceLightYears: '8,500 Light-Years',
    constellation: 'Carina',
    coreSingularity: 'Eta Carinae Luminous Blue Variable',
    spectralType: 'Extreme Ultraviolet Radiation Front',
    description: 'A colossal stellar cradle spanning over 300 light-years, crowned by hypergiant eruptive stars and iridescent ionized ridges.',
    teslaCosmicField: 'Resonates as the cosmic furnace of high-frequency stellar birth and electric discharge.',
    color: '#a855f7',
    frequencyHz: 852,
  },
  {
    id: 'james-webb-deep',
    name: 'SMACS 0723 Deep Cosmic Field',
    classification: 'Gravitational Lensing Galaxy Cluster',
    distanceLightYears: '13.1 Billion Light-Years (Deep Epoch)',
    constellation: 'Volans',
    coreSingularity: 'Massive Cluster Spacetime Warp Lens',
    spectralType: 'Extreme Redshifted Primordial Photons',
    description: 'A glimpse into the dawn of the universe where spacetime warping bends ancient light into shimmering cosmic arcs.',
    teslaCosmicField: 'The infinite temporal continuum—where past, present, and future oscillate as unified eternal consciousness.',
    color: '#00f3ff',
    frequencyHz: 963,
  },
];

export const CyberGalaxyNavigator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedGalaxy, setSelectedGalaxy] = useState<GalaxyObject>(GALACTIC_OBJECTS[0]);
  const [zoom, setZoom] = useState<number>(1.0);
  const [isWarpActive, setIsWarpActive] = useState<boolean>(false);
  const [spectralFilter, setSpectralFilter] = useState<'visible' | 'infrared' | 'radio'>('visible');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Play Frequency Tone
  const handlePlaySound = (freq: number) => {
    setIsPlayingAudio(true);
    cosmicAudio.playCyberScan();
    setTimeout(() => {
      cosmicAudio.playTeslaFrequency(freq, 3.5);
    }, 100);
    setTimeout(() => setIsPlayingAudio(false), 3600);
  };

  const handleTriggerWarp = () => {
    setIsWarpActive(true);
    cosmicAudio.playCyberWarp();
    setTimeout(() => {
      setIsWarpActive(false);
    }, 2800);
  };

  // Canvas Galaxy Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Generate Galaxy Particles
    const numArms = 2;
    const particlesPerArm = 900;
    const particles: Array<{
      dist: number;
      angle: number;
      speed: number;
      size: number;
      color: string;
      armIndex: number;
      z: number;
    }> = [];

    const colors = ['#ffffff', '#00f3ff', '#38bdf8', '#ffd700', '#ec4899', '#a855f7'];

    for (let arm = 0; arm < numArms; arm++) {
      for (let i = 0; i < particlesPerArm; i++) {
        const dist = Math.pow(Math.random(), 1.8) * 380;
        const spiralAngle = (dist * 0.015) + (arm * Math.PI) + (Math.random() - 0.5) * 0.45;
        particles.push({
          dist,
          angle: spiralAngle,
          speed: (1 / (dist + 30)) * 0.6 + 0.0005,
          size: Math.random() * 2.2 + 0.6,
          color: colors[Math.floor(Math.random() * colors.length)],
          armIndex: arm,
          z: (Math.random() - 0.5) * 40,
        });
      }
    }

    const render = () => {
      time += 0.016;
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      // Dark Void background
      ctx.fillStyle = '#02040a';
      ctx.fillRect(0, 0, width, height);

      // Deep Space background nebulosity
      const bgGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, Math.max(width, height) * 0.6);
      if (spectralFilter === 'visible') {
        bgGrad.addColorStop(0, 'rgba(255, 215, 0, 0.15)');
        bgGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.08)');
        bgGrad.addColorStop(0.7, 'rgba(168, 85, 247, 0.04)');
      } else if (spectralFilter === 'infrared') {
        bgGrad.addColorStop(0, 'rgba(244, 63, 94, 0.2)');
        bgGrad.addColorStop(0.4, 'rgba(234, 88, 12, 0.1)');
        bgGrad.addColorStop(0.8, 'rgba(120, 53, 15, 0.05)');
      } else {
        // Radio / Cymatics
        bgGrad.addColorStop(0, 'rgba(0, 243, 255, 0.25)');
        bgGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.1)');
        bgGrad.addColorStop(0.9, 'transparent');
      }
      bgGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(cx, cy);

      // Warp stretch effect if active
      if (isWarpActive) {
        ctx.scale(zoom * (1 + Math.sin(time * 8) * 0.4), zoom * (1 + Math.sin(time * 8) * 0.4));
      } else {
        ctx.scale(zoom, zoom);
      }

      // Draw Rotating Spiral Galaxy Core
      const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 75);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.3, selectedGalaxy.color);
      coreGrad.addColorStop(0.7, `${selectedGalaxy.color}66`);
      coreGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 75, 0, Math.PI * 2);
      ctx.fill();

      // Render Galaxy Arm Particles
      particles.forEach((p) => {
        p.angle += p.speed * (isWarpActive ? 4 : 1);
        const px = Math.cos(p.angle) * p.dist;
        const py = Math.sin(p.angle) * (p.dist * 0.55); // Perspective inclination

        ctx.fillStyle = spectralFilter === 'infrared' ? '#f43f5e' : (spectralFilter === 'radio' ? '#00f3ff' : p.color);
        ctx.globalAlpha = Math.min(1.0, (1 - p.dist / 400) * 0.9 + 0.15);
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Warp speed streaks
        if (isWarpActive) {
          ctx.strokeStyle = '#00f3ff';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px * 1.3, py * 1.3);
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1.0;

      // Cyber Grid Overlays
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.1)';
      ctx.lineWidth = 1;
      [120, 240, 360].forEach((r) => {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [selectedGalaxy, zoom, isWarpActive, spectralFilter]);

  // Resize canvas smoothly to match parent
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full flex flex-col lg:flex-row gap-4 bg-[#030712] border border-cyan-500/30 rounded-2xl overflow-hidden p-4 select-none">
      {/* Left: Interactive Canvas Galaxy View */}
      <div className="relative flex-1 min-h-[480px] lg:min-h-[620px] bg-black rounded-xl overflow-hidden border border-cyan-900/50">
        {/* Top HUD */}
        <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between gap-2 px-3 py-2 bg-[#050914]/90 backdrop-blur-md rounded-lg border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-bold text-cyan-100">{selectedGalaxy.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSpectralFilter('visible')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                spectralFilter === 'visible' ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400' : 'text-cyan-500/70 hover:text-cyan-300'
              }`}
            >
              OPTICAL
            </button>
            <button
              onClick={() => setSpectralFilter('infrared')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                spectralFilter === 'infrared' ? 'bg-rose-500/30 text-rose-200 border border-rose-400' : 'text-cyan-500/70 hover:text-cyan-300'
              }`}
            >
              INFRARED
            </button>
            <button
              onClick={() => setSpectralFilter('radio')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                spectralFilter === 'radio' ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400' : 'text-cyan-500/70 hover:text-cyan-300'
              }`}
            >
              RADIO
            </button>
          </div>
        </div>

        <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />

        {/* Bottom Zoom & Warp Controls */}
        <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between gap-2 px-3 py-2 bg-[#050914]/90 backdrop-blur-md rounded-lg border border-cyan-500/30 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.2, 0.5))}
              className="p-1 text-cyan-400 hover:text-cyan-200 bg-black/40 rounded border border-cyan-800"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-cyan-300">{zoom.toFixed(1)}x</span>
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.2, 3.0))}
              className="p-1 text-cyan-400 hover:text-cyan-200 bg-black/40 rounded border border-cyan-800"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleTriggerWarp}
            disabled={isWarpActive}
            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-bold rounded text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{isWarpActive ? 'WARP ENGAGED...' : 'RELATIVISTIC WARP'}</span>
          </button>
        </div>
      </div>

      {/* Right: Deep Galactic Telemetry & Object Dossier */}
      <div className="w-full lg:w-96 flex flex-col gap-3 font-mono">
        {/* Galaxy Selector List */}
        <div className="space-y-1.5">
          <div className="text-xs uppercase text-cyan-400/80 font-bold tracking-wider px-1">
            [SELECT DEEP SPACE SECTOR]
          </div>
          <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto no-scrollbar">
            {GALACTIC_OBJECTS.map((g) => {
              const isSelected = g.id === selectedGalaxy.id;
              return (
                <button
                  key={g.id}
                  onClick={() => {
                    cosmicAudio.playCyberKeystroke();
                    setSelectedGalaxy(g);
                  }}
                  className={`flex items-center justify-between p-2 rounded-lg text-left text-xs transition-all border ${
                    isSelected
                      ? 'bg-cyan-950/70 border-cyan-400 text-cyan-100 shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                      : 'bg-[#050b18]/60 hover:bg-cyan-950/40 border-cyan-900/30 text-cyan-400/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: g.color, boxShadow: `0 0 6px ${g.color}` }}
                    />
                    <span className="font-semibold">{g.name.split('(')[0]}</span>
                  </div>
                  <span className="text-[10px] text-cyan-500">{g.distanceLightYears.split(' ')[0]} LY</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Deep Telemetry HUD Box */}
        <div className="flex-1 bg-[#050914]/90 border border-cyan-500/30 rounded-xl p-3.5 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
            <span className="text-cyan-400 uppercase font-bold tracking-wider">[CLASSIFIED DOSSIER]</span>
            <button
              onClick={() => handlePlaySound(selectedGalaxy.frequencyHz)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
                isPlayingAudio
                  ? 'bg-amber-500/30 border-amber-400 text-amber-200 animate-pulse'
                  : 'bg-cyan-950/60 border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/60'
              }`}
            >
              <Radio className="w-3 h-3" />
              <span>{selectedGalaxy.frequencyHz} Hz HARMONIC</span>
            </button>
          </div>

          <div className="space-y-2 text-[11px]">
            <div>
              <span className="text-cyan-500">TYPE: </span>
              <span className="text-cyan-200">{selectedGalaxy.classification}</span>
            </div>
            <div>
              <span className="text-cyan-500">DISTANCE: </span>
              <span className="text-cyan-200">{selectedGalaxy.distanceLightYears}</span>
            </div>
            <div>
              <span className="text-cyan-500">CORE MASS: </span>
              <span className="text-amber-300">{selectedGalaxy.coreSingularity}</span>
            </div>
            <div>
              <span className="text-cyan-500">SPECTRAL SIGNATURE: </span>
              <span className="text-cyan-200">{selectedGalaxy.spectralType}</span>
            </div>
          </div>

          <div className="bg-black/50 p-2.5 rounded border border-cyan-900/50 space-y-1.5 text-[11px] text-cyan-300/90 leading-relaxed">
            <div className="text-cyan-400 font-bold uppercase text-[10px]">[ASTROPHYSICS PROFILE]</div>
            <p>{selectedGalaxy.description}</p>
          </div>

          <div className="bg-amber-950/20 p-2.5 rounded border border-amber-500/30 space-y-1.5 text-[11px] text-amber-200/90 leading-relaxed">
            <div className="text-amber-400 font-bold uppercase text-[10px]">[TESLA COSMIC ETHER HARMONIC]</div>
            <p>{selectedGalaxy.teslaCosmicField}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
