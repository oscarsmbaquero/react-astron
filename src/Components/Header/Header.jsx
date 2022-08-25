import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMail, AiOutlineUserAdd, AiOutlineLogout } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaUserTie, FaUserCircle } from "react-icons/fa";
import "./Header.scss";
import Navbar from "react-bootstrap/Navbar";
import { logout, useDispatchAuth, useGetAuth } from "../../context";
import logo4 from "../../assets/images/logo.jpg";
const Header = () => {

  const userLogged = useGetAuth();
  const dispatch = useDispatchAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(dispatch)
    navigate('/users/login')
  };

  return (
    <header>
      <Navbar className="header" expand="xl" >
        <div>
          <NavLink className="header__a" to="/">
            <img src={logo4} alt="logo" className="header__logo"></img>
          </NavLink>
        </div>
        <div >        
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <ul className="header__ul">
              <div className="header__menu">
              {userLogged.id ?
              <>
                <NavLink className="header__a" to="/avisos/caceres">Cáceres</NavLink>
                </>
                :''}
                {userLogged.id ?
                  <NavLink className="header__a" to="/avisos/badajoz">Badajoz</NavLink>
                  :''}
                  {userLogged.id ?
                  <NavLink className="header__a" to="/">Items</NavLink>
                  :''}
                  {userLogged.id ?
                <NavLink className="header__a" to="/">Certificaciones</NavLink>
                :''}
                {userLogged.id ?
                <NavLink className="header__a" to="/users">Users</NavLink>
                :''}
                {userLogged.id ?
                <NavLink className="header__a" to="/formContact">Contacto</NavLink>
                :''}
                { userLogged.rol === 'Dispatch' || userLogged.rol === 'Admin' ?
                <NavLink className="header__a" to="/anadir/avisos">Añadir Aviso
                </NavLink>
                :''}
                {!userLogged.id ?
                <NavLink className="header__a" to="users/login">Login</NavLink> 
                :
                 <>
                  <NavLink className="header__a" to="/" onClick={handleLogout}>Logout</NavLink>
                
                </>
                }
              </div>
            </ul>
            <ul className="header__user">
            {userLogged.name}
            </ul>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  );
};
export default Header;