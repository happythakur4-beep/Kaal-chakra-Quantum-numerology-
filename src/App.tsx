import React, { useState, useEffect } from 'react';
import { 
  ScreenType, 
  ThemeMode, 
  UserProfile, 
  DestinyProfileData, 
  AuraType, 
  Consultation 
} from './types';
import { 
  INITIAL_USER, 
  INITIAL_REPORTS, 
  INITIAL_CONSULTATIONS, 
  ALL_COURSES, 
  DEFAULT_DESTINY_PROFILE 
} from './data/mockData';
import { 
  AstroSageCategory, 
  AstroGridTile, 
  SubFeatureItem 
} from './data/astroSageDirectory';
import { generateCustomDestinyProfile } from './utils/numerology';
import { MandalaBackground } from './components/MandalaBackground';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { UnlockReportModal } from './components/UnlockReportModal';
import { AstroSageDrawer } from './components/AstroSageDrawer';
import { AstroSageFeatureModal } from './components/AstroSageFeatureModal';
import { AstrologerChatModal } from './components/AstrologerChatModal';
import { LandingHeroScreen } from './components/Screens/LandingHeroScreen';
import { CosmicPlanetaryAlignmentHomepage } from './components/Screens/CosmicPlanetaryAlignmentHomepage';
import { InstitutePortalScreen } from './components/Screens/InstitutePortalScreen';
import { DestinyReportScreen } from './components/Screens/DestinyReportScreen';
import { StudentDashboardScreen } from './components/Screens/StudentDashboardScreen';
import { QuantumPracticeScreen } from './components/Screens/QuantumPracticeScreen';
import { AcademyCoursesScreen } from './components/Screens/AcademyCoursesScreen';
import { ConsultationsScreen } from './components/Screens/ConsultationsScreen';
import { AICosmicMentorScreen } from './components/Screens/AICosmicMentorScreen';
import { KundliScreen } from './components/Screens/KundliScreen';
import { KundliMatchingScreen } from './components/Screens/KundliMatchingScreen';
import { TransitTrackerScreen } from './components/Screens/TransitTrackerScreen';
import { GemstoneRemediesScreen } from './components/Screens/GemstoneRemediesScreen';
import { PanchangMuhuratScreen } from './components/Screens/PanchangMuhuratScreen';
import { LalKitabScreen } from './components/Screens/LalKitabScreen';
import { KPAstrologyScreen } from './components/Screens/KPAstrologyScreen';
import { RashifalTarotScreen } from './components/Screens/RashifalTarotScreen';
import { NumerologyScreen } from './components/Screens/NumerologyScreen';
import { VastuScreen } from './components/Screens/VastuScreen';
import { PrashnavaliScreen } from './components/Screens/PrashnavaliScreen';
import { BabyNamesScreen } from './components/Screens/BabyNamesScreen';
import { JapaMalaScreen } from './components/Screens/JapaMalaScreen';
import { KarmaScreen } from './components/Screens/KarmaScreen';
import { TeslaPortal369Screen } from './components/Screens/TeslaPortal369Screen';
import { TeslaCyberPortalNexus } from './components/Tesla369/TeslaCyberPortalNexus';
import { BlackHoleWarpTransition } from './components/Tesla369/BlackHoleWarpTransition';
import { UnifiedCosmicWormholeEngine } from './components/CosmicTransitionEngine/UnifiedCosmicWormholeEngine';
import { AndroidBottomNav } from './components/AndroidBottomNav';
import { AndroidInstallPrompt } from './components/AndroidInstallPrompt';
import { AndroidExportModal } from './components/AndroidExportModal';
import { SocialShareModal } from './components/SocialShareModal';
import { MindHealingScreen } from './components/Screens/MindHealingScreen';
import { SoundHealingSuite } from './components/SoundHealing/SoundHealingSuite';
import { MemoryHealingHypnosisScreen } from './components/Screens/MemoryHealingHypnosisScreen';
import { CosmicEnergyBalanceScreen } from './components/Screens/CosmicEnergyBalanceScreen';
import { MindWellnessPortalModal } from './components/MindWellness/MindWellnessPortalModal';
import { MindWellness3DIcon } from './components/MindWellness/MindWellness3DIcon';
import { motion, AnimatePresence } from 'motion/react';
import { MantraAudioPlayer } from "./components/MantraAudioPlayer";
import { sanctumTracker } from './utils/sanctumEngagementTracker';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('landing');
  const [pendingScreen, setPendingScreen] = useState<ScreenType>('landing');
  const [fromScreen, setFromScreen] = useState<ScreenType>('landing');
  const [isWormholeNavigating, setIsWormholeNavigating] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [isBlackHoleWarpPlaying, setIsBlackHoleWarpPlaying] = useState(false);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [destinyProfile, setDestinyProfile] = useState<DestinyProfileData>(DEFAULT_DESTINY_PROFILE);
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [consultations, setConsultations] = useState(INITIAL_CONSULTATIONS);
  const [courses, setCourses] = useState(ALL_COURSES);
  
  // Modals & Drawers state
  const [isMindWellnessPortalModalOpen, setIsMindWellnessPortalModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAstrologerChatOpen, setIsAstrologerChatOpen] = useState(false);
  const [activeAstrologerId, setActiveAstrologerId] = useState<string | undefined>(undefined);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<AstroSageCategory | null>(null);
  const [selectedGridTile, setSelectedGridTile] = useState<AstroGridTile | null>(null);
  const [selectedSubFeature, setSelectedSubFeature] = useState<SubFeatureItem | null>(null);

  // Sync dark mode class on document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Toggle Theme
  const handleToggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Select Aura and update user
  const handleSelectAura = (aura: AuraType) => {
    setUser(prev => ({ ...prev, activeAura: aura }));
  };

  // Quick Unlock from Landing Page Form
  const handleHeroUnlock = (name: string, email: string) => {
    const updatedProfile = generateCustomDestinyProfile(name, user.birthDate);
    setDestinyProfile(updatedProfile);
    setUser(prev => ({
      ...prev,
      name: name || prev.name,
      email: email || prev.email,
    }));
    handleNavigate('portal');
  };

  // Full Custom Unlock from Modal
  const handleModalSubmit = (
    name: string, 
    email: string, 
    birthDate: string, 
    birthTime: string, 
    birthCity: string
  ) => {
    const newProfile = generateCustomDestinyProfile(name, birthDate);
    setDestinyProfile(newProfile);
    setUser(prev => ({
      ...prev,
      name: name || prev.name,
      email: email || prev.email,
      birthDate,
      birthTime,
      birthCity,
      learningResonance: Math.min(99, prev.learningResonance + 5),
    }));
    handleNavigate('report');
  };

  // Contribution Paid from Institute Portal
  const handleUnlockDestinyReport = (contribution: number) => {
    setUser(prev => ({ ...prev, contributionPaid: contribution }));
  };

  // Open specific course & enroll
  const handleOpenCourse = (courseId: string) => {
    handleNavigate('academy');
  };

  const handleEnrollCourse = (courseId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          progressPercent: c.progressPercent > 0 ? Math.min(100, c.progressPercent + 20) : 10,
        };
      }
      return c;
    }));
    setUser(prev => ({
      ...prev,
      learningResonance: Math.min(100, prev.learningResonance + 4),
    }));
  };

  // Book Consultation
  const handleBookConsultationSuccess = (newCon: Consultation) => {
    setConsultations(prev => [newCon, ...prev]);
  };

  // Open Astrologer Chat
  const handleOpenAstrologerChat = (astrologerId?: string) => {
    setActiveAstrologerId(astrologerId);
    setIsAstrologerChatOpen(true);
  };

  // Real-Time Karma Balance Updater
  const handleUpdateUserKarma = (newPunya: number, newPapa: number) => {
    setUser(prev => ({
      ...prev,
      punyaScore: newPunya,
      papaScore: newPapa,
      karmaScore: newPunya - newPapa,
    }));
  };

  // Open Feature Modal from Category or Grid Tile
  const handleOpenCategorySubModal = (category: AstroSageCategory | null, subFeature?: SubFeatureItem) => {
    setSelectedCategory(category);
    setSelectedGridTile(null);
    setSelectedSubFeature(subFeature || null);
    setIsFeatureModalOpen(true);
  };

  const handleOpenGridTileModal = (tile: AstroGridTile) => {
    setSelectedGridTile(tile);
    setSelectedCategory(null);
    setSelectedSubFeature(null);
    setIsFeatureModalOpen(true);
  };

  // Unified Cosmic Wormhole & Nebula Drift Navigation Router
  const handleNavigate = (targetScreen: ScreenType) => {
    if (targetScreen === currentScreen) return;

    // Track visit in sanctum engagement system
    sanctumTracker.recordVisit(targetScreen);

    if (targetScreen === 'tesla-369') {
      setIsBlackHoleWarpPlaying(true);
      setCurrentScreen('tesla-369');
      return;
    }

    setFromScreen(currentScreen);
    setPendingScreen(targetScreen);
    setIsWormholeNavigating(true);

    // Midpoint switch: swap screen state while wormhole vortex is at peak intensity
    setTimeout(() => {
      setCurrentScreen(targetScreen);
    }, 220);
  };

  const handleTransitionFinish = () => {
    setIsWormholeNavigating(false);
  };

  // 100% Isolated Standalone Tesla 3-6-9 Cyber-Hacking Portal Environment
  if (currentScreen === 'tesla-369') {
    return (
      <TeslaCyberPortalNexus
        onExit={() => handleNavigate('landing')}
        user={user}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 relative font-sans ${
      theme === 'dark' ? 'bg-[#07070b] text-gray-100' : 'bg-[#1e1b4b] text-amber-50'
    }`}>
      {/* Unified Cosmic Wormhole & Nebula Drift Transition Engine */}
      <UnifiedCosmicWormholeEngine
        isNavigating={isWormholeNavigating}
        fromScreen={fromScreen}
        toScreen={pendingScreen}
        onTransitionComplete={handleTransitionFinish}
        theme={theme}
      />

      {/* Special Black Hole Singularity Warp Fullscreen Overlay */}
      {isBlackHoleWarpPlaying && (
        <BlackHoleWarpTransition onComplete={() => setIsBlackHoleWarpPlaying(false)} />
      )}

      {/* Sacred Rotating Sri Yantra Mandala Canvas Background */}
      <MandalaBackground theme={theme} activeAura={user.activeAura} />

      {/* Primary Navigation Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        user={user}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenAstrologerChat={handleOpenAstrologerChat}
        onOpenFeatureModal={handleOpenGridTileModal}
        onOpenCourse={handleOpenCourse}
        onOpenAndroidModal={() => setIsAndroidModalOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenMindWellnessPortal={() => setIsMindWellnessPortalModalOpen(true)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      {/* Screen Router Container with Continuous Morphing Animation */}
      <div className="flex-1 flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="flex-1 flex flex-col w-full"
          >
            {currentScreen === 'landing' && (
              <CosmicPlanetaryAlignmentHomepage
                theme={theme}
                user={user}
                activeAura={user.activeAura}
                onNavigate={handleNavigate}
                onUnlockReport={handleHeroUnlock}
                onOpenDrawer={() => setIsDrawerOpen(true)}
                onOpenAstrologerChat={handleOpenAstrologerChat}
                onOpenFeatureModal={handleOpenGridTileModal}
                onOpenShareModal={() => setIsShareModalOpen(true)}
                onOpenMindWellnessPortal={() => setIsMindWellnessPortalModalOpen(true)}
                onUpdateUserKarma={handleUpdateUserKarma}
                onSelectAura={handleSelectAura}
              />
            )}

            {currentScreen === 'portal' && (
              <InstitutePortalScreen
                theme={theme}
                user={user}
                reports={reports}
                consultations={consultations}
                onNavigate={handleNavigate}
                onSelectAura={handleSelectAura}
                onUnlockDestinyReport={handleUnlockDestinyReport}
                onViewReport={() => handleNavigate('report')}
                onBookConsultation={() => handleNavigate('consultations')}
              />
            )}

            {currentScreen === 'mind-healing' && (
              <MindHealingScreen
                theme={theme}
                userProfile={user}
                onNavigate={handleNavigate}
                onOpenAstrologerChat={handleOpenAstrologerChat}
              />
            )}

            {currentScreen === 'energy-balance' && (
              <CosmicEnergyBalanceScreen
                theme={theme}
                user={user}
                onNavigate={handleNavigate}
                onUpdateUserKarma={handleUpdateUserKarma}
              />
            )}

            {currentScreen === 'sound-healing' && (
              <SoundHealingSuite
                theme={theme}
                userProfile={user}
                onNavigate={handleNavigate}
                onOpenAstrologerChat={handleOpenAstrologerChat}
              />
            )}

            {currentScreen === 'memory-hypnosis' && (
              <MemoryHealingHypnosisScreen
                theme={theme}
                userProfile={user}
                onNavigate={handleNavigate}
                onOpenAstrologerChat={handleOpenAstrologerChat}
              />
            )}

            {currentScreen === 'report' && (
              <DestinyReportScreen
                theme={theme}
                profile={destinyProfile}
                onRecalculate={() => setIsReportModalOpen(true)}
              />
            )}

            {currentScreen === 'mentor' && (
              <AICosmicMentorScreen
                theme={theme}
                user={user}
              />
            )}

            {currentScreen === 'panchang' && (
              <PanchangMuhuratScreen
                theme={theme}
              />
            )}

            {currentScreen === 'kundli' && (
              <KundliScreen
                theme={theme}
                user={user}
              />
            )}

            {currentScreen === 'matching' && (
              <KundliMatchingScreen
                theme={theme}
                user={user}
              />
            )}

            {currentScreen === 'lalkitab' && (
              <LalKitabScreen
                theme={theme}
                user={user}
              />
            )}

            {currentScreen === 'kp' && (
              <KPAstrologyScreen
                theme={theme}
                user={user}
              />
            )}

            {currentScreen === 'rashifal' && (
              <RashifalTarotScreen
                theme={theme}
              />
            )}

            {currentScreen === 'transits' && (
              <TransitTrackerScreen
                theme={theme}
                user={user}
              />
            )}

            {currentScreen === 'gemstones' && (
              <GemstoneRemediesScreen
                theme={theme}
                user={user}
              />
            )}

            {currentScreen === 'numerology' && (
              <NumerologyScreen
                theme={theme}
              />
            )}

            {currentScreen === 'vastu' && (
              <VastuScreen
                theme={theme}
              />
            )}

            {currentScreen === 'prashnavali' && (
              <PrashnavaliScreen
                theme={theme}
              />
            )}

            {currentScreen === 'baby-names' && (
              <BabyNamesScreen
                theme={theme}
              />
            )}

            {currentScreen === 'japa-mala' && (
              <JapaMalaScreen
                theme={theme}
              />
            )}

            {currentScreen === 'karma' && (
              <KarmaScreen
                theme={theme}
                onNavigate={handleNavigate}
              />
            )}

            {currentScreen === 'student' && (
              <StudentDashboardScreen
                theme={theme}
                user={user}
                courses={courses}
                onNavigate={handleNavigate}
                onOpenCourse={handleOpenCourse}
                onUpdateProgress={handleEnrollCourse}
                onSelectAura={handleSelectAura}
              />
            )}

            {currentScreen === 'practice' && (
              <QuantumPracticeScreen
                theme={theme}
              />
            )}

            {currentScreen === 'academy' && (
              <AcademyCoursesScreen
                theme={theme}
                courses={courses}
                onSelectCourse={handleOpenCourse}
                onEnroll={handleEnrollCourse}
              />
            )}

            {currentScreen === 'consultations' && (
              <ConsultationsScreen
                theme={theme}
                consultations={consultations}
                onBookSuccess={handleBookConsultationSuccess}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Bar */}
      <Footer
        theme={theme}
        onNavigate={handleNavigate}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      {/* AstroSage Slide-Out Accordion Drawer Menu (Screenshot 1) */}
      <AstroSageDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        theme={theme}
        onNavigate={handleNavigate}
        onOpenSubFeatureModal={handleOpenCategorySubModal}
        onOpenAstrologerChat={handleOpenAstrologerChat}
      />

      {/* AstroSage Sub-Features Modal (Clicking any feature reveals full sub-tools) */}
      <AstroSageFeatureModal
        isOpen={isFeatureModalOpen}
        onClose={() => setIsFeatureModalOpen(false)}
        theme={theme}
        category={selectedCategory}
        gridTile={selectedGridTile}
        singleSubFeature={selectedSubFeature}
        onNavigate={handleNavigate}
        onOpenAstrologerChat={handleOpenAstrologerChat}
      />

      {/* Live AI Astrologer Consultation Chat (Swami Ji, Arjun Pandit, Mr. Krishnamurti, etc.) */}
      <AstrologerChatModal
        isOpen={isAstrologerChatOpen}
        onClose={() => setIsAstrologerChatOpen(false)}
        theme={theme}
        initialAstrologerId={activeAstrologerId}
      />

      {/* Unlock / Recalculate Destiny Modal */}
      <UnlockReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleModalSubmit}
        theme={theme}
        initialName={user.name}
        initialEmail={user.email}
      />

      {/* Persistent Mantra Audio Player Floating Sanctuary */}
      <MantraAudioPlayer theme={theme} />

      {/* Android Native-Experience Bottom Navigation Bar (Mobile / Touch Devices) */}
      <AndroidBottomNav
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      {/* Android 1-Tap PWA / APK Install Floating Banner */}
      <AndroidInstallPrompt
        onOpenApkGuide={() => setIsAndroidModalOpen(true)}
      />

      {/* Android Native APK & PWA Packaging Guide Modal */}
      <AndroidExportModal
        isOpen={isAndroidModalOpen}
        onClose={() => setIsAndroidModalOpen(false)}
      />

      {/* Cosmic Social Share Modal (Facebook, WhatsApp, Instagram & Native) */}
      <SocialShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Distinct 3D Mind Wellness Holographic Portal Window / Matrix */}
      <MindWellnessPortalModal
        isOpen={isMindWellnessPortalModalOpen}
        onClose={() => setIsMindWellnessPortalModalOpen(false)}
        theme={theme}
        userProfile={user}
        onNavigateToFullChamber={(screen) => {
          setIsMindWellnessPortalModalOpen(false);
          handleNavigate(screen);
        }}
      />

      {/* Persistent Floating 3D Mind Wellness Portal Launcher Pill (Left-aligned to prevent overlap) */}
      {currentScreen !== 'mind-healing' && (
        <div className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center gap-2 p-1.5 sm:p-2 rounded-full bg-black/90 border border-emerald-400/80 shadow-[0_0_25px_rgba(16,185,129,0.55)] backdrop-blur-md cursor-pointer group"
            onClick={() => setIsMindWellnessPortalModalOpen(true)}
            title="Open Mind Wellness: 3D Holographic Portal Window (528Hz)"
          >
            <MindWellness3DIcon
              size={36}
              interactive={true}
              showGlow={true}
              showBadge={true}
              badgeText="528"
            />
            <div className="hidden md:flex flex-col pr-3 text-left select-none">
              <span className="text-[11px] font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-amber-200 uppercase tracking-wider">
                Mind Portal
              </span>
              <span className="text-[9px] font-mono text-emerald-400 font-medium">
                Cellular Telemetry
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App;
