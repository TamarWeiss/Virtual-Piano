import { DiceIcon } from '../../constants/icons';

type props = {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
};

const ResetButton = ({ isActive, onClick, className }: props) => (
  <button className={`p-1.5 btn${isActive ? ' active' : ''} ${className}`} onClick={onClick}>
    <DiceIcon height='1.25em' />
  </button>
);
export default ResetButton;
