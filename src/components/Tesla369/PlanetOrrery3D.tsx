import React, { useEffect, useRef, useState } from 'react';
import { CelestialBodyData, ThemeMode } from '../../types';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { drawHighFidelityPlanet } from '../../utils/highQualityPlanetRenderer';
import {
  calculateBirthPlanetaryPositions,
  NatalEphemerisData,
} from '../../utils/planetaryEphemeris';
import { BirthPlanetaryEphemerisModal } from './BirthPlanetaryEphemerisModal';
import {
  Play,
  Pause,
  RotateCw,
  Compass,
  Zap,
  Volume2,
  VolumeX,
  Layers,
  Sparkles,
  Search,
  Eye,
  Calendar,
  Clock,
  Orbit,
  CheckCircle2,
} from 'lucide-react';

interface PlanetOrrery3DProps {
  celestialBodies: CelestialBodyData[];
  onSelectBody: (body: CelestialBodyData) => void;
  selectedBody: CelestialBodyData | null;
  onEnterBlackHolePortal: () => void;
  theme?: ThemeMode;
}

export const PlanetOrrery3D: React.FC<PlanetOrrery3DProps> = ({
  celestialBodies,
  onSelectBody,
  selectedBody,
  onEnterBlackHolePortal,
  theme = 'dark',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [viewAngle, setViewAngle] = useState<'3d' | 'top' | 'isometric'>('3d');
  const [hoveredBody, setHoveredBody] = useState<CelestialBodyData | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [showOrbitTracks, setShowOrbitTracks] = useState(true);
  const [showVortexGeometry, setShowVortexGeometry] = useState(true);

  // Birth Ephemeris state
  const [isEphemerisModalOpen, setIsEphemerisModalOpen] = useState(false);
  const [isBirthLockedMode, setIsBirthLockedMode] = useState(false);
  const [birthEphemeris, setBirthEphemeris] = useState<NatalEphemerisData | null>(null);

  // Keep track of current angles for all bodies
  const anglesRef = useRef<{ [id: string]: number }>({});
  const targetAnglesRef = useRef<{ [id: string]: number }>({});

  useEffect(() => {
    celestialBodies.forEach((body) => {
      if (anglesRef.current[body.id] === undefined) {
        anglesRef.current[body.id] = Math.random() * Math.PI * 2;
      }
    });
  }, [celestialBodies]);

  const handleApplyBirthPositions = (ephemeris: NatalEphemerisData) => {
    setBirthEphemeris(ephemeris);
    setIsBirthLockedMode(true);
    setIsPlaying(false);

    // Set target angles for each planet from the astronomical ephemeris
    ephemeris.planets.forEach((p) => {
      targetAnglesRef.current[p.id] = p.orbitalAngleRad;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = canvas.parentElement?.clientHeight || 650;
    };
    window.addEventListener('resize', handleResize);

    // Stars background
    const bgStars: { x: number; y: number; s: number; a: number; speed: number }[] = [];
    for (let i = 0; i < 220; i++) {
      bgStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        s: Math.random() * 2.0 + 0.4,
        a: Math.random() * 0.85 + 0.15,
        speed: Math.random() * 0.02 + 0.005,
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Dark Cosmic Void Background
      const bgGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(width, height) * 0.7);
      bgGrad.addColorStop(0, '#0c071e');
      bgGrad.addColorStop(0.5, '#06030e');
      bgGrad.addColorStop(1, '#020106');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Twinkling stars
      bgStars.forEach((star) => {
        star.a = 0.3 + 0.7 * Math.abs(Math.sin(frame * star.speed + star.x));
        ctx.fillStyle = `rgba(255, 255, 255, ${star.a})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.s, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3D Perspective deformation factor for orbits
      const ySquash = viewAngle === 'top' ? 1 : viewAngle === '3d' ? 0.48 : 0.65;
      const tiltAngle = viewAngle === '3d' ? -0.15 : 0;

      // Draw Tesla 3-6-9 Cosmic Vortex Matrix Grid
      if (showVortexGeometry) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(tiltAngle);
        ctx.scale(1, ySquash);

        // Golden Trinity Triangles
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.14)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);

        const vortexRadius = Math.min(width, height) * 0.44;
        for (let i = 0; i < 3; i++) {
          const rot = (i * Math.PI * 2) / 3 + frame * 0.001;
          ctx.beginPath();
          for (let j = 0; j < 3; j++) {
            const angle = rot + (j * Math.PI * 2) / 3;
            const x = Math.cos(angle) * vortexRadius;
            const y = Math.sin(angle) * vortexRadius;
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        }

        // Zodiac Ring Circle & Interconnected Constellation Web
        ctx.beginPath();
        ctx.arc(0, 0, vortexRadius * 0.95, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // 12 Zodiac Constellations on the Outer Ring
        const zodiacSigns = [
          { name: 'Aries', symbol: '♈', angle: 0, planetIds: ['mars'] },
          { name: 'Taurus', symbol: '♉', angle: Math.PI / 6, planetIds: ['venus'] },
          { name: 'Gemini', symbol: '♊', angle: (2 * Math.PI) / 6, planetIds: ['mercury'] },
          { name: 'Cancer', symbol: '♋', angle: (3 * Math.PI) / 6, planetIds: ['moon', 'earth'] },
          { name: 'Leo', symbol: '♌', angle: (4 * Math.PI) / 6, planetIds: ['sun', 'earth'] },
          { name: 'Virgo', symbol: '♍', angle: (5 * Math.PI) / 6, planetIds: ['mercury'] },
          { name: 'Libra', symbol: '♎', angle: Math.PI, planetIds: ['venus'] },
          { name: 'Scorpio', symbol: '♏', angle: (7 * Math.PI) / 6, planetIds: ['mars', 'pluto'] },
          { name: 'Sagittarius', symbol: '♐', angle: (8 * Math.PI) / 6, planetIds: ['jupiter'] },
          { name: 'Capricorn', symbol: '♑', angle: (9 * Math.PI) / 6, planetIds: ['saturn'] },
          { name: 'Aquarius', symbol: '♒', angle: (10 * Math.PI) / 6, planetIds: ['saturn', 'uranus'] },
          { name: 'Pisces', symbol: '♓', angle: (11 * Math.PI) / 6, planetIds: ['jupiter', 'neptune'] },
        ];

        const activePlanetId = (hoveredBody?.id || selectedBody?.id || '').toLowerCase();

        // Draw Interconnected Constellation Lines & Stars
        zodiacSigns.forEach((zod, idx) => {
          const isRuled = zod.planetIds.includes(activePlanetId);
          const zx = Math.cos(zod.angle) * vortexRadius * 0.95;
          const zy = Math.sin(zod.angle) * vortexRadius * 0.95;

          // Connect to next constellation in zodiac wheel
          const nextZod = zodiacSigns[(idx + 1) % zodiacSigns.length];
          const nzx = Math.cos(nextZod.angle) * vortexRadius * 0.95;
          const nzy = Math.sin(nextZod.angle) * vortexRadius * 0.95;

          ctx.beginPath();
          ctx.moveTo(zx, zy);
          ctx.lineTo(nzx, nzy);
          ctx.strokeStyle = isRuled ? 'rgba(251, 191, 36, 0.7)' : 'rgba(56, 189, 248, 0.18)';
          ctx.lineWidth = isRuled ? 1.5 : 0.8;
          ctx.stroke();

          // Star Vertex
          ctx.beginPath();
          ctx.arc(zx, zy, isRuled ? 4 : 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isRuled ? '#fbbf24' : '#e2e8f0';
          ctx.fill();

          // Constellation Glyph
          ctx.save();
          ctx.font = isRuled ? 'bold 13px sans-serif' : '10px sans-serif';
          ctx.fillStyle = isRuled ? '#fbbf24' : 'rgba(148, 163, 184, 0.6)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const labelDist = vortexRadius * 1.05;
          const lx = Math.cos(zod.angle) * labelDist;
          const ly = Math.sin(zod.angle) * labelDist;
          ctx.fillText(zod.symbol, lx, ly);
          ctx.restore();
        });

        ctx.setLineDash([]);
        ctx.restore();
      }

      // Base scaling factor
      const maxOrbit = 520;
      const maxRadius = Math.min(width, height) * 0.44;
      const scale = maxRadius / maxOrbit;

      // Store calculated 2D positions for mouse picking
      const bodyPositions: { body: CelestialBodyData; x: number; y: number; r: number }[] = [];

      // Draw Orbit Tracks
      if (showOrbitTracks) {
        celestialBodies.forEach((body) => {
          if (body.orbitDistance === 0) return;
          const r = body.orbitDistance * scale;

          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(tiltAngle);
          ctx.scale(1, ySquash);

          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.strokeStyle =
            selectedBody?.id === body.id
              ? 'rgba(255, 215, 0, 0.8)'
              : hoveredBody?.id === body.id
              ? 'rgba(56, 189, 248, 0.7)'
              : 'rgba(255, 255, 255, 0.12)';
          ctx.lineWidth = selectedBody?.id === body.id ? 2 : 1;
          if (body.type === 'black-hole') {
            ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
            ctx.setLineDash([6, 3]);
          }
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
        });
      }

      // Update positions and draw celestial bodies (Sun + Revolving Planets + Deep Objects)
      celestialBodies.forEach((body) => {
        if (isBirthLockedMode && targetAnglesRef.current[body.id] !== undefined) {
          // Smoothly interpolate towards target birth angle
          const target = targetAnglesRef.current[body.id];
          const curr = anglesRef.current[body.id] || 0;
          let diff = target - curr;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          anglesRef.current[body.id] = curr + diff * 0.06;
        } else if (isPlaying && body.speed > 0) {
          anglesRef.current[body.id] =
            (anglesRef.current[body.id] || 0) + body.speed * 0.004 * speedMultiplier;
        }

        const angle = anglesRef.current[body.id] || 0;
        const orbitR = body.orbitDistance * scale;

        // Calculate 2D position with perspective
        const rawX = Math.cos(angle) * orbitR;
        const rawY = Math.sin(angle) * orbitR * ySquash;

        // Rotate by tilt angle
        const screenX = cx + (rawX * Math.cos(tiltAngle) - rawY * Math.sin(tiltAngle));
        const screenY = cy + (rawX * Math.sin(tiltAngle) + rawY * Math.cos(tiltAngle));

        const bodyR = Math.max(7, body.radius * 0.7);
        bodyPositions.push({ body, x: screenX, y: screenY, r: bodyR + 10 });

        const isHovered = hoveredBody?.id === body.id;
        const isSelected = selectedBody?.id === body.id;

        // Draw Photorealistic / High-Fidelity Planet Canvas Shader
        drawHighFidelityPlanet({
          ctx,
          body,
          screenX,
          screenY,
          bodyRadius: bodyR,
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
          ctx.shadowBlur = 5;
          ctx.fillText(body.name.split(' ')[0], screenX, screenY + bodyR + 17);

          if (isBirthLockedMode && birthEphemeris) {
            const natalP = birthEphemeris.planets.find((p) => p.id === body.id);
            if (natalP) {
              ctx.fillStyle = '#ffd700';
              ctx.font = 'bold 10px monospace';
              ctx.fillText(`${natalP.sign} ${natalP.formattedDegree}`, screenX, screenY + bodyR + 29);
            }
          }
          ctx.shadowBlur = 0;
        }
      });

      // Save calculated positions in canvas ref for mouse interaction
      (canvas as any)._bodyPositions = bodyPositions;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [
    celestialBodies,
    isPlaying,
    speedMultiplier,
    viewAngle,
    hoveredBody,
    selectedBody,
    showOrbitTracks,
    showVortexGeometry,
    isBirthLockedMode,
    birthEphemeris,
  ]);

  // Mouse Interaction handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const positions = (canvas as any)._bodyPositions as {
      body: CelestialBodyData;
      x: number;
      y: number;
      r: number;
    }[];

    if (!positions) return;

    const found = positions.find((p) => {
      const dist = Math.hypot(p.x - mouseX, p.y - mouseY);
      return dist <= p.r;
    });

    if (found) {
      if (hoveredBody?.id !== found.body.id) {
        setHoveredBody(found.body);
        if (!isAudioMuted) {
          cosmicAudio.playPlanetTone(found.body.vibrationalFrequencyHz);
        }
      }
    } else {
      setHoveredBody(null);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const positions = (canvas as any)._bodyPositions as {
      body: CelestialBodyData;
      x: number;
      y: number;
      r: number;
    }[];

    if (!positions) return;

    const found = positions.find((p) => {
      const dist = Math.hypot(p.x - mouseX, p.y - mouseY);
      return dist <= p.r;
    });

    if (found) {
      onSelectBody(found.body);
    }
  };

  return (
    <div className="relative w-full h-[540px] sm:h-[640px] rounded-3xl overflow-hidden border border-amber-500/30 bg-[#06030e] shadow-[0_0_50px_rgba(0,0,0,0.8)] select-none">
      {/* Birth Planetary Ephemeris Modal */}
      <BirthPlanetaryEphemerisModal
        isOpen={isEphemerisModalOpen}
        onClose={() => setIsEphemerisModalOpen(false)}
        onApplyBirthPositions={handleApplyBirthPositions}
        onFocusPlanet={(pid) => {
          const body = celestialBodies.find((b) => b.id === pid);
          if (body) onSelectBody(body);
        }}
        theme={theme}
      />

      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        className="w-full h-full cursor-crosshair"
      />

      {/* Top Left: Controls & Speed Bar */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex flex-wrap items-center gap-2">
        <button
          onClick={() => {
            setIsBirthLockedMode(false);
            setIsPlaying(!isPlaying);
          }}
          className="p-2.5 rounded-xl bg-black/70 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 transition-all shadow-lg cursor-pointer"
          title={isPlaying ? 'Pause Revolving Orbits' : 'Resume Revolving Orbits'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Speed Multipliers */}
        <div className="flex items-center bg-black/70 rounded-xl border border-amber-500/40 p-1">
          {[1, 3, 6, 9].map((spd) => (
            <button
              key={spd}
              onClick={() => {
                setIsBirthLockedMode(false);
                setSpeedMultiplier(spd);
                setIsPlaying(true);
              }}
              className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                speedMultiplier === spd && !isBirthLockedMode
                  ? 'bg-amber-500 text-black shadow-[0_0_12px_rgba(255,215,0,0.6)]'
                  : 'text-amber-200/70 hover:text-amber-200'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>

        {/* Perspective Angles */}
        <div className="flex items-center bg-black/70 rounded-xl border border-amber-500/40 p-1">
          <button
            onClick={() => setViewAngle('3d')}
            className={`px-2.5 py-1 text-xs font-cinzel rounded-lg cursor-pointer transition-all ${
              viewAngle === '3d' ? 'bg-amber-500/30 text-amber-200 font-bold' : 'text-gray-400'
            }`}
          >
            3D Tilt
          </button>
          <button
            onClick={() => setViewAngle('top')}
            className={`px-2.5 py-1 text-xs font-cinzel rounded-lg cursor-pointer transition-all ${
              viewAngle === 'top' ? 'bg-amber-500/30 text-amber-200 font-bold' : 'text-gray-400'
            }`}
          >
            Zenith 2D
          </button>
        </div>

        <button
          onClick={() => setShowVortexGeometry(!showVortexGeometry)}
          className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
            showVortexGeometry
              ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(255,215,0,0.4)]'
              : 'bg-black/70 border-white/20 text-gray-400'
          }`}
          title="Toggle 3-6-9 Sacred Vortex Geometry"
        >
          <Sparkles className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsAudioMuted(!isAudioMuted)}
          className="p-2.5 rounded-xl bg-black/70 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 transition-all shadow-lg cursor-pointer"
          title={isAudioMuted ? 'Unmute Planet Tones' : 'Mute Planet Tones'}
        >
          {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Top Right: Birth Date & Time Planetary Ephemeris Calculator + Black Hole Button */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-2">
        {/* Birth Ephemeris Button */}
        <button
          onClick={() => setIsEphemerisModalOpen(true)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-cinzel font-bold tracking-wider transition-all shadow-lg cursor-pointer ${
            isBirthLockedMode
              ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-400 text-black border border-amber-300 shadow-[0_0_25px_rgba(255,215,0,0.5)] scale-105'
              : 'bg-black/80 hover:bg-amber-500/20 border border-amber-500/50 text-[#ffd700]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{isBirthLockedMode ? '🎂 Birth Natal Alignment Active' : '🎂 Input Date & Time of Birth'}</span>
        </button>

        {/* Black Hole Warp Button */}
        <button
          onClick={onEnterBlackHolePortal}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-purple-900/90 via-black to-amber-950/90 border border-purple-400/70 text-amber-200 text-xs font-cinzel font-bold tracking-wider hover:scale-105 transition-all shadow-[0_0_25px_rgba(168,85,247,0.5)] cursor-pointer group"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
          <span>Black Hole Singularity</span>
          <Zap className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
        </button>
      </div>

      {/* Birth Position Notification Banner (If active) */}
      {isBirthLockedMode && birthEphemeris && (
        <div className="absolute top-16 right-3 sm:right-4 z-20 p-2.5 px-4 rounded-2xl bg-black/90 border border-amber-400/60 backdrop-blur-md text-xs text-amber-200 flex items-center gap-3 shadow-2xl animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <span className="font-bold text-white">Natal Chart Ephemeris:</span> {birthEphemeris.birthDate} at {birthEphemeris.birthTime}
            <div className="text-[11px] text-cyan-300">
              Sun in {birthEphemeris.sunSign} • Moon in {birthEphemeris.moonSign} • {birthEphemeris.nakshatra}
            </div>
          </div>
          <button
            onClick={() => {
              setIsBirthLockedMode(false);
              setIsPlaying(true);
            }}
            className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white cursor-pointer ml-1"
          >
            Resume Live Orbits
          </button>
        </div>
      )}

      {/* Hovered Planet Quick HUD Card */}
      {hoveredBody && (
        <div className="absolute bottom-16 left-4 z-20 p-3.5 rounded-2xl bg-black/85 border border-amber-400/60 backdrop-blur-md max-w-xs space-y-1 shadow-2xl animate-fade-in pointer-events-none">
          <div className="flex items-center gap-2">
            <div
              className="w-3.5 h-3.5 rounded-full"
              style={{ backgroundColor: hoveredBody.color }}
            />
            <span className="font-cinzel font-bold text-sm text-[#fdf2d1]">
              {hoveredBody.name}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold ml-auto">
              #{hoveredBody.teslaHarmonicNumber}
            </span>
          </div>
          <p className="text-xs text-amber-200/80 font-serif">{hoveredBody.sanskritName}</p>
          <div className="text-[11px] font-mono text-gray-300 flex justify-between pt-1 border-t border-white/10">
            <span>Acoustic Frequency:</span>
            <span className="text-amber-400 font-bold">{hoveredBody.vibrationalFrequencyHz} Hz</span>
          </div>
          <div className="text-[10px] text-cyan-300 font-mono">
            Click to warp into deep planetary portal ➔
          </div>
        </div>
      )}

      {/* Bottom Planet Quick-Selector Ribbon */}
      <div className="absolute bottom-2 inset-x-2 z-20 overflow-x-auto no-scrollbar py-1 px-2 flex items-center gap-1.5 bg-black/80 rounded-2xl border border-amber-500/30 backdrop-blur-md">
        <span className="text-[10px] font-mono text-amber-400/80 uppercase font-bold pl-1 shrink-0">
          Warp Target:
        </span>
        {celestialBodies.map((body) => (
          <button
            key={body.id}
            onClick={() => onSelectBody(body)}
            className={`px-2.5 py-1 rounded-xl text-xs font-cinzel font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              selectedBody?.id === body.id
                ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(255,215,0,0.8)] scale-105'
                : 'bg-white/5 hover:bg-white/15 text-gray-300 border border-white/10'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: body.color }}
            />
            <span>{body.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
