import React,{ useEffect} from 'react'
import {  useGetAuth } from "../../../context/context";

import { styled } from '@mui/material/styles';
import { Avatar, Container, Table, TableBody,  TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { Create, DeleteOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2'
import {  Link, Navigate } from 'react-router-dom';

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
const ListMaterialById = ({materialById}) => {

console.log(materialById,'materialById');


    
  return (
    <Container sx={{padding:4}}>
    <TableContainer component={Paper}>
     <Table sx={{ minWidth: 700 }} aria-label="customized table">
       <TableHead>
           <StyledTableCell align="left">Imagen</StyledTableCell>
           <StyledTableCell align="left">Descripción</StyledTableCell>
           <StyledTableCell align="left">Unidades</StyledTableCell>
           <StyledTableCell align="left">Estado</StyledTableCell>
           <StyledTableCell align="left">Incidencia</StyledTableCell>
           {/* <StyledTableCell align="left">Acciones</StyledTableCell> */}
       </TableHead>
       <TableBody>
         {materialById.map((mat) => (
           <StyledTableRow
             key={mat._id}
             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
           >
           <StyledTableCell>
           <Avatar alt="Remy Sharp" src={mat.description} />
           </StyledTableCell>
           <StyledTableCell align="left">{mat.descripcion}</StyledTableCell>
           <StyledTableCell align="left">{mat.unidades}</StyledTableCell>
           <StyledTableCell align="left">{mat.estado}</StyledTableCell>
           <StyledTableCell align="left">{mat.incidencia}</StyledTableCell>
            {/* <StyledTableCell align="left">
           <Link >
                 <IconButton  
                   aria-label="delete" 
                   color="secondary" 
                   ><Create />
                 </IconButton>
            </Link>
            
           
            <IconButton  color="error" >
               <DeleteOutlined/>
             </IconButton>
           
            
           </StyledTableCell>  */}
           </StyledTableRow>
         ))}
       </TableBody>    
     </Table>
    </TableContainer>
   </Container>
  )
}

export default ListMaterialById