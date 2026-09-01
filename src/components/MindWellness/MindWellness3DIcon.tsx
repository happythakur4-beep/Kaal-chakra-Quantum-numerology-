import React, { useState } from 'react';
import { motion } from 'motion/react';

interface MindWellness3DIconProps {
  size?: number; // e.g. 36, 44, 56, 72, 96, 120
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
  showGlow?: boolean;
  showBadge?: boolean;
  badgeText?: string;
}

export const MindWellness3DIcon: React.FC<MindWellness3DIconProps> = ({
  size = 48,
  className = '',
  interactive = true,
  onClick,
  showGlow = true,
  showBadge = false,
  badgeText = '528Hz'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotateOffset, setRotateOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 35;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -35;
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
        perspective: 900,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      title="Mind Wellness: Quantum Cellular Healing & Smart Health Portal"
    >
      {/* Outer Bio-Photonic Nebula Aura Glow */}
      {showGlow && (
        <motion.div
          className="absolute inset-0 rounded-full blur-xl pointer-events-none"
          animate={{
            scale: isHovered ? [1.2, 1.45, 1.2] : [1, 1.2, 1],
            opacity: isHovered ? 0.95 : 0.65,
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.7) 0%, rgba(6,182,212,0.45) 45%, rgba(245,158,11,0.3) 80%, transparent 100%)',
          }}
        />
      )}

      {/* Rotating 3D Quantum Gyroscope Ring (Emerald-Cyan Bio-Ring) */}
      <motion.div
        className="absolute inset-0 rounded-full border border-emerald-400/40 pointer-events-none"
        animate={{
          rotate: 360,
          scale: isHovered ? [1, 1.08, 1] : 1,
        }}
        transition={{
          rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }}
        style={{
          borderTopColor: '#34d399',
          borderRightColor: 'rgba(6, 182, 212, 0.8)',
          borderBottomColor: 'rgba(16, 185, 129, 0.2)',
          borderLeftColor: '#67e8f9',
          boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)',
        }}
      />

      {/* Counter-Rotating Outer Sacred Geometry Ring */}
      <motion.div
        className="absolute inset-1 rounded-full border border-dashed border-cyan-400/30 pointer-events-none"
        animate={{
          rotate: -360,
        }}
        transition={{
          rotate: { duration: 18, repeat: Infinity, ease: 'linear' },
        }}
      />

      {/* 3D Tilting Core Container */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: isHovered ? rotateOffset.y : 0,
          rotateY: isHovered ? rotateOffset.x : 0,
          scale: isHovered ? 1.12 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* 3D Shadow Base Disk */}
        <div
          className="absolute inset-1.5 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #0d2818 0%, #05130b 60%, #020804 100%)',
            boxShadow: `
              inset 0 2px 4px rgba(52, 211, 153, 0.6),
              inset 0 -2px 5px rgba(0, 0, 0, 0.9),
              0 6px 16px rgba(0, 0, 0, 0.7),
              0 0 12px rgba(16, 185, 129, 0.3)
            `,
            transform: 'translateZ(-6px)',
          }}
        />

        {/* Futuristic SVG 3D Holographic Brain & Bio-Photonic Lotus Core */}
        <svg
          viewBox="0 0 100 100"
          className="relative z-10 w-[82%] h-[82%] drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
          style={{ transform: 'translateZ(14px)' }}
        >
          <defs>
            {/* Holographic Cyan-Emerald Metallic Gradient */}
            <linearGradient id="mindBioGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="30%" stopColor="#10b981" />
              <stop offset="70%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            {/* Golden Prana Core Gradient */}
            <linearGradient id="pranaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* 3D Depth Shadow Filter */}
            <filter id="mind3dGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#059669" floodOpacity="0.8" />
              <feDropShadow dx="0" dy="-1" stdDeviation="1" floodColor="#38bdf8" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Background Sacred Hexagonal Shield */}
          <polygon
            points="50,14 82,32 82,68 50,86 18,68 18,32"
            fill="none"
            stroke="url(#mindBioGrad)"
            strokeWidth="1.2"
            strokeDasharray="3 2"
            opacity="0.6"
          />

          {/* Left Brain Hemisphere (Neural Lattice with Synapses) */}
          <path
            d="M 47,26 C 36,26 26,34 26,48 C 26,58 32,66 38,72 C 42,76 46,78 47,80 L 47,26 Z"
            fill="none"
            stroke="url(#mindBioGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="url(#mind3dGlow)"
          />
          {/* Inner Left Gyri Folds */}
          <path
            d="M 33,40 C 37,42 41,38 46,42 M 30,52 C 36,54 40,50 46,54 M 34,64 C 38,66 42,62 46,65"
            fill="none"
            stroke="#a7f3d0"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Right Brain Hemisphere (Consciousness Hologram) */}
          <path
            d="M 53,26 C 64,26 74,34 74,48 C 74,58 68,66 62,72 C 58,76 54,78 53,80 L 53,26 Z"
            fill="none"
            stroke="url(#mindBioGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="url(#mind3dGlow)"
          />
          {/* Inner Right Gyri Folds */}
          <path
            d="M 67,40 C 63,42 59,38 54,42 M 70,52 C 64,54 60,50 54,54 M 66,64 C 62,66 58,62 54,65"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Central Quantum DNA Helix & Third Eye Emitter */}
          <line x1="50" y1="20" x2="50" y2="82" stroke="url(#pranaGoldGrad)" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Central Ajna Third Eye Radiant Diamond */}
          <polygon
            points="50,22 55,28 50,34 45,28"
            fill="url(#pranaGoldGrad)"
            filter="url(#mind3dGlow)"
          />

          {/* Glowing Neural Synaptic Nodes */}
          <circle cx="28" cy="46" r="2.2" fill="#34d399" />
          <circle cx="72" cy="46" r="2.2" fill="#38bdf8" />
          <circle cx="38" cy="34" r="2" fill="#6ee7b7" />
          <circle cx="62" cy="34" r="2" fill="#7dd3fc" />
          <circle cx="36" cy="68" r="2" fill="#10b981" />
          <circle cx="64" cy="68" r="2" fill="#06b6d4" />
          <circle cx="50" cy="50" r="3.2" fill="#fbbf24" />
          
          {/* Subtle Dynamic Pulse Wave at base */}
          <path
            d="M 38,88 Q 44,84 50,88 T 62,88"
            fill="none"
            stroke="#34d399"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>

        {/* Electric Synaptic Sparks overlay */}
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-emerald-300 pointer-events-none shadow-[0_0_8px_#34d399]"
          animate={{
            x: [0, -12, 10, -8, 0],
            y: [0, 8, -10, 12, 0],
            opacity: [0, 1, 0.8, 1, 0],
            scale: [0.5, 1.2, 0.8, 1.4, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transform: 'translateZ(18px)' }}
        />
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300 pointer-events-none shadow-[0_0_8px_#67e8f9]"
          animate={{
            x: [0, 10, -12, 6, 0],
            y: [0, -10, 8, -6, 0],
            opacity: [0, 0.9, 0.4, 1, 0],
            scale: [0.6, 1.3, 0.7, 1.1, 0.6],
          }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          style={{ transform: 'translateZ(18px)' }}
        />
      </motion.div>

      {/* Floating Micro Frequency / Mode Badge */}
      {showBadge && (
        <span
          className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-emerald-500 text-black border border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.8)] z-20 pointer-events-none uppercase tracking-tighter"
          style={{ transform: 'translateZ(24px)' }}
        >
          {badgeText}
        </span>
      )}
    </div>
  );
};
