// import React, { useState, useEffect } from 'react'
// import { Link, Navigate } from 'react-router-dom';
// import SearchInput from '../../../core/components/SearchInput/SearchInput';
// import Loader from "../../../core/components/Loader/Loader";
// import './AvisosCaceres.scss';
// import { BASE_URL } from "../../../assets/ApiRoutes";
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import { Create } from '@mui/icons-material';
// import Swal from 'sweetalert2'// hay que probarlo
// import {  useGetAuth } from "../../../context/context";
// // import SelectCompanies from '../../../core/components/SelectCompanies/SelectCompanies';
// // import SelectUser from '../../../core/components/SelectUsers/SelectUser';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import Button from '@mui/material/Button';
// // import {  SwipeableList,  SwipeableListItem} from "@sandstreamdev/react-swipeable-list";
// // import "@sandstreamdev/react-swipeable-list/dist/styles.css";


// const PendientesCaceres = () => {

//     const userLogged = useGetAuth();
//     let [avisos, SetAvisos] = useState([]); 
//     let [users, SetUsers] = useState([]); 
//     const [keyword, setKeyword] = useState('');
//     const [isLoaded, setIsLoaded] = useState(false);

//     setTimeout(() => {
//       setIsLoaded(true);
//     }, 1000);

//     useEffect(() => {
//         fetch(`${BASE_URL}/avisos`)
//           .then(response => response.json())
//           .then(data => SetAvisos(data))
//       }, []);
// console.log(avisos,33);
// const avisosCaceresPendientes = avisos.filter((aviso)=> aviso.provincia === 'Caceres' && aviso.estado === 'Pendiente');

// useEffect(() => {
//     fetch(`${BASE_URL}/users`)
//       .then(response => response.json())
//       .then(data => SetUsers(data))
//   }, []);
//   //console.log(users);
//   const onInputChange = (e) => {
//     setKeyword(e.target.value.toLowerCase());
//   };
   
//   const filteredAvisos = avisosCaceresPendientes.filter((avisos) =>
//   avisos.centro.toLowerCase().includes(keyword)||
//   avisos.n_incidencia.toLowerCase().includes(keyword)
// );

// const deleteaviso = (e, aviso) => {
  
//     e.preventDefault();
//     console.log('entro');
//     // const thisClicked = e.currentTarget;
//     // thisClicked.innerText ="Borrando"  ;
  
//     fetch(`${BASE_URL}/users/avisos/${aviso}`,{
//      method: 'DELETE',
//      headers: {
//       //'Content-Type': 'multipart/form-data',
//       Authorization: `Bearer ${userLogged.token}`
//   },
//      }).then(res=>{
//        if(res.status === 200){
//         console.log('Borrado');
//       Swal.fire("Eliminado", res.message,"success");
//       fetch(`${BASE_URL}/avisos`)
//       .then(response => response.json())
//       .then(data => SetAvisos(data))
      
//       Navigate("/avisos/caceres")
      
//     }
//     })
//   }
//   const deleteassign = (id,incidencias) =>{
//     //e.preventDefault();
//     console.log(id,incidencias,81);
//     fetch(`${BASE_URL}/users/deleteAssign`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userLogged.token}`
//       },
//       body: JSON.stringify({
//         userId: id,
//         avisoId:incidencias,
//         estado: 'Abierta'
//       })
  
//     }).then(res => {
//       if (res.status === 200) {
//         //getJobs()
//         Swal.fire("Candidatura retirada correctamente", res.message, "success");
//         //setApplyBtn(false);
//       }
  
//     }).catch((error) => {
//       // console.log("entró por el error");
//       console.error(error);
//     })
//   }  





//   return (
//     <>
      
//       <section className='searchContainer'>
//          <SearchInput placeholder="Filtrar por trabajo o empresa" onChange={onInputChange} />
//       </section>
      
       
//             {isLoaded === false ? (
//                     <Loader />
//                   ) : (
//               <>
//               <div className="avisosList">
//               {filteredAvisos.map((aviso, key)=>(

//                 <div key={ key } aviso={aviso}>
//                    <div className="avisosList__div">
//                       <div className='avisosList__info'>
                        
//                           <div className='avisosList__text' >
//                             <h1 className='avisosList__h1'> {aviso.n_incidencia} </h1>
//                             <h2 className='avisosList__h2'> {aviso.centro}</h2>
//                             <h2 className='avisosList__h2'> {aviso.localidad}</h2>
//                             <h3 className='avisosList__h3'>Descripción de avería: {aviso.averia}</h3>
//                             {aviso.estado === 'Pendiente'?
//                                 <h3 className='pendiente'> {aviso.estado}</h3>
//                                 :<h3 className='noCerrada'> {aviso.estado}</h3>
//                                 }
//                           </div>
//                           <div className="avisosList__buttons2">
//                             <IconButton onClick={(e)=> deleteaviso(e,aviso._id)}
//                                  aria-label="delete" 
//                                  size="large" 
//                                  color="error"
//                                  ><DeleteIcon fontSize="inherit" />
//                             </IconButton>
//                             <Link to={`/avisos/details/${aviso._id}`}>
//                               <IconButton  
//                                  aria-label="delete" 
//                                  color="success" 
//                                  ><AddIcon />
//                               </IconButton>
//                             </Link>
//                             <Link to={`/edit/aviso/${aviso._id}`}>
//                               <IconButton  
//                                  aria-label="delete" 
//                                  color="secondary" 
//                                  ><Create />
//                               </IconButton>
//                             </Link>
//                             <ButtonGroup color="primary" aria-label="medium secondary button group">
//                               {aviso.estado === 'Asignado'?
//                               <Button onClick={(e)=> deleteassign(aviso._id,aviso.n_incidencia)}>Desasignar
                               
//                                 </Button>
//                                 :
//                                 <Button>
//                                 <Link to={`/avisos/asignar/${aviso._id}/${aviso.n_incidencia}`}>Asignar Aviso</Link>
//                                 </Button>
//                                }
//                                {aviso.estado === 'Asignado'?
//                                <Button>
//                                 <Link to={`/avisos/intervencion/${aviso._id}`}>Intervención</Link>
//                                 </Button>
//                                 :'' }
                                
//                             </ButtonGroup>
//                           </div>
//                       </div>
//                    </div>
//                 </div>
//                 ))}
//                 </div>
//                 </>
//                     )}
        
      
      
//       </>
//   )
// }

// export default PendientesCaceres