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
        <SlideDownText fontSize="4rem">
          <span>Agora ficou fácil cuidar do seu </span>
          <WaveLetter letter='a' color="#01BBB2" delay={0.1} animateWave={animateWave} />
          <WaveLetter letter='m' color="#FE684D" delay={0.3} animateWave={animateWave} />
          <WaveLetter letter='i' color="#01BBB2" delay={0.5} animateWave={animateWave} />
          <WaveLetter letter='g' color="#FE684D" delay={0.7} animateWave={animateWave} />
          <WaveLetter letter='o' color="#01BBB2" delay={0.9} animateWave={animateWave} />
        </SlideDownText>
        <SlideDownText fontSize="3rem">
          Agende por aqui a vacinação do seu pet
        </SlideDownText>
        <SlideUpImage src="images/pets.png" alt="Imagem de Animais" />
      </section>

      <section id="mid" className="section">
        <SlideDownText fontSize="4rem">
          Como Funciona ?
        </SlideDownText>
        <SlideDownText fontSize="3rem">
          É facil assim?
        </SlideDownText>
      </section>

      <section id="bot" className="section">
        <SlideDownText fontSize="4rem">
          Confira as Campanhas Ativas
        </SlideDownText>
        <SlideDownText fontSize="3rem">
          E não perca a oportunidade de cuidar de quem mais precisa de você
        </SlideDownText>
      </section>
    </MainContainer>
  );
}
