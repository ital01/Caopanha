const isLogged = true;

const Header = () => {
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
        <img 
          src="svg/brasao-americana.svg" 
          height={'60px'}
          width={'auto'}
          alt="Brasão de Americana" 
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
            <a href="/">Fazer Login</a>
          )
        }
      </nav>
    </header>
  );
};

export default Header;