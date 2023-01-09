import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Intervencion.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../assets/ApiRoutes";
import Loader from "../../../core/components/Loader/Loader";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useGetAuth } from "../../../context/context";
import Swal from "sweetalert2";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const IntercencionAviso = () => {
  const userLogged = useGetAuth();
  let [aviso, SetAviso] = useState();
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const [material, setMaterial] = useState([]);
  const [materialById, setMaterialById] = useState([]);
  const [visible, setVisible] = useState("Cerrada");
  const [fechaInicio, setFechaInicio] = useState();
  const [fechaFinal, setFechaFinal] = useState();
  const [tiempoViaje, setTiempoViaje] = useState();
  const [items, setItems] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({ mode: "onChange" });
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/avisos/${id}`)
      .then((response) => response.json())
      .then((data) => SetAviso(data));
  }, [id]);

  useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/items`)
      .then(response => response.json())
      .then(data => setItems(data))
  }, []);
  useEffect(() => {
    fetch(`${BASE_URL}/material`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${loggedUser.token}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMaterial(data);
      });
  }, [userLogged.token]);
    useEffect(() => {
    fetch(`${BASE_URL}/material/${userLogged.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${loggedUser.token}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMaterialById(data);
      });
  }, [userLogged.token]);

  //funcion que determina el estado de la intervencin, si esta Pendiente habilita el select de motivo de pendiente
  const captureType = (e) => {
    setVisible(e.target.value);
  };


  const fechaIni = (e) => {
    setFechaInicio(e.target.value);
  };
  const fechaFin = (e) => {
    setFechaFinal(e.target.value);
  };
  const horasViaje = (e) => {
    setTiempoViaje(e.target.value);
  };
  let fechaInicial = new Date(fechaInicio).getTime();
  let fechafinal = new Date(fechaFinal).getTime();
  const horasIntervencion = (
    (fechafinal - fechaInicial) /
    60 /
    60 /
    1000
  ).toFixed(2);

  const intervencion = parseFloat(horasIntervencion);
  const desplazamiento = parseFloat(tiempoViaje);

  const totalHoras = intervencion + desplazamiento;

  const tecnicos = users.filter(
    (user) => user.account_type === "Tecnico" || user.account_type === "Admin"
  );
  const materialOperativo = materialById.filter(
    (material) => material.estado === "Operativo"
  );

  const onSubmit = async (formData) => {

    formData = { ...formData, totalHoras };
    try {
      const result = await fetch(`${BASE_URL}/avisos/${id}`, {
        //modifico url 24/06/2022
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const resData = await result.json();

      Swal.fire({
        title: "Success!",
        text: "Intervención añadida",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/avisos/caceres");
    } catch (error) {
    }
  };

  return (
    <div>
      {!aviso || !material || !users ? (
        <Loader />
      ) : (
        <div className="container">
          <section >
            <div className="col-11 col-lg-11 mx-4 mt-5">
              <h3>Añadir Int:&nbsp;{aviso.n_incidencia}</h3>
              <form onSubmit={handleSubmit(onSubmit)} >              
                <div className="d-flex flex-column flex-md-row">
                  <div className="d-flex flex-column col-11 col-md-3  ">
                    <label className="form__label">Selecciona estado * </label>
                    <select
                      {...register("estado")}
                      className="form-control"
                      onChange={captureType}
                    >
                      <option value="Cerrada">Cerrada</option>
                      <option value="Pendiente">Pendiente</option>
                    </select>
                  </div>
                  <div className="d-flex flex-column col-11 col-md-5  mx-md-3">
                    {visible === "Pendiente" ? (
                      <>
                        <label className="form__label">
                          Motivo de aviso pendiente *
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="motivo"
                          placeholder="Motivo"
                          {...register("motivo", {
                            required: "Campo Obligatotio",
                          })}
                        />
                        {errors.motivo && errors.motivo.type === "required" && (
                          <p className="error">{errors.motivo.message}</p>
                        )}
                      </>
                    ) : (
                      ""
                    )}                    
                  </div>
                  <div className="d-flex flex-column col-11 col-md-3  ">
                    <label className="form__label">Selecciona item  </label>
                    <select
                          className="form-control"
                          {...register("item")}
                        >
                          {items.map((item) => (
                            <option key={item._id} value={item.id}>
                              {item.descripcion}
                            </option>
                          ))}
                        </select>
                  </div>
                </div>
                <div className="d-flex flex-column flex-md-row">
                  <div className="d-flex flex-column col-11 col-md-6 ">
                    {userLogged.rol === "Dispatch" ? (
                      <>
                        <label className="form__label">Técnico *</label>
                        <select
                          className="form-control"
                          {...register("tecnicoIntervencion")}
                        >
                          <option selected>Selecciona Técnico *</option>
                          {tecnicos.map((user) => (
                            <option key={user._id} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <>
                        {/* <label className="form__label">Técnico * </label> */}
                        <input
                          className="form-control"
                          hidden
                          {...setValue("tecnicoIntervencion", userLogged.id)}
                          type="text"
                          name="tecnicoIntervencion"
                          placeholder="Tecnico Intervencion"
                          {...register("tecnicoIntervencion")}
                        />
                      </>
                    )}
                  </div>
                  <div className="d-flex flex-column col-11 col-md-6 mx-md-3">
                    {userLogged.rol === "Dispatch" ? (
                      <>
                        <label className="form__label">
                          Consumo Material *
                        </label>
                        <select
                          name="jobs"
                          className="form-control"
                          {...register("materialIntervencion")}
                        >
                          <option selected value="Sin Material">
                            Sin Material
                          </option>
                          {material.map((el) => (
                            <option key={el._id} value={el.id}>
                              {el.descripcion}&nbsp;&nbsp;{el.almacen}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <>
                        <label className="form__label">
                          Consumo Material *
                        </label>
                        <select
                          name="jobs"
                          className="form-control"
                          {...register("materialIntervencion")}
                        >
                          <option
                            selected
                            value="638e32a42062209de55fd347"
                            class="bold-option"
                          >
                            No hay consumo
                          </option>
                          {materialOperativo.map((el) => (
                            <option key={el._id} value={el._id}>
                              {el.descripcion}
                            </option>
                            
                          ))}
                        </select>
                      </>
                    )}
                  </div>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-center">
                  <div className="d-flex flex-column col-11 col-md-2 ">
                    <label className="form__label">Fecha Inicio *</label>
                    <input
                      className="form-control"
                      type="datetime-local"
                      name="fecha_inicio"
                      placeholder="Inicio"
                      {...register("fecha_inicio")}
                      onChange={fechaIni}
                    />
                  </div>
                  <div className="d-flex flex-column col-11 col-md-2  mx-md-4">
                    <label className="form__label">Fecha Fin *</label>
                    <input
                      className="form-control"
                      type="datetime-local"
                      name="fecha_fin"
                      {...register("fecha_fin")}
                      onChange={fechaFin}
                    />
                  </div>
                  <div className="d-flex flex-column col-11 col-md-2 mx-md-3">
                    <label className="form__label"> Km * </label>
                    <input
                      className="form-control"
                      type="number"
                      name="km"
                      placeholder="Km"
                      {...register("km", {
                            required: "Campo Obligatotio",
                          })}
                        />
                        {errors.km && errors.km.type === "required" && (
                          <p className="error">{errors.km.message}</p>
                        )}
                  </div>
                  <div className="d-flex flex-column col-11 col-md-3 mx-md-2">
                    <label className="form__label"> Despl. * </label>
                    <input
                      className="form-control"
                      type="float"
                      name="viaje"
                      placeholder="Tiempo Despl."
                       {...register("viaje", {
                            required: "Campo Obligatotio",
                          })}
                          onChange={horasViaje}
                        />
                        {errors.viaje && errors.viaje.type === "required" && (
                          <p className="error">{errors.viaje.message}</p>
                        )}
                  </div>
                </div>
                <div className="d-flex flex-column flex-md-row ">
                  <div className="d-flex flex-column col-11 col-md-12 mx-md-auto">
                    <label className="form__label">Intervención *</label>
                    <textarea
                      rows={5}
                      class="form-control"
                      type="text"
                      name="intervencion"
                      placeholder="Intervencion"
                      {...register("intervencion")}
                    />
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
      )}
    </div>
  );
};

export default IntercencionAviso;
