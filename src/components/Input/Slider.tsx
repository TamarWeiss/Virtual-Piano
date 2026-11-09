import { useState } from 'react';
import '../../styles/slider.css';
import NumberInput from './NumberInput';

interface props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  label?: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

const Slider = ({ label, value, min, max, onChange, ...props }: props) => {
  const [localValue, setLocalValue] = useState(value ?? (max - min) / 2);
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    setLocalValue(value);
  }

  return (
    <div className='slider text-xs'>
      {label && (
        <label className='label flex-1 text-[0.65rem]' htmlFor={props.id}>
          {label}
        </label>
      )}
      <span className='label'>{min}</span>
      <input
        type='range'
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
        className='display'
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
