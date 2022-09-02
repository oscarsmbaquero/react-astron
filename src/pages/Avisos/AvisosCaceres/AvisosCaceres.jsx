
import React, { useState, useEffect } from 'react'
import {  Link, Navigate } from 'react-router-dom';
import SearchInput from '../../../core/components/SearchInput/SearchInput';
import Loader from "../../../core/components/Loader/Loader";
import './AvisosCaceres.scss';
import { BASE_URL } from "../../../assets/ApiRoutes";
import IconButton from '@mui/material/IconButton';
//import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Create, DeleteOutlined } from '@mui/icons-material';
import Swal from 'sweetalert2'// hay que probarlo
import {  useGetAuth } from "../../../context/context";
import IconoNuevoGasto from '../../../assets/images/nuevo-gasto.svg';

// import SelectCompanies from '../../../core/components/SelectCompanies/SelectCompanies';
// import SelectUser from '../../../core/components/SelectUsers/SelectUser';
//import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
//import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { CardHeader, Container } from '@mui/material';
//import Link from '@mui/material/Link';



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
        fetch(`${BASE_URL}/avisos`)
          .then(response => response.json())
          .then(data => SetAvisos(data))
      }, []);

const avisosCaceres = avisos.filter((avisos)=> avisos.provincia === 'Caceres');

 
useEffect(() => {
  fetch(`${BASE_URL}/users`)
    .then(response => response.json())
    .then(data => SetUsers(data))
}, []);
const onInputChange = (e) => {
  console.log('Entro');
  setKeyword(e.target.value.toLowerCase());
};


/*Con el valor introducido en el inpute del buscador filtramos los trabajos almacenaos en jobs,
Filtramos por empresa o por puestos ofertados, previo paso a minusculas*/
const filteredAvisos = avisosCaceres.filter((avisos) =>
  avisos.centro.toLowerCase().includes(keyword)||
  avisos.n_incidencia.toLowerCase().includes(keyword)||
  avisos.estado.toLowerCase().includes(keyword)
);



