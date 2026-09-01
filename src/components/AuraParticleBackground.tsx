import React, { useEffect, useRef } from 'react';
import { ThemeMode, AuraType } from '../types';

interface AuraParticleBackgroundProps {
  theme: ThemeMode;
  activeAura: AuraType;
  className?: string;
  opacity?: number;
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  alpha: number;
  maxAlpha: number;
  color: string;
  glowColor: string;
  phase: number;
  speed: number;
  angle: number;
  radius: number;
  baseRadius: number;
  angularSpeed: number;
  flare: boolean;
  life: number;
  maxLife: number;
}

// Particle color configurations tuned to the 5 Aura types
const AURA_PALETTES: Record<AuraType, {
  colors: string[];
  glow: string;
  flowName: string;
  description: string;
}> = {
  'Calm Amber': {
    colors: ['#f59e0b', '#fbbf24', '#ffd700', '#d97706', '#fef3c7'],
    glow: 'rgba(245, 158, 11, 0.6)',
    flowName: 'Ascending Thermal Updraft',
    description: 'Grounding prana & soothing thermal golden embers floating upwards',
  },
  'Radiant Rose': {
    colors: ['#f43f5e', '#fb7185', '#fda4af', '#e11d48', '#ffe4e6'],
    glow: 'rgba(244, 63, 94, 0.6)',
    flowName: 'Concentric Heart Bloom',
    description: 'Anahata heart lotus expansion waves & harmonic orbital breath ripples',
  },
  'Celestial Gold': {
    colors: ['#ffd700', '#fbbf24', '#fde047', '#ffffff', '#fef08a'],
    glow: 'rgba(255, 215, 0, 0.75)',
    flowName: 'Fibonacci Solar Vortex',
    description: 'Sahasrara divine illumination vortex swirl & sparkling diamond star flares',
  },
  'Aetheric Violet': {
    colors: ['#a855f7', '#c084fc', '#818cf8', '#e9d5ff', '#6366f1'],
    glow: 'rgba(168, 85, 247, 0.65)',
    flowName: 'Quantum Wave-Interference',
    description: 'Ajna third-eye astral stream & undulating multidimensional wave ripples',
  },
  'Emerald Clarity': {
    colors: ['#10b981', '#34d399', '#6ee7b7', '#059669', '#2dd4bf'],
    glow: 'rgba(16, 185, 129, 0.65)',
    flowName: 'Cascading Pranic Constellation',
    description: 'Dynamic bio-crystalline matrix streams with interconnected energy filaments',
  },
};

