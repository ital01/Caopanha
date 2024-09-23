import { To, useLocation, useNavigate } from 'react-router-dom';
import ScrollToElement from '@utils/scroll-to-element';
import './header.css';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/home';
  const isLogged = false;

  const handleScrollOrNavigate = (scrollTarget: string, navigateTo: To) => {
    return isHome ? ScrollToElement(scrollTarget) : () => navigate(navigateTo);
  };

  return (
    <header className="header">
      <div className="header-logo">
        <button
          onClick={handleScrollOrNavigate('top', '/home')}
          className="logo-button"
        >
          <img src="svg/brasao-americana.svg" alt="Brasão de Americana" />
        </button>
        <p>Prefeitura de Americana</p>
      </div>

      <nav className="header-nav">
        <button onClick={handleScrollOrNavigate('mid', '/home')} className="nav-button">
          Como Funciona?
        </button>
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
            <button onClick={() => navigate('/dashboard')} className="nav-button">
              Minha Conta
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
