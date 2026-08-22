import React, { useEffect, useRef } from 'react';
import { ThemeMode } from '../types';

interface StarfieldCanvasProps {
  theme: ThemeMode;
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  vx: number;
  vy: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  fadeSpeed: number;
  thickness: number;
}

interface CosmicDust {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  baseAlpha: number;
  color: string;
}

interface Planet {
  name: string;
  sanskrit: string;
  orbitRadiusRatioX: number;
  orbitRadiusRatioY: number;
  tilt: number;
  speed: number;
  angle: number;
  size: number;
  baseColor: string;
  gradientColors: [string, string, string];
  glowColor: string;
  hasRings?: boolean;
  ringColor?: string;
  ringRadiusRatio?: number;
}

export const StarfieldCanvas: React.FC<StarfieldCanvasProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initCosmos();
    };

    window.addEventListener('resize', handleResize);

    const starCount = isDark ? 320 : 120;
    const dustCount = isDark ? 65 : 35;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let cosmicDusts: CosmicDust[] = [];

    // Navagrahas & Celestial Planets Configuration
    const planets: Planet[] = [
      {
        name: 'Sun',
        sanskrit: 'Surya (सूर्य)',
        orbitRadiusRatioX: 0.12,
        orbitRadiusRatioY: 0.07,
        tilt: 0.2,
        speed: 0.0004,
        angle: 0.5,
        size: isDark ? 14 : 11,
        baseColor: '#ffd700',
        gradientColors: ['#fff8db', '#ffaa00', '#ff4500'],
        glowColor: 'rgba(255, 170, 0, 0.55)',
      },
      {
        name: 'Moon',
        sanskrit: 'Chandra (चन्द्र)',
        orbitRadiusRatioX: 0.20,
        orbitRadiusRatioY: 0.11,
        tilt: -0.15,
        speed: 0.0012,
        angle: 2.1,
        size: isDark ? 8 : 6,
        baseColor: '#f5f5ff',
        gradientColors: ['#ffffff', '#d8e2dc', '#a0b2c6'],
        glowColor: 'rgba(230, 240, 255, 0.6)',
      },
      {
        name: 'Mercury',
        sanskrit: 'Budha (बुध)',
        orbitRadiusRatioX: 0.28,
        orbitRadiusRatioY: 0.15,
        tilt: 0.3,
        speed: 0.0009,
        angle: 4.3,
        size: 5,
        baseColor: '#10b981',
        gradientColors: ['#6ee7b7', '#059669', '#064e3b'],
        glowColor: 'rgba(16, 185, 129, 0.45)',
      },
      {
        name: 'Venus',
        sanskrit: 'Shukra (शुक्र)',
        orbitRadiusRatioX: 0.36,
        orbitRadiusRatioY: 0.19,
        tilt: -0.25,
        speed: 0.0007,
        angle: 1.2,
        size: 7,
        baseColor: '#fef08a',
        gradientColors: ['#ffffff', '#fde047', '#ca8a04'],
        glowColor: 'rgba(253, 224, 71, 0.55)',
      },
      {
        name: 'Mars',
        sanskrit: 'Mangal (मंगल)',
        orbitRadiusRatioX: 0.45,
        orbitRadiusRatioY: 0.24,
        tilt: 0.18,
        speed: 0.0006,
        angle: 3.5,
        size: 6.5,
        baseColor: '#ef4444',
        gradientColors: ['#fca5a5', '#dc2626', '#7f1d1d'],
        glowColor: 'rgba(239, 68, 68, 0.5)',
      },
      {
        name: 'Jupiter',
        sanskrit: 'Brihaspati (बृहस्पति)',
        orbitRadiusRatioX: 0.56,
        orbitRadiusRatioY: 0.30,
        tilt: -0.1,
        speed: 0.0003,
        angle: 5.2,
        size: isDark ? 13 : 10,
        baseColor: '#f59e0b',
        gradientColors: ['#fef3c7', '#d97706', '#78350f'],
        glowColor: 'rgba(245, 158, 11, 0.5)',
        hasRings: true,
        ringColor: 'rgba(245, 158, 11, 0.3)',
        ringRadiusRatio: 1.8,
      },
      {
        name: 'Saturn',
        sanskrit: 'Shani (शनि)',
        orbitRadiusRatioX: 0.68,
        orbitRadiusRatioY: 0.36,
        tilt: 0.35,
        speed: 0.0002,
        angle: 0.8,
        size: isDark ? 10 : 8,
        baseColor: '#cbd5e1',
        gradientColors: ['#f1f5f9', '#94a3b8', '#334155'],
        glowColor: 'rgba(203, 213, 225, 0.45)',
        hasRings: true,
        ringColor: 'rgba(212, 175, 55, 0.55)',
        ringRadiusRatio: 2.2,
      },
      {
        name: 'Rahu',
        sanskrit: 'Rahu (राहु)',
        orbitRadiusRatioX: 0.80,
        orbitRadiusRatioY: 0.42,
        tilt: -0.3,
        speed: -0.00025, // Retrograde motion
        angle: 2.8,
        size: 5.5,
        baseColor: '#818cf8',
        gradientColors: ['#c7d2fe', '#4f46e5', '#1e1b4b'],
        glowColor: 'rgba(99, 102, 241, 0.5)',
      },
      {
        name: 'Ketu',
        sanskrit: 'Ketu (केतु)',
        orbitRadiusRatioX: 0.80,
        orbitRadiusRatioY: 0.42,
        tilt: -0.3,
        speed: -0.00025, // Exactly 180 degrees opposite to Rahu
        angle: 2.8 + Math.PI,
        size: 5.5,
        baseColor: '#f43f5e',
        gradientColors: ['#fecdd3', '#e11d48', '#4c0519'],
        glowColor: 'rgba(244, 63, 94, 0.5)',
      }
    ];

    const starColorsDark = [
      '#ffffff',
      '#fff7db',
      '#ffd700',
      '#d4af37',
      '#e6c35c',
      '#fbf8f0',
      '#7dd3fc',
      '#c084fc',
      '#fda4af',
      '#86efac'
    ];

    const starColorsLight = [
      '#8a6514',
      '#c5a059',
      '#d4af37',
      '#9e7d3b',
      '#b45309',
      '#0284c7',
      '#7c3aed',
      '#e11d48'
    ];

    const initCosmos = () => {
      stars = [];
      const colors = isDark ? starColorsDark : starColorsLight;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 2 + 0.5,
          size: Math.random() * (isDark ? 1.8 : 1.2) + 0.4,
          baseAlpha: Math.random() * 0.7 + 0.3,
          alpha: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.03 + 0.008,
          twinklePhase: Math.random() * Math.PI * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
        });
      }

      cosmicDusts = [];
      for (let i = 0; i < dustCount; i++) {
        cosmicDusts.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.5 + 0.8,
          vx: (Math.random() - 0.5) * 0.2,
          vy: -Math.random() * 0.3 - 0.05,
          alpha: Math.random() * 0.6 + 0.2,
          baseAlpha: Math.random() * 0.6 + 0.2,
          color: isDark ? '#ffd700' : '#c5a059',
        });
      }
    };

    initCosmos();

    let lastShootingStarTime = Date.now();

    const addShootingStar = () => {
      if (!isDark) return;
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.3;
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.4,
        length: Math.random() * 90 + 60,
        speed: Math.random() * 9 + 7,
        angle,
        alpha: 1,
        fadeSpeed: Math.random() * 0.02 + 0.015,
        thickness: Math.random() * 1.5 + 0.8,
      });
    };

    // Constellation lines (Sacred Saptarshi / Ursa Major & Orion points)
    const constellationPoints = [
      { x: 0.15, y: 0.22 },
      { x: 0.19, y: 0.20 },
      { x: 0.24, y: 0.22 },
      { x: 0.28, y: 0.26 },
      { x: 0.26, y: 0.33 },
      { x: 0.33, y: 0.35 },
      { x: 0.35, y: 0.28 },
    ];

    let time = 0;
    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.38;

      // 1. Draw Subtle Constellation Lines
      if (isDark) {
        ctx.save();
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.12)';
        ctx.lineWidth = 0.8;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        for (let i = 0; i < constellationPoints.length; i++) {
          const ptX = constellationPoints[i].x * width;
          const ptY = constellationPoints[i].y * height;
          if (i === 0) ctx.moveTo(ptX, ptY);
          else ctx.lineTo(ptX, ptY);
        }
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      // 2. Draw Planetary Orbits & Navagrahas
      planets.forEach((planet) => {
        const radiusX = Math.min(width, height) * planet.orbitRadiusRatioX;
        const radiusY = Math.min(width, height) * planet.orbitRadiusRatioY;

        // Draw Elliptical Orbit Path
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(planet.tilt);

        ctx.beginPath();
        ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.08)' : 'rgba(197, 160, 89, 0.15)';
        ctx.lineWidth = 0.6;
        ctx.setLineDash([2, 5]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Calculate Current Planet Position
        planet.angle += planet.speed;
        const px = Math.cos(planet.angle) * radiusX;
        const py = Math.sin(planet.angle) * radiusY;

        // Draw Planet Glow
        if (isDark) {
          const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, planet.size * 2.8);
          glowGrad.addColorStop(0, planet.glowColor);
          glowGrad.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(px, py, planet.size * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();
        }

        // Draw Rings for Saturn & Jupiter
        if (planet.hasRings && planet.ringColor) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(0.4);
          ctx.beginPath();
          ctx.ellipse(0, 0, planet.size * (planet.ringRadiusRatio || 2.2), planet.size * 0.7, 0, 0, Math.PI * 2);
          ctx.strokeStyle = planet.ringColor;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.restore();
        }

        // Draw Planet Sphere with 3D Light Shading
        const planetGrad = ctx.createRadialGradient(
          px - planet.size * 0.3,
          py - planet.size * 0.3,
          planet.size * 0.1,
          px,
          py,
          planet.size
        );
        planetGrad.addColorStop(0, planet.gradientColors[0]);
        planetGrad.addColorStop(0.6, planet.gradientColors[1]);
        planetGrad.addColorStop(1, planet.gradientColors[2]);

        ctx.beginPath();
        ctx.arc(px, py, planet.size, 0, Math.PI * 2);
        ctx.fillStyle = planetGrad;
        ctx.fill();

        // Optional Planet Sanskrit Label on Hover / Distant View
        if (isDark) {
          ctx.font = '9px Cinzel, serif';
          ctx.fillStyle = 'rgba(253, 242, 209, 0.45)';
          ctx.textAlign = 'center';
          ctx.fillText(planet.sanskrit, px, py + planet.size + 11);
        }

        ctx.restore();
      });

      // 3. Draw Cosmic Dust (Ascending Golden Stardust Embers)
      for (let i = 0; i < cosmicDusts.length; i++) {
        const dust = cosmicDusts[i];
        dust.x += dust.vx;
        dust.y += dust.vy;

        if (dust.y < -10) dust.y = height + 10;
        if (dust.x < -10) dust.x = width + 10;
        if (dust.x > width + 10) dust.x = -10;

        const pulse = Math.sin(time * 2 + i) * 0.3 + 0.7;
        const currentAlpha = dust.baseAlpha * pulse * (isDark ? 0.6 : 0.3);

        ctx.save();
        ctx.beginPath();
        ctx.arc(dust.x, dust.y, dust.size, 0, Math.PI * 2);
        ctx.fillStyle = dust.color;
        ctx.globalAlpha = currentAlpha;
        if (isDark) {
          ctx.shadowColor = '#ffd700';
          ctx.shadowBlur = 6;
        }
        ctx.fill();
        ctx.restore();
      }

      // 4. Draw and Update Twinkling Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.4 + 0.6;
        const currentAlpha = star.baseAlpha * twinkle * (isDark ? 0.9 : 0.4);

        ctx.save();
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;

        if (isDark && star.size > 1.2) {
          ctx.shadowColor = star.color;
          ctx.shadowBlur = 8;
        }
        ctx.fill();

        // 4-pointed cross star flare on prominent stars
        if (isDark && star.size > 1.4 && twinkle > 0.8) {
          const flareLen = star.size * 3.5;
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = currentAlpha * 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - flareLen, star.y);
          ctx.lineTo(star.x + flareLen, star.y);
          ctx.moveTo(star.x, star.y - flareLen);
          ctx.lineTo(star.x, star.y + flareLen);
          ctx.stroke();
        }

        ctx.restore();
      }

      // 5. Handle Shooting Stars
      if (isDark && Date.now() - lastShootingStarTime > 4000 && Math.random() < 0.02) {
        addShootingStar();
        lastShootingStarTime = Date.now();
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, 'rgba(212, 175, 55, 0)');
        grad.addColorStop(0.7, 'rgba(255, 242, 209, ' + s.alpha * 0.8 + ')');
        grad.addColorStop(1, 'rgba(255, 255, 255, ' + s.alpha + ')');

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.thickness;
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= s.fadeSpeed;

        if (s.alpha <= 0 || s.x > width + 100 || s.y > height + 100) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};
