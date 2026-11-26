import { KEYBINDS, MAX_OCTAVE, MIN_OCTAVE } from '../../constants/pianoConfig';
import Button from '../Buttons/Button';
import NumberInput from '../Inputs/NumberInput';

type props = {
  baseOctave: number;
  shiftOctave: (delta: number) => void;
};

const OctaveModule = ({ baseOctave, shiftOctave }: props) => (
  <div className='module octave-module grid text-2xl min-h-min'>
    <Button
      className='aspect-square border-r-0 rounded-l-lg rounded-r-none'
      onClick={() => shiftOctave(-1)}
      keybinds={Object.keys(KEYBINDS.OCTAVE.keys).slice(0, 1)}
    >
      -
    </Button>

    <NumberInput
      id='octave'
      value={baseOctave}
      className='display rounded-none px-3'
      min={MIN_OCTAVE}
      max={MAX_OCTAVE}
      onChange={(num) => shiftOctave(num - baseOctave)}
    />

    <Button
      className='aspect-square border-l-0 rounded-r-lg rounded-l-none'
      onClick={() => shiftOctave(1)}
      keybinds={Object.keys(KEYBINDS.OCTAVE.keys).slice(1, 2)}
    >
      +
    </Button>
  </div>
);

export default OctaveModule;
