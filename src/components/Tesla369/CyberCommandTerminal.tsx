import React, { useState, useRef, useEffect } from 'react';
import { cosmicAudio } from '../../utils/audioSynthesizer';
import { CelestialBodyData } from '../../types';
import { Terminal, Send, Zap, Radio, Shield, Cpu, Activity, Sparkles, CheckCircle2 } from 'lucide-react';

interface CyberCommandTerminalProps {
  onSelectPlanet?: (planetName: string) => void;
  onSelectTab?: (tabId: string) => void;
  allBodies?: CelestialBodyData[];
  onToggleVortexMath?: () => void;
}

interface LogEntry {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  text: string;
  timestamp: string;
}

export const CyberCommandTerminal: React.FC<CyberCommandTerminalProps> = ({
  onSelectPlanet,
  onSelectTab,
  allBodies = [],
  onToggleVortexMath,
}) => {
  const [command, setCommand] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'TESLA 3-6-9 QUANTUM NEXUS KERNEL INITIALIZED [v9.3.6-CYBER]',
      timestamp: '00:00:01',
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'ETHERIC CARRIER LOCK: 432 Hz // SCHUMANN PULSE: 7.83 Hz // QUBIT ENTROPY: 0.003',
      timestamp: '00:00:02',
    },
    {
      id: 'init-3',
      type: 'output',
      text: 'Type "help" to view high-tech quantum cyber commands or click quick macros below.',
      timestamp: '00:00:03',
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (type: LogEntry['type'], text: string) => {
    const d = new Date();
    const ts = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
    setLogs((prev) => [...prev, { id: Math.random().toString(), type, text, timestamp: ts }]);
  };

  const handleExecuteCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    cosmicAudio.playCyberKeystroke();
    addLog('input', `> ${cmd}`);

    const parts = cmd.toLowerCase().split(' ');
    const mainCmd = parts[0];
    const arg = parts.slice(1).join(' ');

    switch (mainCmd) {
      case 'help':
        addLog(
          'output',
          `AVAILABLE CYBERNETIC COMMANDS:
• help                      - Display system command catalog
• scan <planet>             - Lock telemetry onto celestial body (e.g. "scan earth", "scan mars", "scan jupiter")
• warp <destination>        - Engage relativistic space warp drive
• tune <frequency_hz>       - Transduce frequency in real-time Web Audio (e.g. "tune 528", "tune 432", "tune 963")
• tesla 369                 - Decrypt Nikola Tesla 3-6-9 non-physical vortex key
• decalcify                 - Execute Pineal DMT decalcification & 852Hz/963Hz frequency protocol
• overclock                 - Synchronize 7-Chakra biofield harmonic array
• schumann                  - Lock onto 7.83 Hz Earth electromagnetic heartbeat
• wealth                    - Activate 888 Hz / 777 Hz prosperity resonance matrix
• vault                     - Access Tune & Thrive classified frequency vault
• clear                     - Flush terminal buffer`
        );
        break;

      case 'scan':
        if (!arg) {
          addLog('error', 'SYNTAX ERROR: Specify target planet (e.g. "scan mars", "scan saturn", "scan earth")');
        } else {
          const match = allBodies.find((b) => b.name.toLowerCase().includes(arg) || b.id.toLowerCase().includes(arg));
          if (match) {
            addLog('success', `[TARGET ACQUIRED] Locking onto ${match.name.toUpperCase()} (Freq: ${match.vibrationalFrequencyHz} Hz)`);
            cosmicAudio.playCyberScan();
            if (onSelectPlanet) onSelectPlanet(match.id);
            if (onSelectTab) onSelectTab('planets');
          } else {
            addLog('error', `TARGET NOT FOUND: "${arg}". Try: sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune.`);
          }
        }
        break;

      case 'warp':
        addLog('success', `WARP COILS CHARGED. ENGAGING RELATIVISTIC HYPERSPACE JUMP TO ${arg.toUpperCase() || 'DEEP SECTOR'}...`);
        cosmicAudio.playCyberWarp();
        if (onSelectTab) onSelectTab('galaxy');
        break;

      case 'tune':
        const freqNum = parseFloat(arg);
        if (isNaN(freqNum) || freqNum <= 0 || freqNum > 20000) {
          addLog('error', 'INVALID FREQUENCY. Provide value between 1 and 20000 Hz (e.g. "tune 528")');
        } else {
          addLog('success', `TRANSDUCING HARMONIC OSCILLATION AT ${freqNum} HZ...`);
          cosmicAudio.playTeslaFrequency(freqNum, 4);
        }
        break;

      case 'tesla':
      case '369':
        addLog(
          'success',
          `[3-6-9 VORTEX DECRYPTED]
"If you only knew the magnificence of the 3, 6 and 9, then you would have the key to the universe."
• Doubling Circuit (1-2-4-8-7-5) = Physical Matter/3D Space
• 3 & 6 = Bilateral Magnetic Poles (Prana/Apana)
• 9 = The Source Singularity (Non-Physical Etheric Master Point)`
        );
        cosmicAudio.playTeslaFrequency(369, 4);
        if (onSelectTab) onSelectTab('vortex');
        break;

      case 'vortex-hud':
      case 'overlay':
        addLog('success', '[D3.js VORTEX MATH HUD ACTIVATED] Overlaying interactive sacred geometry vectors.');
        cosmicAudio.playCyberScan();
        if (onToggleVortexMath) onToggleVortexMath();
        break;

      case 'decalcify':
      case 'pineal':
        addLog(
          'success',
          `[PINEAL DECALCIFICATION PROTOCOL ACTIVATED]
• Piezoelectric calcite microcrystals stimulated
• 852 Hz (Third Eye) + 963 Hz (Crown) + 432 Hz carrier engaged
• DMT biophoton emission resonance synchronized`
        );
        cosmicAudio.playExpandedAwarenessChord(4.5);
        if (onSelectTab) onSelectTab('tune-thrive');
        break;

      case 'overclock':
      case 'chakra':
        addLog(
          'success',
          `[7-CHAKRA BIOFIELD OVERCLOCK COMPLETE]
• Root (396Hz) -> Sacral (417Hz) -> Solar (528Hz) -> Heart (639Hz) -> Throat (741Hz) -> Third Eye (852Hz) -> Crown (963Hz)
• Endocrine bio-current calibrated to 100% coherence.`
        );
        cosmicAudio.playChord([396, 528, 639, 963], 4);
        if (onSelectTab) onSelectTab('chakras');
        break;

      case 'schumann':
        addLog('success', 'LOCKING 7.83 HZ SCHUMANN ATMOSPHERIC RESONANCE (EARTH BRAINWAVE)...');
        cosmicAudio.playSchumannResonance(5);
        break;

      case 'wealth':
      case 'abundance':
        addLog('success', 'ENGAGING 888 HZ / 777 HZ PROSPERITY HARMONIC QUANTUM ATTRACTOR...');
        cosmicAudio.playLimitlessAbundanceChord(5);
        break;

      case 'vault':
        addLog('success', 'OPENING TUNE & THRIVE FREQUENCY ARCHIVES...');
        if (onSelectTab) onSelectTab('tune-thrive');
        break;

      case 'clear':
      case 'cls':
        setLogs([]);
        break;

      default:
        addLog('error', `UNKNOWN COMMAND: "${cmd}". Type "help" for syntax instructions.`);
        break;
    }

    setCommand('');
  };

  return (
    <div className="w-full bg-[#030712] border border-cyan-500/30 rounded-2xl overflow-hidden font-mono text-xs flex flex-col shadow-[0_0_40px_rgba(0,243,255,0.1)] select-none">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#050b18] border-b border-cyan-500/20 text-cyan-300">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-bold tracking-wider text-cyan-100">
            TESLA-369 :: QUANTUM HACKING CONSOLE
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-cyan-500">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>SHELL: READY</span>
        </div>
      </div>

      {/* Quick Macro Buttons */}
      <div className="flex items-center gap-2 p-2 bg-[#020617] border-b border-cyan-900/40 overflow-x-auto no-scrollbar">
        <span className="text-[10px] uppercase text-cyan-500 font-bold px-1">QUICK MACROS:</span>
        {[
          { label: 'SCAN EARTH', cmd: 'scan earth' },
          { label: 'SCAN MARS', cmd: 'scan mars' },
          { label: 'SCAN SATURN', cmd: 'scan saturn' },
          { label: 'TESLA 3-6-9', cmd: 'tesla 369' },
          { label: 'DECALCIFY PINEAL', cmd: 'decalcify' },
          { label: '7-CHAKRA OVERCLOCK', cmd: 'overclock' },
          { label: 'SCHUMANN 7.83Hz', cmd: 'schumann' },
          { label: '888Hz WEALTH', cmd: 'wealth' },
          { label: 'WARP JUMP', cmd: 'warp andromeda' },
        ].map((macro) => (
          <button
            key={macro.cmd}
            onClick={() => handleExecuteCommand(macro.cmd)}
            className="px-2 py-1 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/40 hover:border-cyan-400 text-cyan-300 hover:text-cyan-100 rounded text-[10px] font-bold tracking-wider transition-all whitespace-nowrap"
          >
            {macro.label}
          </button>
        ))}
      </div>

      {/* Terminal Log Stream */}
      <div className="h-64 sm:h-80 overflow-y-auto p-3.5 space-y-2 bg-[#010409] text-cyan-200 leading-relaxed font-mono">
        {logs.map((log) => {
          let textClass = 'text-cyan-300';
          if (log.type === 'input') textClass = 'text-emerald-400 font-bold';
          if (log.type === 'error') textClass = 'text-rose-400 font-bold';
          if (log.type === 'success') textClass = 'text-amber-300';
          if (log.type === 'system') textClass = 'text-cyan-500/80';

          return (
            <div key={log.id} className="flex gap-2">
              <span className="text-cyan-700 select-none text-[10px]">[{log.timestamp}]</span>
              <pre className={`whitespace-pre-wrap flex-1 ${textClass}`}>{log.text}</pre>
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Prompt */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleExecuteCommand(command);
        }}
        className="flex items-center gap-2 p-2.5 bg-[#050b18] border-t border-cyan-500/20"
      >
        <span className="text-emerald-400 font-bold pl-2 select-none">&gt;</span>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter cyber command (e.g. 'scan mars', 'tune 528', 'tesla 369', 'help')..."
          className="flex-1 bg-transparent border-none outline-none text-cyan-100 placeholder-cyan-700 text-xs font-mono"
          autoFocus
        />
        <button
          type="submit"
          className="flex items-center gap-1 px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-black font-bold rounded text-xs tracking-wider transition-all"
        >
          <Send className="w-3 h-3" />
          <span>EXEC</span>
        </button>
      </form>
    </div>
  );
};
