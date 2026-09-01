import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ScreenType, ThemeMode } from '../types';
import { 
  Search, 
  X, 
  Sparkles, 
  Compass, 
  Heart, 
  Calendar, 
  Star, 
  Calculator, 
  Grid, 
  Scroll, 
  Baby, 
  Disc, 
  BookOpen, 
  Layers, 
  Orbit, 
  Gem, 
  Bot, 
  SlidersHorizontal, 
  Home, 
  GraduationCap, 
  ArrowRight,
  Filter,
  Clock,
  Flame,
  Brain,
  Zap,
  Check,
  Tag,
  History,
  Trash2,
  ArrowUpRight,
  RotateCcw
} from 'lucide-react';
import { 
  GLOBAL_SEARCH_ITEMS, 
  SearchResultItem, 
  SearchCategoryType, 
  POPULAR_SEARCH_CHIPS 
} from '../data/globalSearchData';
import { fuzzySearch, FuzzyMatchResult } from '../utils/fuzzySearch';
import { cosmicAudio } from '../utils/audioSynthesizer';
import { AstroGridTile } from '../data/astroSageDirectory';

interface GlobalSearchBarProps {
  theme: ThemeMode;
  onNavigate: (screen: ScreenType) => void;
  onOpenAstrologerChat?: (astrologerId?: string) => void;
  onOpenFeatureModal?: (gridTile: AstroGridTile) => void;
  onOpenReportModal?: () => void;
  onOpenCourse?: (courseId: string) => void;
}

