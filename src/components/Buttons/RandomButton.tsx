import { useState } from 'react';
import { DiceIcon, RandomizeIcon } from '../../constants/icons';

type props = {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
  alt?: boolean;
};

const ResetButton = ({ isActive, className, alt, ...props }: props) => {
  const [value, setValue] = useState(5);

  const onClick = () => {
    setValue(Math.floor(Math.random() * 5) + 1);
    props.onClick?.();
  };

  return (
    <button className={`p-1.5 btn${isActive ? ' active' : ''} ${className}`} onClick={onClick}>
      {alt ? <RandomizeIcon height='1.25em' /> : <DiceIcon height='1.25em' value={value} />}
    </button>
  );
};
export default ResetButton;
