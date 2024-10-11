import MainContainer from '@components/main-container/main-container';
import CampaignComponent, { CampaignProps } from '@components/campaign/campaign';

export default function Campaigns() {

  const campaigns: CampaignProps[] = [
    {
      title: 'Campanha de Vacinação de cães e gatos',
      subtitle: 'Rua Lorem Ipsum - 999, Jardim Exemplo II, Americana-SP',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      requiredDocuments: ['RG', 'CPF', 'Comprovante de Residência'],
      imageUrl: 'https://placehold.co/900x900',
    },
    {
      title: 'Campanha de Vacinação de cães e gatos',
      subtitle: 'Rua Lorem Ipsum - 999, Jardim Exemplo II, Americana-SP',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      requiredDocuments: ['RG', 'CPF', 'Comprovante de Residência'],
      imageUrl: 'https://placehold.co/900x900',
    },
    {
      title: 'Campanha de Vacinação de cães e gatos',
      subtitle: 'Rua Lorem Ipsum - 999, Jardim Exemplo II, Americana-SP',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      requiredDocuments: ['RG', 'CPF', 'Comprovante de Residência'],
      imageUrl: 'https://placehold.co/900x900',
    },
    {
      title: 'Campanha de Vacinação de cães e gatos',
      subtitle: 'Rua Lorem Ipsum - 999, Jardim Exemplo II, Americana-SP',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      requiredDocuments: ['RG', 'CPF', 'Comprovante de Residência'],
      imageUrl: 'https://placehold.co/900x900',
    },
  ];

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
