type props = {
  note: number;
  name: string;
  keybind: string;
  isBlack: boolean;
  isActive: boolean;
  onNoteStart: (note: number) => void;
  onNoteEnd: (note: number) => void;
};

const PianoKey = ({ note, name, keybind, isBlack, isActive, onNoteStart, onNoteEnd }: props) => (
  <button
    className={`flex flex-col justify-end font-bold pb-4 ${isBlack ? 'black' : 'white'}${isActive ? ' active' : ''}`}
    onPointerDown={(e) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      onNoteStart(note);
    }}
    onPointerUp={(e) => {
      e.currentTarget.releasePointerCapture(e.pointerId);
      e.currentTarget.blur();
      onNoteEnd(note);
    }}
    onPointerCancel={() => onNoteEnd(note)}
  >
    <span className='text-sm capitalize font-semibold opacity-50'>{keybind}</span>
    {name}
  </button>
);

export default PianoKey;
