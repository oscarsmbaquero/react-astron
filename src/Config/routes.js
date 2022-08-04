
import AvisosCaceres from "../pages/AvisosCaceres/AvisosCaceres";
import Avisos from "../pages/AvisosCaceres/AvisosCaceres";
import FormContact from "../pages/Form/FormContact";
import Home from "../pages/Home/Home";
import Login from "../pages/User/Login/Login";
import Register from "../pages/User/Register/Register";


const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/formContact",
    element: <FormContact />,
  },
  {
    path: "users/login",
    element: <Login />,
  },
  {
    path: "/users/register",
    element: <Register />,
  },
  {
    path: "/avisos/caceres",
    element: <AvisosCaceres />,
  }
  
];

export default routes;