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



const Asignados = () => {

  const userLogged = useGetAuth();
  //console.log(userLogged.id);
  const [avisosAsignados, setAvisosAsignados] = useState();

  useEffect(() => {
    
    fetch(`${BASE_URL}/users/${userLogged.id}`)
      .then(response => response.json())
      .then(data => setAvisosAsignados(data))      
     }, [userLogged.id]); 


 console.log(avisosAsignados);






  return (

    <div>
       { !avisosAsignados ? <p>Cargando...</p> : <>
         
         
          {avisosAsignados.assigned_avisos.map((aviso)=>(
            <div>
             
              <p>{aviso.centro}</p>
              <p>{aviso._id}</p>
            </div>
         ))}
         
       </>
       }
    </div>
            
              
  )
}

export default Asignados