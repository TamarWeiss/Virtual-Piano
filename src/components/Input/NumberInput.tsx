import { useState } from 'react';
import { clamp } from '../../constants/pianoConfig';

interface props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

const NumberInput = ({ value, min, max, onChange, ...props }: props) => {
  const [localValue, setLocalValue] = useState(String(value));
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    setLocalValue(String(value));
  }

  const validate = (newVal: number) => {
    if (isNaN(newVal)) {
      setLocalValue(String(value));
      return;
    }

    const clamped = clamp(newVal, min, max);
    setLocalValue(String(clamped));
    setPrevValue(clamped);
    onChange(clamped);
  };

  return (
    <input
      type='number'
      value={localValue}
      min={min}
      max={max}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={(e) => {
        validate(parseFloat(e.target.value));
        props.onBlur?.(e);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.currentTarget.blur();
        props.onKeyDown?.(e);
      }}
      {...props}
    />
  );
};

export default NumberInput;
