import React, { useState } from 'react';
import { ThemeMode } from '../../types';
import { NAKSHATRA_SYLLABLES, VEDIC_BABY_NAMES_DB, BabyNameItem, CHALDEAN_MAP, reduceToSingleDigit } from '../../utils/astrologyEngine';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import {
  Sparkles,
  Heart,
  Baby,
  Search,
  Filter,
  Calculator,
  Star,
  CheckCircle2,
  Bookmark,
  Share2,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BabyNamesScreenProps {
  theme: ThemeMode;
}

export const BabyNamesScreen: React.FC<BabyNamesScreenProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [selectedNakshatra, setSelectedNakshatra] = useState<string>('Rohini');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Boy' | 'Girl'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customNameInput, setCustomNameInput] = useState<string>('');
  const [bookmarkedNames, setBookmarkedNames] = useState<string[]>(['Aarav', 'Saanvi']);

  const currentNakshatraInfo = NAKSHATRA_SYLLABLES[selectedNakshatra] || NAKSHATRA_SYLLABLES['Rohini'];

  // Custom name numerology calculation
  const getChaldeanScore = (n: string) => {
    const clean = n.toUpperCase().replace(/[^A-Z]/g, '');
    let total = 0;
    for (let i = 0; i < clean.length; i++) {
      total += CHALDEAN_MAP[clean[i]] || 1;
    }
    return { compound: total, single: reduceToSingleDigit(total) };
  };

  const customScore = customNameInput ? getChaldeanScore(customNameInput) : null;

  // Filtered names
  const filteredNames = VEDIC_BABY_NAMES_DB.filter(item => {
    const matchesGender = genderFilter === 'All' || item.gender === genderFilter;
    const matchesQuery = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hindiName.includes(searchQuery);
    return matchesGender && matchesQuery;
  });

  const toggleBookmark = (name: string) => {
    try {
      cosmicAudio.playFrequency(432);
    } catch {}
    setBookmarkedNames(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 py-6 md:py-10">
      
      {/* Top Hero */}
      <div className="text-center mb-8">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 text-xs font-cinzel tracking-wider text-[#d4af37]"
          style={{
            backgroundColor: isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(197, 160, 89, 0.15)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(197, 160, 89, 0.4)',
          }}
        >
          <Baby className="w-3.5 h-3.5" />
          <span>Vedic Naamkaran Sanskar & Nakshatra Syllables</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-3xl-gold tracking-wide uppercase mb-2">
          Vedic Baby Names & Naamkaran
        </h1>
        <p className={`text-xs sm:text-sm font-serif max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}>
          Find auspicious baby boy and baby girl names based on Janma Nakshatra Padas, Rashi syllables, and Chaldean Name Numerology.
        </p>
      </div>

      {/* Nakshatra Syllable Finder Bar */}
      <div
        className="p-5 rounded-2xl border mb-8 shadow-lg"
        style={{
          backgroundColor: isDark ? 'rgba(18, 18, 28, 0.85)' : 'rgba(255, 252, 245, 0.95)',
          borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.5)',
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#d4af37]/30 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#d4af37]" />
            <h3 className="font-cinzel text-sm font-bold text-amber-100">
              Nakshatra Syllable Calculator (प्रथम अक्षर निर्धारण)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-cinzel text-gray-300">Janma Nakshatra:</label>
            <select
              value={selectedNakshatra}
              onChange={(e) => setSelectedNakshatra(e.target.value)}
              className="px-3 py-1.5 rounded-lg border text-xs font-serif bg-black/40 border-[#d4af37]/40 text-amber-100 outline-none cursor-pointer"
            >
              {Object.keys(NAKSHATRA_SYLLABLES).map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Syllables Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {currentNakshatraInfo.syllables.map((syl, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-[#d4af37]/30 bg-black/40 text-center"
            >
              <div className="text-[10px] font-cinzel text-gray-400 uppercase">Pada {idx + 1} Akshar</div>
              <div className="text-2xl font-cinzel font-bold text-3xl-gold my-1">{syl}</div>
              <div className="text-[10px] text-amber-200/80 font-serif">Rashi: {currentNakshatraInfo.rashi}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Custom Name Numerology Calculator */}
      <div
        className="p-5 rounded-2xl border mb-8 shadow-lg"
        style={{
          backgroundColor: isDark ? 'rgba(18, 18, 28, 0.85)' : 'rgba(255, 252, 245, 0.95)',
          borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.5)',
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="w-4 h-4 text-[#d4af37]" />
          <h3 className="font-cinzel text-sm font-bold text-amber-100">
            Check Chaldean Numerology for Any Name
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div className="sm:col-span-2">
            <input
              type="text"
              value={customNameInput}
              onChange={(e) => setCustomNameInput(e.target.value)}
              placeholder="Type any proposed baby name (e.g. Reyansh, Ananya)..."
              className="w-full px-4 py-2.5 rounded-xl border text-xs font-serif bg-black/40 border-[#d4af37]/40 text-amber-100 outline-none"
            />
          </div>

          <div className="p-3 rounded-xl border border-[#d4af37]/30 bg-black/50 text-center">
            {customScore ? (
              <div className="flex items-center justify-around">
                <div>
                  <div className="text-[10px] text-gray-400 font-cinzel">Compound</div>
                  <div className="text-xl font-cinzel font-bold text-[#d4af37]">{customScore.compound}</div>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div>
                  <div className="text-[10px] text-gray-400 font-cinzel">Single Digit</div>
                  <div className="text-xl font-cinzel font-bold text-emerald-400">{customScore.single}</div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-gray-500 font-serif">Enter a name to evaluate</div>
            )}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          {['All', 'Boy', 'Girl'].map(g => (
            <button
              key={g}
              onClick={() => setGenderFilter(g as any)}
              className={`px-3.5 py-1.5 rounded-lg font-cinzel text-xs font-bold transition-all cursor-pointer ${
                genderFilter === g
                  ? 'bg-gold-gradient text-gray-900 shadow-md'
                  : 'border border-[#d4af37]/30 text-amber-200 hover:bg-[#d4af37]/10'
              }`}
            >
              {g === 'All' ? 'All Genders' : g === 'Boy' ? '👦 Baby Boys' : '👧 Baby Girls'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs bg-black/30 border-[#d4af37]/40 w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#d4af37]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name or meaning..."
            className="w-full bg-transparent outline-none font-serif text-amber-100"
          />
        </div>
      </div>

      {/* Names Database Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNames.map((item, idx) => {
          const isBookmarked = bookmarkedNames.includes(item.name);
          return (
            <div
              key={idx}
              className="p-4 rounded-xl border shadow-md flex flex-col justify-between transition-all hover:scale-[1.01]"
              style={{
                backgroundColor: isDark ? 'rgba(18, 18, 28, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.45)',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-base font-bold text-amber-100">{item.name}</span>
                    <span className="text-xs font-serif text-[#d4af37] font-bold">({item.hindiName})</span>
                  </div>
                  <button
                    onClick={() => toggleBookmark(item.name)}
                    className="p-1 rounded text-gray-400 hover:text-amber-200 cursor-pointer"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#d4af37] text-[#d4af37]' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    item.gender === 'Boy' ? 'bg-blue-500/20 text-blue-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {item.gender}
                  </span>
                  <span className="text-[10px] font-serif text-gray-400">{item.rashi}</span>
                </div>

                <p className="text-xs font-serif text-gray-300 leading-relaxed mb-3">{item.meaning}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono border-t border-white/5 pt-2 text-gray-400">
                <span>Start: <strong className="text-amber-200">{item.startingLetter}</strong></span>
                <span>Numerology: <strong className="text-emerald-400">{item.numerologyNumber}</strong></span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
