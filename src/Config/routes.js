
// import AvisosBadajoz from "../pages/Avisos/AvisosBadajoz/AvisosBadajoz";
//import SelectCompanies from "../core/components/SelectCompanies/SelectCompanies";
import SelectUser from "../core/components/SelectUsers/SelectUser";


import AvisosDetail from "../pages/Avisos/AvisosDetail/AvisosDetail";

import Avisos from "../pages/Avisos/AvisosCaceres/Avisos";
import AddAvisos from "../pages/Avisos/AñadirAvisos/AddAvisos";
import EditAviso from "../pages/Avisos/EditAviso/EditAviso";
import IntercencionAviso from "../pages/Avisos/IntervencionAviso/IntercencionAviso";
import FormContact from "../pages/Form/FormContact";
import Home from "../pages/Home/Home";

import ReselectUser from "../core/components/ReselectUser/ReselectUser";
import MostrarIntervencion from "../pages/Avisos/IntervencionAviso/MostrarIntervencion";
import Users from "../pages/User/Users/Users";
import Items from "../pages/Items/Items";
import Certificaciones from "../pages/Certificaciones/Certificaciones";
import EditUser from "../pages/User/Users/EditUser/EditUser";
import SignIn from "../pages/User/Login/SignIn";
import SignUp from "../pages/User/Register/SignUp";
import Material from "../pages/Material/Material";
import AvisosBadajoz from "../pages/Avisos/AvisosBadajoz/AvisosBadajoz";
import ReubicarMaterial from "../pages/Material/Components/ReubicarMaterial";



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
    path: "user/login",
    element: <SignIn />,
  },
  {
    path: "/users/register",
    element: <SignUp />,
  },
  {
    path: "/avisos/caceres",
    element: <Avisos />,
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
    path: "/avisos/asignar/:id/:n_incidencia/:centro",
    element: <SelectUser />,
  },
  {
    path: "/avisos/reasignar/:id/:idUserOld",
    element: <ReselectUser />,
  },
  {
    path: "/avisos/intervencion/:id",
    element: <IntercencionAviso />,
  },
  {
    path: "/mostrar/intervencion/:id",
    element: <MostrarIntervencion />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/items",
    element: <Items />,
  },
  {
    path: "/certificaciones",
    element: <Certificaciones />,
  },
  {
    path: "/edit/user/:id",
    element: <EditUser />,
  },
  {
    path: "/material",
    element: <Material />,
  },
  {
    path: "/material/reubicar/:id/:userLogged/",
    element: <ReubicarMaterial />,
  },
  
  
];

export default routes;