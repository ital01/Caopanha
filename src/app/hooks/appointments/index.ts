import api from '../../services/api';
import { PetRegistration } from '../../interfaces/hooks/appointments';

export const createAppointment = async(data: PetRegistration): Promise<boolean> => {
  try {
    const { status } = await api.post('/appointments', data);
    return status === 200 || status === 201 || status === 202 || status === 203 || status === 204;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
