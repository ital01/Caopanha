import { useState } from 'react';
import LabeledInput from '@components/labeled-input/labeled-input';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Formulário enviado');
    console.log({ email: email, senha: password });
  };

  return (
    <main
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <h1 className="title">Bem Vindo de Volta</h1>
      <section className="container">
        <img src={'/images/image.webp'} alt="Pets" className="image" />
        <div className="formContainer">
          <form onSubmit={handleSubmit} className="form">
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
            <button className="button">Esqueci minha senha</button>
            <br />
            <button type="submit" className="submitButton">Entrar</button>
          </form>
          <br /><br />
          <div className="participateContainer">
            <h2 className="participateTitle">Ainda não participa?</h2>
            <br />
            <button className="participateButton">Quero Participar</button>
          </div>
        </div>
      </section>
    </main>
  );
}
