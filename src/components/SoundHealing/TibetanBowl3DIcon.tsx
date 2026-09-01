import React, { useState } from 'react';
import { motion } from 'motion/react';

interface TibetanBowl3DIconProps {
  size?: number;
  interactive?: boolean;
  showGlow?: boolean;
  ringing?: boolean;
}

export const TibetanBowl3DIcon: React.FC<TibetanBowl3DIconProps> = ({
  size = 40,
  interactive = true,
  showGlow = true,
  ringing = false
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.4);
    setRotateY(x * 0.4);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="relative flex items-center justify-center select-none cursor-pointer"
      style={{ width: size, height: size, perspective: '600px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer ambient gold/bronze aura */}
      {showGlow && (
        <motion.div
          animate={{
            scale: ringing ? [1, 1.35, 1] : [1, 1.15, 1],
            opacity: ringing ? [0.6, 0.9, 0.6] : [0.3, 0.55, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: ringing ? 1.4 : 3.2,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-600/40 via-yellow-400/40 to-emerald-500/30 blur-md pointer-events-none"
        />
      )}

      {/* 3D Tilted Tibetan Singing Bowl Container */}
      <motion.div
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(217,119,6,0.5)]"
        >
          <defs>
            <linearGradient id="bowlGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="30%" stopColor="#eab308" />
              <stop offset="70%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            <linearGradient id="bowlInnerRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="50%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>

            <radialGradient id="bowlWaterCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
            </radialGradient>

            <radialGradient id="goldShine" cx="35%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#fef08a" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sound waves emitting upwards */}
          {ringing && (
            <>
              <motion.ellipse
                cx="50"
                cy="32"
                rx="34"
                ry="12"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.5"
                initial={{ opacity: 0.8, scale: 0.8 }}
                animate={{ opacity: 0, scale: 1.8, y: -20 }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeOut' }}
              />
              <motion.ellipse
                cx="50"
                cy="32"
                rx="34"
                ry="12"
                fill="none"
                stroke="#facc15"
                strokeWidth="1.5"
                initial={{ opacity: 0.8, scale: 0.8 }}
                animate={{ opacity: 0, scale: 1.8, y: -20 }}
                transition={{ repeat: Infinity, duration: 1.6, delay: 0.8, ease: 'easeOut' }}
              />
            </>
          )}

          {/* Base of Bowl (Hammered Bronze Body) */}
          <path
            d="M 18 42 C 18 78, 30 88, 50 88 C 70 88, 82 78, 82 42 Z"
            fill="url(#bowlGoldGrad)"
            stroke="#92400e"
            strokeWidth="1.5"
          />

          {/* Inner Depth / Resonant Cavity */}
          <ellipse
            cx="50"
            cy="42"
            rx="32"
            ry="11"
            fill="url(#bowlWaterCore)"
            stroke="url(#bowlInnerRim)"
            strokeWidth="2.5"
          />

          {/* Sacred OM / Tibetan Seed in Center */}
          <circle cx="50" cy="42" r="4" fill="#fef08a" opacity="0.9" />

          {/* Metallic Hammered Surface Highlights */}
          <path
            d="M 22 46 C 25 72, 34 82, 50 85 C 40 80, 26 70, 22 46 Z"
            fill="url(#goldShine)"
          />

          {/* Traditional Wooden Mallet resting or striking */}
          <line
            x1="68"
            y1="22"
            x2="88"
            y2="70"
            stroke="#451a03"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="80"
            y1="52"
            x2="88"
            y2="70"
            stroke="#dc2626"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  );
};
