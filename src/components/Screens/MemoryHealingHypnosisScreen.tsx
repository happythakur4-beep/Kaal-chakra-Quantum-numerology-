import React, { useState, useEffect } from 'react';
import { ThemeMode, UserProfile, MemoryHypnosisProtocol, MemorySessionLog, HypnosisTechniqueCategory } from '../../types';
import {
  MEMORY_HYPNOSIS_PROTOCOLS,
  BRAIN_NODES_3D,
  HYPNOSIS_NEUROSCIENCE_INSIGHTS
} from '../../data/memoryHypnosisData';
import { Brain3DLightningCanvas } from '../MemoryHypnosis/Brain3DLightningCanvas';
import { InteractiveHypnosisSession } from '../MemoryHypnosis/InteractiveHypnosisSession';
import { MemoryPalaceBuilder } from '../MemoryHypnosis/MemoryPalaceBuilder';
import { MemoryCaseVault } from '../MemoryHypnosis/MemoryCaseVault';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import confetti from 'canvas-confetti';
import {
  Brain,
  Zap,
  Sparkles,
  Shield,
  Layers,
  Activity,
  Rewind,
  BookOpen,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Lock,
  Eye,
  Volume2,
  Calendar,
  ChevronRight,
  TrendingDown,
  Info
} from 'lucide-react';

interface MemoryHealingHypnosisScreenProps {
  theme: ThemeMode;
  userProfile?: UserProfile;
  onNavigate: (screen: any) => void;
  onOpenAstrologerChat?: (id?: string) => void;
  initialTab?: 'chamber' | 'protocols' | 'memory_palace' | 'science' | 'vault';
}

