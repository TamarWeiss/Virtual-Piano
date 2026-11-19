import type { ADSR, ReverbOptions } from '../hooks/useSynth';

export const KEY_MAPPING: Record<string, string> = {
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
};

export const KEYBIND_CATEGORIES = ['General', 'Piano', 'Metronome', 'ADSR', 'Reverb'] as const;

export const KEYBINDS = {
  HELP: { code: ['KeyH'], text: ['H'], alt: false, desc: 'Open / close help guide', category: 'General' },
  TOGGLE_DARK_MODE: {
    code: ['Enter'],
    text: ['Enter'],
    alt: false,
    desc: 'Switch between light / dark mode',
    category: 'General',
  },
  TOGGLE_ICON: {
    code: ['CapsLock'],
    text: ['CapsLock'],
    alt: false,
    desc: 'Switch between icon sets',
    category: 'General',
  },
  RESET_ALL: { code: ['KeyA'], text: ['A'], alt: false, desc: 'Reset all', category: 'General' },
  RANDOM_ALL: { code: ['KeyZ'], text: ['Z'], alt: false, desc: 'Randomize all', category: 'General' },
  OCTAVE: {
    code: ['ShiftLeft', 'ShiftRight'],
    text: ['Left Shift', 'Right Shift'],
    alt: false,
    desc: 'Shift one octave down / up',
    category: 'Piano',
  },
  WAVEFORMS: {
    code: ['KeyM', 'Comma', 'Period', 'Slash'],
    text: ['M', ',', '.', '/'],
    alt: false,
    desc: 'Switch between waveforms',
    category: 'Piano',
  },
  TOGGLE_METRONOME: { code: ['KeyC'], text: ['C'], alt: false, desc: 'Metronome on / off', category: 'Metronome' },
  RESET_METRONOME: { code: ['KeyD'], text: ['D'], alt: false, desc: 'Reset Metronome values', category: 'Metronome' },
  BPM: {
    code: ['ArrowDown', 'ArrowUp'],
    text: ['↓', '↑'],
    alt: true,
    desc: 'Decrease / Increase BPM by 1 / 10',
    category: 'Metronome',
  },
  TIME_SIGNATURE: {
    code: ['ArrowLeft', 'ArrowRight'],
    text: ['←', '→'],
    alt: true,
    desc: 'Decrease / Increase beats per measures / note type',
    category: 'Metronome',
  },

  SUSTAIN: { code: ['Space'], text: ['Space'], alt: false, desc: 'Sustain pedal', category: 'ADSR' },
  RESET_ADSR: { code: ['KeyS'], text: ['S'], alt: false, desc: 'Reset ADSR values', category: 'ADSR' },
  RANDOM_ADSR: { code: ['KeyX'], text: ['X'], alt: false, desc: 'Randomize ADSR values', category: 'ADSR' },
  TOGGLE_REVERB: { code: ['KeyG'], text: ['G'], alt: false, desc: 'Reverb on / off', category: 'Reverb' },
  RESET_REVERB: { code: ['KeyF'], text: ['F'], alt: false, desc: 'Reset Reverb values', category: 'Reverb' },
  RANDOM_REVERB: { code: ['KeyV'], text: ['V'], alt: false, desc: 'Randomize Reverb values', category: 'Reverb' },
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
