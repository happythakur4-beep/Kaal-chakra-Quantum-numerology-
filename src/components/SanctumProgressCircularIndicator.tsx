import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Sparkles, 
  Flame, 
  Compass, 
  History, 
  Activity, 
  Award,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { 
  sanctumTracker, 
  SanctumEngagement 
} from '../utils/sanctumEngagementTracker';

interface SanctumProgressCircularIndicatorProps {
  portalId: string;
  size?: number; // Size in px (e.g. 34, 38, 42)
  strokeWidth?: number;
  accentColor?: string;
  theme?: 'dark' | 'light';
  showTooltip?: boolean;
  className?: string;
  onOpenEngagementLog?: (engagement: SanctumEngagement) => void;
}

export const SanctumProgressCircularIndicator: React.FC<SanctumProgressCircularIndicatorProps> = ({
  portalId,
  size = 36,
  strokeWidth = 3.2,
  accentColor,
  theme = 'dark',
  showTooltip = true,
  className = '',
  onOpenEngagementLog,
}) => {
  const [engagement, setEngagement] = useState<SanctumEngagement>(() => 
    sanctumTracker.getEngagement(portalId)
  );
  const [isHovered, setIsHovered] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    // Initial fetch
    setEngagement(sanctumTracker.getEngagement(portalId));

    // Subscribe to engagement changes
    const unsub = sanctumTracker.subscribe(() => {
      setEngagement(sanctumTracker.getEngagement(portalId));
    });

    return () => unsub();
  }, [portalId]);

  const progress = Math.min(100, Math.max(0, engagement.progressPercentage));
  const hasEngaged = engagement.visitsCount > 0 || progress > 0;
  const isCompleted = progress >= 100;

  // SVG Geometry calculations
  const center = size / 2;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  // Determine dynamic ring color based on engagement level or custom accent
  const getRingColor = () => {
    if (accentColor) return accentColor;
    if (isCompleted) return '#10b981'; // Emerald complete
    if (progress >= 75) return '#f59e0b'; // Gold Master
    if (progress >= 50) return '#06b6d4'; // Cyan Adept
    if (progress >= 25) return '#8b5cf6'; // Purple Apprentice
    return '#d97706'; // Amber Initiate
  };

  const ringColor = getRingColor();

  const formatTimeAgo = (timestamp: number) => {
    if (!timestamp) return 'Never';
    const diffSec = Math.floor((Date.now() - timestamp) / 1000);
    if (diffSec < 60) return 'Just now';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    return `${Math.floor(diffSec / 86400)}d ago`;
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        if (onOpenEngagementLog) {
          e.stopPropagation();
          onOpenEngagementLog(engagement);
        }
      }}
      title={`${engagement.portalName} • ${progress}% engagement (${engagement.levelTitle})`}
    >
      {/* SVG Circular Progress Meter */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90 origin-center transition-transform duration-300"
      >
        {/* Background Track Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(120, 53, 15, 0.15)'}
          strokeWidth={strokeWidth}
          strokeDasharray={hasEngaged ? undefined : '2, 3'}
        />

        {/* Dynamic Progress Fill Stroke */}
        {hasEngaged && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.4s ease',
              filter: isHovered || isCompleted ? `drop-shadow(0 0 6px ${ringColor})` : undefined,
            }}
          />
        )}
      </svg>

      {/* Inner Center Label / Icon */}
      <div 
        className="absolute inset-0 flex items-center justify-center font-mono font-black"
        style={{ fontSize: size <= 32 ? '9px' : '10.5px' }}
      >
        {isCompleted ? (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-emerald-400"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </motion.div>
        ) : hasEngaged ? (
          <span 
            className={`transition-colors ${
              isDark ? 'text-white' : 'text-[#451a03]'
            }`}
            style={{ color: isHovered ? ringColor : undefined }}
          >
            {progress}%
          </span>
        ) : (
          <span className={`text-[8.5px] ${isDark ? 'text-slate-500' : 'text-amber-800/40'}`}>
            0%
          </span>
        )}
      </div>

      {/* Subtle Active Engagement Pulse Ring */}
      {hasEngaged && isHovered && (
        <span 
          className="absolute inset-0 rounded-full animate-ping pointer-events-none opacity-40"
          style={{ backgroundColor: ringColor }}
        />
      )}

      {/* Interactive Tooltip on Hover */}
      {showTooltip && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className={`absolute top-full mt-2.5 left-1/2 -translate-x-1/2 z-50 w-52 p-3 rounded-2xl border shadow-2xl backdrop-blur-xl pointer-events-none ${
                isDark
                  ? 'bg-black/95 border-amber-500/40 text-white shadow-[0_10px_35px_rgba(0,0,0,0.8)]'
                  : 'bg-[#fffaf0] border-amber-400/80 text-[#2a1704] shadow-xl'
              }`}
            >
              {/* Tooltip Arrow Pointer */}
              <div 
                className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-t border-l ${
                  isDark ? 'bg-black border-amber-500/40' : 'bg-[#fffaf0] border-amber-400/80'
                }`} 
              />

              <div className="relative z-10 space-y-2 text-left">
                {/* Header: Portal Name & Tier */}
                <div className="flex items-start justify-between gap-1 border-b pb-1.5 border-white/10">
                  <div>
                    <span className="text-[11px] font-cinzel font-bold block leading-tight">
                      {engagement.portalName}
                    </span>
                    <span className="text-[9.5px] font-serif text-amber-400/90 block">
                      {engagement.levelTitleHindi}
                    </span>
                  </div>
                  <span 
                    className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full border shrink-0"
                    style={{ borderColor: ringColor, color: ringColor }}
                  >
                    Lvl {engagement.level}
                  </span>
                </div>

                {/* Status Tier & Percentage */}
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className={isDark ? 'text-slate-300' : 'text-[#78350f]'}>
                    {engagement.levelTitle}
                  </span>
                  <span className="font-bold" style={{ color: ringColor }}>
                    {progress}% Mastery
                  </span>
                </div>

                {/* Progress Bar inside Tooltip */}
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress}%`, backgroundColor: ringColor }}
                  />
                </div>

                {/* Engagement Stats */}
                <div className="grid grid-cols-2 gap-1.5 pt-1 text-[9px] font-mono">
                  <div className={`p-1.5 rounded-lg border ${
                    isDark ? 'bg-white/5 border-white/5 text-slate-300' : 'bg-amber-100/50 border-amber-200 text-[#5a2e0a]'
                  }`}>
                    <span className="text-slate-400 block text-[8px]">Visits</span>
                    <span className="font-bold text-amber-300">{engagement.visitsCount}</span>
                  </div>
                  <div className={`p-1.5 rounded-lg border ${
                    isDark ? 'bg-white/5 border-white/5 text-slate-300' : 'bg-amber-100/50 border-amber-200 text-[#5a2e0a]'
                  }`}>
                    <span className="text-slate-400 block text-[8px]">Last Active</span>
                    <span className="font-bold truncate">{formatTimeAgo(engagement.lastEngagedAt)}</span>
                  </div>
                </div>

                {/* Milestones count or tip */}
                {engagement.milestones.length > 0 ? (
                  <div className="text-[8.5px] font-serif text-slate-400 truncate pt-0.5">
                    ✦ {engagement.milestones[engagement.milestones.length - 1]}
                  </div>
                ) : (
                  <div className="text-[8.5px] font-serif text-amber-400/80 pt-0.5">
                    ✦ Tap to enter and begin initiation
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
