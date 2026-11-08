type props = {
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const OctaveButton = ({ text, isActive, onClick }: props) => (
  <button className={`btn${isActive ? ' active' : ''}`} onClick={onClick}>
    {text}
  </button>
);
export default OctaveButton;
