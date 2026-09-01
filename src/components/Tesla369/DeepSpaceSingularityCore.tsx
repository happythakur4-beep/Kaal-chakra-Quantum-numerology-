import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Sparkles, 
  FastForward, 
  Rewind, 
  RotateCcw, 
  Layers, 
  Eye, 
  Zap, 
  Volume2, 
  VolumeX, 
  Clock, 
  Globe, 
  Radio, 
  Sliders, 
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { RealisticBlackHoleInfall } from './RealisticBlackHoleInfall';
import confetti from 'canvas-confetti';

interface EpochTimeline {
  id: string;
  name: string;
  hindiName: string;
  era: string;
  dilationFactor: string;
  quantumFluxHz: number;
  description: string;
  color: string;
  starColor: string;
  bgGrad: string;
}

const COSMIC_EPOCHS: EpochTimeline[] = [
  {
    id: 'satya-yuga',
    name: 'Satya Yuga (Golden Age)',
    hindiName: 'सत्य युग (स्वर्ण काल)',
    era: '3.89 Million BCE',
    dilationFactor: '0.001x (Near-Infinite Stillness)',
    quantumFluxHz: 963,
    description: 'Pristine 100% Dharma alignment. Pure golden cosmic prana radiates across the spacetime continuum.',
    color: '#ffd700',
    starColor: '#fef08a',
    bgGrad: 'rgba(50, 35, 0, 0.4)',
  },
  {
    id: 'treta-yuga',
    name: 'Treta Yuga (Solar Matrix)',
    hindiName: 'त्रेता युग (सूर्य वंश)',
    era: '1.29 Million BCE',
    dilationFactor: '0.05x (Expanded Longevity)',
    quantumFluxHz: 852,
    description: 'Solar dynasties, sacred yajnas, and heightened telepathic resonance across planetary grids.',
    color: '#fb923c',
    starColor: '#fed7aa',
    bgGrad: 'rgba(40, 20, 5, 0.4)',
  },
  {
    id: 'dvapara-yuga',
    name: 'Dvapara Yuga (Krishna Avatar)',
    hindiName: 'द्वापर युग (सुदर्शन काल)',
    era: '3102 BCE',
    dilationFactor: '0.25x (Quantum Transition)',
    quantumFluxHz: 639,
    description: 'Kurukshetra battlefield, Sudarshana Chakra manifestation, and deep cosmic knowledge transfer.',
    color: '#00f3ff',
    starColor: '#93c5fd',
    bgGrad: 'rgba(0, 30, 50, 0.4)',
  },
  {
    id: 'tesla-1899',
    name: 'Tesla Colorado Springs 1899',
    hindiName: 'निकोला टेस्ला ईथर युग',
    era: '1899 CE',
    dilationFactor: '1.0x (Modern Physical Domain)',
    quantumFluxHz: 528,
    description: 'Nikola Tesla uncovers standing planetary ether waves and 3-6-9 non-physical vortex mathematics.',
    color: '#c084fc',
    starColor: '#e9d5ff',
    bgGrad: 'rgba(30, 0, 50, 0.4)',
  },
  {
    id: 'current-nexus',
    name: 'Current Quantum Portal 2026',
    hindiName: 'वर्तमान कॉस्मिक संगम 2026',
    era: 'Present 2026 CE',
    dilationFactor: '1.0x (Earth Standard)',
    quantumFluxHz: 432,
    description: 'Kaal Chakra convergence combining ancient Vedic Siddha Shastras with quantum computing.',
    color: '#38bdf8',
    starColor: '#ffffff',
    bgGrad: 'rgba(0, 20, 40, 0.4)',
  },
  {
    id: 'kardashev-3',
    name: 'Galactic Core Singularity 12,000 CE',
    hindiName: 'महान आकाशगंगा केंद्र 12,000',
    era: '12,000 CE (Future Epoch)',
    dilationFactor: '144,000x (Extreme Time Warp)',
    quantumFluxHz: 108,
    description: 'Type-III interstellar civilisation harnessing zero-point energy and hyper-dimensional wormhole gates.',
    color: '#10b981',
    starColor: '#a7f3d0',
    bgGrad: 'rgba(0, 40, 30, 0.4)',
  },
];