const deleteaviso = (e, aviso) => {
  console.log(aviso);
  e.preventDefault();
  fetch(`${BASE_URL}/avisos/${aviso}`,{
   method: 'DELETE',
   headers: {
    //'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${userLogged.token}`
},
   }).then(res=>{
     if(res.status === 200){
      console.log('Borrado');
    Swal.fire("Eliminado", res.message,"success");
    fetch(`${BASE_URL}/avisos`)
    .then(response => response.json())
    .then(data => SetAvisos(data))
    
    //navigate("/avisos/caceres")
    
  }
  })
}


  return(
    <> 
       <div className='searchContainer'>
         <SearchInput placeholder="Filtrar " onChange={onInputChange} />
      </div>
            <Container>
              <Grid  container  spacing={5}>
              {filteredAvisos.map((aviso)=>(
                <Grid item key={aviso._id} xs={12} md={6} lg={4}>
                  <Card elevation={5}
                        sx={{ 
                          borderRadius: '8px',
                          justifyContent:'flex-start',
                          flex: '1 0 auto',                    
                          flexDirection: 'column' ,
                          flexWrap:'wrap',
                        }}
                        >
                    <CardHeader  
                        sx={{
                        color: 'error.main',
                        background: 'whitesmoke'
                        }}
                      action={
                        <>  {userLogged.rol ==='Tecnico'?''
                              :(<IconButton  color="error" onClick={(e)=> deleteaviso(e,aviso._id)} >
                              <DeleteOutlined/>
                            </IconButton>)
                            }
                            
                            <Link to={`/edit/aviso/${aviso._id}`}>
                                  <IconButton  
                                    aria-label="delete" 
                                    color="secondary" 
                                    ><Create />
                                  </IconButton>
                            </Link>
                              <Link to={`/avisos/details/${aviso._id}`}>
                                  <IconButton  
                                    aria-label="delete" 
                                    color="success" 
                                    ><AddIcon />
                                  </IconButton>
                            </Link>
                            
                        </>
                      }
                      title ={aviso.n_incidencia} 
                      
                      />
                    <CardContent
                        sx={{ flex: '1 0 auto' }}
                        >
                          {/* <Typography variant='body1' color='error'>
                            {aviso.n_incidencia}
                          </Typography> */}
                          <Typography variant='h4' component={'div'}>
                            {aviso.centro}
                          </Typography>
                          <Typography sx={{ fontSize: 26 }} color="text.secondary" >
                            {aviso.localidad}
                          </Typography>
                          <Typography variant='h6'>
                            {aviso.estado} <span className='user_asigned'> {aviso.user_assigned?.name }</span> 
                          </Typography>
                          <Typography variant='h6'>
                          </Typography>
                          <Typography variant='body1' color="text.secondary" >
                            {aviso.averia}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{
                          justifyContent:'center'
                        }}>
                            {
                              aviso.estado === 'Asignado'?(
                              <Button variant='contained' color="error" size="small">
                                <Link to={`/avisos/reasignar/${aviso._id}/${aviso.user_assigned?._id }`}>Reasignar</Link>
                            </Button>
                            ):
                            <Button variant='contained' size="small">
                                <Link to={`/avisos/asignar/${aviso._id}/${aviso.n_incidencia}`}>Asignar</Link>
                            </Button>
                                }
                            <Button variant='contained' color="warning" size="small">
                                <Link to={`/avisos/intervencion/${aviso._id}`}>Añadir Int.</Link>
                            </Button>
                            <Button variant='contained'  color="success" size="small">
                                <Link to={`/mostrar/intervencion/${aviso._id}`}>Mostrar Int.</Link>
                            </Button>
                        </CardActions>
                  </Card>
                </Grid>
                ))}
                <Stack 
                        sx={{
                            marginY: 5
                        }}
                        spacing={2}
                        direction={'row'}
                        justifyContent='center'
                        alignItems='center'
                    >
                        {/* <Pagination 
                            count={totalPaginas} 
                            color="primary" 
                            onChange={handleChangePagina}
                            page={pagina}
                        /> */}
                </Stack>
              </Grid>
            </Container>
                {userLogged.id ?
          <div className="nuevo-gasto">
            <Link to={'/anadir/avisos'}>
              <figure>
                  <img 
                              src={IconoNuevoGasto}
                              alt="icono nuevo aviso"
                              //onClick={handleNuevoGasto}
                              
                          />
                          <figcaption>Añadir Aviso</figcaption>
              </figure>
            </Link>
                
          </div>

        :''}
           
    </>
  )
  // return (
  //   <>
      
  //     <section className='searchContainer'>
  //        <SearchInput placeholder="Filtrar por trabajo o empresa" onChange={onInputChange} />
  //     </section>
     
      
       
  //           {isLoaded === false ? (
  //                   <Loader />
  //                 ) : (
  //             <>
  //             <div className="avisosList">
  //             {filteredAvisos.map((aviso, key)=>(

  //               <div key={ key } aviso={aviso}>
  //                  <div className="avisosList__div">
  //                     <div className='avisosList__info'>
                        
  //                         <div className='avisosList__text' >
  //                           <h1 className='avisosList__h1'> {aviso.n_incidencia} </h1>
  //                           <h2 className='avisosList__h2'> {aviso.centro}</h2>
  //                           <h2 className='avisosList__h2'> {aviso.localidad}</h2>
  //                           <h3 className='avisosList__h3'>Descripción de avería: {aviso.averia}</h3>
  //                           {aviso.estado === 'Pendiente'?
  //                               <h3 className='pendiente'> {aviso.estado}</h3>
  //                               :<h3 className='noCerrada'> {aviso.estado}</h3>
  //                               }
  //                         </div>
  //                         <div className="avisosList__buttons2">
  //                           <IconButton onClick={(e)=> deleteaviso(e,aviso._id)}
  //                                aria-label="delete" 
  //                                size="large" 
  //                                color="error"
  //                                ><DeleteIcon fontSize="inherit" />
  //                           </IconButton>
  //                           <Link to={`/avisos/details/${aviso._id}`}>
  //                             <IconButton  
  //                                aria-label="delete" 
  //                                color="success" 
  //                                ><AddIcon />
  //                             </IconButton>
  //                           </Link>
  //                           <Link to={`/edit/aviso/${aviso._id}`}>
  //                             <IconButton  
  //                                aria-label="delete" 
  //                                color="secondary" 
  //                                ><Create />
  //                             </IconButton>
  //                           </Link>
  //                           <ButtonGroup color="primary" aria-label="medium secondary button group">
  //                             {aviso.estado === 'Asignado'?
  //                             <Button onClick={(e)=> deleteassign(aviso._id,aviso.n_incidencia)}>Desasignar
                               
  //                               </Button>
  //                               :
  //                               <Button>
  //                               <Link to={`/avisos/asignar/${aviso._id}/${aviso.n_incidencia}`}>Asignar Aviso</Link>
  //                               </Button>
  //                              }
  //                              {aviso.estado === 'Asignado'?
  //                              <Button>
  //                               <Link to={`/avisos/intervencion/${aviso._id}`}>Intervención</Link>
  //                               </Button>
  //                               :'' }
                                
  //                           </ButtonGroup>
  //                         </div>
  //                     </div>
  //                  </div>
  //               </div>
  //               ))}
  //               </div>
  //               </>
  //                   )}
        
      
      
  //     </>
  // )
}

export default AvisosCaceres