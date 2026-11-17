import { useContext, useEffect, useState } from 'react';
import { useKeybinds } from '../../hooks/useKeybinds';
import { PauseContext } from '../../contexts/PauseContext';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  keybinds?: string[];
  onClick?: () => void;
  onPointerDown?: () => void;
  onPointerUp?: () => void;
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
            onKeyDown: () => {
              setActive(true);
              onPointerDown?.();
            },
            onKeyUp: () => {
              if (!active) return;
              onPointerUp?.();
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
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        onPointerDown?.();
      }}
      onPointerUp={(e) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
        e.currentTarget.blur();
        onPointerUp?.();
      }}
      onPointerCancel={onPointerUp}
    >
      {children}
    </button>
  );
};
export default Button;
