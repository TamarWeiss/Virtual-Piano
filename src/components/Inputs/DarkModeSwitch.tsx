import { Circle, Star } from '../../constants/icons';
import { range } from '../../constants/pianoConfig';
import { useKeybinds } from '../../hooks/useKeybinds';
import '../../styles/darkmode.css';

interface props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  value?: boolean;
  onChange?: (value: boolean) => void;
  keybinds?: string[];
}

const DarkModeSwitch = ({ id, onChange, value, keybinds = [], ...props }: props) => {
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

      <div className='slider rounded-full overflow-hidden z-0 inset-0'>
        <div className='sun-moon rounded-full aspect-square'>
          {range(3).map((i) => (
            <Circle key={i} id={`moon-dot-${i + 1}`} className='moon-dot' fill='grey' />
          ))}
          {range(3).map((i) => (
            <Circle key={i} id={`light-ray-${i + 1}`} className='absolute opacity-10 -z-1' fill='white' />
          ))}
          {range(6).map((i) => (
            <Circle
              key={i}
              id={`cloud-${i + 1}`}
              className={i < 3 ? 'cloud-dark' : 'cloud-light'}
              fill={i < 3 ? '#ccc' : '#eee'}
            />
          ))}
        </div>

        <div className='stars'>
          {range(4).map((i) => (
            <Star key={i} id={`star-${i + 1}`} className='star' fill='white' />
          ))}
        </div>
      </div>
    </label>
  );
};

export default DarkModeSwitch;
