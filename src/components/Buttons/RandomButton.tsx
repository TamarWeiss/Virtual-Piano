import { DiceIcon, RandomizeIcon } from '../../constants/icons';

type props = {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
  alt?: boolean;
};

const ResetButton = ({ isActive, onClick, className, alt }: props) => (
  <button className={`p-1.5 btn${isActive ? ' active' : ''} ${className}`} onClick={onClick}>
    {alt ? <RandomizeIcon height='1.25em' /> : <DiceIcon height='1.25em' />}
  </button>
);
export default ResetButton;
