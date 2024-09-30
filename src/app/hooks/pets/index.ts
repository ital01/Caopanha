import { AxiosResponse } from "axios";
import { iFindMany } from "../../interfaces/hooks/find-many";
import api from "../../services/api";
import { iFindManyPets } from "../../interfaces/hooks/pet";

export const findMany = async({skip, take}:iFindMany) =>{
  try {
    const{data} = await api.get('/pets', {
      params: {
        skip: skip,
        take: take,
      }
    }) as AxiosResponse<iFindManyPets>;

    return data;
  } catch(error) {
    console.log(error);
  }
};