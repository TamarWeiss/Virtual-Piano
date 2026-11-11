import { useState } from 'react';
import { useKeybinds } from '../../hooks/useKeybinds';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  keybinds?: string[];
  onClick?: () => void;
  onKeyDown?: () => void;
  onKeyUp?: () => void;
}

const Button = ({
  children,
  className,
  isActive,
  keybinds = [],
  onPointerDown,
  onPointerUp,
  ...props
}: ButtonProps) => {
  const [active, setActive] = useState(false);

  useKeybinds(
    Object.fromEntries(
      keybinds.map((code) => [
        code,
        {
          onKeyDown: () => {
            setActive(true);
            props.onKeyDown?.();
          },
          onKeyUp: () => {
            props.onKeyUp?.();
            props.onClick?.();
            setActive(false);
          },
        },
      ]),
    ),
  );

  return (
    <button
      {...props}
      className={`btn${(isActive ?? active) ? ' active' : ''} ${className}`}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        onPointerDown?.(e);
      }}
      onPointerUp={(e) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
        e.currentTarget.blur();
        onPointerUp?.(e);
      }}
      onPointerCancel={onPointerUp}
    >
      {children}
    </button>
  );
};
export default Button;
