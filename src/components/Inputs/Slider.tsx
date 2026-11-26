import { useState } from 'react';
import NumberInput from './NumberInput';

interface props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'alt'> {
  label?: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

const Slider = ({ label, value, min, max, onChange, className = '', ...props }: props) => {
  const [localValue, setLocalValue] = useState(value ?? (max - min) / 2);
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    setLocalValue(value);
  }

  const commit = (value: number) => {
    if (value !== undefined) setPrevValue(value);
    onChange?.(value);
  };

  return (
    <div className={`slider grid items-center gap-1.5 text-xs text-zinc-600 ${className}`.trim()}>
      {label && (
        <label htmlFor={props.id + 'Display'} className='label flex-1 text-inherit text-[0.85em]'>
          {label}
        </label>
      )}

      <span className='label text-inherit'>{min}</span>
      <input
        type='range'
        className='bg-zinc-900 border border-zinc-800 cursor-pointer appearance-none rounded-full'
        value={localValue}
        min={min}
        max={max}
        onChange={(e) => setLocalValue(Number(e.currentTarget.value))}
        onPointerUp={(e) => {
          e.currentTarget.blur();
          commit(Number(e.currentTarget.value));
        }}
        {...props}
      />
      <span className='label text-inherit'>{parseFloat(max.toFixed(2))}</span>

      <NumberInput
        id={props.id + 'Display'}
        className='display flex items-center justify-center min-w-min py-0.5 px-1'
        value={localValue}
        min={min}
        max={max}
        step={props.step}
        onChange={(value) => {
          setLocalValue(value);
          commit(value);
        }}
      />
    </div>
  );
};

export default Slider;
