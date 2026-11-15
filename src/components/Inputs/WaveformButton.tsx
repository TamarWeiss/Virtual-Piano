interface props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  value: OscillatorType;
  currentValue: OscillatorType;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onChange: (waveform: OscillatorType) => void;
}

const WaveformButton = ({ id, Icon, value, currentValue, onChange, ...props }: props) => (
  <label
    htmlFor={id}
    className={`transition-colors min-w-min relative flex-col gap-1 p-1 btn${value == currentValue ? ' active' : ''}`}
  >
    <input
      id={id}
      type='radio'
      value={value}
      checked={value == currentValue}
      onChange={(e) => onChange(e.target.value as OscillatorType)}
      className='absolute size-full z-1 appearance-none cursor-pointer'
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
    <Icon height='2rem' />
    <span className='label mx-0.5 text-inherit text-center text-[0.65rem]'>{value} wave</span>
  </label>
);

export default WaveformButton;
