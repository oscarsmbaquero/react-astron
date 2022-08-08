import React,{ useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

const AvisosDetail = () => {
  const { id } = useParams();
  console.log(id,'param');

  let [avisos, SetAvisos] = useState();
  

  useEffect(() => {
    
    fetch(`http://localhost:5000/avisos/${id}`)
      .then(response => response.json())
      .then(data => SetAvisos(data))      
     }, [id]); 
 console.log(avisos,'llego')
 return (
  <div>
  { !avisos ? <p>Cargando...</p> : <>
    <div className="details">
      <div className="details__text">      
          <h1> Nº incidencia: {avisos.n_incidencia}</h1>
          <h2> Localidad:{avisos.localidad}</h2>          
          <h2> Centro:{avisos.centro}</h2>
          <p>  Averia:{avisos.averia}</p>          
       </div>
    </div>
  </>}
</div>
   );
}

export default AvisosDetail