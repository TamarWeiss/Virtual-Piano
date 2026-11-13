import { useEffect, useRef } from 'react';
import '../styles/modal.css';

const Modal = ({ children, open, className = '', ...props }: React.DialogHTMLAttributes<HTMLDialogElement>) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    // Trigger exit animation class before closing
    else if (!open && dialog.open) dialog.classList.add('is-closing');
  }, [open]);

  // Intercept native ESC key so it triggers the exit animation
  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const dialog = dialogRef.current;

    if (dialog && !dialog.classList.contains('is-closing')) {
      dialog.classList.add('is-closing');
    }
  };

  // When exit animation ends, actually close the native dialog & notify parent
  const handleAnimationEnd = () => {
    const dialog = dialogRef.current;
    if (dialog?.classList.contains('is-closing')) {
      dialog.classList.remove('is-closing');
      dialog.close();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialogDimensions = dialogRef.current?.getBoundingClientRect();
    if (!dialogDimensions) return;

    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      props.onClose(e);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onCancel={handleCancel}
      onAnimationEnd={handleAnimationEnd}
      className={`modal ${className}`.trim()}
      {...props}
    >
      {children}
    </dialog>
  );
};

export default Modal;
