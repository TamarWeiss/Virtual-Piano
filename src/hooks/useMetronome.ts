import { useRef, useEffect, useState } from 'react';
import { e, MIN_INTERVAL } from '../constants/pianoConfig';
import { useSynth } from './useSynth';
import { getAudioContext } from '../constants/synth';

const UPBEAT = 86; //note 86 (D6) //1200
const DOWNBEAT = 79; //note 79 (G5) //800

export type TimeSignature = [number, number];
export enum FlashState {
  OFF,
  ON,
  ACCENT,
}

export const useMetronome = (bpm: number, timeSignature: TimeSignature) => {
  const { playNote, stopNote } = useSynth({ waveform: 'sine', rampType: 'exponential', adsr: { volume: 1, decay: e } });
  const config = useRef({ bpm, timeSignature, beatCount: 0, timers: new Set<number>() });
  const [flashState, setFlashState] = useState<FlashState>(FlashState.OFF);

  useEffect(() => {
    config.current.bpm = bpm;
    config.current.timeSignature = timeSignature;
    if (config.current.beatCount >= timeSignature[0]) config.current.beatCount = 0;
  }, [bpm, timeSignature]);

  const timeout = (handler: () => void, timeout: number) => {
    const timer = setTimeout(() => {
      config.current.timers.delete(timer);
      handler();
    }, timeout);

    config.current.timers.add(timer);
    return timer;
  };

  const playClick = (note: number, time: number) => {
    playNote(note, time);
    stopNote(note, false, time + e);
  };

  const flash = (scheduledAudioTime: number, duration: number, isAccent: boolean, ctx: AudioContext) => {
    const delay = Math.max(0, (scheduledAudioTime - ctx.currentTime) * 1000);

    timeout(() => {
      setFlashState(isAccent ? FlashState.ACCENT : FlashState.ON);
      timeout(() => setFlashState(FlashState.OFF), duration * 1000);
    }, delay);
  };

  const startMetronome = () => {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    let nextNoteTime = ctx.currentTime + e;
    config.current.beatCount = 0;

    const loop = () => {
      const [beatPerMeasure, noteType] = config.current.timeSignature;

      //check if any notes need to be play in the following 100ms.
      // while loop is a safety net for browser lag. on normal conditions it doesn't run more than once.
      while (nextNoteTime < ctx.currentTime + MIN_INTERVAL) {
        const isAccent = config.current.beatCount == 0;
        const duration = (60.0 / config.current.bpm) * (4 / noteType);

        flash(nextNoteTime, duration / 2, isAccent, ctx);
        playClick(isAccent ? UPBEAT : DOWNBEAT, nextNoteTime);

        nextNoteTime += duration;
        config.current.beatCount = ++config.current.beatCount % beatPerMeasure;
      }

      timeout(loop, (MIN_INTERVAL * 1000) / 4);
    };

    loop();
  };

  const stopMetronome = () => {
    setFlashState(FlashState.OFF);
    config.current.timers.forEach(clearTimeout);
    config.current.timers.clear();
  };

  useEffect(() => {
    return () => stopMetronome();
  }, []);

  return { flashState, startMetronome, stopMetronome };
};
