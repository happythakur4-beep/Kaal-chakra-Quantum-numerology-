import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cosmicAudio } from '../../utils/audioSynthesizer';

interface TeslaIntroAnimationProps {
  onComplete: () => void;
}

export const TeslaIntroAnimation: React.FC<TeslaIntroAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'charging' | 'expanding' | 'complete'>('charging');

  useEffect(() => {
    // Play an entry sound
    cosmicAudio.playCyberScan();
    
    // Sequence the animation phases
    const t1 = setTimeout(() => {
      setPhase('expanding');
      cosmicAudio.playCyberWarp();
    }, 3500);

    const t2 = setTimeout(() => {
      setPhase('complete');
    }, 4500);

    const t3 = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)', scale: 2 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] bg-[#02040a] flex items-center justify-center overflow-hidden font-mono"
        >
          {/* Starfield Background */}
          <div className="absolute inset-0 opacity-40">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-cyan-100"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  opacity: Math.random(),
                  animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`
                }}
              />
            ))}
          </div>

          <motion.div 
            className="relative flex items-center justify-center"
            animate={{ 
              scale: phase === 'expanding' ? 20 : 1,
              opacity: phase === 'expanding' ? 0 : 1
            }}
            transition={{ duration: 1.2, ease: "anticipate" }}
          >
            {/* Golden Core */}
            <div className="absolute w-16 h-16 rounded-full bg-white shadow-[0_0_60px_20px_rgba(251,191,36,0.9),_inset_0_0_20px_rgba(255,255,255,1)] animate-pulse z-10 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-yellow-100 blur-[2px] opacity-90" />
              <div className="absolute inset-0 rounded-full bg-amber-500 blur-[8px] mix-blend-screen opacity-70 animate-ping" style={{ animationDuration: '2s' }} />
            </div>

            {/* Atomic Orbits (Cyan) */}
            <div className="absolute flex items-center justify-center animate-spin" style={{ animationDuration: '30s', animationTimingFunction: 'linear' }}>
              {[0, 45, 90, 135].map((rot, i) => (
                <div 
                  key={rot} 
                  className="absolute flex items-center justify-center"
                  style={{ transform: `rotate(${rot}deg)` }}
                >
                  {/* The flattened ellipse ring */}
                  <div className="absolute w-80 h-80 border-2 border-cyan-400/90 rounded-full shadow-[0_0_20px_rgba(0,243,255,0.8),_inset_0_0_15px_rgba(0,243,255,0.4)] opacity-90"
                       style={{ transform: 'scaleY(0.3)' }} 
                  />
                  
                  {/* The invisible spinning circle for the particle */}
                  <div 
                    className="absolute w-80 h-80 rounded-full"
                    style={{ 
                      animation: `spin-particle ${2.5 + i * 0.5}s infinite linear` 
                    }}
                  >
                    <div className="absolute top-[-6px] left-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_20px_5px_rgba(0,243,255,1)]" style={{ transform: 'translateX(-50%)' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Glowing Outer Sphere Lines */}
            <div className="absolute w-[360px] h-[360px] rounded-full border-[1.5px] border-cyan-500/20 border-dashed animate-spin" style={{ animationDuration: '30s' }} />
            <div className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/10 animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />

            {/* High-tech HUD text around it */}
            <motion.div 
              className="absolute -bottom-32 text-cyan-300 text-xs tracking-[0.3em] font-bold text-center w-80 whitespace-nowrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              INITIALIZING TESLA 3-6-9 NEXUS<br/>
              <span className="text-amber-400 text-[10px] tracking-widest mt-2 block">
                ETHERIC RESONANCE: {phase === 'charging' ? 'LOCKING...' : 'ACHIEVED'}
              </span>
            </motion.div>
          </motion.div>

          <style>{`
            @keyframes twinkle {
              from { opacity: 0.2; transform: scale(0.8); }
              to { opacity: 1; transform: scale(1.2); }
            }
            @keyframes spin-particle {
              0% { transform: scaleY(0.3) rotate(0deg); }
              100% { transform: scaleY(0.3) rotate(360deg); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
