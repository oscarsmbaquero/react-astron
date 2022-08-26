

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
import Navbar from "react-bootstrap/Navbar";
import { logout, useDispatchAuth, useGetAuth } from "../../context";
import logoAstron from "../../assets/images/logo.jpg";
import logoOit from "../../assets/images/logoOit.jpeg";




const Header = () => {

    const userLogged = useGetAuth();
    const dispatch = useDispatchAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
      logout(dispatch)
      navigate('/users/login')
    };


  return (
    <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light bgNavbar ">
        <div className="container-fluid d-flex flex-column">
            <div
            className="collapse navbar-collapse fw-bold"
            id="navbarSupportedContent"
            >
            <a
                className="navbar-brand d-flex justify-content-center"
                href="/home"
                alt=""
            >
                {" "}
                <img
                className="img-fluid w-25 align-content-center"
                src={logoOit}
                alt="logo"
                />
            </a>
            <a
                className="navbar-brand d-flex justify-content-center"
                href="/home"
                alt=""
            >
                {" "}
                <img
                className="img-fluid w-25 align-content-center"
                src={logoAstron}
                alt="logo"
                />
            </a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center">
                <NavLink
                to="/avisos/caceres"
                className="nav-item align-self-center shadowLink nav-link active"
                style={({ isActive }) => ({
                    color: isActive ? '#000305' : '#000305',
                    // background: isActive ? '#A3D4F7' : '#fff',
                    borderBottom: isActive ? '4px solid red':'4px solid transparent'
                })}
                
                
                >
                Cáceres
                </NavLink>
                <NavLink
                to="/avisos/badajoz"
                className="nav-item align-self-center shadowLink nav-link active"
                style={({ isActive }) => ({
                    color: isActive ? '#000305' : '#000305',
                    // background: isActive ? '#A3D4F7' : '#fff',
                    borderBottom: isActive ? '4px solid red':'4px solid transparent'
                })}
                >
                Badajoz
                </NavLink>
                <NavLink
                to="/items"
                className="nav-item align-self-center shadowLink nav-link active"
                style={({ isActive }) => ({
                    color: isActive ? '#000305' : '#000305',
                    // background: isActive ? '#A3D4F7' : '#fff',
                    borderBottom: isActive ? '4px solid red':'4px solid transparent'
                })}
                >
                Items
                </NavLink>
                <NavLink
                to="/certificaciones"
                className="nav-item align-self-center shadowLink nav-link active"
                style={({ isActive }) => ({
                    color: isActive ? '#000305' : '#000305',
                    // background: isActive ? '#A3D4F7' : '#fff',
                    borderBottom: isActive ? '4px solid red':'4px solid transparent'
                })}
                >
                Certificaciones
                </NavLink>
                <NavLink
                to="/users"
                className="nav-item align-self-center shadowLink nav-link active"
                style={({ isActive }) => ({
                    color: isActive ? '#000305' : '#000305',
                    // background: isActive ? '#A3D4F7' : '#fff',
                    borderBottom: isActive ? '4px solid red':'4px solid transparent'
                })}
                >
                Usuarios
                </NavLink>
                <NavLink
                to="/anadir/avisos"
                className="nav-item align-self-center shadowLink nav-link active"
                style={({ isActive }) => ({
                    color: isActive ? '#000305' : '#000305',
                    // 
                    borderBottom: isActive ? '4px solid red':'4px solid transparent'
                })}
                >
                Añadir Aviso
                </NavLink>
                <NavLink
                to="/user/login"
                className="nav-item align-self-center shadowLink nav-link active"
                style={({ isActive }) => ({
                    color: isActive ? '#000305' : '#000305',
                    background: isActive ? '#A3D4F7' : '#fff',
                    borderBottom: isActive ? '4px solid red':'4px solid transparent'
                })}
                >
                Login
                </NavLink>
                
            </ul>
            </div>
            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>
        </div>

        </nav> 
    </header>
  );
};

export default Header;