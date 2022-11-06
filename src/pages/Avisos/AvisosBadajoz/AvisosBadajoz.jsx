import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../assets/ApiRoutes";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Loader from "../../../core/components/Loader/Loader";
//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
// import TotalCaceres from "./components/TotalCaceres";
// import AbiertosBadajoz from "./components/AbiertosCaceres";
// import PendientesCaceres from "./components/PendientesCaceres";
import { Typography } from "@mui/material";
// import CerradosCaceres from "./components/CerradosCaceres";
import TotalBadajoz from "./components/TotalBadajoz";
import AbiertosBadajoz from "./components/AbiertosBadajoz";
import PendientesBadajoz from "./components/PendientesBadajoz";
import CerradosBadajoz from "./components/CerradosBadajoz";

const AvisosBadajoz = () => {
  let [avisos, SetAvisos] = useState([]);
  let [users, SetUsers] = useState([]);
  const [value, setValue] = React.useState(0);

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
  const avisosBadajoz = avisos.filter((avisos) => avisos.provincia ==='Badajoz');
  console.log(avisosBadajoz,'Badajoz')
  
  const avisosAbiertos = avisosBadajoz.filter(
    (avisos) => (avisos.estado === "Abierta" || avisos.estado === "Asignado")  
                
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const avisosPendientes = avisosBadajoz.filter(
    (avisos) => avisos.estado === "Pendiente"
  );
  const avisosCerrados = avisosBadajoz.filter(
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
            <TotalBadajoz avisos={avisosBadajoz} />
          </Box>
        )}
        {value === 1 && (
          <Box>
            <AbiertosBadajoz avisos={avisosAbiertos} users={users} />
          </Box>
        )}
        {value === 2 && (
          <Box>
            <PendientesBadajoz avisos={avisosPendientes} users={users} />
          </Box>
        )}
        {value === 3 && (
          <Box>
            <CerradosBadajoz avisos={avisosCerrados}/>
          </Box>
        )}
      </Box>
    </>
  );
};

export default AvisosBadajoz;
