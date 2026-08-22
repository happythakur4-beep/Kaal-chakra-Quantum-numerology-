import React, { useState, useEffect } from 'react';
import { ThemeMode, AuraType } from '../types';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Sun, 
  Moon, 
  RotateCw, 
  Flame, 
  Heart, 
  Eye, 
  ShieldCheck, 
  Compass,
  Radio,
  BookOpen
} from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

interface CosmicAffirmationWidgetProps {
  theme: ThemeMode;
  activeAura: AuraType;
  userName?: string;
  onNavigateToPractice?: () => void;
}

interface MantraData {
  timeOfDay: 'Morning' | 'Midday' | 'Evening';
  sanskritMantra: string;
  sanskritPhonetic: string;
  affirmation: string;
  focusDeity: string;
  element: string;
  rulingPlanet: string;
  frequencyHz: number;
  chakra: string;
  benefits: string;
}

const AURA_AFFIRMATIONS: Record<AuraType, {
  color: string;
  borderColor: string;
  bgGradient: string;
  glowColor: string;
  archetype: string;
  mantras: MantraData[];
}> = {
  'Calm Amber': {
    color: '#d4af37',
    borderColor: 'rgba(212, 175, 55, 0.4)',
    bgGradient: 'from-amber-950/40 via-yellow-950/20 to-black/50',
    glowColor: 'rgba(212, 175, 55, 0.25)',
    archetype: 'The Harmonizer • 432 Hz',
    mantras: [
      {
        timeOfDay: 'Morning',
        sanskritMantra: 'ॐ शान्तिः शान्तिः शान्तिः',
        sanskritPhonetic: 'Om Shantih Shantih Shantih',
        affirmation: 'I step into this day rooted in boundless serenity. My mind is still, my solar plexus is empowered, and divine order effortlessly orchestrates my success.',
        focusDeity: 'Brahma & Surya Dev',
        element: 'Prithvi (Earth) & Tejas (Fire)',
        rulingPlanet: 'Sun & Jupiter',
        frequencyHz: 432,
        chakra: 'Manipura (Solar Plexus)',
        benefits: 'Dissolves anxiety, establishes unshakable stability, and stabilizes digestive fire.'
      },
      {
        timeOfDay: 'Midday',
        sanskritMantra: 'ॐ घृणिः सूर्याय नमः',
        sanskritPhonetic: 'Om Ghrinih Suryaya Namah',
        affirmation: 'I am fueled by calm vitality. Every action I take radiates quiet strength, fairness, and harmonious leadership.',
        focusDeity: 'Surya Narayan',
        element: 'Tejas (Divine Light)',
        rulingPlanet: 'Sun',
        frequencyHz: 432,
        chakra: 'Anahata / Manipura Axis',
        benefits: 'Boosts stamina, dispels midday lethargy, and sharpens executive focus.'
      },
      {
        timeOfDay: 'Evening',
        sanskritMantra: 'ॐ नमो नारायणाय',
        sanskritPhonetic: 'Om Namo Narayanaya',
        affirmation: 'I surrender all striving into the protective grace of the cosmos. I rest in complete peace, knowing all is aligned in perfection.',
        focusDeity: 'Lord Vishnu',
        element: 'Prithvi (Earth)',
        rulingPlanet: 'Jupiter',
        frequencyHz: 432,
        chakra: 'Muladhara (Root)',
        benefits: 'Promotes restorative sleep, anchors vital Ojas, and seals daily merit.'
      }
    ]
  },
  'Radiant Rose': {
    color: '#f472b6',
    borderColor: 'rgba(244, 114, 182, 0.4)',
    bgGradient: 'from-pink-950/40 via-rose-950/20 to-black/50',
    glowColor: 'rgba(244, 114, 182, 0.25)',
    archetype: 'The Compassionate Alchemist • 528 Hz',
    mantras: [
      {
        timeOfDay: 'Morning',
        sanskritMantra: 'ॐ हृत्पद्मे श्रीं महालक्ष्म्यै नमः',
        sanskritPhonetic: 'Om Hritpadme Shreem Mahalakshmyai Namah',
        affirmation: 'My heart is an open sanctuary of unconditional love. I welcome sacred relationships, profound abundance, and magnetic grace into my reality.',
        focusDeity: 'Maha Lakshmi & Shukra',
        element: 'Jala (Sacred Water)',
        rulingPlanet: 'Venus (Shukra)',
        frequencyHz: 528,
        chakra: 'Anahata (Heart Chakra)',
        benefits: 'Heals emotional wounds, awakens divine beauty, and draws magnetic wealth.'
      },
      {
        timeOfDay: 'Midday',
        sanskritMantra: 'ॐ क्लीं कृष्णाय नमः',
        sanskritPhonetic: 'Om Kleem Krishnaya Namah',
        affirmation: 'I communicate with sweetness, kindness, and magnetic charm. I forgive effortlessly and attract soul-level harmony.',
        focusDeity: 'Sri Krishna & Radha',
        element: 'Vayu (Air of Love)',
        rulingPlanet: 'Venus & Mercury',
        frequencyHz: 528,
        chakra: 'Anahata & Vishuddha',
        benefits: 'Enhances interpersonal diplomacy, softens conflict, and opens the vocal heart.'
      },
      {
        timeOfDay: 'Evening',
        sanskritMantra: 'ॐ सोम सोमाय नमः',
        sanskritPhonetic: 'Om Som Somaya Namah',
        affirmation: 'I envelop myself and loved ones in radiant compassion. My heart rests in sweet tranquility and gentle self-love.',
        focusDeity: 'Chandra Dev & Gauri',
        element: 'Jala (Lunar Waters)',
        rulingPlanet: 'Moon',
        frequencyHz: 528,
        chakra: 'Svadhisthana & Anahata',
        benefits: 'Cools emotional fever, nurtures deep cellular rejuvenation, and eases loneliness.'
      }
    ]
  },
  'Celestial Gold': {
    color: '#fbbf24',
    borderColor: 'rgba(251, 191, 36, 0.45)',
    bgGradient: 'from-amber-950/50 via-yellow-950/30 to-black/55',
    glowColor: 'rgba(251, 191, 36, 0.3)',
    archetype: 'The Sovereign Victor • 639 Hz',
    mantras: [
      {
        timeOfDay: 'Morning',
        sanskritMantra: 'ॐ ह्रीं सूर्याय नमः • ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे',
        sanskritPhonetic: 'Om Hreem Suryaya Namah',
        affirmation: 'The golden flame of sovereign courage burns within me. I am capable of conquering all obstacles and manifesting supreme victory in my dharma.',
        focusDeity: 'Surya Dev & Goddess Durga',
        element: 'Tejas (Solar Fire)',
        rulingPlanet: 'Sun & Mars',
        frequencyHz: 639,
        chakra: 'Manipura & Sahasrara',
        benefits: 'Instills invincibility, clears self-doubt, and magnetizes golden opportunities.'
      },
      {
        timeOfDay: 'Midday',
        sanskritMantra: 'ॐ नमः शिवाय • जय जय श्री राम',
        sanskritPhonetic: 'Om Namah Shivaya',
        affirmation: 'I stand tall in unwavering integrity and sovereign truth. My willpower bends circumstances in favor of high spiritual purpose.',
        focusDeity: 'Lord Shiva & Sri Rama',
        element: 'Agni (Cosmic Fire)',
        rulingPlanet: 'Sun & Jupiter',
        frequencyHz: 639,
        chakra: 'Manipura (Will Center)',
        benefits: 'Sharpens decisiveness, ignites noble leadership, and commands natural respect.'
      },
      {
        timeOfDay: 'Evening',
        sanskritMantra: 'ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते',
        sanskritPhonetic: 'Om Poornamadah Poornamidam',
        affirmation: 'I am whole, complete, and fulfilled. All victories of this day are offered to the supreme infinite consciousness.',
        focusDeity: 'Parabrahman',
        element: 'Akasha & Tejas',
        rulingPlanet: 'Jupiter',
        frequencyHz: 639,
        chakra: 'Sahasrara (Crown)',
        benefits: 'Transforms pride into golden wisdom, dissolves fatigue, and grounds royal peace.'
      }
    ]
  },
  'Aetheric Violet': {
    color: '#c084fc',
    borderColor: 'rgba(192, 132, 252, 0.4)',
    bgGradient: 'from-purple-950/45 via-indigo-950/25 to-black/55',
    glowColor: 'rgba(192, 132, 252, 0.25)',
    archetype: 'The Mystic Seer • 852 Hz',
    mantras: [
      {
        timeOfDay: 'Morning',
        sanskritMantra: 'ॐ ऐं सरस्वत्यै नमः',
        sanskritPhonetic: 'Om Aim Saraswatyai Namah',
        affirmation: 'My third eye is awakened to the subtle truths of the cosmos. Divine intuition guides my intellect and unlocks sacred hidden knowledge.',
        focusDeity: 'Maa Saraswati & Lord Shiva',
        element: 'Akasha (Cosmic Ether)',
        rulingPlanet: 'Ketu & Jupiter',
        frequencyHz: 852,
        chakra: 'Ajna (Third Eye)',
        benefits: 'Sharpens clairvoyance, accelerates occult study, and pierces through illusion (Maya).'
      },
      {
        timeOfDay: 'Midday',
        sanskritMantra: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्',
        sanskritPhonetic: 'Om Tryambakam Yajamahe',
        affirmation: 'I see beyond the physical illusion. Cosmic awareness surrounds me with impenetrable spiritual armor and pure clarity.',
        focusDeity: 'Maha Mrityunjaya Rudra',
        element: 'Akasha (Spiritual Space)',
        rulingPlanet: 'Ketu & Saturn',
        frequencyHz: 852,
        chakra: 'Ajna & Sahasrara',
        benefits: 'Shields from psychic discord, dissolves karmic fog, and grounds high frequency downloads.'
      },
      {
        timeOfDay: 'Evening',
        sanskritMantra: 'ॐ तत्त्वमसि • ॐ सोऽहम्',
        sanskritPhonetic: 'Om Tat Tvam Asi • Om So Hum',
        affirmation: 'I am the observer of all phenomena. In deep silence, my soul merges with eternal cosmic intelligence and tranquil omniscience.',
        focusDeity: 'Dakshinamurthy',
        element: 'Mahat Tattva (Pure Consciousness)',
        rulingPlanet: 'Jupiter & Rahu Transmutation',
        frequencyHz: 852,
        chakra: 'Sahasrara & Bindu',
        benefits: 'Triggers lucid prophetic dreaming, releases mental attachments, and deepens Samadhi.'
      }
    ]
  },
  'Emerald Clarity': {
    color: '#10b981',
    borderColor: 'rgba(16, 185, 129, 0.4)',
    bgGradient: 'from-emerald-950/45 via-teal-950/25 to-black/55',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    archetype: 'The Quantum Healer • 963 Hz',
    mantras: [
      {
        timeOfDay: 'Morning',
        sanskritMantra: 'ॐ नमो भगवते वासुदेवाय • ॐ बुं बुधाय नमः',
        sanskritPhonetic: 'Om Namo Bhagavate Vasudevaya',
        affirmation: 'My nervous system vibrates at perfect quantum equilibrium. Pristine logic, rapid comprehension, and healing energy flow through all my words.',
        focusDeity: 'Budha Dev & Lord Dhanvantari',
        element: 'Vayu (Air) & Prana',
        rulingPlanet: 'Mercury (Budha)',
        frequencyHz: 963,
        chakra: 'Vishuddha & Crown Pineal',
        benefits: 'Enhances cognitive processing speed, heals speech afflictions, and balances bio-rhythms.'
      },
      {
        timeOfDay: 'Midday',
        sanskritMantra: 'ॐ धन्वन्तरये नमः अमृतकलशहस्ताय',
        sanskritPhonetic: 'Om Dhanvantaraye Namah',
        affirmation: 'I am clear, adaptable, and articulate. I solve complex challenges with surgical elegance and pure energetic grace.',
        focusDeity: 'Lord Dhanvantari',
        element: 'Prana (Life Breath)',
        rulingPlanet: 'Mercury & Jupiter',
        frequencyHz: 963,
        chakra: 'Vishuddha (Throat)',
        benefits: 'Eliminates mental confusion, stimulates cellular detox, and enlivens negotiation prowess.'
      },
      {
        timeOfDay: 'Evening',
        sanskritMantra: 'ॐ आरोग्याय नमो नमः',
        sanskritPhonetic: 'Om Aarogyaya Namo Namah',
        affirmation: 'Every cell in my body returns to pristine harmony. My thoughts settle into calm, luminous stillness.',
        focusDeity: 'Lord Vishnu & Ashwini Kumaras',
        element: 'Jala & Vayu',
        rulingPlanet: 'Mercury & Moon',
        frequencyHz: 963,
        chakra: 'All 7 Chakras Aligned',
        benefits: 'Harmonizes nervous exhaustion, regenerates mental bandwidth, and fosters serene stillness.'
      }
    ]
  }
};

