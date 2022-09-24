import { Box, Pagination } from '@mui/material'
import React, { useState } from 'react'


const pageSize = 3;
const PaginationAvisos = ({avisos}) => {

 console.log(avisos,'avisos');

  const [page, setPage] = useState(1)
 
  // const handleChange=(e,p) =>{

  //   console.log(e,p);
  //   setPage(p);
   
  //    }

  const paginar = ()=>{

    return Math.ceil(avisos/pageSize);
  }
  
  return (
    <>
        <Box justifyContent={"center"} alignItems="center" display={"flex"}
        
        sx={{
            margin: "20px 0px",
            
        }}
        
        ><Pagination color= "primary"  />

        </Box>
    </>
  )
}

export default PaginationAvisos