import { useEffect, useState } from "react";
import { BASE_URL } from "../../../assets/ApiRoutes";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ReselectUser = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("default");

  const { id, idUserOld } = useParams();

  console.log("ID_incidencia", id);
  // console.log("N_INCIDENCIA", n_incidencia);
  console.log("user_old", idUserOld)
  useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleChange = (event) => {
    // console.log(event.target.value);
    const userId = event.target.value;
    setSelected(userId);
    if (userId !== "default") fetchApi(userId);
  };

  

  const fetchApi = (userId) => {
    fetch(`${BASE_URL}/users/reAssignAviso`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: `Bearer ${userLogged.token}`
      },
      body: JSON.stringify({
        userId: userId,
        avisoId: id,
        estado: 'Asignado',
        idUserOld: idUserOld
       
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire("aviso Reasignado correctamente", res.message, "success");
          // setButtonState(true);
        }
      })
      .catch((error) => console.error(error));
  };

  const filteredUser = users.filter((user) =>
  //  user.account_type !=='Dispatch'
  user.account_type.toLowerCase().includes('tecnico')||
  user.account_type.toLowerCase().includes('admin')
   
);

  return (
    <div>
      <p>Reasignar el aviso con número de incidencia </p>
      {/* <select name="users"  className='select'> */}
      <select value={selected} onChange={handleChange}>
        {/* <option>Selecciona un usuario</option> */}
        <option key={"default"} selected value={"default"}>
          Selecciona un usuario
        </option>
        {filteredUser.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name} {option.surname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ReselectUser;
