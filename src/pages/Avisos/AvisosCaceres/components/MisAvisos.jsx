import React from "react";
import DataTable from "react-data-table-component";
import Badge from "react-bootstrap/Badge";
import { AddIcCallOutlined, Create, DeleteOutlined } from "@mui/icons-material";
import ConstructionIcon from '@mui/icons-material/Construction';
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MisAvisos = ({ avisos }) => {
  console.log(avisos,'avisos');
  const clickHandler = (e, id) => {};
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
      name: "N/INTER",
      selector: (row) =>
        row.intervencion.length === 1 ? (
          <Badge bg="success">{row.intervencion.length}</Badge>
        ) : row.intervencion.length > 1 || row.intervencion.length <= 3 ? (
          <Badge bg="warning">{row.intervencion.length}</Badge>
        ) : (
          row.intervencion.length >
          3(<Badge bg="danger">{row.intervewncion.length}</Badge>)
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
      cell: (row) => (
        //
        <>
          <Link to={`/avisos/intervencion/${row._id}`}>
            <IconButton aria-label="delete" color="secondary">
              <ConstructionIcon />
            </IconButton>
          </Link>
          <Link to={`/avisos/details/${row._id}`}>
            <IconButton aria-label="delete" color="success">
              <Create />
            </IconButton>
          </Link>
          ,
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

export default MisAvisos;
