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

const DarkModeSwitch = ({ id, onChange, value, keybinds = [], className, ...props }: SwitchProps) => {
  useKeybinds(
    Object.fromEntries(
      keybinds.filter((keybind) => keybind).map((code) => [code, { onKeyUp: () => onChange?.(!value) }]),
    ),
  );

  return (
    <label htmlFor={id} className={`darkmode-switch cursor-pointer ${className}`.trim()}>
      <input
        id={id}
        type='checkbox'
        role='switch'
        className='hidden'
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

      <div className='slider relative h-full w-full rounded-full overflow-hidden'>
        <div className='sun-moon rounded-full aspect-square'>
          <div className='clouds' />
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
