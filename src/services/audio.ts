class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmAudio: HTMLAudioElement | null = null;
  private sfxGain: GainNode | null = null;
  private masterCompressor: DynamicsCompressorNode | null = null;
  private isBgmPlaying: boolean = false;

  private async initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

      this.masterCompressor = this.ctx.createDynamicsCompressor();
      this.masterCompressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
      this.masterCompressor.knee.setValueAtTime(40, this.ctx.currentTime);
      this.masterCompressor.ratio.setValueAtTime(3, this.ctx.currentTime);
      this.masterCompressor.attack.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterCompressor.release.setValueAtTime(0.15, this.ctx.currentTime);
      this.masterCompressor.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.sfxGain.connect(this.masterCompressor);
    }

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    return this.ctx;
  }

  get muted() {
    return this.isMuted;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;

    // BGM via HTML Audio
    if (this.bgmAudio) {
      this.bgmAudio.muted = this.isMuted;
    }

    // SFX via Web Audio
    if (this.ctx && this.sfxGain) {
      this.sfxGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime, 0.1);
    }

    return this.isMuted;
  }

  async startBGM() {
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;

    try {
      this.bgmAudio = new Audio('/audio/bgm.mp3');
      this.bgmAudio.loop = true;
      this.bgmAudio.volume = 0;
      this.bgmAudio.muted = this.isMuted;
      await this.bgmAudio.play();

      // Fade in over 2s
      const fadeSteps = 40;
      const targetVolume = 0.06;
      const stepTime = 2000 / fadeSteps;
      let currentStep = 0;
      const fadeInterval = setInterval(() => {
        currentStep++;
        if (this.bgmAudio) {
          this.bgmAudio.volume = Math.min(targetVolume, (currentStep / fadeSteps) * targetVolume);
        }
        if (currentStep >= fadeSteps) clearInterval(fadeInterval);
      }, stepTime);
    } catch (e) {
      console.warn('BGM autoplay blocked:', e);
      this.isBgmPlaying = false;
    }
  }

  // Soft descending sine sweep
  async playClick() {
    const ctx = await this.initCtx();
    if (this.isMuted || !this.sfxGain) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.06);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  // Soft whoosh for question transitions
  async playTransition() {
    const ctx = await this.initCtx();
    if (this.isMuted || !this.sfxGain) return;
    const now = ctx.currentTime;

    // Filtered noise-like sweep using detuned oscillators
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(200, now);
    osc1.frequency.exponentialRampToValueAtTime(60, now + 0.25);
    osc2.frequency.setValueAtTime(250, now);
    osc2.frequency.exponentialRampToValueAtTime(50, now + 0.25);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.25);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.25);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.25);
    osc2.stop(now + 0.25);
  }

  // Ascending arpeggio for completing a step
  async playSuccess() {
    const ctx = await this.initCtx();
    if (this.isMuted || !this.sfxGain) return;
    const now = ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.1);
      gain.gain.setValueAtTime(0.05, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.3);
    });
  }

  // Reveal sound for results screen — shimmering chord
  async playReveal() {
    const ctx = await this.initCtx();
    if (this.isMuted || !this.sfxGain) return;
    const now = ctx.currentTime;
    const freqs = [261.63, 329.63, 392.00, 523.25];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.linearRampToValueAtTime(2000, now + 0.8);
      gain.gain.setValueAtTime(0, now + i * 0.05);
      gain.gain.linearRampToValueAtTime(0.06, now + i * 0.05 + 0.15);
      gain.gain.linearRampToValueAtTime(0, now + 1.2);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now);
      osc.stop(now + 1.2);
    });
  }

  // Badge arpeggio
  async playBadge() {
    const ctx = await this.initCtx();
    if (this.isMuted || !this.sfxGain) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(f, now + i * 0.08);
      gain.gain.setValueAtTime(0.07, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.35);
    });
  }
}

export const AudioManager = new AudioEngine();
