import type { ADSR, ReverbOptions } from '../hooks/useSynth';

type KeybindConfig = {
  keys: Record<string, string>;
  alt?: boolean;
  desc?: string;
  category?: (typeof KEYBIND_CATEGORIES)[number];
};
export const KEYBIND_CATEGORIES = ['General', 'Piano', 'Metronome', 'ADSR', 'Reverb'] as const;

export const KEYBINDS: Record<string, KeybindConfig> = {
  Piano: {
    keys: {
      Tab: 'Tab',
      Digit1: '1',
      KeyQ: 'q',
      Digit2: '2',
      KeyW: 'w',
      KeyE: 'e',
      Digit4: '4',
      KeyR: 'r',
      Digit5: '5',
      KeyT: 't',
      Digit6: '6',
      KeyY: 'y',
      KeyU: 'u',
      Digit8: '8',
      KeyI: 'i',
      Digit9: '9',
      KeyO: 'o',
      KeyP: 'p',
      Minus: '-',
      BracketLeft: '[',
      Equal: '=',
      BracketRight: ']',
      Backspace: '⌫',
      Backslash: '\\',
    },
  },

  HELP: { keys: { KeyH: 'H' }, desc: 'Open / close help guide', category: 'General' },
  TOGGLE_DARK_MODE: { keys: { Enter: 'Enter' }, desc: 'Switch between light / dark mode', category: 'General' },
  TOGGLE_ICON: { keys: { CapsLock: 'CapsLock' }, desc: 'Switch between icon sets', category: 'General' },
  RESET_ALL: { keys: { KeyA: 'A' }, desc: 'Reset all', category: 'General' },
  RANDOM_ALL: { keys: { KeyZ: 'Z' }, desc: 'Randomize all', category: 'General' },

  OCTAVE: {
    keys: { ShiftLeft: 'L Shift', ShiftRight: 'R Shift' },
    desc: 'Shift one octave down / up',
    category: 'Piano',
  },
  WAVEFORMS: {
    keys: { KeyM: 'M', Comma: ',', Period: '.', Slash: '/' },
    desc: 'Switch between waveforms',
    category: 'Piano',
  },

  TOGGLE_METRONOME: { keys: { KeyC: 'C' }, desc: 'Metronome on / off', category: 'Metronome' },
  RESET_METRONOME: { keys: { KeyD: 'D' }, desc: 'Reset Metronome values', category: 'Metronome' },
  BPM: {
    keys: { ArrowDown: '↓', ArrowUp: '↑' },
    alt: true,
    desc: 'Decrease / Increase BPM by 1 / 10',
    category: 'Metronome',
  },
  TIME_SIGNATURE: {
    keys: { ArrowLeft: '←', ArrowRight: '→' },
    alt: true,
    desc: 'Decrease / Increase beats per measures / note type',
    category: 'Metronome',
  },

  SUSTAIN: { keys: { Space: 'Space' }, desc: 'Sustain pedal', category: 'ADSR' },
  RESET_ADSR: { keys: { KeyS: 'S' }, desc: 'Reset ADSR values', category: 'ADSR' },
  RANDOM_ADSR: { keys: { KeyX: 'X' }, desc: 'Randomize ADSR values', category: 'ADSR' },

  TOGGLE_REVERB: { keys: { KeyG: 'G' }, desc: 'Reverb on / off', category: 'Reverb' },
  RESET_REVERB: { keys: { KeyF: 'F' }, desc: 'Reset Reverb values', category: 'Reverb' },
  RANDOM_REVERB: { keys: { KeyV: 'V' }, desc: 'Randomize Reverb values', category: 'Reverb' },
};

export const MAX_OCTAVE = 6;
export const MIN_OCTAVE = 1;
export const e = 0.05;
export const DEFAULT_DICE_VALUE = 4;
export const ADSR_DEFAULTS: ADSR = { volume: 0.3, attack: e, decay: 0, sustain: 1, release: e };
export const REVERB_DEFAULTS: Omit<ReverbOptions, 'active'> = { volume: 0.5, duration: 2, decay: 2 };

export const toRadians = (angle: number) => angle * (Math.PI / 180);
export const modulo = (num: number, divisor: number) => ((num % divisor) + divisor) % divisor;

export const clamp = (num: number, min?: number, max?: number) =>
  min !== undefined
    ? max !== undefined
      ? Math.min(Math.max(num, min), max)
      : Math.max(num, min)
    : max !== undefined
      ? Math.min(num, max)
      : num;

export const randomRange = (min: number, max: number, step?: number) => {
  if (!step) return Math.random() * (max - min) + min;
  const value = Math.floor(Math.random() * (Math.round((max - min) / step) + 1)) * step + min;
  const decimals = (step.toString().split('.')[1] || '').length;
  return Number(value.toFixed(decimals));
};

export function range(start: number, stop?: number, step = 1): number[] {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }
  const length = Math.max(Math.ceil((stop - start) / step), 0);
  return Array.from({ length }, (_, i) => start + i * step);
}
