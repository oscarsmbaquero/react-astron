import React from 'react';
import {  useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import { Box } from '@mui/system';
import AvisosCaceres from './AvisosCaceres';


const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
    
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
    
  },
}));

// function handleClick(event) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
// }

export default function IconBreadcrumbs() {
  const classes = useStyles();

  return (
    <Box
  display="flex"
  justifyContent="center"
  // alignItems="center"
  minHeight="100vh"
    >
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href='/avisos/caceres/' className={classes.link}>
        <HomeIcon className={classes.icon} />
        Abiertas
      </Link>
      <Link color="inherit" href="/avisos/caceres/pendientes" className={classes.link}>
        <WhatshotIcon className={classes.icon} />
        Asigandas
      </Link>
      <Link color="inherit" href="/avisos/caceres/pendientes" className={classes.link}>
        <WhatshotIcon className={classes.icon} />
        Pendientes
      </Link>
      <Link color="textPrimary" className={classes.link}>
        <GrainIcon className={classes.icon} />
        Cerradas
      </Link>
    </Breadcrumbs>
    </Box>
  );
}
