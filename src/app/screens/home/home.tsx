import { useEffect, useState } from "react";
import MainContainer from "@components/main-container/main-container";
import SlideDownText from "@components/slide-down-text/slide-down-text";
import SlideUpImage from "@components/slide-up-image/slide-up-image";
import WaveLetter from "@components/wave-letter/wave-letter";

export default function Home() {
  const [animateWave, setAnimateWave] = useState(false);

  useEffect(() => setAnimateWave(true), []);

  return (
    <MainContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <SlideDownText fontSize="3vw">
          <span>Agora ficou fácil cuidar do seu </span>
          <WaveLetter letter='a' color="#01BBB2" delay={0.1} animateWave={animateWave} />
          <WaveLetter letter='m' color="#FE684D" delay={0.3} animateWave={animateWave} />
          <WaveLetter letter='i' color="#01BBB2" delay={0.5} animateWave={animateWave} />
          <WaveLetter letter='g' color="#FE684D" delay={0.7} animateWave={animateWave} />
          <WaveLetter letter='o' color="#01BBB2" delay={0.9} animateWave={animateWave} />
        </SlideDownText>
        <SlideDownText fontSize="2vw">
          Agende por aqui a vacinação do seu pet
        </SlideDownText>
      </div>
      <SlideUpImage src="images/pets.png" alt="Imagem de Animais" />
    </MainContainer>
  );
}
