import React, { useEffect, useState } from 'react';
import {  useGetAuth } from "../../../context/context";

import { styled } from '@mui/material/styles';
import { Avatar, Container, Table, TableBody,  TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { Create, DeleteOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2'
import {  Link, Navigate } from 'react-router-dom';
import { TablePagination } from '@material-ui/core';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color:theme.palette.common.white,
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


const ListMaterial = ({material}) => {
    const userLogged = useGetAuth();  
  return (
    <Container sx={{padding:4}}>
    <TableContainer component={Paper}>
     <Table sx={{ minWidth: 700 }} aria-label="customized table">
       <TableHead>
           <StyledTableCell align="center">Imagen</StyledTableCell>
           <StyledTableCell align="center">Descripción</StyledTableCell>
           <StyledTableCell align="center">Almacén</StyledTableCell>
           <StyledTableCell align="center">Unidades</StyledTableCell>
           <StyledTableCell align="center">Estado</StyledTableCell>
           <StyledTableCell align="center">Incidencia</StyledTableCell>
           <StyledTableCell align="center">Tipo de Material</StyledTableCell>
           <StyledTableCell align="center">Acciones</StyledTableCell>
       </TableHead>
       <TableBody>
         {material.map((mat) => (
           <StyledTableRow
             key={mat._id}
             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
           >
           <StyledTableCell>
           <Avatar alt="Remy Sharp" src={mat.description} />
           </StyledTableCell>
           <StyledTableCell align="center">{mat.descripcion}</StyledTableCell>
           <StyledTableCell align="center">{mat.almacen}</StyledTableCell>
           <StyledTableCell align="center">{mat.unidades}</StyledTableCell>
           <StyledTableCell align="center">{mat.estado}</StyledTableCell>
           <StyledTableCell align="center">{mat.incidencia}</StyledTableCell>
           <StyledTableCell align="center">{mat.tipo}</StyledTableCell>
             <StyledTableCell align="center">
              { userLogged.name === mat.almacen && 
                <IconButton  
                   aria-label="delete" 
                   color="primary" 
                   ><Create />
                 </IconButton>
              }
           </StyledTableCell>
           </StyledTableRow>
         ))}
       </TableBody>
     </Table>
    </TableContainer>
   </Container>
  )
}

export default ListMaterial