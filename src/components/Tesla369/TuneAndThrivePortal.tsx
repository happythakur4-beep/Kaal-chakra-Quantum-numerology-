import React, { useState, useMemo } from 'react';
import {
  TUNE_AND_THRIVE_CARDS,
  TUNE_AND_THRIVE_CATEGORIES,
  TuneAndThriveCard,
} from '../../data/tuneAndThriveData';
import { TuneAndThriveCardModal } from './TuneAndThriveCardModal';
import { SacredGeometryLiveCanvas } from './SacredGeometryLiveCanvas';
import { ChakraEnergyScanner } from './ChakraEnergyScanner';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import {
  Search,
  Sparkles,
  Radio,
  Play,
  Pause,
  Eye,
  Activity,
  Coins,
  Zap,
  Flower,
  Heart,
  ChevronRight,
  Sliders,
  Volume2,
} from 'lucide-react';
import { motion } from 'motion/react';

export const TuneAndThrivePortal: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCard, setSelectedCard] = useState<TuneAndThriveCard | null>(null);
  const [playingCardId, setPlayingCardId] = useState<string | null>(null);
  const [activeMasterChord, setActiveMasterChord] = useState<string | null>(null);

  // Filtered Cards
  const filteredCards = useMemo(() => {
    return TUNE_AND_THRIVE_CARDS.filter((card) => {
      const matchesCat =
        selectedCategory === 'all' || card.category === selectedCategory;
      const matchesSearch =
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (card.highlightNumber && card.highlightNumber.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handlePlayCardAudio = (e: React.MouseEvent, card: TuneAndThriveCard) => {
    e.stopPropagation();
    if (playingCardId === card.id) {
      cosmicAudio.stop();
      setPlayingCardId(null);
    } else {
      setPlayingCardId(card.id);
      if (card.audioMode === 'schumann') {
        cosmicAudio.playSchumannResonance(6);
      } else if (card.audioMode === 'chord' && card.frequenciesChord) {
        cosmicAudio.playChord(card.frequenciesChord, 6);
      } else {
        cosmicAudio.playTeslaFrequency(card.frequencyHz, 6);
      }

      setTimeout(() => {
        setPlayingCardId(null);
      }, 6000);
    }
  };

  const handleTriggerQuickChord = (chordType: string) => {
    if (activeMasterChord === chordType) {
      cosmicAudio.stop();
      setActiveMasterChord(null);
    } else {
      setActiveMasterChord(chordType);
      if (chordType === 'sleep') cosmicAudio.playDeepSleepChord(8);
      else if (chordType === 'abundance') cosmicAudio.playLimitlessAbundanceChord(8);
      else if (chordType === 'schumann') cosmicAudio.playSchumannResonance(8);
      else if (chordType === 'pineal') cosmicAudio.playExpandedAwarenessChord(8);
      else if (chordType === 'dna') cosmicAudio.playTeslaFrequency(528, 8);
      else if (chordType === 'pain') cosmicAudio.playTeslaFrequency(174, 8);

      setTimeout(() => {
        setActiveMasterChord(null);
      }, 8000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Detail Modal */}
      {selectedCard && (
        <TuneAndThriveCardModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}

      {/* Hero Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-10 border border-[#ffd700]/40 bg-gradient-to-b from-[#181135] via-[#090814] to-black shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full border border-amber-400/50 bg-amber-400/15 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              TUNE & THRIVE FREQUENCY ARCHIVE
            </span>
            <span className="px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-xs font-mono font-bold">
              High-Fidelity Audio & Science
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-[#fdf2d1] leading-tight">
            Cosmic Frequency Synthesizer & Quantum Knowledge Vault
          </h2>

          <p className="text-xs sm:text-sm font-serif text-gray-300 leading-relaxed">
            Synthesizing ancient Vedic cosmology, Nikola Tesla's 3-6-9 vortex code, Solfeggio acoustic chords, and modern biophysics into an interactive portal of sound, sacred geometry, and somatic resets.
          </p>

          {/* Quick Sound Chords Synthesizer Bar */}
          <div className="pt-2">
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-2 font-bold">
              Instant Master Harmonic Soundboard
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'sleep', label: '🌙 Deep Sleep 432Hz / 3.9Hz', color: 'from-indigo-600 to-blue-600' },
                { id: 'abundance', label: '💰 Limitless Abundance 888Hz / 528Hz', color: 'from-yellow-600 to-amber-600' },
                { id: 'schumann', label: '🌍 Schumann Heartbeat 7.83Hz', color: 'from-emerald-600 to-teal-600' },
                { id: 'pineal', label: '👁️ Pineal DMT 963Hz / 852Hz', color: 'from-purple-600 to-violet-600' },
                { id: 'dna', label: '🧬 DNA Miracle 528Hz', color: 'from-green-600 to-emerald-600' },
                { id: 'pain', label: '🕊️ Pain Relief 174Hz', color: 'from-cyan-600 to-sky-600' },
              ].map((chord) => (
                <button
                  key={chord.id}
                  onClick={() => handleTriggerQuickChord(chord.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    activeMasterChord === chord.id
                      ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse'
                      : 'bg-white/10 hover:bg-white/20 text-gray-200 border-white/10'
                  }`}
                >
                  {activeMasterChord === chord.id ? (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  )}
                  <span>{chord.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Tabs */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search frequencies (e.g. 888, 963Hz, Pineal, Venus, Sleep)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-black/60 border border-white/15 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-all font-serif"
            />
          </div>

          <span className="text-xs font-mono text-gray-400 self-center">
            Showing <strong className="text-amber-300">{filteredCards.length}</strong> Sacred Transmissions
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {TUNE_AND_THRIVE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-cinzel font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#ffd700] text-black shadow-[0_0_15px_rgba(255,215,0,0.4)]'
                    : 'bg-black/40 text-gray-400 hover:text-gray-200 border border-white/10 hover:border-white/20'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => {
          const isPlayingThis = playingCardId === card.id;

          return (
            <motion.div
              key={card.id}
              whileHover={{ y: -4, scale: 1.01 }}
              onClick={() => setSelectedCard(card)}
              className="group relative rounded-3xl border border-white/15 bg-gradient-to-b from-white/5 via-black/60 to-black p-5 flex flex-col justify-between transition-all cursor-pointer hover:border-[#ffd700]/60 hover:shadow-[0_0_25px_rgba(255,215,0,0.2)] overflow-hidden"
            >
              {/* Header Badges */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-wider">
                  {card.categoryLabel}
                </span>

                {card.highlightNumber && (
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-mono font-black border"
                    style={{
                      borderColor: card.visualTheme.primaryColor,
                      color: card.visualTheme.primaryColor,
                      backgroundColor: `${card.visualTheme.primaryColor}15`,
                    }}
                  >
                    {card.highlightNumber}
                  </span>
                )}
              </div>

              {/* Visual Center Preview: Live Procedural Sacred Canvas */}
              <div className="py-4 flex items-center justify-center">
                <div className="relative group-hover:scale-105 transition-transform duration-300">
                  <SacredGeometryLiveCanvas
                    type={
                      card.visualTheme.orbType === 'sacred-flower'
                        ? 'flower-of-life'
                        : card.visualTheme.orbType === 'venus-rose'
                        ? 'venus-rose'
                        : card.visualTheme.orbType === 'spiral'
                        ? 'fibonacci-spiral'
                        : card.visualTheme.orbType === 'pineal'
                        ? 'pineal-dmt'
                        : card.visualTheme.orbType === 'chakras'
                        ? 'chakras'
                        : card.visualTheme.orbType === 'gold-sphere'
                        ? 'gold-sphere'
                        : 'torus-field'
                    }
                    primaryColor={card.visualTheme.primaryColor}
                    glowColor={card.visualTheme.glowColor}
                    frequencyHz={card.frequencyHz}
                    size={170}
                  />

                  {/* Play Overlay Button */}
                  <button
                    onClick={(e) => handlePlayCardAudio(e, card)}
                    className={`absolute inset-0 m-auto w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xl ${
                      isPlayingThis
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'bg-black/60 text-amber-300 hover:bg-[#ffd700] hover:text-black border border-white/20'
                    }`}
                  >
                    {isPlayingThis ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Content Texts */}
              <div className="space-y-2 py-2">
                <span className="text-[11px] font-mono text-cyan-300 font-bold block">
                  {card.subtitle}
                </span>
                <h3 className="text-base font-cinzel font-bold text-[#fdf2d1] line-clamp-2 leading-snug group-hover:text-[#ffd700] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs font-serif text-gray-300 line-clamp-2 leading-relaxed">
                  {card.quote}
                </p>
              </div>

              {/* Footer Bar */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-gray-400 font-bold">
                  {card.frequencyHz} Hz • {card.likesCount} resonant
                </span>
                <span className="text-amber-300 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Deeply</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 7 Energy Centers Biofield Diagnostics Section */}
      <ChakraEnergyScanner />
    </div>
  );
};
