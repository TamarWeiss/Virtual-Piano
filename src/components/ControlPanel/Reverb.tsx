import Switch from '../Inputs/Switch';
import Slider from '../Inputs/Slider';
import type { ReverbOptions } from '../../hooks/useSynth';
import Button from '../Buttons/Button';
import { KEYBINDS, randomRange, REVERB_DEFAULTS } from '../../constants/pianoConfig';
import RandomButton from '../Buttons/RandomButton';
import { ResetIcon } from '../../constants/icons';

type props = {
  reverb: ReverbOptions;
  setReverb: (reverb: Partial<ReverbOptions>) => void;
  alt: boolean;
};

const inputs = {
  volume: { max: 1 },
  duration: { max: 5 },
  decay: { max: 5 },
};

const { TOGGLE_REVERB, RESET_REVERB, RANDOM_REVERB, RESET_ALL } = KEYBINDS;

const Reverb = ({ reverb, setReverb, alt }: props) => {
  const randomize = () => {
    const randomReverb = {
      volume: randomRange(0, inputs.volume.max, 0.1),
      duration: randomRange(0, inputs.duration.max, 0.1),
      decay: randomRange(0, inputs.decay.max, 0.1),
    };
    setReverb(randomReverb);
  };

  return (
    <div className='module flex flex-col gap-2 p-2'>
      <div className='flex items-center justify-between gap-2 py-1'>
        <span className='label'>Reverb</span>
        <Switch
          id='reverb'
          value={reverb.active}
          onChange={(active) => setReverb({ active })}
          keybinds={TOGGLE_REVERB.code}
        />
      </div>

      <div className='flex gap-2'>
        <div className='container grid gap-1'>
          {Object.entries(inputs).map(([field, { max }]) => (
            <Slider
              key={field}
              id={'reverb' + field}
              label={field}
              value={reverb[field as keyof Omit<ReverbOptions, 'active'>]}
              onChange={(value) => setReverb({ [field as keyof ReverbOptions]: value })}
              min={0}
              max={max}
              step={0.1}
            />
          ))}
        </div>

        <div className='flex flex-col gap-2'>
          <Button
            className='p-1'
            onClick={() => setReverb(REVERB_DEFAULTS)}
            keybinds={[...RESET_ALL.code, ...RESET_REVERB.code]}
          >
            <ResetIcon height='1.5em' />
          </Button>
          <RandomButton onClick={randomize} keybinds={RANDOM_REVERB.code} alt={alt} />
        </div>
      </div>
    </div>
  );
};
export default Reverb;
