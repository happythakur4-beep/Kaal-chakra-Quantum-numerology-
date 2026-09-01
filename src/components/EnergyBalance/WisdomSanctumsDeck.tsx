import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Flame, 
  BookOpen, 
  ChevronRight, 
  ShieldCheck, 
  Scroll, 
  Key, 
  Eye, 
  Compass, 
  Feather, 
  Sun, 
  HelpCircle,
  CheckCircle2,
  Lock,
  Unlock,
  Volume2,
  Activity
} from 'lucide-react';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import confetti from 'canvas-confetti';
import { SanctumProgressCircularIndicator } from '../SanctumProgressCircularIndicator';
import { sanctumTracker } from '../../utils/sanctumEngagementTracker';

interface SanctumHouse {
  id: string;
  name: string;
  crestTitle: string;
  motto: string;
  hindiTitle: string;
  element: string;
  primaryColor: string;
  borderColor: string;
  bgGradient: string;
  shadowColor: string;
  accentText: string;
  iconEmoji: string;
  overviewHeading: string;
  overviewDesc: string;
  loreStories: { title: string; desc: string; lesson: string }[];
  riddle: { question: string; answer: string; hint: string };
  fireplaceVibe: string;
}

const WISDOM_HOUSES: SanctumHouse[] = [
  {
    id: 'emerald-serpent',
    name: 'Serpent House of Prudence & Resourcefulness',
    crestTitle: 'THE MOST RESOURCEFUL OF THEM ALL',
    motto: 'Greatness belongs to those who transmute venom into divine medicine.',
    hindiTitle: 'नाग मण्डप • कुण्डलिनी शक्ति एवं गूढ़ विवेक',
    element: 'Prithvi & Jala (Earth & Kundalini Water)',
    primaryColor: 'emerald',
    borderColor: 'border-emerald-500/50',
    bgGradient: 'from-[#041a12]/95 via-[#02100a]/98 to-black/95',
    shadowColor: 'shadow-[0_0_40px_rgba(16,185,129,0.25)]',
    accentText: 'text-emerald-400',
    iconEmoji: '🐍',
    overviewHeading: 'WHAT MAKES US WHO WE ARE',
    overviewDesc: 'Step inside the candlelit subterranean chamber, where ancient green hearthfire warms rich leather sofas and emerald potion orbs.',
    loreStories: [
      {
        title: 'The Transmutation of Poison into Amrita',
        desc: 'Lord Shiva consumed the Halahala poison to preserve creation, demonstrating that supreme willpower transmutes darkness into universal light.',
        lesson: 'Resourcefulness is not cunning; it is the alchemical art of utilizing every obstacle as spiritual fuel.'
      },
      {
        title: 'The Awakening of Kundalini Serpent Energy',
        desc: 'Coiled at the Muladhara base, the primal serpent awakens through focused breath, ascending the Sushumna nadi toward crown illumination.',
        lesson: 'Ambition aligned with Dharma elevates both the individual and the cosmos.'
      }
    ],
    riddle: {
      question: 'I have no voice, yet I speak to all souls. I strike without limbs, and heal without medicine. The wise master me, while the fool is devoured by me. What am I?',
      answer: 'The Subconscious Mind (चित्त)',
      hint: 'It is the invisible serpent of your internal thoughts.'
    },
    fireplaceVibe: 'Emerald Green Embers with Cedarwood Aroma'
  },
  {
    id: 'sapphire-eagle',
    name: 'Eagle House of Infinite Cosmic Wisdom',
    crestTitle: 'RAVENCLAW • NEVER STOP LEARNING',
    motto: 'Wit beyond measure is human’s greatest treasure.',
    hindiTitle: 'गरुड़ मण्डप • विशुद्ध प्रज्ञा एवं दिव्य चक्षु',
    element: 'Vayu & Akasha (Air & Cosmic Ether)',
    primaryColor: 'sky',
    borderColor: 'border-cyan-500/50',
    bgGradient: 'from-[#061426]/95 via-[#030a14]/98 to-black/95',
    shadowColor: 'shadow-[0_0_40px_rgba(6,182,212,0.25)]',
    accentText: 'text-cyan-400',
    iconEmoji: '🦅',
    overviewHeading: 'WHAT MAKES US WHO WE ARE',
    overviewDesc: 'Perched in the highest celestial tower, arched Gothic windows reveal starry constellations and moonlit mists, surrounded by leather tomes.',
    loreStories: [
      {
        title: 'Garuda’s Flight Beyond Celestial Spheres',
        desc: 'Garuda soared through the celestial planetary spheres carrying Lord Vishnu, seeing the infinite expanse of time without attachment.',
        lesson: 'True intellect does not collect facts; it observes reality with unclouded eagle vision.'
      },
      {
        title: 'The Architecture of the Roman Memory Palace',
        desc: 'Ancient mystics stored thousands of Vedic verses by building luminous mental sanctuaries within their own minds.',
        lesson: 'A disciplined mind can recall any truth across lifetimes.'
      }
    ],
    riddle: {
      question: 'What belongs to you, but others use it far more often than you do?',
      answer: 'Your Name (नाम संस्कार)',
      hint: 'Given at birth, spoken by the world.'
    },
    fireplaceVibe: 'Sapphire Blue Roaring Flames with Lavender Essence'
  },
  {
    id: 'golden-phoenix',
    name: 'Phoenix House of Solar Bravery & Truth',
    crestTitle: 'THE SOLAR PHOENIX • REBIRTH IN ADVERSITY',
    motto: 'From the ashes of trial, the golden soul ascends immortal.',
    hindiTitle: 'सूर्य मण्डप • शौर्य, तेज एवं सत्य निष्ठा',
    element: 'Agni (Solar Sacred Fire)',
    primaryColor: 'amber',
    borderColor: 'border-amber-500/50',
    bgGradient: 'from-[#221004]/95 via-[#120702]/98 to-black/95',
    shadowColor: 'shadow-[0_0_40px_rgba(245,158,11,0.3)]',
    accentText: 'text-amber-400',
    iconEmoji: '🦅',
    overviewHeading: 'WHAT MAKES US WHO WE ARE',
    overviewDesc: 'Drenched in warm golden sunlight and crackling hearthfires, celebrating unwavering courage, integrity, and self-sacrifice.',
    loreStories: [
      {
        title: 'The Trial of Harishchandra: Unbending Satya',
        desc: 'King Harishchandra sacrificed throne, wealth, and worldly comfort rather than speaking a single lie, sanctifying universal truth.',
        lesson: 'Bravery is not absence of fear; it is the refusal to compromise truth for comfort.'
      }
    ],
    riddle: {
      question: 'Feed me and I will live, give me a drink and I will die. What am I?',
      answer: 'Sacred Fire (अग्नि Agni)',
      hint: 'It burns in the hearth and consumes all illusions.'
    },
    fireplaceVibe: 'Golden Sunlit Hearth with Frankincense & Sandalwood'
  },
  {
    id: 'amethyst-lotus',
    name: 'Lotus House of Steadfast Kindness & Devotion',
    crestTitle: 'KINDNESS IS NEVER WASTED • IT FINDS ITS WAY BACK',
    motto: 'Where love is boundless, karmic balance is eternally restored.',
    hindiTitle: 'कमल मण्डप • करुणा, निष्काम सेवा एवं समर्पण',
    element: 'Jala (Pure Nectar Waters)',
    primaryColor: 'purple',
    borderColor: 'border-purple-500/50',
    bgGradient: 'from-[#1c0828]/95 via-[#0e0414]/98 to-black/95',
    shadowColor: 'shadow-[0_0_40px_rgba(168,85,247,0.3)]',
    accentText: 'text-purple-400',
    iconEmoji: '🪷',
    overviewHeading: 'WHAT MAKES US WHO WE ARE',
    overviewDesc: 'A tranquil sunlit conservatory draped with blooming orchids, water fountains, and plush velvet armchairs radiating compassionate peace.',
    loreStories: [
      {
        title: 'The Story of King Rantideva’s Final Cup of Water',
        desc: 'After 48 days of famine, King Rantideva gave his last morsel of food and final drop of water to an outcast dog, realizing God in all life.',
        lesson: 'True greatness is measured by how gently you touch the fragile souls of this world.'
      }
    ],
    riddle: {
      question: 'I grow in the murkiest mud, yet not a single speck of dirt clings to my skin. What am I?',
      answer: 'The Sacred Lotus (कमल)',
      hint: 'The emblem of pristine spiritual purity.'
    },
    fireplaceVibe: 'Violet Aetheric Glow with Rosewater & Lotus Blossom'
  }
];

