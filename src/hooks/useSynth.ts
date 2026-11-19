import { useState, useRef, useEffect } from 'react';
import { e } from '../constants/pianoConfig';
import { getAudioContext, getConvolver } from '../constants/synth';

export type ADSR = {
  volume: number;
  attack: number; // Time to reach peak
  decay: number; // Time to drop to sustain level
  sustain: number; // Gain level (0 to 1) while held
  release: number; // release - Time to fade to 0 on note stop
};

type AudioNode = { osc: OscillatorNode; gain: GainNode };
type RampType = 'linear' | 'exponential';
export type ReverbOptions = { active: boolean; volume: number; duration: number; decay: number };
export type Config = { waveform: OscillatorType; sustain: boolean; adsr: ADSR; reverb: ReverbOptions };

type Props = {
  waveform: OscillatorType;
  adsr?: Partial<ADSR>;
  rampType?: RampType;
  reverb?: ReverbOptions;
};

export const useSynth = ({ rampType = 'linear', waveform, adsr, reverb }: Props) => {
  const activeAudioNodes = useRef<Map<number, AudioNode & { isHeld: boolean }>>(new Map());
  const [activeKeys, setActiveKeys] = useState<Set<number>>(new Set());
  const [config, setConfig] = useState<Config>({
    waveform,
    sustain: false,
    adsr: {
      volume: adsr?.volume ?? 0,
      attack: adsr?.attack ?? 0,
      decay: adsr?.decay ?? 0,
      sustain: adsr?.sustain ?? 0,
      release: adsr?.release ?? 0,
    },
    reverb: {
      active: reverb?.active ?? false,
      volume: reverb?.volume ?? 0,
      duration: reverb?.duration ?? 0,
      decay: reverb?.decay ?? 0,
    },
  });

  const play = (frequency: number, time?: number): AudioNode => {
    const { waveform, reverb, adsr } = config;
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    time = time ?? ctx.currentTime;

    osc.type = waveform;
    osc.frequency.setValueAtTime(frequency, time);

    const sustainGain = adsr.volume * adsr.sustain;
    const startValue = rampType === 'exponential' ? 0.0001 : 0;

    gain.gain.setValueAtTime(startValue, time);

    if (rampType == 'exponential') {
      gain.gain.exponentialRampToValueAtTime(Math.max(adsr.volume, 0.0001), time + adsr.attack);
      gain.gain.exponentialRampToValueAtTime(Math.max(sustainGain, 0.0001), time + adsr.attack + adsr.decay);
    } else {
      gain.gain.linearRampToValueAtTime(adsr.volume, time + adsr.attack);
      gain.gain.linearRampToValueAtTime(sustainGain, time + adsr.attack + adsr.decay);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);

    let reverbGain = null;
    if (reverb?.active) {
      const convolver = getConvolver(reverb.duration, reverb.decay);
      reverbGain = ctx.createGain();
      reverbGain.gain.value = reverb.volume;

      // Route: source -> main gain -> convolver -> wet gain -> destination
      gain.connect(convolver);
      convolver.connect(reverbGain);
      reverbGain.connect(ctx.destination);
    }

    osc.start(time);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
      if (reverb && reverbGain) setTimeout(reverbGain.disconnect, (reverb.duration + e) * 1000);
    };

    return { osc, gain };
  };

  const playNote = (note: number, time?: number) => {
    if (!activeKeys.has(note)) setActiveKeys((prev) => new Set(prev).add(note));
    const node = activeAudioNodes.current.get(note) ?? play(440 * Math.pow(2, (note - 69) / 12), time);
    activeAudioNodes.current.set(note, { ...node, isHeld: true });
  };

  const stopNote = (note: number, isSustain?: boolean, time?: number) => {
    time = time ?? getAudioContext().currentTime;
    const sustain = isSustain ?? config.sustain;

    if (!sustain && activeKeys.has(note)) {
      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.delete(note);
        return next;
      });
    }

    const node = activeAudioNodes.current.get(note);
    if (!node) return;

    if (sustain) node.isHeld = false;
    else {
      activeAudioNodes.current.delete(note);
      const { osc, gain } = node;
      const stopTime = time + config.adsr.release;

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
    [...activeAudioNodes.current.keys()].forEach((note) => stopNote(note, false));
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
    config,
    setConfig,
  };
};
