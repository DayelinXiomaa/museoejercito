// Audio synthesis, SpeechSynthesis TTS voice reader, and audio controls

export class AudioManager {
  constructor() {
    this.speechSynth = window.speechSynthesis || null;
    this.currentUtterance = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.speechRate = 1.0;
    this.speechVolume = 1.0;
    this.selectedVoice = null;
    this.ambientAudio = null;
    this.isMuted = false;
    this.onStateChange = null;

    this.initVoices();
  }

  initVoices() {
    if (!this.speechSynth) return;

    const loadVoices = () => {
      const voices = this.speechSynth.getVoices();
      // Look for Spanish voices (prefer es-PE, es-ES, es-MX)
      this.selectedVoice = 
        voices.find(v => v.lang.includes('es-PE')) ||
        voices.find(v => v.lang.includes('es-ES')) ||
        voices.find(v => v.lang.includes('es-MX')) ||
        voices.find(v => v.lang.startsWith('es')) ||
        voices[0];
    };

    loadVoices();
    if (this.speechSynth.onvoiceschanged !== undefined) {
      this.speechSynth.onvoiceschanged = loadVoices;
    }
  }

  playText(text, callbackOnEnd = null) {
    if (!this.speechSynth) return;

    this.stopText();

    if (!text || text.trim() === '') return;

    // Clean HTML tags if any present
    const cleanText = text.replace(/<[^>]*>?/gm, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = this.speechRate;
    utterance.volume = this.isMuted ? 0 : this.speechVolume;

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    utterance.onstart = () => {
      this.isPlaying = true;
      this.isPaused = false;
      this.notifyStateChange('playing');
    };

    utterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.notifyStateChange('ended');
      if (callbackOnEnd) callbackOnEnd();
    };

    utterance.onerror = (err) => {
      console.warn('SpeechSynthesis error:', err);
      this.isPlaying = false;
      this.isPaused = false;
      this.notifyStateChange('error');
    };

    this.currentUtterance = utterance;
    this.speechSynth.speak(utterance);
  }

  pauseText() {
    if (this.speechSynth && this.isPlaying && !this.isPaused) {
      this.speechSynth.pause();
      this.isPaused = true;
      this.isPlaying = false;
      this.notifyStateChange('paused');
    }
  }

  resumeText() {
    if (this.speechSynth && this.isPaused) {
      this.speechSynth.resume();
      this.isPaused = false;
      this.isPlaying = true;
      this.notifyStateChange('playing');
    }
  }

  stopText() {
    if (this.speechSynth) {
      this.speechSynth.cancel();
      this.isPlaying = false;
      this.isPaused = false;
      this.notifyStateChange('stopped');
    }
  }

  setRate(rate) {
    this.speechRate = parseFloat(rate);
    if (this.isPlaying && this.currentUtterance) {
      // Re-read with new rate
      const text = this.currentUtterance.text;
      this.playText(text);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.currentUtterance) {
      this.currentUtterance.volume = this.isMuted ? 0 : this.speechVolume;
    }
    return this.isMuted;
  }

  playUiClickSound() {
    if (this.isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {
      // AudioContext fallback
    }
  }

  playNavigationChime() {
    if (this.isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, audioCtx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch (e) {
      // AudioContext fallback
    }
  }

  notifyStateChange(status) {
    if (typeof this.onStateChange === 'function') {
      this.onStateChange(status);
    }
  }
}
