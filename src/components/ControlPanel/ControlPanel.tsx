import { useCallback, useState } from 'react';
import '../../styles/controlPanel.css';
import { MAX_OCTAVE, MIN_OCTAVE, waveforms } from '../../constants/pianoConfig';
import OctaveButton from '../Buttons/OctaveButton';
import WaveformButton from '../Inputs/WaveformButton';
import Metronome from './Metronome';
import NumberInput from '../Inputs/NumberInput';
import { useKeybinds } from '../../hooks/useKeybinds';
import Reverb from './Reverb';
import type { ADSR, Config, ReverbOptions } from '../../hooks/useSynth';
import ADSRPanel from './ADSR';

type props = {
  baseOctave: number;
  shiftOctave: (delta: number) => void;
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
  onSustainRelease: () => void;
};

const ControlPanel = ({ baseOctave, shiftOctave, config, setConfig, onSustainRelease }: props) => {
  const [alt, setAlt] = useState<boolean>(true);

  const setADSR = useCallback(
    (adsr: Partial<ADSR>) => setConfig((prev) => ({ ...prev, adsr: { ...prev.adsr, ...adsr } })),
    [setConfig],
  );

  const setReverb = useCallback(
    (reverb: Partial<ReverbOptions>) => setConfig((prev) => ({ ...prev, reverb: { ...prev.reverb, ...reverb } })),
    [setConfig],
  );

  useKeybinds({ CapsLock: { onKeyDown: () => setAlt((alt) => !alt) } });

  return (
    <div className='flex items-center justify-between py-2 gap-4'>
      <div className='module octave-module'>
        <OctaveButton text='-' onClick={() => shiftOctave(-1)} keybinds={['ShiftLeft']} />
        <NumberInput
          id='octave'
          value={baseOctave}
          className='display rounded-none px-3'
          min={MIN_OCTAVE}
          max={MAX_OCTAVE}
          onChange={(num) => shiftOctave(num - baseOctave)}
        />
        <OctaveButton text='+' onClick={() => shiftOctave(1)} keybinds={['ShiftRight']} />
      </div>

      <ADSRPanel
        sustain={config.sustain}
        onSustainDown={() => setConfig((prev) => ({ ...prev, sustain: true }))}
        onSustainRelease={onSustainRelease}
        adsr={config.adsr}
        setADSR={setADSR}
        alt={alt}
      />
      <Metronome />
      <Reverb reverb={config.reverb} setReverb={setReverb} alt={alt} />

      <div className='module waveform-module'>
        {waveforms.map(({ type, icon, alt: altIcon }) => (
          <WaveformButton
            key={type}
            id={type}
            value={type}
            currentValue={config.waveform}
            Icon={alt ? altIcon : icon}
            onChange={(waveform) => setConfig((prev) => ({ ...prev, waveform }))}
          />
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;
