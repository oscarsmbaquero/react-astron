import { CropLandscapeOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from "../../../assets/ApiRoutes";



const MostrarIntervencion = () => {

    const [intervencion, setIntervencion] = useState();
    const [intervencionTabla, setIntervencionTabla] = useState();
    const { id } =useParams();

    useEffect(() => {
        fetch(`${BASE_URL}/avisos/mostrar/${id}`)
        .then(response => response.json())
        .then(data => setIntervencion(data))
    
    }, [id])
     console.log(intervencion,'intervenciones');
  return (
    <>
    {!intervencion?(<p>Cargando</p>
    )
    :
   <div>
   <h2>Intervenciones</h2>
            { intervencion.intervencion.map((aviso)=>(
           
            <div  key={intervencion._id} >
            
              {aviso}
            </div>
            
            ))}
            
            
    </div>
   
    
    }    
    </>
  )
  }

export default MostrarIntervencion