import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../assets/ApiRoutes";
import DataTable from "react-data-table-component";
import Badge from "react-bootstrap/Badge";

const Avisos = () => {
  let [avisos, SetAvisos] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/avisos`)
      .then((response) => response.json())
      .then((data) => SetAvisos(data));
  }, []);

  console.log(avisos, "avisos");

  const columns = [
    {
      name: "Incidencia",
      selector: (row) => row.n_incidencia,
    },
    {
      name: "Centro",
      selector: (row) => row.centro,
    },
    {
      name: "Estado",
      selector: (row) =>
        row.estado === "Pendiente" ? (
          <Badge bg="danger">{row.estado}</Badge>
        ) : row.estado === "Abierta" ? (
          <Badge bg="primary">{row.estado}</Badge>
        ) : (
          <Badge bg="success">{row.estado}</Badge>
        ),
    },
    {
      name: "Localidad",
      selector: (row) => row.localidad,
    },
  ];
  // const data = [
  //     {
  //         id: 1,
  //         title: 'Beetlejuice',
  //         year: '1988',
  //     },
  //     {
  //         id: 2,
  //         title: 'Ghostbusters',
  //         year: '1984',
  //     },
  //     {
  //         id: 3,
  //         title: 'Ghostbusters',
  //         year: '1984',
  //     },
  // ]
  return (
      <DataTable 
      title="Avisos Totales"
      columns={columns} 
      data={avisos} 
      pagination
      />
  );
};

export default Avisos;
