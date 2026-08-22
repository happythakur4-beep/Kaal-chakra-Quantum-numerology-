import React from 'react';
import { ThemeMode } from '../types';
import { MANDALA_BG_IMAGE } from '../data/mockData';

interface DetailedChakraMandalaProps {
  theme: ThemeMode;
  className?: string;
  size?: 'normal' | 'hero';
}

export const DetailedChakraMandala: React.FC<DetailedChakraMandalaProps> = ({
  theme,
  className = '',
  size = 'hero',
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}>
      
      {/* 1. Deep Radial Ambient Golden Glow Backdrop */}
      <div 
        className={`absolute rounded-full blur-[70px] sm:blur-[90px] transition-all duration-1000 ${
          size === 'hero' ? 'w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] lg:w-[850px] lg:h-[850px]' : 'w-[320px] h-[320px]'
        } ${
          isDark 
            ? 'bg-[radial-gradient(circle,_rgba(255,215,0,0.22)_0%,_rgba(212,175,55,0.12)_45%,_rgba(138,0,26,0.05)_70%,_transparent_100%)] opacity-95' 
            : 'bg-[radial-gradient(circle,_rgba(245,215,130,0.5)_0%,_rgba(212,175,55,0.25)_50%,_transparent_100%)] opacity-80'
        }`}
      />

      {/* 2. Radial Golden God-Rays (Divine Occult Light Burst) */}
      <div className="absolute inset-0 flex items-center justify-center overflow-visible">
        <div 
          className={`w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] lg:w-[950px] lg:h-[950px] rounded-full animate-spin-slow opacity-30 mix-blend-screen pointer-events-none ${
            isDark ? 'block' : 'opacity-15'
          }`}
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,215,0,0.18) 15deg, transparent 30deg, rgba(255,242,209,0.25) 45deg, transparent 60deg, rgba(212,175,55,0.15) 75deg, transparent 90deg, rgba(255,215,0,0.2) 105deg, transparent 120deg, rgba(255,242,209,0.18) 135deg, transparent 150deg, rgba(212,175,55,0.22) 165deg, transparent 180deg, rgba(255,215,0,0.18) 195deg, transparent 210deg, rgba(255,242,209,0.25) 225deg, transparent 240deg, rgba(212,175,55,0.15) 255deg, transparent 270deg, rgba(255,215,0,0.2) 285deg, transparent 300deg, rgba(255,242,209,0.18) 315deg, transparent 330deg, rgba(212,175,55,0.22) 345deg, transparent 360deg)',
            filter: 'blur(4px)',
          }}
        />
      </div>

      {/* 3. Outer Sacred Geometric Ring with Sanskrit & Astrological Markers */}
      <svg 
        className={`absolute w-[460px] h-[460px] sm:w-[680px] sm:h-[680px] lg:w-[880px] lg:h-[880px] animate-spin-reverse-slow ${
          isDark ? 'opacity-40' : 'opacity-25'
        }`} 
        viewBox="0 0 400 400"
      >
        <circle cx="200" cy="200" r="195" fill="none" stroke="#d4af37" strokeWidth="0.75" strokeDasharray="3 4" />
        <circle cx="200" cy="200" r="185" fill="none" stroke="#ffd700" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="175" fill="none" stroke="#d4af37" strokeWidth="0.75" strokeDasharray="1 6" />

        {/* 24 Rays on outer perimeter */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const rad = (angle * Math.PI) / 180;
          const x1 = 200 + 175 * Math.cos(rad);
          const y1 = 200 + 175 * Math.sin(rad);
          const x2 = 200 + 195 * Math.cos(rad);
          const y2 = 200 + 195 * Math.sin(rad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#d4af37"
              strokeWidth="0.75"
              opacity={i % 2 === 0 ? 0.9 : 0.4}
            />
          );
        })}
      </svg>

      {/* 4. High-Fidelity Intricate Golden Mandala Artwork */}
      <div className="relative flex items-center justify-center">
        <img
          src={MANDALA_BG_IMAGE}
          alt="Sacred Golden Chakra Mandala"
          className={`object-contain transition-all duration-700 animate-spin-slow ${
            size === 'hero' 
              ? 'w-[420px] h-[420px] sm:w-[620px] sm:h-[620px] lg:w-[820px] lg:h-[820px]' 
              : 'w-[280px] h-[280px]'
          } ${
            isDark
              ? 'opacity-85 mix-blend-screen filter drop-shadow-[0_0_35px_rgba(212,175,55,0.7)] drop-shadow-[0_0_70px_rgba(255,215,0,0.35)]'
              : 'opacity-40 mix-blend-multiply filter drop-shadow-[0_0_20px_rgba(180,140,50,0.3)]'
          }`}
        />

        {/* 5. Inner Sacred Sri Yantra Interlocked Triangles Layer */}
        <svg 
          className={`absolute w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px] animate-spin-reverse-slow ${
            isDark ? 'opacity-70' : 'opacity-35'
          }`} 
          viewBox="0 0 200 200"
        >
          {/* Concentric Golden Lotus Rings */}
          <circle cx="100" cy="100" r="90" fill="none" stroke="#ffd700" strokeWidth="0.8" strokeDasharray="4 2" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="#d4af37" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="#ffd700" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="#fff2cc" strokeWidth="0.5" strokeDasharray="2 3" />

          {/* Upward Shiva Triangles */}
          <polygon points="100,20 170,140 30,140" fill="none" stroke="#ffd700" strokeWidth="0.9" opacity="0.8" />
          <polygon points="100,35 155,130 45,130" fill="none" stroke="#fdf2d1" strokeWidth="0.75" opacity="0.7" />
          <polygon points="100,50 142,120 58,120" fill="none" stroke="#d4af37" strokeWidth="0.6" opacity="0.6" />

          {/* Downward Shakti Triangles */}
          <polygon points="100,180 30,60 170,60" fill="none" stroke="#ffd700" strokeWidth="0.9" opacity="0.8" />
          <polygon points="100,165 45,70 155,70" fill="none" stroke="#fdf2d1" strokeWidth="0.75" opacity="0.7" />
          <polygon points="100,150 58,80 142,80" fill="none" stroke="#d4af37" strokeWidth="0.6" opacity="0.6" />

          {/* 8-pointed star in center */}
          <polygon points="100,65 110,88 135,100 110,112 100,135 90,112 65,100 90,88" fill="rgba(255,215,0,0.12)" stroke="#fff2cc" strokeWidth="0.7" />
        </svg>

        {/* 6. Central Divine Bindu Starburst & Lens Flare */}
        <div className="absolute flex items-center justify-center pointer-events-none">
          {/* Intense Core Flare Glow */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white blur-md animate-pulse opacity-95 shadow-[0_0_30px_#ffd700]" />
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#ffd700] blur-xl animate-pulse opacity-80" />

          {/* Horizontal and Vertical High-Intensity Light Flare Bars */}
          <div className="absolute w-36 sm:w-60 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 filter drop-shadow-[0_0_8px_#ffd700]" />
          <div className="absolute h-36 sm:h-60 w-[1.5px] bg-gradient-to-b from-transparent via-white to-transparent opacity-90 filter drop-shadow-[0_0_8px_#ffd700]" />
          
          {/* Diagonal 45-degree flare beams */}
          <div className="absolute w-28 sm:w-44 h-[1px] rotate-45 bg-gradient-to-r from-transparent via-[#fff2cc] to-transparent opacity-75" />
          <div className="absolute w-28 sm:w-44 h-[1px] -rotate-45 bg-gradient-to-r from-transparent via-[#fff2cc] to-transparent opacity-75" />

          {/* Central Golden Sparkling Diamond */}
          <div className="w-4 h-4 bg-white rotate-45 border border-[#ffd700] shadow-[0_0_12px_#ffffff] animate-ping opacity-60" />
        </div>

      </div>

    </div>
  );
};
