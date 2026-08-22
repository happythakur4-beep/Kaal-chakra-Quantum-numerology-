import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { ThemeMode, AuraType } from '../types';
import { Sparkles, Radio, Eye, RefreshCw, Volume2, VolumeX, Shield, Activity, Maximize2 } from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynthesizer';
import { motion, AnimatePresence } from 'motion/react';

interface AuraFieldVisualizationProps {
  theme: ThemeMode;
  activeAura: AuraType;
  onSelectAura?: (aura: AuraType) => void;
  interactive?: boolean;
  height?: number;
  compact?: boolean;
  avatarUrl?: string;
  userName?: string;
  onExpand?: () => void;
}

interface AuraColorConfig {
  name: AuraType;
  primary: string;
  secondary: string;
  tertiary: string;
  glow: string;
  frequency: number;
  chakra: string;
  element: string;
  description: string;
  harmonicKeywords: string[];
}

export const AURA_CONFIGS: Record<AuraType, AuraColorConfig> = {
  'Calm Amber': {
    name: 'Calm Amber',
    primary: '#d4af37',
    secondary: '#f59e0b',
    tertiary: '#78350f',
    glow: 'rgba(212, 175, 55, 0.65)',
    frequency: 432,
    chakra: 'Solar Plexus (Manipura)',
    element: 'Tejas (Fire & Grounding)',
    description: 'Grounds vital lifeforce energy, dissolves mental agitation, and instills peaceful sovereignty.',
    harmonicKeywords: ['Clarity', 'Confidence', 'Warmth', 'Equanimity'],
  },
  'Radiant Rose': {
    name: 'Radiant Rose',
    primary: '#f43f5e',
    secondary: '#fb7185',
    tertiary: '#881337',
    glow: 'rgba(244, 63, 94, 0.65)',
    frequency: 528,
    chakra: 'Heart (Anahata)',
    element: 'Vayu (Air & Love)',
    description: 'Activates unconditional compassion, cellular repair, and emotional transmutation.',
    harmonicKeywords: ['Miracle Tone', 'Heart DNA', 'Compassion', 'Grace'],
  },
  'Celestial Gold': {
    name: 'Celestial Gold',
    primary: '#fbbf24',
    secondary: '#fef08a',
    tertiary: '#92400e',
    glow: 'rgba(251, 191, 36, 0.75)',
    frequency: 639,
    chakra: 'Crown (Sahasrara)',
    element: 'Akasha (Pure Consciousness)',
    description: 'Radiates divine cosmic illumination, karmic protection, and universal wisdom.',
    harmonicKeywords: ['Cosmic Light', 'Sovereignty', 'Higher Mind', 'Vitality'],
  },
  'Aetheric Violet': {
    name: 'Aetheric Violet',
    primary: '#a855f7',
    secondary: '#c084fc',
    tertiary: '#3b0764',
    glow: 'rgba(168, 85, 247, 0.7)',
    frequency: 852,
    chakra: 'Third Eye (Ajna)',
    element: 'Mahat (Intuitive Space)',
    description: 'Heightens spiritual sight, astral perception, and alignment with sacred geometric order.',
    harmonicKeywords: ['Intuition', 'Mystic Vision', 'Subtle Realms', 'Dreaming'],
  },
  'Emerald Clarity': {
    name: 'Emerald Clarity',
    primary: '#10b981',
    secondary: '#34d399',
    tertiary: '#064e3b',
    glow: 'rgba(16, 185, 129, 0.65)',
    frequency: 963,
    chakra: 'Throat & Heart Synthesis',
    element: 'Prana (Vital Breath)',
    description: 'Synchronizes auric equilibrium, truth transmission, and rapid psychic purification.',
    harmonicKeywords: ['Regeneration', 'Balance', 'Truth', 'Quantum Healing'],
  },
};

interface ParticleNode extends d3.SimulationNodeDatum {
  id: number;
  radius: number;
  baseRadius: number;
  colorT: number; // 0 to 1 along spectrum
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  phase: number;
  alpha: number;
}

