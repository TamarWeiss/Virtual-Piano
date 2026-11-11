import { useState } from 'react';
import { DiceIcon, RandomizeIcon } from '../../constants/icons';
import Button from './Button';

type props = {
  className?: string;
  keybind: string;
  onClick?: () => void;
  alt?: boolean;
};

const ResetButton = ({ className, keybind, alt, ...props }: props) => {
  const [value, setValue] = useState(5);
  const randomize = () => setValue(Math.floor(Math.random() * 5) + 1);

  const onClick = () => {
    randomize();
    props.onClick?.();
  };

  return (
    <Button keybinds={[keybind, 'IntlBackslash']} className={`p-1.5 ${className}`} onClick={onClick}>
      {alt ? <RandomizeIcon height='1.25em' /> : <DiceIcon height='1.25em' value={value} />}
    </Button>
  );
};
export default ResetButton;
