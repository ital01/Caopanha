import Table from "@components/table/table";
import { useEffect, useState } from "react";
import {  ServicesHook } from "../../hooks";
import { iFindManyServices } from "../../interfaces/hooks/services";
import Divider from "@components/divider/divider";

export default function Services() {
  const [data, setData] = useState({} as iFindManyServices)
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const Status = {
    true: 'Ativo',
    false:'Inativo'
  }


  useEffect(() => {
    getServices()
  },[])

  const getServices = async () => {
    const result = await ServicesHook.findMany({ 
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
      Header: "Status",
      accessor: "actived",
            //@ts-ignore
      Cell: ({ row }: { row: any }) => <p>{Status[row?.actived]}</p>,
    },
    {
      Header: "Duração",
      accessor: "execution_time",
      Cell: ({ row }: { row: any }) => <p>{row.execution_time} min</p>,

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
    <div style={{
      width: '100%',
      padding: 20,
    }}>
      <h1>Serviços Cadastrados</h1>
      <Divider size="md" />

      <Table columns={COLUMNS} data={data.records} rowsPerPage={rowsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} totalRows={data.total ?? 1} id={""} />
    </div>
  );
};
