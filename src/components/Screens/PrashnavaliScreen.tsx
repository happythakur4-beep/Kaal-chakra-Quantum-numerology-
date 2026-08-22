import React, { useState } from 'react';
import { ThemeMode } from '../../types';
import { PRASHNAVALI_GRID, RAMCHARITMANAS_CHAUPAIS, PrashnavaliAnswer } from '../../utils/astrologyEngine';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import {
  Sparkles,
  Flame,
  Crown,
  Heart,
  HelpCircle,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Scroll,
  Volume2,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PrashnavaliScreenProps {
  theme: ThemeMode;
}

export const PrashnavaliScreen: React.FC<PrashnavaliScreenProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [selectedLetter, setSelectedLetter] = useState<{ r: number; c: number; char: string } | null>(null);
  const [result, setResult] = useState<PrashnavaliAnswer | null>(null);
  const [isConsulting, setIsConsulting] = useState(false);

  const handleCellClick = (r: number, c: number, char: string) => {
    try {
      cosmicAudio.playFrequency(528);
    } catch {}

    setSelectedLetter({ r, c, char });
    setIsConsulting(true);

    // Compute deterministic 1 to 9 chaupai based on position
    const chaupaiId = (((r * 15 + c) % 9) + 1);
    const ans = RAMCHARITMANAS_CHAUPAIS[chaupaiId] || RAMCHARITMANAS_CHAUPAIS[1];

    setTimeout(() => {
      setResult(ans);
      setIsConsulting(false);
      try {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      } catch {}
    }, 600);
  };

  const handleReset = () => {
    setSelectedLetter(null);
    setResult(null);
  };

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto px-2 sm:px-4 lg:px-8 py-6 md:py-10">
      
      {/* Hero Header */}
      <div className="text-center mb-8">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 text-xs font-cinzel tracking-wider text-[#d4af37]"
          style={{
            backgroundColor: isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(197, 160, 89, 0.15)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(197, 160, 89, 0.4)',
          }}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Shri Goswami Tulsidas Ji Sacred Oracle</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-3xl-gold tracking-wide uppercase mb-2">
          Ramcharitmanas Prashnavali
        </h1>
        <p className={`text-xs sm:text-sm font-serif max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}>
          श्री राम शलाका प्रश्नावली: Meditate upon Prabhu Shri Ramachandra with pure devotion, hold your question in your heart, and touch any sacred letter in the 15x15 chakra below.
        </p>
      </div>

      {/* Ritual Guide Banner */}
      <div
        className="p-4 rounded-xl border mb-6 flex items-center justify-between gap-4 text-xs font-serif"
        style={{
          backgroundColor: isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255, 248, 220, 0.95)',
          borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.5)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-gray-900 font-bold shrink-0">
            ॐ
          </div>
          <div>
            <div className="font-cinzel font-bold text-amber-200">Sacred Ritual Guidance:</div>
            <div className="text-gray-300 text-[11px]">
              Close your eyes for a moment • Chant "श्री राम जय राम जय जय राम" • Select a square with complete faith.
            </div>
          </div>
        </div>

        {result && (
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg border border-[#d4af37]/40 text-[#d4af37] font-cinzel text-xs flex items-center gap-1.5 hover:bg-[#d4af37]/10 transition-all cursor-pointer shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Ask Again</span>
          </button>
        )}
      </div>

      {/* Result Display Card (If Selected) */}
      {result && (
        <div
          className="p-6 rounded-2xl border shadow-2xl mb-8 relative overflow-hidden animate-fadeIn"
          style={{
            backgroundColor: isDark ? 'rgba(24, 16, 28, 0.95)' : 'rgba(255, 252, 240, 0.98)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.5)' : 'rgba(197, 160, 89, 0.6)',
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d4af37]/30 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <span className="font-cinzel text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                Divine Verse from {result.sourceKand}
              </span>
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-cinzel font-bold border border-[#d4af37]/40 bg-[#d4af37]/20 text-[#d4af37]">
              {result.verdict}
            </div>
          </div>

          {/* Chaupai Sacred Text */}
          <div className="text-center py-4 px-2 my-2 bg-black/40 rounded-xl border border-[#d4af37]/30">
            <div className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-3xl-gold leading-relaxed">
              {result.chaupai}
            </div>
          </div>

          {/* Hindi & English Meaning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs font-serif">
            <div className="p-3.5 rounded-lg bg-black/30 border border-white/5">
              <div className="font-cinzel font-bold text-amber-200 mb-1">भावार्थ (Hindi Meaning):</div>
              <p className="text-gray-200 leading-relaxed">{result.meaningHindi}</p>
            </div>
            <div className="p-3.5 rounded-lg bg-black/30 border border-white/5">
              <div className="font-cinzel font-bold text-amber-200 mb-1">Spiritual Essence (English):</div>
              <p className="text-gray-200 leading-relaxed">{result.meaningEnglish}</p>
            </div>
          </div>

          {/* Prophecy Guidance */}
          <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-serif flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-cinzel font-bold text-emerald-200">Oracle Resolution: </span>
              <span className="text-emerald-100">{result.guidance}</span>
            </div>
          </div>
        </div>
      )}

      {/* 15x15 Sacred Letter Grid */}
      <div
        className="p-4 sm:p-6 rounded-2xl border shadow-xl bg-black/50 border-[#d4af37]/40"
      >
        <div className="text-center mb-4">
          <h3 className="font-cinzel text-xs font-bold text-[#d4af37] uppercase tracking-widest">
            15 × 15 Akshar Prashnavali Chakra
          </h3>
          <p className="text-[10px] text-gray-400 font-serif">Click on any akshar to receive Lord Rama's eternal answer</p>
        </div>

        <div className="grid grid-cols-15 gap-1 sm:gap-1.5 max-w-3xl mx-auto">
          {PRASHNAVALI_GRID.map((row, rIdx) =>
            row.map((char, cIdx) => {
              const isCurrent = selectedLetter?.r === rIdx && selectedLetter?.c === cIdx;
              return (
                <button
                  key={`${rIdx}-${cIdx}`}
                  onClick={() => handleCellClick(rIdx, cIdx, char)}
                  className={`aspect-square rounded flex items-center justify-center font-serif text-[10px] sm:text-xs font-bold transition-all cursor-pointer border ${
                    isCurrent
                      ? 'bg-gold-gradient text-gray-900 border-[#d4af37] scale-110 shadow-lg z-10'
                      : 'bg-black/40 border-[#d4af37]/20 text-amber-200 hover:bg-[#d4af37]/30 hover:border-[#d4af37] hover:scale-105'
                  }`}
                >
                  {char}
                </button>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
};
