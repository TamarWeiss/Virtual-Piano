import { useState } from 'react';
import '../../styles/slider.css';

interface props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  label?: string;
  value?: number;
  min: number;
  max: number;
  onChange?: (value: number) => void;
}

const Slider = ({ label, value, min, max, onChange, ...props }: props) => {
  const [localValue, setLocalValue] = useState(String(value ?? (max - min) / 2));
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    setLocalValue(String(value));
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
        onChange={(e) => setLocalValue(e.target.value)}
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
      <span className='display'>{parseFloat(Number(localValue).toFixed(2))}</span>
    </div>
  );
};

export default Slider;
