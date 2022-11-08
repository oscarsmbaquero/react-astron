import React, { useEffect, useReducer, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../assets/ApiRoutes";
import { useGetAuth } from "../../context";

import "./Material.scss";

import AddMaterial from "./Components/AddMaterial";
import ListMaterial from "./Components/ListMaterial";
import ListMaterialById from "./Components/ListMaterialById";

import { tabsInitState, tabsReducer } from "../../utils/MaterialReducer";
import { Avatar } from "@mui/material";
import { Box, Button } from "@material-ui/core";

import Fingerprint from "@mui/icons-material/Fingerprint";
import { BsFillBrushFill } from "react-icons/bs";
import { BsFillSignpost2Fill } from "react-icons/bs";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Material = () => {
  const loggedUser = useGetAuth();
  const [material, setMaterial] = useState({});
  const [users, setUsers] = useState([]);
  const [materialById, setMaterialById] = useState([]);
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
  }, [loggedUser.token]);

  //console.log(loggedUser.id,44);

  useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);
  //console.log(users, "users");

  const usersFiltered = users.filter(
    (user) => user.account_type === "Tecnico" || user.account_type === "Admin"
  );
  console.log(loggedUser.id, "loggedUser");

  useEffect(() => {
    fetch(`${BASE_URL}/material/${loggedUser.id}`, {
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
  }, [material]);

  console.log(materialById, "materialById");

  //let total = JSON.parse(materialById);
  //console.log(total);

  //sacamos el nuero total de articulos por inventario
  let reducetotal = materialById.reduce(
    (acumulador, actual) => acumulador + actual.unidades,
    0
  );
  //sacamos total de articulos Operativos
  const estadoOperativo = materialById.filter(
    (user) => user.estado === "Operativo"
  );
  const totalOperativo = estadoOperativo.reduce(
    (acumulador, operativo) => acumulador + operativo.unidades,
    0
  );
  //sacamos total de articulos Averiado
  const estadoAveriado = materialById.filter(
    (user) => user.estado === "Averiado"
  );
  const totalAveriado = estadoAveriado.reduce(
    (acumulador, operativo) => acumulador + operativo.unidades,
    0
  );
  //sacamos los porcentajes y les quitamos decimales
  const porcentajeAveriado = (totalAveriado * 100) / reducetotal;
  const porcentajeOperativo = (totalOperativo * 100) / reducetotal;
  const resultadoAveriado = porcentajeAveriado.toFixed(1);
  const resultadoOperativo = porcentajeOperativo.toFixed(1);
  //calculamos consumible  de material Averiado
  const averiadoConsumible = materialById.filter(
    (user) => user.tipo === "Consumible" && user.estado === "Averiado"
  );
  const totalAveriadoConsumible = averiadoConsumible.reduce(
    (acumulador, operativo) => acumulador + operativo.unidades,
    0
  );
  //calculamos reparable de material Operativo
  const averiadoReparable = materialById.filter(
    (user) => user.tipo === "Reparable" && user.estado === "Averiado"
  );
  const totalAveriadoReparable = averiadoReparable.reduce(
    (acumulador, operativo) => acumulador + operativo.unidades,
    0
  );
  //calculo consumible material Operativo
  const operativoConsumible = materialById.filter(
    (user) => user.tipo === "Consumible" && user.estado === "Operativo"
  );
  const totalOperativoConsumible = operativoConsumible.reduce(
    (acumulador, operativo) => acumulador + operativo.unidades,
    0
  );
  //calculo reparable material Operativo
  const operativoReparable = materialById.filter(
    (user) => user.tipo === "Reparable" && user.estado === "Operativo"
  );
  const totalOperativoReparable = operativoReparable.reduce(
    (acumulador, operativo) => acumulador + operativo.unidades,
    0
  );

  //calculamos consumible  de material Operativo
  // const operativoConsumible = materialById.filter((user) => user.tipo === "Consumible");
  // const resultadoOperativoConsumible = operativoConsumible.length;
  // //calculamos reparable de material Operativo
  // const operativoReparable = materialById.filter((user) => user.tipo === "Consumible");
  // const resultadoOperativoConsumible = operativoConsumible.length;
  // //calculamos reparable de material Operativo

  const [tabs, dispatch] = useReducer(tabsReducer, tabsInitState);

  const AddTab = () => dispatch({ type: "ADD", payload: tabsInitState });
  const ListTab = () => dispatch({ type: "LIST" });
  const TecnicoTab = () => dispatch({ type: "TECNICO" });

  const navigate = useNavigate();

  return (
    <section>
      <div className="profile">
        {/* <div className="profile__photo">
          <Avatar
            alt="Remy Sharp"
            src={loggedUser.image}
            className="profile__photo__img"
          />
        </div> */}
        {/* <div className="profile__personal">
          <h1>{loggedUser.name}</h1>
          <h3>{loggedUser.email}</h3>
        </div> */}

        <div className="pizarra">
          {/* <Avatar
            alt="Remy Sharp"
            src={loggedUser.image}
            className="profile__photo__img"
          /> */}
          <h1 class="pizarra__h1">Averiado</h1>
          <p class="pizarra__p">Consumible:&nbsp;{totalAveriadoConsumible}</p>
          <p class="pizarra__p">Reparable:&nbsp;{totalAveriadoReparable}</p>
          <h1 class="pizarra__h1">Operativo</h1>
          <p class="pizarra__p">Consumible:&nbsp;{totalOperativoConsumible}</p>
          <p class="pizarra__p">Reparable:&nbsp;{totalOperativoReparable}</p>
        </div>
        <div className="graficas_container">
          <div className="graficas">
            <h1>Averiado</h1>
            <h2>{totalAveriado}&nbsp;ud.</h2>
            <CircularProgressbar
              styles={buildStyles({
                pathColor:
                  resultadoAveriado > 80
                    ? "#DC2626"
                    : resultadoAveriado < 80 && resultadoAveriado > 50
                    ? "#d8f007"
                    : "#35de0b",
                trailColor: "#F5F5F5",
                textColor: "black",
              })}
              value={resultadoAveriado}
              text={`${resultadoAveriado} % `}
            />
          </div>
          <div className="graficas">
            <h1>Operativo</h1>
            <h2>{totalOperativo}&nbsp;ud.</h2>
            <CircularProgressbar
              styles={buildStyles({
                pathColor:
                  resultadoOperativo > 60
                    ? "#DC2626"
                    : resultadoOperativo < 60 && resultadoOperativo > 40
                    ? "#d8f007"
                    : "#35DE0B",
                trailColor: "#F5F5F5",
                //textColor: resultadoOperativo > 60 ? '#DC2626' :resultadoOperativo < 60 && resultadoOperativo > 40 ? '#d8f007': '#35DE0B',
                textColor: "black",
              })}
              value={resultadoOperativo}
              text={`${resultadoOperativo} % `}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <Box sx={{ p: 2 }}>
            <Button
              variant="contained"
              style={{
                borderRadius: 50,
                backgroundColor: "black",
                color: "white",
                margin: "10px",
              }}
              onClick={AddTab}
            >
              Añadir Material
              <BsFillBrushFill />
            </Button>
            <Button
              variant="contained"
              style={{
                borderRadius: 50,
                backgroundColor: "black",
                color: "white",
                margin: "10px",
                // marginTop:'0px'
              }}
              onClick={ListTab}
            >
              Total Material
              <BsFillSignpost2Fill />
            </Button>
            <Button
              variant="contained"
              style={{
                borderRadius: 50,
                backgroundColor: "black",
                color: "white",
                margin: "10px",
              }}
              onClick={TecnicoTab}
            >
              Material {loggedUser.name}
              <Fingerprint />
            </Button>
          </Box>

          {tabs.addMaterial && (
            <>
              <AddMaterial usersFiltered={usersFiltered} />
            </>
          )}
          {tabs.listMaterial && (
            <>
              <ListMaterial material={material} />
            </>
          )}
          {tabs.tecnicoMaterial && (
            <>
              <ListMaterialById materialById={materialById} />
            </>
          )}
        </div>
      </div>
    </section>

    //esta section funciona, pestañas de material-ui //pueden valer 02-10-2022- Oscar

    // <>
    // {!loggedUser ? <p>Cargando...</p> :(
    // <Box sx={{ width: '100%', typography: 'body1' }}>
    //   <TabContext value={value}>
    //     <Box sx={{ borderColor: 'divider' , display:'flex', justifyContent:'center', backgroundColor:'grey', textTransform:'lowercase'}}>
    //       <TabList onChange={handleChange} aria-label="lab API tabs example">

    //         <Tab  label="Añadir Material" value="ADD" textColor="secondary" />
    //         <Tab label="Mostrar Material" value="LIST" />
    //         {loggedUser.rol ==='Admin' || loggedUser.rol ==='Tecnico' ?
    //         <Tab label="Material por técnico" value="TECNICO" />:''}

    //       </TabList>
    //     </Box>
    //     <TabPanel value="ADD"><AddMaterial usersFiltered={usersFiltered}/></TabPanel>
    //     <TabPanel value="LIST"><ListMaterial material={material}/></TabPanel>
    //     <TabPanel value="TECNICO"><ListMaterialById materialById={materialById}/></TabPanel>

    //   </TabContext>
    // </Box>
    // )
    // }
    // </>
  );
};

export default Material;
