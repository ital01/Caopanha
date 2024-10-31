import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import Table from '@components/table/table';
import { iFindManyCampaigns, iCampaign } from '../../interfaces/hooks/campaigns';
import { CampaignsHook } from '../../hooks';
import dayjs from 'dayjs';
import Divider from '@components/divider/divider';
import MainContainer from '@components/main-container/main-container';
import CampaignComponent, { CampaignProps } from '@components/campaign/campaign';
import { useNavigate } from 'react-router-dom';

export default function Campaigns() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState<iFindManyCampaigns>({
    total: 0,
    records: [],
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage] = useState(5);

  const STATUS: { [key: number]: string } = {
    1: 'ativa',
    2: 'inativa',
  };

  const getCampaign = useCallback(async () => {
    const result = await CampaignsHook.findMany({
      skip: rowsPerPage * currentPage,
      take: rowsPerPage,
    });

    if (result) setData(result);
  }, [rowsPerPage, currentPage]);

  useEffect(() => {
    getCampaign();
  }, [getCampaign]);

  const COLUMNS = [
    {
      Header: 'Nome',
      accessor: 'name' as keyof iCampaign,
      Cell: ({ row }: { row: iCampaign }) => <p>{row?.name}</p>,
    },
    {
      Header: 'Descrição',
      accessor: 'description' as keyof iCampaign,
      Cell: ({ row }: { row: iCampaign }) => <p>{row?.description}</p>,
    },
    {
      Header: 'Status',
      accessor: 'status' as keyof iCampaign,
      Cell: ({ row }: { row: iCampaign }) => <p>{STATUS[row.status]}</p>,
    },
    {
      Header: 'Criado em',
      accessor: 'created_at' as keyof iCampaign,
      Cell: ({ row }: { row: iCampaign }) => <p>{dayjs(row.created_at).format('DD/MM/YYYY')}</p>,
    },
  ];

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
      
      { user?
      <>
      <Divider size={'md'}/>
    <h1>Minhas Campanhas</h1>
    <button className='submitButton' onClick={() => navigate('/cadastrar')} >Cadastrar</button>

      <Divider size="md" />
      <Table
        columns={COLUMNS}
        data={data.records}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalRows={data.total}
        id=""
      />
      
      </>:
      <div style={{ textAlign: 'center' }}>
        <h1>Confira as Campanhas Ativas</h1>
        <h2>E não perca a oportunidade de cuidar de quem mais precisa de você</h2>
       { campaigns.map((campaign, index) => (
          <CampaignComponent key={index} {...campaign} />
        ))}
      </div>
      }
    </MainContainer>
  );
}
