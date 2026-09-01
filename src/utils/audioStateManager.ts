import { cosmicAudio } from './audioSynthesizer';

export type AudioCategory = 'IDLE' | 'MANTRA_FILE' | 'MANTRA_VOCAL' | 'SOLFEGGIO' | 'BINAURAL' | 'SINGING_BOWL';

export interface AudioState {
  category: AudioCategory;
  activeId: string | null;
  isPlaying: boolean;
  volume: number;
  playbackRate: number;
  error: string | null;
}

export type StateListener = (state: AudioState) => void;

class AudioStateManager {
  private state: AudioState = {
    category: 'IDLE',
    activeId: null,
    isPlaying: false,
    volume: 1.0,
    playbackRate: 1.0,
    error: null,
  };
  
  private listeners: Set<StateListener> = new Set();
  public readonly audioElement: HTMLAudioElement;

  constructor() {
    this.audioElement = new Audio();
    this.audioElement.crossOrigin = 'anonymous';
    this.audioElement.preload = 'auto';
    this.setupListeners();
  }

  private setupListeners() {
    this.audioElement.addEventListener('play', () => {
      this.updateState({ isPlaying: true, error: null });
    });

    this.audioElement.addEventListener('pause', () => {
      if (this.state.category === 'MANTRA_FILE') {
        this.updateState({ isPlaying: false });
      }
    });

    this.audioElement.addEventListener('ended', () => {
      if (!this.audioElement.loop && this.state.category === 'MANTRA_FILE') {
        this.updateState({ category: 'IDLE', isPlaying: false, activeId: null });
      }
    });

    this.audioElement.addEventListener('error', (e) => {
      if (!this.audioElement.src || this.audioElement.src === window.location.href) {
        return;
      }
      console.warn("AudioStateManager: HTML5 Audio load warning:", e);
      if (this.state.category === 'MANTRA_FILE') {
        this.updateState({ 
          error: 'ऑडियो लोड नहीं हो सका। कृपया पुनः प्रयास करें।', 
          isPlaying: false, 
          category: 'IDLE' 
        });
      }
    });
  }

