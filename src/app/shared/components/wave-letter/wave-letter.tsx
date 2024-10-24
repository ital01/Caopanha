import { ReactNode } from 'react';

export default function WaveLetter({
  letter,
  color,
  delay,
  animateWave
}: {
  letter: ReactNode,
  color: string,
  delay: number,
  animateWave: boolean
}) {
  return (
    <span
      style={{
        color,
        display: 'inline-block',
        animation: animateWave ? `wave 1.5s ease-in-out ${delay}s infinite` : 'none',
      }}
    >
      {letter}
    </span>
  );
}
