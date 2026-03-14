'use client';

class AudioManager {
  ctx: AudioContext | null = null;
  buffers: Record<string, AudioBuffer> = {};
  initialized = false;

  init() {
    if (!this.initialized) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.initialized = true;
    }
  }

  async loadSound(name: string, url: string) {
    if (!this.ctx) return;
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      this.buffers[name] = await this.ctx.decodeAudioData(arrayBuffer);
    } catch (e) {
      console.error('Failed to load sound', e);
    }
  }

  playClang(panValue = 0) {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    if (this.buffers['clang']) {
      const source = this.ctx.createBufferSource();
      source.buffer = this.buffers['clang'];

      const panner = this.ctx.createStereoPanner();
      panner.pan.value = panValue;

      const gainNode = this.ctx.createGain();
      gainNode.gain.value = 0.6;

      source.connect(panner);
      panner.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      
      source.start(0);
    } else {
      // Synthesize a metallic clang if buffer not loaded
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const osc3 = this.ctx.createOscillator();
      
      osc1.type = 'square';
      osc2.type = 'sawtooth';
      osc3.type = 'triangle';
      
      osc1.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc2.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc3.frequency.setValueAtTime(600, this.ctx.currentTime);
      
      osc1.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.5);
      osc2.frequency.exponentialRampToValueAtTime(75, this.ctx.currentTime + 0.5);
      osc3.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.5);
      
      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.6, this.ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.5);
      
      const panner = this.ctx.createStereoPanner();
      panner.pan.value = panValue;
      
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      osc3.connect(gainNode);
      
      gainNode.connect(panner);
      panner.connect(this.ctx.destination);
      
      osc1.start();
      osc2.start();
      osc3.start();
      
      osc1.stop(this.ctx.currentTime + 1.5);
      osc2.stop(this.ctx.currentTime + 1.5);
      osc3.stop(this.ctx.currentTime + 1.5);
    }
  }

  playSwoosh(panValue = 0) {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    if (this.buffers['swoosh']) {
      const source = this.ctx.createBufferSource();
      source.buffer = this.buffers['swoosh'];

      const panner = this.ctx.createStereoPanner();
      panner.pan.value = panValue;

      const gainNode = this.ctx.createGain();
      gainNode.gain.value = 0.4;

      source.connect(panner);
      panner.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      
      source.start(0);
    } else {
      // Synthesize a wind/swoosh sound using filtered noise
      const bufferSize = this.ctx.sampleRate * 1.5; // 1.5 seconds
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      
      // Sweep the frequency to create a "swoosh"
      filter.frequency.setValueAtTime(200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.5);
      filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 1.5);
      
      filter.Q.value = 1.5;
      
      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.5, this.ctx.currentTime + 0.5);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.5);
      
      const panner = this.ctx.createStereoPanner();
      panner.pan.value = panValue;
      
      noiseSource.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(panner);
      panner.connect(this.ctx.destination);
      
      noiseSource.start();
      noiseSource.stop(this.ctx.currentTime + 1.5);
    }
  }
}

export const audio = new AudioManager();
