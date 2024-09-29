import { ViewUsers } from "@components/users/users";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import Table from "@components/table/table";
import { iFindManyCampaigns } from "../../interfaces/hooks/campaigns";
import { CampaignsHook } from "../../hooks";
import dayjs from "dayjs";
import Divider from "@components/divider/divider";

export default function Campaigns() {
  const {user} = useContext(AuthContext)

  const [data, setData] = useState({} as iFindManyCampaigns)
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  console.log(user)
  const STATUS = {
   1: 'ativa',
   2: 'inativa'
  };

  useEffect(() => {
    getCampaign()
  },[])

  const getCampaign = async () => {
    const result = await CampaignsHook.findMany({ 
      skip: rowsPerPage * currentPage,
      take: rowsPerPage,
    })

    if(result) setData(result)
  }


  const COLUMNS = [
    {
      Header: "Nome",
      accessor: "name",
      Cell: ({ row }: { row: any }) => <p>{row?.name}</p>,
    },
    {
      Header: "Descrição",
      accessor: "description",
            //@ts-ignore
    },
    {
      Header: "Status",
      accessor: "status",
            //@ts-ignore
      Cell: ({ row }: { row: any }) => <p>{STATUS[row.status]}</p>,

    },
    {
      Header: "Criado em",
      accessor: "created_at",
      //@ts-ignore
      Cell: ({ row }: { row: any }) => <p>{dayjs(row.created_at).format('DD/MM/YYYY')}</p>,
    },
    {
      Header: "Ações",
      Cell: ({ row }: { row: any }) => (
        <button onClick={() => console.log(row?.name)}>
          Ver
        </button>
      ),
    },
  ];
  return (
    <div style={{width: '100%', padding: 20}}>
      <h1>Campanhas</h1>
      <Divider size="md" />

      <ViewUsers />


      {
        user ?
        <>
      <Table columns={COLUMNS} data={data.records} rowsPerPage={rowsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} totalRows={data.total ?? 1} id={""} />
  


        </>
        :
        <p>Visao do usuario externo</p>
      }
    </div>
  );
};
