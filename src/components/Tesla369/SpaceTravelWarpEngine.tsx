import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CelestialBodyData } from '../../types';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { Zap, FastForward, Navigation, Compass, Radio, Sparkles } from 'lucide-react';

interface SpaceTravelWarpEngineProps {
  origin: CelestialBodyData | null;
  destination: CelestialBodyData;
  onArrival: () => void;
  onSkip?: () => void;
}

export const SpaceTravelWarpEngine: React.FC<SpaceTravelWarpEngineProps> = ({
  origin,
  destination,
  onArrival,
  onSkip,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [warpStage, setWarpStage] = useState('ENGAGING SPACETIME WARP DRIVES...');
  const [telemetry, setTelemetry] = useState({
    velocity: 'WARP 3.69',
    distanceRemaining: destination.distanceFromSun || '1.43B KM',
    frequency: `${destination.vibrationalFrequencyHz} Hz`,
    curvature: 'ΔG = 3.69',
  });

  useEffect(() => {
    // Play cosmic warp travel audio
    cosmicAudio.playBlackHoleWarp();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle Stars for Hyperspace Tunnel
    const numStars = 600;
    interface WarpStar {
      x: number;
      y: number;
      z: number;
      pz: number;
      color: string;
      size: number;
    }

    const stars: WarpStar[] = [];
    const colors = [
      destination.color || '#ffd700',
      '#ffffff',
      '#a855f7',
      '#38bdf8',
      '#f59e0b',
      '#ec4899',
    ];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        pz: Math.random() * width,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1,
      });
    }

    const startTime = performance.now();
    const duration = 2400; // 2.4 seconds flight

    const render = (time: number) => {
      const elapsed = time - startTime;
      const p = Math.min(1, elapsed / duration);
      setProgress(p);

      if (p < 0.3) {
        setWarpStage(`DEPARTING ${origin ? origin.name.toUpperCase() : 'COSMIC ORIGIN'}...`);
      } else if (p < 0.7) {
        setWarpStage(`CROSSING HYPERSPACE FLUX ➔ HARMONIC #${destination.teslaHarmonicNumber}...`);
      } else {
        setWarpStage(`DECELERATING INTO ${destination.name.toUpperCase()} ORBIT...`);
      }

      if (p >= 1) {
        onArrival();
        return;
      }

      const cx = width / 2;
      const cy = height / 2;

      // Motion blur trail
      ctx.fillStyle = 'rgba(2, 2, 6, 0.32)';
      ctx.fillRect(0, 0, width, height);

      // Starfield tunnel acceleration
      const speed = 15 + p * 55;

      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = width;
          star.pz = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 250 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const pk = 250 / star.pz;
        const prevPx = star.x * pk + cx;
        const prevPy = star.y * pk + cy;

        star.pz = star.z;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = star.size * (1 + p * 2.5);
          ctx.stroke();
        }
      });

      // Central Destination Hologram Portal Looming closer
      const destRadius = 15 + p * 90;
      const glowGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, destRadius * 2);
      glowGrad.addColorStop(0, destination.glowColor || 'rgba(255,215,0,0.8)');
      glowGrad.addColorStop(0.5, destination.glowColor || 'rgba(255,215,0,0.4)');
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.save();
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, destRadius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Destination Core
      ctx.beginPath();
      ctx.arc(cx, cy, destRadius, 0, Math.PI * 2);
      ctx.fillStyle = destination.color;
      ctx.shadowColor = destination.glowColor;
      ctx.shadowBlur = 30 * p;
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [origin, destination, onArrival]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-4 sm:p-8 select-none overflow-hidden font-mono">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Top Space Travel HUD */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-black/80 border border-[#ffd700]/60 backdrop-blur-md shadow-2xl">
          <Navigation className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <div className="text-xs">
            <span className="text-gray-400 block text-[10px]">SPACETIME VECTOR</span>
            <span className="text-amber-200 font-bold tracking-wider">
              {origin ? origin.name : 'Cosmos'} ➔ {destination.name}
            </span>
          </div>
        </div>

        <button
          onClick={onSkip || onArrival}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 hover:bg-amber-500/40 border border-[#ffd700]/70 text-amber-200 text-xs tracking-wider transition-all cursor-pointer backdrop-blur-md shadow-lg group"
        >
          <span>Complete Warp</span>
          <FastForward className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Center Cinematic Portal Info */}
      <div className="relative z-10 text-center space-y-3 pointer-events-none max-w-xl mx-auto">
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
          className="inline-block"
        >
          <div
            className="w-16 h-16 rounded-full border-2 border-white/60 shadow-[0_0_30px_rgba(255,215,0,0.8)] flex items-center justify-center font-cinzel font-black text-xl text-black"
            style={{ backgroundColor: destination.color }}
          >
            {destination.teslaHarmonicNumber}
          </div>
        </motion.div>

        <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#fdf2d1] tracking-wider drop-shadow-md">
          {destination.name}
        </h2>
        {destination.sanskritName && (
          <p className="text-xs sm:text-sm font-serif text-amber-300/90 font-normal">
            {destination.sanskritName} • {destination.vibrationalFrequencyHz} Hz Tone
          </p>
        )}

        <p className="text-xs sm:text-sm font-mono font-bold text-amber-300 tracking-widest uppercase animate-pulse">
          {warpStage}
        </p>
      </div>

      {/* Bottom Telemetry Data Panel */}
      <div className="relative z-10 w-full max-w-3xl mx-auto space-y-3 bg-black/80 p-4 rounded-2xl border border-amber-500/40 backdrop-blur-md">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-gray-400 block uppercase">WARP VELOCITY</span>
            <span className="text-amber-300 font-bold">{telemetry.velocity}</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-gray-400 block uppercase">TARGET DISTANCE</span>
            <span className="text-cyan-300 font-bold">{telemetry.distanceRemaining}</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-gray-400 block uppercase">ACOUSTIC FREQ</span>
            <span className="text-pink-300 font-bold">{telemetry.frequency}</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-gray-400 block uppercase">TESLA FLUX</span>
            <span className="text-emerald-300 font-bold">{telemetry.curvature}</span>
          </div>
        </div>

        {/* Warp Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] text-amber-300/90 font-mono">
            <span>SPACETIME WARP PROGRESS</span>
            <span>{Math.round(progress * 100)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-950 border border-amber-500/40 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-purple-400 to-cyan-400 transition-all duration-75"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
