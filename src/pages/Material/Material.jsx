import React, { useEffect, useReducer, useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../../assets/ApiRoutes';
import { useGetAuth } from "../../context";

import  AddMaterial from './Components/AddMaterial'
import  ListMaterial from './Components/ListMaterial'

import { tabsInitState, tabsReducer } from '../../utils/MaterialReducer'

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ListMaterialById from './Components/ListMaterialById';

const Material = () => {

  const loggedUser = useGetAuth();
  const [material, setMaterial] = useState({})
  const [users, setUsers] = useState([])
  const [materialById, setMaterialById] = useState({})
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    fetch(`${BASE_URL}/material`, {
      //fetch("http://localhost:5000/material",{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${loggedUser.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setMaterial(data)
      })
  }, [loggedUser.token]);
    
   //console.log(loggedUser.id,44);

   useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then(response => response.json())
      .then(data => setUsers(data))
  }, []);
  console.log(users,'users')

  const usersFiltered = users.filter(
    (user) => user.account_type === 'Tecnico' || user.account_type === 'Admin'
  );
  //console.log(usersFiltered,'userFiltered')
    
  useEffect(() => {
      fetch(`${BASE_URL}/material/${loggedUser.id}`, {
        //fetch("http://localhost:5000/material",{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           //Authorization: `Bearer ${loggedUser.token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setMaterialById(data)
        })
    }, []);
      console.log(materialById,'id');

  const [tabs, dispatch] = useReducer(tabsReducer, tabsInitState);

  const AddTab = () => dispatch({ type: "ADD", payload: tabsInitState });
  const ListTab = () => dispatch({ type: "LIST" });

  const navigate = useNavigate();

 
  

 //console.log(usersFiltered,'userFiltered');


  return (
    <>
    {!loggedUser ? <p>Cargando...</p> :(
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderColor: 'divider' , display:'flex', justifyContent:'center', backgroundColor:'grey', textTransform:'lowercase'}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
          
            <Tab  label="Añadir Material" value="ADD" textColor="secondary" />
            <Tab label="Mostrar Material" value="LIST" />
            {loggedUser.rol ==='Admin' || loggedUser.rol ==='Tecnico' ?
            <Tab label="Material por técnico" value="TECNICO" />:''}
            
          </TabList>
        </Box>
        <TabPanel value="ADD"><AddMaterial usersFiltered={usersFiltered}/></TabPanel>
        <TabPanel value="LIST"><ListMaterial material={material}/></TabPanel>
        <TabPanel value="TECNICO"><ListMaterialById materialById={materialById}/></TabPanel>
        
      </TabContext>
    </Box>
    ) 
    }
    </>
    
  )
}

export default Material
