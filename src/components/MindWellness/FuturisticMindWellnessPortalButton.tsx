import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { MindWellness3DIcon } from './MindWellness3DIcon';
import { Sparkles, Brain, Dna, Activity, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FuturisticMindWellnessPortalButtonProps {
  onClick?: () => void;
  variant?: 'large' | 'compact' | 'hero' | 'header' | 'floating';
  className?: string;
  label?: string;
  subLabel?: string;
  showGlow?: boolean;
}

export const FuturisticMindWellnessPortalButton: React.FC<FuturisticMindWellnessPortalButtonProps> = ({
  onClick,
  variant = 'large',
  className = '',
  label = 'MIND WELLNESS',
  subLabel = 'QUANTUM CELLULAR HEALING • 528Hz',
  showGlow = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 24;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -24;
    setTilt({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    try {
      cosmicAudio.playTone(528, 0.08);
    } catch {}
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      cosmicAudio.playCellularDissolvePulse();
      confetti({
        particleCount: 35,
        spread: 65,
        origin: { y: 0.7 }
      });
    } catch {}
    if (onClick) onClick();
  };

  const isCompact = variant === 'compact' || variant === 'header';
  const isHero = variant === 'hero';
  const isFloating = variant === 'floating';

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* Volumetric Bio-Photonic Nebula Aura Glow */}
      {showGlow && (
        <motion.div
          className="absolute -inset-2 rounded-2xl pointer-events-none blur-xl opacity-60 transition-opacity duration-300"
          animate={{
            opacity: isHovered ? 0.95 : 0.45,
            scale: isHovered ? [1, 1.08, 1] : 1,
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.8) 0%, rgba(6,182,212,0.6) 40%, rgba(245,158,11,0.35) 75%, transparent 100%)',
          }}
        />
      )}

      {/* Interactive 3D Beveled Portal Trigger Button */}
      <motion.button
        id="mind-wellness-3d-portal-btn"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        animate={{
          rotateX: isHovered ? tilt.y : 0,
          rotateY: isHovered ? tilt.x : 0,
          scale: isPressed ? 0.94 : isHovered ? 1.04 : 1,
          translateZ: isHovered ? 16 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 22,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className={`group relative overflow-hidden flex items-center gap-2.5 rounded-2xl font-cinzel font-bold text-left cursor-pointer border transition-all duration-300 ${
          isHero
            ? 'px-6 py-3.5 sm:px-8 sm:py-4.5 text-base sm:text-lg border-emerald-400/80 shadow-[0_10px_35px_rgba(16,185,129,0.5)]'
            : isCompact
            ? 'px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs border-emerald-400/60 shadow-[0_4px_16px_rgba(16,185,129,0.35)]'
            : isFloating
            ? 'px-4 py-2.5 text-xs sm:text-sm border-emerald-400/80 shadow-[0_8px_25px_rgba(16,185,129,0.45)]'
            : 'px-5 py-3 text-sm border-emerald-400/70 shadow-[0_6px_24px_rgba(16,185,129,0.4)]'
        } bg-gradient-to-r from-[#041a12] via-[#09291e] to-[#041d18] text-white`}
      >
        {/* Animated Cyber Edge Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(52,211,153,0.15)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse pointer-events-none" />

        {/* 3D Holographic Brain & Biofield Icon */}
        <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
          <MindWellness3DIcon
            size={isHero ? 48 : isCompact ? 28 : isFloating ? 34 : 38}
            interactive={false}
            showGlow={false}
            showBadge={false}
          />
        </div>

        {/* Text Container with High-Contrast Cyber Luster */}
        <div className="relative z-10 flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span className="bg-gradient-to-r from-emerald-200 via-teal-200 to-amber-200 bg-clip-text text-transparent font-extrabold tracking-wide uppercase">
              {label}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {!isCompact && (
            <span className="text-[10px] font-mono tracking-widest text-emerald-400/90 font-medium uppercase mt-0.5">
              {subLabel}
            </span>
          )}
        </div>

        {/* Top-Right Micro Tech Corner Bracket */}
        <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-emerald-400/80 pointer-events-none" />
        <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-emerald-400/80 pointer-events-none" />
      </motion.button>
    </div>
  );
};
