import React,{ useState, useEffect} from 'react';
import { BASE_URL } from "../../../assets/ApiRoutes";
import { useGetAuth } from "../../../context/context";
import { CardHeader, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SearchInput from '../../../core/components/SearchInput/SearchInput';



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


 console.log(avisosAsignados);
   
 const onInputChange = (e) => {
  console.log('Entro');
  setKeyword(e.target.value.toLowerCase());
};






  return (
  <>
  <div className='searchContainer'>
         <SearchInput placeholder="Filtrar " onChange={onInputChange} />
      </div>
      <Container>
       <Grid container spacing={5}>
        { !avisosAsignados ? <p>Cargando...</p> 
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
      </Container>
    </>  
    
            
              
  )
}

export default Asignados