export const DeepSpaceSingularityCore: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedEpoch, setSelectedEpoch] = useState<EpochTimeline>(COSMIC_EPOCHS[4]); // Present 2026
  const [lensStrength, setLensStrength] = useState<number>(1.2); // 0.2 to 2.5
  const [singularityRadiusRs, setSingularityRadiusRs] = useState<number>(3.5); // Multiplier of Schwarzschild radius
  const [isQuantumFluxSync, setIsQuantumFluxSync] = useState(true);
  const [isTimeTraveling, setIsTimeTraveling] = useState(false);
  const [isDivingInfall, setIsDivingInfall] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(true);
  const [singularityOffset, setSingularityOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDraggingSingularity, setIsDraggingSingularity] = useState(false);

  // Time Dilation calculation based on General Relativity: t' = t * sqrt(1 - 1/r)
  const safeR = Math.max(1.05, singularityRadiusRs);
  const relativisticFactor = Math.sqrt(1 - 1 / safeR);
  const dilationRatio = (1 / Math.max(0.001, relativisticFactor)).toFixed(2);

  // Handle Epoch Time-Travel Leap
  const handleJumpEpoch = (epoch: EpochTimeline) => {
    setIsTimeTraveling(true);
    setSelectedEpoch(epoch);
    try {
      cosmicAudio.playCyberWarp();
      confetti({
        particleCount: 30,
        spread: 80,
        origin: { y: 0.6 },
        colors: [epoch.color, '#ffffff', '#00f3ff'],
      });
    } catch {}

    setTimeout(() => {
      setIsTimeTraveling(false);
      try {
        cosmicAudio.playPlanetTone(epoch.quantumFluxHz);
      } catch {}
    }, 1200);
  };

  // Main Gravitational Lensing & Quantum Singularity Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = Math.max(560, canvas.parentElement.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Deep Stellar Field with warped ray deflection coordinates
    interface BackgroundStar {
      origX: number;
      origY: number;
      z: number;
      size: number;
      color: string;
      twinkleOffset: number;
    }

    const stars: BackgroundStar[] = [];
    const numStars = 500;
    for (let i = 0; i < numStars; i++) {
      stars.push({
        origX: (Math.random() - 0.5) * width * 1.8,
        origY: (Math.random() - 0.5) * height * 1.8,
        z: Math.random() * 0.8 + 0.2,
        size: Math.random() * 2 + 0.6,
        color: Math.random() > 0.4 ? selectedEpoch.starColor : '#ffffff',
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // Accretion Relativistic Hot Plasma Particles
    interface AccretionStreamParticle {
      dist: number;
      angle: number;
      speed: number;
      size: number;
      tempColor: string;
      trailAlpha: number;
    }

    const accretionParticles: AccretionStreamParticle[] = [];
    const numAccretion = 260;
    const plasmaColors = ['#ffffff', '#ffd700', selectedEpoch.color, '#ef4444', '#00f3ff'];

    for (let i = 0; i < numAccretion; i++) {
      accretionParticles.push({
        dist: Math.random() * 240 + 35,
        angle: Math.random() * Math.PI * 2,
        speed: (0.012 + (1 / Math.sqrt(Math.random() * 150 + 30)) * 0.12),
        size: Math.random() * 2.8 + 0.8,
        tempColor: plasmaColors[Math.floor(Math.random() * plasmaColors.length)],
        trailAlpha: Math.random() * 0.7 + 0.3,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.025;

      // Dark space background with epoch tint
      ctx.fillStyle = '#01040a';
      ctx.fillRect(0, 0, width, height);

      // Epoch Background Ambience Glow
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, Math.max(width, height) * 0.75);
      bgGrad.addColorStop(0, selectedEpoch.bgGrad);
      bgGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const bhCenterX = width / 2 + singularityOffset.x;
      const bhCenterY = height / 2 + singularityOffset.y;
      const eventHorizonR = Math.min(width, height) * 0.12 * (1 / Math.sqrt(safeR * 0.3));
      const einsteinRingR = eventHorizonR * 2.2 * lensStrength;

      // Quantum Flux Oscillation Factor (3-6-9 Harmonic breathing)
      const fluxPulse = isQuantumFluxSync 
        ? 1 + Math.sin(time * (selectedEpoch.quantumFluxHz / 120)) * 0.06 
        : 1;

      // =========================================================================
      // 1. GRAVITATIONAL LENSING RAYMARCHING DEFLECTION OF BACKGROUND STARS
      // Light from background stars bends around the singularity according to Einstein angle: theta ~ 4GM / (c^2 * b)
      // =========================================================================
      stars.forEach((star) => {
        const dx = star.origX + width / 2 - bhCenterX;
        const dy = star.origY + height / 2 - bhCenterY;
        const dist = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);

        if (dist < eventHorizonR * 0.95) {
          // Inside the Black Hole Event Horizon Shadow - Completely Extinguished
          return;
        }

        // Deflection calculation
        const deflection = (einsteinRingR * einsteinRingR) / Math.max(20, dist);
        const warpedDist = dist + deflection * 0.85;
        const warpedX = bhCenterX + Math.cos(angle) * warpedDist;
        const warpedY = bhCenterY + Math.sin(angle) * warpedDist;

        // Gravitational Blue/Red Shift & Einstein Arc Stretching
        const isNearEinsteinRing = Math.abs(dist - einsteinRingR) < 30;
        const starAlpha = Math.min(1, Math.max(0.1, Math.sin(time * 3 + star.twinkleOffset) * 0.3 + 0.7));

        ctx.save();
        ctx.beginPath();
        if (isNearEinsteinRing) {
          // Stretch star into a miniature luminous gravitational arc
          ctx.ellipse(warpedX, warpedY, star.size * 3.5, star.size * 0.9, angle + Math.PI / 2, 0, Math.PI * 2);
          ctx.fillStyle = selectedEpoch.color;
          ctx.shadowColor = selectedEpoch.color;
          ctx.shadowBlur = 10;
        } else {
          ctx.arc(warpedX, warpedY, star.size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
        }
        ctx.globalAlpha = starAlpha;
        ctx.fill();
        ctx.restore();
      });

      ctx.save();
      ctx.translate(bhCenterX, bhCenterY);

      // =========================================================================
      // 2. PHOTON SPHERE & EINSTEIN RING LUMINESCENT HALO (Gravitational Lensing)
      // =========================================================================
      const photonSphereR = eventHorizonR * 1.5 * fluxPulse;

      const haloGrad = ctx.createRadialGradient(0, 0, eventHorizonR * 0.98, 0, 0, photonSphereR * 2.8 * lensStrength);
      haloGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      haloGrad.addColorStop(0.2, selectedEpoch.color);
      haloGrad.addColorStop(0.5, 'rgba(239, 68, 68, 0.35)');
      haloGrad.addColorStop(0.8, 'rgba(0, 243, 255, 0.15)');
      haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(0, 0, photonSphereR * 2.8 * lensStrength, 0, Math.PI * 2);
      ctx.fill();

      // =========================================================================
      // 3. UPPER BENT ACCRETION DISK (Gravitational Lensing Light Arch over Pole)
      // =========================================================================
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(0, -eventHorizonR * 0.45, eventHorizonR * 2.8 * lensStrength, eventHorizonR * 1.4 * lensStrength, 0, Math.PI, 0);
      const upperArchGrad = ctx.createLinearGradient(-eventHorizonR * 2, 0, eventHorizonR * 2, 0);
      upperArchGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)'); // Doppler Beaming (Approaching Side)
      upperArchGrad.addColorStop(0.5, selectedEpoch.color);
      upperArchGrad.addColorStop(1, 'rgba(239, 68, 68, 0.25)'); // Redshift (Receding Side)
      ctx.strokeStyle = upperArchGrad;
      ctx.lineWidth = eventHorizonR * 0.75;
      ctx.shadowColor = selectedEpoch.color;
      ctx.shadowBlur = 25;
      ctx.stroke();
      ctx.restore();

      // =========================================================================
      // 4. EQUATORIAL ACCRETION DISK (High-Speed Relativistic Plasma Stream)
      // =========================================================================
      accretionParticles.forEach((p) => {
        p.angle += p.speed * (1 / (p.dist / 80));
        const px = Math.cos(p.angle) * p.dist * lensStrength;
        const py = Math.sin(p.angle) * p.dist * 0.35 * lensStrength; // Inclined Disk

        // Relativistic Doppler beaming brightness multiplier (Left side moves toward observer)
        const isApproaching = Math.sin(p.angle) < 0;
        const dopplerBrightness = isApproaching ? 1.5 : 0.45;

        ctx.beginPath();
        ctx.arc(px, py, p.size * (isApproaching ? 1.3 : 0.8), 0, Math.PI * 2);
        ctx.fillStyle = p.tempColor;
        ctx.globalAlpha = Math.min(1, p.trailAlpha * dopplerBrightness);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // =========================================================================
      // 5. EVENT HORIZON ABSOLUTE BLACK SHADOW (The Singularity Void)
      // =========================================================================
      ctx.beginPath();
      ctx.arc(0, 0, eventHorizonR * fluxPulse, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Inner Singularity Quantum Throat Ring
      ctx.beginPath();
      ctx.arc(0, 0, eventHorizonR * 1.02 * fluxPulse, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // =========================================================================
      // 6. QUANTUM FLUX SYNCHRONIZED CHRONO-VORTEX (3-6-9 Sacred Spiral)
      // =========================================================================
      if (isQuantumFluxSync) {
        ctx.save();
        ctx.rotate(-time * 1.2);
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 6; a += 0.1) {
          const r = (a / (Math.PI * 6)) * (eventHorizonR * 0.9);
          const sx = Math.cos(a) * r;
          const sy = Math.sin(a) * r;
          if (a === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `${selectedEpoch.color}88`;
        ctx.lineWidth = 1.8;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [selectedEpoch, lensStrength, safeR, isQuantumFluxSync, singularityOffset]);

  // Handle Dragging Singularity to inspect warp
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDraggingSingularity(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingSingularity) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setSingularityOffset({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  const handleMouseUp = () => {
    setIsDraggingSingularity(false);
  };

  return (
    <>
      {/* Full Screen Infall Diving Simulation Modal */}
      {isDivingInfall && (
        <RealisticBlackHoleInfall onComplete={() => setIsDivingInfall(false)} />
      )}

      <div className="relative w-full rounded-3xl border-2 border-cyan-500/40 bg-[#01030b] overflow-hidden shadow-[0_0_60px_rgba(0,243,255,0.25)] font-mono">
        {/* Top Header & Quantum Telemetry */}
        <div className="p-4 sm:p-6 bg-[#030816]/95 border-b border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div 
              className="p-3 rounded-2xl border shadow-lg"
              style={{ 
                backgroundColor: `${selectedEpoch.color}20`, 
                borderColor: selectedEpoch.color,
                color: selectedEpoch.color 
              }}
            >
              <Compass className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-xl font-black tracking-wider text-white">
                  DEEP SPACE SINGULARITY & TIME-DISTORTION CORE
                </h3>
                <span 
                  className="px-2 py-0.5 rounded-full border text-[10px] font-bold"
                  style={{ borderColor: selectedEpoch.color, color: selectedEpoch.color }}
                >
                  QUANTUM FLUX SYNC
                </span>
              </div>
              <p className="text-xs text-cyan-400/80">
                Einstein-Rosen spacetime distortion lens & General Relativistic time dilation matrix
              </p>
            </div>
          </div>

          {/* Real-time GR Dilation Telemetry */}
          <div className="flex items-center gap-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-black/70 border border-cyan-500/30 text-right">
              <span className="text-slate-400 block text-[9px]">TIME DILATION FACTOR</span>
              <span className="text-amber-300 font-bold">{dilationRatio}x (Coordinate vs Proper)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/70 border border-cyan-500/30 text-right">
              <span className="text-slate-400 block text-[9px]">ACTIVE EPOCH FLUX</span>
              <span className="font-bold" style={{ color: selectedEpoch.color }}>
                {selectedEpoch.quantumFluxHz} Hz
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Gravitational Lensing Canvas */}
        <div className="relative w-full h-[540px] sm:h-[640px] cursor-grab active:cursor-grabbing select-none">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="w-full h-full block"
          />

          {/* Time-Travel Flash Animation */}
          <AnimatePresence>
            {isTimeTraveling && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white z-20 flex items-center justify-center pointer-events-none"
              >
                <div className="text-center font-mono text-black space-y-2">
                  <div className="text-2xl sm:text-4xl font-black">WARPING SPACE-TIME CONTINUUM...</div>
                  <div className="text-sm font-bold tracking-widest">{selectedEpoch.name.toUpperCase()}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Center Lensing Interaction Prompt */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-1.5 rounded-full bg-black/60 border border-cyan-500/30 backdrop-blur-md text-[11px] text-cyan-300 flex items-center gap-2 shadow-lg">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Click & Drag singularity center to warp background stellar geometry in real-time</span>
          </div>

          {/* Reset Singularity Position Button */}
          {(singularityOffset.x !== 0 || singularityOffset.y !== 0) && (
            <button
              onClick={() => setSingularityOffset({ x: 0, y: 0 })}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-black/70 border border-cyan-400 text-cyan-300 text-xs font-bold hover:bg-cyan-950 flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Center Singularity</span>
            </button>
          )}

          {/* Infall Relativistic Dive Button */}
          <div className="absolute bottom-6 right-6 z-10">
            <button
              onClick={() => {
                cosmicAudio.playCyberWarp();
                setIsDivingInfall(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(244,63,94,0.5)] transition-all cursor-pointer"
            >
              <FastForward className="w-4 h-4 animate-pulse" />
              <span>DIVE INTO EVENT HORIZON</span>
            </button>
          </div>
        </div>

        {/* TIME-TRAVEL EPOCH NAVIGATOR & CHRONO CONTROLS */}
        <div className="p-4 sm:p-6 bg-[#030919]/95 border-t border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-300 uppercase">
                COSMIC EPOCH TIME-WARP SELECTOR:
              </span>
            </div>
            <span className="text-[11px] text-cyan-400/80 font-mono">
              Temporal Coordinates: {selectedEpoch.era}
            </span>
          </div>

          {/* Epoch Selector Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {COSMIC_EPOCHS.map((epoch) => {
              const isSelected = selectedEpoch.id === epoch.id;
              return (
                <button
                  key={epoch.id}
                  onClick={() => handleJumpEpoch(epoch)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                    isSelected
                      ? 'bg-black/90 border-2 shadow-[0_0_20px_rgba(0,243,255,0.4)] scale-105'
                      : 'bg-black/40 border-cyan-900/40 hover:border-cyan-500/60 hover:bg-black/60'
                  }`}
                  style={{ borderColor: isSelected ? epoch.color : undefined }}
                >
                  <div>
                    <div className="text-[9px] font-bold text-slate-400 truncate">{epoch.era}</div>
                    <div 
                      className="text-xs font-bold truncate"
                      style={{ color: isSelected ? epoch.color : '#ffffff' }}
                    >
                      {epoch.name}
                    </div>
                  </div>
                  <div className="text-[9.5px] font-serif text-slate-300 truncate">
                    {epoch.hindiName}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Gravitational Lens & Quantum Flux Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            {/* 1. Gravitational Lens Deflection Slider */}
            <div className="p-3.5 rounded-2xl bg-black/60 border border-cyan-900/50 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Eye className="w-3.5 h-3.5" />
                  Lensing Warp Power
                </span>
                <span className="font-bold text-cyan-300">{lensStrength.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.4"
                max="2.4"
                step="0.1"
                value={lensStrength}
                onChange={(e) => setLensStrength(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                <span>Mild Deflection</span>
                <span>Einstein Ring</span>
                <span>Extreme Warp</span>
              </div>
            </div>

            {/* 2. Proximity to Event Horizon (Time Dilation Control) */}
            <div className="p-3.5 rounded-2xl bg-black/60 border border-cyan-900/50 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Radio className="w-3.5 h-3.5 text-amber-400" />
                  Singularity Proximity ({singularityRadiusRs.toFixed(1)} Rs)
                </span>
                <span className="font-bold text-amber-300">{dilationRatio}x Dilation</span>
              </div>
              <input
                type="range"
                min="1.1"
                max="8.0"
                step="0.1"
                value={singularityRadiusRs}
                onChange={(e) => setSingularityRadiusRs(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                <span>Near Event Horizon</span>
                <span>Stable Orbit</span>
                <span>Far Field</span>
              </div>
            </div>

            {/* 3. Quantum Flux 3-6-9 Harmonic Synchronization */}
            <div className="p-3.5 rounded-2xl bg-black/60 border border-cyan-900/50 space-y-2 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  3-6-9 Quantum Flux Sync
                </span>
                <span className="font-bold" style={{ color: selectedEpoch.color }}>
                  {isQuantumFluxSync ? 'ACTIVE' : 'OFF'}
                </span>
              </div>

              <button
                onClick={() => {
                  cosmicAudio.playCyberScan();
                  setIsQuantumFluxSync(!isQuantumFluxSync);
                }}
                className={`w-full py-2 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isQuantumFluxSync
                    ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                    : 'bg-white/5 border border-white/10 text-slate-500'
                }`}
              >
                {isQuantumFluxSync ? 'SYNCHRONIZED (3-6-9 HARMONIC)' : 'ENABLE QUANTUM FLUX'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
