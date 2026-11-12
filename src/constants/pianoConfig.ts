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
  Backspace: '←',
  Backslash: '\\',
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
export const MIN_INTERVAL = 0.1;
export const e = 0.05;
export const DEFAULT_DICE_VALUE = 4;

export const ADSR_DEFAULTS: ADSR = { volume: 0.3, attack: e, decay: 0, sustain: 1, release: e };
export const REVERB_DEFAULTS: Omit<ReverbOptions, 'active'> = { volume: 0.5, duration: 2, decay: 2 };

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
