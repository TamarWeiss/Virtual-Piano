import { ResetIcon } from '../../constants/icons';
import { KEYBINDS } from '../../constants/pianoConfig';
import Button, { type ButtonProps } from './Button';

interface props extends Omit<ButtonProps, 'keybinds'> {
  keybind?: string;
}

const ResetButton = ({ className = '', keybind = '', ...props }: props) => (
  <Button keybinds={[keybind, KEYBINDS.RESET_ALL.code]} className={`p-1 ${className}`} {...props}>
    <ResetIcon height='1.5em' />
  </Button>
);
export default ResetButton;
