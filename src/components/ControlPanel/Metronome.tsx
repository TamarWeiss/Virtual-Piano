import { useState } from 'react';
import { PlayIcon, StopIcon, ResetIcon } from '../../constants/icons';
import NumberInput from '../Inputs/NumberInput';
import { useKeybinds } from '../../hooks/useKeybinds';
import { clamp, KEYBINDS } from '../../constants/pianoConfig';
import { useMetronome, MIN_INTERVAL, type TimeSignature, FlashState } from '../../hooks/useMetronome';
import Button from '../Buttons/Button';

const MAX_INTERVAL = 2;
const MIN = 240 / MAX_INTERVAL;
const MAX = 240 / MIN_INTERVAL;
const METRONOME_DEFAULTS: { bpm: number; timeSignature: TimeSignature } = { bpm: 120, timeSignature: [4, 4] };

const Metronome = () => {
  const [bpm, setBPM] = useState(METRONOME_DEFAULTS.bpm);
  const [timeSignature, setTimeSignature] = useState<TimeSignature>(METRONOME_DEFAULTS.timeSignature);
  const [isPlaying, setIsPlaying] = useState(false);
  const { flashState, startMetronome, stopMetronome } = useMetronome(bpm, timeSignature);

  const onToggle = () => {
    (isPlaying ? stopMetronome : startMetronome)();
    setIsPlaying((prev) => !prev);
  };

  const onTimeSignatureChange = (value: TimeSignature) => {
    value[0] = clamp(value[0], 1, 100);
    value[1] = clamp(value[1], 1, MAX);
    setTimeSignature(value);
    const clamped = clamp(bpm, Math.ceil(MIN / value[1]), Math.floor(MAX / value[1]));
    if (bpm != clamped) setBPM(clamped);
  };

  const onBPMChange = (bpm: number) => {
    bpm = clamp(bpm, 1, MAX);
    setBPM(bpm);
    const clamped = clamp(timeSignature[1], Math.ceil(MIN / bpm), Math.floor(MAX / bpm));
    if (timeSignature[1] != clamped) setTimeSignature([timeSignature[0], clamped]);
  };

  const reset = () => {
    setBPM(METRONOME_DEFAULTS.bpm);
    setTimeSignature(METRONOME_DEFAULTS.timeSignature);
  };

  useKeybinds({
    [KEYBINDS.BPM.code[1]]: {
      onKeyDown: (e) => onBPMChange(bpm + (e.altKey ? 10 : 1)),
      allowRepeat: true,
    },
    [KEYBINDS.BPM.code[0]]: {
      onKeyDown: (e) => onBPMChange(bpm - (e.altKey ? 10 : 1)),
      allowRepeat: true,
    },
    [KEYBINDS.TIME_SIGNATURE.code[1]]: {
      onKeyDown: (e) =>
        onTimeSignatureChange([timeSignature[0] + Number(!e.altKey), timeSignature[1] + Number(e.altKey)]),
      allowRepeat: true,
    },
    [KEYBINDS.TIME_SIGNATURE.code[0]]: {
      onKeyDown: (e) =>
        onTimeSignatureChange([timeSignature[0] - Number(!e.altKey), timeSignature[1] - Number(e.altKey)]),
      allowRepeat: true,
    },
  });

  return (
    <div className='flex items-center gap-2'>
      <div className='module flex flex-col gap-2 p-2 min-h-min'>
        <div className='flex items-center justify-between gap-2'>
          <Button
            className='p-1'
            onClick={reset}
            keybinds={[...KEYBINDS.RESET_ALL.code, ...KEYBINDS.RESET_METRONOME.code]}
          >
            <ResetIcon height='1.5em' />
          </Button>
          <span className='label mx-auto'>Metronome</span>
          <div className='led-indicator mr-3'>
            <div
              className={`led-light${flashState ? (flashState == FlashState.ACCENT ? ' accent' : ' active') : ''}`}
            />
          </div>
        </div>

        <div className='flex flex-1 items-stretch gap-2'>
          <div className='display flex items-center py-0.5 px-1.5 flex-col text-xs'>
            <NumberInput
              id='time-sig-top'
              className='text-shadow-[inherit]'
              min={1}
              max={100}
              value={timeSignature[0]}
              onChange={(value) => onTimeSignatureChange([value, timeSignature[1]])}
            />
            <hr className='h-[1px] w-full' />
            <NumberInput
              id='time-sig-bottom'
              className='text-shadow-[inherit]'
              min={1}
              max={MAX}
              value={timeSignature[1]}
              onChange={(value) => onTimeSignatureChange([timeSignature[0], value])}
            />
          </div>

          <div className='display flex items-center py-0.5 px-1.5'>
            <NumberInput
              id='bpm'
              className='text-base text-shadow-[inherit]'
              min={1}
              max={MAX}
              value={bpm}
              onChange={onBPMChange}
            />
            <label htmlFor='bpm' className='label text-zinc-600 text-shadow-none'>
              BPM
            </label>
          </div>

          <Button
            keybinds={KEYBINDS.TOGGLE_METRONOME.code}
            onClick={onToggle}
            isActive={isPlaying}
            className='w-12 stop'
          >
            {isPlaying ? <StopIcon height='1rem' /> : <PlayIcon height='1rem' />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Metronome;
