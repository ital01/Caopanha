import { useCallback, useEffect, useState } from 'react';
import { CampaignsHook } from '../../hooks';
import { iCampaignMetrics } from '../../interfaces/hooks/campaigns';
import {

  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import './dashboard.css';
import CreateCampaign from '@components/create-campaign/create-campaign';
import MainContainer from '@components/main-container/main-container';

export default function Dashboard() {
  const [data, setData] = useState({} as iCampaignMetrics);
  const [showModal, setShowModal] = useState(false);
  const getCampaign = useCallback(async () => {
    const result = await CampaignsHook.generalMetrics();

    if (result) setData(result);
  }, []);

  useEffect(() => {
    getCampaign();
  }, []);

  const TotalCampaignCard =() => {
    return (
      <div className="campaign-card">
        <h2>Total de Campanhas</h2>
        <p className="total">{data.totalCampaigns}</p>
        <h2>Ativa</h2>
        <p className="total">{data.totalCampaignsActived}</p>
        <h2>Inativa</h2>
        <p className="total">{data.totalCampaignsInactived}</p>
      </div>
    );
  };

  const TotalServicesCard =() => {
    return (
      <div className="campaign-card">
        <h2>Serviços Ativo</h2>
        <p className="total">{data.totalServicesActived}</p>
        <h2>Serviços Inativo</h2>
        <p className="total">{data.totalServicesInactived}</p>
      </div>
    );
  };

  const DashPie = ({ data }: any) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const EMPTY_COLOR = '#D3D3D3'; // Cor cinza claro para o caso de todos os valores serem zero

    // Dados para o gráfico
    const dataPie = [
      { name: 'Concluídos', value: data.totalAppointmentsAtendend || 0 },
      { name: 'Cancelados', value: data.totalAppointmentsCanceled || 0 },
      { name: 'Ausências', value: data.totalAppointmentsAbsence || 0 },
    ];

    const totalValue = dataPie.reduce((acc, entry) => acc + entry.value, 0);

    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                {totalValue > 0 ? (
                  <>
                    <Pie
                      data={dataPie}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dataPie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </>
                ) : (
                  <Pie
                    data={[{ name: 'Sem Dados', value: 1 }]} // Um único segmento com valor 1
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill={EMPTY_COLOR} />
                  </Pie>
                )}
              </PieChart>

            </ResponsiveContainer>
            {totalValue === 0 && (
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <h3>Nenhum dado disponível para exibir</h3>
              </div>
            )}
          </div>
        </div>
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowModal(false)} style={styles.closeButton}>X</button>
              <CreateCampaign />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <MainContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '3rem',
          marginBottom: '-10rem',
          zIndex: 10
        }}
      >
        <h2>Total de agendamentos</h2>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: '10px 20px',
            fontSize: '1.6rem',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            border: '2px solid var(--primary-color)',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          Novo Agendamento
        </button>
      </div>
      <div className="content">
        <DashPie data={data}/>
        {/* <TotalServicesCard />
      <TotalCampaignCard /> */}

        <div className="total-card">
          <div className="grid">
            <div className="card">
              <h2>Total de Campanhas</h2>
              <p className="total">{data.totalCampaigns}</p>
            </div>
            <div className="card">
              <h2>Campanhas Ativas</h2>
              <p className="total">{data.totalCampaignsActived}</p>
            </div>
            <div className="card">
              <h2>Campanhas Inativas</h2>
              <p className="total">{data.totalCampaignsInactived}</p>
            </div>
            <div className="card">
              <h2>Serviços Ativos</h2>
              <p className="total">{data.totalServicesActived}</p>
            </div>
            <div className="card">
              <h2>Serviços Inativos</h2>
              <p className="total">{data.totalServicesInactived}</p>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
  },
  newScheduleButton: {
    padding: '10px 20px',
    fontSize: '1.6rem',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    border: '2px solid var(--primary-color)',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s',
  },
  modalContent: {
    backgroundColor: 'white' as const,
    borderRadius: '8px',
    width: '90%',
    position: 'relative' as const,
    animation: 'scaleIn 0.3s',
  },
  closeButton: {
    position: 'absolute' as const,
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
  },
};
