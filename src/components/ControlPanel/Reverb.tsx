import '../../styles/controlPanel.css';
import PillButton from '../Buttons/PillButton';
import Slider from '../Input/Slider';
import type { ReverbOptions } from '../../hooks/useSynth';
import ResetButton from '../Buttons/ResetButton';
import { useKeybinds } from '../../hooks/useKeybinds';
import { randomRange, REVERB_DEFAULTS } from '../../constants/pianoConfig';
import { useState } from 'react';
import RandomButton from '../Buttons/RandomButton';

type props = {
  reverb: ReverbOptions;
  setReverb: (reverb: Partial<ReverbOptions>) => void;
};

const inputs = {
  volume: { max: 1 },
  duration: { max: 5 },
  decay: { max: 5 },
};

const Reverb = ({ reverb, setReverb }: props) => {
  const [resetPressed, setResetPressed] = useState(false);
  const [randomPressed, setRandomPressed] = useState(false);

  const reset = () => setReverb(REVERB_DEFAULTS);
  const randomize = () => {
    const randomReverb = {
      volume: randomRange(0, inputs.volume.max, 0.1),
      duration: randomRange(0, inputs.duration.max, 0.1),
      decay: randomRange(0, inputs.decay.max, 0.1),
    };
    setReverb(randomReverb);
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
    KeyX: { onKeyDown: () => setReverb({ active: !reverb.active }) },
    Escape: resetKeybind,
    KeyD: resetKeybind,
    KeyC: randomKeybind,
    IntlBackslash: randomKeybind,
  });

  return (
    <div className='module flex flex-col gap-2 p-2'>
      <div className='flex items-center justify-between gap-4'>
        <span className='label'>Reverb</span>
        <PillButton
          text='Reverb'
          keybind='X'
          isActive={reverb.active}
          onClick={() => setReverb({ active: !reverb.active })}
        />
      </div>

      <div className='flex gap-2'>
        <div className='container'>
          {Object.entries(inputs).map(([field, { max }]) => (
            <Slider
              key={field}
              id={'reverb' + field}
              label={field}
              value={reverb[field]}
              onChange={(value) => setReverb({ [field]: value })}
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
export default Reverb;
