import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width: 280 + "px", height: 100 + "vh"}}>
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="fs-4">Helclovo zahradnictví</span>
          </a>
          <hr/>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a href="#" className="nav-link active" aria-current="page">
                SADBA
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                SKLIZEŇ
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                DUŠIČKY
              </a>
            </li>
          </ul>
          <hr/>
            <strong>
              <a className="nav-link text-white">KONTAKT</a>
            </strong>
          <ul className="px-0 py-1">
            <li className="nav-link text-white">  
              Telefon: 737 112 401
            </li>
            <li className="nav-link text-white">
              E-mail: helclovamartina@seznam.cz
            </li>
          </ul>
        </div>
        <Routes>
          <Route index element={<Navigate to={"/domu"} />} />
          
        </Routes>
      
    </BrowserRouter>
  );
}