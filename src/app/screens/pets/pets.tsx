import Table from "@components/table/table";
import { useEffect, useState } from "react";
import { PetsHook } from "../../hooks";
import { iFindManyPets } from "../../interfaces/hooks/pet";

export default function Pets() {
  const [data, setData] = useState({} as iFindManyPets)
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const Specie = {
    1: 'Cachorro',
    2:'Gato'
  }

  const Gender = {
    1: 'Macho',
    2:'Fêmea'
  }

  useEffect(() => {
    getPets()
  },[])

  const getPets = async () => {
    const result = await PetsHook.findMany({ 
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
      Header: "Espécie",
      accessor: "specie",
            //@ts-ignore
      Cell: ({ row }: { row: any }) => <p>{Specie[row?.specie]}</p>,
    },
    {
      Header: "Gênero",
      accessor: "gender",
      //@ts-ignore
      Cell: ({ row }: { row: any }) => <p>{Gender[row?.gender]}</p>,
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
      <h1>Pets Cadastrados</h1>

      <Table columns={COLUMNS} data={data.records} rowsPerPage={rowsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} totalRows={data.total ?? 1} id={""} />
    </div>
  );
};
