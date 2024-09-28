import Table from "@components/table/table";
import { useEffect, useState } from "react";

export default function Pets() {
  const [pets, setPets] = useState([])

  const getPets = () => {

  }

  useEffect(() => {
    setPets([])
  },[])
  return (
    <div>
      <h1>Pets</h1>
      <Table columns={[]} rows={[]} rowsPerPage={0} currentPage={0} setCurrentPage={undefined} totalRows={0} id={""} />
    </div>
  );
};
