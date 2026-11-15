import { useState } from 'react';
import '../../styles/slider.css';
import NumberInput from './NumberInput';

interface props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'alt'> {
  label?: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  alt?: boolean;
}

const Slider = ({ label, value, min, max, onChange, alt, ...props }: props) => {
  const [localValue, setLocalValue] = useState(value ?? (max - min) / 2);
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    setLocalValue(value);
  }

  return (
    <div className={`grid items-center gap-1.5 text-xs slider${alt ? ' alt' : ''}`}>
      {label && (
        <label htmlFor={props.id + 'Display'} className='label flex-1 text-[0.85em]'>
          {label}
        </label>
      )}
      <span className='label'>{min}</span>
      <input
        type='range'
        className='cursor-pointer appearance-none'
        value={localValue}
        min={min}
        max={max}
        onChange={(e) => setLocalValue(Number(e.target.value))}
        onPointerUp={(e) => {
          e.currentTarget.releasePointerCapture(e.pointerId);
          e.currentTarget.blur();
        }}
        onBlur={(e) => {
          const newValue = Number(e.target.value);
          if (value !== undefined) setPrevValue(newValue);
          onChange?.(newValue);
          props.onBlur?.(e);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.currentTarget.blur();
          props.onKeyDown?.(e);
        }}
        {...props}
      />
      <span className='label'>{parseFloat(max.toFixed(2))}</span>

      <NumberInput
        id={props.id + 'Display'}
        className='display flex items-center justify-center min-w-min py-0.5 px-1'
        value={localValue}
        min={min}
        max={max}
        step={props.step}
        onChange={(value) => {
          setLocalValue(value);
          if (value !== undefined) setPrevValue(value);
          onChange(value);
        }}
      />
    </div>
  );
};

export default Slider;
