import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../EditAviso/EditAviso.scss';
import { useForm } from 'react-hook-form'
import {  useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../assets/ApiRoutes";

const IntercencionAviso = () => {

    let [aviso, SetAviso] =useState();
    const { id } =useParams();

    const { register, handleSubmit, formState: {errors, isValid}, setValue, } = useForm({mode: "onChange"});
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}/avisos/${id}`)
        .then(response => response.json())
        .then(data => SetAviso(data))
    
    }, [id])
    
    const onSubmit = async (formData) => {
        console.log(formData,'datos');
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
    <div>
    { !aviso ? <p>Cargando...</p> : <>
    <form onSubmit={handleSubmit(onSubmit)} class="form">
     <div >
        <label>
            <p>N Incidencia</p>
            <input class="input" {...setValue("n_incidencia", aviso.n_incidencia)} type="text" name="name" placeholder="Nº Incidencia"  {...register('n_incidencia', {
               
                required: 'Name is required',
               
            })}/>
            {errors.n_incidencia && errors.n_incidencia.type === 'required' && <p>{errors.n_incidencia.message}</p>}
        </label>
        <label>
            <p>Localidad</p>
            <input class="input" {...setValue("localidad", aviso.localidad)} type="text" name="localidad" placeholder="Localidad"   {...register('localidad')}/>
        </label>
        <label>
            <p>Centro</p>
            <input class="input" {...setValue("centro", aviso.centro)} type="text" name="centro" placeholder="Centro"  {...register('centro')}/>
        </label>
        <label>
            <p>Averia</p>
            <input class="input" {...setValue("averia", aviso.averia)} type="text" name="averia" placeholder="Averia"  {...register('averia')}/>
        </label>
        <label>
            <p>Prioridad</p>
            <input class="input" {...setValue("prioridad", aviso.prioridad)} type="text" name="prioridad" placeholder="Prioridad"  {...register('prioridad')}/>
        </label>
        <label>
            <p>Estado</p>
        <select class="select" {...setValue("estado", aviso.estado)} type="text" name="estado" placeholder="Estado"  {...register('estado')}>
                <option value="Abierta">Abierta</option>
                <option value="Asignada">Asignada</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Cerrada">Cerrada</option>
        </select>
        </label>
        {/* <label>
            <p>Estado</p>
            <input class="input" {...setValue("estado", aviso.estado)} type="text" name="estado" placeholder="Estado"  {...register('estado')}/>
        </label> */}
        <label>
            <p>Inicio</p>
            <input class="input"  type="datetime-local" name="fecha_inicio" placeholder="Inicio"  {...register('fecha_inicio')}/>
        </label>
        <label>
            <p>Fin</p>
            <input class="input"  type="datetime-local" name="fecha_fin" placeholder="Fin"  {...register('fecha_fin')}/>
        </label>
        <label>
            <p>km</p>
            <input class="input" {...setValue("km", aviso.km)} type="number" name="km" placeholder="Km"  {...register('km')}/>
        </label>
        <label>
            <p>Descripción Intervención</p>
            <textarea class="textarea" {...setValue("intervencion", aviso.intervencion)} type="text" name="intervencion" placeholder="Intervencion"  {...register('intervencion')}/>
        </label>
        <br></br>
        {aviso.estado === 'Cerrada'?
        <p>Averia Cerrada</p>
        :<button class="buttonForm"disabled={!isValid}>Send</button>
        }
        
        </div>
    </form>
    </>} 
  </div>
  )
}

export default IntercencionAviso