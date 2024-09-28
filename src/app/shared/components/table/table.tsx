import React from "react";

const Table = ({
  columns,
  rows,
  rowsPerPage,
  currentPage,
  setCurrentPage,
  totalRows,
  id,
}: {
    columns: any[];
    rows: any[];
    rowsPerPage: number;
    currentPage: number;
    setCurrentPage: any;
    totalRows: number;
    id: string
  }) => {
  const handleNextPage = () => {
    setCurrentPage((prevPage: number) =>
      Math.min(prevPage + 1, Math.floor(totalRows / rowsPerPage))
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage: number) => Math.max(prevPage - 1, 0));
  };

  return (
    <div>
      <table id={id} style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor || col.Header} style={{ padding: "8px", backgroundColor: "#4A5568", color: "white", textAlign: "left" }}>
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? "#fff" : "#E2E8F0" }}>
              {columns.map((col) => (
                <td key={col.accessor || col.Header} style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  {col.Cell ? col.Cell({ row }) : row[col.accessor]}
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
