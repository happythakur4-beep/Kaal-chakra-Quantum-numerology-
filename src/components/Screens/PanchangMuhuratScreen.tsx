import React, { useState } from 'react';
import { ThemeMode } from '../../types';
import { generatePanchangData, PanchangData, COMPREHENSIVE_MUHURATS, ShubhMuhuratEvent } from '../../utils/astrologyEngine';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { 
  Sun, 
  Moon, 
  Clock, 
  Calendar, 
  Compass, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  Flame, 
  Sunrise, 
  Sunset, 
  Star, 
  RefreshCw,
  Printer,
  Heart,
  Home,
  Car,
  Key,
  Baby
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PanchangMuhuratScreenProps {
  theme: ThemeMode;
}

export const PanchangMuhuratScreen: React.FC<PanchangMuhuratScreenProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const todayISO = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayISO);
  const [selectedCity, setSelectedCity] = useState('Varanasi, India');
  const [panchang, setPanchang] = useState<PanchangData>(() => generatePanchangData(todayISO, 'Varanasi, India'));
  const [activeTab, setActiveTab] = useState<'panchang' | 'muhurat' | 'choghadiya' | 'hora' | 'auspicious-dates'>('panchang');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleUpdate = (newDate: string, newCity: string) => {
    setSelectedDate(newDate);
    setSelectedCity(newCity);
    try {
      cosmicAudio.playFrequency(432);
    } catch {}
    const data = generatePanchangData(newDate, newCity);
    setPanchang(data);
  };

  const handlePrint = () => {
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } catch {}
    window.print();
  };

  const cities = [
    'Varanasi, India',
    'New Delhi, India',
    'Mumbai, India',
    'Bengaluru, India',
    'London, UK',
    'New York, USA',
  ];

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 py-6 md:py-10">
      
      {/* Top Hero Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 text-xs font-cinzel tracking-wider text-[#d4af37]"
          style={{
            backgroundColor: isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(197, 160, 89, 0.15)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(197, 160, 89, 0.4)',
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vedic Solar & Lunar Ephemeris</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-3xl-gold tracking-wide uppercase mb-2">
          Daily Panchang & Muhurat
        </h1>
        <p className={`text-xs sm:text-sm font-serif max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}>
          Accurate five-limb calculation (Tithi, Nakshatra, Yoga, Karana, Vara) with authentic Day/Night Choghadiya, Planetary Horas, and Shubh-Ashubh Muhurat windows.
        </p>
      </div>

      {/* Control Bar: Date Picker, City Selector & Print */}
      <div className="no-print p-4 rounded-xl border mb-8 flex flex-wrap items-center justify-between gap-4 transition-all shadow-md"
        style={{
          backgroundColor: isDark ? 'rgba(18, 18, 28, 0.85)' : 'rgba(255, 252, 245, 0.95)',
          borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.5)',
        }}
      >
        <div className="flex items-center gap-4 flex-wrap">
          {/* Date Selector */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <label className="text-xs font-cinzel font-semibold">Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleUpdate(e.target.value, selectedCity)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono cursor-pointer outline-none focus:border-[#d4af37] ${
                isDark ? 'bg-black/60 border-[#d4af37]/40 text-amber-100' : 'bg-white border-[#c5a059] text-gray-900'
              }`}
            />
          </div>

          {/* City Selector */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#d4af37]" />
            <label className="text-xs font-cinzel font-semibold">Location:</label>
            <select
              value={selectedCity}
              onChange={(e) => handleUpdate(selectedDate, e.target.value)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-serif cursor-pointer outline-none focus:border-[#d4af37] ${
                isDark ? 'bg-black/60 border-[#d4af37]/40 text-amber-100' : 'bg-white border-[#c5a059] text-gray-900'
              }`}
            >
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleUpdate(todayISO, 'Varanasi, India')}
            className={`px-3 py-1.5 rounded-lg border text-xs font-cinzel flex items-center gap-1.5 transition-all cursor-pointer ${
              isDark ? 'border-[#d4af37]/30 text-amber-200 hover:bg-[#d4af37]/10' : 'border-[#c5a059] text-[#5a4313] hover:bg-amber-50'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Today</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-1.5 rounded-lg bg-maroon-gradient border border-[#d4af37] text-[#fdf2d1] font-cinzel text-xs font-bold flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Panchang</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="no-print flex items-center gap-2 mb-6 border-b border-[#d4af37]/30 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('panchang')}
          className={`px-4 py-2 rounded-t-lg font-cinzel text-xs font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'panchang'
              ? 'bg-[#d4af37]/20 border-b-2 border-[#d4af37] text-[#d4af37]'
              : 'text-gray-400 hover:text-amber-200'
          }`}
        >
          1. Vedic Panchang (5 Limbs)
        </button>
        <button
          onClick={() => setActiveTab('muhurat')}
          className={`px-4 py-2 rounded-t-lg font-cinzel text-xs font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'muhurat'
              ? 'bg-[#d4af37]/20 border-b-2 border-[#d4af37] text-[#d4af37]'
              : 'text-gray-400 hover:text-amber-200'
          }`}
        >
          2. Shubh & Ashubh Muhurats
        </button>
        <button
          onClick={() => setActiveTab('choghadiya')}
          className={`px-4 py-2 rounded-t-lg font-cinzel text-xs font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'choghadiya'
              ? 'bg-[#d4af37]/20 border-b-2 border-[#d4af37] text-[#d4af37]'
              : 'text-gray-400 hover:text-amber-200'
          }`}
        >
          3. Day & Night Choghadiya
        </button>
        <button
          onClick={() => setActiveTab('hora')}
          className={`px-4 py-2 rounded-t-lg font-cinzel text-xs font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'hora'
              ? 'bg-[#d4af37]/20 border-b-2 border-[#d4af37] text-[#d4af37]'
              : 'text-gray-400 hover:text-amber-200'
          }`}
        >
          4. Planetary Horas (24-Hr)
        </button>
        <button
          onClick={() => setActiveTab('auspicious-dates')}
          className={`px-4 py-2 rounded-t-lg font-cinzel text-xs font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'auspicious-dates'
              ? 'bg-[#d4af37]/20 border-b-2 border-[#d4af37] text-[#d4af37]'
              : 'text-gray-400 hover:text-amber-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>5. Shubh Vivah, Griha & Vahan Muhurats</span>
        </button>
      </div>

      {/* TAB 1: Core Panchang 5 Limbs */}
      {activeTab === 'panchang' && (
        <div className="space-y-6 animate-fade-in">
          {/* Header Summary Banner */}
          <div className="p-5 rounded-2xl border relative overflow-hidden shadow-lg"
            style={{
              background: isDark 
                ? 'linear-gradient(135deg, rgba(25, 20, 35, 0.9) 0%, rgba(10, 10, 15, 0.95) 100%)' 
                : 'linear-gradient(135deg, #fffdf8 0%, #f9f2e3 100%)',
              borderColor: isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(197, 160, 89, 0.6)',
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[0.7rem] font-cinzel text-[#d4af37] tracking-widest uppercase block">
                  {panchang.city} ({panchang.latitude}, {panchang.longitude})
                </span>
                <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-gold-gradient">
                  {panchang.date} • {panchang.sanskritDay}
                </h3>
                <p className={`text-xs font-serif mt-1 ${isDark ? 'text-gray-300' : 'text-[#6b5118]'}`}>
                  Vikram Samvat {panchang.samvat.vikram} • Shaka {panchang.samvat.shaka} • {panchang.samvat.month} • {panchang.samvat.paksha}
                </p>
              </div>

              {/* Sun & Moon Times */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-2.5 rounded-xl border border-amber-500/20 text-center bg-amber-500/5">
                  <Sunrise className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="text-[0.65rem] font-cinzel uppercase block text-gray-400">Sunrise</span>
                  <strong className="text-xs font-mono text-amber-300">{panchang.sunrise}</strong>
                </div>
                <div className="p-2.5 rounded-xl border border-amber-500/20 text-center bg-amber-500/5">
                  <Sunset className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                  <span className="text-[0.65rem] font-cinzel uppercase block text-gray-400">Sunset</span>
                  <strong className="text-xs font-mono text-orange-300">{panchang.sunset}</strong>
                </div>
                <div className="p-2.5 rounded-xl border border-amber-500/20 text-center bg-amber-500/5">
                  <Moon className="w-4 h-4 text-cyan-300 mx-auto mb-1" />
                  <span className="text-[0.65rem] font-cinzel uppercase block text-gray-400">Moonrise</span>
                  <strong className="text-xs font-mono text-cyan-200">{panchang.moonrise}</strong>
                </div>
                <div className="p-2.5 rounded-xl border border-amber-500/20 text-center bg-amber-500/5">
                  <Moon className="w-4 h-4 text-indigo-300 mx-auto mb-1" />
                  <span className="text-[0.65rem] font-cinzel uppercase block text-gray-400">Moonset</span>
                  <strong className="text-xs font-mono text-indigo-200">{panchang.moonset}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Core Limbs Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. Tithi */}
            <div className="p-4 rounded-xl border transition-all hover:scale-[1.01]"
              style={{
                backgroundColor: isDark ? 'rgba(18, 18, 28, 0.7)' : 'rgba(255, 252, 245, 0.85)',
                borderColor: isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(197, 160, 89, 0.4)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-cinzel font-bold text-[#d4af37] flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5" /> 1. Tithi (Lunar Phase)
                </span>
                <span className="text-[0.65rem] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300">
                  Day {panchang.tithi.number}
                </span>
              </div>
              <h4 className="text-base font-cinzel font-bold text-[#fdf2d1] mb-1">
                {panchang.tithi.name}
              </h4>
              <p className={`text-xs font-serif mb-2 ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}>
                Deity: <strong>{panchang.tithi.deity}</strong>
              </p>
              <div className="text-[0.7rem] font-mono text-amber-400/90 pt-2 border-t border-amber-500/20 flex justify-between">
                <span>Ends: {panchang.tithi.endTime}</span>
                <span className="text-gray-400">Next: {panchang.tithi.nextTithi.split('(')[0]}</span>
              </div>
            </div>

            {/* 2. Nakshatra */}
            <div className="p-4 rounded-xl border transition-all hover:scale-[1.01]"
              style={{
                backgroundColor: isDark ? 'rgba(18, 18, 28, 0.7)' : 'rgba(255, 252, 245, 0.85)',
                borderColor: isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(197, 160, 89, 0.4)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-cinzel font-bold text-[#d4af37] flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5" /> 2. Nakshatra (Constellation)
                </span>
                <span className="text-[0.65rem] font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-300">
                  Pada {panchang.nakshatra.pada}
                </span>
              </div>
              <h4 className="text-base font-cinzel font-bold text-[#fdf2d1] mb-1">
                {panchang.nakshatra.name}
              </h4>
              <p className={`text-xs font-serif mb-2 ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}>
                Lord: <strong>{panchang.nakshatra.lord}</strong> • Deity: <strong>{panchang.nakshatra.deity}</strong>
              </p>
              <div className="text-[0.7rem] font-mono text-amber-400/90 pt-2 border-t border-amber-500/20 flex justify-between">
                <span>Ends: {panchang.nakshatra.endTime}</span>
                <span className="text-gray-400">Moon in {panchang.moonSign}</span>
              </div>
            </div>

            {/* 3. Yoga */}
            <div className="p-4 rounded-xl border transition-all hover:scale-[1.01]"
              style={{
                backgroundColor: isDark ? 'rgba(18, 18, 28, 0.7)' : 'rgba(255, 252, 245, 0.85)',
                borderColor: isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(197, 160, 89, 0.4)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-cinzel font-bold text-[#d4af37] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> 3. Yoga (Solar-Lunar Angle)
                </span>
                <span className={`text-[0.65rem] font-mono px-2 py-0.5 rounded ${
                  panchang.yoga.type === 'Auspicious' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'
                }`}>
                  {panchang.yoga.type}
                </span>
              </div>
              <h4 className="text-base font-cinzel font-bold text-[#fdf2d1] mb-1">
                {panchang.yoga.name}
              </h4>
              <p className={`text-xs font-serif mb-2 ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}>
                {panchang.yoga.meaning}
              </p>
              <div className="text-[0.7rem] font-mono text-amber-400/90 pt-2 border-t border-amber-500/20">
                <span>Ends: {panchang.yoga.endTime}</span>
              </div>
            </div>

            {/* 4. Karana */}
            <div className="p-4 rounded-xl border transition-all hover:scale-[1.01]"
              style={{
                backgroundColor: isDark ? 'rgba(18, 18, 28, 0.7)' : 'rgba(255, 252, 245, 0.85)',
                borderColor: isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(197, 160, 89, 0.4)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-cinzel font-bold text-[#d4af37] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" /> 4. Karana (Half-Tithi)
                </span>
                <span className="text-[0.65rem] font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-300">
                  {panchang.karana.type}
                </span>
              </div>
              <h4 className="text-base font-cinzel font-bold text-[#fdf2d1] mb-1">
                {panchang.karana.name}
              </h4>
              <p className={`text-xs font-serif mb-2 ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}>
                Presiding: <strong>{panchang.karana.deity}</strong> {panchang.karana.isBhadra && <span className="text-rose-400 font-bold">(Vishti Bhadra Active)</span>}
              </p>
              <div className="text-[0.7rem] font-mono text-amber-400/90 pt-2 border-t border-amber-500/20">
                <span>Ends: {panchang.karana.endTime}</span>
              </div>
            </div>

            {/* 5. Vara (Weekday) */}
            <div className="p-4 rounded-xl border transition-all hover:scale-[1.01]"
              style={{
                backgroundColor: isDark ? 'rgba(18, 18, 28, 0.7)' : 'rgba(255, 252, 245, 0.85)',
                borderColor: isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(197, 160, 89, 0.4)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-cinzel font-bold text-[#d4af37] flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5" /> 5. Vara (Solar Day)
                </span>
                <span className="text-[0.65rem] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300">
                  {panchang.dayOfWeek}
                </span>
              </div>
              <h4 className="text-base font-cinzel font-bold text-[#fdf2d1] mb-1">
                {panchang.sanskritDay}
              </h4>
              <p className={`text-xs font-serif mb-2 ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}>
                Sun in <strong>{panchang.sunSign}</strong> • Moon in <strong>{panchang.moonSign}</strong>
              </p>
              <div className="text-[0.7rem] font-mono text-amber-400/90 pt-2 border-t border-amber-500/20">
                <span>Ayana: {panchang.samvat.ayana.split('(')[0]}</span>
              </div>
            </div>

            {/* Hindu Ritu & Seasonal Cycle */}
            <div className="p-4 rounded-xl border transition-all hover:scale-[1.01]"
              style={{
                backgroundColor: isDark ? 'rgba(18, 18, 28, 0.7)' : 'rgba(255, 252, 245, 0.85)',
                borderColor: isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(197, 160, 89, 0.4)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-cinzel font-bold text-[#d4af37] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" /> Ritu & Seasonal Aura
                </span>
                <span className="text-[0.65rem] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300">
                  Season
                </span>
              </div>
              <h4 className="text-base font-cinzel font-bold text-[#fdf2d1] mb-1">
                {panchang.samvat.ritu}
              </h4>
              <p className={`text-xs font-serif mb-2 ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}>
                Karmic Alignment: Elevate Sattvic contemplation and Vedic recitation.
              </p>
              <div className="text-[0.7rem] font-mono text-amber-400/90 pt-2 border-t border-amber-500/20">
                <span>Lunar Month: {panchang.samvat.month}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Shubh & Ashubh Muhurats */}
      {activeTab === 'muhurat' && (
        <div className="space-y-6 animate-fade-in">
          {/* Auspicious Muhurats */}
          <div>
            <h3 className="text-base font-cinzel font-bold text-[#d4af37] flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Auspicious Shubh Muhurats (Ideal for New Endeavors)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
                <span className="text-[0.65rem] font-cinzel uppercase text-emerald-400 font-bold block">Abhijit Muhurat</span>
                <div className="text-sm font-mono text-white font-bold my-1">
                  {panchang.muhurat.abhijit.start} - {panchang.muhurat.abhijit.end}
                </div>
                <p className="text-[0.7rem] font-serif text-emerald-300/80">
                  Supreme mid-day window to inaugurate commercial, travel, and sacred agreements.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
                <span className="text-[0.65rem] font-cinzel uppercase text-emerald-400 font-bold block">Brahma Muhurat</span>
                <div className="text-sm font-mono text-white font-bold my-1">
                  {panchang.muhurat.brahma.start} - {panchang.muhurat.brahma.end}
                </div>
                <p className="text-[0.7rem] font-serif text-emerald-300/80">
                  Pre-dawn meditative window for mantra chanting, Kundalini awakening, and deep study.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
                <span className="text-[0.65rem] font-cinzel uppercase text-emerald-400 font-bold block">Amrit Kaal</span>
                <div className="text-sm font-mono text-white font-bold my-1">
                  {panchang.muhurat.amritKaal.start} - {panchang.muhurat.amritKaal.end}
                </div>
                <p className="text-[0.7rem] font-serif text-emerald-300/80">
                  Nectar-infused cosmic flow ideal for medicinal cures, yajnas, and gemstone consecration.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
                <span className="text-[0.65rem] font-cinzel uppercase text-emerald-400 font-bold block">Godhuli Muhurat</span>
                <div className="text-sm font-mono text-white font-bold my-1">
                  {panchang.muhurat.godhuli.start} - {panchang.muhurat.godhuli.end}
                </div>
                <p className="text-[0.7rem] font-serif text-emerald-300/80">
                  Twilight transition window for family peace, Lakshmi Aarti, and temple visits.
                </p>
              </div>
            </div>
          </div>

          {/* Inauspicious Muhurats */}
          <div>
            <h3 className="text-base font-cinzel font-bold text-rose-400 flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-rose-400" /> Inauspicious Timings (Strictly Avoid Major Initiatives)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/20">
                <span className="text-[0.65rem] font-cinzel uppercase text-rose-400 font-bold block">Rahu Kaal (राहुकाल)</span>
                <div className="text-sm font-mono text-white font-bold my-1">
                  {panchang.muhurat.rahuKaal.start} - {panchang.muhurat.rahuKaal.end}
                </div>
                <p className="text-[0.7rem] font-serif text-rose-300/80">
                  Do not initiate new financial transactions, property agreements, or long departures.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/20">
                <span className="text-[0.65rem] font-cinzel uppercase text-rose-400 font-bold block">Yamaghanta (यमघण्ट)</span>
                <div className="text-sm font-mono text-white font-bold my-1">
                  {panchang.muhurat.yamaghanta.start} - {panchang.muhurat.yamaghanta.end}
                </div>
                <p className="text-[0.7rem] font-serif text-rose-300/80">
                  Associated with Yama energy; postpone risky medical procedures or litigation launches.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/20">
                <span className="text-[0.65rem] font-cinzel uppercase text-rose-400 font-bold block">Gulika Kaal (गुलिक काल)</span>
                <div className="text-sm font-mono text-white font-bold my-1">
                  {panchang.muhurat.gulikaKaal.start} - {panchang.muhurat.gulikaKaal.end}
                </div>
                <p className="text-[0.7rem] font-serif text-rose-300/80">
                  Actions initiated repeat cyclically; avoid beginning conflicts or lending money.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/20">
                <span className="text-[0.65rem] font-cinzel uppercase text-rose-400 font-bold block">Durmuhurat (दुर्मुहूर्त)</span>
                <div className="text-sm font-mono text-white font-bold my-1">
                  {panchang.muhurat.durmuhurat.start} - {panchang.muhurat.durmuhurat.end}
                </div>
                <p className="text-[0.7rem] font-serif text-rose-300/80">
                  Malefic planetary combustion period; best reserved for routine administrative maintenance.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Day & Night Choghadiya */}
      {activeTab === 'choghadiya' && (
        <div className="space-y-8 animate-fade-in">
          {/* Day Choghadiya */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-cinzel font-bold text-[#d4af37] flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-400" /> Day Choghadiya (Sunrise to Sunset)
              </h3>
              <span className="text-xs font-mono text-gray-400">06:00 AM - 06:00 PM</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {panchang.dayChoghadiya.map((slot, idx) => (
                <div 
                  key={`day-chog-${idx}`} 
                  className={`p-3 rounded-xl border text-center transition-all ${
                    slot.isCurrent ? 'ring-2 ring-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105' : ''
                  } ${
                    slot.nature === 'Best' 
                      ? 'border-emerald-500/50 bg-emerald-950/30' 
                      : slot.nature === 'Good' 
                      ? 'border-green-500/40 bg-green-950/20' 
                      : slot.nature === 'Neutral' 
                      ? 'border-amber-500/30 bg-amber-950/20' 
                      : 'border-rose-500/40 bg-rose-950/25'
                  }`}
                >
                  <span className={`text-[0.65rem] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                    slot.nature === 'Best' || slot.nature === 'Good' ? 'text-emerald-300' : slot.nature === 'Neutral' ? 'text-amber-300' : 'text-rose-300'
                  }`}>
                    {slot.nature}
                  </span>
                  <div className="text-xs font-cinzel font-bold text-[#fdf2d1] my-1">
                    {slot.name}
                  </div>
                  <div className="text-[0.65rem] font-mono text-gray-400 mb-1">
                    {slot.startTime} - {slot.endTime}
                  </div>
                  <span className="text-[0.6rem] font-serif text-[#d4af37] block">
                    Lord: {slot.lord}
                  </span>
                  {slot.isCurrent && (
                    <span className="mt-1 inline-block text-[0.55rem] bg-[#d4af37] text-black font-bold uppercase px-1 rounded">
                      Active Now
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Night Choghadiya */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-cinzel font-bold text-cyan-300 flex items-center gap-2">
                <Moon className="w-4 h-4 text-cyan-400" /> Night Choghadiya (Sunset to Next Sunrise)
              </h3>
              <span className="text-xs font-mono text-gray-400">06:00 PM - 06:00 AM</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {panchang.nightChoghadiya.map((slot, idx) => (
                <div 
                  key={`night-chog-${idx}`} 
                  className={`p-3 rounded-xl border text-center transition-all ${
                    slot.nature === 'Best' 
                      ? 'border-emerald-500/50 bg-emerald-950/30' 
                      : slot.nature === 'Good' 
                      ? 'border-green-500/40 bg-green-950/20' 
                      : slot.nature === 'Neutral' 
                      ? 'border-amber-500/30 bg-amber-950/20' 
                      : 'border-rose-500/40 bg-rose-950/25'
                  }`}
                >
                  <span className={`text-[0.65rem] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                    slot.nature === 'Best' || slot.nature === 'Good' ? 'text-emerald-300' : slot.nature === 'Neutral' ? 'text-amber-300' : 'text-rose-300'
                  }`}>
                    {slot.nature}
                  </span>
                  <div className="text-xs font-cinzel font-bold text-[#fdf2d1] my-1">
                    {slot.name}
                  </div>
                  <div className="text-[0.65rem] font-mono text-gray-400 mb-1">
                    {slot.startTime} - {slot.endTime}
                  </div>
                  <span className="text-[0.6rem] font-serif text-[#d4af37] block">
                    Lord: {slot.lord}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Planetary Horas Table */}
      {activeTab === 'hora' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-cinzel font-bold text-[#d4af37] flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" /> Planetary Horas (24-Hour Solar Ruling Matrix)
            </h3>
            <span className="text-xs font-mono text-gray-400">Day Lord: {panchang.sanskritDay.split('(')[0]}</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#d4af37]/30">
            <table className="w-full text-left text-xs font-serif">
              <thead className="bg-[#d4af37]/15 font-cinzel text-[#d4af37]">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Time Window</th>
                  <th className="p-3">Ruling Graha</th>
                  <th className="p-3">Auspiciousness</th>
                  <th className="p-3">Recommended Initiations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-500/10">
                {panchang.horaTable.map((slot) => (
                  <tr 
                    key={`hora-${slot.hour}`}
                    className={`transition-colors ${
                      slot.isCurrent 
                        ? 'bg-[#d4af37]/20 font-bold' 
                        : isDark ? 'hover:bg-amber-500/5' : 'hover:bg-amber-50'
                    }`}
                  >
                    <td className="p-3 font-mono text-amber-400">{slot.hour}</td>
                    <td className="p-3 font-mono">{slot.time}</td>
                    <td className="p-3 font-cinzel font-bold text-[#fdf2d1]">
                      {slot.planet} {slot.isCurrent && <span className="ml-1 text-[0.6rem] bg-[#d4af37] text-black px-1 rounded">Active</span>}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[0.65rem] font-mono ${
                        slot.nature === 'Auspicious' 
                          ? 'bg-emerald-500/20 text-emerald-300' 
                          : slot.nature === 'Neutral' 
                          ? 'bg-amber-500/20 text-amber-300' 
                          : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {slot.nature}
                      </span>
                    </td>
                    <td className="p-3 text-gray-300">{slot.recommendedAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: Auspicious Dates & Muhurats (Vivah, Griha Pravesh, Vahan, Sampatti) */}
      {activeTab === 'auspicious-dates' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d4af37]/30 pb-3">
            <div>
              <h3 className="text-base font-cinzel font-bold text-[#d4af37] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Vedic Shubh Muhurat Calendar (2026-2027)
              </h3>
              <p className="text-xs font-serif text-gray-300">
                Panchang-verified auspicious dates evaluated according to Shuddha Lagna, Nakshatras, and Choghadiyas.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {['All', 'Vivah', 'Griha Pravesh', 'Vahan', 'Sampatti', 'Naamkaran'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-cinzel transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-gold-gradient text-gray-900 font-bold shadow-md'
                      : 'border border-[#d4af37]/30 text-amber-200 hover:bg-[#d4af37]/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Muhurats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPREHENSIVE_MUHURATS.filter(m => selectedCategory === 'All' || m.category.toLowerCase().includes(selectedCategory.toLowerCase())).map((m) => (
              <div
                key={m.id}
                className="p-4 rounded-xl border shadow-md flex flex-col justify-between"
                style={{
                  backgroundColor: isDark ? 'rgba(18, 18, 28, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                  borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.45)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40">
                      {m.category}
                    </span>
                    <span className="text-xs font-mono text-amber-300 font-bold">{m.day}</span>
                  </div>

                  <div className="text-base font-cinzel font-bold text-amber-100 mb-1">
                    {m.date}
                  </div>

                  <div className="text-xs font-mono text-emerald-400 font-semibold mb-2 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{m.muhuratWindow}</span>
                  </div>

                  <div className="space-y-1 text-xs font-serif text-gray-300 mb-3">
                    <div>• Nakshatra: <strong className="text-amber-200">{m.nakshatra}</strong></div>
                    <div>• Tithi: <strong className="text-amber-200">{m.tithi}</strong></div>
                    <div>• Choghadiya: <strong className="text-amber-200">{m.shubhChoghadiya}</strong></div>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-black/30 border border-white/5 text-[11px] font-serif text-gray-300 italic">
                  "{m.specialAuspiciousness}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
