import { useContext, useEffect, useRef, useState } from "react";
import LabeledInput from "@components/labeled-input/labeled-input";
import MainContainer from "@components/main-container/main-container";
import { AuthContext } from "../../context/auth.context";
import Modal from "@components/modal/modal";
import { UsersHook } from "../../hooks";
import api from "../../services/api";

export default function Login() {
  const {signIn} = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const [emailError, setEmailError] = useState(false);
  const [codeError, setCodeError] = useState(false);


  const [validationCode, setValidationCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [emailToRecoveryPassword, setEmailToRecoveryPassword] = useState("");

  const [passwordRecoveryStep, setPasswordRecoveryStep] = useState(0)

  const [isPasswordRecoveryModalOpen, setIsPasswordRecoveryModalOpen] = useState(false)


  const handleSubmit =async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();  

      await signIn({email, password, setError})
    
  };

  const handlePasswordRecovery = async () => {
    if(passwordRecoveryStep < 2){

      if(passwordRecoveryStep == 0){
         const valid = await UsersHook.passwordRecovery({email: emailToRecoveryPassword})

         if(!valid){
          setEmailError(true)
          return
         }
    
      }else if(passwordRecoveryStep == 1){
        const valid = await UsersHook.passwordRecoveryValidationCode({code: validationCode, email: emailToRecoveryPassword})

        if(!valid){
          setCodeError(true)
          return
        }

        api.defaults.headers["Authorization"] = `Bearer ${valid.access_token}`;

      }

      setPasswordRecoveryStep((prev) => prev+1)
    }else if(passwordRecoveryStep == 2){
      const valid = await UsersHook.passwordRecoveryChangePassword({password: newPassword })

      if(!valid) return
      
      setPasswordRecoveryStep((prev) => prev+1)
      
    }else{
      onClosePasswordRecoveryModal()
    }
  }

  const onClosePasswordRecoveryModal = () => {
    setPasswordRecoveryStep(0)
    setIsPasswordRecoveryModalOpen(false)
    setEmailToRecoveryPassword('')
    setNewPassword('')
    setValidationCode('')
    setEmailError(false)
    setCodeError(false) 
  }

  const Step01 = () => (
    <>
  <LabeledInput
  type="email"
  label="Digite seu e-mail cadastrado"
  value={emailToRecoveryPassword}
  onChange={(e) => setEmailToRecoveryPassword(e.target.value)}
/>
{emailError ? <p style={{ color: 'red'}}>E-mail inválido</p>: <p>Você irá receber um código em seu e-mail</p> }


</>
  )

  const Step02 = () => (
    <>

          <LabeledInput
          type="text"
          label="Digite o código de recuperação"
          value={validationCode}
          onChange={(e) => setValidationCode(e.target.value)}
          />
          {codeError ?  <p style={{ color: 'red'}}>Código inválido</p>:  <p>Verifique sua caixa de entrada e spam</p>}
          </>
  )

  const Step03 = () => (
    <LabeledInput
      type="password"
      label="Digite sua nova senha"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)} />
  )

  const Step04 = () => (
    <>
   <h3>Senha alterada com sucesso!</h3>
   <p>Sua senha foi alterada, faça o login para acessar o sistema</p>
    </>
  )

  const RECOVERY_STEPS = [
    <Step01 />,
     <Step02 />,
     <Step03 />,
     <Step04 />
  ]

  const PasswordRecoveryModalContent = () => (
    <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 15, width: 400}}>
         <h2>Recuperar senha</h2>
    
          {RECOVERY_STEPS[passwordRecoveryStep]}

            <button  style={{
                backgroundColor: '#01BBB2',
                color: '#fff',
                alignSelf:'end',
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
              onClick={() => handlePasswordRecovery()}
              >{passwordRecoveryStep < 2 ? 'Continuar': passwordRecoveryStep == 2 ? 'Alterar' : 'Fechar'}</button>
            </div>
  )

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
          width: "100%",
          display: "flex",
          flexDirection: "row",
          marginTop: "auto",
        }}
      >
        <img
          src={`/images/image.webp`}
          alt="Pets"
          style={{
            width: "70%",
          }}
        />
        <div
          style={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            paddingRight: "10rem",
            marginTop: "1rem",
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
              onClick={(e) =>{ 
                e.preventDefault()
                 setIsPasswordRecoveryModalOpen(true)}}
            >
              Esqueci minha senha
            </button>
            <br />
            <button
              type="submit"
              style={{
                backgroundColor: '#01BBB2',
                color: '#fff',
                alignSelf:'end',
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
          <Modal isOpen={isPasswordRecoveryModalOpen} onClose={() => onClosePasswordRecoveryModal()} children={
            <PasswordRecoveryModalContent />
          } />
        </div>
      </section>
    </MainContainer>
  );
}
