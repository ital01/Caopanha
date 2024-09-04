import WaveLetter from "@components/wave-letter/waveLetter";
import { useEffect, useState } from "react";

export default function Home() {
  const [animateWave, setAnimateWave] = useState(false);

  useEffect(() => setAnimateWave(true), []);

  return (
    <main
      style={{
        height: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '1vh 1vw',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          animation: 'slideDown 1s ease-out',
          overflow: 'hidden',
        }}
      >
        <h1 style={{ fontSize: '3vw', animation: 'slideDown 2s ease-out' }}>
          <span>Agora ficou fácil cuidar do seu </span>
          <WaveLetter letter='a' color="#01BBB2" delay={0.1} animateWave={animateWave} />
          <WaveLetter letter='m' color="#FE684D" delay={0.3} animateWave={animateWave} />
          <WaveLetter letter='i' color="#01BBB2" delay={0.5} animateWave={animateWave} />
          <WaveLetter letter='g' color="#FE684D" delay={0.7} animateWave={animateWave} />
          <WaveLetter letter='o' color="#01BBB2" delay={0.9} animateWave={animateWave} />
        </h1>
        <h2 style={{ fontSize: '2vw', animation: 'slideDown 2s ease-out' }}>
          Agende por aqui a vacinação do seu pet
        </h2>
      </div>

      <img
        src='images/pets.png'
        alt='Imagem de Animais'
        style={{
          width: '55vw',
          animation: 'slideUp 1.5s ease-out',
          overflow: 'hidden',
        }}
      />

      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20%);
          }
        }
      `}</style>
    </main>
  );
}