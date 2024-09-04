import Navigate from "@utils/navigation";

const isLogged = false;

export default function Header() {
  return (
    <header 
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#79B8AA',
        padding: '1.5rem 3rem',
        fontWeight: 'bold',
        fontSize: '1.8rem'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '1.6rem'
        }}
      >
        <button
          onClick={Navigate('/home')}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            backgroundImage: 'url("svg/brasao-americana.svg")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '60px',
            width: '60px',
          }}
          aria-label="Brasão de Americana"
        />
        <p>Prefeitura de Americana</p>
      </div>

      <nav
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
          gap: '4rem'
        }}
      >
        <a href="/">Como Funciona ?</a>
        <a href="/">Campanhas Ativas</a>
        {
          isLogged ? (
            <>
              <a href="/">Agendamentos</a>
              <a href="/">Meus Pets</a>
              <a href="/">Minha Conta</a>
            </>
          ) : (
            <a href="/login">Fazer Login</a>
          )
        }
      </nav>
    </header>
  );
};