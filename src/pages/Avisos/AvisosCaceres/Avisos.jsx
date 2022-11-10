import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../assets/ApiRoutes";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Loader from "../../../core/components/Loader/Loader";
//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import TotalCaceres from "./components/TotalCaceres";
import AbiertosCaceres from "./components/AbiertosCaceres";
import PendientesCaceres from "./components/PendientesCaceres";
import { Typography } from "@mui/material";
import CerradosCaceres from "./components/CerradosCaceres";
import { useGetAuth } from "../../../context/context";

const Avisos = () => {
  let [avisos, SetAvisos] = useState([]);
  let [users, SetUsers] = useState([]);
  const [value, setValue] = React.useState(0);
  const userLogged = useGetAuth();

  useEffect(() => {
    fetch(`${BASE_URL}/avisos`)
      .then((response) => response.json())
      .then((data) => SetAvisos(data));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then((response) => response.json())
      .then((data) => SetUsers(data));
  }, []);

  //filtros Avisos Caceres
  const avisosCaceres = avisos.filter((avisos) => avisos.provincia ==='Cáceres');
  console.log(avisosCaceres,'Caceres')
  
  const avisosAbiertos = avisosCaceres.filter(
    (avisos) => avisos.estado === "Abierto" || avisos.estado === "Asignado"
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const avisosPendientes = avisosCaceres.filter(
    (avisos) => avisos.estado === "Pendiente"
  );
  const avisosCerrados = avisosCaceres.filter(
    (avisos) => avisos.estado === "Cerrada"
  );
  //fin filtros Avisos Caceres
  

  return (
   <>
    
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab label="Total" />
          <Tab label="Abiertos" />
          <Tab label="Pendientes" />
          <Tab label="Cerrados" />
        </Tabs>
      </Box>
      <Box sx={{ padding: 6 }}>
        {value === 0 && (
          <Box>
            <TotalCaceres avisos={avisosCaceres} userLogged={userLogged} />
          </Box>
        )}
        {value === 1 && (
          <Box>
            <AbiertosCaceres avisos={avisosAbiertos} users={users} userLogged={userLogged}/>
          </Box>
        )}
        {value === 2 && (
          <Box>
            <PendientesCaceres avisos={avisosPendientes} users={users}/>
          </Box>
        )}
        {value === 3 && (
          <Box>
            <CerradosCaceres avisos={avisosCerrados}/>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Avisos;
