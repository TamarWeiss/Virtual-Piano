import React from 'react';
import '../../styles/switch.css';

interface ToggleSwitchProps {
  isActive: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<ToggleSwitchProps> = ({ isActive, onChange }) => (
  <div className='synth-slide-unit'>
    <span className={`led-light${isActive ? ' active' : ''}`} />
    <button
      type='button'
      role='switch'
      aria-checked={isActive}
      onClick={() => onChange(!isActive)}
      className={`track${isActive ? ' active' : ''}`}
    >
      <div className='thumb'>
        <span className='grip' />
        <span className='grip' />
        <span className='grip' />
      </div>
    </button>
  </div>
);
export default Switch;
