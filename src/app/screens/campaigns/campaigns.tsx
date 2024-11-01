import MainContainer from '@components/main-container/main-container';
import CampaignComponent from '@components/campaign/campaign';
import { useEffect, useState } from 'react';
import { CampaignProps } from './api';
import { CampaignServiceInstance } from './campaigns.service';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<CampaignProps[]>([] as CampaignProps[]);

  useEffect(() => {
    (async () => {
      console.log('loaded');
      const data = await CampaignServiceInstance.getCampaigns();
      setCampaigns(data);
    })();
  }, []);

  return (
    <MainContainer style={{ gap: '0' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Confira as Campanhas Ativas</h1>
        <h2>E não perca a oportunidade de cuidar de quem mais precisa de você</h2>
        { campaigns.map((campaign, index) => (
          <CampaignComponent key={index} {...campaign} />
        ))}
      </div>
    </MainContainer>
  );
}
