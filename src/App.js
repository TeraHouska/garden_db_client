import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import FlowerIndex from "./elements/FlowerIndex";
import FlowerDetail from "./elements/FlowerDetail";
import ProductIndex from "./product/ProductIndex";
import { RegistrationPage } from "./registration/RegistrationPage";
import LoginPage from "./registration/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-row">
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width: 280 + "px", height: 100 + "vh"}}>
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="fs-4">Helclovo zahradnictví</span>
          </a>
          <hr/>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <b><Link to={"/sadba"} className="nav-link text-white">
                SADBA
              </Link></b>
              <ul className="list-unstyled mb-2">
                <li className="ps-4">
                  <Link to={"/sadba/kvetiny"} className="nav-link text-white">
                    Květiny
                  </Link>
                </li>
                <li className="ps-4">
                  <Link to={"/sadba/zelenina"} className="nav-link text-white">
                    Zelenina
                  </Link>
                </li>
                <li className="ps-4">
                  <Link to={"/sadba/bylinky"} className="nav-link text-white">
                    Bylinky
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <b><Link to={"/sklizen"} className="nav-link text-white">
                SKLIZEŇ
              </Link></b>
            </li>
            <li>
              <b><Link to={"/dusicky"} className="nav-link text-white">
                DUŠIČKY
              </Link></b>
            </li>
          </ul>
          
          <hr/>
          <Link to={"/registrace"} className="nav-link text-white">REGISTRACE</Link>
          <Link to={"/login"} className="nav-link text-white my-2">PŘIHLÁŠENÍ</Link>
          <hr/>
          <strong>
            <Link to={"/kontakt"} className="nav-link text-white">KONTAKT</Link>
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
          <Route index element={<Navigate to={"/sadba/kvetiny"} />} />
          <Route path="/sadba">
            <Route path="kvetiny" element={<FlowerIndex/>}/>
            <Route path="kvetiny/:id" element={<FlowerDetail/>} />
            <Route path="zelenina" element={<ProductIndex type="sow_vegetables" />}/>
            <Route path="bylinky" element={<ProductIndex type="herbs" />}/>
          </Route>
          <Route path="/sklizen" element={<ProductIndex type="reap" />}/>
          <Route path="/dusicky" element={<ProductIndex type="souls" />}/>
          <Route path="/registrace" element={<RegistrationPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </div>        
    </BrowserRouter>
  );
}