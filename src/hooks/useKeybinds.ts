import { useEffect, useRef } from 'react';

export type KeyBind = {
  onKeyDown: (e: KeyboardEvent) => void;
  onKeyUp?: (e: KeyboardEvent) => void;
  allowRepeat?: boolean;
};

export const useKeybinds = (bindings: Record<string, KeyBind>) => {
  const bindingsRef = useRef(bindings);

  useEffect(() => {
    bindingsRef.current = bindings;
  }, [bindings]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const binding = bindingsRef.current[e.code];
      if (
        !binding ||
        (e.repeat && !binding.allowRepeat) ||
        e.target instanceof HTMLInputElement ||
        e.ctrlKey ||
        e.metaKey
      )
        return;

      e.preventDefault();
      binding.onKeyDown(e);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const binding = bindingsRef.current[e.code];
      if (!binding || e.target instanceof HTMLInputElement || e.ctrlKey || e.metaKey) return;
      e.preventDefault();
      binding.onKeyUp?.(e);
    };

    // 2. Attach listeners to the window
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 3. Clean up listeners when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
};
