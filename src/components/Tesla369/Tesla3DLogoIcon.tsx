import React, { useState } from 'react';
import { motion } from 'motion/react';

interface Tesla3DLogoIconProps {
  size?: number; // e.g. 36, 48, 64, 80, 120
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
  showGlow?: boolean;
}

export const Tesla3DLogoIcon: React.FC<Tesla3DLogoIconProps> = ({
  size = 48,
  className = '',
  interactive = true,
  onClick,
  showGlow = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotateOffset, setRotateOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
    setRotateOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateOffset({ x: 0, y: 0 });
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none cursor-pointer group ${className}`}
      style={{
        width: size,
        height: size,
        perspective: 800,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Outer Atmospheric Aura Glow */}
      {showGlow && (
        <motion.div
          className="absolute inset-0 rounded-full blur-xl pointer-events-none"
          animate={{
            scale: isHovered ? [1.15, 1.35, 1.15] : [1, 1.15, 1],
            opacity: isHovered ? 0.9 : 0.6,
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(168,85,247,0.4) 50%, rgba(6,182,212,0.2) 100%)',
          }}
        />
      )}

      {/* 3D Perspective Card / Torus Shell */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center rounded-2xl"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateOffset.y}deg) rotateY(${rotateOffset.x}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        animate={{
          rotateZ: isHovered ? [0, 5, -5, 0] : 0,
        }}
      >
        {/* Layer 1: Metallic Beveled 3D Base Shield with Golden Gradient */}
        <div
          className="absolute inset-0 rounded-2xl border border-[#ffd700]/70 shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_1px_3px_rgba(255,255,255,0.4)]"
          style={{
            background: 'linear-gradient(135deg, #180d2b 0%, #0d1b2a 50%, #2a1403 100%)',
            transform: 'translateZ(0px)',
          }}
        />

        {/* Layer 2: 3D SVG Gimbal Rings (Tesla Toroidal Coil Rings) */}
        <svg
          className="absolute inset-0 w-full h-full p-1 pointer-events-none"
          viewBox="0 0 100 100"
          style={{ transform: 'translateZ(12px)' }}
        >
          <defs>
            <linearGradient id="goldCyan3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <filter id="glow3d" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Orbital Orbit Ring 1 */}
          <ellipse
            cx="50"
            cy="50"
            rx="42"
            ry="18"
            fill="none"
            stroke="url(#goldCyan3d)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            opacity="0.85"
            transform="rotate(28 50 50)"
            filter="url(#glow3d)"
          />

          {/* Cross Orbital Orbit Ring 2 */}
          <ellipse
            cx="50"
            cy="50"
            rx="42"
            ry="18"
            fill="none"
            stroke="#ffd700"
            strokeWidth="1.2"
            strokeDasharray="5 3"
            opacity="0.75"
            transform="rotate(-28 50 50)"
          />

          {/* Divine 3-6-9 Equilateral Golden Triangle (Tesla Trinity Flux) */}
          <polygon
            points="50,16 80,74 20,74"
            fill="rgba(255, 215, 0, 0.08)"
            stroke="#ffd700"
            strokeWidth="1.6"
            strokeLinejoin="round"
            filter="url(#glow3d)"
          />
        </svg>

        {/* Layer 3: Central High-Energy Singularity Core Sphere */}
        <motion.div
          className="relative z-10 rounded-full border border-amber-300 shadow-[0_0_18px_rgba(255,215,0,0.9),inset_0_0_8px_rgba(255,255,255,0.8)] flex items-center justify-center"
          style={{
            width: size * 0.44,
            height: size * 0.44,
            background: 'radial-gradient(circle at 35% 35%, #fff7ed 0%, #f59e0b 45%, #7c2d12 100%)',
            transform: 'translateZ(24px)',
          }}
          animate={{
            scale: isHovered ? [1, 1.12, 1] : [1, 1.05, 1],
            boxShadow: isHovered
              ? [
                  '0 0 15px rgba(255,215,0,0.8), 0 0 25px rgba(168,85,247,0.6)',
                  '0 0 25px rgba(6,182,212,0.9), 0 0 35px rgba(255,215,0,0.8)',
                  '0 0 15px rgba(255,215,0,0.8), 0 0 25px rgba(168,85,247,0.6)',
                ]
              : '0 0 15px rgba(255,215,0,0.8)',
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Inner ⚡ Lightning / Quantum Singularity Spark */}
          <span className="text-gray-950 font-black font-mono text-[11px] sm:text-xs select-none filter drop-shadow">
            ⚡
          </span>
        </motion.div>

        {/* Layer 4: Floating 3D Golden Numbers: 3, 6, 9 positioned in 3D Space */}
        {/* Number 9 (Apex top) */}
        <motion.div
          className="absolute top-1 text-[#ffd700] font-mono font-black select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
          style={{
            fontSize: Math.max(10, size * 0.22),
            transform: 'translateZ(28px)',
          }}
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          9
        </motion.div>

        {/* Number 3 (Bottom Left) */}
        <motion.div
          className="absolute bottom-1.5 left-2 text-[#fbbf24] font-mono font-bold select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
          style={{
            fontSize: Math.max(9, size * 0.19),
            transform: 'translateZ(26px)',
          }}
          animate={{ x: [0, -1.5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          3
        </motion.div>

        {/* Number 6 (Bottom Right) */}
        <motion.div
          className="absolute bottom-1.5 right-2 text-[#22d3ee] font-mono font-bold select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
          style={{
            fontSize: Math.max(9, size * 0.19),
            transform: 'translateZ(26px)',
          }}
          animate={{ x: [0, 1.5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          6
        </motion.div>
      </motion.div>
    </div>
  );
};
