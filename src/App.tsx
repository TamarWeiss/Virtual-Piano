import { useEffect, useState } from 'react';
import Button from './components/Buttons/Button';
import Piano from './components/Piano';
import { PauseContext } from './contexts/PauseContext';
import HelpGuide from './components/Modals/HelpGuide';
import { KEYBINDS } from './constants/pianoConfig';
import { useKeybinds } from './hooks/useKeybinds';
import ParticleField from './components/Particles';
import DarkModeSwitch from './components/Inputs/DarkModeSwitch';

const App = () => {
  const [pause, setPaused] = useState(false);
  const [darkMode, setDarkMode] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    // Check if the click target is a button (or inside a button)
    // prevent releasing space from retrigerring a focused button
    const handlePointerDown = (e: PointerEvent) => {
      const control = (e.target as HTMLElement)?.closest('button, input[type="checkbox"], input[type="radio"]');
      if (!control) return;

      const active = document.activeElement;
      if (active instanceof HTMLInputElement && active !== control) active.blur();
      e.preventDefault();
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [darkMode]);

  useKeybinds({ [Object.keys(KEYBINDS.TOGGLE_DARK_MODE.keys)[0]]: { onKeyDown: () => setDarkMode((prev) => !prev) } });

  return (
    <div className={`flex flex-col gap-4 py-4 px-12 app${darkMode ? ' dark' : ''}`}>
      <div className='flex justify-between items-center'>
        <DarkModeSwitch
          id='darkmode'
          value={darkMode}
          onClick={() => setDarkMode((prev) => !prev)}
          keybinds={Object.keys(KEYBINDS.TOGGLE_DARK_MODE.keys)}
        />
        <Button
          className='help text-xl text-zinc-400 bg-none bg-transparent min-h-min aspect-square rounded-full shadow-none transition opacity-50 hover:opacity-75'
          keybinds={Object.keys(KEYBINDS.HELP.keys)}
          onClick={() => setPaused((prev) => !prev)}
          command='show-modal'
          commandfor='help-guide'
        >
          ?
        </Button>
      </div>

      <PauseContext.Provider value={pause}>
        <Piano />
      </PauseContext.Provider>

      <ParticleField />
      <HelpGuide id='help-guide' onClose={() => setPaused(false)} />
    </div>
  );
};

export default App;
