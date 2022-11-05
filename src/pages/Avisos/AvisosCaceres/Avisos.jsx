import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../assets/ApiRoutes";
// import DataTable from "react-data-table-component";
// import Badge from "react-bootstrap/Badge";
// import { AddIcCallOutlined, Create, DeleteOutlined } from "@mui/icons-material";
// import { IconButton } from "@mui/material";
//   import AddIcon from "@mui/icons-material/Add";

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TotalCaceres from "./components/TotalCaceres";
import { Typography } from "@mui/material";


const Avisos = () => {
  let [avisos, SetAvisos] = useState([]);
  

  useEffect(() => {
    fetch(`${BASE_URL}/avisos`)
      .then((response) => response.json())
      .then((data) => SetAvisos(data));
  }, []);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  return (
    <>
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Total Avisos Cáceres" />
        <Tab label="Abiertos" />
        <Tab label="Pendientes" />
        <Tab label="Cerrados" />
      </Tabs>
    </Box>
    <Box sx={{ padding: 2 }}>
        {value === 0 && (
          <Box>
          <TotalCaceres avisos={avisos}/>   
          </Box>
        )}
        {value === 1 && (
          <Box>
            <Typography>The second tab</Typography>
          </Box>
        )}
        {value === 2 && (
          <Box>
            <Typography>The third tab</Typography>
          </Box>
        )}
        {value === 3 && (
          <Box>
            <Typography>The four tab</Typography>
          </Box>
        )}
      </Box>
      {/* <Tabs id="controlled-tabs" selectedTabClassName="bg-danger" >
    <TabList>
      <Tab
      
      >Total</Tab>
      <Tab>Abiertos</Tab>
      <Tab>Pendientes</Tab>
      <Tab>Cerrados</Tab>
    </TabList>

    <TabPanel>
    <TotalCaceres avisos={avisos}/>   
    </TabPanel>
    <TabPanel>   
    </TabPanel>
    <TabPanel>   
    </TabPanel>
    <TabPanel>
    </TabPanel>
  </Tabs> */}
    
    </>
  );
};

export default Avisos;
