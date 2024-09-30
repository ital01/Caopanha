import { AxiosResponse } from "axios";
import { iFindMany } from "../../interfaces/hooks/find-many";
import api from "../../services/api";
import { iFindManyCampaigns } from "../../interfaces/hooks/campaigns";

export const findMany = async({skip, take}:iFindMany) =>{
  try{
    const{data} = await api.get('/campaigns', {
      params: {
        skip: skip,
        take: take,
      }
    }) as AxiosResponse<iFindManyCampaigns>;

    return data;

  }catch(error){
    console.log(error);
  }
};