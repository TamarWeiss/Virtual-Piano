import { useContext, useEffect, useState } from 'react';
import { useKeybinds } from '../../hooks/useKeybinds';
import { PauseContext } from '../../contexts/PauseContext';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  keybinds?: string[];
  onClick?: () => void;
  onPointerDown?: (e: KeyboardEvent | React.PointerEvent<HTMLButtonElement>) => void;
  onPointerUp?: (e: KeyboardEvent | React.PointerEvent<HTMLButtonElement>) => void;
  commandfor?: string;
  command?: string;
}

const Button = ({
  children,
  className = '',
  isActive,
  keybinds = [],
  onPointerDown,
  onPointerUp,
  ...props
}: ButtonProps) => {
  const [active, setActive] = useState(false);
  const disabled = useContext(PauseContext);

  useEffect(() => {
    if (disabled) queueMicrotask(() => setActive(false));
  }, [disabled]);

  useKeybinds(
    Object.fromEntries(
      keybinds
        .filter((keybind) => keybind)
        .map((code) => [
          code,
          {
            onKeyDown: (e) => {
              setActive(true);
              onPointerDown?.(e);
            },
            onKeyUp: (e) => {
              if (!active) return;
              onPointerUp?.(e);
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
      className={`btn${(isActive ?? active) ? ' active' : ''} ${className}`.trim()}
      onPointerCancel={(e) => {
        onPointerUp?.(e);
        props.onPointerCancel?.(e);
      }}
    >
      {children}
    </button>
  );
};
export default Button;
