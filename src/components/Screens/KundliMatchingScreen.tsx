import React, { useState, useRef } from 'react';
import { ThemeMode, UserProfile } from '../../types';
import { calculateAshtaKutaMilan, MatchMakingResult, deriveMoonSignAndNakshatra } from '../../utils/astrologyEngine';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { generateKundliMatchingPDF } from '../../utils/kundliPdfGenerator';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Bot,
  ArrowRightLeft,
  Copy,
  Check,
  Clock,
  MapPin,
  Download,
  FileText,
  Printer,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface KundliMatchingScreenProps {
  theme: ThemeMode;
  user: UserProfile;
}

const POPULAR_BIRTH_PLACES = [
  'Mandi, Himachal Pradesh',
  'Shimla, Himachal Pradesh',
  'Kullu, Himachal Pradesh',
  'Dharamshala, Himachal Pradesh',
  'Kangra, Himachal Pradesh',
  'Solan, Himachal Pradesh',
  'Chandigarh',
  'New Delhi',
  'Varanasi, Uttar Pradesh',
  'Haridwar, Uttarakhand',
  'Jaipur, Rajasthan',
  'Mumbai, Maharashtra',
  'Bengaluru, Karnataka',
  'Kolkata, West Bengal',
  'Patna, Bihar',
  'Ahmedabad, Gujarat',
];

const SAMPLE_COUPLES = [
  {
    label: '✨ High Match (30 Gunas) - Mandi & Shimla',
    name1: 'Aarav Sharma',
    dob1: '1995-04-12',
    time1: '08:45',
    place1: 'Mandi, Himachal Pradesh',
    name2: 'Priya Patel',
    dob2: '1997-09-24',
    time2: '14:30',
    place2: 'Shimla, Himachal Pradesh',
  },
  {
    label: '🌊 Water-Earth Harmony (28 Gunas) - Kullu & Kangra',
    name1: 'Rohan Verma',
    dob1: '1994-08-18',
    time1: '06:15',
    place1: 'Kullu, Himachal Pradesh',
    name2: 'Ananya Iyer',
    dob2: '1996-03-05',
    time2: '18:20',
    place2: 'Kangra, Himachal Pradesh',
  },
  {
    label: '⚖️ Moderate Synergy (21.5 Gunas) - Delhi & Varanasi',
    name1: 'Dev Malhotra',
    dob1: '1993-11-20',
    time1: '11:10',
    place1: 'New Delhi',
    name2: 'Ishita Roy',
    dob2: '1996-06-15',
    time2: '09:40',
    place2: 'Varanasi, Uttar Pradesh',
  },
  {
    label: '⚠️ Nadi Dosha Test (14 Gunas) - Solan & Dharamshala',
    name1: 'Kabir Singhania',
    dob1: '1992-02-14',
    time1: '23:50',
    place1: 'Solan, Himachal Pradesh',
    name2: 'Meera Kapoor',
    dob2: '1995-10-30',
    time2: '07:15',
    place2: 'Dharamshala, Himachal Pradesh',
  },
];

