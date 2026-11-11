import { useState } from 'react';
import { PlayIcon, StopIcon } from '../../constants/icons';
import NumberInput from '../Input/NumberInput';
import { useKeybinds } from '../../hooks/useKeybinds';
import { clamp, MIN_INTERVAL } from '../../constants/pianoConfig';
import { useMetronome, type TimeSignature } from '../../hooks/useMetronome';
import '../../styles/led.css';
import LED from './LED';
import ResetButton from '../Buttons/ResetButton';
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
    ArrowUp: {
      onKeyDown: (e) => onBPMChange(bpm + (e.altKey ? 10 : 1)),
      allowRepeat: true,
    },
    ArrowDown: {
      onKeyDown: (e) => onBPMChange(bpm - (e.altKey ? 10 : 1)),
      allowRepeat: true,
    },
    ArrowRight: {
      onKeyDown: (e) =>
        onTimeSignatureChange([timeSignature[0] + Number(!e.altKey), timeSignature[1] + Number(e.altKey)]),
      allowRepeat: true,
    },
    ArrowLeft: {
      onKeyDown: (e) =>
        onTimeSignatureChange([timeSignature[0] - Number(!e.altKey), timeSignature[1] - Number(e.altKey)]),
      allowRepeat: true,
    },
  });

  return (
    <div className='flex items-center gap-2'>
      <div className='module metronome-module'>
        <div className='flex items-center justify-between gap-2'>
          <ResetButton onClick={reset} keybind='KeyS' />
          <span className='label mx-auto'>Metronome</span>
          <LED state={flashState} className='mr-3' />
        </div>

        <div className='flex flex-1 items-stretch gap-2'>
          <div className='display flex-col text-xs'>
            <NumberInput
              id='time-sig-top'
              min={1}
              max={100}
              value={timeSignature[0]}
              onChange={(value) => onTimeSignatureChange([value, timeSignature[1]])}
            />
            <hr className='h-[1px] w-full' />
            <NumberInput
              id='time-sig-bottom'
              min={1}
              max={MAX}
              value={timeSignature[1]}
              onChange={(value) => onTimeSignatureChange([timeSignature[0], value])}
            />
          </div>

          <div className='display'>
            <NumberInput
              id='bpm'
              className='text-base text-shadow-inherit'
              min={1}
              max={MAX}
              value={bpm}
              onChange={onBPMChange}
            />
            <label htmlFor='bpm' className='label text-zinc-600 text-shadow-none'>
              BPM
            </label>
          </div>

          <Button keybinds={['KeyM']} onClick={onToggle} isActive={isPlaying} className='w-12 stop'>
            {isPlaying ? <StopIcon height='1rem' /> : <PlayIcon height='1rem' />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Metronome;
