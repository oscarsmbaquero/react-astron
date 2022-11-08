import React from "react";
import DataTable from "react-data-table-component";
import Badge from "react-bootstrap/Badge";
import { AddIcCallOutlined, Create, DeleteOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { red } from "@mui/material/colors";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const TotalCaceres = ({ avisos }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);


  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const handleMouseOver2 = () => {
    setIsHovering2(true);
  };

  const handleMouseOut2 = () => {
    setIsHovering2(false);
  };


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
          <Link to={`/avisos/details/${row._id}`}  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <IconButton aria-label="delete" color="success">
              <SearchIcon />
              {isHovering && <h6>Detalle</h6>}
            </IconButton>
          </Link>
          <Link to={`/edit/aviso/${row._id}`}  >
            <IconButton aria-label="delete" color="secondary" onMouseOver={handleMouseOver2} onMouseOut={handleMouseOut2}>
              <Create />
            </IconButton>
            {isHovering2 && <h6>Edit</h6>}
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
