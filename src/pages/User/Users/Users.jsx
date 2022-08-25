import React, { useEffect, useState } from 'react';
import { BASE_URL } from "../../../assets/ApiRoutes";
import { styled } from '@mui/material/styles';
import { Container, Table, TableBody,  TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
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
    let [users, SetUsers] = useState([]); 
    

    useEffect(() => {
        fetch(`${BASE_URL}/users`)
          .then(response => response.json())
          .then(data => SetUsers(data))
      }, []);
   console.log(users);
  return (
    <Container>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
            <StyledTableCell align="left">Nombre</StyledTableCell>
            <StyledTableCell align="left">Apellidos</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Rol</StyledTableCell>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <StyledTableRow
              key={user._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
            {user.name}
            </TableCell>
            <StyledTableCell align="left">{user.surname}</StyledTableCell>
            <StyledTableCell align="left">{user.email}</StyledTableCell>
            <StyledTableCell align="left">{user.account_type}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>    
      </Table>
     </TableContainer>
    </Container>
   
  )
}

export default Users