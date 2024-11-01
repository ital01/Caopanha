import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ScrollToElement from '@utils/scroll-to-element';
import './header.css';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(false);
  const isHome = location.pathname === '/home';

  useEffect(() => {
    const loginState = localStorage.getItem('isLogged');
    if (loginState) setIsLogged(loginState === 'true');
    else setIsLogged(false);
  }, [isLogged]);

  const logout = () => {
    localStorage.setItem('isLogged', 'false');
    setIsLogged(false);
    navigate('/home');
  };

  return (
    <header className="header">
      <div className="header-logo">
        <button
          onClick={isHome ? ScrollToElement('top') : () => navigate('/home')}
          className="logo-button"
        >
          <img src="svg/brasao-americana.svg" alt="Brasão de Americana" />
        </button>
        <p>Prefeitura de Americana</p>
      </div>

      <nav className="header-nav">
        {!isLogged &&
        <button
          className="nav-button"
          onClick={isHome ? ScrollToElement('mid') : () => navigate('/home')}
        >
          Como Funciona?
        </button>
        }
        <button onClick={() => navigate('/campanhas')} className="nav-button">
          Campanhas Ativas
        </button>
        {isLogged ? (
          <>
            <button onClick={() => navigate('/agendamentos')} className="nav-button">
              Agendamentos
            </button>
            <button onClick={() => navigate('/pets')} className="nav-button">
              Meus Pets
            </button>
            <button onClick={() => navigate('/servicos')} className="nav-button">
              Meus serviços
            </button>
            <button onClick={() => navigate('/dashboard')} className="nav-button">
              Minha Conta
            </button>
            <button
              onClick={logout}
              className="nav-button"
            >
              Sair
            </button>
          </>
        ) : (
          <button onClick={() => navigate('/login')} className="nav-button">
            Fazer Login
          </button>
        )}
      </nav>
    </header>
  );
}