export const AuraParticleBackground: React.FC<AuraParticleBackgroundProps> = ({
  theme,
  activeAura,
  className = '',
  opacity = 0.85,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -100, y: -100, active: false });
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;

    const currentPalette = AURA_PALETTES[activeAura] || AURA_PALETTES['Calm Amber'];

    // Resize handler using ResizeObserver
    const handleResize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = Math.max(10, Math.floor(rect.width));
      height = Math.max(10, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      initParticles(width, height);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Initialize particles tuned to the current Aura flow mechanics
    const initParticles = (w: number, h: number) => {
      const area = w * h;
      // Responsive particle count based on container dimension
      const count = Math.min(Math.max(Math.floor(area / 1800), 28), 65);
      const particles: Particle[] = [];
      const centerX = w / 2;
      const centerY = h / 2;

      for (let i = 0; i < count; i++) {
        const color = currentPalette.colors[i % currentPalette.colors.length];
        const baseRadius = Math.random() * (Math.max(w, h) * 0.45) + 10;
        const angle = Math.random() * Math.PI * 2;
        const phase = Math.random() * Math.PI * 2;
        const flare = i % 7 === 0;

        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          baseX: Math.random() * w,
          baseY: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 2.5 + 1.2,
          baseSize: Math.random() * 2.5 + 1.2,
          alpha: Math.random() * 0.5 + 0.25,
          maxAlpha: Math.random() * 0.4 + 0.5,
          color,
          glowColor: currentPalette.glow,
          phase,
          speed: Math.random() * 0.6 + 0.3,
          angle,
          radius: baseRadius,
          baseRadius,
          angularSpeed: (Math.random() * 0.015 + 0.005) * (i % 2 === 0 ? 1 : -1),
          flare,
          life: Math.random() * 100,
          maxLife: 100 + Math.random() * 120,
        });
      }

      particlesRef.current = particles;
    };

    handleResize();

    // Mouse / Touch interaction handlers
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !container) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!interactive || !container || e.touches.length === 0) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
        active: true,
      };
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleMouseLeave);

    // Main animation loop with Aura-specific flow patterns
    const render = () => {
      time += 1;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // ----------------------------------------------------
      // AURA-SPECIFIC FLOW PATTERN SIMULATION ENGINE
      // ----------------------------------------------------
      switch (activeAura) {
        case 'Calm Amber': {
          // Flow Pattern 1: Ascending Thermal Updraft with Harmonic Sway
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.y -= p.speed * 0.85;
            p.x += Math.sin(time * 0.02 + p.phase) * 0.65;

            // Breathing alpha pulsation
            p.alpha = (Math.sin(time * 0.03 + p.phase) * 0.2 + 0.5) * (isDark ? 0.9 : 0.7);

            // Wrap around bottom
            if (p.y < -15) {
              p.y = height + 10;
              p.x = Math.random() * width;
            }

            // Mouse avoidance
            if (mouse.active) {
              const dx = p.x - mouse.x;
              const dy = p.y - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 70 && dist > 0) {
                const force = (70 - dist) / 70;
                p.x += (dx / dist) * force * 3;
                p.y += (dy / dist) * force * 3;
              }
            }

            // Render warm golden ember with soft glow halo
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha * opacity;
            ctx.shadowBlur = isDark ? 8 : 4;
            ctx.shadowColor = p.glowColor;
            ctx.fill();

            // Additional micro-ember sparkles
            if (p.flare) {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
              ctx.fillStyle = p.color;
              ctx.globalAlpha = p.alpha * 0.25 * opacity;
              ctx.fill();
            }
          }
          break;
        }

        case 'Radiant Rose': {
          // Flow Pattern 2: Concentric Heart Lotus Bloom & Harmonic Expansion Ripples
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.radius += p.speed * 0.7;
            p.angle += p.angularSpeed * 0.8;
            p.life += 1;

            // Orbital position with soft petal wave modulation
            const waveMod = Math.sin(p.angle * 4 + time * 0.02) * 6;
            p.x = centerX + Math.cos(p.angle) * (p.radius + waveMod);
            p.y = centerY + Math.sin(p.angle) * (p.radius * 0.55 + waveMod);

            // Distance-based fade out towards edges
            const maxRadius = Math.max(width, height) * 0.55;
            const distRatio = Math.min(p.radius / maxRadius, 1);
            p.alpha = Math.sin(distRatio * Math.PI) * (isDark ? 0.85 : 0.65);

            // Re-birth in center
            if (p.radius > maxRadius || p.life > p.maxLife) {
              p.radius = Math.random() * 18 + 5;
              p.angle = Math.random() * Math.PI * 2;
              p.life = 0;
            }

            // Mouse interaction: vortex pull
            if (mouse.active) {
              const dx = p.x - mouse.x;
              const dy = p.y - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 60 && dist > 0) {
                p.x += Math.cos(time * 0.05 + i) * 2;
                p.y += Math.sin(time * 0.05 + i) * 2;
              }
            }

            // Render Rose Particle with radiant petal aura
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * (1 - distRatio * 0.3), 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0.05, p.alpha * opacity);
            ctx.shadowBlur = isDark ? 10 : 5;
            ctx.shadowColor = p.glowColor;
            ctx.fill();

            // Heart glow pulse ring
            if (i % 6 === 0) {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
              ctx.fillStyle = '#fda4af';
              ctx.globalAlpha = p.alpha * 0.2 * opacity;
              ctx.fill();
            }
          }
          break;
        }

        case 'Celestial Gold': {
          // Flow Pattern 3: Fibonacci Solar Vortex Swirl & Sparkling Diamond Star Flares
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.angle += p.angularSpeed * 1.25;
            p.radius = p.baseRadius + Math.sin(time * 0.03 + p.phase) * 14;

            p.x = centerX + Math.cos(p.angle) * p.radius;
            p.y = centerY + Math.sin(p.angle) * (p.radius * 0.65);

            p.alpha = (Math.sin(time * 0.05 + p.phase) * 0.3 + 0.6) * (isDark ? 0.95 : 0.75);

            // Draw Sparkling 4-Point Golden Star Flare on selected celestial nodes
            if (p.flare) {
              ctx.save();
              ctx.translate(p.x, p.y);
              ctx.rotate(time * 0.02 + p.phase);
              ctx.strokeStyle = '#ffffff';
              ctx.lineWidth = 1;
              ctx.globalAlpha = p.alpha * opacity;
              ctx.shadowBlur = 12;
              ctx.shadowColor = '#ffd700';

              const rayLen = p.size * 3.5;
              ctx.beginPath();
              ctx.moveTo(-rayLen, 0);
              ctx.lineTo(rayLen, 0);
              ctx.moveTo(0, -rayLen);
              ctx.lineTo(0, rayLen);
              ctx.stroke();

              ctx.restore();
            }

            // Render Core Golden Stardust
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha * opacity;
            ctx.shadowBlur = isDark ? 10 : 6;
            ctx.shadowColor = '#ffd700';
            ctx.fill();
          }
          break;
        }

        case 'Aetheric Violet': {
          // Flow Pattern 4: Quantum Wave-Interference & Astral Drift Streams
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.speed * 1.1;

            // Multidimensional wave harmonic
            p.y = p.baseY + 
              Math.sin(p.x * 0.018 + time * 0.03 + p.phase) * 12 + 
              Math.cos(p.x * 0.009 - time * 0.015) * 8;

            // Screen boundary loop
            if (p.x > width + 15) {
              p.x = -15;
              p.baseY = Math.random() * height;
            }

            p.alpha = (Math.sin(p.x * 0.02 + time * 0.02) * 0.25 + 0.55) * (isDark ? 0.9 : 0.7);

            // Draw Astral Stream Trail
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha * opacity;
            ctx.shadowBlur = isDark ? 9 : 5;
            ctx.shadowColor = p.glowColor;
            ctx.fill();

            // Quantum wave tail filament
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - p.size * 3.5, p.y - Math.sin(time * 0.05 + p.phase) * 2);
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 0.8;
            ctx.globalAlpha = p.alpha * 0.35 * opacity;
            ctx.stroke();
          }
          break;
        }

        case 'Emerald Clarity': {
          // Flow Pattern 5: Cascading Matrix Streams & Connected Constellation Filaments
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            // Diagonal descending cascade
            p.x += p.speed * 0.65;
            p.y += p.speed * 0.95;

            if (p.x > width + 10) p.x = -10;
            if (p.y > height + 10) p.y = -10;

            p.alpha = (Math.sin(time * 0.04 + p.phase) * 0.2 + 0.6) * (isDark ? 0.9 : 0.7);

            // Render emerald node
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha * opacity;
            ctx.shadowBlur = isDark ? 8 : 4;
            ctx.shadowColor = p.glowColor;
            ctx.fill();
          }

          // Dynamic Constellation Mesh Linking Nearby Emerald Particles
          ctx.lineWidth = 0.6;
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const p1 = particles[i];
              const p2 = particles[j];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 48) {
                const linkAlpha = (1 - dist / 48) * 0.35 * opacity;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = isDark ? '#34d399' : '#059669';
                ctx.globalAlpha = linkAlpha;
                ctx.stroke();
              }
            }
          }
          break;
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleMouseLeave);
    };
  }, [activeAura, theme, opacity, interactive]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 pointer-events-none overflow-hidden rounded-2xl ${className}`}
      aria-hidden="true"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block"
      />
    </div>
  );
};
