import React, { useState } from 'react';
import { CourseModule, ThemeMode } from '../../types';
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Star, 
  Sparkles, 
  CheckCircle, 
  Play, 
  Compass, 
  Layers, 
  Hand, 
  Gem, 
  SunMedium, 
  Lock 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AcademyCoursesScreenProps {
  theme: ThemeMode;
  courses: CourseModule[];
  onSelectCourse: (courseId: string) => void;
  onEnroll: (courseId: string) => void;
}

export const AcademyCoursesScreen: React.FC<AcademyCoursesScreenProps> = ({
  theme,
  courses,
  onSelectCourse,
  onEnroll,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedCourseModal, setSelectedCourseModal] = useState<CourseModule | null>(null);
  const isDark = theme === 'dark';

  const categories = ['All', 'Core Curriculum', 'Divination & Archetypes', 'Somatic Occultism', 'Vibrational Medicine', 'Jyotish Sacred Science'];

  const filteredCourses = activeCategory === 'All' 
    ? courses 
    : courses.filter(c => c.category === activeCategory);

  const handleEnrollModal = (course: CourseModule) => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#fdf2d1', '#5c0011'],
      });
    } catch {}
    onEnroll(course.id);
    setSelectedCourseModal(null);
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

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 text-xs font-cinzel tracking-widest uppercase text-[#d4af37]"
          style={{
            backgroundColor: isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(245, 238, 218, 0.8)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(197, 160, 89, 0.5)',
          }}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>All India Institute of Occult Science Curriculum</span>
        </div>

        <h1 className={`text-3xl sm:text-4xl font-cinzel font-bold tracking-wide uppercase ${
          isDark ? 'text-gold-gradient' : 'text-[#3b2b0a]'
        }`}>
          Occult Science Academy
        </h1>

        <p className={`text-sm font-serif max-w-2xl mx-auto mt-2 ${
          isDark ? 'text-gray-300' : 'text-[#5a4313]'
        }`}>
          Master sacred numerological geometry, Vedic astral charts, Tarot archetypes, and vibrational medicine.
        </p>

        {/* Category Pill Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-cinzel transition-all cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-amber-500/20 text-[#fdf2d1] border border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                      : 'bg-[#c5a059] text-white shadow-sm'
                    : isDark
                      ? 'bg-black/40 border border-[#d4af37]/25 text-gray-300 hover:border-[#d4af37]/60'
                      : 'bg-white border border-[#c5a059]/40 text-[#5a4313] hover:bg-amber-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            id={`course-card-${course.id}`}
            className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
              isDark ? 'glassmorphism-dark text-gray-200' : 'glassmorphism-light text-[#3b2b0a]'
            }`}
          >
            <div>
              {/* Card Top Row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37]">
                  {getCourseIcon(course.iconName)}
                </div>
                <span className={`text-[0.65rem] font-mono px-2 py-0.5 rounded-full border ${
                  isDark ? 'bg-black/50 border-[#d4af37]/30 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-900'
                }`}>
                  +{course.learningResonanceGain}% Resonance
                </span>
              </div>

              <span className={`text-[0.68rem] font-cinzel font-semibold uppercase tracking-wider block mb-1 ${
                isDark ? 'text-[#d4af37]' : 'text-[#8a6514]'
              }`}>
                {course.category}
              </span>

              <h3 className={`text-base font-cinzel font-bold leading-snug mb-2 ${
                isDark ? 'text-gray-100' : 'text-[#3b2b0a]'
              }`}>
                {course.title}
              </h3>

              <p className={`text-xs font-serif leading-relaxed line-clamp-2 mb-4 ${
                isDark ? 'text-gray-300' : 'text-[#5a4313]'
              }`}>
                {course.description}
              </p>

              {/* Course Meta Info */}
              <div className={`p-3 rounded-xl border space-y-1.5 text-xs font-serif mb-4 ${
                isDark ? 'bg-black/40 border-[#d4af37]/20 text-gray-300' : 'bg-white/70 border-[#c5a059]/30 text-[#4d3809]'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="opacity-80">Instructor:</span>
                  <span className="font-semibold text-[#d4af37]">{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="opacity-80">Duration:</span>
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Progress if started */}
              {course.progressPercent > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-[0.68rem] font-mono mb-1 text-[#d4af37]">
                    <span>Initiation Progress</span>
                    <span>{course.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-700/30 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-[#d4af37] h-full"
                      style={{ width: `${course.progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-amber-500/20">
              <button
                onClick={() => setSelectedCourseModal(course)}
                className={`flex-1 py-2 px-3 rounded-lg border text-xs font-cinzel font-semibold transition-all cursor-pointer ${
                  isDark
                    ? 'border-[#d4af37]/40 text-gray-200 hover:bg-white/5'
                    : 'border-[#c5a059] text-[#5a4313] hover:bg-amber-50'
                }`}
              >
                Curriculum Details
              </button>

              <button
                onClick={() => handleEnrollModal(course)}
                className="py-2 px-4 rounded-lg bg-gold-gradient-btn text-black font-cinzel font-bold text-xs shadow-md hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all cursor-pointer flex items-center gap-1"
              >
                {course.progressPercent > 0 ? <Play className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                <span>{course.progressPercent > 0 ? 'Resume' : 'Enroll'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Course Detail Modal */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className={`relative w-full max-w-lg rounded-2xl p-6 sm:p-8 border shadow-2xl ${
            isDark ? 'bg-[#10101a] border-[#d4af37]/40 text-gray-200' : 'bg-[#fdfbf6] border-[#c5a059]/60 text-[#3b2b0a]'
          }`}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-cinzel text-[#d4af37] tracking-wider uppercase font-semibold">
                  {selectedCourseModal.category}
                </span>
                <h3 className="text-xl font-cinzel font-bold text-gold-gradient mt-0.5">
                  {selectedCourseModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="p-1 rounded-full text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-sm font-serif leading-relaxed mb-4">
              {selectedCourseModal.description}
            </p>

            <h4 className="text-xs font-cinzel font-bold uppercase tracking-wider text-[#d4af37] mb-2">
              Syllabus & Cosmic Modules
            </h4>

            <ul className="space-y-2 mb-6">
              {selectedCourseModal.keyTopics.map((topic, i) => (
                <li key={i} className="flex items-center gap-2 text-xs font-serif">
                  <CheckCircle className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="flex-1 py-2.5 rounded-lg border text-xs font-cinzel cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => handleEnrollModal(selectedCourseModal)}
                className="flex-1 py-2.5 rounded-lg bg-maroon-gradient border border-[#d4af37] text-[#fdf2d1] font-cinzel font-bold text-xs shadow-lg cursor-pointer"
              >
                Start Learning Now →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
