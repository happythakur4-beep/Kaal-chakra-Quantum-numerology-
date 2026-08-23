import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import {
  Zap,
  Sparkles,
  Activity,
  Sliders,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  RefreshCw,
  Compass,
  Layers,
  HelpCircle,
  Eye,
  EyeOff,
  Radio,
  Atom,
  Cpu,
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface VortexMathOverlayD3Props {
  /** Whether the overlay is active */
  isOpen?: boolean;
  /** Callback to close or toggle */
  onToggle?: () => void;
  /** Initial mode: 'ambient-hud' (semi-transparent overlay) or 'cyber-lab' (interactive dashboard) */
  initialDisplayMode?: 'ambient-hud' | 'cyber-lab';
  /** Global classname */
  className?: string;
  /** Allow pointer clicks through in ambient HUD mode */
  interactiveInAmbient?: boolean;
}

type VortexPatternMode = 'doubling-circuit' | 'modular-torus' | 'rodin-toroid' | 'trinity-369';

interface VortexNode {
  digit: number;
  label: string;
  angle: number; // in radians
  x: number;
  y: number;
  freqHz: number;
  solfeggioName: string;
  is369: boolean;
  chakra: string;
}

export const VortexMathOverlayD3: React.FC<VortexMathOverlayD3Props> = ({
  isOpen = true,
  onToggle,
  initialDisplayMode = 'ambient-hud',
  className = '',
  interactiveInAmbient = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Display and control states
  const [displayMode, setDisplayMode] = useState<'ambient-hud' | 'cyber-lab'>(initialDisplayMode);
  const [patternMode, setPatternMode] = useState<VortexPatternMode>('doubling-circuit');
  const [isVisible, setIsVisible] = useState(true);
  
  // Interactive Math Parameters
  const [multiplier, setMultiplier] = useState<number>(2); // Multiplier for modulo math (2 = doubling/cardioid, 3 = nephroid, etc)
  const [nodeCount, setNodeCount] = useState<number>(9); // 9 for pure Tesla, or 18, 36, 72 for high-density
  const [mouseWarpIntensity, setMouseWarpIntensity] = useState<number>(0.45); // How strongly mouse deflects curves
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.3); // Auto-rotation speed
  const [glowIntensity, setGlowIntensity] = useState<number>(0.8);
  const [hudOpacity, setHudOpacity] = useState<number>(0.75);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isMouseDrivingMultiplier, setIsMouseDrivingMultiplier] = useState<boolean>(false);
  const [activeHoverNode, setActiveHoverNode] = useState<VortexNode | null>(null);

  // Mouse telemetry for HUD readout
  const [mouseTelemetry, setMouseTelemetry] = useState<{
    x: number;
    y: number;
    normX: number;
    normY: number;
    radius: number;
    angleDeg: number;
    activeFlux: string;
  }>({
    x: 0,
    y: 0,
    normX: 0,
    normY: 0,
    radius: 0,
    angleDeg: 0,
    activeFlux: 'EQUILIBRIUM',
  });

  // Keep mouse target ref for smooth lerping
  const mousePosRef = useRef<{ x: number; y: number; smoothX: number; smoothY: number; inside: boolean }>({
    x: 0,
    y: 0,
    smoothX: 0,
    smoothY: 0,
    inside: false,
  });

  // Sound throttle ref
  const lastSoundPlayRef = useRef<number>(0);

  // Pre-calculate the 9 Fundamental Tesla Vortex Nodes
  const baseNodes: VortexNode[] = useMemo(() => {
    const freqs: Record<number, { hz: number; name: string; is369: boolean; chakra: string }> = {
      1: { hz: 174, name: 'Foundation / Physical Base', is369: false, chakra: 'Muladhara Sub-Harmonic' },
      2: { hz: 285, name: 'Cognitive Blueprint', is369: false, chakra: 'Bio-Field Template' },
      3: { hz: 396, name: 'Liberation / Prana Inflow', is369: true, chakra: 'Root / Magnetic Pole (-)' },
      4: { hz: 417, name: 'Facilitating Change', is369: false, chakra: 'Sacral / Vital Seed' },
      5: { hz: 528, name: 'Transformation & DNA Repair', is369: false, chakra: 'Solar Plexus / Cellular' },
      6: { hz: 639, name: 'Harmonious Connection', is369: true, chakra: 'Heart / Magnetic Pole (+)' },
      7: { hz: 741, name: 'Intuition & Awakening', is369: false, chakra: 'Throat / Expression' },
      8: { hz: 852, name: 'Spiritual Order & Pineal', is369: false, chakra: 'Third Eye / Calcite' },
      9: { hz: 963, name: 'Crown / Divine Singularity', is369: true, chakra: 'Sahasrara / Non-Physical Apex' },
    };

    return Array.from({ length: 9 }, (_, i) => {
      const digit = i + 1;
      // Position 9 at top (angle -PI/2)
      // Step around circle clockwise: (i * 2*PI / 9) - PI/2
      // For standard vortex: 9 is top, 1 is top-right, 2 is right, etc.
      // Index mapping: 9 is index 8 (top). Let digit 9 be index 0 or placed top.
      // Convention: 9 is at 12 o'clock, 1 at ~1:20, 2 at ~2:40, 3 at ~4 o'clock, 4 at ~5:20, 5 at ~6:40, 6 at ~8 o'clock, 7 at ~9:20, 8 at ~10:40.
      const angle = (digit * (2 * Math.PI) / 9) - (Math.PI / 2);
      return {
        digit,
        label: digit.toString(),
        angle,
        x: 0,
        y: 0,
        freqHz: freqs[digit].hz,
        solfeggioName: freqs[digit].name,
        is369: freqs[digit].is369,
        chakra: freqs[digit].chakra,
      };
    });
  }, []);

  // Play node tone safely
  const triggerNodeSound = useCallback((node: VortexNode) => {
    if (!soundEnabled) return;
    const now = Date.now();
    if (now - lastSoundPlayRef.current < 250) return; // Debounce
    lastSoundPlayRef.current = now;

    if (node.is369) {
      cosmicAudio.playTeslaFrequency(node.freqHz, 2.5);
    } else {
      cosmicAudio.playTeslaFrequency(node.freqHz, 1.2);
    }
  }, [soundEnabled]);

  // Global mouse move tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mousePosRef.current.x = x;
      mousePosRef.current.y = y;
      mousePosRef.current.inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      // Calculate telemetry
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = x - cx;
      const dy = y - cy;
      const radius = Math.sqrt(dx * dx + dy * dy);
      let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
      if (angleDeg < 0) angleDeg += 360;

      // Determine active flux sector
      let fluxSector = '3D MATERIAL MATRIX (1-2-4-8-7-5)';
      if (radius < 80) {
        fluxSector = 'SINGULARITY CORE (9 APEX)';
      } else if (angleDeg > 100 && angleDeg < 140) {
        fluxSector = 'ETHERIC POLARITY (+6 POSITIVE FLUX)';
      } else if (angleDeg > 220 && angleDeg < 260) {
        fluxSector = 'ETHERIC POLARITY (-3 NEGATIVE FLUX)';
      } else if (angleDeg > 260 && angleDeg < 280) {
        fluxSector = 'SOURCE MASTER (9 NON-PHYSICAL)';
      }

      setMouseTelemetry({
        x: Math.round(x),
        y: Math.round(y),
        normX: Number((dx / (rect.width / 2)).toFixed(3)),
        normY: Number((dy / (rect.height / 2)).toFixed(3)),
        radius: Math.round(radius),
        angleDeg: Math.round(angleDeg),
        activeFlux: fluxSector,
      });

      // If mouse-driving multiplier is enabled:
      if (isMouseDrivingMultiplier && rect.width > 0) {
        const dynamicM = 1 + (x / rect.width) * 8; // 1 to 9
        setMultiplier(Number(dynamicM.toFixed(2)));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMouseDrivingMultiplier]);

  // Main D3 Rendering Engine with RAF Loop
  useEffect(() => {
    const svgElement = svgRef.current;
    const container = containerRef.current;
    if (!svgElement || !container || !isVisible) return;

    let animId: number;
    let time = 0;

    const svg = d3.select(svgElement);
    svg.selectAll('*').remove();

    // Create defs for gradients and glow filters
    const defs = svg.append('defs');

    // Glow Filter
    const filter = defs.append('filter')
      .attr('id', 'vortex-glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    filter.append('feGaussianBlur')
      .attr('stdDeviation', 4 * glowIntensity)
      .attr('result', 'coloredBlur');

    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Intense Gold Glow for 3-6-9
    const goldFilter = defs.append('filter')
      .attr('id', 'gold-vortex-glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    goldFilter.append('feGaussianBlur')
      .attr('stdDeviation', 6 * glowIntensity)
      .attr('result', 'coloredBlur');

    const goldMerge = goldFilter.append('feMerge');
    goldMerge.append('feMergeNode').attr('in', 'coloredBlur');
    goldMerge.append('feMergeNode').attr('in', 'coloredBlur');
    goldMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Linear Gradients
    const cyanAmberGrad = defs.append('linearGradient')
      .attr('id', 'cyan-amber-flow')
      .attr('gradientUnits', 'userSpaceOnUse');
    cyanAmberGrad.append('stop').attr('offset', '0%').attr('stop-color', '#00f3ff').attr('stop-opacity', 0.9);
    cyanAmberGrad.append('stop').attr('offset', '50%').attr('stop-color', '#10b981').attr('stop-opacity', 0.7);
    cyanAmberGrad.append('stop').attr('offset', '100%').attr('stop-color', '#fbbf24').attr('stop-opacity', 0.95);

    const goldGrad = defs.append('linearGradient')
      .attr('id', 'tesla-369-gold')
      .attr('gradientUnits', 'userSpaceOnUse');
    goldGrad.append('stop').attr('offset', '0%').attr('stop-color', '#f59e0b');
    goldGrad.append('stop').attr('offset', '50%').attr('stop-color', '#fbbf24');
    goldGrad.append('stop').attr('offset', '100%').attr('stop-color', '#f43f5e');

    // Main Canvas Groups
    const mainGroup = svg.append('g').attr('class', 'vortex-main-group');
    const backgroundRingsGroup = mainGroup.append('g').attr('class', 'background-rings');
    const vectorsGroup = mainGroup.append('g').attr('class', 'flux-vectors');
    const dynamicCurvesGroup = mainGroup.append('g').attr('class', 'dynamic-curves');
    const particleFlowGroup = mainGroup.append('g').attr('class', 'particle-flows');
    const nodesGroup = mainGroup.append('g').attr('class', 'vortex-nodes');
    const cursorFollowerGroup = svg.append('g').attr('class', 'cursor-reticle');

    // Particle flow pool
    const particleCount = 24;
    const particles = Array.from({ length: particleCount }, (_, idx) => ({
      id: idx,
      progress: (idx / particleCount),
      speed: 0.003 + (idx % 3) * 0.0015,
      is369: idx % 3 === 0,
    }));

    // Animation Loop
    const render = () => {
      time += 0.016 * rotationSpeed;
      
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      svg.attr('width', width).attr('height', height);

      const cx = width / 2;
      const cy = height / 2;
      const mainRadius = Math.min(width, height) * 0.38;

      // Smooth mouse coordinates with inertia
      const mouse = mousePosRef.current;
      if (mouse.x === 0 && mouse.y === 0) {
        mouse.x = cx;
        mouse.y = cy;
      }
      mouse.smoothX += (mouse.x - mouse.smoothX) * 0.08;
      mouse.smoothY += (mouse.y - mouse.smoothY) * 0.08;

      const mouseOffsetFromCenter = {
        x: mouse.smoothX - cx,
        y: mouse.smoothY - cy,
      };

      mainGroup.attr('transform', `translate(${cx}, ${cy})`);

      // 1. DYNAMIC BACKGROUND CONCENTRIC TORUS RINGS & RETICLES
      backgroundRingsGroup.selectAll('*').remove();

      // Outer Ticker Ring
      backgroundRingsGroup.append('circle')
        .attr('r', mainRadius * 1.14)
        .attr('fill', 'none')
        .attr('stroke', '#00f3ff')
        .attr('stroke-width', 0.8)
        .attr('stroke-opacity', 0.25)
        .attr('stroke-dasharray', '3,6');

      // Main Outer Modulo Ring
      backgroundRingsGroup.append('circle')
        .attr('r', mainRadius)
        .attr('fill', 'rgba(3, 7, 18, 0.4)')
        .attr('stroke', '#00f3ff')
        .attr('stroke-width', 1.5)
        .attr('stroke-opacity', 0.6)
        .attr('filter', 'url(#vortex-glow)');

      // Inner 3-6-9 Resonant Ring
      backgroundRingsGroup.append('circle')
        .attr('r', mainRadius * 0.618) // Phi Golden Ratio Inner Ring
        .attr('fill', 'none')
        .attr('stroke', '#f59e0b')
        .attr('stroke-width', 1.2)
        .attr('stroke-opacity', 0.4)
        .attr('stroke-dasharray', '8,4');

      // Central Singularity Node
      backgroundRingsGroup.append('circle')
        .attr('r', 12 + Math.sin(time * 3) * 3)
        .attr('fill', 'url(#tesla-369-gold)')
        .attr('opacity', 0.8)
        .attr('filter', 'url(#gold-vortex-glow)');

      // Compass Radials (9 rays)
      for (let i = 0; i < 9; i++) {
        const radAngle = (i * 2 * Math.PI) / 9 - Math.PI / 2;
        const rx = Math.cos(radAngle) * mainRadius;
        const ry = Math.sin(radAngle) * mainRadius;

        backgroundRingsGroup.append('line')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', rx)
          .attr('y2', ry)
          .attr('stroke', (i + 1) % 3 === 0 ? '#f59e0b' : '#00f3ff')
          .attr('stroke-width', (i + 1) % 3 === 0 ? 1 : 0.6)
          .attr('stroke-opacity', (i + 1) % 3 === 0 ? 0.35 : 0.15)
          .attr('stroke-dasharray', (i + 1) % 3 === 0 ? '4,4' : '2,8');
      }

      // 2. COMPUTE DYNAMIC NODE POSITIONS (WITH WARP GRAVITY FROM MOUSE)
      const currentNodes = Array.from({ length: nodeCount }, (_, i) => {
        const digit = i + 1;
        const baseAngle = (digit * (2 * Math.PI) / nodeCount) - (Math.PI / 2);
        
        // Dynamic angle with subtle breathing
        const dynAngle = baseAngle + Math.sin(time * 0.5 + i) * 0.015;
        let nx = Math.cos(dynAngle) * mainRadius;
        let ny = Math.sin(dynAngle) * mainRadius;

        // Calculate distance from node to mouse (in centered coords)
        const dxNode = nx - mouseOffsetFromCenter.x;
        const dyNode = ny - mouseOffsetFromCenter.y;
        const distToMouse = Math.sqrt(dxNode * dxNode + dyNode * dyNode);

        // Apply magnetic pull toward mouse
        if (mouseWarpIntensity > 0 && distToMouse < mainRadius * 1.5) {
          const pull = (1 - (distToMouse / (mainRadius * 1.5))) * 35 * mouseWarpIntensity;
          nx -= (dxNode / (distToMouse || 1)) * pull;
          ny -= (dyNode / (distToMouse || 1)) * pull;
        }

        const is369 = nodeCount === 9 ? (digit % 3 === 0) : ((digit % Math.round(nodeCount / 3)) === 0);

        return {
          digit,
          label: digit.toString(),
          angle: dynAngle,
          x: nx,
          y: ny,
          distToMouse,
          is369,
        };
      });

      // 3. RENDER VORTEX PATHWAYS & CURVES ACCORDING TO PATTERN MODE
      dynamicCurvesGroup.selectAll('*').remove();
      vectorsGroup.selectAll('*').remove();

      // Mouse control offset for Bezier midpoints
      const warpControlX = mouseOffsetFromCenter.x * mouseWarpIntensity * 0.6;
      const warpControlY = mouseOffsetFromCenter.y * mouseWarpIntensity * 0.6;

      if (patternMode === 'doubling-circuit' || patternMode === 'trinity-369') {
        // TESLA 1-2-4-8-7-5 DOUBLING CIRCUIT (PHYSICAL MATTER / 3D WORLD)
        const doublingOrder = [1, 2, 4, 8, 7, 5];
        
        // Draw 1-2-4-8-7-5 Infinite Loop with D3 Curves
        for (let idx = 0; idx < doublingOrder.length; idx++) {
          const fromDigit = doublingOrder[idx];
          const toDigit = doublingOrder[(idx + 1) % doublingOrder.length];

          const n1 = currentNodes.find(n => n.digit === fromDigit);
          const n2 = currentNodes.find(n => n.digit === toDigit);

          if (n1 && n2) {
            // Cubic Bezier curve bent through center with mouse warp
            const midX = ((n1.x + n2.x) / 2) * 0.45 + warpControlX;
            const midY = ((n1.y + n2.y) / 2) * 0.45 + warpControlY;

            const pathD = `M ${n1.x} ${n1.y} Q ${midX} ${midY} ${n2.x} ${n2.y}`;

            dynamicCurvesGroup.append('path')
              .attr('d', pathD)
              .attr('fill', 'none')
              .attr('stroke', '#00f3ff')
              .attr('stroke-width', 2.2)
              .attr('stroke-opacity', 0.8)
              .attr('filter', 'url(#vortex-glow)');

            // Secondary subtle background glow path
            dynamicCurvesGroup.append('path')
              .attr('d', pathD)
              .attr('fill', 'none')
              .attr('stroke', '#10b981')
              .attr('stroke-width', 1.0)
              .attr('stroke-opacity', 0.5)
              .attr('stroke-dasharray', '6,4');
          }
        }

        // 3-6-9 ETHERIC TRIANGLE & NON-PHYSICAL VORTEX FLUX
        const n3 = currentNodes.find(n => n.digit === 3);
        const n6 = currentNodes.find(n => n.digit === 6);
        const n9 = currentNodes.find(n => n.digit === 9);

        if (n3 && n6 && n9) {
          // 3 <-> 6 Bilateral Oscillation Line
          const mid36X = ((n3.x + n6.x) / 2) * 0.5 + warpControlX * 0.8;
          const mid36Y = ((n3.y + n6.y) / 2) * 0.5 + warpControlY * 0.8;
          const path36 = `M ${n3.x} ${n3.y} Q ${mid36X} ${mid36Y} ${n6.x} ${n6.y}`;

          dynamicCurvesGroup.append('path')
            .attr('d', path36)
            .attr('fill', 'none')
            .attr('stroke', '#f59e0b')
            .attr('stroke-width', 3)
            .attr('stroke-opacity', 0.9)
            .attr('filter', 'url(#gold-vortex-glow)');

          // 9 -> 3 and 9 -> 6 Vector Radiations
          const path93 = `M ${n9.x} ${n9.y} Q ${((n9.x + n3.x) / 2) * 0.6 + warpControlX} ${((n9.y + n3.y) / 2) * 0.6 + warpControlY} ${n3.x} ${n3.y}`;
          const path96 = `M ${n9.x} ${n9.y} Q ${((n9.x + n6.x) / 2) * 0.6 + warpControlX} ${((n9.y + n6.y) / 2) * 0.6 + warpControlY} ${n6.x} ${n6.y}`;

          dynamicCurvesGroup.append('path')
            .attr('d', path93)
            .attr('fill', 'none')
            .attr('stroke', '#fbbf24')
            .attr('stroke-width', 2.5)
            .attr('stroke-opacity', 0.85)
            .attr('filter', 'url(#gold-vortex-glow)')
            .attr('stroke-dasharray', '8,4');

          dynamicCurvesGroup.append('path')
            .attr('d', path96)
            .attr('fill', 'none')
            .attr('stroke', '#fbbf24')
            .attr('stroke-width', 2.5)
            .attr('stroke-opacity', 0.85)
            .attr('filter', 'url(#gold-vortex-glow)')
            .attr('stroke-dasharray', '8,4');

          // Shaded 3-6-9 Sacred Trinity Field
          const triD = `M ${n9.x} ${n9.y} L ${n3.x} ${n3.y} L ${n6.x} ${n6.y} Z`;
          dynamicCurvesGroup.append('path')
            .attr('d', triD)
            .attr('fill', 'rgba(245, 158, 11, 0.08)')
            .attr('stroke', '#f59e0b')
            .attr('stroke-width', 0.8)
            .attr('stroke-opacity', 0.4);
        }
      } else if (patternMode === 'modular-torus') {
        // MODULAR MULTIPLICATION CIRCLE (Cardioids, Nephroids, Modulo Geometry)
        const M = multiplier;
        const N = nodeCount;

        for (let i = 1; i <= N; i++) {
          const targetIndex = Math.round((i * M) % N) || N;
          const fromNode = currentNodes.find(n => n.digit === i);
          const toNode = currentNodes.find(n => n.digit === targetIndex);

          if (fromNode && toNode && i !== targetIndex) {
            // Bezier arc curved with mouse warp
            const midX = ((fromNode.x + toNode.x) / 2) * 0.55 + warpControlX * 0.7;
            const midY = ((fromNode.y + toNode.y) / 2) * 0.55 + warpControlY * 0.7;

            const pathD = `M ${fromNode.x} ${fromNode.y} Q ${midX} ${midY} ${toNode.x} ${toNode.y}`;

            const isSpecial369 = (i % 3 === 0) || (targetIndex % 3 === 0);

            dynamicCurvesGroup.append('path')
              .attr('d', pathD)
              .attr('fill', 'none')
              .attr('stroke', isSpecial369 ? '#fbbf24' : '#00f3ff')
              .attr('stroke-width', isSpecial369 ? 1.8 : 1.1)
              .attr('stroke-opacity', isSpecial369 ? 0.85 : 0.55)
              .attr('filter', isSpecial369 ? 'url(#gold-vortex-glow)' : 'url(#vortex-glow)');
          }
        }
      } else if (patternMode === 'rodin-toroid') {
        // RODIN COIL HYPER-DIMENSIONAL TORUS FLOW FIELD
        const torusRings = 7;
        for (let r = 1; r <= torusRings; r++) {
          const ringRad = (mainRadius / torusRings) * r;
          const tiltX = warpControlX * (r / torusRings) * 0.8;
          const tiltY = warpControlY * (r / torusRings) * 0.8;

          dynamicCurvesGroup.append('ellipse')
            .attr('cx', tiltX)
            .attr('cy', tiltY)
            .attr('rx', ringRad)
            .attr('ry', ringRad * (0.6 + Math.sin(time + r) * 0.1))
            .attr('fill', 'none')
            .attr('stroke', r % 2 === 0 ? '#00f3ff' : '#f59e0b')
            .attr('stroke-width', 1.2)
            .attr('stroke-opacity', 0.45)
            .attr('stroke-dasharray', r % 3 === 0 ? '5,5' : 'none');
        }
      }

      // 4. ANIMATED QUANTUM ENERGY PARTICLES STREAMING THROUGH CIRCUITS
      particleFlowGroup.selectAll('*').remove();

      if (patternMode === 'doubling-circuit' || patternMode === 'trinity-369') {
        const doublingOrder = [1, 2, 4, 8, 7, 5];

        particles.forEach((p) => {
          p.progress = (p.progress + p.speed) % 1.0;
          
          if (!p.is369) {
            // Particle moves along 1-2-4-8-7-5 loop
            const totalSegments = doublingOrder.length;
            const floatIdx = p.progress * totalSegments;
            const segmentIdx = Math.floor(floatIdx);
            const segProgress = floatIdx - segmentIdx;

            const d1 = doublingOrder[segmentIdx];
            const d2 = doublingOrder[(segmentIdx + 1) % totalSegments];

            const n1 = currentNodes.find(n => n.digit === d1);
            const n2 = currentNodes.find(n => n.digit === d2);

            if (n1 && n2) {
              const midX = ((n1.x + n2.x) / 2) * 0.45 + warpControlX;
              const midY = ((n1.y + n2.y) / 2) * 0.45 + warpControlY;

              // Quadratic Bezier interpolation: B(t) = (1-t)^2 P0 + 2(1-t)t P1 + t^2 P2
              const t = segProgress;
              const px = (1 - t) * (1 - t) * n1.x + 2 * (1 - t) * t * midX + t * t * n2.x;
              const py = (1 - t) * (1 - t) * n1.y + 2 * (1 - t) * t * midY + t * t * n2.y;

              particleFlowGroup.append('circle')
                .attr('cx', px)
                .attr('cy', py)
                .attr('r', 3.5)
                .attr('fill', '#00f3ff')
                .attr('filter', 'url(#vortex-glow)');
            }
          } else {
            // Particle moves along 3 <-> 6 or 9 non-physical flux
            const n3 = currentNodes.find(n => n.digit === 3);
            const n6 = currentNodes.find(n => n.digit === 6);
            const n9 = currentNodes.find(n => n.digit === 9);

            if (n3 && n6 && n9) {
              const triT = (Math.sin(time * 3 + p.id) + 1) / 2; // 0 to 1 back and forth
              const px = n3.x + (n6.x - n3.x) * triT;
              const py = n3.y + (n6.y - n3.y) * triT;

              particleFlowGroup.append('circle')
                .attr('cx', px)
                .attr('cy', py)
                .attr('r', 4.5)
                .attr('fill', '#fbbf24')
                .attr('filter', 'url(#gold-vortex-glow)');
            }
          }
        });
      }

      // 5. RENDER THE 9 VORTEX NODES WITH HOVER BEACONS
      nodesGroup.selectAll('*').remove();

      currentNodes.forEach((node) => {
        const isHovered = activeHoverNode?.digit === node.digit || node.distToMouse < 35;
        const nodeG = nodesGroup.append('g')
          .attr('transform', `translate(${node.x}, ${node.y})`)
          .style('cursor', 'pointer');

        // Outer pulsing aura on hover or 3-6-9
        if (node.is369 || isHovered) {
          nodeG.append('circle')
            .attr('r', isHovered ? 28 : (node.is369 ? 22 : 16))
            .attr('fill', node.is369 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(0, 243, 255, 0.15)')
            .attr('stroke', node.is369 ? '#fbbf24' : '#00f3ff')
            .attr('stroke-width', 1.2)
            .attr('stroke-dasharray', '3,3')
            .attr('filter', node.is369 ? 'url(#gold-vortex-glow)' : 'url(#vortex-glow)');
        }

        // Main Node Core Circle
        nodeG.append('circle')
          .attr('r', node.is369 ? 15 : 12)
          .attr('fill', node.is369 ? '#050914' : '#020617')
          .attr('stroke', node.is369 ? '#fbbf24' : '#00f3ff')
          .attr('stroke-width', node.is369 ? 2.5 : 1.8)
          .attr('filter', node.is369 ? 'url(#gold-vortex-glow)' : 'url(#vortex-glow)');

        // Digit Label
        nodeG.append('text')
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'central')
          .attr('fill', node.is369 ? '#fbbf24' : '#00f3ff')
          .attr('font-size', node.is369 ? '13px' : '11px')
          .attr('font-family', 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace')
          .attr('font-weight', 'bold')
          .text(node.label);

        // Interaction event handlers on node
        nodeG.on('mouseenter', () => {
          const matchBase = baseNodes.find(b => b.digit === node.digit);
          if (matchBase) {
            setActiveHoverNode(matchBase);
            triggerNodeSound(matchBase);
          }
        });
      });

      // 6. CURSOR RETICLE & FLUX VECTOR POINTER
      cursorFollowerGroup.selectAll('*').remove();

      if (mouse.inside && mouseWarpIntensity > 0) {
        const curG = cursorFollowerGroup.append('g')
          .attr('transform', `translate(${mouse.x}, ${mouse.y})`);

        // Crosshairs
        curG.append('circle')
          .attr('r', 18)
          .attr('fill', 'none')
          .attr('stroke', '#00f3ff')
          .attr('stroke-width', 1.2)
          .attr('stroke-dasharray', '4,4')
          .attr('opacity', 0.7);

        curG.append('circle')
          .attr('r', 3)
          .attr('fill', '#fbbf24');

        curG.append('line')
          .attr('x1', -24).attr('y1', 0).attr('x2', 24).attr('y2', 0)
          .attr('stroke', '#00f3ff').attr('stroke-width', 0.8).attr('opacity', 0.5);

        curG.append('line')
          .attr('x1', 0).attr('y1', -24).attr('x2', 0).attr('y2', 24)
          .attr('stroke', '#00f3ff').attr('stroke-width', 0.8).attr('opacity', 0.5);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [
    isVisible,
    multiplier,
    nodeCount,
    patternMode,
    mouseWarpIntensity,
    rotationSpeed,
    glowIntensity,
    activeHoverNode,
    baseNodes,
    triggerNodeSound
  ]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-30 transition-all duration-300 select-none overflow-hidden ${
        displayMode === 'ambient-hud' && !interactiveInAmbient
          ? 'pointer-events-none'
          : 'pointer-events-auto'
      } ${className}`}
      style={{ opacity: isVisible ? hudOpacity : 0 }}
    >
      {/* D3 SVG Canvas Layer */}
      <svg
        ref={svgRef}
        className="w-full h-full block"
        style={{
          background: displayMode === 'cyber-lab' ? 'radial-gradient(circle at center, rgba(2,6,23,0.85) 0%, rgba(1,4,9,0.98) 100%)' : 'transparent',
        }}
      />

      {/* TOP FLOATING CYBER HUD CONTROL BAR (Always clickable) */}
      <div className="pointer-events-auto absolute top-16 sm:top-20 right-3 sm:right-6 z-40 flex flex-col items-end gap-2 font-mono text-xs">
        {/* Toggle HUD/Lab Button */}
        <div className="flex items-center gap-1.5 p-1 bg-[#050b18]/90 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-[0_0_25px_rgba(0,243,255,0.2)]">
          <button
            onClick={() => {
              cosmicAudio.playCyberKeystroke();
              setIsVisible(!isVisible);
            }}
            className={`p-1.5 rounded-lg border text-xs font-bold transition-all ${
              isVisible
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                : 'bg-black/60 border-cyan-900 text-cyan-700'
            }`}
            title="Toggle Vortex Math Overlay Visibility"
          >
            {isVisible ? <Eye className="w-4 h-4 text-cyan-400" /> : <EyeOff className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              cosmicAudio.playCyberKeystroke();
              setDisplayMode(displayMode === 'ambient-hud' ? 'cyber-lab' : 'ambient-hud');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all uppercase tracking-wider ${
              displayMode === 'cyber-lab'
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                : 'bg-cyan-950/60 border-cyan-700/50 text-cyan-300 hover:bg-cyan-900/60'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>{displayMode === 'cyber-lab' ? 'CYBER LAB: EXPANDED' : 'VORTEX MATH: HUD'}</span>
          </button>

          {onToggle && (
            <button
              onClick={onToggle}
              className="p-1.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 rounded-lg"
              title="Close Overlay"
            >
              ✕
            </button>
          )}
        </div>

        {/* Mini Real-time Telemetry Badge */}
        {isVisible && (
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-[#030712]/80 backdrop-blur-md border border-cyan-500/20 rounded-lg text-[10px] text-cyan-400 shadow-md">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>MOUSE: [{mouseTelemetry.normX}, {mouseTelemetry.normY}]</span>
            </div>
            <div className="text-amber-400">θ: {mouseTelemetry.angleDeg}°</div>
            <div className="text-cyan-300">MOD: {multiplier}x</div>
          </div>
        )}
      </div>

      {/* EXPANDED INTERACTIVE CYBER LAB CONTROL PANEL (When in 'cyber-lab' mode) */}
      <AnimatePresence>
        {displayMode === 'cyber-lab' && isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="pointer-events-auto absolute bottom-4 left-3 sm:left-6 max-w-md w-full bg-[#050b18]/95 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-4 sm:p-5 text-cyan-100 font-mono text-xs shadow-[0_0_40px_rgba(0,243,255,0.25)] space-y-4 max-h-[80vh] overflow-y-auto"
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
                <div>
                  <h3 className="font-extrabold text-sm tracking-wider text-cyan-100">
                    VORTEX MATH ENGINE (D3.JS)
                  </h3>
                  <div className="text-[10px] text-cyan-400">
                    NIKOLA TESLA 3-6-9 & MARKO RODIN COIL DYNAMICS
                  </div>
                </div>
              </div>
              <button
                onClick={() => setDisplayMode('ambient-hud')}
                className="text-cyan-400 hover:text-white p-1 rounded hover:bg-cyan-900/40"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Pattern Mode Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider">
                MATHEMATICAL TOPOLOGY MODE:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'doubling-circuit', label: '1-2-4-8-7-5 Doubling', icon: Atom },
                  { id: 'trinity-369', label: '3-6-9 Sacred Triad', icon: Zap },
                  { id: 'modular-torus', label: 'Modulo Multiplication', icon: RefreshCw },
                  { id: 'rodin-toroid', label: 'Rodin Torus Field', icon: Flame },
                ].map((mode) => {
                  const Icon = mode.icon;
                  const isSel = patternMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => {
                        cosmicAudio.playCyberKeystroke();
                        setPatternMode(mode.id as VortexPatternMode);
                      }}
                      className={`flex items-center gap-1.5 p-2 rounded-lg border text-[11px] font-bold text-left transition-all ${
                        isSel
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-100 shadow-[0_0_15px_rgba(0,243,255,0.25)]'
                          : 'bg-black/40 border-cyan-900/50 text-cyan-400/80 hover:bg-cyan-950/50'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isSel ? 'text-amber-400' : 'text-cyan-500'}`} />
                      <span className="truncate">{mode.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Multiplier Presets */}
            {patternMode === 'modular-torus' && (
              <div className="space-y-2 p-3 bg-black/40 border border-cyan-900/50 rounded-xl">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-cyan-300 font-bold">MULTIPLIER (M): {multiplier}x</span>
                  <button
                    onClick={() => {
                      cosmicAudio.playCyberKeystroke();
                      setIsMouseDrivingMultiplier(!isMouseDrivingMultiplier);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
                      isMouseDrivingMultiplier
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 animate-pulse'
                        : 'bg-cyan-950/40 border-cyan-800 text-cyan-400'
                    }`}
                  >
                    {isMouseDrivingMultiplier ? 'MOUSE-DRIVEN: ON' : 'MOUSE-DRIVEN: OFF'}
                  </button>
                </div>
                <input
                  type="range"
                  min="1"
                  max="9"
                  step="0.1"
                  value={multiplier}
                  onChange={(e) => setMultiplier(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                  {[
                    { label: 'Cardioid (2x)', m: 2 },
                    { label: 'Nephroid (3x)', m: 3 },
                    { label: 'Trefoil (4x)', m: 4 },
                    { label: 'Flower (7x)', m: 7 },
                    { label: 'Singularity (9x)', m: 9 },
                    { label: 'Phi (1.618x)', m: 1.62 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        cosmicAudio.playCyberKeystroke();
                        setMultiplier(preset.m);
                      }}
                      className="px-2 py-1 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-800/60 text-cyan-300 rounded text-[10px] whitespace-nowrap"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Physics & Gravitational Warp Sliders */}
            <div className="space-y-3 p-3 bg-black/40 border border-cyan-900/50 rounded-xl text-[11px]">
              <div className="space-y-1">
                <div className="flex justify-between text-cyan-300">
                  <span>MOUSE GRAVITATIONAL WARP:</span>
                  <span className="text-amber-400 font-bold">{Math.round(mouseWarpIntensity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={mouseWarpIntensity}
                  onChange={(e) => setMouseWarpIntensity(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-cyan-300">
                  <span>VORTEX ROTATION / BREATHING:</span>
                  <span className="text-cyan-400 font-bold">{rotationSpeed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1.5"
                  step="0.1"
                  value={rotationSpeed}
                  onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-cyan-300">
                  <span>CYBER GLOW & D3 BLOOM:</span>
                  <span className="text-cyan-400 font-bold">{Math.round(glowIntensity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1.5"
                  step="0.1"
                  value={glowIntensity}
                  onChange={(e) => setGlowIntensity(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Active Node Telemetry Dossier */}
            {activeHoverNode ? (
              <div className="p-3 bg-cyan-950/40 border border-cyan-400/50 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 text-sm">
                    NODE #{activeHoverNode.digit} :: {activeHoverNode.freqHz} HZ
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                    {activeHoverNode.is369 ? 'NON-PHYSICAL SOURCE' : 'MATERIAL DOMAIN'}
                  </span>
                </div>
                <p className="text-[10px] text-cyan-200">{activeHoverNode.solfeggioName}</p>
                <div className="text-[9px] text-cyan-400/80">Biofield: {activeHoverNode.chakra}</div>
                <button
                  onClick={() => triggerNodeSound(activeHoverNode)}
                  className="w-full mt-1 py-1 bg-cyan-600 hover:bg-cyan-500 text-black font-bold rounded text-[10px] tracking-wider transition-all"
                >
                  TRANSDUCE {activeHoverNode.freqHz} HZ OSCILLATION
                </button>
              </div>
            ) : (
              <div className="p-2.5 bg-black/40 border border-cyan-900/40 rounded-xl text-[10px] text-cyan-500/80 flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Move mouse over nodes or canvas to warp dynamic vector lines & play harmonics.</span>
              </div>
            )}

            {/* Mathematical Proof Box */}
            <div className="p-3 bg-[#020510] border border-cyan-900/60 rounded-xl space-y-1 text-[10px]">
              <div className="text-amber-400 font-bold uppercase">[VORTEX DOUBLING CIRCUIT PROOF]</div>
              <p className="text-cyan-300/90 leading-relaxed font-mono">
                1 &rarr; 2 &rarr; 4 &rarr; 8 &rarr; 16(7) &rarr; 32(5) &rarr; 64(1) &rarr; 128(2) ...
                <br />
                <span className="text-amber-300">Etheric 3, 6, 9:</span> 3+3=6, 6+6=12(3), 3+6=9. All physical digital roots loop indefinitely without touching 3, 6, or 9!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
