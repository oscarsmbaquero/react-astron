import React from 'react';
import DataTable from "react-data-table-component";
import Badge from "react-bootstrap/Badge";
import { AddIcCallOutlined, Create, DeleteOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/GroupAdd";
import styled from "styled-components";


const PendientesCaceres = ({users,avisos}) => {
  // console.log(avisos[3].intervencion?.length,1)
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
        ) : row.estado === "Abierto" ? (
          <Badge bg="primary">{row.estado}</Badge>
        ) : (
          <Badge bg="success">{row.estado}</Badge>
        ),
      sortable: true,
    },
    {
      name: "N/INTER",
      selector: (row) =>
      row.intervencion ? (
      row.intervencion.length === 1 ? (
        <Badge bg="success">{row.intervencion.length}</Badge>
      ) : row.intervencion.length > 1 || row.intervencion.length <= 3 ? (
        <Badge bg="warning">{row.intervencion.length}</Badge>
      ) : row.intervencion.length > 3 (
        <Badge bg="danger">{row.intervewncion.length}</Badge>
      )):'0',
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
         <Link to={`/avisos/asignar/${row._id}/${row.n_incidencia}/${row.centro}`}
            >
              <IconButton aria-label="delete" color="success">
                <PersonAddAltIcon />
              </IconButton>
            </Link>
            <Link to={`/avisos/details/${row._id}`}>
            <IconButton aria-label="delete" color="success">
              <SearchIcon />
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

  )
}

export default PendientesCaceres