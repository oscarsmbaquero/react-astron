import React from 'react';
import { useForm } from 'react-hook-form'
import {  useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../assets/ApiRoutes";
import './AddAvisos.scss';
import Loader from '../../../core/components/Loader/Loader';
import Swal from 'sweetalert2'// hay que probarlo
import { Button, Container, FormControl, FormHelperText, Grid, Input, InputLabel,  } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

//import { Container, FormControl, InputLabel, Input, FormHelperText} from '@mui/material/FormControl';



const AddAvisos = () => {

    const {register, handleSubmit, formState: {errors, isValid}} = useForm({mode: "onChange"});
    let navigate = useNavigate();
    const onSubmit = async (formData) => {
        console.log(formData,15);
        try {

            const result = await fetch(`${BASE_URL}/avisos` ,{
                method: "POST",
                headers: {
                        'Content-Type': 'application/json'
               },
               body: JSON.stringify(formData),
            })
            const resData = await result.json();
            Swal.fire({
                title: 'Success!',
                text: 'Aviso introducido Correctamente',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
            navigate("/avisos/caceres");
            console.log(resData);
            
            
            
        } catch (error) {
           console.log(error); 
        }
        
    }
  return (
    <section className="sectionEdit">
        <div className="edit">
            <form onSubmit={handleSubmit(onSubmit)} className="edit__form">
            
                <label className="edit__label">Incidencia</label>
                    <input className="edit__input" type="text" name="n_incidencia" placeholder="Nº Incidencia" {...register('n_incidencia')}/>
                <label className="edit__label">Centro</label>
                    <input className="edit__input" type="text" name="centro" placeholder="Centro"  {...register('centro')}/>
                <label className="edit__label">Localidad</label>
                    <input className="edit__input" type="text" name="localidad" placeholder="Localidad"  {...register('localidad')}/>
                <label className="edit__label">Provincia</label>
                    <select  {...register("provincia")} className='edit__select'>
                        <option value="Cáceres">Cáceres</option>
                        <option value="Badajoz">Badajoz</option>
                    </select>

                {/* <label className="edit__label">Provincia</label>
                    <input className="edit__input" type="text" name="provincia" placeholder="Provincia"  {...register('provincia')}/> */}
                <label className="edit__label">Averia</label>
                    <textarea className='edit__text-area' type="text" name="averia" placeholder="Descripciòn averia"  {...register('averia')}/>
                <label className="edit__label">Prioridad</label>
                    <select  {...register("prioridad")} className='edit__select'>
                        <option value="Urgente">Urgente</option>
                        <option value="Normal">Normal</option>
                    </select>
                <label className="edit__label">Estado</label>
                    <select  {...register("estado")}  className='edit__select'>
                        <option value="Abierta" selected>Abierto</option>
                        {/* <option value="Asignado">Asignado</option>
                        <option value="Cerrado">Cerrado</option> */}
                    </select>
                <br></br>
                <Button variant="contained" type='submit'  endIcon={<SendIcon />} >
                    Enviar
                </Button>
            </form>
        </div>
    </section>
  )
  
}

export default AddAvisos