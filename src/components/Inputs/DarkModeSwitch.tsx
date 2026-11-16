import { Circle, Star } from '../../constants/icons';
import { useKeybinds } from '../../hooks/useKeybinds';
import '../../styles/darkmode.css';
import type { SwitchProps } from './Switch';

const circles: {
  className: string;
  color: string;
  width: string;
  top: string;
  left?: string;
  animationDelay?: string;
}[] = [
  { className: 'moon-dot', color: 'grey', width: '0.375em', top: '0.1875em', left: '0.625em' },
  { className: 'moon-dot', color: 'grey', width: '0.625em', top: '0.625em', left: '0.125em' },
  { className: 'moon-dot', color: 'grey', width: '0.25em', top: '1em' },
  { className: 'light-ray', color: 'white', width: '2.75em', top: '-0.5em' },
  { className: 'light-ray', color: 'white', width: '3.5em', top: '-50%' },
  { className: 'light-ray', color: 'white', width: '3.75em', top: '-1.125em' },
  { className: 'cloud', color: '#ccc', width: '2.5em', top: '1em', left: '1.875em', animationDelay: '1s' },
  { className: 'cloud', color: '#ccc', width: '1.25em', top: '0.625em', left: '2.75em', animationDelay: '1s' },
  { className: 'cloud', color: '#ccc', width: '2em', top: '1.5em', left: '1.125em', animationDelay: '1s' },
  { className: 'cloud', color: '#eee', width: '2.5em', top: '1.125em', left: '2.25em' },
  { className: 'cloud', color: '#eee', width: '1em', top: '0.875em', left: '3em' },
  { className: 'cloud', color: '#eee', width: '2em', top: '1.625em', left: '1.5em' },
];

const stars: { width: string; top?: string; left?: string; animationDelay?: string }[] = [
  { width: '1.25em', top: '0.125em', left: '0.25em', animationDelay: '0.3s' },
  { width: '0.75em', top: '0.85em' },
  { width: '1em', top: '1.125em', left: '0.625em', animationDelay: '0.6s' },
  { width: '1em', left: '1.125em', animationDelay: '1.3s' },
];

const DarkModeSwitch = ({ id, onChange, value, keybinds = [], ...props }: SwitchProps) => {
  useKeybinds(
    Object.fromEntries(
      keybinds.filter((keybind) => keybind).map((code) => [code, { onKeyUp: () => onChange?.(!value) }]),
    ),
  );

  return (
    <label htmlFor={id} className='darkmode-switch relative cursor-pointer'>
      <input
        id={id}
        type='checkbox'
        role='switch'
        className='appearance-none'
        checked={value}
        onChange={(e) => onChange?.(e.target.checked)}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          props.onPointerDown?.(e);
        }}
        onPointerUp={(e) => {
          e.currentTarget.releasePointerCapture(e.pointerId);
          e.currentTarget.blur();
          props.onPointerUp?.(e);
        }}
        {...props}
      />

      <div className='slider rounded-full overflow-hidden inset-0'>
        <div className='sun-moon rounded-full aspect-square'>
          {circles.map(({ className, color, width, top, left = top }, i) => (
            <Circle key={i} className={className} color={color} width={width} style={{ top, left }} />
          ))}
        </div>

        <div className='stars'>
          {stars.map(({ width, top, left, animationDelay }, i) => (
            <Star key={i} className='star' color='white' width={width} style={{ animationDelay, top, left }} />
          ))}
        </div>
      </div>
    </label>
  );
};

export default DarkModeSwitch;
