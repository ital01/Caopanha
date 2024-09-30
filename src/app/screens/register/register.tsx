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

  const validateField = (label: keyof FormData, value: string) => {
    let error = '';
    switch (label) {
    case 'nome':
      if (!value) error = 'Nome é obrigatório';
      break;
    case 'endereco':
      if (!value) error = 'Endereço é obrigatório';
      break;
    case 'cpf':
      if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value)) error = 'CPF inválido';
      break;
    case 'email':
      if (!/\S+@\S+\.\S+/.test(value)) error = 'Email inválido';
      break;
    case 'telefone':
      if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(value)) error = 'Telefone inválido';
      break;
    case 'dataDeNascimento':
      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) error = 'Data de nascimento inválida';
      break;
    case 'animal':
      if (!value) error = 'Nome do animal é obrigatório';
      break;
    case 'idadeDoAnimal':
      if (!/^\d+$/.test(value) || parseInt(value) < 0) error = 'Idade do animal inválida';
      break;
    default:
      break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [label]: error }));
  };

  const handleInputChange = (label: keyof FormData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [label]: value }));
    validateField(label, value);
  };

  const handleBlur = (label: keyof FormData) => {
    validateField(label, formData[label]);
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    Object.keys(formData).forEach((key) => {
      validateField(key as keyof FormData, formData[key as keyof FormData]);
      if (errors[key as keyof FormData]) {
        newErrors[key as keyof FormData] = errors[key as keyof FormData];
      }
    });
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
                onBlur={() => handleBlur('nome')}
                error={errors.nome}
              />

              <LabeledInput
                label="Endereço"
                type="text"
                value={formData.endereco}
                onChange={(e) => handleInputChange('endereco', e.target.value)}
                onBlur={() => handleBlur('endereco')}
                error={errors.endereco}
              />

              <LabeledInput
                label="Telefone"
                type="text"
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
                onBlur={() => handleBlur('telefone')}
                error={errors.telefone}
                mask="(99) 99999-9999"
              />

              <LabeledInput
                label="CPF"
                type="text"
                value={formData.cpf}
                onChange={(e) => handleInputChange('cpf', e.target.value)}
                onBlur={() => handleBlur('cpf')}
                error={errors.cpf}
                mask="999.999.999-99"
              />
            </div>
            <div className="form-column">
              <LabeledInput
                label="Data de Nascimento"
                type="text"
                value={formData.dataDeNascimento}
                onChange={(e) => handleInputChange('dataDeNascimento', e.target.value)}
                onBlur={() => handleBlur('dataDeNascimento')}
                error={errors.dataDeNascimento}
                mask="99/99/9999"
              />

              <LabeledInput
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                error={errors.email}
              />

              <LabeledInput
                label="Animal"
                type="text"
                value={formData.animal}
                onChange={(e) => handleInputChange('animal', e.target.value)}
                onBlur={() => handleBlur('animal')}
                error={errors.animal}
              />

              <LabeledInput
                label="Idade do Animal"
                type="text"
                value={formData.idadeDoAnimal}
                onChange={(e) => handleInputChange('idadeDoAnimal', e.target.value)}
                onBlur={() => handleBlur('idadeDoAnimal')}
                error={errors.idadeDoAnimal}
              />
            </div>
          </div>
          <div className='submit-button-container'>
            <button className="submit-button" onClick={handleSubmit}>
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}
