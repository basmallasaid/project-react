import './App.css';
import StanderErrorBoundary from './Components/Error/StanderErorrBoundary';
import Getcategory from './Components/category';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Perfume from './Components/Perfume';
import Notfound from './Components/Notfound';
import Home from './Components/HomePage.jsx'
import Necklaces from './Components/Necklaces';
import Bracelet from './Components/Bracelet';
import Earrings from './Components/Earrings';
import Ring from './Components/Ring';
import ProductDetails from './Components/ProductDetails';
import Admin from './Components/Admin';
import Login from './Components/Login';
import { CartProvider } from './ContextAPIS/CartContext';
import Cart from './ContextAPIS/Cart';
import SignUp from './Components/SignUp';
import AdminRoute from './Components/AdminDash/AdminRoute ';
import AboutUs from './Components/AboutUs';

function App() {
  return (
    <CartProvider>
      <StanderErrorBoundary>
        <BrowserRouter>
          
          <Routes>
            <Route path="/" element={<> <Navbar/><Home/></>} />
            <Route path="/Home" element={<> <Navbar/><Home /></>} />
            <Route path="/about" element={<> <Navbar/><AboutUs /></>} />
            <Route path="/Getcategory" element={ <> <Navbar/><Getcategory /></>} />
            <Route path="/Getcategory/:id" element={ <> <Navbar/><ProductDetails /></>} />
            <Route path="/Perfume" element={<><Navbar/> <Perfume /></>} />
            <Route path="/Necklaces" element={<><Navbar/><Necklaces /></>} />
            <Route path="/Bracelet" element={<><Navbar/><Bracelet /></>} />
            <Route path="/Earrings" element={<><Navbar/><Earrings /></>} />
            <Route path="/Ring" element={<><Navbar/><Ring /></>} />
            <Route path="/Login" element={<><Navbar/><Login /></>} />
            <Route path="/SignUp" element={<><Navbar/><SignUp /></>} />
            <Route path="/Cart" element={<><Navbar/><Cart /></>} />
            
            
           
            <Route path="/AdminDashboard" element={
              <AdminRoute>
              <> <Navbar/><Admin /></>  
              </AdminRoute>
            } />
            
            <Route path="*" element={<Notfound />} />
          </Routes>
        </BrowserRouter>
      </StanderErrorBoundary>
    </CartProvider>
  );
}

export default App;
