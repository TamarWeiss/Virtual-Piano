import { useEffect, useRef } from 'react';
import { KeybindContext, type KeyBind } from './KeybindContext';

type props = {
  bindings: Record<string, KeyBind>;
  children: React.ReactNode;
};

const KeybindProvider = ({ bindings, children }: props) => {
  const bindingsRef = useRef(bindings);

  useEffect(() => {
    bindingsRef.current = { ...bindingsRef.current, ...bindings };
  }, [bindings]);

  const addKeybinds = (bindings: Record<string, KeyBind>) => {
    bindingsRef.current = { ...bindingsRef.current, ...bindings };
    return () => removeKeybinds(Object.keys(bindings));
  };

  const removeKeybinds = (keys: string[]) => {
    keys.forEach((key) => delete bindingsRef.current[key.toLowerCase()]);
  };

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

  return <KeybindContext value={{ addKeybinds, removeKeybinds }}>{children}</KeybindContext>;
};

export default KeybindProvider;
