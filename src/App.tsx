import { useEffect, useState } from 'react';
import HelpButton from './components/Buttons/HelpButton';
import Piano from './components/Piano';
import { PauseContext } from './contexts/PauseContext';
import Modal from './components/Modal';

const App = () => {
  const [openGuide, setOpenGuide] = useState(false);
  const toggleGuide = () => setOpenGuide((prev) => !prev);

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
      <HelpButton className='ml-auto text-xl' keybinds={['KeyH']} onClick={toggleGuide} />
      <Modal open={openGuide} onClose={() => setOpenGuide(false)}>
        This is a modal
      </Modal>
      <PauseContext.Provider value={openGuide}>
        <Piano />
      </PauseContext.Provider>
    </>
  );
};

export default App;
