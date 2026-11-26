import type { ADSR } from '../../hooks/useSynth';
import PillButton from '../Buttons/PillButton';
import ResetButton from '../Buttons/ResetButton';
import RandomButton from '../Buttons/RandomButton';
import Slider from '../Inputs/Slider';
import { ADSR_DEFAULTS, Entries, KEYBINDS, Keys, randomRange } from '../../constants/pianoConfig';

type props = {
  sustain: boolean;
  onSustainDown: () => void;
  onSustainRelease: () => void;
  adsr: ADSR;
  setADSR: (adsr: Partial<ADSR>) => void;
  alt: boolean;
};

const inputs = { volume: { max: 1 }, attack: { max: 5 }, decay: { max: 5 }, sustain: { max: 1 }, release: { max: 5 } };

const ADSRPanel = ({ sustain, onSustainDown, onSustainRelease, adsr, setADSR, alt }: props) => {
  const randomize = () => {
    const randomADSR = Keys(inputs).reduce(
      (acc, field) => ({ ...acc, [field]: randomRange(0, inputs[field].max, 0.1) }),
      {} as ADSR,
    );
    setADSR(randomADSR);
  };

  return (
    <div className='module flex flex-col gap-2 p-2'>
      <div className='flex items-center justify-between gap-4'>
        <span className='label'>ADSR</span>
        <PillButton
          text='Sustain'
          keybinds={Object.keys(KEYBINDS.SUSTAIN.keys)}
          keybindText={Object.values(KEYBINDS.SUSTAIN.keys)}
          isActive={sustain}
          onPointerDown={(e) => {
            if ('pointerId' in e) e.currentTarget.setPointerCapture(e.pointerId);
            onSustainDown();
          }}
          onPointerUp={() => onSustainRelease()}
        />
      </div>

      <div className='flex gap-2'>
        <div className='container grid gap-1'>
          {Entries(inputs).map(([field, { max }]) => (
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
          <ResetButton onClick={() => setADSR(ADSR_DEFAULTS)} keybinds={Object.keys(KEYBINDS.RESET_ADSR.keys)} />
          <RandomButton onClick={randomize} keybinds={Object.keys(KEYBINDS.RANDOM_ADSR.keys)} alt={alt} />
        </div>
      </div>
    </div>
  );
};
export default ADSRPanel;
