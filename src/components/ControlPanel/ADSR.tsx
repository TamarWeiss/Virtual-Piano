import type { ADSR } from '../../hooks/useSynth';
import '../../styles/controlPanel.css';
import PillButton from '../Buttons/PillButton';
import Slider from '../Input/Slider';

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

const ADSRPanel = ({ sustain, onSustainDown, onSustainRelease, adsr, setADSR }: props) => (
  <div className='module flex flex-col gap-2 p-2'>
    <div className='flex items-center justify-between gap-2'>
      <span className='label'>ADSR</span>
      <PillButton
        text='Sustain'
        keybind='Space'
        isActive={sustain}
        onPointerDown={onSustainDown}
        onPointerUp={onSustainRelease}
      />
    </div>
    <div className='container'>
      {/* <Slider id='volume' label='volume' min={0} max={1} step={0.1} /> */}
      {inputs.map(({ field, max }) => (
        <Slider
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
  </div>
);
export default ADSRPanel;
