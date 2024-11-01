import { useEffect, useState } from 'react';
import MainContainer from '@components/main-container/main-container';
import SlideDownText from '@components/slide-down-text/slide-down-text';
import SlideUpImage from '@components/slide-up-image/slide-up-image';
import WaveLetter from '@components/wave-letter/wave-letter';

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
          src={'/images/pets.webp'}
          alt="Imagem de Animais"
          width="55%"
        />
      </section>

      <section id="mid" className="section">
        <SlideDownText>
          Como Funciona ?
        </SlideDownText>
        <SlideDownText>
          É facil assim?
        </SlideDownText>
        <div style={{ display: 'flex', gap: 12, flexDirection: 'column', marginBottom: 64 }}>
          <h2 style={{ fontSize: '2.4em', textAlign: 'center' }}>Sim !</h2>
          <p style={{ fontSize: '2.4rem', textAlign: 'center' }}>
            Navegue pela lista de campanhas ativas disponíveis na plataforma.
          </p>
          <p style={{ fontSize: '2.4rem', textAlign: 'center' }}>
            Você pode ver detalhes sobre cada uma, incluindo datas, locais e tipos de vacinas.
          </p>
          <p style={{ fontSize: '2.4rem', textAlign: 'center' }}>
            Basta acessar, preencher o formulário e agendar a vacinação.
          </p>
          <p style={{ fontSize: '2.4rem', textAlign: 'center' }}>
            Com apenas alguns cliques, você pode garantir a saúde do seu amigo peludo.
          </p>
          <p style={{ fontSize: '2.4rem', textAlign: 'center' }}>
            Não é necessário criar uma conta ou fazer login.
          </p>
          <p style={{ fontSize: '2.4rem', textAlign: 'center' }}>
            Basta acessar, preencher o formulário e agendar a vacinação.
          </p>
        </div>
      </section>
    </MainContainer>
  );
}
