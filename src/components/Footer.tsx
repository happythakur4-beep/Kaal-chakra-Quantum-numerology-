import React from 'react';
import { ScreenType, ThemeMode } from '../types';
import { SRI_YANTRA_LOGO } from '../data/mockData';
import { Sparkles, ShieldCheck, Heart, Radio, Share2, MessageCircle } from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynthesizer';

interface FooterProps {
  theme: ThemeMode;
  onNavigate: (screen: ScreenType) => void;
  onOpenShareModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ theme, onNavigate, onOpenShareModal }) => {
  const isDark = theme === 'dark';

  const shareToSocial = (platform: 'fb' | 'wa' | 'ig') => {
    cosmicAudio.playTone(528, 0.08);
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://kaalchakra.app';
    const text = '🕉️ Explore Kaal Chakra: The premier Vedic Astrology, Kundli, Panchang, Karma Ledger & 369 Tesla Portal!';

    if (platform === 'wa') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + '\n\n👉 ' + origin)}`, '_blank', 'noopener,noreferrer');
    } else if (platform === 'fb') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(origin)}&quote=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer,width=600,height=500');
    } else if (platform === 'ig') {
      if (onOpenShareModal) {
        onOpenShareModal();
      } else {
        navigator.clipboard.writeText(`${text}\n\n👉 ${origin}\n\n#KaalChakra #VedicAstrology #Kundli`);
        window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <footer className={`no-print w-full border-t transition-colors duration-300 relative z-20 ${
      isDark 
        ? 'bg-[#06060c]/90 border-[#d4af37]/20 text-gray-400' 
        : 'bg-[#faf7f2]/95 border-[#d9b482]/35 text-[#593b1b]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 md:pb-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3.5">
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

            {/* Social Share Buttons: Facebook, WhatsApp, Instagram */}
            <div className="pt-2">
              <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#d4af37] block mb-2 font-semibold">
                Share with Family & Friends:
              </span>
              <div className="flex items-center gap-2">
                {/* WhatsApp */}
                <button
                  id="footer-share-whatsapp"
                  onClick={() => shareToSocial('wa')}
                  title="Share on WhatsApp"
                  className="px-3 py-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 hover:border-[#25D366] text-[#25D366] text-xs font-cinzel font-semibold flex items-center gap-1.5 transition-all shadow-[0_2px_8px_rgba(37,211,102,0.15)] cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-[#25D366]" />
                  <span>WhatsApp</span>
                </button>

                {/* Facebook */}
                <button
                  id="footer-share-facebook"
                  onClick={() => shareToSocial('fb')}
                  title="Share on Facebook"
                  className="px-3 py-1.5 rounded-lg bg-[#1877F2]/15 hover:bg-[#1877F2]/25 border border-[#1877F2]/40 hover:border-[#1877F2] text-[#1877F2] text-xs font-cinzel font-semibold flex items-center gap-1.5 transition-all shadow-[0_2px_8px_rgba(24,119,242,0.15)] cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </button>

                {/* Instagram */}
                <button
                  id="footer-share-instagram"
                  onClick={() => shareToSocial('ig')}
                  title="Share on Instagram"
                  className="px-3 py-1.5 rounded-lg bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/40 hover:border-pink-500 text-pink-400 text-xs font-cinzel font-semibold flex items-center gap-1.5 transition-all shadow-[0_2px_8px_rgba(236,72,153,0.15)] cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-pink-400" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </button>

                {onOpenShareModal && (
                  <button
                    onClick={onOpenShareModal}
                    title="More Share Options"
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                )}
              </div>
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
