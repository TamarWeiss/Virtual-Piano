type props = {
  text: string;
  isActive?: boolean;
  keybind?: string;
  onPointerUp?: React.PointerEventHandler<HTMLButtonElement>;
  onPointerDown?: React.PointerEventHandler<HTMLButtonElement>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const PillButton = ({ isActive, onPointerDown, onPointerUp, text, keybind, onClick, className = '' }: props) => (
  // <div className='module flex rounded-full transition-all'>
  <button
    className={`btn gap-1.5 rounded-full text-xs py-1 px-2 ${isActive ? ' active' : ''} ${className}`}
    onClick={onClick}
    onPointerDown={(e) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      onPointerDown?.(e);
    }}
    onPointerUp={(e) => {
      e.currentTarget.releasePointerCapture(e.pointerId);
      e.currentTarget.blur();
      onPointerUp?.(e);
    }}
    onPointerCancel={onPointerUp}
  >
    <span className='indicator' />
    <span className='label text-inherit font-normal'>{text}</span>
    {keybind && <span className='keybind'>{keybind}</span>}
  </button>
  // </div>
);
export default PillButton;
