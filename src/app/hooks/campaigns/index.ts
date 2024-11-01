import { AxiosResponse } from 'axios';
import { iFindMany } from '../../interfaces/hooks/find-many';
import api from '../../service/api';
import { iFindManyCampaigns } from '../../interfaces/hooks/campaigns';

export const findMany = async({ skip, take }:iFindMany) => {
  try{
    const{ data } = await api.get('/campaigns', {
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

export const generalMetrics = async() => {
  try{
    const { data } = await api.get('campaigns/get/statistics');

    return data;

  }catch(error){
    console.error(error);
    return false;
  }
};
