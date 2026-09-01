import React, { useState, useEffect } from 'react';
import { ThemeMode } from '../types';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  MessageSquare, 
  X, 
  Send, 
  Radio, 
  Bot, 
  Zap,
  Flame,
  AudioLines
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cosmicAudio } from '../utils/audioSynthesizer';

interface CosmicVoiceGuruModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
}

interface QuickQuestion {
  id: string;
  hindi: string;
  category: string;
  answer: string;
}

const QUICK_QUESTIONS: QuickQuestion[] = [
  {
    id: 'q1',
    hindi: 'मेरी जन्मकुंडली के अनुसार आज का सबसे शुभ समय क्या है?',
    category: 'मुहूर्त (Muhurat)',
    answer: 'आज का सर्वार्थ सिद्धि एवं अभिजित मुहूर्त दोपहर 11:58 से 12:48 तक रहेगा। इस समयावधि में प्रारंभ किया गया कोई भी नया कार्य, व्यापार अनुबंध या यात्रा अत्यंत शुभ फलदायक होगी।'
  },
  {
    id: 'q2',
    hindi: 'शनि की साढ़े साती या ढैय्या से मानसिक शांति के लिए क्या उपाय करें?',
    category: 'शनि शांति (Saturn)',
    answer: 'शनि के प्रभाव को संतुलित करने के लिए शनिवार को पीपल वृक्ष के नीचे तिल के तेल का चौमुखी दीपक जलाएं, ॐ शं शनैश्चराय नमः का 108 बार जप करें और जरूरतमंदों की सेवा करें।'
  },
  {
    id: 'q3',
    hindi: '3-6-9 टेस्ला मैनिफेस्टेशन से अपने करियर में तरक्की कैसे आकर्षित करें?',
    category: '369 विज्ञान (Manifestation)',
    answer: 'निकोला टेस्ला के 369 सूत्र के अनुसार: प्रातः उठते ही 3 बार अपना मुख्य लक्ष्य लिखें, दोपहर को 6 बार उसका मानसिक ध्यान करें, और रात्रि को सोने से पूर्व 9 बार कृतज्ञता के साथ दोहराएं। यह अवचेतन मस्तिष्क को कॉस्मिक ऊर्जा से जोड़ता है।'
  },
  {
    id: 'q4',
    hindi: 'विवाह व संबंध में सामंजस्य के लिए शुक्र ग्रह को कैसे बलवान करें?',
    category: 'प्रेम व संबंध (Venus)',
    answer: 'शुक्र ग्रह प्रेम, सौंदर्य और दांपत्य सुख का कारक है। प्रतिदिन श्वेत वस्त्र धारण करें, शुक्रवार को कन्याओं को खीर खिलाएं और लक्ष्मी-नारायण स्तोत्र का पाठ करें।'
  }
];

