import LabeledInput from '@components/labeled-input/labeled-input';
import MainContainer from '@components/main-container/main-container';
import { useEffect, useState } from 'react';
import './register.css';
import { iCampaign } from '../../interfaces/hooks/campaigns';
import { toast } from 'react-toastify';

const SELECTED_CAMPAIGN_KEY = 'selectedCampaign';

interface FormData {
  pet_name: string;
  specie: number;
  weight: string;
  gender: number;
  date: string;
  campaign_id: number;
  responsible_name: string;
  responsible_document: string;
  phone: string;
  document: string;
  address: {
    street: string;
    neighborhood: string;
    number: string;
    zip_code: string;
    state: string;
    city: string;
    complement: string;
  };
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    pet_name: '',
    specie: 0,
    weight: '',
    gender: 0,
    date: '',
    campaign_id: 0,
    responsible_name: '',
    responsible_document: '',
    phone: '',
    document: '',
    address: {
      street: '',
      neighborhood: '',
      number: '',
      zip_code: '',
      state: '',
      city: '',
      complement: '',
    },
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    (async () => {
      const data = localStorage.getItem(SELECTED_CAMPAIGN_KEY);
      if (data !== null) {
        const objectData: iCampaign = JSON.parse(data);
        setFormData((prevData) => ({
          ...prevData,
          campaign_id: objectData.id,
        }));
      } else {
        toast.info('Você ainda não selecionou nenhuma campanha');
      }
    })();
  }, []);

  const validateField = (label: keyof FormData, value: string) => {
    let error = '';
    switch (label) {
    case 'pet_name':
      if (!value) error = 'Nome do pet é obrigatório';
      break;
    case 'responsible_name':
      if (!value) error = 'Nome do responsável é obrigatório';
      break;
    case 'responsible_document':
      if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value)) error = 'CPF inválido';
      break;
    case 'phone':
      if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(value)) error = 'Telefone inválido';
      break;
    case 'document':
      if (!value) error = 'Documento é obrigatório';
      break;
    case 'weight':
      if (!value || isNaN(Number(value))) error = 'Peso inválido';
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

  const handleAddressChange = (field: keyof FormData['address'], value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      address: { ...prevData.address, [field]: value },
    }));
  };

  const handleGenderChange = (value: number) => {
    setFormData((prevData) => ({ ...prevData, gender: value }));
  };

  const handleSpecieChange = (value: number) => {
    setFormData((prevData) => ({ ...prevData, specie: value }));
  };

  const handleSubmit = () => {
    if (Object.values(errors).every((error) => !error)) {
      console.log(formData);
      setFormData({
        pet_name: '',
        specie: 0,
        weight: '',
        gender: 0,
        date: '',
        campaign_id: 0,
        responsible_name: '',
        responsible_document: '',
        phone: '',
        document: '',
        address: {
          street: '',
          neighborhood: '',
          number: '',
          zip_code: '',
          state: '',
          city: '',
          complement: '',
        },
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
          <h2>CAMPANHA DE VACINAÇÃO</h2>

          <div className="form-row">
            <LabeledInput
              label="Nome do Pet"
              type="text"
              value={formData.pet_name}
              onChange={(e) => handleInputChange('pet_name', e.target.value)}
              error={errors.pet_name}
            />

            <LabeledInput
              label="Peso (kg)"
              type="text"
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              error={errors.weight}
            />
          </div>

          <div className="form-row">
            <LabeledInput
              label="Nome do Responsável"
              type="text"
              value={formData.responsible_name}
              onChange={(e) => handleInputChange('responsible_name', e.target.value)}
              error={errors.responsible_name}
            />

            <LabeledInput
              label="CPF do Responsável"
              type="text"
              value={formData.responsible_document}
              onChange={(e) => handleInputChange('responsible_document', e.target.value)}
              error={errors.responsible_document}
              mask="999.999.999-99"
            />
          </div>

          <div className="form-row">
            <LabeledInput
              label="Telefone"
              type="text"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={errors.phone}
              mask="(99) 99999-9999"
            />

            <LabeledInput
              label="Documento"
              type="text"
              value={formData.document}
              onChange={(e) => handleInputChange('document', e.target.value)}
              error={errors.document}
            />
          </div>

          <div className="form-row">
            <div className="radio-group">
              <input
                type="radio"
                id="dog"
                value={0}
                checked={formData.specie === 0}
                onChange={() => handleSpecieChange(0)}
              />
              <label htmlFor="dog">Cachorro</label>

              <input
                type="radio"
                id="cat"
                value={1}
                checked={formData.specie === 1}
                onChange={() => handleSpecieChange(1)}
              />
              <label htmlFor="cat">Gato</label>
            </div>
          </div>

          <div className="form-row">
            <div className="radio-group">
              <input
                type="radio"
                id="male"
                value={0}
                checked={formData.gender === 0}
                onChange={() => handleGenderChange(0)}
              />
              <label htmlFor="male">Macho</label>

              <input
                type="radio"
                id="female"
                value={1}
                checked={formData.gender === 1}
                onChange={() => handleGenderChange(1)}
              />
              <label htmlFor="female">Fêmea</label>
            </div>
          </div>

          <div className="form-row">
            <LabeledInput
              label="Rua"
              type="text"
              value={formData.address.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
            />

            <LabeledInput
              label="Bairro"
              type="text"
              value={formData.address.neighborhood}
              onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
            />
          </div>

          <div className="form-row">
            <LabeledInput
              label="Número"
              type="text"
              value={formData.address.number}
              onChange={(e) => handleAddressChange('number', e.target.value)}
            />

            <LabeledInput
              label="CEP"
              type="text"
              value={formData.address.zip_code}
              onChange={(e) => handleAddressChange('zip_code', e.target.value)}
              mask="99999-999"
            />
          </div>

          <div className="form-row">
            <LabeledInput
              label="Estado"
              type="text"
              value={formData.address.state}
              onChange={(e) => handleAddressChange('state', e.target.value)}
            />

            <LabeledInput
              label="Cidade"
              type="text"
              value={formData.address.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
            />
          </div>

          <div className="form-row">
            <LabeledInput
              label="Complemento"
              type="text"
              value={formData.address.complement}
              onChange={(e) => handleAddressChange('complement', e.target.value)}
            />
          </div>

          <div className='submit-button-container'>
            <button className='submit-button' onClick={handleSubmit}>Enviar</button>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}
