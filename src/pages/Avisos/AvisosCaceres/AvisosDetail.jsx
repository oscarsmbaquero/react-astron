import React,{ useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { BASE_URL } from "../../../assets/ApiRoutes";
import './AvisosCaceres.scss';

const AvisosDetail = () => {
  const { id } = useParams();
  console.log(id,'param');

  let [avisos, SetAvisos] = useState();
  

  useEffect(() => {
    
    fetch(`${BASE_URL}/avisos/${id}`)
      .then(response => response.json())
      .then(data => SetAvisos(data))      
     }, [id]); 
 console.log(avisos,'llego')
 return (
  <div>
  { !avisos ? <p>Cargando...</p> : <>
    <div className="details">
      <div className="details__text">      
          <h1>{avisos.n_incidencia}</h1>
          <h2>{avisos.localidad}</h2>          
          <h2>{avisos.centro}</h2>
          {avisos.prioridad === 'Urgente' ? <h3 className='urgente'>{avisos.prioridad}</h3> : <h3 className='normal'>{avisos.prioridad}</h3> }
          
          <p>{avisos.averia}</p>          
       </div>
    </div>
  </>}
</div>
   );
}

export default AvisosDetail