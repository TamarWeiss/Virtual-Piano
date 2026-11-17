import type { ADSR, ReverbOptions } from '../hooks/useSynth';
import {
  SawtoothAltIcon,
  SawtoothIcon,
  SineAltIcon,
  SineIcon,
  SquareAltIcon,
  SquareIcon,
  TriangleAltIcon,
  TriangleIcon,
} from './icons';

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

type KeybindConfig = {
  code: string;
  text: string;
  desc: string;
  alt?: boolean;
};

export const KEYBINDS: Record<string, KeybindConfig> = {
  HELP: { code: 'KeyH', text: 'H', desc: 'Open / close help guide' },
  TOGGLE_DARK_MODE: { code: 'Enter', text: 'Enter', desc: 'Switch between light / dark modes' },
  TOGGLE_ICON: { code: 'CapsLock', text: 'CapsLock', desc: 'Switch between icon sets' },

  OCTAVE_UP: { code: 'ShiftRight', text: 'Right Shift', desc: 'Shift one octave up' },
  OCTAVE_DOWN: { code: 'ShiftLeft', text: 'Left Shift', desc: 'Shift one octave down' },
  BPM_UP: { code: 'ArrowUp', text: '↑', alt: true, desc: 'Increase BPM by 1 / 10' },
  BPM_DOWN: { code: 'ArrowDown', text: '↓', alt: true, desc: 'Decrease BPM by 1 / 10' },
  TIME_SIGNATURE_UP: { code: 'ArrowRight', text: '→', alt: true, desc: 'Increase beats per measures / note type' },
  TIME_SIGNATURE_DOWN: { code: 'ArrowLeft', text: '←', alt: true, desc: 'Decrease beats per measure / note type' },

  SUSTAIN: { code: 'Space', text: 'Space', desc: 'Sustain pedal' },
  TOGGLE_METRONOME: { code: 'KeyC', text: 'C', desc: 'Metronome on / off' },
  TOGGLE_REVERB: { code: 'KeyG', text: 'G', desc: 'Reverb on / off' },

  RESET_ALL: { code: 'KeyA', text: 'A', desc: 'Reset all' },
  RESET_ADSR: { code: 'KeyS', text: 'S', desc: 'Reset ADSR values' },
  RESET_METRONOME: { code: 'KeyD', text: 'D', desc: 'Reset Metronome values' },
  RESET_REVERB: { code: 'KeyF', text: 'F', desc: 'Reset Reverb values' },

  RANDOM_ALL: { code: 'KeyZ', text: 'Z', desc: 'Randomize all' },
  RANDOM_ADSR: { code: 'KeyX', text: 'X', desc: 'Randomize ADSR values' },
  RANDOM_REVERB: { code: 'KeyV', text: 'V', desc: 'Randomize Reverb values' },
};

type WaveformData = {
  type: OscillatorType;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  alt: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const waveforms: WaveformData[] = [
  { type: 'triangle', icon: TriangleIcon, alt: TriangleAltIcon },
  { type: 'sine', icon: SineIcon, alt: SineAltIcon },
  { type: 'sawtooth', icon: SawtoothIcon, alt: SawtoothAltIcon },
  { type: 'square', icon: SquareIcon, alt: SquareAltIcon },
];

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
