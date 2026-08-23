import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CelestialBodyData } from '../../types';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  Activity, 
  Crosshair, 
  Radio, 
  Layers, 
  Sun, 
  Compass, 
  Volume2, 
  Cpu, 
  Terminal, 
  Maximize2,
  Sparkles,
  Zap,
  Globe
} from 'lucide-react';

interface CyberPlanetaryCanvasProps {
  selectedBody: CelestialBodyData;
  allBodies: CelestialBodyData[];
  onSelectBody: (body: CelestialBodyData) => void;
  isHologramMode?: boolean;
  onInitiateWarp?: (body: CelestialBodyData) => void;
}

export const CyberPlanetaryCanvas: React.FC<CyberPlanetaryCanvasProps> = ({
  selectedBody,
  allBodies,
  onSelectBody,
  isHologramMode = false,
  onInitiateWarp,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Interactive Controls State
  const [zoom, setZoom] = useState<number>(1.25);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1.0);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [showAtmosphere, setShowAtmosphere] = useState<boolean>(true);
  const [showWireframe, setShowWireframe] = useState<boolean>(isHologramMode);
  const [showTelemetryHUD, setShowTelemetryHUD] = useState<boolean>(true);
  const [showGalacticBackground, setShowGalacticBackground] = useState<boolean>(true);
  const [lightAngle, setLightAngle] = useState<number>(0.75); // radians
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Mouse drag orbit rotation state
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const manualRotationRef = useRef<{ x: number; y: number }>({ x: 0.15, y: 0.3 });
  const animationFrameIdRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // Stars and Nebula cache
  const starsRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    brightness: number;
    speed: number;
    color: string;
    twinklePhase: number;
    hasDiffraction: boolean;
  }>>([]);

  const nebulaeRef = useRef<Array<{
    x: number;
    y: number;
    radius: number;
    color: string;
    opacity: number;
    detailSeeds: number[];
  }>>([]);

  // Initialize Deep Space Galaxy & Starfield
  useEffect(() => {
    const starColors = [
      '#ffffff', // White
      '#93c5fd', // Blue hot (Class O/B)
      '#60a5fa', // Deep blue
      '#fde047', // Yellow dwarf (Class G like Sun)
      '#fdba74', // Orange (Class K)
      '#f87171', // Red giant (Class M)
      '#00f3ff', // Cyan cyber
      '#ffd700', // Gold
    ];

    const generatedStars = [];
    for (let i = 0; i < 2200; i++) {
      generatedStars.push({
        x: (Math.random() - 0.5) * 4000,
        y: (Math.random() - 0.5) * 4000,
        size: Math.random() < 0.95 ? Math.random() * 1.5 + 0.5 : Math.random() * 3.2 + 1.8,
        brightness: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.003 + 0.001,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        twinklePhase: Math.random() * Math.PI * 2,
        hasDiffraction: Math.random() < 0.04,
      });
    }
    starsRef.current = generatedStars;

    // Glowing Galactic Nebulae
    const generatedNebulae = [
      { x: -350, y: -220, radius: 480, color: '#3b82f6', opacity: 0.18, detailSeeds: [12, 45, 78] },
      { x: 380, y: 260, radius: 520, color: '#ec4899', opacity: 0.16, detailSeeds: [34, 67, 89] },
      { x: 220, y: -300, radius: 420, color: '#8b5cf6', opacity: 0.2, detailSeeds: [21, 54, 93] },
      { x: -280, y: 340, radius: 460, color: '#06b6d4', opacity: 0.17, detailSeeds: [19, 82, 41] },
      { x: 0, y: 0, radius: 700, color: '#ffd700', opacity: 0.07, detailSeeds: [55, 99, 11] },
    ];
    nebulaeRef.current = generatedNebulae;
  }, []);

  // Play Frequency Tone
  const handlePlaySound = () => {
    setIsPlayingAudio(true);
    cosmicAudio.playCyberScan();
    setTimeout(() => {
      cosmicAudio.playTeslaFrequency(selectedBody.vibrationalFrequencyHz, 3.5);
    }, 120);
    setTimeout(() => setIsPlayingAudio(false), 3600);
  };

  // Drag listeners for mouse & touch
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;
    manualRotationRef.current.y += deltaX * 0.007;
    manualRotationRef.current.x += deltaY * 0.007;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setZoom((prev) => {
      const next = prev - e.deltaY * 0.0015;
      return Math.min(Math.max(next, 0.45), 3.5);
    });
  };

  // Touch Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
    const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;
    manualRotationRef.current.y += deltaX * 0.009;
    manualRotationRef.current.x += deltaY * 0.009;
    previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Main 60 FPS Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isMounted = true;

    const render = () => {
      if (!isMounted || !canvas || !ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      timeRef.current += 0.016 * (isRotating ? rotationSpeed : 0);
      const t = timeRef.current;

      // Clear Screen with deep cosmic void
      ctx.fillStyle = '#02040a';
      ctx.fillRect(0, 0, width, height);

      // 1. RENDER DEEP GALAXY NEBULAE & SPIRAL CORE
      if (showGalacticBackground) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        // Draw soft volumetric Nebulae
        nebulaeRef.current.forEach((nebula) => {
          const nx = cx + nebula.x;
          const ny = cy + nebula.y;
          const grad = ctx.createRadialGradient(nx, ny, 10, nx, ny, nebula.radius);
          grad.addColorStop(0, nebula.color);
          grad.addColorStop(0.4, `${nebula.color}88`);
          grad.addColorStop(0.8, `${nebula.color}22`);
          grad.addColorStop(1, 'transparent');

          ctx.fillStyle = grad;
          ctx.globalAlpha = nebula.opacity;
          ctx.beginPath();
          ctx.arc(nx, ny, nebula.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        // Spiral Galactic Arms Background
        const spiralGrad = ctx.createRadialGradient(cx, cy, 50, cx, cy, Math.max(width, height) * 0.7);
        spiralGrad.addColorStop(0, 'rgba(255, 220, 150, 0.12)');
        spiralGrad.addColorStop(0.3, 'rgba(120, 80, 240, 0.09)');
        spiralGrad.addColorStop(0.7, 'rgba(0, 243, 255, 0.04)');
        spiralGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = spiralGrad;
        ctx.fillRect(0, 0, width, height);

        ctx.restore();

        // 2. RENDER MULTI-LAYERED PARALLAX STARFIELD
        ctx.save();
        const rotX = manualRotationRef.current.x * 0.1;
        const rotY = manualRotationRef.current.y * 0.1;

        starsRef.current.forEach((star) => {
          // Parallax offset
          const sx = ((star.x + rotY * 300) % width + width) % width;
          const sy = ((star.y + rotX * 300) % height + height) % height;
          const twinkle = Math.sin(t * 2 + star.twinklePhase) * 0.35 + 0.65;
          const alpha = Math.min(Math.max(star.brightness * twinkle, 0.15), 1.0);

          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
          ctx.fill();

          // Cinematic Diffraction Spikes on bright stars
          if (star.hasDiffraction && alpha > 0.6) {
            ctx.strokeStyle = star.color;
            ctx.lineWidth = 0.6;
            ctx.globalAlpha = alpha * 0.7;
            const spikeLen = star.size * 5;
            ctx.beginPath();
            ctx.moveTo(sx - spikeLen, sy);
            ctx.lineTo(sx + spikeLen, sy);
            ctx.moveTo(sx, sy - spikeLen);
            ctx.lineTo(sx, sy + spikeLen);
            ctx.stroke();
          }
        });
        ctx.restore();
      }

      // 3. RENDER CYBERNETIC ORBITAL RETICLE & GRID MATRIX
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.08)';
      ctx.lineWidth = 1;
      
      // Cyber grid lines
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Concentric Orbital Telemetry Rings
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.12)';
      ctx.setLineDash([4, 6]);
      [140, 260, 390, 520].forEach((r) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r * zoom, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.restore();

      // 4. RENDER HIGH-DEFINITION MOVIE-REALISTIC PLANET SHADER
      const baseRadius = (Math.min(width, height) * 0.24) * zoom;
      const planetRadius = Math.max(baseRadius, 40);

      const sphereRotY = manualRotationRef.current.y + t * 0.4;
      const sphereRotX = manualRotationRef.current.x;

      ctx.save();
      ctx.translate(cx, cy);

      // Light source vector
      const lx = Math.cos(lightAngle);
      const ly = -Math.sin(lightAngle) * 0.4;
      const lz = 0.85;

      const bodyId = selectedBody.id.toLowerCase();

      if (showWireframe) {
        // HOLOGRAPHIC CYBER WIREFRAME MODE
        renderHologramSphere(ctx, planetRadius, sphereRotX, sphereRotY, selectedBody.color);
      } else if (bodyId.includes('sun')) {
        // PHOTOREALISTIC DYNAMIC SUN SHADER
        renderPhotorealisticSun(ctx, planetRadius, t, selectedBody);
      } else if (bodyId.includes('earth')) {
        // PHOTOREALISTIC EARTH (Clouds, Day/Night terminator, Glowing City Lights, Cyan Atmosphere)
        renderPhotorealisticEarth(ctx, planetRadius, sphereRotX, sphereRotY, lx, ly, lz, showAtmosphere);
      } else if (bodyId.includes('jupiter')) {
        // PHOTOREALISTIC JUPITER (Dynamic Swirling Bands, Great Red Spot, Atmospheric Depth)
        renderPhotorealisticJupiter(ctx, planetRadius, sphereRotX, sphereRotY, lx, ly, lz, showAtmosphere);
      } else if (bodyId.includes('saturn')) {
        // PHOTOREALISTIC SATURN (Golden Ochre bands, 3D Rings with Cassini Division & Shadow Casting)
        renderPhotorealisticSaturn(ctx, planetRadius, sphereRotX, sphereRotY, lx, ly, lz, showAtmosphere);
      } else if (bodyId.includes('mars')) {
        // PHOTOREALISTIC MARS (Iron oxide red crust, Polar Ice Cap, Valles Marineris, Dust atmosphere)
        renderPhotorealisticMars(ctx, planetRadius, sphereRotX, sphereRotY, lx, ly, lz, showAtmosphere);
      } else if (bodyId.includes('moon')) {
        // PHOTOREALISTIC MOON (Crater Basins, Lunar Maria, stark shadow contrast)
        renderPhotorealisticMoon(ctx, planetRadius, sphereRotX, sphereRotY, lx, ly, lz);
      } else if (bodyId.includes('venus')) {
        // PHOTOREALISTIC VENUS (Golden Sulfur clouds, dense greenhouse Rayleigh glow)
        renderPhotorealisticVenus(ctx, planetRadius, sphereRotX, sphereRotY, lx, ly, lz, showAtmosphere);
      } else if (bodyId.includes('uranus') || bodyId.includes('neptune')) {
        // PHOTOREALISTIC ICE GIANTS (Cyan/Azure methane atmospheres, delicate rings)
        renderPhotorealisticIceGiant(ctx, planetRadius, sphereRotX, sphereRotY, lx, ly, lz, bodyId.includes('uranus') ? '#22d3ee' : '#3b82f6', showAtmosphere);
      } else if (bodyId.includes('blackhole')) {
        // PHOTOREALISTIC BLACK HOLE GARGANTUA (Lensing & Relativistic Accretion Disk)
        renderPhotorealisticBlackHole(ctx, planetRadius, t);
      } else {
        // GENERIC PHOTOREALISTIC ROCKY / GAS PLANET
        renderGenericPhotorealisticPlanet(ctx, planetRadius, sphereRotX, sphereRotY, lx, ly, lz, selectedBody, showAtmosphere);
      }

      // 5. CYBERNETIC TARGETING RETICLES OVERLAY
      if (showTelemetryHUD) {
        renderCyberTargetingHUD(ctx, planetRadius, selectedBody, isPlayingAudio);
      }

      ctx.restore();

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      isMounted = false;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [
    selectedBody, 
    zoom, 
    rotationSpeed, 
    isRotating, 
    showAtmosphere, 
    showWireframe, 
    showTelemetryHUD, 
    showGalacticBackground, 
    lightAngle, 
    isPlayingAudio
  ]);

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
    <div className="relative w-full h-full min-h-[580px] lg:min-h-[700px] flex flex-col bg-[#030712] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_50px_rgba(0,243,255,0.15)] select-none">
      {/* Top Cyber Telemetry Header */}
      <div className="absolute top-0 inset-x-0 z-20 flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#050914]/90 backdrop-blur-md border-b border-cyan-500/20 text-xs font-mono text-cyan-300">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-cyan-950/70 border border-cyan-400/40 rounded">
            <Crosshair className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="font-bold tracking-wider text-cyan-100 uppercase">
              TARGET: {selectedBody.name}
            </span>
          </div>
          <span className="hidden sm:inline-block text-cyan-500/80">
            [FREQ: {selectedBody.vibrationalFrequencyHz} Hz]
          </span>
          <span className="hidden md:inline-block text-amber-400/90">
            [TESLA HARMONIC: #{selectedBody.teslaHarmonicNumber}]
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlaySound}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
              isPlayingAudio
                ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.4)] animate-pulse'
                : 'bg-cyan-950/60 hover:bg-cyan-900/60 border-cyan-500/30 text-cyan-300'
            }`}
            title="Synthesize Tesla & Planetary Resonance"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{isPlayingAudio ? 'TRANSDUCING...' : 'TUNE FREQ'}</span>
          </button>

          {onInitiateWarp && (
            <button
              onClick={() => onInitiateWarp(selectedBody)}
              className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-bold rounded text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>ENGAGE WARP</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive WebGL / Canvas Stage */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full h-full flex-1 cursor-grab active:cursor-grabbing block"
      />

      {/* Cyber-Hacker Quick Planet Selector Toolbar (Bottom Dock) */}
      <div className="absolute bottom-16 inset-x-3 sm:inset-x-6 z-20 flex items-center justify-center">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[#050b18]/90 backdrop-blur-xl border border-cyan-500/30 rounded-xl max-w-full overflow-x-auto no-scrollbar shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          {allBodies.map((body) => {
            const isSelected = body.id === selectedBody.id;
            return (
              <button
                key={body.id}
                onClick={() => {
                  cosmicAudio.playCyberKeystroke();
                  onSelectBody(body);
                }}
                className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 whitespace-nowrap ${
                  isSelected
                    ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-100 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                    : 'bg-black/40 hover:bg-cyan-950/50 border border-cyan-900/40 text-cyan-400/80 hover:text-cyan-200'
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full border border-white/40 shadow-sm"
                  style={{ backgroundColor: body.color, boxShadow: `0 0 8px ${body.color}` }}
                />
                <span className="font-semibold">{body.name.split(' ')[0]}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Cyber Status Telemetry Strip */}
      <div className="absolute bottom-0 inset-x-0 z-20 flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-[#050914]/90 backdrop-blur-md border-t border-cyan-500/20 text-[11px] font-mono text-cyan-400/80">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ORBIT LOCK: 100%
          </span>
          <span className="hidden md:inline-block">
            DISTANCE: {selectedBody.distanceFromSun}
          </span>
          <span className="hidden lg:inline-block text-amber-300">
            CHAKRA: {selectedBody.chakraResonance.split(' ')[0]}
          </span>
        </div>

        {/* Canvas Render Tweaks */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowWireframe(!showWireframe)}
            className={`px-2 py-0.5 rounded border text-[10px] uppercase font-bold tracking-wider transition-all ${
              showWireframe
                ? 'bg-cyan-500/30 border-cyan-400 text-cyan-100'
                : 'bg-black/50 border-cyan-800/40 text-cyan-400/70 hover:text-cyan-200'
            }`}
            title="Toggle Hologram Wireframe"
          >
            {showWireframe ? 'HOLOGRAM: ON' : 'REALISTIC: ON'}
          </button>

          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-2 py-0.5 rounded border text-[10px] uppercase font-bold tracking-wider transition-all ${
              isRotating
                ? 'bg-cyan-500/30 border-cyan-400 text-cyan-100'
                : 'bg-black/50 border-cyan-800/40 text-cyan-400/70 hover:text-cyan-200'
            }`}
          >
            {isRotating ? 'ROTATING' : 'PAUSED'}
          </button>

          <div className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded border border-cyan-900/40">
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.2, 0.5))}
              className="p-1 hover:text-cyan-200"
              title="Zoom Out"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="text-[10px] text-cyan-300">{zoom.toFixed(1)}x</span>
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.2, 3.0))}
              className="p-1 hover:text-cyan-200"
              title="Zoom In"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// HIGH-DEFINITION MOVIE-REALISTIC 2D CANVAS PLANET SHADERS
