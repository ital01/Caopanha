import LabeledInput from '@components/labeled-input/labeled-input';
import MainContainer from '@components/main-container/main-container';
import { useState } from 'react';

interface FormData {
  nome: string,
  endereco: string,
  telefone: string,
  cpf: string,
  dataDeNascimento: string,
  email: string,
  animal: string,
  idadeDoAnimal: string,
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    endereco: '',
    telefone: '',
    cpf: '',
    dataDeNascimento: '',
    email: '',
    animal: '',
    idadeDoAnimal: '',
  });

  const handleInputChange = (label: keyof FormData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [label]: value }));
  };

  const handleSubmit = () => {
    console.log(formData);
    setFormData({
      nome: '',
      endereco: '',
      telefone: '',
      cpf: '',
      dataDeNascimento: '',
      email: '',
      animal: '',
      idadeDoAnimal: '',
    });
  };

  return (
    <MainContainer>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: '30px',
        }}
      >
        <div
          style={{
            maxHeight: '100%',
            aspectRatio: '5/6'
          }}
        >
          <img
            src="https://placehold.co/900x900"
            alt="Imagem da campanha"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            justifyContent: 'space-between',
            alignContent: 'start',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'start',
              alignContent: 'start',
              gap: '1rem'
            }}
          >
            <h1 style={{ fontSize: '2.4rem' }}>CAMPANHA DE VACINAÇÃO</h1>
            <h2 style={{ fontSize: '2rem', fontWeight: 'normal' }}>
              Ruas das Imbuias, 949 - Cidade Jardim I, Americana - SP, 13466-600
            </h2>
            <h3 style={{ fontSize: '2rem', fontWeight: 'normal' }}>
              Venha vacinar seu pet e garantir a saúde do seu animal.
            </h3>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '3rem',
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                width: '50%',
                gap: '1.6rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <LabeledInput
                label="Nome"
                type="text"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
              />
              <LabeledInput
                label="Endereço"
                type="text"
                value={formData.endereco}
                onChange={(e) => handleInputChange('endereco', e.target.value)}
              />
              <LabeledInput
                label="Telefone"
                type="text"
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
              />
              <LabeledInput
                label="CPF"
                type="text"
                value={formData.cpf}
                onChange={(e) => handleInputChange('cpf', e.target.value)}
              />
            </div>
            <div
              style={{
                width: '50%',
                gap: '1.6rem',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <LabeledInput
                label="Data de Nascimento"
                type="text"
                value={formData.dataDeNascimento}
                onChange={(e) => handleInputChange('dataDeNascimento', e.target.value)}
              />
              <LabeledInput
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
              <LabeledInput
                label="Animal"
                type="text"
                value={formData.animal}
                onChange={(e) => handleInputChange('animal', e.target.value)}
              />
              <LabeledInput
                label="Idade do animal"
                type="text"
                value={formData.idadeDoAnimal}
                onChange={(e) => handleInputChange('idadeDoAnimal', e.target.value)}
              />
            </div>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'end'
            }}
          >
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                backgroundColor: '#01BBB2',
                color: '#fff',
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
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}
