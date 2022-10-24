import React,{ useState, useEffect} from 'react';
import { BASE_URL } from "../../../assets/ApiRoutes";
import { useGetAuth } from "../../../context/context";
import { Avatar, CardHeader, Container, IconButton, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SearchInput from '../../../core/components/SearchInput/SearchInput';
import { Create, DeleteOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


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



const Asignados = () => {

  const userLogged = useGetAuth();
  //console.log(userLogged.id);
  const [avisosAsignados, setAvisosAsignados] = useState();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    
    fetch(`${BASE_URL}/users/${userLogged.id}`)
      .then(response => response.json())
      .then(data => setAvisosAsignados(data))      
     }, [userLogged.id]); 


 //console.log(avisosAsignados,45);
   
 const onInputChange = (e) => {
  console.log('Entro');
  setKeyword(e.target.value.toLowerCase());
};






  return (
  <>
      <div className='searchContainer'>
         <SearchInput placeholder="Filtrar " onChange={onInputChange} />
      </div>
      {/* <Container>
       <Grid container spacing={5}>
        { !avisosAsignados ? <p>No hay Avisos</p> 
        : 
        <>
          {avisosAsignados.assigned_avisos.map((aviso)=>(
            <div>              
              <p>{aviso.centro}</p>
              <p>{aviso._id}</p>
            </div>
          ))}
          
        </>
        }
      
        </Grid>
      </Container> */}

      { !avisosAsignados ? <p>No hay Avisos</p> 
      :
      <>
      <Container sx={{padding:4}}>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
            <StyledTableCell align="center">Centro</StyledTableCell>
            {/* <StyledTableCell align="center">Averia</StyledTableCell> */}
            <StyledTableCell align="center">Acciones</StyledTableCell>
        </TableHead>
        <TableBody>
          {avisosAsignados.assigned_avisos.map((aviso) => (
            <StyledTableRow
              key={aviso._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <StyledTableCell align="center">{aviso.centro}</StyledTableCell>
            {/* <StyledTableCell align="center">{user.surname}</StyledTableCell>
            <StyledTableCell align="center">{user.email}</StyledTableCell>
            <StyledTableCell align="center">{user.account_type}</StyledTableCell>*/}
            <StyledTableCell align="center">
            <Link to={`/avisos/intervencion/${aviso._id}`}>
                  <IconButton  
                    aria-label="delete" 
                    color="secondary" 
                    ><Create />
                  </IconButton>
             </Link>
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
  </>
      }
    </>  
    
            
              
  )
}

export default Asignados