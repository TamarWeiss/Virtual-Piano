import { useRef } from 'react';
import '../../styles/modal.css';
import { useKeybinds } from '../../hooks/useKeybinds';

export interface ModalProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  keybinds?: string[];
  onClose?: () => void;
}

const Modal = ({ keybinds = [], className = '', ...props }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useKeybinds(
    Object.fromEntries(
      keybinds
        .filter((keybind) => keybind)
        .map((code) => [
          code,
          {
            onKeyUp: () => {
              const dialog = dialogRef.current;
              if (!dialog) return;
              if (dialog.open) onClose();
              else dialog.showModal();
            },
          },
        ]),
    ),
  );

  const onClose = () => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.classList.contains('is-closing')) {
      dialog.classList.add('is-closing');
      props.onClose?.();
    }
  };

  const handleAnimationEnd = () => {
    const dialog = dialogRef.current;
    if (dialog?.classList.contains('is-closing')) {
      dialog.classList.remove('is-closing');
      dialog.close();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onAnimationEnd={handleAnimationEnd}
      className={`modal min-w-min whitespace-nowrap rounded-lg p-6 self-center justify-self-center ${className}`.trim()}
      {...props}
    />
  );
};

export default Modal;
