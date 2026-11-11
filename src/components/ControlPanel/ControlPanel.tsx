import { useState } from 'react';
import '../../styles/controlPanel.css';
import { MAX_OCTAVE, MIN_OCTAVE, waveforms } from '../../constants/pianoConfig';
import OctaveButton from '../Buttons/OctaveButton';
import WaveformButton from '../Buttons/WaveformButton';
import Metronome from './Metronome';
import NumberInput from '../Input/NumberInput';
import { useKeybinds } from '../../hooks/useKeybinds';
import Reverb from './Reverb';
import type { Config } from '../../hooks/useSynth';
import ADSRPanel from './ADSR';

type props = {
  baseOctave: number;
  shiftOctave: (delta: number) => void;
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
  onSustainRelease: () => void;
};

const ControlPanel = ({ baseOctave, shiftOctave, config, setConfig, onSustainRelease }: props) => {
  const [alt, setAlt] = useState<boolean>(false);
  const [isShift, setIsShift] = useState<-1 | 0 | 1>();

  useKeybinds({
    CapsLock: { onKeyDown: () => setAlt((alt) => !alt) },
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
          value={baseOctave}
          className='display rounded-none px-3'
          min={MIN_OCTAVE}
          max={MAX_OCTAVE}
          onChange={(num) => shiftOctave(num - baseOctave)}
        />
        <OctaveButton text='+' isActive={isShift == 1} onClick={() => shiftOctave(1)} />
      </div>

      <ADSRPanel
        sustain={config.sustain}
        onSustainDown={() => setConfig((prev) => ({ ...prev, sustain: true }))}
        onSustainRelease={onSustainRelease}
        adsr={config.adsr}
        setADSR={(adsr) => setConfig((prev) => ({ ...prev, adsr: { ...prev.adsr, ...adsr } }))}
      />
      <Metronome />
      <Reverb
        reverb={config.reverb}
        setReverb={(reverb) => setConfig((prev) => ({ ...prev, reverb: { ...prev.reverb, ...reverb } }))}
      />

      <div className='module waveform-module'>
        {waveforms.map(({ type, icon, alt: altIcon }) => (
          <WaveformButton
            key={type}
            waveform={type}
            isActive={type == config.waveform}
            Icon={alt ? altIcon : icon}
            onClick={(waveform) => setConfig((prev) => ({ ...prev, waveform }))}
          />
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;
