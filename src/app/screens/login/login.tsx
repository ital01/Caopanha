import { useContext, useState } from 'react';
import LabeledInput from '@components/labeled-input/labeled-input';
import { AuthContext } from '../../context/auth.context';
import Modal from '@components/modal/modal';
import { UsersHook } from '../../hooks';
import api from '../../services/api';
import './login.css';
import MainContainer from '@components/main-container/main-container';
import { toast } from 'react-toastify';

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [validationCode, setValidationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailToRecoveryPassword, setEmailToRecoveryPassword] = useState('');
  const [passwordRecoveryStep, setPasswordRecoveryStep] = useState(0);
  const [isPasswordRecoveryModalOpen, setIsPasswordRecoveryModalOpen] = useState(false);

  const handleSubmit = async () => {
    console.log(email, password);
    const response = await signIn({ email, password, setError });
    console.error(error);
    console.log(response);
    if (response !== undefined && response !== null) {
      toast.success('Login realizado com sucesso');
    } else {
      toast.error('Falha ao realizar login');
    }
  };

  const handlePasswordRecovery = async () => {
    if (passwordRecoveryStep < 2) {
      if (passwordRecoveryStep === 0) {
        const data = { email: emailToRecoveryPassword };
        const valid = await UsersHook.passwordRecovery(data);
        if (!valid) {
          setEmailError(true);
          return;
        }
      } else if (passwordRecoveryStep === 1) {
        const data = { code: validationCode, email: emailToRecoveryPassword };
        const valid = await UsersHook.passwordRecoveryValidationCode(data);
        if (!valid) {
          setCodeError(true);
          console.log(codeError);
          return;
        }
        api.defaults.headers['Authorization'] = `Bearer ${valid.access_token}`;
      }
      setPasswordRecoveryStep((prev) => prev + 1);
    } else if (passwordRecoveryStep === 2) {
      const data = { password: newPassword };
      const valid = await UsersHook.passwordRecoveryChangePassword(data);
      if (!valid) return;
      setPasswordRecoveryStep((prev) => prev + 1);
    } else {
      onClosePasswordRecoveryModal();
    }
  };

  const onClosePasswordRecoveryModal = () => {
    setPasswordRecoveryStep(0);
    setIsPasswordRecoveryModalOpen(false);
    setEmailToRecoveryPassword('');
    setNewPassword('');
    setValidationCode('');
    setEmailError(false);
    setCodeError(false);
    console.log(codeError);
  };

  const Step01 = () => (
    <>
      <LabeledInput
        type="email"
        label="Digite seu e-mail cadastrado"
        value={emailToRecoveryPassword}
        onChange={(e) => setEmailToRecoveryPassword(e.target.value)}
      />
      {emailError ? <p style={{ color: 'red' }}>E-mail inválido</p> : <p>Você irá receber um código em seu e-mail</p>}
    </>
  );

  const Step02 = () => (
    <>
      <LabeledInput
        type="text"
        label="Digite o código de recuperação"
        value={validationCode}
        onChange={(e) => setValidationCode(e.target.value)}
      />
      {codeError ? <p style={{ color: 'red' }}>Código inválido</p> : <p>Verifique sua caixa de entrada e spam</p>}
    </>
  );

  const Step03 = () => (
    <LabeledInput
      type="password"
      label="Digite sua nova senha"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
    />
  );

  const Step04 = () => (
    <>
      <h3>Senha alterada com sucesso!</h3>
      <p>Sua senha foi alterada, faça o login para acessar o sistema</p>
    </>
  );

  const RECOVERY_STEPS = [<Step01 />, <Step02 />, <Step03 />, <Step04 />];

  const PasswordRecoveryModalContent = () => (
    <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 15, width: 400 }}>
      <h2>Recuperar senha</h2>
      {RECOVERY_STEPS[passwordRecoveryStep]}
      <button className="button" onClick={handlePasswordRecovery}>
        {passwordRecoveryStep < 2 ? 'Continuar' : passwordRecoveryStep === 2 ? 'Alterar' : 'Fechar'}
      </button>
    </div>
  );

  return (
    <MainContainer
      style={{
        height: '100vh',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 className="title">Bem Vindo de Volta</h1>
      <section className="container">
        <img src="/images/image.webp" alt="Pets" className="image" />
        <div className="formContainer">
          <div className="form">
            <LabeledInput
              type="text"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <LabeledInput
              type="password"
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={
                () => {
                  setIsPasswordRecoveryModalOpen(true);
                }
              }
              className="button"
            >
              Esqueci minha senha
            </button>
            <button onClick={handleSubmit} className="submitButton">Entrar</button>
          </div>
          {/*
          <div className="participateContainer">
            <h2 className="participateTitle">Ainda não participa?</h2>
            <button className="participateButton">Quero Participar</button>
          </div>
          */}
        </div>
        <Modal isOpen={isPasswordRecoveryModalOpen} onClose={onClosePasswordRecoveryModal}>
          <PasswordRecoveryModalContent />
        </Modal>
      </section>
    </MainContainer>

  );
}
