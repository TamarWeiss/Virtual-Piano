import { useState } from 'react';
import type { ADSR } from '../../hooks/useSynth';
import '../../styles/controlPanel.css';
import PillButton from '../Buttons/PillButton';
import ResetButton from '../Buttons/ResetButton';
import Slider from '../Input/Slider';
import { useKeybinds } from '../../hooks/useKeybinds';
import { ADSR_DEFAULTS, randomRange } from '../../constants/pianoConfig';
import RandomButton from '../Buttons/RandomButton';

type props = {
  sustain: boolean;
  onSustainDown: () => void;
  onSustainRelease: () => void;
  adsr: ADSR;
  setADSR: React.Dispatch<React.SetStateAction<ADSR>>;
};

const inputs = {
  attack: { max: 5 },
  decay: { max: 5 },
  sustain: { max: 1 },
  release: { max: 5 },
};

const ADSRPanel = ({ sustain, onSustainDown, onSustainRelease, adsr, setADSR }: props) => {
  const [resetPressed, setResetPressed] = useState(false);
  const [randomPressed, setRandomPressed] = useState(false);

  const reset = () => setADSR(ADSR_DEFAULTS);
  const randomize = () => {
    const randomADSR: ADSR = {
      attack: randomRange(0, inputs.attack.max, 0.1),
      decay: randomRange(0, inputs.decay.max, 0.1),
      sustain: randomRange(0, inputs.sustain.max, 0.1),
      release: randomRange(0, inputs.release.max, 0.1),
    };
    setADSR(randomADSR);
  };

  const resetKeybind = {
    onKeyDown: () => {
      setResetPressed(true);
      reset();
    },
    onKeyUp: () => setResetPressed(false),
  };

  const randomKeybind = {
    onKeyDown: () => {
      setRandomPressed(true);
      randomize();
    },
    onKeyUp: () => setRandomPressed(false),
  };

  useKeybinds({
    Space: { onKeyDown: onSustainDown, onKeyUp: onSustainRelease },
    Escape: resetKeybind,
    KeyA: resetKeybind,
    KeyZ: randomKeybind,
    IntlBackslash: randomKeybind,
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
          {Object.entries(inputs).map(([field, { max }]) => (
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
          <RandomButton onClick={randomize} isActive={randomPressed} />
        </div>
      </div>
    </div>
  );
};
export default ADSRPanel;
