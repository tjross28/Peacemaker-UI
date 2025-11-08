# Learn with Music - Audio Setup Guide 🎵

## Overview
This guide explains how to add your custom guitar riffs and jingles to the "Learn with Music" game feature.

---

## Current Status

✅ **Game Mechanics**: Fully implemented
✅ **Audio System**: Ready for your custom sounds
⏳ **Placeholder Sounds**: Using Web Audio API (simple tones)

**Replace with your guitar riffs to complete the feature!**

---

## Quick Start (3 Steps)

### Step 1: Prepare Your Audio Files

**Recommended Format**:
- **File Type**: MP3 (best browser support) or WAV (higher quality)
- **Sample Rate**: 44.1kHz or 48kHz
- **Bit Rate**: 128-192 kbps (good balance of quality/size)
- **Length**: 1-3 seconds (quick, rewarding jingles)

**File Names** (suggested):
- `success.mp3` - Plays when user matches correctly
- `error.mp3` - Plays when user selects wrong match
- `success1.mp3`, `success2.mp3`, etc. - Multiple success variations

---

### Step 2: Add Files to Project

Create a `sounds` folder and add your audio:

```
/public/
  /sounds/
    success.mp3       ← Your guitar success riff
    error.mp3         ← Your error sound
    success1.mp3      ← Optional: Multiple success sounds
    success2.mp3
    success3.mp3
```

**Note**: Files in `/public/` folder are accessible at `/sounds/filename.mp3`

---

### Step 3: Update Audio Player

Open `/utils/audioPlayer.ts` and replace the functions:

#### Option A: Single Sound Files

```typescript
/**
 * Replace the entire playSuccessSound function with:
 */
export const playSuccessSound = () => {
  const audio = new Audio('/sounds/success.mp3');
  audio.volume = 0.6; // Adjust volume (0.0 to 1.0)
  audio.play().catch(err => console.error('Error playing sound:', err));
};

export const playErrorSound = () => {
  const audio = new Audio('/sounds/error.mp3');
  audio.volume = 0.5;
  audio.play().catch(err => console.error('Error playing sound:', err));
};
```

#### Option B: Random Success Sounds (Recommended!)

```typescript
const successSounds = [
  '/sounds/success1.mp3',
  '/sounds/success2.mp3',
  '/sounds/success3.mp3',
  '/sounds/guitar-riff1.mp3',
  '/sounds/guitar-riff2.mp3',
];

export const playSuccessSound = () => {
  // Pick random sound for variety
  const randomSound = successSounds[Math.floor(Math.random() * successSounds.length)];
  const audio = new Audio(randomSound);
  audio.volume = 0.6;
  audio.play().catch(err => console.error('Error playing sound:', err));
};

export const playErrorSound = () => {
  const audio = new Audio('/sounds/error.mp3');
  audio.volume = 0.5;
  audio.play().catch(err => console.error('Error playing sound:', err));
};
```

#### Option C: Preloaded Audio (Best Performance)

```typescript
// Preload sounds when app loads
const successAudio = new Audio('/sounds/success.mp3');
const errorAudio = new Audio('/sounds/error.mp3');

// Preload the files
successAudio.load();
errorAudio.load();

export const playSuccessSound = () => {
  successAudio.currentTime = 0; // Reset to start
  successAudio.volume = 0.6;
  successAudio.play().catch(err => console.error('Error playing sound:', err));
};

export const playErrorSound = () => {
  errorAudio.currentTime = 0;
  errorAudio.volume = 0.5;
  errorAudio.play().catch(err => console.error('Error playing sound:', err));
};
```

---

## Advanced Features

### Multiple Random Jingles with Categories

```typescript
const guitarRiffs = [
  '/sounds/guitar-success1.mp3',
  '/sounds/guitar-success2.mp3',
  '/sounds/guitar-success3.mp3',
];

const pianoChords = [
  '/sounds/piano-success1.mp3',
  '/sounds/piano-success2.mp3',
];

const allSuccessSounds = [...guitarRiffs, ...pianoChords];

export const playSuccessSound = () => {
  const randomSound = allSuccessSounds[Math.floor(Math.random() * allSuccessSounds.length)];
  const audio = new Audio(randomSound);
  audio.volume = 0.6;
  audio.play().catch(err => console.error('Error playing sound:', err));
};
```

