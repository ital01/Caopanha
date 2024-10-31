import Table from '@components/table/table';
import { useCallback, useEffect, useState } from 'react';
import {  ServicesHook } from '../../hooks';
import Divider from '@components/divider/divider';
import { iFindManyServices, iService } from '../../interfaces/hooks/services';
import './service.css';


interface Column<T> {
  Header: string;
  accessor: keyof T;
  Cell?: (props: { row: T }) => JSX.Element;
}

export default function Services() {
  const [data, setData] = useState<iFindManyServices>({ total: 0, records: [] });
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);



  const getServices = useCallback(async () => {
    const result = await ServicesHook.findMany({
      skip: rowsPerPage * currentPage,
      take: rowsPerPage,
    });

    if (result) setData(result);
  }, [rowsPerPage, currentPage]);

  useEffect(() => {
    getServices();
    setRowsPerPage(5);
  }, [getServices]);

  const COLUMNS: Column<iService>[] = [
    {
      Header: 'Nome',
      accessor: 'name',
      Cell: ({ row }: { row: iService }) => <p>{row.name}</p>,
    },
    {
      Header: 'Descrição',
      accessor: 'actived',
      Cell: ({ row }: { row: iService }) => <p>

        { //@ts-ignore
        row?.actived == true?'Ativo': 'Inativo'}</p>,
    },
    {
      Header: 'Duração',
      accessor: 'execution_time',
      Cell: ({ row }: { row: iService }) => <p>{row?.execution_time} min</p>,
    },
  ];

  return (
    <div className='container'>
      <h1>Serviços Cadastrados</h1>

      <button className='submitButton' >Cadastrar</button>
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
