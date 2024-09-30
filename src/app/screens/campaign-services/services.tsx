import Table from "@components/table/table";
import { useCallback, useEffect, useState } from "react";
import { PetsHook } from "../../hooks";
import { iFindManyPets, iPet } from "../../interfaces/hooks/pet";
import Divider from "@components/divider/divider";

interface Column<T> {
  Header: string;
  accessor: keyof T;
  Cell?: (props: { row: T }) => JSX.Element;
}

export default function Pets() {
  const [data, setData] = useState<iFindManyPets>({ total: 0, records: [] });
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const Specie: Record<number, string> = {
    1: 'Cachorro',
    2: 'Gato',
  };

  const Gender: Record<number, string> = {
    1: 'Macho',
    2: 'Fêmea',
  };

  const getPets = useCallback(async () => {
    const result = await PetsHook.findMany({
      skip: rowsPerPage * currentPage,
      take: rowsPerPage,
    });
  
    if (result) setData(result);
  }, [rowsPerPage, currentPage]);
  
  useEffect(() => {
    getPets();
    setRowsPerPage(5);
  }, [getPets]);
  
  const COLUMNS: Column<iPet>[] = [
    {
      Header: "Nome",
      accessor: "name",
      Cell: ({ row }: { row: iPet }) => <p>{row.name}</p>,
    },
    {
      Header: "Espécie",
      accessor: "specie",
      Cell: ({ row }: { row: iPet }) => <p>{Specie[row.specie]}</p>,
    },
    {
      Header: "Gênero",
      accessor: "gender",
      Cell: ({ row }: { row: iPet }) => <p>{Gender[row.gender]}</p>,
    },
  ];

  return (
    <div style={{ width: '100%', padding: 20 }}>
      <h1>Pets Cadastrados</h1>
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
    </div>
  );
}
