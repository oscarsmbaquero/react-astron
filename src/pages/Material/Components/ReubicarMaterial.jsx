import '../../../core/components/SelectUsers/Selectuser.scss'
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../assets/ApiRoutes";
import { useParams } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ReubicarMaterial = () => {
  let navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("default");
  
  

  const { id  } = useParams();

  console.log("ID", id);
 
 
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
 

  const fetchApi = (userId) => {
    fetch(`${BASE_URL}/material/ubicar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: `Bearer ${userLogged.token}`
      },
      body: JSON.stringify({
        userSelected: userId,
        materialId: id,
        //userEnvia: userLogged,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire("Traspaso de material ok", res.message, "success");
          navigate("/material");
        }
      })
      .catch((error) => console.error(error));
  };


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
    </div>
  );
};

export default ReubicarMaterial;
