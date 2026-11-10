import { ResetIcon } from '../../constants/icons';

type props = {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
};

const ResetButton = ({ isActive, onClick, className }: props) => (
  <button className={`p-1 btn${isActive ? ' active' : ''} ${className}`} onClick={onClick}>
    <ResetIcon height='1.5em' />
  </button>
);
export default ResetButton;
