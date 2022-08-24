import { CropLandscapeOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from "../../../assets/ApiRoutes";



const MostrarIntervencion = () => {

    const [intervencion, setIntervencion] = useState();
    const { id } =useParams();

    useEffect(() => {
        fetch(`${BASE_URL}/avisos/mostrar/${id}`)
        .then(response => response.json())
        .then(data => setIntervencion(data))
    
    }, [id])

    
 
   
    //console.log(intervencion.km,'intervenciones');
  return (
    <>
    {!intervencion?<p>Cargando</p>
    :
   <div>
            {intervencion.intervencion.map((aviso)=>(
            <div>
                {aviso}
            </div>
            ))}
    </div>
    }
    {/* {intervencion.intervencion.map((inter,index)=>(
    <div>{inter}</div>

    ))} */}
    
    
    <div>MostrarIntervencion</div>
    </>
  )
  }

export default MostrarIntervencion