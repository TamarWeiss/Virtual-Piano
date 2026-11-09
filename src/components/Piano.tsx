import { useEffect, useMemo, useState } from 'react';
import '../styles/piano.css';
import { MIN_OCTAVE, MAX_OCTAVE, KEY_MAPPING, clamp, e } from '../constants/pianoConfig';
import { useSynth } from '../hooks/useSynth';
import PianoKey from './Buttons/PianoKey';
import ControlPanel from './ControlPanel/ControlPanel';
import { useKeybinds } from '../hooks/useKeybinds';
import type { KeyBind } from '../hooks/KeybindContext';

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const BLACK_KEY_MASK = 0x54a;

const Piano = () => {
  const [baseOctave, setBaseOctave] = useState<number>(4);
  const synth = useSynth({
    waveform: 'square',
    volume: 0.3,
    adsr: { attack: e, sustain: 1, release: e },
    reverb: { active: false, volume: 0.5, duration: 2, decay: 2 },
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
    if (synth.sustain) synth.sustainAll();
    else synth.stopAll();
  };

  const onSustainRelease = () => {
    synth.setSustain(false);
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
      {
        onKeyDown: () => synth.playNote(note),
        onKeyUp: () => synth.stopNote(note),
      },
    ]),
  );

  useKeybinds({
    ...noteKeybinds,
    Space: {
      onKeyDown: () => synth.setSustain(true),
      onKeyUp: onSustainRelease,
    },
  });

  return (
    <div className='piano' style={{ '--white-key-count': whiteKeyCount } as React.CSSProperties}>
      <ControlPanel
        baseOctave={baseOctave}
        shiftOctave={shiftOctave}
        waveform={synth.waveform}
        setWaveform={synth.setWaveform}
        sustain={synth.sustain}
        onSustainDown={() => synth.setSustain(true)}
        onSustainRelease={onSustainRelease}
        reverb={synth.reverb}
        setReverb={synth.setReverb}
        adsr={synth.ADSR}
        setADSR={synth.setADSR}
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
