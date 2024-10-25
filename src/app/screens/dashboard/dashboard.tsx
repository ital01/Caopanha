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
    updatedDates[index][field] = value;
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
    const token = 'your-token-here';

    const formDataToSubmit = new FormData();
    if (formData.logo) formDataToSubmit.append('logo', formData.logo);
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('places_id', `[${formData.places_id}]`);
    formDataToSubmit.append('service_id', formData.service_id);
    formDataToSubmit.append('dates', JSON.stringify(formData.dates));

    const response = await fetch('http://stingray-app-qgrep.ondigitalocean.app/campaigns', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataToSubmit,
    });

    if (response.ok) {
      alert('Campaign created successfully!');
    } else {
      alert('Failed to create campaign');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register New Campaign</h2>

      <LabeledInput
        label="Campaign Logo"
        type="file"
        onChange={(e) => handleChange('logo', e.target.files ? e.target.files[0] : null)}
      />

      <LabeledInput
        label="Campaign Name"
        type="text"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />

      <LabeledInput
        label="Description"
        type="text"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />

      <LabeledInput
        label="Place ID(s)"
        type="text"
        placeholder="Enter place ID(s) separated by commas"
        value={formData.places_id}
        onChange={(e) => handleChange('places_id', e.target.value)}
      />

      <LabeledInput
        label="Service ID"
        type="text"
        value={formData.service_id}
        onChange={(e) => handleChange('service_id', e.target.value)}
      />

      {formData.dates.map((date, index) => (
        <div key={index}>
          <h3>Date {index + 1}</h3>
          <LabeledInput
            label="Date"
            type="date"
            value={date.date}
            onChange={(e) => handleDateChange(index, 'date', e.target.value)}
          />
          <LabeledInput
            label="From"
            type="time"
            value={date.from}
            onChange={(e) => handleDateChange(index, 'from', e.target.value)}
          />
          <LabeledInput
            label="To"
            type="time"
            value={date.to}
            onChange={(e) => handleDateChange(index, 'to', e.target.value)}
          />
        </div>
      ))}

      <button type="button" onClick={handleAddDate}>Add Another Date</button>
      <button type="submit">Submit</button>
    </form>
  );
}
