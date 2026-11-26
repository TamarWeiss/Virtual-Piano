import { ResetIcon } from '../../constants/icons';
import { KEYBINDS } from '../../constants/pianoConfig';
import Button, { type ButtonProps } from './Button';

interface props extends Omit<ButtonProps, 'keybinds'> {
  keybinds?: string[];
}

const ResetButton = ({ className = '', keybinds = [], ...props }: props) => (
  <Button keybinds={Object.keys(KEYBINDS.RESET_ALL.keys).concat(keybinds)} className={`p-1 ${className}`} {...props}>
    <ResetIcon height='1.5em' />
  </Button>
);
export default ResetButton;
