import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Smartphone, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  PlusSquare,
  HelpCircle 
} from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynthesizer';
import { motion, AnimatePresence } from 'motion/react';

interface AndroidInstallPromptProps {
  onOpenApkGuide: () => void;
}

export function AndroidInstallPrompt({ onOpenApkGuide }: AndroidInstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [installedSuccess, setInstalledSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed as PWA or TWA)
    const isRunningStandalone = window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://');

    setIsStandalone(isRunningStandalone);

    // If already installed, do not show install banner
    if (isRunningStandalone) return;

    // Listen for beforeinstallprompt event on Android Chrome
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Also show mini pill banner after 3 seconds for easy access
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem('android_banner_dismissed');
      if (!dismissed && !isRunningStandalone) {
        setShowBanner(true);
      }
    }, 2500);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    cosmicAudio.playTone(528, 0.08);
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalledSuccess(true);
        setTimeout(() => setShowBanner(false), 3000);
      }
      setDeferredPrompt(null);
    } else {
      // If native prompt not directly fired, open the interactive Android guide
      onOpenApkGuide();
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('android_banner_dismissed', 'true');
  };

  if (isStandalone) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-16 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-50 pointer-events-auto"
        >
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#141226] via-[#1c1833] to-[#120f24] border border-[#d4af37]/40 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.4)] flex-shrink-0 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-slate-950" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs sm:text-sm font-cinzel font-bold text-amber-300 flex items-center gap-1.5">
                    <span>Install Kaal Chakra App</span>
                    <span className="px-1.5 py-0.2 text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-sans font-normal">Android</span>
                  </h4>
                  <button 
                    onClick={handleDismiss}
                    className="text-gray-400 hover:text-gray-200 p-0.5 rounded cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-gray-300 mt-0.5 leading-snug">
                  Get 1-Tap Offline Panchang, Kundli, Karma Ledger & 369 Portal on your Android device.
                </p>

                <div className="flex items-center gap-2 mt-2.5">
                  <button
                    onClick={handleInstallClick}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b45309] text-gray-950 font-cinzel font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_2px_10px_rgba(212,175,55,0.3)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  >
                    {installedSuccess ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
                        <span>Installed!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-slate-950" />
                        <span>{deferredPrompt ? '1-Tap Install' : 'Install / APK'}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      cosmicAudio.playTone(432, 0.05);
                      onOpenApkGuide();
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-amber-400/40 text-gray-300 hover:text-amber-300 text-xs font-sans flex items-center gap-1 transition-colors cursor-pointer"
                    title="APK & Export Guide"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Guide</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
