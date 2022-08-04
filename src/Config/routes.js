
import AvisosCaceres from "../pages/AvisosCaceres/AvisosCaceres";
import Avisos from "../pages/AvisosCaceres/AvisosCaceres";
import FormContact from "../pages/Form/FormContact";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";


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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/avisos/caceres",
    element: <AvisosCaceres />,
  }
  
];

export default routes;