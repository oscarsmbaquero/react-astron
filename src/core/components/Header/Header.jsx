import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail, AiOutlineUserAdd, AiOutlineLogout } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaUserTie, FaUserCircle } from "react-icons/fa";
import "./Header.scss";
import Navbar from "react-bootstrap/Navbar";
import { logout, useDispatchAuth, useGetAuth } from "../../../context";
import logo4 from "../../../assets/images/logo.jpg"
const Header = () => {

  const userLogged = useGetAuth();
  const dispatch = useDispatchAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(dispatch)
    navigate('/users/login')
  };

  return (
    <>
      <Navbar className="header" expand="md">
        <div>
          <Link className="header__a" to="/">
            <img src={logo4} alt="logo" className="header__logo"></img>
          </Link>
        </div>
        <div >        
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <ul className="header__ul">
              <div className="header__menu">
              {userLogged.id ?
                <Link className="header__a" to="/avisos/caceres">
                  <span className="span1">Cáceres</span>
                  <span className="span2">
                    <BsFillChatDotsFill />
                  </span>
                </Link>
                :''}
                {userLogged.id ?
                  <Link className="header__a" to="">
                    <span className="span1">Badajoz</span>
                    <span className="span2">
                      <FaUserTie />
                    </span>
                  </Link>
                  :''}
                  {userLogged.id ?
                  <Link className="header__a" to="/">
                    <span className="span1">Items</span>
                    <span className="span2">
                      <FaUserCircle />
                    </span>
                  </Link>
                  :''}
                  {userLogged.id ?
                <Link className="header__a" to="/">
                  <span className="span1">Certificaciones</span>
                  <span className="span2">
                    <FaUserCircle />
                  </span>
                </Link>
                :''}
                {userLogged.id ?
                <Link className="header__a" to="/formContact">
                  <span className="span1">Contáctanos</span>
                  <span className="span2">
                    <AiOutlineMail />
                  </span>
                </Link>
                :''}                
                <Link className="header__a" to="users/login">
                  <span className="span1">Login</span>
                  <span className="span2">
                    <AiOutlineUserAdd />
                  </span>
                </Link> 
                 <>
                  <AiOutlineLogout onClick={handleLogout} className="header__a" />
                  <Link className="header__a" to="/formContact">
                  <span className="span1">{userLogged.email}</span>
                  <span className="span2">
                  </span>
                </Link>
                </>
              </div>
            </ul>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};
export default Header;