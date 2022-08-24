import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditAviso.scss';
import { useForm } from 'react-hook-form'
import {  useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../assets/ApiRoutes";
import Loader from '../../../core/components/Loader/Loader';
import { Container, FormControl, FormHelperText, Grid, Input, InputLabel } from '@mui/material';

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
    
                const result = await fetch(`http://localhost:5000/avisos/${id}` ,{//modifico url 24/06/2022
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
    <div>
        { !aviso ?<Loader/> : <>
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
                    <p>Provincia</p>
                    <input class="input" {...setValue("provincia", aviso.provincia)} type="text" name="provincia" placeholder="Provincia"   {...register('provincia')}/>
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
                    <input class="input" {...setValue("estado", aviso.estado)} type="text" name="estado" placeholder="Estado"  {...register('estado')}/>
                </label>
                <br></br>
                <button class="buttonForm"disabled={!isValid}>Send</button>
            </div>
        {/* <Container maxWidth="md">
            <Grid>
                <FormControl>
                    <InputLabel htmlFor="n_incidecia">{aviso.n_incidencia} </InputLabel>
                        <Input id="incidencia" 
                        {...setValue("estado", aviso.n_incidencia)}
                        type="text" 
                        aria-describedby='incidencia-helper'
                        {...register('n_incidencia')} 
                        />
                        <FormHelperText id="incidencia-helper">Introduce numero de incidencia</FormHelperText>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="centro">{aviso.centro}</InputLabel>
                        <Input id="centro" 
                         {...setValue("estado", aviso.centro)}
                        type="text" 
                        aria-describedby='centro-helper'
                        {...register('centro')}
                        />
                        <FormHelperText id="centro-helper">Nombre del centro</FormHelperText>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="localidad">{aviso.localidad}</InputLabel>
                        <Input id="centro" 
                        type="text" 
                        aria-describedby='centro-helper'
                        {...register('localidad')}   
                        />
                        <FormHelperText id="incidencia-helper">Localidad</FormHelperText>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="`provincia">{aviso.provincia}</InputLabel>
                        <Input id="provincia" 
                        type="text" 
                        aria-describedby='provincia-helper'
                        {...register('provincia')}   
                        />
                        <FormHelperText id="provincia-helper">Provincia</FormHelperText>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="averia">{aviso.averia}</InputLabel>
                        <Input id="averia" 
                        type="text" 
                        aria-describedby='averia-helper'
                        {...register('averia')}   
                        />
                        <FormHelperText id="incidencia-helper">Averia</FormHelperText>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="prioridad">{aviso.prioridad}</InputLabel>
                        <Input id="centro" 
                        type="text" 
                        aria-describedby='centro-helper'
                        {...register('localidad')}   
                        />
                        <FormHelperText id="incidencia-helper">Averia</FormHelperText>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="estado">{aviso.estado}</InputLabel>
                        <Input id="estado" 
                        type="text" 
                        aria-describedby='estado-helper'
                        {...register('estado')}   
                        />
                        <FormHelperText id="estado-helper">Estado</FormHelperText>
                </FormControl>
                <br/>
                <button class="buttonForm"disabled={!isValid}>Send</button>   
            </Grid>
        </Container> */}
        </form>
        </>} 
    </div>
  )
}

export default EditAviso