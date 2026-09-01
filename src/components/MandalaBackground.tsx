import React from 'react';
import { ThemeMode, AuraType } from '../types';
import { StarfieldCanvas } from './StarfieldCanvas';
import { AURA_PALETTES } from '../data/auraPalettes';

interface MandalaBackgroundProps {
  theme: ThemeMode;
  activeAura?: AuraType;
}

export const MandalaBackground: React.FC<MandalaBackgroundProps> = ({
  theme,
  activeAura = 'Calm Amber'
}) => {
  const isDark = theme === 'dark';
  const auraConfig = AURA_PALETTES[activeAura] || AURA_PALETTES['Calm Amber'];

  return (
    <div className="no-print fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-700">
      {/* Background Base Tint & Atmospheric Cosmos Nebulae */}
      {isDark ? (
        <>
          {/* Deep obsidian cosmic sky */}
          <div className="absolute inset-0 bg-[#06060c]" />
          
          {/* Dynamic Aura-attuned cosmic space nebulae */}
          <div 
            className="absolute inset-0 opacity-40 transition-all duration-1000"
            style={{
              background: `radial-gradient(ellipse 80% 80% at 50% -20%, ${auraConfig.glow}, transparent 70%)`
            }}
          />
          <div 
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[550px] blur-3xl opacity-75 transition-all duration-1000"
            style={{
              background: `radial-gradient(circle, ${auraConfig.glow} 0%, rgba(15,10,30,0.15) 50%, transparent 75%)`
            }}
          />
          <div 
            className="absolute bottom-0 inset-x-0 h-1/2 opacity-60 transition-all duration-1000"
            style={{
              background: `radial-gradient(ellipse at bottom, ${auraConfig.glow} 0%, transparent 70%)`
            }}
          />
        </>
      ) : (
        <>
          {/* Buddhist Monastery Deep Indigo & Saffron Theme */}
          <div className="absolute inset-0 bg-[#1e1b4b]" />
          
          {/* Majestic Buddha & Lotus Photography Overlay */}
          <div 
            className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center transition-all duration-1000"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop')` // Serene Buddha Statue
            }}
          />
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-screen transition-all duration-1000"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?q=80&w=2070&auto=format&fit=crop')` // Lotus flower
            }}
          />

          {/* Saffron & Gold spiritual aura wash */}
          <div 
            className="absolute inset-0 opacity-80 transition-all duration-1000 mix-blend-color"
            style={{
              background: `radial-gradient(circle at 50% 15%, rgba(217, 119, 6, 0.4) 0%, rgba(154, 52, 18, 0.4) 45%, rgba(30, 27, 75, 0.9) 100%)`
            }}
          />
          
          {/* Top ethereal gold glow */}
          <div 
            className="absolute top-0 inset-x-0 h-[600px] opacity-40 transition-all duration-1000"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, #fbbf24 0%, transparent 70%)`
            }}
          />
          {/* Earthy mud/terracotta bottom base */}
          <div 
            className="absolute bottom-0 inset-x-0 h-80 opacity-60 transition-all duration-1000"
            style={{
              background: `radial-gradient(ellipse at bottom, #451a03 0%, transparent 70%)`
            }}
          />
        </>
      )}

      {/* HTML5 Canvas Animated Moving & Twinkling Stars + Stardust Embers */}
      <StarfieldCanvas theme={theme} activeAura={activeAura} />
    </div>
  );
};


