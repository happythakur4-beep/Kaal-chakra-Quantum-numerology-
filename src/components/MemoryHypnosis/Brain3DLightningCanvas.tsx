import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ThemeMode, BrainNode3D } from '../../types';
import { BRAIN_NODES_3D } from '../../data/memoryHypnosisData';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import {
  Zap,
  RotateCw,
  Eye,
  Sparkles,
  ShieldAlert,
  Brain,
  Volume2,
  VolumeX,
  Maximize2,
  Activity,
  Compass
} from 'lucide-react';

interface Brain3DLightningCanvasProps {
  theme: ThemeMode;
  selectedNodeId?: string;
  onSelectNode?: (node: BrainNode3D) => void;
  activeAnimationState?: 'idle' | 'lightning_focus' | 'synaptic_sever' | 'gray_fade' | 'rewind_reverse' | 'golden_consolidation' | 'plasma_shield';
  lightningArcTargets?: string[];
  height?: number | string;
  showControls?: boolean;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface LightningBolt {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  points: { x: number; y: number }[];
  color: string;
  width: number;
  life: number;
  maxLife: number;
  branches: { points: { x: number; y: number }[]; width: number }[];
}

interface FlashOfBrilliance {
  x: number;
  y: number;
  color: string;
  radius: number;
  maxRadius: number;
  life: number;
  particles: { x: number; y: number; vx: number; vy: number; color: string; size: number; alpha: number }[];
}

export const Brain3DLightningCanvas: React.FC<Brain3DLightningCanvasProps> = ({
  theme,
  selectedNodeId,
  onSelectNode,
  activeAnimationState = 'idle',
  lightningArcTargets = ['hippocampus', 'amygdala'],
  height = 440,
  showControls = true
}) => {
  const isDark = theme === 'dark';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Viewport State
  const [yaw, setYaw] = useState<number>(0.35);
  const [pitch, setPitch] = useState<number>(0.15);
  const [zoom, setZoom] = useState<number>(1.0);
  const [isAutoOrbit, setIsAutoOrbit] = useState<boolean>(true);
  const [activeNode, setActiveNode] = useState<BrainNode3D | null>(
    BRAIN_NODES_3D.find((n) => n.id === selectedNodeId) || BRAIN_NODES_3D[0]
  );
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [lightningBurstCount, setLightningBurstCount] = useState<number>(0);
  const [currentBrainwave, setCurrentBrainwave] = useState<'gamma' | 'beta' | 'alpha' | 'theta' | 'delta'>('gamma');

  // Drag interaction refs
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update activeNode if selectedNodeId changes externally
  useEffect(() => {
    if (selectedNodeId) {
      const match = BRAIN_NODES_3D.find((n) => n.id === selectedNodeId);
      if (match) setActiveNode(match);
    }
  }, [selectedNodeId]);

  // Handle Manual Flash of Brilliance & Lightning Zap
  const triggerManualBrillianceFlash = useCallback((type: 'gold' | 'cyan' | 'violet' = 'gold') => {
    setLightningBurstCount((prev) => prev + 1);
    if (soundEnabled) {
      // Harmonic Eureka Flash Tone (Gamma 40Hz modulated with crystal harmonics)
      cosmicAudio.playFrequencyTone(type === 'gold' ? 963 : type === 'cyan' ? 852 : 528, 0.18, 'sine');
      setTimeout(() => {
        cosmicAudio.playFrequencyTone(174, 0.25, 'sine');
      }, 70);
    }
  }, [soundEnabled]);

  // Generate fractal jagged lightning bolt path
  const generateLightningPath = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    displace: number = 28,
    iterations: number = 5
  ): { points: { x: number; y: number }[]; branches: { points: { x: number; y: number }[]; width: number }[] } => {
    let points: { x: number; y: number }[] = [
      { x: x1, y: y1 },
      { x: x2, y: y2 }
    ];
    let curDisplace = displace;

    for (let it = 0; it < iterations; it++) {
      const newPoints: { x: number; y: number }[] = [];
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const nx = -dy / (len || 1);
        const ny = dx / (len || 1);

        const offset = (Math.random() - 0.5) * curDisplace * 2;
        const subX = midX + nx * offset;
        const subY = midY + ny * offset;

        newPoints.push(p1);
        newPoints.push({ x: subX, y: subY });
      }
      newPoints.push(points[points.length - 1]);
      points = newPoints;
      curDisplace *= 0.55;
    }

