import Button, { type ButtonProps } from './Button';

interface props extends ButtonProps {
  text: string;
  keybinds?: string[];
  keybindText?: string[];
}

const PillButton = ({ text, keybinds = [], keybindText, className = '', ...props }: props) => (
  <Button className={`gap-1.5 rounded-full text-xs py-1 px-2 ${className}`} keybinds={keybinds} {...props}>
    <span className='indicator rounded-full bg-current w-2 aspect-square' />
    <span className='label text-inherit font-normal'>{text}</span>
    {keybinds.length > 0 && <span className='keybind'>{keybindText?.join(', ') ?? keybinds.join(', ')}</span>}
  </Button>
);
export default PillButton;
