
// import AvisosBadajoz from "../pages/Avisos/AvisosBadajoz/AvisosBadajoz";
import SelectCompanies from "../core/components/SelectCompanies/SelectCompanies";
import SelectUser from "../core/components/SelectUsers/SelectUser";
import AvisosBadajoz from "../pages/Avisos/AvisosBadajoz/AvisosBadajoz";
import AvisosCaceres from "../pages/Avisos/AvisosCaceres/AvisosCaceres";
import AvisosDetail from "../pages/Avisos/AvisosCaceres/AvisosDetail";
import AvisosCaceresDetail from "../pages/Avisos/AvisosCaceres/AvisosDetail";
import Avisos from "../pages/Avisos/AvisosCaceres/Avisos";
import AddAvisos from "../pages/Avisos/AñadirAvisos/AddAvisos";
import EditAviso from "../pages/Avisos/EditAviso/EditAviso";
import IntercencionAviso from "../pages/Avisos/IntervencionAviso/IntercencionAviso";
import FormContact from "../pages/Form/FormContact";
import Home from "../pages/Home/Home";
import Login from "../pages/User/Login/Login";
import Register from "../pages/User/Register/Register";
import PendientesCaceres from "../pages/Avisos/AvisosCaceres/PendientesCaceres";
import ReselectUser from "../core/components/ReselectUser/ReselectUser";
import MostrarIntervencion from "../pages/Avisos/IntervencionAviso/MostrarIntervencion";


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
    path: "/avisos",
    element: <Avisos />,
  },
  {
    path: "/avisos/caceres",
    element: <AvisosCaceres />,
  },
  {
    path: "/avisos/caceres/pendientes",
    element: <PendientesCaceres />,
  },
  {
    path: "/avisos/badajoz",
    element: <AvisosBadajoz />,
  },
  {
    path: "/anadir/avisos",
    element: <AddAvisos />,
  },
  {
    path: "/avisos/details/:id",
    element: <AvisosDetail />,
  },
  {
    path: "/edit/aviso/:id",
    element: <EditAviso />,
  },
  {
    path: "/avisos/asignar/:id/:n_incidencia",
    element: <SelectUser />,
  },
  {
    path: "/avisos/reasignar/:id/:n_incidencia",
    element: <ReselectUser />,
  },
  {
    path: "/avisos/intervencion/:id",
    element: <IntercencionAviso />,
  },
  {
    path: "/mostrar/intervencion/:id",
    element: <MostrarIntervencion />,
  }
  
];

export default routes;