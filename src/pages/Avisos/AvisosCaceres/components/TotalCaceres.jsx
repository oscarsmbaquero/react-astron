import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Badge from "react-bootstrap/Badge";
import { Create } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Loader from "../../../../core/components/Loader/Loader";

const TotalCaceres = ({ avisos, userLogged }) => {

  const [columns, setColumns] = useState([]);
	const [pending, setPending] = React.useState(true);

  const conditionalRowStyles = [
    {
      when: row => row.estado === 'Pendiente',
      style: {
        backgroundColor: 'rgb(255, 258, 0)',
        //backgroundColor: 'rgba(63, 195, 128, 0.9)',
        color: 'black',
        text:'bold',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: row => row.estado === 'Abierto',
      style: {
        backgroundColor: 'rgb(150, 150, 100,258)',
        //backgroundColor: 'rgba(63, 195, 128, 0.9)',
        color: 'black',
        text:'bold',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: row => row.estado === 'Cerrada',
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

  useEffect(() => {
		const timeout = setTimeout(() => {
			setColumns([
				{
              name: "INCIDENCIA",
              selector: (row) => (row.n_incidencia),
              sortable: true,
            },
            {
              name: "ENTRADA",
              selector: (row) => row.createdAt,
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
			]);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

  return (
    <DataTable
      //   title="Avisos Totales"
      columns={columns}
      data={avisos}
      pagination
      dense
      responsive
      conditionalRowStyles={conditionalRowStyles}
      progressPending={pending}
      progressComponent={<Loader />}
    />
  );
};

export default TotalCaceres;
