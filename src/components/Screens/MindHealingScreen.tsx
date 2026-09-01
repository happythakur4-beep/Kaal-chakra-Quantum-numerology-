import React, { useState, useEffect, useRef } from 'react';
import { ThemeMode, UserProfile, MindHealingProtocol, MindHealingSessionLog, IllnessCategory } from '../../types';
import { MIND_HEALING_PROTOCOLS, VEDIC_MIND_BODY_SCIENCE } from '../../data/mindHealingData';
import { TibetanBowl3DIcon } from '../SoundHealing/TibetanBowl3DIcon';
import { SoundHealingSuite } from '../SoundHealing/SoundHealingSuite';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { audioManager } from '../../utils/audioStateManager';
import {
  Sparkles,
  Heart,
  Activity,
  Brain,
  Zap,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ShieldAlert,
  Flame,
  Shield,
  Layers,
  Dna,
  Sun,
  Moon,
  ChevronRight,
  Info,
  Sliders,
  Send,
  Printer,
  Calendar,
  Award,
  Share2,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MindHealingScreenProps {
  theme: ThemeMode;
  userProfile?: UserProfile;
  onNavigate: (screen: any) => void;
  onOpenAstrologerChat?: (id?: string) => void;
  initialTab?: 'chamber' | 'protocols' | 'sound_healing' | 'custom_ai' | 'science' | 'journal';
}

const SOLFEGGIO_LIST = [
  { hz: 174, name: 'Pain Relief & Anesthetic', desc: 'Relieves physical and energetic pain, relaxes organs' },
  { hz: 285, name: 'Tissue Regeneration', desc: 'Restores damaged tissues, accelerates wound healing' },
  { hz: 396, name: 'Liberation from Fear', desc: 'Releases deep guilt, defense mechanisms, and subconscious grief' },
  { hz: 417, name: 'Undoing Trauma & DNA Reset', desc: 'Clears negative emotional patterns from cellular memory' },
  { hz: 432, name: 'Cellular Homeostasis', desc: 'Universal harmonic alignment, lowers blood cortisol and pulse' },
  { hz: 528, name: 'DNA Repair & Miracle Tone', desc: 'The transformation frequency, repairs genetic integrity' },
  { hz: 639, name: 'Inter-Cellular Harmony', desc: 'Enhances cell-to-cell communication and immune synergy' },
  { hz: 741, name: 'Cellular Detox & Cleanse', desc: 'Flushes toxic debris, heavy metals, and abnormal cells' },
  { hz: 852, name: 'Subconscious Clarity', desc: 'Third-eye illumination, mental clarity, dissolving brain fog' },
  { hz: 963, name: 'Crown Bio-Photonic Infusion', desc: 'Awakens higher consciousness and infinite prana flow' }
];

export const MindHealingScreen: React.FC<MindHealingScreenProps> = ({
  theme,
  userProfile,
  onNavigate,
  onOpenAstrologerChat,
  initialTab = 'chamber'
}) => {
  const isDark = theme === 'dark';

  // Selected or generated protocol
  const [selectedProtocol, setSelectedProtocol] = useState<MindHealingProtocol>(MIND_HEALING_PROTOCOLS[0]);
  const [activeTab, setActiveTab] = useState<'chamber' | 'protocols' | 'sound_healing' | 'custom_ai' | 'science' | 'journal'>(initialTab);

  // Custom Illness AI Generator States
  const [customIllness, setCustomIllness] = useState('');
  const [customOrgan, setCustomOrgan] = useState('');
  const [customSeverity, setCustomSeverity] = useState(7);
  const [customEmotionalRoot, setCustomEmotionalRoot] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Live Audio States
  const [isHealingAudioPlaying, setIsHealingAudioPlaying] = useState(false);
  const [currentFreq, setCurrentFreq] = useState<number>(528);

  // Interactive Biofield Canvas Dissolution State
  const [dissolutionScore, setDissolutionScore] = useState<number>(20); // 0 to 100%
  const [isDissolving, setIsDissolving] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Vagus Nerve Breathing States
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [breathSecondsLeft, setBreathSecondsLeft] = useState<number>(4);
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);

  // Mantra Japa Counter
  const [japaCount, setJapaCount] = useState<number>(0);

  // Sankalpa Affirmation Repetition Counter
  const [affirmationCount, setAffirmationCount] = useState<number>(0);

  // Session Journal State
  const [painBefore, setPainBefore] = useState<number>(7);
  const [painAfter, setPainAfter] = useState<number>(3);
  const [sessionNotes, setSessionNotes] = useState<string>('');
  const [sessionLogs, setSessionLogs] = useState<MindHealingSessionLog[]>([]);

  // Load saved session logs
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kaalchakra_mind_healing_logs');
      if (saved) {
        setSessionLogs(JSON.parse(saved));
      }
    } catch {}
  }, []);

  // Sync audio status
  useEffect(() => {
    const unsub = cosmicAudio.subscribeHealing((isRunning, freq) => {
      setIsHealingAudioPlaying(isRunning);
      setCurrentFreq(freq);
    });
    return () => {
      unsub();
    };
  }, []);

  // Update frequency when selected protocol changes
  useEffect(() => {
    if (selectedProtocol) {
      setCurrentFreq(selectedProtocol.solfeggioHz);
      setDissolutionScore(25);
      setJapaCount(0);
      setAffirmationCount(0);
    }
  }, [selectedProtocol]);

  // Audio Toggle
  const toggleHealingAudio = (targetHz?: number) => {
    const freqToUse = targetHz || currentFreq || selectedProtocol.solfeggioHz || 528;
    if (isHealingAudioPlaying && (!targetHz || targetHz === currentFreq)) {
      audioManager.stopAll();
    } else {
      audioManager.playSolfeggio(freqToUse);
    }
  };

  // Vagus Nerve Breathing Loop
  useEffect(() => {
    if (!isBreathingActive) return;

    const r = selectedProtocol.pranayamaRhythm;
    let timer: NodeJS.Timeout;

    if (breathSecondsLeft > 1) {
      timer = setTimeout(() => {
        setBreathSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else {
      // Transition phase
      if (breathPhase === 'inhale') {
        setBreathPhase('hold');
        setBreathSecondsLeft(r.holdSec || 7);
        cosmicAudio.playVagusNerveBreatheTone('hold');
      } else if (breathPhase === 'hold') {
        setBreathPhase('exhale');
        setBreathSecondsLeft(r.exhaleSec || 8);
        cosmicAudio.playVagusNerveBreatheTone('exhale');
      } else if (breathPhase === 'exhale') {
        if (r.pauseSec && r.pauseSec > 0) {
          setBreathPhase('pause');
          setBreathSecondsLeft(r.pauseSec);
        } else {
          setBreathPhase('inhale');
          setBreathSecondsLeft(r.inhaleSec || 4);
          cosmicAudio.playVagusNerveBreatheTone('inhale');
        }
      } else {
        setBreathPhase('inhale');
        setBreathSecondsLeft(r.inhaleSec || 4);
        cosmicAudio.playVagusNerveBreatheTone('inhale');
      }
    }

    return () => clearTimeout(timer);
  }, [isBreathingActive, breathSecondsLeft, breathPhase, selectedProtocol]);

  // Interactive Biofield Canvas Animation & Laser Dissolution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      life: number;
    }> = [];

    const width = (canvas.width = canvas.offsetWidth || 340);
    const height = (canvas.height = canvas.offsetHeight || 380);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw subtle human biofield aura
      const auraGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        20,
        centerX,
        centerY,
        width * 0.45
      );
      auraGradient.addColorStop(0, `${selectedProtocol.chakraColor}33`);
      auraGradient.addColorStop(0.5, `${selectedProtocol.chakraColor}15`);
      auraGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, width * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // Draw stylized anatomical silhouette
      ctx.save();
      ctx.strokeStyle = isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(180, 140, 50, 0.5)';
      ctx.lineWidth = 2;
      ctx.shadowColor = selectedProtocol.chakraColor;
      ctx.shadowBlur = 10;

      // Head
      ctx.beginPath();
      ctx.arc(centerX, 70, 26, 0, Math.PI * 2);
      ctx.stroke();

      // Neck & Torso
      ctx.beginPath();
      ctx.moveTo(centerX, 96);
      ctx.lineTo(centerX, 220); // Spine
      ctx.stroke();

      // Shoulders & Chest
      ctx.beginPath();
      ctx.ellipse(centerX, 145, 45, 30, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Lower Abdomen & Pelvis
      ctx.beginPath();
      ctx.ellipse(centerX, 210, 36, 25, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Arms
      ctx.beginPath();
      ctx.moveTo(centerX - 42, 120);
      ctx.lineTo(centerX - 70, 190);
      ctx.moveTo(centerX + 42, 120);
      ctx.lineTo(centerX + 70, 190);
      ctx.stroke();

      // Legs
      ctx.beginPath();
      ctx.moveTo(centerX - 20, 230);
      ctx.lineTo(centerX - 35, 330);
      ctx.moveTo(centerX + 20, 230);
      ctx.lineTo(centerX + 35, 330);
      ctx.stroke();
      ctx.restore();

      // Draw Third Eye (Ajna) Laser Source
      ctx.save();
      ctx.fillStyle = '#A78BFA';
      ctx.shadowColor = '#C084FC';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(centerX, 65, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Target Diseased Organ Coordinates (based on chakra locus)
      let organY = 145; // default heart
      if (selectedProtocol.chakraLocus.toLowerCase().includes('solar') || selectedProtocol.chakraLocus.toLowerCase().includes('manipura')) {
        organY = 175;
      } else if (selectedProtocol.chakraLocus.toLowerCase().includes('root') || selectedProtocol.chakraLocus.toLowerCase().includes('muladhara')) {
        organY = 230;
      } else if (selectedProtocol.chakraLocus.toLowerCase().includes('throat') || selectedProtocol.chakraLocus.toLowerCase().includes('vishuddha')) {
        organY = 105;
      } else if (selectedProtocol.chakraLocus.toLowerCase().includes('third eye') || selectedProtocol.chakraLocus.toLowerCase().includes('ajna')) {
        organY = 65;
      }

      // Draw Disease Node / Dissolution State
      const diseaseIntensity = (100 - dissolutionScore) / 100;
      if (diseaseIntensity > 0.05) {
        ctx.save();
        ctx.fillStyle = `rgba(239, 68, 68, ${0.4 + diseaseIntensity * 0.5})`;
        ctx.shadowColor = '#EF4444';
        ctx.shadowBlur = 12 + Math.sin(Date.now() / 200) * 6;
        ctx.beginPath();
        ctx.arc(centerX, organY, 14 * diseaseIntensity + 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw Golden Healing Core
      ctx.save();
      ctx.fillStyle = selectedProtocol.chakraColor;
      ctx.shadowColor = selectedProtocol.chakraColor;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(centerX, organY, (dissolutionScore / 100) * 16 + 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // If Laser is firing / dissolving
      if (isDissolving) {
        ctx.save();
        ctx.strokeStyle = '#FDE047';
        ctx.lineWidth = 3 + Math.random() * 2;
        ctx.shadowColor = '#FACC15';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(centerX, 65);
        ctx.lineTo(centerX + (Math.random() - 0.5) * 4, organY);
        ctx.stroke();
        ctx.restore();

        // Spawn dissolution sparkles
        for (let i = 0; i < 3; i++) {
          particles.push({
            x: centerX + (Math.random() - 0.5) * 20,
            y: organY + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            radius: Math.random() * 3 + 1,
            color: Math.random() > 0.5 ? '#FDE047' : selectedProtocol.chakraColor,
            alpha: 1,
            life: 1
          });
        }
      }

      // Render & update particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.03;
        p.life -= 0.03;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.life <= 0) {
          particles.splice(idx, 1);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedProtocol, dissolutionScore, isDissolving, isDark]);

  // Handle Laser Dissolution Tap / Hold
  const handleDissolveStep = () => {
    setIsDissolving(true);
    cosmicAudio.playCellularDissolvePulse();

    setDissolutionScore((prev) => {
      const next = Math.min(100, prev + 15);
      if (next === 100 && prev < 100) {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
      return next;
    });

    setTimeout(() => {
      setIsDissolving(false);
    }, 400);
  };

  // Generate Custom Illness Healing Protocol via Gemini AI endpoint
  const handleGenerateCustomProtocol = async () => {
    if (!customIllness.trim()) return;
    setIsGeneratingAi(true);
    cosmicAudio.playCyberScan();

    try {
      const res = await fetch('/api/ai/mind-healing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          illnessName: customIllness,
          organAffected: customOrgan || 'Affected Organ & Micro-Vessels',
          severity: customSeverity,
          emotionalTrigger: customEmotionalRoot,
          userProfile: userProfile || { name: 'Seeker' }
        })
      });

      const data = await res.json();
      if (data.success && data.protocol) {
        const customProto: MindHealingProtocol = {
          id: `custom-${Date.now()}`,
          illnessName: data.protocol.illnessName || customIllness,
          sanskritName: data.protocol.sanskritName || 'Vyadhi Shamana Protocol',
          category: 'custom_universal',
          organAffected: data.protocol.organAffected || customOrgan || 'Target Organ',
          chakraLocus: data.protocol.chakraLocus || 'Anahata & Manipura',
          chakraColor: data.protocol.chakraColor || '#10B981',
          koshaLevel: data.protocol.koshaLevel || 'Manomaya (Mental/Emotional)',
          solfeggioHz: data.protocol.solfeggioHz || 528,
          solfeggioBenefit: data.protocol.solfeggioBenefit || '528 Hz DNA Repair and cellular harmonic homeostasis',
          rootPsychosomaticPattern: data.protocol.rootPsychosomaticPattern || 'Subconscious emotional block and bodily resistance.',
          epigeneticAffirmation: data.protocol.epigeneticAffirmation || 'My mind commands my body to return to divine balance and pristine health.',
          sanskritMantra: data.protocol.sanskritMantra || {
            deityOrRishi: 'Lord Dhanvantari',
            sanskrit: 'ॐ नमो भगवते धन्वन्तरये सर्वरोगनिवारणाय नमः॥',
            transliteration: 'Om Namo Bhagavate Dhanvantaraye Sarva-Roga-Nivaranaya Namah ||',
            meaning: 'Salutations to the Supreme Healer Dhanvantari who eliminates all disease.',
            japaCount: 11
          },
          visualizationSteps: data.protocol.visualizationSteps || [],
          pranayamaRhythm: data.protocol.pranayamaRhythm || {
            technique: '4-7-8 Parasympathetic Vagal Reset',
            inhaleSec: 4,
            holdSec: 7,
            exhaleSec: 8,
            pauseSec: 2,
            description: 'Inhale 4s, Hold 7s, Exhale 8s to trigger the cholinergic anti-inflammatory reflex.'
          },
          vagusNerveProtocol: data.protocol.vagusNerveProtocol || 'Inhibits inflammatory cytokines via the Vagus nerve cholinergic anti-inflammatory pathway.',
          mindControlKey: data.protocol.mindControlKey || 'The body is the obedient mirror of the mind. Flood your cells with love and light.'
        };

        setSelectedProtocol(customProto);
        setActiveTab('chamber');
        confetti({ particleCount: 50, spread: 70 });
      }
    } catch (e) {
      console.error('Failed to generate AI mind healing protocol:', e);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Save Session to Journal
  const handleSaveSession = () => {
    cosmicAudio.playTone(528, 0.15);
    const newLog: MindHealingSessionLog = {
      id: `log-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      illnessName: selectedProtocol.illnessName,
      durationMinutes: 15,
      painBefore: painBefore,
      painAfter: painAfter,
      mentalCoherenceScore: Math.min(100, dissolutionScore + 10),
      notes: sessionNotes || `Completed ${japaCount} Japa repetitions & ${affirmationCount} Epigenetic commands.`
    };

    const updated = [newLog, ...sessionLogs];
    setSessionLogs(updated);
    localStorage.setItem('kaalchakra_mind_healing_logs', JSON.stringify(updated));

    confetti({ particleCount: 40, spread: 60 });
    alert('✨ Mind-Healing session successfully recorded in your Cellular Recovery Journal!');
    setSessionNotes('');
  };

  return (
    <div
      className={`min-h-screen py-6 px-3 sm:px-6 lg:px-8 transition-colors duration-300 relative z-10 ${
        isDark ? 'bg-[#0a0a0f] text-gray-100' : 'bg-[#faf7ee] text-[#2c1d0b]'
      }`}
    >
      {/* Light Theme Photo Background for Mind Healing */}
      {!isDark && (
        <div 
          className="fixed inset-0 z-[-1] opacity-20 mix-blend-multiply bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517482811467-f470559e28be?q=80&w=2000&auto=format&fit=crop')` }} // Monk/Tranquil water
        />
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ========================================================================= */}
        {/* HEADER & HERO BANNER */}
        {/* ========================================================================= */}
        <div
          className={`relative rounded-3xl p-6 sm:p-8 border overflow-hidden shadow-2xl transition-all ${
            isDark
              ? 'bg-gradient-to-br from-[#12111d] via-[#1a172e] to-[#0d0d14] border-amber-500/30'
              : 'bg-gradient-to-br from-[#fdfbf5] via-[#f7f0df] to-[#eedfbd] border-amber-600/40'
          }`}
        >
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-cinzel font-semibold tracking-wider uppercase border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
                <Brain className="w-3.5 h-3.5" />
                <span>Chitta Rog Mukti • Yogic Psychosomatics & Epigenetics</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-cinzel font-bold tracking-wide">
                Mind-Over-Illness:{' '}
                <span className="bg-gradient-to-r from-amber-300 via-emerald-400 to-amber-200 bg-clip-text text-transparent">
                  Cellular Self-Healing Matrix
                </span>
              </h1>

              <p className="text-sm sm:text-base opacity-90 leading-relaxed font-serif">
                Harness the supreme power of your conscious mind (*Manomaya Kosha*), 
                epigenetic neuroplasticity, vagus nerve cholinergic anti-inflammatory pathways, 
                and sacred Vedic sound resonance to <strong>eliminate any disease, pain, or cellular imbalance directly from your body</strong>.
              </p>

              {/* Sanskrit Axiom Quote */}
              <div className="pt-1 text-xs italic font-serif opacity-80 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>
                  &ldquo;मन एव मनुष्याणां कारणं बन्धमोक्षयोः — The Mind alone is the sovereign creator of illness and supreme master of healing.&rdquo;
                </span>
              </div>
            </div>

            {/* Quick Launch / Audio Master Pill */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
              <button
                id="toggle-master-healing-audio"
                onClick={() => toggleHealingAudio()}
                className={`px-5 py-3 rounded-2xl border text-xs sm:text-sm font-cinzel font-bold flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg ${
                  isHealingAudioPlaying
                    ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] animate-pulse'
                    : isDark
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25'
                    : 'bg-amber-600 text-white border-amber-700 hover:bg-amber-700'
                }`}
              >
                {isHealingAudioPlaying ? (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>Solfeggio Active ({currentFreq} Hz)</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>Start Healing Waves ({selectedProtocol.solfeggioHz} Hz)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onNavigate('memory-hypnosis')}
                className="px-5 py-2.5 rounded-2xl border text-xs sm:text-sm font-cinzel font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer shadow-lg bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border-cyan-400/50 text-cyan-300"
              >
                <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                <span>Memory Healing Hypnosis (सम्मोहन)</span>
              </button>

              <button
                id="tab-sound-healing-btn"
                onClick={() => setActiveTab('sound_healing')}
                className={`px-5 py-2.5 rounded-2xl border text-xs sm:text-sm font-cinzel font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer shadow-lg ${
                  activeTab === 'sound_healing'
                    ? 'bg-amber-500 text-black border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                    : 'bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 border-amber-400/50 text-amber-300'
                }`}
              >
                <TibetanBowl3DIcon size={20} interactive={false} showGlow={false} ringing={activeTab === 'sound_healing'} />
                <span>Buddhist & Sound Healing Suite</span>
              </button>

              <button
                onClick={() => setActiveTab('custom_ai')}
                className={`px-5 py-2.5 rounded-2xl border text-xs sm:text-sm font-cinzel font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isDark
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200'
                    : 'bg-white border-amber-300 hover:bg-amber-50 text-amber-900 shadow-sm'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Enter Any Custom Illness (AI)</span>
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 pt-6 mt-6 border-t border-amber-500/20 overflow-x-auto">
            {[
              { id: 'chamber', label: 'Active Healing Chamber', icon: <Heart className="w-4 h-4" /> },
              { id: 'sound_healing', label: 'Sound Healing & Cymatics (नाद योग)', icon: <TibetanBowl3DIcon size={16} interactive={false} showGlow={false} ringing={activeTab === 'sound_healing'} /> },
              { id: 'protocols', label: 'Illness Blueprints (28+)', icon: <Layers className="w-4 h-4" /> },
              { id: 'custom_ai', label: 'Custom Disease AI Healer', icon: <Zap className="w-4 h-4" /> },
              { id: 'science', label: 'Epigenetic & Vedic Science', icon: <Dna className="w-4 h-4" /> },
              { id: 'journal', label: 'Recovery Log & Prescription', icon: <Activity className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  cosmicAudio.playTone(432, 0.05);
                  setActiveTab(tab.id as any);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-cinzel font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? isDark
                      ? 'bg-amber-500/20 border border-amber-400/60 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                      : 'bg-amber-200 border border-amber-600/50 text-amber-950 font-bold shadow-sm'
                    : isDark
                    ? 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                    : 'text-amber-800/80 hover:text-amber-950 hover:bg-amber-100/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 2: BUDDHIST & SACRED SOUND HEALING SUITE & CYMATICS EEG */}
        {/* ========================================================================= */}
        {activeTab === 'sound_healing' && (
          <div className="space-y-6">
            <SoundHealingSuite
              theme={theme}
              userProfile={userProfile}
              onNavigate={onNavigate}
              onOpenAstrologerChat={onOpenAstrologerChat}
            />
          </div>
        )}
        {/* ========================================================================= */}
        {activeTab === 'chamber' && (
          <div className="space-y-8">
            
            {/* Protocol Summary Header Banner */}
            <div
              className={`p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                isDark ? 'bg-[#11101a] border-amber-500/20' : 'bg-white border-amber-300 shadow-sm'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-cinzel uppercase tracking-wider text-amber-400 font-semibold">
                    Target Protocol:
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-[11px] font-semibold"
                    style={{ backgroundColor: `${selectedProtocol.chakraColor}22`, color: selectedProtocol.chakraColor }}
                  >
                    {selectedProtocol.chakraLocus}
                  </span>
                  <span className="text-xs opacity-60">|</span>
                  <span className="text-xs opacity-80">{selectedProtocol.koshaLevel}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-amber-300">
                  {selectedProtocol.illnessName}
                </h2>
                <p className="text-xs italic opacity-80 font-serif">
                  {selectedProtocol.sanskritName} • Target: {selectedProtocol.organAffected}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setActiveTab('protocols')}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-cinzel font-semibold transition-all cursor-pointer ${
                    isDark ? 'border-white/10 hover:bg-white/5' : 'border-amber-400 bg-amber-50 hover:bg-amber-100'
                  }`}
                >
                  Change Illness
                </button>
                <button
                  onClick={() => toggleHealingAudio(selectedProtocol.solfeggioHz)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-cinzel font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isHealingAudioPlaying && currentFreq === selectedProtocol.solfeggioHz
                      ? 'bg-emerald-500 text-black shadow-md'
                      : 'bg-amber-500 hover:bg-amber-400 text-black font-semibold'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{selectedProtocol.solfeggioHz} Hz Sine</span>
                </button>
              </div>
            </div>

            {/* 2-Column Core Interface: Biofield Canvas & Step-by-Step Mind Control Protocol */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* LEFT COL (5 cols): Interactive Biofield Laser Dissolution & Vagus Breathing */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Interactive Biofield Canvas Card */}
                <div
                  className={`p-5 rounded-3xl border relative transition-all ${
                    isDark ? 'bg-[#11101a] border-amber-500/30' : 'bg-white border-amber-300 shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <h3 className="font-cinzel font-bold text-sm">Bio-Photonic Cellular Laser</h3>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 font-cinzel">
                      {dissolutionScore}% Healed
                    </span>
                  </div>

                  <p className="text-xs opacity-75 mb-3 font-serif">
                    Focus your Third Eye (Ajna) onto the glowing disease marker in the{' '}
                    <strong className="text-amber-300">{selectedProtocol.organAffected}</strong>. Tap or hold the button to project coherent light photons that dissolve abnormal cellular tension!
                  </p>

                  {/* Canvas Container */}
                  <div className="relative w-full h-80 rounded-2xl bg-black/40 border border-amber-500/20 overflow-hidden flex items-center justify-center">
                    <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" onClick={handleDissolveStep} />

                    {/* Overlay Instruction Badge */}
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-amber-300 border border-amber-500/30 pointer-events-none">
                      Laser Power: {selectedProtocol.solfeggioHz}Hz
                    </div>
                  </div>

                  {/* Action Laser Trigger */}
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      id="biofield-laser-trigger"
                      onMouseDown={handleDissolveStep}
                      onClick={handleDissolveStep}
                      className={`flex-1 py-3 rounded-2xl font-cinzel font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isDissolving
                          ? 'bg-amber-400 text-black scale-95 shadow-[0_0_25px_rgba(251,191,36,0.6)]'
                          : 'bg-gradient-to-r from-amber-500 to-emerald-500 text-black hover:brightness-110 shadow-lg'
                      }`}
                    >
                      <Zap className="w-4 h-4 fill-black" />
                      <span>Project Mind Laser (Dissolve Disease)</span>
                    </button>

                    <button
                      onClick={() => {
                        setDissolutionScore(20);
                        cosmicAudio.playTone(285, 0.1);
                      }}
                      title="Reset Biofield Simulation"
                      className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                        isDark ? 'border-white/10 hover:bg-white/10' : 'border-amber-300 hover:bg-amber-100'
                      }`}
                    >
                      <RotateCcw className="w-4 h-4 opacity-70" />
                    </button>
                  </div>

                  {/* Cellular Regeneration Progress Bar */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex justify-between text-[11px] font-cinzel">
                      <span className="opacity-75">Tissues Cleansed & Repaired:</span>
                      <span className="font-bold text-emerald-400">{dissolutionScore}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-black/40 overflow-hidden border border-white/10">
                      <div
                        className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-amber-500 via-emerald-400 to-cyan-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                        style={{ width: `${dissolutionScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Vagus Nerve Parasympathetic Breathing Pacer */}
                <div
                  className={`p-5 rounded-3xl border transition-all ${
                    isDark ? 'bg-[#11101a] border-amber-500/30' : 'bg-white border-amber-300 shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400" />
                      <h3 className="font-cinzel font-bold text-sm">Vagus Nerve Anti-Inflammatory Pacer</h3>
                    </div>
                    <button
                      onClick={() => setIsBreathingActive(!isBreathingActive)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer ${
                        isBreathingActive
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                      }`}
                    >
                      {isBreathingActive ? 'Pause Breath' : 'Start Pacer'}
                    </button>
                  </div>

                  <p className="text-xs opacity-75 mb-4 font-serif">
                    Technique: <strong>{selectedProtocol.pranayamaRhythm.technique}</strong>. Directs acetylcholine release to halt cellular cytokine inflammation.
                  </p>

                  {/* Pulsating Visual Breath Orb */}
                  <div className="flex flex-col items-center justify-center py-4 relative">
                    <div
                      className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-1000 border-2 shadow-2xl ${
                        breathPhase === 'inhale'
                          ? 'scale-110 border-emerald-400 bg-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                          : breathPhase === 'hold'
                          ? 'scale-110 border-amber-400 bg-amber-500/25 shadow-[0_0_35px_rgba(245,158,11,0.5)]'
                          : breathPhase === 'exhale'
                          ? 'scale-90 border-cyan-400 bg-cyan-500/15 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                          : 'scale-95 border-gray-400 bg-gray-500/10'
                      }`}
                    >
                      <span className="text-xs font-cinzel uppercase tracking-widest font-bold opacity-80">
                        {breathPhase}
                      </span>
                      <span className="text-2xl font-cinzel font-extrabold text-amber-300">
                        {breathSecondsLeft}s
                      </span>
                    </div>

                    <span className="mt-3 text-[11px] font-mono opacity-70">
                      Inhale {selectedProtocol.pranayamaRhythm.inhaleSec}s • Hold {selectedProtocol.pranayamaRhythm.holdSec}s • Exhale {selectedProtocol.pranayamaRhythm.exhaleSec}s
                    </span>
                  </div>
                </div>

              </div>

              {/* RIGHT COL (7 cols): Epigenetic Affirmation, Sanskrit Mantra, Mind Keys & Visualization Steps */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Subconscious Epigenetic Mind Command (Sankalpa) */}
                <div
                  className={`p-6 rounded-3xl border relative transition-all ${
                    isDark
                      ? 'bg-gradient-to-br from-[#181629] to-[#100f1c] border-amber-500/40 shadow-xl'
                      : 'bg-gradient-to-br from-[#fffdfa] to-[#f9f3e5] border-amber-400 shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-cinzel uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                      <Brain className="w-4 h-4" />
                      <span>Subconscious Epigenetic Command (Sankalpa)</span>
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Repeated: {affirmationCount}/21
                    </span>
                  </div>

                  <blockquote className="text-base sm:text-lg font-serif italic text-amber-200 leading-relaxed pl-3 border-l-4 border-amber-400 my-3">
                    &ldquo;{selectedProtocol.epigeneticAffirmation}&rdquo;
                  </blockquote>

                  <p className="text-xs opacity-75 font-serif mb-4">
                    <strong>Mind Control Law:</strong> Repeat this mental command with absolute conviction 21 times. The subconscious mind directly instructs your DNA expression.
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      id="affirmation-pulse-btn"
                      onClick={() => {
                        cosmicAudio.playTone(528, 0.08);
                        setAffirmationCount((prev) => {
                          const next = prev + 1;
                          if (next === 21) {
                            confetti({ particleCount: 40, spread: 60 });
                          }
                          return next;
                        });
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-cinzel font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Lock Command ({affirmationCount + 1})</span>
                    </button>

                    <button
                      onClick={() => setAffirmationCount(0)}
                      className={`px-3 py-2 rounded-xl border text-xs transition-all cursor-pointer ${
                        isDark ? 'border-white/10 hover:bg-white/5' : 'border-amber-300 hover:bg-amber-100'
                      }`}
                    >
                      Reset Count
                    </button>
                  </div>
                </div>

                {/* 2. Sanskrit Rog Mukti Mantra & Japa Counter */}
                <div
                  className={`p-6 rounded-3xl border transition-all ${
                    isDark ? 'bg-[#11101a] border-amber-500/30' : 'bg-white border-amber-300 shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <h3 className="font-cinzel font-bold text-sm">
                        Sacred Rog Mukti Mantra ({selectedProtocol.sanskritMantra.deityOrRishi})
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                      Japa: {japaCount}/{selectedProtocol.sanskritMantra.japaCount}
                    </span>
                  </div>

                  {/* Sanskrit Box */}
                  <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-center space-y-2 mb-3">
                    <p className="text-base sm:text-lg font-serif font-bold text-amber-300 tracking-wide leading-relaxed">
                      {selectedProtocol.sanskritMantra.sanskrit}
                    </p>
                    <p className="text-xs font-mono opacity-80 tracking-wider">
                      {selectedProtocol.sanskritMantra.transliteration}
                    </p>
                  </div>

                  <p className="text-xs italic opacity-85 font-serif mb-4">
                    <strong>Meaning:</strong> {selectedProtocol.sanskritMantra.meaning}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      id="mantra-japa-btn"
                      onClick={() => {
                        cosmicAudio.playTone(639, 0.08);
                        setJapaCount((prev) => {
                          const next = prev + 1;
                          if (next === selectedProtocol.sanskritMantra.japaCount) {
                            confetti({ particleCount: 50, spread: 70 });
                          }
                          return next;
                        });
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-cinzel font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Count 1 Japa Bead ({japaCount})</span>
                    </button>

                    <button
                      onClick={() => setJapaCount(0)}
                      className={`px-3 py-2 rounded-xl border text-xs transition-all cursor-pointer ${
                        isDark ? 'border-white/10 hover:bg-white/5' : 'border-amber-300 hover:bg-amber-100'
                      }`}
                    >
                      Reset Beads
                    </button>
                  </div>
                </div>

                {/* 3. Step-by-Step Guided Quantum Cellular Visualization */}
                <div
                  className={`p-6 rounded-3xl border transition-all ${
                    isDark ? 'bg-[#11101a] border-amber-500/30' : 'bg-white border-amber-300 shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-cinzel font-bold text-sm">
                      3-Phase Quantum Cellular Visualization Protocol
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {selectedProtocol.visualizationSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border transition-all ${
                          isDark ? 'bg-black/30 border-white/10' : 'bg-amber-50/50 border-amber-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-cinzel font-bold text-amber-400">
                            {step.phase}: {step.title}
                          </span>
                          <span className="text-[10px] font-mono opacity-60">Step {idx + 1}/3</span>
                        </div>
                        <p className="text-xs sm:text-sm font-serif leading-relaxed mb-2 opacity-90">
                          {step.instruction}
                        </p>
                        <div className="flex items-start gap-1.5 text-[11px] italic text-emerald-400/90 font-serif">
                          <Sparkles className="w-3 h-3 flex-shrink-0 mt-0.5" />
                          <span><strong>Target Visual:</strong> {step.targetVisual}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Root Psychosomatic Decoupling & Mind Control Key */}
                <div
                  className={`p-5 rounded-2xl border space-y-3 transition-all ${
                    isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-100/50 border-amber-300'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-xs font-cinzel font-bold text-amber-300">
                        Subconscious Root-Cause Decoupling
                      </h4>
                      <p className="text-xs font-serif opacity-85 leading-relaxed">
                        {selectedProtocol.rootPsychosomaticPattern}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-amber-500/20 text-xs font-serif text-amber-200">
                    <strong>The Mind Mastery Key:</strong> {selectedProtocol.mindControlKey}
                  </div>
                </div>

              </div>

            </div>

            {/* Solfeggio Harmonic Selector Bar */}
            <div
              className={`p-5 rounded-3xl border transition-all ${
                isDark ? 'bg-[#11101a] border-amber-500/20' : 'bg-white border-amber-300 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <h3 className="font-cinzel font-bold text-sm">
                    Select Solfeggio Healing Frequency Generator
                  </h3>
                </div>
                <span className="text-xs opacity-75">
                  Currently playing: <strong>{currentFreq} Hz</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {SOLFEGGIO_LIST.map((item) => {
                  const isCurrent = currentFreq === item.hz && isHealingAudioPlaying;
                  return (
                    <button
                      key={item.hz}
                      onClick={() => toggleHealingAudio(item.hz)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : isDark
                          ? 'bg-black/30 border-white/10 hover:border-amber-400/50 text-gray-300'
                          : 'bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-950'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-cinzel font-bold text-amber-400">{item.hz} Hz</span>
                        {isCurrent && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
                      </div>
                      <div className="text-[11px] font-semibold truncate">{item.name}</div>
                      <div className="text-[10px] opacity-70 line-clamp-2 mt-0.5 font-serif">{item.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PRE-CONFIGURED ILLNESS BLUEPRINTS (28+ CATEGORIES) */}
        {/* ========================================================================= */}
        {activeTab === 'protocols' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-amber-300">
                  Pre-Configured Mind-Healing Blueprints
                </h2>
                <p className="text-xs sm:text-sm opacity-80 font-serif">
                  Select any illness to instantly load its specific chakra locus, bio-photonic visualization, and Solfeggio resonance.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('custom_ai')}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-cinzel font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Zap className="w-3.5 h-3.5 fill-black" />
                <span>Custom Illness AI Healer</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MIND_HEALING_PROTOCOLS.map((proto) => {
                const isSelected = selectedProtocol.id === proto.id;
                return (
                  <div
                    key={proto.id}
                    className={`p-5 rounded-3xl border transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-amber-500/15 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)] scale-[1.02]'
                          : 'bg-amber-100 border-amber-600 shadow-md scale-[1.02]'
                        : isDark
                        ? 'bg-[#11101a] border-white/10 hover:border-amber-500/40 hover:bg-[#161424]'
                        : 'bg-white border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                    }`}
                    onClick={() => {
                      cosmicAudio.playTone(proto.solfeggioHz, 0.08);
                      setSelectedProtocol(proto);
                      setActiveTab('chamber');
                    }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-cinzel font-semibold"
                          style={{ backgroundColor: `${proto.chakraColor}22`, color: proto.chakraColor }}
                        >
                          {proto.chakraLocus}
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-400">{proto.solfeggioHz} Hz</span>
                      </div>

                      <div>
                        <h3 className="font-cinzel font-bold text-base text-amber-300">{proto.illnessName}</h3>
                        <p className="text-xs font-serif italic opacity-75">{proto.sanskritName}</p>
                      </div>

                      <p className="text-xs font-serif opacity-85 line-clamp-2">
                        <strong>Organ:</strong> {proto.organAffected}
                      </p>

                      <div className="p-2.5 rounded-xl bg-black/20 text-[11px] font-serif italic text-amber-200/90 line-clamp-2">
                        &ldquo;{proto.epigeneticAffirmation}&rdquo;
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs font-cinzel font-bold text-amber-400">
                      <span>Activate Protocol</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: CUSTOM ANY-ILLNESS AI HEALER */}
        {/* ========================================================================= */}
        {activeTab === 'custom_ai' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div
              className={`p-6 sm:p-8 rounded-3xl border shadow-xl transition-all ${
                isDark ? 'bg-[#12111e] border-amber-500/40' : 'bg-white border-amber-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-amber-300">
                    Universal Illness Elimination Engine
                  </h2>
                  <p className="text-xs sm:text-sm opacity-80 font-serif">
                    Enter ANY disease, chronic condition, organ pain, or symptom to generate an epigenetic & Vedic Mind-Healing protocol.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-amber-500/20">
                {/* Illness Name */}
                <div>
                  <label className="block text-xs font-cinzel font-bold uppercase tracking-wider mb-1.5 text-amber-400">
                    1. Exact Illness or Symptom:
                  </label>
                  <input
                    type="text"
                    value={customIllness}
                    onChange={(e) => setCustomIllness(e.target.value)}
                    placeholder="e.g. Fatty Liver Grade 2, Parkinson's Tremors, Chronic Tinnitus, Sciatica Nerve Pain..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none ${
                      isDark
                        ? 'bg-black/40 border-amber-500/30 focus:border-amber-400 text-white'
                        : 'bg-amber-50/50 border-amber-300 focus:border-amber-500 text-black'
                    }`}
                  />
                </div>

                {/* Organ Affected */}
                <div>
                  <label className="block text-xs font-cinzel font-bold uppercase tracking-wider mb-1.5 text-amber-400">
                    2. Affected Body Part / Organ System:
                  </label>
                  <input
                    type="text"
                    value={customOrgan}
                    onChange={(e) => setCustomOrgan(e.target.value)}
                    placeholder="e.g. Liver, Inner Ear Cilia, Lumbar Spine L4-L5, Pancreas..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none ${
                      isDark
                        ? 'bg-black/40 border-amber-500/30 focus:border-amber-400 text-white'
                        : 'bg-amber-50/50 border-amber-300 focus:border-amber-500 text-black'
                    }`}
                  />
                </div>

                {/* Severity Level Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-cinzel font-bold uppercase tracking-wider text-amber-400">
                      3. Current Discomfort / Severity Level (1 to 10):
                    </label>
                    <span className="text-sm font-mono font-bold text-amber-300">{customSeverity}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={customSeverity}
                    onChange={(e) => setCustomSeverity(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                {/* Emotional / Stress Context */}
                <div>
                  <label className="block text-xs font-cinzel font-bold uppercase tracking-wider mb-1.5 text-amber-400">
                    4. Underlying Emotional State or Stress Trigger (Optional):
                  </label>
                  <input
                    type="text"
                    value={customEmotionalRoot}
                    onChange={(e) => setCustomEmotionalRoot(e.target.value)}
                    placeholder="e.g. Chronic work burnout, unexpressed grief, fear of losing control, relationship friction..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none ${
                      isDark
                        ? 'bg-black/40 border-amber-500/30 focus:border-amber-400 text-white'
                        : 'bg-amber-50/50 border-amber-300 focus:border-amber-500 text-black'
                    }`}
                  />
                </div>

                {/* Generate Button */}
                <button
                  id="generate-custom-mind-protocol-btn"
                  onClick={handleGenerateCustomProtocol}
                  disabled={!customIllness.trim() || isGeneratingAi}
                  className={`w-full py-3.5 rounded-2xl font-cinzel font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    !customIllness.trim() || isGeneratingAi
                      ? 'opacity-50 cursor-not-allowed bg-gray-600 text-gray-300'
                      : 'bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-500 text-black hover:brightness-110 shadow-lg'
                  }`}
                >
                  {isGeneratingAi ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Cellular Reprogramming Protocol...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-black" />
                      <span>Generate Mind-Healing Protocol (AI)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: VEDIC & EPIGENETIC SCIENCE FOUNDATION */}
        {/* ========================================================================= */}
        {activeTab === 'science' && (
          <div className="space-y-6">
            <div
              className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                isDark ? 'bg-[#12111e] border-amber-500/30' : 'bg-white border-amber-300 shadow-md'
              }`}
            >
              <div className="max-w-3xl space-y-2 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-cinzel font-semibold uppercase border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
                  <Dna className="w-3.5 h-3.5" />
                  <span>The Scientific & Spiritual Proof</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-cinzel font-bold text-amber-300">
                  {VEDIC_MIND_BODY_SCIENCE.title}
                </h2>
                <p className="text-sm font-serif italic text-amber-200">
                  &ldquo;{VEDIC_MIND_BODY_SCIENCE.sanskritPrinciple}&rdquo; — {VEDIC_MIND_BODY_SCIENCE.translation}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {VEDIC_MIND_BODY_SCIENCE.foundations.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border space-y-2 ${
                      isDark ? 'bg-black/30 border-white/10' : 'bg-amber-50/70 border-amber-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <h3 className="font-cinzel font-bold text-sm sm:text-base text-amber-300">{item.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm font-serif opacity-85 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: RECOVERY JOURNAL & CLINICAL PRESCRIPTION */}
        {/* ========================================================================= */}
        {activeTab === 'journal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Col (5 cols): Log a Session */}
            <div className="lg:col-span-5 space-y-6">
              <div
                className={`p-6 rounded-3xl border space-y-4 transition-all ${
                  isDark ? 'bg-[#11101a] border-amber-500/30' : 'bg-white border-amber-300 shadow-md'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-cinzel font-bold text-base text-amber-300">Log Mind Healing Session</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-cinzel font-semibold mb-1 opacity-80">
                      Illness Addressed:
                    </label>
                    <input
                      type="text"
                      disabled
                      value={selectedProtocol.illnessName}
                      className="w-full px-3 py-2 rounded-xl bg-black/20 border border-white/10 text-xs font-mono opacity-80"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-cinzel font-semibold mb-1 text-red-400">
                        Pain Before (1-10):
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={painBefore}
                        onChange={(e) => setPainBefore(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border text-xs text-center font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-cinzel font-semibold mb-1 text-emerald-400">
                        Pain After (1-10):
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={painAfter}
                        onChange={(e) => setPainAfter(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border text-xs text-center font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel font-semibold mb-1 opacity-80">
                      Reflections & Somatic Sensations:
                    </label>
                    <textarea
                      rows={3}
                      value={sessionNotes}
                      onChange={(e) => setSessionNotes(e.target.value)}
                      placeholder="e.g. Sensed deep warmth in the heart, pain decreased from 8 to 2, feeling immense lightness and peace..."
                      className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                        isDark ? 'bg-black/30 border-white/10' : 'bg-amber-50 border-amber-200'
                      }`}
                    />
                  </div>

                  <button
                    onClick={handleSaveSession}
                    className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-cinzel font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Award className="w-4 h-4" />
                    <span>Save Session to Cellular Journal</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Col (7 cols): Session History & Printable Card */}
            <div className="lg:col-span-7 space-y-6">
              <div
                className={`p-6 rounded-3xl border transition-all ${
                  isDark ? 'bg-[#11101a] border-amber-500/30' : 'bg-white border-amber-300 shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <h3 className="font-cinzel font-bold text-base text-amber-300">
                      Cellular Recovery Trajectory ({sessionLogs.length} Sessions)
                    </h3>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-xl border text-xs font-cinzel font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-white/5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Protocol</span>
                  </button>
                </div>

                {sessionLogs.length === 0 ? (
                  <div className="py-12 text-center space-y-2 opacity-60">
                    <Activity className="w-8 h-8 mx-auto" />
                    <p className="text-xs font-serif">No sessions logged yet. Complete your first Mind-Healing session today!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sessionLogs.map((log) => (
                      <div
                        key={log.id}
                        className={`p-4 rounded-2xl border space-y-2 ${
                          isDark ? 'bg-black/30 border-white/10' : 'bg-amber-50/60 border-amber-200'
                        }`}
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="font-cinzel font-bold text-xs text-amber-300">{log.illnessName}</span>
                          <span className="text-[10px] font-mono opacity-60">{log.date}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-serif">
                          <span>
                            Pain: <span className="text-red-400 font-bold">{log.painBefore}/10</span> ➔{' '}
                            <span className="text-emerald-400 font-bold">{log.painAfter}/10</span>
                          </span>
                          <span>
                            Coherence: <span className="text-amber-400 font-bold">{log.mentalCoherenceScore}%</span>
                          </span>
                        </div>
                        {log.notes && <p className="text-xs italic opacity-80 font-serif">&ldquo;{log.notes}&rdquo;</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
