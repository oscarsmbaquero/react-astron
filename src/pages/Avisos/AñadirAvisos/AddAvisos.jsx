import React from 'react';
import { useForm } from 'react-hook-form'
import {  useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../assets/ApiRoutes";
import './AddAvisos.scss';
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
  
    <form onSubmit={handleSubmit(onSubmit)} className="form">
     <Container >
            <Grid xs={12} md={6} lg={4}>
                <FormControl>
                    <InputLabel htmlFor="n_incidecia">Nº Incidencia </InputLabel>
                        <Input id="incidencia"                         
                        type="text" 
                        aria-describedby='incidencia-helper'
                        {...register('n_incidencia')} 
                        />
                        {/* <FormHelperText id="incidencia-helper">Incidencia</FormHelperText> */}
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="centro">Centro</InputLabel>
                        <Input id="centro"                          
                        type="text" 
                        aria-describedby='centro-helper'
                        {...register('centro')}
                        />
                        {/* <FormHelperText id="centro-helper">Centro</FormHelperText> */}
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="localidad">Localidad</InputLabel>
                        <Input id="localidad" 
                        type="text" 
                        aria-describedby='localidad-helper'
                        {...register('localidad')}   
                        />
                        {/* <FormHelperText id="localidad-helper">Localidad</FormHelperText> */}
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="`provincia">Provincia</InputLabel>
                        <Input id="provincia" 
                        type="text" 
                        aria-describedby='provincia-helper'
                        {...register('provincia')}   
                        />
                        {/* <FormHelperText id="provincia-helper">Provincia</FormHelperText> */}
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="averia">Averia</InputLabel>
                        <Input id="averia" 
                        type="text" 
                        aria-describedby='averia-helper'
                        {...register('averia')}   
                        />
                        {/* <FormHelperText id="incidencia-helper">Avería</FormHelperText> */}
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="prioridad">Prioridad</InputLabel>
                        <Input id="prioridad" 
                        type="text" 
                        aria-describedby='prioridad-helper'
                        {...register('prioridad')}   
                        />
                        {/* <FormHelperText id="incidencia-helper">Prioridad</FormHelperText> */}
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="estado">Estado</InputLabel>
                        <Input id="estado" 
                        type="text" 
                        aria-describedby='estado-helper'
                        {...register('estado')}   
                        />
                        {/* <FormHelperText id="estado-helper">Estado</FormHelperText> */}
                </FormControl>
                <br/>
                <br/>
                <br/>
                
                {/* <button className="buttonForm" disabled={!isValid}>Send</button> */}
                <Button variant="contained" type='submit' disabled={!isValid} endIcon={<SendIcon />}>
                Enviar
                </Button>
            </Grid>
    </Container>
        {/* <label>
            <p>Nº Incidencia</p>
            <input className="input" type="text" name="n_incidencia" placeholder="Nº Incidencia" {...register('n_incidencia', {
                required: 'Name is required',
               
            })}/>
            {errors.n_incidencia && errors.n_incidencia.type === 'required' && <p>{errors.n_incidencia.message}</p>}
        </label>
        <label>
            <p>Centro</p>
            <input className="input" type="text" name="centro" placeholder="Centro"  {...register('centro')}/>
        </label>
        <label>
            <p>Localidad</p>
            <input className="input" type="text" name="localidad" placeholder="Localidad"  {...register('localidad')}/>
        </label>
        <label>
            <p>Provincia</p>
            <input className="input" type="text" name="provincia" placeholder="Provincia"  {...register('provincia')}/>
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
        <br></br> */}
        
        
    </form>
    
  )
  
}

export default AddAvisos