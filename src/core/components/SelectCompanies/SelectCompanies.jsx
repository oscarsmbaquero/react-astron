import React, { useEffect, useState } from 'react';
//import Select from 'react-select';
import './SelectCompanies.scss';
import { BASE_URL } from '../../../assets/ApiRoutes';
import { useParams } from 'react-router-dom';
import {  useGetAuth } from "../../../context/context";
import Swal from 'sweetalert2';


const SelectCompanies = () => {
  const userLogged = useGetAuth();
  const { id, n_incidencia } = useParams();
  const [buttonState, setButtonState] = useState(false);
  //console.log(userLogged.token,14);
  

    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetch(`${BASE_URL}/users`)
      .then(response => response.json())
      .then(data => setUsers(data))
    
     
    }, [])
   
    const assignAviso = () => {

      //fetch(`${BASE_URL}/users/assignAviso`, {
        fetch('http://localhost:5000/users/assignAviso',{
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
               Authorization: `Bearer ${userLogged.token}`
          },
          body: JSON.stringify({
              
              avisoId: n_incidencia,
              
          })
          
      })
          .then(res => {
              if (res.status === 200) {
                  Swal.fire("aviso asignado correctamente", res.message, "success");
                  setButtonState(true);
              }
          }).catch((error) => console.error(error))
  }
  

  return (
    <>
      <div>
          <p>Asignar el aviso con número de incidencia {n_incidencia}</p>
          <select name="users"  className='select'>
              <option>Selecciona un usuario</option>
              {users.map((user) => (
              <option key={user._id} value={user._id}>{user.name} {user.surname}</option>
            ))}
          </select>
      </div>
      <div>
      
      <button className="register__button" onClick={assignAviso}>Asignar</button>
      </div>
    </>
  )
}

export default SelectCompanies