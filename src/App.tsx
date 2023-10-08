import  {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Page404 from './pages/404';
import Cadastro from './pages/Cadastro';
import MyAccount from './pages/App/my-account';
import Login from './pages/Login';
import Product from './pages/Product';
import Cart from './pages/Cart';
import AdminHome from './pages/Admin/pages/Home';
import AdminTeam from './pages/Admin/pages/Team';
import AdminProjects from './pages/Admin/pages/Projects';
import AdminReports from './pages/Admin/pages/Reports';


function App() {


    return (
    <>
      <Router>
          <Routes>
                <Route  path="/" element={<Home />} />
                <Route  path="/products" element={<Product />} />

                <Route path="/app/my-account" element={<MyAccount />} />
                <Route path="/checkout" element={<Cart />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
                
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/admin/team" element={<AdminTeam />} />
                <Route path="/admin/projects" element={<AdminProjects />} />
                <Route path="/admin/reports" element={<AdminReports />} />


                <Route  path="/*" element={<Page404 />} />

          </Routes>
      </Router> 
      </>

    );

  
}

export default App
