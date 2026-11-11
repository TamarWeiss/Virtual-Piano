import { useRef, useState } from 'react';
import { DiceIcon, ShuffleIcon } from '../../constants/icons';
import Button from './Button';
import { DEFAULT_DICE_VALUE, randomRange } from '../../constants/pianoConfig';

type props = {
  className?: string;
  keybind: string;
  onClick?: () => void;
  alt?: boolean;
};

const ResetButton = ({ className = '', keybind, alt, ...props }: props) => {
  const [value, setValue] = useState(DEFAULT_DICE_VALUE);
  const isRollingRef = useRef(false);

  const randomize = () => {
    if (isRollingRef.current) return;
    isRollingRef.current = true;

    let steps = 0;
    const maxSteps = randomRange(5, 20, 1);
    const intervalTime = (2 / 24) * 1000;

    const roll = setInterval(() => {
      const res = randomRange(1, 6, 1);
      setValue(res);
      steps++;

      if (steps >= maxSteps) {
        clearInterval(roll);
        isRollingRef.current = false;
      }
    }, intervalTime);
  };

  const onClick = () => {
    if (alt) randomize();
    props.onClick?.();
  };

  return (
    <Button keybinds={[keybind, 'IntlBackslash']} className={`p-1.5 ${className}`} onClick={onClick}>
      {alt ? <DiceIcon height='1.25em' value={value} /> : <ShuffleIcon height='1.25em' />}
    </Button>
  );
};
export default ResetButton;
