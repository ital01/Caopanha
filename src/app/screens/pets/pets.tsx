import { ViewUsers } from "@components/users/users";
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
      <ViewUsers />
    </div>
  );
};
