import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  Repeat, 
  Sparkles, 
  Sun,
  Flame,
  Award,
  Mic,
  Gauge,
  Upload,
  Music,
  CheckCircle2,
  Trash2,
  FastForward,
  Rewind
} from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynthesizer';
import { audioManager } from '../utils/audioStateManager';
import { saveAudioTrack, getAudioTrack, deleteAudioTrack, StoredAudioTrack } from '../utils/audioStorage';
import { ThemeMode } from '../types';
import confetti from 'canvas-confetti';

interface MantraAudioPlayerProps {
  theme: ThemeMode;
}

export interface SacredMantraItem {
  id: string;
  name: string;
  hindiName: string;
  deity: string;
  freq: number;
  desc: string;
  sanskrit: string;
  words: string[];
  transliteration: string;
  meaning: string;
}

const SACRED_MANTRAS: SacredMantraItem[] = [
  { 
    id: 'gayatri', 
    name: 'Gayatri Mantra',
    hindiName: 'गायत्री मंत्रा',
    deity: 'Goddess Gayatri & Surya Savitr',
    freq: 432, 
    desc: 'Supreme Vedic illumination of intellect & solar prana',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
    words: ['ॐ', 'भूर्भुवः', 'स्वः', 'तत्सवितुर्वरेण्यं', 'भर्गो', 'देवस्य', 'धीमहि', 'धियो', 'यो', 'नः', 'प्रचोदयात्'],
    transliteration: 'Oṁ Bhūr Bhuvaḥ Svaḥ Tat Savitur Vareṇyaṁ Bhargo Devasya Dhīmahi Dhiyo Yo Naḥ Pracodayāt',
    meaning: 'हम उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा का ध्यान करते हैं; वह परमात्मा हमारी बुद्धि को सन्मार्ग में प्रेरित करे।'
  },
  { 
    id: 'mrityunjaya', 
    name: 'Maha Mrityunjaya', 
    hindiName: 'महामृत्युंजय मंत्र',
    deity: 'Lord Shiva Tryambaka',
    freq: 639, 
    desc: 'Immortality, rejuvenation, and liberation from fear',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्॥',
    words: ['ॐ', 'त्र्यम्बकं', 'यजामहे', 'सुगन्धिं', 'पुष्टिवर्धनम्', 'उर्वारुकमिव', 'बन्धनान्', 'मृत्योर्मुक्षीय', 'मामृतात्'],
    transliteration: 'Oṁ Tryambakaṁ Yajāmahe Sugandhiṁ Puṣṭivardhanam | Urvārukamiva Bandhanān Mṛtyormukṣīya Māmṛtāt',
    meaning: 'हम त्रिनेत्रधारी भगवान शिव की आराधना करते हैं, जो सभी में प्राण शक्ति का पोषण करते हैं। वे हमें मृत्यु के बंधनों से मुक्त कर मोक्ष प्रदान करें।'
  },
  { 
    id: 'om_namah', 
    name: 'Om Namah Shivaya', 
    hindiName: 'पञ्चाक्षर महामंत्र',
    deity: 'Lord Shiva',
    freq: 963, 
    desc: 'Panchakshara 5-elements purification and pure consciousness',
    sanskrit: 'ॐ नमः शिवाय॥',
    words: ['ॐ', 'नमः', 'शिवाय'],
    transliteration: 'Oṁ Namaḥ Śivāya',
    meaning: 'समस्त ब्रह्मांड के चेतना स्वरूप परमपिता भगवान शिव को मेरा शत-शत नमन।'
  },
  { 
    id: 'rudram', 
    name: 'Sri Rudram Laghunyasa', 
    hindiName: 'श्रीरुद्रम् न्यास',
    deity: 'Rudra Bhagavan',
    freq: 528, 
    desc: 'Cosmic dissolution of karmic obstacles & supreme peace',
    sanskrit: 'ॐ नमो भगवते रुद्राय नमस्ते रुद्र मन्यव उतोत इषवे नमः॥',
    words: ['ॐ', 'नमो', 'भगवते', 'रुद्राय', 'नमस्ते', 'रुद्र', 'मन्यव', 'उतोत', 'इषवे', 'नमः'],
    transliteration: 'Oṁ Namo Bhagavate Rudrāya | Namaste Rudra Manyava Utota Iṣave Namāḥ',
    meaning: 'हे सर्वशक्तिमान रुद्र भगवान, आपके क्रोध तथा आपके तीक्ष्ण बाणों को हमारा नमस्कार।'
  },
  {
    id: 'hare_krishna',
    name: 'Maha Mantra',
    hindiName: 'महामंत्र संकीर्तन',
    deity: 'Sri Radha Krishna',
    freq: 528,
    desc: 'Bhakti bliss, heart lotus opening, and spiritual ecstasy',
    sanskrit: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे। हरे राम हरे राम राम राम हरे हरे॥',
    words: ['हरे', 'कृष्ण', 'हरे', 'कृष्ण', 'कृष्ण', 'कृष्ण', 'हरे', 'हरे', 'हरे', 'राम', 'हरे', 'राम', 'राम', 'राम', 'हरे', 'हरे'],
    transliteration: 'Hare Kṛṣṇa Hare Kṛṣṇa Kṛṣṇa Kṛṣṇa Hare Hare | Hare Rāma Hare Rāma Rāma Rāma Hare Hare',
    meaning: 'हे भगवान की दिव्य शक्ति (हरे), हे सर्व-आकर्षक भगवान (कृष्ण/राम), मुझे अपनी अगाध प्रेममयी सेवा में नियुक्त करें।'
  }
];

