import React, { useState, useEffect, useRef } from 'react';
import { ThemeMode } from '../types';
import { 
  Users, 
  MessageSquare, 
  Sparkles, 
  Send, 
  ShieldCheck, 
  Heart, 
  Flame, 
  Volume2, 
  VolumeX, 
  Clock, 
  CheckCircle2, 
  X, 
  Bot, 
  Radio, 
  Award, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { cosmicAudio } from '../utils/audioSynthesizer';

interface LoungeMessage {
  id: string;
  sender: string;
  avatar: string;
  role: 'seeker' | 'moderator' | 'ai_guru';
  text: string;
  timestamp: string;
  likes: number;
  likedByMe?: boolean;
  topicTag?: string;
}

interface CommunityLoungeModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  waitingForAstrologer?: {
    id: string;
    name: string;
    avatar: string;
    slot: number;
  } | null;
  onDirectConsultation?: (astrologerId: string) => void;
}

const INITIAL_MESSAGES: LoungeMessage[] = [
  {
    id: 'm1',
    sender: 'आचार्य वैदिक मित्र (AI Moderator)',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&auto=format&fit=crop&q=80',
    role: 'ai_guru',
    text: 'ॐ नमो भगवते वासुदेवाय। नक्षत्र सत्संग लाउंज में आपका स्वागत है। आज का विशेष विषय: "बृहस्पति का गोचर और आगामी पूर्णिमा साधना"।',
    timestamp: 'Just now',
    likes: 18,
    topicTag: 'दैनिक सत्संग'
  },
  {
    id: 'm2',
    sender: 'रोहित शर्मा (Rohit S.)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    role: 'seeker',
    text: 'पंडित विद्याधर जी से परामर्श की प्रतीक्षा कर रहा हूँ। क्या किसी ने शनि साढ़े साती के लिए काले तिल का उपाय आजमाया है?',
    timestamp: '2m ago',
    likes: 7,
    topicTag: 'शनि उपाय'
  },
  {
    id: 'm3',
    sender: 'डॉ. मीनाक्षी शास्त्री (Moderator)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    role: 'moderator',
    text: 'शनिवार को पीपल वृक्ष के समीप सरसों के तेल का दीपक और दशरथ कृत शनि स्तोत्र का पाठ अत्यधिक प्रभावी रहता है।',
    timestamp: '1m ago',
    likes: 14,
    topicTag: 'शनि उपाय'
  },
  {
    id: 'm4',
    sender: 'प्रिया वर्मा (Priya V.)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    role: 'seeker',
    text: 'यहाँ का 432Hz बैकग्राउंड नाद मन को बहुत शांत करता है। प्रतीक्षा का समय भी ध्यान में बदल गया! 🙏✨',
    timestamp: '30s ago',
    likes: 9,
    topicTag: 'ध्यान व नाद'
  }
];

