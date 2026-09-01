import React from 'react';
import { ScreenType, ThemeMode, AuraType, UserProfile } from '../../types';
import { AstroGridTile } from '../../data/astroSageDirectory';
import { SRI_YANTRA_LOGO } from '../../data/mockData';
import { SacredGeometryParticles } from '../SacredGeometryParticles';
import { AuraPaletteWidget } from '../AuraPaletteWidget';
import { AURA_PALETTES } from '../../data/auraPalettes';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Heart, 
  Bot, 
  Menu, 
  Share2, 
  Sun,
  LayoutGrid,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { QuickAccessPillsRow } from '../QuickAccessPillsRow';

interface LandingHeroScreenProps {
  theme: ThemeMode;
  user?: UserProfile;
  activeAura?: AuraType;
  onNavigate: (screen: ScreenType) => void;
  onUnlockReport: (name: string, email: string) => void;
  onOpenDrawer: () => void;
  onOpenAstrologerChat: (astrologerId?: string) => void;
  onOpenFeatureModal: (gridTile: AstroGridTile) => void;
  onOpenShareModal?: () => void;
  onOpenMindWellnessPortal?: () => void;
  onUpdateUserKarma?: (newPunya: number, newPapa: number) => void;
  onSelectAura?: (aura: AuraType) => void;
}

