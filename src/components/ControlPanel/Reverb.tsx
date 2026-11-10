import '../../styles/controlPanel.css';
import PillButton from '../Buttons/PillButton';
import Slider from '../Input/Slider';
import type { ReverbOptions } from '../../hooks/useSynth';
import ResetButton from '../Buttons/ResetButton';
import { useKeybinds } from '../../hooks/useKeybinds';
import { REVERB_DEFAULTS } from '../../constants/pianoConfig';
import { useState } from 'react';

type props = {
  reverb: ReverbOptions;
  setReverb: React.Dispatch<React.SetStateAction<ReverbOptions>>;
};

const inputs = [
  { field: 'volume', max: 1 },
  { field: 'duration', max: 5 },
  { field: 'decay', max: 5 },
];

const Reverb = ({ reverb, setReverb }: props) => {
  const [resetPressed, setResetPressed] = useState(false);
  const reset = () => setReverb((prev) => ({ active: prev.active, ...REVERB_DEFAULTS }));

  useKeybinds({
    KeyZ: { onKeyDown: () => setReverb((prev) => ({ ...prev, active: !prev.active })) },
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
        <span className='label'>Reverb</span>
        <PillButton
          text='Reverb'
          keybind='Z'
          isActive={reverb.active}
          onClick={() => setReverb((prev) => ({ ...prev, active: !prev.active }))}
        />
        <ResetButton isActive={resetPressed} />
      </div>

      <div className='container'>
        {inputs.map(({ field, max }) => (
          <Slider
            key={field}
            id={'reverb' + field}
            label={field}
            value={reverb[field]}
            onChange={(value) => setReverb((prev) => ({ ...prev, [field]: value }))}
            min={0}
            max={max}
            step={0.1}
          />
        ))}
      </div>
    </div>
  );
};
export default Reverb;