export const CommunityLoungeModal: React.FC<CommunityLoungeModalProps> = ({
  isOpen,
  onClose,
  theme,
  waitingForAstrologer,
  onDirectConsultation
}) => {
  const isDark = theme === 'dark';
  const [messages, setMessages] = useState<LoungeMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [activeTopic, setActiveTopic] = useState<'all' | 'शनि उपाय' | 'दैनिक सत्संग' | 'ध्यान व नाद' | 'कुंडली प्रश्न'>('all');
  const [isAudioDronePlaying, setIsAudioDronePlaying] = useState(false);
  const [liveSeekersCount, setLiveSeekersCount] = useState(142);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Poll state
  const [pollVoted, setPollVoted] = useState<number | null>(null);
  const [pollVotes, setPollVotes] = useState([64, 28, 12]);

  // Periodic simulated live participants fluctuation
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setLiveSeekersCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg: LoungeMessage = {
      id: `usr-${Date.now()}`,
      sender: 'आप (You)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      role: 'seeker',
      text: inputText.trim(),
      timestamp: 'Just now',
      likes: 0,
      topicTag: activeTopic === 'all' ? 'दैनिक सत्संग' : activeTopic
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    try {
      cosmicAudio.playTone(528, 0.1);
    } catch {}

    // Simulated AI Guru response after 3.5s if question asked
    if (inputText.includes('?') || inputText.includes('उपाय') || inputText.includes('मंत्र') || inputText.includes('कुंडली')) {
      setTimeout(() => {
        const aiReplies = [
          'सादर नमस्कार! आपकी जिज्ञासा अत्यंत कल्याणकारी है। वैदिक शास्त्र अनुसार नित्य सूर्य अर्घ्य व गायत्री जप से नवग्रह संतुलन प्राप्त होता है।',
          'ग्रहों की अनुकूलता के लिए मन की शुद्धि और दान-पुण्य सर्वोत्तम उपाय हैं। आपके ज्योतिषी जल्द ही आपको विस्तृत मार्गदर्शन देंगे।',
          'सर्व मंगल मांगल्ये शिवे सर्वार्थ साधिके। शरण्ये त्र्यम्बके गौरी नारायणि नमोऽस्तुते॥ शुभ विचार!'
        ];
        const randomReply = aiReplies[Math.floor(Math.random() * aiReplies.length)];
        setMessages(prev => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'आचार्य वैदिक मित्र (AI Assistant)',
            avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&auto=format&fit=crop&q=80',
            role: 'ai_guru',
            text: randomReply,
            timestamp: 'Just now',
            likes: 3,
            topicTag: 'दैनिक सत्संग'
          }
        ]);
      }, 3500);
    }
  };

  const handleLikeMessage = (id: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id === id) {
        const liked = !m.likedByMe;
        return {
          ...m,
          likedByMe: liked,
          likes: liked ? m.likes + 1 : m.likes - 1
        };
      }
      return m;
    }));
    try {
      cosmicAudio.playTone(639, 0.08);
    } catch {}
  };

  const handleToggleDrone = () => {
    if (!isAudioDronePlaying) {
      try {
        cosmicAudio.playTeslaFrequency(432, 10);
      } catch {}
      setIsAudioDronePlaying(true);
    } else {
      setIsAudioDronePlaying(false);
    }
  };

  const handleVotePoll = (index: number) => {
    if (pollVoted !== null) return;
    setPollVoted(index);
    setPollVotes(prev => {
      const next = [...prev];
      next[index] += 1;
      return next;
    });
    try {
      cosmicAudio.playTone(528, 0.2);
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 }
      });
    } catch {}
  };

  const filteredMessages = messages.filter(m => activeTopic === 'all' || m.topicTag === activeTopic);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xl animate-in fade-in select-none">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className={`relative w-full max-w-5xl h-[90vh] flex flex-col rounded-3xl border-2 shadow-[0_0_60px_rgba(212,175,55,0.25)] overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-b from-[#110e24] via-[#090715] to-black border-[#d4af37]/50 text-white' 
            : 'bg-gradient-to-b from-[#ffffff] via-[#fffdf9] to-[#f6eee2] border-[#caa269] text-[#2b2118]'
        }`}
      >
        {/* ========================================================================= */}
        {/* TOP HEADER & LIVE HUD                                                    */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-black/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/30 to-purple-500/30 border border-amber-400/50 flex items-center justify-center shadow-md">
              <Users className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-cinzel font-bold text-[#fef08a] flex items-center gap-2">
                  <span>नक्षत्र सत्संग लाउंज (Cosmic Community Lounge)</span>
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{liveSeekersCount} साधक लाइव</span>
                </span>
              </div>
              <p className="text-[11px] font-serif opacity-80">
                सुरक्षित एवं मॉडरेटेड वैदिक चर्चा कक्ष • प्रतीक्षा के समय को ध्यान व ज्ञान में बदलें
              </p>
            </div>
          </div>

          {/* Audio Drone & Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleDrone}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isAudioDronePlaying 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.3)]' 
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-300'
              }`}
            >
              {isAudioDronePlaying ? <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              <span>432Hz ध्यान नाद</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACTIVE ASTROLOGER QUEUE BRIDGE HUD (IF WAITING)                           */}
        {/* ========================================================================= */}
        {waitingForAstrologer && (
          <div className="px-4 py-2.5 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-cyan-500/20 border-b border-amber-500/30 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <img 
                src={waitingForAstrologer.avatar} 
                alt={waitingForAstrologer.name} 
                className="w-7 h-7 rounded-full object-cover border border-amber-400"
              />
              <div>
                <span className="text-amber-300 font-bold">{waitingForAstrologer.name}</span>
                <span className="text-gray-300 ml-2">कतार में स्थान: #{waitingForAstrologer.slot} (लगभग ~3 मिनट)</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                if (onDirectConsultation) onDirectConsultation(waitingForAstrologer.id);
              }}
              className="px-3 py-1 rounded-lg bg-amber-500 text-black font-cinzel font-bold text-[11px] hover:bg-amber-400 transition-colors flex items-center gap-1 cursor-pointer shadow"
            >
              <span>परामर्श कक्ष में जाएं</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MAIN BODY: 2 COLUMNS (CHAT STREAM + COMMUNITY POLL/WISDOM)                */}
        {/* ========================================================================= */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          
          {/* LEFT 2 COLS: CHAT STREAM */}
          <div className="lg:col-span-2 flex flex-col h-full min-h-0 bg-black/20">
            {/* Topic Filter Pills */}
            <div className="p-3 border-b border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { id: 'all', label: 'सभी संदेश' },
                { id: 'दैनिक सत्संग', label: '🪔 दैनिक सत्संग' },
                { id: 'शनि उपाय', label: '🪐 शनि व गोचर उपाय' },
                { id: 'ध्यान व नाद', label: '🕉️ ध्यान व नाद' },
                { id: 'कुंडली प्रश्न', label: '📜 कुंडली प्रश्न' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTopic(t.id as any)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeTopic === t.id
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Messages Container */}
            <div 
              ref={chatScrollRef}
              className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3.5 no-scrollbar"
            >
              {filteredMessages.map(msg => (
                <div 
                  key={msg.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    msg.role === 'ai_guru'
                      ? 'bg-gradient-to-r from-amber-500/15 to-purple-500/15 border-amber-400/40 shadow-sm'
                      : msg.role === 'moderator'
                      ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border-cyan-400/40'
                      : isDark ? 'bg-white/5 border-white/10' : 'bg-white/80 border-[#e8dccb]'
                  }`}
                >
                  <img 
                    src={msg.avatar} 
                    alt={msg.sender} 
                    className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0 mt-0.5"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-cinzel font-bold text-amber-300">
                          {msg.sender}
                        </span>
                        {msg.role === 'ai_guru' && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-400/30">
                            AI Guru
                          </span>
                        )}
                        {msg.role === 'moderator' && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                            Acharya
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">{msg.timestamp}</span>
                    </div>

                    <p className="text-xs sm:text-sm font-serif leading-relaxed opacity-95">
                      {msg.text}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[9.5px] font-mono text-amber-400/80">
                        #{msg.topicTag || 'सत्संग'}
                      </span>
                      <button
                        onClick={() => handleLikeMessage(msg.id)}
                        className={`flex items-center gap-1 text-[11px] font-mono transition-colors cursor-pointer px-2 py-0.5 rounded-lg ${
                          msg.likedByMe 
                            ? 'text-rose-400 bg-rose-500/15' 
                            : 'text-gray-400 hover:text-rose-400 hover:bg-white/5'
                        }`}
                      >
                        <Heart className={`w-3 h-3 ${msg.likedByMe ? 'fill-rose-400' : ''}`} />
                        <span>{msg.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3.5 border-t border-white/10 bg-black/40 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="सत्संग लाउंज में अपनी जिज्ञासा या विचार साझा करें..."
                className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>भेजें</span>
              </button>
            </div>
          </div>

          {/* RIGHT 1 COL: LIVE COMMUNITY POLL & DAILY SHLOKA */}
          <div className="p-4 sm:p-5 flex flex-col justify-between space-y-4 overflow-y-auto no-scrollbar bg-black/30">
            {/* Daily Satsang Shloka Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 to-purple-500/15 border border-amber-400/40 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-cinzel font-bold text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>आज का नक्षत्र महा-श्लोक</span>
              </div>
              <p className="text-xs font-serif italic leading-relaxed text-[#fef08a]">
                &ldquo;कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।<br />
                मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥&rdquo;
              </p>
              <div className="text-[10px] font-mono text-gray-300 pt-1 border-t border-white/10">
                श्रीमद्भगवद्गीता (2.47) • निष्काम कर्म योग
              </div>
            </div>

            {/* Live Community Poll */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-cinzel font-bold text-cyan-300 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span>लाइव साधक पोल</span>
                </span>
                <span className="text-[10px] font-mono text-gray-400">
                  {pollVotes.reduce((a, b) => a + b, 0)} मत
                </span>
              </div>

              <p className="text-xs font-serif">
                आप वर्तमान में किस ग्रह की महादशा अथवा अंतर्दशा का अनुभव कर रहे हैं?
              </p>

              <div className="space-y-2 text-xs font-mono">
                {[
                  { label: '🪐 शनि / राहु / केतु', count: pollVotes[0] },
                  { label: '🌟 गुरु (बृहस्पति) / शुक्र', count: pollVotes[1] },
                  { label: '☀️ सूर्य / चंद्र / मंगल / बुध', count: pollVotes[2] },
                ].map((opt, idx) => {
                  const total = pollVotes.reduce((a, b) => a + b, 0);
                  const pct = Math.round((opt.count / total) * 100);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleVotePoll(idx)}
                      className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                        pollVoted === idx 
                          ? 'border-amber-400 bg-amber-500/20' 
                          : 'border-white/10 bg-black/40 hover:border-white/30'
                      }`}
                    >
                      <div 
                        className="absolute inset-y-0 left-0 bg-amber-500/15 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                      <div className="relative z-10 flex justify-between">
                        <span>{opt.label}</span>
                        <span className="font-bold text-amber-300">{pct}%</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Community Guidelines Banner */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[10.5px] font-mono text-gray-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>सत्संग मर्यादा: सभी साधकों के प्रति आदरभाव रखें। यह कक्ष एआई एवं आचार्यों द्वारा मॉडरेटेड है।</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
