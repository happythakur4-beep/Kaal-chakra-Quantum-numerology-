import React, { useState, useEffect, useRef } from 'react';
import { ThemeMode } from '../types';
import { AI_ASTROLOGERS_LIST, AIAstrologer } from '../data/astroSageDirectory';
import { astrologerOfflineCache } from '../utils/astrologerOfflineCache';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  PhoneCall, 
  Star, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  Languages,
  Clock,
  WifiOff,
  Database
} from 'lucide-react';
import { cosmicAudio } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

interface AstrologerChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  initialAstrologerId?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'astrologer';
  text: string;
  timestamp: string;
  isOfflineQueued?: boolean;
}

export const AstrologerChatModal: React.FC<AstrologerChatModalProps> = ({
  isOpen,
  onClose,
  theme,
  initialAstrologerId
}) => {
  const [selectedAstrologer, setSelectedAstrologer] = useState<AIAstrologer>(() => {
    const list = astrologerOfflineCache.getAstrologers();
    const found = list.find(a => a.id === initialAstrologerId) || AI_ASTROLOGERS_LIST.find(a => a.id === initialAstrologerId);
    return (found as AIAstrologer) || AI_ASTROLOGERS_LIST[0];
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(() => !navigator.onLine);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleOnline = () => setIsOfflineMode(false);
    const handleOffline = () => setIsOfflineMode(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (initialAstrologerId) {
      const list = astrologerOfflineCache.getAstrologers();
      const found = list.find(a => a.id === initialAstrologerId) || AI_ASTROLOGERS_LIST.find(a => a.id === initialAstrologerId);
      if (found) setSelectedAstrologer(found as AIAstrologer);
    }
  }, [initialAstrologerId]);

  useEffect(() => {
    if (isOpen) {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([
        {
          id: 'welcome',
          sender: 'astrologer',
          text: selectedAstrologer.greetingMessage,
          timestamp: now
        }
      ]);
    }
  }, [isOpen, selectedAstrologer]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const quickQuestions = [
    'मेरी शादी कब होगी और जीवनसाथी कैसा होगा?',
    'करियर व नौकरी में तरक्की के क्या योग हैं?',
    'शनि साढ़े साती का क्या प्रभाव और उपाय है?',
    'क्या मुझपर मांगलिक अथवा कालसर्प दोष है?',
    'मेरे लिए कौन सा रत्न या रुद्राक्ष शुभ है?'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: timeString
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    if (soundEnabled) {
      try { cosmicAudio.playFrequency(432); } catch {}
    }

    if (isOfflineMode) {
      // Record to offline cache queue
      astrologerOfflineCache.queueOfflineQuery(selectedAstrologer.id, selectedAstrologer.name, text);
    }

    // Generate authentic Vedic response based on the Astrologer's expertise (built-in offline/online engine)
    setTimeout(() => {
      let replyText = '';
      const lower = text.toLowerCase();

      if (lower.includes('शादी') || lower.includes('marriage') || lower.includes('विवाह')) {
        replyText = `ॐ नमः शिवाय! आपकी कुंडली के सप्तम भाव और नवमांश (D9) का सूक्ष्म अवलोकन करने पर बृहस्पति (गुरु) का गोचर अनुकूल योग दर्शा रहा है। 2026-2027 की अवधि में विवाह के प्रबल योग बन रहे हैं। जीवनसाथी धार्मिक, समझदार एवं संस्कारी होगा। वैवाहिक सुख हेतु प्रत्येक गुरुवार को भगवान विष्णु की पूजा करें व चने की दाल का दान करें।`;
      } else if (lower.includes('करियर') || lower.includes('नौकरी') || lower.includes('job') || lower.includes('career') || lower.includes('business')) {
        replyText = `दशम भाव (कर्म भाव) और D10 दशमांश चक्र के अनुसार वर्तमान समय में सूर्य और बुध की युति 'बुधादित्य योग' का निर्माण कर रही है। पदोन्नति एवं स्थान परिवर्तन के उत्तम संकेत हैं। यदि आप व्यापार की सोच रहे हैं तो साझेदारी के स्थान पर स्वतंत्र कार्य अधिक फलदायी रहेगा। गायत्री मंत्र का नित्य 108 बार जप करें।`;
      } else if (lower.includes('शनि') || lower.includes('साढ़े साती') || lower.includes('saturn') || lower.includes('dhaiya')) {
        replyText = `शनि देव न्याय के कारक हैं। आपकी राशि पर शनि का प्रभाव कर्म शुद्धि का संकेत देता है। शनिवार को सायंकाल पीपल के वृक्ष के नीचे सरसों के तेल का दीपक प्रज्वलित करें एवं हनुमान चालीसा का पाठ करें। लोहे की वस्तुओं व काले तिल का दान अत्यंत शांतिदायक रहेगा।`;
      } else if (lower.includes('दोष') || lower.includes('मांगलिक') || lower.includes('कालसर्प') || lower.includes('dosha')) {
        replyText = `आपकी कुंडली में मंगल अथवा राहु-केतु की स्थिति आंशिक प्रभाव दिखा रही है, परंतु नवमांश में शुभ ग्रहों की दृष्टि के कारण यह दोष स्वतः क्षीण हो रहा है। भगवान शिव का महामृत्युंजय मंत्र जपें व सोमवार को शिवलिंग पर जल-दूध अर्पित करें। सभी विघ्न दूर होंगे।`;
      } else if (lower.includes('रत्न') || lower.includes('gemstone') || lower.includes('रुद्राक्ष')) {
        replyText = `आपकी लग्न शुद्धि एवं भाग्य वृद्धि हेतु पंचम/नवम भाव के अधिपति का रत्न (जैसे पीला पुखराज अथवा पन्ना) अथवा पंचमुखी रुद्राक्ष धारण करना सर्वोत्तम रहेगा। इसे शुक्ल पक्ष के शुभ मुहूर्त में अभिमंत्रित करवाकर धारण करें।`;
      } else {
        replyText = `आयुष्मान भव! आपके प्रश्न "${text}" के संदर्भ में वैदिक ज्योतिष का स्पष्ट संदेश है कि आपके ग्रह चक्र में सकारात्मक परिवर्तन आरंभ हो चुका है। अपने कर्म को निष्ठापूर्वक करें। प्रातःकाल सूर्य देव को तांबे के लोटे से अर्घ्य दें और 'ॐ सूर्याय नमः' का 11 बार उच्चारण करें। शीघ्र ही मनोवांछित फल प्राप्त होगा।`;
      }

      if (isOfflineMode) {
        replyText += `\n\n[⚡ ऑफ़लाइन कैश परामर्श: आपका प्रश्न स्थानीय रूप से सुरक्षित हो गया है और कनेक्शन लौटते ही ज्योतिषी कक्ष में स्वतः सिंक हो जाएगा।]`;
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'astrologer',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOfflineQueued: isOfflineMode
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);

      if (soundEnabled) {
        try { cosmicAudio.playFrequency(528); } catch {}
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
      />

      {/* Main Chat Dialog */}
      <div 
        className="relative w-full max-w-3xl h-[90vh] max-h-[750px] rounded-2xl border shadow-2xl overflow-hidden z-10 flex flex-col"
        style={{
          backgroundColor: isDark ? '#0d0d16' : '#fffcf5',
          borderColor: isDark ? 'rgba(212, 175, 55, 0.45)' : 'rgba(197, 160, 89, 0.55)',
        }}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#8a4e00] via-[#d4af37] to-[#78350f] p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={selectedAstrologer.avatar} 
                alt={selectedAstrologer.name} 
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
              />
              <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-cinzel font-bold tracking-wide">
                  {selectedAstrologer.name} ({selectedAstrologer.hindiName})
                </h3>
                {isOfflineMode ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-950/90 text-amber-200 border border-amber-400/80 shadow-[0_0_8px_rgba(245,158,11,0.4)]">
                    <WifiOff className="w-2.5 h-2.5 text-amber-300" />
                    Offline (Cached Profile)
                  </span>
                ) : selectedAstrologer.isOccupied ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-950/90 text-amber-200 border border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.5)] ring-1 ring-amber-400/40 animate-pulse">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.9)]" />
                    </span>
                    <Clock className="w-2.5 h-2.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
                    Est. Wait: ~{selectedAstrologer.estimatedWaitTimeMin ?? 4}m
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/30 text-emerald-100 border border-emerald-400/50 shadow-[0_0_8px_rgba(16,185,129,0.35)]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    LIVE
                  </span>
                )}
              </div>
              <p className="text-xs font-serif text-amber-100 opacity-90">
                {selectedAstrologer.title} • {selectedAstrologer.experienceYears} Yrs Exp • ₹{selectedAstrologer.ratePerMin}/min
                {selectedAstrologer.isOccupied && ` • (${selectedAstrologer.activeQueueCount || 2} seekers in queue)`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-full bg-black/25 hover:bg-black/40 text-white transition-colors cursor-pointer"
              title={soundEnabled ? 'Mute Chime' : 'Unmute Chime'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-200" /> : <VolumeX className="w-4 h-4 text-gray-300" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/25 hover:bg-black/40 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Astrologers Switcher Bar */}
        <div className={`px-4 py-2 border-b flex items-center gap-2 overflow-x-auto no-scrollbar ${
          isDark ? 'bg-black/40 border-[#d4af37]/20' : 'bg-amber-100/50 border-amber-200'
        }`}>
          <span className="text-[10px] font-cinzel font-bold text-[#d4af37] whitespace-nowrap">
            Switch Guru:
          </span>
          {AI_ASTROLOGERS_LIST.map((astrologer) => (
            <button
              key={astrologer.id}
              onClick={() => {
                setSelectedAstrologer(astrologer);
                try { cosmicAudio.playFrequency(432); } catch {}
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-cinzel flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                selectedAstrologer.id === astrologer.id
                  ? 'bg-gold-gradient text-gray-900 font-bold shadow-md'
                  : 'bg-black/20 border border-white/10 text-gray-300 hover:bg-white/10'
              }`}
            >
              <img src={astrologer.avatar} alt={astrologer.name} className="w-4 h-4 rounded-full object-cover" />
              <span>{astrologer.name}</span>
            </button>
          ))}
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'astrologer' && (
                <img 
                  src={selectedAstrologer.avatar} 
                  alt={selectedAstrologer.name} 
                  className="w-8 h-8 rounded-full object-cover border border-[#d4af37] flex-shrink-0 mt-1"
                />
              )}

              <div
                className={`max-w-[82%] sm:max-w-[75%] p-3.5 rounded-2xl shadow-md text-xs sm:text-sm font-serif leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-gray-950 rounded-tr-none font-medium'
                    : (isDark 
                        ? 'bg-[#181828] border border-[#d4af37]/30 text-gray-100 rounded-tl-none' 
                        : 'bg-white border border-amber-200 text-[#2c1d06] rounded-tl-none')
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className={`block text-[9px] font-mono mt-1 text-right opacity-60`}>
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white flex-shrink-0 mt-1 shadow">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2.5 text-xs font-serif text-amber-400 animate-pulse">
              <img 
                src={selectedAstrologer.avatar} 
                alt={selectedAstrologer.name} 
                className="w-7 h-7 rounded-full object-cover border border-[#d4af37]"
              />
              <span>{selectedAstrologer.name} कुंडली एवं ग्रह गोचर का विश्लेषण कर रहे हैं...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions Chips */}
        <div className={`p-2.5 border-t overflow-x-auto no-scrollbar flex items-center gap-2 ${
          isDark ? 'bg-black/30 border-[#d4af37]/20' : 'bg-amber-50 border-amber-200'
        }`}>
          <span className="text-[10px] font-cinzel font-bold text-[#d4af37] flex items-center gap-1 flex-shrink-0">
            <Sparkles className="w-3 h-3 text-amber-400" />
            त्वरित प्रश्न:
          </span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className={`px-3 py-1 rounded-full text-[11px] font-serif border whitespace-nowrap transition-colors cursor-pointer ${
                isDark 
                  ? 'border-[#d4af37]/30 hover:bg-[#d4af37]/20 text-amber-200 bg-black/40' 
                  : 'border-amber-300 hover:bg-amber-100 text-amber-950 bg-white'
              }`}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className={`p-3 border-t flex items-center gap-2 ${
            isDark ? 'bg-[#0f0f18] border-[#d4af37]/30' : 'bg-white border-amber-200'
          }`}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="अपना प्रश्न यहाँ टाइप करें (उदा. जन्म कुंडली, विवाह, करियर, उपाय)..."
            className={`flex-1 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-serif outline-none transition-colors ${
              isDark 
                ? 'bg-black/50 border-[#d4af37]/30 text-white placeholder-gray-500 focus:border-[#ffd700]' 
                : 'bg-amber-50/50 border-amber-300 text-[#2c1d06] placeholder-amber-900/50 focus:border-amber-600'
            }`}
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="px-4 py-2.5 rounded-xl bg-gold-gradient text-gray-950 font-cinzel font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer flex-shrink-0"
          >
            <span>भेजें</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
