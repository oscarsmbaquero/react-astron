
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Avisos from '../src/pages/Avisos/AvisosCaceres/Avisos'
import routes from "./Config/routes";
import { AuthProvider } from "./context";
import Button from '@mui/material/Button';


function App() {
  return (
    <div className="App">
    <AuthProvider> {/* provee el auth a la aplicación */}
      <Router>
        <Header/>
        <div className="main">
          <Routes>            
                {routes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    ))}
          </Routes>
        </div>
        <Footer/>
      </Router>
    </AuthProvider>    
    </div>
  );
}

export default App;
