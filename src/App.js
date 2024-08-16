import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import FlowerIndex from "./flower/FlowerIndex";
import FlowerDetail from "./flower/FlowerDetail";
import ProductIndex from "./product/ProductIndex";
import { RegistrationPage } from "./registration/RegistrationPage";
import LoginPage from "./registration/LoginPage";
import { useSession } from "./contexts/session";
import { apiDelete } from "./utils/api";
import SowProducts from "./homepage/SowProducts";
import HomePage from "./homepage/HomePage";
import ProductDetail from "./product/ProductDetail";
import FlowerForm from "./flower/FlowerForm";
import ProductForm from "./product/ProductForm";

export default function App() {
  
  const {session, setSession} = useSession();
  const handleLogoutClick = () => {
    apiDelete("/api/auth")
      .finally(() => setSession({data: null, status: "unauthorized"}));
  }
  
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
          
          {session.data ? 
          <>
            <p>Přihlášen jako {session.data.email}</p>
            <button className="btn btn-sm btn-secondary" onClick={handleLogoutClick}>Odhlásit</button>
          </> :
          <>
            <hr/>
            <Link to={"/registrace"} className="nav-link text-white">REGISTRACE</Link>
            <Link to={"/login"} className="nav-link text-white my-2">PŘIHLÁŠENÍ</Link>
          </>
          }
          
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
        <div className="container mt-5">
          <Routes>
            <Route index element={<HomePage/>} />
            <Route path="/sadba">
              <Route path="" element={<SowProducts/>} />
              <Route path="kvetiny" element={<FlowerIndex/>}/>
              <Route path="kvetiny/:id" element={<FlowerDetail/>} />
              <Route path="kvetiny/pridat" element={<FlowerForm/>}/>
              <Route path="kvetiny/upravit/:id" element={<FlowerForm/>}/>
              <Route path="zelenina" element={<ProductIndex type="SOW_VEGETABLES" />}/>
              <Route path="bylinky" element={<ProductIndex type="HERBS" />}/>
            </Route>
            <Route path="/sklizen" element={<ProductIndex type="REAP" />}/>
            <Route path="/dusicky" element={<ProductIndex type="SOULS" />}/>
            <Route path="/produkty/:id" element={<ProductDetail/>}/>
            <Route path="/produkty/pridat" element={<ProductForm/>}/>
            <Route path="/produkty/upravit/:id" element={<ProductForm/>}/>
            <Route path="/registrace" element={<RegistrationPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}