import React from 'react';
import '../../styles/switch.css';
import LED from '../ControlPanel/LED';
import { FlashState } from '../../hooks/useMetronome';
import { useKeybinds } from '../../hooks/useKeybinds';

interface props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  value?: boolean;
  onChange?: (value: boolean) => void;
  keybinds?: string[];
}

const Switch = ({ id, onChange, value, keybinds = [], ...props }: props) => {
  useKeybinds(
    Object.fromEntries(
      keybinds.filter((keybind) => keybind).map((code) => [code, { onKeyUp: () => onChange?.(!value) }]),
    ),
  );

  return (
    <div className='switch flex items-center gap-2'>
      <LED state={value ? FlashState.ON : FlashState.OFF} />
      <div className={`relative flex items-center bg-zinc-900 border border-zinc-800 track${value ? ' active' : ''}`}>
        <input
          id={id}
          className='absolute size-full z-1 appearance-none cursor-pointer'
          type='checkbox'
          role='switch'
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
        <label htmlFor={id} className='thumb cursor-pointer flex justify-center border border-zinc-600'>
          <span className='grip' />
          <span className='grip' />
          <span className='grip' />
        </label>
      </div>
    </div>
  );
};
export default Switch;
