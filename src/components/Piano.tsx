import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import '../styles/piano.css';
import { MIN_OCTAVE, MAX_OCTAVE, KEYBINDS, clamp, ADSR_DEFAULTS, REVERB_DEFAULTS } from '../constants/pianoConfig';
import { useSynth } from '../hooks/useSynth';
import ControlPanel from './ControlPanel/ControlPanel';
import { useKeybinds } from '../hooks/useKeybinds';
import { PauseContext } from '../contexts/PauseContext';

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const BLACK_KEY_MASK = 0x54a;

const Piano = () => {
  const [baseOctave, setBaseOctave] = useState<number>(4);
  const synth = useSynth({ waveform: 'square', adsr: ADSR_DEFAULTS, reverb: { active: false, ...REVERB_DEFAULTS } });
  const disabled = useContext(PauseContext);
  const prevDisabledRef = useRef(false);

  useEffect(() => {
    if (disabled && !prevDisabledRef.current) {
      synth.stopAll();
      synth.setConfig((prev) => ({ ...prev, sustain: false }));
    }
    if (disabled != prevDisabledRef.current) prevDisabledRef.current = disabled;
  }, [disabled, synth]);

  const shiftOctave = (delta: number) => {
    setBaseOctave((prev) => clamp(prev + delta, MIN_OCTAVE, MAX_OCTAVE));
    if (synth.config.sustain) synth.sustainAll();
    else synth.stopAll();
  };

  const onSustainRelease = () => {
    synth.setConfig((prev) => ({ ...prev, sustain: false }));
    synth.stopSustained();
  };

  const keys = useMemo(
    () =>
      Object.entries(KEYBINDS.Piano.keys).map(([keybind, text], index) => {
        const note = (baseOctave + 1) * 12 + index;
        return {
          keybind,
          note,
          name: `${NOTE_NAMES[note % 12]}${Math.floor(note / 12) - 1}`,
          text,
          isBlack: ((BLACK_KEY_MASK >> (note % 12)) & 1) === 1,
        };
      }),
    [baseOctave],
  );

  const whiteKeyCount = useMemo(
    () => Object.values(keys).reduce((count, key) => count + Number(!key.isBlack), 0),
    [keys],
  );

  useKeybinds(
    Object.fromEntries(
      keys.map(({ note, keybind }) => [
        keybind,
        { onKeyDown: () => synth.playNote(note), onKeyUp: () => synth.stopNote(note) },
      ]),
    ),
  );

  return (
    <div
      className='piano grid h-[75dvh] min-h-min min-w-min rounded-2xl gap-1 px-12'
      style={{ '--white-key-count': whiteKeyCount } as React.CSSProperties}
    >
      <ControlPanel
        baseOctave={baseOctave}
        shiftOctave={shiftOctave}
        config={synth.config}
        setConfig={synth.setConfig}
        onSustainRelease={onSustainRelease}
      />

      <div className='flex'>
        {keys.map(({ note, name, isBlack, text }) => (
          <button
            key={note}
            className={`flex flex-col justify-end font-bold pb-4 ${isBlack ? 'black' : 'white'}${synth.activeKeys.has(note) ? ' active' : ''}`}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              synth.playNote(note);
            }}
            onPointerUp={(e) => {
              e.currentTarget.releasePointerCapture(e.pointerId);
              e.currentTarget.blur();
              synth.stopNote(note);
            }}
            onPointerCancel={() => synth.stopNote(note)}
          >
            <span className='text-sm capitalize font-semibold opacity-50'>{text}</span>
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Piano;
