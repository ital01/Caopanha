import { AxiosResponse } from 'axios';
import api from '../../service/api';

export const passwordRecovery = async (
  data: { email: string }
) => {
  try {
    await api.post('/users/password-recovery', data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const passwordRecoveryValidationCode = async (
  data: {
    code: string,
    email: string
  }
) => {
  try {
    const { data: response } = await api.post(
      '/users/password-recovery/validate-code', data
    ) as AxiosResponse<{ access_token: string }>;
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const passwordRecoveryChangePassword = async (
  data: { password: string }
) => {
  try {
    await api.put('/users/password-recovery/change-password', data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
