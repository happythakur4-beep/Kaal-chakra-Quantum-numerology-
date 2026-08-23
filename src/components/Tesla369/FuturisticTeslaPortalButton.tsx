import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { Sparkles, Zap, FastForward } from 'lucide-react';

interface FuturisticTeslaPortalButtonProps {
  onClick?: () => void;
  variant?: 'large' | 'compact' | 'hero' | 'header';
  className?: string;
  label?: string;
  subLabel?: string;
  showGlow?: boolean;
}

export const FuturisticTeslaPortalButton: React.FC<FuturisticTeslaPortalButtonProps> = ({
  onClick,
  variant = 'large',
  className = '',
  label = '369 TESLA PORTAL',
  subLabel = 'WARP ENGINE • SPEED OF LIGHT',
  showGlow = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 22;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -22;
    setTilt({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    try {
      cosmicAudio.playTeslaFrequency(963, 0.4);
    } catch {}
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      cosmicAudio.playBlackHoleWarp();
    } catch {}
    if (onClick) onClick();
  };

  const isCompact = variant === 'compact' || variant === 'header';
  const isHero = variant === 'hero';

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* Volumetric Holographic Plasma Glow Aura */}
      {showGlow && (
        <motion.div
          className="absolute -inset-2 rounded-2xl pointer-events-none blur-xl opacity-60 transition-opacity duration-300"
          animate={{
            opacity: isHovered ? 0.95 : 0.45,
            scale: isHovered ? [1, 1.08, 1] : 1,
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,215,0,0.6) 0%, rgba(168,85,247,0.4) 45%, rgba(6,182,212,0.3) 75%, transparent 100%)',
          }}
        />
      )}

      {/* Main 3D Futuristic Chassis Button */}
      <motion.button
        id="futuristic-369-portal-btn"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className={`relative z-10 flex items-center justify-between rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-150 group overflow-hidden border ${
          isHero
            ? 'px-6 py-4 sm:px-8 sm:py-5 min-w-[280px] sm:min-w-[340px]'
            : isCompact
            ? 'px-3 py-1.5 min-w-[130px] sm:min-w-[150px]'
            : 'px-5 py-3 sm:px-6 sm:py-3.5 min-w-[230px] sm:min-w-[260px]'
        } ${
          isHovered
            ? 'border-[#ffd700] shadow-[0_0_35px_rgba(255,215,0,0.6),0_15px_30px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.7)]'
            : 'border-[#d4af37]/60 shadow-[0_0_20px_rgba(212,175,55,0.3),0_10px_20px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.3)]'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(${
            isPressed ? -6 : isHovered ? 12 : 0
          }px)`,
          background:
            'linear-gradient(135deg, #0b0716 0%, #150d2a 35%, #050b14 70%, #1a1005 100%)',
        }}
      >
        {/* Layer 1: High-Tech Cybernetic Circuit Traces */}
        <div className="absolute inset-0 pointer-events-none opacity-35 group-hover:opacity-60 transition-opacity">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="50%" x2="25%" y2="50%" stroke="#ffd700" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="75%" y1="50%" x2="100%" y2="50%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="25%" cy="50%" r="2" fill="#ffd700" />
            <circle cx="75%" cy="50%" r="2" fill="#38bdf8" />
          </svg>
        </div>

        {/* Layer 2: Moving Holographic Shimmer Sheen */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40"
          animate={{
            backgroundPosition: ['0% 0%', '200% 200%'],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          style={{
            background:
              'linear-gradient(115deg, transparent 0%, rgba(255,215,0,0.5) 45%, rgba(6,182,212,0.6) 55%, transparent 100%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Left: 3D Holographic Core Sphere */}
        <div className="relative flex items-center justify-center flex-shrink-0 mr-3">
          {/* Outer Pulsing Gyro Ring */}
          <motion.div
            className={`rounded-full border border-amber-300/80 flex items-center justify-center ${
              isCompact ? 'w-6 h-6' : isHero ? 'w-11 h-11' : 'w-9 h-9'
            }`}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{
              boxShadow: '0 0 14px rgba(255,215,0,0.8), inset 0 0 8px rgba(168,85,247,0.6)',
            }}
          >
            {/* Inner Counter-Rotating Singularity Vortex */}
            <motion.div
              className={`rounded-full border border-cyan-300/90 flex items-center justify-center ${
                isCompact ? 'w-4 h-4' : isHero ? 'w-7 h-7' : 'w-6 h-6'
              }`}
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, #ffffff 0%, #f59e0b 40%, #000000 95%)',
              }}
            >
              <span className={`font-mono font-black text-amber-300 drop-shadow ${
                isCompact ? 'text-[8px]' : isHero ? 'text-xs' : 'text-[10px]'
              }`}>
                ⚡
              </span>
            </motion.div>
          </motion.div>

          {/* Micro status LED beacon */}
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </div>

        {/* Center: Futuristic Typography & Telemetry */}
        <div className="flex-1 text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-mono font-black tracking-wider uppercase bg-gradient-to-r from-amber-200 via-amber-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] ${
                isHero ? 'text-base sm:text-lg' : isCompact ? 'text-[11px]' : 'text-xs sm:text-sm'
              }`}
            >
              {label}
            </span>
          </div>

          {!isCompact && (
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-[9px] sm:text-[10px] text-cyan-300/85 tracking-widest uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                {subLabel}
              </span>
            </div>
          )}
        </div>

        {/* Right: Quantum 3-6-9 Trinity Node Pill / Light Speed Arrow */}
        <div className="ml-3 flex items-center gap-1 flex-shrink-0">
          <div className="flex flex-col items-center justify-center px-2 py-1 rounded-lg bg-black/60 border border-[#ffd700]/50 shadow-inner">
            <span className="font-mono font-black text-[9px] sm:text-[10px] text-amber-300 tracking-tighter">
              3•6•9
            </span>
          </div>
          <FastForward className={`text-cyan-400 group-hover:translate-x-1 transition-transform ${
            isCompact ? 'w-3 h-3' : 'w-4 h-4'
          }`} />
        </div>
      </motion.button>
    </div>
  );
};
