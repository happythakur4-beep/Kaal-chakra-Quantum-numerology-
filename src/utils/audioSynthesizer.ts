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
}

export const cosmicAudio = new CosmicAudioEngine();
