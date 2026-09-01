import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flame,
  Scroll,
  ShieldAlert,
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  HeartCrack,
  CheckCircle2,
  RefreshCw,
  Award,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Trash2,
  Compass,
  Lock,
  Eye,
  Feather,
  Info,
  Scale,
  Brain,
  Coins,
  Crown,
  Users,
  MessageSquareX,
  HeartOff,
  AlertTriangle,
  Send,
  Printer,
  Calendar,
  Check
} from 'lucide-react';
import {
  SinCategoryKey,
  GitaSinDefinition,
  ConfessionRecord,
  SIN_CATEGORIES,
  GITA_SIN_REGISTRY,
  INITIAL_CONFESSIONS,
  evaluateConfessionWithGita
} from '../../data/gitaConfessionData';
import { PersonKarmaProfile, KarmaItem } from '../../data/karmaData';
import { cosmicAudio } from '../../utils/audioSynthesizer';

interface GitaConfessionSanctumProps {
  isDark?: boolean;
  currentProfile: PersonKarmaProfile;
  onAddKarmaItem?: (item: KarmaItem) => void;
  onCloseSanctum?: () => void;
}

export const GitaConfessionSanctum: React.FC<GitaConfessionSanctumProps> = ({
  isDark = true,
  currentProfile,
  onAddKarmaItem,
  onCloseSanctum
}) => {
  // Main Sanctum View Modes
  const [sanctumView, setSanctumView] = useState<'altar' | 'codex' | 'agnikund' | 'vows'>('altar');

  // Audio tone state
  const [activeFrequencyHz, setActiveFrequencyHz] = useState<number | null>(null);
  const [isPlayingOm, setIsPlayingOm] = useState(false);

  // Confessions storage
  const [confessions, setConfessions] = useState<ConfessionRecord[]>(INITIAL_CONFESSIONS);
  const [selectedConfessionForAgni, setSelectedConfessionForAgni] = useState<ConfessionRecord | null>(INITIAL_CONFESSIONS[0]);

  // Altar Step-by-Step State
  const [altarStep, setAltarStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedCategory, setSelectedCategory] = useState<SinCategoryKey>('vishwasghata');
  const [customSinTitle, setCustomSinTitle] = useState('');
  const [customConfessionText, setCustomConfessionText] = useState('');
  const [remorseLevel, setRemorseLevel] = useState<'mild' | 'deep' | 'agonized'>('deep');
  const [harmScope, setHarmScope] = useState<'individual' | 'family' | 'community' | 'self'>('individual');
  const [evaluatedSinResult, setEvaluatedSinResult] = useState<GitaSinDefinition | null>(null);
  const [latestCreatedConfession, setLatestCreatedConfession] = useState<ConfessionRecord | null>(null);

  // Agni Kund Animation State
  const [isBurningInAgni, setIsBurningInAgni] = useState(false);
  const [hasBurnedComplete, setHasBurnedComplete] = useState(false);
  const [flameIntensity, setFlameIntensity] = useState<number>(3);

  // Codex Search & Filter
  const [codexCategoryFilter, setCodexCategoryFilter] = useState<string>('all');
  const [selectedCodexSin, setSelectedCodexSin] = useState<GitaSinDefinition>(GITA_SIN_REGISTRY[0]);

  // Audio helper
  const handlePlayFrequency = (hz: number) => {
    if (activeFrequencyHz === hz) {
      cosmicAudio.stopFrequencyTone();
      setActiveFrequencyHz(null);
    } else {
      cosmicAudio.playFrequencyTone(hz, 0.25, 'sine');
      setActiveFrequencyHz(hz);
    }
  };

  const handleToggleSacredOm = () => {
    if (isPlayingOm) {
      cosmicAudio.stopFrequencyTone();
      setIsPlayingOm(false);
      setActiveFrequencyHz(null);
    } else {
      cosmicAudio.playFrequencyTone(108, 0.3, 'sine');
      setIsPlayingOm(true);
      setActiveFrequencyHz(108);
    }
  };

  // Evaluate & Proceed in Altar
  const handleProceedToVerdict = () => {
    if (!customConfessionText.trim()) return;
    cosmicAudio.playCosmicChime(528);
    const evaluated = evaluateConfessionWithGita(
      selectedCategory,
      customConfessionText,
      remorseLevel,
      harmScope
    );
    setEvaluatedSinResult(evaluated);
    setAltarStep(3);
  };

  // Finalize Confession & Create Record
  const handleCommitConfession = () => {
    if (!evaluatedSinResult) return;
    cosmicAudio.playCosmicChime(639);

    const newConf: ConfessionRecord = {
      id: `conf-${Date.now()}`,
      personName: currentProfile.personName,
      date: new Date().toISOString().split('T')[0],
      category: selectedCategory,
      sinTitle: customSinTitle || evaluatedSinResult.englishTitle,
      confessionText: customConfessionText,
      remorseLevel,
      harmScope,
      evaluatedSin: evaluatedSinResult,
      atonementVowStatus: 'active',
      vowProgressDays: 1,
      totalVowDays: evaluatedSinResult.prayashchitta.sankalpaDurationDays,
      isBurnedInAgni: false
    };

    setConfessions(prev => [newConf, ...prev]);
    setLatestCreatedConfession(newConf);
    setSelectedConfessionForAgni(newConf);

    // Also integrate with karma profile ledger if callback is available
    if (onAddKarmaItem) {
      onAddKarmaItem({
        id: `gita-papa-${Date.now()}`,
        title: `[GITA CONFESSION] ${newConf.sinTitle}`,
        hindiTitle: evaluatedSinResult.devanagariTitle,
        type: 'papa',
        category: 'vachika',
        points: -Math.abs(evaluatedSinResult.karmicTollPoints),
        intensity: 'significant',
        description: `Confessed at Altar: "${customConfessionText.substring(0, 100)}..." Under Chapter ${evaluatedSinResult.gitaChapter} (${evaluatedSinResult.gitaVerse})`,
        spiritualContext: `Bhagavad Gita Chapter ${evaluatedSinResult.gitaChapter}, Verse ${evaluatedSinResult.gitaVerse}`,
        remedy: evaluatedSinResult.prayashchitta.directRestitution,
        date: newConf.date,
      });
    }

    setAltarStep(4);
  };

  // Trigger Agni Dissolution
  const handleBurnInAgniKund = (conf: ConfessionRecord) => {
    setIsBurningInAgni(true);
    setHasBurnedComplete(false);
    cosmicAudio.playCosmicChime(741);

    // Audio frequency surge
    cosmicAudio.playFrequencyTone(528, 0.35, 'triangle');

    setTimeout(() => {
      setIsBurningInAgni(false);
      setHasBurnedComplete(true);
      cosmicAudio.stopFrequencyTone();
      cosmicAudio.playCosmicChime(852);

      // Update state
      setConfessions(prev => prev.map(c => {
        if (c.id === conf.id) {
          return {
            ...c,
            isBurnedInAgni: true,
            burnedTimestamp: new Date().toISOString()
          };
        }
        return c;
      }));

      // Add restorative Punya deed for sincere Agni dissolution
      if (onAddKarmaItem) {
        onAddKarmaItem({
          id: `gita-punya-shuddhi-${Date.now()}`,
          title: `[AGNI SHUDDHI] Sacred Atonement & Dissolution of: ${conf.sinTitle}`,
          hindiTitle: 'पवित्र ज्ञानाग्नि प्रायश्चित्त संकल्प',
          type: 'punya',
          category: 'bhakti',
          points: Math.abs(Math.round(conf.evaluatedSin.karmicTollPoints * 0.6)), // Restores 60% of toll on solemn vow
          intensity: 'moderate',
          description: `Solemnly offered in sacred fire with Chapter ${conf.evaluatedSin.gitaChapter} recitation & 40-day Sankalpa.`,
          spiritualContext: `Bhagavad Gita Chapter ${conf.evaluatedSin.gitaChapter}, Verse ${conf.evaluatedSin.gitaVerse}`,
          remedy: conf.evaluatedSin.prayashchitta.danaSeva,
          date: new Date().toISOString().split('T')[0],
        });
      }
    }, 3200);
  };

  // Increment Day in Active Vow
  const handleIncrementVowDay = (confId: string) => {
    cosmicAudio.playCosmicChime(528);
    setConfessions(prev => prev.map(c => {
      if (c.id === confId) {
        const nextDay = Math.min(c.vowProgressDays + 1, c.totalVowDays);
        const isDone = nextDay >= c.totalVowDays;
        return {
          ...c,
          vowProgressDays: nextDay,
          atonementVowStatus: isDone ? 'completed' : 'active'
        };
      }
      return c;
    }));
  };

  // Quick preset confession selector
  const handleSelectPresetSin = (sin: GitaSinDefinition) => {
    setSelectedCategory(sin.category);
    setCustomSinTitle(sin.hindiTitle);
    setCustomConfessionText(`I sincerely confess before the Divine Witness that I have committed ${sin.englishTitle} (${sin.hindiTitle}). I acknowledge the pain and harm caused, and seek the Gita's divine justice and Prayashchitta.`);
    setAltarStep(2);
  };

  return (
    <div 
      id="gita-confession-sanctum-root"
      className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-amber-500/40"
      style={{
        background: 'radial-gradient(ellipse at top, #1c1109 0%, #0d0805 45%, #050302 100%)',
        color: '#fef3c7'
      }}
    >
      {/* 1. SACRED AMBIENT BACKGROUND & YANTRA OVERLAYS */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* 2. SANCTUM HEADER & SACRED WITNESS BANNER */}
      <div className="relative z-10 px-6 py-6 border-b border-amber-500/30 backdrop-blur-md bg-black/40 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 via-orange-700 to-red-900 p-0.5 shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center justify-center">
            <div className="w-full h-full rounded-2xl bg-black/70 flex items-center justify-center">
              <Flame className="w-8 h-8 text-amber-400 animate-bounce" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                श्रीमद्भगवद्गीता महापाप स्वीकारोक्ति एवं प्रायश्चित्त मण्डप
              </span>
              <span className="text-xs text-amber-200/60 font-serif italic hidden sm:inline">
                • Witnessed by Sri Krishna & Dharma
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 tracking-wide mt-0.5">
              Sacred Gita Confessional & Atonement Sanctum
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/75 font-sans mt-0.5">
              Confess your deepest transgressions before the Supreme Witness • Receive the Gita’s exact cosmic punishment decree & Vedic Prayashchitta blueprint.
            </p>
          </div>
        </div>

        {/* Audio Resonator & Actions */}
        <div className="flex items-center gap-2.5 flex-wrap justify-end">
          <button
            id="sanctum-sacred-om-btn"
            onClick={handleToggleSacredOm}
            className={`px-3.5 py-2 rounded-xl text-xs font-cinzel font-bold transition-all flex items-center gap-2 border ${
              isPlayingOm 
                ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'bg-black/60 text-amber-400/80 border-amber-500/30 hover:border-amber-400'
            }`}
          >
            {isPlayingOm ? <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            <span>108Hz Sacred OM {isPlayingOm ? 'Active' : 'Tone'}</span>
          </button>

          <button
            id="sanctum-528-btn"
            onClick={() => handlePlayFrequency(528)}
            className={`px-3.5 py-2 rounded-xl text-xs font-cinzel font-bold transition-all flex items-center gap-1.5 border ${
              activeFrequencyHz === 528
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-black/60 text-emerald-400/80 border-emerald-500/30 hover:border-emerald-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>528Hz Purification</span>
          </button>
        </div>
      </div>

      {/* 3. SANCTUM NAV BAR (DISTINCT SACRED TEMPLE NAVIGATION) */}
      <div className="relative z-10 px-6 py-3 bg-black/60 border-b border-amber-500/20 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          {
            id: 'altar',
            label: '🕉️ The Confession Altar (पाप स्वीकारोक्ति वेदी)',
            desc: '4-Step Sacred Confession'
          },
          {
            id: 'codex',
            label: '📜 14 Sins & Gita Penal Code (दण्ड संहिता)',
            desc: 'Scriptural Retribution Codex'
          },
          {
            id: 'agnikund',
            label: '🔥 Holy Agni Kund Dissolution (अग्नि विसर्जन)',
            desc: 'Incinerate Sins in Sacred Fire'
          },
          {
            id: 'vows',
            label: `📿 Active Atonement Vows (${confessions.filter(c => c.atonementVowStatus === 'active').length})`,
            desc: '21/40 Day Prayashchitta'
          }
        ].map((tab) => {
          const isActive = sanctumView === tab.id;
          return (
            <button
              key={tab.id}
              id={`sanctum-nav-${tab.id}`}
              onClick={() => {
                cosmicAudio.playCosmicChime(432);
                setSanctumView(tab.id as any);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-cinzel font-bold whitespace-nowrap transition-all flex flex-col items-start border ${
                isActive
                  ? 'bg-gradient-to-r from-amber-900/60 to-orange-950/80 text-amber-200 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                  : 'bg-black/40 text-amber-300/60 border-amber-500/20 hover:text-amber-200 hover:border-amber-500/40'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] font-sans font-normal opacity-70">{tab.desc}</span>
            </button>
          );
        })}
      </div>

      {/* 4. ACTIVE SANCTUM CONTENT BODY */}
      <div className="relative z-10 p-6">
        
        {/* ========================================================================= */}
        {/* VIEW 1: THE SACRED CONFESSION ALTAR (4-STEP RITUAL) */}
        {/* ========================================================================= */}
        {sanctumView === 'altar' && (
          <div className="space-y-8">
            
            {/* Step Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { step: 1, title: '1. Select Category', dev: 'पाप श्रेणी' },
                { step: 2, title: '2. Sincere Confession', dev: 'हृदयोद्गार' },
                { step: 3, title: '3. Gita Penal Decree', dev: 'गीता दण्ड विधान' },
                { step: 4, title: '4. Vedic Atonement', dev: 'प्रायश्चित्त विधि' }
              ].map((s) => (
                <div
                  key={s.step}
                  onClick={() => {
                    if (s.step < altarStep || (s.step === 3 && evaluatedSinResult)) {
                      setAltarStep(s.step as any);
                    }
                  }}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    altarStep === s.step
                      ? 'bg-amber-950/80 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] text-amber-200'
                      : altarStep > s.step
                      ? 'bg-black/50 border-emerald-500/40 text-emerald-300'
                      : 'bg-black/30 border-amber-500/10 text-amber-400/40'
                  }`}
                >
                  <div className="text-xs font-cinzel font-bold">{s.title}</div>
                  <div className="text-[10px] font-serif opacity-75">{s.dev}</div>
                </div>
              ))}
            </div>

            {/* STEP 1: SELECT CATEGORY OF TRANSGRESSION */}
            {altarStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-black/50 p-6 rounded-2xl border border-amber-500/30 text-center space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-950/90 px-3 py-1 rounded-full border border-amber-500/40">
                    Step 1 • साक्षात् धर्मराज व साक्षी चेतना आवाहन
                  </span>
                  <h2 className="text-2xl font-cinzel font-bold text-amber-200">
                    What nature of sin weighs upon your conscience?
                  </h2>
                  <p className="text-xs text-amber-300/70 max-w-2xl mx-auto">
                    Select the domain of transgression. Srimad Bhagavad Gita classifies all human actions into speech (वाचिक), physical deed (कायिक), mental intention (मानसिक), and violations of sacred trust.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(Object.keys(SIN_CATEGORIES) as SinCategoryKey[]).map((catKey) => {
                    const cat = SIN_CATEGORIES[catKey];
                    const isSelected = selectedCategory === catKey;
                    return (
                      <div
                        key={catKey}
                        id={`category-card-${catKey}`}
                        onClick={() => {
                          cosmicAudio.playCosmicChime(432);
                          setSelectedCategory(catKey);
                        }}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                          isSelected
                            ? 'bg-gradient-to-br from-amber-950/90 to-red-950/70 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)] scale-[1.02]'
                            : 'bg-black/50 border-amber-500/20 hover:border-amber-400/60 hover:bg-black/70'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span 
                              className="text-xs font-cinzel font-bold px-2.5 py-1 rounded-lg border"
                              style={{ color: cat.color, borderColor: `${cat.color}40`, backgroundColor: `${cat.color}15` }}
                            >
                              {cat.name}
                            </span>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                          </div>
                          <h3 className="text-base font-cinzel font-bold text-amber-100">
                            {cat.hindi}
                          </h3>
                          <p className="text-xs text-amber-200/70 line-clamp-3">
                            {cat.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-300 font-cinzel">
                          <span>Select Category</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Presets Carousel */}
                <div className="bg-black/40 p-5 rounded-2xl border border-amber-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-cinzel font-bold text-amber-300 flex items-center gap-2">
                      <Scroll className="w-4 h-4 text-amber-400" />
                      Or Select from Classical Great Sins (द्वादश महापाप संग्रह)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {GITA_SIN_REGISTRY.slice(0, 6).map((sin) => (
                      <button
                        key={sin.id}
                        onClick={() => handleSelectPresetSin(sin)}
                        className="text-left p-3 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/20 hover:border-amber-400 transition-all text-xs text-amber-200 space-y-1"
                      >
                        <div className="font-cinzel font-bold text-amber-300">{sin.hindiTitle}</div>
                        <div className="text-[11px] text-amber-200/60 line-clamp-1">{sin.shortDescription}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    id="altar-step-1-next"
                    onClick={() => {
                      cosmicAudio.playCosmicChime(528);
                      setAltarStep(2);
                    }}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-cinzel font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2 transition-all"
                  >
                    <span>Proceed to Confession (हृदयोद्गार)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: SINCERE CONFESSION & REMORSE GAUGE */}
            {altarStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-black/60 p-6 rounded-2xl border border-amber-500/40 space-y-6">
                  <div className="border-b border-amber-500/20 pb-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                        Category: {SIN_CATEGORIES[selectedCategory].hindi}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-amber-200 mt-1">
                        Pour out the unvarnished truth of your action
                      </h2>
                    </div>
                    <button
                      onClick={() => setAltarStep(1)}
                      className="text-xs font-cinzel text-amber-400/80 hover:text-amber-200 flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Change Category</span>
                    </button>
                  </div>

                  {/* Title / Summary of Sin */}
                  <div className="space-y-2">
                    <label className="text-xs font-cinzel font-bold text-amber-300">
                      Title / Core Action of the Sin (पाप का शीर्षक / कर्म)
                    </label>
                    <input
                      type="text"
                      id="confession-title-input"
                      value={customSinTitle}
                      onChange={(e) => setCustomSinTitle(e.target.value)}
                      placeholder="e.g., I deceived my closest friend for financial gain / I abandoned my parents..."
                      className="w-full px-4 py-3 rounded-xl bg-black/70 border border-amber-500/30 text-amber-100 placeholder-amber-500/30 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Detailed Confession Text */}
                  <div className="space-y-2">
                    <label className="text-xs font-cinzel font-bold text-amber-300 flex items-center justify-between">
                      <span>Detailed Confession (सत्य वृत्तांत - No falsehood before Dharma)</span>
                      <span className="text-[10px] text-amber-400/60 font-mono">Confidential & Sacred</span>
                    </label>
                    <textarea
                      id="confession-text-textarea"
                      rows={5}
                      value={customConfessionText}
                      onChange={(e) => setCustomConfessionText(e.target.value)}
                      placeholder="Describe what occurred honestly: Why did you do it? How did it harm the other person? What guilt lingers in your heart?..."
                      className="w-full px-4 py-3 rounded-xl bg-black/70 border border-amber-500/30 text-amber-100 placeholder-amber-500/30 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Remorse Level & Scope */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Remorse Level */}
                    <div className="space-y-2 bg-black/40 p-4 rounded-xl border border-amber-500/20">
                      <label className="text-xs font-cinzel font-bold text-amber-300">
                        Level of Soul Remorse (हृदय पश्चात्ताप की तीव्रता)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'mild', label: 'Mridu (मृदु)', desc: 'Mild Regret' },
                          { id: 'deep', label: 'Madhyama (मध्यम)', desc: 'Deep Sorrow' },
                          { id: 'agonized', label: 'Ghora (घोर)', desc: 'Agonized Soul' }
                        ].map((r) => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => {
                              cosmicAudio.playCosmicChime(432);
                              setRemorseLevel(r.id as any);
                            }}
                            className={`p-2.5 rounded-lg border text-center transition-all ${
                              remorseLevel === r.id
                                ? 'bg-amber-900/70 border-amber-400 text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                                : 'bg-black/50 border-amber-500/20 text-amber-400/60'
                            }`}
                          >
                            <div className="text-xs font-cinzel font-bold">{r.label}</div>
                            <div className="text-[9px] opacity-70">{r.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Scope of Harm */}
                    <div className="space-y-2 bg-black/40 p-4 rounded-xl border border-amber-500/20">
                      <label className="text-xs font-cinzel font-bold text-amber-300">
                        Scope of Harm Inflicted (पाप का प्रभाव क्षेत्र)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'self', label: 'Self (स्वयं)' },
                          { id: 'individual', label: '1 Person (व्यक्ति)' },
                          { id: 'family', label: 'Family (परिवार)' },
                          { id: 'community', label: 'Society (समाज)' }
                        ].map((h) => (
                          <button
                            key={h.id}
                            type="button"
                            onClick={() => {
                              cosmicAudio.playCosmicChime(432);
                              setHarmScope(h.id as any);
                            }}
                            className={`p-2.5 rounded-lg border text-center transition-all ${
                              harmScope === h.id
                                ? 'bg-orange-900/70 border-orange-400 text-orange-200 shadow-[0_0_10px_rgba(234,88,12,0.3)]'
                                : 'bg-black/50 border-amber-500/20 text-amber-400/60'
                            }`}
                          >
                            <div className="text-xs font-cinzel font-bold">{h.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Submission Controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-amber-500/20">
                    <button
                      type="button"
                      onClick={() => setAltarStep(1)}
                      className="px-5 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-300 text-xs font-cinzel"
                    >
                      Back
                    </button>
                    <button
                      id="altar-evaluate-verdict-btn"
                      type="button"
                      disabled={!customConfessionText.trim()}
                      onClick={handleProceedToVerdict}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:to-red-500 disabled:opacity-40 text-white font-cinzel font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2"
                    >
                      <Scale className="w-4 h-4" />
                      <span>Adjudicate According to Bhagavad Gita</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: GITA PENAL DECREE & SCRIPTURAL VERDICT */}
            {altarStep === 3 && evaluatedSinResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Ancient Parchment Scroll Verdict Card */}
                <div 
                  className="p-6 sm:p-8 rounded-3xl border-2 border-amber-500/60 relative overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.25)]"
                  style={{
                    background: 'radial-gradient(ellipse at center, #26160b 0%, #150c06 70%, #0a0503 100%)'
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-500/30 pb-4">
                    <div>
                      <span className="text-[11px] font-mono tracking-widest text-red-400 uppercase bg-red-950/80 px-3 py-1 rounded-full border border-red-500/40">
                        श्रीमद्भगवद्गीता काल-दण्ड विधान • BG Chapter {evaluatedSinResult.gitaChapter} ({evaluatedSinResult.gitaVerse})
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-200 mt-2">
                        {evaluatedSinResult.devanagariTitle}
                      </h2>
                      <p className="text-xs text-amber-300/80 font-serif italic">
                        {evaluatedSinResult.sanskritName} • Severity: {evaluatedSinResult.severityLevel}
                      </p>
                    </div>

                    <div className="text-right bg-red-950/80 border border-red-500/40 px-4 py-2 rounded-2xl">
                      <div className="text-[10px] font-mono text-red-300 uppercase">Karmic Toll Burden</div>
                      <div className="text-2xl font-cinzel font-extrabold text-red-400">
                        {evaluatedSinResult.karmicTollPoints} pts
                      </div>
                    </div>
                  </div>

                  {/* SCRIPTURAL GITA SHLOKA QUOTATION */}
                  <div className="my-6 p-5 rounded-2xl bg-black/70 border border-amber-500/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-cinzel font-bold text-amber-400 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Bhagavad Gita Adhyaya {evaluatedSinResult.gitaChapter}, Shloka {evaluatedSinResult.gitaVerse}
                      </span>
                      <button
                        onClick={() => handlePlayFrequency(528)}
                        className="text-xs text-amber-300 hover:text-amber-100 flex items-center gap-1.5 bg-amber-950/70 px-2.5 py-1 rounded-lg border border-amber-500/30"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Chant (528Hz)</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/20 text-center font-serif text-base sm:text-lg text-amber-100 whitespace-pre-line leading-relaxed">
                      {evaluatedSinResult.gitaShlokaSanskrit}
                    </div>

                    <div className="text-xs text-amber-300/70 font-mono text-center italic">
                      "{evaluatedSinResult.gitaShlokaTransliteration}"
                    </div>

                    <div className="text-xs sm:text-sm text-amber-200/90 font-sans border-t border-amber-500/20 pt-3">
                      <strong className="text-amber-400 font-cinzel">भगवान् श्रीकृष्ण का निर्णय (Hindi): </strong>
                      {evaluatedSinResult.gitaShlokaHindi}
                    </div>
                  </div>

                  {/* THE RETRIBUTION / PUNISHMENT MATRICES (THIS LIFE & HEREAFTER) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* A. In This Life */}
                    <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/30 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-red-300">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span>Punishment In This Life (ऐहिक दण्ड / काल-फल)</span>
                      </div>
                      <div className="space-y-2 text-xs text-amber-100/90">
                        <div>
                          <strong className="text-red-400">Psychological Torment: </strong>
                          {evaluatedSinResult.punishmentInThisLife.psychological}
                        </div>
                        <div>
                          <strong className="text-red-400">Material Destiny & Setbacks: </strong>
                          {evaluatedSinResult.punishmentInThisLife.materialDestiny}
                        </div>
                        <div>
                          <strong className="text-red-400">Planetary Affliction: </strong>
                          {evaluatedSinResult.punishmentInThisLife.planetaryAffliction}
                        </div>
                      </div>
                    </div>

                    {/* B. In Hereafter & Rebirth */}
                    <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-purple-300">
                        <Flame className="w-4 h-4 text-purple-400" />
                        <span>Afterlife & Rebirth Retribution (पारलौकिक दण्ड)</span>
                      </div>
                      <div className="space-y-2 text-xs text-amber-100/90">
                        <div>
                          <strong className="text-purple-400">Subtle Realm Destination: </strong>
                          {evaluatedSinResult.punishmentInHereafter.afterlifeDestiny}
                        </div>
                        <div>
                          <strong className="text-purple-400">Rebirth Tendency (योनि): </strong>
                          {evaluatedSinResult.punishmentInHereafter.rebirthTendency}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Action Controls */}
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-amber-500/30">
                    <button
                      onClick={() => setAltarStep(2)}
                      className="text-xs font-cinzel text-amber-400/80 hover:text-amber-200"
                    >
                      ← Re-examine Confession
                    </button>
                    <button
                      id="altar-commit-atonement-btn"
                      onClick={handleCommitConfession}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-white font-cinzel font-bold text-sm shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Obtain Gita Prayashchitta (प्रायश्चित्त व शुद्धि विधान)</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: VEDIC PRAYASHCHITTA & ATONEMENT BLUEPRINT */}
            {altarStep === 4 && evaluatedSinResult && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/50 bg-gradient-to-b from-emerald-950/40 via-black/80 to-black/95 space-y-6">
                  <div className="border-b border-emerald-500/30 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-500/40">
                        श्रीमद्भगवद्गीता प्रायश्चित्त व शुद्धि महामार्ग (BG 18.66 / BG 4.37)
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-emerald-200 mt-2">
                        Prescribed Vedic Prayashchitta Blueprint
                      </h2>
                      <p className="text-xs text-emerald-300/80 font-sans mt-0.5">
                        “Even if the most fallen resolves with unflinching determination to atone, he becomes righteous and attains eternal peace.” (BG 9.30-31)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="px-4 py-2 rounded-xl bg-emerald-900/60 border border-emerald-500/40 text-center">
                        <div className="text-[10px] font-mono text-emerald-300 uppercase">Sankalpa Duration</div>
                        <div className="text-xl font-cinzel font-bold text-emerald-200">
                          {evaluatedSinResult.prayashchitta.sankalpaDurationDays} Days
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5 Sacred Pillars of Prayashchitta */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    
                    {/* Pillar 1: Mantra Japa */}
                    <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-cinzel font-bold text-emerald-300 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            1. Mantra Japa (मन्त्र जप)
                          </span>
                          <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                            {evaluatedSinResult.prayashchitta.mantraJapa.dailyMalas} Malas Daily
                          </span>
                        </div>
                        <p className="font-serif text-sm text-amber-200 bg-black/80 p-3 rounded-xl border border-amber-500/20 text-center">
                          {evaluatedSinResult.prayashchitta.mantraJapa.mantraSanskrit}
                        </p>
                        <p className="text-[11px] text-emerald-200/70 font-sans">
                          {evaluatedSinResult.prayashchitta.mantraJapa.mantraEnglish}
                        </p>
                      </div>
                      <button
                        onClick={() => handlePlayFrequency(evaluatedSinResult.prayashchitta.mantraJapa.frequencyHz)}
                        className="w-full py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-xs font-cinzel text-emerald-200 flex items-center justify-center gap-2"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Tune to {evaluatedSinResult.prayashchitta.mantraJapa.frequencyHz}Hz</span>
                      </button>
                    </div>

                    {/* Pillar 2: Direct Restitution */}
                    <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
                      <div className="text-xs font-cinzel font-bold text-emerald-300 flex items-center gap-1.5">
                        <HeartCrack className="w-4 h-4 text-amber-400" />
                        2. Restitution (क्षमा व भरपाई)
                      </div>
                      <p className="text-xs text-amber-100/90 leading-relaxed">
                        {evaluatedSinResult.prayashchitta.directRestitution}
                      </p>
                    </div>

                    {/* Pillar 3: Dana & Seva */}
                    <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
                      <div className="text-xs font-cinzel font-bold text-emerald-300 flex items-center gap-1.5">
                        <Coins className="w-4 h-4 text-yellow-400" />
                        3. Sacred Dāna (दान व गौ-सेवा)
                      </div>
                      <p className="text-xs text-amber-100/90 leading-relaxed">
                        {evaluatedSinResult.prayashchitta.danaSeva}
                      </p>
                    </div>

                    {/* Pillar 4: Tapas & Fasting */}
                    <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
                      <div className="text-xs font-cinzel font-bold text-emerald-300 flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-orange-400" />
                        4. Tapas & Upavasa (तपस्या व व्रत)
                      </div>
                      <p className="text-xs text-amber-100/90 leading-relaxed">
                        {evaluatedSinResult.prayashchitta.tapasUpavasa}
                      </p>
                    </div>

                    {/* Pillar 5: Gita Chapter Svadhyaya */}
                    <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2">
                      <div className="text-xs font-cinzel font-bold text-emerald-300 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-cyan-400" />
                        5. Gita Svadhyaya (स्वाध्याय)
                      </div>
                      <p className="text-xs text-amber-100/90 leading-relaxed">
                        {evaluatedSinResult.prayashchitta.gitaAdhyayaStudy}
                      </p>
                    </div>

                    {/* Pillar 6: Agni Kund Dissolution Shortcut */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/70 to-red-950/80 border border-amber-400/50 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="text-xs font-cinzel font-bold text-amber-200 flex items-center gap-1.5">
                          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                          Sacrificial Dissolution
                        </div>
                        <p className="text-xs text-amber-200/80 mt-1">
                          Inscribe this confession upon the sacred scroll and offer it directly to the Holy Agni Kund for dissolution.
                        </p>
                      </div>
                      <button
                        id="altar-go-to-agnikund-btn"
                        onClick={() => {
                          cosmicAudio.playCosmicChime(741);
                          if (latestCreatedConfession) {
                            setSelectedConfessionForAgni(latestCreatedConfession);
                          }
                          setSanctumView('agnikund');
                        }}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-cinzel font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2"
                      >
                        <Flame className="w-4 h-4" />
                        <span>Perform Agni Dissolution</span>
                      </button>
                    </div>

                  </div>

                  {/* Summary & Return */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-emerald-500/30">
                    <button
                      onClick={() => {
                        setAltarStep(1);
                        setCustomSinTitle('');
                        setCustomConfessionText('');
                        setEvaluatedSinResult(null);
                      }}
                      className="text-xs font-cinzel text-emerald-400/80 hover:text-emerald-200 flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Make Another Confession</span>
                    </button>

                    <button
                      onClick={() => setSanctumView('vows')}
                      className="px-6 py-2.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-400 text-emerald-100 text-xs font-cinzel font-bold flex items-center gap-2"
                    >
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span>View Active Vow Register</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: 14 GREAT SINS & GITA SCRIPTURAL RETRIBUTION CODEX */}
        {/* ========================================================================= */}
        {sanctumView === 'codex' && (
          <div className="space-y-6">
            <div className="bg-black/50 p-6 rounded-2xl border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-950/90 px-3 py-1 rounded-full border border-amber-500/40">
                  चतुर्दश महापाप एवं श्रीमद्भगवद्गीता दण्ड संहिता
                </span>
                <h2 className="text-2xl font-cinzel font-bold text-amber-200 mt-1">
                  The Bhagavad Gita Penal & Retribution Codex
                </h2>
                <p className="text-xs text-amber-300/70 mt-0.5">
                  Browse classical sins defined in Vedic jurisprudence, their matching Bhagavad Gita verses, karmic punishments, and precise Prayashchitta cures.
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setCodexCategoryFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-cinzel ${
                    codexCategoryFilter === 'all'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400'
                      : 'bg-black/40 text-amber-400/60 border border-amber-500/20'
                  }`}
                >
                  All (सभी)
                </button>
                {Object.keys(SIN_CATEGORIES).slice(0, 5).map(catKey => (
                  <button
                    key={catKey}
                    onClick={() => setCodexCategoryFilter(catKey)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-cinzel ${
                      codexCategoryFilter === catKey
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-400'
                        : 'bg-black/40 text-amber-400/60 border border-amber-500/20'
                    }`}
                  >
                    {SIN_CATEGORIES[catKey as SinCategoryKey].hindi.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Master Codex Layout: 2 Columns (List on Left, Detailed Shloka Scroll on Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Sin Directory Cards */}
              <div className="lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto pr-1 custom-scrollbar">
                {GITA_SIN_REGISTRY
                  .filter(sin => codexCategoryFilter === 'all' || sin.category === codexCategoryFilter)
                  .map((sin) => {
                    const isSelected = selectedCodexSin.id === sin.id;
                    return (
                      <div
                        key={sin.id}
                        id={`codex-item-${sin.id}`}
                        onClick={() => {
                          cosmicAudio.playCosmicChime(432);
                          setSelectedCodexSin(sin);
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                          isSelected
                            ? 'bg-gradient-to-r from-amber-950/90 to-red-950/70 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                            : 'bg-black/50 border-amber-500/20 hover:border-amber-400/50 hover:bg-black/70'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 border border-amber-500/30 text-amber-300">
                            BG {sin.gitaChapter}:{sin.gitaVerse}
                          </span>
                          <span className="text-[10px] font-cinzel text-red-400 font-bold">
                            {sin.karmicTollPoints} pts
                          </span>
                        </div>
                        <h4 className="text-sm font-cinzel font-bold text-amber-100">
                          {sin.hindiTitle}
                        </h4>
                        <p className="text-xs text-amber-200/70 line-clamp-2">
                          {sin.shortDescription}
                        </p>
                      </div>
                    );
                  })}
              </div>

              {/* Right Column: Full Scriptural Scroll of Selected Sin */}
              <div className="lg:col-span-7">
                <div 
                  className="p-6 sm:p-8 rounded-3xl border-2 border-amber-500/50 bg-gradient-to-b from-black/90 via-amber-950/20 to-black/95 space-y-6 shadow-2xl"
                >
                  <div className="border-b border-amber-500/30 pb-4 flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                        {SIN_CATEGORIES[selectedCodexSin.category].name}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-amber-200 mt-1">
                        {selectedCodexSin.devanagariTitle}
                      </h3>
                      <p className="text-xs text-amber-300/80 font-serif italic">
                        {selectedCodexSin.sanskritName}
                      </p>
                    </div>

                    <button
                      onClick={() => handleSelectPresetSin(selectedCodexSin)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-cinzel font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center gap-1.5"
                    >
                      <Feather className="w-3.5 h-3.5" />
                      <span>Confess this Sin</span>
                    </button>
                  </div>

                  {/* SCRIPTURAL SHLOKA */}
                  <div className="p-5 rounded-2xl bg-black/80 border border-amber-500/30 space-y-3 text-center">
                    <div className="text-xs font-cinzel font-bold text-amber-400">
                      Srimad Bhagavad Gita Chapter {selectedCodexSin.gitaChapter}, Shloka {selectedCodexSin.gitaVerse}
                    </div>
                    <div className="font-serif text-base sm:text-lg text-amber-100 whitespace-pre-line leading-relaxed">
                      {selectedCodexSin.gitaShlokaSanskrit}
                    </div>
                    <div className="text-xs text-amber-300/70 font-mono italic">
                      "{selectedCodexSin.gitaShlokaTransliteration}"
                    </div>
                    <div className="text-xs sm:text-sm text-amber-200 text-left border-t border-amber-500/20 pt-2 font-sans">
                      <strong className="text-amber-400 font-cinzel">अर्थ: </strong>
                      {selectedCodexSin.gitaShlokaHindi}
                    </div>
                  </div>

                  {/* DETAILED PUNISHMENTS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 space-y-2 text-xs">
                      <div className="font-cinzel font-bold text-red-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>In This Life (ऐहिक फल)</span>
                      </div>
                      <p className="text-amber-100/80">
                        {selectedCodexSin.punishmentInThisLife.psychological}
                      </p>
                      <p className="text-amber-100/80">
                        {selectedCodexSin.punishmentInThisLife.materialDestiny}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-2 text-xs">
                      <div className="font-cinzel font-bold text-purple-300 flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5" />
                        <span>Hereafter & Rebirth (पारलौकिक फल)</span>
                      </div>
                      <p className="text-amber-100/80">
                        {selectedCodexSin.punishmentInHereafter.afterlifeDestiny}
                      </p>
                      <p className="text-amber-100/80">
                        {selectedCodexSin.punishmentInHereafter.rebirthTendency}
                      </p>
                    </div>
                  </div>

                  {/* PRESCRIBED PRAYASHCHITTA REMEDY */}
                  <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2 text-xs">
                    <div className="font-cinzel font-bold text-emerald-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Prescribed Prayashchitta ({selectedCodexSin.prayashchitta.sankalpaDurationDays} Days)</span>
                    </div>
                    <p className="text-emerald-100 font-serif">
                      <strong className="text-emerald-300 font-cinzel">Mantra: </strong>
                      {selectedCodexSin.prayashchitta.mantraJapa.mantraSanskrit} ({selectedCodexSin.prayashchitta.mantraJapa.dailyMalas} Malas)
                    </p>
                    <p className="text-emerald-100/80">
                      <strong className="text-emerald-300 font-cinzel">Restitution: </strong>
                      {selectedCodexSin.prayashchitta.directRestitution}
                    </p>
                    <p className="text-emerald-100/80">
                      <strong className="text-emerald-300 font-cinzel">Dāna & Seva: </strong>
                      {selectedCodexSin.prayashchitta.danaSeva}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: SACRED AGNI KUND DISSOLUTION (अग्नि कुण्ड विसर्जन) */}
        {/* ========================================================================= */}
        {sanctumView === 'agnikund' && (
          <div className="space-y-8">
            <div className="bg-black/50 p-6 rounded-2xl border border-amber-500/30 text-center space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-950/90 px-3 py-1 rounded-full border border-amber-500/40">
                पवित्र ज्ञानाग्नि कुण्ड • Transmutation of Sins into Divine Ash (BG 4.37)
              </span>
              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-200">
                The Sacred Sacrificial Fire of Dissolution
              </h2>
              <p className="text-xs text-amber-300/70 max-w-2xl mx-auto">
                “As a blazing fire turns firewood to ash, O Arjuna, so does the fire of divine knowledge and true atonement turn all sins to ash.” (BG 4.37)
              </p>
            </div>

            {/* Select Confession to Dissolve */}
            <div className="max-w-xl mx-auto bg-black/60 p-4 rounded-2xl border border-amber-500/30 flex items-center justify-between gap-3">
              <div className="text-xs font-cinzel font-bold text-amber-300">
                Active Confession for Dissolution:
              </div>
              <select
                value={selectedConfessionForAgni?.id || ''}
                onChange={(e) => {
                  const found = confessions.find(c => c.id === e.target.value);
                  if (found) setSelectedConfessionForAgni(found);
                }}
                className="px-3 py-2 rounded-xl bg-black border border-amber-500/30 text-xs text-amber-100 font-cinzel focus:outline-none"
              >
                {confessions.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.sinTitle.substring(0, 35)}... {c.isBurnedInAgni ? ' (Already Burned)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* THE SACRED AGNI KUND VISUAL ALTAR */}
            {selectedConfessionForAgni && (
              <div className="relative max-w-3xl mx-auto p-8 rounded-3xl border-2 border-amber-500/60 bg-gradient-to-b from-[#1a0f08] via-black to-[#0d0704] text-center space-y-8 overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.3)]">
                
                {/* Visual Agni Flames Container */}
                <div className="relative h-64 w-full flex items-center justify-center">
                  
                  {/* Glowing Sacrificial Pit */}
                  <div className="absolute bottom-2 w-72 h-16 rounded-full bg-gradient-to-t from-red-950 via-orange-950 to-transparent border border-amber-500/40 blur-sm" />
                  
                  {/* Animated Fire Hearth */}
                  <motion.div
                    animate={{
                      scale: isBurningInAgni ? [1, 1.35, 1.15, 1.4, 1] : [1, 1.08, 1],
                      opacity: [0.85, 1, 0.85]
                    }}
                    transition={{ repeat: Infinity, duration: isBurningInAgni ? 0.8 : 2 }}
                    className="relative z-10 w-48 h-48 rounded-full bg-gradient-to-t from-red-600 via-orange-500 to-amber-300 blur-md opacity-80 flex items-center justify-center"
                  />

                  {/* Inner Holy Fire Icon & Particles */}
                  <div className="absolute z-20 flex flex-col items-center">
                    <Flame className={`text-amber-200 transition-all ${
                      isBurningInAgni ? 'w-28 h-28 text-white drop-shadow-[0_0_30px_#fff]' : 'w-20 h-20 text-amber-300 animate-pulse'
                    }`} />
                    <span className="text-xs font-cinzel font-bold text-amber-300 tracking-widest mt-2">
                      {isBurningInAgni ? '🔥 अग्निदेव स्वाहा... स्वाहा...' : 'ॐ पावकाय नमः'}
                    </span>
                  </div>

                  {/* The Confession Palm Leaf Inscription */}
                  <AnimatePresence>
                    {!isBurningInAgni && !hasBurnedComplete && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.2, opacity: 0, filter: 'blur(10px)' }}
                        className="absolute -top-4 z-30 max-w-md w-full p-4 rounded-2xl bg-amber-950/90 border-2 border-amber-400 text-amber-100 shadow-2xl backdrop-blur-md"
                      >
                        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                          Bhurjapatra Inscription (भूर्जपत्र अभिलेख)
                        </span>
                        <h4 className="text-sm font-cinzel font-bold text-amber-200 mt-1">
                          {selectedConfessionForAgni.sinTitle}
                        </h4>
                        <p className="text-xs text-amber-200/80 line-clamp-2 mt-1 italic font-serif">
                          "{selectedConfessionForAgni.confessionText}"
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* State: Burned Complete Certificate */}
                {hasBurnedComplete && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-2xl bg-emerald-950/60 border-2 border-emerald-400 text-center space-y-3"
                  >
                    <Award className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">
                      प्रायश्चित्त शुद्धि प्रमाण पत्र • Bhasma Transmutation Accomplished
                    </span>
                    <h3 className="text-xl font-cinzel font-bold text-emerald-200">
                      Sin Offered to Jnana-Agni • Atonement Sanctified
                    </h3>
                    <p className="text-xs text-emerald-200/90 max-w-lg mx-auto font-sans leading-relaxed">
                      Your sincere confession has been consumed by the holy sacrificial fire. The heavy karmic knot has been cut. Maintain your <strong>{selectedConfessionForAgni.totalVowDays}-Day Prayashchitta Sankalpa</strong> with purity and truth.
                    </p>
                    <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/30 text-amber-200 font-serif text-sm">
                      “सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। अहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥” (BG 18.66)
                    </div>
                  </motion.div>
                )}

                {/* Burn Action Trigger */}
                {!hasBurnedComplete && (
                  <div className="space-y-3">
                    <p className="text-xs text-amber-300/80 font-serif italic">
                      Chant the surrender mantra: <em>"Om Krishnaya Namah • Svaha!"</em> and offer this sin to the divine fire.
                    </p>
                    <button
                      id="burn-in-agni-btn"
                      disabled={isBurningInAgni}
                      onClick={() => handleBurnInAgniKund(selectedConfessionForAgni)}
                      className="px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-cinzel font-extrabold text-base shadow-[0_0_30px_rgba(245,158,11,0.6)] flex items-center justify-center gap-3 mx-auto transition-all disabled:opacity-50"
                    >
                      <Flame className="w-5 h-5 text-amber-300" />
                      <span>{isBurningInAgni ? 'Incinerating in Jnana-Agni...' : 'स्वाहा! Offer to Sacred Agni Kund (Dissolve)'}</span>
                    </button>
                  </div>
                )}

              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: ACTIVE ATONEMENT VOWS REGISTER (प्रायश्चित्त संकल्प पंजी) */}
        {/* ========================================================================= */}
        {sanctumView === 'vows' && (
          <div className="space-y-6">
            <div className="bg-black/50 p-6 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-500/40">
                  प्रायश्चित्त अनुष्ठान व संकल्प पंजी • 21/40 Day Vow Tracker
                </span>
                <h2 className="text-2xl font-cinzel font-bold text-amber-200 mt-1">
                  Active Prayashchitta Sankalpa Register
                </h2>
                <p className="text-xs text-amber-300/70 mt-0.5">
                  Track your daily Japa malas, restitution, and fasting commitments until full Chitta Shuddhi is realized.
                </p>
              </div>

              <button
                onClick={() => {
                  setAltarStep(1);
                  setSanctumView('altar');
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-cinzel font-bold flex items-center gap-2"
              >
                <Feather className="w-4 h-4" />
                <span>New Confession</span>
              </button>
            </div>

            {/* Vow Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {confessions.map((conf) => {
                const percent = Math.round((conf.vowProgressDays / conf.totalVowDays) * 100);
                const isCompleted = conf.atonementVowStatus === 'completed';
                return (
                  <div
                    key={conf.id}
                    id={`vow-card-${conf.id}`}
                    className={`p-6 rounded-3xl border transition-all space-y-4 ${
                      isCompleted
                        ? 'bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                        : 'bg-black/60 border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30">
                            {SIN_CATEGORIES[conf.category].name}
                          </span>
                          {conf.isBurnedInAgni && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-950 text-orange-300 border border-orange-500/30 flex items-center gap-1">
                              <Flame className="w-2.5 h-2.5" /> Burned in Agni
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-cinzel font-bold text-amber-100 mt-1">
                          {conf.sinTitle}
                        </h3>
                        <p className="text-xs text-amber-300/60 font-mono">
                          Date Logged: {conf.date}
                        </p>
                      </div>

                      <span className={`text-xs font-cinzel font-bold px-2.5 py-1 rounded-lg border ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                          : 'bg-amber-500/20 text-amber-300 border-amber-400'
                      }`}>
                        {isCompleted ? 'Vow Completed (सिद्ध)' : `Day ${conf.vowProgressDays}/${conf.totalVowDays}`}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-amber-200/75">
                        <span>Sankalpa Progress:</span>
                        <span>{percent}%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-black border border-amber-500/20 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    {/* Daily Ritual Instructions */}
                    <div className="p-4 rounded-xl bg-black/70 border border-amber-500/20 space-y-2 text-xs">
                      <div className="text-amber-300 font-cinzel font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Daily Japa Mantra ({conf.evaluatedSin.prayashchitta.mantraJapa.dailyMalas} Malas)
                      </div>
                      <p className="font-serif text-amber-100">
                        {conf.evaluatedSin.prayashchitta.mantraJapa.mantraSanskrit}
                      </p>
                      <div className="text-amber-200/70 border-t border-amber-500/20 pt-1.5">
                        <strong className="text-amber-300">Dāna: </strong>
                        {conf.evaluatedSin.prayashchitta.danaSeva}
                      </div>
                    </div>

                    {/* Check-in button */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => handlePlayFrequency(conf.evaluatedSin.prayashchitta.mantraJapa.frequencyHz)}
                        className="text-xs text-amber-300 flex items-center gap-1 hover:text-amber-100"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Tune {conf.evaluatedSin.prayashchitta.mantraJapa.frequencyHz}Hz</span>
                      </button>

                      {!isCompleted && (
                        <button
                          onClick={() => handleIncrementVowDay(conf.id)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-cinzel font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Check-in Day {conf.vowProgressDays} (Japa Completed)</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* 5. SANCTUM FOOTER WITH SUPREME KRISHNA UPADESHA */}
      <div className="relative z-10 px-6 py-4 bg-black/80 border-t border-amber-500/30 text-center space-y-1">
        <p className="font-serif text-xs sm:text-sm text-amber-200/90">
          “अपि चेत्सुदुराचारो भजते मामनन्यभाक्। साधुरेव स मन्तव्यः सम्यग्व्यवसितो हि सः॥”
        </p>
        <p className="text-[11px] text-amber-400/70 font-sans">
          “Even the most fallen sinner, if he resolves with undivided heart to atone and surrender to righteousness, must be regarded as saintly, for he has rightly resolved.” — Srimad Bhagavad Gita 9.30
        </p>
      </div>
    </div>
  );
};
