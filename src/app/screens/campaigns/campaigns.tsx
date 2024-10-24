import MainContainer from '@components/main-container/main-container';
import CampaignComponent from '@components/campaign/campaign';
import { useEffect, useState } from 'react';
import { findMany } from '../../hooks/campaigns';
import { iCampaign, iFindManyCampaigns } from '../../interfaces/hooks/campaigns';
import { iFindMany } from '../../interfaces/hooks/find-many';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<iCampaign[]>([]);

  useEffect(() => {
    (async () => {
      const config: iFindMany = {
        skip: 1,
        take: 1
      };
      const data: iFindManyCampaigns = (await findMany(config))!;
      const campaigns = data.records;
      setCampaigns(campaigns);
    })();
  }, []);

  return (
    <MainContainer style={{ gap: '0' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Confira as Campanhas Ativas</h1>
        <h2>E não perca a oportunidade de cuidar de quem mais precisa de você</h2>
      </div>
      {
        campaigns.map((campaign, index) => (
          <CampaignComponent key={index} {...campaign} />
        ))
      }
    </MainContainer>
  );
}
