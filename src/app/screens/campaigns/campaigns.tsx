import { ViewUsers } from "@components/users/users";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import Table from "@components/table/table";
import { iFindManyCampaigns, iCampaign } from "../../interfaces/hooks/campaigns";
import { CampaignsHook } from "../../hooks";
import dayjs from "dayjs";
import Divider from "@components/divider/divider";

export default function Campaigns() {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState<iFindManyCampaigns>({
    total: 0,
    records: [],
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage] = useState(5); // Keep it constant as a state variable is not changed

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
      Header: "Nome",
      accessor: "name" as keyof iCampaign,
      Cell: ({ row }: { row: iCampaign }) => <p>{row?.name}</p>,
    },
    {
      Header: "Descrição",
      accessor: "description" as keyof iCampaign,
      Cell: ({ row }: { row: iCampaign }) => <p>{row?.description}</p>,
    },
    {
      Header: "Status",
      accessor: "status" as keyof iCampaign,
      Cell: ({ row }: { row: iCampaign }) => <p>{STATUS[row.status]}</p>,
    },
    {
      Header: "Criado em",
      accessor: "created_at" as keyof iCampaign,
      Cell: ({ row }: { row: iCampaign }) => <p>{dayjs(row.created_at).format('DD/MM/YYYY')}</p>,
    },
  ];

  return (
    <div style={{ width: '100%', padding: 20 }}>
      <h1>Campanhas</h1>
      <Divider size="md" />
      <ViewUsers />

      {user ? (
        <Table 
          columns={COLUMNS} 
          data={data.records} 
          rowsPerPage={rowsPerPage} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          totalRows={data.total} 
          id="" 
        />
      ) : (
        <p>Visão do usuário externo</p>
      )}
    </div>
  );
}
