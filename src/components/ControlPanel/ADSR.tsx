import type { ADSR } from '../../hooks/useSynth';
import Button from '../Buttons/Button';
import { ResetIcon } from '../../constants/icons';
import Slider from '../Inputs/Slider';
import { ADSR_DEFAULTS, KEYBINDS, randomRange } from '../../constants/pianoConfig';
import RandomButton from '../Buttons/RandomButton';

type props = {
  sustain: boolean;
  onSustainDown: () => void;
  onSustainRelease: () => void;
  adsr: ADSR;
  setADSR: (adsr: Partial<ADSR>) => void;
  alt: boolean;
};

const inputs = { volume: { max: 1 }, attack: { max: 5 }, decay: { max: 5 }, sustain: { max: 1 }, release: { max: 5 } };
const { SUSTAIN, RESET_ADSR, RANDOM_ADSR, RESET_ALL } = KEYBINDS;

const ADSRPanel = ({ sustain, onSustainDown, onSustainRelease, adsr, setADSR, alt }: props) => {
  const randomize = () => {
    const randomADSR: ADSR = {
      volume: randomRange(0, inputs.volume.max, 0.1),
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
        <Button
          className='gap-1.5 rounded-full text-xs py-1 px-2'
          keybinds={SUSTAIN.code}
          isActive={sustain}
          onPointerDown={onSustainDown}
          onPointerUp={onSustainRelease}
        >
          <span className='indicator rounded-full bg-current w-2 aspect-square' />
          <span className='label text-inherit font-normal'>Sustain</span>
          <span className='keybind'>{SUSTAIN.code}</span>
        </Button>
      </div>

      <div className='flex gap-2'>
        <div className='container grid gap-1'>
          {Object.entries(inputs).map(([field, { max }]) => (
            <Slider
              key={field}
              id={field}
              label={field}
              value={adsr[field as keyof ADSR]}
              onChange={(value) => setADSR({ [field as keyof ADSR]: value })}
              min={0}
              max={max}
              step={0.1}
            />
          ))}
        </div>

        <div className='flex flex-col gap-2'>
          <Button
            className='p-1'
            onClick={() => setADSR(ADSR_DEFAULTS)}
            keybinds={[...RESET_ALL.code, ...RESET_ADSR.code]}
          >
            <ResetIcon height='1.5em' />
          </Button>
          <RandomButton onClick={randomize} keybinds={RANDOM_ADSR.code} alt={alt} />
        </div>
      </div>
    </div>
  );
};
export default ADSRPanel;
