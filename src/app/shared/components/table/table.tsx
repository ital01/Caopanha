import React from "react";

interface Column<T> {
  Header: string;
  accessor: keyof T;
  Cell?: (props: { row: T }) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalRows: number;
  id: string;
}

const Table = <T,>({
  columns,
  data,
  rowsPerPage,
  currentPage,
  setCurrentPage,
  totalRows,
  id,
}: TableProps<T>) => {
  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.floor(totalRows / rowsPerPage))
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div>
      <table id={id} style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.accessor)} style={{ padding: "8px", backgroundColor: "#4A5568", color: "white", textAlign: "left" }}>
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? "#fff" : "#E2E8F0" }}>
              {columns.map((col) => (
                <td key={String(col.accessor)} style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  {col.Cell ? col.Cell({ row }) : row[col.accessor] as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", backgroundColor: "#EDF2F7", padding: "10px" }}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          style={{ backgroundColor: currentPage === 0 ? "#A0AEC0" : "#CBD5E0", padding: "10px", cursor: currentPage === 0 ? "not-allowed" : "pointer" }}
        >
          Anterior
        </button>
        <span>
          Página {currentPage + 1} de {Math.ceil(totalRows / rowsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= Math.floor(totalRows / rowsPerPage)}
          style={{ backgroundColor: currentPage >= Math.floor(totalRows / rowsPerPage) ? "#A0AEC0" : "#CBD5E0", padding: "10px", cursor: currentPage >= Math.floor(totalRows / rowsPerPage) ? "not-allowed" : "pointer" }}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default Table;