export const KundliMatchingScreen: React.FC<KundliMatchingScreenProps> = ({ theme, user }) => {
  const isDark = theme === 'dark';
  const resultRef = useRef<HTMLDivElement>(null);

  // Person 1 (Partner 1 / Groom)
  const [name1, setName1] = useState(user.name || 'Aarav Sharma');
  const [dob1, setDob1] = useState(user.birthDate || '1995-04-12');
  const [time1, setTime1] = useState('08:45');
  const [place1, setPlace1] = useState('Mandi, Himachal Pradesh');
  const [showPlace1Panel, setShowPlace1Panel] = useState(false);

  // Person 2 (Partner 2 / Bride)
  const [name2, setName2] = useState('Priya Patel');
  const [dob2, setDob2] = useState('1997-09-24');
  const [time2, setTime2] = useState('14:30');
  const [place2, setPlace2] = useState('Shimla, Himachal Pradesh');
  const [showPlace2Panel, setShowPlace2Panel] = useState(false);

  // Auto-derived Rashi & Nakshatra for visual display
  const derived1 = deriveMoonSignAndNakshatra(dob1, time1, place1);
  const derived2 = deriveMoonSignAndNakshatra(dob2, time2, place2);

  const [matchResult, setMatchResult] = useState<MatchMakingResult>(() =>
    calculateAshtaKutaMilan(name1, dob1, undefined, undefined, name2, dob2, undefined, undefined, time1, place1, time2, place2)
  );

  const [isCalculating, setIsCalculating] = useState(false);
  const [justCalculated, setJustCalculated] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfDownloadedToast, setPdfDownloadedToast] = useState(false);

  const [aiReport, setAiReport] = useState<{
    verdict?: string;
    summary?: string;
    analysis?: string;
    recommendations?: string[];
  } | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const performCalculation = () => {
    setIsCalculating(true);
    cosmicAudio.playCosmicChime(528);

    setTimeout(() => {
      const res = calculateAshtaKutaMilan(
        name1,
        dob1,
        undefined,
        undefined,
        name2,
        dob2,
        undefined,
        undefined,
        time1,
        place1,
        time2,
        place2
      );
      setMatchResult(res);
      setIsCalculating(false);
      setJustCalculated(true);

      // Auto-scroll to results smoothly
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      if (res.totalGuna >= 20) {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#f59e0b', '#ec4899', '#38bdf8', '#ffffff'],
        });
      }

      setTimeout(() => setJustCalculated(false), 3000);
    }, 280);
  };

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    performCalculation();
  };

  const handleSwapPartners = () => {
    const tempName = name1;
    const tempDob = dob1;
    const tempTime = time1;
    const tempPlace = place1;

    setName1(name2);
    setDob1(dob2);
    setTime1(time2);
    setPlace1(place2);

    setName2(tempName);
    setDob2(tempDob);
    setTime2(tempTime);
    setPlace2(tempPlace);

    cosmicAudio.playTibetanBowl(432, 2.0, 0.4);
    setTimeout(() => {
      const res = calculateAshtaKutaMilan(
        name2,
        dob2,
        undefined,
        undefined,
        tempName,
        tempDob,
        undefined,
        undefined,
        time2,
        place2,
        tempTime,
        tempPlace
      );
      setMatchResult(res);
    }, 50);
  };

  const handleLoadSample = (sample: typeof SAMPLE_COUPLES[0]) => {
    setName1(sample.name1);
    setDob1(sample.dob1);
    setTime1(sample.time1);
    setPlace1(sample.place1);

    setName2(sample.name2);
    setDob2(sample.dob2);
    setTime2(sample.time2);
    setPlace2(sample.place2);

    cosmicAudio.playCosmicChime(528);

    const res = calculateAshtaKutaMilan(
      sample.name1,
      sample.dob1,
      undefined,
      undefined,
      sample.name2,
      sample.dob2,
      undefined,
      undefined,
      sample.time1,
      sample.place1,
      sample.time2,
      sample.place2
    );
    setMatchResult(res);
    setJustCalculated(true);
    setTimeout(() => setJustCalculated(false), 2500);

    if (res.totalGuna >= 24) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f59e0b', '#ec4899', '#ffffff'],
      });
    }
  };

  const handleDownloadPdf = () => {
    setIsDownloadingPdf(true);
    cosmicAudio.playCosmicChime(600);

    setTimeout(() => {
      try {
        generateKundliMatchingPDF(
          matchResult,
          aiReport?.analysis,
          aiReport?.recommendations
        );
        setPdfDownloadedToast(true);
        cosmicAudio.playTibetanBowl(528, 2.0, 0.5);
        setTimeout(() => setPdfDownloadedToast(false), 4000);
      } catch (err) {
        console.error('PDF Generation error:', err);
      } finally {
        setIsDownloadingPdf(false);
      }
    }, 300);
  };

  const handlePrintReport = () => {
    cosmicAudio.playTone(520, 0.15);
    window.print();
  };

  const handleCopySummary = () => {
    const text = `✦ Vedic Kundli Ashta-Kuta Milan Report (कालचक्र विवाह पत्रिका) ✦
Partner 1 (Groom): ${matchResult.person1.name} | DOB: ${matchResult.person1.birthDate} ${matchResult.person1.birthTime ? `at ${matchResult.person1.birthTime}` : ''} | Place: ${matchResult.person1.birthPlace || 'N/A'}
Moon Sign: ${matchResult.person1.rashi} | Nakshatra: ${matchResult.person1.nakshatra}

Partner 2 (Bride): ${matchResult.person2.name} | DOB: ${matchResult.person2.birthDate} ${matchResult.person2.birthTime ? `at ${matchResult.person2.birthTime}` : ''} | Place: ${matchResult.person2.birthPlace || 'N/A'}
Moon Sign: ${matchResult.person2.rashi} | Nakshatra: ${matchResult.person2.nakshatra}

Total Guna Score: ${matchResult.totalGuna} / 36 Gunas
Verdict: ${matchResult.verdict} (${matchResult.psychologicalResonance}% Alignment)
Manglik Compatibility: ${matchResult.manglikStatus.compatible ? 'Harmonious Mars Alignment' : 'Remedial Puja Advised'} (${matchResult.manglikStatus.reason})
Elemental Harmony: ${matchResult.elementalHarmony}

Calculated via Kalachakra Vedic Astrology Engine.`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    cosmicAudio.playTone(600, 0.1);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleFetchAiSynastry = async () => {
    setIsLoadingAI(true);
    cosmicAudio.playCosmicChime(432);
    try {
      const res = await fetch('/api/ai/kundli-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          person1: matchResult.person1,
          person2: matchResult.person2,
          gunaScore: matchResult.totalGuna,
          doshas: matchResult.manglikStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAiReport({
          verdict: data.compatibilityVerdict,
          summary: data.scoreSummary,
          analysis: data.analysis,
          recommendations: data.recommendations,
        });
      } else {
        throw new Error('API reported false');
      }
    } catch (err) {
      console.warn('Using client-side Vedic AI Acharya synthesis fallback:', err);
      // Graceful rich Vedic fallback
      const isHigh = matchResult.totalGuna >= 24;
      setAiReport({
        verdict: isHigh ? 'Exceptionally Auspicious Vivaha Union (Uttam Milan)' : 'Harmonious Union with Guided Remedies (Madhyam Milan)',
        summary: `Ashta-Kuta score of ${matchResult.totalGuna}/36 indicates strong ${matchResult.elementalHarmony.toLowerCase()} with solid psychological bonding.`,
        analysis: `Acharya Vidyadhar's Analysis: The celestial placements of ${matchResult.person1.name} (Born at ${matchResult.person1.birthPlace || 'Mandi'}, ${matchResult.person1.rashi}) and ${matchResult.person2.name} (Born at ${matchResult.person2.birthPlace || 'Shimla'}, ${matchResult.person2.rashi}) reflect a profound karmic resonance. With ${matchResult.totalGuna} out of 36 Gunas aligned, this union balances spiritual duty (Dharma) with emotional stability (Kama). Mutual Mars vitality is ${matchResult.manglikStatus.compatible ? 'naturally harmonized' : 'supported through light remedial practices'}.`,
        recommendations: [
          'Perform a joint Gauri-Shankar Abhishek with raw milk and bilva leaves on Shukla Paksha Monday.',
          'Place a pure brass or Sphatik Sri Yantra in the North-East Ishanya corner of your shared sanctum.',
          'Chant the sacred Maha Mrityunjaya Mantra 11 times together at sunrise during planetary transitions.'
        ],
      });
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-3 text-xs font-cinzel tracking-widest uppercase shadow-sm"
          style={{
            backgroundColor: isDark ? 'rgba(212, 175, 55, 0.12)' : 'rgba(245, 238, 218, 0.95)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.45)' : 'rgba(197, 160, 89, 0.6)',
            color: '#d4af37',
          }}
        >
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
          <span>Vedic Ashta-Kuta 36 Guna Milan & Vivaha Patrika</span>
        </div>

        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold tracking-wide uppercase ${
          isDark ? 'text-gold-gradient text-3d-gold' : 'text-[#3b2b0a] text-3d-celestial'
        }`}>
          Kundli Matching & 36 Guna Milan
        </h1>

        <p className={`text-sm font-serif max-w-2xl mx-auto mt-2 ${
          isDark ? 'text-gray-300' : 'text-[#5a4313]'
        }`}>
          8-Fold Vedic Ashta-Kuta Assessment (वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट, नाड़ी), जन्म समय व जन्म स्थान (मंडी, शिमला, दिल्ली आदि) आधारित सूक्ष्म गणना, मांगलिक विचार एवं मुद्रण योग्य PDF रिपोर्ट।
        </p>

        {/* Quick Sample Presets */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[0.7rem] font-cinzel text-amber-400/80 uppercase tracking-wider mr-1">
            Test Quick Presets:
          </span>
          {SAMPLE_COUPLES.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => handleLoadSample(c)}
              className={`px-3 py-1 rounded-lg text-[0.7rem] font-cinzel font-semibold transition-all border cursor-pointer ${
                isDark
                  ? 'bg-amber-950/30 border-amber-500/30 text-amber-200 hover:bg-amber-900/50 hover:border-amber-400'
                  : 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form for Two Partners */}
      <form
        onSubmit={handleMatch}
        className={`p-6 sm:p-7 rounded-2xl border mb-8 transition-all relative ${
          isDark ? 'glassmorphism-dark border-[#d4af37]/40 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/50 shadow-md'
        }`}
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <span className="text-xs font-cinzel font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Enter Birth Time, Birth Place & Astrological Details</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSwapPartners}
              className={`px-3 py-1.5 rounded-lg border text-xs font-cinzel flex items-center gap-1.5 transition-all cursor-pointer ${
                isDark
                  ? 'bg-purple-950/40 border-purple-500/40 text-purple-200 hover:bg-purple-900/60'
                  : 'bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100'
              }`}
              title="Swap Partner 1 and Partner 2"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Swap Partners</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* Partner 1 Box (Groom / Vara) */}
          <div className={`p-4 sm:p-5 rounded-xl border transition-all ${
            isDark ? 'bg-black/50 border-[#d4af37]/30' : 'bg-white/90 border-[#c5a059]/40 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-cinzel font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
                <span>Partner 1 (वर / Groom)</span>
              </h3>
              <span className="text-[0.65rem] font-mono text-amber-300/80 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                First Soul Coordinates
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="text-[0.7rem] font-cinzel text-gray-400 block mb-1">Full Name (नाम)</label>
                <input
                  id="partner1-name"
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border text-xs outline-none transition-all ${
                    isDark ? 'bg-black/60 border-amber-500/30 text-white focus:border-amber-400' : 'bg-white border-amber-300 text-gray-900 focus:border-amber-500'
                  }`}
                  placeholder="e.g. Aarav Sharma"
                />
              </div>

              {/* DOB and Birth Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[0.7rem] font-cinzel text-gray-400 block mb-1">
                    Date of Birth (जन्म तिथि)
                  </label>
                  <input
                    id="partner1-dob"
                    type="date"
                    value={dob1}
                    onChange={(e) => setDob1(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-xs outline-none ${
                      isDark ? 'bg-black/60 border-amber-500/30 text-white' : 'bg-white border-amber-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[0.7rem] font-cinzel text-gray-400 flex items-center gap-1 mb-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>Birth Time (जन्म समय)</span>
                  </label>
                  <input
                    id="partner1-time"
                    type="time"
                    value={time1}
                    onChange={(e) => setTime1(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-xs outline-none ${
                      isDark ? 'bg-black/60 border-amber-500/30 text-white' : 'bg-white border-amber-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>

              {/* Birth Place with Panel Selector */}
              <div className="relative">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[0.7rem] font-cinzel text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>Birth Place (जन्म स्थान)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPlace1Panel(!showPlace1Panel)}
                    className="text-[0.65rem] font-cinzel text-amber-400 hover:text-amber-300 underline cursor-pointer"
                  >
                    {showPlace1Panel ? 'Close Cities' : 'Select City'}
                  </button>
                </div>
                <input
                  id="partner1-place"
                  type="text"
                  value={place1}
                  onChange={(e) => setPlace1(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border text-xs outline-none transition-all ${
                    isDark ? 'bg-black/60 border-amber-500/30 text-white focus:border-amber-400' : 'bg-white border-amber-300 text-gray-900 focus:border-amber-500'
                  }`}
                  placeholder="e.g. Mandi, Himachal Pradesh"
                />

                {/* City Selection Panel */}
                {showPlace1Panel && (
                  <div className={`mt-2 p-2.5 rounded-lg border text-xs z-20 ${
                    isDark ? 'bg-zinc-900 border-amber-500/40 shadow-xl' : 'bg-amber-50/95 border-amber-300 shadow-md'
                  }`}>
                    <div className="text-[0.68rem] font-cinzel text-amber-400 font-bold mb-1.5 flex items-center gap-1">
                      <Compass className="w-3 h-3" />
                      <span>Popular Birth Places (क्लिक करके चुनें):</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                      {POPULAR_BIRTH_PLACES.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            setPlace1(city);
                            setShowPlace1Panel(false);
                            cosmicAudio.playTone(550, 0.08);
                          }}
                          className={`px-2 py-1 rounded text-[0.68rem] transition-colors cursor-pointer text-left ${
                            place1 === city
                              ? 'bg-amber-500 text-black font-bold'
                              : isDark
                              ? 'bg-black/50 text-gray-300 hover:bg-amber-500/20 hover:text-amber-200 border border-zinc-800'
                              : 'bg-white text-gray-800 hover:bg-amber-100 border border-amber-200'
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Auto-derived Vedic Moon Sign & Nakshatra */}
              <div className={`p-3 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ${
                isDark ? 'bg-amber-950/20 border-amber-500/25 text-amber-200' : 'bg-amber-50/80 border-amber-200 text-amber-900'
              }`}>
                <div className="flex items-center gap-1.5 text-xs font-cinzel">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold">स्वतः गणना (Auto Calculated):</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-[0.7rem] font-mono">
                  <span className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30">
                    चंद्र राशि: <strong className="text-amber-300 font-bold">{derived1.rashi}</strong>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30">
                    नक्षत्र: <strong className="text-amber-300 font-bold">{derived1.nakshatra}</strong> (चरण {derived1.pada})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Partner 2 Box (Bride / Kanya) */}
          <div className={`p-4 sm:p-5 rounded-xl border transition-all ${
            isDark ? 'bg-black/50 border-[#d4af37]/30' : 'bg-white/90 border-[#c5a059]/40 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-cinzel font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400 inline-block"></span>
                <span>Partner 2 (वधू / Bride)</span>
              </h3>
              <span className="text-[0.65rem] font-mono text-rose-300/80 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                Second Soul Coordinates
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="text-[0.7rem] font-cinzel text-gray-400 block mb-1">Full Name (नाम)</label>
                <input
                  id="partner2-name"
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border text-xs outline-none transition-all ${
                    isDark ? 'bg-black/60 border-rose-500/30 text-white focus:border-rose-400' : 'bg-white border-rose-300 text-gray-900 focus:border-rose-500'
                  }`}
                  placeholder="e.g. Priya Patel"
                />
              </div>

              {/* DOB and Birth Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[0.7rem] font-cinzel text-gray-400 block mb-1">
                    Date of Birth (जन्म तिथि)
                  </label>
                  <input
                    id="partner2-dob"
                    type="date"
                    value={dob2}
                    onChange={(e) => setDob2(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-xs outline-none ${
                      isDark ? 'bg-black/60 border-rose-500/30 text-white' : 'bg-white border-rose-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[0.7rem] font-cinzel text-gray-400 flex items-center gap-1 mb-1">
                    <Clock className="w-3 h-3 text-rose-400" />
                    <span>Birth Time (जन्म समय)</span>
                  </label>
                  <input
                    id="partner2-time"
                    type="time"
                    value={time2}
                    onChange={(e) => setTime2(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-xs outline-none ${
                      isDark ? 'bg-black/60 border-rose-500/30 text-white' : 'bg-white border-rose-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>

              {/* Birth Place with Panel Selector */}
              <div className="relative">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[0.7rem] font-cinzel text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>Birth Place (जन्म स्थान)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPlace2Panel(!showPlace2Panel)}
                    className="text-[0.65rem] font-cinzel text-rose-400 hover:text-rose-300 underline cursor-pointer"
                  >
                    {showPlace2Panel ? 'Close Cities' : 'Select City'}
                  </button>
                </div>
                <input
                  id="partner2-place"
                  type="text"
                  value={place2}
                  onChange={(e) => setPlace2(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border text-xs outline-none transition-all ${
                    isDark ? 'bg-black/60 border-rose-500/30 text-white focus:border-rose-400' : 'bg-white border-rose-300 text-gray-900 focus:border-rose-500'
                  }`}
                  placeholder="e.g. Shimla, Himachal Pradesh"
                />

                {/* City Selection Panel */}
                {showPlace2Panel && (
                  <div className={`mt-2 p-2.5 rounded-lg border text-xs z-20 ${
                    isDark ? 'bg-zinc-900 border-rose-500/40 shadow-xl' : 'bg-rose-50/95 border-rose-300 shadow-md'
                  }`}>
                    <div className="text-[0.68rem] font-cinzel text-rose-400 font-bold mb-1.5 flex items-center gap-1">
                      <Compass className="w-3 h-3" />
                      <span>Popular Birth Places (क्लिक करके चुनें):</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                      {POPULAR_BIRTH_PLACES.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            setPlace2(city);
                            setShowPlace2Panel(false);
                            cosmicAudio.playTone(580, 0.08);
                          }}
                          className={`px-2 py-1 rounded text-[0.68rem] transition-colors cursor-pointer text-left ${
                            place2 === city
                              ? 'bg-rose-500 text-white font-bold'
                              : isDark
                              ? 'bg-black/50 text-gray-300 hover:bg-rose-500/20 hover:text-rose-200 border border-zinc-800'
                              : 'bg-white text-gray-800 hover:bg-rose-100 border border-rose-200'
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Auto-derived Vedic Moon Sign & Nakshatra */}
              <div className={`p-3 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ${
                isDark ? 'bg-rose-950/20 border-rose-500/25 text-rose-200' : 'bg-rose-50/80 border-rose-200 text-rose-900'
              }`}>
                <div className="flex items-center gap-1.5 text-xs font-cinzel">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  <span className="font-semibold">स्वतः गणना (Auto Calculated):</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-[0.7rem] font-mono">
                  <span className="px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/30">
                    चंद्र राशि: <strong className="text-rose-300 font-bold">{derived2.rashi}</strong>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/30">
                    नक्षत्र: <strong className="text-rose-300 font-bold">{derived2.nakshatra}</strong> (चरण {derived2.pada})
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            id="match-calc-btn"
            type="submit"
            disabled={isCalculating}
            onClick={handleMatch}
            className={`flex-1 w-full py-3.5 px-6 rounded-xl font-cinzel font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99] ${
              isDark
                ? 'bg-gold-gradient-btn text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.8)] border border-amber-300/40'
                : 'bg-[#c5a059] text-white hover:bg-[#a8823b] shadow-amber-900/20'
            } ${isCalculating ? 'opacity-75 cursor-wait' : ''}`}
          >
            <Sparkles className={`w-4 h-4 ${isCalculating ? 'animate-spin text-amber-700' : 'text-amber-900'}`} />
            <span>{isCalculating ? 'Recalculating Ashta-Kuta Milan...' : 'Calculate 36 Guna Milan (36 गुण मिलान करें)'}</span>
          </button>

          {/* Quick PDF Download Button directly on the form */}
          <button
            id="download-milan-pdf-form-btn"
            type="button"
            onClick={handleDownloadPdf}
            disabled={isDownloadingPdf}
            className={`w-full sm:w-auto py-3.5 px-5 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border ${
              isDark
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 hover:border-emerald-400'
                : 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100 shadow-sm'
            }`}
            title="Download Official PDF Report"
          >
            <Download className={`w-4 h-4 ${isDownloadingPdf ? 'animate-bounce text-emerald-400' : 'text-emerald-400'}`} />
            <span>{isDownloadingPdf ? 'Generating PDF...' : 'Download PDF (पीडीएफ)'}</span>
          </button>
        </div>

        {justCalculated && (
          <div className="mt-3 text-center text-xs font-cinzel text-emerald-400 font-semibold animate-fadeIn flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Ashtakoota 36 Gunas, Time & Place Coordinates Calculated Successfully!</span>
          </div>
        )}

        {pdfDownloadedToast && (
          <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-center text-xs font-cinzel text-emerald-300 font-bold animate-fadeIn flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Official Kundli Milan PDF Patrika Downloaded Successfully! (पत्रिका सेव हो गई है)</span>
          </div>
        )}
      </form>

      {/* Match Result Score Banner */}
      <div ref={resultRef} className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 scroll-mt-24">
        
        {/* Total Score Meter (5 Cols) */}
        <div className={`md:col-span-5 p-6 rounded-2xl border flex flex-col items-center justify-center text-center transition-all relative ${
          isDark ? 'glassmorphism-dark border-[#d4af37]/45 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/60 shadow-lg'
        }`}>
          <span className="text-xs font-cinzel uppercase tracking-widest text-[#d4af37] mb-1 font-semibold">
            Ashta-Kuta Total Milan Score
          </span>

          <div className="relative my-4 flex items-center justify-center">
            <div className={`w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center bg-black/40 shadow-[0_0_35px_rgba(212,175,55,0.35)] transition-all ${
              matchResult.totalGuna >= 24
                ? 'border-emerald-400/80 shadow-emerald-500/20'
                : matchResult.totalGuna >= 18
                ? 'border-[#d4af37] shadow-amber-500/20'
                : 'border-rose-400/80 shadow-rose-500/20'
            }`}>
              <span className="text-4xl sm:text-5xl font-cinzel font-bold text-gold-gradient">
                {matchResult.totalGuna}
              </span>
              <span className="text-xs font-mono text-gray-400 mt-1">/ 36 Gunas</span>
            </div>
          </div>

          <div className={`px-4 py-1.5 rounded-full text-xs font-cinzel font-bold mb-3 ${
            matchResult.totalGuna >= 28
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : matchResult.totalGuna >= 18
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
          }`}>
            {matchResult.verdict}
          </div>

          <p className="text-xs font-serif text-gray-300 mb-4 px-2">
            {matchResult.totalGuna >= 18
              ? 'Meets standard Vedic threshold (18+ Gunas) for a harmonious matrimonial union.'
              : 'Below standard 18-Guna threshold. Remedial pujas, Yantra energization, and chart review recommended.'}
          </p>

          {/* Action Buttons: PDF Download, Print & Copy */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full pt-2 border-t border-amber-500/20">
            <button
              id="download-milan-pdf-score-btn"
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloadingPdf}
              className={`px-3.5 py-2 rounded-lg text-xs font-cinzel font-bold flex items-center gap-1.5 border transition-all cursor-pointer shadow-sm ${
                isDark
                  ? 'bg-emerald-900/60 border-emerald-500/60 text-emerald-200 hover:bg-emerald-800 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-emerald-600 border-emerald-700 text-white hover:bg-emerald-700'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isDownloadingPdf ? 'Generating PDF...' : 'Download PDF Report'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrintReport}
              className={`px-3 py-2 rounded-lg text-xs font-cinzel font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                isDark
                  ? 'bg-zinc-800/80 border-zinc-600 text-zinc-200 hover:bg-zinc-700'
                  : 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200'
              }`}
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={handleCopySummary}
              className={`px-3 py-2 rounded-lg text-xs font-cinzel font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                copiedSummary
                  ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                  : isDark
                  ? 'bg-amber-950/30 border-amber-500/30 text-amber-200 hover:bg-amber-900/50'
                  : 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200'
              }`}
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? 'Copied!' : 'Copy Summary'}</span>
            </button>
          </div>
        </div>

        {/* Manglik & Resonance Status (7 Cols) */}
        <div className="md:col-span-7 flex flex-col gap-4">
          
          {/* Manglik Dosha Status */}
          <div className={`p-5 rounded-2xl border ${
            isDark ? 'glassmorphism-dark border-[#d4af37]/35 text-gray-200' : 'glassmorphism-light border-[#c5a059]/40 text-[#3b2b0a]'
          }`}>
            <h3 className="text-xs font-cinzel font-bold text-[#d4af37] uppercase tracking-wider mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Manglik (Kuja) Dosha Assessment (मांगलिक दोष विचार)</span>
            </h3>
            <p className="text-xs font-serif leading-relaxed mb-3">
              {matchResult.manglikStatus.reason}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono pt-2 border-t border-amber-500/20">
              <span className="text-gray-400">Mutual Mars Dynamics:</span>
              <span className={matchResult.manglikStatus.compatible ? 'text-emerald-400 font-bold flex items-center gap-1' : 'text-amber-400 font-bold flex items-center gap-1'}>
                {matchResult.manglikStatus.compatible ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                {matchResult.manglikStatus.compatible ? 'Harmonic Mars Energy' : 'Remedial Action Advised'}
              </span>
            </div>
          </div>

          {/* Elemental Harmony Card */}
          <div className={`p-4 rounded-xl border flex items-center justify-between ${
            isDark ? 'bg-black/40 border-[#d4af37]/25 text-gray-200' : 'bg-white/80 border-[#c5a059]/30 text-[#3b2b0a]'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <span className="text-[0.65rem] font-cinzel text-gray-400 block uppercase">Elemental Synergy</span>
                <span className="text-xs font-cinzel font-bold text-[#d4af37]">{matchResult.elementalHarmony}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[0.65rem] font-cinzel text-gray-400 block uppercase">Psychological Resonance</span>
              <span className="text-sm font-mono font-bold text-amber-300">{matchResult.psychologicalResonance}%</span>
            </div>
          </div>

          {/* AI Synastry Report Generation Button / Banner */}
          <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
            isDark ? 'bg-black/50 border-[#d4af37]/30' : 'bg-white/80 border-[#c5a059]/30'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-cinzel font-bold text-[#d4af37] uppercase flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span>AI Acharya Deep Synastry Analysis</span>
                </h3>
                <span className="text-[0.65rem] font-mono text-purple-400 px-2 py-0.5 rounded bg-purple-950/40 border border-purple-500/30">
                  Gemini Flash + Vedic Engine
                </span>
              </div>
              <p className="text-xs font-serif text-gray-300 mb-3">
                Generate in-depth astrological commentary analyzing karmic longevity, emotional bonding, and shared dharma.
              </p>
            </div>

            <button
              id="ai-synastry-btn"
              type="button"
              onClick={handleFetchAiSynastry}
              disabled={isLoadingAI}
              className={`py-2.5 px-4 rounded-xl font-cinzel font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isDark
                  ? 'bg-purple-900/50 border border-purple-500/50 text-purple-200 hover:bg-purple-900/70 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  : 'bg-amber-100 border border-amber-300 text-amber-900 hover:bg-amber-200 shadow-sm'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isLoadingAI ? 'animate-spin text-purple-300' : 'text-purple-400'}`} />
              <span>{isLoadingAI ? 'Consulting Acharya Vidyadhar...' : 'Generate In-Depth AI Synastry Report'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* AI Synastry Output Box */}
      {aiReport && (
        <div className={`p-6 rounded-2xl border mb-8 animate-fadeIn ${
          isDark ? 'glassmorphism-dark border-purple-500/40 text-gray-200 shadow-lg' : 'glassmorphism-light border-purple-300 text-gray-900 shadow-md'
        }`}>
          <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-cinzel font-bold text-gold-gradient">
                Cosmic Synastry Interpretation by Acharya Vidyadhar
              </h3>
            </div>
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="text-xs font-cinzel text-emerald-400 hover:text-emerald-300 flex items-center gap-1 border border-emerald-500/30 px-2.5 py-1 rounded-lg bg-emerald-950/40 cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>Include in PDF Report</span>
            </button>
          </div>
          <p className="text-xs font-serif leading-relaxed mb-4">{aiReport.analysis}</p>

          {aiReport.recommendations && aiReport.recommendations.length > 0 && (
            <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs font-serif">
              <strong className="font-cinzel text-purple-300 block mb-1">Recommended Harmonizing Practices (वैदिक उपाय):</strong>
              <ul className="list-disc list-inside space-y-1 text-purple-200/90">
                {aiReport.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 8 Kutas Detailed Breakdown Table */}
      <div className={`p-6 rounded-2xl border transition-all ${
        isDark ? 'glassmorphism-dark border-[#d4af37]/40 text-gray-200 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/50 text-[#3b2b0a] shadow-md'
      }`}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-sm font-cinzel font-bold text-[#d4af37] uppercase tracking-wider">
            Detailed Ashta-Kuta 8-Fold Vedic Breakdown (अष्टकूट विवरण)
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-[0.65rem] font-mono text-gray-400">
              Total Obtained: <strong className="text-amber-300">{matchResult.totalGuna}</strong> / 36
            </span>
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="text-xs font-cinzel text-amber-300 hover:text-amber-200 flex items-center gap-1 border border-amber-500/30 px-2 py-1 rounded bg-amber-950/30 cursor-pointer"
              title="Download Full Table in PDF"
            >
              <Download className="w-3 h-3" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-serif border-collapse">
            <thead>
              <tr className={`border-b font-cinzel text-[0.7rem] uppercase tracking-wider ${
                isDark ? 'border-[#d4af37]/30 text-[#d4af37]' : 'border-[#c5a059]/40 text-[#8a6514]'
              }`}>
                <th className="py-2.5 px-3">Kuta (Vedic Domain)</th>
                <th className="py-2.5 px-3 text-center">Max Score</th>
                <th className="py-2.5 px-3 text-center">Obtained</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Significance</th>
                <th className="py-2.5 px-3">Compatibility Analysis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40">
              {matchResult.kutas.map((k) => (
                <tr key={k.kuta} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-cinzel font-bold">
                    <span>{k.kuta}</span>
                    <span className="text-[0.65rem] text-[#d4af37] block font-serif">{k.sanskritName}</span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold">{k.maxScore}</td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-amber-300">
                    {k.obtainedScore}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[0.65rem] font-cinzel font-semibold ${
                      k.status === 'Full Match'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : k.status === 'Partial Match'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {k.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-300">{k.significance}</td>
                  <td className="py-3 px-3 text-gray-400 italic text-[0.7rem]">{k.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
