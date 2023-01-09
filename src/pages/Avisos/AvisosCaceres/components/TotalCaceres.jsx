import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Badge from "react-bootstrap/Badge";
import { Create, StayPrimaryLandscape } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Loader from "../../../../core/components/Loader/Loader";

const TotalCaceres = ({ avisos, userLogged }) => {

  const [columns, setColumns] = useState([]);
	const [pending, setPending] = React.useState(true);
  //const [avisosFinales, setAvisosFinales]= useState([]);
  const fechaActual = new Date().getTime();

  const fechaEntrada = avisos.map(function(element){
    const resul = `${element.createdAt}`;
    const result= Date.parse(resul);
    const sla = ((fechaActual -result)/60 / 60 /1000/24).toFixed(0);
    const sla2=parseInt(sla)
    return sla2;

})
  // console.log(fechaApertura,'fechaApertura'); 
  // console.log(cambiarFecha())
  const tableCustomStyles = {
    headCells: {
      style: {
        color: 'white',
        //justifyContent: 'center',
        backgroundColor: 'black'
      },
    },
  }


  const registros =()=>{
    let tabla=[]
        avisos.map( (aviso, index ) => (
          tabla.push({
            n_incidencia:aviso.n_incidencia,
            fecha_entrada: aviso.createdAt.slice(0,10),
            centro: aviso.centro,
            estado:aviso.estado,
            localidad:aviso.localidad,
            sla: fechaEntrada[index],
            id: aviso._id,

          })
        ))
        return tabla;
  }
  
  
  
  const conditionalRowStyles = [
    {
      when: row => row.estado === 'Asignado',
      style: {
        backgroundColor: 'rgb(2, 150, 104)',
        //backgroundColor: 'rgba(63, 195, 128, 0.9)',
        color: 'black',
        text:'bold',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: row => row.estado === 'Pendiente',
      style: {
        backgroundColor: 'rgb(212, 210, 0)',
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
              selector: (row) =>
             row.fecha_entrada.slice(0,10),
              sortable: true,
            },
            {
              name: "SLA",
              selector: (row) =>
              row.sla <= 4 ? (
                <Badge bg="success">{row.sla} días</Badge>
              ) : row.sla > 4 && row.sla < 14? (
                <Badge bg="warning">{row.sla} días</Badge>
              ) :
                <Badge bg="danger">{row.sla} días</Badge>,
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
                  <Link to={`/avisos/details/${row.id}`}>
                    <IconButton aria-label="delete" color="success">
                      <SearchIcon />
                    </IconButton>
                  </Link>
                  <Link to={`/edit/aviso/${row.id}`}>
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
    customStyles={tableCustomStyles}
      //   title="Avisos Totales"
      columns={columns}
      data={registros()}
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
