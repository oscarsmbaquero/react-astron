import React,{ useEffect} from 'react'
import {  useGetAuth } from "../../../context/context";
import { BASE_URL } from "../../../assets/ApiRoutes";
import { styled } from '@mui/material/styles';
import { Avatar, Container, Table, TableBody,  TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { Create, DeleteOutlined } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2'
import {  Link, useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#9BE2E1',
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
  const navigate = useNavigate();

  const deleteMaterial = (e, material) => {
    //console.log('Entro',material);
    e.preventDefault();
    fetch(`${BASE_URL}/material/${material}`,{
     method: 'DELETE',
     headers: {
      //'Content-Type': 'multipart/form-data',
       //Authorization: `Bearer ${userLogged.token}`
  },
     }).then(res=>{
       if(res.status === 200){
        console.log('Borrado');
      Swal.fire("Material eliminado", res.message,"success");
      navigate("/material")
      
      
      //navigate("/avisos/caceres")
      
    }
    })
  }
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
           <StyledTableCell align="left">Tipo</StyledTableCell>
           <StyledTableCell align="left">Acciones</StyledTableCell>
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
           <StyledTableCell align="left">{mat.tipo}</StyledTableCell>
           <StyledTableCell align="left">
           
           {mat.tipo ==='Reparable' && mat.estado ==='Averiado'?
           <>
           {/* <Link > */}
                 <IconButton  
                   aria-label="delete" 
                   color="primary" 
                   ><SendIcon />
                 </IconButton>
            {/* </Link> */}
            </>:''}
            {mat.tipo ==='Consumible' && mat.estado ==='Averiado'?
            
            <IconButton  color="error" onClick={(e)=> deleteMaterial(e,mat._id)}>
               <DeleteOutlined/>
             </IconButton>
            :''
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

export default ListMaterialById