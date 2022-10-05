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
import { Button } from "@material-ui/core";

import Fingerprint from '@mui/icons-material/Fingerprint';
import { BsFillBrushFill } from "react-icons/bs";
import { BsFillSignpost2Fill } from "react-icons/bs";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"


const Material = () => {
  const loggedUser = useGetAuth();
  const [material, setMaterial] = useState({});
  const [users, setUsers] = useState([]);
  const [materialById, setMaterialById] = useState([]);
  const [value, setValue] = React.useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
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
  //console.log(usersFiltered,'userFiltered')

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
  }, [loggedUser.token]);

console.log(materialById,'materialById');

//let total = JSON.parse(materialById);
//console.log(total);

//sacamos el nuero total de articulos por inventario
let reducetotal = materialById.reduce((acumulador, actual) => acumulador + actual.unidades, 0);
//sacamos total de articulos Operativos
const estadoOperativo = materialById.filter((user) => user.estado === "Operativo");
const totalOperativo = estadoOperativo.reduce((acumulador, operativo) => acumulador + operativo.unidades,0);
//sacamos total de articulos Averiado
const estadoAveriado = materialById.filter((user) => user.estado === "Averiado");
const totalAveriado = estadoAveriado.reduce((acumulador, operativo) => acumulador + operativo.unidades,0);
//sacamos los porcentajes y les quitamos decimales
const porcentajeAveriado = (totalAveriado * 100) /reducetotal;
const porcentajeOperativo = (totalOperativo *100) /reducetotal;
const resultadoAveriado= porcentajeAveriado.toFixed(2);
const resultadoOperativo= porcentajeOperativo.toFixed(2);

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
        <div className="profile__personal">
          <h1>{loggedUser.name}</h1>
          <h3>{loggedUser.email}</h3>
        </div>
        {/* <div>
          <h1>Material </h1>
          <h3>Averiado:&nbsp;{materialAveriado}</h3>
          <h3>Operativo:&nbsp;{materialOperativo}</h3>
        </div> */}
        <div style={{ width: "15%" }}>
        <h1>Material Averiado</h1>
        <CircularProgressbar
                    styles={buildStyles({
                        pathColor: resultadoAveriado > 90 ? '#DC2626' :resultadoAveriado < 90 && resultadoAveriado > 50 ? '#d8f007': '#35de0b',
                        trailColor: '#F5F5F5',
                        textColor: resultadoAveriado > 90 ? '#DC2626' :resultadoAveriado < 90 && resultadoAveriado > 50 ? '#d8f007': '#35de0b',
                    })}
                    value={resultadoAveriado}
                    text={`${resultadoAveriado} % `}
                />
        </div>
        <div style={{ width: "15%" }}>
        <h1>Material Operativo</h1>
        <CircularProgressbar
                    styles={buildStyles({
                        pathColor: resultadoOperativo > 60 ? '#DC2626' :resultadoAveriado < 60 && resultadoAveriado > 40 ? '#d8f007': '#35DE0B',
                        trailColor: '#F5F5F5',
                        textColor: resultadoOperativo > 60 ? '#DC2626' :resultadoAveriado < 60 && resultadoAveriado > 40 ? '#d8f007': '#35DE0B',
                    })}
                    value={resultadoOperativo}
                    text={`${resultadoOperativo} % `}
                />
        </div>
      </div>
      <div>
        <div>
          <ul className="ul">
            <Button variant="contained" onClick={AddTab}  >
              Añadir Material 
              <BsFillBrushFill />
            </Button>
            <Button variant="contained"  onClick={ListTab}>
              Total Msterial
              <BsFillSignpost2Fill/>
            </Button>
            <Button variant="contained"  onClick={TecnicoTab}>
               Material {loggedUser.name}
               <Fingerprint />
            </Button>
          </ul>
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
