import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { CelestialBodyData } from '../../types';
import { FuturisticTeslaPortalButton } from './FuturisticTeslaPortalButton';
import { RealisticBlackHoleInfall } from './RealisticBlackHoleInfall';
import {
  Zap,
  Radio,
  Sparkles,
  Compass,
  Volume2,
  VolumeX,
  Layers,
  FastForward,
} from 'lucide-react';

interface BlackHolePortalCoreProps {
  onEnterSolarOrrery: () => void;
  onSelectCelestialBody: (body: CelestialBodyData) => void;
  celestialBodies: CelestialBodyData[];
  onOpenDoublingMatrix: () => void;
}

export const BlackHolePortalCore: React.FC<BlackHolePortalCoreProps> = ({
  onEnterSolarOrrery,
  onSelectCelestialBody,
  celestialBodies,
  onOpenDoublingMatrix,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlayingHum, setIsPlayingHum] = useState(true);
  const [isDiving, setIsDiving] = useState(false);

  useEffect(() => {
    // Play cosmic black hole hum
    try {
      cosmicAudio.playPlanetTone(963);
    } catch {}

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    window.addEventListener('resize', handleResize);

    // Relativistic Accretion Stream Filaments
    interface AccretionParticle {
      radius: number;
      angle: number;
      speed: number;
      size: number;
      color: string;
      isHot: boolean;
    }

    const particles: AccretionParticle[] = [];
    const colors = ['#ffffff', '#ffd700', '#f59e0b', '#fb923c', '#ef4444', '#93c5fd'];

    for (let i = 0; i < 400; i++) {
      particles.push({
        radius: Math.random() * Math.min(width, height) * 0.75 + 50,
        angle: Math.random() * Math.PI * 2,
        speed: (0.015 + (1 / Math.sqrt(Math.random() * 200 + 40)) * 0.3) * (Math.random() > 0.5 ? 1 : 1),
        size: Math.random() * 2.5 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        isHot: Math.random() > 0.4,
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      // Deep Space Black Background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const r = Math.min(width, height) * 0.16;

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Upper Gravitational Lensing Arch (Light bent over north pole)
      const safeR = Math.max(10, r);
      try {
        const upperGrad = ctx.createRadialGradient(0, -safeR * 0.3, Math.max(0.1, safeR * 0.75), 0, -safeR * 0.3, Math.max(0.2, safeR * 2.5));
        upperGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        upperGrad.addColorStop(0.25, 'rgba(255, 215, 0, 0.8)');
        upperGrad.addColorStop(0.6, 'rgba(249, 115, 22, 0.5)');
        upperGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = upperGrad;
        ctx.beginPath();
        ctx.ellipse(0, -safeR * 0.22, safeR * 2.3, safeR * 1.95, 0, Math.PI, Math.PI * 2);
        ctx.fill();
      } catch (e) {}

      // 2. Lower Gravitational Lensing Arch (Light bent under south pole)
      try {
        const lowerGrad = ctx.createRadialGradient(0, safeR * 0.3, Math.max(0.1, safeR * 0.75), 0, safeR * 0.3, Math.max(0.2, safeR * 1.8));
        lowerGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
        lowerGrad.addColorStop(0.35, 'rgba(255, 180, 0, 0.6)');
        lowerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = lowerGrad;
        ctx.beginPath();
        ctx.ellipse(0, safeR * 0.22, safeR * 1.8, safeR * 1.1, 0, 0, Math.PI);
        ctx.fill();
      } catch (e) {}

      // 3. Relativistic Doppler Beaming Accretion Disk
      const safeDiskR = Math.max(1, safeR * 3.4);
      try {
        const diskGrad = ctx.createLinearGradient(-safeDiskR, 0, safeDiskR, 0);
        diskGrad.addColorStop(0, 'rgba(255, 255, 255, 1)'); // Intense oncoming
        diskGrad.addColorStop(0.25, 'rgba(147, 197, 253, 0.9)');
        diskGrad.addColorStop(0.5, 'rgba(255, 215, 0, 0.8)');
        diskGrad.addColorStop(0.78, 'rgba(234, 88, 12, 0.5)');
        diskGrad.addColorStop(1, 'rgba(159, 18, 57, 0.2)');

        ctx.fillStyle = diskGrad;
        ctx.beginPath();
        ctx.ellipse(0, 0, safeDiskR, safeR * 1.1, 0, 0, Math.PI * 2);
        ctx.fill();
      } catch (e) {}

      // Infalling relativistic plasma particles
      particles.forEach((p) => {
        p.angle += p.speed;
        p.radius -= 0.45;
        if (p.radius < r * 0.95) {
          p.radius = Math.min(width, height) * 0.7 + Math.random() * 80;
        }

        const px = Math.cos(p.angle) * p.radius;
        const py = Math.sin(p.angle) * (p.radius * 0.36);

        // Doppler brightness
        const isApproaching = px < 0;
        ctx.fillStyle = isApproaching ? (p.isHot ? '#ffffff' : '#ffd700') : '#ea580c';
        ctx.beginPath();
        ctx.arc(px, py, p.size * (isApproaching ? 1.3 : 0.8), 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Central Schwarzschild Event Horizon
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.96, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();

      // 5. Razor-sharp Photon Ring
      ctx.beginPath();
      ctx.arc(0, 0, r * 1.02, 0, Math.PI * 2);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.4;
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 25;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Rotating 3-6-9 Trinity Quantum Nodes
      const trinityAngles = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];
      const numbers = ['3', '6', '9'];

      trinityAngles.forEach((baseAngle, idx) => {
        const angle = baseAngle + frame * 0.012;
        const dist = r * 1.25 + Math.sin(frame * 0.04 + idx) * 8;
        const nx = Math.cos(angle) * dist;
        const ny = Math.sin(angle) * (dist * 0.38);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Cinzel, serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 15;
        ctx.fillText(numbers[idx], nx, ny);
        ctx.shadowBlur = 0;
      });

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      cosmicAudio.stopFrequencyTone();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePlunge = () => {
    setIsDiving(true);
  };

  const handleDiveComplete = () => {
    setIsDiving(false);
    onEnterSolarOrrery();
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-amber-500/50 bg-black shadow-[0_0_80px_rgba(0,0,0,0.95)] select-none">
      {/* Full-Screen Speed of Light Dive Overlay */}
      {isDiving && <RealisticBlackHoleInfall onComplete={handleDiveComplete} />}

      {/* Dynamic Accretion Canvas */}
      <div className="relative w-full h-[520px] sm:h-[600px] flex flex-col justify-between p-4 sm:p-8 z-10">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Top Header HUD */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center font-cinzel font-black text-black shadow-[0_0_20px_rgba(255,215,0,0.8)]">
              ⚡
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#fdf2d1] tracking-wider drop-shadow-md">
                Sagittarius A* Quantum Singularity
              </h2>
              <p className="text-xs text-amber-300/80 font-mono">
                GENERAL RELATIVITY • ACCRETION DISK DOPPLER BEAMING & PHOTON RING
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (isPlayingHum) {
                  cosmicAudio.stopFrequencyTone();
                  setIsPlayingHum(false);
                } else {
                  cosmicAudio.playPlanetTone(963);
                  setIsPlayingHum(true);
                }
              }}
              className="p-2.5 rounded-xl bg-black/70 border border-amber-500/40 text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer"
              title={isPlayingHum ? 'Mute 963Hz Singularity Tone' : 'Play 963Hz Singularity Tone'}
            >
              {isPlayingHum ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Center Plunge Button & Singularity Trigger */}
        <div className="relative z-20 text-center space-y-4 max-w-lg mx-auto pointer-events-auto my-auto">
          <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#fdf2d1] tracking-wider drop-shadow-lg">
            3-6-9 Black Hole Event Horizon
          </h3>

          <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
            Relativistic spacetime curvature bending light around the singularity. Plunge inside at the speed of light into the celestial planetary realm.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <FuturisticTeslaPortalButton
              variant="large"
              label="SPEED OF LIGHT INFALL"
              subLabel="ENTER SINGULARITY AT C"
              onClick={handlePlunge}
            />

            <button
              onClick={onOpenDoublingMatrix}
              className="px-5 py-3.5 rounded-2xl bg-black/80 hover:bg-purple-500/20 border border-purple-400/60 text-purple-200 font-cinzel font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>3-6-9 Doubling Matrix</span>
            </button>
          </div>
        </div>

        {/* Bottom Black Hole Telemetry Data HUD */}
        <div className="relative z-20 w-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs bg-black/85 p-3 rounded-2xl border border-amber-500/40 backdrop-blur-md shadow-2xl">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-gray-400 block uppercase">TIME DILATION</span>
            <span className="text-amber-300 font-bold">1s = 7 Earth Yrs</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-gray-400 block uppercase">SCHWARZSCHILD RADIUS</span>
            <span className="text-purple-300 font-bold">24 Million KM</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-gray-400 block uppercase">PHOTON SPHERE RING</span>
            <span className="text-cyan-300 font-bold">r = 1.5 Rs (Orbit c)</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-gray-400 block uppercase">SINGULARITY FREQUENCY</span>
            <span className="text-pink-300 font-bold">963 Hz Crown</span>
          </div>
        </div>
      </div>
    </div>
  );
};
