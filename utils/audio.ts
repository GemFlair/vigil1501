
/**
 * VIGIL TACTICAL AUDIO ENGINE
 * Synthesizes real-time audio cues using Web Audio API.
 */

let audioCtx: AudioContext | null = null;

const getAudioCtx = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

/**
 * Crystalline Chime: Ascending dual-tone sine wave (440Hz -> 880Hz).
 * Used for successful authentications and correct pattern matches.
 */
export const playSuccessChime = () => {
  try {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;
    
    [440, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + (i * 0.1));
      gain.gain.setValueAtTime(0.08, now + (i * 0.1));
      gain.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.1) + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + (i * 0.1));
      osc.stop(now + (i * 0.1) + 0.5);
    });
  } catch (e) {}
};

/**
 * Robotic BOP-BOP: Sharp, low-frequency double square wave pulse (150Hz).
 * Used for system breaches, denied access, and incorrect pattern detection.
 */
export const playDeniedSound = () => {
  try {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;
    
    [0, 0.12].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, now + delay);
      
      gain.gain.setValueAtTime(0.12, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.07);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + delay);
      osc.stop(now + delay + 0.08);
    });
  } catch (e) {}
};
