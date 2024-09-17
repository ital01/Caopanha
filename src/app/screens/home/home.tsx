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
      <section id="top" className="section">
        <SlideDownText>
          <span>Agora ficou fácil cuidar do seu </span>
          <WaveLetter letter='a' color="#01BBB2" delay={0.1} animateWave={animateWave} />
          <WaveLetter letter='m' color="#FE684D" delay={0.3} animateWave={animateWave} />
          <WaveLetter letter='i' color="#01BBB2" delay={0.5} animateWave={animateWave} />
          <WaveLetter letter='g' color="#FE684D" delay={0.7} animateWave={animateWave} />
          <WaveLetter letter='o' color="#01BBB2" delay={0.9} animateWave={animateWave} />
        </SlideDownText>
        <SlideDownText> 
          Agende por aqui a vacinação do seu pet
        </SlideDownText>
        <SlideUpImage
          src={`/images/pets.webp`}
          alt="Imagem de Animais"
          width="55vw"
        />
      </section>

      <section id="mid" className="section">
        <SlideDownText> 
          Como Funciona ?
        </SlideDownText>
        <SlideDownText> 
          É facil assim?
        </SlideDownText>
      </section>
    </MainContainer>
  );
}
