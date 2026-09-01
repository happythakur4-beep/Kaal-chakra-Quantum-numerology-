import React, { useState } from 'react';
import { 
  BHAGAVAD_GITA_CHAPTERS, 
  GITA_KARMA_DECISION_CASES, 
  GitaChapter, 
  GitaVerse, 
  GitaDilemmaCase,
  evaluateActionWithGita,
  GitaYogaPath
} from '../../data/bhagavadGitaData';
import { PersonKarmaProfile, KarmaItem } from '../../data/karmaData';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Sparkles,
  Scale,
  Flame,
  Volume2,
  VolumeX,
  Search,
  CheckCircle2,
  AlertTriangle,
  Heart,
  ShieldAlert,
  ChevronRight,
  Plus,
  RefreshCw,
  Compass,
  Scroll,
  HelpCircle,
  Award
} from 'lucide-react';

interface KarmaGitaSectionProps {
  isDark: boolean;
  currentProfile: PersonKarmaProfile;
  onAddKarmaItem: (item: KarmaItem) => void;
}

export const KarmaGitaSection: React.FC<KarmaGitaSectionProps> = ({
  isDark,
  currentProfile,
  onAddKarmaItem
}) => {
  // Sub-tabs within Gita Feature
  const [gitaSubTab, setGitaSubTab] = useState<'oracle' | 'allChapters' | 'profileGuna' | 'fiveFactors'>('oracle');
  
  // Chapter Explorer state
  const [selectedChapterNumber, setSelectedChapterNumber] = useState<number>(2); // Default Sankhya Yoga (Ch 2)
  const [chapterSearchQuery, setChapterSearchQuery] = useState<string>('');
  const [pathFilter, setPathFilter] = useState<'all' | GitaYogaPath>('all');
  const [selectedVerse, setSelectedVerse] = useState<GitaVerse | null>(null);

  // Oracle / Action Decision State
  const [customActionText, setCustomActionText] = useState<string>('');
  const [evaluatedResult, setEvaluatedResult] = useState<ReturnType<typeof evaluateActionWithGita> | null>(null);
  const [selectedPresetDilemma, setSelectedPresetDilemma] = useState<GitaDilemmaCase | null>(GITA_KARMA_DECISION_CASES[0]);

  // Audio tone state
  const [activeFrequencyHz, setActiveFrequencyHz] = useState<number | null>(null);

  const selectedChapter = BHAGAVAD_GITA_CHAPTERS.find(c => c.number === selectedChapterNumber) || BHAGAVAD_GITA_CHAPTERS[1];

  // Filtered chapters list
  const filteredChapters = BHAGAVAD_GITA_CHAPTERS.filter(ch => {
    const matchesPath = pathFilter === 'all' || ch.yogaPath === pathFilter;
    const matchesSearch = 
      ch.sanskritTitle.toLowerCase().includes(chapterSearchQuery.toLowerCase()) ||
      ch.devanagariTitle.includes(chapterSearchQuery) ||
      ch.englishTitle.toLowerCase().includes(chapterSearchQuery.toLowerCase()) ||
      ch.hindiTitle.toLowerCase().includes(chapterSearchQuery.toLowerCase()) ||
      ch.karmicTheme.toLowerCase().includes(chapterSearchQuery.toLowerCase());
    return matchesPath && matchesSearch;
  });

  // Calculate Profile Gita Guna Breakdown
  const profileGunaStats = React.useMemo(() => {
    const list = currentProfile.karmaList;
    if (!list || list.length === 0) {
      return { sattva: 70, rajas: 20, tamas: 10, nishkamaScore: 75, dominantTrait: 'Sattvic Ascendant' };
    }

    let sattvaPoints = 0;
    let rajasPoints = 0;
    let tamasPoints = 0;

    list.forEach(item => {
      if (item.type === 'punya') {
        if (item.category === 'seva' || item.category === 'vidya' || item.category === 'ahimsa' || item.category === 'bhakti') {
          sattvaPoints += Math.abs(item.points) * 1.5;
        } else {
          sattvaPoints += Math.abs(item.points);
          rajasPoints += Math.abs(item.points) * 0.2;
        }
      } else {
        if (item.category === 'kayika' || item.category === 'droha') {
          tamasPoints += Math.abs(item.points) * 1.4;
          rajasPoints += Math.abs(item.points) * 0.6;
        } else if (item.category === 'lobha' || item.category === 'vachika') {
          rajasPoints += Math.abs(item.points) * 1.3;
          tamasPoints += Math.abs(item.points) * 0.5;
        } else {
          rajasPoints += Math.abs(item.points);
          tamasPoints += Math.abs(item.points);
        }
      }
    });

    const total = sattvaPoints + rajasPoints + tamasPoints || 1;
    const sattvaPct = Math.round((sattvaPoints / total) * 100);
    const rajasPct = Math.round((rajasPoints / total) * 100);
    const tamasPct = 100 - (sattvaPct + rajasPct);

    let nishkama = Math.min(100, Math.max(10, Math.round(sattvaPct * 0.85 + (100 - tamasPct) * 0.15)));
    let dominantTrait = 'Sattvic Ascendant (सात्त्विक प्रधान)';
    if (rajasPct > sattvaPct && rajasPct > tamasPct) {
      dominantTrait = 'Rajasic Action Momentum (राजसिक कर्म गति)';
    } else if (tamasPct > sattvaPct && tamasPct > rajasPct) {
      dominantTrait = 'Tamasic Influx / Purification Required (तमस शोधन आवश्यक)';
    }

    return {
      sattva: Math.max(0, sattvaPct),
      rajas: Math.max(0, rajasPct),
      tamas: Math.max(0, tamasPct),
      nishkamaScore: nishkama,
      dominantTrait
    };
  }, [currentProfile]);

  // Audio tone trigger
  const handlePlayFrequency = (hz: number) => {
    if (activeFrequencyHz === hz) {
      cosmicAudio.stopFrequencyTone();
      setActiveFrequencyHz(null);
    } else {
      cosmicAudio.playFrequencyTone(hz, 0.25, 'sine');
      setActiveFrequencyHz(hz);
    }
  };

  // Evaluate Custom Action
  const handleEvaluateCustomAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customActionText.trim()) return;
    cosmicAudio.playCosmicChime(528);
    const result = evaluateActionWithGita(customActionText);
    setEvaluatedResult(result);
  };

  // Log evaluated action to active profile
  const handleLogEvaluatedAction = (result: ReturnType<typeof evaluateActionWithGita>, actionTitle: string) => {
    const isPunya = result.points >= 0;
    const newItem: KarmaItem = {
      id: `gita-logged-${Date.now()}`,
      title: actionTitle,
      hindiTitle: result.verdictTitle,
      type: isPunya ? 'punya' : 'papa',
      category: isPunya ? 'dharma' : 'adharma',
      points: result.points,
      intensity: Math.abs(result.points) > 40 ? 'significant' : 'moderate',
      description: `${result.verdictExplanation} • Guidance: ${result.krishnaGuidance}`,
      spiritualContext: `Judged by Gita Chapter ${result.matchingChapter.number} (${result.matchingChapter.sanskritTitle}): ${result.matchingVerse.sanskrit.replace(/\n/g, ' ')}`,
      date: new Date().toISOString().split('T')[0],
      isCustom: true,
      remedy: isPunya ? undefined : result.krishnaGuidance
    };

    onAddKarmaItem(newItem);
    cosmicAudio.playCosmicChime();
  };

  return (
    <div className="space-y-8">
      
      {/* GITA HEADER BANNER */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all ${
        isDark 
          ? 'bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-slate-900/60 border-amber-500/40 shadow-[0_0_30px_rgba(251,191,36,0.15)]' 
          : 'bg-gradient-to-r from-amber-100 via-orange-50 to-amber-50 border-amber-300'
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>SRIMAD BHAGAVAD GITA • 18 ADHYAYAS</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">श्रीमद्भगवद्गीता कर्म निर्णय विधान</span>
            </div>

            <h2 className={`text-2xl sm:text-3xl font-serif font-black tracking-tight ${
              isDark ? 'text-amber-100' : 'text-slate-900'
            }`}>
              योगस्थः कुरु कर्माणि • The Gita Karma Decision Engine
            </h2>

            <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
              In the Vedic tradition, true karma is not arbitrary—it is governed by the universal laws articulated by <span className="text-amber-300 font-bold">Lord Sri Krishna</span> in the 18 chapters of the Bhagavad Gita. Evaluate any human deed through the lens of <span className="text-emerald-400 font-semibold">Nishkama Karma</span>, <span className="text-cyan-400 font-semibold">Three Gunas</span>, and <span className="text-amber-400 font-semibold">Dharmic Truth</span>.
            </p>
          </div>

          {/* Quick Profile Gita Status Badge */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/50 border border-amber-500/30 backdrop-blur-md">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">Subject Karma Soul Lens</div>
              <div className="text-sm font-black text-amber-300 font-serif">{currentProfile.personName}</div>
              <div className="text-xs text-emerald-400 font-mono mt-0.5">{profileGunaStats.dominantTrait}</div>
            </div>
            <div className="text-right pl-4 border-l border-white/10">
              <div className="text-[10px] font-mono text-slate-400">Nishkama Index</div>
              <div className="text-xl font-black text-cyan-300 font-mono">{profileGunaStats.nishkamaScore}%</div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="mt-6 pt-4 border-t border-amber-500/20 flex flex-wrap items-center gap-2">
          {[
            { id: 'oracle', label: '⚖️ Gita Karma Oracle (निर्णय)', desc: 'Evaluate Deeds & Dilemmas' },
            { id: 'allChapters', label: '📜 All 18 Adhyayas (संपूर्ण गीता)', desc: 'Explore Verses & Doctrines' },
            { id: 'profileGuna', label: '🕉️ Profile Guna & Soul Lens', desc: 'Sattva, Rajas & Tamas' },
            { id: 'fiveFactors', label: '☸️ 5 Factors of Action (पञ्च कारण)', desc: 'Agency & Providence' },
          ].map((tab) => {
            const isActive = gitaSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  cosmicAudio.playCyberKeystroke();
                  setGitaSubTab(tab.id as any);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-black shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                    : 'bg-black/40 hover:bg-black/70 border border-amber-500/20 text-slate-300'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          SUB-TAB 1: GITA KARMA ORACLE / ADJUDICATOR
          ========================================================================= */}
      {gitaSubTab === 'oracle' && (
        <div className="space-y-8">
          
          {/* A. Interactive Custom Action Evaluator */}
          <div className={`p-6 rounded-3xl border ${
            isDark ? 'bg-slate-900/60 border-amber-500/30' : 'bg-white border-amber-200 shadow-md'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-serif font-black text-amber-200">
                Live Gita Karma Adjudicator • Enter Any Deed, Decision or Intention
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Test any daily action (e.g., &quot;Donating anonymously vs announcing for prestige&quot;, &quot;Taking revenge for cheating&quot;, &quot;Working solely for promotion vs offering work to Krishna&quot;). The Vedic engine evaluates its Guna balance, points, and reveals Sri Krishna&apos;s exact shloka decree.
            </p>

            <form onSubmit={handleEvaluateCustomAction} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={customActionText}
                  onChange={(e) => setCustomActionText(e.target.value)}
                  placeholder="Describe your deed or dilemma (e.g., Fed stray animals secretly, Got angry at a colleague, Refused to compromise integrity for sales commission...)"
                  className={`w-full px-4 py-3.5 rounded-2xl text-sm font-mono border focus:outline-none transition-all ${
                    isDark 
                      ? 'bg-black/60 border-amber-500/30 text-amber-100 placeholder:text-slate-500 focus:border-amber-400 shadow-inner' 
                      : 'bg-amber-50/50 border-amber-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-500'
                  }`}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-5 rounded-xl font-mono text-xs font-black uppercase bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 flex items-center gap-1.5 shadow-[0_0_15px_rgba(251,191,36,0.3)] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>DECIDE WITH GITA</span>
                </button>
              </div>
            </form>

            {/* Evaluated Result Card */}
            {evaluatedResult && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 rounded-2xl bg-black/70 border border-amber-400/50 space-y-4 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-black ${
                      evaluatedResult.points > 0 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}>
                      {evaluatedResult.verdictTitle}
                    </span>
                    <h4 className="text-base font-serif font-black text-white mt-1.5">&quot;{customActionText}&quot;</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right font-mono">
                      <div className="text-[10px] text-slate-400">Karmic Score</div>
                      <div className={`text-2xl font-black ${evaluatedResult.points > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {evaluatedResult.points > 0 ? `+${evaluatedResult.points}` : evaluatedResult.points} pts
                      </div>
                    </div>
                    <button
                      onClick={() => handleLogEvaluatedAction(evaluatedResult, customActionText)}
                      className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow-[0_0_15px_rgba(251,191,36,0.3)] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>RECORD TO PROFILE</span>
                    </button>
                  </div>
                </div>

                {/* Guna Balance Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-slate-300">
                    <span>Guna Analysis:</span>
                    <span>
                      <span className="text-emerald-400 font-bold">Sattva: {evaluatedResult.sattvaScore}%</span> •{' '}
                      <span className="text-amber-400 font-bold">Rajas: {evaluatedResult.rajasScore}%</span> •{' '}
                      <span className="text-rose-400 font-bold">Tamas: {evaluatedResult.tamasScore}%</span>
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                    <div style={{ width: `${evaluatedResult.sattvaScore}%` }} className="bg-emerald-500" />
                    <div style={{ width: `${evaluatedResult.rajasScore}%` }} className="bg-amber-500" />
                    <div style={{ width: `${evaluatedResult.tamasScore}%` }} className="bg-rose-500" />
                  </div>
                </div>

                {/* Scripture Reference Shloka */}
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                      <Scroll className="w-3.5 h-3.5 text-amber-400" />
                      <span>Gita Shloka Reference: Ch {evaluatedResult.matchingChapter.number}.{evaluatedResult.matchingVerse.verse} ({evaluatedResult.matchingChapter.sanskritTitle})</span>
                    </span>
                    {evaluatedResult.matchingVerse.frequencyHz && (
                      <button
                        onClick={() => handlePlayFrequency(evaluatedResult.matchingVerse.frequencyHz!)}
                        className="px-2 py-1 rounded bg-amber-500/20 text-[10px] font-mono font-bold text-amber-300 border border-amber-500/40 flex items-center gap-1 hover:bg-amber-500/30 cursor-pointer"
                      >
                        {activeFrequencyHz === evaluatedResult.matchingVerse.frequencyHz ? <VolumeX className="w-3 h-3 text-rose-400" /> : <Volume2 className="w-3 h-3 text-amber-400" />}
                        <span>{evaluatedResult.matchingVerse.frequencyHz} Hz Chanting Tone</span>
                      </button>
                    )}
                  </div>
                  <p className="text-sm font-serif italic text-amber-100 whitespace-pre-line leading-relaxed">
                    {evaluatedResult.matchingVerse.sanskrit}
                  </p>
                  <p className="text-xs font-serif text-slate-300">
                    &quot;{evaluatedResult.matchingVerse.english}&quot;
                  </p>
                </div>

                {/* Sri Krishna Guidance */}
                <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Sri Krishna&apos;s Divine Upadesha (मार्गदर्शन):</span>
                    <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">{evaluatedResult.krishnaGuidance}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* B. Preset Real-Life Moral & Karmic Dilemma Cases */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-black text-amber-200 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400" />
                  <span>Classic Real-Life Moral Dilemmas Decided by Gita</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Select any profound human dilemma to see how the Gita resolves moral paralysis.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {GITA_KARMA_DECISION_CASES.map((dilemma) => {
                const isSelected = selectedPresetDilemma?.id === dilemma.id;
                return (
                  <div
                    key={dilemma.id}
                    onClick={() => {
                      cosmicAudio.playCyberKeystroke();
                      setSelectedPresetDilemma(dilemma);
                    }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-950/40 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.25)]'
                        : 'bg-black/40 hover:bg-black/60 border-white/10 hover:border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 font-bold">
                        {dilemma.category}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">{dilemma.gitaVerseRef}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white font-serif">{dilemma.title}</h4>
                    <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">{dilemma.dilemma}</p>

                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-400 font-bold">Sattva {dilemma.gunaAnalysis.sattva}%</span>
                      <span className="text-amber-300 flex items-center gap-1 font-bold">
                        <span>View Verdict</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Dilemma Detailed Breakdown Modal / Card */}
            {selectedPresetDilemma && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-black border border-amber-500/40 space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      {selectedPresetDilemma.category} • {selectedPresetDilemma.gitaVerseRef}
                    </span>
                    <h3 className="text-xl font-serif font-black text-amber-100 mt-2">
                      {selectedPresetDilemma.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      const item: KarmaItem = {
                        id: `gita-dilemma-${Date.now()}`,
                        title: selectedPresetDilemma.title,
                        hindiTitle: 'गीता धर्म निर्णय',
                        type: 'punya',
                        category: 'dharma',
                        points: selectedPresetDilemma.scoreAdjustment,
                        intensity: 'significant',
                        description: selectedPresetDilemma.gitaVerdict,
                        spiritualContext: `Resolved via ${selectedPresetDilemma.gitaVerseRef}: ${selectedPresetDilemma.krishnaCounsel}`,
                        date: new Date().toISOString().split('T')[0],
                        isCustom: true
                      };
                      onAddKarmaItem(item);
                      cosmicAudio.playCosmicChime();
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ADOPT DHARMIC CHOICE (+{selectedPresetDilemma.scoreAdjustment} pts)</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30">
                    <div className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5 mb-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>The Egotistical / Binding Path (Rajas/Tamas)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{selectedPresetDilemma.personChoiceA}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                    <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                      <Heart className="w-4 h-4" />
                      <span>The Gita Dharmic Resolution (Nishkama / Sattva)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{selectedPresetDilemma.personChoiceB}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                  <div className="text-xs font-mono font-bold text-amber-300 uppercase flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-amber-400" />
                    <span>Bhagavad Gita Verdict &amp; Krishna&apos;s Counsel:</span>
                  </div>
                  <p className="text-sm font-serif text-amber-100 leading-relaxed font-semibold">
                    {selectedPresetDilemma.gitaVerdict}
                  </p>
                  <p className="text-xs text-slate-300 italic">
                    &quot;{selectedPresetDilemma.krishnaCounsel}&quot;
                  </p>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      )}

      {/* =========================================================================
          SUB-TAB 2: ALL 18 ADHYAYAS (CHAPTERS) REPOSITORY
          ========================================================================= */}
      {gitaSubTab === 'allChapters' && (
        <div className="space-y-6">
          
          {/* Chapter Search & Yoga Path Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-black/50 border border-amber-500/30 backdrop-blur-md">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-amber-400" />
              <input
                type="text"
                value={chapterSearchQuery}
                onChange={(e) => setChapterSearchQuery(e.target.value)}
                placeholder="Search across all 18 Adhyayas by name, Sanskrit title, or karmic concept..."
                className="w-full bg-transparent text-xs font-mono text-amber-200 placeholder:text-slate-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5">
              {(['all', 'karma', 'jnana', 'bhakti', 'raja'] as const).map((path) => (
                <button
                  key={path}
                  onClick={() => {
                    cosmicAudio.playCyberKeystroke();
                    setPathFilter(path);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                    pathFilter === path
                      ? 'bg-amber-500 text-slate-950 font-black shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {path === 'all' ? 'All 18 Adhyayas' : `${path} Yoga`}
                </button>
              ))}
            </div>
          </div>

          {/* Chapter Selector Grid (1 to 18) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {filteredChapters.map((ch) => {
              const isSelected = selectedChapterNumber === ch.number;
              return (
                <button
                  key={ch.number}
                  onClick={() => {
                    cosmicAudio.playCyberKeystroke();
                    setSelectedChapterNumber(ch.number);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                      : 'bg-black/40 hover:bg-black/60 border-white/10 text-slate-300 hover:border-amber-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-black text-amber-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      CH {ch.number}
                    </span>
                    <span className="text-[9px] font-mono uppercase opacity-80">{ch.yogaPath}</span>
                  </div>
                  <div className="text-xs font-serif font-black truncate">{ch.devanagariTitle}</div>
                  <div className="text-[10px] font-mono opacity-80 truncate">{ch.sanskritTitle}</div>
                </button>
              );
            })}
          </div>

          {/* Selected Chapter Master Dossier */}
          {selectedChapter && (
            <motion.div
              key={selectedChapter.number}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-amber-500/40 space-y-6"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      ADHYAYA {selectedChapter.number} • {selectedChapter.totalVerses} SHLOKAS • {selectedChapter.yogaPath.toUpperCase()} YOGA
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-amber-100 mt-2">
                    {selectedChapter.devanagariTitle} • {selectedChapter.sanskritTitle}
                  </h3>
                  <div className="text-sm text-cyan-300 font-serif mt-1">{selectedChapter.englishTitle}</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{selectedChapter.hindiTitle}</div>
                </div>

                <div className="text-right p-3 rounded-2xl bg-black/50 border border-amber-500/30">
                  <div className="text-[10px] font-mono text-slate-400">Karmic Theme</div>
                  <div className="text-xs font-mono font-bold text-amber-300 max-w-[200px]">{selectedChapter.karmicTheme}</div>
                </div>
              </div>

              {/* Philosophical Summary & Rule */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <div className="text-xs font-mono font-bold text-amber-300 uppercase flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>Core Philosophical Doctrine:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{selectedChapter.philosophicalSummary}</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <div className="text-xs font-mono font-bold text-cyan-300 uppercase flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Karmic Evaluation Rule for Deeds:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{selectedChapter.karmicDecisionRule}</p>
                </div>
              </div>

              {/* Landmark Key Verses for this Chapter */}
              <div className="space-y-4">
                <h4 className="text-base font-serif font-black text-amber-200 flex items-center gap-2">
                  <Scroll className="w-4 h-4 text-amber-400" />
                  <span>Landmark Shlokas &amp; Karmic Decrees in Chapter {selectedChapter.number}</span>
                </h4>

                <div className="space-y-4">
                  {selectedChapter.keyVerses.map((verse) => (
                    <div
                      key={verse.verse}
                      className="p-5 rounded-2xl bg-black/60 border border-amber-500/30 space-y-3 hover:border-amber-400 transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded font-mono font-black text-xs bg-amber-500 text-slate-950">
                            BG {verse.chapter}.{verse.verse}
                          </span>
                          <span className="text-xs font-mono text-slate-400 font-bold">Speaker: {verse.speaker}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Guna: {verse.dominantGuna.toUpperCase()}
                          </span>
                          {verse.frequencyHz && (
                            <button
                              onClick={() => handlePlayFrequency(verse.frequencyHz!)}
                              className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-[10px] font-mono font-bold text-amber-300 border border-amber-500/40 flex items-center gap-1 cursor-pointer"
                            >
                              {activeFrequencyHz === verse.frequencyHz ? <VolumeX className="w-3 h-3 text-rose-400" /> : <Volume2 className="w-3 h-3 text-amber-400" />}
                              <span>{verse.frequencyHz} Hz Resonance</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Sanskrit Shloka */}
                      <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20">
                        <p className="text-base font-serif italic text-amber-200 whitespace-pre-line leading-relaxed font-semibold">
                          {verse.sanskrit}
                        </p>
                        <p className="text-xs font-mono text-slate-400 mt-1.5">
                          {verse.transliteration}
                        </p>
                      </div>

                      {/* Translations */}
                      <div className="space-y-1 text-xs">
                        <div className="text-slate-200 font-serif">
                          <span className="font-bold text-amber-300">English:</span> &quot;{verse.english}&quot;
                        </div>
                        <div className="text-slate-300 font-serif">
                          <span className="font-bold text-cyan-300">Hindi:</span> {verse.hindi}
                        </div>
                      </div>

                      {/* Karmic Doctrine & Practical Application */}
                      <div className="p-3 rounded-xl bg-slate-900 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="font-mono font-bold text-emerald-400">Soul Law: {verse.karmicPrinciple}</div>
                          <div className="text-slate-400 mt-0.5">Practical: {verse.practicalKarmicAdvice}</div>
                        </div>

                        <button
                          onClick={() => {
                            const item: KarmaItem = {
                              id: `gita-verse-meditation-${Date.now()}`,
                              title: `Contemplation of BG ${verse.chapter}.${verse.verse}`,
                              hindiTitle: `गीता श्लोक ${verse.chapter}.${verse.verse} स्वाध्याय`,
                              type: 'punya',
                              category: 'vidya',
                              points: 35,
                              intensity: 'significant',
                              description: `Chanted and contemplated Gita Shloka ${verse.chapter}.${verse.verse}: "${verse.english}"`,
                              spiritualContext: verse.karmicPrinciple,
                              date: new Date().toISOString().split('T')[0],
                              isCustom: true
                            };
                            onAddKarmaItem(item);
                            cosmicAudio.playCosmicChime();
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1 shrink-0 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>LOG SVDHYAYA (+35 pts)</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

        </div>
      )}

      {/* =========================================================================
          SUB-TAB 3: PROFILE GUNA & SOUL LENS (PERSONAL ASSESSMENT)
          ========================================================================= */}
      {gitaSubTab === 'profileGuna' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-amber-500/40 space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  GITA CHAPTER 14 &amp; 17 SOUL DIAGNOSTIC
                </span>
                <h3 className="text-2xl font-serif font-black text-amber-100 mt-2">
                  Three Guna Distribution for {currentProfile.personName}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Derived from all logged deeds, sins, and karmic habits evaluated against the Guna Doctrine of Srimad Bhagavad Gita.
                </p>
              </div>

              <div className="text-right p-3 rounded-2xl bg-black/60 border border-emerald-500/30">
                <div className="text-[10px] font-mono text-slate-400">Nishkama Harmony</div>
                <div className="text-2xl font-black text-emerald-400 font-mono">{profileGunaStats.nishkamaScore}%</div>
              </div>
            </div>

            {/* 3 Gunas Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Sattva Card */}
              <div className="p-5 rounded-2xl bg-emerald-950/25 border border-emerald-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-emerald-400" />
                    <span>SATTVA (सत्त्व गुण)</span>
                  </span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">{profileGunaStats.sattva}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div style={{ width: `${profileGunaStats.sattva}%` }} className="h-full bg-emerald-400" />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Purity, clarity, compassion, truthfulness, and selfless contribution (BG 14.6). Produces Chitta Shuddhi and upward soul evolution.
                </p>
              </div>

              {/* Rajas Card */}
              <div className="p-5 rounded-2xl bg-amber-950/25 border border-amber-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-amber-400 font-bold flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>RAJAS (रजोगुण)</span>
                  </span>
                  <span className="text-2xl font-black text-amber-400 font-mono">{profileGunaStats.rajas}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div style={{ width: `${profileGunaStats.rajas}%` }} className="h-full bg-amber-400" />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ambition, desire for praise, transactional giving, and restlessness (BG 14.7). Generates heavy karmic attachment and rebirth momentum.
                </p>
              </div>

              {/* Tamas Card */}
              <div className="p-5 rounded-2xl bg-rose-950/25 border border-rose-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-rose-400 font-bold flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>TAMAS (तमोगुण)</span>
                  </span>
                  <span className="text-2xl font-black text-rose-400 font-mono">{profileGunaStats.tamas}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div style={{ width: `${profileGunaStats.tamas}%` }} className="h-full bg-rose-400" />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Delusion, sloth, cruelty, malice, and heedlessness (BG 14.8). Requires immediate Prayashchitta (atonement) and discipline to dissolve.
                </p>
              </div>

            </div>

            {/* Personalized Gita Upadesha for Current Balance */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-black border border-amber-500/40 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h4 className="text-base font-serif font-black text-amber-200">
                  Sri Krishna&apos;s Direct Counsel for {currentProfile.personName}
                </h4>
              </div>

              <p className="text-sm font-serif italic text-amber-100 leading-relaxed">
                {profileGunaStats.sattva >= 60 
                  ? '“Your soul is ascending through the radiant path of Sattva. Beware only of spiritual pride—remain as humble as the earth, dedicating all virtues to Narayana.” (BG 14.6)'
                  : profileGunaStats.rajas >= 40
                    ? '“Your actions possess high dynamic energy, but are tinged with expectations of return and social prestige. Shift from Sakama (desire) to Nishkama (selfless duty).” (BG 2.47)'
                    : '“Heedlessness and negative karmas are clouding your discernment. Take refuge in the sacred fire of knowledge and surrender to Krishna—all sins are washed away.” (BG 18.66)'
                }
              </p>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TAB 4: 5 FACTORS OF ACTION (BG 18.14)
          ========================================================================= */}
      {gitaSubTab === 'fiveFactors' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-amber-500/40 space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                GITA CH 18.13-15 • पञ्चैतानि महाबाहो कारणानि निबोध मे
              </span>
              <h3 className="text-2xl font-serif font-black text-amber-100 mt-2">
                The Five Factors of All Human Action (Karma Hetu)
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
                In Chapter 18, Sri Krishna reveals that no human being alone is the sole author of any action or result. Every deed in the cosmos requires five indispensable components:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  no: 1,
                  sanskrit: 'अधिष्ठानम् (Adhiṣṭhānam)',
                  english: 'The Physical Base / Body',
                  desc: 'The physical seat, nervous system, and physical world where the deed occurs.',
                  color: 'emerald'
                },
                {
                  no: 2,
                  sanskrit: 'कर्ता (Kartā)',
                  english: 'The Doer / Ego Consciousness',
                  desc: 'The individualized sense of agency (Ahamkara) directing intention.',
                  color: 'amber'
                },
                {
                  no: 3,
                  sanskrit: 'करणम् (Karaṇam)',
                  english: 'The Instruments & Senses',
                  desc: 'The five cognitive senses, five active organs (hands, tongue), and mind.',
                  color: 'cyan'
                },
                {
                  no: 4,
                  sanskrit: 'विविधाश्च चेष्टाः (Cheshta)',
                  english: 'Diverse Efforts & Energy',
                  desc: 'The physical exertion, breath (Prana), and labor invested into the act.',
                  color: 'purple'
                },
                {
                  no: 5,
                  sanskrit: 'दैवम् (Daivam)',
                  english: 'Cosmic Providence & Destiny',
                  desc: 'The divine sanction, planetary alignment, and past karmic sanction (Prarabdha).',
                  color: 'yellow'
                }
              ].map((factor) => (
                <div
                  key={factor.no}
                  className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-2 hover:border-amber-400/60 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-mono font-black text-xs flex items-center justify-center">
                      {factor.no}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">FACTOR {factor.no}/5</span>
                  </div>
                  <div className="text-sm font-serif font-black text-amber-200">{factor.sanskrit}</div>
                  <div className="text-xs font-bold text-white">{factor.english}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{factor.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30">
              <p className="text-xs text-amber-200 font-serif leading-relaxed">
                <span className="font-bold text-amber-300">The Ultimate Karmic Liberation (BG 18.16):</span> “Whoever thinks that the pure Self alone is the sole actor, failing to recognize these five factors due to unrefined intellect—that person of perverted vision does not truly see.” Knowing you are merely one factor out of five eliminates anxiety, guilt, and pride.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
