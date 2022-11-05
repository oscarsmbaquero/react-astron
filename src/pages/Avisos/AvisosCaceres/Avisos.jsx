import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../assets/ApiRoutes";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import TotalCaceres from "./components/TotalCaceres";
import AbiertosCaceres from "./components/AbiertosCaceres";
import PendientesCaceres from "./components/PendientesCaceres";
import { Typography } from "@mui/material";

const Avisos = () => {
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
  // const onInputChange = (e) => {
  //   console.log("Entro");
  //   setKeyword(e.target.value.toLowerCase());
  // };
  const avisosAbiertos = avisos.filter(
    (avisos) => avisos.estado === "Abierta" || avisos.estado === 'Asignado'
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const avisosPendientes = avisos.filter(
    (avisos) => avisos.estado === "Pendiente"
  );
  

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Total" />
          <Tab label="Abiertos" />
          <Tab label="Pendientes" />
          <Tab label="Cerrados" />
        </Tabs>
      </Box>
      <Box sx={{ padding: 6 }}>
        {value === 0 && (
          <Box>
            <TotalCaceres avisos={avisos} />
          </Box>
        )}
        {value === 1 && (
          <Box>
           <AbiertosCaceres avisos={avisosAbiertos} users={users}/> 
          </Box>
        )}
        {value === 2 && (
          <Box>
          <PendientesCaceres avisos={avisosPendientes} users={users}/> 
          </Box>
        )}
        {value === 3 && (
          <Box>
            <Typography>The four tab</Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Avisos;
