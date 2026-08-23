// Web Audio API Ambient Cosmic Soundscape & Solfeggio Harmonic Synthesizer

class CosmicAudioEngine {
  private ctx: AudioContext | null = null;
  private isSoundscapeRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private soundscapeGain: GainNode | null = null;
  
  // Drone Oscillators
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private lfoNode: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;

  // Space Filter & Noise Nodes (Cosmic Wind / Solar Nebula)
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseFilter: BiquadFilterNode | null = null;
  private noiseGain: GainNode | null = null;

  // Single chime tone interaction
  private chimeOsc: OscillatorNode | null = null;
  private chimeGain: GainNode | null = null;

  // Listeners for state changes
  private listeners: Set<(isPlaying: boolean) => void> = new Set();

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(callback: (isPlaying: boolean) => void) {
    this.listeners.add(callback);
    callback(this.isSoundscapeRunning);
    return () => this.listeners.delete(callback);
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isSoundscapeRunning));
  }

  /**
   * Starts an ambient, low-frequency meditative cosmic space drone soundscape
   * Root: 108Hz (Sacred Vedic constant) with 432Hz harmonic and 3.5Hz Theta-wave binaural beat
   */
  public startSoundscape() {
    try {
      this.initContext();
      if (!this.ctx) return;

      if (this.isSoundscapeRunning) return;

      const now = this.ctx.currentTime;

      // Master gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.28, now + 2.5); // Gentle fade-in
      this.masterGain.connect(this.ctx.destination);

      this.soundscapeGain = this.ctx.createGain();
      this.soundscapeGain.gain.setValueAtTime(1.0, now);
      this.soundscapeGain.connect(this.masterGain);

      // 1. Deep Sub-Bass Root Drone (54Hz / 108Hz Sub-Harmonic)
      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = 'sine';
      this.subOsc.frequency.setValueAtTime(54, now); // Low meditative rumble
      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.35, now);
      this.subOsc.connect(subGain);
      subGain.connect(this.soundscapeGain);
      this.subOsc.start(now);

      // 2. Primary 108Hz Sacred Drone
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sine';
      this.droneOsc1.frequency.setValueAtTime(108, now);
      const drone1Gain = this.ctx.createGain();
      drone1Gain.gain.setValueAtTime(0.25, now);
      this.droneOsc1.connect(drone1Gain);
      drone1Gain.connect(this.soundscapeGain);
      this.droneOsc1.start(now);

      // 3. Theta Binaural Carrier (108 + 3.8Hz = 111.8Hz) for Deep Meditative Trance
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'triangle';
      this.droneOsc2.frequency.setValueAtTime(111.8, now);
      const drone2Gain = this.ctx.createGain();
      drone2Gain.gain.setValueAtTime(0.12, now);
      this.droneOsc2.connect(drone2Gain);
      drone2Gain.connect(this.soundscapeGain);
      this.droneOsc2.start(now);

      // 4. Subtle 432Hz Cosmic Aura Harmonic
      const auraOsc = this.ctx.createOscillator();
      auraOsc.type = 'sine';
      auraOsc.frequency.setValueAtTime(432, now);
      const auraGain = this.ctx.createGain();
      auraGain.gain.setValueAtTime(0.04, now);
      auraOsc.connect(auraGain);
      auraGain.connect(this.soundscapeGain);
      auraOsc.start(now);

      // 5. LFO for Gentle Ebbing Breathing Motion (0.08Hz cycle ~12s per breath)
      this.lfoNode = this.ctx.createOscillator();
      this.lfoNode.type = 'sine';
      this.lfoNode.frequency.setValueAtTime(0.08, now);
      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(0.08, now);
      this.lfoNode.connect(this.lfoGain.gain);
      this.lfoNode.start(now);

      // 6. Generate Ambient Cosmic Wind / Nebula Stardust Shimmer (Filtered Pink Noise)
      const bufferSize = this.ctx.sampleRate * 4; // 4 seconds looping noise
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
        b6 = white * 0.115926;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      // Resonant Low-Pass Filter simulating space vacuum & nebula dust
      this.noiseFilter = this.ctx.createBiquadFilter();
      this.noiseFilter.type = 'lowpass';
      this.noiseFilter.frequency.setValueAtTime(220, now);
      this.noiseFilter.Q.setValueAtTime(3.5, now);

      this.noiseGain = this.ctx.createGain();
      this.noiseGain.gain.setValueAtTime(0.06, now);

      this.noiseNode.connect(this.noiseFilter);
      this.noiseFilter.connect(this.noiseGain);
      this.noiseGain.connect(this.soundscapeGain);
      this.noiseNode.start(now);

      this.isSoundscapeRunning = true;
      this.notify();
    } catch (e) {
      console.warn('AudioContext prevented by browser autoplay:', e);
    }
  }

  public stopSoundscape() {
    if (!this.ctx || !this.isSoundscapeRunning) return;

    const now = this.ctx.currentTime;
    if (this.masterGain) {
      try {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.00001, now + 1.2);
      } catch {}
    }

    setTimeout(() => {
      try {
        if (this.subOsc) { this.subOsc.stop(); this.subOsc.disconnect(); this.subOsc = null; }
        if (this.droneOsc1) { this.droneOsc1.stop(); this.droneOsc1.disconnect(); this.droneOsc1 = null; }
        if (this.droneOsc2) { this.droneOsc2.stop(); this.droneOsc2.disconnect(); this.droneOsc2 = null; }
        if (this.lfoNode) { this.lfoNode.stop(); this.lfoNode.disconnect(); this.lfoNode = null; }
        if (this.noiseNode) { this.noiseNode.stop(); this.noiseNode.disconnect(); this.noiseNode = null; }
        if (this.masterGain) { this.masterGain.disconnect(); this.masterGain = null; }
      } catch {}
      this.isSoundscapeRunning = false;
      this.notify();
    }, 1250);
  }

  public toggleSoundscape() {
    if (this.isSoundscapeRunning) {
      this.stopSoundscape();
    } else {
      this.startSoundscape();
    }
  }

  public stop() {
    this.stopSoundscape();
  }

  public getIsSoundscapeRunning(): boolean {
    return this.isSoundscapeRunning;
  }

  public getIsPlaying(): boolean {
    return this.isSoundscapeRunning;
  }

  public getCurrentFrequency(): number {
    return 528;
  }

  /**
   * Plays an interactive Solfeggio chime / frequency (e.g. 528Hz Love & DNA repair, 432Hz Cosmic Peace)
   */
  public playFrequency(freq: number = 528) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const chimeGain = this.ctx.createGain();
      chimeGain.gain.setValueAtTime(0.0001, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.00001, now + 2.2);
      chimeGain.connect(this.ctx.destination);

      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.connect(chimeGain);
      osc.start(now);
      osc.stop(now + 2.3);

      // Harmonic chime overtone
      const oscHarmonic = this.ctx.createOscillator();
      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(freq * 1.5, now);
      const harmGain = this.ctx.createGain();
      harmGain.gain.setValueAtTime(0.02, now);
      harmGain.gain.exponentialRampToValueAtTime(0.00001, now + 1.6);
      oscHarmonic.connect(harmGain);
      harmGain.connect(this.ctx.destination);
      oscHarmonic.start(now);
      oscHarmonic.stop(now + 1.7);
    } catch {}
  }

  public playCosmicChime(freq: number = 528) {
    this.playFrequency(freq);
  }

  public playFrequencyTone(freq: number = 432, gainVal: number = 0.15, type: OscillatorType = 'sine') {
    this.playPlanetTone(freq, gainVal, type);
  }

  public playSingularityPulse() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(108, now);
      osc.frequency.exponentialRampToValueAtTime(432, now + 0.4);
      osc.frequency.exponentialRampToValueAtTime(54, now + 1.2);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 1.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.25);
    } catch {}
  }

  /**
   * Plays a relativistic black hole gravitational lensing & spacetime warp sound effect
   */
  public playBlackHoleWarp() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      
      // 1. Deep Sub-Singularity Sweep (60Hz -> 24Hz -> 432Hz)
      const warpOsc = this.ctx.createOscillator();
      warpOsc.type = 'sawtooth';
      warpOsc.frequency.setValueAtTime(80, now);
      warpOsc.frequency.exponentialRampToValueAtTime(28, now + 1.2);
      warpOsc.frequency.exponentialRampToValueAtTime(432, now + 2.8);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, now);
      filter.frequency.exponentialRampToValueAtTime(60, now + 1.0);
      filter.frequency.exponentialRampToValueAtTime(1800, now + 2.6);
      filter.Q.setValueAtTime(8, now);

      const warpGain = this.ctx.createGain();
      warpGain.gain.setValueAtTime(0.0001, now);
      warpGain.gain.exponentialRampToValueAtTime(0.25, now + 0.3);
      warpGain.gain.setValueAtTime(0.25, now + 1.8);
      warpGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      warpOsc.connect(filter);
      filter.connect(warpGain);
      warpGain.connect(this.ctx.destination);

      warpOsc.start(now);
      warpOsc.stop(now + 3.3);

      // 2. Cosmic Singularity Chords (369Hz / 528Hz / 963Hz harmonic chord arrival)
      setTimeout(() => {
        try {
          if (!this.ctx) return;
          const chordNow = this.ctx.currentTime;
          [396, 528, 639, 963].forEach((f, idx) => {
            if (!this.ctx) return;
            const cOsc = this.ctx.createOscillator();
            cOsc.type = 'sine';
            cOsc.frequency.setValueAtTime(f, chordNow);

            const cGain = this.ctx.createGain();
            cGain.gain.setValueAtTime(0.0001, chordNow);
            cGain.gain.exponentialRampToValueAtTime(0.06 / (idx + 1), chordNow + 0.1);
            cGain.gain.exponentialRampToValueAtTime(0.00001, chordNow + 2.5);

            cOsc.connect(cGain);
            cGain.connect(this.ctx.destination);
            cOsc.start(chordNow);
            cOsc.stop(chordNow + 2.6);
          });
        } catch {}
      }, 2000);

    } catch (err) {
      console.warn('Black hole warp audio error:', err);
    }
  }

  /**
   * Continuous Planet Tone player
   */
  private planetOsc: OscillatorNode | null = null;
  private planetGain: GainNode | null = null;

  public playPlanetTone(freq: number = 432, gainVal: number = 0.15, type: OscillatorType = 'sine') {
    try {
      this.initContext();
      if (!this.ctx) return;
      this.stopFrequencyTone();

      const now = this.ctx.currentTime;
      this.planetGain = this.ctx.createGain();
      this.planetGain.gain.setValueAtTime(0.0001, now);
      this.planetGain.gain.exponentialRampToValueAtTime(gainVal, now + 0.15);
      this.planetGain.connect(this.ctx.destination);

      this.planetOsc = this.ctx.createOscillator();
      this.planetOsc.type = type;
      this.planetOsc.frequency.setValueAtTime(freq, now);
      this.planetOsc.connect(this.planetGain);
      this.planetOsc.start(now);
    } catch {}
  }

  public stopFrequencyTone() {
    try {
      if (this.planetGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.planetGain.gain.exponentialRampToValueAtTime(0.00001, now + 0.1);
        setTimeout(() => {
          if (this.planetOsc) {
            try {
              this.planetOsc.stop();
              this.planetOsc.disconnect();
            } catch {}
            this.planetOsc = null;
          }
          if (this.planetGain) {
            try {
              this.planetGain.disconnect();
            } catch {}
            this.planetGain = null;
          }
        }, 120);
      }
    } catch {}
  }

  public play369Chime(freq: number = 528) {
    this.playTeslaFrequency(freq, 1.8);
  }

  /**
   * Plays multi-frequency harmonic sound chord (e.g. Solfeggio trinity, Abundance chord, Sleep chord)
   */
  public playChord(frequencies: number[], durationSec: number = 4) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const count = Math.max(1, frequencies.length);

      frequencies.forEach((f, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.12 / count, now + 0.15);
        gain.gain.setValueAtTime(0.12 / count, now + durationSec - 0.6);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + durationSec);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + durationSec + 0.1);
      });
    } catch {}
  }

  /**
   * Deep Sleep Chord: Delta/Theta 3.9Hz wave over 432Hz harmonic carrier
   */
  public playDeepSleepChord(durationSec: number = 5) {
    this.playChord([432, 435.9, 108, 216], durationSec);
  }

  /**
   * Limitless Abundance Chord: 528Hz + 888Hz + 396Hz prosperity harmonic stack
   */
  public playLimitlessAbundanceChord(durationSec: number = 5) {
    this.playChord([528, 888, 396, 777], durationSec);
  }

  /**
   * Expanded Awareness Chord: 852Hz + 963Hz + 432Hz pineal DMT resonance
   */
  public playExpandedAwarenessChord(durationSec: number = 5) {
    this.playChord([852, 963, 432, 108], durationSec);
  }

  /**
   * Schumann Resonance: 7.83Hz Earth Heartbeat pulsation modulated on 136.1Hz Om carrier
   */
  public playSchumannResonance(durationSec: number = 5) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Carrier 136.10 Hz Earth frequency
      const carrier = this.ctx.createOscillator();
      carrier.type = 'sine';
      carrier.frequency.setValueAtTime(136.1, now);

      // Tremolo / pulse at 7.83Hz
      const lfo = this.ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(7.83, now);

      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(0.05, now);
      lfo.connect(lfoGain.gain);

      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(0.14, now + 0.2);
      master.gain.setValueAtTime(0.14, now + durationSec - 0.5);
      master.gain.exponentialRampToValueAtTime(0.00001, now + durationSec);

      carrier.connect(master);
      master.connect(this.ctx.destination);

      lfo.start(now);
      carrier.start(now);
      lfo.stop(now + durationSec + 0.1);
      carrier.stop(now + durationSec + 0.1);
    } catch {}
  }

  /**
   * Plays a sustained Tesla solfeggio frequency with rich harmonics
   */
  public playTeslaFrequency(freq: number = 369, durationSec: number = 3) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.1);
      gain.gain.setValueAtTime(0.12, now + durationSec - 0.5);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + durationSec);
      gain.connect(this.ctx.destination);

      // Fundamental sine
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);
      osc1.connect(gain);
      osc1.start(now);
      osc1.stop(now + durationSec + 0.1);

      // Third Harmonic (representing 3)
      const osc3 = this.ctx.createOscillator();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(freq * 1.5, now);
      const gain3 = this.ctx.createGain();
      gain3.gain.setValueAtTime(0.02, now);
      gain3.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);
      osc3.connect(gain3);
      gain3.connect(this.ctx.destination);
      osc3.start(now);
      osc3.stop(now + durationSec);
    } catch {}
  }

  /**
   * Cyber Keystroke Audio Chirp
   */
  public playCyberKeystroke() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      const f = 1600 + Math.random() * 800;
      osc.frequency.setValueAtTime(f, now);
      osc.frequency.exponentialRampToValueAtTime(f * 0.5, now + 0.04);
      
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  /**
   * Cyber Scanner / Lock-on Sound
   */
  public playCyberScan() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(1760, now + 0.15);
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(5, now);
      
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.18);
    } catch {}
  }

  /**
   * Cyber Warp / Hyperspace Boom
   */
  public playCyberWarp() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      // Pitch drop sub
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.8);
      
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.9);
    } catch {}
  }

  /**
   * Cyber Matrix Glitch / Pulse
   */
  public playCyberMatrixPulse() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1760, now + 0.03);
      osc.frequency.setValueAtTime(1320, now + 0.06);
      osc.frequency.setValueAtTime(2640, now + 0.09);
      
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.13);
    } catch {}
  }
}

export const cosmicAudio = new CosmicAudioEngine();
