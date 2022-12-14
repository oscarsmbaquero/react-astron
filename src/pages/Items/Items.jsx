import React, { useEffect, useState } from 'react';
import { BASE_URL } from "../../assets/ApiRoutes";
// import SearchInput from '../../../core/components/SearchInput/SearchInput';
import { Create, DeleteOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Avatar, CardHeader, Container, IconButton, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';



const Items = () => {

  const [items, setItems] = useState([]);


  useEffect(() => {
    fetch(`${BASE_URL}/items`)
      .then(response => response.json())
      .then(data => setItems(data))
  }, []);

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


  return (
    <Container sx={{padding:4}}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
            
            <StyledTableCell align="center">Código</StyledTableCell>
            <StyledTableCell align="center">Descripción</StyledTableCell>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <StyledTableRow
              key={item._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
            <StyledTableCell align="center">{item.codigo}</StyledTableCell>
            <StyledTableCell align="center">{item.descripcion}</StyledTableCell>
            

            {/* <Link to={`/avisos/intervencion/${}`}>
                  <IconButton  
                    aria-label="delete" 
                    color="secondary" 
                    ><Create />
                  </IconButton>
              </Link> */}
              {/* {userLogged.rol ==='Dispatch' || userLogged.rol ==='Admin' ?
              <IconButton  color="error" onClick={(e)=> deleteUser(e,user._id)} >
                <DeleteOutlined/>
              </IconButton>
              :'' } */}
              
            
            </StyledTableRow>
          ))}
        </TableBody>    
      </Table>
      </TableContainer>
   </Container>
  )
}

export default Items