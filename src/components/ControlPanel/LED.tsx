import { FlashState } from '../../hooks/useMetronome';

const LED = ({ state = FlashState.OFF, className = '' }) => (
  <div className={`led-indicator ${className}`}>
    <div className={`led-light${state ? (state == FlashState.ACCENT ? ' accent' : ' active') : ''}`} />
  </div>
);

export default LED;
