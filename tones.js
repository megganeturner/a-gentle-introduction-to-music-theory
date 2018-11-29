// Playing a note
async function playNote(frequency, duration=0.5) {
	let ctxt = new AudioContext();
    let oscillator = ctxt.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, ctxt.currentTime);
    oscillator.connect(ctxt.destination);
    oscillator.start();
    return new Promise((resolve) => {
        setTimeout(() => {
            oscillator.stop();
            resolve();
        }, duration * 1000);
    });
}

await playNote(220);
await playNote(440);
await playNote(880);




// Playing all the notes

const TWELFTH_ROOT_TWO = 2 ** (1/12);

let current = 220;

for (let i = 0; i < 12; i++) {
  await playNote(current);
  current *= TWELFTH_ROOT_TWO;
}


// Playing a scale

const T = 2; // Tone
const S = 1; // Semi-tone
const MAJOR_SCALE = [T, T, S, T, T, T, S];

let currentFrequency = 220;

for (let step of MAJOR_SCALE) {
  await playNote(currentFrequency);
  currentFrequency *= TWELFTH_ROOT_TWO ** step;
}

const MINOR_SCALE = [T, S, T, T, S, T, T];

for (let step of MINOR_SCALE) {
  await playNote(currentFrequency);
  currentFrequency *= TWELFTH_ROOT_TWO ** step;
}
