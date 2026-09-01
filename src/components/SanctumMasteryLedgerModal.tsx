import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Award, 
  Compass, 
  CheckCircle2, 
  Flame, 
  RotateCcw,
  BookOpen,
  History,
  Activity
} from 'lucide-react';
import { 
  sanctumTracker, 
  SanctumEngagement, 
  SANCTUM_PORTAL_METADATA 
} from '../utils/sanctumEngagementTracker';
import { SanctumProgressCircularIndicator } from './SanctumProgressCircularIndicator';

interface SanctumMasteryLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEngagement?: SanctumEngagement | null;
  onNavigateToPortal?: (portalId: string) => void;
  theme?: 'dark' | 'light';
}

export const SanctumMasteryLedgerModal: React.FC<SanctumMasteryLedgerModalProps> = ({
  isOpen,
  onClose,
  selectedEngagement,
  onNavigateToPortal,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';
  const allEngagements = sanctumTracker.getAllEngagements();

  const totalSanctums = Object.keys(SANCTUM_PORTAL_METADATA).length;
  const engagedSanctums = Object.values(allEngagements).filter(e => e.visitsCount > 0 || e.progressPercentage > 0).length;
  const completedSanctums = Object.values(allEngagements).filter(e => e.isCompleted || e.progressPercentage >= 100).length;
  const overallMasteryPct = Math.round(
    Object.values(allEngagements).reduce((acc, curr) => acc + curr.progressPercentage, 0) / (totalSanctums || 1)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25 }}
            className={`relative w-full max-w-2xl rounded-3xl border-2 p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden z-10 ${
              isDark
                ? 'bg-[#08070b]/95 border-amber-500/50 text-white shadow-[0_0_60px_rgba(245,158,11,0.25)]'
                : 'bg-[#fffaf0] border-amber-400 text-[#2a1704] shadow-2xl'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-amber-500/20 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>OCCULT SCIENCE INITIATION & MASTERY LEDGER</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-amber-400">
                  Sanctum Engagement Progress
                </h3>
                <p className={`text-xs font-serif ${isDark ? 'text-gray-400' : 'text-[#78350f]'}`}>
                  Real-time circular completion tracking for all 9 Master Shastras & 4 Sacred House Portals.
                </p>
              </div>

              <button
                onClick={onClose}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300' : 'bg-amber-100 border-amber-200 hover:bg-amber-200 text-[#78350f]'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overall Mastery Score Banner */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
              isDark ? 'bg-black/60 border-amber-500/30' : 'bg-amber-100/60 border-amber-300'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Total Portal Mastery Index</div>
                  <div className="text-lg sm:text-xl font-cinzel font-bold text-white">
                    {overallMasteryPct}% Cosmic Alignment
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right font-mono text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Engaged</span>
                  <span className="font-bold text-amber-300">{engagedSanctums} / {totalSanctums}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Completed</span>
                  <span className="font-bold text-emerald-400">{completedSanctums}</span>
                </div>
              </div>
            </div>

            {/* List of Portals & Real-time Progress */}
            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {Object.entries(SANCTUM_PORTAL_METADATA).map(([id, meta]) => {
                const eng = allEngagements[id] || sanctumTracker.getEngagement(id);
                const hasEngaged = eng.visitsCount > 0 || eng.progressPercentage > 0;

                return (
                  <div
                    key={id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isDark
                        ? 'bg-black/40 border-white/10 hover:border-amber-500/50 hover:bg-black/70'
                        : 'bg-white border-amber-200 hover:border-amber-400 hover:shadow-md'
                    }`}
                  >
                    {/* Left: Indicator & Portal Info */}
                    <div className="flex items-center gap-3 min-w-0">
                      <SanctumProgressCircularIndicator
                        portalId={id}
                        size={40}
                        strokeWidth={3.5}
                        theme={theme}
                        showTooltip={false}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-cinzel font-bold text-white truncate">
                            {meta.name}
                          </h4>
                          {eng.isCompleted && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          )}
                        </div>
                        <p className={`text-[10px] font-serif truncate ${isDark ? 'text-amber-400/80' : 'text-[#78350f]'}`}>
                          {meta.hindiName} • {eng.levelTitle}
                        </p>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right font-mono text-[10px] hidden sm:block">
                        <span className="text-slate-400">{eng.visitsCount} visits</span>
                        <span className="block text-amber-300 font-bold">{eng.progressPercentage}%</span>
                      </div>

                      {onNavigateToPortal && (
                        <button
                          onClick={() => {
                            onClose();
                            onNavigateToPortal(id);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 hover:text-black border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold transition-all cursor-pointer"
                        >
                          Enter
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Notice */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-white/10 pt-3">
              <span>✦ Progress updates automatically with each session & calculation</span>
              <button
                onClick={() => {
                  if (confirm('Recalibrate and reset all sanctum engagement records?')) {
                    Object.keys(SANCTUM_PORTAL_METADATA).forEach(id => sanctumTracker.resetEngagement(id));
                  }
                }}
                className="flex items-center gap-1 text-slate-500 hover:text-amber-400 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Ledger</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
