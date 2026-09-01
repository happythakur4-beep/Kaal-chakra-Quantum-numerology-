import React, { useState } from 'react';
import { ThemeMode, MemoryPalaceLociItem } from '../../types';
import { INITIAL_MEMORY_PALACE_ROOMS } from '../../data/memoryHypnosisData';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Zap,
  Plus,
  Trash2,
  CheckCircle2,
  HelpCircle,
  Eye,
  EyeOff,
  Lightbulb,
  Layers,
  Award,
  BookOpen
} from 'lucide-react';

interface MemoryPalaceBuilderProps {
  theme: ThemeMode;
}

export const MemoryPalaceBuilder: React.FC<MemoryPalaceBuilderProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const [rooms, setRooms] = useState<MemoryPalaceLociItem[]>(INITIAL_MEMORY_PALACE_ROOMS);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number>(0);
  const [showRecallTest, setShowRecallTest] = useState<boolean>(false);
  const [isAnswersHidden, setIsAnswersHidden] = useState<boolean>(false);

  // New Locus Form
  const [isAddingLocus, setIsAddingLocus] = useState<boolean>(false);
  const [newRoomName, setNewRoomName] = useState<string>('');
  const [newAnchorObject, setNewAnchorObject] = useState<string>('');
  const [newConceptTitle, setNewConceptTitle] = useState<string>('');
  const [newMemoryKey, setNewMemoryKey] = useState<string>('');
  const [newImageryNote, setNewImageryNote] = useState<string>('');

  const activeLocus = rooms[selectedRoomIndex] || rooms[0];

  // Trigger Lightning Recall on Locus
  const handleTestLocus = (index: number) => {
    cosmicAudio.playFrequencyTone(528, 0.2, 'sine');
    confetti({ particleCount: 20, spread: 50 });

    setRooms((prev) =>
      prev.map((item, idx) =>
        idx === index
          ? { ...item, lightningActive: true, recallTested: true }
          : item
      )
    );
  };

  // Add new Custom Locus
  const handleAddLocus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim() || !newConceptTitle.trim() || !newMemoryKey.trim()) return;

    const newLocus: MemoryPalaceLociItem = {
      id: `locus_${Date.now()}`,
      roomName: newRoomName.trim(),
      anchorObject: newAnchorObject.trim() || 'Illuminated Crystal Pedestal',
      conceptTitle: newConceptTitle.trim(),
      memoryKey: newMemoryKey.trim(),
      vividImageryNote:
        newImageryNote.trim() ||
        'Vivid electric sparks leaping from the object, etching the concept into your subconscious mind.',
      lightningActive: true,
      recallTested: false
    };

    setRooms((prev) => [...prev, newLocus]);
    setSelectedRoomIndex(rooms.length);
    setIsAddingLocus(false);
    setNewRoomName('');
    setNewAnchorObject('');
    setNewConceptTitle('');
    setNewMemoryKey('');
    setNewImageryNote('');
    cosmicAudio.playFrequencyTone(639, 0.25, 'sine');
  };

  const handleDeleteLocus = (id: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
    if (selectedRoomIndex >= rooms.length - 1) {
      setSelectedRoomIndex(Math.max(0, rooms.length - 2));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden backdrop-blur-xl ${
          isDark
            ? 'bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border-amber-500/30 text-white shadow-2xl'
            : 'bg-white border-amber-200 text-slate-900 shadow-xl'
        }`}
      >
        <div className="flex items-start justify-between flex-wrap gap-4 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>THE 3D ROMAN MEMORY PALACE (METHOD OF LOCI)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300">
              Hypnotic Memory Palace & Loci Vault
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Spatial memory in the <strong>Hippocampus (Place Cells & Grid Cells)</strong> is immune to normal forgetting. By anchoring complex study topics, formulas, or speeches to vivid 3D objects with electric lightning discharges, you achieve near-limitless retention.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAnswersHidden((prev) => !prev)}
              className="px-4 py-2 rounded-xl bg-slate-900/80 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2 hover:bg-amber-500/20 transition cursor-pointer"
            >
              {isAnswersHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{isAnswersHidden ? 'Show Answers' : 'Blind Recall Mode'}</span>
            </button>

            <button
              onClick={() => setIsAddingLocus(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-cinzel font-bold flex items-center gap-1.5 cursor-pointer shadow-lg transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Locus</span>
            </button>
          </div>
        </div>
      </div>

      {/* Memory Palace Room Navigation Bar */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
        {rooms.map((room, idx) => (
          <button
            key={room.id}
            onClick={() => {
              setSelectedRoomIndex(idx);
              cosmicAudio.playFrequencyTone(432 + idx * 40, 0.1, 'sine');
            }}
            className={`px-4 py-3 rounded-2xl border text-left min-w-[200px] transition-all cursor-pointer ${
              selectedRoomIndex === idx
                ? 'bg-amber-500 text-black border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-102 font-bold'
                : isDark
                ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-amber-500/40'
                : 'bg-white border-slate-200 text-slate-800 hover:border-amber-400'
            }`}
          >
            <div className="text-[10px] font-mono uppercase tracking-wider opacity-80">
              Locus {idx + 1}
            </div>
            <div className="text-xs font-cinzel font-bold truncate">
              {room.roomName}
            </div>
            <div className="text-[10px] opacity-70 truncate pt-0.5">
              {room.conceptTitle}
            </div>
          </button>
        ))}
      </div>

      {/* Active Locus Interactive 3D Chamber Card */}
      {activeLocus && (
        <div
          className={`p-6 sm:p-8 rounded-3xl border space-y-6 relative overflow-hidden backdrop-blur-xl ${
            isDark
              ? 'bg-[#0a0e1c]/95 border-amber-500/40 text-slate-100 shadow-2xl'
              : 'bg-white border-amber-200 text-slate-900 shadow-xl'
          }`}
        >
          {/* Top Locus Header */}
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  ROOM #{selectedRoomIndex + 1}
                </span>
                <span className="text-xs font-mono text-cyan-300">
                  Anchor: {activeLocus.anchorObject}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-amber-200">
                {activeLocus.roomName}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleTestLocus(selectedRoomIndex)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-black font-cinzel font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg hover:scale-105 transition"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Test Lightning Recall</span>
              </button>

              {rooms.length > 1 && (
                <button
                  onClick={() => handleDeleteLocus(activeLocus.id)}
                  title="Delete Locus"
                  className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-400/30 text-xs transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Locus Visual Anchor & Mnemonic Core */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Concept Title & Secret Memory Key */}
            <div className="p-5 rounded-2xl bg-black/40 border border-amber-500/20 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-xs font-mono text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Target Memory / Formula / Fact:</span>
                </div>
                <div className="text-base sm:text-lg font-cinzel font-bold text-white">
                  {activeLocus.conceptTitle}
                </div>

                <div className="pt-2">
                  <div className="text-[11px] font-mono text-slate-400">Encoded Answer / Detail:</div>
                  <div
                    className={`text-sm sm:text-base font-mono p-3 rounded-xl border mt-1 transition-all ${
                      isAnswersHidden
                        ? 'bg-slate-950 border-slate-800 text-slate-600 blur-sm select-none'
                        : 'bg-amber-950/40 border-amber-500/40 text-amber-300 font-bold'
                    }`}
                  >
                    {isAnswersHidden ? '••••••••••••••••••••••••' : activeLocus.memoryKey}
                  </div>
                </div>
              </div>

              {/* Recall Status Pill */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-800 text-xs">
                {activeLocus.recallTested ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>LTP Synaptic Consolidation Active</span>
                  </span>
                ) : (
                  <span className="text-slate-400 flex items-center gap-1 font-mono">
                    <HelpCircle className="w-4 h-4" />
                    <span>Not yet tested in current session</span>
                  </span>
                )}
              </div>
            </div>

            {/* Hypnotic Vivid Sensory Story (The Mnemonic Engine) */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-950 to-purple-950/40 border border-indigo-500/30 space-y-3">
              <div className="text-xs font-mono text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-indigo-400" />
                <span>Hypnotic Vivid Sensory Imagery (Subconscious Code):</span>
              </div>
              <p className="text-xs sm:text-sm font-serif italic text-slate-200 leading-relaxed">
                &ldquo;{activeLocus.vividImageryNote}&rdquo;
              </p>
              <div className="text-[11px] text-slate-400 leading-relaxed font-sans pt-2 border-t border-indigo-500/20">
                💡 <strong>Neuro-Tip:</strong> The weirder, louder, and more electric your mental image is, the faster the amygdala and hippocampus permanently bind it to your long-term memory.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Locus Modal / Inline Drawer */}
      {isAddingLocus && (
        <form
          onSubmit={handleAddLocus}
          className="p-6 rounded-3xl bg-slate-900 border border-amber-500/40 space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
            <h4 className="font-cinzel font-bold text-amber-300 text-sm sm:text-base">
              Add New Memory Palace Chamber
            </h4>
            <button
              type="button"
              onClick={() => setIsAddingLocus(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-mono text-slate-300">Room / Location Name:</label>
              <input
                type="text"
                required
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="e.g. The Alchemy Lab, The Rooftop Helipad..."
                className="w-full p-2.5 rounded-xl bg-black border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-slate-300">Anchor Object (Pedestal / Landmark):</label>
              <input
                type="text"
                value={newAnchorObject}
                onChange={(e) => setNewAnchorObject(e.target.value)}
                placeholder="e.g. Glowing Golden Anvil, Hovering Crystal Skull..."
                className="w-full p-2.5 rounded-xl bg-black border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-slate-300">Concept / Topic Title:</label>
              <input
                type="text"
                required
                value={newConceptTitle}
                onChange={(e) => setNewConceptTitle(e.target.value)}
                placeholder="e.g. Periodic Table Elements, Constitutional Article 21..."
                className="w-full p-2.5 rounded-xl bg-black border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-slate-300">Memory Key / Formula / Detail:</label>
              <input
                type="text"
                required
                value={newMemoryKey}
                onChange={(e) => setNewMemoryKey(e.target.value)}
                placeholder="e.g. Right to Life and Personal Liberty..."
                className="w-full p-2.5 rounded-xl bg-black border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="font-mono text-slate-300">Vivid Mnemonic Story (Electric Sensory Action):</label>
              <textarea
                rows={2}
                value={newImageryNote}
                onChange={(e) => setNewImageryNote(e.target.value)}
                placeholder="e.g. A bolt of electric violet lightning strikes the anvil, forging glowing letters of Article 21 into pure steel..."
                className="w-full p-2.5 rounded-xl bg-black border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingLocus(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-cinzel font-bold text-xs shadow-lg cursor-pointer"
            >
              Save to Palace
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
