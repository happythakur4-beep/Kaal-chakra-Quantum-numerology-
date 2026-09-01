import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ThemeMode, MemoryHypnosisProtocol, MemorySessionLog } from '../../types';
import { Brain3DLightningCanvas } from './Brain3DLightningCanvas';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  CheckCircle2,
  Sliders,
  Shield,
  ArrowRight,
  Eye,
  Rewind,
  Save,
  Activity,
  Heart,
  Volume1
} from 'lucide-react';

interface InteractiveHypnosisSessionProps {
  theme: ThemeMode;
  protocol: MemoryHypnosisProtocol;
  onSessionComplete?: (log: MemorySessionLog) => void;
  onBackToProtocols?: () => void;
}

export const InteractiveHypnosisSession: React.FC<InteractiveHypnosisSessionProps> = ({
  theme,
  protocol,
  onSessionComplete,
  onBackToProtocols
}) => {
  const isDark = theme === 'dark';

  // Session State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [secondsRemainingInStep, setSecondsRemainingInStep] = useState<number>(
    protocol.steps[0]?.durationSec || 60
  );
  const [totalSecondsElapsed, setTotalSecondsElapsed] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Audio / Speech State
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [binauralAudioEnabled, setBinauralAudioEnabled] = useState<boolean>(true);
  const synthVoiceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Subjective Distress Scales (SUDS 0-10)
  const [targetMemoryTitle, setTargetMemoryTitle] = useState<string>('Unwanted Event or Distress Node');
  const [sudsBefore, setSudsBefore] = useState<number>(8);
  const [sudsAfter, setSudsAfter] = useState<number>(2);
  const [sessionNotes, setSessionNotes] = useState<string>('');

  // Submodality Live Dials (For NLP & Submodality Dimmer)
  const [grayscalePct, setGrayscalePct] = useState<number>(0);
  const [distanceMeters, setDistanceMeters] = useState<number>(1);
  const [sizeScale, setSizeScale] = useState<number>(1.0);
  const [isRewindingActive, setIsRewindingActive] = useState<boolean>(false);

  const currentStep = protocol.steps[currentStepIndex] || protocol.steps[0];

  // Stop Speech synthesis safely
  const stopSpeech = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Speak Hypnotic Script Narration
  const speakScript = useCallback((text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; // Slow, measured hypnotic pacing
    utterance.pitch = 0.95; // Grounding, warm cadence
    utterance.volume = 0.9;

    // Pick best natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Daniel')) && v.lang.startsWith('en')
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    synthVoiceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled, stopSpeech]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopSpeech();
    } else {
      setIsPlaying(true);
      if (binauralAudioEnabled) {
        cosmicAudio.playFrequencyTone(protocol.binauralHz * 20 + 200, 0.2, 'sine');
      }
      speakScript(currentStep.scriptNarration);
    }
  };

  // Step Change Effect
  useEffect(() => {
    setSecondsRemainingInStep(currentStep?.durationSec || 60);
    if (isPlaying) {
      speakScript(currentStep.scriptNarration);
      // Play electric synaptic arc sound on step transition
      if (binauralAudioEnabled) {
        cosmicAudio.playFrequencyTone(432, 0.25, 'sine');
      }
    }
  }, [currentStepIndex, currentStep, isPlaying, speakScript, binauralAudioEnabled]);

  // Main Timer Interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && !isCompleted) {
      interval = setInterval(() => {
        setTotalSecondsElapsed((prev) => prev + 1);
        setSecondsRemainingInStep((prev) => {
          if (prev <= 1) {
            // Advance to next step or complete
            if (currentStepIndex < protocol.steps.length - 1) {
              setCurrentStepIndex((s) => s + 1);
              return protocol.steps[currentStepIndex + 1]?.durationSec || 60;
            } else {
              // Finish session
              setIsCompleted(true);
              setIsPlaying(false);
              stopSpeech();
              confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isCompleted, currentStepIndex, protocol.steps, stopSpeech]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, [stopSpeech]);

  // Trigger Fast Rewind Animation
  const triggerFastRewind = () => {
    setIsRewindingActive(true);
    cosmicAudio.playFrequencyTone(880, 0.1, 'sawtooth');
    setTimeout(() => {
      cosmicAudio.playFrequencyTone(220, 0.2, 'sawtooth');
    }, 150);

    // Auto animate submodalities
    setGrayscalePct(100);
    setDistanceMeters(80);
    setSizeScale(0.2);

    setTimeout(() => {
      setIsRewindingActive(false);
    }, 1200);
  };

  // Save Session Log
  const handleSaveLog = () => {
    const reductionPct = Math.round(
      Math.max(0, ((sudsBefore - sudsAfter) / (sudsBefore || 1)) * 100)
    );

    const log: MemorySessionLog = {
      id: `hypno_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      targetMemoryTitle: targetMemoryTitle.trim() || protocol.title,
      protocolId: protocol.id,
      techniqueCategory: protocol.category,
      sudsBefore,
      sudsAfter,
      emotionalChargeReductionPct: reductionPct,
      tranceDepthReached: 'Somnambulistic',
      notes: sessionNotes.trim() || `Successfully completed ${protocol.title}. Neural decoupling achieved.`
    };

    if (onSessionComplete) {
      onSessionComplete(log);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden backdrop-blur-xl ${
          isDark
            ? 'bg-[#090d1a]/90 border-cyan-500/30 text-white shadow-2xl'
            : 'bg-white border-cyan-200 text-slate-900 shadow-xl'
        }`}
      >
        <div className="flex items-start justify-between flex-wrap gap-4 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5 fill-cyan-400 text-cyan-300" />
              <span>HYPNOTIC RECONSOLIDATION CHAMBER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300">
              {protocol.title}
            </h2>
            <div className="text-xs font-serif text-amber-300 italic">
              {protocol.sanskritTitle}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {protocol.summary}
            </p>
          </div>

          {/* Top Quick Actions */}
          <div className="flex items-center gap-2">
            {onBackToProtocols && (
              <button
                onClick={() => {
                  stopSpeech();
                  onBackToProtocols();
                }}
                className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition cursor-pointer"
              >
                ← Exit Chamber
              </button>
            )}
          </div>
        </div>

        {/* Target Memory & Distress Baseline (SUDS) Input */}
        <div className="mt-6 pt-6 border-t border-cyan-500/20 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-6 space-y-1">
            <label className="text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Target Memory / Event Tag (Decoupling Target)</span>
            </label>
            <input
              type="text"
              value={targetMemoryTitle}
              onChange={(e) => setTargetMemoryTitle(e.target.value)}
              placeholder="e.g. 2019 accident, fear of public speaking, hurtful breakup argument..."
              className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm transition focus:outline-none ${
                isDark
                  ? 'bg-slate-950/80 border-cyan-500/30 text-cyan-100 focus:border-cyan-400'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500'
              }`}
            />
          </div>

          {/* SUDS Distress Slider Before */}
          <div className="md:col-span-3 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
              <span>Distress Before (SUDS 0-10):</span>
              <span className="font-bold text-red-400">{sudsBefore} / 10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={sudsBefore}
              onChange={(e) => setSudsBefore(Number(e.target.value))}
              className="w-full accent-red-500 cursor-pointer"
            />
          </div>

          {/* SUDS Distress Slider After */}
          <div className="md:col-span-3 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
              <span>Distress After (SUDS 0-10):</span>
              <span className="font-bold text-emerald-400">{sudsAfter} / 10</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={sudsAfter}
              onChange={(e) => setSudsAfter(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Main Hypnosis Active Session Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 Cols): 3D Brain Lightning Simulation */}
        <div className="lg:col-span-7 space-y-4">
          <Brain3DLightningCanvas
            theme={theme}
            activeAnimationState={currentStep.visualAnimationState}
            lightningArcTargets={currentStep.lightningArcTargets}
            height={440}
            showControls={true}
          />

          {/* Real-time Submodality Manipulation Interactive Deck */}
          <div
            className={`p-5 rounded-3xl border space-y-4 ${
              isDark ? 'bg-slate-900/80 border-cyan-500/30' : 'bg-white border-cyan-200 shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <h4 className="font-cinzel font-bold text-xs sm:text-sm text-cyan-300">
                  Hypnotic Submodality Dials (Sensory Code Scrambler)
                </h4>
              </div>
              <button
                onClick={triggerFastRewind}
                className="px-3 py-1 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg hover:scale-105 transition"
              >
                <Rewind className="w-3.5 h-3.5 fill-current" />
                <span>Instant High-Speed Rewind (⏪ Zzzip!)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              {/* Grayscale Dimmer */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-black/40 border border-cyan-500/20">
                <div className="flex justify-between text-slate-300">
                  <span>Grayscale Drain:</span>
                  <span className="text-cyan-300">{grayscalePct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={grayscalePct}
                  onChange={(e) => setGrayscalePct(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="text-[10px] text-slate-400">Drains emotional color</div>
              </div>

              {/* Distance Push */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-black/40 border border-cyan-500/20">
                <div className="flex justify-between text-slate-300">
                  <span>Distance Push:</span>
                  <span className="text-cyan-300">{distanceMeters} meters</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={distanceMeters}
                  onChange={(e) => setDistanceMeters(Number(e.target.value))}
                  className="w-full accent-indigo-400 cursor-pointer"
                />
                <div className="text-[10px] text-slate-400">Pushes image into horizon</div>
              </div>

              {/* Size Shrink */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-black/40 border border-cyan-500/20">
                <div className="flex justify-between text-slate-300">
                  <span>Screen Size:</span>
                  <span className="text-cyan-300">{Math.round(sizeScale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={sizeScale * 100}
                  onChange={(e) => setSizeScale(Number(e.target.value) / 100)}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <div className="text-[10px] text-slate-400">Shrinks to postage stamp</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Hypnotic Script & Step Controller */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Phase Script Card */}
          <div
            className={`p-6 rounded-3xl border space-y-5 relative overflow-hidden backdrop-blur-xl ${
              isDark
                ? 'bg-[#0b1021]/95 border-cyan-500/40 text-slate-100 shadow-2xl'
                : 'bg-white border-cyan-300 text-slate-900 shadow-lg'
            }`}
          >
            {/* Phase Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  PHASE {currentStep.phaseNumber} OF {protocol.steps.length}
                </span>
                <h3 className="text-lg font-cinzel font-bold text-cyan-200">
                  {currentStep.phaseTitle}
                </h3>
              </div>
              <div className="text-right">
                <div className="text-xl font-mono font-bold text-amber-300">
                  {Math.floor(secondsRemainingInStep / 60)}:
                  {(secondsRemainingInStep % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-[10px] font-mono text-slate-400">Time In Phase</div>
              </div>
            </div>

            {/* Hypnotic Voice Narration Box */}
            <div className="p-4 rounded-2xl bg-black/50 border border-cyan-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
                <span className="flex items-center gap-1.5">
                  <Volume1 className="w-3.5 h-3.5" />
                  <span>Hypnotist Voice Narration:</span>
                </span>
                <button
                  onClick={() => speakScript(currentStep.scriptNarration)}
                  className="hover:text-cyan-100 underline cursor-pointer text-[11px]"
                >
                  Replay Voice
                </button>
              </div>
              <p className="text-xs sm:text-sm font-serif italic text-slate-200 leading-relaxed">
                &ldquo;{currentStep.scriptNarration}&rdquo;
              </p>
            </div>

            {/* Subconscious Action Explanation */}
            <div className="space-y-1 text-xs">
              <div className="font-mono font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Subconscious Synaptic Action:</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {currentStep.subconsciousAction}
              </p>
            </div>

            {/* Phase Navigation Step Pills */}
            <div className="flex items-center gap-1.5 pt-2">
              {protocol.steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentStepIndex(idx);
                    if (isPlaying) speakScript(step.scriptNarration);
                  }}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                    currentStepIndex === idx
                      ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                      : idx < currentStepIndex
                      ? 'bg-cyan-950/60 border border-cyan-500/40 text-cyan-300'
                      : 'bg-slate-900 border border-slate-800 text-slate-500'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* Master Control Deck (Play / Pause / Voice / Audio) */}
            <div className="pt-4 border-t border-cyan-500/20 flex items-center justify-between flex-wrap gap-2">
              <button
                onClick={togglePlay}
                className={`flex-1 py-3 px-6 rounded-2xl font-cinzel font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl ${
                  isPlaying
                    ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/30'
                    : 'bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-black shadow-cyan-500/30'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause Trance</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Begin Hypnotic Induction</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setVoiceEnabled((v) => !v)}
                title="Toggle Voice Guidance"
                className={`p-3 rounded-2xl border text-xs transition cursor-pointer ${
                  voiceEnabled
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  setCurrentStepIndex(0);
                  setIsCompleted(false);
                  setIsPlaying(false);
                  stopSpeech();
                }}
                title="Restart Session"
                className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Session Complete & Vault Logger */}
          {isCompleted && (
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-400/40 space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h4 className="font-cinzel font-bold text-sm sm:text-base">
                  Reconsolidation Successfully Sealed!
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Post-hypnotic suggestion installed: &ldquo;{protocol.postHypnoticSuggestion}&rdquo;
              </p>

              <div className="flex items-center justify-between text-xs font-mono p-3 rounded-2xl bg-black/40 border border-emerald-500/20">
                <span>Distress Reduction:</span>
                <span className="font-bold text-emerald-300 text-sm">
                  {Math.round(Math.max(0, ((sudsBefore - sudsAfter) / (sudsBefore || 1)) * 100))}% Drop in Autonomic Charge
                </span>
              </div>

              <button
                onClick={handleSaveLog}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-cinzel font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg transition"
              >
                <Save className="w-4 h-4" />
                <span>Save to Encrypted Memory Vault</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