export const CosmicVoiceGuruModal: React.FC<CosmicVoiceGuruModalProps> = ({
  isOpen,
  onClose,
  theme
}) => {
  const isDark = theme === 'dark';
  const [isListening, setIsListening] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [currentResponse, setCurrentResponse] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Speak out response using SpeechSynthesis if available
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleAskQuestion = (q: QuickQuestion) => {
    setQueryText(q.hindi);
    setCurrentResponse(q.answer);
    try {
      cosmicAudio.playTone(528, 0.15);
    } catch {}
    speakText(q.answer);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryText.trim()) return;

    // Smart contextual response generator
    const answers = [
      `आपकी जिज्ञासा "${queryText}" पर वैदिक शास्त्रों का मत है कि कर्म शुद्धि और इष्ट मंत्र का नित्य जप आपके चक्रों को जागृत कर सभी विघ्नों का शमन करेगा।`,
      `ग्रह गोचर के आधार पर, यह समय आपकी अंतःप्रज्ञा (Intuition) को मजबूत करने का है। प्रातः काल 15 मिनट 432Hz ध्यान नाद का श्रवण करें।`,
      `आपकी जन्मपत्रिका में बृहस्पति और सूर्य का शुभ प्रभाव बन रहा है। संकल्प दृढ़ रखें, सफलता निश्चित रूप से प्राप्त होगी।`
    ];
    const picked = answers[Math.floor(Math.random() * answers.length)];
    setCurrentResponse(picked);
    try {
      cosmicAudio.playTone(639, 0.2);
    } catch {}
    speakText(picked);
  };

  // Toggle Voice Recognition (Simulated / Web Speech API)
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      try {
        cosmicAudio.playTone(852, 0.1);
      } catch {}

      // Check for SpeechRecognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'hi-IN';
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setQueryText(transcript);
          setIsListening(false);
          // auto trigger answer
          const generated = `आपने पूछा: "${transcript}"। वैदिक गणना के अनुसार इस समय सकारात्मक ऊर्जा का प्रवाह है। अपने कर्म पथ पर अग्रसर रहें।`;
          setCurrentResponse(generated);
          speakText(generated);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.start();
      } else {
        // Fallback simulation
        setTimeout(() => {
          setQueryText('मेरी कुंडली में धन और समृद्धि योग कब बनेगा?');
          setIsListening(false);
          const fallbackAns = 'आपकी कुंडली में द्वितीय और एकादश भाव के स्वामी शुभ दृष्टि में हैं। आगामी 3 माह में व्यापार व निवेश से धन लाभ के उत्तम योग हैं।';
          setCurrentResponse(fallbackAns);
          speakText(fallbackAns);
        }, 2200);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-2xl animate-in fade-in select-none">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className={`relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl border-2 p-6 sm:p-8 shadow-2xl space-y-6 ${
          isDark 
            ? 'bg-gradient-to-b from-[#1c1335] via-[#0d091e] to-black border-amber-400/50 text-white shadow-[0_0_60px_rgba(245,158,11,0.25)]' 
            : 'bg-gradient-to-b from-[#ffffff] via-[#faf5ee] to-[#f4ebe0] border-[#caa269] text-[#2b2118]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            stopSpeaking();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-amber-400" />
              <span>AI VEDIC VOICE GURU & INSTANT JYOTISH ASSISTANT</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-purple-500/20 text-purple-300 border border-purple-400/30 flex items-center gap-1">
              <Radio className="w-3 h-3 text-purple-400 animate-pulse" />
              <span>बोल कर पूछें (Voice Enabled)</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl font-cinzel font-bold text-[#fef08a]">
            बोल कर पूछें - एआई वैदिक ज्योतिष गुरु
          </h2>
          <p className="text-xs sm:text-sm font-serif text-gray-300">
            माइक दबाकर बोलें अथवा प्रश्न चुनें। शास्त्र-सम्मत समाधान ध्वनि व पाठ में तुरंत प्राप्त करें।
          </p>
        </div>

        {/* ========================================================================= */}
        {/* VOICE INPUT & WAVEFORM PULSE CONTROLLER                                  */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center justify-center space-y-4 p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-purple-900/20 to-cyan-900/15 border border-white/10">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleListening}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer ${
              isListening
                ? 'bg-gradient-to-tr from-red-500 to-rose-600 ring-8 ring-rose-500/40 animate-pulse text-white'
                : 'bg-gradient-to-tr from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black shadow-[0_0_40px_rgba(245,158,11,0.5)]'
            }`}
          >
            {isListening ? (
              <Mic className="w-9 h-9 animate-bounce" />
            ) : (
              <Mic className="w-9 h-9" />
            )}
          </motion.button>

          <div className="text-center space-y-1">
            <span className="text-xs font-cinzel font-bold text-amber-300 block">
              {isListening ? '🎙️ आपकी वाणी सुन रहे हैं... (Listening...)' : 'टैप करके बोलना प्रारंभ करें (Tap to Speak)'}
            </span>
            <span className="text-[11px] font-serif text-gray-400">
              हिन्दी अथवा अंग्रेजी में कोई भी ज्योतिषीय प्रश्न पूछें
            </span>
          </div>

          {/* Text Input Fallback Bar */}
          <form onSubmit={handleCustomSubmit} className="w-full flex items-center gap-2 pt-2">
            <input
              type="text"
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              placeholder="अथवा अपना प्रश्न यहाँ लिखें (उदा. आज का शुभ रंग क्या है?)..."
              className="flex-1 px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>पूछें</span>
            </button>
          </form>
        </div>

        {/* ========================================================================= */}
        {/* GURU RESPONSE BOX WITH SPEECH AUDIO CONTROL                               */}
        {/* ========================================================================= */}
        {currentResponse && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-emerald-500/15 border border-amber-400/50 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-cinzel font-bold text-[#fef08a]">
                  वैदिक गुरु का समाधान (Spiritual Guidance):
                </span>
              </div>

              <button
                onClick={isSpeaking ? stopSpeaking : () => speakText(currentResponse)}
                className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono flex items-center gap-1.5 text-gray-200 cursor-pointer"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-red-400" />
                    <span>रोकें</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>पुनः सुनें</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs sm:text-sm font-serif font-medium text-gray-100 leading-relaxed">
              {currentResponse}
            </p>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* QUICK FREQUENT VEDIC QUESTIONS CAROUSEL                                   */}
        {/* ========================================================================= */}
        <div className="space-y-2.5">
          <span className="text-xs font-cinzel font-bold text-amber-400 uppercase tracking-wider block">
            अक्सर पूछे जाने वाले शास्त्र-सम्मत प्रश्न (Instant Questions):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {QUICK_QUESTIONS.map(q => (
              <button
                key={q.id}
                onClick={() => handleAskQuestion(q)}
                className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 text-left transition-all cursor-pointer group space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400">{q.category}</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:scale-125 transition-transform" />
                </div>
                <p className="text-xs font-serif font-bold text-gray-200 group-hover:text-[#fef08a]">
                  {q.hindi}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-cinzel font-bold text-xs transition-all cursor-pointer"
          >
            समाप्त करें (Close)
          </button>
        </div>
      </motion.div>
    </div>
  );
};
