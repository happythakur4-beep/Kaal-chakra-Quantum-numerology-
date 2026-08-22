import React from 'react';
import { ScreenType, ThemeMode } from '../types';
import { SRI_YANTRA_LOGO } from '../data/mockData';
import { Sparkles, ShieldCheck, Heart, Radio } from 'lucide-react';

interface FooterProps {
  theme: ThemeMode;
  onNavigate: (screen: ScreenType) => void;
}

export const Footer: React.FC<FooterProps> = ({ theme, onNavigate }) => {
  const isDark = theme === 'dark';

  return (
    <footer className={`no-print w-full border-t transition-colors duration-300 relative z-20 ${
      isDark 
        ? 'bg-[#06060c]/90 border-[#d4af37]/20 text-gray-400' 
        : 'bg-[#faf7ee]/95 border-[#c5a059]/30 text-[#5a4313]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={SRI_YANTRA_LOGO}
                alt="Kaal Chakra"
                className="w-9 h-9 object-contain filter drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]"
              />
              <div>
                <span className={`font-cinzel text-base font-bold tracking-wider uppercase block ${
                  isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'
                }`}>
                  Kaal Chakra
                </span>
                <span className="text-[0.62rem] tracking-[0.2em] uppercase font-sans text-[#d4af37]">
                  Quantum Numerology & Occult Science
                </span>
              </div>
            </div>

            <p className="text-xs font-serif leading-relaxed max-w-sm">
              The premier Occult Science sanctuary uniting Pythagorean harmonic mathematics, Vedic Jyotish astrology, and bio-frequency resonance.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-serif">
              <ShieldCheck className="w-4 h-4" />
              <span>All India Institute of Occult Science Affiliation</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-xs font-cinzel font-bold uppercase tracking-wider mb-3 ${
              isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'
            }`}>
              Vedic Jyotish & Tools
            </h4>
            <ul className="space-y-2 text-xs font-serif">
              <li>
                <button onClick={() => onNavigate('panchang')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  ✦ Aaj Ka Panchang & Vivah Muhurat
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('kundli')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  ✦ Janam Kundli & Ashtakvarga
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('rashifal')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  ✦ Dainik Rashifal & Tarot
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('matching')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  ✦ Kundli Milan (36 Guna)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('numerology')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  ✦ Ank Jyotish (Lo Shu & Raj Yoga)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('vastu')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  ✦ Vastu Shastra 16 Zones
                </button>
              </li>
            </ul>
          </div>

          {/* Shastra Services & Divination */}
          <div>
            <h4 className={`text-xs font-cinzel font-bold uppercase tracking-wider mb-3 ${
              isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'
            }`}>
              Divination & Sadhana
            </h4>
            <ul className="space-y-2 text-xs font-serif">
              <li>
                <button onClick={() => onNavigate('prashnavali')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  ✦ Ramcharitmanas Prashnavali
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('baby-names')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  ✦ Vedic Naamkaran (Baby Names)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('japa-mala')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  ✦ Mantra Japa Mala Counter
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('lalkitab')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  ✦ Lal Kitab Teva & Rin Upay
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('kp')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  ✦ KP Krishnamurti Paddhati
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('transits')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  ✦ Grah Gochar & Transits
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.7rem] font-serif text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} All India Institute of Occult Science. All Rights Reserved. | Celestial Balance Theme
          </p>
          <div className="flex items-center gap-4 text-xs font-cinzel text-[#d4af37]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
