
import React from "react";
import {  useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../assets/ApiRoutes";
import { useForm } from 'react-hook-form';

import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import Swal from 'sweetalert2'// hay que probarlo


const AddMaterial = () => {

  const {register, handleSubmit, formState: {errors, isValid}} = useForm({mode: "onChange"});
  let navigate = useNavigate();

  const onSubmit = async (formData) => {
    console.log(formData,15);
    try {

        const result = await fetch(`${BASE_URL}/material` ,{
            method: "POST",
            headers: {
                    'Content-Type': 'application/json'
           },
           body: JSON.stringify(formData),
        })
        const resData = await result.json();
        Swal.fire({
            title: 'Success!',
            text: 'Material Añadido Correctamente',
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
          <label className="edit__label">Descripción</label>
          <textarea
            className="edit__text-area"
            type="text"
            name="descripcion"
            placeholder="Descripciòn "
            {...register("descripcion")}
          />
          <label className="edit__label">Estado</label>
          <input
            className="edit__input"
            type="text"
            name="estado"
            placeholder="Estado"
            {...register("estado")}
          />
          <label className="edit__label">Almacén</label>
          <input
            className="edit__input"
            type="text"
            name="almacen"
            placeholder="Almacén"
            {...register("almacen")}
          />

          <label className="edit__label">Unidades</label>
          <input
            className="edit__input"
            type="number"
            name="unidades"
            placeholder="Unidades"
            {...register("unidades")}
          />
          <br></br>
          <Button variant="contained" type="submit" endIcon={<SendIcon />}>
            Enviar
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddMaterial;
