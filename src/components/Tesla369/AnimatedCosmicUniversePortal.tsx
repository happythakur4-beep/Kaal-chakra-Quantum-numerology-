import React, { useEffect, useRef, useState } from 'react';
import { CelestialBodyData, ThemeMode } from '../../types';
import { CELESTIAL_BODIES_DATA, TESLA_VORTEX_NODES } from '../../data/teslaPortalData';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { drawHighFidelityPlanet } from '../../utils/highQualityPlanetRenderer';
import {
  calculateBirthPlanetaryPositions,
  NatalEphemerisData,
} from '../../utils/planetaryEphemeris';
import { BirthPlanetaryEphemerisModal } from './BirthPlanetaryEphemerisModal';
import {
  Orbit,
  Zap,
  Volume2,
  VolumeX,
  FastForward,
  Play,
  Pause,
  Compass,
  Sparkles,
  Calendar,
  Clock,
  Eye,
  CheckCircle2,
  RefreshCw,
  Sun,
  Moon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AnimatedCosmicUniversePortalProps {
  theme: ThemeMode;
  onEnterBlackHoleWarp?: () => void;
}

export const AnimatedCosmicUniversePortal: React.FC<AnimatedCosmicUniversePortalProps> = ({
  theme,
  onEnterBlackHoleWarp,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Focus & Navigation Target
  const [currentTargetId, setCurrentTargetId] = useState<string>('sun');
  const [hoveredBody, setHoveredBody] = useState<CelestialBodyData | null>(null);
  const [selectedBody, setSelectedBody] = useState<CelestialBodyData>(
    CELESTIAL_BODIES_DATA.find((b) => b.id === 'sun') || CELESTIAL_BODIES_DATA[0]
  );
  const [isTraveling, setIsTraveling] = useState<boolean>(false);
  const [travelProgress, setTravelProgress] = useState<number>(0);
  const [travelFrom, setTravelFrom] = useState<string>('cosmos');
  const [travelTo, setTravelTo] = useState<string>('Sun');

  // Animation & Perspective Controls
  const [isPlayingOrbits, setIsPlayingOrbits] = useState<boolean>(true);
  const [orbitSpeed, setOrbitSpeed] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [showVortexGrid, setShowVortexGrid] = useState<boolean>(true);
  const [activeInfoDepth, setActiveInfoDepth] = useState<number>(1); // 1: Overview, 2: Tesla Physics, 3: Vedic Graha, 4: 369 Singularity

  // Birth Ephemeris State
  const [isEphemerisModalOpen, setIsEphemerisModalOpen] = useState<boolean>(false);
  const [isBirthLockedMode, setIsBirthLockedMode] = useState<boolean>(false);
  const [birthEphemeris, setBirthEphemeris] = useState<NatalEphemerisData | null>(null);

  // Smooth camera state
  const cameraRef = useRef<{
    x: number;
    y: number;
    zoom: number;
    targetX: number;
    targetY: number;
    targetZoom: number;
  }>({
    x: 0,
    y: 0,
    zoom: 1,
    targetX: 0,
    targetY: 0,
    targetZoom: 1,
  });

  // Orbital angles dictionary & target birth angles
  const orbitalAnglesRef = useRef<{ [id: string]: number }>({});
  const targetAnglesRef = useRef<{ [id: string]: number }>({});

  useEffect(() => {
    CELESTIAL_BODIES_DATA.forEach((b) => {
      if (orbitalAnglesRef.current[b.id] === undefined) {
        orbitalAnglesRef.current[b.id] = Math.random() * Math.PI * 2;
      }
    });
  }, []);

  const handleApplyBirthPositions = (ephemeris: NatalEphemerisData) => {
    setBirthEphemeris(ephemeris);
    setIsBirthLockedMode(true);
    setIsPlayingOrbits(false);

    // Populate target angles
    ephemeris.planets.forEach((p) => {
      targetAnglesRef.current[p.id] = p.orbitalAngleRad;
    });
  };

  // Fly camera to a specific celestial body
  const navigateToBody = (body: CelestialBodyData) => {
    const fromName = selectedBody ? selectedBody.name : 'Cosmos';
    setTravelFrom(fromName);
    setTravelTo(body.name);
    setIsTraveling(true);
    setTravelProgress(0);
    setSelectedBody(body);
    setCurrentTargetId(body.id);
    setActiveInfoDepth(1);

    // Audio cue
    if (!isAudioMuted) {
      cosmicAudio.playPlanetTone(body.vibrationalFrequencyHz);
    }

    // Set camera target zoom
    cameraRef.current.targetZoom = body.id === 'sun' ? 1.15 : body.type === 'black-hole' ? 1.6 : 1.38;
  };

  // Main Canvas Universe Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Deep 3D Starfield Array
    const stars: {
      x: number;
      y: number;
      z: number;
      size: number;
      alpha: number;
      color: string;
      speed: number;
    }[] = [];
    const starColors = ['#ffd700', '#ffffff', '#a855f7', '#38bdf8', '#fbbf24', '#f43f5e', '#67e8f9'];
    for (let i = 0; i < 500; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 4000,
        y: (Math.random() - 0.5) * 4000,
        z: Math.random() * 2500 + 100,
        size: Math.random() * 2.4 + 0.6,
        alpha: Math.random() * 0.85 + 0.15,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        speed: Math.random() * 0.03 + 0.01,
      });
    }

    // Volumetric Stylized Nebulae Clouds
    const nebulae = [
      { x: -450, y: -280, r: 550, colorA: 'rgba(147, 51, 234, 0.18)', colorB: 'rgba(236, 72, 153, 0.08)' },
      { x: 420, y: 320, r: 600, colorA: 'rgba(234, 179, 8, 0.15)', colorB: 'rgba(249, 115, 22, 0.06)' },
      { x: -180, y: 450, r: 500, colorA: 'rgba(6, 182, 212, 0.16)', colorB: 'rgba(59, 130, 246, 0.08)' },
      { x: 350, y: -380, r: 480, colorA: 'rgba(168, 85, 247, 0.14)', colorB: 'rgba(217, 70, 239, 0.05)' },
    ];

    let frame = 0;

    const render = () => {
      frame++;
      // Deep Black Universe Space
      ctx.fillStyle = '#010104';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // 1. UPDATE ORBITAL ANGLES (Smooth interpolation if birth locked, continuous motion if playing)
      CELESTIAL_BODIES_DATA.forEach((b) => {
        if (isBirthLockedMode && targetAnglesRef.current[b.id] !== undefined) {
          const target = targetAnglesRef.current[b.id];
          const curr = orbitalAnglesRef.current[b.id] || 0;
          let diff = target - curr;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          orbitalAnglesRef.current[b.id] = curr + diff * 0.06;
        } else if (isPlayingOrbits && b.speed > 0) {
          orbitalAnglesRef.current[b.id] =
            (orbitalAnglesRef.current[b.id] || 0) + b.speed * 0.0035 * orbitSpeed;
        }
      });

      // 2. SMOOTH CAMERA TRACKING & TARGETING
      const targetBody = CELESTIAL_BODIES_DATA.find((b) => b.id === currentTargetId);
      const orbitScale = Math.min(width, height) / 980;

      if (targetBody) {
        if (targetBody.orbitDistance === 0) {
          cameraRef.current.targetX = 0;
          cameraRef.current.targetY = 0;
        } else {
          const angle = orbitalAnglesRef.current[targetBody.id] || 0;
          cameraRef.current.targetX = Math.cos(angle) * (targetBody.orbitDistance * orbitScale);
          cameraRef.current.targetY = Math.sin(angle) * (targetBody.orbitDistance * orbitScale) * 0.45;
        }
      }

      // Smooth camera interpolation
      cameraRef.current.x += (cameraRef.current.targetX - cameraRef.current.x) * 0.055;
      cameraRef.current.y += (cameraRef.current.targetY - cameraRef.current.y) * 0.055;
      cameraRef.current.zoom += (cameraRef.current.targetZoom - cameraRef.current.zoom) * 0.045;

      // Handle Hyperspace Travel progress
      if (isTraveling) {
        const dist = Math.hypot(
          cameraRef.current.targetX - cameraRef.current.x,
          cameraRef.current.targetY - cameraRef.current.y
        );
        const p = Math.max(0, Math.min(1, 1 - dist / 500));
        setTravelProgress(p);
        if (dist < 12) {
          setIsTraveling(false);
          setTravelProgress(1);
        }
      }

      // 3. RENDER BACKGROUND NEBULAE & DEEP COSMIC PARTICLES
      ctx.save();
      const safeZoom = Math.max(0.1, cameraRef.current.zoom || 1);
      const safeCamX = Number.isFinite(cameraRef.current.x) ? cameraRef.current.x : 0;
      const safeCamY = Number.isFinite(cameraRef.current.y) ? cameraRef.current.y : 0;

      nebulae.forEach((neb) => {
        const nx = cx + (neb.x - safeCamX * 0.1) * safeZoom;
        const ny = cy + (neb.y - safeCamY * 0.1) * safeZoom;
        const nebR = Math.max(20, neb.r * safeZoom);
        try {
          const grad = ctx.createRadialGradient(nx, ny, Math.max(0.1, nebR * 0.05), nx, ny, nebR);
          grad.addColorStop(0, neb.colorA);
          grad.addColorStop(0.6, neb.colorB);
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(nx, ny, nebR, 0, Math.PI * 2);
          ctx.fill();
        } catch (e) {
          // ignore gradient fallback
        }
      });

      // 3D Parallax Stars with Hyperspace Streaks during travel
      stars.forEach((st) => {
        const px = cx + (st.x - cameraRef.current.x) * cameraRef.current.zoom;
        const py = cy + (st.y - cameraRef.current.y) * cameraRef.current.zoom;

        if (px >= -50 && px <= width + 50 && py >= -50 && py <= height + 50) {
          ctx.fillStyle = st.color;
          ctx.globalAlpha = st.alpha * (0.4 + 0.6 * Math.sin(frame * st.speed + st.x));
          ctx.beginPath();
          if (isTraveling) {
            // Warp streak
            ctx.ellipse(px, py, st.size * 5 * (1 - travelProgress * 0.5), st.size, 0, 0, Math.PI * 2);
          } else {
            ctx.arc(px, py, st.size, 0, Math.PI * 2);
          }
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
      ctx.restore();

      // 4. APPLY WORLD MATRIX (Camera Pan + Zoom)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(cameraRef.current.zoom, cameraRef.current.zoom);
      ctx.translate(-cameraRef.current.x, -cameraRef.current.y);

      // Tesla 3-6-9 Sacred Matrix Grid in Background
      if (showVortexGrid) {
        ctx.save();
        ctx.scale(1, 0.45);
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.12)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([6, 6]);

        const rOuter = 580 * orbitScale;
        for (let t = 0; t < 3; t++) {
          const rOffset = (t * Math.PI * 2) / 3 + frame * 0.0012;
          ctx.beginPath();
          for (let p = 0; p < 3; p++) {
            const angle = rOffset + (p * Math.PI * 2) / 3;
            const x = Math.cos(angle) * rOuter;
            const y = Math.sin(angle) * rOuter;
            if (p === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        }

        // Concentric Harmonic Resonator Rings (3-6-9)
        [0.33, 0.66, 1.0].forEach((ringFrac, idx) => {
          ctx.beginPath();
          ctx.arc(0, 0, rOuter * ringFrac, 0, Math.PI * 2);
          ctx.strokeStyle =
            idx === 2 ? 'rgba(251, 191, 36, 0.28)' : 'rgba(56, 189, 248, 0.16)';
          ctx.stroke();
        });

        ctx.setLineDash([]);
        ctx.restore();
      }

      // 5. DRAW ORBIT ELLIPSES
      CELESTIAL_BODIES_DATA.forEach((body) => {
        if (body.orbitDistance === 0) return;
        const oR = body.orbitDistance * orbitScale;

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(0, 0, oR, oR * 0.45, 0, 0, Math.PI * 2);
        ctx.strokeStyle =
          selectedBody?.id === body.id
            ? 'rgba(255, 215, 0, 0.85)'
            : hoveredBody?.id === body.id
            ? 'rgba(56, 189, 248, 0.75)'
            : 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = selectedBody?.id === body.id ? 2.2 : 1;
        if (body.type === 'black-hole') {
          ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
          ctx.setLineDash([8, 4]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      });

      // 6. RENDER HIGH-QUALITY STYLIZED CELESTIAL BODIES
      const screenTargets: {
        body: CelestialBodyData;
        screenX: number;
        screenY: number;
        screenR: number;
      }[] = [];

      CELESTIAL_BODIES_DATA.forEach((body) => {
        let worldX = 0;
        let worldY = 0;

        if (body.orbitDistance > 0) {
          const angle = orbitalAnglesRef.current[body.id] || 0;
          worldX = Math.cos(angle) * (body.orbitDistance * orbitScale);
          worldY = Math.sin(angle) * (body.orbitDistance * orbitScale) * 0.45;
        }

        const isSelected = selectedBody?.id === body.id;
        const isHovered = hoveredBody?.id === body.id;
        const bodyRadius = Math.max(9, body.radius * 0.75);

        // Convert to Screen Coordinate for mouse interaction
        const sX = cx + (worldX - cameraRef.current.x) * cameraRef.current.zoom;
        const sY = cy + (worldY - cameraRef.current.y) * cameraRef.current.zoom;
        screenTargets.push({
          body,
          screenX: sX,
          screenY: sY,
          screenR: bodyRadius * cameraRef.current.zoom + 14,
        });

        // Use High-Fidelity Planet Canvas Shader
        drawHighFidelityPlanet({
          ctx,
          body,
          screenX: worldX,
          screenY: worldY,
          bodyRadius,
          frame,
          isSelected,
          isHovered,
        });

        // High-Definition Typography Label with Sanskrit & Natal Degree
        if (isHovered || isSelected || body.id === 'sun' || isBirthLockedMode) {
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 12px Cinzel, serif';
          ctx.textAlign = 'center';
          ctx.shadowColor = '#000000';
          ctx.shadowBlur = 6;
          ctx.fillText(body.name, worldX, worldY + bodyRadius + 18);

          if (isBirthLockedMode && birthEphemeris) {
            const natalP = birthEphemeris.planets.find((p) => p.id === body.id);
            if (natalP) {
              ctx.fillStyle = '#ffd700';
              ctx.font = 'bold 10px monospace';
              ctx.fillText(`${natalP.sign} ${natalP.formattedDegree}`, worldX, worldY + bodyRadius + 30);
            }
          }
          ctx.shadowBlur = 0;
        }
      });

      ctx.restore();

      // Store screen targets for mouse interaction
      (canvas as any)._screenTargets = screenTargets;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [
    currentTargetId,
    isPlayingOrbits,
    orbitSpeed,
    zoomLevel,
    showVortexGrid,
    isTraveling,
    selectedBody,
    hoveredBody,
    isBirthLockedMode,
    birthEphemeris,
  ]);

  // Mouse picking on canvas to trigger seamless flight
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const targets = (canvas as any)._screenTargets as {
      body: CelestialBodyData;
      screenX: number;
      screenY: number;
      screenR: number;
    }[];

    if (!targets) return;

    const hit = targets.find((t) => {
      const dist = Math.hypot(t.screenX - mx, t.screenY - my);
      return dist <= t.screenR;
    });

    if (hit) {
      navigateToBody(hit.body);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const targets = (canvas as any)._screenTargets as {
      body: CelestialBodyData;
      screenX: number;
      screenY: number;
      screenR: number;
    }[];

    if (!targets) return;

    const hit = targets.find((t) => {
      const dist = Math.hypot(t.screenX - mx, t.screenY - my);
      return dist <= t.screenR;
    });

    setHoveredBody(hit ? hit.body : null);
  };

  return (
    <div className="relative w-full h-[88vh] min-h-[640px] rounded-3xl overflow-hidden border border-amber-500/40 bg-black shadow-[0_0_90px_rgba(0,0,0,0.95)] select-none font-sans flex flex-col justify-between">
      {/* Birth Ephemeris Modal */}
      <BirthPlanetaryEphemerisModal
        isOpen={isEphemerisModalOpen}
        onClose={() => setIsEphemerisModalOpen(false)}
        onApplyBirthPositions={handleApplyBirthPositions}
        onFocusPlanet={(pid) => {
          const b = CELESTIAL_BODIES_DATA.find((item) => item.id === pid);
          if (b) navigateToBody(b);
        }}
        theme={theme}
      />

      {/* 1. Continuous Living 3D Animated Canvas (Never Leaves Screen) */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        className="absolute inset-0 w-full h-full cursor-crosshair z-0"
      />

      {/* 2. Hyperspace Travel Overlay HUD (When traveling between stars) */}
      <AnimatePresence>
        {isTraveling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 bg-black/35 backdrop-blur-[2px]"
          >
            {/* Top Warp Heading */}
            <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
              <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-black/85 border border-amber-400/80 shadow-2xl">
                <FastForward className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <div className="text-xs font-mono">
                  <span className="text-gray-400 text-[10px] block">HYPERSPACE WARP VECTOR</span>
                  <span className="text-amber-200 font-bold">
                    {travelFrom} ➔ {travelTo}
                  </span>
                </div>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-black/85 border border-cyan-400/80 text-xs font-mono text-cyan-300 font-bold">
                WARP FACTOR 3.69
              </div>
            </div>

            {/* Center Dynamic Scanning Ring */}
            <div className="text-center space-y-2 max-w-md mx-auto">
              <div className="w-20 h-20 rounded-full border-4 border-amber-400/80 mx-auto animate-ping opacity-75" />
              <h3 className="text-2xl font-cinzel font-bold text-amber-200 tracking-widest drop-shadow-md">
                Approaching {travelTo}...
              </h3>
              <p className="text-xs font-mono text-cyan-300">
                Cousto Harmonic Tone: {selectedBody.vibrationalFrequencyHz} Hz
              </p>
            </div>

            {/* Bottom Progress Bar */}
            <div className="max-w-2xl mx-auto w-full space-y-1 bg-black/85 p-3 rounded-2xl border border-amber-500/40">
              <div className="flex justify-between text-[11px] font-mono text-amber-300">
                <span>Spacetime Warp Infall</span>
                <span>{Math.round(travelProgress * 100)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-950 overflow-hidden border border-white/20">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-purple-400 to-cyan-400"
                  style={{ width: `${travelProgress * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Top Master Navigation & Planetary Highway HUD */}
      <div className="relative z-20 p-3 sm:p-5 flex flex-wrap items-center justify-between gap-3 w-full bg-gradient-to-b from-black/85 via-black/45 to-transparent pointer-events-auto">
        {/* Left: 369 Logo & Grand Portal Indicator */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => {
              const bh = CELESTIAL_BODIES_DATA.find((b) => b.id === 'black-hole-sagittarius');
              if (bh) navigateToBody(bh);
            }}
            className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 via-purple-600 to-cyan-600 p-0.5 cursor-pointer hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,215,0,0.6)]"
          >
            <div className="w-full h-full bg-black/90 rounded-[14px] flex items-center justify-center font-cinzel font-black text-amber-300 text-base">
              369
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-cinzel font-bold text-[#fdf2d1] tracking-wider drop-shadow-md">
                369 TESLA COSMIC UNIVERSE
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40">
                High-Resolution Ephemeris Engine
              </span>
            </div>
            <p className="text-xs text-gray-300 font-mono">
              High-fidelity volumetric celestial shaders with birth date & time planetary positioning
            </p>
          </div>
        </div>

        {/* Right: Quick Controls Bar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Birth Ephemeris Modal Trigger */}
          <button
            onClick={() => setIsEphemerisModalOpen(true)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-cinzel font-bold tracking-wider transition-all shadow-lg cursor-pointer ${
              isBirthLockedMode
                ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-400 text-black border border-amber-300 shadow-[0_0_20px_rgba(255,215,0,0.6)]'
                : 'bg-black/80 hover:bg-amber-500/20 border border-amber-500/50 text-[#ffd700]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{isBirthLockedMode ? '🎂 Birth Natal Chart Locked' : '🎂 Input Date & Time of Birth'}</span>
          </button>

          {/* Pause / Resume Orbits */}
          <button
            onClick={() => {
              setIsBirthLockedMode(false);
              setIsPlayingOrbits(!isPlayingOrbits);
            }}
            className="p-2 rounded-xl bg-black/70 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 transition-all cursor-pointer"
            title={isPlayingOrbits ? 'Pause Orbital Motion' : 'Resume Orbital Motion'}
          >
            {isPlayingOrbits ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Speed Multiplier */}
          <div className="flex items-center bg-black/70 rounded-xl border border-amber-500/40 p-0.5">
            {[1, 3, 6, 9].map((spd) => (
              <button
                key={spd}
                onClick={() => {
                  setIsBirthLockedMode(false);
                  setOrbitSpeed(spd);
                  setIsPlayingOrbits(true);
                }}
                className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  orbitSpeed === spd && !isBirthLockedMode
                    ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(255,215,0,0.8)]'
                    : 'text-amber-200/70 hover:text-amber-200'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Toggle 3-6-9 Vortex Geometry Grid */}
          <button
            onClick={() => setShowVortexGrid(!showVortexGrid)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              showVortexGrid
                ? 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(255,215,0,0.4)]'
                : 'bg-black/70 border-white/20 text-gray-400'
            }`}
            title="Toggle 3-6-9 Vortex Sacred Geometry"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Toggle Sound */}
          <button
            onClick={() => {
              if (!isAudioMuted) {
                cosmicAudio.stopFrequencyTone();
                setIsAudioMuted(true);
              } else {
                setIsAudioMuted(false);
                cosmicAudio.playPlanetTone(selectedBody.vibrationalFrequencyHz);
              }
            }}
            className="p-2 rounded-xl bg-black/70 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 transition-all cursor-pointer"
            title={isAudioMuted ? 'Unmute Acoustic Tones' : 'Mute Acoustic Tones'}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Quick Black Hole Warp Button */}
          <button
            onClick={() => {
              const bh = CELESTIAL_BODIES_DATA.find((b) => b.id === 'black-hole-sagittarius');
              if (bh) navigateToBody(bh);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-900/90 via-black to-amber-950/90 border border-purple-400/80 text-amber-200 text-xs font-cinzel font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(168,85,247,0.5)] cursor-pointer flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Black Hole Singularity</span>
          </button>
        </div>
      </div>

      {/* Birth Position Notification Banner */}
      {isBirthLockedMode && birthEphemeris && (
        <div className="relative z-20 mx-4 sm:mx-6 p-2.5 px-4 rounded-2xl bg-black/90 border border-amber-400/60 backdrop-blur-md text-xs text-amber-200 flex flex-wrap items-center justify-between gap-2 shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-white">Natal Planetary Alignment:</span> {birthEphemeris.birthDate} at {birthEphemeris.birthTime} ({birthEphemeris.city})
              <div className="text-[11px] text-cyan-300">
                Ascendant: <strong className="text-amber-300">{birthEphemeris.ascendant.sign} {birthEphemeris.ascendant.formattedDegree}</strong> • Surya in {birthEphemeris.sunSign} • Chandra in {birthEphemeris.moonSign} • {birthEphemeris.nakshatra}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setIsBirthLockedMode(false);
              setIsPlayingOrbits(true);
            }}
            className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white cursor-pointer"
          >
            Resume Live Orbits
          </button>
        </div>
      )}

      {/* 4. Left/Center: Embedded Dynamic Holographic Information Pod */}
      <div className="relative z-20 p-3 sm:p-6 max-w-xl pointer-events-none mt-auto">
        <motion.div
          key={selectedBody.id}
          initial={{ opacity: 0, x: -30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="pointer-events-auto p-4 sm:p-5 rounded-3xl bg-black/85 border border-amber-400/60 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.9)] space-y-3"
        >
          {/* Header with Color Orb & Harmonic Pill */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center font-cinzel font-black text-black text-xs shadow-lg"
                style={{ backgroundColor: selectedBody.color }}
              >
                {selectedBody.teslaHarmonicNumber}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-cinzel font-bold text-[#fdf2d1] tracking-wide">
                  {selectedBody.name}
                </h3>
                {selectedBody.sanskritName && (
                  <span className="text-xs font-serif text-amber-300/90 block">
                    {selectedBody.sanskritName} • {selectedBody.type.toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right font-mono">
              <span className="text-[10px] text-gray-400 block uppercase">COUSTO OCTAVE</span>
              <span className="text-xs font-bold text-amber-300">
                {selectedBody.vibrationalFrequencyHz} Hz
              </span>
            </div>
          </div>

          {/* Depth Tabs within the Hologram */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-[11px] font-mono">
            {[
              { depth: 1, label: '1. Cosmic Physics' },
              { depth: 2, label: '2. Tesla Ether' },
              { depth: 3, label: '3. Vedic Graha' },
              { depth: 4, label: '4. 369 Singularity' },
            ].map((d) => (
              <button
                key={d.depth}
                onClick={() => setActiveInfoDepth(d.depth)}
                className={`flex-1 py-1 px-1.5 rounded-lg text-center transition-all cursor-pointer truncate ${
                  activeInfoDepth === d.depth
                    ? 'bg-amber-500 text-black font-bold shadow'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Depth 1: Overview & Physical Facts */}
          {activeInfoDepth === 1 && (
            <div className="space-y-2 text-xs">
              <p className="text-gray-200 leading-relaxed font-sans line-clamp-3">
                {selectedBody.description}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                {selectedBody.keyFacts.map((fact, i) => (
                  <div key={i} className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-center">
                    <span className="text-[9px] text-gray-400 block uppercase">{fact.label}</span>
                    <span className="text-xs font-bold text-amber-200 font-cinzel">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Depth 2: Tesla Radiant Ether & Toroidal Magnetosphere */}
          {activeInfoDepth === 2 && (
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-400/40">
                <span className="text-[10px] font-mono text-cyan-300 block uppercase font-bold">
                  Nikola Tesla Etheric Transmission:
                </span>
                <p className="text-xs text-cyan-100 italic mt-0.5 leading-relaxed font-serif">
                  "{selectedBody.teslaInsight}"
                </p>
              </div>
              <div className="flex justify-between text-gray-300 text-[11px] font-mono">
                <span>Chakra Channel: <strong className="text-amber-300">{selectedBody.chakraResonance}</strong></span>
                <span>Solfeggio: <strong className="text-pink-300">{selectedBody.solfeggioKey}</strong></span>
              </div>
            </div>
          )}

          {/* Depth 3: Vedic Sacred Graha Temple */}
          {activeInfoDepth === 3 && (
            <div className="space-y-2 text-xs font-serif">
              <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-400/40">
                <span className="text-[10px] font-mono text-amber-300 block uppercase font-bold">
                  वैदिक ज्योतिषीय चेतना (Jyotish Lore):
                </span>
                <p className="text-xs text-amber-100 leading-relaxed mt-0.5">
                  {selectedBody.vedicCosmology}
                </p>
              </div>
              <span className="text-[11px] font-mono text-gray-300 block">
                Graha Lordship: <strong className="text-amber-200">{selectedBody.vedicGraha}</strong>
              </span>
            </div>
          )}

          {/* Depth 4: 3-6-9 Vortex Singularity Key */}
          {activeInfoDepth === 4 && (
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-400/40">
                <span className="text-[10px] font-mono text-purple-300 block uppercase font-bold">
                  Akashic 3-6-9 Manifestation Code:
                </span>
                <p className="text-xs text-purple-100 italic leading-relaxed mt-0.5 font-serif">
                  "{selectedBody.quantumAffirmation}"
                </p>
              </div>
              <span className="text-[11px] font-mono text-amber-300 block font-bold">
                Digital Root Harmonic #{selectedBody.teslaHarmonicNumber} aligned with Solfeggio {selectedBody.vibrationalFrequencyHz} Hz.
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* 5. Bottom Planetary Waypoint Highway Ribbon */}
      <div className="relative z-20 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent w-full pointer-events-auto">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-[10px] font-mono text-amber-400 uppercase font-bold pl-2 shrink-0 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Fly To:</span>
          </span>

          {CELESTIAL_BODIES_DATA.map((b) => (
            <button
              key={b.id}
              onClick={() => navigateToBody(b)}
              className={`px-3 py-1.5 rounded-xl text-xs font-cinzel font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                selectedBody.id === b.id
                  ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(255,215,0,0.9)] scale-105 font-bold'
                  : 'bg-black/70 hover:bg-white/15 text-gray-300 border border-white/10 hover:border-amber-400/50'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: b.color }}
              />
              <span>{b.name}</span>
              <span className="text-[10px] font-mono opacity-80">#{b.teslaHarmonicNumber}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
