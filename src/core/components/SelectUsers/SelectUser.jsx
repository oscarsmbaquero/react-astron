import { useEffect, useState } from "react";
import { BASE_URL } from "../../../assets/ApiRoutes";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const SelectUser = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("default");

  const { id, n_incidencia } = useParams();

  console.log("ID", id);
  console.log("N_INCIDENCIA", n_incidencia);
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
    fetch("http://localhost:5000/users/assignAviso", {
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
          Swal.fire("aviso asignado correctamente", res.message, "success");
          // setButtonState(true);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <p>Asignar el aviso con número de incidencia {n_incidencia}</p>
      {/* <select name="users"  className='select'> */}
      <select value={selected} onChange={handleChange}>
        {/* <option>Selecciona un usuario</option> */}
        <option key={"default"} selected value={"default"}>
          Selecciona un usuario
        </option>
        {users.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name} {option.surname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectUser;
