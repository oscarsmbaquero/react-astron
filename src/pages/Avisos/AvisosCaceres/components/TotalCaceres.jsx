import React from "react";
import DataTable from "react-data-table-component";
import Badge from "react-bootstrap/Badge";
import { Create } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const TotalCaceres = ({ avisos, userLogged }) => {

  const conditionalRowStyles = [
    {
      when: row => row.estado === 'Pendiente',
      style: {
        backgroundColor: 'rgb(206, 255, 255)',
        //backgroundColor: 'rgba(63, 195, 128, 0.9)',
        color: 'black',
        text:'bold',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  ]

  const columns = [
    {
      name: "INCIDENCIA",
      selector: (row) => (row.n_incidencia),
      sortable: true,
    },
    {
      name: "CENTRO",
      selector: (row) => row.centro,
      sortable: true,
    },
    {
      name: "ESTADO",
      selector: (row) =>
        row.estado === "Pendiente" ? (
          <Badge bg="danger">{row.estado}</Badge>
        ) : row.estado === "Abierto" ? (
          <Badge bg="primary">{row.estado}</Badge>
        ) : row.estado === "Asignado" ? (
          <Badge bg="warning">{row.estado}</Badge>
        ) : (
          <Badge bg="success">{row.estado}</Badge>
        ),
      sortable: true,
    },
    {
      name: "LOCALIDAD",
      selector: (row) => row.localidad,
      sortable: true,
    },
    {
      name: "ACCIONES",
      // selector: (row) => row.localidad,
      cell: (
        row //
      ) => (
        <>
          <Link to={`/avisos/details/${row._id}`}>
            <IconButton aria-label="delete" color="success">
              <SearchIcon />
            </IconButton>
          </Link>
          <Link to={`/edit/aviso/${row._id}`}>
            <IconButton aria-label="delete" color="secondary">
              <Create />
            </IconButton>
          </Link>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <DataTable
      //   title="Avisos Totales"
      columns={columns}
      data={avisos}
      pagination
      dense
      responsive
      conditionalRowStyles={conditionalRowStyles}
    />
  );
};

export default TotalCaceres;
