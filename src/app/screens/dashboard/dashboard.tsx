import { useCallback, useEffect, useState } from "react";
import { CampaignsHook } from "../../hooks";
import { iCampaignMetrics } from "../../interfaces/hooks/campaigns";
import {
 
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import './dashboard.css';



export default function Dashboard() {
  const [data, setData] = useState({} as iCampaignMetrics)

  const getCampaign = useCallback(async () => {
    const result = await CampaignsHook.generalMetrics()

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
                  
        <h2>Total de agendamentos</h2>


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
    );
};

  return (
    <div className="container">

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


    </div>
  );
};
