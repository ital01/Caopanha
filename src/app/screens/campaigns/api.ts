import api from '../../service/api';

export interface CampaignProps {
  title: string;
  subtitle: string;
  description: string;
  requiredDocuments: string[];
  imageUrl: string;
}

export const campaignApi = {
  getCampaigns: async (): Promise<CampaignProps[]> => {
    const { data } = await api.get('/campaign');
    return data;
  }
};

