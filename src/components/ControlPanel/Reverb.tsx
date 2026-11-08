import '../../styles/controlPanel.css';
import PillButton from '../Buttons/PillButton';
import Slider from '../Input/Slider';

type props = {
  reverb: boolean;
  setReverb: React.Dispatch<React.SetStateAction<boolean>>;
};

const Reverb = (props: props) => {
  return (
    <div className='module flex flex-col gap-2 p-2'>
      <div className='flex items-center justify-between gap-2'>
        <span className='label'>Reverb</span>
        <PillButton
          text='Reverb'
          keybind='Z'
          isActive={props.reverb}
          onClick={() => props.setReverb((prev) => !prev)}
        />
      </div>
      <div className='flex flex-col gap-1'>
        <Slider id='volume' label='volume' min={0} max={1} step={0.1} />
        <Slider id='duration' label='duration' min={0} max={5} step={0.1} />
        {/* TODO: limit's decay max value by duration's current value */}
        <Slider id='decay' label='decay' min={0} max={5} step={0.1} />
      </div>
    </div>
  );
};

export default Reverb;