---

### Special Sounds for Streaks

Add this to `/components/LearnWithMusic.tsx`:

```typescript
// Inside LearnWithMusic component
const handleCorrectMatch = (card1: GameCard, card2: GameCard) => {
  const newCorrectPairs = correctPairs + 1;
  
  // Special sound for perfect game!
  if (newCorrectPairs === 6 && attempts === 6) {
    playPerfectGameSound(); // All correct on first try!
  } else {
    playSuccessSound(); // Regular success
  }
  
  // ... rest of the code
};
```

Then add to `audioPlayer.ts`:

```typescript
export const playPerfectGameSound = () => {
  const audio = new Audio('/sounds/perfect-game.mp3');
  audio.volume = 0.7;
  audio.play().catch(err => console.error('Error playing sound:', err));
};
```

---

## Audio Recording Tips

### For Guitar Riffs:

**Success Sound Ideas**:
- ✅ Upward strum (positive feeling)
- ✅ Major chord progression (C - G - Am - F)
- ✅ Quick ascending scale
- ✅ Happy power chord
- ✅ Triumphant single note bend

**Error Sound Ideas**:
- ❌ Descending strum (negative feeling)
- ❌ Dissonant note
- ❌ Muted strings sound
- ❌ Single low note
- ❌ Sad trombone equivalent on guitar

### Recording Setup:

```
1. Record at high quality
2. Keep it SHORT (1-2 seconds)
3. Remove silence at start/end
4. Normalize volume levels
5. Export as MP3 (128-192 kbps)
6. Test on phone speakers (most users!)
```

### Free Recording Software:
- **Audacity** (Windows/Mac/Linux)
- **GarageBand** (Mac/iOS)
- **Voice Memos** (iPhone) - good for quick tests
- **Audio Recorder** (Android)

---

## File Size Optimization

### Recommended Sizes:
- **Success sound**: < 50KB
- **Error sound**: < 30KB
- **Total all sounds**: < 300KB

### How to Reduce File Size:

**Using Audacity**:
1. File → Export → Export as MP3
2. Quality: 128 kbps (good balance)
3. Channel: Mono (unless stereo essential)
4. Trim silence at start/end

**Online Tools**:
- https://www.mp3smaller.com
- https://cloudconvert.com/mp3-converter

---

## Testing Your Audio

### Test Checklist:

```typescript
// Add this test function to audioPlayer.ts
export const testAllSounds = () => {
  console.log('Testing success sound...');
  setTimeout(() => playSuccessSound(), 500);
  
  console.log('Testing error sound...');
  setTimeout(() => playErrorSound(), 2000);
};
```

Run in browser console:
```javascript
import { testAllSounds } from './utils/audioPlayer';
testAllSounds();
```

### Manual Testing:
1. Open Learn with Music game
2. Make a correct match → Hear success sound
3. Make a wrong match → Hear error sound
4. Toggle sound on/off → Should mute
5. Complete game → Success sound plays
6. Test on mobile device
7. Test with headphones and speakers

---

## Troubleshooting

### Sound Not Playing?

**Check 1**: File path correct?
```typescript
// Try full path
const audio = new Audio('/sounds/success.mp3');

// Or relative path from public
const audio = new Audio('./sounds/success.mp3');
```

**Check 2**: Browser console errors?
```
F12 → Console tab → Look for errors
Common: "Failed to load resource: 404"
Solution: Check file is in /public/sounds/
```

**Check 3**: File format supported?
```typescript
// Test if browser supports your format
const audio = new Audio();
console.log('Can play MP3:', audio.canPlayType('audio/mpeg'));
console.log('Can play WAV:', audio.canPlayType('audio/wav'));
```

**Check 4**: Sound too quiet?
```typescript
audio.volume = 1.0; // Max volume (0.0 to 1.0)
```

**Check 5**: Autoplay blocked by browser?
```
Modern browsers block autoplay until user interaction.
Our game requires user tap, so this should work!
```

---

### Sound Cuts Off?

