import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../EditAviso/EditAviso.scss';
import { useForm } from 'react-hook-form'
import {  useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../assets/ApiRoutes";
import Loader from '../../../core/components/Loader/Loader';
import { Button  } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useGetAuth } from "../../../context/context";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { BsChevronDoubleLeft } from 'react-icons/bs';

const IntercencionAviso = () => {
    const userLogged = useGetAuth();
    let [aviso, SetAviso] =useState();
    const [users, setUsers] = useState([]);
    const { id } =useParams();
    const [material, setMaterial] = useState([]);
    const [materialById, setMaterialById] = useState([]);
    const [visible,setVisible]=useState('Cerrada')
    const [fechaInicio,setFechaInicio]=useState()
    const [fechaFinal,setFechaFinal]=useState()
    const [tiempoViaje,setTiempoViaje]=useState()


    const { register, handleSubmit, formState: {errors, isValid}, setValue, } = useForm({mode: "onChange"});
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}/avisos/${id}`)
        .then(response => response.json())
        .then(data => SetAviso(data))
    
    }, [id])

    useEffect(() => {
        fetch(`${BASE_URL}/users`)
        .then(response => response.json())
        .then(data => setUsers(data))
      
        
      }, [])
    
      useEffect(() => {
        fetch(`${BASE_URL}/material`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${loggedUser.token}`
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setMaterial(data);
          });
      }, [userLogged.token]);
      console.log(material,'material')
      useEffect(() => {
        fetch(`${BASE_URL}/material/${userLogged.name}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            //Authorization: `Bearer ${loggedUser.token}`
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setMaterialById(data);
          });
      }, [userLogged.token]);

      //funcion que determina el estado de la intervencin, si esta Pendiente habilita el select de motivo de pendiente
      const captureType = (e) => {
        setVisible(e.target.value);
      }
      const fechaIni = (e) =>{
        setFechaInicio(e.target.value)
      }      
      const fechaFin = (e) =>{
        setFechaFinal(e.target.value)
      }
      const horasViaje = (e) =>{
        setTiempoViaje(e.target.value)
      }
    let fechaInicial = new Date(fechaInicio).getTime();
    let fechafinal = new Date(fechaFinal).getTime();
    const horasIntervencion = ((fechafinal-fechaInicial)/60/60/1000).toFixed(2);
    
    const intervencion = parseFloat(horasIntervencion);
    const desplazamiento = parseFloat(tiempoViaje);
    
    const totalHoras = (intervencion + desplazamiento);
    console.log(totalHoras,'total');
    
    
    

      const tecnicos = users.filter(
        (user) => user.account_type === "Tecnico" || user.account_type === 'Admin'
      );
      const materialOperativo = materialById.filter(
        (material) => material.estado === "Operativo" 
      );
      
     
      // const materialFiltrado = material.filter(
      //   (mater)=> mater.almacen === userLogged.id
      // );
      //console.log(materialFiltrado,'material por usuario')
    
    const onSubmit = async (formData) => {
      console.log(formData.estado,'materialIntervencion')
      

          formData = {...formData,totalHoras}
          console.log(formData,'formData')
            try {
    
                const result = await fetch(`${BASE_URL}/avisos/${id}` ,{//modifico url 24/06/2022
                    method: "POST",
                    headers: {
                            'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(formData),
                })
                console.log(formData.motivo,33);
                const resData = await result.json();
                
                navigate("/avisos/caceres");
                console.log(resData);                
            } catch (error) {
               console.log(error); 
            }

    }
    console.log()

  return (
    <section className="sectionEdit">
    { !aviso  || !material || !users? <Loader/> : 
    <div className="edit">
    <h3>Añadir Intervención</h3><h2>{aviso.n_incidencia}</h2>
        <form onSubmit={handleSubmit(onSubmit)} class="edit__form">
            <label className="edit__label">Nº Incidencia</label>
                <input className='edit__input' readOnly {...setValue("n_incidencia", aviso.n_incidencia)} type="text" name="name" placeholder="Nº Incidencia"  {...register('n_incidencia', )}/>
            <label className="edit__label">Centro</label>
                <input className='edit__input' readOnly {...setValue("centro", aviso.centro)} type="text" name="centro" placeholder="Centro"  {...register('centro')}/>
            <label className="edit__label">Localidad</label>
                <input className='edit__input' readOnly {...setValue("localidad", aviso.localidad)} type="text" name="localidad" placeholder="Localidad"   {...register('localidad')}/>                        
            <label className="edit__label">Provincia</label>
                <input className='edit__input' readOnly {...setValue("provincia", aviso.provincia)} type="text" name="localidad" placeholder="Provincia"   {...register('provincia')}/>                        
            <label className="edit__label">Averia</label>
                <textarea class="textarea" readOnly {...setValue("averia", aviso.averia)} type="text" name="averia" placeholder="Averia"  {...register('averia')}/>
            {/* <label className="edit__label">Centro</label>
                <input className='edit__input' {...setValue("prioridad", aviso.prioridad)} type="text" name="prioridad" placeholder="Prioridad"  {...register('prioridad')}/>             */}
            <label className="edit__label">Estado</label>
                <select className='edit__input'  type="text" name="estado" placeholder="Estado"  {...register('estado')} onChange={captureType}>
                        <option selected value ="">Selecciona estado</option>
                        {/* <option value ="Pendiente">Pendiente</option>  */}
                        <option value ="Cerrada">Cerrada</option>
                        <option value ="Pendiente">Pendiente</option>
                </select>
                { visible === 'Pendiente' ?
                <>
                  <label className="edit__label--motivo">Motivo de aviso pendiente</label>
                <input className='edit__input'   type="text" name="motivo" placeholder="Motivo"   {...register('motivo')}/>
                </>
                :'' }
                {userLogged.rol === 'Dispatch'?
                 <>
                 <label className="edit__label">Técnico</label>
                 <select name="jobs"  className='edit__input' {...register('tecnicoIntervencion')}>
                        <option selected>Selecciona Técnico</option>
                        {tecnicos.map((user) => (
                        <option key={user._id} value={user.id}>{user.name} {user.surname}</option>
                    ))}                   
                 </select> 
                 </>:
                 <>
                 <label className="edit__label">Técnico</label>
                <input className='edit__input' readOnly {...setValue("tecnicoIntervencion", userLogged.name)} type="text" name="tecnicoIntervencion" placeholder="Tecnico Intervencion"   {...register('tecnicoIntervencion')}/>
                 </>
                }
                 {userLogged.rol === 'Dispatch'?
                 <>
                 <label className="edit__label">Consumo Material</label>
                <select name="jobs"  className='edit__input' {...register('materialIntervencion')}>
                        {/* <option selected >Consumir Material</option> */}
                        <option selected value="Sin Material">Sin Material</option>
                        {material.map((el) => (
                        <option key={el._id} value={el.id}>{el.descripcion}&nbsp;&nbsp;{el.almacen}</option>
                    ))}
                </select>
                 </>:<>
                 <label className="edit__label">Consumo Material</label>
                <select name="jobs"  className='edit__input' {...register('materialIntervencion')}>
                        <option selected value="No hay consumo" class="bold-option">No hay consumo</option>
                        {materialOperativo.map((el) => (
                        <option key={el._id} value={el._id}>{el.descripcion}</option>
                    ))}
                </select>
                 </>}
                
                {/* </>
                 } */}
            <label className="edit__label">Fecha Inicio</label>
                <input className='edit__input'  type="datetime-local" name="fecha_inicio" placeholder="Inicio"  {...register('fecha_inicio')} onChange={fechaIni}/>
            <label className="edit__label">Fecha Fin</label>
                <input className='edit__input'  type="datetime-local" name="fecha_fin" placeholder="Fin"  {...register('fecha_fin')} onChange={fechaFin}/>
            <label className="edit__label">km</label>
                <input className='edit__input' type="number" name="km" placeholder="Km"  {...register('km')}/>
            <label className="edit__label">T. Desplazamiento</label>
                <input className='edit__input' type="number" name="viaje" placeholder="tiempo desplazamiento"  {...register('viaje')} onChange={horasViaje}/>
            <label className="edit__label">Intervención</label >
                <textarea class="textarea"  type="text" name="intervencion" placeholder="Intervencion"  {...register('intervencion')}/>
            {/* <label className="edit__label">Motivo Pendiente </label>
                <input className='edit__input' type="text" name="motivo" placeholder="Motivo Pendiente"   {...register('motivo')}/> */}
               
            <br></br>
            {aviso.estado === 'Cerrada'?
            <p>Averia Cerrada</p>
            :
            <Button variant="contained" type='submit' endIcon={<SendIcon />} >
                Enviar
            </Button>
            }
            
        
        </form>
    
    </div>
  } 
  </section>
  )
}

export default IntercencionAviso