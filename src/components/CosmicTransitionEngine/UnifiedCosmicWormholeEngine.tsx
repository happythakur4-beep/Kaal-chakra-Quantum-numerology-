import React, { useEffect, useRef, useState } from 'react';
import { ScreenType, ThemeMode } from '../../types';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, Orbit, Compass, Radio, FastForward, Activity } from 'lucide-react';

interface ScreenCosmicMetadata {
  title: string;
  sanskrit: string;
  frequency: number;
  mode: 'wormhole' | 'nebula' | 'singularity' | 'stardust';
  color: string;
  grahaLord?: string;
  mantra?: string;
}

export const SCREEN_COSMIC_MAP: Record<ScreenType, ScreenCosmicMetadata> = {
  landing: {
    title: 'Sanatan Jyotish & Quantum Resonance Sanctuary',
    sanskrit: 'ब्रह्म चेतना मन्दिर (Brahma Kshetra)',
    frequency: 432,
    mode: 'nebula',
    color: '#ffd700',
    grahaLord: 'Surya (The Primordial Sun)',
    mantra: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यम्',
  },
  'energy-balance': {
    title: 'Choose Your Energy & Lotus Balance Sanctuary',
    sanskrit: 'ऊर्जा सन्तुलन एवं कमल तुला (Urja Santulan)',
    frequency: 528,
    mode: 'nebula',
    color: '#fbbf24',
    grahaLord: 'Suryanarayana & Chandra (Solar & Lunar Equilibrium)',
    mantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः',
  },
  portal: {
    title: 'Institute Student & Seeker Portal',
    sanskrit: 'विद्यापीठ चेतना (Vidyapeeth)',
    frequency: 528,
    mode: 'wormhole',
    color: '#38bdf8',
    grahaLord: 'Brihaspati (Guru of Cosmic Wisdom)',
    mantra: 'ॐ बृं बृहस्पतये नमः',
  },
  report: {
    title: 'Destiny Matrix & Akashic Numerology Report',
    sanskrit: 'भाग्य चक्र एवं कर्म रहस्य (Karma Chakra)',
    frequency: 639,
    mode: 'singularity',
    color: '#ec4899',
    grahaLord: 'Shani (Lord of Saturn & Time Cycles)',
    mantra: 'ॐ शं शनैश्चराय नमः',
  },
  kundli: {
    title: 'Vedic Kundli & D1/D9 Navamsha Astral Chart',
    sanskrit: 'लग्न कुण्डली एवं नवमांश मण्डल (Kundli Chakra)',
    frequency: 432,
    mode: 'wormhole',
    color: '#f59e0b',
    grahaLord: 'Navagraha Mandala (Nine Cosmic Rulers)',
    mantra: 'ॐ ब्रह्मा मुरारिस्त्रिपुरान्तकारी भानुः शशी भूमिसुतो बुधश्च',
  },
  matching: {
    title: 'Kundli Milan & 36 Ashta Koota Compatibility',
    sanskrit: 'अष्टकूट गुण मिलान (Ashta Koota Milan)',
    frequency: 528,
    mode: 'nebula',
    color: '#f43f5e',
    grahaLord: 'Shukra (Venus - Pure Harmonics & Harmony)',
    mantra: 'ॐ शुं शुक्राय नमः',
  },
  transits: {
    title: 'Live Planetary Gochar & Astrometry Transit Tracker',
    sanskrit: 'गोचर ग्रह संचरण (Gochar Tracker)',
    frequency: 741,
    mode: 'wormhole',
    color: '#a855f7',
    grahaLord: 'Budha (Mercury - Celestial Velocity)',
    mantra: 'ॐ बुं बुधाय नमः',
  },
  gemstones: {
    title: 'Ayurvedic Ratna & Crystalline Gemstone Remedies',
    sanskrit: 'रत्न एवं प्राण प्रतिष्ठा (Navaratna)',
    frequency: 852,
    mode: 'stardust',
    color: '#10b981',
    grahaLord: 'Chandra (Moon - Crystalline Soma)',
    mantra: 'ॐ सों सोमाय नमः',
  },
  panchang: {
    title: 'Daily Vedic Panchang & Choghadiya Muhurat Engine',
    sanskrit: 'पञ्चाङ्ग एवं शुभ मुहूर्त (Panchang)',
    frequency: 396,
    mode: 'nebula',
    color: '#eab308',
    grahaLord: 'Surya Narayana (Lord of Cosmic Daylight)',
    mantra: 'ॐ सूर्याय नमः',
  },
  lalkitab: {
    title: 'Lal Kitab Farman & Karmic Debt Totke Remedies',
    sanskrit: 'लाल किताब एवं ऋण मुक्ति (Lal Kitab)',
    frequency: 417,
    mode: 'singularity',
    color: '#ef4444',
    grahaLord: 'Mangala (Mars - Karmic Debt Resolution)',
    mantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः',
  },
  kp: {
    title: 'KP Nakshatra Sub-Lord & Cuspal Interlink System',
    sanskrit: 'कृष्णमूर्ति पद्धति (KP System)',
    frequency: 963,
    mode: 'wormhole',
    color: '#06b6d4',
    grahaLord: 'Nakshatra Sub-Lord Matrix',
    mantra: 'ॐ ऐं सरस्वत्यै नमः',
  },
  rashifal: {
    title: '12 Rashi Rashifal & Mystic 78-Card Tarot Deck',
    sanskrit: 'दैनिक राशिफल एवं टैरो चक्र (Tarot & Rashi)',
    frequency: 639,
    mode: 'nebula',
    color: '#8b5cf6',
    grahaLord: 'Chandra & Cosmic Archetypes',
    mantra: 'ॐ चन्द्रमसे नमः',
  },
  numerology: {
    title: 'Chaldean & Pythagorean Destiny Number Matrix',
    sanskrit: 'अंक ज्योतिष एवं भाग्य संख्या (Numerology)',
    frequency: 528,
    mode: 'stardust',
    color: '#f97316',
    grahaLord: 'Surya & Divine Mathematics (1-9)',
    mantra: 'ॐ घृणि सूर्याय नमः',
  },
  vastu: {
    title: 'Vastu Purusha 16-Zone Architectural Energy Grid',
    sanskrit: 'वास्तु पुरुष मण्डल (Vastu Purusha)',
    frequency: 432,
    mode: 'nebula',
    color: '#14b8a6',
    grahaLord: 'Vastu Devata & 8 Cardinal Guardians',
    mantra: 'ॐ वास्तुपुरुषाय नमः',
  },
  prashnavali: {
    title: 'Ramcharitmanas & Sacred Prashnavali Oracle',
    sanskrit: 'श्री राम शलाका प्रश्नावली (Ram Prashnavali)',
    frequency: 528,
    mode: 'stardust',
    color: '#d97706',
    grahaLord: 'Shri Ramachandra (Dharma Avatar)',
    mantra: 'श्री राम जय राम जय जय राम',
  },
  'baby-names': {
    title: 'Nakshatra Varna & Vedic Baby Name Generator',
    sanskrit: 'नामकरण संस्कार एवं नक्षत्र वर्ण (Namakaran)',
    frequency: 639,
    mode: 'nebula',
    color: '#ec4899',
    grahaLord: 'Saraswati (Goddess of Speech & Sound)',
    mantra: 'ॐ वाग्देव्यै नमः',
  },
  'japa-mala': {
    title: 'Interactive 108 Rudraksha Beads Japa Meditation',
    sanskrit: '१०८ रुद्राक्ष जप माला (Japa Mala)',
    frequency: 432,
    mode: 'stardust',
    color: '#b45309',
    grahaLord: 'Shiva Mahadeva (Lord of Meditation & Cosmic Sound)',
    mantra: 'ॐ नमः शिवाय',
  },
  'mind-healing': {
    title: 'Mind-Over-Illness: Cellular Self-Healing Matrix',
    sanskrit: 'चित्त रोग मुक्ति एवं कायाकल्प (Chitta Rog Mukti)',
    frequency: 528,
    mode: 'wormhole',
    color: '#10b981',
    grahaLord: 'Lord Dhanvantari (Divine Physician of the Cosmos)',
    mantra: 'ॐ नमो भगवते धन्वन्तरये अमृतकलशहस्ताय सर्वभयविनाशाय सर्वरोगनिवारणाय नमः',
  },
  'sound-healing': {
    title: 'Buddhist & Sacred Sound Healing Therapy Suite',
    sanskrit: 'नाद ब्रह्म एवं तिब्बती कटोरा चिकित्सा (Nada Brahma)',
    frequency: 432,
    mode: 'stardust',
    color: '#f59e0b',
    grahaLord: 'Bhaisajyaguru (Medicine Buddha & Seven Vajra Metals)',
    mantra: 'तद्यथा ॐ भैषज्ये भैषज्ये महाभैषज्ये राजसमुद्गते स्वाहा',
  },
  'memory-hypnosis': {
    title: 'Memory Healing Hypnosis & Cognitive Reconsolidation',
    sanskrit: 'स्मृति उपचार सम्मोहन एवं संस्कार विच्छेदन (Smriti Hypnosis)',
    frequency: 528,
    mode: 'singularity',
    color: '#06b6d4',
    grahaLord: 'Maha Saraswati & Medha Shakti (Neural Lightning)',
    mantra: 'ॐ ऐं सरस्वत्यै नमः • ॐ मेधा देव्यै स्वाहा',
  },
  karma: {
    title: 'Karmic Balance Sheet & Dharmic Ledger',
    sanskrit: 'कर्म फल दर्पण एवं पाप-पुण्य लेखा (Karma Mandala)',
    frequency: 528,
    mode: 'singularity',
    color: '#d4af37',
    grahaLord: 'Dharmaraja Yama & Chitragupta (Lords of Cosmic Justice)',
    mantra: 'ॐ धर्मराजाय नमः • ॐ चित्रगुप्ताय नमः',
  },
  'tesla-369': {
    title: '369 Tesla Cosmic Universe & Vortex Engine',
    sanskrit: 'टेस्ला त्रिक ऊर्जा एवं महाशून्य (369 Vortex)',
    frequency: 963,
    mode: 'singularity',
    color: '#ffd700',
    grahaLord: 'Nikola Tesla Quantum Singularity',
    mantra: '3-6-9 The Universal Harmonics of Creation',
  },
  student: {
    title: 'Student Ashram & Jyotish Certification Academy',
    sanskrit: 'गुरुकुल छात्र आश्रम (Gurukula)',
    frequency: 528,
    mode: 'nebula',
    color: '#f59e0b',
    grahaLord: 'Brihaspati & Maharishi Parashara',
    mantra: 'ॐ गुरुवे नमः',
  },
  practice: {
    title: 'Quantum Meditation & Pranayama Breath Synthesizer',
    sanskrit: 'प्राणायाम एवं ध्यान साधना (Pranayama)',
    frequency: 432,
    mode: 'stardust',
    color: '#06b6d4',
    grahaLord: 'Prana Vayu & Kundalini Awakening',
    mantra: 'सो ऽहम् (So Hum)',
  },
  academy: {
    title: 'Sanatan Vedic Academy & Masterclasses',
    sanskrit: 'सनातन वैदिक विद्यापीठ (Vedic Academy)',
    frequency: 741,
    mode: 'wormhole',
    color: '#8b5cf6',
    grahaLord: 'Maharishi Bhrigu & Jaimini',
    mantra: 'ॐ वेदपुरुषाय नमः',
  },
  consultations: {
    title: 'Book 1-on-1 Consultation with Certified Astrologers',
    sanskrit: 'ज्योतिष परामर्श मण्डल (Consultation)',
    frequency: 639,
    mode: 'nebula',
    color: '#f43f5e',
    grahaLord: 'Daivajna Acharyas (Vedic Seers)',
    mantra: 'ॐ शान्तिः शान्तिः शान्तिः',
  },
  mentor: {
    title: 'AI Cosmic Rishi & Vedic Intelligence Oracle',
    sanskrit: 'दिव्य ऋषि संवाद (Cosmic Rishi)',
    frequency: 963,
    mode: 'singularity',
    color: '#a855f7',
    grahaLord: 'Maharishi Valmiki & Cosmic AI Mind',
    mantra: 'ॐ ज्ञानमुद्राय नमः',
  },
};

