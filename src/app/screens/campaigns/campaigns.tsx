import MainContainer from '@components/main-container/main-container';
import CampaignComponent from '@components/campaign/campaign';
import { iFindManyCampaigns } from '../../interfaces/hooks/campaigns';

export default function Campaigns() {

  const campaigns: iFindManyCampaigns = {
    total: 4,
    records: [
      {
        id: 1,
        logo: 'https://placehold.co/800x900',
        organization_id: 123,
        campaign_place: [
          {
            id: 1,
            name: 'Jardim Exemplo II',
            phone: '123456789',
            address: {
              id: 1,
              street: 'Rua Lorem Ipsum',
              neighborhood: 'Jardim Exemplo II',
              number: '999',
              zip_code: '13466-789',
              state: 'SP',
              city: 'Americana',
              complement: '',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
            },
          },
        ],
        name: 'Campanha de Vacinação de cães e gatos',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        status: 1,
        campaign_dates: [
          {
            id: 1,
            date: '2024-10-01',
            from: '08:00',
            to: '17:00',
            week_day: 'Monday',
            campaign_id: 1,
          },
        ],
        created_at: '2024-01-01T00:00:00Z',
        service: {
          id: 1,
          execution_time: 30,
          name: 'Vacinação Antirrábica',
        },
      },
      {
        id: 2,
        logo: 'https://placehold.co/700x900',
        organization_id: 123,
        campaign_place: [
          {
            id: 2,
            name: 'Jardim Exemplo II',
            phone: '123456789',
            address: {
              id: 2,
              street: 'Rua Lorem Ipsum',
              neighborhood: 'Jardim Exemplo II',
              number: '999',
              zip_code: '13466-789',
              state: 'SP',
              city: 'Americana',
              complement: '',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
            },
          },
        ],
        name: 'Campanha de Vacinação de cães e gatos',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        status: 1,
        campaign_dates: [
          {
            id: 2,
            date: '2024-10-02',
            from: '08:00',
            to: '17:00',
            week_day: 'Tuesday',
            campaign_id: 2,
          },
        ],
        created_at: '2024-01-01T00:00:00Z',
        service: {
          id: 2,
          execution_time: 30,
          name: 'Vacinação Antirrábica',
        },
      },
    ],
  };

  return (
    <MainContainer style={{ gap: '0' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Confira as Campanhas Ativas</h1>
        <h2>E não perca a oportunidade de cuidar de quem mais precisa de você</h2>
      </div>
      {
        campaigns.records.map((campaign, index) => (
          <CampaignComponent key={index} {...campaign} />
        ))
      }
    </MainContainer>
  );
}