export const AuraFieldVisualization: React.FC<AuraFieldVisualizationProps> = ({
  theme,
  activeAura,
  onSelectAura,
  interactive = true,
  height = 240,
  compact = false,
  avatarUrl,
  userName = 'User',
  onExpand,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [fieldMode, setFieldMode] = useState<'torus' | 'vortex' | 'prana'>('torus');
  const [particleCount, setParticleCount] = useState<number>(compact ? 80 : 140);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  const isDark = theme === 'dark';
  const config = AURA_CONFIGS[activeAura] || AURA_CONFIGS['Calm Amber'];

  // Current color interpolator for D3 smooth color transitions
  const currentColorsRef = useRef({
    primary: config.primary,
    secondary: config.secondary,
    tertiary: config.tertiary,
    glow: config.glow,
  });

  // Handle Audio toggle
  const toggleAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const next = !isPlayingAudio;
    setIsPlayingAudio(next);
    if (next) {
      cosmicAudio.playFrequency(config.frequency);
    } else {
      cosmicAudio.stop();
    }
  };

  // Play updated frequency when aura changes and audio is enabled
  useEffect(() => {
    if (isPlayingAudio) {
      cosmicAudio.playFrequency(config.frequency);
    }
  }, [activeAura, config.frequency, isPlayingAudio]);

  // Main D3 Simulation Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.parentElement?.clientWidth || 300;
    let simHeight = height;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = simHeight * dpr;
    ctx.scale(dpr, dpr);

    const centerX = width / 2;
    const centerY = simHeight / 2;

    // D3 Color Interpolators for smooth transitions
    const colorInterpolator = d3.interpolateRgb(currentColorsRef.current.primary, config.primary);
    const secColorInterpolator = d3.interpolateRgb(currentColorsRef.current.secondary, config.secondary);
    const tertColorInterpolator = d3.interpolateRgb(currentColorsRef.current.tertiary, config.tertiary);

    let transitionProgress = 0;

    // Generate Nodes for D3 Physics
    const nodes: ParticleNode[] = Array.from({ length: particleCount }, (_, i) => {
      const ring = (i % 6) + 1;
      const orbitR = (ring * (Math.min(width, simHeight) * 0.38)) / 6 + Math.random() * 8;
      const angle = (i / particleCount) * Math.PI * 2 + Math.random() * 0.5;
      return {
        id: i,
        x: centerX + Math.cos(angle) * orbitR,
        y: centerY + Math.sin(angle) * orbitR,
        vx: 0,
        vy: 0,
        radius: Math.random() * 2.2 + 1.2,
        baseRadius: Math.random() * 2.2 + 1.2,
        colorT: Math.random(),
        orbitAngle: angle,
        orbitRadius: orbitR,
        orbitSpeed: ((Math.random() * 0.015 + 0.005) * (i % 2 === 0 ? 1 : -1)) * (config.frequency / 450),
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.5 + 0.4,
      };
    });

    // D3 Force Simulation
    const simulation = d3.forceSimulation<ParticleNode>(nodes)
      .force('charge', d3.forceManyBody<ParticleNode>().strength(-1.8))
      .force('radial', d3.forceRadial<ParticleNode>((d) => d.orbitRadius, centerX, centerY).strength(0.35))
      .alphaDecay(0)
      .velocityDecay(0.22);

    let time = 0;

    const render = () => {
      time += 0.02;
      if (transitionProgress < 1) {
        transitionProgress += 0.04;
      }

      const activePrimary = colorInterpolator(Math.min(1, transitionProgress));
      const activeSecondary = secColorInterpolator(Math.min(1, transitionProgress));
      const activeTertiary = tertColorInterpolator(Math.min(1, transitionProgress));

      ctx.clearRect(0, 0, width, simHeight);

      // 1. Draw Ethereal Center Glow & Bio-Photonic Radial Field
      const maxGlowRadius = Math.min(width, simHeight) * 0.55;
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        maxGlowRadius
      );
      gradient.addColorStop(0, `${activePrimary}35`);
      gradient.addColorStop(0.4, `${activeSecondary}20`);
      gradient.addColorStop(0.8, `${activeTertiary}08`);
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxGlowRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Toroidal Field Energy Waves (D3 Math Curves)
      if (fieldMode === 'torus' || fieldMode === 'vortex') {
        const ringCount = compact ? 3 : 5;
        for (let r = 1; r <= ringCount; r++) {
          const baseR = (r * maxGlowRadius) / (ringCount + 1);
          const dynamicR = baseR + Math.sin(time * 2 + r) * 4;
          
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, dynamicR, 0, Math.PI * 2);
          ctx.strokeStyle = r % 2 === 0 ? `${activePrimary}25` : `${activeSecondary}18`;
          ctx.lineWidth = 1;
          ctx.setLineDash([4 + r * 2, 6]);
          ctx.stroke();
          ctx.restore();
        }
      }

      // 3. Update & Draw Particles with D3 Physics + Custom Auric Dynamics
      nodes.forEach((node) => {
        // Orbit Angle progression
        node.orbitAngle += node.orbitSpeed;
        const breath = Math.sin(time * 1.5 + node.phase) * 6;
        
        let targetX = centerX + Math.cos(node.orbitAngle) * (node.orbitRadius + breath);
        let targetY = centerY + Math.sin(node.orbitAngle) * (node.orbitRadius + breath);

        if (fieldMode === 'vortex') {
          // Inward spiral vortex pull
          const spiralR = Math.max(15, (node.orbitRadius + (Math.sin(time + node.id) * 12)) % maxGlowRadius);
          targetX = centerX + Math.cos(node.orbitAngle + time * 0.5) * spiralR;
          targetY = centerY + Math.sin(node.orbitAngle + time * 0.5) * spiralR;
        } else if (fieldMode === 'prana') {
          // Flowing sinusoidal prana stream
          targetX += Math.sin(time * 2 + node.y * 0.05) * 8;
          targetY += Math.cos(time * 2 + node.x * 0.05) * 8;
        }

        // Pointer Attraction / Repulsion physics
        if (pointerPos.active) {
          const dx = (node.x || 0) - pointerPos.x;
          const dy = (node.y || 0) - pointerPos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const force = (90 - dist) / 90;
            node.x = (node.x || targetX) + (dx / dist) * force * 18;
            node.y = (node.y || targetY) + (dy / dist) * force * 18;
          }
        }

        // Smoothly interpolate towards harmonic orbit
        node.x = (node.x || targetX) * 0.94 + targetX * 0.06;
        node.y = (node.y || targetY) * 0.94 + targetY * 0.06;

        // Particle Color Palette along D3 spectrum
        let particleColor = activePrimary;
        if (node.colorT > 0.65) {
          particleColor = activeSecondary;
        } else if (node.colorT < 0.35) {
          particleColor = activeTertiary;
        }

        // Render Particle with Glow
        ctx.save();
        ctx.beginPath();
        const pRadius = node.baseRadius + Math.sin(time * 3 + node.phase) * 0.8;
        ctx.arc(node.x, node.y, Math.max(0.5, pRadius), 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = node.alpha;
        ctx.shadowColor = activePrimary;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        // Draw Light Ribbons between close neighboring particles (D3 Constellation effect)
        if (!compact && node.id % 4 === 0) {
          const nextNode = nodes[(node.id + 1) % nodes.length];
          if (nextNode && nextNode.x && nextNode.y && node.x && node.y) {
            const dLine = Math.hypot(node.x - nextNode.x, node.y - nextNode.y);
            if (dLine < 45) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(nextNode.x, nextNode.y);
              ctx.strokeStyle = `${activeSecondary}30`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      });

      // 4. Center Core Mandala Focus
      ctx.save();
      const corePulse = Math.sin(time * 3) * 3;
      const coreGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        2,
        centerX,
        centerY,
        24 + corePulse
      );
      coreGradient.addColorStop(0, '#ffffff');
      coreGradient.addColorStop(0.3, activePrimary);
      coreGradient.addColorStop(0.8, `${activeSecondary}50`);
      coreGradient.addColorStop(1, 'transparent');

      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 24 + corePulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Handle Resize with ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        canvas.width = width * dpr;
        canvas.height = simHeight * dpr;
        ctx.scale(dpr, dpr);
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      simulation.stop();
      resizeObserver.disconnect();
      currentColorsRef.current = {
        primary: config.primary,
        secondary: config.secondary,
        tertiary: config.tertiary,
        glow: config.glow,
      };
    };
  }, [activeAura, fieldMode, particleCount, height, compact, config]);

  // Handle pointer interaction
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!interactive || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPointerPos({ x, y, active: true });
  };

  const handlePointerLeave = () => {
    setPointerPos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div 
      ref={containerRef}
      id="aura-field-interactive-container"
      className={`rounded-2xl border transition-all duration-500 overflow-hidden relative ${
        isDark 
          ? 'bg-black/60 border-[#d4af37]/35 shadow-[0_0_25px_rgba(0,0,0,0.8)]' 
          : 'bg-white/90 border-[#c5a059]/50 shadow-lg'
      }`}
    >
      {/* Background ambient auric wash */}
      <div 
        className="absolute inset-0 pointer-events-none transition-colors duration-1000 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${config.glow}, transparent 75%)`
        }}
      />

      {/* Top Bar / Header */}
      <div className="relative z-10 px-4 pt-3.5 pb-2 flex items-center justify-between border-b border-amber-500/20">
        <div className="flex items-center gap-2.5">
          <span 
            className="w-3.5 h-3.5 rounded-full animate-pulse flex-shrink-0"
            style={{
              backgroundColor: config.primary,
              boxShadow: `0 0 12px ${config.glow}`,
            }}
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className={`text-xs sm:text-sm font-cinzel font-bold tracking-wider ${
                isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'
              }`}>
                {activeAura}
              </h4>
              <span className="text-[0.62rem] font-mono px-1.5 py-0.2 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                {config.frequency} Hz
              </span>
            </div>
            <span className={`text-[0.62rem] font-serif block ${isDark ? 'text-gray-400' : 'text-amber-900/70'}`}>
              {config.chakra} • {config.element}
            </span>
          </div>
        </div>

        {/* Quick Actions (Audio / Field Mode / Expand) */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => toggleAudio()}
            title={isPlayingAudio ? 'Mute Solfeggio Harmonic' : 'Play Solfeggio Harmonic Frequency'}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-amber-500/25 border-[#d4af37] text-[#ffd700] shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                : isDark 
                  ? 'border-gray-700 text-gray-400 hover:text-white' 
                  : 'border-amber-200 text-amber-800'
            }`}
          >
            {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Mode Switcher */}
          <div className="flex items-center bg-black/40 border border-amber-500/30 rounded-lg p-0.5 text-[0.6rem] font-cinzel">
            {(['torus', 'vortex', 'prana'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFieldMode(mode)}
                className={`px-1.5 py-0.5 rounded capitalize transition-all cursor-pointer ${
                  fieldMode === mode 
                    ? 'bg-[#d4af37] text-black font-bold shadow-sm' 
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-amber-900/70'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {onExpand && (
            <button
              onClick={onExpand}
              title="Expand Aura Sanctum"
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isDark ? 'border-gray-700 text-gray-400 hover:text-white' : 'border-amber-200 text-amber-800'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main D3 Canvas Area with Optional Avatar Overlay */}
      <div 
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="w-full h-full cursor-crosshair relative z-0 touch-none"
        />

        {/* Center Avatar Overlay with Bio-Photonic Ring */}
        {avatarUrl && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="relative group">
              <div 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border-2 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105"
                style={{
                  borderColor: config.primary,
                  boxShadow: `0 0 25px ${config.glow}`,
                }}
              >
                <img
                  src={avatarUrl}
                  alt={userName}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Pulsing Aura Corona Ring */}
              <div 
                className="absolute -inset-1.5 rounded-full border border-dashed animate-spin-slow opacity-60"
                style={{
                  borderColor: config.primary,
                }}
              />
            </div>
          </div>
        )}

        {/* Dynamic Interactive Hint */}
        <div className="absolute bottom-2 left-3 pointer-events-none z-10">
          <span className="text-[0.58rem] font-serif text-[#d4af37]/80 tracking-wide flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
            <Sparkles className="w-2.5 h-2.5 text-[#ffd700] animate-spin-slow" />
            Hover / Touch to distort Auric Prana Stream
          </span>
        </div>
      </div>

      {/* Bottom Aura Selector Chips (shifts activeAura smoothly with D3) */}
      {onSelectAura && (
        <div className="relative z-10 px-3 py-2.5 border-t border-amber-500/20 bg-black/20">
          <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-0.5">
            {(Object.keys(AURA_CONFIGS) as AuraType[]).map((auraKey) => {
              const auraItem = AURA_CONFIGS[auraKey];
              const isSelected = activeAura === auraKey;
              return (
                <button
                  key={auraKey}
                  onClick={() => onSelectAura(auraKey)}
                  className={`px-2 py-1 rounded-lg text-[0.62rem] font-cinzel font-medium flex items-center gap-1.5 flex-shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? 'border shadow-md'
                      : isDark
                        ? 'bg-black/40 border-gray-800 text-gray-400 hover:text-gray-200'
                        : 'bg-white/60 border-amber-200/60 text-[#5a4313] hover:bg-amber-50'
                  }`}
                  style={{
                    borderColor: isSelected ? auraItem.primary : undefined,
                    backgroundColor: isSelected ? `${auraItem.primary}20` : undefined,
                    color: isSelected ? (isDark ? '#fdf2d1' : '#3b2b0a') : undefined,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: auraItem.primary,
                      boxShadow: isSelected ? `0 0 8px ${auraItem.primary}` : 'none',
                    }}
                  />
                  <span>{auraItem.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
