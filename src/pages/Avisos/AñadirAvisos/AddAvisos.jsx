import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../assets/ApiRoutes";
import "./AddAvisos.scss";
import Swal from "sweetalert2"; // hay que probarlo
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

//import { Container, FormControl, InputLabel, Input, FormHelperText} from '@mui/material/FormControl';

const AddAvisos = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  let navigate = useNavigate();
  const onSubmit = async (formData) => {
    console.log(formData, 15);
    try {
      const result = await fetch(`${BASE_URL}/avisos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const resData = await result.json();
      Swal.fire({
        title: "Success!",
        text: "Aviso introducido Correctamente",
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
    <>
      <div className="container">
        <section className="sectionForm row">
          <div className="col-12 col-lg-12 my-auto">
          <h3>Añadir Aviso</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <img className="logoReservas1" src={logo} alt="logo"></img> */}
              <br />
              <div className="d-flex flex-column flex-md-row">
                <div className="d-flex flex-column col-11 col-md-3 ">
                  <label className="form__label">Incidencia * </label>
                  <input
                    className="form-control"
                    type="text"
                    name="n_incidencia"
                    placeholder="Nº Incidencia"
                    {...register("n_incidencia",{
                      required: "Campo Obligatorio",
                    })}
                  />
                   {errors.n_incidencia && errors.n_incidencia.type === "required" && (
                <p className="error">{errors.n_incidencia.message}</p>
              )}
                </div>
                <div className="d-flex flex-column col-11 col-md-9 mx-md-3 ">
                  <label className="form__label">Centro * </label>
                  <input
                    className="form-control"
                    type="text"
                    name="centro"
                    placeholder="Centro"
                    {...register("centro", {
                  required: "Campo Obligatotio",
                })}
              />
              {errors.centro && errors.centro.type === "required" && (
                <p className="error">{errors.centro.message}</p>
              )}
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row">
                <div className="d-flex flex-column col-11 col-md-6 ">
                  <label className="form__label">Localidad * </label>
                  <input
                    className="form-control"
                    type="text"
                    name="localidad"
                    placeholder="Localidad"
                    {...register("localidad", {
                  required: "Campo Obligatotio",
                })}
              />
              {errors.localidad && errors.localidad.type === "required" && (
                <p className="error">{errors.localidad.message}</p>
              )}
                </div>
                <div className="d-flex flex-column col-11 col-md-6 mx-md-3  ">
                  <label className="form__label">Provincia * </label>
                  <select {...register("provincia")} className="form-control">
                    <option value="Cáceres">Cáceres</option>
                    <option value="Badajoz">Badajoz</option>
                  </select>
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row">
                <div className="d-flex flex-column col-11 col-lg-12 col-md-6 mx-md-1 ">
                  <label className="form__label">Averia * </label>
                  <textarea
                    className="form-control"
                    type="text"
                    name="averia"
                    placeholder="Descripción averia"
                    {...register("averia", {
                  required: "Campo Obligatotio",
                })}
              />
              {errors.averia && errors.averia.type === "required" && (
                <p className="error">{errors.averia.message}</p>
              )}
                  
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row">
                <div className="d-flex flex-column col-11 col-md-6 ">
                  <label className="form__label">Prioridad * </label>
                  <select {...register("prioridad")} className="form-control">
                    <option value="Urgente">Urgente</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
                <div className="d-flex flex-column col-11 col-md-6 mx-md-3 ">
                  <label className="form__label">Estado * </label>
                  <select {...register("estado")} className="form-control" >
                    <option value="Abierto" selected>Abierto</option>
                    
                  </select>
                  
                </div>
              </div>

              <br />
              <Button
                variant="contained"
                //color="primary"
                type="submit"
                endIcon={<SendIcon />}
                style={{
                  borderRadius: 50,
                  backgroundColor: "black",
                  color: "white",
                  // marginTop:'0px'
                }}
              >
                Enviar
              </Button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddAvisos;
