import React, { useState, useEffect, useRef } from 'react';
import { ThemeMode, UserProfile } from '../../types';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { audioManager } from '../../utils/audioStateManager';
import {
  TIBETAN_7_CHAKRA_BOWLS,
  BUDDHA_SOUND_PRACTICES,
  ALL_SOUND_THERAPIES_DATA,
  TibetanBowlData,
  BuddhaHealingPractice
} from '../../data/soundHealingData';
import { TibetanBowl3DIcon } from './TibetanBowl3DIcon';
import { CymaticsBrainVisualizer } from './CymaticsBrainVisualizer';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Activity,
  Heart,
  Brain,
  Zap,
  Flame,
  Radio,
  Sliders,
  CheckCircle2,
  Clock,
  Waves,
  Sun,
  Moon,
  Info,
  Shield,
  Layers,
  Award,
  ChevronRight,
  Headphones,
  Music,
  Wind
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SoundHealingSuiteProps {
  theme: ThemeMode;
  userProfile?: UserProfile;
  onNavigate?: (screen: any) => void;
  onOpenAstrologerChat?: (id?: string) => void;
}

export const SoundHealingSuite: React.FC<SoundHealingSuiteProps> = ({
  theme,
  userProfile,
  onNavigate,
  onOpenAstrologerChat
}) => {
  const isDark = theme === 'dark';

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'buddha' | 'all_therapies' | 'mixer' | 'cymatics'>('buddha');

  // Selected Items
  const [selectedBowl, setSelectedBowl] = useState<TibetanBowlData>(TIBETAN_7_CHAKRA_BOWLS[3]); // Heart F
  const [selectedBuddhaPractice, setSelectedBuddhaPractice] = useState<BuddhaHealingPractice>(BUDDHA_SOUND_PRACTICES[0]);
  const [selectedSolfeggioHz, setSelectedSolfeggioHz] = useState<number>(528);
  const [selectedBinaural, setSelectedBinaural] = useState<'delta' | 'theta' | 'alpha' | 'beta' | 'gamma'>('theta');

  // Audio Playback States
  const [isSingingBowlRimActive, setIsSingingBowlRimActive] = useState<boolean>(false);
  const [isContinuousHealingPlaying, setIsContinuousHealingPlaying] = useState<boolean>(false);
  const [isBinauralPlaying, setIsBinauralPlaying] = useState<boolean>(false);
  const [isIsochronicPlaying, setIsIsochronicPlaying] = useState<boolean>(false);
  const [isMedicineChantPlaying, setIsMedicineChantPlaying] = useState<boolean>(false);
  const [isShakuhachiPlaying, setIsShakuhachiPlaying] = useState<boolean>(false);

  // Sound Bath Mixer & Timer State
  const [isMixerPlaying, setIsMixerPlaying] = useState<boolean>(false);
  const [sessionDurationMinutes, setSessionDurationMinutes] = useState<number>(15);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(15 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Mixer track volumes
  const [mixerBowlFreq, setMixerBowlFreq] = useState<number>(432);
  const [mixerBowlVolume, setMixerBowlVolume] = useState<number>(75);
  const [mixerChant, setMixerChant] = useState<'medicine' | 'om-mani' | 'heart-sutra' | 'none'>('medicine');
  const [mixerChantVolume, setMixerChantVolume] = useState<number>(65);
  const [mixerThetaVolume, setMixerThetaVolume] = useState<number>(50);
  const [mixerDroneVolume, setMixerDroneVolume] = useState<number>(40);

  // Interactive Japa Counter for Medicine Buddha
  const [buddhaJapaCount, setBuddhaJapaCount] = useState<number>(0);

  // Cymatics Canvas Ref
  const cymaticsCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Synchronize audio states on unmount
  useEffect(() => {
    return () => {
      audioManager.stopAll();
      cosmicAudio.stopIsochronicPulse();
    };
  }, []);

  // Timer countdown hook
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeRemainingSeconds > 0) {
      interval = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            // Timer complete
            setIsTimerRunning(false);
            setIsMixerPlaying(false);
            audioManager.stopAll();
            cosmicAudio.playTingsha(2640, 6.0);
            confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeRemainingSeconds]);

  // Handle Tibetan Bowl Strike
  const handleStrikeBowl = (bowl: TibetanBowlData) => {
    setSelectedBowl(bowl);
    cosmicAudio.playTibetanBowl(bowl.freq, 7.0, 0.9);
  };

  // Toggle Continuous Singing Bowl Rim
  const handleToggleSingingBowlRim = (bowl: TibetanBowlData) => {
    if (isSingingBowlRimActive && cosmicAudio.getActiveSingingBowlFreq() === bowl.freq) {
      audioManager.stopAll();
      setIsSingingBowlRimActive(false);
    } else {
      audioManager.playSingingBowlRim(bowl.freq);
      setSelectedBowl(bowl);
      setIsSingingBowlRimActive(true);
    }
  };

  // Handle Tingsha Cymbals Strike
  const handleStrikeTingsha = () => {
    cosmicAudio.playTingsha(2640, 5.5);
  };

  // Handle Sacred Buddhist Gong Strike
  const handleStrikeGong = () => {
    cosmicAudio.playBuddhistGong(65, 9.0);
  };

  // Handle Medicine Buddha Chant
  const handlePlayMedicineBuddhaChant = () => {
    setIsMedicineChantPlaying(true);
    cosmicAudio.playMedicineBuddhaMantraChant(12.0);
    setTimeout(() => setIsMedicineChantPlaying(false), 12000);
  };

  // Handle Om Mani Padme Hum Chant
  const handlePlayOmMani = () => {
    cosmicAudio.playOmManiPadmeHum(8.0);
  };

  // Handle Shakuhachi Flute
  const handlePlayShakuhachi = (note: number = 324) => {
    setIsShakuhachiPlaying(true);
    cosmicAudio.playShakuhachiZenBreath(note, 4.5);
    setTimeout(() => setIsShakuhachiPlaying(false), 4600);
  };

  // Handle Continuous Solfeggio
  const handleToggleSolfeggio = (hz: number) => {
    if (isContinuousHealingPlaying && selectedSolfeggioHz === hz) {
      audioManager.stopAll();
      setIsContinuousHealingPlaying(false);
    } else {
      setSelectedSolfeggioHz(hz);
      audioManager.playSolfeggio(hz, 4.0);
      setIsContinuousHealingPlaying(true);
    }
  };

  // Handle Binaural Brainwave Entrainment
  const handleToggleBinaural = (wave: 'delta' | 'theta' | 'alpha' | 'beta' | 'gamma') => {
    if (isBinauralPlaying && selectedBinaural === wave) {
      audioManager.stopAll();
      setIsBinauralPlaying(false);
    } else {
      setSelectedBinaural(wave);
      audioManager.playBinaural(216, wave, 'binaural');
      setIsBinauralPlaying(true);
    }
  };

  // Handle Isochronic Pulse
  const handleToggleIsochronic = (carrier: number, pulseRate: number) => {
    if (isIsochronicPlaying) {
      cosmicAudio.stopIsochronicPulse();
      setIsIsochronicPlaying(false);
    } else {
      cosmicAudio.startIsochronicPulse(carrier, pulseRate);
      setIsIsochronicPlaying(true);
    }
  };

  // Handle Sound Bath Mixer Playback
  const handleToggleMixer = () => {
    if (isMixerPlaying) {
      setIsMixerPlaying(false);
      setIsTimerRunning(false);
      audioManager.stopAll();
      cosmicAudio.stopSoundscape();
    } else {
      setIsMixerPlaying(true);
      setIsTimerRunning(true);
      audioManager.playSingingBowlRim(mixerBowlFreq);
      audioManager.playBinaural(216, 'theta', 'binaural');
      cosmicAudio.playTingsha(2640, 5.0);
      if (mixerChant === 'medicine') {
        cosmicAudio.playMedicineBuddhaMantraChant(15.0);
      } else if (mixerChant === 'om-mani') {
        cosmicAudio.playOmManiPadmeHum(10.0);
      }
    }
  };

  // Apply Preset
  const handleApplyPreset = (preset: typeof ALL_SOUND_THERAPIES_DATA.soundBathPresets[0]) => {
    setMixerBowlFreq(preset.defaultLayers.bowlFreq);
    setSessionDurationMinutes(preset.recommendedTimeMinutes);
    setTimeRemainingSeconds(preset.recommendedTimeMinutes * 60);
    cosmicAudio.playTingsha(2640, 4.0);
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Cymatics Canvas Animation
  useEffect(() => {
    if (activeTab !== 'cymatics') return;
    const canvas = cymaticsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.fillStyle = isDark ? '#090d16' : '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(centerX, centerY) - 20;

      const freqRatio = selectedSolfeggioHz / 100;
      const petals = Math.round(freqRatio * 1.5);

      // Outer resonant ring
      ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Dynamic Cymatic Standing Wave Nodes
      for (let r = 20; r < maxRadius; r += 16) {
        ctx.beginPath();
        const numPoints = 180;
        for (let i = 0; i <= numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2;
          const waveMod = Math.sin(angle * petals + time) * Math.cos(r * 0.1 - time * 0.5) * 8;
          const currentR = r + waveMod;
          const x = centerX + Math.cos(angle) * currentR;
          const y = centerY + Math.sin(angle) * currentR;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.strokeStyle = isDark
          ? `hsla(${(r * 3 + selectedSolfeggioHz) % 360}, 85%, 65%, ${0.15 + (r / maxRadius) * 0.4})`
          : `hsla(${(r * 3 + selectedSolfeggioHz) % 360}, 75%, 40%, ${0.2 + (r / maxRadius) * 0.5})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // Central Harmonic Mandala Emitter
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, selectedSolfeggioHz, isDark]);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300`}>
      {/* Top Ambient Header Banner */}
      <div className="relative overflow-hidden border-b border-amber-500/20 bg-gradient-to-r from-amber-950/30 via-slate-900/60 to-emerald-950/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <TibetanBowl3DIcon size={64} showGlow={true} ringing={isSingingBowlRimActive || isMixerPlaying} />
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/20 border border-amber-400/40 text-amber-300 uppercase tracking-widest mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  Sacred Sound Healing Sanctuary • नाद ब्रह्म
                </div>
                <h1 className="text-2xl sm:text-4xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-emerald-300">
                  Sound Healing Therapy Suite
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1 max-w-2xl">
                  Explore authentic Buddhist Sound Healing, 7 Tibetan Planetary Bowls, Medicine Buddha Mantras, Solfeggio Frequencies & Interactive Sound Bath Mixer.
                </p>
              </div>
            </div>

            {/* Quick Master Audio Dock */}
            <div className="flex items-center gap-3 bg-slate-900/80 border border-amber-500/40 rounded-2xl p-2.5 shadow-xl backdrop-blur-md">
              <button
                id="quick-tingsha-strike"
                onClick={handleStrikeTingsha}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-semibold transition active:scale-95"
                title="Strike Tibetan Tingsha Cymbals (2640Hz)"
              >
                <BellRingIcon className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Tingsha</span>
              </button>

              <button
                id="quick-gong-strike"
                onClick={handleStrikeGong}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-semibold transition active:scale-95"
                title="Strike Sacred Buddhist Wind Gong (65Hz)"
              >
                <Waves className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Gong Bath</span>
              </button>

              <button
                id="quick-buddha-chant"
                onClick={handlePlayMedicineBuddhaChant}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-semibold transition active:scale-95"
                title="Play Medicine Buddha Healing Mantra (528Hz)"
              >
                <Heart className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Medicine Buddha</span>
              </button>
            </div>
          </div>

          {/* Navigation Tab Bar */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pt-6 border-t border-slate-800/80 mt-6 scrollbar-none">
            <button
              id="tab-buddha-sound-healing"
              onClick={() => setActiveTab('buddha')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-cinzel text-xs sm:text-sm font-bold tracking-wide transition whitespace-nowrap ${
                activeTab === 'buddha'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/25'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
              }`}
            >
              <TibetanBowl3DIcon size={20} interactive={false} showGlow={false} />
              Buddha Sound Healing (बुद्ध चिकित्सा)
            </button>

            <button
              id="tab-all-sound-therapies"
              onClick={() => setActiveTab('all_therapies')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-cinzel text-xs sm:text-sm font-bold tracking-wide transition whitespace-nowrap ${
                activeTab === 'all_therapies'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
              }`}
            >
              <Radio className="w-4 h-4" />
              All Sound Therapies (संपूर्ण चिकित्सा)
            </button>

            <button
              id="tab-live-sound-bath-mixer"
              onClick={() => setActiveTab('mixer')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-cinzel text-xs sm:text-sm font-bold tracking-wide transition whitespace-nowrap ${
                activeTab === 'mixer'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
              }`}
            >
              <Sliders className="w-4 h-4" />
              Live Sound Bath Mixer & Timer
            </button>

            <button
              id="tab-cymatics-frequency-science"
              onClick={() => setActiveTab('cymatics')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-cinzel text-xs sm:text-sm font-bold tracking-wide transition whitespace-nowrap ${
                activeTab === 'cymatics'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-slate-950 shadow-lg shadow-purple-500/25'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
              }`}
            >
              <Waves className="w-4 h-4" />
              Cymatics & Water Science (सिमैटिक्स)
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ========================================================================= */}
        {/* TAB 1: BUDDHA SOUND HEALING (बुद्ध ध्वनि चिकित्सा) */}
        {/* ========================================================================= */}
        {activeTab === 'buddha' && (
          <div className="space-y-10">
            {/* Section 1: The 7 Planetary Tibetan Singing Bowls */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-amber-500/30 backdrop-blur-xl shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-1">
                    <TibetanBowl3DIcon size={18} interactive={false} showGlow={false} />
                    Sacred Himalayan Alchemy • 7 Planetary Metals
                  </div>
                  <h2 className="text-xl sm:text-3xl font-cinzel font-bold text-amber-200">
                    The 7 Tibetan Singing Bowls (7 चक्र तिब्बती कटोरे)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
                    Hand-hammered alloys of Gold, Silver, Mercury, Copper, Iron, Tin, and Lead. Each bowl produces non-integer acoustic overtones that recalibrate human cellular frequencies.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="strike-all-harmonic"
                    onClick={() => {
                      TIBETAN_7_CHAKRA_BOWLS.forEach((b, idx) => {
                        setTimeout(() => cosmicAudio.playTibetanBowl(b.freq, 6.0, 0.7), idx * 400);
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-xs font-bold font-cinzel shadow-md hover:scale-105 active:scale-95 transition"
                  >
                    Play 7-Chakra Cascade Wave
                  </button>
                </div>
              </div>

              {/* 7 Bowls Interactive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 sm:gap-4">
                {TIBETAN_7_CHAKRA_BOWLS.map((bowl) => {
                  const isSelected = selectedBowl.id === bowl.id;
                  const isRimming = isSingingBowlRimActive && selectedBowl.id === bowl.id;

                  return (
                    <div
                      key={bowl.id}
                      className={`relative p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-slate-800/90 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)] scale-[1.02]'
                          : 'bg-slate-950/60 border-slate-800 hover:border-amber-500/40 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="w-3.5 h-3.5 rounded-full shadow-md"
                          style={{ backgroundColor: bowl.color }}
                        />
                        <span className="text-[10px] font-mono font-bold text-amber-400/80 bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-500/20">
                          {bowl.freq} Hz
                        </span>
                      </div>

                      <div className="text-center my-2">
                        <div
                          className="cursor-pointer mx-auto my-1 transform transition hover:scale-110 active:scale-95"
                          onClick={() => handleStrikeBowl(bowl)}
                          title={`Strike ${bowl.name}`}
                        >
                          <TibetanBowl3DIcon size={48} showGlow={isSelected} ringing={isRimming} />
                        </div>
                        <div className="text-xs font-cinzel font-bold text-slate-200 mt-2">{bowl.note}</div>
                        <div className="text-[10px] text-slate-400 font-sans">{bowl.chakra.split('•')[0]}</div>
                        <div className="text-[9px] text-amber-400/70 font-mono mt-0.5">{bowl.planet.split(' ')[0]}</div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-1.5 pt-3 border-t border-slate-800">
                        <button
                          id={`strike-${bowl.id}`}
                          onClick={() => handleStrikeBowl(bowl)}
                          className="w-full py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-300 text-[11px] font-semibold flex items-center justify-center gap-1 transition active:scale-95"
                        >
                          <Play className="w-3 h-3 fill-amber-300" />
                          Strike Bowl
                        </button>

                        <button
                          id={`rim-${bowl.id}`}
                          onClick={() => handleToggleSingingBowlRim(bowl)}
                          className={`w-full py-1.5 rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 transition ${
                            isRimming
                              ? 'bg-amber-500 text-slate-950 font-bold shadow-md animate-pulse'
                              : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {isRimming ? <Pause className="w-3 h-3" /> : <RotateCcw className="w-3 h-3" />}
                          {isRimming ? 'Singing...' : 'Singing Rim'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Bowl Deep Breakdown */}
              <div className="mt-6 p-5 rounded-2xl bg-slate-950/70 border border-amber-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedBowl.color }} />
                    <span className="text-sm font-cinzel font-bold text-amber-300">
                      {selectedBowl.name} ({selectedBowl.hindiName}) • {selectedBowl.freq} Hz
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                    {selectedBowl.description}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1 text-[11px] text-slate-400 font-mono">
                    <span><strong className="text-amber-400">Metal:</strong> {selectedBowl.metal}</span>
                    <span><strong className="text-emerald-400">Target:</strong> {selectedBowl.healingTarget}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    id="selected-bowl-sing-toggle"
                    onClick={() => handleToggleSingingBowlRim(selectedBowl)}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-cinzel font-bold text-xs shadow-lg transition active:scale-95"
                  >
                    {isSingingBowlRimActive ? 'Stop Sustained Rim' : 'Continuous Singing Mode'}
                  </button>
                </div>
              </div>
            </div>

            {/* Section 2: Medicine Buddha (Bhaisajyaguru) Healing Mantra Sanctuary */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-slate-900/80 to-blue-950/40 border border-cyan-500/30 backdrop-blur-xl shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Mantra Information & Tibetan Script */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 uppercase tracking-widest">
                    <Heart className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    King of Physicians • Sangye Menla
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-cyan-200">
                    Medicine Buddha (भैषज्यगुरु) Healing Mantra
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    According to the Buddha's <em>Four Tantras of Medicine (Gyushi)</em>, all physical diseases arise from the <strong>3 Root Poisons</strong>: <em>Attachment (Lobha)</em> causing wind disorders, <em>Aversion (Dvesha)</em> causing bile/inflammatory diseases, and <em>Delusion (Moha)</em> causing phlegm/metabolic stagnation.
                  </p>

                  {/* Sacred Tibetan Script Card */}
                  <div className="p-4 rounded-2xl bg-cyan-950/50 border border-cyan-500/40 text-center space-y-2">
                    <div className="text-xl sm:text-2xl font-serif text-cyan-300 tracking-wider">
                      {BUDDHA_SOUND_PRACTICES[0].mantraTibetan}
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-amber-300 tracking-widest">
                      {BUDDHA_SOUND_PRACTICES[0].mantraText}
                    </div>
                    <div className="text-[11px] text-slate-400 italic">
                      "{BUDDHA_SOUND_PRACTICES[0].mantraMeaning}"
                    </div>
                  </div>

                  {/* Cellular Bio-Photonic Visualization */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/20 space-y-1.5 text-xs text-slate-300">
                    <div className="font-cinzel font-bold text-cyan-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      Lapis Lazuli Blue Light Visualization (नील मणि प्रकाश ध्यान):
                    </div>
                    <p className="leading-relaxed text-slate-400">
                      {BUDDHA_SOUND_PRACTICES[0].visualization}
                    </p>
                  </div>
                </div>

                {/* Right: Audio Player & 108 Japa Counter */}
                <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/30">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-cinzel font-bold text-cyan-300">Mantra Wave Audio</span>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-800">
                        528Hz + 852Hz Lapis Drone
                      </span>
                    </div>

                    <button
                      id="play-medicine-buddha-chant-btn"
                      onClick={handlePlayMedicineBuddhaChant}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-cinzel font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition active:scale-95"
                    >
                      <Play className="w-4 h-4 fill-slate-950" />
                      {isMedicineChantPlaying ? 'Chanting Resonating...' : 'Chant Medicine Buddha Mantra'}
                    </button>

                    {/* 108 Japa Counter */}
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-3">
                      <div className="text-xs font-cinzel font-bold text-slate-300">
                        Healing Japa Counter (108 जप माला)
                      </div>
                      <div className="text-3xl font-mono font-bold text-cyan-300">
                        {buddhaJapaCount} <span className="text-sm text-slate-500 font-sans">/ 108</span>
                      </div>

                      <div className="flex items-center justify-center gap-3">
                        <button
                          id="increment-buddha-japa"
                          onClick={() => {
                            setBuddhaJapaCount((prev) => {
                              const next = prev + 1;
                              cosmicAudio.playTempleBell(432, 2.5);
                              if (next === 108) {
                                cosmicAudio.playTingsha(2640, 6.0);
                                confetti({ particleCount: 100, spread: 80 });
                              }
                              return next;
                            });
                          }}
                          className="px-6 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-bold font-mono transition active:scale-95"
                        >
                          + 1 Count (मंत्र जप)
                        </button>

                        <button
                          id="reset-buddha-japa"
                          onClick={() => setBuddhaJapaCount(0)}
                          className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs transition"
                          title="Reset counter"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Mudra: Varada (Medicine Leaf)</span>
                    <span className="text-cyan-400 font-mono">Gyushi Sowa Rigpa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: The Complete Buddhist Sound Practices Catalog */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-cinzel font-bold text-slate-200">
                  What Buddhas & Monastic Masters Do For Sound Healing
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BUDDHA_SOUND_PRACTICES.map((practice) => (
                  <div
                    key={practice.id}
                    className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-amber-400/80 mb-1">
                        <span>{practice.tradition}</span>
                        <span>{practice.keyFrequencies[0]} Hz</span>
                      </div>
                      <h4 className="text-base font-cinzel font-bold text-slate-100">
                        {practice.title}
                      </h4>
                      <div className="text-xs font-serif text-slate-400 mt-0.5">
                        {practice.hindiTitle}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed mt-2">
                        {practice.description}
                      </p>

                      {/* How Buddhas Use It Bullet Points */}
                      <div className="mt-3 space-y-1.5">
                        <div className="text-[11px] font-mono font-semibold text-cyan-300">Monastic Method:</div>
                        <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                          {practice.howBuddhasUseIt.slice(0, 2).map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 font-mono">
                        {practice.instrument.split('+')[0]}
                      </span>
                      <button
                        id={`play-practice-${practice.id}`}
                        onClick={() => {
                          if (practice.id === 'medicine-buddha') handlePlayMedicineBuddhaChant();
                          else if (practice.id === 'om-mani-padme-hum') handlePlayOmMani();
                          else if (practice.id === 'tingsha-cymbals') handleStrikeTingsha();
                          else if (practice.id === 'sacred-gong-bath') handleStrikeGong();
                          else if (practice.id === 'heart-sutra-chant') cosmicAudio.playTempleBell(432, 6.0);
                          else if (practice.id === 'shakuhachi-suizen') handlePlayShakuhachi(324);
                          else if (practice.id === 'nada-yoga-sound') cosmicAudio.playSchumannResonance(6.0);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-300 text-xs font-semibold flex items-center gap-1 transition active:scale-95"
                      >
                        <Play className="w-3 h-3 fill-amber-300" />
                        Listen Resonance
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ALL SOUND THERAPIES (संपूर्ण ध्वनि चिकित्सा) */}
        {/* ========================================================================= */}
        {activeTab === 'all_therapies' && (
          <div className="space-y-10">
            {/* 1. The 10 Solfeggio Frequencies Clinical & Spiritual Matrix */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-xl shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">
                    <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    Sacred Solfeggio Scale • 174Hz to 963Hz
                  </div>
                  <h2 className="text-xl sm:text-3xl font-cinzel font-bold text-emerald-200">
                    All Solfeggio Frequencies (सोलफेगियो तरंगें)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
                    Ancient Gregorian & Vedic mathematical scale. Generates pure electromagnetic standing waves that restore damaged cellular resonance and cellular epigenetic vitality.
                  </p>
                </div>

                {isContinuousHealingPlaying && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Active Wave: {selectedSolfeggioHz} Hz
                  </div>
                )}
              </div>

              {/* Solfeggio Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                {ALL_SOUND_THERAPIES_DATA.solfeggio.map((s) => {
                  const isCurrent = selectedSolfeggioHz === s.hz;
                  const isPlayingThis = isContinuousHealingPlaying && isCurrent;

                  return (
                    <div
                      key={s.hz}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-slate-800/90 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                          : 'bg-slate-950/60 border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-mono font-bold text-emerald-300">{s.hz} Hz</span>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full">
                            {s.note}
                          </span>
                        </div>
                        <h4 className="text-xs font-cinzel font-bold text-slate-200">{s.name}</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed mt-1.5">{s.desc}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-800 mt-3 flex items-center gap-2">
                        <button
                          id={`play-solfeggio-${s.hz}`}
                          onClick={() => handleToggleSolfeggio(s.hz)}
                          className={`w-full py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition ${
                            isPlayingThis
                              ? 'bg-emerald-500 text-slate-950 font-bold shadow-md animate-pulse'
                              : 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-300'
                          }`}
                        >
                          {isPlayingThis ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-emerald-300" />}
                          {isPlayingThis ? 'Emitting...' : 'Emit Sine Wave'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Binaural Brainwave Entrainment Station */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-blue-500/30 backdrop-blur-xl shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 font-bold uppercase tracking-wider mb-1">
                    <Headphones className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                    Stereo Acoustic Brainwave Entrainment
                  </div>
                  <h3 className="text-xl sm:text-3xl font-cinzel font-bold text-blue-200">
                    Binaural Beats Suite (बाइनॉरल ब्रेनवेव थेरेपी)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
                    Headphones recommended. Shifts EEG neural oscillations into target states: Delta for deep sleep, Theta for Buddhist Dhyana trance, Alpha for flow, Gamma for epiphany.
                  </p>
                </div>

                <button
                  id="toggle-binaural-btn"
                  onClick={() => handleToggleBinaural(selectedBinaural)}
                  className={`px-5 py-2.5 rounded-xl font-cinzel font-bold text-xs shadow-lg transition active:scale-95 flex items-center gap-2 ${
                    isBinauralPlaying
                      ? 'bg-blue-500 text-slate-950 animate-pulse'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  <Headphones className="w-4 h-4" />
                  {isBinauralPlaying ? 'Stop Binaural Stream' : `Start ${selectedBinaural.toUpperCase()} Wave`}
                </button>
              </div>

              {/* 5 Brainwave Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {ALL_SOUND_THERAPIES_DATA.binauralWaves.map((wave) => {
                  const isCurrent = selectedBinaural === wave.type;
                  const isPlaying = isBinauralPlaying && isCurrent;

                  return (
                    <div
                      key={wave.type}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-slate-800/90 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.25)]'
                          : 'bg-slate-950/60 border-slate-800 hover:border-blue-500/40 hover:bg-slate-900/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-blue-300 uppercase">{wave.type}</span>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full">
                            {wave.range}
                          </span>
                        </div>
                        <h4 className="text-xs font-cinzel font-bold text-slate-200">{wave.name}</h4>
                        <div className="text-[10px] text-blue-400/80 font-serif mt-0.5">{wave.hindiName}</div>
                        <p className="text-[11px] text-slate-300 leading-relaxed mt-2">{wave.benefit}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-800 mt-3">
                        <button
                          id={`select-binaural-${wave.type}`}
                          onClick={() => handleToggleBinaural(wave.type as any)}
                          className={`w-full py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition ${
                            isPlaying
                              ? 'bg-blue-500 text-slate-950 font-bold shadow-md animate-pulse'
                              : 'bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-300'
                          }`}
                        >
                          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-blue-300" />}
                          {isPlaying ? 'Active...' : 'Activate Wave'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Chakra Bija Seed Mantras (LAM, VAM, RAM, YAM, HAM, SHAM, OM) & Biofield Tuning */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Chakra Bija Formant Synthesizer */}
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/30 backdrop-blur-xl shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-cinzel font-bold text-purple-200">
                      7 Chakra Bija Seed Mantras (बीज मंत्र)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Resonant vowel formants matching each chakra's subtle element.
                    </p>
                  </div>
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ALL_SOUND_THERAPIES_DATA.chakraBija.map((item) => (
                    <button
                      key={item.chakra}
                      id={`bija-btn-${item.chakra.toLowerCase()}`}
                      onClick={() => {
                        const map: any = {
                          Root: 'root',
                          Sacral: 'sacral',
                          Solar: 'solar',
                          Heart: 'heart',
                          Throat: 'throat',
                          'Third Eye': 'thirdeye',
                          Crown: 'crown'
                        };
                        cosmicAudio.playChakraBijaMantra(map[item.chakra]);
                      }}
                      className="p-3 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 text-left transition flex items-center justify-between group active:scale-95"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-xs font-cinzel font-bold text-slate-200">{item.chakra} • {item.bija}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{item.element} • {item.target}</div>
                      </div>
                      <Play className="w-3.5 h-3.5 text-purple-400 group-hover:scale-125 transition" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Biofield Tuning Fork & Schumann Resonance */}
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-amber-500/30 backdrop-blur-xl shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-cinzel font-bold text-amber-200">
                      Biofield Tuning Forks & Earth Resonance
                    </h3>
                    <p className="text-xs text-slate-400">
                      Physical frequency acoustics for biological nitric oxide & grounding.
                    </p>
                  </div>
                  <Waves className="w-5 h-5 text-amber-400" />
                </div>

                <div className="space-y-3">
                  {/* Otto 128Hz Tuning Fork */}
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-cinzel font-bold text-amber-300">
                        Otto 128 Hz Biofield Tuning Fork (ऑटो ट्यूनिंग फोर्क)
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Stimulates rapid nitric oxide release in blood vessels, enhances bone density and relieves muscle spasm.
                      </div>
                    </div>
                    <button
                      id="play-otto-128"
                      onClick={() => cosmicAudio.playTuningFork128()}
                      className="px-3 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-semibold shrink-0 transition active:scale-95"
                    >
                      Ring 128Hz
                    </button>
                  </div>

                  {/* 7.83Hz Schumann Resonance */}
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-cinzel font-bold text-emerald-300">
                        7.83 Hz Schumann Resonance (पृथ्वी स्पंदन)
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Earth’s ionospheric electromagnetic heartbeat. Re-establishes circadian synchrony and dissipates EMF fatigue.
                      </div>
                    </div>
                    <button
                      id="play-schumann-resonance"
                      onClick={() => cosmicAudio.playSchumannResonance(6.0)}
                      className="px-3 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-semibold shrink-0 transition active:scale-95"
                    >
                      Pulse 7.83Hz
                    </button>
                  </div>

                  {/* 432Hz Verdi Cosmic Resonance */}
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-cinzel font-bold text-cyan-300">
                        432 Hz Pythagorean Golden Tuning (प्राकृतिक सुर)
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Natural harmonic tuning aligned with water molecular crystallization and heart rate coherence.
                      </div>
                    </div>
                    <button
                      id="play-432-tone"
                      onClick={() => cosmicAudio.playTibetanBowl(432, 6.0, 0.8)}
                      className="px-3 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-semibold shrink-0 transition active:scale-95"
                    >
                      Play 432Hz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: LIVE SOUND BATH MIXER & TIMER (साउंड बाथ मिक्सर) */}
        {/* ========================================================================= */}
        {activeTab === 'mixer' && (
          <div className="space-y-8">
            {/* Mixer Console Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-2xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1">
                    <Sliders className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    Multi-Track Sound Bath Engine
                  </div>
                  <h2 className="text-xl sm:text-3xl font-cinzel font-bold text-cyan-200">
                    Live Sound Bath Mixer & Session Timer
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-xl mt-1">
                    Blend live Tibetan Singing Bowls, Buddhist Mantras, Theta waves, and atmospheric space drones into your custom meditation soundscape.
                  </p>
                </div>

                {/* Master Play/Stop & Timer Display */}
                <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-2xl border border-slate-800 shadow-xl">
                  <div className="text-center px-3 border-r border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Session Timer</div>
                    <div className="text-2xl font-mono font-bold text-cyan-300">
                      {formatTime(timeRemainingSeconds)}
                    </div>
                  </div>

                  <button
                    id="master-sound-bath-toggle"
                    onClick={handleToggleMixer}
                    className={`px-6 py-3.5 rounded-xl font-cinzel font-bold text-sm shadow-xl flex items-center gap-2 transition active:scale-95 ${
                      isMixerPlaying
                        ? 'bg-red-500 hover:bg-red-400 text-white animate-pulse'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950'
                    }`}
                  >
                    {isMixerPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
                    {isMixerPlaying ? 'Stop Sound Bath' : 'Start Live Sound Bath'}
                  </button>
                </div>
              </div>

              {/* Preset Soundscapes */}
              <div className="mb-8">
                <div className="text-xs font-cinzel font-bold text-slate-300 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Select Curated Buddhist & Sound Bath Preset:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {ALL_SOUND_THERAPIES_DATA.soundBathPresets.map((preset) => (
                    <button
                      key={preset.id}
                      id={`preset-btn-${preset.id}`}
                      onClick={() => handleApplyPreset(preset)}
                      className="p-3.5 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-left transition space-y-1 active:scale-95"
                    >
                      <div className="text-xs font-cinzel font-bold text-cyan-300">{preset.title}</div>
                      <div className="text-[10px] text-slate-400 leading-snug">{preset.desc}</div>
                      <div className="text-[9px] font-mono text-amber-400/80 pt-1">
                        Recommended: {preset.recommendedTimeMinutes} mins
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Multi-Track Fader Console */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
                {/* Track 1: Tibetan Singing Bowl */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-cinzel font-bold text-amber-300 flex items-center gap-1.5">
                      <TibetanBowl3DIcon size={16} interactive={false} showGlow={false} />
                      1. Singing Bowl
                    </span>
                    <span className="text-[10px] font-mono text-amber-400">{mixerBowlFreq} Hz</span>
                  </div>

                  <select
                    id="mixer-bowl-freq-select"
                    value={mixerBowlFreq}
                    onChange={(e) => {
                      const f = Number(e.target.value);
                      setMixerBowlFreq(f);
                      if (isMixerPlaying) audioManager.playSingingBowlRim(f);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                  >
                    <option value={256}>Root C (256 Hz)</option>
                    <option value={288}>Sacral D (288 Hz)</option>
                    <option value={324}>Solar Plexus E (324 Hz)</option>
                    <option value={341.3}>Heart F (341.3 Hz)</option>
                    <option value={384}>Throat G (384 Hz)</option>
                    <option value={432}>Third Eye A (432 Hz)</option>
                    <option value={480}>Crown B (480 Hz)</option>
                    <option value={528}>Miracle 528 Hz</option>
                  </select>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={mixerBowlVolume}
                    onChange={(e) => setMixerBowlVolume(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                  <div className="text-[10px] text-slate-500 font-mono text-right">{mixerBowlVolume}% Volume</div>
                </div>

                {/* Track 2: Buddhist Sacred Chant */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-cinzel font-bold text-cyan-300 flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-cyan-400" />
                      2. Buddhist Mantra
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400">Vocal Drone</span>
                  </div>

                  <select
                    id="mixer-chant-select"
                    value={mixerChant}
                    onChange={(e) => setMixerChant(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="medicine">Medicine Buddha (528Hz)</option>
                    <option value="om-mani">Om Mani Padme Hum</option>
                    <option value="heart-sutra">Heart Sutra (Gate Gate)</option>
                    <option value="none">Mute Mantra Vocal</option>
                  </select>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={mixerChantVolume}
                    onChange={(e) => setMixerChantVolume(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                  <div className="text-[10px] text-slate-500 font-mono text-right">{mixerChantVolume}% Volume</div>
                </div>

                {/* Track 3: Theta Binaural Wave */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-cinzel font-bold text-blue-300 flex items-center gap-1.5">
                      <Headphones className="w-3.5 h-3.5 text-blue-400" />
                      3. Theta 4.5Hz Wave
                    </span>
                    <span className="text-[10px] font-mono text-blue-400">Dhyana Trance</span>
                  </div>

                  <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    Carrier: 216Hz | Beat: 4.5Hz (Buddhist Sati)
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={mixerThetaVolume}
                    onChange={(e) => setMixerThetaVolume(Number(e.target.value))}
                    className="w-full accent-blue-400"
                  />
                  <div className="text-[10px] text-slate-500 font-mono text-right">{mixerThetaVolume}% Volume</div>
                </div>

                {/* Track 4: Space Drone & Wind */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-cinzel font-bold text-purple-300 flex items-center gap-1.5">
                      <Wind className="w-3.5 h-3.5 text-purple-400" />
                      4. Cosmic Drone
                    </span>
                    <span className="text-[10px] font-mono text-purple-400">108Hz Root</span>
                  </div>

                  <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    Filtered Pink Noise & Sacred Harmonic Drone
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={mixerDroneVolume}
                    onChange={(e) => setMixerDroneVolume(Number(e.target.value))}
                    className="w-full accent-purple-400"
                  />
                  <div className="text-[10px] text-slate-500 font-mono text-right">{mixerDroneVolume}% Volume</div>
                </div>
              </div>

              {/* Timer Duration Selection */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-cinzel font-bold text-slate-300">Set Session Length:</span>
                  {[5, 10, 15, 20, 30, 45, 60].map((mins) => (
                    <button
                      key={mins}
                      id={`timer-btn-${mins}`}
                      onClick={() => {
                        setSessionDurationMinutes(mins);
                        setTimeRemainingSeconds(mins * 60);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition ${
                        sessionDurationMinutes === mins
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>

                <div className="text-[11px] text-slate-500 font-mono">
                  Gentle closing Tingsha cymbals automatically sound when timer concludes.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: CYMATICS & FREQUENCY SCIENCE (ध्वनि विज्ञान एवं सिमैटिक्स) */}
        {/* ========================================================================= */}
        {activeTab === 'cymatics' && (
          <div className="space-y-8">
            <CymaticsBrainVisualizer
              theme={theme}
              initialFrequency={selectedSolfeggioHz}
              showControls={true}
            />

            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-purple-500/30 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 border border-purple-400/40 text-purple-300 uppercase tracking-widest">
                <Waves className="w-3.5 h-3.5 text-purple-400" />
                Epigenetic Sound Mechanics & Nada Yoga
              </div>
              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-purple-200">
                Cymatics & Brainwave Coherence: How Frequency Re-programs Matter
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                The human body is <strong>70% water</strong> and <strong>99.9% water at the molecular count level</strong>. When sacred sound frequencies pass through biological fluids and neural pathways, they form distinct geometric wave clusters (Faraday waves) that directly influence cell membrane permeability, vagus nerve signaling, and gene expression.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-1.5">
                  <div className="text-xs font-cinzel font-bold text-amber-300">
                    1. 432 Hz & Sri Yantra Crystallization
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    At 432Hz, water clusters form perfect 6-fold and 12-fold hexagonal symmetry, matching the geometry of natural snowflakes and healthy intracellular water.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-1.5">
                  <div className="text-xs font-cinzel font-bold text-emerald-300">
                    2. 528 Hz & Telomerase Activation
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Research shows 528Hz acoustic stimulation increases cellular antioxidant enzymes (superoxide dismutase) and protects telomeres from oxidative stress.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-1.5">
                  <div className="text-xs font-cinzel font-bold text-cyan-300">
                    3. Buddhist Sonic Shunya & EEG Synchrony
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Tibetan singing bowl harmonics dissolve rigid vibrational knots in the biofield, bringing left and right cerebral hemispheres into 98% phase-locked gamma/theta synchrony.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Icon
function BellRingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      <path d="M4 2C2.8 3.7 2 5.7 2 8" />
      <path d="M22 8c0-2.3-.8-4.3-2-6" />
    </svg>
  );
}
