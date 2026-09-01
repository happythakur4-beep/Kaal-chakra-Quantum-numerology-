import React, { useState, useMemo } from 'react';
import { 
  PersonKarmaProfile, 
  KarmaItem, 
  KarmicDebt, 
  PrayashchittaRemedy,
  INITIAL_PERSON_KARMA_PROFILES, 
  PRESET_PUNYA_DEEDS, 
  PRESET_PAPA_SINS,
  INITIAL_KARMIC_DEBTS,
  PRAYASHCHITTA_REMEDIES,
  PunyaCategory,
  PapaCategory
} from '../../data/karmaData';
import { ThemeMode, ScreenType } from '../../types';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { KarmaGitaSection } from './KarmaGitaSection';
import { GitaConfessionSanctum } from '../GitaConfession/GitaConfessionSanctum';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scale,
  Sparkles,
  AlertTriangle,
  Heart,
  ShieldAlert,
  Flame,
  Volume2,
  VolumeX,
  Plus,
  Trash2,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  User,
  Compass,
  Scroll,
  BookOpen,
  Eye,
  RefreshCw,
  Award,
  ChevronRight,
  Filter,
  Check,
  Feather,
  Info
} from 'lucide-react';

interface KarmaScreenProps {
  theme: ThemeMode;
  onNavigate?: (screen: ScreenType) => void;
}

