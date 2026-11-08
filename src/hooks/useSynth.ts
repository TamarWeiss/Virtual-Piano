import { useState, useRef, useEffect, useMemo } from 'react';
import { midiToFrequency as midiToFrequency } from '../constants/pianoConfig';

type ADSR = {
  attack: number; // Time to reach peak
  decay: number; // Time to drop to sustain level
  sustain: number; // Gain level (0 to 1) while held
  release: number; // release - Time to fade to 0 on note stop
};

type AudioNode = { osc: OscillatorNode; gain: GainNode };
type RampType = 'linear' | 'exponential';

type PlayParams = {
  frequency: number;
  waveform: OscillatorType;
  adsr: Omit<ADSR, 'release'>;
  volume: number;
  time?: number;
  reverb?: boolean;
  rampType?: RampType;
};

type Props = {
  volume: number;
  waveform: OscillatorType;
  adsr?: Partial<ADSR>;
  rampType?: RampType;
  reverb?: boolean;
};

let audioContext: AudioContext | null = null;
let convolver: ConvolverNode | null = null;

export const useSynth = (props: Props) => {
  const { volume, rampType = 'linear' } = props;
  const adsr: ADSR = useMemo(
    () => ({
      attack: props.adsr?.attack ?? 0,
      decay: props.adsr?.decay ?? 0,
      sustain: props.adsr?.sustain ?? 0,
      release: props.adsr?.release ?? 0,
    }),
    [props.adsr],
  );

  const [activeKeys, setActiveKeys] = useState<Set<number>>(new Set());
  const [waveform, setWaveform] = useState<OscillatorType>(props.waveform);
  const [reverb, setReverb] = useState(Boolean(props.reverb));
  const [sustain, setSustain] = useState(false);
  const activeAudioNodes = useRef<Map<number, AudioNode & { isHeld: boolean }>>(new Map());
  const ref = useRef({ adsr });

  useEffect(() => {
    ref.current.adsr = adsr;
  }, [adsr]);

  const getAudioContext = () => {
    if (!audioContext) audioContext = new AudioContext();
    return audioContext;
  };

  const createReverbBuffer = (duration = 2, decay = 2): AudioBuffer => {
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

  const getConvolver = (): ConvolverNode => {
    if (!convolver) {
      const ctx = getAudioContext();
      convolver = ctx.createConvolver();
      convolver.buffer = createReverbBuffer();
    }
    return convolver;
  };

  const play = ({ frequency, waveform, time, reverb, adsr, rampType, volume }: PlayParams): AudioNode => {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    time = time ?? ctx.currentTime;

    osc.type = waveform;
    osc.frequency.setValueAtTime(frequency, time);

    const sustainGain = volume * adsr.sustain;
    const startValue = rampType === 'exponential' ? 0.0001 : 0;

    gain.gain.setValueAtTime(startValue, time);

    // ATTACK: Ramp up to peak volume
    // DECAY: Ramp down to the sustain level
    if (rampType == 'exponential') {
      gain.gain.exponentialRampToValueAtTime(Math.max(volume, 0.0001), time + adsr.attack);
      gain.gain.exponentialRampToValueAtTime(Math.max(sustainGain, 0.0001), time + adsr.attack + adsr.decay);
    } else {
      gain.gain.linearRampToValueAtTime(volume, time + adsr.attack);
      gain.gain.linearRampToValueAtTime(sustainGain, time + adsr.attack + adsr.decay);
    }

    osc.connect(gain);
    gain.connect(ctx.destination); // Dry path

    if (reverb) {
      const convolver = getConvolver();
      const reverbGain = ctx.createGain();

      reverbGain.gain.value = 0.1; // Adjust this value (0 to 1) to control how wet/reverberant it sounds

      // Route: source -> main gain -> convolver -> wet gain -> destination
      gain.connect(convolver);
      convolver.connect(reverbGain);
      reverbGain.connect(ctx.destination);
    }

    osc.start(time);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };

    return { osc, gain };
  };

  const playNote = (note: number, time?: number) => {
    if (!activeKeys.has(note)) setActiveKeys((prev) => new Set(prev).add(note));

    const node =
      activeAudioNodes.current.get(note) ??
      play({
        frequency: midiToFrequency(note),
        waveform: waveform,
        adsr: ref.current.adsr,
        time,
        volume,
        rampType,
        reverb,
      });

    activeAudioNodes.current.set(note, { ...node, isHeld: true }); // Save reference so we can stop it later
  };

  const stopNote = (note: number, isSustain?: boolean, time?: number) => {
    time = time ?? getAudioContext().currentTime;
    const sustain2 = isSustain ?? sustain;

    if (!sustain2 && activeKeys.has(note)) {
      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.delete(note);
        return next;
      });
    }

    const node = activeAudioNodes.current.get(note);
    if (!node) return;

    if (sustain2) node.isHeld = false;
    else {
      activeAudioNodes.current.delete(note);
      const { osc, gain } = node;
      const stopTime = time + ref.current.adsr.release;

      gain.gain.setValueAtTime(gain.gain.value, time);
      gain.gain.linearRampToValueAtTime(0, stopTime);
      osc.stop(stopTime);
    }
  };

  const stopSustained = () => {
    activeAudioNodes.current.forEach((node, note) => {
      if (!node.isHeld) stopNote(note, false);
    });
  };

  const sustainAll = () => {
    activeAudioNodes.current.forEach((node) => {
      node.isHeld = false;
    });
  };

  const stopAll = () => {
    [...activeAudioNodes.current.keys()].forEach((note) => stopNote(note));
  };

  useEffect(() => {
    const nodes = activeAudioNodes.current;
    return () => nodes.forEach(({ osc }) => osc.stop());
  }, []);

  return {
    activeKeys,
    playNote,
    stopNote,
    stopAll,
    stopSustained,
    sustainAll,
    waveform,
    setWaveform,
    reverb,
    setReverb,
    sustain,
    setSustain,
    getAudioContext,
  };
};
