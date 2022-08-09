
import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';
import SearchInput from '../../../core/components/SearchInput/SearchInput';
import Loader from "../../../core/components/Loader/Loader";
import './AvisosCaceres.scss';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Create } from '@mui/icons-material';
import Swal from 'sweetalert2'// hay que probarlo
import {  useGetAuth } from "../../../context/context";
import SelectCompanies from '../../../core/components/SelectCompanies/SelectCompanies';
import SelectUser from '../../../core/components/SelectUsers/SelectUser';


const AvisosCaceres = () => {
  const userLogged = useGetAuth();
    let [avisos, SetAvisos] = useState([]); 
    let [users, SetUsers] = useState([]); 
    const [keyword, setKeyword] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    useEffect(() => {
        fetch('http://localhost:5000/avisos')
          .then(response => response.json())
          .then(data => SetAvisos(data))
      }, []);
console.log(avisos);
useEffect(() => {
  fetch('http://localhost:5000/users')
    .then(response => response.json())
    .then(data => SetUsers(data))
}, []);
console.log(users);
const onInputChange = (e) => {
  setKeyword(e.target.value.toLowerCase());
};
/*Con el valor introducido en el inpute del buscador filtramos los trabajos almacenaos en jobs,
Filtramos por empresa o por puestos ofertados, previo paso a minusculas*/
const filteredAvisos = avisos.filter((avisos) =>
  avisos.centro.toLowerCase().includes(keyword)||
  avisos.n_incidencia.toLowerCase().includes(keyword)
);

const deleteaviso = (e, aviso) => {
  e.preventDefault();

  // const thisClicked = e.currentTarget;
  // thisClicked.innerText ="Borrando"  ;

  fetch(`http://localhost:5000/avisos/${aviso}`,{
   method: 'DELETE',
   headers: {
    //'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${userLogged.token}`
},
   }).then(res=>{
     if(res.status === 200){
      console.log('Borrado');
    Swal.fire("Eliminado", res.message,"success");
    fetch('http://localhost:5000/avisos')
    .then(response => response.json())
    .then(data => SetAvisos(data))
    Navigate("/avisos/caceres")
    
  }
  })
}
  return (
    <>
      
      <section className='searchContainer'>
         <SearchInput placeholder="Filtrar por trabajo o empresa" onChange={onInputChange} />
      </section>
      
       
            {isLoaded === false ? (
                    <Loader />
                  ) : (
              <>
              <div className="avisosList">
              {filteredAvisos.map((aviso, key)=>(

                <div key={ key } aviso={aviso}>
                   <div className="avisosList__div">
                      <div className='avisosList__info'>
                        
                          <div className='avisosList__text' >
                            <h1 className='avisosList__h1'>{aviso.n_incidencia} </h1>
                            <h2 className='avisosList__h2'>{aviso.centro}</h2>
                            <h3 className='avisosList__h3'>{aviso.averia}</h3>
                            <h3 className='avisosList__h3'>{aviso.estado}</h3>
                          </div>
                          <div className="buttons2">
                            <IconButton onClick={(e)=> deleteaviso(e,aviso._id)}
                                 aria-label="delete" 
                                 size="large" 
                                 color="error"
                                 ><DeleteIcon fontSize="inherit" />
                            </IconButton>
                            <Link to={`/avisos/details/${aviso._id}`}>
                              <IconButton  
                                 aria-label="delete" 
                                 color="success" 
                                 ><AddIcon />
                              </IconButton>
                            </Link>
                            <Link to={`/edit/aviso/${aviso._id}`}>
                              <IconButton  
                                 aria-label="delete" 
                                 color="secondary" 
                                 ><Create />
                              </IconButton>
                            </Link>
                            <Link to={`/avisos/asignar/${aviso._id}/${aviso.n_incidencia}`}>
                             <button>Asignar Aviso</button>
                            </Link>
                            <Link to={`/avisos/intervencion/${aviso._id}`}>
                             <button>Intervención</button>
                            </Link>
                          </div>
                      </div>
                    </div>
                </div>
                ))}
                </div>
                </>
                    )}
        
      
      
      </>
  )
}

export default AvisosCaceres