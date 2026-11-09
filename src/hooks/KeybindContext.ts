import { createContext } from 'react';

export type KeyBind = {
  onKeyDown: (e: KeyboardEvent) => void;
  onKeyUp?: (e: KeyboardEvent) => void;
  allowRepeat?: boolean;
};

interface KeybindContextType {
  addKeybinds: (bindings: Record<string, KeyBind>) => void;
  removeKeybind: (key: string) => void;
}
export const KeybindContext = createContext<KeybindContextType | null>(null);