    const branches: { points: { x: number; y: number }[]; width: number }[] = [];
    const branchCount = Math.floor(Math.random() * 3) + 1;
    for (let b = 0; b < branchCount; b++) {
      const startIndex = Math.floor(Math.random() * (points.length - 4)) + 2;
      const startPt = points[startIndex];
      if (!startPt) continue;

      const angle = (Math.random() - 0.5) * Math.PI * 0.8;
      const branchLen = 22 + Math.random() * 38;
      const branchEnd = {
        x: startPt.x + Math.cos(angle) * branchLen,
        y: startPt.y + Math.sin(angle) * branchLen
      };

      const branchPts = [startPt];
      const midBranch = {
        x: (startPt.x + branchEnd.x) / 2 + (Math.random() - 0.5) * 12,
        y: (startPt.y + branchEnd.y) / 2 + (Math.random() - 0.5) * 12
      };
      branchPts.push(midBranch, branchEnd);
      branches.push({ points: branchPts, width: 1.4 });
    }

    return { points, branches };
  };

  // Main 3D Rendering Engine with Mind Silhouette & Flashes of Brilliance
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const activeBolts: LightningBolt[] = [];
    const activeFlashes: FlashOfBrilliance[] = [];

    // Precompute 3D Brain Mesh Surface Geometry
    const brainSurfacePoints: (Point3D & { lobe: 'frontal' | 'temporal' | 'parietal' | 'occipital' | 'limbic' | 'cerebellar'; color: string })[] = [];
    const totalSurfaceNodes = 320;

    for (let i = 0; i < totalSurfaceNodes; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      const hemisphere = Math.random() > 0.5 ? 1 : -1;
      const rX = 0.56 * (0.86 + 0.14 * Math.sin(theta * 6)) * Math.sin(phi);
      const rY = 0.74 * (0.88 + 0.12 * Math.cos(phi * 4)) * Math.cos(phi);
      const rZ = 0.66 * (0.86 + 0.14 * Math.sin(theta * 4)) * Math.sin(phi);

      const x = (hemisphere * 0.12 + rX * 0.88) * hemisphere;
      const y = rY;
      const z = rZ;

      // Assign cortical lobe
      let lobe: 'frontal' | 'temporal' | 'parietal' | 'occipital' | 'limbic' | 'cerebellar' = 'temporal';
      let color = '#38bdf8'; // Cyan default

      if (y > 0.22) {
        lobe = 'frontal';
        color = '#a855f7'; // Violet (Higher Consciousness & Logic)
      } else if (z < -0.25) {
        lobe = 'occipital';
        color = '#ec4899'; // Pink/Magenta (Visual Memory & Recall)
      } else if (y > 0 && z > 0.15) {
        lobe = 'parietal';
        color = '#10b981'; // Emerald (Somatosensory Awareness)
      } else if (y < -0.25 && z < 0) {
        lobe = 'cerebellar';
        color = '#f59e0b'; // Amber (Subconscious Rhythm & Integration)
      } else if (Math.abs(x) < 0.18 && y < 0.1) {
        lobe = 'limbic';
        color = '#ef4444'; // Red/Ruby (Emotional Valence & Amygdala)
      }

      brainSurfacePoints.push({ x, y, z, lobe, color });
    }

    // Neural Tract Connectome Lines
    const neuralTracts: { from: Point3D; to: Point3D; alpha: number; speed: number; pulseOffset: number }[] = [];
    for (let i = 0; i < 110; i++) {
      const p1 = brainSurfacePoints[Math.floor(Math.random() * brainSurfacePoints.length)];
      const p2 = brainSurfacePoints[Math.floor(Math.random() * brainSurfacePoints.length)];
      neuralTracts.push({
        from: p1,
        to: p2,
        alpha: 0.18 + Math.random() * 0.35,
        speed: 1.5 + Math.random() * 3.5,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    // 3D Projection Helper
    const project3D = (
      pt: Point3D,
      curYaw: number,
      curPitch: number,
      curZoom: number,
      centerX: number,
      centerY: number,
      scaleFactor: number
    ): { x: number; y: number; z: number; scale: number } => {
      const cosY = Math.cos(curYaw);
      const sinY = Math.sin(curYaw);
      const x1 = pt.x * cosY + pt.z * sinY;
      const z1 = -pt.x * sinY + pt.z * cosY;

      const cosP = Math.cos(curPitch);
      const sinP = Math.sin(curPitch);
      const y2 = pt.y * cosP - z1 * sinP;
      const z2 = pt.y * sinP + z1 * cosP;

      const cameraDist = 2.5;
      const perspective = cameraDist / (cameraDist + z2);
      const scale = perspective * curZoom * scaleFactor;

      const projX = centerX + x1 * scale;
      const projY = centerY - y2 * scale;

      return { x: projX, y: projY, z: z2, scale: perspective };
    };

    // Render Frame Loop
    const render = () => {
      time += 0.024;
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2 - 10;
      const scaleFactor = Math.min(width, height) * 0.64;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Deep Neural Space Canvas Background
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, width * 0.75);
      if (isDark) {
        bgGrad.addColorStop(0, '#0a1024'); // Deep Sapphire Mind Core
        bgGrad.addColorStop(0.45, '#050816');
        bgGrad.addColorStop(1, '#02040a');
      } else {
        bgGrad.addColorStop(0, '#f0f9ff');
        bgGrad.addColorStop(0.5, '#e0f2fe');
        bgGrad.addColorStop(1, '#cbd5e1');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Ambient Consciousness Field & Synaptic Starfield
      ctx.save();
      for (let s = 0; s < 30; s++) {
        const sx = ((s * 137.5) % width);
        const sy = ((s * 223.1) % height);
        const starPulse = (Math.sin(time * 2 + s) + 1) / 2;
        ctx.fillStyle = isDark ? `rgba(56, 189, 248, ${0.1 + starPulse * 0.25})` : `rgba(2, 132, 199, 0.15)`;
        ctx.beginPath();
        ctx.arc(sx, sy, 1 + starPulse * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      const effectiveYaw = yaw + (isAutoOrbit ? time * 0.28 : 0);
      const effectivePitch = pitch;

      // =========================================================================
      // 1. TRANSLUCENT HUMAN MIND / CRANIAL PROFILE SILHOUETTE (Represents Mind)
      // =========================================================================
      ctx.save();
      ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.18)' : 'rgba(2, 132, 199, 0.25)';
      ctx.lineWidth = 1.4;
      ctx.setLineDash([4, 4]);

      // Ethereal Cranial Contour Aura
      const headRadius = scaleFactor * 0.95;
      const auraGrad = ctx.createRadialGradient(centerX, centerY, headRadius * 0.3, centerX, centerY, headRadius);
      auraGrad.addColorStop(0, isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.06)');
      auraGrad.addColorStop(0.7, isDark ? 'rgba(168, 85, 247, 0.05)' : 'rgba(168, 85, 247, 0.04)');
      auraGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = auraGrad;

      ctx.beginPath();
      // Draw smooth human head / cranial egg silhouette
      ctx.ellipse(centerX, centerY, headRadius * 0.85, headRadius * 0.96, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // =========================================================================
      // 2. NEURAL CONNECTOME TRACTS WITH SYNAPTIC IMPULSE STREAMS
      // =========================================================================
      ctx.save();
      neuralTracts.forEach((tract, i) => {
        const p1 = project3D(tract.from, effectiveYaw, effectivePitch, zoom, centerX, centerY, scaleFactor);
        const p2 = project3D(tract.to, effectiveYaw, effectivePitch, zoom, centerX, centerY, scaleFactor);

        if (p1.z > -0.85 && p2.z > -0.85) {
          // Tract Line
          ctx.strokeStyle = isDark
            ? `rgba(56, 189, 248, ${tract.alpha * 0.3})`
            : `rgba(2, 132, 199, ${tract.alpha * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

          // Action Potential / Spark travelling down the axon
          const impulseT = ((time * tract.speed + tract.pulseOffset) % 1);
          const impulseX = p1.x + (p2.x - p1.x) * impulseT;
          const impulseY = p1.y + (p2.y - p1.y) * impulseT;

          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(impulseX, impulseY, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.restore();

      // =========================================================================
      // 3. BRAIN CORTICAL GYRI & SULCI (COLORED BY LOBE)
      // =========================================================================
      ctx.save();
      brainSurfacePoints.forEach((pt, idx) => {
        const proj = project3D(pt, effectiveYaw, effectivePitch, zoom, centerX, centerY, scaleFactor);
        const isSparkling = (Math.sin(time * 6 + idx * 1.5) + 1) / 2 > 0.88;

        ctx.fillStyle = isSparkling ? '#ffffff' : pt.color;
        ctx.shadowColor = isSparkling ? '#fbbf24' : pt.color;
        ctx.shadowBlur = isSparkling ? 14 : 4;

        ctx.beginPath();
        const ptRadius = Math.max(0.8, (proj.scale * 1.9) * (isSparkling ? 1.7 : 1.0));
        ctx.arc(proj.x, proj.y, ptRadius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // =========================================================================
      // 4. SUBCORTICAL ANATOMICAL BRAIN LOCI (Hippocampus, Amygdala, Pineal, etc.)
      // =========================================================================
      const projectedNodes = BRAIN_NODES_3D.map((node) => {
        const pt: Point3D = {
          x: node.position[0],
          y: node.position[1],
          z: node.position[2]
        };
        const proj = project3D(pt, effectiveYaw, effectivePitch, zoom, centerX, centerY, scaleFactor);
        return {
          node,
          proj,
          isSelected: activeNode?.id === node.id,
          isLightningTarget: lightningArcTargets.includes(node.id)
        };
      });

      // Sort by Z depth
      projectedNodes.sort((a, b) => a.proj.z - b.proj.z);

      projectedNodes.forEach(({ node, proj, isSelected, isLightningTarget }) => {
        const pulse = (Math.sin(time * 4 + node.position[0] * 5) + 1) / 2;
        const baseRadius = 9 * proj.scale;
        const currentRadius = baseRadius + (isSelected ? 5 : 0) + pulse * 2.5;

        ctx.save();
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isSelected ? 28 : isLightningTarget ? 20 : 10;

        const nodeGrad = ctx.createRadialGradient(
          proj.x,
          proj.y,
          0,
          proj.x,
          proj.y,
          currentRadius + 5
        );
        nodeGrad.addColorStop(0, '#ffffff');
        nodeGrad.addColorStop(0.35, node.color);
        nodeGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = nodeGrad;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, currentRadius + 3, 0, Math.PI * 2);
        ctx.fill();

        // Inner solid core
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, baseRadius * 0.7, 0, Math.PI * 2);
        ctx.fill();

        // Target Ring Pulse
        if (isSelected || isLightningTarget) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.8;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, currentRadius + 8 + pulse * 4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Locus Title
        ctx.font = `bold ${Math.max(10, Math.round(11 * proj.scale))}px monospace`;
        ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
        ctx.shadowColor = isDark ? '#000000' : '#ffffff';
        ctx.shadowBlur = 4;
        ctx.textAlign = 'center';
        ctx.fillText(node.name.split(' ')[0], proj.x, proj.y - currentRadius - 8);

        ctx.restore();
      });

      // =========================================================================
      // 5. FLASHES OF BRILLIANCE (प्रतिभा स्फुलिंग - Eureka Spark Explosions)
      // =========================================================================
      // Spontaneous or triggered flashes of brilliance
      const shouldTriggerFlash =
        Math.random() < 0.04 ||
        lightningBurstCount > 0 ||
        activeAnimationState === 'golden_consolidation';

      if (shouldTriggerFlash && projectedNodes.length > 0) {
        const targetNode = projectedNodes[Math.floor(Math.random() * projectedNodes.length)];
        if (targetNode) {
          const particles: FlashOfBrilliance['particles'] = [];
          const particleCount = 14;
          const flashColor = Math.random() > 0.5 ? '#fbbf24' : '#00f0ff'; // Gold or Electric Cyan

          for (let p = 0; p < particleCount; p++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.5 + Math.random() * 4.5;
            particles.push({
              x: targetNode.proj.x,
              y: targetNode.proj.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              color: flashColor,
              size: 2 + Math.random() * 2.5,
              alpha: 1.0
            });
          }

          activeFlashes.push({
            x: targetNode.proj.x,
            y: targetNode.proj.y,
            color: flashColor,
            radius: 2,
            maxRadius: 36 + Math.random() * 24,
            life: 1.0,
            particles
          });
        }
      }

      // Render Active Flashes of Brilliance
      for (let f = activeFlashes.length - 1; f >= 0; f--) {
        const flash = activeFlashes[f];
        flash.life -= 0.05;
        flash.radius += (flash.maxRadius - flash.radius) * 0.15;

        if (flash.life <= 0) {
          activeFlashes.splice(f, 1);
          continue;
        }

        ctx.save();
        const alpha = flash.life;

        // Radiant Shockwave Ring
        ctx.strokeStyle = flash.color;
        ctx.lineWidth = 2.5 * alpha;
        ctx.shadowColor = flash.color;
        ctx.shadowBlur = 20 * alpha;
        ctx.beginPath();
        ctx.arc(flash.x, flash.y, flash.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Brilliant Center Flare
        const flareGrad = ctx.createRadialGradient(flash.x, flash.y, 0, flash.x, flash.y, flash.radius * 0.8);
        flareGrad.addColorStop(0, '#ffffff');
        flareGrad.addColorStop(0.4, flash.color);
        flareGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = flareGrad;
        ctx.beginPath();
        ctx.arc(flash.x, flash.y, flash.radius * 0.7, 0, Math.PI * 2);
        ctx.fill();

        // Radiating Insight Spark Particles
        flash.particles.forEach((pt) => {
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.alpha *= 0.92;

          ctx.fillStyle = pt.color;
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size * alpha, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      }

      // =========================================================================
      // 6. SYNAPTIC LIGHTNING ARCS
      // =========================================================================
      const shouldGenerateLightning =
        Math.random() < 0.38 ||
        activeAnimationState === 'synaptic_sever' ||
        activeAnimationState === 'lightning_focus' ||
        lightningBurstCount > 0;

      if (shouldGenerateLightning && projectedNodes.length >= 2) {
        const targetNodes = projectedNodes.filter((p) => p.isLightningTarget || p.isSelected);
        const sourceNode = targetNodes.length > 0 ? targetNodes[Math.floor(Math.random() * targetNodes.length)] : projectedNodes[0];
        const destNode = projectedNodes[Math.floor(Math.random() * projectedNodes.length)];

        if (sourceNode && destNode && sourceNode.node.id !== destNode.node.id) {
          const arcColor =
            activeAnimationState === 'synaptic_sever'
              ? '#ef4444' // Red Decouple Arc
              : activeAnimationState === 'golden_consolidation'
              ? '#fbbf24' // Gold Consolidation
              : '#00f0ff'; // Electric Cyan Lightning

          const { points, branches } = generateLightningPath(
            sourceNode.proj.x,
            sourceNode.proj.y,
            destNode.proj.x,
            destNode.proj.y,
            activeAnimationState === 'synaptic_sever' ? 42 : 26,
            5
          );

          activeBolts.push({
            startX: sourceNode.proj.x,
            startY: sourceNode.proj.y,
            endX: destNode.proj.x,
            endY: destNode.proj.y,
            points,
            branches,
            color: arcColor,
            width: activeAnimationState === 'synaptic_sever' ? 3.4 : 2.4,
            life: 1.0,
            maxLife: 1.0
          });
        }
      }

      // Render Active Lightning Bolts
      for (let b = activeBolts.length - 1; b >= 0; b--) {
        const bolt = activeBolts[b];
        bolt.life -= 0.12;

        if (bolt.life <= 0) {
          activeBolts.splice(b, 1);
          continue;
        }

        ctx.save();
        const alpha = bolt.life / bolt.maxLife;

        ctx.shadowColor = bolt.color;
        ctx.shadowBlur = 22 * alpha;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = bolt.width * alpha;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'bevel';

        ctx.beginPath();
        bolt.points.forEach((pt, i) => {
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();

        // Colored halo
        ctx.strokeStyle = bolt.color;
        ctx.lineWidth = (bolt.width + 3) * alpha;
        ctx.beginPath();
        bolt.points.forEach((pt, i) => {
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();

        // Side fork branches
        bolt.branches.forEach((br) => {
          ctx.strokeStyle = bolt.color;
          ctx.lineWidth = br.width * alpha;
          ctx.beginPath();
          br.points.forEach((pt, i) => {
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          ctx.stroke();
        });

        // Sparks at strike endpoints
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(bolt.startX, bolt.startY, 4.5 * alpha, 0, Math.PI * 2);
        ctx.arc(bolt.endX, bolt.endY, 4.5 * alpha, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // =========================================================================
      // 7. REAL-TIME BRAINWAVE EEG WAVEFORM OSCILLOSCOPE (Bottom Canvas Strip)
      // =========================================================================
      ctx.save();
      const eegY = height - 24;
      ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.45)' : 'rgba(2, 132, 199, 0.5)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();

      const waveFreq =
        currentBrainwave === 'gamma'
          ? 38
          : currentBrainwave === 'beta'
          ? 20
          : currentBrainwave === 'alpha'
          ? 10
          : currentBrainwave === 'theta'
          ? 6
          : 2;

      for (let ex = 0; ex < width; ex += 4) {
        const wy = eegY + Math.sin((ex * 0.05 * waveFreq) + (time * waveFreq * 0.6)) * 6.5;
        if (ex === 0) ctx.moveTo(ex, wy);
        else ctx.lineTo(ex, wy);
      }
      ctx.stroke();

      // EEG Baseline & Label
      ctx.font = 'bold 9px monospace';
      ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.8)' : 'rgba(2, 132, 199, 0.8)';
      ctx.fillText(`SYNAPTIC EEG: ${currentBrainwave.toUpperCase()} WAVE (${waveFreq} Hz) • COGNITIVE SYNCHRONY 98.4%`, 14, height - 8);
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [yaw, pitch, zoom, isAutoOrbit, activeNode, activeAnimationState, lightningArcTargets, isDark, lightningBurstCount, currentBrainwave]);

  // Handle Mouse / Touch Orbit Controls
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    setIsAutoOrbit(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    setYaw((prev) => prev + dx * 0.008);
    setPitch((prev) => Math.max(-1.2, Math.min(1.2, prev - dy * 0.008)));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setZoom((prev) => Math.max(0.6, Math.min(2.0, prev - e.deltaY * 0.0015)));
  };

  // Node Click Selection on 3D Space
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const clickY = ((e.clientY - rect.top) / rect.height) * canvas.height;

    // Trigger flash of brilliance
    triggerManualBrillianceFlash('cyan');

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 - 10;
    const scaleFactor = Math.min(canvas.width, canvas.height) * 0.64;

    let closestNode: BrainNode3D | null = null;
    let minDist = 48;

    BRAIN_NODES_3D.forEach((node) => {
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const x1 = node.position[0] * cosY + node.position[2] * sinY;
      const z1 = -node.position[0] * sinY + node.position[2] * cosY;
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const y2 = node.position[1] * cosP - z1 * sinP;
      const z2 = node.position[1] * sinP + z1 * cosP;
      const perspective = 2.5 / (2.5 + z2);
      const scale = perspective * zoom * scaleFactor;
      const projX = centerX + x1 * scale;
      const projY = centerY - y2 * scale;

      const dist = Math.hypot(clickX - projX, clickY - projY);
      if (dist < minDist) {
        minDist = dist;
        closestNode = node;
      }
    });

    if (closestNode) {
      setActiveNode(closestNode);
      if (onSelectNode) onSelectNode(closestNode);
    }
  };

  return (
    <div
      className={`rounded-3xl border overflow-hidden relative select-none flex flex-col transition-all ${
        isDark
          ? 'bg-[#050814] border-cyan-500/30 text-slate-100 shadow-[0_0_50px_rgba(6,182,212,0.18)]'
          : 'bg-white border-cyan-200 text-slate-900 shadow-xl'
      }`}
      style={{ minHeight: typeof height === 'number' ? `${height}px` : height }}
    >
      {/* Top HUD Bar with Flashes of Brilliance Trigger */}
      <div className="px-5 py-3 border-b border-cyan-500/20 flex items-center justify-between flex-wrap gap-2 bg-slate-950/60 backdrop-blur-md z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-400/40 animate-pulse shadow-[0_0_12px_rgba(6,182,212,0.4)]">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-cinzel font-bold tracking-wider text-cyan-300 flex items-center gap-1.5">
              <span>HUMAN MIND & FLASHES OF BRILLIANCE</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 font-bold">
                EUREKA INSIGHT ENGINE
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Orbital Synaptic Mind View • Lobe Telemetry & Sparks
            </div>
          </div>
        </div>

        {/* Top Right Controls & Brilliance Spurt */}
        <div className="flex items-center gap-2">
          {/* Flash of Brilliance Button */}
          <button
            onClick={() => triggerManualBrillianceFlash('gold')}
            title="Ignite Flash of Brilliance across cortex"
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-black text-xs font-cinzel font-black flex items-center gap-1.5 cursor-pointer transition active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
          >
            <Sparkles className="w-3.5 h-3.5 fill-black text-black animate-spin" />
            <span>⚡ Flash of Brilliance (प्रतिभा)</span>
          </button>

          {/* Brainwave Waveform Mode Selector */}
          <div className="hidden sm:flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-cyan-500/20 text-[10px] font-mono">
            {(['gamma', 'alpha', 'theta'] as const).map((bw) => (
              <button
                key={bw}
                onClick={() => setCurrentBrainwave(bw)}
                className={`px-2 py-0.5 rounded-lg transition uppercase font-bold cursor-pointer ${
                  currentBrainwave === bw
                    ? 'bg-cyan-500 text-black shadow-sm'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                {bw}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsAutoOrbit((prev) => !prev)}
            title="Toggle 360° Auto-Orbit"
            className={`p-2 rounded-xl border text-xs transition cursor-pointer ${
              isAutoOrbit
                ? 'bg-cyan-500 text-black border-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                : 'bg-slate-900/60 border-slate-700 text-slate-400'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAutoOrbit ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setSoundEnabled((prev) => !prev)}
            title="Toggle Audio Feedback"
            className="p-2 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-400 hover:text-cyan-300 text-xs transition cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Viewport */}
      <div className="relative flex-1 w-full min-h-[320px] flex items-center justify-center bg-black/60 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={680}
          height={400}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
          onClick={handleCanvasClick}
          className="w-full h-full object-contain cursor-grab active:cursor-grabbing"
        />

        {/* Live HUD Floating Lobe Map */}
        <div className="absolute top-3 left-4 pointer-events-none text-[10px] font-mono text-cyan-300/90 bg-slate-950/85 px-3 py-2 rounded-2xl border border-cyan-500/30 backdrop-blur-md space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span className="font-bold text-slate-200">FRONTAL LOBE:</span>
            <span className="text-purple-300">Will & Focus</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="font-bold text-slate-200">TEMPORAL:</span>
            <span className="text-cyan-300">Hippocampus Recall</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="font-bold text-slate-200">AMYGDALA:</span>
            <span className="text-rose-300">Emotional Valence</span>
          </div>
        </div>

        {/* State Banner */}
        {activeAnimationState !== 'idle' && (
          <div className="absolute top-3 right-4 pointer-events-none text-xs font-mono font-bold px-3.5 py-1.5 rounded-2xl border backdrop-blur-md animate-pulse flex items-center gap-2 bg-slate-950/90 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="uppercase">
              {activeAnimationState === 'synaptic_sever'
                ? '⚡ SYNAPTIC AMYGDALA SEVERANCE'
                : activeAnimationState === 'golden_consolidation'
                ? '✨ MEMORY RECONSOLIDATION SEAL'
                : activeAnimationState === 'gray_fade'
                ? '🌫️ GRAYSCALE SUBMODALITY DEFUSION'
                : activeAnimationState === 'rewind_reverse'
                ? '⏪ HIGH-SPEED REWIND FLIP'
                : '⚡ LIGHTNING BIO-SYNCHRONY'}
            </span>
          </div>
        )}
      </div>

      {/* Active Node Detail Footer Drawer */}
      {activeNode && showControls && (
        <div className="px-5 py-3 border-t border-cyan-500/20 bg-slate-950/80 backdrop-blur-md flex items-center justify-between flex-wrap gap-3">
          <div className="space-y-0.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: activeNode.color }} />
              <span className="text-xs sm:text-sm font-cinzel font-bold text-cyan-200">
                {activeNode.name}
              </span>
              <span className="text-[10px] font-serif text-amber-300 italic">
                ({activeNode.sanskritName})
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                {activeNode.targetFrequencyHz} Hz
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              {activeNode.clinicalSignificance}
            </p>
          </div>

          {/* Quick Node Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {BRAIN_NODES_3D.slice(0, 6).map((node) => (
              <button
                key={node.id}
                onClick={() => {
                  setActiveNode(node);
                  triggerManualBrillianceFlash('cyan');
                  if (onSelectNode) onSelectNode(node);
                }}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-mono whitespace-nowrap transition cursor-pointer ${
                  activeNode.id === node.id
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(6,182,212,0.6)]'
                    : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-cyan-500/50'
                }`}
              >
                {node.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
