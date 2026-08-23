import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { FastForward, Zap, Eye, Compass } from 'lucide-react';

interface RealisticBlackHoleInfallProps {
  onComplete: () => void;
}

export const RealisticBlackHoleInfall: React.FC<RealisticBlackHoleInfallProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [telemetry, setTelemetry] = useState({
    velocity: '0.12 c',
    lorentzGamma: '1.01',
    distanceRs: '85.4 Rs',
    timeDilation: '1.02x',
    phaseText: 'TARGETING SCHWARZSCHILD BLACK HOLE...',
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Trigger realistic gravitational sub-bass black hole audio sequence
    try {
      cosmicAudio.playBlackHoleWarp();
    } catch {}

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

    // 1. Realistic Deep Space Background Stars (with stellar spectrum colors)
    interface DeepStar {
      x: number;
      y: number;
      z: number;
      origX: number;
      origY: number;
      color: string;
      size: number;
      baseAlpha: number;
    }

    const starColors = [
      '#ffffff', // Class A/F
      '#dbeafe', // Class B (Blue-white)
      '#93c5fd', // Class O (Electric Blue)
      '#fef08a', // Class G (Yellow)
      '#fed7aa', // Class K (Orange)
      '#fca5a5', // Class M (Red)
      '#ffd700', // Gold
    ];

    const numStars = 800;
    const stars: DeepStar[] = [];
    for (let i = 0; i < numStars; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * Math.max(width, height) * 1.6 + 80;
      const sx = Math.cos(angle) * dist;
      const sy = Math.sin(angle) * dist;
      stars.push({
        x: sx,
        y: sy,
        origX: sx,
        origY: sy,
        z: Math.random() * 2000 + 200,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        size: Math.random() * 2.2 + 0.6,
        baseAlpha: Math.random() * 0.7 + 0.3,
      });
    }

    // 2. Accretion Disk Plasma Filaments (Interstellar / EHT physics)
    interface PlasmaStream {
      radius: number;
      angle: number;
      speed: number;
      width: number;
      temp: number; // 0 = cool red/orange, 1 = ultra hot blue-white
      noiseSeed: number;
    }

    const numPlasma = 420;
    const plasmaStreams: PlasmaStream[] = [];
    for (let i = 0; i < numPlasma; i++) {
      plasmaStreams.push({
        radius: 60 + Math.random() * 280,
        angle: Math.random() * Math.PI * 2,
        speed: (0.015 + (1 / Math.sqrt(60 + Math.random() * 280)) * 0.4) * (Math.random() > 0.5 ? 1 : 1),
        width: Math.random() * 4 + 1.5,
        temp: Math.random(),
        noiseSeed: Math.random() * 100,
      });
    }

    const startTime = performance.now();
    const duration = 3800; // 3.8s cinematic dive

    const render = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);
      setProgress(p);

      // Relativistic calculations
      const velFrac = Math.min(0.9999, 0.12 + Math.pow(p, 1.8) * 0.88);
      const gamma = 1 / Math.sqrt(Math.max(0.0001, 1 - velFrac * velFrac));
      const distRs = Math.max(0, 85 * (1 - Math.pow(p, 1.4)));
      const timeDil = gamma > 100 ? '∞ (Singularity)' : `${gamma.toFixed(2)}x`;

      let phase = 'APPROACHING RELATIVISTIC ACCRETION DISK...';
      if (p > 0.28 && p <= 0.62) {
        phase = 'RELATIVISTIC ACCELERATION: SPEED OF LIGHT (0.99c)...';
      } else if (p > 0.62 && p <= 0.88) {
        phase = 'CROSSING PHOTON SPHERE & EVENT HORIZON VOID...';
      } else if (p > 0.88) {
        phase = 'SINGULARITY DETECTED: 3-6-9 QUANTUM TRANSCENDENCE!';
      }

      setTelemetry({
        velocity: `${(velFrac * 100).toFixed(1)}% c (${(velFrac * 299792).toFixed(0)} km/s)`,
        lorentzGamma: gamma > 50 ? '> 50.00' : gamma.toFixed(2),
        distanceRs: `${distRs.toFixed(1)} Rs`,
        timeDilation: timeDil,
        phaseText: phase,
      });

      if (p >= 1) {
        onComplete();
        return;
      }

      const cx = width / 2;
      const cy = height / 2;

      // Pure deep space black background with subtle camera drag
      ctx.fillStyle = 'rgba(1, 1, 3, 0.38)';
      ctx.fillRect(0, 0, width, height);

      // Camera Shake during peak relativistic velocity and event horizon crossing
      let shakeX = 0;
      let shakeY = 0;
      if (p > 0.4 && p < 0.92) {
        const shakeIntensity = Math.sin((p - 0.4) * Math.PI) * 7.5;
        shakeX = (Math.random() - 0.5) * shakeIntensity;
        shakeY = (Math.random() - 0.5) * shakeIntensity;
      }

      ctx.save();
      ctx.translate(cx + shakeX, cy + shakeY);

      // Current effective black hole shadow radius based on approach distance
      // Infall zoom: starts moderate, then accelerates exponentially into the camera
      const approachZoom = 1 + Math.pow(p, 2.5) * 24;
      const baseRs = Math.min(width, height) * 0.085;
      const currentRs = baseRs * approachZoom;

      // -------------------------------------------------------------
      // 1. RELATIVISTIC ABERRATION & GRAVITATIONAL LENSING OF STARS
      // -------------------------------------------------------------
      stars.forEach((star) => {
        // Relativistic aberration compresses stars forward toward center as v -> c
        const aberrationFactor = 1 - velFrac * 0.55;
        const currentDist = Math.hypot(star.origX, star.origY) * aberrationFactor;
        const baseAngle = Math.atan2(star.origY, star.origX);

        // Gravitational deflection around the Schwarzschild shadow (Einstein Ring effect)
        let deflectedDist = currentDist;
        const rRatio = currentDist / Math.max(1, currentRs);
        if (rRatio > 0.8 && rRatio < 4.5) {
          deflectedDist += (currentRs * 0.7) / Math.pow(rRatio, 1.2);
        }

        // Speed-of-light radial streak effect
        const streakLen = 1 + velFrac * 35 * Math.pow(p, 1.5);
        const sx = Math.cos(baseAngle) * deflectedDist;
        const sy = Math.sin(baseAngle) * deflectedDist;
        const prevSx = Math.cos(baseAngle) * (deflectedDist + streakLen);
        const prevSy = Math.sin(baseAngle) * (deflectedDist + streakLen);

        // Doppler shift star color to blue-white as we accelerate towards them
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(prevSx, prevSy);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = p > 0.5 ? '#e0f2fe' : star.color;
        ctx.lineWidth = star.size * (1 + p * 1.5);
        ctx.globalAlpha = star.baseAlpha * (1 + p * 0.5);
        ctx.stroke();
        ctx.restore();
      });

      // -------------------------------------------------------------
      // 2. REALISTIC GRAVITATIONAL LENSING: UPPER & LOWER WARPED ACCRETION ARCHES
      // -------------------------------------------------------------
      // In general relativity, light from behind the black hole is bent *over* and *under* the shadow
      const diskTilt = 0.32; // Perspective tilt
      const diskSpin = now * 0.003 * (1 + p * 3);

      // (A) Upper Lensed Arch (Rear of disk magnified over the north pole of the event horizon)
      ctx.save();
      const upperArchRadius = Math.max(5, currentRs * 2.1);
      const safeRs = Math.max(1, currentRs);
      try {
        const upperArchGrad = ctx.createRadialGradient(
          0,
          -safeRs * 0.3,
          Math.max(0.1, safeRs * 0.85),
          0,
          -safeRs * 0.3,
          Math.max(0.2, upperArchRadius * 1.35)
        );
        upperArchGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        upperArchGrad.addColorStop(0.25, 'rgba(255, 215, 0, 0.85)');
        upperArchGrad.addColorStop(0.55, 'rgba(249, 115, 22, 0.65)');
        upperArchGrad.addColorStop(0.85, 'rgba(225, 29, 72, 0.35)');
        upperArchGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = upperArchGrad;
        ctx.beginPath();
        // Upper halo arc
        ctx.ellipse(0, -safeRs * 0.25, upperArchRadius, upperArchRadius * 0.95, 0, Math.PI, Math.PI * 2);
        ctx.fill();
      } catch (e) {}
      ctx.restore();

      // (B) Lower Lensed Arch (Underneath the south pole)
      ctx.save();
      const lowerArchRadius = Math.max(4, currentRs * 1.8);
      try {
        const lowerArchGrad = ctx.createRadialGradient(
          0,
          safeRs * 0.3,
          Math.max(0.1, safeRs * 0.85),
          0,
          safeRs * 0.3,
          Math.max(0.2, lowerArchRadius * 1.2)
        );
        lowerArchGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        lowerArchGrad.addColorStop(0.3, 'rgba(255, 190, 0, 0.7)');
        lowerArchGrad.addColorStop(0.65, 'rgba(194, 65, 12, 0.4)');
        lowerArchGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = lowerArchGrad;
        ctx.beginPath();
        ctx.ellipse(0, safeRs * 0.25, lowerArchRadius, lowerArchRadius * 0.65, 0, 0, Math.PI);
        ctx.fill();
      } catch (e) {}
      ctx.restore();

      // -------------------------------------------------------------
      // 3. MAIN EQUATORIAL ACCRETION DISK (With Doppler Beaming Asymmetry)
      // -------------------------------------------------------------
      // Approaching left side is blinding hot-white/blue; receding right side is cooler red-orange
      ctx.save();
      const diskMajorRadius = currentRs * 3.4;
      const diskMinorRadius = diskMajorRadius * diskTilt;

      // Relativistic Doppler Beaming Gradient: Left (-x) is super bright, Right (+x) is darker
      const safeDiskMajor = Math.max(1, Number.isFinite(diskMajorRadius) ? diskMajorRadius : 50);
      try {
        const dopplerGrad = ctx.createLinearGradient(-safeDiskMajor, 0, safeDiskMajor, 0);
        dopplerGrad.addColorStop(0, 'rgba(255, 255, 255, 1)'); // Intense blueshifted oncoming plasma
        dopplerGrad.addColorStop(0.2, 'rgba(147, 197, 253, 0.95)'); // Cyan/white
        dopplerGrad.addColorStop(0.45, 'rgba(255, 215, 0, 0.85)'); // Gold
        dopplerGrad.addColorStop(0.75, 'rgba(234, 88, 12, 0.6)'); // Redshifted orange
        dopplerGrad.addColorStop(1, 'rgba(159, 18, 57, 0.3)'); // Deep red receding tail

        ctx.fillStyle = dopplerGrad;
        ctx.beginPath();
        ctx.ellipse(0, 0, safeDiskMajor, diskMinorRadius, 0, 0, Math.PI * 2);
        ctx.fill();
      } catch (e) {}

      // Swirling plasma stream filaments across the disk
      plasmaStreams.forEach((ps) => {
        ps.angle += ps.speed * (1 + p * 2);
        const r = ps.radius * (currentRs / baseRs);
        const px = Math.cos(ps.angle + diskSpin) * r;
        const py = Math.sin(ps.angle + diskSpin) * (r * diskTilt);

        // Left side vs Right side brightness
        const isApproaching = px < 0;
        const alpha = isApproaching ? 0.85 + Math.sin(now * 0.01 + ps.noiseSeed) * 0.15 : 0.45;

        ctx.beginPath();
        ctx.arc(px, py, ps.width * (1 + p * 0.8), 0, Math.PI * 2);
        ctx.fillStyle = isApproaching
          ? ps.temp > 0.5
            ? `rgba(255, 255, 255, ${alpha})`
            : `rgba(255, 215, 0, ${alpha})`
          : `rgba(239, 68, 68, ${alpha * 0.6})`;
        ctx.fill();
      });
      ctx.restore();

      // -------------------------------------------------------------
      // 4. CENTRAL SCHWARZSCHILD EVENT HORIZON (Pure Black Void of 0 Reflectance)
      // -------------------------------------------------------------
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, currentRs, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();

      // -------------------------------------------------------------
      // 5. PHOTON SPHERE RING (Relativistic Einstein Ring at r = 1.5 Rs)
      // -------------------------------------------------------------
      // Razor sharp incandescent ring bordering the shadow
      const photonRingR = currentRs * 1.04;
      ctx.beginPath();
      ctx.arc(0, 0, photonRingR, 0, Math.PI * 2);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = Math.max(1.8, 3.5 * (1 - p * 0.4));
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 24 + p * 20;
      ctx.stroke();

      // Secondary fine photon ring
      ctx.beginPath();
      ctx.arc(0, 0, currentRs * 1.12, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.7)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // -------------------------------------------------------------
      // 6. INSIDE THE SINGULARITY: 3-6-9 QUANTUM TRANSCENDENCE FLASH (p > 0.85)
      // -------------------------------------------------------------
      if (p > 0.82) {
        const transP = (p - 0.82) / 0.18; // 0 to 1

        // Blackout engulfment as we cross event horizon
        ctx.save();
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(1, transP * 1.4)})`;
        ctx.fillRect(-width, -height, width * 2, height * 2);

        // Radiant 3-6-9 Geometric Quantum Light Filaments
        const numRays = 18;
        for (let i = 0; i < numRays; i++) {
          const angle = (i * Math.PI * 2) / numRays + now * 0.004;
          const rayLen = Math.max(width, height) * transP * 1.5;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * rayLen, Math.sin(angle) * rayLen);
          ctx.strokeStyle = i % 3 === 0 ? '#ffd700' : i % 3 === 1 ? '#a855f7' : '#22d3ee';
          ctx.lineWidth = 3 + transP * 8;
          ctx.globalAlpha = Math.min(1, transP * 2);
          ctx.stroke();
        }

        // Giant Golden 3-6-9 Glyph at center of Singularity
        ctx.font = `black ${Math.min(width * 0.15, 80)}px Cinzel, serif`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 40;
        ctx.globalAlpha = Math.min(1, transP * 2.2);
        ctx.fillText('3 • 6 • 9', 0, 0);

        // Final blinding white-gold transcendence flash (p > 0.94)
        if (p > 0.94) {
          const flashP = (p - 0.94) / 0.06;
          ctx.fillStyle = `rgba(255, 255, 255, ${flashP})`;
          ctx.fillRect(-width, -height, width * 2, height * 2);
        }
        ctx.restore();
      }

      ctx.restore(); // end center translation

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-4 sm:p-8 select-none overflow-hidden font-mono">
      {/* Background Simulation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Top Telemetry Flight Deck */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-black/80 border border-[#ffd700]/60 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.9)]">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
          </div>
          <div>
            <div className="text-[11px] sm:text-xs font-bold text-amber-300 tracking-wider">
              GENERAL RELATIVITY • FIRST-PERSON INFALL
            </div>
            <div className="text-[9px] text-gray-400 tracking-tight">
              SPACETIME METRIC: KERR-SCHWARZSCHILD • C = 299,792,458 M/S
            </div>
          </div>
        </div>

        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/20 hover:bg-amber-500/40 border border-[#ffd700]/70 text-amber-200 text-xs font-bold tracking-wider transition-all cursor-pointer backdrop-blur-md group"
        >
          <span>Skip Dive</span>
          <FastForward className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Center Cinematic Phase Callout */}
      <div className="relative z-10 text-center space-y-2 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block px-4 py-1.5 rounded-full bg-black/60 border border-cyan-400/40 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.4)]"
        >
          <span className="text-xs sm:text-sm font-bold text-cyan-300 tracking-widest uppercase">
            {telemetry.phaseText}
          </span>
        </motion.div>
      </div>

      {/* Bottom Relativistic Telemetry Grid */}
      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-3 bg-black/85 p-4 sm:p-5 rounded-2xl border border-amber-500/40 backdrop-blur-md shadow-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-black/50 p-2 rounded-xl border border-amber-500/20">
            <div className="text-[10px] text-gray-400 uppercase">VELOCITY (v)</div>
            <div className="text-sm sm:text-base font-black text-cyan-300">{telemetry.velocity}</div>
          </div>
          <div className="bg-black/50 p-2 rounded-xl border border-amber-500/20">
            <div className="text-[10px] text-gray-400 uppercase">LORENTZ FACTOR (γ)</div>
            <div className="text-sm sm:text-base font-black text-amber-300">{telemetry.lorentzGamma}</div>
          </div>
          <div className="bg-black/50 p-2 rounded-xl border border-amber-500/20">
            <div className="text-[10px] text-gray-400 uppercase">DISTANCE TO HORIZON</div>
            <div className="text-sm sm:text-base font-black text-rose-400">{telemetry.distanceRs}</div>
          </div>
          <div className="bg-black/50 p-2 rounded-xl border border-amber-500/20">
            <div className="text-[10px] text-gray-400 uppercase">TIME DILATION (Δt')</div>
            <div className="text-sm sm:text-base font-black text-purple-300">{telemetry.timeDilation}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-amber-300/80">
            <span>EVENT HORIZON PENETRATION</span>
            <span>{Math.round(progress * 100)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-950 border border-amber-500/40 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-500 transition-all duration-75"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
