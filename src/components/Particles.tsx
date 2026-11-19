import React from 'react';
import '../styles/particles.css';
import { Star } from '../constants/icons';
import { renderToStaticMarkup } from 'react-dom/server';

interface ParticleConfig {
  x: string;
  duration: string;
  delay: string;
  wobble: string;
  size: string;
}

const PARTICLES: ParticleConfig[] = [
  { x: '5%', duration: '9s', delay: '0s', wobble: '25px', size: '2rem' },
  { x: '8%', duration: '10.8s', delay: '-2.2s', wobble: '-22px', size: '2.4rem' },
  { x: '12%', duration: '7s', delay: '-2s', wobble: '-35px', size: '1.5rem' },
  { x: '20%', duration: '11s', delay: '-4s', wobble: '40px', size: '2.8rem' },
  { x: '22%', duration: '8.2s', delay: '-4.2s', wobble: '38px', size: '1.3rem' },
  { x: '28%', duration: '8s', delay: '-1.5s', wobble: '-20px', size: '1.8rem' },
  { x: '35%', duration: '10s', delay: '-3s', wobble: '30px', size: '2.2rem' },
  { x: '38%', duration: '11.8s', delay: '-1.2s', wobble: '-33px', size: '2.9rem' },
  { x: '42%', duration: '12s', delay: '-5s', wobble: '-25px', size: '1.4rem' },
  { x: '50%', duration: '8.5s', delay: '-2.5s', wobble: '35px', size: '3.2rem' },
  { x: '52%', duration: '7.8s', delay: '-5.8s', wobble: '27px', size: '1.8rem' },
  { x: '58%', duration: '9.5s', delay: '-6s', wobble: '-30px', size: '1.9rem' },
  { x: '65%', duration: '7.5s', delay: '-1s', wobble: '20px', size: '2.5rem' },
  { x: '68%', duration: '9.8s', delay: '-2.8s', wobble: '-36px', size: '2.3rem' },
  { x: '72%', duration: '11.5s', delay: '-4.5s', wobble: '-40px', size: '1.6rem' },
  { x: '80%', duration: '8.8s', delay: '-3.5s', wobble: '25px', size: '2.1rem' },
  { x: '85%', duration: '12.5s', delay: '-3.8s', wobble: '21px', size: '1.5rem' },
  { x: '88%', duration: '10.2s', delay: '-0.5s', wobble: '-28px', size: '2.7rem' },
  { x: '92%', duration: '8.6s', delay: '-0.8s', wobble: '-26px', size: '2.6rem' },
  { x: '95%', duration: '9.2s', delay: '-5.5s', wobble: '32px', size: '1.7rem' },
];

const STAR_MASK = `url("${URL.createObjectURL(new Blob([renderToStaticMarkup(<Star />)], { type: 'image/svg+xml' }))}")`;

const ParticleField = () => (
  <div className='fixed inset-0 -z-1'>
    {PARTICLES.map((particle, i) => (
      <div
        key={i}
        className='particle absolute rounded-full aspect-square bottom-0'
        style={
          {
            '--x': particle.x,
            '--duration': particle.duration,
            '--delay': particle.delay,
            '--wobble': particle.wobble,
            '--size': particle.size,
            '--mask': STAR_MASK,
          } as React.CSSProperties
        }
      />
    ))}
  </div>
);

export default ParticleField;
