import React, { useEffect, useRef } from 'react';
import { ThemeMode, AuraType } from '../types';

interface SacredGeometryParticlesProps {
  theme: ThemeMode;
  size?: number;
  activeAura?: AuraType;
}

interface OrbitingStar {
  x: number;
  y: number;
  angle: number;
  speed: number;
  radiusX: number;
  radiusY: number;
  tilt: number;
  size: number;
  color: string;
  alpha: number;
  twinklePhase: number;
  hasFlare?: boolean;
}

interface QuantumHeartGlyph {
  symbol: string;
  subText?: string;
  angle: number;
  orbitRadius: number;
  speed: number;
  alpha: number;
  fontSize: number;
  color: string;
  glowColor: string;
  isHeart?: boolean;
}

interface Particle {
  angle: number;
  speed: number;
  distance: number;
  yOffset: number;
  alpha: number;
  color: string;
  size: number;
}

export const SacredGeometryParticles: React.FC<SacredGeometryParticlesProps> = ({ 
  theme,
  size = 320,
  activeAura = 'Calm Amber'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = size);
    const height = (canvas.height = size);
    const centerX = width / 2;
    const centerY = height / 2;

    // Aura-specific dominant primary accent
    const auraColorsMap: Record<AuraType, { primary: string; secondary: string; glow: string }> = {
      'Calm Amber': { primary: '#f59e0b', secondary: '#ffd700', glow: '#fbbf24' },
      'Radiant Rose': { primary: '#f43f5e', secondary: '#fb7185', glow: '#fda4af' },
      'Celestial Gold': { primary: '#ffd700', secondary: '#fde047', glow: '#fef08a' },
      'Aetheric Violet': { primary: '#a855f7', secondary: '#c084fc', glow: '#e9d5ff' },
      'Emerald Clarity': { primary: '#10b981', secondary: '#34d399', glow: '#6ee7b7' },
    };

    const currentAura = auraColorsMap[activeAura] || auraColorsMap['Calm Amber'];

    // Prismatic Multi-Color Palette for Quantum 3-6-9 Celestial Appearance with Aura-attuned harmonics
    const vibrantColors = isDark
      ? [
          currentAura.primary,
          currentAura.secondary,
          '#ffd700', // Gold
          '#f43f5e', // Rose / Ruby
          '#a855f7', // Amethyst / Violet
          '#38bdf8', // Celestial Cyan / Sapphire
          '#10b981', // Emerald
          '#fb7185', // Coral Heart
          '#facc15', // Topaz
          '#c084fc', // Lavender
          '#ffffff', // Diamond White
        ]
      : [
          currentAura.primary,
          '#d97706', // Warm Amber
          '#e11d48', // Ruby Rose
          '#7c3aed', // Purple
          '#0284c7', // Sky Blue
          '#059669', // Emerald
          '#b45309', // Deep Bronze
        ];

    // 1. Orbiting Stars moving dynamically around the center circle area
    const starCount = 36;
    const movingStars: OrbitingStar[] = [];
    for (let i = 0; i < starCount; i++) {
      const radiusBase = Math.random() * (size * 0.44 - size * 0.16) + size * 0.16;
      movingStars.push({
        x: 0,
        y: 0,
        angle: (i / starCount) * Math.PI * 2 + Math.random() * 0.8,
        speed: (Math.random() * 0.012 + 0.006) * (Math.random() > 0.35 ? 1 : -1),
        radiusX: radiusBase,
        radiusY: radiusBase * (Math.random() * 0.4 + 0.45), // 3D elliptical tilt
        tilt: (Math.random() - 0.5) * 0.7,
        size: Math.random() * 2.2 + 0.8,
        color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)],
        alpha: Math.random() * 0.7 + 0.3,
        twinklePhase: Math.random() * Math.PI * 2,
        hasFlare: Math.random() > 0.4,
      });
    }

    // 2. Quantum 3-6-9 Numerology & Heart Sacred Glyphs Orbiting in Celestial Radiance
    const quantumGlyphs: QuantumHeartGlyph[] = [
      { symbol: '3♥', subText: 'Create', angle: 0, orbitRadius: size * 0.38, speed: 0.005, alpha: 0.95, fontSize: 13, color: '#f43f5e', glowColor: '#fb7185', isHeart: true },
      { symbol: 'ॐ', angle: (Math.PI * 2) / 6, orbitRadius: size * 0.38, speed: 0.005, alpha: 0.9, fontSize: 13, color: '#ffd700', glowColor: '#fef08a' },
      { symbol: '6♥', subText: 'Vibrate', angle: (Math.PI * 4) / 6, orbitRadius: size * 0.38, speed: 0.005, alpha: 0.95, fontSize: 13, color: '#10b981', glowColor: '#34d399', isHeart: true },
      { symbol: 'श्रीं', angle: (Math.PI * 6) / 6, orbitRadius: size * 0.38, speed: 0.005, alpha: 0.9, fontSize: 12, color: '#38bdf8', glowColor: '#7dd3fc' },
      { symbol: '9♥', subText: 'Ascend', angle: (Math.PI * 8) / 6, orbitRadius: size * 0.38, speed: 0.005, alpha: 0.95, fontSize: 13, color: '#a855f7', glowColor: '#c084fc', isHeart: true },
      { symbol: 'ह्रीं', angle: (Math.PI * 10) / 6, orbitRadius: size * 0.38, speed: 0.005, alpha: 0.9, fontSize: 12, color: '#f59e0b', glowColor: '#fbbf24' },
    ];

    // 3. Stardust particles floating in 3D depth
    const particleCount = 28;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: (i / particleCount) * Math.PI * 2 + Math.random() * 0.5,
        speed: (Math.random() * 0.015 + 0.007) * (Math.random() > 0.5 ? 1 : -1),
        distance: Math.random() * (size * 0.44 - size * 0.20) + size * 0.20,
        yOffset: (Math.random() - 0.5) * (size * 0.28),
        alpha: Math.random() * 0.7 + 0.3,
        color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)],
        size: Math.random() * 2 + 0.8,
      });
    }

    let time = 0;

    // Helper to draw a crisp vector heart
    const drawHeart = (
      context: CanvasRenderingContext2D,
      hx: number,
      hy: number,
      hSize: number,
      hColor: string,
      hAlpha: number
    ) => {
      context.save();
      context.translate(hx, hy);
      context.beginPath();
      const topCurveHeight = hSize * 0.3;
      context.moveTo(0, topCurveHeight);
      // top left curve
      context.bezierCurveTo(
        -hSize / 2, -topCurveHeight, 
        -hSize, hSize / 3, 
        0, hSize
      );
      // top right curve
      context.bezierCurveTo(
        hSize, hSize / 3, 
        hSize / 2, -topCurveHeight, 
        0, topCurveHeight
      );
      context.fillStyle = hColor;
      context.globalAlpha = hAlpha;
      if (isDark) {
        context.shadowColor = hColor;
        context.shadowBlur = 8;
      }
      context.fill();
      context.restore();
    };

    const render = () => {
      time += 0.018;
      ctx.clearRect(0, 0, width, height);

      // Quantum Breathing Cycle (Harmonic 432Hz sine pulse)
      const breathCycle = Math.sin(time * 1.3);
      const colorShift = (time * 0.2) % 1;

      ctx.save();
      ctx.translate(centerX, centerY);

      // 1. Multi-Colored Prismatic Concentric Solfeggio Aura Rings with user's Active Aura Harmonics
      const ringTints = isDark 
        ? [currentAura.primary, '#ffd700', currentAura.secondary, '#38bdf8', '#f43f5e', '#a855f7'] 
        : [currentAura.primary, '#d97706', '#059669', '#0284c7', '#7c3aed'];

      for (let w = 0; w < 4; w++) {
        const waveProgress = ((time * 0.35 + w * 0.25) % 1);
        const waveRadius = size * 0.16 + waveProgress * (size * 0.33);
        const waveAlpha = (1 - waveProgress) * (isDark ? 0.45 : 0.3) * (0.8 + 0.2 * Math.sin(time * 2.5));
        const ringColor = ringTints[w % ringTints.length];
        
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, waveRadius, 0, Math.PI * 2);
        ctx.strokeStyle = ringColor;
        ctx.globalAlpha = waveAlpha;
        ctx.lineWidth = 1.3 - waveProgress * 0.7;
        if (isDark && waveProgress < 0.75) {
          ctx.shadowColor = ringColor;
          ctx.shadowBlur = 12 * (1 - waveProgress);
        }
        ctx.stroke();
        ctx.restore();
      }

      // 2. Quantum Kardia Heart Curve Geometry (Mathematical Cardioid Pulses)
      ctx.save();
      ctx.rotate(time * 0.1);
      const heartScale = size * (0.17 + breathCycle * 0.012);
      ctx.beginPath();
      for (let t = 0; t <= Math.PI * 2; t += 0.05) {
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        const px = (hx / 16) * heartScale;
        const py = (hy / 16) * heartScale;
        if (t === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = isDark ? 'rgba(244, 63, 94, 0.45)' : 'rgba(225, 29, 72, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([3, 4]);
      if (isDark) {
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 10;
      }
      ctx.stroke();
      ctx.restore();

      // 3. Counter-Rotating Multi-Color Sacred Geometry Rings
      ctx.save();
      ctx.rotate(-time * 0.22);
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.32 + breathCycle * 2.5, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(2, 132, 199, 0.35)';
      ctx.lineWidth = 1.1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();

      // 8-Ray Prismatic Quantum Cross / Meru Rays
      for (let r = 0; r < 8; r++) {
        const rayAngle = (r * Math.PI) / 4;
        const rayLenInner = size * 0.20;
        const rayLenOuter = size * 0.32 + breathCycle * 2.5;
        const rayColor = ringTints[r % ringTints.length];
        ctx.beginPath();
        ctx.moveTo(Math.cos(rayAngle) * rayLenInner, Math.sin(rayAngle) * rayLenInner);
        ctx.lineTo(Math.cos(rayAngle) * rayLenOuter, Math.sin(rayAngle) * rayLenOuter);
        ctx.strokeStyle = rayColor;
        ctx.globalAlpha = isDark ? 0.35 : 0.25;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      ctx.restore();

      // 4. Moving Stars Orbiting dynamically around the central circle area
      movingStars.forEach((star) => {
        star.angle += star.speed;
        star.twinklePhase += 0.04;

        ctx.save();
        ctx.rotate(star.tilt);
        const orbitRadiusX = star.radiusX + breathCycle * 3;
        const orbitRadiusY = star.radiusY + breathCycle * 2;
        const sx = Math.cos(star.angle) * orbitRadiusX;
        const sy = Math.sin(star.angle) * orbitRadiusY;

        // 3D Depth scaling
        const depth = (Math.sin(star.angle) + 1.6) / 2.6;
        const starSize = star.size * depth;
        const twinkle = Math.sin(star.twinklePhase) * 0.35 + 0.65;
        const starAlpha = star.alpha * depth * twinkle * (isDark ? 0.95 : 0.7);

        // Draw Star Body with Color Glow
        ctx.beginPath();
        ctx.arc(sx, sy, starSize, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = starAlpha;
        if (isDark) {
          ctx.shadowColor = star.color;
          ctx.shadowBlur = 10;
        }
        ctx.fill();

        // 4-Point Sparkling Star Flare on radiant stars
        if (isDark && star.hasFlare && twinkle > 0.7) {
          const flareLen = starSize * 3.5;
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.6;
          ctx.globalAlpha = starAlpha * 0.6;
          ctx.beginPath();
          ctx.moveTo(sx - flareLen, sy);
          ctx.lineTo(sx + flareLen, sy);
          ctx.moveTo(sx, sy - flareLen);
          ctx.lineTo(sx, sy + flareLen);
          ctx.stroke();
        }

        ctx.restore();
      });

      // 5. Draw Orbiting 3-6-9 Quantum Numerology Hearts & Sacred Glyphs
      quantumGlyphs.forEach((glyph) => {
        glyph.angle += glyph.speed;
        const orbitR = glyph.orbitRadius + breathCycle * 3;
        const gx = Math.cos(glyph.angle) * orbitR;
        const gy = Math.sin(glyph.angle) * (orbitR * 0.48); // 3D tilted plane perspective

        ctx.save();
        const glowBoost = Math.sin(time * 2.8 + glyph.angle) * 0.35 + 0.65;
        ctx.globalAlpha = isDark ? glyph.alpha * glowBoost : 0.85;

        // If it's a Heart glyph (3♥, 6♥, 9♥), render cute vector heart accompaniment
        if (glyph.isHeart) {
          drawHeart(
            ctx, 
            gx, 
            gy - 9, 
            5.5, 
            glyph.color, 
            (isDark ? glyph.alpha : 0.8) * glowBoost
          );
        }

        ctx.font = `bold ${glyph.fontSize}px 'Cinzel', 'Noto Serif Devanagari', sans-serif`;
        ctx.fillStyle = glyph.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (isDark) {
          ctx.shadowColor = glyph.glowColor;
          ctx.shadowBlur = 12 * glowBoost;
        }
        ctx.fillText(glyph.symbol, gx, gy + (glyph.isHeart ? 3 : 0));
        ctx.restore();
      });

      // 6. Draw 3D Floating Colored Cosmic Stardust
      particles.forEach((p, idx) => {
        p.angle += p.speed;
        const wave = Math.sin(time * 2.2 + idx) * 7;
        const pDistance = p.distance + breathCycle * 4;
        const px = Math.cos(p.angle) * pDistance;
        const py = Math.sin(p.angle) * (pDistance * 0.42) + p.yOffset + wave;

        const depthScale = (Math.sin(p.angle) + 1.5) / 2.5;
        const pSize = p.size * depthScale;
        const pAlpha = p.alpha * depthScale * (isDark ? 0.9 : 0.65);

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = pAlpha;
        if (isDark) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
        }
        ctx.fill();
        ctx.restore();
      });

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, size, isDark, activeAura]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="w-full h-full max-w-[360px] max-h-[360px]"
      />
    </div>
  );
};
