import React, { useEffect, useRef } from 'react';

interface SacredGeometryLiveCanvasProps {
  type: 'flower-of-life' | 'venus-rose' | 'fibonacci-spiral' | 'pineal-dmt' | 'torus-field' | 'gold-sphere' | 'chakras' | 'galaxy';
  primaryColor?: string;
  glowColor?: string;
  frequencyHz?: number;
  interactive?: boolean;
  className?: string;
  size?: number;
}

export const SacredGeometryLiveCanvas: React.FC<SacredGeometryLiveCanvasProps> = ({
  type = 'flower-of-life',
  primaryColor = '#ffd700',
  glowColor = 'rgba(255, 215, 0, 0.6)',
  frequencyHz = 528,
  interactive = true,
  className = '',
  size = 280,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const dpr = window.devicePixelRatio || 1;
    const width = size;
    const height = size;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const cx = width / 2;
    const cy = height / 2;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Background subtle radial depth
      const bgGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, width * 0.48);
      bgGrad.addColorStop(0, 'rgba(15, 10, 30, 0.4)');
      bgGrad.addColorStop(0.8, 'rgba(5, 5, 10, 0.8)');
      bgGrad.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(cx, cy);

      if (type === 'flower-of-life' || type === 'sacred-flower' as any) {
        // FLOWER OF LIFE SACRED GEOMETRY
        const r = width * 0.16;
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 1.4;
        ctx.shadowColor = primaryColor;
        ctx.shadowBlur = 12;

        // Central Circle
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();

        // 6 Surrounding Petals
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3 + time * 0.1;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.stroke();

          // Outer Layer 12 Circles
          for (let j = 0; j < 2; j++) {
            const angle2 = angle + (j * Math.PI) / 6;
            const x2 = Math.cos(angle2) * r * 1.732;
            const y2 = Math.sin(angle2) * r * 1.732;
            ctx.beginPath();
            ctx.arc(x2, y2, r, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // Concentric outer bounding circles
        ctx.beginPath();
        ctx.arc(0, 0, r * 2.8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, r * 2.95, 0, Math.PI * 2);
        ctx.stroke();

      } else if (type === 'venus-rose') {
        // VENUS-EARTH 5-PETAL ROSE OF VENUS (8:5 PHI RATIO ORBITAL DANCE)
        const maxR = width * 0.42;
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 1.2;
        ctx.shadowColor = '#f472b6';
        ctx.shadowBlur = 10;

        ctx.beginPath();
        const steps = 360;
        for (let i = 0; i <= steps; i++) {
          const theta = (i * Math.PI * 2) / steps;
          // 5-lobed rose mathematical curve: r = a * cos(k * theta)
          const k = 5;
          const rCurve = maxR * (0.4 + 0.55 * Math.sin(k * (theta + time * 0.2)));
          const x = Math.cos(theta) * rCurve;
          const y = Math.sin(theta) * rCurve;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        // Inner orbital golden ratio pentagram
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let p = 0; p < 5; p++) {
          const pAngle = (p * 4 * Math.PI) / 5 - Math.PI / 2 + time * 0.15;
          const px = Math.cos(pAngle) * (maxR * 0.65);
          const py = Math.sin(pAngle) * (maxR * 0.65);
          if (p === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        // Center glowing Venus core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 5 + Math.sin(time * 3) * 1.5, 0, Math.PI * 2);
        ctx.fill();

      } else if (type === 'fibonacci-spiral' || type === 'spiral' as any) {
        // FIBONACCI GOLDEN RATIO SPIRAL
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 2;
        ctx.shadowColor = primaryColor;
        ctx.shadowBlur = 14;

        ctx.beginPath();
        const maxTurns = 4.2;
        const totalSteps = 240;
        for (let s = 0; s <= totalSteps; s++) {
          const tAngle = (s / totalSteps) * Math.PI * 2 * maxTurns + time * 0.4;
          const rad = Math.pow(1.18, tAngle) * 1.6;
          if (rad > width * 0.46) break;
          const x = Math.cos(tAngle) * rad;
          const y = Math.sin(tAngle) * rad;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Pulsing vortex center
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 4 + Math.sin(time * 4) * 2, 0, Math.PI * 2);
        ctx.fill();

      } else if (type === 'pineal-dmt' || type === 'pineal' as any) {
        // PINEAL GLAND PIEZO-ELECTRIC BIO-PHOTON AURA
        const baseR = width * 0.28;
        
        // Radiating frequency waves
        for (let w = 0; w < 4; w++) {
          const waveR = (baseR * 0.6 + (time * 25 + w * 25) % (width * 0.44));
          const alpha = Math.max(0, 1 - waveR / (width * 0.44));
          ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.7})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(0, 0, waveR, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Crystalline pineal cone shape
        ctx.fillStyle = 'rgba(192, 132, 252, 0.85)';
        ctx.shadowColor = '#c084fc';
        ctx.shadowBlur = 20;

        ctx.beginPath();
        ctx.ellipse(0, 0, baseR * 0.7, baseR * 0.95, 0, 0, Math.PI * 2);
        ctx.fill();

        // Third eye pupil / DMT portal center
        const eyeGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, baseR * 0.5);
        eyeGrad.addColorStop(0, '#ffffff');
        eyeGrad.addColorStop(0.3, '#38bdf8');
        eyeGrad.addColorStop(0.7, '#6366f1');
        eyeGrad.addColorStop(1, '#090814');
        ctx.fillStyle = eyeGrad;
        ctx.beginPath();
        ctx.arc(0, 0, baseR * 0.45, 0, Math.PI * 2);
        ctx.fill();

      } else if (type === 'torus-field' || type === 'torus' as any) {
        // 3D MAGNETIC TORUS VORTEX FLUX
        const maxR = width * 0.38;
        ctx.lineWidth = 1.2;
        const rings = 12;

        for (let i = 0; i < rings; i++) {
          const angle = (i * Math.PI) / rings + time * 0.2;
          const tilt = Math.cos(angle);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.3 + 0.5 * Math.abs(tilt)})`;
          ctx.shadowColor = primaryColor;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.ellipse(0, 0, maxR, maxR * Math.abs(tilt) * 0.6, angle, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Glowing core singularity
        const coreGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, maxR * 0.4);
        coreGrad.addColorStop(0, '#ffffff');
        coreGrad.addColorStop(0.4, primaryColor);
        coreGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(0, 0, maxR * 0.35, 0, Math.PI * 2);
        ctx.fill();

      } else if (type === 'gold-sphere') {
        // 888 / 777 QUANTUM WEALTH ABUNDANCE SPHERE
        const maxR = width * 0.36;
        
        // Solar corona flares
        const flares = 18;
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
        ctx.lineWidth = 1.5;
        for (let f = 0; f < flares; f++) {
          const fAngle = (f * Math.PI * 2) / flares + time * 0.15;
          const flareLen = maxR * (1.1 + 0.25 * Math.sin(time * 4 + f));
          ctx.beginPath();
          ctx.moveTo(Math.cos(fAngle) * maxR * 0.8, Math.sin(fAngle) * maxR * 0.8);
          ctx.lineTo(Math.cos(fAngle) * flareLen, Math.sin(fAngle) * flareLen);
          ctx.stroke();
        }

        // Glowing golden orb
        const goldGrad = ctx.createRadialGradient(-maxR * 0.2, -maxR * 0.2, 5, 0, 0, maxR);
        goldGrad.addColorStop(0, '#ffffff');
        goldGrad.addColorStop(0.3, '#fef08a');
        goldGrad.addColorStop(0.6, '#eab308');
        goldGrad.addColorStop(0.85, '#ca8a04');
        goldGrad.addColorStop(1, '#78350f');
        ctx.fillStyle = goldGrad;
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.arc(0, 0, maxR, 0, Math.PI * 2);
        ctx.fill();

      } else if (type === 'chakras') {
        // 7 CHAKRAS ENERGY COLUMN
        const chakraColors = [
          '#ef4444', // Root 396
          '#f97316', // Sacral 417
          '#eab308', // Solar 528
          '#10b981', // Heart 639
          '#06b6d4', // Throat 741
          '#6366f1', // Third Eye 852
          '#a855f7', // Crown 963
        ];
        const step = (height * 0.75) / 6;
        const startY = -(height * 0.75) / 2;

        // Sushumna central light channel
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(0, startY - 10);
        ctx.lineTo(0, -startY + 10);
        ctx.stroke();

        // 7 Nodes
        chakraColors.forEach((col, idx) => {
          const cyNode = startY + idx * step;
          const nodeR = 9 + Math.sin(time * 3 + idx) * 2;

          ctx.fillStyle = col;
          ctx.shadowColor = col;
          ctx.shadowBlur = 16;
          ctx.beginPath();
          ctx.arc(0, cyNode, nodeR, 0, Math.PI * 2);
          ctx.fill();

          // Ripple circle
          const ripR = nodeR + ((time * 15 + idx * 5) % 18);
          const ripAlpha = Math.max(0, 1 - (ripR - nodeR) / 18);
          ctx.strokeStyle = col;
          ctx.globalAlpha = ripAlpha;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, cyNode, ripR, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
        });

      } else {
        // DEFAULT GALAXY ORB
        const maxR = width * 0.36;
        const orbGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, maxR);
        orbGrad.addColorStop(0, '#ffffff');
        orbGrad.addColorStop(0.3, primaryColor);
        orbGrad.addColorStop(0.7, '#1e1b4b');
        orbGrad.addColorStop(1, '#000000');
        ctx.fillStyle = orbGrad;
        ctx.shadowColor = primaryColor;
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(0, 0, maxR, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [type, primaryColor, glowColor, frequencyHz, size]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width: `${size}px`, height: `${size}px` }}
        className="rounded-2xl block"
      />
    </div>
  );
};
