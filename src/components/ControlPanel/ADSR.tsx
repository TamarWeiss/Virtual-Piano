import type { ADSR } from '../../hooks/useSynth';
import '../../styles/controlPanel.css';
import PillButton from '../Buttons/PillButton';
import ResetButton from '../Buttons/ResetButton';
import Slider from '../Input/Slider';
import { ADSR_DEFAULTS, randomRange } from '../../constants/pianoConfig';
import RandomButton from '../Buttons/RandomButton';

type props = {
  sustain: boolean;
  onSustainDown: () => void;
  onSustainRelease: () => void;
  adsr: ADSR;
  setADSR: (adsr: Partial<ADSR>) => void;
};

const inputs = {
  attack: { max: 5 },
  decay: { max: 5 },
  sustain: { max: 1 },
  release: { max: 5 },
};

const ADSRPanel = ({ sustain, onSustainDown, onSustainRelease, adsr, setADSR }: props) => {
  const randomize = () => {
    const randomADSR: ADSR = {
      attack: randomRange(0, inputs.attack.max, 0.1),
      decay: randomRange(0, inputs.decay.max, 0.1),
      sustain: randomRange(0, inputs.sustain.max, 0.1),
      release: randomRange(0, inputs.release.max, 0.1),
    };
    setADSR(randomADSR);
  };

  return (
    <div className='module flex flex-col gap-2 p-2'>
      <div className='flex items-center justify-between gap-4'>
        <span className='label'>ADSR</span>
        <PillButton
          text='Sustain'
          keybind='Space'
          isActive={sustain}
          onPointerDown={onSustainDown}
          onPointerUp={onSustainRelease}
        />
      </div>

      <div className='flex gap-2'>
        <div className='container'>
          {/* <Slider id='volume' label='volume' min={0} max={1} step={0.1} /> */}
          {Object.entries(inputs).map(([field, { max }]) => (
            <Slider
              key={field}
              id={field}
              label={field}
              value={adsr[field]}
              onChange={(value) => setADSR({ [field]: value })}
              min={0}
              max={max}
              step={0.1}
            />
          ))}
        </div>

        <div className='flex flex-col gap-2'>
          <ResetButton onClick={() => setADSR(ADSR_DEFAULTS)} keybind='KeyA' />
          <RandomButton onClick={randomize} keybind='KeyZ' />
        </div>
      </div>
    </div>
  );
};
export default ADSRPanel;
