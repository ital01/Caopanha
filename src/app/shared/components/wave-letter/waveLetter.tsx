import { JSXElementConstructor, ReactElement, ReactNode } from "react";

export default function WaveLetter({
  letter,
  color,
  delay,
  animateWave
}: {
  letter: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined,
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