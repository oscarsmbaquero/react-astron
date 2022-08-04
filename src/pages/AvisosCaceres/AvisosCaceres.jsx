
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import SearchInput from '../../core/components/SearchInput/SearchInput';
import Loader from "../../core/components/Loader/Loader";
import './AvisosCaceres.scss';


const AvisosCaceres = () => {

    let [avisos, SetAvisos] = useState([]); 
    const [keyword, setKeyword] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    useEffect(() => {
        fetch('http://localhost:5000/avisos')
          .then(response => response.json())
          .then(data => SetAvisos(data))
      }, []);
console.log(avisos);

const onInputChange = (e) => {
  setKeyword(e.target.value.toLowerCase());
};
/*Con el valor introducido en el inpute del buscador filtramos los trabajos almacenaos en jobs,
Filtramos por empresa o por puestos ofertados, previo paso a minusculas*/
const filteredAvisos = avisos.filter((avisos) =>
  avisos.centro.toLowerCase().includes(keyword)||
  avisos.n_incidencia.toLowerCase().includes(keyword)
);
  return (
    <>
      
      <section className='searchContainer'>
         <SearchInput placeholder="Filtrar por trabajo o empresa" onChange={onInputChange} />
      </section>
      
       
            {isLoaded === false ? (
                    <Loader />
                  ) : (
              <>
              <div className="avisosList">
              {filteredAvisos.map((aviso, key)=>(

                <div key={ key } aviso={aviso}>
                   <div className="avisosList__div">
                      <div className='avisosList__info'>
                        
                          <div className='avisosList__text' >
                            <h1 className='avisosList__h1' >{aviso.n_incidencia} </h1>
                            <h2 className='avisosList__h2'>{aviso.centro}</h2>
                            <h3 className='avisosList__h3' >{aviso.averia}</h3>
                          </div>
                        
                      </div>

                    </div>
                </div>
                   
                
                ))}
                </div>
                </>
                    )}
        
      
      
      </>
  )
}

export default AvisosCaceres