interface UnifiedCosmicWormholeEngineProps {
  isNavigating: boolean;
  fromScreen: ScreenType;
  toScreen: ScreenType;
  onTransitionComplete: () => void;
  theme: ThemeMode;
}

export const UnifiedCosmicWormholeEngine: React.FC<UnifiedCosmicWormholeEngineProps> = ({
  isNavigating,
  fromScreen,
  toScreen,
  onTransitionComplete,
  theme,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const meta = SCREEN_COSMIC_MAP[toScreen] || SCREEN_COSMIC_MAP.landing;
  const fromMeta = SCREEN_COSMIC_MAP[fromScreen] || SCREEN_COSMIC_MAP.landing;

  useEffect(() => {
    if (!isNavigating) return;

    // Safety timeout: Guarantee completion within 700ms under all conditions
    const safetyTimer = setTimeout(() => {
      onTransitionComplete();
    }, 700);

    // Play resonant Solfeggio or Cosmic Tone corresponding to destination
    try {
      cosmicAudio.playTeslaFrequency(meta.frequency, 1.2);
    } catch {}

    const canvas = canvasRef.current;
    if (!canvas) {
      return () => clearTimeout(safetyTimer);
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return () => clearTimeout(safetyTimer);
    }

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // High-density Hyperspace Particles & Stardust Vortex
    const numParticles = 380;
    const particles: {
      x: number;
      y: number;
      z: number;
      pz: number;
      angle: number;
      radius: number;
      color: string;
      size: number;
      speed: number;
    }[] = [];

    const palette = [
      meta.color,
      '#ffffff',
      '#ffd700',
      '#38bdf8',
      '#a855f7',
      '#ec4899',
      '#f59e0b',
    ];

    for (let i = 0; i < numParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.max(width, height) * 0.75 + 30;
      particles.push({
        x: (Math.random() - 0.5) * width * 1.8,
        y: (Math.random() - 0.5) * height * 1.8,
        z: Math.random() * width,
        pz: Math.random() * width,
        angle,
        radius,
        color: palette[Math.floor(Math.random() * palette.length)],
        size: Math.random() * 2.5 + 0.8,
        speed: Math.random() * 8 + 6,
      });
    }

    const startTime = performance.now();
    const duration = 1200; // 1.2s smooth cinematic morph transition

    const render = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);
      setProgress(p);

      if (p >= 1) {
        onTransitionComplete();
        return;
      }

      const cx = width / 2;
      const cy = height / 2;

      // Dark Cosmic Infall Background
      ctx.fillStyle = 'rgba(4, 3, 9, 0.32)';
      ctx.fillRect(0, 0, width, height);

      // 1. Central Wormhole / Nebula Accretion Glow
      const vortexExpansion = Math.sin(p * Math.PI);
      const coreRadius = Math.max(20, 140 * vortexExpansion);
      const outerGlowRadius = coreRadius * 3.5;

      const radGrad = ctx.createRadialGradient(cx, cy, coreRadius * 0.3, cx, cy, outerGlowRadius);
      radGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      radGrad.addColorStop(0.2, meta.color);
      radGrad.addColorStop(0.55, 'rgba(168, 85, 247, 0.5)');
      radGrad.addColorStop(0.85, 'rgba(6, 182, 212, 0.2)');
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.save();
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, outerGlowRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Swirling Sacred Geometry Sri Yantra & 3-6-9 Light Rays
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(p * 4);
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 8]);

      // 9 Concentric harmonic pulses
      for (let r = 1; r <= 3; r++) {
        const ringR = coreRadius * (r * 0.8 + 0.4);
        ctx.beginPath();
        ctx.arc(0, 0, ringR, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Golden Interlocking Trinity Triangles
      for (let t = 0; t < 3; t++) {
        const rot = (t * Math.PI * 2) / 3;
        ctx.beginPath();
        for (let j = 0; j < 3; j++) {
          const a = rot + (j * Math.PI * 2) / 3;
          const tx = Math.cos(a) * (coreRadius * 1.8);
          const ty = Math.sin(a) * (coreRadius * 1.8);
          if (j === 0) ctx.moveTo(tx, ty);
          else ctx.lineTo(tx, ty);
        }
        ctx.closePath();
        ctx.stroke();
      }

      ctx.setLineDash([]);
      ctx.restore();

      // 3. 3D Hyperspace Starlight Streak Tunnel
      particles.forEach((pt) => {
        // Accelerate through z-axis
        pt.z -= pt.speed * (1 + p * 8);

        if (pt.z <= 0) {
          pt.z = width;
          pt.pz = width;
          pt.x = (Math.random() - 0.5) * width * 1.8;
          pt.y = (Math.random() - 0.5) * height * 1.8;
        }

        const k = 280 / pt.z;
        const pk = 280 / pt.pz;

        const sx = cx + pt.x * k;
        const sy = cy + pt.y * k;
        const px = cx + pt.x * pk;
        const py = cy + pt.y * pk;

        pt.pz = pt.z;

        if (sx >= -50 && sx <= width + 50 && sy >= -50 && sy <= height + 50) {
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = pt.color;
          ctx.lineWidth = Math.min(4, pt.size * k * 1.5);
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      });

      // 4. Subtle Gravitational Distortion Ring
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 1.3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 3;
      ctx.shadowColor = meta.color;
      ctx.shadowBlur = 25;
      ctx.stroke();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      clearTimeout(safetyTimer);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isNavigating, toScreen]);

  if (!isNavigating) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between p-4 sm:p-8 select-none">
      {/* Real-time 3D Hyperspace Warp Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Top Telemetry HUD */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="relative z-10 flex items-center justify-between max-w-4xl mx-auto w-full pt-2"
      >
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-black/85 border border-amber-400/70 backdrop-blur-md shadow-[0_0_30px_rgba(255,215,0,0.3)]">
          <FastForward className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <div className="text-xs font-mono">
            <span className="text-gray-400 text-[10px] block uppercase tracking-wider">
              COSMIC WORMHOLE DRIFT
            </span>
            <span className="text-amber-200 font-bold">
              {fromMeta.title.slice(0, 22)}... ➔ {meta.title.slice(0, 26)}...
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/85 border border-cyan-400/60 backdrop-blur-md text-xs font-mono text-cyan-300 font-bold">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>{meta.frequency} Hz RESONANCE</span>
        </div>
      </motion.div>

      {/* Center Astrological & Quantum Gateway Glyph */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        className="relative z-10 text-center max-w-xl mx-auto space-y-3 px-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-amber-400/60 bg-black/80 text-amber-300 text-xs font-mono tracking-widest uppercase shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span>{meta.sanskrit}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-[#fdf2d1] tracking-wide drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]">
          {meta.title}
        </h2>

        {meta.mantra && (
          <p className="text-sm font-serif italic text-amber-200/90 drop-shadow">
            "{meta.mantra}"
          </p>
        )}

        {meta.grahaLord && (
          <span className="text-xs font-mono text-cyan-300 block">
            Cosmic Alignment: <strong>{meta.grahaLord}</strong>
          </span>
        )}
      </motion.div>

      {/* Bottom Progress & Gravitational Infall Telemetry */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="relative z-10 max-w-xl mx-auto w-full space-y-1.5 bg-black/85 p-3 rounded-2xl border border-amber-500/50 backdrop-blur-md pb-2"
      >
        <div className="flex justify-between text-[11px] font-mono text-amber-300">
          <span>Spacetime Wormhole Translation</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-black overflow-hidden border border-white/20">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-purple-400 to-cyan-400"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </motion.div>
    </div>
  );
};
