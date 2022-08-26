import { CropLandscapeOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from "../../../assets/ApiRoutes";



const MostrarIntervencion = () => {

    const [intervencion, setIntervencion] = useState();
    const [intervencionTabla, setIntervencionTabla] = useState([]);
    const { id } =useParams();
    let data =[];

    useEffect(() => {
        fetch(`${BASE_URL}/avisos/mostrar/${id}`)
        .then(response => response.json())
        .then(data => setIntervencion(data))
    
    }, [id])
     //console.log(intervencion,'intervenciones');
  return (
    <>
    {!intervencion?(<p>Cargando</p>
    )
    :
   <>
   <h2>Intervenciones</h2>
            { intervencion.intervencion.map((aviso,index)=>(
             
            <div  key={aviso.name} >
            {intervencionTabla.push[{
              intervencion:aviso,
              //fecha_inicio:aviso.fecha_inicio[index]
            }]
            }
           
            
              {aviso}
            </div>
            
            ))
            
            }
           
            {console.log(intervencionTabla,49)
            
            }
            
          
            
    </>
   
    
    }    
    </>
  )
  }

export default MostrarIntervencion