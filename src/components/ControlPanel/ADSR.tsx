import { useState } from 'react';
import type { ADSR } from '../../hooks/useSynth';
import '../../styles/controlPanel.css';
import PillButton from '../Buttons/PillButton';
import ResetButton from '../Buttons/ResetButton';
import Slider from '../Input/Slider';
import { useKeybinds } from '../../hooks/useKeybinds';
import { ADSR_DEFAULTS } from '../../constants/pianoConfig';
import RandomButton from '../Buttons/RandomButton';

type props = {
  sustain: boolean;
  onSustainDown: () => void;
  onSustainRelease: () => void;
  adsr: ADSR;
  setADSR: React.Dispatch<React.SetStateAction<ADSR>>;
};

const inputs = [
  { field: 'attack', max: 5 },
  { field: 'decay', max: 5 },
  { field: 'sustain', max: 1 },
  { field: 'release', max: 5 },
];

const ADSRPanel = ({ sustain, onSustainDown, onSustainRelease, adsr, setADSR }: props) => {
  const [resetPressed, setResetPressed] = useState(false);
  const reset = () => setADSR(ADSR_DEFAULTS);

  useKeybinds({
    Space: { onKeyDown: onSustainDown, onKeyUp: onSustainRelease },
    Escape: {
      onKeyDown: () => {
        setResetPressed(true);
        reset();
      },
      onKeyUp: () => setResetPressed(false),
    },
  });

  return (
    <div className='module flex flex-col gap-2 p-2'>
      <div className='flex items-center justify-between gap-4'>
        <span className='label'>ADSR</span>
        <PillButton
          text='Sustain'
          keybind='Space'
          isActive={sustain}
          onPointerDown={onSustainDown}
          onPointerUp={onSustainRelease}
        />
      </div>

      <div className='flex gap-2'>
        <div className='container'>
          {/* <Slider id='volume' label='volume' min={0} max={1} step={0.1} /> */}
          {inputs.map(({ field, max }) => (
            <Slider
              key={field}
              id={field}
              label={field}
              value={adsr[field]}
              onChange={(value) => setADSR((prev) => ({ ...prev, [field]: value }))}
              min={0}
              max={max}
              step={0.1}
            />
          ))}
        </div>
        <div className='flex flex-col gap-2'>
          <ResetButton onClick={reset} isActive={resetPressed} />
          <RandomButton />
        </div>
      </div>
    </div>
  );
};
export default ADSRPanel;
