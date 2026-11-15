import React from 'react';
import './styles/particles.css';

interface ParticleConfig {
  x: string;
  duration: string;
  delay: string;
  wobble: string;
  size: string;
}

const PARTICLES: ParticleConfig[] = [
  { x: '10%', duration: '9s', delay: '0s', wobble: '25px', size: '2rem' },
  { x: '25%', duration: '7s', delay: '-2s', wobble: '-35px', size: '1.5rem' },
  { x: '45%', duration: '11s', delay: '-4s', wobble: '40px', size: '3rem' },
  { x: '70%', duration: '8s', delay: '-1.5s', wobble: '-20px', size: '2.2rem' },
  { x: '88%', duration: '10s', delay: '-3s', wobble: '30px', size: '1.8rem' },
  { x: '18%', duration: '12s', delay: '-5s', wobble: '20px', size: '2.4rem' },
  { x: '60%', duration: '8.5s', delay: '-2.5s', wobble: '-30px', size: '1.6rem' },
  { x: '82%', duration: '9.5s', delay: '-6s', wobble: '25px', size: '2.7rem' },
];

export const ParticleField: React.FC = () => {
  return (
    <div className='particle-field' aria-hidden='true'>
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className='particle'
          style={
            {
              '--x': p.x,
              '--duration': p.duration,
              '--delay': p.delay,
              '--wobble': p.wobble,
              '--size': p.size,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};
