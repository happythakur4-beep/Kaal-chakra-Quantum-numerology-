import React, { useState } from 'react';
import { ScreenType, ThemeMode, UserProfile, CourseModule, AuraType } from '../../types';
import { SRI_YANTRA_LOGO } from '../../data/mockData';
import { AuraFieldVisualization, AURA_CONFIGS } from '../AuraFieldVisualization';
import { 
  Home, 
  BookOpen, 
  Sparkles, 
  Users, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Layers, 
  Hand, 
  Compass, 
  Gem, 
  SunMedium,
  Zap,
  Radio,
  Eye,
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { cosmicAudio } from '../../utils/audioSynthesizer';

interface StudentDashboardScreenProps {
  theme: ThemeMode;
  user: UserProfile;
  courses: CourseModule[];
  onNavigate: (screen: ScreenType) => void;
  onOpenCourse: (courseId: string) => void;
  onUpdateProgress?: (courseId: string) => void;
  onSelectAura?: (aura: AuraType) => void;
}

export const StudentDashboardScreen: React.FC<StudentDashboardScreenProps> = ({
  theme,
  user,
  courses,
  onNavigate,
  onOpenCourse,
  onUpdateProgress,
  onSelectAura,
}) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showAuraField, setShowAuraField] = useState(true);
  const [isAuraModalOpen, setIsAuraModalOpen] = useState(false);
  const isDark = theme === 'dark';

  const auraConfig = AURA_CONFIGS[user.activeAura] || AURA_CONFIGS['Calm Amber'];

  // Total enrolled / completed stats
  const totalProgress = Math.round(
    courses.reduce((acc, curr) => acc + curr.progressPercent, 0) / (courses.length || 1)
  );

  const handleNextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % Math.max(1, courses.length - 2));
  };

  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + Math.max(1, courses.length - 2)) % Math.max(1, courses.length - 2));
  };

  const handleStartPractice = () => {
    try {
      cosmicAudio.playFrequency(528);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#d4af37', '#fdf2d1', '#5c0011'],
      });
    } catch {}
    onNavigate('practice');
  };

  const handleAdvanceLesson = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    try {
      cosmicAudio.playFrequency(639);
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#d4af37', '#ffffff'],
      });
    } catch {}

    if (onUpdateProgress) {
      onUpdateProgress(courseId);
    }
  };

  const handleAuraChange = (aura: AuraType) => {
    if (onSelectAura) {
      onSelectAura(aura);
    }
  };

  const getCourseIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'HandMetal': return <Hand className="w-5 h-5" />;
      case 'Gem': return <Gem className="w-5 h-5" />;
      case 'SunMedium': return <SunMedium className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const visibleCarouselCourses = courses.slice(carouselIndex, carouselIndex + 3);

  return (
    <div className="relative z-10 w-full max-w-md mx-auto px-4 py-6 sm:py-8">
      
      {/* Mobile App Container Frame */}
      <div 
        id="student-dashboard-mobile-frame"
        className={`rounded-3xl border shadow-2xl p-5 sm:p-6 transition-all duration-300 relative overflow-hidden ${
          isDark 
            ? 'glassmorphism-dark border-[#d4af37]/45 shadow-[0_0_35px_rgba(212,175,55,0.2)] text-gray-200' 
            : 'glassmorphism-light border-[#c5a059]/60 shadow-[0_12px_40px_rgba(180,140,50,0.14)] text-[#3b2b0a]'
        }`}
      >
        {/* Subtle Watermark Mandala */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <img
            src={SRI_YANTRA_LOGO}
            alt="Watermark"
            className="w-80 h-80 object-contain animate-spin-slow"
          />
        </div>

        {/* 1. Top User Profile Section with Bio-Photonic D3 Aura Field */}
        <div 
          id="student-user-profile-section"
          className="relative z-10 mb-5 p-3.5 rounded-2xl border transition-all duration-500 overflow-hidden"
          style={{
            borderColor: `${auraConfig.primary}40`,
            background: isDark 
              ? `linear-gradient(135deg, rgba(16, 16, 24, 0.85), ${auraConfig.primary}12)` 
              : `linear-gradient(135deg, rgba(255, 255, 255, 0.95), ${auraConfig.primary}15)`,
            boxShadow: `0 0 20px ${auraConfig.glow}`,
          }}
        >
          {/* Upper Profile Row: Avatar, Name, Aura Badge, and Resonance Gauge */}
          <div className="flex items-center justify-between gap-2">
            
            {/* User Avatar with dynamic Auric Corona Ring */}
            <div className="flex items-center gap-3">
              <div className="relative group cursor-pointer" onClick={() => setShowAuraField(!showAuraField)}>
                <div 
                  className="w-12 h-12 rounded-full p-0.5 border-2 overflow-hidden shadow-md transition-all duration-500"
                  style={{
                    borderColor: auraConfig.primary,
                    boxShadow: `0 0 12px ${auraConfig.primary}`,
                  }}
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span 
                  className="absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-black rounded-full transition-colors duration-500 animate-pulse"
                  style={{ backgroundColor: auraConfig.primary }}
                  title={`Active Aura: ${user.activeAura}`}
                />
              </div>

              <div>
                <h2 className={`text-base font-cinzel font-bold tracking-wide ${
                  isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'
                }`}>
                  {user.name}
                </h2>
                
                {/* Interactive Aura Indicator Badge */}
                <button
                  id="user-profile-aura-toggle-badge"
                  onClick={() => setShowAuraField(!showAuraField)}
                  className="inline-flex items-center gap-1.5 mt-0.5 px-2 py-0.5 rounded-full border text-[0.62rem] font-serif transition-all hover:scale-105 cursor-pointer shadow-xs"
                  style={{
                    borderColor: `${auraConfig.primary}60`,
                    backgroundColor: `${auraConfig.primary}20`,
                    color: isDark ? '#fdf2d1' : '#3b2b0a',
                  }}
                >
                  <span 
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: auraConfig.primary }}
                  />
                  <span className="font-cinzel font-semibold">{user.activeAura}</span>
                  <span className="opacity-70 font-mono">({auraConfig.frequency}Hz)</span>
                </button>
              </div>
            </div>

            {/* Learning Resonance Gauge */}
            <div className="flex items-center gap-2 text-right">
              <div className="flex flex-col">
                <span className={`text-[0.62rem] font-cinzel font-medium leading-tight ${isDark ? 'text-gray-400' : 'text-amber-900/70'}`}>
                  Learning<br />Resonance
                </span>
              </div>

              {/* Circular SVG Gauge with Framer Motion stroke animation */}
              <div className="relative w-11 h-11 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className={isDark ? 'text-gray-800' : 'text-amber-200/60'}
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <motion.path
                    className="text-[#d4af37]"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    initial={{ strokeDasharray: "0, 100" }}
                    animate={{ strokeDasharray: `${user.learningResonance}, 100` }}
                    transition={{ type: "spring", stiffness: 50, damping: 14, duration: 1.2 }}
                  />
                </svg>
                <motion.span 
                  key={user.learningResonance}
                  initial={{ scale: 1.25 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute text-xs font-mono font-bold ${
                    isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'
                  }`}
                >
                  {user.learningResonance}%
                </motion.span>
              </div>
            </div>

          </div>

          {/* Expandable Interactive D3 Aura Field Section */}
          <AnimatePresence>
            {showAuraField && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-2 border-t border-amber-500/20">
                  <div className="flex items-center justify-between mb-1.5 px-0.5">
                    <span className="text-[0.62rem] font-cinzel font-bold tracking-wider text-[#d4af37] flex items-center gap-1">
                      <Radio className="w-3 h-3 text-amber-400 animate-pulse" />
                      Interactive D3 Aura Field
                    </span>
                    <span className="text-[0.58rem] font-mono text-gray-400">
                      {auraConfig.chakra}
                    </span>
                  </div>

                  {/* D3 Canvas Visualization Component */}
                  <AuraFieldVisualization
                    theme={theme}
                    activeAura={user.activeAura}
                    onSelectAura={handleAuraChange}
                    interactive={true}
                    height={180}
                    compact={true}
                    avatarUrl={user.avatarUrl}
                    userName={user.name}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* 2. Institute Subheader */}
        <div className="text-center relative z-10 mb-5 pb-3 border-b border-amber-500/20">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <img src={SRI_YANTRA_LOGO} alt="Institute" className="w-5 h-5 object-contain" />
            <span className={`text-[0.68rem] font-serif tracking-wider uppercase ${
              isDark ? 'text-gray-300' : 'text-[#6b5118]'
            }`}>
              All India Institute of Occult Science
            </span>
          </div>

          <h1 className="text-2xl font-cinzel font-bold tracking-widest uppercase text-gold-gradient">
            QUANTUM
          </h1>
          <p className={`text-[0.7rem] font-cinzel tracking-[0.25em] uppercase font-semibold ${
            isDark ? 'text-[#d4af37]' : 'text-[#8a6514]'
          }`}>
            STUDENT DASHBOARD
          </p>

          {/* Overall Curriculum Mastery Bar */}
          <div className="mt-3 px-1">
            <div className="flex justify-between items-center text-[0.65rem] font-serif mb-1">
              <span className={isDark ? 'text-gray-400' : 'text-amber-900/70'}>Curriculum Completion:</span>
              <motion.span 
                key={totalProgress}
                initial={{ scale: 1.15, color: '#ffd700' }}
                animate={{ scale: 1, color: isDark ? '#d4af37' : '#8a6514' }}
                className="font-mono font-bold"
              >
                {totalProgress}% Complete
              </motion.span>
            </div>
            
            {/* Animated Master Progress Bar */}
            <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-[#d4af37]/30 p-0.5 relative">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#8a001a] via-amber-500 to-[#d4af37] relative shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                initial={{ width: 0 }}
                animate={{ width: `${totalProgress}%` }}
                transition={{
                  type: "spring",
                  stiffness: 55,
                  damping: 14,
                  mass: 0.8,
                }}
              >
                {/* Continuous Shimmer Light Sweep */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* 3. Section: Continue Learning (Carousel Grid with Framer Motion Animated Progress Bars) */}
        <div className="relative z-10 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-cinzel font-bold flex items-center gap-1.5 ${
              isDark ? 'text-[#fdf2d1]' : 'text-[#422e06]'
            }`}>
              <span>Continue Learning</span>
              <span className="text-[0.65rem] font-mono font-normal text-[#d4af37] px-1.5 py-0.2 rounded bg-[#d4af37]/10 border border-[#d4af37]/30">
                {courses.filter(c => c.progressPercent > 0).length} Active
              </span>
            </h3>
            
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevCarousel}
                className={`p-1 rounded-full border transition-colors cursor-pointer ${
                  isDark ? 'border-gray-700 text-gray-400 hover:text-white' : 'border-amber-200 text-amber-800'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNextCarousel}
                className={`p-1 rounded-full border transition-colors cursor-pointer ${
                  isDark ? 'border-gray-700 text-gray-400 hover:text-white' : 'border-amber-200 text-amber-800'
                }`}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Carousel Card Grid (3 Cards visible horizontally) */}
          <div className="grid grid-cols-3 gap-2">
            {visibleCarouselCourses.map((course) => (
              <div 
                key={course.id}
                onClick={() => onOpenCourse(course.id)}
                className={`p-2.5 rounded-xl border flex flex-col justify-between text-center transition-all cursor-pointer group hover:-translate-y-0.5 shadow-md ${
                  course.progressPercent > 0
                    ? isDark ? 'bg-black/50 border-[#d4af37]/50 shadow-[0_0_12px_rgba(212,175,55,0.15)]' : 'bg-white/95 border-[#c5a059]/60 shadow-sm'
                    : isDark ? 'bg-black/35 border-gray-800' : 'bg-white/80 border-gray-200'
                }`}
              >
                <div>
                  <div className="w-7 h-7 mx-auto mb-1 text-[#d4af37] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getCourseIcon(course.iconName)}
                  </div>
                  <h4 className={`text-[0.68rem] font-cinzel font-bold leading-tight line-clamp-2 min-h-[1.7rem] ${
                    isDark ? 'text-gray-200 group-hover:text-[#ffd700]' : 'text-[#3b2b0a] group-hover:text-[#8a6514]'
                  }`}>
                    {course.title}
                  </h4>
                  
                  {/* Framer Motion Animated Progress Bar */}
                  <div className="mt-2 mb-1.5">
                    <div className="flex justify-between items-center text-[0.58rem] font-mono text-[#d4af37] mb-0.5 px-0.5">
                      <span className="opacity-70">Progress</span>
                      <motion.span
                        key={course.progressPercent}
                        initial={{ scale: 1.3, color: '#ffd700' }}
                        animate={{ scale: 1, color: isDark ? '#fdf2d1' : '#5c440a' }}
                        transition={{ duration: 0.35 }}
                        className="font-bold"
                      >
                        {course.progressPercent}%
                      </motion.span>
                    </div>

                    <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden border border-[#d4af37]/30 p-[1px] relative">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-amber-600 via-[#d4af37] to-amber-300 relative shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progressPercent}%` }}
                        transition={{
                          type: "spring",
                          stiffness: 65,
                          damping: 13,
                          mass: 0.75,
                        }}
                      >
                        {/* Shimmer light beam running across */}
                        {course.progressPercent > 0 && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                          />
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Action button: Start Now, Resume, or Advance Lesson (+20%) */}
                <div className="mt-2 space-y-1">
                  {course.progressPercent === 0 ? (
                    <button
                      onClick={(e) => handleAdvanceLesson(e, course.id)}
                      className="w-full py-1 px-1 rounded-md text-[0.62rem] font-cinzel font-bold bg-gold-gradient-btn text-black shadow-md hover:shadow-[0_0_15px_rgba(212,175,55,0.6)] transition-all cursor-pointer"
                    >
                      Start Now
                    </button>
                  ) : course.progressPercent >= 100 ? (
                    <div className="w-full py-1 px-1 rounded-md text-[0.6rem] font-cinzel font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Completed</span>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => handleAdvanceLesson(e, course.id)}
                      title="Advance lesson step (+20% progress)"
                      className={`w-full py-1 px-1 rounded-md text-[0.62rem] font-cinzel font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        isDark 
                          ? 'bg-amber-500/20 text-[#fdf2d1] border border-amber-500/50 hover:bg-amber-500/35 shadow-sm' 
                          : 'bg-amber-100 text-[#8a6514] border border-amber-300 hover:bg-amber-200'
                      }`}
                    >
                      <Zap className="w-2.5 h-2.5 text-amber-400 animate-bounce" />
                      <span>+20% Lesson</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Highlight Action Button: QUANTUM PRACTICE */}
        <div className="relative z-10 my-6">
          <button
            id="student-quantum-practice-btn"
            onClick={handleStartPractice}
            className={`btn-soft-glow w-full py-3.5 px-6 rounded-xl font-cinzel font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
              isDark
                ? 'bg-maroon-gradient border-2 border-[#d4af37] text-[#fdf2d1] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)]'
                : 'bg-gradient-to-r from-[#8a001a] via-[#5c0011] to-[#8a001a] border-2 border-[#d4af37] text-white hover:shadow-xl'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
            <span>QUANTUM PRACTICE</span>
            <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
          </button>
        </div>

        {/* 5. Section: Learning Path (Connected Tree with Framer Motion Animated Progress Bars) */}
        <div className="relative z-10 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-cinzel font-bold ${
              isDark ? 'text-[#fdf2d1]' : 'text-[#422e06]'
            }`}>
              Learning Path (Sacred Modules)
            </h3>
            <span className="text-[0.65rem] font-serif text-[#d4af37]">
              Step-by-step Mastery
            </span>
          </div>

          {/* Connected Tree Container */}
          <div className="space-y-3 relative">
            {/* Vertical connector line */}
            <div className="absolute top-4 bottom-4 left-6 w-0.5 bg-gradient-to-b from-[#d4af37] via-amber-500/40 to-transparent pointer-events-none" />

            {courses.slice(3, 7).map((course) => (
              <div
                key={course.id}
                onClick={() => onOpenCourse(course.id)}
                className={`relative z-10 p-3.5 rounded-xl border flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.01] shadow-md group ${
                  isDark ? 'bg-black/60 border-[#d4af37]/35 hover:border-[#ffd700]' : 'bg-white/90 border-[#c5a059]/50 shadow-sm hover:border-[#8a6514]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37] flex-shrink-0 group-hover:scale-110 transition-transform">
                      {getCourseIcon(course.iconName)}
                    </div>
                    <div>
                      <h4 className={`text-xs font-cinzel font-bold group-hover:text-[#ffd700] transition-colors ${
                        isDark ? 'text-gray-100' : 'text-[#3b2b0a]'
                      }`}>
                        {course.title}
                      </h4>
                      <span className="text-[0.62rem] font-serif text-gray-400 block">
                        {course.duration} • {course.instructor}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleAdvanceLesson(e, course.id)}
                      title="Advance Progress (+20%)"
                      className="p-1.5 rounded-lg border border-[#d4af37]/40 bg-[#d4af37]/15 text-[#fdf2d1] hover:bg-[#d4af37] hover:text-black transition-all cursor-pointer"
                    >
                      <Zap className="w-3 h-3" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#d4af37] transition-colors" />
                  </div>
                </div>

                {/* Smooth Framer Motion Progress Bar for Tree Node */}
                <div className="w-full mt-1 pt-1.5 border-t border-amber-500/15">
                  <div className="flex justify-between items-center text-[0.62rem] font-mono text-[#d4af37] mb-1">
                    <span className="flex items-center gap-1 font-serif">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        course.progressPercent >= 100 ? 'bg-emerald-400' : course.progressPercent > 0 ? 'bg-amber-400' : 'bg-gray-500'
                      }`} />
                      {course.progressPercent >= 100 ? 'Initiation Mastered' : course.progressPercent > 0 ? 'In Progression' : 'Awaiting Enrollment'}
                    </span>
                    <motion.span
                      key={course.progressPercent}
                      initial={{ scale: 1.25, color: '#ffd700' }}
                      animate={{ scale: 1, color: isDark ? '#fdf2d1' : '#5c440a' }}
                      transition={{ duration: 0.3 }}
                      className="font-bold font-mono"
                    >
                      {course.progressPercent}%
                    </motion.span>
                  </div>
                  
                  <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-[#d4af37]/25 p-[1px] relative">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-amber-600 via-[#d4af37] to-amber-300 relative shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progressPercent}%` }}
                      transition={{
                        type: "spring",
                        stiffness: 60,
                        damping: 14,
                        mass: 0.8,
                      }}
                    >
                      {course.progressPercent > 0 && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                        />
                      )}
                    </motion.div>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* 6. Bottom App Navigation Bar */}
        <div className={`mt-6 pt-3 border-t flex items-center justify-around text-xs font-cinzel ${
          isDark ? 'border-amber-500/20 text-gray-300' : 'border-amber-200 text-[#5a4313]'
        }`}>
          
          <button
            onClick={() => onNavigate('landing')}
            className="flex flex-col items-center gap-1 hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4 text-[#d4af37]" />
            <span className="text-[0.65rem]">Home</span>
          </button>

          <button
            onClick={() => onNavigate('academy')}
            className="flex flex-col items-center gap-1 hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[0.65rem]">Courses</span>
          </button>

          <button
            onClick={() => onNavigate('practice')}
            className="flex flex-col items-center gap-1 text-[#d4af37] font-bold cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
            <span className="text-[0.65rem]">Practice</span>
          </button>

          <button
            onClick={() => onNavigate('consultations')}
            className="flex flex-col items-center gap-1 hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span className="text-[0.65rem]">Community</span>
          </button>

        </div>

      </div>

    </div>
  );
};
