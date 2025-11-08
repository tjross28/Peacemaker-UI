/**
 * Audio Player for Learn with Music feature
 * 
 * This module handles playing success and error sounds.
 * Currently uses Web Audio API to generate simple tones.
 * 
 * TO REPLACE WITH YOUR CUSTOM JINGLES:
 * 1. Place your audio files in /public/sounds/
 * 2. Update the file paths below
 * 3. Use formats: .mp3, .wav, or .ogg
 */

// Audio context for generating sounds
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

/**
 * Play success sound (correct match)
 * Currently: Ascending chord progression
 * Replace with your guitar riff!
 */
export const playSuccessSound = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Create oscillator for pleasant chord
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Connect oscillators to gain, then to output
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    osc3.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Set frequencies for a major chord (C major: C-E-G)
    osc1.frequency.value = 523.25; // C5
    osc2.frequency.value = 659.25; // E5
    osc3.frequency.value = 783.99; // G5
    
    // Set waveform for guitar-like sound
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc3.type = 'sine';
    
    // Envelope: quick attack, short sustain, quick release
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.02); // Attack
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.1); // Sustain
    gainNode.gain.linearRampToValueAtTime(0, now + 0.3); // Release
    
    // Start and stop
    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    osc1.stop(now + 0.3);
    osc2.stop(now + 0.3);
    osc3.stop(now + 0.3);
    
  } catch (error) {
    console.error('Error playing success sound:', error);
  }
};

/**
 * Play error sound (incorrect match)
 * Currently: Descending tone
 * Replace with your error sound!
 */
export const playErrorSound = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Descending tone for "wrong" feeling
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(200, now + 0.2);
    
    osc.type = 'sine';
    
    // Quick fade in and out
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.2);
    
    osc.start(now);
    osc.stop(now + 0.2);
    
  } catch (error) {
    console.error('Error playing error sound:', error);
  }
};

/**
 * TO USE YOUR CUSTOM AUDIO FILES:
 * 
 * 1. Place audio files in /public/sounds/:
 *    - success.mp3 (your correct answer jingle)
 *    - error.mp3 (your incorrect answer sound)
 * 
 * 2. Replace the functions above with:
 */

/*
export const playSuccessSound = () => {
  const audio = new Audio('/sounds/success.mp3');
  audio.volume = 0.5; // Adjust volume (0.0 to 1.0)
  audio.play().catch(err => console.error('Error playing sound:', err));
};

export const playErrorSound = () => {
  const audio = new Audio('/sounds/error.mp3');
  audio.volume = 0.5;
  audio.play().catch(err => console.error('Error playing sound:', err));
};
*/

/**
 * MULTIPLE JINGLES (Random):
 * If you have multiple success jingles, use this:
 */

/*
const successSounds = [
  '/sounds/success1.mp3',
  '/sounds/success2.mp3',
  '/sounds/success3.mp3',
  '/sounds/guitar-riff1.mp3',
];

export const playSuccessSound = () => {
  const randomSound = successSounds[Math.floor(Math.random() * successSounds.length)];
  const audio = new Audio(randomSound);
  audio.volume = 0.6;
  audio.play().catch(err => console.error('Error playing sound:', err));
};
*/

/**
 * PRELOAD SOUNDS (Better performance):
 */

/*
const successAudio = new Audio('/sounds/success.mp3');
const errorAudio = new Audio('/sounds/error.mp3');

// Preload
successAudio.load();
errorAudio.load();

export const playSuccessSound = () => {
  successAudio.currentTime = 0; // Reset to start
  successAudio.volume = 0.5;
  successAudio.play().catch(err => console.error('Error playing sound:', err));
};

export const playErrorSound = () => {
  errorAudio.currentTime = 0;
  errorAudio.volume = 0.5;
  errorAudio.play().catch(err => console.error('Error playing sound:', err));
};
*/
