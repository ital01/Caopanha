import { campaignApi, CampaignProps } from './api';

class CampaignService {
  public async getCampaigns(): Promise<CampaignProps[]> {
    try {
      return await campaignApi.getCampaigns();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const CampaignServiceInstance = new CampaignService();
