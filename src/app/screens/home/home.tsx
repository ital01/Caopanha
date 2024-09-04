export default function Home() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '2rem auto'
      }}
    >
      <h1>
        <span>Agora ficou fácil cuidar do seu </span>
        <span style={{color: "#01BBB2"}}>a</span>
        <span style={{color: "#FE684D"}}>m</span>
        <span style={{color: "#01BBB2"}}>i</span>
        <span style={{color: "#FE684D"}}>g</span>
        <span style={{color: "#01BBB2"}}>o</span>
      </h1>
      <h2>Agende por aqui a vacinação do seu pet</h2>
      <img src="images/pets.png" alt="" />
    </main>
  );
};