export const CosmicAffirmationWidget: React.FC<CosmicAffirmationWidgetProps> = ({
  theme,
  activeAura,
  userName = 'Seeker',
  onNavigateToPractice
}) => {
  const [mantraIndex, setMantraIndex] = useState<number>(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [chantCount, setChantCount] = useState<number>(1);
  const [isSealed, setIsSealed] = useState<boolean>(false);

  const isDark = theme === 'dark';
  const auraConfig = AURA_AFFIRMATIONS[activeAura] || AURA_AFFIRMATIONS['Calm Amber'];
  const currentMantra = auraConfig.mantras[mantraIndex] || auraConfig.mantras[0];

  // Auto pick time of day mantra based on user's current local hour
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) {
      setMantraIndex(0); // Morning
    } else if (hour >= 12 && hour < 18) {
      setMantraIndex(1); // Midday
    } else {
      setMantraIndex(2); // Evening
    }
  }, [activeAura]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (isAudioPlaying) {
        cosmicAudio.stop();
      }
    };
  }, [isAudioPlaying]);

  const handleToggleAudio = () => {
    if (isAudioPlaying) {
      cosmicAudio.stop();
      setIsAudioPlaying(false);
    } else {
      cosmicAudio.playFrequency(currentMantra.frequencyHz);
      setIsAudioPlaying(true);
    }
  };

  const handleNextMantra = () => {
    setMantraIndex(prev => (prev + 1) % auraConfig.mantras.length);
    if (isAudioPlaying) {
      const nextIdx = (mantraIndex + 1) % auraConfig.mantras.length;
      cosmicAudio.playFrequency(auraConfig.mantras[nextIdx].frequencyHz);
    }
  };

  const handleCopy = () => {
    const textToCopy = `✦ Daily Cosmic Affirmation [${activeAura} • ${currentMantra.timeOfDay}] ✦\n\nSanskrit Mantra: ${currentMantra.sanskritMantra} (${currentMantra.sanskritPhonetic})\n\nAffirmation: "${currentMantra.affirmation}"\n\nResonance: ${currentMantra.frequencyHz} Hz • Deity: ${currentMantra.focusDeity} • Chakra: ${currentMantra.chakra}\n\n— Occult Science Institute Sanctum`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSealMantra = () => {
    setChantCount(prev => prev + 1);
    setIsSealed(true);

    try {
      cosmicAudio.playFrequency(currentMantra.frequencyHz);
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.65 },
        colors: [auraConfig.color, '#ffd700', '#ffffff', '#ff6b6b']
      });
    } catch {}

    setTimeout(() => {
      setIsSealed(false);
    }, 1800);
  };

  // Get current date string formatted
  const todayDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div 
      id="cosmic-affirmation-widget"
      className={`rounded-2xl p-5 sm:p-6 border shadow-xl relative overflow-hidden transition-all duration-500 ${
        isDark 
          ? `bg-gradient-to-br ${auraConfig.bgGradient} text-gray-100` 
          : 'bg-white/95 text-[#2c1d06]'
      }`}
      style={{
        borderColor: auraConfig.borderColor,
        boxShadow: `0 10px 30px -10px ${auraConfig.glowColor}`
      }}
    >
      {/* Background Sacred Geometrical Watermark */}
      <div 
        className="absolute -right-8 -bottom-8 w-44 h-44 opacity-10 pointer-events-none rounded-full border-8 animate-spin-slow"
        style={{ borderColor: auraConfig.color }}
      />
      <div 
        className="absolute right-4 top-4 text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border shadow-inner flex items-center gap-1.5"
        style={{
          backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)',
          borderColor: auraConfig.borderColor,
          color: auraConfig.color
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-ping inline-block" style={{ backgroundColor: auraConfig.color }} />
        <span>{activeAura} • {currentMantra.frequencyHz} Hz</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2.5">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner transition-transform group-hover:scale-105"
            style={{
              backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.9)',
              borderColor: auraConfig.borderColor,
              color: auraConfig.color
            }}
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-cinzel font-bold tracking-wide">
                Daily Cosmic Affirmation
              </h2>
            </div>
            <p className="text-[11px] font-serif opacity-75">
              {todayDateStr} • Tailored for {userName} ({auraConfig.archetype})
            </p>
          </div>
        </div>

        {/* Time of Day Switcher Pills */}
        <div className="flex items-center gap-1.5 bg-black/20 dark:bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
          {auraConfig.mantras.map((m, idx) => (
            <button
              key={m.timeOfDay}
              onClick={() => {
                setMantraIndex(idx);
                if (isAudioPlaying) {
                  cosmicAudio.playFrequency(m.frequencyHz);
                }
              }}
              className={`px-2.5 py-1 rounded-lg font-cinzel text-[10px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                mantraIndex === idx 
                  ? 'bg-gold-gradient text-gray-950 font-bold shadow' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {m.timeOfDay === 'Morning' && <Sun className="w-3 h-3" />}
              {m.timeOfDay === 'Midday' && <Flame className="w-3 h-3" />}
              {m.timeOfDay === 'Evening' && <Moon className="w-3 h-3" />}
              <span>{m.timeOfDay}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sanskrit Sacred Mantra Focus Box */}
      <div 
        className={`p-4 rounded-xl border mb-4 text-center relative overflow-hidden transition-all ${
          isDark 
            ? 'bg-black/60 border-amber-500/20' 
            : 'bg-amber-50/70 border-amber-200/80'
        }`}
      >
        <div className="text-[10px] font-cinzel tracking-widest uppercase text-amber-400 mb-1 flex items-center justify-center gap-1.5">
          <span>✦ Sanskrit Root Resonance ✦</span>
        </div>
        <div 
          className="text-lg sm:text-2xl font-serif font-bold tracking-wide my-1 transition-all"
          style={{ color: auraConfig.color }}
        >
          {currentMantra.sanskritMantra}
        </div>
        <div className="text-xs font-serif italic text-gray-400">
          "{currentMantra.sanskritPhonetic}"
        </div>
      </div>

      {/* Personalized Affirmation Text Block */}
      <div className="mb-4">
        <blockquote className="text-xs sm:text-sm md:text-base font-serif leading-relaxed italic border-l-2 pl-3 sm:pl-4 transition-all"
          style={{ borderColor: auraConfig.color }}
        >
          "{currentMantra.affirmation}"
        </blockquote>
      </div>

      {/* Cosmic Alignment Meta Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-[10px] font-serif">
        <div className={`p-2 rounded-lg border ${isDark ? 'bg-black/30 border-white/5' : 'bg-amber-50/50 border-amber-200/50'}`}>
          <span className="text-gray-400 block font-cinzel">Deity Focus</span>
          <span className="font-semibold truncate block" style={{ color: auraConfig.color }}>
            {currentMantra.focusDeity}
          </span>
        </div>
        <div className={`p-2 rounded-lg border ${isDark ? 'bg-black/30 border-white/5' : 'bg-amber-50/50 border-amber-200/50'}`}>
          <span className="text-gray-400 block font-cinzel">Chakra Vortex</span>
          <span className="font-semibold truncate block">
            {currentMantra.chakra}
          </span>
        </div>
        <div className={`p-2 rounded-lg border ${isDark ? 'bg-black/30 border-white/5' : 'bg-amber-50/50 border-amber-200/50'}`}>
          <span className="text-gray-400 block font-cinzel">Ruling Element</span>
          <span className="font-semibold truncate block">
            {currentMantra.element}
          </span>
        </div>
        <div className={`p-2 rounded-lg border ${isDark ? 'bg-black/30 border-white/5' : 'bg-amber-50/50 border-amber-200/50'}`}>
          <span className="text-gray-400 block font-cinzel">Core Benefit</span>
          <span className="font-semibold truncate block" title={currentMantra.benefits}>
            {currentMantra.benefits.split(',')[0]}
          </span>
        </div>
      </div>

      {/* Interactive Controls & Audio Chime */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-white/10">
        
        {/* Left Action Buttons: Chime & Affirm */}
        <div className="flex items-center gap-2">
          {/* Audio Chime Resonator Button */}
          <button
            id="affirmation-audio-chime-btn"
            onClick={handleToggleAudio}
            className={`px-3 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-1.5 border transition-all cursor-pointer shadow-sm ${
              isAudioPlaying
                ? 'bg-amber-500 text-gray-950 border-amber-400 animate-pulse'
                : (isDark ? 'bg-black/40 border-white/15 text-gray-200 hover:bg-white/10' : 'bg-white border-amber-200 text-[#422e06] hover:bg-amber-50')
            }`}
            title="Toggle Solfeggio Aura Frequency Chime"
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4 text-gray-950" /> : <VolumeX className="w-4 h-4 text-amber-400" />}
            <span>{isAudioPlaying ? 'Harmonizing...' : `Chime ${currentMantra.frequencyHz} Hz`}</span>
          </button>

          {/* Absorb & Seal Mantra Button */}
          <button
            id="affirmation-seal-mantra-btn"
            onClick={handleSealMantra}
            className="px-3.5 py-2 rounded-xl bg-gold-gradient text-gray-950 text-xs font-cinzel font-bold flex items-center gap-1.5 shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-gray-950" />
            <span>{isSealed ? '✨ Merged with Aura!' : `Absorb Mantra (${chantCount})`}</span>
          </button>
        </div>

        {/* Right Action Tools: Next Mantra & Copy */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleNextMantra}
            className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer flex items-center gap-1 ${
              isDark ? 'bg-black/30 border-white/10 hover:bg-white/10 text-gray-300' : 'bg-white border-amber-200 hover:bg-amber-50 text-[#3b2b0a]'
            }`}
            title="Cycle next alignment mantra"
          >
            <RotateCw className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline font-cinzel text-[10px]">Next Phase</span>
          </button>

          <button
            id="affirmation-copy-btn"
            onClick={handleCopy}
            className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer flex items-center gap-1 ${
              isDark ? 'bg-black/30 border-white/10 hover:bg-white/10 text-gray-300' : 'bg-white border-amber-200 hover:bg-amber-50 text-[#3b2b0a]'
            }`}
            title="Copy Affirmation"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
            <span className="hidden sm:inline font-cinzel text-[10px]">{copied ? 'Copied' : 'Share'}</span>
          </button>

          {onNavigateToPractice && (
            <button
              onClick={onNavigateToPractice}
              className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                isDark ? 'bg-black/30 border-white/10 hover:bg-white/10 text-gray-300' : 'bg-white border-amber-200 hover:bg-amber-50 text-[#3b2b0a]'
              }`}
              title="Open Quantum Japa Mala Practice"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline font-cinzel text-[10px]">Japa Mala</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
