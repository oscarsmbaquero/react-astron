import React from 'react';
import DataTable from "react-data-table-component";
import Badge from "react-bootstrap/Badge";
import { AddIcCallOutlined, Create, DeleteOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
  import AddIcon from "@mui/icons-material/Add";
  import { Link } from "react-router-dom";
  
import { useState } from 'react';

const TotalCaceres = ({avisos}) => {

 

    const clickHandler = (e, id) => {
        console.log(id);
      };
      const columns = [
        {
          name: "Incidencia",
          selector: (row) => <Badge bg="primary" text="bold">{row.n_incidencia}</Badge>,
          sortable: true,
        },
        {
          name: "Centro",
          selector: (row) => row.centro,
          sortable: true,
          
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
          sortable: true,
        },
        {
          name: "Localidad",
          selector: (row) => row.localidad,
          sortable: true,
        },
        {
          name: "Acciones",
          // selector: (row) => row.localidad,
          cell: (row) => (
            //
            <>
            {console.log(row._id)}
              <Link to={`/avisos/details/${row._id}`}>
                <IconButton aria-label="delete" color="success">
                  <AddIcon />
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
  
    

    console.log(avisos,'avisos abiertos');
  return (
    <>
  
      <DataTable
    //   title="Avisos Totales"
      columns={columns}
      data={avisos}
      pagination
      dense
    /> 
    </>
  )
}

export default TotalCaceres