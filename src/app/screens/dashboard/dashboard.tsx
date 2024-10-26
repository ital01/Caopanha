/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react';
import LabeledInput from '@components/labeled-input/labeled-input';

interface CampaignFormData {
  logo: File;
  name: string;
  description: string;
  places_id: string;
  service_id: string;
  dates: {
    date: string;
    from: string;
    to: string;
  }[];
}

export default function CampaignForm() {
  const [isAddDateButtonHovered, setIsAddDateButtonHovered] = useState(false);
  const [isSubmitButtonHovered, setIsSubmitButtonHovered] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [formData, setFormData] = useState<CampaignFormData>({
    logo: {} as File,
    name: '',
    description: '',
    places_id: '',
    service_id: '',
    dates: [{ date: '', from: '', to: '' }]
  });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    if (imagePreviewUrl === '') {
      return `https://placehold.co/${dimensions.width}x${dimensions.height}`;
    } else {
      return imagePreviewUrl;
    }
  }, [imagePreviewUrl, dimensions]);

  useEffect(() => {
    getImageUrl();
  }, [dimensions, getImageUrl]);

  const handleChange = (field: string, value: any) => {
    if (field === 'logo' && value) {
      setImagePreviewUrl(URL.createObjectURL(value));
    }
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (index: number, field: string, value: string) => {
    const updatedDates = [...formData.dates];
    updatedDates[index][field as keyof typeof updatedDates[number]] = value;
    setFormData(prev => ({
      ...prev,
      dates: updatedDates
    }));
  };

  const handleAddDate = () => {
    setFormData(prev => ({
      ...prev,
      dates: [...prev.dates, { date: '', from: '', to: '' }]
    }));
  };

  const handleRemoveDate = (index: number) => {
    const updatedDates = formData.dates.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      dates: updatedDates
    }));
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      logo: {} as File
    }));
    setImagePreviewUrl('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    if (formData.logo) formDataToSubmit.append('logo', formData.logo);
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('places_id', `[${formData.places_id}]`);
    formDataToSubmit.append('service_id', formData.service_id);
    formDataToSubmit.append('dates', JSON.stringify(formData.dates));
    console.log('formDataToSubmit', formDataToSubmit);
  };

  const styles = {
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row' as const,
      justifyContent: 'center',
      alignItems: 'stretch',
      padding: '5rem',
      margin: 'auto',
    },
    imageContainer: {
      width: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: '8px',
      borderTopLeftRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      position: 'relative' as const,
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
    },
    removeImageButton: {
      position: 'absolute' as const,
      top: '10px',
      right: '10px',
      backgroundColor: '#FF4B4B',
      color: '#fff',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease, transform 0.2s ease',
    },
    form: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column' as const,
      padding: '1rem 3rem',
      border: '1px solid #ccc',
      borderBottomRightRadius: '8px',
      borderTopRightRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    },
    title: {
      textAlign: 'center' as const,
      color: '#333',
      marginBottom: '20px',
    },
    inputRow: {
      display: 'flex',
      flexDirection: 'row' as const,
      gap: '15px',
    },
    inputField: {
      flex: 1,
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row' as const,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dateSection: {
      borderTop: '1px solid #ddd',
      paddingTop: '15px',
      marginTop: '10px',
    },
    removeDateButton: {
      height: '3.5rem',
      alignSelf: 'center',
      backgroundColor: '#FF4B4B',
      color: '#fff',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease, transform 0.2s ease',
    },
    addDateButton: {
      backgroundColor: '#FE684D',
      color: '#fff',
      padding: '0.5rem 1rem',
      borderRadius: '0.8rem',
      fontSize: '2rem',
      letterSpacing: '0.1rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease, transform 0.2s ease',
      transform: isAddDateButtonHovered ? 'scale(1.05)' : 'scale(1)',
    },
    submitButton: {
      backgroundColor: '#01BBB2',
      color: '#fff',
      borderRadius: '0.8rem',
      padding: '0.5rem 1rem',
      fontSize: '2rem',
      letterSpacing: '0.1rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease, transform 0.2s ease',
      margin: '2rem 0',
      transform: isSubmitButtonHovered ? 'scale(1.05)' : 'scale(1)',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer} ref={imageContainerRef}>
        <img style={styles.image} src={getImageUrl()} alt="Campaign Logo" />
        <button style={styles.removeImageButton} onClick={handleRemoveImage}>
          Excluir
        </button>
      </div>
      <div style={styles.form}>
        <h2 style={styles.title}>Cadastrar Nova Campanha</h2>
        <div style={styles.inputRow}>
          <div style={styles.inputField}>
            <LabeledInput
              label="Logo da Campanha"
              type="file"
              placeholder="Escolha um arquivo"
              onChange={(e) => handleChange('logo', e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <div style={styles.inputField}>
            <LabeledInput
              label="Nome da Campanha"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
        </div>

        <div style={styles.inputRow}>
          <div style={styles.inputField}>
            <LabeledInput
              label="ID do Serviço"
              type="text"
              value={formData.service_id}
              onChange={(e) => handleChange('service_id', e.target.value)}
            />
          </div>
          <div style={styles.inputField}>
            <LabeledInput
              label="ID(s) do Local"
              type="text"
              placeholder="Insira o(s) ID(s) do local, separados por vírgula"
              value={formData.places_id}
              onChange={(e) => handleChange('places_id', e.target.value)}
            />
          </div>
        </div>

        <div style={styles.inputRow}>
          <div style={styles.inputField}>
            <label htmlFor="input-description" style={{ fontSize: '1.8rem', fontWeight: 'lighter', letterSpacing: '0.1rem' }}>
              Descrição
            </label>
            <textarea
              id="input-description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              style={{
                fontSize: '1.6rem',
                fontWeight: 'normal',
                padding: '0.5rem 1rem',
                border: '0.2rem solid #ccc',
                borderRadius: '0.6rem',
                width: '100%',
              }}
            />
          </div>
        </div>

        {formData.dates.map((date, index) => (
          <div key={index} style={styles.dateSection}>
            <div style={styles.inputRow}>
              <LabeledInput
                label="Data"
                type="date"
                value={date.date}
                onChange={(e) => handleDateChange(index, 'date', e.target.value)}
              />
              <LabeledInput
                label="De"
                type="time"
                value={date.from}
                onChange={(e) => handleDateChange(index, 'from', e.target.value)}
              />
              <LabeledInput
                label="Até"
                type="time"
                value={date.to}
                onChange={(e) => handleDateChange(index, 'to', e.target.value)}
              />
              <button style={styles.removeDateButton} onClick={() => handleRemoveDate(index)}>
                Excluir
              </button>
            </div>
          </div>
        ))}

        <div style={styles.buttonContainer}>
          <button
            style={styles.addDateButton}
            onClick={handleAddDate}
            onMouseEnter={() => setIsAddDateButtonHovered(true)}
            onMouseLeave={() => setIsAddDateButtonHovered(false)}
          >
            Adicionar Data
          </button>
          <button
            style={styles.submitButton}
            onClick={handleSubmit}
            onMouseEnter={() => setIsSubmitButtonHovered(true)}
            onMouseLeave={() => setIsSubmitButtonHovered(false)}
          >
            Cadastrar Campanha
          </button>
        </div>
      </div>
    </div>
  );
}
