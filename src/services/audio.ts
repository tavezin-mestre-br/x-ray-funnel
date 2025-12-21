class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private masterCompressor: DynamicsCompressorNode | null = null;
  private isBgmPlaying: boolean = false;

  private async init() {
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

  toggleMute() {
    this.isMuted = !this.isMuted;
    const bgmTarget = this.isMuted ? 0 : 0.08;
    const sfxTarget = this.isMuted ? 0 : 0.35;
    
    if (this.ctx) {
      if (this.bgmGain) {
        this.bgmGain.gain.setTargetAtTime(bgmTarget, this.ctx.currentTime, 0.2);
      }
      if (this.sfxGain) {
        this.sfxGain.gain.setTargetAtTime(sfxTarget, this.ctx.currentTime, 0.1);
      }
    }
    
    return this.isMuted;
  }

  async startBGM() {
    if (this.isBgmPlaying) return;
    const ctx = await this.init();
    this.isBgmPlaying = true;

    this.bgmGain = ctx.createGain();
    this.bgmGain.gain.setValueAtTime(0, ctx.currentTime);
    
    const fadeTime = 1.5;
    const targetVolume = this.isMuted ? 0 : 0.08; 
    this.bgmGain.gain.linearRampToValueAtTime(targetVolume, ctx.currentTime + fadeTime);
    this.bgmGain.connect(this.masterCompressor!);

    const chords = [
      [110.00, 164.81, 246.94, 261.63, 329.63],
      [87.31, 130.81, 174.61, 220.00, 349.23]
    ]; 
    
    let currentChordIndex = 0;

    const createPadLayer = (freq: number, startTime: number) => {
      if (!this.isBgmPlaying || !this.ctx || !this.bgmGain) return;
      
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const env = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(80, startTime);
      filter.frequency.exponentialRampToValueAtTime(600 + (Math.random() * 200), startTime + 5);
      filter.Q.setValueAtTime(0.5, startTime);

      env.gain.setValueAtTime(0, startTime);
      env.gain.linearRampToValueAtTime(0.06, startTime + 4); 
      env.gain.linearRampToValueAtTime(0, startTime + 10); 

      osc.connect(filter);
      filter.connect(env);
      env.connect(this.bgmGain);
      
      osc.start(startTime);
      osc.stop(startTime + 10);
    };

    const playLoop = () => {
      if (!this.isBgmPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const chord = chords[currentChordIndex];
      
      chord.forEach((f, i) => {
        createPadLayer(f, now + (i * 0.25));
      });

      currentChordIndex = (currentChordIndex + 1) % chords.length;
      setTimeout(playLoop, 9000);
    };

    playLoop();

    const playLowEnd = () => {
      if (!this.isBgmPlaying || !this.ctx || !this.bgmGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const env = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55.00, now); 
      env.gain.setValueAtTime(0, now);
      env.gain.linearRampToValueAtTime(0.12, now + 4);
      env.gain.linearRampToValueAtTime(0, now + 16);
      osc.connect(env);
      env.connect(this.bgmGain);
      osc.start(now);
      osc.stop(now + 16);
      setTimeout(playLowEnd, 15500);
    };
    playLowEnd();
  }

  async playClick() {
    const ctx = await this.init();
    if (this.isMuted || !this.sfxGain) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(now + 0.05);
  }

  async playScanGlitch() {
    const ctx = await this.init();
    if (this.isMuted || !this.sfxGain) return;
    const now = ctx.currentTime;
    for(let i=0; i<3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(2500 + (Math.random() * 1500), now + (i * 0.04));
      gain.gain.setValueAtTime(0, now + (i * 0.04));
      gain.gain.linearRampToValueAtTime(0.02, now + (i * 0.04) + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.04) + 0.03);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now + (i * 0.04));
      osc.stop(now + (i * 0.04) + 0.03);
    }
  }

  async playTransition() {
    const ctx = await this.init();
    if (this.isMuted || !this.sfxGain) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.35);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(now + 0.35);
  }

  async playBeep(freq = 440) {
    const ctx = await this.init();
    if (this.isMuted || !this.sfxGain) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(now + 0.12);
  }

  async playBadge() {
    const ctx = await this.init();
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
      gain.connect(this.sfxGain);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.35);
    });
  }
}

export const AudioManager = new AudioEngine();