export const WisdomSanctumsDeck: React.FC = () => {
  const [activeHouseId, setActiveHouseId] = useState<string>('emerald-serpent');
  const [isRiddleRevealed, setIsRiddleRevealed] = useState<boolean>(false);
  const [userGuess, setUserGuess] = useState<string>('');
  const [isFireplaceLit, setIsFireplaceLit] = useState<boolean>(true);

  const currentHouse = WISDOM_HOUSES.find(h => h.id === activeHouseId) || WISDOM_HOUSES[0];

  const handleSwitchHouse = (houseId: string) => {
    setActiveHouseId(houseId);
    setIsRiddleRevealed(false);
    setUserGuess('');
    sanctumTracker.recordVisit(houseId);
    try {
      cosmicAudio.playCosmicChime(528);
    } catch {}
  };

  const handleSolveRiddle = () => {
    setIsRiddleRevealed(true);
    sanctumTracker.recordAction(activeHouseId, 'Solved Sacred Sanctuary Riddle', 45);
    try {
      cosmicAudio.playCosmicChime(741);
      confetti({
        particleCount: 50,
        spread: 70,
        colors: ['#ffd700', '#10b981', '#06b6d4', '#ec4899']
      });
    } catch {}
  };

  return (
    <div 
      id="wisdom-sanctums-deck"
      className="rounded-3xl border-2 border-amber-500/40 bg-black/90 p-5 sm:p-8 space-y-7 shadow-[0_0_50px_rgba(245,158,11,0.2)] relative overflow-hidden"
    >
      {/* Header Deck Navigation */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-amber-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-[11px] font-mono text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>रहस्यमय विद्या मण्डप • 4 SACRED ASTRAL SANCTUARIES</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white mt-1">
            Common Room Sanctuaries & Esoteric Wisdom
          </h3>
        </div>

        {/* 4 House Tab Selectors with Circular Engagement Indicators */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 w-full md:w-auto">
          {WISDOM_HOUSES.map((house) => (
            <button
              key={house.id}
              onClick={() => handleSwitchHouse(house.id)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeHouseId === house.id
                  ? 'bg-amber-500 text-black shadow-[0_0_18px_rgba(245,158,11,0.6)]'
                  : 'bg-black/60 border border-white/10 text-slate-300 hover:border-amber-400'
              }`}
            >
              <span>{house.iconEmoji}</span>
              <span>{house.name.split(' ')[0]}</span>
              <SanctumProgressCircularIndicator
                portalId={house.id}
                size={22}
                strokeWidth={2.5}
                theme="dark"
                showTooltip={false}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Atmospheric Common Room Showcase Stage (Directly Inspired by Images 4 & 5) */}
      <motion.div
        key={currentHouse.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`rounded-3xl p-6 sm:p-8 md:p-10 border-2 ${currentHouse.borderColor} bg-gradient-to-br ${currentHouse.bgGradient} ${currentHouse.shadowColor} space-y-8 relative overflow-hidden`}
      >
        {/* Subtle Ambient Orb Glow */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top House Crest & Motto with Circular Progress Indicator */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-xs font-mono flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full bg-black/60 border border-white/10 ${currentHouse.accentText} font-bold`}>
                {currentHouse.hindiTitle}
              </span>
              <span className="text-slate-400">• Element: {currentHouse.element}</span>
            </div>

            <div className="flex items-center gap-4">
              <h4 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-white tracking-wide">
                {currentHouse.crestTitle}
              </h4>
              <div className="shrink-0" title="Sanctum Mastery Progress">
                <SanctumProgressCircularIndicator
                  portalId={currentHouse.id}
                  size={38}
                  strokeWidth={3.5}
                  theme="dark"
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 italic max-w-xl font-mono">
              "{currentHouse.motto}"
            </p>
          </div>

          {/* Fireplace Hearth Vibe Controller */}
          <div className="flex items-center gap-3 bg-black/60 p-3 rounded-2xl border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-orange-950/80 border border-orange-500/40 flex items-center justify-center">
              <Flame className={`w-5 h-5 ${isFireplaceLit ? 'text-orange-400 animate-pulse' : 'text-slate-600'}`} />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Common Room Hearth</div>
              <div className="text-xs font-mono text-amber-300">{currentHouse.fireplaceVibe}</div>
            </div>
            <button
              onClick={() => {
                setIsFireplaceLit(!isFireplaceLit);
                try {
                  cosmicAudio.playCosmicChime(432);
                } catch {}
              }}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-mono text-white ml-2"
            >
              {isFireplaceLit ? 'Douse' : 'Ignite'}
            </button>
          </div>
        </div>

        {/* Middle Section: "WHAT MAKES US WHO WE ARE" & Stories Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Left Wing: Stories & Core Philosophy */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <div className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                {currentHouse.overviewHeading}
              </div>
              <h5 className="text-lg sm:text-xl font-cinzel font-bold text-white">
                Stories of Our Brightest Masters
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {currentHouse.overviewDesc}
              </p>
            </div>

            {/* Accordion-Style Story Cards */}
            <div className="space-y-3 pt-2">
              {currentHouse.loreStories.map((story, i) => (
                <div 
                  key={i}
                  className="p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-amber-500/40 transition-all space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className={`w-4 h-4 ${currentHouse.accentText}`} />
                    <h6 className="text-xs font-cinzel font-bold text-white">
                      {story.title}
                    </h6>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    {story.desc}
                  </p>
                  <div className="text-[10px] font-mono text-amber-300/90 bg-amber-950/40 p-2 rounded-lg border border-amber-500/20">
                    💡 <strong>Key Lesson:</strong> {story.lesson}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Wing: Interactive Sphinx Riddle / Wisdom Trial */}
          <div className="lg:col-span-5 space-y-4 bg-black/70 p-5 rounded-3xl border border-white/15">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" />
                <h6 className="text-xs font-cinzel font-bold text-white">
                  Common Room Doorway Riddle
                </h6>
              </div>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-500/30">
                Solve to Enter
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-200 font-mono italic leading-relaxed bg-black/50 p-3.5 rounded-2xl border border-white/5">
                "{currentHouse.riddle.question}"
              </p>

              <div className="text-[10px] font-mono text-slate-400">
                🔍 <strong>Clue:</strong> {currentHouse.riddle.hint}
              </div>

              {!isRiddleRevealed ? (
                <div className="space-y-2 pt-1">
                  <input
                    type="text"
                    placeholder="Enter your guess (or reveal)..."
                    value={userGuess}
                    onChange={(e) => setUserGuess(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/20 text-white placeholder-slate-500 text-xs font-mono focus:border-amber-400 focus:outline-none"
                  />
                  <button
                    onClick={handleSolveRiddle}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-cinzel font-bold text-xs shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Unlock className="w-4 h-4 text-black" />
                    <span>Solve & Unlock Chamber Truth</span>
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-400/60 space-y-2 text-center"
                >
                  <div className="text-xs font-mono text-emerald-300 font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Riddle Solved • Chamber Unlocked!</span>
                  </div>
                  <div className="text-sm font-cinzel font-bold text-amber-300">
                    Answer: {currentHouse.riddle.answer}
                  </div>
                  <p className="text-[11px] font-mono text-slate-200">
                    "Wisdom acknowledged. May your energy resonate in pure cosmic harmony."
                  </p>
                </motion.div>
              )}
            </div>

          </div>

        </div>

      </motion.div>

    </div>
  );
};
