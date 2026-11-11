import { useEffect, useMemo, useState } from 'react';
import '../styles/piano.css';
import { MIN_OCTAVE, MAX_OCTAVE, KEY_MAPPING, clamp, ADSR_DEFAULTS, REVERB_DEFAULTS } from '../constants/pianoConfig';
import { useSynth } from '../hooks/useSynth';
import PianoKey from './Buttons/PianoKey';
import ControlPanel from './ControlPanel/ControlPanel';
import { useKeybinds, type KeyBind } from '../hooks/useKeybinds';

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const BLACK_KEY_MASK = 0x54a;

const Piano = () => {
  const [baseOctave, setBaseOctave] = useState<number>(4);
  const synth = useSynth({
    waveform: 'square',
    volume: 0.3,
    adsr: ADSR_DEFAULTS,
    reverb: { active: false, ...REVERB_DEFAULTS },
  });

  useEffect(() => {
    // Check if the click target is a button (or inside a button)
    // prevent releasing space from retrigerring a focused button
    const handlePointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('button')) e.preventDefault();
    };
    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

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
      Object.entries(KEY_MAPPING).map(([keybind, text], index) => {
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

  const noteKeybinds: Record<string, KeyBind> = Object.fromEntries(
    keys.map(({ note, keybind }) => [
      keybind,
      { onKeyDown: () => synth.playNote(note), onKeyUp: () => synth.stopNote(note) },
    ]),
  );

  useKeybinds(noteKeybinds);

  return (
    <div className='piano' style={{ '--white-key-count': whiteKeyCount } as React.CSSProperties}>
      <ControlPanel
        baseOctave={baseOctave}
        shiftOctave={shiftOctave}
        config={synth.config}
        setConfig={synth.setConfig}
        onSustainRelease={onSustainRelease}
      />

      <div className='flex'>
        {keys.map(({ note, name, isBlack, text }) => (
          <PianoKey
            key={note}
            note={note}
            name={name}
            keybind={text}
            isBlack={isBlack}
            isActive={synth.activeKeys.has(note)}
            onNoteStart={synth.playNote}
            onNoteEnd={(note) => synth.stopNote(note)}
          />
        ))}
      </div>
    </div>
  );
};

export default Piano;
