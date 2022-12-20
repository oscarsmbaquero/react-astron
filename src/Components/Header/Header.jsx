import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, useDispatchAuth, useGetAuth } from "../../context";
import "./Header.scss";
import logoAstron from "../../assets/images/logo2.png";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Avatar from "@mui/material/Avatar";

function Header() {
  const userLogged = useGetAuth();
  const dispatch = useDispatchAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    ("entro");
    logout(dispatch);
    navigate("/users/login");
  };

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img src={logoAstron} className="logo" alt={logoAstron} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {userLogged.id ? (
              <>
                <NavLink
                  as={Link}
                  to={"/avisos/caceres"}
                  className="custom-link"
                >
                  <i class="fa-solid fa-city"></i>
                  &nbsp;Cáceres
                </NavLink>
                <NavLink
                  as={Link}
                  to={"/avisos/badajoz"}
                  className="custom-link"
                >
                  <i class="fa-solid fa-city"></i>
                  &nbsp;Badajoz
                </NavLink>
                <NavLink as={Link} to={"/items"} className="custom-link">
                  <i class="fa-solid fa-sitemap"></i>
                  &nbsp;Items
                </NavLink>
                <NavLink as={Link} to={"/material"} className="custom-link">
                  <i class="fa-solid fa-laptop"></i>
                  &nbsp;Material
                </NavLink>
                <NavLink
                  as={Link}
                  to={"/certificaciones"}
                  className="custom-link"
                >
                  <i class="fa-sharp fa-solid fa-list"></i>
                  &nbsp;Certificaciones
                </NavLink>
                <NavLink as={Link} to={"/users"} className="custom-link">
                  <i class="fa-solid fa-users"></i>
                  &nbsp;Usuarios
                </NavLink>
                {userLogged.rol === "Dispatch" || userLogged.rol === "Admin" ? (
                  <NavLink
                    as={Link}
                    to={"/anadir/avisos"}
                    className="custom-link"
                  >
                    <i class="fa-sharp fa-solid fa-plus"></i>
                    &nbsp;A. Aviso
                  </NavLink>
                ) : (
                  ""
                )}
                <NavLink
                  as={Link}
                  to={"/"}
                  onClick={handleLogout}
                  className="custom-link"
                >
                  <i class="fa-solid fa-toggle-off"></i>
                  &nbsp;LogOut
                </NavLink>
              </>
            ) : (
              <NavLink as={Link} to={"/user/login"} className="custom-link">
                <i class="fa-solid fa-toggle-on"></i>
                &nbsp;Login
              </NavLink>
            )}
          </Nav>
          {userLogged.id ? (
            <>
              <Nav>
                <Nav.Link href="#deets" className="user">
                  {userLogged.name}
                </Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                  <Avatar
                    alt="Remy Sharp"
                    src={userLogged.image}
                    className="avatar"
                  />
                </Nav.Link>
              </Nav>
            </>
          ) : (
            ""
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
