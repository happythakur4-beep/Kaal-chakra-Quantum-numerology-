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
  CornerDownLeft, 
  ArrowRight,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  Flame
} from 'lucide-react';
import { 
  GLOBAL_SEARCH_ITEMS, 
  SearchResultItem, 
  SearchCategoryType, 
  POPULAR_SEARCH_CHIPS 
} from '../data/globalSearchData';
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
      const saved = localStorage.getItem('celestial_recent_searches');
      return saved ? JSON.parse(saved) : ['Kundli Milan', 'Lo Shu Grid', 'Vedic Astrology 101', 'Swami Ji'];
    } catch {
      return ['Kundli Milan', 'Lo Shu Grid', 'Vedic Astrology 101', 'Swami Ji'];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  // Global Keyboard Shortcuts (⌘K, Ctrl+K, /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in another input / textarea unless it is Escape
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const isTyping = activeTag === 'input' || activeTag === 'textarea';

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === '/' && !isTyping && !isOpen) {
        e.preventDefault();
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

  // Filter items based on query and category
  const filteredResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    
    let items = GLOBAL_SEARCH_ITEMS;
    
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    if (!trimmed) {
      return items.slice(0, 14); // show preview if no query
    }

    return items.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(trimmed);
      const hindiMatch = (item.hindiTitle || '').toLowerCase().includes(trimmed);
      const subtitleMatch = (item.subtitle || '').toLowerCase().includes(trimmed);
      const descMatch = item.description.toLowerCase().includes(trimmed);
      const keywordMatch = item.keywords.some(k => k.includes(trimmed));
      const categoryMatch = item.categoryLabel.toLowerCase().includes(trimmed);

      return titleMatch || hindiMatch || subtitleMatch || descMatch || keywordMatch || categoryMatch;
    });
  }, [query, selectedCategory]);

  // Reset selectedIndex when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  // Handle saving recent searches
  const addRecentSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    const updated = [searchTerm, ...recentSearches.filter(s => s.toLowerCase() !== searchTerm.toLowerCase())].slice(0, 6);
    setRecentSearches(updated);
    try {
      localStorage.setItem('celestial_recent_searches', JSON.stringify(updated));
    } catch {}
  };

  // Perform search item action
  const handleSelectItem = (item: SearchResultItem) => {
    // Play harmonic tone
    try {
      cosmicAudio.playFrequency(528);
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
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredResults.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelectItem(filteredResults[selectedIndex]);
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

  // Highlight matched text helper
  const highlightMatch = (text: string, searchStr: string) => {
    if (!searchStr.trim()) return text;
    const parts = text.split(new RegExp(`(${searchStr})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === searchStr.toLowerCase() ? (
            <mark key={i} className="bg-amber-400/30 text-amber-300 font-semibold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <>
      {/* 1. Header Trigger Search Bar */}
      <div className="relative flex items-center">
        <button
          id="header-global-search-trigger"
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all duration-300 cursor-pointer shadow-inner group ${
            isDark
              ? 'bg-[#12111a]/80 border-[#d4af37]/30 text-gray-300 hover:border-[#d4af37] hover:bg-[#181622] hover:text-[#fdf2d1]'
              : 'bg-[#faf7ee]/90 border-[#c5a059]/40 text-[#5a4313] hover:border-[#b38b22] hover:bg-white hover:text-[#2c1d06]'
          }`}
          title="Search all Occult Tools, Courses, Consultations (Press ⌘K or /)"
        >
          <Search className="w-3.5 h-3.5 text-[#d4af37] transition-transform group-hover:scale-110" />
          
          <span className="hidden md:inline font-serif text-[11px] opacity-85">
            Search 50+ occult tools, courses...
          </span>
          <span className="inline md:hidden font-serif text-[11px]">
            Search...
          </span>

          <kbd 
            className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-mono rounded border opacity-70 tracking-widest"
            style={{
              borderColor: isDark ? 'rgba(212, 175, 55, 0.4)' : 'rgba(197, 160, 89, 0.5)',
              backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)',
              color: isDark ? '#d4af37' : '#8a6514'
            }}
          >
            ⌘K
          </kbd>
        </button>
      </div>

      {/* 2. Global Modal Search Palette Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-start justify-center p-3 sm:p-6 sm:pt-16 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div 
            id="global-search-modal"
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-3xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[85vh] transition-all duration-300 ${
              isDark 
                ? 'bg-[#0c0c16] border-[#d4af37]/40 text-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.2)]' 
                : 'bg-[#faf7ee] border-[#c5a059]/60 text-[#2c1d06] shadow-[0_20px_60px_rgba(75,50,15,0.25)]'
            }`}
          >
            {/* Modal Search Header Input */}
            <div className={`p-4 sm:p-5 border-b flex items-center gap-3 relative ${
              isDark ? 'border-amber-500/20 bg-[#12111f]' : 'border-amber-200/80 bg-white'
            }`}>
              <Search className="w-5 h-5 text-[#d4af37] flex-shrink-0 animate-pulse" />
              
              <input
                ref={inputRef}
                id="global-search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Type to find Kundli, Courses, Consultations, Vastu, Lal Kitab..."
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
                className={`px-2 py-1 rounded-lg border text-[11px] font-mono transition-colors cursor-pointer ${
                  isDark ? 'border-white/10 text-gray-400 hover:text-white bg-white/5' : 'border-amber-300 text-[#5a4313] hover:bg-amber-100'
                }`}
              >
                ESC
              </button>
            </div>

            {/* Filter Category Tabs */}
            <div className={`px-4 py-2 border-b flex items-center gap-1.5 overflow-x-auto text-xs font-serif ${
              isDark ? 'border-white/10 bg-black/40' : 'border-amber-200/60 bg-amber-50/70'
            }`}>
              <span className="text-[10px] text-gray-400 font-cinzel mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-[#d4af37]" /> Filter:
              </span>

              {[
                { id: 'all', label: 'All Resources' },
                { id: 'engine', label: 'Occult Engines' },
                { id: 'course', label: 'Academy Courses' },
                { id: 'consultation', label: 'Consultations & Gurus' },
                { id: 'astrosage', label: 'Shastra Tools' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`px-2.5 py-1 rounded-full text-[11px] transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === tab.id
                      ? isDark 
                        ? 'bg-[#d4af37] text-gray-950 font-bold shadow-sm' 
                        : 'bg-[#c5a059] text-white font-bold shadow-sm'
                      : isDark
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                        : 'text-[#6a501c] hover:bg-amber-100/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Main Content Area: Results or Popular Chips */}
            <div 
              ref={resultsContainerRef}
              className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 divide-y divide-white/5"
            >
              {/* Popular Chips & Recent Search when query is empty */}
              {!query.trim() && (
                <div className="py-2 space-y-4">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#d4af37]" /> Recent Searches
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {recentSearches.map((term, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setQuery(term);
                              inputRef.current?.focus();
                            }}
                            className={`px-2.5 py-1 rounded-lg text-xs font-serif border transition-all cursor-pointer flex items-center gap-1.5 ${
                              isDark
                                ? 'bg-white/5 border-white/10 text-gray-300 hover:border-amber-400 hover:text-amber-300'
                                : 'bg-white border-amber-200 text-[#422e06] hover:border-amber-400 hover:bg-amber-50'
                            }`}
                          >
                            <Search className="w-2.5 h-2.5 text-gray-400" />
                            <span>{term}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Topics */}
                  <div>
                    <div className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#d4af37] mb-2 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-500" /> Popular Occult Searches
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_SEARCH_CHIPS.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setQuery(chip.query);
                            inputRef.current?.focus();
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-serif border transition-all cursor-pointer flex items-center gap-1.5 ${
                            isDark
                              ? 'bg-amber-950/30 border-amber-500/25 text-amber-200 hover:bg-amber-500/20 hover:border-amber-400'
                              : 'bg-amber-50 border-amber-200 text-[#4a340b] hover:bg-amber-100 hover:border-amber-400'
                          }`}
                        >
                          <Sparkles className="w-3 h-3 text-[#d4af37]" />
                          <span>{chip.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl border text-xs font-serif flex items-center justify-between ${
                    isDark ? 'bg-[#141220] border-amber-500/20 text-gray-300' : 'bg-amber-50/80 border-amber-200 text-[#422e06]'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-[#d4af37]" />
                      <span>Need bespoke guidance? Ask our AI Daivajna directly.</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onNavigate('mentor');
                      }}
                      className="text-xs font-cinzel font-bold text-[#d4af37] underline hover:text-amber-300 cursor-pointer"
                    >
                      Open Mentor →
                    </button>
                  </div>
                </div>
              )}

              {/* Live Search Results List */}
              {filteredResults.length > 0 ? (
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-cinzel tracking-widest text-gray-400 px-2 py-1 uppercase flex items-center justify-between">
                    <span>{filteredResults.length} Occult Resources Found</span>
                    <span>Navigate with ↑ ↓ • Select ↵</span>
                  </div>

                  {filteredResults.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        data-index={index}
                        onClick={() => handleSelectItem(item)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`p-3 rounded-xl border transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? isDark
                              ? 'bg-amber-500/15 border-amber-400/80 shadow-[0_0_15px_rgba(212,175,55,0.15)] text-gray-100'
                              : 'bg-amber-100/90 border-amber-400 shadow-sm text-[#2c1d06]'
                            : isDark
                              ? 'bg-white/[0.02] border-white/5 hover:bg-white/5 text-gray-300'
                              : 'bg-white/80 border-amber-200/60 hover:bg-amber-50/80 text-[#3b2b0a]'
                        }`}
                      >
                        {/* Left Icon & Information */}
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <div 
                            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border shadow-inner transition-transform ${
                              isSelected ? 'scale-105 border-amber-400 bg-amber-400/20' : 'border-white/10 bg-black/30'
                            }`}
                          >
                            <span className={item.iconColor || 'text-[#d4af37]'}>
                              {renderIcon(item.iconName)}
                            </span>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-xs sm:text-sm font-serif font-bold tracking-wide truncate">
                                {highlightMatch(item.title, query)}
                              </h4>
                              {item.hindiTitle && (
                                <span className="text-[11px] font-serif text-gray-400">
                                  ({highlightMatch(item.hindiTitle, query)})
                                </span>
                              )}
                              {item.badge && (
                                <span 
                                  className="text-[9px] font-cinzel font-semibold px-2 py-0.5 rounded-full border shadow-inner"
                                  style={{
                                    borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.4)',
                                    backgroundColor: isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255, 255, 255, 0.8)',
                                    color: isDark ? '#fbbf24' : '#785412'
                                  }}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>

                            {item.subtitle && (
                              <p className="text-[11px] font-serif text-[#d4af37] opacity-90 truncate mt-0.5">
                                {highlightMatch(item.subtitle, query)}
                              </p>
                            )}

                            <p className="text-[11px] font-serif text-gray-400 line-clamp-1 mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Right Action Badge / Enter Hint */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-[10px] font-cinzel font-semibold px-2 py-1 rounded-lg border flex items-center gap-1 ${
                            isSelected
                              ? 'bg-amber-500 text-gray-950 border-amber-400 font-bold'
                              : isDark
                                ? 'bg-black/40 border-white/10 text-gray-400'
                                : 'bg-amber-50 border-amber-200 text-[#5a4313]'
                          }`}>
                            <span>
                              {item.actionType === 'navigate' ? 'Open Engine' : 
                               item.actionType === 'course' ? 'View Course' : 
                               item.actionType === 'astrologer' ? 'Start Chat' : 
                               item.actionType === 'report_modal' ? 'Unlock Report' : 'Explore Tool'}
                            </span>
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
                    No exact occult shastra match found for "{query}"
                  </h4>
                  <p className="text-xs font-serif text-gray-400 max-w-md mx-auto">
                    Try searching for broader terms such as "Kundli", "Vastu", "Panchang", "Tarot", "Swami Ji", or "Numerology".
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
            <div className={`p-3 border-t flex flex-wrap items-center justify-between text-[11px] font-mono text-gray-400 ${
              isDark ? 'border-white/10 bg-[#0c0c16]' : 'border-amber-200/80 bg-amber-50/50'
            }`}>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded border border-white/20 bg-white/5 text-[9px]">↑</kbd>
                  <kbd className="px-1 py-0.5 rounded border border-white/20 bg-white/5 text-[9px]">↓</kbd> to Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded border border-white/20 bg-white/5 text-[9px]">↵</kbd> to Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded border border-white/20 bg-white/5 text-[9px]">ESC</kbd> to Close
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[#d4af37] font-serif italic text-[11px]">
                ✦ Occult Science Institute Global Directory ✦
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
