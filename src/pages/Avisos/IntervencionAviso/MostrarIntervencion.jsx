
import React, { useEffect, useState} from 'react';
// import {  Link, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { BASE_URL } from "../../../assets/ApiRoutes";
// import Table from "../../../Components/Table/Table.jsx"

import { Container, Table, TableBody,  TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';




const MostrarIntervencion = () => {

    const [intervencion, setIntervencion] = useState();
    const [intervencionTabla, setIntervencionTabla] = useState([]);
    const { id } =useParams();

    // const columns = useMemo(
    //   () => [
    //     {
    //       Header: 'Intervención',
    //       accessor: 'intervencion',
    //     },
    //     {
    //       Header: 'Fecha de Inicio',
    //       accessor: 'fecha_inicio',
    //     },
    //     {
    //       Header: 'Fecha de Fin',
    //       accessor: 'fecha_fin',
    //     },
    //     {
    //       Header: 'KM',
    //       accessor: 'km',
    //     },
    //   ]
    // )
    

    useEffect(() => {
        fetch(`${BASE_URL}/avisos/mostrar/${id}`)
        .then(response => response.json())
        .then(data => setIntervencion(data))
    
    }, [id])

    useEffect(() => {
      if (intervencion) {
        let tabla=[]
        intervencion.intervencion.map( (aviso, index ) => (
          tabla.push({
            intervencion:aviso,
            fecha_inicio: intervencion.fecha_inicio[index],
            fecha_fin:intervencion.fecha_fin[index] ,
            km: intervencion.km[index],
            viaje: intervencion.viaje[index],
            tecnico: intervencion.tecnicoIntervencion[index],
          })
        ))

        setIntervencionTabla(tabla);
      }
  
  }, [intervencion])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.text.primary,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
     //console.log(intervencion,'intervenciones');
  return (
    <Container sx={{padding:4}}>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
            <StyledTableCell align="center">Fecha Inicio</StyledTableCell>
            <StyledTableCell align="center">Fecha Fin</StyledTableCell>
            <StyledTableCell align="center">Descripción</StyledTableCell>
            <StyledTableCell align="center">km</StyledTableCell>
            <StyledTableCell align="center">T desplazamiento</StyledTableCell>
            <StyledTableCell align="center">Técnico</StyledTableCell>
        </TableHead>
        <TableBody>
          {intervencionTabla.map((aviso) => (
            <StyledTableRow
              key={aviso._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <StyledTableCell align="left">{aviso.fecha_inicio}</StyledTableCell>
            <StyledTableCell align="left">{aviso.fecha_fin}</StyledTableCell>
            <StyledTableCell align="left">{aviso.intervencion}</StyledTableCell>
            <StyledTableCell align="left">{aviso.km}</StyledTableCell>
            <StyledTableCell align="left">{aviso.viaje}</StyledTableCell>
            <StyledTableCell align="left">{aviso.tecnico}</StyledTableCell>
            {/* <Link to={`/edit/user/${aviso._id}`}>
                  <IconButton  
                    aria-label="delete" 
                    color="secondary" 
                    ><Create />
                  </IconButton>
             </Link>  */}
              {/* {userLogged.rol ==='Dispatch' || userLogged.rol ==='Admin' ? */}
             {/* <IconButton  color="error" onClick={(e)=> deleteUser(e,user._id)} >
                <DeleteOutlined/>
              </IconButton> */}
              {/* :'' } */}
             
            {/* </StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>    
      </Table>
     </TableContainer>
    </Container>
  //   <>
  //   {!intervencion?(<p>Cargando</p>
  //   )
  //   :
  //  <>
  //  <h2>Intervenciones</h2>
  //  <Table columns={columns} data={intervencionTabla} />
  //   </>
    
  //   }    
  //   </>
  )
  }

export default MostrarIntervencion