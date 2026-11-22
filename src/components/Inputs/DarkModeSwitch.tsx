import { Star } from '../../constants/icons';
import { useKeybinds } from '../../hooks/useKeybinds';
import '../../styles/darkmode.css';
import type { SwitchProps } from './Switch';

const stars: { width: string; top?: string; left?: string; animationDelay?: string }[] = [
  { width: '1em', left: '1.125em', animationDelay: '1.3s' },
  { width: '1.25em', top: '0.125em', left: '0.25em', animationDelay: '0.3s' },
  { width: '0.75em', top: '0.85em' },
  { width: '1em', top: '1.125em', left: '0.625em', animationDelay: '0.6s' },
];

const DarkModeSwitch = ({ id, onChange, value, keybinds = [], className = '', ...props }: SwitchProps) => {
  useKeybinds(
    Object.fromEntries(
      keybinds.filter((keybind) => keybind).map((code) => [code, { onKeyUp: () => onChange?.(!value) }]),
    ),
  );

  return (
    <label
      htmlFor={id}
      className={`darkmode-switch relative rounded-full overflow-hidden cursor-pointer ${className}`.trim()}
    >
      <div className='sun-moon absolute bg-current rounded-[inherit] aspect-square'>
        <div className='clouds absolute bg-inherit rounded-[inherit] aspect-[inherit]' />
      </div>

      <div className='stars'>
        {stars.map(({ width, ...style }, i) => (
          <Star key={i} className='absolute' color='white' width={width} style={style} />
        ))}
      </div>

      <input
        id={id}
        type='checkbox'
        role='switch'
        className='hidden'
        checked={value}
        onChange={(e) => onChange?.(e.target.checked)}
        {...props}
      />
    </label>
  );
};

export default DarkModeSwitch;
