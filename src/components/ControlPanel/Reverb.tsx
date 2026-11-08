import { useState } from 'react';
import '../../styles/controlPanel.css';
import PillButton from '../Buttons/PillButton';
import Slider from '../Input/Slider';

type props = {
  isActive: boolean;
  setReverb: React.Dispatch<React.SetStateAction<boolean>>;
};

const Reverb = (props: props) => {
  const [reverb, setReverb] = useState({ volume: 1, duration: 2, decay: 2 });

  return (
    <div className='module flex flex-col gap-2 p-2'>
      <div className='flex items-center justify-between gap-2'>
        <span className='label'>Reverb</span>
        <PillButton
          text='Reverb'
          keybind='Z'
          isActive={props.isActive}
          onClick={() => props.setReverb((prev) => !prev)}
        />
      </div>

      <div className='container'>
        <Slider
          id='volume'
          label='volume'
          value={reverb.volume}
          onChange={(volume) => setReverb({ ...reverb, volume })}
          min={0}
          max={1}
          step={0.1}
        />
        <Slider
          id='duration'
          label='duration'
          value={reverb.duration}
          onChange={(duration) => {
            setReverb({ ...reverb, decay: Math.min(reverb.decay, duration), duration });
          }}
          min={0}
          max={5}
          step={0.1}
        />
        {/* TODO: limit's decay max value by duration's current value */}
        <Slider
          id='decay'
          label='decay'
          value={reverb.decay}
          min={0}
          onChange={(decay) => setReverb({ ...reverb, decay })}
          max={reverb.duration}
          step={0.1}
        />
      </div>
    </div>
  );
};

export default Reverb;
