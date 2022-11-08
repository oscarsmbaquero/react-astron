import React from "react";
import DataTable from "react-data-table-component";
import Badge from "react-bootstrap/Badge";
import { Create } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";


const TotalCaceres = ({ avisos,userLogged }) => {
  

  const columns = [
    {
      name: "INCIDENCIA",
      selector: (row) => (
        <Badge bg="primary" text="bold">
          {row.n_incidencia}
        </Badge>
      ),
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
        ) : row.estado === "Abierta" ? (
          <Badge bg="primary">{row.estado}</Badge>
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
    />
  );
};

export default TotalCaceres;
