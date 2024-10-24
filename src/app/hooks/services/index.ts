import { AxiosResponse } from 'axios';
import { iFindMany } from '../../interfaces/hooks/find-many';
import api from '../../services/api';
import { iFindManyServices } from '../../interfaces/hooks/services';

export const findMany = async({ skip, take }:iFindMany) => {
  try{
    const{ data } = await api.get('/services', {
      params: {
        skip: skip,
        take: take,
      }
    }) as AxiosResponse<iFindManyServices>;

    return data;

  }catch(error){
    console.log(error);
  }
};
