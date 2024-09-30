import { useLocation, useNavigate } from "react-router-dom";
import ScrollToElement from "@utils/scroll-to-element";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth.context";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const {user, logout} = useContext(AuthContext);
  const [isLogged, setIsLogged] = useState(false);

  const isHome = location.pathname === '/home';

  console.log(user);
 
  useEffect(() => {
    if(user) setIsLogged(true);
  },[user]);

  return (
    <header
      style={{
        width: '100%',
        position: 'sticky',
        top: '0',
        zIndex: '2',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#79B8AA',
        padding: '0.5vw 1vw',
        fontWeight: 'bold',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '0.5vw',
        }}
      >
        <button
          onClick={isHome ? ScrollToElement('top') : () => navigate('/home')}
          style={{
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(/svg/brasao-americana.svg)`,
            height: '4vw',
            width: '6vw',
            transition: 'transform 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          aria-label="Brasão de Americana"
        />
        <p>Prefeitura de Americana</p> 
      </div>

      <nav
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '3vw'
        }}
      >
        {!user &&
        <button
          onClick={isHome ? ScrollToElement('mid') : () => navigate('/home')}
          style={{ transition: 'color 0.2s ease-in-out' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
        >
          Como Funciona ?
        </button>
        }
        <button 
          onClick={() => navigate(`/campanhas`)}
          style={{ transition: 'color 0.2s ease-in-out' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
        >
          Campanhas Ativas
        </button>
        {
          isLogged ? (
            <>
              <button
                onClick={() => navigate(`/agendamentos`)}
                style={{ transition: 'color 0.2s ease-in-out' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
              >
                Agendamentos
              </button>
              <button
                onClick={() => navigate(`/pets`)} 
                style={{ transition: 'color 0.2s ease-in-out' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
              >
                Meus Pets
              </button>
              <button
                onClick={() => navigate(`/servicos`)} 
                style={{ transition: 'color 0.2s ease-in-out' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
              >
                Serviços
              </button>
              <button
                onClick={() => navigate(`/dashboard`)} 
                style={{ transition: 'color 0.2s ease-in-out' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
              >
                Minha Conta
              </button>
              <button
                onClick={logout} 
                style={{ transition: 'color 0.2s ease-in-out' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
              >
                Sair
              </button>
            </>
          ) : (
            <button 
              onClick={() => navigate(`/login`)}
              style={{ transition: 'color 0.2s ease-in-out' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
            >
              Fazer Login
            </button>
          )
        }
      </nav>
    </header>
  );
}
