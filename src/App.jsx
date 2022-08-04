
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './core/components/Header/Header';
import Footer from './core/components/Footer/Footer';
import routes from "./Config/routes";

function App() {
  return (
    <div className="App">
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
        
    </div>
  );
}

export default App;
