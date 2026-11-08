import '../../styles/controlPanel.css';
import PillButton from '../Buttons/PillButton';
import Slider from '../Input/Slider';

type props = {
  sustain: boolean;
  onSustainDown: () => void;
  onSustainRelease: () => void;
};

const ADSR = (props: props) => {
  return (
    <div className='module flex flex-col gap-2 p-2'>
      <div className='flex items-center justify-between gap-2'>
        <span className='label'>ADSR</span>
        <PillButton
          text='Sustain'
          keybind='Space'
          isActive={props.sustain}
          onPointerDown={props.onSustainDown}
          onPointerUp={props.onSustainRelease}
        />
      </div>
      <div className='container'>
        <Slider id='attack' label='attack' min={0} max={5} step={0.1} />
        <Slider id='decay' label='decay' min={0} max={5} step={0.1} />
        <Slider id='sustain' label='sustain' min={0} max={1} step={0.1} />
        <Slider id='release' label='release' min={0} max={10} step={0.1} />
      </div>
    </div>
  );
};

export default ADSR;
