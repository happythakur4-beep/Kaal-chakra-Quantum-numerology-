import React, { useState } from 'react';
import { ThemeMode, MemorySessionLog } from '../../types';
import {
  Shield,
  Trash2,
  Calendar,
  Zap,
  TrendingDown,
  Sparkles,
  Award,
  Download,
  CheckCircle,
  Clock
} from 'lucide-react';

interface MemoryCaseVaultProps {
  theme: ThemeMode;
  logs: MemorySessionLog[];
  onDeleteLog?: (id: string) => void;
  onClearAllLogs?: () => void;
}

export const MemoryCaseVault: React.FC<MemoryCaseVaultProps> = ({
  theme,
  logs,
  onDeleteLog,
  onClearAllLogs
}) => {
  const isDark = theme === 'dark';

  const averageDistressReduction =
    logs.length > 0
      ? Math.round(
          logs.reduce((acc, curr) => acc + curr.emotionalChargeReductionPct, 0) / logs.length
        )
      : 0;

  const totalPointsExtinguished = logs.reduce(
    (acc, curr) => acc + Math.max(0, curr.sudsBefore - curr.sudsAfter),
    0
  );

  return (
    <div className="space-y-6">
      {/* Top Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className={`p-5 rounded-3xl border space-y-1 ${
            isDark ? 'bg-slate-900/80 border-cyan-500/30' : 'bg-white border-cyan-200 shadow-md'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Zap className="w-4 h-4 fill-cyan-400" />
            <span>Total Hypnosis Sessions</span>
          </div>
          <div className="text-2xl sm:text-3xl font-cinzel font-bold text-white">
            {logs.length}
          </div>
          <div className="text-[10px] text-slate-400">Completed Reconsolidations</div>
        </div>

        <div
          className={`p-5 rounded-3xl border space-y-1 ${
            isDark ? 'bg-slate-900/80 border-emerald-500/30' : 'bg-white border-emerald-200 shadow-md'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <TrendingDown className="w-4 h-4" />
            <span>Avg Distress Reduction</span>
          </div>
          <div className="text-2xl sm:text-3xl font-cinzel font-bold text-emerald-300">
            {averageDistressReduction}%
          </div>
          <div className="text-[10px] text-slate-400">Autonomic Amygdala Relief</div>
        </div>

        <div
          className={`p-5 rounded-3xl border space-y-1 ${
            isDark ? 'bg-slate-900/80 border-amber-500/30' : 'bg-white border-amber-200 shadow-md'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Award className="w-4 h-4" />
            <span>SUDS Points Extinguished</span>
          </div>
          <div className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-300">
            -{totalPointsExtinguished} pts
          </div>
          <div className="text-[10px] text-slate-400">Subjective Units of Trauma Dissolved</div>
        </div>
      </div>

      {/* Main Logs Table */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border space-y-6 backdrop-blur-xl ${
          isDark
            ? 'bg-[#0a0f1d]/90 border-cyan-500/30 text-white shadow-2xl'
            : 'bg-white border-cyan-200 text-slate-900 shadow-xl'
        }`}
      >
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-cinzel font-bold text-cyan-200 flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span>Encrypted Hypnotic Memory Vault</span>
            </h3>
            <p className="text-xs text-slate-400 pt-0.5">
              Confidential local timeline of de-sensitized memories, trauma uncouplings, and cognitive sharpeners.
            </p>
          </div>

          {logs.length > 0 && onClearAllLogs && (
            <button
              onClick={onClearAllLogs}
              className="text-xs text-red-400 hover:text-red-300 font-mono flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <Sparkles className="w-8 h-8 text-cyan-400/50 mx-auto" />
            <div className="text-sm font-cinzel font-bold text-slate-400">
              No Hypnosis Sessions Logged Yet
            </div>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Select any of the 8 Clinical Protocols above and click &ldquo;Begin Hypnotic Induction&rdquo; to experience real-time memory reconsolidation and log your progress.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-2xl bg-black/40 border border-cyan-500/20 hover:border-cyan-400/40 transition flex items-center justify-between flex-wrap gap-4"
              >
                <div className="space-y-1 flex-1 min-w-[220px]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-cinzel font-bold text-cyan-200">
                      {log.targetMemoryTitle}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                      {log.techniqueCategory.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-serif italic">
                    &ldquo;{log.notes}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      {log.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      Depth: {log.tranceDepthReached}
                    </span>
                  </div>
                </div>

                {/* SUDS Delta Badge */}
                <div className="flex items-center gap-4">
                  <div className="text-right font-mono">
                    <div className="text-[11px] text-slate-400">SUDS Distress:</div>
                    <div className="text-xs">
                      <span className="text-red-400 line-through mr-1.5">{log.sudsBefore}/10</span>
                      <span className="text-emerald-400 font-bold text-sm">→ {log.sudsAfter}/10</span>
                    </div>
                  </div>

                  <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono font-bold text-xs">
                    -{log.emotionalChargeReductionPct}% Charge
                  </div>

                  {onDeleteLog && (
                    <button
                      onClick={() => onDeleteLog(log.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
