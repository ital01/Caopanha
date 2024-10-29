import LabeledInput from '@components/labeled-input/labeled-input';
import MainContainer from '@components/main-container/main-container';
import './register.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { iCampaign } from '../../interfaces/hooks/campaigns';
import { toast } from 'react-toastify';
import { Address, PetRegistration } from '../../interfaces/hooks/appointments';
import { createAppointment } from '../../hooks/appointments';

const SELECTED_CAMPAIGN_KEY = 'selectedCampaign';

export default function Register() {
  const [address, setAddress] = useState<Address>({} as Address);
  const [formData, setPetRegistration] = useState<PetRegistration>({} as PetRegistration);
  const [errors, setErrors] = useState<Partial<PetRegistration>>({} as PetRegistration);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [image, setImage] = useState('');
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const data = localStorage.getItem(SELECTED_CAMPAIGN_KEY);
      if (data !== null) {
        const objectData: iCampaign = JSON.parse(data);
        setPetRegistration((prevData) => ({
          ...prevData,
          campaign_id: objectData.id,
        }));
        setImage(objectData.logo);
      } else {
        toast.info('Você ainda não selecionou nenhuma campanha');
      }
    })();
    const updateDimensions = () => {
      if (imageContainerRef.current) {
        const { offsetWidth, offsetHeight } = imageContainerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateDimensions();

    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const getImageUrl = useCallback((): string => {
    if (image === '') {
      return `https://placehold.co/${dimensions.width}x${dimensions.height}`;
    } else {
      return image;
    }
  }, [image, dimensions]);

  const validateField = (label: keyof PetRegistration, value: string) => {
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

  const handleInputChange = (label: keyof PetRegistration, value: string) => {
    setPetRegistration((prevData) => ({ ...prevData, [label]: value }));
    validateField(label, value);
  };

  const handleAddressChange = (field: keyof Address, value: string) => {
    setAddress((prevAddress) => ({ ...prevAddress, [field]: value }));
    setPetRegistration((prevData) => ({
      ...prevData,
      address: { ...prevData.address, [field]: value },
    }));
  };

  const handleGenderChange = (value: number) => {
    setPetRegistration((prevData) => ({ ...prevData, gender: value }));
  };

  const handleSpecieChange = (value: number) => {
    setPetRegistration((prevData) => ({ ...prevData, specie: value }));
  };

  const handleSubmit = async () => {
    if (
      Object.values(errors).every((error) => !error) &&
      Object.values(formData).every((value) => value !== '')
    ) {
      console.log(formData);
      await createAppointment(formData).then(
        (status) => {
          if (status) toast.success('Formulário enviado com sucesso!');
          else toast.error('Erro ao enviar formulário, tente novamente');
        }
      ).catch(
        (error) => {
          console.error(error);
          toast.error('Erro ao enviar formulário, tente novamente');
        }
      );
      setPetRegistration({} as PetRegistration);
      setErrors({});
    } else {
      toast.error('Por favor, corrija os erros antes de enviar.');
    }
  };

  return (
    <MainContainer>
      <div className="register-container">
        <div className="image-container" ref={imageContainerRef}>
          <img
            src={getImageUrl()}
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
            />

            <LabeledInput
              label="Peso (kg)"
              type="text"
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
            />
          </div>

          <div className="form-row">
            <LabeledInput
              label="Nome do Responsável"
              type="text"
              value={formData.responsible_name}
              onChange={(e) => handleInputChange('responsible_name', e.target.value)}
            />

            <LabeledInput
              label="CPF do Responsável"
              type="text"
              value={formData.responsible_document}
              onChange={(e) => handleInputChange('responsible_document', e.target.value)}
              mask="999.999.999-99"
            />
          </div>

          <div className="form-row">
            <LabeledInput
              label="Telefone"
              type="text"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              mask="(99) 99999-9999"
            />

            <LabeledInput
              label="Documento"
              type="text"
              value={formData.document}
              onChange={(e) => handleInputChange('document', e.target.value)}
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
              value={address.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
            />

            <LabeledInput
              label="Bairro"
              type="text"
              value={address.neighborhood}
              onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
            />
          </div>

          <div className="form-row">
            <LabeledInput
              label="Número"
              type="text"
              value={address.number}
              onChange={(e) => handleAddressChange('number', e.target.value)}
            />

            <LabeledInput
              label="CEP"
              type="text"
              value={address.zip_code}
              onChange={(e) => handleAddressChange('zip_code', e.target.value)}
              mask="99999-999"
            />
          </div>

          <div className="form-row">
            <LabeledInput
              label="Estado"
              type="text"
              value={address.state}
              onChange={(e) => handleAddressChange('state', e.target.value)}
            />

            <LabeledInput
              label="Cidade"
              type="text"
              value={address.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
            />
          </div>

          <div className="form-row">
            <LabeledInput
              label="Complemento"
              type="text"
              value={address.complement}
              onChange={(e) => handleAddressChange('complement', e.target.value)}
            />
          </div>

          <div className="submit-button-container">
            <button className="submit-button" onClick={handleSubmit}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}
