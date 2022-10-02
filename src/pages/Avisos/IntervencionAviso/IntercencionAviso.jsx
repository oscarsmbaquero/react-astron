import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../EditAviso/EditAviso.scss';
import { useForm } from 'react-hook-form'
import {  useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../assets/ApiRoutes";
import Loader from '../../../core/components/Loader/Loader';
import { Button  } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const IntercencionAviso = () => {

    let [aviso, SetAviso] =useState();
    const [users, setUsers] = useState([]);
    const { id } =useParams();

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
    

      console.log(users,'users')
    const onSubmit = async (formData) => {
        
        // const hora_fin = formData.fecha_fin;
        // const hora_inicio = formData.fecha_inicio;
        // console.log(hora_inicio,hora_fin,39);
        // const elemInicio = hora_inicio.toString().slice(11,16);
        // const elemFinal = hora_fin.toString().slice(11,16);
        // console.log(elemInicio,elemFinal,41);
        // const horas =elemFinal-elemInicio;
        // const prueba = parseInt(elemInicio,10)
        // const hora_ini = new Date();
        //  const hora =hora_ini.getHours()
        //  console.log(hora);
      

           
            try {
    
                const result = await fetch(`${BASE_URL}/avisos/${id}` ,{//modifico url 24/06/2022
                    method: "POST",
                    headers: {
                            'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(formData),
                })
                console.log(formData,33);
                const resData = await result.json();
                
                navigate("/avisos/caceres");
                console.log(resData);
                
                
                
            } catch (error) {
               console.log(error); 
            }

    }

  return (
    <section className="sectionEdit">
    { !aviso ? <Loader/> : 
    <div className="edit">
    <h3>Añadir Intervención</h3>
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
            <label className="edit__label" >Estado</label>
                <select className='edit__input'  {...setValue("estado", aviso.estado)} type="text" name="estado" placeholder="Estado"  {...register('estado')}>
                        <option value="Abierta">Abierta</option>
                        <option value="Asignada">Asignada</option>
                        {/* <option value="Pendiente">Pendiente</option> */}
                        <option value="Cerrada">Cerrada</option>
                </select>
            <label className="edit__label">Técnico</label>
                <select name="jobs"  className='edit__input' {...register('tecnicoIntervencion')}>                        
                        <option selected >Selecciona Técnico</option>
                        {users.map((user) => (
                        <option key={user._id} value={user.id}>{user.name} {user.surname}</option>
                    ))}
                </select>
                <label className="edit__label">Consumo Material</label>
                <select name="jobs"  className='edit__input' {...register('materialIntervencion')}>                        
                        <option selected >Consumir Material</option>
                        {users.map((user) => (
                        <option key={user._id} value={user.id}>{user.name} {user.surname}</option>
                    ))}
                </select>
                
            <label className="edit__label">Fecha Inicio</label>
                <input className='edit__input'  type="datetime-local" name="fecha_inicio" placeholder="Inicio"  {...register('fecha_inicio')}/>
            <label className="edit__label">Fecha Fin</label>
                <input className='edit__input'  type="datetime-local" name="fecha_fin" placeholder="Fin"  {...register('fecha_fin')}/>
            <label className="edit__label">km</label>
                <input className='edit__input' {...setValue("km", aviso.km)} type="number" name="km" placeholder="Km"  {...register('km')}/>
            <label className="edit__label">T. Desplazamiento</label>
                <input className='edit__input' {...setValue("viaje", aviso.viaje)} type="number" name="viaje" placeholder="tiempo desplazamiento"  {...register('viaje')}/>
            <label className="edit__label">Intervención</label >
                <textarea class="textarea"  type="text" name="intervencion" placeholder="Intervencion"  {...register('intervencion')}/>
            
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