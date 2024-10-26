/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import LabeledInput from '@components/labeled-input/labeled-input';

interface CampaignFormData {
  logo: File | null;
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
  const [formData, setFormData] = useState<CampaignFormData>({
    logo: null,
    name: '',
    description: '',
    places_id: '',
    service_id: '',
    dates: [{ date: '', from: '', to: '' }]
  });

  const handleChange = (field: string, value: any) => {
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
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '85vh',
    },
    form: {
      display: 'flex',
      flexDirection: 'column' as const,
      padding: '3rem',
      border: '1px solid #ccc',
      borderRadius: '8px',
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
      '@media(min-width: 600px)': {
        flexDirection: 'row' as const,
      },
      marginBottom: '15px',
    },
    inputField: {
      flex: 1,
    },
    dateSection: {
      borderTop: '1px solid #ddd',
      paddingTop: '15px',
      marginTop: '10px',
    },
    addDateButton: {
      backgroundColor: '#FE684D',
      color: '#fff',
      padding: '1rem 3.5rem',
      borderRadius: '0.8rem',
      fontSize: '2.4rem',
      letterSpacing: '0.1rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.3s ease',
      transform: isAddDateButtonHovered ? 'scale(1.05)' : 'scale(1)',
    },
    submitButton: {
      backgroundColor: '#01BBB2',
      color: '#fff',
      borderRadius: '0.8rem',
      padding: '1rem 2rem',
      fontSize: '2.4rem',
      letterSpacing: '0.1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.3s ease',
      margin: '2rem 0',
      transform: isSubmitButtonHovered ? 'scale(1.05)' : 'scale(1)',
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.title}>Cadastrar Nova Campanha</h2>

        <div style={styles.inputRow}>
          <div style={styles.inputField}>
            <LabeledInput
              label="Logo da Campanha"
              type="file"
              placeholder='Escolha um arquivo'
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
            <label
              htmlFor='input-description'
              style={
                {
                  fontSize: '1.8rem',
                  fontWeight: 'lighter',
                  letterSpacing: '0.1rem',
                }
              }
            >
              Descrição
            </label>
            <textarea
              id='input-description'
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
                letterSpacing: '0.11rem',
                resize: 'vertical'
              }}
            />
          </div>
        </div>

        {formData.dates.map((date, index) => (
          <div key={index} style={styles.dateSection}>
            <h3 style={styles.title}>Data {index + 1}</h3>
            <div style={styles.inputRow}>
              <div style={styles.inputField}>
                <LabeledInput
                  label="Data"
                  type="date"
                  value={date.date}
                  onChange={(e) => handleDateChange(index, 'date', e.target.value)}
                />
              </div>
              <div style={styles.inputField}>
                <LabeledInput
                  label="De"
                  type="time"
                  value={date.from}
                  onChange={(e) => handleDateChange(index, 'from', e.target.value)}
                />
              </div>
              <div style={styles.inputField}>
                <LabeledInput
                  label="Até"
                  type="time"
                  value={date.to}
                  onChange={(e) => handleDateChange(index, 'to', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          style={styles.addDateButton}
          onMouseEnter={() => setIsAddDateButtonHovered(true)}
          onMouseLeave={() => setIsAddDateButtonHovered(false)}
          onClick={handleAddDate}
        >
          Adicionar Outra Data
        </button>
        <button
          type="button"
          style={styles.submitButton}
          onMouseEnter={() => setIsSubmitButtonHovered(true)}
          onMouseLeave={() => setIsSubmitButtonHovered(false)}
          onClick={handleSubmit}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