const DEFAULT_RECENT_SEARCHES = [
  'Gita Confession',
  'Mind-Over-Illness Healing',
  '369 Tesla Portal',
  'Kundli Milan 36 Gunas',
  'Lo Shu 3x3 Grid',
  '16 Vastu Zones',
];

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({
  theme,
  onNavigate,
  onOpenAstrologerChat,
  onOpenFeatureModal,
  onOpenReportModal,
  onOpenCourse,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SearchCategoryType | 'all'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kaalchakra_recent_searches');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return DEFAULT_RECENT_SEARCHES;
    } catch {
      return DEFAULT_RECENT_SEARCHES;
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  // Global Keyboard Shortcuts (⌘K, Ctrl+K, /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const isTyping = activeTag === 'input' || activeTag === 'textarea';

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => {
          if (!prev) {
            try { cosmicAudio.playFrequency(639); } catch {}
          }
          return !prev;
        });
      } else if (e.key === '/' && !isTyping && !isOpen) {
        e.preventDefault();
        try { cosmicAudio.playFrequency(639); } catch {}
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 60);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle saving recent searches
  const addRecentSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    const cleanTerm = searchTerm.trim();
    const updated = [
      cleanTerm, 
      ...recentSearches.filter(s => s.toLowerCase() !== cleanTerm.toLowerCase())
    ].slice(0, 8);
    
    setRecentSearches(updated);
    try {
      localStorage.setItem('kaalchakra_recent_searches', JSON.stringify(updated));
    } catch {}
  };

  // Remove a single recent search
  const removeRecentSearch = (e: React.MouseEvent, termToRemove: string) => {
    e.stopPropagation();
    const updated = recentSearches.filter(s => s.toLowerCase() !== termToRemove.toLowerCase());
    setRecentSearches(updated);
    try {
      localStorage.setItem('kaalchakra_recent_searches', JSON.stringify(updated));
    } catch {}
  };

  // Clear all recent searches
  const clearAllRecentSearches = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    try {
      localStorage.removeItem('kaalchakra_recent_searches');
    } catch {}
  };

  // Apply Fuzzy Search Engine across items with category filtering
  const fuzzySearchResults = useMemo(() => {
    let pool = GLOBAL_SEARCH_ITEMS;
    
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'master') {
        pool = pool.filter(item => item.isMasterShastra || item.category === 'master');
      } else {
        pool = pool.filter(item => item.category === selectedCategory);
      }
    }

    if (!query.trim()) {
      // Default initial state: display all filtered items sorted with master shastras first
      return pool.map(item => ({
        item,
        score: item.isMasterShastra ? 100 : 10,
        matchedField: 'title',
        highlightRanges: [] as [number, number][],
      })).slice(0, 16);
    }

    // Execute comprehensive fuzzy search
    return fuzzySearch(pool, query, {
      primaryField: (item) => item.title,
      secondaryFields: [
        { get: (item) => item.hindiTitle, weight: 1.2 },
        { get: (item) => item.subtitle, weight: 1.1 },
        { get: (item) => item.code, weight: 1.3 },
        { get: (item) => item.categoryLabel, weight: 0.8 },
        { get: (item) => item.description, weight: 0.6 },
      ],
      keywordsField: (item) => item.keywords,
    });
  }, [query, selectedCategory]);

  // Filter matching recent searches when typing
  const matchingRecentSearches = useMemo(() => {
    if (!query.trim()) return [];
    const qLower = query.toLowerCase().trim();
    return recentSearches.filter(s => s.toLowerCase().includes(qLower));
  }, [query, recentSearches]);

  // Reset selectedIndex when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  // Re-execute a previous query from recent searches
  const handleSelectRecentQuery = (searchTerm: string) => {
    try {
      cosmicAudio.playFrequency(528);
    } catch {}
    setQuery(searchTerm);
    addRecentSearch(searchTerm);
    inputRef.current?.focus();
  };

  // Perform search item action
  const handleSelectItem = (item: SearchResultItem) => {
    try {
      cosmicAudio.playCosmicChime(528);
    } catch {}

    addRecentSearch(item.title);
    setIsOpen(false);

    if (item.actionType === 'navigate' && item.targetScreen) {
      onNavigate(item.targetScreen);
    } else if (item.actionType === 'course') {
      if (onOpenCourse && item.payload) {
        onOpenCourse(item.payload);
      } else {
        onNavigate('academy');
      }
    } else if (item.actionType === 'astrologer') {
      if (onOpenAstrologerChat) {
        onOpenAstrologerChat(item.payload);
      } else {
        onNavigate('consultations');
      }
    } else if (item.actionType === 'feature_modal') {
      if (onOpenFeatureModal && item.payload) {
        onOpenFeatureModal(item.payload);
      } else if (item.targetScreen) {
        onNavigate(item.targetScreen);
      } else {
        onNavigate('landing');
      }
    } else if (item.actionType === 'report_modal') {
      if (onOpenReportModal) {
        onOpenReportModal();
      } else {
        onNavigate('report');
      }
    }
  };

  // Keyboard navigation within list
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, fuzzySearchResults.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + fuzzySearchResults.length) % Math.max(1, fuzzySearchResults.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (query.trim()) {
        addRecentSearch(query.trim());
      }
      if (fuzzySearchResults[selectedIndex]) {
        handleSelectItem(fuzzySearchResults[selectedIndex].item);
      }
    }
  };

  // Auto scroll active item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  // Icon renderer helper
  const renderIcon = (iconName: string, className = "w-4 h-4") => {
    switch (iconName) {
      case 'Flame': return <Flame className={className} />;
      case 'Brain': return <Brain className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Heart': return <Heart className={className} />;
      case 'Calendar': return <Calendar className={className} />;
      case 'Star': return <Star className={className} />;
      case 'Calculator': return <Calculator className={className} />;
      case 'Grid': return <Grid className={className} />;
      case 'Scroll': return <Scroll className={className} />;
      case 'Baby': return <Baby className={className} />;
      case 'Disc': return <Disc className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'Orbit': return <Orbit className={className} />;
      case 'Gem': return <Gem className={className} />;
      case 'Bot': return <Bot className={className} />;
      case 'SlidersHorizontal': return <SlidersHorizontal className={className} />;
      case 'Home': return <Home className={className} />;
      case 'GraduationCap': return <GraduationCap className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  // Highlight matched text using substring/token regex
  const renderHighlightedText = (text: string, searchStr: string) => {
    if (!searchStr.trim()) return text;
    const tokens = searchStr.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return text;

    // Create safe regex for all tokens
    const escapedTokens = tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escapedTokens.join('|')})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) => {
          const isMatch = tokens.some(t => t.toLowerCase() === part.toLowerCase());
          return isMatch ? (
            <mark 
              key={i} 
              className="bg-amber-400/35 text-amber-300 font-bold px-0.5 rounded shadow-[0_0_8px_rgba(251,191,36,0.3)]"
            >
              {part}
            </mark>
          ) : (
            part
          );
        })}
      </>
    );
  };

  return (
    <>
      {/* 1. Header Trigger Search Bar */}
      <div className="relative flex items-center">
        <button
          id="header-global-search-trigger"
          onClick={() => {
            try { cosmicAudio.playFrequency(528); } catch {}
            setIsOpen(true);
          }}
          className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border text-xs transition-all duration-300 cursor-pointer shadow-inner group select-none ${
            isDark
              ? 'bg-[#12111a]/85 border-[#d4af37]/35 text-gray-200 hover:border-[#ffd700] hover:bg-[#181622] hover:text-white shadow-[0_0_12px_rgba(212,175,55,0.15)]'
              : 'bg-[#faf7ee]/95 border-[#c5a059]/45 text-[#4a340a] hover:border-[#b38b22] hover:bg-white hover:text-[#2c1d06] shadow-sm'
          }`}
          title="Fuzzy Search all 9 Master Shastras, 50+ Occult Tools, Courses, Astrologers (Press ⌘K or /)"
        >
          <Search className="w-3.5 h-3.5 text-[#ffd700] transition-transform group-hover:scale-110 shrink-0" />
          
          <span className="hidden md:inline font-serif text-[11px] opacity-90 truncate max-w-[200px] lg:max-w-none">
            Search 9 Master Shastras & 50+ tools...
          </span>
          <span className="inline md:hidden font-serif text-[11px]">
            Search tools...
          </span>

          <kbd 
            className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-mono rounded border opacity-80 tracking-widest ml-1"
            style={{
              borderColor: isDark ? 'rgba(212, 175, 55, 0.45)' : 'rgba(197, 160, 89, 0.5)',
              backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)',
              color: isDark ? '#ffd700' : '#8a6514'
            }}
          >
            ⌘K
          </kbd>
        </button>
      </div>

      {/* 2. Global Modal Search Palette Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-start justify-center p-2.5 sm:p-6 sm:pt-14 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div 
            id="global-search-modal"
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-3xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[88vh] transition-all duration-300 ${
              isDark 
                ? 'bg-[#0b0b14] border-[#d4af37]/50 text-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(212,175,55,0.25)]' 
                : 'bg-[#faf7ee] border-[#c5a059]/70 text-[#2c1d06] shadow-[0_20px_60px_rgba(75,50,15,0.3)]'
            }`}
          >
            {/* Modal Search Header Input */}
            <div className={`p-3.5 sm:p-4.5 border-b flex items-center gap-2.5 sm:gap-3 relative ${
              isDark ? 'border-amber-500/25 bg-[#11101e]' : 'border-amber-200 bg-white'
            }`}>
              <Search className="w-5 h-5 text-[#ffd700] flex-shrink-0 animate-pulse" />
              
              <input
                ref={inputRef}
                id="global-search-input"
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  try { cosmicAudio.playCyberKeystroke(); } catch {}
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Fuzzy search Master Shastra, Kundli, Gita Confession, Lo Shu, Vastu, Hypnosis..."
                className="w-full bg-transparent text-sm sm:text-base font-serif focus:outline-none placeholder:text-gray-400 placeholder:italic"
              />

              {query && (
                <button
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="p-1 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => setIsOpen(false)}
                className={`px-2 py-1 rounded-lg border text-[10px] sm:text-[11px] font-mono transition-colors cursor-pointer shrink-0 ${
                  isDark ? 'border-white/10 text-gray-300 hover:text-white bg-white/5' : 'border-amber-300 text-[#5a4313] hover:bg-amber-100'
                }`}
              >
                ESC
              </button>
            </div>

            {/* Filter Category Tabs */}
            <div className={`px-3 sm:px-4 py-2 border-b flex items-center gap-1.5 overflow-x-auto text-xs font-serif no-scrollbar ${
              isDark ? 'border-white/10 bg-black/50' : 'border-amber-200/70 bg-amber-50/80'
            }`}>
              <span className="text-[10px] text-gray-400 font-cinzel mr-1 flex items-center gap-1 shrink-0">
                <Filter className="w-3 h-3 text-[#d4af37]" /> Filter:
              </span>

              {[
                { id: 'all', label: 'All Resources' },
                { id: 'master', label: '🌟 9 Master Shastras' },
                { id: 'engine', label: 'Occult Engines' },
                { id: 'astrosage', label: '28 Shastra Tools' },
                { id: 'course', label: 'Academy Courses' },
                { id: 'consultation', label: 'Consultations & Gurus' },
              ].map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      try { cosmicAudio.playFrequency(432); } catch {}
                      setSelectedCategory(tab.id as any);
                    }}
                    className={`px-2.5 sm:px-3 py-1 rounded-full text-[10.5px] sm:text-[11px] transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      isActive
                        ? isDark 
                          ? 'bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-gray-950 font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)]' 
                          : 'bg-[#c5a059] text-white font-bold shadow-sm'
                        : isDark
                          ? 'text-gray-300 hover:text-white hover:bg-white/10'
                          : 'text-[#6a501c] hover:bg-amber-100/80'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* While typing: Matching Recent Searches Quick-Access Banner */}
            {query.trim() && matchingRecentSearches.length > 0 && (
              <div className={`px-3 sm:px-4 py-2 border-b flex items-center gap-2 overflow-x-auto text-xs font-serif no-scrollbar ${
                isDark ? 'bg-amber-950/20 border-amber-500/20 text-amber-200' : 'bg-amber-100/60 border-amber-200 text-[#4a340b]'
              }`}>
                <span className="text-[10px] font-cinzel font-bold text-amber-400 flex items-center gap-1 shrink-0">
                  <History className="w-3 h-3" /> Recent:
                </span>
                {matchingRecentSearches.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectRecentQuery(term)}
                    className={`px-2.5 py-0.5 rounded-full text-[10.5px] border flex items-center gap-1 transition-all cursor-pointer shrink-0 ${
                      isDark
                        ? 'bg-black/60 border-amber-500/35 text-amber-200 hover:bg-amber-500/20 hover:border-amber-400'
                        : 'bg-white border-amber-300 text-[#3d2a06] hover:bg-amber-50'
                    }`}
                  >
                    <Clock className="w-2.5 h-2.5 text-amber-400" />
                    <span>{term}</span>
                    <ArrowUpRight className="w-2.5 h-2.5 opacity-70" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Content Area: Results or Recent Searches & Popular Chips */}
            <div 
              ref={resultsContainerRef}
              className="flex-1 overflow-y-auto p-2.5 sm:p-4 space-y-3 divide-y divide-white/5"
            >
              {/* Recent Searches & Popular Chips when query is empty */}
              {!query.trim() && (
                <div className="py-1 space-y-4">
                  {/* 🕒 RECENT SEARCHES INTERACTIVE CARD */}
                  {recentSearches.length > 0 ? (
                    <div className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                      isDark 
                        ? 'bg-[#131221]/70 border-amber-500/30 shadow-[0_4px_16px_rgba(0,0,0,0.5)]' 
                        : 'bg-white border-amber-200/90 shadow-sm'
                    }`}>
                      {/* Header with Title & Clear All */}
                      <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-white/5">
                        <div className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                          <History className="w-3.5 h-3.5 text-[#ffd700]" /> Recent Searches
                          <span className="text-[10px] font-mono text-gray-400 font-normal ml-1">
                            ({recentSearches.length})
                          </span>
                        </div>

                        <button
                          onClick={clearAllRecentSearches}
                          className="text-[10px] font-mono text-gray-400 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer px-1.5 py-0.5 rounded hover:bg-rose-500/10"
                          title="Clear all previous search queries"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                          <span>Clear History</span>
                        </button>
                      </div>

                      {/* Interactive Recent Search Query Pills */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {recentSearches.map((term, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleSelectRecentQuery(term)}
                            className={`group p-2 sm:p-2.5 rounded-lg border text-xs font-serif transition-all duration-150 cursor-pointer flex items-center justify-between gap-2 select-none ${
                              isDark
                                ? 'bg-black/40 border-white/10 hover:border-amber-400/80 hover:bg-amber-950/30 text-gray-200 hover:text-white'
                                : 'bg-amber-50/50 border-amber-200/80 hover:border-amber-400 hover:bg-amber-100/70 text-[#3b2a07]'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <div className="w-5 h-5 rounded-md bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <Clock className="w-2.5 h-2.5 text-[#ffd700]" />
                              </div>
                              <span className="truncate font-medium">{term}</span>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <span className="text-[9.5px] font-mono text-amber-400/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                                Search <ArrowUpRight className="w-3 h-3" />
                              </span>
                              <button
                                onClick={(e) => removeRecentSearch(e, term)}
                                className="p-1 rounded text-gray-400 hover:text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer ml-1"
                                title={`Remove "${term}" from recent searches`}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="text-[10px] font-mono text-gray-400/80 mt-2.5 pt-2 border-t border-white/5 flex items-center gap-1">
                        <span>💡 Tap any query to re-execute without typing</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg border border-dashed border-white/10 text-center text-xs font-serif text-gray-400">
                      No previous searches recorded. Your recent queries will appear here for instant re-execution.
                    </div>
                  )}

                  {/* Fast Jump & Popular Topics Chips */}
                  <div>
                    <div className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#ffd700] mb-2 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-500" /> Fast Jump & Popular Topics
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_SEARCH_CHIPS.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectRecentQuery(chip.query)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-serif border transition-all cursor-pointer flex items-center gap-1.5 group ${
                            isDark
                              ? 'bg-amber-950/30 border-amber-500/30 text-amber-200 hover:bg-amber-500/25 hover:border-amber-400'
                              : 'bg-amber-50 border-amber-200 text-[#4a340b] hover:bg-amber-100 hover:border-amber-400'
                          }`}
                        >
                          <Sparkles className="w-3 h-3 text-[#ffd700] group-hover:rotate-12 transition-transform" />
                          <span>{chip.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Live Fuzzy Search Results List */}
              {fuzzySearchResults.length > 0 ? (
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-cinzel tracking-widest text-gray-400 px-2 py-1 uppercase flex items-center justify-between">
                    <span>
                      {fuzzySearchResults.length} {selectedCategory === 'master' ? 'Master Shastras' : 'Occult Resources'} Found
                      {query.trim() && <span className="text-amber-400 ml-1.5">• Fuzzy Matched</span>}
                    </span>
                    <span className="hidden sm:inline">Navigate with ↑ ↓ • Select ↵</span>
                  </div>

                  {fuzzySearchResults.map((result, index) => {
                    const item = result.item;
                    const isSelected = index === selectedIndex;
                    const isMaster = item.isMasterShastra || item.category === 'master';

                    return (
                      <div
                        key={item.id}
                        data-index={index}
                        onClick={() => handleSelectItem(item)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-150 cursor-pointer flex items-center justify-between gap-2.5 sm:gap-3 group ${
                          isSelected
                            ? isDark
                              ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_18px_rgba(212,175,55,0.2)] text-white'
                              : 'bg-amber-100 border-amber-400 shadow-sm text-[#2c1d06]'
                            : isDark
                              ? isMaster 
                                ? 'bg-amber-950/20 border-amber-500/25 hover:bg-amber-900/30 text-gray-200' 
                                : 'bg-white/[0.02] border-white/5 hover:bg-white/5 text-gray-300'
                              : isMaster 
                                ? 'bg-amber-50/70 border-amber-300/70 hover:bg-amber-100/60 text-[#3b2b0a]' 
                                : 'bg-white/80 border-amber-200/60 hover:bg-amber-50/80 text-[#3b2b0a]'
                        }`}
                      >
                        {/* Left Icon & Information */}
                        <div className="flex items-start gap-2.5 sm:gap-3 min-w-0 flex-1">
                          <div 
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 border shadow-inner transition-transform group-hover:scale-105 ${
                              isMaster
                                ? 'border-amber-400/60 bg-gradient-to-br from-amber-500/20 to-black/80'
                                : isSelected 
                                  ? 'border-amber-400 bg-amber-400/20' 
                                  : 'border-white/10 bg-black/30'
                            }`}
                          >
                            <span className={item.iconColor || 'text-[#ffd700]'}>
                              {renderIcon(item.iconName, 'w-4 h-4 sm:w-5 sm:h-5')}
                            </span>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                              {/* Master Shastra Code Pill */}
                              {item.code && (
                                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-[9px] font-mono font-bold text-amber-300">
                                  {item.code}
                                </span>
                              )}

                              <h4 className="text-xs sm:text-sm font-serif font-bold tracking-wide leading-tight">
                                {renderHighlightedText(item.title, query)}
                              </h4>

                              {item.badge && (
                                <span 
                                  className={`text-[8.5px] sm:text-[9px] font-cinzel font-semibold px-2 py-0.5 rounded-full border shadow-inner ${
                                    isMaster 
                                      ? 'bg-amber-500/20 border-amber-400/50 text-amber-300 font-bold' 
                                      : 'border-white/10 bg-black/40 text-gray-300'
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>

                            {item.hindiTitle && (
                              <div className="text-[10px] sm:text-[11px] font-serif text-amber-300/85 mt-0.5 truncate">
                                {renderHighlightedText(item.hindiTitle, query)}
                              </div>
                            )}

                            {item.subtitle && (
                              <p className="text-[10.5px] sm:text-[11px] font-serif text-gray-400 opacity-90 truncate mt-0.5">
                                {renderHighlightedText(item.subtitle, query)}
                              </p>
                            )}

                            <p className="text-[10px] sm:text-[11px] font-serif text-gray-400/80 line-clamp-1 mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Right Action Badge / Enter Hint */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-[9.5px] sm:text-[10.5px] font-cinzel font-semibold px-2 sm:px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-colors ${
                            isSelected
                              ? 'bg-amber-500 text-gray-950 border-amber-400 font-bold'
                              : isDark
                                ? 'bg-black/50 border-white/10 text-amber-300'
                                : 'bg-amber-50 border-amber-200 text-[#5a4313]'
                          }`}>
                            <span className="hidden sm:inline">
                              {isMaster ? 'Enter Sanctum' :
                               item.actionType === 'navigate' ? 'Open Engine' : 
                               item.actionType === 'course' ? 'View Course' : 
                               item.actionType === 'astrologer' ? 'Start Chat' : 
                               item.actionType === 'report_modal' ? 'Unlock Report' : 'Explore Tool'}
                            </span>
                            <span className="sm:hidden">Open</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* No Results Found State */
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-[#d4af37]">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-gray-300">
                    No exact occult match found for "{query}"
                  </h4>
                  <p className="text-xs font-serif text-gray-400 max-w-md mx-auto">
                    Try searching for terms like "Gita Confession", "Mind Healing", "Hypnosis", "Kundli", "369 Tesla", "Lo Shu", "Vastu", or "Panchang".
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onNavigate('mentor');
                      }}
                      className="px-4 py-2 rounded-xl bg-gold-gradient text-gray-950 text-xs font-cinzel font-bold shadow hover:brightness-110 transition-all cursor-pointer"
                    >
                      Consult AI Daivajna Mentor
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Keyboard Navigation Footer */}
            <div className={`p-2.5 sm:p-3 border-t flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] font-mono text-gray-400 ${
              isDark ? 'border-white/10 bg-[#0b0b14]' : 'border-amber-200/80 bg-amber-50/60'
            }`}>
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded border border-white/20 bg-white/5 text-[9px]">↑</kbd>
                  <kbd className="px-1 py-0.5 rounded border border-white/20 bg-white/5 text-[9px]">↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded border border-white/20 bg-white/5 text-[9px]">↵</kbd> Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded border border-white/20 bg-white/5 text-[9px]">ESC</kbd> Close
                </span>
              </div>
              <div className="hidden md:flex items-center gap-1 text-amber-400 font-serif italic text-[11px]">
                ✦ Kaal Chakra 9 Master Shastras & 50+ Occult Tools ✦
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