export const KarmaScreen: React.FC<KarmaScreenProps> = ({ theme, onNavigate }) => {
  const isDark = theme === 'dark';

  // Profiles State
  const [profiles, setProfiles] = useState<PersonKarmaProfile[]>(INITIAL_PERSON_KARMA_PROFILES);
  const [activeProfileId, setActiveProfileId] = useState<string>('profile-anya');
  
  // Custom Profile Modal
  const [isNewProfileModalOpen, setIsNewProfileModalOpen] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileRashi, setNewProfileRashi] = useState('Leo (सिंह)');
  const [newProfileNakshatra, setNewProfileNakshatra] = useState('Magha (मघा)');
  const [newProfileBirthDate, setNewProfileBirthDate] = useState('1995-05-15');
  const [newProfileBirthCity, setNewProfileBirthCity] = useState('New Delhi, India');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'confession' | 'gita' | 'ledger' | 'punya' | 'papa' | 'debts' | 'remedies' | 'dossier'>('confession');
  const [filterType, setFilterType] = useState<'all' | 'punya' | 'papa'>('all');

  // Add Item Modals
  const [isAddPunyaModalOpen, setIsAddPunyaModalOpen] = useState(false);
  const [isAddPapaModalOpen, setIsAddPapaModalOpen] = useState(false);

  // New Punya Form State
  const [newPunyaTitle, setNewPunyaTitle] = useState('');
  const [newPunyaHindi, setNewPunyaHindi] = useState('');
  const [newPunyaCategory, setNewPunyaCategory] = useState<PunyaCategory>('seva');
  const [newPunyaPoints, setNewPunyaPoints] = useState(40);
  const [newPunyaDesc, setNewPunyaDesc] = useState('');

  // New Papa Form State
  const [newPapaTitle, setNewPapaTitle] = useState('');
  const [newPapaHindi, setNewPapaHindi] = useState('');
  const [newPapaCategory, setNewPapaCategory] = useState<PapaCategory>('vachika');
  const [newPapaPoints, setNewPapaPoints] = useState(-30);
  const [newPapaDesc, setNewPapaDesc] = useState('');
  const [newPapaRemedy, setNewPapaRemedy] = useState('');

  // Audio tone state
  const [activeAudioToneHz, setActiveAudioToneHz] = useState<number | null>(null);

  // Debts state
  const [debts, setDebts] = useState<KarmicDebt[]>(INITIAL_KARMIC_DEBTS);

  // Current active profile
  const currentProfile = useMemo(() => {
    return profiles.find(p => p.id === activeProfileId) || profiles[0];
  }, [profiles, activeProfileId]);

  // Recalculate stats dynamically
  const calculatedStats = useMemo(() => {
    const list = currentProfile.karmaList;
    const punyaItems = list.filter(i => i.type === 'punya');
    const papaItems = list.filter(i => i.type === 'papa');

    const totalPunya = punyaItems.reduce((acc, curr) => acc + curr.points, 0);
    const totalPapa = papaItems.reduce((acc, curr) => acc + curr.points, 0); // negative
    const netBalance = totalPunya + totalPapa;

    let rank = 'Punya-Pradhaana (पुण्य प्रधान - Positive Karmic Ascendant)';
    let auraColor = '#10b981';

    if (netBalance > 200) {
      rank = 'Maha Punya-Atma (महा पुण्यात्मा - Highly Auspicious Karmic Reservoir)';
      auraColor = '#34d399';
    } else if (netBalance > 80) {
      rank = 'Punya-Pradhaana (पुण्य प्रधान - Virtuous Karmic Momentum)';
      auraColor = '#10b981';
    } else if (netBalance >= -50 && netBalance <= 80) {
      rank = 'Madhyama-Karmic (मध्यम कर्म - In Delicate Equilibrium)';
      auraColor = '#f59e0b';
    } else {
      rank = 'Papa-Purna (पाप शोधन आवश्यक - High Karmic Debt / Atonement Required)';
      auraColor = '#f87171';
    }

    return {
      punyaCount: punyaItems.length,
      papaCount: papaItems.length,
      totalPunya,
      totalPapa,
      netBalance,
      rank,
      auraColor
    };
  }, [currentProfile]);

  // Audio frequency handler
  const handlePlayFrequency = (hz: number) => {
    if (activeAudioToneHz === hz) {
      cosmicAudio.stopFrequencyTone();
      setActiveAudioToneHz(null);
    } else {
      cosmicAudio.playFrequencyTone(hz, 0.22, 'sine');
      setActiveAudioToneHz(hz);
    }
  };

  // Add Custom Punya Deed
  const handleAddPunya = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPunyaTitle.trim()) return;

    const newItem: KarmaItem = {
      id: `custom-punya-${Date.now()}`,
      title: newPunyaTitle,
      hindiTitle: newPunyaHindi || newPunyaTitle,
      type: 'punya',
      category: newPunyaCategory,
      points: Math.abs(newPunyaPoints),
      intensity: newPunyaPoints > 50 ? 'monumental' : newPunyaPoints > 35 ? 'significant' : 'moderate',
      description: newPunyaDesc || 'Self-logged positive action and virtue.',
      spiritualContext: 'Righteous action (Satkarma) produces joyful harvest in present and future births.',
      date: new Date().toISOString().split('T')[0],
      isCustom: true
    };

    setProfiles(prev => prev.map(prof => {
      if (prof.id === currentProfile.id) {
        return {
          ...prof,
          karmaList: [newItem, ...prof.karmaList]
        };
      }
      return prof;
    }));

    cosmicAudio.playCosmicChime();
    setIsAddPunyaModalOpen(false);
    setNewPunyaTitle('');
    setNewPunyaHindi('');
    setNewPunyaDesc('');
  };

  // Quick Add Preset Punya
  const handleAddPresetPunya = (preset: Omit<KarmaItem, 'id' | 'date'>) => {
    const newItem: KarmaItem = {
      ...preset,
      id: `preset-punya-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isCustom: true
    };

    setProfiles(prev => prev.map(prof => {
      if (prof.id === currentProfile.id) {
        return {
          ...prof,
          karmaList: [newItem, ...prof.karmaList]
        };
      }
      return prof;
    }));

    cosmicAudio.playCosmicChime();
    setIsAddPunyaModalOpen(false);
  };

  // Add Custom Papa Sin
  const handleAddPapa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPapaTitle.trim()) return;

    const points = -Math.abs(newPapaPoints);
    const newItem: KarmaItem = {
      id: `custom-papa-${Date.now()}`,
      title: newPapaTitle,
      hindiTitle: newPapaHindi || newPapaTitle,
      type: 'papa',
      category: newPapaCategory,
      points: points,
      intensity: Math.abs(points) > 50 ? 'severe' : Math.abs(points) > 30 ? 'moderate' : 'mild',
      description: newPapaDesc || 'Self-reflected mistake, transgression or lapse in righteousness.',
      spiritualContext: 'Adharma and harmful actions generate friction in the soul biofield and attract karmic retribution.',
      date: new Date().toISOString().split('T')[0],
      isCustom: true,
      remedy: newPapaRemedy || 'Perform Prayashchitta, chant Gayatri Mantra, and do selfless acts of charity to restore balance.'
    };

    setProfiles(prev => prev.map(prof => {
      if (prof.id === currentProfile.id) {
        return {
          ...prof,
          karmaList: [newItem, ...prof.karmaList]
        };
      }
      return prof;
    }));

    cosmicAudio.playSingularityPulse();
    setIsAddPapaModalOpen(false);
    setNewPapaTitle('');
    setNewPapaHindi('');
    setNewPapaDesc('');
    setNewPapaRemedy('');
  };

  // Quick Add Preset Papa
  const handleAddPresetPapa = (preset: Omit<KarmaItem, 'id' | 'date'>) => {
    const newItem: KarmaItem = {
      ...preset,
      id: `preset-papa-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isCustom: true
    };

    setProfiles(prev => prev.map(prof => {
      if (prof.id === currentProfile.id) {
        return {
          ...prof,
          karmaList: [newItem, ...prof.karmaList]
        };
      }
      return prof;
    }));

    cosmicAudio.playSingularityPulse();
    setIsAddPapaModalOpen(false);
  };

  // Delete Karma item
  const handleDeleteKarmaItem = (itemId: string) => {
    cosmicAudio.playCyberKeystroke();
    setProfiles(prev => prev.map(prof => {
      if (prof.id === currentProfile.id) {
        return {
          ...prof,
          karmaList: prof.karmaList.filter(item => item.id !== itemId)
        };
      }
      return prof;
    }));
  };

  // Direct Add Karma Item (from Gita Engine or Oracle)
  const handleDirectAddKarmaItem = (newItem: KarmaItem) => {
    setProfiles(prev => prev.map(prof => {
      if (prof.id === currentProfile.id) {
        return {
          ...prof,
          karmaList: [newItem, ...prof.karmaList]
        };
      }
      return prof;
    }));
  };

  // Create New Person Profile
  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;

    const newId = `profile-${Date.now()}`;
    const newProf: PersonKarmaProfile = {
      id: newId,
      personName: newProfileName,
      rashi: newProfileRashi,
      nakshatra: newProfileNakshatra,
      birthDate: newProfileBirthDate,
      birthCity: newProfileBirthCity,
      sanchitaPoints: 800,
      prarabdhaPoints: 250,
      kriyamanaPoints: 100,
      punyaCount: 1,
      papaCount: 0,
      totalPunyaPoints: 50,
      totalPapaPoints: 0,
      netKarmicBalance: 50,
      karmicRank: 'Nava-Aarambha (नव आरंभ - Fresh Karmic Ledger)',
      karmicAuraColor: '#38bdf8',
      karmaList: [
        {
          id: `init-${Date.now()}`,
          title: 'Initiating Sincere Karmic Self-Observation',
          hindiTitle: 'सत्यनिष्ठा व आत्म-समीक्षा का संकल्प',
          type: 'punya',
          category: 'satya',
          points: 50,
          intensity: 'significant',
          description: 'Committing to observe, record, and balance one’s actions with honesty.',
          spiritualContext: 'Self-inquiry (Atma-Vicharana) is the first step toward dissolving all karmic knots.',
          date: new Date().toISOString().split('T')[0]
        }
      ]
    };

    setProfiles(prev => [...prev, newProf]);
    setActiveProfileId(newId);
    setIsNewProfileModalOpen(false);
    setNewProfileName('');
    cosmicAudio.playCosmicChime();
  };

  // Filtered List
  const filteredKarmaList = useMemo(() => {
    if (filterType === 'punya') {
      return currentProfile.karmaList.filter(i => i.type === 'punya');
    }
    if (filterType === 'papa') {
      return currentProfile.karmaList.filter(i => i.type === 'papa');
    }
    return currentProfile.karmaList;
  }, [currentProfile, filterType]);

  return (
    <div className={`min-h-screen pb-20 transition-colors duration-300 relative ${
      isDark ? 'bg-[#06070a] text-slate-100' : 'bg-[#faf7ee] text-slate-900'
    }`}>
      {/* Light Theme Photo Background for Karma */}
      {!isDark && (
        <div 
          className="absolute inset-0 z-0 opacity-15 mix-blend-multiply bg-cover bg-fixed bg-center pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590455855078-4a94ec32fcd4?q=80&w=2000&auto=format&fit=crop')` }}
        />
      )}

      {/* 1. HERO BANNER & SHLOKA HEADER */}
      <div className={`relative z-10 overflow-hidden border-b ${
        isDark 
          ? 'bg-gradient-to-b from-[#0e121e] via-[#090b14] to-[#06070a] border-amber-500/20' 
          : 'bg-gradient-to-b from-amber-50 via-orange-50/50 to-[#faf7ee] border-amber-200'
      }`}>
        {/* Glow ambient lights */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Title & Vedic Shloka */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 border border-amber-500/30 text-amber-400">
                  <Scale className="w-3.5 h-3.5 text-amber-400" />
                  <span>VEDIC KARMA & DHARMA MATRIX</span>
                </span>
                <span className="text-xs text-slate-400 font-mono">कर्म फल विधान</span>
              </div>

              <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight ${
                isDark ? 'text-amber-100' : 'text-slate-900'
              }`}>
                यथा कर्म तथा फलम् • Karmic Ledger of Deeds & Sins
              </h1>

              <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
                Track the sacred balance of a person&apos;s <span className="text-emerald-400 font-semibold">Good Deeds (Punya - पुण्य)</span> and <span className="text-rose-400 font-semibold">Sins / Transgressions (Papa - पाप)</span>, calculate Sanchita &amp; Prarabdha balances, resolve ancestral debts, and discover restorative remedies (Prayashchitta).
              </p>
            </div>

            {/* Person Selector & New Profile Button */}
            <div className="w-full lg:w-auto flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md p-1.5 rounded-xl border border-amber-500/30">
                <User className="w-4 h-4 text-amber-400 ml-2" />
                <select
                  value={activeProfileId}
                  onChange={(e) => {
                    cosmicAudio.playCyberKeystroke();
                    setActiveProfileId(e.target.value);
                  }}
                  className={`bg-transparent text-xs font-mono font-bold px-2 py-1.5 rounded-lg border-none focus:outline-none cursor-pointer ${
                    isDark ? 'text-amber-200' : 'text-slate-900'
                  }`}
                >
                  {profiles.map(p => (
                    <option key={p.id} value={p.id} className="bg-slate-900 text-amber-200">
                      {p.personName} ({p.rashi})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  cosmicAudio.playCyberKeystroke();
                  setIsNewProfileModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 transition-all shadow-[0_0_15px_rgba(251,191,36,0.2)] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>NEW PERSON PROFILE</span>
              </button>
            </div>

          </div>

          {/* Person Sub-Info Bar */}
          <div className="mt-6 pt-4 border-t border-amber-500/20 flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-slate-300">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Subject:</span>
              <span className="font-bold text-amber-300">{currentProfile.personName}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400">Rashi & Nakshatra:</span>
              <span className="font-bold text-cyan-300">{currentProfile.rashi} • {currentProfile.nakshatra}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Scroll className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400">Birth Details:</span>
              <span className="text-slate-200">{currentProfile.birthDate} ({currentProfile.birthCity})</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Soul Status:</span>
              <span className="font-bold text-emerald-400">{calculatedStats.rank.split('(')[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN KARMIC COCKPIT & METRICS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* SPECIAL SACRED GITA CONFESSIONAL SANCTUM BANNER */}
        <div 
          onClick={() => {
            cosmicAudio.playCosmicChime(528);
            setActiveTab('confession');
          }}
          className="relative rounded-3xl p-6 sm:p-7 border-2 border-amber-500/60 shadow-[0_0_35px_rgba(245,158,11,0.35)] cursor-pointer overflow-hidden group transition-all transform hover:scale-[1.01]"
          style={{
            background: 'radial-gradient(ellipse at top left, #2a150a 0%, #160b05 50%, #080402 100%)'
          }}
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/20 to-red-600/20 rounded-full blur-3xl pointer-events-none group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.6)] flex items-center justify-center shrink-0">
                <div className="w-full h-full rounded-2xl bg-black/80 flex items-center justify-center">
                  <Flame className="w-8 h-8 text-amber-400 animate-pulse" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                    श्रीमद्भगवद्गीता महापाप स्वीकारोक्ति एवं प्रायश्चित्त मण्डप
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> BG 9.30 & 18.66
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400">
                  Sacred Gita Confessional, Cosmic Penal Decree & Agni Dissolution
                </h2>
                <p className="text-xs sm:text-sm text-amber-200/80 max-w-3xl leading-relaxed">
                  Confess sins of speech, body, mind, or broken trust before the Divine Witness. Discover your exact karmic punishment across this life and the hereafter, obtain scriptural Prayashchitta rituals, and offer heavy guilt to the sacred Agni Kund.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
              <button
                onClick={() => onNavigate && onNavigate('mentor')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-cinzel font-bold text-xs shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center gap-2 cursor-pointer"
              >
                <span>Enter Sanctum Altar</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* A. Top Stat Cards: Punya vs Papa & Net Scale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Punya (Good Deeds) */}
          <div className={`p-5 rounded-2xl border transition-all ${
            isDark 
              ? 'bg-emerald-950/25 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
              : 'bg-emerald-50 border-emerald-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-emerald-400" />
                <span>PUNYA (पुण्य कर्म)</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 font-bold">
                {calculatedStats.punyaCount} Deeds Logged
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-400 font-mono">+{calculatedStats.totalPunya}</span>
              <span className="text-xs text-emerald-300/80 font-mono">Merit Units</span>
            </div>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Acts of seva, truth, generosity, animal protection, and spiritual sadhana.
            </p>
          </div>

          {/* Card 2: Papa (Sins & Transgressions) */}
          <div className={`p-5 rounded-2xl border transition-all ${
            isDark 
              ? 'bg-rose-950/25 border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.15)]' 
              : 'bg-rose-50 border-rose-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-rose-400 font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>PAPA / SINS (पाप कर्म)</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/20 text-rose-300 font-bold">
                {calculatedStats.papaCount} Sins Logged
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-rose-400 font-mono">{calculatedStats.totalPapa}</span>
              <span className="text-xs text-rose-300/80 font-mono">Karmic Debt</span>
            </div>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Verbal cruelty, deception, envy, harm to creatures, and neglect of righteous duty.
            </p>
          </div>

          {/* Card 3: Net Karmic Balance (The Scale) */}
          <div className={`p-5 rounded-2xl border transition-all ${
            isDark 
              ? 'bg-amber-950/25 border-amber-500/40 shadow-[0_0_25px_rgba(251,191,36,0.15)]' 
              : 'bg-amber-50 border-amber-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-amber-400 font-bold flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>NET KARMIC BALANCE</span>
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                calculatedStats.netBalance >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {calculatedStats.netBalance >= 0 ? 'Positive Karma' : 'Negative Deficit'}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-black font-mono ${
                calculatedStats.netBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {calculatedStats.netBalance > 0 ? `+${calculatedStats.netBalance}` : calculatedStats.netBalance}
              </span>
              <span className="text-xs text-amber-300/80 font-mono">Net Score</span>
            </div>
            {/* Visual Balance Bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden flex">
              <div 
                className="bg-rose-500 transition-all duration-500" 
                style={{ width: `${Math.min(50, (Math.abs(calculatedStats.totalPapa) / (calculatedStats.totalPunya + Math.abs(calculatedStats.totalPapa) || 1)) * 100)}%` }} 
              />
              <div 
                className="bg-emerald-500 transition-all duration-500 ml-auto" 
                style={{ width: `${Math.min(100, (calculatedStats.totalPunya / (calculatedStats.totalPunya + Math.abs(calculatedStats.totalPapa) || 1)) * 100)}%` }} 
              />
            </div>
          </div>

          {/* Card 4: Threefold Karma Classification */}
          <div className={`p-5 rounded-2xl border transition-all ${
            isDark 
              ? 'bg-cyan-950/25 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
              : 'bg-cyan-50 border-cyan-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>TRI-KALA KARMA</span>
              </span>
              <span className="text-[10px] font-mono text-cyan-300">संचित • प्रारब्ध</span>
            </div>
            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Sanchita (Past Store):</span>
                <span className="text-cyan-300 font-bold">{currentProfile.sanchitaPoints} pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Prarabdha (Current Fate):</span>
                <span className="text-amber-300 font-bold">{currentProfile.prarabdhaPoints} pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Kriyamana (Active):</span>
                <span className="text-emerald-300 font-bold">{currentProfile.kriyamanaPoints + calculatedStats.netBalance} pts</span>
              </div>
            </div>
          </div>

        </div>

        {/* B. NAVIGATION TABS */}
        <div className="border-b border-amber-500/20 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: 'confession', label: '🔥 Gita Sin Confession & Prayashchitta (पाप स्वीकारोक्ति एवं प्रायश्चित्त मण्डप)', desc: 'Sacred Altar, Penal Code & Agni Dissolution' },
            { id: 'gita', label: '🕉️ Bhagavad Gita Decider (संपूर्ण १८ अध्याय)', desc: '18 Chapters & Gita Decision Oracle' },
            { id: 'ledger', label: '📖 Complete Karmic Ledger', desc: 'Timeline of Deeds & Sins' },
            { id: 'punya', label: '✨ Good Deeds (Punya)', desc: 'Virtues & Merit' },
            { id: 'papa', label: '⚠️ Sins & Transgressions (Papa)', desc: 'Flaws & Karmic Toll' },
            { id: 'debts', label: '☸️ 5 Karmic Debts (Pancha Rina)', desc: 'Ancestral & Cosmic' },
            { id: 'remedies', label: '🕉️ Prayashchitta (Atonement)', desc: 'Mantras & Balance' },
            { id: 'dossier', label: '📜 Soul Karmic Dossier', desc: 'Full Astrological Verdict' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  cosmicAudio.playCyberKeystroke();
                  setActiveTab(tab.id as any);
                }}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-600/40 via-orange-600/40 to-red-600/40 border border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.35)]'
                    : 'bg-black/40 hover:bg-black/60 border border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* C. TAB -1: SACRED GITA CONFESSIONAL & ATONEMENT SANCTUM */}
        {activeTab === 'confession' && (
          <GitaConfessionSanctum
            isDark={isDark}
            currentProfile={currentProfile}
            onAddKarmaItem={handleDirectAddKarmaItem}
          />
        )}

        {/* D. TAB 0: BHAGAVAD GITA DECISION ENGINE & 18 ADHYAYAS */}
        {activeTab === 'gita' && (
          <KarmaGitaSection
            isDark={isDark}
            currentProfile={currentProfile}
            onAddKarmaItem={handleDirectAddKarmaItem}
          />
        )}

        {/* E. TAB 1: COMPLETE LEDGER */}
        {activeTab === 'ledger' && (
          <div className="space-y-6">
            
            {/* Action Buttons & Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-black/40 border border-amber-500/20 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-amber-400" />
                  <span>Filter:</span>
                </span>
                {(['all', 'punya', 'papa'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      cosmicAudio.playCyberKeystroke();
                      setFilterType(f);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold capitalize transition-all ${
                      filterType === f 
                        ? 'bg-amber-500 text-slate-950 shadow-[0_0_10px_rgba(251,191,36,0.4)]' 
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {f === 'all' ? 'All (सभी)' : f === 'punya' ? '✨ Punya Only' : '⚠️ Sins Only'}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    cosmicAudio.playCyberKeystroke();
                    setIsAddPunyaModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>LOG GOOD DEED (पुण्य)</span>
                </button>
                <button
                  onClick={() => {
                    cosmicAudio.playCyberKeystroke();
                    setIsAddPapaModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>RECORD SIN / MISTAKE (पाप)</span>
                </button>
              </div>
            </div>

            {/* List of Deeds & Sins */}
            <div className="space-y-4">
              {filteredKarmaList.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-slate-700 rounded-2xl">
                  <p className="text-slate-400 font-mono text-sm">No karmic actions match this filter.</p>
                </div>
              ) : (
                filteredKarmaList.map((item) => {
                  const isPunya = item.type === 'punya';
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-5 rounded-2xl border transition-all ${
                        isPunya
                          ? isDark 
                            ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.08)]' 
                            : 'bg-emerald-50/70 border-emerald-200'
                          : isDark
                            ? 'bg-rose-950/20 border-rose-500/30 hover:border-rose-400/60 shadow-[0_0_15px_rgba(244,63,94,0.08)]'
                            : 'bg-rose-50/70 border-rose-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className={`p-2.5 rounded-xl mt-0.5 ${
                            isPunya ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                          }`}>
                            {isPunya ? <Heart className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-base font-bold ${
                                isPunya ? 'text-emerald-300' : 'text-rose-300'
                              }`}>
                                {item.title}
                              </span>
                              <span className="text-xs font-mono text-slate-400">
                                [{item.hindiTitle}]
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                                isPunya ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                              }`}>
                                {item.category} • {item.intensity}
                              </span>
                            </div>

                            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                              {item.description}
                            </p>

                            <div className="mt-2 text-[11px] text-amber-300/90 font-mono bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                              <span className="font-bold text-amber-400">Vedic Consequence: </span>
                              <span>{item.spiritualContext}</span>
                            </div>

                            {item.remedy && (
                              <div className="mt-1.5 text-[11px] text-cyan-300/90 font-mono bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/20">
                                <span className="font-bold text-cyan-400">Prescribed Prayashchitta (Remedy): </span>
                                <span>{item.remedy}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right: Points & Delete */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                          <div className="flex items-center gap-1.5 font-mono">
                            <span className={`text-2xl font-black ${
                              isPunya ? 'text-emerald-400' : 'text-rose-400'
                            }`}>
                              {item.points > 0 ? `+${item.points}` : item.points}
                            </span>
                            <span className="text-xs text-slate-400">Pts</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-slate-400">{item.date}</span>
                            <button
                              onClick={() => handleDeleteKarmaItem(item.id)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                              title="Delete entry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

          </div>
        )}

        {/* D. TAB 2: PUNYA ONLY EXPLORER */}
        {activeTab === 'punya' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-emerald-200 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <span>The 7 Pillars of Punya (पुण्य के सप्त स्तम्भ)</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  According to the Garuda Purana and Manu Smriti, selfless merit (Punya) elevates consciousness, generates divine protection, and dissolves past karmic suffering.
                </p>
              </div>

              <button
                onClick={() => {
                  cosmicAudio.playCyberKeystroke();
                  setIsAddPunyaModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-black uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>LOG NEW GOOD DEED</span>
              </button>
            </div>

            {/* Quick Preset Pickers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {PRESET_PUNYA_DEEDS.map((preset, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 hover:border-emerald-400/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">{preset.category}</span>
                      <span className="text-xs font-mono font-bold text-emerald-300">+{preset.points} pts</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-200">{preset.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1">{preset.description}</p>
                  </div>

                  <button
                    onClick={() => handleAddPresetPunya(preset)}
                    className="mt-3 w-full py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-mono text-[11px] font-bold border border-emerald-500/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ADD TO PERSON&apos;S RECORD</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* E. TAB 3: PAPA & SINS EXPLORER */}
        {activeTab === 'papa' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-rose-200 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                  <span>The Tri-Vidha Papa: Speech, Body & Mind Sins (त्रिविध पाप)</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  Transgressions of speech (Vachika), physical action (Kayika), and mental ill-will (Manasika) distort life harmony. Acknowledging them truthfully is the mandatory first step of Prayashchitta.
                </p>
              </div>

              <button
                onClick={() => {
                  cosmicAudio.playCyberKeystroke();
                  setIsAddPapaModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-mono text-xs font-black uppercase shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all cursor-pointer flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>RECORD SIN / CONFESSION</span>
              </button>
            </div>

            {/* Quick Preset Sins Pickers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRESET_PAPA_SINS.map((preset, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-black/40 border border-rose-500/20 hover:border-rose-400/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">{preset.category}</span>
                      <span className="text-xs font-mono font-bold text-rose-400">{preset.points} pts</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-200">{preset.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1">{preset.description}</p>
                    {preset.remedy && (
                      <p className="text-[10px] text-cyan-300/80 font-mono mt-2 bg-cyan-950/30 p-1.5 rounded border border-cyan-500/20">
                        Remedy: {preset.remedy}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddPresetPapa(preset)}
                    className="mt-3 w-full py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-mono text-[11px] font-bold border border-rose-500/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>LOG TO PERSON&apos;S RECORD</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* F. TAB 4: PANCHA RINA (5 SACRED DEBTS) */}
        {activeTab === 'debts' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30">
              <h3 className="text-lg font-serif font-bold text-amber-200 flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-400" />
                <span>The 5 Sacred Cosmic Debts of Vedic Philosophy (पंच महाऋण)</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Every soul enters physical incarnation bearing five inherent debts to ancestors (Pitru), nature forces (Deva), spiritual masters (Rishi), humanity (Manushya), and sentient animals (Bhuta). Fulfilling them unlocks total freedom (Moksha).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {debts.map((debt) => (
                <div
                  key={debt.id}
                  className="p-5 rounded-2xl bg-black/40 border border-amber-500/20 backdrop-blur-md space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-amber-200">{debt.title}</h4>
                      <p className="text-xs font-mono text-slate-400">{debt.hindiTitle}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      {debt.clearedPercentage}% Cleared
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${debt.clearedPercentage}%` }}
                    />
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {debt.description}
                  </p>

                  <div className="text-xs bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-rose-300/90 font-mono text-[11px]">
                      <span className="font-bold text-rose-400">If Unpaid: </span>
                      <span>{debt.impactOnLife}</span>
                    </div>
                    <div className="text-cyan-300/90 font-mono text-[11px] pt-1 border-t border-slate-800">
                      <span className="font-bold text-cyan-400">Prescribed Clearance Action: </span>
                      <span>{debt.remedyAction}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      cosmicAudio.playCosmicChime();
                      setDebts(prev => prev.map(d => {
                        if (d.id === debt.id) {
                          return { ...d, clearedPercentage: Math.min(100, d.clearedPercentage + 5) };
                        }
                        return d;
                      }));
                    }}
                    className="w-full py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>PERFORM REMEDY &amp; ADVANCE CLEARANCE (+5%)</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* G. TAB 5: PRAYASHCHITTA & REMEDIES */}
        {activeTab === 'remedies' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
              <h3 className="text-lg font-serif font-bold text-cyan-200 flex items-center gap-2">
                <Flame className="w-5 h-5 text-cyan-400" />
                <span>Prayashchitta Vidhi: The Science of Karmic Purification (प्रायश्चित्त शुद्धि)</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Vedic scriptures prescribe specific high-frequency vibrations, charitable distributions, sacred tree care, and fasting vows to burn stored negative impressions and reset spiritual bio-resonance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRAYASHCHITTA_REMEDIES.map((rem) => (
                <div
                  key={rem.id}
                  className="p-5 rounded-2xl bg-black/40 border border-cyan-500/20 backdrop-blur-md flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold">
                        {rem.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        +{rem.restorationPoints} Restoration Pts
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-100">{rem.name}</h4>
                    <p className="text-xs font-mono text-amber-300/80">{rem.hindiName}</p>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {rem.description}
                    </p>

                    {rem.shloka && (
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-amber-500/30 text-amber-200 font-serif text-xs leading-relaxed text-center">
                        {rem.shloka}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    {rem.frequencyHz && (
                      <button
                        onClick={() => handlePlayFrequency(rem.frequencyHz!)}
                        className={`w-full py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          activeAudioToneHz === rem.frequencyHz
                            ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                            : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40'
                        }`}
                      >
                        {activeAudioToneHz === rem.frequencyHz ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 animate-spin" />
                            <span>STOP {rem.frequencyHz} Hz HEALING TONE</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>PLAY {rem.frequencyHz} Hz PURIFICATION FREQUENCY</span>
                          </>
                        )}
                      </button>
                    )}

                    <button
                      onClick={() => {
                        cosmicAudio.playCosmicChime();
                        const pItem: KarmaItem = {
                          id: `remedy-done-${Date.now()}`,
                          title: `Prayashchitta Completed: ${rem.name}`,
                          hindiTitle: rem.hindiName,
                          type: 'punya',
                          category: 'seva',
                          points: rem.restorationPoints,
                          intensity: 'significant',
                          description: `Performed sacred atonement ritual (${rem.category}) to purify past transgressions.`,
                          spiritualContext: 'Atonement combined with genuine repentance burns Papa and restores energetic harmony.',
                          date: new Date().toISOString().split('T')[0],
                          isCustom: true
                        };
                        setProfiles(prev => prev.map(prof => {
                          if (prof.id === currentProfile.id) {
                            return { ...prof, karmaList: [pItem, ...prof.karmaList] };
                          }
                          return prof;
                        }));
                      }}
                      className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>MARK COMPLETED &amp; REBALANCE SCORE</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* H. TAB 6: DOSSIER & SUMMARY REPORT */}
        {activeTab === 'dossier' && (
          <div className="p-8 rounded-3xl bg-black/60 border border-amber-500/40 backdrop-blur-xl space-y-6">
            <div className="text-center border-b border-amber-500/30 pb-6">
              <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest">
                OFFICIAL VEDIC KARMIC CERTIFICATE OF RECORD
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-amber-100 mt-1">
                आत्मा कर्म फल दर्पण • Soul Karmic Dossier
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Subject: {currentProfile.personName} • DOB: {currentProfile.birthDate} • Zodiac: {currentProfile.rashi}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40">
                <span className="text-xs font-mono text-emerald-400 uppercase">Total Punya (Merit)</span>
                <p className="text-2xl font-mono font-black text-emerald-300 mt-1">+{calculatedStats.totalPunya} pts</p>
                <p className="text-[10px] text-slate-400 mt-1">{calculatedStats.punyaCount} Virtues Recorded</p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40">
                <span className="text-xs font-mono text-rose-400 uppercase">Total Sins (Papa)</span>
                <p className="text-2xl font-mono font-black text-rose-300 mt-1">{calculatedStats.totalPapa} pts</p>
                <p className="text-[10px] text-slate-400 mt-1">{calculatedStats.papaCount} Transgressions</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40">
                <span className="text-xs font-mono text-amber-400 uppercase">Net Karmic Index</span>
                <p className={`text-2xl font-mono font-black mt-1 ${
                  calculatedStats.netBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {calculatedStats.netBalance > 0 ? `+${calculatedStats.netBalance}` : calculatedStats.netBalance}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">{calculatedStats.rank.split('(')[0]}</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-700 space-y-2 text-xs font-mono leading-relaxed text-slate-300">
              <h4 className="font-bold text-amber-300 uppercase">Astrological &amp; Karmic Summary:</h4>
              <p>
                • <strong className="text-white">Past Life Reservoir (Sanchita):</strong> Base balance is recorded at {currentProfile.sanchitaPoints} units. Current virtues are actively shielding from major Rahu-Saturn afflictions.
              </p>
              <p>
                • <strong className="text-white">Active Present Karma (Kriyamana):</strong> The soul shows strong aptitude in {currentProfile.karmaList.filter(i => i.type === 'punya').length > 3 ? 'generosity and compassionate seva' : 'balanced self-inquiry'}, with opportunities to strengthen speech purity and ancestral offerings.
              </p>
              <p>
                • <strong className="text-white">Recommended Daily Sadhana:</strong> Practice 10 minutes of silent breath meditation (Pranayama) and regular bird/animal feeding to keep the Prana channel unobstructed.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-amber-500/20">
              <button
                onClick={() => {
                  cosmicAudio.playCosmicChime();
                  window.print();
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-mono text-xs font-black uppercase shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:bg-amber-400 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Scroll className="w-4 h-4" />
                <span>PRINT / EXPORT KARMA DOSSIER</span>
              </button>

              {onNavigate && (
                <button
                  onClick={() => onNavigate('tesla-369')}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,243,255,0.3)] cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>VIEW IN TESLA 3-6-9 SINGULARITY NEXUS</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* 3. MODAL: LOG GOOD DEED (PUNYA) */}
      <AnimatePresence>
        {isAddPunyaModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-serif font-bold text-emerald-300 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-emerald-400" />
                  <span>Log a Good Deed (पुण्य कर्म प्रविष्टि)</span>
                </h3>
                <button 
                  onClick={() => setIsAddPunyaModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddPunya} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">Deed Title / Action Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fed 20 stray animals, Helped an injured stranger..."
                    value={newPunyaTitle}
                    onChange={(e) => setNewPunyaTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Hindi Title (Optional):</label>
                  <input
                    type="text"
                    placeholder="e.g. अन्नदान व बेजुबान सेवा"
                    value={newPunyaHindi}
                    onChange={(e) => setNewPunyaHindi(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">Punya Category:</label>
                    <select
                      value={newPunyaCategory}
                      onChange={(e) => setNewPunyaCategory(e.target.value as PunyaCategory)}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-emerald-300 focus:outline-none"
                    >
                      <option value="seva">Seva (सेवा - Service)</option>
                      <option value="satya">Satya (सत्य - Truth)</option>
                      <option value="daya">Daya (दया - Compassion)</option>
                      <option value="vidya">Vidya (विद्या - Teaching)</option>
                      <option value="ahimsa">Ahimsa (अहिंसा - Non-violence)</option>
                      <option value="dharma">Dharma (धर्म - Righteous Duty)</option>
                      <option value="bhakti">Bhakti (भक्ति - Devotion)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Merit Points (+10 to +100):</label>
                    <input
                      type="number"
                      min={10}
                      max={100}
                      value={newPunyaPoints}
                      onChange={(e) => setNewPunyaPoints(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 font-bold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Description &amp; Intention:</label>
                  <textarea
                    rows={3}
                    placeholder="Describe how the act was performed and the sincerity of heart..."
                    value={newPunyaDesc}
                    onChange={(e) => setNewPunyaDesc(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsAddPunyaModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)] cursor-pointer"
                  >
                    RECORD GOOD DEED (+{newPunyaPoints} PTS)
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. MODAL: RECORD SIN / MISTAKE (PAPA) */}
      <AnimatePresence>
        {isAddPapaModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-slate-900 border border-rose-500/40 rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-serif font-bold text-rose-300 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                  <span>Record Sin / Transgression (पाप व दोष प्रविष्टि)</span>
                </h3>
                <button 
                  onClick={() => setIsAddPapaModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddPapa} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">Sin / Mistake Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lost temper and used abusive language, broke promise..."
                    value={newPapaTitle}
                    onChange={(e) => setNewPapaTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Hindi Title (Optional):</label>
                  <input
                    type="text"
                    placeholder="e.g. कटु वचन व क्रोध दोष"
                    value={newPapaHindi}
                    onChange={(e) => setNewPapaHindi(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">Sin Category:</label>
                    <select
                      value={newPapaCategory}
                      onChange={(e) => setNewPapaCategory(e.target.value as PapaCategory)}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-rose-300 focus:outline-none"
                    >
                      <option value="vachika">Vachika (वाचिक - Speech/Abuse)</option>
                      <option value="kayika">Kayika (कायिक - Physical Harm)</option>
                      <option value="manasika">Manasika (मानसिक - Envy/Malice)</option>
                      <option value="droha">Droha (द्रोह - Betrayal/Fraud)</option>
                      <option value="lobha">Lobha (लोभ - Greed/Hoarding)</option>
                      <option value="adharma">Adharma (अधर्म - Duty Neglect)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">Karmic Toll (Points -10 to -100):</label>
                    <input
                      type="number"
                      min={10}
                      max={100}
                      value={Math.abs(newPapaPoints)}
                      onChange={(e) => setNewPapaPoints(-Math.abs(Number(e.target.value)))}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-rose-400 font-bold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Context &amp; Harm Caused:</label>
                  <textarea
                    rows={2}
                    placeholder="Explain the incident with honest self-reflection..."
                    value={newPapaDesc}
                    onChange={(e) => setNewPapaDesc(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Planned Prayashchitta (Atonement):</label>
                  <input
                    type="text"
                    placeholder="e.g. Apologize sincerely, observe 1 day silence, donate food..."
                    value={newPapaRemedy}
                    onChange={(e) => setNewPapaRemedy(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsAddPapaModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(244,63,94,0.4)] cursor-pointer"
                  >
                    RECORD SIN ({newPapaPoints} PTS)
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. MODAL: CREATE NEW PERSON PROFILE */}
      <AnimatePresence>
        {isNewProfileModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-slate-900 border border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-serif font-bold text-amber-300 flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-400" />
                  <span>Create Person Karmic Profile</span>
                </h3>
                <button 
                  onClick={() => setIsNewProfileModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateProfile} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">Full Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma, Priya Patel..."
                    value={newProfileName}
                    onChange={(e) => setNewProfileName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">Rashi (Zodiac):</label>
                    <input
                      type="text"
                      value={newProfileRashi}
                      onChange={(e) => setNewProfileRashi(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Nakshatra:</label>
                    <input
                      type="text"
                      value={newProfileNakshatra}
                      onChange={(e) => setNewProfileNakshatra(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">Date of Birth:</label>
                    <input
                      type="date"
                      value={newProfileBirthDate}
                      onChange={(e) => setNewProfileBirthDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Birth City:</label>
                    <input
                      type="text"
                      value={newProfileBirthCity}
                      onChange={(e) => setNewProfileBirthCity(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsNewProfileModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.4)] cursor-pointer"
                  >
                    INITIALIZE KARMIC LEDGER
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
