import '../../styles/controlPanel.css';
import PillButton from '../Buttons/PillButton';
import Slider from '../Input/Slider';
import type { ReverbOptions } from '../../hooks/useSynth';

type props = {
  reverb: ReverbOptions;
  setReverb: React.Dispatch<React.SetStateAction<ReverbOptions>>;
};

const inputs = [
  { field: 'volume', max: 1 },
  { field: 'duration', max: 5 },
  { field: 'decay', max: 5 },
];

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
      {inputs.map(({ field, max }) => (
        <Slider
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
export default Reverb;