**Solution**: Preload audio
```typescript
const successAudio = new Audio('/sounds/success.mp3');
successAudio.load(); // Preload

export const playSuccessSound = () => {
  successAudio.currentTime = 0;
  successAudio.play();
};
```

---

### Multiple Sounds Overlap?

**Solution**: Stop previous sound
```typescript
let currentAudio: HTMLAudioElement | null = null;

export const playSuccessSound = () => {
  // Stop previous sound
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  
  currentAudio = new Audio('/sounds/success.mp3');
  currentAudio.volume = 0.6;
  currentAudio.play();
};
```

---

## Browser Support

| Browser | MP3 | WAV | OGG |
|---------|-----|-----|-----|
| Chrome  | ✅  | ✅  | ✅  |
| Safari  | ✅  | ✅  | ❌  |
| Firefox | ✅  | ✅  | ✅  |
| Edge    | ✅  | ✅  | ✅  |

**Recommendation**: Use **MP3** for best compatibility.

---

## Example Audio Files to Create

### Success Sounds (Guitar):
1. **Quick Win**: Single note bend up → 0.5s
2. **Power Chord**: Quick E power chord strum → 1s
3. **Happy Lick**: G-A-B ascending → 1s
4. **Triumph**: Full C major chord → 1.5s
5. **Perfect**: Harmonics + delay effect → 2s

### Error Sound (Guitar):
1. **Wrong Note**: Single dissonant note → 0.5s
2. **Sad Trombone**: Descending E-D-C → 1s
3. **Muted Strings**: Dead string strum → 0.5s

---

## Pro Tips

### 1. Variety Prevents Fatigue
```typescript
// Use at least 3-5 different success sounds
const successSounds = [
  '/sounds/success1.mp3',
  '/sounds/success2.mp3', 
  '/sounds/success3.mp3',
  '/sounds/success4.mp3',
  '/sounds/success5.mp3',
];
// Random selection keeps game fresh!
```

### 2. Volume Balance
```typescript
// Success sounds slightly louder (exciting!)
successAudio.volume = 0.7;

// Error sounds softer (not punishing)
errorAudio.volume = 0.4;
```

### 3. Timing is Everything
- **Success**: Instant feedback (no delay)
- **Error**: Slight delay OK (gives time to process)

### 4. Mobile Optimization
- Test on phone speakers (not just headphones)
- Sounds should be clear at low volume
- Avoid very low/high frequencies

---

## Quick Reference

### Full Example with Your Files

```typescript
// /utils/audioPlayer.ts

// Your custom guitar riffs
const guitarRiffs = [
  '/sounds/guitar-success1.mp3',
  '/sounds/guitar-success2.mp3',
  '/sounds/guitar-success3.mp3',
];

export const playSuccessSound = () => {
  const randomRiff = guitarRiffs[Math.floor(Math.random() * guitarRiffs.length)];
  const audio = new Audio(randomRiff);
  audio.volume = 0.6;
  audio.play().catch(err => console.error('Error playing sound:', err));
};

export const playErrorSound = () => {
  const audio = new Audio('/sounds/guitar-error.mp3');
  audio.volume = 0.5;
  audio.play().catch(err => console.error('Error playing sound:', err));
};
```

---

## Next Steps

1. ✅ Record your guitar riffs (1-2 seconds each)
2. ✅ Save as MP3 files in `/public/sounds/`
3. ✅ Update `/utils/audioPlayer.ts` with new paths
4. ✅ Test in browser
5. ✅ Test on mobile device
6. ✅ Adjust volumes as needed
7. ✅ Show off your awesome musical learning game! 🎸

---

## Need Help?

**Common Questions**:

**Q: How many sounds should I create?**
A: Minimum 1 success + 1 error. Recommended: 3-5 success sounds for variety.

**Q: Can I use different instruments?**
A: Yes! Mix guitar, piano, drums, whatever sounds good!

**Q: What if my file is too large?**
A: Compress to MP3 128kbps, trim silence, keep under 50KB per file.

**Q: Sound too loud/quiet?**
A: Adjust `audio.volume` value (0.0 = mute, 1.0 = max).

---

**Have fun creating your musical jingles! 🎵🎸🎹**

The game is fully functional and waiting for your custom audio!
