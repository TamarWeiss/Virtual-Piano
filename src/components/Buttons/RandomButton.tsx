import { useState } from 'react';
import { DiceIcon, RandomizeIcon } from '../../constants/icons';
import { useKeybinds } from '../../hooks/useKeybinds';

type props = {
  className?: string;
  keybind: string;
  onClick?: () => void;
  alt?: boolean;
};

const ResetButton = ({ className, keybind, alt, ...props }: props) => {
  const [value, setValue] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const randomize = () => setValue(Math.floor(Math.random() * 5) + 1);

  const onClick = () => {
    randomize();
    props.onClick?.();
  };

  const randomKeybind = {
    onKeyDown: () => {
      setIsActive(true);
      onClick();
    },
    onKeyUp: () => setIsActive(false),
  };

  useKeybinds({
    [keybind]: randomKeybind,
    IntlBackslash: randomKeybind,
  });

  return (
    <button className={`p-1.5 btn${isActive ? ' active' : ''} ${className}`} onClick={onClick}>
      {alt ? <RandomizeIcon height='1.25em' /> : <DiceIcon height='1.25em' value={value} />}
    </button>
  );
};
export default ResetButton;
