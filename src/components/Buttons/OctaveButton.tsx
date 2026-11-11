import Button, { type ButtonProps } from './Button';

interface props extends ButtonProps {
  text: string;
}

const OctaveButton = ({ text, ...props }: props) => <Button {...props}>{text}</Button>;
export default OctaveButton;
