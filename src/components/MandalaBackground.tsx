import React from 'react';
import { ThemeMode } from '../types';
import { StarfieldCanvas } from './StarfieldCanvas';

interface MandalaBackgroundProps {
  theme: ThemeMode;
}

export const MandalaBackground: React.FC<MandalaBackgroundProps> = ({
  theme,
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="no-print fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-700">
      {/* Background Base Tint & Atmospheric Cosmos Nebulae */}
      {isDark ? (
        <>
          {/* Deep obsidian cosmic sky */}
          <div className="absolute inset-0 bg-[#06060c]" />
          
          {/* Layered cosmic space nebulae */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,70,0,0.18),rgba(255,255,255,0))]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,_rgba(212,175,55,0.14)_0%,_rgba(92,0,17,0.06)_50%,_transparent_75%)] blur-3xl opacity-80" />
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,_rgba(15,12,30,0.8)_0%,_transparent_70%)]" />
        </>
      ) : (
        <>
          {/* Celestial Ivory / Cream parchment background */}
          <div className="absolute inset-0 bg-[#faf7ee]" />
          
          {/* Warm golden radial aura */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,248,225,0.95)_0%,_rgba(245,238,218,0.8)_50%,_#ede4cf_100%)]" />
          <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.18)_0%,_transparent_75%)]" />
        </>
      )}

      {/* HTML5 Canvas Animated Moving & Twinkling Stars + Stardust Embers */}
      <StarfieldCanvas theme={theme} />
    </div>
  );
};

