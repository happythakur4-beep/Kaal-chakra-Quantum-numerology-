import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  Sparkles, 
  Send,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cosmicAudio } from '../utils/audioSynthesizer';
import { ScreenType } from '../types';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen?: ScreenType;
}

export function SocialShareModal({ isOpen, onClose, currentScreen = 'landing' }: SocialShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [instagramCopied, setInstagramCopied] = useState(false);
  const [shareCategory, setShareCategory] = useState<'general' | 'panchang' | 'kundli' | 'karma' | 'tesla'>('general');

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://kaalchakra.app';

  const shareConfigs = {
    general: {
      title: 'Kaal Chakra - Quantum Numerology & Vedic Astrology',
      text: '🕉️ Explore Kaal Chakra: The premier Occult Science & Vedic Astrology platform featuring Janam Kundli, Aaj Ka Panchang, Karma Ledger & the 369 Tesla Portal!',
      url: `${currentUrl}`,
    },
    panchang: {
      title: 'Aaj Ka Panchang - Kaal Chakra',
      text: '📅 Check Today\'s Vedic Panchang: Tithi, Nakshatra, Shubh Muhurat, Rahu Kaal & Choghadiya on Kaal Chakra!',
      url: `${currentUrl}/?screen=panchang`,
    },
    kundli: {
      title: 'Janam Kundli & Birth Chart - Kaal Chakra',
      text: '🔮 Generate your Free Vedic Janam Kundli, Planetary Positions & Dasha predictions on Kaal Chakra!',
      url: `${currentUrl}/?screen=kundli`,
    },
    karma: {
      title: 'Karma & Dharmic Ledger - Kaal Chakra',
      text: '⚖️ Discover your Karmic Balance Sheet: Track Punya merits, Papa transgressions & Pancha Rina debts on Kaal Chakra!',
      url: `${currentUrl}/?screen=karma`,
    },
    tesla: {
      title: '369 Tesla Cosmic Universe - Kaal Chakra',
      text: '⚡ Enter the 369 Tesla Portal: Cosmic planetary harmonics, vortex mathematics & black hole warp engine!',
      url: `${currentUrl}/?screen=tesla-369`,
    },
  };

  const selected = shareConfigs[shareCategory];

  const handleCopyLink = () => {
    cosmicAudio.playTone(600, 0.06);
    navigator.clipboard.writeText(`${selected.text}\n\n👉 Access here: ${selected.url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFacebookShare = () => {
    cosmicAudio.playTone(528, 0.08);
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(selected.url)}&quote=${encodeURIComponent(selected.text)}`;
    window.open(fbUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const handleWhatsAppShare = () => {
    cosmicAudio.playTone(528, 0.08);
    const waText = `${selected.text}\n\n👉 ${selected.url}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleInstagramShare = () => {
    cosmicAudio.playTone(528, 0.08);
    // Copy caption & hashtags to clipboard for Instagram post/story/DM
    const igText = `${selected.text}\n\n🔗 ${selected.url}\n\n#KaalChakra #VedicAstrology #Kundli #Panchang #Tesla369 #Karma #Astrology`;
    navigator.clipboard.writeText(igText);
    setInstagramCopied(true);
    setTimeout(() => setInstagramCopied(false), 4000);
    // Open Instagram Web or app
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    cosmicAudio.playTone(432, 0.06);
    if (navigator.share) {
      try {
        await navigator.share({
          title: selected.title,
          text: selected.text,
          url: selected.url,
        });
      } catch {}
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="relative w-full max-w-lg bg-[#0c0a17] border border-[#d4af37]/40 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.25)] overflow-hidden my-auto"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950/40 via-[#18142a] to-amber-950/40 border-b border-[#d4af37]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center justify-center">
              <Share2 className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200">
                Share Kaal Chakra
              </h3>
              <p className="text-xs text-gray-400 font-sans">
                Spread Vedic Wisdom & Occult Science
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              cosmicAudio.playTone(300, 0.05);
              onClose();
            }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-5">
          {/* Share Category Selector */}
          <div>
            <label className="text-[11px] font-cinzel font-semibold text-amber-300/80 uppercase tracking-wider block mb-2">
              Select What to Share:
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {[
                { id: 'general', label: 'Main App' },
                { id: 'panchang', label: 'Panchang' },
                { id: 'kundli', label: 'Kundli' },
                { id: 'karma', label: 'Karma' },
                { id: 'tesla', label: '369 Tesla' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    cosmicAudio.playTone(432, 0.04);
                    setShareCategory(cat.id as any);
                  }}
                  className={`px-2 py-1.5 rounded-lg text-xs font-cinzel font-semibold transition-all cursor-pointer truncate ${
                    shareCategory === cat.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                      : 'bg-white/5 text-gray-400 hover:text-gray-200 border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Social Buttons: Facebook, WhatsApp, Instagram */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* WhatsApp */}
            <button
              id="share-whatsapp-btn"
              onClick={handleWhatsAppShare}
              className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-gradient-to-b from-[#25D366]/20 to-[#128C7E]/10 border border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#25D366]/30 text-white transition-all shadow-[0_4px_16px_rgba(37,211,102,0.2)] group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center mb-2 shadow-[0_0_12px_rgba(37,211,102,0.5)] group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-cinzel font-bold text-xs text-[#25D366] group-hover:text-white">WhatsApp</span>
              <span className="text-[10px] text-gray-400 font-sans mt-0.5">Share with Contacts</span>
            </button>

            {/* Facebook */}
            <button
              id="share-facebook-btn"
              onClick={handleFacebookShare}
              className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-gradient-to-b from-[#1877F2]/20 to-[#0d53ad]/10 border border-[#1877F2]/40 hover:border-[#1877F2] hover:bg-[#1877F2]/30 text-white transition-all shadow-[0_4px_16px_rgba(24,119,242,0.2)] group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center mb-2 shadow-[0_0_12px_rgba(24,119,242,0.5)] group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span className="font-cinzel font-bold text-xs text-[#1877F2] group-hover:text-white">Facebook</span>
              <span className="text-[10px] text-gray-400 font-sans mt-0.5">Post to Feed & Story</span>
            </button>

            {/* Instagram */}
            <button
              id="share-instagram-btn"
              onClick={handleInstagramShare}
              className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-gradient-to-b from-[#E1306C]/20 to-[#833AB4]/10 border border-[#E1306C]/40 hover:border-[#E1306C] hover:bg-[#E1306C]/30 text-white transition-all shadow-[0_4px_16px_rgba(225,48,108,0.2)] group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center mb-2 shadow-[0_0_12px_rgba(225,48,108,0.5)] group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span className="font-cinzel font-bold text-xs text-[#E1306C] group-hover:text-white">Instagram</span>
              <span className="text-[10px] text-gray-400 font-sans mt-0.5">Copy & Open IG</span>
            </button>
          </div>

          {/* Instagram Notice if clicked */}
          {instagramCopied && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-pink-500/15 border border-pink-500/40 text-xs text-pink-200 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
              <span>Caption & Link copied! Paste into your Instagram Story, Post, or Bio!</span>
            </motion.div>
          )}

          {/* Preview Box */}
          <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="font-cinzel text-amber-300/90 font-semibold">Share Message Preview</span>
              <span className="text-[10px] text-gray-400 font-mono">Ready to Post</span>
            </div>
            <p className="text-xs text-gray-300 font-sans bg-white/5 p-2.5 rounded-lg border border-white/5 leading-relaxed select-all">
              {selected.text} <br/>
              <span className="text-[#d4af37] break-all">{selected.url}</span>
            </p>
          </div>

          {/* Action Row: Copy Link & Native Share */}
          <div className="flex items-center gap-3">
            <button
              id="copy-share-link-btn"
              onClick={handleCopyLink}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-amber-400/40 text-gray-200 hover:text-white font-cinzel font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>Copy Link & Text</span>
                </>
              )}
            </button>

            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={handleNativeShare}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b45309] text-gray-950 font-cinzel font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_2px_12px_rgba(212,175,55,0.35)] cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-slate-950" />
                <span>More Options</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#08070e] border-t border-[#d4af37]/20 flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center gap-1.5 text-amber-300/80 font-cinzel">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Kaal Chakra Celestial Share</span>
          </div>
          <button
            onClick={() => {
              cosmicAudio.playTone(300, 0.05);
              onClose();
            }}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
