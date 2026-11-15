import { useEffect, useState } from 'react';
import Button from './components/Buttons/Button';
import Piano from './components/Piano';
import { PauseContext } from './contexts/PauseContext';
import HelpGuide from './components/Modals/HelpGuide';
import './styles/help.css';
import { KEYBINDS } from './constants/pianoConfig';

const App = () => {
  const [pause, setPaused] = useState(false);
  const togglePause = () => setPaused((prev) => !prev);

  useEffect(() => {
    // Check if the click target is a button (or inside a button)
    // prevent releasing space from retrigerring a focused button
    const handlePointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('button')) e.preventDefault();
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <>
      <Button
        className='help ml-auto text-xl'
        keybinds={[KEYBINDS.HELP.code]}
        onClick={togglePause}
        command='show-modal'
        commandfor='help-guide'
      >
        ?
      </Button>
      <HelpGuide id='help-guide' onClose={() => setPaused(false)} />

      <PauseContext.Provider value={pause}>
        <Piano />
      </PauseContext.Provider>
    </>
  );
};

export default App;