export const MantraAudioPlayer: React.FC<MantraAudioPlayerProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMantraIdx, setActiveMantraIdx] = useState(0);
  const [highlightedWordIdx, setHighlightedWordIdx] = useState<number>(-1);
  const [isLooping, setIsLooping] = useState(true);
  const [japaCount, setJapaCount] = useState(0);
  const [targetJapa, setTargetJapa] = useState<number | null>(null); // null = infinite, 1 = 1x, 11 = 11x, 108 = full mala
  const [volume, setVolume] = useState(1.0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [speechRate, setSpeechRate] = useState(0.78);
  const [isTempleBellOn, setIsTempleBellOn] = useState(true);
  const [completedMalaCelebration, setCompletedMalaCelebration] = useState(false);

  // Custom User Uploaded Audio Track State
  const [userTrack, setUserTrack] = useState<StoredAudioTrack | null>(null);
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  // Audio Mode: 'file' (authentic 25-min Gayatri MP3/uploaded audio) or 'vocal' (synthesized Sanskrit vocal chant + bells)
  const [audioMode, setAudioMode] = useState<'vocal' | 'file'>('file');
  const [uploadStatusMsg, setUploadStatusMsg] = useState<string | null>(null);
  const [audioDiagnostics, setAudioDiagnostics] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isChantingRef = useRef(false);
  const nextLoopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentMantra = SACRED_MANTRAS[activeMantraIdx];

  // Preload default Gayatri Audio to get duration and metadata immediately
  useEffect(() => {
    const audio = audioManager.audioElement;
    if (!audio.src || audio.src === window.location.href) {
      audio.src = '/audio/gayatri-mantra.mp3';
      audio.load();
    }
  }, []);

  // Load stored custom audio track from IndexedDB on mount
  useEffect(() => {
    async function loadSavedTrack() {
      try {
        const track = await getAudioTrack('gayatri_user_audio');
        if (track && track.blob) {
          setUserTrack(track);
          const url = URL.createObjectURL(track.blob);
          setUserAudioUrl(url);
          setAudioMode('file');
        }
      } catch (err) {
        console.warn('Could not load custom audio track:', err);
      }
    }
    loadSavedTrack();
  }, []);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs <= 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadStatusMsg('ऑडियो लोड हो रही है...');
      if (userAudioUrl) {
        URL.revokeObjectURL(userAudioUrl);
      }
      const saved = await saveAudioTrack('gayatri_user_audio', file, file.name);
      setUserTrack(saved);
      const url = URL.createObjectURL(saved.blob);
      setUserAudioUrl(url);
      setAudioMode('file');
      setUploadStatusMsg('ऑडियो सफलतापूर्वक लोड हुई!');
      setTimeout(() => setUploadStatusMsg(null), 3000);

      // Auto start playing
      audioManager.playMantraFile(url, "user_track", isLooping && !targetJapa, volume, playbackRate).then(() => {
        setIsPlaying(true);
      }).catch(() => {});

    } catch (err) {
      console.error('File upload error:', err);
      setUploadStatusMsg('ऑडियो लोड करने में त्रुटि हुई');
    }
  };

  // Stop vocal and audio chanting
  const stopAllChanting = useCallback(() => {
    isChantingRef.current = false;
    if (nextLoopTimeoutRef.current) {
      clearTimeout(nextLoopTimeoutRef.current);
      nextLoopTimeoutRef.current = null;
    }
    audioManager.stopAll();
    setIsPlaying(false);
    setHighlightedWordIdx(-1);
  }, []);

  // Trigger one cycle of vocal chanting
  const startVocalCycle = useCallback(() => {
    if (!isChantingRef.current) return;

    const mantra = SACRED_MANTRAS[activeMantraIdx];
    setHighlightedWordIdx(0);

    const recitationScript = mantra.words.join(' । ');

    audioManager.playVocalMantra(recitationScript, 'user_chant', {
      rate: speechRate,
      pitch: 0.95,
      volume: volume,
      playTempleBell: isTempleBellOn,
      onWordSpoken: (charIdx, spokenWord) => {
        const cleanSpoken = spokenWord.trim().replace(/[।॥,]/g, '');
        if (!cleanSpoken) return;
        const matchedIdx = mantra.words.findIndex(w => w.includes(cleanSpoken) || cleanSpoken.includes(w));
        if (matchedIdx !== -1) {
          setHighlightedWordIdx(matchedIdx);
        } else {
          setHighlightedWordIdx(prev => (prev + 1) % mantra.words.length);
        }
      },
      onCycleComplete: () => {
        setHighlightedWordIdx(-1);
        if (!isChantingRef.current) return;

        setJapaCount(prev => {
          const nextCount = prev + 1;

          if (targetJapa && nextCount >= targetJapa) {
            stopAllChanting();
            if (targetJapa === 108) {
              setCompletedMalaCelebration(true);
              try {
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 }
                });
              } catch {}
            }
            return nextCount;
          }

          if (isLooping || (targetJapa && nextCount < targetJapa)) {
            nextLoopTimeoutRef.current = setTimeout(() => {
              if (isChantingRef.current) {
                startVocalCycle();
              }
            }, 500);
          } else {
            stopAllChanting();
          }

          return nextCount;
        });
      },
      onError: (err) => {
        console.warn('Vocal chanting error:', err);
        setAudioDiagnostics('वेद वाणी सक्रिय...');
        setTimeout(() => setAudioDiagnostics(null), 3000);
      }
    });
  }, [activeMantraIdx, speechRate, volume, isTempleBellOn, targetJapa, isLooping, stopAllChanting]);

  // Play audio file
  const playAudioTrack = useCallback(() => {
    const trackUrl = userAudioUrl || '/audio/gayatri-mantra.mp3';
    audioManager.playMantraFile(
      trackUrl, 
      'gayatri_track', 
      isLooping && !targetJapa, 
      volume, 
      playbackRate
    ).then(() => {
      setIsPlaying(true);
    }).catch((err) => {
      console.warn('Audio element play failed, falling back to speech:', err);
      startVocalCycle();
    });
  }, [playbackRate, volume, isLooping, targetJapa, userAudioUrl, startVocalCycle]);

  // Handle Play/Pause Toggle
  const handleTogglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // Trigger instant sound test chime to unlock Web Audio context
    try {
      cosmicAudio.playTibetanBowl(528);
    } catch {}

    if (isPlaying) {
      stopAllChanting();
    } else {
      setIsPlaying(true);
      isChantingRef.current = true;

      // When Gayatri Mantra (idx 0) is active and in file mode (or default)
      if (activeMantraIdx === 0 && (audioMode === 'file' || userAudioUrl)) {
        playAudioTrack();
      } else if (audioMode === 'file' && userAudioUrl) {
        playAudioTrack();
      } else {
        // Run Sanskrit vocal chanting
        startVocalCycle();
      }
    }
  };

  // Change Mantra
  const handleSelectMantra = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopAllChanting();
    setActiveMantraIdx(idx);
    setHighlightedWordIdx(-1);
  };

  // Listen for global external trigger events e.g. from homepage or header
  useEffect(() => {
    const handleExternalPlay = (e: CustomEvent<{ mantraId?: string; openPlayer?: boolean }>) => {
      const targetId = e.detail?.mantraId || 'gayatri';
      const shouldOpen = e.detail?.openPlayer !== false;
      const idx = SACRED_MANTRAS.findIndex(m => m.id === targetId);
      if (idx !== -1) {
        if (shouldOpen) {
          setIsExpanded(true);
        }
        handleSelectMantra(idx);
        setIsPlaying(true);
        isChantingRef.current = true;
        setTimeout(() => {
          if (idx === 0 && audioMode === 'file' && userAudioUrl) {
            playAudioTrack();
          } else {
            startVocalCycle();
          }
        }, 150);
      }
    };

    window.addEventListener('play-sacred-mantra' as any, handleExternalPlay);
    return () => {
      window.removeEventListener('play-sacred-mantra' as any, handleExternalPlay);
      stopAllChanting();
    };
  }, [handleSelectMantra, playAudioTrack, startVocalCycle, stopAllChanting, userAudioUrl, audioMode]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopAllChanting();
      if (userAudioUrl) {
        URL.revokeObjectURL(userAudioUrl);
      }
    };
  }, [stopAllChanting]);

  // Sync volume and playback rate with audioManager
  useEffect(() => {
    audioManager.setVolume(volume);
    audioManager.setPlaybackRate(playbackRate);
  }, [volume, playbackRate]);

  // Subscribe to audio element events for user custom audio / file tracks
  useEffect(() => {
    const audio = audioManager.audioElement;

    const handleTimeUpdate = () => {
      setAudioCurrentTime(audio.currentTime || 0);
    };

    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setJapaCount(prev => {
        const nextCount = prev + 1;
        if (targetJapa && nextCount >= targetJapa) {
          stopAllChanting();
          if (targetJapa === 108) {
            setCompletedMalaCelebration(true);
            try {
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
              });
            } catch {}
          }
          return nextCount;
        }

        if (isLooping || (targetJapa && nextCount < targetJapa)) {
          audioManager.seek(0);
          audioManager.playMantraFile(userAudioUrl || '/audio/gayatri-mantra.mp3', 'user_track', isLooping && !targetJapa, volume, playbackRate).catch(() => {});
        } else {
          stopAllChanting();
        }
        return nextCount;
      });
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [targetJapa, isLooping, stopAllChanting, userAudioUrl, volume, playbackRate]);

  return (
    <div 
      id="sanctum-mantra-audio-player" 
      className="fixed bottom-20 md:bottom-6 right-3 sm:right-6 z-50 flex flex-col items-end select-none"
    >
      {/* Hidden File Input for uploading custom Gayatri audio file */}
      <input 
        type="file"
        ref={fileInputRef}
        accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* ========================================================================= */}
      {/* EXPANDED VEDIC SANCTUM MANTRA CARD                                         */}
      {/* ========================================================================= */}
      {isExpanded && (
        <div 
          className={`mb-3 w-[340px] sm:w-[420px] rounded-3xl border shadow-2xl overflow-hidden backdrop-blur-xl animate-in slide-in-from-bottom-6 duration-300 ${
            isDark 
              ? 'bg-[#0c0c16]/95 border-amber-400/40 text-amber-100 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.2)]' 
              : 'bg-[#fffaf0]/95 border-[#c5a059]/50 text-[#4a3518] shadow-[0_10px_35px_rgba(180,120,40,0.25)]'
          }`}
        >
          {/* Card Header */}
          <div className={`px-4 py-3 border-b flex items-center justify-between ${
            isDark 
              ? 'bg-amber-950/40 border-amber-400/20 text-amber-200' 
              : 'bg-[#f7efe1] border-[#d9b482]/40 text-[#78350f]'
          }`}>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '12s' }} />
              <div>
                <h4 className="font-cinzel font-bold text-xs tracking-wider">
                  वेद वाणी • Gayatri Audio Sanctuary
                </h4>
                <p className="text-[9.5px] font-mono opacity-75">
                  Vocal Chanting & Custom Audio Japa
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  try {
                    cosmicAudio.playTibetanBowl(528);
                    setAudioDiagnostics('🔊 घंटी ध्वनि बज रही है');
                    setTimeout(() => setAudioDiagnostics(null), 2000);
                  } catch {}
                }}
                className={`px-2 py-1 rounded-lg text-[9.5px] font-mono border transition-colors ${
                  isDark ? 'bg-amber-500/10 border-amber-400/30 text-amber-300 hover:bg-amber-500/20' : 'bg-[#faebd7] border-[#d9b482] text-[#78350f]'
                }`}
                title="Test temple chime audio"
              >
                🔔 ध्वनि टेस्ट
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                className={`p-1.5 rounded-full transition-colors ${
                  isDark ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-black/10 text-[#78350f]'
                }`}
                title="Collapse Player"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 108 Mala Celebration Banner */}
          {completedMalaCelebration && (
            <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black px-4 py-2 text-center text-xs font-bold font-cinzel flex items-center justify-center gap-1.5 shadow-md">
              <Award className="w-4 h-4" />
              <span>श्री हरि कृपा • 108 माला जाप संपन्न! दैवीय ऊर्जा सिद्ध</span>
            </div>
          )}

          {/* Diagnostics / Upload Status Notification */}
          {(uploadStatusMsg || audioDiagnostics) && (
            <div className="bg-amber-500/20 border-b border-amber-500/40 text-amber-300 px-4 py-1.5 text-xs text-center font-mono flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{uploadStatusMsg || audioDiagnostics}</span>
            </div>
          )}

          <div className="p-4 space-y-3">
            {/* Mode Switcher: Authentic Gayatri Audio vs Vedic Vocal Chanting */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  stopAllChanting();
                  setAudioMode('file');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                  audioMode === 'file'
                    ? isDark 
                      ? 'bg-amber-500 text-black border-amber-400 shadow-md' 
                      : 'bg-[#78350f] text-amber-50 border-[#78350f]'
                    : isDark 
                      ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10' 
                      : 'bg-black/5 border-black/10 text-[#78350f] hover:bg-black/10'
                }`}
              >
                <Music className="w-3.5 h-3.5" />
                <span>गायत्री मूल ऑडियो</span>
              </button>

              <button
                onClick={() => {
                  stopAllChanting();
                  setAudioMode('vocal');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                  audioMode === 'vocal'
                    ? isDark 
                      ? 'bg-amber-500 text-black border-amber-400 shadow-md' 
                      : 'bg-[#78350f] text-amber-50 border-[#78350f]'
                    : isDark 
                      ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10' 
                      : 'bg-black/5 border-black/10 text-[#78350f] hover:bg-black/10'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>वेद वाणी उच्चारण</span>
              </button>
            </div>

            {/* Custom Audio Upload / Switcher Banner */}
            <div className={`p-2.5 rounded-2xl border flex items-center justify-between gap-2 text-xs font-mono ${
              userTrack 
                ? isDark ? 'bg-amber-500/10 border-amber-400/30 text-amber-200' : 'bg-[#faebd7] border-[#d9b482] text-[#78350f]'
                : isDark ? 'bg-white/[0.02] border-white/10 text-gray-300' : 'bg-black/[0.02] border-black/10 text-[#78350f]'
            }`}>
              <div className="flex items-center gap-2 min-w-0">
                <Music className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <div className="truncate text-[11px]">
                  {userTrack ? userTrack.name : 'गायत्री महामंत्र (मूल 25-मिनट रिकॉर्डिंग)'}
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-400/40 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                  title="Upload / Replace Audio File"
                >
                  <Upload className="w-3 h-3" />
                  <span>{userTrack ? 'बदलें' : 'अपलोड'}</span>
                </button>
                {userTrack && (
                  <button
                    onClick={async () => {
                      await deleteAudioTrack('gayatri_user_audio');
                      setUserTrack(null);
                      setUserAudioUrl(null);
                      stopAllChanting();
                    }}
                    className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Remove custom audio"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Current Mantra Deity & Sanskrit Word-by-Word Glowing Display */}
            <div className={`p-4 rounded-2xl border relative overflow-hidden text-center space-y-3 ${
              isDark 
                ? 'bg-black/60 border-amber-500/30' 
                : 'bg-white/80 border-[#d9b482]/60 shadow-inner'
            }`}>
              {/* Deity Tag */}
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-[#faebd7] text-[#8c5922]'
                }`}>
                  {currentMantra.deity}
                </span>
                <span className="font-bold flex items-center gap-1 text-amber-500">
                  {audioMode === 'file' ? <Music className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                  {isPlaying ? 'ध्वनि सक्रिय (Playing)' : (audioMode === 'file' ? 'मूल ऑडियो' : 'वेद वाणी')}
                </span>
              </div>

              {/* Sanskrit Words with Active Voice Glow */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 py-1">
                {currentMantra.words.map((word, wIdx) => {
                  const isHighlighted = highlightedWordIdx === wIdx;
                  return (
                    <span 
                      key={wIdx}
                      className={`font-serif font-bold text-base sm:text-lg transition-all duration-200 px-1.5 py-0.5 rounded-lg ${
                        isHighlighted
                          ? 'bg-amber-500 text-black scale-110 shadow-[0_0_12px_rgba(245,158,11,0.8)]'
                          : isDark 
                            ? 'text-amber-100 hover:text-amber-300' 
                            : 'text-[#5a360f] hover:text-[#78350f]'
                      }`}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>

              {/* Transliteration */}
              <div className={`text-[10.5px] font-serif italic ${
                isDark ? 'text-gray-300' : 'text-[#684b25]'
              }`}>
                "{currentMantra.transliteration}"
              </div>

              {/* Real Audio Seekbar & Timeline */}
              {audioMode === 'file' && (
                <div className="pt-2 border-t border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-80 px-1">
                    <span>{formatTime(audioCurrentTime)}</span>
                    <span className="text-amber-500 font-bold">108 जाप ऑडियो</span>
                    <span>{formatTime(audioDuration || 1517)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={audioDuration || 1517}
                    value={audioCurrentTime}
                    onChange={(e) => {
                      const newTime = parseFloat(e.target.value);
                      setAudioCurrentTime(newTime);
                      audioManager.seek(newTime);
                    }}
                    className="w-full h-1.5 bg-gray-600/40 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <button
                      onClick={() => {
                        const targetTime = Math.max(0, audioCurrentTime - 10);
                        audioManager.seek(targetTime);
                        setAudioCurrentTime(targetTime);
                      }}
                      className="p-1 rounded text-xs opacity-75 hover:opacity-100 hover:text-amber-400 flex items-center gap-0.5 cursor-pointer"
                      title="Rewind 10s"
                    >
                      <Rewind className="w-3.5 h-3.5" /> 10s
                    </button>
                    <button
                      onClick={() => {
                        const targetTime = Math.min(audioDuration || 1517, audioCurrentTime + 10);
                        audioManager.seek(targetTime);
                        setAudioCurrentTime(targetTime);
                      }}
                      className="p-1 rounded text-xs opacity-75 hover:opacity-100 hover:text-amber-400 flex items-center gap-0.5 cursor-pointer"
                      title="Forward 10s"
                    >
                      10s <FastForward className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Hindi Meaning */}
              <div className={`text-[10px] font-mono pt-2 border-t leading-relaxed ${
                isDark ? 'text-amber-200/85 border-white/10' : 'text-[#78350f] border-[#e8dccb]'
              }`}>
                <strong className="text-amber-500">अर्थ: </strong>
                {currentMantra.meaning}
              </div>
            </div>

            {/* Japa Mode Selector (1x, 11x, 108x, Endless Loop) */}
            <div className="flex items-center justify-between gap-1.5 pt-1">
              <div className="flex items-center gap-1 flex-wrap">
                <button
                  onClick={() => {
                    setIsLooping(true);
                    setTargetJapa(null);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                    isLooping && targetJapa === null
                      ? isDark ? 'bg-amber-500 text-black shadow-sm' : 'bg-[#78350f] text-amber-50'
                      : isDark ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-black/5 text-[#78350f] hover:bg-black/10'
                  }`}
                  title="अनंत Loop (Continuous Meditation)"
                >
                  <span className="flex items-center gap-1">
                    <Repeat className="w-3 h-3" />
                    <span>अनंत Loop</span>
                  </span>
                </button>

                <button
                  onClick={() => {
                    setIsLooping(true);
                    setTargetJapa(108);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                    targetJapa === 108
                      ? isDark ? 'bg-amber-500 text-black' : 'bg-[#78350f] text-amber-50'
                      : isDark ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-black/5 text-[#78350f] hover:bg-black/10'
                  }`}
                  title="108 Chants Mala Target"
                >
                  <span>108 माला</span>
                </button>

                <button
                  onClick={() => {
                    setIsLooping(true);
                    setTargetJapa(11);
                  }}
                  className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                    targetJapa === 11
                      ? isDark ? 'bg-amber-500 text-black' : 'bg-[#78350f] text-amber-50'
                      : isDark ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-black/5 text-[#78350f] hover:bg-black/10'
                  }`}
                  title="11 Chants"
                >
                  <span>11x</span>
                </button>

                <button
                  onClick={() => {
                    setIsLooping(false);
                    setTargetJapa(1);
                  }}
                  className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                    !isLooping && targetJapa === 1
                      ? isDark ? 'bg-amber-500 text-black' : 'bg-[#78350f] text-amber-50'
                      : isDark ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-black/5 text-[#78350f] hover:bg-black/10'
                  }`}
                  title="Single Chanting (1x)"
                >
                  <span>1x Single</span>
                </button>
              </div>

              {/* Japa Counter */}
              <div className={`px-2.5 py-1 rounded-lg text-[10.5px] font-mono font-bold border shrink-0 ${
                isDark ? 'bg-black/40 border-amber-500/30 text-amber-300' : 'bg-[#f4ebe1] border-[#d9b482] text-[#6b3c10]'
              }`}>
                जाप: <span className="text-amber-500">{japaCount}</span>
                {targetJapa ? `/${targetJapa}` : ''}
              </div>
            </div>

            {/* Playback Speed & Temple Bell Switch */}
            <div className={`flex items-center justify-between px-3 py-2 rounded-xl text-[10px] font-mono border ${
              isDark ? 'bg-white/[0.02] border-white/10 text-gray-300' : 'bg-black/[0.02] border-black/10 text-[#78350f]'
            }`}>
              <div className="flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-amber-500" />
                <span>गति (Speed):</span>
                {[0.75, 1.0, 1.25].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => {
                      setPlaybackRate(spd);
                      setSpeechRate(spd * 0.8);
                      audioManager.setPlaybackRate(spd);
                    }}
                    className={`px-1.5 py-0.5 rounded ${playbackRate === spd ? 'bg-amber-500 text-black font-bold' : 'opacity-60 hover:opacity-100'}`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              {/* Temple Bell Toggle */}
              <button
                onClick={() => setIsTempleBellOn(!isTempleBellOn)}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-lg transition-colors ${
                  isTempleBellOn 
                    ? isDark ? 'bg-amber-500/20 text-amber-300 font-bold' : 'bg-[#faebd7] text-[#78350f] font-bold'
                    : 'opacity-50'
                }`}
                title="Toggle Temple Bell Chime"
              >
                <span>🔔 मंदिर घंटी: {isTempleBellOn ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* Master Vocal Chanting Play/Pause & Reset Strip */}
            <div className={`flex items-center justify-between p-2.5 rounded-2xl border ${
              isDark ? 'bg-white/[0.04] border-white/10' : 'bg-black/[0.03] border-black/10'
            }`}>
              {/* Reset Count Button */}
              <button 
                onClick={() => {
                  stopAllChanting();
                  setJapaCount(0);
                  setCompletedMalaCelebration(false);
                }}
                className={`p-2 rounded-xl transition-colors ${
                  isDark ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-black/10 text-[#78350f]'
                }`}
                title="Reset Japa Count (0)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Main Vocal Play/Pause Button */}
              <button
                onClick={handleTogglePlay}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-black font-cinzel font-bold text-xs flex items-center gap-2 shadow-[0_4px_20px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>रोकें (Pause)</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>{audioMode === 'file' && userTrack ? 'ऑडियो सुनें (Play Audio)' : 'मंत्र उच्चारण सुनें (Play Chant)'}</span>
                  </>
                )}
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setVolume(volume > 0 ? 0 : 1)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-black/10 text-[#78350f]'
                  }`}
                  title={volume === 0 ? 'Unmute' : 'Mute'}
                >
                  {volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1" 
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-14 h-1.5 accent-amber-500 rounded-lg cursor-pointer"
                  title="Volume Slider"
                />
              </div>
            </div>

            {/* Sacred Mantra Switcher List */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-cinzel font-bold opacity-80 px-1">
                <span>Select Sacred Vedic Mantra:</span>
                <span className="text-[9px] font-mono text-amber-500">5 महामंत्र</span>
              </div>
              <div className="max-h-36 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                {SACRED_MANTRAS.map((m, idx) => {
                  const isSelected = activeMantraIdx === idx;
                  return (
                    <button
                      key={m.id}
                      onClick={(e) => handleSelectMantra(idx, e)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer border ${
                        isSelected 
                          ? isDark 
                            ? 'bg-amber-500/20 border-amber-400/60 text-amber-200 font-bold shadow-sm' 
                            : 'bg-[#f7efe1] border-[#d9b482] text-[#6b3c10] font-bold shadow-sm'
                          : isDark 
                            ? 'bg-black/20 border-white/5 hover:bg-white/5 text-gray-300' 
                            : 'bg-white/60 border-black/5 hover:bg-black/5 text-[#543b18]'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-2 h-2 rounded-full ${
                          isSelected 
                            ? isPlaying ? 'bg-amber-400 animate-ping' : 'bg-amber-500' 
                            : 'bg-gray-400/40'
                        }`} />
                        <div className="truncate">
                          <div className="font-serif font-bold text-xs truncate">
                            {m.hindiName} ({m.name})
                          </div>
                          <div className="text-[9.5px] font-mono opacity-75 truncate">
                            {m.desc}
                          </div>
                        </div>
                      </div>
                      <span className="text-[9.5px] font-mono shrink-0 ml-2 font-bold opacity-90">
                        {m.freq}Hz
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FLOATING PILL BUTTON (HOMEPAGE & GLOBAL)                                   */}
      {/* ========================================================================= */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center gap-2.5 p-2 pr-4 rounded-full border-2 shadow-2xl cursor-pointer transition-all hover:scale-105 active:scale-95 group backdrop-blur-xl select-none ${
          isDark 
            ? 'bg-[#0f0f18]/95 border-amber-400 text-amber-100 shadow-[0_4px_30px_rgba(245,158,11,0.4)] ring-2 ring-amber-400/20' 
            : 'bg-[#fffdfa]/95 border-[#c5a059] text-[#543b18] shadow-[0_6px_25px_rgba(180,120,40,0.3)] ring-2 ring-amber-500/20'
        }`}
        title="Tap to open Gayatri Mantra Sanctuary Player"
      >
        {/* Play/Pause Button */}
        <button 
          onClick={handleTogglePlay}
          className={`relative w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 shadow-md ${
            isPlaying 
              ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.8)]' 
              : isDark ? 'bg-black/80 border border-amber-400/60 text-amber-400' : 'bg-[#fffaf0] border border-[#c5a059] text-[#78350f]'
          }`}
          title={isPlaying ? 'Pause Audio' : 'Play Gayatri Mantra Audio'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current animate-pulse" />
          ) : (
            <Play className="w-4 h-4 ml-0.5 fill-current" />
          )}
        </button>

        {/* Title & Info */}
        <div className="flex flex-col min-w-0 max-w-[150px] sm:max-w-[200px]">
          <div className="flex items-center gap-1.5">
            <span className="text-[9.5px] font-cinzel font-extrabold uppercase tracking-wider text-amber-500 truncate">
              {isPlaying ? 'ध्वनि चालू • Playing' : 'ॐ पावन ध्वनि'}
            </span>
            {isPlaying && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            )}
          </div>
          <span className="text-xs font-serif font-extrabold whitespace-nowrap truncate text-amber-300">
            {currentMantra.hindiName || 'गायत्री महामंत्र'}
          </span>
        </div>
        
        {/* Animated Voice Equalizer */}
        <div 
          className="ml-1 pl-2.5 border-l h-6 flex items-center shrink-0" 
          style={{ borderColor: isDark ? 'rgba(212,175,55,0.3)' : 'rgba(197,160,89,0.4)' }}
        >
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5">
              <div className="w-0.5 bg-amber-500 rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" style={{ height: '100%' }} />
              <div className="w-0.5 bg-amber-400 rounded-full animate-[pulse_0.9s_ease-in-out_infinite]" style={{ height: '70%' }} />
              <div className="w-0.5 bg-yellow-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite]" style={{ height: '90%' }} />
              <div className="w-0.5 bg-amber-500 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" style={{ height: '50%' }} />
            </div>
          ) : (
            <Music className="w-3.5 h-3.5 text-amber-500 opacity-80 group-hover:scale-110 transition-transform" />
          )}
        </div>
      </div>
    </div>
  );
};
