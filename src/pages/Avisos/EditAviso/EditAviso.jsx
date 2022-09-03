import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditAviso.scss';
import { useForm } from 'react-hook-form'
import {  useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../assets/ApiRoutes";
import Loader from '../../../core/components/Loader/Loader';
import { Button  } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
//import { Container, FormControl, FormHelperText, Grid, Input, InputLabel } from '@mui/material';

const EditAviso = () => {

    let [aviso, SetAviso] =useState();
    const { id } =useParams();
    
    const { register, handleSubmit, formState: {errors, isValid}, setValue, } = useForm({mode: "onChange"});
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}/avisos/${id}`)
        .then(response => response.json())
        .then(data => SetAviso(data))
    
    }, [id])
    console.log(aviso);
    const onSubmit = async (formData) => {
        // console.log(formData,'datos');
            try {
    
                const result = await fetch(`${BASE_URL}/avisos/${id}` ,{//modifico url 24/06/2022
                    method: "PUT",
                    headers: {
                            'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(formData),
                })
                const resData = await result.json();
                navigate("/avisos/caceres");
                console.log(resData);
                
                
                
            } catch (error) {
               console.log(error); 
            }

    }





  return (
    <section className="sectionEdit">
        { !aviso ?<Loader/> :
        <div className="edit">
            <form onSubmit={handleSubmit(onSubmit)} className="edit__form">
               
                    <label className="edit__label">Incidencia</label>
                        <input className='edit__input' {...setValue("n_incidencia", aviso.n_incidencia)} type="text" name="name" placeholder="Nº Incidencia"  {...register('n_incidencia')}/>
                    
                    <label className="edit__label">Localidad</label>
                        <input className='edit__input' {...setValue("localidad", aviso.localidad)} type="text" name="localidad" placeholder="Localidad"   {...register('localidad')}/>
                    
                    <label className="edit__label">Provincia</label>
                        <input className='edit__input' {...setValue("provincia", aviso.provincia)} type="text" name="provincia" placeholder="Provincia"   {...register('provincia')}/>
                    
                    <label className="edit__label">Centro</label>
                        <input className='edit__input' {...setValue("centro", aviso.centro)} type="text" name="centro" placeholder="Centro"  {...register('centro')}/>
                    
                    <label className="edit__label">Averia</label>
                        <textarea className='edit__text-area' {...setValue("averia", aviso.averia)} type="text" name="averia" placeholder="Averia"  {...register('averia')}/>
                    
                    <label className="edit__label">Prioridad</label>
                    <select  {...setValue("prioridad", aviso.prioridad)} {...register("prioridad")} className='edit__input'>
                        <option value="Urgente">Urgente</option>
                        <option value="Normal">Normal</option>
                    </select>

                        {/* <input className='edit__input' {...setValue("prioridad", aviso.prioridad)} type="text" name="prioridad" placeholder="Prioridad"  {...register('prioridad')}/> */}
                    
                    <label className="edit__label">Estado</label>
                        <input className='edit__input' {...setValue("estado", aviso.estado)} type="text" name="estado" placeholder="Estado"  {...register('estado')}/>
                    <Button variant="contained" type='submit'  endIcon={<SendIcon />} >
                        Enviar
                    </Button>
                
            
            </form>
            </div>} 
        </section>
  )
}

export default EditAviso