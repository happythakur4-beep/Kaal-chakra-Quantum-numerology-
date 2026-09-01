import React, { useEffect, useRef, useState } from 'react';
import { ThemeMode } from '../../types';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { audioManager } from '../../utils/audioStateManager';
import { Sparkles, Play, Pause, Waves, Brain, Activity, Volume2, ShieldCheck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CymaticsBrainVisualizerProps {
  theme: ThemeMode;
  initialFrequency?: number;
  showControls?: boolean;
}

export const CymaticsBrainVisualizer: React.FC<CymaticsBrainVisualizerProps> = ({
  theme,
  initialFrequency = 432,
  showControls = true
}) => {
  const isDark = theme === 'dark';
  const waterCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const brainCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activeFrequency, setActiveFrequency] = useState<number>(initialFrequency);
  const [activeMantraMode, setActiveMantraMode] = useState<'om' | 'medicine' | '528' | '432' | 'bowl' | 'theta'>('om');
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);
  const [coherenceScore, setCoherenceScore] = useState<number>(94);
  const [eegPhase, setEegPhase] = useState<'theta' | 'alpha' | 'gamma'>('theta');

  // Trigger preset sound
  const handlePlaySound = (mode: 'om' | 'medicine' | '528' | '432' | 'bowl' | 'theta') => {
    setActiveMantraMode(mode);
    setIsPlayingSound(true);

    if (mode === 'om') {
      setActiveFrequency(432);
      setEegPhase('alpha');
      setCoherenceScore(96);
      cosmicAudio.playOmManiPadmeHum(12.0);
    } else if (mode === 'medicine') {
      setActiveFrequency(528);
      setEegPhase('theta');
      setCoherenceScore(98);
      cosmicAudio.playMedicineBuddhaMantraChant(16.0);
    } else if (mode === '528') {
      setActiveFrequency(528);
      setEegPhase('gamma');
      setCoherenceScore(95);
      audioManager.playSolfeggio(528, 5.0);
    } else if (mode === '432') {
      setActiveFrequency(432);
      setEegPhase('alpha');
      setCoherenceScore(97);
      cosmicAudio.playTibetanBowl(432, 7.0, 0.9);
    } else if (mode === 'bowl') {
      setActiveFrequency(256);
      setEegPhase('theta');
      setCoherenceScore(99);
      audioManager.playSingingBowlRim(256);
    } else if (mode === 'theta') {
      setActiveFrequency(216);
      setEegPhase('theta');
      setCoherenceScore(94);
      audioManager.playBinaural(216, 'theta', 'binaural');
    }
  };

  const handleStopSound = () => {
    setIsPlayingSound(false);
    audioManager.stopAll();
  };

  // 1. Water Cymatics Canvas Renderer (Inspired by the water dish in the video)
  useEffect(() => {
    const canvas = waterCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += isPlayingSound ? 0.045 : 0.015;
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = width / 2 - 16;

      ctx.clearRect(0, 0, width, height);

      // Dark ultraviolet / indigo fluid container background
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, maxRadius + 10);
      bgGrad.addColorStop(0, '#0d0b24');
      bgGrad.addColorStop(0.6, '#060515');
      bgGrad.addColorStop(1, '#020208');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Outer illuminated rim / dish border (Glowing violet LED circle)
      ctx.save();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.7)';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = isPlayingSound ? 20 : 10;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Dish edge reflection ring
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius - 6, 0, Math.PI * 2);
      ctx.stroke();

      // Number of symmetrical lotus petals derived from active frequency
      const petals = activeFrequency === 432 ? 8 : activeFrequency === 528 ? 12 : activeFrequency === 256 ? 6 : 8;

      // Dynamic Faraday standing wave concentric rings
      const ringSteps = [0.25, 0.42, 0.58, 0.74, 0.88];
      ringSteps.forEach((stepFrac, ringIdx) => {
        const baseR = maxRadius * stepFrac;
        ctx.beginPath();
        const pts = 120;
        for (let i = 0; i <= pts; i++) {
          const angle = (i / pts) * Math.PI * 2;
          const harmonic = Math.sin(angle * petals + time * 1.5 + ringIdx) * Math.cos(time * 0.8 - ringIdx);
          const rMod = baseR + harmonic * (isPlayingSound ? 6 : 2.5);
          const x = centerX + Math.cos(angle) * rMod;
          const y = centerY + Math.sin(angle) * rMod;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(192, 132, 252, ${0.35 + ringIdx * 0.1})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      });

      // Concentric bright water droplet beads (as seen in the video)
      const beadCount = petals * 3;
      const beadRadius = maxRadius * 0.38 + Math.sin(time * 2) * (isPlayingSound ? 4 : 1.5);
      for (let b = 0; b < beadCount; b++) {
        const beadAngle = (b / beadCount) * Math.PI * 2 + time * 0.2;
        const bx = centerX + Math.cos(beadAngle) * beadRadius;
        const by = centerY + Math.sin(beadAngle) * beadRadius;

        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#e879f9';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(bx, by, isPlayingSound ? 3.8 : 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Secondary inner bead ring
      const innerBeads = petals * 2;
      const innerBeadR = maxRadius * 0.2 + Math.cos(time * 2.5) * 3;
      for (let ib = 0; ib < innerBeads; ib++) {
        const ibAngle = (ib / innerBeads) * Math.PI * 2 - time * 0.3;
        const ix = centerX + Math.cos(ibAngle) * innerBeadR;
        const iy = centerY + Math.sin(ibAngle) * innerBeadR;

        ctx.save();
        ctx.fillStyle = '#c4b5fd';
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(ix, iy, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Center bright singularity vibration node
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5 + Math.sin(time * 4) * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeFrequency, isPlayingSound]);

  // 2. 3D Brain EEG Synaptic & Tractography Visualizer (Inspired by the brain in the video)
  useEffect(() => {
    const canvas = brainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Generate static axonal connection points
    const leftHemisphereNodes: { x: number; y: number; baseColor: string; connections: number[] }[] = [];
    const rightHemisphereNodes: { x: number; y: number; baseColor: string; connections: number[] }[] = [];

    // Left hemisphere nodes
    for (let i = 0; i < 40; i++) {
      const u = Math.random();
      const v = Math.random();
      const nx = 90 + Math.sin(u * Math.PI) * 45 * (0.6 + 0.4 * Math.cos(v * Math.PI));
      const ny = 60 + v * 150 + Math.cos(u * Math.PI) * 15;
      leftHemisphereNodes.push({
        x: nx,
        y: ny,
        baseColor: i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#a855f7' : '#22d3ee',
        connections: [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)]
      });
    }

    // Right hemisphere nodes
    for (let i = 0; i < 40; i++) {
      const u = Math.random();
      const v = Math.random();
      const nx = 190 + Math.sin(u * Math.PI) * 45 * (0.6 + 0.4 * Math.cos(v * Math.PI));
      const ny = 60 + v * 150 + Math.cos(u * Math.PI) * 15;
      rightHemisphereNodes.push({
        x: nx,
        y: ny,
        baseColor: i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#a855f7' : '#22d3ee',
        connections: [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)]
      });
    }

    const render = () => {
      time += isPlayingSound ? 0.05 : 0.02;
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;

      ctx.clearRect(0, 0, width, height);

      // Dark background
      ctx.fillStyle = '#06060c';
      ctx.fillRect(0, 0, width, height);

      // Draw Brain Silhouette Underlay (Greenish-teal anatomical contour like in video)
      ctx.save();
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.3)';
      ctx.fillStyle = 'rgba(15, 118, 110, 0.12)';
      ctx.lineWidth = 2;

      // Left lobe contour
      ctx.beginPath();
      ctx.ellipse(centerX - 42, 135, 46, 75, -0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Right lobe contour
      ctx.beginPath();
      ctx.ellipse(centerX + 42, 135, 46, 75, 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Longitudinal Fissure (Center midline)
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.4)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(centerX, 55);
      ctx.lineTo(centerX, 215);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Corpus Callosum inter-hemispheric bridge pulses (Fibers connecting left and right)
      const bridgeCount = 10;
      for (let b = 0; b < bridgeCount; b++) {
        const by = 80 + b * 13;
        const pulse = (Math.sin(time * 3 + b) + 1) / 2;
        ctx.save();
        ctx.strokeStyle = isPlayingSound
          ? `rgba(236, 72, 153, ${0.4 + pulse * 0.5})`
          : 'rgba(236, 72, 153, 0.2)';
        ctx.lineWidth = isPlayingSound ? 2.2 : 1.2;
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = isPlayingSound ? 10 : 3;
        ctx.beginPath();
        ctx.moveTo(centerX - 24, by);
        ctx.bezierCurveTo(centerX - 8, by - 4, centerX + 8, by - 4, centerX + 24, by);
        ctx.stroke();
        ctx.restore();
      }

      // Draw Synaptic Tractography Networks (Left & Right Hemispheres)
      const allNodes = [...leftHemisphereNodes, ...rightHemisphereNodes];
      allNodes.forEach((node, idx) => {
        const nodePulse = (Math.sin(time * 4 + idx * 0.5) + 1) / 2;
        const isFired = isPlayingSound ? nodePulse > 0.4 : nodePulse > 0.7;

        // Draw connections
        node.connections.forEach((targetIdx) => {
          const target = allNodes[targetIdx];
          if (!target) return;
          ctx.save();
          ctx.strokeStyle = isFired
            ? node.baseColor
            : 'rgba(168, 85, 247, 0.15)';
          ctx.lineWidth = isFired ? 1.4 : 0.6;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
          ctx.restore();
        });

        // Draw firing synaptic node
        ctx.save();
        ctx.fillStyle = isFired ? '#ffffff' : node.baseColor;
        ctx.shadowColor = node.baseColor;
        ctx.shadowBlur = isFired ? 12 : 3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, isFired ? 3.0 : 1.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Frontal Lobe & Parietal Lobe Harmonic Halo Sparkles
      if (isPlayingSound) {
        for (let s = 0; s < 6; s++) {
          const sparkAngle = Math.random() * Math.PI * 2;
          const sparkDist = 30 + Math.random() * 50;
          const sx = centerX + Math.cos(sparkAngle) * sparkDist;
          const sy = 135 + Math.sin(sparkAngle) * sparkDist * 1.2;

          ctx.save();
          ctx.fillStyle = '#f472b6';
          ctx.shadowColor = '#ec4899';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeFrequency, isPlayingSound]);

  return (
    <div
      className={`rounded-3xl border p-6 sm:p-8 transition-all overflow-hidden relative ${
        isDark
          ? 'bg-gradient-to-b from-[#0b0a1a] via-[#0e0c24] to-[#080714] border-purple-500/40 text-slate-100 shadow-[0_0_50px_rgba(168,85,247,0.15)]'
          : 'bg-gradient-to-b from-[#faf5ff] via-[#f3e8ff] to-[#ede9fe] border-purple-300 text-slate-900 shadow-xl'
      }`}
    >
      {/* Top Banner Header (Exactly matching the video concept) */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-purple-300 bg-purple-500/20 border border-purple-400/40">
          <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-spin" />
          <span>WHEN MANTRA MEETS WATER & THE BRAIN</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-cinzel font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300">
          Cymatics + EEG Neural Entrainment
        </h2>
        <p className="text-xs sm:text-sm font-serif opacity-85 max-w-2xl mx-auto leading-relaxed">
          Sacred sound frequencies instantaneously restructure human intracellular water (70% of body mass) into crystalline lotus mandalas while synchronously entraining brainwave coherence.
        </p>
      </div>

      {/* DUAL DISPLAY CHAMBER: Water Cymatics (Top/Left) & EEG Brain (Bottom/Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* LEFT/TOP: Live Water Cymatics Dish */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative p-4 rounded-3xl bg-slate-950 border border-purple-500/40 shadow-2xl">
            <div className="text-center mb-2 flex items-center justify-between text-[11px] font-mono text-purple-300 px-2">
              <span className="flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5 text-purple-400" />
                WATER CYMATICS DISH
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30">
                {activeFrequency} Hz Faraday Waves
              </span>
            </div>

            <canvas
              ref={waterCanvasRef}
              width={300}
              height={300}
              className="rounded-2xl max-w-full h-auto mx-auto shadow-inner"
            />

            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-purple-300 bg-purple-950/40 px-3 py-1.5 rounded-xl border border-purple-500/30">
              <span>Standing Node Geometry</span>
              <span className="font-bold text-pink-300">
                {activeFrequency === 432 ? '8-Petal Lotus (432Hz)' : activeFrequency === 528 ? '12-Node Hexagonal (528Hz)' : 'Vedic Sri Ring'}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT/BOTTOM: 3D Brain EEG Synaptic Wave Coherence */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative p-4 rounded-3xl bg-slate-950 border border-teal-500/40 shadow-2xl w-full max-w-[340px]">
            <div className="text-center mb-2 flex items-center justify-between text-[11px] font-mono text-teal-300 px-2">
              <span className="flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-teal-400" />
                EEG SYNAPTIC COHERENCE
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/30 font-bold">
                {coherenceScore}% Synchrony
              </span>
            </div>

            <canvas
              ref={brainCanvasRef}
              width={280}
              height={260}
              className="rounded-2xl max-w-full h-auto mx-auto shadow-inner"
            />

            <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-mono text-teal-200">
              <div className="p-2 rounded-lg bg-teal-950/40 border border-teal-500/30">
                <div className="text-slate-400">Brainwave State</div>
                <div className="font-bold text-pink-300 capitalize">{eegPhase} (4–8 Hz)</div>
              </div>
              <div className="p-2 rounded-lg bg-teal-950/40 border border-teal-500/30">
                <div className="text-slate-400">Hemispheric Sync</div>
                <div className="font-bold text-emerald-300">Optimal (98%)</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Sound Controls Bar */}
      {showControls && (
        <div className="mt-8 pt-6 border-t border-purple-500/20 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-cinzel font-bold text-purple-200">
                Select Sacred Sound Vibrational Trigger:
              </span>
            </div>

            {isPlayingSound && (
              <button
                onClick={handleStopSound}
                className="px-3.5 py-1 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-400/40 text-red-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition active:scale-95"
              >
                <Pause className="w-3 h-3" /> Stop Waves
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {[
              { id: 'om', name: 'ॐ Cosmic OM', hz: 432, desc: 'Sri Yantra Harmony', color: '#c084fc' },
              { id: 'medicine', name: 'Medicine Buddha', hz: 528, desc: 'Cellular Light', color: '#38bdf8' },
              { id: '528', name: '528Hz Solfeggio', hz: 528, desc: 'DNA Repair', color: '#34d399' },
              { id: '432', name: '432Hz Verdi Tone', hz: 432, desc: 'Water Hexagon', color: '#fbbf24' },
              { id: 'bowl', name: 'Tibetan Bowl Rim', hz: 256, desc: 'Deep Heart Resonate', color: '#f472b6' },
              { id: 'theta', name: 'Theta Brainwave', hz: 216, desc: 'Neural Entrain', color: '#a78bfa' }
            ].map((btn) => (
              <button
                key={btn.id}
                id={`trigger-${btn.id}`}
                onClick={() => {
                  handlePlaySound(btn.id as any);
                  confetti({ particleCount: 20, spread: 45 });
                }}
                className={`p-3 rounded-2xl border text-left transition-all active:scale-95 cursor-pointer ${
                  activeMantraMode === btn.id && isPlayingSound
                    ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)] animate-pulse'
                    : isDark
                    ? 'bg-slate-950/70 hover:bg-slate-900 border-purple-500/30 text-slate-200'
                    : 'bg-white hover:bg-purple-50 border-purple-200 text-slate-800 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-cinzel font-bold">{btn.name}</span>
                  <Play className="w-3 h-3 text-purple-400" />
                </div>
                <div className="text-[10px] opacity-70 font-mono">{btn.hz} Hz • {btn.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
