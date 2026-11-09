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
      <Slider
        id='attack'
        label='attack'
        value={adsr.attack}
        onChange={(attack) => setADSR((prev) => ({ ...prev, attack }))}
        min={0}
        max={5}
        step={0.1}
      />
      <Slider
        id='decay'
        label='decay'
        value={adsr.decay}
        onChange={(decay) => setADSR((prev) => ({ ...prev, decay }))}
        min={0}
        max={5}
        step={0.1}
      />
      <Slider
        id='sustain'
        label='sustain'
        value={adsr.sustain}
        onChange={(sustain) => setADSR((prev) => ({ ...prev, sustain }))}
        min={0}
        max={1}
        step={0.1}
      />
      <Slider
        id='release'
        label='release'
        value={adsr.release}
        onChange={(release) => setADSR((prev) => ({ ...prev, release }))}
        min={0}
        max={5}
        step={0.1}
      />
    </div>
  </div>
);
export default ADSRPanel;
