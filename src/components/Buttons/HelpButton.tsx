import '../../styles/help.css';
import type { ButtonProps } from './Button';
import Button from './Button';

const HelpButton = ({ isActive, className = '', ...props }: ButtonProps) => (
  <Button aria-label='Open Hotkeys Guide' aria-expanded={isActive} className={`help ${className}`} {...props}>
    ?
  </Button>
);

export default HelpButton;
