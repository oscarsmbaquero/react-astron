import React from 'react';
import DataTable from "react-data-table-component";
import Badge from "react-bootstrap/Badge";
import { AddIcCallOutlined, Create, DeleteOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";


const PendientesCaceres = ({users,avisos}) => {
  
  console.log(avisos);
  const clickHandler = (e, id) => {
  };
  const columns = [
    {
      name: "INCIDENCIA" ,
      selector: (row) => <Badge bg="primary" text="bold">{row.n_incidencia}</Badge>,
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
      name: "N/INTER",
      selector: (row) =>
      row.intervencion.length === 1 ? (
        <Badge bg="success">{row.intervencion.length}</Badge>
      ) : row.intervencion.length > 1 || row.intervencion.length < 3 ? (
        <Badge bg="warning">{row.intervencion.length}</Badge>
      ) : (
        <Badge bg="danger">{row.intervewncion.length}</Badge>
      ),
    sortable: true,
    },
    {
      name: "MOTIVO",
      selector: (row) => row.motivo,
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
        {console.log(row._id)}
          <Link to={`/avisos/details/${row._id}`}>
            <IconButton aria-label="delete" color="success">
              <Create />
            </IconButton>
          </Link>
          <IconButton color="error" onClick={(e) => clickHandler(e, row._id)}>
            <DeleteOutlined />
          </IconButton>
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

  )
}

export default PendientesCaceres