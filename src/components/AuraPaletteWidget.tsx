import React, { useState, useEffect, useRef } from 'react';
import { ThemeMode, AuraType } from '../types';
import { AURA_PALETTES, AURA_ORDER, applyAuraCssVariables } from '../data/auraPalettes';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Palette, 
  Check, 
  Volume2, 
  Play, 
  Pause, 
  X,
  Flame,
  Sun,
  Heart,
  Eye,
  Radio,
  Zap,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cosmicAudio } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

interface AuraPaletteWidgetProps {
  theme: ThemeMode;
  activeAura: AuraType;
  onSelectAura: (aura: AuraType) => void;
}

export const AuraPaletteWidget: React.FC<AuraPaletteWidgetProps> = ({
  theme,
  activeAura,
  onSelectAura
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAutoCycling, setIsAutoCycling] = useState(false);
  const [isPlayingTone, setIsPlayingTone] = useState(false);
  const autoCycleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isDark = theme === 'dark';

  const currentConfig = AURA_PALETTES[activeAura] || AURA_PALETTES['Calm Amber'];

  // Apply CSS variables on activeAura change
  useEffect(() => {
    applyAuraCssVariables(activeAura, isDark);
  }, [activeAura, isDark]);

  // Handle Auto-Cycling
  useEffect(() => {
    if (isAutoCycling) {
      autoCycleTimerRef.current = setInterval(() => {
        const currentIndex = AURA_ORDER.indexOf(activeAura);
        const nextIndex = (currentIndex + 1) % AURA_ORDER.length;
        const nextAura = AURA_ORDER[nextIndex];
        onSelectAura(nextAura);
      }, 12000);
    } else if (autoCycleTimerRef.current) {
      clearInterval(autoCycleTimerRef.current);
    }

    return () => {
      if (autoCycleTimerRef.current) {
        clearInterval(autoCycleTimerRef.current);
      }
    };
  }, [isAutoCycling, activeAura, onSelectAura]);

  const handleSelectAuraWithFx = (aura: AuraType, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    onSelectAura(aura);

    const config = AURA_PALETTES[aura];
    if (config) {
      try {
        cosmicAudio.playFrequency(config.frequencyHz);
      } catch (err) {
        // audio context fallback
      }

      // Small confetti sparkle
      try {
        confetti({
          particleCount: 28,
          spread: 45,
          origin: { x: 0.88, y: 0.88 },
          colors: [config.primary, config.secondary, '#ffffff', config.tertiary]
        });
      } catch (err) {}
    }
  };

  const handlePrevAura = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = AURA_ORDER.indexOf(activeAura);
    const prevIndex = (currentIndex - 1 + AURA_ORDER.length) % AURA_ORDER.length;
    handleSelectAuraWithFx(AURA_ORDER[prevIndex]);
  };

  const handleNextAura = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = AURA_ORDER.indexOf(activeAura);
    const nextIndex = (currentIndex + 1) % AURA_ORDER.length;
    handleSelectAuraWithFx(AURA_ORDER[nextIndex]);
  };

  const handlePlayTone = (frequencyHz: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingTone(true);
    try {
      cosmicAudio.playFrequency(frequencyHz);
      setTimeout(() => setIsPlayingTone(false), 2400);
    } catch (err) {
      setIsPlayingTone(false);
    }
  };

  const getAuraIcon = (aura: AuraType) => {
    switch (aura) {
      case 'Calm Amber': return <Sun className="w-4 h-4 text-amber-400" />;
      case 'Celestial Gold': return <Zap className="w-4 h-4 text-yellow-300" />;
      case 'Radiant Rose': return <Heart className="w-4 h-4 text-rose-400" />;
      case 'Aetheric Violet': return <Eye className="w-4 h-4 text-purple-400" />;
      case 'Emerald Clarity': return <Activity className="w-4 h-4 text-emerald-400" />;
      default: return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 select-none flex flex-col items-end">
      
      {/* Expanded Palette Popover Tray */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`mb-3 w-80 sm:w-96 rounded-3xl p-5 shadow-2xl backdrop-blur-2xl border transition-all duration-300 ${
              isDark 
                ? 'bg-[#0b0b14]/95 text-gray-100' 
                : 'bg-[#fffaf0]/98 text-[#2a1704] border-amber-400/80 shadow-[0_12px_40px_rgba(180,120,40,0.2)]'
            }`}
            style={{
              borderColor: currentConfig.border,
              boxShadow: isDark 
                ? `0 12px 40px ${currentConfig.glow}, 0 0 1px ${currentConfig.primary}`
                : `0 12px 35px rgba(180,120,40,0.25), 0 0 0 1px ${currentConfig.primary}`
            }}
          >
            {/* Tray Header */}
            <div className={`flex items-center justify-between pb-3 mb-3 border-b ${isDark ? 'border-white/10' : 'border-amber-900/15'}`}>
              <div className="flex items-center gap-2.5">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center shadow-inner border ${isDark ? 'border-white/20' : 'border-amber-500/30'}`}
                  style={{ backgroundColor: currentConfig.glow }}
                >
                  <Palette className="w-4 h-4" style={{ color: currentConfig.primary }} />
                </div>
                <div>
                  <h3 className={`text-xs font-cinzel font-bold tracking-wider flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-[#2a1704]'}`}>
                    <span>AURA PALETTE & PARTICLES</span>
                  </h3>
                  <p className={`text-[10px] font-serif ${isDark ? 'text-gray-400' : 'text-[#78350f]'}`}>
                    दिव्य आभा तरंग • Cosmic Resonance Tuning
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-black hover:bg-amber-100'
                }`}
                title="Close Panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Active Aura Detail Card */}
            <div 
              className="p-3.5 rounded-2xl mb-4 border transition-all duration-300 relative overflow-hidden"
              style={{
                background: isDark 
                  ? `linear-gradient(135deg, ${currentConfig.glow} 0%, rgba(0,0,0,0.4) 100%)`
                  : `linear-gradient(135deg, ${currentConfig.glow} 0%, rgba(255,250,240,0.9) 100%)`,
                borderColor: currentConfig.border
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center border shadow-md"
                    style={{
                      backgroundColor: currentConfig.primary,
                      borderColor: currentConfig.secondary
                    }}
                  >
                    {getAuraIcon(activeAura)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm font-cinzel font-bold ${isDark ? 'text-white' : 'text-[#2a1704]'}`}>
                        {currentConfig.name}
                      </span>
                      <span className={`text-[11px] font-serif ${isDark ? 'text-amber-200 opacity-90' : 'text-[#78350f] font-semibold'}`}>
                        ({currentConfig.hindiName})
                      </span>
                    </div>
                    <span 
                      className="text-[10px] font-semibold tracking-wider font-cinzel px-2 py-0.5 rounded-full inline-block mt-0.5"
                      style={{
                        backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.85)',
                        color: isDark ? currentConfig.secondary : '#78350f',
                        border: `1px solid ${currentConfig.border}`
                      }}
                    >
                      {currentConfig.frequencyHz} Hz • {currentConfig.chakra}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => handlePlayTone(currentConfig.frequencyHz, e)}
                  className={`p-2 rounded-xl border text-xs flex items-center gap-1 transition-all cursor-pointer group ${
                    isDark 
                      ? 'bg-black/40 hover:bg-black/70 border-white/20' 
                      : 'bg-white/90 hover:bg-amber-100/90 border-amber-400/60 shadow-sm'
                  }`}
                  title="Play Solfeggio Harmonic Tone"
                >
                  <Volume2 
                    className={`w-3.5 h-3.5 ${
                      isPlayingTone 
                        ? 'animate-bounce text-emerald-500' 
                        : isDark ? 'text-gray-300 group-hover:text-white' : 'text-amber-800'
                    }`} 
                  />
                  <span className={`text-[10px] font-mono ${isDark ? 'text-gray-200' : 'text-[#451a03] font-bold'}`}>
                    {currentConfig.frequencyHz}Hz
                  </span>
                </button>
              </div>

              <p className={`text-[11px] font-serif mt-2 leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#452b12] font-medium'}`}>
                {currentConfig.description}
              </p>

              <div className={`mt-2 pt-2 border-t flex items-center justify-between text-[10px] font-mono ${
                isDark ? 'border-white/10 text-gray-300' : 'border-amber-900/15 text-[#5c3e1e]'
              }`}>
                <span>तत्व: {currentConfig.element}</span>
                <span className={`font-serif font-semibold ${isDark ? 'text-amber-200' : 'text-[#78350f]'}`}>{currentConfig.mantra}</span>
              </div>
            </div>

            {/* Aura Swatches List */}
            <div className="space-y-1.5 mb-4">
              <div className={`text-[10px] font-cinzel font-bold uppercase tracking-wider mb-1 px-1 ${
                isDark ? 'text-gray-400' : 'text-[#78350f]'
              }`}>
                Select Aura Frequency
              </div>
              {AURA_ORDER.map((auraKey) => {
                const config = AURA_PALETTES[auraKey];
                const isSelected = activeAura === auraKey;

                return (
                  <button
                    key={auraKey}
                    onClick={(e) => handleSelectAuraWithFx(auraKey, e)}
                    className={`w-full p-2.5 rounded-2xl flex items-center justify-between border text-left transition-all duration-200 cursor-pointer group ${
                      isSelected
                        ? isDark
                          ? 'border-white/40 shadow-md bg-white/10'
                          : 'border-amber-500/80 shadow-sm bg-amber-100/80 font-semibold'
                        : isDark
                          ? 'border-transparent hover:border-white/15 hover:bg-white/5'
                          : 'border-transparent hover:border-amber-300 hover:bg-amber-50/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Swatch Orb */}
                      <div className="relative">
                        <div 
                          className="w-6 h-6 rounded-full shadow-inner flex items-center justify-center border border-white/40 transition-transform group-hover:scale-110"
                          style={{
                            background: `linear-gradient(135deg, ${config.primary} 0%, ${config.secondary} 100%)`,
                            boxShadow: `0 0 10px ${config.glow}`
                          }}
                        />
                        {isSelected && (
                          <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-30" />
                        )}
                      </div>

                      <div>
                        <div className="text-xs font-cinzel font-bold flex items-center gap-1.5">
                          <span className={isSelected ? (isDark ? 'text-white' : 'text-[#2a1704]') : (isDark ? 'text-gray-200 group-hover:text-white' : 'text-[#452b12]')}>
                            {config.name}
                          </span>
                          <span className={`text-[10px] font-serif ${isDark ? 'text-gray-400' : 'text-[#78350f]'}`}>
                            {config.hindiName}
                          </span>
                        </div>
                        <div className={`text-[10px] font-serif ${isDark ? 'text-gray-400' : 'text-[#694827]'}`}>
                          {config.archetype}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span 
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
                        style={{
                          borderColor: config.border,
                          color: config.primary,
                          backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.9)'
                        }}
                      >
                        {config.frequencyHz}Hz
                      </span>

                      {isSelected ? (
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center text-gray-950 shadow"
                          style={{ backgroundColor: config.secondary }}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer Options (Auto-Cycle & Quick Tip) */}
            <div className={`pt-3 border-t flex items-center justify-between ${isDark ? 'border-white/10' : 'border-amber-900/15'}`}>
              <button
                onClick={() => setIsAutoCycling(prev => !prev)}
                className={`px-3 py-1.5 rounded-xl text-xs font-cinzel font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                  isAutoCycling 
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]' 
                    : isDark 
                      ? 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                      : 'bg-amber-100/60 border-amber-300 text-[#5c3e1e] hover:bg-amber-100'
                }`}
                title="Automatically transition aura every 12 seconds"
              >
                {isAutoCycling ? (
                  <>
                    <Pause className="w-3 h-3 text-emerald-400" />
                    <span>Cosmic Drift: ON</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    <span>Cosmic Drift (Auto)</span>
                  </>
                )}
              </button>

              <span className={`text-[10px] font-serif italic ${isDark ? 'text-gray-400' : 'text-[#78350f]'}`}>
                Attunes particles & stars
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Capsule Button */}
      <motion.div
        className={`flex items-center gap-1 p-1 rounded-full shadow-2xl backdrop-blur-xl border transition-all duration-500 cursor-pointer group ${
          isDark 
            ? 'bg-[#0b0b14]/92 text-white' 
            : 'bg-[#fffaf0]/95 text-[#2a1704] shadow-[0_4px_25px_rgba(180,120,40,0.25)] border-amber-400/80'
        }`}
        style={{
          borderColor: currentConfig.border,
          boxShadow: isDark 
            ? `0 4px 25px ${currentConfig.glow}, 0 0 20px ${currentConfig.glowIntense}`
            : `0 4px 20px rgba(180,120,40,0.25), 0 0 10px ${currentConfig.glow}`
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        {/* Left Cycle Arrow */}
        <button
          onClick={handlePrevAura}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
            isDark ? 'text-gray-300 hover:text-white hover:bg-white/15' : 'text-amber-800 hover:text-black hover:bg-amber-200/60'
          }`}
          title="Previous Aura Theme"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Center Aura Status Orb & Name */}
        <div 
          onClick={() => setIsOpen(prev => !prev)}
          className={`flex items-center gap-2 px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
            isDark ? 'hover:bg-white/10' : 'hover:bg-amber-100/80'
          }`}
          title="Open Aura Palette (दिव्य आभा तरंग)"
        >
          {/* Pulsating Orb with Aura Color */}
          <div className="relative flex items-center justify-center">
            <motion.div 
              className="w-5 h-5 rounded-full shadow-inner border border-white/50"
              animate={{
                scale: [1, 1.15, 1],
                boxShadow: [
                  `0 0 6px ${currentConfig.glow}`,
                  `0 0 16px ${currentConfig.glowIntense}`,
                  `0 0 6px ${currentConfig.glow}`
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: `linear-gradient(135deg, ${currentConfig.primary} 0%, ${currentConfig.secondary} 100%)`
              }}
            />
            <div className="absolute inset-0 rounded-full border border-white/80 animate-ping opacity-40 pointer-events-none" />
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1">
              <span className={`text-xs font-cinzel font-bold tracking-wide ${isDark ? 'text-white' : 'text-[#2a1704]'}`}>
                {currentConfig.name}
              </span>
              <Sparkles className="w-3 h-3 text-amber-500 group-hover:rotate-45 transition-transform" />
            </div>
            <div className={`text-[9px] font-mono flex items-center gap-1 ${isDark ? 'text-gray-300' : 'text-[#694827]'}`}>
              <span>{currentConfig.frequencyHz}Hz</span>
              <span>•</span>
              <span className={isDark ? 'text-amber-200' : 'text-amber-800 font-semibold'}>{currentConfig.hindiName}</span>
            </div>
          </div>
        </div>

        {/* Right Cycle Arrow */}
        <button
          onClick={handleNextAura}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
            isDark ? 'text-gray-300 hover:text-white hover:bg-white/15' : 'text-amber-800 hover:text-black hover:bg-amber-200/60'
          }`}
          title="Next Aura Theme"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};
