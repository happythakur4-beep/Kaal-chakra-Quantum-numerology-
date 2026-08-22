import React, { useState } from 'react';
import { ScreenType, ThemeMode } from '../types';
import { AstroSageCategory, SubFeatureItem, AstroGridTile } from '../data/astroSageDirectory';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Calendar, 
  Star, 
  Heart, 
  Calculator, 
  Layers, 
  BookOpen, 
  Gem, 
  Bot, 
  CheckCircle2, 
  SlidersHorizontal,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

interface AstroSageFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  category: AstroSageCategory | null;
  gridTile: AstroGridTile | null;
  singleSubFeature?: SubFeatureItem | null;
  onNavigate: (screen: ScreenType) => void;
  onOpenAstrologerChat: (astrologerId?: string) => void;
}

export const AstroSageFeatureModal: React.FC<AstroSageFeatureModalProps> = ({
  isOpen,
  onClose,
  theme,
  category,
  gridTile,
  singleSubFeature,
  onNavigate,
  onOpenAstrologerChat
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  const title = gridTile ? gridTile.title : (category ? category.title : (singleSubFeature ? singleSubFeature.title : 'Kaal Chakra Vedic Tool'));
  const hindiTitle = gridTile?.hindiTitle || category?.hindiTitle;
  const description = gridTile?.description || singleSubFeature?.description || 'Comprehensive Kaal Chakra Vedic Shastra tool with instant deep calculations and remedial solutions.';
  const subFeatures: SubFeatureItem[] = gridTile?.subFeatures || category?.subFeatures || (singleSubFeature ? [singleSubFeature] : []);

  const handleSubAction = (sub: SubFeatureItem) => {
    try {
      cosmicAudio.playFrequency(528);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffd700', '#d4af37', '#ff6b6b']
      });
    } catch {}

    if (sub.targetScreen) {
      onNavigate(sub.targetScreen);
      onClose();
    } else if (sub.actionType === 'chat') {
      onOpenAstrologerChat();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Container */}
      <div 
        className="relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden z-10 my-8"
        style={{
          backgroundColor: isDark ? '#10101c' : '#fdfaf2',
          borderColor: isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(197, 160, 89, 0.5)',
        }}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#996515] via-[#d4af37] to-[#8a5a00] p-5 text-white flex items-center justify-between shadow-lg relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black/30 border border-white/30 flex items-center justify-center shadow-inner">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-cinzel font-bold tracking-wide">
                  {title}
                </h3>
                {gridTile?.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white text-gray-900 shadow">
                    {gridTile.badge}
                  </span>
                )}
              </div>
              {hindiTitle && (
                <p className="text-xs font-serif text-amber-100 opacity-90">
                  {hindiTitle}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Main Description */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-black/40 border-[#d4af37]/20 text-gray-300' : 'bg-amber-50/70 border-amber-200 text-gray-800'
          }`}>
            <p className="text-xs sm:text-sm font-serif leading-relaxed">
              {description}
            </p>
          </div>

          {/* Sub-Features Grid / List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-cinzel font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Available Vedic Sub-Features & Calculators ({subFeatures.length})
              </h4>
              <span className="text-[10px] font-mono text-gray-400">Click to Open Tool</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {subFeatures.map((sub, idx) => (
                <div
                  key={sub.id || idx}
                  onClick={() => handleSubAction(sub)}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-sm ${
                    isDark 
                      ? 'bg-black/50 border-[#d4af37]/25 hover:border-[#ffd700] hover:bg-[#d4af37]/10' 
                      : 'bg-white border-amber-200/80 hover:border-[#8a6514] hover:bg-amber-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h5 className="text-xs font-cinzel font-bold text-[#fdf2d1] group-hover:text-[#ffd700] flex items-center gap-1.5">
                        <span className="text-[#d4af37]">✦</span>
                        <span>{sub.title}</span>
                      </h5>
                      {sub.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {sub.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-serif text-gray-400 group-hover:text-gray-300 line-clamp-2">
                      {sub.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-cinzel font-bold text-amber-400 group-hover:text-[#ffd700]">
                    <span>Launch Sub-Engine</span>
                    <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Footer inside Modal */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#d4af37]/20">
            <button
              onClick={() => {
                onOpenAstrologerChat();
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-gray-900 font-cinzel font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Bot className="w-4 h-4 text-gray-900" />
              <span>Ask an Astrologer About This</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#d4af37]/40 text-amber-200 hover:bg-[#d4af37]/10 font-cinzel text-xs cursor-pointer"
            >
              Close Window
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
