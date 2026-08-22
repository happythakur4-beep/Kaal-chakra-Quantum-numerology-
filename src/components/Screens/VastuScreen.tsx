import React, { useState } from 'react';
import { ThemeMode } from '../../types';
import { VASTU_16_ZONES, VastuZoneInfo } from '../../utils/astrologyEngine';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import {
  Compass,
  Sparkles,
  Home,
  ShieldAlert,
  ShieldCheck,
  Flame,
  Droplets,
  Wind,
  Sun,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Info,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VastuScreenProps {
  theme: ThemeMode;
}

export const VastuScreen: React.FC<VastuScreenProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [selectedZone, setSelectedZone] = useState<VastuZoneInfo>(VASTU_16_ZONES[0]);
  const [selectedRoom, setSelectedRoom] = useState<string>('Puja Room / Mandir');
  const [roomDirection, setRoomDirection] = useState<string>('NE');
  const [activeTab, setActiveTab] = useState<'compass' | 'room-evaluator' | 'dosha-remedies'>('compass');

  const handleSelectZone = (zone: VastuZoneInfo) => {
    setSelectedZone(zone);
    try {
      cosmicAudio.playFrequency(432);
    } catch {}
  };

  const getEvaluation = (room: string, dir: string) => {
    const zone = VASTU_16_ZONES.find(z => z.code === dir) || VASTU_16_ZONES[0];
    const isIdeal = zone.idealRooms.some(r => r.toLowerCase().includes(room.toLowerCase()) || room.toLowerCase().includes(r.toLowerCase()));
    const isProhibited = zone.strictlyProhibited.some(r => r.toLowerCase().includes(room.toLowerCase()) || room.toLowerCase().includes(r.toLowerCase()));

    if (isIdeal) {
      return {
        status: 'Highly Auspicious (परम शुभ)',
        color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
        icon: ShieldCheck,
        verdict: `${room} situated in ${zone.name} channels optimal ${zone.element} energy, magnifying health, fortune, and peace.`,
      };
    }
    if (isProhibited) {
      return {
        status: 'Severe Vastu Dosha (वास्तु दोष)',
        color: 'text-rose-400 border-rose-500/40 bg-rose-500/10',
        icon: AlertTriangle,
        verdict: `Placing ${room} in ${zone.name} violates elemental laws. ${zone.doshaSymptom} Remedy: ${zone.remedy}`,
      };
    }
    return {
      status: 'Neutral / Acceptable (सामान्य)',
      color: 'text-amber-300 border-amber-500/40 bg-amber-500/10',
      icon: Info,
      verdict: `${room} in ${zone.name} is acceptable. Ensure clean, clutter-free space with proper lighting.`,
    };
  };

  const currentEval = getEvaluation(selectedRoom, roomDirection);

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 py-6 md:py-10">
      
      {/* Top Hero */}
      <div className="text-center mb-8">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 text-xs font-cinzel tracking-wider text-[#d4af37]"
          style={{
            backgroundColor: isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(197, 160, 89, 0.15)',
            borderColor: isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(197, 160, 89, 0.4)',
          }}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Vedic Vastu Purusha Mandala & 16 Energy Zones</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-3xl-gold tracking-wide uppercase mb-2">
          Vastu Shastra Analyzer
        </h1>
        <p className={`text-xs sm:text-sm font-serif max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-[#5a4313]'}`}>
          Align your residence and workplace with the five primordial elements (Pancha Bhoota) and sixteen sacred directional fields.
        </p>
      </div>

      {/* Tabs */}
      <div className="no-print flex items-center gap-2 mb-6 border-b border-[#d4af37]/30 pb-2 overflow-x-auto">
        {[
          { id: 'compass', label: '16 Vastu Zones Compass', icon: Compass },
          { id: 'room-evaluator', label: 'Room Direction Evaluator', icon: Home },
          { id: 'dosha-remedies', label: 'Vastu Dosha & Remedies', icon: ShieldAlert },
        ].map(t => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2 rounded-t-lg font-cinzel text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                active
                  ? 'bg-[#d4af37]/20 border-b-2 border-[#d4af37] text-[#d4af37]'
                  : 'text-gray-400 hover:text-amber-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: 16 ZONES COMPASS */}
      {activeTab === 'compass' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Interactive Direction Selector Grid */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-cinzel font-bold text-[#d4af37] uppercase tracking-wider mb-2">
              Select Directional Zone:
            </div>
            <div className="grid grid-cols-3 gap-2">
              {VASTU_16_ZONES.map(z => {
                const isSelected = selectedZone.code === z.code;
                return (
                  <button
                    key={z.code}
                    onClick={() => handleSelectZone(z)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#d4af37]/25 border-[#d4af37] text-amber-100 shadow-lg scale-[1.02]'
                        : 'bg-black/30 border-white/10 text-gray-400 hover:border-[#d4af37]/40 hover:text-amber-200'
                    }`}
                  >
                    <div className="font-mono text-xs font-bold text-[#d4af37]">{z.code}</div>
                    <div className="font-cinzel text-[11px] font-semibold truncate mt-0.5">{z.sanskrit}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Zone Card */}
          <div className="lg:col-span-7">
            <div
              className="p-6 rounded-2xl border shadow-xl relative overflow-hidden"
              style={{
                backgroundColor: isDark ? 'rgba(18, 18, 28, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.45)',
              }}
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d4af37]/30 pb-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40 font-bold">
                      {selectedZone.code}
                    </span>
                    <h3 className="font-cinzel text-lg font-bold text-amber-100">{selectedZone.name}</h3>
                  </div>
                  <div className="text-xs font-serif text-amber-300/80 mt-0.5">{selectedZone.sanskrit} • {selectedZone.direction}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-cinzel text-gray-400 uppercase">Ruling Deity & Planet</div>
                  <div className="text-xs font-serif font-semibold text-amber-200">{selectedZone.rulingDeity}</div>
                  <div className="text-[11px] text-[#d4af37]">{selectedZone.rulingPlanet}</div>
                </div>
              </div>

              {/* Elements & Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-serif">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-cinzel font-bold mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Ideal Installations</span>
                  </div>
                  <ul className="space-y-1 text-emerald-100/90 text-[11px]">
                    {selectedZone.idealRooms.map((r, i) => (
                      <li key={i}>• {r}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs font-serif">
                  <div className="flex items-center gap-1.5 text-rose-300 font-cinzel font-bold mb-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Strictly Prohibited</span>
                  </div>
                  <ul className="space-y-1 text-rose-100/90 text-[11px]">
                    {selectedZone.strictlyProhibited.map((r, i) => (
                      <li key={i}>• {r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Manifestation & Dosha Remedy */}
              <div className="space-y-3 text-xs font-serif">
                <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                  <span className="font-cinzel font-semibold text-amber-200">Cosmic Blessing: </span>
                  <span className="text-gray-300">{selectedZone.benefits}</span>
                </div>

                <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                  <span className="font-cinzel font-semibold text-rose-300">Dosha Vulnerability: </span>
                  <span className="text-gray-300">{selectedZone.doshaSymptom}</span>
                </div>

                <div className="p-3 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30">
                  <span className="font-cinzel font-semibold text-[#d4af37]">Recommended Vedic Remedy: </span>
                  <span className="text-amber-100">{selectedZone.remedy}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 2: ROOM EVALUATOR */}
      {activeTab === 'room-evaluator' && (
        <div className="space-y-6">
          <div
            className="p-6 rounded-2xl border shadow-xl"
            style={{
              backgroundColor: isDark ? 'rgba(18, 18, 28, 0.85)' : 'rgba(255, 255, 255, 0.95)',
              borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.45)',
            }}
          >
            <h3 className="font-cinzel text-base font-bold text-amber-200 mb-4 border-b border-[#d4af37]/30 pb-2">
              Interactive Room & Direction Alignment Check
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-cinzel font-semibold mb-1 text-[#d4af37]">Select Room / Feature</label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border text-xs font-serif bg-black/30 border-[#d4af37]/40 text-amber-100 outline-none cursor-pointer"
                >
                  <option value="Puja Room / Mandir">Puja Room / Mandir (पूजा घर)</option>
                  <option value="Kitchen (Cooktop facing East)">Kitchen / Cooktop (रसोई घर)</option>
                  <option value="Master Bedroom">Master Bedroom (मुख्य शयनकक्ष)</option>
                  <option value="Main Entrance">Main Entrance (मुख्य द्वार)</option>
                  <option value="Toilet / Septic Tank">Toilet / Septic Tank (शौचालय)</option>
                  <option value="Study Room / Home Office">Study Room / Home Office (अध्ययन कक्ष)</option>
                  <option value="Cash Locker / Safe">Cash Locker / Safe (तिजोरी)</option>
                  <option value="Underground Water Tank">Underground Water Tank (जल संचय)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-cinzel font-semibold mb-1 text-[#d4af37]">Current / Planned Direction</label>
                <select
                  value={roomDirection}
                  onChange={(e) => setRoomDirection(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border text-xs font-serif bg-black/30 border-[#d4af37]/40 text-amber-100 outline-none cursor-pointer"
                >
                  {VASTU_16_ZONES.map(z => (
                    <option key={z.code} value={z.code}>{z.code} - {z.name} ({z.sanskrit})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Verdict Box */}
            <div className={`p-5 rounded-xl border ${currentEval.color} transition-all`}>
              <div className="flex items-center gap-2 mb-2">
                <currentEval.icon className="w-5 h-5" />
                <span className="font-cinzel text-sm font-bold tracking-wide">{currentEval.status}</span>
              </div>
              <p className="text-xs font-serif leading-relaxed">{currentEval.verdict}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DOSHA & REMEDIES */}
      {activeTab === 'dosha-remedies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VASTU_16_ZONES.map(z => (
            <div
              key={z.code}
              className="p-4 rounded-xl border shadow-md flex flex-col justify-between"
              style={{
                backgroundColor: isDark ? 'rgba(18, 18, 28, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                borderColor: isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.45)',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40">
                      {z.code}
                    </span>
                    <span className="font-cinzel text-xs font-bold text-amber-200">{z.name}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-serif">{z.element}</span>
                </div>
                <p className="text-[11px] font-serif text-gray-300 leading-relaxed mb-2">
                  <strong className="text-rose-300">Dosha: </strong>{z.doshaSymptom}
                </p>
              </div>
              <div className="p-2.5 rounded bg-[#d4af37]/10 border border-[#d4af37]/25 text-[11px] font-serif text-amber-100">
                <strong className="text-[#d4af37]">Remedy: </strong>{z.remedy}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
