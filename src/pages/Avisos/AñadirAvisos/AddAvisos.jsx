import React from 'react';
import { useForm } from 'react-hook-form'
import {  useNavigate } from "react-router-dom";
import './AddAvisos.scss';
import Swal from 'sweetalert2'// hay que probarlo

//import { Container, FormControl, InputLabel, Input, FormHelperText} from '@mui/material/FormControl';



const AddAvisos = () => {

    const {register, handleSubmit, formState: {errors, isValid}} = useForm({mode: "onChange"});
    let navigate = useNavigate();
    const onSubmit = async (formData) => {
        console.log(formData,15);
        try {

            const result = await fetch("http://localhost:5000/avisos" ,{
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
            navigate("/");
            console.log(resData);
            
            
            
        } catch (error) {
           console.log(error); 
        }
        
    }
  return (
    
    <form onSubmit={handleSubmit(onSubmit)} className="form">
     <div >
        <label>
            <p>Nº Incidencia</p>
            <input className="input" type="text" name="n_incidencia" placeholder="Nº Incidencia" {...register('n_incidencia', {
                required: 'Name is required',
               
            })}/>
            {errors.n_incidencia && errors.n_incidencia.type === 'required' && <p>{errors.n_incidencia.message}</p>}
        </label>
        <label>
            <p>Localidad</p>
            <input className="input" type="text" name="localidad" placeholder="Localidad"  {...register('localidad')}/>
        </label>
        <label>
            <p>Centro</p>
            <input className="input" type="text" name="centro" placeholder="Centro"  {...register('centro')}/>
        </label>
        <label>
            <p>Averia</p>
            <input className="input" type="text" name="averia" placeholder="Descripciòn averia"  {...register('averia')}/>
        </label>
        <label>
            <p>Prioridad</p>
            <input className="input" type="text" name="prioridad" placeholder="Prioridad"  {...register('prioridad')}/>
        </label>
        <label>
            <p>Estado</p>
            <input className="input" type="text" name="estado" placeholder="Estado"  {...register('estado')}/>
        </label>
        <br></br>
        
        <button className="buttonForm"disabled={!isValid}>Send</button>
        </div>
    </form>
    
  )
  
}

export default AddAvisos