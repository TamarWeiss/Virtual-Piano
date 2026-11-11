import './styles/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Piano from './components/Piano.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Piano />
  </StrictMode>,
);
