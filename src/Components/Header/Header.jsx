import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, useDispatchAuth, useGetAuth } from "../../context";

import logoAstron from "../../assets/images/logo2.png";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Avatar from '@mui/material/Avatar';

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
    
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
      <Container>
        <Navbar.Brand href="#home">
          <img src={logoAstron} className="logo" alt={logoAstron} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
           {userLogged.id ? 
           <>           
            {/* <NavDropdown  title={<span><i class="fa-solid fa-city"></i><br/>Cáceres</span>} id="basic-nav-dropdown"> 
              <NavDropdown.Item href="/avisos/caceres/listado"><i class="fa-regular fa-folder-open">&nbsp;</i>Listado</NavDropdown.Item>
              <NavDropdown.Item href="/avisos/caceres"><i class="fa-regular fa-folder-open">&nbsp;</i>Abiertos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/pendientes/caceres"><i class="fa-regular fa-folder-open">&nbsp;</i>Pendientes
              </NavDropdown.Item>
              <NavDropdown.Item href="/cerrados/caceres"><i class="fa-solid fa-folder-closed">&nbsp;</i>Cerrados</NavDropdown.Item>
            </NavDropdown> */}
            {/* <NavDropdown  title={<span><i class="fa-solid fa-city"></i><br/>Badajoz</span>} id="basic-nav-dropdown"> 
              <NavDropdown.Item href="/cartaFood"><i class="fa-solid fa-utensils">&nbsp;</i>Abiertos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/cartaCervezas"><i class="fa-solid fa-beer-mug-empty">&nbsp;</i>
                Pendientes
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3"><i class="fa-solid fa-wine-glass-empty">&nbsp;</i>Cerrados</NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link as={Link} to={"/avisos/caceres"}>
            <i class="fa-solid fa-city"></i>
              &nbsp;Cáceres
            </Nav.Link>
            <Nav.Link as={Link} to={"/avisos/badajoz"}>
            <i class="fa-solid fa-city"></i>
              &nbsp;Badajoz
            </Nav.Link>
            <Nav.Link as={Link} to={"/items"}>
            <i class="fa-solid fa-sitemap"></i>
              &nbsp;Items
            </Nav.Link>
            <Nav.Link as={Link} to={"/material"}>
            <i class="fa-solid fa-laptop"></i>
              &nbsp;Material
            </Nav.Link>
            <Nav.Link as={Link} to={"/certificaciones"}>
            <i class="fa-sharp fa-solid fa-list"></i>
              &nbsp;Certificaciones
            </Nav.Link>
            { userLogged.rol === 'Tecnico' || userLogged.rol ==='Admin' ?//solo lo pinto a los tecnicos o Admin
              <Nav.Link as={Link} to={"/us/asignados"}>
              <i class="fa-solid fa-user"></i>
                &nbsp;Asignados
              </Nav.Link>
            :''}
            <Nav.Link as={Link} to={"/users"}>
            <i class="fa-solid fa-users"></i>
              &nbsp;Usuarios
            </Nav.Link>
            {userLogged.rol === "Dispatch" || userLogged.rol === "Admin" ?
            <Nav.Link as={Link} to={"/anadir/avisos"}>
            <i class="fa-sharp fa-solid fa-plus"></i>
              &nbsp;A. Aviso
            </Nav.Link>
            :''}
            {/* <NavDropdown title="Menu" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link as={Link} to={"/"} onClick={handleLogout}>
            <i class="fa-solid fa-toggle-off"></i>
              &nbsp;LogOut
            </Nav.Link>
            </>
            :
            <Nav.Link as={Link} to={"/user/login"}>
            <i class="fa-solid fa-toggle-on"></i>
              &nbsp;Login
            </Nav.Link>
            }
          </Nav>
          {userLogged.id ?
          <>
          <Nav>
            <Nav.Link href="#deets" className="user">{userLogged.name}</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
            <Avatar alt="Remy Sharp" src={userLogged.image} className="avatar" />
            </Nav.Link>
          </Nav>
          </>
          :''}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
