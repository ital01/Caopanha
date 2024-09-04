import Navigate from "@utils/navigation";
import ScrollToElement from "@utils/scroll-to-element";

const isLogged = true;
const isHomePage = true;

export default function Header() {
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
        padding: '1vw 2vw',
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
          onClick={isHomePage ? ScrollToElement('top') : Navigate('/home')}
          style={{
            backgroundImage: 'url("svg/brasao-americana.svg")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
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
          onClick={ScrollToElement('mid')}
          style={{ transition: 'color 0.2s ease-in-out' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
        >
          Como Funciona ?
        </button>
        <button 
          onClick={ScrollToElement('bot')}
          style={{ transition: 'color 0.2s ease-in-out' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
        >
          Campanhas Ativas
        </button>
        {
          isLogged ? (
            <>
              <a 
                href="/" 
                style={{ transition: 'color 0.2s ease-in-out' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
              >
                Agendamentos
              </a>
              <a 
                href="/" 
                style={{ transition: 'color 0.2s ease-in-out' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
              >
                Meus Pets
              </a>
              <a 
                href="/" 
                style={{ transition: 'color 0.2s ease-in-out' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
              >
                Minha Conta
              </a>
            </>
          ) : (
            <a 
              href="/login"
              style={{ transition: 'color 0.2s ease-in-out' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#555'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
            >
              Fazer Login
            </a>
          )
        }
      </nav>
    </header>
  );
}
