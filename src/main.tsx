import './styles/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Piano from './components/Piano.tsx';
import { DiceIcon, ResetIcon } from './constants/icons.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='flex justify-center gap-2'>
      <ResetIcon height={128} />
      <DiceIcon height={128} />
    </div>
    <Piano />
  </StrictMode>,
);
