import React, { useState } from 'react';
import { ScreenType, ThemeMode } from '../types';
import { ASTROSAGE_NAV_MENU, AstroSageCategory, SubFeatureItem } from '../data/astroSageDirectory';
import { 
  X, 
  ChevronRight, 
  ChevronDown, 
  User, 
  Sparkles, 
  Home, 
  Star, 
  Compass, 
  Calculator, 
  Layers, 
  FileText, 
  Gem, 
  Calendar, 
  BookOpen, 
  Heart, 
  SlidersHorizontal, 
  Sun, 
  MoreHorizontal,
  Bot,
  ExternalLink,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynthesizer';

interface AstroSageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onNavigate: (screen: ScreenType) => void;
  onOpenSubFeatureModal: (category: AstroSageCategory | null, subFeature?: SubFeatureItem) => void;
  onOpenAstrologerChat: (astrologerId?: string) => void;
}

export const AstroSageDrawer: React.FC<AstroSageDrawerProps> = ({
  isOpen,
  onClose,
  theme,
  onNavigate,
  onOpenSubFeatureModal,
  onOpenAstrologerChat
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('2026');
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  const getCategoryIcon = (iconName: string, color: string) => {
    const props = { className: "w-4 h-4 flex-shrink-0", style: { color } };
    switch (iconName) {
      case 'Home': return <Home {...props} />;
      case 'Scale': return <Scale {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Star': return <Star {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'Calculator': return <Calculator {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'Gem': return <Gem {...props} />;
      case 'Calendar': return <Calendar {...props} />;
      case 'BookOpen': return <BookOpen {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'SlidersHorizontal': return <SlidersHorizontal {...props} />;
      case 'Sun': return <Sun {...props} />;
      case 'MoreHorizontal': return <MoreHorizontal {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  const handleToggleCategory = (catId: string) => {
    try { cosmicAudio.playFrequency(432); } catch {}
    setExpandedCategory(prev => prev === catId ? null : catId);
  };

  const handleSubFeatureClick = (sub: SubFeatureItem) => {
    try { cosmicAudio.playFrequency(528); } catch {}
    if (sub.targetScreen) {
      onNavigate(sub.targetScreen);
      onClose();
    } else {
      onOpenSubFeatureModal(null, sub);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
      />

      {/* Drawer Panel */}
      <div 
        className={`fixed inset-y-0 left-0 max-w-xs w-full shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          isDark ? 'bg-[#0f0f18] text-gray-100 border-r border-[#d4af37]/30' : 'bg-[#faf6ee] text-[#2c1d06] border-r border-[#c5a059]/40'
        }`}
      >
        {/* Top Header Bar matching Screenshot 1 */}
        <div className="bg-gradient-to-r from-[#f59e0b] via-[#d97706] to-[#b45309] p-3.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/40 shadow-inner">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-cinzel font-bold text-white tracking-wide">
                Kaal Chakra Seeker
              </div>
              <div className="text-[10px] font-serif text-amber-100 opacity-90">
                Wallet: ₹0 • Vedic Wisdom Sanctum
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onOpenAstrologerChat();
                onClose();
              }}
              className="px-2 py-1 rounded bg-white text-gray-900 text-[11px] font-cinzel font-bold flex items-center gap-1 shadow hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              <span>Astrologer</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Accordion Category List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#d4af37]/15">
          {ASTROSAGE_NAV_MENU.map((category) => {
            const isExpanded = expandedCategory === category.id;

            return (
              <div key={category.id} className="transition-colors">
                {/* Category Header Row */}
                <button
                  onClick={() => handleToggleCategory(category.id)}
                  className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors cursor-pointer group ${
                    isExpanded 
                      ? (isDark ? 'bg-[#1a1a2e] text-[#ffd700]' : 'bg-amber-100/60 text-[#8a6514]')
                      : (isDark ? 'hover:bg-white/5' : 'hover:bg-amber-50')
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 rounded-md bg-black/30 border border-white/10 group-hover:scale-105 transition-transform">
                      {getCategoryIcon(category.iconName, category.color)}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-cinzel font-bold tracking-wide flex items-center gap-1.5">
                        <span className="truncate">{category.title}</span>
                        {category.isNew && (
                          <span className="px-1.5 py-0.2 bg-gradient-to-r from-red-600 to-rose-500 text-white text-[9px] font-bold uppercase rounded tracking-widest shadow-sm">
                            NEW
                          </span>
                        )}
                      </div>
                      {category.hindiTitle && (
                        <div className="text-[10px] font-serif opacity-60">
                          {category.hindiTitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-gray-400 group-hover:text-amber-400 transition-colors">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-[#d4af37]" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Sub-Features Collapsible Drawer Section */}
                {isExpanded && (
                  <div className={`py-1.5 pl-6 pr-3 space-y-1 animate-fade-in ${
                    isDark ? 'bg-black/40' : 'bg-amber-50/50'
                  }`}>
                    {category.subFeatures.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSubFeatureClick(sub)}
                        className={`w-full p-2 rounded-lg text-left text-xs transition-all cursor-pointer group flex items-start justify-between gap-2 ${
                          isDark 
                            ? 'hover:bg-[#d4af37]/15 hover:text-[#ffd700] text-gray-300' 
                            : 'hover:bg-amber-100 hover:text-[#8a6514] text-gray-700'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="font-cinzel font-semibold flex items-center gap-1.5">
                            <span className="text-[#d4af37] text-[10px]">✦</span>
                            <span className="truncate">{sub.title}</span>
                            {sub.badge && (
                              <span className="px-1 py-0.2 rounded text-[8px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                {sub.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] font-serif text-gray-400 line-clamp-1 mt-0.5 pl-2.5">
                            {sub.description}
                          </p>
                        </div>
                        <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-100 text-amber-400 mt-1 flex-shrink-0" />
                      </button>
                    ))}

                    <div className="pt-1 pb-1">
                      <button
                        onClick={() => {
                          onOpenSubFeatureModal(category);
                          onClose();
                        }}
                        className="w-full py-1.5 text-center text-[10px] font-cinzel font-bold text-[#d4af37] border border-[#d4af37]/30 rounded-lg hover:bg-[#d4af37]/10 transition-colors cursor-pointer"
                      >
                        View All {category.title} Features & Tools →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Drawer Footer */}
        <div className="p-3 border-t border-[#d4af37]/20 text-center bg-black/20">
          <div className="text-[10px] font-serif text-gray-400">
            Kaal Chakra Vedic Shastra Architecture • 2026-2027
          </div>
        </div>
      </div>
    </div>
  );
};
