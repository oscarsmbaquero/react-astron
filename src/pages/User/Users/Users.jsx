import React, { useEffect, useState } from 'react';
import {  useGetAuth } from "../../../context/context";
import {  Link, Navigate } from 'react-router-dom';
import { BASE_URL } from "../../../assets/ApiRoutes";
import { styled } from '@mui/material/styles';
import { Avatar, Container, Table, TableBody,  TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { Create, DeleteOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2'// hay que



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

const Users = () => {
  const userLogged = useGetAuth();  
  let [users, SetUsers] = useState([]); 
    
    

    useEffect(() => {
        fetch(`${BASE_URL}/users`)
          .then(response => response.json())
          .then(data => SetUsers(data))
      }, []);
   //console.log(users);


   const deleteUser = (e, user) => {
    console.log('Entro',user);
    e.preventDefault();
    fetch(`${BASE_URL}/users/${user}`,{
     method: 'DELETE',
     headers: {
      //'Content-Type': 'multipart/form-data',
      // Authorization: `Bearer ${userLogged.token}`
  },
     }).then(res=>{
       if(res.status === 200){
        console.log('Borrado');
      Swal.fire("Eliminado", res.message,"success");
      fetch(`${BASE_URL}/users`)
      .then(response => response.json())
      .then(data => SetUsers(data))
      
      //navigate("/avisos/caceres")
      
    }
    })
  }

  //console.log(userLogged.id,72);

  return (
    <Container sx={{padding:4}}>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
            <StyledTableCell align="left">Imagen</StyledTableCell>
            <StyledTableCell align="left">Nombre</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Rol</StyledTableCell>
            <StyledTableCell align="left">Acciones</StyledTableCell>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <StyledTableRow
              key={user._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <StyledTableCell>
            <Avatar alt="Remy Sharp" src={user.image} />
            </StyledTableCell>
            <StyledTableCell align="left">{user.name}</StyledTableCell>
            <StyledTableCell align="left">{user.email}</StyledTableCell>
            <StyledTableCell align="left">{user.account_type}</StyledTableCell>
            <StyledTableCell align="left">

            {userLogged.id === user._id  ?
            <Link to={`/edit/user/${user._id}`}>
                  <IconButton  
                    aria-label="delete" 
                    color="secondary" 
                    ><Create />
                  </IconButton>
             </Link>
              :''}
             {userLogged.rol ==='Dispatch' || userLogged.rol ==='Admin' ?
             <IconButton  color="error" onClick={(e)=> deleteUser(e,user._id)} >
                <DeleteOutlined/>
              </IconButton>
              :'' }
             
            </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>    
      </Table>
     </TableContainer>
    </Container>
   
  )
}

export default Users