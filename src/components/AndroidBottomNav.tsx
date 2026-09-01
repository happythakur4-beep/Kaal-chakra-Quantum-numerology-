import React from 'react';
import { ScreenType } from '../types';
import { 
  Home, 
  Calendar, 
  Compass, 
  Scale, 
  Sparkles, 
  Bot, 
  Menu 
} from 'lucide-react';
import { MindWellness3DIcon } from './MindWellness/MindWellness3DIcon';
import { cosmicAudio } from '../utils/audioSynthesizer';
import { motion } from 'motion/react';

interface AndroidBottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenDrawer: () => void;
}

export function AndroidBottomNav({ currentScreen, onNavigate, onOpenDrawer }: AndroidBottomNavProps) {
  const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {}
    }
  };

  const navItems = [
    { 
      id: 'landing' as ScreenType, 
      label: 'Home', 
      icon: <Home className="w-5 h-5" /> 
    },
    { 
      id: 'mind-healing' as ScreenType, 
      label: 'Mind Heal', 
      icon: <MindWellness3DIcon size={22} interactive={false} showGlow={false} /> 
    },
    { 
      id: 'panchang' as ScreenType, 
      label: 'Panchang', 
      icon: <Calendar className="w-5 h-5" /> 
    },
    { 
      id: 'kundli' as ScreenType, 
      label: 'Kundli', 
      icon: <Compass className="w-5 h-5" /> 
    },
    { 
      id: 'karma' as ScreenType, 
      label: 'Karma', 
      icon: <Scale className="w-5 h-5" /> 
    },
    { 
      id: 'tesla-369' as ScreenType, 
      label: '369 Nexus', 
      icon: <Sparkles className="w-5 h-5" /> 
    },
    { 
      id: 'mentor' as ScreenType, 
      label: 'AI Guru', 
      icon: <Bot className="w-5 h-5" /> 
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden pb-safe">
      {/* Background blur & top border glow */}
      <div className="bg-[#0a0a14]/90 backdrop-blur-xl border-t border-[#d4af37]/25 shadow-[0_-8px_30px_rgba(0,0,0,0.8)] px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                triggerHaptic();
                cosmicAudio.playTone(432, 0.05);
                onNavigate(item.id);
              }}
              className={`relative flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive 
                  ? 'text-[#d4af37]' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="android-nav-indicator"
                  className="absolute inset-0 bg-[#d4af37]/15 rounded-xl border border-[#d4af37]/40 shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className={`relative transition-transform duration-200 ${isActive ? 'scale-110 -translate-y-0.5' : ''}`}>
                {item.icon}
              </div>
              <span className={`relative text-[10px] font-cinzel font-semibold mt-0.5 tracking-tight ${isActive ? 'text-[#d4af37] font-bold' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* AstroSage Menu Drawer Trigger */}
        <button
          onClick={() => {
            triggerHaptic();
            cosmicAudio.playTone(528, 0.05);
            onOpenDrawer();
          }}
          className="flex flex-col items-center justify-center py-1 px-1.5 rounded-xl text-gray-400 hover:text-[#d4af37] transition-all cursor-pointer"
        >
          <div className="p-1 rounded-lg bg-white/5 border border-white/10">
            <Menu className="w-4 h-4 text-[#d4af37]" />
          </div>
          <span className="text-[10px] font-cinzel font-semibold mt-0.5 tracking-tight text-gray-400">
            All (40+)
          </span>
        </button>
      </div>
    </div>
  );
}
