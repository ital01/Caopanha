import { useState } from 'react';
import LabeledInput from '@components/labeled-input/labeled-input';
import MainContainer from '@components/main-container/main-container';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Formulário enviado');
    console.log({ email: email, senha: password });
  };

  return (
    <MainContainer>
      <h1
        style={{
          width: '100%',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '4.5rem',
          letterSpacing: '0.1rem',
        }}
      >
        Bem Vindo de Volta
      </h1>
      <section
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          marginTop: 'auto',
        }}
      >
        <img
          src={'/images/image.webp'}
          alt="Pets"
          style={{
            width: '70%',
          }}
        />
        <div
          style={{
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
            paddingRight: '10rem',
            marginTop: '1rem',
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <LabeledInput
              type="text"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <LabeledInput
              type="password"
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button
              style={{
                backgroundColor: '#79B8AA',
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '9rem',
                alignSelf: 'end',
                fontWeight: 500,
                letterSpacing: '0.1rem',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6a9f92'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#79B8AA'}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Esqueci minha senha
            </button>
            <br />
            <button
              type="submit"
              style={{
                backgroundColor: '#01BBB2',
                color: '#fff',
                alignSelf: 'end',
                borderRadius: '0.8rem',
                padding: '1rem 2rem',
                fontSize: '2.4rem',
                letterSpacing: '0.1rem',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#019e96'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#01BBB2'}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Entrar
            </button>
          </form>
          <br /><br />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'end',
              alignItems: 'end',
            }}
          >
            <h2
              style={{
                fontSize: '2.4rem',
                fontWeight: 'bold',
                letterSpacing: '0.1rem',
              }}
            >
              Ainda não participa ?
            </h2>
            <br />
            <button
              style={{
                backgroundColor: '#FE684D',
                color: '#fff',
                padding: '1rem 3.5rem',
                borderRadius: '0.8rem',
                fontSize: '2.4rem',
                letterSpacing: '0.1rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e75e45'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FE684D'}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Quero Participar
            </button>
          </div>
        </div>
      </section>
    </MainContainer>
  );
}
