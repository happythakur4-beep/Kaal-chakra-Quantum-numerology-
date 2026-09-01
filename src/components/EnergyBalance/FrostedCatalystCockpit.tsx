import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Sun, 
  TreePine, 
  Send, 
  Copy, 
  Check, 
  Volume2, 
  Compass, 
  Radio, 
  Share2, 
  Eye, 
  Layers,
  Heart,
  Star
} from 'lucide-react';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

export const FrostedCatalystCockpit: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeIntentIndex, setActiveIntentIndex] = useState<number>(0);
  const [activePromptTab, setActivePromptTab] = useState<'prompt' | 'vows' | 'gallery'>('prompt');

  const catalystPrompts = [
    {
      title: 'Sunlight Penetrating the Sacred Forest (528Hz Epigenetics)',
      keyword: 'SUNLIGHT PENETRATING THE FOREST • 528HZ SACRED LOTUS',
      prompt: '"Digital illustration, Sunlight penetrating a dense mystical forest with tall ancient trees and rich emerald foliage, rays of sunlight creating a magical sacred atmosphere with soft golden hues, golden lotuses floating in pristine waters, solfeggio light particles. Unreal Engine 5, 8k resolution, cinematic lighting."',
      vibe: 'Forest Solar Awakening'
    },
    {
      title: 'The Golden Scales of Karmic Balance & Lotus Bloom',
      keyword: 'LIBRA SCALES • GOLDEN CORONA • BLOOMING LOTUS',
      prompt: '"Ornate antique brass balance scales standing in a sunlit twilight grove, glowing golden solar mandala corona radiating at the apex, pink and golden lotuses resting gently upon both balancing pans, golden butterflies fluttering around, hyper-detailed fantasy realism."',
      vibe: 'Cosmic Equilibrium'
    },
    {
      title: 'The Dual Paths: Stormy Friction vs. Golden Sunrise Trail',
      keyword: 'CHOOSE YOUR ENERGY • KARMA RETURNS • DUAL TRAIL',
      prompt: '"Cinematic split landscape: on the left a dark stormy mountain cliff with chains and lightning, on the right a radiant sunlit forest path with golden steps and soaring white doves, traveler standing at the crossroads facing the golden lake sunrise."',
      vibe: 'Catalyst Destiny'
    }
  ];

  const catalystVows = [
    {
      vow: 'Be the reason someone believes in good people.',
      author: '#CATALYST IN LIFE',
      color: 'from-amber-500/20 to-yellow-500/20',
      border: 'border-amber-400/40'
    },
    {
      vow: 'Kindness is never wasted. It always finds its way back.',
      author: 'SACRED KARMIC LAW',
      color: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-400/40'
    },
    {
      vow: 'What you give to life, life gives back. So choose wisely.',
      author: 'BHAGAVAD GITA 4.11',
      color: 'from-purple-500/20 to-indigo-500/20',
      border: 'border-purple-400/40'
    },
    {
      vow: 'Your Today • Your Choices • Your Tomorrow.',
      author: 'COSMIC TIMELESS TRUTH',
      color: 'from-rose-500/20 to-pink-500/20',
      border: 'border-rose-400/40'
    }
  ];

  const currentPrompt = catalystPrompts[activeIntentIndex];

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentPrompt.prompt);
    setCopied(true);
    try {
      cosmicAudio.playCosmicChime(528);
      confetti({
        particleCount: 40,
        spread: 60,
        colors: ['#ffd700', '#f59e0b', '#10b981']
      });
    } catch {}
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      id="frosted-catalyst-cockpit"
      className="relative rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-amber-500/30 bg-black/60 backdrop-blur-2xl shadow-[0_0_50px_rgba(245,158,11,0.2)] overflow-hidden"
    >
      {/* Sunlit Forest Ambient Background Image Illusion */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-black/80 to-black pointer-events-none" />

      <div className="relative z-10 space-y-6">
        
        {/* Top Header Floating Bar (Directly Inspired by Image 3) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                PROMPT & INTENTION COCKPIT
              </span>
              <span className="text-xs font-mono text-emerald-400">Frosted Glass Studio</span>
            </div>
            <h4 className="text-lg sm:text-xl font-cinzel font-bold text-white mt-1">
              OPTIMASI PROMPT & SACRED ENERGY MANIFESTATION
            </h4>
          </div>

          {/* Tab Navigation Chips */}
          <div className="flex items-center gap-2">
            {[
              { id: 'prompt', label: 'Prompt Engine' },
              { id: 'vows', label: 'Catalyst Vows' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActivePromptTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activePromptTab === tab.id
                    ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                    : 'bg-black/60 border border-white/10 text-slate-300 hover:border-amber-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content View Based on Active Tab */}
        {activePromptTab === 'prompt' ? (
          <div className="space-y-4">
            
            {/* Prompt Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {catalystPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIntentIndex(idx);
                    try {
                      cosmicAudio.playFrequency(432);
                    } catch {}
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                    activeIntentIndex === idx
                      ? 'bg-amber-950/90 border border-amber-400 text-amber-300 font-bold shadow'
                      : 'bg-black/40 border border-white/10 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {p.vibe}
                </button>
              ))}
            </div>

            {/* Glass Prompt Box (Inspired by Image 3 layout) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-black/80 border border-amber-500/30 space-y-4 shadow-inner">
              
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-400">KEYWORD :</div>
                <div className="text-xs sm:text-sm font-mono font-bold text-amber-300">
                  {currentPrompt.keyword}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase text-slate-400">PROMPT :</div>
                <p className="text-xs sm:text-sm text-slate-200 font-mono italic leading-relaxed pt-1 select-all">
                  {currentPrompt.prompt}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ready for AI Art & Meditation Generation</span>
                </span>

                <button
                  onClick={handleCopyPrompt}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-black" />
                      <span>Copy AI Prompt</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        ) : (
          /* Catalyst Vows Grid (Direct from Image 6) */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {catalystVows.map((v, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl bg-gradient-to-br ${v.color} border ${v.border} space-y-2 flex flex-col justify-between`}
              >
                <p className="text-sm font-cinzel font-bold text-white leading-relaxed">
                  "{v.vow}"
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-amber-300 pt-2 border-t border-white/10">
                  <span>{v.author}</span>
                  <span>⚜</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
