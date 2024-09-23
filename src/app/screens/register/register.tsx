import LabeledInput from '@components/labeled-input/labeled-input';
import MainContainer from '@components/main-container/main-container';
import { useState } from 'react';
import './register.css';

interface FormData {
  nome: string;
  endereco: string;
  telefone: string;
  cpf: string;
  dataDeNascimento: string;
  email: string;
  animal: string;
  idadeDoAnimal: string;
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

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (label: keyof FormData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [label]: value }));
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.endereco) newErrors.endereco = 'Endereço é obrigatório';
    if (!/^\d{11}$/.test(formData.cpf)) newErrors.cpf = 'CPF inválido';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.telefone)) newErrors.telefone = 'Telefone inválido';
    if (!formData.dataDeNascimento) newErrors.dataDeNascimento = 'Data de nascimento inválida';
    if (!formData.animal) newErrors.animal = 'Nome do animal é obrigatório';
    if (!/^\d+$/.test(formData.idadeDoAnimal) || parseInt(formData.idadeDoAnimal) < 0) {
      newErrors.idadeDoAnimal = 'Idade do animal inválida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
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
      setErrors({});
    }
  };

  return (
    <MainContainer>
      <div className="register-container">
        <div className="image-container">
          <img
            src="https://placehold.co/900x900"
            alt="Imagem da campanha"
            className="campaign-image"
          />
        </div>
        <div className="form-container">
          <div className="campaign-details">
            <h2>CAMPANHA DE VACINAÇÃO</h2>
            <p>Ruas das Imbuias, 949 - Cidade Jardim I, Americana - SP, 13466-600</p>
            <p>Venha vacinar seu pet e garantir a saúde do seu animal.</p>
          </div>
          <div className="form-content">
            <div className="form-column">
              <LabeledInput
                label="Nome"
                type="text"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                error={errors.nome}
              />

              <LabeledInput
                label="Endereço"
                type="text"
                value={formData.endereco}
                onChange={(e) => handleInputChange('endereco', e.target.value)}
                error={errors.endereco}
              />

              <LabeledInput
                label="Telefone"
                type="text"
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
                error={errors.telefone}
              />

              <LabeledInput
                label="CPF"
                type="text"
                value={formData.cpf}
                onChange={(e) => handleInputChange('cpf', e.target.value)}
                error={errors.cpf}
              />
            </div>
            <div className="form-column">
              <LabeledInput
                label="Data de Nascimento"
                type="text"
                value={formData.dataDeNascimento}
                onChange={(e) => handleInputChange('dataDeNascimento', e.target.value)}
                error={errors.dataDeNascimento}
              />

              <LabeledInput
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
              />

              <LabeledInput
                label="Animal"
                type="text"
                value={formData.animal}
                onChange={(e) => handleInputChange('animal', e.target.value)}
                error={errors.animal}
              />

              <LabeledInput
                label="Idade do animal"
                type="text"
                value={formData.idadeDoAnimal}
                onChange={(e) => handleInputChange('idadeDoAnimal', e.target.value)}
                error={errors.idadeDoAnimal}
              />
            </div>
          </div>
          <div className="submit-button-container">
            <button
              type="button"
              onClick={handleSubmit}
              className="submit-button"
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
