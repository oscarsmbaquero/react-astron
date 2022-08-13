import React from 'react';
import { useForm } from 'react-hook-form'
import {  useNavigate } from "react-router-dom";
import './AddAvisos.scss';
import Swal from 'sweetalert2'// hay que probarlo
import { Container, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';

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
        <Container> 
        <Grid spacing={0} align="center" justify="center">
        <TextField 
                    id="standard-basic" 
                    label="Centro"
                    {...register('centro')} 

                />
                <br/>
                <TextField id="filled-basic" 
                    label="Incidencia" 
                    variant="filled" 
                    {...register('n_incidencia')}
                />
                <br/>
                <TextField id="outlined-basic" 
                    label="Localidad" 
                    variant="outlined" 
                    {...register('localidad')}
                    
                />
                <br/>
                <TextField id="outlined-basic" 
                    label="Provincia" 
                    variant="outlined" 
                    {...register('provincia')}
                    
                />
                <br/>
                <TextField
          id="outlined-multiline-flexible"
          label="Averia"
          multiline
          maxRows={12}
          {...register('averia')}         
        />
                {/* <TextField id="outlined-basic" 
                    label="Averia" 
                    variant="outlined" 
                    {...register('averia')}
                    
                /> */}
                <br/>
                <TextField id="outlined-basic" 
                    label="Prioridad" 
                    variant="outlined" 
                    {...register('prioridad')}
                    
                />
                <br/>
                <TextField id="outlined-basic" 
                    label="Estado" 
                    variant="outlined" 
                    {...register('estado')}
                    
                />
                <br/>
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
        
        <button className="buttonForm"disabled={!isValid}>Send</button>
        </div>
    </form>
    
  )
  
}

export default AddAvisos