export const LandingHeroScreen: React.FC<LandingHeroScreenProps> = ({
  theme,
  activeAura = 'Calm Amber',
  onNavigate,
  onOpenDrawer,
  onOpenAstrologerChat,
  onOpenShareModal,
  onSelectAura,
}) => {
  const isDark = theme === 'dark';
  const currentAuraConfig = AURA_PALETTES[activeAura] || AURA_PALETTES['Calm Amber'];

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 min-h-[75vh] flex flex-col items-center justify-center text-center">

      {/* Floating Side Options Access Button (Persistent on Desktop & Mobile) */}
      <div className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40">
        <motion.button
          onClick={onOpenDrawer}
          whileHover={{ scale: 1.06, x: 4 }}
          whileTap={{ scale: 0.94 }}
          className={`flex items-center gap-2 px-3.5 py-3 rounded-2xl border backdrop-blur-md cursor-pointer group select-none transition-all duration-300 ${
            isDark 
              ? 'bg-black/85 border-amber-400/70 shadow-[0_0_25px_rgba(245,158,11,0.4)] text-amber-200 hover:bg-black' 
              : 'bg-[#fffaf0] border-amber-600/60 shadow-[0_4px_20px_rgba(180,120,40,0.25)] text-[#5c2405] hover:bg-amber-100/90'
          }`}
          title="Open Side Features & Options (सर्व विद्या एवं साधन सूची)"
        >
          <Menu className={`w-5 h-5 group-hover:rotate-90 transition-transform duration-300 ${isDark ? 'text-amber-400' : 'text-amber-700'}`} />
          <span className="hidden md:inline font-cinzel font-bold text-xs tracking-wider">
            शास्त्र सूची • Options
          </span>
        </motion.button>
      </div>

      {/* Floating Aura Palette Widget in the Corner of the Homepage */}
      {onSelectAura && (
        <AuraPaletteWidget 
          theme={theme}
          activeAura={activeAura}
          onSelectAura={onSelectAura}
        />
      )}

      {/* Background Ambient Aura Glow */}
      <div 
        className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25 transition-all duration-1000" 
        style={{ backgroundColor: currentAuraConfig.primary }}
      />
      <div 
        className="absolute w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 transition-all duration-1000" 
        style={{ backgroundColor: currentAuraConfig.secondary }}
      />

      {/* 1. Grand Sacred Sri Yantra Centerpiece */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center mb-6 sm:mb-8">
        
        {/* Orbiting Sacred Geometry Particle Field attuned to activeAura */}
        <SacredGeometryParticles theme={theme} size={320} activeAura={activeAura} />

        {/* Quantum Wave Ring */}
        <motion.div 
          className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full pointer-events-none"
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.35, 0.75, 0.35],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            border: `1.5px solid ${currentAuraConfig.border}`,
            boxShadow: `0 0 35px ${currentAuraConfig.glow}`
          }}
        />

        {/* Central Glowing Sacred Sri Yantra */}
        <motion.div 
          className="relative z-20 p-3 sm:p-4 rounded-full border-2 backdrop-blur-md cursor-pointer group"
          animate={{
            scale: [1, 1.03, 0.98, 1],
            boxShadow: [
              `0 0 30px ${currentAuraConfig.glow}, 0 0 50px ${currentAuraConfig.glowIntense}`,
              `0 0 50px ${currentAuraConfig.glowIntense}, 0 0 70px ${currentAuraConfig.glow}`,
              `0 0 30px ${currentAuraConfig.glow}, 0 0 50px ${currentAuraConfig.glowIntense}`
            ]
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.08 }}
          onClick={() => {
            try {
              cosmicAudio.playFrequency(currentAuraConfig.frequencyHz);
              confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.5 },
                colors: [currentAuraConfig.primary, currentAuraConfig.secondary, '#ffd700', currentAuraConfig.tertiary]
              });
            } catch {}
          }}
          style={{
            borderColor: currentAuraConfig.secondary,
            background: isDark 
              ? `linear-gradient(135deg, ${currentAuraConfig.glow} 0%, rgba(0,0,0,0.85) 100%)`
              : `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(253,243,219,0.9) 100%)`
          }}
          title={`Tap for ${currentAuraConfig.frequencyHz}Hz ${currentAuraConfig.name} Harmonic Resonance`}
        >
          <img 
            src={SRI_YANTRA_LOGO} 
            alt="Kaal Chakra Sacred Sri Yantra" 
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover animate-spin-slow shadow-inner filter drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]"
          />
        </motion.div>

        {/* Minimal Harmonics Tag with Active Aura & Frequency */}
        <div 
          className={`absolute -bottom-2 z-20 px-3.5 py-1 rounded-full border text-[11px] font-cinzel font-bold shadow-xl flex items-center gap-1.5 backdrop-blur-sm transition-colors duration-500 ${
            isDark ? 'bg-black/85 text-amber-200' : 'bg-[#fffaf0] text-[#78350f] border-amber-500/60 shadow-md'
          }`}
          style={{
            borderColor: currentAuraConfig.border,
            color: isDark ? currentAuraConfig.secondary : '#78350f'
          }}
        >
          <span 
            className="w-1.5 h-1.5 rounded-full animate-ping" 
            style={{ backgroundColor: currentAuraConfig.primary }}
          />
          <span 
            className={`font-bold ${isDark ? 'bg-clip-text text-transparent' : 'text-[#78350f]'}`}
            style={isDark ? {
              backgroundImage: `linear-gradient(to right, ${currentAuraConfig.secondary}, #ffffff, ${currentAuraConfig.primary})`
            } : undefined}
          >
            {currentAuraConfig.frequencyHz}Hz • {currentAuraConfig.name}
          </span>
          <Sparkles className="w-3 h-3" style={{ color: currentAuraConfig.primary }} />
        </div>
      </div>

      {/* 2. Clear, Meditative Title & Subtitle */}
      <div className="space-y-3 max-w-2xl mb-6 mt-4">
        <h1 className={`text-3xl sm:text-5xl md:text-6xl font-cinzel font-extrabold tracking-tight leading-tight transition-colors duration-500 ${
          isDark 
            ? 'text-[#fdf2d1] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]' 
            : 'text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]'
        }`}>
          {isDark ? 'KAAL CHAKRA' : 'DHAMMA CHAKRA'}
        </h1>
        <p className={`text-sm sm:text-base font-serif italic transition-colors duration-500 ${
          isDark ? 'text-amber-200/90' : 'text-orange-300 font-semibold'
        }`}>
          {isDark 
            ? <>&ldquo;यथा पिण्डे तथा ब्रह्माण्डे&rdquo; — As within, so without.</>
            : <>&ldquo;अप्प दीपो भव&rdquo; — Be a light unto yourself.</>
          }
        </p>
        <p className={`text-xs sm:text-sm font-serif leading-relaxed max-w-lg mx-auto transition-colors duration-500 ${
          isDark ? 'text-gray-300/80' : 'text-amber-100/90 font-medium'
        }`}>
          {isDark 
            ? 'The eternal wheel of Vedic time, sacred mathematics, and cosmic consciousness.' 
            : 'The sacred wheel of Dharma, mindful awareness, and spiritual liberation.'}
        </p>
      </div>

      {/* Quick Access Pills Row (Horizontal Scrollable) */}
      <QuickAccessPillsRow theme={theme} onNavigate={onNavigate} />

      {/* 3. Primary Clean Gateway Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl">
        {/* MASTER BUTTON: Open All Shastras & Options in Side Menu */}
        <button
          onClick={onOpenDrawer}
          className="px-6 py-3.5 rounded-2xl bg-gold-gradient text-gray-950 font-cinzel font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-[0_4px_24px_rgba(212,175,55,0.45)] hover:brightness-110 hover:scale-105 transition-all cursor-pointer group"
        >
          <LayoutGrid className="w-5 h-5 text-gray-950 group-hover:rotate-12 transition-transform" />
          <span>सभी सुविधाएं एवं शास्त्र (All Options)</span>
          <ChevronRight className="w-4 h-4 text-gray-950 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Quick Direct Link: Kundli */}
        <button
          onClick={() => onNavigate('kundli')}
          className={`px-4 sm:px-5 py-3 rounded-2xl border text-xs sm:text-sm font-cinzel font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            isDark 
              ? 'bg-black/50 border-amber-500/40 text-amber-200 hover:bg-amber-500/15 hover:border-amber-400' 
              : 'bg-white border-amber-400/80 text-[#78350f] shadow-sm hover:bg-amber-50 hover:border-amber-500'
          }`}
        >
          <Compass className="w-4 h-4 text-amber-500" />
          <span>Janam Kundli</span>
        </button>

        {/* Quick Direct Link: Kundli Matching */}
        <button
          onClick={() => onNavigate('matching')}
          className={`px-4 sm:px-5 py-3 rounded-2xl border text-xs sm:text-sm font-cinzel font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            isDark 
              ? 'bg-black/50 border-rose-500/40 text-rose-200 hover:bg-rose-500/15 hover:border-rose-400' 
              : 'bg-white border-rose-400/80 text-rose-950 shadow-sm hover:bg-rose-50 hover:border-rose-500'
          }`}
        >
          <Heart className="w-4 h-4 text-rose-500" />
          <span>36 Guna Milan</span>
        </button>

        {/* Quick Direct Link: AI Astrologer */}
        <button
          onClick={() => onOpenAstrologerChat()}
          className={`px-4 sm:px-5 py-3 rounded-2xl border text-xs sm:text-sm font-cinzel font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            isDark 
              ? 'bg-black/50 border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/15 hover:border-cyan-400' 
              : 'bg-white border-cyan-400/80 text-cyan-950 shadow-sm hover:bg-cyan-50 hover:border-cyan-500'
          }`}
        >
          <Bot className="w-4 h-4 text-cyan-600" />
          <span>AI Daivajna</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </button>

        {onOpenShareModal && (
          <button
            onClick={onOpenShareModal}
            className={`p-3 rounded-2xl border text-xs font-cinzel font-semibold flex items-center justify-center transition-all cursor-pointer ${
              isDark 
                ? 'bg-black/40 border-white/15 text-gray-300 hover:text-white hover:border-amber-400/40' 
                : 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm hover:bg-amber-100'
            }`}
            title="Share Kaal Chakra"
          >
            <Share2 className="w-4 h-4 text-amber-600" />
          </button>
        )}
      </div>

      {/* 4. Minimal Live Cosmic Pulse Indicator */}
      <div className={`mt-8 sm:mt-10 inline-flex items-center gap-3 px-4 py-2 rounded-full border text-[11px] font-serif backdrop-blur-sm shadow-sm ${
        isDark 
          ? 'bg-black/40 border-amber-500/20 text-gray-300' 
          : 'bg-white/90 border-amber-400/60 text-[#4a3518]'
      }`}>
        <Sun className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
        <span className={`font-cinzel font-semibold ${isDark ? 'text-amber-200' : 'text-[#78350f]'}`}>आज का पंचांग:</span>
        <span className="font-medium">Shukla Saptami • Pushya Nakshatra</span>
        <span className={isDark ? 'text-gray-500' : 'text-amber-300'}>•</span>
        <span className={isDark ? 'text-emerald-400' : 'text-emerald-700 font-semibold'}>Amrit Choghadiya</span>
        <button 
          onClick={() => onNavigate('panchang')}
          className={`hover:underline font-cinzel font-bold flex items-center gap-0.5 ml-1 ${
            isDark ? 'text-amber-300' : 'text-amber-800'
          }`}
        >
          <span>View</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

    </div>
  );
};

export { CosmicPlanetaryAlignmentHomepage } from './CosmicPlanetaryAlignmentHomepage';
