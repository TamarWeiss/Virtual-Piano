type props = {
  waveform: OscillatorType;
  isActive: boolean;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick: React.Dispatch<React.SetStateAction<OscillatorType>>;
};

const WaveformButton = ({ Icon, isActive, waveform, onClick }: props) => (
  <button className={`btn flex-col gap-1 p-1${isActive ? ' active' : ''}`} onClick={() => onClick(waveform)}>
    <Icon height='2rem' />
    <span className='label text-inherit text-[0.65rem]'>{waveform} wave</span>
  </button>
);

export default WaveformButton;
