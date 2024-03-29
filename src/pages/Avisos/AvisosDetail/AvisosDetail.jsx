import { CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import React,{ useState, useEffect} from 'react'
import { Badge, Card, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from "../../../assets/ApiRoutes";
import { useNavigate } from "react-router-dom";
import { useGetAuth } from "../../../context/context";
import Button from "@mui/material/Button";
import Swal from "sweetalert2"; // hay que probarlo


const AvisosDetail = () => {
  const userLogged = useGetAuth();
  const { id} = useParams();
  const navigate = useNavigate();

  let [avisos, SetAvisos] = useState();
  

  useEffect(() => {
    
    fetch(`${BASE_URL}/avisos/${id}`)
      .then(response => response.json())
      .then(data => SetAvisos(data))      
     }, [id]); 
   
    //  const deleteaviso = (e, aviso) => {
    //   console.log(aviso);
    //   e.preventDefault();
    //   fetch(`${BASE_URL}/avisos/${aviso}`, {
    //     method: "DELETE",
    //     headers: {
    //       //'Content-Type': 'multipart/form-data',
    //       Authorization: `Bearer ${userLogged.token}`,
    //     },
    //   }).then((res) => {
    //     if (res.status === 200) {
    //       console.log("Borrado");
    //       Swal.fire("Eliminado", res.message, "success");
    //       fetch(`${BASE_URL}/avisos`)
    //         .then((response) => response.json())
    //         .then((data) => SetAvisos(data));
  
    //       navigate("/avisos/caceres")
    //     }
    //   });
    // };
 return (
  <div>
  { !avisos ? <p>Cargando...</p> : 
  <>
    <Container>
        <Grid container spacing={5}>          
            <Grid item key={avisos._id} xs={12} md={12} lg={12}>
              <Card
                elevation={5}
                sx={{
                  borderRadius: "4px",
                  justifyContent: "flex-start",
                  flex: "1 0 auto",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  ":hover": {
                    boxShadow: 20, // theme.shadows[20]
                  },
                }}
              >
                <CardHeader
                  sx={{
                    //color: "white.main",
                    background: "grey",
                    justifyContent: "space-between",
                  }}
                  title ={avisos.centro}
                  titleStyle={{textAlign: 'center'}}
                  // action={
                  //   <>
                  //     {" "}
                  //     {userLogged.rol === "Tecnico" ? (
                  //       ""
                  //     ) : (
                  //       <IconButton
                  //         color="error"
                  //          onClick={(e) => deleteaviso(e, avisos._id)}
                  //       >
                  //         <DeleteOutlined />
                  //       </IconButton>
                  //     )}
                  //     <Link to={`/edit/avisos/${avisos._id}`}>
                  //       <IconButton aria-label="delete" color="secondary">
                  //         <Create />
                  //       </IconButton>
                  //     </Link>
                  //     <Link to={`/avisos/details/${avisos._id}`}>
                  //       <IconButton aria-label="delete" color="success">
                  //         <AddIcon />
                  //       </IconButton>
                  //     </Link>
                  //   </>
                  // }
                  // title ={avisos.n_incidencia}
                   
                />
                <CardContent sx={{ flex: "2 0 auto" }}>
                  <Typography
                    variant="body1"
                    color="error"
                    sx={{ fontSize: 26 }}
                  >
                  <Badge bg="danger">{avisos.n_incidencia}</Badge><br/>
                  {avisos.prioridad === 'Urgente' ?
                  <Badge bg="warning">{avisos.prioridad}</Badge>
                  :
                  <Badge bg="success">{avisos.prioridad}</Badge>
                  }
                  
                  </Typography>
                  <Typography variant="h4" component={"div"}>
                    {avisos.localidad}
                  </Typography>
                  <Typography sx={{ fontSize: 26 }} color="text.secondary">
                    {avisos.centro}
                  </Typography>
                  <Typography variant="h6">
                    {
                      avisos.estado === "Abierto" ? ( //primera condicion
                        <Badge bg="success"> {avisos.estado}</Badge>
                      ) : avisos.estado === "Pendiente" ? ( //segunda condicion
                        <Badge bg="warning"> {avisos.estado}</Badge>
                      ) : (
                        <Badge bg="primary">

                          {" "}
                          {avisos.estado}
                        </Badge>
                      ) //si no cumple tercera condicion
                    }
                  </Typography>
                  <Typography variant="h6"></Typography>
                  <Typography variant="body1" color="text.secondary">
                    {avisos.averia}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  { avisos.intervencion.length !== 0 &&
                  <Button variant="contained" color="success" size="small">
                    <Link to={`/mostrar/intervencion/${avisos._id}`}>
                      Mostrar Intervenciónes
                    </Link>
                  </Button>
                  }
                </CardActions>
              </Card>
            </Grid>
        </Grid>
      </Container>
  </>}
</div>
   );
}

export default AvisosDetail