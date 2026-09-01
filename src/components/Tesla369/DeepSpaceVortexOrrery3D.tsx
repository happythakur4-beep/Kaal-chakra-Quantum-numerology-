import React, { useRef, useEffect, useState } from 'react';
import { CelestialBodyData } from '../../types';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { drawHighFidelityPlanet } from '../../utils/highQualityPlanetRenderer';
import {
  NatalEphemerisData,
  calculateBirthPlanetaryPositions,
} from '../../utils/planetaryEphemeris';
import { BirthPlanetaryEphemerisModal } from './BirthPlanetaryEphemerisModal';
import {
  Sparkles,
  Sun,
  Eye,
  Orbit,
  Play,
  Pause,
  RotateCw,
  Compass,
  Zap,
  Layers,
  Volume2,
  VolumeX,
  Maximize2,
  Gauge,
  Sliders,
  Radio,
  Search,
  Crosshair,
  Globe,
  Copy,
  Check,
  Camera,
  Calendar,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DeepSpaceVortexOrrery3DProps {
  celestialBodies: CelestialBodyData[];
  onSelectBody: (body: CelestialBodyData) => void;
  selectedBody: CelestialBodyData | null;
  onEnterBlackHolePortal?: () => void;
  birthEphemeris?: NatalEphemerisData | null;
  isBirthLocked?: boolean;
  onOpenBirthModal?: () => void;
  onResetBirthAlignment?: () => void;
  onApplyBirthEphemeris?: (ephemeris: NatalEphemerisData) => void;
}

// Astronomical Realism Reference Data for 3D simulation
const PLANETARY_REALISM_PROPERTIES: {
  [id: string]: {
    axialTiltDeg: number;
    rotationPeriodHrs: number;
    orbitalPeriodEarthDays: number;
    atmosphericThickness: number; // 0 to 1
    rayleighColor: string;
    volumetricHaze: string;
    shadowSharpness: number;
    albedo: number;
    ringDetails?: boolean;
    cloudLayerSpeed?: number;
    surfaceFeatures: string;
  };
} = {
  sun: {
    axialTiltDeg: 7.25,
    rotationPeriodHrs: 600,
    orbitalPeriodEarthDays: 0,
    atmosphericThickness: 1.0,
    rayleighColor: 'rgba(251, 191, 36, 0.8)',
    volumetricHaze: 'rgba(245, 158, 11, 0.4)',
    shadowSharpness: 0,
    albedo: 1.0,
    surfaceFeatures: 'Solar Granules & Magnetic Flare Loops',
  },
  mercury: {
    axialTiltDeg: 0.03,
    rotationPeriodHrs: 1407,
    orbitalPeriodEarthDays: 88,
    atmosphericThickness: 0.05,
    rayleighColor: 'rgba(156, 163, 175, 0.2)',
    volumetricHaze: 'rgba(107, 114, 128, 0.1)',
    shadowSharpness: 0.95,
    albedo: 0.12,
    surfaceFeatures: 'Impact Basins & Regolith Scarps',
  },
  venus: {
    axialTiltDeg: 177.36,
    rotationPeriodHrs: -5832,
    orbitalPeriodEarthDays: 224.7,
    atmosphericThickness: 0.95,
    rayleighColor: 'rgba(251, 191, 36, 0.65)',
    volumetricHaze: 'rgba(217, 119, 6, 0.35)',
    shadowSharpness: 0.4,
    albedo: 0.77,
    surfaceFeatures: 'Super-Rotating Sulfuric Acid Cloud Decks',
  },
  earth: {
    axialTiltDeg: 23.44,
    rotationPeriodHrs: 24,
    orbitalPeriodEarthDays: 365.25,
    atmosphericThickness: 0.7,
    rayleighColor: 'rgba(56, 189, 248, 0.85)',
    volumetricHaze: 'rgba(14, 165, 233, 0.3)',
    shadowSharpness: 0.85,
    albedo: 0.31,
    cloudLayerSpeed: 1.2,
    surfaceFeatures: 'Liquid Oceans, Continents & Cyclonic Storms',
  },
  moon: {
    axialTiltDeg: 1.54,
    rotationPeriodHrs: 655,
    orbitalPeriodEarthDays: 27.3,
    atmosphericThickness: 0.02,
    rayleighColor: 'rgba(226, 232, 240, 0.3)',
    volumetricHaze: 'rgba(148, 163, 184, 0.1)',
    shadowSharpness: 0.98,
    albedo: 0.14,
    surfaceFeatures: 'Lunar Maria (Basaltic Plains) & Crater Rays',
  },
  mars: {
    axialTiltDeg: 25.19,
    rotationPeriodHrs: 24.6,
    orbitalPeriodEarthDays: 687,
    atmosphericThickness: 0.35,
    rayleighColor: 'rgba(251, 113, 133, 0.5)',
    volumetricHaze: 'rgba(239, 68, 68, 0.2)',
    shadowSharpness: 0.9,
    albedo: 0.25,
    surfaceFeatures: 'Olympus Mons, Valles Marineris & Polar CO2 Ice Caps',
  },
  jupiter: {
    axialTiltDeg: 3.13,
    rotationPeriodHrs: 9.93,
    orbitalPeriodEarthDays: 4333,
    atmosphericThickness: 0.9,
    rayleighColor: 'rgba(251, 191, 36, 0.7)',
    volumetricHaze: 'rgba(217, 119, 6, 0.3)',
    shadowSharpness: 0.5,
    albedo: 0.52,
    surfaceFeatures: 'Great Red Spot, Zonal Counter-Rotating Jet Streams',
  },
  saturn: {
    axialTiltDeg: 26.73,
    rotationPeriodHrs: 10.7,
    orbitalPeriodEarthDays: 10759,
    atmosphericThickness: 0.85,
    rayleighColor: 'rgba(254, 240, 138, 0.6)',
    volumetricHaze: 'rgba(234, 179, 8, 0.25)',
    shadowSharpness: 0.6,
    albedo: 0.47,
    ringDetails: true,
    surfaceFeatures: 'Hexagonal North Polar Vortex & Multi-Tier Ring Gaps',
  },
  uranus: {
    axialTiltDeg: 97.77,
    rotationPeriodHrs: -17.2,
    orbitalPeriodEarthDays: 30687,
    atmosphericThickness: 0.8,
    rayleighColor: 'rgba(103, 232, 249, 0.75)',
    volumetricHaze: 'rgba(6, 182, 212, 0.25)',
    shadowSharpness: 0.7,
    albedo: 0.51,
    surfaceFeatures: 'Methane Ice Atmosphere & Retrograde Extreme Tilt',
  },
  neptune: {
    axialTiltDeg: 28.32,
    rotationPeriodHrs: 16.1,
    orbitalPeriodEarthDays: 60190,
    atmosphericThickness: 0.85,
    rayleighColor: 'rgba(96, 165, 250, 0.85)',
    volumetricHaze: 'rgba(37, 99, 235, 0.35)',
    shadowSharpness: 0.75,
    albedo: 0.41,
    surfaceFeatures: 'Great Dark Spot & Supersonic 2,100 km/h Winds',
  },
  rahu: {
    axialTiltDeg: 0,
    rotationPeriodHrs: 100,
    orbitalPeriodEarthDays: 6793,
    atmosphericThickness: 0.9,
    rayleighColor: 'rgba(168, 85, 247, 0.8)',
    volumetricHaze: 'rgba(126, 34, 206, 0.4)',
    shadowSharpness: 0.3,
    albedo: 0.05,
    surfaceFeatures: 'Ascending Lunar Node Quantum Gravitational Singularity',
  },
  ketu: {
    axialTiltDeg: 0,
    rotationPeriodHrs: 100,
    orbitalPeriodEarthDays: 6793,
    atmosphericThickness: 0.9,
    rayleighColor: 'rgba(239, 68, 68, 0.8)',
    volumetricHaze: 'rgba(185, 28, 28, 0.4)',
    shadowSharpness: 0.3,
    albedo: 0.05,
    surfaceFeatures: 'Descending Lunar Node Sub-Atomic Ether Tail',
  },
};

export const DeepSpaceVortexOrrery3D: React.FC<DeepSpaceVortexOrrery3DProps> = ({
  celestialBodies,
  onSelectBody,
  selectedBody,
  onEnterBlackHolePortal,
  birthEphemeris: propBirthEphemeris,
  isBirthLocked: propIsBirthLocked,
  onOpenBirthModal: propOnOpenBirthModal,
  onResetBirthAlignment: propOnResetBirthAlignment,
  onApplyBirthEphemeris: propOnApplyBirthEphemeris,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Interactive Simulation Controls
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeScale, setTimeScale] = useState<number>(1.0); // 0.1x to 5.0x
  const [volumetricLightIntensity, setVolumetricLightIntensity] = useState<number>(1.25);
  const [atmosphericScatteringQuality, setAtmosphericScatteringQuality] = useState<'ultra' | 'high' | 'cinematic'>('cinematic');
  const [showOrbitalTraces, setShowOrbitalTraces] = useState(true);
  const [showStardustField, setShowStardustField] = useState(true);
  const [showVolumetricLightShafts, setShowVolumetricLightShafts] = useState(true);
  const [cameraView, setCameraView] = useState<'deep-vortex' | 'ecliptic' | 'polar' | 'focus-target'>('deep-vortex');
  const [hoveredBody, setHoveredBody] = useState<CelestialBodyData | null>(null);
  const [isAudioActive, setIsAudioActive] = useState(true);
  const [vortexSpinSpeed, setVortexSpinSpeed] = useState<number>(0.8);

  // Local Birth Ephemeris state if not driven exclusively by parent
  const [localEphemerisModalOpen, setLocalEphemerisModalOpen] = useState(false);
  const [localBirthEphemeris, setLocalBirthEphemeris] = useState<NatalEphemerisData | null>(null);
  const [localIsBirthLocked, setLocalIsBirthLocked] = useState(false);

  const effectiveBirthEphemeris = propBirthEphemeris !== undefined ? propBirthEphemeris : localBirthEphemeris;
  const activeBirthLocked = propIsBirthLocked !== undefined ? propIsBirthLocked : localIsBirthLocked;

  const handleApplyLocalEphemeris = (ephemeris: NatalEphemerisData) => {
    setLocalBirthEphemeris(ephemeris);
    setLocalIsBirthLocked(true);
    setIsPlaying(false);
    if (propOnApplyBirthEphemeris) {
      propOnApplyBirthEphemeris(ephemeris);
    }
  };

  const handleResetBirthAlignment = () => {
    setLocalIsBirthLocked(false);
    setIsPlaying(true);
    if (propOnResetBirthAlignment) {
      propOnResetBirthAlignment();
    }
  };

  const handleOpenEphemerisModal = () => {
    if (propOnOpenBirthModal) {
      propOnOpenBirthModal();
    } else {
      setLocalEphemerisModalOpen(true);
    }
  };

  // Camera 3D Orbit Dragging State
  const cameraAngleRef = useRef<{ pitch: number; yaw: number; zoom: number; panX: number; panY: number }>({
    pitch: 0.48, // 3D deep space tilt angle
    yaw: 0.15,
    zoom: 1.0,
    panX: 0,
    panY: 0,
  });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeRenderPreset, setActiveRenderPreset] = useState<'hyper-realism' | 'imax-vortex' | 'tesla-369' | 'rayleigh-atmo'>('hyper-realism');

  const CINEMATIC_PROMPT =
    "An ultra-high-resolution, cinematic 3D rendering of planets suspended in a deep space vortex, featuring photorealistic surface textures derived from astronomical data, accurate atmospheric Rayleigh scattering, dynamic volumetric lighting from a central star, and subtle stardust particle fields, all presented in a visually stunning and hyper-realistic style.";

  const applyRenderPreset = (preset: 'hyper-realism' | 'imax-vortex' | 'tesla-369' | 'rayleigh-atmo') => {
    setActiveRenderPreset(preset);
    try {
      cosmicAudio.playCyberWarp();
    } catch {}

    if (preset === 'hyper-realism') {
      setTimeScale(1.0);
      setVolumetricLightIntensity(1.25);
      setVortexSpinSpeed(0.8);
      setShowOrbitalTraces(true);
      setShowVolumetricLightShafts(true);
      setShowStardustField(true);
      cameraAngleRef.current.pitch = 0.48;
      cameraAngleRef.current.zoom = 1.0;
    } else if (preset === 'imax-vortex') {
      setTimeScale(1.6);
      setVolumetricLightIntensity(1.85);
      setVortexSpinSpeed(1.6);
      setShowOrbitalTraces(true);
      setShowVolumetricLightShafts(true);
      setShowStardustField(true);
      cameraAngleRef.current.pitch = 0.72;
      cameraAngleRef.current.zoom = 1.25;
    } else if (preset === 'tesla-369') {
      setTimeScale(0.639);
      setVolumetricLightIntensity(1.369);
      setVortexSpinSpeed(1.0);
      setShowOrbitalTraces(true);
      setShowVolumetricLightShafts(true);
      setShowStardustField(true);
      cameraAngleRef.current.pitch = 0.369;
      cameraAngleRef.current.zoom = 1.15;
    } else if (preset === 'rayleigh-atmo') {
      setTimeScale(0.5);
      setVolumetricLightIntensity(2.1);
      setVortexSpinSpeed(0.5);
      setShowOrbitalTraces(false);
      setShowVolumetricLightShafts(true);
      setShowStardustField(true);
      cameraAngleRef.current.pitch = 0.22;
      cameraAngleRef.current.zoom = 1.4;
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(CINEMATIC_PROMPT);
    setCopiedPrompt(true);
    try {
      cosmicAudio.playCyberSuccess();
    } catch {}
    setTimeout(() => setCopiedPrompt(false), 3000);
  };

  // Planetary Current Orbital Angle trackers
  const orbitalAnglesRef = useRef<{ [id: string]: number }>({});
  const axialRotationsRef = useRef<{ [id: string]: number }>({});

  useEffect(() => {
    celestialBodies.forEach((b, idx) => {
      if (orbitalAnglesRef.current[b.id] === undefined) {
        // Natural staggered initial angular positions
        orbitalAnglesRef.current[b.id] = (idx / celestialBodies.length) * Math.PI * 2 + Math.random() * 0.5;
      }
      if (axialRotationsRef.current[b.id] === undefined) {
        axialRotationsRef.current[b.id] = Math.random() * Math.PI * 2;
      }
    });
  }, [celestialBodies]);

  // Audio tone play when selecting body
  const handleSelect = (b: CelestialBodyData) => {
    onSelectBody(b);
    try {
      cosmicAudio.playPlanetTone(b.vibrationalFrequencyHz || 432);
      confetti({
        particleCount: 20,
        spread: 70,
        origin: { y: 0.65 },
        colors: [b.color || '#00f3ff', '#ffd700', '#38bdf8'],
      });
    } catch {}
  };

  // Main Photorealistic Deep Space Vortex Canvas Renderer Loop
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

    // =========================================================================
    // 1. GENERATE DEEP SPACE STARDUST & NEBULAR FILAMENT PARTICLES
    // =========================================================================
    interface StardustParticle {
      x: number;
      y: number;
      z: number;
      size: number;
      baseColor: string;
      twinkleSpeed: number;
      phase: number;
      vortexRadius: number;
      vortexSpeed: number;
    }

    const stardustArray: StardustParticle[] = [];
    const numStardust = 600;
    const nebulaColors = ['#93c5fd', '#fef08a', '#f472b6', '#a78bfa', '#38bdf8', '#ffffff', '#fdba74'];

    for (let i = 0; i < numStardust; i++) {
      const radius = Math.random() * 850 + 20;
      const angle = Math.random() * Math.PI * 2;
      stardustArray.push({
        x: Math.cos(angle) * radius,
        y: (Math.random() - 0.5) * 350,
        z: Math.sin(angle) * radius,
        size: Math.random() * 2.2 + 0.4,
        baseColor: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        phase: Math.random() * Math.PI * 2,
        vortexRadius: radius,
        vortexSpeed: (0.0004 + (1 / Math.sqrt(radius)) * 0.004) * vortexSpinSpeed,
      });
    }

    // Volumetric Central Star God-Rays Array
    const sunRayAngles: number[] = [];
    for (let i = 0; i < 24; i++) {
      sunRayAngles.push((i / 24) * Math.PI * 2 + (Math.random() - 0.5) * 0.1);
    }

    let frameCount = 0;

    const render = () => {
      frameCount++;
      const timeDelta = isPlaying ? timeScale : 0;

      // Dark Cosmic Deep Space Void Background
      ctx.fillStyle = '#010309';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2 + cameraAngleRef.current.panX;
      const cy = height / 2 + cameraAngleRef.current.panY;
      const pitch = cameraAngleRef.current.pitch;
      const yaw = cameraAngleRef.current.yaw + (isPlaying ? frameCount * 0.0008 * vortexSpinSpeed : 0);
      const zoom = cameraAngleRef.current.zoom;

      // =========================================================================
      // 2. ATMOSPHERIC COSMIC NEBULA & ETHERIC VORTEX BACKDROP
      // =========================================================================
      const vortexGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(width, height) * 0.85);
      vortexGrad.addColorStop(0, 'rgba(30, 27, 75, 0.45)'); // Deep Indigo Center
      vortexGrad.addColorStop(0.35, 'rgba(15, 23, 42, 0.3)');
      vortexGrad.addColorStop(0.7, 'rgba(8, 14, 30, 0.2)');
      vortexGrad.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
      ctx.fillStyle = vortexGrad;
      ctx.fillRect(0, 0, width, height);

      // Deep space swirl rings
      ctx.save();
      ctx.translate(cx, cy);
      for (let ring = 1; ring <= 4; ring++) {
        ctx.beginPath();
        ctx.ellipse(0, 0, (ring * 180 + Math.sin(frameCount * 0.02 + ring) * 10) * zoom, (ring * 180 * Math.sin(pitch)) * zoom, yaw, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.04 / ring})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.restore();

      // =========================================================================
      // 3. RENDER VOLUMETRIC LIGHT RAYS FROM CENTRAL SUN (God Rays / Solar Flares)
      // =========================================================================
      if (showVolumetricLightShafts) {
        ctx.save();
        ctx.translate(cx, cy);
        const sunRadiusScreen = 32 * zoom;

        // Volumetric Core Glow
        const solarHalo = ctx.createRadialGradient(0, 0, 5, 0, 0, sunRadiusScreen * 5.5 * volumetricLightIntensity);
        solarHalo.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        solarHalo.addColorStop(0.2, 'rgba(251, 191, 36, 0.65)');
        solarHalo.addColorStop(0.5, 'rgba(245, 158, 11, 0.25)');
        solarHalo.addColorStop(0.8, 'rgba(239, 68, 68, 0.08)');
        solarHalo.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = solarHalo;
        ctx.beginPath();
        ctx.arc(0, 0, sunRadiusScreen * 5.5 * volumetricLightIntensity, 0, Math.PI * 2);
        ctx.fill();

        // Radiating Volumetric Shafts
        sunRayAngles.forEach((baseAngle, idx) => {
          const rayAngle = baseAngle + frameCount * 0.002 * (idx % 2 === 0 ? 1 : -1);
          const rayLen = (180 + Math.sin(frameCount * 0.04 + idx) * 50) * zoom * volumetricLightIntensity;
          const rayWidth = 0.08 + Math.sin(frameCount * 0.03 + idx * 2) * 0.03;

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.arc(0, 0, rayLen, rayAngle - rayWidth, rayAngle + rayWidth);
          ctx.closePath();

          const rayGrad = ctx.createRadialGradient(0, 0, sunRadiusScreen, 0, 0, rayLen);
          rayGrad.addColorStop(0, 'rgba(254, 240, 138, 0.4)');
          rayGrad.addColorStop(0.6, 'rgba(245, 158, 11, 0.15)');
          rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = rayGrad;
          ctx.fill();
        });
        ctx.restore();
      }

      // =========================================================================
      // 4. RENDER 3D STARDUST PARTICLE FIELD WITH PROJECTION & DEPTH
      // =========================================================================
      if (showStardustField) {
        stardustArray.forEach((p) => {
          if (isPlaying) {
            p.phase += p.twinkleSpeed;
            // Swirl around deep space vortex
            const currentAngle = Math.atan2(p.z, p.x) + p.vortexSpeed * timeScale;
            p.x = Math.cos(currentAngle) * p.vortexRadius;
            p.z = Math.sin(currentAngle) * p.vortexRadius;
          }

          // 3D 2-axis Rotation Transformation (Yaw & Pitch)
          // Rotate Yaw around Y
          const cosY = Math.cos(yaw);
          const sinY = Math.sin(yaw);
          const x1 = p.x * cosY - p.z * sinY;
          const z1 = p.x * sinY + p.z * cosY;

          // Rotate Pitch around X
          const cosP = Math.cos(pitch);
          const sinP = Math.sin(pitch);
          const y2 = p.y * cosP - z1 * sinP;
          const z2 = p.y * sinP + z1 * cosP;

          // Screen projection
          const screenX = cx + x1 * zoom;
          const screenY = cy + y2 * zoom;

          // Depth attenuation & Twinkle
          const depthAlpha = Math.min(1, Math.max(0.1, (z2 + 600) / 1000));
          const twinkle = Math.sin(p.phase) * 0.35 + 0.65;

          ctx.beginPath();
          ctx.arc(screenX, screenY, p.size * zoom * (0.8 + depthAlpha * 0.4), 0, Math.PI * 2);
          ctx.fillStyle = p.baseColor;
          ctx.globalAlpha = depthAlpha * twinkle * 0.85;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        });
      }

      // =========================================================================
      // 5. CALCULATE & RENDER 3D PLANETS WITH PHOTOREALISTIC TEXTURES & LIGHTING
      // =========================================================================
      interface ProjectedPlanet {
        body: CelestialBodyData;
        screenX: number;
        screenY: number;
        screenZ: number; // For depth sorting painter's algorithm
        radius: number;
        orbitRadiusScreen: number;
        orbitalAngle: number;
        lightDirX: number;
        lightDirY: number;
      }

      const projectedBodies: ProjectedPlanet[] = [];

      celestialBodies.forEach((body) => {
        const realism = PLANETARY_REALISM_PROPERTIES[body.id] || {
          axialTiltDeg: 0,
          rotationPeriodHrs: 24,
          orbitalPeriodEarthDays: 365,
          atmosphericThickness: 0.5,
          rayleighColor: 'rgba(56, 189, 248, 0.5)',
          volumetricHaze: 'rgba(14, 165, 233, 0.2)',
          shadowSharpness: 0.8,
          albedo: 0.3,
          surfaceFeatures: 'Volumetric Terrain Matrix',
        };

        // Advance planetary orbit according to Keplerian velocity or Lerp to Natal Birth Position
        if (activeBirthLocked && effectiveBirthEphemeris) {
          const natalP = effectiveBirthEphemeris.planets.find((item) => item.id === body.id);
          if (natalP && typeof natalP.orbitalAngleRad === 'number') {
            const targetAngle = natalP.orbitalAngleRad;
            const current = orbitalAnglesRef.current[body.id] ?? targetAngle;
            let diff = (targetAngle - current) % (Math.PI * 2);
            if (diff > Math.PI) diff -= Math.PI * 2;
            if (diff < -Math.PI) diff += Math.PI * 2;
            orbitalAnglesRef.current[body.id] = current + diff * 0.08;
          }
        } else if (isPlaying && realism.orbitalPeriodEarthDays > 0) {
          const orbitalSpeed = (365.25 / realism.orbitalPeriodEarthDays) * 0.006 * timeScale;
          orbitalAnglesRef.current[body.id] = (orbitalAnglesRef.current[body.id] + orbitalSpeed) % (Math.PI * 2);
        }

        // Advance Axial Rotation for photorealistic surface movement
        if (isPlaying && realism.rotationPeriodHrs !== 0) {
          const rotationSpeed = (24 / realism.rotationPeriodHrs) * 0.04 * timeScale;
          axialRotationsRef.current[body.id] = (axialRotationsRef.current[body.id] + rotationSpeed) % (Math.PI * 2);
        }

        const orbAngle = orbitalAnglesRef.current[body.id] || 0;
        const orbRadius = (body.orbitDistance || 120) * 1.35;

        // Position in 3D Space (Sun is at origin)
        const isSun = body.id === 'sun';
        const posX = isSun ? 0 : Math.cos(orbAngle) * orbRadius;
        const posY = 0; // Baseline ecliptic
        const posZ = isSun ? 0 : Math.sin(orbAngle) * orbRadius;

        // Apply 3D Camera Transformation (Yaw & Pitch)
        const cosY = Math.cos(yaw);
        const sinY = Math.sin(yaw);
        const x1 = posX * cosY - posZ * sinY;
        const z1 = posX * sinY + posZ * cosY;

        const cosP = Math.cos(pitch);
        const sinP = Math.sin(pitch);
        const y2 = posY * cosP - z1 * sinP;
        const z2 = posY * sinP + z1 * cosP;

        const screenX = cx + x1 * zoom;
        const screenY = cy + y2 * zoom;

        // Dynamic 3D depth scale: closer bodies are slightly larger
        const depthScale = Math.max(0.65, Math.min(1.45, 1 + z2 / 900));
        const bodyRadiusScreen = Math.max(8, (body.radius || 18) * 0.85 * zoom * depthScale);

        // Calculate Light Direction Vector pointing from Sun (cx, cy) to this Planet
        const lightDx = cx - screenX;
        const lightDy = cy - screenY;
        const lightDist = Math.hypot(lightDx, lightDy);
        const lightDirX = lightDist > 0 ? lightDx / lightDist : 0;
        const lightDirY = lightDist > 0 ? lightDy / lightDist : 0;

        projectedBodies.push({
          body,
          screenX,
          screenY,
          screenZ: z2,
          radius: bodyRadiusScreen,
          orbitRadiusScreen: orbRadius * zoom,
          orbitalAngle: orbAngle,
          lightDirX,
          lightDirY,
        });
      });

      // 5a. Draw 3D Luminous Orbital Tracks (Ellipses in projected space)
      if (showOrbitalTraces) {
        ctx.save();
        ctx.translate(cx, cy);
        projectedBodies.forEach((p) => {
          if (p.body.id === 'sun') return;
          const isTarget = selectedBody?.id === p.body.id || hoveredBody?.id === p.body.id;

          ctx.beginPath();
          ctx.ellipse(0, 0, p.orbitRadiusScreen, p.orbitRadiusScreen * Math.sin(pitch), yaw, 0, Math.PI * 2);
          ctx.strokeStyle = activeBirthLocked
            ? 'rgba(251, 191, 36, 0.28)'
            : isTarget
            ? 'rgba(0, 243, 255, 0.65)'
            : 'rgba(255, 255, 255, 0.12)';
          ctx.lineWidth = isTarget ? 2 : 1;
          if (isTarget) {
            ctx.shadowColor = '#00f3ff';
            ctx.shadowBlur = 10;
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        });
        ctx.restore();
      }

      // 5a-2. Draw Natal Birth Alignment Energy Beams (Sun to Planets)
      if (activeBirthLocked) {
        ctx.save();
        projectedBodies.forEach((p) => {
          if (p.body.id === 'sun') return;
          const isTarget = selectedBody?.id === p.body.id || hoveredBody?.id === p.body.id;
          
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(p.screenX, p.screenY);
          ctx.strokeStyle = isTarget ? 'rgba(251, 191, 36, 0.85)' : 'rgba(251, 191, 36, 0.35)';
          ctx.lineWidth = isTarget ? 2 : 1;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        });
        ctx.restore();
      }

      // 5b. Depth Sort Bodies (Painter's Algorithm from back to front)
      projectedBodies.sort((a, b) => a.screenZ - b.screenZ);

      // 5c. Render Photorealistic Shaders & Atmospheric Rayleigh Scattering for each body
      projectedBodies.forEach((p) => {
        const isSelected = selectedBody?.id === p.body.id;
        const isHovered = hoveredBody?.id === p.body.id;
        const realism = PLANETARY_REALISM_PROPERTIES[p.body.id];
        const natalP = effectiveBirthEphemeris?.planets.find((item) => item.id === p.body.id);

        ctx.save();

        // 1. Draw Volumetric Atmospheric Glow & Rayleigh Scattering Ring
        if (p.body.id !== 'sun' && realism && realism.atmosphericThickness > 0.1) {
          const atmosphereRadius = p.radius * (1.18 + realism.atmosphericThickness * 0.35);
          
          // Atmospheric Rim Gradient facing towards the Sun
          const atmoGrad = ctx.createRadialGradient(
            p.screenX + p.lightDirX * p.radius * 0.3,
            p.screenY + p.lightDirY * p.radius * 0.3,
            p.radius * 0.8,
            p.screenX,
            p.screenY,
            atmosphereRadius
          );
          atmoGrad.addColorStop(0, realism.rayleighColor);
          atmoGrad.addColorStop(0.5, realism.volumetricHaze);
          atmoGrad.addColorStop(1, 'rgba(0,0,0,0)');

          ctx.fillStyle = atmoGrad;
          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, atmosphereRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // 2. Draw Main High-Fidelity Photorealistic Surface Shader
        drawHighFidelityPlanet({
          ctx,
          body: p.body,
          screenX: p.screenX,
          screenY: p.screenY,
          bodyRadius: p.radius,
          frame: frameCount * (isPlaying ? timeScale : 1),
          isSelected,
          isHovered,
          lightSourceX: cx,
          lightSourceY: cy,
        });

        // 3. Dynamic Volumetric Shadow Terminator Cast (Dark Side of the Planet)
        if (p.body.id !== 'sun' && realism) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, p.radius * 0.99, 0, Math.PI * 2);
          ctx.clip();

          // Shadow mask on the side away from the Sun
          const shadowGrad = ctx.createLinearGradient(
            p.screenX + p.lightDirX * p.radius * 0.9,
            p.screenY + p.lightDirY * p.radius * 0.9,
            p.screenX - p.lightDirX * p.radius * 0.9,
            p.screenY - p.lightDirY * p.radius * 0.9
          );
          shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
          shadowGrad.addColorStop(0.45, 'rgba(0, 0, 0, 0.15)');
          shadowGrad.addColorStop(0.75, `rgba(1, 4, 12, ${realism.shadowSharpness * 0.88})`);
          shadowGrad.addColorStop(1, 'rgba(0, 1, 5, 0.97)');

          ctx.fillStyle = shadowGrad;
          ctx.fillRect(p.screenX - p.radius * 1.5, p.screenY - p.radius * 1.5, p.radius * 3, p.radius * 3);
          ctx.restore();
        }

        // 4. HUD Planetary Label & Hindi Shastra Title & Birth Ephemeris Sign
        const labelOffsetY = p.radius + 16;
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';

        if (isSelected || isHovered) {
          // Glowing Cyber Reticle & Badge
          ctx.strokeStyle = activeBirthLocked ? '#f59e0b' : '#00f3ff';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(p.screenX - p.radius - 6, p.screenY - p.radius - 6, p.radius * 2 + 12, p.radius * 2 + 12);

          // Name Tag Box
          const text = `${p.body.name} (${p.body.sanskritName || ''})`;
          const subText = activeBirthLocked && natalP ? `✨ ${natalP.sign} ${natalP.formattedDegree || ''} [H${natalP.house}]` : '';
          const textWidth = Math.max(ctx.measureText(text).width, subText ? ctx.measureText(subText).width : 0);
          const boxHeight = subText ? 34 : 20;
          
          ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
          ctx.strokeStyle = activeBirthLocked ? 'rgba(245, 158, 11, 0.7)' : 'rgba(0, 243, 255, 0.6)';
          ctx.fillRect(p.screenX - textWidth / 2 - 8, p.screenY + labelOffsetY - 10, textWidth + 16, boxHeight);
          ctx.strokeRect(p.screenX - textWidth / 2 - 8, p.screenY + labelOffsetY - 10, textWidth + 16, boxHeight);

          ctx.fillStyle = activeBirthLocked ? '#fbbf24' : '#00f3ff';
          ctx.fillText(text, p.screenX, p.screenY + labelOffsetY + 4);
          
          if (subText) {
            ctx.font = '9px monospace';
            ctx.fillStyle = '#67e8f9';
            ctx.fillText(subText, p.screenX, p.screenY + labelOffsetY + 18);
          }
        } else if (activeBirthLocked && natalP) {
          // Minimalist Natal Birth Tag
          ctx.fillStyle = '#fde68a';
          ctx.fillText(`${p.body.name.split(' ')[0]} • ${natalP.sign.slice(0, 3)} ${Math.floor(natalP.degree)}°`, p.screenX, p.screenY + labelOffsetY);
        } else {
          // Minimalist Clean Space Label
          ctx.fillStyle = 'rgba(226, 232, 240, 0.75)';
          ctx.fillText(p.body.name.split(' ')[0], p.screenX, p.screenY + labelOffsetY);
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [
    celestialBodies,
    selectedBody,
    hoveredBody,
    isPlaying,
    timeScale,
    volumetricLightIntensity,
    showOrbitalTraces,
    showStardustField,
    showVolumetricLightShafts,
    vortexSpinSpeed,
    activeBirthLocked,
    effectiveBirthEphemeris,
  ]);

  // Handle Mouse Hover Identification of 3D Planet
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isDraggingRef.current) {
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      cameraAngleRef.current.yaw += dx * 0.005;
      cameraAngleRef.current.pitch = Math.max(0.1, Math.min(1.4, cameraAngleRef.current.pitch + dy * 0.005));
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      return;
    }

    // Check hit test against planet screen coordinates
    const cx = canvas.width / 2 + cameraAngleRef.current.panX;
    const cy = canvas.height / 2 + cameraAngleRef.current.panY;
    const pitch = cameraAngleRef.current.pitch;
    const yaw = cameraAngleRef.current.yaw;
    const zoom = cameraAngleRef.current.zoom;

    let found: CelestialBodyData | null = null;

    celestialBodies.forEach((body) => {
      const orbAngle = orbitalAnglesRef.current[body.id] || 0;
      const orbRadius = (body.orbitDistance || 120) * 1.35;
      const isSun = body.id === 'sun';
      const posX = isSun ? 0 : Math.cos(orbAngle) * orbRadius;
      const posZ = isSun ? 0 : Math.sin(orbAngle) * orbRadius;

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const x1 = posX * cosY - posZ * sinY;
      const z1 = posX * sinY + posZ * cosY;

      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const y2 = 0 - z1 * sinP;

      const sx = cx + x1 * zoom;
      const sy = cy + y2 * zoom;
      const rad = Math.max(12, (body.radius || 18) * zoom);

      if (Math.hypot(mouseX - sx, mouseY - sy) <= rad * 1.4) {
        found = body;
      }
    });

    setHoveredBody(found);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (hoveredBody) {
      handleSelect(hoveredBody);
    }
  };

  // Zoom control
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomDelta = -e.deltaY * 0.001;
    cameraAngleRef.current.zoom = Math.max(0.5, Math.min(2.5, cameraAngleRef.current.zoom + zoomDelta));
  };

  return (
    <div className="relative w-full rounded-3xl border-2 border-cyan-500/40 bg-[#010309] overflow-hidden shadow-[0_0_60px_rgba(0,243,255,0.25)] font-mono">
      {/* Top HUD Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 z-10 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 shadow-[0_0_20px_rgba(0,243,255,0.4)]">
            <Orbit className="w-6 h-6 animate-spin" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-xl font-black tracking-wider text-white">
                HYPER-REALISTIC DEEP SPACE 3D ORRERY
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-[10px] font-bold text-amber-300">
                VOLUMETRIC SCATTERING
              </span>
            </div>
            <p className="text-xs text-cyan-400/80">
              Photorealistic planetary surfaces, atmospheric Rayleigh scattering, and dynamic central star god-rays
            </p>
          </div>
        </div>

        {/* Natal Birth Status or Telemetry Pill */}
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
          {activeBirthLocked && effectiveBirthEphemeris ? (
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-black/85 border border-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.3)] backdrop-blur-md">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400 animate-ping" />
              <div className="text-xs">
                <span className="text-amber-400 block text-[9px] font-bold uppercase tracking-wider">
                  NATAL BIRTH ALIGNED • जन्म समय अलाइनमेंट
                </span>
                <span className="text-amber-100 font-black">
                  {effectiveBirthEphemeris.birthDate} ({(effectiveBirthEphemeris.birthLocation || effectiveBirthEphemeris.city || 'Birth Chart').split(',')[0]}) • Lagna {effectiveBirthEphemeris.ascendantSign || effectiveBirthEphemeris.ascendant.sign}
                </span>
              </div>
              <button
                onClick={handleOpenEphemerisModal}
                className="ml-1 p-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-400/40 cursor-pointer"
                title="Change Birth Date & Location"
              >
                <Calendar className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetBirthAlignment}
                className="p-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 cursor-pointer"
                title="Resume Real-Time Planetary Rotation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleOpenEphemerisModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-500/20 to-purple-600/20 hover:from-amber-500/30 hover:to-purple-600/30 border border-amber-400/60 text-amber-300 text-xs font-bold transition-all shadow-[0_0_15px_rgba(251,191,36,0.25)] cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>ALIGN BY BIRTH (DOB & LOCATION)</span>
            </button>
          )}

          {selectedBody && (
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-black/80 border border-cyan-400 backdrop-blur-md">
              <div 
                className="w-3.5 h-3.5 rounded-full animate-ping"
                style={{ backgroundColor: selectedBody.color || '#00f3ff' }}
              />
              <div className="text-xs">
                <span className="text-slate-400 block text-[9px]">ACTIVE TARGET</span>
                <span className="text-cyan-200 font-bold">
                  {selectedBody.name} {selectedBody.sanskritName ? `(${selectedBody.sanskritName})` : ''}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main 3D Canvas Stage */}
      <div className="relative w-full h-[540px] sm:h-[650px] cursor-grab active:cursor-grabbing select-none">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleCanvasClick}
          onWheel={handleWheel}
          className="w-full h-full block"
        />

        {/* Bottom Orbit Navigation Prompt */}
        <div className="absolute bottom-28 sm:bottom-24 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-1.5 rounded-full bg-black/60 border border-cyan-500/30 backdrop-blur-md text-[11px] text-cyan-300 flex items-center gap-2 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>Click & Drag to rotate 3D deep space viewpoint • Scroll wheel to Zoom • Click any planet to focus</span>
        </div>

        {/* Quick Planet Selector Dock */}
        <div className="absolute top-20 right-4 flex flex-col gap-1.5 z-10 max-h-[360px] overflow-y-auto no-scrollbar pointer-events-auto">
          {celestialBodies.slice(0, 10).map((b) => {
            const isSel = selectedBody?.id === b.id;
            return (
              <button
                key={b.id}
                onClick={() => handleSelect(b)}
                className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold text-left transition-all cursor-pointer flex items-center gap-2 ${
                  isSel
                    ? 'bg-cyan-500 text-black border-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.5)] font-black'
                    : 'bg-black/70 border-cyan-900/50 text-slate-300 hover:border-cyan-400 hover:text-white'
                }`}
              >
                <span 
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: b.color || '#fff' }}
                />
                <span className="truncate">{b.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* BOTTOM CONTROLS & CINEMATIC SLIDERS */}
      <div className="p-4 sm:p-6 bg-[#020716]/95 border-t border-cyan-500/30 space-y-5">
        {/* CINEMATIC PROMPT VAULT BANNER */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-amber-950/30 border border-cyan-500/40 space-y-3 shadow-[0_0_30px_rgba(0,243,255,0.15)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                <Sparkles className="w-4 h-4 animate-spin" />
              </span>
              <span className="text-xs sm:text-sm font-black tracking-wider text-cyan-200 uppercase">
                CINEMATIC VISUAL SPECIFICATION & RENDER PROMPT
              </span>
            </div>
            <button
              onClick={handleCopyPrompt}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                copiedPrompt
                  ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                  : 'bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400 text-cyan-200'
              }`}
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? 'PROMPT COPIED!' : 'COPY RENDER PROMPT'}</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-black/70 border border-cyan-900/60 font-mono text-[11px] sm:text-xs text-cyan-100 leading-relaxed italic select-all">
            "{CINEMATIC_PROMPT}"
          </div>

          {/* Quick Render Profile Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider shrink-0">
              ACTIVE RENDER PROFILE:
            </span>
            {[
              { id: 'hyper-realism', label: '🎬 Hyper-Realistic Astronomy', desc: 'NASA Surface Shader & Ray' },
              { id: 'imax-vortex', label: '✨ IMAX Stardust Vortex (4K)', desc: 'High Particle Spin & God-Rays' },
              { id: 'tesla-369', label: '⚡ Tesla 3-6-9 Harmonic Aura', desc: 'Sacred Solfeggio Flow' },
              { id: 'rayleigh-atmo', label: '🪐 Rayleigh Atmospheric Focus', desc: 'Atmosphere Halos & Shadow' },
            ].map((p) => {
              const isAct = activeRenderPreset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => applyRenderPreset(p.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isAct
                      ? 'bg-cyan-500 text-black border-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.4)] font-black'
                      : 'bg-black/60 border-cyan-900/60 text-slate-300 hover:border-cyan-400 hover:text-cyan-200'
                  }`}
                >
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 1: Time, Volumetric Lighting, Orbital Traces toggles & Camera Angles */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-900/40 pb-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'PAUSE ROTATION' : 'RESUME SIMULATION'}</span>
            </button>

            {/* Camera View Angles */}
            <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-cyan-900/50 text-xs">
              <span className="text-[10px] text-slate-400 px-2 flex items-center gap-1">
                <Camera className="w-3 h-3 text-cyan-400" /> CAMERA:
              </span>
              <button
                onClick={() => {
                  cameraAngleRef.current = { pitch: 0.48, yaw: 0.15, zoom: 1.0, panX: 0, panY: 0 };
                  try { cosmicAudio.playCyberKeystroke(); } catch {}
                }}
                className="px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 hover:text-white transition-all text-[11px] font-bold cursor-pointer"
              >
                3D Deep Vortex
              </button>
              <button
                onClick={() => {
                  cameraAngleRef.current = { pitch: 0.1, yaw: 0.8, zoom: 1.25, panX: 0, panY: 0 };
                  try { cosmicAudio.playCyberKeystroke(); } catch {}
                }}
                className="px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 hover:text-white transition-all text-[11px] font-bold cursor-pointer"
              >
                Ecliptic Edge
              </button>
              <button
                onClick={() => {
                  cameraAngleRef.current = { pitch: 1.35, yaw: 0, zoom: 0.9, panX: 0, panY: 0 };
                  try { cosmicAudio.playCyberKeystroke(); } catch {}
                }}
                className="px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 hover:text-white transition-all text-[11px] font-bold cursor-pointer"
              >
                Polar Top Swirl
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleOpenEphemerisModal}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                activeBirthLocked
                  ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.4)]'
                  : 'bg-black/60 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeBirthLocked ? '✓ Natal Aligned' : 'Natal Birth Alignment'}</span>
            </button>

            <button
              onClick={() => setShowOrbitalTraces(!showOrbitalTraces)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                showOrbitalTraces
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                  : 'bg-black/40 border-white/10 text-slate-500'
              }`}
            >
              {showOrbitalTraces ? '✓ Orbital Tracks' : 'Orbital Tracks'}
            </button>

            <button
              onClick={() => setShowVolumetricLightShafts(!showVolumetricLightShafts)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                showVolumetricLightShafts
                  ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                  : 'bg-black/40 border-white/10 text-slate-500'
              }`}
            >
              {showVolumetricLightShafts ? '✓ Sun God-Rays' : 'Sun God-Rays'}
            </button>

            <button
              onClick={() => setShowStardustField(!showStardustField)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                showStardustField
                  ? 'bg-purple-500/20 border-purple-400 text-purple-200'
                  : 'bg-black/40 border-white/10 text-slate-500'
              }`}
            >
              {showStardustField ? '✓ Stardust Vortex' : 'Stardust Vortex'}
            </button>
          </div>
        </div>

        {/* Row 2: Precision Sliders for Lighting, Orbital Speed, and Vortex Rotation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* 1. Time / Orbital Speed */}
          <div className="p-3.5 rounded-2xl bg-black/60 border border-cyan-900/50 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <Orbit className="w-3.5 h-3.5" />
                Orbital Velocity (Keplerian)
              </span>
              <span className="font-bold text-cyan-300">{timeScale.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="4.0"
              step="0.05"
              value={timeScale}
              onChange={(e) => setTimeScale(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono">
              <span>Real-Time (Slow)</span>
              <span>1.0x Nominal</span>
              <span>Fast-Forward (4.0x)</span>
            </div>
          </div>

          {/* 2. Volumetric Solar Intensity */}
          <div className="p-3.5 rounded-2xl bg-black/60 border border-cyan-900/50 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                Volumetric Solar Radiation
              </span>
              <span className="font-bold text-amber-300">{volumetricLightIntensity.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.4"
              max="2.5"
              step="0.05"
              value={volumetricLightIntensity}
              onChange={(e) => setVolumetricLightIntensity(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono">
              <span>Subtle Atmospheric</span>
              <span>Photorealistic</span>
              <span>Hyper-Luminous</span>
            </div>
          </div>

          {/* 3. Deep Space Vortex Swirl Dynamics */}
          <div className="p-3.5 rounded-2xl bg-black/60 border border-cyan-900/50 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5 text-purple-300">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Deep Space Stardust Vortex
              </span>
              <span className="font-bold text-purple-300">{vortexSpinSpeed.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.5"
              step="0.05"
              value={vortexSpinSpeed}
              onChange={(e) => setVortexSpinSpeed(parseFloat(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono">
              <span>Gentle Drift</span>
              <span>Galactic Spiral</span>
              <span>Quantum Surge</span>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Birth Ephemeris Modal */}
      {localEphemerisModalOpen && (
        <BirthPlanetaryEphemerisModal
          onClose={() => setLocalEphemerisModalOpen(false)}
          onApplyEphemeris={handleApplyLocalEphemeris}
          initialData={effectiveBirthEphemeris || undefined}
        />
      )}
    </div>
  );
};
