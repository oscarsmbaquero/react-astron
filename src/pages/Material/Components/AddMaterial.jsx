import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../assets/ApiRoutes";
import { useForm } from "react-hook-form";

import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import Swal from "sweetalert2"; // hay que probarlo

const AddMaterial = ({ usersFiltered }) => {

  const {register, handleSubmit, formState: { errors, isValid }, } = useForm({ mode: "onChange" });
  let navigate = useNavigate();

  const onSubmit = async (formData) => {
    console.log(formData, 15);
    try {
      const result = await fetch(`${BASE_URL}/material`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const resData = await result.json();
      Swal.fire({
        title: "Success!",
        text: "Material Añadido Correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/avisos/caceres");
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="sectionEdit">
      <div className="edit">
      <h3>Alta de Material</h3>
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
          <select {...register("estado")} className="edit__select">
            <option value="Operativo">Operativo</option>
            <option value="Averiado">Averiado</option>
          </select>
          <label className="edit__label">Almacén</label>

          <select {...register("almacen")} className="edit__select">
            {/* <option>Selecciona un usuario</option> */}
            <option key={"default"} selected value={"default"}>
              Selecciona un usuario
            </option>
            {usersFiltered.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name} {option.surname}
              </option>
            ))}
          </select>
          <label className="edit__label">Típo Artículo</label>
          <select {...register("tipo")} className="edit__select">
            <option value="Consumible">Consumible</option>
            <option value="Raparable">Reparable</option>
          </select>
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
