import React from "react";
import DataTable from "react-data-table-component";
import Badge from "react-bootstrap/Badge";
import { AddIcCallOutlined, Create, DeleteOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ConstructionIcon from "@mui/icons-material/Construction";
import styled from "styled-components";


const AbiertosCaceres = ({ users, avisos, userLogged }) => {
  

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
      name: "TECNICO",
      selector: (row) => row.user_assigned?.name,
      sortable: true,
    },
    {
      name: "LOCALIDAD",
      sortable: true,
      selector: (row) => row.localidad,
    },
    {
      name: "ACCIONES",
      // selector: (row) => row.localidad,
      cell: (row) => (
        //
        <>
          {row.estado === "Asignado" ? (
            <Link to={`/avisos/reasignar/${row._id}/${row.user_assigned?._id}`}>
              <IconButton aria-label="delete" color="warning">
                <GroupAddIcon />
              </IconButton>
            </Link>
          ) : (
            <Link
              to={`/avisos/asignar/${row._id}/${row.n_incidencia}/${row.centro}`}
            >
              <IconButton aria-label="delete" color="success">
                <PersonAddAltIcon />
              </IconButton>
            </Link>
          )}
          {row.user_assigned._id === userLogged.id ? (
            <Link to={`/avisos/intervencion/${row._id}`}>
              <IconButton aria-label="delete" color="primary">
                <ConstructionIcon />
              </IconButton>
            </Link>
          ) : (
            <Link to={`/avisos/details/${row._id}`}>
              <IconButton aria-label="delete" color="success">
                <SearchIcon />
              </IconButton>
            </Link>
          )}
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
      title="Abiertos"
      columns={columns}
      data={avisos}
      pagination
      dense
      responsive
    />
  );
};

export default AbiertosCaceres;
