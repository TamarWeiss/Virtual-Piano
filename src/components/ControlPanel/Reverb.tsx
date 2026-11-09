import '../../styles/controlPanel.css';
import PillButton from '../Buttons/PillButton';
import Slider from '../Input/Slider';
import type { ReverbOptions } from '../../hooks/synth';

type props = {
  reverb: ReverbOptions;
  setReverb: React.Dispatch<React.SetStateAction<ReverbOptions>>;
};

const Reverb = ({ reverb, setReverb }: props) => (
  <div className='module flex flex-col gap-2 p-2'>
    <div className='flex items-center justify-between gap-2'>
      <span className='label'>Reverb</span>
      <PillButton
        text='Reverb'
        keybind='Z'
        isActive={reverb.active}
        onClick={() => setReverb((prev) => ({ ...prev, active: !prev.active }))}
      />
    </div>

    <div className='container'>
      <Slider
        id='volume'
        label='volume'
        value={reverb.volume}
        onChange={(volume) => setReverb((prev) => ({ ...prev, volume }))}
        min={0}
        max={1}
        step={0.1}
      />
      <Slider
        id='duration'
        label='duration'
        value={reverb.duration}
        onChange={(duration) => setReverb((prev) => ({ ...prev, duration }))}
        min={0.1}
        max={5}
        step={0.1}
      />
      <Slider
        id='decay'
        label='decay'
        value={reverb.decay}
        min={0}
        onChange={(decay) => setReverb((prev) => ({ ...prev, decay }))}
        max={5}
        step={0.1}
      />
    </div>
  </div>
);
export default Reverb;
