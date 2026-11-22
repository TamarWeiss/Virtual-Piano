import { useKeybinds } from '../../hooks/useKeybinds';

interface props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  value: OscillatorType;
  currentValue: OscillatorType;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onChange: (waveform: OscillatorType) => void;
  keybinds?: string[];
}

const WaveformButton = ({ id, Icon, value, currentValue, onChange, keybinds = [], ...props }: props) => {
  useKeybinds(
    Object.fromEntries(keybinds.filter((keybind) => keybind).map((code) => [code, { onKeyUp: () => onChange(value) }])),
  );

  return (
    <label
      htmlFor={id}
      className={`transition-colors min-w-min relative flex-col gap-1 p-1 btn${value == currentValue ? ' active' : ''}`}
    >
      <input
        id={id}
        type='radio'
        value={value}
        checked={value == currentValue}
        onChange={(e) => onChange(e.target.value as OscillatorType)}
        className='absolute size-full z-1 appearance-none cursor-pointer'
        {...props}
      />
      <Icon height='2rem' />
      <span className='label mx-0.5 text-inherit text-center text-[0.65rem]'>{value} wave</span>
    </label>
  );
};

export default WaveformButton;
