import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../assets/ApiRoutes";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { makeStyles } from '@mui/styles';
// import Loader from "../../../core/components/Loader/Loader";
//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import TotalCaceres from "./components/TotalCaceres";
import AbiertosCaceres from "./components/AbiertosCaceres";
import PendientesCaceres from "./components/PendientesCaceres";
import CerradosCaceres from "./components/CerradosCaceres";
import { useGetAuth } from "../../../context/context";
import MisAvisos from "./components/MisAvisos";
import Pruebas from './components/Pruebas';

const useStyles = makeStyles({
  selected: {
    backgroundColor: 'rgb(206, 255, 255)',
  },
});

const Avisos = () => {
  let [avisos, SetAvisos] = useState([]);
  let [users, SetUsers] = useState([]);
  const [value, setValue] = React.useState(0);
  const userLogged = useGetAuth();
  const classes = useStyles();

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //filtros Avisos Caceres
  const avisosCaceres = avisos.filter(
    (avisos) => avisos.provincia === "Cáceres"
  );
  const numeroAvisosCaceres = avisosCaceres.length;
  const avisosAbiertos = avisosCaceres.filter(
    (avisos) => avisos.estado === "Abierto" || avisos.estado === "Asignado"
  );
  const numeroAvisosAbiertos = avisosAbiertos.length;

  const avisosPendientes = avisosCaceres.filter(
    (avisos) => avisos.estado === "Pendiente"
  );
  const numeroAvisosPendientes = avisosPendientes.length;

  const avisosCerrados = avisosCaceres.filter(
    (avisos) => avisos.estado === "Cerrada"
  );
  const numeroAvisosCerrados = avisosCerrados.length;

  const misAvisos = avisos.filter(
    (avisos) => avisos.user_assigned?._id === userLogged.id
  );
  const numeroMisAvisos = misAvisos.length;
  //fin filtros Avisos Caceres

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab classes={{ selected: classes.selected }} label={`Total-${numeroAvisosCaceres}-`} />
          <Tab classes={{ selected: classes.selected }} label={`Abiertos-${numeroAvisosAbiertos}-`} />
          <Tab classes={{ selected: classes.selected }} label={`Pendientes-${numeroAvisosPendientes}-`} />
          <Tab classes={{ selected: classes.selected }} label={`Cerrados-${numeroAvisosCerrados}-`} />
          <Tab classes={{ selected: classes.selected }} label={`Mis Avisos-${numeroMisAvisos}-`} />
        </Tabs>
      </Box>
      <Box sx={{ padding: 1 }}>
        {value === 0 && (
          <Box>
            <TotalCaceres avisos={avisosCaceres} userLogged={userLogged} />
          </Box>
        )}
        {value === 1 && (
          <Box>
            <AbiertosCaceres
              numeroAvisosAbiertos={numeroAvisosAbiertos}
              avisos={avisosAbiertos}
              users={users}
              userLogged={userLogged}
            />
          </Box>
        )}
        {value === 2 && (
          <Box>
            <PendientesCaceres avisos={avisosPendientes} users={users} />
          </Box>
        )}
        {value === 3 && (
          <Box>
            <CerradosCaceres avisos={avisosCerrados} />
          </Box>
        )}
        {value === 4 && (
          <Box>
            <MisAvisos avisos={misAvisos} />
          </Box>
        )}       
      </Box>
    </>
  );
};

export default Avisos;
