import React, { useEffect, useReducer, useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../../assets/ApiRoutes';
import { useGetAuth } from "../../context";

import  AddMaterial from './Components/AddMaterial'
import  ListMaterial from './Components/ListMaterial'

import { tabsInitState, tabsReducer } from '../../utils/MaterialReducer'

const Material = () => {

  const loggedUser = useGetAuth();
  const [material, setMaterial] = useState({})

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
    console.log(material);
  const [tabs, dispatch] = useReducer(tabsReducer, tabsInitState);

  const AddTab = () => dispatch({ type: "ADD", payload: tabsInitState });
  const ListTab = () => dispatch({ type: "LIST" });

  const navigate = useNavigate();







  return (
    <section>
        {!loggedUser ? <p>Cargando...</p> : 
        <>
          <div>
            <ul className=''>
            
              <button  onClick={AddTab}>Añadir Material</button>
              <button onClick={ListTab}>Listar Material</button>
              
              <div>
                
            
              </div>
            </ul>
               {tabs.listMaterial &&
              <>
                <ListMaterial material={material} />
                </>}   
               {tabs.addMaterial &&
              <>
                <AddMaterial/>
              </>}               
          </div>
        </>
        }
    </section>
  )
}

export default Material
