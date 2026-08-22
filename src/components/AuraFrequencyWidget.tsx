import React, { useState } from 'react';
import { ThemeMode, AuraType } from '../types';
import { Sparkles, Radio, Sliders, Waves, Eye } from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynthesizer';
import { AuraFieldVisualization, AURA_CONFIGS } from './AuraFieldVisualization';

interface AuraFrequencyWidgetProps {
  theme: ThemeMode;
  activeAura: AuraType;
  onSelectAura: (aura: AuraType) => void;
  onOpenSettings?: () => void;
}

const AURA_OPTIONS: { name: AuraType; color: string; ringColor: string; freq: number; label: string }[] = [
  { name: 'Calm Amber', color: '#d4af37', ringColor: 'rgba(212, 175, 55, 0.5)', freq: 432, label: '432 Hz • Harmony' },
  { name: 'Radiant Rose', color: '#f472b6', ringColor: 'rgba(244, 114, 182, 0.5)', freq: 528, label: '528 Hz • Heart DNA' },
  { name: 'Celestial Gold', color: '#fbbf24', ringColor: 'rgba(251, 191, 36, 0.6)', freq: 639, label: '639 Hz • Cosmic Light' },
  { name: 'Aetheric Violet', color: '#c084fc', ringColor: 'rgba(192, 132, 252, 0.5)', freq: 852, label: '852 Hz • Intuition' },
  { name: 'Emerald Clarity', color: '#10b981', ringColor: 'rgba(16, 185, 129, 0.5)', freq: 963, label: '963 Hz • Equilibrium' },
];

export const AuraFrequencyWidget: React.FC<AuraFrequencyWidgetProps> = ({
  theme,
  activeAura,
  onSelectAura,
  onOpenSettings,
}) => {
  const [liveSync, setLiveSync] = useState(false);
  const [showD3Field, setShowD3Field] = useState(true);
  const isDark = theme === 'dark';

  const handleToggleSync = () => {
    const nextState = !liveSync;
    setLiveSync(nextState);
    if (nextState) {
      const selected = AURA_OPTIONS.find(a => a.name === activeAura) || AURA_OPTIONS[0];
      cosmicAudio.playFrequency(selected.freq);
    } else {
      cosmicAudio.stop();
    }
  };

  const handlePickAura = (opt: typeof AURA_OPTIONS[0]) => {
    onSelectAura(opt.name);
    if (liveSync) {
      cosmicAudio.playFrequency(opt.freq);
    }
  };

  return (
    <div 
      id="aura-frequency-card"
      className={`rounded-xl p-5 border transition-all duration-300 relative overflow-hidden ${
        isDark ? 'glassmorphism-dark text-gray-200' : 'glassmorphism-light text-[#3b2b0a]'
      }`}
    >
      {/* Visual Frequency Wave Background when active */}
      {liveSync && (
        <div className="absolute top-0 right-0 p-3 opacity-20 pointer-events-none animate-pulse">
          <Waves className="w-16 h-16 text-[#d4af37]" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-base font-cinzel font-semibold tracking-wide flex items-center gap-2 ${
          isDark ? 'text-[#fdf2d1]' : 'text-[#422e06]'
        }`}>
          <Radio className={`w-4 h-4 ${liveSync ? 'text-amber-400 animate-spin-slow' : 'text-[#d4af37]'}`} />
          Aura Frequency
        </h3>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowD3Field(!showD3Field)}
            title="Toggle D3 Interactive Field"
            className={`p-1 rounded-md text-xs transition-colors cursor-pointer ${
              showD3Field ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40' : 'text-gray-400'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          {liveSync && (
            <span className="inline-flex items-center gap-1 text-[0.68rem] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              LIVE
            </span>
          )}
        </div>
      </div>

      {/* Embedded D3 Interactive Aura Field Visualization */}
      {showD3Field && (
        <div className="mb-4">
          <AuraFieldVisualization
            theme={theme}
            activeAura={activeAura}
            onSelectAura={onSelectAura}
            interactive={true}
            height={150}
            compact={true}
          />
        </div>
      )}

      <p className={`text-xs mb-3 font-cinzel ${isDark ? 'text-gray-400' : 'text-amber-900/70'}`}>
        Active Aura Resonance Selection
      </p>

      {/* Aura Options Selector */}
      <div className="space-y-1.5 mb-4">
        {AURA_OPTIONS.map((opt) => {
          const isSelected = activeAura === opt.name;
          return (
            <button
              key={opt.name}
              id={`aura-btn-${opt.name.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => handlePickAura(opt)}
              className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-serif transition-all cursor-pointer ${
                isSelected
                  ? isDark
                    ? 'bg-amber-500/15 border border-[#d4af37]/60 shadow-[0_0_12px_rgba(212,175,55,0.25)] font-semibold'
                    : 'bg-amber-100/90 border border-[#c5a059] shadow-sm font-semibold'
                  : isDark
                    ? 'hover:bg-white/5 border border-transparent'
                    : 'hover:bg-amber-50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3.5 h-3.5 rounded-full flex-shrink-0 transition-transform duration-300"
                  style={{
                    backgroundColor: opt.color,
                    boxShadow: isSelected ? `0 0 10px ${opt.ringColor}` : 'none',
                    transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
                <span className={isDark ? (isSelected ? 'text-[#fdf2d1]' : 'text-gray-300') : 'text-[#3b2b0a]'}>
                  {opt.name}
                </span>
              </div>
              <span className={`text-[0.68rem] font-mono ${isDark ? 'text-gray-400' : 'text-amber-800/70'}`}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Live Vibration Sync Toggle */}
      <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between">
        <label htmlFor="live-vibration-toggle" className={`text-xs font-serif cursor-pointer ${isDark ? 'text-gray-300' : 'text-[#422e06]'}`}>
          Live Vibration Harmonic Sync
        </label>
        <button
          id="live-vibration-toggle"
          onClick={handleToggleSync}
          className={`w-11 h-6 rounded-full p-1 transition-colors relative cursor-pointer ${
            liveSync ? 'bg-[#d4af37]' : isDark ? 'bg-gray-800' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-transform ${
              liveSync ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Cosmic Settings Action */}
      <button
        id="aura-cosmic-settings-btn"
        onClick={onOpenSettings}
        className={`w-full mt-3 py-1.5 px-3 rounded-lg border text-xs font-cinzel tracking-wider text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
          isDark
            ? 'border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10'
            : 'border-[#c5a059]/60 text-[#8a6514] hover:bg-amber-100/60'
        }`}
      >
        <Sliders className="w-3.5 h-3.5" />
        <span>Open Quantum Practice</span>
      </button>
    </div>
  );
};
