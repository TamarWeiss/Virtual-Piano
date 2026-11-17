import Button, { type ButtonProps } from './Button';

interface props extends ButtonProps {
  text: string;
  keybind?: string;
  keybindText?: string;
}

const PillButton = ({ text, keybind = '', keybindText, className = '', ...props }: props) => (
  <Button className={`gap-1.5 rounded-full text-xs py-1 px-2 ${className}`} keybinds={[keybind]} {...props}>
    <span className='indicator rounded-full bg-current w-2 aspect-square' />
    <span className='label text-inherit font-normal'>{text}</span>
    {keybind && <span className='keybind'>{keybindText ?? keybind}</span>}
  </Button>
);
export default PillButton;
