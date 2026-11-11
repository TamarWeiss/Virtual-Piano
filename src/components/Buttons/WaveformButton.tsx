type props = {
  waveform: OscillatorType;
  isActive: boolean;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick: (waveform: OscillatorType) => void;
};

const WaveformButton = ({ Icon, isActive, waveform, onClick }: props) => (
  <button className={`flex-col gap-1 p-1 btn${isActive ? ' active' : ''}`} onClick={() => onClick(waveform)}>
    <Icon height='2rem' />
    <span className='label text-inherit text-[0.65rem]'>{waveform} wave</span>
  </button>
);

export default WaveformButton;
