import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import './EditUser.scss';
import {  useGetAuth } from "../../../../context/context";
//import { useForm } from 'react-hook-form'
import { BASE_URL } from '../../../../assets/ApiRoutes';
import { Button  } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const EditUser = () => {
  
  const userLogged = useGetAuth();
  const { id } =useParams();
  
  //const { register, handleSubmit, formState: {errors, isValid}, setValue, } = useForm({mode: "onChange"});

  const [profile, SetProfile] = useState();
  let navigate = useNavigate();

  const getProfile =()=>{
    fetch(`${BASE_URL}/users/${id}`)
      .then(response => response.json())
      .then(data => SetProfile(data))
  }
  useEffect(() => {
    
    getProfile();
  },[]);

  console.log(profile);

  const editUser = (e, id) => {
    e.preventDefault();

           let target = e.target;
           console.log(e.target.name.value,32);
           const data = new FormData();

    
           data.append('image', target.image.files[0])
           data.append('name', target.name.value || profile.name);
           data.append('surname', target.surname.value || profile.surname);
           data.append('email', target.email.value || profile.email);
          
   
   
    fetch(`${BASE_URL}/users/edit/`, {
           method: 'PATCH',
           headers: {
                  //'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${userLogged.token}`
           },
           body: data

    }).then(res => {
           if (res.status === 200) {
                  Swal.fire("Modificado correctamente", res.message, "success");
                  //getProfile();
           }
    }).catch()
}
  return (
    
    <section className="sectionEdit">
    {!profile ? <p>Cargando...</p>
    
    :
    <div className="edit">
           <form onSubmit={e => editUser(e, editUser._id)} className="edit__form" >
                  <label className="edit__label" htmlFor="name">Name</label>
                  <input type="text" name="name" className='edit__input' defaultValue={profile.name}/>
                  <label className="edit__label" htmlFor="surname">Surname</label>
                  <input type="text" name="surname" className='edit__input' defaultValue={profile.surname} />
                  <label className="edit__label" htmlFor="email">Email</label>
                  <input type="text" name="email" className='edit__input' defaultValue={profile.email} />
                  <label className="edit__label" htmlFor="image">Image</label>
                  <input type="file" alt="" name="image" className='edit__input' />
                  <Button variant="contained" type='submit'  endIcon={<SendIcon />}>
                Enviar
                </Button>
                  {/* <button className='edit__button' >Actualizar</button> */}
           </form>
    </div>
    }
    
    </section>
  )
}

export default EditUser
