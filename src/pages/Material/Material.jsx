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
let reducetotal = materialById.reduce((acumulador, actual) => acumulador + actual.unidades, 0);

console.log(reducetotal,'reduce');


const estadoOperativo = materialById.filter((user) => user.estado === "Operativo");
const materialOperativo = estadoOperativo.length;
console.log(materialOperativo,'materialOperativo')

const estadoAveriado = materialById.filter((user) => user.estado === "Averiado");
const materialAveriado= estadoAveriado.length;
console.log(materialAveriado,'materialAveriado')

const porcentajeAveriado = (reducetotal + materialAveriado) /2;
const porcentajeOperativo = (reducetotal + materialOperativo) /2;
console.log(porcentajeAveriado,'porcentajeAveriado');
console.log(porcentajeOperativo,'porcentajeOperativo');


  const [tabs, dispatch] = useReducer(tabsReducer, tabsInitState);

  const AddTab = () => dispatch({ type: "ADD", payload: tabsInitState });
  const ListTab = () => dispatch({ type: "LIST" });
  const TecnicoTab = () => dispatch({ type: "TECNICO" });

  const navigate = useNavigate();

  //console.log(loggedUser, 76);
  const percentage = 66;
  const porcentage = 88;
  //console.log(usersFiltered,'userFiltered');

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
        <div>
          <h1>Material </h1>
          <h3>Averiado:&nbsp;{materialAveriado}</h3>
          <h3>Operativo:&nbsp;{materialOperativo}</h3>
        </div>
        <div style={{ width: "15%" }}>
        <h1>Material Averiado</h1>
        <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentajeAveriado > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentajeAveriado > 100 ? '#DC2626' : '#3B82F6',
                    })}
                    value={porcentajeAveriado}
                    text={`${porcentajeAveriado} % `}
                />
        </div>
        <div style={{ width: "15%" }}>
        <h1>Material Operativo</h1>
        <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentajeOperativo > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentajeOperativo > 100 ? '#DC2626' : '#3B82F6',
                    })}
                    value={porcentajeOperativo}
                    text={`${porcentajeOperativo} % `}
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
