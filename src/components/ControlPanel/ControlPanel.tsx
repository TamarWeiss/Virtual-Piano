import { useState } from 'react';
import '../../styles/controlPanel.css';
import { MAX_OCTAVE, MIN_OCTAVE, waveforms } from '../../constants/pianoConfig';
import OctaveButton from '../Buttons/OctaveButton';
import WaveformButton from '../Buttons/WaveformButton';
import Metronome from './Metronome';
import NumberInput from '../Input/NumberInput';
import { useKeybinds } from '../../hooks/useKeybinds';
import Reverb from './Reverb';
import type { ADSR, ReverbOptions } from '../../hooks/useSynth';
import ADSRPanel from './ADSR';

type props = {
  baseOctave: number;
  shiftOctave: (delta: number) => void;
  waveform: OscillatorType;
  setWaveform: React.Dispatch<React.SetStateAction<OscillatorType>>;
  sustain: boolean;
  onSustainDown: () => void;
  onSustainRelease: () => void;
  reverb: ReverbOptions;
  setReverb: React.Dispatch<React.SetStateAction<ReverbOptions>>;
  adsr: ADSR;
  setADSR: React.Dispatch<React.SetStateAction<ADSR>>;
};

const ControlPanel = ({ setReverb, shiftOctave, ...props }: props) => {
  const [alt, setAlt] = useState<boolean>(false);
  const [isShift, setIsShift] = useState<-1 | 0 | 1>();

  useKeybinds({
    KeyZ: { onKeyDown: () => setReverb((prev) => ({ ...prev, active: !prev.active })) },
    KeyA: { onKeyDown: () => setAlt((alt) => !alt) },
    ShiftLeft: {
      onKeyDown: () => {
        setIsShift(-1);
        shiftOctave(-1);
      },
      onKeyUp: () => setIsShift(0),
    },
    ShiftRight: {
      onKeyDown: () => {
        setIsShift(1);
        shiftOctave(1);
      },
      onKeyUp: () => setIsShift(0),
    },
  });

  return (
    <div className='flex items-center justify-between py-2 gap-4'>
      <div className='module octave-module'>
        <OctaveButton text='-' isActive={isShift == -1} onClick={() => shiftOctave(-1)} />
        <NumberInput
          id='octave'
          value={props.baseOctave}
          className='display rounded-none px-3'
          min={MIN_OCTAVE}
          max={MAX_OCTAVE}
          onChange={(num) => shiftOctave(num - props.baseOctave)}
        />
        <OctaveButton text='+' isActive={isShift == 1} onClick={() => shiftOctave(1)} />
      </div>

      <ADSRPanel
        sustain={props.sustain}
        onSustainDown={props.onSustainDown}
        onSustainRelease={props.onSustainRelease}
        adsr={props.adsr}
        setADSR={props.setADSR}
      />
      <Metronome />
      <Reverb reverb={props.reverb} setReverb={setReverb} />

      <div className='module waveform-module'>
        {waveforms.map(({ type, icon, alt: altIcon }) => (
          <WaveformButton
            key={type}
            waveform={type}
            isActive={type == props.waveform}
            Icon={alt ? altIcon : icon}
            onClick={props.setWaveform}
          />
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;