// =========================================================================

/**
 * 1. PHOTOREALISTIC EARTH
 * Includes dynamic Rayleigh cyan atmosphere scattering, multi-layered swirling clouds,
 * specular ocean gleam, day/night terminator line, and GLOWING NIGHT CITY LIGHTS!
 */
function renderPhotorealisticEarth(
  ctx: CanvasRenderingContext2D,
  r: number,
  rotX: number,
  rotY: number,
  lx: number,
  ly: number,
  lz: number,
  hasAtmosphere: boolean
) {
  // 1. Atmosphere Rayleigh Outer Glow Halo
  if (hasAtmosphere) {
    const atmoGrad = ctx.createRadialGradient(0, 0, r * 0.95, 0, 0, r * 1.25);
    atmoGrad.addColorStop(0, 'rgba(0, 243, 255, 0.45)');
    atmoGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.25)');
    atmoGrad.addColorStop(0.7, 'rgba(30, 64, 175, 0.1)');
    atmoGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = atmoGrad;
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.25, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Base Ocean Sphere (Deep Blue Water)
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();

  // Ocean base gradient
  const oceanGrad = ctx.createRadialGradient(-r * 0.3, -r * 0.3, 0, 0, 0, r);
  oceanGrad.addColorStop(0, '#1e40af'); // Vibrant azure
  oceanGrad.addColorStop(0.5, '#0f172a'); // Deep sea blue
  oceanGrad.addColorStop(1, '#020617'); // Abyssal edge
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(-r, -r, r * 2, r * 2);

  // 3. Continents Landmasses with Biome Shading
  ctx.save();
  const numContinents = 7;
  for (let i = 0; i < numContinents; i++) {
    const offsetAngle = rotY + (i * Math.PI * 2) / numContinents;
    const cx = Math.sin(offsetAngle) * r * 0.75;
    const cy = Math.sin(i * 1.3 + rotX) * r * 0.45;
    const contRadius = r * (0.28 + (i % 3) * 0.08);

    if (Math.cos(offsetAngle) > -0.2) {
      // Visible on front hemisphere
      const landGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, contRadius);
      landGrad.addColorStop(0, '#15803d'); // Lush forest green
      landGrad.addColorStop(0.5, '#ca8a04'); // Savanna/Plains
      landGrad.addColorStop(0.85, '#92400e'); // Mountains / Coast
      landGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = landGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, contRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();

  // 4. Glowing Golden City Lights on the Night/Shadow Side
  ctx.save();
  const numCities = 14;
  for (let i = 0; i < numCities; i++) {
    const angle = rotY + (i * 0.85);
    const cx = Math.sin(angle) * r * 0.65;
    const cy = Math.cos(i * 1.7) * r * 0.5;

    // Check if city is on the shadow side (opposite to light lx)
    const isNightSide = (cx * lx + cy * ly) < 0.1 && Math.cos(angle) > 0;
    if (isNightSide) {
      const cityGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 14);
      cityGrad.addColorStop(0, 'rgba(253, 224, 71, 0.9)'); // Bright gold city cluster
      cityGrad.addColorStop(0.5, 'rgba(251, 146, 60, 0.4)');
      cityGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = cityGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();

  // 5. Dynamic Cloud Layers Swirling over Continents
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  const cloudRot = rotY * 1.25; // Clouds rotate slightly faster than crust
  for (let i = 0; i < 9; i++) {
    const cAngle = cloudRot + i * 0.7;
    const cx = Math.sin(cAngle) * r * 0.8;
    const cy = Math.sin(i * 2.1) * r * 0.6;
    const cSize = r * (0.2 + (i % 4) * 0.07);

    if (Math.cos(cAngle) > -0.2) {
      ctx.beginPath();
      ctx.ellipse(cx, cy, cSize * 1.5, cSize * 0.65, 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();

  // 6. Day/Night Spherical Terminator Shadow & Ocean Specular Glint
  const shadowGrad = ctx.createRadialGradient(
    lx * r * 0.4,
    ly * r * 0.4,
    r * 0.2,
    0,
    0,
    r * 1.05
  );
  shadowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.12)'); // Sunlight diffuse
  shadowGrad.addColorStop(0.55, 'rgba(0, 0, 0, 0.2)');
  shadowGrad.addColorStop(0.85, 'rgba(2, 6, 23, 0.85)'); // Terminator line
  shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.98)'); // Dark night side
  ctx.fillStyle = shadowGrad;
  ctx.fillRect(-r, -r, r * 2, r * 2);

  // Ocean Specular Glint (Sun glinting off ocean surface)
  const glintGrad = ctx.createRadialGradient(lx * r * 0.5, ly * r * 0.5, 0, lx * r * 0.5, ly * r * 0.5, r * 0.35);
  glintGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
  glintGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.2)');
  glintGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glintGrad;
  ctx.fillRect(-r, -r, r * 2, r * 2);

  ctx.restore();
}

/**
 * 2. PHOTOREALISTIC SUN (SOL)
 * Dynamic boiling plasma granules, coronal mass ejections, solar flares, and immense luminous radiance.
 */
function renderPhotorealisticSun(
  ctx: CanvasRenderingContext2D,
  r: number,
  t: number,
  body: CelestialBodyData
) {
  ctx.save();

  // 1. Extreme Outer Solar Corona
  const coronaGrad = ctx.createRadialGradient(0, 0, r * 0.8, 0, 0, r * 2.2);
  coronaGrad.addColorStop(0, 'rgba(254, 240, 138, 0.8)');
  coronaGrad.addColorStop(0.3, 'rgba(251, 191, 36, 0.45)');
  coronaGrad.addColorStop(0.6, 'rgba(239, 68, 68, 0.2)');
  coronaGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = coronaGrad;
  ctx.beginPath();
  ctx.arc(0, 0, r * 2.2, 0, Math.PI * 2);
  ctx.fill();

  // 2. Coronal Mass Ejection Loops & Solar Prominences
  ctx.strokeStyle = 'rgba(251, 146, 60, 0.6)';
  ctx.lineWidth = 3;
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8 + t * 0.3;
    const flareR = r * (1.1 + Math.sin(t * 3 + i) * 0.25);
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * r, Math.sin(angle) * r, r * 0.3, angle - 0.5, angle + 0.5);
    ctx.stroke();
  }

  // 3. Solar Photosphere Core
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();

  const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
  coreGrad.addColorStop(0, '#ffffff'); // Pure white-hot fusion core
  coreGrad.addColorStop(0.25, '#fef08a'); // Brilliant yellow
  coreGrad.addColorStop(0.65, '#f59e0b'); // Golden plasma
  coreGrad.addColorStop(0.9, '#ea580c'); // Orange granules
  coreGrad.addColorStop(1, '#991b1b'); // Limb darkening edge
  ctx.fillStyle = coreGrad;
  ctx.fillRect(-r, -r, r * 2, r * 2);

  // 4. Dynamic Boiling Convection Plasma Granules
  ctx.fillStyle = 'rgba(254, 243, 199, 0.4)';
  for (let i = 0; i < 18; i++) {
    const a = t * 0.5 + i * 0.4;
    const px = Math.cos(a) * (r * 0.65) * Math.sin(i * 1.5);
    const py = Math.sin(a) * (r * 0.65) * Math.cos(i * 2.2);
    const gSize = 12 + Math.sin(t * 4 + i) * 6;
    ctx.beginPath();
    ctx.arc(px, py, gSize, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * 3. PHOTOREALISTIC JUPITER
 * High-speed swirling cloud belts (equatorial zones, temperate belts) with differential rotation,
 * turbulent eddy swirls, and the Great Red Spot with counter-rotation.
 */
function renderPhotorealisticJupiter(
  ctx: CanvasRenderingContext2D,
  r: number,
  rotX: number,
  rotY: number,
  lx: number,
  ly: number,
  lz: number,
  hasAtmosphere: boolean
) {
  // Atmosphere Haze
  if (hasAtmosphere) {
    const haze = ctx.createRadialGradient(0, 0, r * 0.95, 0, 0, r * 1.15);
    haze.addColorStop(0, 'rgba(251, 146, 60, 0.3)');
    haze.addColorStop(1, 'transparent');
    ctx.fillStyle = haze;
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.15, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();

  // Base spherical fill
  ctx.fillStyle = '#fef3c7';
  ctx.fillRect(-r, -r, r * 2, r * 2);

  // Horizontal Atmospheric Belts
  const belts = [
    { y: -0.8, h: 0.2, color: '#78350f' }, // North Polar
    { y: -0.6, h: 0.18, color: '#b45309' }, // North Temperate
    { y: -0.42, h: 0.22, color: '#fef3c7' }, // North Tropical Zone (White)
    { y: -0.2, h: 0.25, color: '#9a3412' }, // North Equatorial Belt (Deep Ochre)
    { y: 0.05, h: 0.2, color: '#fde68a' }, // Equatorial Zone
    { y: 0.25, h: 0.26, color: '#c2410c' }, // South Equatorial Belt (Hosts Red Spot)
    { y: 0.51, h: 0.18, color: '#fef3c7' }, // South Tropical Zone
    { y: 0.69, h: 0.25, color: '#78350f' }, // South Polar
  ];

  belts.forEach((belt) => {
    ctx.fillStyle = belt.color;
    ctx.fillRect(-r, belt.y * r, r * 2, belt.h * r);
  });

  // Swirling Turbulent Eddies in the belts
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  for (let i = 0; i < 8; i++) {
    const ex = ((Math.sin(rotY * 2 + i * 1.1) * r * 0.85));
    const ey = (-0.35 + (i % 4) * 0.25) * r;
    ctx.beginPath();
    ctx.ellipse(ex, ey, 22, 6, 0.1, 0, Math.PI * 2);
    ctx.fill();
  }

  // THE GREAT RED SPOT (Monumental rotating anticyclonic storm)
  const grsAngle = rotY + Math.PI * 0.3;
  if (Math.cos(grsAngle) > -0.2) {
    const grsX = Math.sin(grsAngle) * r * 0.65;
    const grsY = r * 0.32; // South hemisphere

    const grsGrad = ctx.createRadialGradient(grsX, grsY, 0, grsX, grsY, r * 0.22);
    grsGrad.addColorStop(0, '#991b1b'); // Crimson eye
    grsGrad.addColorStop(0.6, '#dc2626'); // Scarlet storm body
    grsGrad.addColorStop(1, '#f97316'); // Outer turbulent swirl
    ctx.fillStyle = grsGrad;
    ctx.beginPath();
    ctx.ellipse(grsX, grsY, r * 0.22, r * 0.14, 0.15, 0, Math.PI * 2);
    ctx.fill();
  }

  // Spherical Terminator Shadow
  const shadow = ctx.createRadialGradient(lx * r * 0.4, ly * r * 0.4, r * 0.3, 0, 0, r * 1.05);
  shadow.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
  shadow.addColorStop(0.6, 'rgba(0, 0, 0, 0.3)');
  shadow.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
  ctx.fillStyle = shadow;
  ctx.fillRect(-r, -r, r * 2, r * 2);

  ctx.restore();
}

/**
 * 4. PHOTOREALISTIC SATURN
 * Magnificent golden-ochre gas giant with 3D rings, Cassini division gap,
 * and realistic ring shadow cast onto planet + planet shadow cast onto rings!
 */
function renderPhotorealisticSaturn(
  ctx: CanvasRenderingContext2D,
  r: number,
  rotX: number,
  rotY: number,
  lx: number,
  ly: number,
  lz: number,
  hasAtmosphere: boolean
) {
  // 1. Draw Back Portion of Rings (behind planet)
  renderSaturnRings(ctx, r, true);

  // 2. Planet Globe
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();

  // Saturn golden atmospheric bands
  const saturnGrad = ctx.createLinearGradient(0, -r, 0, r);
  saturnGrad.addColorStop(0, '#78350f');
  saturnGrad.addColorStop(0.2, '#ca8a04');
  saturnGrad.addColorStop(0.4, '#eab308');
  saturnGrad.addColorStop(0.6, '#fef08a');
  saturnGrad.addColorStop(0.8, '#d97706');
  saturnGrad.addColorStop(1, '#78350f');
  ctx.fillStyle = saturnGrad;
  ctx.fillRect(-r, -r, r * 2, r * 2);

  // North Pole Hexagon
  const hexY = -r * 0.75;
  ctx.fillStyle = 'rgba(113, 63, 18, 0.6)';
  ctx.beginPath();
  ctx.arc(0, hexY, r * 0.18, 0, Math.PI * 2);
  ctx.fill();

  // Shadow of Rings Cast onto the Planet Surface
  ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
  ctx.fillRect(-r, -r * 0.12, r * 2, r * 0.25);

  // Spherical Terminator Shadow
  const shadow = ctx.createRadialGradient(lx * r * 0.4, ly * r * 0.4, r * 0.3, 0, 0, r * 1.05);
  shadow.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
  shadow.addColorStop(0.6, 'rgba(0, 0, 0, 0.35)');
  shadow.addColorStop(1, 'rgba(0, 0, 0, 0.96)');
  ctx.fillStyle = shadow;
  ctx.fillRect(-r, -r, r * 2, r * 2);

  ctx.restore();

  // 3. Draw Front Portion of Rings (in front of planet)
  renderSaturnRings(ctx, r, false);
}

function renderSaturnRings(ctx: CanvasRenderingContext2D, r: number, isBack: boolean) {
  ctx.save();
  ctx.beginPath();
  // Tilt rings slightly for 3D perspective
  ctx.rotate(0.35);

  const innerR = r * 1.35;
  const outerR = r * 2.4;
  const cassiniGapInner = r * 1.85;
  const cassiniGapOuter = r * 1.95;

  // Clip to front or back half
  ctx.beginPath();
  if (isBack) {
    ctx.rect(-outerR * 1.2, -outerR * 1.2, outerR * 2.4, outerR * 1.2);
  } else {
    ctx.rect(-outerR * 1.2, 0, outerR * 2.4, outerR * 1.2);
  }
  ctx.clip();

  // Ring A & B
  const ringGrad = ctx.createRadialGradient(0, 0, innerR, 0, 0, outerR);
  ringGrad.addColorStop(0, 'rgba(234, 179, 8, 0.85)');
  ringGrad.addColorStop(0.35, 'rgba(254, 240, 138, 0.9)');
  ringGrad.addColorStop(0.55, 'rgba(161, 98, 7, 0.85)');
  ringGrad.addColorStop(0.65, 'rgba(0, 0, 0, 0.05)'); // Cassini Division Gap
  ringGrad.addColorStop(0.72, 'rgba(234, 179, 8, 0.7)');
  ringGrad.addColorStop(1, 'rgba(113, 63, 18, 0.1)');

  ctx.fillStyle = ringGrad;
  ctx.beginPath();
  ctx.ellipse(0, 0, outerR, outerR * 0.32, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cut out center hole
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.ellipse(0, 0, innerR, innerR * 0.32, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * 5. PHOTOREALISTIC MARS
 * Red iron oxide crust, dry ice North Polar Cap, Valles Marineris canyon rift, and dusty atmosphere.
 */
function renderPhotorealisticMars(
  ctx: CanvasRenderingContext2D,
  r: number,
  rotX: number,
  rotY: number,
  lx: number,
  ly: number,
  lz: number,
  hasAtmosphere: boolean
) {
  if (hasAtmosphere) {
    const atmo = ctx.createRadialGradient(0, 0, r * 0.95, 0, 0, r * 1.15);
    atmo.addColorStop(0, 'rgba(239, 68, 68, 0.35)');
    atmo.addColorStop(0.6, 'rgba(249, 115, 22, 0.15)');
    atmo.addColorStop(1, 'transparent');
    ctx.fillStyle = atmo;
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.15, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();

  // Base red basalt terrain
  const marsBase = ctx.createRadialGradient(-r * 0.2, -r * 0.2, 0, 0, 0, r);
  marsBase.addColorStop(0, '#ef4444');
  marsBase.addColorStop(0.5, '#b91c1c');
  marsBase.addColorStop(1, '#450a0a');
  ctx.fillStyle = marsBase;
  ctx.fillRect(-r, -r, r * 2, r * 2);

  // Dark volcanic plains & Valles Marineris
  ctx.fillStyle = 'rgba(69, 10, 10, 0.7)';
  for (let i = 0; i < 5; i++) {
    const a = rotY + i * 1.2;
    const mx = Math.sin(a) * r * 0.6;
    const my = Math.cos(i * 2.1) * r * 0.4;
    ctx.beginPath();
    ctx.ellipse(mx, my, r * 0.3, r * 0.12, 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Brilliant White Polar Dry-Ice Cap
  ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
  ctx.beginPath();
  ctx.ellipse(0, -r * 0.85, r * 0.35, r * 0.15, 0, 0, Math.PI * 2);
  ctx.fill();

  // Terminator Shadow
  const shadow = ctx.createRadialGradient(lx * r * 0.4, ly * r * 0.4, r * 0.25, 0, 0, r * 1.05);
  shadow.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
  shadow.addColorStop(0.65, 'rgba(0, 0, 0, 0.4)');
  shadow.addColorStop(1, 'rgba(0, 0, 0, 0.98)');
  ctx.fillStyle = shadow;
  ctx.fillRect(-r, -r, r * 2, r * 2);

  ctx.restore();
}

/**
 * 6. PHOTOREALISTIC MOON
 * Heavily cratered basalt crust, stark zero-atmosphere lighting, and lunar maria lava basins.
 */
function renderPhotorealisticMoon(
  ctx: CanvasRenderingContext2D,
  r: number,
  rotX: number,
  rotY: number,
  lx: number,
  ly: number,
  lz: number
) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();

  // Gray Anorthosite Crust
  const moonGrad = ctx.createRadialGradient(-r * 0.3, -r * 0.3, 0, 0, 0, r);
  moonGrad.addColorStop(0, '#e2e8f0');
  moonGrad.addColorStop(0.6, '#94a3b8');
  moonGrad.addColorStop(1, '#1e293b');
  ctx.fillStyle = moonGrad;
  ctx.fillRect(-r, -r, r * 2, r * 2);

  // Dark Lunar Maria (Basalt Lava Seas)
  ctx.fillStyle = 'rgba(30, 41, 59, 0.75)';
  const maria = [
    { x: -0.2, y: -0.3, rx: 0.25, ry: 0.18 },
    { x: 0.25, y: -0.15, rx: 0.22, ry: 0.25 },
    { x: -0.1, y: 0.2, rx: 0.3, ry: 0.2 },
  ];
  maria.forEach((m) => {
    ctx.beginPath();
    ctx.ellipse(m.x * r, m.y * r, m.rx * r, m.ry * r, 0.3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Impact Craters with bright ejecta rays
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  ctx.lineWidth = 1;
  [
    { x: 0.35, y: 0.45, cr: 14 }, // Tycho
    { x: -0.4, y: 0.1, cr: 10 },  // Copernicus
    { x: 0.1, y: -0.4, cr: 12 },
  ].forEach((c) => {
    ctx.beginPath();
    ctx.arc(c.x * r, c.y * r, c.cr, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  // Stark Zero-Atmosphere Terminator Line
  const shadow = ctx.createRadialGradient(lx * r * 0.4, ly * r * 0.4, r * 0.2, 0, 0, r * 1.05);
  shadow.addColorStop(0, 'transparent');
  shadow.addColorStop(0.5, 'rgba(0, 0, 0, 0.4)');
  shadow.addColorStop(0.85, 'rgba(0, 0, 0, 0.95)');
  shadow.addColorStop(1, '#000000');
  ctx.fillStyle = shadow;
  ctx.fillRect(-r, -r, r * 2, r * 2);

  ctx.restore();
}

/**
 * 7. PHOTOREALISTIC VENUS
 * Golden sulfuric acid cloud blanket with dense greenhouse atmospheric glow.
 */
function renderPhotorealisticVenus(
  ctx: CanvasRenderingContext2D,
  r: number,
  rotX: number,
  rotY: number,
  lx: number,
  ly: number,
  lz: number,
  hasAtmosphere: boolean
) {
  if (hasAtmosphere) {
    const atmo = ctx.createRadialGradient(0, 0, r * 0.95, 0, 0, r * 1.25);
    atmo.addColorStop(0, 'rgba(251, 191, 36, 0.5)');
    atmo.addColorStop(0.6, 'rgba(244, 114, 182, 0.2)');
    atmo.addColorStop(1, 'transparent');
    ctx.fillStyle = atmo;
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.25, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();

  const venusGrad = ctx.createRadialGradient(-r * 0.3, -r * 0.3, 0, 0, 0, r);
  venusGrad.addColorStop(0, '#fef08a');
  venusGrad.addColorStop(0.4, '#fbbf24');
  venusGrad.addColorStop(0.8, '#f472b6');
  venusGrad.addColorStop(1, '#831843');
  ctx.fillStyle = venusGrad;
  ctx.fillRect(-r, -r, r * 2, r * 2);

  // Soft Swirling Sulfuric Clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  for (let i = 0; i < 6; i++) {
    const vx = Math.sin(rotY * 0.8 + i) * r * 0.7;
    const vy = Math.cos(i * 1.5) * r * 0.6;
    ctx.beginPath();
    ctx.ellipse(vx, vy, r * 0.4, r * 0.15, 0.25, 0, Math.PI * 2);
    ctx.fill();
  }

  // Terminator Shadow
  const shadow = ctx.createRadialGradient(lx * r * 0.4, ly * r * 0.4, r * 0.25, 0, 0, r * 1.05);
  shadow.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
  shadow.addColorStop(0.65, 'rgba(0, 0, 0, 0.35)');
  shadow.addColorStop(1, 'rgba(0, 0, 0, 0.98)');
  ctx.fillStyle = shadow;
  ctx.fillRect(-r, -r, r * 2, r * 2);

  ctx.restore();
}

/**
 * 8. PHOTOREALISTIC ICE GIANTS (URANUS / NEPTUNE)
 */
function renderPhotorealisticIceGiant(
  ctx: CanvasRenderingContext2D,
  r: number,
  rotX: number,
  rotY: number,
  lx: number,
  ly: number,
  lz: number,
  primaryColor: string,
  hasAtmosphere: boolean
) {
  if (hasAtmosphere) {
    const atmo = ctx.createRadialGradient(0, 0, r * 0.95, 0, 0, r * 1.2);
    atmo.addColorStop(0, `${primaryColor}66`);
    atmo.addColorStop(1, 'transparent');
    ctx.fillStyle = atmo;
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();

  const grad = ctx.createRadialGradient(-r * 0.3, -r * 0.3, 0, 0, 0, r);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.3, primaryColor);
  grad.addColorStop(0.8, '#0f172a');
  grad.addColorStop(1, '#020617');
  ctx.fillStyle = grad;
  ctx.fillRect(-r, -r, r * 2, r * 2);

  // Methane Cirrus Cloud Streaks
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  for (let i = 0; i < 4; i++) {
    const ux = Math.sin(rotY * 1.5 + i) * r * 0.6;
    const uy = (-0.4 + i * 0.28) * r;
    ctx.beginPath();
    ctx.ellipse(ux, uy, r * 0.3, 3, 0.1, 0, Math.PI * 2);
    ctx.fill();
  }

  // Terminator
  const shadow = ctx.createRadialGradient(lx * r * 0.4, ly * r * 0.4, r * 0.25, 0, 0, r * 1.05);
  shadow.addColorStop(0, 'transparent');
  shadow.addColorStop(0.65, 'rgba(0, 0, 0, 0.35)');
  shadow.addColorStop(1, 'rgba(0, 0, 0, 0.98)');
  ctx.fillStyle = shadow;
  ctx.fillRect(-r, -r, r * 2, r * 2);

  ctx.restore();
}

/**
 * 9. PHOTOREALISTIC BLACK HOLE (GARGANTUA)
 * Dual-sided relativistic Doppler-boosted accretion disk + gravitational lensing photon ring.
 */
function renderPhotorealisticBlackHole(
  ctx: CanvasRenderingContext2D,
  r: number,
  t: number
) {
  ctx.save();

  // 1. Relativistic Accretion Disk Back
  const diskR = r * 2.8;
  const diskGrad = ctx.createRadialGradient(0, 0, r * 1.1, 0, 0, diskR);
  diskGrad.addColorStop(0, '#ffffff');
  diskGrad.addColorStop(0.2, '#fef08a');
  diskGrad.addColorStop(0.5, '#f97316');
  diskGrad.addColorStop(0.8, '#dc2626');
  diskGrad.addColorStop(1, 'transparent');

  ctx.fillStyle = diskGrad;
  ctx.beginPath();
  ctx.ellipse(0, 0, diskR, diskR * 0.28, t * 0.1, 0, Math.PI * 2);
  ctx.fill();

  // 2. Gravitational Lensing Halo (Top/Bottom Einstein Ring)
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.7)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, r * 1.25, 0, Math.PI * 2);
  ctx.stroke();

  // 3. Absolute Pure Black Event Horizon
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();

  // 4. Photon Sphere Rim Glint
  ctx.strokeStyle = '#00f3ff';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#00f3ff';
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

/**
 * 10. GENERIC PLANET SHADER
 */
function renderGenericPhotorealisticPlanet(
  ctx: CanvasRenderingContext2D,
  r: number,
  rotX: number,
  rotY: number,
  lx: number,
  ly: number,
  lz: number,
  body: CelestialBodyData,
  hasAtmosphere: boolean
) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();

  const baseGrad = ctx.createRadialGradient(-r * 0.3, -r * 0.3, 0, 0, 0, r);
  baseGrad.addColorStop(0, body.color);
  baseGrad.addColorStop(0.6, `${body.color}88`);
  baseGrad.addColorStop(1, '#020617');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(-r, -r, r * 2, r * 2);

  // Surface texture noise
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  for (let i = 0; i < 6; i++) {
    const px = Math.sin(rotY + i) * r * 0.7;
    const py = Math.cos(i * 1.8) * r * 0.5;
    ctx.beginPath();
    ctx.arc(px, py, r * 0.25, 0, Math.PI * 2);
    ctx.fill();
  }

  // Terminator
  const shadow = ctx.createRadialGradient(lx * r * 0.4, ly * r * 0.4, r * 0.25, 0, 0, r * 1.05);
  shadow.addColorStop(0, 'transparent');
  shadow.addColorStop(0.65, 'rgba(0, 0, 0, 0.4)');
  shadow.addColorStop(1, 'rgba(0, 0, 0, 0.98)');
  ctx.fillStyle = shadow;
  ctx.fillRect(-r, -r, r * 2, r * 2);

  ctx.restore();
}

/**
 * 11. HOLOGRAPHIC CYBER WIREFRAME SPHERE
 */
function renderHologramSphere(
  ctx: CanvasRenderingContext2D,
  r: number,
  rotX: number,
  rotY: number,
  neonColor: string
) {
  ctx.save();
  ctx.strokeStyle = '#00f3ff';
  ctx.lineWidth = 1.2;
  ctx.shadowColor = '#00f3ff';
  ctx.shadowBlur = 12;

  // Outer Sphere Rim
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();

  // Longitude Lines
  const numLong = 10;
  for (let i = 0; i < numLong; i++) {
    const angle = rotY + (i * Math.PI) / numLong;
    ctx.beginPath();
    ctx.ellipse(0, 0, Math.abs(Math.sin(angle)) * r, r, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Latitude Lines
  const numLat = 8;
  for (let i = 1; i < numLat; i++) {
    const latY = ((i / numLat) * 2 - 1) * r * 0.85;
    const latRadius = Math.sqrt(Math.max(0, r * r - latY * latY));
    ctx.beginPath();
    ctx.ellipse(0, latY, latRadius, latRadius * 0.35, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * 12. CYBER TARGETING HUD RETICLE OVERLAY
 */
function renderCyberTargetingHUD(
  ctx: CanvasRenderingContext2D,
  r: number,
  body: CelestialBodyData,
  isPlaying: boolean
) {
  ctx.save();
  ctx.strokeStyle = isPlaying ? '#fbbf24' : '#00f3ff';
  ctx.lineWidth = 1.5;
  ctx.fillStyle = isPlaying ? '#fbbf24' : '#00f3ff';

  const reticleR = r * 1.35;
  const cornerLen = 24;

  // 4 Targeting Corners [ + ]
  [
    [-reticleR, -reticleR, 1, 1],
    [reticleR, -reticleR, -1, 1],
    [-reticleR, reticleR, 1, -1],
    [reticleR, reticleR, -1, -1],
  ].forEach(([x, y, dx, dy]) => {
    ctx.beginPath();
    ctx.moveTo(x, y + dy * cornerLen);
    ctx.lineTo(x, y);
    ctx.lineTo(x + dx * cornerLen, y);
    ctx.stroke();
  });

  // Crosshair center pip
  ctx.beginPath();
  ctx.arc(0, 0, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
