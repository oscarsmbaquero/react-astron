import '../../../core/components/SelectUsers/Selectuser.scss'
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../assets/ApiRoutes";
import { useParams } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import emailjs from '@emailjs/browser';
import Swal from "sweetalert2";
import { Button } from "@mui/material";

const ReubicarMaterial = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("default");
  const [btnState, setBtnState] = useState(false);
  

  const { id, userLogged  } = useParams();

  console.log("ID", id);
  console.log("user", userLogged);
 
  useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleChange = (event) => {
     //console.log(event.target.value,27);
    const userId = event.target.value;
    setSelected(userId);
    
    if (userId !== "default") fetchApi(userId);
  };

  
  console.log(selected,'selected');

  
  const selectedUser = users.filter((user) =>
  user._id === selected
  
  );
  //console.log(selectedUser,42);
   const userEmail = selectedUser[0]?.email;
//console.log(userEmail,'userMail')

  const sendMail = (e) => {
    e.preventDefault();

    try {
      console.log(e.target.name,'email');
     
      emailjs.sendForm('service_esqoixc','template_3jjni99',e.target,'dso8n6rVU1ADlfbV4')
      .then(response =>console.log(response))

      Swal.fire({
        title: 'Éxito!',
        text: 'Enviada notificación correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      //navigate("/");

    } catch (error) {
      //navigate("/FormContact");
    }

  }

  const fetchApi = (userId) => {
    fetch(`${BASE_URL}/users/assignAviso`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: `Bearer ${userLogged.token}`
      },
      body: JSON.stringify({
        userId: userId,
        avisoId: id,
        estado: 'Asignado'
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire("Aviso asignado correctamente", res.message, "success");
          setBtnState(true);
        }
      })
      .catch((error) => console.error(error));
  };

//console.log(users);

  const filteredUser = users.filter((user) =>user.account_type !=='Dispatch'
     
  );
  //console.log(filteredUser,56);

  return (
    <div>
      {/* <span>Asignar Incidencia número :</span><h3>{n_incidencia}</h3> */}
      {/* <h3>{n_incidencia}</h3> */}
      {/* <select name="users"  className='select'> */}
      <select value={selected} onChange={handleChange} className="select-user">
        {/* <option>Selecciona un usuario</option> */}
        <option key={"default"} selected value={"default"} >
          Selecciona un usuario
        </option>
        {filteredUser.map((option) => (
          <option key={option._id} value={option._id} >
            {option.name} {option.surname}
          </option>
        ))}
      </select>
      {btnState ?
      {/* <div>
        <form onSubmit={sendMail}>
          <input className="sectionForm__input" id="email" name="n_incidencia"  type="hidden" value={n_incidencia}/>
          <input className="sectionForm__input" id="name" name="centro"  type="hidden" value={centro}/>
          <input className="sectionForm__input" id="name" name="email"  type="hidden" value={userEmail}/>
          <Button variant="contained" 
                  type='submit'  
                  endIcon={<SendIcon />}  
                  style={{ borderRadius: 50,
                  backgroundColor: "black",
                  color:'white',
                  margin:'10px',
                  // marginTop:'0px'
                }}
                  >
              Enviar Mail
          </Button>
        </form>
        </div>   */}
      :''
      }
    </div>
  );
};

export default ReubicarMaterial;
