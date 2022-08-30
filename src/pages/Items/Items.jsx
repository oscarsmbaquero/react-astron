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
 console.log(items);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.text.primary,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 1,
    },
  }));


  return (
    <Container sx={{padding:4}}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
            
            <StyledTableCell align="left">Código</StyledTableCell>
            <StyledTableCell align="left">Descripción</StyledTableCell>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <StyledTableRow
              key={item._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
            <StyledTableCell align="left">{item.codigo}</StyledTableCell>
            <StyledTableCell align="left">{item.descripcion}</StyledTableCell>
            
            <StyledTableCell align="left">
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
              
            </StyledTableCell> 
            </StyledTableRow>
          ))}
        </TableBody>    
      </Table>
      </TableContainer>
   </Container>
  )
}

export default Items