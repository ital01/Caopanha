import { useLocation, useNavigate } from "react-router-dom";
import ScrollToElement from "@utils/scroll-to-element";
import environment from '@environment/environment';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === environment.repoName;
  const isLogged = false;

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
        padding: '1rem 2rem',
        fontWeight: 'bold',
        fontSize: '1.8rem'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <button
          onClick={isHome ? ScrollToElement('top') : ()=>navigate(environment.repoName)}
          style={{
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${environment.repoName}/images/brasao-americana.svg)`,
            height: '7vh',
            width: '7vh',
            transition: 'transform 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          aria-label="Brasão de Americana"
        />
        <p style={{ fontSize: '1.8rem' }}>Prefeitura de Americana</p>
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
        <button
          onClick={isHome ? ScrollToElement('mid') : ()=>navigate(environment.repoName)}
          style={{ transition: 'color 0.2s ease-in-out' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
        >
          Como Funciona ?
        </button>
        <button 
          onClick={()=>navigate(`${environment.repoName}/campanhas`)}
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
                onClick={()=>navigate(`${environment.repoName}/agendamentos`)}
                style={{ transition: 'color 0.2s ease-in-out' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
              >
                Agendamentos
              </button>
              <button
                onClick={()=>navigate(`${environment.repoName}/pets`)} 
                style={{ transition: 'color 0.2s ease-in-out' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
              >
                Meus Pets
              </button>
              <button
                onClick={()=>navigate(`${environment.repoName}/dashboard`)} 
                style={{ transition: 'color 0.2s ease-in-out' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
              >
                Minha Conta
              </button>
            </>
          ) : (
            <button 
              onClick={()=>navigate(`${environment.repoName}/login`)}
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
