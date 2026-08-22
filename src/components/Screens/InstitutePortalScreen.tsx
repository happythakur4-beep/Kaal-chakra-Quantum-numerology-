import React, { useState } from 'react';
import { ScreenType, ThemeMode, UserProfile, AuraType, ReportItem, Consultation } from '../../types';
import { SRI_YANTRA_LOGO } from '../../data/mockData';
import { AuraFrequencyWidget } from '../AuraFrequencyWidget';
import { CosmicAffirmationWidget } from '../CosmicAffirmationWidget';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Clock, 
  FileText, 
  CreditCard, 
  ShieldCheck, 
  User, 
  CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InstitutePortalScreenProps {
  theme: ThemeMode;
  user: UserProfile;
  reports: ReportItem[];
  consultations: Consultation[];
  onNavigate: (screen: ScreenType) => void;
  onSelectAura: (aura: AuraType) => void;
  onUnlockDestinyReport: (contribution: number) => void;
  onViewReport: (reportId: string) => void;
  onBookConsultation: (consultationId: string) => void;
}

export const InstitutePortalScreen: React.FC<InstitutePortalScreenProps> = ({
  theme,
  user,
  reports,
  consultations,
  onNavigate,
  onSelectAura,
  onUnlockDestinyReport,
  onViewReport,
  onBookConsultation,
}) => {
  const [contribution, setContribution] = useState<string>('108');
  const [contributionUnlocked, setContributionUnlocked] = useState(false);
  const isDark = theme === 'dark';

  const handleBalanceAndUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(contribution) || 10;
    
    try {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#fdf2d1', '#5c0011'],
      });
    } catch {}

    setContributionUnlocked(true);
    setTimeout(() => {
      onUnlockDestinyReport(amount);
      onNavigate('report');
    }, 700);
  };

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Central Institute Header & Sri Yantra Emblem (Exact Header from Screenshots 2 & 6) */}
      <div className="text-center mb-8 flex flex-col items-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mb-3 relative">
          <img
            src={SRI_YANTRA_LOGO}
            alt="Sri Yantra Institute Emblem"
            className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] animate-spin-slow"
          />
        </div>
        
        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold tracking-wider uppercase ${
          isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'
        }`}>
          Occult Science Institute
        </h1>
        
        <p className={`text-xs font-cinzel tracking-widest uppercase mt-1 ${
          isDark ? 'text-[#d4af37]/80' : 'text-[#8a6514]'
        }`}>
          Central Member Sanctum & Quantum Calibration
        </p>

        {/* Portal Internal Nav Bar (Screenshots 2 & 6) */}
        <div className="mt-6 inline-flex items-center gap-2 sm:gap-6 px-6 py-2 rounded-full border text-xs font-cinzel shadow-sm"
          style={{
            backgroundColor: isDark ? 'rgba(18, 18, 28, 0.7)' : 'rgba(255, 252, 245, 0.85)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(197, 160, 89, 0.4)',
          }}
        >
          <button 
            onClick={() => onNavigate('landing')}
            className={`hover:text-[#d4af37] transition-colors cursor-pointer ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('academy')}
            className={`hover:text-[#d4af37] transition-colors cursor-pointer ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}
          >
            Courses
          </button>
          <button 
            onClick={() => onNavigate('report')}
            className={`font-semibold cursor-pointer ${isDark ? 'text-[#d4af37]' : 'text-[#8a6514]'}`}
          >
            Reports
          </button>
          <button 
            onClick={() => onNavigate('consultations')}
            className={`hover:text-[#d4af37] transition-colors cursor-pointer ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}
          >
            Consultations
          </button>
          <button 
            onClick={() => onNavigate('student')}
            className="p-1 rounded-full text-[#d4af37] hover:scale-110 transition-transform cursor-pointer"
            title="Student Profile"
          >
            <User className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Daily Cosmic Affirmation Widget (Tailored to user.activeAura) */}
      <div className="mb-8">
        <CosmicAffirmationWidget
          theme={theme}
          activeAura={user.activeAura}
          userName={user.name}
          onNavigateToPractice={() => onNavigate('practice')}
        />
      </div>

      {/* Main 3-Column Dashboard Bento Grid (Screenshots 2 & 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Your Cosmic Career Path */}
        <div 
          id="portal-career-path-card"
          className={`rounded-xl p-6 border flex flex-col justify-between transition-all duration-300 ${
            isDark ? 'glassmorphism-dark text-gray-200' : 'glassmorphism-light text-[#3b2b0a]'
          }`}
        >
          <div>
            <h2 className={`text-xl font-cinzel font-bold mb-2 ${
              isDark ? 'text-[#fdf2d1]' : 'text-[#422e06]'
            }`}>
              Your Cosmic Career Path
            </h2>
            
            <p className={`text-sm font-serif leading-relaxed mb-6 ${
              isDark ? 'text-gray-300' : 'text-[#5a4313]'
            }`}>
              Unlock your professional destiny with quantum numerology and multi-dimensional Nakshatra resonance.
            </p>

            {/* Karma-based pricing badge note */}
            <div className={`p-3 rounded-lg border mb-5 text-xs font-serif ${
              isDark ? 'bg-black/40 border-[#d4af37]/20 text-gray-300' : 'bg-amber-50/80 border-[#c5a059]/30 text-[#5a4313]'
            }`}>
              <div className="flex items-center gap-1.5 font-cinzel font-semibold mb-1 text-[#d4af37]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Karma-Based Energy Exchange</span>
              </div>
              <p>Choose your voluntary value for spiritual insights. Minimum contribution is ₹10 to seal the karmic balance.</p>
            </div>
          </div>

          <form onSubmit={handleBalanceAndUnlock} className="space-y-4">
            <div className="relative">
              <label htmlFor="portal-contribution-input" className="sr-only">Enter your contribution</label>
              <input
                id="portal-contribution-input"
                type="number"
                min="10"
                required
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                placeholder="Enter your contribution"
                className={`w-full pl-4 pr-16 py-3 rounded-lg border text-sm transition-all focus:outline-none ${
                  isDark
                    ? 'bg-black/50 border-[#d4af37]/40 text-gray-200 placeholder-gray-500 focus:border-[#d4af37]'
                    : 'bg-white border-[#c5a059]/50 text-[#3b2b0a] placeholder-[#8a6514]/50 focus:border-[#8a6514]'
                }`}
              />
              <span className={`absolute right-3 top-3 text-xs font-semibold px-2 py-0.5 rounded ${
                isDark ? 'bg-[#d4af37]/20 text-[#fdf2d1]' : 'bg-amber-100 text-[#8a6514]'
              }`}>
                Min. ₹10
              </span>
            </div>

            <button
              id="portal-balance-unlock-btn"
              type="submit"
              className={`w-full py-3 px-4 rounded-lg font-cinzel font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                isDark
                  ? 'bg-gold-gradient-btn text-black hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]'
                  : 'bg-[#c5a059] hover:bg-[#b08d47] text-white shadow-md'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{contributionUnlocked ? 'Resonating...' : 'Balance & Unlock'}</span>
            </button>
          </form>
        </div>

        {/* Column 2: Recent Reports & Upcoming Consultations */}
        <div className="space-y-6 flex flex-col">
          
          {/* Card: Recent Reports */}
          <div 
            id="portal-recent-reports-card"
            className={`rounded-xl p-5 border flex-1 flex flex-col justify-between transition-all ${
              isDark ? 'glassmorphism-dark text-gray-200' : 'glassmorphism-light text-[#3b2b0a]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-base font-cinzel font-bold flex items-center gap-2 ${
                  isDark ? 'text-[#fdf2d1]' : 'text-[#422e06]'
                }`}>
                  <FileText className="w-4 h-4 text-[#d4af37]" />
                  Recent Reports
                </h3>
              </div>

              <div className="space-y-2.5">
                {reports.slice(0, 2).map((rep) => (
                  <button
                    key={rep.id}
                    onClick={() => {
                      onViewReport(rep.id);
                      onNavigate('report');
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-serif text-left transition-all cursor-pointer ${
                      isDark
                        ? 'hover:bg-white/5 border border-transparent hover:border-[#d4af37]/30'
                        : 'hover:bg-amber-100/50 border border-transparent hover:border-[#c5a059]/40'
                    }`}
                  >
                    <div>
                      <span className={`font-semibold block ${isDark ? 'text-gray-200' : 'text-[#3b2b0a]'}`}>
                        {rep.title}
                      </span>
                      <span className={`text-[0.65rem] ${isDark ? 'text-gray-400' : 'text-amber-900/60'}`}>
                        {rep.category}
                      </span>
                    </div>
                    <span className={`text-xs font-mono font-medium ${isDark ? 'text-[#d4af37]' : 'text-[#8a6514]'}`}>
                      {rep.date}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              id="portal-view-all-reports-btn"
              onClick={() => onNavigate('report')}
              className={`w-full mt-3 py-2 px-3 rounded-lg border text-xs font-cinzel tracking-wider text-center transition-all cursor-pointer ${
                isDark
                  ? 'border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10'
                  : 'border-[#c5a059]/60 text-[#8a6514] hover:bg-amber-100/70'
              }`}
            >
              View All Reports
            </button>
          </div>

          {/* Card: Upcoming Consultations */}
          <div 
            id="portal-upcoming-consultations-card"
            className={`rounded-xl p-5 border flex-1 flex flex-col justify-between transition-all ${
              isDark ? 'glassmorphism-dark text-gray-200' : 'glassmorphism-light text-[#3b2b0a]'
            }`}
          >
            <div>
              <h3 className={`text-base font-cinzel font-bold mb-3 flex items-center gap-2 ${
                isDark ? 'text-[#fdf2d1]' : 'text-[#422e06]'
              }`}>
                <Calendar className="w-4 h-4 text-[#d4af37]" />
                Upcoming Consultations
              </h3>

              <div className="space-y-2.5">
                {consultations.slice(0, 2).map((con) => (
                  <button
                    key={con.id}
                    onClick={() => {
                      onBookConsultation(con.id);
                      onNavigate('consultations');
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-serif text-left transition-all cursor-pointer ${
                      isDark
                        ? 'hover:bg-white/5 border border-transparent hover:border-[#d4af37]/30'
                        : 'hover:bg-amber-100/50 border border-transparent hover:border-[#c5a059]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={con.avatarUrl}
                        alt={con.practitionerName}
                        className="w-7 h-7 rounded-full object-cover border border-[#d4af37]/50"
                      />
                      <div>
                        <span className={`font-semibold block ${isDark ? 'text-gray-200' : 'text-[#3b2b0a]'}`}>
                          {con.practitionerName}
                        </span>
                        <span className={`text-[0.65rem] ${isDark ? 'text-gray-400' : 'text-amber-900/60'}`}>
                          {con.specialty.split('&')[0]}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-mono block ${isDark ? 'text-[#d4af37]' : 'text-[#8a6514]'}`}>
                        {con.date.split(',')[0]}
                      </span>
                      <span className={`text-[0.65rem] font-mono ${isDark ? 'text-gray-400' : 'text-amber-900/60'}`}>
                        {con.time.split(' ')[0]} {con.time.split(' ')[1]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              id="portal-view-consultations-btn"
              onClick={() => onNavigate('consultations')}
              className={`w-full mt-3 py-2 px-3 rounded-lg border text-xs font-cinzel tracking-wider text-center transition-all cursor-pointer ${
                isDark
                  ? 'border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10'
                  : 'border-[#c5a059]/60 text-[#8a6514] hover:bg-amber-100/70'
              }`}
            >
              Manage Consultations
            </button>
          </div>

        </div>

        {/* Column 3: Aura Frequency Widget & Live Vibration Sync */}
        <div className="flex flex-col gap-4">
          <AuraFrequencyWidget
            theme={theme}
            activeAura={user.activeAura}
            onSelectAura={onSelectAura}
            onOpenSettings={() => onNavigate('practice')}
          />

          {/* Quick Learning Path Teaser */}
          <div className={`p-5 rounded-xl border text-xs font-serif ${
            isDark ? 'glassmorphism-dark text-gray-300' : 'glassmorphism-light text-[#5a4313]'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-cinzel font-semibold text-[#d4af37]">Active Study Resonance</span>
              <span className="font-mono font-bold">{user.learningResonance}%</span>
            </div>
            <div className="w-full bg-gray-700/30 h-2 rounded-full overflow-hidden mb-3">
              <div
                className="bg-gradient-to-r from-amber-500 to-[#d4af37] h-full rounded-full transition-all duration-500"
                style={{ width: `${user.learningResonance}%` }}
              />
            </div>
            <button
              id="portal-resume-student-dashboard-btn"
              onClick={() => onNavigate('student')}
              className="w-full py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-[#d4af37] font-cinzel text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Open Student Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