export const MemoryHealingHypnosisScreen: React.FC<MemoryHealingHypnosisScreenProps> = ({
  theme,
  userProfile,
  onNavigate,
  onOpenAstrologerChat,
  initialTab = 'chamber'
}) => {
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'chamber' | 'protocols' | 'memory_palace' | 'science' | 'vault'>(initialTab);
  const [selectedProtocol, setSelectedProtocol] = useState<MemoryHypnosisProtocol>(MEMORY_HYPNOSIS_PROTOCOLS[0]);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'extinction' | 'sharpening'>('all');

  // Stored Session Logs in LocalStorage
  const [logs, setLogs] = useState<MemorySessionLog[]>(() => {
    try {
      const saved = localStorage.getItem('memory_hypnosis_logs_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save logs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('memory_hypnosis_logs_v1', JSON.stringify(logs));
    } catch {
      // ignore
    }
  }, [logs]);

  const handleSessionComplete = (newLog: MemorySessionLog) => {
    setLogs((prev) => [newLog, ...prev]);
    setActiveTab('vault');
    confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
  };

  const handleDeleteLog = (id: string) => {
    setLogs((prev) => prev.filter((l) => l.id !== id));
  };

  const handleClearAllLogs = () => {
    if (window.confirm('Are you sure you want to clear your confidential hypnosis session logs?')) {
      setLogs([]);
    }
  };

  const filteredProtocols = MEMORY_HYPNOSIS_PROTOCOLS.filter((p) => {
    if (categoryFilter === 'extinction') {
      return (
        p.category === 'bad_memory_extinction' ||
        p.category === 'trauma_reconsolidation' ||
        p.category === 'submodality_dimmer' ||
        p.category === 'directed_amnesia'
      );
    }
    if (categoryFilter === 'sharpening') {
      return (
        p.category === 'cognitive_hypermnesia' ||
        p.category === 'memory_palace_loci' ||
        p.category === 'synaptic_ltp_boost' ||
        p.category === 'exam_eidetic_recall'
      );
    }
    return true;
  });

  return (
    <div className={`min-h-screen py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      {/* ========================================================================= */}
      {/* HERO SECTION: MEMORY HEALING HYPNOSIS (स्मृति उपचार सम्मोहन) */}
      {/* ========================================================================= */}
      <div
        className={`p-6 sm:p-10 rounded-3xl border relative overflow-hidden backdrop-blur-2xl transition-all ${
          isDark
            ? 'bg-gradient-to-br from-[#060a1c] via-[#0a122e] to-[#04060f] border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)]'
            : 'bg-gradient-to-br from-white via-cyan-50/60 to-indigo-50/50 border-cyan-200 shadow-2xl'
        }`}
      >
        {/* Background Ambient Lightning Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Top Badge & Navigation Bar */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400 animate-pulse" />
              <span>NEURO-HYPNOTIC MEMORY RECONSOLIDATION & MIND HEALING</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('mind-healing')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono transition cursor-pointer flex items-center gap-1.5"
              >
                <span>Mind Healing</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('sound-healing')}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-mono transition cursor-pointer flex items-center gap-1.5"
              >
                <span>Sound Healing</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Title and High-Concept Statement */}
          <div className="space-y-3 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl font-cinzel font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-100 to-amber-200">
              MEMORY HEALING HYPNOSIS
            </h1>
            <div className="text-sm sm:text-base font-serif text-amber-300/90 italic">
              स्मृति उपचार सम्मोहन • संस्कार विच्छेदन एवं महास्मृति जागरण (Subconscious Mind Architecture)
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              A scientifically grounded neuro-hypnotic suite designed to <strong>dissolve painful memory emotional charge</strong> via synaptic reconsolidation, or <strong>supercharge memory retention</strong> using the classical 3D Roman Memory Palace and photographic hypermnesia techniques.
            </p>
          </div>

          {/* 4 PROMINENT QUICK-START GOAL TILES (Clear Feature Visibility) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {/* Tile 1: Extinguish Bad Memory */}
            <button
              onClick={() => {
                const target = MEMORY_HYPNOSIS_PROTOCOLS.find((p) => p.id === 'trauma_rewind') || MEMORY_HYPNOSIS_PROTOCOLS[0];
                setSelectedProtocol(target);
                setActiveTab('chamber');
                cosmicAudio.playFrequencyTone(528, 0.12, 'sine');
              }}
              className={`p-4 rounded-2xl border text-left space-y-2 transition-all cursor-pointer group hover:scale-102 ${
                isDark
                  ? 'bg-rose-950/30 border-rose-500/30 hover:border-rose-400 hover:bg-rose-950/50'
                  : 'bg-rose-50/80 border-rose-200 hover:border-rose-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 group-hover:scale-110 transition">
                  <Rewind className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-rose-300 font-bold">EXTINCTION</span>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-cinzel font-bold text-rose-200">
                  Fade Bad Memories
                </div>
                <p className="text-[11px] text-slate-300 leading-snug pt-0.5">
                  Dissolve fear and emotional pain through high-speed rewind & grayscale defusion.
                </p>
              </div>
            </button>

            {/* Tile 2: Supercharge Memory & Focus */}
            <button
              onClick={() => {
                const target = MEMORY_HYPNOSIS_PROTOCOLS.find((p) => p.id === 'hypermnesia_recall') || MEMORY_HYPNOSIS_PROTOCOLS[2];
                setSelectedProtocol(target);
                setActiveTab('chamber');
                cosmicAudio.playFrequencyTone(852, 0.12, 'sine');
              }}
              className={`p-4 rounded-2xl border text-left space-y-2 transition-all cursor-pointer group hover:scale-102 ${
                isDark
                  ? 'bg-cyan-950/30 border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/50'
                  : 'bg-cyan-50/80 border-cyan-200 hover:border-cyan-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition">
                  <Brain className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-cyan-300 font-bold">HYPERMNESIA</span>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-cinzel font-bold text-cyan-200">
                  Sharpen Memory & Recall
                </div>
                <p className="text-[11px] text-slate-300 leading-snug pt-0.5">
                  Activate Long-Term Potentiation (LTP) and rapid photographic recall states.
                </p>
              </div>
            </button>

            {/* Tile 3: 3D Memory Palace */}
            <button
              onClick={() => {
                setActiveTab('memory_palace');
                cosmicAudio.playFrequencyTone(639, 0.12, 'sine');
              }}
              className={`p-4 rounded-2xl border text-left space-y-2 transition-all cursor-pointer group hover:scale-102 ${
                isDark
                  ? 'bg-amber-950/30 border-amber-500/30 hover:border-amber-400 hover:bg-amber-950/50'
                  : 'bg-amber-50/80 border-amber-200 hover:border-amber-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 group-hover:scale-110 transition">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-amber-300 font-bold">METHOD OF LOCI</span>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-cinzel font-bold text-amber-200">
                  3D Roman Palace
                </div>
                <p className="text-[11px] text-slate-300 leading-snug pt-0.5">
                  Anchor complex concepts in 5 classical mental chambers with self-test recall.
                </p>
              </div>
            </button>

            {/* Tile 4: Flash of Brilliance */}
            <button
              onClick={() => {
                setActiveTab('chamber');
                cosmicAudio.playFrequencyTone(963, 0.2, 'sine');
              }}
              className={`p-4 rounded-2xl border text-left space-y-2 transition-all cursor-pointer group hover:scale-102 ${
                isDark
                  ? 'bg-indigo-950/30 border-indigo-500/30 hover:border-indigo-400 hover:bg-indigo-950/50'
                  : 'bg-indigo-50/80 border-indigo-200 hover:border-indigo-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 group-hover:scale-110 transition">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-indigo-300 font-bold">EUREKA SPARKS</span>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-cinzel font-bold text-indigo-200">
                  Mind & Eureka Engine
                </div>
                <p className="text-[11px] text-slate-300 leading-snug pt-0.5">
                  Interactive 3D mind model with dynamic lightning arcs and EEG synchrony.
                </p>
              </div>
            </button>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 pt-4 mt-2 border-t border-cyan-500/20 overflow-x-auto">
            {[
              { id: 'chamber', label: '1. Mind Chamber & Trance', icon: <Brain className="w-4 h-4 text-cyan-400" /> },
              { id: 'protocols', label: '2. 8 Hypnosis Protocols', icon: <Layers className="w-4 h-4 text-indigo-400" /> },
              { id: 'memory_palace', label: '3. Roman Memory Palace', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
              { id: 'science', label: '4. Clinical Science & Evidence', icon: <Info className="w-4 h-4 text-emerald-400" /> },
              { id: 'vault', label: '5. Confidential Vault & Logs', icon: <Shield className="w-4 h-4 text-rose-400" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  cosmicAudio.playFrequencyTone(432, 0.08, 'sine');
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-cinzel font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-black border border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-102 font-black'
                    : isDark
                    ? 'bg-slate-900/70 border border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-white'
                    : 'bg-white border border-slate-200 text-slate-800 hover:border-cyan-400'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 3D SYNAPTIC BRAIN & ACTIVE HYPNOSIS CHAMBER */}
      {/* ========================================================================= */}
      {activeTab === 'chamber' && (
        <div className="space-y-8">
          {/* Active Interactive Session */}
          <InteractiveHypnosisSession
            theme={theme}
            protocol={selectedProtocol}
            onSessionComplete={handleSessionComplete}
            onBackToProtocols={() => setActiveTab('protocols')}
          />

          {/* Quick Protocol Switcher Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-cinzel font-bold text-cyan-200 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                <span>Select Target Hypnotic Reconsolidation Protocol</span>
              </h3>
              <button
                onClick={() => setActiveTab('protocols')}
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All 8 Blueprints</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MEMORY_HYPNOSIS_PROTOCOLS.slice(0, 4).map((protocol) => (
                <button
                  key={protocol.id}
                  onClick={() => {
                    setSelectedProtocol(protocol);
                    cosmicAudio.playFrequencyTone(528, 0.1, 'sine');
                  }}
                  className={`p-4 rounded-2xl border text-left space-y-2 transition-all cursor-pointer ${
                    selectedProtocol.id === protocol.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                      : isDark
                      ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-cyan-500/40'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-cyan-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                      {protocol.category.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[10px] font-mono text-amber-300">
                      {protocol.durationMinutes}m • {protocol.targetBrainwave.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs font-cinzel font-bold truncate">
                    {protocol.title}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {protocol.summary}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 8 CLINICAL HYPNOSIS PROTOCOLS & BLUEPRINTS */}
      {/* ========================================================================= */}
      {activeTab === 'protocols' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              {[
                { id: 'all', label: 'All Protocols (8)' },
                { id: 'extinction', label: 'Bad Memory Extinction & Trauma (4)' },
                { id: 'sharpening', label: 'Memory Sharpening & Hypermnesia (4)' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setCategoryFilter(filter.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                    categoryFilter === filter.id
                      ? 'bg-cyan-500 text-black shadow-md'
                      : isDark
                      ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Protocols Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProtocols.map((protocol) => (
              <div
                key={protocol.id}
                className={`p-6 rounded-3xl border space-y-4 flex flex-col justify-between transition-all backdrop-blur-xl ${
                  selectedProtocol.id === protocol.id
                    ? 'bg-gradient-to-br from-cyan-950/40 via-slate-900 to-indigo-950/40 border-cyan-400 shadow-xl'
                    : isDark
                    ? 'bg-[#090d1a]/80 border-cyan-500/20 text-slate-200 hover:border-cyan-500/40'
                    : 'bg-white border-slate-200 text-slate-900 shadow-md'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 uppercase font-bold">
                      {protocol.category.replace(/_/g, ' ')}
                    </span>
                    <span className="text-xs font-mono text-amber-300">
                      {protocol.durationMinutes} Mins • {protocol.targetBrainwave.toUpperCase()} {protocol.binauralHz}Hz
                    </span>
                  </div>

                  <h3 className="text-lg font-cinzel font-bold text-cyan-200">
                    {protocol.title}
                  </h3>
                  <div className="text-xs font-serif text-amber-300 italic">
                    {protocol.sanskritTitle}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {protocol.summary}
                  </p>

                  {/* Target Brain Areas */}
                  <div className="pt-2">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Target Synaptic Nodes:</div>
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {protocol.targetBrainArea.map((area, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-cyan-500/20 text-cyan-200"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-cyan-500/20 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-slate-400">
                    {protocol.steps.length} Hypnotic Phases
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProtocol(protocol);
                      setActiveTab('chamber');
                      cosmicAudio.playFrequencyTone(528, 0.15, 'sine');
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-black font-cinzel font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg transition active:scale-95"
                  >
                    <span>Launch Hypnosis Trance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: THE 3D ROMAN MEMORY PALACE (METHOD OF LOCI) */}
      {/* ========================================================================= */}
      {activeTab === 'memory_palace' && (
        <MemoryPalaceBuilder theme={theme} />
      )}

      {/* ========================================================================= */}
      {/* TAB 4: NEUROSCIENCE & RECONSOLIDATION EVIDENCE */}
      {/* ========================================================================= */}
      {activeTab === 'science' && (
        <div className="space-y-6">
          <div
            className={`p-6 sm:p-8 rounded-3xl border space-y-4 backdrop-blur-xl ${
              isDark ? 'bg-slate-900/80 border-cyan-500/30' : 'bg-white border-cyan-200 shadow-md'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 uppercase">
              <Brain className="w-3.5 h-3.5 text-cyan-400" />
              <span>CLINICAL EVIDENCE & SCIENTIFIC RIGOR</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-cyan-200">
              The Neurobiology of Hypnotic Memory Reconsolidation
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              Memories are not video files etched into stone. Under the modern <strong>Reconsolidation Model</strong> (Nader et al., 2000; Kindt et al., 2009), reactivating a memory renders the synaptic protein matrix labile. In this state, hypnotic dissociation and counter-conditioning permanently eliminate the autonomic fight-or-flight tags stored in the basolateral amygdala without destroying the factual learning.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {HYPNOSIS_NEUROSCIENCE_INSIGHTS.map((insight, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-black/40 border border-cyan-500/20 space-y-2"
                >
                  <div className="text-xs font-mono text-amber-300 uppercase font-bold">
                    {insight.sanskrit}
                  </div>
                  <h4 className="text-sm sm:text-base font-cinzel font-bold text-cyan-200">
                    {insight.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {insight.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Scientific Caution Note on Hypnotic Memory Accuracy */}
            <div className="mt-4 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed space-y-1">
              <div className="font-bold font-cinzel text-amber-300 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Clinical Precaution Regarding Memory Retrieval</span>
              </div>
              <p>
                While hypnotic hypermnesia enhances sensory recall for studied materials and poetry, clinical hypnosis is used therapeutically for <strong>emotional de-sensitization</strong> rather than legal forensic evidence. Memories retrieved in deep trance should always be treated as subjective internal experiences rather than infallible historical footage.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: ENCRYPTED MEMORY VAULT & LOGS */}
      {/* ========================================================================= */}
      {activeTab === 'vault' && (
        <MemoryCaseVault
          theme={theme}
          logs={logs}
          onDeleteLog={handleDeleteLog}
          onClearAllLogs={handleClearAllLogs}
        />
      )}
    </div>
  );
};
