let audioContext: AudioContext | null = null;
let convolver: { duration: number; decay: number; node: ConvolverNode } | null = null;

export const getAudioContext = () => {
  if (!audioContext) audioContext = new AudioContext();
  return audioContext;
};

export const createReverbBuffer = (duration: number, decay: number): AudioBuffer => {
  duration = Math.max(duration, 0.0001);
  const ctx = getAudioContext();
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * duration;
  const impulse = ctx.createBuffer(2, length, sampleRate);
  const left = impulse.getChannelData(0);
  const right = impulse.getChannelData(1);

  for (let i = 0; i < length; i++) {
    // Generate white noise decaying exponentially
    left[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    right[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
  }

  return impulse;
};

export const getConvolver = (duration: number, decay: number): ConvolverNode => {
  if (!convolver || duration != convolver.duration || decay != convolver.decay) {
    const ctx = getAudioContext();
    convolver = { duration, decay, node: convolver?.node ?? ctx.createConvolver() };
    convolver.node.buffer = createReverbBuffer(duration, decay);
  }
  return convolver.node;
};
