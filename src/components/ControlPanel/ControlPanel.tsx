import { useCallback, useState } from 'react';
import { KEYBINDS } from '../../constants/pianoConfig';
import OctaveModule from './OctaveModule';
import WaveformButton from '../Inputs/WaveformButton';
import Metronome from './Metronome';
import { useKeybinds } from '../../hooks/useKeybinds';
import Reverb from './Reverb';
import type { ADSR, Config, ReverbOptions } from '../../hooks/useSynth';
import ADSRPanel from './ADSR';
import {
  SawtoothAltIcon,
  SawtoothIcon,
  SineAltIcon,
  SineIcon,
  SquareAltIcon,
  SquareIcon,
  TriangleAltIcon,
  TriangleIcon,
} from '../../constants/icons';

type props = {
  baseOctave: number;
  shiftOctave: (delta: number) => void;
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
  onSustainRelease: () => void;
};

const waveforms = [
  { type: 'triangle', icon: TriangleIcon, alt: TriangleAltIcon },
  { type: 'sine', icon: SineIcon, alt: SineAltIcon },
  { type: 'sawtooth', icon: SawtoothIcon, alt: SawtoothAltIcon },
  { type: 'square', icon: SquareIcon, alt: SquareAltIcon },
];

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

  useKeybinds({ [Object.keys(KEYBINDS.TOGGLE_ICON.keys)[0]]: { onKeyDown: () => setAlt((alt) => !alt) } });

  return (
    <div className='flex items-center justify-between py-2 gap-2'>
      <OctaveModule baseOctave={baseOctave} shiftOctave={shiftOctave} />
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

      <div className='module waveform-module grid gap-2 min-h-min'>
        {waveforms.map(({ type, icon, alt: altIcon }, i) => (
          <WaveformButton
            key={type}
            id={type}
            value={type as OscillatorType}
            currentValue={config.waveform}
            keybinds={Object.keys(KEYBINDS.WAVEFORMS.keys).slice(i, i + 1)}
            Icon={alt ? altIcon : icon}
            onChange={(waveform) => setConfig((prev) => ({ ...prev, waveform }))}
          />
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;
