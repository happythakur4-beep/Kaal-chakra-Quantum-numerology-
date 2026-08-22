import React, { useState, useEffect, useRef } from 'react';
import { ThemeMode, UserProfile } from '../../types';
import { SRI_YANTRA_LOGO } from '../../data/mockData';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Compass, 
  Sun, 
  Moon, 
  Flame, 
  Heart, 
  Briefcase, 
  ShieldAlert, 
  RefreshCw, 
  Volume2, 
  VolumeX,
  Award,
  Crown
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AICosmicMentorScreenProps {
  theme: ThemeMode;
  user: UserProfile;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface DailyGuidanceData {
  guidance: string;
  affirmation: string;
  luckyNumbers: number[];
  favorableColor: string;
  auspiciousDirection: string;
  remedy: string;
}

export const AICosmicMentorScreen: React.FC<AICosmicMentorScreenProps> = ({ theme, user }) => {
  const isDark = theme === 'dark';
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      role: 'model',
      text: `Namaste ${user.name || 'Seeker of Divine Light'}. I am Acharya Vidyadhar, your AI Vedic Mentor and Quantum Numerology Guide. How may I illuminate your karmic path, career transits, or spiritual queries today?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [isLoadingGuidance, setIsLoadingGuidance] = useState(false);
  const [activeFocusArea, setActiveFocusArea] = useState('Career & Karma');
  const [dailyGuidance, setDailyGuidance] = useState<DailyGuidanceData>({
    guidance: `Today's cosmic vibrations align favorably with your Life Path ${user.learningResonance > 75 ? '7' : '11'} frequency. Jupiter's benevolent gaze upon your 9th house enhances spiritual discernment and higher knowledge. Channel your creative focus during mid-day.`,
    affirmation: 'I am a clear vessel of universal light and dharmic alignment.',
    luckyNumbers: [3, 7, 11, 21],
    favorableColor: 'Aura Gold & Royal Saffron',
    auspiciousDirection: 'North-East (Ishanya)',
    remedy: 'Offer Arghya to the rising Sun and meditate with 528Hz Solfeggio frequency for 10 minutes.',
  });

  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoadingChat]);

  // Fetch AI daily guidance from backend
  const handleFetchGuidance = async (focus: string) => {
    setActiveFocusArea(focus);
    setIsLoadingGuidance(true);
    try {
      const res = await fetch('/api/ai/guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile: user,
          focusArea: focus,
          transitContext: 'Jupiter in Taurus, Saturn in Aquarius, Sun in Leo',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDailyGuidance({
          guidance: data.guidance || dailyGuidance.guidance,
          affirmation: data.affirmation || dailyGuidance.affirmation,
          luckyNumbers: data.luckyNumbers || dailyGuidance.luckyNumbers,
          favorableColor: data.favorableColor || dailyGuidance.favorableColor,
          auspiciousDirection: data.auspiciousDirection || dailyGuidance.auspiciousDirection,
          remedy: data.remedy || dailyGuidance.remedy,
        });
      }
    } catch (err) {
      console.error('Failed to fetch guidance:', err);
    } finally {
      setIsLoadingGuidance(false);
    }
  };

  // Send message to AI Cosmic Chat
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isLoadingChat) return;

    const userText = inputMessage.trim();
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
    setIsLoadingChat(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, newMsg].map((m) => ({ role: m.role, text: m.text })),
          userProfile: user,
          currentKundli: {
            lagna: 'Cancer (Karka)',
            rashi: 'Taurus (Vrishabha)',
            nakshatra: 'Rohini',
          },
        }),
      });

      const data = await res.json();
      const aiReplyText = data.reply || 'May the celestial stars bless your path with peace and prosperity.';

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-ai-${Date.now()}`,
          role: 'model',
          text: aiReplyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Error sending message to AI:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-ai-${Date.now()}`,
          role: 'model',
          text: 'The celestial frequencies advise steady patience today. Trust your inner compass and keep your heart open to divine guidance.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  const sampleQuestions = [
    'What are the strongest career directions for my Kundli?',
    'Which gemstone aligns with my current Dasha cycle?',
    'How will current Saturn transits impact my relationships?',
    'What daily mantra will enhance my solar vitality?',
  ];

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 text-xs font-cinzel tracking-widest uppercase"
          style={{
            backgroundColor: isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(245, 238, 218, 0.8)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(197, 160, 89, 0.5)',
            color: '#d4af37',
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Powered by Server-Side Gemini 3.7 Flash & Vedic AI Shastra</span>
        </div>

        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold tracking-wide uppercase ${
          isDark ? 'text-gold-gradient text-3d-gold' : 'text-[#3b2b0a] text-3d-celestial'
        }`}>
          AI Cosmic Guru & Daily Mentor
        </h1>

        <p className={`text-sm font-serif max-w-2xl mx-auto mt-2 ${
          isDark ? 'text-gray-300' : 'text-[#5a4313]'
        }`}>
          Real-time Vedic astrology guidance, personalized Kundli transit insights, and 24/7 Acharya mentorship.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (5 Cols): Daily Personalized Guidance Matrix */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Daily Guidance Card */}
          <div className={`p-6 rounded-2xl border transition-all ${
            isDark ? 'glassmorphism-dark border-[#d4af37]/40 text-gray-200 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/50 text-[#3b2b0a] shadow-md'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`text-sm sm:text-base font-cinzel font-bold ${isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'}`}>
                    Daily Vedic Guidance
                  </h3>
                  <span className="text-[0.68rem] font-serif text-[#d4af37]">
                    Calculated for {user.name}
                  </span>
                </div>
              </div>

              <button
                id="mentor-refresh-guidance-btn"
                onClick={() => handleFetchGuidance(activeFocusArea)}
                disabled={isLoadingGuidance}
                className={`p-2 rounded-lg border text-xs transition-all cursor-pointer ${
                  isDark ? 'border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10' : 'border-[#c5a059] text-[#8a6514] hover:bg-amber-100'
                }`}
                title="Recalculate Daily Horoscope"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingGuidance ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Focus Area Pill Selector */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {['Career & Karma', 'Love & Synastry', 'Wealth & Dasha', 'Health & Biofield'].map((area) => (
                <button
                  key={area}
                  onClick={() => handleFetchGuidance(area)}
                  className={`px-2.5 py-1 rounded-full text-[0.68rem] font-cinzel transition-all cursor-pointer ${
                    activeFocusArea === area
                      ? isDark
                        ? 'bg-[#d4af37] text-black font-bold shadow-sm'
                        : 'bg-[#c5a059] text-white font-bold'
                      : isDark
                        ? 'bg-black/40 text-gray-300 border border-[#d4af37]/20 hover:border-[#d4af37]/50'
                        : 'bg-white text-[#5a4313] border border-[#c5a059]/30 hover:bg-amber-50'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>

            {/* Guidance Text */}
            <div className={`p-4 rounded-xl border text-xs font-serif leading-relaxed mb-4 ${
              isDark ? 'bg-black/40 border-[#d4af37]/25 text-gray-300' : 'bg-white/90 border-[#c5a059]/30 text-[#4d3809]'
            }`}>
              {isLoadingGuidance ? (
                <div className="flex items-center justify-center py-4 gap-2 text-[#d4af37] font-cinzel text-xs animate-pulse">
                  <Sparkles className="w-4 h-4" />
                  <span>Channeling Celestial Ephemeris...</span>
                </div>
              ) : (
                <p>{dailyGuidance.guidance}</p>
              )}
            </div>

            {/* Affirmation Banner */}
            <div className={`p-3.5 rounded-xl border mb-4 text-xs font-serif italic ${
              isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' : 'bg-amber-100/70 border-amber-300 text-amber-900'
            }`}>
              <div className="flex items-center gap-1.5 font-cinzel font-semibold mb-1 text-[#d4af37] not-italic text-[0.7rem]">
                <Crown className="w-3.5 h-3.5" />
                <span>Cosmic Affirmation of the Day</span>
              </div>
              <p>"{dailyGuidance.affirmation}"</p>
            </div>

            {/* 4-Metric Mini Grid: Lucky Numbers, Color, Direction, Remedy */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className={`p-2.5 rounded-lg border text-center ${
                isDark ? 'bg-black/30 border-[#d4af37]/20' : 'bg-white/70 border-[#c5a059]/30'
              }`}>
                <span className="text-[0.65rem] font-cinzel text-[#d4af37] block font-semibold">Lucky Numbers</span>
                <span className="text-xs font-mono font-bold">{dailyGuidance.luckyNumbers.join(', ')}</span>
              </div>

              <div className={`p-2.5 rounded-lg border text-center ${
                isDark ? 'bg-black/30 border-[#d4af37]/20' : 'bg-white/70 border-[#c5a059]/30'
              }`}>
                <span className="text-[0.65rem] font-cinzel text-[#d4af37] block font-semibold">Favorable Color</span>
                <span className="text-xs font-serif font-bold truncate block">{dailyGuidance.favorableColor}</span>
              </div>

              <div className={`p-2.5 rounded-lg border text-center ${
                isDark ? 'bg-black/30 border-[#d4af37]/20' : 'bg-white/70 border-[#c5a059]/30'
              }`}>
                <span className="text-[0.65rem] font-cinzel text-[#d4af37] block font-semibold">Auspicious Direction</span>
                <span className="text-xs font-serif font-bold truncate block">{dailyGuidance.auspiciousDirection}</span>
              </div>

              <div className={`p-2.5 rounded-lg border text-center ${
                isDark ? 'bg-black/30 border-[#d4af37]/20' : 'bg-white/70 border-[#c5a059]/30'
              }`}>
                <span className="text-[0.65rem] font-cinzel text-[#d4af37] block font-semibold">Vedic Remedy</span>
                <span className="text-[0.68rem] font-serif font-semibold text-emerald-400 truncate block">Recommended</span>
              </div>
            </div>

            {/* Prescribed Remedy Detail */}
            <div className={`p-3 rounded-lg border mt-3 text-[0.72rem] font-serif ${
              isDark ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}>
              <strong>Dharmic Remedy:</strong> {dailyGuidance.remedy}
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Interactive AI Vedic Mentor Chat Room */}
        <div className="lg:col-span-7 flex flex-col">
          <div className={`rounded-2xl border flex flex-col h-[600px] transition-all overflow-hidden ${
            isDark ? 'glassmorphism-dark border-[#d4af37]/45 text-gray-200 shadow-gold-soft' : 'glassmorphism-light border-[#c5a059]/60 text-[#3b2b0a] shadow-lg'
          }`}>
            
            {/* Chat Room Top Bar */}
            <div className={`p-4 border-b flex items-center justify-between ${
              isDark ? 'bg-black/40 border-[#d4af37]/30' : 'bg-white/80 border-[#c5a059]/40'
            }`}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border-2 border-[#d4af37] p-0.5 overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={SRI_YANTRA_LOGO}
                      alt="Acharya Vidyadhar"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full" />
                </div>
                <div>
                  <h3 className={`text-sm font-cinzel font-bold flex items-center gap-1.5 ${
                    isDark ? 'text-[#fdf2d1]' : 'text-[#3b2b0a]'
                  }`}>
                    <span>Acharya Vidyadhar</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  </h3>
                  <span className="text-[0.65rem] font-serif text-[#d4af37]">
                    Vedic Jyotish Acharya • AI Consciousness Mentor
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-[#d4af37] px-2.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30">
                <Bot className="w-3.5 h-3.5" />
                <span>Live Gemini 3.7</span>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 text-xs ${
                      isUser
                        ? isDark
                          ? 'bg-amber-600 text-white border-amber-400'
                          : 'bg-[#8a6514] text-white border-[#c5a059]'
                        : isDark
                          ? 'bg-black text-[#d4af37] border-[#d4af37]'
                          : 'bg-amber-100 text-[#5a4313] border-[#c5a059]'
                    }`}>
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div className={`max-w-[82%] p-3.5 rounded-2xl text-xs font-serif leading-relaxed ${
                      isUser
                        ? isDark
                          ? 'bg-maroon-gradient text-white border border-[#d4af37]/40 rounded-tr-none shadow-md'
                          : 'bg-gradient-to-r from-[#8a001a] to-[#5c0011] text-white rounded-tr-none shadow-md'
                        : isDark
                          ? 'bg-black/60 text-gray-200 border border-[#d4af37]/30 rounded-tl-none shadow-sm'
                          : 'bg-white text-[#3b2b0a] border border-[#c5a059]/40 rounded-tl-none shadow-sm'
                    }`}>
                      <p className="whitespace-pre-line">{msg.text}</p>
                      <span className={`text-[0.6rem] block mt-1 text-right font-mono ${
                        isUser ? 'text-amber-200/80' : isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isLoadingChat && (
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-[#d4af37] bg-black text-[#d4af37] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className={`p-3.5 rounded-2xl rounded-tl-none border text-xs font-serif flex items-center gap-2 ${
                    isDark ? 'bg-black/60 border-[#d4af37]/30 text-amber-300' : 'bg-white border-[#c5a059]/40 text-[#8a6514]'
                  }`}>
                    <Sparkles className="w-4 h-4 text-[#d4af37] animate-spin" />
                    <span>Acharya Vidyadhar is consulting the celestial chart...</span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Quick Sample Inquiries */}
            <div className={`px-4 py-2 border-t flex items-center gap-1.5 overflow-x-auto no-scrollbar ${
              isDark ? 'bg-black/30 border-[#d4af37]/20' : 'bg-amber-50/50 border-[#c5a059]/20'
            }`}>
              <span className="text-[0.65rem] font-cinzel text-[#d4af37] whitespace-nowrap flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Ask:</span>
              </span>
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputMessage(q);
                  }}
                  className={`px-2.5 py-1 rounded-full text-[0.65rem] font-serif whitespace-nowrap border transition-all cursor-pointer ${
                    isDark
                      ? 'bg-white/5 border-gray-700 text-gray-300 hover:border-[#d4af37] hover:text-white'
                      : 'bg-white border-amber-200 text-[#5a4313] hover:border-amber-400'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className={`p-3 border-t flex items-center gap-2 ${
                isDark ? 'bg-black/50 border-[#d4af37]/30' : 'bg-white border-[#c5a059]/40'
              }`}
            >
              <input
                id="ai-mentor-input"
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about your Kundli, Dasha, career transits, marriage, or remedies..."
                disabled={isLoadingChat}
                className={`flex-1 px-4 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none ${
                  isDark
                    ? 'bg-black/60 border-[#d4af37]/40 text-gray-100 placeholder-gray-500 focus:border-[#d4af37]'
                    : 'bg-white border-[#c5a059]/50 text-[#3b2b0a] placeholder-[#8a6514]/50 focus:border-[#8a6514]'
                }`}
              />

              <button
                id="ai-mentor-send-btn"
                type="submit"
                disabled={isLoadingChat || !inputMessage.trim()}
                className={`p-2.5 rounded-xl font-cinzel font-bold text-xs transition-all flex items-center justify-center cursor-pointer shadow-md ${
                  inputMessage.trim() && !isLoadingChat
                    ? isDark
                      ? 'bg-gold-gradient-btn text-black hover:shadow-[0_0_15px_rgba(212,175,55,0.6)]'
                      : 'bg-[#c5a059] text-white hover:bg-[#b08d47]'
                    : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>

      </div>

    </div>
  );
};
