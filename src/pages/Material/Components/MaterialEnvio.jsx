import React,{ useEffect} from 'react'
import {  useGetAuth } from "../../../context/context";
import { BASE_URL } from "../../../assets/ApiRoutes";
import { styled } from '@mui/material/styles';
import { Avatar, Container, Table, TableBody,  TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { Create, DeleteOutlined } from '@mui/icons-material';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2'
import {  Link, useNavigate } from 'react-router-dom';



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


const ListMaterialById = ({materialEnvio,loggedUser}) => {
  const navigate = useNavigate();
  const userLogged = useGetAuth();
  //console.log(userLogged.id,'Loged')

  const envioAlmacen=(mat)=>{
   console.log('Entro',mat);
   Swal.fire({  
    title: 'Deseas enviar material a Almacén?',  
    showDenyButton: true,  showCancelButton: true,  
    confirmButtonText: `Enviar`,  
    denyButtonText: `Cancelar`,
  }).then((result) => {  
      /* Read more about isConfirmed, isDenied below */  
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/material/envioAlmacen`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                 //Authorization: `Bearer ${userLogged.token}`
            },
            body: JSON.stringify({
                
                mat: mat,
                tecnicoEnvio: loggedUser
                
            })
            
        })
            .then(res => {
                if (res.status === 200) {
                    Swal.fire("Enviado material a Almacén", res.message, "success");
                   
                }
            }).catch((error) => console.error(error))
        
      } else if (result.isDenied) {    
          Swal.fire('Changes are not saved', '', 'info')  
       }
  });
  }
   



  return (
    <Container sx={{padding:4}}>
    <TableContainer component={Paper}>
     <Table sx={{ minWidth: 700 }} aria-label="customized table">
       <TableHead>
           <StyledTableCell align="center">Imagen</StyledTableCell>
           <StyledTableCell align="center">Descripción</StyledTableCell>
           <StyledTableCell align="center">Unidades</StyledTableCell>
           <StyledTableCell align="center">Estado</StyledTableCell>
           <StyledTableCell align="center">Incidencia</StyledTableCell>
           <StyledTableCell align="center">Tipo</StyledTableCell>
           <StyledTableCell align="center">Acciones</StyledTableCell>
       </TableHead>
       <TableBody>
         {materialEnvio.map((mat) => (
           <StyledTableRow
             key={mat._id}
             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
           >
           <StyledTableCell>
           <Avatar alt="Remy Sharp" src={mat.description} />
           </StyledTableCell>
           <StyledTableCell align="center">{mat.descripcion}</StyledTableCell>
           <StyledTableCell align="center">{mat.unidades}</StyledTableCell>
           <StyledTableCell align="center">{mat.estado}</StyledTableCell>
           <StyledTableCell align="center">{mat.incidencia}</StyledTableCell>
           <StyledTableCell align="center">{mat.tipo}</StyledTableCell>
           <StyledTableCell align="center">
                 <IconButton onClick={() => envioAlmacen(mat)} 
                   aria-label="delete"
                   color="primary"
                   ><SendIcon />
                 </IconButton>
           </StyledTableCell>
           </StyledTableRow>
         ))}
       </TableBody>
     </Table>
    </TableContainer>
   </Container>
  )
}

export default ListMaterialById