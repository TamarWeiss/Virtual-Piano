import '../../styles/controlPanel.css';
import PillButton from '../Buttons/PillButton';
import Slider from '../Input/Slider';
import type { ReverbOptions } from '../../hooks/useSynth';

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
        id='reverbVolume'
        label='volume'
        value={reverb.volume}
        onChange={(volume) => setReverb((prev) => ({ ...prev, volume }))}
        min={0}
        max={1}
        step={0.1}
      />
      <Slider
        id='reverbDuration'
        label='duration'
        value={reverb.duration}
        onChange={(duration) => setReverb((prev) => ({ ...prev, duration }))}
        min={0.1}
        max={5}
        step={0.1}
      />
      <Slider
        id='reverbDecay'
        label='decay'
        value={reverb.decay}
        onChange={(decay) => setReverb((prev) => ({ ...prev, decay }))}
        min={0}
        max={5}
        step={0.1}
      />
    </div>
  </div>
);
export default Reverb;
