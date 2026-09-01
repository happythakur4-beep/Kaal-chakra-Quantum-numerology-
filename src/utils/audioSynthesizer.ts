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

  // Mind Healing Solfeggio Continuous Generator
  private healingOsc1: OscillatorNode | null = null;
  private healingOsc2: OscillatorNode | null = null;
  private healingSubOsc: OscillatorNode | null = null;
  private healingGain: GainNode | null = null;
  private isHealingRunning: boolean = false;
  private currentHealingFreq: number = 528;

  // Listeners for state changes
  private listeners: Set<(isPlaying: boolean) => void> = new Set();
  private healingListeners: Set<(isHealing: boolean, freq: number) => void> = new Set();

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch((err) => {
        console.warn('AudioContext resume was prevented:', err);
      });
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

  public playTone(freq: number = 432, duration: number = 0.1) {
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
   * High-voltage Tesla Plasma Discharge Spark & Zap
   */
  public playCyberZap() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      const startF = 3500 + Math.random() * 1500;
      osc.frequency.setValueAtTime(startF, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(800, now);
      
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.09);
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

  /**
   * Cyber Success Chime (Major Triad Ascending)
   */
  public playCyberSuccess() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = [528, 660, 792, 1056];
      freqs.forEach((f, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.04);
        gain.gain.setValueAtTime(0.04, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.26);
      });
    } catch {}
  }

  /**
   * Continuous Solfeggio Cellular Healing Tone with Alpha/Theta Binaural Beat
   * @param freq Target Solfeggio frequency (e.g. 528, 432, 174, 741, 852)
   * @param binauralDelta Delta for brainwave induction (default 4.0 Hz Theta for deep healing)
   */
  public startHealingFrequency(freq: number = 528, binauralDelta: number = 4.0) {
    try {
      this.initContext();
      if (!this.ctx) return;

      // Stop any existing healing tone first
      this.stopHealingFrequency(false);

      this.currentHealingFreq = freq;
      this.isHealingRunning = true;
      const now = this.ctx.currentTime;

      this.healingGain = this.ctx.createGain();
      this.healingGain.gain.setValueAtTime(0.0001, now);
      this.healingGain.gain.exponentialRampToValueAtTime(0.18, now + 1.2);
      this.healingGain.connect(this.ctx.destination);

      // Primary Solfeggio Pure Sine
      this.healingOsc1 = this.ctx.createOscillator();
      this.healingOsc1.type = 'sine';
      this.healingOsc1.frequency.setValueAtTime(freq, now);
      this.healingOsc1.connect(this.healingGain);
      this.healingOsc1.start(now);

      // Binaural Carrier (Left/Right harmonic wave offset by Theta delta)
      this.healingOsc2 = this.ctx.createOscillator();
      this.healingOsc2.type = 'sine';
      this.healingOsc2.frequency.setValueAtTime(freq + binauralDelta, now);
      
      const osc2Gain = this.ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.5, now);
      this.healingOsc2.connect(osc2Gain);
      osc2Gain.connect(this.healingGain);
      this.healingOsc2.start(now);

      // Deep grounding sub-octave (freq / 4 or 54Hz)
      const subFreq = Math.max(36, Math.min(108, freq / 4));
      this.healingSubOsc = this.ctx.createOscillator();
      this.healingSubOsc.type = 'triangle';
      this.healingSubOsc.frequency.setValueAtTime(subFreq, now);

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.08, now);
      this.healingSubOsc.connect(subGain);
      subGain.connect(this.healingGain);
      this.healingSubOsc.start(now);

      this.notifyHealing();
    } catch (e) {
      console.warn('Could not start healing frequency:', e);
    }
  }

  /**
   * Stops continuous healing frequency
   */
  public stopHealingFrequency(notify: boolean = true) {
    try {
      if (!this.ctx || !this.isHealingRunning) return;
      const now = this.ctx.currentTime;

      if (this.healingGain) {
        this.healingGain.gain.setValueAtTime(this.healingGain.gain.value, now);
        this.healingGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      }

      setTimeout(() => {
        try {
          this.healingOsc1?.stop();
          this.healingOsc1?.disconnect();
          this.healingOsc2?.stop();
          this.healingOsc2?.disconnect();
          this.healingSubOsc?.stop();
          this.healingSubOsc?.disconnect();
          this.healingGain?.disconnect();

          this.healingOsc1 = null;
          this.healingOsc2 = null;
          this.healingSubOsc = null;
          this.healingGain = null;
        } catch {}
      }, 900);

      this.isHealingRunning = false;
      if (notify) {
        this.notifyHealing();
      }
    } catch {}
  }

  public getIsHealingRunning(): boolean {
    return this.isHealingRunning;
  }

  public getCurrentHealingFreq(): number {
    return this.currentHealingFreq;
  }

  public subscribeHealing(callback: (isHealing: boolean, freq: number) => void) {
    this.healingListeners.add(callback);
    callback(this.isHealingRunning, this.currentHealingFreq);
    return () => this.healingListeners.delete(callback);
  }

  private notifyHealing() {
    this.healingListeners.forEach((cb) => cb(this.isHealingRunning, this.currentHealingFreq));
  }

  /**
   * Sound for Dissolving Illness Node (Bio-Photonic Laser Pulse)
   */
  public playCellularDissolvePulse() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Golden harmonic bloom
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, now);
      osc.frequency.exponentialRampToValueAtTime(1056, now + 0.25);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.38);
    } catch {}
  }

  /**
   * Guided Breath Chime for Vagus Nerve Breathing
   */
  public playVagusNerveBreatheTone(phase: 'inhale' | 'hold' | 'exhale') {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';

      if (phase === 'inhale') {
        osc.frequency.setValueAtTime(396, now);
        osc.frequency.exponentialRampToValueAtTime(528, now + 0.4);
      } else if (phase === 'hold') {
        osc.frequency.setValueAtTime(639, now);
      } else {
        osc.frequency.setValueAtTime(528, now);
        osc.frequency.exponentialRampToValueAtTime(396, now + 0.5);
      }

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch {}
  }

  // =========================================================================
  // BUDDHIST & UNIVERSAL SOUND HEALING THERAPIES SYNTHESIS SUITE
  // =========================================================================

  private sustainedBowlOscs: OscillatorNode[] = [];
  private sustainedBowlGain: GainNode | null = null;
  private sustainedBowlLfo: OscillatorNode | null = null;
  private isSingingBowlActive: boolean = false;
  private activeSingingBowlFreq: number = 432;

  /**
   * 1. Authentic Tibetan 7-Metal Singing Bowl Acoustic Strike
   * Models the physical non-integer harmonic partials (1.0, 2.76, 5.12, 8.18, 11.4)
   * with natural metallic shimmer and exponential spatial decay.
   */
  public playTibetanBowl(baseFreq: number = 432, durationSec: number = 7.0, strikeForce: number = 0.8) {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Master bowl gain
      const bowlMasterGain = this.ctx.createGain();
      bowlMasterGain.gain.setValueAtTime(0.0001, now);
      bowlMasterGain.gain.exponentialRampToValueAtTime(Math.min(0.35, 0.22 * strikeForce), now + 0.02);
      bowlMasterGain.gain.exponentialRampToValueAtTime(0.00001, now + durationSec);
      bowlMasterGain.connect(this.ctx.destination);

      // Acoustic partials characteristic of hand-hammered Himalayan bronze alloy
      const partials = [
        { ratio: 1.0, gain: 1.0, decay: durationSec, type: 'sine' as OscillatorType },
        { ratio: 2.756, gain: 0.65, decay: durationSec * 0.85, type: 'sine' as OscillatorType },
        { ratio: 5.12, gain: 0.35, decay: durationSec * 0.65, type: 'sine' as OscillatorType },
        { ratio: 8.18, gain: 0.18, decay: durationSec * 0.45, type: 'triangle' as OscillatorType },
        { ratio: 11.42, gain: 0.08, decay: durationSec * 0.3, type: 'sine' as OscillatorType },
      ];

      // Subtle strike transient (wood mallet click)
      const clickOsc = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(baseFreq * 0.5, now);
      clickOsc.frequency.exponentialRampToValueAtTime(baseFreq * 3, now + 0.03);
      clickGain.gain.setValueAtTime(0.08 * strikeForce, now);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      clickOsc.connect(clickGain);
      clickGain.connect(bowlMasterGain);
      clickOsc.start(now);
      clickOsc.stop(now + 0.06);

      partials.forEach((p, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const pGain = this.ctx.createGain();
        osc.type = p.type;
        
        // Slight micro-detuning (0.2Hz to 0.6Hz) to create natural binaural acoustic wobble (beating)
        const detune = idx === 0 ? 0 : (Math.random() - 0.5) * 1.2;
        osc.frequency.setValueAtTime(baseFreq * p.ratio + detune, now);

        pGain.gain.setValueAtTime(0.0001, now);
        pGain.gain.exponentialRampToValueAtTime(p.gain, now + 0.015);
        pGain.gain.exponentialRampToValueAtTime(0.00001, now + p.decay);

        osc.connect(pGain);
        pGain.connect(bowlMasterGain);
        osc.start(now);
        osc.stop(now + p.decay + 0.1);
      });
    } catch (e) {
      console.warn('Tibetan bowl audio error:', e);
    }
  }

  /**
   * Continuous Tibetan Singing Bowl Rim Rubbing (Sustained Singing Mode)
   * Generates continuous rotating acoustic standing waves with gentle hand-rotation modulation.
   */
  public startSingingBowlRim(baseFreq: number = 432) {
    try {
      this.initContext();
      if (!this.ctx) return;
      this.stopSingingBowlRim();

      const now = this.ctx.currentTime;
      this.isSingingBowlActive = true;
      this.activeSingingBowlFreq = baseFreq;

      this.sustainedBowlGain = this.ctx.createGain();
      this.sustainedBowlGain.gain.setValueAtTime(0.0001, now);
      this.sustainedBowlGain.gain.exponentialRampToValueAtTime(0.22, now + 2.5); // Smooth hand wind-up
      this.sustainedBowlGain.connect(this.ctx.destination);

      // Rotating rim LFO (0.8Hz ~ 48 RPM rotation speed)
      this.sustainedBowlLfo = this.ctx.createOscillator();
      this.sustainedBowlLfo.type = 'sine';
      this.sustainedBowlLfo.frequency.setValueAtTime(0.85, now);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(0.05, now);
      this.sustainedBowlLfo.connect(lfoGain.gain);
      this.sustainedBowlLfo.start(now);

      const partials = [
        { ratio: 1.0, gain: 0.8 },
        { ratio: 2.76, gain: 0.45 },
        { ratio: 5.12, gain: 0.2 },
        { ratio: 8.18, gain: 0.08 }
      ];

      this.sustainedBowlOscs = [];
      partials.forEach((p, idx) => {
        if (!this.ctx || !this.sustainedBowlGain) return;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        const wobble = idx === 0 ? 0.3 : (Math.random() - 0.5) * 0.8;
        osc.frequency.setValueAtTime(baseFreq * p.ratio + wobble, now);

        const pGain = this.ctx.createGain();
        pGain.gain.setValueAtTime(p.gain, now);

        osc.connect(pGain);
        pGain.connect(this.sustainedBowlGain);
        osc.start(now);
        this.sustainedBowlOscs.push(osc);
      });
    } catch (e) {
      console.warn('Could not start sustained singing bowl:', e);
    }
  }

  public stopSingingBowlRim() {
    try {
      if (!this.ctx || !this.isSingingBowlActive) return;
      const now = this.ctx.currentTime;
      if (this.sustainedBowlGain) {
        this.sustainedBowlGain.gain.setValueAtTime(this.sustainedBowlGain.gain.value, now);
        this.sustainedBowlGain.gain.exponentialRampToValueAtTime(0.00001, now + 1.8);
      }

      setTimeout(() => {
        try {
          this.sustainedBowlOscs.forEach(o => { o.stop(); o.disconnect(); });
          this.sustainedBowlOscs = [];
          if (this.sustainedBowlLfo) {
            this.sustainedBowlLfo.stop();
            this.sustainedBowlLfo.disconnect();
            this.sustainedBowlLfo = null;
          }
          if (this.sustainedBowlGain) {
            this.sustainedBowlGain.disconnect();
            this.sustainedBowlGain = null;
          }
        } catch {}
      }, 1900);

      this.isSingingBowlActive = false;
    } catch {}
  }

  public getIsSingingBowlActive(): boolean {
    return this.isSingingBowlActive;
  }

  public getActiveSingingBowlFreq(): number {
    return this.activeSingingBowlFreq;
  }

  /**
   * 2. Tibetan Tingsha Cymbals (तिंगशा)
   * Ultra-pure high frequency twin bell strike (2400Hz–3200Hz) with 4Hz binaural acoustic shimmer
   * Used in Buddhist monastery rituals to clear mental fog and awaken present moment mindfulness.
   */
  public playTingsha(pitch: number = 2640, durationSec: number = 5.5) {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(0.18, now + 0.008);
      master.gain.exponentialRampToValueAtTime(0.00001, now + durationSec);
      master.connect(this.ctx.destination);

      // Cymbal 1 (Left bell)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(pitch, now);

      // Cymbal 2 (Right bell slightly detuned by 3.8Hz creating pure Theta/Alpha acoustic beating)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(pitch + 3.8, now);

      // High Shimmer harmonic (Double frequency)
      const oscHigh = this.ctx.createOscillator();
      oscHigh.type = 'sine';
      oscHigh.frequency.setValueAtTime(pitch * 2.08, now);
      const highGain = this.ctx.createGain();
      highGain.gain.setValueAtTime(0.25, now);
      highGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec * 0.5);

      osc1.connect(master);
      osc2.connect(master);
      oscHigh.connect(highGain);
      highGain.connect(master);

      osc1.start(now);
      osc2.start(now);
      oscHigh.start(now);

      osc1.stop(now + durationSec + 0.1);
      osc2.stop(now + durationSec + 0.1);
      oscHigh.stop(now + durationSec * 0.5 + 0.1);
    } catch {}
  }

  /**
   * 3. Sacred Buddhist Temple Gong / Wind Gong (महागोंग)
   * Deep sub-bass fundamental (50-70Hz) with dynamic overtone explosion and expansive wash.
   * Simulates Sonic Shunya (Emptiness) to wash away deep subconscious tension.
   */
  public playBuddhistGong(fundamental: number = 65, durationSec: number = 9.0) {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const gongMaster = this.ctx.createGain();
      gongMaster.gain.setValueAtTime(0.0001, now);
      gongMaster.gain.exponentialRampToValueAtTime(0.35, now + 0.08);
      gongMaster.gain.exponentialRampToValueAtTime(0.18, now + 2.0); // Sustained shimmering wash
      gongMaster.gain.exponentialRampToValueAtTime(0.00001, now + durationSec);
      gongMaster.connect(this.ctx.destination);

      // Deep Sub Rumble (50-65Hz)
      const subOsc = this.ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(fundamental, now);
      subOsc.frequency.exponentialRampToValueAtTime(fundamental * 0.95, now + durationSec);
      subOsc.connect(gongMaster);
      subOsc.start(now);
      subOsc.stop(now + durationSec + 0.1);

      // Modal cluster frequencies (characteristic of large hammered bronze discs)
      const gongModes = [
        { f: fundamental * 1.58, gain: 0.6, type: 'triangle' as OscillatorType },
        { f: fundamental * 2.34, gain: 0.5, type: 'sine' as OscillatorType },
        { f: fundamental * 3.78, gain: 0.35, type: 'sawtooth' as OscillatorType },
        { f: fundamental * 5.14, gain: 0.2, type: 'sine' as OscillatorType },
        { f: fundamental * 7.92, gain: 0.12, type: 'sine' as OscillatorType },
      ];

      gongModes.forEach((mode) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = mode.type;
        osc.frequency.setValueAtTime(mode.f, now);

        g.gain.setValueAtTime(0.0001, now);
        g.gain.exponentialRampToValueAtTime(mode.gain, now + 0.12);
        g.gain.exponentialRampToValueAtTime(0.00001, now + durationSec * 0.85);

        osc.connect(g);
        g.connect(gongMaster);
        osc.start(now);
        osc.stop(now + durationSec + 0.1);
      });
    } catch {}
  }

  /**
   * 4. Zen Temple Bell / Keisu Rin Gong (मंदिर घंटा)
   * Resonant bronze bowl bell tuned to 108Hz harmonic with long sweet sustain.
   */
  public playTempleBell(freq: number = 432, durationSec: number = 6.0) {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(0.24, now + 0.015);
      master.gain.exponentialRampToValueAtTime(0.00001, now + durationSec);
      master.connect(this.ctx.destination);

      // Low hum fundamental (freq / 2)
      const humOsc = this.ctx.createOscillator();
      humOsc.type = 'sine';
      humOsc.frequency.setValueAtTime(freq * 0.5, now);
      const humGain = this.ctx.createGain();
      humGain.gain.setValueAtTime(0.5, now);
      humOsc.connect(humGain);
      humGain.connect(master);
      humOsc.start(now);
      humOsc.stop(now + durationSec + 0.1);

      // Strike tone (fundamental)
      const strikeOsc = this.ctx.createOscillator();
      strikeOsc.type = 'sine';
      strikeOsc.frequency.setValueAtTime(freq, now);
      strikeOsc.connect(master);
      strikeOsc.start(now);
      strikeOsc.stop(now + durationSec + 0.1);

      // Bell overtone
      const tierceOsc = this.ctx.createOscillator();
      tierceOsc.type = 'sine';
      tierceOsc.frequency.setValueAtTime(freq * 2.4, now);
      const tierceGain = this.ctx.createGain();
      tierceGain.gain.setValueAtTime(0.28, now);
      tierceGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec * 0.6);
      tierceOsc.connect(tierceGain);
      tierceGain.connect(master);
      tierceOsc.start(now);
      tierceOsc.stop(now + durationSec * 0.6 + 0.1);
    } catch {}
  }

  /**
   * 5. Medicine Buddha (Bhaisajyaguru) Healing Mantra Harmonic Chanting Drone
   * "Tadyatha Om Bhekhadze Bhekhadze Maha Bhekhadze Radza Samudgate Svaha"
   * Generates a multi-voice sacred Tibetan overtone harmonic drone + 528Hz healing matrix.
   */
  public playMedicineBuddhaMantraChant(durationSec: number = 10.0) {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Master chant gain
      const chantGain = this.ctx.createGain();
      chantGain.gain.setValueAtTime(0.0001, now);
      chantGain.gain.exponentialRampToValueAtTime(0.28, now + 1.5);
      chantGain.gain.setValueAtTime(0.28, now + durationSec - 2.0);
      chantGain.gain.exponentialRampToValueAtTime(0.00001, now + durationSec);
      chantGain.connect(this.ctx.destination);

      // Deep Tibetan Throat Root Drone (64.8Hz - Tibetan Gyuto low fundamental)
      const throatOsc = this.ctx.createOscillator();
      throatOsc.type = 'sawtooth';
      throatOsc.frequency.setValueAtTime(64.8, now);

      // Formant Bandpass Filters (producing the "O-E-A-U-M" resonant vowel harmonics)
      const formant1 = this.ctx.createBiquadFilter();
      formant1.type = 'bandpass';
      formant1.frequency.setValueAtTime(450, now); // Vowel "O/U"
      formant1.Q.setValueAtTime(8, now);

      const formant2 = this.ctx.createBiquadFilter();
      formant2.type = 'bandpass';
      formant2.frequency.setValueAtTime(900, now); // Overtone singing
      formant2.Q.setValueAtTime(12, now);

      throatOsc.connect(formant1);
      throatOsc.connect(formant2);
      formant1.connect(chantGain);
      formant2.connect(chantGain);
      throatOsc.start(now);
      throatOsc.stop(now + durationSec + 0.1);

      // Medicine Buddha Lapis Lazuli Light Frequency (528Hz + 852Hz Third Eye Infusion)
      [528, 639, 852].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0.04 / (idx + 1), now);
        osc.connect(g);
        g.connect(chantGain);
        osc.start(now);
        osc.stop(now + durationSec + 0.1);
      });

      // Subtle temple bell entry
      this.playTempleBell(432, 5.0);
    } catch {}
  }

  /**
   * 6. Om Mani Padme Hum 6-Syllable Resonance (ॐ मणि पद्मे हूँ)
   * Synthesizes the 6-realm purifying frequency chords:
   * OM (Crown 963Hz), MA (Throat 741Hz), NI (Heart 639Hz), PAD (Solar 528Hz), ME (Sacral 417Hz), HUM (Root 396Hz).
   */
  public playOmManiPadmeHum(durationSec: number = 8.0) {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Play 6 syllables layered in sacred harmonic sequence
      const freqs = [396, 417, 528, 639, 741, 963];
      this.playChord(freqs, durationSec);
      this.playTingsha(2640, 6.0);
    } catch {}
  }

  /**
   * 7. Shakuhachi Zen Bamboo Flute & Nada Yoga Meditation (सुइज़ेन)
   * Synthesizes warm breathy pentatonic Zen bamboo flute with subtle air turbulence & pitch bend.
   */
  public playShakuhachiZenBreath(baseNote: number = 324, durationSec: number = 4.5) {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(0.16, now + 0.4); // Slow breath rise
      master.gain.setValueAtTime(0.16, now + durationSec - 0.8);
      master.gain.exponentialRampToValueAtTime(0.00001, now + durationSec);
      master.connect(this.ctx.destination);

      // Flute Fundamental Tone
      const fluteOsc = this.ctx.createOscillator();
      fluteOsc.type = 'triangle';
      fluteOsc.frequency.setValueAtTime(baseNote, now);
      // Traditional shakuhachi Meri-Kari microtonal pitch bend
      fluteOsc.frequency.exponentialRampToValueAtTime(baseNote * 1.03, now + 1.2);
      fluteOsc.frequency.exponentialRampToValueAtTime(baseNote, now + 2.5);

      // Breath Air Noise (filtered white noise simulating air across bamboo mouthpiece)
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.05;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const airFilter = this.ctx.createBiquadFilter();
      airFilter.type = 'bandpass';
      airFilter.frequency.setValueAtTime(baseNote * 2.2, now);
      airFilter.Q.setValueAtTime(4, now);

      noise.connect(airFilter);
      airFilter.connect(master);
      fluteOsc.connect(master);

      fluteOsc.start(now);
      noise.start(now);

      fluteOsc.stop(now + durationSec + 0.1);
      noise.stop(now + durationSec + 0.1);
    } catch {}
  }

  /**
   * 8. Chakra Bija Mantras (LAM, VAM, RAM, YAM, HAM, OM, AUM) Formant Synthesizer
   */
  public playChakraBijaMantra(chakra: 'root' | 'sacral' | 'solar' | 'heart' | 'throat' | 'thirdeye' | 'crown') {
    const config = {
      root: { bija: 'LAM', freq: 396, vowelF: 300, desc: 'Muladhara Grounding' },
      sacral: { bija: 'VAM', freq: 417, vowelF: 450, desc: 'Svadhisthana Creative Water' },
      solar: { bija: 'RAM', freq: 528, vowelF: 600, desc: 'Manipura Fire Transformation' },
      heart: { bija: 'YAM', freq: 639, vowelF: 750, desc: 'Anahata Love Air' },
      throat: { bija: 'HAM', freq: 741, vowelF: 900, desc: 'Vishuddha Space Expression' },
      thirdeye: { bija: 'SHAM', freq: 852, vowelF: 1100, desc: 'Ajna Intuition Light' },
      crown: { bija: 'AUM', freq: 963, vowelF: 1300, desc: 'Sahasrara Cosmic Transcendence' }
    }[chakra];

    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const durationSec = 4.0;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.2, now + 0.3);
      gain.gain.setValueAtTime(0.2, now + durationSec - 0.8);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + durationSec);
      gain.connect(this.ctx.destination);

      // Carrier Tone
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(config.freq, now);

      // Resonant Formant Filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(config.vowelF, now);
      filter.Q.setValueAtTime(6, now);

      osc.connect(filter);
      filter.connect(gain);
      osc.start(now);
      osc.stop(now + durationSec + 0.1);

      // Harmonic bowl strike accompanying the bija
      this.playTibetanBowl(config.freq, durationSec, 0.7);
    } catch {}
  }

  // =========================================================================
  // BINAURAL BRAINWAVE ENTRAINMENT ENGINE (Delta, Theta, Alpha, Beta, Gamma)
  // =========================================================================
  private binauralLeftOsc: OscillatorNode | null = null;
  private binauralRightOsc: OscillatorNode | null = null;
  private binauralGain: GainNode | null = null;
  private isBinauralRunning: boolean = false;
  private activeBinauralType: string = 'theta';

  public startBinauralBeat(
    carrierFreq: number = 216,
    waveType: 'delta' | 'theta' | 'alpha' | 'beta' | 'gamma' = 'theta'
  ) {
    try {
      this.initContext();
      if (!this.ctx) return;
      this.stopBinauralBeat();

      const deltaHz = {
        delta: 2.0,   // 0.5 - 4 Hz: Deep Sleep & Cellular Repair
        theta: 4.5,   // 4 - 8 Hz: Buddhist Dhyana, Shunya, REM & Intuition
        alpha: 10.0,  // 8 - 12 Hz: Calm Alert Mindfulness & Flow
        beta: 18.0,   // 13 - 30 Hz: Sharp Focus & Cognition
        gamma: 40.0   // 30 - 100 Hz: Loving-Kindness & Epiphany
      }[waveType];

      const now = this.ctx.currentTime;
      this.isBinauralRunning = true;
      this.activeBinauralType = waveType;

      this.binauralGain = this.ctx.createGain();
      this.binauralGain.gain.setValueAtTime(0.0001, now);
      this.binauralGain.gain.exponentialRampToValueAtTime(0.18, now + 1.5);
      this.binauralGain.connect(this.ctx.destination);

      // Left Channel Oscillator
      this.binauralLeftOsc = this.ctx.createOscillator();
      this.binauralLeftOsc.type = 'sine';
      this.binauralLeftOsc.frequency.setValueAtTime(carrierFreq, now);

      // Right Channel Oscillator (+ deltaHz)
      this.binauralRightOsc = this.ctx.createOscillator();
      this.binauralRightOsc.type = 'sine';
      this.binauralRightOsc.frequency.setValueAtTime(carrierFreq + deltaHz, now);

      // Stereo Panners if supported
      try {
        const pannerL = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
        const pannerR = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
        if (pannerL && pannerR) {
          pannerL.pan.setValueAtTime(-1.0, now);
          pannerR.pan.setValueAtTime(1.0, now);
          this.binauralLeftOsc.connect(pannerL);
          this.binauralRightOsc.connect(pannerR);
          pannerL.connect(this.binauralGain);
          pannerR.connect(this.binauralGain);
        } else {
          this.binauralLeftOsc.connect(this.binauralGain);
          this.binauralRightOsc.connect(this.binauralGain);
        }
      } catch {
        this.binauralLeftOsc.connect(this.binauralGain);
        this.binauralRightOsc.connect(this.binauralGain);
      }

      this.binauralLeftOsc.start(now);
      this.binauralRightOsc.start(now);
    } catch (e) {
      console.warn('Could not start binaural beats:', e);
    }
  }

  public stopBinauralBeat() {
    try {
      if (!this.ctx || !this.isBinauralRunning) return;
      const now = this.ctx.currentTime;
      if (this.binauralGain) {
        this.binauralGain.gain.setValueAtTime(this.binauralGain.gain.value, now);
        this.binauralGain.gain.exponentialRampToValueAtTime(0.00001, now + 1.0);
      }

      setTimeout(() => {
        try {
          if (this.binauralLeftOsc) { this.binauralLeftOsc.stop(); this.binauralLeftOsc.disconnect(); this.binauralLeftOsc = null; }
          if (this.binauralRightOsc) { this.binauralRightOsc.stop(); this.binauralRightOsc.disconnect(); this.binauralRightOsc = null; }
          if (this.binauralGain) { this.binauralGain.disconnect(); this.binauralGain = null; }
        } catch {}
      }, 1100);

      this.isBinauralRunning = false;
    } catch {}
  }

  public getIsBinauralRunning(): boolean {
    return this.isBinauralRunning;
  }

  public getActiveBinauralType(): string {
    return this.activeBinauralType;
  }

  // =========================================================================
  // ISOCHRONIC TONES ENGINE (Pulsed rhythmic amplitude entrainment)
  // =========================================================================
  private isochronicCarrier: OscillatorNode | null = null;
  private isochronicLfo: OscillatorNode | null = null;
  private isochronicGain: GainNode | null = null;
  private isIsochronicRunning: boolean = false;

  public startIsochronicPulse(carrierFreq: number = 432, pulseRateHz: number = 7.83) {
    try {
      this.initContext();
      if (!this.ctx) return;
      this.stopIsochronicPulse();

      const now = this.ctx.currentTime;
      this.isIsochronicRunning = true;

      this.isochronicGain = this.ctx.createGain();
      this.isochronicGain.gain.setValueAtTime(0.0001, now);
      this.isochronicGain.connect(this.ctx.destination);

      // Carrier
      this.isochronicCarrier = this.ctx.createOscillator();
      this.isochronicCarrier.type = 'sine';
      this.isochronicCarrier.frequency.setValueAtTime(carrierFreq, now);

      // LFO Pulse (Square / smooth pulse)
      this.isochronicLfo = this.ctx.createOscillator();
      this.isochronicLfo.type = 'square';
      this.isochronicLfo.frequency.setValueAtTime(pulseRateHz, now);

      const lfoDepth = this.ctx.createGain();
      lfoDepth.gain.setValueAtTime(0.14, now);

      this.isochronicLfo.connect(lfoDepth);
      lfoDepth.connect(this.isochronicGain.gain);

      this.isochronicCarrier.connect(this.isochronicGain);
      this.isochronicCarrier.start(now);
      this.isochronicLfo.start(now);
    } catch {}
  }

  public stopIsochronicPulse() {
    try {
      if (!this.ctx || !this.isIsochronicRunning) return;
      const now = this.ctx.currentTime;
      if (this.isochronicGain) {
        this.isochronicGain.gain.setValueAtTime(this.isochronicGain.gain.value, now);
        this.isochronicGain.gain.exponentialRampToValueAtTime(0.00001, now + 0.6);
      }

      setTimeout(() => {
        try {
          if (this.isochronicCarrier) { this.isochronicCarrier.stop(); this.isochronicCarrier.disconnect(); this.isochronicCarrier = null; }
          if (this.isochronicLfo) { this.isochronicLfo.stop(); this.isochronicLfo.disconnect(); this.isochronicLfo = null; }
          if (this.isochronicGain) { this.isochronicGain.disconnect(); this.isochronicGain = null; }
        } catch {}
      }, 700);

      this.isIsochronicRunning = false;
    } catch {}
  }

  public getIsIsochronicRunning(): boolean {
    return this.isIsochronicRunning;
  }

  /**
   * Authentic Gayatri Mantra Chanting Audio Player
   */
  private gayatriAudio: HTMLAudioElement | null = null;
  private isGayatriPlaying: boolean = false;

  public playGayatriMantra(onEnded?: () => void, loop: boolean = false, volume: number = 0.8) {
    try {
      if (!this.gayatriAudio) {
        this.gayatriAudio = new Audio('/audio/gayatri-mantra.mp3');
        this.gayatriAudio.addEventListener('error', () => {
          if (this.gayatriAudio && this.gayatriAudio.src.endsWith('.mp3')) {
            this.gayatriAudio.src = '/audio/gayatri-mantra.ogg';
            this.gayatriAudio.load();
            this.gayatriAudio.play().catch(() => {});
          }
        });
      }
      this.gayatriAudio.loop = loop;
      this.gayatriAudio.volume = Math.max(0, Math.min(1, volume));
      this.gayatriAudio.currentTime = 0;
      
      const playPromise = this.gayatriAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.isGayatriPlaying = true;
        }).catch((err) => {
          console.warn('Playback of Gayatri mantra audio was prevented or failed:', err);
        });
      }

      if (onEnded) {
        this.gayatriAudio.onended = () => {
          this.isGayatriPlaying = false;
          onEnded();
        };
      }
    } catch (err) {
      console.error('Failed to trigger Gayatri Mantra playback:', err);
    }
  }

  public stopGayatriMantra() {
    try {
      if (this.gayatriAudio) {
        this.gayatriAudio.pause();
        this.gayatriAudio.currentTime = 0;
        this.isGayatriPlaying = false;
      }
    } catch {}
  }

  public getIsGayatriPlaying(): boolean {
    return this.isGayatriPlaying && !!this.gayatriAudio && !this.gayatriAudio.paused;
  }

  /**
   * Vedic Human Vocal Chanting Synthesizer Engine
   * Chants authentic Sanskrit / Hindi Shlokas (e.g. Gayatri Mantra, Mahamrityunjaya)
   * with sacred temple chime bells and natural human voice articulation.
   */
  private activeUtterance: SpeechSynthesisUtterance | null = null;
  private isVocalChanting: boolean = false;
  private vocalKeepAliveTimer: any = null;

  public getAvailableVocalVoices(): SpeechSynthesisVoice[] {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
    try {
      const voices = window.speechSynthesis.getVoices();
      return voices.filter(v => 
        v.lang.startsWith('hi') || 
        v.lang.startsWith('sa') || 
        v.lang.includes('IN') || 
        v.name.toLowerCase().includes('hindi') || 
        v.name.toLowerCase().includes('india')
      );
    } catch {
      return [];
    }
  }

  public chantVocalMantra(options: {
    sanskritText: string;
    onWordSpoken?: (charIndex: number, word: string) => void;
    onCycleComplete?: () => void;
    onError?: (err: any) => void;
    rate?: number;
    pitch?: number;
    volume?: number;
    playTempleBell?: boolean;
  }) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (options.onError) options.onError('SpeechSynthesis is not supported in this browser.');
      return;
    }

    try {
      this.initContext();
      this.stopVocalChanting();

      // Play soft sacred temple bell and rich Om Tanpura drone
      if (options.playTempleBell !== false) {
        try {
          this.playTibetanBowl(528);
          this.playFrequency(136.1);
        } catch {}
      }

      const textToChant = options.sanskritText || 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्';
      const utterance = new SpeechSynthesisUtterance(textToChant);

      const assignVoiceAndSpeak = () => {
        try {
          const allVoices = window.speechSynthesis.getVoices();
          const hindiVoice = allVoices.find(v => v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi')) ||
                             allVoices.find(v => v.lang.includes('IN') || v.name.toLowerCase().includes('india')) ||
                             allVoices[0];

          if (hindiVoice) {
            utterance.voice = hindiVoice;
            utterance.lang = hindiVoice.lang || 'hi-IN';
          } else {
            utterance.lang = 'hi-IN';
          }

          // Meditative, clear and resonant chanting pace
          utterance.rate = options.rate ?? 0.8;
          utterance.pitch = options.pitch ?? 0.95;
          utterance.volume = options.volume ?? 1.0;

          utterance.onboundary = (event) => {
            if (options.onWordSpoken && (event.name === 'word' || !event.name)) {
              const charIdx = event.charIndex;
              const spokenWord = textToChant.slice(charIdx, charIdx + 20).split(/[\s,।॥]/)[0] || '';
              options.onWordSpoken(charIdx, spokenWord);
            }
          };

          utterance.onend = () => {
            this.isVocalChanting = false;
            this.activeUtterance = null;
            if (this.vocalKeepAliveTimer) {
              clearInterval(this.vocalKeepAliveTimer);
              this.vocalKeepAliveTimer = null;
            }
            if (options.onCycleComplete) {
              options.onCycleComplete();
            }
          };

          utterance.onerror = (e) => {
            console.warn('Speech synthesis utterance notice:', e);
            this.isVocalChanting = false;
            this.activeUtterance = null;
            if (this.vocalKeepAliveTimer) {
              clearInterval(this.vocalKeepAliveTimer);
              this.vocalKeepAliveTimer = null;
            }
            if (options.onError) options.onError(e);
          };

          this.activeUtterance = utterance;
          this.isVocalChanting = true;

          // Resume speech synthesis to prevent browser stall
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }

          window.speechSynthesis.speak(utterance);

          // Keep alive loop for Chrome speech synthesis
          this.vocalKeepAliveTimer = setInterval(() => {
            if (this.isVocalChanting) {
              if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
              }
            }
          }, 3000);
        } catch (err) {
          this.isVocalChanting = false;
          if (options.onError) options.onError(err);
        }
      };

      // Ensure speech synthesis is awake
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      // Check if voices are loaded or need brief delay
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          assignVoiceAndSpeak();
        };
        setTimeout(assignVoiceAndSpeak, 100);
      } else {
        setTimeout(assignVoiceAndSpeak, 50);
      }

    } catch (err) {
      this.isVocalChanting = false;
      if (options.onError) options.onError(err);
    }
  }

  public stopVocalChanting() {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (this.vocalKeepAliveTimer) {
        clearInterval(this.vocalKeepAliveTimer);
        this.vocalKeepAliveTimer = null;
      }
      this.activeUtterance = null;
      this.isVocalChanting = false;
    } catch {}
  }

  public getIsVocalChanting(): boolean {
    return this.isVocalChanting;
  }

  /**
   * Biofield 128Hz Tuning Fork (Otto 128) for Nitric Oxide release & bone rejuvenation
   */
  public playTuningFork128() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(0.25, now + 0.02);
      master.gain.exponentialRampToValueAtTime(0.00001, now + 6.0);
      master.connect(this.ctx.destination);

      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(128, now);
      osc.connect(master);
      osc.start(now);
      osc.stop(now + 6.1);
    } catch {}
  }
}

export const cosmicAudio = new CosmicAudioEngine();
