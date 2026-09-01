import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Radio, 
  Activity, 
  Sparkles, 
  Flame, 
  Volume2, 
  VolumeX, 
  Sliders, 
  RefreshCw, 
  Compass,
  Cpu,
  Layers,
  Power,
  Shield,
  Gauge
} from 'lucide-react';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

interface TeslaEtherEnergyField3DProps {
  onSelectFrequency?: (freq: number) => void;
}

export const TeslaEtherEnergyField3D: React.FC<TeslaEtherEnergyField3DProps> = ({
  onSelectFrequency,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPowerActive, setIsPowerActive] = useState(true);
  const [frequencyHz, setFrequencyHz] = useState<number>(528); // 396, 528, 639, 963, 7.83
  const [fieldIntensity, setFieldIntensity] = useState<number>(0.85); // 0.1 to 1.5
  const [fieldMode, setFieldMode] = useState<'toroidal' | 'scalar' | 'corona' | 'all'>('all');
  const [fieldLineDensity, setFieldLineDensity] = useState<number>(48);
  const [isAudioHumActive, setIsAudioHumActive] = useState(true);
  const [interactiveArcs, setInteractiveArcs] = useState<{ x: number; y: number } | null>(null);
  const [scalarResonancePct, setScalarResonancePct] = useState<number>(98.7);
  const [voltageOutputMV, setVoltageOutputMV] = useState<number>(12.4); // Million Volts
  const [activePreset, setActivePreset] = useState<'wardenclyffe' | 'colorado' | '369vortex' | 'schumann'>('369vortex');

  // Interactive pointers for plasma discharge attraction
  const mousePosRef = useRef<{ x: number; y: number; isDown: boolean }>({ x: 0, y: 0, isDown: false });

  // Handle Preset Switching
  const applyPreset = (preset: 'wardenclyffe' | 'colorado' | '369vortex' | 'schumann') => {
    setActivePreset(preset);
    try {
      cosmicAudio.playCyberScan();
    } catch {}

    if (preset === 'wardenclyffe') {
      setFrequencyHz(963);
      setFieldIntensity(1.1);
      setFieldMode('toroidal');
      setVoltageOutputMV(18.5);
      setScalarResonancePct(99.4);
    } else if (preset === 'colorado') {
      setFrequencyHz(396);
      setFieldIntensity(1.3);
      setFieldMode('corona');
      setVoltageOutputMV(25.0);
      setScalarResonancePct(97.2);
    } else if (preset === '369vortex') {
      setFrequencyHz(639);
      setFieldIntensity(0.9);
      setFieldMode('all');
      setVoltageOutputMV(14.8);
      setScalarResonancePct(99.9);
    } else if (preset === 'schumann') {
      setFrequencyHz(7.83);
      setFieldIntensity(0.75);
      setFieldMode('scalar');
      setVoltageOutputMV(8.2);
      setScalarResonancePct(96.5);
    }
  };

  useEffect(() => {
    if (isAudioHumActive && isPowerActive) {
      try {
        cosmicAudio.playPlanetTone(frequencyHz >= 100 ? frequencyHz : 432);
      } catch {}
    }
  }, [frequencyHz, isAudioHumActive, isPowerActive]);

  // Main 3D Pulsating Ether Energy Field Canvas Loop
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

    // Particle nodes for etheric fluid simulation
    interface EtherParticle {
      angle: number;
      dist: number;
      speed: number;
      size: number;
      baseHue: number;
      charge: number;
      pulseOffset: number;
    }

    const etherParticles: EtherParticle[] = [];
    const numParticles = 180;
    for (let i = 0; i < numParticles; i++) {
      etherParticles.push({
        angle: Math.random() * Math.PI * 2,
        dist: Math.random() * 260 + 30,
        speed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 2.2 + 0.6,
        baseHue: Math.random() > 0.6 ? 185 : Math.random() > 0.3 ? 42 : 275, // Cyan, Amber, Violet
        charge: Math.random() * 2 - 1,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Lightning discharge branches generator
    interface LightningBranch {
      points: { x: number; y: number }[];
      alpha: number;
      color: string;
      life: number;
      maxLife: number;
    }
    let lightningArcs: LightningBranch[] = [];

    const createLightningArc = (startX: number, startY: number, targetX: number, targetY: number, color: string) => {
      const pts: { x: number; y: number }[] = [{ x: startX, y: startY }];
      const dx = targetX - startX;
      const dy = targetY - startY;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(4, Math.floor(dist / 22));

      for (let s = 1; s < steps; s++) {
        const t = s / steps;
        const normalX = -dy / dist;
        const normalY = dx / dist;
        const jitter = (Math.random() - 0.5) * 32 * (1 - Math.abs(t - 0.5));
        pts.push({
          x: startX + dx * t + normalX * jitter,
          y: startY + dy * t + normalY * jitter,
        });
      }
      pts.push({ x: targetX, y: targetY });

      lightningArcs.push({
        points: pts,
        alpha: 1.0,
        color,
        life: 0,
        maxLife: Math.floor(Math.random() * 8 + 6),
      });
    };

    let time = 0;

    const render = () => {
      time += 0.035 * fieldIntensity;

      // Dark space background with subtle trail blur
      ctx.fillStyle = 'rgba(2, 6, 18, 0.28)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = Math.min(width, height) * 0.18;

      if (!isPowerActive) {
        // Standby idle mode
        ctx.save();
        ctx.translate(cx, cy);
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, 50, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.translate(cx, cy);

      // 1. ATMOSPHERIC CORONA & IONIZATION GLOW (Background Diffuse Glow)
      const pulse = Math.sin(time * 2.5) * 0.15 + 0.85;
      const outerGlowRadius = baseRadius * 3.2 * pulse * fieldIntensity;
      
      const coronaGrad = ctx.createRadialGradient(0, 0, baseRadius * 0.2, 0, 0, outerGlowRadius);
      coronaGrad.addColorStop(0, 'rgba(0, 243, 255, 0.35)');
      coronaGrad.addColorStop(0.3, 'rgba(139, 92, 246, 0.22)');
      coronaGrad.addColorStop(0.6, 'rgba(245, 158, 11, 0.12)');
      coronaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = coronaGrad;
      ctx.beginPath();
      ctx.arc(0, 0, outerGlowRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. LUMINOUS TOROIDAL & SCALAR FIELD LINES (Tesla Standing Wave Grid)
      if (fieldMode === 'toroidal' || fieldMode === 'all') {
        const numToroids = Math.floor(fieldLineDensity / 3);
        for (let i = 0; i < numToroids; i++) {
          const phi = (i / numToroids) * Math.PI + (time * 0.2);
          const loopRadius = baseRadius * (1.2 + Math.sin(time + i * 0.4) * 0.2);
          const widthScale = Math.sin(phi);

          ctx.save();
          ctx.rotate((i * Math.PI) / (numToroids / 2));
          ctx.beginPath();
          ctx.ellipse(0, 0, loopRadius * 1.8 * fieldIntensity, loopRadius * 0.65 * widthScale * fieldIntensity, time * 0.1, 0, Math.PI * 2);

          const gradLine = ctx.createLinearGradient(-loopRadius, 0, loopRadius, 0);
          gradLine.addColorStop(0, 'rgba(0, 243, 255, 0.08)');
          gradLine.addColorStop(0.5, i % 2 === 0 ? 'rgba(251, 191, 36, 0.65)' : 'rgba(0, 243, 255, 0.75)');
          gradLine.addColorStop(1, 'rgba(168, 85, 247, 0.1)');

          ctx.strokeStyle = gradLine;
          ctx.lineWidth = (1.2 + Math.sin(time * 3 + i) * 0.8) * Math.min(2.5, fieldIntensity);
          ctx.stroke();
          ctx.restore();
        }
      }

      // 3. LONGITUDINAL SCALAR RAYS (Etheric Compression Waves Radiating Outward)
      if (fieldMode === 'scalar' || fieldMode === 'all') {
        const numRays = 18;
        for (let r = 0; r < numRays; r++) {
          const rayAngle = (r / numRays) * Math.PI * 2 + (time * 0.15);
          const rayLength = baseRadius * (2.2 + Math.sin(time * 4 + r * 2) * 0.5) * fieldIntensity;
          
          ctx.save();
          ctx.rotate(rayAngle);
          ctx.beginPath();
          ctx.moveTo(baseRadius * 0.6, 0);
          ctx.lineTo(rayLength, 0);

          ctx.strokeStyle = r % 3 === 0 ? 'rgba(251, 191, 36, 0.8)' : 'rgba(0, 243, 255, 0.4)';
          ctx.lineWidth = r % 3 === 0 ? 2 : 1;
          ctx.setLineDash([8, 6]);
          ctx.lineDashOffset = -time * 30;
          ctx.stroke();
          ctx.restore();
        }
      }

      // 4. SPHERICAL TRANSMISSION SHELLS (Schumann & Wardenclyffe Wavefronts)
      for (let s = 1; s <= 4; s++) {
        const waveProgress = ((time * 0.8 + s * 0.25) % 1);
        const waveRadius = baseRadius * (0.5 + waveProgress * 2.8) * fieldIntensity;
        const waveAlpha = (1 - waveProgress) * 0.6 * fieldIntensity;

        ctx.beginPath();
        ctx.arc(0, 0, waveRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 243, 255, ${waveAlpha})`;
        ctx.lineWidth = 2.5 * (1 - waveProgress);
        ctx.setLineDash([]);
        ctx.stroke();
      }

      // 5. RANDOM HIGH-VOLTAGE SPARK DISCHARGES (Corona Arcs)
      if (Math.random() < 0.35 * fieldIntensity && (fieldMode === 'corona' || fieldMode === 'all')) {
        const angle = Math.random() * Math.PI * 2;
        const arcDist = baseRadius * (1.2 + Math.random() * 1.5) * fieldIntensity;
        const targetX = Math.cos(angle) * arcDist;
        const targetY = Math.sin(angle) * arcDist;
        const colors = ['#00f3ff', '#ffd700', '#c084fc', '#ffffff'];
        createLightningArc(
          Math.cos(angle) * (baseRadius * 0.5),
          Math.sin(angle) * (baseRadius * 0.5),
          targetX,
          targetY,
          colors[Math.floor(Math.random() * colors.length)]
        );
      }

      // 6. INTERACTIVE TOUCH / MOUSE ATTRACTION ARC
      const rect = canvas.getBoundingClientRect();
      const relativeMouseX = mousePosRef.current.x - rect.left - cx;
      const relativeMouseY = mousePosRef.current.y - rect.top - cy;
      const mouseDist = Math.hypot(relativeMouseX, relativeMouseY);

      if (mouseDist < Math.min(width, height) * 0.48 && mouseDist > 20) {
        if (Math.random() < 0.85) {
          createLightningArc(
            (relativeMouseX / mouseDist) * (baseRadius * 0.45),
            (relativeMouseY / mouseDist) * (baseRadius * 0.45),
            relativeMouseX,
            relativeMouseY,
            '#00f3ff'
          );
        }
      }

      // Render Active Lightning Arcs
      for (let i = lightningArcs.length - 1; i >= 0; i--) {
        const arc = lightningArcs[i];
        arc.life++;
        const currentAlpha = 1 - arc.life / arc.maxLife;

        if (arc.points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(arc.points[0].x, arc.points[0].y);
          for (let p = 1; p < arc.points.length; p++) {
            ctx.lineTo(arc.points[p].x, arc.points[p].y);
          }
          ctx.strokeStyle = arc.color;
          ctx.globalAlpha = currentAlpha;
          ctx.lineWidth = (arc.maxLife - arc.life) * 0.6 + 1;
          ctx.shadowColor = arc.color;
          ctx.shadowBlur = 12;
          ctx.stroke();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1.0;
        }

        if (arc.life >= arc.maxLife) {
          lightningArcs.splice(i, 1);
        }
      }

      // 7. ETHER PARTICLE SWARM (Orbiting Micro-vortices)
      etherParticles.forEach((p) => {
        p.angle += p.speed;
        const currentDist = p.dist * fieldIntensity + Math.sin(time * 3 + p.pulseOffset) * 15;
        const px = Math.cos(p.angle) * currentDist;
        const py = Math.sin(p.angle) * currentDist;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.baseHue}, 100%, 75%, 0.85)`;
        ctx.shadowColor = `hsla(${p.baseHue}, 100%, 65%, 1)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 8. CENTRAL 3-6-9 TRANSMISSION TORUS CORE (The Wardenclyffe Node Altar)
      const coreR = baseRadius * 0.5;

      // Outer Rotating 3-6-9 Sacred Hexagram Ring
      ctx.save();
      ctx.rotate(-time * 0.6);
      ctx.beginPath();
      ctx.arc(0, 0, coreR * 1.3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.85)';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 3-6-9 Sacred Node Markers around Core
      const trinityAngles = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];
      const trinityLabels = ['9 (Ethereal)', '3 (Creation)', '6 (Sustain)'];
      const trinityColors = ['#fbbf24', '#00f3ff', '#a855f7'];

      trinityAngles.forEach((ang, idx) => {
        const nx = Math.cos(ang) * coreR * 1.3;
        const ny = Math.sin(ang) * coreR * 1.3;

        ctx.beginPath();
        ctx.arc(nx, ny, 8, 0, Math.PI * 2);
        ctx.fillStyle = trinityColors[idx];
        ctx.shadowColor = trinityColors[idx];
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      ctx.restore();

      // Glowing Center Sphere with 3-6-9 Symbol
      const innerCoreGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, coreR);
      innerCoreGrad.addColorStop(0, '#ffffff');
      innerCoreGrad.addColorStop(0.3, '#00f3ff');
      innerCoreGrad.addColorStop(0.7, '#1e1b4b');
      innerCoreGrad.addColorStop(1, '#000000');

      ctx.beginPath();
      ctx.arc(0, 0, coreR, 0, Math.PI * 2);
      ctx.fillStyle = innerCoreGrad;
      ctx.shadowColor = '#00f3ff';
      ctx.shadowBlur = 25;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Core Tesla Coil Ring & Emitting Filament Glow
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, coreR * 0.6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isPowerActive, fieldIntensity, fieldMode, fieldLineDensity]);

  // Track Mouse Movement for Arc Interactions
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    mousePosRef.current.x = e.clientX;
    mousePosRef.current.y = e.clientY;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    try {
      cosmicAudio.playCyberZap();
      confetti({
        particleCount: 15,
        spread: 60,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: ['#00f3ff', '#fbbf24', '#a855f7'],
      });
    } catch {}
  };

  return (
    <div className="relative w-full rounded-3xl border-2 border-cyan-500/40 bg-[#020612] overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.2)] font-mono">
      {/* Background Decorative HUD Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 z-10 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 shadow-[0_0_20px_rgba(0,243,255,0.4)]">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-xl font-black tracking-wider text-white">
                3-6-9 ETHER ENERGY FIELD (3D NEXUS)
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-[10px] font-bold text-cyan-300">
                SCALAR TRANSMISSION
              </span>
            </div>
            <p className="text-xs text-cyan-400/80">
              Wardenclyffe standing wave transmitter & non-dissipative radiant ether matrix
            </p>
          </div>
        </div>

        {/* Real-time Telemetry Readout */}
        <div className="flex items-center gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-black/70 border border-cyan-500/30 text-right">
            <span className="text-slate-400 block text-[9px]">VOLTAGE POTENTIAL</span>
            <span className="text-amber-300 font-bold">{voltageOutputMV.toFixed(1)} MV DC</span>
          </div>
          <div className="p-2.5 rounded-xl bg-black/70 border border-cyan-500/30 text-right">
            <span className="text-slate-400 block text-[9px]">SCALAR COHERENCE</span>
            <span className="text-emerald-400 font-bold">{scalarResonancePct.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Interactive 3D Canvas */}
      <div className="relative w-full h-[520px] sm:h-[620px] cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onClick={handleCanvasClick}
          className="w-full h-full block"
        />

        {/* Interactive Prompt Overlay */}
        <div className="absolute bottom-28 sm:bottom-24 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-1.5 rounded-full bg-black/60 border border-cyan-500/30 backdrop-blur-md text-[11px] text-cyan-300 flex items-center gap-2 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>Move cursor or tap anywhere to attract high-frequency Tesla plasma arcs</span>
        </div>
      </div>

      {/* BOTTOM CONTROL DECK & PRESETS */}
      <div className="p-4 sm:p-6 bg-[#030919]/95 border-t border-cyan-500/30 space-y-4">
        {/* Preset Selectors */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-900/40 pb-4">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-300">FIELD EXPERIMENTS:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: '369vortex', label: '⚡ 3-6-9 Sacred Vortex', freq: 639 },
              { id: 'wardenclyffe', label: '🗼 Wardenclyffe Torus (963Hz)', freq: 963 },
              { id: 'colorado', label: '⚡ Colorado Springs 25MV (396Hz)', freq: 396 },
              { id: 'schumann', label: '🌍 Schumann Earth Cavity (7.83Hz)', freq: 7.83 },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => applyPreset(p.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePreset === p.id
                    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,243,255,0.6)]'
                    : 'bg-black/60 border border-cyan-900/50 text-cyan-300 hover:border-cyan-400'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Controls: Frequency, Intensity, Field Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* 1. Field Type Mode */}
          <div className="p-3.5 rounded-2xl bg-black/60 border border-cyan-900/50 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <Layers className="w-3.5 h-3.5" />
                Luminous Field Structure
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {(['all', 'toroidal', 'scalar', 'corona'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    cosmicAudio.playCyberKeystroke();
                    setFieldMode(m);
                  }}
                  className={`py-1.5 px-2 rounded-lg font-bold capitalize transition-all cursor-pointer text-center ${
                    fieldMode === m
                      ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-200'
                      : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {m === 'all' ? '✦ Full Matrix' : m}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Field Intensity Slider */}
          <div className="p-3.5 rounded-2xl bg-black/60 border border-cyan-900/50 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Ether Power Density
              </span>
              <span className="font-bold text-amber-300">{Math.round(fieldIntensity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1.5"
              step="0.05"
              value={fieldIntensity}
              onChange={(e) => setFieldIntensity(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Low (Harmonic)</span>
              <span>Nominal</span>
              <span>Overclock (High Tesla)</span>
            </div>
          </div>

          {/* 3. Resonant Audio Hum & Primary Ignition */}
          <div className="p-3.5 rounded-2xl bg-black/60 border border-cyan-900/50 space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <Volume2 className="w-3.5 h-3.5" />
                Resonance Hum ({frequencyHz} Hz)
              </span>
              <button
                onClick={() => setIsAudioHumActive(!isAudioHumActive)}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  isAudioHumActive
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-white/5 border-white/10 text-slate-500'
                }`}
              >
                {isAudioHumActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={() => {
                cosmicAudio.playCyberScan();
                setIsPowerActive(!isPowerActive);
              }}
              className={`w-full py-2 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isPowerActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-[0_0_20px_rgba(0,243,255,0.4)]'
                  : 'bg-rose-950/60 border border-rose-500/50 text-rose-300 hover:bg-rose-900'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>{isPowerActive ? 'IGNITION ACTIVE' : 'SYSTEM STANDBY'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