  public subscribe(listener: StateListener) {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  private updateState(partial: Partial<AudioState>) {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach(l => l(this.state));
  }

  public getState() {
    return this.state;
  }

  /**
   * Stop all playing audio cleanly and safely without triggering unhandled abort exceptions
   */
  public stopAll() {
    // 1. Pause HTML5 Audio safely
    try {
      if (this.audioElement) {
        if (!this.audioElement.paused) {
          this.audioElement.pause();
        }
      }
    } catch (err) {
      console.warn("AudioStateManager: Error pausing HTML5 Audio:", err);
    }

    // 2. Stop Web Audio Synthesizer tones and voices
    try {
      cosmicAudio.stopVocalChanting();
      cosmicAudio.stopHealingFrequency(false);
      cosmicAudio.stopBinauralBeat();
      cosmicAudio.stopIsochronicPulse();
      cosmicAudio.stopSingingBowlRim();
      cosmicAudio.stopGayatriMantra();
      cosmicAudio.stopFrequencyTone();
    } catch (err) {
      console.warn("AudioStateManager: Error stopping Web Audio nodes:", err);
    }

    this.updateState({
      category: 'IDLE',
      activeId: null,
      isPlaying: false,
      error: null
    });
  }

  /**
   * Play an audio file (.mp3, .wav, blob, etc.)
   */
  public async playMantraFile(url: string, id: string, loop: boolean = true, volume?: number, playbackRate?: number): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (volume !== undefined) {
          this.setVolume(volume);
        }
        if (playbackRate !== undefined) {
          this.setPlaybackRate(playbackRate);
        }

        // Determine if URL is already assigned
        let isSameSrc = false;
        try {
          const resolvedUrl = new URL(url, window.location.href).href;
          isSameSrc = this.audioElement.src === resolvedUrl || this.audioElement.currentSrc === resolvedUrl;
        } catch {
          isSameSrc = this.audioElement.src.includes(url);
        }

        if (!isSameSrc) {
          this.stopAll();
          this.audioElement.src = url;
          this.audioElement.load();
        }

        this.audioElement.loop = loop;
        this.audioElement.volume = this.state.volume;
        this.audioElement.playbackRate = this.state.playbackRate;

        const playPromise = this.audioElement.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.updateState({ category: 'MANTRA_FILE', activeId: id, isPlaying: true, error: null });
              resolve();
            })
            .catch((err: any) => {
              if (err.name === 'AbortError' || err.message?.includes('interrupted by a call to pause')) {
                resolve();
                return;
              }
              // If mp3 fails, try ogg fallback
              if (url.endsWith('.mp3')) {
                const oggUrl = url.replace('.mp3', '.ogg');
                this.audioElement.src = oggUrl;
                this.audioElement.load();
                this.audioElement.play().then(() => {
                  this.updateState({ category: 'MANTRA_FILE', activeId: id, isPlaying: true, error: null });
                  resolve();
                }).catch((fallbackErr) => {
                  console.warn("AudioStateManager: Fallback audio playback failed:", fallbackErr);
                  this.updateState({ 
                    error: 'ऑडियो प्लेबैक लोड हो रहा है...', 
                    isPlaying: false, 
                    category: 'IDLE' 
                  });
                  reject(fallbackErr);
                });
                return;
              }

              console.warn("AudioStateManager: Playback prevented by browser permissions:", err);
              this.updateState({ 
                error: 'ऑडियो शुरू करने के लिए कृपया स्क्रीन पर टैप करें।', 
                isPlaying: false, 
                category: 'IDLE' 
              });
              reject(err);
            });
        } else {
          this.updateState({ category: 'MANTRA_FILE', activeId: id, isPlaying: true, error: null });
          resolve();
        }
      } catch (err: any) {
        this.updateState({ error: err.message || 'Playback failed', isPlaying: false, category: 'IDLE' });
        reject(err);
      }
    });
  }

  /**
   * Play vocal chanting using Web Speech Synthesis
   */
  public playVocalMantra(
    text: string, 
    id: string, 
    options: { 
      rate?: number; 
      pitch?: number; 
      volume?: number; 
      onWordSpoken?: (charIdx: number, word: string) => void; 
      onCycleComplete?: () => void;
      onError?: (err: any) => void;
      playTempleBell?: boolean;
    }
  ) {
    this.stopAll();
    try {
      if (options.volume !== undefined) {
        this.setVolume(options.volume);
      }
      
      cosmicAudio.chantVocalMantra({
        sanskritText: text,
        rate: options.rate || 0.8,
        pitch: options.pitch || 0.95,
        volume: this.state.volume,
        playTempleBell: options.playTempleBell,
        onWordSpoken: options.onWordSpoken,
        onCycleComplete: options.onCycleComplete,
        onError: (err) => {
           console.warn("AudioStateManager: Speech Synthesis warning:", err);
           if (options.onError) options.onError(err);
           this.updateState({ error: null, isPlaying: false, category: 'IDLE' });
        }
      });
      
      this.updateState({ category: 'MANTRA_VOCAL', activeId: id, isPlaying: true, error: null });
    } catch (err: any) {
      console.warn("AudioStateManager: Error in playVocalMantra:", err);
      if (options.onError) options.onError(err);
      this.updateState({ error: null, isPlaying: false, category: 'IDLE' });
    }
  }

  /**
   * Play Solfeggio / Healing Frequencies
   */
  public playSolfeggio(freq: number, binauralDelta: number = 4.0, id?: string) {
    this.stopAll();
    try {
      cosmicAudio.startHealingFrequency(freq, binauralDelta);
      this.updateState({ category: 'SOLFEGGIO', activeId: id || freq.toString(), isPlaying: true, error: null });
    } catch (err: any) {
      console.warn("AudioStateManager: Solfeggio playback warning:", err);
      this.updateState({ error: null, isPlaying: false, category: 'IDLE' });
    }
  }
  
  /**
   * Play Binaural Beats
   */
  public playBinaural(carrierFreq: number, waveType: 'delta' | 'theta' | 'alpha' | 'beta' | 'gamma', id: string = 'binaural') {
    this.stopAll();
    try {
      cosmicAudio.startBinauralBeat(carrierFreq, waveType);
      this.updateState({ category: 'BINAURAL', activeId: id, isPlaying: true, error: null });
    } catch (err: any) {
      console.warn("AudioStateManager: Binaural playback warning:", err);
      this.updateState({ error: null, isPlaying: false, category: 'IDLE' });
    }
  }

  /**
   * Play Singing Bowl continuous rim tone
   */
  public playSingingBowlRim(freq: number) {
    this.stopAll();
    try {
      cosmicAudio.startSingingBowlRim(freq);
      this.updateState({ category: 'SINGING_BOWL', activeId: freq.toString(), isPlaying: true, error: null });
    } catch (err: any) {
      console.warn("AudioStateManager: Singing Bowl rim warning:", err);
      this.updateState({ error: null, isPlaying: false, category: 'IDLE' });
    }
  }

  /**
   * Set global volume
   */
  public setVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    try {
      this.audioElement.volume = clamped;
    } catch {}
    this.updateState({ volume: clamped });
  }

  /**
   * Set global playback rate
   */
  public setPlaybackRate(rate: number) {
    const clamped = Math.max(0.25, Math.min(4.0, rate));
    try {
      this.audioElement.playbackRate = clamped;
    } catch {}
    this.updateState({ playbackRate: clamped });
  }

  /**
   * Seek in audio file
   */
  public seek(timeInSeconds: number) {
    try {
      if (this.audioElement && !isNaN(timeInSeconds)) {
        this.audioElement.currentTime = Math.max(0, Math.min(this.audioElement.duration || 9999, timeInSeconds));
      }
    } catch {}
  }
}

export const audioManager = new AudioStateManager();
