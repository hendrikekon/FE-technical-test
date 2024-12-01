import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cart, Home, Login, Order, OrderList, Register } from './page';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/register" element={<Register />} />
            <Route path='/order' element={<Order/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/orderlist' element={<OrderList/>}/>
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
